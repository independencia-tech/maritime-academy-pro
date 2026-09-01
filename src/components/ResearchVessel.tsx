// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "research_vessel"
// Standalone documentary component: no Dashboard/progression/billing dependency.
import { C, Card, SL, GLine } from "./LessonShared";
import { ResearchVesselSVG } from "./ShipIllustrations";

const SECTION_LABELS = {
  fr: { profile:"Fiche navire", mission:"Mission", characteristics:"Caractéristiques générales", departments:"Départements à bord", positions:"Postes typiques", operations:"Opérations typiques", risks:"Risques principaux", careers:"Débouchés professionnels", facts:"Anecdotes" },
  en: { profile:"Ship Profile", mission:"Mission", characteristics:"General Characteristics", departments:"Onboard Departments", positions:"Typical Positions", operations:"Typical Operations", risks:"Main Risks", careers:"Career Opportunities", facts:"Interesting Facts" },
  es: { profile:"Ficha del buque", mission:"Misión", characteristics:"Características generales", departments:"Departamentos a bordo", positions:"Puestos típicos", operations:"Operaciones típicas", risks:"Riesgos principales", careers:"Oportunidades profesionales", facts:"Datos curiosos" },
  pt: { profile:"Ficha do navio", mission:"Missão", characteristics:"Características gerais", departments:"Departamentos a bordo", positions:"Cargos típicos", operations:"Operações típicas", risks:"Riscos principais", careers:"Oportunidades profissionais", facts:"Curiosidades" },
};

const getContent = lang => {
  const d = {
    fr:{
      title:"Navire de recherche océanographique",
      p0:"Le navire de recherche océanographique embarque des scientifiques et des équipements spécialisés pour l'étude des océans, des fonds marins et du climat. C'est un navire hybride, à mi-chemin entre exploitation maritime classique et plateforme scientifique.",
      p1:"Soutenir des missions de recherche scientifique en mer : océanographie, biologie marine, géologie sous-marine, climatologie, cartographie des fonds, en fournissant plateforme stable, énergie et logistique aux équipes scientifiques embarquées.",
      p2:"Longueur : de 30 m pour les unités côtières à plus de 100 m pour les navires hauturiers. Équipements spécialisés : sondeurs multifaisceaux, laboratoires embarqués, grues et treuils océanographiques, système de positionnement dynamique pour les prélèvements de précision, moon pool parfois présent pour le déploiement d'instruments.",
      p3:"Deck Department (navigation, manœuvres de déploiement d'instruments scientifiques), Engine Department (propulsion, souvent conçue pour un fonctionnement silencieux limitant les interférences avec les instruments acoustiques), et une équipe scientifique embarquée distincte de l'équipage maritime.",
      p4:"Master, Chief Officer, Officer of the Watch, Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer, ainsi que Chief Scientist et techniciens scientifiques qui ne relèvent pas de la hiérarchie maritime.",
      p5:"Déploiement et récupération d'instruments océanographiques (sondes, filets, carottiers), navigation de précision pour le suivi de transects scientifiques, positionnement stable pour prélèvements, coordination étroite entre équipage et équipe scientifique.",
      p6:"Risques liés à la manutention d'équipements scientifiques lourds ou fragiles en mer, exposition à des zones parfois isolées ou polaires selon la mission, nécessité de manœuvres très précises malgré des conditions météo parfois difficiles, cohabitation à gérer entre culture maritime et culture scientifique à bord.",
      p7:"Secteur offrant une expérience professionnelle particulièrement enrichissante et variée, exposition à des missions scientifiques uniques (Arctique, Antarctique, grands fonds), généralement apprécié pour son caractère non-répétitif comparé au commerce classique.",
      p8:"Certains navires de recherche peuvent rester en mer plusieurs mois consécutifs lors de missions polaires, totalement autonomes en énergie et en approvisionnement. Le moon pool, une ouverture verticale dans la coque, permet de déployer des instruments directement sous le navire, à l'abri des vagues.",
    },
    en:{
      title:"Oceanographic Research Vessel",
      p0:"The oceanographic research vessel carries scientists and specialized equipment to study the oceans, seabed, and climate. It is a hybrid ship, halfway between conventional maritime operation and a scientific platform.",
      p1:"Support scientific research missions at sea: oceanography, marine biology, underwater geology, climatology, seabed mapping, by providing a stable platform, power, and logistics to embarked scientific teams.",
      p2:"Length: from 30 m for coastal units to over 100 m for ocean-going vessels. Specialized equipment: multibeam echosounders, onboard laboratories, oceanographic cranes and winches, dynamic positioning system for precision sampling, sometimes a moon pool for instrument deployment.",
      p3:"Deck Department (navigation, scientific instrument deployment maneuvers), Engine Department (propulsion, often designed for quiet operation to limit interference with acoustic instruments), and a distinct embarked scientific team separate from the maritime crew.",
      p4:"Master, Chief Officer, Officer of the Watch, Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer, as well as Chief Scientist and scientific technicians outside the maritime hierarchy.",
      p5:"Deploying and recovering oceanographic instruments (probes, nets, corers), precision navigation for tracking scientific transects, stable positioning for sampling, close coordination between crew and scientific team.",
      p6:"Risks related to handling heavy or fragile scientific equipment at sea, exposure to sometimes isolated or polar areas depending on the mission, need for very precise maneuvers despite sometimes difficult weather conditions, managing the cohabitation between maritime and scientific cultures on board.",
      p7:"Sector offering particularly enriching and varied professional experience, exposure to unique scientific missions (Arctic, Antarctic, deep sea), generally appreciated for its non-repetitive nature compared to conventional trade.",
      p8:"Some research vessels can remain at sea for several consecutive months during polar missions, fully self-sufficient in power and supplies. The moon pool, a vertical opening in the hull, allows instruments to be deployed directly beneath the ship, sheltered from waves.",
    },
    es:{
      title:"Buque de investigación oceanográfica",
      p0:"El buque de investigación oceanográfica embarca científicos y equipos especializados para el estudio de los océanos, los fondos marinos y el clima. Es un buque híbrido, a medio camino entre la explotación marítima clásica y una plataforma científica.",
      p1:"Apoyar misiones de investigación científica en el mar: oceanografía, biología marina, geología submarina, climatología, cartografía de fondos, proporcionando una plataforma estable, energía y logística a los equipos científicos embarcados.",
      p2:"Longitud: de 30 m para las unidades costeras a más de 100 m para los buques de altura. Equipos especializados: sondas multihaz, laboratorios a bordo, grúas y chigres oceanográficos, sistema de posicionamiento dinámico para muestreos de precisión, a veces un moon pool para el despliegue de instrumentos.",
      p3:"Deck Department (navegación, maniobras de despliegue de instrumentos científicos), Engine Department (propulsión, a menudo diseñada para un funcionamiento silencioso que limite las interferencias con los instrumentos acústicos), y un equipo científico embarcado distinto de la tripulación marítima.",
      p4:"Master, Chief Officer, Officer of the Watch, Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer, así como Chief Scientist y técnicos científicos que no dependen de la jerarquía marítima.",
      p5:"Despliegue y recuperación de instrumentos oceanográficos (sondas, redes, testigos), navegación de precisión para el seguimiento de transectos científicos, posicionamiento estable para muestreos, coordinación estrecha entre la tripulación y el equipo científico.",
      p6:"Riesgos relacionados con la manipulación de equipos científicos pesados o frágiles en el mar, exposición a zonas a veces aisladas o polares según la misión, necesidad de maniobras muy precisas a pesar de condiciones meteorológicas a veces difíciles, gestión de la convivencia entre cultura marítima y cultura científica a bordo.",
      p7:"Sector que ofrece una experiencia profesional particularmente enriquecedora y variada, exposición a misiones científicas únicas (Ártico, Antártico, grandes profundidades), generalmente apreciado por su carácter no repetitivo en comparación con el comercio clásico.",
      p8:"Algunos buques de investigación pueden permanecer en el mar varios meses consecutivos durante misiones polares, totalmente autónomos en energía y suministros. El moon pool, una abertura vertical en el casco, permite desplegar instrumentos directamente bajo el buque, al abrigo de las olas.",
    },
    pt:{
      title:"Navio de investigação oceanográfica",
      p0:"O navio de investigação oceanográfica embarca cientistas e equipamentos especializados para o estudo dos oceanos, dos fundos marinhos e do clima. É um navio híbrido, a meio caminho entre a exploração marítima clássica e uma plataforma científica.",
      p1:"Apoiar missões de investigação científica no mar: oceanografia, biologia marinha, geologia submarina, climatologia, cartografia de fundos, fornecendo uma plataforma estável, energia e logística às equipas científicas embarcadas.",
      p2:"Comprimento: de 30 m para as unidades costeiras a mais de 100 m para os navios de longo curso. Equipamentos especializados: sondas multifeixe, laboratórios a bordo, gruas e guinchos oceanográficos, sistema de posicionamento dinâmico para amostragens de precisão, por vezes um moon pool para a implantação de instrumentos.",
      p3:"Deck Department (navegação, manobras de implantação de instrumentos científicos), Engine Department (propulsão, frequentemente concebida para um funcionamento silencioso que limite as interferências com os instrumentos acústicos), e uma equipa científica embarcada distinta da tripulação marítima.",
      p4:"Master, Chief Officer, Officer of the Watch, Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer, bem como Chief Scientist e técnicos científicos que não dependem da hierarquia marítima.",
      p5:"Implantação e recuperação de instrumentos oceanográficos (sondas, redes, testemunhos), navegação de precisão para o seguimento de transectos científicos, posicionamento estável para amostragens, coordenação estreita entre a tripulação e a equipa científica.",
      p6:"Riscos relacionados com o manuseamento de equipamentos científicos pesados ou frágeis no mar, exposição a zonas por vezes isoladas ou polares consoante a missão, necessidade de manobras muito precisas apesar de condições meteorológicas por vezes difíceis, gestão da convivência entre cultura marítima e cultura científica a bordo.",
      p7:"Setor que oferece uma experiência profissional particularmente enriquecedora e variada, exposição a missões científicas únicas (Ártico, Antártico, grandes profundidades), geralmente apreciado pelo seu caráter não repetitivo em comparação com o comércio clássico.",
      p8:"Alguns navios de investigação podem permanecer no mar vários meses consecutivos durante missões polares, totalmente autónomos em energia e abastecimentos. O moon pool, uma abertura vertical no casco, permite implantar instrumentos diretamente sob o navio, ao abrigo das ondas.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function ResearchVessel({ lang="fr" }) {
  const lc = getContent(lang);
  const L = SECTION_LABELS[lang]||SECTION_LABELS.fr;

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",position:"relative"}}>
      <div style={{padding:"28px 16px 40px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(26,111,212,0.15)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.blue2,fontWeight:700}}>🚢 Ships Library</div>
          <div style={{marginBottom:14,borderRadius:16,overflow:"hidden",border:`1px solid ${C.border}`}}><ResearchVesselSVG/></div>
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
