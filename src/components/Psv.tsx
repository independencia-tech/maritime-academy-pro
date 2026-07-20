// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "psv"
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
      title:"Navire ravitailleur de plateforme (PSV)",
      p0:"Le PSV assure le transport régulier de matériel, de carburant et de personnel vers les plateformes offshore. Contrairement à l'AHTS, il n'assure ni remorquage ni manutention d'ancres — sa vocation est purement logistique et répétitive.",
      p1:"Approvisionner les plateformes offshore en matériel technique, carburant, eau douce, boue de forage et autres consommables, selon des rotations régulières entre un port de base et les installations en mer.",
      p2:"Longueur : de 50 m à environ 90 m. Pont arrière long et dégagé optimisé pour le chargement de conteneurs et de matériel divers. Citernes spécialisées sous le pont pour le transport de fluides (carburant, eau, boue de forage, produits chimiques).",
      p3:"Deck Department (navigation, opérations de chargement de pont, positionnement dynamique), Engine Department (propulsion, gestion des systèmes de transfert de fluides), avec une compétence particulière en gestion simultanée de multiples cargaisons liquides distinctes.",
      p4:"Master, Chief Officer, Officer of the Watch (souvent qualifié DP), Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Chargement de matériel et conteneurs sur le pont arrière, transfert de fluides variés vers les plateformes via des systèmes dédiés, maintien de position en DP lors des opérations de transfert, rotations fréquentes entre port et plateformes.",
      p6:"Risques liés au transfert de personnel et de matériel en mer agitée, contamination croisée entre différents fluides transportés si mal gérée, exposition à des conditions météo offshore souvent difficiles, risques de chute de charge lors des opérations de grue avec la plateforme.",
      p7:"Secteur offrant une bonne stabilité d'emploi du fait des rotations régulières, bonne porte d'entrée vers le secteur offshore avant de se spécialiser davantage (par exemple vers l'AHTS), qualification DP très valorisée.",
      p8:"Un PSV peut transporter simultanément jusqu'à une dizaine de fluides différents dans des citernes séparées (carburant, eau potable, eau de forage, boue, produits chimiques), chacun nécessitant son propre système de pompage pour éviter toute contamination croisée.",
    },
    en:{
      title:"Platform Supply Vessel (PSV)",
      p0:"The PSV provides regular transport of equipment, fuel, and personnel to offshore platforms. Unlike the AHTS, it performs neither towing nor anchor handling — its purpose is purely logistical and repetitive.",
      p1:"Supply offshore platforms with technical equipment, fuel, fresh water, drilling mud, and other consumables, through regular rotations between a home port and offshore installations.",
      p2:"Length: from 50 m to about 90 m. Long, clear aft deck optimized for loading containers and various equipment. Specialized under-deck tanks for transporting fluids (fuel, water, drilling mud, chemical products).",
      p3:"Deck Department (navigation, deck loading operations, dynamic positioning), Engine Department (propulsion, fluid transfer system management), with particular skill in simultaneously managing multiple distinct liquid cargoes.",
      p4:"Master, Chief Officer, Officer of the Watch (often DP qualified), Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Loading equipment and containers on the aft deck, transferring various fluids to platforms via dedicated systems, maintaining DP position during transfer operations, frequent rotations between port and platforms.",
      p6:"Risks related to personnel and equipment transfer in rough seas, cross-contamination between different fluids transported if poorly managed, exposure to often difficult offshore weather conditions, risk of load drop during crane operations with the platform.",
      p7:"Sector offering good job stability due to regular rotations, good entry point into the offshore sector before further specializing (for example toward AHTS), DP qualification highly valued.",
      p8:"A PSV can simultaneously carry up to a dozen different fluids in separate tanks (fuel, drinking water, drilling water, mud, chemical products), each requiring its own pumping system to avoid cross-contamination.",
    },
    es:{
      title:"Buque de suministro de plataforma (PSV)",
      p0:"El PSV asegura el transporte regular de material, combustible y personal hacia las plataformas offshore. A diferencia del AHTS, no realiza remolque ni manejo de anclas — su vocación es puramente logística y repetitiva.",
      p1:"Abastecer a las plataformas offshore de material técnico, combustible, agua dulce, lodo de perforación y otros consumibles, mediante rotaciones regulares entre un puerto base y las instalaciones en el mar.",
      p2:"Longitud: de 50 m a unos 90 m. Cubierta de popa larga y despejada optimizada para la carga de contenedores y material diverso. Tanques especializados bajo cubierta para el transporte de fluidos (combustible, agua, lodo de perforación, productos químicos).",
      p3:"Deck Department (navegación, operaciones de carga de cubierta, posicionamiento dinámico), Engine Department (propulsión, gestión de los sistemas de transferencia de fluidos), con una competencia particular en la gestión simultánea de múltiples cargas líquidas distintas.",
      p4:"Master, Chief Officer, Officer of the Watch (a menudo cualificado en DP), Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Carga de material y contenedores en la cubierta de popa, transferencia de fluidos variados hacia las plataformas mediante sistemas dedicados, mantenimiento de posición en DP durante las operaciones de transferencia, rotaciones frecuentes entre puerto y plataformas.",
      p6:"Riesgos relacionados con la transferencia de personal y material en mar agitado, contaminación cruzada entre diferentes fluidos transportados si se gestiona mal, exposición a condiciones meteorológicas offshore a menudo difíciles, riesgo de caída de carga durante las operaciones de grúa con la plataforma.",
      p7:"Sector que ofrece buena estabilidad laboral gracias a las rotaciones regulares, buena puerta de entrada al sector offshore antes de especializarse más (por ejemplo hacia el AHTS), cualificación DP muy valorada.",
      p8:"Un PSV puede transportar simultáneamente hasta una decena de fluidos diferentes en tanques separados (combustible, agua potable, agua de perforación, lodo, productos químicos), cada uno requiriendo su propio sistema de bombeo para evitar la contaminación cruzada.",
    },
    pt:{
      title:"Navio de abastecimento de plataforma (PSV)",
      p0:"O PSV assegura o transporte regular de material, combustível e pessoal para as plataformas offshore. Ao contrário do AHTS, não realiza reboque nem manuseamento de âncoras — a sua vocação é puramente logística e repetitiva.",
      p1:"Abastecer as plataformas offshore com material técnico, combustível, água doce, lama de perfuração e outros consumíveis, através de rotações regulares entre um porto base e as instalações no mar.",
      p2:"Comprimento: de 50 m a cerca de 90 m. Convés de popa longo e desimpedido otimizado para o carregamento de contentores e material diverso. Tanques especializados sob o convés para o transporte de fluidos (combustível, água, lama de perfuração, produtos químicos).",
      p3:"Deck Department (navegação, operações de carga de convés, posicionamento dinâmico), Engine Department (propulsão, gestão dos sistemas de transferência de fluidos), com uma competência particular na gestão simultânea de múltiplas cargas líquidas distintas.",
      p4:"Master, Chief Officer, Officer of the Watch (frequentemente qualificado em DP), Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Carregamento de material e contentores no convés de popa, transferência de fluidos variados para as plataformas através de sistemas dedicados, manutenção de posição em DP durante as operações de transferência, rotações frequentes entre porto e plataformas.",
      p6:"Riscos relacionados com a transferência de pessoal e material em mar agitado, contaminação cruzada entre diferentes fluidos transportados se mal gerida, exposição a condições meteorológicas offshore frequentemente difíceis, risco de queda de carga durante as operações de grua com a plataforma.",
      p7:"Setor que oferece boa estabilidade de emprego graças às rotações regulares, boa porta de entrada para o setor offshore antes de se especializar mais (por exemplo para o AHTS), qualificação DP muito valorizada.",
      p8:"Um PSV pode transportar simultaneamente até uma dezena de fluidos diferentes em tanques separados (combustível, água potável, água de perfuração, lama, produtos químicos), cada um exigindo o seu próprio sistema de bombagem para evitar a contaminação cruzada.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function Psv({ lang="fr" }) {
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
