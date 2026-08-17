// LessonShipCareer_L2 - Ta feuille de route
import { useState } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  primary:"#8b5cf6", secondary:"#6366f1",
  accent:"#a78bfa", gold:"#c9922a",
  safe:"#4ade80", danger:"#ef4444",
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
};

function loadProfile():any{
  try{
    const raw=localStorage.getItem("map_career_profile");
    return raw?JSON.parse(raw):null;
  }catch{return null;}
}

const RANKS: any = {
  fr:{
    deck:["Cadet Pont","Matelot / OS","OOW (Officier de quart)","Second Capitaine","Capitaine"],
    engine:["Cadet Machine","Matelot machine","3e/4e Mecanicien","Second Mecanicien","Chef Mecanicien"],
  },
  en:{
    deck:["Deck Cadet","Rating / OS","OOW (Officer of the Watch)","Chief Mate","Master"],
    engine:["Engine Cadet","Rating (Engine)","3rd/4th Engineer","2nd Engineer","Chief Engineer"],
  },
  es:{
    deck:["Cadete de Puente","Marinero / OS","OOW (Oficial de guardia)","Primer Oficial","Capitan"],
    engine:["Cadete de Maquinas","Marinero de maquinas","3er/4to Maquinista","Segundo Maquinista","Jefe de Maquinas"],
  },
  pt:{
    deck:["Cadete de Conves","Marinheiro / OS","OOW (Oficial de quarto)","Imediato","Comandante"],
    engine:["Cadete de Maquinas","Marinheiro de maquinas","3o/4o Maquinista","Segundo Maquinista","Chefe de Maquinas"],
  },
};

const STEPINFO: any = {
  fr:{
    deck:[
      {cert:"Aucun (formation initiale)",seatime:"12 mois de stage embarque",notes:"Livret de formation a faire valider par le Capitaine a chaque embarquement."},
      {cert:"Certificat matelot qualifie",seatime:"6 mois supplementaires",notes:"Etape optionnelle selon parcours - certains cadets passent directement de Cadet a OOW."},
      {cert:"STCW II/1",seatime:"12 mois comme OOW",notes:"Premier grade officier. L'examen oral valide la comprehension pratique, pas seulement theorique."},
      {cert:"STCW II/2 (limite ou illimite)",seatime:"12 mois comme Second Capitaine",notes:"Gestion de la cargaison et de la stabilite. Etape charniere avant le commandement."},
      {cert:"STCW II/2 Master",seatime:"Examen final + entretien",notes:"Responsabilite totale du navire. Sommet de la filiere pont."},
    ],
    engine:[
      {cert:"Aucun (formation initiale)",seatime:"12 mois de stage embarque",notes:"Livret de formation a faire valider par le Chef Mecanicien a chaque embarquement."},
      {cert:"Certificat matelot machine qualifie",seatime:"6 mois supplementaires",notes:"Etape optionnelle selon parcours - certains cadets passent directement de Cadet a 3e Mecanicien."},
      {cert:"STCW III/1",seatime:"12 mois comme 3e/4e Mecanicien",notes:"Premier grade officier machine. Gestion des auxiliaires et de la maintenance courante."},
      {cert:"STCW III/2",seatime:"12 mois comme Second Mecanicien",notes:"Organisation du travail en salle des machines. Etape charniere avant le grade de chef."},
      {cert:"STCW III/2 Chief Engineer",seatime:"Examen final + entretien",notes:"Responsabilite totale de la propulsion. Sommet de la filiere machine."},
    ],
  },
  en:{
    deck:[
      {cert:"None (initial training)",seatime:"12 months onboard training",notes:"Training record book to be validated by the Master at every embarkation."},
      {cert:"Qualified rating certificate",seatime:"6 additional months",notes:"Optional step depending on path - some cadets go directly from Cadet to OOW."},
      {cert:"STCW II/1",seatime:"12 months as OOW",notes:"First officer rank. The oral exam validates practical understanding, not only theory."},
      {cert:"STCW II/2 (limited or unlimited)",seatime:"12 months as Chief Mate",notes:"Cargo and stability management. Pivotal step before command."},
      {cert:"STCW II/2 Master",seatime:"Final exam + interview",notes:"Full responsibility for the vessel. Top of the deck career ladder."},
    ],
    engine:[
      {cert:"None (initial training)",seatime:"12 months onboard training",notes:"Training record book to be validated by the Chief Engineer at every embarkation."},
      {cert:"Qualified engine rating certificate",seatime:"6 additional months",notes:"Optional step depending on path - some cadets go directly from Cadet to 3rd Engineer."},
      {cert:"STCW III/1",seatime:"12 months as 3rd/4th Engineer",notes:"First engine officer rank. Management of auxiliaries and routine maintenance."},
      {cert:"STCW III/2",seatime:"12 months as 2nd Engineer",notes:"Organizing engine room work. Pivotal step before Chief rank."},
      {cert:"STCW III/2 Chief Engineer",seatime:"Final exam + interview",notes:"Full responsibility for propulsion. Top of the engine career ladder."},
    ],
  },
  es:{
    deck:[
      {cert:"Ninguno (formacion inicial)",seatime:"12 meses de practicas embarcadas",notes:"Libro de formacion a validar por el Capitan en cada embarque."},
      {cert:"Certificado de marinero calificado",seatime:"6 meses adicionales",notes:"Etapa opcional segun el recorrido - algunos cadetes pasan directamente de Cadete a OOW."},
      {cert:"STCW II/1",seatime:"12 meses como OOW",notes:"Primer grado de oficial. El examen oral valida la comprension practica, no solo teorica."},
      {cert:"STCW II/2 (limitado o ilimitado)",seatime:"12 meses como Primer Oficial",notes:"Gestion de la carga y la estabilidad. Etapa clave antes del mando."},
      {cert:"STCW II/2 Master",seatime:"Examen final + entrevista",notes:"Responsabilidad total del buque. Cima de la carrera de puente."},
    ],
    engine:[
      {cert:"Ninguno (formacion inicial)",seatime:"12 meses de practicas embarcadas",notes:"Libro de formacion a validar por el Jefe de Maquinas en cada embarque."},
      {cert:"Certificado de marinero de maquinas calificado",seatime:"6 meses adicionales",notes:"Etapa opcional segun el recorrido - algunos cadetes pasan directamente de Cadete a 3er Maquinista."},
      {cert:"STCW III/1",seatime:"12 meses como 3er/4to Maquinista",notes:"Primer grado de oficial de maquinas. Gestion de auxiliares y mantenimiento rutinario."},
      {cert:"STCW III/2",seatime:"12 meses como Segundo Maquinista",notes:"Organizacion del trabajo en sala de maquinas. Etapa clave antes del grado de jefe."},
      {cert:"STCW III/2 Chief Engineer",seatime:"Examen final + entrevista",notes:"Responsabilidad total de la propulsion. Cima de la carrera de maquinas."},
    ],
  },
  pt:{
    deck:[
      {cert:"Nenhum (treinamento inicial)",seatime:"12 meses de estagio embarcado",notes:"Livro de formacao a ser validado pelo Comandante em cada embarque."},
      {cert:"Certificado de marinheiro qualificado",seatime:"6 meses adicionais",notes:"Etapa opcional conforme o percurso - alguns cadetes passam diretamente de Cadete a OOW."},
      {cert:"STCW II/1",seatime:"12 meses como OOW",notes:"Primeiro posto de oficial. O exame oral valida a compreensao pratica, nao so a teoria."},
      {cert:"STCW II/2 (limitado ou ilimitado)",seatime:"12 meses como Imediato",notes:"Gestao da carga e da estabilidade. Etapa-chave antes do comando."},
      {cert:"STCW II/2 Master",seatime:"Exame final + entrevista",notes:"Responsabilidade total pelo navio. Topo da carreira de conves."},
    ],
    engine:[
      {cert:"Nenhum (treinamento inicial)",seatime:"12 meses de estagio embarcado",notes:"Livro de formacao a ser validado pelo Chefe de Maquinas em cada embarque."},
      {cert:"Certificado de marinheiro de maquinas qualificado",seatime:"6 meses adicionais",notes:"Etapa opcional conforme o percurso - alguns cadetes passam diretamente de Cadete a 3o Maquinista."},
      {cert:"STCW III/1",seatime:"12 meses como 3o/4o Maquinista",notes:"Primeiro posto de oficial de maquinas. Gestao de auxiliares e manutencao de rotina."},
      {cert:"STCW III/2",seatime:"12 meses como Segundo Maquinista",notes:"Organizacao do trabalho na casa de maquinas. Etapa-chave antes do posto de chefe."},
      {cert:"STCW III/2 Chief Engineer",seatime:"Exame final + entrevista",notes:"Responsabilidade total pela propulsao. Topo da carreira de maquinas."},
    ],
  },
};

const T: any = {
  fr:{
    moduleLabel:"CARRIERE - TA FEUILLE DE ROUTE",
    lessonTitle:"Ta feuille de route",
    intro:"A partir du profil que tu as defini en L1, cette lecon transforme ta trajectoire en feuille de route concrete : chaque palier entre ton poste actuel et ton poste vise, avec le certificat requis et le temps de mer minimum estime.",
    noProfileMsg:"Aucun profil trouve. Retourne a la lecon 1 (Ton profil) pour definir ton poste actuel et ton poste vise avant de generer ta feuille de route.",
    roadmapTitle:"Ta feuille de route personnalisee",
    stepCurrent:"Poste actuel", stepTarget:"Poste vise",
    certLabel:"Certificat requis", seatimeLabel:"Temps de mer estime", notesLabel:"Note",
    totalLabel:"Temps de mer total estime pour atteindre l'objectif",
    s1title:"Facteurs qui accelerent la progression", s1hint:"Touche un facteur",
    s2title:"Facteurs qui retardent la progression", s2hint:"Touche un facteur",
    s3title:"Documents a preparer pour chaque palier", s3hint:"Touche un document",
    s4title:"Interruptions de carriere & revalidation", s4hint:"Touche une situation",
    keypoints:"Points cles",
    kp:[
      "La feuille de route se construit palier par palier, jamais en sautant une etape obligatoire",
      "Chaque palier combine trois exigences : certificat STCW, temps de mer documente, et parfois examen oral",
      "Le temps de mer minimum est un plancher reglementaire, pas une moyenne garantie",
      "Une experience variee (types de navires, taches) accelere souvent la progression plus qu'une simple accumulation de mois",
      "Les certificats de securite (Basic Safety Training, GMDSS, Fire Fighting) doivent rester valides tout au long du parcours",
      "Une interruption de carriere de plusieurs annees peut exiger une remise a niveau avant de reprendre la progression",
    ],
    accidentTitle:"Cas reel : Exxon Valdez (1989)",
    accidentText:"Le petrolier Exxon Valdez s'est echoue sur un recif en Alaska en mars 1989, provoquant l'une des plus grandes marees noires de l'histoire. L'enquete a revele que le troisieme officier tenait la barre dans un chenal exigeant une experience et une familiarisation specifiques, alors que le Capitaine avait quitte la passerelle. Le troisieme officier ne disposait pas de la charge de travail ni du repos necessaires pour cette manoeuvre delicate. Cet accident illustre un principe central de la progression de carriere : un certificat valide sur le papier ne remplace pas l'experience specifique requise pour une tache donnee, et la delegation de responsabilite doit toujours respecter les competences reelles de l'officier en poste.",
    accidentToggle:"Voir le cas complet",
    exTitle:"Exercice pratique",
    exq1:"En te basant sur TA feuille de route ({current} vers {target}), liste les paliers intermediaires et le temps de mer minimum cumule.",
    exq1connect:"Temps de mer minimum cumule pour ce trajet :",
    exq1suffix:"mois, plus le temps administratif des examens a chaque palier.",
    exStatic:[
      {q:"Tu es Second Mecanicien depuis 8 mois et un imprevu familial t'oblige a rester a terre 18 mois. Quel impact cela a-t-il sur ta progression vers Chef Mecanicien ?",
       a:"Le temps de mer deja accumule (8 mois) reste acquis et documente dans le livret. Cependant : 1) les certificats de securite (Basic Safety Training, Advanced Fire Fighting, Medical Care) ont une duree de validite limitee (generalement 5 ans) et doivent etre verifies a la reprise ; 2) selon l'administration du pavillon, une interruption longue peut exiger une formation de remise a niveau (refresher course) avant de reprendre le temps de mer qualifiant ; 3) il faudra recompter les mois manquants (4 mois restants sur les 12 requis) une fois de retour en mer. La progression est retardee mais pas annulee."},
      {q:"Compare le temps de mer minimum reglementaire et le temps de mer moyen reellement observe dans la profession. Pourquoi cet ecart existe-t-il ?",
       a:"Le temps de mer minimum reglementaire (ex: 12 mois par palier) est un plancher fixe par la convention STCW. Dans la pratique, le temps moyen observe est souvent plus long, pour plusieurs raisons : disponibilite des postes vacants au grade superieur, politique de progression propre a chaque compagnie (certaines exigent une experience superieure au minimum legal), evaluations de performance a chaque embarquement, et parfois echec a un premier passage d'examen necessitant de repasser du temps de mer supplementaire. La feuille de route doit donc etre lue comme un scenario optimiste, a ajuster selon le contexte reel de l'officier."},
    ],
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
    startQuiz:"COMMENCER LE QUIZ",
    disclaimer:"Les durees et exigences indiquees (temps de mer, validite des certificats) peuvent varier selon le pavillon, l'administration maritime nationale et le type de navire.",
    goToL1:"Aller a la lecon 1",
  },
  en:{
    moduleLabel:"CAREER - YOUR ROADMAP",
    lessonTitle:"Your roadmap",
    intro:"Based on the profile you defined in L1, this lesson turns your trajectory into a concrete roadmap: every step between your current rank and your target rank, with the required certificate and the estimated minimum sea time.",
    noProfileMsg:"No profile found. Go back to Lesson 1 (Your profile) to set your current and target rank before generating your roadmap.",
    roadmapTitle:"Your personalized roadmap",
    stepCurrent:"Current rank", stepTarget:"Target rank",
    certLabel:"Required certificate", seatimeLabel:"Estimated sea time", notesLabel:"Note",
    totalLabel:"Estimated total sea time to reach the target",
    s1title:"Factors that speed up progression", s1hint:"Tap a factor",
    s2title:"Factors that slow down progression", s2hint:"Tap a factor",
    s3title:"Documents to prepare for each step", s3hint:"Tap a document",
    s4title:"Career breaks & revalidation", s4hint:"Tap a situation",
    keypoints:"Key Points",
    kp:[
      "The roadmap is built step by step, never skipping a mandatory rank",
      "Each step combines three requirements: STCW certificate, documented sea time, and sometimes an oral exam",
      "The minimum sea time is a regulatory floor, not a guaranteed average",
      "Varied experience (vessel types, tasks) often speeds up progression more than simply accumulating months",
      "Safety certificates (Basic Safety Training, GMDSS, Fire Fighting) must remain valid throughout the path",
      "A multi-year career break may require refresher training before resuming progression",
    ],
    accidentTitle:"Real case: Exxon Valdez (1989)",
    accidentText:"The oil tanker Exxon Valdez ran aground on a reef in Alaska in March 1989, causing one of the largest oil spills in history. The investigation revealed that the third mate was at the helm in a channel requiring specific experience and familiarisation, while the Master had left the bridge. The third mate did not have the workload management or rest required for that delicate manoeuvre. This accident illustrates a central career progression principle: a certificate valid on paper does not replace the specific experience required for a given task, and delegation of responsibility must always match the officer's actual competence.",
    accidentToggle:"View full case",
    exTitle:"Practice exercise",
    exq1:"Based on YOUR roadmap ({current} to {target}), list the intermediate steps and the cumulative minimum sea time.",
    exq1connect:"Cumulative minimum sea time for this path:",
    exq1suffix:"months, plus administrative exam time at each step.",
    exStatic:[
      {q:"You have been 2nd Engineer for 8 months and a family emergency forces you ashore for 18 months. What impact does this have on your progression to Chief Engineer?",
       a:"The sea time already accumulated (8 months) remains valid and documented in the record book. However: 1) safety certificates (Basic Safety Training, Advanced Fire Fighting, Medical Care) have a limited validity period (generally 5 years) and must be checked upon return; 2) depending on the flag administration, a long break may require refresher training before resuming qualifying sea time; 3) the remaining months (4 out of the 12 required) will need to be completed once back at sea. Progression is delayed but not cancelled."},
      {q:"Compare the regulatory minimum sea time and the average sea time actually observed in the profession. Why does this gap exist?",
       a:"The regulatory minimum sea time (e.g. 12 months per step) is a floor set by the STCW convention. In practice, the average observed time is often longer, for several reasons: availability of vacant positions at the next rank, each company's own progression policy (some require more than the legal minimum experience), performance evaluations at every embarkation, and sometimes failing a first exam attempt requiring additional sea time before retaking it. The roadmap should therefore be read as an optimistic scenario, to be adjusted to the officer's real context."},
    ],
    showAnswer:"Show answer", hideAnswer:"Hide",
    startQuiz:"START QUIZ",
    disclaimer:"Requirements may vary depending on flag state, national maritime authority and vessel type.",
    goToL1:"Go to Lesson 1",
  },
  es:{
    moduleLabel:"CARRERA - TU HOJA DE RUTA",
    lessonTitle:"Tu hoja de ruta",
    intro:"A partir del perfil que definiste en L1, esta leccion convierte tu trayectoria en una hoja de ruta concreta: cada etapa entre tu puesto actual y tu puesto objetivo, con el certificado requerido y el tiempo de mar minimo estimado.",
    noProfileMsg:"No se encontro ningun perfil. Vuelve a la leccion 1 (Tu perfil) para definir tu puesto actual y tu puesto objetivo antes de generar tu hoja de ruta.",
    roadmapTitle:"Tu hoja de ruta personalizada",
    stepCurrent:"Puesto actual", stepTarget:"Puesto objetivo",
    certLabel:"Certificado requerido", seatimeLabel:"Tiempo de mar estimado", notesLabel:"Nota",
    totalLabel:"Tiempo de mar total estimado para alcanzar el objetivo",
    s1title:"Factores que aceleran la progresion", s1hint:"Toca un factor",
    s2title:"Factores que retrasan la progresion", s2hint:"Toca un factor",
    s3title:"Documentos a preparar para cada etapa", s3hint:"Toca un documento",
    s4title:"Interrupciones de carrera y revalidacion", s4hint:"Toca una situacion",
    keypoints:"Puntos clave",
    kp:[
      "La hoja de ruta se construye etapa por etapa, sin saltar nunca un paso obligatorio",
      "Cada etapa combina tres requisitos: certificado STCW, tiempo de mar documentado y a veces examen oral",
      "El tiempo de mar minimo es un piso reglamentario, no un promedio garantizado",
      "Una experiencia variada (tipos de buque, tareas) suele acelerar la progresion mas que la simple acumulacion de meses",
      "Los certificados de seguridad (Basic Safety Training, GMDSS, Fire Fighting) deben permanecer vigentes durante todo el recorrido",
      "Una interrupcion de carrera de varios anos puede exigir un curso de actualizacion antes de reanudar la progresion",
    ],
    accidentTitle:"Caso real: Exxon Valdez (1989)",
    accidentText:"El petrolero Exxon Valdez encallo en un arrecife de Alaska en marzo de 1989, causando uno de los mayores derrames de petroleo de la historia. La investigacion revelo que el tercer oficial estaba al timon en un canal que exigia experiencia y familiarizacion especificas, mientras el Capitan habia abandonado el puente. El tercer oficial no contaba con la gestion de carga de trabajo ni el descanso necesarios para esa maniobra delicada. Este accidente ilustra un principio central de la progresion de carrera: un certificado valido en el papel no sustituye la experiencia especifica requerida para una tarea dada, y la delegacion de responsabilidad debe respetar siempre la competencia real del oficial en funciones.",
    accidentToggle:"Ver caso completo",
    exTitle:"Ejercicio practico",
    exq1:"Basandote en TU hoja de ruta ({current} hacia {target}), enumera las etapas intermedias y el tiempo de mar minimo acumulado.",
    exq1connect:"Tiempo de mar minimo acumulado para este trayecto:",
    exq1suffix:"meses, mas el tiempo administrativo de los examenes en cada etapa.",
    exStatic:[
      {q:"Eres Segundo Maquinista desde hace 8 meses y un imprevisto familiar te obliga a quedarte en tierra 18 meses. Que impacto tiene esto en tu progresion hacia Jefe de Maquinas?",
       a:"El tiempo de mar ya acumulado (8 meses) sigue siendo valido y esta documentado en el libro. Sin embargo: 1) los certificados de seguridad (Basic Safety Training, Advanced Fire Fighting, Medical Care) tienen una vigencia limitada (generalmente 5 anos) y deben verificarse al regresar; 2) segun la administracion del pabellon, una interrupcion larga puede exigir un curso de actualizacion antes de reanudar el tiempo de mar calificante; 3) habra que completar los meses restantes (4 de los 12 requeridos) una vez de vuelta en el mar. La progresion se retrasa pero no se anula."},
      {q:"Compara el tiempo de mar minimo reglamentario y el tiempo de mar promedio realmente observado en la profesion. Por que existe esta diferencia?",
       a:"El tiempo de mar minimo reglamentario (ej: 12 meses por etapa) es un piso fijado por el convenio STCW. En la practica, el tiempo promedio observado suele ser mayor, por varias razones: disponibilidad de vacantes en el grado superior, politica de progresion propia de cada empresa (algunas exigen mas experiencia que el minimo legal), evaluaciones de desempeno en cada embarque, y a veces reprobar un primer intento de examen, lo que exige tiempo de mar adicional antes de repetirlo. La hoja de ruta debe leerse, por tanto, como un escenario optimista, a ajustar segun el contexto real del oficial."},
    ],
    showAnswer:"Ver correccion", hideAnswer:"Ocultar",
    startQuiz:"EMPEZAR QUIZ",
    disclaimer:"Los plazos y requisitos indicados pueden variar segun el pabellon, la administracion maritima nacional y el tipo de buque.",
    goToL1:"Ir a la leccion 1",
  },
  pt:{
    moduleLabel:"CARREIRA - SEU ROTEIRO",
    lessonTitle:"Seu roteiro",
    intro:"A partir do perfil que voce definiu em L1, esta licao transforma sua trajetoria em um roteiro concreto: cada etapa entre seu posto atual e seu posto almejado, com o certificado exigido e o tempo de mar minimo estimado.",
    noProfileMsg:"Nenhum perfil encontrado. Volte a licao 1 (Seu perfil) para definir seu posto atual e seu posto almejado antes de gerar seu roteiro.",
    roadmapTitle:"Seu roteiro personalizado",
    stepCurrent:"Posto atual", stepTarget:"Posto almejado",
    certLabel:"Certificado exigido", seatimeLabel:"Tempo de mar estimado", notesLabel:"Nota",
    totalLabel:"Tempo de mar total estimado para alcancar o objetivo",
    s1title:"Fatores que aceleram a progressao", s1hint:"Toque em um fator",
    s2title:"Fatores que atrasam a progressao", s2hint:"Toque em um fator",
    s3title:"Documentos a preparar para cada etapa", s3hint:"Toque em um documento",
    s4title:"Interrupcoes de carreira e revalidacao", s4hint:"Toque em uma situacao",
    keypoints:"Pontos-chave",
    kp:[
      "O roteiro e construido etapa por etapa, nunca pulando um passo obrigatorio",
      "Cada etapa combina tres exigencias: certificado STCW, tempo de mar documentado e, as vezes, exame oral",
      "O tempo de mar minimo e um piso regulatorio, nao uma media garantida",
      "Uma experiencia variada (tipos de navio, tarefas) costuma acelerar a progressao mais do que o mero acumulo de meses",
      "Os certificados de seguranca (Basic Safety Training, GMDSS, Fire Fighting) devem permanecer validos durante todo o percurso",
      "Uma interrupcao de carreira de varios anos pode exigir um curso de atualizacao antes de retomar a progressao",
    ],
    accidentTitle:"Caso real: Exxon Valdez (1989)",
    accidentText:"O petroleiro Exxon Valdez encalhou em um recife no Alasca em marco de 1989, causando um dos maiores derramamentos de petroleo da historia. A investigacao revelou que o terceiro oficial estava ao leme em um canal que exigia experiencia e familiarizacao especificas, enquanto o Comandante havia deixado o passadico. O terceiro oficial nao tinha a gestao de carga de trabalho nem o descanso necessarios para aquela manobra delicada. Esse acidente ilustra um principio central da progressao de carreira: um certificado valido no papel nao substitui a experiencia especifica exigida para uma tarefa dada, e a delegacao de responsabilidade deve sempre respeitar a competencia real do oficial em funcao.",
    accidentToggle:"Ver caso completo",
    exTitle:"Exercicio pratico",
    exq1:"Com base no SEU roteiro ({current} para {target}), liste as etapas intermediarias e o tempo de mar minimo acumulado.",
    exq1connect:"Tempo de mar minimo acumulado para esse trajeto:",
    exq1suffix:"meses, mais o tempo administrativo dos exames em cada etapa.",
    exStatic:[
      {q:"Voce e Segundo Maquinista ha 8 meses e um imprevisto familiar o obriga a ficar em terra por 18 meses. Que impacto isso tem na sua progressao rumo a Chefe de Maquinas?",
       a:"O tempo de mar ja acumulado (8 meses) continua valido e documentado no livro. No entanto: 1) os certificados de seguranca (Basic Safety Training, Advanced Fire Fighting, Medical Care) tem validade limitada (geralmente 5 anos) e devem ser verificados ao retornar; 2) conforme a administracao da bandeira, uma interrupcao longa pode exigir um curso de atualizacao antes de retomar o tempo de mar qualificante; 3) sera preciso completar os meses restantes (4 dos 12 exigidos) apos o retorno ao mar. A progressao e atrasada, mas nao anulada."},
      {q:"Compare o tempo de mar minimo regulamentar e o tempo de mar medio realmente observado na profissao. Por que essa diferenca existe?",
       a:"O tempo de mar minimo regulamentar (ex: 12 meses por etapa) e um piso fixado pela convencao STCW. Na pratica, o tempo medio observado costuma ser maior, por varias razoes: disponibilidade de vagas no posto superior, politica de progressao propria de cada empresa (algumas exigem mais experiencia que o minimo legal), avaliacoes de desempenho em cada embarque, e por vezes reprovacao em uma primeira tentativa de exame, exigindo tempo de mar adicional antes de repeti-lo. O roteiro deve, portanto, ser lido como um cenario otimista, a ser ajustado conforme o contexto real do oficial."},
    ],
    showAnswer:"Ver correcao", hideAnswer:"Ocultar",
    startQuiz:"COMECAR QUIZ",
    disclaimer:"Os prazos e exigencias indicados podem variar conforme a bandeira, a administracao maritima nacional e o tipo de navio.",
    goToL1:"Ir para a licao 1",
  },
};

const FACTORS_UP: any = {
  fr:[
    {name:"Experience variee",desc:"Naviguer sur plusieurs types de navires (cargo, tanker, offshore) developpe des competences transferables et rend le dossier plus attractif pour les compagnies, au-dela du simple temps de mer accumule."},
    {name:"Evaluations positives constantes",desc:"Chaque embarquement donne lieu a une evaluation du Capitaine ou du Chef Mecanicien. Des evaluations constamment positives accelerent l'acces aux postes vacants au grade superieur."},
    {name:"Formations anticipees",desc:"Suivre une formation complementaire (tanker, DP, GMDSS) avant d'en avoir besoin evite les delais d'attente et rend le marin immediatement disponible pour des postes specialises."},
    {name:"Flexibilite d'embarquement",desc:"Etre disponible rapidement quand un poste se libere au grade superieur est souvent decisif : les compagnies favorisent les candidats prets a embarquer sans delai."},
  ],
  en:[
    {name:"Varied experience",desc:"Sailing on several vessel types (cargo, tanker, offshore) develops transferable skills and makes the record more attractive to companies, beyond simple accumulated sea time."},
    {name:"Consistently positive evaluations",desc:"Every embarkation results in an evaluation by the Master or Chief Engineer. Consistently positive evaluations speed up access to vacant positions at the next rank."},
    {name:"Anticipated training",desc:"Taking additional training (tanker, DP, GMDSS) before it is needed avoids waiting delays and makes the seafarer immediately available for specialized positions."},
    {name:"Embarkation flexibility",desc:"Being quickly available when a position opens at the next rank is often decisive: companies favor candidates ready to join without delay."},
  ],
  es:[
    {name:"Experiencia variada",desc:"Navegar en varios tipos de buque (carga, tanquero, offshore) desarrolla competencias transferibles y hace el expediente mas atractivo para las companias, mas alla del simple tiempo de mar acumulado."},
    {name:"Evaluaciones positivas constantes",desc:"Cada embarque da lugar a una evaluacion del Capitan o del Jefe de Maquinas. Evaluaciones constantemente positivas aceleran el acceso a puestos vacantes en el grado superior."},
    {name:"Formaciones anticipadas",desc:"Realizar una formacion adicional (tanquero, DP, GMDSS) antes de necesitarla evita retrasos y hace al marino disponible de inmediato para puestos especializados."},
    {name:"Flexibilidad de embarque",desc:"Estar disponible rapidamente cuando se libera un puesto en el grado superior suele ser decisivo: las companias favorecen a los candidatos listos para embarcar sin demora."},
  ],
  pt:[
    {name:"Experiencia variada",desc:"Navegar em varios tipos de navio (carga, petroleiro, offshore) desenvolve competencias transferiveis e torna o registro mais atraente para as empresas, alem do simples tempo de mar acumulado."},
    {name:"Avaliacoes positivas constantes",desc:"Cada embarque gera uma avaliacao do Comandante ou do Chefe de Maquinas. Avaliacoes constantemente positivas aceleram o acesso a vagas no posto superior."},
    {name:"Treinamentos antecipados",desc:"Fazer um treinamento adicional (petroleiro, DP, GMDSS) antes de precisar dele evita atrasos e deixa o marinheiro imediatamente disponivel para postos especializados."},
    {name:"Flexibilidade de embarque",desc:"Estar disponivel rapidamente quando uma vaga se abre no posto superior costuma ser decisivo: as empresas favorecem candidatos prontos para embarcar sem demora."},
  ],
};

const FACTORS_DOWN: any = {
  fr:[
    {name:"Interruptions prolongees",desc:"Une pause de carriere longue peut necessiter une formation de remise a niveau et retarde l'acces au temps de mer qualifiant pour le grade suivant."},
    {name:"Echec a un examen STCW",desc:"Un echec a l'examen oral ou ecrit oblige souvent a accumuler du temps de mer supplementaire avant de pouvoir repasser l'examen."},
    {name:"Certificats non renouveles",desc:"Un certificat de securite expire (Basic Safety Training, Medical Care) bloque l'embarquement tant qu'il n'est pas renouvele, meme si le temps de mer est suffisant."},
    {name:"Postes vacants rares",desc:"Dans certaines compagnies, le nombre limite de postes au grade superieur cree un goulot d'etranglement independant des competences du marin."},
  ],
  en:[
    {name:"Prolonged interruptions",desc:"A long career break may require refresher training and delays access to qualifying sea time for the next rank."},
    {name:"Failing an STCW exam",desc:"Failing the oral or written exam often requires accumulating additional sea time before being allowed to retake it."},
    {name:"Unrenewed certificates",desc:"An expired safety certificate (Basic Safety Training, Medical Care) blocks embarkation until renewed, even if sea time is sufficient."},
    {name:"Scarce vacant positions",desc:"In some companies, a limited number of positions at the next rank creates a bottleneck independent of the seafarer's competence."},
  ],
  es:[
    {name:"Interrupciones prolongadas",desc:"Una pausa de carrera larga puede exigir un curso de actualizacion y retrasa el acceso al tiempo de mar calificante para el siguiente grado."},
    {name:"Reprobar un examen STCW",desc:"Reprobar el examen oral o escrito a menudo obliga a acumular tiempo de mar adicional antes de poder repetirlo."},
    {name:"Certificados no renovados",desc:"Un certificado de seguridad vencido (Basic Safety Training, Medical Care) bloquea el embarque hasta renovarlo, incluso si el tiempo de mar es suficiente."},
    {name:"Puestos vacantes escasos",desc:"En algunas companias, el numero limitado de puestos en el grado superior crea un cuello de botella independiente de la competencia del marino."},
  ],
  pt:[
    {name:"Interrupcoes prolongadas",desc:"Uma pausa de carreira longa pode exigir um curso de atualizacao e atrasa o acesso ao tempo de mar qualificante para o posto seguinte."},
    {name:"Reprovar em exame STCW",desc:"Reprovar no exame oral ou escrito muitas vezes exige acumular tempo de mar adicional antes de poder refaze-lo."},
    {name:"Certificados nao renovados",desc:"Um certificado de seguranca vencido (Basic Safety Training, Medical Care) bloqueia o embarque ate ser renovado, mesmo que o tempo de mar seja suficiente."},
    {name:"Vagas escassas",desc:"Em algumas empresas, o numero limitado de vagas no posto superior cria um gargalo independente da competencia do marinheiro."},
  ],
};

const DOCS: any = {
  fr:[
    {name:"Livret de formation / temps de mer",desc:"Document officiel signe par le Capitaine ou le Chef Mecanicien a chaque embarquement. Preuve indispensable pour tout dossier STCW."},
    {name:"Certificats de securite de base",desc:"STCW A-VI/1 : survie en mer, lutte contre l'incendie, premiers secours, securite personnelle. A renouveler periodiquement (generalement tous les 5 ans)."},
    {name:"Certificat medical maritime",desc:"Delivre par un medecin agree, valide generalement 2 ans. Obligatoire pour tout embarquement, sans exception."},
    {name:"Attestations specifiques au navire vise",desc:"Tanker Familiarisation, Crowd Management, DP Basic selon le type de navire cible - a obtenir avant de postuler sur ce type de navire."},
  ],
  en:[
    {name:"Training record / sea time book",desc:"Official document signed by the Master or Chief Engineer at every embarkation. Essential proof for any STCW record."},
    {name:"Basic safety certificates",desc:"STCW A-VI/1: survival at sea, fire fighting, first aid, personal safety. Must be renewed periodically (generally every 5 years)."},
    {name:"Maritime medical certificate",desc:"Issued by an approved doctor, generally valid for 2 years. Mandatory for any embarkation, without exception."},
    {name:"Vessel-specific certificates",desc:"Tanker Familiarisation, Crowd Management, DP Basic depending on the target vessel type - to be obtained before applying for that type of vessel."},
  ],
  es:[
    {name:"Libro de formacion / tiempo de mar",desc:"Documento oficial firmado por el Capitan o el Jefe de Maquinas en cada embarque. Prueba indispensable para cualquier expediente STCW."},
    {name:"Certificados de seguridad basicos",desc:"STCW A-VI/1: supervivencia en el mar, lucha contra incendios, primeros auxilios, seguridad personal. Deben renovarse periodicamente (generalmente cada 5 anos)."},
    {name:"Certificado medico maritimo",desc:"Emitido por un medico autorizado, valido generalmente por 2 anos. Obligatorio para cualquier embarque, sin excepcion."},
    {name:"Certificados especificos del buque objetivo",desc:"Tanker Familiarisation, Crowd Management, DP Basic segun el tipo de buque objetivo - deben obtenerse antes de postular a ese tipo de buque."},
  ],
  pt:[
    {name:"Livro de formacao / tempo de mar",desc:"Documento oficial assinado pelo Comandante ou Chefe de Maquinas em cada embarque. Prova indispensavel para qualquer registro STCW."},
    {name:"Certificados de seguranca basicos",desc:"STCW A-VI/1: sobrevivencia no mar, combate a incendio, primeiros socorros, seguranca pessoal. Devem ser renovados periodicamente (geralmente a cada 5 anos)."},
    {name:"Atestado medico maritimo",desc:"Emitido por um medico credenciado, geralmente valido por 2 anos. Obrigatorio para qualquer embarque, sem excecao."},
    {name:"Certificados especificos do navio almejado",desc:"Tanker Familiarisation, Crowd Management, DP Basic conforme o tipo de navio almejado - devem ser obtidos antes de se candidatar a esse tipo de navio."},
  ],
};

const BREAKS: any = {
  fr:[
    {name:"Pause courte (moins de 6 mois)",desc:"Generalement sans impact majeur. Les certificats restent valides et le temps de mer reprend normalement a l'embarquement suivant."},
    {name:"Pause moyenne (6 a 24 mois)",desc:"Verification obligatoire de la validite de tous les certificats de securite. Certains peuvent necessiter un renouvellement avant de reprendre la mer."},
    {name:"Pause longue (plus de 24 mois)",desc:"Une formation de remise a niveau (refresher course) est souvent exigee par l'administration du pavillon avant de reprendre le temps de mer qualifiant."},
    {name:"Changement de compagnie",desc:"Le temps de mer documente reste valide d'une compagnie a l'autre, mais les evaluations de performance recommencent a zero avec le nouvel employeur."},
  ],
  en:[
    {name:"Short break (less than 6 months)",desc:"Generally no major impact. Certificates remain valid and sea time resumes normally at the next embarkation."},
    {name:"Medium break (6 to 24 months)",desc:"Mandatory check of the validity of all safety certificates. Some may need renewal before returning to sea."},
    {name:"Long break (more than 24 months)",desc:"A refresher course is often required by the flag administration before resuming qualifying sea time."},
    {name:"Changing company",desc:"Documented sea time remains valid from one company to another, but performance evaluations start over with the new employer."},
  ],
  es:[
    {name:"Pausa corta (menos de 6 meses)",desc:"Generalmente sin impacto mayor. Los certificados siguen vigentes y el tiempo de mar se reanuda con normalidad en el proximo embarque."},
    {name:"Pausa media (6 a 24 meses)",desc:"Verificacion obligatoria de la vigencia de todos los certificados de seguridad. Algunos pueden necesitar renovacion antes de volver al mar."},
    {name:"Pausa larga (mas de 24 meses)",desc:"La administracion del pabellon suele exigir un curso de actualizacion antes de reanudar el tiempo de mar calificante."},
    {name:"Cambio de compania",desc:"El tiempo de mar documentado sigue siendo valido de una compania a otra, pero las evaluaciones de desempeno comienzan de nuevo con el nuevo empleador."},
  ],
  pt:[
    {name:"Pausa curta (menos de 6 meses)",desc:"Geralmente sem impacto maior. Os certificados permanecem validos e o tempo de mar retoma normalmente no proximo embarque."},
    {name:"Pausa media (6 a 24 meses)",desc:"Verificacao obrigatoria da validade de todos os certificados de seguranca. Alguns podem precisar de renovacao antes de retornar ao mar."},
    {name:"Pausa longa (mais de 24 meses)",desc:"Um curso de atualizacao costuma ser exigido pela administracao da bandeira antes de retomar o tempo de mar qualificante."},
    {name:"Mudanca de empresa",desc:"O tempo de mar documentado permanece valido de uma empresa para outra, mas as avaliacoes de desempenho recomecam do zero com o novo empregador."},
  ],
};

const BANK: any = {
  fr:[
    {q:"Quel document doit imperativement etre signe a chaque embarquement ?",opts:["Le contrat","Le livret de formation/temps de mer","Le passeport","La feuille de paie"],correct:1,expl:"Le livret de formation/temps de mer doit etre signe par le Capitaine ou le Chef Mecanicien a chaque embarquement."},
    {q:"Quelle est la duree de validite typique d'un certificat medical maritime ?",opts:["1 an","2 ans","5 ans","10 ans"],correct:1,expl:"Le certificat medical maritime est generalement valide 2 ans."},
    {q:"Quelle est la duree de validite typique des certificats de securite de base (STCW A-VI/1) ?",opts:["1 an","2 ans","5 ans","Illimitee"],correct:2,expl:"Les certificats de securite de base sont generalement valides 5 ans avant renouvellement."},
    {q:"Quel facteur accelere le plus souvent la progression de carriere ?",opts:["Rester sur le meme type de navire","Une experience variee sur plusieurs types de navires","Eviter les formations optionnelles","Minimiser le temps de mer"],correct:1,expl:"Une experience variee developpe des competences transferables valorisees par les compagnies."},
    {q:"Que se passe-t-il en cas d'echec a un examen STCW ?",opts:["Le grade est perdu definitivement","Il faut souvent accumuler du temps de mer supplementaire avant de repasser","Aucune consequence","Le marin est automatiquement reclasse"],correct:1,expl:"Un echec oblige generalement a accumuler du temps de mer supplementaire avant un nouveau passage."},
    {q:"A partir de combien de mois d'interruption une formation de remise a niveau est-elle generalement exigee ?",opts:["3 mois","12 mois","Plus de 24 mois","Jamais"],correct:2,expl:"Au-dela de 24 mois d'interruption, une formation de remise a niveau est generalement exigee."},
    {q:"Que devient le temps de mer deja accumule en cas de changement de compagnie ?",opts:["Il est perdu","Il reste valide et documente","Il doit etre revalide par examen","Il est divise par deux"],correct:1,expl:"Le temps de mer documente reste valide independamment de la compagnie."},
    {q:"Quelle cause a ete identifiee dans l'accident de l'Exxon Valdez (1989) ?",opts:["Panne de radar","Manque d'experience specifique de l'officier a la barre dans ce chenal","Erreur de chargement","Defaillance mecanique"],correct:1,expl:"Le troisieme officier manquait de l'experience et du repos necessaires pour ce chenal specifique."},
    {q:"Quel type de dommage a cause l'Exxon Valdez ?",opts:["Incendie a bord","Une des plus grandes marees noires de l'histoire","Collision avec un autre navire","Naufrage total"],correct:1,expl:"L'echouement a provoque une des plus grandes marees noires de l'histoire maritime."},
    {q:"Le temps de mer minimum reglementaire represente :",opts:["La moyenne reelle observee","Un plancher fixe par la convention STCW","Un maximum a ne pas depasser","Une simple recommandation"],correct:1,expl:"C'est un minimum reglementaire, pas une moyenne : le temps reel est souvent plus long."},
    {q:"Quelle formation specifique est necessaire pour un poste sur navire a passagers, en plus du certificat de base ?",opts:["Tanker Advanced","Crowd Management / Crisis Management V/2","DP Advanced","HUET"],correct:1,expl:"Le V/2 (Crowd Management / Crisis Management) est specifique aux navires a passagers."},
    {q:"Qui evalue la performance d'un marin a chaque embarquement ?",opts:["L'ecole maritime","Le Capitaine ou le Chef Mecanicien","L'administration du pavillon uniquement","Le syndicat"],correct:1,expl:"Le Capitaine ou le Chef Mecanicien evalue la performance a bord a chaque embarquement."},
    {q:"Quelle est la principale raison du goulot d'etranglement pour l'acces au grade superieur dans certaines compagnies ?",opts:["Manque de certificats disponibles","Nombre limite de postes vacants","Cout des examens","Duree du temps de mer trop courte"],correct:1,expl:"Le nombre limite de postes vacants au grade superieur cree parfois un goulot d'etranglement."},
    {q:"Le certificat STCW II/2 (Chief Mate) est-il toujours illimite en jauge ?",opts:["Oui, toujours","Non, il existe une version limitee et une illimitee selon la jauge du navire","Non, il n'existe qu'une version limitee","Cela depend uniquement de la nationalite"],correct:1,expl:"Il existe une version limitee et une illimitee selon la jauge du navire concerne."},
    {q:"Quelle est la consequence principale d'un certificat de securite expire au moment d'embarquer ?",opts:["Aucune, on peut embarquer quand meme","L'embarquement est bloque jusqu'au renouvellement","Une amende est appliquee","Le grade est retrograde"],correct:1,expl:"Un certificat de securite expire bloque l'embarquement jusqu'a son renouvellement."},
  ],
  en:[
    {q:"Which document must always be signed at every embarkation?",opts:["The contract","The training record / sea time book","The passport","The payslip"],correct:1,expl:"The training record / sea time book must be signed by the Master or Chief Engineer at every embarkation."},
    {q:"What is the typical validity period of a maritime medical certificate?",opts:["1 year","2 years","5 years","10 years"],correct:1,expl:"The maritime medical certificate is generally valid for 2 years."},
    {q:"What is the typical validity period of basic safety certificates (STCW A-VI/1)?",opts:["1 year","2 years","5 years","Unlimited"],correct:2,expl:"Basic safety certificates are generally valid for 5 years before renewal."},
    {q:"Which factor most often speeds up career progression?",opts:["Staying on the same vessel type","Varied experience across several vessel types","Avoiding optional training","Minimizing sea time"],correct:1,expl:"Varied experience develops transferable skills valued by companies."},
    {q:"What happens if a seafarer fails an STCW exam?",opts:["The rank is permanently lost","Additional sea time is often required before retaking it","No consequence","The seafarer is automatically reclassified"],correct:1,expl:"A failure generally requires accumulating additional sea time before a new attempt."},
    {q:"After how many months of interruption is refresher training generally required?",opts:["3 months","12 months","More than 24 months","Never"],correct:2,expl:"Beyond 24 months of interruption, refresher training is generally required."},
    {q:"What happens to already accumulated sea time when changing company?",opts:["It is lost","It remains valid and documented","It must be revalidated by exam","It is halved"],correct:1,expl:"Documented sea time remains valid regardless of the company."},
    {q:"What cause was identified in the Exxon Valdez accident (1989)?",opts:["Radar failure","Lack of specific experience of the officer at the helm in that channel","Loading error","Mechanical failure"],correct:1,expl:"The third mate lacked the experience and rest required for that specific channel."},
    {q:"What kind of damage did the Exxon Valdez cause?",opts:["Fire on board","One of the largest oil spills in history","Collision with another vessel","Total sinking"],correct:1,expl:"The grounding caused one of the largest oil spills in maritime history."},
    {q:"The regulatory minimum sea time represents:",opts:["The actual average observed","A floor set by the STCW convention","A maximum not to be exceeded","A simple recommendation"],correct:1,expl:"It is a regulatory minimum, not an average: real time is often longer."},
    {q:"Which specific training is needed for a position on a passenger ship, beyond the base certificate?",opts:["Tanker Advanced","Crowd Management / Crisis Management V/2","DP Advanced","HUET"],correct:1,expl:"V/2 (Crowd Management / Crisis Management) is specific to passenger ships."},
    {q:"Who evaluates a seafarer's performance at every embarkation?",opts:["The maritime school","The Master or Chief Engineer","The flag administration only","The union"],correct:1,expl:"The Master or Chief Engineer evaluates on-board performance at every embarkation."},
    {q:"What is the main reason for the bottleneck accessing the next rank in some companies?",opts:["Lack of available certificates","Limited number of vacant positions","Cost of exams","Sea time too short"],correct:1,expl:"A limited number of vacant positions at the next rank sometimes creates a bottleneck."},
    {q:"Is the STCW II/2 (Chief Mate) certificate always unlimited in tonnage?",opts:["Yes, always","No, there is a limited and an unlimited version depending on vessel tonnage","No, only a limited version exists","It depends only on nationality"],correct:1,expl:"There is a limited and an unlimited version depending on the tonnage of the vessel concerned."},
    {q:"What is the main consequence of an expired safety certificate when joining a vessel?",opts:["None, you can still embark","Embarkation is blocked until renewal","A fine is applied","The rank is demoted"],correct:1,expl:"An expired safety certificate blocks embarkation until it is renewed."},
  ],
  es:[
    {q:"Que documento debe firmarse siempre en cada embarque?",opts:["El contrato","El libro de formacion / tiempo de mar","El pasaporte","La nomina"],correct:1,expl:"El libro de formacion / tiempo de mar debe ser firmado por el Capitan o el Jefe de Maquinas en cada embarque."},
    {q:"Cual es la vigencia tipica de un certificado medico maritimo?",opts:["1 ano","2 anos","5 anos","10 anos"],correct:1,expl:"El certificado medico maritimo es generalmente valido por 2 anos."},
    {q:"Cual es la vigencia tipica de los certificados de seguridad basicos (STCW A-VI/1)?",opts:["1 ano","2 anos","5 anos","Ilimitada"],correct:2,expl:"Los certificados de seguridad basicos son generalmente validos por 5 anos antes de renovarse."},
    {q:"Que factor suele acelerar mas la progresion de carrera?",opts:["Permanecer en el mismo tipo de buque","Experiencia variada en varios tipos de buque","Evitar formaciones opcionales","Minimizar el tiempo de mar"],correct:1,expl:"Una experiencia variada desarrolla competencias transferibles valoradas por las companias."},
    {q:"Que ocurre si un marino reprueba un examen STCW?",opts:["El grado se pierde definitivamente","A menudo se requiere tiempo de mar adicional antes de repetirlo","Ninguna consecuencia","El marino es reclasificado automaticamente"],correct:1,expl:"Reprobar generalmente exige acumular tiempo de mar adicional antes de un nuevo intento."},
    {q:"A partir de cuantos meses de interrupcion se exige generalmente un curso de actualizacion?",opts:["3 meses","12 meses","Mas de 24 meses","Nunca"],correct:2,expl:"Mas alla de 24 meses de interrupcion, generalmente se exige un curso de actualizacion."},
    {q:"Que ocurre con el tiempo de mar ya acumulado al cambiar de compania?",opts:["Se pierde","Sigue siendo valido y documentado","Debe revalidarse mediante examen","Se reduce a la mitad"],correct:1,expl:"El tiempo de mar documentado sigue siendo valido independientemente de la compania."},
    {q:"Que causa se identifico en el accidente del Exxon Valdez (1989)?",opts:["Fallo de radar","Falta de experiencia especifica del oficial al timon en ese canal","Error de carga","Fallo mecanico"],correct:1,expl:"El tercer oficial carecia de la experiencia y el descanso necesarios para ese canal especifico."},
    {q:"Que tipo de dano causo el Exxon Valdez?",opts:["Incendio a bordo","Uno de los mayores derrames de petroleo de la historia","Colision con otro buque","Hundimiento total"],correct:1,expl:"El encallamiento causo uno de los mayores derrames de petroleo de la historia maritima."},
    {q:"El tiempo de mar minimo reglamentario representa:",opts:["El promedio real observado","Un piso fijado por el convenio STCW","Un maximo que no debe superarse","Una simple recomendacion"],correct:1,expl:"Es un minimo reglamentario, no un promedio: el tiempo real suele ser mayor."},
    {q:"Que formacion especifica se necesita para un puesto en un buque de pasaje, ademas del certificado base?",opts:["Tanker Advanced","Crowd Management / Crisis Management V/2","DP Advanced","HUET"],correct:1,expl:"El V/2 (Crowd Management / Crisis Management) es especifico de los buques de pasaje."},
    {q:"Quien evalua el desempeno de un marino en cada embarque?",opts:["La escuela maritima","El Capitan o el Jefe de Maquinas","Solo la administracion del pabellon","El sindicato"],correct:1,expl:"El Capitan o el Jefe de Maquinas evalua el desempeno a bordo en cada embarque."},
    {q:"Cual es la principal razon del cuello de botella para acceder al grado superior en algunas companias?",opts:["Falta de certificados disponibles","Numero limitado de puestos vacantes","Costo de los examenes","Tiempo de mar demasiado corto"],correct:1,expl:"El numero limitado de puestos vacantes en el grado superior a veces crea un cuello de botella."},
    {q:"El certificado STCW II/2 (Chief Mate) es siempre ilimitado en arqueo?",opts:["Si, siempre","No, existe una version limitada y una ilimitada segun el arqueo del buque","No, solo existe una version limitada","Depende unicamente de la nacionalidad"],correct:1,expl:"Existe una version limitada y una ilimitada segun el arqueo del buque en cuestion."},
    {q:"Cual es la principal consecuencia de un certificado de seguridad vencido al momento de embarcar?",opts:["Ninguna, se puede embarcar igual","El embarque queda bloqueado hasta la renovacion","Se aplica una multa","El grado es degradado"],correct:1,expl:"Un certificado de seguridad vencido bloquea el embarque hasta su renovacion."},
  ],
  pt:[
    {q:"Qual documento deve ser sempre assinado em cada embarque?",opts:["O contrato","O livro de formacao / tempo de mar","O passaporte","O contracheque"],correct:1,expl:"O livro de formacao / tempo de mar deve ser assinado pelo Comandante ou Chefe de Maquinas em cada embarque."},
    {q:"Qual e a validade tipica de um atestado medico maritimo?",opts:["1 ano","2 anos","5 anos","10 anos"],correct:1,expl:"O atestado medico maritimo e geralmente valido por 2 anos."},
    {q:"Qual e a validade tipica dos certificados de seguranca basicos (STCW A-VI/1)?",opts:["1 ano","2 anos","5 anos","Ilimitada"],correct:2,expl:"Os certificados de seguranca basicos sao geralmente validos por 5 anos antes da renovacao."},
    {q:"Qual fator costuma acelerar mais a progressao de carreira?",opts:["Permanecer no mesmo tipo de navio","Experiencia variada em varios tipos de navio","Evitar treinamentos opcionais","Minimizar o tempo de mar"],correct:1,expl:"Uma experiencia variada desenvolve competencias transferiveis valorizadas pelas empresas."},
    {q:"O que acontece se um marinheiro reprovar em um exame STCW?",opts:["O posto e perdido definitivamente","Frequentemente e necessario tempo de mar adicional antes de refazer","Nenhuma consequencia","O marinheiro e automaticamente reclassificado"],correct:1,expl:"Reprovar geralmente exige acumular tempo de mar adicional antes de uma nova tentativa."},
    {q:"A partir de quantos meses de interrupcao um curso de atualizacao e geralmente exigido?",opts:["3 meses","12 meses","Mais de 24 meses","Nunca"],correct:2,expl:"Alem de 24 meses de interrupcao, um curso de atualizacao e geralmente exigido."},
    {q:"O que acontece com o tempo de mar ja acumulado ao mudar de empresa?",opts:["E perdido","Permanece valido e documentado","Deve ser revalidado por exame","E reduzido pela metade"],correct:1,expl:"O tempo de mar documentado permanece valido independentemente da empresa."},
    {q:"Qual causa foi identificada no acidente do Exxon Valdez (1989)?",opts:["Falha de radar","Falta de experiencia especifica do oficial ao leme naquele canal","Erro de carregamento","Falha mecanica"],correct:1,expl:"O terceiro oficial carecia da experiencia e do descanso necessarios para aquele canal especifico."},
    {q:"Que tipo de dano o Exxon Valdez causou?",opts:["Incendio a bordo","Um dos maiores derramamentos de petroleo da historia","Colisao com outro navio","Naufragio total"],correct:1,expl:"O encalhe causou um dos maiores derramamentos de petroleo da historia maritima."},
    {q:"O tempo de mar minimo regulamentar representa:",opts:["A media real observada","Um piso fixado pela convencao STCW","Um maximo a nao ser ultrapassado","Uma simples recomendacao"],correct:1,expl:"E um minimo regulamentar, nao uma media: o tempo real costuma ser maior."},
    {q:"Qual treinamento especifico e necessario para um posto em navio de passageiros, alem do certificado base?",opts:["Tanker Advanced","Crowd Management / Crisis Management V/2","DP Advanced","HUET"],correct:1,expl:"O V/2 (Crowd Management / Crisis Management) e especifico dos navios de passageiros."},
    {q:"Quem avalia o desempenho de um marinheiro em cada embarque?",opts:["A escola maritima","O Comandante ou o Chefe de Maquinas","Somente a administracao da bandeira","O sindicato"],correct:1,expl:"O Comandante ou o Chefe de Maquinas avalia o desempenho a bordo em cada embarque."},
    {q:"Qual e a principal razao do gargalo para acessar o posto superior em algumas empresas?",opts:["Falta de certificados disponiveis","Numero limitado de vagas","Custo dos exames","Tempo de mar muito curto"],correct:1,expl:"O numero limitado de vagas no posto superior as vezes cria um gargalo."},
    {q:"O certificado STCW II/2 (Chief Mate) e sempre ilimitado em arqueacao?",opts:["Sim, sempre","Nao, existe uma versao limitada e uma ilimitada conforme a arqueacao do navio","Nao, existe apenas uma versao limitada","Depende apenas da nacionalidade"],correct:1,expl:"Existe uma versao limitada e uma ilimitada conforme a arqueacao do navio em questao."},
    {q:"Qual e a principal consequencia de um certificado de seguranca vencido no momento do embarque?",opts:["Nenhuma, pode-se embarcar mesmo assim","O embarque fica bloqueado ate a renovacao","Uma multa e aplicada","O posto e rebaixado"],correct:1,expl:"Um certificado de seguranca vencido bloqueia o embarque ate sua renovacao."},
  ],
};

const QUIZ: any = {
  fr:[
    {q:"Quel document prouve officiellement le temps de mer d'un marin ?",opts:["Le contrat de travail","Le livret de formation signe","Le passeport","La carte d'identite"],correct:1,exp:"Le livret de formation signe par le Capitaine ou le Chef Mecanicien constitue la preuve officielle."},
    {q:"Que faut-il generalement au-dela de 24 mois d'interruption de carriere ?",opts:["Rien de particulier","Une formation de remise a niveau","Un nouvel examen d'entree","Repartir de cadet"],correct:1,exp:"Une interruption longue exige generalement une formation de remise a niveau (refresher course)."},
    {q:"Qu'est-ce qui accelere le plus la progression de carriere selon cette lecon ?",opts:["Rester sur le meme navire","Une experience variee et des evaluations positives","Eviter les formations","Minimiser le temps de mer"],correct:1,exp:"L'experience variee et les evaluations positives sont les facteurs les plus determinants."},
    {q:"Quelle est la lecon principale du cas Exxon Valdez pour la progression de carriere ?",opts:["Le certificat suffit toujours","L'experience specifique a la tache compte autant que le certificat","La vitesse est plus importante que la prudence","Le grade protege de toute erreur"],correct:1,exp:"Un certificat valide sur le papier ne remplace pas l'experience specifique requise pour une tache donnee."},
    {q:"Le temps de mer minimum reglementaire STCW represente :",opts:["Une moyenne garantie","Un plancher, pas une moyenne","Un maximum legal","Une simple suggestion"],correct:1,exp:"C'est un minimum fixe par la convention STCW, le temps reel est souvent plus long."},
  ],
  en:[
    {q:"Which document officially proves a seafarer's sea time?",opts:["The employment contract","The signed training record book","The passport","The ID card"],correct:1,exp:"The training record book signed by the Master or Chief Engineer is the official proof."},
    {q:"What is generally required beyond 24 months of career interruption?",opts:["Nothing special","Refresher training","A new entrance exam","Starting over as a cadet"],correct:1,exp:"A long interruption generally requires refresher training."},
    {q:"What most speeds up career progression according to this lesson?",opts:["Staying on the same vessel","Varied experience and positive evaluations","Avoiding training","Minimizing sea time"],correct:1,exp:"Varied experience and positive evaluations are the most decisive factors."},
    {q:"What is the main lesson from the Exxon Valdez case for career progression?",opts:["A certificate is always enough","Task-specific experience matters as much as the certificate","Speed matters more than caution","Rank protects against any error"],correct:1,exp:"A certificate valid on paper does not replace the specific experience required for a given task."},
    {q:"The STCW regulatory minimum sea time represents:",opts:["A guaranteed average","A floor, not an average","A legal maximum","A simple suggestion"],correct:1,exp:"It is a minimum set by the STCW convention; real time is often longer."},
  ],
  es:[
    {q:"Que documento prueba oficialmente el tiempo de mar de un marino?",opts:["El contrato de trabajo","El libro de formacion firmado","El pasaporte","El carnet de identidad"],correct:1,exp:"El libro de formacion firmado por el Capitan o el Jefe de Maquinas es la prueba oficial."},
    {q:"Que se exige generalmente mas alla de 24 meses de interrupcion de carrera?",opts:["Nada en particular","Un curso de actualizacion","Un nuevo examen de ingreso","Volver a empezar como cadete"],correct:1,exp:"Una interrupcion larga generalmente exige un curso de actualizacion."},
    {q:"Que acelera mas la progresion de carrera segun esta leccion?",opts:["Permanecer en el mismo buque","Experiencia variada y evaluaciones positivas","Evitar formaciones","Minimizar el tiempo de mar"],correct:1,exp:"La experiencia variada y las evaluaciones positivas son los factores mas decisivos."},
    {q:"Cual es la leccion principal del caso Exxon Valdez para la progresion de carrera?",opts:["El certificado siempre basta","La experiencia especifica de la tarea cuenta tanto como el certificado","La velocidad importa mas que la prudencia","El grado protege de cualquier error"],correct:1,exp:"Un certificado valido en el papel no sustituye la experiencia especifica requerida para una tarea dada."},
    {q:"El tiempo de mar minimo reglamentario STCW representa:",opts:["Un promedio garantizado","Un piso, no un promedio","Un maximo legal","Una simple sugerencia"],correct:1,exp:"Es un minimo fijado por el convenio STCW; el tiempo real suele ser mayor."},
  ],
  pt:[
    {q:"Qual documento comprova oficialmente o tempo de mar de um marinheiro?",opts:["O contrato de trabalho","O livro de formacao assinado","O passaporte","A carteira de identidade"],correct:1,exp:"O livro de formacao assinado pelo Comandante ou Chefe de Maquinas e a prova oficial."},
    {q:"O que geralmente e exigido alem de 24 meses de interrupcao de carreira?",opts:["Nada em especial","Um curso de atualizacao","Um novo exame de admissao","Recomecar como cadete"],correct:1,exp:"Uma interrupcao longa geralmente exige um curso de atualizacao."},
    {q:"O que mais acelera a progressao de carreira segundo esta licao?",opts:["Permanecer no mesmo navio","Experiencia variada e avaliacoes positivas","Evitar treinamentos","Minimizar o tempo de mar"],correct:1,exp:"A experiencia variada e as avaliacoes positivas sao os fatores mais decisivos."},
    {q:"Qual e a principal licao do caso Exxon Valdez para a progressao de carreira?",opts:["O certificado sempre basta","A experiencia especifica da tarefa conta tanto quanto o certificado","A velocidade importa mais que a prudencia","O posto protege de qualquer erro"],correct:1,exp:"Um certificado valido no papel nao substitui a experiencia especifica exigida para uma tarefa dada."},
    {q:"O tempo de mar minimo regulamentar STCW representa:",opts:["Uma media garantida","Um piso, nao uma media","Um maximo legal","Uma simples sugestao"],correct:1,exp:"E um minimo fixado pela convencao STCW; o tempo real costuma ser maior."},
  ],
};

const MONTHS=[12,6,12,12,0];

function RoadmapView({ lang, onBack }:{ lang:string; onBack:()=>void }) {
  const t=T[lang]||T.fr;
  const profile=loadProfile();
  const hasValidProfile=profile&&typeof profile.currentIdx==="number"&&typeof profile.targetIdx==="number"&&profile.currentIdx>=0&&profile.targetIdx>=0&&profile.targetIdx>profile.currentIdx;

  if(!hasValidProfile){
    return (
      <div style={{borderRadius:14,background:"rgba(10,22,40,0.85)",border:`1px solid ${C.danger}44`,padding:16,marginBottom:20}}>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",fontFamily:"Courier New",lineHeight:1.6,marginBottom:12}}>{t.noProfileMsg}</div>
        <button onClick={onBack} style={{width:"100%",padding:"11px 0",borderRadius:10,border:`1px solid ${C.primary}66`,
          background:`${C.primary}1a`,color:C.accent,fontSize:12,fontWeight:700,fontFamily:"Courier New",cursor:"pointer"}}>{t.goToL1}</button>
      </div>
    );
  }

  const dept=profile.dept==="engine"?"engine":"deck";
  const ranks=(RANKS[lang]||RANKS.fr)[dept];
  const steps=(STEPINFO[lang]||STEPINFO.fr)[dept];
  const {currentIdx,targetIdx}=profile;
  let total=0;
  for(let i=currentIdx;i<targetIdx;i++) total+=MONTHS[i];

  return (
    <div style={{borderRadius:14,background:"rgba(10,22,40,0.85)",border:`1px solid ${C.primary}33`,padding:16,marginBottom:20}}>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.accent,marginBottom:14}}>{t.roadmapTitle}</div>
      {ranks.slice(currentIdx,targetIdx+1).map((rankName:string,i:number)=>{
        const realIdx=currentIdx+i;
        const isFirst=realIdx===currentIdx;
        const isLast=realIdx===targetIdx;
        const info=steps[realIdx];
        return (
          <div key={realIdx} style={{display:"flex",gap:12,marginBottom:i===targetIdx-currentIdx?0:6}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:16,flexShrink:0}}>
              <div style={{width:12,height:12,borderRadius:"50%",background:isFirst?C.secondary:isLast?C.gold:C.primary,flexShrink:0}}/>
              {!isLast&&<div style={{width:2,flex:1,minHeight:36,background:`${C.primary}44`}}/>}
            </div>
            <div style={{flex:1,paddingBottom:16}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:13,color:"#f0f4ff",fontWeight:700}}>{rankName}</div>
                {isFirst&&<div style={{fontSize:9,color:C.secondary,fontFamily:"Courier New",border:`1px solid ${C.secondary}66`,borderRadius:6,padding:"2px 6px"}}>{t.stepCurrent}</div>}
                {isLast&&<div style={{fontSize:9,color:C.gold,fontFamily:"Courier New",border:`1px solid ${C.gold}66`,borderRadius:6,padding:"2px 6px"}}>{t.stepTarget}</div>}
              </div>
              <div style={{fontSize:11,color:"rgba(240,244,255,0.7)",fontFamily:"Courier New",lineHeight:1.6}}>
                <div>{t.certLabel} : {info.cert}</div>
                <div>{t.seatimeLabel} : {info.seatime}</div>
                <div style={{color:"rgba(240,244,255,0.5)",marginTop:2}}>{info.notes}</div>
              </div>
            </div>
          </div>
        );
      })}
      <div style={{marginTop:8,padding:12,borderRadius:10,background:`${C.gold}14`,border:`1px solid ${C.gold}44`,fontSize:12,color:C.gold,fontFamily:"Courier New",textAlign:"center"}}>
        {t.totalLabel} : {total} {lang==="fr"?"mois":lang==="en"?"months":lang==="es"?"meses":"meses"}
      </div>
      <div style={{marginTop:8,fontSize:10,color:"rgba(240,244,255,0.4)",fontStyle:"italic",fontFamily:"Courier New",lineHeight:1.5}}>{t.disclaimer}</div>
    </div>
  );
}

function TapGrid({ items, hint }:{ items:{name:string;desc:string}[]; hint:string }) {
  const [sel,setSel]=useState<number|null>(null);
  return (
    <div style={{marginBottom:20}}>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:10}}>
        {items.map((it,i)=>(
          <button key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            padding:"9px 13px",borderRadius:10,cursor:"pointer",fontSize:12,fontFamily:"Courier New",
            border:`1.5px solid ${sel===i?C.primary:"rgba(255,255,255,0.15)"}`,
            background:sel===i?`${C.primary}22`:"rgba(255,255,255,0.04)",
            color:sel===i?C.accent:"rgba(240,244,255,0.7)",fontWeight:sel===i?700:400}}>{it.name}</button>
        ))}
      </div>
      {sel===null?(
        <div style={{fontSize:11,color:"rgba(240,244,255,0.4)",fontFamily:"Courier New"}}>{hint}</div>
      ):(
        <div style={{padding:12,borderRadius:10,background:"rgba(10,22,40,0.8)",border:`1px solid ${C.primary}33`,
          fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New"}}>{items[sel].desc}</div>
      )}
    </div>
  );
}

function AccidentCase({ lang }:{ lang:string }) {
  const t=T[lang]||T.fr;
  const [open,setOpen]=useState(false);
  return (
    <div style={{borderRadius:14,background:"rgba(13,31,60,0.6)",border:`1px solid ${C.gold}44`,padding:14,marginBottom:20}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}} onClick={()=>setOpen(!open)}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:13,color:C.gold}}>{t.accidentTitle}</div>
        <div style={{fontSize:11,color:C.gold,fontFamily:"Courier New"}}>{open?"-":"+"} {t.accidentToggle}</div>
      </div>
      {open&&<div style={{marginTop:10,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{t.accidentText}</div>}
    </div>
  );
}

function Exercises({ lang }:{ lang:string }) {
  const t=T[lang]||T.fr;
  const [vals,setVals]=useState<string[]>(["","",""]);
  const [shown,setShown]=useState<boolean[]>([false,false,false]);

  const profile=loadProfile();
  const hasValid=profile&&typeof profile.currentIdx==="number"&&typeof profile.targetIdx==="number"&&profile.targetIdx>profile.currentIdx;
  const dept=hasValid&&profile.dept==="engine"?"engine":"deck";
  const ranks=(RANKS[lang]||RANKS.fr)[dept];
  const currentIdx=hasValid?profile.currentIdx:0;
  const targetIdx=hasValid?profile.targetIdx:ranks.length-1;
  const currentLabel=hasValid?profile.current:ranks[0];
  const targetLabel=hasValid?profile.target:ranks[ranks.length-1];
  let total=0;
  for(let i=currentIdx;i<targetIdx;i++) total+=MONTHS[i];
  const stepsText=ranks.slice(currentIdx,targetIdx+1).join(" -> ");

  const ex=[
    {q:t.exq1.replace("{current}",currentLabel).replace("{target}",targetLabel),
     a:`${stepsText}. ${t.exq1connect} ${total} ${t.exq1suffix}`},
    ...t.exStatic,
  ];

  return (
    <div style={{marginBottom:20}}>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.accent,margin:"20px 0 14px"}}>{t.exTitle}</div>
      {ex.map((e:any,i:number)=>(
        <div key={i} style={{marginBottom:16,padding:12,borderRadius:12,background:"rgba(10,22,40,0.7)",border:"1px solid rgba(255,255,255,0.08)"}}>
          <div style={{fontSize:12,color:"#e0e8ff",marginBottom:8,fontFamily:"Courier New",lineHeight:1.6}}>{e.q}</div>
          <input value={vals[i]} onChange={ev=>{const n=[...vals];n[i]=ev.target.value;setVals(n);}}
            placeholder="..." style={{width:"100%",padding:"10px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.15)",
            background:"rgba(6,14,26,0.8)",color:"#f0f4ff",fontSize:12,fontFamily:"Courier New",marginBottom:8,boxSizing:"border-box"}}/>
          <button onClick={()=>{const n=[...shown];n[i]=!n[i];setShown(n);}} style={{background:"none",border:"none",
            color:C.accent,fontSize:11,fontFamily:"Courier New",cursor:"pointer",padding:0}}>{shown[i]?t.hideAnswer:t.showAnswer}</button>
          {shown[i]&&<div style={{marginTop:8,padding:10,borderRadius:8,background:"rgba(74,222,128,0.08)",
            borderLeft:"3px solid #4ade80",fontSize:11,color:"rgba(240,244,255,0.85)",lineHeight:1.6,fontFamily:"Courier New"}}>{e.a}</div>}
        </div>
      ))}
    </div>
  );
}

function QuestionBank({ lang }:{ lang:string }) {
  const bank=BANK[lang]||BANK.fr;
  const [shuffled]=useState(()=>bank.map(shuffleQuestionOptions));
  const [bankIdx,setBankIdx]=useState<number|null>(null);
  const [bankCur,setBankCur]=useState(0);
  const [bankSel,setBankSel]=useState<number|null>(null);
  const [bankScore,setBankScore]=useState(0);
  const [bankDone,setBankDone]=useState(false);
  const L:any={fr:{title:"Banque de questions",start:"COMMENCER =>",next:"SUIVANT =>",trophy:"TERMINER"},en:{title:"Question Bank",start:"START =>",next:"NEXT =>",trophy:"FINISH"},es:{title:"Banco de preguntas",start:"COMENZAR =>",next:"SIGUIENTE =>",trophy:"TERMINAR"},pt:{title:"Banco de questoes",start:"COMECAR =>",next:"PROXIMO =>",trophy:"TERMINAR"}};
  const l=L[lang]||L.fr;
  const startBank=()=>{setBankIdx(0);setBankCur(0);setBankSel(null);setBankScore(0);setBankDone(false);};
  const pickBank=(i:number)=>{if(bankSel!==null)return;setBankSel(i);if(i===shuffled[bankCur].correct)setBankScore(s=>s+1);};
  const bankNext=()=>{if(bankCur+1>=bank.length){setBankDone(true);return;}setBankCur(c=>c+1);setBankSel(null);};
  return (
    <div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.gold,margin:"20px 0 14px"}}>{l.title} (15)</div>
      {bankIdx===null&&!bankDone&&(
        <button onClick={startBank} style={{width:"100%",padding:"14px 0",borderRadius:12,background:`linear-gradient(135deg,${C.primary},${C.gold})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,color:"#060e1a",cursor:"pointer",letterSpacing:2}}>{l.start}</button>
      )}
      {bankIdx!==null&&!bankDone&&(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:10,fontSize:11,color:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>
            <span>Q{bankCur+1}/{bank.length}</span>
            <span style={{color:C.primary}}>{bankScore}</span>
          </div>
          <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",marginBottom:12}}>
            <div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C.primary},${C.gold})`,width:`${(bankCur/bank.length)*100}%`,transition:"width 0.3s"}}/>
          </div>
          <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New",marginBottom:12,padding:12,borderRadius:10,background:"rgba(10,22,40,0.8)",border:`1px solid ${C.primary}22`}}>{shuffled[bankCur].q}</div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
            {shuffled[bankCur].opts.map((opt:string,oi:number)=>{
              let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.12)",col="rgba(240,244,255,0.6)";
              if(bankSel!==null){
                if(oi===shuffled[bankCur].correct){bg="rgba(76,175,80,0.15)";bd="#4ade80";col="#4ade80";}
                else if(oi===bankSel){bg="rgba(239,68,68,0.15)";bd="#ef4444";col="#ef4444";}
              }
              return(<button key={oi} onClick={()=>pickBank(oi)} disabled={bankSel!==null} style={{textAlign:"left",padding:"10px 12px",borderRadius:10,border:`1.5px solid ${bd}`,background:bg,color:col,fontSize:12,fontFamily:"Courier New",cursor:bankSel===null?"pointer":"default",lineHeight:1.4}}>{opt}</button>);
            })}
          </div>
          {bankSel!==null&&(
            <div>
              <div style={{padding:12,borderRadius:10,background:"rgba(13,31,60,0.8)",borderLeft:`3px solid ${bankSel===shuffled[bankCur].correct?"#4ade80":"#ef4444"}`,fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New",marginBottom:10}}>{shuffled[bankCur].expl}</div>
              <button onClick={bankNext} style={{width:"100%",padding:"12px 0",borderRadius:12,background:`linear-gradient(135deg,${C.primary},${C.gold})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:"#060e1a",cursor:"pointer",letterSpacing:2}}>{bankCur+1>=bank.length?l.trophy:l.next}</button>
            </div>
          )}
        </div>
      )}
      {bankDone&&(
        <div style={{textAlign:"center",padding:16}}>
          <div style={{fontSize:36,marginBottom:8}}>{"\ud83c\udfc6"}</div>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:18,color:"#f0f4ff",marginBottom:4}}>{bankScore}/{bank.length}</div>
          <div style={{fontSize:13,color:C.gold}}>{Math.round(bankScore/bank.length*100)}%</div>
        </div>
      )}
    </div>
  );
}

function QuizTab({ lang, onComplete }:{ lang:string; onComplete:(xp:number)=>void }) {
  const quiz=QUIZ[lang]||QUIZ.fr;
  const [shuffledQuiz]=useState(()=>quiz.map(shuffleQuestionOptions));
  const t=T[lang]||T.fr;
  const [cur,setCur]=useState(0);
  const [selected,setSelected]=useState<number|null>(null);
  const [confirmed,setConfirmed]=useState(false);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);
  const L:any={fr:{submit:"Valider",next:"Suivant ->",finish:"Terminer",correct:"Correct !",wrong:"Incorrect",xpLabel:"XP obtenus",summary:"Tu as appris",retry:"Recommencer"},en:{submit:"Submit",next:"Next ->",finish:"Finish",correct:"Correct!",wrong:"Incorrect",xpLabel:"XP earned",summary:"You learned",retry:"Retry"},es:{submit:"Validar",next:"Siguiente ->",finish:"Terminar",correct:"Correcto!",wrong:"Incorrecto",xpLabel:"XP obtenidos",summary:"Aprendiste",retry:"Reintentar"},pt:{submit:"Validar",next:"Seguinte ->",finish:"Terminar",correct:"Correto!",wrong:"Incorreto",xpLabel:"XP obtidos",summary:"Voce aprendeu",retry:"Recomecar"}};
  const l=L[lang]||L.fr;
  const xp=score>=5?200:score>=4?160:score>=3?120:80;
  const optColors=[C.primary,"#6dbf8a",C.gold,"#c084fc"];

  if(done) return (
    <div style={{padding:"24px 14px"}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:42,marginBottom:8}}>{"\u2693"}</div>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:36,fontWeight:900,color:C.gold,marginBottom:4}}>{xp}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{l.xpLabel}</div>
        <div style={{marginTop:8,fontSize:14,color:"#f0f4ff",fontFamily:"Courier New"}}>Score : {score}/{quiz.length}</div>
      </div>
      <div style={{borderRadius:14,background:"rgba(10,22,40,0.8)",border:`1px solid ${C.gold}44`,padding:14,marginBottom:16}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:11,color:C.gold,marginBottom:10}}>{l.summary}</div>
        {t.kp.map((k:string,i:number)=>(
          <div key={i} style={{display:"flex",gap:8,marginBottom:6,fontSize:11,color:"rgba(240,244,255,0.7)",fontFamily:"Courier New",lineHeight:1.5}}>
            <span style={{color:C.gold,flexShrink:0}}>{"\u2726"}</span><span>{k}</span>
          </div>
        ))}
      </div>
      <button onClick={()=>onComplete(xp)} style={{width:"100%",padding:"15px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.primary},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:"#060e1a",cursor:"pointer"}}>{l.finish}</button>
      <button onClick={()=>{setCur(0);setSelected(null);setConfirmed(false);setScore(0);setDone(false);}} style={{width:"100%",padding:"12px 0",marginTop:8,border:"1px solid rgba(255,255,255,0.12)",borderRadius:14,background:"none",color:"rgba(240,244,255,0.45)",fontSize:12,cursor:"pointer",fontFamily:"Courier New"}}>{l.retry}</button>
    </div>
  );

  const q=shuffledQuiz[cur];
  const isCorrect=selected===q.correct;
  const handleConfirm=()=>{if(selected===null)return;setConfirmed(true);if(isCorrect)setScore(s=>s+1);};
  const handleNext=()=>{if(cur+1>=quiz.length){setDone(true);return;}setCur(c=>c+1);setSelected(null);setConfirmed(false);};

  return (
    <div style={{padding:"14px 14px 24px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style={{fontSize:11,color:"rgba(240,244,255,0.4)",fontFamily:"Courier New"}}>Q{cur+1}/{quiz.length}</div>
        <div style={{fontSize:11,color:C.gold,fontFamily:"Courier New"}}>{score}/{quiz.length}</div>
      </div>
      <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",marginBottom:14}}>
        <div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C.primary},${C.gold})`,width:`${(cur/quiz.length)*100}%`,transition:"width 0.4s"}}/>
      </div>
      <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New",marginBottom:16,padding:12,borderRadius:10,background:"rgba(10,22,40,0.8)",border:`1px solid ${C.primary}26`}}>{q.q}</div>
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
        ?<button onClick={handleConfirm} disabled={selected===null} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:selected!==null?`linear-gradient(135deg,${C.primary},${C.gold})`:"rgba(255,255,255,0.06)",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:selected!==null?"#060e1a":"rgba(240,244,255,0.25)",cursor:selected!==null?"pointer":"default",letterSpacing:1}}>{l.submit}</button>
        :<button onClick={handleNext} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.primary},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:"#060e1a",cursor:"pointer",letterSpacing:1}}>{cur+1>=quiz.length?l.finish:l.next}</button>
      }
    </div>
  );
}

function ContentPhase({ lang, onStartQuiz, onBack }:{ lang:string; onStartQuiz:()=>void; onBack:()=>void }) {
  const t=T[lang]||T.fr;
  const up=FACTORS_UP[lang]||FACTORS_UP.fr;
  const down=FACTORS_DOWN[lang]||FACTORS_DOWN.fr;
  const docs=DOCS[lang]||DOCS.fr;
  const breaks=BREAKS[lang]||BREAKS.fr;
  return (
    <div style={{padding:"14px 14px 24px"}}>
      <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New",marginBottom:18}}>{t.intro}</div>

      <RoadmapView lang={lang} onBack={onBack}/>

      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.accent,margin:"20px 0 10px"}}>{t.s1title}</div>
      <TapGrid items={up} hint={t.s1hint}/>

      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.accent,margin:"20px 0 10px"}}>{t.s2title}</div>
      <TapGrid items={down} hint={t.s2hint}/>

      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.accent,margin:"20px 0 10px"}}>{t.s3title}</div>
      <TapGrid items={docs} hint={t.s3hint}/>

      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.accent,margin:"20px 0 10px"}}>{t.s4title}</div>
      <TapGrid items={breaks} hint={t.s4hint}/>

      <AccidentCase lang={lang}/>
      <Exercises lang={lang}/>
      <QuestionBank lang={lang}/>

      <div style={{borderRadius:14,background:"rgba(10,22,40,0.8)",border:`1px solid ${C.gold}44`,padding:14,margin:"20px 0"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:11,color:C.gold,marginBottom:10}}>{t.keypoints}</div>
        {t.kp.map((k:string,i:number)=>(
          <div key={i} style={{display:"flex",gap:8,marginBottom:6,fontSize:11,color:"rgba(240,244,255,0.7)",fontFamily:"Courier New",lineHeight:1.5}}>
            <span style={{color:C.gold,flexShrink:0}}>{"\u2726"}</span><span>{k}</span>
          </div>
        ))}
      </div>

      <button onClick={onStartQuiz} style={{width:"100%",padding:"15px 0",border:"none",borderRadius:14,
        background:`linear-gradient(135deg,${C.primary},${C.secondary})`,fontFamily:"'Cinzel',serif",fontSize:14,
        fontWeight:700,letterSpacing:2,color:"#fff",cursor:"pointer"}}>{t.startQuiz}</button>
    </div>
  );
}

export default function LessonShipCareer_L2({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t=T[lang]||T.fr;
  const [phase,setPhase]=useState<"content"|"quiz">("content");
  const [quizDone,setQuizDone]=useState(false);
  const progress=phase==="content"?50:quizDone?100:85;
  const backLabel=lang==="fr"?"◀ Retour":lang==="en"?"◀ Back":lang==="es"?"◀ Volver":"◀ Voltar";
  const moduleFull=lang==="fr"?"Module Carrière — Ship Career Navigator":lang==="en"?"Career Module — Ship Career Navigator":lang==="es"?"Módulo Carrera — Ship Career Navigator":"Módulo Carreira — Ship Career Navigator";
  const lessonOf=lang==="fr"?"Leçon 2/5":lang==="en"?"Lesson 2/5":lang==="es"?"Lección 2/5":"Lição 2/5";
  const badgeText=lang==="fr"?`🗺️ ${moduleFull} · Leçon 2/5 · ⭐ Premium+ · 250 XP`:lang==="en"?`🗺️ ${moduleFull} · Lesson 2/5 · ⭐ Premium+ · 250 XP`:lang==="es"?`🗺️ ${moduleFull} · Lección 2/5 · ⭐ Premium+ · 250 XP`:`🗺️ ${moduleFull} · Lição 2/5 · ⭐ Premium+ · 250 XP`;
  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(180deg,${C.navy},${C.navy2})`,color:"#f0f4ff"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.primary}33`}}>
        <div style={{minHeight:54,display:"flex",alignItems:"center",padding:"8px 16px",gap:12}}>
          <button onClick={phase==="content"?onBack:()=>setPhase("content")} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>{backLabel}</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:10,color:C.accent,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🗺️ {moduleFull}</div>
            <div style={{fontSize:11,color:"rgba(240,244,255,0.45)"}}>{lessonOf}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(142,68,173,0.2)",border:"1px solid rgba(142,68,173,0.44)",color:"#8e44ad",fontWeight:700}}>⭐ PREMIUM+</div>
            <div style={{fontSize:11,color:C.accent,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.primary},${C.secondary})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>
      {phase==="content"&&<div style={{padding:"20px 16px 0"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:`${C.primary}22`,border:`1px solid ${C.primary}55`,fontSize:11,color:C.accent,fontWeight:700}}>{badgeText}</div>
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
