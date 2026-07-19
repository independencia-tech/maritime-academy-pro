// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "lng_carrier"
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
      title:"Méthanier",
      p0:"Le méthanier transporte du gaz naturel liquéfié à -163°C dans des citernes cryogéniques spécialisées. C'est un des navires les plus techniquement exigeants de la marine marchande, en raison des contraintes extrêmes liées au maintien de la cargaison à très basse température.",
      p1:"Transporter du gaz naturel liquéfié entre sites de production/liquéfaction et terminaux de regazéification, en maintenant la cargaison à très basse température pendant toute la traversée.",
      p2:"Longueur : généralement entre 280 et 345 m. Capacité : de 125 000 à plus de 180 000 m³ de gaz liquéfié. Systèmes de confinement spécialisés (membrane ou citernes sphériques type Moss). Certains méthaniers récents utilisent le gaz évaporé (Boil-Off Gas) comme carburant propulsif.",
      p3:"Deck Department (navigation, opérations de cargaison spécialisées), Engine Department (propulsion, gestion du Boil-Off Gas, systèmes cryogéniques), avec une expertise technique renforcée requise pour la manipulation du gaz liquéfié.",
      p4:"Master, Chief Officer (responsable des opérations de cargaison cryogénique), Gas Engineer (spécialiste des systèmes de gaz), Officer of the Watch, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Refroidissement des citernes avant chargement, chargement/déchargement via bras cryogéniques, gestion continue du Boil-Off Gas (utilisé comme carburant ou reliquéfié), surveillance stricte des températures et pressions des citernes.",
      p6:"Risques cryogéniques (brûlures par le froid extrême, fragilisation des matériaux), risque d'explosion en cas de fuite de gaz, complexité des procédures d'urgence en cas de défaillance du système de confinement, exigences de formation spécifique très élevées.",
      p7:"Secteur de très haute spécialisation, officiers formés au gaz liquéfié particulièrement recherchés et généralement très bien rémunérés compte tenu de la rareté de cette expertise et de la criticité de la cargaison.",
      p8:"Le gaz naturel liquéfié occupe environ 1/600e du volume qu'il occuperait à l'état gazeux, ce qui rend son transport par méthanier économiquement viable sur de très longues distances. Certains méthaniers modernes peuvent naviguer avec zéro émission de Boil-Off Gas grâce à des systèmes de reliquéfaction avancés.",
    },
    en:{
      title:"LNG Carrier",
      p0:"The LNG carrier transports liquefied natural gas at -163°C in specialized cryogenic tanks. It is one of the most technically demanding ships in the merchant fleet, due to the extreme constraints of maintaining cargo at very low temperature.",
      p1:"Transport liquefied natural gas between production/liquefaction sites and regasification terminals, maintaining the cargo at very low temperature throughout the voyage.",
      p2:"Length: generally between 280 and 345 m. Capacity: from 125,000 to over 180,000 m³ of liquefied gas. Specialized containment systems (membrane or Moss-type spherical tanks). Some recent LNG carriers use Boil-Off Gas as propulsion fuel.",
      p3:"Deck Department (navigation, specialized cargo operations), Engine Department (propulsion, Boil-Off Gas management, cryogenic systems), with enhanced technical expertise required for handling liquefied gas.",
      p4:"Master, Chief Officer (responsible for cryogenic cargo operations), Gas Engineer (gas systems specialist), Officer of the Watch, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Cooling down tanks before loading, loading/unloading via cryogenic arms, continuous Boil-Off Gas management (used as fuel or reliquefied), strict monitoring of tank temperatures and pressures.",
      p6:"Cryogenic risks (frostbite burns from extreme cold, material embrittlement), explosion risk in case of gas leak, complexity of emergency procedures in case of containment system failure, very high specific training requirements.",
      p7:"Highly specialized sector, officers trained in liquefied gas particularly sought after and generally very well paid given the rarity of this expertise and the criticality of the cargo.",
      p8:"Liquefied natural gas occupies about 1/600th of the volume it would occupy as gas, making transport by LNG carrier economically viable over very long distances. Some modern LNG carriers can operate with zero Boil-Off Gas emissions thanks to advanced reliquefaction systems.",
    },
    es:{
      title:"Metanero",
      p0:"El metanero transporta gas natural licuado a -163°C en tanques criogénicos especializados. Es uno de los buques técnicamente más exigentes de la marina mercante, debido a las restricciones extremas relacionadas con mantener la carga a muy baja temperatura.",
      p1:"Transportar gas natural licuado entre sitios de producción/licuefacción y terminales de regasificación, manteniendo la carga a muy baja temperatura durante toda la travesía.",
      p2:"Longitud: generalmente entre 280 y 345 m. Capacidad: de 125.000 a más de 180.000 m³ de gas licuado. Sistemas de contención especializados (membrana o tanques esféricos tipo Moss). Algunos metaneros recientes utilizan el gas evaporado (Boil-Off Gas) como combustible propulsor.",
      p3:"Deck Department (navegación, operaciones de carga especializadas), Engine Department (propulsión, gestión del Boil-Off Gas, sistemas criogénicos), con experiencia técnica reforzada requerida para la manipulación del gas licuado.",
      p4:"Master, Chief Officer (responsable de las operaciones de carga criogénica), Gas Engineer (especialista en sistemas de gas), Officer of the Watch, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Enfriamiento de los tanques antes de la carga, carga/descarga mediante brazos criogénicos, gestión continua del Boil-Off Gas (utilizado como combustible o relicuado), vigilancia estricta de las temperaturas y presiones de los tanques.",
      p6:"Riesgos criogénicos (quemaduras por frío extremo, fragilización de materiales), riesgo de explosión en caso de fuga de gas, complejidad de los procedimientos de emergencia en caso de fallo del sistema de contención, exigencias de formación específica muy elevadas.",
      p7:"Sector de muy alta especialización, oficiales formados en gas licuado particularmente solicitados y generalmente muy bien remunerados dada la escasez de esta experiencia y la criticidad de la carga.",
      p8:"El gas natural licuado ocupa aproximadamente 1/600 del volumen que ocuparía en estado gaseoso, lo que hace que su transporte en metanero sea económicamente viable en distancias muy largas. Algunos metaneros modernos pueden navegar con cero emisiones de Boil-Off Gas gracias a sistemas de relicuefacción avanzados.",
    },
    pt:{
      title:"Metaneiro",
      p0:"O metaneiro transporta gás natural liquefeito a -163°C em tanques criogénicos especializados. É um dos navios tecnicamente mais exigentes da marinha mercante, devido às restrições extremas relacionadas com a manutenção da carga a temperatura muito baixa.",
      p1:"Transportar gás natural liquefeito entre locais de produção/liquefação e terminais de regaseificação, mantendo a carga a temperatura muito baixa durante toda a travessia.",
      p2:"Comprimento: geralmente entre 280 e 345 m. Capacidade: de 125.000 a mais de 180.000 m³ de gás liquefeito. Sistemas de contenção especializados (membrana ou tanques esféricos tipo Moss). Alguns metaneiros recentes utilizam o gás evaporado (Boil-Off Gas) como combustível propulsor.",
      p3:"Deck Department (navegação, operações de carga especializadas), Engine Department (propulsão, gestão do Boil-Off Gas, sistemas criogénicos), com experiência técnica reforçada exigida para o manuseamento do gás liquefeito.",
      p4:"Master, Chief Officer (responsável pelas operações de carga criogénica), Gas Engineer (especialista em sistemas de gás), Officer of the Watch, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Arrefecimento dos tanques antes do carregamento, carregamento/descarregamento através de braços criogénicos, gestão contínua do Boil-Off Gas (utilizado como combustível ou reliquefeito), vigilância rigorosa das temperaturas e pressões dos tanques.",
      p6:"Riscos criogénicos (queimaduras por frio extremo, fragilização de materiais), risco de explosão em caso de fuga de gás, complexidade dos procedimentos de emergência em caso de falha do sistema de contenção, exigências de formação específica muito elevadas.",
      p7:"Setor de altíssima especialização, oficiais formados em gás liquefeito particularmente procurados e geralmente muito bem remunerados dada a raridade desta experiência e a criticidade da carga.",
      p8:"O gás natural liquefeito ocupa cerca de 1/600 do volume que ocuparia no estado gasoso, o que torna o seu transporte por metaneiro economicamente viável em distâncias muito longas. Alguns metaneiros modernos podem navegar com zero emissões de Boil-Off Gas graças a sistemas de reliquefação avançados.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function LngCarrier({ lang="fr" }) {
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
