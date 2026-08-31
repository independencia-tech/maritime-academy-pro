// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "surfer"
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
      title:"Vedette de franchissement de barre (Surfer)",
      p0:"Le Surfer est une vedette rapide conçue pour transporter du personnel et du fret léger entre une base à terre et des installations offshore, en traversant délibérément la zone de déferlement (la « barre ») lorsqu'aucun accès portuaire en eau profonde n'existe. Très répandu en Afrique de l'Ouest (Nigeria, Angola, Congo, Côte d'Ivoire, Ghana), c'est le seul type de navire de ce registre dont la manœuvre signature consiste à traverser des vagues déferlantes plutôt qu'à les éviter.",
      p1:"Assurer la relève d'équipage et le transport de personnel entre une base logistique côtière et des navires ou plateformes ancrés au large, ainsi que l'acheminement de fret léger, courrier et pièces détachées urgentes, en franchissant la zone de surf à l'aller comme au retour.",
      p2:"Longueur : de 15 m à environ 25 m. Tirant d'eau réduit, coque robuste conçue pour encaisser l'impact des vagues déferlantes. Propulsion par deux ou trois moteurs hors-bord de forte puissance ou par hydrojets, privilégiant la manœuvrabilité et la capacité d'accélération plutôt que la vitesse de croisière pure.",
      p3:"Deck Department (pilotage en zone de surf, transfert de personnel, arrimage du fret léger), Engine Department (maintenance des moteurs hors-bord/hydrojets multiples, souvent redondants pour la sécurité), avec une expertise spécifique en lecture des séries de vagues et en timing de franchissement de la barre.",
      p4:"Master (souvent qualifié pilote de barre, responsable du choix du moment de franchissement), Chief Officer/Mate (assiste la manœuvre et coordonne le transfert de personnel), Able Seaman (amarrage, sécurité du transfert), Chief Engineer ou mécanicien (maintenance des groupes propulsifs multiples).",
      p5:"Franchissement de la barre à l'aller et au retour, transfert de personnel par échelle ou plateforme d'accostage en mer formée, transport de fret léger et de courrier, parfois service de veille/standby à proximité de la zone de surf.",
      p6:"Chavirement ou embardée (broaching) lors d'un franchissement mal timé, blessures lors du transfert de personnel au contact d'une installation en mouvement par mer formée, perte de gouverne en cas de panne moteur au milieu de la zone de déferlement, dégradation rapide et imprévisible de l'état de mer.",
      p7:"Secteur de niche très spécialisé, concentré en Afrique de l'Ouest ; les commandants expérimentés en franchissement de barre sont rares et particulièrement recherchés, une compétence reconnue comme l'une des plus exigeantes en petite navigation professionnelle.",
      p8:"Franchir une vague déferlante n'est pas un incident à éviter pour un Surfer : c'est la manœuvre de routine qui définit ce type de navire. Le commandant lit les séries de vagues et choisit délibérément le moment de traverser, une compétence transmise presque exclusivement par l'expérience locale plutôt que par une formation standardisée.",
    },
    en:{
      title:"Surf Boat (Surfer)",
      p0:"The Surf Boat is a fast craft designed to transport personnel and light cargo between a shore base and offshore installations, deliberately crossing the breaking wave zone (the \"surf line\") where no deep-water port access exists. Widespread in West Africa (Nigeria, Angola, Congo, Ivory Coast, Ghana), it is the only vessel type in this registry whose signature maneuver is crossing breaking waves rather than avoiding them.",
      p1:"Carry out crew changes and personnel transport between a coastal logistics base and vessels or platforms anchored offshore, along with light cargo, mail, and urgent spare parts, crossing the surf zone on both the outbound and return legs.",
      p2:"Length: from 15 m to about 25 m. Shallow draft, robust hull designed to absorb the impact of breaking waves. Propelled by two or three high-power outboard engines or waterjets, prioritizing maneuverability and acceleration over pure cruising speed.",
      p3:"Deck Department (surf-zone shiphandling, personnel transfer, light cargo securing), Engine Department (maintenance of the multiple, often redundant outboard/waterjet propulsion units), with specific expertise in reading wave sets and timing the surf-line crossing.",
      p4:"Master (often surf-line pilotage qualified, responsible for choosing the crossing moment), Chief Officer/Mate (assists the maneuver and coordinates personnel transfer), Able Seaman (mooring, transfer safety), Chief Engineer or mechanic (maintenance of the multiple propulsion units).",
      p5:"Crossing the surf line outbound and on return, personnel transfer via ladder or boat-landing in a moving sea, light cargo and mail runs, occasionally standby/watch duty near the surf zone.",
      p6:"Capsizing or broaching from a mistimed crossing, injuries during personnel transfer at a moving installation in a formed sea, loss of steerage from an engine failure mid-surf-zone, fast and unpredictable deterioration of sea state.",
      p7:"A highly specialized niche sector, concentrated in West Africa; experienced surf-line masters are scarce and particularly sought after, a skill recognized as one of the most demanding in small-craft professional seamanship.",
      p8:"Crossing a breaking wave is not an incident to be avoided for a Surf Boat — it is the routine maneuver that defines the vessel type. The master reads the wave sets and deliberately chooses the moment to cross, a skill passed on almost entirely through local experience rather than standardized training.",
    },
    es:{
      title:"Lancha de cruce de rompientes (Surfer)",
      p0:"El Surfer es una lancha rápida diseñada para transportar personal y carga ligera entre una base en tierra e instalaciones offshore, cruzando deliberadamente la zona de rompientes (la «barra») cuando no existe acceso portuario en aguas profundas. Muy extendido en África Occidental (Nigeria, Angola, Congo, Costa de Marfil, Ghana), es el único tipo de buque de este registro cuya maniobra característica consiste en cruzar olas rompientes en lugar de evitarlas.",
      p1:"Realizar el relevo de tripulación y el transporte de personal entre una base logística costera y buques o plataformas fondeados mar adentro, además de carga ligera, correo y repuestos urgentes, cruzando la zona de rompientes tanto a la ida como a la vuelta.",
      p2:"Eslora: de 15 m a unos 25 m. Calado reducido, casco robusto diseñado para absorber el impacto de las olas rompientes. Propulsión mediante dos o tres motores fueraborda de alta potencia o hidrojets, priorizando la maniobrabilidad y la aceleración sobre la velocidad de crucero pura.",
      p3:"Deck Department (pilotaje en zona de rompientes, transferencia de personal, estiba de carga ligera), Engine Department (mantenimiento de los múltiples motores fueraborda/hidrojets, a menudo redundantes por seguridad), con una experiencia específica en la lectura de series de olas y el momento de cruce de la barra.",
      p4:"Master (a menudo cualificado en pilotaje de barra, responsable de elegir el momento de cruce), Chief Officer/Mate (asiste la maniobra y coordina la transferencia de personal), Able Seaman (amarre, seguridad de la transferencia), Chief Engineer o mecánico (mantenimiento de los grupos propulsores múltiples).",
      p5:"Cruce de la barra a la ida y a la vuelta, transferencia de personal por escala o plataforma de atraque en mar formada, transporte de carga ligera y correo, ocasionalmente servicio de vigilancia/standby cerca de la zona de rompientes.",
      p6:"Vuelco o guiñada (broaching) por un cruce mal calculado, lesiones durante la transferencia de personal en contacto con una instalación en movimiento con mar formada, pérdida de gobierno por avería del motor en plena zona de rompientes, deterioro rápido e impredecible del estado del mar.",
      p7:"Sector de nicho muy especializado, concentrado en África Occidental; los patrones experimentados en cruce de barra son escasos y muy solicitados, una habilidad reconocida como una de las más exigentes en la náutica profesional de pequeña escala.",
      p8:"Cruzar una ola rompiente no es un incidente a evitar para un Surfer: es la maniobra rutinaria que define este tipo de buque. El patrón lee las series de olas y elige deliberadamente el momento de cruzar, una habilidad transmitida casi exclusivamente por la experiencia local más que por una formación estandarizada.",
    },
    pt:{
      title:"Lancha de transposição de arrebentação (Surfer)",
      p0:"O Surfer é uma lancha rápida concebida para transportar pessoal e carga ligeira entre uma base em terra e instalações offshore, atravessando deliberadamente a zona de rebentação (a «barra») quando não existe acesso portuário em águas profundas. Muito difundido na África Ocidental (Nigéria, Angola, Congo, Costa do Marfim, Gana), é o único tipo de navio deste registo cuja manobra característica consiste em atravessar ondas de rebentação em vez de as evitar.",
      p1:"Realizar a rendição de tripulação e o transporte de pessoal entre uma base logística costeira e navios ou plataformas fundeados ao largo, além de carga ligeira, correio e peças sobressalentes urgentes, atravessando a zona de rebentação tanto na ida como no regresso.",
      p2:"Comprimento: de 15 m a cerca de 25 m. Calado reduzido, casco robusto concebido para absorver o impacto das ondas de rebentação. Propulsão por dois ou três motores fora de borda de alta potência ou hidrojatos, privilegiando a manobrabilidade e a aceleração em detrimento da velocidade de cruzeiro pura.",
      p3:"Deck Department (pilotagem em zona de rebentação, transferência de pessoal, estiva de carga ligeira), Engine Department (manutenção dos múltiplos motores fora de borda/hidrojatos, frequentemente redundantes por segurança), com uma experiência específica na leitura de séries de ondas e no momento de transposição da barra.",
      p4:"Master (frequentemente qualificado em pilotagem de barra, responsável por escolher o momento da travessia), Chief Officer/Mate (assiste a manobra e coordena a transferência de pessoal), Able Seaman (amarração, segurança da transferência), Chief Engineer ou mecânico (manutenção dos múltiplos grupos propulsores).",
      p5:"Transposição da barra na ida e no regresso, transferência de pessoal por escada ou plataforma de atracação em mar formado, transporte de carga ligeira e correio, ocasionalmente serviço de vigia/standby perto da zona de rebentação.",
      p6:"Capotamento ou guinada (broaching) por uma travessia mal calculada, lesões durante a transferência de pessoal em contacto com uma instalação em movimento em mar formado, perda de governo por avaria do motor no meio da zona de rebentação, deterioração rápida e imprevisível do estado do mar.",
      p7:"Setor de nicho muito especializado, concentrado na África Ocidental; comandantes experientes em transposição de barra são escassos e particularmente procurados, uma competência reconhecida como uma das mais exigentes na náutica profissional de pequena escala.",
      p8:"Atravessar uma onda de rebentação não é um incidente a evitar para um Surfer: é a manobra de rotina que define este tipo de navio. O comandante lê as séries de ondas e escolhe deliberadamente o momento de atravessar, uma competência transmitida quase exclusivamente pela experiência local em vez de uma formação padronizada.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function Surfer({ lang="fr" }) {
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
