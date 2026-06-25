// LessonE3_L4 — Systèmes vapeur & Distribution | PART 1
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
    moduleLabel:"MACHINE — CHAUDIÈRES",
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
      "La vapeur saturée sèche est idéale pour le chauffage — pas de surchauffe nécessaire",
      "Le purgeur (steam trap) évacue les condensats sans laisser passer la vapeur",
      "Les condensats récupérés représentent 80-90% de la qualité de l'eau de chaudière",
      "Un purgeur défaillant ouvert = perte de vapeur vive = gaspillage énergétique",
      "Les coups de bélier (water hammer) surviennent quand de l'eau se forme dans les conduites vapeur",
    ],
    steamTypes:{
      saturated:{ name:"Vapeur saturée sèche", desc:"Vapeur à l'équilibre avec l'eau liquide à une pression donnée. Température déterminée par la pression (ex : 7 bar → 165°C). Titre vapeur = 1,0 (100% vapeur). Utilisée pour le chauffage : HFO, eau sanitaire, locaux. Énergie latente très élevée → idéale pour les échangeurs.", use:"Chauffage HFO, eau sanitaire, chauffage locaux" },
      wet:{ name:"Vapeur humide (wet steam)", desc:"Mélange de vapeur et de gouttelettes d'eau. Titre vapeur < 1,0. Causée par : mauvaise séparation dans le ballon, condensation dans les conduites, coup de bélier possible. À éviter dans les conduites de distribution. Sécheurs de vapeur nécessaires si problème récurrent.", use:"À éviter — condensats dangereux" },
      superheated:{ name:"Vapeur surchauffée", desc:"Vapeur chauffée au-delà de sa température de saturation (T > T_sat). Contient plus d'énergie thermique. Utilisée dans les turbines à vapeur (propulsion, générateurs). Moins bonne pour le chauffage direct (moins d'énergie latente). Surchauffeur (superheater) nécessaire.", use:"Turbines à vapeur, propulsion" },
      flash:{ name:"Vapeur de détente (Flash steam)", desc:"Vapeur formée quand un condensat chaud passe d'une haute à une basse pression. Phénomène naturel de détente. Peut être récupérée pour le chauffage à basse pression. Si non récupérée → perte énergétique. Flash vessel pour séparer condensat et vapeur de détente.", use:"Récupération énergie, circuits BP" },
    },
    components:{
      mainvalve:{ name:"Vanne principale vapeur", desc:"Vanne de sectionnement sur la sortie de la chaudière. Normalement fully open (ouverture complète pour limiter les pertes de charge). Fermeture d'urgence si rupture de tuyauterie. Équipée d'un by-pass pour réchauffage progressif avant ouverture complète." },
      reductor:{ name:"Détendeur (Pressure reducing valve)", desc:"Réduit la pression de vapeur de la pression chaudière (7-10 bar) à la pression requise par le consommateur (ex : 3 bar pour chauffage HFO, 1-2 bar pour eau sanitaire). Maintient la pression aval constante malgré les variations de débit. Réglable par ressort ou pilote." },
      separator:{ name:"Séparateur vapeur/condensat", desc:"Élimine les gouttelettes d'eau (condensats) de la vapeur avant distribution. Utilise la force centrifuge, les chicanes ou la décantation. Obligatoire en amont des turbines et surchauffeurs. Équipé d'un purgeur pour évacuer les condensats collectés." },
      safetyvalve:{ name:"Soupape de sûreté réseau", desc:"Protège les tuyauteries vapeur contre les surpressions. Réglée à 10% au-dessus de la pression de service locale. Différente de la soupape de la chaudière. Placée en aval du détendeur pour protéger le circuit basse pression." },
      hfo_heater:{ name:"Réchauffeur HFO (vapeur/HFO)", desc:"Échangeur tubulaire ou à plaques chauffant le HFO avec de la vapeur. Alimente en vapeur depuis le collecteur principal. Condensat récupéré au purgeur. Température HFO : 120-150°C. Vanne de régulation vapeur commandée par thermomètre ou viscosimètre." },
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
        a:"Un détendeur (PRV — Pressure Reducing Valve) réduit automatiquement la pression de la vapeur d'une pression amont haute (7-10 bar chaudière) à une pression aval basse adaptée au consommateur (ex : 3 bar pour réchauffeurs HFO, 1-2 bar pour chauffage de locaux). Fonctionnement : un ressort calibré maintient une vanne partiellement ouverte. Si la pression aval monte (demande réduite) → la vanne se ferme. Si la pression aval baisse (demande augmentée) → la vanne s'ouvre davantage. Maintient la pression aval constante indépendamment des variations de débit. Nécessaire car : différents consommateurs ont des besoins en pression différents, protège les équipements aval contre la surpression, permet d'alimenter des circuits BP depuis une chaudière HP." },
    ],
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
  },
  en:{
    moduleLabel:"ENGINE — BOILERS",
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
      "Dry saturated steam is ideal for heating — no superheating needed",
      "Steam trap evacuates condensate without passing steam",
      "Recovered condensate represents 80-90% of boiler water quality",
      "Failed open steam trap = live steam loss = energy waste",
      "Water hammer occurs when water forms in steam pipes",
    ],
    steamTypes:{
      saturated:{ name:"Dry saturated steam", desc:"Steam in equilibrium with liquid water at a given pressure. Temperature determined by pressure (e.g. 7 bar → 165°C). Steam quality = 1.0 (100% steam). Used for heating: HFO, domestic water, spaces. Very high latent energy → ideal for heat exchangers.", use:"HFO heating, domestic water, space heating" },
      wet:{ name:"Wet steam", desc:"Mixture of steam and water droplets. Steam quality < 1.0. Caused by: poor drum separation, condensation in pipes, water hammer possible. Avoid in distribution pipes. Steam dryers needed if recurring problem.", use:"Avoid — dangerous condensate" },
      superheated:{ name:"Superheated steam", desc:"Steam heated beyond saturation temperature (T > T_sat). Contains more thermal energy. Used in steam turbines (propulsion, generators). Less suitable for direct heating (less latent energy). Superheater required.", use:"Steam turbines, propulsion" },
      flash:{ name:"Flash steam", desc:"Steam formed when hot condensate passes from high to low pressure. Natural pressure relief phenomenon. Can be recovered for low-pressure heating. If not recovered → energy loss. Flash vessel to separate condensate and flash steam.", use:"Energy recovery, LP circuits" },
    },
    components:{
      mainvalve:{ name:"Main steam valve", desc:"Isolation valve on boiler steam outlet. Normally fully open (full opening to limit pressure drops). Emergency closure on pipe rupture. Fitted with bypass for progressive warm-up before full opening." },
      reductor:{ name:"Pressure reducing valve (PRV)", desc:"Reduces steam pressure from boiler pressure (7-10 bar) to pressure required by consumer (e.g. 3 bar for HFO heating, 1-2 bar for domestic water). Maintains constant downstream pressure despite flow variations. Adjustable by spring or pilot." },
      separator:{ name:"Steam/condensate separator", desc:"Removes water droplets (condensate) from steam before distribution. Uses centrifugal force, baffles or decanting. Mandatory upstream of turbines and superheaters. Fitted with steam trap for condensate removal." },
      safetyvalve:{ name:"Network safety valve", desc:"Protects steam piping against overpressure. Set at 10% above local service pressure. Different from boiler safety valve. Located downstream of PRV to protect low-pressure circuit." },
      hfo_heater:{ name:"HFO heater (steam/HFO)", desc:"Shell & tube or plate exchanger heating HFO with steam. Steam supplied from main header. Condensate recovered at steam trap. HFO temperature: 120-150°C. Steam control valve commanded by thermometer or viscometer." },
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
    moduleLabel:"MÁQUINAS — CALDERAS",
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
      "El vapor saturado seco es ideal para la calefacción — sin sobrecalentamiento necesario",
      "El purgador evacúa los condensados sin dejar pasar el vapor",
      "Los condensados recuperados representan el 80-90% de la calidad del agua de caldera",
      "Purgador abierto fallido = pérdida de vapor vivo = derroche de energía",
      "Los golpes de ariete ocurren cuando se forma agua en las tuberías de vapor",
    ],
    steamTypes:{
      saturated:{ name:"Vapor saturado seco", desc:"Vapor en equilibrio con el agua líquida a una presión dada. Temperatura determinada por la presión (ej: 7 bar → 165°C). Calidad = 1,0. Ideal para calefacción: HFO, agua sanitaria, locales.", use:"Calentamiento HFO, agua sanitaria, calefacción" },
      wet:{ name:"Vapor húmedo", desc:"Mezcla de vapor y gotitas de agua. Calidad < 1,0. Causado por: mala separación en el balón, condensación en tuberías. Evitar en las tuberías de distribución.", use:"Evitar — condensados peligrosos" },
      superheated:{ name:"Vapor sobrecalentado", desc:"Vapor calentado más allá de su temperatura de saturación. Más energía térmica. Usado en turbinas de vapor (propulsión, generadores). Menos adecuado para calefacción directa.", use:"Turbinas de vapor, propulsión" },
      flash:{ name:"Vapor de expansión (Flash steam)", desc:"Vapor formado cuando un condensado caliente pasa de alta a baja presión. Puede recuperarse para calefacción a baja presión. Flash vessel para separar condensado y vapor de expansión.", use:"Recuperación de energía, circuitos BP" },
    },
    components:{
      mainvalve:{ name:"Válvula principal de vapor", desc:"Válvula de seccionamiento en la salida de la caldera. Normalmente completamente abierta. Cierre de emergencia en rotura de tubería. Con bypass para calentamiento progresivo." },
      reductor:{ name:"Reductor de presión (PRV)", desc:"Reduce la presión de vapor de la presión de caldera (7-10 bar) a la requerida por el consumidor (ej: 3 bar para calentadores de HFO). Mantiene la presión aguas abajo constante." },
      separator:{ name:"Separador vapor/condensado", desc:"Elimina las gotitas de agua del vapor antes de la distribución. Obligatorio aguas arriba de las turbinas. Equipado con purgador." },
      safetyvalve:{ name:"Válvula de seguridad de red", desc:"Protege las tuberías de vapor contra sobrepresiones. Ajustada al 10% sobre la PMS local. Diferente de la válvula de la caldera." },
      hfo_heater:{ name:"Calentador HFO (vapor/HFO)", desc:"Intercambiador que calienta el HFO con vapor. Temperatura HFO: 120-150°C. Condensado recuperado en el purgador. Válvula de regulación de vapor controlada por termómetro o viscosímetro." },
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
    moduleLabel:"MÁQUINAS — CALDEIRAS",
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
      "Vapor saturado seco é ideal para aquecimento — sem sobreaquecimento necessário",
      "O purgador evacua condensados sem deixar passar vapor",
      "Os condensados recuperados representam 80-90% da qualidade da água de caldeira",
      "Purgador aberto avariado = perda de vapor vivo = desperdício de energia",
      "Os golpes de aríete ocorrem quando se forma água nas tubagens de vapor",
    ],
    steamTypes:{
      saturated:{ name:"Vapor saturado seco", desc:"Vapor em equilíbrio com a água líquida a uma dada pressão. Temperatura determinada pela pressão (ex: 7 bar → 165°C). Qualidade = 1,0. Ideal para aquecimento: HFO, água sanitária, espaços.", use:"Aquecimento HFO, água sanitária, aquecimento espaços" },
      wet:{ name:"Vapor húmido", desc:"Mistura de vapor e gotículas de água. Qualidade < 1,0. Causado por: má separação no balão, condensação nas tubagens. Evitar nas tubagens de distribuição.", use:"Evitar — condensados perigosos" },
      superheated:{ name:"Vapor sobreaquecido", desc:"Vapor aquecido além da temperatura de saturação. Mais energia térmica. Usado em turbinas de vapor (propulsão, geradores). Menos adequado para aquecimento direto.", use:"Turbinas de vapor, propulsão" },
      flash:{ name:"Vapor de expansão (Flash steam)", desc:"Vapor formado quando condensado quente passa de alta para baixa pressão. Pode ser recuperado para aquecimento a baixa pressão. Flash vessel para separar condensado e vapor de expansão.", use:"Recuperação de energia, circuitos BP" },
    },
    components:{
      mainvalve:{ name:"Válvula principal de vapor", desc:"Válvula de seccionamento na saída da caldeira. Normalmente completamente aberta. Fecho de emergência em rotura de tubagem. Com by-pass para aquecimento progressivo." },
      reductor:{ name:"Redutor de pressão (PRV)", desc:"Reduz a pressão de vapor da pressão de caldeira (7-10 bar) à requerida pelo consumidor (ex: 3 bar para aquecedores HFO). Mantém pressão a jusante constante." },
      separator:{ name:"Separador vapor/condensado", desc:"Remove gotículas de água do vapor antes da distribuição. Obrigatório a montante de turbinas. Equipado com purgador." },
      safetyvalve:{ name:"Válvula de segurança de rede", desc:"Protege as tubagens de vapor contra sobrepressões. Regulada a 10% acima da PMS local. Diferente da válvula da caldeira." },
      hfo_heater:{ name:"Aquecedor HFO (vapor/HFO)", desc:"Permutador que aquece o HFO com vapor. Temperatura HFO: 120-150°C. Condensado recuperado no purgador. Válvula de regulação de vapor controlada por termómetro ou viscosímetro." },
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

// ── SVG 1 — STEAM TYPES ──────────────────────────────────────
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

// ── SVG 2 — COMPONENTS ───────────────────────────────────────
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

// ── SVG 3 — STEAM TRAPS ──────────────────────────────────────
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

// ── SVG 4 — FAULTS ───────────────────────────────────────────
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

function ContentTab({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
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
        <div key={i} style={{marginBottom:14,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.steam}33`,overflow:"hidden"}}>
          <div style={{padding:"12px 14px"}}>
            <div style={{fontSize:10,color:C.steam,letterSpacing:1,marginBottom:6,fontFamily:"'Cinzel',serif"}}>Q{i+1}</div>
            <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>{q.q}</div>
          </div>
          <div style={{padding:"0 14px 12px"}}>
            <button onClick={()=>toggle(i)} style={{padding:"7px 14px",borderRadius:8,fontSize:11,cursor:"pointer",background:shown[i]?`${C.steam}22`:"rgba(255,255,255,0.06)",border:`1px solid ${shown[i]?C.steam:"rgba(255,255,255,0.15)"}`,color:shown[i]?C.steam:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{shown[i]?t.hideAnswer:t.showAnswer}</button>
            {shown[i]&&<div style={{marginTop:10,padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.steam}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{q.a}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
// LessonE3_L4 — PART 2: Bank + Quiz + Main

function getBank(lang: string) {
  const b: any = {
    fr:[
      {q:"Qu'est-ce que la vapeur saturée sèche et pourquoi est-elle préférée pour le chauffage à bord ?",a:"La vapeur saturée sèche est de la vapeur pure (titre = 1,0, 100% vapeur, aucune gouttelette d'eau) en équilibre thermodynamique avec l'eau liquide à une pression donnée. Avantages pour le chauffage : Énergie latente très élevée : lors de la condensation, elle libère une grande quantité de chaleur sans changement de température. Température connue et stable : déterminée uniquement par la pression (7 bar → 165°C). Régulation facile : ajuster la pression = ajuster la température. Comparaison avec la vapeur surchauffée : la vapeur surchauffée a moins d'énergie latente et une température variable → moins adaptée aux échangeurs de chauffage simples. La vapeur surchauffée est réservée aux turbines où l'énergie cinétique compte."},
      {q:"Quels sont les différents types de purgeurs de vapeur et comment choisir le bon ?",a:"Types et applications : Purgeur à flotteur : fonctionnement continu, fort débit de condensat, adapté aux réchauffeurs HFO et aux grands consommateurs. Purgeur à seau renversé : robuste, résistant aux coups de bélier, adapté aux conditions difficiles. Peut se désamorcer. Purgeur thermostatique : simple et économique, adapté aux températures modérées, retient légèrement les condensats (utile si sous-refroidissement souhaité). Purgeur thermodynamique (disque) : compact, robuste, peu sensible aux variations de pression, adapté aux conduites de vapeur et collecteurs. Claquement régulier = fonctionnement normal. Critères de choix : débit de condensat (kg/h), pression différentielle, risque de coup de bélier, espace disponible."},
      {q:"Comment détecter et diagnostiquer un purgeur de vapeur défaillant ?",a:"Méthodes de détection : Méthode acoustique (stéthoscope ou détecteur ultrasons) : purgeur ouvert → son continu de vapeur. Purgeur thermodyn. fonctionnel → claquement régulier. Purgeur bloqué ouvert → son de jet continu. Méthode thermique (thermomètre infrarouge) : mesurer la température en amont et en aval. Si amont = aval et très chaud → vapeur passe (purgeur ouvert). Si aval très froid → condensats bloqués (purgeur fermé). Méthode visuelle : observer le piège du côté aval (condensats dans un seau). Purgeur ouvert = vapeur visible et bruyante. Purgeur fermé = pas de condensats évacués. Méthode au toucher (basse pression seulement) : très chaud = vapeur passe, tiède = condensat."},
      {q:"Qu'est-ce que la vapeur de détente (flash steam) et comment peut-on l'exploiter ?",a:"La vapeur de détente (flash steam) se forme quand un condensat chaud sous haute pression est soudainement soumis à une pression plus basse. À haute pression, le condensat a une température supérieure à la température de saturation à basse pression. Lors de la détente, l'excès de chaleur sensible se transforme en chaleur latente → une fraction du condensat s'évapore instantanément. Exemple : condensat à 7 bar (165°C) → détente à 2 bar (120°C) : 10-15% du condensat se vaporise en flash steam. Exploitation : collecter le flash steam dans un flash vessel, utiliser ce flash steam pour alimenter un circuit basse pression (chauffage de locaux, eau sanitaire). Récupération de 10-20% d'énergie supplémentaire sans combustible."},
      {q:"Pourquoi est-il important de récupérer les condensats de vapeur ?",a:"Les condensats (eau formée par condensation de la vapeur dans les échangeurs) sont précieux à plusieurs titres : 1. Qualité de l'eau : les condensats sont très purs (eau distillée) → réduisent la consommation de produits chimiques de traitement. 2. Énergie : les condensats retournent à 80-100°C → économie d'énergie de préchauffage de l'eau d'alimentation. 3. Eau douce : économie d'eau douce à bord. 4. Réduction de la purge : moins de sels → moins de purge → moins de perte d'eau. Système de retour condensats : collecte dans un bac à condensats, mesure de la conductivité pour détecter contamination (ex. fuite d'huile), pompage vers le déaérateur ou directement à la chaudière si propres. Si conductivité anormale → jeter les condensats et identifier la fuite."},
      {q:"Quelles précautions prendre avant de mettre en service une tuyauterie vapeur froide ?",a:"Mise en service d'une tuyauterie froide (procédure de réchauffage) : 1. Ouvrir tous les drains (vannes de purge) pour évacuer l'eau stagnante et les condensats. 2. Ouvrir légèrement la vanne de vapeur principale (25%) pour introduire de la vapeur progressivement. 3. Attendre que les drains évacuent la vapeur (plus de condensats) = tuyauterie chaude. 4. Fermer progressivement les drains. 5. Ouvrir lentement la vanne principale à 100%. 6. Procéder LENTEMENT (au moins 5-10 minutes pour une grande tuyauterie). Risques si procédure non respectée : coup de bélier violent → dommages aux supports, vannes, joints. Contraintes thermiques → fissures dans les tuyaux et joints."},
      {q:"Comment fonctionne un détendeur de vapeur (réducteur de pression) et quels sont ses points d'entretien ?",a:"Fonctionnement : Un ressort calibré (ou un pilote pneumatique) maintient une vanne à papillon ou à membrane partiellement ouverte. Si la pression aval monte → la membrane repousse la tige → la vanne se ferme. Si la pression aval baisse → le ressort pousse la tige → la vanne s'ouvre. La pression de consigne est réglée en tournant le chapeau de réglage (compression du ressort). Points d'entretien : Filtres à vapeur en amont : nettoyer périodiquement (impuretés colmatent le siège). Siège et clapet : inspecter l'état (érosion par vapeur → remplacement). Membrane ou piston : vérification de l'étanchéité. Vanne pilote (si pilotée) : nettoyage de l'orifice pilote. Calibrage : vérifier la pression aval au manomètre et recalibrer si nécessaire."},
      {q:"Qu'est-ce que le 'waterhammer' (coup de bélier) dans un réseau vapeur et pourquoi est-il si dangereux ?",a:"Le coup de bélier est le phénomène de choc hydraulique qui se produit quand de l'eau liquide (condensats) accumulée dans une tuyauterie vapeur est frappée violemment par la vapeur à grande vitesse. Mécanisme : la vapeur se déplace à 20-30 m/s. Les condensats dans un point bas forment un bouchon d'eau. La vapeur frappe ce bouchon → onde de pression intense. Dangerosité : pression d'impact peut atteindre 10-20x la pression de service → rupture de tuyauteries, dommages aux vannes, brides et instruments, projections de vapeur brûlante, dommages structurels aux supports. Fréquence du risque : démarrage de chaudière ou remise en service après arrêt, ouverture rapide d'une vanne principale, purgeurs défaillants laissant les condensats s'accumuler."},
      {q:"Comment calculer la quantité de vapeur consommée par un réchauffeur de HFO ?",a:"Calcul de la consommation vapeur d'un réchauffeur HFO : Q = m_HFO × Cp_HFO × (T_final - T_initial). m_HFO = débit massique HFO (kg/h). Cp_HFO ≈ 2,0 kJ/kg·K (chaleur spécifique HFO). T_final = 130°C (température voulue). T_initial = 50°C (température stockage). Exemple : 5 t/h de HFO à chauffer de 50 à 130°C. Q = 5000 × 2,0 × (130-50) = 800 000 kJ/h. Chaleur latente vapeur à 7 bar : L ≈ 2050 kJ/kg. Consommation vapeur : m_vapeur = Q / L = 800 000 / 2050 ≈ 390 kg/h. Résultat : environ 390 kg/h de vapeur pour ce réchauffeur. À ne pas oublier : ajouter 10-20% pour les pertes (conduites, purgeurs, régulation)."},
      {q:"Quelle est l'importance de l'isolation thermique des conduites vapeur ?",a:"L'isolation thermique des conduites vapeur est un enjeu majeur d'économie d'énergie. Pertes sans isolation : une conduite DN100 (4 pouces) sans isolation : à 165°C dans un local à 20°C → perte de 300-400 W/m soit 3-4 kg/h de vapeur. Sur 50 m de conduite → 150-200 kg/h perdus ! Avec isolation correcte (laine de verre + revêtement) : pertes réduites de 90-95% → 15-20 kg/h maximum. Économie annuelle : si HFO à 600€/t, vapeur = 0,08€/kg → 150 kg/h × 8000h/an × 0,08€ = 96 000€/an ! Types d'isolation : laine de roche (résistance aux hautes températures), laine de verre, mousse cellulaire (basse pression). L'isolation humide perd 50-80% de son efficacité → remplacer immédiatement."},
      {q:"Comment tester un purgeur thermodynamique (à disque) ?",a:"Test d'un purgeur thermodynamique (disc trap) : En fonctionnement normal : écouter le claquement caractéristique → un claquement régulier toutes les 5-30 secondes = fonctionnement correct. Purgeur ouvert (défaillant) : claquement très rapide et continu (le disque se soulève et retombe rapidement à cause de la vapeur qui passe en permanence). Purgeur bloqué (défaillant) : aucun claquement, le disque est coincé. Mesure thermique (thermomètre infrarouge) : amont : vapeur chaude (165°C à 7 bar). Aval : si purgeur fonctionne → légèrement moins chaud (condensats). Si purgeur ouvert → même température des 2 côtés. Méthode ultrasons : débit de vapeur produit un son caractéristique → purgeur ouvert = débit continu élevé."},
      {q:"Quels sont les usages de la vapeur à bord d'un navire à moteur diesel moderne ?",a:"Usages de la vapeur sur un navire diesel moderne : Usage principal (chaudière auxiliaire composite ECE + brûleur) : Réchauffage HFO : 120-150°C avant purificateur et injection (plus grand consommateur ≈ 300-500 kg/h). Eau sanitaire chaude : eau de douches et cuisines (≈ 20-50 kg/h). Réchauffage soutes HFO : maintien à 40-60°C pendant la traversée (≈ 50-100 kg/h). Chauffage des locaux en période froide (≈ 30-100 kg/h). Éjecteurs (pompes à vide vapeur) : sur certains navires pour les pompes de cale. Réchauffage d'eau de purification (eau de boisson). Usages moins communs : décarbage au vapeur (nettoyage HFO des équipements), réchauffage des ballasts en zone arctique. Bilan typique : 500-800 kg/h de vapeur sur un navire de taille moyenne."},
    ],
    en:[
      {q:"What is dry saturated steam and why is it preferred for on-board heating?",a:"Dry saturated steam is pure steam (quality = 1.0, 100% steam, no water droplets) in thermodynamic equilibrium with liquid water at a given pressure. Advantages for heating: Very high latent energy: on condensation, releases large heat quantity without temperature change. Known and stable temperature: determined only by pressure (7 bar → 165°C). Easy regulation: adjusting pressure = adjusting temperature. Comparison with superheated steam: less latent energy and variable temperature → less suitable for simple heating exchangers. Superheated steam is reserved for turbines where kinetic energy matters."},
      {q:"What are the different steam trap types and how to choose the right one?",a:"Types and applications: Float trap: continuous operation, high condensate flow, suitable for HFO heaters and large consumers. Inverted bucket trap: robust, water hammer resistant, suitable for harsh conditions. Can lose prime. Thermostatic trap: simple and economical, moderate temperatures, slightly holds back condensate (useful if subcooling desired). Thermodynamic (disc) trap: compact, robust, little sensitive to pressure variations, suitable for steam pipes and headers. Regular clicking = normal operation. Selection criteria: condensate flow (kg/h), differential pressure, water hammer risk, available space."},
      {q:"How to detect and diagnose a failed steam trap?",a:"Detection methods: Acoustic method (stethoscope or ultrasonic detector): open trap → continuous steam sound. Normal thermodynamic trap → regular clicking. Open-stuck trap → continuous jet sound. Thermal method (infrared thermometer): measure upstream and downstream temperature. If upstream = downstream and very hot → steam passing (open trap). If downstream very cold → blocked condensate (closed trap). Visual method: observe trap downstream side (condensate in bucket). Open trap = visible loud steam. Closed trap = no condensate. Touch method (low pressure only): very hot = steam passing, lukewarm = condensate."},
      {q:"What is flash steam and how can it be exploited?",a:"Flash steam forms when hot high-pressure condensate is suddenly subjected to lower pressure. At high pressure, condensate temperature exceeds saturation temperature at low pressure. On pressure relief, excess sensible heat converts to latent heat → a fraction of condensate instantly vaporises. Example: condensate at 7 bar (165°C) → relief to 2 bar (120°C): 10-15% of condensate vaporises as flash steam. Exploitation: collect flash steam in flash vessel, use for low-pressure circuit (space heating, domestic water). Recovers 10-20% additional energy without fuel."},
      {q:"Why is it important to recover steam condensate?",a:"Condensate (water formed by steam condensation in exchangers) is valuable for multiple reasons: 1. Water quality: condensate is very pure (distilled water) → reduces chemical treatment consumption. 2. Energy: condensate returns at 80-100°C → feed water preheating energy saving. 3. Fresh water: freshwater saving on board. 4. Blow-down reduction: fewer salts → less blow-down → less water loss. Condensate return system: collection in condensate tank, conductivity measurement to detect contamination (oil leak), pumping to de-aerator or directly to boiler if clean. If abnormal conductivity → discard condensate and identify leak."},
      {q:"What precautions before commissioning a cold steam pipe?",a:"Cold pipe commissioning (warm-up procedure): 1. Open all drains to evacuate stagnant water and condensate. 2. Slightly open main steam valve (25%) to progressively introduce steam. 3. Wait until drains evacuate steam (no more condensate) = pipe warm. 4. Progressively close drains. 5. Slowly open main valve to 100%. 6. Proceed SLOWLY (at least 5-10 minutes for large pipe). Risks if procedure not followed: violent water hammer → damage to supports, valves, gaskets. Thermal stress → cracks in pipes and joints."},
      {q:"How does a pressure reducing valve (PRV) work and what are its maintenance points?",a:"Operation: A calibrated spring (or pneumatic pilot) maintains a butterfly or membrane valve partially open. If downstream pressure rises → membrane pushes stem → valve closes. If downstream pressure falls → spring pushes stem → valve opens. Set pressure adjusted by turning adjustment cap (spring compression). Maintenance points: upstream steam filters: clean periodically (impurities clog seat). Seat and disc: inspect condition (steam erosion → replacement). Membrane or piston: seal check. Pilot valve (if piloted): pilot orifice cleaning. Calibration: check downstream pressure at gauge and recalibrate if needed."},
      {q:"What is water hammer in a steam network and why is it so dangerous?",a:"Water hammer is hydraulic shock when liquid water (condensate) accumulated in a steam pipe is violently struck by high-velocity steam. Mechanism: steam travels at 20-30 m/s. Condensate in a low point forms a water plug. Steam strikes this plug → intense pressure wave. Danger: impact pressure can reach 10-20× service pressure → pipe rupture, valve, flange and instrument damage, scalding steam projections, structural support damage. Risk frequency: boiler startup or return to service after shutdown, rapid main valve opening, failed traps allowing condensate accumulation."},
      {q:"How to calculate steam consumption of an HFO heater?",a:"HFO heater steam consumption: Q = m_HFO × Cp_HFO × (T_final - T_initial). m_HFO = HFO mass flow (kg/h). Cp_HFO ≈ 2.0 kJ/kg·K. T_final = 130°C. T_initial = 50°C (storage). Example: 5 t/h HFO to heat from 50 to 130°C. Q = 5000 × 2.0 × (130-50) = 800,000 kJ/h. Steam latent heat at 7 bar: L ≈ 2050 kJ/kg. Steam consumption: m_steam = Q/L = 800,000/2050 ≈ 390 kg/h. Result: approx 390 kg/h steam for this heater. Don't forget: add 10-20% for losses (pipes, traps, regulation)."},
      {q:"What is the importance of thermal insulation on steam pipes?",a:"Steam pipe thermal insulation is a major energy efficiency issue. Losses without insulation: DN100 pipe at 165°C in 20°C space → 300-400 W/m loss = 3-4 kg/h steam. Over 50m of pipe → 150-200 kg/h lost! With correct insulation (glass wool + cladding): losses reduced 90-95% → max 15-20 kg/h. Annual saving: if HFO at 600€/t, steam = 0.08€/kg → 150 kg/h × 8000h/y × 0.08€ = €96,000/year! Types: rock wool (high temperature resistance), glass wool, cellular foam (low pressure). Wet insulation loses 50-80% efficiency → replace immediately."},
      {q:"How to test a thermodynamic (disc) steam trap?",a:"Thermodynamic disc trap test: Normal operation: listen for characteristic clicking → regular click every 5-30 seconds = correct operation. Open trap (failed): very rapid continuous clicking (disc lifting and falling rapidly as steam constantly passes). Blocked trap (failed): no clicking, disc jammed. Thermal measurement (infrared thermometer): upstream: hot steam (165°C at 7 bar). Downstream: if trap working → slightly cooler (condensate). If trap open → same temperature both sides. Ultrasonic method: steam flow produces characteristic sound → open trap = continuously high flow."},
      {q:"What are the uses of steam on a modern diesel-engine vessel?",a:"Steam uses on modern diesel vessel: Main use (composite EGE + burner boiler): HFO preheating: 120-150°C before purifier and injection (largest consumer ≈ 300-500 kg/h). Domestic hot water: showers and galley (≈ 20-50 kg/h). HFO bunker heating: maintaining 40-60°C during voyage (≈ 50-100 kg/h). Space heating in cold weather (≈ 30-100 kg/h). Ejectors (steam jet pumps): some vessels for bilge pumps. Drinking water heating. Less common: steam decarbing (HFO equipment cleaning), ballast heating in arctic zones. Typical balance: 500-800 kg/h steam on medium-sized vessel."},
    ],
    es:[
      {q:"¿Qué es el vapor saturado seco y por qué se prefiere para la calefacción a bordo?",a:"Vapor puro (calidad = 1,0) en equilibrio con agua líquida a una presión dada. Ventajas: energía latente muy alta, temperatura conocida y estable (determinada por la presión), regulación fácil. Ideal para intercambiadores de calefacción. El vapor sobrecalentado es para turbinas."},
      {q:"¿Cuáles son los tipos de purgadores de vapor y cómo elegir el correcto?",a:"Flotador: continuo, gran caudal de condensado, adecuado para calentadores de HFO. Cubo invertido: robusto, resistente a golpes de ariete. Termostático: simple y económico, temperaturas moderadas. Termodinámico (disco): compacto, robusto, golpeteo regular = funcionamiento normal. Criterios: caudal de condensado, presión diferencial, riesgo de golpe de ariete."},
      {q:"¿Cómo detectar y diagnosticar un purgador de vapor defectuoso?",a:"Acústico: purgador abierto = sonido continuo de vapor. Termodinámico normal = golpeteo regular. Térmico (termómetro IR): aguas arriba = aguas abajo y muy caliente → vapor pasa. Aguas abajo muy frío → condensados bloqueados. Visual: vapor visible y ruidoso = abierto. Sin condensados = cerrado."},
      {q:"¿Qué es el vapor de expansión (flash steam) y cómo se puede aprovechar?",a:"Se forma cuando un condensado caliente pasa de alta a baja presión. Ejemplo: condensado a 7 bar (165°C) → expansión a 2 bar (120°C): 10-15% se vaporiza. Aprovechamiento: recoger en flash vessel, usar para circuito de baja presión (calefacción, agua sanitaria). Recuperación del 10-20% de energía adicional."},
      {q:"¿Por qué es importante recuperar los condensados de vapor?",a:"Son muy puros (agua destilada) → menos productos químicos. Vuelven a 80-100°C → ahorro de precalentamiento. Ahorro de agua dulce. Menos sales → menos purga. Sistema de retorno: medir conductividad para detectar contaminación. Si conductividad anormal → desechar y localizar la fuga."},
      {q:"¿Qué precauciones tomar antes de poner en servicio una tubería de vapor fría?",a:"1. Abrir todos los drenes. 2. Abrir la válvula principal al 25% para introducir vapor progresivamente. 3. Esperar a que los drenes evacúen vapor. 4. Cerrar drenes progresivamente. 5. Abrir la válvula principal al 100% lentamente (5-10 min). Sin precauciones: golpe de ariete → daños en soportes, válvulas y juntas."},
      {q:"¿Cómo funciona un reductor de presión de vapor y cuáles son sus puntos de mantenimiento?",a:"Un muelle calibrado mantiene una válvula parcialmente abierta. Si la presión aguas abajo sube → válvula se cierra. Si baja → se abre. Mantenimiento: limpiar filtros aguas arriba, inspeccionar asiento y disco, verificar membrana, limpiar orificio piloto, recalibrar según manómetro."},
      {q:"¿Qué es el golpe de ariete en una red de vapor y por qué es peligroso?",a:"Choque hidráulico cuando el agua líquida (condensados) acumulada en una tubería es golpeada violentamente por vapor a gran velocidad (20-30 m/s). La presión de impacto puede alcanzar 10-20 veces la de servicio → rotura de tuberías, proyecciones de vapor, daños estructurales."},
      {q:"¿Cómo calcular el consumo de vapor de un calentador de HFO?",a:"Q = m_HFO × Cp_HFO × (T_final - T_inicial). Cp_HFO ≈ 2,0 kJ/kg·K. Ejemplo: 5 t/h de HFO de 50 a 130°C: Q = 800 000 kJ/h. Calor latente a 7 bar: L ≈ 2050 kJ/kg. Vapor: 390 kg/h. Añadir 10-20% de pérdidas."},
      {q:"¿Cuál es la importancia del aislamiento térmico de las tuberías de vapor?",a:"Sin aislamiento: tubería DN100 a 165°C → 300-400 W/m = 3-4 kg/h de vapor perdido. Con aislamiento: pérdidas reducidas un 90-95%. Ahorro anual puede ser muy significativo. El aislamiento húmedo pierde el 50-80% de su eficacia → sustituir inmediatamente."},
      {q:"¿Cómo probar un purgador termodinámico (de disco)?",a:"Funcionamiento normal: golpeteo regular cada 5-30 s. Purgador abierto: golpeteo muy rápido y continuo. Purgador bloqueado: sin golpeteo. Medición térmica IR: aguas arriba = aguas abajo y muy caliente → abierto. Ultrasonidos: caudal elevado continuo = abierto."},
      {q:"¿Cuáles son los usos del vapor en un buque de motor diesel moderno?",a:"Calentamiento de HFO: 120-150°C (mayor consumidor, ≈300-500 kg/h). Agua sanitaria caliente (≈20-50 kg/h). Calentamiento de las bodegas de HFO (≈50-100 kg/h). Calefacción de locales (≈30-100 kg/h). Eyectores. Total típico: 500-800 kg/h."},
    ],
    pt:[
      {q:"O que é vapor saturado seco e por que é preferido para aquecimento a bordo?",a:"Vapor puro (qualidade = 1,0) em equilíbrio com água líquida a uma dada pressão. Vantagens: energia latente muito alta, temperatura conhecida e estável (determinada pela pressão), regulação fácil. Ideal para permutadores de aquecimento. O vapor sobreaquecido é para turbinas."},
      {q:"Quais são os tipos de purgadores de vapor e como escolher o correto?",a:"Flutuador: contínuo, grande caudal de condensado, adequado para aquecedores HFO. Balde invertido: robusto, resistente a golpes de aríete. Termostático: simples e económico, temperaturas moderadas. Termodinâmico (disco): compacto, robusto, clique regular = funcionamento normal. Critérios: caudal de condensado, pressão diferencial, risco de golpe de aríete."},
      {q:"Como detetar e diagnosticar um purgador de vapor avariado?",a:"Acústico: purgador aberto = som contínuo de vapor. Termodinâmico normal = clique regular. Térmico (termómetro IR): a montante = a jusante e muito quente → vapor a passar. A jusante muito frio → condensados bloqueados. Visual: vapor visível e barulhento = aberto. Sem condensados = fechado."},
      {q:"O que é vapor de expansão (flash steam) e como aproveitá-lo?",a:"Forma-se quando condensado quente passa de alta para baixa pressão. Exemplo: condensado a 7 bar (165°C) → expansão a 2 bar (120°C): 10-15% vaporiza. Aproveitamento: recolher em flash vessel, usar para circuito de baixa pressão. Recuperação de 10-20% de energia adicional."},
      {q:"Por que é importante recuperar os condensados de vapor?",a:"São muito puros (água destilada) → menos produtos químicos. Voltam a 80-100°C → poupança de pré-aquecimento. Poupança de água doce. Menos sais → menos purga. Sistema de retorno: medir condutividade para detetar contaminação. Se condutividade anormal → descartar e localizar a fuga."},
      {q:"Que precauções tomar antes de colocar em serviço uma tubagem de vapor fria?",a:"1. Abrir todos os drenos. 2. Abrir válvula principal a 25% para introduzir vapor progressivamente. 3. Aguardar até drenos evacuarem vapor. 4. Fechar drenos progressivamente. 5. Abrir válvula principal a 100% lentamente (5-10 min). Sem precauções: golpe de aríete → danos em suportes, válvulas e juntas."},
      {q:"Como funciona um redutor de pressão de vapor e quais são os seus pontos de manutenção?",a:"Uma mola calibrada mantém válvula parcialmente aberta. Se pressão a jusante sobe → válvula fecha. Se baixa → abre. Manutenção: limpar filtros a montante, inspecionar assento e disco, verificar membrana, limpar orifício piloto, recalibrar conforme manómetro."},
      {q:"O que é o golpe de aríete numa rede de vapor e por que é perigoso?",a:"Choque hidráulico quando água líquida (condensados) acumulada numa tubagem é violentamente golpeada por vapor a grande velocidade (20-30 m/s). A pressão de impacto pode atingir 10-20 vezes a de serviço → rotura de tubagens, projeções de vapor, danos estruturais."},
      {q:"Como calcular o consumo de vapor de um aquecedor de HFO?",a:"Q = m_HFO × Cp_HFO × (T_final - T_inicial). Cp_HFO ≈ 2,0 kJ/kg·K. Exemplo: 5 t/h HFO de 50 a 130°C: Q = 800 000 kJ/h. Calor latente a 7 bar: L ≈ 2050 kJ/kg. Vapor: 390 kg/h. Adicionar 10-20% de perdas."},
      {q:"Qual é a importância do isolamento térmico das tubagens de vapor?",a:"Sem isolamento: tubagem DN100 a 165°C → 300-400 W/m = 3-4 kg/h vapor perdido. Com isolamento: perdas reduzidas 90-95%. Poupança anual pode ser muito significativa. Isolamento húmido perde 50-80% da eficácia → substituir imediatamente."},
      {q:"Como testar um purgador termodinâmico (de disco)?",a:"Funcionamento normal: clique regular de 5-30 s. Purgador aberto: clique muito rápido e contínuo. Purgador bloqueado: sem clique. Medição térmica IR: a montante = a jusante e muito quente → aberto. Ultrassons: caudal elevado contínuo = aberto."},
      {q:"Quais são os usos do vapor num navio de motor diesel moderno?",a:"Aquecimento HFO: 120-150°C (maior consumidor, ≈300-500 kg/h). Água sanitária quente (≈20-50 kg/h). Aquecimento de tanques HFO (≈50-100 kg/h). Aquecimento de espaços (≈30-100 kg/h). Ejetores. Total típico: 500-800 kg/h."},
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
      {q:"Qu'est-ce qu'un détendeur de vapeur (PRV — Pressure Reducing Valve) ?",opts:["Une soupape de sûreté qui s'ouvre en cas de surpression","Un dispositif qui réduit automatiquement la pression de vapeur d'une valeur haute à une valeur basse","Un purgeur de vapeur amélioré","Une vanne de sectionnement de sécurité"],correct:1,exp:"Le détendeur (PRV) réduit automatiquement la pression de vapeur de la pression chaudière (ex : 7-10 bar) à la pression requise par le consommateur (ex : 3 bar pour les réchauffeurs HFO, 1-2 bar pour le chauffage). Il maintient la pression aval constante quelle que soit la variation de débit, grâce à un ressort calibré ou un pilote pneumatique."},
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
        <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:8,background:"rgba(77,166,255,0.1)",border:"1px solid rgba(77,166,255,0.3)"}}>
          <span style={{fontSize:12}}>💨</span>
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
