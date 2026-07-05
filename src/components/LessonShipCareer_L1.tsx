// LessonShipCareer_L1 - Ton profil de carriere
import { useState, useEffect } from "react";

const C = {
  primary:"#8b5cf6", secondary:"#6366f1",
  accent:"#a78bfa", gold:"#c9922a",
  safe:"#4ade80", danger:"#ef4444",
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
};

const DEPTS = ["deck","engine"];
const VESSELS = ["cargo","tanker","passenger","offshore","yacht","fishing"];

const T: any = {
  fr:{
    moduleLabel:"CARRIERE - TON PROFIL",
    lessonTitle:"Ton profil de carriere",
    intro:"Chaque officier suit un parcours structure par l'OMI (STCW) fait de paliers, de certificats et de temps de mer. Comprendre cette echelle - et choisir ta propre trajectoire - est la premiere etape pour construire une feuille de route realiste vers le poste que tu vises.",
    profileTitle:"Construis ton profil",
    profileHint:"Ces choix seront reutilises dans les lecons suivantes pour generer ta feuille de route personnalisee.",
    deptLabel:"Departement", currentLabel:"Poste actuel", targetLabel:"Poste vise", vesselLabel:"Type de navire vise",
    deptOpts:{deck:"Pont (Deck)", engine:"Machine (Engine)"},
    currentOpts_deck:["Cadet Pont","Matelot / OS","OOW (Officier de quart)","Second Capitaine"],
    currentOpts_engine:["Cadet Machine","Matelot machine","3e/4e Mecanicien","Second Mecanicien"],
    targetOpts_deck:["OOW (Officier de quart)","Second Capitaine","Capitaine"],
    targetOpts_engine:["3e/4e Mecanicien","Second Mecanicien","Chef Mecanicien"],
    vesselOptsLabel:{cargo:"Cargo / Porte-conteneurs",tanker:"Tanker (petrolier/chimiquier)",passenger:"Navire a passagers / Croisiere",offshore:"Offshore / Support",yacht:"Yacht",fishing:"Peche (Fishing)"},
    saveBtn:"Enregistrer mon profil", savedMsg:"Profil enregistre - reutilise dans les lecons suivantes",
    s1title:"Echelle de progression - Pont", s1hint:"Touche un grade",
    s2title:"Echelle de progression - Machine", s2hint:"Touche un grade",
    s3title:"Certificats STCW par palier", s3hint:"Touche un certificat",
    s4title:"Types de navires & specialisations", s4hint:"Touche un type de navire",
    keypoints:"Points cles",
    kp:[
      "La progression de carriere en mer suit une echelle STCW commune a tous les pavillons",
      "Chaque palier exige un certificat de competence (COC) et un temps de mer minimum documente",
      "Le departement Pont et le departement Machine ont des echelles paralleles mais distinctes",
      "Le type de navire vise (tanker, passagers, offshore) ajoute des formations obligatoires specifiques",
      "Le temps de mer doit etre valide et signe par le Capitaine pour compter dans le dossier STCW",
      "Un changement de type de navire en cours de carriere peut exiger des cours d'adaptation courts",
    ],
    accidentTitle:"Cas reel : El Faro (2015)",
    accidentText:"Le cargo americain El Faro a coule au large des Bahamas en octobre 2015 durant l'ouragan Joaquin, avec la perte des 33 membres d'equipage. L'enquete du NTSB a mis en cause plusieurs facteurs lies a la chaine de commandement et a la formation : le Capitaine disposait de previsions meteo obsoletes et a maintenu sa route malgre les alertes d'un officier subalterne, illustrant une defaillance de gestion des ressources passerelle (BRM). L'enquete a egalement souligne l'importance d'une progression de carriere fondee sur une experience reelle et variee, et pas seulement sur l'accumulation de temps de mer minimal. Cet accident reste une reference dans la formation au leadership et a la prise de decision en mer.",
    accidentToggle:"Voir le cas complet",
    exTitle:"Exercice pratique",
    exq1:"Tu es actuellement {current} et tu vises le poste de {target}. D'apres l'echelle STCW, quels sont les elements cles de ce passage ?",
    exq1connect:"Le passage necessite un certificat specifique, du temps de mer documente et signe par ton superieur, et le maintien a jour de tes certificats de securite.",
    exq2:"Tu vises un poste sur : {vessel}. Quelles formations supplementaires ce type de navire exige-t-il par rapport a un cursus standard ?",
    exq3:"Compare le sommet de la filiere que tu as choisie avec les exigences specifiques de ton navire vise ({vessel}). Quelles competences s'ajoutent au grade le plus eleve ?",
    exq3connect:"A cela s'ajoutent les exigences specifiques de ce type de navire :",
    defaultCurrent:"Cadet Pont", defaultTarget:"Capitaine", defaultVessel:"Cargo / Porte-conteneurs",
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
    startQuiz:"COMMENCER LE QUIZ",
    disclaimer:"Les durees et exigences indiquees (temps de mer, validite des certificats) peuvent varier selon le pavillon, l'administration maritime nationale et le type de navire.",
  },
  en:{
    moduleLabel:"CAREER - YOUR PROFILE",
    lessonTitle:"Your career profile",
    intro:"Every officer follows a career path structured by IMO (STCW) made of ranks, certificates and sea time. Understanding this ladder - and choosing your own trajectory - is the first step to building a realistic roadmap toward the position you are aiming for.",
    profileTitle:"Build your profile",
    profileHint:"These choices will be reused in the following lessons to generate your personalized roadmap.",
    deptLabel:"Department", currentLabel:"Current rank", targetLabel:"Target rank", vesselLabel:"Target vessel type",
    deptOpts:{deck:"Deck", engine:"Engine"},
    currentOpts_deck:["Deck Cadet","Rating / OS","OOW (Officer of the Watch)","Chief Mate"],
    currentOpts_engine:["Engine Cadet","Rating (Engine)","3rd/4th Engineer","2nd Engineer"],
    targetOpts_deck:["OOW (Officer of the Watch)","Chief Mate","Master"],
    targetOpts_engine:["3rd/4th Engineer","2nd Engineer","Chief Engineer"],
    vesselOptsLabel:{cargo:"Cargo / Container",tanker:"Tanker (oil/chemical)",passenger:"Passenger / Cruise",offshore:"Offshore / Support",yacht:"Yacht",fishing:"Fishing"},
    saveBtn:"Save my profile", savedMsg:"Profile saved - reused in the next lessons",
    s1title:"Deck Career Ladder", s1hint:"Tap a rank",
    s2title:"Engine Career Ladder", s2hint:"Tap a rank",
    s3title:"STCW Certificates by Rank", s3hint:"Tap a certificate",
    s4title:"Vessel Types & Specializations", s4hint:"Tap a vessel type",
    keypoints:"Key Points",
    kp:[
      "Sea career progression follows a common STCW ladder across flag states",
      "Each rank requires a Certificate of Competency (COC) and a documented minimum sea time",
      "Deck and Engine departments have parallel but distinct ladders",
      "The target vessel type (tanker, passenger, offshore) adds specific mandatory training",
      "Sea time must be validated and signed by the Master to count toward the STCW record",
      "Switching vessel type mid-career may require short adaptation courses",
    ],
    accidentTitle:"Real case: El Faro (2015)",
    accidentText:"The US cargo ship El Faro sank off the Bahamas in October 2015 during Hurricane Joaquin, with the loss of all 33 crew members. The NTSB investigation identified several factors linked to the chain of command and training: the Master relied on outdated weather forecasts and maintained course despite warnings from a junior officer, illustrating a Bridge Resource Management (BRM) failure. The investigation also highlighted the importance of career progression built on real, varied experience rather than the mere accumulation of minimum sea time. This accident remains a reference case in leadership and decision-making training at sea.",
    accidentToggle:"View full case",
    exTitle:"Practice exercise",
    exq1:"You are currently {current} aiming for the position of {target}. Based on the STCW ladder, what are the key elements of this step?",
    exq1connect:"This step requires a specific certificate, documented sea time signed by your superior, and up to date safety certificates.",
    exq2:"You are aiming for a position on: {vessel}. What additional training does this vessel type require compared to a standard curriculum?",
    exq3:"Compare the top of the career ladder you chose with the specific requirements of your target vessel ({vessel}). What skills are added on top of the highest rank?",
    exq3connect:"On top of that, this vessel type adds the following specific requirements:",
    defaultCurrent:"Deck Cadet", defaultTarget:"Master", defaultVessel:"Cargo / Container",
    showAnswer:"Show answer", hideAnswer:"Hide",
    startQuiz:"START QUIZ",
    disclaimer:"Requirements may vary depending on flag state, national maritime authority and vessel type.",
  },
  es:{
    moduleLabel:"CARRERA - TU PERFIL",
    lessonTitle:"Tu perfil de carrera",
    intro:"Cada oficial sigue una trayectoria estructurada por la OMI (STCW) formada por grados, certificados y tiempo de mar. Comprender esta escala - y elegir tu propia trayectoria - es el primer paso para construir una hoja de ruta realista hacia el puesto que buscas.",
    profileTitle:"Construye tu perfil",
    profileHint:"Estas elecciones se reutilizaran en las siguientes lecciones para generar tu hoja de ruta personalizada.",
    deptLabel:"Departamento", currentLabel:"Puesto actual", targetLabel:"Puesto objetivo", vesselLabel:"Tipo de buque objetivo",
    deptOpts:{deck:"Puente (Deck)", engine:"Maquinas (Engine)"},
    currentOpts_deck:["Cadete de Puente","Marinero / OS","OOW (Oficial de guardia)","Primer Oficial"],
    currentOpts_engine:["Cadete de Maquinas","Marinero de maquinas","3er/4to Maquinista","Segundo Maquinista"],
    targetOpts_deck:["OOW (Oficial de guardia)","Primer Oficial","Capitan"],
    targetOpts_engine:["3er/4to Maquinista","Segundo Maquinista","Jefe de Maquinas"],
    vesselOptsLabel:{cargo:"Carga / Portacontenedores",tanker:"Tanquero (petroleo/quimico)",passenger:"Pasaje / Crucero",offshore:"Offshore / Apoyo",yacht:"Yate",fishing:"Pesca (Fishing)"},
    saveBtn:"Guardar mi perfil", savedMsg:"Perfil guardado - reutilizado en las siguientes lecciones",
    s1title:"Escala de progresion - Puente", s1hint:"Toca un grado",
    s2title:"Escala de progresion - Maquinas", s2hint:"Toca un grado",
    s3title:"Certificados STCW por grado", s3hint:"Toca un certificado",
    s4title:"Tipos de buque y especializaciones", s4hint:"Toca un tipo de buque",
    keypoints:"Puntos clave",
    kp:[
      "La progresion de carrera en el mar sigue una escala STCW comun a todos los pabellones",
      "Cada grado exige un certificado de competencia (COC) y un tiempo de mar minimo documentado",
      "Los departamentos de Puente y Maquinas tienen escalas paralelas pero distintas",
      "El tipo de buque objetivo (tanquero, pasaje, offshore) anade formaciones obligatorias especificas",
      "El tiempo de mar debe ser validado y firmado por el Capitan para contar en el expediente STCW",
      "Cambiar de tipo de buque durante la carrera puede exigir cursos cortos de adaptacion",
    ],
    accidentTitle:"Caso real: El Faro (2015)",
    accidentText:"El buque de carga estadounidense El Faro se hundio frente a las Bahamas en octubre de 2015 durante el huracan Joaquin, con la perdida de los 33 tripulantes. La investigacion del NTSB identifico varios factores relacionados con la cadena de mando y la formacion: el Capitan se baso en pronosticos meteorologicos desactualizados y mantuvo el rumbo pese a las advertencias de un oficial subalterno, lo que ilustra un fallo de gestion de recursos de puente (BRM). La investigacion tambien subrayo la importancia de una progresion de carrera basada en experiencia real y variada, y no solo en la acumulacion de tiempo de mar minimo. Este accidente sigue siendo un caso de referencia en la formacion sobre liderazgo y toma de decisiones en el mar.",
    accidentToggle:"Ver caso completo",
    exTitle:"Ejercicio practico",
    exq1:"Actualmente eres {current} y aspiras al puesto de {target}. Segun la escala STCW, cuales son los elementos clave de este ascenso?",
    exq1connect:"Este ascenso requiere un certificado especifico, tiempo de mar documentado y firmado por tu superior, y mantener vigentes tus certificados de seguridad.",
    exq2:"Aspiras a un puesto en: {vessel}. Que formaciones adicionales exige este tipo de buque frente a un plan de estudios estandar?",
    exq3:"Compara la cima de la carrera que elegiste con las exigencias especificas de tu buque objetivo ({vessel}). Que competencias se suman al grado mas alto?",
    exq3connect:"A esto se suman las exigencias especificas de este tipo de buque:",
    defaultCurrent:"Cadete de Puente", defaultTarget:"Capitan", defaultVessel:"Carga / Portacontenedores",
    showAnswer:"Ver correccion", hideAnswer:"Ocultar",
    startQuiz:"EMPEZAR QUIZ",
    disclaimer:"Los plazos y requisitos indicados pueden variar segun el pabellon, la administracion maritima nacional y el tipo de buque.",
  },
  pt:{
    moduleLabel:"CARREIRA - SEU PERFIL",
    lessonTitle:"Seu perfil de carreira",
    intro:"Cada oficial segue um percurso estruturado pela OMI (STCW), composto por postos, certificados e tempo de mar. Compreender essa escala - e escolher a sua propria trajetoria - e o primeiro passo para construir um roteiro realista rumo ao cargo que voce almeja.",
    profileTitle:"Construa seu perfil",
    profileHint:"Essas escolhas serao reutilizadas nas proximas licoes para gerar seu roteiro personalizado.",
    deptLabel:"Departamento", currentLabel:"Posto atual", targetLabel:"Posto almejado", vesselLabel:"Tipo de navio almejado",
    deptOpts:{deck:"Convés (Deck)", engine:"Maquinas (Engine)"},
    currentOpts_deck:["Cadete de Conves","Marinheiro / OS","OOW (Oficial de quarto)","Imediato"],
    currentOpts_engine:["Cadete de Maquinas","Marinheiro de maquinas","3o/4o Maquinista","Segundo Maquinista"],
    targetOpts_deck:["OOW (Oficial de quarto)","Imediato","Comandante"],
    targetOpts_engine:["3o/4o Maquinista","Segundo Maquinista","Chefe de Maquinas"],
    vesselOptsLabel:{cargo:"Carga / Porta-conteineres",tanker:"Petroleiro/Quimiqueiro",passenger:"Passageiros / Cruzeiro",offshore:"Offshore / Apoio",yacht:"Yate",fishing:"Pesca (Fishing)"},
    saveBtn:"Salvar meu perfil", savedMsg:"Perfil salvo - reutilizado nas proximas licoes",
    s1title:"Escala de progressao - Conves", s1hint:"Toque em um posto",
    s2title:"Escala de progressao - Maquinas", s2hint:"Toque em um posto",
    s3title:"Certificados STCW por posto", s3hint:"Toque em um certificado",
    s4title:"Tipos de navio e especializacoes", s4hint:"Toque em um tipo de navio",
    keypoints:"Pontos-chave",
    kp:[
      "A progressao de carreira no mar segue uma escala STCW comum a todas as bandeiras",
      "Cada posto exige um certificado de competencia (COC) e um tempo de mar minimo documentado",
      "Os departamentos de Conves e Maquinas tem escalas paralelas mas distintas",
      "O tipo de navio almejado (petroleiro, passageiros, offshore) acrescenta treinamentos obrigatorios especificos",
      "O tempo de mar deve ser validado e assinado pelo Comandante para contar no registro STCW",
      "Mudar de tipo de navio durante a carreira pode exigir cursos curtos de adaptacao",
    ],
    accidentTitle:"Caso real: El Faro (2015)",
    accidentText:"O navio de carga americano El Faro afundou perto das Bahamas em outubro de 2015 durante o furacao Joaquin, com a perda dos 33 tripulantes. A investigacao do NTSB apontou varios fatores ligados a cadeia de comando e ao treinamento: o Comandante usava previsoes meteorologicas desatualizadas e manteve o rumo apesar dos alertas de um oficial subalterno, ilustrando uma falha de gestao de recursos de passadico (BRM). A investigacao tambem destacou a importancia de uma progressao de carreira baseada em experiencia real e variada, e nao apenas no acumulo de tempo de mar minimo. Esse acidente continua sendo uma referencia na formacao sobre lideranca e tomada de decisao no mar.",
    accidentToggle:"Ver caso completo",
    exTitle:"Exercicio pratico",
    exq1:"Voce e atualmente {current} e almeja o posto de {target}. Segundo a escala STCW, quais sao os elementos-chave dessa promocao?",
    exq1connect:"Essa promocao exige um certificado especifico, tempo de mar documentado e assinado pelo seu superior, e a manutencao dos certificados de seguranca em dia.",
    exq2:"Voce almeja um posto em: {vessel}. Quais treinamentos adicionais esse tipo de navio exige em relacao a um curriculo padrao?",
    exq3:"Compare o topo da carreira que voce escolheu com as exigencias especificas do seu navio almejado ({vessel}). Quais competencias se somam ao posto mais alto?",
    exq3connect:"A isso se somam as exigencias especificas desse tipo de navio:",
    defaultCurrent:"Cadete de Conves", defaultTarget:"Comandante", defaultVessel:"Carga / Porta-conteineres",
    showAnswer:"Ver correcao", hideAnswer:"Ocultar",
    startQuiz:"COMECAR QUIZ",
    disclaimer:"Os prazos e exigencias indicados podem variar conforme a bandeira, a administracao maritima nacional e o tipo de navio.",
  },
};

const LADDER: any = {
  fr:{
    deck:[
      {name:"Cadet Pont",desc:"Formation initiale a bord sous supervision. Decouverte des taches de navigation, d'entretien et de securite. Duree typique : 12 mois de stage embarque valides par un livret de formation."},
      {name:"OOW - Officier de quart",desc:"Premier grade officier. Certificat STCW II/1. Responsable de la veille passerelle en toute autonomie sous l'autorite du Capitaine. Temps de mer minimum comme cadet requis avant l'examen."},
      {name:"Second Capitaine",desc:"Certificat STCW II/2 (limite ou illimite selon jauge). Responsable de la cargaison, de la stabilite et de l'equipage pont. Remplace le Capitaine en son absence."},
      {name:"Capitaine",desc:"Certificat STCW II/2 Master. Responsabilite totale du navire, de l'equipage et de la cargaison. Autorite legale absolue a bord. Sommet de la filiere pont."},
    ],
    engine:[
      {name:"Cadet Machine",desc:"Formation initiale en salle des machines sous supervision. Decouverte de la propulsion, des auxiliaires et de la maintenance. Duree typique : 12 mois de stage embarque."},
      {name:"3e/4e Mecanicien",desc:"Premier grade officier machine. Certificat STCW III/1. Responsable de quart machine en autonomie. Gestion des auxiliaires et de la maintenance courante."},
      {name:"Second Mecanicien",desc:"Certificat STCW III/2. Adjoint direct du Chef Mecanicien. Responsable de l'organisation du travail en salle des machines et de la gestion des pieces detachees."},
      {name:"Chef Mecanicien",desc:"Certificat STCW III/2 Chief Engineer. Responsabilite totale de la propulsion, des systemes auxiliaires et de la securite technique du navire. Sommet de la filiere machine."},
    ],
  },
  en:{
    deck:[
      {name:"Deck Cadet",desc:"Initial onboard training under supervision. Introduction to navigation, maintenance and safety tasks. Typical duration: 12 months of onboard training validated by a training record book."},
      {name:"OOW - Officer of the Watch",desc:"First officer rank. STCW II/1 certificate. Responsible for the bridge watch autonomously under the Master's authority. Minimum sea time as cadet required before the exam."},
      {name:"Chief Mate",desc:"STCW II/2 certificate (limited or unlimited depending on tonnage). Responsible for cargo, stability and deck crew. Replaces the Master in their absence."},
      {name:"Master",desc:"STCW II/2 Master certificate. Full responsibility for the vessel, crew and cargo. Absolute legal authority on board. Top of the deck career ladder."},
    ],
    engine:[
      {name:"Engine Cadet",desc:"Initial engine room training under supervision. Introduction to propulsion, auxiliaries and maintenance. Typical duration: 12 months of onboard training."},
      {name:"3rd/4th Engineer",desc:"First engine officer rank. STCW III/1 certificate. Responsible for engine watch autonomously. Management of auxiliaries and routine maintenance."},
      {name:"2nd Engineer",desc:"STCW III/2 certificate. Direct deputy to the Chief Engineer. Responsible for organizing engine room work and spare parts management."},
      {name:"Chief Engineer",desc:"STCW III/2 Chief Engineer certificate. Full responsibility for propulsion, auxiliary systems and the vessel's technical safety. Top of the engine career ladder."},
    ],
  },
  es:{
    deck:[
      {name:"Cadete de Puente",desc:"Formacion inicial a bordo bajo supervision. Introduccion a la navegacion, el mantenimiento y la seguridad. Duracion tipica: 12 meses de practicas embarcadas validadas por un libro de formacion."},
      {name:"OOW - Oficial de guardia",desc:"Primer grado de oficial. Certificado STCW II/1. Responsable de la guardia de puente de forma autonoma bajo la autoridad del Capitan. Se requiere tiempo de mar minimo como cadete antes del examen."},
      {name:"Primer Oficial",desc:"Certificado STCW II/2 (limitado o ilimitado segun arqueo). Responsable de la carga, la estabilidad y la tripulacion de puente. Sustituye al Capitan en su ausencia."},
      {name:"Capitan",desc:"Certificado STCW II/2 Master. Responsabilidad total del buque, la tripulacion y la carga. Autoridad legal absoluta a bordo. Cima de la carrera de puente."},
    ],
    engine:[
      {name:"Cadete de Maquinas",desc:"Formacion inicial en sala de maquinas bajo supervision. Introduccion a la propulsion, los auxiliares y el mantenimiento. Duracion tipica: 12 meses de practicas embarcadas."},
      {name:"3er/4to Maquinista",desc:"Primer grado de oficial de maquinas. Certificado STCW III/1. Responsable de la guardia de maquinas de forma autonoma. Gestion de auxiliares y mantenimiento rutinario."},
      {name:"Segundo Maquinista",desc:"Certificado STCW III/2. Adjunto directo del Jefe de Maquinas. Responsable de organizar el trabajo en sala de maquinas y la gestion de repuestos."},
      {name:"Jefe de Maquinas",desc:"Certificado STCW III/2 Chief Engineer. Responsabilidad total de la propulsion, los sistemas auxiliares y la seguridad tecnica del buque. Cima de la carrera de maquinas."},
    ],
  },
  pt:{
    deck:[
      {name:"Cadete de Conves",desc:"Treinamento inicial a bordo sob supervisao. Introducao a navegacao, manutencao e seguranca. Duracao tipica: 12 meses de estagio embarcado validados por um livro de formacao."},
      {name:"OOW - Oficial de quarto",desc:"Primeiro posto de oficial. Certificado STCW II/1. Responsavel pelo quarto de passadico de forma autonoma sob a autoridade do Comandante. Tempo de mar minimo como cadete exigido antes do exame."},
      {name:"Imediato",desc:"Certificado STCW II/2 (limitado ou ilimitado conforme arqueacao). Responsavel pela carga, estabilidade e tripulacao de conves. Substitui o Comandante na sua ausencia."},
      {name:"Comandante",desc:"Certificado STCW II/2 Master. Responsabilidade total pelo navio, tripulacao e carga. Autoridade legal absoluta a bordo. Topo da carreira de conves."},
    ],
    engine:[
      {name:"Cadete de Maquinas",desc:"Treinamento inicial na casa de maquinas sob supervisao. Introducao a propulsao, auxiliares e manutencao. Duracao tipica: 12 meses de estagio embarcado."},
      {name:"3o/4o Maquinista",desc:"Primeiro posto de oficial de maquinas. Certificado STCW III/1. Responsavel pelo quarto de maquinas de forma autonoma. Gestao de auxiliares e manutencao de rotina."},
      {name:"Segundo Maquinista",desc:"Certificado STCW III/2. Adjunto direto do Chefe de Maquinas. Responsavel pela organizacao do trabalho na casa de maquinas e gestao de sobressalentes."},
      {name:"Chefe de Maquinas",desc:"Certificado STCW III/2 Chief Engineer. Responsabilidade total pela propulsao, sistemas auxiliares e seguranca tecnica do navio. Topo da carreira de maquinas."},
    ],
  },
};

const CERTS: any = {
  fr:[
    {name:"STCW II/1",desc:"Certificat d'Officier de quart Pont. Base de toute la filiere navigation. Requiert formation approuvee + temps de mer cadet + examen."},
    {name:"STCW II/2 (limite)",desc:"Second Capitaine / Capitaine sur navires de jauge limitee (souvent < 3000 GT). Premiere etape vers le commandement."},
    {name:"STCW II/2 (illimite)",desc:"Second Capitaine / Capitaine sans limite de jauge. Niveau requis pour la majorite des navires de commerce internationaux."},
    {name:"STCW III/1",desc:"Certificat d'Officier de quart Machine. Equivalent machine du II/1. Base de la filiere propulsion."},
    {name:"STCW III/2",desc:"Second Mecanicien / Chef Mecanicien. Equivalent machine du II/2, requis pour la responsabilite totale de la salle des machines."},
  ],
  en:[
    {name:"STCW II/1",desc:"Deck Officer of the Watch certificate. Foundation of the entire navigation career path. Requires approved training + cadet sea time + exam."},
    {name:"STCW II/2 (limited)",desc:"Chief Mate / Master on vessels of limited tonnage (often < 3000 GT). First step toward command."},
    {name:"STCW II/2 (unlimited)",desc:"Chief Mate / Master with no tonnage limit. Level required for most international merchant vessels."},
    {name:"STCW III/1",desc:"Engine Officer of the Watch certificate. Engine equivalent of II/1. Foundation of the propulsion career path."},
    {name:"STCW III/2",desc:"2nd Engineer / Chief Engineer. Engine equivalent of II/2, required for full responsibility of the engine room."},
  ],
  es:[
    {name:"STCW II/1",desc:"Certificado de Oficial de guardia de Puente. Base de toda la carrera de navegacion. Requiere formacion aprobada + tiempo de mar como cadete + examen."},
    {name:"STCW II/2 (limitado)",desc:"Primer Oficial / Capitan en buques de arqueo limitado (a menudo < 3000 GT). Primer paso hacia el mando."},
    {name:"STCW II/2 (ilimitado)",desc:"Primer Oficial / Capitan sin limite de arqueo. Nivel requerido para la mayoria de los buques mercantes internacionales."},
    {name:"STCW III/1",desc:"Certificado de Oficial de guardia de Maquinas. Equivalente de maquinas del II/1. Base de la carrera de propulsion."},
    {name:"STCW III/2",desc:"Segundo Maquinista / Jefe de Maquinas. Equivalente de maquinas del II/2, requerido para la responsabilidad total de la sala de maquinas."},
  ],
  pt:[
    {name:"STCW II/1",desc:"Certificado de Oficial de quarto de Conves. Base de toda a carreira de navegacao. Requer treinamento aprovado + tempo de mar como cadete + exame."},
    {name:"STCW II/2 (limitado)",desc:"Imediato / Comandante em navios de arqueacao limitada (frequentemente < 3000 GT). Primeiro passo rumo ao comando."},
    {name:"STCW II/2 (ilimitado)",desc:"Imediato / Comandante sem limite de arqueacao. Nivel exigido para a maioria dos navios mercantes internacionais."},
    {name:"STCW III/1",desc:"Certificado de Oficial de quarto de Maquinas. Equivalente de maquinas do II/1. Base da carreira de propulsao."},
    {name:"STCW III/2",desc:"Segundo Maquinista / Chefe de Maquinas. Equivalente de maquinas do II/2, exigido para a responsabilidade total da casa de maquinas."},
  ],
};

const VESSELTYPES: any = {
  fr:[
    {name:"Cargo / Porte-conteneurs",desc:"Parcours standard, cursus STCW de base sans formation additionnelle obligatoire. Rotation rapide, equipage reduit, forte autonomie technique demandee."},
    {name:"Tanker (petrolier/chimiquier)",desc:"Formations obligatoires supplementaires : Tanker Familiarisation (V/1-1) pour tous, Advanced Training (V/1-2) pour le personnel cargaison. Primes salariales generalement plus elevees."},
    {name:"Navire a passagers / Croisiere",desc:"Formations obligatoires : Crowd Management, Crisis Management and Human Behaviour (V/2). Environnement multiculturel, gestion de grands equipages hoteliers."},
    {name:"Offshore / Support",desc:"Formations specifiques additionnelles possibles (DP - Dynamic Positioning, HUET). Operations pres des installations petrolieres, exigences de securite renforcees."},
    {name:"Yacht",desc:"Hotellerie de luxe et service aux proprietaires ou invites. Equipage tres reduit, contrats souvent saisonniers, pourboires pouvant representer une part importante du revenu."},
    {name:"Peche (Fishing)",desc:"Longues campagnes en mer, travail physique intense, exposition aux conditions meteorologiques difficiles. Remuneration souvent basee sur un systeme de parts liees a la peche realisee plutot qu'un salaire fixe."},
  ],
  en:[
    {name:"Cargo / Container",desc:"Standard path, base STCW curriculum with no mandatory additional training. Fast turnaround, small crew, high technical autonomy required."},
    {name:"Tanker (oil/chemical)",desc:"Additional mandatory training: Tanker Familiarisation (V/1-1) for all, Advanced Training (V/1-2) for cargo personnel. Generally higher salary premiums."},
    {name:"Passenger / Cruise",desc:"Mandatory training: Crowd Management, Crisis Management and Human Behaviour (V/2). Multicultural environment, management of large hotel crews."},
    {name:"Offshore / Support",desc:"Possible additional specific training (DP - Dynamic Positioning, HUET). Operations near oil installations, enhanced safety requirements."},
    {name:"Yacht",desc:"Luxury hospitality and service to owners or guests. Very small crew, often seasonal contracts, tips that can represent a significant share of income."},
    {name:"Fishing",desc:"Long voyages at sea, intense physical work, exposure to harsh weather conditions. Pay often based on a share system tied to the catch rather than a fixed salary."},
  ],
  es:[
    {name:"Carga / Portacontenedores",desc:"Recorrido estandar, plan de estudios STCW basico sin formacion adicional obligatoria. Rotacion rapida, tripulacion reducida, alta autonomia tecnica exigida."},
    {name:"Tanquero (petroleo/quimico)",desc:"Formaciones obligatorias adicionales: Tanker Familiarisation (V/1-1) para todos, Advanced Training (V/1-2) para el personal de carga. Primas salariales generalmente mas altas."},
    {name:"Pasaje / Crucero",desc:"Formaciones obligatorias: Crowd Management, Crisis Management and Human Behaviour (V/2). Entorno multicultural, gestion de grandes tripulaciones hoteleras."},
    {name:"Offshore / Apoyo",desc:"Posibles formaciones especificas adicionales (DP - Dynamic Positioning, HUET). Operaciones cerca de instalaciones petroleras, requisitos de seguridad reforzados."},
    {name:"Yate",desc:"Hoteleria de lujo y servicio a propietarios o invitados. Tripulacion muy reducida, contratos a menudo estacionales, propinas que pueden representar una parte importante del ingreso."},
    {name:"Pesca (Fishing)",desc:"Largas campanas en el mar, trabajo fisico intenso, exposicion a condiciones meteorologicas dificiles. Remuneracion a menudo basada en un sistema de partes ligado a la pesca realizada en lugar de un salario fijo."},
  ],
  pt:[
    {name:"Carga / Porta-conteineres",desc:"Percurso padrao, curriculo STCW basico sem treinamento adicional obrigatorio. Rotacao rapida, tripulacao reduzida, alta autonomia tecnica exigida."},
    {name:"Petroleiro/Quimiqueiro",desc:"Treinamentos obrigatorios adicionais: Tanker Familiarisation (V/1-1) para todos, Advanced Training (V/1-2) para o pessoal de carga. Adicionais salariais geralmente mais altos."},
    {name:"Passageiros / Cruzeiro",desc:"Treinamentos obrigatorios: Crowd Management, Crisis Management and Human Behaviour (V/2). Ambiente multicultural, gestao de grandes tripulacoes hoteleiras."},
    {name:"Offshore / Apoio",desc:"Possiveis treinamentos especificos adicionais (DP - Dynamic Positioning, HUET). Operacoes proximas a instalacoes petroliferas, exigencias de seguranca reforcadas."},
    {name:"Yate",desc:"Hotelaria de luxo e servico a proprietarios ou convidados. Tripulacao muito reduzida, contratos geralmente sazonais, gorjetas que podem representar uma parte importante da renda."},
    {name:"Pesca (Fishing)",desc:"Longas campanhas no mar, trabalho fisico intenso, exposicao a condicoes meteorologicas dificeis. Remuneracao geralmente baseada em um sistema de partes ligado a pesca realizada em vez de um salario fixo."},
  ],
};

const BANK: any = {
  fr:[
    {q:"Quel certificat STCW est requis pour devenir Officier de quart Pont ?",opts:["STCW II/1","STCW III/1","STCW II/2","STCW V/2"],correct:0,expl:"Le STCW II/1 est le certificat de base pour tout Officier de quart Pont (OOW)."},
    {q:"Quel est l'equivalent machine du certificat STCW II/1 ?",opts:["STCW III/2","STCW III/1","STCW V/1-1","STCW II/2"],correct:1,expl:"Le STCW III/1 est l'equivalent machine du II/1 : certificat d'Officier de quart Machine."},
    {q:"Quel grade remplace le Capitaine en son absence ?",opts:["OOW","Cadet","Second Capitaine","Chef Mecanicien"],correct:2,expl:"Le Second Capitaine est l'adjoint direct du Capitaine et le remplace en son absence."},
    {q:"Quelle formation supplementaire est obligatoire pour tout personnel affecte a un tanker ?",opts:["Crowd Management","Tanker Familiarisation V/1-1","DP Basic","HUET"],correct:1,expl:"Le Tanker Familiarisation (STCW V/1-1) est obligatoire pour tout personnel affecte a un tanker."},
    {q:"Quel certificat est necessaire pour devenir Capitaine sans limite de jauge ?",opts:["STCW II/2 limite","STCW II/1","STCW II/2 illimite","STCW III/2"],correct:2,expl:"Le STCW II/2 illimite permet de commander sans restriction de jauge."},
    {q:"Qui doit signer le temps de mer pour qu'il compte dans le dossier STCW ?",opts:["L'agent maritime","Le Capitaine","Le second mecanicien","L'ecole maritime"],correct:1,expl:"Seul le Capitaine peut valider et signer le temps de mer d'un marin."},
    {q:"Quelle formation est obligatoire pour un officier senior sur navire a passagers ?",opts:["Advanced Fire Fighting seulement","Crisis Management and Human Behaviour V/2","GMDSS","Tanker Advanced"],correct:1,expl:"Le V/2 (Crisis Management and Human Behaviour) est specifique aux navires a passagers."},
    {q:"Quel est le grade juste en dessous du Chef Mecanicien ?",opts:["3e Mecanicien","Second Mecanicien","Cadet Machine","OOW"],correct:1,expl:"Le Second Mecanicien est l'adjoint direct et le grade immediatement inferieur au Chef Mecanicien."},
    {q:"Quelle cause principale a ete identifiee dans l'accident du El Faro (2015) ?",opts:["Panne moteur","Defaillance de gestion des ressources passerelle (BRM)","Collision","Incendie cargaison"],correct:1,expl:"L'enquete NTSB a mis en cause une defaillance de Bridge Resource Management et de prise de decision."},
    {q:"Combien de membres d'equipage ont peri dans le naufrage du El Faro ?",opts:["12","20","33","45"],correct:2,expl:"Les 33 membres d'equipage ont peri lors du naufrage du El Faro en octobre 2015."},
    {q:"Quelle est la duree typique du stage cadet avant le premier grade officier ?",opts:["3 mois","6 mois","12 mois","24 mois"],correct:2,expl:"Le stage cadet dure typiquement 12 mois de temps de mer valide."},
    {q:"Quel document valide officiellement le temps de mer d'un marin ?",opts:["Le passeport","Le livret de formation / dossier STCW signe","Le contrat d'embauche","Le certificat medical"],correct:1,expl:"Le livret de formation signe par le Capitaine constitue la preuve officielle du temps de mer."},
    {q:"Quelle formation additionnelle concerne les operations de DP (Dynamic Positioning) ?",opts:["Modules Seamanship","Modules Offshore/Support","Modules SMCP","Modules MARPOL"],correct:1,expl:"Le DP (Dynamic Positioning) est une specialisation typique des navires Offshore/Support."},
    {q:"Quel est le role du Second Mecanicien a bord ?",opts:["Commandement du navire","Adjoint direct du Chef Mecanicien, organisation du travail en salle des machines","Gestion de la cargaison","Veille passerelle"],correct:1,expl:"Le Second Mecanicien organise le travail en salle des machines sous l'autorite du Chef Mecanicien."},
    {q:"Un changement de type de navire (ex: cargo vers tanker) en cours de carriere necessite generalement :",opts:["De recommencer tout le cursus depuis cadet","Des cours d'adaptation courts et une formation specifique","Aucune formation supplementaire","Un nouvel examen STCW II/1"],correct:1,expl:"Un changement de type de navire necessite generalement des formations d'adaptation courtes et cibleos, pas de reprendre tout le cursus."},
  ],
  en:[
    {q:"Which STCW certificate is required to become a Deck Officer of the Watch?",opts:["STCW II/1","STCW III/1","STCW II/2","STCW V/2"],correct:0,expl:"STCW II/1 is the base certificate for any Deck Officer of the Watch (OOW)."},
    {q:"What is the engine equivalent of the STCW II/1 certificate?",opts:["STCW III/2","STCW III/1","STCW V/1-1","STCW II/2"],correct:1,expl:"STCW III/1 is the engine equivalent of II/1: Engine Officer of the Watch certificate."},
    {q:"Which rank replaces the Master in their absence?",opts:["OOW","Cadet","Chief Mate","Chief Engineer"],correct:2,expl:"The Chief Mate is the Master's direct deputy and replaces them in their absence."},
    {q:"Which additional training is mandatory for all personnel assigned to a tanker?",opts:["Crowd Management","Tanker Familiarisation V/1-1","DP Basic","HUET"],correct:1,expl:"Tanker Familiarisation (STCW V/1-1) is mandatory for all personnel assigned to a tanker."},
    {q:"Which certificate is required to become Master with no tonnage limit?",opts:["STCW II/2 limited","STCW II/1","STCW II/2 unlimited","STCW III/2"],correct:2,expl:"STCW II/2 unlimited allows command with no tonnage restriction."},
    {q:"Who must sign off sea time for it to count in the STCW record?",opts:["The shipping agent","The Master","The 2nd Engineer","The maritime school"],correct:1,expl:"Only the Master can validate and sign a seafarer's sea time."},
    {q:"Which training is mandatory for a senior officer on a passenger ship?",opts:["Advanced Fire Fighting only","Crisis Management and Human Behaviour V/2","GMDSS","Tanker Advanced"],correct:1,expl:"V/2 (Crisis Management and Human Behaviour) is specific to passenger ships."},
    {q:"Which rank is directly below the Chief Engineer?",opts:["3rd Engineer","2nd Engineer","Engine Cadet","OOW"],correct:1,expl:"The 2nd Engineer is the direct deputy and the rank immediately below Chief Engineer."},
    {q:"What was the main cause identified in the El Faro accident (2015)?",opts:["Engine failure","Bridge Resource Management (BRM) failure","Collision","Cargo fire"],correct:1,expl:"The NTSB investigation identified a Bridge Resource Management and decision-making failure."},
    {q:"How many crew members died in the El Faro sinking?",opts:["12","20","33","45"],correct:2,expl:"All 33 crew members died in the sinking of the El Faro in October 2015."},
    {q:"What is the typical duration of the cadet training period before the first officer rank?",opts:["3 months","6 months","12 months","24 months"],correct:2,expl:"Cadet training typically lasts 12 months of validated sea time."},
    {q:"Which document officially validates a seafarer's sea time?",opts:["The passport","The training record book / signed STCW record","The employment contract","The medical certificate"],correct:1,expl:"The training record book signed by the Master is the official proof of sea time."},
    {q:"Which additional training relates to Dynamic Positioning (DP) operations?",opts:["Seamanship modules","Offshore/Support modules","SMCP modules","MARPOL modules"],correct:1,expl:"DP (Dynamic Positioning) is a typical specialization for Offshore/Support vessels."},
    {q:"What is the role of the 2nd Engineer on board?",opts:["Command of the vessel","Direct deputy to the Chief Engineer, organizing engine room work","Cargo management","Bridge watch"],correct:1,expl:"The 2nd Engineer organizes engine room work under the Chief Engineer's authority."},
    {q:"Switching vessel type mid-career (e.g. cargo to tanker) generally requires:",opts:["Restarting the whole curriculum from cadet","Short, targeted adaptation courses","No additional training","A new STCW II/1 exam"],correct:1,expl:"Switching vessel type generally requires short, targeted adaptation training, not restarting the whole curriculum."},
  ],
  es:[
    {q:"Que certificado STCW se requiere para ser Oficial de guardia de Puente?",opts:["STCW II/1","STCW III/1","STCW II/2","STCW V/2"],correct:0,expl:"El STCW II/1 es el certificado base para cualquier Oficial de guardia de Puente (OOW)."},
    {q:"Cual es el equivalente de maquinas del certificado STCW II/1?",opts:["STCW III/2","STCW III/1","STCW V/1-1","STCW II/2"],correct:1,expl:"El STCW III/1 es el equivalente de maquinas del II/1: certificado de Oficial de guardia de Maquinas."},
    {q:"Que grado sustituye al Capitan en su ausencia?",opts:["OOW","Cadete","Primer Oficial","Jefe de Maquinas"],correct:2,expl:"El Primer Oficial es el adjunto directo del Capitan y lo sustituye en su ausencia."},
    {q:"Que formacion adicional es obligatoria para todo el personal asignado a un tanquero?",opts:["Crowd Management","Tanker Familiarisation V/1-1","DP Basic","HUET"],correct:1,expl:"Tanker Familiarisation (STCW V/1-1) es obligatorio para todo el personal asignado a un tanquero."},
    {q:"Que certificado se necesita para ser Capitan sin limite de arqueo?",opts:["STCW II/2 limitado","STCW II/1","STCW II/2 ilimitado","STCW III/2"],correct:2,expl:"El STCW II/2 ilimitado permite el mando sin restriccion de arqueo."},
    {q:"Quien debe firmar el tiempo de mar para que cuente en el expediente STCW?",opts:["El agente maritimo","El Capitan","El segundo maquinista","La escuela maritima"],correct:1,expl:"Solo el Capitan puede validar y firmar el tiempo de mar de un marino."},
    {q:"Que formacion es obligatoria para un oficial senior en un buque de pasaje?",opts:["Solo Advanced Fire Fighting","Crisis Management and Human Behaviour V/2","GMDSS","Tanker Advanced"],correct:1,expl:"El V/2 (Crisis Management and Human Behaviour) es especifico de los buques de pasaje."},
    {q:"Que grado esta justo por debajo del Jefe de Maquinas?",opts:["3er Maquinista","Segundo Maquinista","Cadete de Maquinas","OOW"],correct:1,expl:"El Segundo Maquinista es el adjunto directo y el grado inmediatamente inferior al Jefe de Maquinas."},
    {q:"Cual fue la causa principal identificada en el accidente del El Faro (2015)?",opts:["Fallo de motor","Fallo de gestion de recursos de puente (BRM)","Colision","Incendio de carga"],correct:1,expl:"La investigacion del NTSB identifico un fallo de Bridge Resource Management y de toma de decisiones."},
    {q:"Cuantos tripulantes murieron en el hundimiento del El Faro?",opts:["12","20","33","45"],correct:2,expl:"Los 33 tripulantes murieron en el hundimiento del El Faro en octubre de 2015."},
    {q:"Cual es la duracion tipica del periodo de cadete antes del primer grado de oficial?",opts:["3 meses","6 meses","12 meses","24 meses"],correct:2,expl:"El periodo de cadete dura tipicamente 12 meses de tiempo de mar validado."},
    {q:"Que documento valida oficialmente el tiempo de mar de un marino?",opts:["El pasaporte","El libro de formacion / expediente STCW firmado","El contrato de trabajo","El certificado medico"],correct:1,expl:"El libro de formacion firmado por el Capitan es la prueba oficial del tiempo de mar."},
    {q:"Que formacion adicional se relaciona con las operaciones de DP (Dynamic Positioning)?",opts:["Modulos de Seamanship","Modulos Offshore/Apoyo","Modulos SMCP","Modulos MARPOL"],correct:1,expl:"El DP (Dynamic Positioning) es una especializacion tipica de los buques Offshore/Apoyo."},
    {q:"Cual es el rol del Segundo Maquinista a bordo?",opts:["Mando del buque","Adjunto directo del Jefe de Maquinas, organizacion del trabajo en sala de maquinas","Gestion de la carga","Guardia de puente"],correct:1,expl:"El Segundo Maquinista organiza el trabajo en sala de maquinas bajo la autoridad del Jefe de Maquinas."},
    {q:"Cambiar de tipo de buque durante la carrera (ej: carga a tanquero) generalmente requiere:",opts:["Reiniciar todo el plan de estudios desde cadete","Cursos de adaptacion cortos y especificos","Ninguna formacion adicional","Un nuevo examen STCW II/1"],correct:1,expl:"Cambiar de tipo de buque generalmente requiere formaciones de adaptacion cortas y especificas, no reiniciar todo el plan de estudios."},
  ],
  pt:[
    {q:"Qual certificado STCW e necessario para ser Oficial de quarto de Conves?",opts:["STCW II/1","STCW III/1","STCW II/2","STCW V/2"],correct:0,expl:"O STCW II/1 e o certificado base para qualquer Oficial de quarto de Conves (OOW)."},
    {q:"Qual e o equivalente de maquinas do certificado STCW II/1?",opts:["STCW III/2","STCW III/1","STCW V/1-1","STCW II/2"],correct:1,expl:"O STCW III/1 e o equivalente de maquinas do II/1: certificado de Oficial de quarto de Maquinas."},
    {q:"Qual posto substitui o Comandante na sua ausencia?",opts:["OOW","Cadete","Imediato","Chefe de Maquinas"],correct:2,expl:"O Imediato e o adjunto direto do Comandante e o substitui na sua ausencia."},
    {q:"Qual treinamento adicional e obrigatorio para todo o pessoal designado a um navio-tanque?",opts:["Crowd Management","Tanker Familiarisation V/1-1","DP Basic","HUET"],correct:1,expl:"O Tanker Familiarisation (STCW V/1-1) e obrigatorio para todo o pessoal designado a um navio-tanque."},
    {q:"Qual certificado e necessario para ser Comandante sem limite de arqueacao?",opts:["STCW II/2 limitado","STCW II/1","STCW II/2 ilimitado","STCW III/2"],correct:2,expl:"O STCW II/2 ilimitado permite o comando sem restricao de arqueacao."},
    {q:"Quem deve assinar o tempo de mar para que conte no registro STCW?",opts:["O agente maritimo","O Comandante","O segundo maquinista","A escola maritima"],correct:1,expl:"Somente o Comandante pode validar e assinar o tempo de mar de um marinheiro."},
    {q:"Qual treinamento e obrigatorio para um oficial senior em navio de passageiros?",opts:["Apenas Advanced Fire Fighting","Crisis Management and Human Behaviour V/2","GMDSS","Tanker Advanced"],correct:1,expl:"O V/2 (Crisis Management and Human Behaviour) e especifico dos navios de passageiros."},
    {q:"Qual posto esta logo abaixo do Chefe de Maquinas?",opts:["3o Maquinista","Segundo Maquinista","Cadete de Maquinas","OOW"],correct:1,expl:"O Segundo Maquinista e o adjunto direto e o posto imediatamente abaixo do Chefe de Maquinas."},
    {q:"Qual foi a causa principal identificada no acidente do El Faro (2015)?",opts:["Falha de motor","Falha de gestao de recursos de passadico (BRM)","Colisao","Incendio de carga"],correct:1,expl:"A investigacao do NTSB apontou uma falha de Bridge Resource Management e de tomada de decisao."},
    {q:"Quantos tripulantes morreram no naufragio do El Faro?",opts:["12","20","33","45"],correct:2,expl:"Os 33 tripulantes morreram no naufragio do El Faro em outubro de 2015."},
    {q:"Qual e a duracao tipica do periodo de cadete antes do primeiro posto de oficial?",opts:["3 meses","6 meses","12 meses","24 meses"],correct:2,expl:"O periodo de cadete dura tipicamente 12 meses de tempo de mar validado."},
    {q:"Qual documento valida oficialmente o tempo de mar de um marinheiro?",opts:["O passaporte","O livro de formacao / registro STCW assinado","O contrato de trabalho","O atestado medico"],correct:1,expl:"O livro de formacao assinado pelo Comandante e a prova oficial do tempo de mar."},
    {q:"Qual treinamento adicional se relaciona as operacoes de DP (Dynamic Positioning)?",opts:["Modulos de Seamanship","Modulos Offshore/Apoio","Modulos SMCP","Modulos MARPOL"],correct:1,expl:"O DP (Dynamic Positioning) e uma especializacao tipica dos navios Offshore/Apoio."},
    {q:"Qual e o papel do Segundo Maquinista a bordo?",opts:["Comando do navio","Adjunto direto do Chefe de Maquinas, organizacao do trabalho na casa de maquinas","Gestao da carga","Quarto de passadico"],correct:1,expl:"O Segundo Maquinista organiza o trabalho na casa de maquinas sob a autoridade do Chefe de Maquinas."},
    {q:"Mudar de tipo de navio durante a carreira (ex: carga para petroleiro) geralmente exige:",opts:["Recomecar todo o curriculo desde cadete","Cursos de adaptacao curtos e especificos","Nenhum treinamento adicional","Um novo exame STCW II/1"],correct:1,expl:"Mudar de tipo de navio geralmente exige treinamentos de adaptacao curtos e especificos, nao recomecar todo o curriculo."},
  ],
};

const QUIZ: any = {
  fr:[
    {q:"Quel departement gere la stabilite et la cargaison a bord ?",opts:["Machine","Pont","Hotellerie","Radio"],correct:1,exp:"Le departement Pont est responsable de la navigation, de la cargaison et de la stabilite."},
    {q:"Quel est le sommet de la filiere machine ?",opts:["Second Mecanicien","Chef Mecanicien","3e Mecanicien","Cadet Machine"],correct:1,exp:"Le Chef Mecanicien est le grade le plus eleve de la filiere machine."},
    {q:"Quelle formation est specifique aux tankers ?",opts:["Crowd Management","Tanker Familiarisation","HUET","DP Basic"],correct:1,exp:"Le Tanker Familiarisation (V/1-1) est la formation obligatoire specifique aux tankers."},
    {q:"Quel enseignement tire-t-on principalement du cas El Faro ?",opts:["L'importance de la vitesse maximale","L'importance de la gestion des ressources passerelle et de la prise de decision","L'importance de la maintenance moteur","L'importance du choix du pavillon"],correct:1,exp:"L'accident illustre l'importance du Bridge Resource Management et d'une prise de decision collective."},
    {q:"Que faut-il pour qu'un temps de mer compte officiellement dans un dossier STCW ?",opts:["Une simple declaration ecrite","La validation et la signature du Capitaine","Un temoin a terre","Rien, c'est automatique"],correct:1,exp:"Le temps de mer doit imperativement etre valide et signe par le Capitaine."},
  ],
  en:[
    {q:"Which department manages stability and cargo on board?",opts:["Engine","Deck","Hotel","Radio"],correct:1,exp:"The Deck department is responsible for navigation, cargo and stability."},
    {q:"What is the top of the engine career ladder?",opts:["2nd Engineer","Chief Engineer","3rd Engineer","Engine Cadet"],correct:1,exp:"The Chief Engineer is the highest rank in the engine career path."},
    {q:"Which training is specific to tankers?",opts:["Crowd Management","Tanker Familiarisation","HUET","DP Basic"],correct:1,exp:"Tanker Familiarisation (V/1-1) is the mandatory training specific to tankers."},
    {q:"What is the main lesson drawn from the El Faro case?",opts:["The importance of maximum speed","The importance of Bridge Resource Management and decision-making","The importance of engine maintenance","The importance of flag choice"],correct:1,exp:"The accident illustrates the importance of Bridge Resource Management and collective decision-making."},
    {q:"What is required for sea time to officially count in an STCW record?",opts:["A simple written statement","Validation and signature by the Master","A witness ashore","Nothing, it is automatic"],correct:1,exp:"Sea time must always be validated and signed by the Master."},
  ],
  es:[
    {q:"Que departamento gestiona la estabilidad y la carga a bordo?",opts:["Maquinas","Puente","Hoteleria","Radio"],correct:1,exp:"El departamento de Puente es responsable de la navegacion, la carga y la estabilidad."},
    {q:"Cual es la cima de la carrera de maquinas?",opts:["Segundo Maquinista","Jefe de Maquinas","3er Maquinista","Cadete de Maquinas"],correct:1,exp:"El Jefe de Maquinas es el grado mas alto de la carrera de maquinas."},
    {q:"Que formacion es especifica de los tanqueros?",opts:["Crowd Management","Tanker Familiarisation","HUET","DP Basic"],correct:1,exp:"El Tanker Familiarisation (V/1-1) es la formacion obligatoria especifica de los tanqueros."},
    {q:"Que enseñanza principal se extrae del caso El Faro?",opts:["La importancia de la velocidad maxima","La importancia de la gestion de recursos de puente y la toma de decisiones","La importancia del mantenimiento del motor","La importancia de la eleccion de pabellon"],correct:1,exp:"El accidente ilustra la importancia del Bridge Resource Management y de la toma de decisiones colectiva."},
    {q:"Que se necesita para que el tiempo de mar cuente oficialmente en un expediente STCW?",opts:["Una simple declaracion escrita","La validacion y firma del Capitan","Un testigo en tierra","Nada, es automatico"],correct:1,exp:"El tiempo de mar debe ser siempre validado y firmado por el Capitan."},
  ],
  pt:[
    {q:"Qual departamento gerencia a estabilidade e a carga a bordo?",opts:["Maquinas","Conves","Hotelaria","Radio"],correct:1,exp:"O departamento de Conves e responsavel pela navegacao, carga e estabilidade."},
    {q:"Qual e o topo da carreira de maquinas?",opts:["Segundo Maquinista","Chefe de Maquinas","3o Maquinista","Cadete de Maquinas"],correct:1,exp:"O Chefe de Maquinas e o posto mais alto da carreira de maquinas."},
    {q:"Qual treinamento e especifico dos petroleiros?",opts:["Crowd Management","Tanker Familiarisation","HUET","DP Basic"],correct:1,exp:"O Tanker Familiarisation (V/1-1) e o treinamento obrigatorio especifico dos petroleiros."},
    {q:"Qual e o principal ensinamento do caso El Faro?",opts:["A importancia da velocidade maxima","A importancia da gestao de recursos de passadico e da tomada de decisao","A importancia da manutencao do motor","A importancia da escolha da bandeira"],correct:1,exp:"O acidente ilustra a importancia do Bridge Resource Management e da tomada de decisao coletiva."},
    {q:"O que e necessario para que o tempo de mar conte oficialmente em um registro STCW?",opts:["Uma simples declaracao escrita","A validacao e assinatura do Comandante","Uma testemunha em terra","Nada, e automatico"],correct:1,exp:"O tempo de mar deve sempre ser validado e assinado pelo Comandante."},
  ],
};

function saveProfile(profile:any){
  try{
    const raw=localStorage.getItem("map_career_profile");
    const prev=raw?JSON.parse(raw):{};
    localStorage.setItem("map_career_profile",JSON.stringify({...prev,...profile}));
  }catch{}
}
function loadProfile():any{
  try{
    const raw=localStorage.getItem("map_career_profile");
    return raw?JSON.parse(raw):null;
  }catch{return null;}
}

function ProfileSelector({ lang }:{ lang:string }) {
  const t=T[lang]||T.fr;
  const existing=loadProfile();
  const [dept,setDept]=useState<string>(existing?.dept||"deck");
  const [current,setCurrent]=useState<string>(existing?.current||"");
  const [target,setTarget]=useState<string>(existing?.target||"");
  const [vessel,setVessel]=useState<string>(existing?.vessel||"cargo");
  const [saved,setSaved]=useState(false);
  const currentOpts=dept==="deck"?t.currentOpts_deck:t.currentOpts_engine;
  const targetOpts=dept==="deck"?t.targetOpts_deck:t.targetOpts_engine;
  const ranks=[...currentOpts,targetOpts[targetOpts.length-1]];
  const currentIdx=ranks.indexOf(current);
  const targetIdx=ranks.indexOf(target);

  const chip=(active:boolean)=>({
    padding:"9px 13px",borderRadius:10,border:`1.5px solid ${active?C.primary:"rgba(255,255,255,0.15)"}`,
    background:active?`${C.primary}22`:"rgba(255,255,255,0.04)",color:active?C.accent:"rgba(240,244,255,0.7)",
    fontSize:12,fontFamily:"Courier New",cursor:"pointer",fontWeight:active?700:400,
  });

  return (
    <div style={{borderRadius:14,background:"rgba(10,22,40,0.85)",border:`1px solid ${C.primary}33`,padding:16,marginBottom:20}}>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.accent,marginBottom:4}}>{t.profileTitle}</div>
      <div style={{fontSize:11,color:"rgba(240,244,255,0.5)",fontFamily:"Courier New",marginBottom:14,lineHeight:1.5}}>{t.profileHint}</div>

      <div style={{fontSize:11,color:"rgba(240,244,255,0.6)",fontFamily:"Courier New",marginBottom:6}}>{t.deptLabel}</div>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {DEPTS.map(d=>(
          <button key={d} onClick={()=>{setDept(d);setCurrent("");setTarget("");}} style={chip(dept===d)}>{t.deptOpts[d]}</button>
        ))}
      </div>

      <div style={{fontSize:11,color:"rgba(240,244,255,0.6)",fontFamily:"Courier New",marginBottom:6}}>{t.currentLabel}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:14}}>
        {currentOpts.map((o:string)=>(
          <button key={o} onClick={()=>setCurrent(o)} style={chip(current===o)}>{o}</button>
        ))}
      </div>

      <div style={{fontSize:11,color:"rgba(240,244,255,0.6)",fontFamily:"Courier New",marginBottom:6}}>{t.targetLabel}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:14}}>
        {targetOpts.map((o:string)=>(
          <button key={o} onClick={()=>setTarget(o)} style={chip(target===o)}>{o}</button>
        ))}
      </div>

      <div style={{fontSize:11,color:"rgba(240,244,255,0.6)",fontFamily:"Courier New",marginBottom:6}}>{t.vesselLabel}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
        {VESSELS.map(v=>(
          <button key={v} onClick={()=>setVessel(v)} style={chip(vessel===v)}>{t.vesselOptsLabel[v]}</button>
        ))}
      </div>

      <button onClick={()=>{saveProfile({dept,current,target,vessel,lang,currentIdx,targetIdx});setSaved(true);}} disabled={!current||!target}
        style={{width:"100%",padding:"12px 0",borderRadius:12,border:"none",cursor:current&&target?"pointer":"default",
          background:current&&target?`linear-gradient(135deg,${C.primary},${C.secondary})`:"rgba(255,255,255,0.06)",
          fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:1,
          color:current&&target?"#fff":"rgba(240,244,255,0.25)"}}>{t.saveBtn}</button>
      {saved&&<div style={{marginTop:10,fontSize:11,color:C.accent,fontFamily:"Courier New",textAlign:"center"}}>{t.savedMsg}</div>}
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
  const ladder=(LADDER[lang]||LADDER.fr)[dept];
  const vessels=VESSELTYPES[lang]||VESSELTYPES.fr;
  const currentLabel=profile?.current||t.defaultCurrent;
  const targetLabel=profile?.target||t.defaultTarget;
  const vesselLabel=(t.vesselOptsLabel&&profile?.vessel&&t.vesselOptsLabel[profile.vessel])||t.defaultVessel;
  const currentEntry=ladder.find((r:any)=>r.name===currentLabel)||ladder[0];
  const targetEntry=ladder.find((r:any)=>r.name===targetLabel)||ladder[ladder.length-1];
  const topEntry=ladder[ladder.length-1];
  const vesselEntry=vessels.find((v:any)=>v.name===vesselLabel);

  const ex=[
    {q:t.exq1.replace("{current}",currentLabel).replace("{target}",targetLabel),
     a:`${currentEntry.desc} ${t.exq1connect} ${targetEntry.desc}`},
    {q:t.exq2.replace("{vessel}",vesselLabel),
     a:vesselEntry?vesselEntry.desc:""},
    {q:t.exq3.replace("{vessel}",vesselLabel),
     a:`${topEntry.desc} ${t.exq3connect} ${vesselEntry?vesselEntry.desc:""}`},
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

function ContentPhase({ lang, onStartQuiz }:{ lang:string; onStartQuiz:()=>void }) {
  const t=T[lang]||T.fr;
  const ladder=LADDER[lang]||LADDER.fr;
  const certs=CERTS[lang]||CERTS.fr;
  const vessels=VESSELTYPES[lang]||VESSELTYPES.fr;
  return (
    <div style={{padding:"14px 14px 24px"}}>
      <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New",marginBottom:10}}>{t.intro}</div>
      <div style={{fontSize:10,color:"rgba(240,244,255,0.4)",fontStyle:"italic",fontFamily:"Courier New",marginBottom:18,lineHeight:1.5}}>{t.disclaimer}</div>

      <ProfileSelector lang={lang}/>

      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.accent,margin:"20px 0 10px"}}>{t.s1title}</div>
      <TapGrid items={ladder.deck} hint={t.s1hint}/>

      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.accent,margin:"20px 0 10px"}}>{t.s2title}</div>
      <TapGrid items={ladder.engine} hint={t.s2hint}/>

      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.accent,margin:"20px 0 10px"}}>{t.s3title}</div>
      <TapGrid items={certs} hint={t.s3hint}/>

      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.accent,margin:"20px 0 10px"}}>{t.s4title}</div>
      <TapGrid items={vessels} hint={t.s4hint}/>

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

function QuestionBank({ lang }:{ lang:string }) {
  const bank=BANK[lang]||BANK.fr;
  const [bankIdx,setBankIdx]=useState<number|null>(null);
  const [bankCur,setBankCur]=useState(0);
  const [bankSel,setBankSel]=useState<number|null>(null);
  const [bankScore,setBankScore]=useState(0);
  const [bankDone,setBankDone]=useState(false);
  const L:any={fr:{title:"Banque de questions",start:"COMMENCER =>",next:"SUIVANT =>",trophy:"TERMINER"},en:{title:"Question Bank",start:"START =>",next:"NEXT =>",trophy:"FINISH"},es:{title:"Banco de preguntas",start:"COMENZAR =>",next:"SIGUIENTE =>",trophy:"TERMINAR"},pt:{title:"Banco de questoes",start:"COMECAR =>",next:"PROXIMO =>",trophy:"TERMINAR"}};
  const l=L[lang]||L.fr;
  const startBank=()=>{setBankIdx(0);setBankCur(0);setBankSel(null);setBankScore(0);setBankDone(false);};
  const pickBank=(i:number)=>{if(bankSel!==null)return;setBankSel(i);if(i===bank[bankCur].correct)setBankScore(s=>s+1);};
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
          <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New",marginBottom:12,padding:12,borderRadius:10,background:"rgba(10,22,40,0.8)",border:`1px solid ${C.primary}22`}}>{bank[bankCur].q}</div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
            {bank[bankCur].opts.map((opt:string,oi:number)=>{
              let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.12)",col="rgba(240,244,255,0.6)";
              if(bankSel!==null){
                if(oi===bank[bankCur].correct){bg="rgba(76,175,80,0.15)";bd="#4ade80";col="#4ade80";}
                else if(oi===bankSel){bg="rgba(239,68,68,0.15)";bd="#ef4444";col="#ef4444";}
              }
              return(<button key={oi} onClick={()=>pickBank(oi)} disabled={bankSel!==null} style={{textAlign:"left",padding:"10px 12px",borderRadius:10,border:`1.5px solid ${bd}`,background:bg,color:col,fontSize:12,fontFamily:"Courier New",cursor:bankSel===null?"pointer":"default",lineHeight:1.4}}>{opt}</button>);
            })}
          </div>
          {bankSel!==null&&(
            <div>
              <div style={{padding:12,borderRadius:10,background:"rgba(13,31,60,0.8)",borderLeft:`3px solid ${bankSel===bank[bankCur].correct?"#4ade80":"#ef4444"}`,fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New",marginBottom:10}}>{bank[bankCur].expl}</div>
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

  const q=quiz[cur];
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

export default function LessonShipCareer_L1({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t=T[lang]||T.fr;
  const [phase,setPhase]=useState<"content"|"quiz">("content");
  const [quizDone,setQuizDone]=useState(false);
  const progress=phase==="content"?50:quizDone?100:85;
  const backLabel=lang==="fr"?"◀ Retour":lang==="en"?"◀ Back":lang==="es"?"◀ Volver":"◀ Voltar";
  const moduleFull=lang==="fr"?"Module Carrière — Ship Career Navigator":lang==="en"?"Career Module — Ship Career Navigator":lang==="es"?"Módulo Carrera — Ship Career Navigator":"Módulo Carreira — Ship Career Navigator";
  const lessonOf=lang==="fr"?"Leçon 1/5":lang==="en"?"Lesson 1/5":lang==="es"?"Lección 1/5":"Lição 1/5";
  const badgeText=lang==="fr"?`🧭 ${moduleFull} · Leçon 1/5 · ⭐ Premium+ · 250 XP`:lang==="en"?`🧭 ${moduleFull} · Lesson 1/5 · ⭐ Premium+ · 250 XP`:lang==="es"?`🧭 ${moduleFull} · Lección 1/5 · ⭐ Premium+ · 250 XP`:`🧭 ${moduleFull} · Lição 1/5 · ⭐ Premium+ · 250 XP`;
  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(180deg,${C.navy},${C.navy2})`,color:"#f0f4ff"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.primary}33`}}>
        <div style={{minHeight:54,display:"flex",alignItems:"center",padding:"8px 16px",gap:12}}>
          <button onClick={phase==="content"?onBack:()=>setPhase("content")} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>{backLabel}</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:10,color:C.accent,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🧭 {moduleFull}</div>
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
