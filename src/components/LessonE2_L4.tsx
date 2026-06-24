// LessonE2_L4 — Compresseurs & Air comprimé | PART 1
import { useState } from "react";

const C = {
  air:"#4da6ff", comp:"#e8b94f", pipe:"#94a3b8",
  danger:"#f97316", pressure:"#c084fc", safe:"#6dbf8a",
  gold:"#c9922a", gold2:"#e8b94f",
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  red:"#e74c3c",
};

const T: any = {
  fr:{
    moduleLabel:"MACHINE — AUXILIAIRES",
    lessonTitle:"Compresseurs & Air comprimé",
    intro:"L'air comprimé est vital à bord : il sert au démarrage du moteur principal, aux commandes pneumatiques, aux sifflets, aux outils et à la purge des circuits. Un navire possède généralement 2 à 3 compresseurs d'air de démarrage et des bouteilles d'air à haute pression.",
    tabs:["📖 Contenu","✏️ Pratique","📚 Banque Q.","🎯 Quiz"],
    s1title:"🔧 Types de compresseurs marins",
    s1hint:"👆 Tapez un type pour voir ses caractéristiques",
    s2title:"📊 Circuit d'air comprimé à bord",
    s2hint:"👆 Tapez un composant pour sa description",
    s3title:"⚠️ Sécurités & Défauts courants",
    s3hint:"👆 Tapez un défaut pour les causes et remèdes",
    s4title:"🔩 Maintenance compresseur",
    s4hint:"👆 Tapez une opération de maintenance",
    keypoints:"Points clés",
    kp:[
      "Les bouteilles d'air de démarrage sont chargées à 25-30 bar pour le moteur principal",
      "Un compresseur à pistons est refroidi par eau ou air — le refroidissement interétage est essentiel",
      "L'humidité dans l'air comprimé est dangereuse — purgeurs et sécheurs sont obligatoires",
      "La soupape de sûreté est réglée à 10% au-dessus de la pression de service",
      "Un compresseur ne doit jamais tourner sans huile ni refroidissement — dégâts immédiats",
    ],
    compTypes:{
      piston:{ name:"Compresseur à pistons (alternatif)", desc:"Le plus courant à bord. Un ou plusieurs pistons compriment l'air en plusieurs étages. Refroidissement interétage obligatoire (réfrigérant intermédiaire). Pression de sortie : 25-30 bar (démarrage) ou 6-7 bar (service). Avantages : fiable, haute pression, facile à entretenir." },
      screw:{ name:"Compresseur à vis", desc:"Deux rotors hélicoïdaux compriment l'air en continu. Débit élevé, faibles vibrations, silencieux. Pression limitée (jusqu'à 13 bar). Utilisé pour l'air de service (outils, commandes). Nécessite une injection d'huile pour le refroidissement et l'étanchéité." },
      centrifugal:{ name:"Compresseur centrifuge (turbocompresseur)", desc:"Comprime l'air par force centrifuge dans une roue à aubes. Très haut débit, faibles vibrations. Utilisé pour la suralimentation des moteurs diesel (turbocharger). Pas adapté aux très hautes pressions." },
      vane:{ name:"Compresseur à palettes", desc:"Un rotor excentré avec des palettes coulissantes comprime l'air. Compact et silencieux. Pression modérée (jusqu'à 8 bar). Utilisé pour les petits circuits pneumatiques de contrôle et les outils légers." },
    },
    circuitComponents:{
      compressor:{ name:"Compresseur", desc:"Comprime l'air de la pression atmosphérique à la pression de service. Généralement 2-3 compresseurs à bord : 2 compresseurs principaux pour la charge des bouteilles de démarrage, 1 compresseur de service pour l'air à basse pression." },
      intercooler:{ name:"Réfrigérant interétage (Intercooler)", desc:"Refroidit l'air entre les étages de compression pour améliorer le rendement et réduire la température. Sans intercooler, la température peut dépasser 300°C, détruisant les joints et les huiles." },
      aftercooler:{ name:"Réfrigérant final (Aftercooler)", desc:"Refroidit l'air après la compression finale pour condenser l'humidité. Permet d'éliminer 80-90% de l'humidité avant le sécheur." },
      separator:{ name:"Séparateur d'eau et d'huile", desc:"Élimine l'eau condensée et les traces d'huile de l'air comprimé. Équipé d'un purgeur automatique. Obligatoire avant les bouteilles de démarrage pour éviter les coups d'eau dans le moteur." },
      bottle:{ name:"Bouteille d'air (réservoir)", desc:"Stocke l'air comprimé. Bouteilles de démarrage : 25-30 bar, volume calculé pour 12 démarrages consécutifs (SOLAS). Équipées d'une soupape de sûreté, d'un manomètre, d'un purgeur et d'une vanne de sectionnement." },
      dryer:{ name:"Sécheur d'air", desc:"Élimine l'humidité résiduelle par adsorption (gel de silice) ou réfrigération. Obligatoire pour les circuits d'instruments, de commandes pneumatiques et d'alimentation en air de démarrage des moteurs auxiliaires." },
    },
    faults:{
      hightemp:{ name:"Température de refoulement trop élevée", cause:"Réfrigérant interétage encrassé, manque d'eau de refroidissement, soupapes de refoulement défectueuses (fuites), filtre d'aspiration colmaté.", remedy:"Nettoyer le réfrigérant, vérifier le débit d'eau de refroidissement, contrôler et remplacer les soupapes, nettoyer le filtre d'aspiration." },
      lowpressure:{ name:"Pression finale insuffisante", cause:"Fuites sur le circuit, soupapes d'aspiration ou de refoulement défectueuses, segments de piston usés, filtre d'aspiration colmaté.", remedy:"Contrôler les fuites sur le circuit, remplacer les soupapes, contrôler la compression à chaque étage, nettoyer ou remplacer le filtre." },
      oilcontam:{ name:"Contamination par l'huile", cause:"Usure des segments et des gorges de piston, niveau d'huile trop élevé, température d'huile insuffisante (huile non vaporisée).", remedy:"Contrôler et remplacer les segments, ramener le niveau d'huile à la normale, vérifier la température d'huile." },
      vibration:{ name:"Vibrations et bruits anormaux", cause:"Soupapes défectueuses (claquements), roulements usés, corps étranger dans le cylindre, déséquilibre du vilebrequin.", remedy:"Inspecter et remplacer les soupapes, remplacer les roulements, inspecter le cylindre, équilibrer ou remplacer le vilebrequin." },
    },
    maintenance:{
      daily:{ name:"Entretien quotidien", desc:"Purger les séparateurs d'eau (manuellement si pas automatique), contrôler le niveau d'huile carter, noter les pressions et températures dans le journal machine, vérifier l'absence de fuites visibles." },
      weekly:{ name:"Entretien hebdomadaire", desc:"Tester les purgeurs automatiques, vérifier la température de l'eau de refroidissement, contrôler la tension des courroies (si entraînement par courroies), nettoyer le filtre d'aspiration." },
      monthly:{ name:"Entretien mensuel", desc:"Changer l'huile moteur (ou selon heures de fonctionnement), inspecter les soupapes d'aspiration et de refoulement, contrôler l'état des joints, tester la soupape de sûreté." },
      annual:{ name:"Entretien annuel/révision", desc:"Démontage complet, mesure des jeux de pistons et cylindres, remplacement des segments, bagues et joints, nettoyage complet des réfrigérants, calibrage de la soupape de sûreté, test de pression hydrostatique de la bouteille." },
    },
    practiceTitle:"Exercice pratique",
    questions:[
      { q:"Pourquoi la compression de l'air s'effectue-t-elle en plusieurs étages avec refroidissement interétage ? Quels sont les avantages ?",
        a:"La compression d'air en plusieurs étages avec refroidissement interétage présente plusieurs avantages essentiels : 1. Efficacité énergétique : refroidir l'air entre les étages rapproche le cycle de la compression isotherme (idéale), réduisant la puissance nécessaire de 15-30% par rapport à une compression adiabatique. 2. Contrôle de la température : sans refroidissement, la température peut dépasser 300-400°C à 25 bar, détruisant les joints, les huiles et risquant l'inflammation des huiles (explosion). 3. Meilleure densité : l'air refroidi est plus dense, permettant à l'étage suivant de traiter plus de masse par cycle. 4. Durée de vie : les températures réduites préservent les joints, les soupapes et les segments. Un compresseur à 2 étages avec intercooler est environ 15% plus efficace qu'un monoétage équivalent." },
      { q:"Qu'est-ce qu'un coup d'eau dans un moteur diesel et comment l'air comprimé peut-il en être la cause ?",
        a:"Un coup d'eau se produit quand de l'eau pénètre dans les cylindres d'un moteur diesel pendant la compression ou la combustion. L'eau étant incompressible, elle cause une surpression instantanée qui peut plier ou briser la bielle et le piston. Mécanisme via l'air comprimé : si les bouteilles d'air de démarrage contiennent de l'eau condensée (défaut de purge ou de séchage), cette eau est injectée dans les cylindres lors du démarrage avec l'air. La chaleur de la compression la vaporise brutalement, créant un choc hydraulique. Prévention : purger systématiquement les bouteilles et séparateurs avant chaque démarrage, vérifier le bon fonctionnement des purgeurs automatiques, utiliser un sécheur d'air efficace." },
      { q:"Quelles sont les précautions à prendre avant d'effectuer une maintenance sur un compresseur d'air à haute pression ?",
        a:"Précautions obligatoires (consignation LOTO — Lockout/Tagout) : 1. Isolation électrique : couper l'alimentation électrique du moteur et cadenasser le disjoncteur. 2. Isolement pneumatique : fermer les vannes d'isolement des bouteilles et du circuit aval, dépressuriser le circuit jusqu'au compresseur. 3. Vérification de la dépressurisation : contrôler les manomètres de chaque étage — pression = 0 bar. 4. Ventilation : si travail dans un espace confiné, s'assurer d'une ventilation suffisante (risque d'enrichissement en O2 ou de vapeurs d'huile). 5. Mise en place de la signalisation : afficher 'En cours de maintenance — Ne pas démarrer'. 6. Attente du refroidissement : ne pas intervenir sur un compresseur chaud (brûlures). 7. Outils adaptés : utiliser uniquement des outils compatibles avec l'air comprimé (pas d'outil avec résidus de graisse)." },
    ],
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
  },
  en:{
    moduleLabel:"ENGINE — AUXILIARIES",
    lessonTitle:"Compressors & Compressed Air",
    intro:"Compressed air is vital on board: used for main engine starting, pneumatic controls, whistles, tools and circuit purging. A vessel typically has 2 to 3 starting air compressors and high-pressure air bottles.",
    tabs:["📖 Content","✏️ Practice","📚 Question Bank","🎯 Quiz"],
    s1title:"🔧 Marine Compressor Types",
    s1hint:"👆 Tap a type to see its characteristics",
    s2title:"📊 On-board Compressed Air Circuit",
    s2hint:"👆 Tap a component for its description",
    s3title:"⚠️ Safety Devices & Common Faults",
    s3hint:"👆 Tap a fault for causes and remedies",
    s4title:"🔩 Compressor Maintenance",
    s4hint:"👆 Tap a maintenance operation",
    keypoints:"Key Points",
    kp:[
      "Starting air bottles are charged to 25-30 bar for the main engine",
      "A piston compressor is water or air cooled — interstage cooling is essential",
      "Moisture in compressed air is dangerous — drains and dryers are mandatory",
      "The safety valve is set at 10% above service pressure",
      "A compressor must never run without oil or cooling — immediate damage",
    ],
    compTypes:{
      piston:{ name:"Piston (reciprocating) compressor", desc:"Most common on board. One or more pistons compress air in several stages. Mandatory interstage cooling (intercooler). Output pressure: 25-30 bar (starting) or 6-7 bar (service). Advantages: reliable, high pressure, easy to maintain." },
      screw:{ name:"Screw compressor", desc:"Two helical rotors compress air continuously. High flow, low vibration, quiet. Pressure limited (up to 13 bar). Used for service air (tools, controls). Requires oil injection for cooling and sealing." },
      centrifugal:{ name:"Centrifugal compressor (turbocharger)", desc:"Compresses air by centrifugal force in a bladed wheel. Very high flow, low vibration. Used for diesel engine supercharging (turbocharger). Not suitable for very high pressures." },
      vane:{ name:"Vane compressor", desc:"An eccentric rotor with sliding vanes compresses air. Compact and quiet. Moderate pressure (up to 8 bar). Used for small pneumatic control circuits and light tools." },
    },
    circuitComponents:{
      compressor:{ name:"Compressor", desc:"Compresses air from atmospheric to service pressure. Generally 2-3 compressors on board: 2 main compressors for charging starting bottles, 1 service compressor for low-pressure air." },
      intercooler:{ name:"Intercooler", desc:"Cools air between compression stages to improve efficiency and reduce temperature. Without intercooling, temperature can exceed 300°C, destroying seals and oils." },
      aftercooler:{ name:"Aftercooler", desc:"Cools air after final compression to condense moisture. Removes 80-90% of moisture before the dryer." },
      separator:{ name:"Water and oil separator", desc:"Removes condensed water and oil traces from compressed air. Equipped with automatic drain. Mandatory before starting bottles to prevent water slugs in the engine." },
      bottle:{ name:"Air bottle (reservoir)", desc:"Stores compressed air. Starting bottles: 25-30 bar, volume calculated for 12 consecutive starts (SOLAS). Equipped with safety valve, pressure gauge, drain and isolation valve." },
      dryer:{ name:"Air dryer", desc:"Removes residual moisture by adsorption (silica gel) or refrigeration. Mandatory for instrument air, pneumatic control circuits and auxiliary engine starting air." },
    },
    faults:{
      hightemp:{ name:"Delivery temperature too high", cause:"Fouled intercooler, insufficient cooling water, leaking delivery valves, clogged suction filter.", remedy:"Clean intercooler, check cooling water flow, inspect and replace valves, clean suction filter." },
      lowpressure:{ name:"Insufficient final pressure", cause:"Circuit leaks, defective suction or delivery valves, worn piston rings, clogged suction filter.", remedy:"Check circuit for leaks, replace valves, check compression at each stage, clean or replace filter." },
      oilcontam:{ name:"Oil contamination", cause:"Worn piston rings and grooves, oil level too high, insufficient oil temperature.", remedy:"Check and replace rings, restore normal oil level, check oil temperature." },
      vibration:{ name:"Abnormal vibrations and noise", cause:"Defective valves (knocking), worn bearings, foreign body in cylinder, crankshaft imbalance.", remedy:"Inspect and replace valves, replace bearings, inspect cylinder, balance or replace crankshaft." },
    },
    maintenance:{
      daily:{ name:"Daily maintenance", desc:"Drain water separators (manually if no automatic drain), check crankcase oil level, log pressures and temperatures, check for visible leaks." },
      weekly:{ name:"Weekly maintenance", desc:"Test automatic drains, check cooling water temperature, check belt tension (if belt drive), clean suction filter." },
      monthly:{ name:"Monthly maintenance", desc:"Change engine oil (or per running hours), inspect suction and delivery valves, check seal condition, test safety valve." },
      annual:{ name:"Annual/overhaul maintenance", desc:"Full disassembly, measure piston and cylinder clearances, replace rings, bushes and seals, full intercooler cleaning, safety valve calibration, hydrostatic pressure test of bottle." },
    },
    practiceTitle:"Practice Exercise",
    questions:[
      { q:"Why is air compression performed in multiple stages with interstage cooling? What are the advantages?",
        a:"Multi-stage compression with interstage cooling offers several key advantages: 1. Energy efficiency: cooling air between stages approximates isothermal compression (ideal), reducing required power by 15-30% vs adiabatic compression. 2. Temperature control: without cooling, temperature can exceed 300-400°C at 25 bar, destroying seals, oils and risking oil ignition (explosion). 3. Better density: cooled air is denser, allowing the next stage to process more mass per cycle. 4. Service life: reduced temperatures preserve seals, valves and rings. A 2-stage compressor with intercooler is about 15% more efficient than an equivalent single-stage." },
      { q:"What is a water slug in a diesel engine and how can compressed air cause one?",
        a:"A water slug occurs when water enters diesel engine cylinders during compression or combustion. Water being incompressible causes instant overpressure that can bend or break connecting rods and pistons. Compressed air mechanism: if starting air bottles contain condensed water (faulty draining or drying), this water is injected into cylinders with the starting air. The compression heat vaporises it brutally, creating hydraulic shock. Prevention: systematically drain bottles and separators before each start, verify automatic drain operation, use an effective air dryer." },
      { q:"What precautions must be taken before performing maintenance on a high-pressure air compressor?",
        a:"Mandatory precautions (LOTO — Lockout/Tagout): 1. Electrical isolation: cut motor power supply and lock out the circuit breaker. 2. Pneumatic isolation: close bottle and downstream circuit isolation valves, depressurise circuit to compressor. 3. Depressurisation verification: check each stage pressure gauge — pressure = 0 bar. 4. Ventilation: if working in confined space, ensure adequate ventilation (O2 enrichment or oil vapour risk). 5. Signage: display 'Under maintenance — Do not start'. 6. Allow cooling: do not work on a hot compressor (burns). 7. Appropriate tools: use only tools compatible with compressed air (no tools with grease residue)." },
    ],
    showAnswer:"Show answer", hideAnswer:"Hide",
  },
  es:{
    moduleLabel:"MÁQUINAS — AUXILIARES",
    lessonTitle:"Compresores & Aire comprimido",
    intro:"El aire comprimido es vital a bordo: se usa para el arranque del motor principal, mandos neumáticos, silbatos, herramientas y purga de circuitos. Un buque tiene generalmente 2-3 compresores de aire de arranque y botellas de aire a alta presión.",
    tabs:["📖 Contenido","✏️ Práctica","📚 Banco Q.","🎯 Quiz"],
    s1title:"🔧 Tipos de compresores marinos",
    s1hint:"👆 Toca un tipo para ver sus características",
    s2title:"📊 Circuito de aire comprimido a bordo",
    s2hint:"👆 Toca un componente para su descripción",
    s3title:"⚠️ Seguridades & Fallos comunes",
    s3hint:"👆 Toca un fallo para causas y remedios",
    s4title:"🔩 Mantenimiento del compresor",
    s4hint:"👆 Toca una operación de mantenimiento",
    keypoints:"Puntos clave",
    kp:[
      "Las botellas de aire de arranque se cargan a 25-30 bar para el motor principal",
      "Un compresor de pistones se enfría con agua o aire — el enfriamiento interetapa es esencial",
      "La humedad en el aire comprimido es peligrosa — purgadores y secadores son obligatorios",
      "La válvula de seguridad se ajusta al 10% por encima de la presión de servicio",
      "Un compresor nunca debe funcionar sin aceite ni refrigeración — daños inmediatos",
    ],
    compTypes:{
      piston:{ name:"Compresor de pistones (alternativo)", desc:"El más común a bordo. Uno o varios pistones comprimen el aire en varias etapas. Enfriamiento interetapa obligatorio. Presión de salida: 25-30 bar (arranque) o 6-7 bar (servicio). Ventajas: fiable, alta presión, fácil de mantener." },
      screw:{ name:"Compresor de tornillo", desc:"Dos rotores helicoidales comprimen el aire continuamente. Gran caudal, bajas vibraciones, silencioso. Presión limitada (hasta 13 bar). Usado para aire de servicio. Requiere inyección de aceite." },
      centrifugal:{ name:"Compresor centrífugo (turbocompresor)", desc:"Comprime el aire por fuerza centrífuga en una rueda de álabes. Muy alto caudal, bajas vibraciones. Usado para la sobrealimentación de motores diésel." },
      vane:{ name:"Compresor de paletas", desc:"Rotor excéntrico con paletas deslizantes. Compacto y silencioso. Presión moderada (hasta 8 bar). Usado para pequeños circuitos neumáticos y herramientas ligeras." },
    },
    circuitComponents:{
      compressor:{ name:"Compresor", desc:"Comprime el aire de la presión atmosférica a la de servicio. Generalmente 2-3 a bordo: 2 principales para cargar las botellas de arranque, 1 de servicio para aire a baja presión." },
      intercooler:{ name:"Refrigerante interetapa (Intercooler)", desc:"Enfría el aire entre etapas de compresión para mejorar el rendimiento y reducir la temperatura. Sin intercooler, la temperatura puede superar 300°C." },
      aftercooler:{ name:"Refrigerante final (Aftercooler)", desc:"Enfría el aire tras la compresión final para condensar la humedad. Elimina el 80-90% de la humedad antes del secador." },
      separator:{ name:"Separador de agua y aceite", desc:"Elimina el agua condensada y trazas de aceite del aire comprimido. Equipado con purgador automático. Obligatorio antes de las botellas de arranque." },
      bottle:{ name:"Botella de aire (depósito)", desc:"Almacena el aire comprimido. Botellas de arranque: 25-30 bar, volumen para 12 arranques consecutivos (SOLAS). Equipadas con válvula de seguridad, manómetro, purgador." },
      dryer:{ name:"Secador de aire", desc:"Elimina la humedad residual por adsorción (gel de sílice) o refrigeración. Obligatorio para instrumentos, mandos neumáticos y aire de arranque de auxiliares." },
    },
    faults:{
      hightemp:{ name:"Temperatura de descarga demasiado alta", cause:"Refrigerante interetapa sucio, falta de agua de refrigeración, válvulas de descarga defectuosas, filtro de aspiración taponado.", remedy:"Limpiar el refrigerante, verificar caudal de agua, inspeccionar y sustituir válvulas, limpiar el filtro." },
      lowpressure:{ name:"Presión final insuficiente", cause:"Fugas en el circuito, válvulas defectuosas, segmentos de pistón desgastados, filtro taponado.", remedy:"Controlar fugas, sustituir válvulas, controlar la compresión en cada etapa, limpiar o sustituir el filtro." },
      oilcontam:{ name:"Contaminación por aceite", cause:"Desgaste de segmentos y ranuras, nivel de aceite demasiado alto, temperatura de aceite insuficiente.", remedy:"Controlar y sustituir los segmentos, normalizar el nivel de aceite, verificar la temperatura." },
      vibration:{ name:"Vibraciones y ruidos anormales", cause:"Válvulas defectuosas, rodamientos desgastados, cuerpo extraño en el cilindro, desequilibrio del cigüeñal.", remedy:"Inspeccionar y sustituir válvulas, sustituir rodamientos, inspeccionar cilindro." },
    },
    maintenance:{
      daily:{ name:"Mantenimiento diario", desc:"Purgar los separadores de agua, controlar el nivel de aceite, registrar presiones y temperaturas, verificar ausencia de fugas." },
      weekly:{ name:"Mantenimiento semanal", desc:"Probar purgadores automáticos, verificar temperatura del agua de refrigeración, controlar la tensión de correas, limpiar el filtro de aspiración." },
      monthly:{ name:"Mantenimiento mensual", desc:"Cambiar el aceite, inspeccionar válvulas de aspiración y descarga, controlar los cierres, probar la válvula de seguridad." },
      annual:{ name:"Mantenimiento anual/revisión", desc:"Desmontaje completo, medición de juegos, sustitución de segmentos y cierres, limpieza de refrigerantes, calibrado de válvula de seguridad, prueba hidrostática." },
    },
    practiceTitle:"Ejercicio práctico",
    questions:[
      { q:"¿Por qué la compresión del aire se realiza en varias etapas con enfriamiento interetapa? ¿Cuáles son las ventajas?",
        a:"1. Eficiencia energética: enfriar el aire entre etapas aproxima el ciclo a la compresión isotérmica, reduciendo la potencia necesaria un 15-30%. 2. Control de temperatura: sin enfriamiento, la temperatura puede superar 300-400°C a 25 bar, destruyendo los cierres y aceites con riesgo de explosión. 3. Mejor densidad: el aire enfriado es más denso. 4. Vida útil: temperaturas reducidas preservan cierres, válvulas y segmentos." },
      { q:"¿Qué es un golpe de agua en un motor diésel y cómo puede causarlo el aire comprimido?",
        a:"Un golpe de agua se produce cuando agua entra en los cilindros durante la compresión. El agua es incompresible y causa sobrepresión instantánea que puede doblar o romper la biela. Mecanismo: si las botellas de aire de arranque contienen agua condensada (mal purgado o secado), esta agua se inyecta en los cilindros con el aire. Prevención: purgar sistemáticamente botellas y separadores antes de cada arranque, verificar los purgadores automáticos, usar secador de aire eficaz." },
      { q:"¿Qué precauciones hay que tomar antes de realizar mantenimiento en un compresor de alta presión?",
        a:"Precauciones LOTO: 1. Aislamiento eléctrico y bloqueo del disyuntor. 2. Aislamiento neumático: cerrar válvulas de aislamiento y despresurizar. 3. Verificación de la despresurización: controlar manómetros (= 0 bar). 4. Ventilación si espacio confinado. 5. Señalización: 'En mantenimiento — No arrancar'. 6. Esperar el enfriamiento. 7. Herramientas adecuadas sin restos de grasa." },
    ],
    showAnswer:"Ver corrección", hideAnswer:"Ocultar",
  },
  pt:{
    moduleLabel:"MÁQUINAS — AUXILIARES",
    lessonTitle:"Compressores & Ar comprimido",
    intro:"O ar comprimido é vital a bordo: usado para arranque do motor principal, comandos pneumáticos, apitos, ferramentas e purga de circuitos. Um navio tem geralmente 2-3 compressores de ar de arranque e garrafas de ar a alta pressão.",
    tabs:["📖 Conteúdo","✏️ Prática","📚 Banco Q.","🎯 Quiz"],
    s1title:"🔧 Tipos de compressores marinhos",
    s1hint:"👆 Toque num tipo para ver as características",
    s2title:"📊 Circuito de ar comprimido a bordo",
    s2hint:"👆 Toque num componente para a descrição",
    s3title:"⚠️ Seguridades & Avarias comuns",
    s3hint:"👆 Toque numa avaria para causas e remédios",
    s4title:"🔩 Manutenção do compressor",
    s4hint:"👆 Toque numa operação de manutenção",
    keypoints:"Pontos-chave",
    kp:[
      "As garrafas de ar de arranque são carregadas a 25-30 bar para o motor principal",
      "Um compressor de pistões é arrefecido a água ou ar — o arrefecimento interstadial é essencial",
      "A humidade no ar comprimido é perigosa — purgadores e secadores são obrigatórios",
      "A válvula de segurança está regulada a 10% acima da pressão de serviço",
      "Um compressor nunca deve funcionar sem óleo ou arrefecimento — danos imediatos",
    ],
    compTypes:{
      piston:{ name:"Compressor de pistões (alternativo)", desc:"O mais comum a bordo. Um ou vários pistões comprimem o ar em várias fases. Arrefecimento interstadial obrigatório. Pressão de saída: 25-30 bar (arranque) ou 6-7 bar (serviço). Vantagens: fiável, alta pressão, fácil de manter." },
      screw:{ name:"Compressor de parafuso", desc:"Dois rotores helicoidais comprimem o ar continuamente. Caudal elevado, baixas vibrações, silencioso. Pressão limitada (até 13 bar). Usado para ar de serviço. Requer injeção de óleo." },
      centrifugal:{ name:"Compressor centrífugo (turbocompressor)", desc:"Comprime o ar por força centrífuga numa roda de pás. Caudal muito elevado, baixas vibrações. Usado para a sobrealimentação de motores diesel." },
      vane:{ name:"Compressor de palhetas", desc:"Rotor excêntrico com palhetas deslizantes. Compacto e silencioso. Pressão moderada (até 8 bar). Usado para pequenos circuitos pneumáticos e ferramentas leves." },
    },
    circuitComponents:{
      compressor:{ name:"Compressor", desc:"Comprime o ar da pressão atmosférica à de serviço. Geralmente 2-3 a bordo: 2 principais para carregar as garrafas de arranque, 1 de serviço para ar a baixa pressão." },
      intercooler:{ name:"Arrefecedor interstadial (Intercooler)", desc:"Arrefece o ar entre fases de compressão para melhorar o rendimento e reduzir a temperatura. Sem intercooler, a temperatura pode superar 300°C." },
      aftercooler:{ name:"Arrefecedor final (Aftercooler)", desc:"Arrefece o ar após a compressão final para condensar a humidade. Remove 80-90% da humidade antes do secador." },
      separator:{ name:"Separador de água e óleo", desc:"Remove água condensada e traços de óleo do ar comprimido. Equipado com purgador automático. Obrigatório antes das garrafas de arranque." },
      bottle:{ name:"Garrafa de ar (reservatório)", desc:"Armazena ar comprimido. Garrafas de arranque: 25-30 bar, volume para 12 arranques consecutivos (SOLAS). Equipadas com válvula de segurança, manómetro, purgador." },
      dryer:{ name:"Secador de ar", desc:"Remove humidade residual por adsorção (gel de sílica) ou refrigeração. Obrigatório para instrumentos, comandos pneumáticos e ar de arranque de auxiliares." },
    },
    faults:{
      hightemp:{ name:"Temperatura de descarga demasiado elevada", cause:"Intercooler sujo, falta de água de arrefecimento, válvulas de descarga com fugas, filtro de aspiração entupido.", remedy:"Limpar intercooler, verificar caudal de água, inspecionar e substituir válvulas, limpar filtro." },
      lowpressure:{ name:"Pressão final insuficiente", cause:"Fugas no circuito, válvulas deficientes, segmentos de pistão desgastados, filtro entupido.", remedy:"Controlar fugas, substituir válvulas, controlar compressão em cada fase, limpar ou substituir filtro." },
      oilcontam:{ name:"Contaminação por óleo", cause:"Desgaste de segmentos e ranhuras, nível de óleo demasiado alto, temperatura de óleo insuficiente.", remedy:"Controlar e substituir segmentos, normalizar nível de óleo, verificar temperatura." },
      vibration:{ name:"Vibrações e ruídos anormais", cause:"Válvulas deficientes, rolamentos desgastados, corpo estranho no cilindro, desequilíbrio do virabrequim.", remedy:"Inspecionar e substituir válvulas, substituir rolamentos, inspecionar cilindro." },
    },
    maintenance:{
      daily:{ name:"Manutenção diária", desc:"Purgar separadores de água, controlar nível de óleo, registar pressões e temperaturas, verificar ausência de fugas." },
      weekly:{ name:"Manutenção semanal", desc:"Testar purgadores automáticos, verificar temperatura da água de arrefecimento, controlar tensão das correias, limpar filtro de aspiração." },
      monthly:{ name:"Manutenção mensal", desc:"Mudar o óleo, inspecionar válvulas de aspiração e descarga, controlar vedações, testar válvula de segurança." },
      annual:{ name:"Manutenção anual/revisão", desc:"Desmontagem completa, medição de folgas, substituição de segmentos e vedações, limpeza de arrefecedores, calibração da válvula de segurança, teste hidrostático." },
    },
    practiceTitle:"Exercício prático",
    questions:[
      { q:"Por que a compressão do ar é realizada em várias fases com arrefecimento interstadial? Quais são as vantagens?",
        a:"1. Eficiência energética: arrefecer o ar entre fases aproxima o ciclo da compressão isotérmica, reduzindo a potência necessária 15-30%. 2. Controlo de temperatura: sem arrefecimento, a temperatura pode superar 300-400°C a 25 bar, destruindo vedações e óleos com risco de explosão. 3. Melhor densidade: o ar arrefecido é mais denso. 4. Vida útil: temperaturas reduzidas preservam vedações, válvulas e segmentos." },
      { q:"O que é um golpe de água num motor diesel e como pode o ar comprimido causá-lo?",
        a:"Um golpe de água ocorre quando água entra nos cilindros durante a compressão. A água sendo incompressível causa sobrepressão instantânea que pode dobrar ou partir a biela. Mecanismo: se as garrafas de ar de arranque contêm água condensada (má purga ou secagem), esta água é injetada nos cilindros com o ar. Prevenção: purgar sistematicamente garrafas e separadores antes de cada arranque, verificar purgadores automáticos, usar secador de ar eficaz." },
      { q:"Que precauções tomar antes de realizar manutenção num compressor de alta pressão?",
        a:"Precauções LOTO: 1. Isolamento elétrico e bloqueio do disjuntor. 2. Isolamento pneumático: fechar válvulas e despressurizar. 3. Verificação da despressurização (manómetros = 0 bar). 4. Ventilação se espaço confinado. 5. Sinalização: 'Em manutenção — Não arrancar'. 6. Aguardar arrefecimento. 7. Ferramentas adequadas sem resíduos de gordura." },
    ],
    showAnswer:"Ver correção", hideAnswer:"Ocultar",
  },
};

// ── SVG 1 — COMPRESSOR TYPES ──────────────────────────────────
function CompressorTypesSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("piston");
  const types = t.compTypes;
  const typeColors: Record<string,string> = {piston:C.air,screw:C.safe,centrifugal:C.pressure,vane:C.comp};

  const svgs: Record<string,JSX.Element> = {
    piston:(
      <g>
        {/* Stage 1 cylinder */}
        <rect x="20" y="50" width="40" height="60" rx="4" fill={C.air} opacity={0.15} stroke={C.air} strokeWidth="1.5"/>
        <rect x="28" y="58" width="24" height="35" rx="2" fill={C.navy3} stroke={C.air} strokeWidth="1"/>
        <rect x="30" y="65" width="20" height="15" rx="2" fill={C.air} opacity={0.5}/>
        <line x1="40" y1="80" x2="40" y2="100" stroke={C.pipe} strokeWidth="2"/>
        <text x="40" y="122" fontSize="7" fill={C.air} fontFamily="Courier New" textAnchor="middle">ST.1</text>
        {/* Intercooler */}
        <rect x="70" y="65" width="20" height="30" rx="4" fill={C.safe} opacity={0.2} stroke={C.safe} strokeWidth="1.5"/>
        <text x="80" y="83" fontSize="6" fill={C.safe} fontFamily="Courier New" textAnchor="middle">IC</text>
        {/* Stage 2 cylinder */}
        <rect x="100" y="55" width="30" height="50" rx="4" fill={C.comp} opacity={0.15} stroke={C.comp} strokeWidth="1.5"/>
        <rect x="106" y="61" width="18" height="28" rx="2" fill={C.navy3} stroke={C.comp} strokeWidth="1"/>
        <rect x="108" y="67" width="14" height="12" rx="2" fill={C.comp} opacity={0.5}/>
        <line x1="115" y1="79" x2="115" y2="95" stroke={C.pipe} strokeWidth="2"/>
        <text x="115" y="117" fontSize="7" fill={C.comp} fontFamily="Courier New" textAnchor="middle">ST.2</text>
        {/* Lines */}
        <line x1="60" y1="80" x2="70" y2="80" stroke={C.air} strokeWidth="1.5"/>
        <line x1="90" y1="80" x2="100" y2="80" stroke={C.comp} strokeWidth="1.5"/>
        <line x1="130" y1="80" x2="150" y2="80" stroke={C.comp} strokeWidth="2"/>
        {/* Labels */}
        <text x="155" y="77" fontSize="7" fill={C.comp} fontFamily="Courier New">25 bar</text>
        <text x="10" y="77" fontSize="7" fill={C.air} fontFamily="Courier New">1 bar</text>
        <text x="80" y="140" fontSize="8" fill={C.air} fontFamily="Courier New" textAnchor="middle">2-STAGE PISTON</text>
      </g>
    ),
    screw:(
      <g>
        <rect x="30" y="50" width="100" height="60" rx="8" fill={C.safe} opacity={0.1} stroke={C.safe} strokeWidth="1.5"/>
        {[0,1,2,3,4].map(i=>(
          <g key={i}>
            <ellipse cx={50+i*15} cy="65" rx="7" ry="12" fill={C.safe} opacity={0.4} stroke={C.safe} strokeWidth="1"/>
            <ellipse cx={50+i*15} cy="95" rx="7" ry="12" fill={C.safe} opacity={0.3} stroke={C.safe} strokeWidth="1"/>
          </g>
        ))}
        <text x="15" y="83" fontSize="7" fill={C.safe} fontFamily="Courier New">IN</text>
        <line x1="30" y1="80" x2="10" y2="80" stroke={C.safe} strokeWidth="1.5"/>
        <text x="135" y="83" fontSize="7" fill={C.safe} fontFamily="Courier New">OUT</text>
        <line x1="130" y1="80" x2="145" y2="80" stroke={C.safe} strokeWidth="1.5"/>
        <text x="80" y="130" fontSize="8" fill={C.safe} fontFamily="Courier New" textAnchor="middle">SCREW — 13 bar max</text>
      </g>
    ),
    centrifugal:(
      <g>
        <ellipse cx="80" cy="80" rx="45" ry="45" fill={C.pressure} opacity={0.1} stroke={C.pressure} strokeWidth="1.5"/>
        {[0,45,90,135,180,225,270,315].map((a,i)=>{
          const r=a*Math.PI/180;
          return <line key={i} x1={80+10*Math.cos(r)} y1={80+10*Math.sin(r)} x2={80+35*Math.cos(r+0.3)} y2={80+35*Math.sin(r+0.3)} stroke={C.pressure} strokeWidth="2.5" strokeLinecap="round"/>;
        })}
        <circle cx="80" cy="80" r="10" fill={C.pressure} opacity={0.4}/>
        <line x1="80" y1="30" x2="80" y2="10" stroke={C.pressure} strokeWidth="1.5"/>
        <text x="80" y="7" fontSize="7" fill={C.pressure} fontFamily="Courier New" textAnchor="middle">IN</text>
        <line x1="125" y1="80" x2="145" y2="80" stroke={C.pressure} strokeWidth="1.5"/>
        <text x="148" y="83" fontSize="7" fill={C.pressure} fontFamily="Courier New">OUT</text>
        <text x="80" y="140" fontSize="8" fill={C.pressure} fontFamily="Courier New" textAnchor="middle">TURBO/CENTRIFUGAL</text>
      </g>
    ),
    vane:(
      <g>
        <ellipse cx="80" cy="80" rx="40" ry="40" fill={C.comp} opacity={0.1} stroke={C.comp} strokeWidth="1.5"/>
        <ellipse cx="90" cy="80" rx="30" ry="30" fill={C.navy3} stroke={C.comp} strokeWidth="1"/>
        {[0,45,90,135,180,225,270,315].map((a,i)=>{
          const r=a*Math.PI/180;
          const rx2=90+28*Math.cos(r);const ry2=80+28*Math.sin(r);
          return <line key={i} x1={90+14*Math.cos(r)} y1={80+14*Math.sin(r)} x2={rx2} y2={ry2} stroke={C.comp} strokeWidth="2" strokeLinecap="round" opacity={0.7}/>;
        })}
        <line x1="40" y1="80" x2="20" y2="80" stroke={C.comp} strokeWidth="1.5"/>
        <text x="17" y="83" fontSize="7" fill={C.comp} fontFamily="Courier New" textAnchor="end">IN</text>
        <line x1="120" y1="80" x2="140" y2="80" stroke={C.comp} strokeWidth="1.5"/>
        <text x="142" y="83" fontSize="7" fill={C.comp} fontFamily="Courier New">OUT</text>
        <text x="80" y="135" fontSize="8" fill={C.comp} fontFamily="Courier New" textAnchor="middle">VANE — 8 bar max</text>
      </g>
    ),
  };

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.air}33`}}>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {Object.entries(types).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{
            padding:"5px 9px",borderRadius:8,fontSize:10,cursor:"pointer",
            background:sel===key?`${typeColors[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?typeColors[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?typeColors[key]:"rgba(240,244,255,0.45)",
            fontFamily:"Courier New",
          }}>{key==="piston"?"PISTON":key==="screw"?"SCREW":key==="centrifugal"?"TURBO":"VANE"}</button>
        ))}
      </div>
      <svg viewBox="0 0 160 155" style={{width:"100%",maxWidth:220,display:"block",margin:"0 auto",background:`${C.navy3}66`,borderRadius:8}}>
        {svgs[sel]}
      </svg>
      <div style={{marginTop:10,padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${typeColors[sel]||C.air}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
        <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{types[sel].name}</div>
        {types[sel].desc}
      </div>
    </div>
  );
}

// ── SVG 2 — CIRCUIT ───────────────────────────────────────────
function CircuitSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string|null>(null);
  const comps = t.circuitComponents;
  const compColors: Record<string,string> = {
    compressor:C.air, intercooler:C.safe, aftercooler:C.safe,
    separator:C.comp, bottle:C.pressure, dryer:C.pipe,
  };

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.comp}33`}}>
      <svg viewBox="0 0 280 120" style={{width:"100%",maxWidth:360,display:"block",margin:"0 auto"}}>
        {/* Compressor */}
        <circle cx="30" cy="60" r="20" fill={C.air} opacity={0.15} stroke={C.air} strokeWidth="1.5"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="compressor"?null:"compressor")}/>
        <text x="30" y="58" fontSize="6" fill={C.air} fontFamily="Courier New" textAnchor="middle">COMP</text>
        <text x="30" y="68" fontSize="6" fill={C.air} fontFamily="Courier New" textAnchor="middle">25bar</text>
        {/* Intercooler */}
        <rect x="58" y="48" width="25" height="24" rx="4" fill={C.safe} opacity={0.15} stroke={C.safe} strokeWidth="1.5"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="intercooler"?null:"intercooler")}/>
        <text x="70" y="63" fontSize="5" fill={C.safe} fontFamily="Courier New" textAnchor="middle">INTER</text>
        {/* Aftercooler */}
        <rect x="93" y="48" width="25" height="24" rx="4" fill={C.safe} opacity={0.12} stroke={C.safe} strokeWidth="1" strokeDasharray="3,2"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="aftercooler"?null:"aftercooler")}/>
        <text x="105" y="63" fontSize="5" fill={C.safe} fontFamily="Courier New" textAnchor="middle">AFTER</text>
        {/* Separator */}
        <rect x="128" y="45" width="20" height="30" rx="4" fill={C.comp} opacity={0.15} stroke={C.comp} strokeWidth="1.5"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="separator"?null:"separator")}/>
        <text x="138" y="63" fontSize="5" fill={C.comp} fontFamily="Courier New" textAnchor="middle">SEP</text>
        {/* Dryer */}
        <rect x="158" y="48" width="20" height="24" rx="4" fill={C.pipe} opacity={0.15} stroke={C.pipe} strokeWidth="1.5"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="dryer"?null:"dryer")}/>
        <text x="168" y="63" fontSize="5" fill={C.pipe} fontFamily="Courier New" textAnchor="middle">DRY</text>
        {/* Bottle */}
        <ellipse cx="220" cy="60" rx="25" ry="35" fill={C.pressure} opacity={0.12} stroke={C.pressure} strokeWidth="1.5"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="bottle"?null:"bottle")}/>
        <text x="220" y="56" fontSize="6" fill={C.pressure} fontFamily="Courier New" textAnchor="middle">AIR</text>
        <text x="220" y="66" fontSize="6" fill={C.pressure} fontFamily="Courier New" textAnchor="middle">BOTTLE</text>
        <text x="220" y="76" fontSize="5" fill={C.pressure} fontFamily="Courier New" textAnchor="middle">25-30bar</text>
        {/* To engine */}
        <line x1="245" y1="60" x2="265" y2="60" stroke={C.pressure} strokeWidth="2"/>
        <text x="270" y="55" fontSize="6" fill={C.pressure} fontFamily="Courier New">→ ME</text>
        {/* Connections */}
        <line x1="50" y1="60" x2="58" y2="60" stroke={C.air} strokeWidth="1.5"/>
        <line x1="83" y1="60" x2="93" y2="60" stroke={C.air} strokeWidth="1.5"/>
        <line x1="118" y1="60" x2="128" y2="60" stroke={C.comp} strokeWidth="1.5"/>
        <line x1="148" y1="60" x2="158" y2="60" stroke={C.comp} strokeWidth="1.5"/>
        <line x1="178" y1="60" x2="195" y2="60" stroke={C.pressure} strokeWidth="1.5"/>
        {/* Drain lines */}
        <line x1="138" y1="75" x2="138" y2="95" stroke={C.comp} strokeWidth="1" strokeDasharray="3,2"/>
        <text x="138" y="102" fontSize="5" fill={C.comp} fontFamily="Courier New" textAnchor="middle">DRAIN</text>
        <line x1="220" y1="95" x2="220" y2="105" stroke={C.pressure} strokeWidth="1" strokeDasharray="3,2"/>
        <text x="220" y="112" fontSize="5" fill={C.pressure} fontFamily="Courier New" textAnchor="middle">PURGE</text>
      </svg>

      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
        {Object.entries(comps).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(sel===key?null:key)} style={{
            padding:"4px 8px",borderRadius:8,fontSize:10,cursor:"pointer",
            background:sel===key?`${compColors[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?compColors[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?compColors[key]:"rgba(240,244,255,0.45)",
            fontFamily:"Courier New",
          }}>{key==="compressor"?"COMP":key==="intercooler"?"INTER":key==="aftercooler"?"AFTER":key==="separator"?"SEP":key==="bottle"?"BOTTLE":"DRYER"}</button>
        ))}
      </div>
      {sel&&(
        <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${compColors[sel]||C.comp}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
          <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{comps[sel].name}</div>
          {comps[sel].desc}
        </div>
      )}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)"}}>{t.s2hint}</div>}
    </div>
  );
}

// ── SVG 3 — FAULTS ────────────────────────────────────────────
function FaultsSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string|null>(null);
  const faults = t.faults;
  const faultColors: Record<string,string> = {hightemp:C.danger,lowpressure:C.air,oilcontam:C.comp,vibration:C.pressure};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.danger}33`}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {Object.entries(faults).map(([key,val]:any)=>{
          const col=faultColors[key]||C.danger;
          return(
            <button key={key} onClick={()=>setSel(sel===key?null:key)} style={{padding:"10px 8px",borderRadius:10,cursor:"pointer",textAlign:"left",background:sel===key?`${col}18`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`}}>
              <div style={{fontSize:11,fontWeight:700,color:"#f0f4ff",fontFamily:"Courier New",lineHeight:1.4}}>{val.name}</div>
            </button>
          );
        })}
      </div>
      {sel&&(
        <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${faultColors[sel]||C.danger}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
          <div style={{color:C.danger,fontWeight:700,marginBottom:4}}>⚠️ {lang==="fr"?"Cause":lang==="es"?"Causa":lang==="pt"?"Causa":"Cause"}</div>
          <div style={{marginBottom:8}}>{faults[sel].cause}</div>
          <div style={{color:C.safe,fontWeight:700,marginBottom:4}}>✅ {lang==="fr"?"Remède":lang==="es"?"Remedio":lang==="pt"?"Remédio":"Remedy"}</div>
          <div>{faults[sel].remedy}</div>
        </div>
      )}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)"}}>{t.s3hint}</div>}
    </div>
  );
}

// ── SVG 4 — MAINTENANCE ───────────────────────────────────────
function MaintenanceSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("daily");
  const maint = t.maintenance;
  const maintColors: Record<string,string> = {daily:C.safe,weekly:C.air,monthly:C.comp,annual:C.danger};
  const icons: Record<string,string> = {daily:"📅",weekly:"📆",monthly:"🔧",annual:"🔩"};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.comp}33`}}>
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {Object.entries(maint).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{flex:1,padding:"8px 4px",borderRadius:10,fontSize:10,cursor:"pointer",background:sel===key?`${maintColors[key]}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?maintColors[key]:"rgba(255,255,255,0.1)"}`,color:sel===key?maintColors[key]:"rgba(240,244,255,0.45)",fontFamily:"Courier New",textAlign:"center"}}>
            <div style={{fontSize:16}}>{icons[key]}</div>
          </button>
        ))}
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${maintColors[sel]||C.comp}44`,minHeight:80}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:maintColors[sel]||C.comp,fontWeight:700,marginBottom:8}}>{icons[sel]} {maint[sel].name}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{maint[sel].desc}</div>
      </div>
    </div>
  );
}

// ── CONTENT TAB ───────────────────────────────────────────────
function ContentTab({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const section=(title:string,children:React.ReactNode,color=C.air)=>(
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
      {section(t.s1title,<CompressorTypesSVG lang={lang}/>,C.air)}
      {section(t.s2title,<CircuitSVG lang={lang}/>,C.comp)}
      {section(t.s3title,<FaultsSVG lang={lang}/>,C.danger)}
      {section(t.s4title,<MaintenanceSVG lang={lang}/>,C.comp)}
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
        <div key={i} style={{marginBottom:14,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.air}33`,overflow:"hidden"}}>
          <div style={{padding:"12px 14px"}}>
            <div style={{fontSize:10,color:C.air,letterSpacing:1,marginBottom:6,fontFamily:"'Cinzel',serif"}}>Q{i+1}</div>
            <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>{q.q}</div>
          </div>
          <div style={{padding:"0 14px 12px"}}>
            <button onClick={()=>toggle(i)} style={{padding:"7px 14px",borderRadius:8,fontSize:11,cursor:"pointer",background:shown[i]?`${C.air}22`:"rgba(255,255,255,0.06)",border:`1px solid ${shown[i]?C.air:"rgba(255,255,255,0.15)"}`,color:shown[i]?C.air:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{shown[i]?t.hideAnswer:t.showAnswer}</button>
            {shown[i]&&<div style={{marginTop:10,padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.air}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{q.a}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
// LessonE2_L4 — PART 2: Bank + Quiz + Main

function getBank(lang: string) {
  const banks: any = {
    fr:[
      {q:"Pourquoi les bouteilles d'air de démarrage doivent-elles être purgées avant chaque démarrage du moteur principal ?",a:"Les bouteilles d'air de démarrage doivent être purgées avant chaque démarrage pour éliminer l'eau condensée qui s'accumule dans le fond de la bouteille. Si cette eau entre dans les cylindres du moteur principal avec l'air de démarrage, elle peut provoquer un coup d'eau : l'eau étant incompressible, la pression augmente instantanément et peut plier ou briser les bielles et pistons. La purge élimine aussi les traces d'huile provenant du compresseur. Procédure : ouvrir le robinet de purge en bas de la bouteille jusqu'à ce que seul de l'air sec sorte."},
      {q:"Quelle est la pression réglementaire des bouteilles d'air de démarrage selon SOLAS ?",a:"Selon SOLAS, les bouteilles d'air de démarrage doivent avoir une capacité suffisante pour effectuer au moins 12 démarrages consécutifs du moteur principal sans recharge. La pression de service est généralement de 25-30 bar. Chaque bouteille est équipée d'une soupape de sûreté réglée à 10% au-dessus de la pression de service (soit environ 27,5 à 33 bar), d'un manomètre visible, d'un robinet de purge et d'une vanne de sectionnement. Les bouteilles sont soumises à des tests hydrostatiques périodiques (tous les 5 ans)."},
      {q:"Expliquez le cycle de compression d'un compresseur à pistons en deux étages.",a:"Étage 1 (Basse pression) : L'air atmosphérique entre à 1 bar par le filtre d'aspiration. Le piston descend (aspiration) et monte (compression). La soupape de refoulement du 1er étage s'ouvre quand la pression atteint ~5-7 bar. L'air est envoyé au réfrigérant interétage (intercooler) où sa température est ramenée à ~40°C. Étage 2 (Haute pression) : L'air refroidi et plus dense entre dans le cylindre HP. Le piston comprime jusqu'à 25-30 bar. L'air est refroidi dans le réfrigérant final (aftercooler). L'eau condensée est séparée dans le séparateur avant d'atteindre la bouteille."},
      {q:"Qu'est-ce qu'un purgeur automatique et comment fonctionne-t-il sur un circuit d'air comprimé ?",a:"Un purgeur automatique est un dispositif qui élimine automatiquement l'eau condensée et les impuretés d'un circuit d'air comprimé sans laisser fuir l'air comprimé. Types principaux : Purgeur à flotteur : un flotteur monte avec l'eau accumulée et ouvre automatiquement une vanne de purge quand un certain niveau est atteint. Purgeur électronique : déclenche une ouverture temporisée (ex : toutes les 30 minutes pendant 5 secondes). Purgeur thermodynamique : utilise la différence de pression et de température entre l'air et le condensat. Sur un compresseur : les purgeurs sont placés sur les réservoirs intermédiaires, le séparateur final et la bouteille. Un purgeur défaillant laisse s'accumuler l'eau, risquant le coup d'eau ou la corrosion."},
      {q:"Quelles sont les conséquences d'une contamination par l'huile dans l'air de démarrage ?",a:"La contamination par l'huile dans l'air de démarrage a plusieurs conséquences graves : 1. Dépôts dans les vannes de démarrage : l'huile brûlée forme des dépôts carbonés qui peuvent colmater les vannes de démarrage des cylindres, empêchant leur ouverture. 2. Risque d'explosion : l'huile mélangée à l'air comprimé à haute température peut provoquer une explosion dite 'diesel' dans la tuyauterie de démarrage (le mélange air-huile s'enflamme spontanément). 3. Contamination moteur : l'huile entre dans les cylindres et perturbe la combustion. Causes : usure excessive des segments de piston du compresseur, niveau d'huile trop élevé dans le carter. Prévention : filtres séparateurs d'huile, surveillance de l'état des segments."},
      {q:"Qu'est-ce que la soupape de sûreté d'un compresseur et à quelle pression est-elle réglée ?",a:"La soupape de sûreté est un dispositif de protection obligatoire qui s'ouvre automatiquement pour évacuer l'excès de pression si la pression de service est dépassée. Elle protège le compresseur, les canalisations et les bouteilles contre les surpressions dangereuses. Réglage : la soupape de sûreté est réglée à 10% au-dessus de la pression maximale de service. Exemple : pour une bouteille de 25 bar, la soupape s'ouvre à 27,5 bar. Pour une bouteille de 30 bar, elle s'ouvre à 33 bar. La soupape doit être testée régulièrement (mensuelle/annuelle selon le PMS) et recalibrée si nécessaire. Son orifice de sortie doit être dirigé vers une zone sûre."},
      {q:"Quelle est la différence entre l'air de démarrage et l'air de service à bord ?",a:"Air de démarrage (Starting air) : haute pression (25-30 bar), stocké dans les bouteilles principales, utilisé pour démarrer le moteur principal et les gros auxiliaires. Circuit sécurisé SOLAS (12 démarrages minimum). Purgé et séché obligatoirement. Air de service (Service air / Working air) : basse pression (6-7 bar), produit par un compresseur de service indépendant, utilisé pour les outils pneumatiques, le nettoyage, la commande des vannes automatiques, le gonflage, les instruments. Circuit non pressurisé en permanence. Air instrument (Instrument air) : très sec et propre (point de rosée < -40°C), pression 6-7 bar, utilisé pour les instruments de mesure pneumatiques et les automates. Traitement supplémentaire par sécheur à adsorption."},
      {q:"Comment vérifier l'efficacité d'un réfrigérant interétage (intercooler) sur un compresseur ?",a:"Vérification de l'efficacité de l'intercooler : 1. Mesure des températures : comparer la température d'entrée et de sortie de l'air. Un intercooler efficace doit ramener la température de l'air à moins de 40-50°C au-dessus de la température de l'eau de refroidissement (approche thermique). 2. Mesure des pressions : la perte de charge à travers l'intercooler ne doit pas dépasser 0,3 bar. 3. Contrôle de l'eau de refroidissement : vérifier le débit et la température (entrée et sortie). 4. Analyse de l'eau de condensat : la quantité d'eau purgée après l'intercooler indique son efficacité de refroidissement. Un intercooler encrassé (tartre, huile) a une efficacité réduite et entraîne des températures trop élevées au 2ème étage."},
      {q:"Quels tests doit-on effectuer sur une bouteille d'air comprimé et à quelle fréquence ?",a:"Tests sur les bouteilles d'air comprimé : Test de pression hydrostatique (tous les 5 ans) : la bouteille est remplie d'eau (pas d'air) et pressurisée à 1,5× la pression de service. Permet de détecter les fissures et déformations. Inspection visuelle interne (tous les 2,5 ans) : inspection endoscopique de l'intérieur pour détecter la corrosion, les dépôts et les fissures. Vérification des équipements : soupape de sûreté (annuelle), manomètre (annuelle), robinet de purge (mensuelle). Ces tests sont obligatoires selon les règlements de la société de classification et doivent être documentés. Les bouteilles hors normes doivent être déclassées ou remplacées."},
      {q:"Qu'est-ce que le point de rosée de l'air comprimé et pourquoi est-il important ?",a:"Le point de rosée est la température à laquelle la vapeur d'eau contenue dans l'air comprimé commence à se condenser en eau liquide. Il dépend de la teneur en humidité et de la pression. Exemple : air à 25 bar avec point de rosée à +20°C signifie que l'eau condensera dans toute partie du circuit dont la température est inférieure à 20°C. Importance : un point de rosée trop élevé entraîne formation d'eau liquide dans les conduites (corrosion, gel par temps froid, coup d'eau), défaillance des instruments pneumatiques (eau dans les capteurs), corrosion des bouteilles. Norme : air instrument : point de rosée < -40°C (sécheur à adsorption nécessaire). Air de service : point de rosée < +3°C. Mesure : hygromètre ou point de rosée-mètre."},
      {q:"Comment fonctionne le démarrage pneumatique d'un moteur diesel principal ?",a:"Démarrage pneumatique du moteur principal : 1. Condition préalable : vérifier que le virage au vireur a été effectué (pas de coup d'eau), vanne d'air de démarrage principale ouverte, pression des bouteilles suffisante (min 15-17 bar selon constructeur). 2. Ordre de démarrage : l'opérateur agit sur le télégraphe ou le pupitre. Le distributeur d'air de démarrage (starting air distributor) répartit l'air dans les vannes de démarrage de chaque cylindre dans l'ordre d'allumage. 3. Démarrage : l'air à 25-30 bar est injecté dans les cylindres l'un après l'autre, faisant tourner le vilebrequin. Quand la vitesse est suffisante (~80-100 tr/min), le combustible est injecté et le moteur démarre. 4. Après démarrage : les vannes de démarrage se ferment, les bouteilles sont rechargées par les compresseurs."},
      {q:"Quelles précautions prendre lors de l'ouverture d'un circuit d'air comprimé à haute pression ?",a:"Précautions obligatoires : 1. Dépressurisation complète : vérifier que la pression est à 0 bar sur TOUS les manomètres du circuit concerné. 2. Isolement : fermer les vannes de sectionnement en amont et en aval, mettre en place des brides d'obturation si nécessaire. 3. Attente du refroidissement : ne pas ouvrir un circuit chaud (brûlures et risque d'auto-inflammation des huiles). 4. Utilisation d'équipements adaptés : clés dynamométriques calibrées, joints neufs (jamais réutiliser un vieux joint). 5. Contrôle des boulons : vérifier l'état de tous les boulons de bride (corrosion, filetage). 6. Remontage progressif : remontrer boulons par boulons en croix, retester l'étanchéité à basse pression avant montée en pression. 7. Test d'étanchéité : monter progressivement en pression et vérifier l'absence de fuites à chaque palier."},
    ],
    en:[
      {q:"Why must starting air bottles be drained before each main engine start?",a:"Starting air bottles must be drained before each start to remove condensed water that accumulates at the bottom. If this water enters main engine cylinders with starting air, it can cause a water slug: water being incompressible causes instant overpressure that can bend or break connecting rods and pistons. Draining also removes oil traces from the compressor. Procedure: open the drain cock at the bottle bottom until only dry air exits."},
      {q:"What is the SOLAS statutory pressure for starting air bottles?",a:"Per SOLAS, starting air bottles must have sufficient capacity for at least 12 consecutive main engine starts without recharging. Service pressure is generally 25-30 bar. Each bottle is equipped with a safety valve set at 10% above service pressure (approximately 27.5 to 33 bar), a visible pressure gauge, drain cock and isolation valve. Bottles are subject to periodic hydrostatic tests (every 5 years)."},
      {q:"Explain the compression cycle of a two-stage piston compressor.",a:"Stage 1 (Low pressure): Atmospheric air enters at 1 bar through suction filter. Piston descends (suction) and rises (compression). First-stage delivery valve opens when pressure reaches ~5-7 bar. Air is sent to intercooler where temperature is reduced to ~40°C. Stage 2 (High pressure): Cooled, denser air enters HP cylinder. Piston compresses to 25-30 bar. Air is cooled in aftercooler. Condensed water is separated before reaching the bottle."},
      {q:"What is an automatic drain and how does it work on a compressed air circuit?",a:"An automatic drain removes condensed water and impurities from a compressed air circuit without allowing compressed air to escape. Main types: Float drain: a float rises with accumulated water and automatically opens a drain valve at a set level. Electronic drain: timed opening (e.g. every 30 minutes for 5 seconds). Thermodynamic drain: uses pressure and temperature differences between air and condensate. On a compressor: drains are placed on intermediate vessels, final separator and bottle. A faulty drain allows water accumulation, risking water slug or corrosion."},
      {q:"What are the consequences of oil contamination in starting air?",a:"Oil contamination in starting air causes: 1. Deposits in starting valves: burned oil forms carbon deposits that can clog cylinder starting valves, preventing opening. 2. Explosion risk: oil mixed with high-temperature compressed air can cause a 'diesel' explosion in starting piping (air-oil mixture ignites spontaneously). 3. Engine contamination: oil enters cylinders and disrupts combustion. Causes: excessive compressor piston ring wear, crankcase oil level too high. Prevention: oil separator filters, ring condition monitoring."},
      {q:"What is the compressor safety valve and at what pressure is it set?",a:"The safety valve is a mandatory protection device that automatically opens to vent excess pressure if service pressure is exceeded. It protects compressor, piping and bottles from dangerous overpressure. Setting: safety valve set at 10% above maximum service pressure. Example: 25 bar bottle → opens at 27.5 bar; 30 bar bottle → opens at 33 bar. Must be tested regularly (monthly/annual per PMS) and recalibrated if needed. Discharge must be directed to a safe area."},
      {q:"What is the difference between starting air and service air on board?",a:"Starting air: high pressure (25-30 bar), stored in main bottles, used to start main engine and large auxiliaries. SOLAS-secured circuit (minimum 12 starts). Mandatory draining and drying. Service air (working air): low pressure (6-7 bar), produced by independent service compressor, used for pneumatic tools, cleaning, automatic valve control, inflation, instruments. Instrument air: very dry and clean (dew point < -40°C), 6-7 bar, used for pneumatic measurement instruments and controllers. Additional treatment by adsorption dryer."},
      {q:"How to check intercooler effectiveness on a compressor?",a:"Intercooler effectiveness checks: 1. Temperature measurement: compare air inlet and outlet temperatures. Effective intercooler should reduce air temperature to within 40-50°C of cooling water temperature (thermal approach). 2. Pressure measurement: pressure drop through intercooler must not exceed 0.3 bar. 3. Cooling water check: verify flow and temperature (inlet and outlet). 4. Condensate water analysis: quantity drained after intercooler indicates cooling effectiveness. A fouled intercooler (scale, oil) has reduced efficiency, causing excessive second-stage temperatures."},
      {q:"What tests must be performed on compressed air bottles and how frequently?",a:"Compressed air bottle tests: Hydrostatic pressure test (every 5 years): bottle filled with water (not air) and pressurised to 1.5× service pressure. Detects cracks and deformation. Internal visual inspection (every 2.5 years): endoscopic inspection for corrosion, deposits and cracks. Equipment checks: safety valve (annual), pressure gauge (annual), drain cock (monthly). Mandatory per classification society regulations and must be documented. Non-conforming bottles must be downgraded or replaced."},
      {q:"What is the dew point of compressed air and why is it important?",a:"The dew point is the temperature at which water vapour in compressed air begins to condense. Depends on moisture content and pressure. Importance: high dew point causes liquid water in pipes (corrosion, freezing in cold weather, water slug), pneumatic instrument failure, bottle corrosion. Standards: instrument air dew point < -40°C (adsorption dryer required); service air dew point < +3°C. Measured with hygrometer or dew point meter."},
      {q:"How does pneumatic starting of a main diesel engine work?",a:"Main engine pneumatic starting: 1. Prerequisite: verify turning gear operation (no water slug), main starting air valve open, bottle pressure sufficient (min 15-17 bar per maker). 2. Start order: operator acts on telegraph or control console. Starting air distributor sequences air to each cylinder starting valve in firing order. 3. Starting: 25-30 bar air injected cylinder by cylinder, turning the crankshaft. When speed is sufficient (~80-100 rpm), fuel is injected and engine starts. 4. After start: starting valves close, bottles recharged by compressors."},
      {q:"What precautions when opening a high-pressure compressed air circuit?",a:"Mandatory precautions: 1. Full depressurisation: verify pressure = 0 bar on ALL circuit gauges. 2. Isolation: close upstream/downstream valves, fit blank flanges if needed. 3. Allow cooling: do not open hot circuits (burns and oil auto-ignition risk). 4. Appropriate equipment: calibrated torque wrenches, new gaskets (never reuse old gaskets). 5. Bolt check: inspect all flange bolts (corrosion, threading). 6. Progressive reassembly: cross-tighten bolts, retest at low pressure before raising. 7. Leak test: raise pressure progressively, check for leaks at each step."},
    ],
    es:[
      {q:"¿Por qué las botellas de aire de arranque deben purgarse antes de cada arranque del motor principal?",a:"Para eliminar el agua condensada acumulada en el fondo. Si entra en los cilindros con el aire de arranque puede causar un golpe de agua: el agua al ser incompresible provoca una sobrepresión instantánea que puede doblar o romper las bielas. La purga también elimina trazas de aceite. Procedimiento: abrir el grifo de purga hasta que salga solo aire seco."},
      {q:"¿Cuál es la presión reglamentaria de las botellas de aire de arranque según SOLAS?",a:"Las botellas deben tener capacidad para al menos 12 arranques consecutivos sin recargar. Presión de servicio: 25-30 bar. Cada botella lleva válvula de seguridad al 10% por encima de la presión de servicio, manómetro, grifo de purga y válvula de seccionamiento. Pruebas hidrostáticas cada 5 años."},
      {q:"Explique el ciclo de compresión de un compresor de pistones de dos etapas.",a:"Etapa 1 (BP): El aire atmosférico entra a 1 bar. El pistón aspira y comprime hasta ~5-7 bar. El aire va al intercooler. Etapa 2 (AP): El aire enfriado y más denso entra al cilindro AP. El pistón comprime hasta 25-30 bar. El agua condensada se separa antes de llegar a la botella."},
      {q:"¿Qué es un purgador automático y cómo funciona en un circuito de aire comprimido?",a:"Dispositivo que elimina automáticamente el agua condensada sin dejar escapar aire. Tipos: purgador de flotador (nivel de agua activa la apertura), electrónico (apertura temporizada), termodinámico. Los purgadores se colocan en los depósitos intermedios, separador final y botella."},
      {q:"¿Cuáles son las consecuencias de la contaminación por aceite en el aire de arranque?",a:"1. Depósitos en las válvulas de arranque (tapado por aceite quemado). 2. Riesgo de explosión (mezcla aire-aceite a alta temperatura). 3. Contaminación del motor. Causas: desgaste de segmentos, nivel de aceite demasiado alto. Prevención: filtros separadores de aceite."},
      {q:"¿Qué es la válvula de seguridad de un compresor y a qué presión se ajusta?",a:"Dispositivo de protección obligatorio que se abre automáticamente para evacuar el exceso de presión. Se ajusta al 10% por encima de la presión máxima de servicio. Ejemplo: botella de 25 bar → se abre a 27,5 bar. Probar mensual/anualmente."},
      {q:"¿Cuál es la diferencia entre aire de arranque y aire de servicio a bordo?",a:"Aire de arranque: alta presión (25-30 bar), botellas principales, motor principal. SOLAS (12 arranques mínimo). Aire de servicio: baja presión (6-7 bar), herramientas neumáticas, limpieza, mandos. Aire instrumento: muy seco (punto de rocío < -40°C), instrumentos de medida."},
      {q:"¿Cómo verificar la eficiencia de un refrigerante interetapa (intercooler)?",a:"1. Medición de temperaturas: el intercooler debe reducir la temperatura del aire a menos de 40-50°C por encima de la temperatura del agua de refrigeración. 2. Caída de presión: no debe superar 0,3 bar. 3. Control del agua de refrigeración: caudal y temperatura. 4. Cantidad de agua purgada tras el intercooler."},
      {q:"¿Qué pruebas deben realizarse en las botellas de aire comprimido?",a:"Prueba hidrostática (cada 5 años): llena de agua a 1,5× la presión de servicio. Inspección visual interna (cada 2,5 años). Verificación de válvula de seguridad (anual), manómetro (anual), grifo de purga (mensual)."},
      {q:"¿Qué es el punto de rocío del aire comprimido y por qué es importante?",a:"Temperatura a la que el vapor de agua del aire comprimido empieza a condensarse. Un punto de rocío alto causa agua líquida en tuberías (corrosión, heladas, golpes de agua) y fallo de instrumentos neumáticos. Norma: aire instrumento < -40°C; aire de servicio < +3°C."},
      {q:"¿Cómo funciona el arranque neumático de un motor diésel principal?",a:"1. Verificar virada con virador, válvula de aire abierta, presión mínima en botellas. 2. El distribuidor de aire secuencia las válvulas de arranque de cada cilindro. 3. El aire a 25-30 bar gira el cigüeñal hasta la velocidad de inyección (~80-100 rpm). 4. Las válvulas de arranque se cierran y las botellas se recargan."},
      {q:"¿Qué precauciones tomar al abrir un circuito de aire comprimido a alta presión?",a:"1. Despresurización completa (verificar 0 bar en manómetros). 2. Aislamiento con válvulas de seccionamiento. 3. Esperar el enfriamiento. 4. Herramientas calibradas, juntas nuevas. 5. Verificar todos los pernos de brida. 6. Montaje progresivo y prueba de estanqueidad."},
    ],
    pt:[
      {q:"Por que as garrafas de ar de arranque devem ser purgadas antes de cada arranque do motor principal?",a:"Para eliminar a água condensada acumulada no fundo. Se entrar nos cilindros com o ar de arranque pode causar um golpe de água: a água sendo incompressível provoca sobrepressão instantânea que pode dobrar ou partir as bielas. A purga também elimina traços de óleo. Procedimento: abrir a torneira de purga até sair apenas ar seco."},
      {q:"Qual é a pressão regulamentar das garrafas de ar de arranque segundo o SOLAS?",a:"As garrafas devem ter capacidade para pelo menos 12 arranques consecutivos sem recarregar. Pressão de serviço: 25-30 bar. Cada garrafa tem válvula de segurança a 10% acima da pressão de serviço, manómetro, torneira de purga e válvula de seccionamento. Testes hidrostáticos de 5 em 5 anos."},
      {q:"Explique o ciclo de compressão de um compressor de pistões de dois estádios.",a:"Estádio 1 (BP): O ar atmosférico entra a 1 bar. O pistão aspira e comprime até ~5-7 bar. O ar vai ao intercooler. Estádio 2 (AP): O ar arrefecido e mais denso entra no cilindro AP. O pistão comprime até 25-30 bar. A água condensada é separada antes de chegar à garrafa."},
      {q:"O que é um purgador automático e como funciona num circuito de ar comprimido?",a:"Dispositivo que elimina automaticamente a água condensada sem deixar escapar ar. Tipos: purgador de flutuador, eletrónico (abertura temporizada), termodinâmico. Colocados nos reservatórios intermédios, separador final e garrafa."},
      {q:"Quais são as consequências da contaminação por óleo no ar de arranque?",a:"1. Depósitos nas válvulas de arranque (obstrução por óleo queimado). 2. Risco de explosão (mistura ar-óleo a alta temperatura). 3. Contaminação do motor. Causas: desgaste de segmentos, nível de óleo demasiado alto. Prevenção: filtros separadores de óleo."},
      {q:"O que é a válvula de segurança de um compressor e a que pressão está regulada?",a:"Dispositivo de proteção obrigatório que abre automaticamente para evacuar o excesso de pressão. Regulada a 10% acima da pressão máxima de serviço. Exemplo: garrafa de 25 bar → abre a 27,5 bar. Testar mensal/anualmente."},
      {q:"Qual é a diferença entre ar de arranque e ar de serviço a bordo?",a:"Ar de arranque: alta pressão (25-30 bar), garrafas principais, motor principal. SOLAS (12 arranques mínimo). Ar de serviço: baixa pressão (6-7 bar), ferramentas pneumáticas, limpeza, comandos. Ar instrumento: muito seco (ponto de orvalho < -40°C), instrumentos de medida."},
      {q:"Como verificar a eficiência de um arrefecedor interstadial (intercooler)?",a:"1. Medição de temperaturas: deve reduzir a temperatura do ar a menos de 40-50°C acima da temperatura da água de arrefecimento. 2. Queda de pressão: não deve exceder 0,3 bar. 3. Controlo da água de arrefecimento. 4. Quantidade de água purgada após o intercooler."},
      {q:"Que testes devem ser realizados nas garrafas de ar comprimido?",a:"Teste hidrostático (de 5 em 5 anos): cheias de água a 1,5× a pressão de serviço. Inspeção visual interna (de 2,5 em 2,5 anos). Verificação da válvula de segurança (anual), manómetro (anual), torneira de purga (mensal)."},
      {q:"O que é o ponto de orvalho do ar comprimido e por que é importante?",a:"Temperatura à qual o vapor de água do ar comprimido começa a condensar. Ponto de orvalho alto causa água líquida nas tubagens (corrosão, gelo, golpes de água) e falha de instrumentos pneumáticos. Norma: ar instrumento < -40°C; ar de serviço < +3°C."},
      {q:"Como funciona o arranque pneumático de um motor diesel principal?",a:"1. Verificar viramento com virante, válvula de ar aberta, pressão mínima nas garrafas. 2. O distribuidor de ar sequencia as válvulas de arranque de cada cilindro. 3. O ar a 25-30 bar roda o virabrequim até à velocidade de injeção (~80-100 rpm). 4. As válvulas de arranque fecham e as garrafas recarregam."},
      {q:"Que precauções tomar ao abrir um circuito de ar comprimido a alta pressão?",a:"1. Despressurização completa (verificar 0 bar nos manómetros). 2. Isolamento com válvulas de seccionamento. 3. Aguardar arrefecimento. 4. Ferramentas calibradas, vedantes novos. 5. Verificar todos os parafusos de flange. 6. Montagem progressiva e teste de estanqueidade."},
    ],
  };
  return banks[lang]||banks.fr;
}

function getQuiz(lang: string) {
  const quizzes: any = {
    fr:[
      {q:"À quelle pression sont chargées les bouteilles d'air de démarrage du moteur principal ?",opts:["6-7 bar","13-15 bar","25-30 bar","50-60 bar"],correct:2,exp:"Les bouteilles d'air de démarrage sont chargées à 25-30 bar pour fournir l'énergie suffisante au démarrage du moteur principal. Selon SOLAS, elles doivent permettre 12 démarrages consécutifs minimum."},
      {q:"Quel est le rôle du réfrigérant interétage (intercooler) sur un compresseur ?",opts:["Filtrer les impuretés de l'air","Refroidir l'air entre les étages pour améliorer le rendement","Séparer l'eau condensée","Augmenter la pression"],correct:1,exp:"L'intercooler refroidit l'air entre les étages de compression. Cela améliore le rendement (compression plus proche de l'isotherme), réduit la température (protection des joints et huiles) et augmente la densité de l'air entrant dans l'étage suivant."},
      {q:"Pourquoi doit-on purger les bouteilles d'air avant le démarrage du moteur principal ?",opts:["Pour augmenter la pression disponible","Pour éliminer l'eau condensée et éviter un coup d'eau","Pour refroidir l'air comprimé","Pour vérifier la pression"],correct:1,exp:"Les bouteilles doivent être purgées pour éliminer l'eau condensée accumulée. Si cette eau entre dans les cylindres avec l'air de démarrage, elle peut provoquer un coup d'eau qui brise les bielles et pistons."},
      {q:"À quel pourcentage au-dessus de la pression de service est réglée la soupape de sûreté d'un compresseur ?",opts:["5%","10%","20%","50%"],correct:1,exp:"La soupape de sûreté est réglée à 10% au-dessus de la pression maximale de service. Pour une bouteille de 25 bar, la soupape s'ouvre à 27,5 bar. Pour 30 bar, elle s'ouvre à 33 bar."},
      {q:"Quelle est la pression typique de l'air de service (service air) utilisé pour les outils et les commandes pneumatiques ?",opts:["1 bar","6-7 bar","25-30 bar","100 bar"],correct:1,exp:"L'air de service est à 6-7 bar, produit par un compresseur de service indépendant. Cette pression est suffisante pour les outils pneumatiques, les commandes de vannes automatiques et le nettoyage. L'air de démarrage (25-30 bar) est distinct et réservé aux démarrages."},
    ],
    en:[
      {q:"At what pressure are main engine starting air bottles charged?",opts:["6-7 bar","13-15 bar","25-30 bar","50-60 bar"],correct:2,exp:"Starting air bottles are charged to 25-30 bar to provide sufficient energy for main engine starting. Per SOLAS, they must allow a minimum of 12 consecutive starts."},
      {q:"What is the role of the intercooler on a compressor?",opts:["Filter air impurities","Cool air between stages to improve efficiency","Separate condensed water","Increase pressure"],correct:1,exp:"The intercooler cools air between compression stages. This improves efficiency (compression closer to isothermal), reduces temperature (protecting seals and oils) and increases air density entering the next stage."},
      {q:"Why must air bottles be drained before main engine starting?",opts:["To increase available pressure","To remove condensed water and prevent water slug","To cool the compressed air","To check pressure"],correct:1,exp:"Bottles must be drained to remove accumulated condensed water. If this water enters cylinders with starting air, it can cause a water slug that breaks connecting rods and pistons."},
      {q:"At what percentage above service pressure is a compressor safety valve set?",opts:["5%","10%","20%","50%"],correct:1,exp:"The safety valve is set at 10% above maximum service pressure. For a 25 bar bottle, it opens at 27.5 bar. For 30 bar, it opens at 33 bar."},
      {q:"What is the typical pressure of service air used for tools and pneumatic controls?",opts:["1 bar","6-7 bar","25-30 bar","100 bar"],correct:1,exp:"Service air is at 6-7 bar, produced by an independent service compressor. Sufficient for pneumatic tools, automatic valve controls and cleaning. Starting air (25-30 bar) is separate and reserved for starts."},
    ],
    es:[
      {q:"¿A qué presión se cargan las botellas de aire de arranque del motor principal?",opts:["6-7 bar","13-15 bar","25-30 bar","50-60 bar"],correct:2,exp:"Las botellas se cargan a 25-30 bar para proporcionar energía suficiente al arranque. Según SOLAS, deben permitir al menos 12 arranques consecutivos."},
      {q:"¿Cuál es la función del refrigerante interetapa (intercooler) en un compresor?",opts:["Filtrar las impurezas del aire","Enfriar el aire entre etapas para mejorar el rendimiento","Separar el agua condensada","Aumentar la presión"],correct:1,exp:"El intercooler enfría el aire entre etapas de compresión. Mejora el rendimiento, reduce la temperatura (protección de cierres y aceites) y aumenta la densidad del aire entrante."},
      {q:"¿Por qué hay que purgar las botellas de aire antes del arranque del motor principal?",opts:["Para aumentar la presión disponible","Para eliminar el agua condensada y evitar un golpe de agua","Para enfriar el aire comprimido","Para verificar la presión"],correct:1,exp:"Para eliminar el agua condensada acumulada. Si entra en los cilindros con el aire de arranque, puede causar un golpe de agua que rompe bielas y pistones."},
      {q:"¿Al qué porcentaje por encima de la presión de servicio se ajusta la válvula de seguridad?",opts:["5%","10%","20%","50%"],correct:1,exp:"La válvula de seguridad se ajusta al 10% por encima de la presión máxima de servicio. Para 25 bar, se abre a 27,5 bar. Para 30 bar, a 33 bar."},
      {q:"¿Cuál es la presión típica del aire de servicio usado para herramientas y mandos neumáticos?",opts:["1 bar","6-7 bar","25-30 bar","100 bar"],correct:1,exp:"El aire de servicio está a 6-7 bar, producido por un compresor de servicio independiente. Suficiente para herramientas neumáticas y mandos. El aire de arranque (25-30 bar) está reservado para los arranques."},
    ],
    pt:[
      {q:"A que pressão são carregadas as garrafas de ar de arranque do motor principal?",opts:["6-7 bar","13-15 bar","25-30 bar","50-60 bar"],correct:2,exp:"As garrafas são carregadas a 25-30 bar para fornecer energia suficiente ao arranque. Segundo o SOLAS, devem permitir pelo menos 12 arranques consecutivos."},
      {q:"Qual é o papel do arrefecedor interstadial (intercooler) num compressor?",opts:["Filtrar impurezas do ar","Arrefecer o ar entre estádios para melhorar o rendimento","Separar a água condensada","Aumentar a pressão"],correct:1,exp:"O intercooler arrefece o ar entre estádios de compressão. Melhora o rendimento, reduz a temperatura (proteção de vedações e óleos) e aumenta a densidade do ar entrante."},
      {q:"Por que se devem purgar as garrafas de ar antes do arranque do motor principal?",opts:["Para aumentar a pressão disponível","Para eliminar a água condensada e evitar um golpe de água","Para arrefecer o ar comprimido","Para verificar a pressão"],correct:1,exp:"Para eliminar a água condensada acumulada. Se entrar nos cilindros com o ar de arranque, pode causar um golpe de água que parte bielas e pistões."},
      {q:"A que percentagem acima da pressão de serviço está regulada a válvula de segurança?",opts:["5%","10%","20%","50%"],correct:1,exp:"A válvula de segurança está regulada a 10% acima da pressão máxima de serviço. Para 25 bar, abre a 27,5 bar. Para 30 bar, a 33 bar."},
      {q:"Qual é a pressão típica do ar de serviço usado para ferramentas e comandos pneumáticos?",opts:["1 bar","6-7 bar","25-30 bar","100 bar"],correct:1,exp:"O ar de serviço está a 6-7 bar, produzido por um compressor de serviço independente. Suficiente para ferramentas pneumáticas e comandos. O ar de arranque (25-30 bar) é distinto e reservado para arranques."},
    ],
  };
  return quizzes[lang]||quizzes.fr;
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
  const optColors=["#4da6ff","#e8b94f","#6dbf8a","#c084fc"];

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
      <button onClick={()=>onComplete(xp)} style={{width:"100%",padding:"15px 0",border:"none",borderRadius:14,background:"linear-gradient(135deg,#4da6ff,#c9922a)",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:"#060e1a",cursor:"pointer"}}>🔧 {l.finish}</button>
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

export default function LessonE2_L4({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t=T[lang]||T.fr;
  const [tab,setTab]=useState(0);
  const progress=[25,50,75,90][tab]||25;
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(77,166,255,0.2)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"6px 12px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>◀</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:2,color:"#4da6ff",marginBottom:2}}>{t.moduleLabel} · L4</div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:"#f0f4ff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.lessonTitle}</div>
          </div>
          <div style={{fontSize:11,color:"#e8b94f",fontFamily:"Courier New",flexShrink:0}}>{progress}%</div>
        </div>
        <div style={{height:2,background:"rgba(255,255,255,0.06)"}}>
          <div style={{height:"100%",background:"linear-gradient(90deg,#4da6ff,#c9922a)",width:`${progress}%`,transition:"width 0.4s"}}/>
        </div>
      </div>
      <div style={{padding:"10px 14px 0"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:8,background:"rgba(201,146,42,0.1)",border:"1px solid rgba(201,146,42,0.27)"}}>
          <span style={{fontSize:12}}>🔧</span>
          <span style={{fontFamily:"'Cinzel',serif",fontSize:9,color:"#c9922a",letterSpacing:1}}>MACHINE · AUXILIAIRES · PREMIUM</span>
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
