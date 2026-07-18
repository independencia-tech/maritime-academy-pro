// @ts-nocheck
import { useState, useEffect } from "react";
import { C, T, Stars, Card, SL, QuizComp, QuestionBank } from "./LessonShared";

// LessonShared's T.module is hardcoded to Safety ("Sécurité"/"Safety"/...) — override per department.
const MODULE_LABEL = { fr:"Météorologie", en:"Meteorology", es:"Meteorología", pt:"Meteorologia" };

// No document-mockup SVG pattern (NAVTEX printout, synoptic chart facsimile) found in Safety or
// Seamanship lessons — this lesson uses clear textual presentation only, no visual mockup.

// BANK - 15 QUESTIONS
const BANK = {
  fr:[
    {q:"Quel est l'objectif principal de lire une carte synoptique?",opts:["Identifier rapidement les informations utiles à la navigation","Apprendre à construire une carte météo","Remplacer totalement les bulletins","Mesurer directement la température de l'air"],correct:0,expl:"L'objectif est opérationnel, pas la construction de cartes."},
    {q:"Qu'indique un avertissement dans un bulletin météo?",opts:["Un danger immédiat","Une tendance générale sur plusieurs jours","Une simple observation historique","Une absence de risque"],correct:0,expl:"L'avertissement signale un danger immédiat à prendre en compte sans délai."},
    {q:"Quelle est la différence entre prévision générale et prévision locale?",opts:["La prévision locale est plus précise sur une zone réduite","Elles sont toujours identiques","La prévision générale est toujours plus fiable","La prévision locale ne concerne jamais la mer"],correct:0,expl:"La prévision locale affine l'information sur une zone plus restreinte."},
    {q:"Qu'est-ce que NAVTEX?",opts:["Un moyen de diffusion de messages de sécurité par texte","Une zone géographique","Un type de nuage","Un instrument de mesure"],correct:0,expl:"NAVTEX diffuse automatiquement des messages dans sa zone de couverture."},
    {q:"Qu'est-ce que SafetyNET?",opts:["Un service de diffusion satellitaire","Une zone géographique météorologique","Un instrument de mesure de vent","Un type de front météorologique"],correct:0,expl:"SafetyNET complète NAVTEX dans les zones non couvertes."},
    {q:"Qu'est-ce qu'une METAREA?",opts:["Une zone géographique de responsabilité météorologique","Un moyen de diffusion par satellite","Un type de nuage dangereux","Un instrument embarqué"],correct:0,expl:"Chaque METAREA est gérée par un service météorologique national désigné."},
    {q:"Pourquoi ne faut-il jamais utiliser une seule source d'information météo?",opts:["Chaque source peut être incomplète ou en décalage avec la réalité","Toutes les sources donnent toujours la même information","Une seule source suffit toujours en mer","Cela n'a aucune importance pratique"],correct:0,expl:"Croiser les sources permet de détecter les écarts et incohérences."},
    {q:"Que doit toujours primer sur une impression subjective de calme apparent?",opts:["Un avertissement officiel","Le ressenti personnel de l'officier","Une prévision ancienne non mise à jour","Rien, l'observation prime toujours"],correct:0,expl:"Un avertissement officiel signale un danger confirmé, à ne jamais ignorer."},
    {q:"Un bulletin reçu plusieurs heures auparavant reste-t-il automatiquement valable?",opts:["Non, il faut vérifier l'existence d'une mise à jour","Oui, toujours","Cela dépend uniquement de la météo du jour","Un bulletin n'expire jamais"],correct:0,expl:"Une mise à jour peut modifier significativement l'information initiale."},
    {q:"Quel est l'ordre logique d'utilisation des informations météo à bord?",opts:["Observation, prévision, avertissement officiel — tous croisés en continu","Uniquement la prévision, ignorer le reste","Uniquement l'observation, ignorer les bulletins","Un ordre unique et figé sans jamais revenir en arrière"],correct:0,expl:"Les trois niveaux se croisent en continu, pas dans un ordre figé unique."},
    {q:"À quelle fréquence les bulletins météo doivent-ils être vérifiés?",opts:["Régulièrement, en tenant compte des mises à jour disponibles","Une seule fois par traversée","Uniquement au départ du port","Jamais, une seule lecture suffit"],correct:0,expl:"Les bulletins évoluent, une vérification régulière est indispensable."},
    {q:"Quelle information un OOW doit-il comparer à un bulletin NAVTEX reçu?",opts:["Les observations locales à bord","Uniquement la date de réception","Le nom du navire","Aucune comparaison n'est nécessaire"],correct:0,expl:"Confronter le bulletin à la réalité observée permet de détecter un écart."},
    {q:"Face à un écart entre prévision ancienne et nouveau bulletin, quelle information prime?",opts:["Le nouveau bulletin et les observations récentes","Toujours la prévision la plus ancienne","Aucune des deux, il faut ignorer les deux","Le nom du service météo uniquement"],correct:0,expl:"L'information la plus récente et confirmée par l'observation doit primer."},
    {q:"Quelle est une erreur fréquente concernant les bulletins météo?",opts:["Croire qu'un bulletin ancien reste valable sans vérification","Vérifier régulièrement les mises à jour","Comparer le bulletin à l'observation locale","Distinguer avertissement et prévision générale"],correct:0,expl:"C'est une erreur fréquente qui peut mener à une décision basée sur une information périmée."},
    {q:"Un navire suit une prévision à 4 jours ; au jour 3, les observations diffèrent fortement et un nouveau bulletin arrive. Que doit faire l'équipage?",opts:["Prioriser le nouveau bulletin et les observations récentes","Continuer selon la prévision initiale sans changement","Ignorer le nouveau bulletin par prudence","Attendre la fin du voyage pour réagir"],correct:0,expl:"L'information la plus récente et confirmée doit guider la décision."},
  ],
  en:[
    {q:"What is the main goal of reading a synoptic chart?",opts:["Quickly identify navigation-relevant information","Learn to build a weather chart","Fully replace bulletins","Directly measure air temperature"],correct:0,expl:"The goal is operational, not chart construction."},
    {q:"What does a warning indicate in a weather bulletin?",opts:["Immediate danger","A general trend over several days","A simple historical observation","Absence of risk"],correct:0,expl:"A warning signals immediate danger to be considered without delay."},
    {q:"What is the difference between general and local forecast?",opts:["Local forecast is more precise over a smaller area","They are always identical","General forecast is always more reliable","Local forecast never concerns the sea"],correct:0,expl:"Local forecast refines information over a smaller area."},
    {q:"What is NAVTEX?",opts:["A means of broadcasting safety messages by text","A geographic area","A type of cloud","A measuring instrument"],correct:0,expl:"NAVTEX automatically broadcasts messages within its coverage area."},
    {q:"What is SafetyNET?",opts:["A satellite broadcast service","A meteorological geographic area","A wind measuring instrument","A type of weather front"],correct:0,expl:"SafetyNET complements NAVTEX in uncovered areas."},
    {q:"What is a METAREA?",opts:["A geographic area of meteorological responsibility","A satellite broadcast means","A dangerous cloud type","An onboard instrument"],correct:0,expl:"Each METAREA is managed by a designated national weather service."},
    {q:"Why should a single weather information source never be used alone?",opts:["Each source may be incomplete or out of step with reality","All sources always give the same information","A single source is always sufficient at sea","It has no practical importance"],correct:0,expl:"Cross-checking sources helps detect gaps and inconsistencies."},
    {q:"What must always take priority over a subjective impression of apparent calm?",opts:["An official warning","The officer's personal feeling","An outdated forecast","Nothing, observation always prevails"],correct:0,expl:"An official warning signals a confirmed danger, never to be ignored."},
    {q:"Does a bulletin received several hours ago automatically remain valid?",opts:["No, an update must be checked","Yes, always","It only depends on the day's weather","A bulletin never expires"],correct:0,expl:"An update can significantly change the initial information."},
    {q:"What is the logical order of using weather information on board?",opts:["Observation, forecast, official warning — all continuously cross-checked","Only forecast, ignore the rest","Only observation, ignore bulletins","A single fixed order, never revisited"],correct:0,expl:"The three levels are continuously cross-checked, not in a single fixed order."},
    {q:"How often should weather bulletins be checked?",opts:["Regularly, taking available updates into account","Only once per voyage","Only when leaving port","Never, a single reading is enough"],correct:0,expl:"Bulletins evolve, regular checking is essential."},
    {q:"What information should an OOW compare with a received NAVTEX bulletin?",opts:["Local observations on board","Only the reception date","The ship's name","No comparison is necessary"],correct:0,expl:"Comparing the bulletin to observed reality helps detect a discrepancy."},
    {q:"Facing a discrepancy between an old forecast and a new bulletin, which information takes priority?",opts:["The new bulletin and recent observations","Always the oldest forecast","Neither, both should be ignored","Only the weather service's name"],correct:0,expl:"The most recent information, confirmed by observation, should take priority."},
    {q:"What is a common mistake regarding weather bulletins?",opts:["Believing an old bulletin remains valid without checking","Regularly checking for updates","Comparing the bulletin to local observation","Distinguishing warning from general forecast"],correct:0,expl:"This common mistake can lead to a decision based on outdated information."},
    {q:"A ship follows a 4-day forecast; on day 3, observations differ greatly and a new bulletin arrives. What should the crew do?",opts:["Prioritize the new bulletin and recent observations","Continue per the initial forecast unchanged","Ignore the new bulletin out of caution","Wait until the voyage ends to react"],correct:0,expl:"The most recent, confirmed information should guide the decision."},
  ],
  es:[
    {q:"¿Cuál es el objetivo principal de leer una carta sinóptica?",opts:["Identificar rápidamente la información útil para la navegación","Aprender a construir una carta meteorológica","Reemplazar totalmente los boletines","Medir directamente la temperatura del aire"],correct:0,expl:"El objetivo es operativo, no la construcción de cartas."},
    {q:"¿Qué indica un aviso en un boletín meteorológico?",opts:["Un peligro inmediato","Una tendencia general de varios días","Una simple observación histórica","Ausencia de riesgo"],correct:0,expl:"El aviso señala un peligro inmediato a tener en cuenta sin demora."},
    {q:"¿Cuál es la diferencia entre previsión general y previsión local?",opts:["La previsión local es más precisa en una zona reducida","Siempre son idénticas","La previsión general siempre es más fiable","La previsión local nunca concierne al mar"],correct:0,expl:"La previsión local afina la información en una zona más reducida."},
    {q:"¿Qué es NAVTEX?",opts:["Un medio de difusión de mensajes de seguridad por texto","Una zona geográfica","Un tipo de nube","Un instrumento de medición"],correct:0,expl:"NAVTEX difunde automáticamente mensajes en su zona de cobertura."},
    {q:"¿Qué es SafetyNET?",opts:["Un servicio de difusión satelital","Una zona geográfica meteorológica","Un instrumento de medición del viento","Un tipo de frente meteorológico"],correct:0,expl:"SafetyNET complementa a NAVTEX en zonas no cubiertas."},
    {q:"¿Qué es una METAREA?",opts:["Una zona geográfica de responsabilidad meteorológica","Un medio de difusión por satélite","Un tipo de nube peligrosa","Un instrumento a bordo"],correct:0,expl:"Cada METAREA es gestionada por un servicio meteorológico nacional designado."},
    {q:"¿Por qué nunca hay que usar una sola fuente de información meteorológica?",opts:["Cada fuente puede ser incompleta o estar desfasada con la realidad","Todas las fuentes siempre dan la misma información","Una sola fuente siempre es suficiente en el mar","No tiene ninguna importancia práctica"],correct:0,expl:"Cruzar las fuentes permite detectar discrepancias e incoherencias."},
    {q:"¿Qué debe siempre primar sobre una impresión subjetiva de calma aparente?",opts:["Un aviso oficial","La sensación personal del oficial","Una previsión antigua no actualizada","Nada, la observación siempre prima"],correct:0,expl:"Un aviso oficial señala un peligro confirmado, que nunca debe ignorarse."},
    {q:"¿Un boletín recibido hace varias horas sigue siendo válido automáticamente?",opts:["No, hay que verificar si existe una actualización","Sí, siempre","Depende solo del clima del día","Un boletín nunca caduca"],correct:0,expl:"Una actualización puede modificar significativamente la información inicial."},
    {q:"¿Cuál es el orden lógico de uso de la información meteorológica a bordo?",opts:["Observación, previsión, aviso oficial — todos cruzados continuamente","Solo la previsión, ignorar el resto","Solo la observación, ignorar los boletines","Un orden único y fijo sin volver nunca atrás"],correct:0,expl:"Los tres niveles se cruzan continuamente, no en un orden único fijo."},
    {q:"¿Con qué frecuencia deben verificarse los boletines meteorológicos?",opts:["Regularmente, teniendo en cuenta las actualizaciones disponibles","Solo una vez por travesía","Solo al salir del puerto","Nunca, una sola lectura basta"],correct:0,expl:"Los boletines evolucionan, una verificación regular es indispensable."},
    {q:"¿Qué información debe comparar un OOW con un boletín NAVTEX recibido?",opts:["Las observaciones locales a bordo","Solo la fecha de recepción","El nombre del buque","No es necesaria ninguna comparación"],correct:0,expl:"Confrontar el boletín con la realidad observada permite detectar una discrepancia."},
    {q:"Ante una discrepancia entre previsión antigua y nuevo boletín, ¿qué información prima?",opts:["El nuevo boletín y las observaciones recientes","Siempre la previsión más antigua","Ninguna de las dos, hay que ignorar ambas","Solo el nombre del servicio meteorológico"],correct:0,expl:"La información más reciente, confirmada por la observación, debe primar."},
    {q:"¿Cuál es un error frecuente respecto a los boletines meteorológicos?",opts:["Creer que un boletín antiguo sigue siendo válido sin verificación","Verificar regularmente las actualizaciones","Comparar el boletín con la observación local","Distinguir aviso de previsión general"],correct:0,expl:"Es un error frecuente que puede llevar a una decisión basada en información obsoleta."},
    {q:"Un buque sigue una previsión a 4 días; al día 3, las observaciones difieren mucho y llega un nuevo boletín. ¿Qué debe hacer la tripulación?",opts:["Priorizar el nuevo boletín y las observaciones recientes","Continuar según la previsión inicial sin cambios","Ignorar el nuevo boletín por precaución","Esperar al final del viaje para reaccionar"],correct:0,expl:"La información más reciente y confirmada debe guiar la decisión."},
  ],
  pt:[
    {q:"Qual é o objetivo principal de ler uma carta sinótica?",opts:["Identificar rapidamente a informação útil para a navegação","Aprender a construir uma carta meteorológica","Substituir totalmente os boletins","Medir diretamente a temperatura do ar"],correct:0,expl:"O objetivo é operacional, não a construção de cartas."},
    {q:"O que indica um aviso num boletim meteorológico?",opts:["Um perigo imediato","Uma tendência geral de vários dias","Uma simples observação histórica","Ausência de risco"],correct:0,expl:"O aviso assinala um perigo imediato a ter em conta sem demora."},
    {q:"Qual é a diferença entre previsão geral e previsão local?",opts:["A previsão local é mais precisa numa zona reduzida","São sempre idênticas","A previsão geral é sempre mais fiável","A previsão local nunca diz respeito ao mar"],correct:0,expl:"A previsão local afina a informação numa zona mais restrita."},
    {q:"O que é o NAVTEX?",opts:["Um meio de difusão de mensagens de segurança por texto","Uma zona geográfica","Um tipo de nuvem","Um instrumento de medição"],correct:0,expl:"O NAVTEX difunde automaticamente mensagens na sua zona de cobertura."},
    {q:"O que é o SafetyNET?",opts:["Um serviço de difusão por satélite","Uma zona geográfica meteorológica","Um instrumento de medição do vento","Um tipo de frente meteorológica"],correct:0,expl:"O SafetyNET complementa o NAVTEX em zonas não cobertas."},
    {q:"O que é uma METAREA?",opts:["Uma zona geográfica de responsabilidade meteorológica","Um meio de difusão por satélite","Um tipo de nuvem perigosa","Um instrumento a bordo"],correct:0,expl:"Cada METAREA é gerida por um serviço meteorológico nacional designado."},
    {q:"Por que nunca se deve usar uma única fonte de informação meteorológica?",opts:["Cada fonte pode estar incompleta ou desfasada da realidade","Todas as fontes dão sempre a mesma informação","Uma única fonte é sempre suficiente no mar","Não tem nenhuma importância prática"],correct:0,expl:"Cruzar as fontes permite detetar discrepâncias e incoerências."},
    {q:"O que deve sempre prevalecer sobre uma impressão subjetiva de calma aparente?",opts:["Um aviso oficial","A sensação pessoal do oficial","Uma previsão antiga não atualizada","Nada, a observação prevalece sempre"],correct:0,expl:"Um aviso oficial assinala um perigo confirmado, nunca a ignorar."},
    {q:"Um boletim recebido há várias horas permanece automaticamente válido?",opts:["Não, é preciso verificar se existe uma atualização","Sim, sempre","Depende apenas do clima do dia","Um boletim nunca expira"],correct:0,expl:"Uma atualização pode modificar significativamente a informação inicial."},
    {q:"Qual é a ordem lógica de utilização da informação meteorológica a bordo?",opts:["Observação, previsão, aviso oficial — todos cruzados continuamente","Apenas a previsão, ignorar o resto","Apenas a observação, ignorar os boletins","Uma ordem única e fixa sem nunca voltar atrás"],correct:0,expl:"Os três níveis cruzam-se continuamente, não numa ordem única fixa."},
    {q:"Com que frequência devem ser verificados os boletins meteorológicos?",opts:["Regularmente, tendo em conta as atualizações disponíveis","Apenas uma vez por travessia","Apenas à saída do porto","Nunca, uma única leitura basta"],correct:0,expl:"Os boletins evoluem, uma verificação regular é indispensável."},
    {q:"Que informação deve um OOW comparar com um boletim NAVTEX recebido?",opts:["As observações locais a bordo","Apenas a data de receção","O nome do navio","Nenhuma comparação é necessária"],correct:0,expl:"Confrontar o boletim com a realidade observada permite detetar uma discrepância."},
    {q:"Perante uma discrepância entre previsão antiga e novo boletim, que informação prevalece?",opts:["O novo boletim e as observações recentes","Sempre a previsão mais antiga","Nenhuma das duas, é preciso ignorar ambas","Apenas o nome do serviço meteorológico"],correct:0,expl:"A informação mais recente, confirmada pela observação, deve prevalecer."},
    {q:"Qual é um erro frequente relativamente aos boletins meteorológicos?",opts:["Acreditar que um boletim antigo permanece válido sem verificação","Verificar regularmente as atualizações","Comparar o boletim com a observação local","Distinguir aviso de previsão geral"],correct:0,expl:"É um erro frequente que pode levar a uma decisão baseada em informação obsoleta."},
    {q:"Um navio segue uma previsão a 4 dias; no dia 3, as observações diferem muito e chega um novo boletim. O que deve fazer a tripulação?",opts:["Priorizar o novo boletim e as observações recentes","Continuar segundo a previsão inicial sem alteração","Ignorar o novo boletim por precaução","Esperar pelo fim da viagem para reagir"],correct:0,expl:"A informação mais recente e confirmada deve guiar a decisão."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS) — reprend Q1, Q4, Q7, Q9, Q15 de la banque
const QUIZ = {
  fr:[BANK.fr[0], BANK.fr[3], BANK.fr[6], BANK.fr[8], BANK.fr[14]],
  en:[BANK.en[0], BANK.en[3], BANK.en[6], BANK.en[8], BANK.en[14]],
  es:[BANK.es[0], BANK.es[3], BANK.es[6], BANK.es[8], BANK.es[14]],
  pt:[BANK.pt[0], BANK.pt[3], BANK.pt[6], BANK.pt[8], BANK.pt[14]],
};

// TEXT CONTENT
const getContent = lang => {
  const d = {
    fr:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Leçon 6/7",
      title:"Cartes météo, prévisions et informations maritimes",
      intro:"Depuis la première leçon, vous avez appris à comprendre, observer, mesurer, interpréter les systèmes et reconnaître les phénomènes dangereux. Cette leçon vous apprend maintenant à exploiter les informations météorologiques disponibles afin d'anticiper les risques et de préparer les décisions de navigation.",
      p0:"AUCUNE SOURCE D'INFORMATION MÉTÉO NE DOIT ÊTRE UTILISÉE SEULE.",s0t:"Cartes météo, prévisions et informations maritimes",
      s0:"Identifier rapidement les informations utiles à la navigation dans les cartes, bulletins et sources disponibles à bord.",
      p1:"Cartes synoptiques",
      s1:"Une carte synoptique représente la situation météo générale : centres de pression, fronts (déjà vus en L4), isobares. L'objectif n'est pas d'apprendre à construire une carte météo, mais d'identifier rapidement les informations utiles à la navigation : position des systèmes, direction de déplacement, zones à risque.",
      p2:"Bulletins météorologiques maritimes",
      s2:"Un bulletin météo maritime combine plusieurs niveaux d'information, qui ne donnent pas tous le même niveau de détail : l'avertissement (danger immédiat signalé), la prévision générale (tendance sur une large zone), et la prévision locale (plus précise, sur une zone réduite). Savoir distinguer ces trois niveaux est essentiel pour bien interpréter un bulletin.",
      p3:"NAVTEX, SafetyNET et METAREA",
      s3:"NAVTEX est un moyen de diffusion de messages de sécurité maritime par texte, reçu automatiquement à bord dans sa zone de couverture. SafetyNET est un service de diffusion satellitaire, complémentaire au NAVTEX pour les zones non couvertes. METAREA désigne une zone géographique de responsabilité météorologique, chaque zone étant gérée par un service météorologique national désigné.\n\nCes trois termes sont souvent confondus : NAVTEX et SafetyNET sont des moyens de diffusion, METAREA est une zone géographique.",
      p4:"Croiser les sources d'information météorologique",
      s4:"Trois niveaux d'information doivent toujours être confrontés entre eux : l'observation directe (ce que l'équipage voit et mesure à bord), la prévision (ce qu'annoncent les bulletins et cartes), et l'avertissement officiel (signalé par NAVTEX ou SafetyNET).\n\nLe message clé : aucune source ne doit être utilisée seule. Une observation locale peut révéler un écart avec la prévision reçue ; un avertissement officiel doit toujours primer sur une impression subjective de calme apparent.",
      p5:"🎯 Exercice : interpréter un bulletin NAVTEX",
      s5:"Vous êtes OOW. Vous recevez un bulletin NAVTEX mentionnant un avertissement de coup de vent pour votre zone METAREA.\n\nQue signifie concrètement ce type de message ? Que devez-vous vérifier ensuite (carte synoptique, observations locales) ? Quelle information locale allez-vous comparer avec ce bulletin ?",
      p6:"🧭 Étude de cas",
      p7:"Un navire suit une prévision météo à 4 jours. Au jour 3, les conditions observées à bord diffèrent significativement de cette prévision. Un nouveau bulletin, plus récent, vient d'arriver.\n\nComment l'équipage doit-il réagir face à cet écart ? Quelle information doit désormais être considérée comme prioritaire : la prévision ancienne, les observations récentes, ou le nouveau bulletin ?",
      p8:"📋 Banque de 15 questions",
      p9:"💭 À retenir : les erreurs fréquentes",
      s9:"Confondre prévision et certitude. Ignorer un avertissement NAVTEX par excès de confiance dans l'observation locale. Ne pas croiser plusieurs sources d'information. Croire qu'un bulletin reçu plusieurs heures auparavant reste automatiquement valable sans vérifier l'existence d'une mise à jour.",
      sumT:"Résumé — Leçon 6",
      sumP:["Une carte synoptique sert à identifier rapidement les zones à risque","Avertissement, prévision générale et prévision locale n'offrent pas le même niveau de détail","NAVTEX et SafetyNET diffusent, METAREA désigne une zone","Aucune source d'information ne doit être utilisée seule","Un bulletin ancien doit toujours être vérifié face à une mise à jour"],
      learnedP:["Lecture d'une carte synoptique","Distinction avertissement/prévision générale/prévision locale","Rôle de NAVTEX, SafetyNET et METAREA","Croisement des sources d'information"],
      transition:"Dans la dernière leçon de ce module, vous apprendrez à décider, planifier et adapter votre navigation face au gros temps, en réunissant toutes les compétences acquises depuis le début du module.",
      safetyMsg:"Aucune source d'information météo ne doit être utilisée seule.",
      finalLabel:"MESSAGE CLÉ",
    },
    en:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Lesson 6/7",
      title:"Weather Charts, Forecasts and Maritime Information",
      intro:"Since the first lesson, you have learned to understand, observe, measure, interpret systems, and recognize dangerous phenomena. This lesson now teaches you to use available weather information to anticipate risks and prepare navigation decisions.",
      p0:"NO SINGLE WEATHER INFORMATION SOURCE SHOULD EVER BE USED ALONE.",s0t:"Weather Charts, Forecasts and Maritime Information",
      s0:"Quickly identifying navigation-relevant information in charts, bulletins, and onboard sources.",
      p1:"Synoptic Charts",
      s1:"A synoptic chart represents the general weather situation: pressure centers, fronts (already seen in L4), isobars. The goal is not to learn how to build a weather chart, but to quickly identify information useful for navigation: system positions, direction of movement, risk areas.",
      p2:"Maritime Weather Bulletins",
      s2:"A maritime weather bulletin combines several levels of information, which do not all offer the same level of detail: the warning (immediate danger reported), the general forecast (trend over a wide area), and the local forecast (more precise, over a smaller area). Knowing how to distinguish these three levels is essential to properly interpreting a bulletin.",
      p3:"NAVTEX, SafetyNET and METAREA",
      s3:"NAVTEX is a means of broadcasting maritime safety messages by text, automatically received on board within its coverage area. SafetyNET is a satellite broadcast service, complementing NAVTEX in uncovered areas. METAREA designates a geographic area of meteorological responsibility, each area being managed by a designated national weather service.\n\nThese three terms are often confused: NAVTEX and SafetyNET are broadcast means, METAREA is a geographic area.",
      p4:"Cross-Checking Weather Information Sources",
      s4:"Three levels of information must always be compared against each other: direct observation (what the crew sees and measures on board), forecast (what bulletins and charts announce), and official warning (issued via NAVTEX or SafetyNET).\n\nThe key message: no single source should be used alone. A local observation may reveal a discrepancy with the received forecast; an official warning must always take priority over a subjective impression of apparent calm.",
      p5:"🎯 Exercise: Interpreting a NAVTEX Bulletin",
      s5:"You are OOW. You receive a NAVTEX bulletin mentioning a gale warning for your METAREA zone.\n\nWhat does this type of message concretely mean? What should you check next (synoptic chart, local observations)? What local information will you compare with this bulletin?",
      p6:"🧭 Case Study",
      p7:"A ship is following a 4-day weather forecast. On day 3, conditions observed on board significantly differ from that forecast. A newer bulletin has just arrived.\n\nHow should the crew react to this discrepancy? Which information should now be considered priority: the old forecast, the recent observations, or the new bulletin?",
      p8:"📋 15-Question Bank",
      p9:"💭 Remember: Common Mistakes",
      s9:"Confusing forecast with certainty. Ignoring a NAVTEX warning due to excessive confidence in local observation. Not cross-checking multiple information sources. Believing a bulletin received several hours ago automatically remains valid without checking for an update.",
      sumT:"Summary — Lesson 6",
      sumP:["A synoptic chart helps quickly identify risk areas","Warning, general forecast, and local forecast do not offer the same level of detail","NAVTEX and SafetyNET broadcast, METAREA designates an area","No information source should ever be used alone","An old bulletin must always be checked against an update"],
      learnedP:["Reading a synoptic chart","Distinguishing warning/general forecast/local forecast","Role of NAVTEX, SafetyNET, and METAREA","Cross-checking information sources"],
      transition:"In the final lesson of this module, you will learn to decide, plan, and adapt your navigation in heavy weather, bringing together all the skills acquired since the start of the module.",
      safetyMsg:"No single weather information source should ever be used alone.",
      finalLabel:"KEY MESSAGE",
    },
    es:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Lección 6/7",
      title:"Cartas meteorológicas, previsiones e información marítima",
      intro:"Desde la primera lección, has aprendido a comprender, observar, medir, interpretar los sistemas y reconocer los fenómenos peligrosos. Esta lección te enseña ahora a utilizar la información meteorológica disponible para anticipar los riesgos y preparar las decisiones de navegación.",
      p0:"NINGUNA FUENTE DE INFORMACIÓN METEOROLÓGICA DEBE USARSE SOLA.",s0t:"Cartas meteorológicas, previsiones e información marítima",
      s0:"Identificar rápidamente la información útil para la navegación en cartas, boletines y fuentes disponibles a bordo.",
      p1:"Cartas sinópticas",
      s1:"Una carta sinóptica representa la situación meteorológica general: centros de presión, frentes (ya vistos en L4), isobaras. El objetivo no es aprender a construir una carta meteorológica, sino identificar rápidamente la información útil para la navegación: posición de los sistemas, dirección de desplazamiento, zonas de riesgo.",
      p2:"Boletines meteorológicos marítimos",
      s2:"Un boletín meteorológico marítimo combina varios niveles de información, que no ofrecen todos el mismo nivel de detalle: el aviso (peligro inmediato señalado), la previsión general (tendencia en una zona amplia), y la previsión local (más precisa, en una zona reducida). Saber distinguir estos tres niveles es esencial para interpretar bien un boletín.",
      p3:"NAVTEX, SafetyNET y METAREA",
      s3:"NAVTEX es un medio de difusión de mensajes de seguridad marítima por texto, recibido automáticamente a bordo dentro de su zona de cobertura. SafetyNET es un servicio de difusión satelital, complementario al NAVTEX en zonas no cubiertas. METAREA designa una zona geográfica de responsabilidad meteorológica, cada zona gestionada por un servicio meteorológico nacional designado.\n\nEstos tres términos a menudo se confunden: NAVTEX y SafetyNET son medios de difusión, METAREA es una zona geográfica.",
      p4:"Cruzar las fuentes de información meteorológica",
      s4:"Tres niveles de información deben siempre confrontarse entre sí: la observación directa (lo que la tripulación ve y mide a bordo), la previsión (lo que anuncian los boletines y cartas), y el aviso oficial (señalado por NAVTEX o SafetyNET).\n\nEl mensaje clave: ninguna fuente debe usarse sola. Una observación local puede revelar una discrepancia con la previsión recibida; un aviso oficial siempre debe primar sobre una impresión subjetiva de calma aparente.",
      p5:"🎯 Ejercicio: interpretar un boletín NAVTEX",
      s5:"Eres OOW. Recibes un boletín NAVTEX que menciona un aviso de temporal para tu zona METAREA.\n\n¿Qué significa concretamente este tipo de mensaje? ¿Qué debes verificar después (carta sinóptica, observaciones locales)? ¿Qué información local vas a comparar con este boletín?",
      p6:"🧭 Estudio de caso",
      p7:"Un buque sigue una previsión meteorológica a 4 días. Al día 3, las condiciones observadas a bordo difieren significativamente de esa previsión. Acaba de llegar un boletín más reciente.\n\n¿Cómo debe reaccionar la tripulación ante esta discrepancia? ¿Qué información debe ahora considerarse prioritaria: la previsión antigua, las observaciones recientes, o el nuevo boletín?",
      p8:"📋 Banco de 15 preguntas",
      p9:"💭 Recuerda: errores frecuentes",
      s9:"Confundir previsión con certeza. Ignorar un aviso NAVTEX por exceso de confianza en la observación local. No cruzar varias fuentes de información. Creer que un boletín recibido hace varias horas sigue siendo válido automáticamente sin verificar si existe una actualización.",
      sumT:"Resumen — Lección 6",
      sumP:["Una carta sinóptica ayuda a identificar rápidamente las zonas de riesgo","Aviso, previsión general y previsión local no ofrecen el mismo nivel de detalle","NAVTEX y SafetyNET difunden, METAREA designa una zona","Ninguna fuente de información debe usarse sola","Un boletín antiguo siempre debe verificarse frente a una actualización"],
      learnedP:["Lectura de una carta sinóptica","Distinción aviso/previsión general/previsión local","Rol de NAVTEX, SafetyNET y METAREA","Cruce de fuentes de información"],
      transition:"En la última lección de este módulo, aprenderás a decidir, planificar y adaptar tu navegación en mal tiempo, reuniendo todas las competencias adquiridas desde el inicio del módulo.",
      safetyMsg:"Ninguna fuente de información meteorológica debe usarse sola.",
      finalLabel:"MENSAJE CLAVE",
    },
    pt:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Lição 6/7",
      title:"Cartas meteorológicas, previsões e informação marítima",
      intro:"Desde a primeira lição, aprendeste a compreender, observar, medir, interpretar os sistemas e reconhecer os fenómenos perigosos. Esta lição ensina-te agora a utilizar a informação meteorológica disponível para antecipar os riscos e preparar as decisões de navegação.",
      p0:"NENHUMA FONTE DE INFORMAÇÃO METEOROLÓGICA DEVE SER USADA SOZINHA.",s0t:"Cartas meteorológicas, previsões e informação marítima",
      s0:"Identificar rapidamente a informação útil para a navegação em cartas, boletins e fontes disponíveis a bordo.",
      p1:"Cartas sinóticas",
      s1:"Uma carta sinótica representa a situação meteorológica geral: centros de pressão, frentes (já vistas em L4), isóbaras. O objetivo não é aprender a construir uma carta meteorológica, mas identificar rapidamente a informação útil para a navegação: posição dos sistemas, direção de deslocamento, zonas de risco.",
      p2:"Boletins meteorológicos marítimos",
      s2:"Um boletim meteorológico marítimo combina vários níveis de informação, que não oferecem todos o mesmo nível de detalhe: o aviso (perigo imediato assinalado), a previsão geral (tendência numa zona ampla), e a previsão local (mais precisa, numa zona reduzida). Saber distinguir estes três níveis é essencial para interpretar bem um boletim.",
      p3:"NAVTEX, SafetyNET e METAREA",
      s3:"NAVTEX é um meio de difusão de mensagens de segurança marítima por texto, recebido automaticamente a bordo dentro da sua zona de cobertura. SafetyNET é um serviço de difusão por satélite, complementar ao NAVTEX em zonas não cobertas. METAREA designa uma zona geográfica de responsabilidade meteorológica, cada zona gerida por um serviço meteorológico nacional designado.\n\nEstes três termos são frequentemente confundidos: NAVTEX e SafetyNET são meios de difusão, METAREA é uma zona geográfica.",
      p4:"Cruzar as fontes de informação meteorológica",
      s4:"Três níveis de informação devem sempre ser confrontados entre si: a observação direta (o que a tripulação vê e mede a bordo), a previsão (o que os boletins e cartas anunciam), e o aviso oficial (assinalado por NAVTEX ou SafetyNET).\n\nA mensagem chave: nenhuma fonte deve ser usada sozinha. Uma observação local pode revelar uma discrepância com a previsão recebida; um aviso oficial deve sempre prevalecer sobre uma impressão subjetiva de calma aparente.",
      p5:"🎯 Exercício: interpretar um boletim NAVTEX",
      s5:"És OOW. Recebes um boletim NAVTEX mencionando um aviso de temporal para a tua zona METAREA.\n\nO que significa concretamente este tipo de mensagem? O que deves verificar a seguir (carta sinótica, observações locais)? Que informação local vais comparar com este boletim?",
      p6:"🧭 Estudo de caso",
      p7:"Um navio segue uma previsão meteorológica a 4 dias. No dia 3, as condições observadas a bordo diferem significativamente dessa previsão. Um boletim mais recente acaba de chegar.\n\nComo deve a tripulação reagir perante esta discrepância? Que informação deve agora ser considerada prioritária: a previsão antiga, as observações recentes, ou o novo boletim?",
      p8:"📋 Banco de 15 perguntas",
      p9:"💭 Lembrar: erros frequentes",
      s9:"Confundir previsão com certeza. Ignorar um aviso NAVTEX por excesso de confiança na observação local. Não cruzar várias fontes de informação. Acreditar que um boletim recebido há várias horas permanece automaticamente válido sem verificar se existe uma atualização.",
      sumT:"Resumo — Lição 6",
      sumP:["Uma carta sinótica ajuda a identificar rapidamente as zonas de risco","Aviso, previsão geral e previsão local não oferecem o mesmo nível de detalhe","NAVTEX e SafetyNET difundem, METAREA designa uma zona","Nenhuma fonte de informação deve ser usada sozinha","Um boletim antigo deve sempre ser verificado face a uma atualização"],
      learnedP:["Leitura de uma carta sinótica","Distinção aviso/previsão geral/previsão local","Papel de NAVTEX, SafetyNET e METAREA","Cruzamento de fontes de informação"],
      transition:"Na última lição deste módulo, vais aprender a decidir, planear e adaptar a tua navegação em mau tempo, reunindo todas as competências adquiridas desde o início do módulo.",
      safetyMsg:"Nenhuma fonte de informação meteorológica deve ser usada sozinha.",
      finalLabel:"MENSAGEM-CHAVE",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonMETEO_L6({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t = T[lang]||T.fr;
  const quiz = QUIZ[lang]||QUIZ.fr;
  const bank = BANK[lang]||BANK.fr;
  const lc = getContent(lang);
  const moduleLabel = MODULE_LABEL[lang]||MODULE_LABEL.fr;
  const [phase, setPhase] = useState("content");
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 6/7":lang==="en"?"Lesson 6/7":lang==="es"?"Lección 6/7":"Lição 6/7"}</div>
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

            <SL icon="🗺️" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🗺️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🗺️" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>

            <SL icon="📡" text={lc.p2} color={C.teal}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>

            <SL icon="📟" text={lc.p3} color={C.orange}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>

            <SL icon="🔀" text={lc.p4} color={C.red}/>
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
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank}/></Card>

            <SL icon="💭" text={lc.p9} color={C.purple}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.85)",lineHeight:1.8,whiteSpace:"pre-line"}}>{lc.s9}</div></Card>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(230,126,34,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(230,126,34,0.35)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz Final - Météorologie":lang==="en"?"Final Quiz - Meteorology":lang==="es"?"Quiz Final - Meteorología":"Quiz Final - Meteorologia"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 6/7":"questions · Lesson 6/7"}</div>
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

            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(230,126,34,0.35)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 7 - DÉCISION ET GROS TEMPS →":lang==="en"?"LESSON 7 - DECISION AND HEAVY WEATHER →":lang==="es"?"LECCIÓN 7 - DECISIÓN Y MAL TIEMPO →":"LIÇÃO 7 - DECISÃO E MAU TEMPO →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
