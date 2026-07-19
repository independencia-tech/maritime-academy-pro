// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "container_ship"
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
      title:"Porte-conteneurs",
      p0:"Le porte-conteneurs est le symbole du commerce maritime mondial : il transporte l'écrasante majorité des biens manufacturés échangés entre les continents, empilés dans des conteneurs standardisés.",
      p1:"Transporter des marchandises diverses conditionnées en conteneurs standardisés (20 ou 40 pieds), sur des lignes régulières entre grands ports mondiaux, à haute fréquence et selon des horaires stricts.",
      p2:"Longueur : de 200 m (feeder) à plus de 400 m (ULCS - Ultra Large Container Ship). Capacité : de quelques centaines à plus de 24 000 EVP. Vitesse de croisière : 18 à 24 nœuds. Absence de mâts de charge : le chargement/déchargement se fait exclusivement par portiques à quai.",
      p3:"Deck Department (navigation, arrimage de la cargaison, sécurité), Engine Department (propulsion, systèmes auxiliaires), et selon la taille du navire, un département dédié à la gestion de la stabilité et du plan de chargement.",
      p4:"Master, Chief Officer (responsable du plan de chargement et de la stabilité), Officer of the Watch, Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Chargement/déchargement rapide à quai via portiques, vérification du plan d'arrimage (stowage plan), surveillance de la stabilité pendant les opérations, respect strict des horaires de rotation entre ports.",
      p6:"Perte de conteneurs en mer par gros temps, incendie de cargaison (notamment marchandises dangereuses mal déclarées), erreurs de plan de chargement affectant la stabilité, risques liés à la hauteur des piles de conteneurs sur le pont.",
      p7:"Large besoin en officiers Deck et Engine dans ce secteur, particulièrement recherché pour son volume mondial. Spécialisation possible en gestion de la cargaison et planification du chargement (stowage planning).",
      p8:"Les plus grands porte-conteneurs actuels peuvent transporter l'équivalent de plusieurs dizaines de milliers de voitures en volume de fret. Le terme EVP (Équivalent Vingt Pieds) sert d'unité universelle pour mesurer la capacité de ces navires.",
    },
    en:{
      title:"Container Ship",
      p0:"The container ship is the symbol of global maritime trade: it carries the vast majority of manufactured goods exchanged between continents, stacked in standardized containers.",
      p1:"Carry diverse goods packed in standardized containers (20 or 40 feet), on regular routes between major world ports, at high frequency and strict schedules.",
      p2:"Length: from 200 m (feeder) to over 400 m (ULCS - Ultra Large Container Ship). Capacity: from a few hundred to over 24,000 TEU. Cruising speed: 18 to 24 knots. No cargo gear: loading/unloading is done exclusively by shore cranes.",
      p3:"Deck Department (navigation, cargo securing, safety), Engine Department (propulsion, auxiliary systems), and depending on ship size, a department dedicated to stability and loading plan management.",
      p4:"Master, Chief Officer (responsible for the loading plan and stability), Officer of the Watch, Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Fast loading/unloading at quay via shore cranes, checking the stowage plan, monitoring stability during operations, strict adherence to port rotation schedules.",
      p6:"Loss of containers overboard in heavy weather, cargo fire (notably undeclared dangerous goods), stowage plan errors affecting stability, risks related to container stack height on deck.",
      p7:"High demand for Deck and Engine officers in this sector, particularly sought after given its global volume. Possible specialization in cargo management and stowage planning.",
      p8:"The largest container ships today can carry cargo volume equivalent to tens of thousands of cars. The term TEU (Twenty-foot Equivalent Unit) serves as the universal unit to measure these ships' capacity.",
    },
    es:{
      title:"Portacontenedores",
      p0:"El portacontenedores es el símbolo del comercio marítimo mundial: transporta la gran mayoría de los bienes manufacturados intercambiados entre continentes, apilados en contenedores estandarizados.",
      p1:"Transportar mercancías diversas embaladas en contenedores estandarizados (20 o 40 pies), en rutas regulares entre grandes puertos mundiales, con alta frecuencia y horarios estrictos.",
      p2:"Longitud: de 200 m (feeder) a más de 400 m (ULCS - Ultra Large Container Ship). Capacidad: de unos cientos a más de 24.000 TEU. Velocidad de crucero: 18 a 24 nudos. Sin aparejos de carga propios: la carga/descarga se realiza exclusivamente mediante grúas de muelle.",
      p3:"Deck Department (navegación, estiba de la carga, seguridad), Engine Department (propulsión, sistemas auxiliares), y según el tamaño del buque, un departamento dedicado a la gestión de la estabilidad y el plan de carga.",
      p4:"Master, Chief Officer (responsable del plan de carga y la estabilidad), Officer of the Watch, Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Carga/descarga rápida en muelle mediante grúas, verificación del plan de estiba, vigilancia de la estabilidad durante las operaciones, cumplimiento estricto de los horarios de rotación entre puertos.",
      p6:"Pérdida de contenedores al mar con mal tiempo, incendio de carga (especialmente mercancías peligrosas mal declaradas), errores en el plan de carga que afectan la estabilidad, riesgos relacionados con la altura de las pilas de contenedores en cubierta.",
      p7:"Gran demanda de oficiales Deck y Engine en este sector, particularmente buscados dado su volumen mundial. Posible especialización en gestión de carga y planificación de estiba.",
      p8:"Los mayores portacontenedores actuales pueden transportar un volumen de carga equivalente a decenas de miles de coches. El término TEU (Unidad Equivalente a Veinte Pies) sirve como unidad universal para medir la capacidad de estos buques.",
    },
    pt:{
      title:"Porta-contentores",
      p0:"O porta-contentores é o símbolo do comércio marítimo mundial: transporta a grande maioria dos bens manufaturados trocados entre continentes, empilhados em contentores padronizados.",
      p1:"Transportar mercadorias diversas embaladas em contentores padronizados (20 ou 40 pés), em rotas regulares entre grandes portos mundiais, com alta frequência e horários rigorosos.",
      p2:"Comprimento: de 200 m (feeder) a mais de 400 m (ULCS - Ultra Large Container Ship). Capacidade: de algumas centenas a mais de 24.000 TEU. Velocidade de cruzeiro: 18 a 24 nós. Sem aparelhos de carga próprios: o carregamento/descarregamento é feito exclusivamente por gruas de cais.",
      p3:"Deck Department (navegação, estivagem da carga, segurança), Engine Department (propulsão, sistemas auxiliares), e consoante o porte do navio, um departamento dedicado à gestão da estabilidade e do plano de carga.",
      p4:"Master, Chief Officer (responsável pelo plano de carga e estabilidade), Officer of the Watch, Bosun, Able Seaman, Chief Engineer, 2nd/3rd Engineer.",
      p5:"Carregamento/descarregamento rápido no cais através de gruas, verificação do plano de estivagem, vigilância da estabilidade durante as operações, cumprimento rigoroso dos horários de rotação entre portos.",
      p6:"Perda de contentores ao mar em mau tempo, incêndio de carga (nomeadamente mercadorias perigosas mal declaradas), erros no plano de carga afetando a estabilidade, riscos relacionados com a altura das pilhas de contentores no convés.",
      p7:"Grande procura de oficiais Deck e Engine neste setor, particularmente procurados dado o seu volume mundial. Possível especialização em gestão de carga e planeamento de estivagem.",
      p8:"Os maiores porta-contentores atuais podem transportar um volume de carga equivalente a dezenas de milhares de carros. O termo TEU (Unidade Equivalente a Vinte Pés) serve como unidade universal para medir a capacidade destes navios.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function ContainerShip({ lang="fr" }) {
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
