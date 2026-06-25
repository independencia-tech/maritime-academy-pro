// LessonE3_L5 — Sécurités & Alarmes chaudière | PART 1
import { useState } from "react";

const C = {
  alarm:"#f97316", safe:"#6dbf8a", steam:"#4da6ff",
  danger:"#e74c3c", water:"#4da6ff", pressure:"#c084fc",
  gold:"#c9922a", gold2:"#e8b94f",
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
};

const T: any = {
  fr:{
    moduleLabel:"MACHINE — CHAUDIÈRES",
    lessonTitle:"Sécurités & Alarmes chaudière",
    intro:"La chaudière est un équipement sous pression potentiellement dangereux. Des dispositifs de sécurité obligatoires la protègent contre les surpressions, les manques d'eau et les défaillances de combustion. Comprendre ces sécurités est indispensable pour toute personne travaillant en salle des machines.",
    tabs:["📖 Contenu","✏️ Pratique","📚 Banque Q.","🎯 Quiz"],
    s1title:"🛡️ Sécurités obligatoires (SOLAS)",
    s1hint:"👆 Tapez une sécurité",
    s2title:"⚠️ Alarmes et seuils",
    s2hint:"👆 Tapez une alarme",
    s3title:"🔧 Système de gestion (BMS)",
    s3hint:"👆 Tapez une fonction",
    s4title:"🚨 Procédures d'urgence",
    s4hint:"👆 Tapez une urgence",
    keypoints:"Points clés",
    kp:[
      "SOLAS exige au moins 2 soupapes de sûreté par chaudière",
      "Arrêt automatique du brûleur si : bas niveau eau, extinction flamme, haute pression",
      "Ne jamais réarmer une sécurité sans trouver et corriger la cause",
      "Un bas niveau d'eau est l'alarme la plus critique — risque d'explosion BLEVE",
      "Le BMS (Burner Management System) séquence et protège automatiquement le brûleur",
    ],
    safeties:{
      safetyvalve:{ name:"Soupapes de sûreté", req:"SOLAS obligatoire — 2 minimum", desc:"S'ouvrent automatiquement si la pression dépasse le seuil (110% PMS). Réglées à des pressions légèrement différentes (ex : 7,5 et 8,0 bar pour une chaudière à 7 bar). Évacuent la vapeur vers un endroit sûr. Testées mensuellement (levée manuelle) et annuellement (test complet sous pression). Si une soupape s'ouvre en service normal → pression anormalement haute → investiguer immédiatement." },
      watergage:{ name:"Indicateurs de niveau d'eau", req:"SOLAS obligatoire — 2 minimum", desc:"Affichent en permanence le niveau d'eau dans le ballon. Types : tube en verre direct (réflexion), indicateurs magnétiques, télémesures. Vérification à chaque garde (concordance des deux indicateurs). Purge des indicateurs quotidienne (éviter les dépôts calcaires)." },
      lowwater:{ name:"Protection bas niveau eau", req:"SOLAS obligatoire", desc:"Niveau 1 (L1) : alarme à ~75mm sous le niveau normal → augmenter l'alimentation. Niveau 2 (L2) : arrêt automatique du brûleur à ~150mm → ne jamais rallumer sans trouver la cause. Ne JAMAIS essayer d'alimenter une chaudière à bas niveau sans brûleur (risque de coup de vapeur)." },
      flamefail:{ name:"Détecteur de flamme", req:"Obligatoire sur chaudières automatiques", desc:"Détecte la présence de la flamme (UV ou IR). Si extinction : coupure automatique du combustible en < 5 secondes, verrouillage du brûleur. Purge de la chambre obligatoire avant redémarrage. Tester périodiquement en couvrant le détecteur en fonctionnement." },
      overpressure:{ name:"Pressostat haute pression", req:"Obligatoire", desc:"Déclenche une alarme puis réduit ou coupe le brûleur si la pression dépasse le seuil réglé (ex : alarme à 6,5 bar, coupure à 7,0 bar pour chaudière à 6,5 bar). Redondant avec les soupapes de sûreté. Testé régulièrement." },
    },
    alarms:{
      highpressure:{ name:"Haute pression vapeur", level:"Alarme + réduction brûleur", cause:"Demande de vapeur trop faible par rapport à la production, brûleur trop puissant, détendeur ou vanne aval fermée.", action:"Vérifier la consommation vapeur, réduire la puissance du brûleur, vérifier les vannes aval, chercher la cause si persistant." },
      lowwater1:{ name:"Bas niveau eau (L1)", level:"ALARME — urgence immédiate", cause:"Perte d'eau (fuite), panne de la pompe d'alimentation, vanne d'alimentation fermée, forte demande de vapeur.", action:"Augmenter l'alimentation en eau, vérifier la pompe et les vannes, chercher les fuites. Ne pas attendre L2." },
      lowwater2:{ name:"Très bas niveau eau (L2)", level:"ARRÊT BRÛLEUR AUTOMATIQUE", cause:"Même causes que L1 non corrigées, perte importante d'eau.", action:"NE PAS rallumer le brûleur. Identifier et corriger la cause (fuite, pompe, vanne). Attendre retour niveau normal avec alimentation froide lente. Inspecter avant redémarrage. Chef mécanicien obligatoirement prévenu." },
      flamefail:{ name:"Extinction de flamme", level:"ARRÊT COMBUSTIBLE + VERROUILLAGE", cause:"Pression combustible trop basse, viscosité trop haute (température insuffisante), gicleur bouché, air insuffisant, détecteur défaillant.", action:"Identifier la cause, corriger. Purger la chambre (minimum 30-60 secondes). Puis seulement redémarrer via la séquence BMS. Ne jamais forcer le réarmement." },
      lowfuelpressure:{ name:"Basse pression combustible", level:"Alarme", cause:"Filtre colmaté, pompe défaillante, vanne fermée, viscosité trop élevée.", action:"Nettoyer le filtre, vérifier la pompe et les vannes, contrôler la température/viscosité du HFO." },
    },
    bms:{
      startup:{ name:"Séquence de démarrage", desc:"1. Vérifications préalables (niveau eau, pression, alimentation). 2. Purge de la chambre (ventilation 30-60 s). 3. Allumage du pilote d'allumage. 4. Détection flamme pilote par flame eye. 5. Ouverture vanne combustible principal. 6. Détection flamme principale. 7. Montée en puissance progressive. Si défaillance à toute étape → verrouillage automatique." },
      shutdown:{ name:"Séquence d'arrêt normal", desc:"1. Réduction progressive de la puissance. 2. Fermeture de la vanne de combustible. 3. Extinction flamme détectée. 4. Ventilation post-combustion (post-purge 30 s). 5. Fermeture registre d'air. La séquence garantit qu'aucun gaz non brûlé ne reste dans la chambre." },
      lockout:{ name:"Verrouillage (Lockout)", desc:"État dans lequel le BMS empêche tout redémarrage jusqu'à réarmement manuel. Déclenché par : extinction de flamme, arrêt d'urgence, anomalie détectée. OBLIGATOIRE d'investiguer la cause avant réarmement. Réarmement par bouton physique sur le tableau (pas à distance)." },
      monitoring:{ name:"Surveillance continue", desc:"Le BMS surveille en permanence : pression vapeur, niveau eau, température combustible, pression combustible, présence flamme, température gaz d'échappement. Alarmes sonores et visuelles. Historique des alarmes (data logging)." },
    },
    emergencies:{
      lowwater_emerg:{ name:"Très bas niveau d'eau (urgence)", proc:"1. NE PAS rouvrir le brûleur. 2. Ouvrir LENTEMENT l'alimentation eau froide (risque de choc thermique si eau froide sur métal surchauffé). 3. Surveiller le niveau remonter. 4. Si fuite visible : mettre hors service. 5. Chef mécanicien et officier de quart immédiatement prévenus. 6. Inspection complète avant redémarrage. 7. Consigner dans le journal.", danger:"CRITIQUE : tubes à sec = surchauffe = BLEVE (Boiling Liquid Expanding Vapour Explosion)" },
      tube_rupture:{ name:"Rupture de tube de chaudière", proc:"1. Fermer la vanne vapeur principale. 2. Couper le brûleur immédiatement (BMS ou manuel). 3. Évacuer le personnel de la zone (vapeur brûlante). 4. Attendre refroidissement complet avant inspection. 5. Ne pas ouvrir la chaudière tant qu'elle est sous pression. 6. Chef mécanicien et armateur prévenus.", danger:"Vapeur brûlante à 165°C+ — risque de brûlures graves" },
      boiler_fire:{ name:"Incendie dans la chambre de combustion", proc:"1. Couper le brûleur et l'alimentation combustible. 2. Activer le système d'extinction fixe (CO₂ ou vapeur). 3. Fermer tous les registres d'air (priver le feu d'oxygène). 4. Alerter pont et déclenchement alarme générale si nécessaire. 5. Ne pas ouvrir la porte du foyer avant extinction certaine.", danger:"Feu de HFO très difficile à éteindre" },
    },
    practiceTitle:"Exercice pratique",
    questions:[
      { q:"Décrivez la séquence de démarrage d'un brûleur de chaudière contrôlée par un BMS (Burner Management System).",
        a:"Séquence de démarrage BMS : 1. Vérifications préalables automatiques : niveau d'eau OK (> L1), pression vapeur dans les limites, pression et température combustible correctes, alimentation électrique OK. 2. Purge de la chambre (pre-purge) : le ventilateur d'air tourne à pleine vitesse pendant 30-60 secondes pour évacuer tout gaz résiduel. Volume minimum purgé = 3-4 volumes de la chambre de combustion. 3. Allumage du pilote : électrode d'allumage crée une étincelle, vanne gaz pilote (ou combustible pilote) s'ouvre. 4. Détection flamme pilote : le flame eye confirme la présence de la flamme pilote dans les 5-10 secondes. Si non détectée → verrouillage. 5. Ouverture combustible principal : vanne principale s'ouvre, combustible HFO s'enflamme sur le pilote. 6. Confirmation flamme principale : flame eye détecte la flamme principale. 7. Montée en puissance progressive selon la demande. Si défaillance à n'importe quelle étape → le BMS se verrouille (lockout) et alerte." },
      { q:"Quelles sont les actions à prendre en cas d'alarme de bas niveau d'eau (L1) sur une chaudière en service ?",
        a:"Procédure alarme bas niveau L1 : Immédiat (dans les 30 secondes) : 1. Constater l'alarme et l'acquitter (arrêter le signal sonore). 2. Vérifier le niveau visuellement aux deux indicateurs de niveau. 3. Si concordance des deux indicateurs → niveau réellement bas. 4. Augmenter manuellement l'alimentation en eau (pompe manuelle ou augmentation débit automatique). 5. Surveiller le niveau remonter. 6. Informer le chef mécanicien. Investigation : Chercher la cause : pompe d'alimentation défaillante ?, vanne d'alimentation fermée ?, fuite sur la chaudière ?, demande vapeur excessive ?. Si le niveau continue à baisser malgré l'alimentation → préparer l'arrêt. L2 (très bas niveau) = arrêt automatique du brûleur. Ne jamais ignorer une alarme L1." },
      { q:"Pourquoi est-il interdit de rallumer le brûleur immédiatement après un arrêt sur extinction de flamme ?",
        a:"Après une extinction de flamme (flame failure), le BMS déclenche la coupure automatique du combustible en < 5 secondes. Mais pendant ce court laps de temps, du combustible non brûlé (vapeurs de HFO, aérosols) peut avoir pénétré dans la chambre de combustion. Si on rallume directement : ces gaz s'enflamment violemment → explosion dans la chambre de combustion (backfire ou explosion). C'est pourquoi : 1. Le BMS se verrouille automatiquement (lockout) → redémarrage impossible sans réarmement manuel. 2. Une purge obligatoire (pre-purge) de 30-60 secondes est imposée par le BMS avant tout redémarrage. 3. La cause de l'extinction doit être identifiée et corrigée avant réarmement. La purge évacue les gaz résiduels par ventilation de la chambre → sécurité garantie pour le réallumage." },
    ],
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
  },
  en:{
    moduleLabel:"ENGINE — BOILERS",
    lessonTitle:"Boiler Safety Devices & Alarms",
    intro:"A boiler is a potentially dangerous pressure vessel. Mandatory safety devices protect it against overpressure, low water and combustion failures. Understanding these safety systems is essential for anyone working in the engine room.",
    tabs:["📖 Content","✏️ Practice","📚 Question Bank","🎯 Quiz"],
    s1title:"🛡️ Mandatory Safety Devices (SOLAS)",
    s1hint:"👆 Tap a safety device",
    s2title:"⚠️ Alarms and Thresholds",
    s2hint:"👆 Tap an alarm",
    s3title:"🔧 Management System (BMS)",
    s3hint:"👆 Tap a function",
    s4title:"🚨 Emergency Procedures",
    s4hint:"👆 Tap an emergency",
    keypoints:"Key Points",
    kp:[
      "SOLAS requires at least 2 safety valves per boiler",
      "Automatic burner shutdown if: low water, flame failure, high pressure",
      "Never reset a safety without finding and correcting the cause",
      "Low water level is the most critical alarm — BLEVE explosion risk",
      "BMS (Burner Management System) automatically sequences and protects the burner",
    ],
    safeties:{
      safetyvalve:{ name:"Safety valves", req:"SOLAS mandatory — 2 minimum", desc:"Open automatically if pressure exceeds threshold (110% MAWP). Set at slightly different pressures (e.g. 7.5 and 8.0 bar for 7 bar boiler). Vent steam to safe location. Tested monthly (manual lift) and annually (full pressure test). If a valve opens during normal service → abnormally high pressure → investigate immediately." },
      watergage:{ name:"Water level gauges", req:"SOLAS mandatory — 2 minimum", desc:"Continuously display water level in drum. Types: direct glass tube (reflex), magnetic indicators, remote reading. Check each watch (both gauges agree). Daily purging (prevent scale deposits)." },
      lowwater:{ name:"Low water protection", req:"SOLAS mandatory", desc:"Level 1 (L1): alarm at ~75mm below normal → increase feed. Level 2 (L2): automatic burner shutdown at ~150mm → never relight without finding cause. NEVER try to feed a low-water boiler without burner (steam shock risk)." },
      flamefail:{ name:"Flame detector", req:"Mandatory on automatic boilers", desc:"Detects flame presence (UV or IR). On extinction: automatic fuel cutoff < 5 seconds, burner lockout. Mandatory chamber purge before restart. Periodically test by covering detector during operation." },
      overpressure:{ name:"High pressure switch", req:"Mandatory", desc:"Triggers alarm then reduces or cuts burner if pressure exceeds set threshold (e.g. alarm at 6.5 bar, cutoff at 7.0 bar for 6.5 bar boiler). Redundant with safety valves. Tested regularly." },
    },
    alarms:{
      highpressure:{ name:"High steam pressure", level:"Alarm + burner reduction", cause:"Steam demand too low vs production, burner too powerful, downstream PRV or valve closed.", action:"Check steam consumption, reduce burner power, check downstream valves, find cause if persistent." },
      lowwater1:{ name:"Low water level (L1)", level:"ALARM — immediate emergency", cause:"Water loss (leak), feed pump failure, feed valve closed, high steam demand.", action:"Increase water feed, check pump and valves, look for leaks. Don't wait for L2." },
      lowwater2:{ name:"Very low water level (L2)", level:"AUTOMATIC BURNER SHUTDOWN", cause:"Same as L1 uncorrected, major water loss.", action:"DO NOT relight burner. Identify and correct cause (leak, pump, valve). Wait for level to return with slow cold water feed. Inspect before restart. Chief engineer must be notified." },
      flamefail:{ name:"Flame failure", level:"FUEL CUTOFF + LOCKOUT", cause:"Fuel pressure too low, viscosity too high (insufficient temperature), blocked nozzle, insufficient air, faulty detector.", action:"Identify cause, correct. Purge chamber (minimum 30-60 seconds). Then only restart via BMS sequence. Never force reset." },
      lowfuelpressure:{ name:"Low fuel pressure", level:"Alarm", cause:"Clogged filter, failed pump, closed valve, viscosity too high.", action:"Clean filter, check pump and valves, check HFO temperature/viscosity." },
    },
    bms:{
      startup:{ name:"Start-up sequence", desc:"1. Pre-checks (water level, pressure, supply). 2. Chamber purge (ventilation 30-60 s). 3. Ignition pilot light. 4. Pilot flame detection by flame eye. 5. Main fuel valve opening. 6. Main flame detection. 7. Progressive power increase. If failure at any step → automatic lockout." },
      shutdown:{ name:"Normal shutdown sequence", desc:"1. Progressive power reduction. 2. Fuel valve closure. 3. Flame extinguished detected. 4. Post-combustion ventilation (post-purge 30 s). 5. Air register closure. Sequence guarantees no unburnt gas remains in chamber." },
      lockout:{ name:"Lockout", desc:"State in which BMS prevents any restart until manual reset. Triggered by: flame failure, emergency shutdown, detected anomaly. MANDATORY to investigate cause before reset. Reset by physical button on panel (not remotely)." },
      monitoring:{ name:"Continuous monitoring", desc:"BMS continuously monitors: steam pressure, water level, fuel temperature, fuel pressure, flame presence, flue gas temperature. Audible and visual alarms. Alarm history (data logging)." },
    },
    emergencies:{
      lowwater_emerg:{ name:"Very low water level (emergency)", proc:"1. DO NOT reopen burner. 2. SLOWLY open cold water feed (thermal shock risk if cold water on overheated metal). 3. Monitor level rising. 4. If visible leak: take out of service. 5. Chief engineer and watch officer immediately notified. 6. Full inspection before restart. 7. Log in engine room log.", danger:"CRITICAL: dry tubes = overheating = BLEVE (Boiling Liquid Expanding Vapour Explosion)" },
      tube_rupture:{ name:"Boiler tube rupture", proc:"1. Close main steam valve. 2. Cut burner immediately (BMS or manual). 3. Evacuate personnel from area (scalding steam). 4. Wait complete cooling before inspection. 5. Do not open boiler while under pressure. 6. Chief engineer and shipowner notified.", danger:"Scalding steam at 165°C+ — severe burn risk" },
      boiler_fire:{ name:"Combustion chamber fire", proc:"1. Cut burner and fuel supply. 2. Activate fixed extinguishing system (CO₂ or steam). 3. Close all air registers (starve fire of oxygen). 4. Alert bridge and activate general alarm if necessary. 5. Do not open furnace door before confirmed extinguishment.", danger:"HFO fire very difficult to extinguish" },
    },
    practiceTitle:"Practice Exercise",
    questions:[
      { q:"Describe the start-up sequence of a BMS (Burner Management System)-controlled boiler burner.",
        a:"BMS start-up sequence: 1. Automatic pre-checks: water level OK (> L1), steam pressure within limits, fuel pressure and temperature correct, electrical supply OK. 2. Chamber purge (pre-purge): air fan runs at full speed for 30-60 seconds to evacuate residual gases. Minimum purged volume = 3-4 combustion chamber volumes. 3. Pilot ignition: ignition electrode sparks, pilot gas (or fuel) valve opens. 4. Pilot flame detection: flame eye confirms pilot flame presence within 5-10 seconds. If not detected → lockout. 5. Main fuel opening: main valve opens, HFO fuel ignites on pilot. 6. Main flame confirmation: flame eye detects main flame. 7. Progressive power increase per demand. If failure at any step → BMS locks out and alerts." },
      { q:"What actions to take on a low water level alarm (L1) on a running boiler?",
        a:"L1 low water alarm procedure: Immediate (within 30 seconds): 1. Acknowledge alarm (stop audible signal). 2. Visually check level at both water gauges. 3. If both gauges agree → level genuinely low. 4. Manually increase water feed (manual pump or increase automatic flow). 5. Monitor level rising. 6. Notify chief engineer. Investigation: Find cause: failed feed pump?, closed feed valve?, boiler leak?, excessive steam demand?. If level continues falling despite feed → prepare shutdown. L2 (very low water) = automatic burner shutdown. Never ignore an L1 alarm." },
      { q:"Why is it forbidden to immediately relight the burner after a flame failure shutdown?",
        a:"After flame failure, BMS triggers automatic fuel cutoff < 5 seconds. But during this brief period, unburnt fuel (HFO vapours, aerosols) may have entered the combustion chamber. Direct relight: these gases ignite violently → combustion chamber explosion (backfire or explosion). This is why: 1. BMS automatically locks out → restart impossible without manual reset. 2. Mandatory purge (pre-purge) of 30-60 seconds imposed by BMS before any restart. 3. Extinction cause must be identified and corrected before reset. Purge evacuates residual gases by chamber ventilation → guaranteed safety for re-ignition." },
    ],
    showAnswer:"Show answer", hideAnswer:"Hide",
  },
  es:{
    moduleLabel:"MÁQUINAS — CALDERAS",
    lessonTitle:"Seguridades & Alarmas de caldera",
    intro:"La caldera es un recipiente a presión potencialmente peligroso. Los dispositivos de seguridad obligatorios la protegen contra sobrepresiones, falta de agua y fallos de combustión.",
    tabs:["📖 Contenido","✏️ Práctica","📚 Banco Q.","🎯 Quiz"],
    s1title:"🛡️ Seguridades obligatorias (SOLAS)",
    s1hint:"👆 Toca una seguridad",
    s2title:"⚠️ Alarmas y umbrales",
    s2hint:"👆 Toca una alarma",
    s3title:"🔧 Sistema de gestión (BMS)",
    s3hint:"👆 Toca una función",
    s4title:"🚨 Procedimientos de emergencia",
    s4hint:"👆 Toca una emergencia",
    keypoints:"Puntos clave",
    kp:[
      "SOLAS exige al menos 2 válvulas de seguridad por caldera",
      "Parada automática del quemador si: bajo nivel agua, extinción llama, alta presión",
      "Nunca rearmar una seguridad sin encontrar y corregir la causa",
      "El bajo nivel de agua es la alarma más crítica — riesgo de explosión BLEVE",
      "El BMS secuencia y protege automáticamente el quemador",
    ],
    safeties:{
      safetyvalve:{ name:"Válvulas de seguridad", req:"SOLAS obligatorio — 2 mínimo", desc:"Se abren automáticamente si la presión supera el umbral (110% PMS). Ajustadas a presiones ligeramente diferentes. Evacúan vapor a lugar seguro. Prueba mensual (levantamiento manual) y anual (prueba completa). Si se abre en servicio normal → presión anormalmente alta → investigar." },
      watergage:{ name:"Indicadores de nivel de agua", req:"SOLAS obligatorio — 2 mínimo", desc:"Muestran permanentemente el nivel en el balón. Verificación en cada guardia (concordancia de los dos indicadores). Purga diaria (evitar depósitos calcáreos)." },
      lowwater:{ name:"Protección bajo nivel de agua", req:"SOLAS obligatorio", desc:"Nivel 1 (L1): alarma a ~75mm bajo el normal → aumentar alimentación. Nivel 2 (L2): parada automática del quemador a ~150mm → nunca rearrancar sin encontrar la causa." },
      flamefail:{ name:"Detector de llama", req:"Obligatorio en calderas automáticas", desc:"Detecta la presencia de llama (UV o IR). Si extinción: corte automático del combustible < 5 s, bloqueo del quemador. Purga obligatoria antes del rearranque." },
      overpressure:{ name:"Presostato de alta presión", req:"Obligatorio", desc:"Activa alarma y reduce o corta el quemador si la presión supera el umbral. Redundante con las válvulas de seguridad." },
    },
    alarms:{
      highpressure:{ name:"Alta presión de vapor", level:"Alarma + reducción quemador", cause:"Demanda de vapor demasiado baja, quemador demasiado potente, válvula aguas abajo cerrada.", action:"Verificar consumo, reducir potencia del quemador, verificar válvulas aguas abajo." },
      lowwater1:{ name:"Bajo nivel de agua (L1)", level:"ALARMA — urgencia inmediata", cause:"Pérdida de agua (fuga), fallo de la bomba de alimentación, válvula cerrada, alta demanda de vapor.", action:"Aumentar la alimentación, verificar bomba y válvulas, buscar fugas. No esperar a L2." },
      lowwater2:{ name:"Nivel muy bajo (L2)", level:"PARADA AUTOMÁTICA QUEMADOR", cause:"Mismas causas que L1 no corregidas, pérdida importante de agua.", action:"NO rearrancar el quemador. Identificar y corregir la causa. Esperar retorno del nivel. Jefe de máquinas obligatoriamente avisado." },
      flamefail:{ name:"Extinción de llama", level:"CORTE COMBUSTIBLE + BLOQUEO", cause:"Presión combustible baja, viscosidad alta, tobera obstruida, aire insuficiente, detector defectuoso.", action:"Identificar causa, corregir. Purgar cámara (mín. 30-60 s). Solo entonces rearrancar vía BMS." },
      lowfuelpressure:{ name:"Baja presión de combustible", level:"Alarma", cause:"Filtro taponado, bomba defectuosa, válvula cerrada, viscosidad alta.", action:"Limpiar filtro, verificar bomba y válvulas, controlar temperatura/viscosidad HFO." },
    },
    bms:{
      startup:{ name:"Secuencia de arranque", desc:"1. Verificaciones previas. 2. Purga de la cámara (30-60 s). 3. Encendido del piloto. 4. Detección llama piloto. 5. Apertura válvula combustible principal. 6. Detección llama principal. 7. Subida progresiva de potencia. Si fallo en cualquier paso → bloqueo automático." },
      shutdown:{ name:"Secuencia de parada normal", desc:"1. Reducción progresiva de potencia. 2. Cierre válvula combustible. 3. Extinción llama detectada. 4. Postpurga (30 s). 5. Cierre registro de aire. Sin gases no quemados en la cámara." },
      lockout:{ name:"Bloqueo (Lockout)", desc:"Estado en que el BMS impide cualquier rearranque hasta rearmado manual. Obligatorio investigar la causa. Rearmado por botón físico en el cuadro." },
      monitoring:{ name:"Vigilancia continua", desc:"El BMS vigila permanentemente: presión de vapor, nivel de agua, temperatura combustible, presión combustible, llama, temperatura de gases. Alarmas sonoras y visuales." },
    },
    emergencies:{
      lowwater_emerg:{ name:"Nivel muy bajo de agua (emergencia)", proc:"1. NO reabrir el quemador. 2. Abrir MUY LENTAMENTE la alimentación de agua fría. 3. Vigilar que el nivel sube. 4. Si fuga visible: poner fuera de servicio. 5. Avisar inmediatamente al jefe de máquinas. 6. Inspección completa antes del rearranque. 7. Anotar en el diario.", danger:"CRÍTICO: tubos en seco = sobrecalentamiento = BLEVE" },
      tube_rupture:{ name:"Rotura de tubo de caldera", proc:"1. Cerrar la válvula de vapor principal. 2. Cortar el quemador. 3. Evacuar al personal de la zona. 4. Esperar enfriamiento completo. 5. No abrir la caldera bajo presión. 6. Avisar al jefe de máquinas y al armador.", danger:"Vapor a 165°C+ — riesgo de quemaduras graves" },
      boiler_fire:{ name:"Incendio en la cámara de combustión", proc:"1. Cortar quemador y combustible. 2. Activar extinción fija. 3. Cerrar registros de aire. 4. Alertar al puente. 5. No abrir la puerta del hogar antes de extinción confirmada.", danger:"Fuego de HFO muy difícil de extinguir" },
    },
    practiceTitle:"Ejercicio práctico",
    questions:[
      { q:"Describa la secuencia de arranque de un quemador de caldera controlado por BMS.",
        a:"1. Verificaciones previas automáticas: nivel de agua OK (> L1), presión dentro de límites, temperatura/presión combustible correctas. 2. Purga de la cámara (prepurga): ventilador a plena potencia 30-60 s. 3. Encendido del piloto. 4. Detección llama piloto (5-10 s). Si no → bloqueo. 5. Apertura válvula combustible principal. 6. Confirmación llama principal. 7. Subida progresiva de potencia. Cualquier fallo → bloqueo automático + alarma." },
      { q:"¿Qué acciones tomar ante una alarma de bajo nivel de agua (L1)?",
        a:"Inmediato: 1. Reconocer alarma. 2. Verificar nivel en los dos indicadores. 3. Si concordan → nivel realmente bajo. 4. Aumentar manualmente la alimentación. 5. Vigilar que el nivel sube. 6. Avisar al jefe de máquinas. Investigar: bomba defectuosa, válvula cerrada, fuga, demanda excesiva. Si el nivel sigue bajando → preparar parada. L2 = parada automática. Nunca ignorar L1." },
      { q:"¿Por qué está prohibido rearrancar el quemador inmediatamente tras una extinción de llama?",a:"Tras una extinción, el BMS corta el combustible en < 5 s, pero puede haber gases no quemados (vapores de HFO) en la cámara. Si se reenciende directamente → explosión (backfire). Por eso: 1. El BMS bloquea automáticamente. 2. Purga obligatoria de 30-60 s antes de rearrancar. 3. La causa debe identificarse y corregirse antes del rearmado. La purga evacúa los gases residuales → rearranque seguro." },
    ],
    showAnswer:"Ver corrección", hideAnswer:"Ocultar",
  },
  pt:{
    moduleLabel:"MÁQUINAS — CALDEIRAS",
    lessonTitle:"Seguridades & Alarmes de caldeira",
    intro:"A caldeira é um recipiente sob pressão potencialmente perigoso. Os dispositivos de segurança obrigatórios protegem-na contra sobrepressões, falta de água e falhas de combustão.",
    tabs:["📖 Conteúdo","✏️ Prática","📚 Banco Q.","🎯 Quiz"],
    s1title:"🛡️ Seguridades obrigatórias (SOLAS)",
    s1hint:"👆 Toque numa seguridade",
    s2title:"⚠️ Alarmes e limiares",
    s2hint:"👆 Toque num alarme",
    s3title:"🔧 Sistema de gestão (BMS)",
    s3hint:"👆 Toque numa função",
    s4title:"🚨 Procedimentos de emergência",
    s4hint:"👆 Toque numa emergência",
    keypoints:"Pontos-chave",
    kp:[
      "O SOLAS exige pelo menos 2 válvulas de segurança por caldeira",
      "Paragem automática do queimador se: baixo nível água, extinção chama, alta pressão",
      "Nunca rearmar uma seguridade sem encontrar e corrigir a causa",
      "O baixo nível de água é o alarme mais crítico — risco de explosão BLEVE",
      "O BMS sequencia e protege automaticamente o queimador",
    ],
    safeties:{
      safetyvalve:{ name:"Válvulas de segurança", req:"SOLAS obrigatório — 2 mínimo", desc:"Abrem automaticamente se a pressão ultrapassa o limiar (110% PMS). Reguladas a pressões ligeiramente diferentes. Evacuam vapor para local seguro. Teste mensal e anual. Se abre em serviço normal → pressão anormalmente alta → investigar." },
      watergage:{ name:"Indicadores de nível de água", req:"SOLAS obrigatório — 2 mínimo", desc:"Mostram permanentemente o nível no balão. Verificação em cada quarto (concordância dos dois indicadores). Purga diária (evitar depósitos calcários)." },
      lowwater:{ name:"Proteção baixo nível de água", req:"SOLAS obrigatório", desc:"Nível 1 (L1): alarme a ~75mm abaixo do normal → aumentar alimentação. Nível 2 (L2): paragem automática do queimador a ~150mm → nunca rearrancar sem encontrar a causa." },
      flamefail:{ name:"Detetor de chama", req:"Obrigatório em caldeiras automáticas", desc:"Deteta a presença de chama (UV ou IR). Se extinção: corte automático do combustível < 5 s, bloqueio do queimador. Purga obrigatória antes do rearranque." },
      overpressure:{ name:"Pressostato de alta pressão", req:"Obrigatório", desc:"Aciona alarme e reduz ou corta queimador se a pressão ultrapassa o limiar. Redundante com as válvulas de segurança." },
    },
    alarms:{
      highpressure:{ name:"Alta pressão de vapor", level:"Alarme + redução queimador", cause:"Procura de vapor muito baixa, queimador demasiado potente, válvula a jusante fechada.", action:"Verificar consumo, reduzir potência do queimador, verificar válvulas a jusante." },
      lowwater1:{ name:"Baixo nível de água (L1)", level:"ALARME — urgência imediata", cause:"Perda de água (fuga), falha da bomba de alimentação, válvula fechada, alta procura de vapor.", action:"Aumentar alimentação, verificar bomba e válvulas, procurar fugas. Não esperar L2." },
      lowwater2:{ name:"Nível muito baixo (L2)", level:"PARAGEM AUTOMÁTICA QUEIMADOR", cause:"Mesmas causas que L1 não corrigidas, grande perda de água.", action:"NÃO rearrancar queimador. Identificar e corrigir causa. Aguardar retorno do nível. Chefe de máquinas obrigatoriamente avisado." },
      flamefail:{ name:"Extinção de chama", level:"CORTE COMBUSTÍVEL + BLOQUEIO", cause:"Pressão combustível baixa, viscosidade alta, bico obstruído, ar insuficiente, detetor defeituoso.", action:"Identificar causa, corrigir. Purgar câmara (mín. 30-60 s). Só então rearrancar via BMS." },
      lowfuelpressure:{ name:"Baixa pressão de combustível", level:"Alarme", cause:"Filtro entupido, bomba avariada, válvula fechada, viscosidade alta.", action:"Limpar filtro, verificar bomba e válvulas, controlar temperatura/viscosidade HFO." },
    },
    bms:{
      startup:{ name:"Sequência de arranque", desc:"1. Verificações prévias. 2. Purga da câmara (30-60 s). 3. Acendimento do piloto. 4. Deteção chama piloto. 5. Abertura válvula combustível principal. 6. Deteção chama principal. 7. Subida progressiva de potência. Se falha em qualquer passo → bloqueio automático." },
      shutdown:{ name:"Sequência de paragem normal", desc:"1. Redução progressiva de potência. 2. Fecho válvula combustível. 3. Extinção chama detetada. 4. Pós-purga (30 s). 5. Fecho registo de ar. Sem gases inqueimados na câmara." },
      lockout:{ name:"Bloqueio (Lockout)", desc:"Estado em que o BMS impede qualquer rearranque até rearmação manual. Obrigatório investigar a causa. Rearmação por botão físico no quadro." },
      monitoring:{ name:"Vigilância contínua", desc:"O BMS vigia permanentemente: pressão de vapor, nível de água, temperatura combustível, pressão combustível, chama, temperatura dos gases. Alarmes sonoros e visuais." },
    },
    emergencies:{
      lowwater_emerg:{ name:"Nível muito baixo de água (emergência)", proc:"1. NÃO reabrir queimador. 2. Abrir MUITO LENTAMENTE a alimentação de água fria. 3. Vigiar subida do nível. 4. Se fuga visível: colocar fora de serviço. 5. Avisar imediatamente chefe de máquinas. 6. Inspeção completa antes do rearranque. 7. Registar no diário.", danger:"CRÍTICO: tubos a seco = sobreaquecimento = BLEVE" },
      tube_rupture:{ name:"Rotura de tubo de caldeira", proc:"1. Fechar válvula de vapor principal. 2. Cortar queimador. 3. Evacuar pessoal da zona. 4. Aguardar arrefecimento completo. 5. Não abrir caldeira sob pressão. 6. Avisar chefe de máquinas e armador.", danger:"Vapor a 165°C+ — risco de queimaduras graves" },
      boiler_fire:{ name:"Incêndio na câmara de combustão", proc:"1. Cortar queimador e combustível. 2. Ativar extinção fixa. 3. Fechar registos de ar. 4. Alertar ponte. 5. Não abrir a porta do forno antes de extinção confirmada.", danger:"Fogo de HFO muito difícil de extinguir" },
    },
    practiceTitle:"Exercício prático",
    questions:[
      { q:"Descreva a sequência de arranque de um queimador de caldeira controlado por BMS.",
        a:"1. Verificações prévias automáticas: nível de água OK (> L1), pressão dentro de limites, temperatura/pressão combustível corretas. 2. Purga da câmara (pré-purga): ventilador a plena potência 30-60 s. 3. Acendimento do piloto. 4. Deteção chama piloto (5-10 s). Se não → bloqueio. 5. Abertura válvula combustível principal. 6. Confirmação chama principal. 7. Subida progressiva de potência. Qualquer falha → bloqueio automático + alarme." },
      { q:"Que ações tomar perante um alarme de baixo nível de água (L1)?",
        a:"Imediato: 1. Reconhecer alarme. 2. Verificar nível nos dois indicadores. 3. Se concordam → nível realmente baixo. 4. Aumentar manualmente a alimentação. 5. Vigiar subida do nível. 6. Avisar chefe de máquinas. Investigar: bomba avariada, válvula fechada, fuga, procura excessiva. Se nível continua a baixar → preparar paragem. L2 = paragem automática. Nunca ignorar L1." },
      { q:"Por que é proibido rearrancar o queimador imediatamente após extinção de chama?",a:"Após extinção, o BMS corta combustível em < 5 s, mas pode haver gases inqueimados (vapores de HFO) na câmara. Rearranque direto → explosão (backfire). Por isso: 1. O BMS bloqueia automaticamente. 2. Purga obrigatória de 30-60 s antes de rearrancar. 3. A causa deve ser identificada e corrigida antes da rearmação. A purga evacua gases residuais → rearranque seguro." },
    ],
    showAnswer:"Ver correção", hideAnswer:"Ocultar",
  },
};

// ── SVG 1 — SAFETIES ─────────────────────────────────────────
function SafetiesSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("safetyvalve");
  const items = t.safeties;
  const cols: Record<string,string> = {safetyvalve:C.pressure,watergage:C.steam,lowwater:C.danger,flamefail:C.alarm,overpressure:C.gold2};
  const icons: Record<string,string> = {safetyvalve:"🔴",watergage:"📏",lowwater:"💧⬇️",flamefail:"🔥",overpressure:"📊⬆️"};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.alarm}33`}}>
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
        {Object.entries(items).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{
            flex:1,padding:"7px 3px",borderRadius:10,fontSize:10,cursor:"pointer",minWidth:50,
            background:sel===key?`${cols[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?cols[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?cols[key]:"rgba(240,244,255,0.45)",
            fontFamily:"Courier New",textAlign:"center",
          }}>{icons[key]}</button>
        ))}
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${cols[sel]||C.alarm}44`,minHeight:80}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:cols[sel]||C.alarm,fontWeight:700,marginBottom:4}}>{icons[sel]} {items[sel].name}</div>
        <div style={{fontSize:10,color:C.gold2,fontWeight:700,marginBottom:6}}>{items[sel].req}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{items[sel].desc}</div>
      </div>
    </div>
  );
}

// ── SVG 2 — ALARMS ───────────────────────────────────────────
function AlarmsSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("lowwater1");
  const items = t.alarms;
  const cols: Record<string,string> = {highpressure:C.pressure,lowwater1:C.alarm,lowwater2:C.danger,flamefail:C.gold2,lowfuelpressure:C.safe};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.danger}33`}}>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10}}>
        {Object.entries(items).map(([key,val]:any)=>{
          const col=cols[key]||C.alarm;
          return(
            <button key={key} onClick={()=>setSel(key)} style={{
              flex:1,padding:"7px 4px",borderRadius:10,fontSize:9,cursor:"pointer",minWidth:50,
              background:sel===key?`${col}22`:"rgba(255,255,255,0.04)",
              border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`,
              color:sel===key?col:"rgba(240,244,255,0.45)",
              fontFamily:"Courier New",textAlign:"center",
            }}>{key==="highpressure"?"P↑":key==="lowwater1"?"L1":key==="lowwater2"?"L2":key==="flamefail"?"🔥":key==="lowfuelpressure"?"F↓":key}</button>
          );
        })}
      </div>
      <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${cols[sel]||C.alarm}44`,minHeight:80}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:cols[sel]||C.alarm,fontWeight:700,marginBottom:4}}>{items[sel].name}</div>
        <div style={{fontSize:10,fontWeight:700,color:C.danger,marginBottom:6,padding:"3px 8px",background:`${C.danger}18`,borderRadius:6,display:"inline-block"}}>{items[sel].level}</div>
        <div style={{fontSize:11,color:C.alarm,fontWeight:700,marginTop:6,marginBottom:2}}>{lang==="fr"?"Cause :":lang==="es"?"Causa:":lang==="pt"?"Causa:":"Cause:"}</div>
        <div style={{fontSize:11,color:"rgba(240,244,255,0.7)",fontFamily:"Courier New",marginBottom:6}}>{items[sel].cause}</div>
        <div style={{fontSize:11,color:C.safe,fontWeight:700,marginBottom:2}}>{lang==="fr"?"Action :":lang==="es"?"Acción:":lang==="pt"?"Ação:":"Action:"}</div>
        <div style={{fontSize:11,color:"rgba(240,244,255,0.7)",fontFamily:"Courier New"}}>{items[sel].action}</div>
      </div>
    </div>
  );
}

// ── SVG 3 — BMS ──────────────────────────────────────────────
function BMSSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("startup");
  const items = t.bms;
  const cols: Record<string,string> = {startup:C.safe,shutdown:C.steam,lockout:C.danger,monitoring:C.gold2};
  const icons: Record<string,string> = {startup:"▶️",shutdown:"⏹️",lockout:"🔒",monitoring:"👁️"};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.safe}33`}}>
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {Object.entries(items).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{flex:1,padding:"8px 4px",borderRadius:10,fontSize:14,cursor:"pointer",background:sel===key?`${cols[key]}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?cols[key]:"rgba(255,255,255,0.1)"}`,textAlign:"center"}}>
            {icons[key]}
          </button>
        ))}
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${cols[sel]||C.safe}44`,minHeight:80}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:cols[sel]||C.safe,fontWeight:700,marginBottom:8}}>{icons[sel]} {items[sel].name}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{items[sel].desc}</div>
      </div>
    </div>
  );
}

// ── SVG 4 — EMERGENCIES ──────────────────────────────────────
function EmergenciesSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string|null>(null);
  const items = t.emergencies;
  const eCols: Record<string,string> = {lowwater_emerg:C.danger,tube_rupture:C.alarm,boiler_fire:C.gold2};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.danger}33`}}>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {Object.entries(items).map(([key,val]:any)=>{
          const col=eCols[key]||C.danger;
          return(
            <button key={key} onClick={()=>setSel(sel===key?null:key)} style={{
              flex:1,padding:"10px 4px",borderRadius:10,cursor:"pointer",
              background:sel===key?`${col}18`:"rgba(255,255,255,0.04)",
              border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`,
              fontSize:11,color:"#f0f4ff",fontFamily:"Courier New",textAlign:"center",
            }}>{val.name}</button>
          );
        })}
      </div>
      {sel&&(
        <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${eCols[sel]||C.danger}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
          <div style={{color:C.danger,fontWeight:700,marginBottom:4,fontSize:11,padding:"4px 8px",background:`${C.danger}18`,borderRadius:6,display:"inline-block"}}>⚠️ {items[sel].danger}</div>
          <div style={{marginTop:8,color:"rgba(240,244,255,0.8)"}}>{items[sel].proc}</div>
        </div>
      )}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)"}}>{t.s4hint}</div>}
    </div>
  );
}

function ContentTab({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const section=(title:string,children:React.ReactNode,color=C.alarm)=>(
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
      {section(t.s1title,<SafetiesSVG lang={lang}/>,C.alarm)}
      {section(t.s2title,<AlarmsSVG lang={lang}/>,C.danger)}
      {section(t.s3title,<BMSSVG lang={lang}/>,C.safe)}
      {section(t.s4title,<EmergenciesSVG lang={lang}/>,C.danger)}
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
        <div key={i} style={{marginBottom:14,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.alarm}33`,overflow:"hidden"}}>
          <div style={{padding:"12px 14px"}}>
            <div style={{fontSize:10,color:C.alarm,letterSpacing:1,marginBottom:6,fontFamily:"'Cinzel',serif"}}>Q{i+1}</div>
            <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>{q.q}</div>
          </div>
          <div style={{padding:"0 14px 12px"}}>
            <button onClick={()=>toggle(i)} style={{padding:"7px 14px",borderRadius:8,fontSize:11,cursor:"pointer",background:shown[i]?`${C.alarm}22`:"rgba(255,255,255,0.06)",border:`1px solid ${shown[i]?C.alarm:"rgba(255,255,255,0.15)"}`,color:shown[i]?C.alarm:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{shown[i]?t.hideAnswer:t.showAnswer}</button>
            {shown[i]&&<div style={{marginTop:10,padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.alarm}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{q.a}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
// LessonE3_L5 — PART 2: Bank + Quiz + Main

function getBank(lang: string) {
  const b: any = {
    fr:[
      {q:"Combien de soupapes de sûreté SOLAS exige-t-il sur une chaudière marine et pourquoi ?",a:"SOLAS exige au moins 2 soupapes de sûreté par chaudière marine. Raisons : redondance (si une soupape est défaillante, l'autre prend le relais), les deux soupapes sont réglées à des pressions légèrement différentes (ex : 7,5 et 8,0 bar) pour une protection étagée, c'est un équipement critique dont la défaillance peut causer une explosion. En pratique, les deux soupapes sont testées périodiquement selon le PMS. Si une soupape s'ouvre en cours de service normal (sans avoir atteint la pression de tarage) → siège défaillant → remplacer. Si aucune soupape ne s'ouvre à la pression de tarage → risque d'explosion → urgence."},
      {q:"Qu'est-ce que le 'lockout' du BMS et quand est-il déclenché ?",a:"Le lockout (verrouillage) du BMS est un état de sécurité dans lequel le Burner Management System empêche tout redémarrage automatique du brûleur. Déclencheurs : extinction de flamme non prévue (flame failure), anomalie détectée pendant la séquence de démarrage, déclenchement d'un arrêt d'urgence, bas niveau eau L2. Conséquences : le brûleur ne peut plus démarrer automatiquement. Réarmement obligatoirement manuel (bouton physique sur le tableau). Avant réarmement : identifier et corriger la cause. Raison de sécurité : oblige l'opérateur à investiguer plutôt qu'à se contenter de réarmer en boucle (qui masquerait un problème potentiellement grave)."},
      {q:"Quelles sont les deux alarmes de niveau d'eau d'une chaudière et quelles actions déclenchent-elles ?",a:"Deux alarmes de niveau d'eau : L1 (bas niveau) : premier seuil, environ 75mm sous le niveau normal. Déclenche : alarme sonore et visuelle au pupitre. Action requise : augmenter l'alimentation en eau immédiatement, informer le chef mécanicien, rechercher la cause. Le brûleur continue à fonctionner. L2 (très bas niveau) : deuxième seuil, environ 150mm sous le niveau normal. Déclenche : arrêt automatique du brûleur (safety shutdown). Le système se verrouille. Action requise : NE PAS rallumer le brûleur. Trouver la cause (fuite, pompe, vanne), corriger. Attendre que le niveau remonte avec alimentation lente. Inspection avant redémarrage. Chef mécanicien obligatoirement prévenu. Jamais les deux alarmes ne peuvent être ignorées ou réarmées sans investigation."},
      {q:"Comment tester une soupape de sûreté de chaudière et à quelle fréquence ?",a:"Test de soupape de sûreté : Test de levée manuelle (mensuel) : avec la chaudière sous pression (minimum 75% de la pression de tarage), soulever manuellement le levier de la soupape. La soupape doit : s'ouvrir librement (pas de collage), évacuer de la vapeur, se refermer complètement et sans fuite après relâchement. Test sous pression (annuel ou selon PMS) : monter la pression jusqu'au seuil de tarage pour vérifier que la soupape s'ouvre bien automatiquement à la pression réglée. Consigner dans le registre de maintenance. Si la soupape ne s'ouvre pas ou fuit après test → remplacer ou recalibrer immédiatement. Précaution : tenir à l'écart de la sortie vapeur lors du test."},
      {q:"Pourquoi ne faut-il jamais alimenter en eau froide une chaudière dont les tubes sont à sec (surchauffés) ?",a:"Alimenter une chaudière à tubes à sec avec de l'eau froide est extrêmement dangereux. Mécanisme : les tubes et le métal de la chaudière sont portés à 300-400°C (au-delà de la température de saturation) en cas de manque d'eau. Si on introduit brutalement de l'eau froide sur ces métaux surchauffés : Choc thermique : contraction rapide du métal → contraintes mécaniques immenses → fissures, déformation, rupture des soudures. Vaporisation explosive : l'eau froide est instantanément vaporisée → expansion de volume brutale (~1700x) → surpression explosive. Ce phénomène est appelé BLEVE (Boiling Liquid Expanding Vapour Explosion) ou simplement explosion de chaudière. Procédure correcte : attendre le refroidissement naturel (brûleur éteint), puis alimenter TRÈS LENTEMENT et progressivement avec surveillance constante de la pression."},
      {q:"Qu'est-ce qu'un pressostat de haute pression sur une chaudière et quel est son rôle ?",a:"Le pressostat de haute pression est un dispositif électrique qui surveille en permanence la pression de vapeur et déclenche des actions de protection si elle dépasse des seuils définis. Fonctionnement : deux seuils généralement : seuil d'alarme (ex : 105% de la PMS) → alarme sonore et visuelle, réduction de la puissance du brûleur. Seuil d'arrêt (ex : 110% de la PMS) → coupure automatique du brûleur. La pression est détectée par un pressostat électrique ou un transmetteur de pression connecté au BMS. Différence avec la soupape de sûreté : le pressostat est électronique et évite d'atteindre la pression d'ouverture des soupapes. Les soupapes de sûreté sont la dernière ligne de défense mécanique. Test régulier obligatoire du pressostat (simuler une haute pression)."},
      {q:"Quelles informations doivent être consignées dans le journal machine en cas d'arrêt d'urgence de chaudière ?",a:"Informations à consigner lors d'un arrêt d'urgence chaudière : Heure exacte de l'incident. Nature de l'alarme/incident : bas niveau eau L2, extinction de flamme, haute pression, etc. État du système avant l'incident : pression, niveau eau, puissance brûleur. Actions prises : qui a fait quoi et à quelle heure. Cause identifiée. Mesures correctives appliquées. Heure de remise en service. Personnes informées (chef mécanicien, commandant si nécessaire). Cette documentation est obligatoire et peut être examinée lors des inspections de l'État du port (PSC). Elle constitue aussi un outil d'amélioration de la sécurité (analyse des causes récurrentes)."},
      {q:"Comment fonctionne un détecteur de flamme UV/IR sur un brûleur de chaudière ?",a:"Deux technologies principales : Détecteur UV (ultraviolet) : la flamme émet des rayonnements UV caractéristiques. Le capteur UV détecte ces rayonnements dans la chambre de combustion. Avantages : très sensible, réaction rapide (< 1 s). Inconvénient : peut être aveuglé par les dépôts de suie sur la lentille. Détecteur IR (infrarouge) : détecte le rayonnement infrarouge (chaleur) de la flamme. Plus robuste aux conditions poussiéreuses. Peut être perturbé par les surfaces chaudes environnantes. Test périodique : couvrir le détecteur en cours de fonctionnement → le BMS doit détecter l'extinction et couper le combustible en < 5 secondes. Si pas de réaction → remplacer le détecteur. Entretien : nettoyer régulièrement la lentille (suie). Vérifier la connexion électrique."},
      {q:"Qu'est-ce qu'une explosion de chaudière (BLEVE) et comment la prévenir ?",a:"BLEVE (Boiling Liquid Expanding Vapour Explosion) : explosion due à la rupture catastrophique d'une chaudière ou d'un récipient sous pression contenant un liquide à une température bien supérieure à son point d'ébullition à pression atmosphérique. Mécanisme : rupture soudaine de la paroi (surchauffe, corrosion, défaut métallurgique) → la pression chute instantanément → l'eau se vaporise en 1/1000 de seconde → expansion de volume de 1700x → onde de choc explosive. Causes à bord : manque d'eau (surchauffe des tubes), entartrage extrême (surchauffe localisée), corrosion grave, surpression (soupapes défaillantes). Prévention : surveillance permanente du niveau d'eau, traitement eau correct, test des soupapes, entretien régulier, inspection par société de classification (5 ans)."},
      {q:"Pourquoi la purge de la chambre de combustion (pre-purge) est-elle imposée avant chaque démarrage ?",a:"La pre-purge (ventilation de la chambre avant allumage) est une mesure de sécurité absolue. Objectif : évacuer tout gaz combustible résiduel de la chambre de combustion avant l'allumage. Risque sans purge : si des vapeurs de HFO résiduelles sont présentes dans la chambre et qu'on allume, ces vapeurs s'enflamment violemment → explosion dans la chambre → dommages graves. Volume de purge requis : minimum 3-4 volumes de la chambre de combustion. Durée typique : 30-60 secondes avec le ventilateur d'air à pleine puissance. Imposée par : les normes SOLAS, les codes de classification, le BMS (séquence automatique). Le BMS chronométre la durée de purge et ne permet l'allumage qu'après. Valable aussi après toute extinction de flamme (flame failure)."},
      {q:"Comment inspecter et tester un pressostat de haute pression sur une chaudière ?",a:"Inspection et test du pressostat : Inspection visuelle : connexion électrique correcte, pas de fuite sur le raccord de pression, protection mécanique intacte. Test fonctionnel (sans dépressurisation) : utiliser un générateur de pression de test pour simuler une haute pression sur le pressostat → vérifier le déclenchement à la pression réglée. Test en conditions réelles (annuel) : monter progressivement la pression et vérifier le déclenchement de l'alarme puis de l'arrêt aux seuils réglés. Consigner dans le registre de maintenance. Remplacement si : dérive de la valeur de déclenchement (> ±2%), contact électrique défectueux, connexion de pression avec fuite. Important : ne jamais court-circuiter ou bypasser un pressostat pour contourner un problème."},
      {q:"Quelles sont les responsabilités du mécanicien de quart en cas d'alarme chaudière ?",a:"Responsabilités du mécanicien de quart (OOW) en cas d'alarme chaudière : Réponse immédiate (< 1 minute) : accuser réception de l'alarme (stop alarme sonore). Se rendre immédiatement à la chaudière. Évaluer la situation (quel type d'alarme, quel niveau de gravité). Évaluation et action (1-5 minutes) : appliquer la procédure correspondante (PMS ou manuel de bord). Si arrêt de sécurité : ne pas réarmer sans en trouver la cause. Si doute sur la sécurité : éteindre la chaudière. Communication : informer le chef mécanicien IMMÉDIATEMENT pour toute alarme grave (L2, extinction flamme, haute pression). Consigner dans le journal machine : heure, nature alarme, actions prises. Documentation : toutes les alarmes et les actions doivent être consignées."},
    ],
    en:[
      {q:"How many safety valves does SOLAS require on a marine boiler and why?",a:"SOLAS requires at least 2 safety valves per marine boiler. Reasons: redundancy (if one valve fails, the other takes over), both valves set at slightly different pressures (e.g. 7.5 and 8.0 bar) for staged protection, critical equipment whose failure can cause explosion. In practice both valves tested periodically per PMS. If a valve opens during normal service (without reaching set pressure) → defective seat → replace. If no valve opens at set pressure → explosion risk → emergency."},
      {q:"What is BMS 'lockout' and when is it triggered?",a:"BMS lockout is a safety state in which the Burner Management System prevents any automatic burner restart. Triggers: unplanned flame failure, anomaly detected during start sequence, emergency shutdown, L2 low water level. Consequences: burner cannot restart automatically. Manual reset mandatory (physical button on panel). Before reset: identify and correct cause. Safety reason: forces operator to investigate rather than simply repeatedly resetting (which would mask a potentially serious problem)."},
      {q:"What are the two water level alarms on a boiler and what actions do they trigger?",a:"Two water level alarms: L1 (low level): first threshold, approx 75mm below normal. Triggers: audible and visual alarm at console. Action: increase water feed immediately, notify chief engineer, find cause. Burner continues operating. L2 (very low level): second threshold, approx 150mm below normal. Triggers: automatic burner shutdown (safety shutdown). System locks out. Action: DO NOT relight burner. Find cause (leak, pump, valve), correct. Wait for level to rise with slow feed. Inspection before restart. Chief engineer must be notified. Neither alarm can ever be ignored or reset without investigation."},
      {q:"How to test a boiler safety valve and at what frequency?",a:"Safety valve testing: Manual lift test (monthly): with boiler under pressure (minimum 75% of set pressure), manually lift valve lever. Valve must: open freely (no sticking), vent steam, close completely without leak after release. Pressure test (annual or per PMS): raise pressure to set pressure to verify valve opens automatically at set pressure. Log in maintenance register. If valve doesn't open or leaks after test → replace or recalibrate immediately. Caution: stay clear of steam discharge during test."},
      {q:"Why must cold water never be fed into a boiler with dry (overheated) tubes?",a:"Feeding cold water into a boiler with dry tubes is extremely dangerous. Mechanism: tubes and boiler metal are at 300-400°C (above saturation temperature) when water is absent. If cold water is suddenly introduced onto these overheated metals: Thermal shock: rapid metal contraction → immense mechanical stresses → cracks, deformation, weld rupture. Explosive vaporisation: cold water instantly vaporised → brutal volume expansion (~1700×) → explosive overpressure. This is called BLEVE (Boiling Liquid Expanding Vapour Explosion). Correct procedure: allow natural cooling (burner off), then feed VERY SLOWLY and progressively with constant pressure monitoring."},
      {q:"What is a high pressure switch on a boiler and what is its role?",a:"A high pressure switch is an electrical device that continuously monitors steam pressure and triggers protective actions if it exceeds defined thresholds. Operation: usually two thresholds: alarm threshold (e.g. 105% MAWP) → audible and visual alarm, burner power reduction. Trip threshold (e.g. 110% MAWP) → automatic burner cutoff. Pressure detected by electrical pressure switch or pressure transmitter connected to BMS. Difference from safety valve: pressure switch is electronic and avoids reaching valve opening pressure. Safety valves are the last mechanical line of defence. Regular functional test mandatory."},
      {q:"What information must be logged in the engine room log after a boiler emergency shutdown?",a:"Information to log during boiler emergency: Exact time of incident. Nature of alarm/incident: L2 low water, flame failure, high pressure, etc. System state before incident: pressure, water level, burner power. Actions taken: who did what and when. Identified cause. Corrective measures applied. Time of return to service. Persons notified (chief engineer, master if necessary). Documentation is mandatory and may be examined at Port State Control (PSC) inspections. Also a safety improvement tool (recurring cause analysis)."},
      {q:"How does a UV/IR flame detector work on a boiler burner?",a:"Two main technologies: UV detector: flame emits characteristic UV radiation. UV sensor detects this radiation in combustion chamber. Advantages: very sensitive, fast response (< 1 s). Disadvantage: can be blinded by soot deposits on lens. IR detector: detects infrared (heat) radiation from flame. More robust in dusty conditions. Can be disturbed by surrounding hot surfaces. Periodic test: cover detector during operation → BMS must detect extinction and cut fuel in < 5 seconds. If no reaction → replace detector. Maintenance: regularly clean lens (soot). Check electrical connection."},
      {q:"What is a boiler explosion (BLEVE) and how to prevent it?",a:"BLEVE (Boiling Liquid Expanding Vapour Explosion): explosion from catastrophic rupture of boiler or pressure vessel containing liquid at temperature far above its atmospheric boiling point. Mechanism: sudden wall rupture (overheating, corrosion, metallurgical defect) → pressure instantly drops → water vaporises in 1/1000 second → 1700× volume expansion → explosive shock wave. On-board causes: water shortage (tube overheating), extreme scaling (localised overheating), serious corrosion, overpressure (failed safety valves). Prevention: continuous water level monitoring, correct water treatment, safety valve testing, regular maintenance, classification society inspection (5 years)."},
      {q:"Why is combustion chamber purge (pre-purge) mandatory before each start-up?",a:"Pre-purge (chamber ventilation before ignition) is an absolute safety measure. Objective: evacuate all residual combustible gas from combustion chamber before ignition. Risk without purge: if residual HFO vapours are present in chamber and ignition occurs, vapours ignite violently → chamber explosion → serious damage. Required purge volume: minimum 3-4 combustion chamber volumes. Typical duration: 30-60 seconds with air fan at full power. Mandated by: SOLAS regulations, classification codes, BMS (automatic sequence). BMS times the purge duration and only permits ignition after. Also valid after any flame failure."},
      {q:"How to inspect and test a high pressure switch on a boiler?",a:"Pressure switch inspection and test: Visual inspection: correct electrical connection, no leak on pressure fitting, mechanical protection intact. Functional test (without depressurisation): use test pressure generator to simulate high pressure on switch → verify trip at set pressure. Real-conditions test (annual): progressively raise pressure and verify alarm then trip at set thresholds. Log in maintenance register. Replace if: trip value drift (> ±2%), defective electrical contact, pressure connection leak. Important: never bypass or short-circuit a pressure switch to get around a problem."},
      {q:"What are the watch engineer's responsibilities during a boiler alarm?",a:"Watch engineer (OOW) responsibilities during boiler alarm: Immediate response (< 1 minute): acknowledge alarm (stop audible alarm). Go immediately to boiler. Assess situation (alarm type, severity). Assessment and action (1-5 minutes): apply corresponding procedure (PMS or ship manual). If safety shutdown: do not reset without finding cause. If safety in doubt: shut down boiler. Communication: notify chief engineer IMMEDIATELY for any serious alarm (L2, flame failure, high pressure). Log in engine room log: time, alarm type, actions taken. Documentation: all alarms and actions must be logged."},
    ],
    es:[
      {q:"¿Cuántas válvulas de seguridad exige el SOLAS en una caldera marina?",a:"Al menos 2 válvulas de seguridad por caldera. Razones: redundancia (si una falla, la otra actúa), ajustadas a presiones ligeramente diferentes para protección escalonada, equipo crítico cuya falla puede causar explosión. Si una se abre en servicio normal → asiento defectuoso → sustituir. Si ninguna se abre a la presión de tarado → urgencia."},
      {q:"¿Qué es el 'lockout' del BMS y cuándo se activa?",a:"Estado de seguridad en el que el BMS impide cualquier rearranque automático. Activadores: extinción de llama, anomalía en la secuencia de arranque, parada de emergencia, bajo nivel L2. Rearmado obligatoriamente manual (botón físico). Obligatorio investigar la causa antes del rearmado."},
      {q:"¿Cuáles son las dos alarmas de nivel de agua de una caldera?",a:"L1 (bajo nivel): ~75mm bajo el normal. Alarma sonora/visual. Aumentar la alimentación, avisar al jefe de máquinas. El quemador sigue funcionando. L2 (nivel muy bajo): ~150mm. Parada automática del quemador. NO rearrancar sin encontrar la causa. Jefe de máquinas obligatoriamente avisado."},
      {q:"¿Cómo probar una válvula de seguridad de caldera?",a:"Prueba de levantamiento manual (mensual): con la caldera bajo presión (mín. 75% de tarado), levantar el palanca. La válvula debe abrirse libremente y cerrarse completamente. Prueba bajo presión (anual): subir la presión hasta el tarado. Registrar en el libro de mantenimiento. Si no abre o tiene fugas → sustituir o recalibrar."},
      {q:"¿Por qué nunca se debe alimentar con agua fría una caldera con tubos en seco?",a:"Los tubos surchauffados a 300-400°C. Si se introduce agua fría: choque térmico → fisuras, deformación. Vaporización explosiva → expansión de volumen 1700x → sobrepresión explosiva (BLEVE). Procedimiento correcto: esperar el enfriamiento natural, luego alimentar MUY LENTAMENTE con vigilancia constante de la presión."},
      {q:"¿Qué es un presostato de alta presión en una caldera?",a:"Dispositivo que vigila permanentemente la presión de vapor. Dos umbrales: alarma (105% PMS) → alarma + reducción quemador. Disparo (110% PMS) → corte automático quemador. Redundante con las válvulas de seguridad. Prueba periódica obligatoria."},
      {q:"¿Qué información debe consignarse en el diario de máquinas tras una parada de emergencia?",a:"Hora exacta, naturaleza de la alarma, estado del sistema antes, acciones tomadas (quién, cuándo), causa identificada, medidas correctivas, hora de reanudación, personas avisadas. Obligatorio y revisado en inspecciones PSC."},
      {q:"¿Cómo funciona un detector de llama UV/IR?",a:"UV: detecta la radiación UV de la llama. Muy sensible, respuesta rápida. Puede cegarse con hollín. IR: detecta radiación infrarroja. Más robusto en ambientes polvorientos. Test periódico: cubrir el detector → BMS debe cortar combustible en < 5 s."},
      {q:"¿Qué es una explosión de caldera (BLEVE)?",a:"Explosión por rotura catastrófica de recipiente a presión con líquido muy por encima de su punto de ebullición. Mecanismo: rotura súbita → presión cae → agua se vaporiza en 1/1000 s → expansión 1700x → onda de choque. Causas: falta de agua, incrustaciones, corrosión, sobrepresión. Prevención: vigilancia nivel, tratamiento agua, prueba válvulas, mantenimiento."},
      {q:"¿Por qué la purga de la cámara de combustión (prepurga) es obligatoria antes de cada arranque?",a:"Para evacuar vapores de HFO residuales antes del encendido. Sin purga: inflamación violenta → explosión en la cámara. Volumen mínimo: 3-4 volúmenes de la cámara. Duración: 30-60 s con ventilador a plena potencia. Impuesta por SOLAS, normas de clasificación y BMS."},
      {q:"¿Cómo inspeccionar y probar un presostato de alta presión?",a:"Inspección visual: conexión eléctrica, sin fugas, protección mecánica intacta. Test funcional: simular alta presión → verificar disparo. Test real (anual): subir presión progresivamente. Sustituir si: deriva del valor de disparo (> ±2%), contacto defectuoso, fuga. Nunca cortocircuitar o bypasear."},
      {q:"¿Cuáles son las responsabilidades del maquinista de guardia ante una alarma de caldera?",a:"< 1 minuto: reconocer alarma, acudir a la caldera, evaluar. 1-5 minutos: aplicar procedimiento, no rearmar sin encontrar causa, apagar si hay duda de seguridad. Avisar inmediatamente al jefe de máquinas en alarmas graves. Registrar en diario de máquinas."},
    ],
    pt:[
      {q:"Quantas válvulas de segurança exige o SOLAS numa caldeira marinha?",a:"Pelo menos 2 válvulas de segurança por caldeira. Razões: redundância (se uma falha, a outra atua), reguladas a pressões ligeiramente diferentes para proteção escalonada, equipamento crítico cuja falha pode causar explosão. Se abre em serviço normal → assento defeituoso → substituir. Se nenhuma abre à pressão de taramento → urgência."},
      {q:"O que é o 'lockout' do BMS e quando é acionado?",a:"Estado de segurança em que o BMS impede qualquer rearranque automático. Acionadores: extinção de chama, anomalia na sequência de arranque, paragem de emergência, baixo nível L2. Rearmação obrigatoriamente manual (botão físico). Obrigatório investigar a causa antes da rearmação."},
      {q:"Quais são os dois alarmes de nível de água de uma caldeira?",a:"L1 (nível baixo): ~75mm abaixo do normal. Alarme sonoro/visual. Aumentar alimentação, avisar chefe de máquinas. Queimador continua. L2 (nível muito baixo): ~150mm. Paragem automática do queimador. NÃO rearrancar sem encontrar a causa. Chefe de máquinas obrigatoriamente avisado."},
      {q:"Como testar uma válvula de segurança de caldeira?",a:"Teste de levantamento manual (mensal): com caldeira sob pressão (mín. 75% do taramento), levantar a alavanca. Deve abrir livremente e fechar completamente. Teste sob pressão (anual): subir pressão até ao taramento. Registar no livro de manutenção. Se não abre ou veda mal → substituir ou recalibrar."},
      {q:"Por que nunca se deve alimentar com água fria uma caldeira com tubos a seco?",a:"Tubos sobreaquecidos a 300-400°C. Água fria: choque térmico → fissuras, deformação. Vaporização explosiva → expansão de volume 1700x → sobrepressão explosiva (BLEVE). Procedimento correto: aguardar arrefecimento natural, depois alimentar MUITO LENTAMENTE com vigilância constante da pressão."},
      {q:"O que é um pressostato de alta pressão numa caldeira?",a:"Dispositivo que vigia permanentemente a pressão de vapor. Dois limiares: alarme (105% PMS) → alarme + redução queimador. Disparo (110% PMS) → corte automático queimador. Redundante com as válvulas de segurança. Teste periódico obrigatório."},
      {q:"Que informações devem ser registadas no diário de máquinas após uma paragem de emergência?",a:"Hora exata, natureza do alarme, estado do sistema antes, ações tomadas (quem, quando), causa identificada, medidas corretivas, hora de reanudação, pessoas avisadas. Obrigatório e verificado em inspeções PSC."},
      {q:"Como funciona um detetor de chama UV/IR?",a:"UV: deteta radiação UV da chama. Muito sensível, resposta rápida. Pode cegar com fuligem. IR: deteta radiação infravermelha. Mais robusto em ambientes com poeiras. Teste periódico: cobrir detetor → BMS deve cortar combustível em < 5 s."},
      {q:"O que é uma explosão de caldeira (BLEVE)?",a:"Explosão por rotura catastrófica de recipiente sob pressão com líquido muito acima do ponto de ebulição. Mecanismo: rotura súbita → pressão cai → água vaporiza em 1/1000 s → expansão 1700x → onda de choque. Causas: falta de água, incrustações, corrosão, sobrepressão. Prevenção: vigilância nível, tratamento água, teste válvulas, manutenção."},
      {q:"Por que a purga da câmara de combustão (pré-purga) é obrigatória antes de cada arranque?",a:"Para evacuar vapores de HFO residuais antes do acendimento. Sem purga: inflamação violenta → explosão na câmara. Volume mínimo: 3-4 volumes da câmara. Duração: 30-60 s com ventilador a plena potência. Imposta por SOLAS, normas de classificação e BMS."},
      {q:"Como inspecionar e testar um pressostato de alta pressão?",a:"Inspeção visual: ligação elétrica, sem fugas, proteção mecânica intacta. Teste funcional: simular alta pressão → verificar disparo. Teste real (anual): subir pressão progressivamente. Substituir se: deriva do valor de disparo (> ±2%), contacto defeituoso, fuga. Nunca curto-circuitar ou contornar."},
      {q:"Quais são as responsabilidades do maquinista de quarto perante um alarme de caldeira?",a:"< 1 min: reconhecer alarme, ir à caldeira, avaliar. 1-5 min: aplicar procedimento, não rearmar sem encontrar causa, apagar se dúvida de segurança. Avisar imediatamente chefe de máquinas em alarmes graves. Registar no diário de máquinas."},
    ],
  };
  return b[lang]||b.fr;
}

function getQuiz(lang: string) {
  const q: any = {
    fr:[
      {q:"Combien de soupapes de sûreté le SOLAS exige-t-il au minimum sur une chaudière marine ?",opts:["1","2","3","4"],correct:1,exp:"SOLAS exige au minimum 2 soupapes de sûreté par chaudière marine. Les deux sont réglées à des pressions légèrement différentes pour une protection étagée. Si une seule soupape était présente et défaillante, il n'y aurait aucune protection mécanique contre la surpression → risque d'explosion."},
      {q:"Qu'est-ce qui se passe automatiquement quand le niveau d'eau atteint le seuil L2 (très bas niveau) ?",opts:["Une alarme sonne seulement","Le brûleur s'arrête automatiquement et le BMS se verrouille","La pompe d'alimentation démarre automatiquement","La soupape de sûreté s'ouvre"],correct:1,exp:"Au seuil L2 (très bas niveau, environ 150mm sous le niveau normal), le brûleur s'arrête automatiquement (safety shutdown) et le BMS se verrouille (lockout). Le redémarrage n'est possible qu'après investigation et réarmement manuel. Le seuil L1 (moins critique) déclenche uniquement une alarme."},
      {q:"Pourquoi une purge de la chambre de combustion (pre-purge) est-elle obligatoire avant tout démarrage de brûleur ?",opts:["Pour réchauffer la chambre","Pour évacuer les gaz résiduels et prévenir une explosion","Pour vérifier le débit d'air","Pour nettoyer le gicleur"],correct:1,exp:"La pre-purge est obligatoire pour évacuer tout gaz combustible résiduel (vapeurs de HFO) de la chambre de combustion avant l'allumage. Sans purge, ces gaz pourraient s'enflammer violemment lors de l'allumage → explosion dans la chambre. Le BMS impose automatiquement 30-60 secondes de ventilation."},
      {q:"Que doit faire le mécanicien en premier lieu après un arrêt automatique du brûleur sur alarme L2 (très bas niveau d'eau) ?",opts:["Réarmer immédiatement le BMS et relancer le brûleur","Identifier la cause avant tout réarmement","Ouvrir rapidement l'alimentation en eau à plein débit","Appuyer sur le bouton d'arrêt d'urgence"],correct:1,exp:"Après un arrêt L2, la PREMIÈRE action est d'identifier la cause de la perte d'eau (fuite, pompe défaillante, vanne fermée) avant tout réarmement. Réarmer sans trouver la cause risque de répéter l'incident avec des conséquences potentiellement graves. Chef mécanicien à prévenir immédiatement."},
      {q:"Qu'est-ce qu'un 'lockout' du BMS (Burner Management System) ?",opts:["Un mode de fonctionnement économique","Un état de sécurité qui empêche tout redémarrage automatique jusqu'à réarmement manuel","Une alarme de maintenance programmée","Un mode de test des soupapes de sûreté"],correct:1,exp:"Le lockout est un état de sécurité du BMS qui empêche tout redémarrage du brûleur jusqu'à ce qu'un opérateur ait physiquement appuyé sur le bouton de réarmement sur le tableau. Ce mécanisme oblige l'opérateur à investiguer la cause de l'arrêt avant de relancer le brûleur, évitant les cycles répétés de démarrage/arrêt qui masqueraient un problème grave."},
    ],
    en:[
      {q:"How many safety valves does SOLAS require as a minimum on a marine boiler?",opts:["1","2","3","4"],correct:1,exp:"SOLAS requires a minimum of 2 safety valves per marine boiler. Both set at slightly different pressures for staged protection. A single valve failing would leave no mechanical overpressure protection → explosion risk."},
      {q:"What happens automatically when water level reaches L2 threshold (very low water)?",opts:["Only an alarm sounds","Burner automatically shuts down and BMS locks out","Feed pump starts automatically","Safety valve opens"],correct:1,exp:"At L2 threshold (very low water, approximately 150mm below normal), burner automatically shuts down (safety shutdown) and BMS locks out. Restart only possible after investigation and manual reset. L1 threshold (less critical) triggers alarm only."},
      {q:"Why is combustion chamber purge (pre-purge) mandatory before any burner start?",opts:["To warm up the chamber","To evacuate residual gases and prevent explosion","To check air flow","To clean the nozzle"],correct:1,exp:"Pre-purge is mandatory to evacuate residual combustible gases (HFO vapours) from combustion chamber before ignition. Without purging, gases could ignite violently on ignition → chamber explosion. BMS automatically imposes 30-60 seconds of ventilation."},
      {q:"What should the engineer do FIRST after automatic burner shutdown on L2 alarm (very low water)?",opts:["Immediately reset BMS and restart burner","Identify cause before any reset","Quickly open water feed at full flow","Press emergency stop button"],correct:1,exp:"After L2 shutdown, FIRST action is identifying the cause of water loss (leak, failed pump, closed valve) before any reset. Resetting without finding cause risks repeating incident with potentially serious consequences. Chief engineer to be notified immediately."},
      {q:"What is a BMS (Burner Management System) 'lockout'?",opts:["An economical operating mode","A safety state preventing automatic restart until manual reset","A scheduled maintenance alarm","A safety valve test mode"],correct:1,exp:"Lockout is a BMS safety state preventing burner restart until an operator physically presses the reset button on the panel. This mechanism forces the operator to investigate the shutdown cause before relighting, preventing repeated start/stop cycles that would mask a serious problem."},
    ],
    es:[
      {q:"¿Cuántas válvulas de seguridad exige el SOLAS como mínimo en una caldera marina?",opts:["1","2","3","4"],correct:1,exp:"El SOLAS exige mínimo 2 válvulas de seguridad por caldera. Ajustadas a presiones ligeramente diferentes para protección escalonada. Una sola válvula fallida dejaría sin protección mecánica contra sobrepresión → riesgo de explosión."},
      {q:"¿Qué ocurre automáticamente cuando el nivel alcanza L2 (nivel muy bajo)?",opts:["Solo suena una alarma","El quemador se para automáticamente y el BMS se bloquea","La bomba de alimentación arranca","La válvula de seguridad se abre"],correct:1,exp:"En L2 (~150mm bajo el normal), el quemador se para automáticamente y el BMS se bloquea (lockout). Solo se puede rearrancar tras investigación y rearmado manual. L1 solo activa una alarma."},
      {q:"¿Por qué la purga de la cámara (prepurga) es obligatoria antes del arranque?",opts:["Para calentar la cámara","Para evacuar gases residuales y prevenir una explosión","Para verificar el caudal de aire","Para limpiar la tobera"],correct:1,exp:"Para evacuar vapores de HFO residuales. Sin purga: inflamación violenta → explosión. El BMS impone 30-60 s de ventilación automáticamente."},
      {q:"¿Qué debe hacer el maquinista primero tras una parada automática por L2?",opts:["Rearmar inmediatamente y rearrancar","Identificar la causa antes de cualquier rearmado","Abrir la alimentación a pleno caudal","Pulsar el botón de parada de emergencia"],correct:1,exp:"La PRIMERA acción es identificar la causa de la pérdida de agua antes de cualquier rearmado. Rearmar sin encontrar la causa puede repetir el incidente con consecuencias graves."},
      {q:"¿Qué es el 'lockout' del BMS?",opts:["Un modo económico de funcionamiento","Un estado de seguridad que impide rearranque automático hasta rearmado manual","Una alarma de mantenimiento programado","Un modo de prueba de válvulas"],correct:1,exp:"Estado de seguridad que impide rearrancar el quemador hasta que un operador pulse físicamente el botón de rearmado en el cuadro. Obliga a investigar la causa antes de rearrancar."},
    ],
    pt:[
      {q:"Quantas válvulas de segurança exige o SOLAS como mínimo numa caldeira marinha?",opts:["1","2","3","4"],correct:1,exp:"O SOLAS exige mínimo 2 válvulas de segurança por caldeira. Reguladas a pressões ligeiramente diferentes para proteção escalonada. Uma única válvula em falha deixaria sem proteção mecânica → risco de explosão."},
      {q:"O que acontece automaticamente quando o nível atinge L2 (nível muito baixo)?",opts:["Apenas soa um alarme","O queimador para automaticamente e o BMS bloqueia","A bomba de alimentação arranca","A válvula de segurança abre"],correct:1,exp:"Em L2 (~150mm abaixo do normal), o queimador para automaticamente e o BMS bloqueia (lockout). Só se pode rearrancar após investigação e rearmação manual. L1 só ativa alarme."},
      {q:"Por que a purga da câmara (pré-purga) é obrigatória antes do arranque?",opts:["Para aquecer a câmara","Para evacuar gases residuais e prevenir explosão","Para verificar o caudal de ar","Para limpar o bico"],correct:1,exp:"Para evacuar vapores de HFO residuais. Sem purga: inflamação violenta → explosão. O BMS impõe 30-60 s de ventilação automaticamente."},
      {q:"O que deve fazer o maquinista primeiro após paragem automática por L2?",opts:["Rearmar imediatamente e rearrancar","Identificar a causa antes de qualquer rearmação","Abrir a alimentação a pleno caudal","Premir o botão de paragem de emergência"],correct:1,exp:"A PRIMEIRA ação é identificar a causa da perda de água antes de qualquer rearmação. Rearmar sem encontrar a causa pode repetir o incidente com consequências graves."},
      {q:"O que é o 'lockout' do BMS?",opts:["Um modo económico de funcionamento","Um estado de segurança que impede rearranque automático até rearmação manual","Um alarme de manutenção programado","Um modo de teste de válvulas"],correct:1,exp:"Estado de segurança que impede rearrancar o queimador até um operador premir fisicamente o botão de rearmação no painel. Obriga a investigar a causa antes de rearrancar."},
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
        <div style={{fontSize:42,marginBottom:8}}>🛡️</div>
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
      <button onClick={()=>onComplete(xp)} style={{width:"100%",padding:"15px 0",border:"none",borderRadius:14,background:"linear-gradient(135deg,#f97316,#c9922a)",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:"#060e1a",cursor:"pointer"}}>🛡️ {l.finish}</button>
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

export default function LessonE3_L5({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t=T[lang]||T.fr;
  const [tab,setTab]=useState(0);
  const progress=[25,50,75,90][tab]||25;
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(249,115,22,0.2)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"6px 12px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>◀</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:2,color:"#f97316",marginBottom:2}}>{t.moduleLabel} · L5</div>
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
          <span style={{fontSize:12}}>🛡️</span>
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
