// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "bulk_carrier"
// Standalone documentary component: no Dashboard/progression/billing dependency.
import { C, Card, SL, GLine } from "./LessonShared";
import { BulkCarrierSVG } from "./ShipIllustrations";

const SECTION_LABELS = {
  fr: { profile:"Fiche navire", mission:"Mission", characteristics:"Caractéristiques générales", departments:"Départements à bord", positions:"Postes typiques", operations:"Opérations typiques", risks:"Risques principaux", careers:"Débouchés professionnels", facts:"Anecdotes" },
  en: { profile:"Ship Profile", mission:"Mission", characteristics:"General Characteristics", departments:"Onboard Departments", positions:"Typical Positions", operations:"Typical Operations", risks:"Main Risks", careers:"Career Opportunities", facts:"Interesting Facts" },
  es: { profile:"Ficha del buque", mission:"Misión", characteristics:"Características generales", departments:"Departamentos a bordo", positions:"Puestos típicos", operations:"Operaciones típicas", risks:"Riesgos principales", careers:"Oportunidades profesionales", facts:"Datos curiosos" },
  pt: { profile:"Ficha do navio", mission:"Missão", characteristics:"Características gerais", departments:"Departamentos a bordo", positions:"Cargos típicos", operations:"Operações típicas", risks:"Riscos principais", careers:"Oportunidades profissionais", facts:"Curiosidades" },
};

const getContent = lang => {
  const d = {
    fr:{
      title:"Vraquier",
      p0:"Le vraquier transporte des matières premières solides en vrac, sans emballage : minerai, charbon, céréales, engrais. C'est l'un des types de navires les plus nombreux au monde, colonne vertébrale du commerce international des matières premières.",
      p1:"Transporter de grandes quantités de matières premières sèches non conditionnées entre sites d'extraction/production et sites de transformation ou de consommation, souvent sur de longues distances océaniques.",
      p2:"Longueur : de 150 m (Handysize) à plus de 360 m (Valemax). Capacité : de 30 000 à plus de 400 000 tonnes de port en lourd (DWT) selon la catégorie (Handysize, Panamax, Capesize, Valemax). Cales larges et non cloisonnées, optimisées pour un chargement en vrac rapide.",
      p3:"Deck Department (navigation, opérations de cargaison en vrac, sécurité), Engine Department (propulsion, systèmes auxiliaires), avec une vigilance particulière portée à la stabilité et à la répartition de la cargaison entre les cales.",
      p4:"Master, Chief Officer (responsable du plan de chargement et de la stabilité), Officer of the Watch, Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Chargement/déchargement via portiques ou grues portuaires spécialisées, contrôle de la répartition du poids entre cales pour éviter tout stress excessif sur la coque, surveillance de l'humidité et de la liquéfaction potentielle de certaines cargaisons (minerai fin, par exemple).",
      p6:"Liquéfaction de cargaison humide pouvant provoquer un glissement soudain et un risque de chavirement, stress structurel de la coque en cas de mauvaise répartition du chargement, poussières inhalables lors des opérations de cargaison, risque d'effondrement de cargaison mal arrimée.",
      p7:"Secteur offrant un grand nombre de postes du fait de la taille de la flotte mondiale de vraquiers, bonne opportunité d'entrée dans la marine marchande avec une charge de travail généralement plus prévisible qu'en cargaison conteneurisée.",
      p8:"Le vraquier représente la plus grande catégorie de navires marchands au monde en nombre d'unités. La liquéfaction de cargaison est l'une des principales causes de pertes de vraquiers en mer, ce qui a conduit à des règles strictes de test d'humidité avant chargement (Code IMSBC).",
    },
    en:{
      title:"Bulk Carrier",
      p0:"The bulk carrier transports solid raw materials in bulk, without packaging: ore, coal, grain, fertilizer. It is one of the most numerous ship types in the world, the backbone of international raw materials trade.",
      p1:"Transport large quantities of unpackaged dry raw materials between extraction/production sites and processing or consumption sites, often over long ocean distances.",
      p2:"Length: from 150 m (Handysize) to over 360 m (Valemax). Capacity: from 30,000 to over 400,000 deadweight tonnes (DWT) depending on category (Handysize, Panamax, Capesize, Valemax). Wide, unpartitioned holds, optimized for fast bulk loading.",
      p3:"Deck Department (navigation, bulk cargo operations, safety), Engine Department (propulsion, auxiliary systems), with particular attention to stability and cargo distribution between holds.",
      p4:"Master, Chief Officer (responsible for the loading plan and stability), Officer of the Watch, Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Loading/unloading via shore cranes or specialized port gantries, monitoring weight distribution between holds to avoid excessive hull stress, monitoring moisture and potential liquefaction of certain cargoes (fine ore, for example).",
      p6:"Liquefaction of wet cargo that can cause sudden shifting and capsizing risk, structural hull stress from poor load distribution, inhalable dust during cargo operations, risk of collapse from improperly stowed cargo.",
      p7:"Sector offering a large number of positions due to the size of the global bulk carrier fleet, good entry opportunity into the merchant marine with a generally more predictable workload than in containerized cargo.",
      p8:"The bulk carrier represents the largest category of merchant ships in the world by number of units. Cargo liquefaction is one of the leading causes of bulk carrier losses at sea, which has led to strict moisture testing rules before loading (IMSBC Code).",
    },
    es:{
      title:"Granelero",
      p0:"El granelero transporta materias primas sólidas a granel, sin embalaje: mineral, carbón, cereales, fertilizantes. Es uno de los tipos de buque más numerosos del mundo, columna vertebral del comercio internacional de materias primas.",
      p1:"Transportar grandes cantidades de materias primas secas sin embalar entre sitios de extracción/producción y sitios de transformación o consumo, a menudo en largas distancias oceánicas.",
      p2:"Longitud: de 150 m (Handysize) a más de 360 m (Valemax). Capacidad: de 30.000 a más de 400.000 toneladas de peso muerto (DWT) según la categoría (Handysize, Panamax, Capesize, Valemax). Bodegas amplias y sin compartimentar, optimizadas para una carga a granel rápida.",
      p3:"Deck Department (navegación, operaciones de carga a granel, seguridad), Engine Department (propulsión, sistemas auxiliares), con especial atención a la estabilidad y la distribución de la carga entre bodegas.",
      p4:"Master, Chief Officer (responsable del plan de carga y la estabilidad), Officer of the Watch, Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Carga/descarga mediante grúas de muelle o grúas portuarias especializadas, control de la distribución del peso entre bodegas para evitar un estrés excesivo en el casco, vigilancia de la humedad y la posible licuefacción de ciertas cargas (mineral fino, por ejemplo).",
      p6:"Licuefacción de carga húmeda que puede provocar un desplazamiento repentino y riesgo de vuelco, estrés estructural del casco en caso de mala distribución de la carga, polvo inhalable durante las operaciones de carga, riesgo de colapso de carga mal estibada.",
      p7:"Sector que ofrece un gran número de puestos dado el tamaño de la flota mundial de graneleros, buena oportunidad de entrada en la marina mercante con una carga de trabajo generalmente más predecible que en carga contenedorizada.",
      p8:"El granelero representa la mayor categoría de buques mercantes del mundo en número de unidades. La licuefacción de carga es una de las principales causas de pérdida de graneleros en el mar, lo que ha llevado a normas estrictas de prueba de humedad antes de la carga (Código IMSBC).",
    },
    pt:{
      title:"Graneleiro",
      p0:"O graneleiro transporta matérias-primas sólidas a granel, sem embalagem: minério, carvão, cereais, fertilizantes. É um dos tipos de navio mais numerosos do mundo, espinha dorsal do comércio internacional de matérias-primas.",
      p1:"Transportar grandes quantidades de matérias-primas secas sem embalagem entre locais de extração/produção e locais de transformação ou consumo, frequentemente em longas distâncias oceânicas.",
      p2:"Comprimento: de 150 m (Handysize) a mais de 360 m (Valemax). Capacidade: de 30.000 a mais de 400.000 toneladas de porte bruto (DWT) consoante a categoria (Handysize, Panamax, Capesize, Valemax). Porões amplos e sem compartimentação, otimizados para um carregamento a granel rápido.",
      p3:"Deck Department (navegação, operações de carga a granel, segurança), Engine Department (propulsão, sistemas auxiliares), com atenção especial à estabilidade e à distribuição da carga entre os porões.",
      p4:"Master, Chief Officer (responsável pelo plano de carga e estabilidade), Officer of the Watch, Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Carregamento/descarregamento através de gruas de cais ou gruas portuárias especializadas, controlo da distribuição do peso entre porões para evitar um esforço excessivo no casco, vigilância da humidade e da possível liquefação de certas cargas (minério fino, por exemplo).",
      p6:"Liquefação de carga húmida que pode provocar um deslocamento súbito e risco de emborcamento, esforço estrutural do casco em caso de má distribuição da carga, poeiras inaláveis durante as operações de carga, risco de colapso de carga mal estivada.",
      p7:"Setor que oferece um grande número de postos dado o tamanho da frota mundial de graneleiros, boa oportunidade de entrada na marinha mercante com uma carga de trabalho geralmente mais previsível do que em carga contentorizada.",
      p8:"O graneleiro representa a maior categoria de navios mercantes do mundo em número de unidades. A liquefação de carga é uma das principais causas de perda de graneleiros no mar, o que levou a regras rigorosas de teste de humidade antes do carregamento (Código IMSBC).",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function BulkCarrier({ lang="fr" }) {
  const lc = getContent(lang);
  const L = SECTION_LABELS[lang]||SECTION_LABELS.fr;

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",position:"relative"}}>
      <div style={{padding:"28px 16px 40px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(26,111,212,0.15)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.blue2,fontWeight:700}}>🚢 Ships Library</div>
          <div style={{marginBottom:14,borderRadius:16,overflow:"hidden",border:`1px solid ${C.border}`}}><BulkCarrierSVG/></div>
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
