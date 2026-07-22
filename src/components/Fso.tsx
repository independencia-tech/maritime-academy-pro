// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "fso"
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
      title:"Unité flottante de stockage et de déchargement (FSO)",
      p0:"Le FSO (Floating Storage and Offloading unit) est une unité flottante de stockage pétrolier, généralement amarrée en permanence près d'un champ pétrolier offshore. Il ne réalise normalement pas le traitement primaire des hydrocarbures ; sa fonction principale est le stockage et l'export. Souvent issu de la conversion d'un ancien pétrolier (VLCC ou Suezmax), il peut aussi être construit neuf pour ce rôle dédié.",
      p1:"Recevoir le pétrole brut extrait par une plateforme ou un FPSO voisin via pipeline ou riser, le stocker dans ses cuves, puis le transférer périodiquement vers des tankers navette ou des pétroliers d'export venant l'exporter vers les raffineries. Le FSO agit comme un tampon logistique entre production continue et export discontinu.",
      p2:"Capacité de stockage souvent comprise entre 1 et 2,5 millions de barils. La plupart des FSO ne disposent pas de propulsion opérationnelle et restent amarrés en permanence sur le champ, maintenus en position par un système d'amarrage tourelle (turret mooring) permettant au navire de s'orienter selon le vent et les courants. Pont équipé des systèmes de transfert de cargaison, des bras ou flexibles de chargement et des installations nécessaires au stockage sécurisé des hydrocarbures.",
      p3:"Deck (opérations de transfert de cargaison, amarrage, sécurité incendie), Engine (maintenance des pompes, groupes électrogènes, système d'inertage des cuves), Cargo Operations (contrôle du stockage et des transferts), Safety/HSE dédié en raison du risque hydrocarbures constant.",
      p4:"OIM (Offshore Installation Manager) ou Master, Chief Officer/Cargo Officer, Chief Engineer, Mooring Master / Loading Master (selon l'opérateur) pour les opérations de transfert navette, opérateurs de survie et de contrôle process, techniciens HSE.",
      p5:"Réception continue du brut depuis le champ, gestion des niveaux de cuves, opérations de transfert ship-to-ship avec les tankers navette (souvent en tandem ou côte à côte), inertage et dégazage des cuves, surveillance du système d'amarrage tourelle, inspection et maintenance des systèmes de transfert et des équipements de sécurité.",
      p6:"Risque d'incendie et d'explosion (vapeurs d'hydrocarbures), défaillance du système d'amarrage en conditions météo dégradées, risques liés aux opérations de transfert ship-to-ship (collision, rupture de flexible), pollution marine en cas de fuite d'hydrocarbures, exposition prolongée en mer sans possibilité d'évacuation rapide.",
      p7:"Poste stable et recherché en offshore oil & gas, souvent en rotation longue (4-6 semaines), primes liées à l'environnement offshore, passerelle naturelle vers les FPSO ou les plateformes fixes, forte demande de personnel Cargo/Process certifié.",
      p8:"Certains FSO sont d'anciens supertankers de plus de 40 ans convertis pour une seconde vie de plusieurs décennies. Le système de tourelle permet au navire de pivoter à 360° autour de son point d'ancrage, tout en restant connecté à son système d'amarrage permanent.",
    },
    en:{
      title:"Floating Storage and Offloading Unit (FSO)",
      p0:"The FSO (Floating Storage and Offloading unit) is a floating oil storage unit, typically permanently moored near an offshore oil field. It does not normally carry out primary processing of hydrocarbons; its main function is storage and export. Often converted from an older tanker (VLCC or Suezmax), it can also be purpose-built for this dedicated role.",
      p1:"Receive crude oil extracted by a nearby platform or FPSO via pipeline or riser, store it in its tanks, then periodically transfer it to shuttle tankers or export tankers carrying it to refineries. The FSO acts as a logistical buffer between continuous production and discontinuous export.",
      p2:"Storage capacity often between 1 and 2.5 million barrels. Most FSOs have no operational propulsion and remain permanently moored on the field, held in position by a turret mooring system allowing the vessel to weathervane with wind and currents. Deck equipped with cargo transfer systems, loading arms or hoses, and installations necessary for the safe storage of hydrocarbons.",
      p3:"Deck (cargo transfer operations, mooring, fire safety), Engine (pump maintenance, generators, tank inerting system), Cargo Operations (storage and transfer control), dedicated Safety/HSE due to constant hydrocarbon risk.",
      p4:"OIM (Offshore Installation Manager) or Master, Chief Officer/Cargo Officer, Chief Engineer, Mooring Master / Loading Master (depending on operator) for shuttle transfer operations, survival and process control operators, HSE technicians.",
      p5:"Continuous reception of crude from the field, tank level management, ship-to-ship transfer operations with shuttle tankers (often tandem or side-by-side), tank inerting and gas-freeing, monitoring of the turret mooring system, inspection and maintenance of transfer systems and safety equipment.",
      p6:"Fire and explosion risk (hydrocarbon vapors), mooring system failure in degraded weather conditions, risks linked to ship-to-ship transfer operations (collision, hose rupture), marine pollution in case of hydrocarbon leak, prolonged exposure at sea without possibility of rapid evacuation.",
      p7:"Stable and sought-after position in offshore oil & gas, often long rotations (4-6 weeks), bonuses linked to the offshore environment, natural pathway to FPSOs or fixed platforms, strong demand for certified Cargo/Process personnel.",
      p8:"Some FSOs are former supertankers over 40 years old converted for a second life spanning several decades. The turret system allows the vessel to rotate 360° around its anchor point while remaining connected to its permanent mooring system.",
    },
    es:{
      title:"Unidad flotante de almacenamiento y descarga (FSO)",
      p0:"El FSO (Floating Storage and Offloading unit) es una unidad flotante de almacenamiento de petróleo, generalmente amarrada de forma permanente cerca de un campo petrolero offshore. Normalmente no realiza el tratamiento primario de los hidrocarburos; su función principal es el almacenamiento y la exportación. A menudo procede de la conversión de un antiguo petrolero (VLCC o Suezmax), aunque también puede construirse nuevo para este rol dedicado.",
      p1:"Recibir el petróleo crudo extraído por una plataforma o un FPSO cercano mediante tubería o riser, almacenarlo en sus tanques, y transferirlo periódicamente a buques lanzadera (shuttle tankers) o petroleros de exportación que lo llevan hacia las refinerías. El FSO actúa como un amortiguador logístico entre la producción continua y la exportación discontinua.",
      p2:"Capacidad de almacenamiento frecuentemente entre 1 y 2,5 millones de barriles. La mayoría de los FSO no cuentan con propulsión operativa y permanecen amarrados de forma permanente en el campo, mantenidos en posición por un sistema de amarre de torreta (turret mooring) que permite al buque orientarse según el viento y las corrientes. Cubierta equipada con sistemas de transferencia de carga, brazos o mangueras de carga, e instalaciones necesarias para el almacenamiento seguro de hidrocarburos.",
      p3:"Deck (operaciones de transferencia de carga, amarre, seguridad contra incendios), Engine (mantenimiento de bombas, generadores, sistema de inertización de tanques), Cargo Operations (control del almacenamiento y las transferencias), Safety/HSE dedicado debido al riesgo constante de hidrocarburos.",
      p4:"OIM (Offshore Installation Manager) o Master, Chief Officer/Cargo Officer, Chief Engineer, Mooring Master / Loading Master (según el operador) para las operaciones de transferencia lanzadera, operadores de supervivencia y control de proceso, técnicos de HSE.",
      p5:"Recepción continua del crudo desde el campo, gestión de los niveles de los tanques, operaciones de transferencia ship-to-ship con buques lanzadera (a menudo en tándem o costado con costado), inertización y desgasificación de tanques, supervisión del sistema de amarre de torreta, inspección y mantenimiento de los sistemas de transferencia y equipos de seguridad.",
      p6:"Riesgo de incendio y explosión (vapores de hidrocarburos), fallo del sistema de amarre en condiciones meteorológicas adversas, riesgos relacionados con las operaciones de transferencia ship-to-ship (colisión, rotura de manguera), contaminación marina en caso de fuga de hidrocarburos, exposición prolongada en el mar sin posibilidad de evacuación rápida.",
      p7:"Puesto estable y muy solicitado en el sector offshore de oil & gas, a menudo con rotaciones largas (4-6 semanas), primas asociadas al entorno offshore, vía natural hacia los FPSO o las plataformas fijas, fuerte demanda de personal certificado en Cargo/Process.",
      p8:"Algunos FSO son antiguos superpetroleros de más de 40 años convertidos para una segunda vida de varias décadas. El sistema de torreta permite al buque girar 360° alrededor de su punto de anclaje, permaneciendo conectado en todo momento a su sistema de amarre permanente.",
    },
    pt:{
      title:"Unidade flutuante de armazenamento e descarga (FSO)",
      p0:"O FSO (Floating Storage and Offloading unit) é uma unidade flutuante de armazenamento de petróleo, geralmente amarrada de forma permanente perto de um campo petrolífero offshore. Normalmente não realiza o tratamento primário dos hidrocarbonetos; a sua função principal é o armazenamento e a exportação. Frequentemente resulta da conversão de um antigo petroleiro (VLCC ou Suezmax), podendo também ser construído de raiz para esta função dedicada.",
      p1:"Receber o petróleo bruto extraído por uma plataforma ou um FPSO próximo através de tubulação ou riser, armazená-lo nos seus tanques, e transferi-lo periodicamente para navios lançadeira (shuttle tankers) ou petroleiros de exportação que o transportam até às refinarias. O FSO funciona como um amortecedor logístico entre a produção contínua e a exportação descontínua.",
      p2:"Capacidade de armazenamento frequentemente entre 1 e 2,5 milhões de barris. A maioria dos FSO não dispõe de propulsão operacional e permanece amarrada de forma permanente no campo, mantida em posição por um sistema de amarração de torre (turret mooring) que permite ao navio orientar-se de acordo com o vento e as correntes. Convés equipado com sistemas de transferência de carga, braços ou mangueiras de carregamento, e instalações necessárias para o armazenamento seguro de hidrocarbonetos.",
      p3:"Deck (operações de transferência de carga, amarração, segurança contra incêndios), Engine (manutenção de bombas, geradores, sistema de inertização dos tanques), Cargo Operations (controlo do armazenamento e das transferências), Safety/HSE dedicado devido ao risco constante de hidrocarbonetos.",
      p4:"OIM (Offshore Installation Manager) ou Master, Chief Officer/Cargo Officer, Chief Engineer, Mooring Master / Loading Master (consoante o operador) para as operações de transferência lançadeira, operadores de sobrevivência e controlo de processo, técnicos de HSE.",
      p5:"Receção contínua do bruto proveniente do campo, gestão dos níveis dos tanques, operações de transferência ship-to-ship com navios lançadeira (frequentemente em tandem ou lado a lado), inertização e desgaseificação dos tanques, monitorização do sistema de amarração de torre, inspeção e manutenção dos sistemas de transferência e equipamentos de segurança.",
      p6:"Risco de incêndio e explosão (vapores de hidrocarbonetos), falha do sistema de amarração em condições meteorológicas adversas, riscos associados às operações de transferência ship-to-ship (colisão, rutura de mangueira), poluição marinha em caso de fuga de hidrocarbonetos, exposição prolongada no mar sem possibilidade de evacuação rápida.",
      p7:"Posição estável e muito procurada no setor offshore de oil & gas, frequentemente com rotações longas (4-6 semanas), prémios associados ao ambiente offshore, via natural para os FPSO ou plataformas fixas, forte procura de pessoal certificado em Cargo/Process.",
      p8:"Alguns FSO são antigos superpetroleiros com mais de 40 anos convertidos para uma segunda vida de várias décadas. O sistema de torre permite ao navio girar 360° em torno do seu ponto de ancoragem, permanecendo sempre ligado ao seu sistema de amarração permanente.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function Fso({ lang="fr" }) {
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
