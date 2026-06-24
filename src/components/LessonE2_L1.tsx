// LessonE2_L1 — Générateurs & Production électrique | PART 1
import { useState } from "react";

const C = {
  elec:"#4da6ff", gen:"#e8b94f", circuit:"#6dbf8a",
  danger:"#f97316", phase:"#c084fc", neutral:"#94a3b8",
  gold:"#c9922a", gold2:"#e8b94f",
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  safe:"#6dbf8a", red:"#e74c3c",
};

const T: any = {
  fr:{
    moduleLabel:"MACHINE — AUXILIAIRES",
    lessonTitle:"Générateurs & Production électrique",
    intro:"Un navire est une centrale électrique flottante. La production, la distribution et la protection de l'énergie électrique à bord sont des compétences fondamentales pour tout mécanicien ou officier de quart machine.",
    tabs:["📖 Contenu","✏️ Pratique","📚 Banque Q.","🎯 Quiz"],
    s1title:"⚡ Le groupe électrogène — anatomie",
    s1hint:"👆 Tapez un composant pour sa description",
    s2title:"🔄 Couplage en parallèle",
    s2hint:"👆 Tapez une étape pour les détails",
    s3title:"📊 Types de courant à bord",
    s3hint:"👆 Tapez un type pour voir ses caractéristiques",
    s4title:"⚠️ Protection du réseau électrique",
    s4hint:"👆 Tapez une protection pour voir son rôle",
    keypoints:"Points clés",
    kp:[
      "Un navire possède 2 à 4 groupes électrogènes diesel-alternateur",
      "La tension standard à bord : 440V (triphasé) pour la puissance, 220V pour l'éclairage",
      "Le couplage en parallèle nécessite même tension, même fréquence (50/60 Hz) et même phase",
      "Le disjoncteur principal protège le réseau contre les surcharges et courts-circuits",
      "L'alternateur de secours (emergency generator) démarre automatiquement en cas de panne",
    ],
    components:{
      diesel:{ name:"Moteur diesel d'entraînement", desc:"Moteur diesel 4 temps entraînant l'alternateur. Sa vitesse de rotation (1500 ou 1800 tr/min) détermine la fréquence du courant produit (50 ou 60 Hz). Le régulateur de vitesse (governor) maintient la fréquence constante sous charge variable." },
      alternator:{ name:"Alternateur (génératrice)", desc:"Machine tournante convertissant l'énergie mécanique en énergie électrique par induction électromagnétique. Produit un courant alternatif triphasé. La tension est régulée par l'AVR (Automatic Voltage Regulator)." },
      avr:{ name:"AVR — Régulateur de tension automatique", desc:"Régule automatiquement la tension de sortie de l'alternateur en ajustant le courant d'excitation. Maintient la tension stable (±2%) malgré les variations de charge." },
      governor:{ name:"Governor — Régulateur de vitesse", desc:"Maintient la vitesse de rotation du moteur diesel constante malgré les variations de charge. Indispensable pour maintenir la fréquence à 50/60 Hz." },
      breaker:{ name:"Disjoncteur principal (ACB)", desc:"Air Circuit Breaker — protège le groupe électrogène contre les surcharges, courts-circuits et inversions de phase. Se déclenche automatiquement en cas de défaut." },
      bus:{ name:"Jeu de barres (busbar)", desc:"Conducteurs de cuivre massif répartissant l'énergie électrique vers tous les circuits de distribution. Point de connexion centrale de tous les groupes et consommateurs." },
    },
    couplingSteps:[
      { title:"1. Vérification de la tension", desc:"Vérifier que la tension du groupe entrant est égale à la tension du réseau (±5%). Ajuster avec le rhéostat d'excitation ou l'AVR." },
      { title:"2. Vérification de la fréquence", desc:"Vérifier que la fréquence du groupe entrant est identique au réseau (50 ou 60 Hz ±0,5 Hz). Ajuster avec le governor." },
      { title:"3. Vérification de la phase", desc:"Utiliser le synchroscope ou les lampes de synchronisation pour vérifier que les phases sont en concordance avant le couplage." },
      { title:"4. Fermeture du disjoncteur", desc:"Quand le synchroscope indique 12h (phases alignées), fermer le disjoncteur ACB. Le groupe est maintenant en parallèle sur le réseau." },
      { title:"5. Répartition de charge", desc:"Ajuster la charge entre les groupes en modifiant le governor (puissance active — kW) et l'AVR (puissance réactive — kVAR)." },
      { title:"6. Délestage du groupe sortant", desc:"Transférer progressivement la charge sur le groupe restant, puis ouvrir le disjoncteur du groupe à arrêter." },
    ],
    currentTypes:{
      ac3ph:{ name:"Courant alternatif triphasé (440V)", desc:"Courant principal à bord. Alimenté les gros consommateurs : pompes, compresseurs, treuils, propulsion. 3 phases décalées de 120°. Fréquence : 50 ou 60 Hz selon le navire." },
      ac1ph:{ name:"Courant alternatif monophasé (220V)", desc:"Éclairage, prises de courant, petits équipements. Dérivé du réseau triphasé via transformateur. Disponible dans les cabines et espaces de vie." },
      dc24:{ name:"Courant continu 24V", desc:"Systèmes de contrôle-commande, alarmes, automatismes, communication interne. Alimenté par batteries tampons rechargées en permanence. Fonctionne même en cas de panne du réseau principal." },
      emergency:{ name:"Réseau de secours (Emergency)", desc:"Réseau alimenté par le groupe électrogène de secours. Alimente les circuits vitaux : navigation, communication, pompe incendie, éclairage secours. Doit démarrer en 30 secondes selon SOLAS." },
    },
    protections:{
      overcurrent:{ name:"Protection surintensité (OCPS)", desc:"Déclenche le disjoncteur si le courant dépasse la valeur nominale. Protège câbles et équipements contre la surchauffe. Réglée à 110-120% du courant nominal." },
      shortcircuit:{ name:"Protection court-circuit", desc:"Déclenche instantanément en cas de court-circuit. Le courant de court-circuit peut être 10 à 20 fois le courant nominal. Réaction en millisecondes pour limiter les dégâts." },
      undervoltage:{ name:"Protection sous-tension", desc:"Déclenche si la tension chute sous un seuil critique (85% de la tension nominale). Protège les moteurs contre les démarrages à basse tension qui surchauffent les bobinages." },
      reversepower:{ name:"Protection puissance inverse", desc:"Empêche un alternateur couplé de 'motorer' (absorber de la puissance au lieu d'en produire). Évite les dommages au moteur diesel entraîneur." },
      differential:{ name:"Protection différentielle", desc:"Compare les courants entrant et sortant de l'alternateur. Tout déséquilibre indique un défaut interne — déclenche instantanément pour protéger l'enroulement." },
    },
    practiceTitle:"Exercice pratique",
    questions:[
      { q:"Un groupe électrogène tourne à 1500 tr/min. Quelle est la fréquence du courant produit et quelle formule permet de la calculer ?",
        a:"Fréquence f = (n × p) / 60, où n = vitesse en tr/min et p = nombre de paires de pôles. Pour 1500 tr/min avec 2 paires de pôles : f = (1500 × 2) / 60 = 50 Hz. Pour 60 Hz, le même alternateur tournerait à 1800 tr/min. La fréquence doit être maintenue constante (±0,5 Hz) par le governor." },
      { q:"Lors d'un couplage en parallèle, vous observez que le synchroscope tourne dans le sens antihoraire. Que devez-vous faire ?",
        a:"Un synchroscope tournant dans le sens antihoraire indique que le groupe entrant est trop lent (fréquence trop basse). Il faut augmenter la vitesse du groupe entrant en agissant sur le governor (accélération). Si le synchroscope tourne dans le sens horaire, le groupe est trop rapide — il faut le ralentir. On ferme le disjoncteur quand le synchroscope arrive à 12h (position midi) en ralentissant légèrement." },
      { q:"Quelle est la différence entre la puissance active (kW) et la puissance réactive (kVAR) à bord d'un navire ? Quel organe contrôle chacune ?",
        a:"La puissance active (kW) est la puissance réellement consommée pour effectuer un travail mécanique. Elle est contrôlée par le governor du moteur diesel (admission de carburant). La puissance réactive (kVAR) est échangée entre le réseau et les charges inductives (moteurs, transformateurs) sans produire de travail utile. Elle est contrôlée par l'AVR (courant d'excitation de l'alternateur). Le facteur de puissance (cos φ) = kW / kVA. Un facteur de puissance de 0,8 est typique à bord." },
    ],
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
  },
  en:{
    moduleLabel:"ENGINE — AUXILIARIES",
    lessonTitle:"Generators & Electrical Power Generation",
    intro:"A vessel is a floating power station. The production, distribution and protection of electrical energy on board are fundamental skills for any engineer or engine room watchkeeper.",
    tabs:["📖 Content","✏️ Practice","📚 Question Bank","🎯 Quiz"],
    s1title:"⚡ The Generator Set — Anatomy",
    s1hint:"👆 Tap a component to see its description",
    s2title:"🔄 Parallel Operation",
    s2hint:"👆 Tap a step for details",
    s3title:"📊 Types of Current on Board",
    s3hint:"👆 Tap a type to see its characteristics",
    s4title:"⚠️ Electrical Network Protection",
    s4hint:"👆 Tap a protection to see its role",
    keypoints:"Key Points",
    kp:[
      "A vessel has 2 to 4 diesel-alternator generating sets",
      "Standard on-board voltage: 440V (three-phase) for power, 220V for lighting",
      "Parallel operation requires same voltage, same frequency (50/60 Hz) and same phase",
      "The main circuit breaker protects the network against overloads and short circuits",
      "The emergency generator starts automatically in case of main power failure",
    ],
    components:{
      diesel:{ name:"Driving diesel engine", desc:"4-stroke diesel engine driving the alternator. Its rotation speed (1500 or 1800 rpm) determines the frequency of the current produced (50 or 60 Hz). The governor maintains constant frequency under varying load." },
      alternator:{ name:"Alternator (generator)", desc:"Rotating machine converting mechanical energy into electrical energy by electromagnetic induction. Produces three-phase AC. Voltage is regulated by the AVR (Automatic Voltage Regulator)." },
      avr:{ name:"AVR — Automatic Voltage Regulator", desc:"Automatically regulates the alternator output voltage by adjusting the excitation current. Maintains stable voltage (±2%) despite load variations." },
      governor:{ name:"Governor — Speed regulator", desc:"Maintains the diesel engine rotation speed constant despite load variations. Essential for maintaining frequency at 50/60 Hz." },
      breaker:{ name:"Main circuit breaker (ACB)", desc:"Air Circuit Breaker — protects the generating set against overloads, short circuits and phase inversions. Trips automatically in case of fault." },
      bus:{ name:"Busbar", desc:"Solid copper conductors distributing electrical energy to all distribution circuits. Central connection point for all generators and consumers." },
    },
    couplingSteps:[
      { title:"1. Voltage check", desc:"Verify that the incoming generator voltage equals the busbar voltage (±5%). Adjust with the excitation rheostat or AVR." },
      { title:"2. Frequency check", desc:"Verify that the incoming generator frequency matches the network (50 or 60 Hz ±0.5 Hz). Adjust with the governor." },
      { title:"3. Phase check", desc:"Use the synchroscope or synchronising lamps to verify phase concordance before closing." },
      { title:"4. Closing the breaker", desc:"When the synchroscope indicates 12 o'clock (phases aligned), close the ACB. The generator is now running in parallel." },
      { title:"5. Load sharing", desc:"Adjust load between generators by modifying the governor (active power — kW) and AVR (reactive power — kVAR)." },
      { title:"6. Unloading the outgoing generator", desc:"Progressively transfer load to the remaining generator, then open the breaker of the generator to be stopped." },
    ],
    currentTypes:{
      ac3ph:{ name:"Three-phase AC (440V)", desc:"Main power on board. Feeds large consumers: pumps, compressors, winches, propulsion. 3 phases 120° apart. Frequency: 50 or 60 Hz depending on vessel." },
      ac1ph:{ name:"Single-phase AC (220V)", desc:"Lighting, socket outlets, small equipment. Derived from three-phase network via transformer. Available in cabins and accommodation spaces." },
      dc24:{ name:"24V DC", desc:"Control systems, alarms, automation, internal communications. Fed from buffer batteries continuously recharged. Functions even during main power failure." },
      emergency:{ name:"Emergency network", desc:"Network fed by the emergency generator. Feeds vital circuits: navigation, communication, fire pump, emergency lighting. Must start within 30 seconds per SOLAS." },
    },
    protections:{
      overcurrent:{ name:"Overcurrent protection (OCPS)", desc:"Trips the breaker if current exceeds nominal value. Protects cables and equipment against overheating. Set at 110-120% of nominal current." },
      shortcircuit:{ name:"Short-circuit protection", desc:"Trips instantly on short circuit. Short-circuit current can be 10 to 20 times nominal current. Millisecond reaction to limit damage." },
      undervoltage:{ name:"Undervoltage protection", desc:"Trips if voltage drops below critical threshold (85% of nominal). Protects motors against low-voltage starting which overheats windings." },
      reversepower:{ name:"Reverse power protection", desc:"Prevents a coupled alternator from 'motoring' (absorbing power instead of producing it). Avoids damage to the driving diesel engine." },
      differential:{ name:"Differential protection", desc:"Compares currents entering and leaving the alternator. Any imbalance indicates an internal fault — trips instantly to protect the winding." },
    },
    practiceTitle:"Practice Exercise",
    questions:[
      { q:"A generating set runs at 1500 rpm. What is the frequency of the current produced and what formula is used to calculate it?",
        a:"Frequency f = (n × p) / 60, where n = speed in rpm and p = number of pole pairs. For 1500 rpm with 2 pole pairs: f = (1500 × 2) / 60 = 50 Hz. For 60 Hz, the same alternator would run at 1800 rpm. Frequency must be maintained constant (±0.5 Hz) by the governor." },
      { q:"During parallel operation, you observe the synchroscope rotating anticlockwise. What should you do?",
        a:"An anticlockwise synchroscope indicates the incoming generator is too slow (frequency too low). Increase the incoming generator speed using the governor (accelerate). If rotating clockwise, generator is too fast — slow it down. Close the breaker when the synchroscope reaches 12 o'clock (noon position) with a slight deceleration tendency." },
      { q:"What is the difference between active power (kW) and reactive power (kVAR) on board? Which device controls each?",
        a:"Active power (kW) is the power actually consumed to perform mechanical work. Controlled by the diesel engine governor (fuel admission). Reactive power (kVAR) is exchanged between the network and inductive loads (motors, transformers) without producing useful work. Controlled by the AVR (alternator excitation current). Power factor (cos φ) = kW / kVA. A power factor of 0.8 is typical on board." },
    ],
    showAnswer:"Show answer", hideAnswer:"Hide",
  },
  es:{
    moduleLabel:"MÁQUINAS — AUXILIARES",
    lessonTitle:"Generadores & Producción eléctrica",
    intro:"Un buque es una central eléctrica flotante. La producción, distribución y protección de la energía eléctrica a bordo son competencias fundamentales para todo maquinista u oficial de guardia de máquinas.",
    tabs:["📖 Contenido","✏️ Práctica","📚 Banco Q.","🎯 Quiz"],
    s1title:"⚡ El grupo electrógeno — anatomía",
    s1hint:"👆 Toca un componente para ver su descripción",
    s2title:"🔄 Acoplamiento en paralelo",
    s2hint:"👆 Toca un paso para los detalles",
    s3title:"📊 Tipos de corriente a bordo",
    s3hint:"👆 Toca un tipo para ver sus características",
    s4title:"⚠️ Protección de la red eléctrica",
    s4hint:"👆 Toca una protección para ver su función",
    keypoints:"Puntos clave",
    kp:[
      "Un buque tiene de 2 a 4 grupos electrógenos diésel-alternador",
      "Tensión estándar a bordo: 440V (trifásico) para potencia, 220V para alumbrado",
      "El acoplamiento en paralelo requiere misma tensión, misma frecuencia (50/60 Hz) y misma fase",
      "El disyuntor principal protege la red contra sobrecargas y cortocircuitos",
      "El generador de emergencia arranca automáticamente en caso de fallo del principal",
    ],
    components:{
      diesel:{ name:"Motor diésel de accionamiento", desc:"Motor diésel de 4 tiempos que acciona el alternador. Su velocidad de giro (1500 o 1800 rpm) determina la frecuencia de la corriente producida (50 o 60 Hz). El regulador de velocidad (governor) mantiene la frecuencia constante bajo carga variable." },
      alternator:{ name:"Alternador (generador)", desc:"Máquina giratoria que convierte energía mecánica en eléctrica por inducción electromagnética. Produce corriente alterna trifásica. La tensión es regulada por el AVR (Automatic Voltage Regulator)." },
      avr:{ name:"AVR — Regulador automático de tensión", desc:"Regula automáticamente la tensión de salida del alternador ajustando la corriente de excitación. Mantiene la tensión estable (±2%) a pesar de las variaciones de carga." },
      governor:{ name:"Governor — Regulador de velocidad", desc:"Mantiene constante la velocidad de rotación del motor diésel a pesar de las variaciones de carga. Indispensable para mantener la frecuencia a 50/60 Hz." },
      breaker:{ name:"Disyuntor principal (ACB)", desc:"Air Circuit Breaker — protege el grupo electrógeno contra sobrecargas, cortocircuitos e inversiones de fase. Se dispara automáticamente en caso de fallo." },
      bus:{ name:"Barras colectoras (busbar)", desc:"Conductores de cobre macizo que distribuyen la energía eléctrica a todos los circuitos de distribución. Punto de conexión central de todos los grupos y consumidores." },
    },
    couplingSteps:[
      { title:"1. Verificación de tensión", desc:"Verificar que la tensión del grupo entrante sea igual a la de la red (±5%). Ajustar con el reóstato de excitación o el AVR." },
      { title:"2. Verificación de frecuencia", desc:"Verificar que la frecuencia del grupo entrante sea idéntica a la red (50 o 60 Hz ±0,5 Hz). Ajustar con el governor." },
      { title:"3. Verificación de fase", desc:"Usar el sincronoscopio o las lámparas de sincronización para verificar que las fases están en concordancia antes del acoplamiento." },
      { title:"4. Cierre del disyuntor", desc:"Cuando el sincronoscopio indica las 12 (fases alineadas), cerrar el disyuntor ACB. El grupo ya está en paralelo con la red." },
      { title:"5. Reparto de carga", desc:"Ajustar la carga entre los grupos modificando el governor (potencia activa — kW) y el AVR (potencia reactiva — kVAR)." },
      { title:"6. Descarga del grupo saliente", desc:"Transferir progresivamente la carga al grupo restante, luego abrir el disyuntor del grupo a parar." },
    ],
    currentTypes:{
      ac3ph:{ name:"Corriente alterna trifásica (440V)", desc:"Corriente principal a bordo. Alimenta grandes consumidores: bombas, compresores, maquinillas, propulsión. 3 fases desfasadas 120°. Frecuencia: 50 o 60 Hz según el buque." },
      ac1ph:{ name:"Corriente alterna monofásica (220V)", desc:"Alumbrado, tomas de corriente, pequeños equipos. Derivada de la red trifásica mediante transformador. Disponible en camarotes y zonas de alojamiento." },
      dc24:{ name:"Corriente continua 24V", desc:"Sistemas de control-mando, alarmas, automatismos, comunicación interna. Alimentado por baterías tampón recargadas permanentemente. Funciona incluso en caso de fallo de la red principal." },
      emergency:{ name:"Red de emergencia", desc:"Red alimentada por el generador de emergencia. Alimenta circuitos vitales: navegación, comunicación, bomba de incendios, alumbrado de emergencia. Debe arrancar en 30 segundos según SOLAS." },
    },
    protections:{
      overcurrent:{ name:"Protección de sobreintensidad (OCPS)", desc:"Dispara el disyuntor si la corriente supera el valor nominal. Protege cables y equipos contra el sobrecalentamiento. Ajustada al 110-120% de la corriente nominal." },
      shortcircuit:{ name:"Protección de cortocircuito", desc:"Dispara instantáneamente en caso de cortocircuito. La corriente de cortocircuito puede ser 10 a 20 veces la nominal. Reacción en milisegundos para limitar daños." },
      undervoltage:{ name:"Protección de subtensión", desc:"Dispara si la tensión cae por debajo del umbral crítico (85% de la nominal). Protege los motores contra arranques a baja tensión que sobrecalientan los devanados." },
      reversepower:{ name:"Protección de potencia inversa", desc:"Impide que un alternador acoplado 'motorice' (absorba potencia en lugar de producirla). Evita daños al motor diésel de accionamiento." },
      differential:{ name:"Protección diferencial", desc:"Compara las corrientes de entrada y salida del alternador. Cualquier desequilibrio indica un fallo interno — dispara instantáneamente para proteger el devanado." },
    },
    practiceTitle:"Ejercicio práctico",
    questions:[
      { q:"Un grupo electrógeno gira a 1500 rpm. ¿Cuál es la frecuencia de la corriente producida y qué fórmula permite calcularla?",
        a:"Frecuencia f = (n × p) / 60, donde n = velocidad en rpm y p = número de pares de polos. Para 1500 rpm con 2 pares de polos: f = (1500 × 2) / 60 = 50 Hz. Para 60 Hz, el mismo alternador giraría a 1800 rpm. La frecuencia debe mantenerse constante (±0,5 Hz) por el governor." },
      { q:"Durante un acoplamiento en paralelo, observa que el sincronoscopio gira en sentido antihorario. ¿Qué debe hacer?",
        a:"Un sincronoscopio girando en sentido antihorario indica que el grupo entrante es demasiado lento (frecuencia demasiado baja). Hay que aumentar la velocidad del grupo entrante actuando sobre el governor (aceleración). Si el sincronoscopio gira en sentido horario, el grupo es demasiado rápido — hay que frenarlo. Se cierra el disyuntor cuando el sincronoscopio llega a las 12 (posición mediodía) con ligera tendencia a decelerar." },
      { q:"¿Cuál es la diferencia entre potencia activa (kW) y potencia reactiva (kVAR) a bordo? ¿Qué órgano controla cada una?",
        a:"La potencia activa (kW) es la potencia realmente consumida para realizar un trabajo mecánico. Se controla con el governor del motor diésel (admisión de combustible). La potencia reactiva (kVAR) se intercambia entre la red y las cargas inductivas (motores, transformadores) sin producir trabajo útil. Se controla con el AVR (corriente de excitación del alternador). Factor de potencia (cos φ) = kW / kVA. Un factor de 0,8 es típico a bordo." },
    ],
    showAnswer:"Ver corrección", hideAnswer:"Ocultar",
  },
  pt:{
    moduleLabel:"MÁQUINAS — AUXILIARES",
    lessonTitle:"Geradores & Produção elétrica",
    intro:"Um navio é uma central elétrica flutuante. A produção, distribuição e proteção da energia elétrica a bordo são competências fundamentais para qualquer maquinista ou oficial de quarto de máquinas.",
    tabs:["📖 Conteúdo","✏️ Prática","📚 Banco Q.","🎯 Quiz"],
    s1title:"⚡ O grupo gerador — anatomia",
    s1hint:"👆 Toque num componente para ver a descrição",
    s2title:"🔄 Operação em paralelo",
    s2hint:"👆 Toque num passo para os detalhes",
    s3title:"📊 Tipos de corrente a bordo",
    s3hint:"👆 Toque num tipo para ver as características",
    s4title:"⚠️ Proteção da rede elétrica",
    s4hint:"👆 Toque numa proteção para ver o seu papel",
    keypoints:"Pontos-chave",
    kp:[
      "Um navio tem 2 a 4 grupos geradores diesel-alternador",
      "Tensão padrão a bordo: 440V (trifásico) para potência, 220V para iluminação",
      "A operação em paralelo requer mesma tensão, mesma frequência (50/60 Hz) e mesma fase",
      "O disjuntor principal protege a rede contra sobrecargas e curto-circuitos",
      "O gerador de emergência arranca automaticamente em caso de falha da rede principal",
    ],
    components:{
      diesel:{ name:"Motor diesel de acionamento", desc:"Motor diesel de 4 tempos que aciona o alternador. A sua velocidade de rotação (1500 ou 1800 rpm) determina a frequência da corrente produzida (50 ou 60 Hz). O regulador de velocidade (governor) mantém a frequência constante sob carga variável." },
      alternator:{ name:"Alternador (gerador)", desc:"Máquina rotativa que converte energia mecânica em elétrica por indução eletromagnética. Produz corrente alternada trifásica. A tensão é regulada pelo AVR (Automatic Voltage Regulator)." },
      avr:{ name:"AVR — Regulador automático de tensão", desc:"Regula automaticamente a tensão de saída do alternador ajustando a corrente de excitação. Mantém a tensão estável (±2%) apesar das variações de carga." },
      governor:{ name:"Governor — Regulador de velocidade", desc:"Mantém a velocidade de rotação do motor diesel constante apesar das variações de carga. Indispensável para manter a frequência a 50/60 Hz." },
      breaker:{ name:"Disjuntor principal (ACB)", desc:"Air Circuit Breaker — protege o grupo gerador contra sobrecargas, curto-circuitos e inversões de fase. Dispara automaticamente em caso de defeito." },
      bus:{ name:"Barras coletoras (busbar)", desc:"Condutores de cobre maciço que distribuem a energia elétrica a todos os circuitos de distribuição. Ponto de ligação central de todos os grupos e consumidores." },
    },
    couplingSteps:[
      { title:"1. Verificação de tensão", desc:"Verificar que a tensão do grupo entrante é igual à tensão da rede (±5%). Ajustar com o reóstato de excitação ou o AVR." },
      { title:"2. Verificação de frequência", desc:"Verificar que a frequência do grupo entrante é idêntica à da rede (50 ou 60 Hz ±0,5 Hz). Ajustar com o governor." },
      { title:"3. Verificação de fase", desc:"Usar o sincronoscópio ou as lâmpadas de sincronização para verificar a concordância de fases antes do acoplamento." },
      { title:"4. Fecho do disjuntor", desc:"Quando o sincronoscópio indica 12h (fases alinhadas), fechar o disjuntor ACB. O grupo está agora em paralelo com a rede." },
      { title:"5. Repartição de carga", desc:"Ajustar a carga entre os grupos modificando o governor (potência ativa — kW) e o AVR (potência reativa — kVAR)." },
      { title:"6. Descarga do grupo sainte", desc:"Transferir progressivamente a carga para o grupo restante, depois abrir o disjuntor do grupo a parar." },
    ],
    currentTypes:{
      ac3ph:{ name:"Corrente alternada trifásica (440V)", desc:"Corrente principal a bordo. Alimenta grandes consumidores: bombas, compressores, guinchos, propulsão. 3 fases desfasadas 120°. Frequência: 50 ou 60 Hz conforme o navio." },
      ac1ph:{ name:"Corrente alternada monofásica (220V)", desc:"Iluminação, tomadas de corrente, pequenos equipamentos. Derivada da rede trifásica via transformador. Disponível nas cabinas e espaços de alojamento." },
      dc24:{ name:"Corrente contínua 24V", desc:"Sistemas de controlo-comando, alarmes, automatismos, comunicação interna. Alimentado por baterias tampão continuamente recarregadas. Funciona mesmo em caso de falha da rede principal." },
      emergency:{ name:"Rede de emergência", desc:"Rede alimentada pelo gerador de emergência. Alimenta circuitos vitais: navegação, comunicação, bomba de incêndio, iluminação de emergência. Deve arrancar em 30 segundos segundo o SOLAS." },
    },
    protections:{
      overcurrent:{ name:"Proteção de sobrecorrente (OCPS)", desc:"Dispara o disjuntor se a corrente exceder o valor nominal. Protege cabos e equipamentos contra sobreaquecimento. Regulada a 110-120% da corrente nominal." },
      shortcircuit:{ name:"Proteção de curto-circuito", desc:"Dispara instantaneamente em caso de curto-circuito. A corrente de curto-circuito pode ser 10 a 20 vezes a nominal. Reação em milissegundos para limitar danos." },
      undervoltage:{ name:"Proteção de subtensão", desc:"Dispara se a tensão cair abaixo do limiar crítico (85% da nominal). Protege os motores contra arranques a baixa tensão que sobreaquece os enrolamentos." },
      reversepower:{ name:"Proteção de potência inversa", desc:"Impede que um alternador acoplado 'motorize' (absorva potência em vez de a produzir). Evita danos ao motor diesel de acionamento." },
      differential:{ name:"Proteção diferencial", desc:"Compara as correntes de entrada e saída do alternador. Qualquer desequilíbrio indica um defeito interno — dispara instantaneamente para proteger o enrolamento." },
    },
    practiceTitle:"Exercício prático",
    questions:[
      { q:"Um grupo gerador gira a 1500 rpm. Qual é a frequência da corrente produzida e que fórmula permite calculá-la?",
        a:"Frequência f = (n × p) / 60, onde n = velocidade em rpm e p = número de pares de polos. Para 1500 rpm com 2 pares de polos: f = (1500 × 2) / 60 = 50 Hz. Para 60 Hz, o mesmo alternador giraria a 1800 rpm. A frequência deve ser mantida constante (±0,5 Hz) pelo governor." },
      { q:"Durante uma operação em paralelo, observa que o sincronoscópio gira no sentido anti-horário. O que deve fazer?",
        a:"Um sincronoscópio girando no sentido anti-horário indica que o grupo entrante é demasiado lento (frequência demasiado baixa). Aumentar a velocidade do grupo entrante atuando no governor (aceleração). Se girar no sentido horário, o grupo é demasiado rápido — travá-lo. Fechar o disjuntor quando o sincronoscópio chega às 12h (posição meio-dia) com ligeira tendência a desacelerar." },
      { q:"Qual é a diferença entre potência ativa (kW) e potência reativa (kVAR) a bordo? Que órgão controla cada uma?",
        a:"A potência ativa (kW) é a potência realmente consumida para realizar trabalho mecânico. Controlada pelo governor do motor diesel (admissão de combustível). A potência reativa (kVAR) é trocada entre a rede e as cargas indutivas (motores, transformadores) sem produzir trabalho útil. Controlada pelo AVR (corrente de excitação do alternador). Fator de potência (cos φ) = kW / kVA. Um fator de 0,8 é típico a bordo." },
    ],
    showAnswer:"Ver correção", hideAnswer:"Ocultar",
  },
};

// ── SVG 1 — GENERATOR SET ANATOMY ────────────────────────────
function GeneratorAnatomySVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string|null>(null);
  const comps = t.components;
  const compColors: Record<string,string> = {
    diesel:C.danger, alternator:C.elec, avr:C.gen,
    governor:C.safe, breaker:C.red, bus:C.phase,
  };

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.elec}33`}}>
      <div style={{fontSize:10,color:C.elec,letterSpacing:2,marginBottom:8,fontFamily:"'Cinzel',serif"}}>{t.s1hint}</div>
      <svg viewBox="0 0 280 160" style={{width:"100%",maxWidth:360,display:"block",margin:"0 auto"}}>
        {/* Diesel engine */}
        <rect x="10" y="50" width="80" height="60" rx="6" fill={C.danger} opacity={0.2} stroke={C.danger} strokeWidth="1.5"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="diesel"?null:"diesel")}/>
        <text x="50" y="76" fontSize="8" fill={C.danger} fontFamily="Courier New" textAnchor="middle">DIESEL</text>
        <text x="50" y="88" fontSize="8" fill={C.danger} fontFamily="Courier New" textAnchor="middle">ENGINE</text>
        {/* Governor */}
        <rect x="20" y="30" width="40" height="18" rx="4" fill={C.safe} opacity={0.25} stroke={C.safe} strokeWidth="1"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="governor"?null:"governor")}/>
        <text x="40" y="42" fontSize="7" fill={C.safe} fontFamily="Courier New" textAnchor="middle">GOV</text>
        {/* Coupling shaft */}
        <line x1="90" y1="80" x2="120" y2="80" stroke={C.neutral} strokeWidth="6" strokeLinecap="round"/>
        <text x="105" y="75" fontSize="7" fill={C.neutral} fontFamily="Courier New" textAnchor="middle">SHAFT</text>
        {/* Alternator */}
        <ellipse cx="155" cy="80" rx="35" ry="30" fill={C.elec} opacity={0.15} stroke={C.elec} strokeWidth="1.5"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="alternator"?null:"alternator")}/>
        <text x="155" y="76" fontSize="8" fill={C.elec} fontFamily="Courier New" textAnchor="middle">ALTER-</text>
        <text x="155" y="87" fontSize="8" fill={C.elec} fontFamily="Courier New" textAnchor="middle">NATOR</text>
        {/* AVR */}
        <rect x="130" y="20" width="50" height="18" rx="4" fill={C.gen} opacity={0.25} stroke={C.gen} strokeWidth="1"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="avr"?null:"avr")}/>
        <text x="155" y="32" fontSize="7" fill={C.gen} fontFamily="Courier New" textAnchor="middle">AVR</text>
        <line x1="155" y1="38" x2="155" y2="50" stroke={C.gen} strokeWidth="1" strokeDasharray="3,2"/>
        {/* ACB Breaker */}
        <rect x="200" y="60" width="30" height="40" rx="4" fill={C.red} opacity={0.2} stroke={C.red} strokeWidth="1.5"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="breaker"?null:"breaker")}/>
        <text x="215" y="78" fontSize="7" fill={C.red} fontFamily="Courier New" textAnchor="middle">ACB</text>
        <text x="215" y="88" fontSize="7" fill={C.red} fontFamily="Courier New" textAnchor="middle">BKR</text>
        {/* Busbar */}
        <rect x="235" y="40" width="40" height="80" rx="4" fill={C.phase} opacity={0.15} stroke={C.phase} strokeWidth="1.5"
          style={{cursor:"pointer"}} onClick={()=>setSel(sel==="bus"?null:"bus")}/>
        <text x="255" y="78" fontSize="7" fill={C.phase} fontFamily="Courier New" textAnchor="middle">BUS</text>
        <text x="255" y="88" fontSize="7" fill={C.phase} fontFamily="Courier New" textAnchor="middle">BAR</text>
        {/* Connections */}
        <line x1="190" y1="80" x2="200" y2="80" stroke={C.elec} strokeWidth="2"/>
        <line x1="230" y1="80" x2="235" y2="80" stroke={C.phase} strokeWidth="2"/>
        {/* 3-phase lines out */}
        {[55,80,105].map((y,i)=>(
          <line key={i} x1="275" y1={y} x2="280" y2={y} stroke={C.phase} strokeWidth="1.5"/>
        ))}
        <text x="278" y="65" fontSize="6" fill={C.phase} fontFamily="Courier New">L1</text>
        <text x="278" y="82" fontSize="6" fill={C.phase} fontFamily="Courier New">L2</text>
        <text x="278" y="98" fontSize="6" fill={C.phase} fontFamily="Courier New">L3</text>
      </svg>

      {/* Tap targets */}
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10,marginTop:4}}>
        {Object.entries(comps).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(sel===key?null:key)} style={{
            padding:"4px 8px",borderRadius:8,fontSize:10,cursor:"pointer",
            background:sel===key?`${compColors[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?compColors[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?compColors[key]:"rgba(240,244,255,0.45)",
            fontFamily:"Courier New",
          }}>{val.name.split(" ")[0]}</button>
        ))}
      </div>

      {sel && (
        <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${compColors[sel]||C.elec}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
          <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{comps[sel].name}</div>
          {comps[sel].desc}
        </div>
      )}
    </div>
  );
}

// ── SVG 2 — PARALLEL COUPLING ─────────────────────────────────
function ParallelCouplingSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [step,setStep] = useState(0);
  const steps = t.couplingSteps;
  const stepColors = [C.elec,C.gen,C.phase,C.safe,C.danger,C.gold];

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.gen}33`}}>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {steps.map((_:any,i:number)=>(
          <button key={i} onClick={()=>setStep(i)} style={{
            width:32,height:32,borderRadius:8,fontSize:11,cursor:"pointer",fontWeight:700,
            background:step===i?`${stepColors[i]}33`:"rgba(255,255,255,0.04)",
            border:`1px solid ${step===i?stepColors[i]:"rgba(255,255,255,0.12)"}`,
            color:step===i?stepColors[i]:"rgba(240,244,255,0.4)",
          }}>{i+1}</button>
        ))}
      </div>
      {/* Synchroscope SVG */}
      <svg viewBox="0 0 160 100" style={{width:"100%",maxWidth:220,display:"block",margin:"0 auto 10px"}}>
        <circle cx="80" cy="50" r="40" fill="none" stroke={C.gen} strokeWidth="1.5" opacity={0.5}/>
        <circle cx="80" cy="50" r="5" fill={C.gen}/>
        {/* 12h mark */}
        <line x1="80" y1="12" x2="80" y2="20" stroke={C.safe} strokeWidth="2"/>
        <text x="80" y="10" fontSize="8" fill={C.safe} fontFamily="Courier New" textAnchor="middle">12h ✓</text>
        {/* Needle position based on step */}
        {(() => {
          const angles = [-90, -60, -30, 0, 30, 60];
          const angle = angles[step] || 0;
          const rad = (angle - 90) * Math.PI / 180;
          const x2 = 80 + 35 * Math.cos(rad);
          const y2 = 50 + 35 * Math.sin(rad);
          return <line x1="80" y1="50" x2={x2} y2={y2} stroke={step===3?C.safe:C.danger} strokeWidth="2.5" strokeLinecap="round"/>;
        })()}
        <text x="80" y="95" fontSize="7" fill={C.gen} fontFamily="Courier New" textAnchor="middle">SYNCHROSCOPE</text>
        {/* Labels */}
        <text x="120" y="52" fontSize="7" fill={C.danger} fontFamily="Courier New">FAST →</text>
        <text x="18" y="52" fontSize="7" fill={C.elec} fontFamily="Courier New">← SLOW</text>
      </svg>

      <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.06)",marginBottom:10}}>
        <div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C.elec},${C.gold})`,width:`${((step+1)/steps.length)*100}%`,transition:"width 0.3s"}}/>
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${stepColors[step]}44`,minHeight:70}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:stepColors[step],fontWeight:700,marginBottom:8}}>{steps[step].title}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{steps[step].desc}</div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:10,gap:8}}>
        <button disabled={step===0} onClick={()=>setStep(s=>s-1)} style={{flex:1,padding:"8px 0",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.04)",color:"rgba(240,244,255,0.5)",cursor:step===0?"not-allowed":"pointer",fontSize:12}}>◀</button>
        <button disabled={step===steps.length-1} onClick={()=>setStep(s=>s+1)} style={{flex:1,padding:"8px 0",borderRadius:10,border:`1px solid ${C.gold}44`,background:`${C.gold}11`,color:C.gold2,cursor:step===steps.length-1?"not-allowed":"pointer",fontSize:12,fontWeight:700}}>▶</button>
      </div>
    </div>
  );
}

// ── SVG 3 — CURRENT TYPES ─────────────────────────────────────
function CurrentTypesSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("ac3ph");
  const types = Object.entries(t.currentTypes) as [string,{name:string;desc:string}][];
  const typeColors: Record<string,string> = {ac3ph:C.elec,ac1ph:C.gen,dc24:C.safe,emergency:C.red};

  const waveforms: Record<string,JSX.Element> = {
    ac3ph:(
      <g>
        {[0,1,2].map(ph=>{
          const offset = ph * (Math.PI*2/3);
          const color = [C.elec,"#ff6b6b",C.safe][ph];
          const pts = Array.from({length:50},(_,i)=>{
            const x = 10 + i*3;
            const y = 50 - 30*Math.sin((i/50)*4*Math.PI + offset);
            return `${x},${y}`;
          }).join(" ");
          return <polyline key={ph} points={pts} fill="none" stroke={color} strokeWidth="1.5" opacity={0.8}/>;
        })}
        <text x="80" y="95" fontSize="8" fill={C.elec} fontFamily="Courier New" textAnchor="middle">440V / 3-phase / 50-60Hz</text>
      </g>
    ),
    ac1ph:(
      <g>
        <polyline points={Array.from({length:50},(_,i)=>`${10+i*3},${50-30*Math.sin((i/50)*4*Math.PI)}`).join(" ")} fill="none" stroke={C.gen} strokeWidth="2"/>
        <text x="80" y="95" fontSize="8" fill={C.gen} fontFamily="Courier New" textAnchor="middle">220V / 1-phase / 50-60Hz</text>
      </g>
    ),
    dc24:(
      <g>
        <line x1="10" y1="50" x2="160" y2="50" stroke={C.safe} strokeWidth="2.5"/>
        <text x="80" y="95" fontSize="8" fill={C.safe} fontFamily="Courier New" textAnchor="middle">24V DC — stable</text>
      </g>
    ),
    emergency:(
      <g>
        <polyline points={Array.from({length:50},(_,i)=>`${10+i*3},${50-25*Math.sin((i/50)*4*Math.PI)}`).join(" ")} fill="none" stroke={C.red} strokeWidth="2"/>
        <text x="80" y="85" fontSize="8" fill={C.red} fontFamily="Courier New" textAnchor="middle">EMERGENCY</text>
        <text x="80" y="95" fontSize="7" fill={C.red} fontFamily="Courier New" textAnchor="middle">Starts in 30s (SOLAS)</text>
      </g>
    ),
  };

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.phase}33`}}>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {types.map(([key,val])=>(
          <button key={key} onClick={()=>setSel(key)} style={{
            padding:"5px 9px",borderRadius:8,fontSize:10,cursor:"pointer",
            background:sel===key?`${typeColors[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?typeColors[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?typeColors[key]:"rgba(240,244,255,0.45)",
            fontFamily:"Courier New",
          }}>{val.name.split(" ").slice(-1)[0].replace("(","").replace(")","")}</button>
        ))}
      </div>
      <svg viewBox="0 0 170 100" style={{width:"100%",display:"block",background:`${C.navy3}88`,borderRadius:8,marginBottom:10}}>
        {waveforms[sel]}
      </svg>
      <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${typeColors[sel]||C.phase}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
        <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{t.currentTypes[sel].name}</div>
        {t.currentTypes[sel].desc}
      </div>
    </div>
  );
}

// ── SVG 4 — PROTECTIONS ───────────────────────────────────────
function ProtectionsSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string|null>(null);
  const prots = Object.entries(t.protections) as [string,{name:string;desc:string}][];
  const protColors: Record<string,string> = {
    overcurrent:C.danger, shortcircuit:C.red,
    undervoltage:C.gen, reversepower:C.phase, differential:C.elec,
  };

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.danger}33`}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {prots.map(([key,val])=>{
          const col=protColors[key]||C.danger;
          return(
            <button key={key} onClick={()=>setSel(sel===key?null:key)} style={{
              padding:"10px 8px",borderRadius:10,cursor:"pointer",textAlign:"left",
              background:sel===key?`${col}18`:"rgba(255,255,255,0.04)",
              border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`,
            }}>
              <div style={{fontSize:11,fontWeight:700,color:"#f0f4ff",fontFamily:"Courier New",lineHeight:1.4}}>{val.name.split("—")[0].split("(")[0].trim()}</div>
            </button>
          );
        })}
      </div>
      {sel&&(
        <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${protColors[sel]||C.danger}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
          <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{t.protections[sel].name}</div>
          {t.protections[sel].desc}
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
      {section(t.s1title,<GeneratorAnatomySVG lang={lang}/>,C.elec)}
      {section(t.s2title,<ParallelCouplingSVG lang={lang}/>,C.gen)}
      {section(t.s3title,<CurrentTypesSVG lang={lang}/>,C.phase)}
      {section(t.s4title,<ProtectionsSVG lang={lang}/>,C.danger)}
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

// ── PRACTICE TAB ──────────────────────────────────────────────
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
// LessonE2_L1 — PART 2: Bank + Quiz + Main

function getBank(lang: string) {
  const banks: any = {
    fr:[
      {q:"Quelle est la formule pour calculer la fréquence d'un alternateur ?",a:"f = (n × p) / 60, où f = fréquence en Hz, n = vitesse de rotation en tr/min, p = nombre de paires de pôles. Exemple : alternateur à 2 paires de pôles tournant à 1500 tr/min → f = (1500 × 2) / 60 = 50 Hz."},
      {q:"Quel est le rôle de l'AVR (Automatic Voltage Regulator) ?",a:"L'AVR régule automatiquement la tension de sortie de l'alternateur en ajustant le courant d'excitation du rotor. Quand la charge augmente et que la tension tend à chuter, l'AVR augmente le courant d'excitation pour maintenir la tension stable à ±2% de la valeur nominale."},
      {q:"Qu'est-ce que le governor et quel paramètre électrique contrôle-t-il ?",a:"Le governor (régulateur de vitesse) maintient la vitesse de rotation du moteur diesel constante (1500 ou 1800 tr/min) malgré les variations de charge. En maintenant la vitesse constante, il maintient indirectement la FRÉQUENCE (50 ou 60 Hz) du courant produit."},
      {q:"Quelles sont les trois conditions nécessaires pour coupler deux alternateurs en parallèle ?",a:"1. Même tension : la tension du groupe entrant doit être égale à celle du réseau (±5%). Ajuster avec l'AVR. 2. Même fréquence : 50 Hz ou 60 Hz selon le réseau (±0,5 Hz). Ajuster avec le governor. 3. Même phase (concordance de phase) : les ondes sinusoïdales doivent être en phase. Vérifier avec le synchroscope ou les lampes de synchronisation."},
      {q:"Comment fonctionne un synchroscope et comment lit-on sa position ?",a:"Le synchroscope compare la tension et la fréquence du groupe entrant par rapport au réseau. Son aiguille tourne : dans le sens horaire si le groupe entrant est TROP RAPIDE (fréquence trop haute), dans le sens antihoraire si TROP LENT (fréquence trop basse). On ferme le disjoncteur quand l'aiguille arrive à 12h (midi) = phases alignées, idéalement avec une légère rotation horaire (légèrement trop rapide) pour que le groupe prenne immédiatement de la charge."},
      {q:"Quelle est la différence entre la puissance active (kW) et la puissance réactive (kVAR) ?",a:"Puissance active (kW) : puissance réellement convertie en travail mécanique ou chaleur. Contrôlée par le governor (carburant du moteur diesel). Puissance réactive (kVAR) : échangée entre le réseau et les charges inductives (moteurs, transformateurs) — ne produit pas de travail utile mais est nécessaire à leur fonctionnement. Contrôlée par l'AVR (excitation de l'alternateur). Puissance apparente (kVA) = √(kW² + kVAR²). Facteur de puissance cos φ = kW/kVA."},
      {q:"Pourquoi un navire possède-t-il plusieurs groupes électrogènes ?",a:"Plusieurs raisons : Redondance et sécurité (si un groupe tombe en panne, les autres assurent la continuité). Adaptation à la charge (à faible charge, on n'utilise qu'un groupe et on arrête les autres pour économiser le carburant). Maintenance (un groupe peut être arrêté pour maintenance pendant que les autres fonctionnent). Le nombre et la puissance des groupes sont calculés pour couvrir 100% de la puissance maximale avec un groupe en réserve."},
      {q:"Qu'est-ce qu'un jeu de barres (busbar) et quel est son rôle ?",a:"Le jeu de barres est un conducteur de cuivre massif (ou aluminium) constituant le point de connexion centrale du tableau principal (MSB — Main Switchboard). Tous les groupes électrogènes s'y connectent via leurs disjoncteurs, et tous les circuits de distribution en partent. Il permet de coupler les groupes en parallèle et de distribuer l'énergie à l'ensemble du navire. Généralement divisé en sections pouvant être isolées."},
      {q:"Qu'est-ce que la protection de puissance inverse (reverse power protection) et pourquoi est-elle nécessaire ?",a:"La protection de puissance inverse détecte quand un alternateur accouplé absorbe de la puissance au lieu d'en produire (le moteur diesel s'arrête ou ralentit trop). Sans cette protection, l'alternateur fonctionnerait comme un moteur, entraînant des dommages au moteur diesel (entraînement à l'envers) et une chute de tension du réseau. Elle déclenche le disjoncteur de l'alternateur défaillant."},
      {q:"Quel est le groupe électrogène de secours (emergency generator) et quelles sont ses obligations SOLAS ?",a:"Le groupe électrogène de secours est un groupe indépendant situé au-dessus de la ligne de flottaison (hors salle des machines principale), alimentant les équipements vitaux en cas de panne totale du réseau principal. Obligations SOLAS : démarrage automatique en 30 secondes, autonomie d'au moins 18h pour navires passagers (3h pour navires cargo), alimentation obligatoire : navigation, communication, pompe incendie, éclairage de secours, systèmes de lutte contre l'incendie."},
      {q:"Comment effectue-t-on le délestage (transfert de charge) d'un groupe vers un autre ?",a:"Procédure de délestage : 1. Coupler le groupe A sur le réseau (groupe B déjà en service). 2. Augmenter progressivement la charge du groupe A en agissant sur son governor (augmentation carburant → il prend de la charge active). 3. Simultanément réduire la charge du groupe B (réduction carburant). 4. Quand le groupe B est à charge nulle (ou voisine), ouvrir son disjoncteur. 5. Arrêter le groupe B. Important : ne jamais couper brutalement — procéder progressivement pour éviter les à-coups de tension et fréquence."},
      {q:"Quelle est la tension standard et la fréquence standard à bord des navires modernes ?",a:"Tension principale : 440V triphasé (courants forts — moteurs, pompes, compresseurs). Sur certains grands navires : 6,6 kV ou 11 kV. Tension secondaire : 220V monophasé (éclairage, prises). Courant de commande/contrôle : 24V DC. Fréquence : 60 Hz (navires américains, japonais, certains navires internationaux) ou 50 Hz (navires européens). La fréquence dépend de la conception du navire et des équipements installés."},
      {q:"Expliquez ce qu'est un disjoncteur ACB (Air Circuit Breaker) et ses fonctions de protection.",a:"L'ACB (Air Circuit Breaker) est un disjoncteur haute puissance utilisant l'air comme milieu d'extinction de l'arc électrique. Fonctions : 1. Protection surintensité (surcharge) — déclenche après un délai si I > In. 2. Protection court-circuit — déclenche instantanément si I >> In. 3. Protection sous-tension — déclenche si la tension chute anormalement. 4. Protection puissance inverse — déclenche si flux de puissance inversé. Peut aussi être commandé manuellement. Réarmable après déclenchement."},
      {q:"Quelle est la différence entre un court-circuit et une surcharge ?",a:"Surcharge : courant supérieur au courant nominal mais inférieur au courant de court-circuit. Ex. : démarrage d'un gros moteur, accumulation de consommateurs. Entraîne une surchauffe progressive. La protection surcharge déclenche après un délai (quelques secondes à minutes). Court-circuit : connexion directe entre deux phases ou phase-neutre. Courant peut atteindre 10 à 20 fois le nominal. Dommages instantanés (arc électrique, incendie). La protection court-circuit déclenche en millisecondes."},
      {q:"Qu'est-ce que le facteur de puissance (cos φ) et comment l'améliore-t-on à bord ?",a:"Le facteur de puissance cos φ = Puissance active (kW) / Puissance apparente (kVA). Varie entre 0 et 1 (ou 0% et 100%). Un faible cos φ (< 0,7) signifie beaucoup de puissance réactive — courants élevés dans les câbles et alternateurs pour une puissance utile faible. À bord, il est typiquement de 0,8. Amélioration : bancs de condensateurs (compensent la puissance réactive inductive). Ajustement de l'AVR pour répartir la puissance réactive entre les groupes couplés."},
    ],
    en:[
      {q:"What is the formula for calculating alternator frequency?",a:"f = (n × p) / 60, where f = frequency in Hz, n = rotational speed in rpm, p = number of pole pairs. Example: alternator with 2 pole pairs at 1500 rpm → f = (1500 × 2) / 60 = 50 Hz."},
      {q:"What is the role of the AVR (Automatic Voltage Regulator)?",a:"The AVR automatically regulates the alternator output voltage by adjusting the rotor excitation current. When load increases and voltage tends to drop, the AVR increases excitation current to maintain stable voltage at ±2% of nominal value."},
      {q:"What is the governor and which electrical parameter does it control?",a:"The governor (speed regulator) maintains the diesel engine rotation speed constant (1500 or 1800 rpm) despite load variations. By maintaining constant speed, it indirectly maintains the FREQUENCY (50 or 60 Hz) of the current produced."},
      {q:"What are the three conditions required for parallel operation of two alternators?",a:"1. Same voltage: incoming generator voltage must equal busbar voltage (±5%). Adjust with AVR. 2. Same frequency: 50 Hz or 60 Hz depending on network (±0.5 Hz). Adjust with governor. 3. Same phase (phase concordance): sinusoidal waves must be in phase. Check with synchroscope or synchronising lamps."},
      {q:"How does a synchroscope work and how is its position read?",a:"The synchroscope compares voltage and frequency of the incoming generator against the network. Its needle rotates: clockwise if incoming generator is TOO FAST (frequency too high), anticlockwise if TOO SLOW (frequency too low). Close the breaker when needle reaches 12 o'clock = phases aligned, ideally with slight clockwise rotation so the generator immediately picks up load."},
      {q:"What is the difference between active power (kW) and reactive power (kVAR)?",a:"Active power (kW): power actually converted to mechanical work or heat. Controlled by governor (diesel engine fuel). Reactive power (kVAR): exchanged between network and inductive loads (motors, transformers) — produces no useful work but necessary for their operation. Controlled by AVR (alternator excitation). Apparent power (kVA) = √(kW² + kVAR²). Power factor cos φ = kW/kVA."},
      {q:"Why does a vessel have several generating sets?",a:"Several reasons: Redundancy and safety (if one set fails, others maintain continuity). Load adaptation (at low load, run only one set and stop others to save fuel). Maintenance (one set can be stopped for maintenance while others run). Number and power of sets calculated to cover 100% maximum demand with one set in reserve."},
      {q:"What is a busbar and what is its role?",a:"A busbar is a solid copper (or aluminium) conductor forming the central connection point of the Main Switchboard (MSB). All generating sets connect to it via their circuit breakers, and all distribution circuits depart from it. Allows parallel operation of generators and power distribution throughout the vessel. Generally divided into sections that can be isolated."},
      {q:"What is reverse power protection and why is it necessary?",a:"Reverse power protection detects when a coupled alternator absorbs power instead of producing it (diesel engine stops or slows excessively). Without this protection, the alternator would act as a motor, causing diesel engine damage (reverse driving) and voltage drop on the network. It trips the faulty alternator's circuit breaker."},
      {q:"What is the emergency generator and what are its SOLAS requirements?",a:"The emergency generator is an independent set located above the waterline (outside the main engine room), supplying vital equipment during total main power failure. SOLAS requirements: automatic start within 30 seconds, minimum autonomy of 18 hours for passenger vessels (3 hours for cargo), mandatory supply: navigation, communication, fire pump, emergency lighting, fire-fighting systems."},
      {q:"How is load transfer from one generator to another performed?",a:"Load transfer procedure: 1. Connect generator A to network (B already running). 2. Progressively increase A's load using governor (increase fuel → takes active load). 3. Simultaneously reduce B's load (reduce fuel). 4. When B is at zero load, open its breaker. 5. Stop B. Important: never cut abruptly — proceed gradually to avoid voltage and frequency transients."},
      {q:"What are the standard voltage and frequency on board modern vessels?",a:"Main voltage: 440V three-phase (power circuits — motors, pumps, compressors). Large vessels may use 6.6 kV or 11 kV. Secondary voltage: 220V single-phase (lighting, sockets). Control/instrumentation: 24V DC. Frequency: 60 Hz (US, Japanese, some international vessels) or 50 Hz (European vessels). Frequency depends on vessel design and installed equipment."},
      {q:"Explain what an ACB (Air Circuit Breaker) is and its protection functions.",a:"An ACB is a high-power circuit breaker using air as arc extinguishing medium. Functions: 1. Overcurrent (overload) protection — trips after delay if I > In. 2. Short-circuit protection — trips instantly if I >> In. 3. Undervoltage protection — trips if voltage drops abnormally. 4. Reverse power protection — trips if power flow reverses. Can also be operated manually. Re-closable after tripping."},
      {q:"What is the difference between a short circuit and an overload?",a:"Overload: current above nominal but below short-circuit current. E.g. large motor starting, accumulation of consumers. Causes progressive overheating. Overload protection trips after a delay (seconds to minutes). Short circuit: direct connection between two phases or phase-neutral. Current can reach 10-20 times nominal. Instantaneous damage (electric arc, fire). Short-circuit protection trips in milliseconds."},
      {q:"What is the power factor (cos φ) and how is it improved on board?",a:"Power factor cos φ = Active power (kW) / Apparent power (kVA). Varies from 0 to 1. Low cos φ (< 0.7) means lots of reactive power — high currents in cables and alternators for little useful power. Typically 0.8 on board. Improvement: capacitor banks (compensate inductive reactive power). AVR adjustment to share reactive power between coupled generators."},
    ],
    es:[
      {q:"¿Cuál es la fórmula para calcular la frecuencia de un alternador?",a:"f = (n × p) / 60, donde f = frecuencia en Hz, n = velocidad de giro en rpm, p = número de pares de polos. Ejemplo: alternador con 2 pares de polos a 1500 rpm → f = (1500 × 2) / 60 = 50 Hz."},
      {q:"¿Cuál es la función del AVR (Automatic Voltage Regulator)?",a:"El AVR regula automáticamente la tensión de salida del alternador ajustando la corriente de excitación del rotor. Cuando la carga aumenta y la tensión tiende a caer, el AVR aumenta la corriente de excitación para mantener la tensión estable a ±2% del valor nominal."},
      {q:"¿Qué es el governor y qué parámetro eléctrico controla?",a:"El governor (regulador de velocidad) mantiene constante la velocidad de giro del motor diésel (1500 o 1800 rpm) a pesar de las variaciones de carga. Al mantener la velocidad constante, mantiene indirectamente la FRECUENCIA (50 o 60 Hz) de la corriente producida."},
      {q:"¿Cuáles son las tres condiciones necesarias para acoplar dos alternadores en paralelo?",a:"1. Misma tensión: la tensión del grupo entrante debe ser igual a la de la red (±5%). Ajustar con el AVR. 2. Misma frecuencia: 50 Hz o 60 Hz según la red (±0,5 Hz). Ajustar con el governor. 3. Misma fase (concordancia de fase): las ondas sinusoidales deben estar en fase. Verificar con el sincronoscopio o las lámparas de sincronización."},
      {q:"¿Cómo funciona un sincronoscopio y cómo se lee su posición?",a:"El sincronoscopio compara la tensión y la frecuencia del grupo entrante con la red. Su aguja gira: en sentido horario si el grupo entrante es DEMASIADO RÁPIDO (frecuencia alta), en sentido antihorario si es DEMASIADO LENTO. Se cierra el disyuntor cuando la aguja llega a las 12 = fases alineadas, idealmente con ligera rotación horaria para que el grupo tome carga inmediatamente."},
      {q:"¿Cuál es la diferencia entre potencia activa (kW) y potencia reactiva (kVAR)?",a:"Potencia activa (kW): potencia realmente convertida en trabajo mecánico o calor. Controlada por el governor (combustible del motor diésel). Potencia reactiva (kVAR): intercambiada entre la red y las cargas inductivas — no produce trabajo útil pero es necesaria. Controlada por el AVR. Potencia aparente (kVA) = √(kW² + kVAR²). Factor de potencia cos φ = kW/kVA."},
      {q:"¿Por qué un buque tiene varios grupos electrógenos?",a:"Varias razones: Redundancia y seguridad (si falla uno, los demás aseguran la continuidad). Adaptación a la carga (con poca carga, solo se usa uno para ahorrar combustible). Mantenimiento (uno puede pararse para mantenimiento mientras los demás funcionan). El número y la potencia se calculan para cubrir el 100% de la demanda máxima con un grupo de reserva."},
      {q:"¿Qué son las barras colectoras (busbar) y cuál es su función?",a:"Las barras colectoras son conductores de cobre macizo que forman el punto de conexión central del cuadro principal (MSB). Todos los grupos se conectan a ellas mediante sus disyuntores y todos los circuitos de distribución parten de ellas. Permiten el acoplamiento en paralelo y la distribución de energía por todo el buque."},
      {q:"¿Qué es la protección de potencia inversa y por qué es necesaria?",a:"La protección de potencia inversa detecta cuando un alternador acoplado absorbe potencia en lugar de producirla. Sin esta protección, el alternador funcionaría como motor, causando daños al motor diésel. Dispara el disyuntor del alternador defectuoso."},
      {q:"¿Qué es el generador de emergencia y cuáles son sus obligaciones SOLAS?",a:"El generador de emergencia es un grupo independiente situado sobre la línea de flotación, que alimenta los equipos vitales en caso de fallo total de la red principal. Obligaciones SOLAS: arranque automático en 30 segundos, autonomía mínima de 18h para buques de pasajeros (3h para carga), alimentación obligatoria: navegación, comunicación, bomba de incendios, alumbrado de emergencia."},
      {q:"¿Cómo se realiza el trasvase de carga de un grupo a otro?",a:"Procedimiento: 1. Acoplar grupo A en paralelo (B ya en servicio). 2. Aumentar progresivamente la carga de A con el governor. 3. Reducir simultáneamente la carga de B. 4. Cuando B esté a carga nula, abrir su disyuntor. 5. Parar B. Importante: nunca cortar bruscamente para evitar perturbaciones de tensión y frecuencia."},
      {q:"¿Cuál es la tensión estándar y la frecuencia estándar a bordo de los buques modernos?",a:"Tensión principal: 440V trifásico (motores, bombas, compresores). Tensión secundaria: 220V monofásico (alumbrado, tomas). Control: 24V DC. Frecuencia: 60 Hz (buques americanos, japoneses) o 50 Hz (europeos). Depende del diseño del buque."},
      {q:"Explique qué es un disyuntor ACB y sus funciones de protección.",a:"El ACB (Air Circuit Breaker) es un disyuntor de alta potencia que usa el aire como medio de extinción del arco. Funciones: protección de sobreintensidad, cortocircuito, subtensión y potencia inversa. Puede accionarse manualmente y se rearmable tras disparar."},
      {q:"¿Cuál es la diferencia entre un cortocircuito y una sobrecarga?",a:"Sobrecarga: corriente superior a la nominal pero inferior a la de cortocircuito. Produce sobrecalentamiento progresivo. La protección de sobrecarga dispara tras un retardo. Cortocircuito: conexión directa entre fases. Corriente puede ser 10-20 veces la nominal. Daños instantáneos. La protección de cortocircuito dispara en milisegundos."},
      {q:"¿Qué es el factor de potencia (cos φ) y cómo se mejora a bordo?",a:"cos φ = Potencia activa (kW) / Potencia aparente (kVA). Un cos φ bajo (< 0,7) implica mucha potencia reactiva y corrientes elevadas. Típicamente 0,8 a bordo. Mejora: bancos de condensadores, ajuste del AVR para repartir la potencia reactiva entre los grupos acoplados."},
    ],
    pt:[
      {q:"Qual é a fórmula para calcular a frequência de um alternador?",a:"f = (n × p) / 60, onde f = frequência em Hz, n = velocidade de rotação em rpm, p = número de pares de polos. Exemplo: alternador com 2 pares de polos a 1500 rpm → f = (1500 × 2) / 60 = 50 Hz."},
      {q:"Qual é o papel do AVR (Automatic Voltage Regulator)?",a:"O AVR regula automaticamente a tensão de saída do alternador ajustando a corrente de excitação do rotor. Quando a carga aumenta e a tensão tende a cair, o AVR aumenta a corrente de excitação para manter a tensão estável a ±2% do valor nominal."},
      {q:"O que é o governor e que parâmetro elétrico controla?",a:"O governor (regulador de velocidade) mantém a velocidade de rotação do motor diesel constante (1500 ou 1800 rpm) apesar das variações de carga. Mantendo a velocidade constante, mantém indiretamente a FREQUÊNCIA (50 ou 60 Hz) da corrente produzida."},
      {q:"Quais são as três condições necessárias para operar dois alternadores em paralelo?",a:"1. Mesma tensão: tensão do grupo entrante igual à da rede (±5%). Ajustar com AVR. 2. Mesma frequência: 50 ou 60 Hz (±0,5 Hz). Ajustar com governor. 3. Mesma fase (concordância de fase): verificar com sincronoscópio ou lâmpadas de sincronização."},
      {q:"Como funciona um sincronoscópio e como se lê a sua posição?",a:"O sincronoscópio compara a tensão e frequência do grupo entrante com a rede. A agulha gira: no sentido horário se o grupo é DEMASIADO RÁPIDO, no sentido anti-horário se DEMASIADO LENTO. Fecha o disjuntor quando a agulha chega às 12h = fases alinhadas."},
      {q:"Qual é a diferença entre potência ativa (kW) e potência reativa (kVAR)?",a:"Potência ativa (kW): convertida em trabalho mecânico. Controlada pelo governor. Potência reativa (kVAR): trocada com cargas indutivas sem produzir trabalho. Controlada pelo AVR. Potência aparente (kVA) = √(kW² + kVAR²). Fator de potência cos φ = kW/kVA."},
      {q:"Por que um navio tem vários grupos geradores?",a:"Redundância, adaptação à carga, manutenção. Calculados para cobrir 100% da demanda máxima com um grupo de reserva."},
      {q:"O que são as barras coletoras e qual é o seu papel?",a:"Condutores de cobre maciço formando o ponto de ligação central do Quadro Principal (MSB). Todos os grupos ligam-se a elas e todos os circuitos partem delas."},
      {q:"O que é a proteção de potência inversa e por que é necessária?",a:"Deteta quando um alternador acoplado absorve potência em vez de a produzir. Dispara o disjuntor do alternador com defeito para evitar danos ao motor diesel."},
      {q:"O que é o gerador de emergência e quais são os requisitos SOLAS?",a:"Grupo independente acima da linha de água que alimenta equipamentos vitais. SOLAS: arranque automático em 30 segundos, 18h de autonomia (passageiros) ou 3h (carga), alimentação: navegação, comunicação, bomba de incêndio, iluminação de emergência."},
      {q:"Como se realiza a transferência de carga de um grupo para outro?",a:"1. Acoplar grupo A em paralelo. 2. Aumentar carga de A com governor. 3. Reduzir carga de B. 4. Quando B estiver a carga nula, abrir disjuntor. 5. Parar B. Nunca cortar abruptamente."},
      {q:"Quais são a tensão e frequência padrão a bordo dos navios modernos?",a:"Tensão principal: 440V trifásico. Secundária: 220V monofásico. Controlo: 24V DC. Frequência: 60 Hz (EUA, Japão) ou 50 Hz (Europa)."},
      {q:"Explique o que é um disjuntor ACB e as suas funções de proteção.",a:"Disjuntor de alta potência usando ar como meio de extinção de arco. Funções: proteção de sobrecorrente, curto-circuito, subtensão e potência inversa. Rearmaável após disparo."},
      {q:"Qual é a diferença entre curto-circuito e sobrecarga?",a:"Sobrecarga: corrente acima da nominal, sobreaquecimento progressivo, disparo com retardo. Curto-circuito: ligação direta entre fases, corrente 10-20× a nominal, danos instantâneos, disparo em milissegundos."},
      {q:"O que é o fator de potência e como se melhora a bordo?",a:"cos φ = kW/kVA. Tipicamente 0,8 a bordo. Melhora: bancos de condensadores, ajuste do AVR para repartir a potência reativa entre grupos acoplados."},
    ],
  };
  return banks[lang]||banks.fr;
}

function getQuiz(lang: string) {
  const quizzes: any = {
    fr:[
      {q:"Un alternateur tourne à 1500 tr/min avec 2 paires de pôles. Quelle est la fréquence produite ?",opts:["25 Hz","50 Hz","60 Hz","100 Hz"],correct:1,exp:"f = (n × p) / 60 = (1500 × 2) / 60 = 50 Hz. Pour 60 Hz avec 2 paires de pôles, il faudrait tourner à 1800 tr/min."},
      {q:"Quel organe contrôle la TENSION de sortie de l'alternateur ?",opts:["Le governor","Le disjoncteur ACB","L'AVR (régulateur de tension)","Le synchroscope"],correct:2,exp:"L'AVR (Automatic Voltage Regulator) contrôle la tension en ajustant le courant d'excitation du rotor. Le governor contrôle la fréquence en réglant la vitesse du moteur diesel."},
      {q:"Lors d'un couplage en parallèle, le synchroscope tourne dans le sens antihoraire. Que faire ?",opts:["Fermer immédiatement le disjoncteur","Augmenter la vitesse du groupe entrant (governor)","Diminuer la tension du groupe entrant (AVR)","Arrêter le groupe entrant"],correct:1,exp:"Sens antihoraire = groupe entrant trop LENT (fréquence trop basse). Il faut augmenter sa vitesse avec le governor pour accélérer jusqu'à ce que la fréquence corresponde au réseau."},
      {q:"Quelle est la tension triphasée standard pour les gros consommateurs à bord ?",opts:["24V","220V","440V","6600V"],correct:2,exp:"440V triphasé est la tension standard pour les gros consommateurs à bord (moteurs, pompes, compresseurs). Le 220V est utilisé pour l'éclairage et les prises. Le 24V DC est pour les systèmes de contrôle."},
      {q:"Le groupe électrogène de secours doit démarrer automatiquement en combien de secondes selon SOLAS ?",opts:["15 secondes","30 secondes","60 secondes","5 minutes"],correct:1,exp:"SOLAS exige que le groupe électrogène de secours démarre et soit prêt à alimenter les circuits vitaux en 30 secondes maximum après la perte de la source principale."},
    ],
    en:[
      {q:"An alternator runs at 1500 rpm with 2 pole pairs. What is the frequency produced?",opts:["25 Hz","50 Hz","60 Hz","100 Hz"],correct:1,exp:"f = (n × p) / 60 = (1500 × 2) / 60 = 50 Hz. For 60 Hz with 2 pole pairs, speed would need to be 1800 rpm."},
      {q:"Which device controls the alternator output VOLTAGE?",opts:["The governor","The ACB circuit breaker","The AVR (voltage regulator)","The synchroscope"],correct:2,exp:"The AVR (Automatic Voltage Regulator) controls voltage by adjusting rotor excitation current. The governor controls frequency by regulating diesel engine speed."},
      {q:"During parallel operation, the synchroscope rotates anticlockwise. What should you do?",opts:["Close the breaker immediately","Increase incoming generator speed (governor)","Decrease incoming generator voltage (AVR)","Stop the incoming generator"],correct:1,exp:"Anticlockwise = incoming generator TOO SLOW (frequency too low). Increase its speed with the governor until frequency matches the network."},
      {q:"What is the standard three-phase voltage for large consumers on board?",opts:["24V","220V","440V","6600V"],correct:2,exp:"440V three-phase is the standard voltage for large consumers on board (motors, pumps, compressors). 220V is for lighting and sockets. 24V DC is for control systems."},
      {q:"The emergency generator must start automatically within how many seconds per SOLAS?",opts:["15 seconds","30 seconds","60 seconds","5 minutes"],correct:1,exp:"SOLAS requires the emergency generator to start and be ready to supply vital circuits within 30 seconds maximum after loss of main power."},
    ],
    es:[
      {q:"Un alternador gira a 1500 rpm con 2 pares de polos. ¿Cuál es la frecuencia producida?",opts:["25 Hz","50 Hz","60 Hz","100 Hz"],correct:1,exp:"f = (n × p) / 60 = (1500 × 2) / 60 = 50 Hz. Para 60 Hz con 2 pares de polos, habría que girar a 1800 rpm."},
      {q:"¿Qué órgano controla la TENSIÓN de salida del alternador?",opts:["El governor","El disyuntor ACB","El AVR (regulador de tensión)","El sincronoscopio"],correct:2,exp:"El AVR controla la tensión ajustando la corriente de excitación del rotor. El governor controla la frecuencia regulando la velocidad del motor diésel."},
      {q:"Durante un acoplamiento en paralelo, el sincronoscopio gira en sentido antihorario. ¿Qué hacer?",opts:["Cerrar el disyuntor inmediatamente","Aumentar la velocidad del grupo entrante (governor)","Disminuir la tensión del grupo entrante (AVR)","Parar el grupo entrante"],correct:1,exp:"Sentido antihorario = grupo entrante demasiado LENTO (frecuencia baja). Aumentar su velocidad con el governor hasta que la frecuencia coincida con la red."},
      {q:"¿Cuál es la tensión trifásica estándar para los grandes consumidores a bordo?",opts:["24V","220V","440V","6600V"],correct:2,exp:"440V trifásico es la tensión estándar para grandes consumidores (motores, bombas, compresores). 220V para alumbrado y tomas. 24V DC para control."},
      {q:"El generador de emergencia debe arrancar automáticamente en cuántos segundos según SOLAS?",opts:["15 segundos","30 segundos","60 segundos","5 minutos"],correct:1,exp:"SOLAS exige que el generador de emergencia arranque y esté listo para alimentar los circuitos vitales en 30 segundos máximo tras la pérdida de la fuente principal."},
    ],
    pt:[
      {q:"Um alternador gira a 1500 rpm com 2 pares de polos. Qual é a frequência produzida?",opts:["25 Hz","50 Hz","60 Hz","100 Hz"],correct:1,exp:"f = (n × p) / 60 = (1500 × 2) / 60 = 50 Hz. Para 60 Hz com 2 pares de polos, seria necessário girar a 1800 rpm."},
      {q:"Que dispositivo controla a TENSÃO de saída do alternador?",opts:["O governor","O disjuntor ACB","O AVR (regulador de tensão)","O sincronoscópio"],correct:2,exp:"O AVR controla a tensão ajustando a corrente de excitação do rotor. O governor controla a frequência regulando a velocidade do motor diesel."},
      {q:"Durante a operação em paralelo, o sincronoscópio gira no sentido anti-horário. O que fazer?",opts:["Fechar o disjuntor imediatamente","Aumentar a velocidade do grupo entrante (governor)","Diminuir a tensão do grupo entrante (AVR)","Parar o grupo entrante"],correct:1,exp:"Sentido anti-horário = grupo entrante DEMASIADO LENTO (frequência baixa). Aumentar a velocidade com o governor até a frequência coincidir com a rede."},
      {q:"Qual é a tensão trifásica padrão para grandes consumidores a bordo?",opts:["24V","220V","440V","6600V"],correct:2,exp:"440V trifásico é a tensão padrão para grandes consumidores (motores, bombas, compressores). 220V para iluminação e tomadas. 24V DC para controlo."},
      {q:"O gerador de emergência deve arrancar automaticamente em quantos segundos segundo o SOLAS?",opts:["15 segundos","30 segundos","60 segundos","5 minutos"],correct:1,exp:"O SOLAS exige que o gerador de emergência arranque e esteja pronto a alimentar circuitos vitais em 30 segundos máximo após a perda da fonte principal."},
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
        <div key={i} style={{marginBottom:8,borderRadius:12,background:`${C.navy2}cc`,border:`1px solid ${C.elec}22`,overflow:"hidden"}}>
          <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",padding:"12px 14px",background:"none",border:"none",display:"flex",justifyContent:"space-between",alignItems:"flex-start",cursor:"pointer",textAlign:"left",gap:10}}>
            <span style={{fontSize:12,color:"rgba(240,244,255,0.8)",fontFamily:"Courier New",lineHeight:1.5}}><span style={{color:C.elec,fontWeight:700,marginRight:6}}>Q{i+1}.</span>{item.q}</span>
            <span style={{color:C.elec,fontSize:14,flexShrink:0}}>{open===i?"▲":"▼"}</span>
          </button>
          {open===i&&(
            <div style={{padding:"0 14px 12px"}}>
              <button onClick={()=>setShowAns(p=>({...p,[i]:!p[i]}))} style={{padding:"6px 12px",borderRadius:8,fontSize:10,cursor:"pointer",background:showAns[i]?`${C.elec}22`:"rgba(255,255,255,0.05)",border:`1px solid ${showAns[i]?C.elec:"rgba(255,255,255,0.12)"}`,color:showAns[i]?C.elec:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{showAns[i]?l.hide:l.show}</button>
              {showAns[i]&&<div style={{marginTop:8,padding:10,borderRadius:8,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.elec}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{item.a}</div>}
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
  const xpMap:Record<number,number>={5:200,4:160,3:120};
  const xp=xpMap[score]||80;
  const optColors=[C.elec,C.gen,C.safe,C.phase];

  if(done) return (
    <div style={{padding:"24px 14px"}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:42,marginBottom:8}}>⚡</div>
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
        <div style={{fontSize:11,color:C.gold2,fontFamily:"Courier New"}}>⭐ {score}/{quiz.length}</div>
      </div>
      <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",marginBottom:14}}>
        <div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C.elec},${C.gold})`,width:`${(cur/quiz.length)*100}%`,transition:"width 0.4s"}}/>
      </div>
      <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New",marginBottom:16,padding:12,borderRadius:10,background:`${C.navy2}cc`,border:`1px solid ${C.elec}22`}}>{q.q}</div>
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
        ?<button onClick={handleConfirm} disabled={selected===null} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:selected!==null?`linear-gradient(135deg,${C.elec},${C.gold})`:"rgba(255,255,255,0.06)",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:selected!==null?"#060e1a":"rgba(240,244,255,0.25)",cursor:selected!==null?"pointer":"default",letterSpacing:1}}>{l.submit}</button>
        :<button onClick={handleNext} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.elec},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:"#060e1a",cursor:"pointer",letterSpacing:1}}>{cur+1>=quiz.length?l.finish:l.next}</button>
      }
    </div>
  );
}

export default function LessonE2_L1({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t=T[lang]||T.fr;
  const [tab,setTab]=useState(0);
  const progress=[25,50,75,90][tab]||25;
  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3},${C.navy})`,color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.elec}33`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"6px 12px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>◀</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:2,color:C.elec,marginBottom:2}}>{t.moduleLabel} · L1</div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:"#f0f4ff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.lessonTitle}</div>
          </div>
          <div style={{fontSize:11,color:C.gold2,fontFamily:"Courier New",flexShrink:0}}>{progress}%</div>
        </div>
        <div style={{height:2,background:"rgba(255,255,255,0.06)"}}>
          <div style={{height:"100%",background:`linear-gradient(90deg,${C.elec},${C.gold})`,width:`${progress}%`,transition:"width 0.4s"}}/>
        </div>
      </div>
      <div style={{padding:"10px 14px 0"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:8,background:`${C.gold}18`,border:`1px solid ${C.gold}44`}}>
          <span style={{fontSize:12}}>⚡</span>
          <span style={{fontFamily:"'Cinzel',serif",fontSize:9,color:C.gold,letterSpacing:1}}>MACHINE · AUXILIAIRES · PREMIUM</span>
        </div>
      </div>
      <div style={{display:"flex",padding:"10px 14px 0",gap:6,overflowX:"auto",scrollbarWidth:"none"}}>
        {t.tabs.map((label:string,i:number)=>(
          <button key={i} onClick={()=>setTab(i)} style={{padding:"8px 12px",borderRadius:10,fontSize:11,cursor:"pointer",whiteSpace:"nowrap",background:tab===i?`${C.elec}22`:"rgba(255,255,255,0.04)",border:`1px solid ${tab===i?C.elec:"rgba(255,255,255,0.1)"}`,color:tab===i?C.elec:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{label}</button>
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
