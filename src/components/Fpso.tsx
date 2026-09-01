// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "fpso"
// Standalone documentary component: no Dashboard/progression/billing dependency.
import { C, Card, SL, GLine } from "./LessonShared";
import { FpsoSVG } from "./ShipIllustrations";

const SECTION_LABELS = {
  fr: { profile:"Fiche navire", mission:"Mission", characteristics:"Caractéristiques générales", departments:"Départements à bord", positions:"Postes typiques", operations:"Opérations typiques", risks:"Risques principaux", careers:"Débouchés professionnels", facts:"Anecdotes" },
  en: { profile:"Ship Profile", mission:"Mission", characteristics:"General Characteristics", departments:"Onboard Departments", positions:"Typical Positions", operations:"Typical Operations", risks:"Main Risks", careers:"Career Opportunities", facts:"Interesting Facts" },
  es: { profile:"Ficha del buque", mission:"Misión", characteristics:"Características generales", departments:"Departamentos a bordo", positions:"Puestos típicos", operations:"Operaciones típicas", risks:"Riesgos principales", careers:"Oportunidades profesionales", facts:"Datos curiosos" },
  pt: { profile:"Ficha do navio", mission:"Missão", characteristics:"Características gerais", departments:"Departamentos a bordo", positions:"Cargos típicos", operations:"Operações típicas", risks:"Riscos principais", careers:"Oportunidades profissionais", facts:"Curiosidades" },
};

const getContent = lang => {
  const d = {
    fr:{
      title:"Unité flottante de production, stockage et déchargement (FPSO)",
      p0:"Le FPSO est une unité flottante conçue pour recevoir, traiter, stocker et exporter le pétrole ou le gaz extrait d'un champ offshore. Contrairement au FSO, il intègre des installations de production et de traitement primaire des hydrocarbures (séparation huile/gaz/eau) directement sur son pont, ce qui en fait à la fois une usine de production et un navire de stockage. Souvent issu de la conversion d'un ancien pétrolier, il peut aussi être construit neuf, notamment pour les champs les plus exigeants.",
      p1:"Recevoir les effluents bruts extraits par les puits sous-marins ou une plateforme voisine via risers, séparer le pétrole, le gaz et l'eau, stocker le pétrole traité dans ses cuves, puis le transférer périodiquement vers des tankers navette pour l'export. Le gaz associé peut être réinjecté dans le réservoir, exporté par pipeline, utilisé comme combustible pour les installations du FPSO ou, lorsque nécessaire, brûlé à la torchère conformément aux procédures d'exploitation et à la réglementation locale. Le FPSO agit comme une véritable usine de production flottante, souvent indépendante de toute infrastructure côtière.",
      p2:"Coque de forme classique de navire ou de type barge selon les conceptions, maintenue en position par un système d'amarrage tourelle (turret mooring) permettant au navire de s'orienter selon le vent et les courants, ou par ancrage multipoint fixe selon l'environnement. La plupart des FPSO ne disposent pas de propulsion opérationnelle une fois installés sur le champ. Pont supérieur entièrement occupé par les installations de traitement (topsides) : séparateurs, compresseurs, systèmes de traitement de l'eau, torchère, groupes électrogènes dédiés au process, ainsi que les systèmes de contrôle, d'automatisation et de sécurité nécessaires au fonctionnement continu de l'installation.",
      p3:"Process/Production (exploitation et surveillance des installations de traitement), Marine Department (amarrage, ballast, opérations de transfert), Maintenance / Engine (maintenance des groupes électrogènes, systèmes hydrauliques et mécaniques), Safety/HSE dédié en raison du risque hydrocarbures et process constant.",
      p4:"OIM (Offshore Installation Manager), Production Supervisor, Control Room Operator (CRO), Process Operator, Chief Engineer, Mooring Master / Loading Master pour les opérations de transfert navette, techniciens instrumentation et process, personnel HSE.",
      p5:"Réception continue des effluents depuis les puits, séparation et traitement du pétrole, du gaz et de l'eau, surveillance et optimisation des paramètres de production via les systèmes de contrôle, gestion des niveaux de cuves, opérations de transfert ship-to-ship avec les tankers navette, gestion de la torchère et du gaz associé, traitement et rejet contrôlé de l'eau produite, inspection et maintenance des installations topsides et du système d'amarrage.",
      p6:"Risque d'incendie et d'explosion lié aux installations de traitement sous pression, libération accidentelle de gaz toxiques ou inflammables, défaillance du système d'amarrage en conditions météo dégradées, risques liés aux opérations de transfert ship-to-ship (collision, rupture de flexible), pollution marine en cas de fuite d'hydrocarbures ou de rejet d'eau produite non conforme, exposition prolongée en mer sans possibilité d'évacuation rapide.",
      p7:"Poste très recherché en offshore oil & gas, souvent en rotation longue (4-6 semaines), forte prime liée à la technicité et à l'environnement offshore, forte demande de personnel Process/Production certifié, passerelle naturelle vers les FSO, plateformes fixes ou postes de supervision Process en compagnie pétrolière.",
      p8:"Certains FPSO peuvent traiter plus de 200 000 barils de pétrole par jour, un volume comparable à celui d'une raffinerie de taille moyenne. Le développement des champs en eaux ultra-profondes a fait du FPSO l'une des principales solutions de développement des champs offshore en eaux profondes et ultra-profondes.",
    },
    en:{
      title:"Floating Production, Storage and Offloading Unit (FPSO)",
      p0:"The FPSO is a floating unit designed to receive, process, store and export oil or gas extracted from an offshore field. Unlike the FSO, it incorporates production and primary hydrocarbon processing facilities (oil/gas/water separation) directly on its deck, making it both a production plant and a storage vessel. Often converted from an older tanker, it can also be purpose-built, particularly for the most demanding fields.",
      p1:"Receive raw effluents extracted by subsea wells or a nearby platform via risers, separate oil, gas and water, store the treated oil in its tanks, then periodically transfer it to shuttle tankers for export. Associated gas may be reinjected into the reservoir, exported by pipeline, used as fuel for the FPSO's facilities, or, when necessary, flared in accordance with operating procedures and local regulations. The FPSO acts as a genuine floating production plant, often independent of any onshore infrastructure.",
      p2:"Hull of classic ship shape or barge type depending on design, held in position by a turret mooring system allowing the vessel to weathervane with wind and currents, or by fixed multipoint anchoring depending on the environment. Most FPSOs have no operational propulsion once installed on the field. Upper deck entirely occupied by processing facilities (topsides): separators, compressors, water treatment systems, flare, generators dedicated to the process, as well as the control, automation and safety systems necessary for continuous operation of the facility.",
      p3:"Process/Production (operation and monitoring of processing facilities), Marine Department (mooring, ballast, transfer operations), Maintenance / Engine (maintenance of generators, hydraulic and mechanical systems), dedicated Safety/HSE due to constant hydrocarbon and process risk.",
      p4:"OIM (Offshore Installation Manager), Production Supervisor, Control Room Operator (CRO), Process Operator, Chief Engineer, Mooring Master / Loading Master for shuttle transfer operations, instrumentation and process technicians, HSE personnel.",
      p5:"Continuous reception of effluents from the wells, separation and treatment of oil, gas and water, monitoring and optimization of production parameters via control systems, tank level management, ship-to-ship transfer operations with shuttle tankers, flare and associated gas management, treatment and controlled discharge of produced water, inspection and maintenance of topside facilities and the mooring system.",
      p6:"Fire and explosion risk linked to pressurized processing facilities, accidental release of toxic or flammable gas, mooring system failure in degraded weather conditions, risks linked to ship-to-ship transfer operations (collision, hose rupture), marine pollution in case of hydrocarbon leak or non-compliant produced water discharge, prolonged exposure at sea without possibility of rapid evacuation.",
      p7:"Highly sought-after position in offshore oil & gas, often long rotations (4-6 weeks), strong bonuses linked to technical specialization and the offshore environment, strong demand for certified Process/Production personnel, natural pathway to FSOs, fixed platforms or Process supervisory roles within oil companies.",
      p8:"Some FPSOs can process more than 200,000 barrels of oil per day, a volume comparable to that of a mid-sized refinery. The development of ultra-deepwater fields has made the FPSO one of the leading solutions for developing offshore fields in deep and ultra-deep waters.",
    },
    es:{
      title:"Unidad flotante de producción, almacenamiento y descarga (FPSO)",
      p0:"El FPSO es una unidad flotante diseñada para recibir, tratar, almacenar y exportar el petróleo o el gas extraído de un campo offshore. A diferencia del FSO, integra instalaciones de producción y tratamiento primario de los hidrocarburos (separación petróleo/gas/agua) directamente en su cubierta, lo que lo convierte a la vez en una planta de producción y en un buque de almacenamiento. A menudo procede de la conversión de un antiguo petrolero, aunque también puede construirse nuevo, especialmente para los campos más exigentes.",
      p1:"Recibir los efluentes brutos extraídos por los pozos submarinos o por una plataforma cercana mediante risers, separar el petróleo, el gas y el agua, almacenar el petróleo tratado en sus tanques, y transferirlo periódicamente a buques lanzadera para su exportación. El gas asociado puede ser reinyectado en el yacimiento, exportado por gasoducto, utilizado como combustible para las instalaciones del FPSO o, cuando sea necesario, quemado en la antorcha conforme a los procedimientos operativos y a la normativa local. El FPSO actúa como una auténtica planta de producción flotante, a menudo independiente de cualquier infraestructura en tierra.",
      p2:"Casco de forma clásica de buque o de tipo barcaza según el diseño, mantenido en posición por un sistema de amarre de torreta (turret mooring) que permite al buque orientarse según el viento y las corrientes, o mediante anclaje fijo multipunto según el entorno. La mayoría de los FPSO no cuentan con propulsión operativa una vez instalados en el campo. Cubierta superior ocupada íntegramente por las instalaciones de tratamiento (topsides): separadores, compresores, sistemas de tratamiento de agua, antorcha, generadores dedicados al proceso, así como los sistemas de control, automatización y seguridad necesarios para el funcionamiento continuo de la instalación.",
      p3:"Process/Production (operación y supervisión de las instalaciones de tratamiento), Marine Department (amarre, lastre, operaciones de transferencia), Maintenance / Engine (mantenimiento de generadores, sistemas hidráulicos y mecánicos), Safety/HSE dedicado debido al riesgo constante de hidrocarburos y de proceso.",
      p4:"OIM (Offshore Installation Manager), Production Supervisor, Control Room Operator (CRO), Process Operator, Chief Engineer, Mooring Master / Loading Master para las operaciones de transferencia lanzadera, técnicos de instrumentación y proceso, personal de HSE.",
      p5:"Recepción continua de los efluentes desde los pozos, separación y tratamiento del petróleo, el gas y el agua, supervisión y optimización de los parámetros de producción mediante los sistemas de control, gestión de los niveles de los tanques, operaciones de transferencia ship-to-ship con buques lanzadera, gestión de la antorcha y del gas asociado, tratamiento y vertido controlado del agua producida, inspección y mantenimiento de las instalaciones topside y del sistema de amarre.",
      p6:"Riesgo de incendio y explosión asociado a las instalaciones de tratamiento presurizadas, liberación accidental de gases tóxicos o inflamables, fallo del sistema de amarre en condiciones meteorológicas adversas, riesgos relacionados con las operaciones de transferencia ship-to-ship (colisión, rotura de manguera), contaminación marina en caso de fuga de hidrocarburos o de vertido no conforme de agua producida, exposición prolongada en el mar sin posibilidad de evacuación rápida.",
      p7:"Puesto muy solicitado en el sector offshore de oil & gas, a menudo con rotaciones largas (4-6 semanas), fuerte prima ligada a la especialización técnica y al entorno offshore, fuerte demanda de personal certificado en Process/Production, vía de acceso natural hacia los FSO, plataformas fijas o puestos de supervisión Process en compañías petroleras.",
      p8:"Algunos FPSO pueden procesar más de 200.000 barriles de petróleo al día, un volumen comparable al de una refinería de tamaño medio. El desarrollo de los campos en aguas ultra profundas ha convertido al FPSO en una de las principales soluciones para el desarrollo de campos offshore en aguas profundas y ultra profundas.",
    },
    pt:{
      title:"Unidade flutuante de produção, armazenamento e descarga (FPSO)",
      p0:"O FPSO é uma unidade flutuante concebida para receber, tratar, armazenar e exportar o petróleo ou o gás extraído de um campo offshore. Ao contrário do FSO, integra instalações de produção e de tratamento primário dos hidrocarbonetos (separação petróleo/gás/água) diretamente no seu convés, o que faz dele simultaneamente uma unidade de produção e um navio de armazenamento. Frequentemente resulta da conversão de um antigo petroleiro, podendo também ser construído de raiz, sobretudo para os campos mais exigentes.",
      p1:"Receber os efluentes brutos extraídos pelos poços submarinos ou por uma plataforma próxima através de risers, separar o petróleo, o gás e a água, armazenar o petróleo tratado nos seus tanques, e transferi-lo periodicamente para navios lançadeira para exportação. O gás associado pode ser reinjetado no reservatório, exportado por gasoduto, utilizado como combustível para as instalações do FPSO ou, quando necessário, queimado na tocha (flare) de acordo com os procedimentos operacionais e a regulamentação local. O FPSO funciona como uma verdadeira unidade de produção flutuante, frequentemente independente de qualquer infraestrutura em terra.",
      p2:"Casco de forma clássica de navio ou de tipo barcaça consoante o design, mantido em posição por um sistema de amarração de torre (turret mooring) que permite ao navio orientar-se de acordo com o vento e as correntes, ou por ancoragem fixa multiponto consoante o ambiente. A maioria dos FPSO não dispõe de propulsão operacional depois de instalada no campo. Convés superior totalmente ocupado pelas instalações de tratamento (topsides): separadores, compressores, sistemas de tratamento de água, tocha (flare), geradores dedicados ao processo, bem como os sistemas de controlo, automação e segurança necessários ao funcionamento contínuo da instalação.",
      p3:"Process/Production (operação e supervisão das instalações de tratamento), Marine Department (amarração, lastro, operações de transferência), Maintenance / Engine (manutenção de geradores, sistemas hidráulicos e mecânicos), Safety/HSE dedicado devido ao risco constante de hidrocarbonetos e de processo.",
      p4:"OIM (Offshore Installation Manager), Production Supervisor, Control Room Operator (CRO), Process Operator, Chief Engineer, Mooring Master / Loading Master para as operações de transferência lançadeira, técnicos de instrumentação e processo, pessoal de HSE.",
      p5:"Receção contínua dos efluentes provenientes dos poços, separação e tratamento do petróleo, do gás e da água, monitorização e otimização dos parâmetros de produção através dos sistemas de controlo, gestão dos níveis dos tanques, operações de transferência ship-to-ship com navios lançadeira, gestão da tocha e do gás associado, tratamento e descarga controlada da água produzida, inspeção e manutenção das instalações topside e do sistema de amarração.",
      p6:"Risco de incêndio e explosão associado às instalações de tratamento sob pressão, libertação acidental de gases tóxicos ou inflamáveis, falha do sistema de amarração em condições meteorológicas adversas, riscos associados às operações de transferência ship-to-ship (colisão, rutura de mangueira), poluição marinha em caso de fuga de hidrocarbonetos ou de descarga não conforme de água produzida, exposição prolongada no mar sem possibilidade de evacuação rápida.",
      p7:"Posição muito procurada no setor offshore de oil & gas, frequentemente com rotações longas (4-6 semanas), forte prémio ligado à especialização técnica e ao ambiente offshore, forte procura de pessoal certificado em Process/Production, via de acesso natural para os FSO, plataformas fixas ou cargos de supervisão Process em companhias petrolíferas.",
      p8:"Alguns FPSO conseguem processar mais de 200.000 barris de petróleo por dia, um volume comparável ao de uma refinaria de média dimensão. O desenvolvimento dos campos em águas ultra profundas tornou o FPSO numa das principais soluções de desenvolvimento de campos offshore em águas profundas e ultra profundas.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function Fpso({ lang="fr" }) {
  const lc = getContent(lang);
  const L = SECTION_LABELS[lang]||SECTION_LABELS.fr;

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",position:"relative"}}>
      <div style={{padding:"28px 16px 40px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(26,111,212,0.15)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.blue2,fontWeight:700}}>🚢 Ships Library</div>
          <div style={{marginBottom:14,borderRadius:16,overflow:"hidden",border:`1px solid ${C.border}`}}><FpsoSVG/></div>
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
