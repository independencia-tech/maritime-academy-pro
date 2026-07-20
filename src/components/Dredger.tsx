// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "dredger"
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
      title:"Drague",
      p0:"La drague excave et déplace des sédiments du fond marin ou fluvial, essentielle au maintien des chenaux navigables et à la création de nouvelles terres. C'est un navire d'ingénierie maritime plus qu'un navire de transport.",
      p1:"Maintenir la profondeur des chenaux de navigation, ports et voies fluviales en excavant les sédiments accumulés, ou créer de nouvelles surfaces terrestres par remblaiement (poldérisation, extension portuaire).",
      p2:"Longueur : de 30 m pour les petites dragues à plus de 200 m pour les plus grandes dragues aspiratrices. Équipements spécifiques selon le type : drague à godets, drague suceuse-porteuse (avec cale à sédiments), ou drague stationnaire reliée à une conduite de refoulement.",
      p3:"Deck Department (navigation, opérations de dragage), Engine Department (propulsion, systèmes de pompage à très haute puissance), avec une expertise spécifique en gestion des opérations d'excavation et de refoulement des sédiments.",
      p4:"Master, Chief Officer (responsable des opérations de dragage), Dredge Master / Dredging Superintendent (selon l'entreprise et le type de drague), Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Excavation continue de sédiments via godets, suceuses ou pompes, transport et déchargement des sédiments (en cale, par refoulement ou par clapage en mer), surveillance constante de la stabilité pendant le chargement de la cale à sédiments.",
      p6:"Stabilité compromise par le chargement asymétrique ou excessif de la cale à sédiments, risques mécaniques liés aux équipements de pompage à très haute puissance, exposition à des sédiments potentiellement pollués selon les zones draguées, opérations souvent répétitives dans des zones à fort trafic portuaire.",
      p7:"Secteur de niche offrant une bonne stabilité d'emploi du fait de la demande constante en entretien portuaire et fluvial dans le monde, expertise technique valorisée et transférable entre projets d'infrastructure maritime variés.",
      p8:"Les plus grandes dragues aspiratrices porteuses au monde peuvent extraire et transporter plusieurs dizaines de milliers de mètres cubes de sédiments en une seule rotation. Le dragage est essentiel à des projets emblématiques comme les îles artificielles ou l'extension de grands ports internationaux.",
    },
    en:{
      title:"Dredger",
      p0:"The dredger excavates and moves sediment from the seabed or riverbed, essential for maintaining navigable channels and creating new land. It is a maritime engineering vessel more than a transport ship.",
      p1:"Maintain the depth of navigation channels, ports, and waterways by excavating accumulated sediment, or create new land surfaces through land reclamation (polderization, port extension).",
      p2:"Length: from 30 m for small dredgers to over 200 m for the largest trailing suction hopper dredgers. Specific equipment depending on type: bucket dredger, trailing suction hopper dredger (with sediment hold), or stationary dredger connected to a discharge pipeline.",
      p3:"Deck Department (navigation, dredging operations), Engine Department (propulsion, very high-power pumping systems), with specific expertise in managing excavation and sediment discharge operations.",
      p4:"Master, Chief Officer (responsible for dredging operations), Dredge Master / Dredging Superintendent (depending on company and dredger type), Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Continuous sediment excavation via buckets, suction pipes, or pumps, transporting and discharging sediment (in hold, via pipeline, or by dumping at sea), constant stability monitoring during hopper loading.",
      p6:"Stability compromised by asymmetric or excessive hopper loading, mechanical risks related to very high-power pumping equipment, exposure to potentially contaminated sediment depending on dredged areas, often repetitive operations in high-traffic port areas.",
      p7:"Niche sector offering good job stability due to constant demand for port and river maintenance worldwide, valued technical expertise transferable between varied maritime infrastructure projects.",
      p8:"The largest trailing suction hopper dredgers in the world can extract and transport tens of thousands of cubic meters of sediment in a single cycle. Dredging is essential to landmark projects such as artificial islands or the expansion of major international ports.",
    },
    es:{
      title:"Draga",
      p0:"La draga excava y desplaza sedimentos del fondo marino o fluvial, esencial para el mantenimiento de canales navegables y la creación de nuevas tierras. Es un buque de ingeniería marítima más que un buque de transporte.",
      p1:"Mantener la profundidad de los canales de navegación, puertos y vías fluviales excavando los sedimentos acumulados, o crear nuevas superficies terrestres mediante relleno (poldarización, extensión portuaria).",
      p2:"Longitud: de 30 m para las dragas pequeñas a más de 200 m para las mayores dragas de succión en marcha. Equipos específicos según el tipo: draga de cangilones, draga de succión en marcha con cántara (con bodega de sedimentos), o draga estacionaria conectada a una tubería de impulsión.",
      p3:"Deck Department (navegación, operaciones de dragado), Engine Department (propulsión, sistemas de bombeo de muy alta potencia), con una experiencia específica en la gestión de operaciones de excavación e impulsión de sedimentos.",
      p4:"Master, Chief Officer (responsable de las operaciones de dragado), Dredge Master / Dredging Superintendent (según la empresa y el tipo de draga), Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Excavación continua de sedimentos mediante cangilones, succión o bombas, transporte y descarga de sedimentos (en cántara, por impulsión o por vertido en el mar), vigilancia constante de la estabilidad durante la carga de la cántara.",
      p6:"Estabilidad comprometida por la carga asimétrica o excesiva de la cántara, riesgos mecánicos relacionados con equipos de bombeo de muy alta potencia, exposición a sedimentos potencialmente contaminados según las zonas dragadas, operaciones a menudo repetitivas en zonas de alto tráfico portuario.",
      p7:"Sector de nicho que ofrece buena estabilidad laboral debido a la demanda constante de mantenimiento portuario y fluvial en el mundo, experiencia técnica valorada y transferible entre proyectos variados de infraestructura marítima.",
      p8:"Las mayores dragas de succión en marcha del mundo pueden extraer y transportar varias decenas de miles de metros cúbicos de sedimentos en una sola rotación. El dragado es esencial para proyectos emblemáticos como las islas artificiales o la ampliación de grandes puertos internacionales.",
    },
    pt:{
      title:"Draga",
      p0:"A draga escava e desloca sedimentos do fundo marinho ou fluvial, essencial para a manutenção de canais navegáveis e a criação de novas terras. É um navio de engenharia marítima mais do que um navio de transporte.",
      p1:"Manter a profundidade dos canais de navegação, portos e vias fluviais escavando os sedimentos acumulados, ou criar novas superfícies terrestres através de aterro (poldarização, extensão portuária).",
      p2:"Comprimento: de 30 m para as dragas pequenas a mais de 200 m para as maiores dragas de sucção em marcha. Equipamentos específicos consoante o tipo: draga de caçambas, draga de sucção em marcha com porão (com porão de sedimentos), ou draga estacionária ligada a uma conduta de descarga.",
      p3:"Deck Department (navegação, operações de dragagem), Engine Department (propulsão, sistemas de bombagem de muito alta potência), com uma experiência específica na gestão das operações de escavação e descarga de sedimentos.",
      p4:"Master, Chief Officer (responsável pelas operações de dragagem), Dredge Master / Dredging Superintendent (consoante a empresa e o tipo de draga), Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Escavação contínua de sedimentos através de caçambas, sucção ou bombas, transporte e descarga de sedimentos (em porão, por descarga ou por despejo no mar), vigilância constante da estabilidade durante o carregamento do porão.",
      p6:"Estabilidade comprometida pelo carregamento assimétrico ou excessivo do porão, riscos mecânicos relacionados com equipamentos de bombagem de muito alta potência, exposição a sedimentos potencialmente poluídos consoante as zonas dragadas, operações frequentemente repetitivas em zonas de alto tráfego portuário.",
      p7:"Setor de nicho que oferece boa estabilidade de emprego devido à procura constante de manutenção portuária e fluvial no mundo, experiência técnica valorizada e transferível entre projetos variados de infraestrutura marítima.",
      p8:"As maiores dragas de sucção em marcha do mundo podem extrair e transportar várias dezenas de milhares de metros cúbicos de sedimentos numa única rotação. A dragagem é essencial para projetos emblemáticos como as ilhas artificiais ou a expansão de grandes portos internacionais.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function Dredger({ lang="fr" }) {
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
