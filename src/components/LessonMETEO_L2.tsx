// @ts-nocheck
import { useState, useEffect } from "react";
import { C, T, Stars, Card, SL, QuizComp, QuestionBank } from "./LessonShared";

// LessonShared's T.module is hardcoded to Safety ("Sécurité"/"Safety"/...) — override per department.
const MODULE_LABEL = { fr:"Météorologie", en:"Meteorology", es:"Meteorología", pt:"Meteorologia" };

// BANK - 15 QUESTIONS
const BANK = {
  fr:[
    {q:"Quel nuage annonce souvent un front qui approche ?",opts:["Cirrus","Cumulus","Stratus","Cumulonimbus"],correct:0,expl:"Les cirrus fins et hauts précèdent souvent un front."},
    {q:"Quel nuage est associé aux orages violents ?",opts:["Cumulonimbus","Stratus","Cirrus","Cumulus"],correct:0,expl:"Le cumulonimbus produit orages et grains violents."},
    {q:"Quel type de brouillard est le plus dangereux en mer ?",opts:["Brouillard d'advection","Brouillard de rayonnement","Brouillard de vallée","Brouillard industriel"],correct:0,expl:"Il apparaît rapidement et couvre de vastes zones."},
    {q:"Qu'est-ce qu'un grain ?",opts:["Phénomène bref et violent","Pluie continue et légère","Absence totale de vent","Brouillard épais"],correct:0,expl:"Le grain est bref mais violent, lié à un cumulonimbus."},
    {q:"Que faut-il faire face à une trombe marine visible ?",opts:["L'éviter absolument","S'en approcher pour observer","L'ignorer si loin","Continuer la route sans changement"],correct:0,expl:"Une trombe marine doit toujours être évitée."},
    {q:"Que doit contenir une observation météo utile à bord ?",opts:["Nuage, vent, visibilité, pression, heure","Uniquement la température","Uniquement le nom du navire","Rien de précis"],correct:0,expl:"Ces éléments permettent de détecter une tendance."},
    {q:"Quel nuage est associé au beau temps ?",opts:["Cumulus","Cumulonimbus","Stratus","Cirrus"],correct:0,expl:"Le cumulus isolé est typique du beau temps."},
    {q:"Le brouillard de rayonnement se forme :",opts:["Nuit claire, refroidissement du sol","En plein midi ensoleillé","Uniquement en montagne","Uniquement sur terre chaude"],correct:0,expl:"Il se forme par nuit claire quand le sol refroidit rapidement."},
    {q:"Une couche basse et uniforme de nuages gris est probablement :",opts:["Stratus","Cirrus","Cumulonimbus","Cumulus"],correct:0,expl:"Le stratus forme une couche basse et uniforme, souvent grise."},
    {q:"Pourquoi consigner régulièrement les observations météo ?",opts:["Pour détecter une tendance avant qu'elle devienne critique","Par obligation administrative uniquement","Cela n'a pas d'utilité réelle","Uniquement pour le capitaine"],correct:0,expl:"Une tendance se détecte tôt grâce à un suivi régulier."},
    {q:"Le brouillard d'advection se forme typiquement :",opts:["Air chaud et humide sur mer froide","Air froid sur terre chaude","Absence totale d'humidité","Uniquement en hiver"],correct:0,expl:"C'est le mécanisme classique du brouillard d'advection en mer."},
    {q:"Quelle est la principale différence entre pluie continue et grain ?",opts:["Durée et intensité","Couleur du ciel uniquement","Aucune différence réelle","Température de l'eau"],correct:0,expl:"Le grain est bref et violent, la pluie continue est étendue et régulière."},
    {q:"Un officier réduit la vitesse avant même de voir le brouillard car :",opts:["Les conditions annoncent son apparition probable","C'est une règle sans justification","Il n'y a aucune raison valable","Cela n'a pas d'impact sur la sécurité"],correct:0,expl:"Vent qui tombe et air humide annoncent un risque de brouillard."},
    {q:"Quelle erreur est fréquente face à un ciel qui se dégrade progressivement ?",opts:["L'ignorer car le changement est lent","Le signaler immédiatement","Le consigner régulièrement","En informer l'officier de quart"],correct:0,expl:"Un changement lent est souvent ignoré à tort — il doit être suivi."},
    {q:"Le ciel passe de cirrus épars à une couche basse grise en une heure. Quelle action est correcte ?",opts:["Informer la passerelle sans attendre","Attendre de voir si cela s'aggrave","Continuer sans rien signaler","Ne rien faire"],correct:0,expl:"Anticiper permet de réduire la vitesse et renforcer la veille."},
  ],
  en:[
    {q:"Which cloud often signals an approaching front?",opts:["Cirrus","Cumulus","Stratus","Cumulonimbus"],correct:0,expl:"Thin high cirrus often precede a front."},
    {q:"Which cloud is linked to violent storms?",opts:["Cumulonimbus","Stratus","Cirrus","Cumulus"],correct:0,expl:"Cumulonimbus produces storms and violent squalls."},
    {q:"Which fog type is most dangerous at sea?",opts:["Advection fog","Radiation fog","Valley fog","Industrial fog"],correct:0,expl:"It can form quickly and cover vast areas."},
    {q:"What is a squall?",opts:["Brief violent phenomenon","Light continuous rain","Total absence of wind","Thick fog"],correct:0,expl:"A squall is brief but violent, linked to cumulonimbus."},
    {q:"What should be done when a waterspout is visible?",opts:["Avoid it absolutely","Approach to observe","Ignore if far away","Continue course unchanged"],correct:0,expl:"A waterspout must always be avoided."},
    {q:"What should a useful onboard weather observation include?",opts:["Cloud, wind, visibility, pressure, time","Only temperature","Only ship name","Nothing specific"],correct:0,expl:"These elements allow a trend to be detected."},
    {q:"Which cloud is associated with fair weather?",opts:["Cumulus","Cumulonimbus","Stratus","Cirrus"],correct:0,expl:"An isolated cumulus is typical of fair weather."},
    {q:"Radiation fog forms:",opts:["Clear night, ground cooling","At sunny midday","Only in mountains","Only over warm land"],correct:0,expl:"It forms on clear nights as the ground cools rapidly."},
    {q:"A low uniform grey cloud layer is probably:",opts:["Stratus","Cirrus","Cumulonimbus","Cumulus"],correct:0,expl:"Stratus forms a low uniform layer, often grey."},
    {q:"Why log weather observations regularly?",opts:["To detect a trend before it becomes critical","Only for administrative duty","It has no real use","Only for the captain"],correct:0,expl:"A trend is detected early through regular tracking."},
    {q:"Advection fog typically forms:",opts:["Warm humid air over cold sea","Cold air over warm land","Total absence of humidity","Only in winter"],correct:0,expl:"This is the classic mechanism of advection fog at sea."},
    {q:"What is the main difference between continuous rain and a squall?",opts:["Duration and intensity","Sky color only","No real difference","Water temperature"],correct:0,expl:"A squall is brief and violent, continuous rain is extended and steady."},
    {q:"An officer reduces speed even before seeing fog because:",opts:["Conditions indicate its likely appearance","It's an unjustified rule","There is no valid reason","It has no safety impact"],correct:0,expl:"Dropping wind and humid air signal fog risk."},
    {q:"What common mistake occurs with a gradually deteriorating sky?",opts:["Ignoring it because change is slow","Reporting it immediately","Logging it regularly","Informing the officer of the watch"],correct:0,expl:"Slow change is often wrongly ignored — it must be tracked."},
    {q:"The sky changes from scattered cirrus to a low grey layer within an hour. What is the correct action?",opts:["Inform the bridge without delay","Wait to see if it worsens","Continue without reporting","Do nothing"],correct:0,expl:"Anticipating allows speed to be reduced and lookout reinforced."},
  ],
  es:[
    {q:"¿Qué nube anuncia a menudo un frente que se acerca?",opts:["Cirro","Cúmulo","Estrato","Cumulonimbus"],correct:0,expl:"Los cirros finos y altos a menudo preceden un frente."},
    {q:"¿Qué nube se asocia a tormentas violentas?",opts:["Cumulonimbus","Estrato","Cirro","Cúmulo"],correct:0,expl:"El cumulonimbo produce tormentas y chubascos violentos."},
    {q:"¿Qué tipo de niebla es más peligrosa en el mar?",opts:["Niebla de advección","Niebla de radiación","Niebla de valle","Niebla industrial"],correct:0,expl:"Puede aparecer rápidamente y cubrir vastas zonas."},
    {q:"¿Qué es un chubasco?",opts:["Fenómeno breve y violento","Lluvia continua y ligera","Ausencia total de viento","Niebla espesa"],correct:0,expl:"El chubasco es breve pero violento, ligado a un cumulonimbo."},
    {q:"¿Qué hay que hacer ante una tromba marina visible?",opts:["Evitarla absolutamente","Acercarse para observar","Ignorarla si está lejos","Continuar sin cambios"],correct:0,expl:"Una tromba marina siempre debe evitarse."},
    {q:"¿Qué debe contener una observación meteorológica útil a bordo?",opts:["Nube, viento, visibilidad, presión, hora","Solo temperatura","Solo nombre del buque","Nada específico"],correct:0,expl:"Estos elementos permiten detectar una tendencia."},
    {q:"¿Qué nube se asocia al buen tiempo?",opts:["Cúmulo","Cumulonimbus","Estrato","Cirro"],correct:0,expl:"El cúmulo aislado es típico del buen tiempo."},
    {q:"La niebla de radiación se forma:",opts:["Noche clara, enfriamiento del suelo","A pleno mediodía soleado","Solo en montaña","Solo sobre tierra caliente"],correct:0,expl:"Se forma en noche clara cuando el suelo se enfría rápidamente."},
    {q:"Una capa baja y uniforme de nubes grises es probablemente:",opts:["Estrato","Cirro","Cumulonimbus","Cúmulo"],correct:0,expl:"El estrato forma una capa baja y uniforme, a menudo gris."},
    {q:"¿Por qué registrar regularmente las observaciones meteorológicas?",opts:["Para detectar una tendencia antes de que sea crítica","Solo por obligación administrativa","No tiene utilidad real","Solo para el capitán"],correct:0,expl:"Una tendencia se detecta pronto gracias a un seguimiento regular."},
    {q:"La niebla de advección se forma típicamente:",opts:["Aire cálido y húmedo sobre mar frío","Aire frío sobre tierra caliente","Ausencia total de humedad","Solo en invierno"],correct:0,expl:"Es el mecanismo clásico de la niebla de advección en el mar."},
    {q:"¿Cuál es la principal diferencia entre lluvia continua y chubasco?",opts:["Duración e intensidad","Solo el color del cielo","Ninguna diferencia real","Temperatura del agua"],correct:0,expl:"El chubasco es breve y violento, la lluvia continua es extensa y regular."},
    {q:"Un oficial reduce la velocidad incluso antes de ver la niebla porque:",opts:["Las condiciones anuncian su probable aparición","Es una regla sin justificación","No hay razón válida","No tiene impacto en la seguridad"],correct:0,expl:"Viento que cae y aire húmedo anuncian riesgo de niebla."},
    {q:"¿Qué error es frecuente ante un cielo que se degrada progresivamente?",opts:["Ignorarlo porque el cambio es lento","Informarlo inmediatamente","Registrarlo regularmente","Informar al oficial de guardia"],correct:0,expl:"Un cambio lento a menudo se ignora erróneamente — debe seguirse."},
    {q:"El cielo pasa de cirros dispersos a una capa baja gris en una hora. ¿Cuál es la acción correcta?",opts:["Informar al puente sin demora","Esperar a ver si empeora","Continuar sin informar","No hacer nada"],correct:0,expl:"Anticiparse permite reducir la velocidad y reforzar la vigilancia."},
  ],
  pt:[
    {q:"Que nuvem anuncia frequentemente uma frente a aproximar-se?",opts:["Cirro","Cúmulo","Estrato","Cumulonimbus"],correct:0,expl:"Os cirros finos e altos frequentemente precedem uma frente."},
    {q:"Que nuvem está associada a tempestades violentas?",opts:["Cumulonimbus","Estrato","Cirro","Cúmulo"],correct:0,expl:"O cumulonimbo produz tempestades e borrascas violentas."},
    {q:"Que tipo de nevoeiro é mais perigoso no mar?",opts:["Nevoeiro de advecção","Nevoeiro de radiação","Nevoeiro de vale","Nevoeiro industrial"],correct:0,expl:"Pode surgir rapidamente e cobrir vastas áreas."},
    {q:"O que é uma borrasca?",opts:["Fenómeno breve e violento","Chuva contínua e ligeira","Ausência total de vento","Nevoeiro espesso"],correct:0,expl:"A borrasca é breve mas violenta, ligada a um cumulonimbo."},
    {q:"O que fazer perante uma tromba marítima visível?",opts:["Evitá-la absolutamente","Aproximar-se para observar","Ignorá-la se distante","Continuar sem alterações"],correct:0,expl:"Uma tromba marítima deve ser sempre evitada."},
    {q:"O que deve conter uma observação meteorológica útil a bordo?",opts:["Nuvem, vento, visibilidade, pressão, hora","Apenas temperatura","Apenas nome do navio","Nada específico"],correct:0,expl:"Estes elementos permitem detetar uma tendência."},
    {q:"Que nuvem está associada ao bom tempo?",opts:["Cúmulo","Cumulonimbus","Estrato","Cirro"],correct:0,expl:"O cúmulo isolado é típico do bom tempo."},
    {q:"O nevoeiro de radiação forma-se:",opts:["Noite clara, arrefecimento do solo","Ao meio-dia ensolarado","Apenas em montanha","Apenas sobre terra quente"],correct:0,expl:"Forma-se em noite clara quando o solo arrefece rapidamente."},
    {q:"Uma camada baixa e uniforme de nuvens cinzentas é provavelmente:",opts:["Estrato","Cirro","Cumulonimbus","Cúmulo"],correct:0,expl:"O estrato forma uma camada baixa e uniforme, frequentemente cinzenta."},
    {q:"Por que registar regularmente as observações meteorológicas?",opts:["Para detetar uma tendência antes de se tornar crítica","Apenas por obrigação administrativa","Não tem utilidade real","Apenas para o comandante"],correct:0,expl:"Uma tendência deteta-se cedo graças a um acompanhamento regular."},
    {q:"O nevoeiro de advecção forma-se tipicamente:",opts:["Ar quente e húmido sobre mar frio","Ar frio sobre terra quente","Ausência total de humidade","Apenas no inverno"],correct:0,expl:"É o mecanismo clássico do nevoeiro de advecção no mar."},
    {q:"Qual é a principal diferença entre chuva contínua e borrasca?",opts:["Duração e intensidade","Apenas a cor do céu","Nenhuma diferença real","Temperatura da água"],correct:0,expl:"A borrasca é breve e violenta, a chuva contínua é extensa e regular."},
    {q:"Um oficial reduz a velocidade mesmo antes de ver o nevoeiro porque:",opts:["As condições anunciam a sua provável aparição","É uma regra sem justificação","Não há razão válida","Não tem impacto na segurança"],correct:0,expl:"Vento que cai e ar húmido anunciam risco de nevoeiro."},
    {q:"Que erro é frequente perante um céu que se degrada progressivamente?",opts:["Ignorá-lo porque a mudança é lenta","Comunicá-lo imediatamente","Registá-lo regularmente","Informar o oficial de quarto"],correct:0,expl:"Uma mudança lenta é frequentemente ignorada erradamente — deve ser acompanhada."},
    {q:"O céu passa de cirros dispersos a uma camada baixa cinzenta numa hora. Qual é a ação correta?",opts:["Informar o passadiço sem demora","Esperar para ver se piora","Continuar sem comunicar","Não fazer nada"],correct:0,expl:"Antecipar permite reduzir a velocidade e reforçar a vigilância."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS) — reprend Q1, Q3, Q5, Q10, Q15 de la banque
const QUIZ = {
  fr:[BANK.fr[0], BANK.fr[2], BANK.fr[4], BANK.fr[9], BANK.fr[14]],
  en:[BANK.en[0], BANK.en[2], BANK.en[4], BANK.en[9], BANK.en[14]],
  es:[BANK.es[0], BANK.es[2], BANK.es[4], BANK.es[9], BANK.es[14]],
  pt:[BANK.pt[0], BANK.pt[2], BANK.pt[4], BANK.pt[9], BANK.pt[14]],
};

// TEXT CONTENT
const getContent = lang => {
  const d = {
    fr:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Leçon 2/7",
      title:"Nuages, visibilité et observation météo",
      intro:"Avant de lire une carte météo, un marin doit savoir lire le ciel. Les nuages et la visibilité racontent déjà l'histoire de ce qui arrive.",
      p0:"CE QUE L'ŒIL VOIT ANNONCE CE QUE L'INSTRUMENT CONFIRMERA.",s0t:"Nuages, visibilité et observation météo",
      s0:"Reconnaître les types de nuages, les phénomènes réduisant la visibilité, et savoir consigner une observation utile à bord.",
      p1:"Les grandes familles de nuages",
      s1:"Cumulus (beau temps, développement vertical), Stratus (couche basse et uniforme, souvent gris), Cirrus (haute altitude, fins et filandreux, souvent signe avant-coureur d'un front chaud ou d'un changement de temps), Cumulonimbus (développement vertical intense, orages, grains violents). Les cumulus de beau temps sont généralement associés à des conditions stables, mais certains peuvent évoluer vers des cumulonimbus lorsque l'instabilité atmosphérique augmente.\n\nLa hauteur et la forme d'un nuage donnent une indication directe sur l'évolution à venir.",
      p2:"Brouillard et brume : origines",
      s2:"Brouillard de rayonnement (nuit claire, refroidissement du sol), brouillard d'advection (air chaud et humide sur mer froide — fréquent en mer), brouillard de vallée, brouillard industriel.\n\nLe brouillard d'advection peut apparaître rapidement et couvrir de vastes zones — c'est le plus dangereux en mer.",
      p3:"Pluie, grains et trombes marines",
      s3:"La pluie continue annonce souvent un système frontal étendu ; le grain est un phénomène bref et violent (vent, pluie intense) lié à un cumulonimbus. La trombe marine est une colonne tourbillonnante visible entre nuage et mer, à éviter absolument.",
      p4:"Observer et consigner à bord",
      s4:"Toute observation utile note : type de nuage dominant, direction/force du vent, visibilité estimée, pression si disponible, heure exacte.\n\nUne observation consignée régulièrement permet de détecter une tendance avant qu'elle devienne critique.",
      p5:"🎯 Exercice : le ciel qui change",
      s5:"Vous êtes de quart. En une heure, le ciel passe de cirrus épars à une couche basse et grise. La visibilité diminue.\n\nQuel type de nuage observez-vous à la fin ? Que devez-vous signaler ?",
      p6:"🧭 Étude de cas",
      p7:"Un caboteur navigue par ciel clair en soirée. Le vent tombe, l'air devient humide. Le second officier informe immédiatement le commandant, réduit la vitesse conformément aux procédures du navire et fait préparer les signaux sonores si les conditions l'exigent.\n\nPourquoi cette décision était-elle justifiée avant même de voir le brouillard ?",
      p8:"📋 Banque de 15 questions",
      p9:"💭 À retenir : les erreurs fréquentes",
      s9:"Ignorer un ciel qui se charge progressivement. Attendre la pluie pour ralentir. Ne pas signaler une trombe marine visible au loin. Confondre brume et brouillard dans l'observation.",
      sumT:"Résumé — Leçon 2",
      sumP:["Chaque type de nuage annonce une tendance","Le brouillard d'advection est le plus dangereux en mer","Un grain est bref mais violent","Consigner l'observation permet de détecter une tendance","Observer précède toujours l'instrument"],
      learnedP:["Identification des types de nuages","Origines du brouillard","Reconnaissance des grains et trombes","Méthode d'observation à bord"],
      transition:"Dans la prochaine leçon, vous apprendrez à utiliser les instruments météo à bord : baromètre, anémomètre et thermomètre.",
      safetyMsg:"Ce que l'œil voit annonce ce que l'instrument confirmera.",
      finalLabel:"MESSAGE CLÉ",
    },
    en:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Lesson 2/7",
      title:"Clouds, Visibility and Weather Observation",
      intro:"Before reading a weather chart, a seafarer must know how to read the sky. Clouds and visibility already tell the story of what's coming.",
      p0:"WHAT THE EYE SEES ANNOUNCES WHAT THE INSTRUMENT WILL CONFIRM.",s0t:"Clouds, Visibility and Weather Observation",
      s0:"Recognizing cloud types, visibility-reducing phenomena, and how to log a useful onboard observation.",
      p1:"Main Cloud Families",
      s1:"Cumulus (fair weather, vertical growth), Stratus (low uniform layer, often grey), Cirrus (high altitude, thin and wispy, often an early sign of an approaching warm front or a change in weather), Cumulonimbus (intense vertical growth, storms, violent squalls). Fair-weather cumulus is generally associated with stable conditions, but some can develop into cumulonimbus when atmospheric instability increases.\n\nA cloud's height and shape directly indicate upcoming weather changes.",
      p2:"Fog and Mist: Origins",
      s2:"Radiation fog (clear night, ground cooling), advection fog (warm humid air over cold sea — common at sea), valley fog, industrial fog.\n\nAdvection fog can form quickly and cover vast areas — the most dangerous at sea.",
      p3:"Rain, Squalls and Waterspouts",
      s3:"Continuous rain often signals an extensive frontal system; a squall is brief and violent (wind, heavy rain) linked to a cumulonimbus. A waterspout is a rotating column visible between cloud and sea, to be absolutely avoided.",
      p4:"Observing and Logging Onboard",
      s4:"A useful observation notes: dominant cloud type, wind direction/force, estimated visibility, pressure if available, exact time.\n\nRegular logging allows a trend to be detected before it becomes critical.",
      p5:"🎯 Exercise: The Changing Sky",
      s5:"You are on watch. Within an hour, the sky changes from scattered cirrus to a low grey layer. Visibility decreases.\n\nWhat cloud type do you observe at the end? What should you report?",
      p6:"🧭 Case Study",
      p7:"A coaster sails under clear evening skies. The wind drops, the air becomes humid. The second officer immediately informs the Master, reduces speed in accordance with the ship's procedures, and has the sound signals prepared should conditions require them.\n\nWhy was this decision justified before fog was even visible?",
      p8:"📋 15-Question Bank",
      p9:"💭 Remember: Common Mistakes",
      s9:"Ignoring a sky that gradually thickens. Waiting for rain to slow down. Not reporting a waterspout visible in the distance. Confusing mist and fog in observation.",
      sumT:"Summary — Lesson 2",
      sumP:["Every cloud type signals a trend","Advection fog is the most dangerous at sea","A squall is brief but violent","Logging observations reveals trends","Observation always precedes the instrument"],
      learnedP:["Cloud type identification","Fog origins","Recognizing squalls and waterspouts","Onboard observation method"],
      transition:"In the next lesson, you will learn to use onboard weather instruments: barometer, anemometer, and thermometer.",
      safetyMsg:"What the eye sees announces what the instrument will confirm.",
      finalLabel:"KEY MESSAGE",
    },
    es:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Lección 2/7",
      title:"Nubes, visibilidad y observación meteorológica",
      intro:"Antes de leer una carta meteorológica, un marino debe saber leer el cielo. Las nubes y la visibilidad ya cuentan la historia de lo que viene.",
      p0:"LO QUE EL OJO VE ANUNCIA LO QUE EL INSTRUMENTO CONFIRMARÁ.",s0t:"Nubes, visibilidad y observación meteorológica",
      s0:"Reconocer los tipos de nubes, los fenómenos que reducen la visibilidad, y saber registrar una observación útil a bordo.",
      p1:"Las grandes familias de nubes",
      s1:"Cúmulo (buen tiempo, desarrollo vertical), Estrato (capa baja y uniforme, a menudo gris), Cirro (gran altitud, finos y filamentosos, a menudo señal temprana de un frente cálido o de un cambio de tiempo), Cumulonimbo (desarrollo vertical intenso, tormentas, chubascos violentos). Los cúmulos de buen tiempo suelen asociarse a condiciones estables, pero algunos pueden evolucionar hacia cumulonimbos cuando aumenta la inestabilidad atmosférica.\n\nLa altura y forma de una nube indican directamente la evolución venidera.",
      p2:"Niebla y bruma: orígenes",
      s2:"Niebla de radiación (noche clara, enfriamiento del suelo), niebla de advección (aire cálido y húmedo sobre mar frío — frecuente en el mar), niebla de valle, niebla industrial.\n\nLa niebla de advección puede aparecer rápidamente y cubrir vastas zonas — la más peligrosa en el mar.",
      p3:"Lluvia, chubascos y trombas marinas",
      s3:"La lluvia continua a menudo anuncia un sistema frontal extenso; el chubasco es breve y violento (viento, lluvia intensa) ligado a un cumulonimbo. La tromba marina es una columna giratoria visible entre nube y mar, a evitar absolutamente.",
      p4:"Observar y registrar a bordo",
      s4:"Una observación útil anota: tipo de nube dominante, dirección/fuerza del viento, visibilidad estimada, presión si disponible, hora exacta.\n\nUn registro regular permite detectar una tendencia antes de que se vuelva crítica.",
      p5:"🎯 Ejercicio: el cielo que cambia",
      s5:"Estás de guardia. En una hora, el cielo pasa de cirros dispersos a una capa baja y gris. La visibilidad disminuye.\n\n¿Qué tipo de nube observas al final? ¿Qué debes informar?",
      p6:"🧭 Estudio de caso",
      p7:"Un buque costero navega con cielo despejado al anochecer. El viento cae, el aire se vuelve húmedo. El segundo oficial informa inmediatamente al capitán, reduce la velocidad conforme a los procedimientos del buque y hace preparar las señales acústicas si las condiciones lo exigen.\n\n¿Por qué esta decisión estaba justificada antes de ver la niebla?",
      p8:"📋 Banco de 15 preguntas",
      p9:"💭 Recuerda: errores frecuentes",
      s9:"Ignorar un cielo que se carga progresivamente. Esperar la lluvia para reducir velocidad. No informar una tromba marina visible a lo lejos. Confundir bruma y niebla en la observación.",
      sumT:"Resumen — Lección 2",
      sumP:["Cada tipo de nube anuncia una tendencia","La niebla de advección es la más peligrosa en el mar","Un chubasco es breve pero violento","Registrar la observación permite detectar una tendencia","Observar siempre precede al instrumento"],
      learnedP:["Identificación de tipos de nubes","Orígenes de la niebla","Reconocimiento de chubascos y trombas","Método de observación a bordo"],
      transition:"En la próxima lección, aprenderás a usar los instrumentos meteorológicos a bordo: barómetro, anemómetro y termómetro.",
      safetyMsg:"Lo que el ojo ve anuncia lo que el instrumento confirmará.",
      finalLabel:"MENSAJE CLAVE",
    },
    pt:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Lição 2/7",
      title:"Nuvens, visibilidade e observação meteorológica",
      intro:"Antes de ler uma carta meteorológica, um marítimo deve saber ler o céu. As nuvens e a visibilidade já contam a história do que vem a seguir.",
      p0:"O QUE O OLHO VÊ ANUNCIA O QUE O INSTRUMENTO CONFIRMARÁ.",s0t:"Nuvens, visibilidade e observação meteorológica",
      s0:"Reconhecer os tipos de nuvens, os fenómenos que reduzem a visibilidade, e saber registar uma observação útil a bordo.",
      p1:"As grandes famílias de nuvens",
      s1:"Cúmulo (bom tempo, desenvolvimento vertical), Estrato (camada baixa e uniforme, frequentemente cinzenta), Cirro (grande altitude, finos e filamentosos, frequentemente sinal precoce de uma frente quente ou de uma mudança de tempo), Cumulonimbo (desenvolvimento vertical intenso, tempestades, borrascas violentas). Os cúmulos de bom tempo estão geralmente associados a condições estáveis, mas alguns podem evoluir para cumulonimbos quando a instabilidade atmosférica aumenta.\n\nA altura e forma de uma nuvem indicam diretamente a evolução vindoura.",
      p2:"Nevoeiro e neblina: origens",
      s2:"Nevoeiro de radiação (noite clara, arrefecimento do solo), nevoeiro de advecção (ar quente e húmido sobre mar frio — frequente no mar), nevoeiro de vale, nevoeiro industrial.\n\nO nevoeiro de advecção pode surgir rapidamente e cobrir vastas áreas — o mais perigoso no mar.",
      p3:"Chuva, borrascas e trombas marítimas",
      s3:"A chuva contínua frequentemente anuncia um sistema frontal extenso; a borrasca é breve e violenta (vento, chuva intensa) ligada a um cumulonimbo. A tromba marítima é uma coluna giratória visível entre nuvem e mar, a evitar absolutamente.",
      p4:"Observar e registar a bordo",
      s4:"Uma observação útil regista: tipo de nuvem dominante, direção/força do vento, visibilidade estimada, pressão se disponível, hora exata.\n\nUm registo regular permite detetar uma tendência antes de se tornar crítica.",
      p5:"🎯 Exercício: o céu que muda",
      s5:"Estás de quarto. Numa hora, o céu passa de cirros dispersos para uma camada baixa e cinzenta. A visibilidade diminui.\n\nQue tipo de nuvem observas no final? O que deves comunicar?",
      p6:"🧭 Estudo de caso",
      p7:"Um navio costeiro navega com céu limpo ao anoitecer. O vento cai, o ar torna-se húmido. O segundo oficial informa imediatamente o comandante, reduz a velocidade de acordo com os procedimentos do navio e manda preparar os sinais sonoros caso as condições o exijam.\n\nPor que razão esta decisão foi justificada antes mesmo de ver o nevoeiro?",
      p8:"📋 Banco de 15 perguntas",
      p9:"💭 Lembrar: erros frequentes",
      s9:"Ignorar um céu que se carrega progressivamente. Esperar a chuva para reduzir a velocidade. Não comunicar uma tromba marítima visível ao longe. Confundir neblina e nevoeiro na observação.",
      sumT:"Resumo — Lição 2",
      sumP:["Cada tipo de nuvem anuncia uma tendência","O nevoeiro de advecção é o mais perigoso no mar","Uma borrasca é breve mas violenta","Registar a observação permite detetar uma tendência","Observar precede sempre o instrumento"],
      learnedP:["Identificação de tipos de nuvens","Origens do nevoeiro","Reconhecimento de borrascas e trombas","Método de observação a bordo"],
      transition:"Na próxima lição, vais aprender a usar os instrumentos meteorológicos a bordo: barómetro, anemómetro e termómetro.",
      safetyMsg:"O que o olho vê anuncia o que o instrumento confirmará.",
      finalLabel:"MENSAGEM-CHAVE",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonMETEO_L2({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
  const t = T[lang]||T.fr;
  const quiz = QUIZ[lang]||QUIZ.fr;
  const bank = BANK[lang]||BANK.fr;
  const lc = getContent(lang);
  const moduleLabel = MODULE_LABEL[lang]||MODULE_LABEL.fr;
  const [phase, setPhase] = useState("content");
  const [bankDone, setBankDone] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [vis, setVis] = useState(false);
  useEffect(()=>{ setTimeout(()=>setVis(true),80); },[]);
  const progress = phase==="content"?15:phase==="quiz"?70:100;

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.border}`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.gold,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>{moduleLabel}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 2/7":lang==="en"?"Lesson 2/7":lang==="es"?"Lección 2/7":"Lição 2/7"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            {/* Access tier badge intentionally omitted — Billing/Access Policy for Meteorology not yet decided */}
            <div style={{fontSize:11,color:C.orange,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.orange},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(230,126,34,0.15)",border:`1px solid ${C.orange}44`,fontSize:11,color:C.orange,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.orange}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>

            <SL icon="👁️" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>👁️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="☁️" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>

            <SL icon="🌫️" text={lc.p2} color={C.teal}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>

            <SL icon="🌧️" text={lc.p3} color={C.orange}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>

            <SL icon="📝" text={lc.p4} color={C.red}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.85)",lineHeight:1.8,whiteSpace:"pre-line"}}>{lc.s5}</div>
            </Card>

            <SL icon="🧭" text={lc.p6} color={C.blue2}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}44`,background:"linear-gradient(135deg,rgba(26,111,212,0.08),rgba(13,31,60,0.8))"}}>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.85)",lineHeight:1.8,whiteSpace:"pre-line"}}>{lc.p7}</div>
            </Card>

            <SL icon="📋" text={lc.p8} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank} onComplete={()=>setBankDone(true)}/></Card>

            <SL icon="💭" text={lc.p9} color={C.purple}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.85)",lineHeight:1.8,whiteSpace:"pre-line"}}>{lc.s9}</div></Card>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(230,126,34,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,boxShadow:"0 10px 36px rgba(230,126,34,0.35)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz Final - Météorologie":lang==="en"?"Final Quiz - Meteorology":lang==="es"?"Quiz Final - Meteorología":"Quiz Final - Meteorologia"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 2/7":"questions · Lesson 2/7"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(230,126,34,0.15)",border:`1px solid ${C.orange}55`,fontSize:14,color:C.gold2,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>

            <Card style={{marginBottom:16,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.1),rgba(13,31,60,0.9))"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span style={{fontSize:20}}>🌦️</span>
                <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",fontWeight:700}}>{lc.finalLabel}</div>
              </div>
              <div style={{fontSize:13,color:C.white,lineHeight:1.8,fontStyle:"italic"}}>{lc.safetyMsg}</div>
            </Card>

            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <div style={{textAlign:"center",fontSize:13,color:C.gold2,fontStyle:"italic",marginBottom:14,padding:"0 8px"}}>{lc.transition}</div>

            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(230,126,34,0.35)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 3 - INSTRUMENTS MÉTÉO →":lang==="en"?"LESSON 3 - WEATHER INSTRUMENTS →":lang==="es"?"LECCIÓN 3 - INSTRUMENTOS METEOROLÓGICOS →":"LIÇÃO 3 - INSTRUMENTOS METEOROLÓGICOS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
