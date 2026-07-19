// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "general_cargo"
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
      title:"Cargo polyvalent",
      p0:"Le cargo polyvalent transporte des marchandises diverses non standardisées : sacs, caisses, machines, produits en vrac conditionnés différemment selon la cargaison. C'est l'ancêtre direct du porte-conteneurs moderne, encore utilisé pour des trafics spécifiques ne se prêtant pas à la conteneurisation.",
      p1:"Transporter des marchandises variées et hétérogènes, souvent en petites quantités vers des ports secondaires ou moins équipés, avec une grande flexibilité d'adaptation à des cargaisons différentes d'un voyage à l'autre.",
      p2:"Longueur : de 80 m à environ 180 m selon les modèles. Capacité : de quelques milliers à environ 20 000 tonnes de port en lourd (DWT). Souvent équipé de ses propres mâts de charge (grues de bord), lui permettant de charger/décharger sans dépendre des infrastructures portuaires.",
      p3:"Deck Department (navigation, arrimage de cargaisons diverses et souvent complexes), Engine Department (propulsion, systèmes auxiliaires), avec une compétence particulière en calcul et vérification de l'arrimage adapté à chaque type de marchandise.",
      p4:"Master, Chief Officer (responsable du plan de chargement multi-marchandises), Officer of the Watch, Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Chargement/déchargement souvent manuel ou semi-automatisé via grues de bord, arrimage spécifique selon la nature de chaque marchandise (sacs, caisses, colis lourds), vérification de la répartition du poids pour la stabilité, escales fréquentes dans des ports variés.",
      p6:"Instabilité liée à une répartition inégale de cargaisons hétérogènes, risques de dommages à la marchandise par manutention inadaptée, exposition accrue aux accidents de manutention (usage fréquent des grues de bord), escales dans des ports parfois moins équipés en sécurité.",
      p7:"Secteur historique de la marine marchande, offrant une bonne polyvalence de compétences (arrimage varié, gestion de cargaisons non standardisées), souvent une bonne porte d'entrée pour les jeunes officiers avant de se spécialiser.",
      p8:"Avant la généralisation du conteneur dans les années 1960-70, le cargo polyvalent était le navire de commerce le plus répandu au monde. Il reste aujourd'hui indispensable pour les marchandises trop volumineuses, trop lourdes ou trop atypiques pour un conteneur standard.",
    },
    en:{
      title:"General Cargo Ship",
      p0:"The general cargo ship carries diverse, non-standardized goods: bags, crates, machinery, bulk products packaged differently depending on the cargo. It is the direct ancestor of the modern container ship, still used for specific trades not suited to containerization.",
      p1:"Carry varied and heterogeneous goods, often in small quantities to secondary or less equipped ports, with great flexibility to adapt to different cargoes from one voyage to the next.",
      p2:"Length: from 80 m to about 180 m depending on the model. Capacity: from a few thousand to about 20,000 deadweight tonnes (DWT). Often equipped with its own cargo gear (onboard cranes), allowing it to load/unload without relying on port infrastructure.",
      p3:"Deck Department (navigation, stowage of diverse and often complex cargoes), Engine Department (propulsion, auxiliary systems), with particular skill in calculating and verifying stowage adapted to each type of goods.",
      p4:"Master, Chief Officer (responsible for the multi-cargo loading plan), Officer of the Watch, Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Often manual or semi-automated loading/unloading via onboard cranes, specific stowage depending on the nature of each cargo (bags, crates, heavy packages), checking weight distribution for stability, frequent calls at varied ports.",
      p6:"Instability linked to uneven distribution of heterogeneous cargoes, risk of cargo damage from unsuitable handling, increased exposure to handling accidents (frequent use of onboard cranes), calls at ports sometimes less equipped for safety.",
      p7:"Historic sector of the merchant marine, offering good versatility of skills (varied stowage, managing non-standardized cargoes), often a good entry point for young officers before specializing.",
      p8:"Before containers became widespread in the 1960s-70s, the general cargo ship was the most common merchant vessel worldwide. It remains essential today for goods too bulky, too heavy, or too atypical for a standard container.",
    },
    es:{
      title:"Carguero polivalente",
      p0:"El carguero polivalente transporta mercancías diversas no estandarizadas: sacos, cajas, maquinaria, productos a granel embalados de forma diferente según la carga. Es el antepasado directo del portacontenedores moderno, aún utilizado para tráficos específicos que no se prestan a la contenedorización.",
      p1:"Transportar mercancías variadas y heterogéneas, a menudo en pequeñas cantidades hacia puertos secundarios o menos equipados, con gran flexibilidad para adaptarse a cargas diferentes de un viaje a otro.",
      p2:"Longitud: de 80 m a unos 180 m según el modelo. Capacidad: de unos miles a unas 20.000 toneladas de peso muerto (DWT). A menudo equipado con sus propios aparejos de carga (grúas de a bordo), lo que le permite cargar/descargar sin depender de las infraestructuras portuarias.",
      p3:"Deck Department (navegación, estiba de cargas diversas y a menudo complejas), Engine Department (propulsión, sistemas auxiliares), con una competencia particular en el cálculo y verificación de la estiba adaptada a cada tipo de mercancía.",
      p4:"Master, Chief Officer (responsable del plan de carga multiproducto), Officer of the Watch, Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Carga/descarga a menudo manual o semiautomatizada mediante grúas de a bordo, estiba específica según la naturaleza de cada mercancía (sacos, cajas, bultos pesados), verificación de la distribución del peso para la estabilidad, escalas frecuentes en puertos variados.",
      p6:"Inestabilidad relacionada con una distribución desigual de cargas heterogéneas, riesgos de daños a la mercancía por manipulación inadecuada, mayor exposición a accidentes de manipulación (uso frecuente de grúas de a bordo), escalas en puertos a veces menos equipados en seguridad.",
      p7:"Sector histórico de la marina mercante, que ofrece buena versatilidad de competencias (estiba variada, gestión de cargas no estandarizadas), a menudo una buena puerta de entrada para los jóvenes oficiales antes de especializarse.",
      p8:"Antes de la generalización del contenedor en los años 1960-70, el carguero polivalente era el buque mercante más extendido del mundo. Hoy sigue siendo indispensable para mercancías demasiado voluminosas, pesadas o atípicas para un contenedor estándar.",
    },
    pt:{
      title:"Cargueiro polivalente",
      p0:"O cargueiro polivalente transporta mercadorias diversas não padronizadas: sacos, caixas, máquinas, produtos a granel embalados de forma diferente consoante a carga. É o antepassado direto do porta-contentores moderno, ainda utilizado para tráfegos específicos que não se prestam à contentorização.",
      p1:"Transportar mercadorias variadas e heterogéneas, frequentemente em pequenas quantidades para portos secundários ou menos equipados, com grande flexibilidade para se adaptar a cargas diferentes de uma viagem para outra.",
      p2:"Comprimento: de 80 m a cerca de 180 m consoante o modelo. Capacidade: de alguns milhares a cerca de 20.000 toneladas de porte bruto (DWT). Frequentemente equipado com os seus próprios aparelhos de carga (gruas de bordo), permitindo-lhe carregar/descarregar sem depender das infraestruturas portuárias.",
      p3:"Deck Department (navegação, estivagem de cargas diversas e frequentemente complexas), Engine Department (propulsão, sistemas auxiliares), com uma competência particular no cálculo e verificação da estivagem adaptada a cada tipo de mercadoria.",
      p4:"Master, Chief Officer (responsável pelo plano de carga multiproduto), Officer of the Watch, Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Carregamento/descarregamento frequentemente manual ou semiautomatizado através de gruas de bordo, estivagem específica consoante a natureza de cada mercadoria (sacos, caixas, volumes pesados), verificação da distribuição do peso para a estabilidade, escalas frequentes em portos variados.",
      p6:"Instabilidade relacionada com uma distribuição desigual de cargas heterogéneas, riscos de danos à mercadoria por manuseamento inadequado, maior exposição a acidentes de manuseamento (uso frequente de gruas de bordo), escalas em portos por vezes menos equipados em segurança.",
      p7:"Setor histórico da marinha mercante, oferecendo boa versatilidade de competências (estivagem variada, gestão de cargas não padronizadas), frequentemente uma boa porta de entrada para os jovens oficiais antes de se especializarem.",
      p8:"Antes da generalização do contentor nos anos 1960-70, o cargueiro polivalente era o navio mercante mais difundido do mundo. Continua hoje indispensável para mercadorias demasiado volumosas, pesadas ou atípicas para um contentor padrão.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function GeneralCargo({ lang="fr" }) {
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
