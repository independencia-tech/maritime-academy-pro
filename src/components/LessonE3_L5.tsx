// LessonE3_L5 - Sécurités & Alarmes chaudière | PART 1
import { useState } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  alarm:"#f97316", safe:"#6dbf8a", steam:"#4da6ff",
  danger:"#e74c3c", water:"#4da6ff", pressure:"#c084fc",
  gold:"#c9922a", gold2:"#e8b94f",
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
};

const T: any = {
  fr:{
    moduleLabel:"MACHINE - CHAUDIÈRES",
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
      "Un bas niveau d'eau est l'alarme la plus critique - risque d'explosion BLEVE",
      "Le BMS (Burner Management System) séquence et protège automatiquement le brûleur",
    ],
    safeties:{
      safetyvalve:{ name:"Soupapes de sûreté", req:"SOLAS obligatoire - 2 minimum", desc:"S'ouvrent automatiquement si la pression dépasse le seuil (110% PMS). Réglées à des pressions légèrement différentes (ex : 7,5 et 8,0 bar pour une chaudière à 7 bar). Évacuent la vapeur vers un endroit sûr. Testées mensuellement (levée manuelle) et annuellement (test complet sous pression). Si une soupape s'ouvre en service normal → pression anormalement haute → investiguer immédiatement." },
      watergage:{ name:"Indicateurs de niveau d'eau", req:"SOLAS obligatoire - 2 minimum", desc:"Affichent en permanence le niveau d'eau dans le ballon. Types : tube en verre direct (réflexion), indicateurs magnétiques, télémesures. Vérification à chaque garde (concordance des deux indicateurs). Purge des indicateurs quotidienne (éviter les dépôts calcaires)." },
      lowwater:{ name:"Protection bas niveau eau", req:"SOLAS obligatoire", desc:"Niveau 1 (L1) : alarme à ~75mm sous le niveau normal → augmenter l'alimentation. Niveau 2 (L2) : arrêt automatique du brûleur à ~150mm → ne jamais rallumer sans trouver la cause. Ne JAMAIS essayer d'alimenter une chaudière à bas niveau sans brûleur (risque de coup de vapeur)." },
      flamefail:{ name:"Détecteur de flamme", req:"Obligatoire sur chaudières automatiques", desc:"Détecte la présence de la flamme (UV ou IR). Si extinction : coupure automatique du combustible en < 5 secondes, verrouillage du brûleur. Purge de la chambre obligatoire avant redémarrage. Tester périodiquement en couvrant le détecteur en fonctionnement." },
      overpressure:{ name:"Pressostat haute pression", req:"Obligatoire", desc:"Déclenche une alarme puis réduit ou coupe le brûleur si la pression dépasse le seuil réglé (ex : alarme à 6,5 bar, coupure à 7,0 bar pour chaudière à 6,5 bar). Redondant avec les soupapes de sûreté. Testé régulièrement." },
    },
    alarms:{
      highpressure:{ name:"Haute pression vapeur", level:"Alarme + réduction brûleur", cause:"Demande de vapeur trop faible par rapport à la production, brûleur trop puissant, détendeur ou vanne aval fermée.", action:"Vérifier la consommation vapeur, réduire la puissance du brûleur, vérifier les vannes aval, chercher la cause si persistant." },
      lowwater1:{ name:"Bas niveau eau (L1)", level:"ALARME - urgence immédiate", cause:"Perte d'eau (fuite), panne de la pompe d'alimentation, vanne d'alimentation fermée, forte demande de vapeur.", action:"Augmenter l'alimentation en eau, vérifier la pompe et les vannes, chercher les fuites. Ne pas attendre L2." },
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
      tube_rupture:{ name:"Rupture de tube de chaudière", proc:"1. Fermer la vanne vapeur principale. 2. Couper le brûleur immédiatement (BMS ou manuel). 3. Évacuer le personnel de la zone (vapeur brûlante). 4. Attendre refroidissement complet avant inspection. 5. Ne pas ouvrir la chaudière tant qu'elle est sous pression. 6. Chef mécanicien et armateur prévenus.", danger:"Vapeur brûlante à 165 degC+ - risque de brûlures graves" },
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
    moduleLabel:"ENGINE - BOILERS",
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
      "Low water level is the most critical alarm - BLEVE explosion risk",
      "BMS (Burner Management System) automatically sequences and protects the burner",
    ],
    safeties:{
      safetyvalve:{ name:"Safety valves", req:"SOLAS mandatory - 2 minimum", desc:"Open automatically if pressure exceeds threshold (110% MAWP). Set at slightly different pressures (e.g. 7.5 and 8.0 bar for 7 bar boiler). Vent steam to safe location. Tested monthly (manual lift) and annually (full pressure test). If a valve opens during normal service → abnormally high pressure → investigate immediately." },
      watergage:{ name:"Water level gauges", req:"SOLAS mandatory - 2 minimum", desc:"Continuously display water level in drum. Types: direct glass tube (reflex), magnetic indicators, remote reading. Check each watch (both gauges agree). Daily purging (prevent scale deposits)." },
      lowwater:{ name:"Low water protection", req:"SOLAS mandatory", desc:"Level 1 (L1): alarm at ~75mm below normal → increase feed. Level 2 (L2): automatic burner shutdown at ~150mm → never relight without finding cause. NEVER try to feed a low-water boiler without burner (steam shock risk)." },
      flamefail:{ name:"Flame detector", req:"Mandatory on automatic boilers", desc:"Detects flame presence (UV or IR). On extinction: automatic fuel cutoff < 5 seconds, burner lockout. Mandatory chamber purge before restart. Periodically test by covering detector during operation." },
      overpressure:{ name:"High pressure switch", req:"Mandatory", desc:"Triggers alarm then reduces or cuts burner if pressure exceeds set threshold (e.g. alarm at 6.5 bar, cutoff at 7.0 bar for 6.5 bar boiler). Redundant with safety valves. Tested regularly." },
    },
    alarms:{
      highpressure:{ name:"High steam pressure", level:"Alarm + burner reduction", cause:"Steam demand too low vs production, burner too powerful, downstream PRV or valve closed.", action:"Check steam consumption, reduce burner power, check downstream valves, find cause if persistent." },
      lowwater1:{ name:"Low water level (L1)", level:"ALARM - immediate emergency", cause:"Water loss (leak), feed pump failure, feed valve closed, high steam demand.", action:"Increase water feed, check pump and valves, look for leaks. Don't wait for L2." },
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
      tube_rupture:{ name:"Boiler tube rupture", proc:"1. Close main steam valve. 2. Cut burner immediately (BMS or manual). 3. Evacuate personnel from area (scalding steam). 4. Wait complete cooling before inspection. 5. Do not open boiler while under pressure. 6. Chief engineer and shipowner notified.", danger:"Scalding steam at 165 degC+ - severe burn risk" },
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
    moduleLabel:"MÁQUINAS - CALDERAS",
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
      "El bajo nivel de agua es la alarma más crítica - riesgo de explosión BLEVE",
      "El BMS secuencia y protege automáticamente el quemador",
    ],
    safeties:{
      safetyvalve:{ name:"Válvulas de seguridad", req:"SOLAS obligatorio - 2 mínimo", desc:"Se abren automáticamente si la presión supera el umbral (110% PMS). Ajustadas a presiones ligeramente diferentes. Evacúan vapor a lugar seguro. Prueba mensual (levantamiento manual) y anual (prueba completa). Si se abre en servicio normal → presión anormalmente alta → investigar." },
      watergage:{ name:"Indicadores de nivel de agua", req:"SOLAS obligatorio - 2 mínimo", desc:"Muestran permanentemente el nivel en el balón. Verificación en cada guardia (concordancia de los dos indicadores). Purga diaria (evitar depósitos calcáreos)." },
      lowwater:{ name:"Protección bajo nivel de agua", req:"SOLAS obligatorio", desc:"Nivel 1 (L1): alarma a ~75mm bajo el normal → aumentar alimentación. Nivel 2 (L2): parada automática del quemador a ~150mm → nunca rearrancar sin encontrar la causa." },
      flamefail:{ name:"Detector de llama", req:"Obligatorio en calderas automáticas", desc:"Detecta la presencia de llama (UV o IR). Si extinción: corte automático del combustible < 5 s, bloqueo del quemador. Purga obligatoria antes del rearranque." },
      overpressure:{ name:"Presostato de alta presión", req:"Obligatorio", desc:"Activa alarma y reduce o corta el quemador si la presión supera el umbral. Redundante con las válvulas de seguridad." },
    },
    alarms:{
      highpressure:{ name:"Alta presión de vapor", level:"Alarma + reducción quemador", cause:"Demanda de vapor demasiado baja, quemador demasiado potente, válvula aguas abajo cerrada.", action:"Verificar consumo, reducir potencia del quemador, verificar válvulas aguas abajo." },
      lowwater1:{ name:"Bajo nivel de agua (L1)", level:"ALARMA - urgencia inmediata", cause:"Pérdida de agua (fuga), fallo de la bomba de alimentación, válvula cerrada, alta demanda de vapor.", action:"Aumentar la alimentación, verificar bomba y válvulas, buscar fugas. No esperar a L2." },
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
      tube_rupture:{ name:"Rotura de tubo de caldera", proc:"1. Cerrar la válvula de vapor principal. 2. Cortar el quemador. 3. Evacuar al personal de la zona. 4. Esperar enfriamiento completo. 5. No abrir la caldera bajo presión. 6. Avisar al jefe de máquinas y al armador.", danger:"Vapor a 165 degC+ - riesgo de quemaduras graves" },
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
    moduleLabel:"MÁQUINAS - CALDEIRAS",
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
      "O baixo nível de água é o alarme mais crítico - risco de explosão BLEVE",
      "O BMS sequencia e protege automaticamente o queimador",
    ],
    safeties:{
      safetyvalve:{ name:"Válvulas de segurança", req:"SOLAS obrigatório - 2 mínimo", desc:"Abrem automaticamente se a pressão ultrapassa o limiar (110% PMS). Reguladas a pressões ligeiramente diferentes. Evacuam vapor para local seguro. Teste mensal e anual. Se abre em serviço normal → pressão anormalmente alta → investigar." },
      watergage:{ name:"Indicadores de nível de água", req:"SOLAS obrigatório - 2 mínimo", desc:"Mostram permanentemente o nível no balão. Verificação em cada quarto (concordância dos dois indicadores). Purga diária (evitar depósitos calcários)." },
      lowwater:{ name:"Proteção baixo nível de água", req:"SOLAS obrigatório", desc:"Nível 1 (L1): alarme a ~75mm abaixo do normal → aumentar alimentação. Nível 2 (L2): paragem automática do queimador a ~150mm → nunca rearrancar sem encontrar a causa." },
      flamefail:{ name:"Detetor de chama", req:"Obrigatório em caldeiras automáticas", desc:"Deteta a presença de chama (UV ou IR). Se extinção: corte automático do combustível < 5 s, bloqueio do queimador. Purga obrigatória antes do rearranque." },
      overpressure:{ name:"Pressostato de alta pressão", req:"Obrigatório", desc:"Aciona alarme e reduz ou corta queimador se a pressão ultrapassa o limiar. Redundante com as válvulas de segurança." },
    },
    alarms:{
      highpressure:{ name:"Alta pressão de vapor", level:"Alarme + redução queimador", cause:"Procura de vapor muito baixa, queimador demasiado potente, válvula a jusante fechada.", action:"Verificar consumo, reduzir potência do queimador, verificar válvulas a jusante." },
      lowwater1:{ name:"Baixo nível de água (L1)", level:"ALARME - urgência imediata", cause:"Perda de água (fuga), falha da bomba de alimentação, válvula fechada, alta procura de vapor.", action:"Aumentar alimentação, verificar bomba e válvulas, procurar fugas. Não esperar L2." },
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
      tube_rupture:{ name:"Rotura de tubo de caldeira", proc:"1. Fechar válvula de vapor principal. 2. Cortar queimador. 3. Evacuar pessoal da zona. 4. Aguardar arrefecimento completo. 5. Não abrir caldeira sob pressão. 6. Avisar chefe de máquinas e armador.", danger:"Vapor a 165 degC+ - risco de queimaduras graves" },
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

// ── SVG 1 - SAFETIES ─────────────────────────────────────────
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

// ── SVG 2 - ALARMS ───────────────────────────────────────────
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

// ── SVG 3 - BMS ──────────────────────────────────────────────
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

// ── SVG 4 - EMERGENCIES ──────────────────────────────────────
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


const ACCIDENT_L5: any = {
  fr: {
    title: "CAS REEL : Chaudiere allumee sans eau dans les tubes - Mawashi Al Gasseem (rapport d'enquete maritime)",
    body: "A bord du navire transporteur de betail Mawashi Al Gasseem, le mecanicien de quart a commence a rencontrer des difficultes a maintenir la pression de vapeur et le niveau d'eau de la chaudiere. Peu apres, un incendie s'est declare au niveau de la chaudiere. L'inspection menee par le chef mecanicien a revele que le bruleur avait ete mis a feu alors que les tubes de la chaudiere etaient a sec, sans eau. Des accumulations de suie, d'huile et de tartre sur les surfaces des tubes, resultant de pratiques d'exploitation et d'entretien deficientes, ont vraisemblablement contribue au dommage constate. La chaudiere a ete gravement endommagee mais aucune victime n'a ete a deplorer.",
    lessons: [
      "Ne jamais mettre a feu un bruleur avant d'avoir positivement confirme un niveau d'eau correct dans les tubes de la chaudiere : les alarmes et interverrouillages de bas niveau existent precisement pour empecher ce scenario.",
      "Des difficultes a maintenir la pression de vapeur ou le niveau d'eau sont des signaux d'alerte precoces qui doivent declencher un arret et une investigation, pas une poursuite de l'exploitation en esperant que la situation se stabilise.",
      "L'accumulation de suie, d'huile et de tartre sur les tubes reduit l'echange de chaleur et peut masquer ou aggraver un probleme de niveau d'eau : un entretien regulier (ramonage, nettoyage) est indispensable a la securite, pas seulement au rendement.",
      "Un interverrouillage de securite (bas niveau d'eau -> coupure du bruleur) ne doit jamais etre contourne ou desactive, meme temporairement, pour maintenir la production de vapeur.",
    ],
  },
  en: {
    title: "REAL CASE: Boiler fired with no water in the tubes - Mawashi Al Gasseem (maritime investigation report)",
    body: "On board the livestock carrier Mawashi Al Gasseem, the watchkeeping engineer began experiencing difficulty maintaining steam pressure and boiler water level. Shortly after, a fire broke out at the boiler. Inspection by the chief engineer revealed that the burner had been fired while the boiler tubes were dry, with no water present. Accumulations of soot, oil and scale on the tube surfaces, resulting from poor operating and maintenance practices, likely contributed to the damage sustained. The boiler was severely damaged but there were no casualties.",
    lessons: [
      "Never fire a burner before positively confirming a correct water level in the boiler tubes: low-level alarms and interlocks exist precisely to prevent this scenario.",
      "Difficulty maintaining steam pressure or water level is an early warning sign that must trigger a shutdown and investigation, not continued operation in the hope the situation will stabilise.",
      "Soot, oil and scale build-up on tubes reduces heat exchange and can mask or worsen a water level problem: regular maintenance (soot removal, cleaning) is essential for safety, not just efficiency.",
      "A safety interlock (low water level -> burner cutoff) must never be bypassed or disabled, even temporarily, to maintain steam production.",
    ],
  },
  es: {
    title: "CASO REAL: Caldera encendida sin agua en los tubos - Mawashi Al Gasseem (informe de investigacion maritima)",
    body: "A bordo del buque transportador de ganado Mawashi Al Gasseem, el maquinista de guardia comenzo a tener dificultades para mantener la presion de vapor y el nivel de agua de la caldera. Poco despues, se declaro un incendio en la caldera. La inspeccion realizada por el jefe de maquinas revelo que el quemador habia sido encendido con los tubos de la caldera secos, sin agua. Las acumulaciones de hollin, aceite e incrustaciones en las superficies de los tubos, resultado de practicas de operacion y mantenimiento deficientes, probablemente contribuyeron al dano observado. La caldera sufrio danos graves pero no hubo victimas.",
    lessons: [
      "Nunca encender un quemador sin confirmar positivamente un nivel de agua correcto en los tubos de la caldera: las alarmas e enclavamientos de bajo nivel existen precisamente para evitar este escenario.",
      "Las dificultades para mantener la presion de vapor o el nivel de agua son senales de alerta tempranas que deben provocar una parada e investigacion, no continuar operando esperando que la situacion se estabilice.",
      "La acumulacion de hollin, aceite e incrustaciones en los tubos reduce el intercambio de calor y puede enmascarar o agravar un problema de nivel de agua: un mantenimiento regular es indispensable para la seguridad, no solo para el rendimiento.",
      "Un enclavamiento de seguridad (bajo nivel de agua -> corte del quemador) nunca debe ser puenteado o desactivado, ni siquiera temporalmente, para mantener la produccion de vapor.",
    ],
  },
  pt: {
    title: "CASO REAL: Caldeira acesa sem agua nos tubos - Mawashi Al Gasseem (relatorio de investigacao maritima)",
    body: "A bordo do navio transportador de gado Mawashi Al Gasseem, o maquinista de quarto comecou a ter dificuldades em manter a pressao de vapor e o nivel de agua da caldeira. Pouco depois, deflagrou um incendio na caldeira. A inspecao realizada pelo chefe de maquinas revelou que o queimador tinha sido aceso com os tubos da caldeira secos, sem agua. Acumulacoes de fuligem, oleo e incrustacoes nas superficies dos tubos, resultantes de praticas de operacao e manutencao deficientes, provavelmente contribuiram para o dano observado. A caldeira ficou gravemente danificada mas nao houve vitimas.",
    lessons: [
      "Nunca acender um queimador sem confirmar positivamente um nivel de agua correto nos tubos da caldeira: os alarmes e intertravamentos de baixo nivel existem precisamente para evitar este cenario.",
      "Dificuldades em manter a pressao de vapor ou o nivel de agua sao sinais de alerta precoces que devem desencadear uma paragem e investigacao, nao a continuacao da operacao na esperanca de que a situacao estabilize.",
      "A acumulacao de fuligem, oleo e incrustacoes nos tubos reduz a troca de calor e pode mascarar ou agravar um problema de nivel de agua: uma manutencao regular e indispensavel para a seguranca, nao apenas para o rendimento.",
      "Um intertravamento de seguranca (baixo nivel de agua -> corte do queimador) nunca deve ser contornado ou desativado, mesmo temporariamente, para manter a producao de vapor.",
    ],
  },
};

function AccidentCase({ lang }: { lang: string }) {
  const a = ACCIDENT_L5[lang] || ACCIDENT_L5.fr;
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
      <AccidentCase lang={lang}/>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.gold,margin:"20px 0 14px"}}>✏️ {t.practiceTitle}</div>
      {t.questions.map((q:any,i:number)=>(
        <div key={i} style={{marginBottom:14,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.alarm}33`,overflow:"hidden"}}>
          <div style={{padding:"12px 14px"}}>
            <div style={{fontSize:10,color:C.alarm,letterSpacing:1,marginBottom:6,fontFamily:"'Cinzel',serif"}}>Q{i+1}</div>
            <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>{q.q}</div>
          </div>
          <div style={{padding:"0 14px 12px"}}>
            <input type="text" placeholder="?" value={inputs[i]} onChange={e=>setInputs(p=>p.map((v,j)=>j===i?e.target.value:v))} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.05)",color:"#f0f4ff",fontSize:12,fontFamily:"Courier New",marginBottom:10,boxSizing:"border-box"}}/>
            <button onClick={()=>toggle(i)} style={{padding:"7px 14px",borderRadius:8,fontSize:11,cursor:"pointer",background:shown[i]?`${C.alarm}22`:"rgba(255,255,255,0.06)",border:`1px solid ${shown[i]?C.alarm:"rgba(255,255,255,0.15)"}`,color:shown[i]?C.alarm:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{shown[i]?t.hideAnswer:t.showAnswer}</button>
            {shown[i]&&<div style={{marginTop:10,padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.alarm}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{q.a}</div>}
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
// LessonE3_L5 - PART 2: Bank + Quiz + Main

function getBank(lang: string) {
  const b: any = {
    fr:[
      {q:"Combien de soupapes de surete SOLAS exige-t-il au minimum sur une chaudiere marine et pourquoi ?",opts:["1 seule soupape suffit","Au moins 2, pour assurer une redondance en cas de defaillance de l'une d'elles","Aucune exigence specifique","4 soupapes minimum sur toutes les chaudieres"],correct:1,exp:"SOLAS exige au moins 2 soupapes de surete par chaudiere, reglees a des pressions legerement differentes pour une protection etagee. C'est une redondance critique : si l'une est defaillante, l'autre protege la chaudiere."},
      {q:"Qu'est-ce que le lockout (verrouillage) du BMS et quand est-il declenche ?",opts:["Un mode de fonctionnement normal du bruleur","Un etat de securite empechant tout redemarrage automatique apres une extinction de flamme ou une anomalie, necessitant un rearmement manuel","Une simple alarme sonore sans consequence","Un reglage de la pression de la chaudiere"],correct:1,exp:"Le lockout du BMS se declenche apres une extinction de flamme non prevue, une anomalie de sequence ou un bas niveau d'eau L2. Le bruleur ne peut plus redemarrer automatiquement : un rearmement manuel est obligatoire apres avoir identifie la cause."},
      {q:"Que declenchent les deux alarmes de niveau d'eau L1 et L2 d'une chaudiere ?",opts:["Les deux declenchent le meme arret automatique","L1 (bas niveau, ~75mm) declenche une alarme sonore/visuelle, L2 (tres bas niveau, ~150mm) declenche l'arret automatique du bruleur","L1 et L2 sont uniquement des indicateurs sans action","Seule L2 existe sur les chaudieres modernes"],correct:1,exp:"L1 (environ 75mm sous le niveau normal) declenche une alarme necessitant d'augmenter l'alimentation. L2 (environ 150mm) declenche l'arret automatique du bruleur (safety shutdown) avec verrouillage du systeme."},
      {q:"Comment et a quelle frequence teste-t-on une soupape de surete de chaudiere ?",opts:["Elle ne se teste jamais avant remplacement","Test de levee manuelle mensuel (chaudiere sous pression >= 75% PMS) et test sous pression annuel","Uniquement lors de la construction du navire","Test hebdomadaire obligatoire par demontage complet"],correct:1,exp:"Le test de levee manuelle (mensuel) verifie que la soupape s'ouvre librement et se referme sans fuite. Le test sous pression (annuel) verifie l'ouverture automatique a la pression de tarage reglee."},
      {q:"Pourquoi ne faut-il jamais alimenter en eau froide une chaudiere dont les tubes sont a sec et surchauffes ?",opts:["Cela n'a aucun risque particulier","Le choc thermique et la vaporisation explosive de l'eau (expansion ~1700x) peuvent provoquer une explosion de type BLEVE","Cela endommage uniquement la pompe d'alimentation","Cela ralentit simplement le refroidissement"],correct:1,exp:"Sur des tubes surchauffes (300-400 degC), l'eau froide introduite brutalement se vaporise instantanement avec une expansion de volume d'environ 1700 fois, provoquant une surpression explosive appelee BLEVE."},
      {q:"Quel est le role d'un pressostat de haute pression sur une chaudiere ?",opts:["Il mesure uniquement la temperature","Il surveille en continu la pression et declenche alarme puis arret automatique du bruleur avant que la soupape de surete ne doive s'ouvrir","Il remplace la soupape de surete","Il n'a aucun role de securite"],correct:1,exp:"Le pressostat electronique surveille la pression en continu avec deux seuils (alarme puis arret bruleur), evitant d'atteindre la pression d'ouverture des soupapes de surete, qui restent la derniere ligne de defense mecanique."},
      {q:"Quelles informations doivent obligatoirement etre consignees lors d'un arret d'urgence de chaudiere ?",opts:["Uniquement l'heure de l'incident","L'heure, la nature de l'alarme, l'etat du systeme avant incident, les actions prises, la cause identifiee et les mesures correctives","Rien n'est obligatoire a consigner","Uniquement le nom du chef mecanicien"],correct:1,exp:"Il faut consigner l'heure exacte, la nature de l'alarme, l'etat du systeme avant l'incident, les actions prises, la cause identifiee et les mesures correctives. Cette documentation est obligatoire et examinee lors des inspections PSC."},
      {q:"Quelle est la difference entre un detecteur de flamme UV et un detecteur IR ?",opts:["Ils fonctionnent de maniere identique","Le detecteur UV est tres sensible mais peut etre aveugle par la suie, le detecteur IR est plus robuste mais sensible aux surfaces chaudes environnantes","Le detecteur IR ne fonctionne que la nuit","Seul le detecteur UV est utilise sur les chaudieres marines"],correct:1,exp:"Le detecteur UV, tres sensible et rapide (< 1s), peut etre aveugle par les depots de suie sur la lentille. Le detecteur IR est plus robuste aux conditions poussiereuses mais peut etre perturbe par les surfaces chaudes environnantes."},
      {q:"Qu'est-ce qu'une explosion BLEVE (Boiling Liquid Expanding Vapour Explosion) ?",opts:["Une simple fuite de vapeur sans danger","Une explosion due a la rupture soudaine d'un recipient sous pression contenant un liquide bien au-dessus de son point d'ebullition atmospherique, causant une vaporisation explosive","Un phenomene qui ne concerne que les moteurs diesel","Une explosion causee uniquement par un exces de combustible"],correct:1,exp:"Un BLEVE survient quand une rupture soudaine fait chuter instantanement la pression : l'eau se vaporise en 1/1000 de seconde avec une expansion de volume de 1700x, generant une onde de choc explosive. Causes : manque d'eau, entartrage extreme, corrosion, surpression."},
      {q:"Pourquoi la purge de la chambre de combustion (pre-purge) est-elle imposee avant chaque demarrage de bruleur ?",opts:["Pour economiser du combustible","Pour evacuer tout gaz combustible residuel qui pourrait s'enflammer violemment a l'allumage","C'est une etape facultative selon les fabricants","Pour refroidir la chaudiere avant demarrage"],correct:1,exp:"La pre-purge (minimum 3-4 volumes de chambre, 30-60 secondes) evacue les vapeurs residuelles de combustible. Sans cette purge, l'allumage pourrait enflammer des vapeurs accumulees, causant une explosion dans la chambre."},
      {q:"Comment inspecte-t-on et teste-t-on un pressostat de haute pression sur une chaudiere ?",opts:["Il ne necessite aucune inspection","Inspection visuelle, test fonctionnel avec generateur de pression, et test en conditions reelles annuel avec verification des seuils","Uniquement un controle visuel externe une fois par an","En le bypassant temporairement pour tester le reste du circuit"],correct:1,exp:"L'inspection comprend un controle visuel (connexions, fuites), un test fonctionnel (generateur de pression simulant une haute pression) et un test annuel en conditions reelles verifiant le declenchement aux seuils regles. Ne jamais bypasser un pressostat."},
      {q:"Quelle est la premiere responsabilite du mecanicien de quart en cas d'alarme chaudiere ?",opts:["Ignorer l'alarme si elle semble mineure","Repondre immediatement (moins d'une minute) : accuser reception, se rendre a la chaudiere et evaluer la situation avant d'agir","Attendre les instructions du commandant avant toute action","Couper immediatement l'alimentation electrique du navire"],correct:1,exp:"Le mecanicien de quart doit repondre en moins d'une minute : accuser reception de l'alarme, se rendre immediatement a la chaudiere, evaluer le type et la gravite de l'alarme, puis appliquer la procedure correspondante sans jamais rearmer sans en trouver la cause."},
      {q:"Pourquoi les alarmes chaudiere doivent-elles etre relayees jusqu'a la passerelle et non uniquement locales ?",opts:["Ce n'est pas une exigence reelle","Pour garantir qu'une alarme soit percue meme si aucun membre d'equipage n'est present pres de la chaudiere au moment du declenchement","Uniquement pour des raisons esthetiques","La passerelle n'a aucun role dans la gestion des alarmes machine"],correct:1,exp:"Les alarmes chaudiere sont relayees vers la passerelle et la salle de controle machine pour garantir qu'elles soient percues meme si aucun membre d'equipage n'est physiquement present pres de la chaudiere, notamment pendant les quarts reduits ou la nuit."},
      {q:"A quoi sert la sequence d'interverrouillage du bruleur avant l'allumage ?",opts:["Elle n'a qu'un role cosmetique","Elle empeche le bruleur de s'allumer tant que toutes les conditions de securite (purge, niveau d'eau, pression) ne sont pas confirmees","Elle sert uniquement a economiser du combustible","Elle ralentit volontairement le demarrage sans raison de securite"],correct:1,exp:"La sequence d'interverrouillage verifie et confirme toutes les conditions de securite (purge complete, niveau d'eau correct, pression normale, absence de defaut) avant d'autoriser l'allumage du bruleur, empechant tout demarrage dans une configuration dangereuse."},
      {q:"Ou doit etre situe le bouton d'arret d'urgence (E-stop) manuel d'une chaudiere et pourquoi ?",opts:["Uniquement dans la salle des machines, loin de la chaudiere","A proximite immediate de la chaudiere et facilement accessible, permettant une coupure immediate en cas de danger visible","Il n'est pas obligatoire sur les chaudieres marines","Uniquement sur la passerelle"],correct:1,exp:"Le bouton d'arret d'urgence doit etre situe a proximite immediate de la chaudiere, clairement identifie et facilement accessible, permettant a toute personne presente de couper immediatement le bruleur en cas de danger visible, sans attendre l'intervention a distance."},
    ],
    en:[
      {q:"How many safety valves does SOLAS require at minimum on a marine boiler and why?",opts:["1 valve is sufficient","At least 2, to ensure redundancy if one fails","No specific requirement","4 valves minimum on all boilers"],correct:1,exp:"SOLAS requires at least 2 safety valves per boiler, set at slightly different pressures for staged protection. This is critical redundancy: if one fails, the other protects the boiler."},
      {q:"What is BMS lockout and when is it triggered?",opts:["A normal burner operating mode","A safety state preventing any automatic restart after a flame failure or anomaly, requiring manual reset","A simple audible alarm with no consequence","A boiler pressure setting"],correct:1,exp:"BMS lockout triggers after an unplanned flame failure, a sequence anomaly or a low water level L2. The burner cannot restart automatically: manual reset is required after identifying the cause."},
      {q:"What do the two water level alarms L1 and L2 on a boiler trigger?",opts:["Both trigger the same automatic shutdown","L1 (low level, ~75mm) triggers an audible/visual alarm, L2 (very low level, ~150mm) triggers automatic burner shutdown","L1 and L2 are only indicators with no action","Only L2 exists on modern boilers"],correct:1,exp:"L1 (about 75mm below normal level) triggers an alarm requiring increased feed. L2 (about 150mm) triggers automatic burner shutdown (safety shutdown) with system lockout."},
      {q:"How and how often is a boiler safety valve tested?",opts:["It is never tested before replacement","Monthly manual lift test (boiler under pressure >= 75% MAWP) and annual pressure test","Only during vessel construction","Mandatory weekly test by full dismantling"],correct:1,exp:"The manual lift test (monthly) checks the valve opens freely and closes without leaking. The pressure test (annual) checks automatic opening at the set pressure."},
      {q:"Why must a boiler with dry, overheated tubes never be fed with cold water?",opts:["There is no particular risk","Thermal shock and explosive water vaporisation (expansion ~1700x) can cause a BLEVE explosion","It only damages the feed pump","It simply slows down cooling"],correct:1,exp:"On overheated tubes (300-400 degC), cold water introduced abruptly instantly vaporises with a volume expansion of about 1700 times, causing an explosive overpressure called BLEVE."},
      {q:"What is the role of a high-pressure pressure switch on a boiler?",opts:["It only measures temperature","It continuously monitors pressure and triggers alarm then automatic burner shutdown before the safety valve needs to open","It replaces the safety valve","It has no safety role"],correct:1,exp:"The electronic pressure switch monitors pressure continuously with two thresholds (alarm then burner shutdown), avoiding reaching the safety valve opening pressure, which remains the last mechanical line of defence."},
      {q:"What information must be logged during a boiler emergency shutdown?",opts:["Only the time of the incident","Time, alarm nature, system state before incident, actions taken, identified cause and corrective measures","Nothing is mandatory to log","Only the chief engineer's name"],correct:1,exp:"Exact time, alarm nature, system state before the incident, actions taken, identified cause and corrective measures must be logged. This documentation is mandatory and reviewed during PSC inspections."},
      {q:"What is the difference between a UV flame detector and an IR detector?",opts:["They work identically","The UV detector is very sensitive but can be blinded by soot, the IR detector is more robust but sensitive to surrounding hot surfaces","The IR detector only works at night","Only the UV detector is used on marine boilers"],correct:1,exp:"The UV detector, very sensitive and fast (< 1s), can be blinded by soot deposits on the lens. The IR detector is more robust to dusty conditions but can be disturbed by surrounding hot surfaces."},
      {q:"What is a BLEVE (Boiling Liquid Expanding Vapour Explosion)?",opts:["A simple harmless steam leak","An explosion due to sudden rupture of a pressure vessel containing a liquid well above its atmospheric boiling point, causing explosive vaporisation","A phenomenon only affecting diesel engines","An explosion caused only by excess fuel"],correct:1,exp:"A BLEVE occurs when sudden rupture causes an instant pressure drop: water vaporises in 1/1000 of a second with a volume expansion of 1700x, generating an explosive shockwave. Causes: water shortage, extreme scaling, corrosion, overpressure."},
      {q:"Why is combustion chamber purge (pre-purge) mandatory before every burner start?",opts:["To save fuel","To clear any residual combustible gas that could ignite violently at ignition","It is an optional step depending on the manufacturer","To cool the boiler before starting"],correct:1,exp:"Pre-purge (minimum 3-4 chamber volumes, 30-60 seconds) clears residual fuel vapours. Without this purge, ignition could ignite accumulated vapours, causing an explosion in the chamber."},
      {q:"How is a high-pressure pressure switch inspected and tested on a boiler?",opts:["It requires no inspection","Visual inspection, functional test with a pressure generator, and annual real-condition test verifying thresholds","Only an external visual check once a year","By temporarily bypassing it to test the rest of the circuit"],correct:1,exp:"Inspection includes a visual check (connections, leaks), a functional test (pressure generator simulating high pressure) and an annual real-condition test verifying triggering at set thresholds. Never bypass a pressure switch."},
      {q:"What is the watchkeeping engineer's first responsibility in case of a boiler alarm?",opts:["Ignore the alarm if it seems minor","Respond immediately (under one minute): acknowledge, go to the boiler and assess the situation before acting","Wait for the captain's instructions before any action","Immediately cut the vessel's electrical power"],correct:1,exp:"The watchkeeping engineer must respond within one minute: acknowledge the alarm, go immediately to the boiler, assess the alarm type and severity, then apply the corresponding procedure, never resetting without finding the cause."},
      {q:"Why must boiler alarms be relayed to the bridge and not only sound locally?",opts:["This is not a real requirement","To ensure an alarm is perceived even if no crew member is present near the boiler when it triggers","Only for aesthetic reasons","The bridge has no role in machinery alarm management"],correct:1,exp:"Boiler alarms are relayed to the bridge and engine control room to ensure they are perceived even if no crew member is physically present near the boiler, particularly during reduced watches or at night."},
      {q:"What is the purpose of the burner interlock sequence before ignition?",opts:["It only has a cosmetic role","It prevents the burner from igniting until all safety conditions (purge, water level, pressure) are confirmed","It only serves to save fuel","It deliberately slows down start-up with no safety reason"],correct:1,exp:"The interlock sequence checks and confirms all safety conditions (complete purge, correct water level, normal pressure, no faults) before authorising burner ignition, preventing any start-up in a dangerous configuration."},
      {q:"Where should a boiler's manual emergency stop (E-stop) button be located and why?",opts:["Only in the engine room, far from the boiler","In immediate proximity to the boiler and easily accessible, allowing immediate shutdown in case of visible danger","It is not mandatory on marine boilers","Only on the bridge"],correct:1,exp:"The emergency stop button must be located in immediate proximity to the boiler, clearly identified and easily accessible, allowing anyone present to immediately cut the burner in case of visible danger, without waiting for remote intervention."},
    ],
    es:[
      {q:"¿Cuantas valvulas de seguridad exige como minimo el SOLAS en una caldera marina y por que?",opts:["1 valvula es suficiente","Al menos 2, para garantizar redundancia si una falla","No hay exigencia especifica","4 valvulas minimo en todas las calderas"],correct:1,exp:"El SOLAS exige al menos 2 valvulas de seguridad por caldera, ajustadas a presiones ligeramente diferentes para una proteccion escalonada. Es una redundancia critica: si una falla, la otra protege la caldera."},
      {q:"¿Que es el bloqueo (lockout) del BMS y cuando se activa?",opts:["Un modo de funcionamiento normal del quemador","Un estado de seguridad que impide cualquier rearranque automatico tras un fallo de llama o anomalia, exigiendo un rearme manual","Una simple alarma sonora sin consecuencia","Un ajuste de la presion de la caldera"],correct:1,exp:"El bloqueo del BMS se activa tras un fallo de llama no previsto, una anomalia de secuencia o un nivel de agua bajo L2. El quemador no puede rearrancar automaticamente: es obligatorio un rearme manual tras identificar la causa."},
      {q:"¿Que activan las dos alarmas de nivel de agua L1 y L2 de una caldera?",opts:["Ambas activan la misma parada automatica","L1 (nivel bajo, ~75mm) activa una alarma sonora/visual, L2 (nivel muy bajo, ~150mm) activa la parada automatica del quemador","L1 y L2 son solo indicadores sin accion","Solo existe L2 en calderas modernas"],correct:1,exp:"L1 (unos 75mm bajo el nivel normal) activa una alarma que exige aumentar la alimentacion. L2 (unos 150mm) activa la parada automatica del quemador (safety shutdown) con bloqueo del sistema."},
      {q:"¿Como y con que frecuencia se prueba una valvula de seguridad de caldera?",opts:["Nunca se prueba antes de sustituirla","Prueba manual de levantamiento mensual (caldera bajo presion >= 75% PMS) y prueba bajo presion anual","Solo durante la construccion del buque","Prueba semanal obligatoria mediante desmontaje completo"],correct:1,exp:"La prueba manual de levantamiento (mensual) verifica que la valvula abre libremente y cierra sin fugas. La prueba bajo presion (anual) verifica la apertura automatica a la presion de tarado."},
      {q:"¿Por que nunca se debe alimentar con agua fria una caldera con tubos secos y sobrecalentados?",opts:["No hay ningun riesgo particular","El choque termico y la vaporizacion explosiva del agua (expansion ~1700x) pueden provocar una explosion tipo BLEVE","Solo dana la bomba de alimentacion","Solo ralentiza el enfriamiento"],correct:1,exp:"En tubos sobrecalentados (300-400 degC), el agua fria introducida bruscamente se vaporiza instantaneamente con una expansion de volumen de unas 1700 veces, provocando una sobrepresion explosiva llamada BLEVE."},
      {q:"¿Cual es la funcion de un presostato de alta presion en una caldera?",opts:["Solo mide la temperatura","Vigila continuamente la presion y activa alarma y luego parada automatica del quemador antes de que la valvula de seguridad deba abrirse","Sustituye a la valvula de seguridad","No tiene ninguna funcion de seguridad"],correct:1,exp:"El presostato electronico vigila la presion continuamente con dos umbrales (alarma y luego parada del quemador), evitando alcanzar la presion de apertura de las valvulas de seguridad, que siguen siendo la ultima linea de defensa mecanica."},
      {q:"¿Que informacion debe registrarse obligatoriamente durante una parada de emergencia de caldera?",opts:["Solo la hora del incidente","Hora, naturaleza de la alarma, estado del sistema antes del incidente, acciones tomadas, causa identificada y medidas correctivas","No es obligatorio registrar nada","Solo el nombre del jefe de maquinas"],correct:1,exp:"Hay que registrar la hora exacta, la naturaleza de la alarma, el estado del sistema antes del incidente, las acciones tomadas, la causa identificada y las medidas correctivas. Esta documentacion es obligatoria y se revisa en las inspecciones PSC."},
      {q:"¿Cual es la diferencia entre un detector de llama UV y un detector IR?",opts:["Funcionan de forma identica","El detector UV es muy sensible pero puede cegarse con hollin, el detector IR es mas robusto pero sensible a superficies calientes cercanas","El detector IR solo funciona de noche","Solo se usa el detector UV en calderas marinas"],correct:1,exp:"El detector UV, muy sensible y rapido (< 1s), puede cegarse por depositos de hollin en la lente. El detector IR es mas robusto a condiciones polvorientas pero puede verse afectado por superficies calientes cercanas."},
      {q:"¿Que es una explosion BLEVE (Boiling Liquid Expanding Vapour Explosion)?",opts:["Una simple fuga de vapor sin peligro","Una explosion debida a la rotura subita de un recipiente a presion con un liquido muy por encima de su punto de ebullicion atmosferico, causando una vaporizacion explosiva","Un fenomeno que solo afecta a los motores diesel","Una explosion causada solo por exceso de combustible"],correct:1,exp:"Un BLEVE ocurre cuando una rotura subita provoca una caida instantanea de presion: el agua se vaporiza en 1/1000 de segundo con una expansion de volumen de 1700x, generando una onda de choque explosiva. Causas: falta de agua, incrustacion extrema, corrosion, sobrepresion."},
      {q:"¿Por que la purga de la camara de combustion (pre-purga) es obligatoria antes de cada arranque del quemador?",opts:["Para ahorrar combustible","Para eliminar cualquier gas combustible residual que podria inflamarse violentamente al encender","Es un paso opcional segun el fabricante","Para enfriar la caldera antes de arrancar"],correct:1,exp:"La pre-purga (minimo 3-4 volumenes de camara, 30-60 segundos) elimina los vapores de combustible residuales. Sin esta purga, el encendido podria inflamar vapores acumulados, causando una explosion en la camara."},
      {q:"¿Como se inspecciona y prueba un presostato de alta presion en una caldera?",opts:["No requiere inspeccion alguna","Inspeccion visual, prueba funcional con generador de presion, y prueba anual en condiciones reales verificando los umbrales","Solo un control visual externo una vez al ano","Puenteandolo temporalmente para probar el resto del circuito"],correct:1,exp:"La inspeccion incluye un control visual (conexiones, fugas), una prueba funcional (generador de presion simulando alta presion) y una prueba anual en condiciones reales verificando el disparo en los umbrales ajustados. Nunca puentear un presostato."},
      {q:"¿Cual es la primera responsabilidad del maquinista de guardia ante una alarma de caldera?",opts:["Ignorar la alarma si parece menor","Responder de inmediato (menos de un minuto): reconocer, acudir a la caldera y evaluar la situacion antes de actuar","Esperar las instrucciones del capitan antes de cualquier accion","Cortar de inmediato la alimentacion electrica del buque"],correct:1,exp:"El maquinista de guardia debe responder en menos de un minuto: reconocer la alarma, acudir de inmediato a la caldera, evaluar el tipo y gravedad de la alarma, y aplicar el procedimiento correspondiente, sin rearmar nunca sin encontrar la causa."},
      {q:"¿Por que las alarmas de caldera deben transmitirse al puente y no sonar solo localmente?",opts:["No es una exigencia real","Para garantizar que una alarma se perciba incluso si ningun tripulante esta presente cerca de la caldera cuando se activa","Solo por razones esteticas","El puente no tiene ningun papel en la gestion de alarmas de maquinas"],correct:1,exp:"Las alarmas de caldera se transmiten al puente y a la sala de control de maquinas para garantizar que se perciban incluso si ningun tripulante esta fisicamente presente cerca de la caldera, especialmente durante guardias reducidas o de noche."},
      {q:"¿Para que sirve la secuencia de enclavamiento del quemador antes del encendido?",opts:["Solo tiene un papel cosmetico","Impide que el quemador se encienda hasta que se confirmen todas las condiciones de seguridad (purga, nivel de agua, presion)","Solo sirve para ahorrar combustible","Ralentiza deliberadamente el arranque sin motivo de seguridad"],correct:1,exp:"La secuencia de enclavamiento verifica y confirma todas las condiciones de seguridad (purga completa, nivel de agua correcto, presion normal, ausencia de fallos) antes de autorizar el encendido del quemador, impidiendo cualquier arranque en una configuracion peligrosa."},
      {q:"¿Donde debe ubicarse el boton de parada de emergencia (E-stop) manual de una caldera y por que?",opts:["Solo en la sala de maquinas, lejos de la caldera","En las inmediaciones de la caldera y facilmente accesible, permitiendo un corte inmediato en caso de peligro visible","No es obligatorio en calderas marinas","Solo en el puente"],correct:1,exp:"El boton de parada de emergencia debe ubicarse en las inmediaciones de la caldera, claramente identificado y facilmente accesible, permitiendo a cualquier persona presente cortar de inmediato el quemador en caso de peligro visible, sin esperar la intervencion remota."},
    ],
    pt:[
      {q:"Quantas valvulas de seguranca exige no minimo o SOLAS numa caldeira marinha e porque?",opts:["1 valvula e suficiente","Pelo menos 2, para garantir redundancia se uma falhar","Nenhuma exigencia especifica","4 valvulas no minimo em todas as caldeiras"],correct:1,exp:"O SOLAS exige pelo menos 2 valvulas de seguranca por caldeira, reguladas a pressoes ligeiramente diferentes para uma protecao escalonada. E uma redundancia critica: se uma falhar, a outra protege a caldeira."},
      {q:"O que e o bloqueio (lockout) do BMS e quando e acionado?",opts:["Um modo de funcionamento normal do queimador","Um estado de seguranca que impede qualquer rearranque automatico apos uma falha de chama ou anomalia, exigindo um rearme manual","Um simples alarme sonoro sem consequencia","Um ajuste da pressao da caldeira"],correct:1,exp:"O bloqueio do BMS e acionado apos uma falha de chama nao prevista, uma anomalia de sequencia ou um nivel de agua baixo L2. O queimador nao pode rearrancar automaticamente: e obrigatorio um rearme manual apos identificar a causa."},
      {q:"O que acionam os dois alarmes de nivel de agua L1 e L2 de uma caldeira?",opts:["Ambos acionam a mesma paragem automatica","L1 (nivel baixo, ~75mm) aciona um alarme sonoro/visual, L2 (nivel muito baixo, ~150mm) aciona a paragem automatica do queimador","L1 e L2 sao apenas indicadores sem acao","So existe L2 em caldeiras modernas"],correct:1,exp:"L1 (cerca de 75mm abaixo do nivel normal) aciona um alarme que exige aumentar a alimentacao. L2 (cerca de 150mm) aciona a paragem automatica do queimador (safety shutdown) com bloqueio do sistema."},
      {q:"Como e com que frequencia se testa uma valvula de seguranca de caldeira?",opts:["Nunca se testa antes de a substituir","Teste manual de levantamento mensal (caldeira sob pressao >= 75% PMS) e teste sob pressao anual","So durante a construcao do navio","Teste semanal obrigatorio por desmontagem completa"],correct:1,exp:"O teste manual de levantamento (mensal) verifica que a valvula abre livremente e fecha sem fugas. O teste sob pressao (anual) verifica a abertura automatica na pressao de taramento."},
      {q:"Por que nunca se deve alimentar com agua fria uma caldeira com tubos secos e sobreaquecidos?",opts:["Nao ha risco particular","O choque termico e a vaporizacao explosiva da agua (expansao ~1700x) podem provocar uma explosao BLEVE","So danifica a bomba de alimentacao","Apenas retarda o arrefecimento"],correct:1,exp:"Em tubos sobreaquecidos (300-400 degC), a agua fria introduzida bruscamente vaporiza instantaneamente com uma expansao de volume de cerca de 1700 vezes, provocando uma sobrepressao explosiva chamada BLEVE."},
      {q:"Qual e a funcao de um pressostato de alta pressao numa caldeira?",opts:["So mede a temperatura","Vigia continuamente a pressao e aciona alarme e depois paragem automatica do queimador antes de a valvula de seguranca ter de abrir","Substitui a valvula de seguranca","Nao tem funcao de seguranca"],correct:1,exp:"O pressostato eletronico vigia a pressao continuamente com dois limiares (alarme e depois paragem do queimador), evitando atingir a pressao de abertura das valvulas de seguranca, que continuam a ser a ultima linha de defesa mecanica."},
      {q:"Que informacoes devem ser obrigatoriamente registadas durante uma paragem de emergencia de caldeira?",opts:["Apenas a hora do incidente","Hora, natureza do alarme, estado do sistema antes do incidente, acoes tomadas, causa identificada e medidas corretivas","Nao e obrigatorio registar nada","Apenas o nome do chefe de maquinas"],correct:1,exp:"E preciso registar a hora exata, a natureza do alarme, o estado do sistema antes do incidente, as acoes tomadas, a causa identificada e as medidas corretivas. Esta documentacao e obrigatoria e revista nas inspecoes PSC."},
      {q:"Qual e a diferenca entre um detetor de chama UV e um detetor IR?",opts:["Funcionam de forma identica","O detetor UV e muito sensivel mas pode cegar com fuligem, o detetor IR e mais robusto mas sensivel a superficies quentes proximas","O detetor IR so funciona a noite","So se usa o detetor UV em caldeiras marinhas"],correct:1,exp:"O detetor UV, muito sensivel e rapido (< 1s), pode cegar com depositos de fuligem na lente. O detetor IR e mais robusto a condicoes com poeira mas pode ser afetado por superficies quentes proximas."},
      {q:"O que e uma explosao BLEVE (Boiling Liquid Expanding Vapour Explosion)?",opts:["Uma simples fuga de vapor sem perigo","Uma explosao devida a rotura subita de um recipiente sob pressao com um liquido muito acima do seu ponto de ebulicao atmosferico, causando uma vaporizacao explosiva","Um fenomeno que so afeta motores diesel","Uma explosao causada apenas por excesso de combustivel"],correct:1,exp:"Um BLEVE ocorre quando uma rotura subita causa uma queda instantanea de pressao: a agua vaporiza em 1/1000 de segundo com uma expansao de volume de 1700x, gerando uma onda de choque explosiva. Causas: falta de agua, incrustacao extrema, corrosao, sobrepressao."},
      {q:"Por que a purga da camara de combustao (pre-purga) e obrigatoria antes de cada arranque do queimador?",opts:["Para poupar combustivel","Para eliminar qualquer gas combustivel residual que poderia inflamar-se violentamente na ignicao","E um passo opcional consoante o fabricante","Para arrefecer a caldeira antes de arrancar"],correct:1,exp:"A pre-purga (minimo 3-4 volumes de camara, 30-60 segundos) elimina os vapores de combustivel residuais. Sem esta purga, a ignicao poderia inflamar vapores acumulados, causando uma explosao na camara."},
      {q:"Como se inspeciona e testa um pressostato de alta pressao numa caldeira?",opts:["Nao requer inspecao alguma","Inspecao visual, teste funcional com gerador de pressao, e teste anual em condicoes reais verificando os limiares","So um controlo visual externo uma vez por ano","Fazendo-lhe bypass temporariamente para testar o resto do circuito"],correct:1,exp:"A inspecao inclui um controlo visual (ligacoes, fugas), um teste funcional (gerador de pressao simulando alta pressao) e um teste anual em condicoes reais verificando o disparo nos limiares regulados. Nunca fazer bypass a um pressostato."},
      {q:"Qual e a primeira responsabilidade do maquinista de quarto perante um alarme de caldeira?",opts:["Ignorar o alarme se parecer menor","Responder de imediato (menos de um minuto): reconhecer, dirigir-se a caldeira e avaliar a situacao antes de agir","Esperar as instrucoes do comandante antes de qualquer acao","Cortar de imediato a alimentacao eletrica do navio"],correct:1,exp:"O maquinista de quarto deve responder em menos de um minuto: reconhecer o alarme, dirigir-se de imediato a caldeira, avaliar o tipo e gravidade do alarme, e aplicar o procedimento correspondente, nunca rearmando sem encontrar a causa."},
      {q:"Por que os alarmes de caldeira devem ser transmitidos ao passadico e nao apenas soar localmente?",opts:["Nao e uma exigencia real","Para garantir que um alarme seja percebido mesmo que nenhum tripulante esteja presente perto da caldeira quando ele dispara","So por razoes esteticas","O passadico nao tem nenhum papel na gestao de alarmes de maquinas"],correct:1,exp:"Os alarmes de caldeira sao transmitidos ao passadico e a sala de controlo de maquinas para garantir que sejam percebidos mesmo que nenhum tripulante esteja fisicamente presente perto da caldeira, especialmente durante quartos reduzidos ou a noite."},
      {q:"Para que serve a sequencia de intertravamento do queimador antes da ignicao?",opts:["So tem um papel cosmetico","Impede que o queimador acenda ate que todas as condicoes de seguranca (purga, nivel de agua, pressao) sejam confirmadas","So serve para poupar combustivel","Retarda deliberadamente o arranque sem motivo de seguranca"],correct:1,exp:"A sequencia de intertravamento verifica e confirma todas as condicoes de seguranca (purga completa, nivel de agua correto, pressao normal, ausencia de falhas) antes de autorizar a ignicao do queimador, impedindo qualquer arranque numa configuracao perigosa."},
      {q:"Onde deve estar localizado o botao de paragem de emergencia (E-stop) manual de uma caldeira e porque?",opts:["So na casa das maquinas, longe da caldeira","Nas imediacoes da caldeira e facilmente acessivel, permitindo um corte imediato em caso de perigo visivel","Nao e obrigatorio em caldeiras marinhas","So no passadico"],correct:1,exp:"O botao de paragem de emergencia deve estar localizado nas imediacoes da caldeira, claramente identificado e facilmente acessivel, permitindo a qualquer pessoa presente cortar de imediato o queimador em caso de perigo visivel, sem esperar pela intervencao remota."},
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

export default function LessonE3_L5({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t=T[lang]||T.fr;
  const [phase,setPhase]=useState<"content"|"quiz">("content");
  const [quizDone,setQuizDone]=useState(false);
  const progress=phase==="content"?50:quizDone?100:85;
  const backLabel=lang==="fr"?"◀ Retour":lang==="en"?"◀ Back":lang==="es"?"◀ Volver":"◀ Voltar";
  const moduleFull=lang==="fr"?"Module E3 — Chaudières":lang==="en"?"Module E3 — Boilers":lang==="es"?"Módulo E3 — Calderas":"Módulo E3 — Caldeiras";
  const lessonOf=lang==="fr"?"Leçon 5/6":lang==="en"?"Lesson 5/6":lang==="es"?"Lección 5/6":"Lição 5/6";
  const badgeText=lang==="fr"?`🛡️ ${moduleFull} · Leçon 5/6 · ⭐ Premium · 200 XP`:lang==="en"?`🛡️ ${moduleFull} · Lesson 5/6 · ⭐ Premium · 200 XP`:lang==="es"?`🛡️ ${moduleFull} · Lección 5/6 · ⭐ Premium · 200 XP`:`🛡️ ${moduleFull} · Lição 5/6 · ⭐ Premium · 200 XP`;
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(249,115,22,0.22)"}}>
        <div style={{minHeight:54,display:"flex",alignItems:"center",padding:"8px 16px",gap:12}}>
          <button onClick={phase==="content"?onBack:()=>setPhase("content")} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>{backLabel}</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:10,color:"#f97316",letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🛡️ {moduleFull}</div>
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
