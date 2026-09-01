// @ts-nocheck
import { useState, useEffect } from "react";
import { C, T, Stars, Card, SL, QuizComp, QuestionBank } from "./LessonShared";

// LessonShared's T.module is hardcoded to Safety ("Sécurité"/"Safety"/...) — override per department.
const MODULE_LABEL = { fr:"Météorologie", en:"Meteorology", es:"Meteorología", pt:"Meteorologia" };

// SVG — ISOBAR SPACING (widely spaced vs tightly packed) — specific to this lesson, not shared.
function IsobarsSVG({ lang }) {
  const L = {
    fr:{ wide:"Isobares espacées", tight:"Isobares resserrées", weak:"Gradient faible\nVent modéré", strong:"Gradient fort\nVent soutenu à violent" },
    en:{ wide:"Widely Spaced Isobars", tight:"Tightly Packed Isobars", weak:"Weak gradient\nModerate wind", strong:"Strong gradient\nSustained to violent wind" },
    es:{ wide:"Isobaras espaciadas", tight:"Isobaras muy juntas", weak:"Gradiente débil\nViento moderado", strong:"Gradiente fuerte\nViento sostenido a violento" },
    pt:{ wide:"Isóbaras espaçadas", tight:"Isóbaras muito próximas", weak:"Gradiente fraco\nVento moderado", strong:"Gradiente forte\nVento sustentado a violento" },
  }[lang] || {
    wide:"Isobares espacées", tight:"Isobares resserrées", weak:"Gradient faible\nVent modéré", strong:"Gradient fort\nVent soutenu à violent"
  };
  return (
    <div style={{display:"flex",gap:10}}>
      <div style={{flex:1,textAlign:"center"}}>
        <svg width="100%" height="140" viewBox="0 0 140 140">
          <rect width="140" height="140" fill="#061020" rx="8"/>
          {[62,48,34,20].map((r,i)=>(
            <circle key={i} cx="70" cy="70" r={r} fill="none" stroke={C.blue2} strokeWidth="1.5" opacity={0.85-i*0.1}/>
          ))}
          <circle cx="70" cy="70" r="4" fill={C.gold2}/>
        </svg>
        <div style={{fontSize:10,fontWeight:700,color:C.blue2,marginTop:6}}>{L.wide}</div>
        <div style={{fontSize:9,color:C.muted,whiteSpace:"pre-line",marginTop:2}}>{L.weak}</div>
      </div>
      <div style={{flex:1,textAlign:"center"}}>
        <svg width="100%" height="140" viewBox="0 0 140 140">
          <rect width="140" height="140" fill="#061020" rx="8"/>
          {[66,58,50,42,34,26,18].map((r,i)=>(
            <circle key={i} cx="70" cy="70" r={r} fill="none" stroke={C.red} strokeWidth="1.5" opacity={0.95-i*0.08}/>
          ))}
          <circle cx="70" cy="70" r="4" fill={C.gold2}/>
        </svg>
        <div style={{fontSize:10,fontWeight:700,color:C.red,marginTop:6}}>{L.tight}</div>
        <div style={{fontSize:9,color:C.muted,whiteSpace:"pre-line",marginTop:2}}>{L.strong}</div>
      </div>
    </div>
  );
}

// SVG — FRONT SYMBOLS, static. Standard WMO chart symbols for the three
// front types described in s4 (chaud/froid/occlus) — semicircles on the
// warm-front side, triangles on the cold-front side, alternating on the
// occluded front, all pointing the direction of travel.
function FrontSymbolsSVG({ lang }) {
  const L = {
    fr:{ warm:"Front chaud", cold:"Front froid", occluded:"Front occlus" },
    en:{ warm:"Warm front", cold:"Cold front", occluded:"Occluded front" },
    es:{ warm:"Frente cálido", cold:"Frente frío", occluded:"Frente ocluido" },
    pt:{ warm:"Frente quente", cold:"Frente fria", occluded:"Frente oclusa" },
  }[lang] || { warm:"Front chaud", cold:"Front froid", occluded:"Front occlus" };

  const Bumps = ({ color }) => (
    <g>
      <line x1="6" y1="30" x2="94" y2="30" stroke={color} strokeWidth="2"/>
      {[16,38,60,82].map((x,i)=>(<path key={i} d={`M${x-8},30 A8,8 0 0 1 ${x+8},30`} fill="none" stroke={color} strokeWidth="2"/>))}
    </g>
  );
  const Triangles = ({ color }) => (
    <g>
      <line x1="6" y1="30" x2="94" y2="30" stroke={color} strokeWidth="2"/>
      {[16,38,60,82].map((x,i)=>(<polygon key={i} points={`${x-7},30 ${x},19 ${x+7},30`} fill={color}/>))}
    </g>
  );
  const Occluded = ({ colorA, colorB }) => (
    <g>
      <line x1="6" y1="30" x2="94" y2="30" stroke={colorA} strokeWidth="2"/>
      <polygon points="20,30 27,19 34,30" fill={colorA}/>
      <path d="M46,30 A8,8 0 0 1 62,30" fill="none" stroke={colorB} strokeWidth="2"/>
      <polygon points="76,30 83,19 90,30" fill={colorA}/>
    </g>
  );

  const rows = [
    { label:L.warm, render:<Bumps color={C.red}/>, color:C.red },
    { label:L.cold, render:<Triangles color={C.blue2}/>, color:C.blue2 },
    { label:L.occluded, render:<Occluded colorA={C.blue2} colorB={C.red}/>, color:C.gold2 },
  ];

  return (
    <div>
      {rows.map((r,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",gap:12,marginBottom:i===rows.length-1?0:10}}>
          <svg width="100" height="40" viewBox="0 0 100 40" style={{flexShrink:0}}>{r.render}</svg>
          <div style={{fontSize:11,fontWeight:700,color:r.color}}>{r.label}</div>
        </div>
      ))}
    </div>
  );
}

// BANK - 15 QUESTIONS
const BANK = {
  fr:[
    {q:"Qu'est-ce qu'un anticyclone ?",opts:["Une zone de haute pression où l'air descend et diverge","Une zone de basse pression instable","Un type de front","Une masse d'air froide uniquement"],correct:0,expl:"L'air descendant favorise un temps stable."},
    {q:"Une dépression est généralement associée à :",opts:["L'instabilité","La stabilité","Un temps toujours clair","L'absence de vent"],correct:0,expl:"L'air montant et convergent favorise l'instabilité."},
    {q:"Des isobares très resserrées indiquent :",opts:["Un vent fort","Un vent faible","Une pression stable","Un temps clair"],correct:0,expl:"Un gradient de pression fort produit un vent soutenu à violent."},
    {q:"Une masse d'air polaire est caractérisée par :",opts:["Une température froide","Une chaleur intense","Une humidité tropicale","Une origine continentale chaude"],correct:0,expl:"Elle garde les caractéristiques froides de sa région d'origine."},
    {q:"Pourquoi une masse d'air polaire reste-t-elle froide loin de sa région d'origine ?",opts:["Elle conserve ses caractéristiques tant qu'elle n'est pas fortement modifiée","Elle se réchauffe instantanément","Cela dépend uniquement de la saison","Elle perd toujours ses propriétés rapidement"],correct:0,expl:"C'est le principe de persistance des masses d'air."},
    {q:"Qu'est-ce qu'un front météorologique ?",opts:["La zone de contact entre deux masses d'air différentes","Un type de nuage isolé","Une zone de haute pression uniquement","Un instrument de mesure"],correct:0,expl:"Un front sépare deux masses d'air aux caractéristiques différentes."},
    {q:"Quel front évolue généralement le plus rapidement ?",opts:["Le front froid","Le front chaud","Le front occlus uniquement la nuit","Aucun front n'évolue rapidement"],correct:0,expl:"Le front froid remplace rapidement l'air chaud, contrairement au front chaud plus progressif."},
    {q:"Quel signe précurseur annonce typiquement un front chaud ?",opts:["Cirrus qui s'épaississent lentement en stratus","Développement rapide de cumulonimbus","Chute de pression suivie d'une remontée rapide","Absence totale de nuages"],correct:0,expl:"C'est le signe précurseur typique et progressif du front chaud."},
    {q:"Que doit anticiper un officier face à un front froid qui approche ?",opts:["Vent qui fraîchit brusquement et grains possibles","Un temps qui reste identique","Une baisse de température uniquement dans plusieurs jours","Aucun changement notable"],correct:0,expl:"Le front froid provoque des changements rapides et marqués."},
    {q:"Qu'est-ce qu'un front occlus ?",opts:["La combinaison d'un front froid rattrapant un front chaud","Un front qui n'affecte jamais le vent","Une zone de haute pression stable","Un simple changement de température sans front"],correct:0,expl:"L'occlusion combine les caractéristiques des deux fronts."},
    {q:"Un officier observe des cirrus s'épaississant lentement et une pression en baisse régulière depuis 12h. Quel système approche probablement ?",opts:["Un front chaud","Un front froid","Un anticyclone stable","Aucun changement prévisible"],correct:0,expl:"L'évolution lente et progressive est typique du front chaud."},
    {q:"Un développement rapide de nuages convectifs et une chute rapide de pression suggèrent :",opts:["Un front froid","Un front chaud","Un anticyclone","Une masse d'air stable"],correct:0,expl:"C'est le signe rapide et brutal caractéristique du front froid."},
    {q:"Quelle est une erreur fréquente en interprétation météo de niveau officier ?",opts:["Interpréter une observation isolée sans tenir compte de son évolution","Suivre l'évolution de la pression dans le temps","Comparer plusieurs observations simultanées","Anticiper selon le type de front identifié"],correct:0,expl:"Une observation isolée, sans suivi dans le temps, mène à des conclusions erronées."},
    {q:"Après le passage d'un front froid, on observe généralement :",opts:["Une remontée rapide de la pression","Une chute continue de la pression","Aucun changement de pression","Une pression qui reste identique indéfiniment"],correct:0,expl:"La pression remonte rapidement une fois le front froid passé."},
    {q:"Un navire en temps clair et calme voit la pression chuter rapidement et des nuages convectifs se développer en quelques heures. Quel type de front cela suggère-t-il ?",opts:["Un front froid","Un front chaud","Un anticyclone renforcé","Aucun front, simple variation locale"],correct:0,expl:"La rapidité de développement des nuages convectifs et la chute rapide de pression sont typiques d'un front froid."},
  ],
  en:[
    {q:"What is an anticyclone?",opts:["A high-pressure area where air descends and diverges","An unstable low-pressure area","A type of front","Only a cold air mass"],correct:0,expl:"Descending air favors stable weather."},
    {q:"A depression is generally associated with:",opts:["Instability","Stability","Always clear weather","Absence of wind"],correct:0,expl:"Rising, converging air favors instability."},
    {q:"Tightly packed isobars indicate:",opts:["Strong wind","Weak wind","Stable pressure","Clear weather"],correct:0,expl:"A strong pressure gradient produces sustained to violent wind."},
    {q:"A polar air mass is characterized by:",opts:["Cold temperature","Intense heat","Tropical humidity","Warm continental origin"],correct:0,expl:"It retains the cold characteristics of its region of origin."},
    {q:"Why does a polar air mass remain cold far from its region of origin?",opts:["It retains its characteristics until strongly modified","It warms up instantly","It only depends on the season","It always loses its properties quickly"],correct:0,expl:"This is the principle of air mass persistence."},
    {q:"What is a weather front?",opts:["The contact zone between two different air masses","An isolated cloud type","Only a high-pressure area","A measuring instrument"],correct:0,expl:"A front separates two air masses with different characteristics."},
    {q:"Which front generally evolves fastest?",opts:["Cold front","Warm front","Occluded front only at night","No front evolves quickly"],correct:0,expl:"The cold front rapidly replaces warm air, unlike the more gradual warm front."},
    {q:"What early sign typically announces a warm front?",opts:["Cirrus slowly thickening into stratus","Rapid cumulonimbus development","Pressure drop followed by rapid rise","Total absence of clouds"],correct:0,expl:"This is the typical, gradual sign of a warm front."},
    {q:"What must an officer anticipate when a cold front approaches?",opts:["Wind freshening abruptly and possible squalls","Weather remaining identical","A temperature drop only in several days","No notable change"],correct:0,expl:"The cold front causes rapid, marked changes."},
    {q:"What is an occluded front?",opts:["A cold front catching up with a warm front","A front that never affects wind","A stable high-pressure area","A simple temperature change without a front"],correct:0,expl:"Occlusion combines the characteristics of both fronts."},
    {q:"An officer observes cirrus slowly thickening and pressure steadily dropping for 12h. What system is likely approaching?",opts:["A warm front","A cold front","A stable anticyclone","No predictable change"],correct:0,expl:"Slow, gradual evolution is typical of a warm front."},
    {q:"Rapid convective cloud development and a fast pressure drop suggest:",opts:["A cold front","A warm front","An anticyclone","A stable air mass"],correct:0,expl:"This is the fast, abrupt sign characteristic of a cold front."},
    {q:"What is a common mistake in officer-level weather interpretation?",opts:["Interpreting an isolated observation without considering its evolution","Tracking pressure evolution over time","Comparing several simultaneous observations","Anticipating based on the identified front type"],correct:0,expl:"An isolated observation, without tracking over time, leads to wrong conclusions."},
    {q:"After a cold front passes, one generally observes:",opts:["A rapid pressure rise","A continuous pressure drop","No pressure change","Pressure remaining identical indefinitely"],correct:0,expl:"Pressure rises rapidly once the cold front has passed."},
    {q:"A ship in clear calm weather sees pressure drop rapidly and convective clouds develop within hours. What front type does this suggest?",opts:["A cold front","A warm front","A strengthening anticyclone","No front, simple local variation"],correct:0,expl:"The rapid convective cloud development and fast pressure drop are typical of a cold front."},
  ],
  es:[
    {q:"¿Qué es un anticiclón?",opts:["Una zona de alta presión donde el aire desciende y diverge","Una zona de baja presión inestable","Un tipo de frente","Solo una masa de aire frío"],correct:0,expl:"El aire descendente favorece un tiempo estable."},
    {q:"Una depresión se asocia generalmente con:",opts:["La inestabilidad","La estabilidad","Tiempo siempre claro","Ausencia de viento"],correct:0,expl:"El aire ascendente y convergente favorece la inestabilidad."},
    {q:"Isobaras muy juntas indican:",opts:["Viento fuerte","Viento débil","Presión estable","Tiempo claro"],correct:0,expl:"Un gradiente de presión fuerte produce viento sostenido a violento."},
    {q:"Una masa de aire polar se caracteriza por:",opts:["Una temperatura fría","Un calor intenso","Humedad tropical","Origen continental cálido"],correct:0,expl:"Conserva las características frías de su región de origen."},
    {q:"¿Por qué una masa de aire polar permanece fría lejos de su región de origen?",opts:["Conserva sus características mientras no sea fuertemente modificada","Se calienta instantáneamente","Depende solo de la estación","Siempre pierde sus propiedades rápidamente"],correct:0,expl:"Es el principio de persistencia de las masas de aire."},
    {q:"¿Qué es un frente meteorológico?",opts:["La zona de contacto entre dos masas de aire diferentes","Un tipo de nube aislado","Solo una zona de alta presión","Un instrumento de medición"],correct:0,expl:"Un frente separa dos masas de aire con características diferentes."},
    {q:"¿Qué frente evoluciona generalmente más rápido?",opts:["El frente frío","El frente cálido","El frente ocluido solo de noche","Ningún frente evoluciona rápido"],correct:0,expl:"El frente frío reemplaza rápidamente el aire cálido, a diferencia del frente cálido más progresivo."},
    {q:"¿Qué señal precursora anuncia típicamente un frente cálido?",opts:["Cirros que se espesan lentamente en estrato","Desarrollo rápido de cumulonimbos","Caída de presión seguida de subida rápida","Ausencia total de nubes"],correct:0,expl:"Es la señal precursora típica y progresiva del frente cálido."},
    {q:"¿Qué debe anticipar un oficial ante un frente frío que se aproxima?",opts:["Viento que refresca bruscamente y posibles chubascos","Un tiempo que permanece idéntico","Una bajada de temperatura solo en varios días","Ningún cambio notable"],correct:0,expl:"El frente frío provoca cambios rápidos y marcados."},
    {q:"¿Qué es un frente ocluido?",opts:["Un frente frío que alcanza a un frente cálido","Un frente que nunca afecta al viento","Una zona de alta presión estable","Un simple cambio de temperatura sin frente"],correct:0,expl:"La oclusión combina las características de ambos frentes."},
    {q:"Un oficial observa cirros que se espesan lentamente y presión bajando regularmente desde hace 12h. ¿Qué sistema se aproxima probablemente?",opts:["Un frente cálido","Un frente frío","Un anticiclón estable","Ningún cambio previsible"],correct:0,expl:"La evolución lenta y progresiva es típica del frente cálido."},
    {q:"Un desarrollo rápido de nubes convectivas y una caída rápida de presión sugieren:",opts:["Un frente frío","Un frente cálido","Un anticiclón","Una masa de aire estable"],correct:0,expl:"Es la señal rápida y brusca característica del frente frío."},
    {q:"¿Cuál es un error frecuente en la interpretación meteorológica de nivel oficial?",opts:["Interpretar una observación aislada sin considerar su evolución","Seguir la evolución de la presión en el tiempo","Comparar varias observaciones simultáneas","Anticipar según el tipo de frente identificado"],correct:0,expl:"Una observación aislada, sin seguimiento en el tiempo, lleva a conclusiones erróneas."},
    {q:"Tras el paso de un frente frío, se observa generalmente:",opts:["Una subida rápida de la presión","Una caída continua de la presión","Ningún cambio de presión","Una presión que permanece idéntica indefinidamente"],correct:0,expl:"La presión sube rápidamente una vez pasado el frente frío."},
    {q:"Un buque con tiempo claro y calmado ve la presión caer rápidamente y nubes convectivas desarrollarse en pocas horas. ¿Qué tipo de frente sugiere esto?",opts:["Un frente frío","Un frente cálido","Un anticiclón reforzado","Ningún frente, simple variación local"],correct:0,expl:"El rápido desarrollo de nubes convectivas y la caída rápida de presión son típicos de un frente frío."},
  ],
  pt:[
    {q:"O que é um anticiclone?",opts:["Uma zona de alta pressão onde o ar desce e diverge","Uma zona de baixa pressão instável","Um tipo de frente","Apenas uma massa de ar frio"],correct:0,expl:"O ar descendente favorece um tempo estável."},
    {q:"Uma depressão está geralmente associada a:",opts:["A instabilidade","A estabilidade","Tempo sempre limpo","Ausência de vento"],correct:0,expl:"O ar ascendente e convergente favorece a instabilidade."},
    {q:"Isóbaras muito próximas indicam:",opts:["Vento forte","Vento fraco","Pressão estável","Tempo limpo"],correct:0,expl:"Um gradiente de pressão forte produz vento sustentado a violento."},
    {q:"Uma massa de ar polar caracteriza-se por:",opts:["Uma temperatura fria","Um calor intenso","Humidade tropical","Origem continental quente"],correct:0,expl:"Conserva as características frias da sua região de origem."},
    {q:"Por que uma massa de ar polar permanece fria longe da sua região de origem?",opts:["Conserva as suas características enquanto não for fortemente modificada","Aquece-se instantaneamente","Depende apenas da estação","Perde sempre as suas propriedades rapidamente"],correct:0,expl:"É o princípio de persistência das massas de ar."},
    {q:"O que é uma frente meteorológica?",opts:["A zona de contacto entre duas massas de ar diferentes","Um tipo de nuvem isolado","Apenas uma zona de alta pressão","Um instrumento de medição"],correct:0,expl:"Uma frente separa duas massas de ar com características diferentes."},
    {q:"Que frente evolui geralmente mais rápido?",opts:["A frente fria","A frente quente","A frente oclusa apenas à noite","Nenhuma frente evolui rapidamente"],correct:0,expl:"A frente fria substitui rapidamente o ar quente, ao contrário da frente quente mais progressiva."},
    {q:"Que sinal precursor anuncia tipicamente uma frente quente?",opts:["Cirros que engrossam lentamente em estrato","Desenvolvimento rápido de cumulonimbos","Queda de pressão seguida de subida rápida","Ausência total de nuvens"],correct:0,expl:"É o sinal precursor típico e progressivo da frente quente."},
    {q:"O que deve um oficial antecipar perante uma frente fria que se aproxima?",opts:["Vento que refresca bruscamente e possíveis borrascas","Um tempo que permanece idêntico","Uma descida de temperatura apenas em vários dias","Nenhuma mudança notável"],correct:0,expl:"A frente fria provoca mudanças rápidas e marcadas."},
    {q:"O que é uma frente oclusa?",opts:["Uma frente fria que alcança uma frente quente","Uma frente que nunca afeta o vento","Uma zona de alta pressão estável","Uma simples mudança de temperatura sem frente"],correct:0,expl:"A oclusão combina as características de ambas as frentes."},
    {q:"Um oficial observa cirros a engrossar lentamente e pressão a descer regularmente há 12h. Que sistema se aproxima provavelmente?",opts:["Uma frente quente","Uma frente fria","Um anticiclone estável","Nenhuma mudança previsível"],correct:0,expl:"A evolução lenta e progressiva é típica da frente quente."},
    {q:"Um desenvolvimento rápido de nuvens convectivas e uma queda rápida de pressão sugerem:",opts:["Uma frente fria","Uma frente quente","Um anticiclone","Uma massa de ar estável"],correct:0,expl:"É o sinal rápido e brusco característico da frente fria."},
    {q:"Qual é um erro frequente na interpretação meteorológica de nível oficial?",opts:["Interpretar uma observação isolada sem considerar a sua evolução","Seguir a evolução da pressão no tempo","Comparar várias observações simultâneas","Antecipar consoante o tipo de frente identificado"],correct:0,expl:"Uma observação isolada, sem acompanhamento no tempo, leva a conclusões erradas."},
    {q:"Após a passagem de uma frente fria, observa-se geralmente:",opts:["Uma subida rápida da pressão","Uma queda contínua da pressão","Nenhuma mudança de pressão","Uma pressão que permanece idêntica indefinidamente"],correct:0,expl:"A pressão sobe rapidamente uma vez passada a frente fria."},
    {q:"Um navio com tempo limpo e calmo vê a pressão cair rapidamente e nuvens convectivas desenvolverem-se em poucas horas. Que tipo de frente isto sugere?",opts:["Uma frente fria","Uma frente quente","Um anticiclone reforçado","Nenhuma frente, simples variação local"],correct:0,expl:"O rápido desenvolvimento de nuvens convectivas e a queda rápida de pressão são típicos de uma frente fria."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS) — reprend Q1, Q6, Q7, Q11, Q15 de la banque
const QUIZ = {
  fr:[BANK.fr[0], BANK.fr[5], BANK.fr[6], BANK.fr[10], BANK.fr[14]],
  en:[BANK.en[0], BANK.en[5], BANK.en[6], BANK.en[10], BANK.en[14]],
  es:[BANK.es[0], BANK.es[5], BANK.es[6], BANK.es[10], BANK.es[14]],
  pt:[BANK.pt[0], BANK.pt[5], BANK.pt[6], BANK.pt[10], BANK.pt[14]],
};

// TEXT CONTENT
const getContent = lang => {
  const d = {
    fr:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Leçon 4/7",
      title:"Systèmes de pression, masses d'air et fronts",
      intro:"Jusqu'à présent, vous avez appris à comprendre, observer et mesurer les phénomènes météorologiques. Cette première leçon de niveau officier vous apprend à interpréter ces observations afin d'anticiper l'évolution du temps et de préparer les décisions de navigation.",
      p0:"UN SYSTÈME MÉTÉO NE SE LIT JAMAIS ISOLÉMENT. C'EST SON ÉVOLUTION QUI RACONTE L'HISTOIRE.",s0t:"Systèmes de pression, masses d'air et fronts",
      s0:"Interpréter les grands systèmes météorologiques pour anticiper l'évolution du temps, au-delà de la simple observation ponctuelle.",
      p1:"Anticyclones et dépressions",
      s1:"Un anticyclone est une zone de haute pression où l'air descend et diverge (mouvement de divergence), généralement associée à un temps stable et calme. Une dépression est une zone de basse pression où l'air monte et converge (mouvement de convergence), généralement associée à l'instabilité.\n\nCette opposition stabilité/instabilité est la clé de lecture de tout système météo : un anticyclone favorise la stabilité, une dépression favorise l'instabilité et le développement de perturbations.",
      p2:"Isobares et structure du système",
      s2:"Les isobares relient les points de même pression sur une carte météo. Des isobares espacées indiquent un gradient de pression faible et donc un vent modéré ; des isobares resserrées indiquent un gradient fort et donc un vent soutenu à violent.\n\nLa forme et l'espacement des isobares permettent d'anticiper visuellement l'intensité du vent avant même de le mesurer.",
      p3:"Masses d'air",
      s3:"Une masse d'air est un vaste volume d'atmosphère aux caractéristiques homogènes de température et d'humidité, qui prend l'origine de la région où elle s'est formée : polaire (froide), tropicale (chaude), maritime (humide) ou continentale (sèche).\n\nLes masses d'air conservent les caractéristiques de leur région d'origine tant qu'elles ne sont pas fortement modifiées — c'est pourquoi une masse d'air polaire reste froide plusieurs centaines de kilomètres après avoir quitté sa région source.",
      p4:"Fronts : chaud, froid et occlus",
      s4:"Un front est la zone de contact entre deux masses d'air aux caractéristiques différentes.\n\nFront chaud : l'air chaud remplace progressivement l'air froid. Signes précurseurs : cirrus qui s'épaississent lentement en stratus sur plusieurs heures, pression en baisse lente et régulière, précipitations continues et modérées. Ce que l'officier doit anticiper : dégradation progressive, visibilité qui se réduit graduellement, temps qui se stabilise après le passage.\n\nFront froid : l'air froid remplace rapidement l'air chaud. Signes précurseurs : développement rapide de nuages convectifs, chute de pression suivie d'une remontée rapide après passage. Ce que l'officier doit anticiper : vent qui fraîchit brusquement, grains possibles, visibilité réduite temporairement, mer qui devient rapidement plus forte.\n\nFront occlus : combinaison des deux précédents lorsque le front froid rattrape le front chaud. Ce que l'officier doit anticiper : succession rapide des caractéristiques des deux types de front, vigilance renforcée car l'évolution peut être moins prévisible.",
      p5:"🎯 Exercice : lire un système en développement",
      s5:"Vous êtes OOW. Vous observez simultanément : des cirrus qui s'épaississent progressivement en stratus depuis plusieurs heures, une pression en baisse lente et régulière depuis 12 heures, un vent qui vire progressivement de direction.\n\nQuel type de front approche selon ces observations combinées ? Quelle séquence d'évolution du temps devez-vous anticiper dans les heures suivantes ?",
      p6:"🧭 Étude de cas",
      p7:"Un navire en transit connaît une période de temps clair et calme. En quelques heures, la pression chute rapidement et des nuages convectifs se développent rapidement, aboutissant à un ciel fortement chargé.\n\nQuel type de front cela suggère-t-il, par opposition au scénario de l'exercice précédent ? Quelle différence pratique cela implique-t-il pour la préparation du navire (vitesse, cap, sécurisation du pont) ?",
      p8:"📋 Banque de 15 questions",
      p9:"💭 À retenir : les erreurs fréquentes",
      s9:"Confondre front chaud et front froid par leur vitesse d'évolution. Ignorer un changement progressif de direction du vent. Ne pas relier l'observation des nuages à l'évolution de la pression. Croire qu'un système reste stable sans suivi dans le temps. Interpréter une observation isolée sans tenir compte de son évolution.",
      sumT:"Résumé — Leçon 4",
      sumP:["Un anticyclone favorise la stabilité, une dépression l'instabilité","Des isobares resserrées annoncent un vent plus fort","Une masse d'air garde les caractéristiques de son origine","Un front froid évolue plus vite et plus violemment qu'un front chaud","Un système se lit dans son évolution, jamais isolément"],
      learnedP:["Distinction anticyclone/dépression","Lecture des isobares","Origine et persistance des masses d'air","Reconnaissance des trois types de front et de leurs effets"],
      transition:"Dans la prochaine leçon, vous découvrirez les phénomènes météorologiques tropicaux et dangereux : cyclones, orages violents, grains et trombes marines.",
      safetyMsg:"Un système météo ne se lit jamais isolément. C'est son évolution qui raconte l'histoire.",
      finalLabel:"MESSAGE CLÉ",
    },
    en:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Lesson 4/7",
      title:"Pressure Systems, Air Masses and Fronts",
      intro:"So far, you have learned to understand, observe, and measure weather phenomena. This first officer-level lesson teaches you to interpret these observations in order to anticipate weather evolution and prepare navigation decisions.",
      p0:"A WEATHER SYSTEM IS NEVER READ IN ISOLATION. ITS EVOLUTION TELLS THE STORY.",s0t:"Pressure Systems, Air Masses and Fronts",
      s0:"Interpreting major weather systems to anticipate weather evolution, beyond simple point-in-time observation.",
      p1:"Anticyclones and Depressions",
      s1:"An anticyclone is a high-pressure area where air descends and diverges, generally associated with stable, calm weather. A depression is a low-pressure area where air rises and converges, generally associated with instability.\n\nThis stability/instability opposition is the key to reading any weather system: an anticyclone favors stability, a depression favors instability and the development of disturbances.",
      p2:"Isobars and System Structure",
      s2:"Isobars connect points of equal pressure on a weather chart. Widely spaced isobars indicate a weak pressure gradient and thus moderate wind; tightly packed isobars indicate a strong gradient and thus strong to violent wind.\n\nThe shape and spacing of isobars allow the intensity of wind to be anticipated visually, even before measuring it.",
      p3:"Air Masses",
      s3:"An air mass is a vast volume of atmosphere with homogeneous temperature and humidity characteristics, originating from the region where it formed: polar (cold), tropical (warm), maritime (humid), or continental (dry).\n\nAir masses retain the characteristics of their region of origin until strongly modified — this is why a polar air mass remains cold hundreds of kilometers after leaving its source region.",
      p4:"Fronts: Warm, Cold and Occluded",
      s4:"A front is the contact zone between two air masses with different characteristics.\n\nWarm front: warm air progressively replaces cold air. Early signs: cirrus slowly thickening into stratus over several hours, slow steady pressure drop, continuous moderate precipitation. What the officer must anticipate: gradual deterioration, visibility that reduces gradually, weather that stabilizes after passage.\n\nCold front: cold air rapidly replaces warm air. Early signs: rapid development of convective clouds, pressure drop followed by rapid rise after passage. What the officer must anticipate: wind that freshens abruptly, possible squalls, temporarily reduced visibility, sea that rapidly becomes rougher.\n\nOccluded front: combination of the two previous types when a cold front catches up with a warm front. What the officer must anticipate: rapid succession of characteristics from both front types, heightened vigilance as evolution can be less predictable.",
      p5:"🎯 Exercise: Reading a Developing System",
      s5:"You are OOW. You simultaneously observe: cirrus gradually thickening into stratus over several hours, pressure slowly and steadily dropping for 12 hours, wind gradually veering direction.\n\nWhat type of front is approaching based on these combined observations? What sequence of weather evolution should you anticipate in the following hours?",
      p6:"🧭 Case Study",
      p7:"A ship in transit experiences a period of clear, calm weather. Within a few hours, pressure drops rapidly and convective clouds develop quickly, resulting in a heavily overcast sky.\n\nWhat type of front does this suggest, as opposed to the previous exercise scenario? What practical difference does this imply for ship preparation (speed, course, securing the deck)?",
      p8:"📋 15-Question Bank",
      p9:"💭 Remember: Common Mistakes",
      s9:"Confusing warm and cold fronts by their speed of evolution. Ignoring a gradual change in wind direction. Not linking cloud observation to pressure evolution. Believing a system remains stable without tracking over time. Interpreting an isolated observation without considering its evolution.",
      sumT:"Summary — Lesson 4",
      sumP:["An anticyclone favors stability, a depression favors instability","Tightly packed isobars signal stronger wind","An air mass retains the characteristics of its origin","A cold front evolves faster and more violently than a warm front","A system is read through its evolution, never in isolation"],
      learnedP:["Distinguishing anticyclones from depressions","Reading isobars","Origin and persistence of air masses","Recognizing the three front types and their effects"],
      transition:"In the next lesson, you will discover tropical and dangerous weather phenomena: cyclones, violent storms, squalls, and waterspouts.",
      safetyMsg:"A weather system is never read in isolation. Its evolution tells the story.",
      finalLabel:"KEY MESSAGE",
    },
    es:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Lección 4/7",
      title:"Sistemas de presión, masas de aire y frentes",
      intro:"Hasta ahora, has aprendido a comprender, observar y medir los fenómenos meteorológicos. Esta primera lección de nivel oficial te enseña a interpretar estas observaciones para anticipar la evolución del tiempo y preparar las decisiones de navegación.",
      p0:"UN SISTEMA METEOROLÓGICO NUNCA SE LEE AISLADAMENTE. SU EVOLUCIÓN CUENTA LA HISTORIA.",s0t:"Sistemas de presión, masas de aire y frentes",
      s0:"Interpretar los grandes sistemas meteorológicos para anticipar la evolución del tiempo, más allá de la simple observación puntual.",
      p1:"Anticiclones y depresiones",
      s1:"Un anticiclón es una zona de alta presión donde el aire desciende y diverge, generalmente asociada a un tiempo estable y calmado. Una depresión es una zona de baja presión donde el aire sube y converge, generalmente asociada a la inestabilidad.\n\nEsta oposición estabilidad/inestabilidad es la clave para leer cualquier sistema meteorológico: un anticiclón favorece la estabilidad, una depresión favorece la inestabilidad y el desarrollo de perturbaciones.",
      p2:"Isobaras y estructura del sistema",
      s2:"Las isobaras unen los puntos de igual presión en una carta meteorológica. Isobaras muy espaciadas indican un gradiente de presión débil y por tanto viento moderado; isobaras muy juntas indican un gradiente fuerte y por tanto viento sostenido a violento.\n\nLa forma y el espaciado de las isobaras permiten anticipar visualmente la intensidad del viento incluso antes de medirlo.",
      p3:"Masas de aire",
      s3:"Una masa de aire es un vasto volumen de atmósfera con características homogéneas de temperatura y humedad, que se origina en la región donde se formó: polar (fría), tropical (cálida), marítima (húmeda) o continental (seca).\n\nLas masas de aire conservan las características de su región de origen mientras no sean fuertemente modificadas — por eso una masa de aire polar sigue siendo fría varios cientos de kilómetros después de abandonar su región de origen.",
      p4:"Frentes: cálido, frío y ocluido",
      s4:"Un frente es la zona de contacto entre dos masas de aire con características diferentes.\n\nFrente cálido: el aire cálido reemplaza progresivamente al aire frío. Señales precursoras: cirros que se espesan lentamente en estrato durante varias horas, caída de presión lenta y regular, precipitaciones continuas y moderadas. Lo que el oficial debe anticipar: deterioro progresivo, visibilidad que se reduce gradualmente, tiempo que se estabiliza tras el paso.\n\nFrente frío: el aire frío reemplaza rápidamente al aire cálido. Señales precursoras: desarrollo rápido de nubes convectivas, caída de presión seguida de una subida rápida tras el paso. Lo que el oficial debe anticipar: viento que refresca bruscamente, posibles chubascos, visibilidad reducida temporalmente, mar que se vuelve rápidamente más fuerte.\n\nFrente ocluido: combinación de los dos anteriores cuando el frente frío alcanza al frente cálido. Lo que el oficial debe anticipar: sucesión rápida de características de ambos tipos de frente, vigilancia reforzada porque la evolución puede ser menos previsible.",
      p5:"🎯 Ejercicio: leer un sistema en desarrollo",
      s5:"Eres OOW. Observas simultáneamente: cirros que se espesan progresivamente en estrato desde hace varias horas, presión bajando lenta y regularmente desde hace 12 horas, viento que vira progresivamente de dirección.\n\n¿Qué tipo de frente se aproxima según estas observaciones combinadas? ¿Qué secuencia de evolución del tiempo debes anticipar en las próximas horas?",
      p6:"🧭 Estudio de caso",
      p7:"Un buque en tránsito conoce un período de tiempo claro y calmado. En pocas horas, la presión cae rápidamente y se desarrollan rápidamente nubes convectivas, resultando en un cielo fuertemente cargado.\n\n¿Qué tipo de frente sugiere esto, en contraste con el escenario del ejercicio anterior? ¿Qué diferencia práctica implica esto para la preparación del buque (velocidad, rumbo, aseguramiento de cubierta)?",
      p8:"📋 Banco de 15 preguntas",
      p9:"💭 Recuerda: errores frecuentes",
      s9:"Confundir frente cálido y frente frío por su velocidad de evolución. Ignorar un cambio progresivo de dirección del viento. No relacionar la observación de nubes con la evolución de la presión. Creer que un sistema permanece estable sin seguimiento en el tiempo. Interpretar una observación aislada sin considerar su evolución.",
      sumT:"Resumen — Lección 4",
      sumP:["Un anticiclón favorece la estabilidad, una depresión la inestabilidad","Isobaras muy juntas anuncian viento más fuerte","Una masa de aire conserva las características de su origen","Un frente frío evoluciona más rápido y violentamente que uno cálido","Un sistema se lee en su evolución, nunca aisladamente"],
      learnedP:["Distinción anticiclón/depresión","Lectura de isobaras","Origen y persistencia de las masas de aire","Reconocimiento de los tres tipos de frente y sus efectos"],
      transition:"En la próxima lección, descubrirás los fenómenos meteorológicos tropicales y peligrosos: ciclones, tormentas violentas, chubascos y trombas marinas.",
      safetyMsg:"Un sistema meteorológico nunca se lee aisladamente. Su evolución cuenta la historia.",
      finalLabel:"MENSAJE CLAVE",
    },
    pt:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Lição 4/7",
      title:"Sistemas de pressão, massas de ar e frentes",
      intro:"Até agora, aprendeste a compreender, observar e medir os fenómenos meteorológicos. Esta primeira lição de nível oficial ensina-te a interpretar estas observações para antecipar a evolução do tempo e preparar as decisões de navegação.",
      p0:"UM SISTEMA METEOROLÓGICO NUNCA SE LÊ ISOLADAMENTE. A SUA EVOLUÇÃO CONTA A HISTÓRIA.",s0t:"Sistemas de pressão, massas de ar e frentes",
      s0:"Interpretar os grandes sistemas meteorológicos para antecipar a evolução do tempo, para além da simples observação pontual.",
      p1:"Anticiclones e depressões",
      s1:"Um anticiclone é uma zona de alta pressão onde o ar desce e diverge, geralmente associada a um tempo estável e calmo. Uma depressão é uma zona de baixa pressão onde o ar sobe e converge, geralmente associada à instabilidade.\n\nEsta oposição estabilidade/instabilidade é a chave para ler qualquer sistema meteorológico: um anticiclone favorece a estabilidade, uma depressão favorece a instabilidade e o desenvolvimento de perturbações.",
      p2:"Isóbaras e estrutura do sistema",
      s2:"As isóbaras unem os pontos de igual pressão numa carta meteorológica. Isóbaras muito espaçadas indicam um gradiente de pressão fraco e portanto vento moderado; isóbaras muito próximas indicam um gradiente forte e portanto vento sustentado a violento.\n\nA forma e o espaçamento das isóbaras permitem antecipar visualmente a intensidade do vento mesmo antes de o medir.",
      p3:"Massas de ar",
      s3:"Uma massa de ar é um vasto volume de atmosfera com características homogéneas de temperatura e humidade, que tem origem na região onde se formou: polar (fria), tropical (quente), marítima (húmida) ou continental (seca).\n\nAs massas de ar conservam as características da sua região de origem enquanto não forem fortemente modificadas — por isso uma massa de ar polar permanece fria várias centenas de quilómetros após deixar a sua região de origem.",
      p4:"Frentes: quente, fria e oclusa",
      s4:"Uma frente é a zona de contacto entre duas massas de ar com características diferentes.\n\nFrente quente: o ar quente substitui progressivamente o ar frio. Sinais precursores: cirros que engrossam lentamente em estrato ao longo de várias horas, queda de pressão lenta e regular, precipitações contínuas e moderadas. O que o oficial deve antecipar: deterioração progressiva, visibilidade que se reduz gradualmente, tempo que estabiliza após a passagem.\n\nFrente fria: o ar frio substitui rapidamente o ar quente. Sinais precursores: desenvolvimento rápido de nuvens convectivas, queda de pressão seguida de subida rápida após a passagem. O que o oficial deve antecipar: vento que refresca bruscamente, possíveis borrascas, visibilidade reduzida temporariamente, mar que se torna rapidamente mais forte.\n\nFrente oclusa: combinação das duas anteriores quando a frente fria alcança a frente quente. O que o oficial deve antecipar: sucessão rápida de características dos dois tipos de frente, vigilância reforçada porque a evolução pode ser menos previsível.",
      p5:"🎯 Exercício: ler um sistema em desenvolvimento",
      s5:"És OOW. Observas simultaneamente: cirros que engrossam progressivamente em estrato há várias horas, pressão a descer lenta e regularmente há 12 horas, vento que vira progressivamente de direção.\n\nQue tipo de frente se aproxima segundo estas observações combinadas? Que sequência de evolução do tempo deves antecipar nas próximas horas?",
      p6:"🧭 Estudo de caso",
      p7:"Um navio em trânsito atravessa um período de tempo limpo e calmo. Em poucas horas, a pressão cai rapidamente e desenvolvem-se rapidamente nuvens convectivas, resultando num céu fortemente carregado.\n\nQue tipo de frente isto sugere, em contraste com o cenário do exercício anterior? Que diferença prática isto implica para a preparação do navio (velocidade, rumo, fixação do convés)?",
      p8:"📋 Banco de 15 perguntas",
      p9:"💭 Lembrar: erros frequentes",
      s9:"Confundir frente quente e frente fria pela sua velocidade de evolução. Ignorar uma mudança progressiva de direção do vento. Não relacionar a observação de nuvens com a evolução da pressão. Acreditar que um sistema permanece estável sem acompanhamento no tempo. Interpretar uma observação isolada sem considerar a sua evolução.",
      sumT:"Resumo — Lição 4",
      sumP:["Um anticiclone favorece a estabilidade, uma depressão a instabilidade","Isóbaras muito próximas anunciam vento mais forte","Uma massa de ar conserva as características da sua origem","Uma frente fria evolui mais rápido e violentamente do que uma frente quente","Um sistema lê-se na sua evolução, nunca isoladamente"],
      learnedP:["Distinção anticiclone/depressão","Leitura de isóbaras","Origem e persistência das massas de ar","Reconhecimento dos três tipos de frente e dos seus efeitos"],
      transition:"Na próxima lição, vais descobrir os fenómenos meteorológicos tropicais e perigosos: ciclones, tempestades violentas, borrascas e trombas marítimas.",
      safetyMsg:"Um sistema meteorológico nunca se lê isoladamente. A sua evolução conta a história.",
      finalLabel:"MENSAGEM-CHAVE",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonMETEO_L4({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, onQuizScored=(score:number,maxScore:number)=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 4/7":lang==="en"?"Lesson 4/7":lang==="es"?"Lección 4/7":"Lição 4/7"}</div>
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

            <SL icon="🌐" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>

            <SL icon="📊" text={lc.p2} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><IsobarsSVG lang={lang}/></Card>

            <SL icon="🗺️" text={lc.p3} color={C.orange}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>

            <SL icon="⚔️" text={lc.p4} color={C.red}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><FrontSymbolsSVG lang={lang}/></Card>

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
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 4/7":"questions · Lesson 4/7"}</div>
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
              {lang==="fr"?"LEÇON 5 - PHÉNOMÈNES DANGEREUX →":lang==="en"?"LESSON 5 - DANGEROUS PHENOMENA →":lang==="es"?"LECCIÓN 5 - FENÓMENOS PELIGROSOS →":"LIÇÃO 5 - FENÓMENOS PERIGOSOS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
