// @ts-nocheck
// Ships Library — static vessel info card. vesselTypeId: "yacht"
// Standalone documentary component: no Dashboard/progression/billing dependency.
import { C, Card, SL, GLine } from "./LessonShared";
import { YachtSVG } from "./ShipIllustrations";

const SECTION_LABELS = {
  fr: { profile:"Fiche navire", mission:"Mission", characteristics:"Caractéristiques générales", departments:"Départements à bord", positions:"Postes typiques", operations:"Opérations typiques", risks:"Risques principaux", careers:"Débouchés professionnels", facts:"Anecdotes" },
  en: { profile:"Ship Profile", mission:"Mission", characteristics:"General Characteristics", departments:"Onboard Departments", positions:"Typical Positions", operations:"Typical Operations", risks:"Main Risks", careers:"Career Opportunities", facts:"Interesting Facts" },
  es: { profile:"Ficha del buque", mission:"Misión", characteristics:"Características generales", departments:"Departamentos a bordo", positions:"Puestos típicos", operations:"Operaciones típicas", risks:"Riesgos principales", careers:"Oportunidades profesionales", facts:"Datos curiosos" },
  pt: { profile:"Ficha do navio", mission:"Missão", characteristics:"Características gerais", departments:"Departamentos a bordo", positions:"Cargos típicos", operations:"Operações típicas", risks:"Riscos principais", careers:"Oportunidades profissionais", facts:"Curiosidades" },
};

const getContent = lang => {
  const d = {
    fr:{
      title:"Yacht / Voilier",
      p0:"Le yacht (à moteur ou à voile) est un navire de plaisance privé ou commercial, allant du voilier familial au superyacht professionnel employant un équipage complet. C'est un secteur maritime distinct, régi par ses propres conventions et cultures d'exploitation.",
      p1:"Offrir à son propriétaire ou à ses passagers une expérience de navigation de loisir, dans un cadre privé (yacht personnel) ou commercial (charter, location avec équipage), selon des standards de confort et de service élevés pour les plus grandes unités.",
      p2:"Longueur : de quelques mètres pour un voilier familial à plus de 100 m pour un superyacht. Les plus grandes unités disposent d'équipements comparables à un petit navire de croisière (piscine, hélicoptère, tender). Réglementation spécifique selon la taille (Code MYBA, Large Yacht Code).",
      p3:"Sur les plus petites unités, un seul marin peut cumuler toutes les fonctions. Sur les superyachts, Deck Department (navigation, entretien extérieur), Engine Department (propulsion, systèmes techniques), et Interior/Service Department (hébergement, restauration, service aux invités) coexistent comme sur un navire de croisière miniature.",
      p4:"Captain, Chief Officer, Deckhand, Chief Engineer, Bosun sur les plus grandes unités ; sur les superyachts s'ajoutent Chief Stewardess, Chef, et personnel de service dédié aux invités.",
      p5:"Navigation souvent côtière ou en mer semi-fermée, entretien méticuleux de la coque et des équipements (standard visuel très élevé attendu), gestion de l'accueil et du confort des invités sur les unités avec équipage, opérations de mouillage fréquentes.",
      p6:"Standards d'exigence esthétique et de service très élevés pouvant générer une pression particulière sur l'équipage, gestion de personnalités exigeantes (propriétaires, invités VIP), risques classiques de navigation de plaisance (mouillage, météo imprévue), turnover élevé du personnel dans ce secteur.",
      p7:"Secteur offrant des rémunérations souvent attractives et une exposition à un mode de vie international, particulièrement pour le personnel de service sur superyachts. Bonne opportunité de développer rapidement de l'expérience de commandement sur des unités plus petites.",
      p8:"Le secteur des superyachts emploie aujourd'hui des dizaines de milliers de marins professionnels dans le monde, avec ses propres écoles de formation spécialisées (comme les certifications STCW adaptées au yachting). Certains superyachts modernes rivalisent en taille et en technologie avec de petits navires de croisière.",
    },
    en:{
      title:"Yacht / Sailboat",
      p0:"The yacht (motor or sail) is a private or commercial pleasure vessel, ranging from a family sailboat to a professional superyacht employing a full crew. It is a distinct maritime sector, governed by its own conventions and operating culture.",
      p1:"Provide its owner or passengers with a leisure sailing experience, in a private (personal yacht) or commercial (charter, crewed rental) setting, according to high standards of comfort and service for the largest units.",
      p2:"Length: from a few meters for a family sailboat to over 100 m for a superyacht. The largest units have facilities comparable to a small cruise ship (pool, helicopter, tender). Specific regulations depending on size (MYBA Code, Large Yacht Code).",
      p3:"On the smallest units, a single sailor may combine all functions. On superyachts, Deck Department (navigation, exterior maintenance), Engine Department (propulsion, technical systems), and Interior/Service Department (accommodation, catering, guest service) coexist like on a miniature cruise ship.",
      p4:"Captain, Chief Officer, Deckhand, Chief Engineer, Bosun on larger units; superyachts add Chief Stewardess, Chef, and dedicated guest service staff.",
      p5:"Often coastal or semi-enclosed sea navigation, meticulous maintenance of hull and equipment (very high visual standard expected), managing guest reception and comfort on crewed units, frequent anchoring operations.",
      p6:"Very high aesthetic and service standards that can create particular pressure on the crew, managing demanding personalities (owners, VIP guests), classic pleasure navigation risks (anchoring, unforeseen weather), high staff turnover in this sector.",
      p7:"Sector offering often attractive pay and exposure to an international lifestyle, particularly for service staff on superyachts. Good opportunity to quickly develop command experience on smaller units.",
      p8:"The superyacht sector today employs tens of thousands of professional sailors worldwide, with its own specialized training schools (such as STCW certifications adapted to yachting). Some modern superyachts rival small cruise ships in size and technology.",
    },
    es:{
      title:"Yate / Velero",
      p0:"El yate (a motor o a vela) es un buque de recreo privado o comercial, que va desde un velero familiar hasta un superyate profesional que emplea una tripulación completa. Es un sector marítimo distinto, regido por sus propias convenciones y cultura de explotación.",
      p1:"Ofrecer a su propietario o a sus pasajeros una experiencia de navegación de ocio, en un marco privado (yate personal) o comercial (charter, alquiler con tripulación), según estándares de confort y servicio elevados para las unidades más grandes.",
      p2:"Longitud: desde unos metros para un velero familiar hasta más de 100 m para un superyate. Las unidades más grandes disponen de equipamientos comparables a un pequeño buque de crucero (piscina, helicóptero, tender). Reglamentación específica según el tamaño (Código MYBA, Large Yacht Code).",
      p3:"En las unidades más pequeñas, un solo marinero puede cumular todas las funciones. En los superyates, Deck Department (navegación, mantenimiento exterior), Engine Department (propulsión, sistemas técnicos), e Interior/Service Department (alojamiento, restauración, servicio a los invitados) coexisten como en un buque de crucero en miniatura.",
      p4:"Captain, Chief Officer, Deckhand, Chief Engineer, Bosun en las unidades más grandes; en los superyates se añaden Chief Stewardess, Chef, y personal de servicio dedicado a los invitados.",
      p5:"Navegación a menudo costera o en mar semicerrado, mantenimiento meticuloso del casco y los equipos (estándar visual muy elevado esperado), gestión de la acogida y el confort de los invitados en las unidades con tripulación, operaciones de fondeo frecuentes.",
      p6:"Estándares de exigencia estética y de servicio muy elevados que pueden generar una presión particular sobre la tripulación, gestión de personalidades exigentes (propietarios, invitados VIP), riesgos clásicos de navegación de recreo (fondeo, meteorología imprevista), alta rotación de personal en este sector.",
      p7:"Sector que ofrece remuneraciones a menudo atractivas y una exposición a un estilo de vida internacional, particularmente para el personal de servicio en superyates. Buena oportunidad para desarrollar rápidamente experiencia de mando en unidades más pequeñas.",
      p8:"El sector de los superyates emplea hoy a decenas de miles de marineros profesionales en todo el mundo, con sus propias escuelas de formación especializadas (como las certificaciones STCW adaptadas al yachting). Algunos superyates modernos rivalizan en tamaño y tecnología con pequeños buques de crucero.",
    },
    pt:{
      title:"Iate / Veleiro",
      p0:"O iate (a motor ou à vela) é um navio de recreio privado ou comercial, que vai desde um veleiro familiar até um superiate profissional que emprega uma tripulação completa. É um setor marítimo distinto, regido pelas suas próprias convenções e cultura de exploração.",
      p1:"Oferecer ao seu proprietário ou aos seus passageiros uma experiência de navegação de lazer, num quadro privado (iate pessoal) ou comercial (charter, aluguer com tripulação), segundo padrões de conforto e serviço elevados para as unidades maiores.",
      p2:"Comprimento: de alguns metros para um veleiro familiar a mais de 100 m para um superiate. As unidades maiores dispõem de equipamentos comparáveis a um pequeno navio de cruzeiro (piscina, helicóptero, tender). Regulamentação específica consoante o tamanho (Código MYBA, Large Yacht Code).",
      p3:"Nas unidades mais pequenas, um único marinheiro pode acumular todas as funções. Nos superiates, Deck Department (navegação, manutenção exterior), Engine Department (propulsão, sistemas técnicos), e Interior/Service Department (alojamento, restauração, serviço aos convidados) coexistem como num navio de cruzeiro em miniatura.",
      p4:"Captain, Chief Officer, Deckhand, Chief Engineer, Bosun nas unidades maiores; nos superiates juntam-se Chief Stewardess, Chef, e pessoal de serviço dedicado aos convidados.",
      p5:"Navegação frequentemente costeira ou em mar semifechado, manutenção meticulosa do casco e dos equipamentos (padrão visual muito elevado esperado), gestão da receção e do conforto dos convidados nas unidades com tripulação, operações de fundeio frequentes.",
      p6:"Padrões de exigência estética e de serviço muito elevados que podem gerar uma pressão particular sobre a tripulação, gestão de personalidades exigentes (proprietários, convidados VIP), riscos clássicos de navegação de recreio (fundeio, meteorologia imprevista), elevada rotatividade de pessoal neste setor.",
      p7:"Setor que oferece remunerações frequentemente atrativas e uma exposição a um estilo de vida internacional, particularmente para o pessoal de serviço em superiates. Boa oportunidade para desenvolver rapidamente experiência de comando em unidades mais pequenas.",
      p8:"O setor dos superiates emprega hoje dezenas de milhares de marinheiros profissionais em todo o mundo, com as suas próprias escolas de formação especializadas (como as certificações STCW adaptadas ao yachting). Alguns superiates modernos rivalizam em tamanho e tecnologia com pequenos navios de cruzeiro.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN — static documentary card, no lesson mechanics (no quiz/XP/progress/phase state)
export default function Yacht({ lang="fr" }) {
  const lc = getContent(lang);
  const L = SECTION_LABELS[lang]||SECTION_LABELS.fr;

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",position:"relative"}}>
      <div style={{padding:"28px 16px 40px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(26,111,212,0.15)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.blue2,fontWeight:700}}>🚢 Ships Library</div>
          <div style={{marginBottom:14,borderRadius:16,overflow:"hidden",border:`1px solid ${C.border}`}}><YachtSVG/></div>
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
