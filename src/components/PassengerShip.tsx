// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "roro_passenger"
// Content is the RoPax / Ro-Ro passenger ferry (roll-on/roll-off ramps, vehicle garage) —
// matches "roro_passenger" in vesselTypeRegistry.ts ("Ferry Ro-Ro Passagers" / "Ro-Ro Passenger
// Ferry"), not the generic "passenger_ship" ID. File named PassengerShip.tsx per instruction.
// Standalone documentary component: no Dashboard/progression/billing dependency.
import { C, Card, SL, GLine } from "./LessonShared";

const SECTION_LABELS = {
  fr: { profile:"Fiche navire", mission:"Mission", characteristics:"Caractéristiques générales", departments:"Départements à bord", positions:"Postes typiques", operations:"Opérations typiques", risks:"Risques principaux", careers:"Débouchés professionnels", facts:"Anecdotes" },
  en: { profile:"Ship Profile", mission:"Mission", characteristics:"General Characteristics", departments:"Onboard Departments", positions:"Typical Positions", operations:"Typical Operations", risks:"Main Risks", careers:"Career Opportunities", facts:"Interesting Facts" },
  es: { profile:"Ficha del buque", mission:"Misión", characteristics:"Características generales", departments:"Departamentos a bordo", positions:"Puestos típicos", operations:"Operaciones típicas", risks:"Riesgos principales", careers:"Oportunidades profesionales", facts:"Datos curiosos" },
  pt: { profile:"Ficha do navio", mission:"Missão", characteristics:"Características gerais", departments:"Departamentos a bordo", positions:"Cargos típicos", operations:"Operações típicas", risks:"Riscos principais", careers:"Oportunidades profissionais", facts:"Curiosidades" },
};

const getContent = lang => {
  const d = {
    fr:{
      title:"Ferry / Navire à passagers (RoPax)",
      p0:"Le RoPax combine transport de passagers et de véhicules roulants sur des lignes régulières, souvent à courte ou moyenne distance. Contrairement au navire de croisière, sa vocation est le transport rapide et récurrent, pas le loisir touristique.",
      p1:"Assurer des liaisons régulières transportant simultanément passagers, voitures, camions et parfois wagons ferroviaires, selon des rotations fréquentes entre deux ou plusieurs ports fixes.",
      p2:"Longueur : de 100 m à plus de 240 m selon les lignes desservies. Capacité : de quelques centaines à plus de 2 000 passagers, avec un garage pouvant accueillir plusieurs centaines de véhicules. Rampes d'accès roulier à l'avant et/ou à l'arrière pour un chargement rapide.",
      p3:"Deck Department (navigation, sécurité, opérations de chargement roulier), Engine Department (propulsion, systèmes auxiliaires), et un service passagers distinct gérant l'accueil, la restauration et le confort à bord durant la traversée.",
      p4:"Master, Chief Officer, Officer of the Watch, Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer, ainsi que du personnel dédié à l'accueil et à la sécurité des passagers.",
      p5:"Chargement/déchargement rapide des véhicules via rampes rouliers, contrôle strict de l'arrimage des véhicules pour la stabilité, gestion de l'embarquement/débarquement des passagers dans des délais courts, exercices de sécurité passagers réguliers.",
      p6:"Stabilité compromise en cas de mauvais arrimage des véhicules, risque d'envahissement rapide par le pont roulier en cas de brèche (espace ouvert de grande surface), gestion de foule en cas d'urgence, incendie de véhicules dans le garage.",
      p7:"Secteur offrant une bonne stabilité de carrière du fait des rotations régulières et prévisibles, apprécié pour un meilleur équilibre vie professionnelle/personnelle comparé aux longues traversées océaniques.",
      p8:"L'accident du Herald of Free Enterprise en 1987 a conduit à un renforcement majeur des règles de stabilité et de sécurité pour les RoPax dans le monde entier. Le pont roulier ouvert, bien que pratique pour le chargement rapide, reste un point de vigilance permanent en matière de stabilité.",
    },
    en:{
      title:"Ferry / RoPax Passenger Ship",
      p0:"The RoPax combines passenger and rolling vehicle transport on regular routes, often over short to medium distances. Unlike a cruise ship, its purpose is fast, recurring transport rather than tourist leisure.",
      p1:"Provide regular connections simultaneously carrying passengers, cars, trucks, and sometimes rail wagons, on frequent rotations between two or more fixed ports.",
      p2:"Length: from 100 m to over 240 m depending on the routes served. Capacity: from a few hundred to over 2,000 passengers, with a garage accommodating several hundred vehicles. Roll-on/roll-off ramps at the bow and/or stern for fast loading.",
      p3:"Deck Department (navigation, safety, roll-on/roll-off loading operations), Engine Department (propulsion, auxiliary systems), and a distinct passenger service managing reception, catering, and onboard comfort during the crossing.",
      p4:"Master, Chief Officer, Officer of the Watch, Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer, as well as staff dedicated to passenger reception and safety.",
      p5:"Fast loading/unloading of vehicles via roll-on/roll-off ramps, strict control of vehicle securing for stability, managing passenger embarkation/disembarkation in short timeframes, regular passenger safety drills.",
      p6:"Compromised stability in case of poor vehicle securing, risk of rapid flooding via the vehicle deck in case of breach (large open space), crowd management in emergencies, vehicle fire in the garage.",
      p7:"Sector offering good career stability due to regular, predictable rotations, appreciated for a better work-life balance compared to long ocean crossings.",
      p8:"The 1987 Herald of Free Enterprise accident led to a major reinforcement of stability and safety rules for RoPax vessels worldwide. The open vehicle deck, while practical for fast loading, remains a permanent point of vigilance regarding stability.",
    },
    es:{
      title:"Ferry / Buque de pasajeros (RoPax)",
      p0:"El RoPax combina el transporte de pasajeros y vehículos rodantes en líneas regulares, a menudo de corta o media distancia. A diferencia del buque de crucero, su vocación es el transporte rápido y recurrente, no el ocio turístico.",
      p1:"Asegurar conexiones regulares transportando simultáneamente pasajeros, coches, camiones y a veces vagones ferroviarios, según rotaciones frecuentes entre dos o más puertos fijos.",
      p2:"Longitud: de 100 m a más de 240 m según las líneas servidas. Capacidad: de unos cientos a más de 2.000 pasajeros, con un garaje capaz de albergar varios cientos de vehículos. Rampas de acceso roll-on/roll-off en la proa y/o la popa para una carga rápida.",
      p3:"Deck Department (navegación, seguridad, operaciones de carga roll-on/roll-off), Engine Department (propulsión, sistemas auxiliares), y un servicio de pasajeros distinto que gestiona la acogida, la restauración y el confort a bordo durante la travesía.",
      p4:"Master, Chief Officer, Officer of the Watch, Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer, así como personal dedicado a la acogida y seguridad de los pasajeros.",
      p5:"Carga/descarga rápida de vehículos mediante rampas roll-on/roll-off, control estricto de la estiba de vehículos para la estabilidad, gestión del embarque/desembarque de pasajeros en plazos cortos, simulacros de seguridad de pasajeros regulares.",
      p6:"Estabilidad comprometida en caso de mala estiba de los vehículos, riesgo de inundación rápida a través de la cubierta rodante en caso de brecha (espacio abierto de gran superficie), gestión de multitudes en emergencias, incendio de vehículos en el garaje.",
      p7:"Sector que ofrece buena estabilidad de carrera gracias a rotaciones regulares y previsibles, apreciado por un mejor equilibrio entre vida profesional y personal en comparación con las largas travesías oceánicas.",
      p8:"El accidente del Herald of Free Enterprise en 1987 llevó a un refuerzo importante de las normas de estabilidad y seguridad para los RoPax en todo el mundo. La cubierta rodante abierta, aunque práctica para la carga rápida, sigue siendo un punto de vigilancia permanente en materia de estabilidad.",
    },
    pt:{
      title:"Ferry / Navio de passageiros (RoPax)",
      p0:"O RoPax combina transporte de passageiros e veículos rodantes em linhas regulares, frequentemente de curta ou média distância. Ao contrário do navio de cruzeiro, a sua vocação é o transporte rápido e recorrente, não o lazer turístico.",
      p1:"Assegurar ligações regulares transportando simultaneamente passageiros, carros, camiões e por vezes vagões ferroviários, segundo rotações frequentes entre dois ou mais portos fixos.",
      p2:"Comprimento: de 100 m a mais de 240 m consoante as linhas servidas. Capacidade: de algumas centenas a mais de 2.000 passageiros, com uma garagem capaz de acolher várias centenas de veículos. Rampas de acesso roll-on/roll-off na proa e/ou na popa para um carregamento rápido.",
      p3:"Deck Department (navegação, segurança, operações de carga roll-on/roll-off), Engine Department (propulsão, sistemas auxiliares), e um serviço de passageiros distinto que gere a receção, a restauração e o conforto a bordo durante a travessia.",
      p4:"Master, Chief Officer, Officer of the Watch, Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer, bem como pessoal dedicado à receção e segurança dos passageiros.",
      p5:"Carregamento/descarregamento rápido de veículos através de rampas roll-on/roll-off, controlo rigoroso da estivagem dos veículos para a estabilidade, gestão do embarque/desembarque de passageiros em prazos curtos, exercícios de segurança de passageiros regulares.",
      p6:"Estabilidade comprometida em caso de má estivagem dos veículos, risco de alagamento rápido através do convés rodante em caso de brecha (espaço aberto de grande superfície), gestão de multidões em emergências, incêndio de veículos na garagem.",
      p7:"Setor que oferece boa estabilidade de carreira graças a rotações regulares e previsíveis, apreciado por um melhor equilíbrio entre vida profissional e pessoal em comparação com as longas travessias oceânicas.",
      p8:"O acidente do Herald of Free Enterprise em 1987 levou a um reforço importante das regras de estabilidade e segurança para os RoPax em todo o mundo. O convés rodante aberto, embora prático para o carregamento rápido, continua a ser um ponto de vigilância permanente em matéria de estabilidade.",
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
