// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "roro_passenger"
// Standalone documentary component: no Dashboard/progression/billing dependency.
import { C, Card, SL, GLine } from "./LessonShared";
import { RoroPassengerSVG } from "./ShipIllustrations";

const SECTION_LABELS = {
  fr: { profile:"Fiche navire", mission:"Mission", characteristics:"Caractéristiques générales", departments:"Départements à bord", positions:"Postes typiques", operations:"Opérations typiques", risks:"Risques principaux", careers:"Débouchés professionnels", facts:"Anecdotes" },
  en: { profile:"Ship Profile", mission:"Mission", characteristics:"General Characteristics", departments:"Onboard Departments", positions:"Typical Positions", operations:"Typical Operations", risks:"Main Risks", careers:"Career Opportunities", facts:"Interesting Facts" },
  es: { profile:"Ficha del buque", mission:"Misión", characteristics:"Características generales", departments:"Departamentos a bordo", positions:"Puestos típicos", operations:"Operaciones típicas", risks:"Riesgos principales", careers:"Oportunidades profesionales", facts:"Datos curiosos" },
  pt: { profile:"Ficha do navio", mission:"Missão", characteristics:"Características gerais", departments:"Departamentos a bordo", positions:"Cargos típicos", operations:"Operações típicas", risks:"Riscos principais", careers:"Oportunidades profissionais", facts:"Curiosidades" },
};

const getContent = lang => {
  const d = {
    fr:{
      title:"Ferry Ro-Ro Passagers",
      p0:"Le RoRo Passenger Ferry est un navire combinant le transport de passagers et le transport de véhicules roulants (voitures, camions, remorques) qui embarquent et débarquent par leurs propres moyens via des rampes (roll-on/roll-off). Il assure généralement des liaisons régulières et fréquentes sur des lignes courtes à moyennes, souvent internationales.",
      p1:"Transporter passagers et véhicules sur des liaisons régulières entre deux ou plusieurs ports, avec des rotations fréquentes et des temps d'escale courts, tout en assurant une séparation stricte entre les flux passagers et les opérations véhicules. Le navire combine les exigences de sécurité passagers (SOLAS) et de gestion du fret roulant, avec un accent particulier sur la rapidité des opérations de chargement/déchargement.",
      p2:"Ponts garages multiples pour véhicules, accessibles par rampes avant et/ou arrière, parfois latérales. Ponts supérieurs dédiés aux passagers (cabines, espaces communs, restauration, ponts extérieurs). Systèmes de surveillance incendie, ventilation et contrôle d'accès des ponts garages. Portes étanches et système de stabilité renforcé en raison du risque spécifique lié à l'eau libre sur les ponts garages en cas d'avarie. Vitesse souvent plus élevée que les navires de charge classiques pour respecter les horaires de rotation.",
      p3:"Deck (navigation, manœuvres portuaires, opérations de rampes), Engine (propulsion, stabilisation, systèmes auxiliaires), Hôtellerie/Passenger Services (accueil, restauration, sécurité passagers), Safety/HSE renforcé en raison de la présence de passagers et de la vulnérabilité structurelle des ponts garages.",
      p4:"Master, Chief Officer, Chief Engineer, Officier de sécurité passagers, Purser, Bosun, personnel d'accueil et de restauration, matelots pont garage, personnel HSE.",
      p5:"Manœuvres portuaires fréquentes et rapides, opérations de chargement/déchargement des véhicules via les rampes, contrôle de l'arrimage des poids lourds et remorques avant le départ, contrôle de la stabilité et de l'assiette selon la répartition de la charge roulante, exercices de sécurité passagers réguliers (SOLAS), surveillance continue des ponts garages (détection incendie, étanchéité des portes).",
      p6:"Risque de perte de stabilité en cas d'entrée d'eau sur le pont garage (risque historique majeur de cette catégorie de navire), risque d'incendie sur les ponts garages (véhicules, carburant), risques liés aux marchandises dangereuses transportées sur véhicules conformément au Code IMDG, gestion de l'évacuation d'un grand nombre de passagers en cas d'urgence, risques liés à la fréquence élevée des manœuvres portuaires.",
      p7:"Secteur du transport maritime de passagers à fort volume, rotations souvent plus courtes que sur les navires de charge longue distance, forte demande de personnel certifié sécurité passagers (Crowd Management, Crisis Management), passerelle vers d'autres navires à passagers (Cruise Ship) ou vers des postes de supervision Hôtellerie/Sécurité en compagnie de ferries.",
      p8:"La stabilité des ferries Ro-Ro fait l'objet d'une réglementation internationale spécifique (résolution SOLAS post-accidents historiques impliquant l'entrée d'eau sur les ponts garages), ayant conduit à des renforcements structurels significatifs sur les flottes modernes. Certains RoRo Passenger effectuent plusieurs dizaines de rotations par semaine sur des lignes courtes, un rythme opérationnel parmi les plus intenses du transport maritime.",
    },
    en:{
      title:"Ro-Ro Passenger Ferry",
      p0:"The RoRo Passenger Ferry is a vessel combining passenger transport with the transport of rolling vehicles (cars, trucks, trailers) that embark and disembark under their own power via ramps (roll-on/roll-off). It typically operates regular, frequent connections on short to medium routes, often international.",
      p1:"Transport passengers and vehicles on regular connections between two or more ports, with frequent rotations and short port calls, while maintaining a strict separation between passenger flows and vehicle operations. The vessel combines passenger safety requirements (SOLAS) with rolling cargo management, with particular emphasis on the speed of loading/unloading operations.",
      p2:"Multiple vehicle decks, accessible via bow and/or stern ramps, sometimes side ramps. Upper decks dedicated to passengers (cabins, common areas, catering, open decks). Fire monitoring, ventilation, and access control systems on the vehicle decks. Watertight doors and enhanced stability systems due to the specific risk of free water on the vehicle decks in case of damage. Speed often higher than conventional cargo vessels to meet rotation schedules.",
      p3:"Deck (navigation, port maneuvering, ramp operations), Engine (propulsion, stabilization, auxiliary systems), Hospitality/Passenger Services (reception, catering, passenger safety), enhanced Safety/HSE due to the presence of passengers and the structural vulnerability of the vehicle decks.",
      p4:"Master, Chief Officer, Chief Engineer, Passenger Safety Officer, Purser, Bosun, reception and catering staff, vehicle deck crew, HSE personnel.",
      p5:"Frequent and rapid port maneuvering, loading/unloading operations of vehicles via ramps, lashing checks of heavy trucks and trailers before departure, stability and trim control based on rolling cargo distribution, regular passenger safety drills (SOLAS), continuous monitoring of vehicle decks (fire detection, door watertightness).",
      p6:"Risk of loss of stability in case of water ingress on the vehicle deck (a major historical risk for this vessel category), fire risk on vehicle decks (vehicles, fuel), risks linked to dangerous goods carried on vehicles under the IMDG Code, managing the evacuation of large numbers of passengers in an emergency, risks linked to the high frequency of port maneuvers.",
      p7:"High-volume passenger shipping sector, often shorter rotations than long-distance cargo vessels, strong demand for certified passenger safety personnel (Crowd Management, Crisis Management), pathway to other passenger vessels (Cruise Ship) or to Hospitality/Safety supervisory roles within ferry companies.",
      p8:"The stability of Ro-Ro ferries is subject to specific international regulation (SOLAS resolutions following historical accidents involving water ingress on vehicle decks), leading to significant structural reinforcements on modern fleets. Some RoRo Passenger ferries perform dozens of rotations per week on short routes, one of the most intense operational rhythms in maritime transport.",
    },
    es:{
      title:"Ferry Ro-Ro de Pasajeros",
      p0:"El RoRo Passenger Ferry es un buque que combina el transporte de pasajeros con el transporte de vehículos rodantes (automóviles, camiones, remolques) que embarcan y desembarcan por sus propios medios a través de rampas (roll-on/roll-off). Suele operar conexiones regulares y frecuentes en rutas cortas a medias, a menudo internacionales.",
      p1:"Transportar pasajeros y vehículos en conexiones regulares entre dos o más puertos, con rotaciones frecuentes y tiempos de escala cortos, garantizando al mismo tiempo una separación estricta entre los flujos de pasajeros y las operaciones de vehículos. El buque combina los requisitos de seguridad de pasajeros (SOLAS) con la gestión de la carga rodante, con especial énfasis en la rapidez de las operaciones de carga/descarga.",
      p2:"Múltiples cubiertas garaje para vehículos, accesibles mediante rampas de proa y/o popa, a veces laterales. Cubiertas superiores dedicadas a los pasajeros (camarotes, espacios comunes, restauración, cubiertas exteriores). Sistemas de vigilancia contra incendios, ventilación y control de acceso en las cubiertas garaje. Puertas estancas y sistema de estabilidad reforzado debido al riesgo específico de agua libre en las cubiertas garaje en caso de avería. Velocidad a menudo más alta que la de los buques de carga convencionales para cumplir con los horarios de rotación.",
      p3:"Deck (navegación, maniobras portuarias, operaciones de rampas), Engine (propulsión, estabilización, sistemas auxiliares), Hostelería/Passenger Services (recepción, restauración, seguridad de pasajeros), Safety/HSE reforzado debido a la presencia de pasajeros y a la vulnerabilidad estructural de las cubiertas garaje.",
      p4:"Master, Chief Officer, Chief Engineer, Oficial de Seguridad de Pasajeros, Purser, Bosun, personal de recepción y restauración, marineros de cubierta garaje, personal de HSE.",
      p5:"Maniobras portuarias frecuentes y rápidas, operaciones de carga/descarga de vehículos a través de rampas, control del estibado de camiones pesados y remolques antes de la salida, control de estabilidad y asiento según la distribución de la carga rodante, simulacros regulares de seguridad de pasajeros (SOLAS), supervisión continua de las cubiertas garaje (detección de incendios, estanqueidad de las puertas).",
      p6:"Riesgo de pérdida de estabilidad en caso de entrada de agua en la cubierta garaje (riesgo histórico importante de esta categoría de buque), riesgo de incendio en las cubiertas garaje (vehículos, combustible), riesgos relacionados con mercancías peligrosas transportadas en vehículos conforme al Código IMDG, gestión de la evacuación de un gran número de pasajeros en caso de emergencia, riesgos relacionados con la alta frecuencia de las maniobras portuarias.",
      p7:"Sector del transporte marítimo de pasajeros de alto volumen, rotaciones a menudo más cortas que en los buques de carga de larga distancia, fuerte demanda de personal certificado en seguridad de pasajeros (Crowd Management, Crisis Management), vía de acceso hacia otros buques de pasajeros (Cruise Ship) o hacia puestos de supervisión de Hostelería/Seguridad en compañías de ferries.",
      p8:"La estabilidad de los ferries Ro-Ro está sujeta a una regulación internacional específica (resoluciones SOLAS derivadas de accidentes históricos relacionados con la entrada de agua en las cubiertas garaje), lo que ha llevado a refuerzos estructurales significativos en las flotas modernas. Algunos RoRo Passenger realizan decenas de rotaciones por semana en rutas cortas, uno de los ritmos operativos más intensos del transporte marítimo.",
    },
    pt:{
      title:"Ferry Ro-Ro de Passageiros",
      p0:"O RoRo Passenger Ferry é um navio que combina o transporte de passageiros com o transporte de veículos rolantes (automóveis, camiões, reboques) que embarcam e desembarcam pelos seus próprios meios através de rampas (roll-on/roll-off). Assegura geralmente ligações regulares e frequentes em rotas curtas a médias, frequentemente internacionais.",
      p1:"Transportar passageiros e veículos em ligações regulares entre dois ou mais portos, com rotações frequentes e tempos de escala curtos, assegurando ao mesmo tempo uma separação estrita entre os fluxos de passageiros e as operações de veículos. O navio combina os requisitos de segurança de passageiros (SOLAS) com a gestão da carga rolante, com especial ênfase na rapidez das operações de carga/descarga.",
      p2:"Vários conveses garagem para veículos, acessíveis através de rampas de proa e/ou popa, por vezes laterais. Conveses superiores dedicados aos passageiros (camarotes, espaços comuns, restauração, conveses exteriores). Sistemas de vigilância contra incêndios, ventilação e controlo de acesso nos conveses garagem. Portas estanques e sistema de estabilidade reforçado devido ao risco específico de água livre nos conveses garagem em caso de avaria. Velocidade frequentemente superior à dos navios de carga convencionais para cumprir os horários de rotação.",
      p3:"Deck (navegação, manobras portuárias, operações de rampas), Engine (propulsão, estabilização, sistemas auxiliares), Hotelaria/Passenger Services (receção, restauração, segurança de passageiros), Safety/HSE reforçado devido à presença de passageiros e à vulnerabilidade estrutural dos conveses garagem.",
      p4:"Master, Chief Officer, Chief Engineer, Oficial de Segurança de Passageiros, Purser, Bosun, pessoal de receção e restauração, marinheiros do convés garagem, pessoal de HSE.",
      p5:"Manobras portuárias frequentes e rápidas, operações de carga/descarga de veículos através de rampas, controlo da estivagem de camiões pesados e reboques antes da partida, controlo da estabilidade e do caimento consoante a distribuição da carga rolante, exercícios regulares de segurança de passageiros (SOLAS), monitorização contínua dos conveses garagem (deteção de incêndio, estanquidade das portas).",
      p6:"Risco de perda de estabilidade em caso de entrada de água no convés garagem (risco histórico importante desta categoria de navio), risco de incêndio nos conveses garagem (veículos, combustível), riscos associados a mercadorias perigosas transportadas em veículos de acordo com o Código IMDG, gestão da evacuação de um grande número de passageiros em caso de emergência, riscos associados à elevada frequência das manobras portuárias.",
      p7:"Setor do transporte marítimo de passageiros de grande volume, rotações frequentemente mais curtas do que nos navios de carga de longa distância, forte procura de pessoal certificado em segurança de passageiros (Crowd Management, Crisis Management), via de acesso para outros navios de passageiros (Cruise Ship) ou para cargos de supervisão de Hotelaria/Segurança em companhias de ferries.",
      p8:"A estabilidade dos ferries Ro-Ro está sujeita a uma regulamentação internacional específica (resoluções SOLAS na sequência de acidentes históricos envolvendo entrada de água nos conveses garagem), o que levou a reforços estruturais significativos nas frotas modernas. Alguns RoRo Passenger realizam dezenas de rotações por semana em rotas curtas, um dos ritmos operacionais mais intensos do transporte marítimo.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function RoroPassenger({ lang="fr" }) {
  const lc = getContent(lang);
  const L = SECTION_LABELS[lang]||SECTION_LABELS.fr;

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",position:"relative"}}>
      <div style={{padding:"28px 16px 40px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(26,111,212,0.15)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.blue2,fontWeight:700}}>🚢 Ships Library</div>
          <div style={{marginBottom:14,borderRadius:16,overflow:"hidden",border:`1px solid ${C.border}`}}><RoroPassengerSVG/></div>
          <h1 style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>

          <SL icon="📋" text={L.profile}/>
          <Card style={{marginBottom:14,borderLeft:`3px solid ${C.gold}`}}>
            <div style={{fontSize:13,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.p0}</div>
          </Card>

          <SL icon="🎯" text={L.mission} color={C.blue2}/>
          <Card style={{marginBottom:14}}>
            <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.p1}</div>
          </Card>

          <SL icon="📐" text={L.characteristics} color={C.teal}/>
          <Card style={{marginBottom:14}}>
            <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.p2}</div>
          </Card>

          <SL icon="🧭" text={L.departments} color={C.orange}/>
          <Card style={{marginBottom:14}}>
            <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.p3}</div>
          </Card>

          <SL icon="👤" text={L.positions} color={C.gold}/>
          <Card style={{marginBottom:14}}>
            <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.p4}</div>
          </Card>

          <SL icon="⚙️" text={L.operations} color={C.blue2}/>
          <Card style={{marginBottom:14}}>
            <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.p5}</div>
          </Card>

          <SL icon="⚠️" text={L.risks} color={C.red}/>
          <Card style={{marginBottom:14,border:`1px solid ${C.red}33`}}>
            <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.p6}</div>
          </Card>

          <SL icon="💼" text={L.careers} color={C.green}/>
          <Card style={{marginBottom:14}}>
            <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.p7}</div>
          </Card>

          <GLine/>

          <SL icon="💡" text={L.facts} color={C.gold}/>
          <Card style={{marginBottom:4,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}>
            <div style={{fontSize:13,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line",fontStyle:"italic"}}>{lc.p8}</div>
          </Card>

        </div>
      </div>
    </div>
  );
}
