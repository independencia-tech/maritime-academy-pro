// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "cable_layer"
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
      title:"Câblier",
      p0:"Le câblier pose, entretient et répare les câbles sous-marins de télécommunications et d'énergie qui relient les continents. C'est un navire hautement spécialisé, à l'origine d'une infrastructure invisible mais essentielle au monde connecté.",
      p1:"Poser de nouveaux câbles sous-marins (fibre optique, câbles électriques) selon un tracé prédéfini, ou localiser et réparer des câbles endommagés, en assurant une pose précise et une protection adaptée au fond marin traversé.",
      p2:"Longueur : de 100 m à environ 150 m selon les modèles. Grandes cales à câbles (cable tanks) permettant de stocker plusieurs milliers de kilomètres de câble. Équipé de machines de pose et de récupération de câble, ainsi que de véhicules sous-marins téléguidés (ROV) pour les opérations de réparation en eaux profondes.",
      p3:"Deck Department (navigation, opérations de pose et récupération de câble), Engine Department (propulsion, souvent avec positionnement dynamique pour une pose précise), et une équipe technique spécialisée en télécommunications ou en génie électrique selon le type de câble posé.",
      p4:"Master, Chief Officer, Officer of the Watch (qualifié DP lorsqu'il opère sur des navires à positionnement dynamique), Cable Engineer (spécialiste technique du câble), Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Pose de câble à vitesse contrôlée en suivant un tracé GPS précis, ensouillage du câble dans le fond marin pour le protéger lorsque les conditions du fond ou les spécifications du projet l'exigent, localisation de défauts sur câbles existants via ROV, réparation par jonction de câble en mer.",
      p6:"Précision extrême requise lors de la pose pour éviter tout dommage au câble, risques liés aux opérations avec des ROV en grande profondeur, tension mécanique élevée sur le câble lors du déploiement ou de la récupération, zones d'opération parfois isolées et météorologiquement exigeantes.",
      p7:"Secteur de très haute spécialisation avec peu d'unités dans le monde, expertise technique rare et généralement bien rémunérée, forte croissance du secteur liée à l'expansion continue des réseaux de télécommunications sous-marins mondiaux.",
      p8:"Plus de 95% du trafic internet intercontinental transite par des câbles sous-marins posés et entretenus par des câbliers. Un seul câble transatlantique moderne peut transporter des dizaines de terabits de données par seconde, rendant sa pose et sa maintenance stratégiquement critiques.",
    },
    en:{
      title:"Cable Layer",
      p0:"The cable layer lays, maintains, and repairs the submarine telecommunications and power cables that connect continents. It is a highly specialized vessel, behind an invisible but essential infrastructure for the connected world.",
      p1:"Lay new submarine cables (fiber optic, power cables) along a predefined route, or locate and repair damaged cables, ensuring precise laying and protection adapted to the seabed crossed.",
      p2:"Length: from 100 m to about 150 m depending on model. Large cable tanks allowing storage of several thousand kilometers of cable. Equipped with cable laying and recovery machinery, as well as remotely operated vehicles (ROVs) for deep-water repair operations.",
      p3:"Deck Department (navigation, cable laying and recovery operations), Engine Department (propulsion, often with dynamic positioning for precise laying), and a specialized technical team in telecommunications or electrical engineering depending on the type of cable laid.",
      p4:"Master, Chief Officer, Officer of the Watch (DP-qualified when operating on dynamically positioned vessels), Cable Engineer (technical cable specialist), Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Laying cable at controlled speed following a precise GPS route, burying cable in the seabed for protection when required by the seabed conditions or the project specifications, locating faults on existing cables via ROV, repairing by cable splicing at sea.",
      p6:"Extreme precision required during laying to avoid any cable damage, risks related to ROV operations at great depth, high mechanical tension on the cable during deployment or recovery, sometimes isolated and weather-demanding operating areas.",
      p7:"Highly specialized sector with few units worldwide, rare and generally well-paid technical expertise, strong sector growth linked to the continuous expansion of global submarine telecommunications networks.",
      p8:"Over 95% of intercontinental internet traffic passes through submarine cables laid and maintained by cable layers. A single modern transatlantic cable can carry tens of terabits of data per second, making its laying and maintenance strategically critical.",
    },
    es:{
      title:"Cablero",
      p0:"El cablero coloca, mantiene y repara los cables submarinos de telecomunicaciones y energía que conectan los continentes. Es un buque altamente especializado, detrás de una infraestructura invisible pero esencial para el mundo conectado.",
      p1:"Colocar nuevos cables submarinos (fibra óptica, cables eléctricos) siguiendo una ruta predefinida, o localizar y reparar cables dañados, asegurando una colocación precisa y una protección adaptada al fondo marino atravesado.",
      p2:"Longitud: de 100 m a unos 150 m según el modelo. Grandes tanques de cable (cable tanks) que permiten almacenar varios miles de kilómetros de cable. Equipado con maquinaria de colocación y recuperación de cable, así como vehículos submarinos teledirigidos (ROV) para las operaciones de reparación en aguas profundas.",
      p3:"Deck Department (navegación, operaciones de colocación y recuperación de cable), Engine Department (propulsión, a menudo con posicionamiento dinámico para una colocación precisa), y un equipo técnico especializado en telecomunicaciones o ingeniería eléctrica según el tipo de cable colocado.",
      p4:"Master, Chief Officer, Officer of the Watch (cualificado en DP cuando opera en buques con posicionamiento dinámico), Cable Engineer (especialista técnico del cable), Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Colocación de cable a velocidad controlada siguiendo una ruta GPS precisa, enterramiento del cable en el fondo marino para protegerlo cuando lo exijan las condiciones del fondo o las especificaciones del proyecto, localización de fallos en cables existentes mediante ROV, reparación por empalme de cable en el mar.",
      p6:"Precisión extrema requerida durante la colocación para evitar cualquier daño al cable, riesgos relacionados con las operaciones con ROV en gran profundidad, alta tensión mecánica en el cable durante el despliegue o la recuperación, zonas de operación a veces aisladas y meteorológicamente exigentes.",
      p7:"Sector de muy alta especialización con pocas unidades en el mundo, experiencia técnica escasa y generalmente bien remunerada, fuerte crecimiento del sector vinculado a la expansión continua de las redes mundiales de telecomunicaciones submarinas.",
      p8:"Más del 95% del tráfico de internet intercontinental transita por cables submarinos colocados y mantenidos por cableros. Un solo cable transatlántico moderno puede transportar decenas de terabits de datos por segundo, lo que hace que su colocación y mantenimiento sean estratégicamente críticos.",
    },
    pt:{
      title:"Cabo-lançador",
      p0:"O cabo-lançador coloca, mantém e repara os cabos submarinos de telecomunicações e energia que ligam os continentes. É um navio altamente especializado, por detrás de uma infraestrutura invisível mas essencial para o mundo conectado.",
      p1:"Colocar novos cabos submarinos (fibra ótica, cabos elétricos) seguindo um traçado predefinido, ou localizar e reparar cabos danificados, assegurando uma colocação precisa e uma proteção adaptada ao fundo marinho atravessado.",
      p2:"Comprimento: de 100 m a cerca de 150 m consoante o modelo. Grandes tanques de cabo (cable tanks) que permitem armazenar vários milhares de quilómetros de cabo. Equipado com maquinaria de colocação e recuperação de cabo, bem como veículos submarinos telecomandados (ROV) para as operações de reparação em águas profundas.",
      p3:"Deck Department (navegação, operações de colocação e recuperação de cabo), Engine Department (propulsão, frequentemente com posicionamento dinâmico para uma colocação precisa), e uma equipa técnica especializada em telecomunicações ou engenharia elétrica consoante o tipo de cabo colocado.",
      p4:"Master, Chief Officer, Officer of the Watch (qualificado em DP quando opera em navios com posicionamento dinâmico), Cable Engineer (especialista técnico do cabo), Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Colocação de cabo a velocidade controlada seguindo um traçado GPS preciso, enterramento do cabo no fundo marinho para o proteger quando exigido pelas condições do fundo ou pelas especificações do projeto, localização de falhas em cabos existentes através de ROV, reparação por junção de cabo no mar.",
      p6:"Precisão extrema exigida durante a colocação para evitar qualquer dano ao cabo, riscos relacionados com as operações com ROV em grande profundidade, elevada tensão mecânica no cabo durante a implantação ou a recuperação, zonas de operação por vezes isoladas e meteorologicamente exigentes.",
      p7:"Setor de altíssima especialização com poucas unidades no mundo, experiência técnica rara e geralmente bem remunerada, forte crescimento do setor ligado à expansão contínua das redes mundiais de telecomunicações submarinas.",
      p8:"Mais de 95% do tráfego de internet intercontinental transita por cabos submarinos colocados e mantidos por cabo-lançadores. Um único cabo transatlântico moderno pode transportar dezenas de terabits de dados por segundo, tornando a sua colocação e manutenção estrategicamente críticas.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function CableLayer({ lang="fr" }) {
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
