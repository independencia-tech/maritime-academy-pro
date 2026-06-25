// LessonE3_L1 — Types de chaudières marines | PART 1
import { useState } from "react";

const C = {
  steam:"#4da6ff", fire:"#f97316", water:"#6dbf8a",
  pressure:"#c084fc", temp:"#e8b94f", safe:"#6dbf8a",
  gold:"#c9922a", gold2:"#e8b94f",
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  danger:"#e74c3c",
};

const T: any = {
  fr:{
    moduleLabel:"MACHINE — CHAUDIÈRES",
    lessonTitle:"Types de chaudières marines",
    intro:"La chaudière marine est un générateur de vapeur essentiel à bord. Elle fournit la vapeur nécessaire au chauffage du HFO, à la production d'eau chaude, aux éjecteurs, aux systèmes de chauffage et sur les navires à propulsion vapeur, à la propulsion elle-même.",
    tabs:["📖 Contenu","✏️ Pratique","📚 Banque Q.","🎯 Quiz"],
    s1title:"🔥 Types de chaudières marines",
    s1hint:"👆 Tapez un type pour voir ses caractéristiques",
    s2title:"⚙️ Composants principaux",
    s2hint:"👆 Tapez un composant pour sa description",
    s3title:"📊 Paramètres de fonctionnement",
    s3hint:"👆 Tapez un paramètre",
    s4title:"⚠️ Sécurités obligatoires",
    s4hint:"👆 Tapez une sécurité",
    keypoints:"Points clés",
    kp:[
      "La chaudière acuatubulaire (water tube) est standard sur les navires modernes",
      "La chaudière ignitubulaire (fire tube) est utilisée pour les auxiliaires de faible puissance",
      "La pression de service typique est 7-10 bar pour chaudières auxiliaires",
      "Trois sécurités obligatoires : soupape de sûreté, manomètre, niveau d'eau",
      "La chaudière économiseur récupère la chaleur des gaz d'échappement",
    ],
    boilerTypes:{
      watertube:{ name:"Chaudière acuatubulaire (Water tube)", desc:"L'eau circule DANS les tubes, les gaz chauds passent AUTOUR. Avantages : haute pression possible (jusqu'à 100 bar), montée en pression rapide, grande puissance. Standard sur navires modernes et pétroliers. Inconvénients : eau d'alimentation très pure requise, maintenance complexe.", pressure:"7-100 bar" },
      firetube:{ name:"Chaudière ignitubulaire (Fire tube)", desc:"Les gaz chauds circulent DANS les tubes, l'eau est AUTOUR. Avantages : simple, robuste, moins sensible à la qualité de l'eau. Utilisée pour les chaudières auxiliaires de petit navire et les chaudières de réchauffage. Inconvénients : pression limitée (< 18 bar), montée lente.", pressure:"5-18 bar" },
      composite:{ name:"Chaudière composite", desc:"Combine un économiseur de gaz d'échappement (ECE) et un brûleur auxiliaire. L'économiseur récupère la chaleur des gaz d'échappement moteur en navigation. Le brûleur prend le relais à l'arrêt ou si la demande dépasse la production ECE. Solution économique très répandue.", pressure:"7-10 bar" },
      exhaust:{ name:"Chaudière de récupération (ECE)", desc:"Fonctionne uniquement avec la chaleur des gaz d'échappement du moteur principal (350-400°C). Pas de brûleur. Production gratuite de vapeur en navigation. Production nulle à l'arrêt du moteur. Installée dans la cheminée en série avec les gaz.", pressure:"6-8 bar" },
    },
    components:{
      drum:{ name:"Ballon vapeur (Steam drum)", desc:"Réservoir supérieur où s'accumule la vapeur produite. Contient le séparateur vapeur/eau. Équipé d'un manomètre, d'un niveau d'eau et d'une soupape de sûreté. Point le plus critique de la chaudière." },
      burner:{ name:"Brûleur (Burner)", desc:"Pulvérise le combustible (HFO ou MDO) en fines gouttelettes dans la chambre de combustion. Types : à pression mécanique, à vapeur, rotatif. Doit être réglé pour une combustion complète et propre (pas de fumée noire)." },
      feedwater:{ name:"Pompe d'eau d'alimentation", desc:"Pompe l'eau traitée vers la chaudière. Doit surmonter la pression de la chaudière. Redondance obligatoire : au moins 2 pompes (électrique + à vapeur). Débit contrôlé par régulateur de niveau." },
      safetyvalve:{ name:"Soupape de sûreté", desc:"S'ouvre automatiquement si la pression dépasse la valeur réglée. OBLIGATOIRE par toutes les classifications. Réglée à 10% au-dessus de la pression de service. Au moins 2 soupapes par chaudière." },
      watergage:{ name:"Indicateur de niveau d'eau", desc:"Affiche le niveau d'eau dans le ballon. CRITIQUE : niveau trop bas = surchauffe et explosion. Niveau trop haut = eau entraînée dans la vapeur (coup d'eau). Deux indicateurs minimum requis." },
      manometer:{ name:"Manomètre", desc:"Mesure la pression de vapeur dans le ballon. Vérification toutes les gardes. Étalonné périodiquement. Alarmes de haute et basse pression connectées au système d'alarme central." },
    },
    parameters:{
      pressure:{ name:"Pression de service", desc:"Chaudière auxiliaire standard : 7-10 bar. Chaudière propulsion vapeur : 40-100 bar. Économiseur ECE : 6-8 bar. La pression détermine la température de saturation de la vapeur (ex : 7 bar → 165°C, 10 bar → 180°C)." },
      waterLevel:{ name:"Niveau d'eau", desc:"Le niveau normal est au centre de l'indicateur de niveau. Alarme basse : environ 75mm sous le niveau normal. Alarme très basse : 150mm → arrêt automatique du brûleur. Niveau haut : eau dans la vapeur → éviter." },
      combustion:{ name:"Paramètres de combustion", desc:"Excès d'air : 10-20% pour combustion complète. Température gaz : mesurée en sortie de chaudière. Couleur fumée : incolore/légèrement grise = correcte, noire = manque d'air, blanche = eau dans combustible." },
      feedwater:{ name:"Qualité eau d'alimentation", desc:"pH : 10,5-11,5. Dureté : 0 (eau adoucie). Oxygène dissous : < 0,02 mg/l. Chlorures : < 1 mg/l. Conductivité : < 1000 μS/cm. Non respect → corrosion et entartrage des tubes." },
    },
    safeties:{
      sv:{ name:"Soupape de sûreté", desc:"Obligatoire (SOLAS). Au moins 2 par chaudière. Réglée à 10% au-dessus de la PMS. Test périodique (mensuel/annuel). Si elle s'ouvre en service normal → pression trop haute → investiguer.", action:"Ouvre si P > P_réglée" },
      lowwater:{ name:"Alarme et arrêt bas niveau", desc:"Alarme à 75mm sous le niveau normal → augmenter l'alimentation. Arrêt brûleur à 150mm → ne jamais remettre en service sans trouver la cause. Jamais réarmer sans vérification visuelle du niveau.", action:"Arrêt brûleur auto" },
      flamefail:{ name:"Détecteur de flamme (Flame eye)", desc:"Détecte si la flamme du brûleur est présente. Si la flamme s'éteint → arrêt immédiat du combustible (dans les secondes) pour éviter une explosion de gaz non brûlés. Le brûleur se verrouille → purge obligatoire avant redémarrage.", action:"Arrêt combustible auto" },
      highpressure:{ name:"Alarme haute pression", desc:"Déclenche une alarme si la pression dépasse le seuil (ex : 110% de la PMS). Réduction automatique du brûleur ou arrêt. Si la pression continue → soupape de sûreté s'ouvre.", action:"Alarme + réduction brûleur" },
    },
    practiceTitle:"Exercice pratique",
    questions:[
      { q:"Expliquez la différence fondamentale entre une chaudière acuatubulaire et une chaudière ignitubulaire. Quand utilise-t-on chacune ?",
        a:"Chaudière acuatubulaire (Water tube) : l'eau circule DANS les tubes, les gaz chauds passent AUTOUR. Avantages : hautes pressions possibles (jusqu'à 100 bar), montée rapide, grande puissance. Utilisée sur les grands navires, pétroliers, navires à propulsion vapeur. Chaudière ignitubulaire (Fire tube) : les gaz chauds circulent DANS les tubes, l'eau est AUTOUR. Avantages : construction simple, robuste, moins exigeante sur la qualité de l'eau. Pression limitée à 18 bar. Utilisée pour les chaudières auxiliaires de petit et moyen tonnage. Critère de choix : pression requise et puissance. Au-dessus de 18 bar → acuatubulaire obligatoire." },
      { q:"Quelles sont les trois sécurités obligatoires d'une chaudière marine et que se passe-t-il si chacune est défaillante ?",
        a:"1. Soupape de sûreté : si défaillante (coincée fermée), la pression monte sans limite → risque d'explosion de la chaudière. SOLAS impose au moins 2 soupapes par chaudière. 2. Indicateur de niveau d'eau : si défaillant ou mal lu → niveau trop bas → les tubes chauffants sont exposés sans eau → surchauffe → déformation → explosion (BLEVE). 3. Détecteur de flamme (flame eye) : si défaillant → si la flamme s'éteint, le combustible continue d'être injecté → accumulation de gaz → explosion lors du réallumage. Ces 3 sécurités sont redondantes (au moins 2 de chaque sur les grandes chaudières) et testées selon le PMS." },
      { q:"Qu'est-ce qu'une chaudière composite et pourquoi est-elle économiquement avantageuse ?",
        a:"Une chaudière composite combine deux sources de chaleur : 1. Un économiseur de gaz d'échappement (ECE) : tubes placés dans la cheminée qui récupèrent la chaleur des gaz d'échappement du moteur principal (350-400°C) pour produire de la vapeur. 2. Un brûleur auxiliaire : prend le relais quand l'ECE est insuffisant (moteur à faible charge, à l'arrêt, en manœuvre). Avantages économiques : en navigation normale, l'ECE fournit 70-90% des besoins en vapeur GRATUITEMENT (chaleur perdue récupérée). Le brûleur ne consomme du combustible que pour compléter ou suppléer. Économie typique : 150-300 kg/h de HFO économisé par rapport à une chaudière auxiliaire classique. C'est la solution la plus répandue sur les navires modernes à moteur diesel." },
    ],
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
  },
  en:{
    moduleLabel:"ENGINE — BOILERS",
    lessonTitle:"Marine Boiler Types",
    intro:"The marine boiler is an essential steam generator on board. It provides steam for HFO heating, hot water production, ejectors, heating systems and, on steam-propelled vessels, for propulsion itself.",
    tabs:["📖 Content","✏️ Practice","📚 Question Bank","🎯 Quiz"],
    s1title:"🔥 Marine Boiler Types",
    s1hint:"👆 Tap a type to see its characteristics",
    s2title:"⚙️ Main Components",
    s2hint:"👆 Tap a component for its description",
    s3title:"📊 Operating Parameters",
    s3hint:"👆 Tap a parameter",
    s4title:"⚠️ Mandatory Safety Devices",
    s4hint:"👆 Tap a safety device",
    keypoints:"Key Points",
    kp:[
      "Water tube boiler is standard on modern vessels",
      "Fire tube boiler is used for low-power auxiliaries",
      "Typical service pressure is 7-10 bar for auxiliary boilers",
      "Three mandatory safety devices: safety valve, pressure gauge, water level",
      "Exhaust gas economiser recovers heat from engine exhaust gases",
    ],
    boilerTypes:{
      watertube:{ name:"Water tube boiler", desc:"Water flows INSIDE tubes, hot gases pass AROUND them. Advantages: high pressure possible (up to 100 bar), rapid steam raising, high power output. Standard on modern vessels and tankers. Disadvantages: very pure feed water required, complex maintenance.", pressure:"7-100 bar" },
      firetube:{ name:"Fire tube boiler", desc:"Hot gases flow INSIDE tubes, water is AROUND them. Advantages: simple, robust, less sensitive to water quality. Used for auxiliary boilers on small vessels and heating boilers. Disadvantages: pressure limited (< 18 bar), slow to raise steam.", pressure:"5-18 bar" },
      composite:{ name:"Composite boiler", desc:"Combines exhaust gas economiser (EGE) and auxiliary burner. Economiser recovers engine exhaust gas heat at sea. Burner takes over when stopped or if demand exceeds EGE output. Very common economical solution.", pressure:"7-10 bar" },
      exhaust:{ name:"Exhaust gas economiser (EGE)", desc:"Operates only on main engine exhaust gas heat (350-400°C). No burner. Free steam production at sea. Zero output when engine stopped. Installed in funnel in series with gases.", pressure:"6-8 bar" },
    },
    components:{
      drum:{ name:"Steam drum", desc:"Upper vessel where produced steam accumulates. Contains steam/water separator. Fitted with pressure gauge, water level gauge and safety valve. Most critical boiler component." },
      burner:{ name:"Burner", desc:"Atomises fuel (HFO or MDO) into fine droplets in the combustion chamber. Types: mechanical pressure, steam, rotary. Must be adjusted for complete, clean combustion (no black smoke)." },
      feedwater:{ name:"Feed water pump", desc:"Pumps treated water to the boiler. Must overcome boiler pressure. Redundancy mandatory: at least 2 pumps (electric + steam). Flow controlled by level regulator." },
      safetyvalve:{ name:"Safety valve", desc:"Opens automatically if pressure exceeds set value. MANDATORY per all classifications. Set at 10% above service pressure. At least 2 safety valves per boiler." },
      watergage:{ name:"Water level gauge", desc:"Shows water level in drum. CRITICAL: too low = overheating and explosion. Too high = water carried over in steam (priming). Minimum two gauges required." },
      manometer:{ name:"Pressure gauge", desc:"Measures steam pressure in drum. Checked every watch. Periodically calibrated. High and low pressure alarms connected to central alarm system." },
    },
    parameters:{
      pressure:{ name:"Service pressure", desc:"Standard auxiliary boiler: 7-10 bar. Steam propulsion boiler: 40-100 bar. EGE economiser: 6-8 bar. Pressure determines steam saturation temperature (e.g. 7 bar → 165°C, 10 bar → 180°C)." },
      waterLevel:{ name:"Water level", desc:"Normal level is at centre of water gauge. Low alarm: approx 75mm below normal. Very low alarm: 150mm → automatic burner shutdown. High level: water in steam → avoid." },
      combustion:{ name:"Combustion parameters", desc:"Excess air: 10-20% for complete combustion. Gas temperature: measured at boiler outlet. Smoke colour: colourless/slightly grey = correct, black = insufficient air, white = water in fuel." },
      feedwater:{ name:"Feed water quality", desc:"pH: 10.5-11.5. Hardness: 0 (softened water). Dissolved oxygen: < 0.02 mg/l. Chlorides: < 1 mg/l. Conductivity: < 1000 μS/cm. Non-compliance → tube corrosion and scaling." },
    },
    safeties:{
      sv:{ name:"Safety valve", desc:"Mandatory (SOLAS). At least 2 per boiler. Set at 10% above MAWP. Periodic test (monthly/annual). If it opens during normal service → pressure too high → investigate.", action:"Opens if P > set pressure" },
      lowwater:{ name:"Low water alarm and shutdown", desc:"Alarm at 75mm below normal → increase feed. Burner shutdown at 150mm → never restart without finding cause. Never reset without visual level verification.", action:"Auto burner shutdown" },
      flamefail:{ name:"Flame detector (Flame eye)", desc:"Detects burner flame presence. If flame extinguishes → immediate fuel cutoff (within seconds) to prevent unburnt gas explosion. Burner locks out → mandatory purge before restart.", action:"Auto fuel cutoff" },
      highpressure:{ name:"High pressure alarm", desc:"Triggers alarm if pressure exceeds threshold (e.g. 110% MAWP). Automatic burner reduction or shutdown. If pressure continues → safety valve opens.", action:"Alarm + burner reduction" },
    },
    practiceTitle:"Practice Exercise",
    questions:[
      { q:"Explain the fundamental difference between a water tube and a fire tube boiler. When is each used?",
        a:"Water tube boiler: water flows INSIDE tubes, hot gases pass AROUND them. Advantages: high pressures possible (up to 100 bar), rapid steam raising, high power. Used on large vessels, tankers, steam-propelled ships. Fire tube boiler: hot gases flow INSIDE tubes, water is AROUND them. Advantages: simple construction, robust, less demanding on water quality. Pressure limited to 18 bar. Used for auxiliary boilers on small and medium tonnage vessels. Selection criterion: required pressure and power. Above 18 bar → water tube mandatory." },
      { q:"What are the three mandatory safety devices on a marine boiler and what happens if each fails?",
        a:"1. Safety valve: if failed (jammed shut), pressure rises without limit → boiler explosion risk. SOLAS requires at least 2 per boiler. 2. Water level gauge: if failed or misread → level too low → heating tubes exposed without water → overheating → deformation → explosion (BLEVE). 3. Flame detector (flame eye): if failed → if flame extinguishes, fuel continues to be injected → gas accumulation → explosion on reignition. All 3 are redundant (at least 2 of each on large boilers) and tested per PMS." },
      { q:"What is a composite boiler and why is it economically advantageous?",
        a:"A composite boiler combines two heat sources: 1. Exhaust gas economiser (EGE): tubes placed in the funnel recovering main engine exhaust gas heat (350-400°C) to produce steam. 2. Auxiliary burner: takes over when EGE is insufficient (engine at low load, stopped, manoeuvring). Economic advantages: in normal navigation, EGE provides 70-90% of steam needs FREE (recovered waste heat). Burner only consumes fuel to supplement or replace. Typical saving: 150-300 kg/h HFO compared to conventional auxiliary boiler. Most common solution on modern diesel-engine vessels." },
    ],
    showAnswer:"Show answer", hideAnswer:"Hide",
  },
  es:{
    moduleLabel:"MÁQUINAS — CALDERAS",
    lessonTitle:"Tipos de calderas marinas",
    intro:"La caldera marina es un generador de vapor esencial a bordo. Proporciona el vapor necesario para calentar el HFO, producir agua caliente, los eyectores, los sistemas de calefacción y en los buques de propulsión a vapor, para la propulsión.",
    tabs:["📖 Contenido","✏️ Práctica","📚 Banco Q.","🎯 Quiz"],
    s1title:"🔥 Tipos de calderas marinas",
    s1hint:"👆 Toca un tipo para ver sus características",
    s2title:"⚙️ Componentes principales",
    s2hint:"👆 Toca un componente para su descripción",
    s3title:"📊 Parámetros de funcionamiento",
    s3hint:"👆 Toca un parámetro",
    s4title:"⚠️ Seguridades obligatorias",
    s4hint:"👆 Toca una seguridad",
    keypoints:"Puntos clave",
    kp:[
      "La caldera acuatubular (water tube) es estándar en los buques modernos",
      "La caldera pirotubular (fire tube) se usa para auxiliares de poca potencia",
      "La presión de servicio típica es 7-10 bar para calderas auxiliares",
      "Tres seguridades obligatorias: válvula de seguridad, manómetro, nivel de agua",
      "La caldera economizadora recupera calor de los gases de escape",
    ],
    boilerTypes:{
      watertube:{ name:"Caldera acuatubular (Water tube)", desc:"El agua circula POR el interior de los tubos, los gases calientes pasan POR FUERA. Ventajas: altas presiones posibles (hasta 100 bar), rápida puesta en presión, gran potencia. Estándar en buques modernos y petroleros. Inconvenientes: agua de alimentación muy pura, mantenimiento complejo.", pressure:"7-100 bar" },
      firetube:{ name:"Caldera pirotubular (Fire tube)", desc:"Los gases calientes circulan POR el interior de los tubos, el agua está POR FUERA. Ventajas: simple, robusta, menos exigente en calidad del agua. Usada en calderas auxiliares de pequeño buque. Inconvenientes: presión limitada (< 18 bar), subida lenta.", pressure:"5-18 bar" },
      composite:{ name:"Caldera compuesta", desc:"Combina un economizador de gases de escape (EGE) y un quemador auxiliar. El economizador recupera el calor de los gases de escape en navegación. El quemador suple cuando el EGE es insuficiente. Solución muy extendida.", pressure:"7-10 bar" },
      exhaust:{ name:"Caldera de recuperación (EGE)", desc:"Funciona solo con el calor de los gases de escape del motor principal (350-400°C). Sin quemador. Producción gratuita de vapor en navegación. Sin producción con motor parado.", pressure:"6-8 bar" },
    },
    components:{
      drum:{ name:"Balón de vapor (Steam drum)", desc:"Depósito superior donde se acumula el vapor producido. Contiene el separador vapor/agua. Equipado con manómetro, indicador de nivel y válvula de seguridad." },
      burner:{ name:"Quemador (Burner)", desc:"Pulveriza el combustible (HFO o MDO) en la cámara de combustión. Debe ajustarse para una combustión completa y limpia (sin humo negro)." },
      feedwater:{ name:"Bomba de agua de alimentación", desc:"Bombea el agua tratada hacia la caldera. Redundancia obligatoria: mínimo 2 bombas. Caudal controlado por regulador de nivel." },
      safetyvalve:{ name:"Válvula de seguridad", desc:"Se abre automáticamente si la presión supera el valor ajustado. OBLIGATORIA. Al menos 2 por caldera. Ajustada al 10% por encima de la PMS." },
      watergage:{ name:"Indicador de nivel de agua", desc:"Muestra el nivel de agua en el balón. CRÍTICO: nivel bajo → sobrecalentamiento y explosión. Nivel alto → agua arrastrada en el vapor. Mínimo dos indicadores." },
      manometer:{ name:"Manómetro", desc:"Mide la presión de vapor en el balón. Verificación en cada guardia. Calibrado periódicamente. Alarmas de alta y baja presión." },
    },
    parameters:{
      pressure:{ name:"Presión de servicio", desc:"Caldera auxiliar estándar: 7-10 bar. Caldera de propulsión: 40-100 bar. EGE: 6-8 bar. La presión determina la temperatura de saturación (7 bar → 165°C, 10 bar → 180°C)." },
      waterLevel:{ name:"Nivel de agua", desc:"El nivel normal está en el centro del indicador. Alarma baja: ≈75mm bajo el normal. Alarma muy baja: 150mm → parada automática del quemador. Nivel alto: agua en el vapor." },
      combustion:{ name:"Parámetros de combustión", desc:"Exceso de aire: 10-20%. Temperatura de gases: medida a la salida. Color del humo: incoloro/gris claro = correcto, negro = falta de aire, blanco = agua en combustible." },
      feedwater:{ name:"Calidad agua de alimentación", desc:"pH: 10,5-11,5. Dureza: 0. Oxígeno disuelto: < 0,02 mg/l. Cloruros: < 1 mg/l. Conductividad: < 1000 μS/cm. Incumplimiento → corrosión e incrustaciones." },
    },
    safeties:{
      sv:{ name:"Válvula de seguridad", desc:"Obligatoria (SOLAS). Al menos 2 por caldera. Ajustada al 10% sobre la PMS. Prueba periódica. Si se abre en servicio normal → presión demasiado alta → investigar.", action:"Se abre si P > P_ajustada" },
      lowwater:{ name:"Alarma y parada por bajo nivel", desc:"Alarma a 75mm bajo el normal → aumentar alimentación. Parada del quemador a 150mm → nunca reanudar sin encontrar la causa.", action:"Parada automática quemador" },
      flamefail:{ name:"Detector de llama (Flame eye)", desc:"Detecta la presencia de llama. Si se apaga → corte inmediato del combustible para evitar explosión de gas. El quemador se bloquea → purga obligatoria antes de rearrancar.", action:"Corte automático combustible" },
      highpressure:{ name:"Alarma alta presión", desc:"Activa una alarma si la presión supera el umbral (110% de la PMS). Reducción automática o parada del quemador. Si continúa → válvula de seguridad se abre.", action:"Alarma + reducción quemador" },
    },
    practiceTitle:"Ejercicio práctico",
    questions:[
      { q:"Explique la diferencia fundamental entre una caldera acuatubular y una pirotubular. ¿Cuándo se usa cada una?",
        a:"Acuatubular: el agua circula POR el interior de los tubos, los gases calientes pasan POR FUERA. Ventajas: altas presiones (hasta 100 bar), rápida puesta en presión, gran potencia. Usada en grandes buques, petroleros, propulsión vapor. Pirotubular: gases calientes POR el interior, agua POR FUERA. Simples y robustas, presión limitada a 18 bar. Para auxiliares de pequeño y mediano tonelaje. Criterio: por encima de 18 bar → acuatubular obligatoria." },
      { q:"¿Cuáles son las tres seguridades obligatorias de una caldera marina y qué ocurre si fallan?",
        a:"1. Válvula de seguridad: si falla (atascada cerrada), la presión sube sin límite → riesgo de explosión. SOLAS exige mínimo 2 por caldera. 2. Indicador de nivel de agua: si falla → nivel bajo → tubos sin agua → sobrecalentamiento → deformación → explosión (BLEVE). 3. Detector de llama: si falla → combustible sigue inyectándose si la llama se apaga → acumulación de gas → explosión al reencender. Las 3 son redundantes y se prueban según el PMS." },
      { q:"¿Qué es una caldera compuesta y por qué es económicamente ventajosa?",
        a:"Combina: 1. Economizador de gases de escape (EGE): tubos en la chimenea que recuperan el calor (350-400°C) para producir vapor gratis. 2. Quemador auxiliar: suple cuando el EGE es insuficiente. Ventajas: en navegación normal el EGE proporciona el 70-90% del vapor de forma gratuita. El quemador solo consume combustible para completar. Ahorro típico: 150-300 kg/h de HFO. Solución más extendida en buques modernos." },
    ],
    showAnswer:"Ver corrección", hideAnswer:"Ocultar",
  },
  pt:{
    moduleLabel:"MÁQUINAS — CALDEIRAS",
    lessonTitle:"Tipos de caldeiras marinhas",
    intro:"A caldeira marinha é um gerador de vapor essencial a bordo. Fornece vapor para aquecimento do HFO, produção de água quente, ejetores, sistemas de aquecimento e, nos navios de propulsão a vapor, para a propulsão.",
    tabs:["📖 Conteúdo","✏️ Prática","📚 Banco Q.","🎯 Quiz"],
    s1title:"🔥 Tipos de caldeiras marinhas",
    s1hint:"👆 Toque num tipo para ver as características",
    s2title:"⚙️ Componentes principais",
    s2hint:"👆 Toque num componente para a descrição",
    s3title:"📊 Parâmetros de funcionamento",
    s3hint:"👆 Toque num parâmetro",
    s4title:"⚠️ Seguridades obrigatórias",
    s4hint:"👆 Toque numa seguridade",
    keypoints:"Pontos-chave",
    kp:[
      "A caldeira aquatubular (water tube) é padrão nos navios modernos",
      "A caldeira pirotubular (fire tube) é usada para auxiliares de pouca potência",
      "A pressão de serviço típica é 7-10 bar para caldeiras auxiliares",
      "Três seguridades obrigatórias: válvula de segurança, manómetro, nível de água",
      "A caldeira economizadora recupera calor dos gases de escape",
    ],
    boilerTypes:{
      watertube:{ name:"Caldeira aquatubular (Water tube)", desc:"A água circula NO INTERIOR dos tubos, os gases quentes passam À VOLTA. Vantagens: altas pressões possíveis (até 100 bar), rápida subida de pressão, grande potência. Padrão em navios modernos e petroleiros. Desvantagens: água de alimentação muito pura, manutenção complexa.", pressure:"7-100 bar" },
      firetube:{ name:"Caldeira pirotubular (Fire tube)", desc:"Os gases quentes circulam NO INTERIOR dos tubos, a água está À VOLTA. Vantagens: simples, robusta, menos exigente em qualidade da água. Usada em caldeiras auxiliares de pequenos navios. Desvantagens: pressão limitada (< 18 bar), subida lenta.", pressure:"5-18 bar" },
      composite:{ name:"Caldeira composta", desc:"Combina economizador de gases de escape (EGE) e queimador auxiliar. O economizador recupera calor dos gases em navegação. O queimador supre quando o EGE é insuficiente. Solução económica muito comum.", pressure:"7-10 bar" },
      exhaust:{ name:"Caldeira de recuperação (EGE)", desc:"Funciona apenas com o calor dos gases de escape do motor principal (350-400°C). Sem queimador. Produção gratuita de vapor em navegação. Sem produção com motor parado.", pressure:"6-8 bar" },
    },
    components:{
      drum:{ name:"Balão de vapor (Steam drum)", desc:"Reservatório superior onde se acumula o vapor produzido. Contém o separador vapor/água. Equipado com manómetro, indicador de nível e válvula de segurança." },
      burner:{ name:"Queimador (Burner)", desc:"Pulveriza o combustível (HFO ou MDO) em finas gotículas na câmara de combustão. Deve ser ajustado para uma combustão completa e limpa (sem fumo preto)." },
      feedwater:{ name:"Bomba de água de alimentação", desc:"Bombeia a água tratada para a caldeira. Redundância obrigatória: mínimo 2 bombas. Caudal controlado por regulador de nível." },
      safetyvalve:{ name:"Válvula de segurança", desc:"Abre automaticamente se a pressão ultrapassar o valor regulado. OBRIGATÓRIA. Pelo menos 2 por caldeira. Regulada a 10% acima da PMS." },
      watergage:{ name:"Indicador de nível de água", desc:"Mostra o nível de água no balão. CRÍTICO: nível baixo → sobreaquecimento e explosão. Nível alto → água arrastada no vapor. Mínimo dois indicadores." },
      manometer:{ name:"Manómetro", desc:"Mede a pressão de vapor no balão. Verificação em cada quarto. Calibrado periodicamente. Alarmes de alta e baixa pressão ligados ao sistema central." },
    },
    parameters:{
      pressure:{ name:"Pressão de serviço", desc:"Caldeira auxiliar padrão: 7-10 bar. Caldeira de propulsão: 40-100 bar. EGE: 6-8 bar. A pressão determina a temperatura de saturação (7 bar → 165°C, 10 bar → 180°C)." },
      waterLevel:{ name:"Nível de água", desc:"O nível normal está no centro do indicador. Alarme baixo: ≈75mm abaixo do normal. Alarme muito baixo: 150mm → paragem automática do queimador. Nível alto: água no vapor." },
      combustion:{ name:"Parâmetros de combustão", desc:"Excesso de ar: 10-20%. Temperatura dos gases: medida à saída. Cor do fumo: incolor/ligeiramente cinzento = correto, preto = falta de ar, branco = água no combustível." },
      feedwater:{ name:"Qualidade água de alimentação", desc:"pH: 10,5-11,5. Dureza: 0. Oxigénio dissolvido: < 0,02 mg/l. Cloretos: < 1 mg/l. Condutividade: < 1000 μS/cm. Incumprimento → corrosão e incrustações." },
    },
    safeties:{
      sv:{ name:"Válvula de segurança", desc:"Obrigatória (SOLAS). Pelo menos 2 por caldeira. Regulada a 10% acima da PMS. Teste periódico. Se abre em serviço normal → pressão alta demais → investigar.", action:"Abre se P > P_regulada" },
      lowwater:{ name:"Alarme e paragem por baixo nível", desc:"Alarme a 75mm abaixo do normal → aumentar alimentação. Paragem do queimador a 150mm → nunca reanudar sem encontrar a causa.", action:"Paragem automática queimador" },
      flamefail:{ name:"Detetor de chama (Flame eye)", desc:"Deteta a presença de chama. Se se apaga → corte imediato do combustível para evitar explosão de gás. O queimador bloqueia → purga obrigatória antes de rearrancar.", action:"Corte automático combustível" },
      highpressure:{ name:"Alarme alta pressão", desc:"Aciona alarme se a pressão ultrapassa o limiar (110% da PMS). Redução automática ou paragem do queimador. Se continua → válvula de segurança abre.", action:"Alarme + redução queimador" },
    },
    practiceTitle:"Exercício prático",
    questions:[
      { q:"Explique a diferença fundamental entre uma caldeira aquatubular e uma pirotubular. Quando se usa cada uma?",
        a:"Aquatubular: a água circula NO INTERIOR dos tubos, os gases quentes passam À VOLTA. Vantagens: altas pressões (até 100 bar), rápida subida, grande potência. Usada em grandes navios, petroleiros, propulsão a vapor. Pirotubular: gases quentes NO INTERIOR, água À VOLTA. Simples e robusta, pressão limitada a 18 bar. Para auxiliares de pequeno e médio tonelagem. Critério: acima de 18 bar → aquatubular obrigatória." },
      { q:"Quais são as três seguridades obrigatórias de uma caldeira marinha e o que acontece se falharem?",
        a:"1. Válvula de segurança: se falhar (presa fechada), pressão sobe sem limite → risco de explosão. SOLAS exige mínimo 2 por caldeira. 2. Indicador de nível de água: se falhar → nível baixo → tubos sem água → sobreaquecimento → deformação → explosão (BLEVE). 3. Detetor de chama: se falhar → combustível continua a injetar-se se a chama se apaga → acumulação de gás → explosão ao reacender. As 3 são redundantes e testadas segundo o PMS." },
      { q:"O que é uma caldeira composta e por que é economicamente vantajosa?",
        a:"Combina: 1. Economizador de gases de escape (EGE): tubos na chaminé que recuperam calor (350-400°C) para produzir vapor gratuitamente. 2. Queimador auxiliar: supre quando o EGE é insuficiente. Vantagens: em navegação normal o EGE fornece 70-90% do vapor de forma gratuita. O queimador só consome combustível para completar. Poupança típica: 150-300 kg/h de HFO. Solução mais comum em navios modernos." },
    ],
    showAnswer:"Ver correção", hideAnswer:"Ocultar",
  },
};

// ── SVG 1 — BOILER TYPES ─────────────────────────────────────
function BoilerTypesSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("watertube");
  const types = t.boilerTypes;
  const typeColors: Record<string,string> = {watertube:C.steam,firetube:C.fire,composite:C.water,exhaust:C.pressure};

  const svgs: Record<string,JSX.Element> = {
    watertube:(
      <g>
        {/* Drum top */}
        <ellipse cx="80" cy="25" rx="50" ry="12" fill={C.steam} opacity={0.2} stroke={C.steam} strokeWidth="1.5"/>
        <text x="80" y="29" fontSize="7" fill={C.steam} textAnchor="middle" fontFamily="Courier New">STEAM DRUM</text>
        {/* Water tubes */}
        {[-24,-12,0,12,24].map((dx,i)=>(
          <line key={i} x1={80+dx} y1="37" x2={80+dx} y2="120" stroke={C.steam} strokeWidth="3" opacity={0.7}/>
        ))}
        {/* Hot gas arrows around tubes */}
        <text x="20" y="80" fontSize="7" fill={C.fire} fontFamily="Courier New">HOT</text>
        <text x="20" y="90" fontSize="7" fill={C.fire} fontFamily="Courier New">GAS</text>
        <line x1="38" y1="80" x2="52" y2="80" stroke={C.fire} strokeWidth="1.5"/>
        <text x="120" y="80" fontSize="7" fill={C.fire} fontFamily="Courier New" textAnchor="end">→</text>
        {/* Water arrows inside tubes */}
        <line x1="80" y1="120" x2="80" y2="45" stroke={C.water} strokeWidth="1" strokeDasharray="3,3"/>
        <text x="80" y="140" fontSize="7" fill={C.water} textAnchor="middle" fontFamily="Courier New">WATER UP</text>
        <text x="80" y="155" fontSize="8" fontWeight="700" fill={C.steam} textAnchor="middle" fontFamily="Courier New">WATER IN TUBES</text>
      </g>
    ),
    firetube:(
      <g>
        {/* Shell */}
        <rect x="15" y="30" width="130" height="100" rx="8" fill={C.fire} opacity={0.08} stroke={C.fire} strokeWidth="1.5"/>
        {/* Fire tubes */}
        {[55,70,85,100].map((y,i)=>(
          <line key={i} x1="15" y1={y} x2="145" y2={y} stroke={C.fire} strokeWidth="4" opacity={0.6}/>
        ))}
        {/* Water around */}
        <text x="80" y="48" fontSize="7" fill={C.water} textAnchor="middle" fontFamily="Courier New">WATER</text>
        {/* Gas arrows in tubes */}
        <text x="155" y="78" fontSize="7" fill={C.fire} fontFamily="Courier New">GAS→</text>
        <text x="80" y="145" fontSize="8" fontWeight="700" fill={C.fire} textAnchor="middle" fontFamily="Courier New">GAS IN TUBES</text>
      </g>
    ),
    composite:(
      <g>
        {/* ECE section */}
        <rect x="15" y="15" width="130" height="55" rx="6" fill={C.pressure} opacity={0.1} stroke={C.pressure} strokeWidth="1.5"/>
        <text x="80" y="35" fontSize="8" fill={C.pressure} textAnchor="middle" fontFamily="Courier New">ECE</text>
        <text x="80" y="47" fontSize="6" fill={C.pressure} textAnchor="middle" fontFamily="Courier New">EXHAUST GAS</text>
        {/* Burner section */}
        <rect x="15" y="80" width="130" height="65" rx="6" fill={C.fire} opacity={0.1} stroke={C.fire} strokeWidth="1.5"/>
        <text x="80" y="108" fontSize="8" fill={C.fire} textAnchor="middle" fontFamily="Courier New">BURNER</text>
        <text x="80" y="120" fontSize="6" fill={C.fire} textAnchor="middle" fontFamily="Courier New">HFO/MDO</text>
        {/* Steam output */}
        <line x1="80" y1="15" x2="80" y2="5" stroke={C.steam} strokeWidth="2"/>
        <text x="80" y="3" fontSize="6" fill={C.steam} textAnchor="middle" fontFamily="Courier New">→ STEAM</text>
        <text x="80" y="160" fontSize="8" fontWeight="700" fill={C.water} textAnchor="middle" fontFamily="Courier New">ECE + BURNER</text>
      </g>
    ),
    exhaust:(
      <g>
        {/* Funnel */}
        <rect x="50" y="10" width="60" height="130" rx="4" fill={C.pressure} opacity={0.08} stroke={C.pressure} strokeWidth="1.5"/>
        {/* Tubes */}
        {[65,80,95,110].map((y,i)=>(
          <line key={i} x1="50" y1={y} x2="110" y2={y} stroke={C.steam} strokeWidth="3" opacity={0.6}/>
        ))}
        {/* Gas flow */}
        <text x="80" y="30" fontSize="7" fill={C.fire} textAnchor="middle" fontFamily="Courier New">GAS 350°C</text>
        <line x1="80" y1="35" x2="80" y2="55" stroke={C.fire} strokeWidth="1.5"/>
        <text x="80" y="155" fontSize="7" fill={C.fire} textAnchor="middle" fontFamily="Courier New">GAS OUT</text>
        <text x="25" y="90" fontSize="6" fill={C.steam} fontFamily="Courier New">STEAM</text>
        <text x="80" y="165" fontSize="8" fontWeight="700" fill={C.pressure} textAnchor="middle" fontFamily="Courier New">ECE ONLY</text>
      </g>
    ),
  };

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.fire}33`}}>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {Object.entries(types).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{
            flex:1,padding:"7px 4px",borderRadius:10,fontSize:9,cursor:"pointer",minWidth:60,
            background:sel===key?`${typeColors[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?typeColors[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?typeColors[key]:"rgba(240,244,255,0.45)",
            fontFamily:"Courier New",textAlign:"center",
          }}>{key==="watertube"?"WATER\nTUBE":key==="firetube"?"FIRE\nTUBE":key==="composite"?"COMPO\nSITE":"ECE\nONLY"}</button>
        ))}
      </div>
      <svg viewBox="0 0 160 170" style={{width:"100%",maxWidth:220,display:"block",margin:"0 auto",background:`${C.navy3}66`,borderRadius:8}}>
        {svgs[sel]}
      </svg>
      <div style={{marginTop:10,padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${typeColors[sel]||C.fire}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
        <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{types[sel].name}</div>
        <div style={{marginBottom:6}}>{types[sel].desc}</div>
        <div style={{fontSize:10,color:typeColors[sel],fontWeight:700}}>⚡ {types[sel].pressure}</div>
      </div>
    </div>
  );
}

// ── SVG 2 — COMPONENTS ───────────────────────────────────────
function ComponentsSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string|null>(null);
  const comps = t.components;
  const compColors: Record<string,string> = {
    drum:C.steam, burner:C.fire, feedwater:C.water,
    safetyvalve:C.danger, watergage:C.temp, manometer:C.pressure,
  };
  const icons: Record<string,string> = {drum:"🫧",burner:"🔥",feedwater:"💧",safetyvalve:"🔴",watergage:"📏",manometer:"📊"};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.steam}33`}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:10}}>
        {Object.entries(comps).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(sel===key?null:key)} style={{
            padding:"8px 4px",borderRadius:10,fontSize:10,cursor:"pointer",
            background:sel===key?`${compColors[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?compColors[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?compColors[key]:"rgba(240,244,255,0.45)",
            fontFamily:"Courier New",textAlign:"center",
          }}>{icons[key]}</button>
        ))}
      </div>
      {sel&&(
        <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${compColors[sel]||C.steam}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
          <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{icons[sel]} {comps[sel].name}</div>
          {comps[sel].desc}
        </div>
      )}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)",padding:16}}>{t.s2hint}</div>}
    </div>
  );
}

// ── SVG 3 — PARAMETERS ───────────────────────────────────────
function ParametersSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("pressure");
  const params = t.parameters;
  const pColors: Record<string,string> = {pressure:C.pressure,waterLevel:C.steam,combustion:C.fire,feedwater:C.water};
  const icons: Record<string,string> = {pressure:"📊",waterLevel:"💧",combustion:"🔥",feedwater:"🧪"};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.pressure}33`}}>
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {Object.entries(params).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{flex:1,padding:"8px 4px",borderRadius:10,fontSize:14,cursor:"pointer",background:sel===key?`${pColors[key]}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?pColors[key]:"rgba(255,255,255,0.1)"}`,textAlign:"center"}}>
            {icons[key]}
          </button>
        ))}
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${pColors[sel]||C.pressure}44`,minHeight:80}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:pColors[sel]||C.pressure,fontWeight:700,marginBottom:8}}>{icons[sel]} {params[sel].name}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{params[sel].desc}</div>
      </div>
    </div>
  );
}

// ── SVG 4 — SAFETIES ─────────────────────────────────────────
function SafetiesSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string|null>(null);
  const safeties = t.safeties;
  const sColors: Record<string,string> = {sv:C.danger,lowwater:C.steam,flamefail:C.fire,highpressure:C.pressure};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.danger}33`}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {Object.entries(safeties).map(([key,val]:any)=>{
          const col=sColors[key]||C.danger;
          return(
            <button key={key} onClick={()=>setSel(sel===key?null:key)} style={{padding:"10px 8px",borderRadius:10,cursor:"pointer",textAlign:"left",background:sel===key?`${col}18`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`}}>
              <div style={{fontSize:11,fontWeight:700,color:"#f0f4ff",fontFamily:"Courier New",lineHeight:1.4}}>{val.name}</div>
              <div style={{fontSize:9,color:col,fontFamily:"Courier New",marginTop:3}}>{val.action}</div>
            </button>
          );
        })}
      </div>
      {sel&&(
        <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${sColors[sel]||C.danger}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
          <div style={{color:sColors[sel]||C.danger,fontWeight:700,marginBottom:4}}>⚠️ {safeties[sel].name}</div>
          {safeties[sel].desc}
        </div>
      )}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)"}}>{t.s4hint}</div>}
    </div>
  );
}

// ── CONTENT TAB ───────────────────────────────────────────────
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
      {section(t.s1title,<BoilerTypesSVG lang={lang}/>,C.fire)}
      {section(t.s2title,<ComponentsSVG lang={lang}/>,C.steam)}
      {section(t.s3title,<ParametersSVG lang={lang}/>,C.pressure)}
      {section(t.s4title,<SafetiesSVG lang={lang}/>,C.danger)}
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
// LessonE3_L1 — PART 2: Bank + Quiz + Main

function getBank(lang: string) {
  const b: any = {
    fr:[
      {q:"Quelle est la différence principale entre une chaudière acuatubulaire et ignitubulaire ?",a:"Acuatubulaire : eau DANS les tubes, gaz autour. Haute pression possible (jusqu'à 100 bar), montée rapide, grande puissance. Ignitubulaire : gaz DANS les tubes, eau autour. Simple, robuste, pression limitée à 18 bar. Critère de choix : pression requise. Au-dessus de 18 bar → acuatubulaire obligatoire."},
      {q:"Pourquoi la soupape de sûreté est-elle indispensable sur une chaudière ?",a:"Elle s'ouvre automatiquement si la pression dépasse le seuil réglé (10% au-dessus de la PMS) pour éviter une explosion. SOLAS impose au moins 2 soupapes par chaudière. Si elle s'ouvre en service normal → la pression est trop haute → investiguer la cause. Test périodique obligatoire."},
      {q:"Qu'est-ce qu'une chaudière composite et quels sont ses avantages ?",a:"Elle combine un économiseur de gaz d'échappement (ECE) et un brûleur auxiliaire. L'ECE produit de la vapeur gratuite en navigation (chaleur récupérée des gaz d'échappement moteur). Le brûleur prend le relais à l'arrêt. Économie typique : 150-300 kg/h de HFO. Solution la plus répandue sur les navires modernes."},
      {q:"Quelles sont les conséquences d'un bas niveau d'eau dans une chaudière ?",a:"Si le niveau d'eau est trop bas : les tubes chauffants sont exposés sans eau → surchauffe → déformation → explosion BLEVE possible. Le système déclenche : alarme à 75mm sous le niveau normal, arrêt automatique du brûleur à 150mm. Ne jamais réarmer sans trouver la cause et vérifier le niveau visuellement."},
      {q:"Quels sont les paramètres de qualité de l'eau d'alimentation d'une chaudière ?",a:"pH : 10,5-11,5 (alcalin pour protéger contre corrosion). Dureté : 0 (eau adoucie → éviter entartrage). Oxygène dissous : < 0,02 mg/l (éviter corrosion par piqûres). Chlorures : < 1 mg/l. Conductivité : < 1000 μS/cm. Non-respect → corrosion et entartrage des tubes → réduction de l'échange de chaleur → surchauffe."},
      {q:"Comment fonctionne le détecteur de flamme (flame eye) sur un brûleur de chaudière ?",a:"Le flame eye détecte la présence de la flamme dans la chambre de combustion (par rayonnement UV ou IR). Si la flamme s'éteint : arrêt immédiat du combustible (en quelques secondes) pour éviter l'accumulation de gaz non brûlés. Le brûleur se verrouille automatiquement. Avant tout redémarrage : purge obligatoire de la chambre de combustion (injection d'air) pour éliminer les gaz résiduels."},
      {q:"Quelle est la pression de service typique d'une chaudière auxiliaire de navire moderne ?",a:"7 à 10 bar pour une chaudière auxiliaire standard. À cette pression, la température de la vapeur saturée est de 165°C (7 bar) à 180°C (10 bar). La soupape de sûreté est réglée à 10% au-dessus (soit 7,7 à 11 bar). Les chaudières de propulsion vapeur travaillent à 40-100 bar."},
      {q:"Pourquoi l'eau d'alimentation de chaudière doit-elle être désoxygénée ?",a:"L'oxygène dissous dans l'eau est très corrosif pour les surfaces métalliques des chaudières, surtout à haute température. Il provoque une corrosion par piqûres (pitting) des tubes et du ballon. Méthodes de désoxygénation : déaérateur thermique (chauffe l'eau à 100°C pour chasser l'oxygène), injection de sulfite de sodium (réactif chimique qui consomme l'O2), injection d'hydrazine (pour hautes pressions). L'objectif est d'atteindre < 0,02 mg/l d'O2."},
      {q:"Quels sont les risques liés à un niveau d'eau trop élevé dans le ballon vapeur ?",a:"Un niveau trop élevé provoque du mouillage ou un entraînement d'eau (priming/carry-over) : des gouttelettes d'eau sont entraînées avec la vapeur. Conséquences : coup d'eau dans les tubes de vapeur ou les machines alimentées (surchauffeurs, réchauffeurs HFO), dépôts de sels dans les tuyauteries vapeur, détérioration de la qualité de la vapeur. Solution : ouvrir les purges de vapeur, réduire le débit d'alimentation, vérifier le bon fonctionnement du séparateur vapeur/eau."},
      {q:"Comment tester une soupape de sûreté de chaudière ?",a:"Test de la soupape de sûreté : Test manuel (levée de la soupape) : lever manuellement la tige de la soupape avec la chaudière sous pression (≥ 75% de la PMS). La soupape doit s'ouvrir librement et se refermer correctement après relâchement. Test automatique : laisser monter la pression jusqu'au tarage de la soupape → elle doit s'ouvrir automatiquement et évacuer la vapeur. Fréquence : mensuelle (test de levée manuelle), annuelle (test complet sous pression). Consignation dans le registre de maintenance. Si la soupape ne s'ouvre pas à la pression de tarage ou ne se referme pas correctement → remplacement."},
      {q:"Pourquoi une chaudière de récupération ECE ne fonctionne-t-elle pas à l'arrêt du navire ?",a:"La chaudière ECE (Exhaust Gas Economiser) récupère uniquement la chaleur des gaz d'échappement du moteur principal. À l'arrêt du moteur, il n'y a plus de gaz d'échappement → plus de production de vapeur. En port ou à l'arrêt, la chaudière composite bascule sur le brûleur auxiliaire pour fournir la vapeur nécessaire (chauffage HFO, eau sanitaire). C'est pourquoi les navires modernes ont une chaudière composite (ECE + brûleur) plutôt qu'un ECE seul."},
      {q:"Qu'est-ce que le soufflage de suie (soot blowing) sur une chaudière ECE et pourquoi est-il nécessaire ?",a:"Le soufflage de suie consiste à injecter de la vapeur à haute pression sur les surfaces d'échange de chaleur de l'ECE pour en déloger les dépôts de suie et de cendres. Nécessaire car : les gaz d'échappement déposent progressivement de la suie et des cendres sur les tubes → réduction du transfert de chaleur (encrassement) → augmentation de la température des gaz en sortie (perte d'efficacité). Fréquence : généralement une à deux fois par jour en navigation. Attention : évacuer la suie et les cendres de façon contrôlée (éviter la cheminée) pour respecter MARPOL."},
    ],
    en:[
      {q:"What is the main difference between a water tube and fire tube boiler?",a:"Water tube: water INSIDE tubes, gas around. High pressure possible (up to 100 bar), rapid steam raising, high power. Fire tube: gas INSIDE tubes, water around. Simple, robust, pressure limited to 18 bar. Selection criterion: required pressure. Above 18 bar → water tube mandatory."},
      {q:"Why is the safety valve indispensable on a boiler?",a:"It opens automatically if pressure exceeds the set threshold (10% above MAWP) to prevent explosion. SOLAS requires at least 2 per boiler. If it opens during normal service → pressure too high → investigate cause. Periodic testing mandatory."},
      {q:"What is a composite boiler and what are its advantages?",a:"Combines exhaust gas economiser (EGE) and auxiliary burner. EGE produces free steam at sea (recovered engine exhaust heat). Burner takes over when stopped. Typical saving: 150-300 kg/h HFO. Most common solution on modern vessels."},
      {q:"What are the consequences of low water level in a boiler?",a:"If water level too low: heating tubes exposed without water → overheating → deformation → BLEVE explosion possible. System triggers: alarm at 75mm below normal level, automatic burner shutdown at 150mm. Never reset without finding cause and visually checking level."},
      {q:"What are boiler feed water quality parameters?",a:"pH: 10.5-11.5 (alkaline to protect against corrosion). Hardness: 0 (softened water → prevent scaling). Dissolved oxygen: < 0.02 mg/l (prevent pitting corrosion). Chlorides: < 1 mg/l. Conductivity: < 1000 μS/cm. Non-compliance → tube corrosion and scaling → reduced heat exchange → overheating."},
      {q:"How does the flame detector (flame eye) work on a boiler burner?",a:"The flame eye detects flame presence in the combustion chamber (UV or IR radiation). If flame extinguishes: immediate fuel cutoff (within seconds) to prevent unburnt gas accumulation. Burner automatically locks out. Before any restart: mandatory purge of combustion chamber (air injection) to eliminate residual gases."},
      {q:"What is the typical service pressure of a modern vessel auxiliary boiler?",a:"7 to 10 bar for standard auxiliary boiler. At this pressure, saturated steam temperature is 165°C (7 bar) to 180°C (10 bar). Safety valve set 10% above (7.7 to 11 bar). Steam propulsion boilers operate at 40-100 bar."},
      {q:"Why must boiler feed water be de-oxygenated?",a:"Dissolved oxygen is very corrosive to boiler metal surfaces, especially at high temperatures. It causes pitting corrosion on tubes and drum. De-oxygenation methods: thermal de-aerator (heats water to 100°C to drive off oxygen), sodium sulphite injection (chemical reagent consuming O2), hydrazine injection (for high pressures). Target: < 0.02 mg/l O2."},
      {q:"What are the risks of water level too high in the steam drum?",a:"Too high level causes priming/carry-over: water droplets are carried with steam. Consequences: water slug in steam pipes or steam-fed machinery (superheaters, HFO heaters), salt deposits in steam piping, deteriorated steam quality. Solution: open steam drains, reduce feed flow, check steam/water separator condition."},
      {q:"How to test a boiler safety valve?",a:"Manual test (lift test): manually lift the valve stem with boiler under pressure (≥ 75% MAWP). Valve must open freely and close correctly after release. Automatic test: let pressure rise to valve set pressure → must open automatically and vent steam. Frequency: monthly (manual lift test), annual (full pressure test). Log in maintenance records. If valve doesn't open at set pressure or fails to reseat → replace."},
      {q:"Why does an EGE recovery boiler not work when the vessel is stopped?",a:"EGE recovers only main engine exhaust gas heat. With engine stopped, no exhaust gases → no steam production. In port or stopped, composite boiler switches to auxiliary burner for required steam (HFO heating, domestic water). This is why modern vessels have composite boilers (EGE + burner) rather than EGE alone."},
      {q:"What is soot blowing on an EGE boiler and why is it necessary?",a:"Soot blowing consists of injecting high-pressure steam onto EGE heat exchange surfaces to dislodge soot and ash deposits. Necessary because: exhaust gases progressively deposit soot and ash on tubes → reduced heat transfer (fouling) → increased outlet gas temperature (efficiency loss). Frequency: generally once or twice per day at sea. Note: evacuate soot and ash in controlled manner (avoid funnel) to comply with MARPOL."},
    ],
    es:[
      {q:"¿Cuál es la diferencia principal entre una caldera acuatubular y una pirotubular?",a:"Acuatubular: agua POR el interior de los tubos, gas alrededor. Alta presión posible (hasta 100 bar). Pirotubular: gas POR el interior, agua alrededor. Simple, robusta, presión limitada a 18 bar. Por encima de 18 bar → acuatubular obligatoria."},
      {q:"¿Por qué la válvula de seguridad es indispensable en una caldera?",a:"Se abre automáticamente si la presión supera el umbral ajustado (10% sobre la PMS) para evitar una explosión. SOLAS exige mínimo 2 por caldera. Si se abre en servicio normal → presión demasiado alta → investigar. Prueba periódica obligatoria."},
      {q:"¿Qué es una caldera compuesta y cuáles son sus ventajas?",a:"Combina economizador de gases de escape (EGE) y quemador auxiliar. El EGE produce vapor gratis en navegación. El quemador suple cuando el EGE es insuficiente. Ahorro típico: 150-300 kg/h de HFO."},
      {q:"¿Cuáles son las consecuencias de un nivel de agua bajo en una caldera?",a:"Si el nivel es muy bajo: tubos expuestos sin agua → sobrecalentamiento → deformación → explosión BLEVE. El sistema activa: alarma a 75mm bajo el nivel normal, parada automática del quemador a 150mm."},
      {q:"¿Cuáles son los parámetros de calidad del agua de alimentación de una caldera?",a:"pH: 10,5-11,5. Dureza: 0 (agua ablandada). Oxígeno disuelto: < 0,02 mg/l. Cloruros: < 1 mg/l. Conductividad: < 1000 μS/cm. Incumplimiento → corrosión e incrustaciones de los tubos."},
      {q:"¿Cómo funciona el detector de llama (flame eye) en un quemador de caldera?",a:"Detecta la presencia de llama (radiación UV o IR). Si se apaga: corte inmediato del combustible para evitar acumulación de gases. El quemador se bloquea. Antes de rearrancar: purga obligatoria de la cámara de combustión."},
      {q:"¿Cuál es la presión de servicio típica de una caldera auxiliar de un buque moderno?",a:"7 a 10 bar para caldera auxiliar estándar. A esta presión, la temperatura de vapor saturado es 165°C (7 bar) a 180°C (10 bar). Calderas de propulsión: 40-100 bar."},
      {q:"¿Por qué el agua de alimentación de la caldera debe ser desoxigenada?",a:"El oxígeno disuelto es muy corrosivo para las superficies metálicas, especialmente a alta temperatura. Provoca corrosión por picaduras. Métodos: desaireador térmico, inyección de sulfito sódico, hidrazina. Objetivo: < 0,02 mg/l de O2."},
      {q:"¿Cuáles son los riesgos de un nivel de agua demasiado alto en el balón de vapor?",a:"Nivel alto → arrastre de agua (priming/carry-over): gotas de agua arrastradas con el vapor. Consecuencias: golpe de agua en tuberías de vapor, depósitos de sales, deterioro de la calidad del vapor."},
      {q:"¿Cómo probar una válvula de seguridad de caldera?",a:"Prueba manual: levantar la varilla con la caldera bajo presión (≥ 75% PMS). La válvula debe abrirse y cerrarse correctamente. Prueba automática: dejar subir la presión hasta el tarado. Frecuencia: mensual (manual), anual (completa)."},
      {q:"¿Por qué una caldera EGE no funciona con el buque parado?",a:"El EGE solo recupera calor de los gases de escape del motor principal. Sin motor → sin gases → sin vapor. En puerto, la caldera compuesta cambia al quemador auxiliar. Por eso los buques modernos tienen caldera compuesta (EGE + quemador)."},
      {q:"¿Qué es el soplado de hollín (soot blowing) en una caldera EGE?",a:"Inyección de vapor a alta presión sobre las superficies de intercambio para eliminar depósitos de hollín y cenizas. Necesario porque los gases depositan hollín → reduce el intercambio de calor. Frecuencia: 1-2 veces al día en navegación."},
    ],
    pt:[
      {q:"Qual é a diferença principal entre uma caldeira aquatubular e uma pirotubular?",a:"Aquatubular: água NO INTERIOR dos tubos, gás à volta. Alta pressão possível (até 100 bar). Pirotubular: gás NO INTERIOR, água à volta. Simples, robusta, pressão limitada a 18 bar. Acima de 18 bar → aquatubular obrigatória."},
      {q:"Por que a válvula de segurança é indispensável numa caldeira?",a:"Abre automaticamente se a pressão ultrapassar o limiar regulado (10% acima da PMS) para evitar explosão. SOLAS exige mínimo 2 por caldeira. Se abre em serviço normal → pressão demasiado alta → investigar. Teste periódico obrigatório."},
      {q:"O que é uma caldeira composta e quais são as suas vantagens?",a:"Combina economizador de gases de escape (EGE) e queimador auxiliar. O EGE produz vapor grátis em navegação. O queimador supre quando o EGE é insuficiente. Poupança típica: 150-300 kg/h de HFO."},
      {q:"Quais são as consequências de um nível de água baixo numa caldeira?",a:"Se nível muito baixo: tubos expostos sem água → sobreaquecimento → deformação → explosão BLEVE. O sistema aciona: alarme a 75mm abaixo do normal, paragem automática do queimador a 150mm."},
      {q:"Quais são os parâmetros de qualidade da água de alimentação de uma caldeira?",a:"pH: 10,5-11,5. Dureza: 0 (água amolecida). Oxigénio dissolvido: < 0,02 mg/l. Cloretos: < 1 mg/l. Condutividade: < 1000 μS/cm. Incumprimento → corrosão e incrustações dos tubos."},
      {q:"Como funciona o detetor de chama (flame eye) num queimador de caldeira?",a:"Deteta a presença de chama (radiação UV ou IR). Se se apaga: corte imediato do combustível para evitar acumulação de gases. O queimador bloqueia. Antes de rearrancar: purga obrigatória da câmara de combustão."},
      {q:"Qual é a pressão de serviço típica de uma caldeira auxiliar de um navio moderno?",a:"7 a 10 bar para caldeira auxiliar padrão. A esta pressão, a temperatura de vapor saturado é 165°C (7 bar) a 180°C (10 bar). Caldeiras de propulsão: 40-100 bar."},
      {q:"Por que a água de alimentação da caldeira deve ser desoxigenada?",a:"O oxigénio dissolvido é muito corrosivo para as superfícies metálicas, especialmente a alta temperatura. Provoca corrosão por picadas. Métodos: desaerador térmico, injeção de sulfito de sódio, hidrazina. Objetivo: < 0,02 mg/l de O2."},
      {q:"Quais são os riscos de um nível de água demasiado alto no balão de vapor?",a:"Nível alto → arrastamento de água (priming/carry-over): gotículas arrastadas com o vapor. Consequências: golpe de água nas tubagens de vapor, depósitos de sais, deterioração da qualidade do vapor."},
      {q:"Como testar uma válvula de segurança de caldeira?",a:"Teste manual: levantar a haste com a caldeira sob pressão (≥ 75% PMS). A válvula deve abrir e fechar corretamente. Teste automático: deixar subir a pressão até ao taramento. Frequência: mensal (manual), anual (completo)."},
      {q:"Por que uma caldeira EGE não funciona com o navio parado?",a:"O EGE só recupera calor dos gases de escape do motor principal. Sem motor → sem gases → sem vapor. No porto, a caldeira composta muda para o queimador auxiliar. Por isso os navios modernos têm caldeira composta (EGE + queimador)."},
      {q:"O que é o sopro de fuligem (soot blowing) numa caldeira EGE?",a:"Injeção de vapor a alta pressão nas superfícies de troca para eliminar depósitos de fuligem e cinzas. Necessário porque os gases depositam fuligem → reduz a troca de calor. Frequência: 1-2 vezes por dia em navegação."},
    ],
  };
  return b[lang]||b.fr;
}

function getQuiz(lang: string) {
  const q: any = {
    fr:[
      {q:"Dans une chaudière acuatubulaire, où circule l'eau ?",opts:["Autour des tubes","À l'intérieur des tubes","Dans le foyer","Dans la cheminée"],correct:1,exp:"Dans une chaudière acuatubulaire (water tube), l'eau circule À L'INTÉRIEUR des tubes, et les gaz chauds passent AUTOUR. C'est l'inverse d'une chaudière ignitubulaire (fire tube). L'acuatubulaire permet des pressions bien plus élevées (jusqu'à 100 bar)."},
      {q:"À quelle pression est réglée la soupape de sûreté d'une chaudière par rapport à la pression de service maximale (PMS) ?",opts:["Exactement à la PMS","5% au-dessus de la PMS","10% au-dessus de la PMS","50% au-dessus de la PMS"],correct:2,exp:"La soupape de sûreté est réglée à 10% au-dessus de la pression maximale de service (PMS). Exemple : pour une chaudière à 7 bar de PMS, la soupape s'ouvre à 7,7 bar. Cela laisse une marge de sécurité sans déclencher la soupape lors des petites variations de pression normales."},
      {q:"Quelle est la pression de service typique d'une chaudière auxiliaire de navire moderne ?",opts:["1-3 bar","7-10 bar","20-30 bar","40-100 bar"],correct:1,exp:"La chaudière auxiliaire standard d'un navire moderne fonctionne à 7-10 bar. À 7 bar, la vapeur est à 165°C ; à 10 bar, elle est à 180°C. Les chaudières de propulsion vapeur (navires anciens ou GNL) travaillent à 40-100 bar."},
      {q:"Qu'est-ce qu'une chaudière composite ?",opts:["Une chaudière avec deux brûleurs","Une chaudière combinant un économiseur ECE et un brûleur auxiliaire","Une chaudière acuatubulaire et ignitubulaire en parallèle","Une chaudière fonctionnant au HFO et au MDO"],correct:1,exp:"Une chaudière composite combine un économiseur de gaz d'échappement (ECE) et un brûleur auxiliaire. En navigation, l'ECE récupère gratuitement la chaleur des gaz d'échappement du moteur principal. Le brûleur prend le relais à l'arrêt ou quand la demande dépasse la production ECE. C'est la solution la plus économique."},
      {q:"Que se passe-t-il automatiquement quand le niveau d'eau dans une chaudière descend à 150mm sous le niveau normal ?",opts:["Une alarme sonore se déclenche","Le brûleur s'arrête automatiquement","La soupape de sûreté s'ouvre","La pompe d'alimentation démarre"],correct:1,exp:"À 150mm sous le niveau normal, le brûleur s'arrête automatiquement (safety shutdown) pour éviter que les tubes chauffants soient exposés à sec, ce qui provoquerait une surchauffe et risquerait une explosion. L'alarme de bas niveau se déclenche à 75mm — stade précoce pour augmenter l'alimentation avant l'arrêt."},
    ],
    en:[
      {q:"In a water tube boiler, where does water circulate?",opts:["Around the tubes","Inside the tubes","In the furnace","In the funnel"],correct:1,exp:"In a water tube boiler, water circulates INSIDE the tubes, and hot gases pass AROUND them. The opposite of a fire tube boiler. Water tube allows much higher pressures (up to 100 bar)."},
      {q:"At what pressure is a boiler safety valve set relative to maximum allowable working pressure (MAWP)?",opts:["Exactly at MAWP","5% above MAWP","10% above MAWP","50% above MAWP"],correct:2,exp:"Safety valve set at 10% above MAWP. Example: 7 bar MAWP boiler → valve opens at 7.7 bar. This provides safety margin without triggering on normal small pressure variations."},
      {q:"What is the typical service pressure of a modern vessel auxiliary boiler?",opts:["1-3 bar","7-10 bar","20-30 bar","40-100 bar"],correct:1,exp:"Standard auxiliary boiler operates at 7-10 bar. At 7 bar, steam is 165°C; at 10 bar, 180°C. Steam propulsion boilers (old vessels or LNG) operate at 40-100 bar."},
      {q:"What is a composite boiler?",opts:["A boiler with two burners","A boiler combining EGE economiser and auxiliary burner","Parallel water tube and fire tube boiler","A boiler running on HFO and MDO"],correct:1,exp:"A composite boiler combines exhaust gas economiser (EGE) and auxiliary burner. At sea, EGE recovers main engine exhaust heat for free. Burner takes over when stopped or demand exceeds EGE output. Most economical solution."},
      {q:"What happens automatically when boiler water level drops to 150mm below normal?",opts:["Audible alarm triggers","Burner automatically shuts down","Safety valve opens","Feed pump starts"],correct:1,exp:"At 150mm below normal, burner automatically shuts down (safety shutdown) to prevent heating tubes being exposed dry, which would cause overheating and explosion risk. Low level alarm triggers at 75mm — early stage to increase feed before shutdown."},
    ],
    es:[
      {q:"En una caldera acuatubular, ¿dónde circula el agua?",opts:["Alrededor de los tubos","Por el interior de los tubos","En el hogar","En la chimenea"],correct:1,exp:"En una caldera acuatubular (water tube), el agua circula POR EL INTERIOR de los tubos y los gases calientes pasan ALREDEDOR. Lo contrario de una pirotubular. La acuatubular permite presiones mucho más altas (hasta 100 bar)."},
      {q:"¿A qué presión se ajusta la válvula de seguridad respecto a la PMS?",opts:["Exactamente a la PMS","5% sobre la PMS","10% sobre la PMS","50% sobre la PMS"],correct:2,exp:"La válvula se ajusta al 10% sobre la PMS. Ejemplo: caldera de 7 bar → válvula se abre a 7,7 bar. Proporciona margen de seguridad sin dispararse en variaciones normales."},
      {q:"¿Cuál es la presión de servicio típica de una caldera auxiliar de buque moderno?",opts:["1-3 bar","7-10 bar","20-30 bar","40-100 bar"],correct:1,exp:"La caldera auxiliar estándar funciona a 7-10 bar. A 7 bar el vapor está a 165°C; a 10 bar a 180°C. Calderas de propulsión: 40-100 bar."},
      {q:"¿Qué es una caldera compuesta?",opts:["Una caldera con dos quemadores","Una caldera que combina economizador EGE y quemador auxiliar","Caldera acuatubular y pirotubular en paralelo","Una caldera que funciona con HFO y MDO"],correct:1,exp:"Una caldera compuesta combina economizador de gases de escape (EGE) y quemador auxiliar. En navegación el EGE recupera calor gratis. El quemador suple en parada. Solución más económica."},
      {q:"¿Qué ocurre automáticamente cuando el nivel de agua baja 150mm bajo el normal?",opts:["Suena una alarma","El quemador se para automáticamente","La válvula de seguridad se abre","La bomba de alimentación arranca"],correct:1,exp:"A 150mm, el quemador se para automáticamente para evitar que los tubos queden expuestos en seco → sobrecalentamiento → riesgo de explosión. La alarma de bajo nivel actúa a 75mm."},
    ],
    pt:[
      {q:"Numa caldeira aquatubular, onde circula a água?",opts:["À volta dos tubos","No interior dos tubos","No forno","Na chaminé"],correct:1,exp:"Numa caldeira aquatubular, a água circula NO INTERIOR dos tubos e os gases quentes passam À VOLTA. O contrário de uma pirotubular. A aquatubular permite pressões muito mais altas (até 100 bar)."},
      {q:"A que pressão está regulada a válvula de segurança em relação à PMS?",opts:["Exatamente na PMS","5% acima da PMS","10% acima da PMS","50% acima da PMS"],correct:2,exp:"A válvula está regulada a 10% acima da PMS. Exemplo: caldeira de 7 bar → válvula abre a 7,7 bar. Proporciona margem de segurança sem disparar em variações normais."},
      {q:"Qual é a pressão de serviço típica de uma caldeira auxiliar de navio moderno?",opts:["1-3 bar","7-10 bar","20-30 bar","40-100 bar"],correct:1,exp:"A caldeira auxiliar padrão funciona a 7-10 bar. A 7 bar o vapor está a 165°C; a 10 bar a 180°C. Caldeiras de propulsão: 40-100 bar."},
      {q:"O que é uma caldeira composta?",opts:["Uma caldeira com dois queimadores","Uma caldeira que combina economizador EGE e queimador auxiliar","Caldeira aquatubular e pirotubular em paralelo","Uma caldeira que funciona com HFO e MDO"],correct:1,exp:"Uma caldeira composta combina economizador de gases de escape (EGE) e queimador auxiliar. Em navegação o EGE recupera calor grátis. O queimador supre em paragem. Solução mais económica."},
      {q:"O que acontece automaticamente quando o nível de água baixa 150mm abaixo do normal?",opts:["Soa um alarme","O queimador para automaticamente","A válvula de segurança abre","A bomba de alimentação arranca"],correct:1,exp:"A 150mm, o queimador para automaticamente para evitar que os tubos fiquem expostos a seco → sobreaquecimento → risco de explosão. O alarme de nível baixo atua a 75mm."},
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

export default function LessonE3_L1({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t=T[lang]||T.fr;
  const [tab,setTab]=useState(0);
  const progress=[25,50,75,90][tab]||25;
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(249,115,22,0.2)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"6px 12px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>◀</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:2,color:"#f97316",marginBottom:2}}>{t.moduleLabel} · L1</div>
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
