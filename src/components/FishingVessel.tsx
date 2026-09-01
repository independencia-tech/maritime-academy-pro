// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "fishing_vessel"
// Standalone documentary component: no Dashboard/progression/billing dependency.
import { C, Card, SL, GLine } from "./LessonShared";
import { FishingVesselSVG } from "./ShipIllustrations";

const SECTION_LABELS = {
  fr: { profile:"Fiche navire", mission:"Mission", characteristics:"Caractéristiques générales", departments:"Départements à bord", positions:"Postes typiques", operations:"Opérations typiques", risks:"Risques principaux", careers:"Débouchés professionnels", facts:"Anecdotes" },
  en: { profile:"Ship Profile", mission:"Mission", characteristics:"General Characteristics", departments:"Onboard Departments", positions:"Typical Positions", operations:"Typical Operations", risks:"Main Risks", careers:"Career Opportunities", facts:"Interesting Facts" },
  es: { profile:"Ficha del buque", mission:"Misión", characteristics:"Características generales", departments:"Departamentos a bordo", positions:"Puestos típicos", operations:"Operaciones típicas", risks:"Riesgos principales", careers:"Oportunidades profesionales", facts:"Datos curiosos" },
  pt: { profile:"Ficha do navio", mission:"Missão", characteristics:"Características gerais", departments:"Departamentos a bordo", positions:"Cargos típicos", operations:"Operações típicas", risks:"Riscos principais", careers:"Oportunidades profissionais", facts:"Curiosidades" },
};

const getContent = lang => {
  const d = {
    fr:{
      title:"Navire de pêche",
      p0:"Le navire de pêche capture, traite et parfois transforme le poisson en mer. C'est l'un des métiers maritimes les plus anciens et les plus dangereux au monde, allant du petit bateau côtier au grand navire-usine hauturier.",
      p1:"Localiser, capturer et traiter des ressources halieutiques selon différentes techniques (chalutage, senne, palangre, casiers), en respectant les quotas et réglementations de pêche en vigueur dans les zones exploitées.",
      p2:"Longueur : de 10 m pour la pêche côtière à plus de 130 m pour les grands navires-usines. Équipements spécifiques selon la technique de pêche : chaluts et treuils, senneurs équipés de puissants winches, viviers ou cales réfrigérées/congelées selon le type de conservation du poisson.",
      p3:"Deck Department (manœuvres de pêche, gestion des filets et engins de capture), Engine Department (propulsion, systèmes de réfrigération/congélation), et sur les grands navires-usines, un département de transformation dédié au traitement et à la mise en conserve du poisson à bord.",
      p4:"Skipper/Master, Mate, Deckhand (souvent polyvalent dans les manœuvres de pêche), Chief Engineer ; sur les navires-usines s'ajoutent des ouvriers de transformation dédiés au traitement du poisson.",
      p5:"Déploiement et récupération des engins de pêche (chalut, senne, palangre), tri et traitement immédiat des prises, gestion de la conservation à bord (glace, réfrigération, congélation), respect des zones et quotas de pêche réglementaires.",
      p6:"Le métier de pêcheur figure parmi les plus dangereux au monde : chutes par-dessus bord lors des manœuvres de filets, risques liés au mauvais temps sur des navires souvent de petite taille, fatigue extrême due à des horaires de travail intensifs, risques de happement par les treuils et machines de pêche.",
      p7:"Secteur traditionnellement familial ou local dans de nombreuses régions, offrant un accès rapide à des responsabilités sur les petites unités, mais confronté à des défis économiques (quotas, ressources en déclin) selon les zones de pêche.",
      p8:"Selon plusieurs études internationales sur la sécurité maritime, la pêche reste statistiquement l'une des activités professionnelles les plus mortelles au monde, avec un taux d'accidents largement supérieur à celui du commerce maritime classique. Les grands navires-usines peuvent traiter et congeler plusieurs centaines de tonnes de poisson par jour.",
    },
    en:{
      title:"Fishing Vessel",
      p0:"The fishing vessel catches, processes, and sometimes transforms fish at sea. It is one of the oldest and most dangerous maritime trades in the world, ranging from small coastal boats to large ocean-going factory ships.",
      p1:"Locate, catch, and process fishery resources using various techniques (trawling, seining, longlining, potting), while respecting quotas and fishing regulations in force in the exploited areas.",
      p2:"Length: from 10 m for coastal fishing to over 130 m for large factory ships. Specific equipment depending on fishing technique: trawls and winches, seiners equipped with powerful winches, live wells or refrigerated/frozen holds depending on the fish preservation method.",
      p3:"Deck Department (fishing maneuvers, managing nets and capture gear), Engine Department (propulsion, refrigeration/freezing systems), and on large factory ships, a dedicated processing department for treating and canning fish on board.",
      p4:"Skipper/Master, Mate, Deckhand (often versatile in fishing maneuvers), Chief Engineer; factory ships add processing workers dedicated to fish treatment.",
      p5:"Deploying and recovering fishing gear (trawl, seine, longline), sorting and immediately processing catches, managing onboard preservation (ice, refrigeration, freezing), respecting regulatory fishing zones and quotas.",
      p6:"Fishing is among the most dangerous occupations in the world: falls overboard during net handling, risks related to bad weather on often small vessels, extreme fatigue from intensive working hours, risk of entanglement in winches and fishing machinery.",
      p7:"Traditionally a family or local sector in many regions, offering quick access to responsibility on small units, but facing economic challenges (quotas, declining resources) depending on fishing areas.",
      p8:"According to several international maritime safety studies, fishing remains statistically one of the deadliest occupations in the world, with an accident rate far higher than conventional merchant shipping. Large factory ships can process and freeze several hundred tonnes of fish per day.",
    },
    es:{
      title:"Buque de pesca",
      p0:"El buque de pesca captura, procesa y a veces transforma el pescado en el mar. Es uno de los oficios marítimos más antiguos y peligrosos del mundo, desde el pequeño barco costero hasta el gran buque-factoría de altura.",
      p1:"Localizar, capturar y procesar recursos pesqueros mediante diferentes técnicas (arrastre, cerco, palangre, nasas), respetando las cuotas y la normativa de pesca vigente en las zonas explotadas.",
      p2:"Longitud: de 10 m para la pesca costera a más de 130 m para los grandes buques-factoría. Equipos específicos según la técnica de pesca: redes de arrastre y chigres, cerqueros equipados con potentes chigres, viveros o bodegas refrigeradas/congeladas según el tipo de conservación del pescado.",
      p3:"Deck Department (maniobras de pesca, gestión de redes y artes de captura), Engine Department (propulsión, sistemas de refrigeración/congelación), y en los grandes buques-factoría, un departamento de transformación dedicado al tratamiento y enlatado del pescado a bordo.",
      p4:"Skipper/Master, Mate, Deckhand (a menudo polivalente en las maniobras de pesca), Chief Engineer; en los buques-factoría se añaden trabajadores de transformación dedicados al tratamiento del pescado.",
      p5:"Despliegue y recuperación de artes de pesca (arrastre, cerco, palangre), clasificación y tratamiento inmediato de las capturas, gestión de la conservación a bordo (hielo, refrigeración, congelación), respeto de las zonas y cuotas de pesca reglamentarias.",
      p6:"La pesca figura entre los oficios más peligrosos del mundo: caídas por la borda durante las maniobras de redes, riesgos relacionados con el mal tiempo en buques a menudo de pequeño tamaño, fatiga extrema debida a horarios de trabajo intensivos, riesgos de atrapamiento por los chigres y maquinaria de pesca.",
      p7:"Sector tradicionalmente familiar o local en muchas regiones, que ofrece un acceso rápido a responsabilidades en las unidades pequeñas, pero enfrentado a desafíos económicos (cuotas, recursos en declive) según las zonas de pesca.",
      p8:"Según varios estudios internacionales sobre seguridad marítima, la pesca sigue siendo estadísticamente una de las actividades profesionales más mortales del mundo, con una tasa de accidentes muy superior a la del comercio marítimo clásico. Los grandes buques-factoría pueden procesar y congelar varios cientos de toneladas de pescado al día.",
    },
    pt:{
      title:"Navio de pesca",
      p0:"O navio de pesca captura, processa e por vezes transforma o peixe no mar. É um dos ofícios marítimos mais antigos e perigosos do mundo, desde o pequeno barco costeiro até ao grande navio-fábrica de longo curso.",
      p1:"Localizar, capturar e processar recursos pesqueiros através de diferentes técnicas (arrasto, cerco, palangre, covos), respeitando as quotas e a regulamentação de pesca em vigor nas zonas exploradas.",
      p2:"Comprimento: de 10 m para a pesca costeira a mais de 130 m para os grandes navios-fábrica. Equipamentos específicos consoante a técnica de pesca: redes de arrasto e guinchos, cercadores equipados com guinchos potentes, viveiros ou porões refrigerados/congelados consoante o tipo de conservação do peixe.",
      p3:"Deck Department (manobras de pesca, gestão de redes e artes de captura), Engine Department (propulsão, sistemas de refrigeração/congelação), e nos grandes navios-fábrica, um departamento de transformação dedicado ao tratamento e enlatamento do peixe a bordo.",
      p4:"Skipper/Master, Mate, Deckhand (frequentemente polivalente nas manobras de pesca), Chief Engineer; nos navios-fábrica juntam-se trabalhadores de transformação dedicados ao tratamento do peixe.",
      p5:"Implantação e recuperação de artes de pesca (arrasto, cerco, palangre), triagem e tratamento imediato das capturas, gestão da conservação a bordo (gelo, refrigeração, congelação), respeito das zonas e quotas de pesca regulamentares.",
      p6:"A pesca figura entre os ofícios mais perigosos do mundo: quedas ao mar durante as manobras de redes, riscos relacionados com o mau tempo em navios frequentemente de pequeno porte, fadiga extrema devido a horários de trabalho intensivos, riscos de aprisionamento pelos guinchos e maquinaria de pesca.",
      p7:"Setor tradicionalmente familiar ou local em muitas regiões, oferecendo um acesso rápido a responsabilidades nas unidades pequenas, mas enfrentando desafios económicos (quotas, recursos em declínio) consoante as zonas de pesca.",
      p8:"Segundo vários estudos internacionais sobre segurança marítima, a pesca continua a ser estatisticamente uma das atividades profissionais mais mortais do mundo, com uma taxa de acidentes muito superior à do comércio marítimo clássico. Os grandes navios-fábrica podem processar e congelar várias centenas de toneladas de peixe por dia.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function FishingVessel({ lang="fr" }) {
  const lc = getContent(lang);
  const L = SECTION_LABELS[lang]||SECTION_LABELS.fr;

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",position:"relative"}}>
      <div style={{padding:"28px 16px 40px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(26,111,212,0.15)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.blue2,fontWeight:700}}>🚢 Ships Library</div>
          <div style={{marginBottom:14,borderRadius:16,overflow:"hidden",border:`1px solid ${C.border}`}}><FishingVesselSVG/></div>
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
