// LessonE3_L2 — Combustion & Brûleurs | PART 1
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
    moduleLabel:"MACHINE — CHAUDIÈRES",
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
      "Le HFO doit être préchauffé à 120-150°C pour une bonne atomisation",
      "L'analyse des gaz de combustion (CO₂, O₂, CO) permet d'optimiser le brûleur",
    ],
    combustion:{
      stoichio:{ name:"Stœchiométrie", desc:"La combustion stœchiométrique est la réaction théorique parfaite avec exactement la quantité d'air nécessaire. Pour 1 kg de HFO : environ 13,5 kg d'air (soit ~10,5 m³). En pratique impossible à réaliser parfaitement : on travaille toujours avec un excès d'air." },
      excessair:{ name:"Excès d'air (λ)", desc:"λ = air réel / air stœchiométrique. λ = 1,0 : combustion parfaite (théorique). λ < 1,0 : manque d'air → combustion incomplète, fumée noire, suie, CO. λ = 1,10-1,20 : excès optimal pour HFO (10-20%). λ > 1,30 : trop d'air → perte d'énergie par gaz de fumée froids, condensation acide." },
      products:{ name:"Produits de combustion", desc:"Combustion complète : CO₂ + H₂O + N₂ + O₂ résiduel. Combustion incomplète : + CO (monoxyde de carbone toxique) + suie (carbone imbrûlé) + hydrocarbures imbrûlés. Les gaz de combustion typiques d'une chaudière HFO : 13-14% CO₂, 2-4% O₂, < 200 ppm CO." },
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
      gasanalysis:{ name:"Analyse des gaz de combustion", desc:"CO₂ optimal pour HFO : 13-14%. O₂ résiduel : 2-4% (correspond à λ ≈ 1,10-1,20). CO : < 200 ppm (si > 200 ppm → combustion incomplète). Température gaz sortie : 180-220°C (si trop élevée → encrassement ECE ou manque d'air)." },
      viscosity:{ name:"Viscosité du combustible", desc:"HFO doit être à 10-20 cSt pour une bonne atomisation. Atteint à 120-150°C selon la teneur en soufre et le grade. Viscosimètre automatique recommandé. Trop visqueux → mauvaise atomisation → imbrûlés. Trop fluide → gouttelettes trop grandes → mauvaise vaporisation." },
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
        a:"L'excès d'air (λ) est le rapport entre l'air réellement fourni et l'air théoriquement nécessaire (stœchiométrique). λ = 1,0 : combustion théoriquement parfaite. λ < 1,0 : manque d'air → combustion incomplète, CO, suie. λ > 1,0 : excès d'air. Pour le HFO, on utilise λ = 1,10-1,20 (excès de 10-20%) car : 1. Le HFO est un combustible complexe et visqueux → atomisation imparfaite → certaines gouttelettes nécessitent plus de temps pour brûler. 2. La composition du HFO varie → un excès garantit une combustion complète malgré les variations. 3. Le risque d'imbrûlés (CO, suie) est plus grave que la perte d'énergie par un léger excès d'air. Un excès > 30% est inutile et coûteux car les gaz de fumée emportent plus de chaleur. La mesure de O₂ résiduel (2-4%) et de CO₂ (13-14%) permet de vérifier que λ est correct." },
      { q:"Quelle est la différence entre un brûleur à pression mécanique et un brûleur à vapeur ? Quels sont les avantages de chacun ?",
        a:"Brûleur à pression mécanique : le combustible est atomisé par injection à haute pression (15-30 bar) à travers un gicleur. Avantages : simple, robuste, pas de consommation de vapeur. Inconvénients : sensible à la viscosité (préchauffage précis nécessaire), débit difficile à moduler (changement de gicleur). Brûleur à vapeur (steam atomising) : la vapeur à 5-10 bar est mélangée au combustible dans le brûleur pour l'atomiser. Avantages : meilleure atomisation (gouttelettes plus fines), moins sensible à la viscosité, bonne flexibilité de débit, adapté aux HFO très lourds. Inconvénients : consomme de la vapeur (environ 0,5-1% de la production), nécessite de la vapeur disponible (problème à démarrage à froid). Choix : les grandes chaudières et les pétroliers utilisent souvent l'atomisation à vapeur pour sa fiabilité. Les chaudières auxiliaires standard utilisent souvent la pression mécanique." },
      { q:"Comment diagnostiquer et corriger une combustion incomplète (fumée noire) sur une chaudière marine ?",
        a:"Diagnostic fumée noire : La fumée noire est causée par un manque d'air ou un excès de combustible → imbrûlés (suie, CO). Procédure de diagnostic : 1. Vérifier la couleur et l'intensité de la fumée (noire dense = problème grave). 2. Mesurer les gaz de combustion : O₂ < 1% → manque d'air, CO > 500 ppm → imbrûlés. 3. Vérifier la viscosité du HFO (10-20 cSt) → si trop haute → mauvaise atomisation. 4. Inspecter le gicleur : colmatage partiel → mauvaise pulvérisation. 5. Vérifier le registre d'air et le ventilateur. Corrections : Augmenter l'air (ouvrir progressivement le registre). Si viscosité trop haute → augmenter la température de préchauffage. Nettoyer ou remplacer le gicleur. Si CO₂ > 14% → réduire le combustible. Important : enregistrer toute émission excessive selon MARPOL Annexe VI." },
    ],
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
  },
  en:{
    moduleLabel:"ENGINE — BOILERS",
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
      "HFO must be preheated to 120-150°C for good atomisation",
      "Flue gas analysis (CO₂, O₂, CO) allows burner optimisation",
    ],
    combustion:{
      stoichio:{ name:"Stoichiometry", desc:"Stoichiometric combustion is the theoretically perfect reaction with exactly the required air quantity. For 1 kg HFO: approximately 13.5 kg air (≈10.5 m³). In practice impossible to achieve perfectly: always operate with excess air." },
      excessair:{ name:"Excess air (λ)", desc:"λ = actual air / stoichiometric air. λ = 1.0: perfect combustion (theoretical). λ < 1.0: insufficient air → incomplete combustion, black smoke, soot, CO. λ = 1.10-1.20: optimal excess for HFO (10-20%). λ > 1.30: too much air → energy loss through cold flue gases, acid condensation." },
      products:{ name:"Combustion products", desc:"Complete combustion: CO₂ + H₂O + N₂ + residual O₂. Incomplete combustion: + CO (toxic carbon monoxide) + soot (unburnt carbon) + unburnt hydrocarbons. Typical HFO boiler flue gases: 13-14% CO₂, 2-4% O₂, < 200 ppm CO." },
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
      gasanalysis:{ name:"Flue gas analysis", desc:"Optimal CO₂ for HFO: 13-14%. Residual O₂: 2-4% (corresponds to λ ≈ 1.10-1.20). CO: < 200 ppm (if > 200 ppm → incomplete combustion). Flue gas outlet temperature: 180-220°C (if too high → EGE fouling or insufficient air)." },
      viscosity:{ name:"Fuel viscosity", desc:"HFO must be at 10-20 cSt for good atomisation. Achieved at 120-150°C depending on sulphur content and grade. Automatic viscometer recommended. Too viscous → poor atomisation → unburnt. Too fluid → droplets too large → poor vaporisation." },
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
        a:"Excess air (λ) is the ratio between air actually supplied and theoretically required (stoichiometric) air. λ = 1.0: theoretically perfect combustion. λ < 1.0: insufficient air → incomplete combustion, CO, soot. λ > 1.0: excess air. For HFO, λ = 1.10-1.20 (10-20% excess) is used because: 1. HFO is a complex, viscous fuel → imperfect atomisation → some droplets need more time to burn. 2. HFO composition varies → excess ensures complete combustion despite variations. 3. Risk of unburnt products (CO, soot) is worse than energy loss from slight air excess. Excess > 30% is wasteful as flue gases carry more heat. Measuring residual O₂ (2-4%) and CO₂ (13-14%) verifies λ is correct." },
      { q:"What is the difference between a mechanical pressure burner and a steam atomising burner? What are each one's advantages?",
        a:"Mechanical pressure burner: fuel atomised by high-pressure injection (15-30 bar) through a nozzle. Advantages: simple, robust, no steam consumption. Disadvantages: sensitive to viscosity (precise preheating needed), flow difficult to modulate (nozzle change required). Steam atomising burner: steam at 5-10 bar mixed with fuel in the burner to atomise it. Advantages: better atomisation (finer droplets), less sensitive to viscosity, good flow flexibility, suitable for very heavy HFO. Disadvantages: consumes steam (approx 0.5-1% of output), requires steam availability (problem at cold start). Choice: large boilers and tankers often use steam atomisation for reliability. Standard auxiliary boilers often use mechanical pressure." },
      { q:"How to diagnose and correct incomplete combustion (black smoke) on a marine boiler?",
        a:"Black smoke diagnosis: Black smoke caused by insufficient air or fuel excess → unburnt products (soot, CO). Diagnostic procedure: 1. Check smoke colour and intensity (dense black = serious problem). 2. Measure flue gases: O₂ < 1% → insufficient air, CO > 500 ppm → unburnt products. 3. Check HFO viscosity (10-20 cSt) → if too high → poor atomisation. 4. Inspect nozzle: partial blockage → poor atomisation. 5. Check air register and fan. Corrections: Increase air (gradually open register). If viscosity too high → increase preheat temperature. Clean or replace nozzle. If CO₂ > 14% → reduce fuel. Important: record any excessive emissions per MARPOL Annex VI." },
    ],
    showAnswer:"Show answer", hideAnswer:"Hide",
  },
  es:{
    moduleLabel:"MÁQUINAS — CALDERAS",
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
      "El HFO debe precalentarse a 120-150°C para una buena atomización",
      "El análisis de gases de combustión permite optimizar el quemador",
    ],
    combustion:{
      stoichio:{ name:"Estequiometría", desc:"La combustión estequiométrica es la reacción teórica perfecta con exactamente la cantidad de aire necesaria. Para 1 kg de HFO: ≈13,5 kg de aire. En la práctica imposible de conseguir perfectamente: siempre se trabaja con exceso de aire." },
      excessair:{ name:"Exceso de aire (λ)", desc:"λ = aire real / aire estequiométrico. λ = 1,0: combustión perfecta (teórica). λ < 1,0: falta de aire → combustión incompleta, humo negro, hollín, CO. λ = 1,10-1,20: exceso óptimo para HFO (10-20%). λ > 1,30: demasiado aire → pérdida de energía." },
      products:{ name:"Productos de combustión", desc:"Combustión completa: CO₂ + H₂O + N₂ + O₂ residual. Incompleta: + CO (tóxico) + hollín. Gases típicos de caldera HFO: 13-14% CO₂, 2-4% O₂, < 200 ppm CO." },
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
      gasanalysis:{ name:"Análisis de gases de combustión", desc:"CO₂ óptimo: 13-14%. O₂ residual: 2-4% (λ ≈ 1,10-1,20). CO: < 200 ppm. Temperatura gases salida: 180-220°C." },
      viscosity:{ name:"Viscosidad del combustible", desc:"HFO a 10-20 cSt para buena atomización. Conseguido a 120-150°C según el grado. Viscosímetro automático recomendado." },
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
        a:"λ = aire real / aire estequiométrico. λ = 1,0: combustión teóricamente perfecta. λ < 1,0: falta de aire → CO, hollín. Para HFO λ = 1,10-1,20 porque: el HFO es viscoso y complejo → atomización imperfecta → algunas gotas necesitan más tiempo. La composición varía → el exceso garantiza combustión completa. El riesgo de imbrûlés es peor que la pequeña pérdida por exceso de aire. O₂ residual (2-4%) y CO₂ (13-14%) confirman el λ correcto." },
      { q:"¿Cuál es la diferencia entre un quemador de presión mecánica y uno de atomización por vapor?",
        a:"Presión mecánica: combustible atomizado por inyección a alta presión (15-30 bar). Ventajas: simple, robusto, sin consumo de vapor. Inconvenientes: sensible a la viscosidad, modulación de caudal difícil. Vapor: vapor a 5-10 bar mezclado con el combustible. Ventajas: mejor atomización, menos sensible a la viscosidad, buena flexibilidad. Inconvenientes: consume vapor, necesita vapor disponible en arranque frío." },
      { q:"¿Cómo diagnosticar y corregir una combustión incompleta (humo negro) en una caldera marina?",
        a:"Diagnóstico: humo negro = falta de aire o exceso de fuel. Procedimiento: 1. Medir gases: O₂ < 1% → falta de aire, CO > 500 ppm → imbrûlés. 2. Verificar viscosidad HFO (10-20 cSt). 3. Inspeccionar tobera. 4. Verificar registro de aire y ventilador. Correcciones: aumentar el aire progresivamente, aumentar temperatura de precalentamiento, limpiar/sustituir tobera. Registrar cualquier emisión excesiva según MARPOL Anexo VI." },
    ],
    showAnswer:"Ver corrección", hideAnswer:"Ocultar",
  },
  pt:{
    moduleLabel:"MÁQUINAS — CALDEIRAS",
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
      "O HFO deve ser pré-aquecido a 120-150°C para boa atomização",
      "A análise dos gases de combustão permite otimizar o queimador",
    ],
    combustion:{
      stoichio:{ name:"Estequiometria", desc:"A combustão estequiométrica é a reação teórica perfeita com exatamente a quantidade de ar necessária. Para 1 kg de HFO: ≈13,5 kg de ar. Na prática impossível de atingir: trabalha-se sempre com excesso de ar." },
      excessair:{ name:"Excesso de ar (λ)", desc:"λ = ar real / ar estequiométrico. λ = 1,0: combustão perfeita (teórica). λ < 1,0: falta de ar → combustão incompleta, fumo preto, fuligem, CO. λ = 1,10-1,20: excesso ótimo para HFO (10-20%). λ > 1,30: ar excessivo → perda de energia." },
      products:{ name:"Produtos de combustão", desc:"Combustão completa: CO₂ + H₂O + N₂ + O₂ residual. Incompleta: + CO (tóxico) + fuligem. Gases típicos caldeira HFO: 13-14% CO₂, 2-4% O₂, < 200 ppm CO." },
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
      gasanalysis:{ name:"Análise dos gases de combustão", desc:"CO₂ ótimo: 13-14%. O₂ residual: 2-4% (λ ≈ 1,10-1,20). CO: < 200 ppm. Temperatura gases saída: 180-220°C." },
      viscosity:{ name:"Viscosidade do combustível", desc:"HFO a 10-20 cSt para boa atomização. Obtido a 120-150°C conforme o grau. Viscosímetro automático recomendado." },
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
        a:"λ = ar real / ar estequiométrico. λ = 1,0: combustão teoricamente perfeita. λ < 1,0: falta de ar → CO, fuligem. Para HFO λ = 1,10-1,20 porque: o HFO é viscoso e complexo → atomização imperfeita. A composição varia → o excesso garante combustão completa. O risco de inqueimados é pior do que a pequena perda por excesso de ar. O₂ residual (2-4%) e CO₂ (13-14%) confirmam λ correto." },
      { q:"Qual é a diferença entre um queimador de pressão mecânica e um de atomização a vapor?",
        a:"Pressão mecânica: combustível atomizado por injeção a alta pressão (15-30 bar). Vantagens: simples, robusto, sem consumo de vapor. Desvantagens: sensível à viscosidade. Vapor: vapor a 5-10 bar misturado com combustível. Vantagens: melhor atomização, menos sensível à viscosidade, boa flexibilidade. Desvantagens: consome vapor, necessita vapor disponível no arranque a frio." },
      { q:"Como diagnosticar e corrigir uma combustão incompleta (fumo preto) numa caldeira marinha?",
        a:"Diagnóstico: fumo preto = falta de ar ou excesso de combustível. Procedimento: 1. Medir gases: O₂ < 1% → falta de ar, CO > 500 ppm → inqueimados. 2. Verificar viscosidade HFO (10-20 cSt). 3. Inspecionar bico. 4. Verificar registo de ar e ventilador. Correções: aumentar o ar progressivamente, aumentar temperatura de pré-aquecimento, limpar/substituir bico. Registar qualquer emissão excessiva segundo MARPOL Anexo VI." },
    ],
    showAnswer:"Ver correção", hideAnswer:"Ocultar",
  },
};

// ── SVG 1 — COMBUSTION THEORY ─────────────────────────────────
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

// ── SVG 2 — BURNER TYPES ─────────────────────────────────────
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

// ── SVG 3 — COMBUSTION CONTROL ───────────────────────────────
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

// ── SVG 4 — FAULTS ───────────────────────────────────────────
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

function ContentTab({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
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
        <div key={i} style={{marginBottom:14,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.fire}33`,overflow:"hidden"}}>
          <div style={{padding:"12px 14px"}}>
            <div style={{fontSize:10,color:C.fire,letterSpacing:1,marginBottom:6,fontFamily:"'Cinzel',serif"}}>Q{i+1}</div>
            <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>{q.q}</div>
          </div>
          <div style={{padding:"0 14px 12px"}}>
            <button onClick={()=>toggle(i)} style={{padding:"7px 14px",borderRadius:8,fontSize:11,cursor:"pointer",background:shown[i]?`${C.fire}22`:"rgba(255,255,255,0.06)",border:`1px solid ${shown[i]?C.fire:"rgba(255,255,255,0.15)"}`,color:shown[i]?C.fire:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{shown[i]?t.hideAnswer:t.showAnswer}</button>
            {shown[i]&&<div style={{marginTop:10,padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.fire}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{q.a}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
// LessonE3_L2 — PART 2: Bank + Quiz + Main

function getBank(lang: string) {
  const b: any = {
    fr:[
      {q:"Qu'est-ce que la combustion stœchiométrique et pourquoi est-elle impossible à atteindre en pratique ?",a:"La combustion stœchiométrique est la réaction théorique parfaite avec exactement la quantité d'air nécessaire pour brûler tout le combustible — ni plus, ni moins. Pour 1 kg de HFO, il faut environ 13,5 kg d'air. En pratique, elle est impossible car : le mélange air-combustible n'est jamais parfaitement homogène (certaines zones localement riches en fuel), la turbulence et le temps de résidence dans le foyer sont limités, la composition du combustible varie légèrement. On travaille donc toujours avec un excès d'air (λ > 1) pour s'assurer de la combustion complète."},
      {q:"Qu'est-ce que le coefficient d'excès d'air (λ) et comment l'optimise-t-on pour une chaudière HFO ?",a:"λ = air réel fourni / air stœchiométrique théorique. Valeurs : λ = 1,0 : parfait théorique. λ < 1 : manque d'air → imbrûlés, CO, suie. λ = 1,10-1,20 : optimal pour HFO (10-20% excès). λ > 1,30 : excès → pertes enthalpiques dans les fumées. Optimisation : mesurer O₂ résiduel dans les fumées (visée : 2-4%). Si O₂ < 2% → augmenter l'air. Si O₂ > 5% → réduire l'air. Mesurer aussi CO₂ (visée 13-14%) et CO (< 200 ppm). Un λ optimal réduit la consommation de combustible de 2-5% et les émissions polluantes."},
      {q:"Pourquoi le HFO doit-il être préchauffé avant le brûleur et à quelle température ?",a:"Le HFO (Heavy Fuel Oil) est un résidu de distillation extrêmement visqueux à température ambiante (jusqu'à 700 cSt). Pour être correctement atomisé par le brûleur, il doit être ramené à 10-20 cSt. Cela nécessite de le chauffer à 120-150°C (selon le grade et la teneur en soufre). Sans préchauffage suffisant : mauvaise atomisation (gouttelettes trop grosses), combustion incomplète (fumée noire, suie), encrassement du brûleur et des tubes de chaudière, consommation accrue. Le préchauffage est contrôlé par un échangeur à vapeur et un viscosimètre ou thermomètre en ligne."},
      {q:"Comment interpréter la couleur des fumées d'une chaudière pour évaluer la qualité de la combustion ?",a:"Couleur des fumées et signification : Incolore/légèrement gris clair : combustion correcte, bonne proportion air/fuel. Noir/gris foncé : manque d'air ou excès de fuel → imbrûlés (suie, CO) → augmenter l'air, vérifier la viscosité. Blanc opaque ou grisâtre en début de fonctionnement : eau dans le fuel ou condensats, ou démarrage froid. Brun/jaune : teneur en soufre élevée du fuel (normal avec HFO HSFO). Orange/rougeâtre : présence de vanadium ou catalyseurs (normal avec certains HFO). Bleu : traces d'huile lubrifiante brûlée (problème rare sur chaudière). La couleur des fumées est évaluée par l'officier machine au moins une fois par garde."},
      {q:"Quels sont les produits de la combustion complète et incomplète du HFO ?",a:"Combustion complète (idéale) : HFO + O₂ → CO₂ + H₂O + N₂ + O₂ résiduel. Proportions typiques fumées HFO : 13-14% CO₂, 2-4% O₂, < 200 ppm CO. Combustion incomplète (manque d'air) : + CO (monoxyde de carbone, toxique, gaz à effet de serre), suie (carbone imbrûlé, polluant MARPOL), hydrocarbures imbrûlés (HAP), aldéhydes. Impact MARPOL : les imbrûlés et la suie sont réglementés par MARPOL Annexe VI. La teneur en soufre du HFO produit du SO₂ (acid rain precursor) → réglementation IMO 2020 (0,5% soufre max en haute mer, 0,1% en zone ECA)."},
      {q:"Comment fonctionne un brûleur à pression mécanique et quels sont ses points d'entretien ?",a:"Fonctionnement : Le combustible est pompé à haute pression (15-30 bar) dans un gicleur (nozzle) qui le pulvérise en fines gouttelettes coniques. La pression crée la force d'atomisation. L'air est soufflé par un ventilateur autour du cône de combustible. Points d'entretien : Gicleur : nettoyage régulier (hebdomadaire/mensuel selon usage). L'orifice du gicleur s'use et se déforme → remplacer si débit ou angle de spray incorrects. Filtre à combustible : nettoyage avant le brûleur pour éviter le colmatage du gicleur. Registre d'air : vérifier l'ouverture et l'absence d'encrassement. Détecteur de flamme (flame eye) : nettoyer la lentille (suie), tester périodiquement. Préchauffeur : maintenir la température correcte (viscosité 10-20 cSt). Pompe à combustible : vérifier la pression (15-30 bar)."},
      {q:"Qu'est-ce que l'analyse des gaz de combustion et comment est-elle utilisée pour optimiser une chaudière ?",a:"L'analyse des gaz de combustion mesure la composition des fumées en sortie de chaudière. Paramètres mesurés : CO₂ (%) : indicateur d'efficacité de combustion. CO₂ max pour HFO = 14%. CO₂ élevé = bonne combustion. O₂ (%) : indicateur d'excès d'air. Objectif 2-4%. O₂ faible = combustion incomplète. O₂ élevé = trop d'air → pertes. CO (ppm) : monoxyde de carbone = indicateur d'imbrûlés. > 200 ppm = problème. SO₂ (ppm) : soufre (réglementé MARPOL). Température des fumées (°C) : si > 220°C → encrassement de l'ECE ou foyer. Utilisation : ajuster le rapport air/fuel jusqu'à obtenir O₂ = 2-4% et CO < 200 ppm simultanément. Un analyseur automatique en continu est recommandé sur les grandes chaudières."},
      {q:"Quelles sont les précautions à prendre avant de redémarrer un brûleur après une extinction de flamme ?",a:"Après une extinction de flamme (flame failure), des gaz non brûlés peuvent avoir pénétré dans la chambre de combustion. Si on rallume directement → risque d'explosion. Procédure obligatoire avant redémarrage : 1. Le système de gestion du brûleur (BMS — Burner Management System) doit avoir déclenché la coupure automatique du combustible. 2. Identifier et corriger la cause de l'extinction (pression fuel, viscosité, détecteur flamme). 3. Purge obligatoire : ventiler la chambre de combustion pendant au minimum 3-4 volumes de chambre (durée selon le fabricant, typiquement 30-60 secondes) pour éliminer les gaz résiduels. 4. Seulement après la purge complète → procédure de démarrage normal. 5. Si la flamme s'éteint plusieurs fois consécutivement → investiguer avant de réessayer."},
      {q:"Quelle est l'importance du réglage du rapport air/fuel (A/F ratio) dans la combustion ?",a:"Le rapport air/fuel (A/F) est le rapport massique entre l'air et le combustible fournis au brûleur. Rapport stœchiométrique HFO : ≈ 13,5 (13,5 kg d'air pour 1 kg de HFO). A/F trop faible (manque d'air) : combustion incomplète → suie, CO, imbrûlés → fumée noire → consommation de fuel accrue pour même puissance → pollution. A/F trop élevé (excès d'air) : combustion complète mais gaz de fumée chauds emportent trop de chaleur → rendement réduit → condensation acide si T fumées < point de rosée acide (140°C pour HFO riche en soufre). Optimal : A/F légèrement au-dessus de la stœchiométrie (λ = 1,10-1,20). Réglage : ajuster l'ouverture du registre d'air selon la charge du brûleur. Sur les chaudières modernes : régulation automatique par analyseur de O₂."},
      {q:"Qu'est-ce que la corrosion à basse température dans une chaudière et comment la prévenir ?",a:"La corrosion à basse température (dew point corrosion ou acid corrosion) se produit quand la température des surfaces d'échange descend sous le point de rosée des gaz de combustion. Le SO₂ produit par la combustion du soufre du HFO se transforme en SO₃ qui, en se combinant avec la vapeur d'eau, forme de l'acide sulfurique (H₂SO₄). Point de rosée acide du HFO : 130-150°C (selon teneur en soufre). Si surface < point de rosée → condensation d'acide → corrosion agressive des tubes. Prévention : maintenir la température des gaz de fumée au-dessus du point de rosée (> 150°C), ne jamais démarrer avec eau d'alimentation froide, maintenir la charge de chaudière minimale, utiliser des combustibles à faible teneur en soufre (fuel 0,5% IMO 2020 → point de rosée plus bas)."},
      {q:"Comment fonctionne le système de gestion du brûleur (BMS — Burner Management System) ?",a:"Le BMS est le système de contrôle et de sécurité automatique du brûleur. Fonctions : Démarrage automatique séquencé : vérification des conditions (pression fuel, température, pression air), purge de la chambre, allumage progressif (pilote + brûleur principal). Contrôle en régime : régulation de la pression vapeur en modulant le débit de fuel et d'air. Protection automatique : coupure immédiate du fuel si : extinction de flamme (détecteur), basse pression fuel, bas niveau eau chaudière, haute pression vapeur, alarme extincteur automatique. Signalisation : voyants d'état, alarmes sonores/visuelles. Verrouillage (lockout) : après une extinction, le BMS se verrouille → impossible de rallumer sans réarmement manuel → oblige l'opérateur à investiguer la cause."},
      {q:"Quels sont les réglements MARPOL Annexe VI relatifs aux émissions des chaudières marines ?",a:"MARPOL Annexe VI réglemente les émissions atmosphériques des navires, incluant les chaudières. Principales règles : Teneur en soufre du combustible : Haute mer (depuis 2020) : max 0,5% S (VLSFO ou scrubber). Zone ECA (Europe, Amérique du Nord, mer de Chine...) : max 0,1% S → utiliser MDO/MGO ou LNG. Émissions de NOx (oxydes d'azote) : norme Tier I/II/III selon l'année de construction et la zone (Tier III en ECA NOx). Particules et suie : interdiction d'émissions visibles excessives (Règle 14). Registre des hydrocarbures (ORB) : traçabilité des combustibles utilisés. Incinération à bord : réglementée (pas en zone portuaire). Conséquences d'infraction : amendes, rétention du navire en port d'État."},
    ],
    en:[
      {q:"What is stoichiometric combustion and why is it impossible to achieve in practice?",a:"Stoichiometric combustion is the theoretically perfect reaction with exactly the required air quantity to burn all fuel — no more, no less. For 1 kg HFO: approximately 13.5 kg air. In practice impossible because: air-fuel mixture is never perfectly homogeneous (locally fuel-rich zones), turbulence and residence time in furnace are limited, fuel composition varies slightly. Always operate with excess air (λ > 1) to ensure complete combustion."},
      {q:"What is the excess air coefficient (λ) and how is it optimised for an HFO boiler?",a:"λ = actual air supplied / theoretical stoichiometric air. Values: λ = 1.0: theoretical ideal. λ < 1: insufficient air → unburnt, CO, soot. λ = 1.10-1.20: optimal for HFO (10-20% excess). λ > 1.30: excess → enthalpy losses in flue gases. Optimisation: measure residual O₂ in flue gases (target: 2-4%). O₂ < 2% → increase air. O₂ > 5% → reduce air. Also measure CO₂ (target 13-14%) and CO (< 200 ppm). Optimal λ reduces fuel consumption 2-5% and pollutant emissions."},
      {q:"Why must HFO be preheated before the burner and to what temperature?",a:"HFO (Heavy Fuel Oil) is an extremely viscous distillation residue at ambient temperature (up to 700 cSt). For correct burner atomisation, it must be reduced to 10-20 cSt, requiring heating to 120-150°C (depending on grade and sulphur content). Without sufficient preheating: poor atomisation (droplets too large), incomplete combustion (black smoke, soot), burner and boiler tube fouling, increased consumption. Preheating controlled by steam exchanger and inline viscometer or thermometer."},
      {q:"How to interpret boiler smoke colour to assess combustion quality?",a:"Smoke colour and meaning: Colourless/slightly light grey: correct combustion, good air/fuel ratio. Black/dark grey: insufficient air or fuel excess → unburnt (soot, CO) → increase air, check viscosity. White opaque or greyish at startup: water in fuel or condensate, or cold start. Brown/yellow: high fuel sulphur content (normal with HSFO). Orange/reddish: vanadium or catalyst presence (normal with some HFO). Blue: traces of burnt lube oil (rare boiler problem). Smoke colour assessed by engine officer at least once per watch."},
      {q:"What are the products of complete and incomplete HFO combustion?",a:"Complete combustion (ideal): HFO + O₂ → CO₂ + H₂O + N₂ + residual O₂. Typical HFO flue gas proportions: 13-14% CO₂, 2-4% O₂, < 200 ppm CO. Incomplete combustion (insufficient air): + CO (carbon monoxide, toxic, greenhouse gas), soot (unburnt carbon, MARPOL pollutant), unburnt hydrocarbons (PAH), aldehydes. MARPOL impact: unburnt products and soot regulated by MARPOL Annex VI. HFO sulphur content produces SO₂ (acid rain precursor) → IMO 2020 regulation (0.5% max sulphur at sea, 0.1% in ECA zones)."},
      {q:"How does a mechanical pressure burner work and what are its maintenance points?",a:"Operation: Fuel pumped at high pressure (15-30 bar) through a nozzle that atomises it into fine conical droplets. Pressure creates atomisation force. Air blown by fan around fuel cone. Maintenance points: Nozzle: regular cleaning (weekly/monthly per use). Nozzle orifice wears and deforms → replace if flow or spray angle incorrect. Fuel filter: clean before burner to prevent nozzle blockage. Air register: check opening and cleanliness. Flame detector (flame eye): clean lens (soot), periodic testing. Preheater: maintain correct temperature (viscosity 10-20 cSt). Fuel pump: check pressure (15-30 bar)."},
      {q:"What is flue gas analysis and how is it used to optimise a boiler?",a:"Flue gas analysis measures flue gas composition at boiler outlet. Parameters measured: CO₂ (%): combustion efficiency indicator. Max CO₂ for HFO = 14%. High CO₂ = good combustion. O₂ (%): excess air indicator. Target 2-4%. Low O₂ = incomplete combustion. High O₂ = too much air → losses. CO (ppm): carbon monoxide = unburnt indicator. > 200 ppm = problem. SO₂ (ppm): sulphur (MARPOL regulated). Flue gas temperature (°C): if > 220°C → EGE or furnace fouling. Use: adjust air/fuel ratio until O₂ = 2-4% and CO < 200 ppm simultaneously. Automatic continuous analyser recommended on large boilers."},
      {q:"What precautions before restarting a burner after flame failure?",a:"After flame failure, unburnt gases may have entered the combustion chamber. Direct relight → explosion risk. Mandatory procedure before restart: 1. BMS (Burner Management System) must have triggered automatic fuel cutoff. 2. Identify and correct extinction cause (fuel pressure, viscosity, flame detector). 3. Mandatory purge: ventilate combustion chamber for minimum 3-4 chamber volumes (duration per manufacturer, typically 30-60 seconds) to eliminate residual gases. 4. Only after complete purge → normal start procedure. 5. If flame extinguishes several consecutive times → investigate before retrying."},
      {q:"What is the importance of air/fuel ratio (A/F) adjustment in combustion?",a:"A/F ratio is the mass ratio between air and fuel supplied to the burner. Stoichiometric A/F for HFO: ≈13.5 (13.5 kg air per kg HFO). A/F too low (insufficient air): incomplete combustion → soot, CO, unburnt → black smoke → increased fuel consumption for same power → pollution. A/F too high (excess air): complete combustion but hot flue gases carry too much heat → reduced efficiency → acid condensation if flue gas T < acid dew point (140°C for high-sulphur HFO). Optimal: A/F slightly above stoichiometry (λ = 1.10-1.20). Adjustment: set air register opening per burner load. Modern boilers: automatic regulation by O₂ analyser."},
      {q:"What is cold-end corrosion in a boiler and how to prevent it?",a:"Cold-end (dew point) corrosion occurs when heat exchange surface temperature drops below flue gas dew point. SO₂ from HFO sulphur combustion becomes SO₃ which, combining with water vapour, forms sulphuric acid (H₂SO₄). HFO acid dew point: 130-150°C (per sulphur content). If surface < dew point → acid condensation → aggressive tube corrosion. Prevention: maintain flue gas temperature above dew point (> 150°C), never start with cold feed water, maintain minimum boiler load, use low-sulphur fuels (0.5% IMO 2020 fuel → lower dew point)."},
      {q:"How does the Burner Management System (BMS) work?",a:"The BMS is the automatic burner control and safety system. Functions: Automatic sequenced startup: condition verification (fuel pressure, temperature, air pressure), chamber purge, progressive ignition (pilot + main burner). Operating control: steam pressure regulation by modulating fuel and air flow. Automatic protection: immediate fuel cutoff if: flame failure (detector), low fuel pressure, low boiler water level, high steam pressure, automatic extinguisher alarm. Signalling: status indicators, audible/visual alarms. Lockout: after extinction, BMS locks out → cannot relight without manual reset → forces operator to investigate cause."},
      {q:"What are MARPOL Annex VI regulations regarding marine boiler emissions?",a:"MARPOL Annex VI regulates ship atmospheric emissions including boilers. Main rules: Fuel sulphur content: High seas (since 2020): max 0.5% S (VLSFO or scrubber). ECA zones (Europe, North America, China Sea...): max 0.1% S → use MDO/MGO or LNG. NOx emissions: Tier I/II/III standard per construction year and zone (Tier III in NOx ECA). Particulates and soot: prohibition of excessive visible emissions (Rule 14). Oil Record Book (ORB): fuel traceability. On-board incineration: regulated (not in port areas). Violation consequences: fines, vessel detention by port State."},
    ],
    es:[
      {q:"¿Qué es la combustión estequiométrica y por qué es imposible en la práctica?",a:"Reacción teórica perfecta con exactamente la cantidad de aire necesaria. Para 1 kg de HFO: ≈13,5 kg de aire. Imposible en la práctica porque: la mezcla aire-combustible nunca es perfectamente homogénea, la turbulencia y el tiempo de residencia son limitados, la composición del combustible varía. Siempre se trabaja con exceso de aire (λ > 1)."},
      {q:"¿Qué es el coeficiente de exceso de aire (λ) y cómo se optimiza?",a:"λ = aire real / aire estequiométrico. λ = 1,0: ideal teórico. λ < 1: falta de aire → imbrûlés, CO, hollín. λ = 1,10-1,20: óptimo para HFO. λ > 1,30: excesivo → pérdidas. Optimización: medir O₂ residual (objetivo 2-4%), CO₂ (13-14%), CO (< 200 ppm)."},
      {q:"¿Por qué el HFO debe precalentarse y a qué temperatura?",a:"El HFO es extremadamente viscoso (hasta 700 cSt). Para atomizarse correctamente debe estar a 10-20 cSt → necesita calentarse a 120-150°C. Sin precalentamiento: mala atomización, combustión incompleta, humo negro, incrustaciones."},
      {q:"¿Cómo interpretar el color del humo para evaluar la calidad de la combustión?",a:"Incoloro/gris claro: combustión correcta. Negro/gris oscuro: falta de aire → aumentar el aire. Blanco opaco: agua en el combustible. Marrón/amarillo: azufre alto (normal con HSFO). Naranja/rojizo: vanadio o catalizadores (normal con algunos HFO)."},
      {q:"¿Cuáles son los productos de la combustión completa e incompleta del HFO?",a:"Completa: CO₂ + H₂O + N₂ + O₂ residual. Incompleta: + CO (tóxico), hollín, hidrocarburos. Gases típicos: 13-14% CO₂, 2-4% O₂, < 200 ppm CO. MARPOL regula las emisiones. IMO 2020: max 0,5% S en alta mar, 0,1% en ECA."},
      {q:"¿Cómo funciona un quemador de presión mecánica y cuáles son sus puntos de mantenimiento?",a:"Combustible bombeado a 15-30 bar por una tobera. Mantenimiento: limpiar tobera regularmente, filtro de combustible, registro de aire, detector de llama (limpiar lente), precalentador (10-20 cSt), bomba de combustible (15-30 bar)."},
      {q:"¿Qué es el análisis de gases de combustión y cómo se usa para optimizar la caldera?",a:"Mide la composición de los gases: CO₂ (objetivo 13-14%), O₂ (2-4%), CO (< 200 ppm), temperatura de salida (180-220°C). Ajustar la relación aire/fuel hasta obtener simultáneamente O₂ = 2-4% y CO < 200 ppm."},
      {q:"¿Qué precauciones antes de rearrancar un quemador tras una extinción?",a:"Obligatorio: 1. BMS debe haber cortado el combustible automáticamente. 2. Identificar y corregir la causa. 3. Purga obligatoria de la cámara (mín. 3-4 volúmenes, 30-60 s). 4. Solo después → arranque normal. Si se apaga varias veces → investigar antes de reintentar."},
      {q:"¿Cuál es la importancia del ajuste de la relación aire/combustible (A/F)?",a:"A/F muy bajo: combustión incompleta → hollín, CO, humo negro. A/F muy alto: pérdidas en los gases de humos, condensación ácida. Óptimo: λ = 1,10-1,20. Ajustar el registro de aire. Calderas modernas: regulación automática por analizador de O₂."},
      {q:"¿Qué es la corrosión por punto de rocío en una caldera?",a:"Ocurre cuando las superficies bajan del punto de rocío ácido (130-150°C para HFO). El SO₂ forma H₂SO₄ → corrosión agresiva. Prevención: mantener temperatura de gases > 150°C, nunca arrancar con agua fría, carga mínima, combustibles de bajo azufre."},
      {q:"¿Cómo funciona el sistema de gestión del quemador (BMS)?",a:"Controla y protege automáticamente el quemador: arranque secuenciado, regulación de presión de vapor, cortes de seguridad (extinción, baja presión, bajo nivel, alta presión). Bloqueo tras extinción → imposible encender sin rearme manual."},
      {q:"¿Qué establece MARPOL Anexo VI sobre las emisiones de calderas marinas?",a:"Límite de azufre: 0,5% en alta mar (desde 2020), 0,1% en ECA. Emisiones NOx: Tier I/II/III. Prohibición de emisiones visibles excesivas. Registro de hidrocarburos (ORB). Incineración regulada. Infracción: multas, detención del buque."},
    ],
    pt:[
      {q:"O que é a combustão estequiométrica e por que é impossível na prática?",a:"Reação teórica perfeita com exatamente a quantidade de ar necessária. Para 1 kg de HFO: ≈13,5 kg de ar. Impossível na prática porque: a mistura ar-combustível nunca é perfeitamente homogénea, a turbulência e o tempo de residência são limitados, a composição varia. Trabalha-se sempre com excesso de ar (λ > 1)."},
      {q:"O que é o coeficiente de excesso de ar (λ) e como se otimiza?",a:"λ = ar real / ar estequiométrico. λ = 1,0: ideal teórico. λ < 1: falta de ar → inqueimados, CO, fuligem. λ = 1,10-1,20: ótimo para HFO. λ > 1,30: excessivo → perdas. Otimização: medir O₂ residual (objetivo 2-4%), CO₂ (13-14%), CO (< 200 ppm)."},
      {q:"Por que o HFO deve ser pré-aquecido e a que temperatura?",a:"O HFO é extremamente viscoso (até 700 cSt). Para ser atomizado corretamente deve estar a 10-20 cSt → necessita de aquecimento a 120-150°C. Sem pré-aquecimento: má atomização, combustão incompleta, fumo preto, incrustações."},
      {q:"Como interpretar a cor do fumo para avaliar a qualidade da combustão?",a:"Incolor/cinzento claro: combustão correta. Preto/cinzento escuro: falta de ar → aumentar o ar. Branco opaco: água no combustível. Castanho/amarelo: enxofre alto (normal com HSFO). Laranja/avermelhado: vanádio ou catalisadores (normal com alguns HFO)."},
      {q:"Quais são os produtos da combustão completa e incompleta do HFO?",a:"Completa: CO₂ + H₂O + N₂ + O₂ residual. Incompleta: + CO (tóxico), fuligem, hidrocarbonetos. Gases típicos: 13-14% CO₂, 2-4% O₂, < 200 ppm CO. MARPOL regula as emissões. IMO 2020: max 0,5% S em alto mar, 0,1% em ECA."},
      {q:"Como funciona um queimador de pressão mecânica e quais são os seus pontos de manutenção?",a:"Combustível bombeado a 15-30 bar por um bico. Manutenção: limpar bico regularmente, filtro de combustível, registo de ar, detetor de chama (limpar lente), pré-aquecedor (10-20 cSt), bomba de combustível (15-30 bar)."},
      {q:"O que é a análise dos gases de combustão e como se usa para otimizar a caldeira?",a:"Mede a composição dos gases: CO₂ (objetivo 13-14%), O₂ (2-4%), CO (< 200 ppm), temperatura de saída (180-220°C). Ajustar relação ar/combustível até obter simultaneamente O₂ = 2-4% e CO < 200 ppm."},
      {q:"Que precauções antes de rearrancar um queimador após extinção?",a:"Obrigatório: 1. BMS deve ter cortado o combustível automaticamente. 2. Identificar e corrigir a causa. 3. Purga obrigatória da câmara (mín. 3-4 volumes, 30-60 s). 4. Só depois → arranque normal. Se se apaga várias vezes → investigar antes de tentar novamente."},
      {q:"Qual é a importância do ajuste da relação ar/combustível (A/F)?",a:"A/F muito baixo: combustão incompleta → fuligem, CO, fumo preto. A/F muito alto: perdas nos gases, condensação ácida. Ótimo: λ = 1,10-1,20. Ajustar o registo de ar. Caldeiras modernas: regulação automática por analisador de O₂."},
      {q:"O que é a corrosão por ponto de orvalho numa caldeira?",a:"Ocorre quando as superfícies descem abaixo do ponto de orvalho ácido (130-150°C para HFO). O SO₂ forma H₂SO₄ → corrosão agressiva. Prevenção: manter temperatura dos gases > 150°C, nunca arrancar com água fria, carga mínima, combustíveis de baixo enxofre."},
      {q:"Como funciona o sistema de gestão do queimador (BMS)?",a:"Controla e protege automaticamente o queimador: arranque sequenciado, regulação de pressão de vapor, cortes de segurança (extinção, baixa pressão, baixo nível, alta pressão). Bloqueio após extinção → impossível acender sem rearme manual."},
      {q:"O que estabelece o MARPOL Anexo VI sobre as emissões de caldeiras marinhas?",a:"Limite de enxofre: 0,5% em alto mar (desde 2020), 0,1% em ECA. Emissões NOx: Tier I/II/III. Proibição de emissões visíveis excessivas. Registo de hidrocarbonetos (ORB). Incineração regulamentada. Infração: multas, detenção do navio."},
    ],
  };
  return b[lang]||b.fr;
}

function getQuiz(lang: string) {
  const q: any = {
    fr:[
      {q:"Quel est l'excès d'air optimal (λ) pour une chaudière marine fonctionnant au HFO ?",opts:["λ = 0,90 (10% de manque d'air)","λ = 1,00 (stœchiométrique exact)","λ = 1,10-1,20 (10-20% d'excès)","λ = 1,50-2,00 (50-100% d'excès)"],correct:2,exp:"λ = 1,10-1,20 (10-20% d'excès d'air) est optimal pour le HFO. Cet excès garantit une combustion complète malgré l'hétérogénéité du mélange. Un manque d'air (λ < 1) provoque des imbrûlés et de la suie. Un excès trop important (λ > 1,30) fait perdre de l'énergie dans les gaz de fumée."},
      {q:"Quelle couleur de fumée indique un manque d'air dans la combustion ?",opts:["Blanche","Incolore","Noire","Brun-jaune"],correct:2,exp:"La fumée noire indique un manque d'air ou un excès de combustible : le HFO ne brûle pas complètement et produit de la suie (carbone imbrûlé). Solution : augmenter l'air (ouvrir le registre d'air). La fumée blanche indique généralement de l'eau dans le combustible. L'incolore signifie une combustion correcte."},
      {q:"À quelle température doit-on préchauffer le HFO pour obtenir une viscosité de 10-20 cSt avant le brûleur ?",opts:["40-60°C","80-100°C","120-150°C","200-250°C"],correct:2,exp:"Le HFO doit être chauffé à 120-150°C pour ramener sa viscosité à 10-20 cSt, nécessaire pour une bonne atomisation dans le brûleur. En dessous de cette température, la viscosité est trop élevée → mauvaise atomisation → combustion incomplète → fumée noire."},
      {q:"Quelle est la valeur cible de CO₂ dans les gaz de combustion d'une chaudière HFO bien réglée ?",opts:["3-5%","8-10%","13-14%","18-20%"],correct:2,exp:"Un CO₂ de 13-14% est le signe d'une combustion HFO correcte et efficace. Une valeur plus basse indique trop d'air dilué ou une combustion incomplète. Une valeur plus haute (> 14%) est impossible avec l'air (21% O₂) et signifierait un problème de mesure. Corrélativement, O₂ résiduel doit être de 2-4%."},
      {q:"Qu'est-ce qui se passe si on tente de rallumer un brûleur immédiatement après une extinction de flamme sans purge ?",opts:["Le brûleur démarre normalement","La flamme est instable","Risque d'explosion des gaz non brûlés accumulés","Le combustible ne s'enflamme pas"],correct:2,exp:"Après une extinction de flamme, des gaz de combustion non brûlés peuvent s'être accumulés dans la chambre. Si on rallume directement, ces gaz s'enflamment violemment = explosion. C'est pourquoi une purge obligatoire (ventilation de la chambre pendant 30-60 secondes) est requise avant tout redémarrage. Le BMS impose ce verrouillage automatiquement."},
    ],
    en:[
      {q:"What is the optimal excess air (λ) for a marine HFO boiler?",opts:["λ = 0.90 (10% air deficiency)","λ = 1.00 (exact stoichiometric)","λ = 1.10-1.20 (10-20% excess)","λ = 1.50-2.00 (50-100% excess)"],correct:2,exp:"λ = 1.10-1.20 (10-20% excess air) is optimal for HFO. This excess ensures complete combustion despite mixture heterogeneity. Air deficiency (λ < 1) causes unburnt products and soot. Too much excess (λ > 1.30) wastes energy in flue gases."},
      {q:"What smoke colour indicates insufficient air in combustion?",opts:["White","Colourless","Black","Brown-yellow"],correct:2,exp:"Black smoke indicates insufficient air or fuel excess: HFO doesn't burn completely and produces soot (unburnt carbon). Solution: increase air (open air register). White smoke generally indicates water in fuel. Colourless means correct combustion."},
      {q:"At what temperature must HFO be preheated to achieve 10-20 cSt viscosity before the burner?",opts:["40-60°C","80-100°C","120-150°C","200-250°C"],correct:2,exp:"HFO must be heated to 120-150°C to reduce viscosity to 10-20 cSt, necessary for good burner atomisation. Below this temperature, viscosity too high → poor atomisation → incomplete combustion → black smoke."},
      {q:"What is the target CO₂ value in flue gases of a well-adjusted HFO boiler?",opts:["3-5%","8-10%","13-14%","18-20%"],correct:2,exp:"CO₂ of 13-14% indicates correct and efficient HFO combustion. Lower value indicates too much dilution air or incomplete combustion. Higher value (> 14%) is impossible with air (21% O₂) and would indicate a measurement error. Correspondingly, residual O₂ should be 2-4%."},
      {q:"What happens if you try to relight a burner immediately after flame failure without purging?",opts:["Burner starts normally","Flame is unstable","Risk of explosion from accumulated unburnt gases","Fuel doesn't ignite"],correct:2,exp:"After flame failure, accumulated unburnt combustion gases may be present in the chamber. Direct relight causes violent ignition of these gases = explosion. Mandatory purge (chamber ventilation for 30-60 seconds) required before any restart. BMS imposes this lockout automatically."},
    ],
    es:[
      {q:"¿Cuál es el exceso de aire óptimo (λ) para una caldera marina de HFO?",opts:["λ = 0,90 (10% de defecto)","λ = 1,00 (estequiométrico exacto)","λ = 1,10-1,20 (10-20% de exceso)","λ = 1,50-2,00 (50-100% de exceso)"],correct:2,exp:"λ = 1,10-1,20 es óptimo para el HFO. Garantiza combustión completa pese a la heterogeneidad de la mezcla. Defecto (λ < 1) → imbrûlés y hollín. Exceso (λ > 1,30) → pérdidas en los humos."},
      {q:"¿Qué color de humo indica falta de aire en la combustión?",opts:["Blanco","Incoloro","Negro","Marrón-amarillo"],correct:2,exp:"El humo negro indica falta de aire o exceso de combustible: el HFO no arde completamente y produce hollín. Solución: aumentar el aire. El humo blanco indica agua en el combustible. El incoloro = combustión correcta."},
      {q:"¿A qué temperatura hay que precalentar el HFO para obtener 10-20 cSt?",opts:["40-60°C","80-100°C","120-150°C","200-250°C"],correct:2,exp:"El HFO debe calentarse a 120-150°C para reducir su viscosidad a 10-20 cSt. Por debajo: mala atomización, combustión incompleta, humo negro."},
      {q:"¿Cuál es el valor objetivo de CO₂ en los gases de una caldera HFO bien ajustada?",opts:["3-5%","8-10%","13-14%","18-20%"],correct:2,exp:"CO₂ del 13-14% indica combustión correcta y eficiente. Valor menor = demasiado aire o combustión incompleta. El O₂ residual debe ser del 2-4%."},
      {q:"¿Qué ocurre si se intenta encender un quemador inmediatamente tras una extinción sin purga?",opts:["El quemador arranca normalmente","La llama es inestable","Riesgo de explosión de gases no quemados acumulados","El combustible no se enciende"],correct:2,exp:"Tras una extinción, pueden haberse acumulado gases sin quemar. El encendido directo provoca su inflamación violenta = explosión. Se requiere purga obligatoria (ventilación 30-60 s). El BMS impone este bloqueo automáticamente."},
    ],
    pt:[
      {q:"Qual é o excesso de ar ótimo (λ) para uma caldeira marinha a HFO?",opts:["λ = 0,90 (10% de défice)","λ = 1,00 (estequiométrico exato)","λ = 1,10-1,20 (10-20% de excesso)","λ = 1,50-2,00 (50-100% de excesso)"],correct:2,exp:"λ = 1,10-1,20 é ótimo para o HFO. Garante combustão completa apesar da heterogeneidade da mistura. Défice (λ < 1) → inqueimados e fuligem. Excesso (λ > 1,30) → perdas nos gases."},
      {q:"Que cor de fumo indica falta de ar na combustão?",opts:["Branco","Incolor","Preto","Castanho-amarelo"],correct:2,exp:"O fumo preto indica falta de ar ou excesso de combustível: o HFO não arde completamente e produz fuligem. Solução: aumentar o ar. O fumo branco indica água no combustível. O incolor = combustão correta."},
      {q:"A que temperatura deve ser pré-aquecido o HFO para obter 10-20 cSt?",opts:["40-60°C","80-100°C","120-150°C","200-250°C"],correct:2,exp:"O HFO deve ser aquecido a 120-150°C para reduzir a viscosidade a 10-20 cSt. Abaixo: má atomização, combustão incompleta, fumo preto."},
      {q:"Qual é o valor objetivo de CO₂ nos gases de uma caldeira HFO bem ajustada?",opts:["3-5%","8-10%","13-14%","18-20%"],correct:2,exp:"CO₂ de 13-14% indica combustão correta e eficiente. Valor menor = demasiado ar ou combustão incompleta. O O₂ residual deve ser de 2-4%."},
      {q:"O que acontece se se tentar acender um queimador imediatamente após extinção sem purga?",opts:["O queimador arranca normalmente","A chama é instável","Risco de explosão dos gases inqueimados acumulados","O combustível não se inflama"],correct:2,exp:"Após uma extinção, podem ter-se acumulado gases inqueimados. O acendimento direto provoca a sua inflamação violenta = explosão. Purga obrigatória (ventilação 30-60 s). O BMS impõe este bloqueio automaticamente."},
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
  const [tab,setTab]=useState(0);
  const progress=[25,50,75,90][tab]||25;
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(249,115,22,0.2)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"6px 12px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>◀</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:2,color:"#f97316",marginBottom:2}}>{t.moduleLabel} · L2</div>
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
          <span style={{fontSize:12}}>🔥</span>
          <span style={{fontFamily:"'Cinzel',serif",fontSize:9,color:"#f97316",letterSpacing:1}}>MACHINE · CHAUDIÈRES · PREMIUM</span>
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
