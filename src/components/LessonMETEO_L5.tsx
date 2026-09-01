// @ts-nocheck
import { useState, useEffect } from "react";
import { C, T, Stars, Card, SL, QuizComp, QuestionBank } from "./LessonShared";

// LessonShared's T.module is hardcoded to Safety ("Sécurité"/"Safety"/...) — override per department.
const MODULE_LABEL = { fr:"Météorologie", en:"Meteorology", es:"Meteorología", pt:"Meteorologia" };

// SVG — TROPICAL CYCLONE: forecast track, center, dangerous/navigable semicircle, ship position.
// Static diagram (no click interaction) — reasoning happens via the text-based Exercise question below.
function CycloneSVG({ lang }) {
  const L = {
    fr:{ dangerous:"Dangerous\nsemicircle", navigable:"Navigable\nsemicircle", track:"Trajectoire prévue", ship:"Navire" },
    en:{ dangerous:"Dangerous\nsemicircle", navigable:"Navigable\nsemicircle", track:"Forecast track", ship:"Ship" },
    es:{ dangerous:"Semicírculo\npeligroso", navigable:"Semicírculo\nnavegable", track:"Trayectoria prevista", ship:"Buque" },
    pt:{ dangerous:"Semicírculo\nperigoso", navigable:"Semicírculo\nnavegável", track:"Trajetória prevista", ship:"Navio" },
  }[lang] || {
    dangerous:"Dangerous\nsemicircle", navigable:"Navigable\nsemicircle", track:"Trajectoire prévue", ship:"Navire"
  };
  return (
    <div style={{textAlign:"center"}}>
      <svg width="100%" height="240" viewBox="0 0 280 240">
        <rect width="280" height="240" fill="#061020" rx="8"/>
        {/* forecast track (dashed, NE-bound) */}
        <line x1="70" y1="190" x2="210" y2="50" stroke={C.muted} strokeWidth="1.5" strokeDasharray="5,4" opacity="0.7"/>
        <polygon points="210,50 202,58 214,62" fill={C.muted}/>
        <text x="150" y="112" fontSize="9" fill={C.muted} transform="rotate(-45 150 112)">{L.track}</text>
        {/* cyclone spiral bands around center */}
        <circle cx="140" cy="120" r="60" fill="none" stroke={C.red} strokeWidth="1" opacity="0.35"/>
        <circle cx="140" cy="120" r="42" fill="none" stroke={C.red} strokeWidth="1.3" opacity="0.55"/>
        <circle cx="140" cy="120" r="24" fill="none" stroke={C.red} strokeWidth="1.6" opacity="0.8"/>
        <circle cx="140" cy="120" r="5" fill={C.gold2}/>
        {/* dangerous semicircle — right side of track (fill) */}
        <path d="M140,120 L70,190 A98,98 0 0,1 210,50 Z" fill={C.red} opacity="0.13"/>
        {/* navigable semicircle — left side of track (fill) */}
        <path d="M140,120 L210,50 A98,98 0 0,1 70,190 Z" fill={C.blue2} opacity="0.13"/>
        <text x="205" y="130" fontSize="9" fontWeight="700" fill={C.red} textAnchor="middle">{L.dangerous.split("\n")[0]}</text>
        <text x="205" y="141" fontSize="9" fontWeight="700" fill={C.red} textAnchor="middle">{L.dangerous.split("\n")[1]}</text>
        <text x="72" y="130" fontSize="9" fontWeight="700" fill={C.blue2} textAnchor="middle">{L.navigable.split("\n")[0]}</text>
        <text x="72" y="141" fontSize="9" fontWeight="700" fill={C.blue2} textAnchor="middle">{L.navigable.split("\n")[1]}</text>
        {/* ship position — east of track */}
        <g>
          <circle cx="205" cy="128" r="5" fill={C.gold}/>
          <text x="205" y="112" fontSize="14" textAnchor="middle">🚢</text>
          <text x="205" y="98" fontSize="9" fontWeight="700" fill={C.gold} textAnchor="middle">{L.ship}</text>
        </g>
      </svg>
    </div>
  );
}

// SVG — STORM (ORAGE), interactive (click/tap). Two clickable parts
// matching s3's content exactly: the cumulonimbus cloud (origin) and the
// downdraft/rafale (the hazard) — no updraft mechanics added, since s3
// never describes them.
function StormSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const L = {
    fr:{ cloud:"Cumulonimbus", gust:"Rafale descendante",
      cloudDesc:"L'orage se développe à partir de ce nuage à développement vertical intense. Tout cumulonimbus observé doit être considéré comme un risque potentiel et surveillé en conséquence.",
      gustDesc:"Rafales descendantes pouvant être très violentes, sur une durée généralement brève. Tous les orages ne deviennent pas des phénomènes extrêmes, mais la vigilance reste de mise.",
      hint:"Touche un élément" },
    en:{ cloud:"Cumulonimbus", gust:"Downdraft gust",
      cloudDesc:"The storm develops from this intensely vertical cloud. Any observed cumulonimbus must be considered a potential risk and monitored accordingly.",
      gustDesc:"Downdraft gusts that can be very violent, generally over a short duration. Not every storm becomes extreme, but vigilance remains necessary.",
      hint:"Tap an element" },
    es:{ cloud:"Cumulonimbo", gust:"Ráfaga descendente",
      cloudDesc:"La tormenta se desarrolla a partir de esta nube de desarrollo vertical intenso. Todo cumulonimbo observado debe considerarse un riesgo potencial y vigilarse en consecuencia.",
      gustDesc:"Ráfagas descendentes que pueden ser muy violentas, generalmente de corta duración. No toda tormenta se vuelve extrema, pero la vigilancia sigue siendo necesaria.",
      hint:"Toca un elemento" },
    pt:{ cloud:"Cumulonimbo", gust:"Rajada descendente",
      cloudDesc:"A trovoada desenvolve-se a partir desta nuvem de desenvolvimento vertical intenso. Todo cumulonimbo observado deve ser considerado um risco potencial e vigiado em conformidade.",
      gustDesc:"Rajadas descendentes que podem ser muito violentas, geralmente de curta duração. Nem toda trovoada se torna extrema, mas a vigilância continua a ser necessária.",
      hint:"Toque num elemento" },
  }[lang] || {
    cloud:"Cumulonimbus", gust:"Rafale descendante",
    cloudDesc:"L'orage se développe à partir de ce nuage à développement vertical intense. Tout cumulonimbus observé doit être considéré comme un risque potentiel et surveillé en conséquence.",
    gustDesc:"Rafales descendantes pouvant être très violentes, sur une durée généralement brève. Tous les orages ne deviennent pas des phénomènes extrêmes, mais la vigilance reste de mise.",
    hint:"Touche un élément",
  };
  const parts = { cloud:{ name:L.cloud, desc:L.cloudDesc, color:C.muted }, gust:{ name:L.gust, desc:L.gustDesc, color:C.red } };
  const toggle=(k)=>setSel(sel===k?null:k);
  return (
    <div>
      <svg width="100%" height="200" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="#061020" rx="8"/>
        {/* cumulonimbus */}
        <g onClick={()=>toggle("cloud")} style={{cursor:"pointer"}}>
          <path d="M40,90 Q38,72 58,70 Q62,54 84,58 Q98,42 116,52 Q100,52 96,66 L96,90 Q96,95 90,95 L46,95 Q36,95 40,90 Z"
            fill="rgba(200,210,230,1)" opacity={sel==="cloud"?0.95:0.55}/>
          <path d="M60,52 Q76,30 98,38 Q116,26 128,44 Q140,44 136,56 L72,56 Q56,56 60,52 Z"
            fill="rgba(200,210,230,1)" opacity={sel==="cloud"?0.95:0.55}/>
          {sel==="cloud" && <rect x="36" y="26" width="106" height="72" rx="10" fill="none" stroke={parts.cloud.color} strokeWidth="2" strokeDasharray="4,3"/>}
          <text x="90" y="112" fontSize="9" fontWeight="700" fill="rgba(240,244,255,0.85)" textAnchor="middle">{L.cloud}</text>
        </g>
        {/* downdraft gust */}
        <g onClick={()=>toggle("gust")} style={{cursor:"pointer"}}>
          {[60,90,120].map((x,i)=>(
            <g key={i}>
              <line x1={x} y1="120" x2={x} y2="172" stroke={parts.gust.color} strokeWidth="2.5" opacity={sel==="gust"?1:0.45} strokeLinecap="round"/>
              <polygon points={`${x-5},166 ${x+5},166 ${x},178`} fill={parts.gust.color} opacity={sel==="gust"?1:0.45}/>
            </g>
          ))}
          <text x="90" y="192" fontSize="9" fontWeight="700" fill={parts.gust.color} textAnchor="middle">{L.gust}</text>
        </g>
      </svg>
      {!sel && <div style={{fontSize:10,color:"rgba(240,244,255,0.4)",textAlign:"center",marginTop:4}}>{L.hint}</div>}
      {sel && (
        <div style={{marginTop:10,padding:12,borderRadius:10,background:"rgba(10,22,40,0.85)",border:`1px solid ${parts[sel].color}55`}}>
          <div style={{fontSize:13,fontWeight:700,color:parts[sel].color,marginBottom:4}}>{parts[sel].name}</div>
          <div style={{fontSize:11,color:"rgba(240,244,255,0.75)",lineHeight:1.6}}>{parts[sel].desc}</div>
        </div>
      )}
    </div>
  );
}

// BANK - 15 QUESTIONS
const BANK = {
  fr:[
    {q:"Où se trouvent les vents les plus violents dans un cyclone tropical?",opts:["Dans le mur de l'œil","Dans l'œil","Uniquement dans les bandes spiralées extérieures","Ils sont uniformes partout"],correct:0,expl:"L'œil est relativement calme ; le mur de l'œil concentre les vents les plus violents."},
    {q:"Quelle condition favorise la formation d'un cyclone tropical?",opts:["Une mer chaude supérieure à 26°C","Une mer froide","Un fort cisaillement de vent","Une proximité immédiate de l'équateur"],correct:0,expl:"La chaleur de la mer alimente le système en énergie."},
    {q:"Qu'est-ce que le dangerous semicircle?",opts:["Le côté où déplacement et circulation du cyclone se combinent","Le côté toujours calme du cyclone","Une zone sans vent","Le centre exact du cyclone"],correct:0,expl:"Les deux effets combinés y produisent des vents plus forts."},
    {q:"Pourquoi le navigable semicircle est-il plus favorable?",opts:["Le déplacement et la circulation du cyclone s'y soustraient partiellement","Il n'y a jamais de vent de ce côté","C'est toujours le côté le plus proche du centre","Il n'existe aucune différence réelle entre les deux côtés"],correct:0,expl:"Les effets s'atténuent partiellement, facilitant l'éloignement."},
    {q:"Que doit toujours faire un officier avant une manœuvre d'évitement de cyclone?",opts:["Déterminer sa position par rapport à la trajectoire prévue","Attendre de voir le cyclone à l'œil nu","Ignorer les bulletins successifs","Maintenir sa route sans évaluation"],correct:0,expl:"C'est la base pour choisir la bonne manœuvre d'éloignement."},
    {q:"D'où provient un orage?",opts:["D'un cumulonimbus","D'un stratus","D'un cirrus","D'un cumulus isolé de beau temps"],correct:0,expl:"Le cumulonimbus est à l'origine des orages et de leurs rafales."},
    {q:"Comment un officier doit-il considérer tout cumulonimbus observé?",opts:["Comme un risque potentiel à surveiller","Comme totalement inoffensif","Comme un simple nuage esthétique","Comme un signe de beau temps garanti"],correct:0,expl:"Tous les orages ne deviennent pas extrêmes, mais la vigilance reste nécessaire."},
    {q:"Que faut-il faire face à une trombe marine visible, même éloignée?",opts:["Ne jamais chercher à l'approcher ou la traverser","S'en approcher pour mieux l'observer","L'ignorer si la distance semble suffisante","La traverser rapidement pour gagner du temps"],correct:0,expl:"Sa trajectoire peut changer rapidement et de façon imprévisible."},
    {q:"Quelle est la principale différence entre un cyclone et une trombe marine?",opts:["L'échelle et la durée de vie","La couleur du ciel","La température de l'eau uniquement","Aucune différence réelle"],correct:0,expl:"Le cyclone est à grande échelle et dure des jours ; la trombe est locale et brève."},
    {q:"Pourquoi un plan de route face à un cyclone doit-il être réévalué en continu?",opts:["La trajectoire prévue peut évoluer d'un bulletin à l'autre","Un plan initial est toujours définitif","Les cyclones ne changent jamais de trajectoire","Cela n'a aucune utilité pratique"],correct:0,expl:"Chaque nouveau bulletin peut modifier la trajectoire prévue."},
    {q:"Quelle échelle caractérise un cyclone tropical, contrairement à un orage local?",opts:["Plusieurs centaines de kilomètres","Quelques mètres seulement","Une échelle identique à l'orage","Une échelle toujours plus petite que la trombe marine"],correct:0,expl:"Le cyclone est un système de très grande échelle, contrairement aux phénomènes locaux."},
    {q:"Un navire à l'est de la trajectoire prévue d'un cyclone se dirigeant vers le nord-est se trouve généralement dans :",opts:["Le dangerous semicircle","Le navigable semicircle systématiquement","Aucun des deux, cela dépend uniquement de la vitesse du navire","Toujours dans l'œil du cyclone"],correct:0,expl:"Dans l'hémisphère nord, le côté droit de la trajectoire est généralement le dangerous semicircle."},
    {q:"Que doit faire un officier après chaque nouveau bulletin météo en zone cyclonique?",opts:["Réévaluer route, vitesse et distance de sécurité","Ignorer le bulletin si la route semble correcte","Attendre le bulletin suivant sans agir","Maintenir systématiquement le plan initial"],correct:0,expl:"La réévaluation continue est essentielle face à un système en évolution."},
    {q:"Quelle est une erreur fréquente concernant la trajectoire d'un cyclone?",opts:["Se concentrer uniquement sur sa position actuelle","Suivre son évolution prévue","Comparer plusieurs bulletins successifs","Réévaluer la route régulièrement"],correct:0,expl:"Ignorer la trajectoire prévue au profit de la seule position actuelle est une erreur fréquente."},
    {q:"Un navire reçoit un avis de cyclone se dirigeant au nord-est ; il se trouve à l'ouest de la trajectoire. Dans quel semicircle se trouve-t-il probablement, et que doit-il faire?",opts:["Navigable semicircle, il peut s'éloigner plus facilement","Dangerous semicircle, il doit foncer droit vers le centre","Aucun risque, il peut ignorer l'avis","L'œil du cyclone, il doit rester immobile"],correct:0,expl:"À l'ouest d'une trajectoire nord-est dans l'hémisphère nord, le navire est généralement dans le semicircle navigable, plus favorable à l'éloignement."},
  ],
  en:[
    {q:"Where are the most violent winds located in a tropical cyclone?",opts:["In the eyewall","In the eye","Only in the outer spiral bands","They are uniform everywhere"],correct:0,expl:"The eye is relatively calm; the eyewall concentrates the most violent winds."},
    {q:"Which condition favors tropical cyclone formation?",opts:["Sea warmer than 26°C","Cold sea","Strong wind shear","Immediate proximity to the equator"],correct:0,expl:"Sea warmth fuels the system with energy."},
    {q:"What is the dangerous semicircle?",opts:["The side where the cyclone's movement and circulation combine","The always-calm side of the cyclone","A windless area","The exact center of the cyclone"],correct:0,expl:"The two combined effects produce stronger winds there."},
    {q:"Why is the navigable semicircle more favorable?",opts:["The cyclone's movement and circulation partially cancel there","There is never wind on that side","It is always the side closest to the center","There is no real difference between the two sides"],correct:0,expl:"The effects partially cancel, making it easier to move away."},
    {q:"What must an officer always do before a cyclone avoidance maneuver?",opts:["Determine position relative to the forecast track","Wait to see the cyclone visually","Ignore successive bulletins","Maintain course without assessment"],correct:0,expl:"This is the basis for choosing the correct avoidance maneuver."},
    {q:"Where does a storm originate from?",opts:["A cumulonimbus","A stratus","A cirrus","An isolated fair-weather cumulus"],correct:0,expl:"Cumulonimbus is the source of storms and their gusts."},
    {q:"How should an officer regard any observed cumulonimbus?",opts:["As a potential risk to monitor","As completely harmless","As a simply aesthetic cloud","As a guaranteed sign of fair weather"],correct:0,expl:"Not all storms become extreme, but vigilance remains necessary."},
    {q:"What should be done facing a visible waterspout, even if distant?",opts:["Never attempt to approach or cross it","Approach it to observe better","Ignore it if the distance seems sufficient","Cross it quickly to save time"],correct:0,expl:"Its path can change rapidly and unpredictably."},
    {q:"What is the main difference between a cyclone and a waterspout?",opts:["Scale and lifespan","Sky color","Only water temperature","No real difference"],correct:0,expl:"The cyclone is large-scale and lasts days; the waterspout is local and brief."},
    {q:"Why must a route plan facing a cyclone be continuously reassessed?",opts:["The forecast track can change from one bulletin to the next","An initial plan is always definitive","Cyclones never change track","It has no practical use"],correct:0,expl:"Each new bulletin can modify the forecast track."},
    {q:"What scale characterizes a tropical cyclone, unlike a local storm?",opts:["Several hundred kilometers","Only a few meters","The same scale as a storm","A scale always smaller than a waterspout"],correct:0,expl:"The cyclone is a very large-scale system, unlike local phenomena."},
    {q:"A ship east of a cyclone's forecast track heading northeast is generally located in:",opts:["The dangerous semicircle","Always the navigable semicircle","Neither, it only depends on ship speed","Always in the cyclone's eye"],correct:0,expl:"In the northern hemisphere, the right side of the track is generally the dangerous semicircle."},
    {q:"What must an officer do after each new weather bulletin in a cyclone zone?",opts:["Reassess route, speed, and safety distance","Ignore the bulletin if the route seems fine","Wait for the next bulletin without acting","Always maintain the initial plan"],correct:0,expl:"Continuous reassessment is essential facing an evolving system."},
    {q:"What is a common mistake regarding a cyclone's track?",opts:["Focusing only on its current position","Following its forecast evolution","Comparing several successive bulletins","Regularly reassessing the route"],correct:0,expl:"Ignoring the forecast track in favor of only the current position is a common mistake."},
    {q:"A ship receives a cyclone warning heading northeast; it is west of the track. Which semicircle is it likely in, and what should it do?",opts:["Navigable semicircle, it can move away more easily","Dangerous semicircle, it should head straight for the center","No risk, it can ignore the warning","The cyclone's eye, it should remain still"],correct:0,expl:"West of a northeast track in the northern hemisphere, the ship is generally in the navigable semicircle, more favorable for moving away."},
  ],
  es:[
    {q:"¿Dónde se encuentran los vientos más violentos en un ciclón tropical?",opts:["En la pared del ojo","En el ojo","Solo en las bandas espirales exteriores","Son uniformes en todas partes"],correct:0,expl:"El ojo es relativamente calmado; la pared del ojo concentra los vientos más violentos."},
    {q:"¿Qué condición favorece la formación de un ciclón tropical?",opts:["Mar cálido superior a 26°C","Mar frío","Fuerte cizalladura del viento","Proximidad inmediata al ecuador"],correct:0,expl:"El calor del mar alimenta el sistema con energía."},
    {q:"¿Qué es el semicírculo peligroso?",opts:["El lado donde desplazamiento y circulación del ciclón se combinan","El lado siempre calmado del ciclón","Una zona sin viento","El centro exacto del ciclón"],correct:0,expl:"Los dos efectos combinados producen allí vientos más fuertes."},
    {q:"¿Por qué el semicírculo navegable es más favorable?",opts:["El desplazamiento y la circulación del ciclón se restan parcialmente allí","Nunca hay viento en ese lado","Siempre es el lado más cercano al centro","No existe ninguna diferencia real entre los dos lados"],correct:0,expl:"Los efectos se atenúan parcialmente, facilitando el alejamiento."},
    {q:"¿Qué debe hacer siempre un oficial antes de una maniobra de evitación de ciclón?",opts:["Determinar su posición respecto a la trayectoria prevista","Esperar a ver el ciclón a simple vista","Ignorar los boletines sucesivos","Mantener el rumbo sin evaluación"],correct:0,expl:"Es la base para elegir la maniobra de alejamiento correcta."},
    {q:"¿De dónde proviene una tormenta?",opts:["De un cumulonimbo","De un estrato","De un cirro","De un cúmulo aislado de buen tiempo"],correct:0,expl:"El cumulonimbo es el origen de las tormentas y sus ráfagas."},
    {q:"¿Cómo debe considerar un oficial todo cumulonimbo observado?",opts:["Como un riesgo potencial a vigilar","Como totalmente inofensivo","Como una simple nube estética","Como un signo garantizado de buen tiempo"],correct:0,expl:"No todas las tormentas se vuelven extremas, pero la vigilancia sigue siendo necesaria."},
    {q:"¿Qué hay que hacer ante una tromba marina visible, aunque esté lejana?",opts:["Nunca intentar acercarse o cruzarla","Acercarse para observarla mejor","Ignorarla si la distancia parece suficiente","Cruzarla rápidamente para ganar tiempo"],correct:0,expl:"Su trayectoria puede cambiar rápida e imprevisiblemente."},
    {q:"¿Cuál es la principal diferencia entre un ciclón y una tromba marina?",opts:["La escala y la duración de vida","El color del cielo","Solo la temperatura del agua","Ninguna diferencia real"],correct:0,expl:"El ciclón es de gran escala y dura días; la tromba es local y breve."},
    {q:"¿Por qué un plan de ruta frente a un ciclón debe reevaluarse continuamente?",opts:["La trayectoria prevista puede cambiar de un boletín a otro","Un plan inicial siempre es definitivo","Los ciclones nunca cambian de trayectoria","No tiene ninguna utilidad práctica"],correct:0,expl:"Cada nuevo boletín puede modificar la trayectoria prevista."},
    {q:"¿Qué escala caracteriza a un ciclón tropical, a diferencia de una tormenta local?",opts:["Varios cientos de kilómetros","Solo unos metros","La misma escala que una tormenta","Una escala siempre menor que la tromba marina"],correct:0,expl:"El ciclón es un sistema de muy gran escala, a diferencia de los fenómenos locales."},
    {q:"Un buque al este de la trayectoria prevista de un ciclón que se dirige al noreste se encuentra generalmente en:",opts:["El semicírculo peligroso","Siempre el semicírculo navegable","Ninguno, depende solo de la velocidad del buque","Siempre en el ojo del ciclón"],correct:0,expl:"En el hemisferio norte, el lado derecho de la trayectoria es generalmente el semicírculo peligroso."},
    {q:"¿Qué debe hacer un oficial tras cada nuevo boletín meteorológico en zona ciclónica?",opts:["Reevaluar ruta, velocidad y distancia de seguridad","Ignorar el boletín si la ruta parece correcta","Esperar al siguiente boletín sin actuar","Mantener siempre el plan inicial"],correct:0,expl:"La reevaluación continua es esencial ante un sistema en evolución."},
    {q:"¿Cuál es un error frecuente respecto a la trayectoria de un ciclón?",opts:["Concentrarse solo en su posición actual","Seguir su evolución prevista","Comparar varios boletines sucesivos","Reevaluar la ruta regularmente"],correct:0,expl:"Ignorar la trayectoria prevista en favor de solo la posición actual es un error frecuente."},
    {q:"Un buque recibe un aviso de ciclón dirigiéndose al noreste; se encuentra al oeste de la trayectoria. ¿En qué semicírculo se encuentra probablemente, y qué debe hacer?",opts:["Semicírculo navegable, puede alejarse más fácilmente","Semicírculo peligroso, debe dirigirse directo al centro","Ningún riesgo, puede ignorar el aviso","El ojo del ciclón, debe permanecer inmóvil"],correct:0,expl:"Al oeste de una trayectoria noreste en el hemisferio norte, el buque está generalmente en el semicírculo navegable, más favorable para alejarse."},
  ],
  pt:[
    {q:"Onde se encontram os ventos mais violentos num ciclone tropical?",opts:["Na parede do olho","No olho","Apenas nas bandas espirais exteriores","São uniformes em todo o lado"],correct:0,expl:"O olho é relativamente calmo; a parede do olho concentra os ventos mais violentos."},
    {q:"Que condição favorece a formação de um ciclone tropical?",opts:["Mar quente superior a 26°C","Mar frio","Forte cisalhamento do vento","Proximidade imediata ao equador"],correct:0,expl:"O calor do mar alimenta o sistema com energia."},
    {q:"O que é o semicírculo perigoso?",opts:["O lado onde deslocamento e circulação do ciclone se combinam","O lado sempre calmo do ciclone","Uma zona sem vento","O centro exato do ciclone"],correct:0,expl:"Os dois efeitos combinados produzem aí ventos mais fortes."},
    {q:"Por que o semicírculo navegável é mais favorável?",opts:["O deslocamento e a circulação do ciclone subtraem-se parcialmente aí","Nunca há vento nesse lado","É sempre o lado mais próximo do centro","Não existe nenhuma diferença real entre os dois lados"],correct:0,expl:"Os efeitos atenuam-se parcialmente, facilitando o afastamento."},
    {q:"O que deve sempre fazer um oficial antes de uma manobra de evasão de ciclone?",opts:["Determinar a sua posição em relação à trajetória prevista","Esperar para ver o ciclone a olho nu","Ignorar os boletins sucessivos","Manter o rumo sem avaliação"],correct:0,expl:"É a base para escolher a manobra de afastamento correta."},
    {q:"De onde provém uma tempestade?",opts:["De um cumulonimbo","De um estrato","De um cirro","De um cúmulo isolado de bom tempo"],correct:0,expl:"O cumulonimbo é a origem das tempestades e das suas rajadas."},
    {q:"Como deve um oficial considerar todo cumulonimbo observado?",opts:["Como um risco potencial a vigiar","Como totalmente inofensivo","Como uma simples nuvem estética","Como um sinal garantido de bom tempo"],correct:0,expl:"Nem todas as tempestades se tornam extremas, mas a vigilância continua a ser necessária."},
    {q:"O que fazer perante uma tromba marítima visível, mesmo distante?",opts:["Nunca tentar aproximar-se ou atravessá-la","Aproximar-se para observar melhor","Ignorá-la se a distância parecer suficiente","Atravessá-la rapidamente para ganhar tempo"],correct:0,expl:"A sua trajetória pode mudar rápida e imprevisivelmente."},
    {q:"Qual é a principal diferença entre um ciclone e uma tromba marítima?",opts:["A escala e a duração de vida","A cor do céu","Apenas a temperatura da água","Nenhuma diferença real"],correct:0,expl:"O ciclone é de grande escala e dura dias; a tromba é local e breve."},
    {q:"Por que um plano de rota face a um ciclone deve ser reavaliado continuamente?",opts:["A trajetória prevista pode mudar de um boletim para outro","Um plano inicial é sempre definitivo","Os ciclones nunca mudam de trajetória","Não tem nenhuma utilidade prática"],correct:0,expl:"Cada novo boletim pode modificar a trajetória prevista."},
    {q:"Que escala caracteriza um ciclone tropical, ao contrário de uma tempestade local?",opts:["Várias centenas de quilómetros","Apenas alguns metros","A mesma escala que uma tempestade","Uma escala sempre menor do que a tromba marítima"],correct:0,expl:"O ciclone é um sistema de muito grande escala, ao contrário dos fenómenos locais."},
    {q:"Um navio a leste da trajetória prevista de um ciclone com direção nordeste encontra-se geralmente em:",opts:["O semicírculo perigoso","Sempre o semicírculo navegável","Nenhum, depende apenas da velocidade do navio","Sempre no olho do ciclone"],correct:0,expl:"No hemisfério norte, o lado direito da trajetória é geralmente o semicírculo perigoso."},
    {q:"O que deve fazer um oficial após cada novo boletim meteorológico em zona ciclónica?",opts:["Reavaliar rota, velocidade e distância de segurança","Ignorar o boletim se a rota parecer correta","Esperar pelo próximo boletim sem agir","Manter sempre o plano inicial"],correct:0,expl:"A reavaliação contínua é essencial perante um sistema em evolução."},
    {q:"Qual é um erro frequente relativamente à trajetória de um ciclone?",opts:["Concentrar-se apenas na sua posição atual","Seguir a sua evolução prevista","Comparar vários boletins sucessivos","Reavaliar a rota regularmente"],correct:0,expl:"Ignorar a trajetória prevista em favor apenas da posição atual é um erro frequente."},
    {q:"Um navio recebe um aviso de ciclone com direção nordeste; encontra-se a oeste da trajetória. Em que semicírculo se encontra provavelmente, e o que deve fazer?",opts:["Semicírculo navegável, pode afastar-se mais facilmente","Semicírculo perigoso, deve dirigir-se diretamente ao centro","Nenhum risco, pode ignorar o aviso","O olho do ciclone, deve permanecer imóvel"],correct:0,expl:"A oeste de uma trajetória nordeste no hemisfério norte, o navio está geralmente no semicírculo navegável, mais favorável para se afastar."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS) — reprend Q1, Q3, Q5, Q10, Q15 de la banque
const QUIZ = {
  fr:[BANK.fr[0], BANK.fr[2], BANK.fr[4], BANK.fr[9], BANK.fr[14]],
  en:[BANK.en[0], BANK.en[2], BANK.en[4], BANK.en[9], BANK.en[14]],
  es:[BANK.es[0], BANK.es[2], BANK.es[4], BANK.es[9], BANK.es[14]],
  pt:[BANK.pt[0], BANK.pt[2], BANK.pt[4], BANK.pt[9], BANK.pt[14]],
};

// TEXT CONTENT
const getContent = lang => {
  const d = {
    fr:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Leçon 5/7",
      title:"Phénomènes tropicaux et dangereux",
      intro:"Cette leçon est la deuxième leçon de niveau officier du module Marine Meteorology. Elle apprend à reconnaître les phénomènes météorologiques dangereux et à préparer les premières mesures de sécurité avant toute décision de navigation.",
      p0:"LES PHÉNOMÈNES LES PLUS DANGEREUX SONT SOUVENT LES PLUS RAPIDES À SE FORMER.",s0t:"Phénomènes tropicaux et dangereux",
      s0:"Reconnaître les cyclones tropicaux, les orages violents et les trombes marines, et préparer les premières mesures de sécurité.",
      p1:"Cyclones tropicaux : formation et structure",
      s1:"Un cyclone tropical se forme lorsque plusieurs conditions sont réunies : une mer chaude (supérieure à 26°C), un faible cisaillement de vent en altitude, et une distance suffisante de l'équateur pour permettre la rotation.\n\nSa structure comprend un œil (zone centrale relativement calme), un mur de l'œil (eyewall) et des bandes spiralées de nuages convectifs. Contrairement à une idée reçue fréquente, les vents les plus violents ne se trouvent pas dans l'œil mais dans le mur de l'œil qui l'entoure.\n\nLe cyclone est un système de très grande échelle, s'étendant sur plusieurs centaines de kilomètres, contrairement aux phénomènes locaux comme les orages ou les trombes marines.",
      p2:"Dangerous semicircle et navigable semicircle",
      s2:"Face à un cyclone tropical, la trajectoire du navire par rapport à celle du système détermine le niveau de danger. Le dangerous semicircle est le côté de la trajectoire où le déplacement du cyclone et sa circulation propre se combinent, produisant des vents plus forts et rapprochant le navire du centre. Le navigable semicircle est le côté opposé, où les deux effets se soustraient partiellement, rendant l'éloignement plus facile.\n\nDéterminer sa position par rapport à la trajectoire prévue est une compétence essentielle avant toute manœuvre d'évitement.",
      p3:"Orages et grains violents",
      s3:"Un orage se développe à partir d'un cumulonimbus, avec des rafales descendantes pouvant être très violentes sur une durée généralement brève. Tous les orages ne deviennent pas des phénomènes extrêmes, mais tout cumulonimbus observé doit être considéré comme un risque potentiel et surveillé en conséquence.",
      p4:"Trombes marines et vents violents localisés",
      s4:"La trombe marine est une colonne tourbillonnante visible entre nuage et mer, généralement de courte durée mais capable de dégâts sérieux. Contrairement au cyclone, son échelle est très locale et sa durée de vie très courte.\n\nRègle opérationnelle simple : ne jamais chercher à traverser ou approcher une trombe marine, même si elle semble éloignée — sa trajectoire peut changer rapidement et de façon imprévisible.",
      p5:"🎯 Exercice : positionner le navire face au cyclone",
      s5:"Un OOW reçoit un avis de cyclone tropical indiquant la position du centre et sa trajectoire prévue vers le nord-est. Le navire se trouve à l'est de cette trajectoire.\n\nLe navire se trouve-t-il dans le dangerous semicircle ou le navigable semicircle ? Justifiez votre réponse. Quelle manœuvre générale serait appropriée dans cette situation, et pourquoi ?",
      p6:"🧭 Étude de cas",
      p7:"Un navire en route dans une zone à risque cyclonique reçoit des bulletins météo successifs sur 48 heures. À chaque nouveau bulletin, la trajectoire prévue du cyclone dévie légèrement par rapport à la précédente. Le commandant réévalue à chaque fois : la route prévue, la vitesse, la distance de sécurité maintenue, et les options de déroutement disponibles.\n\nPourquoi un plan de route face à un cyclone ne peut-il jamais être considéré comme définitivement établi ?",
      p8:"📋 Banque de 15 questions",
      p9:"💭 À retenir : les erreurs fréquentes",
      s9:"Sous-estimer la vitesse de déplacement d'un système. Confondre grain et cyclone par leur intensité apparente. Ignorer une mise à jour de trajectoire. Naviguer dans le dangerous semicircle par méconnaissance de sa position relative. Se concentrer uniquement sur la position actuelle du cyclone sans tenir compte de sa trajectoire prévue.",
      sumT:"Résumé — Leçon 5",
      sumP:["Les vents les plus violents se trouvent dans le mur de l'œil, pas dans l'œil","Le dangerous semicircle combine déplacement et circulation du cyclone","Tout cumulonimbus est un risque potentiel","Une trombe marine ne doit jamais être approchée","Un plan de route face à un cyclone se réévalue en continu"],
      learnedP:["Structure d'un cyclone tropical","Distinction dangerous/navigable semicircle","Reconnaissance des orages à risque","Conduite à tenir face à une trombe marine"],
      transition:"Dans la prochaine leçon, vous apprendrez à exploiter les cartes météo, les bulletins et les sources d'information maritime disponibles à bord.",
      safetyMsg:"Les phénomènes les plus dangereux sont souvent les plus rapides à se former.",
      finalLabel:"MESSAGE CLÉ",
    },
    en:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Lesson 5/7",
      title:"Tropical and Dangerous Phenomena",
      intro:"This lesson is the second officer-level lesson in the Marine Meteorology module. It teaches recognition of dangerous weather phenomena and preparation of initial safety measures before any navigation decision.",
      p0:"THE MOST DANGEROUS PHENOMENA ARE OFTEN THE FASTEST TO FORM.",s0t:"Tropical Weather and Dangerous Phenomena",
      s0:"Recognizing tropical cyclones, violent storms, and waterspouts, and preparing initial safety measures.",
      p1:"Tropical Cyclones: Formation and Structure",
      s1:"A tropical cyclone forms when several conditions come together: warm sea (above 26°C), low upper-level wind shear, and sufficient distance from the equator to allow rotation.\n\nIts structure includes an eye (relatively calm central zone), an eyewall, and spiral bands of convective clouds. Contrary to a common misconception, the most violent winds are not in the eye but in the surrounding eyewall.\n\nA cyclone is a very large-scale system, spanning several hundred kilometers, unlike local phenomena such as storms or waterspouts.",
      p2:"Dangerous Semicircle and Navigable Semicircle",
      s2:"When facing a tropical cyclone, the ship's track relative to the system's track determines the level of danger. The dangerous semicircle is the side where the cyclone's movement and its own circulation combine, producing stronger winds and bringing the ship closer to the center. The navigable semicircle is the opposite side, where the two effects partially cancel, making it easier to move away.\n\nDetermining one's position relative to the forecast track is an essential skill before any avoidance maneuver.",
      p3:"Storms and Violent Squalls",
      s3:"A storm develops from a cumulonimbus, with downdrafts that can be very violent over a generally brief duration. Not every storm becomes an extreme phenomenon, but every observed cumulonimbus must be considered a potential risk and monitored accordingly.",
      p4:"Waterspouts and Localized Violent Winds",
      s4:"A waterspout is a rotating column visible between cloud and sea, generally short-lived but capable of serious damage. Unlike a cyclone, its scale is very local and its lifespan very short.\n\nSimple operational rule: never attempt to cross or approach a waterspout, even if it seems distant — its path can change rapidly and unpredictably.",
      p5:"🎯 Exercise: Positioning the Ship Relative to the Cyclone",
      s5:"An OOW receives a tropical cyclone warning indicating the center's position and its forecast track toward the northeast. The ship is located east of this track.\n\nIs the ship in the dangerous semicircle or the navigable semicircle? Justify your answer. What general maneuver would be appropriate in this situation, and why?",
      p6:"🧭 Case Study",
      p7:"A ship underway in a cyclone-risk area receives successive weather bulletins over 48 hours. With each new bulletin, the cyclone's forecast track deviates slightly from the previous one. Each time, the Master reassesses: the planned route, speed, maintained safety distance, and available diversion options.\n\nWhy can a route plan facing a cyclone never be considered definitively established?",
      p8:"📋 15-Question Bank",
      p9:"💭 Remember: Common Mistakes",
      s9:"Underestimating a system's speed of movement. Confusing a squall with a cyclone based on apparent intensity. Ignoring a track update. Navigating in the dangerous semicircle due to not knowing one's relative position. Focusing only on the cyclone's current position without considering its forecast track.",
      sumT:"Summary — Lesson 5",
      sumP:["The most violent winds are in the eyewall, not the eye","The dangerous semicircle combines the cyclone's movement and circulation","Every cumulonimbus is a potential risk","A waterspout should never be approached","A route plan facing a cyclone is continuously reassessed"],
      learnedP:["Structure of a tropical cyclone","Distinguishing dangerous from navigable semicircle","Recognizing risky storms","Conduct when facing a waterspout"],
      transition:"In the next lesson, you will learn to use weather charts, bulletins, and maritime information sources available on board.",
      safetyMsg:"The most dangerous phenomena are often the fastest to form.",
      finalLabel:"KEY MESSAGE",
    },
    es:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Lección 5/7",
      title:"Fenómenos tropicales y peligrosos",
      intro:"Esta lección es la segunda lección de nivel oficial del módulo de Meteorología Marina. Enseña a reconocer los fenómenos meteorológicos peligrosos y a preparar las primeras medidas de seguridad antes de cualquier decisión de navegación.",
      p0:"LOS FENÓMENOS MÁS PELIGROSOS SON A MENUDO LOS MÁS RÁPIDOS EN FORMARSE.",s0t:"Fenómenos tropicales y peligrosos",
      s0:"Reconocer los ciclones tropicales, las tormentas violentas y las trombas marinas, y preparar las primeras medidas de seguridad.",
      p1:"Ciclones tropicales: formación y estructura",
      s1:"Un ciclón tropical se forma cuando se reúnen varias condiciones: mar cálido (superior a 26°C), poca cizalladura del viento en altitud, y suficiente distancia del ecuador para permitir la rotación.\n\nSu estructura incluye un ojo (zona central relativamente calmada), una pared del ojo (eyewall) y bandas espirales de nubes convectivas. Contrariamente a una idea errónea frecuente, los vientos más violentos no se encuentran en el ojo sino en la pared del ojo que lo rodea.\n\nEl ciclón es un sistema de muy gran escala, que se extiende varios cientos de kilómetros, a diferencia de los fenómenos locales como las tormentas o las trombas marinas.",
      p2:"Semicírculo peligroso y semicírculo navegable",
      s2:"Ante un ciclón tropical, la trayectoria del buque respecto a la del sistema determina el nivel de peligro. El semicírculo peligroso es el lado donde el desplazamiento del ciclón y su propia circulación se combinan, produciendo vientos más fuertes y acercando el buque al centro. El semicírculo navegable es el lado opuesto, donde ambos efectos se restan parcialmente, facilitando el alejamiento.\n\nDeterminar la posición respecto a la trayectoria prevista es una habilidad esencial antes de cualquier maniobra de evitación.",
      p3:"Tormentas y chubascos violentos",
      s3:"Una tormenta se desarrolla a partir de un cumulonimbo, con ráfagas descendentes que pueden ser muy violentas durante una duración generalmente breve. No todas las tormentas se convierten en fenómenos extremos, pero todo cumulonimbo observado debe considerarse un riesgo potencial y vigilarse en consecuencia.",
      p4:"Trombas marinas y vientos violentos localizados",
      s4:"La tromba marina es una columna giratoria visible entre nube y mar, generalmente de corta duración pero capaz de daños serios. A diferencia del ciclón, su escala es muy local y su duración muy corta.\n\nRegla operativa simple: nunca intentar cruzar o acercarse a una tromba marina, incluso si parece lejana — su trayectoria puede cambiar rápida e imprevisiblemente.",
      p5:"🎯 Ejercicio: posicionar el buque frente al ciclón",
      s5:"Un OOW recibe un aviso de ciclón tropical que indica la posición del centro y su trayectoria prevista hacia el noreste. El buque se encuentra al este de esta trayectoria.\n\n¿Se encuentra el buque en el semicírculo peligroso o en el navegable? Justifica tu respuesta. ¿Qué maniobra general sería apropiada en esta situación, y por qué?",
      p6:"🧭 Estudio de caso",
      p7:"Un buque en ruta en una zona de riesgo ciclónico recibe boletines meteorológicos sucesivos durante 48 horas. Con cada nuevo boletín, la trayectoria prevista del ciclón se desvía ligeramente respecto a la anterior. Cada vez, el capitán reevalúa: la ruta prevista, la velocidad, la distancia de seguridad mantenida, y las opciones de desvío disponibles.\n\n¿Por qué un plan de ruta frente a un ciclón nunca puede considerarse definitivamente establecido?",
      p8:"📋 Banco de 15 preguntas",
      p9:"💭 Recuerda: errores frecuentes",
      s9:"Subestimar la velocidad de desplazamiento de un sistema. Confundir un chubasco con un ciclón por su intensidad aparente. Ignorar una actualización de trayectoria. Navegar en el semicírculo peligroso por desconocimiento de la posición relativa. Concentrarse solo en la posición actual del ciclón sin considerar su trayectoria prevista.",
      sumT:"Resumen — Lección 5",
      sumP:["Los vientos más violentos están en la pared del ojo, no en el ojo","El semicírculo peligroso combina desplazamiento y circulación del ciclón","Todo cumulonimbo es un riesgo potencial","Una tromba marina nunca debe aproximarse","Un plan de ruta frente a un ciclón se reevalúa continuamente"],
      learnedP:["Estructura de un ciclón tropical","Distinción semicírculo peligroso/navegable","Reconocimiento de tormentas de riesgo","Conducta ante una tromba marina"],
      transition:"En la próxima lección, aprenderás a usar cartas meteorológicas, boletines y fuentes de información marítima disponibles a bordo.",
      safetyMsg:"Los fenómenos más peligrosos son a menudo los más rápidos en formarse.",
      finalLabel:"MENSAJE CLAVE",
    },
    pt:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Lição 5/7",
      title:"Fenómenos tropicais e perigosos",
      intro:"Esta lição é a segunda lição de nível oficial do módulo de Meteorologia Marítima. Ensina a reconhecer os fenómenos meteorológicos perigosos e a preparar as primeiras medidas de segurança antes de qualquer decisão de navegação.",
      p0:"OS FENÓMENOS MAIS PERIGOSOS SÃO FREQUENTEMENTE OS MAIS RÁPIDOS A FORMAR-SE.",s0t:"Fenómenos tropicais e perigosos",
      s0:"Reconhecer os ciclones tropicais, as tempestades violentas e as trombas marítimas, e preparar as primeiras medidas de segurança.",
      p1:"Ciclones tropicais: formação e estrutura",
      s1:"Um ciclone tropical forma-se quando várias condições se reúnem: mar quente (superior a 26°C), pouca cisalhamento do vento em altitude, e distância suficiente do equador para permitir a rotação.\n\nA sua estrutura inclui um olho (zona central relativamente calma), uma parede do olho (eyewall) e bandas espirais de nuvens convectivas. Contrariamente a uma ideia errada frequente, os ventos mais violentos não se encontram no olho mas sim na parede do olho que o rodeia.\n\nO ciclone é um sistema de muito grande escala, estendendo-se por várias centenas de quilómetros, ao contrário dos fenómenos locais como as tempestades ou as trombas marítimas.",
      p2:"Semicírculo perigoso e semicírculo navegável",
      s2:"Perante um ciclone tropical, a trajetória do navio em relação à do sistema determina o nível de perigo. O semicírculo perigoso é o lado onde o deslocamento do ciclone e a sua própria circulação se combinam, produzindo ventos mais fortes e aproximando o navio do centro. O semicírculo navegável é o lado oposto, onde os dois efeitos se subtraem parcialmente, facilitando o afastamento.\n\nDeterminar a posição em relação à trajetória prevista é uma competência essencial antes de qualquer manobra de evasão.",
      p3:"Tempestades e borrascas violentas",
      s3:"Uma tempestade desenvolve-se a partir de um cumulonimbo, com rajadas descendentes que podem ser muito violentas durante uma duração geralmente breve. Nem todas as tempestades se tornam fenómenos extremos, mas todo cumulonimbo observado deve ser considerado um risco potencial e vigiado em conformidade.",
      p4:"Trombas marítimas e ventos violentos localizados",
      s4:"A tromba marítima é uma coluna giratória visível entre nuvem e mar, geralmente de curta duração mas capaz de danos sérios. Ao contrário do ciclone, a sua escala é muito local e a sua duração muito curta.\n\nRegra operacional simples: nunca tentar atravessar ou aproximar-se de uma tromba marítima, mesmo que pareça distante — a sua trajetória pode mudar rápida e imprevisivelmente.",
      p5:"🎯 Exercício: posicionar o navio face ao ciclone",
      s5:"Um OOW recebe um aviso de ciclone tropical indicando a posição do centro e a sua trajetória prevista para nordeste. O navio encontra-se a leste desta trajetória.\n\nO navio encontra-se no semicírculo perigoso ou no navegável? Justifica a tua resposta. Que manobra geral seria apropriada nesta situação, e porquê?",
      p6:"🧭 Estudo de caso",
      p7:"Um navio em rota numa zona de risco ciclónico recebe boletins meteorológicos sucessivos durante 48 horas. A cada novo boletim, a trajetória prevista do ciclone desvia-se ligeiramente em relação à anterior. Cada vez, o comandante reavalia: a rota prevista, a velocidade, a distância de segurança mantida, e as opções de desvio disponíveis.\n\nPor que razão um plano de rota face a um ciclone nunca pode ser considerado definitivamente estabelecido?",
      p8:"📋 Banco de 15 perguntas",
      p9:"💭 Lembrar: erros frequentes",
      s9:"Subestimar a velocidade de deslocamento de um sistema. Confundir uma borrasca com um ciclone pela sua intensidade aparente. Ignorar uma atualização de trajetória. Navegar no semicírculo perigoso por desconhecimento da posição relativa. Concentrar-se apenas na posição atual do ciclone sem considerar a sua trajetória prevista.",
      sumT:"Resumo — Lição 5",
      sumP:["Os ventos mais violentos estão na parede do olho, não no olho","O semicírculo perigoso combina deslocamento e circulação do ciclone","Todo cumulonimbo é um risco potencial","Uma tromba marítima nunca deve ser aproximada","Um plano de rota face a um ciclone reavalia-se continuamente"],
      learnedP:["Estrutura de um ciclone tropical","Distinção semicírculo perigoso/navegável","Reconhecimento de tempestades de risco","Conduta perante uma tromba marítima"],
      transition:"Na próxima lição, vais aprender a usar cartas meteorológicas, boletins e fontes de informação marítima disponíveis a bordo.",
      safetyMsg:"Os fenómenos mais perigosos são frequentemente os mais rápidos a formar-se.",
      finalLabel:"MENSAGEM-CHAVE",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonMETEO_L5({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, onQuizScored=(score:number,maxScore:number)=>{} }) {
  const t = T[lang]||T.fr;
  const quiz = QUIZ[lang]||QUIZ.fr;
  const bank = BANK[lang]||BANK.fr;
  const lc = getContent(lang);
  const moduleLabel = MODULE_LABEL[lang]||MODULE_LABEL.fr;
  const [phase, setPhase] = useState("content");
  const [bankDone, setBankDone] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [vis, setVis] = useState(false);
  useEffect(()=>{ setTimeout(()=>setVis(true),80); },[]);
  const progress = phase==="content"?15:phase==="quiz"?70:100;

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.border}`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.gold,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>{moduleLabel}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 5/7":lang==="en"?"Lesson 5/7":lang==="es"?"Lección 5/7":"Lição 5/7"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            {/* Access tier badge intentionally omitted — Billing/Access Policy for Meteorology not yet decided */}
            <div style={{fontSize:11,color:C.orange,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.orange},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(230,126,34,0.15)",border:`1px solid ${C.orange}44`,fontSize:11,color:C.orange,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.orange}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>

            <SL icon="🌀" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🌀</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🌪️" text={lc.p1} color={C.red}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>

            <SL icon="🧭" text={lc.p2} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><CycloneSVG lang={lang}/></Card>

            <SL icon="⛈️" text={lc.p3} color={C.orange}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><StormSVG lang={lang}/></Card>

            <SL icon="🌊" text={lc.p4} color={C.teal}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.85)",lineHeight:1.8,whiteSpace:"pre-line"}}>{lc.s5}</div>
            </Card>

            <SL icon="🧭" text={lc.p6} color={C.blue2}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}44`,background:"linear-gradient(135deg,rgba(26,111,212,0.08),rgba(13,31,60,0.8))"}}>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.85)",lineHeight:1.8,whiteSpace:"pre-line"}}>{lc.p7}</div>
            </Card>

            <SL icon="📋" text={lc.p8} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank} onComplete={()=>setBankDone(true)}/></Card>

            <SL icon="💭" text={lc.p9} color={C.purple}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.85)",lineHeight:1.8,whiteSpace:"pre-line"}}>{lc.s9}</div></Card>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(230,126,34,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,boxShadow:"0 10px 36px rgba(230,126,34,0.35)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz Final - Météorologie":lang==="en"?"Final Quiz - Meteorology":lang==="es"?"Quiz Final - Meteorología":"Quiz Final - Meteorologia"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 5/7":"questions · Lesson 5/7"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);onQuizScored(s,quiz.length);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(230,126,34,0.15)",border:`1px solid ${C.orange}55`,fontSize:14,color:C.gold2,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>

            <Card style={{marginBottom:16,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.1),rgba(13,31,60,0.9))"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span style={{fontSize:20}}>🌦️</span>
                <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",fontWeight:700}}>{lc.finalLabel}</div>
              </div>
              <div style={{fontSize:13,color:C.white,lineHeight:1.8,fontStyle:"italic"}}>{lc.safetyMsg}</div>
            </Card>

            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <div style={{textAlign:"center",fontSize:13,color:C.gold2,fontStyle:"italic",marginBottom:14,padding:"0 8px"}}>{lc.transition}</div>

            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(230,126,34,0.35)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 6 - CARTES ET BULLETINS →":lang==="en"?"LESSON 6 - CHARTS AND BULLETINS →":lang==="es"?"LECCIÓN 6 - CARTAS Y BOLETINES →":"LIÇÃO 6 - CARTAS E BOLETINS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
