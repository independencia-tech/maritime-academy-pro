// LessonShipCareer_L4 - Specificites par type de navire
import { useState } from "react";

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
    moduleLabel:"CARRIERE - TYPE DE NAVIRE",
    lessonTitle:"Specificites par type de navire",
    intro:"Pour le type de navire vise en L1, cette lecon detaille les operations, les risques, le rythme de rotation et les facteurs de remuneration propres a ce choix - au-dela des formations obligatoires deja vues en L3.",
    disclaimer:"Les elements de remuneration, de rotation et de marche de l'emploi decrits sont des tendances generales du secteur, qui varient fortement selon la compagnie, le pavillon et la conjoncture economique.",
    noProfileMsg:"Aucun profil trouve. Retourne a la lecon 1 (Ton profil) pour choisir ton type de navire vise avant d'afficher les specificites adaptees.",
    goToL1:"Aller a la lecon 1",
    detailTitle:"Ton type de navire vise",
    risksLabel:"Risques operationnels principaux", opsLabel:"Operations caracteristiques",
    rotationLabel:"Rythme de rotation typique", crewLabel:"Taille d'equipage typique", payLabel:"Facteur de remuneration",
    s1title:"Comparatif rapide des 4 types de navires", s1hint:"Touche un type",
    s2title:"Sous-types de tankers", s2hint:"Touche un sous-type",
    s3title:"Facteurs de remuneration", s3hint:"Touche un facteur",
    s4title:"Tendances du marche de l'emploi", s4hint:"Touche un secteur",
    keypoints:"Points cles",
    kp:[
      "Chaque type de navire combine un profil de risque, un rythme de vie a bord et une remuneration qui lui sont propres",
      "Les tankers se subdivisent en plusieurs sous-types (brut, produits raffines, chimique, gaz/LNG), chacun avec ses risques et formations specifiques",
      "Le rythme de rotation (duree des contrats, temps a terre) varie fortement d'un secteur a l'autre et influence la vie personnelle autant que la carriere",
      "La remuneration depend de la combinaison risque + specialisation + compagnie + pavillon, pas seulement du grade",
      "Le marche de l'emploi offshore est plus volatile car directement lie aux investissements dans l'energie",
      "Changer de secteur en cours de carriere est possible mais implique souvent des formations d'adaptation et une periode de familiarisation",
    ],
    accidentTitle:"Cas reel : Costa Concordia (2012)",
    accidentText:"Le paquebot Costa Concordia a heurte un rocher pres de l'ile de Giglio en Italie en janvier 2012 apres un changement de route non autorise effectue par le Capitaine, causant le naufrage partiel du navire et la mort de 32 personnes. L'evacuation a ete chaotique : l'ordre d'abandon du navire a ete donne avec un retard significatif, et la gestion de la foule de plus de 4000 personnes a bord a revele des lacunes dans la formation de l'equipage aux procedures de crowd management. Cet accident illustre une specificite majeure des navires a passagers : la gestion d'une evacuation de masse impliquant des civils non-marins est une competence a part entiere, très different de la gestion d'un equipage professionnel reduit sur un cargo.",
    accidentToggle:"Voir le cas complet",
    exTitle:"Exercice pratique",
    exq1:"Tu vises un poste sur : {vessel}. Quels sont les risques operationnels principaux specifiques a ce type de navire ?",
    exq2:"Compare le rythme de rotation typique de ton type de navire vise ({vessel}) avec celui d'un cargo standard.",
    ex3q:"Pourquoi le marche de l'emploi offshore est-il generalement plus volatile que le marche du transport de conteneurs ?",
    ex3a:"Le secteur offshore est directement lie aux investissements des compagnies petrolieres et gazieres, eux-memes dependants du prix du baril et des cycles d'exploration/production. Quand le prix de l'energie baisse, les projets offshore sont geles ou annules rapidement, entrainant des vagues de licenciements. Le transport de conteneurs, lui, repose sur le commerce mondial de biens de consommation, un flux plus stable et moins sujet a des arrets brusques, meme s'il suit aussi les cycles economiques generaux.",
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
    startQuiz:"COMMENCER LE QUIZ",
    cargoLabel:"Cargo / Porte-conteneurs", tankerLabel:"Tanker (petrolier/chimiquier)", passengerLabel:"Navire a passagers / Croisiere", offshoreLabel:"Offshore / Support", yachtLabel:"Yacht", fishingLabel:"Peche (Fishing)",
    exq2connect:"A titre de comparaison, un cargo standard suit :",
    whoForTitle:"Ce navire est fait pour toi si :",
  },
  en:{
    moduleLabel:"CAREER - VESSEL TYPE",
    lessonTitle:"Vessel type specifics",
    intro:"For the vessel type targeted in L1, this lesson details the operations, risks, rotation rhythm and pay factors specific to that choice - beyond the mandatory training already covered in L3.",
    disclaimer:"The pay, rotation and job market elements described are general sector trends, which vary greatly by company, flag and economic conditions.",
    noProfileMsg:"No profile found. Go back to Lesson 1 (Your profile) to choose your target vessel type before displaying adapted specifics.",
    goToL1:"Go to Lesson 1",
    detailTitle:"Your target vessel type",
    risksLabel:"Main operational risks", opsLabel:"Characteristic operations",
    rotationLabel:"Typical rotation rhythm", crewLabel:"Typical crew size", payLabel:"Pay factor",
    s1title:"Quick comparison of the 4 vessel types", s1hint:"Tap a type",
    s2title:"Tanker sub-types", s2hint:"Tap a sub-type",
    s3title:"Pay factors", s3hint:"Tap a factor",
    s4title:"Job market trends", s4hint:"Tap a sector",
    keypoints:"Key Points",
    kp:[
      "Each vessel type combines a risk profile, an onboard rhythm of life and a pay level that are its own",
      "Tankers split into several sub-types (crude, refined products, chemical, gas/LNG), each with specific risks and training",
      "Rotation rhythm (contract length, time ashore) varies greatly by sector and affects personal life as much as career",
      "Pay depends on the combination of risk + specialization + company + flag, not only rank",
      "The offshore job market is more volatile because it is directly tied to energy investments",
      "Switching sector mid-career is possible but often involves adaptation training and a familiarisation period",
    ],
    accidentTitle:"Real case: Costa Concordia (2012)",
    accidentText:"The cruise ship Costa Concordia hit a rock near the island of Giglio in Italy in January 2012 after an unauthorized course change by the Master, causing the partial sinking of the vessel and the death of 32 people. The evacuation was chaotic: the order to abandon ship was given with a significant delay, and managing a crowd of more than 4000 people on board revealed gaps in the crew's crowd management training. This accident illustrates a major specificity of passenger vessels: managing a mass evacuation involving non-seafarer civilians is a skill in its own right, very different from managing a small professional crew on a cargo ship.",
    accidentToggle:"View full case",
    exTitle:"Practice exercise",
    exq1:"You are aiming for a position on: {vessel}. What are the main operational risks specific to this vessel type?",
    exq2:"Compare the typical rotation rhythm of your target vessel type ({vessel}) with that of a standard cargo ship.",
    ex3q:"Why is the offshore job market generally more volatile than the container shipping market?",
    ex3a:"The offshore sector is directly tied to oil and gas company investments, which themselves depend on oil prices and exploration/production cycles. When energy prices fall, offshore projects are frozen or cancelled quickly, causing waves of layoffs. Container shipping, on the other hand, relies on global trade in consumer goods, a more stable flow less prone to sudden stops, even though it also follows general economic cycles.",
    showAnswer:"Show answer", hideAnswer:"Hide",
    startQuiz:"START QUIZ",
    cargoLabel:"Cargo / Container", tankerLabel:"Tanker (oil/chemical)", passengerLabel:"Passenger / Cruise", offshoreLabel:"Offshore / Support", yachtLabel:"Yacht", fishingLabel:"Fishing",
    exq2connect:"For comparison, a standard cargo ship follows:",
    whoForTitle:"This vessel is for you if:",
  },
  es:{
    moduleLabel:"CARRERA - TIPO DE BUQUE",
    lessonTitle:"Especificidades por tipo de buque",
    intro:"Para el tipo de buque elegido en L1, esta leccion detalla las operaciones, los riesgos, el ritmo de rotacion y los factores de remuneracion propios de esa eleccion - mas alla de las formaciones obligatorias ya vistas en L3.",
    disclaimer:"Los elementos de remuneracion, rotacion y mercado laboral descritos son tendencias generales del sector, que varian mucho segun la compania, el pabellon y la coyuntura economica.",
    noProfileMsg:"No se encontro ningun perfil. Vuelve a la leccion 1 (Tu perfil) para elegir tu tipo de buque objetivo antes de mostrar las especificidades adaptadas.",
    goToL1:"Ir a la leccion 1",
    detailTitle:"Tu tipo de buque objetivo",
    risksLabel:"Principales riesgos operativos", opsLabel:"Operaciones caracteristicas",
    rotationLabel:"Ritmo de rotacion tipico", crewLabel:"Tamano de tripulacion tipico", payLabel:"Factor de remuneracion",
    s1title:"Comparativa rapida de los 4 tipos de buque", s1hint:"Toca un tipo",
    s2title:"Subtipos de tanqueros", s2hint:"Toca un subtipo",
    s3title:"Factores de remuneracion", s3hint:"Toca un factor",
    s4title:"Tendencias del mercado laboral", s4hint:"Toca un sector",
    keypoints:"Puntos clave",
    kp:[
      "Cada tipo de buque combina un perfil de riesgo, un ritmo de vida a bordo y una remuneracion propios",
      "Los tanqueros se dividen en varios subtipos (crudo, productos refinados, quimico, gas/LNG), cada uno con riesgos y formaciones especificas",
      "El ritmo de rotacion (duracion de contratos, tiempo en tierra) varia mucho segun el sector y afecta a la vida personal tanto como a la carrera",
      "La remuneracion depende de la combinacion riesgo + especializacion + compania + pabellon, no solo del grado",
      "El mercado laboral offshore es mas volatil porque esta directamente ligado a las inversiones energeticas",
      "Cambiar de sector durante la carrera es posible pero a menudo implica formaciones de adaptacion y un periodo de familiarizacion",
    ],
    accidentTitle:"Caso real: Costa Concordia (2012)",
    accidentText:"El crucero Costa Concordia choco contra una roca cerca de la isla de Giglio en Italia en enero de 2012 tras un cambio de rumbo no autorizado por el Capitan, causando el hundimiento parcial del buque y la muerte de 32 personas. La evacuacion fue caotica: la orden de abandonar el buque se dio con un retraso significativo, y la gestion de una multitud de mas de 4000 personas a bordo revelo carencias en la formacion de la tripulacion en procedimientos de crowd management. Este accidente ilustra una especificidad importante de los buques de pasaje: gestionar una evacuacion masiva con civiles no marinos es una competencia propia, muy diferente de gestionar una tripulacion profesional reducida en un buque de carga.",
    accidentToggle:"Ver caso completo",
    exTitle:"Ejercicio practico",
    exq1:"Aspiras a un puesto en: {vessel}. Cuales son los principales riesgos operativos especificos de este tipo de buque?",
    exq2:"Compara el ritmo de rotacion tipico de tu tipo de buque objetivo ({vessel}) con el de un buque de carga estandar.",
    ex3q:"Por que el mercado laboral offshore suele ser mas volatil que el mercado del transporte en contenedores?",
    ex3a:"El sector offshore esta directamente ligado a las inversiones de las companias petroleras y gasisticas, que a su vez dependen del precio del barril y de los ciclos de exploracion/produccion. Cuando el precio de la energia baja, los proyectos offshore se congelan o cancelan rapidamente, provocando olas de despidos. El transporte en contenedores, por su parte, se basa en el comercio mundial de bienes de consumo, un flujo mas estable y menos propenso a paradas bruscas, aunque tambien sigue los ciclos economicos generales.",
    showAnswer:"Ver correccion", hideAnswer:"Ocultar",
    startQuiz:"EMPEZAR QUIZ",
    cargoLabel:"Carga / Portacontenedores", tankerLabel:"Tanquero (petroleo/quimico)", passengerLabel:"Pasaje / Crucero", offshoreLabel:"Offshore / Apoyo", yachtLabel:"Yate", fishingLabel:"Pesca (Fishing)",
    exq2connect:"A modo de comparacion, un buque de carga estandar sigue:",
    whoForTitle:"Este buque es para ti si:",
  },
  pt:{
    moduleLabel:"CARREIRA - TIPO DE NAVIO",
    lessonTitle:"Especificidades por tipo de navio",
    intro:"Para o tipo de navio escolhido em L1, esta licao detalha as operacoes, os riscos, o ritmo de rotacao e os fatores de remuneracao proprios dessa escolha - alem dos treinamentos obrigatorios ja vistos em L3.",
    disclaimer:"Os elementos de remuneracao, rotacao e mercado de trabalho descritos sao tendencias gerais do setor, que variam muito conforme a empresa, a bandeira e a conjuntura economica.",
    noProfileMsg:"Nenhum perfil encontrado. Volte a licao 1 (Seu perfil) para escolher seu tipo de navio almejado antes de exibir as especificidades adaptadas.",
    goToL1:"Ir para a licao 1",
    detailTitle:"Seu tipo de navio almejado",
    risksLabel:"Principais riscos operacionais", opsLabel:"Operacoes caracteristicas",
    rotationLabel:"Ritmo de rotacao tipico", crewLabel:"Tamanho de tripulacao tipico", payLabel:"Fator de remuneracao",
    s1title:"Comparativo rapido dos 4 tipos de navio", s1hint:"Toque em um tipo",
    s2title:"Subtipos de petroleiros", s2hint:"Toque em um subtipo",
    s3title:"Fatores de remuneracao", s3hint:"Toque em um fator",
    s4title:"Tendencias do mercado de trabalho", s4hint:"Toque em um setor",
    keypoints:"Pontos-chave",
    kp:[
      "Cada tipo de navio combina um perfil de risco, um ritmo de vida a bordo e uma remuneracao proprios",
      "Os petroleiros se dividem em varios subtipos (bruto, produtos refinados, quimico, gas/LNG), cada um com riscos e treinamentos especificos",
      "O ritmo de rotacao (duracao dos contratos, tempo em terra) varia muito conforme o setor e afeta a vida pessoal tanto quanto a carreira",
      "A remuneracao depende da combinacao risco + especializacao + empresa + bandeira, nao apenas do posto",
      "O mercado de trabalho offshore e mais volatil porque esta diretamente ligado aos investimentos energeticos",
      "Mudar de setor durante a carreira e possivel mas geralmente envolve treinamentos de adaptacao e um periodo de familiarizacao",
    ],
    accidentTitle:"Caso real: Costa Concordia (2012)",
    accidentText:"O navio de cruzeiro Costa Concordia bateu em uma rocha perto da ilha de Giglio, na Italia, em janeiro de 2012, apos uma mudanca de rota nao autorizada feita pelo Comandante, causando o naufragio parcial do navio e a morte de 32 pessoas. A evacuacao foi caotica: a ordem de abandonar o navio foi dada com um atraso significativo, e a gestao de uma multidao de mais de 4000 pessoas a bordo revelou lacunas no treinamento da tripulacao em procedimentos de crowd management. Esse acidente ilustra uma especificidade importante dos navios de passageiros: gerenciar uma evacuacao em massa envolvendo civis nao-marinheiros e uma competencia propria, muito diferente de gerenciar uma tripulacao profissional reduzida em um navio de carga.",
    accidentToggle:"Ver caso completo",
    exTitle:"Exercicio pratico",
    exq1:"Voce almeja um posto em: {vessel}. Quais sao os principais riscos operacionais especificos desse tipo de navio?",
    exq2:"Compare o ritmo de rotacao tipico do seu tipo de navio almejado ({vessel}) com o de um navio de carga padrao.",
    ex3q:"Por que o mercado de trabalho offshore costuma ser mais volatil que o mercado de transporte em conteineres?",
    ex3a:"O setor offshore esta diretamente ligado aos investimentos das empresas petroliferas e de gas, que por sua vez dependem do preco do barril e dos ciclos de exploracao/producao. Quando o preco da energia cai, os projetos offshore sao congelados ou cancelados rapidamente, causando ondas de demissoes. O transporte em conteineres, por sua vez, se baseia no comercio mundial de bens de consumo, um fluxo mais estavel e menos propenso a paradas bruscas, ainda que tambem siga os ciclos economicos gerais.",
    showAnswer:"Ver correcao", hideAnswer:"Ocultar",
    startQuiz:"COMECAR QUIZ",
    cargoLabel:"Carga / Porta-conteineres", tankerLabel:"Petroleiro/Quimiqueiro", passengerLabel:"Passageiros / Cruzeiro", offshoreLabel:"Offshore / Apoio", yachtLabel:"Yate", fishingLabel:"Pesca (Fishing)",
    exq2connect:"Para comparacao, um navio de carga padrao segue:",
    whoForTitle:"Este navio e para voce se:",
  },
};

const VESSEL_DETAIL: any = {
  fr:{
    cargo:{risks:["Chutes lors des operations de manutention et d'arrimage","Ecrasement lors du deplacement de conteneurs ou de vehicules","Fatigue liee a des rotations d'escale frequentes et rapides"],
      operations:"Chargement/dechargement rapide en escale, plans d'arrimage, verification du saisissage de la cargaison, gestion de la stabilite en fonction du plan de chargement.",
      rotation:"Contrats generalement de 4 a 6 mois, rotations frequentes selon les lignes commerciales, escales courtes (quelques heures a 2 jours).",
      crewSize:"Equipage reduit, generalement 15 a 25 personnes selon la taille du navire.",
      payNote:"Base de reference du secteur ; remuneration standard sans prime specifique de risque.",
      whoFor:["Tu aimes la routine et l'efficacite operationnelle","Tu veux un bon point d'entree pour diversifier ton experience","Tu preferes un equipage reduit et professionnel","Tu es a l'aise avec des escales frequentes et courtes"]},
    tanker:{risks:["Atmosphere explosive lors des operations de chargement/dechargement de cargaison","Exposition a des vapeurs toxiques selon le produit transporte","Risque d'electricite statique lors du nettoyage de cuve"],
      operations:"Operations de chargement/dechargement sous strict controle des vapeurs, degazage, nettoyage de cuve, verification permanente de l'inertage.",
      rotation:"Contrats generalement de 3 a 4 mois, avec des periodes de repos a terre plus longues en compensation du niveau de risque.",
      crewSize:"Equipage similaire au cargo standard, generalement 20 a 25 personnes.",
      payNote:"Prime de risque significative par rapport au cargo standard, variable selon le type de produit transporte (chimique et gaz superieurs au brut).",
      whoFor:["Tu acceptes un niveau de risque plus eleve contre une prime","Tu es rigoureux sur le respect des procedures de securite","Tu veux te specialiser dans un produit precis (brut, chimique, gaz)","Tu apprecies des periodes de repos a terre plus longues"]},
    passenger:{risks:["Gestion de l'evacuation de masse impliquant des civils non-marins","Risques sanitaires lies a la promiscuite (epidemies a bord)","Complexite de la coordination entre equipage marin et personnel hotelier"],
      operations:"Exercices d'evacuation reguliers avec les passagers, gestion des escales touristiques, coordination avec le personnel hotelier et les services medicaux du navire.",
      rotation:"Contrats generalement plus longs, 6 a 9 mois, avec une vie a bord tres structuree et sociale.",
      crewSize:"Equipage tres important, plusieurs centaines a plus de mille personnes en comptant le personnel hotelier.",
      payNote:"Remuneration variable selon le poste (marine vs hotelier) ; les officiers marine restent proches du standard cargo, le personnel hotelier suit une grille distincte.",
      whoFor:["Tu aimes l'interaction avec le public","Tu veux voyager et decouvrir de nouvelles destinations","Tu apprecies le travail d'equipe dans un grand groupe","Tu es a l'aise dans un environnement multiculturel"]},
    offshore:{risks:["Exposition aux conditions meteorologiques extremes en haute mer","Risques lies aux operations d'appontage d'helicoptere","Proximite avec des installations petrolieres ou gazieres a haut risque"],
      operations:"Positionnement dynamique (DP), transfert de personnel et de materiel vers les installations, support aux operations de forage ou de maintenance sous-marine.",
      rotation:"Rotations courtes et intenses, generalement 3 a 4 semaines a bord suivies de periodes egales a terre.",
      crewSize:"Equipage reduit et hautement specialise, generalement 15 a 20 personnes.",
      payNote:"Remuneration generalement la plus elevee du secteur, mais fortement dependante du cours du petrole et des cycles d'investissement energetique.",
      whoFor:["Tu aimes les operations techniques de haute precision","Tu veux les remunerations les plus elevees du secteur","Tu acceptes une vie tres rotative (rotations courtes et intenses)","Tu aimes les operations dynamiques et changeantes"]},
    yacht:{risks:["Espace de travail et de vie tres reduit generant une forte proximite avec l'equipage","Exigences elevees et changeantes des proprietaires ou invites","Risques lies a la manutention d'annexes et de jouets nautiques"],
      operations:"Service haut de gamme aux invites, entretien impeccable du yacht, logistique des escales dans des ports selects, coordination avec le proprietaire ou son representant.",
      rotation:"Contrats souvent saisonniers (saison Mediterranee ou Caraibes), parfois avec des periodes tres intenses suivies de pauses plus longues.",
      crewSize:"Equipage tres reduit, generalement 3 a 15 personnes selon la taille du yacht.",
      payNote:"Salaire de base modere a bon, mais les pourboires des proprietaires/invites peuvent representer une part tres importante du revenu total.",
      whoFor:["Tu aimes le service et l'hotellerie haut de gamme","Tu veux naviguer dans des destinations prisees (Mediterranee, Caraibes)","Tu acceptes un cadre tres hierarchise avec des proprietaires exigeants","Tu apprecies les contrats saisonniers avec des pourboires potentiellement eleves"]},
    fishing:{risks:["Travail physique intense dans des conditions de mer souvent difficiles","Exposition prolongee au froid, a l'humidite et a la fatigue","Manutention de filets, casiers ou lignes avec des risques de blessure"],
      operations:"Manoeuvres de peche (chalutage, palangre, casiers selon le type de peche), traitement et conservation des prises a bord, entretien du materiel de peche.",
      rotation:"Campagnes de peche pouvant durer de quelques jours a plusieurs mois selon la zone et le type de peche, avec des periodes a terre variables.",
      crewSize:"Equipage reduit, generalement 5 a 20 personnes selon la taille du navire de peche.",
      payNote:"Remuneration souvent basee sur un systeme de parts lie a la valeur de la peche realisee, plutot qu'un salaire fixe garanti.",
      whoFor:["Tu acceptes un travail physique intense","Tu es resistant aux conditions meteorologiques difficiles","Tu preferes une remuneration liee a la performance (systeme de parts)","Tu acceptes de longues campagnes en mer loin de la cote"]},
  },
  en:{
    cargo:{risks:["Falls during handling and stowage operations","Crushing when moving containers or vehicles","Fatigue from frequent, fast port rotations"],
      operations:"Fast loading/unloading at port calls, stowage plans, cargo lashing checks, stability management based on the loading plan.",
      rotation:"Contracts generally 4 to 6 months, frequent rotations depending on trade routes, short port calls (a few hours to 2 days).",
      crewSize:"Small crew, generally 15 to 25 people depending on vessel size.",
      payNote:"Sector reference baseline; standard pay without specific risk premium.",
      whoFor:["You like routine and operational efficiency","You want a good entry point to diversify your experience","You prefer a small, professional crew","You are comfortable with frequent, short port calls"]},
    tanker:{risks:["Explosive atmosphere during cargo loading/unloading","Exposure to toxic vapours depending on the product carried","Static electricity risk during tank cleaning"],
      operations:"Loading/unloading under strict vapour control, degassing, tank cleaning, constant inert gas system checks.",
      rotation:"Contracts generally 3 to 4 months, with longer rest periods ashore in compensation for the risk level.",
      crewSize:"Crew similar to a standard cargo ship, generally 20 to 25 people.",
      payNote:"Significant risk premium compared to standard cargo, varying by product type (chemical and gas higher than crude).",
      whoFor:["You accept a higher risk level in exchange for a premium","You are rigorous about following safety procedures","You want to specialize in a specific product (crude, chemical, gas)","You appreciate longer rest periods ashore"]},
    passenger:{risks:["Managing mass evacuation involving non-seafarer civilians","Health risks from close quarters (onboard outbreaks)","Coordination complexity between marine crew and hotel staff"],
      operations:"Regular evacuation drills with passengers, managing tourist port calls, coordination with hotel staff and the ship's medical services.",
      rotation:"Generally longer contracts, 6 to 9 months, with a highly structured and social onboard life.",
      crewSize:"Very large crew, several hundred to over a thousand people including hotel staff.",
      payNote:"Pay varies by position (marine vs hotel); marine officers stay close to cargo standards, hotel staff follow a separate pay scale.",
      whoFor:["You enjoy interacting with the public","You want to travel and discover new destinations","You enjoy teamwork within a large group","You are comfortable in a multicultural environment"]},
    offshore:{risks:["Exposure to extreme weather conditions offshore","Risks related to helicopter landing operations","Proximity to high-risk oil or gas installations"],
      operations:"Dynamic positioning (DP), transferring personnel and equipment to installations, support for drilling or subsea maintenance operations.",
      rotation:"Short, intense rotations, generally 3 to 4 weeks on board followed by equal periods ashore.",
      crewSize:"Small, highly specialized crew, generally 15 to 20 people.",
      payNote:"Generally the highest pay in the sector, but heavily dependent on oil prices and energy investment cycles.",
      whoFor:["You like high-precision technical operations","You want the highest pay in the sector","You accept a highly rotational life (short, intense rotations)","You like dynamic, changing operations"]},
    yacht:{risks:["Very small living and working space creating close proximity with the crew","High and changing demands from owners or guests","Risks related to handling tenders and water toys"],
      operations:"High-end service to guests, impeccable yacht maintenance, port call logistics in select marinas, coordination with the owner or their representative.",
      rotation:"Often seasonal contracts (Mediterranean or Caribbean season), sometimes with very intense periods followed by longer breaks.",
      crewSize:"Very small crew, generally 3 to 15 people depending on yacht size.",
      payNote:"Moderate to good base salary, but tips from owners/guests can represent a very significant share of total income.",
      whoFor:["You enjoy high-end hospitality and service","You want to sail in sought-after destinations (Mediterranean, Caribbean)","You accept a highly hierarchical setting with demanding owners","You appreciate seasonal contracts with potentially high tips"]},
    fishing:{risks:["Intense physical work often in difficult sea conditions","Prolonged exposure to cold, humidity and fatigue","Handling nets, pots or lines with injury risks"],
      operations:"Fishing manoeuvres (trawling, longlining, pots depending on the fishing type), processing and preserving the catch on board, maintaining fishing gear.",
      rotation:"Fishing trips lasting from a few days to several months depending on the area and fishing type, with variable time ashore.",
      crewSize:"Small crew, generally 5 to 20 people depending on the fishing vessel size.",
      payNote:"Pay often based on a share system tied to the value of the catch, rather than a guaranteed fixed salary.",
      whoFor:["You accept intense physical work","You are resilient to harsh weather conditions","You prefer performance-based pay (share system)","You accept long voyages at sea far from the coast"]},
  },
  es:{
    cargo:{risks:["Caidas durante las operaciones de manipulacion y estiba","Aplastamiento al mover contenedores o vehiculos","Fatiga por rotaciones portuarias frecuentes y rapidas"],
      operations:"Carga/descarga rapida en escala, planes de estiba, verificacion del trincado de la carga, gestion de la estabilidad segun el plan de carga.",
      rotation:"Contratos generalmente de 4 a 6 meses, rotaciones frecuentes segun las rutas comerciales, escalas cortas (unas horas a 2 dias).",
      crewSize:"Tripulacion reducida, generalmente 15 a 25 personas segun el tamano del buque.",
      payNote:"Base de referencia del sector; remuneracion estandar sin prima especifica de riesgo.",
      whoFor:["Te gusta la rutina y la eficiencia operativa","Quieres un buen punto de entrada para diversificar tu experiencia","Prefieres una tripulacion reducida y profesional","Te sientes comodo con escalas frecuentes y cortas"]},
    tanker:{risks:["Atmosfera explosiva durante las operaciones de carga/descarga","Exposicion a vapores toxicos segun el producto transportado","Riesgo de electricidad estatica durante la limpieza de tanques"],
      operations:"Operaciones de carga/descarga bajo estricto control de vapores, desgasificacion, limpieza de tanques, verificacion constante del sistema de gas inerte.",
      rotation:"Contratos generalmente de 3 a 4 meses, con periodos de descanso en tierra mas largos como compensacion por el nivel de riesgo.",
      crewSize:"Tripulacion similar a un buque de carga estandar, generalmente 20 a 25 personas.",
      payNote:"Prima de riesgo significativa frente a la carga estandar, variable segun el tipo de producto (quimico y gas superiores al crudo).",
      whoFor:["Aceptas un nivel de riesgo mas alto a cambio de una prima","Eres riguroso con el cumplimiento de los procedimientos de seguridad","Quieres especializarte en un producto especifico (crudo, quimico, gas)","Aprecias periodos de descanso en tierra mas largos"]},
    passenger:{risks:["Gestion de evacuacion masiva con civiles no marinos","Riesgos sanitarios por la proximidad (brotes a bordo)","Complejidad de coordinacion entre tripulacion marina y personal hotelero"],
      operations:"Ejercicios de evacuacion regulares con pasajeros, gestion de escalas turisticas, coordinacion con el personal hotelero y los servicios medicos del buque.",
      rotation:"Contratos generalmente mas largos, 6 a 9 meses, con una vida a bordo muy estructurada y social.",
      crewSize:"Tripulacion muy numerosa, de varios cientos a mas de mil personas incluyendo al personal hotelero.",
      payNote:"Remuneracion variable segun el puesto (marina vs hotelero); los oficiales de marina se mantienen cerca del estandar de carga, el personal hotelero sigue una escala distinta.",
      whoFor:["Disfrutas la interaccion con el publico","Quieres viajar y descubrir nuevos destinos","Disfrutas el trabajo en equipo dentro de un grupo grande","Te sientes comodo en un entorno multicultural"]},
    offshore:{risks:["Exposicion a condiciones meteorologicas extremas en alta mar","Riesgos relacionados con operaciones de aterrizaje de helicopteros","Proximidad a instalaciones petroleras o gasisticas de alto riesgo"],
      operations:"Posicionamiento dinamico (DP), transferencia de personal y material a las instalaciones, apoyo a operaciones de perforacion o mantenimiento submarino.",
      rotation:"Rotaciones cortas e intensas, generalmente 3 a 4 semanas a bordo seguidas de periodos iguales en tierra.",
      crewSize:"Tripulacion reducida y altamente especializada, generalmente 15 a 20 personas.",
      payNote:"Generalmente la remuneracion mas alta del sector, pero muy dependiente del precio del petroleo y de los ciclos de inversion energetica.",
      whoFor:["Te gustan las operaciones tecnicas de alta precision","Quieres la remuneracion mas alta del sector","Aceptas una vida muy rotativa (rotaciones cortas e intensas)","Te gustan las operaciones dinamicas y cambiantes"]},
    yacht:{risks:["Espacio de trabajo y de vida muy reducido que genera una fuerte proximidad con la tripulacion","Exigencias altas y cambiantes de los propietarios o invitados","Riesgos relacionados con el manejo de anexos y juguetes nauticos"],
      operations:"Servicio de alta gama a los invitados, mantenimiento impecable del yate, logistica de escalas en puertos selectos, coordinacion con el propietario o su representante.",
      rotation:"Contratos a menudo estacionales (temporada Mediterraneo o Caribe), a veces con periodos muy intensos seguidos de pausas mas largas.",
      crewSize:"Tripulacion muy reducida, generalmente 3 a 15 personas segun el tamano del yate.",
      payNote:"Salario base moderado a bueno, pero las propinas de propietarios/invitados pueden representar una parte muy importante del ingreso total.",
      whoFor:["Te gusta el servicio y la hoteleria de alta gama","Quieres navegar en destinos codiciados (Mediterraneo, Caribe)","Aceptas un entorno muy jerarquico con propietarios exigentes","Aprecias los contratos estacionales con propinas potencialmente altas"]},
    fishing:{risks:["Trabajo fisico intenso en condiciones de mar a menudo dificiles","Exposicion prolongada al frio, la humedad y la fatiga","Manejo de redes, nasas o lineas con riesgos de lesion"],
      operations:"Maniobras de pesca (arrastre, palangre, nasas segun el tipo de pesca), procesamiento y conservacion de la captura a bordo, mantenimiento del equipo de pesca.",
      rotation:"Campanas de pesca que pueden durar desde unos dias hasta varios meses segun la zona y el tipo de pesca, con periodos en tierra variables.",
      crewSize:"Tripulacion reducida, generalmente 5 a 20 personas segun el tamano del buque pesquero.",
      payNote:"Remuneracion a menudo basada en un sistema de partes ligado al valor de la captura, en lugar de un salario fijo garantizado.",
      whoFor:["Aceptas un trabajo fisico intenso","Eres resistente a condiciones meteorologicas dificiles","Prefieres una remuneracion ligada al rendimiento (sistema de partes)","Aceptas largas campanas en el mar lejos de la costa"]},
  },
  pt:{
    cargo:{risks:["Quedas durante operacoes de manuseio e estiva","Esmagamento ao mover conteineres ou veiculos","Fadiga por rotacoes portuarias frequentes e rapidas"],
      operations:"Carga/descarga rapida em escala, planos de estiva, verificacao do escoramento da carga, gestao da estabilidade conforme o plano de carga.",
      rotation:"Contratos geralmente de 4 a 6 meses, rotacoes frequentes conforme as rotas comerciais, escalas curtas (algumas horas a 2 dias).",
      crewSize:"Tripulacao reduzida, geralmente 15 a 25 pessoas conforme o tamanho do navio.",
      payNote:"Base de referencia do setor; remuneracao padrao sem adicional especifico de risco.",
      whoFor:["Voce gosta de rotina e eficiencia operacional","Voce quer um bom ponto de entrada para diversificar sua experiencia","Voce prefere uma tripulacao reduzida e profissional","Voce se sente confortavel com escalas frequentes e curtas"]},
    tanker:{risks:["Atmosfera explosiva durante operacoes de carga/descarga","Exposicao a vapores toxicos conforme o produto transportado","Risco de eletricidade estatica durante a limpeza de tanques"],
      operations:"Operacoes de carga/descarga sob estrito controle de vapores, desgaseificacao, limpeza de tanques, verificacao constante do sistema de gas inerte.",
      rotation:"Contratos geralmente de 3 a 4 meses, com periodos de descanso em terra mais longos como compensacao pelo nivel de risco.",
      crewSize:"Tripulacao semelhante a um navio de carga padrao, geralmente 20 a 25 pessoas.",
      payNote:"Adicional de risco significativo frente a carga padrao, variavel conforme o tipo de produto (quimico e gas superiores ao bruto).",
      whoFor:["Voce aceita um nivel de risco mais alto em troca de um adicional","Voce e rigoroso quanto ao cumprimento dos procedimentos de seguranca","Voce quer se especializar em um produto especifico (bruto, quimico, gas)","Voce aprecia periodos de descanso em terra mais longos"]},
    passenger:{risks:["Gestao de evacuacao em massa envolvendo civis nao-marinheiros","Riscos sanitarios pela proximidade (surtos a bordo)","Complexidade de coordenacao entre tripulacao marinha e pessoal hoteleiro"],
      operations:"Exercicios de evacuacao regulares com passageiros, gestao de escalas turisticas, coordenacao com o pessoal hoteleiro e os servicos medicos do navio.",
      rotation:"Contratos geralmente mais longos, 6 a 9 meses, com uma vida a bordo muito estruturada e social.",
      crewSize:"Tripulacao muito numerosa, de varias centenas a mais de mil pessoas incluindo o pessoal hoteleiro.",
      payNote:"Remuneracao variavel conforme o posto (marinha vs hoteleiro); os oficiais de marinha ficam proximos do padrao de carga, o pessoal hoteleiro segue uma tabela distinta.",
      whoFor:["Voce gosta de interagir com o publico","Voce quer viajar e descobrir novos destinos","Voce gosta de trabalho em equipe dentro de um grande grupo","Voce se sente confortavel em um ambiente multicultural"]},
    offshore:{risks:["Exposicao a condicoes meteorologicas extremas em alto mar","Riscos relacionados a operacoes de aterrissagem de helicoptero","Proximidade com instalacoes petroliferas ou de gas de alto risco"],
      operations:"Posicionamento dinamico (DP), transferencia de pessoal e material para as instalacoes, apoio a operacoes de perfuracao ou manutencao submarina.",
      rotation:"Rotacoes curtas e intensas, geralmente 3 a 4 semanas a bordo seguidas de periodos iguais em terra.",
      crewSize:"Tripulacao reduzida e altamente especializada, geralmente 15 a 20 pessoas.",
      payNote:"Geralmente a remuneracao mais alta do setor, mas fortemente dependente do preco do petroleo e dos ciclos de investimento energetico.",
      whoFor:["Voce gosta de operacoes tecnicas de alta precisao","Voce quer a remuneracao mais alta do setor","Voce aceita uma vida muito rotativa (rotacoes curtas e intensas)","Voce gosta de operacoes dinamicas e em constante mudanca"]},
    yacht:{risks:["Espaco de trabalho e de vida muito reduzido gerando forte proximidade com a tripulacao","Exigencias altas e mutaveis dos proprietarios ou convidados","Riscos relacionados ao manuseio de anexos e brinquedos aquaticos"],
      operations:"Servico de alto padrao aos convidados, manutencao impecavel do iate, logistica de escalas em portos seletos, coordenacao com o proprietario ou seu representante.",
      rotation:"Contratos geralmente sazonais (temporada Mediterraneo ou Caribe), por vezes com periodos muito intensos seguidos de pausas mais longas.",
      crewSize:"Tripulacao muito reduzida, geralmente 3 a 15 pessoas conforme o tamanho do iate.",
      payNote:"Salario base moderado a bom, mas as gorjetas de proprietarios/convidados podem representar uma parte muito importante da renda total.",
      whoFor:["Voce gosta de servico e hotelaria de alto padrao","Voce quer navegar em destinos cobicados (Mediterraneo, Caribe)","Voce aceita um ambiente muito hierarquizado com proprietarios exigentes","Voce aprecia contratos sazonais com gorjetas potencialmente altas"]},
    fishing:{risks:["Trabalho fisico intenso em condicoes de mar geralmente dificeis","Exposicao prolongada ao frio, a umidade e a fadiga","Manuseio de redes, covos ou linhas com riscos de lesao"],
      operations:"Manobras de pesca (arrasto, espinhel, covos conforme o tipo de pesca), processamento e conservacao da captura a bordo, manutencao do equipamento de pesca.",
      rotation:"Campanhas de pesca que podem durar de alguns dias a varios meses conforme a area e o tipo de pesca, com periodos em terra variaveis.",
      crewSize:"Tripulacao reduzida, geralmente 5 a 20 pessoas conforme o tamanho do navio de pesca.",
      payNote:"Remuneracao geralmente baseada em um sistema de partes ligado ao valor da captura, em vez de um salario fixo garantido.",
      whoFor:["Voce aceita um trabalho fisico intenso","Voce e resistente a condicoes meteorologicas dificeis","Voce prefere uma remuneracao ligada ao desempenho (sistema de partes)","Voce aceita longas campanhas no mar longe da costa"]},
  },
};

const SUBTANKER: any = {
  fr:[
    {name:"Petrolier brut (Crude)",desc:"Transporte du petrole brut non raffine sur de longues distances. Cargaison relativement stable chimiquement, mais volumes tres importants et risques d'incendie majeurs."},
    {name:"Tanker produits raffines",desc:"Transporte essence, diesel, kerosene entre raffineries et centres de distribution. Rotations plus frequentes et courtes que le brut, cargaisons variees necessitant un nettoyage rigoureux entre chargements."},
    {name:"Chimiquier",desc:"Transporte des produits chimiques industriels, souvent toxiques ou corrosifs. Exige la formation Advanced Chemical Tanker et une connaissance precise de chaque produit transporte."},
    {name:"Gazier (LNG/LPG)",desc:"Transporte du gaz naturel liquefie ou du gaz de petrole liquefie a des temperatures cryogeniques. Exige une formation specifique STCW V/1-2 distincte, parmi les plus techniques et les mieux remunerees du secteur tanker."},
  ],
  en:[
    {name:"Crude oil tanker",desc:"Transports unrefined crude oil over long distances. Chemically relatively stable cargo, but very large volumes and major fire risks."},
    {name:"Refined product tanker",desc:"Transports gasoline, diesel, kerosene between refineries and distribution centers. More frequent, shorter rotations than crude, varied cargoes requiring rigorous cleaning between loads."},
    {name:"Chemical tanker",desc:"Transports industrial chemical products, often toxic or corrosive. Requires Advanced Chemical Tanker training and precise knowledge of each product carried."},
    {name:"Gas carrier (LNG/LPG)",desc:"Transports liquefied natural gas or liquefied petroleum gas at cryogenic temperatures. Requires specific separate STCW V/1-2 training, among the most technical and best paid in the tanker sector."},
  ],
  es:[
    {name:"Petrolero de crudo",desc:"Transporta petroleo crudo no refinado a largas distancias. Carga quimicamente relativamente estable, pero volumenes muy grandes y riesgos de incendio importantes."},
    {name:"Tanquero de productos refinados",desc:"Transporta gasolina, diesel, querosen entre refinerias y centros de distribucion. Rotaciones mas frecuentes y cortas que el crudo, cargas variadas que requieren una limpieza rigurosa entre cargas."},
    {name:"Quimiquero",desc:"Transporta productos quimicos industriales, a menudo toxicos o corrosivos. Requiere la formacion Advanced Chemical Tanker y un conocimiento preciso de cada producto transportado."},
    {name:"Gasero (LNG/LPG)",desc:"Transporta gas natural licuado o gas licuado de petroleo a temperaturas criogenicas. Requiere una formacion especifica STCW V/1-2 distinta, entre las mas tecnicas y mejor pagadas del sector tanquero."},
  ],
  pt:[
    {name:"Petroleiro de bruto",desc:"Transporta petroleo bruto nao refinado por longas distancias. Carga quimicamente relativamente estavel, mas volumes muito grandes e riscos de incendio importantes."},
    {name:"Petroleiro de produtos refinados",desc:"Transporta gasolina, diesel, querosene entre refinarias e centros de distribuicao. Rotacoes mais frequentes e curtas que o bruto, cargas variadas exigindo limpeza rigorosa entre cargas."},
    {name:"Quimiqueiro",desc:"Transporta produtos quimicos industriais, muitas vezes toxicos ou corrosivos. Exige o treinamento Advanced Chemical Tanker e conhecimento preciso de cada produto transportado."},
    {name:"Gaseiro (LNG/LPG)",desc:"Transporta gas natural liquefeito ou gas de petroleo liquefeito a temperaturas criogenicas. Exige um treinamento especifico STCW V/1-2 distinto, entre os mais tecnicos e melhor pagos do setor de petroleiros."},
  ],
};

const PAYFACTORS: any = {
  fr:[
    {name:"Prime de risque",desc:"Les tankers et l'offshore incluent generalement une prime de risque significative par rapport au cargo standard, proportionnelle a la dangerosite des operations."},
    {name:"Prime d'eloignement / d'isolement",desc:"Certaines routes ou zones (Arctique, longues traversees sans escale) donnent lieu a des primes additionnelles independantes du type de navire."},
    {name:"Anciennete et grade",desc:"Le facteur le plus determinant reste le grade STCW atteint : la progression de Cadet a Capitaine multiplie generalement la remuneration par un facteur important, quel que soit le secteur."},
    {name:"Compagnie et pavillon",desc:"Deux marins au meme grade sur le meme type de navire peuvent avoir des remunerations tres differentes selon la compagnie employeuse et le pavillon d'immatriculation du navire."},
  ],
  en:[
    {name:"Risk premium",desc:"Tankers and offshore generally include a significant risk premium compared to standard cargo, proportional to how dangerous the operations are."},
    {name:"Remoteness / isolation premium",desc:"Certain routes or areas (Arctic, long voyages with no port call) give rise to additional premiums independent of vessel type."},
    {name:"Seniority and rank",desc:"The most decisive factor remains the STCW rank reached: progressing from Cadet to Master generally multiplies pay by a significant factor, regardless of sector."},
    {name:"Company and flag",desc:"Two seafarers at the same rank on the same vessel type can have very different pay depending on the employing company and the vessel's flag of registration."},
  ],
  es:[
    {name:"Prima de riesgo",desc:"Los tanqueros y el offshore generalmente incluyen una prima de riesgo significativa frente a la carga estandar, proporcional a la peligrosidad de las operaciones."},
    {name:"Prima de lejania / aislamiento",desc:"Ciertas rutas o zonas (Artico, largas travesias sin escala) generan primas adicionales independientes del tipo de buque."},
    {name:"Antiguedad y grado",desc:"El factor mas determinante sigue siendo el grado STCW alcanzado: progresar de Cadete a Capitan generalmente multiplica la remuneracion por un factor importante, sea cual sea el sector."},
    {name:"Compania y pabellon",desc:"Dos marinos con el mismo grado en el mismo tipo de buque pueden tener remuneraciones muy diferentes segun la compania empleadora y el pabellon de registro del buque."},
  ],
  pt:[
    {name:"Adicional de risco",desc:"Petroleiros e offshore geralmente incluem um adicional de risco significativo frente a carga padrao, proporcional a periculosidade das operacoes."},
    {name:"Adicional de afastamento / isolamento",desc:"Certas rotas ou areas (Artico, longas travessias sem escala) geram adicionais extras independentes do tipo de navio."},
    {name:"Antiguidade e posto",desc:"O fator mais decisivo continua sendo o posto STCW alcancado: progredir de Cadete a Comandante geralmente multiplica a remuneracao por um fator importante, seja qual for o setor."},
    {name:"Empresa e bandeira",desc:"Dois marinheiros no mesmo posto no mesmo tipo de navio podem ter remuneracoes muito diferentes conforme a empresa empregadora e a bandeira de registro do navio."},
  ],
};

const MARKET: any = {
  fr:[
    {name:"Cargo / Conteneurs",desc:"Marche generalement stable, porte par le commerce mondial de biens de consommation. Forte demande continue de personnel qualifie, bon point d'entree pour diversifier son experience."},
    {name:"Tankers",desc:"Marche cyclique, lie aux flux mondiaux d'energie et de produits raffines. Demande soutenue mais sensible aux tensions geopolitiques et aux prix du petrole."},
    {name:"Passagers / Croisiere",desc:"Marche porte par la croissance du tourisme mondial, avec une forte saisonnalite selon les regions. Sensible aux crises sanitaires et aux chocs economiques affectant le tourisme."},
    {name:"Offshore",desc:"Marche le plus volatile, directement correle aux investissements des compagnies petrolieres et gazieres. Periodes de forte demande suivies de contractions rapides selon le cycle energetique."},
  ],
  en:[
    {name:"Cargo / Container",desc:"Generally stable market, driven by global trade in consumer goods. Strong continuous demand for qualified personnel, good entry point to diversify experience."},
    {name:"Tankers",desc:"Cyclical market, tied to global energy and refined product flows. Sustained demand but sensitive to geopolitical tensions and oil prices."},
    {name:"Passenger / Cruise",desc:"Market driven by global tourism growth, with strong seasonality by region. Sensitive to health crises and economic shocks affecting tourism."},
    {name:"Offshore",desc:"The most volatile market, directly correlated to oil and gas company investments. Periods of strong demand followed by rapid contractions depending on the energy cycle."},
  ],
  es:[
    {name:"Carga / Contenedores",desc:"Mercado generalmente estable, impulsado por el comercio mundial de bienes de consumo. Fuerte demanda continua de personal calificado, buen punto de entrada para diversificar la experiencia."},
    {name:"Tanqueros",desc:"Mercado ciclico, ligado a los flujos mundiales de energia y productos refinados. Demanda sostenida pero sensible a las tensiones geopoliticas y los precios del petroleo."},
    {name:"Pasaje / Crucero",desc:"Mercado impulsado por el crecimiento del turismo mundial, con fuerte estacionalidad segun la region. Sensible a las crisis sanitarias y los shocks economicos que afectan al turismo."},
    {name:"Offshore",desc:"El mercado mas volatil, directamente correlacionado con las inversiones de las companias petroleras y gasisticas. Periodos de fuerte demanda seguidos de contracciones rapidas segun el ciclo energetico."},
  ],
  pt:[
    {name:"Carga / Conteineres",desc:"Mercado geralmente estavel, impulsionado pelo comercio mundial de bens de consumo. Forte demanda continua por pessoal qualificado, bom ponto de entrada para diversificar a experiencia."},
    {name:"Petroleiros",desc:"Mercado ciclico, ligado aos fluxos mundiais de energia e produtos refinados. Demanda sustentada mas sensivel a tensoes geopoliticas e precos do petroleo."},
    {name:"Passageiros / Cruzeiro",desc:"Mercado impulsionado pelo crescimento do turismo mundial, com forte sazonalidade conforme a regiao. Sensivel a crises sanitarias e choques economicos que afetam o turismo."},
    {name:"Offshore",desc:"O mercado mais volatil, diretamente correlacionado aos investimentos das empresas petroliferas e de gas. Periodos de forte demanda seguidos de contracoes rapidas conforme o ciclo energetico."},
  ],
};

const BANK: any = {
  fr:[
    {q:"Quel type de navire a le rythme de rotation generalement le plus court ?",opts:["Cargo","Tanker","Passagers","Offshore"],correct:3,expl:"L'offshore a des rotations courtes et intenses, generalement 3 a 4 semaines a bord."},
    {q:"Quel sous-type de tanker necessite une formation STCW V/1-2 distincte ?",opts:["Brut","Produits raffines","Chimiquier","Gazier LNG/LPG"],correct:3,expl:"Le gazier LNG/LPG exige une formation specifique STCW V/1-2 distincte."},
    {q:"Sur un yacht, quelle part du revenu total les pourboires peuvent-ils representer ?",opts:["Une part negligeable","Une part tres importante","Aucune, les pourboires sont interdits","La totalite du salaire"],correct:1,expl:"Sur un yacht, les pourboires des proprietaires/invites peuvent representer une part tres importante du revenu total."},
    {q:"Quel secteur a le marche de l'emploi le plus volatile ?",opts:["Cargo","Tankers","Passagers","Offshore"],correct:3,expl:"L'offshore est le marche le plus volatile, correle aux investissements energetiques."},
    {q:"Quelle cause principale a ete identifiee dans l'accident du Costa Concordia (2012) ?",opts:["Tempete","Changement de route non autorise par le Capitaine","Panne moteur","Collision avec un autre navire"],correct:1,expl:"Le Capitaine a effectue un changement de route non autorise qui a cause l'echouement."},
    {q:"Combien de personnes sont mortes dans le naufrage du Costa Concordia ?",opts:["12","20","32","50"],correct:2,expl:"32 personnes sont mortes dans le naufrage du Costa Concordia en 2012."},
    {q:"Quelle competence specifique aux navires a passagers est illustree par le cas Costa Concordia ?",opts:["Navigation astronomique","Gestion de l'evacuation de masse","Maintenance moteur","Communication radio"],correct:1,expl:"Le cas illustre les lacunes dans la gestion de l'evacuation de masse de civils."},
    {q:"Quel type de tanker transporte des produits a des temperatures cryogeniques ?",opts:["Brut","Produits raffines","Chimiquier","Gazier LNG/LPG"],correct:3,expl:"Le gazier LNG/LPG transporte a des temperatures cryogeniques."},
    {q:"Quelle est la taille d'equipage typique sur un navire de croisiere en comptant le personnel hotelier ?",opts:["15-20","20-25","Plusieurs centaines a plus de mille","5-10"],correct:2,expl:"Un navire de croisiere compte plusieurs centaines a plus de mille personnes avec le personnel hotelier."},
    {q:"Quel type de navire a generalement la remuneration la plus elevee du secteur maritime ?",opts:["Cargo","Tanker brut","Passagers","Offshore"],correct:3,expl:"L'offshore a generalement la remuneration la plus elevee, bien que volatile."},
    {q:"Pourquoi le tanker chimiquier necessite-t-il une formation specifique par rapport au tanker brut ?",opts:["Aucune difference requise","Les produits chimiques varient et sont souvent toxiques/corrosifs, necessitant une connaissance precise de chaque produit","Le tanker chimiquier est toujours plus grand","Le tanker chimiquier ne transporte jamais de liquides"],correct:1,expl:"La diversite et la toxicite des produits chimiques exigent une connaissance specifique de chaque cargaison."},
    {q:"Comment la remuneration est-elle generalement calculee dans le secteur de la peche ?",opts:["Salaire fixe garanti uniquement","Systeme de parts lie a la valeur de la peche realisee","Aucune remuneration, benevolat","Prime fixe independante de la peche"],correct:1,expl:"La remuneration dans la peche est souvent basee sur un systeme de parts lie a la valeur des prises."},
    {q:"Quelle est la duree de contrat typique sur un navire a passagers ?",opts:["3-4 mois","6-9 mois","3-4 semaines","12 mois"],correct:1,expl:"Les contrats sur navire a passagers durent generalement 6 a 9 mois."},
    {q:"Quel risque est specifique aux operations offshore parmi les suivants ?",opts:["Nettoyage de cuve","Operations d'appontage d'helicoptere","Gestion de foule","Rotation rapide en escale"],correct:1,expl:"Les operations d'appontage d'helicoptere sont un risque specifique a l'offshore."},
    {q:"Changer de secteur (ex: cargo vers offshore) en cours de carriere necessite generalement :",opts:["Rien de particulier","Des formations d'adaptation et une periode de familiarisation","De recommencer tout le cursus","Un nouveau grade STCW complet"],correct:1,expl:"Un changement de secteur necessite generalement des formations d'adaptation ciblees."},
  ],
  en:[
    {q:"Which vessel type generally has the shortest rotation rhythm?",opts:["Cargo","Tanker","Passenger","Offshore"],correct:3,expl:"Offshore has short, intense rotations, generally 3 to 4 weeks on board."},
    {q:"Which tanker sub-type requires distinct STCW V/1-2 training?",opts:["Crude","Refined products","Chemical","Gas carrier LNG/LPG"],correct:3,expl:"Gas carriers (LNG/LPG) require specific distinct STCW V/1-2 training."},
    {q:"On a yacht, what share of total income can tips represent?",opts:["A negligible share","A very significant share","None, tips are forbidden","The entire salary"],correct:1,expl:"On a yacht, tips from owners/guests can represent a very significant share of total income."},
    {q:"Which sector has the most volatile job market?",opts:["Cargo","Tankers","Passenger","Offshore"],correct:3,expl:"Offshore is the most volatile market, correlated to energy investments."},
    {q:"What main cause was identified in the Costa Concordia accident (2012)?",opts:["Storm","Unauthorized course change by the Master","Engine failure","Collision with another vessel"],correct:1,expl:"The Master made an unauthorized course change that caused the grounding."},
    {q:"How many people died in the Costa Concordia sinking?",opts:["12","20","32","50"],correct:2,expl:"32 people died in the Costa Concordia sinking in 2012."},
    {q:"Which passenger-vessel-specific skill is illustrated by the Costa Concordia case?",opts:["Astronomical navigation","Mass evacuation management","Engine maintenance","Radio communication"],correct:1,expl:"The case illustrates gaps in managing the mass evacuation of civilians."},
    {q:"Which tanker type carries products at cryogenic temperatures?",opts:["Crude","Refined products","Chemical","Gas carrier LNG/LPG"],correct:3,expl:"Gas carriers (LNG/LPG) carry products at cryogenic temperatures."},
    {q:"What is the typical crew size on a cruise ship including hotel staff?",opts:["15-20","20-25","Several hundred to over a thousand","5-10"],correct:2,expl:"A cruise ship has several hundred to over a thousand people including hotel staff."},
    {q:"Which vessel type generally has the highest pay in the maritime sector?",opts:["Cargo","Crude tanker","Passenger","Offshore"],correct:3,expl:"Offshore generally has the highest pay, though volatile."},
    {q:"Why does a chemical tanker require specific training compared to a crude tanker?",opts:["No difference required","Chemical products vary and are often toxic/corrosive, requiring precise knowledge of each product","Chemical tankers are always larger","Chemical tankers never carry liquids"],correct:1,expl:"The diversity and toxicity of chemical products require specific knowledge of each cargo."},
    {q:"How is pay generally calculated in the fishing sector?",opts:["Only a guaranteed fixed salary","A share system tied to the value of the catch","No pay, volunteer work","A fixed bonus independent of the catch"],correct:1,expl:"Pay in fishing is often based on a share system tied to the value of the catch."},
    {q:"What is the typical contract length on a passenger vessel?",opts:["3-4 months","6-9 months","3-4 weeks","12 months"],correct:1,expl:"Passenger vessel contracts generally last 6 to 9 months."},
    {q:"Which risk is specific to offshore operations among the following?",opts:["Tank cleaning","Helicopter landing operations","Crowd management","Fast port rotation"],correct:1,expl:"Helicopter landing operations are a risk specific to offshore."},
    {q:"Switching sector (e.g. cargo to offshore) mid-career generally requires:",opts:["Nothing special","Adaptation training and a familiarisation period","Restarting the whole curriculum","A whole new STCW rank"],correct:1,expl:"Switching sector generally requires targeted adaptation training."},
  ],
  es:[
    {q:"Que tipo de buque tiene generalmente el ritmo de rotacion mas corto?",opts:["Carga","Tanquero","Pasaje","Offshore"],correct:3,expl:"El offshore tiene rotaciones cortas e intensas, generalmente 3 a 4 semanas a bordo."},
    {q:"Que subtipo de tanquero requiere una formacion STCW V/1-2 distinta?",opts:["Crudo","Productos refinados","Quimiquero","Gasero LNG/LPG"],correct:3,expl:"El gasero LNG/LPG requiere una formacion especifica STCW V/1-2 distinta."},
    {q:"En un yate, que parte del ingreso total pueden representar las propinas?",opts:["Una parte insignificante","Una parte muy importante","Ninguna, las propinas estan prohibidas","La totalidad del salario"],correct:1,expl:"En un yate, las propinas de propietarios/invitados pueden representar una parte muy importante del ingreso total."},
    {q:"Que sector tiene el mercado laboral mas volatil?",opts:["Carga","Tanqueros","Pasaje","Offshore"],correct:3,expl:"El offshore es el mercado mas volatil, correlacionado con las inversiones energeticas."},
    {q:"Que causa principal se identifico en el accidente del Costa Concordia (2012)?",opts:["Tormenta","Cambio de rumbo no autorizado por el Capitan","Fallo de motor","Colision con otro buque"],correct:1,expl:"El Capitan realizo un cambio de rumbo no autorizado que causo el encallamiento."},
    {q:"Cuantas personas murieron en el hundimiento del Costa Concordia?",opts:["12","20","32","50"],correct:2,expl:"32 personas murieron en el hundimiento del Costa Concordia en 2012."},
    {q:"Que competencia especifica de los buques de pasaje ilustra el caso Costa Concordia?",opts:["Navegacion astronomica","Gestion de la evacuacion masiva","Mantenimiento del motor","Comunicacion por radio"],correct:1,expl:"El caso ilustra las carencias en la gestion de la evacuacion masiva de civiles."},
    {q:"Que tipo de tanquero transporta productos a temperaturas criogenicas?",opts:["Crudo","Productos refinados","Quimiquero","Gasero LNG/LPG"],correct:3,expl:"El gasero LNG/LPG transporta a temperaturas criogenicas."},
    {q:"Cual es el tamano tipico de tripulacion en un crucero incluyendo al personal hotelero?",opts:["15-20","20-25","Varios cientos a mas de mil","5-10"],correct:2,expl:"Un crucero tiene varios cientos a mas de mil personas incluyendo al personal hotelero."},
    {q:"Que tipo de buque tiene generalmente la remuneracion mas alta del sector maritimo?",opts:["Carga","Tanquero de crudo","Pasaje","Offshore"],correct:3,expl:"El offshore tiene generalmente la remuneracion mas alta, aunque volatil."},
    {q:"Por que un tanquero quimico requiere formacion especifica frente a un tanquero de crudo?",opts:["No se requiere ninguna diferencia","Los productos quimicos varian y suelen ser toxicos/corrosivos, requiriendo un conocimiento preciso de cada producto","El tanquero quimico siempre es mas grande","El tanquero quimico nunca transporta liquidos"],correct:1,expl:"La diversidad y toxicidad de los productos quimicos requiere conocimiento especifico de cada carga."},
    {q:"Como se calcula generalmente la remuneracion en el sector de la pesca?",opts:["Solo un salario fijo garantizado","Un sistema de partes ligado al valor de la captura","Ninguna remuneracion, trabajo voluntario","Una prima fija independiente de la captura"],correct:1,expl:"La remuneracion en la pesca a menudo se basa en un sistema de partes ligado al valor de la captura."},
    {q:"Cual es la duracion tipica de contrato en un buque de pasaje?",opts:["3-4 meses","6-9 meses","3-4 semanas","12 meses"],correct:1,expl:"Los contratos en buques de pasaje duran generalmente 6 a 9 meses."},
    {q:"Que riesgo es especifico de las operaciones offshore entre los siguientes?",opts:["Limpieza de tanques","Operaciones de aterrizaje de helicoptero","Gestion de multitudes","Rotacion rapida en escala"],correct:1,expl:"Las operaciones de aterrizaje de helicoptero son un riesgo especifico del offshore."},
    {q:"Cambiar de sector (ej: carga a offshore) durante la carrera generalmente requiere:",opts:["Nada en particular","Formaciones de adaptacion y un periodo de familiarizacion","Reiniciar todo el plan de estudios","Un grado STCW completamente nuevo"],correct:1,expl:"Cambiar de sector generalmente requiere formaciones de adaptacion especificas."},
  ],
  pt:[
    {q:"Qual tipo de navio tem geralmente o ritmo de rotacao mais curto?",opts:["Carga","Petroleiro","Passageiros","Offshore"],correct:3,expl:"O offshore tem rotacoes curtas e intensas, geralmente 3 a 4 semanas a bordo."},
    {q:"Qual subtipo de petroleiro exige um treinamento STCW V/1-2 distinto?",opts:["Bruto","Produtos refinados","Quimiqueiro","Gaseiro LNG/LPG"],correct:3,expl:"O gaseiro LNG/LPG exige um treinamento especifico STCW V/1-2 distinto."},
    {q:"Em um iate, que parte da renda total as gorjetas podem representar?",opts:["Uma parte insignificante","Uma parte muito importante","Nenhuma, gorjetas sao proibidas","A totalidade do salario"],correct:1,expl:"Em um iate, as gorjetas de proprietarios/convidados podem representar uma parte muito importante da renda total."},
    {q:"Qual setor tem o mercado de trabalho mais volatil?",opts:["Carga","Petroleiros","Passageiros","Offshore"],correct:3,expl:"O offshore e o mercado mais volatil, correlacionado aos investimentos energeticos."},
    {q:"Qual causa principal foi identificada no acidente do Costa Concordia (2012)?",opts:["Tempestade","Mudanca de rota nao autorizada pelo Comandante","Falha de motor","Colisao com outro navio"],correct:1,expl:"O Comandante fez uma mudanca de rota nao autorizada que causou o encalhe."},
    {q:"Quantas pessoas morreram no naufragio do Costa Concordia?",opts:["12","20","32","50"],correct:2,expl:"32 pessoas morreram no naufragio do Costa Concordia em 2012."},
    {q:"Qual competencia especifica dos navios de passageiros e ilustrada pelo caso Costa Concordia?",opts:["Navegacao astronomica","Gestao da evacuacao em massa","Manutencao do motor","Comunicacao por radio"],correct:1,expl:"O caso ilustra as lacunas na gestao da evacuacao em massa de civis."},
    {q:"Qual tipo de petroleiro transporta produtos a temperaturas criogenicas?",opts:["Bruto","Produtos refinados","Quimiqueiro","Gaseiro LNG/LPG"],correct:3,expl:"O gaseiro LNG/LPG transporta a temperaturas criogenicas."},
    {q:"Qual e o tamanho tipico de tripulacao em um cruzeiro incluindo o pessoal hoteleiro?",opts:["15-20","20-25","Varias centenas a mais de mil","5-10"],correct:2,expl:"Um cruzeiro tem varias centenas a mais de mil pessoas incluindo o pessoal hoteleiro."},
    {q:"Qual tipo de navio tem geralmente a remuneracao mais alta do setor maritimo?",opts:["Carga","Petroleiro de bruto","Passageiros","Offshore"],correct:3,expl:"O offshore tem geralmente a remuneracao mais alta, embora volatil."},
    {q:"Por que um quimiqueiro exige treinamento especifico em relacao a um petroleiro de bruto?",opts:["Nenhuma diferenca e exigida","Os produtos quimicos variam e sao muitas vezes toxicos/corrosivos, exigindo conhecimento preciso de cada produto","O quimiqueiro e sempre maior","O quimiqueiro nunca transporta liquidos"],correct:1,expl:"A diversidade e toxicidade dos produtos quimicos exige conhecimento especifico de cada carga."},
    {q:"Como a remuneracao e geralmente calculada no setor de pesca?",opts:["Apenas um salario fixo garantido","Um sistema de partes ligado ao valor da captura","Nenhuma remuneracao, trabalho voluntario","Um bonus fixo independente da captura"],correct:1,expl:"A remuneracao na pesca costuma ser baseada em um sistema de partes ligado ao valor da captura."},
    {q:"Qual e a duracao tipica de contrato em um navio de passageiros?",opts:["3-4 meses","6-9 meses","3-4 semanas","12 meses"],correct:1,expl:"Os contratos em navios de passageiros duram geralmente 6 a 9 meses."},
    {q:"Qual risco e especifico das operacoes offshore entre os seguintes?",opts:["Limpeza de tanques","Operacoes de aterrissagem de helicoptero","Gestao de multidoes","Rotacao rapida em escala"],correct:1,expl:"As operacoes de aterrissagem de helicoptero sao um risco especifico do offshore."},
    {q:"Mudar de setor (ex: carga para offshore) durante a carreira geralmente exige:",opts:["Nada em especial","Treinamentos de adaptacao e um periodo de familiarizacao","Recomecar todo o curriculo","Um posto STCW totalmente novo"],correct:1,expl:"Mudar de setor geralmente exige treinamentos de adaptacao especificos."},
  ],
};

const QUIZ: any = {
  fr:[
    {q:"Quel type de navire a le rythme de rotation le plus court en general ?",opts:["Cargo","Passagers","Offshore","Tanker"],correct:2,exp:"L'offshore a des rotations courtes et intenses, generalement 3 a 4 semaines."},
    {q:"Quel sous-type de tanker exige une formation STCW V/1-2 distincte ?",opts:["Brut","Chimiquier","Produits raffines","Gazier LNG/LPG"],correct:3,exp:"Le gazier LNG/LPG exige une formation specifique distincte."},
    {q:"Quel est le facteur le plus determinant pour la remuneration selon cette lecon ?",opts:["Le type de navire uniquement","Le grade STCW atteint","Le pays de naissance","La duree du contrat"],correct:1,exp:"Le grade STCW atteint reste le facteur le plus determinant, quel que soit le secteur."},
    {q:"Quelle lecon tire-t-on principalement du cas Costa Concordia ?",opts:["La vitesse est toujours preferable a la securite","La gestion d'une evacuation de masse est une competence specifique aux navires a passagers","Les paquebots sont plus surs que les cargos","Le Capitaine n'est jamais responsable"],correct:1,exp:"Le cas illustre que la gestion d'une evacuation de masse civile est une competence a part entiere."},
    {q:"Pourquoi le marche offshore est-il plus volatile que le cargo ?",opts:["Il y a moins de navires offshore","Il depend directement des investissements energetiques, sensibles au prix du petrole","Les offshore ne recrutent jamais","Le cargo n'a aucun cycle economique"],correct:1,exp:"Le marche offshore depend directement des investissements des compagnies petrolieres et gazieres."},
  ],
  en:[
    {q:"Which vessel type generally has the shortest rotation rhythm?",opts:["Cargo","Passenger","Offshore","Tanker"],correct:2,exp:"Offshore has short, intense rotations, generally 3 to 4 weeks."},
    {q:"Which tanker sub-type requires distinct STCW V/1-2 training?",opts:["Crude","Chemical","Refined products","Gas carrier LNG/LPG"],correct:3,exp:"Gas carriers (LNG/LPG) require specific distinct training."},
    {q:"What is the most decisive factor for pay according to this lesson?",opts:["Vessel type only","STCW rank reached","Country of birth","Contract length"],correct:1,exp:"The STCW rank reached remains the most decisive factor, regardless of sector."},
    {q:"What is the main lesson from the Costa Concordia case?",opts:["Speed is always preferable to safety","Managing a mass evacuation is a skill specific to passenger vessels","Cruise ships are safer than cargo ships","The Master is never responsible"],correct:1,exp:"The case illustrates that managing a mass civilian evacuation is a skill in its own right."},
    {q:"Why is the offshore market more volatile than cargo?",opts:["There are fewer offshore vessels","It directly depends on energy investments, sensitive to oil prices","Offshore never hires","Cargo has no economic cycle"],correct:1,exp:"The offshore market directly depends on oil and gas company investments."},
  ],
  es:[
    {q:"Que tipo de buque tiene generalmente el ritmo de rotacion mas corto?",opts:["Carga","Pasaje","Offshore","Tanquero"],correct:2,exp:"El offshore tiene rotaciones cortas e intensas, generalmente 3 a 4 semanas."},
    {q:"Que subtipo de tanquero requiere una formacion STCW V/1-2 distinta?",opts:["Crudo","Quimiquero","Productos refinados","Gasero LNG/LPG"],correct:3,exp:"El gasero LNG/LPG requiere una formacion especifica distinta."},
    {q:"Cual es el factor mas determinante para la remuneracion segun esta leccion?",opts:["Solo el tipo de buque","El grado STCW alcanzado","El pais de nacimiento","La duracion del contrato"],correct:1,exp:"El grado STCW alcanzado sigue siendo el factor mas determinante, sea cual sea el sector."},
    {q:"Cual es la principal leccion del caso Costa Concordia?",opts:["La velocidad siempre es preferible a la seguridad","Gestionar una evacuacion masiva es una competencia especifica de los buques de pasaje","Los cruceros son mas seguros que los buques de carga","El Capitan nunca es responsable"],correct:1,exp:"El caso ilustra que gestionar una evacuacion masiva civil es una competencia propia."},
    {q:"Por que el mercado offshore es mas volatil que el de carga?",opts:["Hay menos buques offshore","Depende directamente de las inversiones energeticas, sensibles al precio del petroleo","El offshore nunca contrata","La carga no tiene ningun ciclo economico"],correct:1,exp:"El mercado offshore depende directamente de las inversiones de las companias petroleras y gasisticas."},
  ],
  pt:[
    {q:"Qual tipo de navio tem geralmente o ritmo de rotacao mais curto?",opts:["Carga","Passageiros","Offshore","Petroleiro"],correct:2,exp:"O offshore tem rotacoes curtas e intensas, geralmente 3 a 4 semanas."},
    {q:"Qual subtipo de petroleiro exige um treinamento STCW V/1-2 distinto?",opts:["Bruto","Quimiqueiro","Produtos refinados","Gaseiro LNG/LPG"],correct:3,exp:"O gaseiro LNG/LPG exige um treinamento especifico distinto."},
    {q:"Qual e o fator mais decisivo para a remuneracao segundo esta licao?",opts:["Apenas o tipo de navio","O posto STCW alcancado","O pais de nascimento","A duracao do contrato"],correct:1,exp:"O posto STCW alcancado continua sendo o fator mais decisivo, seja qual for o setor."},
    {q:"Qual e a principal licao do caso Costa Concordia?",opts:["A velocidade sempre e preferivel a seguranca","Gerenciar uma evacuacao em massa e uma competencia especifica dos navios de passageiros","Os cruzeiros sao mais seguros que os navios de carga","O Comandante nunca e responsavel"],correct:1,exp:"O caso ilustra que gerenciar uma evacuacao civil em massa e uma competencia propria."},
    {q:"Por que o mercado offshore e mais volatil que o de carga?",opts:["Ha menos navios offshore","Depende diretamente dos investimentos energeticos, sensiveis ao preco do petroleo","O offshore nunca contrata","A carga nao tem nenhum ciclo economico"],correct:1,exp:"O mercado offshore depende diretamente dos investimentos das empresas petroliferas e de gas."},
  ],
};

function vesselLabelMap(t:any):any{return {cargo:t.cargoLabel,tanker:t.tankerLabel,passenger:t.passengerLabel,offshore:t.offshoreLabel,yacht:t.yachtLabel,fishing:t.fishingLabel};}

function VesselSpecifics({ lang, onBack }:{ lang:string; onBack:()=>void }) {
  const t=T[lang]||T.fr;
  const profile=loadProfile();
  const hasVessel=profile&&["cargo","tanker","passenger","offshore","yacht","fishing"].includes(profile.vessel);
  const vesselKey:any=hasVessel?profile.vessel:"cargo";
  const detail=(VESSEL_DETAIL[lang]||VESSEL_DETAIL.fr)[vesselKey];
  const label=vesselLabelMap(t)[vesselKey];

  return (
    <div style={{borderRadius:14,background:"rgba(10,22,40,0.85)",border:`1px solid ${C.primary}33`,padding:16,marginBottom:20}}>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.accent,marginBottom:4}}>{t.detailTitle}</div>
      <div style={{fontSize:13,color:"#f0f4ff",fontWeight:700,marginBottom:12,fontFamily:"Courier New"}}>{label}</div>
      {!hasVessel&&(
        <div style={{marginBottom:14,padding:12,borderRadius:10,background:`${C.danger}14`,border:`1px solid ${C.danger}44`}}>
          <div style={{fontSize:11,color:"rgba(240,244,255,0.75)",fontFamily:"Courier New",lineHeight:1.6,marginBottom:8}}>{t.noProfileMsg}</div>
          <button onClick={onBack} style={{width:"100%",padding:"9px 0",borderRadius:8,border:`1px solid ${C.primary}66`,
            background:`${C.primary}1a`,color:C.accent,fontSize:11,fontWeight:700,fontFamily:"Courier New",cursor:"pointer"}}>{t.goToL1}</button>
        </div>
      )}
      <div style={{fontSize:11,color:"rgba(240,244,255,0.55)",fontFamily:"Courier New",marginBottom:4}}>{t.risksLabel}</div>
      {detail.risks.map((r:string,i:number)=>(
        <div key={i} style={{display:"flex",gap:8,marginBottom:5,fontSize:12,color:"rgba(240,244,255,0.82)",fontFamily:"Courier New",lineHeight:1.5}}>
          <span style={{color:C.danger,flexShrink:0}}>{"\u26A0"}</span><span>{r}</span>
        </div>
      ))}
      <div style={{fontSize:11,color:"rgba(240,244,255,0.55)",fontFamily:"Courier New",marginTop:12,marginBottom:4}}>{t.opsLabel}</div>
      <div style={{fontSize:12,color:"rgba(240,244,255,0.82)",fontFamily:"Courier New",lineHeight:1.6,marginBottom:12}}>{detail.operations}</div>
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:130,padding:10,borderRadius:10,background:"rgba(13,31,60,0.7)"}}>
          <div style={{fontSize:10,color:"rgba(240,244,255,0.5)",fontFamily:"Courier New",marginBottom:3}}>{t.rotationLabel}</div>
          <div style={{fontSize:11,color:"#f0f4ff",fontFamily:"Courier New",lineHeight:1.5}}>{detail.rotation}</div>
        </div>
        <div style={{flex:1,minWidth:130,padding:10,borderRadius:10,background:"rgba(13,31,60,0.7)"}}>
          <div style={{fontSize:10,color:"rgba(240,244,255,0.5)",fontFamily:"Courier New",marginBottom:3}}>{t.crewLabel}</div>
          <div style={{fontSize:11,color:"#f0f4ff",fontFamily:"Courier New",lineHeight:1.5}}>{detail.crewSize}</div>
        </div>
      </div>
      <div style={{marginTop:10,padding:10,borderRadius:10,background:`${C.gold}14`,border:`1px solid ${C.gold}44`}}>
        <div style={{fontSize:10,color:C.gold,fontFamily:"Courier New",marginBottom:3}}>{t.payLabel}</div>
        <div style={{fontSize:11,color:"rgba(240,244,255,0.85)",fontFamily:"Courier New",lineHeight:1.5}}>{detail.payNote}</div>
      </div>
      <div style={{marginTop:10,padding:10,borderRadius:10,background:"rgba(74,222,128,0.08)",border:"1px solid rgba(74,222,128,0.3)"}}>
        <div style={{fontSize:10,color:C.safe,fontFamily:"Courier New",marginBottom:5}}>{t.whoForTitle}</div>
        {detail.whoFor.map((w:string,i:number)=>(
          <div key={i} style={{display:"flex",gap:6,marginBottom:3,fontSize:11,color:"rgba(240,244,255,0.85)",fontFamily:"Courier New",lineHeight:1.5}}>
            <span style={{color:C.safe,flexShrink:0}}>{"\u2713"}</span><span>{w}</span>
          </div>
        ))}
      </div>
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
  const hasVessel=profile&&["cargo","tanker","passenger","offshore","yacht","fishing"].includes(profile.vessel);
  const vesselKey:any=hasVessel?profile.vessel:"cargo";
  const detail=(VESSEL_DETAIL[lang]||VESSEL_DETAIL.fr)[vesselKey];
  const cargoDetail=(VESSEL_DETAIL[lang]||VESSEL_DETAIL.fr).cargo;
  const label=vesselLabelMap(t)[vesselKey];

  const ex=[
    {q:t.exq1.replace("{vessel}",label),
     a:detail.risks.join(" ")},
    {q:t.exq2.replace("{vessel}",label),
     a:`${detail.rotation} ${t.exq2connect} ${cargoDetail.rotation}`},
    {q:t.ex3q, a:t.ex3a},
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

function ContentPhase({ lang, onStartQuiz, onBack }:{ lang:string; onStartQuiz:()=>void; onBack:()=>void }) {
  const t=T[lang]||T.fr;
  const subtanker=SUBTANKER[lang]||SUBTANKER.fr;
  const payfactors=PAYFACTORS[lang]||PAYFACTORS.fr;
  const market=MARKET[lang]||MARKET.fr;
  const vesselCompare=(()=>{
    const d=VESSEL_DETAIL[lang]||VESSEL_DETAIL.fr;
    const map=vesselLabelMap(t);
    return (["cargo","tanker","passenger","offshore","yacht","fishing"] as const).map(k=>({
      name:map[k],
      desc:`${t.rotationLabel}: ${d[k].rotation} ${t.crewLabel}: ${d[k].crewSize} ${t.whoForTitle} ${d[k].whoFor.join(" / ")}`,
    }));
  })();
  return (
    <div style={{padding:"14px 14px 24px"}}>
      <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New",marginBottom:10}}>{t.intro}</div>
      <div style={{fontSize:10,color:"rgba(240,244,255,0.4)",fontStyle:"italic",fontFamily:"Courier New",marginBottom:18,lineHeight:1.5}}>{t.disclaimer}</div>

      <VesselSpecifics lang={lang} onBack={onBack}/>

      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.accent,margin:"20px 0 10px"}}>{t.s1title}</div>
      <TapGrid items={vesselCompare} hint={t.s1hint}/>

      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.accent,margin:"20px 0 10px"}}>{t.s2title}</div>
      <TapGrid items={subtanker} hint={t.s2hint}/>

      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.accent,margin:"20px 0 10px"}}>{t.s3title}</div>
      <TapGrid items={payfactors} hint={t.s3hint}/>

      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.accent,margin:"20px 0 10px"}}>{t.s4title}</div>
      <TapGrid items={market} hint={t.s4hint}/>

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

export default function LessonShipCareer_L4({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t=T[lang]||T.fr;
  const [phase,setPhase]=useState<"content"|"quiz">("content");
  const [quizDone,setQuizDone]=useState(false);
  const progress=phase==="content"?50:quizDone?100:85;
  const backLabel=lang==="fr"?"◀ Retour":lang==="en"?"◀ Back":lang==="es"?"◀ Volver":"◀ Voltar";
  const moduleFull=lang==="fr"?"Module Carrière — Ship Career Navigator":lang==="en"?"Career Module — Ship Career Navigator":lang==="es"?"Módulo Carrera — Ship Career Navigator":"Módulo Carreira — Ship Career Navigator";
  const lessonOf=lang==="fr"?"Leçon 4/5":lang==="en"?"Lesson 4/5":lang==="es"?"Lección 4/5":"Lição 4/5";
  const badgeText=lang==="fr"?`🚢 ${moduleFull} · Leçon 4/5 · ⭐ Premium+ · 250 XP`:lang==="en"?`🚢 ${moduleFull} · Lesson 4/5 · ⭐ Premium+ · 250 XP`:lang==="es"?`🚢 ${moduleFull} · Lección 4/5 · ⭐ Premium+ · 250 XP`:`🚢 ${moduleFull} · Lição 4/5 · ⭐ Premium+ · 250 XP`;
  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(180deg,${C.navy},${C.navy2})`,color:"#f0f4ff"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.primary}33`}}>
        <div style={{minHeight:54,display:"flex",alignItems:"center",padding:"8px 16px",gap:12}}>
          <button onClick={phase==="content"?onBack:()=>setPhase("content")} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>{backLabel}</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:10,color:C.accent,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🚢 {moduleFull}</div>
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
