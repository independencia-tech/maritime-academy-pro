// @ts-nocheck
import { useState, useEffect } from "react";
import { C, T, Stars, Card, SL, QuizComp, QuestionBank } from "./LessonShared";

// LessonShared's T.module is hardcoded to Safety ("Sécurité"/"Safety"/...) — override per department.
const MODULE_LABEL = { fr:"Météorologie", en:"Meteorology", es:"Meteorología", pt:"Meteorologia" };

// No branching decisional-scenario pattern (choice → new context → reassessment → final result)
// found in Safety or Seamanship lessons — only single-click reveal patterns exist (e.g.
// LessonSafetyS2_L4.tsx's FallbackTreeSVG), which is not the same interaction. Per plan, the
// case study below is a static 4-step chronological text (Jour 1 à Jour 4), no clickable interface.

// BANK - 15 QUESTIONS
const BANK = {
  fr:[
    {q:"Que doit construire un officier à partir de l'observation, des instruments, des systèmes et des bulletins?",opts:["Une image mentale unique et cohérente de la situation","Une liste de mesures sans lien entre elles","Uniquement une carte synoptique","Rien, chaque source suffit isolément"],correct:0,expl:"C'est la synthèse complète qui permet une décision fiable."},
    {q:"Existe-t-il une route optimale dans l'absolu face au gros temps?",opts:["Non, seulement la plus sûre et la plus adaptée","Oui, toujours la même route","Oui, la plus rapide uniquement","Non, aucune règle ne s'applique"],correct:0,expl:"La route dépend des conditions et de la mission, jamais fixe."},
    {q:"Que rappelle cette leçon à propos de la stabilité du navire?",opts:["Un mauvais choix météo peut créer ou aggraver un problème de stabilité","Cette leçon enseigne la stabilité en détail","La stabilité n'a aucun lien avec la météo","La stabilité ne concerne que le Chief Engineer"],correct:0,expl:"Le lien est rappelé, sans développer la stabilité elle-même (module dédié futur)."},
    {q:"Quand doit commencer la préparation du navire face au gros temps?",opts:["Avant que les premières mauvaises conditions n'apparaissent","Pendant les mauvaises conditions","Après le passage du gros temps","Uniquement si le Master l'exige formellement"],correct:0,expl:"Une préparation tardive perd toute son efficacité."},
    {q:"Une prévision météo constitue-t-elle une certitude absolue?",opts:["Non, elle reste une probabilité","Oui, toujours exacte","Oui, sauf en cas de cyclone","Cela dépend uniquement du service météo"],correct:0,expl:"Le Master doit toujours garder à l'esprit cette incertitude inhérente."},
    {q:"Quelle combinaison d'indices justifierait le plus fortement un déroutement?",opts:["Trajectoire confirmée se rapprochant + observations locales concordantes","Une seule observation isolée sans confirmation","Un bulletin ancien non mis à jour","L'absence de tout bulletin récent"],correct:0,expl:"La convergence de plusieurs sources renforce la fiabilité de la décision."},
    {q:"Qui prend la décision finale face à un risque météo majeur?",opts:["Le Master","L'OOW seul systématiquement","Le service météo à terre","Aucune décision n'est nécessaire"],correct:0,expl:"La responsabilité finale incombe toujours au Master."},
    {q:"Pourquoi une décision de route déjà prise doit-elle être réévaluée?",opts:["De nouvelles informations peuvent modifier la situation","Une décision prise ne doit jamais changer","Réévaluer est une perte de temps","Seul le premier bulletin compte"],correct:0,expl:"La réévaluation continue est une compétence clé du module entier."},
    {q:"Que doit toujours primer sur le respect strict du planning commercial?",opts:["La sécurité du navire et de l'équipage","Le respect absolu des délais","Le confort de l'équipage uniquement","Rien, le planning prime toujours"],correct:0,expl:"Sacrifier la sécurité pour respecter un planning est une erreur grave."},
    {q:"Quelles compétences ce module a-t-il développées, dans l'ordre?",opts:["Comprendre, observer, mesurer, interpréter, reconnaître, exploiter, décider","Uniquement mesurer et décider","Décider avant de comprendre","Aucun ordre logique n'existe"],correct:0,expl:"C'est exactement la progression suivie depuis L1."},
    {q:"Un Chief Officer doit justifier son plan face à une dépression. Que doit-il citer?",opts:["Les informations issues des leçons précédentes L1 à L6","Uniquement son intuition personnelle","Le nom du navire uniquement","Aucune justification n'est nécessaire"],correct:0,expl:"Le raisonnement doit mobiliser explicitement tout ce qui a été appris."},
    {q:"Que révèle une trajectoire cyclonique qui change à chaque nouveau bulletin?",opts:["Les limites inhérentes à toute prévision","Une erreur systématique du service météo","Que le cyclone n'existe pas réellement","Que la trajectoire initiale était forcément fausse"],correct:0,expl:"Toute prévision évolue naturellement avec de nouvelles données, sans que ce soit une erreur."},
    {q:"Face à trois options (maintenir, dérouter, faire escale), que doit d'abord faire le Master?",opts:["Évaluer les conséquences de chaque option sur la sécurité","Choisir automatiquement l'option la plus rapide","Ignorer les conséquences commerciales","Attendre l'avis de l'armateur avant toute réflexion"],correct:0,expl:"La sécurité reste le critère prioritaire d'évaluation."},
    {q:"Quelle est l'erreur la plus grave qu'un officier puisse commettre en fin de parcours décisionnel?",opts:["Ne pas réévaluer sa décision face à une information nouvelle","Réévaluer trop souvent sa décision","Consulter plusieurs bulletins successifs","Impliquer l'équipage dans la préparation"],correct:0,expl:"S'enfermer dans une décision initiale malgré de nouvelles données est l'erreur la plus dangereuse."},
    {q:"Un Master reçoit 3 bulletins successifs sur 3 jours montrant une dépression qui se renforce et se rapproche. Quelle démarche est correcte?",opts:["Réévaluer la décision à chaque nouveau bulletin en croisant avec les observations","Ignorer les bulletins suivants une fois la première décision prise","Attendre le jour 4 sans surveiller l'évolution","Se fier uniquement au premier bulletin reçu"],correct:0,expl:"C'est la synthèse de tout le module : observer, croiser les sources, réévaluer en continu."},
  ],
  en:[
    {q:"What must an officer build from observation, instruments, systems, and bulletins?",opts:["A single coherent mental picture of the situation","A list of unrelated measurements","Only a synoptic chart","Nothing, each source is sufficient alone"],correct:0,expl:"A complete synthesis is what enables a reliable decision."},
    {q:"Does an absolute optimal route exist facing heavy weather?",opts:["No, only the safest and most suitable one","Yes, always the same route","Yes, only the fastest one","No, no rule applies"],correct:0,expl:"The route depends on conditions and mission, never fixed."},
    {q:"What does this lesson recall about ship stability?",opts:["A poor weather decision can create or worsen a stability problem","This lesson teaches stability in detail","Stability has no link to weather","Stability only concerns the Chief Engineer"],correct:0,expl:"The link is noted, without developing stability itself (future dedicated module)."},
    {q:"When should ship preparation for heavy weather begin?",opts:["Before the first bad conditions appear","During bad conditions","After heavy weather has passed","Only if the Master formally requires it"],correct:0,expl:"Late preparation loses all its effectiveness."},
    {q:"Does a weather forecast constitute an absolute certainty?",opts:["No, it remains a probability","Yes, always exact","Yes, except during a cyclone","It only depends on the weather service"],correct:0,expl:"The Master must always keep this inherent uncertainty in mind."},
    {q:"Which combination of indicators would most strongly justify diverting?",opts:["Confirmed approaching track + matching local observations","A single isolated observation without confirmation","An outdated, unrefreshed bulletin","The absence of any recent bulletin"],correct:0,expl:"Convergence of multiple sources strengthens decision reliability."},
    {q:"Who makes the final decision facing a major weather risk?",opts:["The Master","The OOW alone systematically","The shore weather service","No decision is necessary"],correct:0,expl:"Final responsibility always rests with the Master."},
    {q:"Why must an already-made route decision be reassessed?",opts:["New information may change the situation","A decision made should never change","Reassessing is a waste of time","Only the first bulletin matters"],correct:0,expl:"Continuous reassessment is a key skill of the entire module."},
    {q:"What must always take priority over strict commercial schedule adherence?",opts:["The safety of the ship and crew","Strict adherence to deadlines","Only crew comfort","Nothing, the schedule always prevails"],correct:0,expl:"Sacrificing safety to meet a schedule is a serious mistake."},
    {q:"What skills has this module developed, in order?",opts:["Understand, observe, measure, interpret, recognize, use, decide","Only measure and decide","Deciding before understanding","No logical order exists"],correct:0,expl:"This is exactly the progression followed since L1."},
    {q:"A Chief Officer must justify their plan facing a depression. What should they cite?",opts:["Information from previous lessons L1 to L6","Only their personal intuition","Only the ship's name","No justification is necessary"],correct:0,expl:"The reasoning must explicitly draw on everything learned."},
    {q:"What does a cyclone track changing with each new bulletin reveal?",opts:["The inherent limits of any forecast","A systematic error by the weather service","That the cyclone does not really exist","That the initial track was necessarily wrong"],correct:0,expl:"Every forecast naturally evolves with new data, without being an error."},
    {q:"Facing three options (maintain, divert, call at port), what must the Master do first?",opts:["Assess the safety consequences of each option","Automatically choose the fastest option","Ignore commercial consequences","Wait for owner approval before any thinking"],correct:0,expl:"Safety remains the priority evaluation criterion."},
    {q:"What is the most serious mistake an officer can make at the end of a decision process?",opts:["Not reassessing the decision when new information arrives","Reassessing the decision too often","Consulting several successive bulletins","Involving the crew in preparation"],correct:0,expl:"Locking into an initial decision despite new data is the most dangerous mistake."},
    {q:"A Master receives 3 successive bulletins over 3 days showing a strengthening, approaching depression. What is the correct approach?",opts:["Reassess the decision with each new bulletin, cross-checking with observations","Ignore subsequent bulletins once the first decision is made","Wait until day 4 without monitoring evolution","Rely only on the first bulletin received"],correct:0,expl:"This is the synthesis of the entire module: observe, cross-check sources, continuously reassess."},
  ],
  es:[
    {q:"¿Qué debe construir un oficial a partir de la observación, los instrumentos, los sistemas y los boletines?",opts:["Una imagen mental única y coherente de la situación","Una lista de mediciones sin relación entre ellas","Solo una carta sinóptica","Nada, cada fuente basta por sí sola"],correct:0,expl:"La síntesis completa es lo que permite una decisión fiable."},
    {q:"¿Existe una ruta óptima absoluta ante el mal tiempo?",opts:["No, solo la más segura y adaptada","Sí, siempre la misma ruta","Sí, solo la más rápida","No, ninguna regla se aplica"],correct:0,expl:"La ruta depende de las condiciones y la misión, nunca fija."},
    {q:"¿Qué recuerda esta lección sobre la estabilidad del buque?",opts:["Una mala decisión meteorológica puede crear o agravar un problema de estabilidad","Esta lección enseña la estabilidad en detalle","La estabilidad no tiene relación con el clima","La estabilidad solo concierne al Chief Engineer"],correct:0,expl:"Se recuerda el vínculo, sin desarrollar la estabilidad en sí (futuro módulo dedicado)."},
    {q:"¿Cuándo debe comenzar la preparación del buque ante el mal tiempo?",opts:["Antes de que aparezcan las primeras malas condiciones","Durante las malas condiciones","Después de pasar el mal tiempo","Solo si el Master lo exige formalmente"],correct:0,expl:"Una preparación tardía pierde toda su eficacia."},
    {q:"¿Una previsión meteorológica constituye una certeza absoluta?",opts:["No, sigue siendo una probabilidad","Sí, siempre exacta","Sí, excepto durante un ciclón","Depende solo del servicio meteorológico"],correct:0,expl:"El Master siempre debe tener presente esta incertidumbre inherente."},
    {q:"¿Qué combinación de indicios justificaría más fuertemente un desvío?",opts:["Trayectoria confirmada acercándose + observaciones locales concordantes","Una sola observación aislada sin confirmación","Un boletín antiguo no actualizado","La ausencia de cualquier boletín reciente"],correct:0,expl:"La convergencia de varias fuentes refuerza la fiabilidad de la decisión."},
    {q:"¿Quién toma la decisión final ante un riesgo meteorológico mayor?",opts:["El Master","El OOW solo sistemáticamente","El servicio meteorológico en tierra","No es necesaria ninguna decisión"],correct:0,expl:"La responsabilidad final siempre recae en el Master."},
    {q:"¿Por qué una decisión de ruta ya tomada debe reevaluarse?",opts:["Nueva información puede modificar la situación","Una decisión tomada nunca debe cambiar","Reevaluar es una pérdida de tiempo","Solo cuenta el primer boletín"],correct:0,expl:"La reevaluación continua es una competencia clave de todo el módulo."},
    {q:"¿Qué debe siempre primar sobre el cumplimiento estricto del calendario comercial?",opts:["La seguridad del buque y la tripulación","El cumplimiento absoluto de los plazos","Solo el confort de la tripulación","Nada, el calendario siempre prima"],correct:0,expl:"Sacrificar la seguridad para cumplir un calendario es un error grave."},
    {q:"¿Qué competencias ha desarrollado este módulo, en orden?",opts:["Comprender, observar, medir, interpretar, reconocer, utilizar, decidir","Solo medir y decidir","Decidir antes de comprender","No existe ningún orden lógico"],correct:0,expl:"Es exactamente la progresión seguida desde L1."},
    {q:"Un Chief Officer debe justificar su plan ante una depresión. ¿Qué debe citar?",opts:["La información de las lecciones anteriores L1 a L6","Solo su intuición personal","Solo el nombre del buque","No es necesaria ninguna justificación"],correct:0,expl:"El razonamiento debe movilizar explícitamente todo lo aprendido."},
    {q:"¿Qué revela una trayectoria ciclónica que cambia con cada nuevo boletín?",opts:["Los límites inherentes a toda previsión","Un error sistemático del servicio meteorológico","Que el ciclón no existe realmente","Que la trayectoria inicial era necesariamente errónea"],correct:0,expl:"Toda previsión evoluciona naturalmente con nuevos datos, sin que sea un error."},
    {q:"Ante tres opciones (mantener, desviar, hacer escala), ¿qué debe hacer primero el Master?",opts:["Evaluar las consecuencias de cada opción sobre la seguridad","Elegir automáticamente la opción más rápida","Ignorar las consecuencias comerciales","Esperar la opinión del armador antes de cualquier reflexión"],correct:0,expl:"La seguridad sigue siendo el criterio prioritario de evaluación."},
    {q:"¿Cuál es el error más grave que un oficial puede cometer al final de un proceso decisional?",opts:["No reevaluar la decisión ante nueva información","Reevaluar demasiado a menudo la decisión","Consultar varios boletines sucesivos","Implicar a la tripulación en la preparación"],correct:0,expl:"Encerrarse en una decisión inicial a pesar de nuevos datos es el error más peligroso."},
    {q:"Un Master recibe 3 boletines sucesivos en 3 días mostrando una depresión que se refuerza y se acerca. ¿Cuál es el enfoque correcto?",opts:["Reevaluar la decisión con cada nuevo boletín cruzando con las observaciones","Ignorar los boletines siguientes una vez tomada la primera decisión","Esperar al día 4 sin vigilar la evolución","Fiarse solo del primer boletín recibido"],correct:0,expl:"Es la síntesis de todo el módulo: observar, cruzar fuentes, reevaluar continuamente."},
  ],
  pt:[
    {q:"O que deve um oficial construir a partir da observação, dos instrumentos, dos sistemas e dos boletins?",opts:["Uma imagem mental única e coerente da situação","Uma lista de medições sem relação entre si","Apenas uma carta sinótica","Nada, cada fonte basta por si só"],correct:0,expl:"A síntese completa é o que permite uma decisão fiável."},
    {q:"Existe uma rota ótima absoluta perante o mau tempo?",opts:["Não, apenas a mais segura e adaptada","Sim, sempre a mesma rota","Sim, apenas a mais rápida","Não, nenhuma regra se aplica"],correct:0,expl:"A rota depende das condições e da missão, nunca fixa."},
    {q:"O que esta lição recorda sobre a estabilidade do navio?",opts:["Uma má decisão meteorológica pode criar ou agravar um problema de estabilidade","Esta lição ensina a estabilidade em detalhe","A estabilidade não tem relação com o clima","A estabilidade só diz respeito ao Chief Engineer"],correct:0,expl:"O vínculo é recordado, sem desenvolver a estabilidade em si (futuro módulo dedicado)."},
    {q:"Quando deve começar a preparação do navio perante o mau tempo?",opts:["Antes de aparecerem as primeiras más condições","Durante as más condições","Depois de passar o mau tempo","Apenas se o Master o exigir formalmente"],correct:0,expl:"Uma preparação tardia perde toda a sua eficácia."},
    {q:"Uma previsão meteorológica constitui uma certeza absoluta?",opts:["Não, continua a ser uma probabilidade","Sim, sempre exata","Sim, exceto durante um ciclone","Depende apenas do serviço meteorológico"],correct:0,expl:"O Master deve ter sempre presente esta incerteza inerente."},
    {q:"Que combinação de indícios justificaria mais fortemente um desvio?",opts:["Trajetória confirmada a aproximar-se + observações locais concordantes","Uma única observação isolada sem confirmação","Um boletim antigo não atualizado","A ausência de qualquer boletim recente"],correct:0,expl:"A convergência de várias fontes reforça a fiabilidade da decisão."},
    {q:"Quem toma a decisão final perante um risco meteorológico maior?",opts:["O Master","O OOW sozinho sistematicamente","O serviço meteorológico em terra","Nenhuma decisão é necessária"],correct:0,expl:"A responsabilidade final cabe sempre ao Master."},
    {q:"Por que uma decisão de rota já tomada deve ser reavaliada?",opts:["Nova informação pode modificar a situação","Uma decisão tomada nunca deve mudar","Reavaliar é uma perda de tempo","Só conta o primeiro boletim"],correct:0,expl:"A reavaliação contínua é uma competência chave de todo o módulo."},
    {q:"O que deve sempre prevalecer sobre o cumprimento estrito do calendário comercial?",opts:["A segurança do navio e da tripulação","O cumprimento absoluto dos prazos","Apenas o conforto da tripulação","Nada, o calendário prevalece sempre"],correct:0,expl:"Sacrificar a segurança para cumprir um calendário é um erro grave."},
    {q:"Que competências este módulo desenvolveu, por ordem?",opts:["Compreender, observar, medir, interpretar, reconhecer, utilizar, decidir","Apenas medir e decidir","Decidir antes de compreender","Não existe nenhuma ordem lógica"],correct:0,expl:"É exatamente a progressão seguida desde L1."},
    {q:"Um Chief Officer deve justificar o seu plano perante uma depressão. O que deve citar?",opts:["A informação das lições anteriores L1 a L6","Apenas a sua intuição pessoal","Apenas o nome do navio","Nenhuma justificação é necessária"],correct:0,expl:"O raciocínio deve mobilizar explicitamente tudo o que foi aprendido."},
    {q:"O que revela uma trajetória ciclónica que muda a cada novo boletim?",opts:["Os limites inerentes a toda previsão","Um erro sistemático do serviço meteorológico","Que o ciclone não existe realmente","Que a trajetória inicial era necessariamente errada"],correct:0,expl:"Toda previsão evolui naturalmente com novos dados, sem que seja um erro."},
    {q:"Perante três opções (manter, desviar, fazer escala), o que deve o Master fazer primeiro?",opts:["Avaliar as consequências de cada opção na segurança","Escolher automaticamente a opção mais rápida","Ignorar as consequências comerciais","Esperar pela opinião do armador antes de qualquer reflexão"],correct:0,expl:"A segurança continua a ser o critério prioritário de avaliação."},
    {q:"Qual é o erro mais grave que um oficial pode cometer no final de um processo decisional?",opts:["Não reavaliar a decisão perante nova informação","Reavaliar demasiadas vezes a decisão","Consultar vários boletins sucessivos","Envolver a tripulação na preparação"],correct:0,expl:"Fechar-se numa decisão inicial apesar de novos dados é o erro mais perigoso."},
    {q:"Um Master recebe 3 boletins sucessivos em 3 dias mostrando uma depressão que se reforça e se aproxima. Qual é a abordagem correta?",opts:["Reavaliar a decisão a cada novo boletim cruzando com as observações","Ignorar os boletins seguintes assim que a primeira decisão é tomada","Esperar pelo dia 4 sem vigiar a evolução","Confiar apenas no primeiro boletim recebido"],correct:0,expl:"É a síntese de todo o módulo: observar, cruzar fontes, reavaliar continuamente."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS) — reprend Q1, Q7, Q9, Q10, Q15 de la banque
const QUIZ = {
  fr:[BANK.fr[0], BANK.fr[6], BANK.fr[8], BANK.fr[9], BANK.fr[14]],
  en:[BANK.en[0], BANK.en[6], BANK.en[8], BANK.en[9], BANK.en[14]],
  es:[BANK.es[0], BANK.es[6], BANK.es[8], BANK.es[9], BANK.es[14]],
  pt:[BANK.pt[0], BANK.pt[6], BANK.pt[8], BANK.pt[9], BANK.pt[14]],
};

// TEXT CONTENT
const getContent = lang => {
  const d = {
    fr:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Leçon 7/7",
      title:"Routage météo et décisions par gros temps",
      intro:"Cette dernière leçon n'apporte aucune connaissance nouvelle. Elle réunit tout ce que vous avez appris depuis la première leçon : comprendre, observer, mesurer, interpréter, reconnaître les dangers et exploiter l'information. Votre cerveau ne doit plus apprendre un concept — il doit apprendre à raisonner.",
      p0:"AUCUNE ROUTE OPTIMALE N'EXISTE DANS L'ABSOLU. IL EXISTE SEULEMENT LA PLUS SÛRE.",s0t:"Routage météo et décisions par gros temps",
      s0:"Combiner l'ensemble des compétences acquises depuis L1 pour prendre une décision de navigation sûre et justifiée face au gros temps.",
      p1:"Construire la situation météorologique",
      s1:"Un officier rassemble simultanément l'observation visuelle (L2), les mesures instrumentales (L3), l'interprétation des systèmes (L4), la reconnaissance des phénomènes dangereux (L5), et les bulletins et sources d'information (L6).\n\nÀ partir de ces éléments combinés, il construit une image mentale unique et cohérente de la situation — pas une succession d'observations isolées, mais une synthèse complète.",
      p2:"Adaptation de la route et de la vitesse",
      s2:"Face à un système météo menaçant, l'officier dispose de plusieurs options : maintenir la route en réduisant la vitesse, modifier légèrement le cap, ou dérouter significativement.\n\nAucune route optimale n'existe dans l'absolu. Il existe seulement la route la plus sûre, la plus réaliste compte tenu des conditions, et la plus adaptée à la mission du navire.",
      p3:"Effets du vent et de la mer sur le navire",
      s3:"Le vent et la mer affectent directement le navire : gîte, tangage, roulis, risques de dommages structurels ou de déplacement de cargaison.\n\nCette leçon n'enseigne pas la stabilité du navire — cette compétence sera développée dans un futur module dédié. Elle rappelle uniquement qu'un mauvais choix météorologique peut créer ou aggraver un problème de stabilité, ce qui justifie une vigilance accrue avant toute décision de route.",
      p4:"Préparation du pont avant le gros temps",
      s4:"La préparation opérationnelle comprend : l'arrimage renforcé de la cargaison et du matériel, la vérification des fermetures étanches, et l'information de l'ensemble de l'équipage sur les conditions attendues.\n\nUne bonne préparation du navire commence toujours avant que les premières mauvaises conditions n'apparaissent — jamais pendant, et encore moins après. La décision finale reste toujours celle du Master, qui doit se rappeler qu'une prévision reste une probabilité, jamais une certitude absolue.",
      p5:"🎯 Exercice : construire un plan complet",
      s5:"Vous êtes Chief Officer. Vous recevez un bulletin annonçant une dépression sur votre route prévue dans 36 heures.\n\nProposez un plan complet incluant : votre évaluation de la situation, votre décision de route et de vitesse, et vos mesures de préparation du pont. Justifiez chaque décision en citant explicitement les informations issues des leçons L1 à L6.",
      p6:"🧭 Étude de cas — Le Master face à une dépression qui se renforce",
      p7:"Jour 1 : Un navire en transit océanique reçoit un premier bulletin annonçant une dépression modérée à 4 jours de route, sans changement de plan immédiat requis.\n\nJour 2 : Un nouveau bulletin indique que le système s'aggrave et que sa trajectoire s'est légèrement décalée vers la route du navire. Le Master commence à évaluer des options de déroutement.\n\nJour 3 : Un troisième bulletin confirme une trajectoire encore modifiée, désormais plus proche de la route initiale. Les observations à bord (pression en baisse, mer qui se creuse) confirment la tendance annoncée.\n\nJour 4 : Le Master doit choisir entre trois options : maintenir la route en réduisant fortement la vitesse, dérouter significativement au prix d'un délai important, ou faire escale préventive dans un port refuge proche.\n\nQuelle information de chacune des leçons précédentes (L1 à L6) intervient dans cette décision finale ? Quelle option choisiriez-vous, et pourquoi ?",
      p8:"📋 Banque de 15 questions",
      p9:"💭 À retenir : les erreurs fréquentes",
      s9:"Décider sur une seule information isolée plutôt que sur une synthèse complète. Sous-estimer l'incertitude inhérente à toute prévision. Privilégier le respect du planning commercial au détriment de la sécurité. Ne pas réévaluer une décision déjà prise face à une nouvelle information.",
      sumT:"Ce que doit désormais savoir faire un officier",
      sumP:["Observer les signes visibles d'évolution météo","Mesurer avec les instruments et vérifier leur fiabilité","Interpréter les systèmes de pression et les fronts","Reconnaître les phénomènes dangereux","Exploiter et croiser les sources d'information","Préparer le navire avant que les conditions ne se dégradent","Décider, puis réévaluer en continu"],
      learnedP:["Synthèse de l'ensemble des compétences météo du module","Construction d'une décision de route justifiée","Anticipation des effets du gros temps sur le navire","Rôle et limites de la décision du Master"],
      transition:"Vous avez terminé le module Marine Meteorology. Les compétences acquises dans ces sept leçons constituent la base de toute décision météorologique à la passerelle. Elles seront désormais mobilisées dans les autres modules du Deck Department ainsi que dans les formations de Specialized Operations.",
      safetyMsg:"Aucune route optimale n'existe dans l'absolu. Il existe seulement la plus sûre.",
      finalLabel:"MESSAGE CLÉ",
    },
    en:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Lesson 7/7",
      title:"Weather Routing and Heavy Weather Decision Making",
      intro:"This final lesson brings no new knowledge. It brings together everything you have learned since the first lesson: understanding, observing, measuring, interpreting, recognizing danger, and using information. Your mind no longer needs to learn a concept — it needs to learn to reason.",
      p0:"NO OPTIMAL ROUTE EXISTS IN ABSOLUTE TERMS. ONLY THE SAFEST ONE EXISTS.",s0t:"Weather Routing and Heavy Weather Decisions",
      s0:"Combining all skills acquired since L1 to make a safe, justified navigation decision facing heavy weather.",
      p1:"Building the Weather Picture",
      s1:"An officer simultaneously gathers visual observation (L2), instrumental measurements (L3), system interpretation (L4), recognition of dangerous phenomena (L5), and bulletins and information sources (L6).\n\nFrom these combined elements, they build a single, coherent mental picture of the situation — not a series of isolated observations, but a complete synthesis.",
      p2:"Adapting Route and Speed",
      s2:"Facing a threatening weather system, an officer has several options: maintaining course while reducing speed, slightly altering course, or significantly diverting.\n\nNo optimal route exists in absolute terms. There is only the safest route, the most realistic given conditions, and the most suited to the ship's mission.",
      p3:"Effects of Wind and Sea on the Ship",
      s3:"Wind and sea directly affect the ship: heel, pitching, rolling, risks of structural damage or cargo shift.\n\nThis lesson does not teach ship stability — that skill will be developed in a future dedicated module. It only reminds you that a poor weather decision can create or worsen a stability problem, which justifies heightened vigilance before any route decision.",
      p4:"Deck Preparation Before Heavy Weather",
      s4:"Operational preparation includes: reinforced securing of cargo and equipment, checking watertight closures, and informing the entire crew about expected conditions.\n\nGood ship preparation always begins before the first bad conditions appear — never during, and even less after. The final decision always remains the Master's, who must remember that a forecast remains a probability, never an absolute certainty.",
      p5:"🎯 Exercise: Building a Complete Plan",
      s5:"You are Chief Officer. You receive a bulletin announcing a depression on your planned route in 36 hours.\n\nPropose a complete plan including: your assessment of the situation, your route and speed decision, and your deck preparation measures. Justify each decision by explicitly citing information from lessons L1 to L6.",
      p6:"🧭 Case Study — The Master Facing a Strengthening Depression",
      p7:"Day 1: A ship on ocean transit receives a first bulletin announcing a moderate depression 4 days along the route, requiring no immediate change of plan.\n\nDay 2: A new bulletin indicates the system is strengthening and its track has shifted slightly toward the ship's route. The Master begins assessing diversion options.\n\nDay 3: A third bulletin confirms a further modified track, now closer to the initial route. Onboard observations (dropping pressure, building sea) confirm the announced trend.\n\nDay 4: The Master must choose between three options: maintain course while significantly reducing speed, divert significantly at the cost of a major delay, or make a preventive call at a nearby port of refuge.\n\nWhat information from each previous lesson (L1 to L6) factors into this final decision? Which option would you choose, and why?",
      p8:"📋 15-Question Bank",
      p9:"💭 Remember: Common Mistakes",
      s9:"Deciding based on a single isolated piece of information rather than a complete synthesis. Underestimating the inherent uncertainty of any forecast. Prioritizing commercial schedule over safety. Not reassessing an already-made decision when new information arrives.",
      sumT:"What an Officer Must Now Be Able to Do",
      sumP:["Observe visible signs of weather evolution","Measure with instruments and verify their reliability","Interpret pressure systems and fronts","Recognize dangerous phenomena","Use and cross-check information sources","Prepare the ship before conditions deteriorate","Decide, then continuously reassess"],
      learnedP:["Synthesis of all weather skills from the module","Building a justified route decision","Anticipating heavy weather effects on the ship","The Master's role and limits in decision-making"],
      transition:"You have completed the Marine Meteorology module. The skills acquired across these seven lessons form the foundation of every weather-related decision on the bridge. They will now be applied across the other Deck Department modules and within Specialized Operations training.",
      safetyMsg:"No optimal route exists in absolute terms. Only the safest one exists.",
      finalLabel:"KEY MESSAGE",
    },
    es:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Lección 7/7",
      title:"Ruteo meteorológico y decisiones en mal tiempo",
      intro:"Esta última lección no aporta ningún conocimiento nuevo. Reúne todo lo que has aprendido desde la primera lección: comprender, observar, medir, interpretar, reconocer los peligros y utilizar la información. Tu mente ya no debe aprender un concepto — debe aprender a razonar.",
      p0:"NINGUNA RUTA ÓPTIMA EXISTE EN ABSOLUTO. SOLO EXISTE LA MÁS SEGURA.",s0t:"Ruteo meteorológico y decisiones en mal tiempo",
      s0:"Combinar todas las competencias adquiridas desde L1 para tomar una decisión de navegación segura y justificada frente al mal tiempo.",
      p1:"Construir la situación meteorológica",
      s1:"Un oficial reúne simultáneamente la observación visual (L2), las mediciones instrumentales (L3), la interpretación de los sistemas (L4), el reconocimiento de fenómenos peligrosos (L5), y los boletines y fuentes de información (L6).\n\nA partir de estos elementos combinados, construye una imagen mental única y coherente de la situación — no una sucesión de observaciones aisladas, sino una síntesis completa.",
      p2:"Adaptación de la ruta y la velocidad",
      s2:"Ante un sistema meteorológico amenazante, el oficial dispone de varias opciones: mantener el rumbo reduciendo la velocidad, modificar ligeramente el rumbo, o desviarse significativamente.\n\nNinguna ruta óptima existe en absoluto. Solo existe la ruta más segura, la más realista según las condiciones, y la más adaptada a la misión del buque.",
      p3:"Efectos del viento y del mar sobre el buque",
      s3:"El viento y el mar afectan directamente al buque: escora, cabeceo, balanceo, riesgos de daños estructurales o desplazamiento de carga.\n\nEsta lección no enseña la estabilidad del buque — esa competencia se desarrollará en un futuro módulo dedicado. Solo recuerda que una mala decisión meteorológica puede crear o agravar un problema de estabilidad, lo que justifica una vigilancia reforzada antes de cualquier decisión de ruta.",
      p4:"Preparación de cubierta antes del mal tiempo",
      s4:"La preparación operativa incluye: el estibado reforzado de la carga y el material, la verificación de los cierres estancos, y la información a toda la tripulación sobre las condiciones esperadas.\n\nUna buena preparación del buque siempre comienza antes de que aparezcan las primeras malas condiciones — nunca durante, y menos aún después. La decisión final siempre sigue siendo del Master, quien debe recordar que una previsión sigue siendo una probabilidad, nunca una certeza absoluta.",
      p5:"🎯 Ejercicio: construir un plan completo",
      s5:"Eres Chief Officer. Recibes un boletín que anuncia una depresión en tu ruta prevista dentro de 36 horas.\n\nPropón un plan completo que incluya: tu evaluación de la situación, tu decisión de ruta y velocidad, y tus medidas de preparación de cubierta. Justifica cada decisión citando explícitamente información de las lecciones L1 a L6.",
      p6:"🧭 Estudio de caso — El Master ante una depresión que se refuerza",
      p7:"Día 1: Un buque en tránsito oceánico recibe un primer boletín que anuncia una depresión moderada a 4 días de ruta, sin requerir cambio inmediato de plan.\n\nDía 2: Un nuevo boletín indica que el sistema se refuerza y su trayectoria se ha desviado ligeramente hacia la ruta del buque. El Master comienza a evaluar opciones de desvío.\n\nDía 3: Un tercer boletín confirma una trayectoria aún más modificada, ahora más cercana a la ruta inicial. Las observaciones a bordo (presión bajando, mar aumentando) confirman la tendencia anunciada.\n\nDía 4: El Master debe elegir entre tres opciones: mantener el rumbo reduciendo fuertemente la velocidad, desviarse significativamente al precio de un retraso importante, o hacer escala preventiva en un puerto refugio cercano.\n\n¿Qué información de cada lección anterior (L1 a L6) interviene en esta decisión final? ¿Qué opción elegirías, y por qué?",
      p8:"📋 Banco de 15 preguntas",
      p9:"💭 Recuerda: errores frecuentes",
      s9:"Decidir basándose en una sola información aislada en lugar de una síntesis completa. Subestimar la incertidumbre inherente a toda previsión. Priorizar el cumplimiento del calendario comercial en detrimento de la seguridad. No reevaluar una decisión ya tomada ante nueva información.",
      sumT:"Lo que un oficial debe saber hacer ahora",
      sumP:["Observar los signos visibles de evolución meteorológica","Medir con los instrumentos y verificar su fiabilidad","Interpretar los sistemas de presión y los frentes","Reconocer los fenómenos peligrosos","Utilizar y cruzar las fuentes de información","Preparar el buque antes de que las condiciones se degraden","Decidir, y luego reevaluar continuamente"],
      learnedP:["Síntesis de todas las competencias meteorológicas del módulo","Construcción de una decisión de ruta justificada","Anticipación de los efectos del mal tiempo en el buque","Rol y límites de la decisión del Master"],
      transition:"Has completado el módulo de Meteorología Marina. Las competencias adquiridas en estas siete lecciones constituyen la base de toda decisión meteorológica en el puente. Serán ahora movilizadas en los demás módulos del Deck Department así como en las formaciones de Specialized Operations.",
      safetyMsg:"Ninguna ruta óptima existe en absoluto. Solo existe la más segura.",
      finalLabel:"MENSAJE CLAVE",
    },
    pt:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Lição 7/7",
      title:"Rota meteorológica e decisões em mau tempo",
      intro:"Esta última lição não traz nenhum conhecimento novo. Reúne tudo o que aprendeste desde a primeira lição: compreender, observar, medir, interpretar, reconhecer os perigos e utilizar a informação. A tua mente já não precisa de aprender um conceito — precisa de aprender a raciocinar.",
      p0:"NENHUMA ROTA ÓTIMA EXISTE EM ABSOLUTO. SÓ EXISTE A MAIS SEGURA.",s0t:"Rota meteorológica e decisões em mau tempo",
      s0:"Combinar todas as competências adquiridas desde L1 para tomar uma decisão de navegação segura e justificada perante o mau tempo.",
      p1:"Construir a situação meteorológica",
      s1:"Um oficial reúne simultaneamente a observação visual (L2), as medições instrumentais (L3), a interpretação dos sistemas (L4), o reconhecimento de fenómenos perigosos (L5), e os boletins e fontes de informação (L6).\n\nA partir destes elementos combinados, constrói uma imagem mental única e coerente da situação — não uma sucessão de observações isoladas, mas uma síntese completa.",
      p2:"Adaptação da rota e da velocidade",
      s2:"Perante um sistema meteorológico ameaçador, o oficial dispõe de várias opções: manter o rumo reduzindo a velocidade, alterar ligeiramente o rumo, ou desviar-se significativamente.\n\nNenhuma rota ótima existe em absoluto. Só existe a rota mais segura, a mais realista tendo em conta as condições, e a mais adaptada à missão do navio.",
      p3:"Efeitos do vento e do mar sobre o navio",
      s3:"O vento e o mar afetam diretamente o navio: adornamento, arfagem, balanço, riscos de danos estruturais ou deslocamento de carga.\n\nEsta lição não ensina a estabilidade do navio — essa competência será desenvolvida num futuro módulo dedicado. Recorda apenas que uma má decisão meteorológica pode criar ou agravar um problema de estabilidade, o que justifica uma vigilância reforçada antes de qualquer decisão de rota.",
      p4:"Preparação do convés antes do mau tempo",
      s4:"A preparação operacional inclui: a estivagem reforçada da carga e do material, a verificação dos fechos estanques, e a informação a toda a tripulação sobre as condições esperadas.\n\nUma boa preparação do navio começa sempre antes de aparecerem as primeiras más condições — nunca durante, e ainda menos depois. A decisão final permanece sempre do Master, que deve recordar que uma previsão continua a ser uma probabilidade, nunca uma certeza absoluta.",
      p5:"🎯 Exercício: construir um plano completo",
      s5:"És Chief Officer. Recebes um boletim que anuncia uma depressão na tua rota prevista dentro de 36 horas.\n\nPropõe um plano completo incluindo: a tua avaliação da situação, a tua decisão de rota e velocidade, e as tuas medidas de preparação do convés. Justifica cada decisão citando explicitamente informação das lições L1 a L6.",
      p6:"🧭 Estudo de caso — O Master perante uma depressão que se reforça",
      p7:"Dia 1: Um navio em trânsito oceânico recebe um primeiro boletim que anuncia uma depressão moderada a 4 dias de rota, sem exigir mudança imediata de plano.\n\nDia 2: Um novo boletim indica que o sistema se reforça e a sua trajetória se desviou ligeiramente para a rota do navio. O Master começa a avaliar opções de desvio.\n\nDia 3: Um terceiro boletim confirma uma trajetória ainda mais modificada, agora mais próxima da rota inicial. As observações a bordo (pressão a descer, mar a aumentar) confirmam a tendência anunciada.\n\nDia 4: O Master deve escolher entre três opções: manter o rumo reduzindo fortemente a velocidade, desviar-se significativamente ao custo de um atraso importante, ou fazer escala preventiva num porto de refúgio próximo.\n\nQue informação de cada lição anterior (L1 a L6) intervém nesta decisão final? Que opção escolherias, e porquê?",
      p8:"📋 Banco de 15 perguntas",
      p9:"💭 Lembrar: erros frequentes",
      s9:"Decidir com base numa única informação isolada em vez de uma síntese completa. Subestimar a incerteza inerente a toda previsão. Priorizar o cumprimento do calendário comercial em detrimento da segurança. Não reavaliar uma decisão já tomada perante nova informação.",
      sumT:"O que um oficial deve agora saber fazer",
      sumP:["Observar os sinais visíveis de evolução meteorológica","Medir com os instrumentos e verificar a sua fiabilidade","Interpretar os sistemas de pressão e as frentes","Reconhecer os fenómenos perigosos","Utilizar e cruzar as fontes de informação","Preparar o navio antes de as condições se degradarem","Decidir, e depois reavaliar continuamente"],
      learnedP:["Síntese de todas as competências meteorológicas do módulo","Construção de uma decisão de rota justificada","Antecipação dos efeitos do mau tempo no navio","Papel e limites da decisão do Master"],
      transition:"Concluíste o módulo de Meteorologia Marítima. As competências adquiridas nestas sete lições constituem a base de toda decisão meteorológica no passadiço. Serão agora mobilizadas nos outros módulos do Deck Department, bem como nas formações de Specialized Operations.",
      safetyMsg:"Nenhuma rota ótima existe em absoluto. Só existe a mais segura.",
      finalLabel:"MENSAGEM-CHAVE",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonMETEO_L7({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 7/7":lang==="en"?"Lesson 7/7":lang==="es"?"Lección 7/7":"Lição 7/7"}</div>
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

            <SL icon="🧭" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧭</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🧩" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>

            <SL icon="🚢" text={lc.p2} color={C.teal}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>

            <SL icon="⚖️" text={lc.p3} color={C.orange}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>

            <SL icon="🛠️" text={lc.p4} color={C.red}/>
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
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 7/7":"questions · Lesson 7/7"}</div>
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
              {lang==="fr"?"MODULE TERMINÉ →":lang==="en"?"MODULE COMPLETE →":lang==="es"?"MÓDULO COMPLETADO →":"MÓDULO CONCLUÍDO →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
