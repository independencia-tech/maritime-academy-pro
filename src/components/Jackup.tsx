// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "jackup"
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
      title:"Plateforme autoélévatrice (Jackup)",
      p0:"Le Jackup est une plateforme de forage offshore mobile, dotée de plusieurs jambes (généralement 3 ou 4) qu'elle abaisse jusqu'au fond marin pour s'y ancrer, puis qui soulèvent la coque au-dessus de la surface de l'eau. Une fois en position, elle n'est plus flottante mais littéralement posée sur ses appuis, offrant une plateforme de travail stable largement indépendante des mouvements de la houle. Utilisée principalement pour le forage d'exploration et de développement en eaux peu profondes à intermédiaires.",
      p1:"Forer des puits d'exploration ou de développement pétrolier et gazier en zone offshore, généralement jusqu'à 120–150 mètres selon les unités, certaines conceptions récentes pouvant dépasser cette limite. Une fois le forage terminé ou la campagne achevée, la plateforme remonte ses jambes, redevient flottante et est remorquée ou se déplace par propulsion propre vers un nouveau site.",
      p2:"Coque de forme généralement triangulaire ou rectangulaire supportant les jambes treillis ou cylindriques, actionnées par un système de crémaillère (rack and pinion) ou hydraulique. Le système de jacking permet de lever ou d'abaisser la coque avec une grande précision afin d'assurer une assise stable sur le fond marin. Derrick de forage central, système de tour et de manutention des tiges, quartiers d'habitation et héliport à bord. La plupart des Jackup ne disposent pas de propulsion autonome performante et dépendent de remorqueurs pour les déplacements longue distance, bien que certaines unités récentes intègrent une propulsion d'appoint.",
      p3:"Drilling (opérations de forage, manœuvre des tiges, contrôle des puits), Marine Department (jambes, ballast, amarrage, grutage), Engine (groupes électrogènes, systèmes hydrauliques), Safety/HSE dédié en raison des risques de forage et de contrôle de puits.",
      p4:"OIM (Offshore Installation Manager), Driller, Assistant Driller, Toolpusher, Ballast Control Operator, Chief Engineer, Crane Operator, techniciens de forage (roughnecks, roustabouts), personnel HSE.",
      p5:"Positionnement et jacking (abaissement des jambes, levage de la coque), forage proprement dit (rotation, circulation de boue, remontée de garniture), contrôle de puits (well control), essais et maintenance du BOP (Blowout Preventer), opérations de grutage pour l'approvisionnement, inspection et maintenance des jambes et du système de jacking, préparation au déplacement (jacking down, remorquage).",
      p6:"Risque d'éruption de puits (blowout) et de perte de contrôle de la pression, défaillance structurelle des jambes lors du jacking (punch-through en sol instable), chute d'objets et risques de grutage, collision avec les navires de soutien pendant les opérations d'approvisionnement, exposition aux opérations de forage (pression, produits chimiques de boue), risques liés au remorquage lors des déplacements entre sites.",
      p7:"Secteur du forage offshore très spécialisé, rotations longues (souvent 3-4 semaines), rémunération attractive liée à la technicité, passerelle vers d'autres unités de forage (Drillship, plateformes fixes) ou vers des postes de supervision HSE/Drilling en compagnie pétrolière.",
      p8:"Le phénomène de \"punch-through\" — lorsqu'une jambe transperce brutalement une couche de sol apparemment stable pour s'enfoncer dans une couche plus molle en dessous — reste l'un des incidents les plus redoutés lors du jacking et fait l'objet d'études géotechniques poussées avant chaque positionnement. Certains Jackup modernes peuvent opérer dans des profondeurs d'eau dépassant 150 mètres, repoussant progressivement les limites historiques du forage sur Jack-up.",
    },
    en:{
      title:"Self-Elevating Drilling Unit (Jackup)",
      p0:"The Jackup is a mobile offshore drilling rig fitted with several legs (typically 3 or 4) that are lowered to the seabed to anchor the unit, then raise the hull above the water surface. Once in position, it is no longer floating but literally resting on its supports, providing a work platform largely independent of wave motion. Used mainly for exploration and development drilling in shallow to intermediate water depths.",
      p1:"Drill exploration or development oil and gas wells offshore, typically up to 120–150 meters of water depth depending on the unit, with some recent designs exceeding this limit. Once drilling or the campaign is complete, the rig jacks up its legs, becomes floating again, and is towed or moves under its own propulsion to a new location.",
      p2:"Hull typically triangular or rectangular, supporting lattice or cylindrical legs driven by a rack-and-pinion or hydraulic jacking system. The jacking system allows the hull to be raised or lowered with great precision to ensure a stable footing on the seabed. Central drilling derrick, pipe-handling tower system, living quarters and helideck on board. Most Jackups have no significant independent propulsion and rely on tugs for long-distance moves, though some recent units include auxiliary propulsion.",
      p3:"Drilling (drilling operations, pipe handling, well control), Marine Department (legs, ballast, mooring, crane operations), Engine (generators, hydraulic systems), dedicated Safety/HSE due to drilling and well-control risks.",
      p4:"OIM (Offshore Installation Manager), Driller, Assistant Driller, Toolpusher, Ballast Control Operator, Chief Engineer, Crane Operator, drilling crew (roughnecks, roustabouts), HSE personnel.",
      p5:"Positioning and jacking (lowering the legs, raising the hull), drilling operations (rotation, mud circulation, pipe tripping), well control, BOP (Blowout Preventer) testing and maintenance, crane operations for supply handling, inspection and maintenance of the legs and jacking system, preparation for relocation (jacking down, towing).",
      p6:"Well blowout risk and loss of pressure control, structural leg failure during jacking (punch-through in unstable soil), dropped object and crane risks, collision with supply vessels during resupply operations, exposure to drilling operations (pressure, mud chemicals), towing-related risks during moves between sites.",
      p7:"Highly specialized offshore drilling sector, long rotations (often 3-4 weeks), attractive pay linked to technical specialization, pathway to other drilling units (Drillship, fixed platforms) or to HSE/Drilling supervisory roles within oil companies.",
      p8:"The \"punch-through\" phenomenon — when a leg abruptly breaks through an apparently stable soil layer into a softer layer below — remains one of the most feared incidents during jacking and is the subject of extensive geotechnical studies before each positioning. Some modern Jackups can operate in water depths exceeding 150 meters, progressively pushing back the historical limits of jack-up drilling.",
    },
    es:{
      title:"Plataforma autoelevadora (Jackup)",
      p0:"El Jackup es una plataforma de perforación offshore móvil, dotada de varias patas (generalmente 3 o 4) que baja hasta el fondo marino para anclarse, y que luego elevan el casco por encima de la superficie del agua. Una vez en posición, deja de estar flotando y queda literalmente apoyada sobre sus soportes, ofreciendo una plataforma de trabajo en gran medida independiente de los movimientos del oleaje. Se utiliza principalmente para la perforación de exploración y desarrollo en aguas poco profundas e intermedias.",
      p1:"Perforar pozos de exploración o desarrollo de petróleo y gas en zona offshore, generalmente hasta 120–150 metros de profundidad de agua según la unidad, aunque algunos diseños recientes pueden superar este límite. Una vez terminada la perforación o la campaña, la plataforma eleva sus patas, vuelve a flotar y es remolcada o se desplaza con propulsión propia hacia un nuevo emplazamiento.",
      p2:"Casco generalmente de forma triangular o rectangular que soporta las patas de celosía o cilíndricas, accionadas por un sistema de cremallera (rack and pinion) o hidráulico. El sistema de jacking permite elevar o bajar el casco con gran precisión para asegurar un asiento estable sobre el fondo marino. Torre de perforación central, sistema de manejo de tuberías, alojamientos y helipuerto a bordo. La mayoría de los Jackup no cuentan con propulsión autónoma significativa y dependen de remolcadores para los desplazamientos de larga distancia, aunque algunas unidades recientes incorporan propulsión auxiliar.",
      p3:"Drilling (operaciones de perforación, manejo de tuberías, control de pozo), Marine Department (patas, lastre, amarre, operaciones de grúa), Engine (generadores, sistemas hidráulicos), Safety/HSE dedicado debido a los riesgos de perforación y control de pozo.",
      p4:"OIM (Offshore Installation Manager), Driller, Assistant Driller, Toolpusher, Ballast Control Operator, Chief Engineer, Crane Operator, personal de perforación (roughnecks, roustabouts), personal de HSE.",
      p5:"Posicionamiento y jacking (bajada de las patas, elevación del casco), operaciones de perforación (rotación, circulación de lodo, maniobras de tubería), control de pozo, pruebas y mantenimiento del BOP (Blowout Preventer), operaciones de grúa para el aprovisionamiento, inspección y mantenimiento de las patas y del sistema de jacking, preparación para el desplazamiento (jacking down, remolque).",
      p6:"Riesgo de erupción de pozo (blowout) y pérdida de control de la presión, fallo estructural de las patas durante el jacking (punch-through en suelo inestable), riesgos de caída de objetos y de grúa, colisión con buques de apoyo durante las operaciones de aprovisionamiento, exposición a las operaciones de perforación (presión, productos químicos del lodo), riesgos asociados al remolque durante los desplazamientos entre emplazamientos.",
      p7:"Sector de perforación offshore muy especializado, rotaciones largas (a menudo 3-4 semanas), remuneración atractiva ligada a la especialización técnica, vía de acceso hacia otras unidades de perforación (Drillship, plataformas fijas) o hacia puestos de supervisión HSE/Drilling en compañías petroleras.",
      p8:"El fenómeno de \"punch-through\" —cuando una pata atraviesa bruscamente una capa de suelo aparentemente estable para hundirse en una capa más blanda debajo— sigue siendo uno de los incidentes más temidos durante el jacking y es objeto de estudios geotécnicos exhaustivos antes de cada posicionamiento. Algunos Jackup modernos pueden operar en profundidades de agua superiores a 150 metros, ampliando progresivamente los límites históricos de la perforación con Jackup.",
    },
    pt:{
      title:"Plataforma autoelevatória (Jackup)",
      p0:"O Jackup é uma plataforma de perfuração offshore móvel, equipada com várias pernas (geralmente 3 ou 4) que são baixadas até ao fundo do mar para ancorar a unidade, elevando depois o casco acima da superfície da água. Uma vez posicionada, deixa de estar flutuante e fica literalmente apoiada nos seus suportes, oferecendo uma plataforma de trabalho amplamente independente dos movimentos da ondulação. Utilizada principalmente para perfuração de exploração e desenvolvimento em águas pouco profundas a intermédias.",
      p1:"Perfurar poços de exploração ou desenvolvimento de petróleo e gás offshore, geralmente até 120–150 metros de profundidade de água consoante a unidade, podendo alguns projetos recentes ultrapassar este limite. Uma vez concluída a perfuração ou a campanha, a plataforma eleva as suas pernas, volta a flutuar e é rebocada ou desloca-se com propulsão própria para um novo local.",
      p2:"Casco geralmente de forma triangular ou retangular que suporta pernas em treliça ou cilíndricas, acionadas por um sistema de cremalheira (rack and pinion) ou hidráulico. O sistema de jacking permite elevar ou baixar o casco com grande precisão para garantir um apoio estável no fundo do mar. Torre de perfuração central, sistema de manuseio de tubos, alojamentos e heliporto a bordo. A maioria dos Jackup não dispõe de propulsão autónoma significativa e depende de rebocadores para deslocações de longa distância, embora algumas unidades recentes incorporem propulsão auxiliar.",
      p3:"Drilling (operações de perfuração, manuseio de tubos, controlo de poço), Marine Department (pernas, lastro, amarração, operações de guindaste), Engine (geradores, sistemas hidráulicos), Safety/HSE dedicado devido aos riscos de perfuração e controlo de poço.",
      p4:"OIM (Offshore Installation Manager), Driller, Assistant Driller, Toolpusher, Ballast Control Operator, Chief Engineer, Crane Operator, pessoal de perfuração (roughnecks, roustabouts), pessoal de HSE.",
      p5:"Posicionamento e jacking (descida das pernas, elevação do casco), operações de perfuração (rotação, circulação de lama, manobras de tubos), controlo de poço, testes e manutenção do BOP (Blowout Preventer), operações de guindaste para abastecimento, inspeção e manutenção das pernas e do sistema de jacking, preparação para deslocação (jacking down, reboque).",
      p6:"Risco de erupção de poço (blowout) e perda de controlo da pressão, falha estrutural das pernas durante o jacking (punch-through em solo instável), riscos de queda de objetos e de guindaste, colisão com navios de apoio durante operações de abastecimento, exposição às operações de perfuração (pressão, produtos químicos da lama), riscos associados ao reboque durante deslocações entre locais.",
      p7:"Setor de perfuração offshore altamente especializado, rotações longas (frequentemente 3-4 semanas), remuneração atrativa ligada à especialização técnica, via de acesso para outras unidades de perfuração (Drillship, plataformas fixas) ou para cargos de supervisão HSE/Drilling em companhias petrolíferas.",
      p8:"O fenómeno de \"punch-through\" — quando uma perna atravessa bruscamente uma camada de solo aparentemente estável, afundando-se numa camada mais mole por baixo — continua a ser um dos incidentes mais temidos durante o jacking e é objeto de estudos geotécnicos aprofundados antes de cada posicionamento. Alguns Jackup modernos conseguem operar em profundidades de água superiores a 150 metros, alargando progressivamente os limites históricos da perfuração em Jackup.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function Jackup({ lang="fr" }) {
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
