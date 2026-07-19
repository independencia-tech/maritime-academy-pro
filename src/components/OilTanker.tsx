// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "oil_tanker"
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
      title:"Pétrolier",
      p0:"Le pétrolier transporte du pétrole brut ou des produits raffinés en vrac, dans des citernes intégrées à la coque. C'est l'un des types de navires les plus réglementés au monde en raison des risques environnementaux et de sécurité liés à sa cargaison.",
      p1:"Transporter du pétrole brut ou des produits pétroliers raffinés (essence, diesel, kérosène) entre zones de production, raffineries et zones de consommation, en grandes quantités.",
      p2:"Longueur : de 150 m (produits raffinés) à plus de 380 m (VLCC/ULCC). Capacité : de quelques dizaines de milliers à plus de 300 000 tonnes de port en lourd (DWT). Double coque obligatoire depuis MARPOL Annexe I pour limiter les risques de pollution en cas de collision ou d'échouement.",
      p3:"Deck Department (navigation, opérations de cargaison, sécurité), Engine Department (propulsion, systèmes auxiliaires), avec une attention particulière portée aux systèmes de gaz inerte et de lavage des citernes (Crude Oil Washing).",
      p4:"Master, Chief Officer (responsable des opérations de cargaison), Officer of the Watch, Pumpman (spécialiste des pompes de cargaison), Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Chargement/déchargement via manifold et pompes de cargaison, gestion du système de gaz inerte, opérations de ballastage, nettoyage des citernes (Crude Oil Washing), mesures de jauge et de creux (ullage).",
      p6:"Explosion et incendie liés aux vapeurs d'hydrocarbures, pollution marine en cas de rupture de coque, intoxication lors des opérations en espace confiné, risques liés à l'électricité statique pendant le chargement.",
      p7:"Secteur exigeant des certifications spécifiques (Tanker Familiarization, Oil Tanker endorsement), officiers Deck et Engine très recherchés compte tenu de la spécialisation requise et de la rémunération généralement plus élevée dans ce secteur.",
      p8:"Les plus grands pétroliers (ULCC) peuvent transporter plus de 3 millions de barils de pétrole en une seule traversée. Le Crude Oil Washing, technique développée dans les années 1970, permet de nettoyer les citernes avec le pétrole brut lui-même plutôt qu'avec de l'eau.",
    },
    en:{
      title:"Oil Tanker",
      p0:"The oil tanker carries crude oil or refined products in bulk, in tanks integrated into the hull. It is one of the most heavily regulated ship types in the world due to the environmental and safety risks associated with its cargo.",
      p1:"Carry crude oil or refined petroleum products (gasoline, diesel, kerosene) between production areas, refineries, and consumption areas, in large quantities.",
      p2:"Length: from 150 m (refined products) to over 380 m (VLCC/ULCC). Capacity: from a few tens of thousands to over 300,000 deadweight tonnes (DWT). Double hull mandatory since MARPOL Annex I to limit pollution risk in case of collision or grounding.",
      p3:"Deck Department (navigation, cargo operations, safety), Engine Department (propulsion, auxiliary systems), with particular attention to inert gas systems and tank cleaning (Crude Oil Washing).",
      p4:"Master, Chief Officer (responsible for cargo operations), Officer of the Watch, Pumpman (cargo pump specialist), Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Loading/unloading via manifold and cargo pumps, inert gas system management, ballasting operations, tank cleaning (Crude Oil Washing), ullage and sounding measurements.",
      p6:"Explosion and fire linked to hydrocarbon vapors, marine pollution in case of hull rupture, poisoning during confined space operations, risks related to static electricity during loading.",
      p7:"Sector requiring specific certifications (Tanker Familiarization, Oil Tanker endorsement), Deck and Engine officers highly sought after given the required specialization and generally higher pay in this sector.",
      p8:"The largest oil tankers (ULCC) can carry over 3 million barrels of oil in a single voyage. Crude Oil Washing, a technique developed in the 1970s, allows tanks to be cleaned with the crude oil itself rather than with water.",
    },
    es:{
      title:"Petrolero",
      p0:"El petrolero transporta petróleo crudo o productos refinados a granel, en tanques integrados en el casco. Es uno de los tipos de buques más regulados del mundo debido a los riesgos ambientales y de seguridad asociados a su carga.",
      p1:"Transportar petróleo crudo o productos petrolíferos refinados (gasolina, diésel, queroseno) entre zonas de producción, refinerías y zonas de consumo, en grandes cantidades.",
      p2:"Longitud: de 150 m (productos refinados) a más de 380 m (VLCC/ULCC). Capacidad: de unas decenas de miles a más de 300.000 toneladas de peso muerto (DWT). Doble casco obligatorio desde el Anexo I de MARPOL para limitar el riesgo de contaminación en caso de colisión o varamiento.",
      p3:"Deck Department (navegación, operaciones de carga, seguridad), Engine Department (propulsión, sistemas auxiliares), con especial atención a los sistemas de gas inerte y limpieza de tanques (Crude Oil Washing).",
      p4:"Master, Chief Officer (responsable de las operaciones de carga), Officer of the Watch, Pumpman (especialista en bombas de carga), Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Carga/descarga mediante manifold y bombas de carga, gestión del sistema de gas inerte, operaciones de lastre, limpieza de tanques (Crude Oil Washing), mediciones de sondeo y vacío (ullage).",
      p6:"Explosión e incendio relacionados con vapores de hidrocarburos, contaminación marina en caso de rotura del casco, intoxicación durante operaciones en espacios confinados, riesgos relacionados con la electricidad estática durante la carga.",
      p7:"Sector que exige certificaciones específicas (Tanker Familiarization, Oil Tanker endorsement), oficiales Deck y Engine muy solicitados dada la especialización requerida y la remuneración generalmente más alta en este sector.",
      p8:"Los petroleros más grandes (ULCC) pueden transportar más de 3 millones de barriles de petróleo en una sola travesía. El Crude Oil Washing, técnica desarrollada en los años 1970, permite limpiar los tanques con el propio petróleo crudo en lugar de agua.",
    },
    pt:{
      title:"Petroleiro",
      p0:"O petroleiro transporta petróleo bruto ou produtos refinados a granel, em tanques integrados no casco. É um dos tipos de navios mais regulamentados do mundo devido aos riscos ambientais e de segurança associados à sua carga.",
      p1:"Transportar petróleo bruto ou produtos petrolíferos refinados (gasolina, diesel, querosene) entre zonas de produção, refinarias e zonas de consumo, em grandes quantidades.",
      p2:"Comprimento: de 150 m (produtos refinados) a mais de 380 m (VLCC/ULCC). Capacidade: de algumas dezenas de milhares a mais de 300.000 toneladas de porte bruto (DWT). Duplo casco obrigatório desde o Anexo I da MARPOL para limitar o risco de poluição em caso de colisão ou encalhe.",
      p3:"Deck Department (navegação, operações de carga, segurança), Engine Department (propulsão, sistemas auxiliares), com atenção especial aos sistemas de gás inerte e limpeza de tanques (Crude Oil Washing).",
      p4:"Master, Chief Officer (responsável pelas operações de carga), Officer of the Watch, Pumpman (especialista em bombas de carga), Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Carregamento/descarregamento através de manifold e bombas de carga, gestão do sistema de gás inerte, operações de lastro, limpeza de tanques (Crude Oil Washing), medições de sondagem e vazio (ullage).",
      p6:"Explosão e incêndio relacionados com vapores de hidrocarbonetos, poluição marinha em caso de rutura do casco, intoxicação durante operações em espaços confinados, riscos relacionados com a eletricidade estática durante o carregamento.",
      p7:"Setor que exige certificações específicas (Tanker Familiarization, Oil Tanker endorsement), oficiais Deck e Engine muito procurados dada a especialização exigida e a remuneração geralmente mais elevada neste setor.",
      p8:"Os maiores petroleiros (ULCC) podem transportar mais de 3 milhões de barris de petróleo numa única travessia. O Crude Oil Washing, técnica desenvolvida nos anos 1970, permite limpar os tanques com o próprio petróleo bruto em vez de água.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function OilTanker({ lang="fr" }) {
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
