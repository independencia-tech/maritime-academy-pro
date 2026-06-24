// LessonE2_L7 — Dépannage électrique | PART 1
import { useState } from "react";

const C = {
  elec:"#4da6ff", fault:"#f97316", meter:"#6dbf8a",
  protect:"#c084fc", safe:"#6dbf8a", danger:"#e74c3c",
  gold:"#c9922a", gold2:"#e8b94f",
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
};

const T: any = {
  fr:{
    moduleLabel:"MACHINE — AUXILIAIRES",
    lessonTitle:"Dépannage électrique",
    intro:"Le dépannage électrique à bord exige méthode, sécurité et connaissance des instruments. Un mécanicien qui maîtrise la lecture d'un schéma, l'utilisation d'un multimètre et la procédure de consignation peut résoudre 80% des pannes électriques en mer.",
    tabs:["📖 Contenu","✏️ Pratique","📚 Banque Q.","🎯 Quiz"],
    s1title:"🔍 Méthode de dépannage systématique",
    s1hint:"👆 Tapez une étape pour les détails",
    s2title:"⚡ Utilisation du multimètre",
    s2hint:"👆 Tapez une mesure pour voir la procédure",
    s3title:"🛡️ Procédure de consignation (LOTO)",
    s3hint:"👆 Tapez une étape de consignation",
    s4title:"⚠️ Pannes fréquentes & Diagnostic",
    s4hint:"👆 Tapez une panne pour le diagnostic",
    keypoints:"Points clés",
    kp:[
      "Toujours consigner (LOTO) avant toute intervention électrique — sans exception",
      "Un multimètre mesure tension (V), courant (A), résistance (Ω) et continuité",
      "La méthode systématique : alimentation → fusibles → disjoncteurs → câbles → charge",
      "Un défaut d'isolement (fuite à la terre) peut être mortel — tester l'isolement régulièrement",
      "Ne jamais travailler seul sur une installation haute tension (>1000V)",
    ],
    steps:{
      s1:{ name:"1. Sécurité d'abord", desc:"Avant tout diagnostic : consigner l'installation (LOTO), vérifier l'absence de tension (VAT), informer le chef mécanicien et inscrire dans le journal. Ne jamais supposer qu'un circuit est hors tension sans vérification." },
      s2:{ name:"2. Recueil d'informations", desc:"Interroger l'équipage : quand la panne s'est-elle produite ? Quel était le comportement du système avant ? Y a-t-il eu des alarmes, des odeurs, des bruits ? Consulter le journal machine et les alarmes enregistrées." },
      s3:{ name:"3. Inspection visuelle", desc:"Examiner l'installation : câbles brûlés, connexions corrodées ou desserrées, contacteurs grillés, fusibles fondus, disjoncteurs déclenchés. Souvent, la cause est visible à l'œil nu." },
      s4:{ name:"4. Analyse logique", desc:"Diviser le circuit en sections et tester méthodiquement. Partir de la source (alimentation) vers la charge. La méthode 'moitié-moitié' divise par 2 le nombre de tests nécessaires." },
      s5:{ name:"5. Tests et mesures", desc:"Utiliser le multimètre pour mesurer les tensions, courants et résistances. Comparer aux valeurs nominales du schéma. Un circuit correct a des tensions conformes aux spécifications." },
      s6:{ name:"6. Réparation et test", desc:"Réparer la cause identifiée. Tester le circuit réparé avec la charge déconnectée d'abord, puis en charge. Documenter la panne et la réparation dans le journal machine." },
    },
    measurements:{
      voltage:{ name:"Mesure de tension (V)", proc:"1. Sélectionner la gamme V AC ou V DC supérieure à la tension attendue. 2. Brancher la sonde rouge sur + (ou phase) et noire sur - (ou neutre). 3. Ne jamais ouvrir le circuit — mesure en parallèle. 4. Vérifier que la tension est conforme aux spécifications. Sécurité : vérifier l'état des sondes avant utilisation, ne jamais dépasser la tension nominale du multimètre." },
      current:{ name:"Mesure de courant (A)", proc:"1. Utiliser une pince ampèremétrique (clamp meter) pour les courants élevés — jamais en série sur un circuit de puissance sans pince. 2. Pour les petits courants : mettre le multimètre en série (circuit ouvert + multimètre). 3. Comparer au courant nominal de l'équipement. Un courant excessif → surcharge ou court-circuit. Sécurité : ne jamais brancher un multimètre en mode courant en parallèle sur un circuit — court-circuit garanti." },
      resistance:{ name:"Mesure de résistance (Ω)", proc:"1. CIRCUIT HORS TENSION obligatoire. 2. Déconnecter la charge pour éviter les mesures parasites. 3. Sélectionner la gamme Ω appropriée. 4. Brancher les sondes sur les bornes à mesurer. Interprétation : 0 Ω = court-circuit, ∞ Ω = circuit ouvert, valeur nominale = normal. Test de continuité : réglage sur 'bip' — émet un son si continuité (< 30 Ω)." },
      insulation:{ name:"Test d'isolement (MΩ)", proc:"1. Utiliser un mégohmmètre (Megger), pas un multimètre ordinaire. 2. CIRCUIT HORS TENSION — déconnecter toutes les charges. 3. Appliquer la tension de test (500V pour circuits 440V, 1000V pour 660V). 4. Valeurs : > 1 MΩ = correct, 0,5-1 MΩ = à surveiller, < 0,5 MΩ = problème d'isolement. Sécurité : les condensateurs peuvent retenir une charge après test — décharger avant de toucher." },
    },
    loto:{
      l1:{ name:"L — Localiser", desc:"Identifier toutes les sources d'énergie alimentant l'équipement : disjoncteurs principaux, auxiliaires, alimentation de contrôle, condensateurs, ressorts sous tension. Ne pas oublier les alimentations de secours." },
      l2:{ name:"O — Ouvrir / Isoler", desc:"Mettre hors tension tous les circuits d'alimentation : ouvrir les disjoncteurs, tirer les fusibles, fermer les vannes (énergie hydraulique/pneumatique). Utiliser des dispositifs de verrouillage appropriés." },
      l3:{ name:"T — Tirer / Verrouiller", desc:"Verrouiller chaque point d'isolement avec un cadenas personnel. Chaque intervenant pose son propre cadenas. Personne ne peut remettre sous tension sans l'accord de tous les intervenants." },
      l4:{ name:"O — Observer / Vérifier", desc:"Vérifier l'absence de tension avec un VAT (Vérificateur d'Absence de Tension) homologué sur TOUS les conducteurs (y compris neutre et terre). Tester le VAT avant et après utilisation." },
      l5:{ name:"T — Travailler en sécurité", desc:"Travailler avec les EPI appropriés : gants isolants, lunettes, vêtements anti-arc si nécessaire. Informer la passerelle et salle de contrôle. Mettre un panneau d'avertissement visible sur le tableau." },
    },
    faults:{
      nopower:{ name:"Pas de tension en sortie", diag:"1. Vérifier la tension en entrée du circuit. 2. Contrôler les fusibles (continuité). 3. Vérifier l'état du disjoncteur (déclenché ?). 4. Contrôler les connexions du câble (corrosion, desserrement). 5. Mesurer la tension à chaque point jusqu'à localiser la coupure.", causes:"Fusible fondu, disjoncteur déclenché (surcharge/court-circuit), câble coupé, connexion corrodée." },
      motornotstart:{ name:"Moteur ne démarre pas", diag:"1. Vérifier l'alimentation au démarreur (L1, L2, L3). 2. Contrôler le circuit de commande (24V DC) : bouton marche, contacts du contacteur, relais thermique. 3. Vérifier l'état du contacteur (contacts usés ?). 4. Mesurer la résistance des enroulements moteur (doivent être égaux entre phases).", causes:"Absence de tension, relais thermique déclenché (surcharge), contacteur défectueux, moteur en court-circuit ou circuit ouvert." },
      groundfault:{ name:"Défaut d'isolement (fuite à terre)", diag:"1. Utiliser le mégohmmètre pour identifier le circuit défectueux. 2. Sectionner les circuits un par un jusqu'à ce que l'alarme disparaisse. 3. Sur le circuit défectueux : déconnecter les équipements un par un pour isoler la source. 4. Inspecter les câbles et équipements (humidité, dégradation).", causes:"Humidité dans un moteur ou tableau, câble endommagé, connexion corrodée, isolant vieilli." },
      overload:{ name:"Disjoncteur déclenche en surcharge", diag:"1. Mesurer le courant de chaque phase à l'ampèremètre. 2. Comparer au courant nominal de l'équipement. 3. Si courant > In : vérifier la charge mécanique (rodage, blocage). 4. Si courant est normal → réglage du relais thermique incorrect. 5. Vérifier l'équilibre des 3 phases.", causes:"Surcharge mécanique, mauvais équilibrage des phases, relais thermique mal réglé, perte d'une phase." },
    },
    practiceTitle:"Exercice pratique",
    questions:[
      { q:"Décrivez la procédure complète de consignation LOTO avant une intervention sur un tableau électrique 440V.",
        a:"Procédure LOTO complète : 1. LOCALISER : identifier tous les disjoncteurs, fusibles et sources d'alimentation du tableau (y compris alimentation de contrôle 24V, alimentation de secours). Consulter le schéma électrique. 2. INFORMER : avertir le chef mécanicien et la passerelle. Inscrire dans le journal machine : heure, équipement, nature de l'intervention. 3. OUVRIR/ISOLER : ouvrir tous les disjoncteurs d'alimentation du tableau. Tirer les fusibles si présents. 4. VERROUILLER (LOCKOUT) : placer un cadenas personnel sur chaque dispositif d'isolement. Si plusieurs intervenants, chacun pose son propre cadenas. Placer un panneau 'EN COURS DE MAINTENANCE'. 5. ÉTIQUETER (TAGOUT) : accrocher une étiquette d'avertissement sur chaque point d'isolement avec : nom de l'intervenant, date, heure, nature des travaux. 6. VÉRIFIER L'ABSENCE DE TENSION (VAT) : utiliser un VAT homologué, tester L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N, et L-PE (terre). Tester le VAT avant et après sur une source connue. Uniquement après cette vérification → le travail peut commencer." },
      { q:"Un moteur triphasé 440V ne démarre pas. Décrivez votre procédure de diagnostic étape par étape.",
        a:"Procédure de diagnostic : 1. Sécurité d'abord : vérifier qu'il est sûr d'intervenir, informer l'équipe. 2. Inspection visuelle : état du câblage visible, disjoncteur déclenché ?, relais thermique déclenché (bouton rouge sorti) ?, voyant défaut allumé ?. 3. Circuit de puissance : mesurer la tension aux bornes du contacteur (entrée L1/L2/L3 et sortie T1/T2/T3). Si tension en entrée mais pas en sortie → contacteur ne ferme pas. 4. Circuit de commande (24V DC) : vérifier la tension aux bornes de la bobine du contacteur. Si tension et contacteur ne ferme pas → bobine ou contacteur défectueux. Si pas de tension → vérifier le circuit de commande (bouton marche, verrouillages, relais thermique). 5. Relais thermique : s'il a déclenché → reset puis mesurer le courant moteur sur les 3 phases. Si courant excessif → surcharge mécanique → inspecter la charge. 6. Résistance des enroulements : mégohmmètre sur les bornes moteur → si isolement < 0,5 MΩ → moteur humide ou défectueux." },
      { q:"Quelle est la différence entre un court-circuit et un défaut d'isolement ? Comment détecter chacun à bord ?",
        a:"Court-circuit : connexion directe entre deux conducteurs de phase différente (L1-L2, L1-L3, L2-L3) ou entre phase et neutre (L1-N). Le courant monte instantanément à des valeurs très élevées (10-20x In). Déclenche instantanément le disjoncteur ou fonde le fusible. Détection : mesure de résistance entre phases (= 0 Ω en court-circuit, devrait être > 1 MΩ moteur éteint). Défaut d'isolement : dégradation de l'isolation entre un conducteur sous tension et la coque/terre du navire. Le courant de fuite passe par la structure du navire. Peut être faible (mA) et ne pas déclencher les protections mais mettre en danger les personnes. Détection : mégohmmètre (mesure MΩ entre conducteur et terre) ou panneau de surveillance d'isolement du réseau (alarme si résistance d'isolement < seuil). IMPORTANT : à bord, le réseau électrique est isolé de la coque (IT — Isolé Terre). Un premier défaut d'isolement ne coupe pas l'alimentation mais une alarme se déclenche. Un deuxième défaut sur une autre phase = court-circuit mortelle." },
    ],
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
  },
  en:{
    moduleLabel:"ENGINE — AUXILIARIES",
    lessonTitle:"Electrical Troubleshooting",
    intro:"Electrical troubleshooting on board requires method, safety and instrument knowledge. An engineer who masters schematic reading, multimeter use and lockout/tagout procedure can solve 80% of electrical faults at sea.",
    tabs:["📖 Content","✏️ Practice","📚 Question Bank","🎯 Quiz"],
    s1title:"🔍 Systematic Troubleshooting Method",
    s1hint:"👆 Tap a step for details",
    s2title:"⚡ Multimeter Use",
    s2hint:"👆 Tap a measurement to see the procedure",
    s3title:"🛡️ Lockout/Tagout Procedure (LOTO)",
    s3hint:"👆 Tap a lockout step",
    s4title:"⚠️ Common Faults & Diagnosis",
    s4hint:"👆 Tap a fault for diagnosis",
    keypoints:"Key Points",
    kp:[
      "Always lockout/tagout (LOTO) before any electrical work — no exceptions",
      "A multimeter measures voltage (V), current (A), resistance (Ω) and continuity",
      "Systematic method: supply → fuses → breakers → cables → load",
      "Insulation fault (earth leakage) can be fatal — test insulation regularly",
      "Never work alone on high-voltage installations (>1000V)",
    ],
    steps:{
      s1:{ name:"1. Safety first", desc:"Before any diagnosis: lockout the installation (LOTO), verify absence of voltage (VAT), inform chief engineer and log. Never assume a circuit is de-energised without verification." },
      s2:{ name:"2. Gather information", desc:"Question the crew: when did the fault occur? How was the system behaving before? Any alarms, smells, noises? Check engine room log and recorded alarms." },
      s3:{ name:"3. Visual inspection", desc:"Examine the installation: burnt cables, corroded or loose connections, burnt contactors, blown fuses, tripped breakers. Often the cause is visible to the naked eye." },
      s4:{ name:"4. Logical analysis", desc:"Divide the circuit into sections and test methodically. Work from source (supply) toward load. The 'half-and-half' method halves the number of tests needed." },
      s5:{ name:"5. Tests and measurements", desc:"Use multimeter to measure voltages, currents and resistances. Compare to schematic nominal values. A correct circuit has voltages conforming to specifications." },
      s6:{ name:"6. Repair and test", desc:"Repair the identified cause. Test the repaired circuit with load disconnected first, then under load. Document fault and repair in engine room log." },
    },
    measurements:{
      voltage:{ name:"Voltage measurement (V)", proc:"1. Select AC V or DC V range above expected voltage. 2. Connect red probe to + (or phase) and black to - (or neutral). 3. Never open circuit — parallel measurement. 4. Verify voltage conforms to specifications. Safety: check probe condition before use, never exceed multimeter nominal voltage." },
      current:{ name:"Current measurement (A)", proc:"1. Use clamp meter for high currents — never in series on power circuit without clamp. 2. For small currents: put multimeter in series (open circuit + multimeter). 3. Compare to equipment nominal current. Excessive current → overload or short circuit. Safety: never connect multimeter in current mode in parallel on a circuit — guaranteed short circuit." },
      resistance:{ name:"Resistance measurement (Ω)", proc:"1. CIRCUIT MUST BE DE-ENERGISED. 2. Disconnect load to avoid spurious readings. 3. Select appropriate Ω range. 4. Connect probes to terminals to measure. Interpretation: 0 Ω = short circuit, ∞ Ω = open circuit, nominal value = normal. Continuity test: 'beep' setting — sounds if continuity (< 30 Ω)." },
      insulation:{ name:"Insulation test (MΩ)", proc:"1. Use megohmmeter (Megger), not ordinary multimeter. 2. CIRCUIT DE-ENERGISED — disconnect all loads. 3. Apply test voltage (500V for 440V circuits, 1000V for 660V). 4. Values: > 1 MΩ = correct, 0.5-1 MΩ = monitor, < 0.5 MΩ = insulation problem. Safety: capacitors may retain charge after test — discharge before touching." },
    },
    loto:{
      l1:{ name:"L — Locate", desc:"Identify all energy sources feeding the equipment: main and auxiliary circuit breakers, control supply, capacitors, springs under tension. Don't forget backup supplies." },
      l2:{ name:"O — Open / Isolate", desc:"De-energise all supply circuits: open circuit breakers, pull fuses, close valves (hydraulic/pneumatic energy). Use appropriate locking devices." },
      l3:{ name:"T — Tag / Lock", desc:"Lock each isolation point with a personal padlock. Each worker applies their own padlock. Nobody can re-energise without agreement from all workers." },
      l4:{ name:"O — Observe / Verify", desc:"Verify absence of voltage with an approved VAT on ALL conductors (including neutral and earth). Test VAT before and after use on a known live source." },
      l5:{ name:"T — Task safely", desc:"Work with appropriate PPE: insulating gloves, goggles, arc-flash clothing if necessary. Inform bridge and control room. Place visible warning sign on switchboard." },
    },
    faults:{
      nopower:{ name:"No output voltage", diag:"1. Check input circuit voltage. 2. Check fuses (continuity). 3. Check breaker state (tripped?). 4. Check cable connections (corrosion, looseness). 5. Measure voltage at each point until break located.", causes:"Blown fuse, tripped breaker (overload/short circuit), broken cable, corroded connection." },
      motornotstart:{ name:"Motor won't start", diag:"1. Check supply at starter (L1, L2, L3). 2. Check control circuit (24V DC): start button, contactor contacts, thermal relay. 3. Check contactor condition (worn contacts?). 4. Measure motor winding resistance (should be equal between phases).", causes:"No voltage, tripped thermal relay (overload), defective contactor, motor short circuit or open circuit." },
      groundfault:{ name:"Insulation fault (earth leakage)", diag:"1. Use megohmmeter to identify faulty circuit. 2. Isolate circuits one by one until alarm clears. 3. On faulty circuit: disconnect equipment one by one to isolate source. 4. Inspect cables and equipment (moisture, degradation).", causes:"Moisture in motor or switchboard, damaged cable, corroded connection, aged insulation." },
      overload:{ name:"Breaker trips on overload", diag:"1. Measure current on each phase with ammeter. 2. Compare to equipment nominal current. 3. If current > In: check mechanical load (seizing, blockage). 4. If current normal → thermal relay setting incorrect. 5. Check 3-phase balance.", causes:"Mechanical overload, phase imbalance, incorrect thermal relay setting, loss of one phase." },
    },
    practiceTitle:"Practice Exercise",
    questions:[
      { q:"Describe the complete LOTO lockout/tagout procedure before working on a 440V switchboard.",
        a:"Complete LOTO procedure: 1. LOCATE: identify all circuit breakers, fuses and supply sources (including 24V DC control supply, backup supply). Consult electrical schematic. 2. INFORM: notify chief engineer and bridge. Log in engine room log: time, equipment, nature of work. 3. OPEN/ISOLATE: open all supply circuit breakers. Pull fuses if present. 4. LOCK OUT: apply personal padlock to each isolation device. If multiple workers, each applies own padlock. Place 'UNDER MAINTENANCE' sign. 5. TAG OUT: attach warning tag to each isolation point with: worker name, date, time, nature of work. 6. VERIFY ABSENCE OF VOLTAGE (VAT): use approved VAT, test L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N, and L-PE (earth). Test VAT before and after on known live source. Only after this verification → work may begin." },
      { q:"A 440V three-phase motor won't start. Describe your step-by-step diagnostic procedure.",
        a:"Diagnostic procedure: 1. Safety first: verify safe to work, inform team. 2. Visual inspection: visible wiring condition, tripped breaker?, tripped thermal relay (red button out)?, fault indicator lit?. 3. Power circuit: measure voltage at contactor terminals (input L1/L2/L3 and output T1/T2/T3). If voltage in but not out → contactor not closing. 4. Control circuit (24V DC): check voltage at contactor coil terminals. If voltage and contactor not closing → coil or contactor defective. If no voltage → check control circuit (start button, interlocks, thermal relay). 5. Thermal relay: if tripped → reset then measure motor current on all 3 phases. If excessive → mechanical overload → inspect load. 6. Winding resistance: megohmmeter on motor terminals → if insulation < 0.5 MΩ → motor damp or defective." },
      { q:"What is the difference between a short circuit and an insulation fault? How to detect each on board?",
        a:"Short circuit: direct connection between two different phase conductors (L1-L2, L1-L3, L2-L3) or between phase and neutral. Current instantly rises to very high values (10-20× In). Instantly trips breaker or blows fuse. Detection: resistance measurement between phases (= 0 Ω in short circuit, should be > 1 MΩ with motor off). Insulation fault: degradation of insulation between a live conductor and the vessel hull/earth. Leakage current passes through vessel structure. May be small (mA) and not trip protections but endanger people. Detection: megohmmeter (MΩ measurement between conductor and earth) or network insulation monitoring panel (alarm if insulation resistance < threshold). IMPORTANT: on board, the electrical network is isolated from the hull (IT — Isolated Terra). A first insulation fault doesn't cut supply but triggers an alarm. A second fault on another phase = fatal short circuit." },
    ],
    showAnswer:"Show answer", hideAnswer:"Hide",
  },
  es:{
    moduleLabel:"MÁQUINAS — AUXILIARES",
    lessonTitle:"Resolución de averías eléctricas",
    intro:"La resolución de averías eléctricas a bordo exige método, seguridad y conocimiento de los instrumentos. Un maquinista que domina la lectura de esquemas, el uso del multímetro y el procedimiento LOTO puede resolver el 80% de las averías eléctricas en el mar.",
    tabs:["📖 Contenido","✏️ Práctica","📚 Banco Q.","🎯 Quiz"],
    s1title:"🔍 Método sistemático de resolución",
    s1hint:"👆 Toca un paso para los detalles",
    s2title:"⚡ Uso del multímetro",
    s2hint:"👆 Toca una medida para ver el procedimiento",
    s3title:"🛡️ Procedimiento LOTO",
    s3hint:"👆 Toca un paso del LOTO",
    s4title:"⚠️ Averías frecuentes & Diagnóstico",
    s4hint:"👆 Toca una avería para el diagnóstico",
    keypoints:"Puntos clave",
    kp:[
      "Siempre aplicar LOTO antes de cualquier intervención eléctrica — sin excepciones",
      "Un multímetro mide tensión (V), corriente (A), resistencia (Ω) y continuidad",
      "Método sistemático: alimentación → fusibles → disyuntores → cables → carga",
      "Un defecto de aislamiento puede ser mortal — probar el aislamiento regularmente",
      "Nunca trabajar solo en instalaciones de alta tensión (>1000V)",
    ],
    steps:{
      s1:{ name:"1. Seguridad primero", desc:"Antes de cualquier diagnóstico: consignar la instalación (LOTO), verificar ausencia de tensión (VAT), informar al jefe de máquinas y anotar en el diario. Nunca suponer que un circuito está desenergizado sin verificación." },
      s2:{ name:"2. Recogida de información", desc:"Interrogar a la tripulación: ¿cuándo ocurrió la avería? ¿Cómo se comportaba el sistema antes? ¿Hubo alarmas, olores, ruidos? Consultar el diario de máquinas y las alarmas registradas." },
      s3:{ name:"3. Inspección visual", desc:"Examinar la instalación: cables quemados, conexiones corroídas o aflojadas, contactores quemados, fusibles fundidos, disyuntores disparados. A menudo la causa es visible a simple vista." },
      s4:{ name:"4. Análisis lógico", desc:"Dividir el circuito en secciones y probar metódicamente. Partir de la fuente (alimentación) hacia la carga. El método 'mitad-mitad' reduce a la mitad el número de pruebas necesarias." },
      s5:{ name:"5. Pruebas y mediciones", desc:"Usar el multímetro para medir tensiones, corrientes y resistencias. Comparar con los valores nominales del esquema. Un circuito correcto tiene tensiones conformes a las especificaciones." },
      s6:{ name:"6. Reparación y prueba", desc:"Reparar la causa identificada. Probar el circuito reparado con la carga desconectada primero, luego en carga. Documentar la avería y la reparación en el diario de máquinas." },
    },
    measurements:{
      voltage:{ name:"Medición de tensión (V)", proc:"1. Seleccionar la escala V AC o V DC superior a la tensión esperada. 2. Conectar sonda roja en + (o fase) y negra en - (o neutro). 3. Nunca abrir el circuito — medición en paralelo. 4. Verificar que la tensión es conforme a las especificaciones. Seguridad: verificar el estado de las sondas, no superar la tensión nominal del multímetro." },
      current:{ name:"Medición de corriente (A)", proc:"1. Usar una pinza amperimétrica para corrientes elevadas. 2. Para pequeñas corrientes: poner el multímetro en serie. 3. Comparar con la corriente nominal del equipo. Corriente excesiva → sobrecarga o cortocircuito. Seguridad: nunca conectar el multímetro en modo corriente en paralelo — cortocircuito garantizado." },
      resistance:{ name:"Medición de resistencia (Ω)", proc:"1. CIRCUITO SIN TENSIÓN obligatorio. 2. Desconectar la carga para evitar mediciones parásitas. 3. Seleccionar la escala Ω apropiada. 4. Conectar las sondas en los bornes. Interpretación: 0 Ω = cortocircuito, ∞ Ω = circuito abierto, valor nominal = normal." },
      insulation:{ name:"Prueba de aislamiento (MΩ)", proc:"1. Usar un megóhmetro (Megger). 2. CIRCUITO SIN TENSIÓN — desconectar todas las cargas. 3. Aplicar tensión de prueba (500V para circuitos de 440V). 4. Valores: > 1 MΩ = correcto, 0,5-1 MΩ = vigilar, < 0,5 MΩ = problema de aislamiento. Seguridad: los condensadores pueden retener carga — descargar antes de tocar." },
    },
    loto:{
      l1:{ name:"L — Localizar", desc:"Identificar todas las fuentes de energía: disyuntores principales y auxiliares, alimentación de control, condensadores, resortes bajo tensión. No olvidar las alimentaciones de socorro." },
      l2:{ name:"O — Abrir / Aislar", desc:"Desenergizar todos los circuitos: abrir disyuntores, sacar fusibles, cerrar válvulas. Usar dispositivos de bloqueo apropiados." },
      l3:{ name:"T — Bloquear / Etiquetar", desc:"Bloquear cada punto de aislamiento con un candado personal. Cada trabajador pone su propio candado. Nadie puede reenergizar sin el acuerdo de todos." },
      l4:{ name:"O — Verificar ausencia de tensión", desc:"Verificar la ausencia de tensión con un VAT homologado en TODOS los conductores. Probar el VAT antes y después en una fuente conocida." },
      l5:{ name:"T — Trabajar con seguridad", desc:"Trabajar con los EPI apropiados: guantes aislantes, gafas, ropa anti-arco si es necesario. Informar al puente. Colocar un cartel de advertencia visible en el cuadro." },
    },
    faults:{
      nopower:{ name:"Sin tensión en salida", diag:"1. Verificar tensión en entrada. 2. Controlar fusibles. 3. Verificar estado del disyuntor. 4. Controlar conexiones del cable. 5. Medir tensión en cada punto hasta localizar la interrupción.", causes:"Fusible fundido, disyuntor disparado, cable cortado, conexión corroída." },
      motornotstart:{ name:"Motor no arranca", diag:"1. Verificar alimentación en el arrancador (L1, L2, L3). 2. Controlar circuito de mando (24V DC): pulsador, contactos del contactor, relé térmico. 3. Verificar estado del contactor. 4. Medir resistencia de los bobinados.", causes:"Falta de tensión, relé térmico disparado, contactor defectuoso, motor en cortocircuito o circuito abierto." },
      groundfault:{ name:"Defecto de aislamiento (fuga a tierra)", diag:"1. Usar megóhmetro para identificar el circuito defectuoso. 2. Seccionar los circuitos uno a uno. 3. Desconectar equipos uno a uno. 4. Inspeccionar cables y equipos.", causes:"Humedad en motor o cuadro, cable dañado, conexión corroída, aislante envejecido." },
      overload:{ name:"Disyuntor dispara por sobrecarga", diag:"1. Medir corriente en cada fase. 2. Comparar con la corriente nominal. 3. Si corriente > In: verificar carga mecánica. 4. Si corriente normal → ajuste incorrecto del relé térmico. 5. Verificar equilibrio de las 3 fases.", causes:"Sobrecarga mecánica, desequilibrio de fases, relé térmico mal ajustado, pérdida de una fase." },
    },
    practiceTitle:"Ejercicio práctico",
    questions:[
      { q:"Describa el procedimiento completo LOTO antes de una intervención en un cuadro eléctrico de 440V.",
        a:"1. LOCALIZAR: identificar todos los disyuntores, fusibles y fuentes (incluyendo 24V DC, socorro). Consultar el esquema eléctrico. 2. INFORMAR: avisar al jefe de máquinas y al puente. Anotar en el diario. 3. ABRIR/AISLAR: abrir todos los disyuntores, sacar fusibles. 4. BLOQUEAR: poner un candado personal en cada punto de aislamiento. Panel 'EN MANTENIMIENTO'. 5. ETIQUETAR: colgar una etiqueta en cada punto con nombre, fecha, hora, naturaleza. 6. VERIFICAR AUSENCIA DE TENSIÓN: usar VAT homologado en L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N y tierra. Probar VAT antes y después en fuente conocida." },
      { q:"Un motor trifásico de 440V no arranca. Describa su procedimiento de diagnóstico paso a paso.",
        a:"1. Seguridad: verificar que es seguro intervenir. 2. Inspección visual: cableado, disyuntor disparado, relé térmico disparado, testigo de fallo. 3. Circuito de potencia: medir tensión en bornes del contactor (entrada L1/L2/L3 y salida T1/T2/T3). 4. Circuito de mando (24V DC): verificar tensión en la bobina del contactor. 5. Relé térmico: si disparado → resetear y medir corriente en las 3 fases. 6. Resistencia de bobinados: megóhmetro en bornes del motor → si aislamiento < 0,5 MΩ → motor húmedo o defectuoso." },
      { q:"¿Cuál es la diferencia entre un cortocircuito y un defecto de aislamiento? ¿Cómo detectar cada uno?",
        a:"Cortocircuito: conexión directa entre conductores de diferente fase o fase-neutro. La corriente sube instantáneamente a valores muy altos. Dispara el disyuntor o funde el fusible. Detección: resistencia entre fases (= 0 Ω en cortocircuito). Defecto de aislamiento: degradación del aislamiento entre conductor bajo tensión y la carcasa/tierra. La corriente de fuga puede ser pequeña y no disparar las protecciones pero poner en peligro a las personas. Detección: megóhmetro o panel de vigilancia de aislamiento. IMPORTANTE: a bordo, la red está aislada de la carcasa (red IT). Un primer defecto no corta el suministro pero activa una alarma. Un segundo defecto en otra fase = cortocircuito mortal." },
    ],
    showAnswer:"Ver corrección", hideAnswer:"Ocultar",
  },
  pt:{
    moduleLabel:"MÁQUINAS — AUXILIARES",
    lessonTitle:"Resolução de avarias elétricas",
    intro:"A resolução de avarias elétricas a bordo exige método, segurança e conhecimento dos instrumentos. Um maquinista que domina a leitura de esquemas, o uso do multímetro e o procedimento LOTO pode resolver 80% das avarias elétricas no mar.",
    tabs:["📖 Conteúdo","✏️ Prática","📚 Banco Q.","🎯 Quiz"],
    s1title:"🔍 Método sistemático de resolução",
    s1hint:"👆 Toque num passo para os detalhes",
    s2title:"⚡ Uso do multímetro",
    s2hint:"👆 Toque numa medição para ver o procedimento",
    s3title:"🛡️ Procedimento de consignação (LOTO)",
    s3hint:"👆 Toque num passo da consignação",
    s4title:"⚠️ Avarias frequentes & Diagnóstico",
    s4hint:"👆 Toque numa avaria para o diagnóstico",
    keypoints:"Pontos-chave",
    kp:[
      "Sempre consignar (LOTO) antes de qualquer intervenção elétrica — sem exceções",
      "Um multímetro mede tensão (V), corrente (A), resistência (Ω) e continuidade",
      "Método sistemático: alimentação → fusíveis → disjuntores → cabos → carga",
      "Um defeito de isolamento pode ser mortal — testar o isolamento regularmente",
      "Nunca trabalhar sozinho em instalações de alta tensão (>1000V)",
    ],
    steps:{
      s1:{ name:"1. Segurança primeiro", desc:"Antes de qualquer diagnóstico: consignar a instalação (LOTO), verificar ausência de tensão (VAT), informar o chefe de máquinas e registar no diário. Nunca assumir que um circuito está sem tensão sem verificação." },
      s2:{ name:"2. Recolha de informações", desc:"Interrogar a tripulação: quando ocorreu a avaria? Como se comportava o sistema antes? Houve alarmes, cheiros, ruídos? Consultar o diário de máquinas e os alarmes registados." },
      s3:{ name:"3. Inspeção visual", desc:"Examinar a instalação: cabos queimados, ligações corroídas ou soltas, contactores queimados, fusíveis fundidos, disjuntores disparados. Muitas vezes a causa é visível a olho nu." },
      s4:{ name:"4. Análise lógica", desc:"Dividir o circuito em secções e testar metodicamente. Partir da fonte (alimentação) para a carga. O método 'metade-metade' reduz à metade o número de testes necessários." },
      s5:{ name:"5. Testes e medições", desc:"Usar o multímetro para medir tensões, correntes e resistências. Comparar com os valores nominais do esquema. Um circuito correto tem tensões conformes às especificações." },
      s6:{ name:"6. Reparação e teste", desc:"Reparar a causa identificada. Testar o circuito reparado com a carga desligada primeiro, depois em carga. Documentar a avaria e a reparação no diário de máquinas." },
    },
    measurements:{
      voltage:{ name:"Medição de tensão (V)", proc:"1. Selecionar a escala V AC ou V DC superior à tensão esperada. 2. Ligar sonda vermelha em + (ou fase) e preta em - (ou neutro). 3. Nunca abrir o circuito — medição em paralelo. 4. Verificar que a tensão está conforme às especificações. Segurança: verificar estado das sondas, não exceder a tensão nominal do multímetro." },
      current:{ name:"Medição de corrente (A)", proc:"1. Usar alicate amperimétrico para correntes elevadas. 2. Para pequenas correntes: colocar o multímetro em série. 3. Comparar com a corrente nominal do equipamento. Corrente excessiva → sobrecarga ou curto-circuito. Segurança: nunca ligar multímetro em modo corrente em paralelo — curto-circuito garantido." },
      resistance:{ name:"Medição de resistência (Ω)", proc:"1. CIRCUITO SEM TENSÃO obrigatório. 2. Desligar a carga para evitar medições parasitas. 3. Selecionar a escala Ω adequada. 4. Ligar sondas nos bornes. Interpretação: 0 Ω = curto-circuito, ∞ Ω = circuito aberto, valor nominal = normal." },
      insulation:{ name:"Teste de isolamento (MΩ)", proc:"1. Usar megóhmetro (Megger). 2. CIRCUITO SEM TENSÃO — desligar todas as cargas. 3. Aplicar tensão de teste (500V para circuitos de 440V). 4. Valores: > 1 MΩ = correto, 0,5-1 MΩ = vigiar, < 0,5 MΩ = problema de isolamento. Segurança: os condensadores podem reter carga — descarregar antes de tocar." },
    },
    loto:{
      l1:{ name:"L — Localizar", desc:"Identificar todas as fontes de energia: disjuntores principais e auxiliares, alimentação de controlo, condensadores, molas sob tensão. Não esquecer as alimentações de socorro." },
      l2:{ name:"O — Abrir / Isolar", desc:"Desenerqizar todos os circuitos: abrir disjuntores, retirar fusíveis, fechar válvulas. Usar dispositivos de bloqueio apropriados." },
      l3:{ name:"T — Bloquear / Etiquetar", desc:"Bloquear cada ponto de isolamento com um cadeado pessoal. Cada trabalhador coloca o seu cadeado. Ninguém pode reenergizar sem acordo de todos." },
      l4:{ name:"O — Verificar ausência de tensão", desc:"Verificar ausência de tensão com VAT homologado em TODOS os condutores. Testar VAT antes e depois em fonte conhecida." },
      l5:{ name:"T — Trabalhar com segurança", desc:"Trabalhar com EPI adequados: luvas isolantes, óculos, roupa anti-arco se necessário. Informar a ponte. Colocar aviso visível no quadro." },
    },
    faults:{
      nopower:{ name:"Sem tensão na saída", diag:"1. Verificar tensão na entrada. 2. Controlar fusíveis. 3. Verificar estado do disjuntor. 4. Controlar ligações do cabo. 5. Medir tensão em cada ponto até localizar a interrupção.", causes:"Fusível fundido, disjuntor disparado, cabo cortado, ligação corroída." },
      motornotstart:{ name:"Motor não arranca", diag:"1. Verificar alimentação no arrancador (L1, L2, L3). 2. Controlar circuito de comando (24V DC): botão, contactos do contactor, relé térmico. 3. Verificar estado do contactor. 4. Medir resistência dos enrolamentos.", causes:"Falta de tensão, relé térmico disparado, contactor defeituoso, motor em curto-circuito ou circuito aberto." },
      groundfault:{ name:"Defeito de isolamento (fuga à terra)", diag:"1. Usar megóhmetro para identificar o circuito com defeito. 2. Seccionar circuitos um a um. 3. Desligar equipamentos um a um. 4. Inspecionar cabos e equipamentos.", causes:"Humidade em motor ou quadro, cabo danificado, ligação corroída, isolante envelhecido." },
      overload:{ name:"Disjuntor dispara por sobrecarga", diag:"1. Medir corrente em cada fase. 2. Comparar com corrente nominal. 3. Se corrente > In: verificar carga mecânica. 4. Se corrente normal → regulação incorreta do relé térmico. 5. Verificar equilíbrio das 3 fases.", causes:"Sobrecarga mecânica, desequilíbrio de fases, relé térmico mal regulado, perda de uma fase." },
    },
    practiceTitle:"Exercício prático",
    questions:[
      { q:"Descreva o procedimento completo LOTO antes de uma intervenção num quadro elétrico de 440V.",
        a:"1. LOCALIZAR: identificar todos os disjuntores, fusíveis e fontes (incluindo 24V DC, socorro). Consultar o esquema elétrico. 2. INFORMAR: avisar o chefe de máquinas e a ponte. Registar no diário. 3. ABRIR/ISOLAR: abrir todos os disjuntores, retirar fusíveis. 4. BLOQUEAR: colocar cadeado pessoal em cada ponto de isolamento. Painel 'EM MANUTENÇÃO'. 5. ETIQUETAR: pendurar etiqueta em cada ponto com nome, data, hora, natureza. 6. VERIFICAR AUSÊNCIA DE TENSÃO: usar VAT homologado em L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N e terra. Testar VAT antes e depois em fonte conhecida." },
      { q:"Um motor trifásico de 440V não arranca. Descreva o seu procedimento de diagnóstico passo a passo.",
        a:"1. Segurança: verificar que é seguro intervir. 2. Inspeção visual: cablagem, disjuntor disparado, relé térmico disparado, indicador de avaria. 3. Circuito de potência: medir tensão nos bornes do contactor (entrada L1/L2/L3 e saída T1/T2/T3). 4. Circuito de comando (24V DC): verificar tensão na bobina do contactor. 5. Relé térmico: se disparado → resetar e medir corrente nas 3 fases. 6. Resistência dos enrolamentos: megóhmetro nos bornes do motor → se isolamento < 0,5 MΩ → motor húmido ou defeituoso." },
      { q:"Qual é a diferença entre um curto-circuito e um defeito de isolamento? Como detetar cada um a bordo?",
        a:"Curto-circuito: ligação direta entre condutores de fase diferente ou fase-neutro. A corrente sobe instantaneamente a valores muito elevados. Dispara o disjuntor ou funde o fusível. Deteção: resistência entre fases (= 0 Ω em curto-circuito). Defeito de isolamento: degradação do isolamento entre condutor sob tensão e a estrutura/terra. A corrente de fuga pode ser pequena e não disparar as proteções mas pôr em perigo as pessoas. Deteção: megóhmetro ou painel de vigilância de isolamento. IMPORTANTE: a bordo, a rede está isolada da estrutura (rede IT). Uma primeira avaria de isolamento não corta a alimentação mas aciona um alarme. Uma segunda avaria noutra fase = curto-circuito mortal." },
    ],
    showAnswer:"Ver correção", hideAnswer:"Ocultar",
  },
};

// ── SVG 1 — METHOD STEPS ──────────────────────────────────────
function MethodSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("s1");
  const steps = t.steps;
  const stepColors: Record<string,string> = {s1:C.danger,s2:C.elec,s3:C.meter,s4:C.protect,s5:C.fault,s6:C.safe};
  const icons: Record<string,string> = {s1:"🛡️",s2:"📋",s3:"👁️",s4:"🧩",s5:"📐",s6:"🔧"};

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.elec}33`}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:10}}>
        {Object.keys(steps).map(key=>(
          <button key={key} onClick={()=>setSel(key)} style={{
            padding:"8px 4px",borderRadius:10,fontSize:11,cursor:"pointer",
            background:sel===key?`${stepColors[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?stepColors[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?stepColors[key]:"rgba(240,244,255,0.45)",
            textAlign:"center",
          }}>{icons[key]}</button>
        ))}
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${stepColors[sel]||C.elec}44`,minHeight:80}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:stepColors[sel]||C.elec,fontWeight:700,marginBottom:8}}>{icons[sel]} {steps[sel].name}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{steps[sel].desc}</div>
      </div>
    </div>
  );
}

// ── SVG 2 — MULTIMETER ────────────────────────────────────────
function MultimeterSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("voltage");
  const meas = t.measurements;
  const measColors: Record<string,string> = {voltage:C.elec,current:C.fault,resistance:C.meter,insulation:C.protect};
  const icons: Record<string,string> = {voltage:"V~",current:"A",resistance:"Ω",insulation:"MΩ"};

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.meter}33`}}>
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {Object.entries(meas).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{
            flex:1,padding:"8px 4px",borderRadius:10,fontSize:11,cursor:"pointer",
            background:sel===key?`${measColors[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?measColors[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?measColors[key]:"rgba(240,244,255,0.45)",
            fontFamily:"'Cinzel',serif",fontWeight:700,textAlign:"center",
          }}>{icons[key]}</button>
        ))}
      </div>
      {/* Multimeter SVG */}
      <svg viewBox="0 0 120 140" style={{width:"100%",maxWidth:160,display:"block",margin:"0 auto 10px"}}>
        <rect x="20" y="10" width="80" height="120" rx="10" fill={C.navy3} stroke={measColors[sel]||C.meter} strokeWidth="1.5"/>
        {/* Display */}
        <rect x="28" y="18" width="64" height="28" rx="4" fill="#000" stroke={measColors[sel]||C.meter} strokeWidth="1"/>
        <text x="60" y="35" fontSize="12" fill={measColors[sel]||C.meter} fontFamily="Courier New" textAnchor="middle" fontWeight="bold">{icons[sel]}</text>
        {/* Selector dial */}
        <circle cx="60" cy="80" r="20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <circle cx="60" cy="80" r="6" fill={measColors[sel]||C.meter} opacity={0.6}/>
        {/* Probes */}
        <line x1="45" y1="130" x2="45" y2="115" stroke="#ef4444" strokeWidth="2"/>
        <circle cx="45" cy="115" r="3" fill="#ef4444"/>
        <line x1="60" y1="130" x2="60" y2="115" stroke="#1a1a1a" strokeWidth="2"/>
        <circle cx="60" cy="115" r="3" fill="#1a1a1a" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        <text x="45" y="138" fontSize="7" fill="#ef4444" fontFamily="Courier New" textAnchor="middle">V/Ω</text>
        <text x="60" y="138" fontSize="7" fill="rgba(255,255,255,0.4)" fontFamily="Courier New" textAnchor="middle">COM</text>
      </svg>
      <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${measColors[sel]||C.meter}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
        <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{meas[sel].name}</div>
        {meas[sel].proc}
      </div>
    </div>
  );
}

// ── SVG 3 — LOTO ──────────────────────────────────────────────
function LoToSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("l1");
  const loto = t.loto;
  const lotoColors: Record<string,string> = {l1:C.elec,l2:C.fault,l3:C.protect,l4:C.meter,l5:C.safe};
  const letters = ["L","O","T","O","T"];

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.protect}33`}}>
      <div style={{display:"flex",gap:4,marginBottom:10,justifyContent:"center"}}>
        {Object.keys(loto).map((key,i)=>(
          <button key={key} onClick={()=>setSel(key)} style={{
            width:40,height:40,borderRadius:10,fontSize:16,cursor:"pointer",fontWeight:900,
            background:sel===key?`${lotoColors[key]}33`:"rgba(255,255,255,0.04)",
            border:`2px solid ${sel===key?lotoColors[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?lotoColors[key]:"rgba(240,244,255,0.3)",
            fontFamily:"'Cinzel',serif",
          }}>{letters[i]}</button>
        ))}
      </div>
      <div style={{textAlign:"center",marginBottom:8}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:3,color:"rgba(240,244,255,0.3)"}}>LOCK · OUT · TAG · OUT</div>
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${lotoColors[sel]||C.protect}44`,minHeight:80}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:lotoColors[sel]||C.protect,fontWeight:700,marginBottom:8}}>{loto[sel].name}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{loto[sel].desc}</div>
      </div>
    </div>
  );
}

// ── SVG 4 — FAULTS ────────────────────────────────────────────
function FaultsSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string|null>(null);
  const faults = t.faults;
  const faultColors: Record<string,string> = {nopower:C.elec,motornotstart:C.fault,groundfault:C.danger,overload:C.protect};

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.fault}33`}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {Object.entries(faults).map(([key,val]:any)=>{
          const col=faultColors[key]||C.fault;
          return(
            <button key={key} onClick={()=>setSel(sel===key?null:key)} style={{padding:"10px 8px",borderRadius:10,cursor:"pointer",textAlign:"left",background:sel===key?`${col}18`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`}}>
              <div style={{fontSize:11,fontWeight:700,color:"#f0f4ff",fontFamily:"Courier New",lineHeight:1.4}}>{val.name}</div>
            </button>
          );
        })}
      </div>
      {sel&&(
        <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${faultColors[sel]||C.fault}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
          <div style={{color:C.elec,fontWeight:700,marginBottom:4}}>🔍 {lang==="fr"?"Diagnostic":lang==="es"?"Diagnóstico":lang==="pt"?"Diagnóstico":"Diagnosis"}</div>
          <div style={{marginBottom:8}}>{faults[sel].diag}</div>
          <div style={{color:C.fault,fontWeight:700,marginBottom:4}}>⚠️ {lang==="fr"?"Causes":"Causes"}</div>
          <div>{faults[sel].causes}</div>
        </div>
      )}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)"}}>{t.s4hint}</div>}
    </div>
  );
}

// ── CONTENT TAB ───────────────────────────────────────────────
function ContentTab({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const section=(title:string,children:React.ReactNode,color=C.elec)=>(
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
      {section(t.s1title,<MethodSVG lang={lang}/>,C.elec)}
      {section(t.s2title,<MultimeterSVG lang={lang}/>,C.meter)}
      {section(t.s3title,<LoToSVG lang={lang}/>,C.protect)}
      {section(t.s4title,<FaultsSVG lang={lang}/>,C.fault)}
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
        <div key={i} style={{marginBottom:14,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.elec}33`,overflow:"hidden"}}>
          <div style={{padding:"12px 14px"}}>
            <div style={{fontSize:10,color:C.elec,letterSpacing:1,marginBottom:6,fontFamily:"'Cinzel',serif"}}>Q{i+1}</div>
            <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>{q.q}</div>
          </div>
          <div style={{padding:"0 14px 12px"}}>
            <button onClick={()=>toggle(i)} style={{padding:"7px 14px",borderRadius:8,fontSize:11,cursor:"pointer",background:shown[i]?`${C.elec}22`:"rgba(255,255,255,0.06)",border:`1px solid ${shown[i]?C.elec:"rgba(255,255,255,0.15)"}`,color:shown[i]?C.elec:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{shown[i]?t.hideAnswer:t.showAnswer}</button>
            {shown[i]&&<div style={{marginTop:10,padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.elec}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{q.a}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
// LessonE2_L7 — PART 2: Bank + Quiz + Main

function getBank(lang: string) {
  const b: any = {
    fr:[
      {q:"Qu'est-ce que la procédure LOTO et pourquoi est-elle obligatoire avant toute intervention électrique ?",a:"LOTO (Lockout/Tagout — Consignation/Étiquetage) est une procédure de sécurité obligatoire qui garantit qu'un équipement est mis hors énergie et ne peut pas être remis en service accidentellement pendant une intervention. OBLIGATOIRE car : les accidents électriques sont souvent mortels (le courant peut traverser le corps humain à des niveaux inférieurs à ceux qui déclenchent les protections), une remise accidentelle sous tension peut tuer instantanément l'intervenant, les systèmes de commande automatiques peuvent démarrer un équipement à tout moment. Procédure : Localiser toutes les sources d'énergie, Ouvrir/Isoler, verrouiller avec un Cadenas personnel (Lockout), poser une étiquette (Tagout), vérifier l'Absence de tension (VAT). JAMAIS de dérogation, même pour 'une seconde'."},
      {q:"Comment utiliser un multimètre pour mesurer la tension sur un circuit triphasé 440V en toute sécurité ?",a:"Mesure de tension sur circuit triphasé 440V : Préparation : vérifier que le multimètre est homologué CAT III ou CAT IV minimum (circuits de distribution). Vérifier l'état des câbles de mesure (pas d'isolation craquelée). Sélectionner la gamme : régler sur V AC supérieur à 440V (souvent gamme 600V AC). Connexion : brancher la sonde noire (COM) en premier, puis la rouge (V). Ne jamais ouvrir le circuit. Mesures à effectuer : L1-L2, L1-L3, L2-L3 (tension entre phases ≈ 440V), L1-N, L2-N, L3-N (tension de phase ≈ 254V si réseau 440V). Interprétation : tension correcte ≈ valeur nominale ±5%. Tension nulle sur une phase → perte de phase (disjoncteur, fusible, câble). Après mesure : déconnecter la sonde rouge en premier."},
      {q:"Qu'est-ce qu'un relais thermique et comment le réarmer après déclenchement ?",a:"Un relais thermique est un dispositif de protection des moteurs électriques contre les surcharges prolongées. Fonctionnement : des bilames bimétalliques chauffent proportionnellement au courant traversé. En cas de surcharge (courant > seuil réglé), les bilames fléchissent et ouvrent le circuit de commande du contacteur → le moteur s'arrête. Réglage : le seuil est réglé à 100-115% du courant nominal du moteur. Déclenchement : le bouton de réarmement (reset) sort de son logement ou une LED rouge s'allume. Procédure de réarmement : Identifier et corriger la cause de la surcharge (mécanisme bloqué, surcharge mécanique, perte d'une phase). Attendre le refroidissement des bilames (2-5 minutes). Appuyer sur le bouton reset. Redémarrer et mesurer le courant — s'il est encore trop élevé → ne pas forcer le réarmement répété."},
      {q:"Comment diagnostiquer un moteur électrique triphasé qui tourne mais avec des performances réduites ?",a:"Performances réduites d'un moteur en fonctionnement : Mesures à effectuer : 1. Courant sur les 3 phases : si une phase a un courant nettement supérieur aux deux autres → perte ou déséquilibre de phase → surchauffe des enroulements. 2. Vitesse de rotation (avec tachymètre) : si inférieure à la vitesse nominale → surcharge mécanique ou glissement excessif. 3. Température du boîtier : si anormalement élevée → problème de refroidissement (filtre/grille crasseuse), surcharge, problème d'isolement. 4. Vibrations (avec vibratomètre ou ressenti) : roulements usés, déséquilibre mécanique. Causes fréquentes : filtre de ventilation bouché, déséquilibre de tension sur les 3 phases (> 2% d'écart → réduction de puissance significative), démarrage trop fréquent sans refroidissement (échauffement progressif)."},
      {q:"Qu'est-ce qu'un réseau IT (Isolé Terre) et pourquoi les navires l'utilisent-ils ?",a:"Un réseau IT (Isolé Terre, ou réseau à neutre isolé) est un réseau électrique dont le neutre n'est pas connecté à la terre (coque du navire). C'est le standard à bord. Principe : en réseau TT (à terre, standard terrestre), un premier défaut d'isolement crée immédiatement un courant de défaut → risque de déclenchement (perte de l'équipement) ou d'électrocution si le disjoncteur ne réagit pas assez vite. En réseau IT : un premier défaut d'isolement ne crée pas de courant de retour (pas de boucle complète) → le système continue de fonctionner → temps pour trouver et corriger le défaut avant qu'il devienne dangereux. Un CPI (Contrôleur Permanent d'Isolement) surveille en permanence la résistance d'isolement du réseau et déclenche une alarme dès le premier défaut, sans couper l'alimentation. Avantages pour les navires : continuité de service critique (propulsion, navigation), un premier défaut ne coupe pas un équipement vital. ATTENTION : un 2ème défaut sur une autre phase = court-circuit grave → maintenance immédiate après la 1ère alarme de défaut d'isolement."},
      {q:"Qu'est-ce que la catégorie de surtension (CAT) d'un instrument de mesure et comment la choisir ?",a:"La catégorie de surtension (CAT) indique la capacité d'un instrument à résister aux surtensions transitoires sur un réseau électrique. CAT I : équipements électroniques protégés, circuits à courant limité. CAT II : appareils portables à usage domestique, prises de courant 230V. CAT III : distribution fixe dans les bâtiments, tableaux de distribution, câblage permanent. CAT IV : installations à l'origine des réseaux (compteurs, équipements de protection, câblage extérieur). À bord d'un navire : Pour mesurer sur le MSB (440V) : minimum CAT III-600V. Pour mesures sur circuits de contrôle (24V) : CAT II suffit. Pour mesures sur l'arrivée du groupe électrogène : CAT IV recommandé. Un instrument sous-dimensionné (CAT I ou II utilisé sur un circuit de puissance) peut exploser en cas de surtension, projetant des éclats. TOUJOURS vérifier la CAT avant utilisation."},
      {q:"Comment effectuer un test d'isolement (mégohmmètre) sur un moteur 440V et interpréter les résultats ?",a:"Test d'isolement d'un moteur 440V : Préparation obligatoire : Consigner le moteur (LOTO). Déconnecter le moteur du réseau (ouvrir le contacteur et déconnecter les câbles côté moteur). Déconnecter tous les composants liés aux enroulements (résistances de chauffage, thermistances PTC). Choix de la tension de test : 500V DC pour moteurs 440V (règle = 2× tension nominale + 1000V, minimum 500V). Procédure : Brancher le mégohmmètre entre un enroulement (L1, L2 ou L3) et la carcasse (terre). Appliquer la tension 60 secondes. Lire la valeur affichée. Interprétation : > 100 MΩ = excellent, 10-100 MΩ = bon, 1-10 MΩ = acceptable, 0,5-1 MΩ = à surveiller (moteur humide?), < 0,5 MΩ = problème d'isolement, moteur à mettre hors service. PI (Polarisation Index) = R60s/R10s. PI > 2 = isolement sain, PI < 1,5 = isolement dégradé. Après test : décharger les enroulements (court-circuit momentané) avant de reconnecter."},
      {q:"Quelles sont les causes d'un déséquilibre de tension entre phases et quelles en sont les conséquences sur les moteurs ?",a:"Déséquilibre de tension entre phases : Causes : charge monophasée mal répartie sur les 3 phases (les gros consommateurs monophasés devraient être équilibrés entre L1, L2 et L3), câble de distribution avec résistances différentes par phase, connexion corrodée sur une phase. Définition du déséquilibre : % de déséquilibre = (Vmax - Vmoy) / Vmoy × 100. Exemple : L1=438V, L2=440V, L3=442V → Vmoy=440V → déséquilibre = (442-440)/440 × 100 = 0,45% → acceptable. Conséquences sur les moteurs : Un déséquilibre de 3,5% cause une réduction de puissance de 25%. Les enroulements de la phase la plus chargée surchauffent disproportionnellement. Durée de vie du moteur réduite significativement. Pour chaque 10°C d'augmentation de température : durée de vie de l'isolement divisée par 2. Limite admissible : NEMA préconise un déséquilibre < 2% pour les moteurs."},
      {q:"Comment lire un schéma électrique de puissance et de commande à bord ?",a:"Lecture d'un schéma électrique à bord : Schéma de puissance (symboles normalisés IEC) : Disjoncteur (rectangle avec diagonale), fusible (rectangle avec I à l'intérieur), contacteur (contacts pontés avec ressort), relais thermique (rectangle ondulé avec contact). Les lignes de puissance sont en traits épais (L1, L2, L3 → T1, T2, T3 moteur). Schéma de commande (24V DC ou 110V AC) : Contacts normalement ouverts (NO) : pont ouvert avec tiret. Contacts normalement fermés (NC) : pont fermé avec barre. Bobine de contacteur : rectangle ou cercle avec lettre. Boutons poussoirs : carré avec ligne. Lampes de signalisation : cercle avec lettre. Organisation : le schéma de puissance est généralement à gauche, le schéma de commande à droite. Les contacts d'un même appareil portent le même repère (ex : K1 sur le contacteur et K1 sur son contact auxiliaire dans le circuit de commande). Verrouillages électriques (contacts en série dans le circuit de commande) empêchent des fonctionnements incompatibles."},
      {q:"Quelles sont les EPI (Équipements de Protection Individuelle) nécessaires pour une intervention électrique à bord ?",a:"EPI pour intervention électrique à bord : Basse tension (< 1000V) : gants isolants de classe 00 (500V) ou classe 0 (1000V) — vérifier la date et l'intégrité, lunettes de protection (risque d'arc électrique), vêtements en coton ou fibres naturelles (les synthétiques peuvent fondre sur la peau en cas d'arc), chaussures de sécurité isolantes. Haute tension (> 1000V) : EPI basse tension +, gants isolants de classe adaptée (ex : classe 4 pour 36kV), perche isolante homologuée pour la tension, vêtements anti-arc électrique (mesuré en cal/cm² selon la norme ATPV), écran facial anti-arc. À bord : ne jamais intervenir en haute tension (HTA) sans le personnel formé et habilité et l'aval du chef mécanicien. Les EPI électriques doivent être régulièrement contrôlés (gants : test diélectrique annuel)."},
      {q:"Qu'est-ce qu'un contact auxiliaire et comment est-il utilisé dans les circuits de commande des moteurs ?",a:"Un contact auxiliaire est un contact associé à un contacteur ou relais principal qui change d'état en même temps que le contact principal. Types : Contact auxiliaire NO (Normalement Ouvert) : ouvert au repos, se ferme quand le contacteur est excité. Contact auxiliaire NC (Normalement Fermé) : fermé au repos, s'ouvre quand le contacteur est excité. Utilisations dans les circuits de commande : Auto-alimentation (self-holding) : le contact NO se ferme quand le contacteur est excité et maintient la bobine alimentée après relâchement du bouton marche. Signalisation : allumage d'une lampe verte (moteur en marche). Verrouillage : le contact NC d'un contacteur empêche l'excitation du contacteur suivant (verrouillage mécanique ou électrique). Interverrouillage : empêcher qu'une pompe principale et sa secours démarrent simultanément. Retour d'information : le contact auxiliaire renvoie un signal au système de surveillance (DCS) confirmant l'état du contacteur."},
      {q:"Comment interpréter les codes couleurs des câbles électriques à bord d'un navire ?",a:"Codes couleurs des câbles à bord (normes IEC 60446) : Conducteurs de phase : en Europe/international : L1 = Brun, L2 = Noir, L3 = Gris. Ancienne norme française : L1 = Rouge, L2 = Jaune, L3 = Bleu. Conducteur neutre (N) : Bleu (norme IEC récente). Conducteur de protection (PE — terre) : Jaune/Vert (toujours, partout, universellement). Conducteur de commande (24V DC) : Bleu (positif) et Bleu ou Noir (négatif/commun). Alarme et signalisation : Rouge (alarme, circuit sous tension), Vert (commun, retour), Jaune (signalisation). Important à bord : les anciens navires peuvent avoir des colorations différentes selon leur origine (américaine, britannique, japonaise). Toujours vérifier le schéma électrique du navire — ne jamais se fier uniquement à la couleur sans vérification au multimètre."},
    ],
    en:[
      {q:"What is LOTO procedure and why is it mandatory before any electrical work?",a:"LOTO (Lockout/Tagout) is a mandatory safety procedure ensuring equipment is de-energised and cannot accidentally be re-energised during maintenance. MANDATORY because: electrical accidents are often fatal (current can traverse the human body at levels below protection trip), accidental re-energisation can instantly kill the worker, automatic control systems can start equipment at any time. Procedure: Locate all energy sources, Open/Isolate, Lock with personal padlock (Lockout), apply Tag (Tagout), Verify absence of voltage (VAT). NEVER waived, even for 'just a second'."},
      {q:"How to safely use a multimeter to measure voltage on a 440V three-phase circuit?",a:"440V three-phase voltage measurement: Preparation: verify multimeter is rated CAT III or CAT IV minimum. Check test lead condition. Range selection: set to AC V above 440V (often 600V AC range). Connection: connect black probe (COM) first, then red (V). Never open circuit. Measurements: L1-L2, L1-L3, L2-L3 (phase-to-phase voltage ≈ 440V), L1-N, L2-N, L3-N (phase voltage ≈ 254V on 440V network). Interpretation: correct voltage ≈ nominal ±5%. Zero voltage on one phase → phase loss (breaker, fuse, cable). After measurement: disconnect red probe first."},
      {q:"What is a thermal relay and how to reset it after tripping?",a:"A thermal relay protects electric motors against prolonged overloads. Operation: bimetallic strips heat proportionally to current flow. On overload (current > set threshold), strips deflect and open contactor control circuit → motor stops. Setting: threshold set at 100-115% of motor nominal current. Tripping: reset button protrudes or red LED lights. Reset procedure: Identify and correct overload cause (jammed mechanism, mechanical overload, phase loss). Wait for bimetal cooling (2-5 minutes). Press reset button. Restart and measure current — if still too high → do not force repeated reset."},
      {q:"How to diagnose a three-phase motor running but with reduced performance?",a:"Reduced motor performance checks: 1. Current on 3 phases: if one phase significantly higher → phase loss or imbalance → winding overheating. 2. Rotation speed (tachometer): if below nominal → mechanical overload or excessive slip. 3. Casing temperature: if abnormally high → cooling problem (dirty filter/grille), overload, insulation issue. 4. Vibration: worn bearings, mechanical imbalance. Common causes: blocked ventilation filter, voltage imbalance on 3 phases (> 2% difference → significant power reduction), too-frequent starts without cooling."},
      {q:"What is an IT (Isolated Terra) network and why do vessels use it?",a:"An IT (Isolated Terra, or isolated neutral) network is an electrical network whose neutral is not connected to earth (vessel hull). Standard on board. Principle: in TT network (standard ashore), first insulation fault immediately creates fault current → risk of trip (equipment loss) or electrocution. In IT network: first insulation fault creates no return current (no complete loop) → system continues operating → time to find and correct fault before it becomes dangerous. A CPI (Permanent Insulation Controller) continuously monitors network insulation resistance and triggers alarm on first fault without cutting supply. Advantages for vessels: critical service continuity (propulsion, navigation). WARNING: 2nd fault on another phase = serious short circuit → immediate maintenance after first fault alarm."},
      {q:"What is the overvoltage category (CAT) of a measuring instrument and how to choose it?",a:"Overvoltage category (CAT) indicates instrument resistance to transient overvoltages. CAT I: protected electronic equipment, limited current circuits. CAT II: portable domestic appliances, 230V outlets. CAT III: fixed building distribution, distribution switchboards, permanent wiring. CAT IV: network origin installations (meters, protection equipment, external wiring). On board: for MSB measurements (440V): minimum CAT III-600V. For control circuit measurements (24V): CAT II sufficient. For generator incomer measurements: CAT IV recommended. Undersized instrument (CAT I or II on power circuit) may explode under overvoltage, projecting fragments. ALWAYS check CAT before use."},
      {q:"How to perform an insulation test (megohmmeter) on a 440V motor and interpret results?",a:"440V motor insulation test: Mandatory preparation: LOTO motor. Disconnect motor from network (open contactor and disconnect cables at motor). Disconnect all winding-connected components (heating resistors, PTC thermistors). Test voltage selection: 500V DC for 440V motors. Procedure: connect megohmmeter between winding (L1, L2 or L3) and casing (earth). Apply voltage for 60 seconds. Read value. Interpretation: > 100 MΩ = excellent, 10-100 MΩ = good, 1-10 MΩ = acceptable, 0.5-1 MΩ = monitor (damp motor?), < 0.5 MΩ = insulation fault, remove from service. PI (Polarisation Index) = R60s/R10s. PI > 2 = healthy insulation, PI < 1.5 = degraded insulation. After test: discharge windings before reconnecting."},
      {q:"What are the causes of phase voltage imbalance and what are the consequences for motors?",a:"Phase voltage imbalance causes: unevenly distributed single-phase loads across 3 phases, distribution cable with different phase resistances, corroded connection on one phase. Imbalance definition: % imbalance = (Vmax - Vmean) / Vmean × 100. Consequences for motors: 3.5% imbalance causes 25% power reduction. Most heavily loaded phase winding overheats disproportionately. Motor service life significantly reduced. For each 10°C temperature increase: insulation life halved. NEMA limit: < 2% imbalance for motors."},
      {q:"How to read a power and control electrical schematic on board?",a:"Reading an electrical schematic: Power schematic (IEC standardised symbols): circuit breaker (rectangle with diagonal), fuse (rectangle with I), contactor (bridged contacts with spring), thermal relay (wavy rectangle with contact). Power lines in thick lines (L1, L2, L3 → T1, T2, T3 motor). Control schematic (24V DC or 110V AC): NO contacts (open bridge with dash), NC contacts (closed bridge with bar), contactor coil (rectangle or circle with letter), pushbuttons (square with line). Organisation: power schematic generally left, control right. Same device contacts share same reference. Electrical interlocks (contacts in series) prevent incompatible operations."},
      {q:"What PPE (Personal Protective Equipment) is required for electrical work on board?",a:"PPE for on-board electrical work: Low voltage (< 1000V): insulating gloves class 00 (500V) or class 0 (1000V) — check date and integrity, safety goggles (arc risk), cotton or natural fibre clothing (synthetics can melt on skin in arc flash), insulating safety shoes. High voltage (> 1000V): LV PPE plus rated insulating gloves, approved insulating pole, arc flash clothing (rated in cal/cm² per ATPV standard), arc face shield. On board: never work on HV (MV) without trained and authorised personnel and chief engineer approval. Electrical PPE must be regularly checked (gloves: annual dielectric test)."},
      {q:"What is an auxiliary contact and how is it used in motor control circuits?",a:"An auxiliary contact is associated with a main contactor or relay, changing state simultaneously with the main contact. Types: NO auxiliary (Normally Open): open at rest, closes when contactor energised. NC auxiliary (Normally Closed): closed at rest, opens when contactor energised. Control circuit uses: Self-holding (auto-alimentation): NO contact closes when contactor energised, maintaining coil supply after start button release. Signalling: lighting green lamp (motor running). Interlocking: NC contact of one contactor prevents next contactor energising. Interlock: prevent main and standby pump starting simultaneously. Feedback: auxiliary contact sends signal to monitoring system (DCS) confirming contactor state."},
      {q:"How to interpret cable colour codes on board a vessel?",a:"Cable colour codes on board (IEC 60446 standard): Phase conductors Europe/international: L1 = Brown, L2 = Black, L3 = Grey. Neutral conductor (N): Blue (recent IEC standard). Protective conductor (PE — earth): Yellow/Green (always, everywhere, universally). Control conductor (24V DC): Blue (positive) and Blue or Black (negative/common). Alarm and signalling: Red (alarm, live circuit), Green (common, return), Yellow (signalling). Important on board: older vessels may have different colourings depending on origin (American, British, Japanese). Always check vessel electrical schematic — never rely solely on colour without multimeter verification."},
    ],
    es:[
      {q:"¿Qué es el procedimiento LOTO y por qué es obligatorio antes de cualquier intervención eléctrica?",a:"LOTO (Lockout/Tagout) es un procedimiento de seguridad obligatorio que garantiza que el equipo está desenergizado y no puede ser reenergizado accidentalmente. OBLIGATORIO porque: los accidentes eléctricos son a menudo mortales, una reenergización accidental puede matar instantáneamente, los sistemas automáticos pueden arrancar en cualquier momento. Procedimiento: Localizar, Abrir/Aislar, Bloquear con candado personal, Etiquetar, Verificar ausencia de tensión. NUNCA se puede dispensar, ni por 'un segundo'."},
      {q:"¿Cómo usar un multímetro para medir tensión en un circuito trifásico de 440V con seguridad?",a:"Preparación: verificar que el multímetro es CAT III o IV mínimo. Seleccionar escala V AC superior a 440V (generalmente 600V). Conexión: sonda negra (COM) primero, luego roja. Nunca abrir el circuito. Mediciones: L1-L2, L1-L3, L2-L3 (≈440V), L1-N, L2-N, L3-N (≈254V). Tensión correcta ≈ nominal ±5%. Tensión nula en una fase → pérdida de fase."},
      {q:"¿Qué es un relé térmico y cómo rearmarlo tras un disparo?",a:"Protege los motores contra sobrecargas prolongadas. Láminas bimetálicas se doblan si la corriente supera el umbral → abre el circuito de mando. Rearmado: identificar y corregir la causa, esperar el enfriamiento (2-5 min), presionar el botón reset. No forzar el rearmado repetido si la corriente sigue siendo alta."},
      {q:"¿Cómo diagnosticar un motor trifásico que funciona pero con prestaciones reducidas?",a:"1. Corriente en las 3 fases: si una fase es muy superior → desequilibrio/pérdida de fase. 2. Velocidad (tacómetro): si inferior a la nominal → sobrecarga mecánica. 3. Temperatura de la carcasa: si anormalmente alta → problema de refrigeración o sobrecarga. 4. Vibraciones: rodamientos desgastados, desequilibrio mecánico."},
      {q:"¿Qué es una red IT (Aislada Tierra) y por qué los buques la utilizan?",a:"Red cuyo neutro no está conectado a tierra (casco). Un primer defecto de aislamiento no crea corriente de retorno → el sistema continúa funcionando → tiempo para encontrar y corregir el defecto. Un CPI monitoriza permanentemente el aislamiento y activa una alarma sin cortar el suministro. ATENCIÓN: un 2º defecto en otra fase = cortocircuito grave → mantenimiento inmediato."},
      {q:"¿Qué es la categoría de sobretensión (CAT) de un instrumento y cómo elegirla?",a:"CAT I: equipos electrónicos protegidos. CAT II: aparatos domésticos portátiles. CAT III: distribución fija, cuadros. CAT IV: origen de las redes. A bordo para el MSB (440V): mínimo CAT III-600V. Un instrumento subdimensionado puede explotar en caso de sobretensión."},
      {q:"¿Cómo realizar una prueba de aislamiento (megóhmetro) en un motor de 440V e interpretar los resultados?",a:"LOTO el motor, desconectarlo de la red. Tensión de prueba: 500V DC. Conectar entre devanado y carcasa. Aplicar 60 segundos. Valores: > 100 MΩ = excelente, 10-100 MΩ = bueno, 0,5-1 MΩ = vigilar, < 0,5 MΩ = problema. PI = R60s/R10s. PI > 2 = sano, < 1,5 = degradado."},
      {q:"¿Cuáles son las causas del desequilibrio de tensión entre fases y sus consecuencias en los motores?",a:"Causas: cargas monofásicas mal repartidas, resistencias diferentes por fase, conexión corroída. Un desequilibrio del 3,5% causa una reducción de potencia del 25%. La fase más cargada se sobrecalienta. Límite NEMA: < 2%."},
      {q:"¿Cómo leer un esquema eléctrico de potencia y de mando a bordo?",a:"Esquema de potencia: disyuntor (rectángulo con diagonal), fusible (rectángulo con I), contactor (contactos puenteados), relé térmico (rectángulo ondulado). Esquema de mando: contactos NA (puente abierto), NC (puente cerrado), bobina (rectángulo/círculo). El mismo aparato lleva el mismo símbolo en ambos esquemas."},
      {q:"¿Qué EPI son necesarios para una intervención eléctrica a bordo?",a:"Baja tensión (< 1000V): guantes aislantes clase 0, gafas, ropa de algodón, calzado aislante. Alta tensión (> 1000V): guantes de clase adecuada, pértiga aislante, ropa anti-arco. Nunca trabajar en AT sin personal formado y habilitado y visto bueno del jefe de máquinas."},
      {q:"¿Qué es un contacto auxiliar y cómo se usa en los circuitos de mando de motores?",a:"Contacto asociado a un contactor que cambia de estado a la vez que el principal. NA: abierto en reposo, se cierra al excitar. NC: cerrado en reposo, se abre al excitar. Usos: autoalimentación (mantiene la bobina tras soltar el pulsador de marcha), señalización (lámpara verde), enclavamiento (impide funcionamientos incompatibles)."},
      {q:"¿Cómo interpretar los códigos de colores de los cables eléctricos a bordo?",a:"Fases (IEC): L1 = marrón, L2 = negro, L3 = gris. Neutro: azul. PE (tierra): amarillo/verde (siempre, en todas partes). Mando 24V DC: azul (+), negro (-). Alarma: rojo. Verificar siempre el esquema del buque — no fiarse únicamente del color sin verificar con el multímetro."},
    ],
    pt:[
      {q:"O que é o procedimento LOTO e por que é obrigatório antes de qualquer intervenção elétrica?",a:"LOTO (Lockout/Tagout) é um procedimento de segurança obrigatório que garante que o equipamento está sem energia e não pode ser reenergizado acidentalmente. OBRIGATÓRIO porque: os acidentes elétricos são frequentemente mortais, uma reenergização acidental pode matar instantaneamente, sistemas automáticos podem arrancar a qualquer momento. Procedimento: Localizar, Abrir/Isolar, Bloquear com cadeado pessoal, Etiquetar, Verificar ausência de tensão. NUNCA dispensado, nem por 'um segundo'."},
      {q:"Como usar um multímetro para medir tensão num circuito trifásico de 440V com segurança?",a:"Preparação: verificar que o multímetro é CAT III ou IV mínimo. Selecionar escala V AC superior a 440V. Ligação: sonda preta (COM) primeiro, depois vermelha. Nunca abrir o circuito. Medições: L1-L2, L1-L3, L2-L3 (≈440V), L1-N, L2-N, L3-N (≈254V). Tensão correta ≈ nominal ±5%. Tensão nula numa fase → perda de fase."},
      {q:"O que é um relé térmico e como rearmá-lo após um disparo?",a:"Protege os motores contra sobrecargas prolongadas. Lâminas bimetálicas dobram-se se a corrente superar o limiar → abre o circuito de comando. Rearmação: identificar e corrigir a causa, aguardar arrefecimento (2-5 min), pressionar o botão reset. Não forçar rearme repetido se a corrente continuar alta."},
      {q:"Como diagnosticar um motor trifásico que funciona mas com desempenho reduzido?",a:"1. Corrente nas 3 fases: se uma fase é muito superior → desequilíbrio/perda de fase. 2. Velocidade (tacómetro): se inferior à nominal → sobrecarga mecânica. 3. Temperatura da carcaça: se anormalmente alta → problema de arrefecimento ou sobrecarga. 4. Vibrações: rolamentos desgastados, desequilíbrio mecânico."},
      {q:"O que é uma rede IT (Isolada Terra) e por que os navios a utilizam?",a:"Rede cujo neutro não está ligado à terra (casco). Um primeiro defeito de isolamento não cria corrente de retorno → o sistema continua a funcionar → tempo para encontrar e corrigir o defeito. Um CPI monitoriza permanentemente o isolamento e ativa um alarme sem cortar o fornecimento. ATENÇÃO: um 2º defeito noutra fase = curto-circuito grave → manutenção imediata."},
      {q:"O que é a categoria de sobretensão (CAT) de um instrumento e como escolhê-la?",a:"CAT I: equipamentos eletrónicos protegidos. CAT II: aparelhos domésticos portáteis. CAT III: distribuição fixa, quadros. CAT IV: origem das redes. A bordo para o MSB (440V): mínimo CAT III-600V. Um instrumento subdimensionado pode explodir em caso de sobretensão."},
      {q:"Como realizar um teste de isolamento (megóhmetro) num motor de 440V e interpretar os resultados?",a:"LOTO o motor, desligá-lo da rede. Tensão de teste: 500V DC. Ligar entre enrolamento e carcaça. Aplicar 60 segundos. Valores: > 100 MΩ = excelente, 10-100 MΩ = bom, 0,5-1 MΩ = vigiar, < 0,5 MΩ = problema. PI = R60s/R10s. PI > 2 = saudável, < 1,5 = degradado."},
      {q:"Quais são as causas do desequilíbrio de tensão entre fases e as suas consequências nos motores?",a:"Causas: cargas monofásicas mal distribuídas, resistências diferentes por fase, ligação corroída. Um desequilíbrio de 3,5% causa redução de potência de 25%. A fase mais carregada sobreaquece. Limite NEMA: < 2%."},
      {q:"Como ler um esquema elétrico de potência e de comando a bordo?",a:"Esquema de potência: disjuntor (retângulo com diagonal), fusível (retângulo com I), contactor (contactos em ponte), relé térmico (retângulo ondulado). Esquema de comando: contactos NA (ponte aberta), NF (ponte fechada), bobina (retângulo/círculo). O mesmo aparelho tem o mesmo símbolo em ambos os esquemas."},
      {q:"Que EPI são necessários para uma intervenção elétrica a bordo?",a:"Baixa tensão (< 1000V): luvas isolantes classe 0, óculos, roupa de algodão, calçado isolante. Alta tensão (> 1000V): luvas de classe adequada, vara isolante, roupa anti-arco. Nunca trabalhar em AT sem pessoal formado e habilitado e aprovação do chefe de máquinas."},
      {q:"O que é um contacto auxiliar e como se usa nos circuitos de comando de motores?",a:"Contacto associado a um contactor que muda de estado ao mesmo tempo que o principal. NA: aberto em repouso, fecha ao excitar. NF: fechado em repouso, abre ao excitar. Usos: auto-alimentação, sinalização (lâmpada verde), encravamento (impede funcionamentos incompatíveis)."},
      {q:"Como interpretar os códigos de cores dos cabos elétricos a bordo?",a:"Fases (IEC): L1 = castanho, L2 = preto, L3 = cinzento. Neutro: azul. PE (terra): amarelo/verde (sempre, em todo o lado). Comando 24V DC: azul (+), preto (-). Alarme: vermelho. Verificar sempre o esquema do navio — não confiar apenas na cor sem verificar com o multímetro."},
    ],
  };
  return b[lang]||b.fr;
}

function getQuiz(lang: string) {
  const q: any = {
    fr:[
      {q:"Quelle est la première chose à faire AVANT toute intervention sur un circuit électrique à bord ?",opts:["Prévenir la passerelle","Consigner l'installation (LOTO) et vérifier l'absence de tension","Lire le schéma électrique","Préparer les pièces de rechange"],correct:1,exp:"La première action OBLIGATOIRE est la consignation LOTO (Lockout/Tagout) et la vérification de l'absence de tension avec un VAT homologué. Cette procédure garantit que personne ne peut mettre accidentellement sous tension le circuit pendant l'intervention. Sans cette étape, toute intervention électrique est potentiellement mortelle."},
      {q:"Quelle position du sélecteur d'un multimètre utilise-t-on pour mesurer la tension d'un réseau 440V AC sans ouvrir le circuit ?",opts:["A (courant)","Ω (résistance)","V AC sur gamme supérieure à 440V","V DC sur gamme supérieure à 440V"],correct:2,exp:"Pour mesurer une tension AC (courant alternatif) de 440V, on sélectionne V AC sur une gamme supérieure à 440V (souvent 600V). La mesure de tension se fait toujours EN PARALLÈLE (sans ouvrir le circuit). La position A (ampèremètre) ne doit JAMAIS être connectée en parallèle — cela créerait un court-circuit."},
      {q:"Quelle valeur minimale d'isolement (en MΩ) est acceptable pour un moteur 440V selon les normes usuelles ?",opts:["0,1 MΩ","0,5 MΩ","1 MΩ","100 MΩ"],correct:2,exp:"La valeur minimale acceptable est généralement 1 MΩ pour un moteur 440V. En dessous de 0,5 MΩ, le moteur doit être mis hors service. La règle simple (règle du mégohm) stipule que la résistance d'isolement minimale en MΩ = tension nominale en kV + 1. Pour un moteur 440V (0,44 kV) : environ 1 MΩ minimum."},
      {q:"Dans un réseau IT (Isolé Terre) comme celui des navires, que se passe-t-il lors d'un PREMIER défaut d'isolement ?",opts:["Le disjoncteur principal déclenche immédiatement","Le moteur concerné s'arrête","Une alarme se déclenche mais l'alimentation est maintenue","Une alarme et une coupure se produisent simultanément"],correct:2,exp:"Dans un réseau IT, le premier défaut d'isolement ne crée pas de courant de retour car le neutre n'est pas connecté à la coque. Le CPI (Contrôleur Permanent d'Isolement) détecte la dégradation et déclenche une alarme SANS couper l'alimentation. Cela permet de maintenir les équipements vitaux en service et de localiser le défaut. ATTENTION : un 2ème défaut créerait un court-circuit grave."},
      {q:"Quelle catégorie (CAT) de multimètre devez-vous utiliser pour des mesures sur le tableau principal (MSB) d'un navire en 440V ?",opts:["CAT I","CAT II","CAT III minimum","CAT IV uniquement"],correct:2,exp:"Pour des mesures sur le MSB (440V), il faut minimum un multimètre CAT III-600V. La catégorie CAT III est adaptée aux circuits de distribution fixe et aux tableaux électriques. Un instrument CAT I ou II peut exploser en cas de surtension transitoire sur un réseau de puissance, projetant des éclats dangereux sur l'opérateur."},
    ],
    en:[
      {q:"What is the FIRST thing to do BEFORE any electrical work on board?",opts:["Notify the bridge","Lockout/Tagout (LOTO) and verify absence of voltage","Read the electrical schematic","Prepare spare parts"],correct:1,exp:"The first MANDATORY action is LOTO (Lockout/Tagout) and voltage absence verification with an approved VAT. This procedure ensures nobody can accidentally energise the circuit during work. Without this step, any electrical work is potentially fatal."},
      {q:"Which multimeter selector position is used to measure voltage on a 440V AC network without opening the circuit?",opts:["A (current)","Ω (resistance)","AC V on range above 440V","DC V on range above 440V"],correct:2,exp:"To measure 440V AC, select AC V on a range above 440V (often 600V). Voltage measurement is always PARALLEL (without opening circuit). The A (ammeter) position must NEVER be connected in parallel — it would create a short circuit."},
      {q:"What minimum insulation value (MΩ) is acceptable for a 440V motor per standard practice?",opts:["0.1 MΩ","0.5 MΩ","1 MΩ","100 MΩ"],correct:2,exp:"The generally accepted minimum is 1 MΩ for a 440V motor. Below 0.5 MΩ, motor must be taken out of service. The simple megohm rule: minimum insulation resistance in MΩ = nominal voltage in kV + 1. For 440V (0.44 kV) motor: approximately 1 MΩ minimum."},
      {q:"In an IT (Isolated Terra) network like on vessels, what happens on FIRST insulation fault?",opts:["Main breaker trips immediately","Affected motor stops","Alarm triggers but supply maintained","Alarm and trip occur simultaneously"],correct:2,exp:"In an IT network, first insulation fault creates no return current as neutral is not connected to hull. CPI (Permanent Insulation Controller) detects degradation and triggers alarm WITHOUT cutting supply. Allows vital equipment to remain in service while locating fault. WARNING: 2nd fault would create serious short circuit."},
      {q:"What multimeter category (CAT) should you use for measurements on a vessel's MSB at 440V?",opts:["CAT I","CAT II","CAT III minimum","CAT IV only"],correct:2,exp:"For MSB measurements (440V), minimum CAT III-600V multimeter required. CAT III is rated for fixed distribution circuits and switchboards. A CAT I or II instrument may explode under transient overvoltage on a power network, projecting dangerous fragments at the operator."},
    ],
    es:[
      {q:"¿Qué es lo PRIMERO que debe hacerse ANTES de cualquier intervención en un circuito eléctrico a bordo?",opts:["Avisar al puente","Aplicar LOTO y verificar ausencia de tensión","Leer el esquema eléctrico","Preparar las piezas de repuesto"],correct:1,exp:"La primera acción OBLIGATORIA es el LOTO y la verificación de ausencia de tensión con un VAT homologado. Sin este paso, cualquier intervención eléctrica es potencialmente mortal."},
      {q:"¿Qué posición del selector del multímetro se usa para medir la tensión de una red de 440V AC sin abrir el circuito?",opts:["A (corriente)","Ω (resistencia)","V AC en escala superior a 440V","V DC en escala superior a 440V"],correct:2,exp:"Para medir tensión AC de 440V, seleccionar V AC en una escala superior a 440V. La medición de tensión se hace siempre EN PARALELO. La posición A nunca debe conectarse en paralelo — crearía un cortocircuito."},
      {q:"¿Qué valor mínimo de aislamiento (MΩ) es aceptable para un motor de 440V?",opts:["0,1 MΩ","0,5 MΩ","1 MΩ","100 MΩ"],correct:2,exp:"El mínimo aceptable es 1 MΩ para un motor de 440V. Por debajo de 0,5 MΩ, el motor debe sacarse de servicio. Regla simple: resistencia mínima en MΩ = tensión nominal en kV + 1."},
      {q:"En una red IT (Aislada Tierra) como la de los buques, ¿qué ocurre con el PRIMER defecto de aislamiento?",opts:["El disyuntor principal dispara inmediatamente","El motor afectado se para","Se activa una alarma pero se mantiene el suministro","Alarma y corte se producen simultáneamente"],correct:2,exp:"En red IT, el primer defecto no crea corriente de retorno (neutro no conectado al casco). El CPI detecta la degradación y activa una alarma SIN cortar el suministro. ATENCIÓN: un 2º defecto crearía un cortocircuito grave."},
      {q:"¿Qué categoría (CAT) de multímetro debe usar para mediciones en el cuadro principal (MSB) de un buque a 440V?",opts:["CAT I","CAT II","CAT III mínimo","Solo CAT IV"],correct:2,exp:"Para mediciones en el MSB (440V), se necesita mínimo CAT III-600V. Un instrumento CAT I o II puede explotar bajo una sobretensión transitoria, proyectando fragmentos peligrosos."},
    ],
    pt:[
      {q:"O que é a PRIMEIRA coisa a fazer ANTES de qualquer intervenção num circuito elétrico a bordo?",opts:["Avisar a ponte","Aplicar LOTO e verificar ausência de tensão","Ler o esquema elétrico","Preparar peças sobressalentes"],correct:1,exp:"A primeira ação OBRIGATÓRIA é o LOTO e a verificação de ausência de tensão com um VAT homologado. Sem este passo, qualquer intervenção elétrica é potencialmente mortal."},
      {q:"Que posição do seletor do multímetro se usa para medir a tensão de uma rede de 440V AC sem abrir o circuito?",opts:["A (corrente)","Ω (resistência)","V AC na escala superior a 440V","V DC na escala superior a 440V"],correct:2,exp:"Para medir tensão AC de 440V, selecionar V AC numa escala superior a 440V. A medição de tensão faz-se sempre EM PARALELO. A posição A nunca deve ser ligada em paralelo — criaria um curto-circuito."},
      {q:"Que valor mínimo de isolamento (MΩ) é aceitável para um motor de 440V?",opts:["0,1 MΩ","0,5 MΩ","1 MΩ","100 MΩ"],correct:2,exp:"O mínimo aceitável é 1 MΩ para um motor de 440V. Abaixo de 0,5 MΩ, o motor deve ser retirado de serviço. Regra simples: resistência mínima em MΩ = tensão nominal em kV + 1."},
      {q:"Numa rede IT (Isolada Terra) como a dos navios, o que acontece com o PRIMEIRO defeito de isolamento?",opts:["O disjuntor principal dispara imediatamente","O motor afetado para","Um alarme é ativado mas o fornecimento é mantido","Alarme e corte ocorrem simultaneamente"],correct:2,exp:"Numa rede IT, o primeiro defeito não cria corrente de retorno (neutro não ligado ao casco). O CPI deteta a degradação e ativa um alarme SEM cortar o fornecimento. ATENÇÃO: um 2º defeito criaria um curto-circuito grave."},
      {q:"Que categoria (CAT) de multímetro deve usar para medições no quadro principal (MSB) de um navio a 440V?",opts:["CAT I","CAT II","CAT III mínimo","Apenas CAT IV"],correct:2,exp:"Para medições no MSB (440V), é necessário mínimo CAT III-600V. Um instrumento CAT I ou II pode explodir sob sobretensão transitória, projetando fragmentos perigosos."},
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
        <div style={{fontSize:42,marginBottom:8}}>⚡</div>
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
      <button onClick={()=>onComplete(xp)} style={{width:"100%",padding:"15px 0",border:"none",borderRadius:14,background:"linear-gradient(135deg,#4da6ff,#c9922a)",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:"#060e1a",cursor:"pointer"}}>⚡ {l.finish}</button>
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

export default function LessonE2_L7({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t=T[lang]||T.fr;
  const [tab,setTab]=useState(0);
  const progress=[25,50,75,90][tab]||25;
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(77,166,255,0.2)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"6px 12px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>◀</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:2,color:"#4da6ff",marginBottom:2}}>{t.moduleLabel} · L7</div>
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
          <span style={{fontSize:12}}>⚡</span>
          <span style={{fontFamily:"'Cinzel',serif",fontSize:9,color:"#4da6ff",letterSpacing:1}}>MACHINE · AUXILIAIRES · PREMIUM</span>
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
