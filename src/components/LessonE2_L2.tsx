// LessonE2_L2 — Tableaux électriques & Distribution | PART 1
import { useState } from "react";

const C = {
  elec:"#4da6ff", panel:"#e8b94f", cable:"#6dbf8a",
  danger:"#f97316", phase:"#c084fc", neutral:"#94a3b8",
  gold:"#c9922a", gold2:"#e8b94f",
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  safe:"#6dbf8a", red:"#e74c3c", teal:"#0a8a6c",
};

const T: any = {
  fr:{
    moduleLabel:"MACHINE — AUXILIAIRES",
    lessonTitle:"Tableaux électriques & Distribution",
    intro:"Le tableau électrique principal (MSB) est le cœur du réseau électrique d'un navire. Il reçoit l'énergie des groupes électrogènes et la distribue à tous les consommateurs. Comprendre son architecture et ses protections est essentiel pour tout mécanicien.",
    tabs:["📖 Contenu","✏️ Pratique","📚 Banque Q.","🎯 Quiz"],
    s1title:"🔌 Architecture du tableau principal (MSB)",
    s1hint:"👆 Tapez une section pour voir sa description",
    s2title:"📐 Hiérarchie de distribution",
    s2hint:"👆 Tapez un niveau pour les détails",
    s3title:"🔋 Types de câbles & Section",
    s3hint:"👆 Tapez un type de câble",
    s4title:"⚡ Sélectivité des protections",
    s4hint:"👆 Tapez un niveau pour voir la coordination",
    keypoints:"Points clés",
    kp:[
      "Le MSB (Main Switchboard) reçoit tous les groupes et distribue vers les tableaux secondaires",
      "La sélectivité garantit que seul le disjoncteur le plus proche du défaut se déclenche",
      "Les câbles sont classifiés par section (mm²) selon l'intensité à transporter",
      "Le tableau de secours (Emergency Switchboard) est alimenté par le groupe de secours",
      "Les MICC (câbles minéraux) résistent au feu — obligatoires pour circuits vitaux SOLAS",
    ],
    sections:{
      incoming:{ name:"Arrivées groupes (Incoming)", desc:"Section recevant les arrivées de chaque groupe électrogène via son disjoncteur ACB. Chaque groupe se connecte aux jeux de barres via son propre ACB équipé de protections surintensité, court-circuit et puissance inverse." },
      busbar:{ name:"Jeux de barres (Busbars)", desc:"Conducteurs de cuivre massif L1/L2/L3 alimentant toutes les départs. Divisés en sections isolables par des coupleurs (bus-tie). Sur grands navires : deux demi-jeux de barres pour la sécurité." },
      feeder:{ name:"Départs (Feeders)", desc:"Circuits de distribution vers les tableaux secondaires et consommateurs importants. Chaque départ est protégé par un disjoncteur MCCB (Moulded Case Circuit Breaker) calibré selon la charge." },
      metering:{ name:"Instrumentation & Mesures", desc:"Voltmètres, ampèremètres, wattmètres, fréquencemètres, cosφmètres. Permettent de surveiller en permanence l'état du réseau et d'équilibrer les charges entre groupes." },
      synchro:{ name:"Panneau de synchronisation", desc:"Synchroscope, lampes de synchronisation, sélecteur de groupe. Permet de coupler les groupes en parallèle en vérifiant tension, fréquence et concordance de phase." },
      emergency:{ name:"Tableau de secours (ESB)", desc:"Emergency Switchboard — alimenté automatiquement par le groupe de secours en cas de panne du MSB. Alimente les circuits vitaux SOLAS : navigation, communication, pompes incendie, éclairage de secours." },
    },
    distribution:{
      msb:{ name:"MSB — Tableau Principal", desc:"Main Switchboard — niveau 1. Reçoit les groupes, distribue vers les tableaux de zone et consommateurs importants (propulsion, gros moteurs). Tension : 440V triphasé.", voltage:"440V 3φ" },
      ssb:{ name:"SSB — Tableau Secondaire", desc:"Secondary Switchboard — niveau 2. Reçoit du MSB et distribue vers les panneaux de zone ou appareils. Peut réduire la tension (transformateur 440V→220V).", voltage:"440V / 220V" },
      lp:{ name:"Panneau de distribution (LP)", desc:"Local Panel — niveau 3. Distribution finale vers les consommateurs individuels : moteurs, éclairage, chauffage. Protégé par fusibles ou petits disjoncteurs MCB.", voltage:"220V / 24V" },
      esb:{ name:"ESB — Tableau de Secours", desc:"Emergency Switchboard — réseau parallèle alimenté par le groupe de secours. Circuits vitaux uniquement : navigation, comm, pompe incendie.", voltage:"440V 3φ" },
    },
    cables:{
      xlpe:{ name:"XLPE — Polyéthylène réticulé", desc:"Câble standard à bord. Isolation en polyéthylène réticulé résistant à 90°C. Flexible, résistant à l'humidité. Utilisé pour la majorité des circuits de puissance et contrôle." },
      micc:{ name:"MICC — Câble minéral", desc:"Mineral Insulated Copper Conductor — isolation en poudre de magnésium. Résiste au feu (> 1000°C). Obligatoire SOLAS pour circuits vitaux : alarmes incendie, éclairage de secours, pompes incendie." },
      lsf:{ name:"LSF — Faible émission de fumée", desc:"Low Smoke & Fume — gaine sans halogène. En cas d'incendie, produit peu de fumée et de gaz toxiques. Recommandé dans les espaces habités et voies d'évacuation." },
      armored:{ name:"Câble armé (SWA)", desc:"Steel Wire Armoured — protection mécanique en fils d'acier. Utilisé dans les zones exposées aux chocs et contraintes mécaniques (cales, ponts extérieurs, passages de cloisons)." },
    },
    selectivity:{
      main:{ name:"Disjoncteur principal (ACB)", desc:"Dernier recours — ne se déclenche que si les protections inférieures ont failli. Calibre élevé (In = 100% courant groupe). Délai intentionnel pour permettre aux disjoncteurs aval de déclencher d'abord." },
      feeder:{ name:"Disjoncteur de départ (MCCB)", desc:"Protège le circuit de distribution. Se déclenche en cas de défaut sur le câble ou tableau alimenté. Calibre inférieur au disjoncteur principal." },
      final:{ name:"Disjoncteur final (MCB)", desc:"Protège le circuit terminal et l'appareil. Calibre le plus faible — déclenche le premier en cas de défaut. Sélectivité garantie si In(MCB) < In(MCCB) < In(ACB)." },
      fuse:{ name:"Fusible de protection", desc:"Protection à action unique (fond et doit être remplacé). Plus rapide qu'un disjoncteur pour les forts courts-circuits. Utilisé en protection de transformateurs et circuits sensibles." },
    },
    practiceTitle:"Exercice pratique",
    questions:[
      { q:"Expliquez le principe de sélectivité des protections électriques et pourquoi il est critique à bord d'un navire.",
        a:"La sélectivité (ou discrimination) est le principe qui garantit qu'en cas de défaut électrique, seul le disjoncteur le plus proche du défaut se déclenche, laissant le reste du réseau alimenté. À bord, c'est critique car une coupure totale du réseau peut mettre en danger la sécurité (perte propulsion, navigation, pompes incendie). Pour assurer la sélectivité : les disjoncteurs sont calibrés en cascade (In MCB < In MCCB < In ACB) et les disjoncteurs principaux ont un délai intentionnel de déclenchement pour laisser les protections aval agir d'abord." },
      { q:"Pourquoi les câbles MICC sont-ils obligatoires pour certains circuits à bord ? Donnez des exemples de circuits concernés.",
        a:"Les câbles MICC (Mineral Insulated Copper Conductor) sont obligatoires selon SOLAS pour les circuits qui doivent continuer à fonctionner en cas d'incendie à bord, car leur isolation en poudre de magnésium résiste à des températures supérieures à 1000°C. Circuits concernés : systèmes d'alarme incendie et détection, éclairage de secours et de sécurité, pompes incendie et sprinklers, systèmes de communication d'urgence, tableaux de secours (ESB). Sur ces circuits, l'intégrité du câble en cas d'incendie est vitale pour la survie du navire et de l'équipage." },
      { q:"Comment calculer la section de câble nécessaire pour alimenter un moteur de 15 kW / 440V triphasé avec un facteur de puissance de 0,85 ?",
        a:"1. Calculer le courant : I = P / (√3 × U × cos φ) = 15000 / (1,732 × 440 × 0,85) = 15000 / 648 = 23,1 A. 2. Appliquer un coefficient de sécurité (généralement ×1,25 pour moteurs) : 23,1 × 1,25 = 28,9 A. 3. Choisir la section dans les tables : pour 29 A en pose libre, une section de 6 mm² XLPE convient (capacité ~36A). Vérifier la chute de tension sur la longueur du câble (max 3-5% pour circuits de puissance). Choisir une section supérieure si la chute de tension est trop élevée." },
    ],
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
  },
  en:{
    moduleLabel:"ENGINE — AUXILIARIES",
    lessonTitle:"Switchboards & Electrical Distribution",
    intro:"The Main Switchboard (MSB) is the heart of a vessel's electrical network. It receives power from generating sets and distributes it to all consumers. Understanding its architecture and protections is essential for any engineer.",
    tabs:["📖 Content","✏️ Practice","📚 Question Bank","🎯 Quiz"],
    s1title:"🔌 Main Switchboard (MSB) Architecture",
    s1hint:"👆 Tap a section to see its description",
    s2title:"📐 Distribution Hierarchy",
    s2hint:"👆 Tap a level for details",
    s3title:"🔋 Cable Types & Cross-Section",
    s3hint:"👆 Tap a cable type",
    s4title:"⚡ Protection Selectivity",
    s4hint:"👆 Tap a level to see coordination",
    keypoints:"Key Points",
    kp:[
      "The MSB (Main Switchboard) receives all generators and distributes to secondary switchboards",
      "Selectivity ensures only the breaker closest to the fault trips",
      "Cables are rated by cross-section (mm²) according to current to be carried",
      "The Emergency Switchboard (ESB) is fed by the emergency generator",
      "MICC cables are fire-resistant — mandatory for SOLAS vital circuits",
    ],
    sections:{
      incoming:{ name:"Generator Incomers", desc:"Section receiving each generator's incoming supply via its ACB circuit breaker. Each generator connects to the busbars via its own ACB equipped with overcurrent, short-circuit and reverse power protections." },
      busbar:{ name:"Busbars", desc:"Solid copper L1/L2/L3 conductors feeding all outgoing feeders. Divided into isolatable sections by bus-tie breakers. Large vessels: two half-busbars for safety." },
      feeder:{ name:"Feeders", desc:"Distribution circuits to secondary switchboards and important consumers. Each feeder protected by an MCCB (Moulded Case Circuit Breaker) rated according to load." },
      metering:{ name:"Instrumentation & Metering", desc:"Voltmeters, ammeters, wattmeters, frequency meters, power factor meters. Allow continuous monitoring of network status and load balancing between generators." },
      synchro:{ name:"Synchronising Panel", desc:"Synchroscope, synchronising lamps, generator selector. Allows parallel coupling of generators by checking voltage, frequency and phase concordance." },
      emergency:{ name:"Emergency Switchboard (ESB)", desc:"Automatically fed by emergency generator on MSB failure. Supplies SOLAS vital circuits: navigation, communication, fire pumps, emergency lighting." },
    },
    distribution:{
      msb:{ name:"MSB — Main Switchboard", desc:"Level 1. Receives generators, distributes to zone switchboards and major consumers (propulsion, large motors). Voltage: 440V three-phase.", voltage:"440V 3φ" },
      ssb:{ name:"SSB — Secondary Switchboard", desc:"Level 2. Receives from MSB and distributes to zone panels or equipment. May step down voltage (transformer 440V→220V).", voltage:"440V / 220V" },
      lp:{ name:"Distribution Panel (LP)", desc:"Local Panel — Level 3. Final distribution to individual consumers: motors, lighting, heating. Protected by fuses or small MCB breakers.", voltage:"220V / 24V" },
      esb:{ name:"ESB — Emergency Switchboard", desc:"Parallel network fed by emergency generator. Vital circuits only: navigation, comms, fire pump.", voltage:"440V 3φ" },
    },
    cables:{
      xlpe:{ name:"XLPE — Cross-Linked Polyethylene", desc:"Standard on-board cable. Cross-linked polyethylene insulation rated to 90°C. Flexible, moisture-resistant. Used for the majority of power and control circuits." },
      micc:{ name:"MICC — Mineral Insulated Cable", desc:"Mineral Insulated Copper Conductor — magnesium powder insulation. Fire-resistant (>1000°C). SOLAS mandatory for vital circuits: fire alarms, emergency lighting, fire pumps." },
      lsf:{ name:"LSF — Low Smoke & Fume", desc:"Halogen-free sheath. In case of fire, produces little smoke and toxic gas. Recommended in occupied spaces and evacuation routes." },
      armored:{ name:"Armoured Cable (SWA)", desc:"Steel Wire Armoured — mechanical protection with steel wires. Used in areas exposed to shock and mechanical stress (holds, open decks, bulkhead penetrations)." },
    },
    selectivity:{
      main:{ name:"Main Circuit Breaker (ACB)", desc:"Last resort — only trips if downstream protections have failed. High rating (In = 100% generator current). Intentional delay to allow downstream breakers to trip first." },
      feeder:{ name:"Feeder Circuit Breaker (MCCB)", desc:"Protects the distribution circuit. Trips on fault on the cable or fed switchboard. Rating below main breaker." },
      final:{ name:"Final Circuit Breaker (MCB)", desc:"Protects the terminal circuit and equipment. Lowest rating — trips first on fault. Selectivity ensured if In(MCB) < In(MCCB) < In(ACB)." },
      fuse:{ name:"Fuse Protection", desc:"Single-action protection (melts and must be replaced). Faster than a breaker for heavy short circuits. Used for transformer and sensitive circuit protection." },
    },
    practiceTitle:"Practice Exercise",
    questions:[
      { q:"Explain the principle of protection selectivity and why it is critical on board a vessel.",
        a:"Selectivity (or discrimination) ensures that on an electrical fault, only the circuit breaker closest to the fault trips, leaving the rest of the network energised. On board this is critical as total power loss can endanger safety (loss of propulsion, navigation, fire pumps). To ensure selectivity: breakers are cascade-rated (In MCB < In MCCB < In ACB) and main breakers have intentional tripping delays to allow downstream protections to act first." },
      { q:"Why are MICC cables mandatory for certain circuits on board? Give examples of circuits concerned.",
        a:"MICC cables are mandatory per SOLAS for circuits that must continue to function during a fire, as their magnesium powder insulation withstands temperatures above 1000°C. Concerned circuits: fire alarm and detection systems, emergency and safety lighting, fire pumps and sprinklers, emergency communication systems, emergency switchboards. Cable integrity during a fire is vital for vessel and crew survival." },
      { q:"How do you calculate the cable cross-section needed to supply a 15 kW / 440V three-phase motor with a power factor of 0.85?",
        a:"1. Calculate current: I = P / (√3 × U × cos φ) = 15000 / (1.732 × 440 × 0.85) = 15000 / 648 = 23.1 A. 2. Apply safety factor (×1.25 for motors): 23.1 × 1.25 = 28.9 A. 3. Select cross-section from tables: for 29 A in free air, 6 mm² XLPE is suitable (capacity ~36A). Check voltage drop over cable length (max 3-5% for power circuits). Select larger cross-section if voltage drop is excessive." },
    ],
    showAnswer:"Show answer", hideAnswer:"Hide",
  },
  es:{
    moduleLabel:"MÁQUINAS — AUXILIARES",
    lessonTitle:"Cuadros eléctricos & Distribución",
    intro:"El cuadro eléctrico principal (MSB) es el corazón de la red eléctrica de un buque. Recibe la energía de los grupos electrógenos y la distribuye a todos los consumidores. Comprender su arquitectura y protecciones es esencial para todo maquinista.",
    tabs:["📖 Contenido","✏️ Práctica","📚 Banco Q.","🎯 Quiz"],
    s1title:"🔌 Arquitectura del cuadro principal (MSB)",
    s1hint:"👆 Toca una sección para ver su descripción",
    s2title:"📐 Jerarquía de distribución",
    s2hint:"👆 Toca un nivel para los detalles",
    s3title:"🔋 Tipos de cables & Sección",
    s3hint:"👆 Toca un tipo de cable",
    s4title:"⚡ Selectividad de las protecciones",
    s4hint:"👆 Toca un nivel para ver la coordinación",
    keypoints:"Puntos clave",
    kp:[
      "El MSB recibe todos los grupos y distribuye hacia los cuadros secundarios",
      "La selectividad garantiza que solo el disyuntor más cercano al fallo se dispare",
      "Los cables se clasifican por sección (mm²) según la intensidad a transportar",
      "El cuadro de emergencia (ESB) es alimentado por el grupo de emergencia",
      "Los cables MICC resisten al fuego — obligatorios para circuitos vitales SOLAS",
    ],
    sections:{
      incoming:{ name:"Entradas de grupos (Incoming)", desc:"Sección que recibe las entradas de cada grupo electrógeno a través de su disyuntor ACB. Cada grupo se conecta a las barras mediante su propio ACB con protecciones de sobreintensidad, cortocircuito y potencia inversa." },
      busbar:{ name:"Barras colectoras (Busbars)", desc:"Conductores de cobre macizo L1/L2/L3 que alimentan todas las salidas. Divididas en secciones aislables mediante acopladores (bus-tie). En grandes buques: dos semijuegos de barras." },
      feeder:{ name:"Salidas (Feeders)", desc:"Circuitos de distribución hacia cuadros secundarios y consumidores importantes. Cada salida protegida por un MCCB calibrado según la carga." },
      metering:{ name:"Instrumentación & Medidas", desc:"Voltímetros, amperímetros, vatímetros, frecuencímetros, medidores de cos φ. Permiten vigilar el estado de la red y equilibrar las cargas entre grupos." },
      synchro:{ name:"Panel de sincronización", desc:"Sincronoscopio, lámparas de sincronización, selector de grupo. Permite el acoplamiento en paralelo verificando tensión, frecuencia y concordancia de fase." },
      emergency:{ name:"Cuadro de emergencia (ESB)", desc:"Alimentado automáticamente por el grupo de emergencia en caso de fallo del MSB. Alimenta los circuitos vitales SOLAS: navegación, comunicación, bombas de incendios, alumbrado de emergencia." },
    },
    distribution:{
      msb:{ name:"MSB — Cuadro Principal", desc:"Nivel 1. Recibe los grupos, distribuye hacia cuadros de zona y grandes consumidores. Tensión: 440V trifásico.", voltage:"440V 3φ" },
      ssb:{ name:"SSB — Cuadro Secundario", desc:"Nivel 2. Recibe del MSB y distribuye hacia paneles de zona o equipos. Puede reducir la tensión (transformador 440V→220V).", voltage:"440V / 220V" },
      lp:{ name:"Panel de distribución (LP)", desc:"Nivel 3. Distribución final hacia consumidores individuales: motores, alumbrado, calefacción. Protegido por fusibles o pequeños disyuntores MCB.", voltage:"220V / 24V" },
      esb:{ name:"ESB — Cuadro de Emergencia", desc:"Red paralela alimentada por el grupo de emergencia. Solo circuitos vitales: navegación, comunicación, bomba de incendios.", voltage:"440V 3φ" },
    },
    cables:{
      xlpe:{ name:"XLPE — Polietileno reticulado", desc:"Cable estándar a bordo. Aislamiento en polietileno reticulado resistente a 90°C. Flexible, resistente a la humedad. Usado en la mayoría de los circuitos de potencia y control." },
      micc:{ name:"MICC — Cable mineral", desc:"Mineral Insulated Copper Conductor — aislamiento en polvo de magnesio. Resistente al fuego (>1000°C). Obligatorio SOLAS para circuitos vitales: alarmas de incendio, alumbrado de emergencia, bombas de incendios." },
      lsf:{ name:"LSF — Baja emisión de humos", desc:"Vaina sin halógenos. En caso de incendio, produce poco humo y gases tóxicos. Recomendado en espacios habitados y vías de evacuación." },
      armored:{ name:"Cable armado (SWA)", desc:"Steel Wire Armoured — protección mecánica en alambres de acero. Usado en zonas expuestas a golpes y esfuerzos mecánicos (bodegas, cubiertas exteriores)." },
    },
    selectivity:{
      main:{ name:"Disyuntor principal (ACB)", desc:"Último recurso — solo se dispara si las protecciones inferiores han fallado. Calibre elevado. Retardo intencional para permitir a los disyuntores aguas abajo disparar primero." },
      feeder:{ name:"Disyuntor de salida (MCCB)", desc:"Protege el circuito de distribución. Se dispara en caso de fallo en el cable o cuadro alimentado. Calibre inferior al disyuntor principal." },
      final:{ name:"Disyuntor final (MCB)", desc:"Protege el circuito terminal y el aparato. Calibre más bajo — se dispara primero. Selectividad garantizada si In(MCB) < In(MCCB) < In(ACB)." },
      fuse:{ name:"Fusible de protección", desc:"Protección de acción única (funde y debe reemplazarse). Más rápido que un disyuntor para fuertes cortocircuitos. Usado en protección de transformadores." },
    },
    practiceTitle:"Ejercicio práctico",
    questions:[
      { q:"Explique el principio de selectividad de las protecciones eléctricas y por qué es crítico a bordo.",
        a:"La selectividad garantiza que en caso de fallo eléctrico, solo el disyuntor más cercano al fallo se dispare, dejando el resto de la red alimentada. A bordo es crítico porque una corte total puede poner en peligro la seguridad (pérdida de propulsión, navegación, bombas de incendios). Para asegurar la selectividad: los disyuntores se calibran en cascada (In MCB < In MCCB < In ACB) y los principales tienen retardo intencional." },
      { q:"¿Por qué los cables MICC son obligatorios para ciertos circuitos a bordo? Dé ejemplos.",
        a:"Los cables MICC son obligatorios según SOLAS para circuitos que deben funcionar durante un incendio, ya que su aislamiento en polvo de magnesio resiste temperaturas superiores a 1000°C. Circuitos: alarmas de incendio, alumbrado de emergencia, bombas de incendios, comunicaciones de emergencia, cuadros de emergencia." },
      { q:"¿Cómo calcular la sección de cable necesaria para alimentar un motor de 15 kW / 440V trifásico con cos φ = 0,85?",
        a:"1. Calcular corriente: I = P / (√3 × U × cos φ) = 15000 / (1,732 × 440 × 0,85) = 23,1 A. 2. Aplicar coeficiente de seguridad (×1,25 para motores): 28,9 A. 3. Elegir sección en tablas: para 29 A en montaje libre, 6 mm² XLPE es adecuado (~36A). Verificar la caída de tensión (máx 3-5%)." },
    ],
    showAnswer:"Ver corrección", hideAnswer:"Ocultar",
  },
  pt:{
    moduleLabel:"MÁQUINAS — AUXILIARES",
    lessonTitle:"Quadros elétricos & Distribuição",
    intro:"O quadro elétrico principal (MSB) é o coração da rede elétrica de um navio. Recebe a energia dos grupos geradores e distribui-a a todos os consumidores. Compreender a sua arquitetura e proteções é essencial para qualquer maquinista.",
    tabs:["📖 Conteúdo","✏️ Prática","📚 Banco Q.","🎯 Quiz"],
    s1title:"🔌 Arquitetura do quadro principal (MSB)",
    s1hint:"👆 Toque numa secção para ver a descrição",
    s2title:"📐 Hierarquia de distribuição",
    s2hint:"👆 Toque num nível para os detalhes",
    s3title:"🔋 Tipos de cabos & Secção",
    s3hint:"👆 Toque num tipo de cabo",
    s4title:"⚡ Seletividade das proteções",
    s4hint:"👆 Toque num nível para ver a coordenação",
    keypoints:"Pontos-chave",
    kp:[
      "O MSB recebe todos os grupos e distribui para os quadros secundários",
      "A seletividade garante que apenas o disjuntor mais próximo do defeito dispara",
      "Os cabos são classificados por secção (mm²) segundo a corrente a transportar",
      "O quadro de emergência (ESB) é alimentado pelo gerador de emergência",
      "Os cabos MICC resistem ao fogo — obrigatórios para circuitos vitais SOLAS",
    ],
    sections:{
      incoming:{ name:"Entradas de grupos (Incoming)", desc:"Secção que recebe as entradas de cada grupo gerador através do seu disjuntor ACB. Cada grupo liga-se às barras pelo seu próprio ACB com proteções de sobrecorrente, curto-circuito e potência inversa." },
      busbar:{ name:"Barras coletoras (Busbars)", desc:"Condutores de cobre maciço L1/L2/L3 que alimentam todas as saídas. Divididas em secções isoláveis por acopladores (bus-tie). Em grandes navios: duas meias-barras." },
      feeder:{ name:"Saídas (Feeders)", desc:"Circuitos de distribuição para quadros secundários e consumidores importantes. Cada saída protegida por um MCCB calibrado segundo a carga." },
      metering:{ name:"Instrumentação & Medição", desc:"Voltímetros, amperímetros, wattímetros, frequencímetros, medidores de cos φ. Permitem vigiar o estado da rede e equilibrar as cargas entre grupos." },
      synchro:{ name:"Painel de sincronização", desc:"Sincronoscópio, lâmpadas de sincronização, seletor de grupo. Permite o acoplamento em paralelo verificando tensão, frequência e concordância de fase." },
      emergency:{ name:"Quadro de emergência (ESB)", desc:"Alimentado automaticamente pelo gerador de emergência em caso de falha do MSB. Alimenta circuitos vitais SOLAS: navegação, comunicação, bombas de incêndio, iluminação de emergência." },
    },
    distribution:{
      msb:{ name:"MSB — Quadro Principal", desc:"Nível 1. Recebe os grupos, distribui para quadros de zona e grandes consumidores. Tensão: 440V trifásico.", voltage:"440V 3φ" },
      ssb:{ name:"SSB — Quadro Secundário", desc:"Nível 2. Recebe do MSB e distribui para painéis de zona ou equipamentos. Pode reduzir a tensão (transformador 440V→220V).", voltage:"440V / 220V" },
      lp:{ name:"Painel de distribuição (LP)", desc:"Nível 3. Distribuição final para consumidores individuais: motores, iluminação, aquecimento. Protegido por fusíveis ou pequenos disjuntores MCB.", voltage:"220V / 24V" },
      esb:{ name:"ESB — Quadro de Emergência", desc:"Rede paralela alimentada pelo gerador de emergência. Apenas circuitos vitais: navegação, comunicação, bomba de incêndio.", voltage:"440V 3φ" },
    },
    cables:{
      xlpe:{ name:"XLPE — Polietileno reticulado", desc:"Cabo padrão a bordo. Isolamento em polietileno reticulado resistente a 90°C. Flexível, resistente à humidade. Usado na maioria dos circuitos de potência e controlo." },
      micc:{ name:"MICC — Cabo mineral", desc:"Mineral Insulated Copper Conductor — isolamento em pó de magnésio. Resistente ao fogo (>1000°C). Obrigatório SOLAS para circuitos vitais: alarmes de incêndio, iluminação de emergência, bombas de incêndio." },
      lsf:{ name:"LSF — Baixa emissão de fumos", desc:"Bainha sem halogénios. Em caso de incêndio, produz pouco fumo e gases tóxicos. Recomendado em espaços habitados e vias de evacuação." },
      armored:{ name:"Cabo armado (SWA)", desc:"Steel Wire Armoured — proteção mecânica em arames de aço. Usado em zonas expostas a choques e esforços mecânicos (porões, conveses exteriores)." },
    },
    selectivity:{
      main:{ name:"Disjuntor principal (ACB)", desc:"Último recurso — só dispara se as proteções inferiores falharam. Calibre elevado. Retardo intencional para permitir aos disjuntores a jusante disparar primeiro." },
      feeder:{ name:"Disjuntor de saída (MCCB)", desc:"Protege o circuito de distribuição. Dispara em caso de defeito no cabo ou quadro alimentado. Calibre inferior ao disjuntor principal." },
      final:{ name:"Disjuntor final (MCB)", desc:"Protege o circuito terminal e o equipamento. Calibre mais baixo — dispara primeiro. Seletividade garantida se In(MCB) < In(MCCB) < In(ACB)." },
      fuse:{ name:"Fusível de proteção", desc:"Proteção de ação única (funde e deve ser substituído). Mais rápido que um disjuntor para fortes curto-circuitos. Usado em proteção de transformadores." },
    },
    practiceTitle:"Exercício prático",
    questions:[
      { q:"Explique o princípio de seletividade das proteções elétricas e por que é crítico a bordo.",
        a:"A seletividade garante que em caso de defeito elétrico, apenas o disjuntor mais próximo do defeito dispara, deixando o resto da rede alimentado. A bordo é crítico porque uma corte total pode pôr em perigo a segurança (perda de propulsão, navegação, bombas de incêndio). Para garantir a seletividade: disjuntores calibrados em cascata (In MCB < In MCCB < In ACB) e os principais têm retardo intencional." },
      { q:"Por que os cabos MICC são obrigatórios para certos circuitos a bordo? Dê exemplos.",
        a:"Os cabos MICC são obrigatórios segundo o SOLAS para circuitos que devem funcionar durante um incêndio, pois o isolamento em pó de magnésio resiste a temperaturas superiores a 1000°C. Circuitos: alarmes de incêndio, iluminação de emergência, bombas de incêndio, comunicações de emergência, quadros de emergência." },
      { q:"Como calcular a secção de cabo necessária para alimentar um motor de 15 kW / 440V trifásico com cos φ = 0,85?",
        a:"1. Calcular corrente: I = P / (√3 × U × cos φ) = 15000 / (1,732 × 440 × 0,85) = 23,1 A. 2. Aplicar fator de segurança (×1,25 para motores): 28,9 A. 3. Escolher secção em tabelas: para 29 A em montagem livre, 6 mm² XLPE é adequado (~36A). Verificar queda de tensão (máx 3-5%)." },
    ],
    showAnswer:"Ver correção", hideAnswer:"Ocultar",
  },
};

// ── SVG 1 — MSB ARCHITECTURE ──────────────────────────────────
function MSBArchitectureSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string|null>(null);
  const sects = t.sections;
  const sectColors: Record<string,string> = {
    incoming:C.danger, busbar:C.panel, feeder:C.elec,
    metering:C.safe, synchro:C.phase, emergency:C.red,
  };

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.panel}33`}}>
      <svg viewBox="0 0 280 180" style={{width:"100%",maxWidth:360,display:"block",margin:"0 auto"}}>
        {/* MSB outline */}
        <rect x="10" y="10" width="260" height="160" rx="6" fill="none" stroke={C.panel} strokeWidth="1.5" strokeDasharray="4,3"/>
        <text x="140" y="24" fontSize="9" fill={C.panel} fontFamily="'Cinzel',serif" textAnchor="middle">MSB — MAIN SWITCHBOARD</text>

        {/* Incoming section */}
        <rect x="20" y="30" width="55" height="50" rx="4" fill={C.danger} opacity={0.15} stroke={C.danger} strokeWidth="1"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="incoming"?null:"incoming")}/>
        <text x="47" y="52" fontSize="7" fill={C.danger} fontFamily="Courier New" textAnchor="middle">GEN 1</text>
        <text x="47" y="62" fontSize="7" fill={C.danger} fontFamily="Courier New" textAnchor="middle">GEN 2</text>
        <text x="47" y="72" fontSize="6" fill={C.danger} fontFamily="Courier New" textAnchor="middle">INCOMING</text>

        {/* Busbar */}
        <rect x="20" y="90" width="240" height="12" rx="3" fill={C.panel} opacity={0.3} stroke={C.panel} strokeWidth="1.5"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="busbar"?null:"busbar")}/>
        <text x="140" y="100" fontSize="7" fill={C.panel} fontFamily="Courier New" textAnchor="middle">L1 — L2 — L3 BUSBARS</text>

        {/* Feeders */}
        <rect x="20" y="112" width="120" height="45" rx="4" fill={C.elec} opacity={0.12} stroke={C.elec} strokeWidth="1"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="feeder"?null:"feeder")}/>
        <text x="80" y="130" fontSize="7" fill={C.elec} fontFamily="Courier New" textAnchor="middle">MCCB MCCB MCCB</text>
        <text x="80" y="142" fontSize="7" fill={C.elec} fontFamily="Courier New" textAnchor="middle">FEEDERS →</text>
        <text x="80" y="152" fontSize="6" fill={C.elec} fontFamily="Courier New" textAnchor="middle">SSB1 SSB2 SSB3</text>

        {/* Metering */}
        <rect x="85" y="30" width="55" height="50" rx="4" fill={C.safe} opacity={0.12} stroke={C.safe} strokeWidth="1"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="metering"?null:"metering")}/>
        <text x="112" y="50" fontSize="7" fill={C.safe} fontFamily="Courier New" textAnchor="middle">V A W Hz</text>
        <text x="112" y="62" fontSize="6" fill={C.safe} fontFamily="Courier New" textAnchor="middle">METERS</text>
        <text x="112" y="74" fontSize="6" fill={C.safe} fontFamily="Courier New" textAnchor="middle">cosφ kWh</text>

        {/* Synchro */}
        <rect x="150" y="30" width="55" height="50" rx="4" fill={C.phase} opacity={0.12} stroke={C.phase} strokeWidth="1"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="synchro"?null:"synchro")}/>
        <circle cx="177" cy="52" r="14" fill="none" stroke={C.phase} strokeWidth="1"/>
        <line x1="177" y1="38" x2="177" y2="44" stroke={C.safe} strokeWidth="1.5"/>
        <line x1="177" y1="52" x2="184" y2="46" stroke={C.phase} strokeWidth="1.5"/>
        <text x="177" y="72" fontSize="6" fill={C.phase} fontFamily="Courier New" textAnchor="middle">SYNCHRO</text>

        {/* Emergency */}
        <rect x="150" y="112" width="110" height="45" rx="4" fill={C.red} opacity={0.12} stroke={C.red} strokeWidth="1"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="emergency"?null:"emergency")}/>
        <text x="205" y="130" fontSize="7" fill={C.red} fontFamily="Courier New" textAnchor="middle">EMERGENCY</text>
        <text x="205" y="142" fontSize="7" fill={C.red} fontFamily="Courier New" textAnchor="middle">SWITCHBOARD</text>
        <text x="205" y="152" fontSize="6" fill={C.red} fontFamily="Courier New" textAnchor="middle">ESB — SOLAS</text>

        {/* Connections from busbars */}
        {[35,80,140,190].map((x,i)=>(
          <line key={i} x1={x} y1="102" x2={x} y2="112" stroke={C.elec} strokeWidth="1.5"/>
        ))}
      </svg>

      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10,marginTop:4}}>
        {Object.entries(sects).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(sel===key?null:key)} style={{
            padding:"4px 8px",borderRadius:8,fontSize:10,cursor:"pointer",
            background:sel===key?`${sectColors[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?sectColors[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?sectColors[key]:"rgba(240,244,255,0.45)",
            fontFamily:"Courier New",
          }}>{key==="incoming"?"GEN IN":key==="busbar"?"BUSBAR":key==="feeder"?"FEEDERS":key==="metering"?"METERS":key==="synchro"?"SYNCHRO":"ESB"}</button>
        ))}
      </div>
      {sel&&(
        <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${sectColors[sel]||C.panel}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
          <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{sects[sel].name}</div>
          {sects[sel].desc}
        </div>
      )}
    </div>
  );
}

// ── SVG 2 — DISTRIBUTION HIERARCHY ───────────────────────────
function DistributionHierarchySVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("msb");
  const dist = t.distribution;
  const distColors: Record<string,string> = {msb:C.danger,ssb:C.panel,lp:C.safe,esb:C.red};
  const levels = Object.entries(dist) as [string,any][];

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.elec}33`}}>
      <svg viewBox="0 0 280 160" style={{width:"100%",maxWidth:360,display:"block",margin:"0 auto"}}>
        {/* MSB */}
        <rect x="100" y="10" width="80" height="28" rx="5" fill={C.danger} opacity={0.2} stroke={C.danger} strokeWidth="1.5"
          style={{cursor:"pointer"}} onClick={()=>setSel("msb")}/>
        <text x="140" y="28" fontSize="8" fill={C.danger} fontFamily="Courier New" textAnchor="middle">MSB 440V 3φ</text>
        {/* Lines to SSB */}
        <line x1="110" y1="38" x2="70" y2="65" stroke={C.panel} strokeWidth="1.5"/>
        <line x1="140" y1="38" x2="140" y2="65" stroke={C.panel} strokeWidth="1.5"/>
        <line x1="170" y1="38" x2="210" y2="65" stroke={C.red} strokeWidth="1.5" strokeDasharray="4,2"/>
        {/* SSB */}
        <rect x="30" y="65" width="80" height="25" rx="4" fill={C.panel} opacity={0.2} stroke={C.panel} strokeWidth="1.5"
          style={{cursor:"pointer"}} onClick={()=>setSel("ssb")}/>
        <text x="70" y="81" fontSize="7" fill={C.panel} fontFamily="Courier New" textAnchor="middle">SSB 440/220V</text>
        {/* SSB2 */}
        <rect x="100" y="65" width="80" height="25" rx="4" fill={C.panel} opacity={0.2} stroke={C.panel} strokeWidth="1.5"
          style={{cursor:"pointer"}} onClick={()=>setSel("ssb")}/>
        <text x="140" y="81" fontSize="7" fill={C.panel} fontFamily="Courier New" textAnchor="middle">SSB 440/220V</text>
        {/* ESB */}
        <rect x="180" y="65" width="80" height="25" rx="4" fill={C.red} opacity={0.15} stroke={C.red} strokeWidth="1.5" strokeDasharray="4,2"
          style={{cursor:"pointer"}} onClick={()=>setSel("esb")}/>
        <text x="220" y="78" fontSize="7" fill={C.red} fontFamily="Courier New" textAnchor="middle">ESB EMERG.</text>
        {/* Lines to LP */}
        <line x1="60" y1="90" x2="50" y2="115" stroke={C.safe} strokeWidth="1"/>
        <line x1="80" y1="90" x2="90" y2="115" stroke={C.safe} strokeWidth="1"/>
        <line x1="120" y1="90" x2="130" y2="115" stroke={C.safe} strokeWidth="1"/>
        <line x1="160" y1="90" x2="160" y2="115" stroke={C.safe} strokeWidth="1"/>
        {/* LP panels */}
        {[30,70,110,140].map((x,i)=>(
          <g key={i}>
            <rect x={x} y={115} width="40" height="20" rx="3" fill={C.safe} opacity={0.15} stroke={C.safe} strokeWidth="1"
              style={{cursor:"pointer"}} onClick={()=>setSel("lp")}/>
            <text x={x+20} y={128} fontSize="6" fill={C.safe} fontFamily="Courier New" textAnchor="middle">LP 220V</text>
          </g>
        ))}
        {/* Generator symbol */}
        <circle cx="140" cy="150" r="7" fill="none" stroke={C.danger} strokeWidth="1.5"/>
        <text x="140" y="154" fontSize="6" fill={C.danger} fontFamily="Courier New" textAnchor="middle">G</text>
        <line x1="140" y1="143" x2="140" y2="138" stroke={C.danger} strokeWidth="1.5"/>
      </svg>

      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {levels.map(([key,val])=>(
          <button key={key} onClick={()=>setSel(key)} style={{
            padding:"5px 10px",borderRadius:8,fontSize:10,cursor:"pointer",
            background:sel===key?`${distColors[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?distColors[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?distColors[key]:"rgba(240,244,255,0.45)",
            fontFamily:"Courier New",
          }}>
            {key.toUpperCase()} <span style={{fontSize:8,opacity:0.7}}>{val.voltage}</span>
          </button>
        ))}
      </div>
      <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${distColors[sel]||C.elec}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
        <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{dist[sel].name} — {dist[sel].voltage}</div>
        {dist[sel].desc}
      </div>
    </div>
  );
}

// ── SVG 3 — CABLES ────────────────────────────────────────────
function CablesSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("xlpe");
  const cables = t.cables;
  const cableColors: Record<string,string> = {xlpe:C.elec,micc:C.red,lsf:C.safe,armored:C.neutral};

  const cableVisuals: Record<string,JSX.Element> = {
    xlpe:(
      <g>
        <circle cx="80" cy="80" r="45" fill={C.elec} opacity={0.15} stroke={C.elec} strokeWidth="2"/>
        <circle cx="80" cy="80" r="32" fill={C.navy3} stroke={C.elec} strokeWidth="1.5"/>
        <circle cx="80" cy="80" r="20" fill={C.panel} opacity={0.3} stroke={C.panel} strokeWidth="1"/>
        <circle cx="80" cy="80" r="10" fill={C.danger} opacity={0.6}/>
        <text x="80" y="140" fontSize="8" fill={C.elec} fontFamily="Courier New" textAnchor="middle">XLPE Standard</text>
        <text x="80" y="150" fontSize="7" fill="rgba(240,244,255,0.5)" fontFamily="Courier New" textAnchor="middle">90°C — Flexible</text>
      </g>
    ),
    micc:(
      <g>
        <circle cx="80" cy="80" r="45" fill={C.red} opacity={0.15} stroke={C.red} strokeWidth="2.5"/>
        <circle cx="80" cy="80" r="30" fill="#fff" opacity={0.1} stroke={C.neutral} strokeWidth="1"/>
        <text x="80" y="76" fontSize="7" fill={C.neutral} fontFamily="Courier New" textAnchor="middle">MgO</text>
        <text x="80" y="86" fontSize="6" fill={C.neutral} fontFamily="Courier New" textAnchor="middle">POWDER</text>
        <circle cx="80" cy="80" r="12" fill={C.danger} opacity={0.7}/>
        <text x="80" y="140" fontSize="8" fill={C.red} fontFamily="Courier New" textAnchor="middle">MICC — Fire resistant</text>
        <text x="80" y="150" fontSize="7" fill="rgba(240,244,255,0.5)" fontFamily="Courier New" textAnchor="middle">&gt;1000°C — SOLAS</text>
      </g>
    ),
    lsf:(
      <g>
        <circle cx="80" cy="80" r="45" fill={C.safe} opacity={0.12} stroke={C.safe} strokeWidth="2"/>
        <circle cx="80" cy="80" r="32" fill={C.navy3} stroke={C.safe} strokeWidth="1.5"/>
        <circle cx="80" cy="80" r="20" fill={C.panel} opacity={0.25} stroke={C.panel} strokeWidth="1"/>
        <circle cx="80" cy="80" r="10" fill={C.danger} opacity={0.5}/>
        <text x="80" y="136" fontSize="7" fill={C.safe} fontFamily="Courier New" textAnchor="middle">LSF — Low Smoke</text>
        <text x="80" y="148" fontSize="6" fill="rgba(240,244,255,0.5)" fontFamily="Courier New" textAnchor="middle">Halogen-free sheath</text>
      </g>
    ),
    armored:(
      <g>
        <circle cx="80" cy="80" r="45" fill={C.neutral} opacity={0.12} stroke={C.neutral} strokeWidth="3"/>
        {Array.from({length:12},(_,i)=>{
          const a=i*30*Math.PI/180;
          return <line key={i} x1={80+38*Math.cos(a)} y1={80+38*Math.sin(a)} x2={80+44*Math.cos(a)} y2={80+44*Math.sin(a)} stroke={C.neutral} strokeWidth="2" opacity={0.6}/>;
        })}
        <circle cx="80" cy="80" r="30" fill={C.navy3} stroke={C.neutral} strokeWidth="1"/>
        <circle cx="80" cy="80" r="12" fill={C.danger} opacity={0.5}/>
        <text x="80" y="136" fontSize="7" fill={C.neutral} fontFamily="Courier New" textAnchor="middle">SWA — Steel Wire Armoured</text>
        <text x="80" y="148" fontSize="6" fill="rgba(240,244,255,0.5)" fontFamily="Courier New" textAnchor="middle">Mechanical protection</text>
      </g>
    ),
  };

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.cable}33`}}>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {Object.entries(cables).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{
            padding:"5px 9px",borderRadius:8,fontSize:10,cursor:"pointer",
            background:sel===key?`${cableColors[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?cableColors[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?cableColors[key]:"rgba(240,244,255,0.45)",
            fontFamily:"Courier New",
          }}>{key.toUpperCase()}</button>
        ))}
      </div>
      <svg viewBox="0 0 160 160" style={{width:"100%",maxWidth:200,display:"block",margin:"0 auto"}}>
        {cableVisuals[sel]}
      </svg>
      <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${cableColors[sel]||C.cable}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
        <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{cables[sel].name}</div>
        {cables[sel].desc}
      </div>
    </div>
  );
}

// ── SVG 4 — SELECTIVITY ───────────────────────────────────────
function SelectivitySVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string|null>(null);
  const prots = t.selectivity;
  const protColors: Record<string,string> = {main:C.danger,feeder:C.panel,final:C.safe,fuse:C.phase};

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.danger}33`}}>
      <svg viewBox="0 0 200 160" style={{width:"100%",maxWidth:260,display:"block",margin:"0 auto"}}>
        {/* Generator */}
        <circle cx="100" cy="15" r="10" fill="none" stroke={C.danger} strokeWidth="1.5"/>
        <text x="100" y="19" fontSize="7" fill={C.danger} fontFamily="Courier New" textAnchor="middle">G</text>
        {/* ACB */}
        <line x1="100" y1="25" x2="100" y2="40" stroke={C.danger} strokeWidth="1.5"/>
        <rect x="78" y="40" width="44" height="20" rx="4" fill={C.danger} opacity={0.2} stroke={C.danger} strokeWidth="1.5"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="main"?null:"main")}/>
        <text x="100" y="54" fontSize="7" fill={C.danger} fontFamily="Courier New" textAnchor="middle">ACB In=800A</text>
        {/* Lines to MCCB */}
        <line x1="100" y1="60" x2="100" y2="70" stroke={C.panel} strokeWidth="1.5"/>
        <line x1="100" y1="70" x2="60" y2="70" stroke={C.panel} strokeWidth="1"/>
        <line x1="100" y1="70" x2="140" y2="70" stroke={C.panel} strokeWidth="1"/>
        {/* MCCB */}
        {[40,120].map((x,i)=>(
          <g key={i}>
            <line x1={x+20} y1="70" x2={x+20} y2="82" stroke={C.panel} strokeWidth="1.5"/>
            <rect x={x} y="82" width="40" height="18" rx="3" fill={C.panel} opacity={0.2} stroke={C.panel} strokeWidth="1.5"
              style={{cursor:"pointer"}} onClick={()=>setSel(sel==="feeder"?null:"feeder")}/>
            <text x={x+20} y="95" fontSize="6" fill={C.panel} fontFamily="Courier New" textAnchor="middle">MCCB 100A</text>
          </g>
        ))}
        {/* MCB */}
        {[25,55,105,135].map((x,i)=>(
          <g key={i}>
            <line x1={x+10} y1="100" x2={x+10} y2="112" stroke={C.safe} strokeWidth="1"/>
            <rect x={x} y="112" width="20" height="14" rx="2" fill={C.safe} opacity={0.2} stroke={C.safe} strokeWidth="1"
              style={{cursor:"pointer"}} onClick={()=>setSel(sel==="final"?null:"final")}/>
            <text x={x+10} y="122" fontSize="5" fill={C.safe} fontFamily="Courier New" textAnchor="middle">MCB</text>
            <text x={x+10} y="129" fontSize="5" fill={C.safe} fontFamily="Courier New" textAnchor="middle">16A</text>
          </g>
        ))}
        {/* Labels */}
        <text x="185" y="54" fontSize="7" fill={C.danger} fontFamily="Courier New">L1</text>
        <text x="185" y="94" fontSize="7" fill={C.panel} fontFamily="Courier New">L2</text>
        <text x="185" y="125" fontSize="7" fill={C.safe} fontFamily="Courier New">L3</text>
        <text x="5" y="54" fontSize="6" fill={C.danger} fontFamily="Courier New">In=800A</text>
        <text x="5" y="94" fontSize="6" fill={C.panel} fontFamily="Courier New">In=100A</text>
        <text x="5" y="125" fontSize="6" fill={C.safe} fontFamily="Courier New">In=16A</text>
      </svg>

      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {Object.entries(prots).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(sel===key?null:key)} style={{
            padding:"4px 8px",borderRadius:8,fontSize:10,cursor:"pointer",
            background:sel===key?`${protColors[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?protColors[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?protColors[key]:"rgba(240,244,255,0.45)",
            fontFamily:"Courier New",
          }}>{key==="main"?"ACB":key==="feeder"?"MCCB":key==="final"?"MCB":"FUSE"}</button>
        ))}
      </div>
      {sel&&(
        <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${protColors[sel]||C.danger}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
          <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{prots[sel].name}</div>
          {prots[sel].desc}
        </div>
      )}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)"}}>{t.s4hint}</div>}
    </div>
  );
}

// ── CONTENT TAB ───────────────────────────────────────────────
function ContentTab({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const section=(title:string,children:React.ReactNode,color=C.panel)=>(
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
      {section(t.s1title,<MSBArchitectureSVG lang={lang}/>,C.panel)}
      {section(t.s2title,<DistributionHierarchySVG lang={lang}/>,C.elec)}
      {section(t.s3title,<CablesSVG lang={lang}/>,C.cable)}
      {section(t.s4title,<SelectivitySVG lang={lang}/>,C.danger)}
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
        <div key={i} style={{marginBottom:14,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.panel}33`,overflow:"hidden"}}>
          <div style={{padding:"12px 14px"}}>
            <div style={{fontSize:10,color:C.panel,letterSpacing:1,marginBottom:6,fontFamily:"'Cinzel',serif"}}>Q{i+1}</div>
            <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>{q.q}</div>
          </div>
          <div style={{padding:"0 14px 12px"}}>
            <button onClick={()=>toggle(i)} style={{padding:"7px 14px",borderRadius:8,fontSize:11,cursor:"pointer",background:shown[i]?`${C.panel}22`:"rgba(255,255,255,0.06)",border:`1px solid ${shown[i]?C.panel:"rgba(255,255,255,0.15)"}`,color:shown[i]?C.panel:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{shown[i]?t.hideAnswer:t.showAnswer}</button>
            {shown[i]&&<div style={{marginTop:10,padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.panel}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{q.a}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
// LessonE2_L2 — PART 2: Bank + Quiz + Main

function getBank(lang: string) {
  const banks: any = {
    fr:[
      {q:"Qu'est-ce que le MSB et quelles sont ses fonctions principales ?",a:"Le MSB (Main Switchboard — Tableau Principal) est le centre de distribution électrique du navire. Fonctions : recevoir l'énergie de tous les groupes électrogènes, distribuer vers les tableaux secondaires et consommateurs importants, assurer la protection du réseau (disjoncteurs ACB), permettre le couplage des groupes en parallèle (synchroscope), mesurer et surveiller les paramètres du réseau (voltmètre, ampèremètre, wattmètre, fréquencemètre)."},
      {q:"Qu'est-ce qu'un jeu de barres (busbar) et pourquoi certains navires en ont-ils deux ?",a:"Le jeu de barres est un conducteur de cuivre massif constituant le point de connexion central du MSB. Tous les groupes s'y connectent et tous les circuits en partent. Certains grands navires ont deux demi-jeux de barres séparés par un coupleur (bus-tie breaker). Cette disposition permet : de sectionner le réseau en deux parties indépendantes (sécurité), de maintenir l'alimentation d'une moitié si l'autre est défaillante, de faciliter la maintenance sans coupure totale."},
      {q:"Quelle est la différence entre un ACB, un MCCB et un MCB ?",a:"ACB (Air Circuit Breaker) : disjoncteur haute puissance pour les arrivées groupes et départs principaux. Calibres élevés (100A à plusieurs kA). Extinction de l'arc par air. Réarmable, avec protection intégrée programmable. MCCB (Moulded Case Circuit Breaker) : disjoncteur en boîtier moulé pour les départs secondaires. Calibres moyens (16A à 800A). Compact et robuste. MCB (Miniature Circuit Breaker) : petit disjoncteur pour circuits terminaux (éclairage, prises). Calibres faibles (1A à 125A). Très compact."},
      {q:"Qu'est-ce que l'ESB et quels circuits doit-il alimenter selon SOLAS ?",a:"L'ESB (Emergency Switchboard — Tableau de Secours) est un tableau électrique indépendant alimenté par le groupe électrogène de secours. Situé au-dessus de la ligne de flottaison et hors de la salle des machines principale. Circuits SOLAS obligatoires : feux de navigation et lanternes, radio de détresse et GMDSS, système d'alarme incendie, éclairage de secours (couloirs, escaliers, postes de rassemblement), pompe incendie de secours, systèmes de fermeture des portes coupe-feu, commandes de ventilation de secours."},
      {q:"Pourquoi utilise-t-on des transformateurs dans le système de distribution électrique à bord ?",a:"Les transformateurs permettent d'adapter la tension selon les besoins des consommateurs : 440V→220V pour l'éclairage et les appareils domestiques, 440V→24V DC (via redresseur) pour les systèmes de contrôle et alarmes, 440V→110V ou 230V pour les prises selon les normes locales. Ils permettent aussi d'isoler galvaniquement certains circuits (sécurité) et de stabiliser la tension dans des zones éloignées du MSB."},
      {q:"Comment est assuré l'équilibrage des charges entre plusieurs groupes en parallèle ?",a:"L'équilibrage des charges se fait en deux parties : Puissance active (kW) : ajustement du governor de chaque groupe (admission carburant). Si un groupe prend plus de charge que l'autre, on réduit son governor et augmente celui de l'autre jusqu'à égalisation. Puissance réactive (kVAR) : ajustement de l'AVR de chaque groupe (courant d'excitation). L'objectif est d'avoir un facteur de puissance identique sur chaque groupe. Un déséquilibre de charge crée des courants de circulation entre groupes, pouvant causer des dommages."},
      {q:"Qu'est-ce que la section d'un câble et comment la choisit-on ?",a:"La section d'un câble (en mm²) représente l'aire de la section transversale du conducteur en cuivre. Elle détermine la capacité de transport de courant (ampacité). Choix : calculer le courant nominal du circuit, appliquer les coefficients de correction (température ambiante, mode de pose, groupement de câbles), consulter les tables de capacité de courant selon le type de câble et le mode de pose, vérifier la chute de tension admissible sur la longueur du circuit. Sections courantes : 1,5mm² (éclairage), 2,5mm² (prises), 4-6mm² (petits moteurs), 16-95mm² (gros moteurs)."},
      {q:"Qu'est-ce que la chute de tension et quelles sont les limites admissibles à bord ?",a:"La chute de tension est la différence de tension entre le début et la fin d'un circuit due à la résistance du câble (U = R × I). Formule : ΔU = (2 × L × I × ρ) / S, où L = longueur (m), I = courant (A), ρ = résistivité du cuivre (0,0175 Ω·mm²/m), S = section (mm²). Limites à bord : circuits de puissance (moteurs) : max 5%, circuits d'éclairage : max 3%, circuits de contrôle/signalisation : max 2%. Une chute de tension excessive réduit les performances des moteurs et peut empêcher leur démarrage."},
      {q:"Qu'est-ce qu'un transformateur d'isolement et pourquoi est-il utilisé à bord ?",a:"Un transformateur d'isolement a le même rapport de transformation (1:1) mais isole galvaniquement le circuit secondaire du circuit primaire. Il est utilisé pour les circuits médicaux (infirmerie, bloc opératoire), les prises dans les salles de bain et sanitaires (sécurité électrique), certains équipements de navigation sensibles. L'isolation galvanique empêche les courants de défaut de circuler via le corps humain en cas de contact accidentel avec un conducteur sous tension."},
      {q:"Comment fonctionne un relais de protection différentielle pour alternateur ?",a:"La protection différentielle compare le courant entrant et le courant sortant de l'enroulement de l'alternateur. En fonctionnement normal, ces courants sont égaux et le courant différentiel est nul. Si un défaut interne se produit (court-circuit d'enroulement, mise à la terre interne), une partie du courant passe par le chemin de défaut et crée un déséquilibre — le courant différentiel augmente. Quand ce courant différentiel dépasse le seuil réglé, le relais déclenche instantanément le disjoncteur de l'alternateur."},
      {q:"Qu'est-ce que la sélectivité ampèremétrique et la sélectivité temporelle ?",a:"Sélectivité ampèremétrique : basée sur la différence de calibre entre disjoncteurs. Si In(MCB) << In(MCCB), pour un courant de défaut entre les deux valeurs, seul le MCB déclenche. Fonctionne bien pour les surcharges et petits courts-circuits. Sélectivité temporelle : ajout d'un délai intentionnel sur les disjoncteurs de niveau supérieur. Le MCCB déclenche immédiatement, l'ACB attend 0,1s — si le MCCB n'a pas déclenché (défaut en amont), l'ACB prend le relais. Combinaison des deux méthodes pour une sélectivité totale."},
      {q:"Quelles sont les vérifications périodiques à effectuer sur un MSB ?",a:"Vérifications quotidiennes : relevé des paramètres (tension, fréquence, charge, cos φ), contrôle visuel des voyants et alarmes, test de fonctionnement des disjoncteurs sous charge. Vérifications mensuelles : test de déclenchement des disjoncteurs, vérification des connexions (resserrage si nécessaire), nettoyage des contacts et jeux de barres. Vérifications annuelles/quinquennales : test des protections (injection de courant), vérification de l'isolement des circuits, calibrage des instruments de mesure. Ces vérifications sont réglementées et documentées dans le Plan de Maintenance Préventive du navire."},
    ],
    en:[
      {q:"What is the MSB and what are its main functions?",a:"The MSB (Main Switchboard) is the vessel's central electrical distribution point. Functions: receive power from all generating sets, distribute to secondary switchboards and major consumers, provide network protection (ACB circuit breakers), allow parallel generator coupling (synchroscope), measure and monitor network parameters (voltmeter, ammeter, wattmeter, frequency meter)."},
      {q:"What is a busbar and why do some vessels have two?",a:"A busbar is a solid copper conductor forming the MSB's central connection point. All generators connect to it and all circuits depart from it. Some large vessels have two half-busbars separated by a bus-tie breaker. This allows: splitting the network into two independent sections (safety), maintaining supply to one half if the other fails, facilitating maintenance without total shutdown."},
      {q:"What is the difference between an ACB, MCCB and MCB?",a:"ACB (Air Circuit Breaker): high-power breaker for generator incomers and main feeders. High ratings (100A to several kA). Air arc extinction. Re-closable with programmable integrated protection. MCCB (Moulded Case Circuit Breaker): moulded case breaker for secondary feeders. Medium ratings (16A to 800A). Compact and robust. MCB (Miniature Circuit Breaker): small breaker for terminal circuits (lighting, sockets). Low ratings (1A to 125A). Very compact."},
      {q:"What is the ESB and which circuits must it supply per SOLAS?",a:"The ESB (Emergency Switchboard) is an independent switchboard fed by the emergency generator. Located above the waterline and outside the main engine room. SOLAS mandatory circuits: navigation lights, distress radio and GMDSS, fire alarm system, emergency lighting (corridors, stairs, muster stations), emergency fire pump, fire door closure controls, emergency ventilation controls."},
      {q:"Why are transformers used in the on-board electrical distribution system?",a:"Transformers adapt voltage to consumer requirements: 440V→220V for lighting and domestic appliances, 440V→24V DC (via rectifier) for control and alarm systems, 440V→110V or 230V for sockets per local standards. They also provide galvanic isolation for certain circuits (safety) and stabilise voltage in areas remote from the MSB."},
      {q:"How is load sharing ensured between several generators running in parallel?",a:"Load sharing is done in two parts: Active power (kW): governor adjustment of each generator (fuel admission). If one takes more load, reduce its governor and increase the other's until equalised. Reactive power (kVAR): AVR adjustment (excitation current). Aim for identical power factor on each generator. Load imbalance creates circulating currents between generators, potentially causing damage."},
      {q:"What is cable cross-section and how is it chosen?",a:"Cable cross-section (in mm²) is the area of the copper conductor's cross-section. It determines current-carrying capacity (ampacity). Selection: calculate circuit nominal current, apply correction factors (ambient temperature, installation method, cable grouping), consult current capacity tables by cable type and installation method, check admissible voltage drop over circuit length. Common sections: 1.5mm² (lighting), 2.5mm² (sockets), 4-6mm² (small motors), 16-95mm² (large motors)."},
      {q:"What is voltage drop and what are the admissible limits on board?",a:"Voltage drop is the difference in voltage between start and end of a circuit due to cable resistance (V = R × I). Formula: ΔV = (2 × L × I × ρ) / S, where L = length (m), I = current (A), ρ = copper resistivity (0.0175 Ω·mm²/m), S = cross-section (mm²). Limits on board: power circuits (motors): max 5%, lighting circuits: max 3%, control/signalling circuits: max 2%. Excessive voltage drop reduces motor performance and may prevent starting."},
      {q:"What is an isolation transformer and why is it used on board?",a:"An isolation transformer has the same transformation ratio (1:1) but galvanically isolates the secondary circuit from the primary. Used for: medical circuits (sick bay, operating room), sockets in bathrooms and sanitary spaces (electrical safety), sensitive navigation equipment. Galvanic isolation prevents fault currents from flowing through the human body in case of accidental contact with a live conductor."},
      {q:"How does a differential protection relay work for an alternator?",a:"Differential protection compares current entering and leaving the alternator winding. Normally equal, differential current is zero. If an internal fault occurs (winding short circuit, internal earth fault), some current takes the fault path creating an imbalance — differential current increases. When it exceeds the set threshold, the relay instantly trips the alternator's circuit breaker."},
      {q:"What is current selectivity and time selectivity?",a:"Current selectivity: based on rating difference between breakers. If In(MCB) << In(MCCB), for a fault current between the two values, only the MCB trips. Works well for overloads and small short circuits. Time selectivity: intentional delay added to higher-level breakers. MCCB trips immediately, ACB waits 0.1s — if MCCB hasn't tripped (upstream fault), ACB takes over. Combining both methods achieves total selectivity."},
      {q:"What periodic checks should be performed on an MSB?",a:"Daily checks: parameter readings (voltage, frequency, load, cos φ), visual check of indicators and alarms, breaker functional test under load. Monthly checks: breaker trip testing, connection checks (retightening if needed), contact and busbar cleaning. Annual/5-year checks: protection testing (current injection), circuit insulation check, instrument calibration. These checks are regulated and documented in the vessel's Planned Maintenance System."},
    ],
    es:[
      {q:"¿Qué es el MSB y cuáles son sus funciones principales?",a:"El MSB (Main Switchboard — Cuadro Principal) es el centro de distribución eléctrica del buque. Funciones: recibir la energía de todos los grupos electrógenos, distribuir hacia cuadros secundarios y grandes consumidores, proteger la red (disyuntores ACB), permitir el acoplamiento de grupos en paralelo (sincronoscopio), medir y supervisar los parámetros de la red."},
      {q:"¿Qué son las barras colectoras y por qué algunos buques tienen dos?",a:"Las barras colectoras son conductores de cobre macizo que forman el punto de conexión central del MSB. Algunos grandes buques tienen dos semijuegos de barras separados por un acoplador (bus-tie). Esto permite: dividir la red en dos partes independientes, mantener el suministro de una mitad si la otra falla, facilitar el mantenimiento sin corte total."},
      {q:"¿Cuál es la diferencia entre ACB, MCCB y MCB?",a:"ACB: disyuntor de alta potencia para entradas de grupos y salidas principales. Calibres elevados. MCCB: disyuntor en caja moldeada para salidas secundarias. Calibres medios (16A-800A). MCB: pequeño disyuntor para circuitos terminales. Calibres bajos (1A-125A)."},
      {q:"¿Qué es el ESB y qué circuitos debe alimentar según SOLAS?",a:"El ESB (Emergency Switchboard) es un cuadro independiente alimentado por el grupo de emergencia. Circuitos SOLAS obligatorios: luces de navegación, radio de socorro y GMDSS, alarma de incendios, alumbrado de emergencia, bomba de incendios de emergencia, controles de puertas cortafuegos, ventilación de emergencia."},
      {q:"¿Por qué se usan transformadores en la distribución eléctrica a bordo?",a:"Para adaptar la tensión: 440V→220V para alumbrado, 440V→24V DC para control y alarmas. También para aislamiento galvánico y estabilización de tensión en zonas alejadas del MSB."},
      {q:"¿Cómo se asegura el equilibrio de cargas entre grupos en paralelo?",a:"Potencia activa (kW): ajuste del governor de cada grupo. Potencia reactiva (kVAR): ajuste del AVR. El objetivo es igual factor de potencia en cada grupo. Un desequilibrio crea corrientes de circulación entre grupos."},
      {q:"¿Qué es la sección de un cable y cómo se elige?",a:"La sección (mm²) determina la capacidad de transporte de corriente. Elección: calcular corriente nominal, aplicar coeficientes de corrección, consultar tablas de capacidad, verificar caída de tensión admisible."},
      {q:"¿Qué es la caída de tensión y cuáles son los límites admisibles a bordo?",a:"ΔU = (2 × L × I × ρ) / S. Límites: circuitos de potencia máx 5%, alumbrado máx 3%, control máx 2%."},
      {q:"¿Qué es un transformador de aislamiento y por qué se usa a bordo?",a:"Aísla galvánicamente el circuito secundario del primario. Usado en circuitos médicos, enchufes en baños y equipos de navegación sensibles. Evita corrientes de fallo a través del cuerpo humano."},
      {q:"¿Cómo funciona un relé de protección diferencial para alternador?",a:"Compara la corriente entrante y saliente del devanado. En condiciones normales son iguales. Un fallo interno crea un desequilibrio — cuando la corriente diferencial supera el umbral, el relé dispara el disyuntor instantáneamente."},
      {q:"¿Qué es la selectividad amperimétrica y la selectividad temporal?",a:"Selectividad amperimétrica: basada en la diferencia de calibre. Selectividad temporal: retardo intencional en disyuntores de nivel superior. La combinación de ambas logra selectividad total."},
      {q:"¿Qué verificaciones periódicas se realizan en un MSB?",a:"Diarias: parámetros, alarmas. Mensuales: disparo de disyuntores, conexiones, limpieza. Anuales: protecciones, aislamiento, calibración de instrumentos."},
    ],
    pt:[
      {q:"O que é o MSB e quais são as suas funções principais?",a:"O MSB (Main Switchboard) é o centro de distribuição elétrica do navio. Funções: receber energia de todos os grupos, distribuir para quadros secundários e grandes consumidores, proteger a rede (disjuntores ACB), permitir o acoplamento em paralelo (sincronoscópio), medir e monitorizar os parâmetros da rede."},
      {q:"O que são as barras coletoras e por que alguns navios têm duas?",a:"Condutores de cobre maciço formando o ponto central de ligação do MSB. Dois meios-jogos de barras permitem: dividir a rede em duas partes independentes, manter o fornecimento a uma metade se a outra falhar, facilitar a manutenção sem corte total."},
      {q:"Qual é a diferença entre ACB, MCCB e MCB?",a:"ACB: disjuntor de alta potência para entradas de grupos e saídas principais. Calibres elevados. MCCB: disjuntor em caixa moldada para saídas secundárias. Calibres médios. MCB: pequeno disjuntor para circuitos terminais. Calibres baixos."},
      {q:"O que é o ESB e que circuitos deve alimentar segundo o SOLAS?",a:"Quadro independente alimentado pelo gerador de emergência. Circuitos obrigatórios: luzes de navegação, rádio de socorro e GMDSS, alarme de incêndio, iluminação de emergência, bomba de incêndio de emergência, controlos de portas corta-fogo."},
      {q:"Por que se usam transformadores na distribuição elétrica a bordo?",a:"Para adaptar a tensão: 440V→220V para iluminação, 440V→24V DC para controlo. Também para isolamento galvânico e estabilização de tensão em zonas afastadas do MSB."},
      {q:"Como se garante o equilíbrio de cargas entre grupos em paralelo?",a:"Potência ativa (kW): ajuste do governor. Potência reativa (kVAR): ajuste do AVR. Objetivo: igual fator de potência em cada grupo. Desequilíbrio cria correntes de circulação entre grupos."},
      {q:"O que é a secção de um cabo e como se escolhe?",a:"A secção (mm²) determina a capacidade de transporte de corrente. Escolha: calcular corrente nominal, aplicar fatores de correção, consultar tabelas, verificar queda de tensão admissível."},
      {q:"O que é a queda de tensão e quais são os limites admissíveis a bordo?",a:"ΔV = (2 × L × I × ρ) / S. Limites: circuitos de potência máx 5%, iluminação máx 3%, controlo máx 2%."},
      {q:"O que é um transformador de isolamento e por que se usa a bordo?",a:"Isola galvanicamente o circuito secundário do primário. Usado em circuitos médicos, tomadas em casas de banho e equipamentos de navegação sensíveis."},
      {q:"Como funciona um relé de proteção diferencial para alternador?",a:"Compara corrente entrante e sainte do enrolamento. Defeito interno cria desequilíbrio — quando corrente diferencial excede limiar, relé dispara disjuntor instantaneamente."},
      {q:"O que é seletividade corrente e seletividade temporal?",a:"Seletividade corrente: baseada na diferença de calibre. Seletividade temporal: retardo intencional nos disjuntores de nível superior. Combinação de ambas garante seletividade total."},
      {q:"Que verificações periódicas se devem realizar no MSB?",a:"Diárias: parâmetros, alarmes. Mensais: disparo de disjuntores, ligações, limpeza. Anuais: proteções, isolamento, calibração de instrumentos."},
    ],
  };
  return banks[lang]||banks.fr;
}

function getQuiz(lang: string) {
  const quizzes: any = {
    fr:[
      {q:"Quel est le rôle principal du MSB (Main Switchboard) ?",opts:["Contrôler la vitesse du moteur principal","Recevoir l'énergie des groupes et la distribuer à bord","Mesurer la température des moteurs","Réguler la pression de la vapeur"],correct:1,exp:"Le MSB (Main Switchboard) est le tableau principal qui reçoit l'énergie de tous les groupes électrogènes et la distribue à l'ensemble du navire via les tableaux secondaires et circuits de distribution."},
      {q:"Quel type de câble est obligatoire selon SOLAS pour les circuits d'alarme incendie ?",opts:["XLPE standard","LSF sans halogène","MICC minéral","SWA armé"],correct:2,exp:"Les câbles MICC (Mineral Insulated Copper Conductor) sont obligatoires SOLAS pour les circuits vitaux devant fonctionner en cas d'incendie. Leur isolation en poudre de magnésium résiste à plus de 1000°C."},
      {q:"Pour assurer la sélectivité, quelle relation doit exister entre les calibres des disjoncteurs ?",opts:["In(ACB) < In(MCCB) < In(MCB)","In(MCB) < In(MCCB) < In(ACB)","Tous les disjoncteurs doivent avoir le même calibre","In(MCCB) = In(ACB)"],correct:1,exp:"La sélectivité exige que In(MCB) < In(MCCB) < In(ACB). Ainsi, en cas de défaut, le disjoncteur de calibre le plus faible (le plus proche du défaut) déclenche le premier, laissant les circuits en amont alimentés."},
      {q:"Qu'est-ce que l'ESB (Emergency Switchboard) ?",opts:["Le tableau de distribution secondaire","Le tableau alimenté par le groupe de secours pour les circuits vitaux SOLAS","Le tableau de contrôle du moteur principal","Le panneau de synchronisation des groupes"],correct:1,exp:"L'ESB (Emergency Switchboard) est le tableau de secours alimenté par le groupe électrogène de secours. Il alimente les circuits vitaux SOLAS (navigation, communication, pompe incendie, éclairage secours) en cas de panne du MSB."},
      {q:"Pour un moteur triphasé 440V / 10 kW / cos φ = 0,85, quel est approximativement le courant nominal ?",opts:["7,7 A","15,4 A","30,8 A","46,2 A"],correct:1,exp:"I = P / (√3 × U × cos φ) = 10000 / (1,732 × 440 × 0,85) = 10000 / 648 = 15,4 A. Avec le coefficient de sécurité moteur (×1,25) : 19,3 A. On choisira un MCCB calibré à 20A et un câble de 4mm²."},
    ],
    en:[
      {q:"What is the main role of the MSB (Main Switchboard)?",opts:["Control main engine speed","Receive generator power and distribute it on board","Measure motor temperatures","Regulate steam pressure"],correct:1,exp:"The MSB (Main Switchboard) is the main switchboard receiving power from all generating sets and distributing it throughout the vessel via secondary switchboards and distribution circuits."},
      {q:"Which cable type is SOLAS mandatory for fire alarm circuits?",opts:["Standard XLPE","LSF halogen-free","MICC mineral","SWA armoured"],correct:2,exp:"MICC (Mineral Insulated Copper Conductor) cables are SOLAS mandatory for vital circuits that must function during a fire. Their magnesium powder insulation withstands over 1000°C."},
      {q:"For selectivity, what relationship must exist between breaker ratings?",opts:["In(ACB) < In(MCCB) < In(MCB)","In(MCB) < In(MCCB) < In(ACB)","All breakers must have the same rating","In(MCCB) = In(ACB)"],correct:1,exp:"Selectivity requires In(MCB) < In(MCCB) < In(ACB). Thus on a fault, the lowest-rated breaker (closest to the fault) trips first, leaving upstream circuits energised."},
      {q:"What is the ESB (Emergency Switchboard)?",opts:["The secondary distribution switchboard","The switchboard fed by the emergency generator for SOLAS vital circuits","The main engine control panel","The generator synchronising panel"],correct:1,exp:"The ESB is fed by the emergency generator and supplies SOLAS vital circuits (navigation, communication, fire pump, emergency lighting) on MSB failure."},
      {q:"For a 440V / 10 kW / cos φ = 0.85 three-phase motor, what is the approximate nominal current?",opts:["7.7 A","15.4 A","30.8 A","46.2 A"],correct:1,exp:"I = P / (√3 × U × cos φ) = 10000 / (1.732 × 440 × 0.85) = 15.4 A. With motor safety factor (×1.25): 19.3 A. Select a 20A MCCB and 4mm² cable."},
    ],
    es:[
      {q:"¿Cuál es la función principal del MSB?",opts:["Controlar la velocidad del motor principal","Recibir la energía de los grupos y distribuirla a bordo","Medir las temperaturas de los motores","Regular la presión del vapor"],correct:1,exp:"El MSB recibe la energía de todos los grupos electrógenos y la distribuye por todo el buque mediante cuadros secundarios y circuitos de distribución."},
      {q:"¿Qué tipo de cable es obligatorio según SOLAS para los circuitos de alarma de incendios?",opts:["XLPE estándar","LSF sin halógenos","MICC mineral","SWA armado"],correct:2,exp:"Los cables MICC son obligatorios SOLAS para circuitos vitales que deben funcionar en caso de incendio. Su aislamiento en polvo de magnesio resiste más de 1000°C."},
      {q:"Para asegurar la selectividad, ¿qué relación debe existir entre los calibres?",opts:["In(ACB) < In(MCCB) < In(MCB)","In(MCB) < In(MCCB) < In(ACB)","Todos iguales","In(MCCB) = In(ACB)"],correct:1,exp:"La selectividad exige In(MCB) < In(MCCB) < In(ACB). En caso de fallo, el disyuntor de menor calibre (más cercano al fallo) dispara primero."},
      {q:"¿Qué es el ESB?",opts:["El cuadro de distribución secundario","El cuadro alimentado por el grupo de emergencia para circuitos vitales SOLAS","El panel de control del motor principal","El panel de sincronización"],correct:1,exp:"El ESB es alimentado por el generador de emergencia y suministra los circuitos vitales SOLAS en caso de fallo del MSB."},
      {q:"Para un motor trifásico 440V / 10 kW / cos φ = 0,85, ¿cuál es aproximadamente la corriente nominal?",opts:["7,7 A","15,4 A","30,8 A","46,2 A"],correct:1,exp:"I = P / (√3 × U × cos φ) = 10000 / (1,732 × 440 × 0,85) = 15,4 A. Con coeficiente de seguridad (×1,25): 19,3 A."},
    ],
    pt:[
      {q:"Qual é o papel principal do MSB?",opts:["Controlar a velocidade do motor principal","Receber energia dos grupos e distribuí-la a bordo","Medir temperaturas dos motores","Regular a pressão do vapor"],correct:1,exp:"O MSB recebe energia de todos os grupos geradores e distribui-a pelo navio através de quadros secundários e circuitos de distribuição."},
      {q:"Que tipo de cabo é obrigatório segundo o SOLAS para circuitos de alarme de incêndio?",opts:["XLPE padrão","LSF sem halogénios","MICC mineral","SWA armado"],correct:2,exp:"Os cabos MICC são obrigatórios SOLAS para circuitos vitais que devem funcionar durante um incêndio. O isolamento em pó de magnésio resiste a mais de 1000°C."},
      {q:"Para garantir a seletividade, que relação deve existir entre os calibres?",opts:["In(ACB) < In(MCCB) < In(MCB)","In(MCB) < In(MCCB) < In(ACB)","Todos iguais","In(MCCB) = In(ACB)"],correct:1,exp:"A seletividade exige In(MCB) < In(MCCB) < In(ACB). Em caso de defeito, o disjuntor de menor calibre (mais próximo do defeito) dispara primeiro."},
      {q:"O que é o ESB?",opts:["O quadro de distribuição secundário","O quadro alimentado pelo gerador de emergência para circuitos vitais SOLAS","O painel de controlo do motor principal","O painel de sincronização"],correct:1,exp:"O ESB é alimentado pelo gerador de emergência e fornece os circuitos vitais SOLAS em caso de falha do MSB."},
      {q:"Para um motor trifásico 440V / 10 kW / cos φ = 0,85, qual é aproximadamente a corrente nominal?",opts:["7,7 A","15,4 A","30,8 A","46,2 A"],correct:1,exp:"I = P / (√3 × U × cos φ) = 10000 / (1,732 × 440 × 0,85) = 15,4 A. Com fator de segurança (×1,25): 19,3 A."},
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
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.gold,marginBottom:14}}>📚 {l.title}</div>
      {bank.map((item:any,i:number)=>(
        <div key={i} style={{marginBottom:8,borderRadius:12,background:`${C.navy2}cc`,border:`1px solid ${C.panel}22`,overflow:"hidden"}}>
          <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",padding:"12px 14px",background:"none",border:"none",display:"flex",justifyContent:"space-between",alignItems:"flex-start",cursor:"pointer",textAlign:"left",gap:10}}>
            <span style={{fontSize:12,color:"rgba(240,244,255,0.8)",fontFamily:"Courier New",lineHeight:1.5}}><span style={{color:C.panel,fontWeight:700,marginRight:6}}>Q{i+1}.</span>{item.q}</span>
            <span style={{color:C.panel,fontSize:14,flexShrink:0}}>{open===i?"▲":"▼"}</span>
          </button>
          {open===i&&(
            <div style={{padding:"0 14px 12px"}}>
              <button onClick={()=>setShowAns(p=>({...p,[i]:!p[i]}))} style={{padding:"6px 12px",borderRadius:8,fontSize:10,cursor:"pointer",background:showAns[i]?`${C.panel}22`:"rgba(255,255,255,0.05)",border:`1px solid ${showAns[i]?C.panel:"rgba(255,255,255,0.12)"}`,color:showAns[i]?C.panel:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{showAns[i]?l.hide:l.show}</button>
              {showAns[i]&&<div style={{marginTop:8,padding:10,borderRadius:8,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.panel}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{item.a}</div>}
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
  const optColors=[C.elec,C.panel,C.safe,C.phase];

  if(done) return (
    <div style={{padding:"24px 14px"}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:42,marginBottom:8}}>🔌</div>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:36,fontWeight:900,color:C.gold2,marginBottom:4}}>{xp}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{l.xpLabel}</div>
        <div style={{marginTop:8,fontSize:14,color:"#f0f4ff",fontFamily:"Courier New"}}>Score : {score}/{quiz.length}</div>
      </div>
      <div style={{borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.gold}44`,padding:14,marginBottom:16}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:11,color:C.gold,marginBottom:10}}>✦ {l.summary}</div>
        {t.kp.map((k:string,i:number)=>(
          <div key={i} style={{display:"flex",gap:8,marginBottom:6,fontSize:11,color:"rgba(240,244,255,0.7)",fontFamily:"Courier New",lineHeight:1.5}}>
            <span style={{color:C.gold,flexShrink:0}}>✦</span><span>{k}</span>
          </div>
        ))}
      </div>
      <button onClick={()=>onComplete(xp)} style={{width:"100%",padding:"15px 0",border:"none",borderRadius:14,background:"linear-gradient(135deg,#e8b94f,#4da6ff)",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:"#060e1a",cursor:"pointer"}}>🔌 {l.finish}</button>
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
        <div style={{fontSize:11,color:C.gold2,fontFamily:"Courier New"}}>⭐ {score}/{quiz.length}</div>
      </div>
      <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",marginBottom:14}}>
        <div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C.panel},${C.gold})`,width:`${(cur/quiz.length)*100}%`,transition:"width 0.4s"}}/>
      </div>
      <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New",marginBottom:16,padding:12,borderRadius:10,background:`${C.navy2}cc`,border:`1px solid ${C.panel}22`}}>{q.q}</div>
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
        ?<button onClick={handleConfirm} disabled={selected===null} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:selected!==null?`linear-gradient(135deg,${C.panel},${C.gold})`:"rgba(255,255,255,0.06)",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:selected!==null?"#060e1a":"rgba(240,244,255,0.25)",cursor:selected!==null?"pointer":"default",letterSpacing:1}}>{l.submit}</button>
        :<button onClick={handleNext} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.panel},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:"#060e1a",cursor:"pointer",letterSpacing:1}}>{cur+1>=quiz.length?l.finish:l.next}</button>
      }
    </div>
  );
}

export default function LessonE2_L2({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t=T[lang]||T.fr;
  const [tab,setTab]=useState(0);
  const progress=[25,50,75,90][tab]||25;
  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3},${C.navy})`,color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.panel}33`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"6px 12px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>◀</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:2,color:C.panel,marginBottom:2}}>{t.moduleLabel} · L2</div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:"#f0f4ff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.lessonTitle}</div>
          </div>
          <div style={{fontSize:11,color:C.gold2,fontFamily:"Courier New",flexShrink:0}}>{progress}%</div>
        </div>
        <div style={{height:2,background:"rgba(255,255,255,0.06)"}}>
          <div style={{height:"100%",background:`linear-gradient(90deg,${C.panel},${C.gold})`,width:`${progress}%`,transition:"width 0.4s"}}/>
        </div>
      </div>
      <div style={{padding:"10px 14px 0"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:8,background:`${C.gold}18`,border:`1px solid ${C.gold}44`}}>
          <span style={{fontSize:12}}>🔌</span>
          <span style={{fontFamily:"'Cinzel',serif",fontSize:9,color:C.gold,letterSpacing:1}}>MACHINE · AUXILIAIRES · PREMIUM</span>
        </div>
      </div>
      <div style={{display:"flex",padding:"10px 14px 0",gap:6,overflowX:"auto",scrollbarWidth:"none"}}>
        {t.tabs.map((label:string,i:number)=>(
          <button key={i} onClick={()=>setTab(i)} style={{padding:"8px 12px",borderRadius:10,fontSize:11,cursor:"pointer",whiteSpace:"nowrap",background:tab===i?`${C.panel}22`:"rgba(255,255,255,0.04)",border:`1px solid ${tab===i?C.panel:"rgba(255,255,255,0.1)"}`,color:tab===i?C.panel:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{label}</button>
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
