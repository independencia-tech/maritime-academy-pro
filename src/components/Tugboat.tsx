// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "tugboat"
// Standalone documentary component: no Dashboard/progression/billing dependency.
import { C, Card, SL, GLine } from "./LessonShared";
import { TugboatSVG } from "./ShipIllustrations";

const SECTION_LABELS = {
  fr: { profile:"Fiche navire", mission:"Mission", characteristics:"Caractéristiques générales", departments:"Départements à bord", positions:"Postes typiques", operations:"Opérations typiques", risks:"Risques principaux", careers:"Débouchés professionnels", facts:"Anecdotes" },
  en: { profile:"Ship Profile", mission:"Mission", characteristics:"General Characteristics", departments:"Onboard Departments", positions:"Typical Positions", operations:"Typical Operations", risks:"Main Risks", careers:"Career Opportunities", facts:"Interesting Facts" },
  es: { profile:"Ficha del buque", mission:"Misión", characteristics:"Características generales", departments:"Departamentos a bordo", positions:"Puestos típicos", operations:"Operaciones típicas", risks:"Riesgos principales", careers:"Oportunidades profesionales", facts:"Datos curiosos" },
  pt: { profile:"Ficha do navio", mission:"Missão", characteristics:"Características gerais", departments:"Departamentos a bordo", positions:"Cargos típicos", operations:"Operações típicas", risks:"Riscos principais", careers:"Oportunidades profissionais", facts:"Curiosidades" },
};

const getContent = lang => {
  const d = {
    fr:{
      title:"Remorqueur",
      p0:"Le remorqueur assiste les grands navires lors de manœuvres délicates, notamment à l'entrée et à la sortie des ports. Petit par la taille mais puissant par sa motorisation, il joue un rôle essentiel et souvent invisible dans la sécurité portuaire.",
      p1:"Assister les navires de grande taille lors de l'accostage, de l'appareillage et des manœuvres en zone portuaire restreinte, et parfois assurer du remorquage hauturier ou du sauvetage en mer.",
      p2:"Longueur : de 20 m à environ 40 m selon le type. Puissance de traction (bollard pull) souvent très élevée par rapport à sa taille, pouvant dépasser 80 tonnes pour les remorqueurs portuaires les plus puissants. Coque très manœuvrable, souvent équipée de propulseurs azimutaux (type Z-drive) pour une agilité maximale.",
      p3:"Deck Department (manœuvres de remorquage, gestion des aussières et câbles de traction), Engine Department (propulsion à forte puissance, systèmes de propulseurs azimutaux), équipage généralement restreint du fait de la petite taille du navire.",
      p4:"Master (souvent aussi impliqué directement dans la manœuvre), Chief Officer ou Mate, Able Seaman, Chief Engineer, parfois un seul officier mécanicien sur les plus petites unités.",
      p5:"Prise de remorque et accompagnement de grands navires en zone portuaire, manœuvres de poussée ou de traction selon les besoins du navire assisté, gestion de câbles et aussières sous tension importante, interventions d'urgence en cas d'avarie d'un navire tiers.",
      p6:"Rupture de câble de remorquage sous tension (risque de fouettement grave), risque de chavirement en cas de traction latérale mal maîtrisée (situation dite de girding), collision lors des manœuvres rapprochées avec le navire assisté, conditions de travail parfois exigeantes lors d'interventions d'urgence.",
      p7:"Secteur offrant des postes de commandement accessibles relativement tôt dans une carrière du fait de la taille modeste des navires, bonne opportunité pour développer une expérience de manœuvre intensive, souvent apprécié pour un rythme de travail basé au port plutôt qu'en longue traversée.",
      p8:"Certains remorqueurs modernes peuvent développer une force de traction proportionnellement bien supérieure à celle de navires bien plus grands qu'eux, grâce à leurs propulseurs azimutaux orientables à 360°. Le phénomène de girding, où un remorqueur est tiré sur le flanc par la traction du navire assisté, reste l'un des risques les plus redoutés du métier.",
    },
    en:{
      title:"Tugboat",
      p0:"The tugboat assists large ships during delicate maneuvers, particularly entering and leaving ports. Small in size but powerful in engine capacity, it plays an essential and often invisible role in port safety.",
      p1:"Assist large ships during berthing, unberthing, and maneuvers in confined port areas, and sometimes provide ocean towing or sea rescue services.",
      p2:"Length: from 20 m to about 40 m depending on type. Bollard pull often very high relative to its size, exceeding 80 tonnes for the most powerful harbor tugs. Highly maneuverable hull, often fitted with azimuth thrusters (Z-drive type) for maximum agility.",
      p3:"Deck Department (towing maneuvers, managing towlines and cables), Engine Department (high-power propulsion, azimuth thruster systems), generally small crew due to the ship's small size.",
      p4:"Master (often directly involved in the maneuver), Chief Officer or Mate, Able Seaman, Chief Engineer, sometimes a single engineering officer on the smallest units.",
      p5:"Taking a tow and escorting large ships in port areas, pushing or pulling maneuvers depending on the assisted ship's needs, managing cables and towlines under significant tension, emergency interventions in case of a third-party ship's breakdown.",
      p6:"Towline rupture under tension (severe whiplash risk), capsizing risk from poorly controlled lateral pull (a situation known as girding), collision during close maneuvers with the assisted ship, sometimes demanding working conditions during emergency interventions.",
      p7:"Sector offering command positions relatively early in a career due to the modest size of the ships, good opportunity to develop intensive maneuvering experience, often appreciated for a port-based work rhythm rather than long crossings.",
      p8:"Some modern tugboats can develop pulling force proportionally far greater than ships much larger than themselves, thanks to their 360°-steerable azimuth thrusters. The girding phenomenon, where a tug is pulled onto its side by the assisted ship's tension, remains one of the most feared risks in the profession.",
    },
    es:{
      title:"Remolcador",
      p0:"El remolcador asiste a los grandes buques durante maniobras delicadas, especialmente en la entrada y salida de puertos. Pequeño en tamaño pero potente en motorización, desempeña un papel esencial y a menudo invisible en la seguridad portuaria.",
      p1:"Asistir a los buques de gran tamaño durante el atraque, el desatraque y las maniobras en zonas portuarias restringidas, y a veces proporcionar remolque de altura o rescate en el mar.",
      p2:"Longitud: de 20 m a unos 40 m según el tipo. Capacidad de tiro (bollard pull) a menudo muy elevada en relación con su tamaño, pudiendo superar las 80 toneladas en los remolcadores portuarios más potentes. Casco muy maniobrable, a menudo equipado con propulsores azimutales (tipo Z-drive) para una agilidad máxima.",
      p3:"Deck Department (maniobras de remolque, gestión de estachas y cables de tracción), Engine Department (propulsión de alta potencia, sistemas de propulsores azimutales), tripulación generalmente reducida debido al pequeño tamaño del buque.",
      p4:"Master (a menudo también implicado directamente en la maniobra), Chief Officer o Mate, Able Seaman, Chief Engineer, a veces un solo oficial mecánico en las unidades más pequeñas.",
      p5:"Toma de remolque y acompañamiento de grandes buques en zona portuaria, maniobras de empuje o tracción según las necesidades del buque asistido, gestión de cables y estachas bajo tensión importante, intervenciones de emergencia en caso de avería de un buque tercero.",
      p6:"Rotura de cable de remolque bajo tensión (riesgo grave de latigazo), riesgo de vuelco por tracción lateral mal controlada (situación denominada girding), colisión durante maniobras cercanas con el buque asistido, condiciones de trabajo a veces exigentes durante intervenciones de emergencia.",
      p7:"Sector que ofrece puestos de mando accesibles relativamente pronto en una carrera debido al tamaño modesto de los buques, buena oportunidad para desarrollar una experiencia de maniobra intensiva, a menudo apreciado por un ritmo de trabajo basado en el puerto en lugar de largas travesías.",
      p8:"Algunos remolcadores modernos pueden desarrollar una fuerza de tiro proporcionalmente muy superior a la de buques mucho más grandes que ellos, gracias a sus propulsores azimutales orientables a 360°. El fenómeno de girding, en el que un remolcador es arrastrado de costado por la tracción del buque asistido, sigue siendo uno de los riesgos más temidos de la profesión.",
    },
    pt:{
      title:"Rebocador",
      p0:"O rebocador assiste os grandes navios durante manobras delicadas, particularmente na entrada e saída de portos. Pequeno em tamanho mas potente na motorização, desempenha um papel essencial e frequentemente invisível na segurança portuária.",
      p1:"Assistir os navios de grande porte durante a atracação, a desatracação e as manobras em zonas portuárias restritas, e por vezes assegurar reboque de longo curso ou salvamento no mar.",
      p2:"Comprimento: de 20 m a cerca de 40 m consoante o tipo. Capacidade de tração (bollard pull) frequentemente muito elevada em relação ao seu tamanho, podendo ultrapassar as 80 toneladas nos rebocadores portuários mais potentes. Casco muito manobrável, frequentemente equipado com propulsores azimutais (tipo Z-drive) para uma agilidade máxima.",
      p3:"Deck Department (manobras de reboque, gestão de espias e cabos de tração), Engine Department (propulsão de alta potência, sistemas de propulsores azimutais), tripulação geralmente reduzida devido ao pequeno tamanho do navio.",
      p4:"Master (frequentemente também envolvido diretamente na manobra), Chief Officer ou Mate, Able Seaman, Chief Engineer, por vezes um único oficial maquinista nas unidades menores.",
      p5:"Tomada de reboque e acompanhamento de grandes navios em zona portuária, manobras de empurrar ou puxar consoante as necessidades do navio assistido, gestão de cabos e espias sob tensão importante, intervenções de emergência em caso de avaria de um navio terceiro.",
      p6:"Rutura de cabo de reboque sob tensão (risco grave de chicotada), risco de emborcamento por tração lateral mal controlada (situação denominada girding), colisão durante manobras próximas com o navio assistido, condições de trabalho por vezes exigentes durante intervenções de emergência.",
      p7:"Setor que oferece postos de comando acessíveis relativamente cedo numa carreira devido ao tamanho modesto dos navios, boa oportunidade para desenvolver uma experiência de manobra intensiva, frequentemente apreciado por um ritmo de trabalho baseado no porto em vez de longas travessias.",
      p8:"Alguns rebocadores modernos podem desenvolver uma força de tração proporcionalmente muito superior à de navios muito maiores do que eles, graças aos seus propulsores azimutais orientáveis a 360°. O fenómeno de girding, em que um rebocador é puxado de lado pela tração do navio assistido, continua a ser um dos riscos mais temidos da profissão.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function Tugboat({ lang="fr" }) {
  const lc = getContent(lang);
  const L = SECTION_LABELS[lang]||SECTION_LABELS.fr;

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",position:"relative"}}>
      <div style={{padding:"28px 16px 40px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(26,111,212,0.15)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.blue2,fontWeight:700}}>🚢 Ships Library</div>
          <div style={{marginBottom:14,borderRadius:16,overflow:"hidden",border:`1px solid ${C.border}`}}><TugboatSVG/></div>
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
