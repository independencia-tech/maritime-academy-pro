// @ts-nocheck
import { useState, useEffect } from "react";
import { C, T, Stars, Card, SL, QuizComp, QuestionBank } from "./LessonShared";

// LessonShared's T.module is hardcoded to Safety ("Sécurité"/"Safety"/...) — override per department.
const MODULE_LABEL = { fr:"Météorologie", en:"Meteorology", es:"Meteorología", pt:"Meteorologia" };

// BANK - 15 QUESTIONS
const BANK = {
  fr:[
    {q:"Quel gaz compose la majorité de l'atmosphère terrestre ?",opts:["Azote","Oxygène","CO2","Vapeur d'eau"],correct:0,expl:"L'azote représente 78% de l'atmosphère."},
    {q:"Dans quelle couche de l'atmosphère se produisent les phénomènes météo ?",opts:["Troposphère","Stratosphère","Mésosphère","Thermosphère"],correct:0,expl:"La troposphère s'étend jusqu'à 8-15 km et concentre toute la météo."},
    {q:"Que se passe-t-il au point de rosée ?",opts:["La vapeur d'eau se condense","L'air se réchauffe","La pression augmente","Le vent cesse"],correct:0,expl:"La condensation forme brouillard, nuages ou précipitations."},
    {q:"Quelle est la pression atmosphérique normale au niveau de la mer ?",opts:["1013 hPa","950 hPa","1050 hPa","900 hPa"],correct:0,expl:"1013 hPa est la référence standard."},
    {q:"Une zone de haute pression (anticyclone) est associée à quel temps ?",opts:["Temps stable","Temps instable","Fortes pluies","Vents violents"],correct:0,expl:"Les anticyclones sont associés à un temps calme et stable."},
    {q:"Une zone de basse pression est associée à quel temps ?",opts:["Temps instable, venteux, pluvieux","Temps stable","Ciel toujours dégagé","Absence de vent"],correct:0,expl:"Les dépressions apportent instabilité et mauvais temps."},
    {q:"Des isobares très resserrées sur une carte météo indiquent quoi ?",opts:["Un vent fort","Un vent faible","Une pression stable","Un ciel dégagé"],correct:0,expl:"Plus la différence de pression est marquée sur une courte distance, plus le vent est fort."},
    {q:"Qu'est-ce qui crée le vent ?",opts:["Les différences de pression","La rotation de la Terre seule","La température de la mer","L'humidité de l'air"],correct:0,expl:"L'air se déplace des hautes vers les basses pressions."},
    {q:"Quelle force dévie la direction du vent ?",opts:["La force de Coriolis","La gravité","La force centrifuge","La pression atmosphérique"],correct:0,expl:"La rotation terrestre dévie le vent (force de Coriolis)."},
    {q:"Une chute rapide du baromètre annonce généralement quoi ?",opts:["Une dégradation météo","Une amélioration météo","Aucun changement","Une baisse de température seulement"],correct:0,expl:"C'est l'un des premiers signes d'alerte à surveiller."},
    {q:"Un vent fort peut provoquer quoi sur un navire ?",opts:["Une gîte excessive","Une réduction de la vitesse du courant","Une hausse de la pression à bord","Rien de significatif"],correct:0,expl:"La gîte excessive est un risque réel de sécurité par vent fort."},
    {q:"Une visibilité réduite augmente principalement quel risque ?",opts:["Collision","Corrosion","Surconsommation de carburant","Perte de communication radio"],correct:0,expl:"La visibilité réduite est un facteur majeur de risque de collision."},
    {q:"Qui doit surveiller les signes de dégradation météo à bord ?",opts:["Chaque membre d'équipage","Uniquement le capitaine","Uniquement l'officier météo","Uniquement les officiers de pont"],correct:0,expl:"Chaque marin, quel que soit son rang, doit reconnaître et signaler une dégradation."},
    {q:"Quelle est une erreur fréquente à éviter face à la météo ?",opts:["Attendre de voir la pluie avant de signaler","Signaler immédiatement toute anomalie","Consulter le baromètre régulièrement","Informer l'officier de quart"],correct:0,expl:"Attendre la pluie pour signaler, c'est déjà trop tard."},
    {q:"Le baromètre passe de 1014 à 1004 hPa en quelques heures et le vent fraîchit. Quelle est la bonne action ?",opts:["Observer et signaler immédiatement","Attendre la prochaine relève","Ne rien faire, c'est normal","Vérifier uniquement dans 24h"],correct:0,expl:"Une chute de 10 hPa en quelques heures est un signal fort — il faut observer et signaler sans délai."},
  ],
  en:[
    {q:"Which gas makes up most of Earth's atmosphere?",opts:["Nitrogen","Oxygen","CO2","Water vapor"],correct:0,expl:"Nitrogen makes up 78% of the atmosphere."},
    {q:"In which atmospheric layer do weather phenomena occur?",opts:["Troposphere","Stratosphere","Mesosphere","Thermosphere"],correct:0,expl:"The troposphere extends up to 8–15 km and contains all weather."},
    {q:"What happens at the dew point?",opts:["Water vapor condenses","Air warms up","Pressure rises","Wind stops"],correct:0,expl:"Condensation forms fog, clouds, or precipitation."},
    {q:"What is normal sea-level atmospheric pressure?",opts:["1013 hPa","950 hPa","1050 hPa","900 hPa"],correct:0,expl:"1013 hPa is the standard reference."},
    {q:"A high-pressure area (anticyclone) is associated with what weather?",opts:["Stable weather","Unstable weather","Heavy rain","Strong winds"],correct:0,expl:"Anticyclones are associated with calm, stable weather."},
    {q:"A low-pressure area is associated with what weather?",opts:["Unstable, windy, rainy weather","Stable weather","Always clear sky","No wind"],correct:0,expl:"Depressions bring instability and bad weather."},
    {q:"What do tightly packed isobars on a weather chart indicate?",opts:["Strong wind","Weak wind","Stable pressure","Clear sky"],correct:0,expl:"The steeper the pressure gradient over a short distance, the stronger the wind."},
    {q:"What creates wind?",opts:["Pressure differences","Earth's rotation alone","Sea temperature","Air humidity"],correct:0,expl:"Air moves from high to low pressure."},
    {q:"What force deflects wind direction?",opts:["Coriolis force","Gravity","Centrifugal force","Atmospheric pressure"],correct:0,expl:"Earth's rotation deflects wind (Coriolis force)."},
    {q:"What does a rapid barometer drop generally signal?",opts:["Deteriorating weather","Improving weather","No change","Only a temperature drop"],correct:0,expl:"It's one of the first warning signs to watch."},
    {q:"What can strong wind cause on a ship?",opts:["Excessive heel","Reduced current speed","Increased onboard pressure","Nothing significant"],correct:0,expl:"Excessive heel is a real safety risk in strong wind."},
    {q:"Reduced visibility mainly increases what risk?",opts:["Collision","Corrosion","Excess fuel consumption","Loss of radio communication"],correct:0,expl:"Reduced visibility is a major collision risk factor."},
    {q:"Who must monitor signs of weather deterioration on board?",opts:["Every crew member","Only the captain","Only the weather officer","Only deck officers"],correct:0,expl:"Every seafarer, regardless of rank, must recognize and report deterioration."},
    {q:"What is a common mistake to avoid regarding weather?",opts:["Waiting to see rain before reporting","Reporting any anomaly immediately","Checking the barometer regularly","Informing the officer of the watch"],correct:0,expl:"Waiting for rain to report is already too late."},
    {q:"The barometer drops from 1014 to 1004 hPa within hours and wind is freshening. What is the correct action?",opts:["Observe and report immediately","Wait for the next watch","Do nothing, it's normal","Only check again in 24h"],correct:0,expl:"A 10 hPa drop within hours is a strong signal — observe and report without delay."},
  ],
  es:[
    {q:"¿Qué gas compone la mayoría de la atmósfera terrestre?",opts:["Nitrógeno","Oxígeno","CO2","Vapor de agua"],correct:0,expl:"El nitrógeno representa el 78% de la atmósfera."},
    {q:"¿En qué capa de la atmósfera ocurren los fenómenos meteorológicos?",opts:["Troposfera","Estratosfera","Mesosfera","Termosfera"],correct:0,expl:"La troposfera se extiende hasta 8-15 km y concentra todo el clima."},
    {q:"¿Qué ocurre en el punto de rocío?",opts:["El vapor de agua se condensa","El aire se calienta","La presión sube","El viento cesa"],correct:0,expl:"La condensación forma niebla, nubes o precipitación."},
    {q:"¿Cuál es la presión atmosférica normal a nivel del mar?",opts:["1013 hPa","950 hPa","1050 hPa","900 hPa"],correct:0,expl:"1013 hPa es la referencia estándar."},
    {q:"¿Una zona de alta presión (anticiclón) se asocia con qué tiempo?",opts:["Tiempo estable","Tiempo inestable","Lluvias fuertes","Vientos violentos"],correct:0,expl:"Los anticiclones se asocian con tiempo tranquilo y estable."},
    {q:"¿Una zona de baja presión se asocia con qué tiempo?",opts:["Tiempo inestable, ventoso, lluvioso","Tiempo estable","Cielo siempre despejado","Ausencia de viento"],correct:0,expl:"Las depresiones traen inestabilidad y mal tiempo."},
    {q:"¿Qué indican las isobaras muy juntas en una carta meteorológica?",opts:["Viento fuerte","Viento débil","Presión estable","Cielo despejado"],correct:0,expl:"Cuanto más marcada la diferencia de presión en corta distancia, más fuerte el viento."},
    {q:"¿Qué crea el viento?",opts:["Las diferencias de presión","La rotación terrestre sola","La temperatura del mar","La humedad del aire"],correct:0,expl:"El aire se mueve de alta a baja presión."},
    {q:"¿Qué fuerza desvía la dirección del viento?",opts:["La fuerza de Coriolis","La gravedad","La fuerza centrífuga","La presión atmosférica"],correct:0,expl:"La rotación terrestre desvía el viento (fuerza de Coriolis)."},
    {q:"¿Qué anuncia generalmente una caída rápida del barómetro?",opts:["Un deterioro meteorológico","Una mejora meteorológica","Ningún cambio","Solo una bajada de temperatura"],correct:0,expl:"Es una de las primeras señales de alerta a vigilar."},
    {q:"¿Qué puede provocar un viento fuerte en un buque?",opts:["Una escora excesiva","Una reducción de la corriente","Un aumento de la presión a bordo","Nada significativo"],correct:0,expl:"La escora excesiva es un riesgo real de seguridad con viento fuerte."},
    {q:"¿Una visibilidad reducida aumenta principalmente qué riesgo?",opts:["Colisión","Corrosión","Sobreconsumo de combustible","Pérdida de comunicación radio"],correct:0,expl:"La visibilidad reducida es un factor mayor de riesgo de colisión."},
    {q:"¿Quién debe vigilar los signos de deterioro meteorológico a bordo?",opts:["Cada miembro de la tripulación","Solo el capitán","Solo el oficial meteorológico","Solo los oficiales de cubierta"],correct:0,expl:"Cada marino, sea cual sea su rango, debe reconocer e informar un deterioro."},
    {q:"¿Cuál es un error frecuente a evitar frente al clima?",opts:["Esperar a ver la lluvia antes de informar","Informar inmediatamente cualquier anomalía","Consultar el barómetro regularmente","Informar al oficial de guardia"],correct:0,expl:"Esperar la lluvia para informar ya es demasiado tarde."},
    {q:"El barómetro pasa de 1014 a 1004 hPa en pocas horas y el viento refresca. ¿Cuál es la acción correcta?",opts:["Observar e informar inmediatamente","Esperar al próximo relevo","No hacer nada, es normal","Verificar solo en 24h"],correct:0,expl:"Una caída de 10 hPa en pocas horas es una señal fuerte — hay que observar e informar sin demora."},
  ],
  pt:[
    {q:"Que gás compõe a maior parte da atmosfera terrestre?",opts:["Azoto","Oxigénio","CO2","Vapor de água"],correct:0,expl:"O azoto representa 78% da atmosfera."},
    {q:"Em que camada da atmosfera ocorrem os fenómenos meteorológicos?",opts:["Troposfera","Estratosfera","Mesosfera","Termosfera"],correct:0,expl:"A troposfera estende-se até 8-15 km e concentra todo o clima."},
    {q:"O que acontece no ponto de orvalho?",opts:["O vapor de água condensa-se","O ar aquece","A pressão sobe","O vento cessa"],correct:0,expl:"A condensação forma nevoeiro, nuvens ou precipitação."},
    {q:"Qual é a pressão atmosférica normal ao nível do mar?",opts:["1013 hPa","950 hPa","1050 hPa","900 hPa"],correct:0,expl:"1013 hPa é a referência padrão."},
    {q:"Uma zona de alta pressão (anticiclone) está associada a que tempo?",opts:["Tempo estável","Tempo instável","Chuvas fortes","Ventos violentos"],correct:0,expl:"Os anticiclones estão associados a tempo calmo e estável."},
    {q:"Uma zona de baixa pressão está associada a que tempo?",opts:["Tempo instável, ventoso, chuvoso","Tempo estável","Céu sempre limpo","Ausência de vento"],correct:0,expl:"As depressões trazem instabilidade e mau tempo."},
    {q:"O que indicam isóbaras muito próximas numa carta meteorológica?",opts:["Vento forte","Vento fraco","Pressão estável","Céu limpo"],correct:0,expl:"Quanto mais acentuada a diferença de pressão numa curta distância, mais forte o vento."},
    {q:"O que cria o vento?",opts:["As diferenças de pressão","A rotação terrestre sozinha","A temperatura do mar","A humidade do ar"],correct:0,expl:"O ar move-se de alta para baixa pressão."},
    {q:"Que força desvia a direção do vento?",opts:["A força de Coriolis","A gravidade","A força centrífuga","A pressão atmosférica"],correct:0,expl:"A rotação terrestre desvia o vento (força de Coriolis)."},
    {q:"O que anuncia geralmente uma queda rápida do barómetro?",opts:["Uma deterioração meteorológica","Uma melhoria meteorológica","Nenhuma alteração","Apenas uma descida de temperatura"],correct:0,expl:"É um dos primeiros sinais de alerta a vigiar."},
    {q:"O que pode um vento forte provocar num navio?",opts:["Um adornamento excessivo","Uma redução da corrente","Um aumento da pressão a bordo","Nada de significativo"],correct:0,expl:"O adornamento excessivo é um risco real de segurança com vento forte."},
    {q:"Uma visibilidade reduzida aumenta principalmente que risco?",opts:["Colisão","Corrosão","Consumo excessivo de combustível","Perda de comunicação rádio"],correct:0,expl:"A visibilidade reduzida é um fator importante de risco de colisão."},
    {q:"Quem deve vigiar os sinais de deterioração meteorológica a bordo?",opts:["Cada membro da tripulação","Apenas o comandante","Apenas o oficial meteorológico","Apenas os oficiais de convés"],correct:0,expl:"Cada marítimo, seja qual for o seu posto, deve reconhecer e comunicar uma deterioração."},
    {q:"Qual é um erro frequente a evitar perante o clima?",opts:["Esperar ver a chuva antes de comunicar","Comunicar imediatamente qualquer anomalia","Consultar o barómetro regularmente","Informar o oficial de quarto"],correct:0,expl:"Esperar pela chuva para comunicar já é tarde demais."},
    {q:"O barómetro passa de 1014 para 1004 hPa em poucas horas e o vento refresca. Qual é a ação correta?",opts:["Observar e comunicar imediatamente","Esperar pelo próximo turno","Não fazer nada, é normal","Verificar apenas daqui a 24h"],correct:0,expl:"Uma queda de 10 hPa em poucas horas é um sinal forte — é preciso observar e comunicar sem demora."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Quel gaz compose la majorité de l'atmosphère ?",opts:["Azote","Oxygène","CO2","Vapeur d'eau"],correct:0,expl:"L'azote représente 78% de l'atmosphère."},
    {q:"Que se passe-t-il au point de rosée ?",opts:["La vapeur se condense","L'air se réchauffe","La pression augmente","Le vent cesse"],correct:0,expl:"La condensation forme brouillard, nuages ou précipitations."},
    {q:"Une zone de basse pression est associée à :",opts:["Temps instable, venteux, pluvieux","Temps stable","Ciel toujours dégagé","Absence de vent"],correct:0,expl:"Les dépressions apportent instabilité et mauvais temps."},
    {q:"Des isobares très resserrées indiquent :",opts:["Un vent fort","Un vent faible","Une pression stable","Un ciel dégagé"],correct:0,expl:"Plus la différence de pression est marquée, plus le vent est fort."},
    {q:"Quelle est la responsabilité d'un matelot lorsqu'il observe une dégradation météo ?",opts:["La reconnaître et la signaler selon les procédures","Attendre que l'officier le remarque","Ne rien faire, ce n'est pas son rôle","Le noter seulement en fin de quart"],correct:0,expl:"Chaque marin doit reconnaître et signaler rapidement, quel que soit son rang."},
  ],
  en:[
    {q:"Which gas makes up most of the atmosphere?",opts:["Nitrogen","Oxygen","CO2","Water vapor"],correct:0,expl:"Nitrogen makes up 78% of the atmosphere."},
    {q:"What happens at the dew point?",opts:["Water vapor condenses","Air warms up","Pressure rises","Wind stops"],correct:0,expl:"Condensation forms fog, clouds, or precipitation."},
    {q:"A low-pressure area is associated with:",opts:["Unstable, windy, rainy weather","Stable weather","Always clear sky","No wind"],correct:0,expl:"Depressions bring instability and bad weather."},
    {q:"Tightly packed isobars indicate:",opts:["Strong wind","Weak wind","Stable pressure","Clear sky"],correct:0,expl:"The steeper the pressure gradient, the stronger the wind."},
    {q:"What is a rating's responsibility when observing weather deterioration?",opts:["Recognize and report it per procedures","Wait for the officer to notice","Do nothing, not their role","Only note it at end of watch"],correct:0,expl:"Every seafarer must recognize and report promptly, regardless of rank."},
  ],
  es:[
    {q:"¿Qué gas compone la mayoría de la atmósfera?",opts:["Nitrógeno","Oxígeno","CO2","Vapor de agua"],correct:0,expl:"El nitrógeno representa el 78% de la atmósfera."},
    {q:"¿Qué ocurre en el punto de rocío?",opts:["El vapor se condensa","El aire se calienta","La presión sube","El viento cesa"],correct:0,expl:"La condensación forma niebla, nubes o precipitación."},
    {q:"¿Una zona de baja presión se asocia con:",opts:["Tiempo inestable, ventoso, lluvioso","Tiempo estable","Cielo siempre despejado","Ausencia de viento"],correct:0,expl:"Las depresiones traen inestabilidad y mal tiempo."},
    {q:"Las isobaras muy juntas indican:",opts:["Viento fuerte","Viento débil","Presión estable","Cielo despejado"],correct:0,expl:"Cuanto más marcada la diferencia de presión, más fuerte el viento."},
    {q:"¿Cuál es la responsabilidad de un marinero al observar un deterioro meteorológico?",opts:["Reconocerlo e informarlo según los procedimientos","Esperar a que el oficial lo note","No hacer nada, no es su función","Anotarlo solo al final del turno"],correct:0,expl:"Cada marino debe reconocer e informar rápidamente, sea cual sea su rango."},
  ],
  pt:[
    {q:"Que gás compõe a maior parte da atmosfera?",opts:["Azoto","Oxigénio","CO2","Vapor de água"],correct:0,expl:"O azoto representa 78% da atmosfera."},
    {q:"O que acontece no ponto de orvalho?",opts:["O vapor condensa-se","O ar aquece","A pressão sobe","O vento cessa"],correct:0,expl:"A condensação forma nevoeiro, nuvens ou precipitação."},
    {q:"Uma zona de baixa pressão está associada a:",opts:["Tempo instável, ventoso, chuvoso","Tempo estável","Céu sempre limpo","Ausência de vento"],correct:0,expl:"As depressões trazem instabilidade e mau tempo."},
    {q:"Isóbaras muito próximas indicam:",opts:["Vento forte","Vento fraco","Pressão estável","Céu limpo"],correct:0,expl:"Quanto mais acentuada a diferença de pressão, mais forte o vento."},
    {q:"Qual é a responsabilidade de um marinheiro ao observar uma deterioração meteorológica?",opts:["Reconhecê-la e comunicá-la conforme os procedimentos","Esperar que o oficial repare","Não fazer nada, não é a sua função","Anotar apenas no final do turno"],correct:0,expl:"Cada marítimo deve reconhecer e comunicar rapidamente, seja qual for o seu posto."},
  ],
};

// TEXT CONTENT
const getContent = lang => {
  const d = {
    fr:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Leçon 1/7",
      title:"Fondamentaux de la météorologie marine",
      intro:"La météo ne provoque pas les accidents. Ce sont les mauvaises décisions prises face à la météo qui les provoquent. Cette leçon ne cherche pas à former un météorologue. Elle répond à une question essentielle : pourquoi un marin doit-il comprendre la météo avant même d'apprendre à lire une carte météorologique ?",
      p0:"LE MARIN NE CONTRÔLE PAS LA MÉTÉO. IL CONTRÔLE SES DÉCISIONS.",s0t:"Fondamentaux de la météorologie marine",
      s0:"Comprendre l'atmosphère, la pression et le vent pour anticiper plutôt que subir.\n\nCette leçon pose les bases scientifiques indispensables à toute décision météo en mer.",
      p1:"L'atmosphère : composition et structure",
      s1:"L'atmosphère terrestre est composée principalement d'azote (78%) et d'oxygène (21%), avec des traces de vapeur d'eau, de CO2 et d'autres gaz.\n\nLa couche qui concerne directement la navigation est la troposphère, où se produisent tous les phénomènes météo (nuages, précipitations, vents). Elle s'étend jusqu'à environ 8-15 km d'altitude selon la latitude.",
      p2:"Température, humidité et condensation",
      s2:"L'air chaud contient plus de vapeur d'eau que l'air froid. Quand l'air se refroidit, il atteint son point de rosée : la vapeur d'eau se condense en gouttelettes, formant brouillard, nuages ou précipitations.\n\nCe mécanisme est à la base de toute prévision météo.",
      p3:"Pression atmosphérique",
      s3:"La pression atmosphérique est le poids de l'air au-dessus d'un point donné, mesurée en hectopascals (hPa). Une pression normale au niveau de la mer est d'environ 1013 hPa.\n\nLes zones de haute pression (anticyclones) sont associées à un temps stable, les zones de basse pression (dépressions) à un temps instable, venteux et pluvieux.\n\nUne chute rapide du baromètre est souvent l'un des premiers signes annonçant une dégradation des conditions météorologiques — un officier de quart attentif y prête toujours attention.",
      p4:"Le vent et la sécurité du navire",
      s4:"Le vent résulte du déplacement d'air des zones de haute pression vers les basses pressions, dévié par la force de Coriolis. Plus la différence de pression est marquée sur une courte distance, plus le vent est fort — ce qu'indiquent les isobares resserrées sur une carte météo.\n\nUne mauvaise compréhension météo peut mettre en danger le navire, l'équipage et la cargaison : gîte excessive, dommages structurels, visibilité réduite. Chaque membre d'équipage, quel que soit son rang, doit savoir reconnaître les signes d'une dégradation météo et la signaler.",
      p5:"🎯 Exercice : la chute du baromètre",
      s5:"Vous êtes AB sur un cargo. Le baromètre passe de 1014 hPa à 1004 hPa en quelques heures. Le vent fraîchit progressivement.\n\nQuelles observations devez-vous effectuer ? Que devez-vous signaler ? Pourquoi ?",
      p6:"🧭 Étude de cas",
      p7:"Un vraquier navigue dans le golfe de Gascogne. La pression chute rapidement. Les prévisions annoncent une dépression. Le commandant réduit la vitesse et modifie légèrement la route.\n\nPourquoi cette décision était-elle pertinente ?",
      p8:"📋 Banque de 15 questions",
      p9:"💭 À retenir : les erreurs fréquentes",
      s9:"Croire que seul le capitaine doit surveiller la météo. Penser qu'une météo calme restera stable. Ignorer une baisse rapide de pression. Attendre de voir la pluie avant de signaler une dégradation.",
      sumT:"Résumé — Leçon 1",
      sumP:["Toute la météo se forme dans la troposphère","Les différences de pression créent le vent","Une baisse rapide de pression annonce souvent une dégradation","Chaque marin observe la météo","La sécurité commence avant la tempête"],
      learnedP:["Composition de l'atmosphère","Mécanisme de condensation","Lecture de la pression atmosphérique","Origine du vent","Signes annonciateurs de dégradation"],
      transition:"Dans la prochaine leçon, vous apprendrez à reconnaître les nuages, le brouillard et les premiers signes visibles d'une dégradation météorologique.",
      safetyMsg:"Le marin ne contrôle pas la météo. Il contrôle ses décisions.",
      finalLabel:"MESSAGE CLÉ",
    },
    en:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Lesson 1/7",
      title:"Fundamentals of Marine Meteorology",
      intro:"Weather does not cause accidents. Poor decisions made in the face of weather do. This lesson does not aim to train a meteorologist. It answers an essential question: why must a seafarer understand weather even before learning to read a weather chart?",
      p0:"THE SEAFARER DOES NOT CONTROL THE WEATHER. HE CONTROLS HIS DECISIONS.",s0t:"Fundamentals of Marine Meteorology",
      s0:"Understanding the atmosphere, pressure, and wind to anticipate rather than endure.\n\nThis lesson lays the scientific groundwork essential to every weather-related decision at sea.",
      p1:"The Atmosphere: Composition and Structure",
      s1:"Earth's atmosphere is mainly composed of nitrogen (78%) and oxygen (21%), with traces of water vapor, CO2, and other gases.\n\nThe layer directly relevant to navigation is the troposphere, where all weather phenomena occur (clouds, precipitation, wind). It extends up to about 8–15 km depending on latitude.",
      p2:"Temperature, Humidity, and Condensation",
      s2:"Warm air holds more water vapor than cold air. When air cools, it reaches its dew point: water vapor condenses into droplets, forming fog, clouds, or precipitation.\n\nThis mechanism is the basis of all weather forecasting.",
      p3:"Atmospheric Pressure",
      s3:"Atmospheric pressure is the weight of air above a given point, measured in hectopascals (hPa). Normal sea-level pressure is about 1013 hPa.\n\nHigh-pressure areas (anticyclones) are associated with stable weather, low-pressure areas (depressions) with unstable, windy, rainy weather.\n\nA rapid drop in the barometer is often one of the first signs of deteriorating weather — an attentive officer of the watch always pays attention to it.",
      p4:"Wind and Ship Safety",
      s4:"Wind results from air moving from high to low pressure, deflected by the Coriolis force. The steeper the pressure gradient over a short distance, the stronger the wind — shown by tightly packed isobars on a weather chart.\n\nPoor weather understanding can endanger the ship, crew, and cargo: excessive heel, structural damage, reduced visibility. Every crew member, regardless of rank, must recognize and report signs of deteriorating weather.",
      p5:"🎯 Exercise: The Barometer Drop",
      s5:"You are an AB on a cargo ship. The barometer drops from 1014 hPa to 1004 hPa within a few hours. The wind is gradually freshening.\n\nWhat observations should you make? What should you report? Why?",
      p6:"🧭 Case Study",
      p7:"A bulk carrier is sailing in the Bay of Biscay. Pressure drops rapidly. Forecasts announce a depression. The Master reduces speed and slightly alters course.\n\nWhy was this decision appropriate?",
      p8:"📋 15-Question Bank",
      p9:"💭 Remember: Common Mistakes",
      s9:"Believing only the captain should monitor weather. Thinking calm weather will remain stable. Ignoring a rapid pressure drop. Waiting to see rain before reporting deterioration.",
      sumT:"Summary — Lesson 1",
      sumP:["All weather forms in the troposphere","Pressure differences create wind","A rapid pressure drop often signals deterioration","Every seafarer observes the weather","Safety begins before the storm"],
      learnedP:["Atmospheric composition","Condensation mechanism","Reading atmospheric pressure","Origin of wind","Early warning signs of deterioration"],
      transition:"In the next lesson, you will learn to recognize clouds, fog, and the first visible signs of deteriorating weather.",
      safetyMsg:"The seafarer does not control the weather. He controls his decisions.",
      finalLabel:"KEY MESSAGE",
    },
    es:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Lección 1/7",
      title:"Fundamentos de meteorología marina",
      intro:"El clima no provoca los accidentes. Son las malas decisiones tomadas frente al clima las que los provocan. Esta lección no busca formar a un meteorólogo. Responde a una pregunta esencial: ¿por qué un marino debe comprender el clima incluso antes de aprender a leer una carta meteorológica?",
      p0:"EL MARINO NO CONTROLA EL CLIMA. CONTROLA SUS DECISIONES.",s0t:"Fundamentos de meteorología marina",
      s0:"Comprender la atmósfera, la presión y el viento para anticipar en lugar de sufrir.\n\nEsta lección sienta las bases científicas indispensables para toda decisión meteorológica en el mar.",
      p1:"La atmósfera: composición y estructura",
      s1:"La atmósfera terrestre está compuesta principalmente de nitrógeno (78%) y oxígeno (21%), con trazas de vapor de agua, CO2 y otros gases.\n\nLa capa que concierne directamente a la navegación es la troposfera, donde ocurren todos los fenómenos meteorológicos. Se extiende hasta unos 8-15 km según la latitud.",
      p2:"Temperatura, humedad y condensación",
      s2:"El aire cálido contiene más vapor de agua que el aire frío. Cuando el aire se enfría, alcanza su punto de rocío: el vapor de agua se condensa en gotas, formando niebla, nubes o precipitación.\n\nEste mecanismo es la base de toda previsión meteorológica.",
      p3:"Presión atmosférica",
      s3:"La presión atmosférica es el peso del aire por encima de un punto dado, medida en hectopascales (hPa). La presión normal a nivel del mar es de aproximadamente 1013 hPa.\n\nLas zonas de alta presión se asocian con tiempo estable, las de baja presión con tiempo inestable, ventoso y lluvioso.\n\nUna caída rápida del barómetro es a menudo uno de los primeros signos de deterioro meteorológico — un oficial de guardia atento siempre presta atención a ello.",
      p4:"El viento y la seguridad del buque",
      s4:"El viento resulta del movimiento del aire desde zonas de alta hacia baja presión, desviado por la fuerza de Coriolis. Cuanto más marcada la diferencia de presión en corta distancia, más fuerte el viento — indicado por isobaras muy juntas.\n\nUna mala comprensión meteorológica puede poner en peligro el buque, la tripulación y la carga: escora excesiva, daños estructurales, visibilidad reducida. Cada miembro de la tripulación debe reconocer e informar un deterioro meteorológico.",
      p5:"🎯 Ejercicio: la caída del barómetro",
      s5:"Eres marinero (AB) en un buque de carga. El barómetro pasa de 1014 hPa a 1004 hPa en pocas horas. El viento va refrescando progresivamente.\n\n¿Qué observaciones debes realizar? ¿Qué debes informar? ¿Por qué?",
      p6:"🧭 Estudio de caso",
      p7:"Un granelero navega en el golfo de Vizcaya. La presión cae rápidamente. Las previsiones anuncian una depresión. El capitán reduce la velocidad y modifica ligeramente la ruta.\n\n¿Por qué fue pertinente esta decisión?",
      p8:"📋 Banco de 15 preguntas",
      p9:"💭 Recuerda: errores frecuentes",
      s9:"Creer que solo el capitán debe vigilar el clima. Pensar que un clima tranquilo permanecerá estable. Ignorar una caída rápida de presión. Esperar a ver la lluvia antes de informar un deterioro.",
      sumT:"Resumen — Lección 1",
      sumP:["Todo el clima se forma en la troposfera","Las diferencias de presión crean el viento","Una caída rápida de presión a menudo anuncia un deterioro","Cada marino observa el clima","La seguridad empieza antes de la tormenta"],
      learnedP:["Composición de la atmósfera","Mecanismo de condensación","Lectura de la presión atmosférica","Origen del viento","Señales tempranas de deterioro"],
      transition:"En la próxima lección, aprenderás a reconocer las nubes, la niebla y los primeros signos visibles de un deterioro meteorológico.",
      safetyMsg:"El marino no controla el clima. Controla sus decisiones.",
      finalLabel:"MENSAJE CLAVE",
    },
    pt:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Lição 1/7",
      title:"Fundamentos de meteorologia marítima",
      intro:"O clima não provoca os acidentes. São as más decisões tomadas perante o clima que os provocam. Esta lição não pretende formar um meteorologista. Responde a uma pergunta essencial: por que razão um marítimo deve compreender o clima antes mesmo de aprender a ler uma carta meteorológica?",
      p0:"O MARÍTIMO NÃO CONTROLA O CLIMA. CONTROLA AS SUAS DECISÕES.",s0t:"Fundamentos de meteorologia marítima",
      s0:"Compreender a atmosfera, a pressão e o vento para antecipar em vez de sofrer.\n\nEsta lição estabelece as bases científicas indispensáveis para toda a decisão meteorológica no mar.",
      p1:"A atmosfera: composição e estrutura",
      s1:"A atmosfera terrestre é composta principalmente por azoto (78%) e oxigénio (21%), com vestígios de vapor de água, CO2 e outros gases.\n\nA camada diretamente relevante para a navegação é a troposfera, onde ocorrem todos os fenómenos meteorológicos. Estende-se até cerca de 8-15 km, dependendo da latitude.",
      p2:"Temperatura, humidade e condensação",
      s2:"O ar quente contém mais vapor de água do que o ar frio. Quando o ar arrefece, atinge o seu ponto de orvalho: o vapor de água condensa-se em gotículas, formando nevoeiro, nuvens ou precipitação.\n\nEste mecanismo é a base de toda a previsão meteorológica.",
      p3:"Pressão atmosférica",
      s3:"A pressão atmosférica é o peso do ar acima de um ponto dado, medida em hectopascais (hPa). A pressão normal ao nível do mar é de cerca de 1013 hPa.\n\nAs zonas de alta pressão estão associadas a tempo estável, as de baixa pressão a tempo instável, ventoso e chuvoso.\n\nUma queda rápida do barómetro é frequentemente um dos primeiros sinais de deterioração meteorológica — um oficial de quarto atento presta sempre atenção a isso.",
      p4:"O vento e a segurança do navio",
      s4:"O vento resulta do movimento do ar das zonas de alta para baixa pressão, desviado pela força de Coriolis. Quanto mais acentuada a diferença de pressão numa curta distância, mais forte o vento — indicado por isóbaras muito próximas.\n\nUma má compreensão meteorológica pode colocar em risco o navio, a tripulação e a carga: adornamento excessivo, danos estruturais, visibilidade reduzida. Cada membro da tripulação deve reconhecer e comunicar uma deterioração meteorológica.",
      p5:"🎯 Exercício: a queda do barómetro",
      s5:"És marinheiro (AB) num navio de carga. O barómetro passa de 1014 hPa para 1004 hPa em poucas horas. O vento vai refrescando progressivamente.\n\nQue observações deves efetuar? O que deves comunicar? Porquê?",
      p6:"🧭 Estudo de caso",
      p7:"Um graneleiro navega no golfo da Biscaia. A pressão cai rapidamente. As previsões anunciam uma depressão. O comandante reduz a velocidade e altera ligeiramente a rota.\n\nPor que razão esta decisão foi pertinente?",
      p8:"📋 Banco de 15 perguntas",
      p9:"💭 Lembrar: erros frequentes",
      s9:"Acreditar que só o comandante deve vigiar o clima. Pensar que um clima calmo permanecerá estável. Ignorar uma queda rápida de pressão. Esperar ver a chuva antes de comunicar uma deterioração.",
      sumT:"Resumo — Lição 1",
      sumP:["Todo o clima se forma na troposfera","As diferenças de pressão criam o vento","Uma queda rápida de pressão frequentemente anuncia uma deterioração","Cada marítimo observa o clima","A segurança começa antes da tempestade"],
      learnedP:["Composição da atmosfera","Mecanismo de condensação","Leitura da pressão atmosférica","Origem do vento","Sinais precoces de deterioração"],
      transition:"Na próxima lição, vais aprender a reconhecer as nuvens, o nevoeiro e os primeiros sinais visíveis de uma deterioração meteorológica.",
      safetyMsg:"O marítimo não controla o clima. Controla as suas decisões.",
      finalLabel:"MENSAGEM-CHAVE",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonMETEO_L1({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 1/7":lang==="en"?"Lesson 1/7":lang==="es"?"Lección 1/7":"Lição 1/7"}</div>
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

            <SL icon="🌦️" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🌦️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🌍" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>

            <SL icon="💧" text={lc.p2} color={C.teal}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>

            <SL icon="📊" text={lc.p3} color={C.orange}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>

            <SL icon="🌬️" text={lc.p4} color={C.red}/>
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
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 1/7":"questions · Lesson 1/7"}</div>
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
              {lang==="fr"?"LEÇON 2 - NUAGES & VISIBILITÉ →":lang==="en"?"LESSON 2 - CLOUDS & VISIBILITY →":lang==="es"?"LECCIÓN 2 - NUBES Y VISIBILIDAD →":"LIÇÃO 2 - NUVENS E VISIBILIDADE →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
