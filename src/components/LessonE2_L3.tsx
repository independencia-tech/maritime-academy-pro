// LessonE2_L3 — Pompes & Systèmes hydrauliques | PART 1
import { useState } from "react";

const C = {
  pump:"#4da6ff", hydraulic:"#6dbf8a", pipe:"#94a3b8",
  danger:"#f97316", pressure:"#e8b94f", flow:"#c084fc",
  gold:"#c9922a", gold2:"#e8b94f",
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  safe:"#6dbf8a", red:"#e74c3c", teal:"#0a8a6c",
};

const T: any = {
  fr:{
    moduleLabel:"MACHINE — AUXILIAIRES",
    lessonTitle:"Pompes & Systèmes hydrauliques",
    intro:"Les pompes sont omniprésentes à bord : ballast, carburant, eau de mer, eau douce, huile, cargaison. Comprendre leurs types, leur courbe caractéristique et les systèmes hydrauliques associés est fondamental pour tout mécanicien marin.",
    tabs:["📖 Contenu","✏️ Pratique","📚 Banque Q.","🎯 Quiz"],
    s1title:"⚙️ Types de pompes marines",
    s1hint:"👆 Tapez un type pour voir ses caractéristiques",
    s2title:"📈 Courbe caractéristique & Point de fonctionnement",
    s2hint:"👆 Ajustez la vitesse pour voir le point de fonctionnement",
    s3title:"🔧 Composants d'un système hydraulique",
    s3hint:"👆 Tapez un composant pour sa description",
    s4title:"⚠️ Défauts courants & Dépannage",
    s4hint:"👆 Tapez un défaut pour voir ses causes et remèdes",
    keypoints:"Points clés",
    kp:[
      "Les pompes centrifuges dominent à bord : simples, robustes, débit variable selon pression",
      "Les pompes volumétriques (engrenages, pistons) sont utilisées pour l'huile et le carburant",
      "La cavitation détruit les roues des pompes — éviter les pressions d'aspiration trop basses",
      "Un système hydraulique comprend : pompe, filtre, distributeur, vérin/moteur, réservoir",
      "Le NPSH (Net Positive Suction Head) doit toujours être positif pour éviter la cavitation",
    ],
    pumpTypes:{
      centrifugal:{ name:"Pompe centrifuge", desc:"La plus répandue à bord. Une roue (impeller) tourne et communique de l'énergie cinétique au fluide par force centrifuge. Le fluide est ensuite converti en pression dans la volute. Avantages : simple, robuste, débit élevé, pas d'amorçage automatique. Utilisations : ballast, eau de mer, refroidissement, eau douce." },
      gear:{ name:"Pompe à engrenages", desc:"Deux engrenages en prise déplacent le fluide dans les cavités entre les dents. Débit proportionnel à la vitesse. Avantages : auto-amorçante, haute pression, adaptée aux fluides visqueux. Utilisations : huile de lubrification, fuel oil (HFO), huile hydraulique." },
      screw:{ name:"Pompe à vis (Screw pump)", desc:"Deux ou trois vis hélicoïdales engrènent et déplacent le fluide axialement. Très silencieuse et régulière. Utilisée pour le HFO visqueux, la cargaison sur tankers. Résiste bien aux fluides chargés en particules." },
      piston:{ name:"Pompe à piston", desc:"Un ou plusieurs pistons alternatifs déplacent le fluide. Très haute pression possible. Utilisée pour les systèmes hydrauliques haute pression (gouvernail, treuils, stabilisateurs). Débit pulsé — nécessite un accumulateur pour lisser." },
      diaphragm:{ name:"Pompe à membrane", desc:"Une membrane flexible remplace le piston. Permet de pomper des fluides corrosifs ou chargés sans contact avec les pièces mécaniques. Utilisée pour les eaux usées, produits chimiques, bilge." },
    },
    hydraulicComponents:{
      reservoir:{ name:"Réservoir hydraulique", desc:"Stocke l'huile hydraulique, permet la dégazéification et le refroidissement. Équipé d'un filtre de remplissage, d'un indicateur de niveau, d'un thermomètre et parfois d'un échangeur de chaleur." },
      pump_h:{ name:"Pompe hydraulique", desc:"Génère le débit et la pression. Généralement à pistons axiaux (haute pression) ou à engrenages (basse/moyenne pression). Entraînée par un moteur électrique ou le moteur principal." },
      filter:{ name:"Filtre hydraulique", desc:"Élimine les particules du fluide hydraulique. Filtre en aspiration (grossier), filtre haute pression en refoulement (fin — 10 à 25 microns). Le colmatage est indiqué par un pressostat différentiel." },
      valve:{ name:"Distributeur (spool valve)", desc:"Dirige le fluide vers les actionneurs (vérins, moteurs). Peut être actionné manuellement, électriquement (solénoïde) ou hydrauliquement. Détermine le sens de mouvement des actionneurs." },
      relief:{ name:"Soupape de sûreté", desc:"Limite la pression maximale du circuit. S'ouvre quand la pression dépasse le seuil réglé et renvoie l'huile au réservoir. Protection obligatoire contre la surpression." },
      accumulator:{ name:"Accumulateur hydraulique", desc:"Stocke de l'énergie hydraulique (huile sous pression + gaz azote). Permet : de lisser les pulsations, de fournir un débit instantané important, de maintenir la pression en cas de coupure de pompe (sécurité)." },
    },
    faults:{
      cavitation:{ name:"Cavitation", cause:"Pression d'aspiration trop basse → formation de bulles de vapeur qui implosent sur la roue. Bruit caractéristique (gravier dans la pompe). Destruction rapide de la roue.", remedy:"Vérifier le filtre d'aspiration (colmaté), réduire la hauteur d'aspiration, vérifier les fuites d'air sur la tuyauterie d'aspiration, augmenter le NPSH disponible." },
      noflow:{ name:"Absence de débit", cause:"Pompe non amorcée (centrifuge), sens de rotation inversé, vanne d'aspiration fermée, filtre colmaté, roue obstruée ou usée.", remedy:"Amorcer la pompe, vérifier le sens de rotation, ouvrir les vannes, nettoyer le filtre, inspecter la roue." },
      overheat:{ name:"Échauffement pompe", cause:"Manque de liquide (pompe à sec), friction excessive (garniture mécanique serrée), débit nul avec pompe en marche (refoulement fermé), mauvais alignement.", remedy:"Arrêter immédiatement si à sec, vérifier la garniture mécanique, ouvrir légèrement le refoulement (minimum de débit requis), vérifier l'alignement moteur-pompe." },
      vibration:{ name:"Vibrations excessives", cause:"Déséquilibre de la roue (corps étranger), cavitation, usure des roulements, mauvais alignement moteur-pompe, résonance tuyauterie.", remedy:"Inspecter et nettoyer la roue, éliminer la cavitation, remplacer les roulements, réaligner la pompe, vérifier les supports de tuyauterie." },
    },
    practiceTitle:"Exercice pratique",
    questions:[
      { q:"Expliquez la différence entre une pompe centrifuge et une pompe volumétrique. Dans quels cas préfère-t-on chaque type à bord ?",
        a:"Pompe centrifuge : communique de l'énergie cinétique au fluide par rotation d'une roue. Débit variable selon la pression du réseau. Non auto-amorçante. Avantages : grande capacité, régularité, pas de pulsations, robustesse. Utilisée pour les grands débits à pression modérée : ballast, eau de mer, refroidissement. Pompe volumétrique : déplace un volume fixe par cycle. Débit constant quelle que soit la pression (dans les limites). Auto-amorçante. Avantages : haute pression, fluides visqueux. Utilisée pour HFO, huile de lubrification, systèmes hydrauliques. À bord, on préfère la centrifuge pour les grands débits et la volumétrique pour les fluides visqueux et les hautes pressions." },
      { q:"Qu'est-ce que la cavitation et quelles sont ses conséquences à long terme sur une pompe centrifuge ?",
        a:"La cavitation se produit quand la pression en aspiration chute en dessous de la pression de vapeur saturante du liquide. Des bulles de vapeur se forment dans le liquide. Quand ces bulles atteignent une zone de haute pression (roue), elles implosent violemment en libérant une énergie considérable. Conséquences à long terme : érosion de la roue (cratères en surface), détérioration de la volute, usure accélérée des roulements (vibrations), réduction progressive du débit et des performances, bruit caractéristique ressemblant à du gravier dans la pompe. La cavitation peut détruire une roue en quelques heures de fonctionnement. Prévention : maintenir un NPSH disponible > NPSH requis." },
      { q:"Un système de pompage ballast présente un débit anormalement faible. Décrivez votre procédure de diagnostic.",
        a:"1. Vérification des paramètres : lire la pression d'aspiration (manomètre) et de refoulement. Une pression d'aspiration trop basse indique cavitation ou filtre colmaté. 2. Vérification visuelle : état de la vanne d'aspiration (ouverte ?), état du filtre d'aspiration (indicateur colmatage ?), fuites d'air sur la tuyauterie d'aspiration. 3. Contrôle de la pompe : bruit anormal (cavitation = bruit de gravier), vibrations, température paliers. 4. Vérification du moteur : sens de rotation correct, ampérage moteur (trop faible = débit faible, roue usée ; trop élevé = obstruction). 5. Nettoyage du filtre d'aspiration si colmaté. 6. Si le problème persiste : inspection de la roue (usure, obstruction), contrôle de la garniture mécanique." },
    ],
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
  },
  en:{
    moduleLabel:"ENGINE — AUXILIARIES",
    lessonTitle:"Pumps & Hydraulic Systems",
    intro:"Pumps are everywhere on board: ballast, fuel, seawater, fresh water, oil, cargo. Understanding their types, characteristic curve and associated hydraulic systems is fundamental for any marine engineer.",
    tabs:["📖 Content","✏️ Practice","📚 Question Bank","🎯 Quiz"],
    s1title:"⚙️ Marine Pump Types",
    s1hint:"👆 Tap a type to see its characteristics",
    s2title:"📈 Characteristic Curve & Operating Point",
    s2hint:"👆 Adjust speed to see the operating point",
    s3title:"🔧 Hydraulic System Components",
    s3hint:"👆 Tap a component for its description",
    s4title:"⚠️ Common Faults & Troubleshooting",
    s4hint:"👆 Tap a fault to see causes and remedies",
    keypoints:"Key Points",
    kp:[
      "Centrifugal pumps dominate on board: simple, robust, variable flow depending on pressure",
      "Positive displacement pumps (gear, piston) are used for oil and fuel",
      "Cavitation destroys pump impellers — avoid excessively low suction pressures",
      "A hydraulic system comprises: pump, filter, directional valve, actuator, reservoir",
      "NPSH (Net Positive Suction Head) must always be positive to avoid cavitation",
    ],
    pumpTypes:{
      centrifugal:{ name:"Centrifugal pump", desc:"Most common on board. An impeller rotates and imparts kinetic energy to the fluid by centrifugal force. The fluid is then converted to pressure in the volute. Advantages: simple, robust, high flow, not self-priming. Uses: ballast, seawater, cooling, fresh water." },
      gear:{ name:"Gear pump", desc:"Two meshing gears displace fluid in the cavities between the teeth. Flow proportional to speed. Advantages: self-priming, high pressure, suitable for viscous fluids. Uses: lube oil, fuel oil (HFO), hydraulic oil." },
      screw:{ name:"Screw pump", desc:"Two or three helical screws mesh and displace fluid axially. Very quiet and smooth. Used for viscous HFO, cargo on tankers. Handles particle-laden fluids well." },
      piston:{ name:"Piston pump", desc:"One or more reciprocating pistons displace fluid. Very high pressure possible. Used for high-pressure hydraulic systems (rudder, winches, stabilisers). Pulsed flow — requires accumulator to smooth." },
      diaphragm:{ name:"Diaphragm pump", desc:"A flexible diaphragm replaces the piston. Allows pumping of corrosive or laden fluids without contact with mechanical parts. Used for bilge water, chemicals, sewage." },
    },
    hydraulicComponents:{
      reservoir:{ name:"Hydraulic reservoir", desc:"Stores hydraulic oil, allows degassing and cooling. Equipped with a fill filter, level indicator, thermometer and sometimes a heat exchanger." },
      pump_h:{ name:"Hydraulic pump", desc:"Generates flow and pressure. Generally axial piston (high pressure) or gear (low/medium pressure). Driven by an electric motor or main engine." },
      filter:{ name:"Hydraulic filter", desc:"Removes particles from hydraulic fluid. Suction filter (coarse), high-pressure delivery filter (fine — 10 to 25 microns). Clogging indicated by a differential pressure switch." },
      valve:{ name:"Directional valve (spool valve)", desc:"Directs fluid to actuators (cylinders, motors). Can be operated manually, electrically (solenoid) or hydraulically. Determines actuator direction of movement." },
      relief:{ name:"Relief valve", desc:"Limits maximum circuit pressure. Opens when pressure exceeds set threshold and returns oil to reservoir. Mandatory protection against overpressure." },
      accumulator:{ name:"Hydraulic accumulator", desc:"Stores hydraulic energy (oil under pressure + nitrogen gas). Allows: smoothing pulsations, providing instant high flow, maintaining pressure on pump shutdown (safety)." },
    },
    faults:{
      cavitation:{ name:"Cavitation", cause:"Suction pressure too low → vapour bubbles form and implode on the impeller. Characteristic noise (gravel in pump). Rapid impeller destruction.", remedy:"Check suction filter (clogged), reduce suction height, check for air leaks on suction piping, increase available NPSH." },
      noflow:{ name:"No flow", cause:"Pump not primed (centrifugal), reversed rotation, suction valve closed, clogged filter, blocked or worn impeller.", remedy:"Prime the pump, check rotation direction, open valves, clean filter, inspect impeller." },
      overheat:{ name:"Pump overheating", cause:"Lack of liquid (dry running), excessive friction (tight mechanical seal), zero flow with pump running (delivery closed), misalignment.", remedy:"Stop immediately if dry running, check mechanical seal, slightly open delivery (minimum flow required), check motor-pump alignment." },
      vibration:{ name:"Excessive vibration", cause:"Impeller imbalance (foreign body), cavitation, bearing wear, motor-pump misalignment, piping resonance.", remedy:"Inspect and clean impeller, eliminate cavitation, replace bearings, realign pump, check piping supports." },
    },
    practiceTitle:"Practice Exercise",
    questions:[
      { q:"Explain the difference between a centrifugal pump and a positive displacement pump. When is each preferred on board?",
        a:"Centrifugal pump: imparts kinetic energy to fluid via rotating impeller. Variable flow depending on network pressure. Not self-priming. Advantages: high capacity, smooth flow, no pulsations, robust. Used for high flows at moderate pressure: ballast, seawater, cooling. Positive displacement pump: displaces a fixed volume per cycle. Constant flow regardless of pressure (within limits). Self-priming. Advantages: high pressure, viscous fluids. Used for HFO, lube oil, hydraulic systems. On board, centrifugal for high flows, positive displacement for viscous fluids and high pressures." },
      { q:"What is cavitation and what are its long-term consequences on a centrifugal pump?",
        a:"Cavitation occurs when suction pressure drops below the liquid's saturated vapour pressure. Vapour bubbles form in the liquid. When these bubbles reach a high-pressure zone (impeller), they implode violently releasing considerable energy. Long-term consequences: impeller erosion (surface craters), volute deterioration, accelerated bearing wear (vibration), progressive flow and performance reduction, characteristic noise resembling gravel in the pump. Cavitation can destroy an impeller in hours. Prevention: maintain available NPSH > required NPSH." },
      { q:"A ballast pumping system shows abnormally low flow. Describe your diagnostic procedure.",
        a:"1. Parameter check: read suction and delivery pressure (gauges). Too low suction pressure indicates cavitation or clogged filter. 2. Visual check: suction valve state (open?), suction filter state (clog indicator?), air leaks on suction piping. 3. Pump check: abnormal noise (cavitation = gravel sound), vibrations, bearing temperature. 4. Motor check: correct rotation direction, motor amperage (too low = low flow, worn impeller; too high = obstruction). 5. Clean suction filter if clogged. 6. If problem persists: impeller inspection (wear, obstruction), mechanical seal check." },
    ],
    showAnswer:"Show answer", hideAnswer:"Hide",
  },
  es:{
    moduleLabel:"MÁQUINAS — AUXILIARES",
    lessonTitle:"Bombas & Sistemas hidráulicos",
    intro:"Las bombas están omnipresentes a bordo: lastre, combustible, agua de mar, agua dulce, aceite, carga. Comprender sus tipos, curva característica y sistemas hidráulicos asociados es fundamental para todo maquinista.",
    tabs:["📖 Contenido","✏️ Práctica","📚 Banco Q.","🎯 Quiz"],
    s1title:"⚙️ Tipos de bombas marinas",
    s1hint:"👆 Toca un tipo para ver sus características",
    s2title:"📈 Curva característica & Punto de funcionamiento",
    s2hint:"👆 Ajusta la velocidad para ver el punto de funcionamiento",
    s3title:"🔧 Componentes de un sistema hidráulico",
    s3hint:"👆 Toca un componente para su descripción",
    s4title:"⚠️ Fallos comunes & Resolución",
    s4hint:"👆 Toca un fallo para ver causas y remedios",
    keypoints:"Puntos clave",
    kp:[
      "Las bombas centrífugas dominan a bordo: simples, robustas, caudal variable según presión",
      "Las bombas volumétricas (engranajes, pistones) se usan para aceite y combustible",
      "La cavitación destruye los rodetes — evitar presiones de aspiración demasiado bajas",
      "Un sistema hidráulico comprende: bomba, filtro, distribuidor, actuador, depósito",
      "El NPSH disponible debe ser siempre superior al NPSH requerido para evitar cavitación",
    ],
    pumpTypes:{
      centrifugal:{ name:"Bomba centrífuga", desc:"La más extendida a bordo. Un rodete gira e imparte energía cinética al fluido por fuerza centrífuga. El fluido se convierte en presión en la voluta. Ventajas: simple, robusta, gran caudal, no autocebante. Usos: lastre, agua de mar, refrigeración, agua dulce." },
      gear:{ name:"Bomba de engranajes", desc:"Dos engranajes en contacto desplazan el fluido en las cavidades entre los dientes. Caudal proporcional a la velocidad. Ventajas: autocebante, alta presión, apta para fluidos viscosos. Usos: aceite de lubricación, fuel oil (HFO), aceite hidráulico." },
      screw:{ name:"Bomba de tornillo (Screw pump)", desc:"Dos o tres tornillos helicoidales engranan y desplazan el fluido axialmente. Muy silenciosa y regular. Usada para HFO viscoso, carga en tanqueros. Resiste bien fluidos con partículas." },
      piston:{ name:"Bomba de pistón", desc:"Uno o varios pistones alternativos desplazan el fluido. Alta presión posible. Usada para sistemas hidráulicos de alta presión (timón, maquinillas, estabilizadores). Caudal pulsante — requiere acumulador." },
      diaphragm:{ name:"Bomba de membrana", desc:"Una membrana flexible reemplaza el pistón. Permite bombear fluidos corrosivos o cargados sin contacto con piezas mecánicas. Usada para aguas residuales, productos químicos, sentinas." },
    },
    hydraulicComponents:{
      reservoir:{ name:"Depósito hidráulico", desc:"Almacena el aceite hidráulico, permite la desgasificación y el enfriamiento. Equipado con filtro de llenado, indicador de nivel, termómetro y a veces intercambiador de calor." },
      pump_h:{ name:"Bomba hidráulica", desc:"Genera el caudal y la presión. Generalmente de pistones axiales (alta presión) o engranajes (baja/media presión). Accionada por motor eléctrico o motor principal." },
      filter:{ name:"Filtro hidráulico", desc:"Elimina partículas del fluido hidráulico. Filtro de aspiración (grueso), filtro de alta presión en descarga (fino — 10 a 25 micras). El taponamiento se indica por un presostato diferencial." },
      valve:{ name:"Distribuidor (spool valve)", desc:"Dirige el fluido hacia los actuadores. Puede accionarse manual, eléctrica o hidráulicamente. Determina el sentido de movimiento de los actuadores." },
      relief:{ name:"Válvula de seguridad", desc:"Limita la presión máxima del circuito. Se abre cuando la presión supera el umbral ajustado y devuelve el aceite al depósito. Protección obligatoria contra sobrepresión." },
      accumulator:{ name:"Acumulador hidráulico", desc:"Almacena energía hidráulica (aceite a presión + gas nitrógeno). Permite: suavizar las pulsaciones, proporcionar caudal instantáneo importante, mantener la presión en caso de corte de bomba." },
    },
    faults:{
      cavitation:{ name:"Cavitación", cause:"Presión de aspiración demasiado baja → formación de burbujas de vapor que implosionan en el rodete. Ruido característico (grava en la bomba). Destrucción rápida del rodete.", remedy:"Verificar el filtro de aspiración (taponado), reducir la altura de aspiración, verificar fugas de aire en la tubería de aspiración, aumentar el NPSH disponible." },
      noflow:{ name:"Ausencia de caudal", cause:"Bomba no cebada (centrífuga), sentido de giro invertido, válvula de aspiración cerrada, filtro taponado, rodete obstruido o desgastado.", remedy:"Cebar la bomba, verificar el sentido de giro, abrir válvulas, limpiar el filtro, inspeccionar el rodete." },
      overheat:{ name:"Sobrecalentamiento de la bomba", cause:"Falta de líquido (bomba en seco), fricción excesiva (cierre mecánico apretado), caudal nulo con bomba en marcha, desalineación.", remedy:"Parar inmediatamente si está en seco, verificar el cierre mecánico, abrir ligeramente la descarga, verificar la alineación motor-bomba." },
      vibration:{ name:"Vibraciones excesivas", cause:"Desequilibrio del rodete (cuerpo extraño), cavitación, desgaste de rodamientos, desalineación, resonancia de tuberías.", remedy:"Inspeccionar y limpiar el rodete, eliminar la cavitación, sustituir rodamientos, realinear la bomba, verificar los soportes de tubería." },
    },
    practiceTitle:"Ejercicio práctico",
    questions:[
      { q:"Explique la diferencia entre una bomba centrífuga y una bomba volumétrica. ¿Cuándo se prefiere cada tipo a bordo?",
        a:"Bomba centrífuga: imparte energía cinética al fluido mediante la rotación de un rodete. Caudal variable según la presión de la red. No autocebante. Ventajas: gran capacidad, regularidad, sin pulsaciones, robustez. Usada para grandes caudales a presión moderada: lastre, agua de mar, refrigeración. Bomba volumétrica: desplaza un volumen fijo por ciclo. Caudal constante independientemente de la presión. Autocebante. Ventajas: alta presión, fluidos viscosos. Usada para HFO, aceite de lubricación, sistemas hidráulicos." },
      { q:"¿Qué es la cavitación y cuáles son sus consecuencias a largo plazo en una bomba centrífuga?",
        a:"La cavitación ocurre cuando la presión en aspiración cae por debajo de la presión de vapor saturado del líquido. Se forman burbujas de vapor que al llegar a una zona de alta presión (rodete) implosionan violentamente. Consecuencias: erosión del rodete (cráteres en superficie), deterioro de la voluta, desgaste acelerado de rodamientos, reducción progresiva del caudal y prestaciones, ruido característico como de grava. Prevención: mantener NPSH disponible > NPSH requerido." },
      { q:"Un sistema de bombeo de lastre presenta un caudal anormalmente bajo. Describa su procedimiento de diagnóstico.",
        a:"1. Verificación de parámetros: leer presión de aspiración y descarga. Presión de aspiración muy baja indica cavitación o filtro taponado. 2. Verificación visual: válvula de aspiración (abierta), filtro (indicador de taponamiento), fugas de aire. 3. Control de la bomba: ruido anormal, vibraciones, temperatura cojinetes. 4. Verificación del motor: sentido de giro correcto, amperaje. 5. Limpiar el filtro si está taponado. 6. Si persiste: inspección del rodete, control del cierre mecánico." },
    ],
    showAnswer:"Ver corrección", hideAnswer:"Ocultar",
  },
  pt:{
    moduleLabel:"MÁQUINAS — AUXILIARES",
    lessonTitle:"Bombas & Sistemas hidráulicos",
    intro:"As bombas estão omnipresentes a bordo: lastro, combustível, água do mar, água doce, óleo, carga. Compreender os seus tipos, curva característica e sistemas hidráulicos associados é fundamental para qualquer maquinista.",
    tabs:["📖 Conteúdo","✏️ Prática","📚 Banco Q.","🎯 Quiz"],
    s1title:"⚙️ Tipos de bombas marinhas",
    s1hint:"👆 Toque num tipo para ver as características",
    s2title:"📈 Curva característica & Ponto de funcionamento",
    s2hint:"👆 Ajuste a velocidade para ver o ponto de funcionamento",
    s3title:"🔧 Componentes de um sistema hidráulico",
    s3hint:"👆 Toque num componente para a descrição",
    s4title:"⚠️ Avarias comuns & Resolução",
    s4hint:"👆 Toque numa avaria para ver causas e remédios",
    keypoints:"Pontos-chave",
    kp:[
      "As bombas centrífugas dominam a bordo: simples, robustas, caudal variável conforme pressão",
      "As bombas volumétricas (engrenagens, pistões) são usadas para óleo e combustível",
      "A cavitação destrói as rodas das bombas — evitar pressões de aspiração demasiado baixas",
      "Um sistema hidráulico inclui: bomba, filtro, distribuidor, atuador, reservatório",
      "O NPSH disponível deve ser sempre superior ao NPSH requerido para evitar cavitação",
    ],
    pumpTypes:{
      centrifugal:{ name:"Bomba centrífuga", desc:"A mais comum a bordo. Uma roda (impeller) roda e transmite energia cinética ao fluido por força centrífuga. O fluido é convertido em pressão na voluta. Vantagens: simples, robusta, caudal elevado, não autocebante. Utilizações: lastro, água do mar, refrigeração, água doce." },
      gear:{ name:"Bomba de engrenagens", desc:"Duas engrenagens em contacto deslocam o fluido nas cavidades entre os dentes. Caudal proporcional à velocidade. Vantagens: autocebante, alta pressão, adequada a fluidos viscosos. Utilizações: óleo de lubrificação, fuel oil (HFO), óleo hidráulico." },
      screw:{ name:"Bomba de parafuso (Screw pump)", desc:"Dois ou três parafusos helicoidais engrenam e deslocam o fluido axialmente. Muito silenciosa e regular. Usada para HFO viscoso, carga em petroleiros. Suporta bem fluidos com partículas." },
      piston:{ name:"Bomba de pistão", desc:"Um ou mais pistões alternativos deslocam o fluido. Alta pressão possível. Usada para sistemas hidráulicos de alta pressão (leme, guinchos, estabilizadores). Caudal pulsante — requer acumulador." },
      diaphragm:{ name:"Bomba de diafragma", desc:"Um diafragma flexível substitui o pistão. Permite bombear fluidos corrosivos ou carregados sem contacto com peças mecânicas. Usada para águas residuais, produtos químicos, sentina." },
    },
    hydraulicComponents:{
      reservoir:{ name:"Reservatório hidráulico", desc:"Armazena o óleo hidráulico, permite a desgasificação e o arrefecimento. Equipado com filtro de enchimento, indicador de nível, termómetro e às vezes permutador de calor." },
      pump_h:{ name:"Bomba hidráulica", desc:"Gera o caudal e a pressão. Geralmente de pistões axiais (alta pressão) ou engrenagens (baixa/média pressão). Acionada por motor elétrico ou motor principal." },
      filter:{ name:"Filtro hidráulico", desc:"Remove partículas do fluido hidráulico. Filtro de aspiração (grosso), filtro de alta pressão na descarga (fino — 10 a 25 microns). O entupimento é indicado por um pressostato diferencial." },
      valve:{ name:"Distribuidor (spool valve)", desc:"Direciona o fluido para os atuadores. Pode ser acionado manual, elétrica ou hidraulicamente. Determina o sentido de movimento dos atuadores." },
      relief:{ name:"Válvula de segurança", desc:"Limita a pressão máxima do circuito. Abre quando a pressão excede o limiar regulado e devolve o óleo ao reservatório. Proteção obrigatória contra sobrepressão." },
      accumulator:{ name:"Acumulador hidráulico", desc:"Armazena energia hidráulica (óleo sob pressão + gás azoto). Permite: suavizar pulsações, fornecer caudal instantâneo elevado, manter pressão em caso de corte de bomba." },
    },
    faults:{
      cavitation:{ name:"Cavitação", cause:"Pressão de aspiração demasiado baixa → bolhas de vapor formam-se e implodem na roda. Ruído característico (gravilha na bomba). Destruição rápida da roda.", remedy:"Verificar filtro de aspiração (entupido), reduzir altura de aspiração, verificar fugas de ar na tubagem de aspiração, aumentar NPSH disponível." },
      noflow:{ name:"Ausência de caudal", cause:"Bomba não cebada (centrífuga), sentido de rotação invertido, válvula de aspiração fechada, filtro entupido, roda obstruída ou desgastada.", remedy:"Cebar a bomba, verificar sentido de rotação, abrir válvulas, limpar filtro, inspecionar roda." },
      overheat:{ name:"Sobreaquecimento da bomba", cause:"Falta de líquido (bomba em seco), fricção excessiva (vedação mecânica apertada), caudal nulo com bomba em marcha, desalinhamento.", remedy:"Parar imediatamente se em seco, verificar vedação mecânica, abrir ligeiramente a descarga, verificar alinhamento motor-bomba." },
      vibration:{ name:"Vibrações excessivas", cause:"Desequilíbrio da roda (corpo estranho), cavitação, desgaste dos rolamentos, desalinhamento, ressonância de tubagens.", remedy:"Inspecionar e limpar roda, eliminar cavitação, substituir rolamentos, realinhar bomba, verificar suportes de tubagem." },
    },
    practiceTitle:"Exercício prático",
    questions:[
      { q:"Explique a diferença entre uma bomba centrífuga e uma bomba volumétrica. Quando se prefere cada tipo a bordo?",
        a:"Bomba centrífuga: transmite energia cinética ao fluido pela rotação de uma roda. Caudal variável conforme a pressão da rede. Não autocebante. Vantagens: grande capacidade, regularidade, sem pulsações, robustez. Usada para grandes caudais a pressão moderada. Bomba volumétrica: desloca um volume fixo por ciclo. Caudal constante independentemente da pressão. Autocebante. Vantagens: alta pressão, fluidos viscosos. Usada para HFO, óleo de lubrificação, sistemas hidráulicos." },
      { q:"O que é a cavitação e quais são as suas consequências a longo prazo numa bomba centrífuga?",
        a:"A cavitação ocorre quando a pressão na aspiração cai abaixo da pressão de vapor saturado do líquido. Formam-se bolhas de vapor que ao chegarem a uma zona de alta pressão (roda) implodem violentamente. Consequências: erosão da roda, deterioração da voluta, desgaste acelerado dos rolamentos, redução progressiva do caudal e desempenho, ruído característico como gravilha. Prevenção: manter NPSH disponível > NPSH requerido." },
      { q:"Um sistema de bombagem de lastro apresenta caudal anormalmente baixo. Descreva o seu procedimento de diagnóstico.",
        a:"1. Verificação de parâmetros: ler pressão de aspiração e descarga. Pressão de aspiração muito baixa indica cavitação ou filtro entupido. 2. Verificação visual: válvula de aspiração (aberta), filtro (indicador de entupimento), fugas de ar. 3. Controlo da bomba: ruído anormal, vibrações, temperatura rolamentos. 4. Verificação do motor: sentido de rotação correto, amperagem. 5. Limpar filtro se entupido. 6. Se persiste: inspeção da roda, controlo da vedação mecânica." },
    ],
    showAnswer:"Ver correção", hideAnswer:"Ocultar",
  },
};

// ── SVG 1 — PUMP TYPES ────────────────────────────────────────
function PumpTypesSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("centrifugal");
  const pumps = t.pumpTypes;
  const pumpColors: Record<string,string> = {
    centrifugal:C.pump, gear:C.pressure, screw:C.safe,
    piston:C.danger, diaphragm:C.flow,
  };

  const pumpSVGs: Record<string,JSX.Element> = {
    centrifugal:(
      <g>
        {/* Volute */}
        <path d="M80 80 m-40,0 a40,40 0 1,1 0,1 Z" fill="none" stroke={C.pump} strokeWidth="2" opacity={0.3}/>
        <ellipse cx="80" cy="80" rx="42" ry="42" fill={C.pump} opacity={0.1} stroke={C.pump} strokeWidth="2"/>
        {/* Impeller */}
        {[0,60,120,180,240,300].map((a,i)=>{
          const r=a*Math.PI/180;
          return <line key={i} x1={80+8*Math.cos(r)} y1={80+8*Math.sin(r)} x2={80+28*Math.cos(r+0.4)} y2={80+28*Math.sin(r+0.4)} stroke={C.pump} strokeWidth="3" strokeLinecap="round"/>;
        })}
        <circle cx="80" cy="80" r="8" fill={C.pump} opacity={0.5}/>
        {/* Arrows flow */}
        <line x1="80" y1="30" x2="80" y2="10" stroke={C.pump} strokeWidth="1.5" markerEnd="url(#arrowBlue)"/>
        <text x="80" y="7" fontSize="7" fill={C.pump} fontFamily="Courier New" textAnchor="middle">IN</text>
        <line x1="122" y1="80" x2="145" y2="80" stroke={C.pump} strokeWidth="1.5" markerEnd="url(#arrowBlue)"/>
        <text x="150" y="83" fontSize="7" fill={C.pump} fontFamily="Courier New">OUT</text>
        <text x="80" y="150" fontSize="8" fill={C.pump} fontFamily="Courier New" textAnchor="middle">CENTRIFUGAL</text>
        <defs><marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.pump}/></marker></defs>
      </g>
    ),
    gear:(
      <g>
        <circle cx="65" cy="80" r="30" fill={C.pressure} opacity={0.1} stroke={C.pressure} strokeWidth="1.5"/>
        <circle cx="95" cy="80" r="30" fill={C.pressure} opacity={0.1} stroke={C.pressure} strokeWidth="1.5"/>
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=>{
          const r=a*Math.PI/180;
          return <rect key={i} x={65+22*Math.cos(r)-3} y={80+22*Math.sin(r)-3} width="6" height="6" rx="1" fill={C.pressure} opacity={0.6} transform={`rotate(${a},${65+22*Math.cos(r)},${80+22*Math.sin(r)})`}/>;
        })}
        <line x1="65" y1="30" x2="65" y2="10" stroke={C.pressure} strokeWidth="1.5"/>
        <text x="65" y="7" fontSize="7" fill={C.pressure} fontFamily="Courier New" textAnchor="middle">IN</text>
        <line x1="95" y1="130" x2="95" y2="150" stroke={C.pressure} strokeWidth="1.5"/>
        <text x="95" y="158" fontSize="7" fill={C.pressure} fontFamily="Courier New" textAnchor="middle">OUT</text>
        <text x="80" y="175" fontSize="8" fill={C.pressure} fontFamily="Courier New" textAnchor="middle">GEAR PUMP</text>
      </g>
    ),
    screw:(
      <g>
        <rect x="30" y="50" width="100" height="60" rx="8" fill={C.safe} opacity={0.1} stroke={C.safe} strokeWidth="1.5"/>
        {[0,1,2,3,4].map(i=>(
          <g key={i}>
            <ellipse cx={45+i*15} cy="65" rx="6" ry="10" fill={C.safe} opacity={0.4} stroke={C.safe} strokeWidth="1"/>
            <ellipse cx={45+i*15} cy="95" rx="6" ry="10" fill={C.safe} opacity={0.3} stroke={C.safe} strokeWidth="1"/>
          </g>
        ))}
        <line x1="30" y1="80" x2="10" y2="80" stroke={C.safe} strokeWidth="1.5"/>
        <text x="7" y="83" fontSize="7" fill={C.safe} fontFamily="Courier New" textAnchor="end">IN</text>
        <line x1="130" y1="80" x2="150" y2="80" stroke={C.safe} strokeWidth="1.5"/>
        <text x="152" y="83" fontSize="7" fill={C.safe} fontFamily="Courier New">OUT</text>
        <text x="80" y="130" fontSize="8" fill={C.safe} fontFamily="Courier New" textAnchor="middle">SCREW PUMP</text>
      </g>
    ),
    piston:(
      <g>
        <rect x="40" y="40" width="80" height="80" rx="6" fill={C.danger} opacity={0.1} stroke={C.danger} strokeWidth="1.5"/>
        <rect x="60" y="55" width="40" height="50" rx="4" fill={C.navy3} stroke={C.danger} strokeWidth="1"/>
        <rect x="70" y="65" width="20" height="30" rx="3" fill={C.danger} opacity={0.4}/>
        <line x1="80" y1="95" x2="80" y2="115" stroke={C.danger} strokeWidth="3"/>
        <text x="80" y="130" fontSize="7" fill={C.danger} fontFamily="Courier New" textAnchor="middle">CONNECTING ROD</text>
        <line x1="80" y1="40" x2="80" y2="20" stroke={C.danger} strokeWidth="1.5"/>
        <text x="80" y="17" fontSize="7" fill={C.danger} fontFamily="Courier New" textAnchor="middle">HIGH P OUT</text>
        <text x="80" y="150" fontSize="8" fill={C.danger} fontFamily="Courier New" textAnchor="middle">PISTON PUMP</text>
      </g>
    ),
    diaphragm:(
      <g>
        <rect x="30" y="50" width="100" height="70" rx="8" fill={C.flow} opacity={0.1} stroke={C.flow} strokeWidth="1.5"/>
        <line x1="80" y1="50" x2="80" y2="120" stroke={C.flow} strokeWidth="2" strokeDasharray="4,3"/>
        <path d="M80 70 Q60 85 80 100 Q100 85 80 70Z" fill={C.flow} opacity={0.4} stroke={C.flow} strokeWidth="1.5"/>
        <line x1="30" y1="80" x2="10" y2="80" stroke={C.flow} strokeWidth="1.5"/>
        <text x="7" y="83" fontSize="7" fill={C.flow} fontFamily="Courier New" textAnchor="end">IN</text>
        <line x1="130" y1="90" x2="150" y2="90" stroke={C.flow} strokeWidth="1.5"/>
        <text x="152" y="93" fontSize="7" fill={C.flow} fontFamily="Courier New">OUT</text>
        <text x="80" y="140" fontSize="8" fill={C.flow} fontFamily="Courier New" textAnchor="middle">DIAPHRAGM</text>
      </g>
    ),
  };

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.pump}33`}}>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {Object.entries(pumps).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{
            padding:"5px 9px",borderRadius:8,fontSize:10,cursor:"pointer",
            background:sel===key?`${pumpColors[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?pumpColors[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?pumpColors[key]:"rgba(240,244,255,0.45)",
            fontFamily:"Courier New",
          }}>{key==="centrifugal"?"Centrifuge":key==="gear"?"Engrenages":key==="screw"?"Vis":key==="piston"?"Piston":"Membrane"}</button>
        ))}
      </div>
      <svg viewBox="0 0 160 185" style={{width:"100%",maxWidth:220,display:"block",margin:"0 auto"}}>
        {pumpSVGs[sel]}
      </svg>
      <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${pumpColors[sel]||C.pump}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
        <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{pumps[sel].name}</div>
        {pumps[sel].desc}
      </div>
    </div>
  );
}

// ── SVG 2 — CHARACTERISTIC CURVE ─────────────────────────────
function CharacteristicCurveSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [speed,setSpeed] = useState(100);

  const W=260,H=130,padL=30,padB=25,padT=10;
  const chartW=W-padL-10;
  const chartH=H-padB-padT;
  const toX=(q:number)=>padL+(q/120)*chartW;
  const toY=(h:number)=>padT+chartH-(h/60)*chartH;

  // Pump curve: H = Hmax - k*Q² (scaled by speed²)
  const speedRatio=speed/100;
  const pumpH=(q:number)=>Math.max(0,55*speedRatio*speedRatio - 0.003*(q/speedRatio)*(q/speedRatio)*speedRatio*speedRatio);
  // System curve: Hs = 10 + 0.003*Q²
  const sysH=(q:number)=>10+0.003*q*q;

  const pumpPts=Array.from({length:50},(_,i)=>{const q=i*2.4;return {x:toX(q),y:toY(pumpH(q))};});
  const sysPts=Array.from({length:50},(_,i)=>{const q=i*2.4;return {x:toX(q),y:toY(sysH(q))};});

  // Find intersection
  let intQ=0,intH=0;
  for(let q=0;q<120;q+=0.5){
    if(Math.abs(pumpH(q)-sysH(q))<2){intQ=q;intH=pumpH(q);break;}
  }

  const pathD=(pts:{x:number,y:number}[])=>pts.map((p,i)=>`${i===0?"M":"L"}${p.x},${p.y}`).join(" ");

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.pressure}33`}}>
      <div style={{marginBottom:10}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"rgba(240,244,255,0.6)",marginBottom:6}}>
          <span>{lang==="fr"?"Vitesse":lang==="es"?"Velocidad":lang==="pt"?"Velocidade":"Speed"}</span>
          <span style={{color:C.pressure,fontWeight:700}}>{speed}%</span>
        </div>
        <input type="range" min={50} max={110} value={speed} onChange={e=>setSpeed(Number(e.target.value))} style={{width:"100%",accentColor:C.pump}}/>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",display:"block"}}>
        {/* Grid */}
        {[0,30,60,90,120].map(q=>(
          <g key={q}>
            <line x1={toX(q)} y1={padT} x2={toX(q)} y2={H-padB} stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
            <text x={toX(q)} y={H-5} fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="Courier New" textAnchor="middle">{q}</text>
          </g>
        ))}
        {[0,20,40,60].map(h=>(
          <g key={h}>
            <line x1={padL} y1={toY(h)} x2={W-10} y2={toY(h)} stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
            <text x={padL-4} y={toY(h)+3} fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="Courier New" textAnchor="end">{h}</text>
          </g>
        ))}
        {/* Axes */}
        <line x1={padL} y1={padT} x2={padL} y2={H-padB} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
        <line x1={padL} y1={H-padB} x2={W-10} y2={H-padB} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
        {/* Curves */}
        <path d={pathD(pumpPts)} fill="none" stroke={C.pump} strokeWidth="2"/>
        <path d={pathD(sysPts)} fill="none" stroke={C.pressure} strokeWidth="2" strokeDasharray="5,3"/>
        {/* Operating point */}
        {intQ>0&&<circle cx={toX(intQ)} cy={toY(intH)} r="5" fill={C.safe} stroke="#fff" strokeWidth="1.5"/>}
        {/* Labels */}
        <text x={toX(20)} y={toY(pumpH(20))-5} fontSize="7" fill={C.pump} fontFamily="Courier New">PUMP</text>
        <text x={toX(80)} y={toY(sysH(80))-5} fontSize="7" fill={C.pressure} fontFamily="Courier New">SYSTEM</text>
        {intQ>0&&<text x={toX(intQ)+6} y={toY(intH)-5} fontSize="7" fill={C.safe} fontFamily="Courier New">OP</text>}
        {/* Axis labels */}
        <text x={W/2} y={H-1} fontSize="7" fill="rgba(255,255,255,0.4)" fontFamily="Courier New" textAnchor="middle">Q (m³/h)</text>
        <text x={8} y={H/2} fontSize="7" fill="rgba(255,255,255,0.4)" fontFamily="Courier New" textAnchor="middle" transform={`rotate(-90,8,${H/2})`}>H (m)</text>
      </svg>
      <div style={{display:"flex",gap:8,marginTop:8}}>
        <div style={{flex:1,padding:"7px 10px",borderRadius:8,background:`${C.navy3}cc`,border:`1px solid ${C.pump}33`,textAlign:"center"}}>
          <div style={{fontSize:9,color:"rgba(240,244,255,0.4)",fontFamily:"Courier New",marginBottom:2}}>Q oper.</div>
          <div style={{fontSize:13,fontWeight:700,color:C.pump,fontFamily:"Courier New"}}>{intQ>0?Math.round(intQ):"—"} m³/h</div>
        </div>
        <div style={{flex:1,padding:"7px 10px",borderRadius:8,background:`${C.navy3}cc`,border:`1px solid ${C.pressure}33`,textAlign:"center"}}>
          <div style={{fontSize:9,color:"rgba(240,244,255,0.4)",fontFamily:"Courier New",marginBottom:2}}>H oper.</div>
          <div style={{fontSize:13,fontWeight:700,color:C.pressure,fontFamily:"Courier New"}}>{intH>0?Math.round(intH):"—"} m</div>
        </div>
      </div>
    </div>
  );
}

// ── SVG 3 — HYDRAULIC COMPONENTS ─────────────────────────────
function HydraulicComponentsSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string|null>(null);
  const comps = t.hydraulicComponents;
  const compColors: Record<string,string> = {
    reservoir:C.pump, pump_h:C.pressure, filter:C.safe,
    valve:C.flow, relief:C.danger, accumulator:C.pipe,
  };

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.hydraulic}33`}}>
      <svg viewBox="0 0 280 140" style={{width:"100%",maxWidth:360,display:"block",margin:"0 auto"}}>
        {/* Reservoir */}
        <rect x="10" y="90" width="50" height="40" rx="4" fill={C.pump} opacity={0.15} stroke={C.pump} strokeWidth="1.5"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="reservoir"?null:"reservoir")}/>
        <text x="35" y="108" fontSize="7" fill={C.pump} fontFamily="Courier New" textAnchor="middle">TANK</text>
        <text x="35" y="118" fontSize="6" fill={C.pump} fontFamily="Courier New" textAnchor="middle">OIL</text>
        {/* Pump */}
        <circle cx="90" cy="100" r="18" fill={C.pressure} opacity={0.15} stroke={C.pressure} strokeWidth="1.5"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="pump_h"?null:"pump_h")}/>
        <text x="90" y="104" fontSize="7" fill={C.pressure} fontFamily="Courier New" textAnchor="middle">PUMP</text>
        {/* Filter */}
        <rect x="120" y="85" width="25" height="30" rx="4" fill={C.safe} opacity={0.15} stroke={C.safe} strokeWidth="1.5"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="filter"?null:"filter")}/>
        <text x="132" y="103" fontSize="6" fill={C.safe} fontFamily="Courier New" textAnchor="middle">FILT</text>
        {/* Pressure line */}
        <line x1="35" y1="90" x2="35" y2="70" stroke={C.pump} strokeWidth="1.5"/>
        <line x1="35" y1="70" x2="72" y2="70" stroke={C.pump} strokeWidth="1.5"/>
        <line x1="72" y1="70" x2="72" y2="100" stroke={C.pump} strokeWidth="1.5"/>
        <line x1="108" y1="100" x2="120" y2="100" stroke={C.pressure} strokeWidth="2"/>
        {/* Relief valve */}
        <rect x="145" y="55" width="20" height="25" rx="3" fill={C.danger} opacity={0.15} stroke={C.danger} strokeWidth="1.5"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="relief"?null:"relief")}/>
        <text x="155" y="71" fontSize="6" fill={C.danger} fontFamily="Courier New" textAnchor="middle">RV</text>
        <line x1="145" y1="68" x2="145" y2="100" stroke={C.danger} strokeWidth="1" strokeDasharray="3,2"/>
        {/* Directional valve */}
        <rect x="155" y="85" width="35" height="30" rx="4" fill={C.flow} opacity={0.15} stroke={C.flow} strokeWidth="1.5"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="valve"?null:"valve")}/>
        <text x="172" y="103" fontSize="6" fill={C.flow} fontFamily="Courier New" textAnchor="middle">D/V</text>
        {/* Accumulator */}
        <ellipse cx="225" cy="75" rx="15" ry="25" fill={C.pipe} opacity={0.15} stroke={C.pipe} strokeWidth="1.5"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="accumulator"?null:"accumulator")}/>
        <text x="225" y="77" fontSize="6" fill={C.pipe} fontFamily="Courier New" textAnchor="middle">ACC</text>
        {/* Lines */}
        <line x1="145" y1="100" x2="155" y2="100" stroke={C.pressure} strokeWidth="2"/>
        <line x1="190" y1="100" x2="215" y2="100" stroke={C.pressure} strokeWidth="2"/>
        <line x1="215" y1="100" x2="215" y2="75" stroke={C.pipe} strokeWidth="1.5" strokeDasharray="3,2"/>
        {/* Actuator */}
        <rect x="230" y="85" width="40" height="30" rx="4" fill={C.pipe} opacity={0.15} stroke={C.pipe} strokeWidth="1.5"/>
        <text x="250" y="103" fontSize="7" fill={C.pipe} fontFamily="Courier New" textAnchor="middle">ACT</text>
        <line x1="215" y1="100" x2="230" y2="100" stroke={C.pressure} strokeWidth="2"/>
      </svg>

      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
        {Object.entries(comps).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(sel===key?null:key)} style={{
            padding:"4px 8px",borderRadius:8,fontSize:10,cursor:"pointer",
            background:sel===key?`${compColors[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?compColors[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?compColors[key]:"rgba(240,244,255,0.45)",
            fontFamily:"Courier New",
          }}>{key==="reservoir"?"TANK":key==="pump_h"?"PUMP":key==="filter"?"FILTER":key==="valve"?"D/VALVE":key==="relief"?"RELIEF":"ACC"}</button>
        ))}
      </div>
      {sel&&(
        <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${compColors[sel]||C.hydraulic}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
          <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{comps[sel].name}</div>
          {comps[sel].desc}
        </div>
      )}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)"}}>{t.s3hint}</div>}
    </div>
  );
}

// ── SVG 4 — FAULTS ────────────────────────────────────────────
function FaultsSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string|null>(null);
  const faults = t.faults;
  const faultColors: Record<string,string> = {
    cavitation:C.danger, noflow:C.pump, overheat:C.pressure, vibration:C.flow,
  };

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.danger}33`}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {Object.entries(faults).map(([key,val]:any)=>{
          const col=faultColors[key]||C.danger;
          return(
            <button key={key} onClick={()=>setSel(sel===key?null:key)} style={{
              padding:"10px 8px",borderRadius:10,cursor:"pointer",textAlign:"left",
              background:sel===key?`${col}18`:"rgba(255,255,255,0.04)",
              border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`,
            }}>
              <div style={{fontSize:11,fontWeight:700,color:"#f0f4ff",fontFamily:"Courier New",marginBottom:2}}>{val.name}</div>
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
  const section=(title:string,children:React.ReactNode,color=C.pump)=>(
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
      {section(t.s1title,<PumpTypesSVG lang={lang}/>,C.pump)}
      {section(t.s2title,<CharacteristicCurveSVG lang={lang}/>,C.pressure)}
      {section(t.s3title,<HydraulicComponentsSVG lang={lang}/>,C.hydraulic)}
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
        <div key={i} style={{marginBottom:14,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.pump}33`,overflow:"hidden"}}>
          <div style={{padding:"12px 14px"}}>
            <div style={{fontSize:10,color:C.pump,letterSpacing:1,marginBottom:6,fontFamily:"'Cinzel',serif"}}>Q{i+1}</div>
            <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>{q.q}</div>
          </div>
          <div style={{padding:"0 14px 12px"}}>
            <button onClick={()=>toggle(i)} style={{padding:"7px 14px",borderRadius:8,fontSize:11,cursor:"pointer",background:shown[i]?`${C.pump}22`:"rgba(255,255,255,0.06)",border:`1px solid ${shown[i]?C.pump:"rgba(255,255,255,0.15)"}`,color:shown[i]?C.pump:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{shown[i]?t.hideAnswer:t.showAnswer}</button>
            {shown[i]&&<div style={{marginTop:10,padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.pump}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{q.a}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
// LessonE2_L3 — PART 2: Bank + Quiz + Main

function getBank(lang: string) {
  const banks: any = {
    fr:[
      {q:"Qu'est-ce que le NPSH et pourquoi est-il important ?",a:"NPSH (Net Positive Suction Head) = Hauteur nette d'aspiration positive. C'est la différence entre la pression absolue en aspiration de la pompe et la pression de vapeur saturante du liquide, exprimée en mètres de colonne de liquide. NPSH disponible (NPSHd) : dépend de l'installation (hauteur géométrique, pertes de charge, pression atmosphérique). NPSH requis (NPSHr) : caractéristique de la pompe donnée par le fabricant. Règle : NPSHd > NPSHr + marge de sécurité (0,5 à 1 m). Si NPSHd < NPSHr : cavitation. La cavitation détruit la pompe en heures."},
      {q:"Quelle est la différence entre une pompe auto-amorçante et une pompe non auto-amorçante ?",a:"Pompe non auto-amorçante (centrifuge) : ne peut pas aspirer de l'air. Doit être amorcée (remplie de liquide) avant démarrage. Si la tuyauterie d'aspiration est vide ou si une poche d'air se forme, la pompe ne peut pas créer de dépression suffisante. Pompe auto-amorçante (volumétrique : engrenages, pistons, vis) : peut aspirer un mélange air-liquide et se vider elle-même. Permet une installation plus flexible (aspiration depuis un réservoir inférieur). La pompe centrifuge est non auto-amorçante mais peut être rendue auto-amorçante avec un pied de crépine et un clapet anti-retour."},
      {q:"Comment fonctionne un accumulateur hydraulique et quel est son rôle ?",a:"Un accumulateur hydraulique est un récipient pressurisé contenant de l'huile hydraulique et du gaz (généralement azote N2) séparés par un piston, une membrane ou une vessie. Fonctionnement : quand la pression augmente, l'huile comprime le gaz. Quand la pression chute (débit demandé), le gaz détend et expulse l'huile. Rôles à bord : absorption des pulsations de pression (pompes à pistons), fourniture instantanée d'un débit important (actionnement rapide d'un gouvernail), maintien de la pression en cas d'arrêt de la pompe (sécurité), compensation des dilatations thermiques."},
      {q:"Quels sont les différents types de garnitures d'étanchéité sur une pompe centrifuge ?",a:"1. Presse-étoupe (garniture à tresse) : la plus ancienne. Un cordage en matériau tressé est comprimé autour de l'arbre. Un léger suintement est normal et nécessaire pour la lubrification. Simple mais maintenance régulière. 2. Garniture mécanique (mechanical seal) : deux faces planes (fixe et tournante) en graphite/carbure de silicium maintenues en contact par un ressort. Pas de fuites normalement. Plus fiable et durable. 3. Joint à lèvres : pour pompes à basse pression. 4. Joint magnétique : pompes sans étanchéité dynamique (fluides dangereux). Le choix dépend du fluide pompé, de la pression et de la température."},
      {q:"Expliquez la loi de similarité des pompes (loi des puissances) pour le changement de vitesse.",a:"La loi de similarité (ou affinité) décrit l'évolution des performances d'une pompe centrifuge quand sa vitesse change : Q₂/Q₁ = n₂/n₁ (débit proportionnel à la vitesse) H₂/H₁ = (n₂/n₁)² (hauteur proportionnelle au carré de la vitesse) P₂/P₁ = (n₂/n₁)³ (puissance proportionnelle au cube de la vitesse) Conséquence pratique : réduire la vitesse d'une pompe de 20% réduit le débit de 20%, la hauteur de 36% et la puissance de 49%. C'est la base des variateurs de fréquence (VFD) pour économiser l'énergie — très importants à bord pour les pompes de ballast et refroidissement."},
      {q:"Qu'est-ce que la courbe caractéristique d'une pompe et d'un réseau ?",a:"Courbe de pompe : représente la hauteur manométrique H (m) en fonction du débit Q (m³/h) pour une vitesse donnée. H décroît quand Q augmente. Point de démarrage à débit nul : hauteur maximale (Hmax). Courbe de réseau (ou système) : représente la pression nécessaire pour faire circuler un débit Q dans le circuit. H augmente avec Q² (pertes de charge). Forme : Hs = H statique + k × Q². Point de fonctionnement : intersection de la courbe pompe et de la courbe réseau. C'est le débit et la pression réels de fonctionnement. Toute modification du réseau (vanne, filtre colmaté) déplace ce point."},
      {q:"Quelles sont les pompes utilisées pour le ballastage et pourquoi ?",a:"Les pompes de ballast sont généralement des pompes centrifuges à grande capacité car : les débits requis sont importants (remplissage rapide), le fluide (eau de mer) est peu visqueux, la pression requise est modérée (pas de longues tuyauteries), la robustesse est primordiale (eau de mer corrosive avec particules). Caractéristiques typiques : débit 500 à 2000 m³/h, hauteur 20 à 40 m, matériaux en bronze ou acier inox. Une pompe de ballast est souvent réversible (aspiration et refoulement pouvant être inversés) pour pomper dans les deux sens. Certains navires utilisent des pompes à jet d'eau (éjecteurs) pour les citernes difficiles d'accès."},
      {q:"Quelles sont les pompes utilisées pour le fuel oil (HFO) et pourquoi ?",a:"Le HFO (Heavy Fuel Oil) est extrêmement visqueux (jusqu'à 700 cSt à température ambiante) et doit être chauffé à 120-150°C pour être pompé. Pompes utilisées : pompes à vis (screw pumps) — idéales pour fluides visqueux, débit régulier, pas de dégradation du fuel par turbulence, pompes à engrenages — pour faibles débits à haute pression (alimentation moteur). Caractéristiques nécessaires : matériaux résistant aux températures élevées, étanchéité adaptée au HFO chaud, possibilité de vidange complète (pas de poches). La viscosité doit être ramenée à 10-20 cSt avant l'injection moteur via un viscosimètre et un réchauffeur."},
      {q:"Comment diagnostiquer une garniture mécanique défectueuse sur une pompe ?",a:"Signes d'une garniture mécanique défectueuse : fuite visible au niveau du joint de l'arbre (normale : quelques gouttes/heure ; anormale : filet continu), bruit inhabituel (grincement si les faces sont en contact sec), élévation de température anormale au niveau du joint, vibrations excessives (faces désalignées). Causes : usure normale des faces (remplacement préventif tous les 2-3 ans), contamination du fluide (particules abrasives), choc thermique (fonctionnement à sec même bref), mauvais alignement moteur-pompe. Maintenance : le remplacement nécessite l'arrêt, la dépose et le démontage de la pompe. Toujours remplacer le joint complet (faces + ressort + joints toriques)."},
      {q:"Qu'est-ce qu'une pompe submersible et où est-elle utilisée à bord ?",a:"Une pompe submersible (ou pompe immergée) est une pompe dont le moteur et la pompe sont étanchéifiés et peuvent fonctionner immergés dans le fluide. Avantages : pas de problème d'amorçage (toujours immergée), installation simple, économie d'espace, réduction du bruit. Utilisations à bord : pompes de cale et sentines (vider les fonds en cas d'avarie), pompes de vidange des soutes et citernes, pompes de puisard, alimentation d'eau de mer depuis un puisard bas. Inconvénients : maintenance difficile (nécessite l'extraction de la pompe), moteur soumis à l'échauffement du fluide pompé."},
      {q:"Qu'est-ce qu'un éjecteur (jet pump) et comment fonctionne-t-il ?",a:"Un éjecteur est un dispositif sans pièces mobiles qui utilise l'effet Venturi pour créer une dépression et aspirer un fluide. Fonctionnement : un fluide moteur (eau, vapeur) est injecté à grande vitesse dans une tuyère convergente, créant une zone de basse pression qui aspire le fluide à pomper, les deux fluides se mélangent dans la chambre de mélange et sont comprimés dans le diffuseur. Utilisations à bord : vidange de cales difficiles d'accès, éjection des condensats, aspiration des soutes de mazout. Avantages : pas de pièces mobiles (fiabilité maximale), peut pomper des mélanges liquide-gaz, peu d'entretien. Inconvénient : faible rendement énergétique."},
      {q:"Comment maintenir les pompes de ballast selon le SMS (Safety Management System) ?",a:"Entretien périodique selon le PMS (Planned Maintenance System) : Hebdomadaire : vérification du niveau d'huile des paliers, contrôle visuel des fuites (presse-étoupe/garniture). Mensuel : vérification de l'état des roulements (vibrations, température), lubrification des roulements si nécessaire, test de démarrage et vérification du débit. Annuel : inspection et nettoyage de la roue, contrôle de l'usure de la roue et de la volute, contrôle de l'alignement moteur-pompe, remplacement préventif de la garniture d'étanchéité si nécessaire. Tous les 2-3 ans : révision complète (roue, volute, roulements, garniture, joints). Toutes les interventions sont consignées dans le registre de maintenance du navire."},
    ],
    en:[
      {q:"What is NPSH and why is it important?",a:"NPSH (Net Positive Suction Head) is the difference between absolute pressure at the pump suction and the saturated vapour pressure of the liquid, expressed in metres of liquid column. Available NPSH (NPSHa): depends on installation (geometric height, head losses, atmospheric pressure). Required NPSH (NPSHr): pump characteristic given by manufacturer. Rule: NPSHa > NPSHr + safety margin (0.5 to 1 m). If NPSHa < NPSHr: cavitation. Cavitation destroys the pump in hours."},
      {q:"What is the difference between a self-priming and a non-self-priming pump?",a:"Non-self-priming (centrifugal): cannot draw air. Must be primed (filled with liquid) before starting. If suction piping is empty or an air pocket forms, the pump cannot create sufficient vacuum. Self-priming (positive displacement: gear, piston, screw): can draw an air-liquid mixture and self-empty. Allows more flexible installation. The centrifugal pump can be made self-priming with a foot valve and check valve."},
      {q:"How does a hydraulic accumulator work and what is its role?",a:"A hydraulic accumulator is a pressurised vessel containing hydraulic oil and gas (usually nitrogen N2) separated by a piston, membrane or bladder. When pressure increases, oil compresses the gas. When pressure drops, gas expands and expels oil. Roles on board: absorbing pressure pulsations (piston pumps), providing instant high flow (rapid rudder actuation), maintaining pressure on pump shutdown (safety), compensating thermal expansion."},
      {q:"What are the different types of shaft seals on a centrifugal pump?",a:"1. Stuffing box (packing gland): oldest type. Braided material compressed around shaft. Slight seepage normal for lubrication. 2. Mechanical seal: two flat faces (fixed and rotating) in graphite/silicon carbide maintained by a spring. No leaks normally. More reliable and durable. 3. Lip seal: for low-pressure pumps. 4. Magnetic seal: for pumps with no dynamic sealing (hazardous fluids). Choice depends on fluid, pressure and temperature."},
      {q:"Explain pump similarity laws (power laws) for speed change.",a:"Similarity (affinity) laws for centrifugal pump speed change: Q₂/Q₁ = n₂/n₁ (flow proportional to speed) H₂/H₁ = (n₂/n₁)² (head proportional to speed squared) P₂/P₁ = (n₂/n₁)³ (power proportional to speed cubed). Practical consequence: reducing pump speed by 20% reduces flow by 20%, head by 36% and power by 49%. This is the basis of VFDs (Variable Frequency Drives) for energy saving — very important on board for ballast and cooling pumps."},
      {q:"What are the pump and system characteristic curves?",a:"Pump curve: represents head H (m) vs flow Q (m³/h) at given speed. H decreases as Q increases. System (network) curve: represents pressure needed to circulate flow Q through the circuit. H increases with Q² (head losses). Form: Hs = static head + k × Q². Operating point: intersection of pump and system curves. This is the actual operating flow and pressure. Any network change (valve, clogged filter) shifts this point."},
      {q:"What pumps are used for ballasting and why?",a:"Ballast pumps are generally large-capacity centrifugal pumps because: high flows required (rapid filling), fluid (seawater) has low viscosity, moderate pressure required, robustness essential (corrosive seawater with particles). Typical characteristics: flow 500-2000 m³/h, head 20-40 m, bronze or stainless steel materials. Often reversible for bidirectional pumping."},
      {q:"What pumps are used for fuel oil (HFO) and why?",a:"HFO is extremely viscous (up to 700 cSt at ambient temperature) and must be heated to 120-150°C for pumping. Pumps used: screw pumps — ideal for viscous fluids, smooth flow, no fuel degradation; gear pumps — for low flows at high pressure (engine fuel supply). Must be heated, have high-temperature resistant materials and complete drainage capability."},
      {q:"How to diagnose a defective mechanical seal on a pump?",a:"Signs of defective mechanical seal: visible leak at shaft seal (normal: few drops/hour; abnormal: continuous trickle), unusual noise (squealing if faces run dry), abnormal temperature rise at seal, excessive vibration (misaligned faces). Causes: normal face wear, fluid contamination, thermal shock (even brief dry running), motor-pump misalignment. Maintenance: replacement requires pump shutdown, removal and disassembly. Always replace complete seal (faces + spring + O-rings)."},
      {q:"What is a submersible pump and where is it used on board?",a:"A submersible pump is a pump whose motor and pump are sealed and can operate submerged in the fluid. Advantages: no priming problem, simple installation, space saving, noise reduction. On-board uses: bilge and drain pumps (emergency drainage), tank and bunker drainage, sump pumps, seawater supply from low sumps."},
      {q:"What is an ejector (jet pump) and how does it work?",a:"An ejector is a device with no moving parts using the Venturi effect to create suction. Operation: a motive fluid (water, steam) is injected at high speed through a converging nozzle, creating a low-pressure zone that draws in the fluid to be pumped; both fluids mix in the mixing chamber and are compressed in the diffuser. On-board uses: drainage of confined spaces, condensate ejection, bunker suction. Advantages: no moving parts (maximum reliability), can handle liquid-gas mixtures."},
      {q:"How to maintain ballast pumps per the SMS (Safety Management System)?",a:"Periodic maintenance per PMS: Weekly: bearing oil level check, visual leak check. Monthly: bearing condition (vibration, temperature), lubrication, start test and flow check. Annual: impeller inspection and cleaning, wear check, motor-pump alignment check, preventive seal replacement if needed. Every 2-3 years: full overhaul (impeller, volute, bearings, seal, gaskets). All interventions logged in vessel maintenance records."},
    ],
    es:[
      {q:"¿Qué es el NPSH y por qué es importante?",a:"NPSH (Net Positive Suction Head) = diferencia entre la presión absoluta en la aspiración de la bomba y la presión de vapor saturado del líquido, expresada en metros de columna de líquido. NPSH disponible (NPSHd): depende de la instalación. NPSH requerido (NPSHr): característica de la bomba. Regla: NPSHd > NPSHr + margen de seguridad. Si NPSHd < NPSHr: cavitación. La cavitación destruye la bomba en horas."},
      {q:"¿Cuál es la diferencia entre una bomba autocebante y una no autocebante?",a:"No autocebante (centrífuga): no puede aspirar aire. Debe cebarse antes del arranque. Autocebante (volumétrica): puede aspirar mezcla aire-líquido y vaciarse sola. La bomba centrífuga puede hacerse autocebante con pie de crépine y válvula de retención."},
      {q:"¿Cómo funciona un acumulador hidráulico y cuál es su papel?",a:"Recipiente presurizado con aceite hidráulico y gas (N2) separados por pistón, membrana o vejiga. Al aumentar la presión, el aceite comprime el gas. Al bajar la presión, el gas expande y expulsa el aceite. Funciones: absorber pulsaciones, proporcionar caudal instantáneo, mantener presión en caso de corte de bomba."},
      {q:"¿Cuáles son los tipos de cierre de árbol en una bomba centrífuga?",a:"1. Prensaestopas: el más antiguo, con trenza comprimida alrededor del árbol. Pequeño goteo normal. 2. Cierre mecánico: dos caras planas en contacto por un resorte. Sin fugas normalmente. Más fiable. 3. Labio de estanqueidad: para baja presión. 4. Cierre magnético: para fluidos peligrosos."},
      {q:"Explique las leyes de semejanza de bombas para el cambio de velocidad.",a:"Q₂/Q₁ = n₂/n₁ (caudal proporcional a la velocidad). H₂/H₁ = (n₂/n₁)² (altura proporcional al cuadrado). P₂/P₁ = (n₂/n₁)³ (potencia proporcional al cubo). Reducir la velocidad un 20% reduce el caudal un 20%, la altura un 36% y la potencia un 49%. Base de los variadores de frecuencia (VFD)."},
      {q:"¿Qué son la curva característica de una bomba y de una red?",a:"Curva de bomba: H (m) vs Q (m³/h). H disminuye cuando Q aumenta. Curva de red: Hs = H estática + k×Q². Punto de funcionamiento: intersección de ambas curvas."},
      {q:"¿Qué bombas se usan para el lastre y por qué?",a:"Bombas centrífugas de gran capacidad: grandes caudales, agua de mar poco viscosa, presión moderada, robustez. Caudal típico 500-2000 m³/h, altura 20-40 m, materiales en bronce o acero inoxidable."},
      {q:"¿Qué bombas se usan para el fuel oil (HFO) y por qué?",a:"El HFO es muy viscoso y debe calentarse a 120-150°C. Bombas de tornillo (fluidos viscosos, caudal regular) y engranajes (pequeños caudales alta presión). Materiales resistentes a altas temperaturas."},
      {q:"¿Cómo diagnosticar un cierre mecánico defectuoso en una bomba?",a:"Signos: fuga visible (normal: pocas gotas/hora), ruido inusual, elevación de temperatura, vibraciones. Causas: desgaste normal, contaminación, funcionamiento en seco, desalineación. Mantenimiento: reemplazar el cierre completo."},
      {q:"¿Qué es una bomba sumergible y dónde se usa a bordo?",a:"Bomba con motor y bomba estancos que funcionan sumergidos. Ventajas: sin problemas de cebado, instalación simple. Usos: sentinas, vaciado de tanques, sumideros."},
      {q:"¿Qué es un eyector (bomba de chorro) y cómo funciona?",a:"Dispositivo sin piezas móviles usando el efecto Venturi. Un fluido motor crea depresión que aspira el fluido a bombear. Usos: vaciado de espacios confinados, eyección de condensados. Ventaja: sin piezas móviles."},
      {q:"¿Cómo mantener las bombas de lastre según el SMS?",a:"Semanal: nivel de aceite, fugas. Mensual: rodamientos, lubricación, prueba de arranque. Anual: inspección del rodete, alineación, cierre mecánico. Cada 2-3 años: revisión completa. Todo registrado en el sistema de mantenimiento."},
    ],
    pt:[
      {q:"O que é o NPSH e por que é importante?",a:"NPSH (Net Positive Suction Head) = diferença entre pressão absoluta na aspiração da bomba e pressão de vapor saturado do líquido, em metros de coluna de líquido. NPSH disponível (NPSHd): depende da instalação. NPSH requerido (NPSHr): característica da bomba. Regra: NPSHd > NPSHr + margem de segurança. Se NPSHd < NPSHr: cavitação. A cavitação destrói a bomba em horas."},
      {q:"Qual é a diferença entre uma bomba autocebante e uma não autocebante?",a:"Não autocebante (centrífuga): não pode aspirar ar. Deve ser cebada antes de arrancar. Autocebante (volumétrica): pode aspirar mistura ar-líquido. A bomba centrífuga pode tornar-se autocebante com pé de crivo e válvula de retenção."},
      {q:"Como funciona um acumulador hidráulico e qual é o seu papel?",a:"Recipiente pressurizado com óleo hidráulico e gás (N2) separados por pistão, membrana ou bexiga. Ao aumentar a pressão, o óleo comprime o gás. Ao baixar, o gás expande e expulsa o óleo. Funções: absorver pulsações, fornecer caudal instantâneo, manter pressão em caso de corte de bomba."},
      {q:"Quais são os tipos de vedação de veio numa bomba centrífuga?",a:"1. Caixa de gaxeta: mais antiga, com trança comprimida em torno do veio. Pequena fuga normal. 2. Vedação mecânica: duas faces planas em contacto por mola. Sem fugas normalmente. Mais fiável. 3. Lábio de vedação: baixa pressão. 4. Vedação magnética: fluidos perigosos."},
      {q:"Explique as leis de semelhança de bombas para mudança de velocidade.",a:"Q₂/Q₁ = n₂/n₁ (caudal proporcional à velocidade). H₂/H₁ = (n₂/n₁)² (altura proporcional ao quadrado). P₂/P₁ = (n₂/n₁)³ (potência proporcional ao cubo). Base dos variadores de frequência (VFD)."},
      {q:"O que são a curva característica de uma bomba e de uma rede?",a:"Curva de bomba: H (m) vs Q (m³/h). H diminui quando Q aumenta. Curva de rede: Hs = H estática + k×Q². Ponto de funcionamento: intersecção das duas curvas."},
      {q:"Que bombas se usam para o lastro e porquê?",a:"Bombas centrífugas de grande capacidade: caudais elevados, água do mar pouco viscosa, pressão moderada, robustez. Caudal típico 500-2000 m³/h, altura 20-40 m, materiais em bronze ou aço inox."},
      {q:"Que bombas se usam para o fuel oil (HFO) e porquê?",a:"O HFO é muito viscoso e deve ser aquecido a 120-150°C. Bombas de parafuso (fluidos viscosos, caudal regular) e engrenagens (pequenos caudais alta pressão). Materiais resistentes a altas temperaturas."},
      {q:"Como diagnosticar uma vedação mecânica defeituosa numa bomba?",a:"Sinais: fuga visível (normal: poucas gotas/hora), ruído invulgar, temperatura elevada, vibrações. Causas: desgaste normal, contaminação, funcionamento a seco, desalinhamento. Manutenção: substituir vedação completa."},
      {q:"O que é uma bomba submersível e onde se usa a bordo?",a:"Bomba com motor e bomba estanques que funcionam submersos. Vantagens: sem problemas de cebamento, instalação simples. Usos: sentinas, esvaziamento de tanques, sumidouros."},
      {q:"O que é um ejetor (bomba de jacto) e como funciona?",a:"Dispositivo sem peças móveis usando o efeito Venturi. Um fluido motor cria depressão que aspira o fluido a bombear. Usos: esvaziamento de espaços confinados, ejeção de condensados. Vantagem: sem peças móveis."},
      {q:"Como manter as bombas de lastro segundo o SMS?",a:"Semanal: nível de óleo, fugas. Mensal: rolamentos, lubrificação, teste de arranque. Anual: inspeção da roda, alinhamento, vedação mecânica. De 2-3 em 2-3 anos: revisão completa. Tudo registado no sistema de manutenção."},
    ],
  };
  return banks[lang]||banks.fr;
}

function getQuiz(lang: string) {
  const quizzes: any = {
    fr:[
      {q:"Quel type de pompe est le plus répandu à bord pour le ballastage ?",opts:["Pompe à pistons","Pompe centrifuge","Pompe à engrenages","Pompe à vis"],correct:1,exp:"La pompe centrifuge est la plus répandue à bord pour le ballastage car elle offre un débit élevé à pression modérée, est robuste et simple. Elle est idéale pour les grands débits d'eau de mer (500-2000 m³/h)."},
      {q:"La cavitation se produit quand :",opts:["La pression de refoulement est trop élevée","La pression d'aspiration descend sous la pression de vapeur du liquide","La vitesse de rotation est trop élevée","Le débit est trop important"],correct:1,exp:"La cavitation se produit quand la pression absolue en aspiration chute sous la pression de vapeur saturante du liquide. Des bulles de vapeur se forment et implosent violemment sur la roue, causant érosion et vibrations."},
      {q:"Quel composant d'un circuit hydraulique limite la pression maximale ?",opts:["Le filtre hydraulique","L'accumulateur","La soupape de sûreté","Le distributeur"],correct:2,exp:"La soupape de sûreté (relief valve) limite la pression maximale du circuit hydraulique en s'ouvrant quand la pression dépasse le seuil réglé et en renvoyant l'huile au réservoir. C'est une protection obligatoire."},
      {q:"Selon les lois de similarité des pompes, si on double la vitesse d'une pompe centrifuge, la puissance consommée est multipliée par :",opts:["2","4","8","16"],correct:2,exp:"Selon la loi de similarité : P₂/P₁ = (n₂/n₁)³. Si n₂ = 2×n₁ : P₂ = P₁ × 2³ = 8×P₁. La puissance est proportionnelle au cube de la vitesse. C'est pourquoi les variateurs de fréquence permettent d'économiser beaucoup d'énergie."},
      {q:"Une pompe à engrenages est préférée pour pomper du fuel oil lourd (HFO) car :",opts:["Elle a un débit plus élevé qu'une centrifuge","Elle est auto-amorçante et adaptée aux fluides visqueux","Elle coûte moins cher","Elle ne nécessite pas d'entretien"],correct:1,exp:"La pompe à engrenages est auto-amorçante et gère très bien les fluides visqueux comme le HFO. Elle maintient un débit constant quelle que soit la viscosité du fluide, contrairement à la pompe centrifuge dont les performances chutent avec les fluides visqueux."},
    ],
    en:[
      {q:"Which pump type is most common on board for ballasting?",opts:["Piston pump","Centrifugal pump","Gear pump","Screw pump"],correct:1,exp:"The centrifugal pump is most common on board for ballasting as it offers high flow at moderate pressure, is robust and simple. Ideal for large seawater flows (500-2000 m³/h)."},
      {q:"Cavitation occurs when:",opts:["Delivery pressure is too high","Suction pressure drops below liquid vapour pressure","Rotation speed is too high","Flow is too high"],correct:1,exp:"Cavitation occurs when absolute suction pressure drops below the liquid's saturated vapour pressure. Vapour bubbles form and implode violently on the impeller, causing erosion and vibration."},
      {q:"Which hydraulic circuit component limits maximum pressure?",opts:["Hydraulic filter","Accumulator","Relief valve","Directional valve"],correct:2,exp:"The relief valve limits maximum hydraulic circuit pressure by opening when pressure exceeds the set threshold and returning oil to the reservoir. Mandatory overpressure protection."},
      {q:"Per pump similarity laws, doubling centrifugal pump speed multiplies power consumption by:",opts:["2","4","8","16"],correct:2,exp:"Similarity law: P₂/P₁ = (n₂/n₁)³. If n₂ = 2×n₁: P₂ = P₁ × 8. Power is proportional to speed cubed. This is why VFDs achieve great energy savings."},
      {q:"A gear pump is preferred for heavy fuel oil (HFO) because:",opts:["It has higher flow than centrifugal","It is self-priming and handles viscous fluids well","It costs less","It requires no maintenance"],correct:1,exp:"The gear pump is self-priming and handles viscous fluids like HFO very well. It maintains constant flow regardless of fluid viscosity, unlike the centrifugal pump whose performance drops with viscous fluids."},
    ],
    es:[
      {q:"¿Qué tipo de bomba es más habitual a bordo para el lastre?",opts:["Bomba de pistones","Bomba centrífuga","Bomba de engranajes","Bomba de tornillo"],correct:1,exp:"La bomba centrífuga es la más habitual para el lastre: gran caudal a presión moderada, robusta y simple. Ideal para grandes caudales de agua de mar (500-2000 m³/h)."},
      {q:"La cavitación se produce cuando:",opts:["La presión de descarga es demasiado alta","La presión de aspiración baja de la presión de vapor del líquido","La velocidad de giro es demasiado alta","El caudal es demasiado grande"],correct:1,exp:"La cavitación se produce cuando la presión absoluta en aspiración cae por debajo de la presión de vapor saturado del líquido. Las burbujas de vapor implotan violentamente en el rodete, causando erosión y vibraciones."},
      {q:"¿Qué componente del circuito hidráulico limita la presión máxima?",opts:["El filtro hidráulico","El acumulador","La válvula de seguridad","El distribuidor"],correct:2,exp:"La válvula de seguridad limita la presión máxima abriéndose cuando supera el umbral ajustado y devolviendo el aceite al depósito. Protección obligatoria contra sobrepresión."},
      {q:"Según las leyes de semejanza, si se duplica la velocidad de una bomba centrífuga, la potencia consumida se multiplica por:",opts:["2","4","8","16"],correct:2,exp:"Ley de semejanza: P₂/P₁ = (n₂/n₁)³. Si n₂ = 2×n₁: P₂ = 8×P₁. La potencia es proporcional al cubo de la velocidad. Por eso los variadores de frecuencia ahorran mucha energía."},
      {q:"Se prefiere una bomba de engranajes para el fuel oil pesado (HFO) porque:",opts:["Tiene mayor caudal que la centrífuga","Es autocebante y apta para fluidos viscosos","Cuesta menos","No requiere mantenimiento"],correct:1,exp:"La bomba de engranajes es autocebante y maneja muy bien los fluidos viscosos como el HFO. Mantiene caudal constante independientemente de la viscosidad, al contrario de la centrífuga."},
    ],
    pt:[
      {q:"Que tipo de bomba é mais comum a bordo para o lastro?",opts:["Bomba de pistões","Bomba centrífuga","Bomba de engrenagens","Bomba de parafuso"],correct:1,exp:"A bomba centrífuga é a mais comum para o lastro: caudal elevado a pressão moderada, robusta e simples. Ideal para grandes caudais de água do mar (500-2000 m³/h)."},
      {q:"A cavitação ocorre quando:",opts:["A pressão de descarga é demasiado alta","A pressão de aspiração desce abaixo da pressão de vapor do líquido","A velocidade de rotação é demasiado alta","O caudal é demasiado elevado"],correct:1,exp:"A cavitação ocorre quando a pressão absoluta na aspiração cai abaixo da pressão de vapor saturado do líquido. Bolhas de vapor formam-se e implodem violentamente na roda, causando erosão e vibrações."},
      {q:"Que componente do circuito hidráulico limita a pressão máxima?",opts:["O filtro hidráulico","O acumulador","A válvula de segurança","O distribuidor"],correct:2,exp:"A válvula de segurança limita a pressão máxima abrindo quando a pressão excede o limiar regulado e devolvendo o óleo ao reservatório. Proteção obrigatória contra sobrepressão."},
      {q:"Segundo as leis de semelhança, duplicar a velocidade de uma bomba centrífuga multiplica a potência consumida por:",opts:["2","4","8","16"],correct:2,exp:"Lei de semelhança: P₂/P₁ = (n₂/n₁)³. Se n₂ = 2×n₁: P₂ = 8×P₁. A potência é proporcional ao cubo da velocidade. Por isso os variadores de frequência permitem grande poupança de energia."},
      {q:"Prefere-se uma bomba de engrenagens para o fuel oil pesado (HFO) porque:",opts:["Tem maior caudal que a centrífuga","É autocebante e adequada a fluidos viscosos","Custa menos","Não requer manutenção"],correct:1,exp:"A bomba de engrenagens é autocebante e lida muito bem com fluidos viscosos como o HFO. Mantém caudal constante independentemente da viscosidade, ao contrário da centrífuga."},
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
  const C2={pump:"#4da6ff",gold:"#c9922a",gold2:"#e8b94f",navy2:"#0a1628",navy3:"#0d1f3c"};
  return (
    <div style={{padding:"14px 14px 24px"}}>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C2.gold,marginBottom:14}}>📚 {l.title}</div>
      {bank.map((item:any,i:number)=>(
        <div key={i} style={{marginBottom:8,borderRadius:12,background:`${C2.navy2}cc`,border:`1px solid ${C2.pump}22`,overflow:"hidden"}}>
          <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",padding:"12px 14px",background:"none",border:"none",display:"flex",justifyContent:"space-between",alignItems:"flex-start",cursor:"pointer",textAlign:"left",gap:10}}>
            <span style={{fontSize:12,color:"rgba(240,244,255,0.8)",fontFamily:"Courier New",lineHeight:1.5}}><span style={{color:C2.pump,fontWeight:700,marginRight:6}}>Q{i+1}.</span>{item.q}</span>
            <span style={{color:C2.pump,fontSize:14,flexShrink:0}}>{open===i?"▲":"▼"}</span>
          </button>
          {open===i&&(
            <div style={{padding:"0 14px 12px"}}>
              <button onClick={()=>setShowAns(p=>({...p,[i]:!p[i]}))} style={{padding:"6px 12px",borderRadius:8,fontSize:10,cursor:"pointer",background:showAns[i]?`${C2.pump}22`:"rgba(255,255,255,0.05)",border:`1px solid ${showAns[i]?C2.pump:"rgba(255,255,255,0.12)"}`,color:showAns[i]?C2.pump:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{showAns[i]?l.hide:l.show}</button>
              {showAns[i]&&<div style={{marginTop:8,padding:10,borderRadius:8,background:`${C2.navy3}cc`,borderLeft:`3px solid ${C2.pump}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{item.a}</div>}
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
  const C2={pump:"#4da6ff",gold:"#c9922a",gold2:"#e8b94f",navy2:"#0a1628",navy3:"#0d1f3c"};

  if(done) return (
    <div style={{padding:"24px 14px"}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:42,marginBottom:8}}>⚙️</div>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:36,fontWeight:900,color:C2.gold2,marginBottom:4}}>{xp}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{l.xpLabel}</div>
        <div style={{marginTop:8,fontSize:14,color:"#f0f4ff",fontFamily:"Courier New"}}>Score : {score}/{quiz.length}</div>
      </div>
      <div style={{borderRadius:14,background:`${C2.navy2}cc`,border:`1px solid ${C2.gold}44`,padding:14,marginBottom:16}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:11,color:C2.gold,marginBottom:10}}>✦ {l.summary}</div>
        {t.kp.map((k:string,i:number)=>(
          <div key={i} style={{display:"flex",gap:8,marginBottom:6,fontSize:11,color:"rgba(240,244,255,0.7)",fontFamily:"Courier New",lineHeight:1.5}}>
            <span style={{color:C2.gold,flexShrink:0}}>✦</span><span>{k}</span>
          </div>
        ))}
      </div>
      <button onClick={()=>onComplete(xp)} style={{width:"100%",padding:"15px 0",border:"none",borderRadius:14,background:"linear-gradient(135deg,#4da6ff,#c9922a)",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:"#060e1a",cursor:"pointer"}}>⚙️ {l.finish}</button>
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
        <div style={{fontSize:11,color:C2.gold2,fontFamily:"Courier New"}}>⭐ {score}/{quiz.length}</div>
      </div>
      <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",marginBottom:14}}>
        <div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C2.pump},${C2.gold})`,width:`${(cur/quiz.length)*100}%`,transition:"width 0.4s"}}/>
      </div>
      <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New",marginBottom:16,padding:12,borderRadius:10,background:`${C2.navy2}cc`,border:`1px solid ${C2.pump}22`}}>{q.q}</div>
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
        ?<button onClick={handleConfirm} disabled={selected===null} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:selected!==null?`linear-gradient(135deg,${C2.pump},${C2.gold})`:"rgba(255,255,255,0.06)",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:selected!==null?"#060e1a":"rgba(240,244,255,0.25)",cursor:selected!==null?"pointer":"default",letterSpacing:1}}>{l.submit}</button>
        :<button onClick={handleNext} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C2.pump},${C2.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:"#060e1a",cursor:"pointer",letterSpacing:1}}>{cur+1>=quiz.length?l.finish:l.next}</button>
      }
    </div>
  );
}

export default function LessonE2_L3({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t=T[lang]||T.fr;
  const [tab,setTab]=useState(0);
  const progress=[25,50,75,90][tab]||25;
  const C2={pump:"#4da6ff",gold:"#c9922a",gold2:"#e8b94f",navy:"#060e1a",navy3:"#0d1f3c"};
  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C2.navy3},${C2.navy})`,color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C2.pump}33`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"6px 12px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>◀</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:2,color:C2.pump,marginBottom:2}}>{t.moduleLabel} · L3</div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:"#f0f4ff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.lessonTitle}</div>
          </div>
          <div style={{fontSize:11,color:C2.gold2,fontFamily:"Courier New",flexShrink:0}}>{progress}%</div>
        </div>
        <div style={{height:2,background:"rgba(255,255,255,0.06)"}}>
          <div style={{height:"100%",background:`linear-gradient(90deg,${C2.pump},${C2.gold})`,width:`${progress}%`,transition:"width 0.4s"}}/>
        </div>
      </div>
      <div style={{padding:"10px 14px 0"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:8,background:`${C2.gold}18`,border:`1px solid ${C2.gold}44`}}>
          <span style={{fontSize:12}}>⚙️</span>
          <span style={{fontFamily:"'Cinzel',serif",fontSize:9,color:C2.gold,letterSpacing:1}}>MACHINE · AUXILIAIRES · PREMIUM</span>
        </div>
      </div>
      <div style={{display:"flex",padding:"10px 14px 0",gap:6,overflowX:"auto",scrollbarWidth:"none"}}>
        {t.tabs.map((label:string,i:number)=>(
          <button key={i} onClick={()=>setTab(i)} style={{padding:"8px 12px",borderRadius:10,fontSize:11,cursor:"pointer",whiteSpace:"nowrap",background:tab===i?`${C2.pump}22`:"rgba(255,255,255,0.04)",border:`1px solid ${tab===i?C2.pump:"rgba(255,255,255,0.1)"}`,color:tab===i?C2.pump:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{label}</button>
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
