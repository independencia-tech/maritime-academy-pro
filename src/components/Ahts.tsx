// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "ahts"
// Standalone documentary component: no Dashboard/progression/billing dependency.
import { C, Card, SL, GLine } from "./LessonShared";
import { AhtsSVG } from "./ShipIllustrations";

const SECTION_LABELS = {
  fr: { profile:"Fiche navire", mission:"Mission", characteristics:"Caractéristiques générales", departments:"Départements à bord", positions:"Postes typiques", operations:"Opérations typiques", risks:"Risques principaux", careers:"Débouchés professionnels", facts:"Anecdotes" },
  en: { profile:"Ship Profile", mission:"Mission", characteristics:"General Characteristics", departments:"Onboard Departments", positions:"Typical Positions", operations:"Typical Operations", risks:"Main Risks", careers:"Career Opportunities", facts:"Interesting Facts" },
  es: { profile:"Ficha del buque", mission:"Misión", characteristics:"Características generales", departments:"Departamentos a bordo", positions:"Puestos típicos", operations:"Operaciones típicas", risks:"Riesgos principales", careers:"Oportunidades profesionales", facts:"Datos curiosos" },
  pt: { profile:"Ficha do navio", mission:"Missão", characteristics:"Características gerais", departments:"Departamentos a bordo", positions:"Cargos típicos", operations:"Operações típicas", risks:"Riscos principais", careers:"Oportunidades profissionais", facts:"Curiosidades" },
};

const getContent = lang => {
  const d = {
    fr:{
      title:"Remorqueur de manutention d'ancres et ravitailleur (AHTS)",
      p0:"L'AHTS combine remorquage de haute puissance, manutention d'ancres et fonctions de ravitaillement. C'est l'un des navires offshore les plus polyvalents et les plus puissants, essentiel au positionnement et au déplacement des plateformes pétrolières.",
      p1:"Remorquer des plateformes ou des installations flottantes, poser et récupérer leurs systèmes d'ancrage, et assurer un soutien logistique complémentaire similaire à celui d'un OSV classique.",
      p2:"Longueur : de 60 m à environ 100 m. Puissance de traction élevée (bollard pull), souvent supérieure à 150 tonnes pour les plus gros modèles. Pont arrière dégagé équipé de treuils puissants et d'un rouleau de poupe (stern roller) pour la manutention des chaînes et câbles d'ancrage.",
      p3:"Deck Department (navigation, opérations de remorquage et de manutention d'ancres), Engine Department (propulsion à forte puissance, systèmes hydrauliques des treuils), avec une expertise spécifique en calcul de traction et gestion des lignes d'ancrage sous tension.",
      p4:"Master, Chief Officer (responsable des opérations de manutention d'ancres), Officer of the Watch, Bosun (souvent très expérimenté en manœuvres de pont arrière), Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Remorquage de plateformes ou de structures flottantes, pose et relevage de systèmes d'ancrage multi-points, manœuvres de précision en positionnement dynamique, gestion de câbles et chaînes sous tension importante.",
      p6:"Rupture de câble ou de chaîne sous tension extrême (risque de fouettement mortel), basculement du navire en cas de traction latérale excessive, risques importants lors des opérations de pont arrière avec charges lourdes en mouvement, conditions météo souvent exigeantes en zone offshore.",
      p7:"Secteur très spécialisé et exigeant, officiers et bosuns expérimentés en manutention d'ancres particulièrement recherchés et bien rémunérés, carrière reconnue comme l'une des plus techniques du secteur offshore.",
      p8:"Un AHTS peut développer une force de traction (bollard pull) suffisante pour déplacer des plateformes pesant plusieurs dizaines de milliers de tonnes. Les opérations de manutention d'ancres sont considérées parmi les plus dangereuses de toute la marine marchande en raison des forces extrêmes en jeu.",
    },
    en:{
      title:"Anchor Handling Tug Supply (AHTS)",
      p0:"The AHTS combines high-power towing, anchor handling, and supply functions. It is one of the most versatile and powerful offshore vessels, essential for positioning and moving oil platforms.",
      p1:"Tow platforms or floating installations, deploy and retrieve their anchoring systems, and provide additional logistical support similar to a conventional OSV.",
      p2:"Length: from 60 m to about 100 m. High bollard pull, often exceeding 150 tonnes for the largest models. Clear aft deck equipped with powerful winches and a stern roller for handling anchor chains and cables.",
      p3:"Deck Department (navigation, towing and anchor handling operations), Engine Department (high-power propulsion, winch hydraulic systems), with specific expertise in pull calculation and managing anchor lines under tension.",
      p4:"Master, Chief Officer (responsible for anchor handling operations), Officer of the Watch, Bosun (often highly experienced in aft deck maneuvers), Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Towing platforms or floating structures, deploying and recovering multi-point anchoring systems, precision dynamic positioning maneuvers, managing cables and chains under significant tension.",
      p6:"Cable or chain rupture under extreme tension (deadly whiplash risk), ship capsizing risk from excessive lateral pull, significant risks during aft deck operations with heavy loads in motion, often demanding weather conditions in offshore areas.",
      p7:"Highly specialized and demanding sector, officers and bosuns experienced in anchor handling particularly sought after and well paid, career recognized as one of the most technical in the offshore sector.",
      p8:"An AHTS can develop enough bollard pull to move platforms weighing tens of thousands of tonnes. Anchor handling operations are considered among the most dangerous in the entire merchant marine due to the extreme forces involved.",
    },
    es:{
      title:"Remolcador de manejo de anclas y suministro (AHTS)",
      p0:"El AHTS combina remolque de alta potencia, manejo de anclas y funciones de suministro. Es uno de los buques offshore más versátiles y potentes, esencial para el posicionamiento y desplazamiento de plataformas petroleras.",
      p1:"Remolcar plataformas o instalaciones flotantes, calar y recuperar sus sistemas de anclaje, y proporcionar apoyo logístico adicional similar al de un OSV convencional.",
      p2:"Longitud: de 60 m a unos 100 m. Alta capacidad de tiro (bollard pull), a menudo superior a 150 toneladas en los modelos más grandes. Cubierta de popa despejada equipada con potentes chigres y un rodillo de popa (stern roller) para el manejo de cadenas y cables de anclaje.",
      p3:"Deck Department (navegación, operaciones de remolque y manejo de anclas), Engine Department (propulsión de alta potencia, sistemas hidráulicos de los chigres), con una experiencia específica en el cálculo de tiro y la gestión de líneas de anclaje bajo tensión.",
      p4:"Master, Chief Officer (responsable de las operaciones de manejo de anclas), Officer of the Watch, Bosun (a menudo muy experimentado en maniobras de cubierta de popa), Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Remolque de plataformas o estructuras flotantes, calado y recuperación de sistemas de anclaje multipunto, maniobras de precisión en posicionamiento dinámico, gestión de cables y cadenas bajo tensión importante.",
      p6:"Rotura de cable o cadena bajo tensión extrema (riesgo de latigazo mortal), riesgo de vuelco del buque por tracción lateral excesiva, riesgos importantes durante las operaciones de cubierta de popa con cargas pesadas en movimiento, condiciones meteorológicas a menudo exigentes en zona offshore.",
      p7:"Sector muy especializado y exigente, oficiales y contramaestres experimentados en manejo de anclas particularmente solicitados y bien remunerados, carrera reconocida como una de las más técnicas del sector offshore.",
      p8:"Un AHTS puede desarrollar una fuerza de tiro (bollard pull) suficiente para desplazar plataformas que pesan varias decenas de miles de toneladas. Las operaciones de manejo de anclas se consideran entre las más peligrosas de toda la marina mercante debido a las fuerzas extremas en juego.",
    },
    pt:{
      title:"Rebocador de manuseamento de âncoras e abastecimento (AHTS)",
      p0:"O AHTS combina reboque de alta potência, manuseamento de âncoras e funções de abastecimento. É um dos navios offshore mais versáteis e potentes, essencial para o posicionamento e deslocamento de plataformas petrolíferas.",
      p1:"Rebocar plataformas ou instalações flutuantes, lançar e recuperar os seus sistemas de ancoragem, e assegurar um apoio logístico adicional semelhante ao de um OSV convencional.",
      p2:"Comprimento: de 60 m a cerca de 100 m. Elevada capacidade de tração (bollard pull), frequentemente superior a 150 toneladas nos modelos maiores. Convés de popa desimpedido equipado com guinchos potentes e um rolo de popa (stern roller) para o manuseamento de amarras e cabos de ancoragem.",
      p3:"Deck Department (navegação, operações de reboque e manuseamento de âncoras), Engine Department (propulsão de alta potência, sistemas hidráulicos dos guinchos), com uma experiência específica no cálculo de tração e na gestão de linhas de ancoragem sob tensão.",
      p4:"Master, Chief Officer (responsável pelas operações de manuseamento de âncoras), Officer of the Watch, Bosun (frequentemente muito experiente em manobras de convés de popa), Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Reboque de plataformas ou estruturas flutuantes, lançamento e recuperação de sistemas de ancoragem multiponto, manobras de precisão em posicionamento dinâmico, gestão de cabos e amarras sob tensão importante.",
      p6:"Rutura de cabo ou amarra sob tensão extrema (risco de chicotada mortal), risco de emborcamento do navio por tração lateral excessiva, riscos importantes durante as operações de convés de popa com cargas pesadas em movimento, condições meteorológicas frequentemente exigentes em zona offshore.",
      p7:"Setor muito especializado e exigente, oficiais e contramestres experientes em manuseamento de âncoras particularmente procurados e bem remunerados, carreira reconhecida como uma das mais técnicas do setor offshore.",
      p8:"Um AHTS pode desenvolver uma força de tração (bollard pull) suficiente para deslocar plataformas que pesam várias dezenas de milhares de toneladas. As operações de manuseamento de âncoras são consideradas entre as mais perigosas de toda a marinha mercante devido às forças extremas envolvidas.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function Ahts({ lang="fr" }) {
  const lc = getContent(lang);
  const L = SECTION_LABELS[lang]||SECTION_LABELS.fr;

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",position:"relative"}}>
      <div style={{padding:"28px 16px 40px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(26,111,212,0.15)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.blue2,fontWeight:700}}>🚢 Ships Library</div>
          <div style={{marginBottom:14,borderRadius:16,overflow:"hidden",border:`1px solid ${C.border}`}}><AhtsSVG/></div>
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
