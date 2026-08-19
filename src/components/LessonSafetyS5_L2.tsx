import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - DEPLOYMENT (THE PAINTER LINE IS NOT JUST A ROPE)
function DeploymentSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"📦", label:{fr:"Container ou berceau",en:"Container or cradle",es:"Contenedor o cuna",pt:"Contentor ou berço"}, desc:{fr:"Le radeau reste rangé jusqu'au moment du largage, jamais ouvert ou manipulé par curiosité en dehors d'un exercice contrôlé.",en:"The raft stays stowed until the moment of release, never opened or handled out of curiosity outside a controlled drill.",es:"La balsa permanece guardada hasta el momento de la largada, nunca abierta o manipulada por curiosidad fuera de un ejercicio controlado.",pt:"A jangada permanece arrumada até ao momento da largada, nunca aberta ou manuseada por curiosidade fora de um exercício controlado."} },
    { id:2, icon:"🪢", label:{fr:"Le painter : bien plus qu'une corde",en:"The painter: much more than a rope",es:"El painter: mucho más que una cuerda",pt:"O painter: muito mais do que uma corda"}, desc:{fr:"Il déclenche le gonflage, maintient le radeau relié au navire pendant les premiers instants, et permet de récupérer sa position si le vent ou le courant l'éloigne. Un simple bout de corde n'aurait aucune de ces trois fonctions.",en:"It triggers inflation, keeps the raft attached to the ship during the first moments, and allows recovering its position if wind or current pulls it away. A simple piece of rope would have none of these three functions.",es:"Activa el inflado, mantiene la balsa unida al buque durante los primeros instantes, y permite recuperar su posición si el viento o la corriente la alejan. Un simple trozo de cuerda no tendría ninguna de estas tres funciones.",pt:"Aciona o insuflar, mantém a jangada ligada ao navio durante os primeiros instantes, e permite recuperar a sua posição se o vento ou a corrente a afastarem. Um simples pedaço de corda não teria nenhuma destas três funções."} },
    { id:3, icon:"🎯", label:{fr:"Largage contrôlé",en:"Controlled release",es:"Largada controlada",pt:"Largada controlada"}, desc:{fr:"Le largage suit toujours une séquence maîtrisée, jamais un geste précipité : chaque étape a une raison d'être, dans un ordre précis.",en:"Release always follows a controlled sequence, never a rushed gesture: each step has a reason to exist, in a precise order.",es:"La largada sigue siempre una secuencia controlada, nunca un gesto precipitado: cada paso tiene una razón de ser, en un orden preciso.",pt:"A largada segue sempre uma sequência controlada, nunca um gesto precipitado: cada etapa tem uma razão de ser, por uma ordem precisa."} },
    { id:4, icon:"📏", label:{fr:"Distance de sécurité",en:"Safety distance",es:"Distancia de seguridad",pt:"Distância de segurança"}, desc:{fr:"S'écarter suffisamment avant le gonflage complet évite d'être pris sous le radeau ou blessé par sa détente brutale.",en:"Moving far enough away before full inflation avoids being caught underneath the raft or injured by its sudden expansion.",es:"Alejarse lo suficiente antes del inflado completo evita quedar atrapado bajo la balsa o herido por su expansión brusca.",pt:"Afastar-se o suficiente antes do insuflar completo evita ficar preso debaixo da jangada ou ferido pela sua expansão brusca."} },
  ];
  const sel_ = items.find(i=>i.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {items.map(i=>(
          <div key={i.id} onClick={()=>setSel(sel===i.id?null:i.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===i.id?"rgba(77,166,255,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===i.id?C.blue2:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:16}}>{i.icon}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{i.label[lang]||i.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(77,166,255,0.1)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// SVG 2 - INFLATION IS A PROCESS, NOT AN INSTANT
function InflationSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"⏱️", label:{fr:"Quelques secondes qui comptent",en:"A few seconds that count",es:"Unos segundos que cuentan",pt:"Alguns segundos que contam"}, desc:{fr:"Le gonflage n'est jamais instantané : entre le largage et un radeau pleinement utilisable, un délai réel s'écoule, pendant lequel rien n'est encore acquis.",en:"Inflation is never instantaneous: between release and a fully usable raft, real time passes, during which nothing is yet secured.",es:"El inflado nunca es instantáneo: entre la largada y una balsa plenamente utilizable, transcurre un tiempo real, durante el cual nada está aún asegurado.",pt:"O insuflar nunca é instantâneo: entre a largada e uma jangada plenamente utilizável, decorre um tempo real, durante o qual nada está ainda garantido."} },
    { id:2, icon:"💨", label:{fr:"Le vent agit",en:"The wind acts",es:"El viento actúa",pt:"O vento age"}, desc:{fr:"Pendant ces secondes, le vent continue de pousser le radeau et toute personne à proximité, sans attendre que le gonflage soit terminé.",en:"During these seconds, the wind keeps pushing the raft and anyone nearby, without waiting for inflation to finish.",es:"Durante estos segundos, el viento sigue empujando la balsa y a cualquier persona cercana, sin esperar a que el inflado termine.",pt:"Durante estes segundos, o vento continua a empurrar a jangada e qualquer pessoa próxima, sem esperar que o insuflar termine."} },
    { id:3, icon:"🌊", label:{fr:"La mer agit",en:"The sea acts",es:"El mar actúa",pt:"O mar age"}, desc:{fr:"Les vagues et le courant déplacent le radeau pendant qu'il se gonfle, un mouvement qu'aucune vérification préalable ne peut totalement anticiper.",en:"Waves and current move the raft while it inflates, a movement no prior check can fully anticipate.",es:"Las olas y la corriente desplazan la balsa mientras se infla, un movimiento que ninguna comprobación previa puede anticipar del todo.",pt:"As ondas e a corrente deslocam a jangada enquanto se insufla, um movimento que nenhuma verificação prévia pode antecipar totalmente."} },
    { id:4, icon:"🚢", label:{fr:"Le navire dérive",en:"The ship drifts",es:"El buque deriva",pt:"O navio deriva"}, desc:{fr:"Le navire lui-même continue de bouger pendant ce délai, changeant la distance et l'orientation relative avec le radeau en train de se former.",en:"The ship itself keeps moving during this delay, changing the distance and relative orientation with the raft as it forms.",es:"El propio buque sigue moviéndose durante este retraso, cambiando la distancia y la orientación relativa con la balsa que se está formando.",pt:"O próprio navio continua a mover-se durante este atraso, mudando a distância e a orientação relativa com a jangada que se está a formar."} },
  ];
  const sel_ = items.find(i=>i.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {items.map(i=>(
          <div key={i.id} onClick={()=>setSel(sel===i.id?null:i.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===i.id?"rgba(230,126,34,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===i.id?C.orange:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:16}}>{i.icon}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{i.label[lang]||i.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(230,126,34,0.1)",border:`1px solid ${C.orange}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Le temps reste un facteur critique, même pendant une phase dite automatique.":lang==="en"?"Time remains a critical factor, even during a so-called automatic phase.":lang==="es"?"El tiempo sigue siendo un factor crítico, incluso durante una fase supuestamente automática.":"O tempo continua a ser um fator crítico, mesmo durante uma fase dita automática."}</div>
    </div>
  );
}

// SVG 3 - BOARDING TECHNIQUE (TWO DISTINCT SITUATIONS)
function BoardingSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🪜", label:{fr:"Depuis le navire",en:"From the ship",es:"Desde el buque",pt:"A partir do navio"}, desc:{fr:"Toboggan ou échelle, embarquement debout et contrôlé : la difficulté principale est la hauteur et le mouvement relatif entre navire et radeau.",en:"Chute or ladder, standing and controlled boarding: the main difficulty is height and the relative motion between ship and raft.",es:"Tobogán o escalera, embarque de pie y controlado: la dificultad principal es la altura y el movimiento relativo entre el buque y la balsa.",pt:"Escorrega ou escada, embarque de pé e controlado: a principal dificuldade é a altura e o movimento relativo entre o navio e a jangada."} },
    { id:2, icon:"🏊", label:{fr:"Depuis l'eau",en:"From the water",es:"Desde el agua",pt:"A partir da água"}, desc:{fr:"Nager jusqu'au radeau, se hisser par la rampe d'accès : la difficulté principale est l'épuisement, le froid, et la force nécessaire pour se hisser hors de l'eau.",en:"Swimming to the raft, hauling oneself up the boarding ramp: the main difficulty is exhaustion, cold, and the strength needed to pull oneself out of the water.",es:"Nadar hasta la balsa, subirse por la rampa de acceso: la dificultad principal es el agotamiento, el frío, y la fuerza necesaria para salir del agua.",pt:"Nadar até à jangada, içar-se pela rampa de acesso: a principal dificuldade é o esgotamento, o frio, e a força necessária para sair da água."} },
    { id:3, icon:"🤝", label:{fr:"S'entraider",en:"Helping each other",es:"Ayudarse mutuamente",pt:"Ajudar-se mutuamente"}, desc:{fr:"Les personnes déjà à bord aident celles qui arrivent de l'eau, en tirant par les épaules ou les vêtements, jamais par les bras seuls.",en:"People already aboard help those arriving from the water, pulling by the shoulders or clothing, never by the arms alone.",es:"Las personas que ya están a bordo ayudan a las que llegan del agua, tirando por los hombros o la ropa, nunca solo de los brazos.",pt:"As pessoas já a bordo ajudam as que chegam da água, puxando pelos ombros ou pela roupa, nunca apenas pelos braços."} },
    { id:4, icon:"⚖️", label:{fr:"Répartition dans le radeau",en:"Distribution inside the raft",es:"Distribución dentro de la balsa",pt:"Distribuição dentro da jangada"}, desc:{fr:"Chaque nouvelle personne embarquée modifie l'équilibre : répartir le poids progressivement évite de déstabiliser le radeau.",en:"Every new person boarding changes the balance: distributing weight progressively avoids destabilizing the raft.",es:"Cada nueva persona que embarca modifica el equilibrio: repartir el peso progresivamente evita desestabilizar la balsa.",pt:"Cada nova pessoa a embarcar altera o equilíbrio: distribuir o peso progressivamente evita desestabilizar a jangada."} },
  ];
  const sel_ = items.find(i=>i.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {items.map(i=>(
          <div key={i.id} onClick={()=>setSel(sel===i.id?null:i.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===i.id?"rgba(192,57,43,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===i.id?C.red:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:16}}>{i.icon}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{i.label[lang]||i.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(192,57,43,0.1)",border:`1px solid ${C.red}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// SVG 4 - CAPSIZED LIFERAFT (DESIGNED FOR IT, STAY CALM)
function CapsizedRaftSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"😮", label:{fr:"Spectaculaire, mais prévu",en:"Spectacular, but expected",es:"Espectacular, pero previsto",pt:"Espetacular, mas previsto"}, desc:{fr:"Un radeau retourné impressionne toujours, mais les concepteurs ont prévu exactement cette situation dès la conception de l'appareil.",en:"An inverted raft always looks alarming, but designers planned for exactly this situation from the very design of the equipment.",es:"Una balsa volcada siempre impresiona, pero los diseñadores previeron exactamente esta situación desde el propio diseño del equipo.",pt:"Uma jangada virada impressiona sempre, mas os projetistas previram exatamente esta situação desde a própria conceção do equipamento."} },
    { id:2, icon:"🧘", label:{fr:"Le calme avant tout",en:"Calm above all",es:"La calma ante todo",pt:"A calma acima de tudo"}, desc:{fr:"La panique est le véritable danger, pas le retournement lui-même. Prendre un instant pour respirer avant d'agir change tout.",en:"Panic is the real danger, not the capsize itself. Taking a moment to breathe before acting changes everything.",es:"El pánico es el verdadero peligro, no el vuelco en sí. Tomarse un instante para respirar antes de actuar lo cambia todo.",pt:"O pânico é o verdadeiro perigo, não o virar em si. Tirar um instante para respirar antes de agir muda tudo."} },
    { id:3, icon:"🎗️", label:{fr:"La poignée de retournement",en:"The righting strap",es:"La correa de adrizamiento",pt:"A correia de endireitamento"}, desc:{fr:"Une sangle spécialement conçue permet de redresser le radeau, en tirant depuis l'extérieur en position adaptée.",en:"A specially designed strap allows righting the raft, pulled from outside in the correct position.",es:"Una correa especialmente diseñada permite adrizar la balsa, tirando desde el exterior en la posición adecuada.",pt:"Uma correia especialmente concebida permite endireitar a jangada, puxando pelo exterior na posição correta."} },
    { id:4, icon:"🧭", label:{fr:"Face au vent avant de tirer",en:"Facing the wind before pulling",es:"De cara al viento antes de tirar",pt:"De frente para o vento antes de puxar"}, desc:{fr:"Se positionner face au vent avant de tirer sur la sangle : le vent aide alors le redressement au lieu de le contrarier.",en:"Positioning oneself facing the wind before pulling the strap: the wind then helps the righting instead of working against it.",es:"Colocarse de cara al viento antes de tirar de la correa: el viento entonces ayuda al adrizamiento en lugar de contrarrestarlo.",pt:"Posicionar-se de frente para o vento antes de puxar a correia: o vento ajuda então o endireitamento em vez de o contrariar."} },
  ];
  const sel_ = items.find(i=>i.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {items.map(i=>(
          <div key={i.id} onClick={()=>setSel(sel===i.id?null:i.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===i.id?"rgba(30,138,74,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===i.id?C.green:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:16}}>{i.icon}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{i.label[lang]||i.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Le radeau est conçu pour être redressé. L'objectif est d'éviter la panique, pas d'éviter le retournement.":lang==="en"?"The raft is designed to be righted. The goal is avoiding panic, not avoiding the capsize.":lang==="es"?"La balsa está diseñada para ser adrizada. El objetivo es evitar el pánico, no evitar el vuelco.":"A jangada é concebida para ser endireitada. O objetivo é evitar o pânico, não evitar o virar."}</div>
    </div>
  );
}

// EXERCISE - LIFERAFT DEPLOYMENT & BOARDING DECISIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"a",q3:"c",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Le radeau vient d'être largué et commence à se gonfler. Que faites-vous ?\na) Monter à bord immédiatement pour gagner du temps\nb) Attendre à distance de sécurité que le gonflage soit réellement terminé\nc) Tirer sur le painter pour accélérer le gonflage"},
      {id:"q2",q:"Que représente réellement le painter du radeau ?\na) Bien plus qu'une corde : il déclenche le gonflage, maintient le radeau, et permet de récupérer sa position\nb) Un simple accessoire sans fonction précise\nc) Un élément uniquement utile après le gonflage complet"},
      {id:"q3",q:"Une personne doit embarquer depuis l'eau après avoir nagé jusqu'au radeau. Quelle est sa principale difficulté par rapport à un embarquement depuis le navire ?\na) La hauteur de chute uniquement\nb) Le mouvement relatif entre navire et radeau uniquement\nc) L'épuisement, le froid, et la force nécessaire pour se hisser hors de l'eau"},
      {id:"q4",q:"Le radeau se retourne au gonflage. Quelle est la première réaction recommandée ?\na) Nager immédiatement loin du radeau\nb) Rester calme, le retournement est prévu et le radeau est conçu pour être redressé\nc) Attendre les secours sans tenter de le redresser"},
    ],
    en:[
      {id:"q1",q:"The raft has just been released and is starting to inflate. What do you do?\na) Board immediately to save time\nb) Wait at a safe distance until inflation is truly complete\nc) Pull on the painter to speed up inflation"},
      {id:"q2",q:"What does the raft's painter actually represent?\na) Much more than a rope: it triggers inflation, holds the raft, and allows recovering its position\nb) A simple accessory with no precise function\nc) Something only useful after full inflation"},
      {id:"q3",q:"A person must board from the water after swimming to the raft. What is their main difficulty compared to boarding from the ship?\na) Only the height of the fall\nb) Only the relative motion between ship and raft\nc) Exhaustion, cold, and the strength needed to pull themselves out of the water"},
      {id:"q4",q:"The raft capsizes during inflation. What is the first recommended reaction?\na) Immediately swim away from the raft\nb) Stay calm, the capsize is expected and the raft is designed to be righted\nc) Wait for rescue without attempting to right it"},
    ],
    es:[
      {id:"q1",q:"La balsa acaba de ser largada y empieza a inflarse. ¿Qué haces?\na) Embarcar de inmediato para ganar tiempo\nb) Esperar a distancia de seguridad hasta que el inflado esté realmente terminado\nc) Tirar del painter para acelerar el inflado"},
      {id:"q2",q:"¿Qué representa realmente el painter de la balsa?\na) Mucho más que una cuerda: activa el inflado, sujeta la balsa, y permite recuperar su posición\nb) Un simple accesorio sin función precisa\nc) Algo útil solo después del inflado completo"},
      {id:"q3",q:"Una persona debe embarcar desde el agua tras nadar hasta la balsa. ¿Cuál es su principal dificultad frente a un embarque desde el buque?\na) Solo la altura de la caída\nb) Solo el movimiento relativo entre buque y balsa\nc) El agotamiento, el frío, y la fuerza necesaria para salir del agua"},
      {id:"q4",q:"La balsa vuelca durante el inflado. ¿Cuál es la primera reacción recomendada?\na) Nadar de inmediato lejos de la balsa\nb) Mantener la calma, el vuelco está previsto y la balsa está diseñada para ser adrizada\nc) Esperar el rescate sin intentar adrizarla"},
    ],
    pt:[
      {id:"q1",q:"A jangada acabou de ser largada e começa a insuflar. O que fazes?\na) Embarcar de imediato para ganhar tempo\nb) Esperar a distância de segurança até o insuflar estar realmente concluído\nc) Puxar o painter para acelerar o insuflar"},
      {id:"q2",q:"O que representa realmente o painter da jangada?\na) Muito mais do que uma corda: aciona o insuflar, mantém a jangada, e permite recuperar a sua posição\nb) Um simples acessório sem função precisa\nc) Algo útil apenas depois do insuflar completo"},
      {id:"q3",q:"Uma pessoa deve embarcar a partir da água depois de nadar até à jangada. Qual é a sua principal dificuldade em relação a um embarque a partir do navio?\na) Só a altura da queda\nb) Só o movimento relativo entre navio e jangada\nc) O esgotamento, o frio, e a força necessária para sair da água"},
      {id:"q4",q:"A jangada vira durante o insuflar. Qual é a primeira reação recomendada?\na) Nadar de imediato para longe da jangada\nb) Manter a calma, o virar é previsto e a jangada é concebida para ser endireitada\nc) Esperar pelo socorro sem tentar endireitá-la"},
    ],
  };
  const list = qs[lang]||qs.fr;
  const chk = (id,val) => val.trim().toLowerCase()===correct[id];
  return (
    <div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:14}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.6,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="a, b ou c"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q.id,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:18,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q.id,ans[q.id])?C.green:C.red}}>{chk(q.id,ans[q.id])?"✓":`✗ -> ${correct[q.id]}`}</div>}
        </div>
      ))}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ACCIDENT CASE - REAL DOCUMENTED CASE (BETTY G, MAIB 2012)
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Cas d'étude - Le Betty G",teaser:"Cas réel documenté (MAIB) - radeau déployé avec succès, mais équipement méconnu",
      what:"En juillet 2012, le chalutier Betty G chavire soudainement après le relâchement brutal de la charge sur son chalut tribord. Le navire s'envahit progressivement puis sombre. Les trois membres d'équipage réagissent rapidement et déploient le radeau de sauvetage, qui sauve leurs vies. Une fois à bord du radeau, ils cherchent un couteau pour couper le painter, mais ne le trouvent pas : leur méconnaissance de l'équipement les empêche de savoir qu'un couteau est rangé dans une poche prévue à cet effet sur le toit du radeau. Un des membres d'équipage doit alors remonter sur le navire en train de chavirer pour aller chercher un couteau.",
      cause:"• Chavirage soudain provoqué par le relâchement brutal de la charge du chalut\n• Déploiement du radeau réussi et rapide, sauvant les trois vies à bord\n• Méconnaissance de l'emplacement du couteau, rangé dans une poche dédiée sur le toit du radeau\n• Un marin contraint de remonter sur le navire en train de chavirer pour trouver un couteau",
      lessons:"✓ A Liferaft Does Not Save Lives by Inflating. It Saves Lives When Its Crew Takes Control : le gonflage a réussi, mais la maîtrise complète de l'équipement a fait défaut\n✓ Connaître précisément où se trouve chaque élément du radeau (couteau, ration, signalisation) fait partie intégrante du contrôle de la situation\n✓ Un déploiement réussi n'élimine pas le besoin de familiarité avec le contenu du radeau\n✓ Ce cas illustre directement pourquoi le painter et son rôle doivent être parfaitement compris avant qu'un incident ne survienne",
      link:"🔗 Ce cas montre qu'un déploiement réussi n'est que la première étape : sans connaître son équipement, l'équipage reste vulnérable même une fois à bord du radeau."},
    en:{title:"Case Study - The Betty G",teaser:"Real documented case (MAIB) - raft successfully deployed, but equipment poorly known",
      what:"In July 2012, the trawler Betty G capsized suddenly after the sudden release of load on her starboard trawl. The vessel progressively flooded and then sank. The three crew members reacted quickly and deployed the liferaft, which saved their lives. Once aboard the raft, they searched for a knife to cut the painter but could not find one: their unfamiliarity with the equipment meant they didn't know a knife was stowed in a dedicated pocket on the raft's roof. One of the crew members then had to climb back aboard the capsizing vessel to retrieve a knife.",
      cause:"• Sudden capsize caused by the abrupt release of load on the trawl\n• Successful and fast raft deployment, saving all three lives aboard\n• Lack of awareness of the knife's location, stowed in a dedicated pocket on the raft's roof\n• A crew member forced to climb back aboard the capsizing vessel to find a knife",
      lessons:"✓ A Liferaft Does Not Save Lives by Inflating. It Saves Lives When Its Crew Takes Control: inflation succeeded, but full mastery of the equipment was lacking\n✓ Knowing precisely where each item in the raft is located (knife, rations, signaling) is an integral part of controlling the situation\n✓ A successful deployment does not remove the need for familiarity with the raft's contents\n✓ This case directly illustrates why the painter and its role must be fully understood before an incident occurs",
      link:"🔗 This case shows that a successful deployment is only the first step: without knowing your equipment, the crew remains vulnerable even once aboard the raft."},
    es:{title:"Caso de estudio - El Betty G",teaser:"Caso real documentado (MAIB) - balsa desplegada con éxito, pero equipo poco conocido",
      what:"En julio de 2012, el arrastrero Betty G volcó repentinamente tras la liberación brusca de la carga en su red de estribor. El buque se inundó progresivamente y luego se hundió. Los tres tripulantes reaccionaron rápido y desplegaron la balsa salvavidas, que les salvó la vida. Una vez a bordo de la balsa, buscaron un cuchillo para cortar el painter pero no lo encontraron: su desconocimiento del equipo hizo que no supieran que había un cuchillo guardado en un bolsillo dedicado en el techo de la balsa. Uno de los tripulantes tuvo entonces que volver a subir al buque que estaba volcando para buscar un cuchillo.",
      cause:"• Vuelco repentino causado por la liberación brusca de la carga de la red\n• Despliegue de la balsa exitoso y rápido, salvando las tres vidas a bordo\n• Desconocimiento de la ubicación del cuchillo, guardado en un bolsillo dedicado en el techo de la balsa\n• Un tripulante obligado a volver a subir al buque que volcaba para encontrar un cuchillo",
      lessons:"✓ A Liferaft Does Not Save Lives by Inflating. It Saves Lives When Its Crew Takes Control: el inflado tuvo éxito, pero faltó el dominio completo del equipo\n✓ Saber con precisión dónde está cada elemento de la balsa (cuchillo, raciones, señalización) forma parte integral del control de la situación\n✓ Un despliegue exitoso no elimina la necesidad de familiaridad con el contenido de la balsa\n✓ Este caso ilustra directamente por qué el painter y su función deben entenderse plenamente antes de que ocurra un incidente",
      link:"🔗 Este caso muestra que un despliegue exitoso es solo el primer paso: sin conocer su equipo, la tripulación sigue siendo vulnerable incluso una vez a bordo de la balsa."},
    pt:{title:"Caso de estudo - O Betty G",teaser:"Caso real documentado (MAIB) - jangada implantada com sucesso, mas equipamento pouco conhecido",
      what:"Em julho de 2012, o arrastão Betty G virou subitamente após a libertação brusca da carga na sua rede de estibordo. O navio inundou-se progressivamente e depois afundou. Os três tripulantes reagiram rapidamente e implantaram a jangada salva-vidas, que lhes salvou a vida. Uma vez a bordo da jangada, procuraram uma faca para cortar o painter mas não a encontraram: o seu desconhecimento do equipamento fez com que não soubessem que havia uma faca guardada num bolso dedicado no teto da jangada. Um dos tripulantes teve então de voltar a subir ao navio que estava a virar para procurar uma faca.",
      cause:"• Viragem súbita causada pela libertação brusca da carga da rede\n• Implantação da jangada bem-sucedida e rápida, salvando as três vidas a bordo\n• Desconhecimento da localização da faca, guardada num bolso dedicado no teto da jangada\n• Um tripulante obrigado a voltar a subir ao navio que estava a virar para encontrar uma faca",
      lessons:"✓ A Liferaft Does Not Save Lives by Inflating. It Saves Lives When Its Crew Takes Control: o insuflar teve sucesso, mas faltou o domínio completo do equipamento\n✓ Saber com precisão onde está cada elemento da jangada (faca, rações, sinalização) faz parte integral do controlo da situação\n✓ Uma implantação bem-sucedida não elimina a necessidade de familiaridade com o conteúdo da jangada\n✓ Este caso ilustra diretamente por que o painter e o seu papel devem ser plenamente compreendidos antes de ocorrer um incidente",
      link:"🔗 Este caso mostra que uma implantação bem-sucedida é apenas o primeiro passo: sem conhecer o seu equipamento, a tripulação continua vulnerável mesmo uma vez a bordo da jangada."},
  };
  const c = d[lang]||d.fr;
  return (
    <div style={{background:"rgba(30,138,74,0.08)",border:`1.5px solid ${C.green}44`,borderRadius:18,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>✅</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.green,marginBottom:2}}>{c.title}</div><div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{c.teaser}</div></div>
          <span style={{fontSize:14,color:C.muted}}>{exp?"▲":"▼"}</span>
        </div>
      </div>
      {exp&&<div style={{padding:"0 16px 16px"}}>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,marginBottom:10}}>{c.what}</div>
        <div style={{fontSize:11,color:C.orange,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"CONTEXTE":lang==="en"?"CONTEXT":lang==="es"?"CONTEXTO":"CONTEXTO"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.cause}</div>
        <div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"LEÇONS":lang==="en"?"LESSONS":lang==="es"?"LECCIONES":"LIÇÕES"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.lessons}</div>
        <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}33`,fontSize:11,color:C.gold2,lineHeight:1.6}}>{c.link}</div>
      </div>}
    </div>
  );
}

// BANK - 15 QUESTIONS
const BANK = {
  fr:[
    {q:"Que signifie le principe 'A Liferaft Does Not Save Lives by Inflating. It Saves Lives When Its Crew Takes Control' ?",opts:["Le gonflage suffit toujours à sauver des vies","Le gonflage n'est qu'une étape ; c'est la maîtrise de la situation et de l'équipement par l'équipage qui sauve réellement des vies","Ce principe ne concerne que les radeaux automatiques","Il ne faut jamais tenter de contrôler un radeau"],correct:1,expl:"L'inflation n'est jamais l'objectif final : le contrôle réel de la situation l'est."},
    {q:"Quelle est la mission exacte de cette leçon ?",opts:["Expliquer uniquement comment gonfler un radeau","Transformer un radeau gonflé en un refuge organisé et contrôlé","Enseigner le signal d'abandon du navire","Présenter l'historique des radeaux de sauvetage"],correct:1,expl:"Le gonflage n'est jamais l'objectif ; le contrôle du radeau l'est."},
    {q:"Que représente réellement le painter du radeau ?",opts:["Un simple accessoire sans fonction précise","Il déclenche le gonflage, maintient le radeau relié au navire, et permet de récupérer sa position","Un élément utile uniquement après le gonflage complet","Une corde de secours générique"],correct:1,expl:"Le painter remplit trois fonctions distinctes, bien au-delà d'une simple corde."},
    {q:"Pourquoi le largage doit-il toujours suivre une séquence contrôlée ?",opts:["Ce n'est qu'une formalité administrative","Chaque étape a une raison d'être, dans un ordre précis, jamais un geste précipité","La séquence n'a aucune importance réelle","Elle ne concerne que les radeaux automatiques"],correct:1,expl:"Un largage précipité augmente les risques à chaque étape de la manœuvre."},
    {q:"Le gonflage d'un radeau est-il instantané ?",opts:["Oui, toujours, dès le largage","Non, un délai réel s'écoule pendant lequel rien n'est encore acquis","Oui, sauf en cas de mauvais temps","Non, il dure généralement plusieurs heures"],correct:1,expl:"Le gonflage est un processus, pas un événement instantané."},
    {q:"Que se passe-t-il pendant les quelques secondes du gonflage ?",opts:["Rien de particulier ne peut se produire","Le vent et la mer continuent d'agir, et le navire lui-même peut dériver","Le radeau reste parfaitement immobile","Ces secondes ne présentent aucun risque"],correct:1,expl:"Le temps reste un facteur critique même pendant une phase dite automatique."},
    {q:"Quelle est la principale difficulté d'un embarquement depuis le navire ?",opts:["L'épuisement et le froid uniquement","La hauteur et le mouvement relatif entre navire et radeau","Aucune difficulté particulière","La force nécessaire pour se hisser hors de l'eau"],correct:1,expl:"L'embarquement depuis le navire présente des difficultés différentes de l'embarquement depuis l'eau."},
    {q:"Quelle est la principale difficulté d'un embarquement depuis l'eau ?",opts:["La hauteur de chute uniquement","L'épuisement, le froid, et la force nécessaire pour se hisser hors de l'eau","Aucune difficulté particulière","Le mouvement relatif entre navire et radeau"],correct:1,expl:"Nager jusqu'au radeau puis se hisser hors de l'eau exige un effort physique important, aggravé par le froid."},
    {q:"Comment aider une personne qui arrive de l'eau à embarquer ?",opts:["La tirer uniquement par les bras","La tirer par les épaules ou les vêtements, jamais par les bras seuls","Ne jamais l'aider, elle doit se débrouiller seule","Attendre qu'elle atteigne le radeau sans aide"],correct:1,expl:"Tirer par les bras seuls peut causer des blessures ; les épaules ou vêtements sont plus sûrs."},
    {q:"Pourquoi répartir progressivement le poids dans le radeau ?",opts:["Ce n'est pas nécessaire","Chaque nouvelle personne modifie l'équilibre, une répartition progressive évite de déstabiliser le radeau","Le poids n'a aucun effet sur un radeau","Uniquement pertinent pour les grands radeaux"],correct:1,expl:"Une répartition mal gérée peut déséquilibrer un radeau déjà occupé."},
    {q:"Un radeau se retourne au gonflage. Est-ce un événement anormal ?",opts:["Oui, cela signifie un défaut de fabrication","Non, cette situation est prévue par les concepteurs, le radeau est conçu pour être redressé","Oui, il faut immédiatement l'abandonner","Non, mais rien ne permet de le redresser"],correct:1,expl:"Le retournement est spectaculaire mais anticipé dès la conception de l'équipement."},
    {q:"Quel est le véritable danger face à un radeau retourné ?",opts:["Le retournement lui-même","La panique, pas le retournement en tant que tel","L'eau froide uniquement","Aucun danger réel n'existe"],correct:1,expl:"Garder son calme est essentiel : la panique aggrave la situation bien plus que le retournement."},
    {q:"Comment se positionner avant de tirer sur la poignée de retournement ?",opts:["Dos au vent","Face au vent, pour que le vent aide le redressement au lieu de le contrarier","La position n'a aucune importance","Toujours du côté opposé au vent"],correct:1,expl:"Face au vent, le vent facilite le redressement plutôt que de le contrarier."},
    {q:"Dans le cas du Betty G, le déploiement du radeau a-t-il échoué ?",opts:["Oui, le radeau ne s'est jamais gonflé","Non, le déploiement a réussi et a sauvé les trois vies à bord ; le problème est survenu après, avec le couteau introuvable","Oui, un membre d'équipage est resté bloqué à bord","Non, aucun problème n'est survenu à aucun moment"],correct:1,expl:"Le déploiement a réussi ; c'est la méconnaissance du contenu du radeau qui a posé problème."},
    {q:"Ce module enseigne-t-il déjà le signal d'abandon du navire ou le rôle du commandant à ce stade ?",opts:["Oui, en détail","Non, ces éléments restent exclusivement réservés à la dernière leçon du module, consacrée au scénario complet d'abandon","Oui, mais uniquement pour les officiers","Non, ces sujets ne sont jamais traités dans ce module"],correct:1,expl:"Cette leçon reste centrée sur le déploiement et l'embarquement, pas le scénario complet d'abandon."},
  ],
  en:[
    {q:"What does the principle 'A Liferaft Does Not Save Lives by Inflating. It Saves Lives When Its Crew Takes Control' mean?",opts:["Inflation always suffices to save lives","Inflation is only a step; it is the crew's mastery of the situation and equipment that truly saves lives","This principle only concerns automatic rafts","One should never attempt to control a raft"],correct:1,expl:"Inflation is never the final goal: real control of the situation is."},
    {q:"What is the exact mission of this lesson?",opts:["Only explain how to inflate a raft","Turn an inflated raft into an organized, controlled refuge","Teach the abandon ship signal","Present the history of liferafts"],correct:1,expl:"Inflation is never the goal; control of the raft is."},
    {q:"What does the raft's painter actually represent?",opts:["A simple accessory with no precise function","It triggers inflation, keeps the raft attached to the ship, and allows recovering its position","Something useful only after full inflation","A generic rescue rope"],correct:1,expl:"The painter fulfills three distinct functions, well beyond a simple rope."},
    {q:"Why must release always follow a controlled sequence?",opts:["It's only an administrative formality","Each step has a reason to exist, in a precise order, never a rushed gesture","The sequence has no real importance","It only concerns automatic rafts"],correct:1,expl:"A rushed release increases risks at every stage of the maneuver."},
    {q:"Is raft inflation instantaneous?",opts:["Yes, always, as soon as released","No, real time passes during which nothing is yet secured","Yes, except in bad weather","No, it usually takes several hours"],correct:1,expl:"Inflation is a process, not an instant event."},
    {q:"What happens during the few seconds of inflation?",opts:["Nothing in particular can happen","Wind and sea keep acting, and the ship itself may drift","The raft stays perfectly still","These seconds present no risk"],correct:1,expl:"Time remains a critical factor even during a so-called automatic phase."},
    {q:"What is the main difficulty of boarding from the ship?",opts:["Only exhaustion and cold","Height and the relative motion between ship and raft","No particular difficulty","The strength needed to pull oneself out of the water"],correct:1,expl:"Boarding from the ship presents different difficulties than boarding from the water."},
    {q:"What is the main difficulty of boarding from the water?",opts:["Only the height of the fall","Exhaustion, cold, and the strength needed to pull oneself out of the water","No particular difficulty","The relative motion between ship and raft"],correct:1,expl:"Swimming to the raft then pulling oneself out requires significant physical effort, worsened by cold."},
    {q:"How do you help someone arriving from the water to board?",opts:["Pull them only by the arms","Pull by the shoulders or clothing, never by the arms alone","Never help them, they must manage alone","Wait for them to reach the raft without help"],correct:1,expl:"Pulling by the arms alone can cause injury; shoulders or clothing are safer."},
    {q:"Why distribute weight progressively inside the raft?",opts:["It isn't necessary","Every new person changes the balance, progressive distribution avoids destabilizing the raft","Weight has no effect on a raft","Only relevant for large rafts"],correct:1,expl:"Poorly managed distribution can unbalance an already occupied raft."},
    {q:"A raft capsizes during inflation. Is this an abnormal event?",opts:["Yes, it means a manufacturing defect","No, this situation is expected by the designers, the raft is designed to be righted","Yes, it must be abandoned immediately","No, but there is no way to right it"],correct:1,expl:"The capsize is spectacular but anticipated from the equipment's very design."},
    {q:"What is the real danger facing a capsized raft?",opts:["The capsize itself","Panic, not the capsize as such","Only the cold water","No real danger exists"],correct:1,expl:"Staying calm is essential: panic worsens the situation far more than the capsize."},
    {q:"How should you position yourself before pulling the righting strap?",opts:["With your back to the wind","Facing the wind, so it helps the righting instead of working against it","Position has no importance","Always on the side opposite the wind"],correct:1,expl:"Facing the wind, it helps the righting rather than working against it."},
    {q:"In the Betty G case, did the raft deployment fail?",opts:["Yes, the raft never inflated","No, the deployment succeeded and saved all three lives aboard; the problem occurred afterward, with the missing knife","Yes, a crew member remained stuck aboard","No, no problem occurred at any point"],correct:1,expl:"Deployment succeeded; it was unfamiliarity with the raft's contents that caused the problem."},
    {q:"Does this module already teach the abandon ship signal or the captain's role at this stage?",opts:["Yes, in detail","No, these elements remain exclusively reserved for the module's last lesson, dedicated to the full abandonment scenario","Yes, but only for officers","No, these topics are never covered in this module"],correct:1,expl:"This lesson stays focused on deployment and boarding, not the full abandonment scenario."},
  ],
  es:[
    {q:"¿Qué significa el principio 'A Liferaft Does Not Save Lives by Inflating. It Saves Lives When Its Crew Takes Control'?",opts:["El inflado siempre basta para salvar vidas","El inflado es solo una etapa; es el dominio de la situación y el equipo por la tripulación lo que realmente salva vidas","Este principio solo concierne a las balsas automáticas","Nunca hay que intentar controlar una balsa"],correct:1,expl:"El inflado nunca es el objetivo final: el control real de la situación sí lo es."},
    {q:"¿Cuál es la misión exacta de esta lección?",opts:["Solo explicar cómo inflar una balsa","Convertir una balsa inflada en un refugio organizado y controlado","Enseñar la señal de abandono del buque","Presentar la historia de las balsas salvavidas"],correct:1,expl:"El inflado nunca es el objetivo; el control de la balsa sí lo es."},
    {q:"¿Qué representa realmente el painter de la balsa?",opts:["Un simple accesorio sin función precisa","Activa el inflado, mantiene la balsa unida al buque, y permite recuperar su posición","Algo útil solo después del inflado completo","Una cuerda de rescate genérica"],correct:1,expl:"El painter cumple tres funciones distintas, mucho más allá de una simple cuerda."},
    {q:"¿Por qué la largada debe seguir siempre una secuencia controlada?",opts:["Es solo una formalidad administrativa","Cada paso tiene una razón de ser, en un orden preciso, nunca un gesto precipitado","La secuencia no tiene ninguna importancia real","Solo concierne a las balsas automáticas"],correct:1,expl:"Una largada precipitada aumenta los riesgos en cada etapa de la maniobra."},
    {q:"¿El inflado de una balsa es instantáneo?",opts:["Sí, siempre, en cuanto se larga","No, transcurre un tiempo real durante el cual nada está aún asegurado","Sí, salvo con mal tiempo","No, generalmente dura varias horas"],correct:1,expl:"El inflado es un proceso, no un evento instantáneo."},
    {q:"¿Qué ocurre durante los segundos del inflado?",opts:["Nada en particular puede ocurrir","El viento y el mar siguen actuando, y el propio buque puede derivar","La balsa permanece perfectamente inmóvil","Estos segundos no presentan ningún riesgo"],correct:1,expl:"El tiempo sigue siendo un factor crítico incluso durante una fase supuestamente automática."},
    {q:"¿Cuál es la principal dificultad de un embarque desde el buque?",opts:["Solo el agotamiento y el frío","La altura y el movimiento relativo entre buque y balsa","Ninguna dificultad particular","La fuerza necesaria para salir del agua"],correct:1,expl:"El embarque desde el buque presenta dificultades distintas al embarque desde el agua."},
    {q:"¿Cuál es la principal dificultad de un embarque desde el agua?",opts:["Solo la altura de la caída","El agotamiento, el frío, y la fuerza necesaria para salir del agua","Ninguna dificultad particular","El movimiento relativo entre buque y balsa"],correct:1,expl:"Nadar hasta la balsa y luego salir del agua exige un esfuerzo físico importante, agravado por el frío."},
    {q:"¿Cómo ayudar a una persona que llega del agua a embarcar?",opts:["Tirar solo de los brazos","Tirar de los hombros o la ropa, nunca solo de los brazos","Nunca ayudarla, debe arreglárselas sola","Esperar a que llegue a la balsa sin ayuda"],correct:1,expl:"Tirar solo de los brazos puede causar lesiones; los hombros o la ropa son más seguros."},
    {q:"¿Por qué distribuir progresivamente el peso dentro de la balsa?",opts:["No es necesario","Cada nueva persona modifica el equilibrio, una distribución progresiva evita desestabilizar la balsa","El peso no tiene ningún efecto en una balsa","Solo relevante para balsas grandes"],correct:1,expl:"Una distribución mal gestionada puede desequilibrar una balsa ya ocupada."},
    {q:"Una balsa vuelca durante el inflado. ¿Es un evento anormal?",opts:["Sí, significa un defecto de fabricación","No, esta situación está prevista por los diseñadores, la balsa está diseñada para ser adrizada","Sí, hay que abandonarla de inmediato","No, pero no hay forma de adrizarla"],correct:1,expl:"El vuelco es espectacular pero anticipado desde el propio diseño del equipo."},
    {q:"¿Cuál es el verdadero peligro ante una balsa volcada?",opts:["El vuelco en sí","El pánico, no el vuelco como tal","Solo el agua fría","No existe ningún peligro real"],correct:1,expl:"Mantener la calma es esencial: el pánico agrava la situación mucho más que el vuelco."},
    {q:"¿Cómo colocarse antes de tirar de la correa de adrizamiento?",opts:["De espaldas al viento","De cara al viento, para que este ayude al adrizamiento en lugar de contrarrestarlo","La posición no tiene importancia","Siempre del lado opuesto al viento"],correct:1,expl:"De cara al viento, este ayuda al adrizamiento en lugar de contrarrestarlo."},
    {q:"En el caso del Betty G, ¿falló el despliegue de la balsa?",opts:["Sí, la balsa nunca se infló","No, el despliegue tuvo éxito y salvó las tres vidas a bordo; el problema ocurrió después, con el cuchillo desaparecido","Sí, un tripulante quedó atrapado a bordo","No, no ocurrió ningún problema en ningún momento"],correct:1,expl:"El despliegue tuvo éxito; fue el desconocimiento del contenido de la balsa lo que causó el problema."},
    {q:"¿Este módulo enseña ya la señal de abandono del buque o el papel del capitán en esta etapa?",opts:["Sí, en detalle","No, estos elementos se reservan exclusivamente para la última lección del módulo, dedicada al escenario completo de abandono","Sí, pero solo para oficiales","No, estos temas nunca se tratan en este módulo"],correct:1,expl:"Esta lección se mantiene centrada en el despliegue y el embarque, no en el escenario completo de abandono."},
  ],
  pt:[
    {q:"O que significa o princípio 'A Liferaft Does Not Save Lives by Inflating. It Saves Lives When Its Crew Takes Control'?",opts:["O insuflar sempre basta para salvar vidas","O insuflar é apenas uma etapa; é o domínio da situação e do equipamento pela tripulação que realmente salva vidas","Este princípio só diz respeito a jangadas automáticas","Nunca se deve tentar controlar uma jangada"],correct:1,expl:"O insuflar nunca é o objetivo final: o controlo real da situação sim."},
    {q:"Qual é a missão exata desta lição?",opts:["Apenas explicar como insuflar uma jangada","Transformar uma jangada insuflada num refúgio organizado e controlado","Ensinar o sinal de abandono do navio","Apresentar a história das jangadas salva-vidas"],correct:1,expl:"O insuflar nunca é o objetivo; o controlo da jangada sim."},
    {q:"O que representa realmente o painter da jangada?",opts:["Um simples acessório sem função precisa","Aciona o insuflar, mantém a jangada ligada ao navio, e permite recuperar a sua posição","Algo útil apenas depois do insuflar completo","Uma corda de resgate genérica"],correct:1,expl:"O painter cumpre três funções distintas, muito além de uma simples corda."},
    {q:"Por que a largada deve sempre seguir uma sequência controlada?",opts:["É só uma formalidade administrativa","Cada etapa tem uma razão de ser, por uma ordem precisa, nunca um gesto precipitado","A sequência não tem qualquer importância real","Só diz respeito a jangadas automáticas"],correct:1,expl:"Uma largada precipitada aumenta os riscos em cada etapa da manobra."},
    {q:"O insuflar de uma jangada é instantâneo?",opts:["Sim, sempre, assim que largada","Não, decorre um tempo real durante o qual nada está ainda garantido","Sim, exceto com mau tempo","Não, geralmente demora várias horas"],correct:1,expl:"O insuflar é um processo, não um evento instantâneo."},
    {q:"O que acontece durante os segundos do insuflar?",opts:["Nada em particular pode acontecer","O vento e o mar continuam a agir, e o próprio navio pode derivar","A jangada permanece perfeitamente imóvel","Estes segundos não apresentam nenhum risco"],correct:1,expl:"O tempo continua a ser um fator crítico mesmo durante uma fase dita automática."},
    {q:"Qual é a principal dificuldade de um embarque a partir do navio?",opts:["Só o esgotamento e o frio","A altura e o movimento relativo entre navio e jangada","Nenhuma dificuldade particular","A força necessária para sair da água"],correct:1,expl:"O embarque a partir do navio apresenta dificuldades diferentes do embarque a partir da água."},
    {q:"Qual é a principal dificuldade de um embarque a partir da água?",opts:["Só a altura da queda","O esgotamento, o frio, e a força necessária para sair da água","Nenhuma dificuldade particular","O movimento relativo entre navio e jangada"],correct:1,expl:"Nadar até à jangada e depois sair da água exige um esforço físico importante, agravado pelo frio."},
    {q:"Como ajudar uma pessoa que chega da água a embarcar?",opts:["Puxar só pelos braços","Puxar pelos ombros ou pela roupa, nunca só pelos braços","Nunca a ajudar, deve desenrascar-se sozinha","Esperar que chegue à jangada sem ajuda"],correct:1,expl:"Puxar só pelos braços pode causar lesões; os ombros ou a roupa são mais seguros."},
    {q:"Por que distribuir progressivamente o peso dentro da jangada?",opts:["Não é necessário","Cada nova pessoa altera o equilíbrio, uma distribuição progressiva evita desestabilizar a jangada","O peso não tem qualquer efeito numa jangada","Só relevante para jangadas grandes"],correct:1,expl:"Uma distribuição mal gerida pode desequilibrar uma jangada já ocupada."},
    {q:"Uma jangada vira durante o insuflar. É um evento anormal?",opts:["Sim, significa um defeito de fabrico","Não, esta situação é prevista pelos projetistas, a jangada é concebida para ser endireitada","Sim, deve ser abandonada de imediato","Não, mas não há forma de a endireitar"],correct:1,expl:"O virar é espetacular mas antecipado desde a própria conceção do equipamento."},
    {q:"Qual é o verdadeiro perigo perante uma jangada virada?",opts:["O virar em si","O pânico, não o virar como tal","Só a água fria","Não existe nenhum perigo real"],correct:1,expl:"Manter a calma é essencial: o pânico agrava a situação muito mais do que o virar."},
    {q:"Como te posicionar antes de puxar a correia de endireitamento?",opts:["De costas para o vento","De frente para o vento, para que este ajude o endireitamento em vez de o contrariar","A posição não tem importância","Sempre do lado oposto ao vento"],correct:1,expl:"De frente para o vento, este ajuda o endireitamento em vez de o contrariar."},
    {q:"No caso do Betty G, a implantação da jangada falhou?",opts:["Sim, a jangada nunca insuflou","Não, a implantação teve sucesso e salvou as três vidas a bordo; o problema ocorreu depois, com a faca desaparecida","Sim, um tripulante ficou preso a bordo","Não, nenhum problema ocorreu em momento algum"],correct:1,expl:"A implantação teve sucesso; foi o desconhecimento do conteúdo da jangada que causou o problema."},
    {q:"Este módulo já ensina o sinal de abandono do navio ou o papel do comandante nesta fase?",opts:["Sim, em detalhe","Não, estes elementos permanecem exclusivamente reservados para a última lição do módulo, dedicada ao cenário completo de abandono","Sim, mas só para oficiais","Não, estes temas nunca são tratados neste módulo"],correct:1,expl:"Esta lição mantém-se centrada na implantação e no embarque, não no cenário completo de abandono."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Que signifie 'A Liferaft Does Not Save Lives by Inflating. It Saves Lives When Its Crew Takes Control' ?",opts:["Le gonflage suffit toujours","C'est la maîtrise de l'équipage sur la situation qui sauve réellement des vies","Cela ne concerne que les radeaux automatiques","Il ne faut jamais contrôler un radeau"],correct:1,expl:"L'inflation n'est jamais l'objectif final : le contrôle réel l'est."},
    {q:"Que représente le painter du radeau ?",opts:["Une simple corde sans fonction précise","Il déclenche le gonflage, maintient le radeau, et permet de récupérer sa position","Un élément utile seulement après le gonflage","Un accessoire optionnel"],correct:1,expl:"Le painter remplit trois fonctions distinctes."},
    {q:"Le gonflage est-il instantané ?",opts:["Oui, toujours","Non, un délai réel s'écoule pendant lequel rien n'est encore acquis","Oui, sauf exception","Non, il dure des heures"],correct:1,expl:"Le gonflage est un processus, pas un événement instantané."},
    {q:"Un radeau se retourne au gonflage. Que faire en premier ?",opts:["Nager loin du radeau","Rester calme, la situation est prévue et le radeau est conçu pour être redressé","Attendre les secours sans agir","Abandonner le radeau définitivement"],correct:1,expl:"La panique est le vrai danger, pas le retournement lui-même."},
    {q:"Dans le cas du Betty G, quel problème est survenu après un déploiement réussi ?",opts:["Le radeau s'est dégonflé","L'équipage ne savait pas où se trouvait le couteau pour couper le painter","Le radeau s'est retourné","Personne n'a pu embarquer"],correct:1,expl:"La méconnaissance de l'équipement a forcé un marin à remonter sur le navire qui chavirait."},
  ],
  en:[
    {q:"What does 'A Liferaft Does Not Save Lives by Inflating. It Saves Lives When Its Crew Takes Control' mean?",opts:["Inflation always suffices","It's the crew's mastery of the situation that truly saves lives","It only concerns automatic rafts","One should never control a raft"],correct:1,expl:"Inflation is never the final goal: real control is."},
    {q:"What does the raft's painter represent?",opts:["A simple rope with no precise function","It triggers inflation, holds the raft, and allows recovering its position","Something useful only after inflation","An optional accessory"],correct:1,expl:"The painter fulfills three distinct functions."},
    {q:"Is inflation instantaneous?",opts:["Yes, always","No, real time passes during which nothing is yet secured","Yes, except in exceptional cases","No, it takes hours"],correct:1,expl:"Inflation is a process, not an instant event."},
    {q:"A raft capsizes during inflation. What to do first?",opts:["Swim away from the raft","Stay calm, the situation is expected and the raft is designed to be righted","Wait for rescue without acting","Abandon the raft permanently"],correct:1,expl:"Panic is the real danger, not the capsize itself."},
    {q:"In the Betty G case, what problem occurred after a successful deployment?",opts:["The raft deflated","The crew didn't know where the knife was to cut the painter","The raft capsized","No one could board"],correct:1,expl:"Unfamiliarity with the equipment forced a sailor to climb back aboard the capsizing vessel."},
  ],
  es:[
    {q:"¿Qué significa 'A Liferaft Does Not Save Lives by Inflating. It Saves Lives When Its Crew Takes Control'?",opts:["El inflado siempre basta","Es el dominio de la tripulación sobre la situación lo que realmente salva vidas","Solo concierne a las balsas automáticas","Nunca hay que controlar una balsa"],correct:1,expl:"El inflado nunca es el objetivo final: el control real sí lo es."},
    {q:"¿Qué representa el painter de la balsa?",opts:["Una simple cuerda sin función precisa","Activa el inflado, sujeta la balsa, y permite recuperar su posición","Algo útil solo después del inflado","Un accesorio opcional"],correct:1,expl:"El painter cumple tres funciones distintas."},
    {q:"¿El inflado es instantáneo?",opts:["Sí, siempre","No, transcurre un tiempo real durante el cual nada está aún asegurado","Sí, salvo excepciones","No, dura horas"],correct:1,expl:"El inflado es un proceso, no un evento instantáneo."},
    {q:"Una balsa vuelca durante el inflado. ¿Qué hacer primero?",opts:["Nadar lejos de la balsa","Mantener la calma, la situación está prevista y la balsa está diseñada para ser adrizada","Esperar el rescate sin actuar","Abandonar la balsa definitivamente"],correct:1,expl:"El pánico es el verdadero peligro, no el vuelco en sí."},
    {q:"En el caso del Betty G, ¿qué problema ocurrió tras un despliegue exitoso?",opts:["La balsa se desinfló","La tripulación no sabía dónde estaba el cuchillo para cortar el painter","La balsa volcó","Nadie pudo embarcar"],correct:1,expl:"El desconocimiento del equipo obligó a un marinero a volver a subir al buque que volcaba."},
  ],
  pt:[
    {q:"O que significa 'A Liferaft Does Not Save Lives by Inflating. It Saves Lives When Its Crew Takes Control'?",opts:["O insuflar sempre basta","É o domínio da tripulação sobre a situação que realmente salva vidas","Só diz respeito a jangadas automáticas","Nunca se deve controlar uma jangada"],correct:1,expl:"O insuflar nunca é o objetivo final: o controlo real sim."},
    {q:"O que representa o painter da jangada?",opts:["Uma simples corda sem função precisa","Aciona o insuflar, mantém a jangada, e permite recuperar a sua posição","Algo útil apenas depois do insuflar","Um acessório opcional"],correct:1,expl:"O painter cumpre três funções distintas."},
    {q:"O insuflar é instantâneo?",opts:["Sim, sempre","Não, decorre um tempo real durante o qual nada está ainda garantido","Sim, exceto casos excecionais","Não, demora horas"],correct:1,expl:"O insuflar é um processo, não um evento instantâneo."},
    {q:"Uma jangada vira durante o insuflar. O que fazer primeiro?",opts:["Nadar para longe da jangada","Manter a calma, a situação é prevista e a jangada é concebida para ser endireitada","Esperar pelo socorro sem agir","Abandonar a jangada definitivamente"],correct:1,expl:"O pânico é o verdadeiro perigo, não o virar em si."},
    {q:"No caso do Betty G, que problema ocorreu após uma implantação bem-sucedida?",opts:["A jangada esvaziou","A tripulação não sabia onde estava a faca para cortar o painter","A jangada virou","Ninguém conseguiu embarcar"],correct:1,expl:"O desconhecimento do equipamento obrigou um marinheiro a voltar a subir ao navio que virava."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"Saurais-tu dire, sans hesiter, ou se trouve exactement chaque element essentiel a l'interieur du radeau de ton navire ?",
    en:"Would you be able to say, without hesitating, exactly where every essential item is located inside your ship's liferaft?",
    es:"¿Sabrias decir, sin dudar, exactamente donde esta cada elemento esencial dentro de la balsa de tu buque?",
    pt:"Saberias dizer, sem hesitar, exatamente onde esta cada elemento essencial dentro da jangada do teu navio?",
  };
  return (
    <div style={{padding:"16px",borderRadius:16,background:"linear-gradient(135deg,rgba(142,68,173,0.1),rgba(13,31,60,0.85))",border:`1px solid ${C.purple}44`}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
        <span style={{fontSize:20}}>🪞</span>
        <div style={{fontSize:11,color:C.purple,letterSpacing:2,fontFamily:"'Cinzel',serif",fontWeight:700}}>
          {lang==="fr"?"SAFETY REFLECTION":lang==="en"?"SAFETY REFLECTION":lang==="es"?"REFLEXIÓN DE SEGURIDAD":"REFLEXÃO DE SEGURANÇA"}
        </div>
      </div>
      <div style={{fontSize:13,color:C.white,lineHeight:1.7,fontStyle:"italic",marginBottom:8}}>{q[lang]||q.fr}</div>
      <div style={{fontSize:10,color:C.muted}}>
        {lang==="fr"?"Il n'y a pas de bonne réponse - prends un instant pour y réfléchir.":lang==="en"?"There is no right answer - take a moment to reflect.":lang==="es"?"No hay una respuesta correcta - tómate un momento para reflexionar.":"Não há uma resposta certa - reserva um momento para refletir."}
      </div>
    </div>
  );
}

// TEXT CONTENT
const getContent = lang => {
  const d = {
    fr:{
      badge:"🛟 Safety · Lifeboats, Liferafts & HRU · Leçon 2/4 · ⭐ Premium",
      title:"Liferafts: Deployment & Boarding",
      intro:"Suite naturelle de la Leçon 1 : que faire quand aucune embarcation n'est disponible ? Cette leçon reste dans un contexte d'exercice ou de préparation, sans traiter le scénario complet d'abandon, réservé à la dernière leçon du module.",
      p0:"A LIFERAFT DOES NOT SAVE LIVES BY INFLATING. IT SAVES LIVES WHEN ITS CREW TAKES CONTROL.",s0t:"Le principe qui structure toute la leçon",
      s0:"Le gonflage n'est jamais l'objectif final. Transformer un radeau gonflé en un refuge organisé et contrôlé, voilà la vraie mission de cette leçon.\n\nCOMMENT LE RECONNAÎTRE ? Une situation où aucune embarcation rigide n'est disponible ou utilisable.\nQUE FAIRE IMMÉDIATEMENT ? Larguer à distance de sécurité, attendre le gonflage complet, connaître précisément le contenu du radeau.\nQUELLE ERREUR L'AGGRAVE ? Se précipiter à bord avant confirmation du gonflage, ou paniquer face à un retournement.\nQUAND DEMANDER DE L'AIDE ? Dès qu'un radeau se retourne ou qu'un occupant est en difficulté à l'eau.",
      p1:"LARGAGE",s1t:"Le painter n'est pas une simple corde",
      s1:"Container, séquence contrôlée, distance de sécurité : le painter déclenche le gonflage, maintient le radeau, et permet de récupérer sa position.",
      p2:"LE GONFLAGE EST UN PROCESSUS",s2t:"Le temps reste un facteur critique",
      s2:"Quelques secondes s'écoulent entre le largage et un radeau pleinement utilisable. Pendant ce délai, le vent agit, la mer agit, le navire dérive.",
      p3:"TECHNIQUE D'EMBARQUEMENT",s3t:"Deux situations très différentes",
      s3:"Depuis le navire (hauteur, mouvement relatif) ou depuis l'eau (épuisement, froid, force nécessaire) : les difficultés ne sont jamais les mêmes.",
      p4:"LE RADEAU RETOURNÉ",s4t:"Spectaculaire, mais prévu",
      s4:"Le retournement est anticipé dès la conception. Le vrai danger, c'est la panique, pas le retournement lui-même : rester calme, se positionner face au vent, tirer sur la poignée de retournement.",
      p5:"🎯 EXERCICE OPÉRATIONNEL",p6:"⚠️ CAS D'ÉTUDE",p7:"📝 BANQUE DE 15 QUESTIONS",p8:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 2",
      sumP:["A Liferaft Does Not Save Lives by Inflating. It Saves Lives When Its Crew Takes Control","Le painter remplit trois fonctions : déclencher, maintenir, récupérer la position","Le gonflage n'est jamais instantané, le vent et la mer continuent d'agir pendant ce délai","Embarquement depuis le navire ou depuis l'eau : deux difficultés très différentes","Un radeau retourné est prévu par les concepteurs, le vrai danger est la panique"],
      learnedP:["Le rôle réel du painter au-delà d'une simple corde","Pourquoi le gonflage reste un processus, pas un instant","Les deux techniques d'embarquement et leurs difficultés propres","La technique de redressement d'un radeau retourné","Pourquoi connaître le contenu du radeau fait partie du contrôle de la situation"],
      transition:"You now have a liferaft. But how long can you survive once you're inside?",
      safetyMsg:"A liferaft does not save lives by inflating. It saves lives when its crew takes control.",
    },
    en:{
      badge:"🛟 Safety · Lifeboats, Liferafts & HRU · Lesson 2/4 · ⭐ Premium",
      title:"Liferafts: Deployment & Boarding",
      intro:"A natural continuation of Lesson 1: what do you do when no boat is available? This lesson stays in a drill or preparation context, without covering the full abandonment scenario, reserved for the module's last lesson.",
      p0:"A LIFERAFT DOES NOT SAVE LIVES BY INFLATING. IT SAVES LIVES WHEN ITS CREW TAKES CONTROL.",s0t:"The principle that structures the whole lesson",
      s0:"Inflation is never the final goal. Turning an inflated raft into an organized, controlled refuge, that's the real mission of this lesson.\n\nHOW DO I RECOGNIZE IT? A situation where no rigid boat is available or usable.\nWHAT DO I DO IMMEDIATELY? Release at a safe distance, wait for full inflation, know precisely the raft's contents.\nWHAT MISTAKE MAKES IT WORSE? Rushing aboard before inflation is confirmed, or panicking at a capsize.\nWHEN MUST I ASK FOR HELP? As soon as a raft capsizes or an occupant is struggling in the water.",
      p1:"DEPLOYMENT",s1t:"The painter is not just a rope",
      s1:"Container, controlled sequence, safety distance: the painter triggers inflation, holds the raft, and allows recovering its position.",
      p2:"INFLATION IS A PROCESS",s2t:"Time remains a critical factor",
      s2:"A few seconds pass between release and a fully usable raft. During this delay, wind acts, the sea acts, the ship drifts.",
      p3:"BOARDING TECHNIQUE",s3t:"Two very different situations",
      s3:"From the ship (height, relative motion) or from the water (exhaustion, cold, strength needed): the difficulties are never the same.",
      p4:"THE CAPSIZED LIFERAFT",s4t:"Spectacular, but expected",
      s4:"The capsize is anticipated from the design. The real danger is panic, not the capsize itself: stay calm, position facing the wind, pull the righting strap.",
      p5:"🎯 OPERATIONAL EXERCISE",p6:"⚠️ CASE STUDY",p7:"📝 15-QUESTION BANK",p8:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 2",
      sumP:["A Liferaft Does Not Save Lives by Inflating. It Saves Lives When Its Crew Takes Control","The painter fulfills three functions: trigger, hold, recover position","Inflation is never instant, wind and sea keep acting during this delay","Boarding from the ship or from the water: two very different difficulties","A capsized raft is expected by designers, the real danger is panic"],
      learnedP:["The real role of the painter beyond a simple rope","Why inflation remains a process, not an instant","The two boarding techniques and their own difficulties","The righting technique for a capsized raft","Why knowing the raft's contents is part of controlling the situation"],
      transition:"You now have a liferaft. But how long can you survive once you're inside?",
      safetyMsg:"A liferaft does not save lives by inflating. It saves lives when its crew takes control.",
    },
    es:{
      badge:"🛟 Safety · Lifeboats, Liferafts & HRU · Lección 2/4 · ⭐ Premium",
      title:"Liferafts: Deployment & Boarding",
      intro:"Continuación natural de la Lección 1: ¿qué hacer cuando no hay ninguna embarcación disponible? Esta lección permanece en un contexto de ejercicio o preparación, sin abordar el escenario completo de abandono, reservado para la última lección del módulo.",
      p0:"A LIFERAFT DOES NOT SAVE LIVES BY INFLATING. IT SAVES LIVES WHEN ITS CREW TAKES CONTROL.",s0t:"El principio que estructura toda la lección",
      s0:"El inflado nunca es el objetivo final. Convertir una balsa inflada en un refugio organizado y controlado, esa es la verdadera misión de esta lección.\n\n¿CÓMO RECONOCERLO? Una situación donde ninguna embarcación rígida está disponible o utilizable.\n¿QUÉ HACER DE INMEDIATO? Largar a distancia de seguridad, esperar el inflado completo, conocer con precisión el contenido de la balsa.\n¿QUÉ ERROR LO AGRAVA? Precipitarse a bordo antes de confirmar el inflado, o entrar en pánico ante un vuelco.\n¿CUÁNDO PEDIR AYUDA? En cuanto una balsa vuelque o un ocupante tenga dificultades en el agua.",
      p1:"LARGADA",s1t:"El painter no es una simple cuerda",
      s1:"Contenedor, secuencia controlada, distancia de seguridad: el painter activa el inflado, sujeta la balsa, y permite recuperar su posición.",
      p2:"EL INFLADO ES UN PROCESO",s2t:"El tiempo sigue siendo un factor crítico",
      s2:"Transcurren unos segundos entre la largada y una balsa plenamente utilizable. Durante este retraso, el viento actúa, el mar actúa, el buque deriva.",
      p3:"TÉCNICA DE EMBARQUE",s3t:"Dos situaciones muy diferentes",
      s3:"Desde el buque (altura, movimiento relativo) o desde el agua (agotamiento, frío, fuerza necesaria): las dificultades nunca son las mismas.",
      p4:"LA BALSA VOLCADA",s4t:"Espectacular, pero previsto",
      s4:"El vuelco está anticipado desde el diseño. El verdadero peligro es el pánico, no el vuelco en sí: mantener la calma, colocarse de cara al viento, tirar de la correa de adrizamiento.",
      p5:"🎯 EJERCICIO OPERATIVO",p6:"⚠️ CASO DE ESTUDIO",p7:"📝 BANCO DE 15 PREGUNTAS",p8:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 2",
      sumP:["A Liferaft Does Not Save Lives by Inflating. It Saves Lives When Its Crew Takes Control","El painter cumple tres funciones: activar, sujetar, recuperar la posición","El inflado nunca es instantáneo, el viento y el mar siguen actuando durante este retraso","Embarque desde el buque o desde el agua: dos dificultades muy diferentes","Una balsa volcada está prevista por los diseñadores, el verdadero peligro es el pánico"],
      learnedP:["El verdadero papel del painter más allá de una simple cuerda","Por qué el inflado sigue siendo un proceso, no un instante","Las dos técnicas de embarque y sus dificultades propias","La técnica de adrizamiento de una balsa volcada","Por qué conocer el contenido de la balsa forma parte del control de la situación"],
      transition:"You now have a liferaft. But how long can you survive once you're inside?",
      safetyMsg:"A liferaft does not save lives by inflating. It saves lives when its crew takes control.",
    },
    pt:{
      badge:"🛟 Safety · Lifeboats, Liferafts & HRU · Lição 2/4 · ⭐ Premium",
      title:"Liferafts: Deployment & Boarding",
      intro:"Continuação natural da Lição 1: o que fazer quando nenhuma embarcação está disponível? Esta lição mantém-se num contexto de exercício ou preparação, sem abordar o cenário completo de abandono, reservado para a última lição do módulo.",
      p0:"A LIFERAFT DOES NOT SAVE LIVES BY INFLATING. IT SAVES LIVES WHEN ITS CREW TAKES CONTROL.",s0t:"O princípio que estrutura toda a lição",
      s0:"O insuflar nunca é o objetivo final. Transformar uma jangada insuflada num refúgio organizado e controlado, essa é a verdadeira missão desta lição.\n\nCOMO RECONHECER? Uma situação em que nenhuma embarcação rígida está disponível ou utilizável.\nO QUE FAZER IMEDIATAMENTE? Largar a distância de segurança, esperar o insuflar completo, conhecer com precisão o conteúdo da jangada.\nQUE ERRO O AGRAVA? Precipitar-se a bordo antes de confirmar o insuflar, ou entrar em pânico perante um virar.\nQUANDO PEDIR AJUDA? Assim que uma jangada virar ou um ocupante estiver em dificuldade na água.",
      p1:"LARGADA",s1t:"O painter não é uma simples corda",
      s1:"Contentor, sequência controlada, distância de segurança: o painter aciona o insuflar, mantém a jangada, e permite recuperar a sua posição.",
      p2:"O INSUFLAR É UM PROCESSO",s2t:"O tempo continua a ser um fator crítico",
      s2:"Decorrem alguns segundos entre a largada e uma jangada plenamente utilizável. Durante este atraso, o vento age, o mar age, o navio deriva.",
      p3:"TÉCNICA DE EMBARQUE",s3t:"Duas situações muito diferentes",
      s3:"A partir do navio (altura, movimento relativo) ou a partir da água (esgotamento, frio, força necessária): as dificuldades nunca são as mesmas.",
      p4:"A JANGADA VIRADA",s4t:"Espetacular, mas previsto",
      s4:"O virar é antecipado desde a conceção. O verdadeiro perigo é o pânico, não o virar em si: manter a calma, posicionar-se de frente para o vento, puxar a correia de endireitamento.",
      p5:"🎯 EXERCÍCIO OPERACIONAL",p6:"⚠️ CASO DE ESTUDO",p7:"📝 BANCO DE 15 PERGUNTAS",p8:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 2",
      sumP:["A Liferaft Does Not Save Lives by Inflating. It Saves Lives When Its Crew Takes Control","O painter cumpre três funções: acionar, manter, recuperar a posição","O insuflar nunca é instantâneo, o vento e o mar continuam a agir durante este atraso","Embarque a partir do navio ou da água: duas dificuldades muito diferentes","Uma jangada virada é prevista pelos projetistas, o verdadeiro perigo é o pânico"],
      learnedP:["O verdadeiro papel do painter além de uma simples corda","Por que o insuflar continua a ser um processo, não um instante","As duas técnicas de embarque e as suas dificuldades próprias","A técnica de endireitamento de uma jangada virada","Por que conhecer o conteúdo da jangada faz parte do controlo da situação"],
      transition:"You now have a liferaft. But how long can you survive once you're inside?",
      safetyMsg:"A liferaft does not save lives by inflating. It saves lives when its crew takes control.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonSafetyS5_L2({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
  const t = T[lang]||T.fr;
  const quiz = QUIZ[lang]||QUIZ.fr;
  const bank = BANK[lang]||BANK.fr;
  const lc = getContent(lang);
  const [phase, setPhase] = useState("content");
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
            <div style={{fontSize:10,color:C.gold,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>{t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 2/4":lang==="en"?"Lesson 2/4":lang==="es"?"Lección 2/4":"Lição 2/4"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.blue2,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.blue2},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(77,166,255,0.15)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.blue2,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.blue2}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>

            <SL icon="🛟" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🛟</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🪢" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🪢</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🪢 {lang==="fr"?"LARGAGE - INTERACTIF":lang==="en"?"DEPLOYMENT - INTERACTIVE":lang==="es"?"LARGADA - INTERACTIVO":"LARGADA - INTERATIVO"}</div><DeploymentSVG lang={lang}/></Card>

            <SL icon="⏱️" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⏱️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>⏱️ {lang==="fr"?"GONFLAGE - INTERACTIF":lang==="en"?"INFLATION - INTERACTIVE":lang==="es"?"INFLADO - INTERACTIVO":"INSUFLAR - INTERATIVO"}</div><InflationSVG lang={lang}/></Card>

            <SL icon="🏊" text={lc.p3} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🏊</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🏊 {lang==="fr"?"EMBARQUEMENT - INTERACTIF":lang==="en"?"BOARDING - INTERACTIVE":lang==="es"?"EMBARQUE - INTERACTIVO":"EMBARQUE - INTERATIVO"}</div><BoardingSVG lang={lang}/></Card>

            <SL icon="🔄" text={lc.p4} color={C.green}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔄</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🔄 {lang==="fr"?"RADEAU RETOURNÉ - INTERACTIF":lang==="en"?"CAPSIZED LIFERAFT - INTERACTIVE":lang==="es"?"BALSA VOLCADA - INTERACTIVO":"JANGADA VIRADA - INTERATIVO"}</div><CapsizedRaftSVG lang={lang}/></Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p6} color={C.green}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank}/></Card>

            <SL icon="🪞" text={lc.p8} color={C.purple}/>
            <div style={{marginBottom:14}}><SafetyReflection lang={lang}/></div>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(77,166,255,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue2},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(77,166,255,0.35)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz Final - Radeaux de Sauvetage":lang==="en"?"Final Quiz - Liferafts":lang==="es"?"Quiz Final - Balsas Salvavidas":"Quiz Final - Jangadas Salva-vidas"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 2/4":"questions · Lesson 2/4"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(77,166,255,0.15)",border:`1px solid ${C.blue2}55`,fontSize:14,color:C.gold2,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>

            <Card style={{marginBottom:16,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.1),rgba(13,31,60,0.9))"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span style={{fontSize:20}}>🛟</span>
                <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",fontWeight:700}}>SAFETY MESSAGE</div>
              </div>
              <div style={{fontSize:13,color:C.white,lineHeight:1.8,fontStyle:"italic"}}>{lc.safetyMsg}</div>
            </Card>

            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <div style={{textAlign:"center",fontSize:13,color:C.gold2,fontStyle:"italic",marginBottom:14,padding:"0 8px"}}>{lc.transition}</div>

            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue2},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(77,166,255,0.35)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 3 - HRU & ÉQUIPEMENT DE SURVIE →":lang==="en"?"LESSON 3 - HRU & SURVIVAL EQUIPMENT →":lang==="es"?"LECCIÓN 3 - HRU Y EQUIPO DE SUPERVIVENCIA →":"LIÇÃO 3 - HRU E EQUIPAMENTO DE SOBREVIVÊNCIA →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
