// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "chemical_tanker"
// Standalone documentary component: no Dashboard/progression/billing dependency.
import { C, Card, SL, GLine } from "./LessonShared";
import { ChemicalTankerSVG } from "./ShipIllustrations";

const SECTION_LABELS = {
  fr: { profile:"Fiche navire", mission:"Mission", characteristics:"Caractéristiques générales", departments:"Départements à bord", positions:"Postes typiques", operations:"Opérations typiques", risks:"Risques principaux", careers:"Débouchés professionnels", facts:"Anecdotes" },
  en: { profile:"Ship Profile", mission:"Mission", characteristics:"General Characteristics", departments:"Onboard Departments", positions:"Typical Positions", operations:"Typical Operations", risks:"Main Risks", careers:"Career Opportunities", facts:"Interesting Facts" },
  es: { profile:"Ficha del buque", mission:"Misión", characteristics:"Características generales", departments:"Departamentos a bordo", positions:"Puestos típicos", operations:"Operaciones típicas", risks:"Riesgos principales", careers:"Oportunidades profesionales", facts:"Datos curiosos" },
  pt: { profile:"Ficha do navio", mission:"Missão", characteristics:"Características gerais", departments:"Departamentos a bordo", positions:"Cargos típicos", operations:"Operações típicas", risks:"Riscos principais", careers:"Oportunidades profissionais", facts:"Curiosidades" },
};

const getContent = lang => {
  const d = {
    fr:{
      title:"Chimiquier",
      p0:"Le chimiquier transporte des produits chimiques liquides en vrac, souvent plusieurs cargaisons différentes simultanément dans des citernes séparées. Sa complexité opérationnelle dépasse celle du pétrolier classique en raison de la diversité des produits transportés.",
      p1:"Transporter des produits chimiques liquides (acides, solvants, huiles végétales, produits pétrochimiques) entre sites de production et de transformation, souvent en cargaisons multiples et distinctes sur un même voyage.",
      p2:"Longueur : de 100 m à plus de 250 m selon la taille. Capacité : de quelques milliers à plus de 40 000 tonnes de port en lourd (DWT). Citernes revêtues de matériaux spécifiques (acier inoxydable, revêtement époxy) selon la compatibilité chimique de chaque produit transporté.",
      p3:"Deck Department (navigation, opérations de cargaison multi-produits), Engine Department (propulsion, systèmes auxiliaires), avec une expertise renforcée en chimie appliquée pour la compatibilité des cargaisons et la prévention des réactions dangereuses.",
      p4:"Master, Chief Officer (responsable du plan de cargaison multi-produits), Officer of the Watch, Pumpman, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Vérification de la compatibilité chimique avant chaque chargement, nettoyage rigoureux des citernes entre cargaisons différentes, chargement/déchargement via systèmes dédiés par produit, contrôle strict de la contamination croisée entre cargaisons.",
      p6:"Réactions chimiques dangereuses en cas de contamination croisée entre produits incompatibles, exposition à des vapeurs toxiques, corrosion accélérée des équipements selon les produits transportés, complexité accrue de la gestion des déchets et résidus de nettoyage.",
      p7:"Secteur nécessitant une expertise pointue en chimie du transport maritime (certification IMDG/IBC Code), officiers spécialisés très recherchés, carrière souvent perçue comme plus technique et exigeante que sur pétrolier classique.",
      p8:"Un chimiquier peut transporter simultanément plusieurs dizaines de cargaisons différentes dans des citernes séparées, contre une cargaison unique pour un pétrolier classique. Le Code IBC (International Bulk Chemical Code) référence plus de 100 produits chimiques distincts avec leurs exigences de transport spécifiques.",
    },
    en:{
      title:"Chemical Tanker",
      p0:"The chemical tanker carries liquid chemical products in bulk, often several different cargoes simultaneously in separate tanks. Its operational complexity exceeds that of a conventional oil tanker due to the diversity of products carried.",
      p1:"Carry liquid chemical products (acids, solvents, vegetable oils, petrochemical products) between production and processing sites, often with multiple distinct cargoes on the same voyage.",
      p2:"Length: from 100 m to over 250 m depending on size. Capacity: from a few thousand to over 40,000 deadweight tonnes (DWT). Tanks coated with specific materials (stainless steel, epoxy coating) depending on the chemical compatibility of each product carried.",
      p3:"Deck Department (navigation, multi-product cargo operations), Engine Department (propulsion, auxiliary systems), with enhanced expertise in applied chemistry for cargo compatibility and prevention of dangerous reactions.",
      p4:"Master, Chief Officer (responsible for the multi-product cargo plan), Officer of the Watch, Pumpman, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Checking chemical compatibility before each loading, rigorous tank cleaning between different cargoes, loading/unloading via dedicated systems per product, strict control of cross-contamination between cargoes.",
      p6:"Dangerous chemical reactions in case of cross-contamination between incompatible products, exposure to toxic vapors, accelerated equipment corrosion depending on products carried, increased complexity in managing waste and cleaning residues.",
      p7:"Sector requiring specialized expertise in maritime chemical transport (IMDG/IBC Code certification), specialized officers highly sought after, career often perceived as more technical and demanding than on a conventional oil tanker.",
      p8:"A chemical tanker can carry dozens of different cargoes simultaneously in separate tanks, compared to a single cargo for a conventional oil tanker. The IBC Code (International Bulk Chemical Code) lists over 100 distinct chemical products with their specific transport requirements.",
    },
    es:{
      title:"Quimiquero",
      p0:"El quimiquero transporta productos químicos líquidos a granel, a menudo varias cargas diferentes simultáneamente en tanques separados. Su complejidad operativa supera la de un petrolero convencional debido a la diversidad de productos transportados.",
      p1:"Transportar productos químicos líquidos (ácidos, disolventes, aceites vegetales, productos petroquímicos) entre sitios de producción y transformación, a menudo con cargas múltiples y distintas en un mismo viaje.",
      p2:"Longitud: de 100 m a más de 250 m según el tamaño. Capacidad: de unos miles a más de 40.000 toneladas de peso muerto (DWT). Tanques revestidos con materiales específicos (acero inoxidable, revestimiento epoxi) según la compatibilidad química de cada producto transportado.",
      p3:"Deck Department (navegación, operaciones de carga multiproducto), Engine Department (propulsión, sistemas auxiliares), con una experiencia reforzada en química aplicada para la compatibilidad de las cargas y la prevención de reacciones peligrosas.",
      p4:"Master, Chief Officer (responsable del plan de carga multiproducto), Officer of the Watch, Pumpman, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Verificación de la compatibilidad química antes de cada carga, limpieza rigurosa de los tanques entre cargas diferentes, carga/descarga mediante sistemas dedicados por producto, control estricto de la contaminación cruzada entre cargas.",
      p6:"Reacciones químicas peligrosas en caso de contaminación cruzada entre productos incompatibles, exposición a vapores tóxicos, corrosión acelerada de los equipos según los productos transportados, mayor complejidad en la gestión de residuos y restos de limpieza.",
      p7:"Sector que requiere una experiencia especializada en química del transporte marítimo (certificación IMDG/IBC Code), oficiales especializados muy solicitados, carrera a menudo percibida como más técnica y exigente que en un petrolero convencional.",
      p8:"Un quimiquero puede transportar simultáneamente varias decenas de cargas diferentes en tanques separados, frente a una carga única para un petrolero convencional. El Código IBC (International Bulk Chemical Code) recoge más de 100 productos químicos distintos con sus requisitos de transporte específicos.",
    },
    pt:{
      title:"Quimiqueiro",
      p0:"O quimiqueiro transporta produtos químicos líquidos a granel, frequentemente várias cargas diferentes simultaneamente em tanques separados. A sua complexidade operacional ultrapassa a de um petroleiro convencional devido à diversidade de produtos transportados.",
      p1:"Transportar produtos químicos líquidos (ácidos, solventes, óleos vegetais, produtos petroquímicos) entre locais de produção e transformação, frequentemente com cargas múltiplas e distintas na mesma viagem.",
      p2:"Comprimento: de 100 m a mais de 250 m consoante o porte. Capacidade: de alguns milhares a mais de 40.000 toneladas de porte bruto (DWT). Tanques revestidos com materiais específicos (aço inoxidável, revestimento epóxi) consoante a compatibilidade química de cada produto transportado.",
      p3:"Deck Department (navegação, operações de carga multiproduto), Engine Department (propulsão, sistemas auxiliares), com experiência reforçada em química aplicada para a compatibilidade das cargas e prevenção de reações perigosas.",
      p4:"Master, Chief Officer (responsável pelo plano de carga multiproduto), Officer of the Watch, Pumpman, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Verificação da compatibilidade química antes de cada carregamento, limpeza rigorosa dos tanques entre cargas diferentes, carregamento/descarregamento através de sistemas dedicados por produto, controlo rigoroso da contaminação cruzada entre cargas.",
      p6:"Reações químicas perigosas em caso de contaminação cruzada entre produtos incompatíveis, exposição a vapores tóxicos, corrosão acelerada dos equipamentos consoante os produtos transportados, maior complexidade na gestão de resíduos e restos de limpeza.",
      p7:"Setor que exige experiência especializada em química do transporte marítimo (certificação IMDG/IBC Code), oficiais especializados muito procurados, carreira frequentemente vista como mais técnica e exigente do que num petroleiro convencional.",
      p8:"Um quimiqueiro pode transportar simultaneamente várias dezenas de cargas diferentes em tanques separados, contra uma carga única para um petroleiro convencional. O Código IBC (International Bulk Chemical Code) referencia mais de 100 produtos químicos distintos com as suas exigências de transporte específicas.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function ChemicalTanker({ lang="fr" }) {
  const lc = getContent(lang);
  const L = SECTION_LABELS[lang]||SECTION_LABELS.fr;

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",position:"relative"}}>
      <div style={{padding:"28px 16px 40px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(26,111,212,0.15)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.blue2,fontWeight:700}}>🚢 Ships Library</div>
          <div style={{marginBottom:14,borderRadius:16,overflow:"hidden",border:`1px solid ${C.border}`}}><ChemicalTankerSVG/></div>
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
