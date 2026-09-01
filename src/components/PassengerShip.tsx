// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "passenger_ship"
// Standalone documentary component: no Dashboard/progression/billing dependency.
import { C, Card, SL, GLine } from "./LessonShared";
import { PassengerShipSVG } from "./ShipIllustrations";

const SECTION_LABELS = {
  fr: { profile:"Fiche navire", mission:"Mission", characteristics:"Caractéristiques générales", departments:"Départements à bord", positions:"Postes typiques", operations:"Opérations typiques", risks:"Risques principaux", careers:"Débouchés professionnels", facts:"Anecdotes" },
  en: { profile:"Ship Profile", mission:"Mission", characteristics:"General Characteristics", departments:"Onboard Departments", positions:"Typical Positions", operations:"Typical Operations", risks:"Main Risks", careers:"Career Opportunities", facts:"Interesting Facts" },
  es: { profile:"Ficha del buque", mission:"Misión", characteristics:"Características generales", departments:"Departamentos a bordo", positions:"Puestos típicos", operations:"Operaciones típicas", risks:"Riesgos principales", careers:"Oportunidades profesionales", facts:"Datos curiosos" },
  pt: { profile:"Ficha do navio", mission:"Missão", characteristics:"Características gerais", departments:"Departamentos a bordo", positions:"Cargos típicos", operations:"Operações típicas", risks:"Riscos principais", careers:"Oportunidades profissionais", facts:"Curiosidades" },
};

const getContent = lang => {
  const d = {
    fr:{
      title:"Navire à passagers",
      p0:"Le Passenger Ship est un navire conçu principalement pour le transport de passagers en ligne régulière, sans embarquement de véhicules roulants et sans vocation de croisière touristique. Il assure des liaisons entre ports, souvent sur des distances plus longues qu'un ferry Ro-Ro, avec un accent mis sur le confort et la sécurité du grand nombre de passagers transportés plutôt que sur la rapidité des rotations.",
      p1:"Transporter des passagers entre des ports fixes selon des lignes régulières, parfois sur des trajets internationaux ou insulaires de plusieurs heures à plusieurs jours. Contrairement au Cruise Ship, la destination prime sur l'expérience de voyage : le navire est un moyen de transport, pas une attraction touristique en soi.",
      p2:"Coque optimisée pour le confort passagers et la stabilité, ponts dédiés aux cabines, salons et espaces communs, capacité variable de quelques centaines à plusieurs milliers de passagers selon la ligne desservie. Équipements de sécurité SOLAS complets (embarcations de sauvetage, systèmes d'alarme, signalisation d'évacuation), absence de pont garage ou de rampes roulières contrairement au ferry Ro-Ro.",
      p3:"Deck (navigation, manœuvres portuaires, sécurité), Engine (propulsion, systèmes auxiliaires), Hôtellerie/Passenger Services (accueil, restauration, confort à bord), Safety/HSE dédié en raison du grand nombre de passagers à bord.",
      p4:"Master, Chief Officer, Chief Engineer, Officier de sécurité passagers, Purser, personnel d'accueil et de restauration, matelots pont, personnel HSE.",
      p5:"Manœuvres portuaires régulières, embarquement et débarquement organisé des passagers, exercices de sécurité passagers réguliers (SOLAS), surveillance continue du confort et de la sécurité à bord, gestion des espaces communs et de la restauration durant la traversée.",
      p6:"Gestion de l'évacuation d'un grand nombre de passagers en cas d'urgence, risque d'incendie dans les espaces communs ou les cabines, risques sanitaires liés à la promiscuité (épidémies à bord), exposition aux conditions météo-océaniques sur les traversées longues.",
      p7:"Secteur du transport maritime de passagers, rotations variables selon la ligne desservie, forte demande de personnel certifié sécurité passagers (Crowd Management, Crisis Management), passerelle vers d'autres navires à passagers (Ferry Ro-Ro, Cruise Ship) ou vers des postes de supervision Hôtellerie/Sécurité en compagnie maritime.",
      p8:"Certains Passenger Ship assurent des liaisons essentielles vers des îles ou régions isolées où ils constituent le seul moyen de transport régulier de la population, un rôle bien différent de celui, purement touristique, du Cruise Ship.",
    },
    en:{
      title:"Passenger Ship",
      p0:"The Passenger Ship is a vessel designed primarily for the regular-line transport of passengers, without carrying rolling vehicles and without a tourist cruise purpose. It operates connections between ports, often over longer distances than a Ro-Ro ferry, with an emphasis on the comfort and safety of the large numbers of passengers carried rather than on rotation speed.",
      p1:"Transport passengers between fixed ports on regular lines, sometimes on international or island routes lasting several hours to several days. Unlike the Cruise Ship, the destination takes priority over the travel experience: the vessel is a means of transport, not a tourist attraction in itself.",
      p2:"Hull optimized for passenger comfort and stability, decks dedicated to cabins, lounges and common areas, variable capacity from a few hundred to several thousand passengers depending on the route served. Full SOLAS safety equipment (lifeboats, alarm systems, evacuation signage), no vehicle deck or roll-on ramps unlike the Ro-Ro ferry.",
      p3:"Deck (navigation, port maneuvering, safety), Engine (propulsion, auxiliary systems), Hospitality/Passenger Services (reception, catering, onboard comfort), dedicated Safety/HSE due to the large number of passengers on board.",
      p4:"Master, Chief Officer, Chief Engineer, Passenger Safety Officer, Purser, reception and catering staff, deck ratings, HSE personnel.",
      p5:"Regular port maneuvering, organized embarkation and disembarkation of passengers, regular passenger safety drills (SOLAS), continuous monitoring of onboard comfort and safety, management of common areas and catering during the crossing.",
      p6:"Managing the evacuation of large numbers of passengers in an emergency, fire risk in common areas or cabins, health risks linked to close quarters (onboard outbreaks), exposure to metocean conditions on long crossings.",
      p7:"Passenger shipping sector, variable rotations depending on the route served, strong demand for certified passenger safety personnel (Crowd Management, Crisis Management), pathway to other passenger vessels (Ro-Ro Ferry, Cruise Ship) or to Hospitality/Safety supervisory roles within shipping companies.",
      p8:"Some Passenger Ships operate essential connections to islands or remote regions where they serve as the only regular means of transport for the population, a role quite different from the purely touristic purpose of the Cruise Ship.",
    },
    es:{
      title:"Buque de Pasajeros",
      p0:"El Passenger Ship es un buque diseñado principalmente para el transporte de pasajeros en línea regular, sin embarque de vehículos rodantes y sin vocación de crucero turístico. Asegura conexiones entre puertos, a menudo en distancias más largas que un ferry Ro-Ro, con énfasis en la comodidad y la seguridad del gran número de pasajeros transportados más que en la rapidez de las rotaciones.",
      p1:"Transportar pasajeros entre puertos fijos según líneas regulares, a veces en trayectos internacionales o insulares de varias horas a varios días. A diferencia del Cruise Ship, el destino prevalece sobre la experiencia del viaje: el buque es un medio de transporte, no una atracción turística en sí misma.",
      p2:"Casco optimizado para la comodidad de los pasajeros y la estabilidad, cubiertas dedicadas a camarotes, salones y espacios comunes, capacidad variable de unos cientos a varios miles de pasajeros según la línea. Equipamiento de seguridad SOLAS completo (botes salvavidas, sistemas de alarma, señalización de evacuación), sin cubierta garaje ni rampas rodantes a diferencia del ferry Ro-Ro.",
      p3:"Deck (navegación, maniobras portuarias, seguridad), Engine (propulsión, sistemas auxiliares), Hostelería/Passenger Services (recepción, restauración, comodidad a bordo), Safety/HSE dedicado debido al gran número de pasajeros a bordo.",
      p4:"Master, Chief Officer, Chief Engineer, Oficial de Seguridad de Pasajeros, Purser, personal de recepción y restauración, marineros de cubierta, personal de HSE.",
      p5:"Maniobras portuarias regulares, embarque y desembarque organizado de los pasajeros, simulacros regulares de seguridad de pasajeros (SOLAS), supervisión continua de la comodidad y la seguridad a bordo, gestión de los espacios comunes y la restauración durante la travesía.",
      p6:"Gestión de la evacuación de un gran número de pasajeros en caso de emergencia, riesgo de incendio en espacios comunes o camarotes, riesgos sanitarios ligados a la proximidad (brotes a bordo), exposición a condiciones meteo-oceánicas en travesías largas.",
      p7:"Sector del transporte marítimo de pasajeros, rotaciones variables según la línea, fuerte demanda de personal certificado en seguridad de pasajeros (Crowd Management, Crisis Management), vía de acceso hacia otros buques de pasajeros (Ferry Ro-Ro, Cruise Ship) o hacia puestos de supervisión de Hostelería/Seguridad en compañías marítimas.",
      p8:"Algunos Passenger Ship aseguran conexiones esenciales hacia islas o regiones aisladas donde constituyen el único medio de transporte regular de la población, un papel bien distinto del puramente turístico del Cruise Ship.",
    },
    pt:{
      title:"Navio de Passageiros",
      p0:"O Passenger Ship é um navio concebido principalmente para o transporte de passageiros em linha regular, sem embarque de veículos rolantes e sem vocação de cruzeiro turístico. Assegura ligações entre portos, frequentemente em distâncias mais longas do que um ferry Ro-Ro, com ênfase no conforto e na segurança do grande número de passageiros transportados, mais do que na rapidez das rotações.",
      p1:"Transportar passageiros entre portos fixos segundo linhas regulares, por vezes em trajetos internacionais ou insulares de várias horas a vários dias. Ao contrário do Cruise Ship, o destino prevalece sobre a experiência da viagem: o navio é um meio de transporte, não uma atração turística em si.",
      p2:"Casco otimizado para o conforto dos passageiros e a estabilidade, conveses dedicados a camarotes, salões e espaços comuns, capacidade variável de algumas centenas a vários milhares de passageiros consoante a linha. Equipamento de segurança SOLAS completo (botes salva-vidas, sistemas de alarme, sinalização de evacuação), sem convés garagem nem rampas rolantes ao contrário do ferry Ro-Ro.",
      p3:"Deck (navegação, manobras portuárias, segurança), Engine (propulsão, sistemas auxiliares), Hotelaria/Passenger Services (receção, restauração, conforto a bordo), Safety/HSE dedicado devido ao grande número de passageiros a bordo.",
      p4:"Master, Chief Officer, Chief Engineer, Oficial de Segurança de Passageiros, Purser, pessoal de receção e restauração, marinheiros de convés, pessoal de HSE.",
      p5:"Manobras portuárias regulares, embarque e desembarque organizado dos passageiros, exercícios regulares de segurança de passageiros (SOLAS), monitorização contínua do conforto e da segurança a bordo, gestão dos espaços comuns e da restauração durante a travessia.",
      p6:"Gestão da evacuação de um grande número de passageiros em caso de emergência, risco de incêndio em espaços comuns ou camarotes, riscos sanitários associados à proximidade (surtos a bordo), exposição a condições meteo-oceânicas em travessias longas.",
      p7:"Setor do transporte marítimo de passageiros, rotações variáveis consoante a linha, forte procura de pessoal certificado em segurança de passageiros (Crowd Management, Crisis Management), via de acesso para outros navios de passageiros (Ferry Ro-Ro, Cruise Ship) ou para cargos de supervisão de Hotelaria/Segurança em companhias marítimas.",
      p8:"Alguns Passenger Ship asseguram ligações essenciais para ilhas ou regiões isoladas onde constituem o único meio de transporte regular da população, um papel bem diferente do puramente turístico do Cruise Ship.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function PassengerShip({ lang="fr" }) {
  const lc = getContent(lang);
  const L = SECTION_LABELS[lang]||SECTION_LABELS.fr;

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",position:"relative"}}>
      <div style={{padding:"28px 16px 40px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(26,111,212,0.15)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.blue2,fontWeight:700}}>🚢 Ships Library</div>
          <div style={{marginBottom:14,borderRadius:16,overflow:"hidden",border:`1px solid ${C.border}`}}><PassengerShipSVG/></div>
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
