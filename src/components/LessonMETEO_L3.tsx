// @ts-nocheck
import { useState, useEffect } from "react";
import { C, T, Stars, Card, SL, QuizComp, QuestionBank } from "./LessonShared";

// LessonShared's T.module is hardcoded to Safety ("Sécurité"/"Safety"/...) — override per department.
const MODULE_LABEL = { fr:"Météorologie", en:"Meteorology", es:"Meteorología", pt:"Meteorologia" };

// SVG — BAROMETER / BAROGRAPH, interactive (click/tap, LessonE2_L5.tsx
// pattern). Two clickable parts matching s1's two named instruments —
// no third part invented.
function BarometerSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const L = {
    fr:{ dial:"Baromètre anéroïde", trace:"Barographe",
      dialDesc:"Mesure la pression atmosphérique en hectopascals (hPa).",
      traceDesc:"Enregistre en continu l'évolution de la pression sur un cylindre rotatif. La tendance (hausse, baisse, stable) est plus importante que la valeur absolue.",
      hint:"Touche un instrument" },
    en:{ dial:"Aneroid barometer", trace:"Barograph",
      dialDesc:"Measures atmospheric pressure in hectopascals (hPa).",
      traceDesc:"Continuously records pressure evolution on a rotating cylinder. The trend (rising, falling, stable) matters more than the absolute value.",
      hint:"Tap an instrument" },
    es:{ dial:"Barómetro aneroide", trace:"Barógrafo",
      dialDesc:"Mide la presión atmosférica en hectopascales (hPa).",
      traceDesc:"Registra continuamente la evolución de la presión en un cilindro rotatorio. La tendencia (subida, bajada, estable) importa más que el valor absoluto.",
      hint:"Toca un instrumento" },
    pt:{ dial:"Barómetro aneroide", trace:"Barógrafo",
      dialDesc:"Mede a pressão atmosférica em hectopascais (hPa).",
      traceDesc:"Regista continuamente a evolução da pressão num cilindro rotativo. A tendência (subida, descida, estável) importa mais do que o valor absoluto.",
      hint:"Toque num instrumento" },
  }[lang] || {
    dial:"Baromètre anéroïde", trace:"Barographe",
    dialDesc:"Mesure la pression atmosphérique en hectopascals (hPa).",
    traceDesc:"Enregistre en continu l'évolution de la pression sur un cylindre rotatif. La tendance (hausse, baisse, stable) est plus importante que la valeur absolue.",
    hint:"Touche un instrument",
  };
  const parts = { dial:{ name:L.dial, desc:L.dialDesc, color:C.gold2 }, trace:{ name:L.trace, desc:L.traceDesc, color:C.teal } };
  const toggle=(k)=>setSel(sel===k?null:k);
  return (
    <div>
      <svg width="100%" height="150" viewBox="0 0 220 150">
        <rect width="220" height="150" fill="#061020" rx="8"/>
        {/* dial */}
        <g onClick={()=>toggle("dial")} style={{cursor:"pointer"}}>
          <circle cx="60" cy="75" r="46" fill="none" stroke={sel==="dial"?parts.dial.color:"rgba(255,255,255,0.25)"} strokeWidth={sel==="dial"?3:1.5}/>
          <circle cx="60" cy="75" r="46" fill={parts.dial.color} opacity={sel==="dial"?0.18:0.06}/>
          {[...Array(12)].map((_,i)=>{
            const a=(i/12)*2*Math.PI; const x1=60+38*Math.sin(a),y1=75-38*Math.cos(a),x2=60+44*Math.sin(a),y2=75-44*Math.cos(a);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(240,244,255,0.4)" strokeWidth="1"/>;
          })}
          <line x1="60" y1="75" x2="80" y2="52" stroke={parts.dial.color} strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="60" cy="75" r="4" fill={parts.dial.color}/>
          <text x="60" y="128" fontSize="9" fontWeight="700" fill={parts.dial.color} textAnchor="middle">{L.dial}</text>
        </g>
        {/* barograph trace */}
        <g onClick={()=>toggle("trace")} style={{cursor:"pointer"}}>
          <rect x="128" y="30" width="80" height="90" rx="6" fill={parts.trace.color} opacity={sel==="trace"?0.18:0.06} stroke={sel==="trace"?parts.trace.color:"rgba(255,255,255,0.25)"} strokeWidth={sel==="trace"?3:1.5}/>
          <path d="M136,55 Q150,45 160,60 T184,58 T200,75" fill="none" stroke={parts.trace.color} strokeWidth="2"/>
          {[0,1,2,3].map(i=>(<line key={i} x1={136+i*18} y1="34" x2={136+i*18} y2="116" stroke="rgba(240,244,255,0.15)" strokeWidth="1"/>))}
          <text x="168" y="128" fontSize="9" fontWeight="700" fill={parts.trace.color} textAnchor="middle">{L.trace}</text>
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

// SVG — ANEMOMETER / WIND VANE, interactive (click/tap). Two clickable
// parts matching s3's two named instruments.
function AnemometerSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const L = {
    fr:{ cups:"Anémomètre", vane:"Girouette",
      cupsDesc:"Mesure la vitesse du vent.",
      vaneDesc:"Mesure la direction du vent. Le cap suivi et la vitesse du navire modifient directement la lecture de ces deux instruments — il faut toujours distinguer le vent réel du vent apparent.",
      hint:"Touche un instrument" },
    en:{ cups:"Anemometer", vane:"Wind vane",
      cupsDesc:"Measures wind speed.",
      vaneDesc:"Measures wind direction. The ship's course and speed directly change the reading of both instruments — true wind must always be distinguished from apparent wind.",
      hint:"Tap an instrument" },
    es:{ cups:"Anemómetro", vane:"Veleta",
      cupsDesc:"Mide la velocidad del viento.",
      vaneDesc:"Mide la dirección del viento. El rumbo y la velocidad del buque modifican directamente la lectura de ambos instrumentos — siempre hay que distinguir el viento real del viento aparente.",
      hint:"Toca un instrumento" },
    pt:{ cups:"Anemómetro", vane:"Cata-vento",
      cupsDesc:"Mede a velocidade do vento.",
      vaneDesc:"Mede a direção do vento. O rumo e a velocidade do navio modificam diretamente a leitura de ambos os instrumentos — é preciso sempre distinguir o vento real do vento aparente.",
      hint:"Toque num instrumento" },
  }[lang] || {
    cups:"Anémomètre", vane:"Girouette",
    cupsDesc:"Mesure la vitesse du vent.",
    vaneDesc:"Mesure la direction du vent. Le cap suivi et la vitesse du navire modifient directement la lecture de ces deux instruments — il faut toujours distinguer le vent réel du vent apparent.",
    hint:"Touche un instrument",
  };
  const parts = { cups:{ name:L.cups, desc:L.cupsDesc, color:C.blue2 }, vane:{ name:L.vane, desc:L.vaneDesc, color:C.orange } };
  const toggle=(k)=>setSel(sel===k?null:k);
  return (
    <div>
      <svg width="100%" height="150" viewBox="0 0 220 150">
        <rect width="220" height="150" fill="#061020" rx="8"/>
        {/* anemometer cups */}
        <g onClick={()=>toggle("cups")} style={{cursor:"pointer"}}>
          <line x1="60" y1="120" x2="60" y2="60" stroke="rgba(240,244,255,0.3)" strokeWidth="2"/>
          {[0,120,240].map((deg,i)=>{
            const a=deg*Math.PI/180; const x=60+24*Math.sin(a), y=48-24*Math.cos(a);
            return <g key={i}><line x1="60" y1="48" x2={x} y2={y} stroke={parts.cups.color} strokeWidth="1.5" opacity={sel==="cups"?1:0.6}/><circle cx={x} cy={y} r="7" fill={parts.cups.color} opacity={sel==="cups"?0.9:0.4}/></g>;
          })}
          <circle cx="60" cy="48" r="34" fill={parts.cups.color} opacity={sel==="cups"?0.12:0.08}
            stroke={sel==="cups"?parts.cups.color:"transparent"} strokeWidth="2" strokeDasharray="3,3"/>
          <text x="60" y="128" fontSize="9" fontWeight="700" fill={parts.cups.color} textAnchor="middle">{L.cups}</text>
        </g>
        {/* wind vane */}
        <g onClick={()=>toggle("vane")} style={{cursor:"pointer"}}>
          <line x1="160" y1="120" x2="160" y2="60" stroke="rgba(240,244,255,0.3)" strokeWidth="2"/>
          <polygon points="160,38 172,58 160,52 148,58" fill={parts.vane.color} opacity={sel==="vane"?0.95:0.55}/>
          <circle cx="160" cy="58" r="30" fill={parts.vane.color} opacity={sel==="vane"?0.12:0.08}
            stroke={sel==="vane"?parts.vane.color:"transparent"} strokeWidth="2" strokeDasharray="3,3"/>
          <text x="160" y="128" fontSize="9" fontWeight="700" fill={parts.vane.color} textAnchor="middle">{L.vane}</text>
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
    {q:"Que mesure un baromètre anéroïde ?",opts:["La pression atmosphérique","La température","La vitesse du vent","L'humidité"],correct:0,expl:"Il mesure la pression en hectopascals."},
    {q:"Qu'enregistre un barographe ?",opts:["L'évolution continue de la pression","La direction du vent uniquement","La température de la mer","L'humidité relative"],correct:0,expl:"Il trace en continu sur un cylindre rotatif."},
    {q:"Qu'est-ce qui compte le plus dans la lecture du baromètre ?",opts:["La tendance de variation","La couleur du cadran","L'heure de fabrication","La marque de l'instrument"],correct:0,expl:"Une chute rapide est plus préoccupante qu'une valeur stable même basse."},
    {q:"Que mesure un hygromètre ?",opts:["L'humidité relative","La pression","La vitesse du vent","La température de la mer"],correct:0,expl:"Il mesure le taux d'humidité de l'air."},
    {q:"Une forte différence entre température de l'air et de la mer peut favoriser :",opts:["Certaines conditions de brouillard","Une absence totale de vent","Une hausse de pression garantie","Rien de particulier"],correct:0,expl:"Selon les masses d'air, cet écart favorise la condensation."},
    {q:"Que mesure un anémomètre ?",opts:["La vitesse du vent","La pression","L'humidité","La température"],correct:0,expl:"Il mesure la vitesse du vent, la girouette sa direction."},
    {q:"Pourquoi faut-il distinguer vent réel et vent apparent ?",opts:["Le cap et la vitesse du navire modifient la lecture","Ils sont toujours identiques","Seul le vent apparent existe réellement","Cela n'a aucune importance"],correct:0,expl:"Changer d'allure modifie directement les valeurs affichées."},
    {q:"Un anémomètre proche d'une cheminée risque de donner :",opts:["Des lectures faussées par les turbulences","Des lectures toujours parfaites","Une mesure de température","Aucune lecture possible"],correct:0,expl:"L'emplacement d'un instrument influence directement sa fiabilité."},
    {q:"Pourquoi consigner l'heure exacte d'un relevé ?",opts:["Pour permettre un suivi cohérent dans le temps","Par simple habitude sans utilité","Uniquement pour la paperasse","Cela n'a pas d'importance"],correct:0,expl:"Sans heure précise, impossible de suivre une tendance fiable."},
    {q:"Comment se mesure généralement la température de la mer ?",opts:["Par sonde ou par seau","Uniquement par satellite","Par le baromètre","Elle ne se mesure pas à bord"],correct:0,expl:"Ce sont les deux méthodes courantes à bord."},
    {q:"Quelle est la meilleure pratique face à une lecture d'instrument douteuse ?",opts:["La comparer à l'observation visuelle","L'accepter sans vérification","L'ignorer complètement","Changer l'instrument immédiatement sans analyse"],correct:0,expl:"L'observation visuelle permet de détecter une anomalie d'instrument."},
    {q:"Un relevé isolé, sans suivi régulier :",opts:["Perd une grande partie de sa valeur","Est toujours suffisante","Remplace totalement un suivi régulier","N'a aucune limite"],correct:0,expl:"Seul le suivi dans le temps révèle une tendance fiable."},
    {q:"Que faut-il faire avant de conclure à une anomalie météo réelle face à des lectures incohérentes ?",opts:["Vérifier l'état et l'emplacement de l'instrument","Accepter immédiatement la lecture","Ignorer les observations visuelles","Ne rien faire"],correct:0,expl:"Une erreur d'installation est une cause fréquente d'incohérence."},
    {q:"Le vent apparent change lorsque le navire :",opts:["Modifie son cap ou sa vitesse","Reste totalement immobile","Change de couleur de peinture","Change de nom"],correct:0,expl:"Le déplacement du navire modifie la perception du vent."},
    {q:"À 08h00 : pression 1012 hPa en baisse depuis 6h, vent 12 nœuds NE, mer 16°C. Quelle valeur nécessite une surveillance particulière ?",opts:["La pression, en raison de sa baisse continue","Le vent, car sa direction est NE","La température de la mer","Aucune valeur ne nécessite attention"],correct:0,expl:"Une baisse continue sur plusieurs heures est le signal le plus significatif à surveiller."},
  ],
  en:[
    {q:"What does an aneroid barometer measure?",opts:["Atmospheric pressure","Temperature","Wind speed","Humidity"],correct:0,expl:"It measures pressure in hectopascals."},
    {q:"What does a barograph record?",opts:["Continuous pressure evolution","Wind direction only","Sea temperature","Relative humidity"],correct:0,expl:"It continuously traces on a rotating cylinder."},
    {q:"What matters most when reading a barometer?",opts:["The trend","The dial color","The manufacturing date","The instrument brand"],correct:0,expl:"A rapid drop is more concerning than a low but steady value."},
    {q:"What does a hygrometer measure?",opts:["Relative humidity","Pressure","Wind speed","Sea temperature"],correct:0,expl:"It measures the air's humidity level."},
    {q:"A large difference between air and sea temperature can favor:",opts:["Certain fog conditions","Total absence of wind","Guaranteed pressure rise","Nothing particular"],correct:0,expl:"Depending on air masses, this gap favors condensation."},
    {q:"What does an anemometer measure?",opts:["Wind speed","Pressure","Humidity","Temperature"],correct:0,expl:"It measures wind speed, the vane measures direction."},
    {q:"Why must true wind and apparent wind be distinguished?",opts:["Ship's course and speed affect the reading","They are always identical","Only apparent wind really exists","It has no importance"],correct:0,expl:"Changing speed directly alters displayed values."},
    {q:"An anemometer near a funnel risks giving:",opts:["Readings distorted by turbulence","Always perfect readings","A temperature measurement","No reading at all"],correct:0,expl:"An instrument's location directly affects its reliability."},
    {q:"Why log the exact time of a reading?",opts:["To allow consistent tracking over time","Just a habit with no use","Only for paperwork","It has no importance"],correct:0,expl:"Without a precise time, no reliable trend can be tracked."},
    {q:"How is sea temperature generally measured?",opts:["By probe or bucket","Only by satellite","By the barometer","It is not measured on board"],correct:0,expl:"These are the two common onboard methods."},
    {q:"What is best practice when facing a doubtful instrument reading?",opts:["Compare it to visual observation","Accept it without verification","Ignore it completely","Replace the instrument immediately without analysis"],correct:0,expl:"Visual observation helps detect an instrument anomaly."},
    {q:"An isolated reading, without regular tracking:",opts:["Loses much of its value","Is always sufficient","Fully replaces regular tracking","Has no limitation"],correct:0,expl:"Only tracking over time reveals a reliable trend."},
    {q:"What should be done before concluding a real weather anomaly when readings are inconsistent?",opts:["Check the instrument's condition and placement","Immediately accept the reading","Ignore visual observations","Do nothing"],correct:0,expl:"An installation error is a common cause of inconsistency."},
    {q:"Apparent wind changes when the ship:",opts:["Changes course or speed","Remains totally still","Changes paint color","Changes name"],correct:0,expl:"The ship's movement alters wind perception."},
    {q:"At 08:00: pressure 1012 hPa falling for 6h, wind 12 knots NE, sea 16°C. Which value needs particular attention?",opts:["Pressure, due to its continuous drop","Wind, because of its NE direction","Sea temperature","No value needs attention"],correct:0,expl:"A continuous drop over several hours is the most significant signal to watch."},
  ],
  es:[
    {q:"¿Qué mide un barómetro aneroide?",opts:["La presión atmosférica","La temperatura","La velocidad del viento","La humedad"],correct:0,expl:"Mide la presión en hectopascales."},
    {q:"¿Qué registra un barógrafo?",opts:["La evolución continua de la presión","Solo la dirección del viento","La temperatura del mar","La humedad relativa"],correct:0,expl:"Traza continuamente en un cilindro giratorio."},
    {q:"¿Qué importa más al leer un barómetro?",opts:["La tendencia de variación","El color del cuadrante","La fecha de fabricación","La marca del instrumento"],correct:0,expl:"Una caída rápida es más preocupante que un valor estable aunque bajo."},
    {q:"¿Qué mide un higrómetro?",opts:["La humedad relativa","La presión","La velocidad del viento","La temperatura del mar"],correct:0,expl:"Mide el nivel de humedad del aire."},
    {q:"Una gran diferencia entre temperatura del aire y del mar puede favorecer:",opts:["Ciertas condiciones de niebla","Ausencia total de viento","Un aumento garantizado de presión","Nada en particular"],correct:0,expl:"Según las masas de aire, esta diferencia favorece la condensación."},
    {q:"¿Qué mide un anemómetro?",opts:["La velocidad del viento","La presión","La humedad","La temperatura"],correct:0,expl:"Mide la velocidad del viento, la veleta la dirección."},
    {q:"¿Por qué hay que distinguir viento real y viento aparente?",opts:["El rumbo y la velocidad del buque afectan la lectura","Siempre son idénticos","Solo existe realmente el viento aparente","No tiene importancia"],correct:0,expl:"Cambiar de velocidad modifica directamente los valores mostrados."},
    {q:"Un anemómetro cerca de una chimenea puede dar:",opts:["Lecturas distorsionadas por turbulencias","Lecturas siempre perfectas","Una medición de temperatura","Ninguna lectura posible"],correct:0,expl:"La ubicación de un instrumento influye directamente en su fiabilidad."},
    {q:"¿Por qué registrar la hora exacta de una lectura?",opts:["Para permitir un seguimiento coherente en el tiempo","Solo por costumbre sin utilidad","Solo por trámite","No tiene importancia"],correct:0,expl:"Sin hora precisa, no se puede seguir una tendencia fiable."},
    {q:"¿Cómo se mide generalmente la temperatura del mar?",opts:["Por sonda o balde","Solo por satélite","Por el barómetro","No se mide a bordo"],correct:0,expl:"Son los dos métodos habituales a bordo."},
    {q:"¿Cuál es la mejor práctica ante una lectura de instrumento dudosa?",opts:["Compararla con la observación visual","Aceptarla sin verificación","Ignorarla completamente","Cambiar el instrumento inmediatamente sin análisis"],correct:0,expl:"La observación visual permite detectar una anomalía del instrumento."},
    {q:"Una lectura aislada, sin seguimiento regular:",opts:["Pierde gran parte de su valor","Siempre es suficiente","Reemplaza totalmente un seguimiento regular","No tiene ninguna limitación"],correct:0,expl:"Solo el seguimiento en el tiempo revela una tendencia fiable."},
    {q:"¿Qué hay que hacer antes de concluir una anomalía meteorológica real ante lecturas incoherentes?",opts:["Verificar el estado y la ubicación del instrumento","Aceptar inmediatamente la lectura","Ignorar las observaciones visuales","No hacer nada"],correct:0,expl:"Un error de instalación es una causa frecuente de incoherencia."},
    {q:"El viento aparente cambia cuando el buque:",opts:["Modifica su rumbo o velocidad","Permanece totalmente inmóvil","Cambia de color de pintura","Cambia de nombre"],correct:0,expl:"El desplazamiento del buque modifica la percepción del viento."},
    {q:"A las 08:00: presión 1012 hPa bajando desde hace 6h, viento 12 nudos NE, mar 16°C. ¿Qué valor requiere atención especial?",opts:["La presión, por su caída continua","El viento, por su dirección NE","La temperatura del mar","Ningún valor requiere atención"],correct:0,expl:"Una caída continua durante varias horas es la señal más significativa a vigilar."},
  ],
  pt:[
    {q:"O que mede um barómetro aneroide?",opts:["A pressão atmosférica","A temperatura","A velocidade do vento","A humidade"],correct:0,expl:"Mede a pressão em hectopascais."},
    {q:"O que regista um barógrafo?",opts:["A evolução contínua da pressão","Apenas a direção do vento","A temperatura do mar","A humidade relativa"],correct:0,expl:"Traça continuamente num cilindro giratório."},
    {q:"O que importa mais ao ler um barómetro?",opts:["A tendência de variação","A cor do mostrador","A data de fabrico","A marca do instrumento"],correct:0,expl:"Uma queda rápida é mais preocupante do que um valor estável mesmo baixo."},
    {q:"O que mede um higrómetro?",opts:["A humidade relativa","A pressão","A velocidade do vento","A temperatura do mar"],correct:0,expl:"Mede o nível de humidade do ar."},
    {q:"Uma grande diferença entre temperatura do ar e do mar pode favorecer:",opts:["Certas condições de nevoeiro","Ausência total de vento","Um aumento garantido de pressão","Nada em particular"],correct:0,expl:"Consoante as massas de ar, esta diferença favorece a condensação."},
    {q:"O que mede um anemómetro?",opts:["A velocidade do vento","A pressão","A humidade","A temperatura"],correct:0,expl:"Mede a velocidade do vento, o cata-vento a direção."},
    {q:"Por que é preciso distinguir vento real e vento aparente?",opts:["O rumo e a velocidade do navio afetam a leitura","São sempre idênticos","Só existe realmente o vento aparente","Não tem importância"],correct:0,expl:"Mudar de velocidade altera diretamente os valores exibidos."},
    {q:"Um anemómetro perto de uma chaminé pode dar:",opts:["Leituras distorcidas por turbulências","Leituras sempre perfeitas","Uma medição de temperatura","Nenhuma leitura possível"],correct:0,expl:"A localização de um instrumento influencia diretamente a sua fiabilidade."},
    {q:"Por que registar a hora exata de uma leitura?",opts:["Para permitir um acompanhamento coerente no tempo","Apenas por hábito sem utilidade","Apenas para burocracia","Não tem importância"],correct:0,expl:"Sem hora precisa, não é possível seguir uma tendência fiável."},
    {q:"Como se mede geralmente a temperatura do mar?",opts:["Por sonda ou balde","Apenas por satélite","Pelo barómetro","Não se mede a bordo"],correct:0,expl:"São os dois métodos habituais a bordo."},
    {q:"Qual é a melhor prática perante uma leitura de instrumento duvidosa?",opts:["Compará-la com a observação visual","Aceitá-la sem verificação","Ignorá-la completamente","Substituir o instrumento imediatamente sem análise"],correct:0,expl:"A observação visual permite detetar uma anomalia do instrumento."},
    {q:"Uma leitura isolada, sem acompanhamento regular:",opts:["Perde grande parte do seu valor","É sempre suficiente","Substitui totalmente um acompanhamento regular","Não tem qualquer limitação"],correct:0,expl:"Só o acompanhamento no tempo revela uma tendência fiável."},
    {q:"O que fazer antes de concluir uma anomalia meteorológica real perante leituras incoerentes?",opts:["Verificar o estado e a localização do instrumento","Aceitar imediatamente a leitura","Ignorar as observações visuais","Não fazer nada"],correct:0,expl:"Um erro de instalação é uma causa frequente de incoerência."},
    {q:"O vento aparente muda quando o navio:",opts:["Modifica o seu rumo ou velocidade","Permanece totalmente imóvel","Muda de cor de tinta","Muda de nome"],correct:0,expl:"O deslocamento do navio altera a perceção do vento."},
    {q:"Às 08h00: pressão 1012 hPa a descer há 6h, vento 12 nós NE, mar 16°C. Que valor requer atenção especial?",opts:["A pressão, devido à sua queda contínua","O vento, pela sua direção NE","A temperatura do mar","Nenhum valor requer atenção"],correct:0,expl:"Uma queda contínua durante várias horas é o sinal mais significativo a vigiar."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS) — reprend Q1, Q3, Q6, Q11, Q15 de la banque
const QUIZ = {
  fr:[BANK.fr[0], BANK.fr[2], BANK.fr[5], BANK.fr[10], BANK.fr[14]],
  en:[BANK.en[0], BANK.en[2], BANK.en[5], BANK.en[10], BANK.en[14]],
  es:[BANK.es[0], BANK.es[2], BANK.es[5], BANK.es[10], BANK.es[14]],
  pt:[BANK.pt[0], BANK.pt[2], BANK.pt[5], BANK.pt[10], BANK.pt[14]],
};

// TEXT CONTENT
const getContent = lang => {
  const d = {
    fr:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Leçon 3/7",
      title:"Instruments météorologiques et observations à bord",
      intro:"Un instrument ne remplace jamais l'observation. Il la confirme et la précise. Cette leçon répond à une question essentielle : comment un marin transforme-t-il des observations en informations fiables pour la navigation ?",
      p0:"L'INSTRUMENT NE VOIT PAS. IL MESURE CE QUE LE MARIN A DÉJÀ REMARQUÉ.",s0t:"Instruments météorologiques et observations à bord",
      s0:"Apprendre à lire, corriger et enregistrer correctement les instruments météo essentiels à bord.",
      p1:"Le baromètre et le barographe",
      s1:"Le baromètre anéroïde mesure la pression atmosphérique en hectopascals (hPa). Le barographe enregistre en continu son évolution sur un cylindre rotatif.\n\nLa tendance (hausse, baisse, stable) est plus importante que la valeur absolue : une pression de 1015 hPa qui chute rapidement est plus préoccupante qu'une pression de 1005 hPa stable depuis 24h.\n\nLa vitesse de variation entre deux relevés successifs est ce qui permet réellement d'anticiper — c'est cette notion qui prépare directement l'étude des systèmes dépressionnaires.",
      p2:"Thermomètre et hygromètre",
      s2:"Le thermomètre de l'air mesure la température ambiante ; l'hygromètre mesure l'humidité relative. Une différence importante entre la température de l'air et celle de la mer peut favoriser certaines conditions de brouillard selon les masses d'air en présence — un lien direct avec ce que vous avez appris en L2.",
      p3:"Anémomètre et girouette",
      s3:"L'anémomètre mesure la vitesse du vent, la girouette sa direction. Il faut toujours distinguer le vent réel du vent apparent : le cap suivi et la vitesse du navire modifient directement la lecture de l'instrument.\n\nUn marin doit savoir pourquoi les valeurs affichées changent lorsqu'il modifie son allure, sous peine de mal interpréter une situation météo réelle.",
      p4:"Observation météo et entretien des instruments",
      s4:"La température de la mer se relève par sonde ou par seau, à intervalle régulier. L'emplacement des instruments compte autant que leur précision : un anémomètre trop proche d'une cheminée ou d'une superstructure donnera des lectures faussées par les turbulences locales.\n\nToute observation doit être consignée dans le livre météo, avec l'heure exacte — un relevé isolé sans suivi régulier perd une grande partie de sa valeur.",
      p5:"🎯 Exercice : quatre relevés, une tendance",
      s5:"À 08h00, un OS relève : pression 1012 hPa (en baisse depuis 6h), température air 18°C, vent 12 nœuds NE, mer 16°C.\n\nLaquelle de ces quatre valeurs nécessite une surveillance particulière ? Expliquez pourquoi une seule valeur isolée ne suffit jamais à conclure.",
      p6:"🧭 Étude de cas",
      p7:"Depuis plusieurs jours, les relevés de vent semblent incohérents avec les observations visuelles de l'équipage. La force affichée ne correspond pas à ce que l'on ressent sur le pont.\n\nQuelle pourrait être la cause ? Que devrait faire l'équipage avant de conclure à une anomalie météo réelle ?\n\n(L'inspection révèle finalement que l'anémomètre est perturbé par les turbulences créées par la cheminée toute proche.)",
      p8:"📋 Banque de 15 questions",
      p9:"💭 À retenir : les erreurs fréquentes",
      s9:"Se fier uniquement à l'instrument sans vérifier par l'observation visuelle. Ignorer une erreur d'installation déjà connue. Ne pas noter l'heure exacte du relevé. Oublier de corriger le vent apparent selon le cap et la vitesse.",
      sumT:"Résumé — Leçon 3",
      sumP:["La tendance de pression compte plus que la valeur absolue","Le vent apparent dépend du cap et de la vitesse du navire","L'emplacement d'un instrument peut fausser sa lecture","Un relevé isolé sans suivi perd sa valeur","L'instrument confirme l'observation, il ne la remplace pas"],
      learnedP:["Lecture du baromètre et du barographe","Différence vent réel / vent apparent","Bonnes pratiques d'enregistrement","Détection d'une erreur d'instrument"],
      transition:"Dans la prochaine leçon, vous apprendrez à comprendre les systèmes de pression, les masses d'air et les fronts météorologiques.",
      safetyMsg:"L'instrument ne voit pas. Il mesure ce que le marin a déjà remarqué.",
      finalLabel:"MESSAGE CLÉ",
    },
    en:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Lesson 3/7",
      title:"Meteorological Instruments and Shipboard Observations",
      intro:"An instrument never replaces observation. It confirms and refines it. This lesson answers an essential question: how does a seafarer turn observations into reliable information for navigation?",
      p0:"THE INSTRUMENT DOES NOT SEE. IT MEASURES WHAT THE SEAFARER HAS ALREADY NOTICED.",s0t:"Meteorological Instruments and Shipboard Observations",
      s0:"Learning to read, correct, and properly log the essential weather instruments on board.",
      p1:"The Barometer and Barograph",
      s1:"The aneroid barometer measures atmospheric pressure in hectopascals (hPa). The barograph continuously records its evolution on a rotating cylinder.\n\nThe trend (rising, falling, steady) matters more than the absolute value: a pressure of 1015 hPa dropping rapidly is more concerning than a steady 1005 hPa over 24 hours.\n\nThe rate of change between successive readings is what truly allows anticipation — this concept directly prepares the study of pressure systems.",
      p2:"Thermometer and Hygrometer",
      s2:"The air thermometer measures ambient temperature; the hygrometer measures relative humidity. A significant difference between air and sea temperature can favor certain fog conditions depending on the air masses present — a direct link to what you learned in L2.",
      p3:"Anemometer and Wind Vane",
      s3:"The anemometer measures wind speed, the wind vane its direction. True wind must always be distinguished from apparent wind: the ship's course and speed directly affect the instrument's reading.\n\nA seafarer must understand why displayed values change when altering speed, or risk misreading an actual weather situation.",
      p4:"Weather Observation and Instrument Care",
      s4:"Sea temperature is measured by probe or bucket, at regular intervals. Instrument placement matters as much as their precision: an anemometer too close to a funnel or superstructure will give readings distorted by local turbulence.\n\nEvery observation must be logged in the weather log, with the exact time — an isolated reading without regular tracking loses much of its value.",
      p5:"🎯 Exercise: Four Readings, One Trend",
      s5:"At 08:00, an OS records: pressure 1012 hPa (falling for 6 hours), air temperature 18°C, wind 12 knots NE, sea 16°C.\n\nWhich of these four values requires particular attention? Explain why a single isolated value is never enough to conclude anything.",
      p6:"🧭 Case Study",
      p7:"For several days, wind readings have seemed inconsistent with the crew's visual observations. The displayed force does not match what is felt on deck.\n\nWhat could be the cause? What should the crew do before concluding there is a real weather anomaly?\n\n(The inspection eventually reveals the anemometer is disturbed by turbulence created by the nearby funnel.)",
      p8:"📋 15-Question Bank",
      p9:"💭 Remember: Common Mistakes",
      s9:"Relying solely on the instrument without visual verification. Ignoring a known installation error. Not logging the exact time of a reading. Forgetting to correct apparent wind for course and speed.",
      sumT:"Summary — Lesson 3",
      sumP:["Pressure trend matters more than absolute value","Apparent wind depends on ship's course and speed","Instrument placement can distort readings","An isolated reading without tracking loses value","The instrument confirms observation, it does not replace it"],
      learnedP:["Reading barometer and barograph","True wind vs apparent wind","Good logging practices","Detecting an instrument error"],
      transition:"In the next lesson, you will learn to understand pressure systems, air masses, and weather fronts.",
      safetyMsg:"The instrument does not see. It measures what the seafarer has already noticed.",
      finalLabel:"KEY MESSAGE",
    },
    es:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Lección 3/7",
      title:"Instrumentos meteorológicos y observaciones a bordo",
      intro:"Un instrumento nunca reemplaza la observación. La confirma y la precisa. Esta lección responde a una pregunta esencial: ¿cómo transforma un marino las observaciones en información fiable para la navegación?",
      p0:"EL INSTRUMENTO NO VE. MIDE LO QUE EL MARINO YA HA NOTADO.",s0t:"Instrumentos meteorológicos y observaciones a bordo",
      s0:"Aprender a leer, corregir y registrar correctamente los instrumentos meteorológicos esenciales a bordo.",
      p1:"El barómetro y el barógrafo",
      s1:"El barómetro aneroide mide la presión atmosférica en hectopascales (hPa). El barógrafo registra continuamente su evolución en un cilindro giratorio.\n\nLa tendencia (subida, bajada, estable) importa más que el valor absoluto: una presión de 1015 hPa que cae rápidamente es más preocupante que una presión estable de 1005 hPa durante 24h.\n\nLa velocidad de variación entre lecturas sucesivas es lo que realmente permite anticipar — este concepto prepara directamente el estudio de los sistemas de presión.",
      p2:"Termómetro e higrómetro",
      s2:"El termómetro del aire mide la temperatura ambiente; el higrómetro mide la humedad relativa. Una diferencia importante entre la temperatura del aire y la del mar puede favorecer ciertas condiciones de niebla según las masas de aire presentes — un vínculo directo con lo aprendido en L2.",
      p3:"Anemómetro y veleta",
      s3:"El anemómetro mide la velocidad del viento, la veleta su dirección. Siempre hay que distinguir el viento real del viento aparente: el rumbo y la velocidad del buque afectan directamente la lectura del instrumento.\n\nUn marino debe entender por qué los valores mostrados cambian al modificar su velocidad, so pena de malinterpretar una situación meteorológica real.",
      p4:"Observación meteorológica y cuidado de los instrumentos",
      s4:"La temperatura del mar se mide por sonda o balde, a intervalos regulares. La ubicación de los instrumentos importa tanto como su precisión: un anemómetro demasiado cerca de una chimenea o superestructura dará lecturas distorsionadas por turbulencias locales.\n\nToda observación debe registrarse en el libro meteorológico, con la hora exacta — una lectura aislada sin seguimiento regular pierde gran parte de su valor.",
      p5:"🎯 Ejercicio: cuatro lecturas, una tendencia",
      s5:"A las 08:00, un OS registra: presión 1012 hPa (bajando desde hace 6h), temperatura del aire 18°C, viento 12 nudos NE, mar 16°C.\n\n¿Cuál de estos cuatro valores requiere especial atención? Explica por qué un solo valor aislado nunca basta para concluir.",
      p6:"🧭 Estudio de caso",
      p7:"Desde hace varios días, las lecturas de viento parecen incoherentes con las observaciones visuales de la tripulación. La fuerza mostrada no corresponde a lo que se siente en cubierta.\n\n¿Cuál podría ser la causa? ¿Qué debería hacer la tripulación antes de concluir que hay una anomalía meteorológica real?\n\n(La inspección revela finalmente que el anemómetro está perturbado por las turbulencias creadas por la chimenea cercana.)",
      p8:"📋 Banco de 15 preguntas",
      p9:"💭 Recuerda: errores frecuentes",
      s9:"Confiar únicamente en el instrumento sin verificar mediante observación visual. Ignorar un error de instalación ya conocido. No anotar la hora exacta de la lectura. Olvidar corregir el viento aparente según el rumbo y la velocidad.",
      sumT:"Resumen — Lección 3",
      sumP:["La tendencia de presión importa más que el valor absoluto","El viento aparente depende del rumbo y la velocidad del buque","La ubicación de un instrumento puede distorsionar su lectura","Una lectura aislada sin seguimiento pierde valor","El instrumento confirma la observación, no la reemplaza"],
      learnedP:["Lectura del barómetro y barógrafo","Diferencia viento real / viento aparente","Buenas prácticas de registro","Detección de un error de instrumento"],
      transition:"En la próxima lección, aprenderás a comprender los sistemas de presión, las masas de aire y los frentes meteorológicos.",
      safetyMsg:"El instrumento no ve. Mide lo que el marino ya ha notado.",
      finalLabel:"MENSAJE CLAVE",
    },
    pt:{
      badge:"🌦️ Meteorology · Marine Weather & Forecasting · Lição 3/7",
      title:"Instrumentos meteorológicos e observações a bordo",
      intro:"Um instrumento nunca substitui a observação. Confirma-a e precisa-a. Esta lição responde a uma pergunta essencial: como transforma um marítimo observações em informação fiável para a navegação?",
      p0:"O INSTRUMENTO NÃO VÊ. MEDE O QUE O MARÍTIMO JÁ NOTOU.",s0t:"Instrumentos meteorológicos e observações a bordo",
      s0:"Aprender a ler, corrigir e registar corretamente os instrumentos meteorológicos essenciais a bordo.",
      p1:"O barómetro e o barógrafo",
      s1:"O barómetro aneroide mede a pressão atmosférica em hectopascais (hPa). O barógrafo regista continuamente a sua evolução num cilindro giratório.\n\nA tendência (subida, descida, estável) importa mais do que o valor absoluto: uma pressão de 1015 hPa que cai rapidamente é mais preocupante do que uma pressão estável de 1005 hPa durante 24h.\n\nA velocidade de variação entre leituras sucessivas é o que realmente permite antecipar — este conceito prepara diretamente o estudo dos sistemas de pressão.",
      p2:"Termómetro e higrómetro",
      s2:"O termómetro do ar mede a temperatura ambiente; o higrómetro mede a humidade relativa. Uma diferença importante entre a temperatura do ar e a do mar pode favorecer certas condições de nevoeiro consoante as massas de ar presentes — uma ligação direta com o que aprendeste em L2.",
      p3:"Anemómetro e cata-vento",
      s3:"O anemómetro mede a velocidade do vento, o cata-vento a sua direção. É preciso sempre distinguir o vento real do vento aparente: o rumo e a velocidade do navio afetam diretamente a leitura do instrumento.\n\nUm marítimo deve compreender por que os valores exibidos mudam ao alterar a velocidade, sob pena de interpretar mal uma situação meteorológica real.",
      p4:"Observação meteorológica e cuidado dos instrumentos",
      s4:"A temperatura do mar mede-se por sonda ou balde, a intervalos regulares. A localização dos instrumentos importa tanto quanto a sua precisão: um anemómetro demasiado próximo de uma chaminé ou superestrutura dará leituras distorcidas por turbulências locais.\n\nToda observação deve ser registada no livro meteorológico, com a hora exata — uma leitura isolada sem acompanhamento regular perde grande parte do seu valor.",
      p5:"🎯 Exercício: quatro leituras, uma tendência",
      s5:"Às 08h00, um OS regista: pressão 1012 hPa (a descer há 6h), temperatura do ar 18°C, vento 12 nós NE, mar 16°C.\n\nQual destes quatro valores requer atenção especial? Explica por que razão um único valor isolado nunca basta para concluir.",
      p6:"🧭 Estudo de caso",
      p7:"Há vários dias, as leituras de vento parecem incoerentes com as observações visuais da tripulação. A força exibida não corresponde ao que se sente no convés.\n\nQual poderia ser a causa? O que deveria a tripulação fazer antes de concluir que há uma anomalia meteorológica real?\n\n(A inspeção revela finalmente que o anemómetro está perturbado pelas turbulências criadas pela chaminé próxima.)",
      p8:"📋 Banco de 15 perguntas",
      p9:"💭 Lembrar: erros frequentes",
      s9:"Confiar apenas no instrumento sem verificar pela observação visual. Ignorar um erro de instalação já conhecido. Não anotar a hora exata da leitura. Esquecer de corrigir o vento aparente conforme o rumo e a velocidade.",
      sumT:"Resumo — Lição 3",
      sumP:["A tendência de pressão importa mais do que o valor absoluto","O vento aparente depende do rumo e da velocidade do navio","A localização de um instrumento pode distorcer a leitura","Uma leitura isolada sem acompanhamento perde valor","O instrumento confirma a observação, não a substitui"],
      learnedP:["Leitura do barómetro e do barógrafo","Diferença vento real / vento aparente","Boas práticas de registo","Deteção de um erro de instrumento"],
      transition:"Na próxima lição, vais aprender a compreender os sistemas de pressão, as massas de ar e as frentes meteorológicas.",
      safetyMsg:"O instrumento não vê. Mede o que o marítimo já notou.",
      finalLabel:"MENSAGEM-CHAVE",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonMETEO_L3({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 3/7":lang==="en"?"Lesson 3/7":lang==="es"?"Lección 3/7":"Lição 3/7"}</div>
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

            <SL icon="🔧" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔧</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="📊" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><BarometerSVG lang={lang}/></Card>

            <SL icon="🌡️" text={lc.p2} color={C.teal}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>

            <SL icon="🎐" text={lc.p3} color={C.orange}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><AnemometerSVG lang={lang}/></Card>

            <SL icon="📝" text={lc.p4} color={C.red}/>
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
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 3/7":"questions · Lesson 3/7"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
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
              {lang==="fr"?"LEÇON 4 - SYSTÈMES DE PRESSION →":lang==="en"?"LESSON 4 - PRESSURE SYSTEMS →":lang==="es"?"LECCIÓN 4 - SISTEMAS DE PRESIÓN →":"LIÇÃO 4 - SISTEMAS DE PRESSÃO →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
