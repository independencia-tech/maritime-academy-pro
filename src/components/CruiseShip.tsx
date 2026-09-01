// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "cruise_ship"
// Standalone documentary component: no Dashboard/progression/billing dependency.
import { C, Card, SL, GLine } from "./LessonShared";
import { CruiseShipSVG } from "./ShipIllustrations";

const SECTION_LABELS = {
  fr: { profile:"Fiche navire", mission:"Mission", characteristics:"Caractéristiques générales", departments:"Départements à bord", positions:"Postes typiques", operations:"Opérations typiques", risks:"Risques principaux", careers:"Débouchés professionnels", facts:"Anecdotes" },
  en: { profile:"Ship Profile", mission:"Mission", characteristics:"General Characteristics", departments:"Onboard Departments", positions:"Typical Positions", operations:"Typical Operations", risks:"Main Risks", careers:"Career Opportunities", facts:"Interesting Facts" },
  es: { profile:"Ficha del buque", mission:"Misión", characteristics:"Características generales", departments:"Departamentos a bordo", positions:"Puestos típicos", operations:"Operaciones típicas", risks:"Riesgos principales", careers:"Oportunidades profesionales", facts:"Datos curiosos" },
  pt: { profile:"Ficha do navio", mission:"Missão", characteristics:"Características gerais", departments:"Departamentos a bordo", positions:"Cargos típicos", operations:"Operações típicas", risks:"Riscos principais", careers:"Oportunidades profissionais", facts:"Curiosidades" },
};

const getContent = lang => {
  const d = {
    fr:{
      title:"Navire de croisière",
      p0:"Le navire de croisière transporte des passagers pour des voyages de loisir, combinant navigation et hébergement hôtelier de haut niveau. C'est le type de navire le plus complexe à exploiter en raison de la coexistence entre équipage marin et personnel hôtelier.",
      p1:"Offrir aux passagers une expérience de voyage et de loisir complète, en assurant simultanément la sécurité de la navigation et un service hôtelier de qualité, sur des itinéraires touristiques variés.",
      p2:"Longueur : de 200 m à plus de 360 m pour les plus grands navires. Capacité : de quelques centaines à plus de 6 000 passagers, avec un équipage pouvant dépasser 2 000 personnes. Nombreux ponts (jusqu'à 20), infrastructures de loisirs étendues (piscines, théâtres, restaurants).",
      p3:"Deck Department (navigation, sécurité, opérations de pont), Engine Department (propulsion, systèmes auxiliaires, production d'eau douce et d'électricité à grande échelle), et un département hôtelier distinct (Hotel Department) gérant l'hébergement, la restauration et les loisirs des passagers.",
      p4:"Master, Staff Captain, Chief Officer, Officer of the Watch, Chief Engineer, mais aussi Hotel Director, Cruise Director, et un vaste personnel hôtelier ne relevant pas de la hiérarchie maritime traditionnelle.",
      p5:"Navigation dans des zones souvent côtières et fréquentées, gestion de l'embarquement/débarquement de milliers de passagers, exercices d'évacuation obligatoires, coordination étroite entre équipe de passerelle et personnel hôtelier en cas d'urgence.",
      p6:"Évacuation complexe en cas d'urgence du fait du nombre élevé de passagers non-marins, risques d'incendie dans les zones d'hébergement et de restauration, gestion de crise sanitaire à bord (épidémies en espace clos), pollution liée au volume important de déchets et d'eaux usées générés.",
      p7:"Secteur offrant des carrières variées au-delà des rôles Deck/Engine classiques (hôtellerie, animation, restauration), bonne opportunité pour les officiers souhaitant une exposition internationale forte et une clientèle variée.",
      p8:"Les plus grands navires de croisière actuels sont comparables en taille à de véritables villes flottantes, avec leur propre production d'énergie, de nourriture et de divertissement. Le SOLAS impose des exercices d'évacuation dans les 24 heures suivant l'embarquement de nouveaux passagers.",
    },
    en:{
      title:"Cruise Ship",
      p0:"The cruise ship carries passengers for leisure voyages, combining navigation with high-level hotel accommodation. It is the most complex ship type to operate due to the coexistence of maritime crew and hotel staff.",
      p1:"Offer passengers a complete travel and leisure experience, simultaneously ensuring navigation safety and quality hotel service, on varied tourist itineraries.",
      p2:"Length: from 200 m to over 360 m for the largest ships. Capacity: from a few hundred to over 6,000 passengers, with a crew that can exceed 2,000 people. Numerous decks (up to 20), extensive leisure infrastructure (pools, theaters, restaurants).",
      p3:"Deck Department (navigation, safety, deck operations), Engine Department (propulsion, auxiliary systems, large-scale freshwater and electricity production), and a distinct Hotel Department managing accommodation, catering, and passenger entertainment.",
      p4:"Master, Staff Captain, Chief Officer, Officer of the Watch, Chief Engineer, but also Hotel Director, Cruise Director, and extensive hotel staff outside the traditional maritime hierarchy.",
      p5:"Navigating often coastal and busy areas, managing embarkation/disembarkation of thousands of passengers, mandatory evacuation drills, close coordination between the bridge team and hotel staff in emergencies.",
      p6:"Complex evacuation in emergencies due to the high number of non-seafaring passengers, fire risks in accommodation and dining areas, health crisis management on board (outbreaks in enclosed spaces), pollution linked to the large volume of waste and wastewater generated.",
      p7:"Sector offering varied careers beyond classic Deck/Engine roles (hospitality, entertainment, catering), good opportunity for officers seeking strong international exposure and a varied clientele.",
      p8:"The largest cruise ships today are comparable in size to true floating cities, with their own energy, food, and entertainment production. SOLAS requires evacuation drills within 24 hours of new passengers boarding.",
    },
    es:{
      title:"Buque de crucero",
      p0:"El buque de crucero transporta pasajeros para viajes de ocio, combinando navegación con alojamiento hotelero de alto nivel. Es el tipo de buque más complejo de operar debido a la coexistencia entre tripulación marina y personal hotelero.",
      p1:"Ofrecer a los pasajeros una experiencia de viaje y ocio completa, asegurando simultáneamente la seguridad de la navegación y un servicio hotelero de calidad, en itinerarios turísticos variados.",
      p2:"Longitud: de 200 m a más de 360 m para los buques más grandes. Capacidad: de unos cientos a más de 6.000 pasajeros, con una tripulación que puede superar las 2.000 personas. Numerosas cubiertas (hasta 20), amplia infraestructura de ocio (piscinas, teatros, restaurantes).",
      p3:"Deck Department (navegación, seguridad, operaciones de cubierta), Engine Department (propulsión, sistemas auxiliares, producción de agua dulce y electricidad a gran escala), y un departamento hotelero distinto (Hotel Department) que gestiona el alojamiento, la restauración y el entretenimiento de los pasajeros.",
      p4:"Master, Staff Captain, Chief Officer, Officer of the Watch, Chief Engineer, pero también Hotel Director, Cruise Director, y un amplio personal hotelero fuera de la jerarquía marítima tradicional.",
      p5:"Navegación en zonas a menudo costeras y frecuentadas, gestión del embarque/desembarque de miles de pasajeros, simulacros de evacuación obligatorios, coordinación estrecha entre el equipo de puente y el personal hotelero en caso de emergencia.",
      p6:"Evacuación compleja en caso de emergencia debido al elevado número de pasajeros no marinos, riesgos de incendio en zonas de alojamiento y restauración, gestión de crisis sanitarias a bordo (brotes en espacio cerrado), contaminación relacionada con el gran volumen de residuos y aguas residuales generados.",
      p7:"Sector que ofrece carreras variadas más allá de los roles clásicos Deck/Engine (hostelería, animación, restauración), buena oportunidad para oficiales que buscan una fuerte exposición internacional y una clientela variada.",
      p8:"Los mayores buques de crucero actuales son comparables en tamaño a verdaderas ciudades flotantes, con su propia producción de energía, comida y entretenimiento. El SOLAS exige simulacros de evacuación en las 24 horas siguientes al embarque de nuevos pasajeros.",
    },
    pt:{
      title:"Navio de cruzeiro",
      p0:"O navio de cruzeiro transporta passageiros para viagens de lazer, combinando navegação com alojamento hoteleiro de alto nível. É o tipo de navio mais complexo de operar devido à coexistência entre tripulação marítima e pessoal hoteleiro.",
      p1:"Oferecer aos passageiros uma experiência de viagem e lazer completa, assegurando simultaneamente a segurança da navegação e um serviço hoteleiro de qualidade, em itinerários turísticos variados.",
      p2:"Comprimento: de 200 m a mais de 360 m para os maiores navios. Capacidade: de algumas centenas a mais de 6.000 passageiros, com uma tripulação que pode ultrapassar 2.000 pessoas. Numerosos conveses (até 20), ampla infraestrutura de lazer (piscinas, teatros, restaurantes).",
      p3:"Deck Department (navegação, segurança, operações de convés), Engine Department (propulsão, sistemas auxiliares, produção de água doce e eletricidade em grande escala), e um departamento hoteleiro distinto (Hotel Department) que gere o alojamento, a restauração e o entretenimento dos passageiros.",
      p4:"Master, Staff Captain, Chief Officer, Officer of the Watch, Chief Engineer, mas também Hotel Director, Cruise Director, e um vasto pessoal hoteleiro fora da hierarquia marítima tradicional.",
      p5:"Navegação em zonas frequentemente costeiras e movimentadas, gestão do embarque/desembarque de milhares de passageiros, exercícios de evacuação obrigatórios, coordenação estreita entre a equipa do passadiço e o pessoal hoteleiro em caso de emergência.",
      p6:"Evacuação complexa em caso de emergência devido ao elevado número de passageiros não marítimos, riscos de incêndio nas zonas de alojamento e restauração, gestão de crises sanitárias a bordo (surtos em espaço fechado), poluição relacionada com o grande volume de resíduos e águas residuais gerados.",
      p7:"Setor que oferece carreiras variadas para além dos papéis clássicos Deck/Engine (hotelaria, animação, restauração), boa oportunidade para oficiais que procuram uma forte exposição internacional e uma clientela variada.",
      p8:"Os maiores navios de cruzeiro atuais são comparáveis em tamanho a verdadeiras cidades flutuantes, com a sua própria produção de energia, comida e entretenimento. O SOLAS exige exercícios de evacuação nas 24 horas seguintes ao embarque de novos passageiros.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function CruiseShip({ lang="fr" }) {
  const lc = getContent(lang);
  const L = SECTION_LABELS[lang]||SECTION_LABELS.fr;

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",position:"relative"}}>
      <div style={{padding:"28px 16px 40px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(26,111,212,0.15)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.blue2,fontWeight:700}}>🚢 Ships Library</div>
          <div style={{marginBottom:14,borderRadius:16,overflow:"hidden",border:`1px solid ${C.border}`}}><CruiseShipSVG/></div>
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
