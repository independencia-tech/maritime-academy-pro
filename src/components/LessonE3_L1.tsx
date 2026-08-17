// LessonE3_L1 - Types de chaudières marines | PART 1
import { useState } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  steam:"#4da6ff", fire:"#f97316", water:"#6dbf8a",
  pressure:"#c084fc", temp:"#e8b94f", safe:"#6dbf8a",
  gold:"#c9922a", gold2:"#e8b94f",
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  danger:"#e74c3c",
};

const T: any = {
  fr:{
    moduleLabel:"MACHINE - CHAUDIÈRES",
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
      exhaust:{ name:"Chaudière de récupération (ECE)", desc:"Fonctionne uniquement avec la chaleur des gaz d'échappement du moteur principal (350-400 degC). Pas de brûleur. Production gratuite de vapeur en navigation. Production nulle à l'arrêt du moteur. Installée dans la cheminée en série avec les gaz.", pressure:"6-8 bar" },
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
      pressure:{ name:"Pression de service", desc:"Chaudière auxiliaire standard : 7-10 bar. Chaudière propulsion vapeur : 40-100 bar. Économiseur ECE : 6-8 bar. La pression détermine la température de saturation de la vapeur (ex : 7 bar → 165 degC, 10 bar → 180 degC)." },
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
        a:"Une chaudière composite combine deux sources de chaleur : 1. Un économiseur de gaz d'échappement (ECE) : tubes placés dans la cheminée qui récupèrent la chaleur des gaz d'échappement du moteur principal (350-400 degC) pour produire de la vapeur. 2. Un brûleur auxiliaire : prend le relais quand l'ECE est insuffisant (moteur à faible charge, à l'arrêt, en manœuvre). Avantages économiques : en navigation normale, l'ECE fournit 70-90% des besoins en vapeur GRATUITEMENT (chaleur perdue récupérée). Le brûleur ne consomme du combustible que pour compléter ou suppléer. Économie typique : 150-300 kg/h de HFO économisé par rapport à une chaudière auxiliaire classique. C'est la solution la plus répandue sur les navires modernes à moteur diesel." },
    ],
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
  },
  en:{
    moduleLabel:"ENGINE - BOILERS",
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
      exhaust:{ name:"Exhaust gas economiser (EGE)", desc:"Operates only on main engine exhaust gas heat (350-400 degC). No burner. Free steam production at sea. Zero output when engine stopped. Installed in funnel in series with gases.", pressure:"6-8 bar" },
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
      pressure:{ name:"Service pressure", desc:"Standard auxiliary boiler: 7-10 bar. Steam propulsion boiler: 40-100 bar. EGE economiser: 6-8 bar. Pressure determines steam saturation temperature (e.g. 7 bar → 165 degC, 10 bar → 180 degC)." },
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
        a:"A composite boiler combines two heat sources: 1. Exhaust gas economiser (EGE): tubes placed in the funnel recovering main engine exhaust gas heat (350-400 degC) to produce steam. 2. Auxiliary burner: takes over when EGE is insufficient (engine at low load, stopped, manoeuvring). Economic advantages: in normal navigation, EGE provides 70-90% of steam needs FREE (recovered waste heat). Burner only consumes fuel to supplement or replace. Typical saving: 150-300 kg/h HFO compared to conventional auxiliary boiler. Most common solution on modern diesel-engine vessels." },
    ],
    showAnswer:"Show answer", hideAnswer:"Hide",
  },
  es:{
    moduleLabel:"MÁQUINAS - CALDERAS",
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
      exhaust:{ name:"Caldera de recuperación (EGE)", desc:"Funciona solo con el calor de los gases de escape del motor principal (350-400 degC). Sin quemador. Producción gratuita de vapor en navegación. Sin producción con motor parado.", pressure:"6-8 bar" },
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
      pressure:{ name:"Presión de servicio", desc:"Caldera auxiliar estándar: 7-10 bar. Caldera de propulsión: 40-100 bar. EGE: 6-8 bar. La presión determina la temperatura de saturación (7 bar → 165 degC, 10 bar → 180 degC)." },
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
        a:"Combina: 1. Economizador de gases de escape (EGE): tubos en la chimenea que recuperan el calor (350-400 degC) para producir vapor gratis. 2. Quemador auxiliar: suple cuando el EGE es insuficiente. Ventajas: en navegación normal el EGE proporciona el 70-90% del vapor de forma gratuita. El quemador solo consume combustible para completar. Ahorro típico: 150-300 kg/h de HFO. Solución más extendida en buques modernos." },
    ],
    showAnswer:"Ver corrección", hideAnswer:"Ocultar",
  },
  pt:{
    moduleLabel:"MÁQUINAS - CALDEIRAS",
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
      exhaust:{ name:"Caldeira de recuperação (EGE)", desc:"Funciona apenas com o calor dos gases de escape do motor principal (350-400 degC). Sem queimador. Produção gratuita de vapor em navegação. Sem produção com motor parado.", pressure:"6-8 bar" },
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
      pressure:{ name:"Pressão de serviço", desc:"Caldeira auxiliar padrão: 7-10 bar. Caldeira de propulsão: 40-100 bar. EGE: 6-8 bar. A pressão determina a temperatura de saturação (7 bar → 165 degC, 10 bar → 180 degC)." },
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
        a:"Combina: 1. Economizador de gases de escape (EGE): tubos na chaminé que recuperam calor (350-400 degC) para produzir vapor gratuitamente. 2. Queimador auxiliar: supre quando o EGE é insuficiente. Vantagens: em navegação normal o EGE fornece 70-90% do vapor de forma gratuita. O queimador só consome combustível para completar. Poupança típica: 150-300 kg/h de HFO. Solução mais comum em navios modernos." },
    ],
    showAnswer:"Ver correção", hideAnswer:"Ocultar",
  },
};

// ── SVG 1 - BOILER TYPES ─────────────────────────────────────
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
        <text x="80" y="30" fontSize="7" fill={C.fire} textAnchor="middle" fontFamily="Courier New">GAS 350 degC</text>
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

// ── SVG 2 - COMPONENTS ───────────────────────────────────────
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

// ── SVG 3 - PARAMETERS ───────────────────────────────────────
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

// ── SVG 4 - SAFETIES ─────────────────────────────────────────
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

const ACCIDENT_L1: any = {
  fr: {
    title: "CAS REEL : Explosion de chaudiere lors du redemarrage - Torc (2024, rapport Transport Malta)",
    body: "Le 8 janvier 2024, le petrolier Torc naviguait entre la Grece et l'Italie lorsque les deux chaudieres auxiliaires ont echoue a plusieurs reprises a s'allumer lors d'un changement de combustible (passage du LSMGO au VLSFO). La chaudiere babord a fini par demarrer normalement, mais la chaudiere tribord a continue d'echouer malgre plusieurs tentatives. Alors qu'une nouvelle tentative de demarrage etait en cours et que la chaudiere tribord etait en cycle de purge, le second mecanicien est monte sur la plateforme du bruleur pour l'inspecter. Une explosion violente s'est produite, suivie d'un incendie au sommet de la chaudiere. Le systeme a eau nucleaire (water mist) installe au-dessus de la chaudiere babord s'est declenche et l'equipage a eteint le feu aux extincteurs portables. Le second mecanicien, retrouve inconscient sur la plateforme, est decede de ses blessures malgre les premiers secours.",
    lessons: [
      "Les echecs d'allumage repetes d'un bruleur (flame failure) ne sont jamais anodins : ils indiquent un probleme sous-jacent (temperature de combustible, filtre, reglage) qui doit etre identifie avant toute nouvelle tentative.",
      "Le changement de combustible (LSMGO vers VLSFO) modifie la viscosite et la temperature d'inflammation : une procedure de changeover mal maitrisee est un facteur de risque direct.",
      "Rester a proximite immediate d'un bruleur en cours de purge ou de tentative de reallumage expose le personnel a un risque d'explosion si des gaz non brules se sont accumules dans le foyer.",
      "Toute chaudiere ayant echoue plusieurs fois a s'allumer doit etre isolee et inspectee par une personne qualifiee avant toute nouvelle tentative de demarrage.",
    ],
  },
  en: {
    title: "REAL CASE: Boiler explosion during restart - Torc (2024, Transport Malta report)",
    body: "On 8 January 2024, the tanker Torc was on passage between Greece and Italy when both auxiliary boilers repeatedly failed to fire during a fuel changeover (from LSMGO to VLSFO). The port boiler eventually started normally, but the starboard boiler kept failing despite several attempts. While another start attempt was underway and the starboard boiler was on its purge cycle, the second engineer went up to the burner platform to inspect it. A violent explosion occurred, followed by a fire at the top of the boiler. The water mist system installed above the port boiler activated and the crew extinguished the fire with portable extinguishers. The second engineer, found unconscious on the platform, died of his injuries despite first aid.",
    lessons: [
      "Repeated burner ignition failures (flame failure) are never trivial: they indicate an underlying problem (fuel temperature, filter, setting) that must be identified before any further attempt.",
      "Changing fuel (LSMGO to VLSFO) changes viscosity and ignition temperature: a poorly managed changeover procedure is a direct risk factor.",
      "Standing close to a burner during a purge cycle or re-ignition attempt exposes personnel to an explosion risk if unburnt gases have accumulated in the furnace.",
      "Any boiler that has repeatedly failed to ignite must be isolated and inspected by a qualified person before any further start attempt.",
    ],
  },
  es: {
    title: "CASO REAL: Explosion de caldera durante el rearranque - Torc (2024, informe Transport Malta)",
    body: "El 8 de enero de 2024, el petrolero Torc navegaba entre Grecia e Italia cuando ambas calderas auxiliares fallaron repetidamente al encender durante un cambio de combustible (de LSMGO a VLSFO). La caldera de babor finalmente arranco con normalidad, pero la de estribor siguio fallando pese a varios intentos. Mientras se realizaba otro intento de arranque y la caldera de estribor estaba en ciclo de purga, el segundo maquinista subio a la plataforma del quemador para inspeccionarlo. Se produjo una violenta explosion, seguida de un incendio en la parte superior de la caldera. El sistema de niebla de agua instalado sobre la caldera de babor se activo y la tripulacion apago el fuego con extintores portatiles. El segundo maquinista, hallado inconsciente en la plataforma, fallecio por sus heridas pese a los primeros auxilios.",
    lessons: [
      "Los fallos repetidos de encendido de un quemador (flame failure) nunca son triviales: indican un problema subyacente (temperatura del combustible, filtro, ajuste) que debe identificarse antes de cualquier nuevo intento.",
      "El cambio de combustible (LSMGO a VLSFO) modifica la viscosidad y la temperatura de inflamacion: un procedimiento de cambio mal gestionado es un factor de riesgo directo.",
      "Permanecer cerca de un quemador durante un ciclo de purga o un intento de reencendido expone al personal a un riesgo de explosion si se han acumulado gases no quemados en el hogar.",
      "Toda caldera que haya fallado repetidamente al encender debe aislarse e inspeccionarse por una persona cualificada antes de cualquier nuevo intento de arranque.",
    ],
  },
  pt: {
    title: "CASO REAL: Explosao de caldeira durante o rearranque - Torc (2024, relatorio Transport Malta)",
    body: "Em 8 de janeiro de 2024, o petroleiro Torc navegava entre a Grecia e a Italia quando ambas as caldeiras auxiliares falharam repetidamente ao acender durante uma mudanca de combustivel (de LSMGO para VLSFO). A caldeira de bombordo acabou por arrancar normalmente, mas a de estibordo continuou a falhar apesar de varias tentativas. Enquanto decorria outra tentativa de arranque e a caldeira de estibordo estava em ciclo de purga, o segundo maquinista subiu a plataforma do queimador para o inspecionar. Ocorreu uma explosao violenta, seguida de um incendio no topo da caldeira. O sistema de nevoeiro de agua instalado sobre a caldeira de bombordo ativou-se e a tripulacao apagou o fogo com extintores portateis. O segundo maquinista, encontrado inconsciente na plataforma, morreu devido aos ferimentos apesar dos primeiros socorros.",
    lessons: [
      "As falhas repetidas de ignicao de um queimador (flame failure) nunca sao triviais: indicam um problema subjacente (temperatura do combustivel, filtro, regulacao) que deve ser identificado antes de qualquer nova tentativa.",
      "A mudanca de combustivel (LSMGO para VLSFO) altera a viscosidade e a temperatura de inflamacao: um procedimento de changeover mal gerido e um fator de risco direto.",
      "Permanecer perto de um queimador durante um ciclo de purga ou uma tentativa de reacendimento expoe o pessoal a um risco de explosao se houver gases nao queimados acumulados na fornalha.",
      "Toda caldeira que tenha falhado repetidamente ao acender deve ser isolada e inspecionada por uma pessoa qualificada antes de qualquer nova tentativa de arranque.",
    ],
  },
};

function AccidentCase({ lang }: { lang: string }) {
  const a = ACCIDENT_L1[lang] || ACCIDENT_L1.fr;
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
      {section(t.s1title,<BoilerTypesSVG lang={lang}/>,C.fire)}
      {section(t.s2title,<ComponentsSVG lang={lang}/>,C.steam)}
      {section(t.s3title,<ParametersSVG lang={lang}/>,C.pressure)}
      {section(t.s4title,<SafetiesSVG lang={lang}/>,C.danger)}
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


function getBank(lang: string) {
  const b: any = {
    fr:[
      {q:"Quelle est la différence principale entre une chaudière acuatubulaire et ignitubulaire ?",opts:["Aucune différence, ce sont des synonymes","Acuatubulaire : eau dans les tubes, gaz autour, pression jusqu'à 100 bar. Ignitubulaire : gaz dans les tubes, eau autour, limitée à 18 bar","L'ignitubulaire est toujours plus puissante","La différence ne concerne que la taille du navire"],correct:1,exp:"Acuatubulaire (water tube) : l'eau circule dans les tubes, permettant de hautes pressions (jusqu'à 100 bar). Ignitubulaire (fire tube) : les gaz circulent dans les tubes, plus simple mais limitée à 18 bar. Au-dessus de 18 bar, l'acuatubulaire est obligatoire."},
      {q:"Pourquoi la soupape de sûreté est-elle indispensable sur une chaudière ?",opts:["Elle sert uniquement à mesurer la pression","Elle s'ouvre automatiquement si la pression dépasse le seuil réglé pour éviter une explosion","Elle sert à refroidir la vapeur","Elle est optionnelle sur les petites chaudières"],correct:1,exp:"La soupape de sûreté s'ouvre automatiquement dès que la pression dépasse 10% au-dessus de la pression maximale de service, évitant l'explosion. SOLAS impose au moins 2 soupapes par chaudière avec test périodique obligatoire."},
      {q:"Qu'est-ce qu'une chaudière composite et pourquoi est-elle avantageuse ?",opts:["Une chaudière avec deux brûleurs identiques","Elle combine un économiseur de gaz d'échappement (ECE) et un brûleur auxiliaire, produisant de la vapeur gratuite en navigation","Une chaudière ignitubulaire renforcée","Une chaudière qui fonctionne uniquement au port"],correct:1,exp:"La chaudière composite combine un ECE (récupère la chaleur des gaz d'échappement, vapeur gratuite en navigation) et un brûleur auxiliaire qui prend le relais à l'arrêt. Économie typique : 150-300 kg/h de HFO."},
      {q:"Quelles sont les conséquences d'un bas niveau d'eau dans une chaudière ?",opts:["Aucune consequence si c'est temporaire","Les tubes chauffants exposés sans eau surchauffent, se déforment, avec risque d'explosion","Une amélioration du rendement","Un simple ralentissement de la production de vapeur"],correct:1,exp:"Un niveau trop bas expose les tubes chauffants sans eau : surchauffe, déformation, puis explosion possible (BLEVE). Alarme à 75mm sous le niveau normal, arrêt automatique du brûleur à 150mm."},
      {q:"Quels sont les paramètres clés de qualité de l'eau d'alimentation d'une chaudière ?",opts:["Seule la température compte","pH alcalin (10,5-11,5), dureté nulle, oxygène dissous très faible (< 0,02 mg/l)","L'eau de mer brute convient parfaitement","La couleur de l'eau uniquement"],correct:1,exp:"L'eau d'alimentation doit être alcaline (pH 10,5-11,5), adoucie (dureté 0) et désoxygénée (< 0,02 mg/l d'O2). Le non-respect entraîne corrosion et entartrage des tubes, réduisant l'échange de chaleur."},
      {q:"Comment fonctionne le détecteur de flamme (flame eye) sur un brûleur de chaudière ?",opts:["Il mesure uniquement la température des gaz","Il détecte la présence de la flamme et coupe immédiatement le combustible si elle s'éteint","Il sert à allumer automatiquement le brûleur","Il contrôle la pression de la chaudière"],correct:1,exp:"Le flame eye détecte la flamme par rayonnement UV ou IR. Si elle s'éteint, le combustible est coupé en quelques secondes pour éviter une accumulation de gaz non brûlés, avec verrouillage et purge obligatoire avant redémarrage."},
      {q:"Quelle est la pression de service typique d'une chaudière auxiliaire de navire moderne ?",opts:["1-3 bar","7-10 bar","20-30 bar","40-100 bar"],correct:1,exp:"Une chaudière auxiliaire standard fonctionne à 7-10 bar, avec une vapeur saturée entre 165 et 180 degC. Les chaudières de propulsion vapeur, plus rares, travaillent à 40-100 bar."},
      {q:"Pourquoi l'eau d'alimentation de chaudière doit-elle être désoxygénée ?",opts:["Pour améliorer le goût de l'eau","L'oxygène dissous est très corrosif et provoque une corrosion par piqûres sur les tubes","Pour réduire le coût de traitement","L'oxygène n'a aucun effet sur les métaux"],correct:1,exp:"L'oxygène dissous, surtout à haute température, provoque une corrosion par piqûres (pitting) sur les tubes et le ballon. Méthodes de désoxygénation : dégazeur thermique, injection de sulfite de sodium ou d'hydrazine."},
      {q:"Quels sont les risques liés à un niveau d'eau trop élevé dans le ballon vapeur ?",opts:["Aucun risque particulier","Entraînement d'eau (priming/carry-over) dans la vapeur, pouvant causer un coup d'eau","Une réduction de la pression","Une amélioration de la qualité de la vapeur"],correct:1,exp:"Un niveau trop élevé provoque un entraînement d'eau avec la vapeur (priming/carry-over), causant coups d'eau et dépôts de sels dans la tuyauterie vapeur. Solution : purges de vapeur et réduction du débit d'alimentation."},
      {q:"Comment teste-t-on une soupape de sûreté de chaudière ?",opts:["Elle ne se teste jamais, seulement au remplacement","Test manuel de levée (chaudière sous pression) et test automatique en laissant monter la pression, à fréquence mensuelle/annuelle","Uniquement par calcul théorique","En la démontant systématiquement chaque semaine"],correct:1,exp:"Le test manuel (levée de la tige sous pression >= 75% PMS) est mensuel ; le test automatique complet (montée en pression jusqu'au tarage) est annuel. Toute anomalie de fonctionnement impose le remplacement."},
      {q:"Pourquoi une chaudière de récupération ECE ne fonctionne-t-elle pas à l'arrêt du navire ?",opts:["Elle est volontairement coupée pour économiser l'énergie","Elle ne récupère que la chaleur des gaz d'échappement du moteur principal, absente à l'arrêt","Elle nécessite une intervention manuelle à chaque arrêt","Elle continue de fonctionner normalement à l'arrêt"],correct:1,exp:"L'ECE récupère uniquement la chaleur des gaz d'échappement du moteur principal : sans moteur en marche, pas de gaz chauds, donc pas de vapeur produite. D'où l'intérêt de la chaudière composite (ECE + brûleur)."},
      {q:"Qu'est-ce que le soufflage de suie (soot blowing) et pourquoi est-il nécessaire sur une ECE ?",opts:["Un nettoyage à l'eau froide une fois par an","Injection de vapeur haute pression pour déloger les dépôts de suie qui réduisent l'échange de chaleur","Une procédure d'urgence en cas d'incendie","Un test de la soupape de sûreté"],correct:1,exp:"Les gaz d'échappement déposent progressivement suie et cendres sur les tubes de l'ECE, réduisant le transfert de chaleur. Le soufflage de suie (vapeur HP) élimine ces dépôts, généralement 1 à 2 fois par jour en navigation."},
      {q:"Quel est le rôle du ballon vapeur (steam drum) dans une chaudière ?",opts:["Il sert uniquement de support structurel","Réservoir supérieur où s'accumule la vapeur, contenant le séparateur vapeur/eau ; c'est le point le plus critique de la chaudière","Il chauffe directement le combustible","Il sert de réserve de combustible d'urgence"],correct:1,exp:"Le ballon vapeur est le réservoir supérieur où s'accumule la vapeur produite. Il contient le séparateur vapeur/eau et est équipé du manomètre, de l'indicateur de niveau et de la soupape de sûreté : c'est le point le plus critique de la chaudière."},
      {q:"Pourquoi la pompe d'alimentation en eau d'une chaudière doit-elle être redondante ?",opts:["Ce n'est pas une exigence réelle","Au moins 2 pompes (électrique et à vapeur) sont requises pour assurer la continuité de l'alimentation en cas de panne de l'une d'elles","Une seule pompe électrique suffit toujours","La redondance ne concerne que les gros navires"],correct:1,exp:"Une redondance d'au moins 2 pompes (généralement une électrique et une à vapeur) est obligatoire : en cas de panne de l'une, l'autre assure la continuité de l'alimentation en eau, vitale pour éviter un bas niveau dangereux."},
      {q:"Quelle est la différence entre l'alarme haute pression (pressostat) et la soupape de sûreté ?",opts:["Elles ont exactement la même fonction","Le pressostat déclenche une alarme et réduit la puissance du brûleur avant que la pression n'atteigne le seuil d'ouverture de la soupape, dernier recours mécanique","La soupape de sûreté se déclenche toujours en premier","Le pressostat remplace complètement la soupape de sûreté"],correct:1,exp:"Le pressostat de haute pression est une protection électronique qui déclenche une alarme et réduit la puissance du brûleur avant que la pression n'atteigne le seuil d'ouverture de la soupape de sûreté, laquelle reste le dernier recours purement mécanique."},
    ],
    en:[
      {q:"What is the main difference between a water tube and fire tube boiler?",opts:["No difference, they are synonyms","Water tube: water inside tubes, gas around, pressure up to 100 bar. Fire tube: gas inside tubes, water around, limited to 18 bar","Fire tube is always more powerful","The difference only concerns vessel size"],correct:1,exp:"Water tube: water circulates inside the tubes, allowing high pressures (up to 100 bar). Fire tube: gas circulates inside the tubes, simpler but limited to 18 bar. Above 18 bar, water tube is mandatory."},
      {q:"Why is the safety valve indispensable on a boiler?",opts:["It only measures pressure","It automatically opens if pressure exceeds the set threshold to prevent an explosion","It cools the steam","It is optional on small boilers"],correct:1,exp:"The safety valve automatically opens once pressure exceeds 10% above maximum allowable working pressure, preventing explosion. SOLAS requires at least 2 safety valves per boiler with mandatory periodic testing."},
      {q:"What is a composite boiler and why is it advantageous?",opts:["A boiler with two identical burners","It combines an exhaust gas economiser (EGE) and an auxiliary burner, producing free steam at sea","A reinforced fire tube boiler","A boiler that only operates in port"],correct:1,exp:"A composite boiler combines an EGE (recovers exhaust heat, free steam at sea) and an auxiliary burner that takes over when stopped. Typical saving: 150-300 kg/h of HFO."},
      {q:"What are the consequences of low water level in a boiler?",opts:["No consequence if temporary","Heating tubes exposed without water overheat, deform, with explosion risk","An improvement in efficiency","A simple slowdown in steam production"],correct:1,exp:"Too low a level exposes heating tubes without water: overheating, deformation, then possible explosion (BLEVE). Alarm at 75mm below normal level, automatic burner shutdown at 150mm."},
      {q:"What are the key boiler feed water quality parameters?",opts:["Only temperature matters","Alkaline pH (10.5-11.5), zero hardness, very low dissolved oxygen (< 0.02 mg/l)","Raw seawater is perfectly suitable","Only the colour of the water"],correct:1,exp:"Feed water must be alkaline (pH 10.5-11.5), softened (zero hardness) and de-oxygenated (< 0.02 mg/l O2). Non-compliance causes corrosion and scaling of tubes, reducing heat exchange."},
      {q:"How does the flame detector (flame eye) work on a boiler burner?",opts:["It only measures gas temperature","It detects flame presence and immediately cuts fuel if it extinguishes","It automatically ignites the burner","It controls boiler pressure"],correct:1,exp:"The flame eye detects flame via UV or IR radiation. If it extinguishes, fuel is cut within seconds to prevent unburnt gas accumulation, with lockout and mandatory purge before restart."},
      {q:"What is the typical service pressure of a modern vessel auxiliary boiler?",opts:["1-3 bar","7-10 bar","20-30 bar","40-100 bar"],correct:1,exp:"A standard auxiliary boiler operates at 7-10 bar, with saturated steam between 165 and 180 degC. Steam propulsion boilers, rarer today, operate at 40-100 bar."},
      {q:"Why must boiler feed water be de-oxygenated?",opts:["To improve the taste of the water","Dissolved oxygen is very corrosive and causes pitting corrosion on tubes","To reduce treatment cost","Oxygen has no effect on metals"],correct:1,exp:"Dissolved oxygen, especially at high temperature, causes pitting corrosion on tubes and drum. De-oxygenation methods: thermal deaerator, sodium sulphite or hydrazine injection."},
      {q:"What are the risks of water level too high in the steam drum?",opts:["No particular risk","Water carry-over (priming) into the steam, which can cause water slug","A reduction in pressure","Improved steam quality"],correct:1,exp:"A level that is too high causes water carry-over with the steam (priming), causing water slug and salt deposits in steam piping. Solution: steam drains and reduced feed flow."},
      {q:"How is a boiler safety valve tested?",opts:["It is never tested, only replaced","Manual lift test (boiler under pressure) and automatic test by letting pressure rise, monthly/annual frequency","Only by theoretical calculation","By systematically dismantling it every week"],correct:1,exp:"The manual test (lifting the stem under pressure >= 75% MAWP) is monthly; the full automatic test (raising pressure to set point) is annual. Any malfunction requires replacement."},
      {q:"Why doesn't an EGE recovery boiler work when the vessel is stopped?",opts:["It is deliberately shut down to save energy","It only recovers heat from main engine exhaust gas, absent when stopped","It requires manual intervention at every stop","It continues to operate normally when stopped"],correct:1,exp:"The EGE only recovers heat from the main engine's exhaust gas: with no engine running, there are no hot gases, so no steam is produced. Hence the value of the composite boiler (EGE + burner)."},
      {q:"What is soot blowing and why is it necessary on an EGE?",opts:["A cold water wash once a year","High-pressure steam injection to dislodge soot deposits that reduce heat exchange","An emergency fire procedure","A safety valve test"],correct:1,exp:"Exhaust gases progressively deposit soot and ash on the EGE tubes, reducing heat transfer. Soot blowing (HP steam) removes these deposits, generally once or twice a day at sea."},
      {q:"What is the role of the steam drum in a boiler?",opts:["It only serves as structural support","Upper reservoir where steam accumulates, containing the steam/water separator; it is the boiler's most critical point","It directly heats the fuel","It serves as an emergency fuel reserve"],correct:1,exp:"The steam drum is the upper reservoir where produced steam accumulates. It contains the steam/water separator and is fitted with the pressure gauge, level indicator and safety valve: it is the most critical point of the boiler."},
      {q:"Why must a boiler's feed water pump be redundant?",opts:["This is not a real requirement","At least 2 pumps (electric and steam-driven) are required to ensure continuous feed if one fails","A single electric pump is always sufficient","Redundancy only applies to large vessels"],correct:1,exp:"Redundancy of at least 2 pumps (typically one electric, one steam-driven) is mandatory: if one fails, the other ensures continuous water feed, vital to avoid a dangerous low level."},
      {q:"What is the difference between the high-pressure alarm (pressure switch) and the safety valve?",opts:["They have exactly the same function","The pressure switch triggers an alarm and reduces burner power before pressure reaches the safety valve's opening threshold, the last mechanical resort","The safety valve always trips first","The pressure switch completely replaces the safety valve"],correct:1,exp:"The high-pressure switch is an electronic protection that triggers an alarm and reduces burner power before pressure reaches the safety valve's opening threshold, which remains the last purely mechanical resort."},
    ],
    es:[
      {q:"¿Cuál es la diferencia principal entre una caldera acuatubular y una pirotubular?",opts:["Ninguna diferencia, son sinonimos","Acuatubular: agua dentro de los tubos, gas alrededor, presion hasta 100 bar. Pirotubular: gas dentro de los tubos, agua alrededor, limitada a 18 bar","La pirotubular siempre es mas potente","La diferencia solo afecta al tamano del buque"],correct:1,exp:"Acuatubular: el agua circula dentro de los tubos, permitiendo altas presiones (hasta 100 bar). Pirotubular: el gas circula dentro de los tubos, mas simple pero limitada a 18 bar. Por encima de 18 bar, la acuatubular es obligatoria."},
      {q:"¿Por que la valvula de seguridad es indispensable en una caldera?",opts:["Solo sirve para medir la presion","Se abre automaticamente si la presion supera el umbral ajustado para evitar una explosion","Sirve para enfriar el vapor","Es opcional en calderas pequenas"],correct:1,exp:"La valvula de seguridad se abre automaticamente en cuanto la presion supera el 10% sobre la presion maxima de servicio, evitando la explosion. SOLAS exige al menos 2 valvulas por caldera con prueba periodica obligatoria."},
      {q:"¿Que es una caldera compuesta y por que es ventajosa?",opts:["Una caldera con dos quemadores identicos","Combina un economizador de gases de escape (EGE) y un quemador auxiliar, produciendo vapor gratis en navegacion","Una caldera pirotubular reforzada","Una caldera que solo funciona en puerto"],correct:1,exp:"La caldera compuesta combina un EGE (recupera el calor de los gases de escape, vapor gratis en navegacion) y un quemador auxiliar que suple en parada. Ahorro tipico: 150-300 kg/h de HFO."},
      {q:"¿Cuales son las consecuencias de un nivel de agua bajo en una caldera?",opts:["Ninguna consecuencia si es temporal","Los tubos expuestos sin agua se sobrecalientan, se deforman, con riesgo de explosion","Una mejora del rendimiento","Una simple ralentizacion de la produccion de vapor"],correct:1,exp:"Un nivel demasiado bajo expone los tubos sin agua: sobrecalentamiento, deformacion, y posible explosion (BLEVE). Alarma a 75mm bajo el nivel normal, parada automatica del quemador a 150mm."},
      {q:"¿Cuales son los parametros clave de calidad del agua de alimentacion de una caldera?",opts:["Solo importa la temperatura","pH alcalino (10,5-11,5), dureza nula, oxigeno disuelto muy bajo (< 0,02 mg/l)","El agua de mar bruta es perfectamente adecuada","Solo el color del agua"],correct:1,exp:"El agua de alimentacion debe ser alcalina (pH 10,5-11,5), ablandada (dureza 0) y desoxigenada (< 0,02 mg/l de O2). El incumplimiento provoca corrosion e incrustaciones en los tubos."},
      {q:"¿Como funciona el detector de llama (flame eye) en un quemador de caldera?",opts:["Solo mide la temperatura de los gases","Detecta la presencia de llama y corta inmediatamente el combustible si se apaga","Sirve para encender automaticamente el quemador","Controla la presion de la caldera"],correct:1,exp:"El flame eye detecta la llama por radiacion UV o IR. Si se apaga, el combustible se corta en segundos para evitar acumulacion de gases, con bloqueo y purga obligatoria antes de rearrancar."},
      {q:"¿Cual es la presion de servicio tipica de una caldera auxiliar de buque moderno?",opts:["1-3 bar","7-10 bar","20-30 bar","40-100 bar"],correct:1,exp:"Una caldera auxiliar estandar funciona a 7-10 bar, con vapor saturado entre 165 y 180 degC. Las calderas de propulsion, mas raras hoy, trabajan a 40-100 bar."},
      {q:"¿Por que el agua de alimentacion de caldera debe ser desoxigenada?",opts:["Para mejorar el sabor del agua","El oxigeno disuelto es muy corrosivo y provoca corrosion por picaduras en los tubos","Para reducir el coste de tratamiento","El oxigeno no tiene efecto sobre los metales"],correct:1,exp:"El oxigeno disuelto, sobre todo a alta temperatura, provoca corrosion por picaduras en tubos y balon. Metodos de desoxigenacion: desaireador termico, inyeccion de sulfito sodico o hidrazina."},
      {q:"¿Cuales son los riesgos de un nivel de agua demasiado alto en el balon de vapor?",opts:["Ningun riesgo particular","Arrastre de agua (priming/carry-over) con el vapor, pudiendo causar golpe de agua","Una reduccion de la presion","Una mejora de la calidad del vapor"],correct:1,exp:"Un nivel demasiado alto provoca arrastre de agua con el vapor (priming/carry-over), causando golpes de agua y depositos de sales en la tuberia de vapor. Solucion: purgas de vapor y reduccion del caudal de alimentacion."},
      {q:"¿Como se prueba una valvula de seguridad de caldera?",opts:["Nunca se prueba, solo se sustituye","Prueba manual de levantamiento (caldera bajo presion) y prueba automatica dejando subir la presion, con frecuencia mensual/anual","Solo mediante calculo teorico","Desmontandola sistematicamente cada semana"],correct:1,exp:"La prueba manual (levantar la varilla bajo presion >= 75% PMS) es mensual; la prueba automatica completa (subir presion hasta el tarado) es anual. Cualquier anomalia obliga a la sustitucion."},
      {q:"¿Por que una caldera de recuperacion EGE no funciona con el buque parado?",opts:["Se apaga voluntariamente para ahorrar energia","Solo recupera el calor de los gases de escape del motor principal, ausente en parada","Requiere intervencion manual en cada parada","Sigue funcionando normalmente en parada"],correct:1,exp:"El EGE solo recupera el calor de los gases de escape del motor principal: sin motor en marcha, no hay gases calientes, por tanto no hay vapor producido. De ahi el interes de la caldera compuesta (EGE + quemador)."},
      {q:"¿Que es el soplado de hollin (soot blowing) y por que es necesario en un EGE?",opts:["Una limpieza con agua fria una vez al ano","Inyeccion de vapor a alta presion para eliminar depositos de hollin que reducen el intercambio de calor","Un procedimiento de emergencia en caso de incendio","Una prueba de la valvula de seguridad"],correct:1,exp:"Los gases de escape depositan progresivamente hollin y cenizas en los tubos del EGE, reduciendo la transferencia de calor. El soplado de hollin (vapor de alta presion) elimina estos depositos, generalmente 1-2 veces al dia en navegacion."},
      {q:"¿Cual es la funcion del balon de vapor (steam drum) en una caldera?",opts:["Solo sirve de soporte estructural","Deposito superior donde se acumula el vapor, que contiene el separador vapor/agua; es el punto mas critico de la caldera","Calienta directamente el combustible","Sirve como reserva de combustible de emergencia"],correct:1,exp:"El balon de vapor es el deposito superior donde se acumula el vapor producido. Contiene el separador vapor/agua y esta equipado con el manometro, el indicador de nivel y la valvula de seguridad: es el punto mas critico de la caldera."},
      {q:"¿Por que la bomba de alimentacion de agua de una caldera debe ser redundante?",opts:["No es una exigencia real","Se requieren al menos 2 bombas (electrica y de vapor) para garantizar la continuidad de la alimentacion si una falla","Una sola bomba electrica siempre es suficiente","La redundancia solo se aplica a buques grandes"],correct:1,exp:"Es obligatoria una redundancia de al menos 2 bombas (normalmente una electrica y una de vapor): si una falla, la otra garantiza la continuidad de la alimentacion de agua, vital para evitar un nivel bajo peligroso."},
      {q:"¿Cual es la diferencia entre la alarma de alta presion (presostato) y la valvula de seguridad?",opts:["Tienen exactamente la misma funcion","El presostato activa una alarma y reduce la potencia del quemador antes de que la presion alcance el umbral de apertura de la valvula, ultimo recurso mecanico","La valvula de seguridad siempre actua primero","El presostato sustituye completamente a la valvula de seguridad"],correct:1,exp:"El presostato de alta presion es una proteccion electronica que activa una alarma y reduce la potencia del quemador antes de que la presion alcance el umbral de apertura de la valvula de seguridad, que sigue siendo el ultimo recurso puramente mecanico."},
    ],
    pt:[
      {q:"Qual e a diferenca principal entre uma caldeira aquatubular e uma pirotubular?",opts:["Nenhuma diferenca, sao sinonimos","Aquatubular: agua dentro dos tubos, gas a volta, pressao ate 100 bar. Pirotubular: gas dentro dos tubos, agua a volta, limitada a 18 bar","A pirotubular e sempre mais potente","A diferenca so diz respeito ao tamanho do navio"],correct:1,exp:"Aquatubular: a agua circula dentro dos tubos, permitindo altas pressoes (ate 100 bar). Pirotubular: o gas circula dentro dos tubos, mais simples mas limitada a 18 bar. Acima de 18 bar, a aquatubular e obrigatoria."},
      {q:"Por que a valvula de seguranca e indispensavel numa caldeira?",opts:["So serve para medir a pressao","Abre automaticamente se a pressao ultrapassar o limiar regulado para evitar uma explosao","Serve para arrefecer o vapor","E opcional em caldeiras pequenas"],correct:1,exp:"A valvula de seguranca abre automaticamente assim que a pressao ultrapassa 10% acima da pressao maxima de servico, evitando a explosao. O SOLAS exige pelo menos 2 valvulas por caldeira com teste periodico obrigatorio."},
      {q:"O que e uma caldeira composta e por que e vantajosa?",opts:["Uma caldeira com dois queimadores identicos","Combina um economizador de gases de escape (EGE) e um queimador auxiliar, produzindo vapor gratis em navegacao","Uma caldeira pirotubular reforcada","Uma caldeira que so funciona no porto"],correct:1,exp:"A caldeira composta combina um EGE (recupera o calor dos gases de escape, vapor gratis em navegacao) e um queimador auxiliar que assume em paragem. Poupanca tipica: 150-300 kg/h de HFO."},
      {q:"Quais sao as consequencias de um nivel de agua baixo numa caldeira?",opts:["Nenhuma consequencia se for temporario","Os tubos expostos sem agua sobreaquecem, deformam-se, com risco de explosao","Uma melhoria do rendimento","Um simples abrandamento da producao de vapor"],correct:1,exp:"Um nivel demasiado baixo expoe os tubos sem agua: sobreaquecimento, deformacao, e possivel explosao (BLEVE). Alarme a 75mm abaixo do nivel normal, paragem automatica do queimador a 150mm."},
      {q:"Quais sao os parametros chave de qualidade da agua de alimentacao de uma caldeira?",opts:["So a temperatura importa","pH alcalino (10,5-11,5), dureza nula, oxigenio dissolvido muito baixo (< 0,02 mg/l)","A agua do mar bruta e perfeitamente adequada","Apenas a cor da agua"],correct:1,exp:"A agua de alimentacao deve ser alcalina (pH 10,5-11,5), amolecida (dureza 0) e desoxigenada (< 0,02 mg/l de O2). O incumprimento provoca corrosao e incrustacoes nos tubos."},
      {q:"Como funciona o detetor de chama (flame eye) num queimador de caldeira?",opts:["So mede a temperatura dos gases","Deteta a presenca de chama e corta imediatamente o combustivel se se apagar","Serve para acender automaticamente o queimador","Controla a pressao da caldeira"],correct:1,exp:"O flame eye deteta a chama por radiacao UV ou IR. Se se apaga, o combustivel e cortado em segundos para evitar acumulacao de gases, com bloqueio e purga obrigatoria antes de rearrancar."},
      {q:"Qual e a pressao de servico tipica de uma caldeira auxiliar de navio moderno?",opts:["1-3 bar","7-10 bar","20-30 bar","40-100 bar"],correct:1,exp:"Uma caldeira auxiliar padrao funciona a 7-10 bar, com vapor saturado entre 165 e 180 degC. As caldeiras de propulsao, mais raras hoje, trabalham a 40-100 bar."},
      {q:"Por que a agua de alimentacao da caldeira deve ser desoxigenada?",opts:["Para melhorar o sabor da agua","O oxigenio dissolvido e muito corrosivo e provoca corrosao por picadas nos tubos","Para reduzir o custo de tratamento","O oxigenio nao tem efeito sobre os metais"],correct:1,exp:"O oxigenio dissolvido, sobretudo a alta temperatura, provoca corrosao por picadas nos tubos e no balao. Metodos de desoxigenacao: desaerador termico, injecao de sulfito de sodio ou hidrazina."},
      {q:"Quais sao os riscos de um nivel de agua demasiado alto no balao de vapor?",opts:["Nenhum risco particular","Arrastamento de agua (priming/carry-over) com o vapor, podendo causar golpe de agua","Uma reducao da pressao","Uma melhoria da qualidade do vapor"],correct:1,exp:"Um nivel demasiado alto provoca arrastamento de agua com o vapor (priming/carry-over), causando golpes de agua e depositos de sais na tubagem de vapor. Solucao: purgas de vapor e reducao do caudal de alimentacao."},
      {q:"Como se testa uma valvula de seguranca de caldeira?",opts:["Nunca se testa, so se substitui","Teste manual de levantamento (caldeira sob pressao) e teste automatico deixando subir a pressao, com frequencia mensal/anual","Apenas por calculo teorico","Desmontando-a sistematicamente todas as semanas"],correct:1,exp:"O teste manual (levantar a haste sob pressao >= 75% PMS) e mensal; o teste automatico completo (subir a pressao ate ao taramento) e anual. Qualquer anomalia obriga a substituicao."},
      {q:"Por que uma caldeira de recuperacao EGE nao funciona com o navio parado?",opts:["E desligada voluntariamente para poupar energia","So recupera o calor dos gases de escape do motor principal, ausente em paragem","Requer intervencao manual em cada paragem","Continua a funcionar normalmente em paragem"],correct:1,exp:"O EGE so recupera o calor dos gases de escape do motor principal: sem motor em funcionamento, nao ha gases quentes, logo nao ha vapor produzido. Da o interesse da caldeira composta (EGE + queimador)."},
      {q:"O que e o sopro de fuligem (soot blowing) e por que e necessario num EGE?",opts:["Uma lavagem com agua fria uma vez por ano","Injecao de vapor a alta pressao para eliminar depositos de fuligem que reduzem a troca de calor","Um procedimento de emergencia em caso de incendio","Um teste da valvula de seguranca"],correct:1,exp:"Os gases de escape depositam progressivamente fuligem e cinzas nos tubos do EGE, reduzindo a transferencia de calor. O sopro de fuligem (vapor de alta pressao) elimina estes depositos, geralmente 1-2 vezes por dia em navegacao."},
      {q:"Qual e a funcao do balao de vapor (steam drum) numa caldeira?",opts:["So serve de suporte estrutural","Reservatorio superior onde se acumula o vapor, contendo o separador vapor/agua; e o ponto mais critico da caldeira","Aquece diretamente o combustivel","Serve como reserva de combustivel de emergencia"],correct:1,exp:"O balao de vapor e o reservatorio superior onde se acumula o vapor produzido. Contem o separador vapor/agua e esta equipado com o manometro, o indicador de nivel e a valvula de seguranca: e o ponto mais critico da caldeira."},
      {q:"Por que a bomba de alimentacao de agua de uma caldeira deve ser redundante?",opts:["Nao e uma exigencia real","Sao necessarias pelo menos 2 bombas (eletrica e a vapor) para garantir a continuidade da alimentacao se uma falhar","Uma unica bomba eletrica e sempre suficiente","A redundancia so se aplica a navios grandes"],correct:1,exp:"E obrigatoria uma redundancia de pelo menos 2 bombas (normalmente uma eletrica e uma a vapor): se uma falhar, a outra garante a continuidade da alimentacao de agua, vital para evitar um nivel baixo perigoso."},
      {q:"Qual e a diferenca entre o alarme de alta pressao (pressostato) e a valvula de seguranca?",opts:["Tem exatamente a mesma funcao","O pressostato aciona um alarme e reduz a potencia do queimador antes de a pressao atingir o limiar de abertura da valvula, ultimo recurso mecanico","A valvula de seguranca atua sempre primeiro","O pressostato substitui completamente a valvula de seguranca"],correct:1,exp:"O pressostato de alta pressao e uma protecao eletronica que aciona um alarme e reduz a potencia do queimador antes de a pressao atingir o limiar de abertura da valvula de seguranca, que continua a ser o ultimo recurso puramente mecanico."},
    ],
  };
  return b[lang]||b.fr;
}

function getQuiz(lang: string) {
  const q: any = {
    fr:[
      {q:"Dans une chaudière acuatubulaire, où circule l'eau ?",opts:["Autour des tubes","À l'intérieur des tubes","Dans le foyer","Dans la cheminée"],correct:1,exp:"Dans une chaudière acuatubulaire (water tube), l'eau circule À L'INTÉRIEUR des tubes, et les gaz chauds passent AUTOUR. C'est l'inverse d'une chaudière ignitubulaire (fire tube). L'acuatubulaire permet des pressions bien plus élevées (jusqu'à 100 bar)."},
      {q:"À quelle pression est réglée la soupape de sûreté d'une chaudière par rapport à la pression de service maximale (PMS) ?",opts:["Exactement à la PMS","5% au-dessus de la PMS","10% au-dessus de la PMS","50% au-dessus de la PMS"],correct:2,exp:"La soupape de sûreté est réglée à 10% au-dessus de la pression maximale de service (PMS). Exemple : pour une chaudière à 7 bar de PMS, la soupape s'ouvre à 7,7 bar. Cela laisse une marge de sécurité sans déclencher la soupape lors des petites variations de pression normales."},
      {q:"Quelle est la pression de service typique d'une chaudière auxiliaire de navire moderne ?",opts:["1-3 bar","7-10 bar","20-30 bar","40-100 bar"],correct:1,exp:"La chaudière auxiliaire standard d'un navire moderne fonctionne à 7-10 bar. À 7 bar, la vapeur est à 165 degC ; à 10 bar, elle est à 180 degC. Les chaudières de propulsion vapeur (navires anciens ou GNL) travaillent à 40-100 bar."},
      {q:"Qu'est-ce qu'une chaudière composite ?",opts:["Une chaudière avec deux brûleurs","Une chaudière combinant un économiseur ECE et un brûleur auxiliaire","Une chaudière acuatubulaire et ignitubulaire en parallèle","Une chaudière fonctionnant au HFO et au MDO"],correct:1,exp:"Une chaudière composite combine un économiseur de gaz d'échappement (ECE) et un brûleur auxiliaire. En navigation, l'ECE récupère gratuitement la chaleur des gaz d'échappement du moteur principal. Le brûleur prend le relais à l'arrêt ou quand la demande dépasse la production ECE. C'est la solution la plus économique."},
      {q:"Que se passe-t-il automatiquement quand le niveau d'eau dans une chaudière descend à 150mm sous le niveau normal ?",opts:["Une alarme sonore se déclenche","Le brûleur s'arrête automatiquement","La soupape de sûreté s'ouvre","La pompe d'alimentation démarre"],correct:1,exp:"À 150mm sous le niveau normal, le brûleur s'arrête automatiquement (safety shutdown) pour éviter que les tubes chauffants soient exposés à sec, ce qui provoquerait une surchauffe et risquerait une explosion. L'alarme de bas niveau se déclenche à 75mm - stade précoce pour augmenter l'alimentation avant l'arrêt."},
    ],
    en:[
      {q:"In a water tube boiler, where does water circulate?",opts:["Around the tubes","Inside the tubes","In the furnace","In the funnel"],correct:1,exp:"In a water tube boiler, water circulates INSIDE the tubes, and hot gases pass AROUND them. The opposite of a fire tube boiler. Water tube allows much higher pressures (up to 100 bar)."},
      {q:"At what pressure is a boiler safety valve set relative to maximum allowable working pressure (MAWP)?",opts:["Exactly at MAWP","5% above MAWP","10% above MAWP","50% above MAWP"],correct:2,exp:"Safety valve set at 10% above MAWP. Example: 7 bar MAWP boiler → valve opens at 7.7 bar. This provides safety margin without triggering on normal small pressure variations."},
      {q:"What is the typical service pressure of a modern vessel auxiliary boiler?",opts:["1-3 bar","7-10 bar","20-30 bar","40-100 bar"],correct:1,exp:"Standard auxiliary boiler operates at 7-10 bar. At 7 bar, steam is 165 degC; at 10 bar, 180 degC. Steam propulsion boilers (old vessels or LNG) operate at 40-100 bar."},
      {q:"What is a composite boiler?",opts:["A boiler with two burners","A boiler combining EGE economiser and auxiliary burner","Parallel water tube and fire tube boiler","A boiler running on HFO and MDO"],correct:1,exp:"A composite boiler combines exhaust gas economiser (EGE) and auxiliary burner. At sea, EGE recovers main engine exhaust heat for free. Burner takes over when stopped or demand exceeds EGE output. Most economical solution."},
      {q:"What happens automatically when boiler water level drops to 150mm below normal?",opts:["Audible alarm triggers","Burner automatically shuts down","Safety valve opens","Feed pump starts"],correct:1,exp:"At 150mm below normal, burner automatically shuts down (safety shutdown) to prevent heating tubes being exposed dry, which would cause overheating and explosion risk. Low level alarm triggers at 75mm - early stage to increase feed before shutdown."},
    ],
    es:[
      {q:"En una caldera acuatubular, ¿dónde circula el agua?",opts:["Alrededor de los tubos","Por el interior de los tubos","En el hogar","En la chimenea"],correct:1,exp:"En una caldera acuatubular (water tube), el agua circula POR EL INTERIOR de los tubos y los gases calientes pasan ALREDEDOR. Lo contrario de una pirotubular. La acuatubular permite presiones mucho más altas (hasta 100 bar)."},
      {q:"¿A qué presión se ajusta la válvula de seguridad respecto a la PMS?",opts:["Exactamente a la PMS","5% sobre la PMS","10% sobre la PMS","50% sobre la PMS"],correct:2,exp:"La válvula se ajusta al 10% sobre la PMS. Ejemplo: caldera de 7 bar → válvula se abre a 7,7 bar. Proporciona margen de seguridad sin dispararse en variaciones normales."},
      {q:"¿Cuál es la presión de servicio típica de una caldera auxiliar de buque moderno?",opts:["1-3 bar","7-10 bar","20-30 bar","40-100 bar"],correct:1,exp:"La caldera auxiliar estándar funciona a 7-10 bar. A 7 bar el vapor está a 165 degC; a 10 bar a 180 degC. Calderas de propulsión: 40-100 bar."},
      {q:"¿Qué es una caldera compuesta?",opts:["Una caldera con dos quemadores","Una caldera que combina economizador EGE y quemador auxiliar","Caldera acuatubular y pirotubular en paralelo","Una caldera que funciona con HFO y MDO"],correct:1,exp:"Una caldera compuesta combina economizador de gases de escape (EGE) y quemador auxiliar. En navegación el EGE recupera calor gratis. El quemador suple en parada. Solución más económica."},
      {q:"¿Qué ocurre automáticamente cuando el nivel de agua baja 150mm bajo el normal?",opts:["Suena una alarma","El quemador se para automáticamente","La válvula de seguridad se abre","La bomba de alimentación arranca"],correct:1,exp:"A 150mm, el quemador se para automáticamente para evitar que los tubos queden expuestos en seco → sobrecalentamiento → riesgo de explosión. La alarma de bajo nivel actúa a 75mm."},
    ],
    pt:[
      {q:"Numa caldeira aquatubular, onde circula a água?",opts:["À volta dos tubos","No interior dos tubos","No forno","Na chaminé"],correct:1,exp:"Numa caldeira aquatubular, a água circula NO INTERIOR dos tubos e os gases quentes passam À VOLTA. O contrário de uma pirotubular. A aquatubular permite pressões muito mais altas (até 100 bar)."},
      {q:"A que pressão está regulada a válvula de segurança em relação à PMS?",opts:["Exatamente na PMS","5% acima da PMS","10% acima da PMS","50% acima da PMS"],correct:2,exp:"A válvula está regulada a 10% acima da PMS. Exemplo: caldeira de 7 bar → válvula abre a 7,7 bar. Proporciona margem de segurança sem disparar em variações normais."},
      {q:"Qual é a pressão de serviço típica de uma caldeira auxiliar de navio moderno?",opts:["1-3 bar","7-10 bar","20-30 bar","40-100 bar"],correct:1,exp:"A caldeira auxiliar padrão funciona a 7-10 bar. A 7 bar o vapor está a 165 degC; a 10 bar a 180 degC. Caldeiras de propulsão: 40-100 bar."},
      {q:"O que é uma caldeira composta?",opts:["Uma caldeira com dois queimadores","Uma caldeira que combina economizador EGE e queimador auxiliar","Caldeira aquatubular e pirotubular em paralelo","Uma caldeira que funciona com HFO e MDO"],correct:1,exp:"Uma caldeira composta combina economizador de gases de escape (EGE) e queimador auxiliar. Em navegação o EGE recupera calor grátis. O queimador supre em paragem. Solução mais económica."},
      {q:"O que acontece automaticamente quando o nível de água baixa 150mm abaixo do normal?",opts:["Soa um alarme","O queimador para automaticamente","A válvula de segurança abre","A bomba de alimentação arranca"],correct:1,exp:"A 150mm, o queimador para automaticamente para evitar que os tubos fiquem expostos a seco → sobreaquecimento → risco de explosão. O alarme de nível baixo atua a 75mm."},
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
          <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New",marginBottom:12,padding:12,borderRadius:10,background:"rgba(10,22,40,0.8)",border:`1px solid #f9731622`}}>{shuffledBank[bankCur].q}</div>
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
  const [phase,setPhase]=useState<"content"|"quiz">("content");
  const [quizDone,setQuizDone]=useState(false);
  const progress=phase==="content"?50:quizDone?100:85;
  const backLabel=lang==="fr"?"◀ Retour":lang==="en"?"◀ Back":lang==="es"?"◀ Volver":"◀ Voltar";
  const moduleFull=lang==="fr"?"Module E3 — Chaudières":lang==="en"?"Module E3 — Boilers":lang==="es"?"Módulo E3 — Calderas":"Módulo E3 — Caldeiras";
  const lessonOf=lang==="fr"?"Leçon 1/6":lang==="en"?"Lesson 1/6":lang==="es"?"Lección 1/6":"Lição 1/6";
  const badgeText=lang==="fr"?`🔥 ${moduleFull} · Leçon 1/6 · ⭐ Premium · 200 XP`:lang==="en"?`🔥 ${moduleFull} · Lesson 1/6 · ⭐ Premium · 200 XP`:lang==="es"?`🔥 ${moduleFull} · Lección 1/6 · ⭐ Premium · 200 XP`:`🔥 ${moduleFull} · Lição 1/6 · ⭐ Premium · 200 XP`;
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
