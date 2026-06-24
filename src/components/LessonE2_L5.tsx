// LessonE2_L5 — Purificateurs & Séparateurs | PART 1
import { useState } from "react";

const C = {
  purif:"#c084fc", sep:"#4da6ff", oil:"#e8b94f",
  water:"#6dbf8a", sludge:"#94a3b8", danger:"#f97316",
  gold:"#c9922a", gold2:"#e8b94f",
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  safe:"#6dbf8a", red:"#e74c3c",
};

const T: any = {
  fr:{
    moduleLabel:"MACHINE — AUXILIAIRES",
    lessonTitle:"Purificateurs & Séparateurs",
    intro:"Le fuel lourd (HFO) utilisé par les navires contient de l'eau, des sédiments et des impuretés qui doivent être éliminés avant la combustion. Les purificateurs centrifuges et séparateurs jouent un rôle crucial dans la préparation du combustible et des huiles de lubrification.",
    tabs:["📖 Contenu","✏️ Pratique","📚 Banque Q.","🎯 Quiz"],
    s1title:"🔄 Principe de la séparation centrifuge",
    s1hint:"👆 Tapez un type pour voir le principe",
    s2title:"⚙️ Composants d'un purificateur",
    s2hint:"👆 Tapez un composant pour sa description",
    s3title:"📋 Paramètres de réglage",
    s3hint:"👆 Tapez un paramètre pour les explications",
    s4title:"⚠️ Défauts & Alarmes",
    s4hint:"👆 Tapez un défaut pour les causes et remèdes",
    keypoints:"Points clés",
    kp:[
      "La séparation centrifuge utilise la différence de densité entre l'huile, l'eau et les sédiments",
      "Un purificateur (clarificateur) élimine l'eau et les sédiments par centrifugation",
      "La température d'opération du HFO doit être entre 85-98°C pour réduire la viscosité",
      "Le déversoir gravitique (gravity disc) détermine l'interface huile-eau — choix crucial",
      "Le bague de séparation (regulating ring) doit être remplacé si la séparation est inefficace",
    ],
    sepTypes:{
      purifier:{ name:"Purificateur (Purifier)", desc:"Élimine à la fois l'eau et les sédiments. Utilise un déversoir gravitique (gravity disc) pour maintenir l'interface huile-eau. Eau scellée (sealing water) requise pour créer le joint hydraulique. Utilisé pour le HFO et l'huile lubrifiante fortement contaminés.", outlet:"3 sorties : huile propre, eau + impuretés, boues" },
      clarifier:{ name:"Clarificateur (Clarifier)", desc:"Élimine uniquement les sédiments solides — pas d'eau libre. Pas de déversoir gravitique ni d'eau scellée. Utilisé quand le combustible contient peu d'eau. En pratique : souvent utilisé en 2ème étape après un purificateur.", outlet:"2 sorties : huile + eau (ensemble), boues solides" },
    },
    components:{
      bowl:{ name:"Bol centrifuge (Bowl)", desc:"Pièce maîtresse du purificateur. Tourne à très grande vitesse (6000-10000 tr/min). Contient les disques de séparation empilés. La force centrifuge y est 5000-10000 fois la gravité, permettant une séparation extrêmement efficace." },
      discs:{ name:"Disques de séparation (Separation discs)", desc:"Disques coniques empilés à angle (40-45°). Augmentent la surface de séparation effective. Le liquide monte entre les disques en couches minces, permettant une séparation rapide des phases. Un bol peut contenir 100-150 disques." },
      gravity_disc:{ name:"Déversoir gravitique (Gravity disc)", desc:"Anneau en acier inox à l'extrémité supérieure du bol qui détermine la position de l'interface huile-eau. Diamètre intérieur critique : trop grand → eau dans la sortie huile ; trop petit → huile dans la sortie eau. Choisi selon la densité du combustible." },
      sealing_water:{ name:"Eau scellée (Sealing water)", desc:"Eau ajoutée au début de l'opération pour créer le joint hydraulique entre l'huile et l'eau. Sans eau scellée, l'huile passerait directement dans la chambre eau. Doit être propre et douce (pas d'eau de mer)." },
      operating_water:{ name:"Eau de manœuvre (Operating water)", desc:"Eau sous pression utilisée pour commander l'ouverture et la fermeture du fond du bol lors des éjections de boues. Haute pression (6-8 bar), déclenchée automatiquement ou manuellement." },
      heater:{ name:"Réchauffeur (Heater)", desc:"Chauffe le combustible à la température d'opération (85-98°C pour HFO). Une température insuffisante → viscosité trop haute → mauvaise séparation. Une température excessive → vaporisation et risque d'incendie." },
    },
    parameters:{
      temperature:{ name:"Température d'opération", desc:"HFO : 85-98°C (selon viscosité). MDO/MGO : 40-50°C. Huile lubrifiante : 85-90°C. La température réduit la viscosité, améliorant la séparation. Contrôlée par un thermomètre et une vanne de régulation de vapeur." },
      flowrate:{ name:"Débit d'alimentation", desc:"Débit trop élevé → temps de séjour trop court → mauvaise séparation. Débit trop faible → économie d'énergie mais risque de débordement. Réglé entre 20-60% de la capacité nominale pour optimiser la séparation." },
      backpressure:{ name:"Contre-pression de sortie", desc:"Pression à la sortie huile (0,1-0,3 bar). Si trop haute → huile refoulée dans la chambre eau. Si trop basse → aspiration d'air. Contrôlée par une vanne d'étranglement sur la sortie." },
      ejection:{ name:"Intervalle d'éjection des boues", desc:"Durée entre deux éjections automatiques de boues. Dépend de la teneur en impuretés du combustible. Typique : 30-60 minutes. Un intervalle trop long → bol surchargé → huile dans les boues (pertes)." },
    },
    faults:{
      waterinoil:{ name:"Eau dans la sortie huile", cause:"Gravity disc trop large, débit trop élevé, température trop basse, eau scellée insuffisante, disques encrassés.", remedy:"Remplacer le gravity disc par un plus petit, réduire le débit, augmenter la température, vérifier l'eau scellée, nettoyer les disques." },
      oilinwater:{ name:"Huile dans la sortie eau", cause:"Gravity disc trop petit, joint hydraulique brisé (perte d'eau scellée), débit trop faible.", remedy:"Remplacer le gravity disc par un plus grand, vérifier et restaurer l'eau scellée, augmenter le débit." },
      vibration:{ name:"Vibrations excessives", cause:"Bol déséquilibré (accumulation de boues d'un côté), roulements usés, vitesse anormale.", remedy:"Éjecter les boues, nettoyer et équilibrer le bol, remplacer les roulements, vérifier la vitesse." },
      hightemp:{ name:"Température de sortie huile trop élevée", cause:"Vanne de vapeur bloquée ouverte, défaut du régulateur de température, surchauffe du réchauffeur.", remedy:"Régler la vanne de vapeur, vérifier le thermomètre et le régulateur, contrôler la pression de vapeur." },
    },
    practiceTitle:"Exercice pratique",
    questions:[
      { q:"Expliquez le principe de fonctionnement d'un purificateur centrifuge pour HFO. Pourquoi la force centrifuge est-elle si efficace ?",
        a:"Un purificateur centrifuge fait tourner le fuel à très grande vitesse (6000-10000 tr/min) dans un bol. La force centrifuge générée (5000 à 10000 fois la gravité) sépare les composants selon leur densité : Les particules solides (sédiments) les plus denses sont projetées contre la paroi extérieure du bol. L'eau (densité ~1,0) se dépose à l'extérieur des disques. L'huile (densité 0,9-0,99) remonte au centre et sort par le dessus. La force centrifuge est si efficace car elle est des milliers de fois plus puissante que la gravité. Une particule de 1 micron qui mettrait des heures à sédimenter par gravité se sépare en secondes dans un purificateur. Les disques empilés à 45° divisent le flux en couches minces, multipliant encore la surface de séparation et réduisant la distance que les particules doivent parcourir." },
      { q:"Comment choisir le bon gravity disc (déversoir gravitique) pour un purificateur de HFO ?",
        a:"Le gravity disc est choisi en fonction de la densité du combustible. Il existe des tables de sélection dans le manuel du fabricant. Principe : plus la densité du HFO est élevée, plus le diamètre intérieur du gravity disc doit être petit (pour maintenir l'interface huile-eau à la bonne position). Méthode de sélection : 1. Mesurer la densité du HFO à 15°C (ex : 0,990 g/cm³). 2. Mesurer la température d'opération (ex : 95°C). 3. Consulter la table de sélection pour choisir le diamètre correct. 4. Démarrer et vérifier : l'effluent eau doit être propre, l'huile sortie propre. Si de l'eau sort avec l'huile → gravity disc trop grand. Si de l'huile sort avec l'eau → gravity disc trop petit." },
      { q:"Qu'est-ce que l'eau scellée dans un purificateur et que se passe-t-il si elle disparaît pendant l'opération ?",
        a:"L'eau scellée (sealing water) est une couche d'eau douce qui crée le joint hydraulique entre la chambre à huile et la chambre à eau dans le bol du purificateur. Sans eau scellée, il n'y a pas de séparation : l'huile passerait directement dans la chambre eau. La quantité d'eau scellée détermine la position de l'interface huile-eau. Si l'eau scellée disparaît pendant l'opération : 1. L'interface huile-eau se brise. 2. L'huile envahit la chambre eau. 3. La sortie eau devient chargée en huile (pertes importantes). 4. Le purificateur perd son efficacité. Causes de perte d'eau scellée : débit d'alimentation trop élevé (l'eau est emportée), température trop basse (mauvaise séparation eau/huile), éjection accidentelle de l'eau scellée. Remède : arrêter l'alimentation, réinitialiser le joint hydraulique en réinjectant l'eau scellée." },
    ],
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
  },
  en:{
    moduleLabel:"ENGINE — AUXILIARIES",
    lessonTitle:"Purifiers & Separators",
    intro:"Heavy fuel oil (HFO) used by vessels contains water, sediments and impurities that must be removed before combustion. Centrifugal purifiers and separators play a crucial role in preparing fuel and lubricating oils.",
    tabs:["📖 Content","✏️ Practice","📚 Question Bank","🎯 Quiz"],
    s1title:"🔄 Centrifugal Separation Principle",
    s1hint:"👆 Tap a type to see the principle",
    s2title:"⚙️ Purifier Components",
    s2hint:"👆 Tap a component for its description",
    s3title:"📋 Operating Parameters",
    s3hint:"👆 Tap a parameter for explanations",
    s4title:"⚠️ Faults & Alarms",
    s4hint:"👆 Tap a fault for causes and remedies",
    keypoints:"Key Points",
    kp:[
      "Centrifugal separation uses density differences between oil, water and sediments",
      "A purifier (clarifier) removes water and sediments by centrifugation",
      "HFO operating temperature must be 85-98°C to reduce viscosity",
      "The gravity disc determines the oil-water interface — critical choice",
      "The regulating ring must be replaced if separation is ineffective",
    ],
    sepTypes:{
      purifier:{ name:"Purifier", desc:"Removes both water and sediments. Uses a gravity disc to maintain the oil-water interface. Sealing water required to create the hydraulic seal. Used for heavily contaminated HFO and lube oil.", outlet:"3 outlets: clean oil, water + impurities, sludge" },
      clarifier:{ name:"Clarifier", desc:"Removes solid sediments only — not free water. No gravity disc or sealing water. Used when fuel contains little water. In practice: often used as 2nd stage after a purifier.", outlet:"2 outlets: oil + water (together), solid sludge" },
    },
    components:{
      bowl:{ name:"Centrifuge bowl", desc:"Heart of the purifier. Rotates at very high speed (6000-10000 rpm). Contains stacked separation discs. Centrifugal force is 5000-10000 times gravity, enabling extremely effective separation." },
      discs:{ name:"Separation discs", desc:"Conical stacked discs at angle (40-45°). Increase effective separation surface. Liquid rises between discs in thin layers enabling rapid phase separation. A bowl may contain 100-150 discs." },
      gravity_disc:{ name:"Gravity disc", desc:"Stainless steel ring at the bowl top that determines the oil-water interface position. Critical bore diameter: too large → water in oil outlet; too small → oil in water outlet. Selected according to fuel density." },
      sealing_water:{ name:"Sealing water", desc:"Water added at start of operation to create the hydraulic seal between oil and water. Without sealing water, oil would pass directly into the water chamber. Must be clean and fresh (not seawater)." },
      operating_water:{ name:"Operating water", desc:"Pressurised water used to control bowl bottom opening/closing during sludge ejections. High pressure (6-8 bar), triggered automatically or manually." },
      heater:{ name:"Heater", desc:"Heats fuel to operating temperature (85-98°C for HFO). Insufficient temperature → viscosity too high → poor separation. Excessive temperature → vaporisation and fire risk." },
    },
    parameters:{
      temperature:{ name:"Operating temperature", desc:"HFO: 85-98°C (depending on viscosity). MDO/MGO: 40-50°C. Lube oil: 85-90°C. Temperature reduces viscosity, improving separation. Controlled by thermometer and steam control valve." },
      flowrate:{ name:"Feed flow rate", desc:"Too high → residence time too short → poor separation. Too low → energy saving but overflow risk. Set between 20-60% of nominal capacity to optimise separation." },
      backpressure:{ name:"Outlet back pressure", desc:"Pressure at oil outlet (0.1-0.3 bar). Too high → oil forced into water chamber. Too low → air ingestion. Controlled by throttle valve on outlet." },
      ejection:{ name:"Sludge ejection interval", desc:"Time between automatic sludge ejections. Depends on fuel impurity content. Typical: 30-60 minutes. Too long interval → overloaded bowl → oil in sludge (losses)." },
    },
    faults:{
      waterinoil:{ name:"Water in oil outlet", cause:"Gravity disc too large, flow rate too high, temperature too low, insufficient sealing water, fouled discs.", remedy:"Replace gravity disc with smaller, reduce flow, increase temperature, check sealing water, clean discs." },
      oilinwater:{ name:"Oil in water outlet", cause:"Gravity disc too small, broken hydraulic seal (sealing water loss), flow rate too low.", remedy:"Replace gravity disc with larger, check and restore sealing water, increase flow rate." },
      vibration:{ name:"Excessive vibrations", cause:"Unbalanced bowl (sludge accumulation on one side), worn bearings, abnormal speed.", remedy:"Eject sludge, clean and balance bowl, replace bearings, check speed." },
      hightemp:{ name:"Oil outlet temperature too high", cause:"Steam valve stuck open, temperature regulator fault, heater overheating.", remedy:"Adjust steam valve, check thermometer and regulator, check steam pressure." },
    },
    practiceTitle:"Practice Exercise",
    questions:[
      { q:"Explain the operating principle of a centrifugal HFO purifier. Why is centrifugal force so effective?",
        a:"A centrifugal purifier rotates fuel at very high speed (6000-10000 rpm) in a bowl. The centrifugal force generated (5000-10000 times gravity) separates components by density: solid particles (sediments) are thrown to the bowl outer wall. Water (density ~1.0) settles outside the discs. Oil (density 0.9-0.99) rises to the centre and exits from the top. Centrifugal force is so effective because it is thousands of times more powerful than gravity. A 1-micron particle that would take hours to settle by gravity separates in seconds in a purifier. The 45°-angled stacked discs split flow into thin layers, further multiplying separation surface and reducing the distance particles must travel." },
      { q:"How to choose the correct gravity disc for an HFO purifier?",
        a:"The gravity disc is chosen based on fuel density. Selection tables are in the manufacturer's manual. Principle: the higher the HFO density, the smaller the gravity disc bore must be (to maintain the oil-water interface at the correct position). Selection method: 1. Measure HFO density at 15°C (e.g. 0.990 g/cm³). 2. Measure operating temperature (e.g. 95°C). 3. Consult selection table for correct diameter. 4. Start and verify: water effluent must be clean, oil outlet clean. If water exits with oil → gravity disc too large. If oil exits with water → gravity disc too small." },
      { q:"What is sealing water in a purifier and what happens if it disappears during operation?",
        a:"Sealing water is a layer of fresh water that creates the hydraulic seal between the oil chamber and water chamber in the purifier bowl. Without sealing water, there is no separation: oil would pass directly into the water chamber. The sealing water quantity determines the oil-water interface position. If sealing water disappears during operation: 1. Oil-water interface breaks. 2. Oil invades water chamber. 3. Water outlet becomes oil-laden (significant losses). 4. Purifier loses effectiveness. Causes of sealing water loss: feed rate too high (water carried away), temperature too low (poor oil/water separation), accidental sealing water ejection. Remedy: stop feed, reinitialise hydraulic seal by reinjecting sealing water." },
    ],
    showAnswer:"Show answer", hideAnswer:"Hide",
  },
  es:{
    moduleLabel:"MÁQUINAS — AUXILIARES",
    lessonTitle:"Purificadores & Separadores",
    intro:"El fuel oil pesado (HFO) contiene agua, sedimentos e impurezas que deben eliminarse antes de la combustión. Los purificadores centrífugos y separadores juegan un papel crucial en la preparación del combustible y los aceites lubricantes.",
    tabs:["📖 Contenido","✏️ Práctica","📚 Banco Q.","🎯 Quiz"],
    s1title:"🔄 Principio de separación centrífuga",
    s1hint:"👆 Toca un tipo para ver el principio",
    s2title:"⚙️ Componentes de un purificador",
    s2hint:"👆 Toca un componente para su descripción",
    s3title:"📋 Parámetros de ajuste",
    s3hint:"👆 Toca un parámetro para las explicaciones",
    s4title:"⚠️ Fallos & Alarmas",
    s4hint:"👆 Toca un fallo para causas y remedios",
    keypoints:"Puntos clave",
    kp:[
      "La separación centrífuga usa la diferencia de densidad entre aceite, agua y sedimentos",
      "Un purificador (clarificador) elimina agua y sedimentos por centrifugación",
      "La temperatura de operación del HFO debe ser 85-98°C para reducir la viscosidad",
      "El disco de gravedad (gravity disc) determina la interfaz aceite-agua — elección crítica",
      "El anillo de separación debe reemplazarse si la separación es ineficaz",
    ],
    sepTypes:{
      purifier:{ name:"Purificador (Purifier)", desc:"Elimina tanto el agua como los sedimentos. Usa un disco de gravedad para mantener la interfaz aceite-agua. Requiere agua de sellado para crear el sello hidráulico. Usado para HFO y aceite lubricante muy contaminados.", outlet:"3 salidas: aceite limpio, agua + impurezas, lodos" },
      clarifier:{ name:"Clarificador (Clarifier)", desc:"Elimina solo los sedimentos sólidos — no el agua libre. Sin disco de gravedad ni agua de sellado. Usado cuando el combustible tiene poca agua. En la práctica: a menudo usado como 2ª etapa después de un purificador.", outlet:"2 salidas: aceite + agua (juntos), lodos sólidos" },
    },
    components:{
      bowl:{ name:"Cuenco centrífugo (Bowl)", desc:"Pieza principal del purificador. Gira a muy alta velocidad (6000-10000 rpm). Contiene los discos de separación apilados. La fuerza centrífuga es 5000-10000 veces la gravedad." },
      discs:{ name:"Discos de separación", desc:"Discos cónicos apilados a 40-45°. Aumentan la superficie de separación. El líquido asciende entre los discos en capas finas. Un cuenco puede contener 100-150 discos." },
      gravity_disc:{ name:"Disco de gravedad (Gravity disc)", desc:"Anillo de acero inox que determina la posición de la interfaz aceite-agua. Diámetro interior crítico: demasiado grande → agua en la salida de aceite; demasiado pequeño → aceite en la salida de agua." },
      sealing_water:{ name:"Agua de sellado (Sealing water)", desc:"Agua añadida al inicio para crear el sello hidráulico entre aceite y agua. Sin agua de sellado, el aceite pasaría directamente a la cámara de agua. Debe ser dulce y limpia." },
      operating_water:{ name:"Agua de maniobra", desc:"Agua a presión para controlar la apertura y cierre del fondo del cuenco durante las eyecciones de lodos. Alta presión (6-8 bar)." },
      heater:{ name:"Calentador (Heater)", desc:"Calienta el combustible a la temperatura de operación (85-98°C para HFO). Temperatura insuficiente → viscosidad alta → mala separación. Temperatura excesiva → vaporización y riesgo de incendio." },
    },
    parameters:{
      temperature:{ name:"Temperatura de operación", desc:"HFO: 85-98°C. MDO/MGO: 40-50°C. Aceite lubricante: 85-90°C. La temperatura reduce la viscosidad mejorando la separación." },
      flowrate:{ name:"Caudal de alimentación", desc:"Demasiado alto → tiempo de residencia corto → mala separación. Demasiado bajo → riesgo de desbordamiento. Ajustar entre 20-60% de la capacidad nominal." },
      backpressure:{ name:"Contrapresión de salida", desc:"Presión en la salida de aceite (0,1-0,3 bar). Demasiado alta → aceite empujado a cámara de agua. Demasiado baja → aspiración de aire." },
      ejection:{ name:"Intervalo de eyección de lodos", desc:"Tiempo entre eyecciones automáticas de lodos. Típico: 30-60 minutos. Intervalo demasiado largo → cuenco sobrecargado → aceite en los lodos." },
    },
    faults:{
      waterinoil:{ name:"Agua en la salida de aceite", cause:"Disco de gravedad demasiado grande, caudal muy alto, temperatura baja, agua de sellado insuficiente, discos sucios.", remedy:"Sustituir disco por uno más pequeño, reducir caudal, aumentar temperatura, verificar agua de sellado, limpiar discos." },
      oilinwater:{ name:"Aceite en la salida de agua", cause:"Disco de gravedad demasiado pequeño, sello hidráulico roto, caudal demasiado bajo.", remedy:"Sustituir disco por uno más grande, verificar y restaurar agua de sellado, aumentar caudal." },
      vibration:{ name:"Vibraciones excesivas", cause:"Cuenco desequilibrado (acumulación de lodos), rodamientos desgastados, velocidad anormal.", remedy:"Eyectar los lodos, limpiar y equilibrar el cuenco, sustituir rodamientos." },
      hightemp:{ name:"Temperatura de salida muy alta", cause:"Válvula de vapor bloqueada abierta, fallo del regulador de temperatura, sobrecalentamiento.", remedy:"Ajustar la válvula de vapor, verificar termómetro y regulador, controlar la presión de vapor." },
    },
    practiceTitle:"Ejercicio práctico",
    questions:[
      { q:"Explique el principio de funcionamiento de un purificador centrífugo para HFO. ¿Por qué la fuerza centrífuga es tan eficaz?",
        a:"Un purificador centrífugo hace girar el combustible a muy alta velocidad en un cuenco. La fuerza centrífuga generada (5000-10000 veces la gravedad) separa los componentes según su densidad: los sólidos se proyectan contra la pared exterior, el agua queda fuera de los discos, el aceite asciende al centro. La fuerza centrífuga es miles de veces más potente que la gravedad. Los discos apilados a 45° dividen el flujo en capas finas, multiplicando la superficie de separación." },
      { q:"¿Cómo elegir el disco de gravedad correcto para un purificador de HFO?",
        a:"El disco de gravedad se elige según la densidad del combustible. Principio: a mayor densidad del HFO, menor debe ser el diámetro interior del disco. Método: 1. Medir densidad a 15°C. 2. Medir temperatura de operación. 3. Consultar tabla de selección del fabricante. 4. Arrancar y verificar. Si agua sale con aceite → disco demasiado grande. Si aceite sale con agua → disco demasiado pequeño." },
      { q:"¿Qué es el agua de sellado en un purificador y qué sucede si desaparece durante la operación?",
        a:"El agua de sellado crea el sello hidráulico entre las cámaras de aceite y agua. Sin ella, el aceite pasaría directamente a la cámara de agua. Si desaparece: la interfaz aceite-agua se rompe, el aceite invade la cámara de agua, la salida de agua se carga en aceite. Causas: caudal demasiado alto, temperatura baja, eyección accidental. Remedio: parar la alimentación y reiniciar el sello hidráulico." },
    ],
    showAnswer:"Ver corrección", hideAnswer:"Ocultar",
  },
  pt:{
    moduleLabel:"MÁQUINAS — AUXILIARES",
    lessonTitle:"Purificadores & Separadores",
    intro:"O fuel oil pesado (HFO) contém água, sedimentos e impurezas que devem ser eliminados antes da combustão. Os purificadores centrífugos e separadores desempenham um papel crucial na preparação do combustível e dos óleos lubrificantes.",
    tabs:["📖 Conteúdo","✏️ Prática","📚 Banco Q.","🎯 Quiz"],
    s1title:"🔄 Princípio de separação centrífuga",
    s1hint:"👆 Toque num tipo para ver o princípio",
    s2title:"⚙️ Componentes de um purificador",
    s2hint:"👆 Toque num componente para a descrição",
    s3title:"📋 Parâmetros de regulação",
    s3hint:"👆 Toque num parâmetro para as explicações",
    s4title:"⚠️ Avarias & Alarmes",
    s4hint:"👆 Toque numa avaria para causas e remédios",
    keypoints:"Pontos-chave",
    kp:[
      "A separação centrífuga usa a diferença de densidade entre óleo, água e sedimentos",
      "Um purificador (clarificador) elimina água e sedimentos por centrifugação",
      "A temperatura de operação do HFO deve ser 85-98°C para reduzir a viscosidade",
      "O disco de gravidade (gravity disc) determina a interface óleo-água — escolha crítica",
      "O anel de separação deve ser substituído se a separação for ineficaz",
    ],
    sepTypes:{
      purifier:{ name:"Purificador", desc:"Elimina tanto a água como os sedimentos. Usa um disco de gravidade para manter a interface óleo-água. Requer água de vedação para criar o selo hidráulico. Usado para HFO e óleo lubrificante muito contaminados.", outlet:"3 saídas: óleo limpo, água + impurezas, lamas" },
      clarifier:{ name:"Clarificador", desc:"Elimina apenas os sedimentos sólidos — não a água livre. Sem disco de gravidade nem água de vedação. Usado quando o combustível tem pouca água. Na prática: usado como 2ª fase após um purificador.", outlet:"2 saídas: óleo + água (juntos), lamas sólidas" },
    },
    components:{
      bowl:{ name:"Tigela centrífuga (Bowl)", desc:"Peça principal do purificador. Roda a muito alta velocidade (6000-10000 rpm). Contém os discos de separação empilhados. A força centrífuga é 5000-10000 vezes a gravidade." },
      discs:{ name:"Discos de separação", desc:"Discos cónicos empilhados a 40-45°. Aumentam a superfície de separação. O líquido sobe entre os discos em camadas finas. Uma tigela pode ter 100-150 discos." },
      gravity_disc:{ name:"Disco de gravidade (Gravity disc)", desc:"Anel de aço inox que determina a posição da interface óleo-água. Diâmetro interior crítico: muito grande → água na saída de óleo; muito pequeno → óleo na saída de água." },
      sealing_water:{ name:"Água de vedação (Sealing water)", desc:"Água adicionada no início para criar o selo hidráulico entre óleo e água. Sem água de vedação, o óleo passaria diretamente para a câmara de água. Deve ser doce e limpa." },
      operating_water:{ name:"Água de manobra", desc:"Água sob pressão para controlar a abertura e fecho do fundo da tigela durante as ejeções de lamas. Alta pressão (6-8 bar)." },
      heater:{ name:"Aquecedor (Heater)", desc:"Aquece o combustível à temperatura de operação (85-98°C para HFO). Temperatura insuficiente → viscosidade alta → má separação. Temperatura excessiva → vaporização e risco de incêndio." },
    },
    parameters:{
      temperature:{ name:"Temperatura de operação", desc:"HFO: 85-98°C. MDO/MGO: 40-50°C. Óleo lubrificante: 85-90°C. A temperatura reduz a viscosidade melhorando a separação." },
      flowrate:{ name:"Caudal de alimentação", desc:"Demasiado alto → tempo de permanência curto → má separação. Demasiado baixo → risco de transbordo. Ajustar entre 20-60% da capacidade nominal." },
      backpressure:{ name:"Contrapressão de saída", desc:"Pressão na saída de óleo (0,1-0,3 bar). Demasiado alta → óleo empurrado para câmara de água. Demasiado baixa → aspiração de ar." },
      ejection:{ name:"Intervalo de ejeção de lamas", desc:"Tempo entre ejeções automáticas de lamas. Típico: 30-60 minutos. Intervalo demasiado longo → tigela sobrecarregada → óleo nas lamas." },
    },
    faults:{
      waterinoil:{ name:"Água na saída de óleo", cause:"Disco de gravidade muito grande, caudal muito alto, temperatura baixa, água de vedação insuficiente, discos sujos.", remedy:"Substituir disco por um mais pequeno, reduzir caudal, aumentar temperatura, verificar água de vedação, limpar discos." },
      oilinwater:{ name:"Óleo na saída de água", cause:"Disco de gravidade muito pequeno, selo hidráulico rompido, caudal muito baixo.", remedy:"Substituir disco por um maior, verificar e restaurar água de vedação, aumentar caudal." },
      vibration:{ name:"Vibrações excessivas", cause:"Tigela desequilibrada (acumulação de lamas), rolamentos desgastados, velocidade anormal.", remedy:"Ejetar as lamas, limpar e equilibrar a tigela, substituir rolamentos." },
      hightemp:{ name:"Temperatura de saída muito alta", cause:"Válvula de vapor bloqueada aberta, falha do regulador de temperatura, sobreaquecimento.", remedy:"Ajustar a válvula de vapor, verificar termómetro e regulador, controlar pressão de vapor." },
    },
    practiceTitle:"Exercício prático",
    questions:[
      { q:"Explique o princípio de funcionamento de um purificador centrífugo para HFO. Por que a força centrífuga é tão eficaz?",
        a:"Um purificador centrífugo faz rodar o combustível a muito alta velocidade numa tigela. A força centrífuga gerada (5000-10000 vezes a gravidade) separa os componentes por densidade: os sólidos são projetados para a parede exterior, a água deposita-se fora dos discos, o óleo sobe ao centro. A força centrífuga é milhares de vezes mais poderosa que a gravidade. Os discos empilhados a 45° dividem o fluxo em camadas finas, multiplicando a superfície de separação." },
      { q:"Como escolher o disco de gravidade correto para um purificador de HFO?",
        a:"O disco de gravidade é escolhido conforme a densidade do combustível. Princípio: quanto maior a densidade do HFO, menor deve ser o diâmetro interior. Método: 1. Medir densidade a 15°C. 2. Medir temperatura de operação. 3. Consultar tabela do fabricante. 4. Arrancar e verificar. Se água sai com óleo → disco muito grande. Se óleo sai com água → disco muito pequeno." },
      { q:"O que é a água de vedação num purificador e o que acontece se desaparecer durante a operação?",
        a:"A água de vedação cria o selo hidráulico entre as câmaras de óleo e água. Sem ela, o óleo passaria diretamente para a câmara de água. Se desaparecer: a interface óleo-água rompe-se, o óleo invade a câmara de água, a saída de água fica carregada de óleo. Causas: caudal muito alto, temperatura baixa, ejeção acidental. Remédio: parar a alimentação e reiniciar o selo hidráulico." },
    ],
    showAnswer:"Ver correção", hideAnswer:"Ocultar",
  },
};

// ── SVG 1 — SEPARATION TYPES ──────────────────────────────────
function SepTypesSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("purifier");
  const types = t.sepTypes;
  const typeColors: Record<string,string> = {purifier:C.purif, clarifier:C.sep};

  const svgs: Record<string,JSX.Element> = {
    purifier:(
      <g>
        {/* Bowl outline */}
        <ellipse cx="80" cy="80" rx="55" ry="65" fill={C.purif} opacity={0.08} stroke={C.purif} strokeWidth="1.5"/>
        {/* Discs */}
        {[55,65,75,85,95].map((y,i)=>(
          <line key={i} x1={80-35+i*2} y1={y} x2={80+35-i*2} y2={y} stroke={C.purif} strokeWidth="1.5" opacity={0.6}/>
        ))}
        {/* Oil zone (center) */}
        <ellipse cx="80" cy="70" rx="18" ry="40" fill={C.oil} opacity={0.3}/>
        <text x="80" y="72" fontSize="7" fill={C.oil} fontFamily="Courier New" textAnchor="middle">OIL</text>
        {/* Water zone (outer) */}
        <text x="115" y="90" fontSize="7" fill={C.water} fontFamily="Courier New">H₂O</text>
        {/* Sludge (bottom) */}
        <ellipse cx="80" cy="138" rx="35" ry="8" fill={C.sludge} opacity={0.5}/>
        <text x="80" y="141" fontSize="6" fill={C.sludge} fontFamily="Courier New" textAnchor="middle">SLUDGE</text>
        {/* Gravity disc */}
        <ellipse cx="80" cy="30" rx="20" ry="5" fill="none" stroke={C.purif} strokeWidth="2"/>
        <text x="80" y="22" fontSize="6" fill={C.purif} fontFamily="Courier New" textAnchor="middle">GRAVITY DISC</text>
        {/* Outlets */}
        <line x1="80" y1="15" x2="80" y2="5" stroke={C.oil} strokeWidth="2"/>
        <text x="80" y="3" fontSize="6" fill={C.oil} fontFamily="Courier New" textAnchor="middle">→ CLEAN OIL</text>
        <line x1="135" y1="80" x2="150" y2="80" stroke={C.water} strokeWidth="2"/>
        <text x="152" y="83" fontSize="6" fill={C.water} fontFamily="Courier New">→ WATER</text>
        <text x="80" y="155" fontSize="7" fill={C.purif} fontFamily="Courier New" textAnchor="middle">PURIFIER — 3 OUTLETS</text>
      </g>
    ),
    clarifier:(
      <g>
        <ellipse cx="80" cy="80" rx="55" ry="65" fill={C.sep} opacity={0.08} stroke={C.sep} strokeWidth="1.5"/>
        {[55,65,75,85,95].map((y,i)=>(
          <line key={i} x1={80-35+i*2} y1={y} x2={80+35-i*2} y2={y} stroke={C.sep} strokeWidth="1.5" opacity={0.6}/>
        ))}
        {/* Oil+water zone */}
        <ellipse cx="80" cy="70" rx="40" ry="40" fill={C.sep} opacity={0.15}/>
        <text x="80" y="65" fontSize="7" fill={C.sep} fontFamily="Courier New" textAnchor="middle">OIL+H₂O</text>
        <text x="80" y="77" fontSize="6" fill={C.sep} fontFamily="Courier New" textAnchor="middle">(together)</text>
        {/* Sludge */}
        <ellipse cx="80" cy="138" rx="35" ry="8" fill={C.sludge} opacity={0.5}/>
        <text x="80" y="141" fontSize="6" fill={C.sludge} fontFamily="Courier New" textAnchor="middle">SLUDGE ONLY</text>
        {/* No gravity disc */}
        <text x="80" y="22" fontSize="6" fill="rgba(240,244,255,0.3)" fontFamily="Courier New" textAnchor="middle">NO GRAVITY DISC</text>
        <line x1="80" y1="15" x2="80" y2="5" stroke={C.sep} strokeWidth="2"/>
        <text x="80" y="3" fontSize="6" fill={C.sep} fontFamily="Courier New" textAnchor="middle">→ OIL+WATER</text>
        <text x="80" y="155" fontSize="7" fill={C.sep} fontFamily="Courier New" textAnchor="middle">CLARIFIER — 2 OUTLETS</text>
      </g>
    ),
  };

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.purif}33`}}>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {Object.entries(types).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{flex:1,padding:"8px 4px",borderRadius:10,fontSize:11,cursor:"pointer",background:sel===key?`${typeColors[key]}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?typeColors[key]:"rgba(255,255,255,0.1)"}`,color:sel===key?typeColors[key]:"rgba(240,244,255,0.45)",fontFamily:"Courier New",textAlign:"center",fontWeight:sel===key?700:400}}>
            {key==="purifier"?"PURIFIER":"CLARIFIER"}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 160 165" style={{width:"100%",maxWidth:220,display:"block",margin:"0 auto",background:`${C.navy3}66`,borderRadius:8}}>
        {svgs[sel]}
      </svg>
      <div style={{marginTop:10,padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${typeColors[sel]||C.purif}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
        <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{types[sel].name}</div>
        <div style={{marginBottom:6}}>{types[sel].desc}</div>
        <div style={{fontSize:10,color:typeColors[sel],fontWeight:700}}>{types[sel].outlet}</div>
      </div>
    </div>
  );
}

// ── SVG 2 — COMPONENTS ────────────────────────────────────────
function ComponentsSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string|null>(null);
  const comps = t.components;
  const compColors: Record<string,string> = {
    bowl:C.purif, discs:C.sep, gravity_disc:C.oil,
    sealing_water:C.water, operating_water:C.sep, heater:C.danger,
  };
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.sep}33`}}>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
        {Object.entries(comps).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(sel===key?null:key)} style={{
            padding:"4px 8px",borderRadius:8,fontSize:10,cursor:"pointer",
            background:sel===key?`${compColors[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?compColors[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?compColors[key]:"rgba(240,244,255,0.45)",
            fontFamily:"Courier New",
          }}>{key==="bowl"?"BOWL":key==="discs"?"DISCS":key==="gravity_disc"?"G.DISC":key==="sealing_water"?"SEAL.W":key==="operating_water"?"OP.W":"HEATER"}</button>
        ))}
      </div>
      {sel&&(
        <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${compColors[sel]||C.sep}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
          <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{comps[sel].name}</div>
          {comps[sel].desc}
        </div>
      )}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)",padding:20}}>{t.s2hint}</div>}
    </div>
  );
}

// ── SVG 3 — PARAMETERS ────────────────────────────────────────
function ParametersSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("temperature");
  const params = t.parameters;
  const paramColors: Record<string,string> = {temperature:C.danger,flowrate:C.sep,backpressure:C.purif,ejection:C.oil};
  const icons: Record<string,string> = {temperature:"🌡️",flowrate:"💧",backpressure:"📊",ejection:"⏱️"};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.oil}33`}}>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {Object.entries(params).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{flex:1,padding:"8px 4px",borderRadius:10,fontSize:10,cursor:"pointer",background:sel===key?`${paramColors[key]}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?paramColors[key]:"rgba(255,255,255,0.1)"}`,color:sel===key?paramColors[key]:"rgba(240,244,255,0.45)",fontFamily:"Courier New",textAlign:"center"}}>
            <div style={{fontSize:16}}>{icons[key]}</div>
          </button>
        ))}
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${paramColors[sel]||C.oil}44`,minHeight:80}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:paramColors[sel]||C.oil,fontWeight:700,marginBottom:8}}>{icons[sel]} {params[sel].name}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{params[sel].desc}</div>
      </div>
    </div>
  );
}

// ── SVG 4 — FAULTS ────────────────────────────────────────────
function FaultsSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string|null>(null);
  const faults = t.faults;
  const faultColors: Record<string,string> = {waterinoil:C.water,oilinwater:C.oil,vibration:C.purif,hightemp:C.danger};
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
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)"}}>{t.s4hint}</div>}
    </div>
  );
}

// ── CONTENT TAB ───────────────────────────────────────────────
function ContentTab({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const section=(title:string,children:React.ReactNode,color=C.purif)=>(
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
      {section(t.s1title,<SepTypesSVG lang={lang}/>,C.purif)}
      {section(t.s2title,<ComponentsSVG lang={lang}/>,C.sep)}
      {section(t.s3title,<ParametersSVG lang={lang}/>,C.oil)}
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
        <div key={i} style={{marginBottom:14,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.purif}33`,overflow:"hidden"}}>
          <div style={{padding:"12px 14px"}}>
            <div style={{fontSize:10,color:C.purif,letterSpacing:1,marginBottom:6,fontFamily:"'Cinzel',serif"}}>Q{i+1}</div>
            <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>{q.q}</div>
          </div>
          <div style={{padding:"0 14px 12px"}}>
            <button onClick={()=>toggle(i)} style={{padding:"7px 14px",borderRadius:8,fontSize:11,cursor:"pointer",background:shown[i]?`${C.purif}22`:"rgba(255,255,255,0.06)",border:`1px solid ${shown[i]?C.purif:"rgba(255,255,255,0.15)"}`,color:shown[i]?C.purif:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{shown[i]?t.hideAnswer:t.showAnswer}</button>
            {shown[i]&&<div style={{marginTop:10,padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.purif}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{q.a}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
// LessonE2_L5 — PART 2: Bank + Quiz + Main

function getBank(lang: string) {
  const b: any = {
    fr:[
      {q:"Quelle est la différence entre un purificateur et un clarificateur ?",a:"Purificateur : élimine l'eau ET les sédiments. Nécessite un gravity disc et une eau scellée. 3 sorties : huile propre, eau/impuretés, boues. Utilisé pour le HFO et l'huile lubrifiante très contaminés. Clarificateur : élimine uniquement les sédiments solides. Pas de gravity disc ni d'eau scellée. 2 sorties : huile+eau (ensemble), boues solides. Utilisé quand la teneur en eau est faible ou comme 2ème étage après purificateur."},
      {q:"Pourquoi chauffe-t-on le HFO avant le purificateur ?",a:"Le HFO est chauffé à 85-98°C avant le purificateur pour : 1. Réduire la viscosité : le HFO à 50°C peut avoir une viscosité de 700 cSt, à 95°C elle tombe à 10-20 cSt. Plus le fluide est fluide, plus la séparation est efficace. 2. Améliorer la différence de densité : à haute température, la différence de densité entre huile et eau est plus prononcée. 3. Prévenir le colmatage : un HFO trop visqueux peut colmater les disques de séparation."},
      {q:"Comment fonctionne l'éjection des boues dans un purificateur ?",a:"L'éjection des boues (sludge discharge) est déclenchée automatiquement ou manuellement selon un intervalle programmé. Mécanisme : l'eau de manœuvre (operating water) à 6-8 bar est introduite sous le fond du bol. Cette pression pousse le piston de fond vers le bas, ouvrant des orifices périphériques. Les boues et l'eau accumulées dans la chambre extérieure sont éjectées centrifugalement en quelques secondes. Le fond se referme ensuite par ressort ou par eau de fermeture. Après éjection, l'eau scellée est réintroduite et l'alimentation reprend progressivement."},
      {q:"Qu'est-ce que le gravity disc et pourquoi est-il si important ?",a:"Le gravity disc est un anneau en acier inox au sommet du bol qui crée un déversoir pour l'eau. Son diamètre intérieur détermine la position de l'interface huile-eau (séparatrice). Si le diamètre est trop grand : l'interface se déplace trop loin vers le centre → l'eau pénètre dans la zone huile → eau dans la sortie huile. Si le diamètre est trop petit : l'interface se déplace trop loin vers l'extérieur → l'huile déborde dans la zone eau → huile dans la sortie eau. Choix : dépend de la densité du combustible et de la température d'opération. Chaque densité de HFO nécessite un gravity disc différent."},
      {q:"Quelles sont les vérifications à faire avant de démarrer un purificateur ?",a:"Avant démarrage d'un purificateur : 1. Vérifier le niveau d'huile des paliers et engrenages. 2. Ouvrir les vannes d'entrée et de sortie. 3. Vérifier la pression de l'eau de manœuvre (6-8 bar). 4. Vérifier la pression et température de la vapeur d'alimentation du réchauffeur. 5. S'assurer que le bon gravity disc est installé selon la densité du combustible. 6. Démarrer le moteur électrique et attendre que la vitesse soit stabilisée. 7. Introduire l'eau scellée (sealing water) pour créer le joint hydraulique. 8. Ouvrir progressivement l'alimentation en combustible. 9. Vérifier les sorties : huile propre côté huile, eau claire côté eau."},
      {q:"Qu'est-ce que la 'perte d'eau scellée' et comment la détecter ?",a:"La perte d'eau scellée se produit quand l'eau créant le joint hydraulique est entraînée par le flux d'alimentation ou éjectée accidentellement avec les boues. Conséquences : l'interface huile-eau disparaît, l'huile passe dans la chambre eau (pertes importantes), la sortie eau devient chargée en huile. Détection : inspection visuelle de la sortie eau (normalement claire → devient trouble ou colorée), alarme de haute teneur en huile dans les effluents (si équipé d'un détecteur), réduction du débit à la sortie huile. Solution : arrêter l'alimentation, rouvrir la vanne d'eau scellée, réintroduire l'eau scellée avant de reprendre."},
      {q:"Quelles sont les normes MARPOL concernant les effluents d'un séparateur eau-huile de cale ?",a:"MARPOL Annexe I impose des restrictions strictes sur le rejet des eaux huileuses de sentine : Teneur en huile maximale : 15 ppm (parties par million) pour les rejets en mer (à plus de 12 milles des côtes). Le rejet est interdit dans les eaux spéciales (Méditerranée, Baltique, mer Rouge...). Équipements obligatoires : OWS (Oily Water Separator) — séparateur eau-huile capable de traiter jusqu'à 15 ppm, dispositif de surveillance automatique de la teneur en huile (ODMCS — Oil Discharge Monitoring and Control System), alarme et arrêt automatique si > 15 ppm, registre des hydrocarbures (Oil Record Book) pour tracer tous les rejets. Les boues doivent être stockées et déchargées à quai."},
      {q:"Comment se fait l'entretien des disques de séparation d'un purificateur ?",a:"Nettoyage des disques (à chaque révision, généralement annuelle) : 1. Arrêter et démonter le bol selon la procédure du fabricant. 2. Déposer les disques empilés. 3. Trempage dans un solvant adapté (kérosène, solution alcaline chaude) pour dissoudre les dépôts de carbone et de gomme. 4. Nettoyage à la brosse douce — ne jamais utiliser d'outils métalliques qui raient les surfaces. 5. Rinçage à l'eau claire. 6. Inspection : jeter les disques déformés, corrodés ou fissurés. 7. Remontage en respectant l'ordre et le nombre de disques (le nombre influe sur la pression dans le bol). L'encrassement des disques réduit la surface efficace de séparation et détériore les performances."},
      {q:"Qu'est-ce que le 'sludge tank' et quel est son rôle à bord ?",a:"Le sludge tank (citerne à boues) est un réservoir qui collecte les boues éjectées par les purificateurs et les résidus de la séparation. Contenu : boues de HFO (résidus de purification), eau souillée en huile, traces de métaux et catalyseurs usés (dans les combustibles à faible teneur en soufre). Gestion : les boues sont incombustibles directement (trop de teneur en eau) mais peuvent être mélangées au HFO en petites quantités et brûlées dans l'incinérateur ou retraitées à terre. MARPOL interdit le rejet des boues en mer. Elles doivent être déchargées dans des installations portuaires (sludge reception facility). Le registre des hydrocarbures trace toutes les quantités de boues."},
      {q:"Comment optimiser la consommation d'énergie d'un purificateur ?",a:"Optimisation énergétique d'un purificateur : 1. Maintenir une température d'opération optimale (ni trop haute pour éviter le gaspillage de vapeur, ni trop basse pour la viscosité). 2. Régler le débit au bon niveau : un débit trop faible gaspille de l'énergie ; un débit excessif détériore la séparation. 3. Éjecter les boues à intervalles réguliers pour éviter le déséquilibre du bol (vibrations → pertes mécaniques). 4. Vérifier régulièrement l'état des roulements : des roulements usés augmentent la consommation. 5. Optimiser la durée de fonctionnement : en mer calme avec fuel propre, réduire la fréquence de purification. 6. Nettoyer régulièrement les disques pour maintenir les performances. Un purificateur bien entretenu consomme 30-40% moins d'énergie qu'un purificateur encrassé."},
      {q:"Quelles sont les alarmes typiques d'un purificateur et leurs causes ?",a:"Alarmes typiques : Alarme température basse : température de fonctionnement insuffisante → viscosité trop haute → mauvaise séparation. Vérifier la vanne de vapeur et le réchauffeur. Alarme vibrations élevées : bol déséquilibré (boues accumulées), roulements défectueux. Déclencher une éjection, inspecter les roulements. Alarme pression eau de manœuvre basse : pompe d'eau défectueuse, fuite. Vérifier la pompe et le circuit eau. Alarme flux eau de sortie trop élevé : gravity disc inadapté ou perte d'eau scellée. Vérifier et ajuster. Alarme moteur (surintensité) : surcharge (bol trop plein), problème mécanique. Déclencher une éjection, inspecter. Alarme vitesse basse : problème d'entraînement (courroies, friction). Vérifier la transmission."},
      {q:"Pourquoi purifier l'huile de lubrification et quels sont ses bénéfices ?",a:"Purification de l'huile lubrifiante : L'huile de lubrification du moteur principal se contamine progressivement avec : l'eau (condensation, fuite de circuit de refroidissement), les sédiments (poussière, produits de combustion), les métaux en suspension (usure des organes moteur). Sans purification : l'huile se dégrade rapidement, augmentant l'usure des paliers et cylindres, réduisant la durée de vie de l'huile. Avec purification régulière : allongement de la durée de vie de l'huile (x2 à x4), réduction des coûts de maintenance, protection des surfaces frottantes, détection précoce des anomalies (analyse de l'huile purifiée). Paramètres : température 85-90°C, débit faible (5-15% du volume par heure). L'huile est maintenue propre en permanence."},
    ],
    en:[
      {q:"What is the difference between a purifier and a clarifier?",a:"Purifier: removes water AND sediments. Requires gravity disc and sealing water. 3 outlets: clean oil, water/impurities, sludge. Used for heavily contaminated HFO and lube oil. Clarifier: removes solid sediments only. No gravity disc or sealing water. 2 outlets: oil+water (together), solid sludge. Used when water content is low or as 2nd stage after purifier."},
      {q:"Why is HFO heated before the purifier?",a:"HFO is heated to 85-98°C before the purifier to: 1. Reduce viscosity: HFO at 50°C can have 700 cSt viscosity; at 95°C it drops to 10-20 cSt. Thinner fluid separates more effectively. 2. Improve density difference: at high temperature, density difference between oil and water is more pronounced. 3. Prevent fouling: overly viscous HFO can clog separation discs."},
      {q:"How does sludge ejection work in a purifier?",a:"Sludge discharge is triggered automatically or manually per a programmed interval. Mechanism: operating water at 6-8 bar is introduced under the bowl bottom. This pressure pushes the bottom piston down, opening peripheral ports. Accumulated sludge and water are centrifugally ejected in seconds. The bottom then closes by spring or closing water. After ejection, sealing water is reintroduced and feed is gradually resumed."},
      {q:"What is the gravity disc and why is it so important?",a:"The gravity disc is a stainless steel ring at the bowl top creating a weir for water. Its bore diameter determines the oil-water interface position. Too large bore: interface moves too far inward → water enters oil zone → water in oil outlet. Too small bore: interface moves too far outward → oil overflows into water zone → oil in water outlet. Selection depends on fuel density and operating temperature. Each HFO density requires a different gravity disc."},
      {q:"What checks should be made before starting a purifier?",a:"Pre-start checks: 1. Check bearing and gear oil level. 2. Open inlet and outlet valves. 3. Check operating water pressure (6-8 bar). 4. Check heater steam pressure and temperature. 5. Ensure correct gravity disc installed per fuel density. 6. Start motor and wait for stable speed. 7. Introduce sealing water to create hydraulic seal. 8. Gradually open fuel feed. 9. Check outlets: clean oil side oil, clear water side."},
      {q:"What is 'sealing water loss' and how to detect it?",a:"Sealing water loss occurs when the hydraulic seal water is carried away by feed flow or accidentally ejected with sludge. Consequences: oil-water interface disappears, oil passes into water chamber (significant losses), water outlet becomes oil-laden. Detection: visual inspection of water outlet (normally clear → turns cloudy or coloured), high oil content alarm in effluents (if equipped), reduced oil outlet flow. Solution: stop feed, reopen sealing water valve, reintroduce sealing water before resuming."},
      {q:"What are MARPOL regulations regarding bilge water separator effluents?",a:"MARPOL Annex I imposes strict restrictions on oily bilge water discharge: Maximum oil content: 15 ppm for sea discharge (more than 12 nautical miles from coast). Discharge prohibited in special areas (Mediterranean, Baltic, Red Sea...). Mandatory equipment: OWS (Oily Water Separator) capable of treating to 15 ppm, automatic oil content monitoring device (ODMCS), automatic alarm and stop if > 15 ppm, Oil Record Book to trace all discharges. Sludge must be stored and discharged ashore."},
      {q:"How are purifier separation discs maintained?",a:"Disc cleaning (each overhaul, generally annual): 1. Stop and dismantle bowl per manufacturer procedure. 2. Remove stacked discs. 3. Soak in appropriate solvent (kerosene, hot alkaline solution) to dissolve carbon and gum deposits. 4. Clean with soft brush — never use metal tools that scratch surfaces. 5. Rinse with clean water. 6. Inspect: discard deformed, corroded or cracked discs. 7. Reassemble respecting disc order and number (number affects bowl pressure). Fouled discs reduce effective separation surface and deteriorate performance."},
      {q:"What is the sludge tank and what is its role on board?",a:"The sludge tank collects sludge ejected by purifiers and separation residues. Contents: HFO sludge (purification residues), oil-contaminated water, metal traces and spent catalysts. Management: sludge can be mixed with HFO in small quantities and burned in the incinerator or reprocessed ashore. MARPOL prohibits sludge discharge at sea. Must be discharged at port reception facilities. Oil Record Book tracks all sludge quantities."},
      {q:"How to optimise purifier energy consumption?",a:"Energy optimisation: 1. Maintain optimal operating temperature. 2. Set correct flow rate. 3. Eject sludge at regular intervals to prevent bowl imbalance. 4. Check bearing condition regularly. 5. Optimise running time: in calm weather with clean fuel, reduce purification frequency. 6. Clean discs regularly. A well-maintained purifier consumes 30-40% less energy than a fouled one."},
      {q:"What are typical purifier alarms and their causes?",a:"Typical alarms: Low temperature alarm: insufficient operating temperature → high viscosity → poor separation. Check steam valve and heater. High vibration alarm: unbalanced bowl (sludge build-up), defective bearings. Trigger ejection, inspect bearings. Low operating water pressure: defective pump, leak. Check pump and circuit. High water outlet flow: wrong gravity disc or sealing water loss. Check and adjust. Motor alarm (overcurrent): overloaded bowl, mechanical problem. Trigger ejection, inspect. Low speed alarm: drive problem (belts, friction). Check drive."},
      {q:"Why purify lubricating oil and what are the benefits?",a:"Lube oil purification: Main engine lube oil gradually becomes contaminated with water (condensation, cooling circuit leaks), sediments (dust, combustion products) and suspended metals (engine wear). Without purification: rapid oil degradation, increased bearing and cylinder wear. With regular purification: extended oil life (×2 to ×4), reduced maintenance costs, friction surface protection, early anomaly detection. Parameters: 85-90°C, low flow (5-15% volume/hour). Oil is kept clean continuously."},
    ],
    es:[
      {q:"¿Cuál es la diferencia entre un purificador y un clarificador?",a:"Purificador: elimina agua Y sedimentos. Necesita disco de gravedad y agua de sellado. 3 salidas: aceite limpio, agua/impurezas, lodos. Clarificador: elimina solo sedimentos sólidos. Sin disco de gravedad ni agua de sellado. 2 salidas: aceite+agua (juntos), lodos sólidos."},
      {q:"¿Por qué se calienta el HFO antes del purificador?",a:"Para reducir la viscosidad (a 95°C cae a 10-20 cSt), mejorar la diferencia de densidad entre aceite y agua, y prevenir el taponamiento de los discos."},
      {q:"¿Cómo funciona la eyección de lodos en un purificador?",a:"El agua de maniobra (6-8 bar) empuja el pistón de fondo hacia abajo, abriendo orificios periféricos. Los lodos y el agua acumulados se eyectan centrifugalmente en segundos. Después se reintroduce el agua de sellado y se reanuda la alimentación."},
      {q:"¿Qué es el disco de gravedad y por qué es tan importante?",a:"Anillo de acero inox que determina la posición de la interfaz aceite-agua. Demasiado grande → agua en la salida de aceite. Demasiado pequeño → aceite en la salida de agua. Se elige según la densidad del combustible."},
      {q:"¿Qué verificaciones hacer antes de arrancar un purificador?",a:"1. Nivel de aceite de los cojinetes. 2. Abrir válvulas. 3. Presión agua de maniobra (6-8 bar). 4. Vapor del calentador. 5. Disco de gravedad correcto. 6. Arrancar motor y estabilizar velocidad. 7. Introducir agua de sellado. 8. Abrir alimentación progresivamente. 9. Verificar salidas."},
      {q:"¿Qué es la 'pérdida de agua de sellado' y cómo detectarla?",a:"Ocurre cuando el agua de sellado es arrastrada o eyectada accidentalmente. La interfaz aceite-agua desaparece y el aceite pasa a la cámara de agua. Detección: salida de agua turbia o coloreada, alarma de alto contenido en aceite. Solución: parar alimentación, reintroducir agua de sellado."},
      {q:"¿Cuáles son las normas MARPOL sobre los efluentes del separador de aguas oleosas?",a:"MARPOL Anexo I: máximo 15 ppm para descarga en el mar (a más de 12 millas). Prohibido en zonas especiales. Equipos obligatorios: OWS, ODMCS, registro de hidrocarburos. Los lodos deben descargarse en instalaciones portuarias."},
      {q:"¿Cómo se realiza el mantenimiento de los discos de separación?",a:"1. Desmontar el cuenco. 2. Extraer los discos apilados. 3. Remojo en solvente adecuado. 4. Limpiar con cepillo suave. 5. Enjuagar. 6. Inspeccionar y desechar los dañados. 7. Remontar respetando el orden y número."},
      {q:"¿Qué es el 'sludge tank' y cuál es su función?",a:"Depósito que recoge los lodos eyectados por los purificadores. Contenido: lodos de HFO, agua sucia, metales. Los lodos no pueden verterse al mar (MARPOL). Deben descargarse en instalaciones portuarias. El registro de hidrocarburos rastrea todas las cantidades."},
      {q:"¿Cómo optimizar el consumo de energía de un purificador?",a:"Mantener temperatura óptima, ajustar caudal correcto, eyectar lodos regularmente, verificar rodamientos, limpiar discos. Un purificador bien mantenido consume un 30-40% menos que uno sucio."},
      {q:"¿Cuáles son las alarmas típicas de un purificador?",a:"Temperatura baja (viscosidad alta), vibraciones altas (desequilibrio, rodamientos), presión agua de maniobra baja, caudal de agua de salida alto (disco inadecuado), sobreintensidad del motor, velocidad baja."},
      {q:"¿Por qué purificar el aceite lubricante?",a:"El aceite lubricante se contamina con agua, sedimentos y metales. Sin purificación: degradación rápida, mayor desgaste. Con purificación regular: vida útil multiplicada por 2-4, reducción de costes de mantenimiento, protección de superficies de rozamiento."},
    ],
    pt:[
      {q:"Qual é a diferença entre um purificador e um clarificador?",a:"Purificador: elimina água E sedimentos. Necessita disco de gravidade e água de vedação. 3 saídas: óleo limpo, água/impurezas, lamas. Clarificador: elimina apenas sedimentos sólidos. Sem disco de gravidade nem água de vedação. 2 saídas: óleo+água (juntos), lamas sólidas."},
      {q:"Por que se aquece o HFO antes do purificador?",a:"Para reduzir a viscosidade (a 95°C cai para 10-20 cSt), melhorar a diferença de densidade entre óleo e água, e prevenir o entupimento dos discos."},
      {q:"Como funciona a ejeção de lamas num purificador?",a:"A água de manobra (6-8 bar) empurra o pistão do fundo para baixo, abrindo orifícios periféricos. As lamas e a água acumuladas são ejetadas centrifugamente em segundos. Depois reintroduz-se a água de vedação e retoma-se a alimentação."},
      {q:"O que é o disco de gravidade e por que é tão importante?",a:"Anel de aço inox que determina a posição da interface óleo-água. Muito grande → água na saída de óleo. Muito pequeno → óleo na saída de água. Escolhido conforme a densidade do combustível."},
      {q:"Que verificações fazer antes de arrancar um purificador?",a:"1. Nível de óleo dos rolamentos. 2. Abrir válvulas. 3. Pressão água de manobra (6-8 bar). 4. Vapor do aquecedor. 5. Disco de gravidade correto. 6. Arrancar motor e estabilizar velocidade. 7. Introduzir água de vedação. 8. Abrir alimentação progressivamente. 9. Verificar saídas."},
      {q:"O que é a 'perda de água de vedação' e como detetá-la?",a:"Ocorre quando a água de vedação é arrastada ou ejetada acidentalmente. A interface óleo-água desaparece e o óleo passa para a câmara de água. Deteção: saída de água turva ou colorida, alarme de alto teor de óleo. Solução: parar alimentação, reintroduzir água de vedação."},
      {q:"Quais são as normas MARPOL sobre os efluentes do separador de águas oleosas?",a:"MARPOL Anexo I: máximo 15 ppm para descarga no mar (a mais de 12 milhas). Proibido em zonas especiais. Equipamentos obrigatórios: OWS, ODMCS, registo de hidrocarbonetos. As lamas devem ser descarregadas em instalações portuárias."},
      {q:"Como se realiza a manutenção dos discos de separação?",a:"1. Desmontar a tigela. 2. Extrair os discos empilhados. 3. Imersão em solvente adequado. 4. Limpar com escova suave. 5. Enxaguar. 6. Inspecionar e descartar os danificados. 7. Remontar respeitando a ordem e número."},
      {q:"O que é o 'sludge tank' e qual é a sua função?",a:"Reservatório que recolhe as lamas ejetadas pelos purificadores. Conteúdo: lamas de HFO, água suja, metais. As lamas não podem ser descarregadas no mar (MARPOL). Devem ser descarregadas em instalações portuárias."},
      {q:"Como otimizar o consumo de energia de um purificador?",a:"Manter temperatura ótima, ajustar caudal correto, ejetar lamas regularmente, verificar rolamentos, limpar discos. Um purificador bem mantido consome 30-40% menos do que um sujo."},
      {q:"Quais são os alarmes típicos de um purificador?",a:"Temperatura baixa (viscosidade alta), vibrações altas (desequilíbrio, rolamentos), pressão água de manobra baixa, caudal de água de saída alto (disco inadequado), sobreintensidade do motor, velocidade baixa."},
      {q:"Por que purificar o óleo lubrificante?",a:"O óleo lubrificante contamina-se com água, sedimentos e metais. Sem purificação: degradação rápida, maior desgaste. Com purificação regular: vida útil multiplicada por 2-4, redução de custos de manutenção, proteção das superfícies de atrito."},
    ],
  };
  return b[lang]||b.fr;
}

function getQuiz(lang: string) {
  const q: any = {
    fr:[
      {q:"À quelle température faut-il chauffer le HFO pour optimiser la séparation dans un purificateur ?",opts:["40-50°C","60-70°C","85-98°C","110-120°C"],correct:2,exp:"Le HFO doit être chauffé à 85-98°C pour réduire sa viscosité à 10-20 cSt, permettant une séparation efficace. En dessous de cette température, la viscosité est trop élevée et les performances de séparation chutent drastiquement."},
      {q:"Qu'est-ce que le gravity disc dans un purificateur ?",opts:["Un filtre à particules","Un anneau qui détermine la position de l'interface huile-eau","Un régulateur de débit","Un amortisseur de vibrations"],correct:1,exp:"Le gravity disc est un anneau en acier inox qui crée un déversoir à l'extrémité du bol. Son diamètre intérieur détermine la position de l'interface huile-eau. Un diamètre trop grand laisse passer l'eau dans l'huile ; trop petit, l'huile passe dans l'eau."},
      {q:"Un purificateur a 3 sorties. Quelles sont-elles ?",opts:["Huile, eau, air","Huile propre, eau + impuretés, boues","Huile chaude, huile froide, boues","Entrée, sortie, recirculation"],correct:1,exp:"Un purificateur a 3 sorties : l'huile propre (sortie principale), l'eau avec les impuretés (effluent eau), et les boues (éjectées périodiquement par les orifices périphériques du bol)."},
      {q:"Quelle est la teneur maximale en huile autorisée par MARPOL pour le rejet des eaux de cale en mer ?",opts:["5 ppm","15 ppm","100 ppm","1000 ppm"],correct:1,exp:"MARPOL Annexe I limite la teneur en huile des eaux de cale rejetées en mer à 15 ppm maximum (à plus de 12 milles nautiques des côtes). Au-delà, ou dans les zones spéciales, le rejet est totalement interdit."},
      {q:"Que se passe-t-il si le gravity disc est trop grand dans un purificateur ?",opts:["Les boues ne sont pas éjectées","L'eau passe dans la sortie huile","L'huile passe dans la sortie eau","La vitesse du bol augmente"],correct:1,exp:"Si le gravity disc est trop grand, l'interface huile-eau se déplace trop loin vers le centre du bol. L'eau atteint la zone huile et sort avec l'huile propre → eau dans la sortie huile. Solution : remplacer par un gravity disc de plus petit diamètre."},
    ],
    en:[
      {q:"At what temperature should HFO be heated to optimise purifier separation?",opts:["40-50°C","60-70°C","85-98°C","110-120°C"],correct:2,exp:"HFO must be heated to 85-98°C to reduce viscosity to 10-20 cSt, enabling effective separation. Below this temperature, viscosity is too high and separation performance drops drastically."},
      {q:"What is the gravity disc in a purifier?",opts:["A particle filter","A ring determining the oil-water interface position","A flow regulator","A vibration damper"],correct:1,exp:"The gravity disc is a stainless steel ring creating a weir at the bowl top. Its bore diameter determines the oil-water interface position. Too large a bore allows water into the oil; too small, oil passes into the water."},
      {q:"A purifier has 3 outlets. What are they?",opts:["Oil, water, air","Clean oil, water + impurities, sludge","Hot oil, cold oil, sludge","Inlet, outlet, recirculation"],correct:1,exp:"A purifier has 3 outlets: clean oil (main outlet), water with impurities (water effluent), and sludge (periodically ejected through bowl peripheral ports)."},
      {q:"What is the maximum oil content allowed by MARPOL for bilge water discharge at sea?",opts:["5 ppm","15 ppm","100 ppm","1000 ppm"],correct:1,exp:"MARPOL Annex I limits oil content of bilge water discharged at sea to 15 ppm maximum (more than 12 nautical miles from coast). Beyond this, or in special areas, discharge is totally prohibited."},
      {q:"What happens if the gravity disc is too large in a purifier?",opts:["Sludge is not ejected","Water passes into the oil outlet","Oil passes into the water outlet","Bowl speed increases"],correct:1,exp:"If the gravity disc is too large, the oil-water interface moves too far toward the bowl centre. Water reaches the oil zone and exits with clean oil → water in oil outlet. Solution: replace with smaller bore gravity disc."},
    ],
    es:[
      {q:"¿A qué temperatura hay que calentar el HFO para optimizar la separación en un purificador?",opts:["40-50°C","60-70°C","85-98°C","110-120°C"],correct:2,exp:"El HFO debe calentarse a 85-98°C para reducir su viscosidad a 10-20 cSt. Por debajo de esta temperatura, la viscosidad es demasiado alta y el rendimiento de separación cae drásticamente."},
      {q:"¿Qué es el disco de gravedad en un purificador?",opts:["Un filtro de partículas","Un anillo que determina la posición de la interfaz aceite-agua","Un regulador de caudal","Un amortiguador de vibraciones"],correct:1,exp:"El disco de gravedad es un anillo de acero inox que crea un vertedero en el cuenco. Su diámetro interior determina la posición de la interfaz aceite-agua."},
      {q:"Un purificador tiene 3 salidas. ¿Cuáles son?",opts:["Aceite, agua, aire","Aceite limpio, agua + impurezas, lodos","Aceite caliente, aceite frío, lodos","Entrada, salida, recirculación"],correct:1,exp:"Un purificador tiene 3 salidas: aceite limpio (salida principal), agua con impurezas (efluente agua) y lodos (eyectados periódicamente por los orificios periféricos del cuenco)."},
      {q:"¿Cuál es el contenido máximo de aceite permitido por MARPOL para el vertido de aguas de sentina al mar?",opts:["5 ppm","15 ppm","100 ppm","1000 ppm"],correct:1,exp:"MARPOL Anexo I limita el contenido de aceite de las aguas de sentina a 15 ppm máximo (a más de 12 millas náuticas de la costa). En zonas especiales, el vertido está totalmente prohibido."},
      {q:"¿Qué ocurre si el disco de gravedad es demasiado grande?",opts:["Los lodos no se eyectan","El agua pasa a la salida de aceite","El aceite pasa a la salida de agua","La velocidad del cuenco aumenta"],correct:1,exp:"Si el disco de gravedad es demasiado grande, la interfaz aceite-agua se desplaza demasiado hacia el centro. El agua llega a la zona de aceite y sale con el aceite limpio → agua en la salida de aceite."},
    ],
    pt:[
      {q:"A que temperatura deve ser aquecido o HFO para otimizar a separação num purificador?",opts:["40-50°C","60-70°C","85-98°C","110-120°C"],correct:2,exp:"O HFO deve ser aquecido a 85-98°C para reduzir a viscosidade a 10-20 cSt. Abaixo desta temperatura, a viscosidade é demasiado alta e o desempenho de separação cai drasticamente."},
      {q:"O que é o disco de gravidade num purificador?",opts:["Um filtro de partículas","Um anel que determina a posição da interface óleo-água","Um regulador de caudal","Um amortecedor de vibrações"],correct:1,exp:"O disco de gravidade é um anel de aço inox que cria um descarregador na tigela. O seu diâmetro interior determina a posição da interface óleo-água."},
      {q:"Um purificador tem 3 saídas. Quais são?",opts:["Óleo, água, ar","Óleo limpo, água + impurezas, lamas","Óleo quente, óleo frio, lamas","Entrada, saída, recirculação"],correct:1,exp:"Um purificador tem 3 saídas: óleo limpo (saída principal), água com impurezas (efluente água) e lamas (ejetadas periodicamente pelos orifícios periféricos da tigela)."},
      {q:"Qual é o teor máximo de óleo permitido pelo MARPOL para a descarga de águas de sentina no mar?",opts:["5 ppm","15 ppm","100 ppm","1000 ppm"],correct:1,exp:"O MARPOL Anexo I limita o teor de óleo das águas de sentina a 15 ppm máximo (a mais de 12 milhas náuticas da costa). Nas zonas especiais, a descarga é totalmente proibida."},
      {q:"O que acontece se o disco de gravidade for demasiado grande?",opts:["As lamas não são ejetadas","A água passa para a saída de óleo","O óleo passa para a saída de água","A velocidade da tigela aumenta"],correct:1,exp:"Se o disco de gravidade for demasiado grande, a interface óleo-água desloca-se demasiado para o centro. A água atinge a zona de óleo e sai com o óleo limpo → água na saída de óleo."},
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
        <div key={i} style={{marginBottom:8,borderRadius:12,background:"rgba(10,22,40,0.8)",border:"1px solid rgba(192,132,252,0.15)",overflow:"hidden"}}>
          <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",padding:"12px 14px",background:"none",border:"none",display:"flex",justifyContent:"space-between",alignItems:"flex-start",cursor:"pointer",textAlign:"left",gap:10}}>
            <span style={{fontSize:12,color:"rgba(240,244,255,0.8)",fontFamily:"Courier New",lineHeight:1.5}}><span style={{color:"#c084fc",fontWeight:700,marginRight:6}}>Q{i+1}.</span>{item.q}</span>
            <span style={{color:"#c084fc",fontSize:14,flexShrink:0}}>{open===i?"▲":"▼"}</span>
          </button>
          {open===i&&(
            <div style={{padding:"0 14px 12px"}}>
              <button onClick={()=>setShowAns(p=>({...p,[i]:!p[i]}))} style={{padding:"6px 12px",borderRadius:8,fontSize:10,cursor:"pointer",background:showAns[i]?"rgba(192,132,252,0.13)":"rgba(255,255,255,0.05)",border:`1px solid ${showAns[i]?"#c084fc":"rgba(255,255,255,0.12)"}`,color:showAns[i]?"#c084fc":"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{showAns[i]?l.hide:l.show}</button>
              {showAns[i]&&<div style={{marginTop:8,padding:10,borderRadius:8,background:"rgba(13,31,60,0.8)",borderLeft:"3px solid #c084fc",fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{item.a}</div>}
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
  const optColors=["#c084fc","#4da6ff","#6dbf8a","#e8b94f"];

  if(done) return (
    <div style={{padding:"24px 14px"}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:42,marginBottom:8}}>🔄</div>
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
      <button onClick={()=>onComplete(xp)} style={{width:"100%",padding:"15px 0",border:"none",borderRadius:14,background:"linear-gradient(135deg,#c084fc,#c9922a)",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:"#060e1a",cursor:"pointer"}}>🔄 {l.finish}</button>
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
        <div style={{height:"100%",borderRadius:2,background:"linear-gradient(90deg,#c084fc,#c9922a)",width:`${(cur/quiz.length)*100}%`,transition:"width 0.4s"}}/>
      </div>
      <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New",marginBottom:16,padding:12,borderRadius:10,background:"rgba(10,22,40,0.8)",border:"1px solid rgba(192,132,252,0.15)"}}>{q.q}</div>
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
        ?<button onClick={handleConfirm} disabled={selected===null} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:selected!==null?"linear-gradient(135deg,#c084fc,#c9922a)":"rgba(255,255,255,0.06)",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:selected!==null?"#060e1a":"rgba(240,244,255,0.25)",cursor:selected!==null?"pointer":"default",letterSpacing:1}}>{l.submit}</button>
        :<button onClick={handleNext} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:"linear-gradient(135deg,#c084fc,#c9922a)",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:"#060e1a",cursor:"pointer",letterSpacing:1}}>{cur+1>=quiz.length?l.finish:l.next}</button>
      }
    </div>
  );
}

export default function LessonE2_L5({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t=T[lang]||T.fr;
  const [tab,setTab]=useState(0);
  const progress=[25,50,75,90][tab]||25;
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(192,132,252,0.2)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"6px 12px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>◀</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:2,color:"#c084fc",marginBottom:2}}>{t.moduleLabel} · L5</div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:"#f0f4ff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.lessonTitle}</div>
          </div>
          <div style={{fontSize:11,color:"#e8b94f",fontFamily:"Courier New",flexShrink:0}}>{progress}%</div>
        </div>
        <div style={{height:2,background:"rgba(255,255,255,0.06)"}}>
          <div style={{height:"100%",background:"linear-gradient(90deg,#c084fc,#c9922a)",width:`${progress}%`,transition:"width 0.4s"}}/>
        </div>
      </div>
      <div style={{padding:"10px 14px 0"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:8,background:"rgba(192,132,252,0.1)",border:"1px solid rgba(192,132,252,0.3)"}}>
          <span style={{fontSize:12}}>🔄</span>
          <span style={{fontFamily:"'Cinzel',serif",fontSize:9,color:"#c084fc",letterSpacing:1}}>MACHINE · AUXILIAIRES · PREMIUM</span>
        </div>
      </div>
      <div style={{display:"flex",padding:"10px 14px 0",gap:6,overflowX:"auto",scrollbarWidth:"none"}}>
        {t.tabs.map((label:string,i:number)=>(
          <button key={i} onClick={()=>setTab(i)} style={{padding:"8px 12px",borderRadius:10,fontSize:11,cursor:"pointer",whiteSpace:"nowrap",background:tab===i?"rgba(192,132,252,0.13)":"rgba(255,255,255,0.04)",border:`1px solid ${tab===i?"#c084fc":"rgba(255,255,255,0.1)"}`,color:tab===i?"#c084fc":"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{label}</button>
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
