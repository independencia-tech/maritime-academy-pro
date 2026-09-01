// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "heavy_lift"
// Standalone documentary component: no Dashboard/progression/billing dependency.
import { C, Card, SL, GLine } from "./LessonShared";
import { HeavyLiftSVG } from "./ShipIllustrations";

const SECTION_LABELS = {
  fr: { profile:"Fiche navire", mission:"Mission", characteristics:"Caractéristiques générales", departments:"Départements à bord", positions:"Postes typiques", operations:"Opérations typiques", risks:"Risques principaux", careers:"Débouchés professionnels", facts:"Anecdotes" },
  en: { profile:"Ship Profile", mission:"Mission", characteristics:"General Characteristics", departments:"Onboard Departments", positions:"Typical Positions", operations:"Typical Operations", risks:"Main Risks", careers:"Career Opportunities", facts:"Interesting Facts" },
  es: { profile:"Ficha del buque", mission:"Misión", characteristics:"Características generales", departments:"Departamentos a bordo", positions:"Puestos típicos", operations:"Operaciones típicas", risks:"Riesgos principales", careers:"Oportunidades profesionales", facts:"Datos curiosos" },
  pt: { profile:"Ficha do navio", mission:"Missão", characteristics:"Características gerais", departments:"Departamentos a bordo", positions:"Cargos típicos", operations:"Operações típicas", risks:"Riscos principais", careers:"Oportunidades profissionais", facts:"Curiosidades" },
};

const getContent = lang => {
  const d = {
    fr:{
      title:"Navire de transport de charges lourdes",
      p0:"Le navire de transport de charges lourdes transporte des cargaisons exceptionnelles impossibles à charger sur un navire classique : modules industriels, sections de plateformes offshore, voire d'autres navires entiers. Il repousse les limites du transport maritime conventionnel.",
      p1:"Transporter des cargaisons hors normes en poids, volume ou dimensions (modules industriels, structures offshore, yachts, autres navires), souvent via des techniques de chargement spécifiques comme le semi-submersible ou le roulage renforcé.",
      p2:"Longueur : de 100 m à plus de 250 m selon les modèles. Certains navires sont semi-submersibles, capables de s'immerger partiellement pour charger une cargaison flottante directement sur leur pont, puis de refaire surface. Grues de bord de très forte capacité sur certains modèles (plusieurs centaines de tonnes). Certaines unités ne possèdent pas de grues et sont spécialisées exclusivement dans les opérations de semi-submersion, tandis que d'autres combinent grues de très forte capacité et transport de charges lourdes.",
      p3:"Deck Department (navigation, opérations de chargement de charges exceptionnelles), Engine Department (propulsion, systèmes de ballastage pour les manœuvres de semi-submersion), avec une expertise pointue en calcul de répartition de charge et en ingénierie de transport.",
      p4:"Master, Chief Officer (responsable du plan de chargement de charges exceptionnelles), Cargo Superintendent / Marine Warranty Surveyor (selon le projet et l'entreprise), Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Calcul précis de la répartition du poids pour des cargaisons hors normes, vérification de la résistance de la coque et des limites de charge du pont avant chargement, opérations de semi-submersion pour le chargement flottant, arrimage renforcé de charges exceptionnelles, coordination étroite avec des équipes d'ingénierie terrestres pour les projets complexes.",
      p6:"Risques structurels majeurs en cas d'erreur de calcul de charge, stabilité extrêmement sensible pendant les manœuvres de semi-submersion, dommages potentiels considérables en cas de déplacement de cargaison mal arrimée, complexité technique élevée de chaque opération de chargement.",
      p7:"Secteur de très haute spécialisation avec une flotte mondiale limitée, expertise en ingénierie de transport particulièrement valorisée, projets souvent uniques et logistiquement complexes offrant une expérience professionnelle très différenciante.",
      p8:"Certains navires semi-submersibles de transport de charges lourdes peuvent transporter d'autres navires entiers, y compris des sous-marins ou des plateformes pétrolières complètes, en s'immergeant partiellement pour les faire flotter au-dessus de leur pont avant de refaire surface.",
    },
    en:{
      title:"Heavy Lift Vessel",
      p0:"The heavy lift vessel carries exceptional cargo that cannot be loaded onto a conventional ship: industrial modules, offshore platform sections, even entire other ships. It pushes the boundaries of conventional maritime transport.",
      p1:"Transport out-of-standard cargo in weight, volume, or dimensions (industrial modules, offshore structures, yachts, other ships), often using specific loading techniques such as semi-submersion or reinforced roll-on loading.",
      p2:"Length: from 100 m to over 250 m depending on model. Some ships are semi-submersible, able to partially submerge to load floating cargo directly onto their deck, then resurface. Very high-capacity onboard cranes on some models (several hundred tonnes). Some units have no cranes at all and specialize exclusively in semi-submersion operations, while others combine very high-capacity cranes with heavy lift transport.",
      p3:"Deck Department (navigation, exceptional cargo loading operations), Engine Department (propulsion, ballasting systems for semi-submersion maneuvers), with specialized expertise in load distribution calculation and transport engineering.",
      p4:"Master, Chief Officer (responsible for the exceptional cargo loading plan), Cargo Superintendent / Marine Warranty Surveyor (depending on the project and company), Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Precise weight distribution calculation for out-of-standard cargo, verification of hull strength and deck load limits before loading, semi-submersion operations for floating cargo loading, reinforced securing of exceptional cargo, close coordination with onshore engineering teams for complex projects.",
      p6:"Major structural risks in case of load calculation error, extremely sensitive stability during semi-submersion maneuvers, considerable potential damage in case of improperly secured cargo shifting, high technical complexity of each loading operation.",
      p7:"Highly specialized sector with a limited global fleet, particularly valued transport engineering expertise, often unique and logistically complex projects offering a highly differentiated professional experience.",
      p8:"Some semi-submersible heavy lift vessels can carry other entire ships, including submarines or complete oil platforms, by partially submerging to let them float above their deck before resurfacing.",
    },
    es:{
      title:"Buque de transporte de cargas pesadas",
      p0:"El buque de transporte de cargas pesadas transporta cargas excepcionales imposibles de cargar en un buque convencional: módulos industriales, secciones de plataformas offshore, e incluso otros buques enteros. Empuja los límites del transporte marítimo convencional.",
      p1:"Transportar cargas fuera de norma en peso, volumen o dimensiones (módulos industriales, estructuras offshore, yates, otros buques), a menudo mediante técnicas de carga específicas como la semisumersión o el rodaje reforzado.",
      p2:"Longitud: de 100 m a más de 250 m según el modelo. Algunos buques son semisumergibles, capaces de sumergirse parcialmente para cargar una carga flotante directamente en su cubierta, y luego volver a la superficie. Grúas de a bordo de muy alta capacidad en algunos modelos (varios cientos de toneladas). Algunas unidades no poseen grúas y están especializadas exclusivamente en operaciones de semisumersión, mientras que otras combinan grúas de muy alta capacidad y transporte de cargas pesadas.",
      p3:"Deck Department (navegación, operaciones de carga de cargas excepcionales), Engine Department (propulsión, sistemas de lastre para las maniobras de semisumersión), con una experiencia especializada en el cálculo de distribución de carga y la ingeniería de transporte.",
      p4:"Master, Chief Officer (responsable del plan de carga de cargas excepcionales), Cargo Superintendent / Marine Warranty Surveyor (según el proyecto y la empresa), Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Cálculo preciso de la distribución del peso para cargas fuera de norma, verificación de la resistencia del casco y de los límites de carga de la cubierta antes de la carga, operaciones de semisumersión para la carga flotante, estiba reforzada de cargas excepcionales, coordinación estrecha con equipos de ingeniería en tierra para proyectos complejos.",
      p6:"Riesgos estructurales importantes en caso de error de cálculo de carga, estabilidad extremadamente sensible durante las maniobras de semisumersión, daños potenciales considerables en caso de desplazamiento de carga mal estibada, elevada complejidad técnica de cada operación de carga.",
      p7:"Sector de muy alta especialización con una flota mundial limitada, experiencia en ingeniería de transporte particularmente valorada, proyectos a menudo únicos y logísticamente complejos que ofrecen una experiencia profesional muy diferenciadora.",
      p8:"Algunos buques semisumergibles de transporte de cargas pesadas pueden transportar otros buques enteros, incluidos submarinos o plataformas petroleras completas, sumergiéndose parcialmente para hacerlos flotar sobre su cubierta antes de volver a la superficie.",
    },
    pt:{
      title:"Navio de transporte de cargas pesadas",
      p0:"O navio de transporte de cargas pesadas transporta cargas excecionais impossíveis de carregar num navio convencional: módulos industriais, secções de plataformas offshore, e até outros navios inteiros. Ultrapassa os limites do transporte marítimo convencional.",
      p1:"Transportar cargas fora do padrão em peso, volume ou dimensões (módulos industriais, estruturas offshore, iates, outros navios), frequentemente através de técnicas de carga específicas como a semissubmersão ou o rolamento reforçado.",
      p2:"Comprimento: de 100 m a mais de 250 m consoante o modelo. Alguns navios são semissubmersíveis, capazes de submergir parcialmente para carregar uma carga flutuante diretamente no seu convés, e depois voltar à superfície. Gruas de bordo de capacidade muito elevada em alguns modelos (várias centenas de toneladas). Algumas unidades não possuem gruas e são especializadas exclusivamente em operações de semissubmersão, enquanto outras combinam gruas de capacidade muito elevada e transporte de cargas pesadas.",
      p3:"Deck Department (navegação, operações de carga de cargas excecionais), Engine Department (propulsão, sistemas de lastro para as manobras de semissubmersão), com uma experiência especializada no cálculo de distribuição de carga e na engenharia de transporte.",
      p4:"Master, Chief Officer (responsável pelo plano de carga de cargas excecionais), Cargo Superintendent / Marine Warranty Surveyor (consoante o projeto e a empresa), Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Cálculo preciso da distribuição do peso para cargas fora do padrão, verificação da resistência do casco e dos limites de carga do convés antes do carregamento, operações de semissubmersão para a carga flutuante, estivagem reforçada de cargas excecionais, coordenação estreita com equipas de engenharia em terra para projetos complexos.",
      p6:"Riscos estruturais importantes em caso de erro de cálculo de carga, estabilidade extremamente sensível durante as manobras de semissubmersão, danos potenciais consideráveis em caso de deslocamento de carga mal estivada, elevada complexidade técnica de cada operação de carga.",
      p7:"Setor de altíssima especialização com uma frota mundial limitada, experiência em engenharia de transporte particularmente valorizada, projetos frequentemente únicos e logisticamente complexos oferecendo uma experiência profissional muito diferenciadora.",
      p8:"Alguns navios semissubmersíveis de transporte de cargas pesadas podem transportar outros navios inteiros, incluindo submarinos ou plataformas petrolíferas completas, submergindo parcialmente para os fazer flutuar sobre o seu convés antes de voltarem à superfície.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function HeavyLift({ lang="fr" }) {
  const lc = getContent(lang);
  const L = SECTION_LABELS[lang]||SECTION_LABELS.fr;

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",position:"relative"}}>
      <div style={{padding:"28px 16px 40px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(26,111,212,0.15)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.blue2,fontWeight:700}}>🚢 Ships Library</div>
          <div style={{marginBottom:14,borderRadius:16,overflow:"hidden",border:`1px solid ${C.border}`}}><HeavyLiftSVG/></div>
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
