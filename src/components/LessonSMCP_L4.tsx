// @ts-nocheck
import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  nav:"#00ccff", maneuver:"#88ff44", weather:"#ffaa00",
};

const T = {
  fr:{ back:"◀ Retour", module:"Maritime English SMCP", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Maritime English SMCP", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Inglés Marítimo SMCP", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Inglês Marítimo SMCP", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 — NAVIGATION PHRASES SIMULATOR
// ══════════════════════════════════════
function NavPhrasesSimSVG({ lang }) {
  const [cat, setCat] = useState("position");
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const categories = {
    position:{ label:{fr:"Position & Route",en:"Position & Track",es:"Posición y Derrota",pt:"Posição e Rota"}, icon:"📍", color:C.nav, cards:[
      { q:"How do you report your present position?", a:"Our present position is Latitude [X] degrees [X] minutes North/South, Longitude [X] degrees [X] minutes East/West. Position obtained by [GPS/ECDIS/radar fix]. Last fix at [time] UTC.", tr:{fr:"Notre position actuelle est Latitude [X] degrés [X] minutes Nord/Sud, Longitude [X] degrés [X] minutes Est/Ouest. Position obtenue par [GPS/ECDIS/point radar]. Dernier point à [heure] UTC.",es:"Nuestra posición actual es Latitud [X] grados [X] minutos Norte/Sur, Longitud [X] grados [X] minutos Este/Oeste. Posición obtenida por [GPS/ECDIS/punto de radar]. Última posición a las [hora] UTC.",pt:"A nossa posição atual é Latitude [X] graus [X] minutos Norte/Sul, Longitude [X] graus [X] minutos Este/Oeste. Posição obtida por [GPS/ECDIS/ponto de radar]. Último ponto às [hora] UTC."} },
      { q:"How do you report your track and ground speed?", a:"We are making good a track of [X] degrees [true/magnetic] at a speed over ground of [X] knots. Set and drift: current is setting [X] degrees, drifting [X] knots.", tr:{fr:"Nous faisons bonne route vers [X] degrés [vrai/magnétique] à une vitesse fond de [X] nœuds. Route forcée : le courant porte vers [X] degrés, dérive [X] nœuds.",es:"Mantenemos una derrota de [X] grados [verdadero/magnético] a una velocidad sobre el fondo de [X] nudos. Deriva: la corriente pone hacia [X] grados, deriva [X] nudos.",pt:"Estamos a fazer boa rota de [X] graus [verdadeiro/magnético] a uma velocidade sobre o fundo de [X] nós. Rumo forçado: a corrente porta para [X] graus, deriva [X] nós."} },
      { q:"How do you report a waypoint approach?", a:"We are approaching waypoint [name/number]. Distance to waypoint is [X] miles. ETA [time] UTC. Next waypoint is [name], course [X] degrees.", tr:{fr:"Nous approchons du point de passage [nom/numéro]. Distance au point de passage : [X] milles. ETA [heure] UTC. Point de passage suivant : [nom], cap [X] degrés.",es:"Nos aproximamos al punto de ruta [nombre/número]. Distancia al punto de ruta: [X] millas. ETA [hora] UTC. Próximo punto de ruta: [nombre], rumbo [X] grados.",pt:"Estamos a aproximar-nos do ponto de passagem [nome/número]. Distância ao ponto de passagem: [X] milhas. ETA [hora] UTC. Próximo ponto de passagem: [nome], rumo [X] graus."} },
      { q:"How do you report a position by bearing and distance?", a:"Our position is [X] miles [bearing direction] of [landmark/buoy/light]. Bearing of [landmark] is [X] degrees [true/magnetic].", tr:{fr:"Notre position est à [X] milles [direction du relèvement] de [amer/bouée/feu]. Le relèvement de [amer] est de [X] degrés [vrai/magnétique].",es:"Nuestra posición está a [X] millas [dirección de la marcación] de [marca/boya/faro]. La marcación de [marca] es de [X] grados [verdadero/magnético].",pt:"A nossa posição está a [X] milhas [direção da marcação] de [marca/boia/farol]. A marcação de [marca] é de [X] graus [verdadeiro/magnético]."} },
    ]},
    collision:{ label:{fr:"Anti-abordage",en:"Collision avoidance",es:"Prevención abordajes",pt:"Prevenção abalroamentos"}, icon:"⚠️", color:C.red, cards:[
      { q:"How do you warn another vessel of collision risk?", a:"Warning! You are on a collision course. I recommend you alter course to [port/starboard] immediately. My course is [X] degrees, speed [X] knots. Over.", tr:{fr:"Attention ! Vous êtes sur une route de collision. Je vous recommande de virer immédiatement sur [bâbord/tribord]. Mon cap est [X] degrés, vitesse [X] nœuds. Terminé.",es:"¡Atención! Está en rumbo de colisión. Le recomiendo virar inmediatamente a [babor/estribor]. Mi rumbo es [X] grados, velocidad [X] nudos. Cambio.",pt:"Atenção! Está em rota de colisão. Recomendo que altere imediatamente o rumo para [bombordo/estibordo]. O meu rumo é [X] graus, velocidade [X] nós. Câmbio."} },
      { q:"How do you report altering course to avoid collision?", a:"I am altering course to [starboard/port]. New course will be [X] degrees [true]. I am doing so to avoid collision with [vessel/danger]. Over.", tr:{fr:"Je vire sur [tribord/bâbord]. Le nouveau cap sera [X] degrés [vrai]. Je le fais pour éviter une collision avec [navire/danger].",es:"Viro a [estribor/babor]. El nuevo rumbo será [X] grados [verdadero]. Lo hago para evitar una colisión con [buque/peligro].",pt:"Viro para [estibordo/bombordo]. O novo rumo será [X] graus [verdadeiro]. Faço-o para evitar uma colisão com [navio/perigo]."} },
      { q:"How do you agree on passing arrangement?", a:"I agree to pass [port to port / starboard to starboard]. I will maintain my course and speed. Please acknowledge. Over.", tr:{fr:"J'accepte de croiser [tribord sur tribord / bâbord sur bâbord]. Je maintiens mon cap et ma vitesse. Veuillez confirmer. Terminé.",es:"Acepto cruzar [estribor con estribor / babor con babor]. Mantengo mi rumbo y velocidad. Por favor confirme. Cambio.",pt:"Aceito cruzar [estibordo com estibordo / bombordo com bombordo]. Mantenho o meu rumo e velocidade. Por favor confirme. Câmbio."} },
      { q:"How do you report a close-quarters situation?", a:"I am in a close-quarters situation with a vessel [bearing X degrees, range X miles]. Risk of collision exists. I am taking avoiding action to [port/starboard]. Over.", tr:{fr:"Je suis en situation de routes très rapprochées avec un navire [relèvement X degrés, distance X milles]. Risque de collision. Je prends des mesures d'évitement sur [bâbord/tribord].",es:"Estoy en una situación de proximidad extrema con un buque [marcación X grados, distancia X millas]. Riesgo de colisión. Estoy tomando medidas de evitación hacia [babor/estribor].",pt:"Estou numa situação de proximidade extrema com um navio [marcação X graus, distância X milhas]. Risco de colisão. Estou a tomar medidas de evasão para [bombordo/estibordo]."} },
    ]},
    restricted:{ label:{fr:"Visibilité réduite",en:"Restricted visibility",es:"Visibilidad reducida",pt:"Visibilidade reduzida"}, icon:"🌫️", color:C.weather, cards:[
      { q:"How do you report restricted visibility?", a:"Visibility is restricted. Current visibility is [X] miles/metres. I am proceeding at reduced speed of [X] knots. I am sounding fog signals in accordance with COLREG Rule 35.", tr:{fr:"Visibilité réduite. Visibilité actuelle [X] milles/mètres. Je navigue à vitesse réduite de [X] nœuds. J'émets les signaux de brouillard conformément à la Règle COLREG 35.",es:"Visibilidad reducida. Visibilidad actual [X] millas/metros. Navego a velocidad reducida de [X] nudos. Emito señales de niebla conforme a la Regla COLREG 35.",pt:"Visibilidade reduzida. Visibilidade atual [X] milhas/metros. Navego a velocidade reduzida de [X] nós. Emito sinais de nevoeiro em conformidade com a Regra COLREG 35."} },
      { q:"How do you report detecting a vessel in fog?", a:"I have a radar contact bearing [X] degrees, range [X] miles. CPA is [X] miles in [X] minutes. I am maintaining listening watch. I may reduce speed further.", tr:{fr:"J'ai un contact radar au relèvement [X] degrés, distance [X] milles. CPA est [X] milles dans [X] minutes. Je maintiens la veille sonore. Je pourrais réduire la vitesse davantage.",es:"Tengo un contacto de radar en marcación [X] grados, distancia [X] millas. CPA es [X] millas en [X] minutos. Mantengo la escucha. Podría reducir aún más la velocidad.",pt:"Tenho um contacto de radar na marcação [X] graus, distância [X] milhas. CPA é [X] milhas em [X] minutos. Mantenho a escuta. Poderei reduzir ainda mais a velocidade."} },
      { q:"How do you report a fog signal heard ahead?", a:"I have heard a fog signal ahead. I am stopping my engines. I am proceeding with extreme caution. All vessels in the area please identify yourselves on channel 16.", tr:{fr:"J'ai entendu un signal de brouillard devant moi. J'arrête mes machines. Je navigue avec une extrême prudence. Tous les navires dans la zone, veuillez vous identifier sur le canal 16.",es:"He oído una señal de niebla por la proa. Detengo mis máquinas. Navego con extrema precaución. Todos los buques en la zona, por favor identifíquense en el canal 16.",pt:"Ouvi um sinal de nevoeiro à proa. Paro as máquinas. Navego com extrema precaução. Todos os navios na zona, por favor identifiquem-se no canal 16."} },
      { q:"How do you report lifting fog?", a:"Visibility is improving. Visibility is now [X] miles. I am increasing speed to [X] knots. Fog signals are discontinued.", tr:{fr:"La visibilité s'améliore. Visibilité actuelle [X] milles. J'augmente la vitesse à [X] nœuds. Les signaux de brouillard sont arrêtés.",es:"La visibilidad está mejorando. Visibilidad actual [X] millas. Aumento la velocidad a [X] nudos. Se suspenden las señales de niebla.",pt:"A visibilidade está a melhorar. Visibilidade atual [X] milhas. Aumento a velocidade para [X] nós. Os sinais de nevoeiro são interrompidos."} },
    ]},
    tss:{ label:{fr:"DST & Chenaux",en:"TSS & Channels",es:"SDT y Canales",pt:"SDT e Canais"}, icon:"🗺️", color:C.maneuver, cards:[
      { q:"How do you report entering a Traffic Separation Scheme (TSS)?", a:"I am entering the [name] Traffic Separation Scheme. I am in the [northbound/southbound/inbound/outbound] lane. My course is [X] degrees. Speed [X] knots.", tr:{fr:"J'entre dans le Dispositif de Séparation du Trafic [nom]. Je suis dans la voie [nord/sud/entrée/sortie]. Mon cap est [X] degrés. Vitesse [X] nœuds.",es:"Entro en el Dispositivo de Separación de Tráfico [nombre]. Estoy en la vía [norte/sur/entrada/salida]. Mi rumbo es [X] grados. Velocidad [X] nudos.",pt:"Entro no Dispositivo de Separação de Tráfego [nome]. Estou na via [norte/sul/entrada/saída]. O meu rumo é [X] graus. Velocidade [X] nós."} },
      { q:"How do you report crossing a TSS?", a:"I am crossing the [name] Traffic Separation Scheme at right angles. My course is [X] degrees. I am maintaining a listening watch on channel 16.", tr:{fr:"Je traverse le DST [nom] à angle droit. Mon cap est [X] degrés. Je maintiens la veille sur le canal 16.",es:"Cruzo el DST [nombre] en ángulo recto. Mi rumbo es [X] grados. Mantengo la escucha en el canal 16.",pt:"Atravesso o DST [nome] em ângulo reto. O meu rumo é [X] graus. Mantenho a escuta no canal 16."} },
      { q:"How do you report a vessel going the wrong way in a TSS?", a:"[VTS/All stations]. I have sighted a vessel proceeding in the wrong direction in the [name] Traffic Separation Scheme. The vessel is on a [southbound/northbound] heading in the [northbound/southbound] lane.", tr:{fr:"[VTS/Toutes stations]. J'ai repéré un navire faisant route dans le mauvais sens dans le DST [nom]. Le navire est sur un cap [sud/nord] dans la voie [nord/sud].",es:"[VTS/Todas las estaciones]. He avistado un buque navegando en sentido contrario en el DST [nombre]. El buque lleva rumbo [sur/norte] en la vía [norte/sur].",pt:"[VTS/Todas as estações]. Avistei um navio a navegar no sentido errado no DST [nome]. O navio está com rumo [sul/norte] na via [norte/sul]."} },
      { q:"How do you report vessel speed in a restricted channel?", a:"I am reducing speed to [X] knots as required by port regulations. I am in [name] channel at position [X].", tr:{fr:"Je réduis la vitesse à [X] nœuds comme requis par les règlements portuaires. Je suis dans le chenal [nom] en position [X].",es:"Reduzco la velocidad a [X] nudos según lo requerido por las normas portuarias. Estoy en el canal [nombre] en la posición [X].",pt:"Reduzo a velocidade para [X] nós conforme exigido pelos regulamentos portuários. Estou no canal [nome] na posição [X]."} },
    ]},
  };

  const c = categories[cat];
  const card = c.cards[idx];

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
        {Object.entries(categories).map(([k,v])=>(
          <button key={k} onClick={()=>{setCat(k);setIdx(0);setFlipped(false);}} style={{
            padding:"7px 4px",borderRadius:10,cursor:"pointer",fontSize:9,fontWeight:700,
            background:cat===k?`${v.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${cat===k?v.color:"rgba(255,255,255,0.08)"}`,
            color:cat===k?v.color:C.muted}}>
            {v.icon} {v.label[lang]||v.label.en}
          </button>
        ))}
      </div>
      <div style={{display:"flex",gap:4,marginBottom:10}}>
        {c.cards.map((_,i)=>(
          <div key={i} onClick={()=>{setIdx(i);setFlipped(false);}} style={{
            flex:1,height:4,borderRadius:4,cursor:"pointer",
            background:i===idx?c.color:i<idx?`${c.color}55`:"rgba(255,255,255,0.1)"}}/>
        ))}
      </div>
      <div onClick={()=>setFlipped(f=>!f)} style={{
        padding:"16px",borderRadius:14,cursor:"pointer",minHeight:120,
        background:flipped?`${c.color}18`:"rgba(0,0,0,0.4)",
        border:`2px solid ${flipped?c.color:"rgba(255,255,255,0.08)"}`,
        transition:"all 0.3s ease",animation:"fadeUp 0.3s ease",
        display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:10}}>
        {!flipped?(
          <div>
            <div style={{fontSize:9,color:C.muted,letterSpacing:2,marginBottom:8}}>❓ {lang==="fr"?"Touche pour la réponse SMCP":lang==="en"?"Tap for SMCP answer":lang==="es"?"Toca para respuesta SMCP":"Toque para resposta SMCP"}</div>
            <div style={{fontSize:13,color:C.white,fontWeight:700,lineHeight:1.5}}>{card.q}</div>
          </div>
        ):(
          <div>
            <div style={{fontSize:9,color:c.color,letterSpacing:2,marginBottom:8}}>✅ SMCP ANSWER</div>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:11,color:C.white,lineHeight:1.7,marginBottom:6,whiteSpace:"pre-line"}}>{card.a}</div>
            {lang!=="en"&&<div style={{fontSize:10,color:C.muted,fontStyle:"italic",borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:6}}>{card.tr[lang]||card.tr.fr}</div>}
          </div>
        )}
      </div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>{setIdx(i=>Math.max(0,i-1));setFlipped(false);}} disabled={idx===0}
          style={{flex:1,padding:"9px",borderRadius:10,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:idx===0?C.muted:C.white,cursor:idx===0?"default":"pointer",fontSize:11}}>
          ◀ {lang==="fr"?"Précédent":lang==="en"?"Previous":lang==="es"?"Anterior":"Anterior"}
        </button>
        <button onClick={()=>{setIdx(i=>Math.min(c.cards.length-1,i+1));setFlipped(false);}} disabled={idx===c.cards.length-1}
          style={{flex:1,padding:"9px",borderRadius:10,background:idx===c.cards.length-1?"rgba(255,255,255,0.05)":`${c.color}22`,border:`1px solid ${idx===c.cards.length-1?"rgba(255,255,255,0.08)":c.color}`,color:C.white,cursor:idx===c.cards.length-1?"default":"pointer",fontSize:11,fontWeight:700}}>
          {lang==="fr"?"Suivant":lang==="en"?"Next":lang==="es"?"Siguiente":"Seguinte"} ▶
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — WEATHER REPORTING SIMULATOR
// ══════════════════════════════════════
function WeatherReportSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const elements = [
    { id:"wind", icon:"💨", color:C.weather,
      label:{fr:"Vent",en:"Wind",es:"Viento",pt:"Vento"},
      format:{fr:"FORMAT VENT SMCP :\n'Wind direction [X] degrees. Wind force [Beaufort scale]. Wind speed [X] knots. [Gusting to X knots].'\n\nEXEMPLES :\n'Wind direction 270 degrees. Wind force 5. Wind speed 20 knots.'\n'Wind direction 180 degrees. Wind speed 35 knots. Gusting to 45 knots.'\n\nÉCHELLE DE BEAUFORT :\n0-1 = Calme / 2-3 = Petite brise\n4-5 = Jolie brise / 6-7 = Vent frais à fort\n8-9 = Coup de vent / 10-12 = Tempête",
             en:"WIND SMCP FORMAT:\n'Wind direction [X] degrees. Wind force [Beaufort scale]. Wind speed [X] knots. [Gusting to X knots].'\n\nEXAMPLES:\n'Wind direction 270 degrees. Wind force 5. Wind speed 20 knots.'\n'Wind direction 180 degrees. Wind speed 35 knots. Gusting to 45 knots.'\n\nBEAUFORT SCALE:\n0-1 = Calm / 2-3 = Light breeze\n4-5 = Moderate breeze / 6-7 = Strong breeze\n8-9 = Gale / 10-12 = Storm",
             es:"FORMATO VIENTO SMCP:\n'Wind direction [X] degrees. Wind force [Beaufort]. Wind speed [X] knots. [Gusting to X knots].'\n\nEJEMPLOS:\n'Wind direction 270 degrees. Wind force 5. Wind speed 20 knots.'\n\nESCALA BEAUFORT:\n0-1 = Calma / 4-5 = Brisa moderada\n6-7 = Viento fuerte / 8-9 = Vendaval",
             pt:"FORMATO VENTO SMCP:\n'Wind direction [X] degrees. Wind force [Beaufort]. Wind speed [X] knots. [Gusting to X knots].'\n\nEXEMPLOS:\n'Wind direction 270 degrees. Wind force 5. Wind speed 20 knots.'\n\nESCALA BEAUFORT:\n0-1 = Calmo / 4-5 = Brisa moderada\n6-7 = Vento forte / 8-9 = Vendaval"} },
    { id:"sea", icon:"🌊", color:C.blue2,
      label:{fr:"État de la mer",en:"Sea state",es:"Estado de la mar",pt:"Estado do mar"},
      format:{fr:"FORMAT ÉTAT DE LA MER SMCP :\n'Sea state [description]. Wave height [X] metres. Swell from [direction] degrees, height [X] metres.'\n\nDESCRIPTIONS :\n0 = Calm (glassy) — 0 m\n1 = Calm (rippled) — 0-0.1 m\n2 = Smooth — 0.1-0.5 m\n3 = Slight — 0.5-1.25 m\n4 = Moderate — 1.25-2.5 m\n5 = Rough — 2.5-4 m\n6 = Very rough — 4-6 m\n7 = High — 6-9 m\n8 = Very high — 9-14 m\n9 = Phenomenal — > 14 m\n\nEXEMPLE :\n'Sea state moderate. Wave height 2 metres. Swell from 290 degrees, height 1.5 metres.'",
             en:"SMCP SEA STATE FORMAT:\n'Sea state [description]. Wave height [X] metres. Swell from [direction] degrees, height [X] metres.'\n\nDESCRIPTIONS:\n0 = Calm (glassy) — 0 m\n1 = Calm (rippled) — 0-0.1 m\n2 = Smooth — 0.1-0.5 m\n3 = Slight — 0.5-1.25 m\n4 = Moderate — 1.25-2.5 m\n5 = Rough — 2.5-4 m\n6 = Very rough — 4-6 m\n7 = High — 6-9 m\n8 = Very high — 9-14 m\n9 = Phenomenal — > 14 m",
             es:"FORMATO ESTADO DEL MAR SMCP:\n'Sea state [descripción]. Wave height [X] metres. Swell from [direction] degrees.'\n\nDESCRIPCIONES:\n0 = Calma (glassy)\n3 = Marejadilla (0.5-1.25 m)\n4 = Marejada (1.25-2.5 m)\n5 = Gruesa (2.5-4 m)\n6 = Muy gruesa (4-6 m)\n7 = Arbolada (6-9 m)",
             pt:"FORMATO ESTADO DO MAR SMCP:\n'Sea state [descrição]. Wave height [X] metres. Swell from [direction] degrees.'\n\nDESCRIÇÕES:\n0 = Calmo (glassy)\n3 = Ligeiramente agitado (0.5-1.25 m)\n4 = Moderadamente agitado (1.25-2.5 m)\n5 = Agitado (2.5-4 m)\n6 = Muito agitado (4-6 m)"} },
    { id:"visibility", icon:"👁️", color:C.nav,
      label:{fr:"Visibilité",en:"Visibility",es:"Visibilidad",pt:"Visibilidade"},
      format:{fr:"FORMAT VISIBILITÉ SMCP :\n'Visibility is [X] miles/kilometres/metres.'\n\nTERMES STANDARD :\nGood = > 5 milles\nModerate = 2-5 milles\nPoor = 0.5-2 milles\nVery poor = < 0.5 mille\nFog = < 1000 mètres\nDense fog = < 200 mètres\n\nEXEMPLES :\n'Visibility is good. Visibility 10 miles.'\n'Visibility is poor. Visibility 1 mile. I am sounding fog signals.'\n'Visibility is nil. Dense fog. Visibility less than 100 metres.'",
             en:"SMCP VISIBILITY FORMAT:\n'Visibility is [X] miles/kilometres/metres.'\n\nSTANDARD TERMS:\nGood = > 5 miles\nModerate = 2-5 miles\nPoor = 0.5-2 miles\nVery poor = < 0.5 mile\nFog = < 1,000 metres\nDense fog = < 200 metres\n\nEXAMPLES:\n'Visibility is good. Visibility 10 miles.'\n'Visibility is poor. Visibility 1 mile. I am sounding fog signals.'\n'Visibility is nil. Dense fog. Visibility less than 100 metres.'",
             es:"FORMATO VISIBILIDAD SMCP:\n'Visibility is [X] miles/kilometres/metres.'\n\nTÉRMINOS ESTÁNDAR:\nBuena = > 5 millas\nModerada = 2-5 millas\nPobre = 0.5-2 millas\nMuy pobre = < 0.5 milla\nNiebla = < 1.000 metros\nNiebla densa = < 200 metros",
             pt:"FORMATO VISIBILIDADE SMCP:\n'Visibility is [X] miles/kilometres/metres.'\n\nTERMOS PADRÃO:\nBoa = > 5 milhas\nModerada = 2-5 milhas\nPobre = 0.5-2 milhas\nMuito pobre = < 0.5 milha\nNevoeiro = < 1.000 metros\nNevoeiro denso = < 200 metros"} },
    { id:"barometer", icon:"🌡️", color:C.maneuver,
      label:{fr:"Pression & Tendance",en:"Pressure & Tendency",es:"Presión y Tendencia",pt:"Pressão e Tendência"},
      format:{fr:"FORMAT PRESSION SMCP :\n'Barometric pressure is [X] millibars / hectopascals. [Rising / falling / steady].'\n\nTENDANCES :\nSteadily rising = hausse régulière (beau temps)\nRapidly rising = hausse rapide\nSteadily falling = baisse régulière\nRapidly falling = baisse rapide (attention tempête !)\nSteady = stable\n\nEXEMPLES :\n'Barometric pressure 1013 millibars, steady.'\n'Barometric pressure 998 millibars, rapidly falling. Warning: gale approaching.'\n\nRÈGLE PRATIQUE :\nChute > 3 hPa/3h = coup de vent probable",
             en:"SMCP PRESSURE FORMAT:\n'Barometric pressure is [X] millibars / hectopascals. [Rising / falling / steady].'\n\nTENDENCIES:\nSteadily rising = steady rise (good weather)\nRapidly rising = rapid rise\nSteadily falling = steady fall\nRapidly falling = rapid fall (caution — storm!)\nSteady = stable\n\nEXAMPLES:\n'Barometric pressure 1013 millibars, steady.'\n'Barometric pressure 998 millibars, rapidly falling. Warning: gale approaching.'",
             es:"FORMATO PRESIÓN SMCP:\n'Barometric pressure is [X] millibars. [Rising / falling / steady].'\n\nTENDENCIAS:\nRapidly falling = bajada rápida (¡atención tormenta!)\nSteady = estable\nSteadily rising = subida regular (buen tiempo)\n\nEJEMPLOS:\n'Barometric pressure 1013 millibars, steady.'\n'Barometric pressure 998 millibars, rapidly falling.'",
             pt:"FORMATO PRESSÃO SMCP:\n'Barometric pressure is [X] millibars. [Rising / falling / steady].'\n\nTENDÊNCIAS:\nRapidly falling = descida rápida (atenção tempestade!)\nSteady = estável\nSteadily rising = subida regular (bom tempo)\n\nEXEMPLOS:\n'Barometric pressure 1013 millibars, steady.'\n'Barometric pressure 998 millibars, rapidly falling.'"} },
  ];

  const sel_ = sel!==null ? elements[sel] : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {elements.map((e,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            padding:"10px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",
            background:sel===i?`${e.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${sel===i?e.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:18,marginBottom:3}}>{e.icon}</div>
            <div style={{fontSize:9,color:sel===i?e.color:C.muted,fontWeight:700,lineHeight:1.2}}>{e.label[lang]||e.label.en}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}10`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:11,fontWeight:700,color:sel_.color,marginBottom:8}}>{sel_.icon} {sel_.label[lang]||sel_.label.en}</div>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.format[lang]||sel_.format.en}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — MANEUVERING ORDERS
// ══════════════════════════════════════
function ManeuveringOrdersSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const sections = [
    { id:"helm", icon:"🎯", color:C.nav,
      label:{fr:"Ordres de barre",en:"Helm orders",es:"Órdenes de timón",pt:"Ordens de leme"},
      orders:[
        { cmd:"Starboard [X] degrees", meaning:{fr:"Virer à tribord (droite) de [X] degrés",en:"Turn right [X] degrees",es:"Girar a estribor [X] grados",pt:"Virar a estibordo [X] graus"} },
        { cmd:"Port [X] degrees", meaning:{fr:"Virer à bâbord (gauche) de [X] degrés",en:"Turn left [X] degrees",es:"Girar a babor [X] grados",pt:"Virar a bombordo [X] graus"} },
        { cmd:"Hard to starboard / port", meaning:{fr:"Toute barre à tribord / bâbord",en:"Full rudder to right / left",es:"Todo el timón a estribor / babor",pt:"Leme todo a estibordo / bombordo"} },
        { cmd:"Midships", meaning:{fr:"Barre droite",en:"Rudder amidships",es:"Timón al centro",pt:"Leme ao centro"} },
        { cmd:"Steady", meaning:{fr:"Maintenir ce cap",en:"Hold this course",es:"Mantener este rumbo",pt:"Manter este rumo"} },
        { cmd:"Steady on [X] degrees", meaning:{fr:"Stabiliser sur le cap [X] degrés",en:"Steer course [X] degrees",es:"Estabilizar en rumbo [X] grados",pt:"Estabilizar no rumo [X] graus"} },
      ]},
    { id:"engine", icon:"⚙️", color:C.maneuver,
      label:{fr:"Ordres de machine",en:"Engine orders",es:"Órdenes de máquinas",pt:"Ordens de máquinas"},
      orders:[
        { cmd:"Full ahead", meaning:{fr:"Avant toute",en:"Maximum forward speed",es:"Avante toda",pt:"Toda a avante"} },
        { cmd:"Half ahead", meaning:{fr:"Mi-avant",en:"Half forward speed",es:"Media avante",pt:"Meia avante"} },
        { cmd:"Slow ahead", meaning:{fr:"Petite vitesse avant",en:"Slow forward",es:"Avante despacio",pt:"Avante devagar"} },
        { cmd:"Dead slow ahead", meaning:{fr:"Très petite vitesse avant",en:"Minimum forward speed",es:"Muy despacio avante",pt:"Avante mínimo"} },
        { cmd:"Stop engines", meaning:{fr:"Stoppez les machines",en:"Engines stopped",es:"Parar máquinas",pt:"Parar máquinas"} },
        { cmd:"Dead slow astern", meaning:{fr:"Très petite vitesse arrière",en:"Minimum astern speed",es:"Muy despacio atrás",pt:"Atrás mínimo"} },
        { cmd:"Slow astern", meaning:{fr:"Petite vitesse arrière",en:"Slow astern",es:"Atrás despacio",pt:"Atrás devagar"} },
        { cmd:"Half astern", meaning:{fr:"Mi-arrière",en:"Half astern speed",es:"Media atrás",pt:"Meia atrás"} },
        { cmd:"Full astern", meaning:{fr:"Arrière toute",en:"Maximum astern speed",es:"Atrás toda",pt:"Toda a atrás"} },
      ]},
    { id:"anchor", icon:"⚓", color:C.gold2,
      label:{fr:"Manœuvres de mouillage",en:"Anchoring orders",es:"Órdenes de fondeo",pt:"Ordens de fundeamento"},
      orders:[
        { cmd:"Let go [port/starboard] anchor", meaning:{fr:"Mouiller l'ancre [bâbord/tribord]",en:"Drop [port/starboard] anchor",es:"Fondear ancla [babor/estribor]",pt:"Largar âncora [bombordo/estibordo]"} },
        { cmd:"Heave in / heave up", meaning:{fr:"Virer l'ancre",en:"Raise the anchor",es:"Virar el ancla",pt:"Virar a âncora"} },
        { cmd:"Anchor is aweigh", meaning:{fr:"L'ancre est dérapée",en:"Anchor is clear of the bottom",es:"El ancla está a pique",pt:"A âncora está suspensa"} },
        { cmd:"Anchor is clear", meaning:{fr:"L'ancre est libre",en:"Anchor is free of obstructions",es:"El ancla está libre",pt:"A âncora está livre"} },
        { cmd:"Anchor is dragging", meaning:{fr:"L'ancre chasse",en:"Anchor is not holding",es:"El ancla está garrando",pt:"A âncora está a garrear"} },
        { cmd:"Pay out [X] shackles of cable", meaning:{fr:"Filer [X] manilles de câble",en:"Release [X] shackles of chain",es:"Filar [X] grilletes de cadena",pt:"Largar [X] manilhas de corrente"} },
      ]},
  ];

  const sel_ = sel!==null ? sections[sel] : null;
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {sections.map((s,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            flex:1,padding:"10px 4px",borderRadius:12,cursor:"pointer",textAlign:"center",
            background:sel===i?`${s.color}22`:"rgba(255,255,255,0.04)",
            border:`2px solid ${sel===i?s.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:18,marginBottom:3}}>{s.icon}</div>
            <div style={{fontSize:9,color:sel===i?s.color:C.muted,fontWeight:700,lineHeight:1.2}}>{s.label[lang]||s.label.en}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}10`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:11,fontWeight:700,color:sel_.color,marginBottom:10}}>{sel_.icon} {sel_.label[lang]||sel_.label.en}</div>
        {sel_.orders.map((o,i)=>(
          <div key={i} style={{marginBottom:8,paddingBottom:8,borderBottom:i<sel_.orders.length-1?"1px solid rgba(255,255,255,0.05)":"none",display:"flex",gap:10,alignItems:"flex-start"}}>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:11,color:C.white,fontWeight:700,minWidth:160,flexShrink:0}}>{o.cmd}</div>
            <div style={{fontSize:10,color:C.muted}}>→ {o.meaning[lang]||o.meaning.en}</div>
          </div>
        ))}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — NAVIGATION QUIZ
// ══════════════════════════════════════
function NavQuizSVG({ lang }) {
  const [qIdx, setQIdx] = useState(0);
  const [ans, setAns] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const qs = [
    { q:"How do you say 'turn right 20 degrees' in SMCP?", opts:["Turn right twenty","Starboard twenty degrees","Port twenty degrees","Right two zero"], correct:1 },
    { q:"Visibility is 400 metres — which SMCP term applies?", opts:["Poor visibility","Fog — visibility less than 1,000 metres. I am sounding fog signals.","Good visibility","Moderate visibility"], correct:1 },
    { q:"What does 'anchor is aweigh' mean?", opts:["Anchor is too heavy","Anchor is clear of the bottom — the vessel is free to move","Anchor is dragging","Anchor is let go"], correct:1 },
    { q:"How do you report wind in SMCP?", opts:["Wind is blowing hard","Wind direction 270 degrees. Wind force 6. Wind speed 25 knots.","Strong wind from west","Gusty conditions"], correct:1 },
    { q:"A vessel is in the wrong lane of a TSS — what do you broadcast?", opts:["Nothing — it's their problem","[VTS/All stations]. I have sighted a vessel proceeding in the wrong direction in the [name] Traffic Separation Scheme.","Call them on CH 16","Report to port authority only"], correct:1 },
  ];

  const [shuffled]=useState(()=>qs.map(shuffleQuestionOptions));
  const q = shuffled[qIdx];
  const pick=(i)=>{if(ans!==null)return;setAns(i);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(qIdx<qs.length-1){setQIdx(q=>q+1);setAns(null);}else setDone(true);};

  if(done) return (
    <div style={{textAlign:"center",padding:"16px"}}>
      <div style={{fontSize:40}}>{score>=4?"🏆":"📚"}</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:18,color:C.white,margin:"8px 0"}}>{score}/{qs.length}</div>
      <button onClick={()=>{setDone(false);setQIdx(0);setAns(null);setScore(0);}} style={{padding:"8px 16px",borderRadius:10,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:C.muted,cursor:"pointer",fontSize:11}}>🔄 Retry</button>
    </div>
  );

  return (
    <div>
      <div style={{display:"flex",gap:4,marginBottom:10}}>
        {qs.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<qIdx?C.nav:i===qIdx?C.gold2:"rgba(255,255,255,0.1)"}}/>)}
      </div>
      <div style={{fontSize:12,fontWeight:700,color:C.white,marginBottom:12,lineHeight:1.5}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{
          let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";
          if(ans!==null){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===ans){bg="rgba(192,57,43,0.2)";bd=C.red;}}
          return <button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:11,textAlign:"left",cursor:ans!==null?"default":"pointer",fontFamily:"'Courier New',monospace"}}>{opt}</button>;
        })}
      </div>
      {ans!==null&&<button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.nav},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:C.navy,cursor:"pointer"}}>
        {qIdx<qs.length-1?"NEXT →":"FINISH"}
      </button>}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans,setAns]=useState({q1:"",q2:"",q3:""});
  const [showC,setShowC]=useState(false);
  const qs={
    en:[
      {id:"q1",q:"How do you order 'stop engines' in SMCP?\n(Answer: 2 words)",correct:"Stop engines"},
      {id:"q2",q:"Sea state with wave height of 3 metres = which SMCP term?\n(Answer: 1-2 words)",correct:"Rough"},
      {id:"q3",q:"How do you say 'turn left 15 degrees' in SMCP?\n(Answer in English)",correct:"Port fifteen degrees"},
    ],
    fr:[
      {id:"q1",q:"Comment ordonne-t-on 'arrêtez les machines' en SMCP ?\n(Répondre : 2 mots)",correct:"Stop engines"},
      {id:"q2",q:"État de la mer avec des vagues de 3 mètres = quel terme SMCP ?\n(Répondre : 1-2 mots)",correct:"Rough"},
      {id:"q3",q:"Comment dit-on 'virer à bâbord de 15 degrés' en SMCP ?\n(Répondre en anglais)",correct:"Port fifteen degrees"},
    ],
    es:[
      {id:"q1",q:"¿Cómo se ordena 'parar las máquinas' en SMCP?\n(Responder: 2 palabras)",correct:"Stop engines"},
      {id:"q2",q:"Estado de la mar con olas de 3 metros = ¿qué término SMCP?\n(Responder: 1-2 palabras)",correct:"Rough"},
      {id:"q3",q:"¿Cómo se dice 'girar a babor 15 grados' en SMCP?\n(Responder en inglés)",correct:"Port fifteen degrees"},
    ],
    pt:[
      {id:"q1",q:"Como se ordena 'parar as máquinas' em SMCP?\n(Responder: 2 palavras)",correct:"Stop engines"},
      {id:"q2",q:"Estado do mar com ondas de 3 metros = que termo SMCP?\n(Responder: 1-2 palavras)",correct:"Rough"},
      {id:"q3",q:"Como se diz 'virar a bombordo 15 graus' em SMCP?\n(Responder em inglês)",correct:"Port fifteen degrees"},
    ],
  };
  const list=qs[lang]||qs.en;
  const chk=(q,val)=>{
    const v=val.trim().toLowerCase();
    if(q.id==="q1") return v.includes("stop")&&v.includes("engine");
    if(q.id==="q2") return v.includes("rough");
    if(q.id==="q3") return v.includes("port")&&(v.includes("fifteen")||v.includes("15"));
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.nav}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : Arrêt machine = 'Stop engines' · Mer agitée 2.5-4m = 'Rough' · Bâbord gauche = Port":
         lang==="en"?"💡 Reminders: Engine stop = 'Stop engines' · Rough sea 2.5-4m · Port = left side":
         lang==="es"?"💡 Recordatorios: Parar máquinas = 'Stop engines' · Mar gruesa 2.5-4m = 'Rough' · Babor = lado izquierdo":
         "💡 Lembretes: Parar máquinas = 'Stop engines' · Mar agitado 2.5-4m = 'Rough' · Bombordo = lado esquerdo"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:13,fontFamily:"'Courier New',monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q,ans[q.id])?C.green:C.red}}>{chk(q,ans[q.id])?"✓":`✗ → ${q.correct}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7,marginBottom:10,fontFamily:"'Courier New',monospace"}}>
        Q1: STOP ENGINES (standard SMCP engine order · helmsman confirms: 'Stop engines — engines stopped')\nQ2: ROUGH (sea state 5 = 2.5-4m · Slight=3 · Moderate=4 · Rough=5 · Very rough=6 · High=7)\nQ3: PORT FIFTEEN DEGREES (Port = left · Starboard = right · always say degrees individually)
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":`${C.nav}12`,border:`1px solid ${showC?C.green:C.nav}44`,color:showC?C.green:C.nav,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

const QUIZ = {
  en:[
    {q:"How do you report altering course to avoid a vessel on your port bow?",opts:["Turning right","I am altering course to starboard. New course will be [X] degrees true to avoid collision with a vessel on my port bow. Over.","Going left","Course change to port"],correct:1,expl:"COLREG Rule 8 requires collision avoidance action to be 'large, timely and positive.' SMCP format: 'I am altering course to [starboard/port]. New course will be [X] degrees [true/magnetic]. I am doing so to avoid collision with [vessel/danger on my port/starboard bow/quarter].' Always specify direction of alteration and new course. If vessel on port bow → alter starboard (COLREG Rule 16 — give-way vessel). If vessel on starboard bow → maintain course (stand-on vessel per Rule 17) OR alter if collision imminent."},
    {q:"How do you report entering a Traffic Separation Scheme?",opts:["I am in the shipping lane","I am entering the [name] Traffic Separation Scheme. I am in the [northbound/southbound/inbound/outbound] lane. My course is [X] degrees. Speed [X] knots.","Traffic lane ahead","Entering TSS"],correct:1,expl:"TSS SMCP report: 'I am entering the [name] TSS. I am in the [direction] lane. My course is [X] degrees. Speed is [X] knots.' Additional: 'I am crossing the TSS at right angles. My course is [X] degrees.' COLREG Rule 10 governs TSS: vessels must proceed in the appropriate lane, join/leave at the extremities, cross at right angles if crossing, avoid the separation zone. VTS must be informed when entering TSS under their jurisdiction."},
    {q:"What is the correct SMCP response when the helmsman executes a helm order?",opts:["OK","[Repeat the order received]. For example: 'Starboard twenty — steering starboard twenty degrees.' Then when steady: 'Steady on [X] degrees [true/magnetic].'","Done","Turning"],correct:1,expl:"Helm order confirmation SMCP: closed-loop communication is mandatory. When ordered 'Starboard twenty degrees': helmsman responds 'Starboard twenty degrees' immediately. When the vessel has turned and steadied: 'Steady on two seven five degrees true.' This confirms: the order was heard correctly, it is being executed, and the vessel is now on the new course. Never just say 'OK' or nod — verbal confirmation is required for safety."},
    {q:"How do you report barometric pressure falling rapidly?",opts:["Pressure low","Barometric pressure [X] millibars, rapidly falling. Warning: gale conditions are expected. I am altering course/reducing speed as a precaution.","Low pressure","Bad weather coming"],correct:1,expl:"Rapid pressure fall SMCP: 'Barometric pressure is [X] millibars [hectopascals], rapidly falling. Decrease in the last [3] hours is [X] millibars.' A rapid fall (> 3 hPa in 3 hours) indicates approaching storm. Broadcast as SÉCURITÉ if warning other vessels: 'SÉCURITÉ SÉCURITÉ SÉCURITÉ. All stations. This is MV [name]. Weather warning: barometric pressure falling rapidly. Gale conditions expected from [direction]. Over.' Masters should reduce speed, alter course, secure loose equipment."},
    {q:"How do you agree on a passing arrangement with another vessel?",opts:["See you on the other side","[Vessel name], this is [your vessel]. I agree to pass [port to port / starboard to starboard]. I will [maintain / alter] course. Please acknowledge. Over.","OK we'll pass","Passing arrangement confirmed"],correct:1,expl:"Passing arrangement SMCP: '[Vessel name], this is [your vessel name]. I propose to pass [port to port / starboard to starboard / on your port side / on your starboard side]. I will [maintain my course and speed / alter to starboard / reduce speed]. Please acknowledge.' Other vessel responds: '[Your vessel], this is [vessel name]. I agree to pass [port to port]. I will [maintain / alter to starboard]. Acknowledged.' These arrangements must be clearly confirmed by BOTH vessels before execution."},
  ],
  fr:[
    {q:"Comment signaler un changement de cap pour éviter un navire sur votre bossoir bâbord ?",opts:["Je vire à droite","I am altering course to starboard. New course will be [X] degrees true to avoid collision with a vessel on my port bow. Over.","Je vire à gauche","Changement de cap sur bâbord"],correct:1,expl:"Règle COLREG 8 : l'action pour éviter un abordage doit être 'large, rapide et positive.' Format SMCP : 'I am altering course to [starboard/port]. New course will be [X] degrees [true/magnetic]. I am doing so to avoid collision with [vessel/danger on my port/starboard bow/quarter].' Navire sur bossoir bâbord → virer à tribord (COLREG Règle 16 — navire manœuvrant). Navire sur bossoir tribord → maintenir (navire privilégié Règle 17) OU virer si collision imminente."},
    {q:"Comment signaler l'entrée dans un Dispositif de Séparation du Trafic ?",opts:["Je suis dans le chenal de navigation","I am entering the [name] Traffic Separation Scheme. I am in the [northbound/southbound/inbound/outbound] lane. My course is [X] degrees. Speed [X] knots.","Chenal de navigation devant","Entrée dans le DST"],correct:1,expl:"Rapport SMCP DST : 'I am entering the [nom] TSS. I am in the [direction] lane. My course is [X] degrees. Speed is [X] knots.' Supplément : 'I am crossing the TSS at right angles. My course is [X] degrees.' COLREG Règle 10 régit les DST. Le VTS doit être informé lors de l'entrée dans un DST sous leur juridiction."},
    {q:"Quelle est la réponse SMCP correcte quand le timonier exécute un ordre de barre ?",opts:["OK","[Répéter l'ordre reçu]. Par exemple : 'Tribord vingt — virant tribord vingt degrés.' Puis quand stabilisé : 'Stabilisé sur [X] degrés [vrai/magnétique].'","Fait","Je vire"],correct:1,expl:"Confirmation d'ordre de barre SMCP : la communication en 'boucle fermée' est obligatoire. À l'ordre 'Starboard twenty degrees' : le timonier répond 'Starboard twenty degrees' immédiatement. Quand le navire est stabilisé : 'Steady on two seven five degrees true.' Cela confirme : l'ordre a été entendu correctement, il est exécuté, le navire est sur le nouveau cap."},
    {q:"Comment signaler une pression barométrique en chute rapide ?",opts:["Pression basse","Barometric pressure [X] millibars, rapidly falling. Warning: gale conditions are expected. I am altering course/reducing speed as a precaution.","Basse pression","Mauvais temps arrive"],correct:1,expl:"Chute rapide de pression SMCP : 'Barometric pressure is [X] millibars [hectopascals], rapidly falling. Decrease in the last [3] hours is [X] millibars.' Une chute rapide (> 3 hPa en 3 heures) indique l'approche d'une tempête. Diffuser en SÉCURITÉ pour alerter les autres navires."},
    {q:"Comment convenir d'un arrangement de croisement avec un autre navire ?",opts:["On se voit de l'autre côté","[Nom du navire], ici [votre navire]. Je suis d'accord pour croiser [bâbord sur bâbord / tribord sur tribord]. Je vais [maintenir / modifier] mon cap. Veuillez confirmer. Terminé.","OK on va passer","Arrangement de croisement confirmé"],correct:1,expl:"Arrangement de croisement SMCP : '[Nom du navire], ici [votre nom]. Je propose de croiser [bâbord sur bâbord / tribord sur tribord]. Je vais [maintenir mon cap et ma vitesse / virer à tribord / réduire la vitesse]. Veuillez confirmer.' L'autre navire répond et confirme. Ces arrangements DOIVENT être clairement confirmés par LES DEUX navires avant exécution."},
  ],
  es:[
    {q:"¿Cómo se informa de una alteración de rumbo para evitar un buque en su amura de babor?",opts:["Virando a la derecha","I am altering course to starboard. New course will be [X] degrees true to avoid collision with a vessel on my port bow. Over.","Virando a la izquierda","Cambio de rumbo a babor"],correct:1,expl:"COLREG Regla 8: la acción para evitar el abordaje debe ser 'amplia, temprana y positiva.' Formato SMCP: 'I am altering course to [starboard/port]. New course will be [X] degrees [true/magnetic]. I am doing so to avoid collision with [vessel/danger on my port/starboard bow/quarter].' Buque en amura de babor → virar a estribor (COLREG Regla 16). Buque en amura de estribor → mantener rumbo (Regla 17) O virar si la colisión es inminente."},
    {q:"¿Cómo se informa de la entrada en un Sistema de Dispositivos de Tráfico?",opts:["Estoy en el canal de navegación","I am entering the [name] Traffic Separation Scheme. I am in the [northbound/southbound/inbound/outbound] lane. My course is [X] degrees. Speed [X] knots.","Canal de navegación a la vista","Entrando en el SDT"],correct:1,expl:"Informe SMCP SDT: 'I am entering the [nombre] TSS. I am in the [dirección] lane. My course is [X] degrees. Speed is [X] knots.' Complemento: 'I am crossing the TSS at right angles. My course is [X] degrees.' COLREG Regla 10 rige los SDT. El VTS debe ser informado al entrar en un SDT bajo su jurisdicción."},
    {q:"¿Cuál es la respuesta SMCP correcta cuando el timonel ejecuta una orden de timón?",opts:["OK","[Repetir la orden recibida]. Por ejemplo: 'Estribor veinte — virando a estribor veinte grados.' Luego cuando estabilizado: 'Estabilizado en [X] grados [verdadero/magnético].'","Hecho","Virando"],correct:1,expl:"Confirmación de orden de timón SMCP: la comunicación en 'bucle cerrado' es obligatoria. A la orden 'Starboard twenty degrees': el timonel responde 'Starboard twenty degrees' inmediatamente. Cuando el buque esté estabilizado: 'Steady on two seven five degrees true.' Esto confirma que la orden fue escuchada correctamente, se está ejecutando y el buque está en el nuevo rumbo."},
    {q:"¿Cómo se informa de una presión barométrica en caída rápida?",opts:["Presión baja","Barometric pressure [X] millibars, rapidly falling. Warning: gale conditions are expected. I am altering course/reducing speed as a precaution.","Baja presión","Viene mal tiempo"],correct:1,expl:"Caída rápida de presión SMCP: 'Barometric pressure is [X] millibars [hectopascals], rapidly falling. Decrease in the last [3] hours is [X] millibars.' Una caída rápida (> 3 hPa en 3 horas) indica la aproximación de un temporal. Difundir como SÉCURITÉ para alertar a otros buques."},
    {q:"¿Cómo se acuerda un plan de cruce con otro buque?",opts:["Nos vemos al otro lado","[Nombre del buque], aquí [su buque]. Estoy de acuerdo en cruzar [babor con babor / estribor con estribor]. Voy a [mantener / alterar] el rumbo. Por favor confirme. Cambio.","OK pasaremos","Acuerdo de cruce confirmado"],correct:1,expl:"Acuerdo de cruce SMCP: '[Nombre del buque], aquí [su nombre]. Propongo cruzar [babor con babor / estribor con estribor]. Voy a [mantener mi rumbo y velocidad / virar a estribor / reducir velocidad]. Por favor confirme.' El otro buque responde y confirma. Estos acuerdos DEBEN ser confirmados claramente por AMBOS buques antes de la ejecución."},
  ],
  pt:[
    {q:"Como se reporta uma alteração de rumo para evitar um navio na sua amura de bombordo?",opts:["A virar à direita","I am altering course to starboard. New course will be [X] degrees true to avoid collision with a vessel on my port bow. Over.","A virar à esquerda","Mudança de rumo para bombordo"],correct:1,expl:"COLREG Regra 8: a ação para evitar abalroamento deve ser 'ampla, atempada e positiva.' Formato SMCP: 'I am altering course to [starboard/port]. New course will be [X] degrees [true/magnetic]. I am doing so to avoid collision with [vessel/danger on my port/starboard bow/quarter].' Navio na amura de bombordo → virar a estibordo (COLREG Regra 16). Navio na amura de estibordo → manter rumo (Regra 17) OU virar se abalroamento iminente."},
    {q:"Como se reporta a entrada num Sistema de Separação de Tráfego?",opts:["Estou no canal de navegação","I am entering the [name] Traffic Separation Scheme. I am in the [northbound/southbound/inbound/outbound] lane. My course is [X] degrees. Speed [X] knots.","Canal de navegação à vista","A entrar no SST"],correct:1,expl:"Relatório SMCP SST: 'I am entering the [nome] TSS. I am in the [direção] lane. My course is [X] degrees. Speed is [X] knots.' Complemento: 'I am crossing the TSS at right angles. My course is [X] degrees.' COLREG Regra 10 rege os SST. O VTS deve ser informado ao entrar num SST sob a sua jurisdição."},
    {q:"Qual é a resposta SMCP correta quando o timoneiro executa uma ordem de leme?",opts:["OK","[Repetir a ordem recebida]. Por exemplo: 'Estibordo vinte — a virar a estibordo vinte graus.' Depois quando estabilizado: 'Estabilizado em [X] graus [verdadeiro/magnético].'","Feito","A virar"],correct:1,expl:"Confirmação de ordem de leme SMCP: a comunicação em 'circuito fechado' é obrigatória. À ordem 'Starboard twenty degrees': o timoneiro responde 'Starboard twenty degrees' imediatamente. Quando o navio estiver estabilizado: 'Steady on two seven five degrees true.' Isto confirma que a ordem foi ouvida corretamente, está a ser executada e o navio está no novo rumo."},
    {q:"Como se reporta uma pressão barométrica em queda rápida?",opts:["Pressão baixa","Barometric pressure [X] millibars, rapidly falling. Warning: gale conditions are expected. I am altering course/reducing speed as a precaution.","Baixa pressão","Mau tempo a chegar"],correct:1,expl:"Queda rápida de pressão SMCP: 'Barometric pressure is [X] millibars [hectopascals], rapidly falling. Decrease in the last [3] hours is [X] millibars.' Uma queda rápida (> 3 hPa em 3 horas) indica a aproximação de uma tempestade. Difundir como SÉCURITÉ para alertar outros navios."},
    {q:"Como se acorda um plano de cruzamento com outro navio?",opts:["Vemo-nos do outro lado","[Nome do navio], aqui [o seu navio]. Concordo em cruzar [bombordo com bombordo / estibordo com estibordo]. Vou [manter / alterar] o rumo. Por favor confirme. Mudança.","OK vamos passar","Acordo de cruzamento confirmado"],correct:1,expl:"Acordo de cruzamento SMCP: '[Nome do navio], aqui [o seu nome]. Proponho cruzar [bombordo com bombordo / estibordo com estibordo]. Vou [manter o meu rumo e velocidade / virar a estibordo / reduzir velocidade]. Por favor confirme.' O outro navio responde e confirma. Estes acordos DEVEM ser claramente confirmados por AMBOS os navios antes da execução."},
  ],
};

const BANK = {
  en:[
    {q:"What is 'set and drift' and how do you report it in SMCP?",opts:["Speed and direction of wind","Set = direction the current is flowing TOWARD. Drift = speed of the current in knots. Report: 'Current is setting [X] degrees, drifting [X] knots.'","Tide tables","Vessel drift from leeway"],correct:1,expl:"Set and drift SMCP: 'Set' = direction the current is flowing TOWARD (e.g., set 090 = current flowing eastward). 'Drift' = current speed in knots. Full report: 'Current is setting [X] degrees, drifting [X] knots. Effect on vessel: we are making good track [X] degrees instead of course [X] degrees.' This explains discrepancy between intended course and actual track. Critical for pilotage, anchoring, and collision avoidance calculations."},
    {q:"How do you report a vessel not under command (NUC)?",opts:["Ship broken","I am not under command. I am unable to manoeuvre as required by the Rules. I am exhibiting two all-round red lights [and two black balls by day]. Please keep clear.","Engine failure","Can't steer"],correct:1,expl:"NUC SMCP: 'I am not under command. I am unable to manoeuvre as required by the Collision Regulations. I am [drifting / at anchor]. I am exhibiting NUC signals: two all-round red lights [and two black balls by day]. Please keep well clear and give me priority passage.' Also: 'My position is [lat/long]. I am requesting [tug / salvage / anchor assistance].' Broadcast on CH 16 and update AIS status to NUC (status code 2)."},
    {q:"How do you report a deep-draught vessel constrained by its draught?",opts:["Ship heavy","I am a vessel constrained by my draught. My draught is [X] metres. I have limited ability to deviate from my course. Please keep clear and do not impede my passage.","Cargo vessel","Deep ship"],correct:1,expl:"Constrained by draught SMCP: 'I am a vessel constrained by my draught. My maximum draught is [X] metres forward and [X] metres aft. The water depth in this area is [X] metres. I have limited ability to deviate from my course through this channel/fairway. Other vessels please give me sufficient sea room and do not impede my passage.' COLREG Rule 28: CBD vessel shows 3 vertical red lights and cylinder day shape."},
    {q:"How do you communicate a weather routing change?",opts:["Change of course","Due to weather conditions, I am altering my route. New course is [X] degrees. I am reducing speed to [X] knots. I expect to arrive at [destination] at [revised ETA] UTC.","Route change","Detour required"],correct:1,expl:"Weather routing change SMCP: 'Due to [storm/gale/ice/fog] conditions, I am altering my route. My new course is [X] degrees. I am reducing speed to [X] knots to weather the storm safely. My revised ETA at [port/waypoint] is [time] UTC. I will report my position every [X] hours.' Also notify: port authority (revised ETA), charterers/agents, and any vessels expecting rendezvous."},
    {q:"How do you report overtaking another vessel?",opts:["Passing on the left","I intend to overtake you on your [port/starboard] side. Do you agree? Please answer on channel [X]. Over.","Going past","Overtaking now"],correct:1,expl:"Overtaking SMCP: 'MV [vessel ahead], this is MV [your vessel]. I intend to overtake you on your [port/starboard] side. My speed is [X] knots, yours appears to be [X] knots. Do you agree? Over.' Vessel ahead responds: 'MV [your vessel], this is [vessel ahead]. I agree/do not agree to being overtaken on my [port/starboard] side.' COLREG Rule 13: overtaking vessel must keep clear until past and clear. Sound signals: 2 short = overtaking on starboard, 2+1 short = overtaking on port."},
    {q:"How do you report a navigational hazard to other vessels?",opts:["Warning only in port","SÉCURITÉ SÉCURITÉ SÉCURITÉ. All stations. This is MV [name]. I have observed [navigational hazard description] at position [lat/long]. All vessels in the vicinity are advised to take appropriate precautions.","Radio only","No report needed"],correct:1,expl:"Navigational hazard SMCP: 'SÉCURITÉ SÉCURITÉ SÉCURITÉ. All stations. This is MV [name] on channel 16. I have observed [uncharted wreck / disabled vessel / net buoy / ice / shoaling water] at position Latitude [X], Longitude [X]. [Description of hazard]. All vessels in the vicinity are advised to proceed with caution and take appropriate precautions. Over.' Then switch to CH 16 and repeat the safety message. VTS/coastguard will issue NAVTEX warning if appropriate."},
    {q:"How do you report restricted manoeuvrability (RAM)?",opts:["Busy vessel","I am a vessel restricted in my ability to manoeuvre. I am [dredging / laying cables / conducting survey / replenishment at sea]. I am exhibiting RAM signals. Please keep clear. My position is [lat/long]. Over.","Working vessel","Can't turn"],correct:1,expl:"RAM SMCP: 'I am a vessel restricted in my ability to manoeuvre. I am [dredging / laying/picking up underwater cables / conducting underwater operations / replenishment at sea / launching/recovering aircraft]. I am exhibiting: ball-diamond-ball by day / red-white-red all-round lights by night. I cannot deviate from my current course. Please give me adequate sea room and keep clear.' COLREG Rule 27: RAM vessel has priority over sailing vessels and power-driven vessels."},
    {q:"How do you report ice in SMCP?",opts:["Cold water","I have encountered ice at position [lat/long]. The ice is [pack ice / icebergs / bergy bits / growlers]. Ice extends [X] miles in direction [X] degrees. I am altering course / reducing speed. Vessels in the vicinity please exercise extreme caution.","Ice ahead","Freezing conditions"],correct:1,expl:"Ice report SMCP: 'SÉCURITÉ SÉCURITÉ SÉCURITÉ. All stations. This is MV [name]. I have encountered [pack ice / icebergs / ice floes] at position Latitude [X], Longitude [X]. Ice extends approximately [X] miles from this position in direction [X] degrees. I am altering course to [X] degrees and reducing speed to [X] knots. All vessels in the vicinity are advised to exercise extreme caution and may wish to consider alternative routing. Over.'"},
    {q:"What is 'leeway' and how does it affect SMCP position reporting?",opts:["Direction of sailing","Sideways drift of a vessel due to wind — causes actual track to differ from vessel's heading. Must be accounted for in position and track reports.","Ship leaning","Cargo movement"],correct:1,expl:"Leeway SMCP: Leeway = sideways drift caused by wind pushing the vessel sideways relative to its heading. Effect: a vessel on course 090° with leeway 5° to starboard is actually making good track 095°. In SMCP: 'Our course is [X] degrees. However, due to leeway of approximately [X] degrees, we are making good track of [X] degrees. Wind is from [X] degrees, force [X].' This distinction between course steered and track made good is critical for collision avoidance and navigation planning."},
    {q:"How do you report a vessel aground?",opts:["Stuck on bottom","I am aground at position [lat/long]. I am [able/unable] to refloat under own power. I [do/do not] require tug assistance. My vessel is [stable/listing/flooding]. Over.","Bottom hit","Grounded vessel"],correct:1,expl:"Aground SMCP: 'I am aground at position Latitude [X]°[X]'N, Longitude [X]°[X]'E. Time of grounding [UTC]. Nature of bottom is [rock/sand/mud]. My vessel is [stable/listing X degrees/flooding]. I am [able/unable] to refloat under own power at [high water time]. I [require/do not require] tug/salvage assistance. I am [sounding / not sounding] the appropriate fog signal for vessel aground. Over.' Report as PAN-PAN (urgency) or MAYDAY if flooding."},
    {q:"How do you report a trawler fishing in your path?",opts:["Fish boat ahead","I have a fishing vessel ahead on bearing [X] degrees, range [X] miles. The vessel appears to be trawling. I am altering course to [port/starboard] to avoid interfering with its gear. Over.","Fisherman in the way","Fishing vessel sighted"],correct:1,expl:"Fishing vessel SMCP: 'I have sighted a fishing vessel at bearing [X] degrees, range [X] miles. The vessel appears to be [trawling/fishing with gear extending X miles to the north/south/east/west]. I am altering course to [port/starboard] to give adequate sea room. I will pass [X] miles clear.' COLREG Rule 18: power-driven vessels must keep clear of fishing vessels. Rule 9: in narrow channels, do not impede fishing vessels. If the gear is across the fairway: report to VTS."},
    {q:"How do you report making a position fix by multiple bearings?",opts:["GPS fix","I have obtained a position fix by [cross bearings / radar ranges / transit bearings]. Bearing of [landmark A] is [X] degrees. Bearing of [landmark B] is [X] degrees. Fixed position is Latitude [X], Longitude [X].","Position taken","Navigator fix"],correct:1,expl:"Position fix SMCP: 'I have obtained a position fix by [cross bearings / radar fix / transit line]. Bearing of [lighthouse/headland/landmark] is [X] degrees magnetic. Bearing of [second landmark] is [X] degrees magnetic. [Range to radar target is X miles]. Fixed position: Latitude [X]°[X]'N, Longitude [X]°[X]'E at [time] UTC. Cross-check with GPS: [GPS position matches/discrepancy of X miles in direction X].' Always cross-check primary positioning method with backup."},
    {q:"How do you report a deviation from your planned route?",opts:["Changing course","I am deviating from my planned route due to [weather/traffic/navigational hazard/pilot instructions]. My new course is [X] degrees. My revised ETA is [time] UTC. I will resume my planned route at [waypoint/position].","Route change","Detour made"],correct:1,expl:"Route deviation SMCP: 'I am deviating from my planned route. Reason: [weather avoidance / traffic / hazard / VTS instruction]. My new course is [X] degrees. I will [resume original route at waypoint X / proceed directly to destination]. Revised ETA [port] is [time] UTC.' Notification required to: VTS if in VTS area, port authority (revised ETA), any escort vessel, company/agent. Log the deviation in the deck log with time, position, reason, and authorized by."},
    {q:"What is 'tide gauge' information and how is it used in SMCP?",opts:["Equipment to measure speed","Water level measurement at a fixed point used to determine actual water depth. In SMCP: 'The tide gauge at [location] reads [X] metres above [chart datum / lowest astronomical tide].'","Ocean survey","Ship weight measure"],correct:1,expl:"Tide gauge SMCP: 'The tide gauge at [location] reads [X] metres above chart datum. Current water depth at [berth/channel/bar] is [X] metres. The tide is [rising/falling/at high water/at low water]. Next high water is at [time] UTC, height [X] metres. Clearance under keel at [location]: [X] metres.' Critical for deep-draught vessels: 'I require [X] metres under-keel clearance. Current depth is [X] metres. I will proceed when the tide gauge reaches [X] metres.'"},
  ],
  fr:[
    {q:"Qu'est-ce que 'set and drift' et comment le signaler en SMCP ?",opts:["Vitesse et direction du vent","Set = direction vers laquelle le courant coule. Drift = vitesse du courant en nœuds. Rapport : 'Current is setting [X] degrees, drifting [X] knots.'","Tables des marées","Dérive du navire par vent de travers"],correct:1,expl:"Set and drift SMCP : 'Set' = direction vers laquelle le courant coule (ex : set 090 = courant portant vers l'est). 'Drift' = vitesse du courant en nœuds. Rapport complet : 'Current is setting [X] degrees, drifting [X] knots. Effect on vessel : we are making good track [X] degrees instead of course [X] degrees.' Explique l'écart entre le cap prévu et la route réelle."},
    {q:"Comment signaler un navire sans gouverne (NUC) ?",opts:["Navire en panne","I am not under command. I am unable to manoeuvre as required by the Rules. I am exhibiting two all-round red lights [and two black balls by day]. Please keep clear.","Panne de machine","Ne peux pas gouverner"],correct:1,expl:"NUC SMCP : 'I am not under command. I am unable to manoeuvre as required by the Collision Regulations. I am [drifting / at anchor]. I am exhibiting NUC signals: two all-round red lights [and two black balls by day]. Please keep well clear and give me priority passage.' Mettre à jour le statut AIS en NUC (code 2)."},
    {q:"Comment signaler un navire à tirant d'eau fortement astreint ?",opts:["Navire lourd","I am a vessel constrained by my draught. My draught is [X] metres. I have limited ability to deviate from my course. Please keep clear and do not impede my passage.","Navire cargo","Navire profond"],correct:1,expl:"Navire astreint par son tirant d'eau SMCP : 'I am a vessel constrained by my draught. My maximum draught is [X] metres forward and [X] metres aft. The water depth in this area is [X] metres. I have limited ability to deviate from my course through this channel/fairway. Other vessels please give me sufficient sea room and do not impede my passage.' COLREG Règle 28."},
    {q:"Comment communiquer un changement de route météo ?",opts:["Changement de cap","Due to weather conditions, I am altering my route. New course is [X] degrees. I am reducing speed to [X] knots. I expect to arrive at [destination] at [revised ETA] UTC.","Changement de route","Détour nécessaire"],correct:1,expl:"Changement de route météo SMCP : 'Due to [storm/gale/ice/fog] conditions, I am altering my route. My new course is [X] degrees. I am reducing speed to [X] knots to weather the storm safely. My revised ETA at [port/waypoint] is [heure] UTC. I will report my position every [X] hours.' Notifier également : l'autorité portuaire (ETA révisé), affréteurs/agents."},
    {q:"Comment signaler un dépassement d'un autre navire ?",opts:["Je passe à gauche","I intend to overtake you on your [port/starboard] side. Do you agree? Please answer on channel [X]. Over.","Je passe devant","Dépassement en cours"],correct:1,expl:"Dépassement SMCP : 'MV [navire en avant], ici MV [votre navire]. I intend to overtake you on your [port/starboard] side. My speed is [X] knots, yours appears to be [X] knots. Do you agree? Over.' Le navire en avant répond et confirme. COLREG Règle 13 : le navire qui en dépasse un autre doit le laisser libre de manœuvrer jusqu'à ce qu'il l'ait dépassé et laissé libre."},
    {q:"Comment signaler un danger de navigation aux autres navires ?",opts:["Avertissement seulement au port","SÉCURITÉ SÉCURITÉ SÉCURITÉ. All stations. This is MV [name]. I have observed [navigational hazard description] at position [lat/long]. All vessels in the vicinity are advised to take appropriate precautions.","Par radio seulement","Pas de rapport nécessaire"],correct:1,expl:"Danger de navigation SMCP : 'SÉCURITÉ SÉCURITÉ SÉCURITÉ. Toutes stations. Ici MV [nom] sur canal 16. J'ai observé [épave non cartographiée / navire en avarie / bouée de filet / glace / faible profondeur] en position Latitude [X], Longitude [X]. Tous les navires à proximité sont invités à procéder avec prudence.' Le VTS/garde-côtes émettra un avis NAVTEX si approprié."},
    {q:"Comment signaler une manœuvrabilité restreinte (RAM) ?",opts:["Navire occupé","I am a vessel restricted in my ability to manoeuvre. I am [dredging / laying cables / conducting survey / replenishment at sea]. I am exhibiting RAM signals. Please keep clear. My position is [lat/long]. Over.","Navire de travail","Ne peux pas virer"],correct:1,expl:"RAM SMCP : 'I am a vessel restricted in my ability to manoeuvre. I am [dragage / pose de câbles / opérations sous-marines / ravitaillement en mer]. I am exhibiting: ball-diamond-ball by day / red-white-red all-round lights by night. I cannot deviate from my current course. Please give me adequate sea room and keep clear.' COLREG Règle 27 : priorité du navire RAM sur les voiliers et navires à propulsion mécanique."},
    {q:"Comment signaler de la glace en SMCP ?",opts:["Eau froide","I have encountered ice at position [lat/long]. The ice is [pack ice / icebergs / bergy bits / growlers]. Ice extends [X] miles in direction [X] degrees. I am altering course / reducing speed. Vessels in the vicinity please exercise extreme caution.","Glace devant","Conditions de gel"],correct:1,expl:"Rapport de glace SMCP : 'SÉCURITÉ SÉCURITÉ SÉCURITÉ. Toutes stations. Ici MV [nom]. J'ai rencontré [glace dérivante / icebergs / glaçons] en position Latitude [X], Longitude [X]. La glace s'étend approximativement [X] milles depuis cette position en direction [X] degrés. Je change de cap vers [X] degrés et réduis la vitesse à [X] nœuds.'"},
    {q:"Qu'est-ce que la 'dérive' (leeway) et comment affecte-t-elle les rapports de position SMCP ?",opts:["Direction de navigation","Dérive latérale d'un navire due au vent — fait que la route réelle diffère du cap du navire. Doit être prise en compte dans les rapports de position et de route.","Navire penché","Mouvement de cargaison"],correct:1,expl:"Leeway SMCP : Dérive = glissement latéral causé par le vent poussant le navire latéralement par rapport à son cap. Effet : un navire sur le cap 090° avec une dérive de 5° vers tribord fait en réalité une route de 095°. En SMCP : 'Our course is [X] degrees. However, due to leeway of approximately [X] degrees, we are making good track of [X] degrees. Wind is from [X] degrees, force [X].'"},
    {q:"Comment signaler un navire échoué ?",opts:["Coincé sur le fond","I am aground at position [lat/long]. I am [able/unable] to refloat under own power. I [do/do not] require tug assistance. My vessel is [stable/listing/flooding]. Over.","Fond touché","Navire échoué"],correct:1,expl:"Échoué SMCP : 'I am aground at position Latitude [X]°[X]'N, Longitude [X]°[X]'E. Time of grounding [UTC]. Nature of bottom is [rock/sand/mud]. My vessel is [stable/listing X degrees/flooding]. I am [able/unable] to refloat under own power at [high water time]. I [require/do not require] tug/salvage assistance.' Signaler en PAN-PAN (urgence) ou MAYDAY si envahissement."},
    {q:"Comment signaler un chalutier pêchant sur votre route ?",opts:["Bateau de pêche devant","I have a fishing vessel ahead on bearing [X] degrees, range [X] miles. The vessel appears to be trawling. I am altering course to [port/starboard] to avoid interfering with its gear. Over.","Pêcheur gênant","Navire de pêche en vue"],correct:1,expl:"Navire de pêche SMCP : 'I have sighted a fishing vessel at bearing [X] degrees, range [X] miles. The vessel appears to be [trawling/fishing with gear extending X miles to the north/south]. I am altering course to [port/starboard] to give adequate sea room. I will pass [X] miles clear.' COLREG Règle 18 : les navires à propulsion mécanique doivent s'écarter des navires de pêche."},
    {q:"Comment signaler un relèvement croisé pour un point de position ?",opts:["Point GPS","I have obtained a position fix by [cross bearings / radar ranges]. Bearing of [landmark A] is [X] degrees. Bearing of [landmark B] is [X] degrees. Fixed position is Latitude [X], Longitude [X].","Position prise","Point du navigateur"],correct:1,expl:"Point par relèvements croisés SMCP : 'I have obtained a position fix by [cross bearings / radar fix]. Bearing of [phare/cap/amer] is [X] degrees magnetic. Bearing of [second amer] is [X] degrees magnetic. Fixed position: Latitude [X]°[X]'N, Longitude [X]°[X]'E at [heure] UTC. Cross-check with GPS: [GPS position matches/discrepancy of X miles in direction X].'"},
    {q:"Comment signaler un écart par rapport à votre route planifiée ?",opts:["Changement de cap","I am deviating from my planned route due to [weather/traffic/navigational hazard/pilot instructions]. My new course is [X] degrees. My revised ETA is [time] UTC. I will resume my planned route at [waypoint/position].","Changement de route","Détour effectué"],correct:1,expl:"Écart de route SMCP : 'I am deviating from my planned route. Reason: [évitement météo / trafic / danger / instruction VTS]. My new course is [X] degrees. I will [resume original route at waypoint X / proceed directly to destination]. Revised ETA [port] is [heure] UTC.' Notification à : le VTS si en zone VTS, l'autorité portuaire (ETA révisé), la compagnie/agent."},
    {q:"Qu'est-ce que l'information de 'marégraphe' et comment est-elle utilisée en SMCP ?",opts:["Appareil pour mesurer la vitesse","Mesure du niveau d'eau en un point fixe pour déterminer la profondeur réelle. En SMCP : 'The tide gauge at [location] reads [X] metres above [chart datum].''","Étude océanographique","Mesure du poids du navire"],correct:1,expl:"Marégraphe SMCP : 'The tide gauge at [location] reads [X] metres above chart datum. Current water depth at [poste/chenal/barre] is [X] metres. The tide is [rising/falling/at high water/at low water]. Next high water is at [heure] UTC, height [X] metres.' Critique pour les navires à grand tirant d'eau : 'I require [X] metres under-keel clearance. Current depth is [X] metres. I will proceed when the tide gauge reaches [X] metres.'"},
  ],
  es:[
    {q:"¿Qué es 'set and drift' y cómo se informa en SMCP?",opts:["Velocidad y dirección del viento","Set = dirección hacia la que fluye la corriente. Drift = velocidad de la corriente en nudos. Informe: 'Current is setting [X] degrees, drifting [X] knots.'","Tablas de mareas","Deriva del buque por viento de través"],correct:1,expl:"Set and drift SMCP: 'Set' = dirección hacia la que fluye la corriente (ej.: set 090 = corriente fluyendo hacia el este). 'Drift' = velocidad de la corriente en nudos. Informe completo: 'Current is setting [X] degrees, drifting [X] knots. Effect on vessel: we are making good track [X] degrees instead of course [X] degrees.' Explica la discrepancia entre el rumbo previsto y la derrota real."},
    {q:"¿Cómo se informa de un buque sin gobierno (NUC)?",opts:["Buque averiado","I am not under command. I am unable to manoeuvre as required by the Rules. I am exhibiting two all-round red lights [and two black balls by day]. Please keep clear.","Avería de motor","No puedo gobernar"],correct:1,expl:"NUC SMCP: 'I am not under command. I am unable to manoeuvre as required by the Collision Regulations. I am [drifting / at anchor]. I am exhibiting NUC signals: two all-round red lights [and two black balls by day]. Please keep well clear and give me priority passage.' Actualizar el estado AIS a NUC (código 2)."},
    {q:"¿Cómo se informa de un buque con calado limitante?",opts:["Buque pesado","I am a vessel constrained by my draught. My draught is [X] metres. I have limited ability to deviate from my course. Please keep clear and do not impede my passage.","Buque de carga","Buque profundo"],correct:1,expl:"Buque limitado por su calado SMCP: 'I am a vessel constrained by my draught. My maximum draught is [X] metres forward and [X] metres aft. The water depth in this area is [X] metres. I have limited ability to deviate from my course through this channel/fairway. Other vessels please give me sufficient sea room and do not impede my passage.' COLREG Regla 28."},
    {q:"¿Cómo se comunica un cambio de ruta por meteorología?",opts:["Cambio de rumbo","Due to weather conditions, I am altering my route. New course is [X] degrees. I am reducing speed to [X] knots. I expect to arrive at [destination] at [revised ETA] UTC.","Cambio de ruta","Desvío necesario"],correct:1,expl:"Cambio de ruta meteorológica SMCP: 'Due to [storm/gale/ice/fog] conditions, I am altering my route. My new course is [X] degrees. I am reducing speed to [X] knots to weather the storm safely. My revised ETA at [port/waypoint] is [hora] UTC. I will report my position every [X] hours.' Notificar también: autoridad portuaria (ETA revisada), fletadores/agentes."},
    {q:"¿Cómo se informa de adelantamiento de otro buque?",opts:["Pasando por la izquierda","I intend to overtake you on your [port/starboard] side. Do you agree? Please answer on channel [X]. Over.","Pasando por delante","Adelantamiento en curso"],correct:1,expl:"Adelantamiento SMCP: 'MV [buque por delante], aquí MV [su buque]. I intend to overtake you on your [port/starboard] side. My speed is [X] knots, yours appears to be [X] knots. Do you agree? Over.' El buque de delante responde y confirma. COLREG Regla 13: el buque que adelanta debe mantener libre al buque adelantado hasta que lo haya superado y dejado libre."},
    {q:"¿Cómo se informa de un peligro de navegación a otros buques?",opts:["Advertencia solo en el puerto","SÉCURITÉ SÉCURITÉ SÉCURITÉ. All stations. This is MV [name]. I have observed [navigational hazard description] at position [lat/long]. All vessels in the vicinity are advised to take appropriate precautions.","Solo por radio","No se necesita informe"],correct:1,expl:"Peligro de navegación SMCP: 'SÉCURITÉ SÉCURITÉ SÉCURITÉ. Todas las estaciones. Aquí MV [nombre] en canal 16. He observado [naufragio no cartografiado / buque averiado / boya de red / hielo / poco fondo] en posición Latitud [X], Longitud [X]. Se aconseja a todos los buques de la zona que procedan con precaución.' El VTS/guardacostas emitirá un aviso NAVTEX si procede."},
    {q:"¿Cómo se informa de maniobrabilidad restringida (RAM)?",opts:["Buque ocupado","I am a vessel restricted in my ability to manoeuvre. I am [dredging / laying cables / conducting survey / replenishment at sea]. I am exhibiting RAM signals. Please keep clear. My position is [lat/long]. Over.","Buque de trabajo","No puedo virar"],correct:1,expl:"RAM SMCP: 'I am a vessel restricted in my ability to manoeuvre. I am [dragando / tendiendo cables / realizando operaciones submarinas / aprovisionamiento en el mar]. I am exhibiting: ball-diamond-ball by day / red-white-red all-round lights by night. I cannot deviate from my current course. Please give me adequate sea room and keep clear.' COLREG Regla 27: prioridad del buque RAM sobre veleros y buques de motor."},
    {q:"¿Cómo se informa de hielo en SMCP?",opts:["Agua fría","I have encountered ice at position [lat/long]. The ice is [pack ice / icebergs / bergy bits / growlers]. Ice extends [X] miles in direction [X] degrees. I am altering course / reducing speed. Vessels in the vicinity please exercise extreme caution.","Hielo a la vista","Condiciones de hielo"],correct:1,expl:"Informe de hielo SMCP: 'SÉCURITÉ SÉCURITÉ SÉCURITÉ. Todas las estaciones. Aquí MV [nombre]. He encontrado [hielo de pack / icebergs / bloques de hielo] en posición Latitud [X], Longitud [X]. El hielo se extiende aproximadamente [X] millas desde esta posición en dirección [X] grados. Estoy alterando el rumbo a [X] grados y reduciendo la velocidad a [X] nudos.'"},
    {q:"¿Qué es la 'deriva' (leeway) y cómo afecta a los informes de posición SMCP?",opts:["Dirección de navegación","Deriva lateral de un buque debida al viento — hace que la derrota real difiera del rumbo del buque. Debe tenerse en cuenta en los informes de posición y derrota.","Buque inclinado","Movimiento de la carga"],correct:1,expl:"Leeway SMCP: Leeway = deslizamiento lateral causado por el viento que empuja el buque lateralmente respecto a su rumbo. En SMCP: 'Our course is [X] degrees. However, due to leeway of approximately [X] degrees, we are making good track of [X] degrees. Wind is from [X] degrees, force [X].'"},
    {q:"¿Cómo se informa de un buque varado?",opts:["Atascado en el fondo","I am aground at position [lat/long]. I am [able/unable] to refloat under own power. I [do/do not] require tug assistance. My vessel is [stable/listing/flooding]. Over.","Fondo tocado","Buque varado"],correct:1,expl:"Varado SMCP: 'I am aground at position Latitude [X]°[X]'N, Longitude [X]°[X]'E. Time of grounding [UTC]. Nature of bottom is [rock/sand/mud]. My vessel is [stable/listing X degrees/flooding]. I am [able/unable] to refloat under own power at [high water time]. I [require/do not require] tug/salvage assistance.' Informar como PAN-PAN (urgencia) o MAYDAY si hay inundación."},
    {q:"¿Cómo se informa de un arrastrero pescando en su ruta?",opts:["Barco de pesca a la vista","I have a fishing vessel ahead on bearing [X] degrees, range [X] miles. The vessel appears to be trawling. I am altering course to [port/starboard] to avoid interfering with its gear. Over.","Pescador en el camino","Buque pesquero avistado"],correct:1,expl:"Buque pesquero SMCP: 'I have sighted a fishing vessel at bearing [X] degrees, range [X] miles. The vessel appears to be [trawling/fishing with gear extending X miles]. I am altering course to [port/starboard] to give adequate sea room. I will pass [X] miles clear.' COLREG Regla 18: los buques de propulsión mecánica deben ceder el paso a los buques de pesca."},
    {q:"¿Cómo se informa de marcaciones cruzadas para una posición?",opts:["Posición GPS","I have obtained a position fix by [cross bearings / radar ranges]. Bearing of [landmark A] is [X] degrees. Bearing of [landmark B] is [X] degrees. Fixed position is Latitude [X], Longitude [X].","Posición tomada","Punto del navegante"],correct:1,expl:"Posición por marcaciones cruzadas SMCP: 'I have obtained a position fix by [cross bearings / radar fix]. Bearing of [faro/cabo/referencia] is [X] degrees magnetic. Bearing of [segunda referencia] is [X] degrees magnetic. Fixed position: Latitude [X]°[X]'N, Longitude [X]°[X]'E at [hora] UTC.' Siempre verificar con GPS u otro método de respaldo."},
    {q:"¿Cómo se informa de una desviación de la ruta planificada?",opts:["Cambio de rumbo","I am deviating from my planned route due to [weather/traffic/navigational hazard/pilot instructions]. My new course is [X] degrees. My revised ETA is [time] UTC. I will resume my planned route at [waypoint/position].","Cambio de ruta","Desvío realizado"],correct:1,expl:"Desviación de ruta SMCP: 'I am deviating from my planned route. Reason: [evitación meteorológica / tráfico / peligro / instrucción VTS]. My new course is [X] degrees. I will [resume original route at waypoint X / proceed directly to destination]. Revised ETA [puerto] is [hora] UTC.' Notificar a: VTS si está en zona VTS, autoridad portuaria (ETA revisada), empresa/agente."},
    {q:"¿Qué es la información del 'mareógrafo' y cómo se usa en SMCP?",opts:["Aparato para medir la velocidad","Medición del nivel del agua en un punto fijo para determinar la profundidad real. En SMCP: 'The tide gauge at [location] reads [X] metres above [chart datum].'","Estudio oceanográfico","Medición del peso del buque"],correct:1,expl:"Mareógrafo SMCP: 'The tide gauge at [location] reads [X] metres above chart datum. Current water depth at [muelle/canal/barra] is [X] metres. The tide is [rising/falling/at high water/at low water]. Next high water is at [hora] UTC, height [X] metres.' Crítico para buques de gran calado: 'I require [X] metres under-keel clearance. Current depth is [X] metres. I will proceed when the tide gauge reaches [X] metres.'"},
  ],
  pt:[
    {q:"O que é 'set and drift' e como se reporta em SMCP?",opts:["Velocidade e direção do vento","Set = direção para onde a corrente flui. Drift = velocidade da corrente em nós. Relatório: 'Current is setting [X] degrees, drifting [X] knots.'","Tabelas de marés","Deriva do navio pelo vento de través"],correct:1,expl:"Set and drift SMCP: 'Set' = direção para onde a corrente flui (ex.: set 090 = corrente a fluir para leste). 'Drift' = velocidade da corrente em nós. Relatório completo: 'Current is setting [X] degrees, drifting [X] knots. Effect on vessel: we are making good track [X] degrees instead of course [X] degrees.' Explica a discrepância entre o rumo previsto e a rota real."},
    {q:"Como se reporta um navio sem governo (NUC)?",opts:["Navio avariado","I am not under command. I am unable to manoeuvre as required by the Rules. I am exhibiting two all-round red lights [and two black balls by day]. Please keep clear.","Avaria de motor","Não consigo governar"],correct:1,expl:"NUC SMCP: 'I am not under command. I am unable to manoeuvre as required by the Collision Regulations. I am [drifting / at anchor]. I am exhibiting NUC signals: two all-round red lights [and two black balls by day]. Please keep well clear and give me priority passage.' Atualizar o estado AIS para NUC (código 2)."},
    {q:"Como se reporta um navio com calado limitante?",opts:["Navio pesado","I am a vessel constrained by my draught. My draught is [X] metres. I have limited ability to deviate from my course. Please keep clear and do not impede my passage.","Navio de carga","Navio profundo"],correct:1,expl:"Navio limitado pelo calado SMCP: 'I am a vessel constrained by my draught. My maximum draught is [X] metres forward and [X] metres aft. The water depth in this area is [X] metres. I have limited ability to deviate from my course through this channel/fairway. Other vessels please give me sufficient sea room and do not impede my passage.' COLREG Regra 28."},
    {q:"Como se comunica uma alteração de rota por meteorologia?",opts:["Mudança de rumo","Due to weather conditions, I am altering my route. New course is [X] degrees. I am reducing speed to [X] knots. I expect to arrive at [destination] at [revised ETA] UTC.","Mudança de rota","Desvio necessário"],correct:1,expl:"Alteração de rota meteorológica SMCP: 'Due to [storm/gale/ice/fog] conditions, I am altering my route. My new course is [X] degrees. I am reducing speed to [X] knots to weather the storm safely. My revised ETA at [port/waypoint] is [hora] UTC. I will report my position every [X] hours.' Notificar também: autoridade portuária (ETA revisto), fretadores/agentes."},
    {q:"Como se reporta uma ultrapassagem de outro navio?",opts:["A passar pela esquerda","I intend to overtake you on your [port/starboard] side. Do you agree? Please answer on channel [X]. Over.","A passar à frente","Ultrapassagem em curso"],correct:1,expl:"Ultrapassagem SMCP: 'MV [navio à frente], aqui MV [o seu navio]. I intend to overtake you on your [port/starboard] side. My speed is [X] knots, yours appears to be [X] knots. Do you agree? Over.' O navio da frente responde e confirma. COLREG Regra 13: o navio que ultrapassa deve manter-se afastado do navio ultrapassado até o ter deixado livre."},
    {q:"Como se reporta um perigo de navegação para outros navios?",opts:["Aviso apenas no porto","SÉCURITÉ SÉCURITÉ SÉCURITÉ. All stations. This is MV [name]. I have observed [navigational hazard description] at position [lat/long]. All vessels in the vicinity are advised to take appropriate precautions.","Apenas por rádio","Sem relatório necessário"],correct:1,expl:"Perigo de navegação SMCP: 'SÉCURITÉ SÉCURITÉ SÉCURITÉ. Todas as estações. Aqui MV [nome] no canal 16. Observei [naufrágio não cartografado / navio avariado / boia de rede / gelo / pouca profundidade] em posição Latitude [X], Longitude [X]. Todos os navios na vizinhança são aconselhados a proceder com precaução.' O VTS/guarda-costeira emitirá aviso NAVTEX se adequado."},
    {q:"Como se reporta manobabilidade restrita (RAM)?",opts:["Navio ocupado","I am a vessel restricted in my ability to manoeuvre. I am [dredging / laying cables / conducting survey / replenishment at sea]. I am exhibiting RAM signals. Please keep clear. My position is [lat/long]. Over.","Navio de trabalho","Não consigo virar"],correct:1,expl:"RAM SMCP: 'I am a vessel restricted in my ability to manoeuvre. I am [a dragar / a tender cabos / a realizar operações submarinas / reabastecimento no mar]. I am exhibiting: ball-diamond-ball by day / red-white-red all-round lights by night. I cannot deviate from my current course. Please give me adequate sea room and keep clear.' COLREG Regra 27: prioridade do navio RAM sobre veleiros e navios a motor."},
    {q:"Como se reporta gelo em SMCP?",opts:["Água fria","I have encountered ice at position [lat/long]. The ice is [pack ice / icebergs / bergy bits / growlers]. Ice extends [X] miles in direction [X] degrees. I am altering course / reducing speed. Vessels in the vicinity please exercise extreme caution.","Gelo à vista","Condições de gelo"],correct:1,expl:"Relatório de gelo SMCP: 'SÉCURITÉ SÉCURITÉ SÉCURITÉ. Todas as estações. Aqui MV [nome]. Encontrei [gelo de deriva / icebergs / blocos de gelo] em posição Latitude [X], Longitude [X]. O gelo estende-se aproximadamente [X] milhas desta posição em direção [X] graus. Estou a alterar o rumo para [X] graus e a reduzir a velocidade para [X] nós.'"},
    {q:"O que é a 'deriva' (leeway) e como afeta os relatórios de posição SMCP?",opts:["Direção de navegação","Deriva lateral de um navio devido ao vento — faz com que a rota real difira do rumo do navio. Deve ser tida em conta nos relatórios de posição e rota.","Navio a adornar","Movimento da carga"],correct:1,expl:"Leeway SMCP: Leeway = deslizamento lateral causado pelo vento que empurra o navio lateralmente em relação ao seu rumo. Em SMCP: 'Our course is [X] degrees. However, due to leeway of approximately [X] degrees, we are making good track of [X] degrees. Wind is from [X] degrees, force [X].'"},
    {q:"Como se reporta um navio encalhado?",opts:["Preso no fundo","I am aground at position [lat/long]. I am [able/unable] to refloat under own power. I [do/do not] require tug assistance. My vessel is [stable/listing/flooding]. Over.","Fundo tocado","Navio encalhado"],correct:1,expl:"Encalhado SMCP: 'I am aground at position Latitude [X]°[X]'N, Longitude [X]°[X]'E. Time of grounding [UTC]. Nature of bottom is [rock/sand/mud]. My vessel is [stable/listing X degrees/flooding]. I am [able/unable] to refloat under own power at [high water time]. I [require/do not require] tug/salvage assistance.' Reportar como PAN-PAN (urgência) ou MAYDAY se houver inundação."},
    {q:"Como se reporta um arrastão a pescar na sua rota?",opts:["Barco de pesca à vista","I have a fishing vessel ahead on bearing [X] degrees, range [X] miles. The vessel appears to be trawling. I am altering course to [port/starboard] to avoid interfering with its gear. Over.","Pescador no caminho","Navio de pesca avistado"],correct:1,expl:"Navio de pesca SMCP: 'I have sighted a fishing vessel at bearing [X] degrees, range [X] miles. The vessel appears to be [trawling/fishing with gear extending X miles]. I am altering course to [port/starboard] to give adequate sea room. I will pass [X] miles clear.' COLREG Regra 18: navios a motor devem dar passagem a navios de pesca."},
    {q:"Como se reportam marcações cruzadas para uma posição?",opts:["Posição GPS","I have obtained a position fix by [cross bearings / radar ranges]. Bearing of [landmark A] is [X] degrees. Bearing of [landmark B] is [X] degrees. Fixed position is Latitude [X], Longitude [X].","Posição tomada","Ponto do navegador"],correct:1,expl:"Posição por marcações cruzadas SMCP: 'I have obtained a position fix by [cross bearings / radar fix]. Bearing of [farol/cabo/referência] is [X] degrees magnetic. Bearing of [segunda referência] is [X] degrees magnetic. Fixed position: Latitude [X]°[X]'N, Longitude [X]°[X]'E at [hora] UTC.' Sempre verificar com GPS ou outro método de reserva."},
    {q:"Como se reporta um desvio da rota planeada?",opts:["Mudança de rumo","I am deviating from my planned route due to [weather/traffic/navigational hazard/pilot instructions]. My new course is [X] degrees. My revised ETA is [time] UTC. I will resume my planned route at [waypoint/position].","Mudança de rota","Desvio realizado"],correct:1,expl:"Desvio de rota SMCP: 'I am deviating from my planned route. Reason: [evitação meteorológica / tráfego / perigo / instrução VTS]. My new course is [X] degrees. I will [resume original route at waypoint X / proceed directly to destination]. Revised ETA [porto] is [hora] UTC.' Notificar: VTS se em zona VTS, autoridade portuária (ETA revisto), empresa/agente."},
    {q:"O que é a informação do 'marégrafo' e como é usado em SMCP?",opts:["Aparelho para medir a velocidade","Medição do nível da água num ponto fixo para determinar a profundidade real. Em SMCP: 'The tide gauge at [location] reads [X] metres above [chart datum].'","Estudo oceanográfico","Medição do peso do navio"],correct:1,expl:"Marégrafo SMCP: 'The tide gauge at [location] reads [X] metres above chart datum. Current water depth at [cais/canal/barra] is [X] metres. The tide is [rising/falling/at high water/at low water]. Next high water is at [hora] UTC, height [X] metres.' Crítico para navios de grande calado: 'I require [X] metres under-keel clearance. Current depth is [X] metres. I will proceed when the tide gauge reaches [X] metres.'"},
  ],
};

function QuestionBank({ lang, onComplete }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.en;const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else {setDone(true);if(onComplete)onComplete();}};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,margin:"8px 0 4px"}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
    <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.nav},${C.maneuver})`}}/></div>
    <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
      {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:11,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4,fontFamily:"'Courier New',monospace"}}>{opt}</button>;})}
    </div>
    {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
    <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.nav},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
  </div>);
}

function Stars(){const [s,setS]=useState<{x:number;y:number;sz:number;dur:number;delay:number}[]>([]);useEffect(()=>{setS(Array.from({length:10},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6})));},[]);return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.3}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.nav}33,${C.maneuver}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"6px 16px",borderRadius:20,background:`${C.nav}15`,border:`1px solid ${C.nav}44`,fontSize:14,color:C.nav,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.nav}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.nav,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.nav:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4,fontFamily:"'Courier New',monospace"}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white,fontFamily:"'Nunito',sans-serif"}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.nav},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d={
    en:{
      badge:"🧭 Maritime English SMCP · Lesson 4/8 · ⭐ Premium · 200 XP",
      title:"Navigation & Maneuvering SMCP",
      intro:"Precise SMCP navigation phrases are the difference between a safe passage and a collision. From position reporting to helm orders, from fog procedures to Traffic Separation Schemes — this lesson covers all standard navigation and maneuvering communications.",
      p1:"PART 1 — NAVIGATION FLASHCARDS",s1t:"Position · Collision avoidance · Fog · TSS",
      s1:"KEY NAVIGATION PHRASES:\n\nPOSITION:\n'Our position is Lat [X]°[X]'N, Long [X]°[X]'E.\nLast fix at [time] UTC by GPS.'\n\nCOLLISION AVOIDANCE:\n'I am altering course to starboard.\nNew course will be [X] degrees true.'\n\nFOG:\n'Visibility is [X] miles.\nI am sounding fog signals Rule 35.'\n\nTSS:\n'I am entering the [name] TSS.\nI am in the [direction] lane.'",
      p2:"PART 2 — WEATHER REPORTING",s1t:"Wind · Sea state · Visibility · Pressure",
      s2:"WIND: 'Wind direction [X] degrees. Wind force [Beaufort]. Wind speed [X] knots.'\n\nSEA STATE: 'Sea state [term]. Wave height [X] metres.'\nTerms: Calm · Smooth · Slight · Moderate · Rough · Very rough · High · Very high · Phenomenal\n\nVISIBILITY: 'Good / Moderate / Poor / Fog'\n\nPRESSURE: 'Barometric pressure [X] millibars, [rising/falling/steady].'",
      p3:"PART 3 — MANEUVERING ORDERS",s1t:"Helm · Engine · Anchor orders",
      s3:"HELM ORDERS:\nStarboard [X] degrees → Turn right\nPort [X] degrees → Turn left\nMidships → Rudder straight\nSteady on [X] degrees → Hold this course\n\nENGINE ORDERS:\nFull / Half / Slow / Dead slow ahead\nStop engines\nDead slow / Slow / Half / Full astern\n\nANCHOR:\nLet go [port/starboard] anchor\nHeave in / up · Anchor is aweigh",
      p4:"PART 4 — NAVIGATION QUIZ",s1t:"5 practical scenarios",
      s4:"REMEMBER:\nStarboard = right · Port = left\nRough sea = 2.5-4m waves\nStop engines = 2 words\nFog = visibility < 1,000 metres\nTSS crossing = at right angles",
      p5:"🎯 EXERCISES",p6:"📝 QUESTION BANK — 15 QUESTIONS",
      sumT:"SUMMARY — NAVIGATION & MANEUVERING L4",
      sumP:["Position: Lat [X]°[X]'N, Long [X]°[X]'E + method + time","Course alteration: 'I am altering course to [starboard/port]. New course [X] degrees.'","Fog: visibility [X] miles + reduced speed + fog signals Rule 35","TSS: state lane direction + course + speed to VTS","Wind: direction degrees + Beaufort + knots + gusts","Sea state: Calm/Slight/Moderate/Rough/Very rough/High/Phenomenal","Helm: Starboard/Port [X] degrees · Midships · Steady on [X]","Engine: Full/Half/Slow/Dead slow ahead/Stop/astern sequence"],
      learnedP:["Navigation flashcards: position · collision avoidance · fog · TSS","Weather reporting: wind · sea state · visibility · pressure","Helm orders: Starboard · Port · Midships · Steady","Engine orders: full ahead to full astern sequence","Anchor commands: let go · heave in · aweigh · dragging"],
    },
    fr:{
      badge:"🧭 Anglais Maritime SMCP · Leçon 4/8 · ⭐ Premium · 200 XP",
      title:"Navigation & Manœuvres SMCP",
      intro:"Des phrases SMCP de navigation précises font la différence entre un passage sûr et une collision. Position, anti-abordage, brouillard, DST — cette leçon couvre toutes les communications de navigation et de manœuvre.",
      p1:"PARTIE 1 — FICHES NAVIGATION",s1t:"Position · Anti-abordage · Brouillard · DST",
      s1:"PHRASES CLÉS DE NAVIGATION :\n\nPOSITION :\n'Our position is Lat [X]°[X]'N, Long [X]°[X]'E.\nLast fix at [heure] UTC by GPS.'\n\nANTI-ABORDAGE :\n'I am altering course to starboard.\nNew course will be [X] degrees true.'\n\nBROUILLARD :\n'Visibility is [X] miles.\nI am sounding fog signals Rule 35.'\n\nDST :\n'I am entering the [nom] TSS.\nI am in the [direction] lane.'",
      p2:"PARTIE 2 — RAPPORT MÉTÉO",s1t:"Vent · État de la mer · Visibilité · Pression",
      s2:"VENT : 'Wind direction [X] degrees. Wind force [Beaufort]. Wind speed [X] knots.'\n\nÉTAT DE LA MER : 'Sea state [terme]. Wave height [X] metres.'\nTermes : Calm · Smooth · Slight · Moderate · Rough · Very rough · High · Very high · Phenomenal\n\nVISIBILITÉ : 'Good / Moderate / Poor / Fog'\n\nPRESSION : 'Barometric pressure [X] millibars, [rising/falling/steady].'",
      p3:"PARTIE 3 — ORDRES DE MANŒUVRE",s1t:"Barre · Machine · Mouillage",
      s3:"ORDRES DE BARRE :\nStarboard [X] degrees → Virer à droite\nPort [X] degrees → Virer à gauche\nMidships → Barre droite\nSteady on [X] degrees → Stabiliser ce cap\n\nORDRES DE MACHINE :\nFull / Half / Slow / Dead slow ahead\nStop engines\nDead slow / Slow / Half / Full astern\n\nMOUILLAGE :\nLet go [port/starboard] anchor\nHeave in · Anchor is aweigh",
      p4:"PARTIE 4 — QUIZ NAVIGATION",s1t:"5 scénarios pratiques",
      s4:"RAPPELS :\nStarboard = droite · Port = gauche\nMer agitée = vagues 2,5-4m\nArrêt machine = 2 mots\nBrouillard = visibilité < 1 000 mètres\nTraverser DST = à angle droit",
      p5:"🎯 EXERCICES",p6:"📝 BANQUE 15 QUESTIONS",
      sumT:"RÉSUMÉ — NAVIGATION & MANŒUVRES L4",
      sumP:["Position : Lat [X]°[X]'N, Long [X]°[X]'E + méthode + heure","Changement de cap : 'I am altering course to [starboard/port]. New course [X] degrees.'","Brouillard : visibilité [X] milles + vitesse réduite + signaux brouillard Règle 35","DST : indiquer direction voie + cap + vitesse au VTS","Vent : degrés direction + Beaufort + nœuds + rafales","État mer : Calm/Slight/Moderate/Rough/Very rough/High/Phenomenal","Barre : Starboard/Port [X] degrees · Midships · Steady on [X]","Machine : séquence full ahead à full astern"],
      learnedP:["Fiches navigation : position · anti-abordage · brouillard · DST","Rapport météo : vent · état mer · visibilité · pression","Ordres de barre : Starboard · Port · Midships · Steady","Ordres de machine : séquence full ahead à full astern","Ordres mouillage : let go · heave in · aweigh · dragging"],
    },
    es:{
      badge:"🧭 Inglés Marítimo SMCP · Lección 4/8 · ⭐ Premium · 200 XP",
      title:"Navegación y Maniobras SMCP",
      intro:"Las frases SMCP de navegación precisas marcan la diferencia entre un pasaje seguro y una colisión. Posición, prevención de abordajes, niebla, SDT — esta lección cubre todas las comunicaciones de navegación y maniobras.",
      p1:"PARTE 1 — FICHAS NAVEGACIÓN",s1t:"Posición · Prevención abordajes · Niebla · SDT",
      s1:"FRASES CLAVE DE NAVEGACIÓN:\n\nPOSICIÓN: 'Our position is Lat [X]°[X]'N, Long [X]°[X]'E. Last fix at [hora] UTC by GPS.'\nPREVENCIÓN ABORDAJES: 'I am altering course to starboard. New course will be [X] degrees true.'\nNIEBLA: 'Visibility is [X] miles. I am sounding fog signals Rule 35.'\nSDT: 'I am entering the [nombre] TSS. I am in the [dirección] lane.'",
      p2:"PARTE 2 — INFORME METEOROLÓGICO",s1t:"Viento · Estado mar · Visibilidad · Presión",
      s2:"VIENTO: 'Wind direction [X] degrees. Wind force [Beaufort]. Wind speed [X] knots.'\nESTADO MAR: 'Sea state [término]. Wave height [X] metres.'\nVISIBILIDAD: 'Good / Moderate / Poor / Fog'\nPRESIÓN: 'Barometric pressure [X] millibars, [rising/falling/steady].'",
      p3:"PARTE 3 — ÓRDENES DE MANIOBRA",s1t:"Timón · Máquinas · Fondeo",
      s3:"ÓRDENES DE TIMÓN:\nStarboard [X] degrees → Girar a la derecha\nPort [X] degrees → Girar a la izquierda\nMidships → Timón al centro\nSteady on [X] degrees → Estabilizar este rumbo\n\nÓRDENES DE MÁQUINAS:\nFull/Half/Slow/Dead slow ahead · Stop engines\nDead slow/Slow/Half/Full astern\n\nFONDEO:\nLet go [port/starboard] anchor · Heave in · Anchor is aweigh",
      p4:"PARTE 4 — QUIZ NAVEGACIÓN",s1t:"5 escenarios prácticos",
      s4:"RECORDAR:\nStarboard = derecha · Port = izquierda\nMar gruesa = olas 2.5-4m · Stop engines = 2 palabras\nNiebla = visibilidad < 1.000 m · Cruzar SDT = en ángulo recto",
      p5:"🎯 EJERCICIOS",p6:"📝 BANCO 15 PREGUNTAS",
      sumT:"RESUMEN — NAVEGACIÓN Y MANIOBRAS L4",
      sumP:["Posición: Lat [X]°[X]'N, Long [X]°[X]'E + método + hora","Cambio de rumbo: 'I am altering course to [starboard/port]. New course [X] degrees.'","Niebla: visibilidad [X] millas + velocidad reducida + señales niebla Regla 35","SDT: indicar dirección carril + rumbo + velocidad al VTS","Viento: grados dirección + Beaufort + nudos + rachas","Estado mar: Calm/Slight/Moderate/Rough/Very rough/High/Phenomenal","Timón: Starboard/Port [X] degrees · Midships · Steady on [X]","Máquinas: secuencia full ahead a full astern"],
      learnedP:["Fichas navegación: posición · prevención abordajes · niebla · SDT","Informe meteorológico: viento · estado mar · visibilidad · presión","Órdenes de timón: Starboard · Port · Midships · Steady","Órdenes de máquinas: secuencia full ahead a full astern","Órdenes fondeo: let go · heave in · aweigh · dragging"],
    },
    pt:{
      badge:"🧭 Inglês Marítimo SMCP · Lição 4/8 · ⭐ Premium · 200 XP",
      title:"Navegação e Manobras SMCP",
      intro:"Frases SMCP de navegação precisas fazem a diferença entre uma passagem segura e um abalroamento. Posição, prevenção de abalroamentos, nevoeiro, SST — esta lição cobre todas as comunicações de navegação e manobras.",
      p1:"PARTE 1 — FICHAS NAVEGAÇÃO",s1t:"Posição · Prevenção abalroamentos · Nevoeiro · SST",
      s1:"FRASES CHAVE DE NAVEGAÇÃO:\n\nPOSIÇÃO: 'Our position is Lat [X]°[X]'N, Long [X]°[X]'E. Last fix at [hora] UTC by GPS.'\nPREVENÇÃO ABALROAMENTOS: 'I am altering course to starboard. New course will be [X] degrees true.'\nNEVOEIRO: 'Visibility is [X] miles. I am sounding fog signals Rule 35.'\nSST: 'I am entering the [nome] TSS. I am in the [direção] lane.'",
      p2:"PARTE 2 — RELATÓRIO METEOROLÓGICO",s1t:"Vento · Estado mar · Visibilidade · Pressão",
      s2:"VENTO: 'Wind direction [X] degrees. Wind force [Beaufort]. Wind speed [X] knots.'\nESTADO MAR: 'Sea state [termo]. Wave height [X] metres.'\nVISIBILIDADE: 'Good / Moderate / Poor / Fog'\nPRESSÃO: 'Barometric pressure [X] millibars, [rising/falling/steady].'",
      p3:"PARTE 3 — ORDENS DE MANOBRA",s1t:"Leme · Máquinas · Fundeamento",
      s3:"ORDENS DE LEME:\nStarboard [X] degrees → Virar à direita\nPort [X] degrees → Virar à esquerda\nMidships → Leme ao centro\nSteady on [X] degrees → Estabilizar este rumo\n\nORDENS DE MÁQUINAS:\nFull/Half/Slow/Dead slow ahead · Stop engines\nDead slow/Slow/Half/Full astern\n\nFUNDEAMENTO:\nLet go [port/starboard] anchor · Heave in · Anchor is aweigh",
      p4:"PARTE 4 — QUIZ NAVEGAÇÃO",s1t:"5 cenários práticos",
      s4:"LEMBRAR:\nStarboard = direita · Port = esquerda\nMar agitado = ondas 2.5-4m · Stop engines = 2 palavras\nNevoeiro = visibilidade < 1.000m · Cruzar SST = em ângulo recto",
      p5:"🎯 EXERCÍCIOS",p6:"📝 BANCO 15 QUESTÕES",
      sumT:"RESUMO — NAVEGAÇÃO E MANOBRAS L4",
      sumP:["Posição: Lat [X]°[X]'N, Long [X]°[X]'E + método + hora","Alteração de rumo: 'I am altering course to [starboard/port]. New course [X] degrees.'","Nevoeiro: visibilidade [X] milhas + velocidade reduzida + sinais nevoeiro Regra 35","SST: indicar direção da faixa + rumo + velocidade ao VTS","Vento: graus direção + Beaufort + nós + rajadas","Estado mar: Calm/Slight/Moderate/Rough/Very rough/High/Phenomenal","Leme: Starboard/Port [X] degrees · Midships · Steady on [X]","Máquinas: sequência full ahead a full astern"],
      learnedP:["Fichas navegação: posição · prevenção abalroamentos · nevoeiro · SST","Relatório meteorológico: vento · estado mar · visibilidade · pressão","Ordens de leme: Starboard · Port · Midships · Steady","Ordens de máquinas: sequência full ahead a full astern","Ordens fundeamento: let go · heave in · aweigh · dragging"],
    },
  };
  return d[lang]||d.en;
};

export default function LessonSMCP_L4({ lang="en", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, onQuizScored=(score:number,maxScore:number)=>{} }) {
  const t=T[lang]||T.en;const quiz=QUIZ[lang]||QUIZ.en;const lc=getContent(lang);
  const [phase, setPhase] = useState("content");
  const [bankDone, setBankDone] = useState(false);const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#000c14 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.nav}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.nav,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🧭 {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 4/8":lang==="en"?"Lesson 4/8":lang==="es"?"Lección 4/8":"Lição 4/8"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.nav,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.nav},${C.maneuver},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:`${C.nav}15`,border:`1px solid ${C.nav}44`,fontSize:11,color:C.nav,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.nav}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>
            <SL icon="📍" text={lc.p1} color={C.nav}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,background:"rgba(0,8,18,0.7)",border:`1px solid ${C.nav}22`}}>
              <div style={{fontSize:11,color:C.nav,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📍 {lang==="fr"?"FICHES NAVIGATION SMCP":lang==="en"?"SMCP NAVIGATION FLASHCARDS":lang==="es"?"FICHAS NAVEGACIÓN SMCP":"FICHAS NAVEGAÇÃO SMCP"}</div>
              <NavPhrasesSimSVG lang={lang}/>
            </Card>
            <SL icon="🌦️" text={lc.p2} color={C.weather}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.weather}22`}}>
              <div style={{fontSize:11,color:C.weather,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🌦️ {lang==="fr"?"RAPPORT MÉTÉO SMCP":lang==="en"?"SMCP WEATHER REPORTING":lang==="es"?"INFORME METEOROLÓGICO SMCP":"RELATÓRIO METEOROLÓGICO SMCP"}</div>
              <WeatherReportSVG lang={lang}/>
            </Card>
            <SL icon="⚙️" text={lc.p3} color={C.maneuver}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.maneuver}22`}}>
              <div style={{fontSize:11,color:C.maneuver,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>⚙️ {lang==="fr"?"ORDRES DE MANŒUVRE SMCP":lang==="en"?"SMCP MANEUVERING ORDERS":lang==="es"?"ÓRDENES DE MANIOBRA SMCP":"ORDENS DE MANOBRA SMCP"}</div>
              <ManeuveringOrdersSVG lang={lang}/>
            </Card>
            <SL icon="🎯" text={lc.p4} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}33`}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🎯 {lang==="fr"?"QUIZ NAVIGATION":lang==="en"?"NAVIGATION QUIZ":lang==="es"?"QUIZ NAVEGACIÓN":"QUIZ NAVEGAÇÃO"}</div>
              <NavQuizSVG lang={lang}/>
            </Card>
            <SL icon="📝" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>
            <SL icon="📚" text={lc.p6} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} onComplete={()=>setBankDone(true)}/></Card>
            <Card style={{marginBottom:14,background:`${C.nav}08`,border:`1px solid ${C.nav}22`}}>
              <div style={{fontSize:11,color:C.nav,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:11,color:C.white}}><span style={{color:C.nav,fontWeight:700,fontFamily:"'Courier New',monospace"}}>✓</span>{pt}</div>)}
            </Card>
            <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.nav},${C.maneuver},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.navy,boxShadow:`0 10px 36px ${C.nav}33`,marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>Quiz — Navigation & Maneuvering SMCP</div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 4":lang==="en"?"Lesson 4":lang==="es"?"Lección 4":"Lição 4"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);onQuizScored(s,quiz.length);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}
          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:`${C.nav}15`,border:`1px solid ${C.nav}55`,fontSize:14,color:C.nav,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.nav,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.nav},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer",boxShadow:`0 8px 28px ${C.nav}33`,marginBottom:10}}>
              {lang==="fr"?"LEÇON 5 — OPÉRATIONS CARGO →":lang==="en"?"LESSON 5 — CARGO OPERATIONS →":lang==="es"?"LECCIÓN 5 — OPERACIONES DE CARGA →":"LIÇÃO 5 — OPERAÇÕES DE CARGA →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
