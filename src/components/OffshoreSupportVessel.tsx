// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "osv"
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
      title:"Navire de soutien offshore (OSV)",
      p0:"Le navire de soutien offshore assure le ravitaillement et l'appui logistique des plateformes et installations pétrolières et gazières en mer. C'est un navire polyvalent, conçu pour opérer au plus près des installations offshore dans des conditions souvent difficiles.",
      p1:"Assurer le transport de matériel, de carburant, d'eau et de personnel entre la terre et les installations offshore, ainsi que diverses opérations de support technique autour des plateformes.",
      p2:"Longueur : de 50 m à environ 100 m selon les modèles. Pont arrière dégagé et large pour le transport de matériel et de conteneurs. Système de positionnement dynamique (DP) permettant de maintenir une position précise sans mouillage, essentiel à proximité des installations offshore.",
      p3:"Deck Department (navigation, opérations de pont, positionnement dynamique), Engine Department (propulsion, souvent avec plusieurs propulseurs indépendants pour le DP), avec une compétence particulière en manœuvres de précision à proximité d'installations fixes.",
      p4:"Master, Chief Officer, Officer of the Watch (souvent qualifié DP), Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Transfert de matériel et de personnel vers les plateformes (souvent par grue ou passerelle), maintien de position en DP à proximité d'installations fixes, transport de fluides spécifiques (boue de forage, eau, carburant) dans des citernes dédiées.",
      p6:"Collision avec l'installation offshore en cas de défaillance du système DP, risques liés aux opérations de transfert de personnel en mer agitée, exposition à des conditions météo souvent difficiles en zone offshore, risques liés à la manutention de matériel lourd sur pont dégagé.",
      p7:"Secteur offrant des carrières bien rémunérées, particulièrement pour les officiers qualifiés en positionnement dynamique (certification DP), forte demande dans les zones d'exploration et de production pétrolière/gazière offshore.",
      p8:"Le système de positionnement dynamique (DP) permet à un OSV de maintenir sa position à quelques mètres près, sans ancre, uniquement grâce à ses propulseurs et à un contrôle informatique continu de sa position GPS. Cette technologie est devenue indispensable pour opérer en toute sécurité à proximité des plateformes offshore.",
    },
    en:{
      title:"Offshore Support Vessel (OSV)",
      p0:"The offshore support vessel provides supply and logistical support to offshore oil and gas platforms and installations. It is a versatile ship, designed to operate close to offshore installations under often challenging conditions.",
      p1:"Transport equipment, fuel, water, and personnel between shore and offshore installations, as well as perform various technical support operations around platforms.",
      p2:"Length: from 50 m to about 100 m depending on the model. Wide, clear aft deck for transporting equipment and containers. Dynamic Positioning (DP) system allowing precise position holding without anchoring, essential near offshore installations.",
      p3:"Deck Department (navigation, deck operations, dynamic positioning), Engine Department (propulsion, often with several independent thrusters for DP), with particular skill in precision maneuvering near fixed installations.",
      p4:"Master, Chief Officer, Officer of the Watch (often DP qualified), Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Transferring equipment and personnel to platforms (often by crane or gangway), maintaining DP position near fixed installations, transporting specific fluids (drilling mud, water, fuel) in dedicated tanks.",
      p6:"Collision with the offshore installation in case of DP system failure, risks related to personnel transfer operations in rough seas, exposure to often difficult weather conditions in offshore areas, risks related to handling heavy equipment on the clear deck.",
      p7:"Sector offering well-paid careers, particularly for officers qualified in dynamic positioning (DP certification), strong demand in offshore oil and gas exploration and production areas.",
      p8:"The Dynamic Positioning (DP) system allows an OSV to hold its position within a few meters, without anchoring, solely through its thrusters and continuous computer control of its GPS position. This technology has become essential to operate safely near offshore platforms.",
    },
    es:{
      title:"Buque de apoyo offshore (OSV)",
      p0:"El buque de apoyo offshore proporciona abastecimiento y apoyo logístico a las plataformas e instalaciones petroleras y de gas en el mar. Es un buque versátil, diseñado para operar cerca de las instalaciones offshore en condiciones a menudo difíciles.",
      p1:"Transportar material, combustible, agua y personal entre tierra e instalaciones offshore, así como realizar diversas operaciones de apoyo técnico alrededor de las plataformas.",
      p2:"Longitud: de 50 m a unos 100 m según el modelo. Cubierta de popa amplia y despejada para el transporte de material y contenedores. Sistema de posicionamiento dinámico (DP) que permite mantener una posición precisa sin fondear, esencial cerca de las instalaciones offshore.",
      p3:"Deck Department (navegación, operaciones de cubierta, posicionamiento dinámico), Engine Department (propulsión, a menudo con varios propulsores independientes para el DP), con una competencia particular en maniobras de precisión cerca de instalaciones fijas.",
      p4:"Master, Chief Officer, Officer of the Watch (a menudo cualificado en DP), Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Transferencia de material y personal hacia las plataformas (a menudo mediante grúa o pasarela), mantenimiento de posición en DP cerca de instalaciones fijas, transporte de fluidos específicos (lodo de perforación, agua, combustible) en tanques dedicados.",
      p6:"Colisión con la instalación offshore en caso de fallo del sistema DP, riesgos relacionados con las operaciones de transferencia de personal en mar agitado, exposición a condiciones meteorológicas a menudo difíciles en zona offshore, riesgos relacionados con la manipulación de material pesado en cubierta despejada.",
      p7:"Sector que ofrece carreras bien remuneradas, particularmente para oficiales cualificados en posicionamiento dinámico (certificación DP), fuerte demanda en las zonas de exploración y producción de petróleo/gas offshore.",
      p8:"El sistema de posicionamiento dinámico (DP) permite a un OSV mantener su posición con un margen de pocos metros, sin ancla, únicamente gracias a sus propulsores y a un control informático continuo de su posición GPS. Esta tecnología se ha vuelto indispensable para operar con seguridad cerca de las plataformas offshore.",
    },
    pt:{
      title:"Navio de apoio offshore (OSV)",
      p0:"O navio de apoio offshore assegura o abastecimento e o apoio logístico das plataformas e instalações petrolíferas e de gás no mar. É um navio versátil, concebido para operar próximo das instalações offshore em condições frequentemente difíceis.",
      p1:"Transportar material, combustível, água e pessoal entre a terra e as instalações offshore, bem como realizar diversas operações de apoio técnico em torno das plataformas.",
      p2:"Comprimento: de 50 m a cerca de 100 m consoante o modelo. Convés de popa amplo e desimpedido para o transporte de material e contentores. Sistema de posicionamento dinâmico (DP) que permite manter uma posição precisa sem fundear, essencial junto das instalações offshore.",
      p3:"Deck Department (navegação, operações de convés, posicionamento dinâmico), Engine Department (propulsão, frequentemente com vários propulsores independentes para o DP), com uma competência particular em manobras de precisão junto de instalações fixas.",
      p4:"Master, Chief Officer, Officer of the Watch (frequentemente qualificado em DP), Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Transferência de material e pessoal para as plataformas (frequentemente por grua ou passadiço), manutenção de posição em DP junto de instalações fixas, transporte de fluidos específicos (lama de perfuração, água, combustível) em tanques dedicados.",
      p6:"Colisão com a instalação offshore em caso de falha do sistema DP, riscos relacionados com as operações de transferência de pessoal em mar agitado, exposição a condições meteorológicas frequentemente difíceis em zona offshore, riscos relacionados com o manuseamento de material pesado no convés desimpedido.",
      p7:"Setor que oferece carreiras bem remuneradas, particularmente para oficiais qualificados em posicionamento dinâmico (certificação DP), forte procura nas zonas de exploração e produção de petróleo/gás offshore.",
      p8:"O sistema de posicionamento dinâmico (DP) permite a um OSV manter a sua posição com uma margem de poucos metros, sem âncora, unicamente graças aos seus propulsores e a um controlo informático contínuo da sua posição GPS. Esta tecnologia tornou-se indispensável para operar com segurança junto das plataformas offshore.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function OffshoreSupportVessel({ lang="fr" }) {
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
