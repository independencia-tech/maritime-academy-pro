// LessonE3_L2 - Combustion & Brûleurs | PART 1
import { useState } from "react";

const C = {
  fire:"#f97316", air:"#4da6ff", fuel:"#e8b94f",
  smoke:"#94a3b8", safe:"#6dbf8a", danger:"#e74c3c",
  gold:"#c9922a", gold2:"#e8b94f",
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  purple:"#c084fc",
};

const T: any = {
  fr:{
    moduleLabel:"MACHINE - CHAUDIÈRES",
    lessonTitle:"Combustion & Brûleurs",
    intro:"La combustion est la réaction chimique entre un combustible (HFO ou MDO) et l'oxygène de l'air. Un réglage précis du brûleur est essentiel pour une combustion complète, efficace et sans pollution. Un brûleur mal réglé gaspille du combustible et pollue.",
    tabs:["📖 Contenu","✏️ Pratique","📚 Banque Q.","🎯 Quiz"],
    s1title:"🔥 Théorie de la combustion",
    s1hint:"👆 Tapez un concept",
    s2title:"⚙️ Types de brûleurs marins",
    s2hint:"👆 Tapez un type de brûleur",
    s3title:"💨 Contrôle de la combustion",
    s3hint:"👆 Tapez un indicateur",
    s4title:"⚠️ Défauts de combustion",
    s4hint:"👆 Tapez un défaut",
    keypoints:"Points clés",
    kp:[
      "La combustion complète nécessite un excès d'air de 10-20% pour le HFO",
      "Couleur flamme correcte : orange clair, stable, sans fumée",
      "Fumée noire = manque d'air | Fumée blanche = eau dans le fuel",
      "Le HFO doit être préchauffé à 120-150 degC pour une bonne atomisation",
      "L'analyse des gaz de combustion (CO2, O2, CO) permet d'optimiser le brûleur",
    ],
    combustion:{
      stoichio:{ name:"Stœchiométrie", desc:"La combustion stœchiométrique est la réaction théorique parfaite avec exactement la quantité d'air nécessaire. Pour 1 kg de HFO : environ 13,5 kg d'air (soit ~10,5 m³). En pratique impossible à réaliser parfaitement : on travaille toujours avec un excès d'air." },
      excessair:{ name:"Excès d'air (λ)", desc:"λ = air réel / air stœchiométrique. λ = 1,0 : combustion parfaite (théorique). λ < 1,0 : manque d'air → combustion incomplète, fumée noire, suie, CO. λ = 1,10-1,20 : excès optimal pour HFO (10-20%). λ > 1,30 : trop d'air → perte d'énergie par gaz de fumée froids, condensation acide." },
      products:{ name:"Produits de combustion", desc:"Combustion complète : CO2 + H2O + N2 + O2 résiduel. Combustion incomplète : + CO (monoxyde de carbone toxique) + suie (carbone imbrûlé) + hydrocarbures imbrûlés. Les gaz de combustion typiques d'une chaudière HFO : 13-14% CO2, 2-4% O2, < 200 ppm CO." },
      heatvalue:{ name:"Pouvoir calorifique (PCI)", desc:"HFO : PCI ≈ 40 500 kJ/kg. MDO : PCI ≈ 42 700 kJ/kg. Le rendement d'une chaudière est typiquement 85-90%. Perte principale : chaleur perdue dans les gaz de fumée (température trop élevée en sortie)." },
    },
    burners:{
      mechanical:{ name:"Brûleur à pression mécanique", desc:"Le combustible est injecté à haute pression (15-30 bar) à travers un gicleur qui l'atomise en fines gouttelettes. Simple et robuste. Débit variable par changement de gicleur ou pression. Sensible à la viscosité → préchauffage rigoureux nécessaire.", use:"Chaudières auxiliaires standard" },
      steam:{ name:"Brûleur à vapeur (steam atomising)", desc:"La vapeur à 5-10 bar est mélangée au combustible pour l'atomiser. Meilleure atomisation que le mécanique, moins sensible à la viscosité. Consomme de la vapeur (bilan à surveiller). Bonne flexibilité de débit.", use:"Chaudières principales, pétroliers" },
      rotary:{ name:"Brûleur rotatif (rotary cup)", desc:"Une coupelle rotative à grande vitesse projette le combustible par force centrifuge en fines gouttelettes. Excellente atomisation, peu sensible à la viscosité. Adapté aux combustibles lourds. Entretien de la coupelle important.", use:"Chaudières auxiliaires HFO" },
      gasoil:{ name:"Brûleur MDO/MGO", desc:"Brûleur simplifié pour distillats légers (MDO/MGO). Pas de préchauffage nécessaire. Utilisé en port (zone ECA) et au démarrage. Viscosité basse → atomisation facile.", use:"Manœuvres, zones ECA" },
    },
    control:{
      flamecolor:{ name:"Couleur et forme de la flamme", desc:"Flamme correcte : orange-jaune brillant, stable, bien centrée, sans décrochement. Flamme trop longue : excès de fuel ou manque d'air. Flamme trop courte : excès d'air. Flamme instable ou oscillante : problème d'atomisation ou de pression. Flamme fumante : combustion incomplète." },
      smokecolor:{ name:"Couleur des fumées", desc:"Incolore/légèrement gris : combustion correcte. Noir : manque d'air ou excès de combustible → imbrûlés → augmenter l'air. Blanc/gris clair : eau dans le combustible ou température trop basse → vérifier le préchauffage. Brun/jaune : soufre (normal avec HFO à teneur en soufre élevée)." },
      gasanalysis:{ name:"Analyse des gaz de combustion", desc:"CO2 optimal pour HFO : 13-14%. O2 résiduel : 2-4% (correspond à λ ≈ 1,10-1,20). CO : < 200 ppm (si > 200 ppm → combustion incomplète). Température gaz sortie : 180-220 degC (si trop élevée → encrassement ECE ou manque d'air)." },
      viscosity:{ name:"Viscosité du combustible", desc:"HFO doit être à 10-20 cSt pour une bonne atomisation. Atteint à 120-150 degC selon la teneur en soufre et le grade. Viscosimètre automatique recommandé. Trop visqueux → mauvaise atomisation → imbrûlés. Trop fluide → gouttelettes trop grandes → mauvaise vaporisation." },
    },
    faults:{
      blacksmoke:{ name:"Fumée noire", cause:"Manque d'air, excès de combustible, mauvaise atomisation (viscosité trop haute), brûleur encrassé.", remedy:"Augmenter l'air (ouvrir le registre), vérifier le préchauffage (température et viscosité), nettoyer le gicleur, vérifier la pression de combustible." },
      flamefail:{ name:"Extinction de flamme", cause:"Pression combustible trop basse, viscosité trop haute (mauvais préchauffage), gicleur bouché, débit d'air trop élevé, instabilité de la flamme.", remedy:"Vérifier la pression et le préchauffage du combustible, nettoyer le gicleur, réduire l'air, vérifier le détecteur de flamme. Purger avant tout redémarrage." },
      pulsation:{ name:"Pulsation/vibration de flamme", cause:"Rapport air/combustible instable, résonance dans le foyer, condensat dans les tuyauteries de combustible, variation de pression d'air.", remedy:"Stabiliser le rapport air/fuel, purger les condensats des tuyauteries combustible, vérifier le ventilateur d'air." },
      highexhaust:{ name:"Température gaz trop élevée", cause:"Encrassement de la surface d'échange (suie/dépôts), manque d'air (combustion incomplète), charge de chaudière trop élevée.", remedy:"Soufflage de suie, augmenter l'air, réduire la charge, inspecter et nettoyer les tubes." },
    },
    practiceTitle:"Exercice pratique",
    questions:[
      { q:"Expliquez le concept d'excès d'air (λ) dans la combustion et pourquoi utilise-t-on un excès de 10-20% pour le HFO.",
        a:"L'excès d'air (λ) est le rapport entre l'air réellement fourni et l'air théoriquement nécessaire (stœchiométrique). λ = 1,0 : combustion théoriquement parfaite. λ < 1,0 : manque d'air → combustion incomplète, CO, suie. λ > 1,0 : excès d'air. Pour le HFO, on utilise λ = 1,10-1,20 (excès de 10-20%) car : 1. Le HFO est un combustible complexe et visqueux → atomisation imparfaite → certaines gouttelettes nécessitent plus de temps pour brûler. 2. La composition du HFO varie → un excès garantit une combustion complète malgré les variations. 3. Le risque d'imbrûlés (CO, suie) est plus grave que la perte d'énergie par un léger excès d'air. Un excès > 30% est inutile et coûteux car les gaz de fumée emportent plus de chaleur. La mesure de O2 résiduel (2-4%) et de CO2 (13-14%) permet de vérifier que λ est correct." },
      { q:"Quelle est la différence entre un brûleur à pression mécanique et un brûleur à vapeur ? Quels sont les avantages de chacun ?",
        a:"Brûleur à pression mécanique : le combustible est atomisé par injection à haute pression (15-30 bar) à travers un gicleur. Avantages : simple, robuste, pas de consommation de vapeur. Inconvénients : sensible à la viscosité (préchauffage précis nécessaire), débit difficile à moduler (changement de gicleur). Brûleur à vapeur (steam atomising) : la vapeur à 5-10 bar est mélangée au combustible dans le brûleur pour l'atomiser. Avantages : meilleure atomisation (gouttelettes plus fines), moins sensible à la viscosité, bonne flexibilité de débit, adapté aux HFO très lourds. Inconvénients : consomme de la vapeur (environ 0,5-1% de la production), nécessite de la vapeur disponible (problème à démarrage à froid). Choix : les grandes chaudières et les pétroliers utilisent souvent l'atomisation à vapeur pour sa fiabilité. Les chaudières auxiliaires standard utilisent souvent la pression mécanique." },
      { q:"Comment diagnostiquer et corriger une combustion incomplète (fumée noire) sur une chaudière marine ?",
        a:"Diagnostic fumée noire : La fumée noire est causée par un manque d'air ou un excès de combustible → imbrûlés (suie, CO). Procédure de diagnostic : 1. Vérifier la couleur et l'intensité de la fumée (noire dense = problème grave). 2. Mesurer les gaz de combustion : O2 < 1% → manque d'air, CO > 500 ppm → imbrûlés. 3. Vérifier la viscosité du HFO (10-20 cSt) → si trop haute → mauvaise atomisation. 4. Inspecter le gicleur : colmatage partiel → mauvaise pulvérisation. 5. Vérifier le registre d'air et le ventilateur. Corrections : Augmenter l'air (ouvrir progressivement le registre). Si viscosité trop haute → augmenter la température de préchauffage. Nettoyer ou remplacer le gicleur. Si CO2 > 14% → réduire le combustible. Important : enregistrer toute émission excessive selon MARPOL Annexe VI." },
    ],
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
  },
  en:{
    moduleLabel:"ENGINE - BOILERS",
    lessonTitle:"Combustion & Burners",
    intro:"Combustion is the chemical reaction between fuel (HFO or MDO) and oxygen from air. Precise burner adjustment is essential for complete, efficient and clean combustion. A poorly adjusted burner wastes fuel and pollutes.",
    tabs:["📖 Content","✏️ Practice","📚 Question Bank","🎯 Quiz"],
    s1title:"🔥 Combustion Theory",
    s1hint:"👆 Tap a concept",
    s2title:"⚙️ Marine Burner Types",
    s2hint:"👆 Tap a burner type",
    s3title:"💨 Combustion Control",
    s3hint:"👆 Tap an indicator",
    s4title:"⚠️ Combustion Faults",
    s4hint:"👆 Tap a fault",
    keypoints:"Key Points",
    kp:[
      "Complete combustion requires 10-20% excess air for HFO",
      "Correct flame colour: bright orange, stable, smoke-free",
      "Black smoke = insufficient air | White smoke = water in fuel",
      "HFO must be preheated to 120-150 degC for good atomisation",
      "Flue gas analysis (CO2, O2, CO) allows burner optimisation",
    ],
    combustion:{
      stoichio:{ name:"Stoichiometry", desc:"Stoichiometric combustion is the theoretically perfect reaction with exactly the required air quantity. For 1 kg HFO: approximately 13.5 kg air (≈10.5 m³). In practice impossible to achieve perfectly: always operate with excess air." },
      excessair:{ name:"Excess air (λ)", desc:"λ = actual air / stoichiometric air. λ = 1.0: perfect combustion (theoretical). λ < 1.0: insufficient air → incomplete combustion, black smoke, soot, CO. λ = 1.10-1.20: optimal excess for HFO (10-20%). λ > 1.30: too much air → energy loss through cold flue gases, acid condensation." },
      products:{ name:"Combustion products", desc:"Complete combustion: CO2 + H2O + N2 + residual O2. Incomplete combustion: + CO (toxic carbon monoxide) + soot (unburnt carbon) + unburnt hydrocarbons. Typical HFO boiler flue gases: 13-14% CO2, 2-4% O2, < 200 ppm CO." },
      heatvalue:{ name:"Calorific value (LHV)", desc:"HFO: LHV ≈ 40,500 kJ/kg. MDO: LHV ≈ 42,700 kJ/kg. Boiler efficiency typically 85-90%. Main loss: heat lost in flue gases (outlet temperature too high)." },
    },
    burners:{
      mechanical:{ name:"Mechanical pressure burner", desc:"Fuel is injected at high pressure (15-30 bar) through a nozzle that atomises it into fine droplets. Simple and robust. Variable flow by nozzle change or pressure adjustment. Sensitive to viscosity → rigorous preheating necessary.", use:"Standard auxiliary boilers" },
      steam:{ name:"Steam atomising burner", desc:"Steam at 5-10 bar is mixed with fuel to atomise it. Better atomisation than mechanical, less sensitive to viscosity. Consumes steam (energy balance to monitor). Good flow flexibility.", use:"Main boilers, tankers" },
      rotary:{ name:"Rotary cup burner", desc:"A high-speed rotating cup projects fuel by centrifugal force into fine droplets. Excellent atomisation, little sensitive to viscosity. Suitable for heavy fuels. Cup maintenance important.", use:"HFO auxiliary boilers" },
      gasoil:{ name:"MDO/MGO burner", desc:"Simplified burner for light distillates (MDO/MGO). No preheating required. Used in port (ECA zones) and at startup. Low viscosity → easy atomisation.", use:"Manoeuvring, ECA zones" },
    },
    control:{
      flamecolor:{ name:"Flame colour and shape", desc:"Correct flame: bright orange-yellow, stable, well centred, no detachment. Too long flame: fuel excess or insufficient air. Too short flame: air excess. Unstable/oscillating flame: atomisation or pressure problem. Smoky flame: incomplete combustion." },
      smokecolor:{ name:"Smoke colour", desc:"Colourless/slightly grey: correct combustion. Black: insufficient air or fuel excess → unburnt → increase air. White/light grey: water in fuel or temperature too low → check preheating. Brown/yellow: sulphur (normal with high-sulphur HFO)." },
      gasanalysis:{ name:"Flue gas analysis", desc:"Optimal CO2 for HFO: 13-14%. Residual O2: 2-4% (corresponds to λ ≈ 1.10-1.20). CO: < 200 ppm (if > 200 ppm → incomplete combustion). Flue gas outlet temperature: 180-220 degC (if too high → EGE fouling or insufficient air)." },
      viscosity:{ name:"Fuel viscosity", desc:"HFO must be at 10-20 cSt for good atomisation. Achieved at 120-150 degC depending on sulphur content and grade. Automatic viscometer recommended. Too viscous → poor atomisation → unburnt. Too fluid → droplets too large → poor vaporisation." },
    },
    faults:{
      blacksmoke:{ name:"Black smoke", cause:"Insufficient air, fuel excess, poor atomisation (viscosity too high), fouled burner.", remedy:"Increase air (open register), check preheating (temperature and viscosity), clean nozzle, check fuel pressure." },
      flamefail:{ name:"Flame failure", cause:"Fuel pressure too low, viscosity too high (poor preheating), blocked nozzle, air flow too high, flame instability.", remedy:"Check fuel pressure and preheating, clean nozzle, reduce air, check flame detector. Purge before any restart." },
      pulsation:{ name:"Flame pulsation/vibration", cause:"Unstable air/fuel ratio, furnace resonance, condensate in fuel piping, air pressure variation.", remedy:"Stabilise air/fuel ratio, drain fuel piping condensate, check air fan." },
      highexhaust:{ name:"Flue gas temperature too high", cause:"Exchange surface fouling (soot/deposits), insufficient air (incomplete combustion), boiler load too high.", remedy:"Soot blowing, increase air, reduce load, inspect and clean tubes." },
    },
    practiceTitle:"Practice Exercise",
    questions:[
      { q:"Explain the concept of excess air (λ) in combustion and why 10-20% excess is used for HFO.",
        a:"Excess air (λ) is the ratio between air actually supplied and theoretically required (stoichiometric) air. λ = 1.0: theoretically perfect combustion. λ < 1.0: insufficient air → incomplete combustion, CO, soot. λ > 1.0: excess air. For HFO, λ = 1.10-1.20 (10-20% excess) is used because: 1. HFO is a complex, viscous fuel → imperfect atomisation → some droplets need more time to burn. 2. HFO composition varies → excess ensures complete combustion despite variations. 3. Risk of unburnt products (CO, soot) is worse than energy loss from slight air excess. Excess > 30% is wasteful as flue gases carry more heat. Measuring residual O2 (2-4%) and CO2 (13-14%) verifies λ is correct." },
      { q:"What is the difference between a mechanical pressure burner and a steam atomising burner? What are each one's advantages?",
        a:"Mechanical pressure burner: fuel atomised by high-pressure injection (15-30 bar) through a nozzle. Advantages: simple, robust, no steam consumption. Disadvantages: sensitive to viscosity (precise preheating needed), flow difficult to modulate (nozzle change required). Steam atomising burner: steam at 5-10 bar mixed with fuel in the burner to atomise it. Advantages: better atomisation (finer droplets), less sensitive to viscosity, good flow flexibility, suitable for very heavy HFO. Disadvantages: consumes steam (approx 0.5-1% of output), requires steam availability (problem at cold start). Choice: large boilers and tankers often use steam atomisation for reliability. Standard auxiliary boilers often use mechanical pressure." },
      { q:"How to diagnose and correct incomplete combustion (black smoke) on a marine boiler?",
        a:"Black smoke diagnosis: Black smoke caused by insufficient air or fuel excess → unburnt products (soot, CO). Diagnostic procedure: 1. Check smoke colour and intensity (dense black = serious problem). 2. Measure flue gases: O2 < 1% → insufficient air, CO > 500 ppm → unburnt products. 3. Check HFO viscosity (10-20 cSt) → if too high → poor atomisation. 4. Inspect nozzle: partial blockage → poor atomisation. 5. Check air register and fan. Corrections: Increase air (gradually open register). If viscosity too high → increase preheat temperature. Clean or replace nozzle. If CO2 > 14% → reduce fuel. Important: record any excessive emissions per MARPOL Annex VI." },
    ],
    showAnswer:"Show answer", hideAnswer:"Hide",
  },
  es:{
    moduleLabel:"MÁQUINAS - CALDERAS",
    lessonTitle:"Combustión & Quemadores",
    intro:"La combustión es la reacción química entre el combustible (HFO o MDO) y el oxígeno del aire. Un ajuste preciso del quemador es esencial para una combustión completa, eficiente y limpia.",
    tabs:["📖 Contenido","✏️ Práctica","📚 Banco Q.","🎯 Quiz"],
    s1title:"🔥 Teoría de la combustión",
    s1hint:"👆 Toca un concepto",
    s2title:"⚙️ Tipos de quemadores marinos",
    s2hint:"👆 Toca un tipo de quemador",
    s3title:"💨 Control de la combustión",
    s3hint:"👆 Toca un indicador",
    s4title:"⚠️ Defectos de combustión",
    s4hint:"👆 Toca un defecto",
    keypoints:"Puntos clave",
    kp:[
      "La combustión completa requiere un exceso de aire del 10-20% para el HFO",
      "Color de llama correcto: naranja brillante, estable, sin humo",
      "Humo negro = falta de aire | Humo blanco = agua en el combustible",
      "El HFO debe precalentarse a 120-150 degC para una buena atomización",
      "El análisis de gases de combustión permite optimizar el quemador",
    ],
    combustion:{
      stoichio:{ name:"Estequiometría", desc:"La combustión estequiométrica es la reacción teórica perfecta con exactamente la cantidad de aire necesaria. Para 1 kg de HFO: ≈13,5 kg de aire. En la práctica imposible de conseguir perfectamente: siempre se trabaja con exceso de aire." },
      excessair:{ name:"Exceso de aire (λ)", desc:"λ = aire real / aire estequiométrico. λ = 1,0: combustión perfecta (teórica). λ < 1,0: falta de aire → combustión incompleta, humo negro, hollín, CO. λ = 1,10-1,20: exceso óptimo para HFO (10-20%). λ > 1,30: demasiado aire → pérdida de energía." },
      products:{ name:"Productos de combustión", desc:"Combustión completa: CO2 + H2O + N2 + O2 residual. Incompleta: + CO (tóxico) + hollín. Gases típicos de caldera HFO: 13-14% CO2, 2-4% O2, < 200 ppm CO." },
      heatvalue:{ name:"Poder calorífico (PCI)", desc:"HFO: PCI ≈ 40 500 kJ/kg. MDO: ≈ 42 700 kJ/kg. Rendimiento de caldera: 85-90%. Pérdida principal: calor perdido en los gases de humos." },
    },
    burners:{
      mechanical:{ name:"Quemador de presión mecánica", desc:"El combustible se inyecta a alta presión (15-30 bar) por una tobera. Simple y robusto. Sensible a la viscosidad → precalentamiento riguroso.", use:"Calderas auxiliares estándar" },
      steam:{ name:"Quemador de atomización por vapor", desc:"Vapor a 5-10 bar se mezcla con el combustible para atomizarlo. Mejor atomización, menos sensible a la viscosidad. Consume vapor.", use:"Calderas principales, petroleros" },
      rotary:{ name:"Quemador rotativo (rotary cup)", desc:"Una copa giratoria proyecta el combustible por fuerza centrífuga. Excelente atomización, poco sensible a la viscosidad.", use:"Calderas auxiliares HFO" },
      gasoil:{ name:"Quemador MDO/MGO", desc:"Quemador simplificado para destilados ligeros. Sin precalentamiento. Usado en puerto (zona ECA) y arranque.", use:"Maniobras, zonas ECA" },
    },
    control:{
      flamecolor:{ name:"Color y forma de la llama", desc:"Correcta: naranja-amarillo brillante, estable, bien centrada. Demasiado larga: exceso de fuel o falta de aire. Inestable: problema de atomización." },
      smokecolor:{ name:"Color de los humos", desc:"Incoloro/gris claro: combustión correcta. Negro: falta de aire → aumentar el aire. Blanco: agua en el combustible. Marrón/amarillo: azufre (normal con HFO)." },
      gasanalysis:{ name:"Análisis de gases de combustión", desc:"CO2 óptimo: 13-14%. O2 residual: 2-4% (λ ≈ 1,10-1,20). CO: < 200 ppm. Temperatura gases salida: 180-220 degC." },
      viscosity:{ name:"Viscosidad del combustible", desc:"HFO a 10-20 cSt para buena atomización. Conseguido a 120-150 degC según el grado. Viscosímetro automático recomendado." },
    },
    faults:{
      blacksmoke:{ name:"Humo negro", cause:"Falta de aire, exceso de combustible, mala atomización, quemador sucio.", remedy:"Aumentar el aire, verificar el precalentamiento, limpiar la tobera, verificar la presión de combustible." },
      flamefail:{ name:"Extinción de llama", cause:"Presión de combustible baja, viscosidad alta, tobera obstruida, caudal de aire excesivo.", remedy:"Verificar presión y precalentamiento, limpiar tobera. Purgar antes de cualquier rearranque." },
      pulsation:{ name:"Pulsación/vibración de llama", cause:"Relación aire/combustible inestable, condensados en tuberías de combustible.", remedy:"Estabilizar relación aire/fuel, purgar condensados, verificar ventilador." },
      highexhaust:{ name:"Temperatura gases demasiado alta", cause:"Ensuciamiento de la superficie de intercambio, falta de aire, carga excesiva.", remedy:"Soplado de hollín, aumentar el aire, reducir la carga, limpiar los tubos." },
    },
    practiceTitle:"Ejercicio práctico",
    questions:[
      { q:"Explique el concepto de exceso de aire (λ) y por qué se usa un exceso del 10-20% para el HFO.",
        a:"λ = aire real / aire estequiométrico. λ = 1,0: combustión teóricamente perfecta. λ < 1,0: falta de aire → CO, hollín. Para HFO λ = 1,10-1,20 porque: el HFO es viscoso y complejo → atomización imperfecta → algunas gotas necesitan más tiempo. La composición varía → el exceso garantiza combustión completa. El riesgo de imbrûlés es peor que la pequeña pérdida por exceso de aire. O2 residual (2-4%) y CO2 (13-14%) confirman el λ correcto." },
      { q:"¿Cuál es la diferencia entre un quemador de presión mecánica y uno de atomización por vapor?",
        a:"Presión mecánica: combustible atomizado por inyección a alta presión (15-30 bar). Ventajas: simple, robusto, sin consumo de vapor. Inconvenientes: sensible a la viscosidad, modulación de caudal difícil. Vapor: vapor a 5-10 bar mezclado con el combustible. Ventajas: mejor atomización, menos sensible a la viscosidad, buena flexibilidad. Inconvenientes: consume vapor, necesita vapor disponible en arranque frío." },
      { q:"¿Cómo diagnosticar y corregir una combustión incompleta (humo negro) en una caldera marina?",
        a:"Diagnóstico: humo negro = falta de aire o exceso de fuel. Procedimiento: 1. Medir gases: O2 < 1% → falta de aire, CO > 500 ppm → imbrûlés. 2. Verificar viscosidad HFO (10-20 cSt). 3. Inspeccionar tobera. 4. Verificar registro de aire y ventilador. Correcciones: aumentar el aire progresivamente, aumentar temperatura de precalentamiento, limpiar/sustituir tobera. Registrar cualquier emisión excesiva según MARPOL Anexo VI." },
    ],
    showAnswer:"Ver corrección", hideAnswer:"Ocultar",
  },
  pt:{
    moduleLabel:"MÁQUINAS - CALDEIRAS",
    lessonTitle:"Combustão & Queimadores",
    intro:"A combustão é a reação química entre o combustível (HFO ou MDO) e o oxigénio do ar. Um ajuste preciso do queimador é essencial para uma combustão completa, eficiente e limpa.",
    tabs:["📖 Conteúdo","✏️ Prática","📚 Banco Q.","🎯 Quiz"],
    s1title:"🔥 Teoria da combustão",
    s1hint:"👆 Toque num conceito",
    s2title:"⚙️ Tipos de queimadores marinhos",
    s2hint:"👆 Toque num tipo de queimador",
    s3title:"💨 Controlo da combustão",
    s3hint:"👆 Toque num indicador",
    s4title:"⚠️ Defeitos de combustão",
    s4hint:"👆 Toque num defeito",
    keypoints:"Pontos-chave",
    kp:[
      "A combustão completa requer 10-20% de excesso de ar para o HFO",
      "Cor de chama correta: laranja brilhante, estável, sem fumo",
      "Fumo preto = falta de ar | Fumo branco = água no combustível",
      "O HFO deve ser pré-aquecido a 120-150 degC para boa atomização",
      "A análise dos gases de combustão permite otimizar o queimador",
    ],
    combustion:{
      stoichio:{ name:"Estequiometria", desc:"A combustão estequiométrica é a reação teórica perfeita com exatamente a quantidade de ar necessária. Para 1 kg de HFO: ≈13,5 kg de ar. Na prática impossível de atingir: trabalha-se sempre com excesso de ar." },
      excessair:{ name:"Excesso de ar (λ)", desc:"λ = ar real / ar estequiométrico. λ = 1,0: combustão perfeita (teórica). λ < 1,0: falta de ar → combustão incompleta, fumo preto, fuligem, CO. λ = 1,10-1,20: excesso ótimo para HFO (10-20%). λ > 1,30: ar excessivo → perda de energia." },
      products:{ name:"Produtos de combustão", desc:"Combustão completa: CO2 + H2O + N2 + O2 residual. Incompleta: + CO (tóxico) + fuligem. Gases típicos caldeira HFO: 13-14% CO2, 2-4% O2, < 200 ppm CO." },
      heatvalue:{ name:"Poder calorífico (PCI)", desc:"HFO: PCI ≈ 40 500 kJ/kg. MDO: ≈ 42 700 kJ/kg. Rendimento da caldeira: 85-90%. Perda principal: calor perdido nos gases de combustão." },
    },
    burners:{
      mechanical:{ name:"Queimador de pressão mecânica", desc:"O combustível é injetado a alta pressão (15-30 bar) por um bico. Simples e robusto. Sensível à viscosidade → pré-aquecimento rigoroso.", use:"Caldeiras auxiliares padrão" },
      steam:{ name:"Queimador de atomização a vapor", desc:"Vapor a 5-10 bar misturado com o combustível para atomizá-lo. Melhor atomização, menos sensível à viscosidade. Consome vapor.", use:"Caldeiras principais, petroleiros" },
      rotary:{ name:"Queimador rotativo (rotary cup)", desc:"Uma taça giratória projeta o combustível por força centrífuga. Excelente atomização, pouco sensível à viscosidade.", use:"Caldeiras auxiliares HFO" },
      gasoil:{ name:"Queimador MDO/MGO", desc:"Queimador simplificado para destilados leves. Sem pré-aquecimento. Usado em porto (zona ECA) e arranque.", use:"Manobras, zonas ECA" },
    },
    control:{
      flamecolor:{ name:"Cor e forma da chama", desc:"Correta: laranja-amarelo brilhante, estável, bem centrada. Demasiado longa: excesso de combustível ou falta de ar. Instável: problema de atomização." },
      smokecolor:{ name:"Cor do fumo", desc:"Incolor/cinzento claro: combustão correta. Preto: falta de ar → aumentar o ar. Branco: água no combustível. Castanho/amarelo: enxofre (normal com HFO)." },
      gasanalysis:{ name:"Análise dos gases de combustão", desc:"CO2 ótimo: 13-14%. O2 residual: 2-4% (λ ≈ 1,10-1,20). CO: < 200 ppm. Temperatura gases saída: 180-220 degC." },
      viscosity:{ name:"Viscosidade do combustível", desc:"HFO a 10-20 cSt para boa atomização. Obtido a 120-150 degC conforme o grau. Viscosímetro automático recomendado." },
    },
    faults:{
      blacksmoke:{ name:"Fumo preto", cause:"Falta de ar, excesso de combustível, má atomização, queimador sujo.", remedy:"Aumentar o ar, verificar pré-aquecimento, limpar o bico, verificar pressão do combustível." },
      flamefail:{ name:"Extinção de chama", cause:"Pressão do combustível baixa, viscosidade alta, bico obstruído, caudal de ar excessivo.", remedy:"Verificar pressão e pré-aquecimento, limpar bico. Purgar antes de qualquer rearranque." },
      pulsation:{ name:"Pulsação/vibração de chama", cause:"Rácio ar/combustível instável, condensado nas tubagens de combustível.", remedy:"Estabilizar rácio ar/combustível, purgar condensados, verificar ventilador." },
      highexhaust:{ name:"Temperatura gases demasiado alta", cause:"Incrustação da superfície de troca, falta de ar, carga excessiva.", remedy:"Sopro de fuligem, aumentar o ar, reduzir a carga, limpar os tubos." },
    },
    practiceTitle:"Exercício prático",
    questions:[
      { q:"Explique o conceito de excesso de ar (λ) e por que se usa um excesso de 10-20% para o HFO.",
        a:"λ = ar real / ar estequiométrico. λ = 1,0: combustão teoricamente perfeita. λ < 1,0: falta de ar → CO, fuligem. Para HFO λ = 1,10-1,20 porque: o HFO é viscoso e complexo → atomização imperfeita. A composição varia → o excesso garante combustão completa. O risco de inqueimados é pior do que a pequena perda por excesso de ar. O2 residual (2-4%) e CO2 (13-14%) confirmam λ correto." },
      { q:"Qual é a diferença entre um queimador de pressão mecânica e um de atomização a vapor?",
        a:"Pressão mecânica: combustível atomizado por injeção a alta pressão (15-30 bar). Vantagens: simples, robusto, sem consumo de vapor. Desvantagens: sensível à viscosidade. Vapor: vapor a 5-10 bar misturado com combustível. Vantagens: melhor atomização, menos sensível à viscosidade, boa flexibilidade. Desvantagens: consome vapor, necessita vapor disponível no arranque a frio." },
      { q:"Como diagnosticar e corrigir uma combustão incompleta (fumo preto) numa caldeira marinha?",
        a:"Diagnóstico: fumo preto = falta de ar ou excesso de combustível. Procedimento: 1. Medir gases: O2 < 1% → falta de ar, CO > 500 ppm → inqueimados. 2. Verificar viscosidade HFO (10-20 cSt). 3. Inspecionar bico. 4. Verificar registo de ar e ventilador. Correções: aumentar o ar progressivamente, aumentar temperatura de pré-aquecimento, limpar/substituir bico. Registar qualquer emissão excessiva segundo MARPOL Anexo VI." },
    ],
    showAnswer:"Ver correção", hideAnswer:"Ocultar",
  },
};

// ── SVG 1 - COMBUSTION THEORY ─────────────────────────────────
function CombustionSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("stoichio");
  const items = t.combustion;
  const cols: Record<string,string> = {stoichio:C.fire,excessair:C.air,products:C.safe,heatvalue:C.fuel};
  const icons: Record<string,string> = {stoichio:"⚗️",excessair:"💨",products:"🌫️",heatvalue:"⚡"};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.fire}33`}}>
      <div style={{display:"flex",gap:6,marginBottom:10}}>
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

// ── SVG 2 - BURNER TYPES ─────────────────────────────────────
function BurnersSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("mechanical");
  const items = t.burners;
  const cols: Record<string,string> = {mechanical:C.fire,steam:C.air,rotary:C.purple,gasoil:C.safe};

  const svgs: Record<string,JSX.Element> = {
    mechanical:(
      <g>
        {/* Nozzle */}
        <rect x="60" y="60" width="40" height="30" rx="4" fill={C.fire} opacity={0.2} stroke={C.fire} strokeWidth="1.5"/>
        <text x="80" y="79" fontSize="7" fill={C.fire} textAnchor="middle" fontFamily="Courier New">NOZZLE</text>
        {/* High pressure fuel */}
        <line x1="20" y1="75" x2="60" y2="75" stroke={C.fuel} strokeWidth="3"/>
        <text x="40" y="70" fontSize="6" fill={C.fuel} textAnchor="middle" fontFamily="Courier New">15-30 bar</text>
        {/* Spray */}
        {[-20,-10,0,10,20].map((dy,i)=>(
          <line key={i} x1="100" y1="75" x2="130" y2={75+dy*1.5} stroke={C.fire} strokeWidth="1" opacity={0.7}/>
        ))}
        <text x="80" y="115" fontSize="8" fill={C.fire} textAnchor="middle" fontFamily="Courier New">MECHANICAL</text>
        <text x="80" y="127" fontSize="6" fill={C.fuel} textAnchor="middle" fontFamily="Courier New">high pressure fuel</text>
      </g>
    ),
    steam:(
      <g>
        <rect x="55" y="55" width="50" height="40" rx="4" fill={C.air} opacity={0.15} stroke={C.air} strokeWidth="1.5"/>
        <text x="80" y="79" fontSize="7" fill={C.air} textAnchor="middle" fontFamily="Courier New">MIXING</text>
        <line x1="20" y1="65" x2="55" y2="65" stroke={C.fuel} strokeWidth="2.5"/>
        <text x="37" y="60" fontSize="6" fill={C.fuel} textAnchor="middle" fontFamily="Courier New">FUEL</text>
        <line x1="20" y1="85" x2="55" y2="85" stroke={C.air} strokeWidth="2.5" strokeDasharray="4,2"/>
        <text x="37" y="95" fontSize="6" fill={C.air} textAnchor="middle" fontFamily="Courier New">STEAM 5-10b</text>
        {[-15,-5,5,15].map((dy,i)=>(
          <line key={i} x1="105" y1="75" x2="135" y2={75+dy*1.8} stroke={C.fire} strokeWidth="1.2" opacity={0.7}/>
        ))}
        <text x="80" y="115" fontSize="8" fill={C.air} textAnchor="middle" fontFamily="Courier New">STEAM ATOMISING</text>
      </g>
    ),
    rotary:(
      <g>
        <circle cx="80" cy="75" r="22" fill={C.purple} opacity={0.15} stroke={C.purple} strokeWidth="1.5"/>
        {[0,45,90,135,180,225,270,315].map((a,i)=>{
          const r=a*Math.PI/180;
          return <line key={i} x1={80+8*Math.cos(r)} y1={75+8*Math.sin(r)} x2={80+20*Math.cos(r)} y2={75+20*Math.sin(r)} stroke={C.purple} strokeWidth="2"/>;
        })}
        <circle cx="80" cy="75" r="8" fill={C.purple} opacity={0.4}/>
        <text x="80" y="78" fontSize="6" fill="#fff" textAnchor="middle" fontFamily="Courier New">CUP</text>
        {[0,30,60,90,120,150].map((a,i)=>{
          const r=a*Math.PI/180;
          return <line key={i} x1={80+22*Math.cos(r)} y1={75+22*Math.sin(r)} x2={80+40*Math.cos(r)} y2={75+40*Math.sin(r)} stroke={C.fire} strokeWidth="1" opacity={0.6}/>;
        })}
        <text x="80" y="125" fontSize="8" fill={C.purple} textAnchor="middle" fontFamily="Courier New">ROTARY CUP</text>
      </g>
    ),
    gasoil:(
      <g>
        <rect x="60" y="60" width="40" height="30" rx="4" fill={C.safe} opacity={0.15} stroke={C.safe} strokeWidth="1.5"/>
        <text x="80" y="79" fontSize="7" fill={C.safe} textAnchor="middle" fontFamily="Courier New">MDO/MGO</text>
        <line x1="20" y1="75" x2="60" y2="75" stroke={C.safe} strokeWidth="2.5"/>
        <text x="40" y="70" fontSize="6" fill={C.safe} textAnchor="middle" fontFamily="Courier New">LOW VISC.</text>
        {[-12,-6,0,6,12].map((dy,i)=>(
          <line key={i} x1="100" y1="75" x2="125" y2={75+dy*1.5} stroke={C.safe} strokeWidth="1" opacity={0.7}/>
        ))}
        <text x="80" y="115" fontSize="8" fill={C.safe} textAnchor="middle" fontFamily="Courier New">MDO BURNER</text>
        <text x="80" y="127" fontSize="6" fill={C.safe} textAnchor="middle" fontFamily="Courier New">no preheat needed</text>
      </g>
    ),
  };

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.fuel}33`}}>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {Object.entries(items).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{
            flex:1,padding:"7px 4px",borderRadius:10,fontSize:9,cursor:"pointer",minWidth:55,
            background:sel===key?`${cols[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?cols[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?cols[key]:"rgba(240,244,255,0.45)",
            fontFamily:"Courier New",textAlign:"center",
          }}>{key==="mechanical"?"MECH":key==="steam"?"STEAM":key==="rotary"?"ROTARY":"MDO"}</button>
        ))}
      </div>
      <svg viewBox="0 0 160 145" style={{width:"100%",maxWidth:220,display:"block",margin:"0 auto",background:`${C.navy3}66`,borderRadius:8}}>
        {svgs[sel]}
      </svg>
      <div style={{marginTop:10,padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${cols[sel]||C.fuel}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
        <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{items[sel].name}</div>
        <div style={{marginBottom:6}}>{items[sel].desc}</div>
        <div style={{fontSize:10,color:cols[sel],fontWeight:700}}>→ {items[sel].use}</div>
      </div>
    </div>
  );
}

// ── SVG 3 - COMBUSTION CONTROL ───────────────────────────────
function ControlSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("flamecolor");
  const items = t.control;
  const cols: Record<string,string> = {flamecolor:C.fire,smokecolor:C.smoke,gasanalysis:C.air,viscosity:C.fuel};
  const icons: Record<string,string> = {flamecolor:"🔥",smokecolor:"💨",gasanalysis:"📊",viscosity:"🌡️"};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.air}33`}}>
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {Object.entries(items).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{flex:1,padding:"8px 4px",borderRadius:10,fontSize:14,cursor:"pointer",background:sel===key?`${cols[key]}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?cols[key]:"rgba(255,255,255,0.1)"}`,textAlign:"center"}}>
            {icons[key]}
          </button>
        ))}
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${cols[sel]||C.air}44`,minHeight:80}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:cols[sel]||C.air,fontWeight:700,marginBottom:8}}>{icons[sel]} {items[sel].name}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{items[sel].desc}</div>
      </div>
    </div>
  );
}

// ── SVG 4 - FAULTS ───────────────────────────────────────────
function FaultsSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string|null>(null);
  const faults = t.faults;
  const fColors: Record<string,string> = {blacksmoke:C.smoke,flamefail:C.danger,pulsation:C.purple,highexhaust:C.fire};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.danger}33`}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {Object.entries(faults).map(([key,val]:any)=>{
          const col=fColors[key]||C.danger;
          return(
            <button key={key} onClick={()=>setSel(sel===key?null:key)} style={{padding:"10px 8px",borderRadius:10,cursor:"pointer",textAlign:"left",background:sel===key?`${col}18`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`}}>
              <div style={{fontSize:11,fontWeight:700,color:"#f0f4ff",fontFamily:"Courier New",lineHeight:1.4}}>{val.name}</div>
            </button>
          );
        })}
      </div>
      {sel&&(
        <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${fColors[sel]||C.danger}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
          <div style={{color:C.danger,fontWeight:700,marginBottom:4}}>⚠️ {lang==="fr"?"Cause":lang==="es"?"Causa":lang==="pt"?"Causa":"Cause"}</div>
          <div style={{marginBottom:8}}>{faults[sel].cause}</div>
          <div style={{color:C.safe,fontWeight:700,marginBottom:4}}>✅ {lang==="fr"?"Remède":lang==="es"?"Remedio":lang==="pt"?"Remédio":"Remedy"}</div>
          <div>{faults[sel].remedy}</div>
        </div>
      )}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)"}}>{t.s4hint}</div>}
    </div>
  );
}


const ACCIDENT_L2: any = {
  fr: {
    title: "CAS REEL : Explosion de foyer sur chaudiere auxiliaire - Manhattan Bridge (2017, rapport MAIB)",
    body: "Le 30 juin 2017, alors que le porte-conteneurs Manhattan Bridge accostait au terminal de Felixstowe, une explosion s'est produite dans le foyer de la chaudiere auxiliaire. Un matelot de machine (oiler) a ete mortellement blesse et le second mecanicien a subi de graves brulures. La chaudiere s'etait declenchee a plusieurs reprises dans la journee a cause d'echecs de flamme et d'allumage, et avait ete redemarree avec succes par le second mecanicien a chaque fois. L'oiler et le second mecanicien tentaient de la redemarrer une nouvelle fois apres un nouveau declenchement sur echec de flamme lorsque l'explosion s'est produite. L'enquete a revele des depots cireux dans le filtre d'alimentation en combustible distillat, suffisants pour provoquer des coupures d'alimentation intermittentes. Des essais ont montre que des cristaux de cire, assez gros pour boucher les filtres, pouvaient se former dans ce carburant a une temperature de 14 degC ou moins. La temperature de l'air et de la mer sur les lieux etait de 4 degC ce jour-la.",
    lessons: [
      "Une chaudiere qui declenche a plusieurs reprises sur echec de flamme ne doit jamais etre redemarree systematiquement sans investiguer la cause racine : chaque declenchement est un symptome, pas un incident isole.",
      "La qualite et la temperature du combustible distillat affectent directement la fiabilite de l'allumage : par temps froid, la formation de cire dans les filtres peut provoquer des coupures d'alimentation intermittentes et des echecs de flamme repetes.",
      "Chaque tentative de reallumage apres un echec de flamme doit etre precedee d'une purge complete du foyer pour evacuer tout gaz non brule accumule.",
      "Le personnel ne devrait pas se tenir directement devant ou au-dessus du foyer lors d'une tentative de reallumage repetee, en particulier si la cause de l'echec precedent n'a pas ete identifiee.",
    ],
  },
  en: {
    title: "REAL CASE: Auxiliary boiler furnace explosion - Manhattan Bridge (2017, MAIB report)",
    body: "On 30 June 2017, as the container ship Manhattan Bridge was berthing at Felixstowe Container Terminal, an explosion occurred in the auxiliary boiler furnace. An engine room oiler suffered fatal injuries and the second engineer suffered severe burns. The boiler had tripped several times that day due to flame and ignition failures, and had been successfully restarted by the second engineer each time. The oiler and second engineer were attempting to restart it again after another flame failure trip when the explosion occurred. The investigation found waxy deposits in the distillate fuel supply filter, sufficient to cause intermittent fuel supply problems. Testing showed that wax crystals large enough to block the filters could form in this fuel at a temperature of 14 degC or below. The air and sea temperature at the location that day was 4 degC.",
    lessons: [
      "A boiler that repeatedly trips on flame failure should never be routinely restarted without investigating the root cause: each trip is a symptom, not an isolated incident.",
      "Distillate fuel quality and temperature directly affect ignition reliability: in cold weather, wax formation in filters can cause intermittent fuel supply problems and repeated flame failures.",
      "Every relight attempt after a flame failure must be preceded by a complete furnace purge to clear any accumulated unburnt gas.",
      "Personnel should not stand directly in front of or above the furnace during repeated relight attempts, especially if the cause of the previous failure has not been identified.",
    ],
  },
  es: {
    title: "CASO REAL: Explosion del hogar de una caldera auxiliar - Manhattan Bridge (2017, informe MAIB)",
    body: "El 30 de junio de 2017, mientras el portacontenedores Manhattan Bridge atracaba en la terminal de Felixstowe, se produjo una explosion en el hogar de la caldera auxiliar. Un engrasador sufrio lesiones mortales y el segundo maquinista sufrio graves quemaduras. La caldera se habia disparado varias veces ese dia por fallos de llama y encendido, y habia sido rearrancada con exito por el segundo maquinista cada vez. El engrasador y el segundo maquinista intentaban rearrancarla de nuevo tras otro disparo por fallo de llama cuando se produjo la explosion. La investigacion encontro depositos cerosos en el filtro de alimentacion de combustible destilado, suficientes para causar problemas intermitentes de suministro. Las pruebas mostraron que podian formarse cristales de cera lo bastante grandes para obstruir los filtros a una temperatura de 14 degC o menos. La temperatura del aire y el mar en el lugar ese dia era de 4 degC.",
    lessons: [
      "Una caldera que se dispara repetidamente por fallo de llama nunca debe rearrancarse de forma rutinaria sin investigar la causa raiz: cada disparo es un sintoma, no un incidente aislado.",
      "La calidad y temperatura del combustible destilado afectan directamente a la fiabilidad del encendido: en tiempo frio, la formacion de cera en los filtros puede causar problemas intermitentes de suministro y fallos repetidos de llama.",
      "Todo intento de reencendido tras un fallo de llama debe ir precedido de una purga completa del hogar para eliminar cualquier gas sin quemar acumulado.",
      "El personal no deberia permanecer directamente delante o encima del hogar durante intentos repetidos de reencendido, especialmente si no se ha identificado la causa del fallo anterior.",
    ],
  },
  pt: {
    title: "CASO REAL: Explosao da fornalha de uma caldeira auxiliar - Manhattan Bridge (2017, relatorio MAIB)",
    body: "Em 30 de junho de 2017, enquanto o porta-conteineres Manhattan Bridge atracava no terminal de Felixstowe, ocorreu uma explosao na fornalha da caldeira auxiliar. Um lubrificador sofreu ferimentos fatais e o segundo maquinista sofreu queimaduras graves. A caldeira tinha disparado varias vezes nesse dia devido a falhas de chama e ignicao, e tinha sido rearrancada com sucesso pelo segundo maquinista de cada vez. O lubrificador e o segundo maquinista tentavam rearranca-la novamente apos outro disparo por falha de chama quando ocorreu a explosao. A investigacao encontrou depositos cerosos no filtro de alimentacao de combustivel destilado, suficientes para causar problemas intermitentes de fornecimento. Os testes mostraram que podiam formar-se cristais de cera suficientemente grandes para obstruir os filtros a uma temperatura de 14 degC ou inferior. A temperatura do ar e do mar no local nesse dia era de 4 degC.",
    lessons: [
      "Uma caldeira que dispara repetidamente por falha de chama nunca deve ser rearrancada rotineiramente sem investigar a causa raiz: cada disparo e um sintoma, nao um incidente isolado.",
      "A qualidade e temperatura do combustivel destilado afetam diretamente a fiabilidade da ignicao: em tempo frio, a formacao de cera nos filtros pode causar problemas intermitentes de fornecimento e falhas repetidas de chama.",
      "Toda tentativa de reacendimento apos uma falha de chama deve ser precedida de uma purga completa da fornalha para eliminar qualquer gas nao queimado acumulado.",
      "O pessoal nao deve permanecer diretamente a frente ou acima da fornalha durante tentativas repetidas de reacendimento, especialmente se a causa da falha anterior nao tiver sido identificada.",
    ],
  },
};

function AccidentCase({ lang }: { lang: string }) {
  const a = ACCIDENT_L2[lang] || ACCIDENT_L2.fr;
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
  const section=(title:string,children:React.ReactNode,color=C.fire)=>(
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
      {section(t.s1title,<CombustionSVG lang={lang}/>,C.fire)}
      {section(t.s2title,<BurnersSVG lang={lang}/>,C.fuel)}
      {section(t.s3title,<ControlSVG lang={lang}/>,C.air)}
      {section(t.s4title,<FaultsSVG lang={lang}/>,C.danger)}
      <AccidentCase lang={lang}/>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.gold,margin:"20px 0 14px"}}>✏️ {t.practiceTitle}</div>
      {t.questions.map((q:any,i:number)=>(
        <div key={i} style={{marginBottom:14,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.fire}33`,overflow:"hidden"}}>
          <div style={{padding:"12px 14px"}}>
            <div style={{fontSize:10,color:C.fire,letterSpacing:1,marginBottom:6,fontFamily:"'Cinzel',serif"}}>Q{i+1}</div>
            <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>{q.q}</div>
          </div>
          <div style={{padding:"0 14px 12px"}}>
            <input type="text" placeholder="?" value={inputs[i]} onChange={e=>setInputs(p=>p.map((v,j)=>j===i?e.target.value:v))} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.05)",color:"#f0f4ff",fontSize:12,fontFamily:"Courier New",marginBottom:10,boxSizing:"border-box"}}/>
            <button onClick={()=>toggle(i)} style={{padding:"7px 14px",borderRadius:8,fontSize:11,cursor:"pointer",background:shown[i]?`${C.fire}22`:"rgba(255,255,255,0.06)",border:`1px solid ${shown[i]?C.fire:"rgba(255,255,255,0.15)"}`,color:shown[i]?C.fire:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{shown[i]?t.hideAnswer:t.showAnswer}</button>
            {shown[i]&&<div style={{marginTop:10,padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.fire}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{q.a}</div>}
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
      <button onClick={onStartQuiz} style={{marginTop:20,width:"100%",padding:"16px 0",border:"none",borderRadius:14,background:"linear-gradient(135deg,#f97316,#c9922a)",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:"#060e1a",cursor:"pointer"}}>
        {lang==="fr"?"✅ COMMENCER LE QUIZ":lang==="en"?"✅ START QUIZ":lang==="es"?"✅ EMPEZAR QUIZ":"✅ COMEÇAR QUIZ"}
      </button>
    </div>
  );
}
// LessonE3_L2 - PART 2: Bank + Quiz + Main

function getBank(lang: string) {
  const b: any = {
    fr:[
      {q:"Qu'est-ce que la combustion stoechiometrique et pourquoi est-elle impossible a atteindre en pratique ?",opts:["C'est la combustion normale utilisee sur toutes les chaudieres","La reaction theorique parfaite avec exactement l'air necessaire ; impossible en pratique car le melange n'est jamais parfaitement homogene, d'ou un exces d'air toujours utilise","Une combustion sans air du tout","Une combustion qui ne produit aucun gaz"],correct:1,exp:"La combustion stoechiometrique necessite exactement 13,5 kg d'air par kg de HFO. En pratique impossible car le melange air-combustible n'est jamais parfaitement homogene : on travaille donc toujours avec un exces d'air (lambda > 1)."},
      {q:"Quelle est la plage optimale du coefficient d'exces d'air (lambda) pour une chaudiere HFO ?",opts:["0,50-0,70","1,10-1,20","2,00-2,50","5,00 et plus"],correct:1,exp:"Lambda = 1,10-1,20 (10-20% d'exces d'air) est optimal pour le HFO, correspondant a un O2 residuel de 2-4% dans les fumees. En dessous, manque d'air et suie ; au-dessus, pertes energetiques."},
      {q:"Pourquoi le HFO doit-il etre prechauffe avant le bruleur ?",opts:["Pour le steriliser","Pour reduire sa viscosite (jusqu'a 700 cSt a froid) a 10-20 cSt permettant une bonne atomisation","Pour augmenter sa densite","Le prechauffage n'est pas necessaire pour le HFO"],correct:1,exp:"Le HFO est extremement visqueux a froid (jusqu'a 700 cSt). Chauffe a 120-150 degC, sa viscosite descend a 10-20 cSt, permettant une atomisation correcte par le gicleur du bruleur."},
      {q:"Que signifie une fumee noire ou gris fonce a la sortie d'une chaudiere ?",opts:["Une combustion parfaite","Un manque d'air ou un exces de combustible, causant des imbrules et de la suie","De l'eau dans le combustible uniquement","Un fonctionnement normal a pleine charge"],correct:1,exp:"Une fumee noire/gris fonce indique un manque d'air ou un exces de fuel, produisant des imbrules (suie, CO). Il faut augmenter l'air et verifier la viscosite du combustible."},
      {q:"Quels sont les principaux produits d'une combustion incomplete du HFO ?",opts:["Uniquement de la vapeur d'eau","CO (monoxyde de carbone toxique), suie et hydrocarbures imbrules","De l'azote pur uniquement","Aucun produit different de la combustion complete"],correct:1,exp:"Une combustion incomplete (manque d'air) produit du CO toxique, de la suie (carbone imbrule, reglemente par MARPOL Annexe VI) et des hydrocarbures imbrules, en plus du CO2 et H2O normaux."},
      {q:"Comment fonctionne un bruleur a pression mecanique ?",opts:["Il vaporise le combustible par chauffage seul","Le combustible est pompe a haute pression (15-30 bar) dans un gicleur qui le pulverise en fines gouttelettes","Il utilise uniquement de la vapeur pour atomiser","Il fonctionne sans pompe, par gravite"],correct:1,exp:"Le combustible est pompe a 15-30 bar dans un gicleur (nozzle) qui le pulverise en fines gouttelettes coniques ; l'air est soufflé autour par un ventilateur. Le gicleur s'use et doit etre nettoye/remplace regulierement."},
      {q:"A quoi sert l'analyse des gaz de combustion (CO2, O2, CO) ?",opts:["Uniquement a des fins statistiques","A ajuster le rapport air/combustible jusqu'a obtenir O2 = 2-4% et CO < 200 ppm simultanement","A mesurer la vitesse du navire","A remplacer le detecteur de flamme"],correct:1,exp:"L'analyse continue des gaz (CO2, O2, CO) permet d'ajuster precisement le rapport air/fuel pour optimiser la combustion, viser O2 entre 2 et 4% et CO sous 200 ppm."},
      {q:"Que faut-il faire imperativement avant de redemarrer un bruleur apres une extinction de flamme ?",opts:["Rallumer immediatement pour ne pas perdre de pression","Purger la chambre de combustion (3-4 volumes) pour eliminer les gaz non brules avant tout redemarrage","Augmenter la pression du combustible avant de rallumer","Rien de particulier, le redemarrage est automatique"],correct:1,exp:"Apres une extinction de flamme, des gaz non brules peuvent s'etre accumules dans le foyer. Un rallumage direct crée un risque d'explosion : une purge obligatoire (3-4 volumes de chambre) est necessaire avant tout redemarrage."},
      {q:"Que se passe-t-il si le rapport air/combustible (A/F) est trop eleve (exces d'air important) ?",opts:["La combustion devient plus efficace sans limite","Les gaz chauds emportent trop de chaleur, reduisant le rendement de la chaudiere","Cela n'a aucun effet sur le rendement","Le risque d'explosion augmente fortement"],correct:1,exp:"Un exces d'air trop important emporte de la chaleur utile dans les fumees, reduisant le rendement. L'optimal se situe legerement au-dessus de la stoechiometrie (lambda = 1,10-1,20)."},
      {q:"Qu'est-ce que la corrosion a basse temperature (point de rosee acide) dans une chaudiere ?",opts:["Une corrosion qui ne concerne que l'exterieur de la coque","Le SO2 du combustible se transforme en acide sulfurique quand la surface descend sous le point de rosee acide (130-150 degC)","Une corrosion causee uniquement par l'eau de mer","Un phenomene sans consequence pratique"],correct:1,exp:"Le SO2 issu de la combustion du soufre du HFO se transforme en SO3 puis en acide sulfurique au contact de vapeur d'eau, si la surface d'echange descend sous le point de rosee acide (130-150 degC). Prevention : maintenir les gaz au-dessus de ce seuil."},
      {q:"Quel est le role du systeme de gestion du bruleur (BMS - Burner Management System) ?",opts:["Il sert uniquement a afficher la temperature","Il controle le demarrage sequence, regule le fonctionnement et coupe automatiquement le combustible en cas de defaut, avec verrouillage","Il ne fait que demarrer manuellement le bruleur","Il remplace la soupape de surete"],correct:1,exp:"Le BMS gere le demarrage sequence (purge, allumage progressif), la regulation en fonctionnement, et la coupure automatique du combustible en cas de defaut (extinction flamme, basse pression), avec verrouillage obligeant a investiguer avant tout redemarrage."},
      {q:"Que fixe MARPOL Annexe VI concernant la teneur en soufre du combustible des chaudieres ?",opts:["Aucune limite n'est fixee","Maximum 0,5% de soufre en haute mer, 0,1% dans les zones ECA","Maximum 5% de soufre partout","La limite ne s'applique qu'aux moteurs, pas aux chaudieres"],correct:1,exp:"MARPOL Annexe VI limite la teneur en soufre du combustible a 0,5% en haute mer (depuis 2020) et 0,1% dans les zones de controle des emissions (ECA), imposant l'usage de VLSFO, MGO ou de scrubbers."},
      {q:"Quels sont les trois principaux types de bruleurs utilises sur les chaudieres marines ?",opts:["Il n'existe qu'un seul type universel","Pression mecanique, a vapeur (steam-assisted) et rotatif","Uniquement des bruleurs a gaz","Electrique, magnetique et hydraulique"],correct:1,exp:"Les trois principaux types sont le bruleur a pression mecanique (gicleur haute pression), le bruleur a vapeur (atomisation assistee par vapeur) et le bruleur rotatif (coupelle tournante). Le choix depend de la puissance et du type de combustible."},
      {q:"Quel est le role du registre d'air (air damper) sur un bruleur ?",opts:["Il sert uniquement a arreter le bruleur","Il regle le debit d'air admis en fonction de la charge, couple au ventilateur pour ajuster le rapport air/combustible","Il chauffe l'air avant combustion","Il filtre le combustible avant le gicleur"],correct:1,exp:"Le registre d'air regle l'ouverture pour ajuster le debit d'air admis en fonction de la charge du bruleur, permettant de maintenir un rapport air/combustible optimal a chaque niveau de puissance."},
      {q:"Que signifie une alarme de CO (monoxyde de carbone) elevee dans les fumees de combustion ?",opts:["Un fonctionnement optimal du bruleur","Un signe de combustion incomplete et un danger toxique, necessitant un ajustement immediat du rapport air/fuel","Une simple indication de la temperature des gaz","Un probleme uniquement lie a la qualite du combustible"],correct:1,exp:"Un CO eleve (> 200 ppm) indique une combustion incomplete par manque d'air, produisant un gaz toxique et un risque d'intoxication. Il faut ajuster immediatement le rapport air/fuel en augmentant l'air."},
    ],
    en:[
      {q:"What is stoichiometric combustion and why is it impossible to achieve in practice?",opts:["It is the normal combustion used on all boilers","The theoretically perfect reaction with exactly the required air; impossible in practice since the mixture is never perfectly homogeneous, hence excess air is always used","Combustion with no air at all","Combustion producing no gases"],correct:1,exp:"Stoichiometric combustion requires exactly 13.5 kg of air per kg of HFO. In practice impossible because the air-fuel mixture is never perfectly homogeneous: excess air (lambda > 1) is always used."},
      {q:"What is the optimal range of the excess air coefficient (lambda) for an HFO boiler?",opts:["0.50-0.70","1.10-1.20","2.00-2.50","5.00 or more"],correct:1,exp:"Lambda = 1.10-1.20 (10-20% excess air) is optimal for HFO, corresponding to a residual O2 of 2-4% in flue gases. Below this, air shortage and soot; above, energy losses."},
      {q:"Why must HFO be preheated before the burner?",opts:["To sterilise it","To reduce its viscosity (up to 700 cSt cold) to 10-20 cSt allowing proper atomisation","To increase its density","Preheating is not necessary for HFO"],correct:1,exp:"HFO is extremely viscous when cold (up to 700 cSt). Heated to 120-150 degC, its viscosity drops to 10-20 cSt, allowing correct atomisation by the burner nozzle."},
      {q:"What does black or dark grey smoke at the boiler outlet indicate?",opts:["Perfect combustion","Insufficient air or excess fuel, causing unburnt products and soot","Only water in the fuel","Normal operation at full load"],correct:1,exp:"Black/dark grey smoke indicates insufficient air or excess fuel, producing unburnt products (soot, CO). Air must be increased and fuel viscosity checked."},
      {q:"What are the main products of incomplete HFO combustion?",opts:["Only water vapour","CO (toxic carbon monoxide), soot and unburnt hydrocarbons","Only pure nitrogen","No products different from complete combustion"],correct:1,exp:"Incomplete combustion (insufficient air) produces toxic CO, soot (unburnt carbon, regulated under MARPOL Annex VI) and unburnt hydrocarbons, in addition to normal CO2 and H2O."},
      {q:"How does a mechanical pressure burner work?",opts:["It vaporises fuel by heating alone","Fuel is pumped at high pressure (15-30 bar) through a nozzle that atomises it into fine droplets","It uses only steam for atomisation","It works without a pump, by gravity"],correct:1,exp:"Fuel is pumped at 15-30 bar through a nozzle that atomises it into fine conical droplets; air is blown around it by a fan. The nozzle wears and must be regularly cleaned/replaced."},
      {q:"What is flue gas analysis (CO2, O2, CO) used for?",opts:["Only for statistical purposes","To adjust the air/fuel ratio until O2 = 2-4% and CO < 200 ppm simultaneously","To measure the vessel's speed","To replace the flame detector"],correct:1,exp:"Continuous gas analysis (CO2, O2, CO) allows precise adjustment of the air/fuel ratio to optimise combustion, targeting O2 between 2 and 4% and CO below 200 ppm."},
      {q:"What must be done before restarting a burner after a flame failure?",opts:["Relight immediately to avoid losing pressure","Purge the combustion chamber (3-4 chamber volumes) to eliminate unburnt gases before any restart","Increase fuel pressure before relighting","Nothing special, restart is automatic"],correct:1,exp:"After a flame failure, unburnt gases may have accumulated in the furnace. Direct relighting creates an explosion risk: a mandatory purge (3-4 chamber volumes) is required before any restart."},
      {q:"What happens if the air/fuel ratio (A/F) is too high (large excess air)?",opts:["Combustion becomes more efficient without limit","Hot gases carry away too much heat, reducing boiler efficiency","It has no effect on efficiency","The explosion risk increases sharply"],correct:1,exp:"Too much excess air carries useful heat away in the flue gases, reducing efficiency. The optimum is slightly above stoichiometry (lambda = 1.10-1.20)."},
      {q:"What is cold-end (acid dew point) corrosion in a boiler?",opts:["Corrosion that only affects the outer hull","SO2 from the fuel turns into sulphuric acid when the surface drops below the acid dew point (130-150 degC)","Corrosion caused only by seawater","A phenomenon with no practical consequence"],correct:1,exp:"SO2 from burning HFO sulphur turns into SO3 then sulphuric acid on contact with water vapour, if the heat exchange surface drops below the acid dew point (130-150 degC). Prevention: keep flue gases above this threshold."},
      {q:"What is the role of the Burner Management System (BMS)?",opts:["It only displays temperature","It controls sequenced startup, regulates operation, and automatically cuts fuel on fault, with lockout","It only manually starts the burner","It replaces the safety valve"],correct:1,exp:"The BMS manages sequenced startup (purge, progressive ignition), operating regulation, and automatic fuel cutoff on fault (flame failure, low pressure), with lockout forcing investigation before any restart."},
      {q:"What does MARPOL Annex VI set for boiler fuel sulphur content?",opts:["No limit is set","Maximum 0.5% sulphur at sea, 0.1% in ECA zones","Maximum 5% sulphur everywhere","The limit only applies to engines, not boilers"],correct:1,exp:"MARPOL Annex VI limits fuel sulphur content to 0.5% at sea (since 2020) and 0.1% in Emission Control Areas (ECA), requiring VLSFO, MGO or scrubbers."},
      {q:"What are the three main types of burners used on marine boilers?",opts:["There is only one universal type","Mechanical pressure, steam-assisted and rotary","Only gas burners","Electric, magnetic and hydraulic"],correct:1,exp:"The three main types are the mechanical pressure burner (high-pressure nozzle), the steam-assisted burner (steam atomisation) and the rotary cup burner. Choice depends on power output and fuel type."},
      {q:"What is the role of the air register (air damper) on a burner?",opts:["It only serves to stop the burner","It adjusts the air flow admitted according to load, coupled with the fan to set the air/fuel ratio","It heats the air before combustion","It filters the fuel before the nozzle"],correct:1,exp:"The air register adjusts its opening to set the air flow admitted according to burner load, allowing an optimal air/fuel ratio to be maintained at every power level."},
      {q:"What does a high CO (carbon monoxide) alarm in combustion flue gases indicate?",opts:["Optimal burner operation","A sign of incomplete combustion and a toxic hazard, requiring immediate adjustment of the air/fuel ratio","A simple indication of flue gas temperature","A problem related only to fuel quality"],correct:1,exp:"High CO (> 200 ppm) indicates incomplete combustion from insufficient air, producing a toxic gas and poisoning risk. The air/fuel ratio must be adjusted immediately by increasing air."},
    ],
    es:[
      {q:"¿Que es la combustion estequiometrica y por que es imposible lograrla en la practica?",opts:["Es la combustion normal usada en todas las calderas","La reaccion teorica perfecta con exactamente el aire necesario; imposible en la practica porque la mezcla nunca es perfectamente homogenea, de ahi que siempre se use exceso de aire","Una combustion sin aire alguno","Una combustion que no produce ningun gas"],correct:1,exp:"La combustion estequiometrica requiere exactamente 13,5 kg de aire por kg de HFO. En la practica es imposible porque la mezcla aire-combustible nunca es perfectamente homogenea: siempre se trabaja con exceso de aire (lambda > 1)."},
      {q:"¿Cual es el rango optimo del coeficiente de exceso de aire (lambda) para una caldera de HFO?",opts:["0,50-0,70","1,10-1,20","2,00-2,50","5,00 o mas"],correct:1,exp:"Lambda = 1,10-1,20 (10-20% de exceso de aire) es optimo para el HFO, correspondiendo a un O2 residual del 2-4% en los gases. Por debajo, falta de aire y hollin; por encima, perdidas energeticas."},
      {q:"¿Por que el HFO debe precalentarse antes del quemador?",opts:["Para esterilizarlo","Para reducir su viscosidad (hasta 700 cSt en frio) a 10-20 cSt permitiendo una buena atomizacion","Para aumentar su densidad","El precalentamiento no es necesario para el HFO"],correct:1,exp:"El HFO es extremadamente viscoso en frio (hasta 700 cSt). Calentado a 120-150 degC, su viscosidad baja a 10-20 cSt, permitiendo una atomizacion correcta por la tobera del quemador."},
      {q:"¿Que significa un humo negro o gris oscuro a la salida de una caldera?",opts:["Una combustion perfecta","Falta de aire o exceso de combustible, causando imbrulados y hollin","Solo agua en el combustible","Un funcionamiento normal a plena carga"],correct:1,exp:"El humo negro/gris oscuro indica falta de aire o exceso de fuel, produciendo imbrulados (hollin, CO). Hay que aumentar el aire y verificar la viscosidad del combustible."},
      {q:"¿Cuales son los principales productos de una combustion incompleta del HFO?",opts:["Solo vapor de agua","CO (monoxido de carbono toxico), hollin e hidrocarburos sin quemar","Solo nitrogeno puro","Ningun producto diferente de la combustion completa"],correct:1,exp:"Una combustion incompleta (falta de aire) produce CO toxico, hollin (carbono sin quemar, regulado por MARPOL Anexo VI) e hidrocarburos sin quemar, ademas del CO2 y H2O normales."},
      {q:"¿Como funciona un quemador de presion mecanica?",opts:["Vaporiza el combustible solo por calentamiento","El combustible se bombea a alta presion (15-30 bar) a traves de una tobera que lo atomiza en finas gotas","Usa solo vapor para atomizar","Funciona sin bomba, por gravedad"],correct:1,exp:"El combustible se bombea a 15-30 bar a traves de una tobera que lo atomiza en finas gotas conicas; el aire es soplado alrededor por un ventilador. La tobera se desgasta y debe limpiarse/sustituirse regularmente."},
      {q:"¿Para que sirve el analisis de gases de combustion (CO2, O2, CO)?",opts:["Solo con fines estadisticos","Para ajustar la relacion aire/combustible hasta obtener O2 = 2-4% y CO < 200 ppm simultaneamente","Para medir la velocidad del buque","Para sustituir al detector de llama"],correct:1,exp:"El analisis continuo de gases (CO2, O2, CO) permite ajustar con precision la relacion aire/combustible para optimizar la combustion, buscando O2 entre 2 y 4% y CO por debajo de 200 ppm."},
      {q:"¿Que hay que hacer obligatoriamente antes de rearrancar un quemador tras una extincion de llama?",opts:["Reencender inmediatamente para no perder presion","Purgar la camara de combustion (3-4 volumenes) para eliminar gases sin quemar antes de cualquier rearranque","Aumentar la presion del combustible antes de reencender","Nada especial, el rearranque es automatico"],correct:1,exp:"Tras una extincion de llama, pueden haberse acumulado gases sin quemar en el hogar. Un reencendido directo crea riesgo de explosion: es obligatoria una purga (3-4 volumenes de camara) antes de cualquier rearranque."},
      {q:"¿Que ocurre si la relacion aire/combustible (A/F) es demasiado alta (gran exceso de aire)?",opts:["La combustion se vuelve mas eficaz sin limite","Los gases calientes se llevan demasiado calor, reduciendo el rendimiento de la caldera","No tiene ningun efecto sobre el rendimiento","El riesgo de explosion aumenta fuertemente"],correct:1,exp:"Un exceso de aire demasiado grande se lleva calor util en los gases de humo, reduciendo el rendimiento. El optimo esta ligeramente por encima de la estequiometria (lambda = 1,10-1,20)."},
      {q:"¿Que es la corrosion por punto de rocio acido en una caldera?",opts:["Una corrosion que solo afecta al exterior del casco","El SO2 del combustible se transforma en acido sulfurico cuando la superficie baja del punto de rocio acido (130-150 degC)","Una corrosion causada solo por el agua de mar","Un fenomeno sin consecuencia practica"],correct:1,exp:"El SO2 procedente de la combustion del azufre del HFO se transforma en SO3 y luego en acido sulfurico al contacto con vapor de agua, si la superficie de intercambio baja del punto de rocio acido (130-150 degC)."},
      {q:"¿Cual es el papel del sistema de gestion del quemador (BMS)?",opts:["Solo sirve para mostrar la temperatura","Controla el arranque secuenciado, regula el funcionamiento y corta automaticamente el combustible ante un fallo, con bloqueo","Solo arranca manualmente el quemador","Sustituye a la valvula de seguridad"],correct:1,exp:"El BMS gestiona el arranque secuenciado (purga, encendido progresivo), la regulacion en funcionamiento, y el corte automatico del combustible ante un fallo (extincion de llama, baja presion), con bloqueo que obliga a investigar antes de rearrancar."},
      {q:"¿Que establece MARPOL Anexo VI sobre el contenido de azufre del combustible de calderas?",opts:["No se establece ningun limite","Maximo 0,5% de azufre en alta mar, 0,1% en zonas ECA","Maximo 5% de azufre en todas partes","El limite solo se aplica a los motores, no a las calderas"],correct:1,exp:"MARPOL Anexo VI limita el contenido de azufre del combustible al 0,5% en alta mar (desde 2020) y al 0,1% en zonas de control de emisiones (ECA), exigiendo el uso de VLSFO, MGO o depuradores."},
      {q:"¿Cuales son los tres principales tipos de quemadores usados en calderas marinas?",opts:["Solo existe un tipo universal","Presion mecanica, asistido por vapor y rotativo","Solo quemadores de gas","Electrico, magnetico e hidraulico"],correct:1,exp:"Los tres tipos principales son el quemador de presion mecanica (tobera de alta presion), el quemador asistido por vapor (atomizacion con vapor) y el quemador rotativo (copa giratoria). La eleccion depende de la potencia y el tipo de combustible."},
      {q:"¿Cual es la funcion del registro de aire (air damper) en un quemador?",opts:["Solo sirve para detener el quemador","Ajusta el caudal de aire admitido segun la carga, acoplado al ventilador para fijar la relacion aire/combustible","Calienta el aire antes de la combustion","Filtra el combustible antes de la tobera"],correct:1,exp:"El registro de aire ajusta su apertura para fijar el caudal de aire admitido segun la carga del quemador, permitiendo mantener una relacion aire/combustible optima en cada nivel de potencia."},
      {q:"¿Que indica una alarma de CO (monoxido de carbono) elevado en los gases de combustion?",opts:["Un funcionamiento optimo del quemador","Un signo de combustion incompleta y un peligro toxico, que exige un ajuste inmediato de la relacion aire/combustible","Solo una indicacion de la temperatura de los gases","Un problema relacionado unicamente con la calidad del combustible"],correct:1,exp:"Un CO elevado (> 200 ppm) indica una combustion incompleta por falta de aire, produciendo un gas toxico y riesgo de intoxicacion. Hay que ajustar de inmediato la relacion aire/combustible aumentando el aire."},
    ],
    pt:[
      {q:"O que e a combustao estequiometrica e por que e impossivel alcanca-la na pratica?",opts:["E a combustao normal usada em todas as caldeiras","A reacao teoricamente perfeita com exatamente o ar necessario; impossivel na pratica pois a mistura nunca e perfeitamente homogenea, por isso usa-se sempre excesso de ar","Uma combustao sem ar nenhum","Uma combustao que nao produz gases"],correct:1,exp:"A combustao estequiometrica requer exatamente 13,5 kg de ar por kg de HFO. Na pratica e impossivel porque a mistura ar-combustivel nunca e perfeitamente homogenea: trabalha-se sempre com excesso de ar (lambda > 1)."},
      {q:"Qual e a faixa otima do coeficiente de excesso de ar (lambda) para uma caldeira de HFO?",opts:["0,50-0,70","1,10-1,20","2,00-2,50","5,00 ou mais"],correct:1,exp:"Lambda = 1,10-1,20 (10-20% de excesso de ar) e otimo para o HFO, correspondendo a um O2 residual de 2-4% nos gases. Abaixo disso, falta de ar e fuligem; acima, perdas energeticas."},
      {q:"Por que o HFO deve ser pre-aquecido antes do queimador?",opts:["Para esteriliza-lo","Para reduzir a sua viscosidade (ate 700 cSt a frio) para 10-20 cSt permitindo boa atomizacao","Para aumentar a sua densidade","O pre-aquecimento nao e necessario para o HFO"],correct:1,exp:"O HFO e extremamente viscoso a frio (ate 700 cSt). Aquecido a 120-150 degC, a sua viscosidade desce para 10-20 cSt, permitindo atomizacao correta pelo bico do queimador."},
      {q:"O que significa um fumo preto ou cinzento escuro na saida de uma caldeira?",opts:["Uma combustao perfeita","Falta de ar ou excesso de combustivel, causando inqueimados e fuligem","Apenas agua no combustivel","Um funcionamento normal a plena carga"],correct:1,exp:"O fumo preto/cinzento escuro indica falta de ar ou excesso de fuel, produzindo inqueimados (fuligem, CO). E preciso aumentar o ar e verificar a viscosidade do combustivel."},
      {q:"Quais sao os principais produtos de uma combustao incompleta do HFO?",opts:["Apenas vapor de agua","CO (monoxido de carbono toxico), fuligem e hidrocarbonetos por queimar","Apenas azoto puro","Nenhum produto diferente da combustao completa"],correct:1,exp:"Uma combustao incompleta (falta de ar) produz CO toxico, fuligem (carbono por queimar, regulado pela MARPOL Anexo VI) e hidrocarbonetos por queimar, alem do CO2 e H2O normais."},
      {q:"Como funciona um queimador de pressao mecanica?",opts:["Vaporiza o combustivel apenas por aquecimento","O combustivel e bombeado a alta pressao (15-30 bar) atraves de um bico que o atomiza em finas gotas","Usa apenas vapor para atomizar","Funciona sem bomba, por gravidade"],correct:1,exp:"O combustivel e bombeado a 15-30 bar atraves de um bico que o atomiza em finas gotas conicas; o ar e soprado a volta por um ventilador. O bico desgasta-se e deve ser limpo/substituido regularmente."},
      {q:"Para que serve a analise dos gases de combustao (CO2, O2, CO)?",opts:["Apenas para fins estatisticos","Para ajustar a relacao ar/combustivel ate obter O2 = 2-4% e CO < 200 ppm simultaneamente","Para medir a velocidade do navio","Para substituir o detetor de chama"],correct:1,exp:"A analise continua dos gases (CO2, O2, CO) permite ajustar com precisao a relacao ar/combustivel para otimizar a combustao, visando O2 entre 2 e 4% e CO abaixo de 200 ppm."},
      {q:"O que e obrigatorio fazer antes de rearrancar um queimador apos uma extincao de chama?",opts:["Reacender imediatamente para nao perder pressao","Purgar a camara de combustao (3-4 volumes) para eliminar gases por queimar antes de qualquer rearranque","Aumentar a pressao do combustivel antes de reacender","Nada de especial, o rearranque e automatico"],correct:1,exp:"Apos uma extincao de chama, podem ter-se acumulado gases por queimar na fornalha. Um reacendimento direto cria risco de explosao: e obrigatoria uma purga (3-4 volumes de camara) antes de qualquer rearranque."},
      {q:"O que acontece se a relacao ar/combustivel (A/F) for demasiado alta (grande excesso de ar)?",opts:["A combustao torna-se mais eficaz sem limite","Os gases quentes levam calor a mais, reduzindo o rendimento da caldeira","Nao tem efeito nenhum no rendimento","O risco de explosao aumenta fortemente"],correct:1,exp:"Um excesso de ar demasiado grande leva calor util nos gases de combustao, reduzindo o rendimento. O otimo situa-se ligeiramente acima da estequiometria (lambda = 1,10-1,20)."},
      {q:"O que e a corrosao por ponto de orvalho acido numa caldeira?",opts:["Uma corrosao que so afeta o exterior do casco","O SO2 do combustivel transforma-se em acido sulfurico quando a superficie desce abaixo do ponto de orvalho acido (130-150 degC)","Uma corrosao causada apenas pela agua do mar","Um fenomeno sem consequencia pratica"],correct:1,exp:"O SO2 proveniente da combustao do enxofre do HFO transforma-se em SO3 e depois em acido sulfurico ao contacto com vapor de agua, se a superficie de troca descer abaixo do ponto de orvalho acido (130-150 degC)."},
      {q:"Qual e o papel do sistema de gestao do queimador (BMS)?",opts:["So serve para mostrar a temperatura","Controla o arranque sequenciado, regula o funcionamento e corta automaticamente o combustivel em caso de falha, com bloqueio","So arranca manualmente o queimador","Substitui a valvula de seguranca"],correct:1,exp:"O BMS gere o arranque sequenciado (purga, ignicao progressiva), a regulacao em funcionamento, e o corte automatico do combustivel em caso de falha (extincao de chama, baixa pressao), com bloqueio que obriga a investigar antes de rearrancar."},
      {q:"O que estabelece a MARPOL Anexo VI sobre o teor de enxofre do combustivel de caldeiras?",opts:["Nenhum limite e estabelecido","Maximo 0,5% de enxofre em alto mar, 0,1% em zonas ECA","Maximo 5% de enxofre em todo o lado","O limite so se aplica aos motores, nao as caldeiras"],correct:1,exp:"A MARPOL Anexo VI limita o teor de enxofre do combustivel a 0,5% em alto mar (desde 2020) e 0,1% em zonas de controlo de emissoes (ECA), exigindo o uso de VLSFO, MGO ou lavadores de gases."},
      {q:"Quais sao os tres principais tipos de queimadores usados em caldeiras marinhas?",opts:["So existe um tipo universal","Pressao mecanica, assistido a vapor e rotativo","So queimadores a gas","Eletrico, magnetico e hidraulico"],correct:1,exp:"Os tres tipos principais sao o queimador de pressao mecanica (bico de alta pressao), o queimador assistido a vapor (atomizacao a vapor) e o queimador rotativo (copo giratorio). A escolha depende da potencia e do tipo de combustivel."},
      {q:"Qual e a funcao do registo de ar (air damper) num queimador?",opts:["So serve para parar o queimador","Ajusta o caudal de ar admitido conforme a carga, acoplado ao ventilador para fixar a relacao ar/combustivel","Aquece o ar antes da combustao","Filtra o combustivel antes do bico"],correct:1,exp:"O registo de ar ajusta a sua abertura para fixar o caudal de ar admitido conforme a carga do queimador, permitindo manter uma relacao ar/combustivel otima em cada nivel de potencia."},
      {q:"O que indica um alarme de CO (monoxido de carbono) elevado nos gases de combustao?",opts:["Um funcionamento otimo do queimador","Um sinal de combustao incompleta e um perigo toxico, exigindo um ajuste imediato da relacao ar/combustivel","Apenas uma indicacao da temperatura dos gases","Um problema relacionado apenas com a qualidade do combustivel"],correct:1,exp:"Um CO elevado (> 200 ppm) indica uma combustao incompleta por falta de ar, produzindo um gas toxico e risco de intoxicacao. E preciso ajustar de imediato a relacao ar/combustivel aumentando o ar."},
    ],
  };
  return b[lang]||b.fr;
}

function getQuiz(lang: string) {
  const q: any = {
    fr:[
      {q:"Quel est l'excès d'air optimal (λ) pour une chaudière marine fonctionnant au HFO ?",opts:["λ = 0,90 (10% de manque d'air)","λ = 1,00 (stœchiométrique exact)","λ = 1,10-1,20 (10-20% d'excès)","λ = 1,50-2,00 (50-100% d'excès)"],correct:2,exp:"λ = 1,10-1,20 (10-20% d'excès d'air) est optimal pour le HFO. Cet excès garantit une combustion complète malgré l'hétérogénéité du mélange. Un manque d'air (λ < 1) provoque des imbrûlés et de la suie. Un excès trop important (λ > 1,30) fait perdre de l'énergie dans les gaz de fumée."},
      {q:"Quelle couleur de fumée indique un manque d'air dans la combustion ?",opts:["Blanche","Incolore","Noire","Brun-jaune"],correct:2,exp:"La fumée noire indique un manque d'air ou un excès de combustible : le HFO ne brûle pas complètement et produit de la suie (carbone imbrûlé). Solution : augmenter l'air (ouvrir le registre d'air). La fumée blanche indique généralement de l'eau dans le combustible. L'incolore signifie une combustion correcte."},
      {q:"À quelle température doit-on préchauffer le HFO pour obtenir une viscosité de 10-20 cSt avant le brûleur ?",opts:["40-60 degC","80-100 degC","120-150 degC","200-250 degC"],correct:2,exp:"Le HFO doit être chauffé à 120-150 degC pour ramener sa viscosité à 10-20 cSt, nécessaire pour une bonne atomisation dans le brûleur. En dessous de cette température, la viscosité est trop élevée → mauvaise atomisation → combustion incomplète → fumée noire."},
      {q:"Quelle est la valeur cible de CO2 dans les gaz de combustion d'une chaudière HFO bien réglée ?",opts:["3-5%","8-10%","13-14%","18-20%"],correct:2,exp:"Un CO2 de 13-14% est le signe d'une combustion HFO correcte et efficace. Une valeur plus basse indique trop d'air dilué ou une combustion incomplète. Une valeur plus haute (> 14%) est impossible avec l'air (21% O2) et signifierait un problème de mesure. Corrélativement, O2 résiduel doit être de 2-4%."},
      {q:"Qu'est-ce qui se passe si on tente de rallumer un brûleur immédiatement après une extinction de flamme sans purge ?",opts:["Le brûleur démarre normalement","La flamme est instable","Risque d'explosion des gaz non brûlés accumulés","Le combustible ne s'enflamme pas"],correct:2,exp:"Après une extinction de flamme, des gaz de combustion non brûlés peuvent s'être accumulés dans la chambre. Si on rallume directement, ces gaz s'enflamment violemment = explosion. C'est pourquoi une purge obligatoire (ventilation de la chambre pendant 30-60 secondes) est requise avant tout redémarrage. Le BMS impose ce verrouillage automatiquement."},
    ],
    en:[
      {q:"What is the optimal excess air (λ) for a marine HFO boiler?",opts:["λ = 0.90 (10% air deficiency)","λ = 1.00 (exact stoichiometric)","λ = 1.10-1.20 (10-20% excess)","λ = 1.50-2.00 (50-100% excess)"],correct:2,exp:"λ = 1.10-1.20 (10-20% excess air) is optimal for HFO. This excess ensures complete combustion despite mixture heterogeneity. Air deficiency (λ < 1) causes unburnt products and soot. Too much excess (λ > 1.30) wastes energy in flue gases."},
      {q:"What smoke colour indicates insufficient air in combustion?",opts:["White","Colourless","Black","Brown-yellow"],correct:2,exp:"Black smoke indicates insufficient air or fuel excess: HFO doesn't burn completely and produces soot (unburnt carbon). Solution: increase air (open air register). White smoke generally indicates water in fuel. Colourless means correct combustion."},
      {q:"At what temperature must HFO be preheated to achieve 10-20 cSt viscosity before the burner?",opts:["40-60 degC","80-100 degC","120-150 degC","200-250 degC"],correct:2,exp:"HFO must be heated to 120-150 degC to reduce viscosity to 10-20 cSt, necessary for good burner atomisation. Below this temperature, viscosity too high → poor atomisation → incomplete combustion → black smoke."},
      {q:"What is the target CO2 value in flue gases of a well-adjusted HFO boiler?",opts:["3-5%","8-10%","13-14%","18-20%"],correct:2,exp:"CO2 of 13-14% indicates correct and efficient HFO combustion. Lower value indicates too much dilution air or incomplete combustion. Higher value (> 14%) is impossible with air (21% O2) and would indicate a measurement error. Correspondingly, residual O2 should be 2-4%."},
      {q:"What happens if you try to relight a burner immediately after flame failure without purging?",opts:["Burner starts normally","Flame is unstable","Risk of explosion from accumulated unburnt gases","Fuel doesn't ignite"],correct:2,exp:"After flame failure, accumulated unburnt combustion gases may be present in the chamber. Direct relight causes violent ignition of these gases = explosion. Mandatory purge (chamber ventilation for 30-60 seconds) required before any restart. BMS imposes this lockout automatically."},
    ],
    es:[
      {q:"¿Cuál es el exceso de aire óptimo (λ) para una caldera marina de HFO?",opts:["λ = 0,90 (10% de defecto)","λ = 1,00 (estequiométrico exacto)","λ = 1,10-1,20 (10-20% de exceso)","λ = 1,50-2,00 (50-100% de exceso)"],correct:2,exp:"λ = 1,10-1,20 es óptimo para el HFO. Garantiza combustión completa pese a la heterogeneidad de la mezcla. Defecto (λ < 1) → imbrûlés y hollín. Exceso (λ > 1,30) → pérdidas en los humos."},
      {q:"¿Qué color de humo indica falta de aire en la combustión?",opts:["Blanco","Incoloro","Negro","Marrón-amarillo"],correct:2,exp:"El humo negro indica falta de aire o exceso de combustible: el HFO no arde completamente y produce hollín. Solución: aumentar el aire. El humo blanco indica agua en el combustible. El incoloro = combustión correcta."},
      {q:"¿A qué temperatura hay que precalentar el HFO para obtener 10-20 cSt?",opts:["40-60 degC","80-100 degC","120-150 degC","200-250 degC"],correct:2,exp:"El HFO debe calentarse a 120-150 degC para reducir su viscosidad a 10-20 cSt. Por debajo: mala atomización, combustión incompleta, humo negro."},
      {q:"¿Cuál es el valor objetivo de CO2 en los gases de una caldera HFO bien ajustada?",opts:["3-5%","8-10%","13-14%","18-20%"],correct:2,exp:"CO2 del 13-14% indica combustión correcta y eficiente. Valor menor = demasiado aire o combustión incompleta. El O2 residual debe ser del 2-4%."},
      {q:"¿Qué ocurre si se intenta encender un quemador inmediatamente tras una extinción sin purga?",opts:["El quemador arranca normalmente","La llama es inestable","Riesgo de explosión de gases no quemados acumulados","El combustible no se enciende"],correct:2,exp:"Tras una extinción, pueden haberse acumulado gases sin quemar. El encendido directo provoca su inflamación violenta = explosión. Se requiere purga obligatoria (ventilación 30-60 s). El BMS impone este bloqueo automáticamente."},
    ],
    pt:[
      {q:"Qual é o excesso de ar ótimo (λ) para uma caldeira marinha a HFO?",opts:["λ = 0,90 (10% de défice)","λ = 1,00 (estequiométrico exato)","λ = 1,10-1,20 (10-20% de excesso)","λ = 1,50-2,00 (50-100% de excesso)"],correct:2,exp:"λ = 1,10-1,20 é ótimo para o HFO. Garante combustão completa apesar da heterogeneidade da mistura. Défice (λ < 1) → inqueimados e fuligem. Excesso (λ > 1,30) → perdas nos gases."},
      {q:"Que cor de fumo indica falta de ar na combustão?",opts:["Branco","Incolor","Preto","Castanho-amarelo"],correct:2,exp:"O fumo preto indica falta de ar ou excesso de combustível: o HFO não arde completamente e produz fuligem. Solução: aumentar o ar. O fumo branco indica água no combustível. O incolor = combustão correta."},
      {q:"A que temperatura deve ser pré-aquecido o HFO para obter 10-20 cSt?",opts:["40-60 degC","80-100 degC","120-150 degC","200-250 degC"],correct:2,exp:"O HFO deve ser aquecido a 120-150 degC para reduzir a viscosidade a 10-20 cSt. Abaixo: má atomização, combustão incompleta, fumo preto."},
      {q:"Qual é o valor objetivo de CO2 nos gases de uma caldeira HFO bem ajustada?",opts:["3-5%","8-10%","13-14%","18-20%"],correct:2,exp:"CO2 de 13-14% indica combustão correta e eficiente. Valor menor = demasiado ar ou combustão incompleta. O O2 residual deve ser de 2-4%."},
      {q:"O que acontece se se tentar acender um queimador imediatamente após extinção sem purga?",opts:["O queimador arranca normalmente","A chama é instável","Risco de explosão dos gases inqueimados acumulados","O combustível não se inflama"],correct:2,exp:"Após uma extinção, podem ter-se acumulado gases inqueimados. O acendimento direto provoca a sua inflamação violenta = explosão. Purga obrigatória (ventilação 30-60 s). O BMS impõe este bloqueio automaticamente."},
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
        <button onClick={startBank} style={{width:"100%",padding:"14px 0",borderRadius:12,background:`linear-gradient(135deg,#f97316,#c9922a)`,border:"none",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,color:"#060e1a",cursor:"pointer",letterSpacing:2}}>{l.start}</button>
      )}
      {bankIdx!==null&&!bankDone&&(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:10,fontSize:11,color:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>
            <span>Q{bankCur+1}/{bank.length}</span>
            <span style={{color:"#f97316"}}>✦ {bankScore}</span>
          </div>
          <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",marginBottom:12}}>
            <div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,#f97316,#c9922a)`,width:`${(bankCur/bank.length)*100}%`,transition:"width 0.3s"}}/>
          </div>
          <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New",marginBottom:12,padding:12,borderRadius:10,background:"rgba(10,22,40,0.8)",border:`1px solid #f9731622`}}>{bank[bankCur].q}</div>
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
              <button onClick={bankNext} style={{width:"100%",padding:"12px 0",borderRadius:12,background:`linear-gradient(135deg,#f97316,#c9922a)`,border:"none",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:"#060e1a",cursor:"pointer",letterSpacing:2}}>{bankCur+1>=bank.length?l.trophy:l.next}</button>
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
  const optColors=["#f97316","#4da6ff","#6dbf8a","#c084fc"];

  if(done) return (
    <div style={{padding:"24px 14px"}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:42,marginBottom:8}}>🔥</div>
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
      <button onClick={()=>onComplete(xp)} style={{width:"100%",padding:"15px 0",border:"none",borderRadius:14,background:"linear-gradient(135deg,#f97316,#c9922a)",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:"#060e1a",cursor:"pointer"}}>🔥 {l.finish}</button>
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

export default function LessonE3_L2({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t=T[lang]||T.fr;
  const [phase,setPhase]=useState<"content"|"quiz">("content");
  const [quizDone,setQuizDone]=useState(false);
  const progress=phase==="content"?50:quizDone?100:85;
  const backLabel=lang==="fr"?"◀ Retour":lang==="en"?"◀ Back":lang==="es"?"◀ Volver":"◀ Voltar";
  const moduleFull=lang==="fr"?"Module E3 — Chaudières":lang==="en"?"Module E3 — Boilers":lang==="es"?"Módulo E3 — Calderas":"Módulo E3 — Caldeiras";
  const lessonOf=lang==="fr"?"Leçon 2/6":lang==="en"?"Lesson 2/6":lang==="es"?"Lección 2/6":"Lição 2/6";
  const badgeText=lang==="fr"?`⚙️ ${moduleFull} · Leçon 2/6 · ⭐ Premium · 200 XP`:lang==="en"?`⚙️ ${moduleFull} · Lesson 2/6 · ⭐ Premium · 200 XP`:lang==="es"?`⚙️ ${moduleFull} · Lección 2/6 · ⭐ Premium · 200 XP`:`⚙️ ${moduleFull} · Lição 2/6 · ⭐ Premium · 200 XP`;
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(249,115,22,0.22)"}}>
        <div style={{minHeight:54,display:"flex",alignItems:"center",padding:"8px 16px",gap:12}}>
          <button onClick={phase==="content"?onBack:()=>setPhase("content")} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>{backLabel}</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:10,color:"#f97316",letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🔥 {moduleFull}</div>
            <div style={{fontSize:11,color:"rgba(240,244,255,0.45)"}}>{lessonOf}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:"1px solid rgba(201,146,42,0.44)",color:"#c9922a",fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:"#f97316",fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:"linear-gradient(90deg,#f97316,#c9922a)",transition:"width 0.5s ease"}}/>
        </div>
      </div>
      {phase==="content"&&<div style={{padding:"20px 16px 0"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(249,115,22,0.15)",border:"1px solid rgba(249,115,22,0.44)",fontSize:11,color:"#f97316",fontWeight:700}}>{badgeText}</div>
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
