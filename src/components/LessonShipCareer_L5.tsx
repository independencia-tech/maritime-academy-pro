// LessonShipCareer_L5 - Plan d'action et quiz final
import { useState, useEffect } from "react";
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
function loadCertsOwned():any{
  try{
    const raw=localStorage.getItem("map_certs_owned");
    return raw?JSON.parse(raw):{mandatory:{},recommended:{}};
  }catch{return {mandatory:{},recommended:{}};}
}
function saveCertsOwned(data:any){
  try{ localStorage.setItem("map_certs_owned",JSON.stringify(data)); }catch{}
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
const MONTHS=[12,6,12,12,0];

const T: any = {
  fr:{
    moduleLabel:"CARRIERE - PLAN D'ACTION",
    lessonTitle:"Ton plan d'action",
    intro:"Cette derniere lecon rassemble ton profil, ta feuille de route, tes certificats et les specificites de ton navire vise en un plan d'action concret - et te prepare a aller plus loin avec My Career Advisor.",
    disclaimer:"Les certificats, delais et remunerations mentionnes sont des reperes generaux, sans garantie de duree ni de salaire. Verifie toujours les exigences exactes auprès de l'administration de ton pavillon.",
    noProfileMsg:"Aucun profil trouve. Retourne a la lecon 1 (Ton profil) pour generer ton plan d'action personnalise.",
    goToL1:"Aller a la lecon 1",
    profileTitle:"Ton profil", roadmapTitle:"Ta feuille de route", vesselTitle:"Ton navire vise",
    deptLabel:"Departement", currentLabel:"Poste actuel", targetLabel:"Poste vise", vesselLabel:"Type de navire",
    totalLabel:"Temps de mer estime",
    certsTitle:"Tes certificats prioritaires",
    strongPhrase:"Avoir les certificats minimums te rend employable. Avoir des certificats supplementaires te rend competitif.",
    mandatoryTitle:"Certificats obligatoires", recommendedTitle:"Certificats recommandes (avantage competitif)",
    advancedTankerTitle:"Formation Tanker avancee (selon ton futur type de tanker)",
    advancedTankerNote:"Le certificat Advanced Tanker requis depend du type de tanker sur lequel tu navigueras (petrolier brut, chimiquier, ou gaz/LNG). Choisis ta specialisation une fois ton affectation connue.",
    scoreLabel:"Score", downloadBtn:"Telecharger ma checklist (PDF)", comingSoon:"COMING SOON",
    actionPlanTitle:"Ton plan d'action en 5 etapes",
    steps:[
      "Verifier les certificats obligatoires manquants",
      "Choisir un certificat recommande aligne avec ton navire vise",
      "Planifier ton temps de mer vers ton poste cible",
      "Construire ton reseau professionnel (LinkedIn, mentors, compagnies)",
      "Revisiter ce plan regulierement - les certificats expirent, les objectifs evoluent",
    ],
    insightTitle:"Career Insight",
    insightText:"La plupart des carrieres maritimes reussies se construisent par l'apprentissage continu, l'accumulation de temps de mer et des certifications reconnues internationalement.",
    exTitle:"Exercice final",
    exQ:"Liste les trois certificats que tu devrais obtenir en priorite.",
    exHintBtn:"Voir une piste", exHintHide:"Masquer",
    exHintPrefix:"D'apres ta checklist actuelle, il te manque encore :",
    exHintNone:"Bravo, tous les certificats de ta checklist sont deja coches ! Concentre-toi sur le maintien de leur validite.",
    keypoints:"Points cles du module",
    kp:[
      "Ton profil (L1) determine ta feuille de route (L2), tes certifications prioritaires (L3) et les specificites de ton navire vise (L4)",
      "Les certificats obligatoires te rendent employable ; les certificats recommandes te rendent competitif",
      "Le score de certificats s'adapte a ton departement et a ton navire vise - ce n'est pas une liste generique",
      "Un plan d'action sans echeancier reste theorique : fixe-toi des dates cibles concretes",
      "Le reseau professionnel est aussi important que les certificats pour progresser rapidement",
      "Une carriere maritime se construit sur la duree, pas en un seul embarquement",
    ],
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
    startQuiz:"COMMENCER LE QUIZ",
    congratsCaptain:"Felicitations Capitaine !", congratsEngineer:"Felicitations Chef Mecanicien !", congratsGeneric:"Felicitations !",
    congratsSub:"Tu as termine avec succes le module Ship Career Navigator.",
    ctaTitle:"Pret pour un accompagnement personnalise ?",
    ctaText:"Tu as termine Ship Career Navigator. Continue ton parcours avec My Career Advisor, ton coach de carriere maritime par IA.",
    ctaItems:["Recommandations personnalisees","Planification de carriere","Guidance sur les certificats","Preparation aux entretiens"],
    closingPhrase:"Une carriere maritime reussie ne se construit pas en un seul voyage, mais par l'apprentissage continu, la discipline et l'experience.",
    cargoLabel:"Cargo / Porte-conteneurs", tankerLabel:"Tanker (petrolier/chimiquier)", passengerLabel:"Navire a passagers / Croisiere", offshoreLabel:"Offshore / Support", yachtLabel:"Yacht", fishingLabel:"Peche (Fishing)",
    deckLabel:"Pont", engineLabel:"Machine",
  },
  en:{
    moduleLabel:"CAREER - ACTION PLAN",
    lessonTitle:"Your action plan",
    intro:"This final lesson brings together your profile, your roadmap, your certificates and your target vessel specifics into a concrete action plan - and prepares you to go further with My Career Advisor.",
    disclaimer:"The certificates, timelines and pay mentioned are general benchmarks, with no guarantee of duration or salary. Always check the exact requirements with your flag administration.",
    noProfileMsg:"No profile found. Go back to Lesson 1 (Your profile) to generate your personalized action plan.",
    goToL1:"Go to Lesson 1",
    profileTitle:"Your profile", roadmapTitle:"Your roadmap", vesselTitle:"Your target vessel",
    deptLabel:"Department", currentLabel:"Current rank", targetLabel:"Target rank", vesselLabel:"Vessel type",
    totalLabel:"Estimated sea time",
    certsTitle:"Your priority certificates",
    strongPhrase:"Having the minimum certificates makes you employable. Having additional certificates makes you competitive.",
    mandatoryTitle:"Mandatory certificates", recommendedTitle:"Recommended certificates (competitive edge)",
    advancedTankerTitle:"Advanced Tanker Training (depending on your future vessel)",
    advancedTankerNote:"The required Advanced Tanker certificate depends on the type of tanker you will serve on (crude oil, chemical, or gas/LNG). Choose your specialization once your assignment is known.",
    scoreLabel:"Score", downloadBtn:"Download my checklist (PDF)", comingSoon:"COMING SOON",
    actionPlanTitle:"Your 5-step action plan",
    steps:[
      "Check your missing mandatory certificates",
      "Choose a recommended certificate aligned with your target vessel",
      "Plan your sea time toward your target rank",
      "Build your professional network (LinkedIn, mentors, companies)",
      "Revisit this plan regularly - certificates expire, goals evolve",
    ],
    insightTitle:"Career Insight",
    insightText:"Most successful maritime careers are built through continuous learning, accumulated sea service and internationally recognized certifications.",
    exTitle:"Final exercise",
    exQ:"List the three certificates you should obtain next.",
    exHintBtn:"Show a hint", exHintHide:"Hide",
    exHintPrefix:"Based on your current checklist, you are still missing:",
    exHintNone:"Well done, every certificate on your checklist is already checked! Focus on keeping them valid.",
    keypoints:"Module key points",
    kp:[
      "Your profile (L1) determines your roadmap (L2), your priority certifications (L3) and your target vessel specifics (L4)",
      "Mandatory certificates make you employable; recommended certificates make you competitive",
      "The certificate score adapts to your department and target vessel - it is not a generic list",
      "An action plan without a timeline stays theoretical: set yourself concrete target dates",
      "Professional networking matters as much as certificates for fast progression",
      "A maritime career is built over time, not in a single embarkation",
    ],
    showAnswer:"Show answer", hideAnswer:"Hide",
    startQuiz:"START QUIZ",
    congratsCaptain:"Congratulations Captain!", congratsEngineer:"Congratulations Chief Engineer!", congratsGeneric:"Congratulations!",
    congratsSub:"You have successfully completed the Ship Career Navigator module.",
    ctaTitle:"Ready for personalized guidance?",
    ctaText:"You've completed Ship Career Navigator. Continue your journey with My Career Advisor, your AI maritime career coach.",
    ctaItems:["Personalized recommendations","Career planning","Certificate guidance","Interview preparation"],
    closingPhrase:"A successful maritime career is not built in one voyage, but through continuous learning, discipline and experience.",
    cargoLabel:"Cargo / Container", tankerLabel:"Tanker (oil/chemical)", passengerLabel:"Passenger / Cruise", offshoreLabel:"Offshore / Support", yachtLabel:"Yacht", fishingLabel:"Fishing",
    deckLabel:"Deck", engineLabel:"Engine",
  },
  es:{
    moduleLabel:"CARRERA - PLAN DE ACCION",
    lessonTitle:"Tu plan de accion",
    intro:"Esta ultima leccion reune tu perfil, tu hoja de ruta, tus certificados y las especificidades de tu buque objetivo en un plan de accion concreto - y te prepara para ir mas lejos con My Career Advisor.",
    disclaimer:"Los certificados, plazos y remuneraciones mencionados son referencias generales, sin garantia de duracion ni de salario. Verifica siempre los requisitos exactos con la administracion de tu pabellon.",
    noProfileMsg:"No se encontro ningun perfil. Vuelve a la leccion 1 (Tu perfil) para generar tu plan de accion personalizado.",
    goToL1:"Ir a la leccion 1",
    profileTitle:"Tu perfil", roadmapTitle:"Tu hoja de ruta", vesselTitle:"Tu buque objetivo",
    deptLabel:"Departamento", currentLabel:"Puesto actual", targetLabel:"Puesto objetivo", vesselLabel:"Tipo de buque",
    totalLabel:"Tiempo de mar estimado",
    certsTitle:"Tus certificados prioritarios",
    strongPhrase:"Tener los certificados minimos te hace empleable. Tener certificados adicionales te hace competitivo.",
    mandatoryTitle:"Certificados obligatorios", recommendedTitle:"Certificados recomendados (ventaja competitiva)",
    advancedTankerTitle:"Formacion Tanker avanzada (segun tu futuro tipo de tanquero)",
    advancedTankerNote:"El certificado Advanced Tanker requerido depende del tipo de tanquero en el que navegaras (crudo, quimico o gas/LNG). Elige tu especializacion una vez conocida tu asignacion.",
    scoreLabel:"Puntuacion", downloadBtn:"Descargar mi checklist (PDF)", comingSoon:"COMING SOON",
    actionPlanTitle:"Tu plan de accion en 5 pasos",
    steps:[
      "Verificar tus certificados obligatorios faltantes",
      "Elegir un certificado recomendado alineado con tu buque objetivo",
      "Planificar tu tiempo de mar hacia tu puesto objetivo",
      "Construir tu red profesional (LinkedIn, mentores, companias)",
      "Revisar este plan regularmente - los certificados vencen, los objetivos evolucionan",
    ],
    insightTitle:"Career Insight",
    insightText:"La mayoria de las carreras maritimas exitosas se construyen mediante el aprendizaje continuo, la acumulacion de tiempo de mar y certificaciones reconocidas internacionalmente.",
    exTitle:"Ejercicio final",
    exQ:"Enumera los tres certificados que deberias obtener a continuacion.",
    exHintBtn:"Ver una pista", exHintHide:"Ocultar",
    exHintPrefix:"Segun tu checklist actual, todavia te falta:",
    exHintNone:"Bien hecho, todos los certificados de tu checklist ya estan marcados! Concentrate en mantenerlos vigentes.",
    keypoints:"Puntos clave del modulo",
    kp:[
      "Tu perfil (L1) determina tu hoja de ruta (L2), tus certificaciones prioritarias (L3) y las especificidades de tu buque objetivo (L4)",
      "Los certificados obligatorios te hacen empleable; los certificados recomendados te hacen competitivo",
      "La puntuacion de certificados se adapta a tu departamento y buque objetivo - no es una lista generica",
      "Un plan de accion sin cronograma sigue siendo teorico: fijate fechas objetivo concretas",
      "La red profesional importa tanto como los certificados para progresar rapido",
      "Una carrera maritima se construye a lo largo del tiempo, no en un unico embarque",
    ],
    showAnswer:"Ver correccion", hideAnswer:"Ocultar",
    startQuiz:"EMPEZAR QUIZ",
    congratsCaptain:"Felicidades Capitan!", congratsEngineer:"Felicidades Jefe de Maquinas!", congratsGeneric:"Felicidades!",
    congratsSub:"Has completado con exito el modulo Ship Career Navigator.",
    ctaTitle:"Listo para un acompanamiento personalizado?",
    ctaText:"Has completado Ship Career Navigator. Continua tu camino con My Career Advisor, tu coach de carrera maritima con IA.",
    ctaItems:["Recomendaciones personalizadas","Planificacion de carrera","Orientacion sobre certificados","Preparacion de entrevistas"],
    closingPhrase:"Una carrera maritima exitosa no se construye en un solo viaje, sino mediante el aprendizaje continuo, la disciplina y la experiencia.",
    cargoLabel:"Carga / Portacontenedores", tankerLabel:"Tanquero (petroleo/quimico)", passengerLabel:"Pasaje / Crucero", offshoreLabel:"Offshore / Apoyo", yachtLabel:"Yate", fishingLabel:"Pesca (Fishing)",
    deckLabel:"Puente", engineLabel:"Maquinas",
  },
  pt:{
    moduleLabel:"CARREIRA - PLANO DE ACAO",
    lessonTitle:"Seu plano de acao",
    intro:"Esta ultima licao reune seu perfil, seu roteiro, seus certificados e as especificidades do seu navio almejado em um plano de acao concreto - e prepara voce para ir mais longe com My Career Advisor.",
    disclaimer:"Os certificados, prazos e remuneracoes mencionados sao referencias gerais, sem garantia de duracao ou salario. Verifique sempre as exigencias exatas junto a administracao da sua bandeira.",
    noProfileMsg:"Nenhum perfil encontrado. Volte a licao 1 (Seu perfil) para gerar seu plano de acao personalizado.",
    goToL1:"Ir para a licao 1",
    profileTitle:"Seu perfil", roadmapTitle:"Seu roteiro", vesselTitle:"Seu navio almejado",
    deptLabel:"Departamento", currentLabel:"Posto atual", targetLabel:"Posto almejado", vesselLabel:"Tipo de navio",
    totalLabel:"Tempo de mar estimado",
    certsTitle:"Seus certificados prioritarios",
    strongPhrase:"Ter os certificados minimos torna voce empregavel. Ter certificados adicionais torna voce competitivo.",
    mandatoryTitle:"Certificados obrigatorios", recommendedTitle:"Certificados recomendados (vantagem competitiva)",
    advancedTankerTitle:"Treinamento Tanker avancado (conforme seu futuro tipo de petroleiro)",
    advancedTankerNote:"O certificado Advanced Tanker exigido depende do tipo de petroleiro em que voce vai navegar (bruto, quimico ou gas/LNG). Escolha sua especializacao quando sua designacao for conhecida.",
    scoreLabel:"Pontuacao", downloadBtn:"Baixar minha checklist (PDF)", comingSoon:"COMING SOON",
    actionPlanTitle:"Seu plano de acao em 5 etapas",
    steps:[
      "Verificar seus certificados obrigatorios faltantes",
      "Escolher um certificado recomendado alinhado ao seu navio almejado",
      "Planejar seu tempo de mar rumo ao seu posto almejado",
      "Construir sua rede profissional (LinkedIn, mentores, empresas)",
      "Revisar este plano regularmente - certificados vencem, objetivos evoluem",
    ],
    insightTitle:"Career Insight",
    insightText:"A maioria das carreiras maritimas de sucesso e construida atraves do aprendizado continuo, do acumulo de tempo de mar e de certificacoes reconhecidas internacionalmente.",
    exTitle:"Exercicio final",
    exQ:"Liste os tres certificados que voce deveria obter a seguir.",
    exHintBtn:"Ver uma dica", exHintHide:"Ocultar",
    exHintPrefix:"Com base na sua checklist atual, ainda falta:",
    exHintNone:"Muito bem, todos os certificados da sua checklist ja estao marcados! Concentre-se em mante-los validos.",
    keypoints:"Pontos-chave do modulo",
    kp:[
      "Seu perfil (L1) determina seu roteiro (L2), suas certificacoes prioritarias (L3) e as especificidades do seu navio almejado (L4)",
      "Os certificados obrigatorios tornam voce empregavel; os certificados recomendados tornam voce competitivo",
      "A pontuacao de certificados se adapta ao seu departamento e navio almejado - nao e uma lista generica",
      "Um plano de acao sem cronograma continua sendo teorico: fixe datas-alvo concretas",
      "A rede profissional importa tanto quanto os certificados para progredir rapido",
      "Uma carreira maritima se constroi ao longo do tempo, nao em um unico embarque",
    ],
    showAnswer:"Ver correcao", hideAnswer:"Ocultar",
    startQuiz:"COMECAR QUIZ",
    congratsCaptain:"Parabens Comandante!", congratsEngineer:"Parabens Chefe de Maquinas!", congratsGeneric:"Parabens!",
    congratsSub:"Voce concluiu com sucesso o modulo Ship Career Navigator.",
    ctaTitle:"Pronto para uma orientacao personalizada?",
    ctaText:"Voce concluiu o Ship Career Navigator. Continue sua jornada com o My Career Advisor, seu coach de carreira maritima por IA.",
    ctaItems:["Recomendacoes personalizadas","Planejamento de carreira","Orientacao sobre certificados","Preparacao para entrevistas"],
    closingPhrase:"Uma carreira maritima de sucesso nao se constroi em uma unica viagem, mas atraves do aprendizado continuo, da disciplina e da experiencia.",
    cargoLabel:"Carga / Porta-conteineres", tankerLabel:"Petroleiro/Quimiqueiro", passengerLabel:"Passageiros / Cruzeiro", offshoreLabel:"Offshore / Apoio", yachtLabel:"Yate", fishingLabel:"Pesca (Fishing)",
    deckLabel:"Conves", engineLabel:"Maquinas",
  },
};

const MANDATORY: any = {
  fr:[
    {id:"m1",name:"Basic Safety Training (4 modules)"},
    {id:"m2",name:"Certificat medical maritime"},
    {id:"m3",name:"Certificat STCW de ton grade actuel"},
    {id:"m4",name:"Security Awareness"},
    {id:"m5",name:"Livret de temps de mer a jour"},
  ],
  en:[
    {id:"m1",name:"Basic Safety Training (4 modules)"},
    {id:"m2",name:"Maritime medical certificate"},
    {id:"m3",name:"STCW certificate of your current rank"},
    {id:"m4",name:"Security Awareness"},
    {id:"m5",name:"Up to date sea time record book"},
  ],
  es:[
    {id:"m1",name:"Basic Safety Training (4 modulos)"},
    {id:"m2",name:"Certificado medico maritimo"},
    {id:"m3",name:"Certificado STCW de tu grado actual"},
    {id:"m4",name:"Security Awareness"},
    {id:"m5",name:"Libro de tiempo de mar actualizado"},
  ],
  pt:[
    {id:"m1",name:"Basic Safety Training (4 modulos)"},
    {id:"m2",name:"Atestado medico maritimo"},
    {id:"m3",name:"Certificado STCW do seu posto atual"},
    {id:"m4",name:"Security Awareness"},
    {id:"m5",name:"Livro de tempo de mar atualizado"},
  ],
};

// dept: "deck" | "engine" | "both"   vessel: "all" | "passenger" | "offshore" | "tanker"
const RECOMMENDED: any = {
  fr:[
    {id:"r1",name:"GMDSS (Officer)",why:"Obligatoire pour operer les systemes de detresse radio, valorise sur tout poste d'officier pont.",dept:"deck",vessel:"all"},
    {id:"r2",name:"ECDIS",why:"Quasi systematiquement exige, la majorite des navires modernes ayant abandonne les cartes papier.",dept:"deck",vessel:"all"},
    {id:"r3",name:"BRM (Bridge Resource Management)",why:"Renforce la gestion des ressources passerelle et la prise de decision collective.",dept:"deck",vessel:"all"},
    {id:"r4",name:"Ice Navigation",why:"Ouvre l'acces aux routes arctiques et antarctiques, marche de niche tres bien remunere.",dept:"deck",vessel:"all"},
    {id:"r5",name:"Crowd Management",why:"Obligatoire de facto pour toute carriere sur navire a passagers, ouvre directement ce marche.",dept:"deck",vessel:"passenger"},
    {id:"r6",name:"Passenger Safety",why:"Complement de Crowd Management, renforce l'employabilite sur le secteur croisiere.",dept:"deck",vessel:"passenger"},
    {id:"r7",name:"ERM (Engine Resource Management)",why:"Equivalent machine du BRM, valorise pour toute progression vers un poste de responsabilite.",dept:"engine",vessel:"all"},
    {id:"r8",name:"Habilitation electrique haute tension",why:"De plus en plus exigee avec la multiplication des navires a propulsion electrique ou hybride.",dept:"engine",vessel:"all"},
    {id:"r9",name:"UMS (Unattended Machinery Space)",why:"Essentielle sur les navires recents a salle des machines automatisee.",dept:"engine",vessel:"all"},
    {id:"r10",name:"Medical Care",why:"Indispensable pour les postes seniors responsables de la sante a bord, tres demande sur navires isoles.",dept:"engine",vessel:"all"},
    {id:"r11",name:"Proficiency in Survival Craft (PSC)",why:"Requis pour commander les embarcations de sauvetage, souvent exige au-dela de ton grade actuel.",dept:"both",vessel:"all"},
    {id:"r12",name:"Fast Rescue Boat",why:"Specifique aux operations de sauvetage rapide, valorise sur navires a passagers et offshore.",dept:"both",vessel:"all"},
    {id:"r13",name:"Security Duties (Ship Security Officer)",why:"Obligatoire pour certains postes de responsabilite ISPS, valorise a l'embauche.",dept:"both",vessel:"all"},
    {id:"r14",name:"Dynamic Positioning (DP)",why:"Ouvre l'acces au secteur offshore, parmi les mieux remuneres du secteur maritime.",dept:"both",vessel:"offshore"},
    {id:"r15",name:"Tanker Familiarisation",why:"Condition d'acces a tout poste sur tanker, elargit considerablement le champ de navires accessibles.",dept:"both",vessel:"tanker"},
  ],
  en:[
    {id:"r1",name:"GMDSS (Officer)",why:"Mandatory to operate distress radio systems, valued for any deck officer position.",dept:"deck",vessel:"all"},
    {id:"r2",name:"ECDIS",why:"Almost systematically required, as most modern vessels have abandoned paper charts.",dept:"deck",vessel:"all"},
    {id:"r3",name:"BRM (Bridge Resource Management)",why:"Strengthens bridge resource management and collective decision-making.",dept:"deck",vessel:"all"},
    {id:"r4",name:"Ice Navigation",why:"Opens access to Arctic and Antarctic routes, a well-paid niche market.",dept:"deck",vessel:"all"},
    {id:"r5",name:"Crowd Management",why:"De facto mandatory for any career on passenger ships, directly opens that market.",dept:"deck",vessel:"passenger"},
    {id:"r6",name:"Passenger Safety",why:"Complements Crowd Management, strengthens employability in the cruise sector.",dept:"deck",vessel:"passenger"},
    {id:"r7",name:"ERM (Engine Resource Management)",why:"Engine equivalent of BRM, valued for any progression toward a position of responsibility.",dept:"engine",vessel:"all"},
    {id:"r8",name:"High voltage authorization",why:"Increasingly required as electric or hybrid propulsion vessels multiply.",dept:"engine",vessel:"all"},
    {id:"r9",name:"UMS (Unattended Machinery Space)",why:"Essential on recent vessels with automated engine rooms.",dept:"engine",vessel:"all"},
    {id:"r10",name:"Medical Care",why:"Essential for senior positions responsible for health on board, highly demanded on isolated vessels.",dept:"engine",vessel:"all"},
    {id:"r11",name:"Proficiency in Survival Craft (PSC)",why:"Required to command lifeboats, often required beyond your current rank.",dept:"both",vessel:"all"},
    {id:"r12",name:"Fast Rescue Boat",why:"Specific to fast rescue operations, valued on passenger and offshore vessels.",dept:"both",vessel:"all"},
    {id:"r13",name:"Security Duties (Ship Security Officer)",why:"Mandatory for certain ISPS responsibility positions, valued when hiring.",dept:"both",vessel:"all"},
    {id:"r14",name:"Dynamic Positioning (DP)",why:"Opens access to the offshore sector, among the best paid in the maritime industry.",dept:"both",vessel:"offshore"},
    {id:"r15",name:"Tanker Familiarisation",why:"Entry condition for any tanker position, greatly widens the range of accessible vessels.",dept:"both",vessel:"tanker"},
  ],
  es:[
    {id:"r1",name:"GMDSS (Officer)",why:"Obligatorio para operar los sistemas de socorro por radio, valorado en cualquier puesto de oficial de puente.",dept:"deck",vessel:"all"},
    {id:"r2",name:"ECDIS",why:"Exigido casi sistematicamente, ya que la mayoria de los buques modernos han abandonado las cartas de papel.",dept:"deck",vessel:"all"},
    {id:"r3",name:"BRM (Bridge Resource Management)",why:"Refuerza la gestion de recursos de puente y la toma de decisiones colectiva.",dept:"deck",vessel:"all"},
    {id:"r4",name:"Ice Navigation",why:"Abre el acceso a las rutas articas y antarticas, un mercado de nicho muy bien pagado.",dept:"deck",vessel:"all"},
    {id:"r5",name:"Crowd Management",why:"Obligatorio de facto para cualquier carrera en buques de pasaje, abre directamente ese mercado.",dept:"deck",vessel:"passenger"},
    {id:"r6",name:"Passenger Safety",why:"Complemento de Crowd Management, refuerza la empleabilidad en el sector crucero.",dept:"deck",vessel:"passenger"},
    {id:"r7",name:"ERM (Engine Resource Management)",why:"Equivalente de maquinas del BRM, valorado para cualquier progresion hacia un puesto de responsabilidad.",dept:"engine",vessel:"all"},
    {id:"r8",name:"Habilitacion electrica de alta tension",why:"Cada vez mas exigida con la multiplicacion de buques de propulsion electrica o hibrida.",dept:"engine",vessel:"all"},
    {id:"r9",name:"UMS (Unattended Machinery Space)",why:"Esencial en buques recientes con sala de maquinas automatizada.",dept:"engine",vessel:"all"},
    {id:"r10",name:"Medical Care",why:"Indispensable para puestos senior responsables de la salud a bordo, muy demandado en buques aislados.",dept:"engine",vessel:"all"},
    {id:"r11",name:"Proficiency in Survival Craft (PSC)",why:"Requerido para comandar embarcaciones de salvamento, a menudo exigido por encima de tu grado actual.",dept:"both",vessel:"all"},
    {id:"r12",name:"Fast Rescue Boat",why:"Especifico de las operaciones de rescate rapido, valorado en buques de pasaje y offshore.",dept:"both",vessel:"all"},
    {id:"r13",name:"Security Duties (Ship Security Officer)",why:"Obligatorio para ciertos puestos de responsabilidad ISPS, valorado en la contratacion.",dept:"both",vessel:"all"},
    {id:"r14",name:"Dynamic Positioning (DP)",why:"Abre el acceso al sector offshore, entre los mejor pagados del sector maritimo.",dept:"both",vessel:"offshore"},
    {id:"r15",name:"Tanker Familiarisation",why:"Condicion de acceso a cualquier puesto en tanquero, amplia considerablemente el abanico de buques accesibles.",dept:"both",vessel:"tanker"},
  ],
  pt:[
    {id:"r1",name:"GMDSS (Officer)",why:"Obrigatorio para operar os sistemas de socorro por radio, valorizado em qualquer posto de oficial de conves.",dept:"deck",vessel:"all"},
    {id:"r2",name:"ECDIS",why:"Exigido quase sistematicamente, pois a maioria dos navios modernos abandonou as cartas de papel.",dept:"deck",vessel:"all"},
    {id:"r3",name:"BRM (Bridge Resource Management)",why:"Fortalece a gestao de recursos de passadico e a tomada de decisao coletiva.",dept:"deck",vessel:"all"},
    {id:"r4",name:"Ice Navigation",why:"Abre o acesso as rotas articas e antarticas, um mercado de nicho muito bem pago.",dept:"deck",vessel:"all"},
    {id:"r5",name:"Crowd Management",why:"Obrigatorio de fato para qualquer carreira em navios de passageiros, abre diretamente esse mercado.",dept:"deck",vessel:"passenger"},
    {id:"r6",name:"Passenger Safety",why:"Complementa o Crowd Management, fortalece a empregabilidade no setor de cruzeiros.",dept:"deck",vessel:"passenger"},
    {id:"r7",name:"ERM (Engine Resource Management)",why:"Equivalente de maquinas do BRM, valorizado para qualquer progressao rumo a um posto de responsabilidade.",dept:"engine",vessel:"all"},
    {id:"r8",name:"Habilitacao eletrica de alta tensao",why:"Cada vez mais exigida com a multiplicacao de navios de propulsao eletrica ou hibrida.",dept:"engine",vessel:"all"},
    {id:"r9",name:"UMS (Unattended Machinery Space)",why:"Essencial em navios recentes com casa de maquinas automatizada.",dept:"engine",vessel:"all"},
    {id:"r10",name:"Medical Care",why:"Indispensavel para postos senior responsaveis pela saude a bordo, muito demandado em navios isolados.",dept:"engine",vessel:"all"},
    {id:"r11",name:"Proficiency in Survival Craft (PSC)",why:"Exigido para comandar embarcacoes de salvamento, muitas vezes exigido alem do seu posto atual.",dept:"both",vessel:"all"},
    {id:"r12",name:"Fast Rescue Boat",why:"Especifico das operacoes de resgate rapido, valorizado em navios de passageiros e offshore.",dept:"both",vessel:"all"},
    {id:"r13",name:"Security Duties (Ship Security Officer)",why:"Obrigatorio para certos postos de responsabilidade ISPS, valorizado na contratacao.",dept:"both",vessel:"all"},
    {id:"r14",name:"Dynamic Positioning (DP)",why:"Abre o acesso ao setor offshore, entre os melhor pagos do setor maritimo.",dept:"both",vessel:"offshore"},
    {id:"r15",name:"Tanker Familiarisation",why:"Condicao de acesso a qualquer posto em petroleiro, amplia bastante o leque de navios acessiveis.",dept:"both",vessel:"tanker"},
  ],
};

const ADVANCED_TANKER: any = {
  fr:[
    {name:"Advanced Oil Tanker",icon:"\ud83d\udee2\ufe0f"},
    {name:"Advanced Chemical Tanker",icon:"\ud83e\uddea"},
    {name:"Advanced Gas Tanker (LNG/LPG)",icon:"\ud83d\udd25"},
  ],
  en:[
    {name:"Advanced Oil Tanker",icon:"\ud83d\udee2\ufe0f"},
    {name:"Advanced Chemical Tanker",icon:"\ud83e\uddea"},
    {name:"Advanced Gas Tanker (LNG/LPG)",icon:"\ud83d\udd25"},
  ],
  es:[
    {name:"Advanced Oil Tanker",icon:"\ud83d\udee2\ufe0f"},
    {name:"Advanced Chemical Tanker",icon:"\ud83e\uddea"},
    {name:"Advanced Gas Tanker (LNG/LPG)",icon:"\ud83d\udd25"},
  ],
  pt:[
    {name:"Advanced Oil Tanker",icon:"\ud83d\udee2\ufe0f"},
    {name:"Advanced Chemical Tanker",icon:"\ud83e\uddea"},
    {name:"Advanced Gas Tanker (LNG/LPG)",icon:"\ud83d\udd25"},
  ],
};

const VESSEL_SUMMARY: any = {
  fr:{
    cargo:{risks:["Chutes lors de la manutention","Fatigue liee aux rotations frequentes"],rotation:"4 a 6 mois, escales courtes."},
    tanker:{risks:["Atmosphere explosive au chargement","Exposition a des vapeurs toxiques"],rotation:"3 a 4 mois, repos a terre plus long."},
    passenger:{risks:["Gestion de l'evacuation de masse","Coordination avec le personnel hotelier"],rotation:"6 a 9 mois, vie a bord structuree."},
    offshore:{risks:["Conditions meteorologiques extremes","Operations d'appontage d'helicoptere"],rotation:"3 a 4 semaines, tres intense."},
    yacht:{risks:["Espace de vie tres reduit","Exigences elevees des proprietaires"],rotation:"Contrats souvent saisonniers."},
    fishing:{risks:["Travail physique intense","Exposition prolongee aux intemperies"],rotation:"De quelques jours a plusieurs mois."},
  },
  en:{
    cargo:{risks:["Falls during handling","Fatigue from frequent rotations"],rotation:"4 to 6 months, short port calls."},
    tanker:{risks:["Explosive atmosphere when loading","Exposure to toxic vapours"],rotation:"3 to 4 months, longer rest ashore."},
    passenger:{risks:["Managing mass evacuation","Coordination with hotel staff"],rotation:"6 to 9 months, structured onboard life."},
    offshore:{risks:["Extreme weather conditions","Helicopter landing operations"],rotation:"3 to 4 weeks, very intense."},
    yacht:{risks:["Very small living space","High demands from owners"],rotation:"Often seasonal contracts."},
    fishing:{risks:["Intense physical work","Prolonged exposure to harsh weather"],rotation:"From a few days to several months."},
  },
  es:{
    cargo:{risks:["Caidas durante la manipulacion","Fatiga por rotaciones frecuentes"],rotation:"4 a 6 meses, escalas cortas."},
    tanker:{risks:["Atmosfera explosiva al cargar","Exposicion a vapores toxicos"],rotation:"3 a 4 meses, descanso en tierra mas largo."},
    passenger:{risks:["Gestion de evacuacion masiva","Coordinacion con personal hotelero"],rotation:"6 a 9 meses, vida a bordo estructurada."},
    offshore:{risks:["Condiciones meteorologicas extremas","Operaciones de aterrizaje de helicoptero"],rotation:"3 a 4 semanas, muy intensa."},
    yacht:{risks:["Espacio de vida muy reducido","Exigencias altas de los propietarios"],rotation:"Contratos a menudo estacionales."},
    fishing:{risks:["Trabajo fisico intenso","Exposicion prolongada a la intemperie"],rotation:"De unos dias a varios meses."},
  },
  pt:{
    cargo:{risks:["Quedas durante o manuseio","Fadiga por rotacoes frequentes"],rotation:"4 a 6 meses, escalas curtas."},
    tanker:{risks:["Atmosfera explosiva ao carregar","Exposicao a vapores toxicos"],rotation:"3 a 4 meses, descanso em terra mais longo."},
    passenger:{risks:["Gestao de evacuacao em massa","Coordenacao com pessoal hoteleiro"],rotation:"6 a 9 meses, vida a bordo estruturada."},
    offshore:{risks:["Condicoes meteorologicas extremas","Operacoes de aterrissagem de helicoptero"],rotation:"3 a 4 semanas, muito intensa."},
    yacht:{risks:["Espaco de vida muito reduzido","Exigencias altas dos proprietarios"],rotation:"Contratos geralmente sazonais."},
    fishing:{risks:["Trabalho fisico intenso","Exposicao prolongada as intemperies"],rotation:"De alguns dias a varios meses."},
  },
};

const BANK: any = {
  fr:[
    {q:"Quel document valide officiellement le temps de mer d'un marin ?",opts:["Le passeport","Le livret de formation signe","Le contrat d'embauche","La carte d'identite"],correct:1,expl:"Le livret de formation signe par le Capitaine ou le Chef Mecanicien est la preuve officielle du temps de mer."},
    {q:"Quelle est la duree de validite typique du Basic Safety Training ?",opts:["1 an","2 ans","5 ans","10 ans"],correct:2,expl:"Le Basic Safety Training est generalement valide 5 ans avant recyclage."},
    {q:"Quel certificat est specifique au departement Pont parmi les suivants ?",opts:["Habilitation haute tension","ECDIS","UMS","ERM"],correct:1,expl:"L'ECDIS est specifique au departement Pont."},
    {q:"Quel certificat est specifique au departement Machine parmi les suivants ?",opts:["ECDIS","BRM","Habilitation electrique haute tension","GMDSS"],correct:2,expl:"L'habilitation electrique haute tension est specifique au departement Machine."},
    {q:"Quel type de navire a le rythme de rotation generalement le plus court ?",opts:["Cargo","Tanker","Passagers","Offshore"],correct:3,expl:"L'offshore a des rotations courtes et intenses, generalement 3 a 4 semaines."},
    {q:"Quelle formation est obligatoire pour tout personnel affecte a un tanker ?",opts:["Crowd Management","Tanker Familiarisation","Ice Navigation","DP"],correct:1,expl:"Le Tanker Familiarisation est obligatoire pour tout personnel affecte a un tanker."},
    {q:"Quel facteur reste le plus determinant pour la remuneration, quel que soit le secteur ?",opts:["Le type de navire uniquement","Le grade STCW atteint","Le pays de naissance","La duree du contrat"],correct:1,expl:"Le grade STCW atteint reste le facteur le plus determinant, quel que soit le secteur."},
    {q:"Selon cette lecon, qu'est-ce qui rend un marin employable ?",opts:["Les certificats recommandes uniquement","Les certificats obligatoires minimums","Le nombre d'annees d'anciennete uniquement","Aucun certificat n'est necessaire"],correct:1,expl:"Avoir les certificats minimums obligatoires te rend employable."},
    {q:"Qu'est-ce qui rend un marin competitif face a d'autres candidats ?",opts:["Les certificats recommandes additionnels","Rien, tous les marins sont identiques","Uniquement l'anciennete","Le hasard"],correct:0,expl:"Avoir des certificats recommandes supplementaires rend un marin competitif."},
    {q:"Pourquoi le marche offshore est-il plus volatile que le marche cargo ?",opts:["Il y a moins de navires offshore","Sa dependance directe aux investissements energetiques","Le cargo n'a aucun cycle economique","Aucune raison particuliere"],correct:1,expl:"Le marche offshore depend directement des investissements des compagnies petrolieres et gazieres."},
    {q:"Quelle est la premiere etape recommandee dans le plan d'action de cette lecon ?",opts:["Construire son reseau professionnel","Verifier les certificats obligatoires manquants","Planifier son temps de mer","Revisiter le plan chaque annee"],correct:1,expl:"La premiere etape consiste a verifier les certificats obligatoires manquants."},
    {q:"Pourquoi construire son reseau professionnel est-il utile en fin de parcours ?",opts:["Cela n'a aucune utilite","Cela ouvre des opportunites au-dela des candidatures classiques","Cela remplace tous les certificats","Cela garantit un poste immediatement"],correct:1,expl:"Le reseau professionnel ouvre des opportunites complementaires aux candidatures classiques."},
    {q:"A quoi correspond le sigle DP dans le contexte maritime ?",opts:["Deck Personnel","Dynamic Positioning","Direct Payment","Duty Period"],correct:1,expl:"DP signifie Dynamic Positioning, une specialisation cle du secteur offshore."},
    {q:"Quel outil futur de MAP proposera un accompagnement IA personnalise ?",opts:["Ship Career Navigator","My Career Advisor","MarineVerify","Maritime English SMCP"],correct:1,expl:"My Career Advisor proposera un accompagnement IA personnalise, complementaire a ce module."},
    {q:"Une carriere maritime reussie repose principalement sur :",opts:["La chance uniquement","L'apprentissage continu, l'experience et les certifications reconnues","Un seul embarquement decisif","Le hasard des affectations"],correct:1,expl:"Une carriere maritime reussie se construit par l'apprentissage continu, l'experience et des certifications reconnues."},
  ],
  en:[
    {q:"Which document officially validates a seafarer's sea time?",opts:["The passport","The signed training record book","The employment contract","The ID card"],correct:1,expl:"The training record book signed by the Master or Chief Engineer is the official proof of sea time."},
    {q:"What is the typical validity period of Basic Safety Training?",opts:["1 year","2 years","5 years","10 years"],correct:2,expl:"Basic Safety Training is generally valid for 5 years before refresher."},
    {q:"Which certificate is specific to the Deck department among the following?",opts:["High voltage authorization","ECDIS","UMS","ERM"],correct:1,expl:"ECDIS is specific to the Deck department."},
    {q:"Which certificate is specific to the Engine department among the following?",opts:["ECDIS","BRM","High voltage authorization","GMDSS"],correct:2,expl:"High voltage authorization is specific to the Engine department."},
    {q:"Which vessel type generally has the shortest rotation rhythm?",opts:["Cargo","Tanker","Passenger","Offshore"],correct:3,expl:"Offshore has short, intense rotations, generally 3 to 4 weeks."},
    {q:"Which training is mandatory for all personnel assigned to a tanker?",opts:["Crowd Management","Tanker Familiarisation","Ice Navigation","DP"],correct:1,expl:"Tanker Familiarisation is mandatory for all personnel assigned to a tanker."},
    {q:"Which factor remains most decisive for pay, regardless of sector?",opts:["Vessel type only","STCW rank reached","Country of birth","Contract length"],correct:1,expl:"The STCW rank reached remains the most decisive factor, regardless of sector."},
    {q:"According to this lesson, what makes a seafarer employable?",opts:["Recommended certificates only","The minimum mandatory certificates","Only years of seniority","No certificate is needed"],correct:1,expl:"Having the minimum mandatory certificates makes you employable."},
    {q:"What makes a seafarer competitive against other candidates?",opts:["Additional recommended certificates","Nothing, all seafarers are identical","Only seniority","Chance"],correct:0,expl:"Having additional recommended certificates makes a seafarer competitive."},
    {q:"Why is the offshore market more volatile than the cargo market?",opts:["There are fewer offshore vessels","Its direct dependence on energy investments","Cargo has no economic cycle","No particular reason"],correct:1,expl:"The offshore market directly depends on oil and gas company investments."},
    {q:"What is the first recommended step in this lesson's action plan?",opts:["Building your professional network","Checking missing mandatory certificates","Planning your sea time","Revisiting the plan every year"],correct:1,expl:"The first step is checking your missing mandatory certificates."},
    {q:"Why is building a professional network useful at this stage?",opts:["It has no use","It opens opportunities beyond standard applications","It replaces all certificates","It guarantees a position immediately"],correct:1,expl:"Professional networking opens opportunities complementary to standard applications."},
    {q:"What does the acronym DP stand for in the maritime context?",opts:["Deck Personnel","Dynamic Positioning","Direct Payment","Duty Period"],correct:1,expl:"DP stands for Dynamic Positioning, a key specialization in the offshore sector."},
    {q:"Which future MAP tool will offer personalized AI guidance?",opts:["Ship Career Navigator","My Career Advisor","MarineVerify","Maritime English SMCP"],correct:1,expl:"My Career Advisor will offer personalized AI guidance, complementary to this module."},
    {q:"A successful maritime career mainly relies on:",opts:["Luck only","Continuous learning, experience and recognized certifications","A single decisive embarkation","Random assignments"],correct:1,expl:"A successful maritime career is built through continuous learning, experience and recognized certifications."},
  ],
  es:[
    {q:"Que documento valida oficialmente el tiempo de mar de un marino?",opts:["El pasaporte","El libro de formacion firmado","El contrato de trabajo","El carnet de identidad"],correct:1,expl:"El libro de formacion firmado por el Capitan o el Jefe de Maquinas es la prueba oficial del tiempo de mar."},
    {q:"Cual es la vigencia tipica del Basic Safety Training?",opts:["1 ano","2 anos","5 anos","10 anos"],correct:2,expl:"El Basic Safety Training es generalmente valido por 5 anos antes de reciclarse."},
    {q:"Que certificado es especifico del departamento de Puente entre los siguientes?",opts:["Habilitacion de alta tension","ECDIS","UMS","ERM"],correct:1,expl:"El ECDIS es especifico del departamento de Puente."},
    {q:"Que certificado es especifico del departamento de Maquinas entre los siguientes?",opts:["ECDIS","BRM","Habilitacion electrica de alta tension","GMDSS"],correct:2,expl:"La habilitacion electrica de alta tension es especifica del departamento de Maquinas."},
    {q:"Que tipo de buque tiene generalmente el ritmo de rotacion mas corto?",opts:["Carga","Tanquero","Pasaje","Offshore"],correct:3,expl:"El offshore tiene rotaciones cortas e intensas, generalmente 3 a 4 semanas."},
    {q:"Que formacion es obligatoria para todo el personal asignado a un tanquero?",opts:["Crowd Management","Tanker Familiarisation","Ice Navigation","DP"],correct:1,expl:"Tanker Familiarisation es obligatorio para todo el personal asignado a un tanquero."},
    {q:"Que factor sigue siendo el mas determinante para la remuneracion, sea cual sea el sector?",opts:["Solo el tipo de buque","El grado STCW alcanzado","El pais de nacimiento","La duracion del contrato"],correct:1,expl:"El grado STCW alcanzado sigue siendo el factor mas determinante, sea cual sea el sector."},
    {q:"Segun esta leccion, que hace empleable a un marino?",opts:["Solo los certificados recomendados","Los certificados obligatorios minimos","Solo los anos de antiguedad","No se necesita ningun certificado"],correct:1,expl:"Tener los certificados minimos obligatorios te hace empleable."},
    {q:"Que hace competitivo a un marino frente a otros candidatos?",opts:["Certificados recomendados adicionales","Nada, todos los marinos son iguales","Solo la antiguedad","El azar"],correct:0,expl:"Tener certificados recomendados adicionales hace competitivo a un marino."},
    {q:"Por que el mercado offshore es mas volatil que el mercado de carga?",opts:["Hay menos buques offshore","Su dependencia directa de las inversiones energeticas","La carga no tiene ningun ciclo economico","Sin razon particular"],correct:1,expl:"El mercado offshore depende directamente de las inversiones de las companias petroleras y gasisticas."},
    {q:"Cual es el primer paso recomendado en el plan de accion de esta leccion?",opts:["Construir tu red profesional","Verificar los certificados obligatorios faltantes","Planificar tu tiempo de mar","Revisar el plan cada ano"],correct:1,expl:"El primer paso es verificar los certificados obligatorios faltantes."},
    {q:"Por que construir una red profesional es util en esta etapa?",opts:["No tiene ninguna utilidad","Abre oportunidades mas alla de las postulaciones clasicas","Sustituye todos los certificados","Garantiza un puesto de inmediato"],correct:1,expl:"La red profesional abre oportunidades complementarias a las postulaciones clasicas."},
    {q:"Que significa la sigla DP en el contexto maritimo?",opts:["Deck Personnel","Dynamic Positioning","Direct Payment","Duty Period"],correct:1,expl:"DP significa Dynamic Positioning, una especializacion clave del sector offshore."},
    {q:"Que futura herramienta de MAP ofrecera acompanamiento con IA personalizado?",opts:["Ship Career Navigator","My Career Advisor","MarineVerify","Maritime English SMCP"],correct:1,expl:"My Career Advisor ofrecera acompanamiento con IA personalizado, complementario a este modulo."},
    {q:"Una carrera maritima exitosa se basa principalmente en:",opts:["Solo la suerte","El aprendizaje continuo, la experiencia y las certificaciones reconocidas","Un unico embarque decisivo","Asignaciones al azar"],correct:1,expl:"Una carrera maritima exitosa se construye mediante el aprendizaje continuo, la experiencia y certificaciones reconocidas."},
  ],
  pt:[
    {q:"Qual documento valida oficialmente o tempo de mar de um marinheiro?",opts:["O passaporte","O livro de formacao assinado","O contrato de trabalho","A carteira de identidade"],correct:1,expl:"O livro de formacao assinado pelo Comandante ou Chefe de Maquinas e a prova oficial do tempo de mar."},
    {q:"Qual e a validade tipica do Basic Safety Training?",opts:["1 ano","2 anos","5 anos","10 anos"],correct:2,expl:"O Basic Safety Training e geralmente valido por 5 anos antes da reciclagem."},
    {q:"Qual certificado e especifico do departamento de Conves entre os seguintes?",opts:["Habilitacao de alta tensao","ECDIS","UMS","ERM"],correct:1,expl:"O ECDIS e especifico do departamento de Conves."},
    {q:"Qual certificado e especifico do departamento de Maquinas entre os seguintes?",opts:["ECDIS","BRM","Habilitacao eletrica de alta tensao","GMDSS"],correct:2,expl:"A habilitacao eletrica de alta tensao e especifica do departamento de Maquinas."},
    {q:"Qual tipo de navio tem geralmente o ritmo de rotacao mais curto?",opts:["Carga","Petroleiro","Passageiros","Offshore"],correct:3,expl:"O offshore tem rotacoes curtas e intensas, geralmente 3 a 4 semanas."},
    {q:"Qual treinamento e obrigatorio para todo o pessoal designado a um navio-tanque?",opts:["Crowd Management","Tanker Familiarisation","Ice Navigation","DP"],correct:1,expl:"O Tanker Familiarisation e obrigatorio para todo o pessoal designado a um navio-tanque."},
    {q:"Qual fator continua sendo o mais decisivo para a remuneracao, seja qual for o setor?",opts:["Apenas o tipo de navio","O posto STCW alcancado","O pais de nascimento","A duracao do contrato"],correct:1,expl:"O posto STCW alcancado continua sendo o fator mais decisivo, seja qual for o setor."},
    {q:"Segundo esta licao, o que torna um marinheiro empregavel?",opts:["Apenas os certificados recomendados","Os certificados obrigatorios minimos","Apenas os anos de antiguidade","Nenhum certificado e necessario"],correct:1,expl:"Ter os certificados obrigatorios minimos torna voce empregavel."},
    {q:"O que torna um marinheiro competitivo frente a outros candidatos?",opts:["Certificados recomendados adicionais","Nada, todos os marinheiros sao iguais","Apenas a antiguidade","O acaso"],correct:0,expl:"Ter certificados recomendados adicionais torna um marinheiro competitivo."},
    {q:"Por que o mercado offshore e mais volatil que o mercado de carga?",opts:["Ha menos navios offshore","Sua dependencia direta dos investimentos energeticos","A carga nao tem nenhum ciclo economico","Sem razao particular"],correct:1,expl:"O mercado offshore depende diretamente dos investimentos das empresas petroliferas e de gas."},
    {q:"Qual e a primeira etapa recomendada no plano de acao desta licao?",opts:["Construir sua rede profissional","Verificar os certificados obrigatorios faltantes","Planejar seu tempo de mar","Revisar o plano todo ano"],correct:1,expl:"A primeira etapa e verificar os certificados obrigatorios faltantes."},
    {q:"Por que construir uma rede profissional e util nesta etapa?",opts:["Nao tem nenhuma utilidade","Abre oportunidades alem das candidaturas classicas","Substitui todos os certificados","Garante um posto imediatamente"],correct:1,expl:"A rede profissional abre oportunidades complementares as candidaturas classicas."},
    {q:"O que significa a sigla DP no contexto maritimo?",opts:["Deck Personnel","Dynamic Positioning","Direct Payment","Duty Period"],correct:1,expl:"DP significa Dynamic Positioning, uma especializacao chave do setor offshore."},
    {q:"Qual futura ferramenta do MAP oferecera orientacao com IA personalizada?",opts:["Ship Career Navigator","My Career Advisor","MarineVerify","Maritime English SMCP"],correct:1,expl:"My Career Advisor oferecera orientacao com IA personalizada, complementar a este modulo."},
    {q:"Uma carreira maritima de sucesso se baseia principalmente em:",opts:["Apenas sorte","Aprendizado continuo, experiencia e certificacoes reconhecidas","Um unico embarque decisivo","Designacoes aleatorias"],correct:1,expl:"Uma carreira maritima de sucesso se constroi atraves do aprendizado continuo, da experiencia e de certificacoes reconhecidas."},
  ],
};

const QUIZ: any = {
  fr:[
    {q:"Quel est le role principal de cette derniere lecon (L5) ?",opts:["Introduire de nouveaux certificats inconnus","Synthetiser le profil, la feuille de route et les certificats en un plan d'action","Remplacer My Career Advisor","Repeter le contenu de L1 a l'identique"],correct:1,exp:"L5 synthetise tout le travail des lecons precedentes en un plan d'action concret."},
    {q:"Que faut-il faire si un certificat obligatoire est manquant ?",opts:["L'ignorer, ce n'est pas important","Le planifier en priorite avant tout certificat recommande","Attendre qu'il expire","Rien, les certificats obligatoires ne servent a rien"],correct:1,exp:"Un certificat obligatoire manquant doit etre priorise avant les certificats recommandes."},
    {q:"Quels certificats dependent a la fois du departement ET du type de navire choisi ?",opts:["Aucun certificat ne depend de ces deux criteres","DP et Tanker Familiarisation","Uniquement le certificat medical","Le passeport uniquement"],correct:1,exp:"DP (offshore) et Tanker Familiarisation (tanker) dependent du type de navire, en plus du departement."},
    {q:"Que represente le score de certificats de cette lecon ?",opts:["Un chiffre aleatoire sans signification","Un indicateur visuel de ce qu'il reste a accomplir, adapte a ton profil","Une note d'examen officielle","Un classement entre marins"],correct:1,exp:"Le score est un indicateur visuel personnalise selon le departement et le navire vise."},
    {q:"Quelle phrase resume la philosophie de MAP pour la carriere maritime ?",opts:["Tout se joue en un seul embarquement","Une carriere maritime se construit par l'apprentissage continu, la discipline et l'experience","Seule la chance compte","Les certificats ne servent a rien"],correct:1,exp:"Une carriere maritime reussie se construit dans la duree, par l'apprentissage continu et l'experience."},
  ],
  en:[
    {q:"What is the main role of this final lesson (L5)?",opts:["Introduce brand new unknown certificates","Synthesize your profile, roadmap and certificates into an action plan","Replace My Career Advisor","Repeat L1 content identically"],correct:1,exp:"L5 synthesizes all the work from previous lessons into a concrete action plan."},
    {q:"What should you do if a mandatory certificate is missing?",opts:["Ignore it, it's not important","Prioritize it before any recommended certificate","Wait for it to expire","Nothing, mandatory certificates are useless"],correct:1,exp:"A missing mandatory certificate should be prioritized before recommended certificates."},
    {q:"Which certificates depend on both department AND the chosen vessel type?",opts:["No certificate depends on both criteria","DP and Tanker Familiarisation","Only the medical certificate","Only the passport"],correct:1,exp:"DP (offshore) and Tanker Familiarisation (tanker) depend on vessel type, in addition to department."},
    {q:"What does this lesson's certificate score represent?",opts:["A random meaningless number","A visual indicator of what remains to be done, adapted to your profile","An official exam grade","A ranking between seafarers"],correct:1,exp:"The score is a personalized visual indicator based on department and target vessel."},
    {q:"Which sentence summarizes MAP's philosophy for a maritime career?",opts:["Everything depends on a single embarkation","A maritime career is built through continuous learning, discipline and experience","Only luck matters","Certificates are useless"],correct:1,exp:"A successful maritime career is built over time, through continuous learning and experience."},
  ],
  es:[
    {q:"Cual es el rol principal de esta ultima leccion (L5)?",opts:["Introducir certificados completamente nuevos y desconocidos","Sintetizar tu perfil, hoja de ruta y certificados en un plan de accion","Sustituir a My Career Advisor","Repetir el contenido de L1 de forma identica"],correct:1,exp:"L5 sintetiza todo el trabajo de las lecciones anteriores en un plan de accion concreto."},
    {q:"Que debes hacer si falta un certificado obligatorio?",opts:["Ignorarlo, no es importante","Priorizarlo antes de cualquier certificado recomendado","Esperar a que venza","Nada, los certificados obligatorios no sirven de nada"],correct:1,exp:"Un certificado obligatorio faltante debe priorizarse antes que los certificados recomendados."},
    {q:"Que certificados dependen tanto del departamento COMO del tipo de buque elegido?",opts:["Ningun certificado depende de ambos criterios","DP y Tanker Familiarisation","Solo el certificado medico","Solo el pasaporte"],correct:1,exp:"DP (offshore) y Tanker Familiarisation (tanquero) dependen del tipo de buque, ademas del departamento."},
    {q:"Que representa la puntuacion de certificados de esta leccion?",opts:["Un numero aleatorio sin significado","Un indicador visual de lo que falta por lograr, adaptado a tu perfil","Una calificacion de examen oficial","Un ranking entre marinos"],correct:1,exp:"La puntuacion es un indicador visual personalizado segun el departamento y el buque objetivo."},
    {q:"Que frase resume la filosofia de MAP para la carrera maritima?",opts:["Todo depende de un unico embarque","Una carrera maritima se construye mediante el aprendizaje continuo, la disciplina y la experiencia","Solo la suerte importa","Los certificados no sirven de nada"],correct:1,exp:"Una carrera maritima exitosa se construye a lo largo del tiempo, mediante el aprendizaje continuo y la experiencia."},
  ],
  pt:[
    {q:"Qual e o papel principal desta ultima licao (L5)?",opts:["Introduzir certificados totalmente novos e desconhecidos","Sintetizar seu perfil, roteiro e certificados em um plano de acao","Substituir o My Career Advisor","Repetir o conteudo de L1 de forma identica"],correct:1,exp:"L5 sintetiza todo o trabalho das licoes anteriores em um plano de acao concreto."},
    {q:"O que fazer se um certificado obrigatorio estiver faltando?",opts:["Ignorar, nao e importante","Priorizar antes de qualquer certificado recomendado","Esperar ele vencer","Nada, certificados obrigatorios nao servem para nada"],correct:1,exp:"Um certificado obrigatorio faltante deve ser priorizado antes dos certificados recomendados."},
    {q:"Quais certificados dependem tanto do departamento QUANTO do tipo de navio escolhido?",opts:["Nenhum certificado depende dos dois criterios","DP e Tanker Familiarisation","Apenas o atestado medico","Apenas o passaporte"],correct:1,exp:"DP (offshore) e Tanker Familiarisation (petroleiro) dependem do tipo de navio, alem do departamento."},
    {q:"O que representa a pontuacao de certificados desta licao?",opts:["Um numero aleatorio sem significado","Um indicador visual do que falta realizar, adaptado ao seu perfil","Uma nota de exame oficial","Um ranking entre marinheiros"],correct:1,exp:"A pontuacao e um indicador visual personalizado conforme o departamento e o navio almejado."},
    {q:"Qual frase resume a filosofia do MAP para a carreira maritima?",opts:["Tudo depende de um unico embarque","Uma carreira maritima se constroi atraves do aprendizado continuo, da disciplina e da experiencia","So a sorte importa","Certificados nao servem para nada"],correct:1,exp:"Uma carreira maritima de sucesso se constroi ao longo do tempo, atraves do aprendizado continuo e da experiencia."},
  ],
};

function ProfileSummary({ lang, onBack }:{ lang:string; onBack:()=>void }) {
  const t=T[lang]||T.fr;
  const profile=loadProfile();
  const map:any={cargo:t.cargoLabel,tanker:t.tankerLabel,passenger:t.passengerLabel,offshore:t.offshoreLabel,yacht:t.yachtLabel,fishing:t.fishingLabel};
  if(!profile||!profile.dept){
    return (
      <div style={{borderRadius:14,background:"rgba(10,22,40,0.85)",border:`1px solid ${C.danger}44`,padding:16,marginBottom:16}}>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",fontFamily:"Courier New",lineHeight:1.6,marginBottom:10}}>{t.noProfileMsg}</div>
        <button onClick={onBack} style={{width:"100%",padding:"9px 0",borderRadius:8,border:`1px solid ${C.primary}66`,
          background:`${C.primary}1a`,color:C.accent,fontSize:11,fontWeight:700,fontFamily:"Courier New",cursor:"pointer"}}>{t.goToL1}</button>
      </div>
    );
  }
  const rows=[[t.deptLabel,profile.dept==="engine"?t.engineLabel:t.deckLabel],[t.currentLabel,profile.current||"-"],[t.targetLabel,profile.target||"-"],[t.vesselLabel,map[profile.vessel]||profile.vessel||"-"]];
  return (
    <div style={{borderRadius:14,background:"rgba(10,22,40,0.85)",border:`1px solid ${C.primary}33`,padding:16,marginBottom:16}}>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:13,color:C.accent,marginBottom:10}}>{t.profileTitle}</div>
      {rows.map(([k,v],i)=>(
        <div key={i} style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:11,fontFamily:"Courier New"}}>
          <span style={{color:"rgba(240,244,255,0.5)"}}>{k}</span>
          <span style={{color:"#f0f4ff",fontWeight:700}}>{v}</span>
        </div>
      ))}
    </div>
  );
}

function RoadmapSummary({ lang }:{ lang:string }) {
  const t=T[lang]||T.fr;
  const profile=loadProfile();
  const valid=profile&&typeof profile.currentIdx==="number"&&typeof profile.targetIdx==="number"&&profile.targetIdx>profile.currentIdx;
  if(!valid) return null;
  const dept=profile.dept==="engine"?"engine":"deck";
  const ranks=(RANKS[lang]||RANKS.fr)[dept];
  const {currentIdx,targetIdx}=profile;
  let total=0;
  for(let i=currentIdx;i<targetIdx;i++) total+=MONTHS[i];
  const path=ranks.slice(currentIdx,targetIdx+1).join(" -> ");
  const unit=lang==="fr"?"mois":lang==="en"?"months":lang==="es"?"meses":"meses";
  return (
    <div style={{borderRadius:14,background:"rgba(10,22,40,0.85)",border:`1px solid ${C.primary}33`,padding:16,marginBottom:16}}>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:13,color:C.accent,marginBottom:10}}>{t.roadmapTitle}</div>
      <div style={{fontSize:11,color:"rgba(240,244,255,0.8)",fontFamily:"Courier New",lineHeight:1.6,marginBottom:8}}>{path}</div>
      <div style={{fontSize:11,color:C.gold,fontFamily:"Courier New"}}>{t.totalLabel} : {total} {unit}</div>
    </div>
  );
}

function VesselSummary({ lang }:{ lang:string }) {
  const t=T[lang]||T.fr;
  const profile=loadProfile();
  const vesselKey:any=(profile&&["cargo","tanker","passenger","offshore","yacht","fishing"].includes(profile.vessel))?profile.vessel:"cargo";
  const map:any={cargo:t.cargoLabel,tanker:t.tankerLabel,passenger:t.passengerLabel,offshore:t.offshoreLabel,yacht:t.yachtLabel,fishing:t.fishingLabel};
  const detail=(VESSEL_SUMMARY[lang]||VESSEL_SUMMARY.fr)[vesselKey];
  return (
    <div style={{borderRadius:14,background:"rgba(10,22,40,0.85)",border:`1px solid ${C.primary}33`,padding:16,marginBottom:20}}>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:13,color:C.accent,marginBottom:4}}>{t.vesselTitle}</div>
      <div style={{fontSize:12,color:"#f0f4ff",fontWeight:700,marginBottom:8,fontFamily:"Courier New"}}>{map[vesselKey]}</div>
      {detail.risks.map((r:string,i:number)=>(
        <div key={i} style={{display:"flex",gap:6,marginBottom:4,fontSize:11,color:"rgba(240,244,255,0.75)",fontFamily:"Courier New"}}>
          <span style={{color:C.danger,flexShrink:0}}>{"\u26A0"}</span><span>{r}</span>
        </div>
      ))}
      <div style={{fontSize:11,color:C.gold,fontFamily:"Courier New",marginTop:6}}>{detail.rotation}</div>
    </div>
  );
}

function Chip({ checked, onClick, children }:{ checked:boolean; onClick:()=>void; children:any }) {
  return (
    <button onClick={onClick} style={{display:"flex",alignItems:"flex-start",gap:8,width:"100%",textAlign:"left",
      padding:"9px 11px",borderRadius:10,marginBottom:6,cursor:"pointer",
      border:`1.5px solid ${checked?C.safe:"rgba(255,255,255,0.15)"}`,
      background:checked?"rgba(74,222,128,0.1)":"rgba(255,255,255,0.03)"}}>
      <span style={{width:16,height:16,borderRadius:4,flexShrink:0,marginTop:1,display:"flex",alignItems:"center",justifyContent:"center",
        border:`1.5px solid ${checked?C.safe:"rgba(255,255,255,0.3)"}`,background:checked?C.safe:"transparent",fontSize:10,color:"#060e1a"}}>
        {checked?"\u2713":""}
      </span>
      <span style={{fontSize:11,color:checked?"#f0f4ff":"rgba(240,244,255,0.75)",fontFamily:"Courier New",lineHeight:1.4}}>{children}</span>
    </button>
  );
}

function ScoreBar({ label, pct }:{ label:string; pct:number }) {
  return (
    <div style={{marginBottom:10}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:10,fontFamily:"Courier New",color:"rgba(240,244,255,0.6)",marginBottom:4}}>
        <span>{label}</span><span>{pct}%</span>
      </div>
      <div style={{height:8,borderRadius:4,background:"rgba(255,255,255,0.08)"}}>
        <div style={{height:"100%",borderRadius:4,width:`${pct}%`,background:`linear-gradient(90deg,${C.primary},${C.gold})`,transition:"width 0.3s"}}/>
      </div>
    </div>
  );
}

function CertificateChecklist({ lang }:{ lang:string }) {
  const t=T[lang]||T.fr;
  const profile=loadProfile();
  const dept=profile?.dept==="engine"?"engine":"deck";
  const vessel=profile?.vessel||"cargo";
  const mandatoryList=MANDATORY[lang]||MANDATORY.fr;
  const recommendedList=(RECOMMENDED[lang]||RECOMMENDED.fr).filter((c:any)=>
    (c.dept==="both"||c.dept===dept) && (c.vessel==="all"||c.vessel===vessel)
  );
  const [owned,setOwned]=useState<any>({mandatory:{},recommended:{}});

  useEffect(()=>{ setOwned(loadCertsOwned()); },[]);

  const toggle=(kind:"mandatory"|"recommended",id:string)=>{
    setOwned((prev:any)=>{
      const next={...prev,[kind]:{...prev[kind],[id]:!prev[kind]?.[id]}};
      saveCertsOwned(next);
      return next;
    });
  };

  const mandatoryChecked=mandatoryList.filter((c:any)=>owned.mandatory?.[c.id]).length;
  const recommendedChecked=recommendedList.filter((c:any)=>owned.recommended?.[c.id]).length;
  const mandatoryPct=Math.round((mandatoryChecked/mandatoryList.length)*100);
  const recommendedPct=recommendedList.length?Math.round((recommendedChecked/recommendedList.length)*100):0;

  return (
    <div style={{borderRadius:14,background:"rgba(10,22,40,0.85)",border:`1px solid ${C.primary}33`,padding:16,marginBottom:20}}>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.accent,marginBottom:10}}>{t.certsTitle}</div>

      <ScoreBar label={t.mandatoryTitle} pct={mandatoryPct}/>
      <ScoreBar label={t.recommendedTitle} pct={recommendedPct}/>

      <div style={{padding:12,borderRadius:10,background:`${C.gold}14`,border:`1px solid ${C.gold}44`,marginBottom:16,marginTop:10}}>
        <div style={{fontSize:11,color:C.gold,fontFamily:"Courier New",lineHeight:1.6,fontWeight:700}}>{t.strongPhrase}</div>
      </div>

      <div style={{fontSize:11,color:"rgba(240,244,255,0.55)",fontFamily:"Courier New",marginBottom:6}}>{t.mandatoryTitle}</div>
      {mandatoryList.map((c:any)=>(
        <Chip key={c.id} checked={!!owned.mandatory?.[c.id]} onClick={()=>toggle("mandatory",c.id)}>{c.name}</Chip>
      ))}

      <div style={{fontSize:11,color:"rgba(240,244,255,0.55)",fontFamily:"Courier New",margin:"14px 0 6px"}}>{t.recommendedTitle}</div>
      {recommendedList.map((c:any)=>(
        <Chip key={c.id} checked={!!owned.recommended?.[c.id]} onClick={()=>toggle("recommended",c.id)}>
          <span style={{fontWeight:700}}>{c.name}</span>{" - "}{c.why}
        </Chip>
      ))}

      {vessel==="tanker"&&(
        <div style={{marginTop:14,padding:12,borderRadius:10,background:"rgba(201,146,42,0.08)",border:`1px dashed ${C.gold}55`}}>
          <div style={{fontSize:11,color:C.gold,fontFamily:"Courier New",fontWeight:700,marginBottom:8}}>{t.advancedTankerTitle}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:8}}>
            {(ADVANCED_TANKER[lang]||ADVANCED_TANKER.fr).map((a:any,i:number)=>(
              <div key={i} style={{padding:"7px 11px",borderRadius:8,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.12)",
                fontSize:11,color:"rgba(240,244,255,0.8)",fontFamily:"Courier New"}}>{a.icon} {a.name}</div>
            ))}
          </div>
          <div style={{fontSize:10,color:"rgba(240,244,255,0.5)",fontFamily:"Courier New",lineHeight:1.5,fontStyle:"italic"}}>{t.advancedTankerNote}</div>
        </div>
      )}

      <button disabled style={{width:"100%",marginTop:16,padding:"12px 0",borderRadius:12,border:"1px solid rgba(255,255,255,0.15)",
        background:"rgba(255,255,255,0.04)",color:"rgba(240,244,255,0.35)",fontSize:12,fontFamily:"Courier New",cursor:"default",
        display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
        {t.downloadBtn}
        <span style={{fontSize:9,padding:"2px 6px",borderRadius:6,border:`1px solid ${C.gold}55`,color:C.gold}}>{t.comingSoon}</span>
      </button>
    </div>
  );
}

function ActionPlan({ lang }:{ lang:string }) {
  const t=T[lang]||T.fr;
  return (
    <div style={{borderRadius:14,background:"rgba(10,22,40,0.8)",border:`1px solid ${C.primary}33`,padding:16,marginBottom:20}}>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.accent,marginBottom:12}}>{t.actionPlanTitle}</div>
      {t.steps.map((s:string,i:number)=>(
        <div key={i} style={{display:"flex",gap:10,marginBottom:10,alignItems:"flex-start"}}>
          <div style={{width:22,height:22,borderRadius:"50%",background:`linear-gradient(135deg,${C.primary},${C.secondary})`,
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#fff",flexShrink:0,fontFamily:"'Cinzel',serif"}}>{i+1}</div>
          <div style={{fontSize:12,color:"rgba(240,244,255,0.85)",fontFamily:"Courier New",lineHeight:1.5}}>{s}</div>
        </div>
      ))}
    </div>
  );
}

function CareerInsight({ lang }:{ lang:string }) {
  const t=T[lang]||T.fr;
  return (
    <div style={{borderRadius:14,background:`linear-gradient(135deg,${C.primary}18,${C.gold}12)`,border:`1px solid ${C.gold}44`,padding:16,marginBottom:20}}>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:13,color:C.gold,marginBottom:8}}>{"\u2726"} {t.insightTitle}</div>
      <div style={{fontSize:12,color:"rgba(240,244,255,0.88)",fontFamily:"Courier New",lineHeight:1.7,fontStyle:"italic"}}>{t.insightText}</div>
    </div>
  );
}

function Exercise({ lang }:{ lang:string }) {
  const t=T[lang]||T.fr;
  const [val,setVal]=useState("");
  const [shown,setShown]=useState(false);

  const profile=loadProfile();
  const dept=profile?.dept==="engine"?"engine":"deck";
  const vessel=profile?.vessel||"cargo";
  const mandatoryList=MANDATORY[lang]||MANDATORY.fr;
  const recommendedList=(RECOMMENDED[lang]||RECOMMENDED.fr).filter((c:any)=>
    (c.dept==="both"||c.dept===dept) && (c.vessel==="all"||c.vessel===vessel)
  );
  const owned=loadCertsOwned();
  const missing=[
    ...mandatoryList.filter((c:any)=>!owned.mandatory?.[c.id]).map((c:any)=>c.name),
    ...recommendedList.filter((c:any)=>!owned.recommended?.[c.id]).map((c:any)=>c.name),
  ];

  return (
    <div style={{marginBottom:20}}>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.accent,margin:"20px 0 14px"}}>{t.exTitle}</div>
      <div style={{padding:12,borderRadius:12,background:"rgba(10,22,40,0.7)",border:"1px solid rgba(255,255,255,0.08)"}}>
        <div style={{fontSize:12,color:"#e0e8ff",marginBottom:8,fontFamily:"Courier New",lineHeight:1.6}}>{t.exQ}</div>
        <input value={val} onChange={e=>setVal(e.target.value)} placeholder="..." style={{width:"100%",padding:"10px 12px",
          borderRadius:8,border:"1px solid rgba(255,255,255,0.15)",background:"rgba(6,14,26,0.8)",color:"#f0f4ff",fontSize:12,
          fontFamily:"Courier New",marginBottom:8,boxSizing:"border-box"}}/>
        <button onClick={()=>setShown(!shown)} style={{background:"none",border:"none",color:C.accent,fontSize:11,
          fontFamily:"Courier New",cursor:"pointer",padding:0}}>{shown?t.exHintHide:t.exHintBtn}</button>
        {shown&&(
          <div style={{marginTop:8,padding:10,borderRadius:8,background:"rgba(74,222,128,0.08)",borderLeft:"3px solid #4ade80",
            fontSize:11,color:"rgba(240,244,255,0.85)",lineHeight:1.6,fontFamily:"Courier New"}}>
            {missing.length?`${t.exHintPrefix} ${missing.slice(0,5).join(", ")}${missing.length>5?"...":""}`:t.exHintNone}
          </div>
        )}
      </div>
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

function CtaCard({ lang }:{ lang:string }) {
  const t=T[lang]||T.fr;
  return (
    <div style={{borderRadius:16,background:`linear-gradient(135deg,${C.primary}2a,${C.secondary}2a)`,border:`1.5px solid ${C.accent}66`,padding:18,marginBottom:16,position:"relative"}}>
      <div style={{fontSize:20,marginBottom:8}}>{"\ud83d\ude80"}</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:15,color:"#f0f4ff",fontWeight:700,marginBottom:8}}>{t.ctaTitle}</div>
      <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",fontFamily:"Courier New",lineHeight:1.6,marginBottom:12}}>{t.ctaText}</div>
      {t.ctaItems.map((it:string,i:number)=>(
        <div key={i} style={{display:"flex",gap:8,marginBottom:5,fontSize:11,color:"rgba(240,244,255,0.85)",fontFamily:"Courier New"}}>
          <span style={{color:C.safe,flexShrink:0}}>{"\u2713"}</span><span>{it}</span>
        </div>
      ))}
      <div style={{marginTop:12,display:"inline-block",padding:"5px 12px",borderRadius:8,border:`1px solid ${C.gold}66`,
        color:C.gold,fontSize:10,fontFamily:"Courier New",fontWeight:700,letterSpacing:1}}>{t.comingSoon}</div>
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
  const profile=loadProfile();
  const congratsTitle=profile?.dept==="engine"?t.congratsEngineer:profile?.dept==="deck"?t.congratsCaptain:t.congratsGeneric;

  if(done) return (
    <div style={{padding:"24px 14px"}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:32,marginBottom:8}}>{"\ud83c\udf89"}</div>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:"#f0f4ff",fontWeight:700,marginBottom:6}}>{congratsTitle}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.7)",fontFamily:"Courier New",lineHeight:1.6}}>{t.congratsSub}</div>
      </div>

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

      <CtaCard lang={lang}/>

      <div style={{textAlign:"center",padding:"14px 8px",marginBottom:16,fontSize:12,color:C.accent,fontFamily:"Courier New",
        fontStyle:"italic",lineHeight:1.7,borderTop:"1px solid rgba(255,255,255,0.08)",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
        {t.closingPhrase}
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
  return (
    <div style={{padding:"14px 14px 24px"}}>
      <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New",marginBottom:10}}>{t.intro}</div>
      <div style={{fontSize:10,color:"rgba(240,244,255,0.4)",fontStyle:"italic",fontFamily:"Courier New",marginBottom:18,lineHeight:1.5}}>{t.disclaimer}</div>

      <ProfileSummary lang={lang} onBack={onBack}/>
      <RoadmapSummary lang={lang}/>
      <CertificateChecklist lang={lang}/>
      <VesselSummary lang={lang}/>
      <ActionPlan lang={lang}/>
      <CareerInsight lang={lang}/>
      <Exercise lang={lang}/>
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

export default function LessonShipCareer_L5({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t=T[lang]||T.fr;
  const [phase,setPhase]=useState<"content"|"quiz">("content");
  const [quizDone,setQuizDone]=useState(false);
  const progress=phase==="content"?50:quizDone?100:85;
  const backLabel=lang==="fr"?"◀ Retour":lang==="en"?"◀ Back":lang==="es"?"◀ Volver":"◀ Voltar";
  const moduleFull=lang==="fr"?"Module Carrière — Ship Career Navigator":lang==="en"?"Career Module — Ship Career Navigator":lang==="es"?"Módulo Carrera — Ship Career Navigator":"Módulo Carreira — Ship Career Navigator";
  const lessonOf=lang==="fr"?"Leçon 5/5":lang==="en"?"Lesson 5/5":lang==="es"?"Lección 5/5":"Lição 5/5";
  const badgeText=lang==="fr"?`🎯 ${moduleFull} · Leçon 5/5 · ⭐ Premium+ · 250 XP`:lang==="en"?`🎯 ${moduleFull} · Lesson 5/5 · ⭐ Premium+ · 250 XP`:lang==="es"?`🎯 ${moduleFull} · Lección 5/5 · ⭐ Premium+ · 250 XP`:`🎯 ${moduleFull} · Lição 5/5 · ⭐ Premium+ · 250 XP`;
  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(180deg,${C.navy},${C.navy2})`,color:"#f0f4ff"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.primary}33`}}>
        <div style={{minHeight:54,display:"flex",alignItems:"center",padding:"8px 16px",gap:12}}>
          <button onClick={phase==="content"?onBack:()=>setPhase("content")} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>{backLabel}</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:10,color:C.accent,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🎯 {moduleFull}</div>
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
