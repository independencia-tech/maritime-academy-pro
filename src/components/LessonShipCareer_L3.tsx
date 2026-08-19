// LessonShipCareer_L3 - Certifications detaillees
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

const T: any = {
  fr:{
    moduleLabel:"CARRIERE - CERTIFICATIONS",
    lessonTitle:"Certifications detaillees",
    intro:"Cette lecon detaille, pour le departement choisi en L1, l'ensemble des certificats et cours obligatoires derriere chaque grade STCW : contenu, duree typique et cycle de renouvellement.",
    disclaimer:"Les durees, couts et cycles de renouvellement indiques sont des ordres de grandeur generaux. Verifie toujours les exigences exactes auprès de l'administration de ton pavillon et de ton centre de formation agree.",
    noProfileMsg:"Aucun profil trouve. Retourne a la lecon 1 (Ton profil) pour choisir ton departement (Pont ou Machine) avant d'afficher les certifications adaptees.",
    goToL1:"Aller a la lecon 1",
    deckTitle:"Certificats specifiques - Pont",
    engineTitle:"Certificats specifiques - Machine",
    s1title:"Certificats de securite obligatoires (tous departements)", s1hint:"Touche un module",
    s2title:"Cycles de renouvellement", s2hint:"Touche une categorie",
    s3title:"Duree et cout typiques des formations", s3hint:"Touche une formation",
    keypoints:"Points cles",
    kp:[
      "Un grade STCW (II/1, III/1...) ne suffit jamais seul : il s'accompagne toujours de certificats de securite obligatoires",
      "Le Basic Safety Training se decompose en 4 modules distincts, chacun avec son propre certificat",
      "Certains certificats techniques (ECDIS, GMDSS, ARPA) sont specifiques au departement Pont",
      "Le departement Machine ajoute des certificats propres (Engine Resource Management, habilitation electrique haute tension)",
      "Chaque certificat a un cycle de renouvellement propre, independant du grade STCW",
      "Les couts et durees de formation varient fortement selon le pays et le centre agree",
    ],
    accidentTitle:"Cas reel : Bow Mariner (2004)",
    accidentText:"Le chimiquier Bow Mariner a explose au large de la Virginie en fevrier 2004 durant une operation de nettoyage de cuve, causant la mort de 21 membres d'equipage. L'enquete a mis en cause des procedures de dega zage et de nettoyage de cuve mal maitrisees par un equipage insuffisamment forme aux specificites des cargaisons chimiques transportees. Cet accident illustre l'importance des certificats specifiques aux tankers (Basic et Advanced Tanker Training), qui vont bien au-dela du certificat STCW generique : sans cette formation ciblee sur les produits et procedures precis du navire, meme un officier qualifie sur le papier peut se retrouver face a des risques qu'il ne maitrise pas.",
    accidentToggle:"Voir le cas complet",
    exTitle:"Exercice pratique",
    exq2_deck_q:"Tu vises un poste sur un navire equipe d'ECDIS (cartographie electronique). Quel certificat supplementaire dois-tu obtenir en plus du STCW II/1 ?",
    exq2_deck_a:"Il faut un certificat ECDIS specifique (Electronic Chart Display and Information System), generalement une formation courte (3 a 5 jours) approuvee separement du cursus STCW II/1 de base. Ce certificat est desormais quasi systematiquement exige par les compagnies car la plupart des navires modernes ont abandonne les cartes papier.",
    exq2_engine_q:"Tu vises un poste sur un navire equipe de systemes de propulsion electrique haute tension. Quel certificat supplementaire dois-tu obtenir en plus du STCW III/1 ?",
    exq2_engine_a:"Il faut une habilitation electrique haute tension specifique, une formation dediee (generalement quelques jours) distincte du cursus STCW III/1 de base. Cette habilitation est de plus en plus exigee avec la multiplication des navires a propulsion electrique ou hybride (LNG, batteries).",
    exStatic:[
      {q:"Tu es Cadet Machine et vises le grade de 3e Mecanicien. Liste les certificats de securite de base obligatoires que tu dois detenir, avec leur duree de validite approximative.",
       a:"Les 4 modules du Basic Safety Training (STCW A-VI/1) : 1) Techniques de survie personnelle ; 2) Prevention et lutte contre l'incendie ; 3) Premiers secours elementaires ; 4) Securite personnelle et responsabilites sociales. Ces 4 modules sont valides environ 5 ans avant recyclage. S'ajoutent le certificat medical maritime (valide environ 2 ans) et, selon le pavillon, un certificat de sensibilisation a la securite (Security Awareness)."},
      {q:"Explique pourquoi le Basic Safety Training comporte 4 modules distincts plutot qu'un seul certificat global.",
       a:"Chaque module couvre une competence independante et evaluee separement (survie, incendie, premiers secours, comportement securitaire), ce qui permet une formation modulaire : un marin peut par exemple recycler uniquement le module incendie sans repasser l'ensemble. Cela reflete aussi des methodes d'evaluation tres differentes (piscine pour la survie, exercices pratiques au feu pour l'incendie, gestes techniques pour les premiers secours), difficiles a evaluer dans un examen unique."},
    ],
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
    startQuiz:"COMMENCER LE QUIZ",
  },
  en:{
    moduleLabel:"CAREER - CERTIFICATIONS",
    lessonTitle:"Detailed certifications",
    intro:"For the department chosen in L1, this lesson details every certificate and mandatory course behind each STCW rank: content, typical duration and renewal cycle.",
    disclaimer:"Durations, costs and renewal cycles shown are general approximations. Always check the exact requirements with your flag administration and your approved training center.",
    noProfileMsg:"No profile found. Go back to Lesson 1 (Your profile) to choose your department (Deck or Engine) before displaying adapted certifications.",
    goToL1:"Go to Lesson 1",
    deckTitle:"Deck-specific certificates",
    engineTitle:"Engine-specific certificates",
    s1title:"Mandatory safety certificates (all departments)", s1hint:"Tap a module",
    s2title:"Renewal cycles", s2hint:"Tap a category",
    s3title:"Typical training duration and cost", s3hint:"Tap a training",
    keypoints:"Key Points",
    kp:[
      "An STCW rank (II/1, III/1...) is never enough on its own: it always comes with mandatory safety certificates",
      "Basic Safety Training breaks down into 4 distinct modules, each with its own certificate",
      "Some technical certificates (ECDIS, GMDSS, ARPA) are specific to the Deck department",
      "The Engine department adds its own certificates (Engine Resource Management, high voltage authorization)",
      "Each certificate has its own renewal cycle, independent of the STCW rank",
      "Training costs and durations vary greatly by country and approved center",
    ],
    accidentTitle:"Real case: Bow Mariner (2004)",
    accidentText:"The chemical tanker Bow Mariner exploded off Virginia in February 2004 during a tank cleaning operation, killing 21 crew members. The investigation identified degassing and tank cleaning procedures poorly mastered by a crew insufficiently trained in the specifics of the chemical cargoes carried. This accident illustrates the importance of tanker-specific certificates (Basic and Advanced Tanker Training), which go well beyond the generic STCW certificate: without this training targeted at the vessel's precise products and procedures, even an officer qualified on paper can face risks they do not master.",
    accidentToggle:"View full case",
    exTitle:"Practice exercise",
    exq2_deck_q:"You are aiming for a position on a vessel equipped with ECDIS (electronic chart display). Which additional certificate must you obtain beyond STCW II/1?",
    exq2_deck_a:"A specific ECDIS certificate (Electronic Chart Display and Information System) is required, generally a short training (3 to 5 days) approved separately from the base STCW II/1 curriculum. This certificate is now almost systematically required by companies since most modern vessels have abandoned paper charts.",
    exq2_engine_q:"You are aiming for a position on a vessel equipped with high voltage electric propulsion systems. Which additional certificate must you obtain beyond STCW III/1?",
    exq2_engine_a:"A specific high voltage electrical authorization is required, a dedicated training (generally a few days) separate from the base STCW III/1 curriculum. This authorization is increasingly required as electric or hybrid propulsion vessels (LNG, batteries) multiply.",
    exStatic:[
      {q:"You are an Engine Cadet aiming for 3rd Engineer rank. List the mandatory basic safety certificates you must hold, with their approximate validity period.",
       a:"The 4 Basic Safety Training modules (STCW A-VI/1): 1) Personal survival techniques; 2) Fire prevention and fire fighting; 3) Elementary first aid; 4) Personal safety and social responsibilities. These 4 modules are valid for about 5 years before refresher. Add the maritime medical certificate (valid about 2 years) and, depending on the flag, a Security Awareness certificate."},
      {q:"Explain why Basic Safety Training is made of 4 distinct modules rather than a single global certificate.",
       a:"Each module covers an independent skill assessed separately (survival, fire, first aid, safety behaviour), which allows modular training: a seafarer can, for example, refresh only the fire module without retaking the whole course. This also reflects very different assessment methods (pool for survival, live fire exercises for firefighting, technical gestures for first aid), difficult to evaluate in a single exam."},
    ],
    showAnswer:"Show answer", hideAnswer:"Hide",
    startQuiz:"START QUIZ",
  },
  es:{
    moduleLabel:"CARRERA - CERTIFICACIONES",
    lessonTitle:"Certificaciones detalladas",
    intro:"Para el departamento elegido en L1, esta leccion detalla todos los certificados y cursos obligatorios detras de cada grado STCW: contenido, duracion tipica y ciclo de renovacion.",
    disclaimer:"Las duraciones, costos y ciclos de renovacion indicados son aproximaciones generales. Verifica siempre los requisitos exactos con la administracion de tu pabellon y tu centro de formacion aprobado.",
    noProfileMsg:"No se encontro ningun perfil. Vuelve a la leccion 1 (Tu perfil) para elegir tu departamento (Puente o Maquinas) antes de mostrar las certificaciones adaptadas.",
    goToL1:"Ir a la leccion 1",
    deckTitle:"Certificados especificos - Puente",
    engineTitle:"Certificados especificos - Maquinas",
    s1title:"Certificados de seguridad obligatorios (todos los departamentos)", s1hint:"Toca un modulo",
    s2title:"Ciclos de renovacion", s2hint:"Toca una categoria",
    s3title:"Duracion y costo tipicos de las formaciones", s3hint:"Toca una formacion",
    keypoints:"Puntos clave",
    kp:[
      "Un grado STCW (II/1, III/1...) nunca es suficiente por si solo: siempre viene acompanado de certificados de seguridad obligatorios",
      "El Basic Safety Training se divide en 4 modulos distintos, cada uno con su propio certificado",
      "Algunos certificados tecnicos (ECDIS, GMDSS, ARPA) son especificos del departamento de Puente",
      "El departamento de Maquinas anade certificados propios (Engine Resource Management, habilitacion electrica de alta tension)",
      "Cada certificado tiene su propio ciclo de renovacion, independiente del grado STCW",
      "Los costos y duraciones de formacion varian mucho segun el pais y el centro aprobado",
    ],
    accidentTitle:"Caso real: Bow Mariner (2004)",
    accidentText:"El quimiquero Bow Mariner exploto frente a Virginia en febrero de 2004 durante una operacion de limpieza de tanques, matando a 21 tripulantes. La investigacion identifico procedimientos de desgasificacion y limpieza de tanques mal dominados por una tripulacion insuficientemente formada en las especificidades de las cargas quimicas transportadas. Este accidente ilustra la importancia de los certificados especificos de tanqueros (Basic y Advanced Tanker Training), que van mucho mas alla del certificado STCW generico: sin esa formacion enfocada en los productos y procedimientos precisos del buque, incluso un oficial calificado en el papel puede enfrentar riesgos que no domina.",
    accidentToggle:"Ver caso completo",
    exTitle:"Ejercicio practico",
    exq2_deck_q:"Aspiras a un puesto en un buque equipado con ECDIS (cartografia electronica). Que certificado adicional debes obtener ademas del STCW II/1?",
    exq2_deck_a:"Se necesita un certificado ECDIS especifico (Electronic Chart Display and Information System), generalmente una formacion corta (3 a 5 dias) aprobada por separado del plan de estudios base STCW II/1. Este certificado ahora es exigido casi sistematicamente por las companias, ya que la mayoria de los buques modernos han abandonado las cartas de papel.",
    exq2_engine_q:"Aspiras a un puesto en un buque equipado con sistemas de propulsion electrica de alta tension. Que certificado adicional debes obtener ademas del STCW III/1?",
    exq2_engine_a:"Se necesita una habilitacion electrica de alta tension especifica, una formacion dedicada (generalmente unos dias) distinta del plan de estudios base STCW III/1. Esta habilitacion es cada vez mas exigida con la multiplicacion de buques de propulsion electrica o hibrida (LNG, baterias).",
    exStatic:[
      {q:"Eres Cadete de Maquinas y aspiras al grado de 3er Maquinista. Enumera los certificados de seguridad basicos obligatorios que debes tener, con su vigencia aproximada.",
       a:"Los 4 modulos del Basic Safety Training (STCW A-VI/1): 1) Tecnicas de supervivencia personal; 2) Prevencion y lucha contra incendios; 3) Primeros auxilios elementales; 4) Seguridad personal y responsabilidades sociales. Estos 4 modulos son validos alrededor de 5 anos antes de reciclarse. Se anaden el certificado medico maritimo (valido unos 2 anos) y, segun el pabellon, un certificado de sensibilizacion a la seguridad (Security Awareness)."},
      {q:"Explica por que el Basic Safety Training tiene 4 modulos distintos en lugar de un unico certificado global.",
       a:"Cada modulo cubre una competencia independiente evaluada por separado (supervivencia, incendio, primeros auxilios, comportamiento de seguridad), lo que permite una formacion modular: un marino puede, por ejemplo, reciclar solo el modulo de incendio sin repetir todo el curso. Esto tambien refleja metodos de evaluacion muy diferentes (piscina para supervivencia, ejercicios practicos con fuego real para incendios, gestos tecnicos para primeros auxilios), dificiles de evaluar en un unico examen."},
    ],
    showAnswer:"Ver correccion", hideAnswer:"Ocultar",
    startQuiz:"EMPEZAR QUIZ",
  },
  pt:{
    moduleLabel:"CARREIRA - CERTIFICACOES",
    lessonTitle:"Certificacoes detalhadas",
    intro:"Para o departamento escolhido em L1, esta licao detalha todos os certificados e cursos obrigatorios por tras de cada posto STCW: conteudo, duracao tipica e ciclo de renovacao.",
    disclaimer:"As duracoes, custos e ciclos de renovacao indicados sao aproximacoes gerais. Verifique sempre as exigencias exatas junto a administracao da sua bandeira e ao seu centro de formacao credenciado.",
    noProfileMsg:"Nenhum perfil encontrado. Volte a licao 1 (Seu perfil) para escolher seu departamento (Conves ou Maquinas) antes de exibir as certificacoes adaptadas.",
    goToL1:"Ir para a licao 1",
    deckTitle:"Certificados especificos - Conves",
    engineTitle:"Certificados especificos - Maquinas",
    s1title:"Certificados de seguranca obrigatorios (todos os departamentos)", s1hint:"Toque em um modulo",
    s2title:"Ciclos de renovacao", s2hint:"Toque em uma categoria",
    s3title:"Duracao e custo tipicos das formacoes", s3hint:"Toque em uma formacao",
    keypoints:"Pontos-chave",
    kp:[
      "Um posto STCW (II/1, III/1...) nunca basta por si so: sempre vem acompanhado de certificados de seguranca obrigatorios",
      "O Basic Safety Training se divide em 4 modulos distintos, cada um com seu proprio certificado",
      "Alguns certificados tecnicos (ECDIS, GMDSS, ARPA) sao especificos do departamento de Conves",
      "O departamento de Maquinas acrescenta certificados proprios (Engine Resource Management, habilitacao eletrica de alta tensao)",
      "Cada certificado tem seu proprio ciclo de renovacao, independente do posto STCW",
      "Os custos e duracoes de formacao variam muito conforme o pais e o centro credenciado",
    ],
    accidentTitle:"Caso real: Bow Mariner (2004)",
    accidentText:"O quimiqueiro Bow Mariner explodiu perto da Virginia em fevereiro de 2004 durante uma operacao de limpeza de tanques, matando 21 tripulantes. A investigacao apontou procedimentos de desgaseificacao e limpeza de tanques mal dominados por uma tripulacao insuficientemente treinada nas especificidades das cargas quimicas transportadas. Esse acidente ilustra a importancia dos certificados especificos de petroleiros/quimiqueiros (Basic e Advanced Tanker Training), que vao muito alem do certificado STCW generico: sem esse treinamento voltado aos produtos e procedimentos precisos do navio, mesmo um oficial qualificado no papel pode enfrentar riscos que nao domina.",
    accidentToggle:"Ver caso completo",
    exTitle:"Exercicio pratico",
    exq2_deck_q:"Voce almeja um posto em um navio equipado com ECDIS (cartografia eletronica). Qual certificado adicional voce deve obter alem do STCW II/1?",
    exq2_deck_a:"E necessario um certificado ECDIS especifico (Electronic Chart Display and Information System), geralmente um treinamento curto (3 a 5 dias) aprovado separadamente do curriculo base STCW II/1. Esse certificado agora e quase sistematicamente exigido pelas empresas, pois a maioria dos navios modernos abandonou as cartas de papel.",
    exq2_engine_q:"Voce almeja um posto em um navio equipado com sistemas de propulsao eletrica de alta tensao. Qual certificado adicional voce deve obter alem do STCW III/1?",
    exq2_engine_a:"E necessaria uma habilitacao eletrica de alta tensao especifica, um treinamento dedicado (geralmente alguns dias) distinto do curriculo base STCW III/1. Essa habilitacao e cada vez mais exigida com a multiplicacao de navios de propulsao eletrica ou hibrida (LNG, baterias).",
    exStatic:[
      {q:"Voce e Cadete de Maquinas e almeja o posto de 3o Maquinista. Liste os certificados de seguranca basicos obrigatorios que voce deve possuir, com sua validade aproximada.",
       a:"Os 4 modulos do Basic Safety Training (STCW A-VI/1): 1) Tecnicas de sobrevivencia pessoal; 2) Prevencao e combate a incendio; 3) Primeiros socorros elementares; 4) Seguranca pessoal e responsabilidades sociais. Esses 4 modulos sao validos por cerca de 5 anos antes da reciclagem. Somam-se o atestado medico maritimo (valido por cerca de 2 anos) e, conforme a bandeira, um certificado de sensibilizacao a seguranca (Security Awareness)."},
      {q:"Explique por que o Basic Safety Training tem 4 modulos distintos em vez de um unico certificado global.",
       a:"Cada modulo cobre uma competencia independente avaliada separadamente (sobrevivencia, incendio, primeiros socorros, comportamento de seguranca), o que permite um treinamento modular: um marinheiro pode, por exemplo, reciclar apenas o modulo de incendio sem refazer todo o curso. Isso tambem reflete metodos de avaliacao muito diferentes (piscina para sobrevivencia, exercicios praticos com fogo real para incendio, gestos tecnicos para primeiros socorros), dificeis de avaliar em um unico exame."},
    ],
    showAnswer:"Ver correcao", hideAnswer:"Ocultar",
    startQuiz:"COMECAR QUIZ",
  },
};

const DECK_CERTS: any = {
  fr:[
    {name:"ECDIS",desc:"Electronic Chart Display and Information System. Formation courte (3 a 5 jours) obligatoire sur tout navire equipe de cartographie electronique - la quasi-totalite de la flotte moderne."},
    {name:"ARPA Radar",desc:"Automatic Radar Plotting Aid. Formation a l'utilisation du radar pour l'anti-collision, integree ou complementaire au cursus STCW II/1 selon le pavillon."},
    {name:"GMDSS GOC",desc:"General Operator Certificate. Certificat obligatoire pour operer les systemes de detresse et de securite radio (VHF, MF/HF, satellite) sur tout navire soumis a la convention SOLAS."},
    {name:"Bridge Resource Management (BRM)",desc:"Formation a la gestion des ressources passerelle : communication, repartition des taches, prise de decision collective. Directement liee aux enseignements tires d'accidents comme l'El Faro ou l'Exxon Valdez."},
  ],
  en:[
    {name:"ECDIS",desc:"Electronic Chart Display and Information System. Short mandatory training (3 to 5 days) on any vessel equipped with electronic charting - nearly the entire modern fleet."},
    {name:"ARPA Radar",desc:"Automatic Radar Plotting Aid. Training in using radar for anti-collision, integrated into or complementary to the STCW II/1 curriculum depending on the flag."},
    {name:"GMDSS GOC",desc:"General Operator Certificate. Mandatory certificate to operate distress and radio safety systems (VHF, MF/HF, satellite) on any vessel subject to the SOLAS convention."},
    {name:"Bridge Resource Management (BRM)",desc:"Training in bridge resource management: communication, task allocation, collective decision-making. Directly linked to lessons learned from accidents such as El Faro or Exxon Valdez."},
  ],
  es:[
    {name:"ECDIS",desc:"Electronic Chart Display and Information System. Formacion corta (3 a 5 dias) obligatoria en cualquier buque equipado con cartografia electronica - casi toda la flota moderna."},
    {name:"ARPA Radar",desc:"Automatic Radar Plotting Aid. Formacion en el uso del radar para anticolision, integrada o complementaria al plan de estudios STCW II/1 segun el pabellon."},
    {name:"GMDSS GOC",desc:"General Operator Certificate. Certificado obligatorio para operar los sistemas de socorro y seguridad radioelectrica (VHF, MF/HF, satelite) en cualquier buque sujeto al convenio SOLAS."},
    {name:"Bridge Resource Management (BRM)",desc:"Formacion en gestion de recursos de puente: comunicacion, reparto de tareas, toma de decisiones colectiva. Directamente ligada a las lecciones aprendidas de accidentes como el El Faro o el Exxon Valdez."},
  ],
  pt:[
    {name:"ECDIS",desc:"Electronic Chart Display and Information System. Treinamento curto (3 a 5 dias) obrigatorio em qualquer navio equipado com cartografia eletronica - quase toda a frota moderna."},
    {name:"ARPA Radar",desc:"Automatic Radar Plotting Aid. Treinamento no uso do radar para anticolisao, integrado ou complementar ao curriculo STCW II/1 conforme a bandeira."},
    {name:"GMDSS GOC",desc:"General Operator Certificate. Certificado obrigatorio para operar os sistemas de socorro e seguranca radio (VHF, MF/HF, satelite) em qualquer navio sujeito a convencao SOLAS."},
    {name:"Bridge Resource Management (BRM)",desc:"Treinamento em gestao de recursos de passadico: comunicacao, distribuicao de tarefas, tomada de decisao coletiva. Diretamente ligado as licoes aprendidas de acidentes como o El Faro ou o Exxon Valdez."},
  ],
};

const ENGINE_CERTS: any = {
  fr:[
    {name:"Engine Resource Management (ERM)",desc:"Equivalent machine du BRM : gestion des ressources en salle de controle, communication entre mecaniciens, prise de decision collective en situation degradee."},
    {name:"Habilitation electrique haute tension",desc:"Obligatoire pour intervenir sur les installations electriques haute tension de plus en plus courantes sur les navires modernes (propulsion electrique, LNG)."},
    {name:"Automation & UMS",desc:"Unattended Machinery Space. Formation a la conduite et a la surveillance a distance des salles des machines automatisees, essentielle sur les navires recents."},
    {name:"Systemes de refrigeration",desc:"Formation specifique pour les navires equipes de systemes frigorifiques complexes (porte-conteneurs reefer, navires de peche), au-dela du cursus machine standard."},
  ],
  en:[
    {name:"Engine Resource Management (ERM)",desc:"Engine equivalent of BRM: resource management in the control room, communication between engineers, collective decision-making in degraded situations."},
    {name:"High voltage authorization",desc:"Mandatory to work on high voltage electrical installations, increasingly common on modern vessels (electric propulsion, LNG)."},
    {name:"Automation & UMS",desc:"Unattended Machinery Space. Training in operating and remotely monitoring automated engine rooms, essential on recent vessels."},
    {name:"Refrigeration systems",desc:"Specific training for vessels equipped with complex refrigeration systems (reefer container ships, fishing vessels), beyond the standard engine curriculum."},
  ],
  es:[
    {name:"Engine Resource Management (ERM)",desc:"Equivalente de maquinas del BRM: gestion de recursos en la sala de control, comunicacion entre maquinistas, toma de decisiones colectiva en situaciones degradadas."},
    {name:"Habilitacion electrica de alta tension",desc:"Obligatoria para intervenir en instalaciones electricas de alta tension, cada vez mas comunes en buques modernos (propulsion electrica, LNG)."},
    {name:"Automatizacion y UMS",desc:"Unattended Machinery Space. Formacion en la conduccion y supervision remota de salas de maquinas automatizadas, esencial en buques recientes."},
    {name:"Sistemas de refrigeracion",desc:"Formacion especifica para buques equipados con sistemas frigorificos complejos (portacontenedores reefer, buques pesqueros), mas alla del plan de estudios de maquinas estandar."},
  ],
  pt:[
    {name:"Engine Resource Management (ERM)",desc:"Equivalente de maquinas do BRM: gestao de recursos na sala de controle, comunicacao entre maquinistas, tomada de decisao coletiva em situacoes degradadas."},
    {name:"Habilitacao eletrica de alta tensao",desc:"Obrigatoria para intervir em instalacoes eletricas de alta tensao, cada vez mais comuns em navios modernos (propulsao eletrica, LNG)."},
    {name:"Automacao e UMS",desc:"Unattended Machinery Space. Treinamento na conducao e supervisao remota de casas de maquinas automatizadas, essencial em navios recentes."},
    {name:"Sistemas de refrigeracao",desc:"Treinamento especifico para navios equipados com sistemas frigorificos complexos (porta-conteineres reefer, navios de pesca), alem do curriculo de maquinas padrao."},
  ],
};

const BST_MODULES: any = {
  fr:[
    {name:"Techniques de survie personnelle",desc:"STCW A-VI/1-1. Utilisation des embarcations et radeaux de sauvetage, gilets de sauvetage, survie en mer. Comprend generalement un exercice en piscine."},
    {name:"Prevention et lutte contre l'incendie",desc:"STCW A-VI/1-2. Utilisation des extincteurs, lances, appareils respiratoires. Comprend un exercice pratique sur feu reel dans un centre agree."},
    {name:"Premiers secours elementaires",desc:"STCW A-VI/1-3. Gestes de premiers secours, reanimation cardio-pulmonaire, prise en charge d'un blesse a bord en attendant une evacuation medicale."},
    {name:"Securite personnelle et responsabilites sociales",desc:"STCW A-VI/1-4. Prevention des accidents du travail, communication a bord, comprehension des procedures d'urgence et de la chaine de commandement."},
  ],
  en:[
    {name:"Personal survival techniques",desc:"STCW A-VI/1-1. Use of lifeboats and rafts, life jackets, survival at sea. Generally includes a pool exercise."},
    {name:"Fire prevention and fire fighting",desc:"STCW A-VI/1-2. Use of extinguishers, hoses, breathing apparatus. Includes a practical live-fire exercise at an approved center."},
    {name:"Elementary first aid",desc:"STCW A-VI/1-3. First aid gestures, cardiopulmonary resuscitation, handling an injured person on board while awaiting medical evacuation."},
    {name:"Personal safety and social responsibilities",desc:"STCW A-VI/1-4. Workplace accident prevention, onboard communication, understanding of emergency procedures and the chain of command."},
  ],
  es:[
    {name:"Tecnicas de supervivencia personal",desc:"STCW A-VI/1-1. Uso de botes y balsas de salvamento, chalecos salvavidas, supervivencia en el mar. Generalmente incluye un ejercicio en piscina."},
    {name:"Prevencion y lucha contra incendios",desc:"STCW A-VI/1-2. Uso de extintores, mangueras, equipos de respiracion. Incluye un ejercicio practico con fuego real en un centro aprobado."},
    {name:"Primeros auxilios elementales",desc:"STCW A-VI/1-3. Gestos de primeros auxilios, reanimacion cardiopulmonar, atencion a un herido a bordo mientras se espera una evacuacion medica."},
    {name:"Seguridad personal y responsabilidades sociales",desc:"STCW A-VI/1-4. Prevencion de accidentes laborales, comunicacion a bordo, comprension de los procedimientos de emergencia y la cadena de mando."},
  ],
  pt:[
    {name:"Tecnicas de sobrevivencia pessoal",desc:"STCW A-VI/1-1. Uso de botes e balsas salva-vidas, coletes salva-vidas, sobrevivencia no mar. Geralmente inclui um exercicio na piscina."},
    {name:"Prevencao e combate a incendio",desc:"STCW A-VI/1-2. Uso de extintores, mangueiras, aparelhos respiratorios. Inclui um exercicio pratico com fogo real em um centro credenciado."},
    {name:"Primeiros socorros elementares",desc:"STCW A-VI/1-3. Gestos de primeiros socorros, reanimacao cardiopulmonar, atendimento a um ferido a bordo enquanto se aguarda evacuacao medica."},
    {name:"Seguranca pessoal e responsabilidades sociais",desc:"STCW A-VI/1-4. Prevencao de acidentes de trabalho, comunicacao a bordo, compreensao dos procedimentos de emergencia e da cadeia de comando."},
  ],
};

const RENEWAL: any = {
  fr:[
    {name:"Certificats de securite de base (BST)",desc:"Renouvellement generalement tous les 5 ans via un cours de recyclage plus court que la formation initiale."},
    {name:"Certificat medical maritime",desc:"Renouvellement generalement tous les 2 ans, via une visite medicale complete auprès d'un medecin agree par l'administration."},
    {name:"GMDSS / certificats radio",desc:"Renouvellement generalement tous les 5 ans, avec verification des connaissances sur les equipements de detresse et de securite radio."},
    {name:"Grade STCW (II/1, II/2, III/1, III/2)",desc:"Pas de renouvellement periodique automatique, mais une revalidation par temps de mer recent est exigee en cas d'interruption prolongee de la navigation."},
  ],
  en:[
    {name:"Basic safety certificates (BST)",desc:"Generally renewed every 5 years via a shorter refresher course than the initial training."},
    {name:"Maritime medical certificate",desc:"Generally renewed every 2 years, via a full medical examination with a doctor approved by the administration."},
    {name:"GMDSS / radio certificates",desc:"Generally renewed every 5 years, with a knowledge check on distress and radio safety equipment."},
    {name:"STCW rank (II/1, II/2, III/1, III/2)",desc:"No automatic periodic renewal, but revalidation through recent sea time is required after a prolonged break from sailing."},
  ],
  es:[
    {name:"Certificados de seguridad basicos (BST)",desc:"Renovacion generalmente cada 5 anos mediante un curso de reciclaje mas corto que la formacion inicial."},
    {name:"Certificado medico maritimo",desc:"Renovacion generalmente cada 2 anos, mediante un examen medico completo con un medico aprobado por la administracion."},
    {name:"GMDSS / certificados de radio",desc:"Renovacion generalmente cada 5 anos, con verificacion de conocimientos sobre equipos de socorro y seguridad radioelectrica."},
    {name:"Grado STCW (II/1, II/2, III/1, III/2)",desc:"Sin renovacion periodica automatica, pero se exige revalidacion mediante tiempo de mar reciente tras una interrupcion prolongada de la navegacion."},
  ],
  pt:[
    {name:"Certificados de seguranca basicos (BST)",desc:"Renovacao geralmente a cada 5 anos por meio de um curso de reciclagem mais curto que o treinamento inicial."},
    {name:"Atestado medico maritimo",desc:"Renovacao geralmente a cada 2 anos, mediante exame medico completo com um medico aprovado pela administracao."},
    {name:"GMDSS / certificados de radio",desc:"Renovacao geralmente a cada 5 anos, com verificacao de conhecimentos sobre equipamentos de socorro e seguranca radio."},
    {name:"Posto STCW (II/1, II/2, III/1, III/2)",desc:"Sem renovacao periodica automatica, mas e exigida revalidacao por tempo de mar recente apos uma interrupcao prolongada da navegacao."},
  ],
};

const TRAININGS: any = {
  fr:[
    {name:"Basic Safety Training (4 modules)",desc:"Duree totale generalement de 1 a 2 semaines pour les 4 modules combines. Cout variable selon le pays et le centre agree, generalement parmi les formations les moins couteuses du parcours."},
    {name:"ECDIS",desc:"Formation courte de 3 a 5 jours. Cout modere, souvent pris en charge par la compagnie pour les officiers en poste actif."},
    {name:"Tanker Familiarisation / Advanced",desc:"Le niveau Basic dure generalement 1 a 2 jours, le niveau Advanced 3 a 5 jours. Cout plus eleve que la formation Deck/Engine standard en raison de la specialisation."},
    {name:"GMDSS GOC",desc:"Formation plus longue, generalement 1 a 2 semaines, incluant une part importante de pratique sur simulateur radio."},
  ],
  en:[
    {name:"Basic Safety Training (4 modules)",desc:"Total duration generally 1 to 2 weeks for the 4 combined modules. Cost varies by country and approved center, generally among the least expensive trainings in the path."},
    {name:"ECDIS",desc:"Short training of 3 to 5 days. Moderate cost, often covered by the company for officers in active service."},
    {name:"Tanker Familiarisation / Advanced",desc:"The Basic level generally lasts 1 to 2 days, the Advanced level 3 to 5 days. Higher cost than standard Deck/Engine training due to the specialization."},
    {name:"GMDSS GOC",desc:"Longer training, generally 1 to 2 weeks, including a significant share of practice on a radio simulator."},
  ],
  es:[
    {name:"Basic Safety Training (4 modulos)",desc:"Duracion total generalmente de 1 a 2 semanas para los 4 modulos combinados. Costo variable segun el pais y el centro aprobado, generalmente entre las formaciones menos costosas del recorrido."},
    {name:"ECDIS",desc:"Formacion corta de 3 a 5 dias. Costo moderado, a menudo cubierto por la compania para oficiales en servicio activo."},
    {name:"Tanker Familiarisation / Advanced",desc:"El nivel Basic dura generalmente 1 a 2 dias, el nivel Advanced 3 a 5 dias. Costo mas alto que la formacion Deck/Engine estandar debido a la especializacion."},
    {name:"GMDSS GOC",desc:"Formacion mas larga, generalmente 1 a 2 semanas, incluyendo una parte importante de practica en simulador de radio."},
  ],
  pt:[
    {name:"Basic Safety Training (4 modulos)",desc:"Duracao total geralmente de 1 a 2 semanas para os 4 modulos combinados. Custo variavel conforme o pais e o centro credenciado, geralmente entre os treinamentos menos caros do percurso."},
    {name:"ECDIS",desc:"Treinamento curto de 3 a 5 dias. Custo moderado, muitas vezes custeado pela empresa para oficiais em atividade."},
    {name:"Tanker Familiarisation / Advanced",desc:"O nivel Basic dura geralmente 1 a 2 dias, o nivel Advanced 3 a 5 dias. Custo mais alto que o treinamento Deck/Engine padrao devido a especializacao."},
    {name:"GMDSS GOC",desc:"Treinamento mais longo, geralmente 1 a 2 semanas, incluindo uma parte importante de pratica em simulador de radio."},
  ],
};

const BANK: any = {
  fr:[
    {q:"Combien de modules compose le Basic Safety Training ?",opts:["2","3","4","5"],correct:2,expl:"Le BST comporte 4 modules distincts (survie, incendie, premiers secours, securite personnelle)."},
    {q:"Quelle est la duree de validite typique des modules BST ?",opts:["1 an","2 ans","5 ans","10 ans"],correct:2,expl:"Les modules BST sont generalement valides 5 ans avant recyclage."},
    {q:"Quel certificat est obligatoire pour operer les systemes de detresse radio ?",opts:["ECDIS","GMDSS GOC","ARPA","BRM"],correct:1,expl:"Le GMDSS GOC est obligatoire pour operer les systemes de detresse et de securite radio."},
    {q:"Quelle formation est specifique au departement Pont parmi les suivantes ?",opts:["Engine Resource Management","ECDIS","Habilitation haute tension","Automation UMS"],correct:1,expl:"L'ECDIS est un certificat specifique au departement Pont."},
    {q:"Quelle formation est specifique au departement Machine ?",opts:["ARPA Radar","GMDSS GOC","Habilitation electrique haute tension","BRM"],correct:2,expl:"L'habilitation electrique haute tension est specifique au departement Machine."},
    {q:"Quelle est la duree de validite typique du certificat medical maritime ?",opts:["1 an","2 ans","5 ans","Illimitee"],correct:1,expl:"Le certificat medical maritime est generalement valide 2 ans."},
    {q:"Quelle formation reflete en machine l'equivalent du BRM en pont ?",opts:["ERM","UMS","ECDIS","GMDSS"],correct:0,expl:"L'Engine Resource Management (ERM) est l'equivalent machine du BRM."},
    {q:"Quel type d'exercice pratique est generalement inclus dans le module incendie du BST ?",opts:["Simulation informatique uniquement","Exercice sur feu reel en centre agree","Aucun exercice pratique","Examen ecrit seulement"],correct:1,expl:"Le module incendie comprend generalement un exercice pratique sur feu reel en centre agree."},
    {q:"Quelle cause principale a ete identifiee dans l'accident du Bow Mariner (2004) ?",opts:["Panne moteur","Procedures de nettoyage de cuve mal maitrisees par un equipage insuffisamment forme","Collision","Tempete"],correct:1,expl:"L'enquete a identifie des procedures de degazage/nettoyage mal maitrisees par manque de formation specifique."},
    {q:"Combien de membres d'equipage ont peri dans l'explosion du Bow Mariner ?",opts:["5","12","21","30"],correct:2,expl:"21 membres d'equipage ont peri dans l'explosion du Bow Mariner en 2004."},
    {q:"Le grade STCW (II/1, III/1...) a-t-il un renouvellement periodique automatique ?",opts:["Oui, tous les 5 ans","Non, mais une revalidation par temps de mer est exigee apres une interruption prolongee","Oui, tous les 2 ans","Jamais, il est valide a vie sans condition"],correct:1,expl:"Pas de renouvellement automatique, mais une revalidation par temps de mer recent est exigee apres une interruption prolongee."},
    {q:"Quelle formation est necessaire pour intervenir sur un navire equipe de systemes de propulsion electrique haute tension ?",opts:["ECDIS","Habilitation electrique haute tension","ARPA","GMDSS"],correct:1,expl:"L'habilitation electrique haute tension est requise pour ces installations specifiques."},
    {q:"Quelle est la duree typique d'une formation Tanker Familiarisation (niveau Basic) ?",opts:["1-2 jours","1-2 semaines","1 mois","6 mois"],correct:0,expl:"Le niveau Basic de Tanker Familiarisation dure generalement 1 a 2 jours."},
    {q:"Quel module du BST couvre la reanimation cardio-pulmonaire ?",opts:["Techniques de survie","Premiers secours elementaires","Securite personnelle","Lutte incendie"],correct:1,expl:"Le module Premiers secours elementaires couvre la reanimation cardio-pulmonaire."},
    {q:"Pourquoi les couts et durees de formation varient-ils fortement selon le pays ?",opts:["Ils sont fixes par une norme internationale unique","Chaque centre agree et chaque administration nationale definissent leurs propres modalites","Le cout est toujours identique partout","La duree ne varie jamais"],correct:1,expl:"Chaque administration et chaque centre agree fixent leurs propres modalites, d'ou la variabilite."},
  ],
  en:[
    {q:"How many modules make up Basic Safety Training?",opts:["2","3","4","5"],correct:2,expl:"BST has 4 distinct modules (survival, fire, first aid, personal safety)."},
    {q:"What is the typical validity period of BST modules?",opts:["1 year","2 years","5 years","10 years"],correct:2,expl:"BST modules are generally valid for 5 years before refresher."},
    {q:"Which certificate is mandatory to operate distress radio systems?",opts:["ECDIS","GMDSS GOC","ARPA","BRM"],correct:1,expl:"GMDSS GOC is mandatory to operate distress and radio safety systems."},
    {q:"Which of the following training is specific to the Deck department?",opts:["Engine Resource Management","ECDIS","High voltage authorization","Automation UMS"],correct:1,expl:"ECDIS is a certificate specific to the Deck department."},
    {q:"Which training is specific to the Engine department?",opts:["ARPA Radar","GMDSS GOC","High voltage authorization","BRM"],correct:2,expl:"High voltage authorization is specific to the Engine department."},
    {q:"What is the typical validity period of the maritime medical certificate?",opts:["1 year","2 years","5 years","Unlimited"],correct:1,expl:"The maritime medical certificate is generally valid for 2 years."},
    {q:"Which engine training mirrors the BRM used on deck?",opts:["ERM","UMS","ECDIS","GMDSS"],correct:0,expl:"Engine Resource Management (ERM) is the engine equivalent of BRM."},
    {q:"What type of practical exercise is generally included in the BST fire module?",opts:["Computer simulation only","Live fire exercise at an approved center","No practical exercise","Written exam only"],correct:1,expl:"The fire module generally includes a practical live-fire exercise at an approved center."},
    {q:"What main cause was identified in the Bow Mariner accident (2004)?",opts:["Engine failure","Tank cleaning procedures poorly mastered by an insufficiently trained crew","Collision","Storm"],correct:1,expl:"The investigation identified degassing/cleaning procedures poorly mastered due to lack of specific training."},
    {q:"How many crew members died in the Bow Mariner explosion?",opts:["5","12","21","30"],correct:2,expl:"21 crew members died in the Bow Mariner explosion in 2004."},
    {q:"Does the STCW rank (II/1, III/1...) have an automatic periodic renewal?",opts:["Yes, every 5 years","No, but revalidation through sea time is required after a prolonged break","Yes, every 2 years","Never, it is valid for life unconditionally"],correct:1,expl:"No automatic renewal, but revalidation through recent sea time is required after a prolonged break."},
    {q:"Which training is required to work on a vessel equipped with high voltage electric propulsion systems?",opts:["ECDIS","High voltage authorization","ARPA","GMDSS"],correct:1,expl:"High voltage authorization is required for these specific installations."},
    {q:"What is the typical duration of Tanker Familiarisation training (Basic level)?",opts:["1-2 days","1-2 weeks","1 month","6 months"],correct:0,expl:"The Basic level of Tanker Familiarisation generally lasts 1 to 2 days."},
    {q:"Which BST module covers cardiopulmonary resuscitation?",opts:["Survival techniques","Elementary first aid","Personal safety","Fire fighting"],correct:1,expl:"The Elementary first aid module covers cardiopulmonary resuscitation."},
    {q:"Why do training costs and durations vary greatly by country?",opts:["They are fixed by a single international standard","Each approved center and national administration sets its own arrangements","The cost is always the same everywhere","The duration never varies"],correct:1,expl:"Each administration and approved center sets its own arrangements, hence the variability."},
  ],
  es:[
    {q:"Cuantos modulos componen el Basic Safety Training?",opts:["2","3","4","5"],correct:2,expl:"El BST tiene 4 modulos distintos (supervivencia, incendio, primeros auxilios, seguridad personal)."},
    {q:"Cual es la vigencia tipica de los modulos BST?",opts:["1 ano","2 anos","5 anos","10 anos"],correct:2,expl:"Los modulos BST son generalmente validos por 5 anos antes de reciclarse."},
    {q:"Que certificado es obligatorio para operar los sistemas de socorro por radio?",opts:["ECDIS","GMDSS GOC","ARPA","BRM"],correct:1,expl:"El GMDSS GOC es obligatorio para operar los sistemas de socorro y seguridad radioelectrica."},
    {q:"Cual de las siguientes formaciones es especifica del departamento de Puente?",opts:["Engine Resource Management","ECDIS","Habilitacion de alta tension","Automatizacion UMS"],correct:1,expl:"El ECDIS es un certificado especifico del departamento de Puente."},
    {q:"Que formacion es especifica del departamento de Maquinas?",opts:["ARPA Radar","GMDSS GOC","Habilitacion electrica de alta tension","BRM"],correct:2,expl:"La habilitacion electrica de alta tension es especifica del departamento de Maquinas."},
    {q:"Cual es la vigencia tipica del certificado medico maritimo?",opts:["1 ano","2 anos","5 anos","Ilimitada"],correct:1,expl:"El certificado medico maritimo es generalmente valido por 2 anos."},
    {q:"Que formacion de maquinas refleja el equivalente del BRM en puente?",opts:["ERM","UMS","ECDIS","GMDSS"],correct:0,expl:"El Engine Resource Management (ERM) es el equivalente de maquinas del BRM."},
    {q:"Que tipo de ejercicio practico se incluye generalmente en el modulo de incendio del BST?",opts:["Solo simulacion informatica","Ejercicio con fuego real en centro aprobado","Ningun ejercicio practico","Solo examen escrito"],correct:1,expl:"El modulo de incendio generalmente incluye un ejercicio practico con fuego real en centro aprobado."},
    {q:"Que causa principal se identifico en el accidente del Bow Mariner (2004)?",opts:["Fallo de motor","Procedimientos de limpieza de tanques mal dominados por una tripulacion insuficientemente formada","Colision","Tormenta"],correct:1,expl:"La investigacion identifico procedimientos de desgasificacion/limpieza mal dominados por falta de formacion especifica."},
    {q:"Cuantos tripulantes murieron en la explosion del Bow Mariner?",opts:["5","12","21","30"],correct:2,expl:"21 tripulantes murieron en la explosion del Bow Mariner en 2004."},
    {q:"El grado STCW (II/1, III/1...) tiene una renovacion periodica automatica?",opts:["Si, cada 5 anos","No, pero se exige revalidacion mediante tiempo de mar tras una interrupcion prolongada","Si, cada 2 anos","Nunca, es valido de por vida sin condiciones"],correct:1,expl:"Sin renovacion automatica, pero se exige revalidacion mediante tiempo de mar reciente tras una interrupcion prolongada."},
    {q:"Que formacion se necesita para trabajar en un buque equipado con sistemas de propulsion electrica de alta tension?",opts:["ECDIS","Habilitacion electrica de alta tension","ARPA","GMDSS"],correct:1,expl:"La habilitacion electrica de alta tension se requiere para estas instalaciones especificas."},
    {q:"Cual es la duracion tipica de la formacion Tanker Familiarisation (nivel Basic)?",opts:["1-2 dias","1-2 semanas","1 mes","6 meses"],correct:0,expl:"El nivel Basic de Tanker Familiarisation dura generalmente 1 a 2 dias."},
    {q:"Que modulo del BST cubre la reanimacion cardiopulmonar?",opts:["Tecnicas de supervivencia","Primeros auxilios elementales","Seguridad personal","Lucha contra incendios"],correct:1,expl:"El modulo de Primeros auxilios elementales cubre la reanimacion cardiopulmonar."},
    {q:"Por que los costos y duraciones de formacion varian tanto segun el pais?",opts:["Estan fijados por una norma internacional unica","Cada centro aprobado y administracion nacional define sus propias modalidades","El costo es siempre igual en todas partes","La duracion nunca varia"],correct:1,expl:"Cada administracion y centro aprobado fija sus propias modalidades, de ahi la variabilidad."},
  ],
  pt:[
    {q:"Quantos modulos compoem o Basic Safety Training?",opts:["2","3","4","5"],correct:2,expl:"O BST tem 4 modulos distintos (sobrevivencia, incendio, primeiros socorros, seguranca pessoal)."},
    {q:"Qual e a validade tipica dos modulos BST?",opts:["1 ano","2 anos","5 anos","10 anos"],correct:2,expl:"Os modulos BST sao geralmente validos por 5 anos antes da reciclagem."},
    {q:"Qual certificado e obrigatorio para operar os sistemas de socorro por radio?",opts:["ECDIS","GMDSS GOC","ARPA","BRM"],correct:1,expl:"O GMDSS GOC e obrigatorio para operar os sistemas de socorro e seguranca radio."},
    {q:"Qual das seguintes formacoes e especifica do departamento de Conves?",opts:["Engine Resource Management","ECDIS","Habilitacao de alta tensao","Automacao UMS"],correct:1,expl:"O ECDIS e um certificado especifico do departamento de Conves."},
    {q:"Qual treinamento e especifico do departamento de Maquinas?",opts:["ARPA Radar","GMDSS GOC","Habilitacao eletrica de alta tensao","BRM"],correct:2,expl:"A habilitacao eletrica de alta tensao e especifica do departamento de Maquinas."},
    {q:"Qual e a validade tipica do atestado medico maritimo?",opts:["1 ano","2 anos","5 anos","Ilimitada"],correct:1,expl:"O atestado medico maritimo e geralmente valido por 2 anos."},
    {q:"Qual treinamento de maquinas reflete o equivalente do BRM no conves?",opts:["ERM","UMS","ECDIS","GMDSS"],correct:0,expl:"O Engine Resource Management (ERM) e o equivalente de maquinas do BRM."},
    {q:"Que tipo de exercicio pratico e geralmente incluido no modulo de incendio do BST?",opts:["Apenas simulacao por computador","Exercicio com fogo real em centro credenciado","Nenhum exercicio pratico","Apenas exame escrito"],correct:1,expl:"O modulo de incendio geralmente inclui um exercicio pratico com fogo real em centro credenciado."},
    {q:"Qual causa principal foi identificada no acidente do Bow Mariner (2004)?",opts:["Falha de motor","Procedimentos de limpeza de tanques mal dominados por uma tripulacao insuficientemente treinada","Colisao","Tempestade"],correct:1,expl:"A investigacao identificou procedimentos de desgaseificacao/limpeza mal dominados por falta de treinamento especifico."},
    {q:"Quantos tripulantes morreram na explosao do Bow Mariner?",opts:["5","12","21","30"],correct:2,expl:"21 tripulantes morreram na explosao do Bow Mariner em 2004."},
    {q:"O posto STCW (II/1, III/1...) tem renovacao periodica automatica?",opts:["Sim, a cada 5 anos","Nao, mas e exigida revalidacao por tempo de mar apos uma interrupcao prolongada","Sim, a cada 2 anos","Nunca, e valido para toda a vida sem condicoes"],correct:1,expl:"Sem renovacao automatica, mas e exigida revalidacao por tempo de mar recente apos uma interrupcao prolongada."},
    {q:"Qual treinamento e necessario para trabalhar em um navio equipado com sistemas de propulsao eletrica de alta tensao?",opts:["ECDIS","Habilitacao eletrica de alta tensao","ARPA","GMDSS"],correct:1,expl:"A habilitacao eletrica de alta tensao e exigida para essas instalacoes especificas."},
    {q:"Qual e a duracao tipica do treinamento Tanker Familiarisation (nivel Basic)?",opts:["1-2 dias","1-2 semanas","1 mes","6 meses"],correct:0,expl:"O nivel Basic de Tanker Familiarisation dura geralmente 1 a 2 dias."},
    {q:"Qual modulo do BST cobre a reanimacao cardiopulmonar?",opts:["Tecnicas de sobrevivencia","Primeiros socorros elementares","Seguranca pessoal","Combate a incendio"],correct:1,expl:"O modulo de Primeiros socorros elementares cobre a reanimacao cardiopulmonar."},
    {q:"Por que os custos e duracoes de treinamento variam tanto conforme o pais?",opts:["Sao fixados por uma norma internacional unica","Cada centro credenciado e administracao nacional define suas proprias modalidades","O custo e sempre igual em todos os lugares","A duracao nunca varia"],correct:1,expl:"Cada administracao e centro credenciado fixa suas proprias modalidades, por isso a variabilidade."},
  ],
};

const QUIZ: any = {
  fr:[
    {q:"Combien de modules distincts compose le Basic Safety Training ?",opts:["2","3","4","5"],correct:2,exp:"Le BST comporte 4 modules distincts, chacun avec son propre certificat."},
    {q:"Quel certificat est specifique au departement Pont ?",opts:["ECDIS","Habilitation haute tension","ERM","UMS"],correct:0,exp:"L'ECDIS est un certificat specifique au departement Pont."},
    {q:"Quel certificat est specifique au departement Machine ?",opts:["ARPA","GMDSS","Habilitation electrique haute tension","BRM"],correct:2,exp:"L'habilitation electrique haute tension est specifique au departement Machine."},
    {q:"Quelle est la lecon principale du cas Bow Mariner (2004) ?",opts:["Le certificat generique STCW suffit toujours","Une formation specifique aux produits transportes est indispensable, au-dela du certificat generique","La vitesse est la cause principale des accidents","Les tankers sont plus surs que les cargos"],correct:1,exp:"L'accident illustre l'importance des formations specifiques aux tankers, au-dela du certificat STCW generique."},
    {q:"Le grade STCW a-t-il un renouvellement periodique automatique comme les certificats de securite ?",opts:["Oui, tous les 5 ans","Non, mais une revalidation par temps de mer est exigee en cas d'interruption","Oui, tous les 2 ans","Jamais besoin de revalidation"],correct:1,exp:"Contrairement aux certificats de securite, le grade STCW ne se renouvelle pas periodiquement mais peut necessiter une revalidation."},
  ],
  en:[
    {q:"How many distinct modules make up Basic Safety Training?",opts:["2","3","4","5"],correct:2,exp:"BST has 4 distinct modules, each with its own certificate."},
    {q:"Which certificate is specific to the Deck department?",opts:["ECDIS","High voltage authorization","ERM","UMS"],correct:0,exp:"ECDIS is a certificate specific to the Deck department."},
    {q:"Which certificate is specific to the Engine department?",opts:["ARPA","GMDSS","High voltage authorization","BRM"],correct:2,exp:"High voltage authorization is specific to the Engine department."},
    {q:"What is the main lesson from the Bow Mariner case (2004)?",opts:["The generic STCW certificate is always enough","Training specific to the cargo carried is essential, beyond the generic certificate","Speed is the main cause of accidents","Tankers are safer than cargo ships"],correct:1,exp:"The accident illustrates the importance of tanker-specific training, beyond the generic STCW certificate."},
    {q:"Does the STCW rank have automatic periodic renewal like safety certificates?",opts:["Yes, every 5 years","No, but revalidation through sea time is required after an interruption","Yes, every 2 years","Never needs revalidation"],correct:1,exp:"Unlike safety certificates, the STCW rank does not renew periodically but may require revalidation."},
  ],
  es:[
    {q:"Cuantos modulos distintos componen el Basic Safety Training?",opts:["2","3","4","5"],correct:2,exp:"El BST tiene 4 modulos distintos, cada uno con su propio certificado."},
    {q:"Que certificado es especifico del departamento de Puente?",opts:["ECDIS","Habilitacion de alta tension","ERM","UMS"],correct:0,exp:"El ECDIS es un certificado especifico del departamento de Puente."},
    {q:"Que certificado es especifico del departamento de Maquinas?",opts:["ARPA","GMDSS","Habilitacion electrica de alta tension","BRM"],correct:2,exp:"La habilitacion electrica de alta tension es especifica del departamento de Maquinas."},
    {q:"Cual es la leccion principal del caso Bow Mariner (2004)?",opts:["El certificado generico STCW siempre basta","Una formacion especifica de los productos transportados es indispensable, mas alla del certificado generico","La velocidad es la causa principal de los accidentes","Los tanqueros son mas seguros que los buques de carga"],correct:1,exp:"El accidente ilustra la importancia de las formaciones especificas de tanqueros, mas alla del certificado STCW generico."},
    {q:"El grado STCW tiene renovacion periodica automatica como los certificados de seguridad?",opts:["Si, cada 5 anos","No, pero se exige revalidacion mediante tiempo de mar tras una interrupcion","Si, cada 2 anos","Nunca necesita revalidacion"],correct:1,exp:"A diferencia de los certificados de seguridad, el grado STCW no se renueva periodicamente pero puede necesitar revalidacion."},
  ],
  pt:[
    {q:"Quantos modulos distintos compoem o Basic Safety Training?",opts:["2","3","4","5"],correct:2,exp:"O BST tem 4 modulos distintos, cada um com seu proprio certificado."},
    {q:"Qual certificado e especifico do departamento de Conves?",opts:["ECDIS","Habilitacao de alta tensao","ERM","UMS"],correct:0,exp:"O ECDIS e um certificado especifico do departamento de Conves."},
    {q:"Qual certificado e especifico do departamento de Maquinas?",opts:["ARPA","GMDSS","Habilitacao eletrica de alta tensao","BRM"],correct:2,exp:"A habilitacao eletrica de alta tensao e especifica do departamento de Maquinas."},
    {q:"Qual e a principal licao do caso Bow Mariner (2004)?",opts:["O certificado generico STCW sempre basta","Um treinamento especifico dos produtos transportados e indispensavel, alem do certificado generico","A velocidade e a principal causa dos acidentes","Os petroleiros sao mais seguros que os navios de carga"],correct:1,exp:"O acidente ilustra a importancia dos treinamentos especificos de petroleiros, alem do certificado STCW generico."},
    {q:"O posto STCW tem renovacao periodica automatica como os certificados de seguranca?",opts:["Sim, a cada 5 anos","Nao, mas e exigida revalidacao por tempo de mar apos uma interrupcao","Sim, a cada 2 anos","Nunca precisa de revalidacao"],correct:1,exp:"Diferente dos certificados de seguranca, o posto STCW nao se renova periodicamente mas pode exigir revalidacao."},
  ],
};

function CertificationDetail({ lang, onBack }:{ lang:string; onBack:()=>void }) {
  const t=T[lang]||T.fr;
  const profile=loadProfile();
  const hasDept=profile&&(profile.dept==="deck"||profile.dept==="engine");
  const dept=hasDept?profile.dept:"deck";
  const items=(dept==="deck"?DECK_CERTS[lang]:ENGINE_CERTS[lang])||(dept==="deck"?DECK_CERTS.fr:ENGINE_CERTS.fr);
  const title=dept==="deck"?t.deckTitle:t.engineTitle;
  const [sel,setSel]=useState<number|null>(null);

  return (
    <div style={{borderRadius:14,background:"rgba(10,22,40,0.85)",border:`1px solid ${C.primary}33`,padding:16,marginBottom:20}}>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.accent,marginBottom:10}}>{title}</div>
      {!hasDept&&(
        <div style={{marginBottom:14,padding:12,borderRadius:10,background:`${C.danger}14`,border:`1px solid ${C.danger}44`}}>
          <div style={{fontSize:11,color:"rgba(240,244,255,0.75)",fontFamily:"Courier New",lineHeight:1.6,marginBottom:8}}>{t.noProfileMsg}</div>
          <button onClick={onBack} style={{width:"100%",padding:"9px 0",borderRadius:8,border:`1px solid ${C.primary}66`,
            background:`${C.primary}1a`,color:C.accent,fontSize:11,fontWeight:700,fontFamily:"Courier New",cursor:"pointer"}}>{t.goToL1}</button>
        </div>
      )}
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:10}}>
        {items.map((it:any,i:number)=>(
          <button key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            padding:"9px 13px",borderRadius:10,cursor:"pointer",fontSize:12,fontFamily:"Courier New",
            border:`1.5px solid ${sel===i?C.primary:"rgba(255,255,255,0.15)"}`,
            background:sel===i?`${C.primary}22`:"rgba(255,255,255,0.04)",
            color:sel===i?C.accent:"rgba(240,244,255,0.7)",fontWeight:sel===i?700:400}}>{it.name}</button>
        ))}
      </div>
      {sel!==null&&(
        <div style={{padding:12,borderRadius:10,background:"rgba(13,31,60,0.8)",border:`1px solid ${C.primary}33`,
          fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New"}}>{items[sel].desc}</div>
      )}
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
  const dept=profile?.dept==="engine"?"engine":"deck";
  const dynamicEx=dept==="engine"
    ?{q:t.exq2_engine_q,a:t.exq2_engine_a}
    :{q:t.exq2_deck_q,a:t.exq2_deck_a};
  const ex=[t.exStatic[0],dynamicEx,t.exStatic[1]];

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

function QuestionBank({ lang, onComplete }:{ lang:string; onComplete?:()=>void }) {
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
  const bankNext=()=>{if(bankCur+1>=bank.length){setBankDone(true);if(onComplete)onComplete();return;}setBankCur(c=>c+1);setBankSel(null);};
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
  const [practiceDone, setPracticeDone] = useState(false);
  const t=T[lang]||T.fr;
  const bst=BST_MODULES[lang]||BST_MODULES.fr;
  const renewal=RENEWAL[lang]||RENEWAL.fr;
  const trainings=TRAININGS[lang]||TRAININGS.fr;
  return (
    <div style={{padding:"14px 14px 24px"}}>
      <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New",marginBottom:10}}>{t.intro}</div>
      <div style={{fontSize:10,color:"rgba(240,244,255,0.4)",fontStyle:"italic",fontFamily:"Courier New",marginBottom:18,lineHeight:1.5}}>{t.disclaimer}</div>

      <CertificationDetail lang={lang} onBack={onBack}/>

      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.accent,margin:"20px 0 10px"}}>{t.s1title}</div>
      <TapGrid items={bst} hint={t.s1hint}/>

      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.accent,margin:"20px 0 10px"}}>{t.s2title}</div>
      <TapGrid items={renewal} hint={t.s2hint}/>

      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.accent,margin:"20px 0 10px"}}>{t.s3title}</div>
      <TapGrid items={trainings} hint={t.s3hint}/>

      <AccidentCase lang={lang}/>
      <Exercises lang={lang}/>
      <QuestionBank lang={lang} onComplete={()=>setPracticeDone(true)}/>

      <div style={{borderRadius:14,background:"rgba(10,22,40,0.8)",border:`1px solid ${C.gold}44`,padding:14,margin:"20px 0"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:11,color:C.gold,marginBottom:10}}>{t.keypoints}</div>
        {t.kp.map((k:string,i:number)=>(
          <div key={i} style={{display:"flex",gap:8,marginBottom:6,fontSize:11,color:"rgba(240,244,255,0.7)",fontFamily:"Courier New",lineHeight:1.5}}>
            <span style={{color:C.gold,flexShrink:0}}>{"\u2726"}</span><span>{k}</span>
          </div>
        ))}
      </div>

      <button disabled={!practiceDone} onClick={()=>{if(practiceDone)onStartQuiz();}} style={{opacity:practiceDone?1:0.45,cursor:practiceDone?"pointer":"not-allowed",width:"100%",padding:"15px 0",border:"none",borderRadius:14,
        background:`linear-gradient(135deg,${C.primary},${C.secondary})`,fontFamily:"'Cinzel',serif",fontSize:14,
        fontWeight:700,letterSpacing:2,color:"#fff",}}>{t.startQuiz}</button>
    </div>
  );
}

export default function LessonShipCareer_L3({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t=T[lang]||T.fr;
  const [phase,setPhase]=useState<"content"|"quiz">("content");
  const [quizDone,setQuizDone]=useState(false);
  const progress=phase==="content"?50:quizDone?100:85;
  const backLabel=lang==="fr"?"◀ Retour":lang==="en"?"◀ Back":lang==="es"?"◀ Volver":"◀ Voltar";
  const moduleFull=lang==="fr"?"Module Carrière — Ship Career Navigator":lang==="en"?"Career Module — Ship Career Navigator":lang==="es"?"Módulo Carrera — Ship Career Navigator":"Módulo Carreira — Ship Career Navigator";
  const lessonOf=lang==="fr"?"Leçon 3/5":lang==="en"?"Lesson 3/5":lang==="es"?"Lección 3/5":"Lição 3/5";
  const badgeText=lang==="fr"?`📜 ${moduleFull} · Leçon 3/5 · ⭐ Premium+ · 250 XP`:lang==="en"?`📜 ${moduleFull} · Lesson 3/5 · ⭐ Premium+ · 250 XP`:lang==="es"?`📜 ${moduleFull} · Lección 3/5 · ⭐ Premium+ · 250 XP`:`📜 ${moduleFull} · Lição 3/5 · ⭐ Premium+ · 250 XP`;
  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(180deg,${C.navy},${C.navy2})`,color:"#f0f4ff"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.primary}33`}}>
        <div style={{minHeight:54,display:"flex",alignItems:"center",padding:"8px 16px",gap:12}}>
          <button onClick={phase==="content"?onBack:()=>setPhase("content")} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>{backLabel}</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:10,color:C.accent,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>📜 {moduleFull}</div>
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
