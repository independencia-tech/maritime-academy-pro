// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "drillship"
// Standalone documentary component: no Dashboard/progression/billing dependency.
import { C, Card, SL, GLine } from "./LessonShared";
import { DrillshipSVG } from "./ShipIllustrations";

const SECTION_LABELS = {
  fr: { profile:"Fiche navire", mission:"Mission", characteristics:"Caractéristiques générales", departments:"Départements à bord", positions:"Postes typiques", operations:"Opérations typiques", risks:"Risques principaux", careers:"Débouchés professionnels", facts:"Anecdotes" },
  en: { profile:"Ship Profile", mission:"Mission", characteristics:"General Characteristics", departments:"Onboard Departments", positions:"Typical Positions", operations:"Typical Operations", risks:"Main Risks", careers:"Career Opportunities", facts:"Interesting Facts" },
  es: { profile:"Ficha del buque", mission:"Misión", characteristics:"Características generales", departments:"Departamentos a bordo", positions:"Puestos típicos", operations:"Operaciones típicas", risks:"Riesgos principales", careers:"Oportunidades profesionales", facts:"Datos curiosos" },
  pt: { profile:"Ficha do navio", mission:"Missão", characteristics:"Características gerais", departments:"Departamentos a bordo", positions:"Cargos típicos", operations:"Operações típicas", risks:"Riscos principais", careers:"Oportunidades profissionais", facts:"Curiosidades" },
};

const getContent = lang => {
  const d = {
    fr:{
      title:"Navire de forage (Drillship)",
      p0:"Le Drillship est un navire de forage offshore à coque de type navire, conçu pour opérer en eaux profondes et ultra-profondes, là où les plateformes autoélévatrices (Jackup) ne peuvent pas intervenir. Contrairement au Jackup, il reste flottant en permanence et se maintient en position principalement grâce à un système de positionnement dynamique (DP), certaines unités plus anciennes pouvant également utiliser un système d'ancrage. Sa forme de coque lui permet une grande autonomie et une mobilité bien supérieure aux autres unités de forage.",
      p1:"Forer des puits d'exploration ou de développement pétrolier et gazier dans des zones où la profondeur d'eau dépasse largement les capacités des Jackup, souvent au-delà de 1000 mètres et jusqu'à plus de 3000 mètres pour les unités les plus modernes. Le Drillship peut également effectuer des opérations de complétion de puits, des interventions légères de workover, ainsi que certaines opérations d'évaluation de puits (well testing) lorsque l'installation est équipée pour ces campagnes.",
      p2:"Coque de forme classique de navire, généralement propulsée par ses propres moyens (propulsion diesel-électrique ou azimutale), permettant un transit autonome entre les sites sans recours systématique au remorquage. Système de positionnement dynamique (DP2 ou DP3) utilisant plusieurs propulseurs azimutaux pour maintenir la position au-dessus du puits sans ancrage. La redondance des systèmes DP permet de maintenir la position même en cas de défaillance d'un équipement critique, selon le niveau de certification. Derrick de forage central, moon pool (ouverture dans la coque permettant le passage du train de tiges et des équipements sous-marins), système de manutention de tiges, quartiers d'habitation et héliport à bord.",
      p3:"Drilling (opérations de forage, manœuvre des tiges, contrôle des puits), Marine Department (navigation, positionnement dynamique, manœuvres), Engine (groupes électrogènes, propulsion, systèmes hydrauliques), Safety/HSE dédié en raison des risques de forage en eaux profondes.",
      p4:"OIM (Offshore Installation Manager) ou Master, Driller, Assistant Driller, Toolpusher, DPO (Dynamic Positioning Operator), Subsea Engineer, Chief Engineer, Crane Operator, techniciens de forage (roughnecks, roustabouts), personnel HSE.",
      p5:"Positionnement dynamique et maintien de station au-dessus du puits, forage proprement dit (rotation, circulation de boue, remontée de garniture), installation et récupération du riser marin (marine riser), déploiement et récupération du BOP sous-marin via le moon pool, contrôle de puits (well control), essais et maintenance du BOP, opérations de manutention et de grutage, transit autonome entre sites de forage.",
      p6:"Risque d'éruption de puits (blowout) et de perte de contrôle de la pression, perte de positionnement dynamique (drive-off/drift-off) avec risque d'endommagement du riser marin et du BOP, chute d'objets et risques de grutage, exposition aux opérations de forage en eaux profondes (pression, produits chimiques de boue), risques liés aux conditions météo-océaniques extrêmes en zones isolées.",
      p7:"Secteur du forage offshore ultra-profond très spécialisé et hautement rémunéré, rotations longues (souvent 4-5 semaines), forte demande de personnel DP certifié, Subsea et Drilling expérimenté, passerelle vers d'autres unités de forage (Jackup, semi-submersibles) ou vers des postes de supervision Drilling/DP en compagnie pétrolière.",
      p8:"Le moon pool, ouverture centrale dans la coque, permet de déployer et récupérer des équipements lourds directement sous le navire sans les exposer à la houle, une caractéristique essentielle pour les opérations en eaux profondes. Les Drillship les plus modernes peuvent forer par plus de 3000 mètres de profondeur d'eau et atteindre des profondeurs de puits dépassant 12000 mètres sous la surface, illustrant les capacités actuelles des technologies de forage offshore en eaux ultra-profondes.",
    },
    en:{
      title:"Drillship",
      p0:"The Drillship is an offshore drilling vessel with a ship-shaped hull, designed to operate in deep and ultra-deep waters where jack-up rigs cannot reach. Unlike the Jackup, it remains permanently afloat and holds position mainly through a dynamic positioning (DP) system, with some older units also able to use an anchoring system. Its ship-shaped hull provides greater autonomy and mobility than other drilling units.",
      p1:"Drill exploration or development oil and gas wells in areas where water depth far exceeds jack-up capabilities, often beyond 1000 meters and up to more than 3000 meters for the most modern units. The Drillship can also carry out well completion operations, light workover interventions, and certain well testing operations when the unit is equipped for such campaigns.",
      p2:"Ship-shaped hull, generally self-propelled (diesel-electric or azimuthal propulsion), allowing autonomous transit between sites without systematic reliance on towing. Dynamic positioning system (DP2 or DP3) using multiple azimuthal thrusters to hold position above the well without anchoring. The redundancy of DP systems allows the unit to maintain position even in the event of a critical equipment failure, depending on the certification level. Central drilling derrick, moon pool (an opening in the hull allowing passage of the drill string and subsea equipment), pipe-handling system, living quarters and helideck on board.",
      p3:"Drilling (drilling operations, pipe handling, well control), Marine Department (navigation, dynamic positioning, maneuvering), Engine (generators, propulsion, hydraulic systems), dedicated Safety/HSE due to deepwater drilling risks.",
      p4:"OIM (Offshore Installation Manager) or Master, Driller, Assistant Driller, Toolpusher, DPO (Dynamic Positioning Operator), Subsea Engineer, Chief Engineer, Crane Operator, drilling crew (roughnecks, roustabouts), HSE personnel.",
      p5:"Dynamic positioning and station-keeping above the well, drilling operations (rotation, mud circulation, pipe tripping), running and retrieving the marine riser, deployment and retrieval of the subsea BOP via the moon pool, well control, BOP testing and maintenance, handling and crane operations, autonomous transit between drilling sites.",
      p6:"Well blowout risk and loss of pressure control, loss of dynamic positioning (drive-off/drift-off) with risk of damage to the marine riser and BOP, dropped object and crane risks, exposure to deepwater drilling operations (pressure, mud chemicals), risks linked to extreme metocean conditions in remote areas.",
      p7:"Highly specialized and highly compensated ultra-deepwater drilling sector, long rotations (often 4-5 weeks), strong demand for certified DP personnel and experienced Subsea and Drilling staff, pathway to other drilling units (Jackup, semi-submersibles) or to Drilling/DP supervisory roles within oil companies.",
      p8:"The moon pool, a central opening in the hull, allows heavy equipment to be deployed and retrieved directly beneath the vessel without exposure to wave action, an essential feature for deepwater operations. The most modern Drillships can drill in water depths exceeding 3000 meters and reach well depths beyond 12000 meters below the surface, illustrating the current capabilities of offshore drilling technology in ultra-deep waters.",
    },
    es:{
      title:"Buque de perforación (Drillship)",
      p0:"El Drillship es un buque de perforación offshore con casco de tipo buque, diseñado para operar en aguas profundas y ultra profundas, donde las plataformas autoelevadoras (Jackup) no pueden intervenir. A diferencia del Jackup, permanece flotando de forma permanente y mantiene su posición principalmente mediante un sistema de posicionamiento dinámico (DP), pudiendo algunas unidades más antiguas utilizar también un sistema de anclaje. Su forma de casco le proporciona una gran autonomía y una movilidad muy superior a la de otras unidades de perforación.",
      p1:"Perforar pozos de exploración o desarrollo de petróleo y gas en zonas donde la profundidad del agua supera ampliamente las capacidades de los Jackup, a menudo más allá de 1000 metros y hasta más de 3000 metros para las unidades más modernas. El Drillship también puede realizar operaciones de completación de pozos, intervenciones ligeras de workover, así como ciertas operaciones de evaluación de pozos (well testing) cuando la unidad está equipada para estas campañas.",
      p2:"Casco de forma clásica de buque, generalmente autopropulsado (propulsión diésel-eléctrica o azimutal), que permite un tránsito autónomo entre emplazamientos sin recurrir sistemáticamente al remolque. Sistema de posicionamiento dinámico (DP2 o DP3) que utiliza varios propulsores azimutales para mantener la posición sobre el pozo sin anclaje. La redundancia de los sistemas DP permite mantener la posición incluso en caso de fallo de un equipo crítico, según el nivel de certificación. Torre de perforación central, moon pool (abertura en el casco que permite el paso de la sarta de perforación y de los equipos submarinos), sistema de manejo de tuberías, alojamientos y helipuerto a bordo.",
      p3:"Drilling (operaciones de perforación, manejo de tuberías, control de pozo), Marine Department (navegación, posicionamiento dinámico, maniobras), Engine (generadores, propulsión, sistemas hidráulicos), Safety/HSE dedicado debido a los riesgos de perforación en aguas profundas.",
      p4:"OIM (Offshore Installation Manager) o Master, Driller, Assistant Driller, Toolpusher, DPO (Dynamic Positioning Operator), Subsea Engineer, Chief Engineer, Crane Operator, personal de perforación (roughnecks, roustabouts), personal de HSE.",
      p5:"Posicionamiento dinámico y mantenimiento de posición sobre el pozo, operaciones de perforación (rotación, circulación de lodo, maniobras de tubería), instalación y recuperación del riser marino, despliegue y recuperación del BOP submarino a través del moon pool, control de pozo, pruebas y mantenimiento del BOP, operaciones de manejo y de grúa, tránsito autónomo entre emplazamientos de perforación.",
      p6:"Riesgo de erupción de pozo (blowout) y pérdida de control de la presión, pérdida de posicionamiento dinámico (drive-off/drift-off) con riesgo de daño al riser marino y al BOP, riesgos de caída de objetos y de grúa, exposición a las operaciones de perforación en aguas profundas (presión, productos químicos del lodo), riesgos asociados a condiciones meteo-oceánicas extremas en zonas aisladas.",
      p7:"Sector de perforación offshore en aguas ultra profundas muy especializado y altamente remunerado, rotaciones largas (a menudo 4-5 semanas), fuerte demanda de personal DP certificado, así como personal Subsea y de Drilling experimentado, vía de acceso hacia otras unidades de perforación (Jackup, semisumergibles) o hacia puestos de supervisión Drilling/DP en compañías petroleras.",
      p8:"El moon pool, abertura central en el casco, permite desplegar y recuperar equipos pesados directamente bajo el buque sin exponerlos al oleaje, una característica esencial para las operaciones en aguas profundas. Los Drillship más modernos pueden perforar en profundidades de agua superiores a 3000 metros y alcanzar profundidades de pozo superiores a 12000 metros bajo la superficie, ilustrando las capacidades actuales de las tecnologías de perforación offshore en aguas ultra profundas.",
    },
    pt:{
      title:"Navio de perfuração (Drillship)",
      p0:"O Drillship é um navio de perfuração offshore com casco em forma de navio, concebido para operar em águas profundas e ultra profundas, onde as plataformas autoelevatórias (Jackup) não conseguem atuar. Ao contrário do Jackup, permanece sempre flutuante e mantém a posição principalmente através de um sistema de posicionamento dinâmico (DP), podendo algumas unidades mais antigas também utilizar um sistema de ancoragem. A forma do seu casco proporciona uma grande autonomia e uma mobilidade muito superior à de outras unidades de perfuração.",
      p1:"Perfurar poços de exploração ou desenvolvimento de petróleo e gás em zonas onde a profundidade da água ultrapassa largamente as capacidades dos Jackup, frequentemente além de 1000 metros e até mais de 3000 metros para as unidades mais modernas. O Drillship pode também realizar operações de completação de poços, intervenções ligeiras de workover, bem como certas operações de avaliação de poços (well testing) quando a unidade está equipada para essas campanhas.",
      p2:"Casco de forma clássica de navio, geralmente autopropulsionado (propulsão diesel-elétrica ou azimutal), permitindo um trânsito autónomo entre locais sem recorrer sistematicamente ao reboque. Sistema de posicionamento dinâmico (DP2 ou DP3) que utiliza vários propulsores azimutais para manter a posição sobre o poço sem ancoragem. A redundância dos sistemas DP permite manter a posição mesmo em caso de falha de um equipamento crítico, consoante o nível de certificação. Torre de perfuração central, moon pool (abertura no casco que permite a passagem da coluna de perfuração e dos equipamentos submarinos), sistema de manuseio de tubos, alojamentos e heliporto a bordo.",
      p3:"Drilling (operações de perfuração, manuseio de tubos, controlo de poço), Marine Department (navegação, posicionamento dinâmico, manobras), Engine (geradores, propulsão, sistemas hidráulicos), Safety/HSE dedicado devido aos riscos de perfuração em águas profundas.",
      p4:"OIM (Offshore Installation Manager) ou Master, Driller, Assistant Driller, Toolpusher, DPO (Dynamic Positioning Operator), Subsea Engineer, Chief Engineer, Crane Operator, pessoal de perfuração (roughnecks, roustabouts), pessoal de HSE.",
      p5:"Posicionamento dinâmico e manutenção de posição sobre o poço, operações de perfuração (rotação, circulação de lama, manobras de tubos), instalação e recuperação do riser marinho, implantação e recuperação do BOP submarino através do moon pool, controlo de poço, testes e manutenção do BOP, operações de manuseio e de guindaste, trânsito autónomo entre locais de perfuração.",
      p6:"Risco de erupção de poço (blowout) e perda de controlo da pressão, perda de posicionamento dinâmico (drive-off/drift-off) com risco de danos ao riser marinho e ao BOP, riscos de queda de objetos e de guindaste, exposição às operações de perfuração em águas profundas (pressão, produtos químicos da lama), riscos associados a condições meteo-oceânicas extremas em zonas isoladas.",
      p7:"Setor de perfuração offshore em águas ultra profundas altamente especializado e bem remunerado, rotações longas (frequentemente 4-5 semanas), forte procura de pessoal DP certificado, bem como pessoal Subsea e de Drilling experiente, via de acesso para outras unidades de perfuração (Jackup, semissubmersíveis) ou para cargos de supervisão Drilling/DP em companhias petrolíferas.",
      p8:"O moon pool, abertura central no casco, permite implantar e recuperar equipamentos pesados diretamente sob o navio sem os expor à ondulação, uma característica essencial para as operações em águas profundas. Os Drillship mais modernos conseguem perfurar em profundidades de água superiores a 3000 metros e atingir profundidades de poço superiores a 12000 metros abaixo da superfície, ilustrando as capacidades atuais das tecnologias de perfuração offshore em águas ultra profundas.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function Drillship({ lang="fr" }) {
  const lc = getContent(lang);
  const L = SECTION_LABELS[lang]||SECTION_LABELS.fr;

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",position:"relative"}}>
      <div style={{padding:"28px 16px 40px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(26,111,212,0.15)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.blue2,fontWeight:700}}>🚢 Ships Library</div>
          <div style={{marginBottom:14,borderRadius:16,overflow:"hidden",border:`1px solid ${C.border}`}}><DrillshipSVG/></div>
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
