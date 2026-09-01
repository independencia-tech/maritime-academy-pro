// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "lpg_carrier"
// Standalone documentary component: no Dashboard/progression/billing dependency.
import { C, Card, SL, GLine } from "./LessonShared";
import { LpgCarrierSVG } from "./ShipIllustrations";

const SECTION_LABELS = {
  fr: { profile:"Fiche navire", mission:"Mission", characteristics:"Caractéristiques générales", departments:"Départements à bord", positions:"Postes typiques", operations:"Opérations typiques", risks:"Risques principaux", careers:"Débouchés professionnels", facts:"Anecdotes" },
  en: { profile:"Ship Profile", mission:"Mission", characteristics:"General Characteristics", departments:"Onboard Departments", positions:"Typical Positions", operations:"Typical Operations", risks:"Main Risks", careers:"Career Opportunities", facts:"Interesting Facts" },
  es: { profile:"Ficha del buque", mission:"Misión", characteristics:"Características generales", departments:"Departamentos a bordo", positions:"Puestos típicos", operations:"Operaciones típicas", risks:"Riesgos principales", careers:"Oportunidades profesionales", facts:"Datos curiosos" },
  pt: { profile:"Ficha do navio", mission:"Missão", characteristics:"Características gerais", departments:"Departamentos a bordo", positions:"Cargos típicos", operations:"Operações típicas", risks:"Riscos principais", careers:"Oportunidades profissionais", facts:"Curiosidades" },
};

const getContent = lang => {
  const d = {
    fr:{
      title:"Gazier (GPL)",
      p0:"Le LPG Carrier est un navire spécialisé dans le transport de gaz de pétrole liquéfié (propane, butane, ou leurs mélanges), maintenu à l'état liquide par pression, réfrigération ou une combinaison des deux selon le type de navire. Il se distingue du LNG Carrier par la nature du gaz transporté et par des conditions de transport moins extrêmes en température.",
      p1:"Transporter du GPL entre sites de production (raffineries, champs gaziers) et terminaux de réception, pour un usage industriel, domestique (chauffage, cuisine) ou pétrochimique. Certains navires sont également certifiés pour transporter certains gaz pétrochimiques liquéfiés, comme l'ammoniac ou le propylène, selon leur conception et leurs certifications.",
      p2:"Cuves cylindriques ou sphériques sous pression (type C), ou cuves semi-réfrigérées/entièrement réfrigérées à pression atmosphérique selon la classe du navire. Systèmes de réfrigération et de compression pour maintenir la cargaison à l'état liquide, systèmes de détection de gaz et de sécurité incendie renforcés, double coque pour la protection environnementale. Les systèmes de reliquéfaction ou de gestion des vapeurs peuvent varier selon la conception du navire.",
      p3:"Deck (opérations de chargement/déchargement, amarrage, sécurité cargaison), Engine (maintenance des systèmes de réfrigération et de propulsion), Cargo Operations (contrôle de la cargaison, gestion de la pression et de la température), Safety/HSE dédié en raison des risques d'inflammabilité du gaz.",
      p4:"Master, Chief Officer/Cargo Officer, Chief Engineer, Gas Engineer / Cargo Engineer (selon la compagnie), officiers spécialisés cargaison gaz, matelots qualifiés cargaison, personnel HSE.",
      p5:"Chargement et déchargement de la cargaison sous conditions de pression/température contrôlées, échantillonnage et vérification de la qualité de la cargaison avant transfert, inertage et purge des cuves entre cargaisons, surveillance continue des niveaux de gaz et des systèmes de détection, maintenance des systèmes de réfrigération/compression, opérations d'amarrage et de connexion aux bras de chargement.",
      p6:"Risque d'incendie et d'explosion (gaz hautement inflammable), risque d'asphyxie en espace confiné, défaillance des systèmes de réfrigération ou de confinement de la cargaison, exposition au froid extrême lors de fuites de gaz réfrigéré, pollution en cas de rejet accidentel.",
      p7:"Secteur spécialisé du transport de gaz, forte demande de personnel certifié cargaison gaz (STCW gas tanker familiarization/advanced), rémunération attractive liée à la technicité, passerelle naturelle vers les LNG Carriers ou postes de supervision cargaison en compagnie maritime.",
      p8:"Certains LPG Carriers peuvent transporter la cargaison sous trois modes différents (entièrement pressurisé, semi-réfrigéré, entièrement réfrigéré) selon leur conception, offrant une grande flexibilité logistique. Le GPL transporté peut aussi servir de combustible marin alternatif (LPG as fuel) sur certains navires récents.",
    },
    en:{
      title:"LPG Carrier",
      p0:"The LPG Carrier is a vessel specialized in the transport of liquefied petroleum gas (propane, butane, or blends thereof), kept in liquid state through pressure, refrigeration, or a combination of both depending on the vessel type. It differs from the LNG Carrier in the nature of the gas transported and in less extreme temperature transport conditions.",
      p1:"Transport LPG between production sites (refineries, gas fields) and receiving terminals, for industrial, domestic (heating, cooking), or petrochemical use. Some vessels are also certified to carry certain liquefied petrochemical gases, such as ammonia or propylene, depending on their design and certifications.",
      p2:"Cylindrical or spherical pressurized tanks (type C), or semi-refrigerated/fully refrigerated tanks at atmospheric pressure depending on the vessel class. Refrigeration and compression systems to keep the cargo liquid, gas detection and enhanced fire safety systems, double hull for environmental protection. Reliquefaction or vapor management systems may vary depending on vessel design.",
      p3:"Deck (loading/unloading operations, mooring, cargo safety), Engine (maintenance of refrigeration and propulsion systems), Cargo Operations (cargo control, pressure and temperature management), dedicated Safety/HSE due to gas flammability risks.",
      p4:"Master, Chief Officer/Cargo Officer, Chief Engineer, Gas Engineer / Cargo Engineer (depending on the company), specialized gas cargo officers, qualified cargo ratings, HSE personnel.",
      p5:"Loading and unloading cargo under controlled pressure/temperature conditions, sampling and cargo quality verification before transfer, tank inerting and purging between cargoes, continuous monitoring of gas levels and detection systems, maintenance of refrigeration/compression systems, mooring and loading arm connection operations.",
      p6:"Fire and explosion risk (highly flammable gas), asphyxiation risk in confined spaces, failure of refrigeration or cargo containment systems, exposure to extreme cold during refrigerated gas leaks, pollution in case of accidental release.",
      p7:"Specialized gas transport sector, strong demand for certified gas cargo personnel (STCW gas tanker familiarization/advanced), attractive pay linked to technical specialization, natural pathway to LNG Carriers or cargo supervisory roles within shipping companies.",
      p8:"Some LPG Carriers can carry cargo under three different modes (fully pressurized, semi-refrigerated, fully refrigerated) depending on their design, offering great logistical flexibility. The LPG carried can also serve as an alternative marine fuel (LPG as fuel) on some recent vessels.",
    },
    es:{
      title:"Gasero (GLP)",
      p0:"El LPG Carrier es un buque especializado en el transporte de gas licuado de petróleo (propano, butano, o sus mezclas), mantenido en estado líquido mediante presión, refrigeración o una combinación de ambas según el tipo de buque. Se diferencia del LNG Carrier por la naturaleza del gas transportado y por condiciones de transporte con temperaturas menos extremas.",
      p1:"Transportar GLP entre sitios de producción (refinerías, campos gasíferos) y terminales de recepción, para uso industrial, doméstico (calefacción, cocina) o petroquímico. Algunos buques también están certificados para transportar ciertos gases petroquímicos licuados, como amoníaco o propileno, según su diseño y certificaciones.",
      p2:"Tanques cilíndricos o esféricos presurizados (tipo C), o tanques semirrefrigerados/totalmente refrigerados a presión atmosférica según la clase del buque. Sistemas de refrigeración y compresión para mantener la carga en estado líquido, sistemas de detección de gas y seguridad contra incendios reforzados, doble casco para la protección ambiental. Los sistemas de relicuefacción o gestión de vapores pueden variar según el diseño del buque.",
      p3:"Deck (operaciones de carga/descarga, amarre, seguridad de la carga), Engine (mantenimiento de los sistemas de refrigeración y propulsión), Cargo Operations (control de la carga, gestión de la presión y la temperatura), Safety/HSE dedicado debido a los riesgos de inflamabilidad del gas.",
      p4:"Master, Chief Officer/Cargo Officer, Chief Engineer, Gas Engineer / Cargo Engineer (según la compañía), oficiales especializados en carga de gas, marineros calificados de carga, personal de HSE.",
      p5:"Carga y descarga de la mercancía bajo condiciones controladas de presión/temperatura, muestreo y verificación de la calidad de la carga antes de la transferencia, inertización y purga de los tanques entre cargas, supervisión continua de los niveles de gas y de los sistemas de detección, mantenimiento de los sistemas de refrigeración/compresión, operaciones de amarre y conexión a los brazos de carga.",
      p6:"Riesgo de incendio y explosión (gas altamente inflamable), riesgo de asfixia en espacios confinados, fallo de los sistemas de refrigeración o de contención de la carga, exposición a frío extremo durante fugas de gas refrigerado, contaminación en caso de vertido accidental.",
      p7:"Sector especializado del transporte de gas, fuerte demanda de personal certificado en carga de gas (STCW gas tanker familiarization/advanced), remuneración atractiva ligada a la especialización técnica, vía natural hacia los LNG Carrier o puestos de supervisión de carga en compañías navieras.",
      p8:"Algunos LPG Carrier pueden transportar la carga bajo tres modos diferentes (totalmente presurizado, semirrefrigerado, totalmente refrigerado) según su diseño, ofreciendo una gran flexibilidad logística. El GLP transportado también puede servir como combustible marino alternativo (LPG as fuel) en algunos buques recientes.",
    },
    pt:{
      title:"Gaseiro (GLP)",
      p0:"O LPG Carrier é um navio especializado no transporte de gás liquefeito de petróleo (propano, butano, ou suas misturas), mantido no estado líquido por pressão, refrigeração ou uma combinação de ambas, consoante o tipo de navio. Distingue-se do LNG Carrier pela natureza do gás transportado e por condições de transporte com temperaturas menos extremas.",
      p1:"Transportar GLP entre locais de produção (refinarias, campos de gás) e terminais de receção, para uso industrial, doméstico (aquecimento, cozinha) ou petroquímico. Alguns navios estão também certificados para transportar determinados gases petroquímicos liquefeitos, como amoníaco ou propileno, consoante o seu design e certificações.",
      p2:"Tanques cilíndricos ou esféricos pressurizados (tipo C), ou tanques semirrefrigerados/totalmente refrigerados à pressão atmosférica consoante a classe do navio. Sistemas de refrigeração e compressão para manter a carga em estado líquido, sistemas de deteção de gás e segurança contra incêndios reforçados, casco duplo para proteção ambiental. Os sistemas de reliquefação ou gestão de vapores podem variar consoante o design do navio.",
      p3:"Deck (operações de carga/descarga, amarração, segurança da carga), Engine (manutenção dos sistemas de refrigeração e propulsão), Cargo Operations (controlo da carga, gestão da pressão e da temperatura), Safety/HSE dedicado devido aos riscos de inflamabilidade do gás.",
      p4:"Master, Chief Officer/Cargo Officer, Chief Engineer, Gas Engineer / Cargo Engineer (consoante a companhia), oficiais especializados em carga de gás, marinheiros qualificados de carga, pessoal de HSE.",
      p5:"Carga e descarga da mercadoria sob condições controladas de pressão/temperatura, amostragem e verificação da qualidade da carga antes da transferência, inertização e purga dos tanques entre cargas, monitorização contínua dos níveis de gás e dos sistemas de deteção, manutenção dos sistemas de refrigeração/compressão, operações de amarração e ligação aos braços de carregamento.",
      p6:"Risco de incêndio e explosão (gás altamente inflamável), risco de asfixia em espaços confinados, falha dos sistemas de refrigeração ou de contenção da carga, exposição a frio extremo durante fugas de gás refrigerado, poluição em caso de derrame acidental.",
      p7:"Setor especializado do transporte de gás, forte procura de pessoal certificado em carga de gás (STCW gas tanker familiarization/advanced), remuneração atrativa ligada à especialização técnica, via natural para os LNG Carrier ou cargos de supervisão de carga em companhias marítimas.",
      p8:"Alguns LPG Carrier conseguem transportar a carga em três modos diferentes (totalmente pressurizado, semirrefrigerado, totalmente refrigerado) consoante o seu design, oferecendo grande flexibilidade logística. O GLP transportado pode também servir como combustível marítimo alternativo (LPG as fuel) em alguns navios recentes.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function LpgCarrier({ lang="fr" }) {
  const lc = getContent(lang);
  const L = SECTION_LABELS[lang]||SECTION_LABELS.fr;

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",position:"relative"}}>
      <div style={{padding:"28px 16px 40px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(26,111,212,0.15)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.blue2,fontWeight:700}}>🚢 Ships Library</div>
          <div style={{marginBottom:14,borderRadius:16,overflow:"hidden",border:`1px solid ${C.border}`}}><LpgCarrierSVG/></div>
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
