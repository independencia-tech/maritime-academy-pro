// LessonE3_L4 - Systèmes vapeur & Distribution | PART 1
import { useState } from "react";

const C = {
  steam:"#4da6ff", pipe:"#e8b94f", valve:"#6dbf8a",
  trap:"#c084fc", insul:"#f97316", safe:"#6dbf8a",
  gold:"#c9922a", gold2:"#e8b94f",
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  danger:"#e74c3c",
};

const T: any = {
  fr:{
    moduleLabel:"MACHINE - CHAUDIÈRES",
    lessonTitle:"Systèmes vapeur & Distribution",
    intro:"Le système de distribution de vapeur achemine la vapeur de la chaudière vers les différents consommateurs à bord : réchauffeurs de HFO, eau sanitaire, chauffage de locaux, éjecteurs, purificateurs. Une bonne gestion de ce réseau est essentielle pour l'efficacité énergétique.",
    tabs:["📖 Contenu","✏️ Pratique","📚 Banque Q.","🎯 Quiz"],
    s1title:"🌡️ Types de vapeur et usages",
    s1hint:"👆 Tapez un type de vapeur",
    s2title:"⚙️ Composants du réseau vapeur",
    s2hint:"👆 Tapez un composant",
    s3title:"🔧 Purgeurs de vapeur (Steam traps)",
    s3hint:"👆 Tapez un type de purgeur",
    s4title:"⚠️ Défauts & Entretien",
    s4hint:"👆 Tapez un défaut",
    keypoints:"Points clés",
    kp:[
      "La vapeur saturée sèche est idéale pour le chauffage - pas de surchauffe nécessaire",
      "Le purgeur (steam trap) évacue les condensats sans laisser passer la vapeur",
      "Les condensats récupérés représentent 80-90% de la qualité de l'eau de chaudière",
      "Un purgeur défaillant ouvert = perte de vapeur vive = gaspillage énergétique",
      "Les coups de bélier (water hammer) surviennent quand de l'eau se forme dans les conduites vapeur",
    ],
    steamTypes:{
      saturated:{ name:"Vapeur saturée sèche", desc:"Vapeur à l'équilibre avec l'eau liquide à une pression donnée. Température déterminée par la pression (ex : 7 bar → 165 degC). Titre vapeur = 1,0 (100% vapeur). Utilisée pour le chauffage : HFO, eau sanitaire, locaux. Énergie latente très élevée → idéale pour les échangeurs.", use:"Chauffage HFO, eau sanitaire, chauffage locaux" },
      wet:{ name:"Vapeur humide (wet steam)", desc:"Mélange de vapeur et de gouttelettes d'eau. Titre vapeur < 1,0. Causée par : mauvaise séparation dans le ballon, condensation dans les conduites, coup de bélier possible. À éviter dans les conduites de distribution. Sécheurs de vapeur nécessaires si problème récurrent.", use:"À éviter - condensats dangereux" },
      superheated:{ name:"Vapeur surchauffée", desc:"Vapeur chauffée au-delà de sa température de saturation (T > T_sat). Contient plus d'énergie thermique. Utilisée dans les turbines à vapeur (propulsion, générateurs). Moins bonne pour le chauffage direct (moins d'énergie latente). Surchauffeur (superheater) nécessaire.", use:"Turbines à vapeur, propulsion" },
      flash:{ name:"Vapeur de détente (Flash steam)", desc:"Vapeur formée quand un condensat chaud passe d'une haute à une basse pression. Phénomène naturel de détente. Peut être récupérée pour le chauffage à basse pression. Si non récupérée → perte énergétique. Flash vessel pour séparer condensat et vapeur de détente.", use:"Récupération énergie, circuits BP" },
    },
    components:{
      mainvalve:{ name:"Vanne principale vapeur", desc:"Vanne de sectionnement sur la sortie de la chaudière. Normalement fully open (ouverture complète pour limiter les pertes de charge). Fermeture d'urgence si rupture de tuyauterie. Équipée d'un by-pass pour réchauffage progressif avant ouverture complète." },
      reductor:{ name:"Détendeur (Pressure reducing valve)", desc:"Réduit la pression de vapeur de la pression chaudière (7-10 bar) à la pression requise par le consommateur (ex : 3 bar pour chauffage HFO, 1-2 bar pour eau sanitaire). Maintient la pression aval constante malgré les variations de débit. Réglable par ressort ou pilote." },
      separator:{ name:"Séparateur vapeur/condensat", desc:"Élimine les gouttelettes d'eau (condensats) de la vapeur avant distribution. Utilise la force centrifuge, les chicanes ou la décantation. Obligatoire en amont des turbines et surchauffeurs. Équipé d'un purgeur pour évacuer les condensats collectés." },
      safetyvalve:{ name:"Soupape de sûreté réseau", desc:"Protège les tuyauteries vapeur contre les surpressions. Réglée à 10% au-dessus de la pression de service locale. Différente de la soupape de la chaudière. Placée en aval du détendeur pour protéger le circuit basse pression." },
      hfo_heater:{ name:"Réchauffeur HFO (vapeur/HFO)", desc:"Échangeur tubulaire ou à plaques chauffant le HFO avec de la vapeur. Alimente en vapeur depuis le collecteur principal. Condensat récupéré au purgeur. Température HFO : 120-150 degC. Vanne de régulation vapeur commandée par thermomètre ou viscosimètre." },
      drain:{ name:"Drains et purges", desc:"Tuyauteries et vannes pour évacuer les condensats des points bas du réseau vapeur. Obligatoires avant chaque démarrage (eau dans les conduites = coup de bélier). Vannes de vidange en bas des canalisations horizontales et des collecteurs." },
    },
    traps:{
      float:{ name:"Purgeur à flotteur", desc:"Un flotteur monte avec le niveau de condensat et ouvre mécaniquement une vanne. Fonctionne en continu. Évacue les condensats en permanence dès qu'ils se forment. Très efficace, adapté aux forts débits de condensat. Sensible aux impuretés (colmatage). Vérification : à chaud, doit laisser passer les condensats mais pas la vapeur." },
      bucket:{ name:"Purgeur à seau renversé", desc:"Un seau (bucket) inversé flotte quand rempli de vapeur (fermeture) et coule quand rempli de condensat (ouverture). Fonctionne par intermittence. Robuste et résistant aux coups de bélier. Peut se bloquer ouvert si perte d'amorçage." },
      thermostatic:{ name:"Purgeur thermostatique", desc:"Utilise la différence de température entre la vapeur (T_sat) et les condensats (< T_sat). Un élément thermostatique se dilate à température vapeur (fermeture) et se contracte en présence de condensats froids (ouverture). Simple et économique." },
      thermodynamic:{ name:"Purgeur thermodynamique (disque)", desc:"Un disque s'ouvre sous la pression des condensats froids et se referme sous la pression de la vapeur. Fonctionne par intermittence (claquement caractéristique). Très compact et robuste. Peu sensible aux variations de pression. Vérification : doit claquer régulièrement (pas continuellement = ouvert ; jamais = fermé/bouché)." },
    },
    faults:{
      waterhammer:{ name:"Coup de bélier (Water hammer)", cause:"Condensats accumulés dans la conduite frappés par la vapeur à grande vitesse. Démarrage trop rapide de la vapeur, drains insuffisants, purgeurs défaillants.", remedy:"Ouvrir lentement les vannes vapeur, purger les condensats AVANT ouverture, vérifier et remplacer les purgeurs défaillants. En cas de coup violent : inspecter les supports et joints." },
      trapleaking:{ name:"Purgeur laissant passer la vapeur (ouvert)", cause:"Usure du siège ou du clapet, purgeur coincé ouvert, purgeur mal dimensionné.", remedy:"Remplacer le purgeur. La perte de vapeur est très coûteuse en énergie (un purgeur défaillant peut représenter 100-500 kg/h de vapeur perdue)." },
      trapblocked:{ name:"Purgeur bloqué (fermé)", cause:"Corps étranger, tartre, purgeur coincé fermé, purgeur sous-dimensionné.", remedy:"Nettoyer ou remplacer le purgeur. Un purgeur bloqué fermé → accumulation de condensats → refroidissement du consommateur, coup de bélier possible." },
      insulloss:{ name:"Perte d'isolation thermique", cause:"Isolation endommagée, humide ou absente sur les canalisations vapeur.", remedy:"Réparer ou remplacer l'isolation. Une conduite vapeur de 100mm non isolée perd 3-5 kg/h de vapeur. L'isolation correcte réduit les pertes de 90%." },
    },
    practiceTitle:"Exercice pratique",
    questions:[
      { q:"Expliquez le rôle d'un purgeur de vapeur (steam trap) et les conséquences d'une défaillance dans chaque sens.",
        a:"Le purgeur de vapeur (steam trap) est un dispositif automatique qui évacue les condensats (eau formée par refroidissement de la vapeur) du réseau vapeur SANS laisser passer la vapeur vive. Rôle : éliminer l'eau des conduites (risque de coup de bélier), maintenir la qualité de la vapeur (vapeur sèche), récupérer les condensats chauds. Défaillance côté ouvert (purgeur ouvert) : la vapeur passe directement → perte d'énergie massive (100-500 kg/h de vapeur), surconsommation de combustible, surcharge de la chaudière. Défaillance côté fermé (purgeur bloqué) : les condensats ne peuvent plus s'évacuer → refroidissement du consommateur (HFO trop froid, locaux non chauffés), accumulation d'eau → coup de bélier si la vapeur est rouverte." },
      { q:"Qu'est-ce qu'un coup de bélier (water hammer) dans un réseau vapeur et comment l'éviter ?",
        a:"Un coup de bélier se produit quand de l'eau liquide (condensats) accumulée dans une conduite vapeur est frappée par la vapeur à grande vitesse. L'eau étant incompressible, le choc est brutal → vibrations violentes, bruits de chocs, risque de rupture de tuyauterie, dommages aux vannes et instruments. Causes : démarrage trop rapide de la vapeur (condensats pas purgés), purgeurs défaillants (condensats accumulés), isolation insuffisante (condensation excessive), remise en service d'une tuyauterie froide. Prévention : toujours ouvrir les vannes de purge (drains) AVANT d'ouvrir la vapeur, ouvrir les vannes vapeur lentement (progressivement sur 2-5 minutes), vérifier et entretenir les purgeurs, maintenir l'isolation des conduites." },
      { q:"Comment fonctionne un détendeur de vapeur (pressure reducing valve) et pourquoi est-il nécessaire ?",
        a:"Un détendeur (PRV - Pressure Reducing Valve) réduit automatiquement la pression de la vapeur d'une pression amont haute (7-10 bar chaudière) à une pression aval basse adaptée au consommateur (ex : 3 bar pour réchauffeurs HFO, 1-2 bar pour chauffage de locaux). Fonctionnement : un ressort calibré maintient une vanne partiellement ouverte. Si la pression aval monte (demande réduite) → la vanne se ferme. Si la pression aval baisse (demande augmentée) → la vanne s'ouvre davantage. Maintient la pression aval constante indépendamment des variations de débit. Nécessaire car : différents consommateurs ont des besoins en pression différents, protège les équipements aval contre la surpression, permet d'alimenter des circuits BP depuis une chaudière HP." },
    ],
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
  },
  en:{
    moduleLabel:"ENGINE - BOILERS",
    lessonTitle:"Steam Systems & Distribution",
    intro:"The steam distribution system carries steam from the boiler to various consumers on board: HFO heaters, domestic water, space heating, ejectors, purifiers. Good management of this network is essential for energy efficiency.",
    tabs:["📖 Content","✏️ Practice","📚 Question Bank","🎯 Quiz"],
    s1title:"🌡️ Steam Types and Uses",
    s1hint:"👆 Tap a steam type",
    s2title:"⚙️ Steam Network Components",
    s2hint:"👆 Tap a component",
    s3title:"🔧 Steam Traps",
    s3hint:"👆 Tap a trap type",
    s4title:"⚠️ Faults & Maintenance",
    s4hint:"👆 Tap a fault",
    keypoints:"Key Points",
    kp:[
      "Dry saturated steam is ideal for heating - no superheating needed",
      "Steam trap evacuates condensate without passing steam",
      "Recovered condensate represents 80-90% of boiler water quality",
      "Failed open steam trap = live steam loss = energy waste",
      "Water hammer occurs when water forms in steam pipes",
    ],
    steamTypes:{
      saturated:{ name:"Dry saturated steam", desc:"Steam in equilibrium with liquid water at a given pressure. Temperature determined by pressure (e.g. 7 bar → 165 degC). Steam quality = 1.0 (100% steam). Used for heating: HFO, domestic water, spaces. Very high latent energy → ideal for heat exchangers.", use:"HFO heating, domestic water, space heating" },
      wet:{ name:"Wet steam", desc:"Mixture of steam and water droplets. Steam quality < 1.0. Caused by: poor drum separation, condensation in pipes, water hammer possible. Avoid in distribution pipes. Steam dryers needed if recurring problem.", use:"Avoid - dangerous condensate" },
      superheated:{ name:"Superheated steam", desc:"Steam heated beyond saturation temperature (T > T_sat). Contains more thermal energy. Used in steam turbines (propulsion, generators). Less suitable for direct heating (less latent energy). Superheater required.", use:"Steam turbines, propulsion" },
      flash:{ name:"Flash steam", desc:"Steam formed when hot condensate passes from high to low pressure. Natural pressure relief phenomenon. Can be recovered for low-pressure heating. If not recovered → energy loss. Flash vessel to separate condensate and flash steam.", use:"Energy recovery, LP circuits" },
    },
    components:{
      mainvalve:{ name:"Main steam valve", desc:"Isolation valve on boiler steam outlet. Normally fully open (full opening to limit pressure drops). Emergency closure on pipe rupture. Fitted with bypass for progressive warm-up before full opening." },
      reductor:{ name:"Pressure reducing valve (PRV)", desc:"Reduces steam pressure from boiler pressure (7-10 bar) to pressure required by consumer (e.g. 3 bar for HFO heating, 1-2 bar for domestic water). Maintains constant downstream pressure despite flow variations. Adjustable by spring or pilot." },
      separator:{ name:"Steam/condensate separator", desc:"Removes water droplets (condensate) from steam before distribution. Uses centrifugal force, baffles or decanting. Mandatory upstream of turbines and superheaters. Fitted with steam trap for condensate removal." },
      safetyvalve:{ name:"Network safety valve", desc:"Protects steam piping against overpressure. Set at 10% above local service pressure. Different from boiler safety valve. Located downstream of PRV to protect low-pressure circuit." },
      hfo_heater:{ name:"HFO heater (steam/HFO)", desc:"Shell & tube or plate exchanger heating HFO with steam. Steam supplied from main header. Condensate recovered at steam trap. HFO temperature: 120-150 degC. Steam control valve commanded by thermometer or viscometer." },
      drain:{ name:"Drains and vents", desc:"Pipes and valves to evacuate condensate from low points in steam network. Mandatory before each startup (water in pipes = water hammer). Drain valves at bottom of horizontal pipes and headers." },
    },
    traps:{
      float:{ name:"Float steam trap", desc:"A float rises with condensate level and mechanically opens a valve. Operates continuously. Evacuates condensate immediately as it forms. Very effective, suitable for high condensate flows. Sensitive to impurities (blockage). Check: when hot, should pass condensate but not steam." },
      bucket:{ name:"Inverted bucket steam trap", desc:"An inverted bucket floats when filled with steam (closed) and sinks when filled with condensate (open). Intermittent operation. Robust and resistant to water hammer. Can jam open if priming lost." },
      thermostatic:{ name:"Thermostatic steam trap", desc:"Uses temperature difference between steam (T_sat) and condensate (< T_sat). A thermostatic element expands at steam temperature (closed) and contracts with cool condensate (open). Simple and economical." },
      thermodynamic:{ name:"Thermodynamic (disc) steam trap", desc:"A disc opens under cold condensate pressure and closes under steam pressure. Intermittent operation (characteristic clicking). Very compact and robust. Little sensitive to pressure variations. Check: should click regularly (not continuously = open; never = closed/blocked)." },
    },
    faults:{
      waterhammer:{ name:"Water hammer", cause:"Condensate accumulated in pipe struck by high-velocity steam. Too rapid steam startup, insufficient drains, failed steam traps.", remedy:"Open steam valves slowly, drain condensate BEFORE opening, check and replace failed traps. After violent hammer: inspect supports and joints." },
      trapleaking:{ name:"Steam trap passing steam (open)", cause:"Worn seat or disc, trap jammed open, undersized trap.", remedy:"Replace trap. Steam loss is very costly (one failed trap can represent 100-500 kg/h of lost steam)." },
      trapblocked:{ name:"Steam trap blocked (closed)", cause:"Foreign body, scale, trap jammed closed, undersized trap.", remedy:"Clean or replace trap. Blocked closed trap → condensate accumulation → consumer cooling, possible water hammer." },
      insulloss:{ name:"Thermal insulation loss", cause:"Damaged, wet or missing insulation on steam pipes.", remedy:"Repair or replace insulation. An uninsulated 100mm steam pipe loses 3-5 kg/h of steam. Correct insulation reduces losses by 90%." },
    },
    practiceTitle:"Practice Exercise",
    questions:[
      { q:"Explain the role of a steam trap and the consequences of failure in each direction.",
        a:"A steam trap is an automatic device that evacuates condensate (water formed by steam cooling) from the steam network WITHOUT passing live steam. Role: remove water from pipes (water hammer risk), maintain steam quality (dry steam), recover hot condensate. Open failure (trap open): steam passes directly → massive energy loss (100-500 kg/h steam), fuel overconsumption, boiler overload. Closed failure (trap blocked): condensate cannot evacuate → consumer cooling (HFO too cold, spaces unheated), water accumulation → water hammer if steam is reopened." },
      { q:"What is water hammer in a steam network and how to avoid it?",
        a:"Water hammer occurs when liquid water (condensate) accumulated in a steam pipe is struck by high-velocity steam. Water being incompressible, the impact is violent → severe vibrations, banging noises, pipe rupture risk, damage to valves and instruments. Causes: too rapid steam startup (condensate not drained), failed traps (accumulated condensate), insufficient insulation (excessive condensation), returning a cold pipe to service. Prevention: always open drain valves BEFORE opening steam, open steam valves slowly (progressively over 2-5 minutes), check and maintain traps, maintain pipe insulation." },
      { q:"How does a pressure reducing valve (PRV) work and why is it needed?",
        a:"A PRV automatically reduces steam pressure from high upstream pressure (7-10 bar boiler) to low downstream pressure suited to the consumer (e.g. 3 bar for HFO heaters, 1-2 bar for space heating). Operation: a calibrated spring maintains the valve partially open. If downstream pressure rises (reduced demand) → valve closes. If downstream pressure falls (increased demand) → valve opens further. Maintains constant downstream pressure regardless of flow variations. Needed because: different consumers have different pressure requirements, protects downstream equipment against overpressure, allows HP boiler to feed LP circuits." },
    ],
    showAnswer:"Show answer", hideAnswer:"Hide",
  },
  es:{
    moduleLabel:"MÁQUINAS - CALDERAS",
    lessonTitle:"Sistemas de vapor & Distribución",
    intro:"El sistema de distribución de vapor lleva el vapor de la caldera a los distintos consumidores: calentadores de HFO, agua sanitaria, calefacción, eyectores, purificadores. Una buena gestión de esta red es esencial para la eficiencia energética.",
    tabs:["📖 Contenido","✏️ Práctica","📚 Banco Q.","🎯 Quiz"],
    s1title:"🌡️ Tipos de vapor y usos",
    s1hint:"👆 Toca un tipo de vapor",
    s2title:"⚙️ Componentes de la red de vapor",
    s2hint:"👆 Toca un componente",
    s3title:"🔧 Purgadores de vapor (Steam traps)",
    s3hint:"👆 Toca un tipo de purgador",
    s4title:"⚠️ Fallos & Mantenimiento",
    s4hint:"👆 Toca un fallo",
    keypoints:"Puntos clave",
    kp:[
      "El vapor saturado seco es ideal para la calefacción - sin sobrecalentamiento necesario",
      "El purgador evacúa los condensados sin dejar pasar el vapor",
      "Los condensados recuperados representan el 80-90% de la calidad del agua de caldera",
      "Purgador abierto fallido = pérdida de vapor vivo = derroche de energía",
      "Los golpes de ariete ocurren cuando se forma agua en las tuberías de vapor",
    ],
    steamTypes:{
      saturated:{ name:"Vapor saturado seco", desc:"Vapor en equilibrio con el agua líquida a una presión dada. Temperatura determinada por la presión (ej: 7 bar → 165 degC). Calidad = 1,0. Ideal para calefacción: HFO, agua sanitaria, locales.", use:"Calentamiento HFO, agua sanitaria, calefacción" },
      wet:{ name:"Vapor húmedo", desc:"Mezcla de vapor y gotitas de agua. Calidad < 1,0. Causado por: mala separación en el balón, condensación en tuberías. Evitar en las tuberías de distribución.", use:"Evitar - condensados peligrosos" },
      superheated:{ name:"Vapor sobrecalentado", desc:"Vapor calentado más allá de su temperatura de saturación. Más energía térmica. Usado en turbinas de vapor (propulsión, generadores). Menos adecuado para calefacción directa.", use:"Turbinas de vapor, propulsión" },
      flash:{ name:"Vapor de expansión (Flash steam)", desc:"Vapor formado cuando un condensado caliente pasa de alta a baja presión. Puede recuperarse para calefacción a baja presión. Flash vessel para separar condensado y vapor de expansión.", use:"Recuperación de energía, circuitos BP" },
    },
    components:{
      mainvalve:{ name:"Válvula principal de vapor", desc:"Válvula de seccionamiento en la salida de la caldera. Normalmente completamente abierta. Cierre de emergencia en rotura de tubería. Con bypass para calentamiento progresivo." },
      reductor:{ name:"Reductor de presión (PRV)", desc:"Reduce la presión de vapor de la presión de caldera (7-10 bar) a la requerida por el consumidor (ej: 3 bar para calentadores de HFO). Mantiene la presión aguas abajo constante." },
      separator:{ name:"Separador vapor/condensado", desc:"Elimina las gotitas de agua del vapor antes de la distribución. Obligatorio aguas arriba de las turbinas. Equipado con purgador." },
      safetyvalve:{ name:"Válvula de seguridad de red", desc:"Protege las tuberías de vapor contra sobrepresiones. Ajustada al 10% sobre la PMS local. Diferente de la válvula de la caldera." },
      hfo_heater:{ name:"Calentador HFO (vapor/HFO)", desc:"Intercambiador que calienta el HFO con vapor. Temperatura HFO: 120-150 degC. Condensado recuperado en el purgador. Válvula de regulación de vapor controlada por termómetro o viscosímetro." },
      drain:{ name:"Drenes y purgas", desc:"Tuberías y válvulas para evacuar condensados en los puntos bajos. Obligatorio antes de cada arranque (agua en tuberías = golpe de ariete)." },
    },
    traps:{
      float:{ name:"Purgador de flotador", desc:"Un flotador sube con el nivel de condensado y abre mecánicamente una válvula. Funcionamiento continuo. Muy eficaz para grandes caudales de condensado. Sensible a las impurezas." },
      bucket:{ name:"Purgador de cubo invertido", desc:"Un cubo invertido flota con vapor (cerrado) y se hunde con condensado (abierto). Funcionamiento intermitente. Robusto. Puede bloquearse abierto si pierde el cebado." },
      thermostatic:{ name:"Purgador termostático", desc:"Usa la diferencia de temperatura entre vapor (T_sat) y condensados (< T_sat). Elemento termostático: se dilata con vapor (cierre) y se contrae con condensados fríos (apertura)." },
      thermodynamic:{ name:"Purgador termodinámico (disco)", desc:"Un disco se abre bajo la presión de condensados fríos y se cierra bajo la presión del vapor. Funcionamiento intermitente (golpeteo característico). Muy compacto y robusto." },
    },
    faults:{
      waterhammer:{ name:"Golpe de ariete", cause:"Condensados acumulados en la tubería golpeados por vapor a gran velocidad. Arranque demasiado rápido, drenes insuficientes, purgadores defectuosos.", remedy:"Abrir lentamente las válvulas de vapor, purgar los condensados ANTES de abrir, verificar y sustituir los purgadores defectuosos." },
      trapleaking:{ name:"Purgador dejando pasar vapor (abierto)", cause:"Desgaste del asiento o del disco, purgador bloqueado abierto, purgador subdimensionado.", remedy:"Sustituir el purgador. Un purgador fallido puede representar 100-500 kg/h de vapor perdido." },
      trapblocked:{ name:"Purgador bloqueado (cerrado)", cause:"Cuerpo extraño, incrustación, purgador bloqueado cerrado.", remedy:"Limpiar o sustituir. Purgador cerrado → condensados acumulados → enfriamiento del consumidor, posible golpe de ariete." },
      insulloss:{ name:"Pérdida de aislamiento térmico", cause:"Aislamiento dañado, húmedo o ausente en las tuberías de vapor.", remedy:"Reparar o sustituir. Una tubería de 100mm sin aislar pierde 3-5 kg/h de vapor. El aislamiento correcto reduce las pérdidas un 90%." },
    },
    practiceTitle:"Ejercicio práctico",
    questions:[
      { q:"Explique el papel de un purgador de vapor y las consecuencias de un fallo en cada sentido.",
        a:"El purgador evacúa los condensados sin dejar pasar el vapor vivo. Fallo abierto: vapor pasa directamente → pérdida masiva de energía (100-500 kg/h), sobreconsumo de combustible, sobrecarga de la caldera. Fallo cerrado: condensados no pueden evacuar → enfriamiento del consumidor (HFO demasiado frío), acumulación de agua → golpe de ariete si se reabre el vapor." },
      { q:"¿Qué es un golpe de ariete en una red de vapor y cómo evitarlo?",
        a:"Ocurre cuando el agua líquida (condensados) acumulada en una tubería es golpeada por el vapor a gran velocidad. Consecuencias: vibraciones violentas, ruidos, riesgo de rotura de tubería. Causas: arranque demasiado rápido, purgadores defectuosos, aislamiento insuficiente. Prevención: abrir siempre las válvulas de drenaje ANTES de abrir el vapor, abrir las válvulas de vapor lentamente (2-5 min), mantener los purgadores y el aislamiento." },
      { q:"¿Cómo funciona un reductor de presión de vapor (PRV) y por qué es necesario?",
        a:"Reduce automáticamente la presión del vapor de la presión de caldera (7-10 bar) a la requerida por el consumidor (ej: 3 bar para calentadores de HFO). Un resorte calibrado mantiene la válvula parcialmente abierta. Si la presión aguas abajo sube (menos demanda) → la válvula se cierra. Si baja (más demanda) → se abre. Necesario porque los consumidores tienen necesidades de presión diferentes." },
    ],
    showAnswer:"Ver corrección", hideAnswer:"Ocultar",
  },
  pt:{
    moduleLabel:"MÁQUINAS - CALDEIRAS",
    lessonTitle:"Sistemas de vapor & Distribuição",
    intro:"O sistema de distribuição de vapor leva o vapor da caldeira aos vários consumidores a bordo: aquecedores de HFO, água sanitária, aquecimento de espaços, ejetores, purificadores. Uma boa gestão desta rede é essencial para a eficiência energética.",
    tabs:["📖 Conteúdo","✏️ Prática","📚 Banco Q.","🎯 Quiz"],
    s1title:"🌡️ Tipos de vapor e usos",
    s1hint:"👆 Toque num tipo de vapor",
    s2title:"⚙️ Componentes da rede de vapor",
    s2hint:"👆 Toque num componente",
    s3title:"🔧 Purgadores de vapor (Steam traps)",
    s3hint:"👆 Toque num tipo de purgador",
    s4title:"⚠️ Avarias & Manutenção",
    s4hint:"👆 Toque numa avaria",
    keypoints:"Pontos-chave",
    kp:[
      "Vapor saturado seco é ideal para aquecimento - sem sobreaquecimento necessário",
      "O purgador evacua condensados sem deixar passar vapor",
      "Os condensados recuperados representam 80-90% da qualidade da água de caldeira",
      "Purgador aberto avariado = perda de vapor vivo = desperdício de energia",
      "Os golpes de aríete ocorrem quando se forma água nas tubagens de vapor",
    ],
    steamTypes:{
      saturated:{ name:"Vapor saturado seco", desc:"Vapor em equilíbrio com a água líquida a uma dada pressão. Temperatura determinada pela pressão (ex: 7 bar → 165 degC). Qualidade = 1,0. Ideal para aquecimento: HFO, água sanitária, espaços.", use:"Aquecimento HFO, água sanitária, aquecimento espaços" },
      wet:{ name:"Vapor húmido", desc:"Mistura de vapor e gotículas de água. Qualidade < 1,0. Causado por: má separação no balão, condensação nas tubagens. Evitar nas tubagens de distribuição.", use:"Evitar - condensados perigosos" },
      superheated:{ name:"Vapor sobreaquecido", desc:"Vapor aquecido além da temperatura de saturação. Mais energia térmica. Usado em turbinas de vapor (propulsão, geradores). Menos adequado para aquecimento direto.", use:"Turbinas de vapor, propulsão" },
      flash:{ name:"Vapor de expansão (Flash steam)", desc:"Vapor formado quando condensado quente passa de alta para baixa pressão. Pode ser recuperado para aquecimento a baixa pressão. Flash vessel para separar condensado e vapor de expansão.", use:"Recuperação de energia, circuitos BP" },
    },
    components:{
      mainvalve:{ name:"Válvula principal de vapor", desc:"Válvula de seccionamento na saída da caldeira. Normalmente completamente aberta. Fecho de emergência em rotura de tubagem. Com by-pass para aquecimento progressivo." },
      reductor:{ name:"Redutor de pressão (PRV)", desc:"Reduz a pressão de vapor da pressão de caldeira (7-10 bar) à requerida pelo consumidor (ex: 3 bar para aquecedores HFO). Mantém pressão a jusante constante." },
      separator:{ name:"Separador vapor/condensado", desc:"Remove gotículas de água do vapor antes da distribuição. Obrigatório a montante de turbinas. Equipado com purgador." },
      safetyvalve:{ name:"Válvula de segurança de rede", desc:"Protege as tubagens de vapor contra sobrepressões. Regulada a 10% acima da PMS local. Diferente da válvula da caldeira." },
      hfo_heater:{ name:"Aquecedor HFO (vapor/HFO)", desc:"Permutador que aquece o HFO com vapor. Temperatura HFO: 120-150 degC. Condensado recuperado no purgador. Válvula de regulação de vapor controlada por termómetro ou viscosímetro." },
      drain:{ name:"Drenos e purgas", desc:"Tubagens e válvulas para evacuar condensados nos pontos baixos. Obrigatório antes de cada arranque (água nas tubagens = golpe de aríete)." },
    },
    traps:{
      float:{ name:"Purgador de flutuador", desc:"Um flutuador sobe com o nível de condensado e abre mecanicamente uma válvula. Funcionamento contínuo. Muito eficaz para grandes caudais de condensado. Sensível a impurezas." },
      bucket:{ name:"Purgador de balde invertido", desc:"Um balde invertido flutua com vapor (fechado) e afunda com condensado (aberto). Funcionamento intermitente. Robusto. Pode bloquear aberto se perder cebamento." },
      thermostatic:{ name:"Purgador termostático", desc:"Usa diferença de temperatura entre vapor (T_sat) e condensados (< T_sat). Elemento termostático: dilata com vapor (fecho) e contrai com condensados frios (abertura)." },
      thermodynamic:{ name:"Purgador termodinâmico (disco)", desc:"Um disco abre sob pressão de condensados frios e fecha sob pressão de vapor. Funcionamento intermitente (clique característico). Muito compacto e robusto." },
    },
    faults:{
      waterhammer:{ name:"Golpe de aríete", cause:"Condensados acumulados na tubagem golpeados por vapor a grande velocidade. Arranque demasiado rápido, drenos insuficientes, purgadores avariados.", remedy:"Abrir lentamente as válvulas de vapor, purgar os condensados ANTES de abrir, verificar e substituir purgadores avariados." },
      trapleaking:{ name:"Purgador a deixar passar vapor (aberto)", cause:"Desgaste do assento ou disco, purgador preso aberto, purgador subdimensionado.", remedy:"Substituir purgador. Um purgador avariado pode representar 100-500 kg/h de vapor perdido." },
      trapblocked:{ name:"Purgador bloqueado (fechado)", cause:"Corpo estranho, incrustação, purgador preso fechado.", remedy:"Limpar ou substituir. Purgador fechado → condensados acumulados → arrefecimento do consumidor, possível golpe de aríete." },
      insulloss:{ name:"Perda de isolamento térmico", cause:"Isolamento danificado, húmido ou ausente nas tubagens de vapor.", remedy:"Reparar ou substituir. Uma tubagem de 100mm sem isolamento perde 3-5 kg/h de vapor. Isolamento correto reduz perdas em 90%." },
    },
    practiceTitle:"Exercício prático",
    questions:[
      { q:"Explique o papel de um purgador de vapor e as consequências de avaria em cada sentido.",
        a:"O purgador evacua condensados sem deixar passar vapor vivo. Avaria aberta: vapor passa diretamente → perda massiva de energia (100-500 kg/h), sobreconsumo de combustível, sobrecarga da caldeira. Avaria fechada: condensados não evacuam → arrefecimento do consumidor (HFO demasiado frio), acumulação de água → golpe de aríete se o vapor for reaberto." },
      { q:"O que é um golpe de aríete numa rede de vapor e como o evitar?",
        a:"Ocorre quando água líquida (condensados) acumulada numa tubagem é golpeada por vapor a grande velocidade. Consequências: vibrações violentas, ruídos, risco de rotura de tubagem. Causas: arranque demasiado rápido, purgadores avariados, isolamento insuficiente. Prevenção: abrir sempre as válvulas de drenagem ANTES de abrir o vapor, abrir as válvulas de vapor lentamente (2-5 min), manter purgadores e isolamento." },
      { q:"Como funciona um redutor de pressão de vapor (PRV) e por que é necessário?",
        a:"Reduz automaticamente a pressão do vapor da pressão de caldeira (7-10 bar) à requerida pelo consumidor (ex: 3 bar para aquecedores HFO). Uma mola calibrada mantém a válvula parcialmente aberta. Se a pressão a jusante sobe (menos procura) → a válvula fecha. Se baixa (mais procura) → abre. Necessário porque os consumidores têm necessidades de pressão diferentes." },
    ],
    showAnswer:"Ver correção", hideAnswer:"Ocultar",
  },
};

// ── SVG 1 - STEAM TYPES ──────────────────────────────────────
function SteamTypesSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("saturated");
  const items = t.steamTypes;
  const cols: Record<string,string> = {saturated:C.steam,wet:C.pipe,superheated:C.insul,flash:C.valve};
  const icons: Record<string,string> = {saturated:"💨",wet:"🌧️",superheated:"🔥",flash:"⚡"};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.steam}33`}}>
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {Object.entries(items).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{flex:1,padding:"8px 4px",borderRadius:10,fontSize:14,cursor:"pointer",background:sel===key?`${cols[key]}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?cols[key]:"rgba(255,255,255,0.1)"}`,textAlign:"center"}}>
            {icons[key]}
          </button>
        ))}
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${cols[sel]||C.steam}44`,minHeight:80}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:cols[sel]||C.steam,fontWeight:700,marginBottom:6}}>{icons[sel]} {items[sel].name}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New",marginBottom:6}}>{items[sel].desc}</div>
        <div style={{fontSize:10,color:cols[sel],fontWeight:700}}>→ {items[sel].use}</div>
      </div>
    </div>
  );
}

// ── SVG 2 - COMPONENTS ───────────────────────────────────────
function ComponentsSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string|null>(null);
  const comps = t.components;
  const compColors: Record<string,string> = {mainvalve:C.steam,reductor:C.valve,separator:C.pipe,safetyvalve:C.danger,hfo_heater:C.insul,drain:C.trap};
  const icons: Record<string,string> = {mainvalve:"🚪",reductor:"⬇️",separator:"🔀",safetyvalve:"🔴",hfo_heater:"🛢️",drain:"💧"};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.pipe}33`}}>
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
        <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${compColors[sel]||C.pipe}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
          <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{icons[sel]} {comps[sel].name}</div>
          {comps[sel].desc}
        </div>
      )}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)",padding:16}}>{t.s2hint}</div>}
    </div>
  );
}

// ── SVG 3 - STEAM TRAPS ──────────────────────────────────────
function TrapsSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("float");
  const traps = t.traps;
  const trapCols: Record<string,string> = {float:C.steam,bucket:C.pipe,thermostatic:C.valve,thermodynamic:C.trap};

  const svgs: Record<string,JSX.Element> = {
    float:(
      <g>
        <rect x="20" y="40" width="120" height="80" rx="8" fill={C.steam} opacity={0.1} stroke={C.steam} strokeWidth="1.5"/>
        <circle cx="80" cy="70" r="18" fill={C.steam} opacity={0.3} stroke={C.steam} strokeWidth="2"/>
        <text x="80" y="75" fontSize="8" fill={C.steam} textAnchor="middle" fontFamily="Courier New">FLOAT</text>
        <line x1="80" y1="88" x2="80" y2="105" stroke={C.steam} strokeWidth="2"/>
        <rect x="65" y="105" width="30" height="10" rx="3" fill={C.valve} opacity={0.6}/>
        <line x1="140" y1="80" x2="155" y2="80" stroke="rgba(240,244,255,0.3)" strokeWidth="1.5" strokeDasharray="3,2"/>
        <text x="158" y="83" fontSize="6" fill="rgba(240,244,255,0.4)" fontFamily="Courier New">→ drain</text>
        <line x1="20" y1="80" x2="5" y2="80" stroke={C.steam} strokeWidth="2"/>
        <text x="2" y="78" fontSize="6" fill={C.steam} fontFamily="Courier New" textAnchor="end">IN</text>
        <text x="80" y="135" fontSize="8" fill={C.steam} textAnchor="middle" fontFamily="Courier New">FLOAT TRAP</text>
      </g>
    ),
    bucket:(
      <g>
        <rect x="25" y="35" width="110" height="90" rx="8" fill={C.pipe} opacity={0.1} stroke={C.pipe} strokeWidth="1.5"/>
        <path d="M55,60 L55,100 L105,100 L105,60 Z" fill={C.pipe} opacity={0.25} stroke={C.pipe} strokeWidth="1.5"/>
        <text x="80" y="84" fontSize="7" fill={C.pipe} textAnchor="middle" fontFamily="Courier New">BUCKET</text>
        <text x="80" y="94" fontSize="6" fill={C.pipe} textAnchor="middle" fontFamily="Courier New">(inverted)</text>
        <circle cx="80" cy="110" r="6" fill={C.valve} opacity={0.6}/>
        <text x="80" y="135" fontSize="8" fill={C.pipe} textAnchor="middle" fontFamily="Courier New">BUCKET TRAP</text>
      </g>
    ),
    thermostatic:(
      <g>
        <rect x="30" y="40" width="100" height="80" rx="8" fill={C.valve} opacity={0.1} stroke={C.valve} strokeWidth="1.5"/>
        <ellipse cx="80" cy="80" rx="25" ry="18" fill={C.valve} opacity={0.25} stroke={C.valve} strokeWidth="1.5"/>
        <text x="80" y="77" fontSize="7" fill={C.valve} textAnchor="middle" fontFamily="Courier New">THERMO</text>
        <text x="80" y="87" fontSize="7" fill={C.valve} textAnchor="middle" fontFamily="Courier New">ELEMENT</text>
        <line x1="30" y1="80" x2="10" y2="80" stroke={C.valve} strokeWidth="2"/>
        <line x1="130" y1="80" x2="150" y2="80" stroke={C.valve} strokeWidth="2" strokeDasharray="3,2" opacity={0.4}/>
        <text x="80" y="135" fontSize="8" fill={C.valve} textAnchor="middle" fontFamily="Courier New">THERMOSTATIC</text>
      </g>
    ),
    thermodynamic:(
      <g>
        <rect x="40" y="50" width="80" height="70" rx="8" fill={C.trap} opacity={0.1} stroke={C.trap} strokeWidth="1.5"/>
        <ellipse cx="80" cy="85" rx="22" ry="8" fill={C.trap} opacity={0.4} stroke={C.trap} strokeWidth="2"/>
        <text x="80" y="88" fontSize="7" fill="#fff" textAnchor="middle" fontFamily="Courier New">DISC</text>
        <line x1="40" y1="85" x2="20" y2="85" stroke={C.trap} strokeWidth="2"/>
        <line x1="120" y1="85" x2="140" y2="85" stroke={C.trap} strokeWidth="2" strokeDasharray="3,2" opacity={0.5}/>
        <text x="80" y="40" fontSize="7" fill={C.trap} textAnchor="middle" fontFamily="Courier New">click!</text>
        <text x="80" y="135" fontSize="8" fill={C.trap} textAnchor="middle" fontFamily="Courier New">THERMODYNAMIC</text>
      </g>
    ),
  };

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.trap}33`}}>
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {Object.entries(traps).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{
            flex:1,padding:"7px 4px",borderRadius:10,fontSize:9,cursor:"pointer",
            background:sel===key?`${trapCols[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?trapCols[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?trapCols[key]:"rgba(240,244,255,0.45)",
            fontFamily:"Courier New",textAlign:"center",
          }}>{key==="float"?"FLOAT":key==="bucket"?"BUCKET":key==="thermostatic"?"THERMO":"THERMO\nDYN"}</button>
        ))}
      </div>
      <svg viewBox="0 0 160 145" style={{width:"100%",maxWidth:220,display:"block",margin:"0 auto",background:`${C.navy3}66`,borderRadius:8}}>
        {svgs[sel]}
      </svg>
      <div style={{marginTop:10,padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${trapCols[sel]||C.trap}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
        <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{traps[sel].name}</div>
        {traps[sel].desc}
      </div>
    </div>
  );
}

// ── SVG 4 - FAULTS ───────────────────────────────────────────
function FaultsSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string|null>(null);
  const faults = t.faults;
  const fColors: Record<string,string> = {waterhammer:C.danger,trapleaking:C.insul,trapblocked:C.trap,insulloss:C.pipe};
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


const ACCIDENT_L4: any = {
  fr: {
    title: "CAS REEL : Surpression du systeme vapeur d'une chaudiere - navire de forage (2019, rapport Bahamas Maritime Authority)",
    body: "Le 18 novembre 2019, au large du Bresil, un navire de forage a subi une surpression dans la chambre a eau d'une de ses chaudieres, provoquant une explosion. L'evenement a cause la mort de trois membres d'equipage. L'enquete a mis en evidence une defaillance dans la chaine de regulation et de protection du systeme vapeur : la pression dans le circuit a depasse les limites de securite sans que les dispositifs de protection (regulation, alarme, soupape) n'interrompent a temps la montee en pression. Ce type d'accident illustre comment une defaillance combinee de la regulation de pression et des protections associees dans un reseau vapeur peut transformer un ecart de fonctionnement en catastrophe.",
    lessons: [
      "Chaque composant de la chaine de regulation de pression (detendeur, soupape, alarme) doit etre teste independamment : une protection unique jamais verifiee peut dissimuler un defaut critique.",
      "Une surpression dans une chambre a eau ou un circuit vapeur peut se developper tres rapidement : la surveillance continue des parametres de pression est indispensable, en particulier lors des phases de demarrage ou de changement de regime.",
      "Le personnel doit etre forme a reconnaitre les signes avant-coureurs d'une derive de pression (variations anormales au manometre, bruits inhabituels) et a declencher un arret d'urgence sans attendre confirmation.",
      "Les enquetes sur les accidents de systemes vapeur montrent regulierement que plusieurs protections independantes doivent faillir simultanement pour qu'une catastrophe survienne : chaque niveau de securite compte.",
    ],
  },
  en: {
    title: "REAL CASE: Boiler steam system overpressure - drill ship (2019, Bahamas Maritime Authority report)",
    body: "On 18 November 2019, off the coast of Brazil, a drill ship suffered an overpressure in the water chamber of one of its boilers, resulting in an explosion. The event caused the deaths of three crew members. The investigation identified a failure in the steam system's regulation and protection chain: pressure in the circuit exceeded safety limits without the protective devices (regulation, alarm, valve) interrupting the pressure rise in time. This type of accident illustrates how a combined failure of pressure regulation and its associated protections in a steam network can turn an operating deviation into a catastrophe.",
    lessons: [
      "Every component in the pressure regulation chain (reducing valve, safety valve, alarm) must be tested independently: a single protection that is never verified can hide a critical fault.",
      "Overpressure in a water chamber or steam circuit can develop very quickly: continuous monitoring of pressure parameters is essential, particularly during startup phases or regime changes.",
      "Personnel must be trained to recognise early warning signs of a pressure drift (abnormal gauge variations, unusual noises) and to trigger an emergency shutdown without waiting for confirmation.",
      "Investigations into steam system accidents regularly show that several independent protections must fail simultaneously for a catastrophe to occur: every layer of safety matters.",
    ],
  },
  es: {
    title: "CASO REAL: Sobrepresion del sistema de vapor de una caldera - buque de perforacion (2019, informe Bahamas Maritime Authority)",
    body: "El 18 de noviembre de 2019, frente a la costa de Brasil, un buque de perforacion sufrio una sobrepresion en la camara de agua de una de sus calderas, provocando una explosion. El suceso causo la muerte de tres tripulantes. La investigacion revelo un fallo en la cadena de regulacion y proteccion del sistema de vapor: la presion en el circuito supero los limites de seguridad sin que los dispositivos de proteccion (regulacion, alarma, valvula) interrumpieran a tiempo la subida de presion. Este tipo de accidente ilustra como un fallo combinado de la regulacion de presion y sus protecciones asociadas en una red de vapor puede convertir una desviacion de funcionamiento en una catastrofe.",
    lessons: [
      "Cada componente de la cadena de regulacion de presion (reductora, valvula de seguridad, alarma) debe probarse de forma independiente: una unica proteccion nunca verificada puede ocultar un fallo critico.",
      "Una sobrepresion en una camara de agua o circuito de vapor puede desarrollarse muy rapidamente: la vigilancia continua de los parametros de presion es indispensable, en particular durante las fases de arranque o cambio de regimen.",
      "El personal debe estar formado para reconocer las senales tempranas de una deriva de presion (variaciones anormales en el manometro, ruidos inusuales) y activar una parada de emergencia sin esperar confirmacion.",
      "Las investigaciones de accidentes en sistemas de vapor muestran regularmente que varias protecciones independientes deben fallar simultaneamente para que ocurra una catastrofe: cada nivel de seguridad cuenta.",
    ],
  },
  pt: {
    title: "CASO REAL: Sobrepressao do sistema de vapor de uma caldeira - navio de perfuracao (2019, relatorio Bahamas Maritime Authority)",
    body: "Em 18 de novembro de 2019, ao largo do Brasil, um navio de perfuracao sofreu uma sobrepressao na camara de agua de uma das suas caldeiras, provocando uma explosao. O evento causou a morte de tres tripulantes. A investigacao revelou uma falha na cadeia de regulacao e protecao do sistema de vapor: a pressao no circuito ultrapassou os limites de seguranca sem que os dispositivos de protecao (regulacao, alarme, valvula) interrompessem a tempo a subida de pressao. Este tipo de acidente ilustra como uma falha combinada da regulacao de pressao e das suas protecoes associadas numa rede de vapor pode transformar um desvio de funcionamento numa catastrofe.",
    lessons: [
      "Cada componente da cadeia de regulacao de pressao (redutora, valvula de seguranca, alarme) deve ser testado de forma independente: uma unica protecao nunca verificada pode esconder uma falha critica.",
      "Uma sobrepressao numa camara de agua ou circuito de vapor pode desenvolver-se muito rapidamente: a monitorizacao continua dos parametros de pressao e indispensavel, particularmente durante as fases de arranque ou mudanca de regime.",
      "O pessoal deve ser formado para reconhecer os sinais precoces de um desvio de pressao (variacoes anormais no manometro, ruidos invulgares) e acionar uma paragem de emergencia sem esperar confirmacao.",
      "As investigacoes de acidentes em sistemas de vapor mostram regularmente que varias protecoes independentes devem falhar simultaneamente para que ocorra uma catastrofe: cada nivel de seguranca conta.",
    ],
  },
};

function AccidentCase({ lang }: { lang: string }) {
  const a = ACCIDENT_L4[lang] || ACCIDENT_L4.fr;
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
  const section=(title:string,children:React.ReactNode,color=C.steam)=>(
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
      {section(t.s1title,<SteamTypesSVG lang={lang}/>,C.steam)}
      {section(t.s2title,<ComponentsSVG lang={lang}/>,C.pipe)}
      {section(t.s3title,<TrapsSVG lang={lang}/>,C.trap)}
      {section(t.s4title,<FaultsSVG lang={lang}/>,C.danger)}
      <AccidentCase lang={lang}/>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.gold,margin:"20px 0 14px"}}>✏️ {t.practiceTitle}</div>
      {t.questions.map((q:any,i:number)=>(
        <div key={i} style={{marginBottom:14,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.steam}33`,overflow:"hidden"}}>
          <div style={{padding:"12px 14px"}}>
            <div style={{fontSize:10,color:C.steam,letterSpacing:1,marginBottom:6,fontFamily:"'Cinzel',serif"}}>Q{i+1}</div>
            <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>{q.q}</div>
          </div>
          <div style={{padding:"0 14px 12px"}}>
            <input type="text" placeholder="?" value={inputs[i]} onChange={e=>setInputs(p=>p.map((v,j)=>j===i?e.target.value:v))} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.05)",color:"#f0f4ff",fontSize:12,fontFamily:"Courier New",marginBottom:10,boxSizing:"border-box"}}/>
            <button onClick={()=>toggle(i)} style={{padding:"7px 14px",borderRadius:8,fontSize:11,cursor:"pointer",background:shown[i]?`${C.steam}22`:"rgba(255,255,255,0.06)",border:`1px solid ${shown[i]?C.steam:"rgba(255,255,255,0.15)"}`,color:shown[i]?C.steam:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{shown[i]?t.hideAnswer:t.showAnswer}</button>
            {shown[i]&&<div style={{marginTop:10,padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.steam}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{q.a}</div>}
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
// LessonE3_L4 - PART 2: Bank + Quiz + Main

function getBank(lang: string) {
  const b: any = {
    fr:[
      {q:"Qu'est-ce que la vapeur saturee seche et pourquoi est-elle preferee pour le chauffage a bord ?",opts:["Une vapeur melangee a des gouttelettes d'eau","Vapeur pure (titre 1,0) avec une energie latente elevee et une temperature directement liee a la pression, ideale pour le chauffage","Une vapeur uniquement utilisee dans les turbines","Une vapeur a temperature variable et imprevisible"],correct:1,exp:"La vapeur saturee seche (titre 1,0, aucune goutelette) offre une energie latente tres elevee et une temperature stable determinee par la pression, ce qui la rend ideale pour les echangeurs de chauffage."},
      {q:"Quels criteres determinent le choix du type de purgeur de vapeur ?",opts:["Uniquement la couleur du reseau","Le debit de condensat, la pression differentielle, le risque de coup de belier et l'espace disponible","Le prix uniquement","Il n'existe qu'un seul type de purgeur"],correct:1,exp:"Le choix depend du debit de condensat a evacuer, de la pression differentielle, du risque de coup de belier (purgeur a seau renverse tres robuste) et de l'espace disponible (thermodynamique tres compact)."},
      {q:"Comment diagnostique-t-on un purgeur de vapeur defaillant sans le demonter ?",opts:["Il est impossible de le diagnostiquer sans demontage","Par methode acoustique (stethoscope), methode thermique (thermometre infrarouge) et methode visuelle","Uniquement en mesurant la pression du reseau","En verifiant seulement la couleur du purgeur"],correct:1,exp:"Le diagnostic combine methode acoustique (son continu = purgeur ouvert), methode thermique (comparaison amont/aval) et methode visuelle (observation des condensats evacues), sans demontage necessaire."},
      {q:"Qu'est-ce que la vapeur de detente (flash steam) et comment peut-on l'exploiter ?",opts:["Une vapeur produite uniquement par la chaudiere principale","De la vapeur qui se forme quand un condensat chaud sous haute pression est detendu a basse pression ; elle peut alimenter un circuit basse pression","Un defaut du purgeur de vapeur","Une vapeur toxique a evacuer immediatement"],correct:1,exp:"Quand un condensat chaud a haute pression est detendu, une fraction (10-15%) se vaporise instantanement en flash steam. Collectee dans un flash vessel, elle peut alimenter un circuit basse pression, recuperant 10-20% d'energie supplementaire."},
      {q:"Pourquoi est-il important de recuperer les condensats de vapeur ?",opts:["Ce n'est pas important, ils peuvent etre rejetes","Ils sont tres purs (economie de traitement chimique), chauds (economie d'energie) et permettent une economie d'eau douce","Uniquement pour respecter une tradition","Ils sont dangereux et doivent etre elimines"],correct:1,exp:"Les condensats, tres purs et chauds (80-100 degC), permettent d'economiser les produits de traitement d'eau, l'energie de prechauffage et l'eau douce, tout en reduisant la purge necessaire."},
      {q:"Quelle est la procedure correcte pour mettre en service une tuyauterie vapeur froide ?",opts:["Ouvrir la vanne principale a 100% immediatement","Ouvrir les drains, introduire la vapeur progressivement (25% d'ouverture) puis augmenter lentement sur 5-10 minutes","Fermer tous les drains avant d'introduire la vapeur","La procedure n'a pas d'importance particuliere"],correct:1,exp:"Il faut ouvrir tous les drains pour evacuer l'eau stagnante, introduire la vapeur progressivement (25% d'ouverture), attendre que les drains n'evacuent plus de condensats, puis ouvrir lentement a 100% sur 5-10 minutes pour eviter un coup de belier."},
      {q:"Comment fonctionne un detendeur de vapeur (reducteur de pression) ?",opts:["Il augmente automatiquement la pression","Un ressort calibre ou pilote pneumatique regule l'ouverture d'une vanne selon la pression aval mesuree","Il fonctionne uniquement manuellement","Il n'a aucun lien avec la pression du reseau"],correct:1,exp:"Un ressort calibre (ou pilote pneumatique) maintient une vanne partiellement ouverte : si la pression aval monte, la vanne se ferme ; si elle baisse, la vanne s'ouvre, maintenant une pression de consigne stable."},
      {q:"Pourquoi le coup de belier (waterhammer) dans un reseau vapeur est-il si dangereux ?",opts:["Il ne cause que des bruits sans danger reel","La vapeur a grande vitesse frappe un bouchon de condensats accumules, generant une onde de pression pouvant atteindre 10 a 20 fois la pression de service","Il n'affecte que l'efficacite energetique","Il est facilement reversible sans dommage"],correct:1,exp:"Le coup de belier survient quand la vapeur (20-30 m/s) frappe un bouchon de condensats accumules dans un point bas, generant une onde de choc pouvant atteindre 10-20 fois la pression de service, causant rupture de tuyauterie et dommages aux vannes."},
      {q:"Comment calcule-t-on la consommation de vapeur d'un rechauffeur de HFO ?",opts:["En mesurant uniquement la temperature ambiante","Q = debit HFO x chaleur specifique x variation de temperature, puis diviser par la chaleur latente de la vapeur pour obtenir le debit vapeur","La consommation de vapeur ne peut pas etre calculee","En multipliant simplement la pression par le debit"],correct:1,exp:"On calcule d'abord la chaleur necessaire Q = m_HFO x Cp x (T_finale - T_initiale), puis on divise par la chaleur latente de la vapeur (environ 2050 kJ/kg a 7 bar) pour obtenir le debit de vapeur necessaire, en ajoutant 10-20% pour les pertes."},
      {q:"Quel est l'impact de l'isolation thermique des conduites vapeur sur la consommation ?",opts:["Un impact negligeable","Une conduite non isolee peut perdre 300-400 W/m ; une isolation correcte reduit ces pertes de 90 a 95%","L'isolation n'a d'effet que sur le bruit","Elle augmente la consommation de vapeur"],correct:1,exp:"Une conduite non isolee a 165 degC peut perdre 300-400 W/m (3-4 kg/h de vapeur par metre). Une isolation correcte (laine de roche/verre) reduit ces pertes de 90-95%, representant des economies annuelles considerables."},
      {q:"Comment reconnait-on un purgeur thermodynamique (a disque) qui fonctionne normalement ?",opts:["Il ne doit jamais faire de bruit","Un claquement regulier toutes les 5 a 30 secondes indique un fonctionnement normal ; un claquement continu et rapide indique un purgeur bloque ouvert","Il doit etre silencieux en permanence","La temperature ne permet pas de le diagnostiquer"],correct:1,exp:"Un claquement regulier toutes les 5-30 secondes = fonctionnement normal. Un claquement continu et rapide indique un purgeur bloque ouvert (vapeur qui passe en permanence). L'absence totale de claquement indique un purgeur bloque ferme."},
      {q:"Quel est l'usage principal de la vapeur a bord d'un navire a moteur diesel moderne ?",opts:["Uniquement la propulsion","Le rechauffage du HFO (le plus gros consommateur), l'eau sanitaire et le chauffage des locaux","Uniquement le nettoyage des ponts","La vapeur n'a plus d'usage sur les navires modernes"],correct:1,exp:"Sur un navire diesel moderne, le rechauffage du HFO avant purification et injection est le plus gros consommateur de vapeur (300-500 kg/h), suivi de l'eau sanitaire chaude et du chauffage des locaux, pour un total typique de 500-800 kg/h."},
      {q:"Quel est le role d'un collecteur de vapeur (steam header) dans la distribution ?",opts:["Il sert uniquement de reserve d'urgence","Point central de distribution recevant la vapeur de la chaudiere et l'alimentant vers plusieurs circuits via des vannes individuelles","Il remplace la chaudiere en cas de panne","Il sert uniquement a mesurer la pression"],correct:1,exp:"Le collecteur de vapeur (steam header) est le point central ou la vapeur produite par la chaudiere est distribuee vers les differents circuits (chauffage HFO, eau sanitaire, locaux) via des vannes individuelles, permettant d'isoler chaque circuit independamment."},
      {q:"Pourquoi la vapeur surchauffee n'est-elle generalement pas utilisee pour le chauffage a bord des navires ?",opts:["Elle est trop difficile a produire","La vapeur saturee offre un transfert de chaleur plus efficace et une temperature stable liee directement a la pression, suffisante pour le chauffage","La vapeur surchauffee est interdite par SOLAS","Elle coute beaucoup plus cher a produire"],correct:1,exp:"Pour le chauffage, la vapeur saturee est preferee car elle offre un transfert de chaleur tres efficace par condensation et une temperature stable et previsible liee a la pression. La vapeur surchauffee, plus complexe a produire, est reservee aux applications necessitant de hautes temperatures comme la propulsion."},
      {q:"Quelles sont les consequences d'un purgeur de vapeur mal dimensionne (trop petit ou trop grand) ?",opts:["Aucune consequence notable sur le systeme","Sous-dimensionne : accumulation de condensat et coups de belier ; surdimensionne : fuites de vapeur vive et gaspillage energetique","Un purgeur mal dimensionne ameliore toujours le rendement","Le dimensionnement n'a aucun impact sur la securite"],correct:1,exp:"Un purgeur sous-dimensionne ne peut evacuer tout le condensat, causant son accumulation et un risque de coup de belier. Un purgeur surdimensionne laisse passer de la vapeur vive avec le condensat, gaspillant de l'energie. Le dimensionnement correct depend du debit de condensat et de la pression differentielle."},
    ],
    en:[
      {q:"What is dry saturated steam and why is it preferred for on-board heating?",opts:["Steam mixed with water droplets","Pure steam (quality 1.0) with high latent energy and a temperature directly tied to pressure, ideal for heating","Steam used only in turbines","Steam with unpredictable, variable temperature"],correct:1,exp:"Dry saturated steam (quality 1.0, no droplets) offers very high latent energy and a stable temperature determined by pressure, making it ideal for heating exchangers."},
      {q:"What criteria determine the choice of steam trap type?",opts:["Only the network colour","Condensate flow, differential pressure, water hammer risk and available space","Price only","There is only one type of steam trap"],correct:1,exp:"Choice depends on condensate flow to discharge, differential pressure, water hammer risk (inverted bucket trap very robust) and available space (thermodynamic trap very compact)."},
      {q:"How is a failed steam trap diagnosed without dismantling it?",opts:["It cannot be diagnosed without dismantling","By acoustic method (stethoscope), thermal method (infrared thermometer) and visual method","Only by measuring network pressure","Only by checking the trap's colour"],correct:1,exp:"Diagnosis combines acoustic method (continuous sound = trap open), thermal method (upstream/downstream comparison) and visual method (observing discharged condensate), with no dismantling needed."},
      {q:"What is flash steam and how can it be exploited?",opts:["Steam produced only by the main boiler","Steam that forms when hot high-pressure condensate is flashed to lower pressure; it can feed a low-pressure circuit","A steam trap fault","Toxic steam that must be vented immediately"],correct:1,exp:"When hot high-pressure condensate is flashed to lower pressure, a fraction (10-15%) instantly vaporises as flash steam. Collected in a flash vessel, it can feed a low-pressure circuit, recovering 10-20% extra energy."},
      {q:"Why is it important to recover steam condensate?",opts:["It is not important, it can be discharged","It is very pure (chemical treatment savings), hot (energy savings) and allows fresh water savings","Only to follow tradition","It is dangerous and must be eliminated"],correct:1,exp:"Condensate, very pure and hot (80-100 degC), saves water treatment chemicals, preheating energy and fresh water, while reducing the blow-down needed."},
      {q:"What is the correct procedure to bring a cold steam pipe into service?",opts:["Open the main valve to 100% immediately","Open the drains, introduce steam gradually (25% opening) then slowly increase over 5-10 minutes","Close all drains before introducing steam","The procedure has no particular importance"],correct:1,exp:"All drains must be opened to clear stagnant water, steam introduced gradually (25% opening), wait until drains no longer discharge condensate, then slowly open to 100% over 5-10 minutes to avoid water hammer."},
      {q:"How does a pressure reducing valve work?",opts:["It automatically increases pressure","A calibrated spring or pneumatic pilot regulates valve opening based on measured downstream pressure","It only works manually","It has no relation to network pressure"],correct:1,exp:"A calibrated spring (or pneumatic pilot) keeps a valve partially open: if downstream pressure rises, the valve closes; if it drops, the valve opens, maintaining a stable set pressure."},
      {q:"Why is water hammer in a steam network so dangerous?",opts:["It only causes harmless noise","High-speed steam strikes a plug of accumulated condensate, generating a pressure wave that can reach 10 to 20 times service pressure","It only affects energy efficiency","It is easily reversible without damage"],correct:1,exp:"Water hammer occurs when steam (20-30 m/s) strikes a plug of condensate accumulated at a low point, generating a shock wave that can reach 10-20 times service pressure, causing pipe rupture and valve damage."},
      {q:"How is the steam consumption of an HFO heater calculated?",opts:["By measuring only ambient temperature","Q = HFO flow x specific heat x temperature change, then divide by steam latent heat to get steam flow","Steam consumption cannot be calculated","By simply multiplying pressure by flow"],correct:1,exp:"First calculate the heat required Q = m_HFO x Cp x (T_final - T_initial), then divide by steam latent heat (about 2050 kJ/kg at 7 bar) to get the required steam flow, adding 10-20% for losses."},
      {q:"What is the impact of thermal insulation of steam pipes on consumption?",opts:["A negligible impact","An uninsulated pipe can lose 300-400 W/m; proper insulation reduces these losses by 90 to 95%","Insulation only affects noise","It increases steam consumption"],correct:1,exp:"An uninsulated pipe at 165 degC can lose 300-400 W/m (3-4 kg/h of steam per metre). Proper insulation (rock/glass wool) reduces these losses by 90-95%, representing significant annual savings."},
      {q:"How do you recognise a thermodynamic (disc) trap operating normally?",opts:["It must never make noise","A regular click every 5 to 30 seconds indicates normal operation; continuous rapid clicking indicates a trap stuck open","It must be permanently silent","Temperature cannot be used to diagnose it"],correct:1,exp:"A regular click every 5-30 seconds = normal operation. Continuous rapid clicking indicates a trap stuck open (steam passing continuously). No clicking at all indicates a trap stuck closed."},
      {q:"What is the main use of steam on board a modern diesel-engine vessel?",opts:["Only propulsion","HFO heating (the largest consumer), domestic hot water and space heating","Only deck cleaning","Steam no longer has a use on modern vessels"],correct:1,exp:"On a modern diesel vessel, HFO heating before purification and injection is the largest steam consumer (300-500 kg/h), followed by domestic hot water and space heating, for a typical total of 500-800 kg/h."},
      {q:"What is the role of a steam header in distribution?",opts:["It only serves as an emergency reserve","Central distribution point receiving steam from the boiler and feeding several circuits via individual valves","It replaces the boiler in case of failure","It only serves to measure pressure"],correct:1,exp:"The steam header is the central point where steam produced by the boiler is distributed to the various circuits (HFO heating, domestic water, space heating) via individual valves, allowing each circuit to be isolated independently."},
      {q:"Why is superheated steam generally not used for heating on board ships?",opts:["It is too difficult to produce","Saturated steam offers more efficient heat transfer and a stable temperature directly linked to pressure, sufficient for heating","Superheated steam is prohibited by SOLAS","It costs much more to produce"],correct:1,exp:"For heating, saturated steam is preferred as it offers very efficient heat transfer by condensation and a stable, predictable temperature linked to pressure. Superheated steam, more complex to produce, is reserved for applications requiring high temperatures such as propulsion."},
      {q:"What are the consequences of an incorrectly sized steam trap (too small or too large)?",opts:["No notable consequence on the system","Undersized: condensate accumulation and water hammer; oversized: live steam leaks and energy waste","An incorrectly sized trap always improves efficiency","Sizing has no impact on safety"],correct:1,exp:"An undersized trap cannot evacuate all the condensate, causing accumulation and water hammer risk. An oversized trap lets live steam pass with the condensate, wasting energy. Correct sizing depends on condensate flow and differential pressure."},
    ],
    es:[
      {q:"¿Que es el vapor saturado seco y por que se prefiere para la calefaccion a bordo?",opts:["Vapor mezclado con gotas de agua","Vapor puro (calidad 1,0) con alta energia latente y una temperatura ligada directamente a la presion, ideal para calefaccion","Vapor usado solo en turbinas","Vapor con temperatura variable e impredecible"],correct:1,exp:"El vapor saturado seco (calidad 1,0, sin gotas) ofrece una energia latente muy alta y una temperatura estable determinada por la presion, siendo ideal para intercambiadores de calefaccion."},
      {q:"¿Que criterios determinan la eleccion del tipo de purgador de vapor?",opts:["Solo el color de la red","El caudal de condensado, la presion diferencial, el riesgo de golpe de ariete y el espacio disponible","Solo el precio","Solo existe un tipo de purgador"],correct:1,exp:"La eleccion depende del caudal de condensado a evacuar, la presion diferencial, el riesgo de golpe de ariete (purgador de cubo invertido muy robusto) y el espacio disponible (termodinamico muy compacto)."},
      {q:"¿Como se diagnostica un purgador de vapor averiado sin desmontarlo?",opts:["Es imposible diagnosticarlo sin desmontaje","Mediante metodo acustico (estetoscopio), metodo termico (termometro infrarrojo) y metodo visual","Solo midiendo la presion de la red","Solo verificando el color del purgador"],correct:1,exp:"El diagnostico combina metodo acustico (sonido continuo = purgador abierto), metodo termico (comparacion aguas arriba/abajo) y metodo visual (observacion de condensados evacuados), sin necesidad de desmontaje."},
      {q:"¿Que es el vapor de expansion (flash steam) y como se puede aprovechar?",opts:["Vapor producido solo por la caldera principal","Vapor que se forma cuando un condensado caliente a alta presion se expande a baja presion; puede alimentar un circuito de baja presion","Un fallo del purgador de vapor","Un vapor toxico que debe evacuarse de inmediato"],correct:1,exp:"Cuando un condensado caliente a alta presion se expande a baja presion, una fraccion (10-15%) se vaporiza instantaneamente como flash steam. Recogido en un deposito de expansion, puede alimentar un circuito de baja presion, recuperando 10-20% de energia adicional."},
      {q:"¿Por que es importante recuperar los condensados de vapor?",opts:["No es importante, pueden verterse","Son muy puros (ahorro de tratamiento quimico), calientes (ahorro de energia) y permiten ahorrar agua dulce","Solo por seguir la tradicion","Son peligrosos y deben eliminarse"],correct:1,exp:"Los condensados, muy puros y calientes (80-100 degC), ahorran productos de tratamiento de agua, energia de precalentamiento y agua dulce, ademas de reducir la purga necesaria."},
      {q:"¿Cual es el procedimiento correcto para poner en servicio una tuberia de vapor fria?",opts:["Abrir la valvula principal al 100% de inmediato","Abrir los drenajes, introducir vapor gradualmente (25% de apertura) y luego aumentar lentamente durante 5-10 minutos","Cerrar todos los drenajes antes de introducir vapor","El procedimiento no tiene importancia particular"],correct:1,exp:"Hay que abrir todos los drenajes para evacuar el agua estancada, introducir el vapor gradualmente (25% de apertura), esperar a que los drenajes dejen de evacuar condensado, y luego abrir lentamente al 100% durante 5-10 minutos para evitar un golpe de ariete."},
      {q:"¿Como funciona una valvula reductora de presion de vapor?",opts:["Aumenta automaticamente la presion","Un muelle calibrado o piloto neumatico regula la apertura de una valvula segun la presion aguas abajo medida","Solo funciona manualmente","No tiene relacion con la presion de la red"],correct:1,exp:"Un muelle calibrado (o piloto neumatico) mantiene una valvula parcialmente abierta: si la presion aguas abajo sube, la valvula se cierra; si baja, la valvula se abre, manteniendo una presion de consigna estable."},
      {q:"¿Por que el golpe de ariete en una red de vapor es tan peligroso?",opts:["Solo causa ruido sin peligro real","El vapor a gran velocidad golpea un tapon de condensado acumulado, generando una onda de presion que puede alcanzar de 10 a 20 veces la presion de servicio","Solo afecta a la eficiencia energetica","Es facilmente reversible sin dano"],correct:1,exp:"El golpe de ariete ocurre cuando el vapor (20-30 m/s) golpea un tapon de condensado acumulado en un punto bajo, generando una onda de choque que puede alcanzar 10-20 veces la presion de servicio, causando rotura de tuberias y danos en valvulas."},
      {q:"¿Como se calcula el consumo de vapor de un calentador de HFO?",opts:["Midiendo solo la temperatura ambiente","Q = caudal de HFO x calor especifico x variacion de temperatura, luego dividir por el calor latente del vapor para obtener el caudal de vapor","El consumo de vapor no se puede calcular","Multiplicando simplemente la presion por el caudal"],correct:1,exp:"Primero se calcula el calor necesario Q = m_HFO x Cp x (T_final - T_inicial), luego se divide por el calor latente del vapor (unos 2050 kJ/kg a 7 bar) para obtener el caudal de vapor necesario, anadiendo 10-20% por perdidas."},
      {q:"¿Cual es el impacto del aislamiento termico de las tuberias de vapor sobre el consumo?",opts:["Un impacto insignificante","Una tuberia sin aislar puede perder 300-400 W/m; un aislamiento correcto reduce estas perdidas en un 90 a 95%","El aislamiento solo afecta al ruido","Aumenta el consumo de vapor"],correct:1,exp:"Una tuberia sin aislar a 165 degC puede perder 300-400 W/m (3-4 kg/h de vapor por metro). Un aislamiento correcto (lana de roca/vidrio) reduce estas perdidas en un 90-95%, representando ahorros anuales considerables."},
      {q:"¿Como se reconoce un purgador termodinamico (de disco) que funciona normalmente?",opts:["Nunca debe hacer ruido","Un chasquido regular cada 5 a 30 segundos indica funcionamiento normal; un chasquido continuo y rapido indica un purgador atascado abierto","Debe estar siempre silencioso","La temperatura no permite diagnosticarlo"],correct:1,exp:"Un chasquido regular cada 5-30 segundos = funcionamiento normal. Un chasquido continuo y rapido indica un purgador atascado abierto (vapor pasando continuamente). La ausencia total de chasquido indica un purgador atascado cerrado."},
      {q:"¿Cual es el uso principal del vapor a bordo de un buque de motor diesel moderno?",opts:["Solo la propulsion","El calentamiento del HFO (el mayor consumidor), el agua sanitaria y la calefaccion de locales","Solo la limpieza de cubiertas","El vapor ya no tiene uso en los buques modernos"],correct:1,exp:"En un buque diesel moderno, el calentamiento del HFO antes de la purificacion e inyeccion es el mayor consumidor de vapor (300-500 kg/h), seguido del agua sanitaria caliente y la calefaccion de locales, con un total tipico de 500-800 kg/h."},
      {q:"¿Cual es la funcion de un colector de vapor (steam header) en la distribucion?",opts:["Solo sirve de reserva de emergencia","Punto central de distribucion que recibe el vapor de la caldera y lo alimenta hacia varios circuitos mediante valvulas individuales","Sustituye a la caldera en caso de averia","Solo sirve para medir la presion"],correct:1,exp:"El colector de vapor (steam header) es el punto central donde el vapor producido por la caldera se distribuye hacia los distintos circuitos (calentamiento de HFO, agua sanitaria, calefaccion de locales) mediante valvulas individuales, permitiendo aislar cada circuito de forma independiente."},
      {q:"¿Por que el vapor sobrecalentado no se usa generalmente para la calefaccion a bordo de los buques?",opts:["Es demasiado dificil de producir","El vapor saturado ofrece una transferencia de calor mas eficaz y una temperatura estable ligada directamente a la presion, suficiente para la calefaccion","El vapor sobrecalentado esta prohibido por el SOLAS","Cuesta mucho mas producirlo"],correct:1,exp:"Para la calefaccion, se prefiere el vapor saturado porque ofrece una transferencia de calor muy eficaz por condensacion y una temperatura estable y previsible ligada a la presion. El vapor sobrecalentado, mas complejo de producir, se reserva para aplicaciones que requieren altas temperaturas como la propulsion."},
      {q:"¿Cuales son las consecuencias de un purgador de vapor mal dimensionado (demasiado pequeno o demasiado grande)?",opts:["Ninguna consecuencia notable en el sistema","Subdimensionado: acumulacion de condensado y golpes de ariete; sobredimensionado: fugas de vapor vivo y despilfarro energetico","Un purgador mal dimensionado siempre mejora el rendimiento","El dimensionamiento no tiene ningun impacto en la seguridad"],correct:1,exp:"Un purgador subdimensionado no puede evacuar todo el condensado, causando su acumulacion y riesgo de golpe de ariete. Un purgador sobredimensionado deja pasar vapor vivo junto con el condensado, desperdiciando energia. El dimensionamiento correcto depende del caudal de condensado y la presion diferencial."},
    ],
    pt:[
      {q:"O que e vapor saturado seco e por que e preferido para aquecimento a bordo?",opts:["Vapor misturado com goticulas de agua","Vapor puro (qualidade 1,0) com alta energia latente e uma temperatura ligada diretamente a pressao, ideal para aquecimento","Vapor usado apenas em turbinas","Vapor com temperatura variavel e imprevisivel"],correct:1,exp:"O vapor saturado seco (qualidade 1,0, sem goticulas) oferece uma energia latente muito alta e uma temperatura estavel determinada pela pressao, sendo ideal para permutadores de aquecimento."},
      {q:"Que criterios determinam a escolha do tipo de purgador de vapor?",opts:["Apenas a cor da rede","O caudal de condensado, a pressao diferencial, o risco de golpe de ariete e o espaco disponivel","Apenas o preco","So existe um tipo de purgador"],correct:1,exp:"A escolha depende do caudal de condensado a evacuar, da pressao diferencial, do risco de golpe de ariete (purgador de balde invertido muito robusto) e do espaco disponivel (termodinamico muito compacto)."},
      {q:"Como se diagnostica um purgador de vapor avariado sem o desmontar?",opts:["E impossivel diagnosticar sem desmontagem","Por metodo acustico (estetoscopio), metodo termico (termometro infravermelho) e metodo visual","Apenas medindo a pressao da rede","Apenas verificando a cor do purgador"],correct:1,exp:"O diagnostico combina metodo acustico (som continuo = purgador aberto), metodo termico (comparacao a montante/jusante) e metodo visual (observacao dos condensados evacuados), sem necessidade de desmontagem."},
      {q:"O que e o vapor de expansao (flash steam) e como se pode aproveitar?",opts:["Vapor produzido apenas pela caldeira principal","Vapor que se forma quando um condensado quente a alta pressao e expandido a baixa pressao; pode alimentar um circuito de baixa pressao","Uma falha do purgador de vapor","Um vapor toxico que deve ser evacuado imediatamente"],correct:1,exp:"Quando um condensado quente a alta pressao e expandido a baixa pressao, uma fracao (10-15%) vaporiza instantaneamente como flash steam. Recolhido num deposito de expansao, pode alimentar um circuito de baixa pressao, recuperando 10-20% de energia adicional."},
      {q:"Por que e importante recuperar os condensados de vapor?",opts:["Nao e importante, podem ser descartados","Sao muito puros (poupanca de tratamento quimico), quentes (poupanca de energia) e permitem poupar agua doce","Apenas por seguir a tradicao","Sao perigosos e devem ser eliminados"],correct:1,exp:"Os condensados, muito puros e quentes (80-100 degC), poupam produtos de tratamento de agua, energia de pre-aquecimento e agua doce, alem de reduzir a purga necessaria."},
      {q:"Qual e o procedimento correto para colocar em servico uma tubagem de vapor fria?",opts:["Abrir a valvula principal a 100% imediatamente","Abrir os drenos, introduzir vapor gradualmente (25% de abertura) e depois aumentar lentamente durante 5-10 minutos","Fechar todos os drenos antes de introduzir vapor","O procedimento nao tem importancia particular"],correct:1,exp:"E preciso abrir todos os drenos para evacuar a agua estagnada, introduzir o vapor gradualmente (25% de abertura), esperar que os drenos deixem de evacuar condensado, e depois abrir lentamente a 100% durante 5-10 minutos para evitar um golpe de ariete."},
      {q:"Como funciona uma valvula redutora de pressao de vapor?",opts:["Aumenta automaticamente a pressao","Uma mola calibrada ou piloto pneumatico regula a abertura de uma valvula conforme a pressao a jusante medida","So funciona manualmente","Nao tem relacao com a pressao da rede"],correct:1,exp:"Uma mola calibrada (ou piloto pneumatico) mantem uma valvula parcialmente aberta: se a pressao a jusante sobe, a valvula fecha; se desce, a valvula abre, mantendo uma pressao de referencia estavel."},
      {q:"Por que o golpe de ariete numa rede de vapor e tao perigoso?",opts:["So causa ruido sem perigo real","O vapor a alta velocidade atinge um tampao de condensado acumulado, gerando uma onda de pressao que pode atingir 10 a 20 vezes a pressao de servico","So afeta a eficiencia energetica","E facilmente reversivel sem dano"],correct:1,exp:"O golpe de ariete ocorre quando o vapor (20-30 m/s) atinge um tampao de condensado acumulado num ponto baixo, gerando uma onda de choque que pode atingir 10-20 vezes a pressao de servico, causando rutura de tubagens e danos em valvulas."},
      {q:"Como se calcula o consumo de vapor de um aquecedor de HFO?",opts:["Medindo apenas a temperatura ambiente","Q = caudal de HFO x calor especifico x variacao de temperatura, depois dividir pelo calor latente do vapor para obter o caudal de vapor","O consumo de vapor nao pode ser calculado","Multiplicando simplesmente a pressao pelo caudal"],correct:1,exp:"Calcula-se primeiro o calor necessario Q = m_HFO x Cp x (T_final - T_inicial), depois divide-se pelo calor latente do vapor (cerca de 2050 kJ/kg a 7 bar) para obter o caudal de vapor necessario, adicionando 10-20% para perdas."},
      {q:"Qual e o impacto do isolamento termico das tubagens de vapor no consumo?",opts:["Um impacto insignificante","Uma tubagem nao isolada pode perder 300-400 W/m; um isolamento correto reduz essas perdas em 90 a 95%","O isolamento so afeta o ruido","Aumenta o consumo de vapor"],correct:1,exp:"Uma tubagem nao isolada a 165 degC pode perder 300-400 W/m (3-4 kg/h de vapor por metro). Um isolamento correto (la de rocha/vidro) reduz essas perdas em 90-95%, representando poupancas anuais consideraveis."},
      {q:"Como se reconhece um purgador termodinamico (de disco) a funcionar normalmente?",opts:["Nunca deve fazer ruido","Um estalido regular a cada 5 a 30 segundos indica funcionamento normal; um estalido continuo e rapido indica um purgador preso aberto","Deve estar sempre silencioso","A temperatura nao permite diagnostica-lo"],correct:1,exp:"Um estalido regular a cada 5-30 segundos = funcionamento normal. Um estalido continuo e rapido indica um purgador preso aberto (vapor a passar continuamente). A ausencia total de estalido indica um purgador preso fechado."},
      {q:"Qual e o uso principal do vapor a bordo de um navio a motor diesel moderno?",opts:["Apenas a propulsao","O aquecimento do HFO (o maior consumidor), a agua sanitaria e o aquecimento de locais","Apenas a limpeza dos conveses","O vapor ja nao tem uso nos navios modernos"],correct:1,exp:"Num navio diesel moderno, o aquecimento do HFO antes da purificacao e injecao e o maior consumidor de vapor (300-500 kg/h), seguido da agua sanitaria quente e do aquecimento de locais, com um total tipico de 500-800 kg/h."},
      {q:"Qual e a funcao de um coletor de vapor (steam header) na distribuicao?",opts:["So serve de reserva de emergencia","Ponto central de distribuicao que recebe o vapor da caldeira e o alimenta para varios circuitos atraves de valvulas individuais","Substitui a caldeira em caso de avaria","So serve para medir a pressao"],correct:1,exp:"O coletor de vapor (steam header) e o ponto central onde o vapor produzido pela caldeira e distribuido para os diferentes circuitos (aquecimento de HFO, agua sanitaria, aquecimento de locais) atraves de valvulas individuais, permitindo isolar cada circuito de forma independente."},
      {q:"Por que o vapor sobreaquecido geralmente nao e usado para aquecimento a bordo dos navios?",opts:["E demasiado dificil de produzir","O vapor saturado oferece uma transferencia de calor mais eficaz e uma temperatura estavel ligada diretamente a pressao, suficiente para o aquecimento","O vapor sobreaquecido e proibido pela SOLAS","Custa muito mais caro produzi-lo"],correct:1,exp:"Para o aquecimento, prefere-se o vapor saturado porque oferece uma transferencia de calor muito eficaz por condensacao e uma temperatura estavel e previsivel ligada a pressao. O vapor sobreaquecido, mais complexo de produzir, e reservado para aplicacoes que exigem altas temperaturas como a propulsao."},
      {q:"Quais sao as consequencias de um purgador de vapor mal dimensionado (demasiado pequeno ou demasiado grande)?",opts:["Nenhuma consequencia notavel no sistema","Subdimensionado: acumulacao de condensado e golpes de ariete; sobredimensionado: fugas de vapor vivo e desperdicio energetico","Um purgador mal dimensionado melhora sempre o rendimento","O dimensionamento nao tem nenhum impacto na seguranca"],correct:1,exp:"Um purgador subdimensionado nao consegue evacuar todo o condensado, causando a sua acumulacao e risco de golpe de ariete. Um purgador sobredimensionado deixa passar vapor vivo junto com o condensado, desperdicando energia. O dimensionamento correto depende do caudal de condensado e da pressao diferencial."},
    ],
  };
  return b[lang]||b.fr;
}

function getQuiz(lang: string) {
  const q: any = {
    fr:[
      {q:"Quel est le rôle d'un purgeur de vapeur (steam trap) ?",opts:["Augmenter la pression de vapeur","Évacuer les condensats sans laisser passer la vapeur vive","Réduire la température de la vapeur","Filtrer les impuretés de la vapeur"],correct:1,exp:"Le purgeur de vapeur évacue automatiquement les condensats (eau formée par refroidissement de la vapeur) du réseau vapeur SANS laisser passer la vapeur vive. Si les condensats ne sont pas évacués, ils s'accumulent → coups de bélier, refroidissement des consommateurs. Si la vapeur passe → gaspillage d'énergie."},
      {q:"Qu'est-ce qu'un coup de bélier (water hammer) dans un réseau vapeur ?",opts:["Une surtension électrique","Un choc hydraulique causé par des condensats frappés par la vapeur à grande vitesse","Une variation rapide de pression dans la chaudière","Un blocage d'une vanne de vapeur"],correct:1,exp:"Le coup de bélier est un choc hydraulique violent qui se produit quand des condensats (eau liquide) accumulés dans une conduite vapeur sont frappés par la vapeur se déplaçant à grande vitesse (20-30 m/s). L'eau étant incompressible, le choc est brutal → vibrations violentes, risque de rupture de tuyauterie."},
      {q:"Pourquoi ouvre-t-on les drains d'une tuyauterie vapeur avant de l'alimenter en vapeur ?",opts:["Pour augmenter la pression","Pour évacuer les condensats et éviter les coups de bélier","Pour refroidir les tuyauteries","Pour vérifier l'étanchéité"],correct:1,exp:"Les drains sont ouverts avant l'alimentation en vapeur pour évacuer les condensats (eau stagnante dans la tuyauterie froide). Sans cette précaution, la vapeur arrivant à grande vitesse frapperait les condensats → coup de bélier violent → risque de rupture de tuyauterie, dommages aux vannes et aux joints."},
      {q:"Quel type de vapeur est utilisé dans les turbines à vapeur à bord ?",opts:["Vapeur saturée sèche","Vapeur humide","Vapeur surchauffée","Vapeur de détente"],correct:2,exp:"La vapeur surchauffée est utilisée dans les turbines à vapeur. Elle a une température supérieure à sa température de saturation → plus d'énergie thermique disponible sous forme d'enthalpie → plus de travail mécanique produit dans la turbine. La vapeur saturée serait moins efficace (risque d'humidité dans les aubages)."},
      {q:"Qu'est-ce qu'un détendeur de vapeur (PRV - Pressure Reducing Valve) ?",opts:["Une soupape de sûreté qui s'ouvre en cas de surpression","Un dispositif qui réduit automatiquement la pression de vapeur d'une valeur haute à une valeur basse","Un purgeur de vapeur amélioré","Une vanne de sectionnement de sécurité"],correct:1,exp:"Le détendeur (PRV) réduit automatiquement la pression de vapeur de la pression chaudière (ex : 7-10 bar) à la pression requise par le consommateur (ex : 3 bar pour les réchauffeurs HFO, 1-2 bar pour le chauffage). Il maintient la pression aval constante quelle que soit la variation de débit, grâce à un ressort calibré ou un pilote pneumatique."},
    ],
    en:[
      {q:"What is the role of a steam trap?",opts:["Increase steam pressure","Evacuate condensate without passing live steam","Reduce steam temperature","Filter steam impurities"],correct:1,exp:"A steam trap automatically evacuates condensate (water formed by steam cooling) from the steam network WITHOUT passing live steam. If condensate is not evacuated, it accumulates → water hammer, consumer cooling. If steam passes → energy waste."},
      {q:"What is water hammer in a steam network?",opts:["An electrical surge","A hydraulic shock caused by condensate struck by high-velocity steam","A rapid pressure variation in the boiler","A steam valve blockage"],correct:1,exp:"Water hammer is violent hydraulic shock when condensate (liquid water) accumulated in a steam pipe is struck by steam moving at high velocity (20-30 m/s). Water being incompressible, the impact is violent → severe vibrations, pipe rupture risk."},
      {q:"Why are steam pipe drains opened before steam supply?",opts:["To increase pressure","To evacuate condensate and prevent water hammer","To cool the pipes","To check tightness"],correct:1,exp:"Drains are opened before steam supply to evacuate condensate (stagnant water in cold pipe). Without this precaution, incoming high-velocity steam strikes condensate → violent water hammer → pipe rupture risk, valve and gasket damage."},
      {q:"What type of steam is used in on-board steam turbines?",opts:["Dry saturated steam","Wet steam","Superheated steam","Flash steam"],correct:2,exp:"Superheated steam is used in steam turbines. Its temperature exceeds saturation temperature → more thermal energy available as enthalpy → more mechanical work produced in turbine. Saturated steam would be less efficient (blade moisture risk)."},
      {q:"What is a pressure reducing valve (PRV)?",opts:["A safety valve opening on overpressure","A device automatically reducing steam pressure from high to low value","An advanced steam trap","A safety isolation valve"],correct:1,exp:"A PRV automatically reduces steam pressure from boiler pressure (e.g. 7-10 bar) to pressure required by consumer (e.g. 3 bar for HFO heaters, 1-2 bar for heating). It maintains constant downstream pressure regardless of flow variation, using a calibrated spring or pneumatic pilot."},
    ],
    es:[
      {q:"¿Cuál es el papel de un purgador de vapor?",opts:["Aumentar la presión de vapor","Evacuar los condensados sin dejar pasar el vapor vivo","Reducir la temperatura del vapor","Filtrar las impurezas del vapor"],correct:1,exp:"El purgador evacúa automáticamente los condensados sin dejar pasar el vapor vivo. Sin evacuación: golpes de ariete, enfriamiento de los consumidores. Con fallo abierto: pérdida de energía."},
      {q:"¿Qué es un golpe de ariete en una red de vapor?",opts:["Una sobretensión eléctrica","Un choque hidráulico causado por condensados golpeados por vapor a gran velocidad","Una variación rápida de presión en la caldera","Un bloqueo de una válvula de vapor"],correct:1,exp:"Choque hidráulico violento cuando condensados acumulados son golpeados por vapor a gran velocidad (20-30 m/s). El agua al ser incompresible: vibraciones violentas, riesgo de rotura de tubería."},
      {q:"¿Por qué se abren los drenes antes de alimentar una tubería con vapor?",opts:["Para aumentar la presión","Para evacuar los condensados y evitar golpes de ariete","Para enfriar las tuberías","Para verificar la estanqueidad"],correct:1,exp:"Para evacuar el agua estancada en la tubería fría. Sin esta precaución, el vapor golpearía los condensados → golpe de ariete violento → rotura de tubería, daños en válvulas y juntas."},
      {q:"¿Qué tipo de vapor se usa en las turbinas de vapor a bordo?",opts:["Vapor saturado seco","Vapor húmedo","Vapor sobrecalentado","Vapor de expansión"],correct:2,exp:"El vapor sobrecalentado, con temperatura superior a la de saturación → más entalpía → más trabajo mecánico. El vapor saturado sería menos eficaz (riesgo de humedad en los álabes)."},
      {q:"¿Qué es un reductor de presión de vapor (PRV)?",opts:["Una válvula de seguridad que se abre en caso de sobrepresión","Un dispositivo que reduce automáticamente la presión de vapor de alta a baja","Un purgador avanzado","Una válvula de seccionamiento de seguridad"],correct:1,exp:"El PRV reduce automáticamente la presión de vapor de la presión de caldera (7-10 bar) a la requerida por el consumidor. Mantiene la presión aguas abajo constante gracias a un muelle calibrado o piloto neumático."},
    ],
    pt:[
      {q:"Qual é o papel de um purgador de vapor?",opts:["Aumentar a pressão de vapor","Evacuar condensados sem deixar passar vapor vivo","Reduzir a temperatura do vapor","Filtrar impurezas do vapor"],correct:1,exp:"O purgador evacua automaticamente os condensados sem deixar passar vapor vivo. Sem evacuação: golpes de aríete, arrefecimento dos consumidores. Com avaria aberta: perda de energia."},
      {q:"O que é um golpe de aríete numa rede de vapor?",opts:["Uma sobretensão elétrica","Um choque hidráulico causado por condensados golpeados por vapor a grande velocidade","Uma variação rápida de pressão na caldeira","Um bloqueio de válvula de vapor"],correct:1,exp:"Choque hidráulico violento quando condensados acumulados são golpeados por vapor a grande velocidade (20-30 m/s). A água sendo incompressível: vibrações violentas, risco de rotura de tubagem."},
      {q:"Por que se abrem os drenos antes de alimentar uma tubagem com vapor?",opts:["Para aumentar a pressão","Para evacuar condensados e evitar golpes de aríete","Para arrefecer as tubagens","Para verificar a estanqueidade"],correct:1,exp:"Para evacuar a água estagnada na tubagem fria. Sem esta precaução, o vapor golpearia os condensados → golpe de aríete violento → rotura de tubagem, danos em válvulas e juntas."},
      {q:"Que tipo de vapor é usado nas turbinas de vapor a bordo?",opts:["Vapor saturado seco","Vapor húmido","Vapor sobreaquecido","Vapor de expansão"],correct:2,exp:"Vapor sobreaquecido, com temperatura superior à de saturação → mais entalpia → mais trabalho mecânico. Vapor saturado seria menos eficaz (risco de humidade nas pás)."},
      {q:"O que é um redutor de pressão de vapor (PRV)?",opts:["Uma válvula de segurança que abre em sobrepressão","Um dispositivo que reduz automaticamente a pressão de vapor de alta para baixa","Um purgador avançado","Uma válvula de seccionamento de segurança"],correct:1,exp:"O PRV reduz automaticamente a pressão de vapor da pressão de caldeira (7-10 bar) à requerida pelo consumidor. Mantém a pressão a jusante constante graças a uma mola calibrada ou piloto pneumático."},
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
          <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New",marginBottom:12,padding:12,borderRadius:10,background:"rgba(10,22,40,0.8)",border:`1px solid #4da6ff22`}}>{bank[bankCur].q}</div>
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
        <div style={{fontSize:42,marginBottom:8}}>💨</div>
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
      <button onClick={()=>onComplete(xp)} style={{width:"100%",padding:"15px 0",border:"none",borderRadius:14,background:"linear-gradient(135deg,#4da6ff,#c9922a)",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:"#060e1a",cursor:"pointer"}}>💨 {l.finish}</button>
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

export default function LessonE3_L4({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t=T[lang]||T.fr;
  const [phase,setPhase]=useState<"content"|"quiz">("content");
  const [quizDone,setQuizDone]=useState(false);
  const progress=phase==="content"?50:quizDone?100:85;
  const backLabel=lang==="fr"?"◀ Retour":lang==="en"?"◀ Back":lang==="es"?"◀ Volver":"◀ Voltar";
  const moduleFull=lang==="fr"?"Module E3 — Chaudières":lang==="en"?"Module E3 — Boilers":lang==="es"?"Módulo E3 — Calderas":"Módulo E3 — Caldeiras";
  const lessonOf=lang==="fr"?"Leçon 4/6":lang==="en"?"Lesson 4/6":lang==="es"?"Lección 4/6":"Lição 4/6";
  const badgeText=lang==="fr"?`💨 ${moduleFull} · Leçon 4/6 · ⭐ Premium · 200 XP`:lang==="en"?`💨 ${moduleFull} · Lesson 4/6 · ⭐ Premium · 200 XP`:lang==="es"?`💨 ${moduleFull} · Lección 4/6 · ⭐ Premium · 200 XP`:`💨 ${moduleFull} · Lição 4/6 · ⭐ Premium · 200 XP`;
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(77,166,255,0.22)"}}>
        <div style={{minHeight:54,display:"flex",alignItems:"center",padding:"8px 16px",gap:12}}>
          <button onClick={phase==="content"?onBack:()=>setPhase("content")} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>{backLabel}</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:10,color:"#4da6ff",letterSpacing:1,fontFamily:"'Cinzel',serif"}}>💨 {moduleFull}</div>
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
