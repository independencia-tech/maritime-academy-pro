import { useState, useEffect } from "react";
import { shuffleQuestionOptions, C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// ══════════════════════════════════════
// SVG 1 — POINT OF NO RETURN TIMELINE
// ══════════════════════════════════════
function TimelineSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const pts = [
    { id:0, t:"TCPA 5min", color:C.green,
      label:{fr:"Éviter est encore la priorité",en:"Avoidance is still the priority",es:"Evitar sigue siendo la prioridad",pt:"Evitar ainda é a prioridade"},
      desc:{fr:"Manœuvre franche possible selon COLREG. La priorité reste d'éviter complètement le contact.",en:"A clear COLREG maneuver is still possible. The priority remains full avoidance.",es:"Una maniobra franca según COLREG sigue siendo posible. La prioridad sigue siendo evitar completamente el contacto.",pt:"Uma manobra franca segundo o COLREG ainda é possível. A prioridade continua a ser evitar completamente o contacto."} },
    { id:1, t:"TCPA 2min", color:C.orange,
      label:{fr:"Fenêtre qui se referme",en:"The window is closing",es:"La ventana se cierra",pt:"A janela está a fechar"},
      desc:{fr:"L'action doit être immédiate et maximale (barre toute + machine) pour espérer encore éviter le contact.",en:"Action must be immediate and maximal (full helm + engine) to still hope to avoid contact.",es:"La acción debe ser inmediata y máxima (todo el timón + máquina) para aún esperar evitar el contacto.",pt:"A ação deve ser imediata e máxima (leme todo + máquina) para ainda esperar evitar o contacto."} },
    { id:2, t:"TCPA 60-90s", color:C.red,
      label:{fr:"La collision semble inévitable, sauf action immédiate qui change l'issue",en:"Collision appears unavoidable unless immediate action changes the outcome",es:"La colisión parece inevitable, salvo una acción inmediata que cambie el resultado",pt:"A colisão parece inevitável, exceto se uma ação imediata mudar o resultado"},
      desc:{fr:"La priorité bascule : réduire l'énergie de l'impact devient aussi important qu'essayer d'éviter. Chaque seconde encore utilisée doit servir cet objectif double.",en:"The priority shifts: reducing impact energy becomes as important as still trying to avoid. Every remaining second must serve this dual goal.",es:"La prioridad cambia: reducir la energía del impacto se vuelve tan importante como intentar evitarlo. Cada segundo restante debe servir a este doble objetivo.",pt:"A prioridade muda: reduzir a energia do impacto torna-se tão importante quanto tentar evitar. Cada segundo restante deve servir este duplo objetivo."} },
  ];
  const sel_ = sel!==null ? pts[sel] : null;
  return (
    <div>
      <svg width="100%" height="80" viewBox="0 0 300 80">
        <line x1="20" y1="40" x2="280" y2="40" stroke="rgba(255,255,255,0.15)" strokeWidth="2"/>
        {pts.map((p,i)=>(
          <g key={p.id} onClick={()=>setSel(sel===p.id?null:p.id)} style={{cursor:"pointer"}}>
            <circle cx={30+i*115} cy="40" r={sel===p.id?9:7} fill={p.color}/>
            <text x={30+i*115} y="60" fontSize="9" fontWeight="700" textAnchor="middle" fill={p.color}>{p.t}</text>
          </g>
        ))}
      </svg>
      {sel_ ? (
        <div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>
          <div style={{fontWeight:700,marginBottom:4,color:sel_.color}}>{sel_.label[lang]||sel_.label.fr}</div>
          {sel_.desc[lang]||sel_.desc.fr}
        </div>
      ) : (
        <div style={{textAlign:"center",padding:"8px",fontSize:11,color:C.muted}}>{lang==="fr"?"Touche un point de la ligne de temps":lang==="en"?"Tap a point on the timeline":lang==="es"?"Toca un punto de la línea de tiempo":"Toque num ponto da linha do tempo"}</div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — SEQUENCED EMERGENCY CHECKLIST
// ══════════════════════════════════════
function ChecklistSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, icon:"⚙️", color:C.orange, label:{fr:"Machine",en:"Engine",es:"Máquina",pt:"Máquina"},
      desc:{fr:"Réduire ou stopper immédiatement — moins de vitesse = moins d'énergie transmise à l'impact.",en:"Reduce or stop immediately — less speed = less energy transferred at impact.",es:"Reducir o parar inmediatamente — menos velocidad = menos energía transmitida en el impacto.",pt:"Reduzir ou parar imediatamente — menos velocidade = menos energia transmitida no impacto."} },
    { id:2, icon:"⚓", color:C.blue2, label:{fr:"Barre",en:"Helm",es:"Timón",pt:"Leme"},
      desc:{fr:"Action de barre maximale dans la direction qui réduit l'angle de choc, même si elle ne suffit plus à éviter totalement.",en:"Maximum helm action in the direction that reduces the impact angle, even if it can no longer fully avoid contact.",es:"Acción de timón máxima en la dirección que reduce el ángulo de choque, aunque ya no baste para evitar totalmente el contacto.",pt:"Ação de leme máxima na direção que reduz o ângulo de impacto, mesmo que já não baste para evitar totalmente o contacto."} },
    { id:3, icon:"📯", color:C.gold2, label:{fr:"Signal sonore",en:"Sound signal",es:"Señal sonora",pt:"Sinal sonoro"},
      desc:{fr:"5+ sons courts (signal de danger) : alerte l'autre navire que la situation est critique, sans besoin de réexpliquer les règles — c'est un réflexe immédiat, pas une manœuvre.",en:"5+ short blasts (danger signal): alerts the other vessel that the situation is critical, no need to re-explain the rules — it is an immediate reflex, not a maneuver.",es:"5+ pitidos cortos (señal de peligro): alerta al otro buque de que la situación es crítica, sin necesidad de reexplicar las reglas — es un reflejo inmediato, no una maniobra.",pt:"5+ toques curtos (sinal de perigo): alerta o outro navio de que a situação é crítica, sem necessidade de reexplicar as regras — é um reflexo imediato, não uma manobra."} },
    { id:4, icon:"🚨", color:C.red, label:{fr:"Alarme générale",en:"General alarm",es:"Alarma general",pt:"Alarme geral"},
      desc:{fr:"Alerter TOUT le navire, pas seulement la passerelle — l'équipage doit avoir le temps de se préparer à un choc.",en:"Alert the WHOLE vessel, not just the bridge — the crew needs time to brace for impact.",es:"Alertar a TODO el buque, no solo al puente — la tripulación necesita tiempo para prepararse para el impacto.",pt:"Alertar TODO o navio, não apenas a ponte — a tripulação precisa de tempo para se preparar para o impacto."} },
    { id:5, icon:"📻", color:C.teal, label:{fr:"VHF",en:"VHF",es:"VHF",pt:"VHF"},
      desc:{fr:"Message ultra-court à l'autre navire ou Mayday si nécessaire — quelques secondes maximum, pas une procédure complète.",en:"Ultra-short message to the other vessel or Mayday if needed — a few seconds maximum, not a full procedure.",es:"Mensaje ultracorto al otro buque o Mayday si es necesario — unos segundos como máximo, no un procedimiento completo.",pt:"Mensagem ultracurta para o outro navio ou Mayday se necessário — poucos segundos no máximo, não um procedimento completo."} },
  ];
  const sel_ = sel!==null ? steps.find(s=>s.id===sel) : null;
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {steps.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)}
            style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:12,cursor:"pointer",
              background:sel===s.id?`${s.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===s.id?s.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{width:26,height:26,borderRadius:8,background:`${s.color}22`,border:`1px solid ${s.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>{s.icon}</div>
            <div style={{fontSize:12,fontWeight:700,color:s.color}}>{s.id}. {s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{marginTop:8,padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — IMPACT ANGLE COMPARATOR
// ══════════════════════════════════════
function ImpactAngleSVG({ lang }) {
  const [side, setSide] = useState("bad");
  const d = {
    bad:{fr:"Impact perpendiculaire à pleine vitesse : toute l'énergie cinétique se transmet directement dans la coque. Dommages structurels maximaux, brèche profonde.",
         en:"Perpendicular impact at full speed: all kinetic energy transfers directly into the hull. Maximum structural damage, deep breach.",
         es:"Impacto perpendicular a plena velocidad: toda la energía cinética se transmite directamente al casco. Daño estructural máximo, brecha profunda.",
         pt:"Impacto perpendicular a toda a velocidade: toda a energia cinética transfere-se diretamente para o casco. Dano estrutural máximo, brecha profunda."},
    good:{fr:"Vitesse réduite + angle diminué par une action de barre tardive mais réelle : une partie de l'énergie se disperse en glissement au lieu de pénétration. Dommages réduits, brèche moins profonde.",
          en:"Reduced speed + reduced angle from a late but real helm action: part of the energy disperses as glancing contact instead of penetration. Reduced damage, shallower breach.",
          es:"Velocidad reducida + ángulo disminuido por una acción de timón tardía pero real: parte de la energía se dispersa en deslizamiento en lugar de penetración. Daño reducido, brecha menos profunda.",
          pt:"Velocidade reduzida + ângulo diminuído por uma ação de leme tardia mas real: parte da energia dispersa-se em deslizamento em vez de penetração. Dano reduzido, brecha menos profunda."},
  };
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {["bad","good"].map(k=>(
          <button key={k} onClick={()=>setSide(k)} style={{flex:1,padding:"10px 0",borderRadius:12,border:`1.5px solid ${side===k?(k==="bad"?C.red:C.green):"rgba(255,255,255,0.12)"}`,background:side===k?`${k==="bad"?C.red:C.green}22`:"rgba(255,255,255,0.04)",color:side===k?(k==="bad"?C.red:C.green):C.muted,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
            {k==="bad"?(lang==="fr"?"❌ IMPACT PERPENDICULAIRE":lang==="en"?"❌ PERPENDICULAR IMPACT":lang==="es"?"❌ IMPACTO PERPENDICULAR":"❌ IMPACTO PERPENDICULAR"):(lang==="fr"?"✅ VITESSE + ANGLE RÉDUITS":lang==="en"?"✅ REDUCED SPEED + ANGLE":lang==="es"?"✅ VELOCIDAD + ÁNGULO REDUCIDOS":"✅ VELOCIDADE + ÂNGULO REDUZIDOS")}
          </button>
        ))}
      </div>
      <div style={{padding:"12px 14px",borderRadius:12,background:side==="bad"?"rgba(192,57,43,0.1)":"rgba(30,138,74,0.1)",border:`1px solid ${side==="bad"?C.red:C.green}44`,fontSize:12,color:C.white,lineHeight:1.7}}>{d[side][lang]||d[side].fr}</div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — FREQUENT ERRORS
// ══════════════════════════════════════
function ErrorsSVG({ lang }) {
  const [open, setOpen] = useState(null);
  const pairs = [
    { id:"p1", bad:{fr:"Hésiter plusieurs secondes en se demandant \"est-ce vraiment inévitable ?\"",en:"Hesitating several seconds wondering \"is this really unavoidable?\"",es:"Dudar varios segundos preguntándose \"¿es realmente inevitable?\"",pt:"Hesitar vários segundos perguntando-se \"isto é mesmo inevitável?\""},
      good:{fr:"Agir immédiatement sur la check-list (machine, barre, signal, alarme) — l'action peut toujours être ajustée, l'inaction ne peut jamais être rattrapée.",en:"Act immediately on the checklist (engine, helm, signal, alarm) — action can always be adjusted, inaction can never be recovered.",es:"Actuar inmediatamente según la lista de verificación (máquina, timón, señal, alarma) — la acción siempre puede ajustarse, la inacción nunca puede recuperarse.",pt:"Agir imediatamente segundo a checklist (máquina, leme, sinal, alarme) — a ação pode sempre ser ajustada, a inação nunca pode ser recuperada."} },
    { id:"p2", bad:{fr:"Changer d'ordre de barre trois fois en quelques secondes",en:"Changing the helm order three times within seconds",es:"Cambiar la orden de timón tres veces en pocos segundos",pt:"Mudar a ordem de leme três vezes em poucos segundos"},
      good:{fr:"Choisir une action et s'y engager pleinement — une manœuvre incomplète est souvent pire qu'une manœuvre insuffisante mais menée à son terme.",en:"Choose one action and commit fully — an incomplete maneuver is often worse than an insufficient one carried through.",es:"Elegir una acción y comprometerse plenamente — una maniobra incompleta suele ser peor que una insuficiente pero llevada hasta el final.",pt:"Escolher uma ação e comprometer-se totalmente — uma manobra incompleta é muitas vezes pior do que uma insuficiente mas levada até ao fim."} },
  ];
  return (
    <div>
      {pairs.map(p=>(
        <div key={p.id} style={{marginBottom:10}}>
          <div onClick={()=>setOpen(open===p.id?null:p.id)} style={{padding:"10px 12px",borderRadius:12,cursor:"pointer",background:"rgba(192,57,43,0.08)",border:`1.5px solid ${C.red}33`,marginBottom:open===p.id?6:0}}>
            <div style={{fontSize:9,color:C.red,fontWeight:700,marginBottom:3}}>{lang==="fr"?"❌ ERREUR FRÉQUENTE":lang==="en"?"❌ FREQUENT ERROR":lang==="es"?"❌ ERROR FRECUENTE":"❌ ERRO FREQUENTE"}</div>
            <div style={{fontSize:12,color:C.white,lineHeight:1.5}}>{p.bad[lang]||p.bad.fr}</div>
          </div>
          {open===p.id&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1.5px solid ${C.green}44`,animation:"fadeUp 0.3s ease"}}>
            <div style={{fontSize:9,color:C.green,fontWeight:700,marginBottom:3}}>{lang==="fr"?"✅ BONNE PRATIQUE":lang==="en"?"✅ GOOD PRACTICE":lang==="es"?"✅ BUENA PRÁCTICA":"✅ BOA PRÁTICA"}</div>
            <div style={{fontSize:12,color:C.white,lineHeight:1.5}}>{p.good[lang]||p.good.fr}</div>
          </div>}
        </div>
      ))}
      {!open&&<div style={{textAlign:"center",fontSize:10,color:C.muted,marginTop:4}}>{lang==="fr"?"Touche une erreur pour voir la bonne pratique":lang==="en"?"Tap an error to see the good practice":lang==="es"?"Toca un error para ver la buena práctica":"Toque num erro para ver a boa prática"}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE — 90-SECOND SCENARIO
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:"",q5:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"a",q2:"c",q3:"b",q4:"c",q5:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"TCPA de 90 secondes, collision jugée quasi certaine sauf action immédiate. Que fais-tu EN PREMIER ?\na) Réduire/stopper la machine et agir sur la barre simultanément\nb) Attendre 20 secondes pour confirmer\nc) Appeler l'armateur"},
      {id:"q2",q:"Combien de temps doit durer ton message VHF à l'autre navire dans ces 90 secondes ?\na) 2 minutes, procédure complète\nb) 1 minute, avec échange de position GPS\nc) Quelques secondes, message ultra-court sur le danger immédiat"},
      {id:"q3",q:"Quelle action réduit le PLUS l'énergie de l'impact ?\na) Klaxonner plusieurs fois\nb) Réduire la vitesse ET modifier l'angle de choc autant que possible\nc) Éteindre les feux de navigation"},
      {id:"q4",q:"Quelle erreur fréquente dois-tu éviter à tout prix dans ces 90 secondes ?\na) Sonner le signal de danger (5 sons courts)\nb) Déclencher l'alarme générale\nc) Changer d'ordre de barre plusieurs fois sans s'engager sur une action"},
      {id:"q5",q:"Quel principe de cette leçon a été le plus décisif dans ce scénario ?\na) La théorie complète du GMDSS\nb) Le principe : quand éviter n'est plus certain, chaque seconde doit encore réduire l'énergie de l'impact\nc) Les règles de barre COLREG en détail"},
    ],
    en:[
      {id:"q1",q:"TCPA of 90 seconds, collision judged nearly certain unless immediate action. What do you do FIRST?\na) Reduce/stop the engine and act on the helm simultaneously\nb) Wait 20 seconds to confirm\nc) Call the owner"},
      {id:"q2",q:"How long should your VHF message to the other vessel last in these 90 seconds?\na) 2 minutes, full procedure\nb) 1 minute, exchanging GPS position\nc) A few seconds, ultra-short message about the immediate danger"},
      {id:"q3",q:"Which action MOST reduces the energy of the impact?\na) Sounding the horn several times\nb) Reducing speed AND changing the impact angle as much as possible\nc) Turning off navigation lights"},
      {id:"q4",q:"Which frequent error must you avoid at all costs in these 90 seconds?\na) Sounding the danger signal (5 short blasts)\nb) Triggering the general alarm\nc) Changing the helm order multiple times without committing to an action"},
      {id:"q5",q:"Which principle of this lesson was most decisive in this scenario?\na) The full GMDSS theory\nb) The principle: when avoidance is no longer certain, every second must still reduce the impact energy\nc) COLREG steering rules in detail"},
    ],
    es:[
      {id:"q1",q:"TCPA de 90 segundos, colisión considerada casi cierta salvo acción inmediata. ¿Qué haces PRIMERO?\na) Reducir/parar la máquina y actuar sobre el timón simultáneamente\nb) Esperar 20 segundos para confirmar\nc) Llamar al armador"},
      {id:"q2",q:"¿Cuánto debe durar tu mensaje VHF al otro buque en esos 90 segundos?\na) 2 minutos, procedimiento completo\nb) 1 minuto, intercambiando posición GPS\nc) Unos segundos, mensaje ultracorto sobre el peligro inmediato"},
      {id:"q3",q:"¿Qué acción reduce MÁS la energía del impacto?\na) Tocar la bocina varias veces\nb) Reducir la velocidad Y cambiar el ángulo de choque tanto como sea posible\nc) Apagar las luces de navegación"},
      {id:"q4",q:"¿Qué error frecuente debes evitar a toda costa en esos 90 segundos?\na) Tocar la señal de peligro (5 pitidos cortos)\nb) Activar la alarma general\nc) Cambiar la orden de timón varias veces sin comprometerse con una acción"},
      {id:"q5",q:"¿Qué principio de esta lección fue el más decisivo en este escenario?\na) La teoría completa del GMDSS\nb) El principio: cuando evitar ya no es seguro, cada segundo debe seguir reduciendo la energía del impacto\nc) Las reglas de gobierno COLREG en detalle"},
    ],
    pt:[
      {id:"q1",q:"TCPA de 90 segundos, colisão considerada quase certa exceto ação imediata. O que fazes PRIMEIRO?\na) Reduzir/parar a máquina e agir no leme simultaneamente\nb) Esperar 20 segundos para confirmar\nc) Chamar o armador"},
      {id:"q2",q:"Quanto tempo deve durar a tua mensagem VHF ao outro navio nesses 90 segundos?\na) 2 minutos, procedimento completo\nb) 1 minuto, trocando posição GPS\nc) Alguns segundos, mensagem ultracurta sobre o perigo imediato"},
      {id:"q3",q:"Que ação reduz MAIS a energia do impacto?\na) Buzinar várias vezes\nb) Reduzir a velocidade E mudar o ângulo de impacto tanto quanto possível\nc) Apagar as luzes de navegação"},
      {id:"q4",q:"Que erro frequente deves evitar a todo custo nesses 90 segundos?\na) Tocar o sinal de perigo (5 toques curtos)\nb) Acionar o alarme geral\nc) Mudar a ordem de leme várias vezes sem se comprometer com uma ação"},
      {id:"q5",q:"Que princípio desta lição foi o mais decisivo neste cenário?\na) A teoria completa do GMDSS\nb) O princípio: quando evitar já não é certo, cada segundo ainda deve reduzir a energia do impacto\nc) As regras de leme COLREG em detalhe"},
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
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q.id,ans[q.id])?C.green:C.red}}>{chk(q.id,ans[q.id])?"✓":`✗ → ${correct[q.id]}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.6,marginBottom:10}}>
        {lang==="fr"?"✅ Q1: a — machine et barre simultanément, sans délai\n✅ Q2: c — quelques secondes, l'essentiel seulement\n✅ Q3: b — vitesse ET angle réduisent l'énergie transmise\n✅ Q4: c — l'indécision est plus dangereuse que la sous-manœuvre\n✅ Q5: b — c'est le cœur de la leçon L3":
         lang==="en"?"✅ Q1: a — engine and helm simultaneously, without delay\n✅ Q2: c — a few seconds, the essentials only\n✅ Q3: b — speed AND angle reduce the transferred energy\n✅ Q4: c — indecision is more dangerous than an insufficient maneuver\n✅ Q5: b — this is the heart of lesson L3":
         "✅ Q1: a · Q2: c · Q3: b · Q4: c · Q5: b"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — SANCHI / CF CRYSTAL
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Sanchi — CF Crystal, Mer de Chine Orientale (2018)",teaser:"Pétrolier · Vraquier · Manœuvre tardive · 32 morts · Incendie et naufrage",
      what:"En situation de croisement, le pétrolier Sanchi (navire manœuvrant selon COLREG) ne s'écarte pas à temps du vraquier CF Crystal. Les deux équipages se méprennent sur la taille réelle de l'autre navire. Ce n'est qu'environ une minute avant l'impact que l'officier du Sanchi ordonne un virement à pleine puissance — beaucoup trop tard pour changer l'issue. La collision perce les citernes du Sanchi, chargé de condensat hautement inflammable. Un incendie se déclare immédiatement, se poursuit plusieurs jours, suivi d'explosions. Le Sanchi coule le 14 janvier. Les 32 membres d'équipage du Sanchi périssent ; les 21 membres du CF Crystal sont évacués et survivent, le capitaine ayant ordonné machine arrière toute puis l'abandon du navire.",
      cause:"• Manœuvre décisive ordonnée seulement ~1 minute avant l'impact — bien après le point où éviter était encore certain\n• Méprise des deux équipages sur la taille réelle de l'autre navire, sans vérification croisée suffisante\n• Vitesse maintenue élevée jusqu'aux tout derniers instants\n• Cargaison hautement inflammable (condensat) ayant aggravé les conséquences de l'impact",
      lessons:"✓ Une action tardive vaut mieux qu'aucune action, mais agir plus tôt aurait changé l'issue\n✓ Dans les dernières secondes, la priorité bascule vers la réduction de l'énergie de l'impact autant que vers l'évitement\n✓ La vérification visuelle/AIS de la taille et de la trajectoire réelle d'un navire reste essentielle jusqu'au bout\n✓ Une cargaison dangereuse amplifie les conséquences d'une collision — la marge de décision doit en tenir compte",
      link:"🔗 Distinct d'Andrea Doria (L1, biais radar individuel) et d'USS John S. McCain (L2, coordination d'équipe) : ici, l'angle est la gestion des toutes dernières secondes avant un impact devenu quasi certain."},
    en:{title:"Sanchi — CF Crystal, East China Sea (2018)",teaser:"Oil tanker · Bulk carrier · Late maneuver · 32 dead · Fire and sinking",
      what:"In a crossing situation, the tanker Sanchi (the give-way vessel under COLREG) did not keep clear of the bulk carrier CF Crystal in time. Both crews misjudged the other vessel's actual size. It was only about one minute before impact that the Sanchi's officer ordered a full-power turn — far too late to change the outcome. The collision breached Sanchi's tanks, loaded with highly flammable condensate. A fire broke out immediately, continued for several days, followed by explosions. Sanchi sank on 14 January. All 32 Sanchi crew members died; CF Crystal's 21 crew members were evacuated and survived, after the Captain ordered full astern and then abandon ship.",
      cause:"• Decisive maneuver ordered only ~1 minute before impact — well past the point where avoidance was still certain\n• Both crews misjudged the other vessel's actual size, without sufficient cross-verification\n• High speed maintained until the very last moments\n• Highly flammable cargo (condensate) worsened the consequences of the impact",
      lessons:"✓ A late action is better than no action, but acting earlier would have changed the outcome\n✓ In the final seconds, priority shifts toward reducing impact energy as much as toward avoidance\n✓ Visual/AIS verification of a vessel's real size and trajectory remains essential until the very end\n✓ Dangerous cargo amplifies the consequences of a collision — the decision margin must account for it",
      link:"🔗 Distinct from Andrea Doria (L1, individual radar bias) and USS John S. McCain (L2, team coordination): here the angle is managing the very final seconds before an impact that has become nearly certain."},
    es:{title:"Sanchi — CF Crystal, Mar de China Oriental (2018)",teaser:"Petrolero · Granelero · Maniobra tardía · 32 muertos · Incendio y hundimiento",
      what:"En situación de cruce, el petrolero Sanchi (buque de maniobra según COLREG) no se apartó a tiempo del granelero CF Crystal. Ambas tripulaciones se equivocaron sobre el tamaño real del otro buque. Solo aproximadamente un minuto antes del impacto, el oficial del Sanchi ordenó un viraje a plena potencia — demasiado tarde para cambiar el resultado. La colisión perforó los tanques del Sanchi, cargado de condensado altamente inflamable. Se declaró un incendio inmediatamente, que continuó varios días, seguido de explosiones. El Sanchi se hundió el 14 de enero. Los 32 tripulantes del Sanchi murieron; los 21 del CF Crystal fueron evacuados y sobrevivieron, tras ordenar el Capitán máquina atrás toda y luego abandonar el buque.",
      cause:"• Maniobra decisiva ordenada solo ~1 minuto antes del impacto — mucho después del punto en que evitar aún era seguro\n• Ambas tripulaciones se equivocaron sobre el tamaño real del otro buque, sin verificación cruzada suficiente\n• Velocidad alta mantenida hasta los últimos instantes\n• Carga altamente inflamable (condensado) que agravó las consecuencias del impacto",
      lessons:"✓ Una acción tardía es mejor que ninguna acción, pero actuar antes habría cambiado el resultado\n✓ En los últimos segundos, la prioridad se desplaza hacia reducir la energía del impacto tanto como hacia evitarlo\n✓ La verificación visual/AIS del tamaño y trayectoria reales de un buque sigue siendo esencial hasta el final\n✓ Una carga peligrosa amplifica las consecuencias de una colisión",
      link:"🔗 Distinto de Andrea Doria (L1, sesgo de radar individual) y USS John S. McCain (L2, coordinación de equipo): aquí el ángulo es la gestión de los últimos segundos antes de un impacto que se ha vuelto casi seguro."},
    pt:{title:"Sanchi — CF Crystal, Mar da China Oriental (2018)",teaser:"Petroleiro · Graneleiro · Manobra tardia · 32 mortos · Incêndio e naufrágio",
      what:"Em situação de cruzamento, o petroleiro Sanchi (navio de manobra segundo o COLREG) não se afastou a tempo do graneleiro CF Crystal. Ambas as tripulações enganaram-se quanto ao tamanho real do outro navio. Só cerca de um minuto antes do impacto o oficial do Sanchi ordenou uma guinada a plena potência — tarde demais para mudar o resultado. A colisão perfurou os tanques do Sanchi, carregado de condensado altamente inflamável. Um incêndio deflagrou imediatamente, continuando por vários dias, seguido de explosões. O Sanchi afundou-se a 14 de janeiro. Os 32 tripulantes do Sanchi morreram; os 21 tripulantes do CF Crystal foram evacuados e sobreviveram, após o Comandante ter ordenado máquina a ré toda e depois abandonar o navio.",
      cause:"• Manobra decisiva ordenada apenas ~1 minuto antes do impacto — muito depois do ponto em que evitar ainda era certo\n• Ambas as tripulações enganaram-se quanto ao tamanho real do outro navio, sem verificação cruzada suficiente\n• Velocidade alta mantida até aos últimos instantes\n• Carga altamente inflamável (condensado) que agravou as consequências do impacto",
      lessons:"✓ Uma ação tardia é melhor que nenhuma ação, mas agir mais cedo teria mudado o resultado\n✓ Nos últimos segundos, a prioridade desloca-se para reduzir a energia do impacto tanto quanto para o evitar\n✓ A verificação visual/AIS do tamanho e trajetória reais de um navio continua a ser essencial até ao fim\n✓ Uma carga perigosa amplifica as consequências de uma colisão",
      link:"🔗 Distinto do Andrea Doria (L1, viés de radar individual) e do USS John S. McCain (L2, coordenação de equipa): aqui o ângulo é a gestão dos últimos segundos antes de um impacto que se tornou quase certo."},
  };
  const c = d[lang]||d.fr;
  return (
    <div style={{background:"rgba(192,57,43,0.08)",border:`1.5px solid ${C.red}44`,borderRadius:18,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>⚠️</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.red,marginBottom:2}}>{c.title}</div><div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{c.teaser}</div></div>
          <span style={{fontSize:14,color:C.muted}}>{exp?"▲":"▼"}</span>
        </div>
      </div>
      {exp&&<div style={{padding:"0 16px 16px"}}>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,marginBottom:10}}>{c.what}</div>
        <div style={{fontSize:11,color:C.red,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"CAUSES":lang==="en"?"CAUSES":lang==="es"?"CAUSAS":"CAUSAS"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.cause}</div>
        <div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"LEÇONS":lang==="en"?"LESSONS":lang==="es"?"LECCIONES":"LIÇÕES"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.lessons}</div>
        <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}33`,fontSize:11,color:C.gold2,lineHeight:1.6}}>{c.link}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// BANK — 15 QUESTIONS (min. 5 scenario-based)
// ══════════════════════════════════════
export const BANK = {
  fr:[
    {q:"À partir de quel moment la priorité bascule-t-elle vers la réduction de l'énergie de l'impact ?",opts:["Dès la première détection du contact","Quand la collision semble inévitable sauf action immédiate qui change l'issue","Uniquement après l'impact","Jamais, il faut toujours tenter d'éviter"],correct:1,expl:"La priorité ne bascule pas au premier signe de risque, mais quand l'évitement complet devient très incertain sauf action immédiate et décisive."},
    {q:"TCPA 90 secondes, action requise. Quelle est la première étape de la check-list ?",opts:["Contacter l'armateur","Réduire/stopper la machine et agir sur la barre","Réveiller le reste de l'équipage un par un","Vérifier la météo"],correct:1,expl:"Machine et barre sont les deux leviers immédiats qui influencent directement l'énergie et la trajectoire de l'impact."},
    {q:"Quel est le rôle du signal de danger (5+ sons courts) dans les dernières secondes ?",opts:["Réexpliquer une règle COLREG à l'autre navire","Alerter immédiatement l'autre navire que la situation est critique","Remplacer l'alarme générale à bord","Signaler une panne moteur"],correct:1,expl:"Le signal de danger est un réflexe d'alerte immédiat vers l'autre navire, pas une manœuvre ni une explication des règles."},
    {q:"Pourquoi l'alarme générale doit-elle être déclenchée séparément de l'alerte passerelle ?",opts:["Ce n'est pas nécessaire, la passerelle suffit","Pour donner à tout l'équipage le temps de se préparer physiquement à un choc","Pour respecter une formalité administrative","Uniquement en cas d'incendie"],correct:1,expl:"L'alerte passerelle (déjà vue en L2) concerne l'équipe de veille ; l'alarme générale concerne tout le navire, qui doit se préparer physiquement."},
    {q:"Combien de temps doit durer un message VHF d'urgence dans les dernières secondes avant impact ?",opts:["Une procédure complète de plusieurs minutes","Quelques secondes, message ultra-court sur le danger immédiat","Il ne faut jamais utiliser la VHF dans cette phase","5 minutes minimum selon le protocole GMDSS"],correct:1,expl:"Dans les toutes dernières secondes, la communication doit être minimale et directe — la théorie complète du GMDSS n'est pas le sujet ici."},
    {q:"Quelle action réduit le plus l'énergie transmise lors de l'impact ?",opts:["Éteindre les feux de navigation","Réduire la vitesse et modifier l'angle de choc autant que possible","Klaxonner plusieurs fois sans autre action","Envoyer un message radio long"],correct:1,expl:"Moins de vitesse et un angle de choc réduit (glissement plutôt que perpendiculaire) diminuent significativement l'énergie transmise à la coque."},
    {q:"Pourquoi un impact perpendiculaire à pleine vitesse est-il le pire des cas ?",opts:["Il est plus bruyant","Toute l'énergie cinétique se transmet directement dans la coque, sans dispersion","Il est plus rapide à réparer","Il ne concerne que les petits navires"],correct:1,expl:"Sans dispersion de l'énergie par glissement ou réduction de vitesse, l'impact perpendiculaire transmet le maximum d'énergie directement à la structure."},
    {q:"Vous hésitez plusieurs secondes en vous demandant si la collision est vraiment inévitable. Quelle est l'erreur ?",opts:["Il n'y a pas d'erreur, la prudence est toujours bonne","L'hésitation retarde l'action qui pourrait encore réduire l'énergie de l'impact ou éviter le contact","Il faut toujours attendre confirmation du capitaine","L'hésitation n'a aucun impact réel"],correct:1,expl:"Chaque seconde perdue à hésiter est une seconde de moins pour réduire la vitesse, changer l'angle, ou alerter — l'action reste toujours préférable à l'attente."},
    {q:"Vous changez d'ordre de barre trois fois en quelques secondes face au risque. Pourquoi est-ce dangereux ?",opts:["Ce n'est pas dangereux, plus on essaie mieux c'est","Une manœuvre incomplète est souvent pire qu'une manœuvre insuffisante mais menée à son terme","Le timonier s'ennuie","Cela n'affecte pas la trajectoire du navire"],correct:1,expl:"Changer d'ordre en cours d'exécution empêche le navire d'atteindre une trajectoire stable, ce qui peut aggraver la situation plutôt que l'améliorer."},
    {q:"Pourquoi la vérification visuelle/AIS de la taille réelle d'un navire reste-t-elle cruciale jusqu'au bout ?",opts:["Elle ne l'est pas, l'ARPA suffit toujours","Une méprise sur la taille ou la trajectoire réelle peut fausser toute la décision d'urgence","Elle ne concerne que les gros navires","Elle est inutile la nuit"],correct:1,expl:"Le cas Sanchi/CF Crystal montre qu'une méprise sur la taille réelle de l'autre navire a directement contribué à retarder l'action décisive."},
    {q:"Dans le cas Sanchi/CF Crystal, quand la manœuvre décisive a-t-elle été ordonnée ?",opts:["10 minutes avant l'impact","Environ 1 minute avant l'impact — trop tard pour changer l'issue","Immédiatement après la détection du risque","Après la collision"],correct:1,expl:"La manœuvre à pleine puissance n'a été ordonnée qu'environ une minute avant l'impact, bien après le point où elle aurait pu être pleinement efficace."},
    {q:"Pourquoi la cargaison du Sanchi a-t-elle aggravé les conséquences de la collision ?",opts:["Elle n'a eu aucun effet","Le condensat transporté était hautement inflammable, ce qui a provoqué un incendie puis des explosions","Elle a alourdi le navire uniquement","Elle a ralenti le naufrage"],correct:1,expl:"La cargaison de condensat, hautement inflammable, a transformé une collision en incendie majeur suivi d'explosions — un facteur aggravant à anticiper selon le type de cargaison."},
    {q:"Quel est l'objectif principal de la check-list des dernières secondes (machine, barre, signal, alarme, VHF) ?",opts:["Remplir une formalité administrative","Structurer l'action pour ne perdre aucune seconde utile face à un risque devenu critique","Remplacer la formation BRM","Uniquement informer l'armateur"],correct:1,expl:"La check-list sert à agir vite et dans le bon ordre, sans perdre de temps à réfléchir à chaque étape en pleine urgence."},
    {q:"Quelle est la différence entre L3 et les règles de manœuvre COLREG (Deck) ?",opts:["Il n'y a aucune différence","L3 traite de ce qui se passe après/pendant que la manœuvre COLREG classique n'a pas suffi ou est trop tardive","L3 réexplique intégralement Rule 8 et Rule 17","COLREG ne concerne pas les collisions"],correct:1,expl:"L3 se concentre sur l'action dans les toutes dernières secondes, complémentaire mais distincte des règles de manœuvre déjà enseignées au Deck."},
    {q:"Quel est l'objectif principal de la leçon L3 dans le Safety Department ?",opts:["Réexpliquer le GMDSS en détail","Structurer l'action immédiate dans les dernières secondes avant un impact devenu quasi certain","Étudier la responsabilité juridique après collision","Apprendre les règles de barre"],correct:1,expl:"L3 se concentre exclusivement sur l'action pratique dans la fenêtre critique des dernières secondes, sans réenseigner GMDSS, COLREG ou le droit maritime."},
  ],
  en:[
    {q:"At what point does priority shift toward reducing impact energy?",opts:["As soon as a contact is first detected","When collision appears unavoidable unless immediate action changes the outcome","Only after impact","Never, avoidance must always be attempted"],correct:1,expl:"Priority does not shift at the first sign of risk, but when full avoidance becomes very uncertain unless immediate, decisive action is taken."},
    {q:"TCPA 90 seconds, action required. What is the first step of the checklist?",opts:["Contact the owner","Reduce/stop the engine and act on the helm","Wake the rest of the crew one by one","Check the weather"],correct:1,expl:"Engine and helm are the two immediate levers that directly influence the energy and trajectory of the impact."},
    {q:"What is the role of the danger signal (5+ short blasts) in the final seconds?",opts:["Re-explain a COLREG rule to the other vessel","Immediately alert the other vessel that the situation is critical","Replace the onboard general alarm","Signal an engine failure"],correct:1,expl:"The danger signal is an immediate alert reflex toward the other vessel, not a maneuver or a rule explanation."},
    {q:"Why must the general alarm be triggered separately from the bridge alert?",opts:["It is not necessary, the bridge is enough","To give the whole crew time to physically brace for impact","To satisfy an administrative formality","Only in case of fire"],correct:1,expl:"The bridge alert (covered in L2) concerns the watch team; the general alarm concerns the whole vessel, which must brace physically."},
    {q:"How long should an emergency VHF message last in the final seconds before impact?",opts:["A full procedure lasting several minutes","A few seconds, ultra-short message about the immediate danger","VHF should never be used in this phase","5 minutes minimum per GMDSS protocol"],correct:1,expl:"In the very final seconds, communication must be minimal and direct — the full GMDSS theory is not the subject here."},
    {q:"Which action most reduces the energy transferred at impact?",opts:["Turning off navigation lights","Reducing speed and changing the impact angle as much as possible","Sounding the horn multiple times with no other action","Sending a long radio message"],correct:1,expl:"Less speed and a reduced impact angle (glancing rather than perpendicular) significantly decrease the energy transferred to the hull."},
    {q:"Why is a perpendicular impact at full speed the worst-case scenario?",opts:["It is louder","All kinetic energy transfers directly into the hull, with no dispersion","It is faster to repair","It only concerns small vessels"],correct:1,expl:"Without energy dispersion through glancing contact or reduced speed, a perpendicular impact transfers maximum energy directly to the structure."},
    {q:"You hesitate several seconds wondering if the collision is really unavoidable. What is the error?",opts:["There is no error, caution is always good","Hesitation delays action that could still reduce impact energy or avoid contact","You must always wait for Captain confirmation","Hesitation has no real impact"],correct:1,expl:"Every second lost hesitating is one less second to reduce speed, change angle, or alert — action always beats waiting."},
    {q:"You change the helm order three times within seconds facing the risk. Why is this dangerous?",opts:["It's not dangerous, more attempts is better","An incomplete maneuver is often worse than an insufficient one carried through","The helmsman gets bored","It does not affect the vessel's trajectory"],correct:1,expl:"Changing the order mid-execution prevents the vessel from reaching a stable trajectory, which can worsen rather than improve the situation."},
    {q:"Why does visual/AIS verification of a vessel's actual size remain crucial until the very end?",opts:["It doesn't, ARPA is always enough","A misjudgment of size or actual trajectory can distort the entire emergency decision","It only concerns large vessels","It is useless at night"],correct:1,expl:"The Sanchi/CF Crystal case shows that a misjudgment of the other vessel's actual size directly contributed to delaying decisive action."},
    {q:"In the Sanchi/CF Crystal case, when was the decisive maneuver ordered?",opts:["10 minutes before impact","About 1 minute before impact — too late to change the outcome","Immediately upon detecting the risk","After the collision"],correct:1,expl:"The full-power maneuver was ordered only about one minute before impact, well past the point where it could have been fully effective."},
    {q:"Why did Sanchi's cargo worsen the consequences of the collision?",opts:["It had no effect","The condensate cargo was highly flammable, causing a fire and then explosions","It only made the vessel heavier","It slowed down the sinking"],correct:1,expl:"The highly flammable condensate cargo turned a collision into a major fire followed by explosions — a factor to anticipate depending on cargo type."},
    {q:"What is the main purpose of the final-seconds checklist (engine, helm, signal, alarm, VHF)?",opts:["To fulfill an administrative formality","To structure the action so no useful second is lost facing a critical risk","To replace BRM training","Only to inform the owner"],correct:1,expl:"The checklist serves to act quickly and in the right order, without wasting time thinking through each step in the middle of an emergency."},
    {q:"What is the difference between L3 and COLREG maneuvering rules (Deck)?",opts:["There is no difference","L3 deals with what happens after/while a classic COLREG maneuver has not sufficed or is too late","L3 fully re-explains Rule 8 and Rule 17","COLREG does not concern collisions"],correct:1,expl:"L3 focuses on action in the very final seconds, complementary to but distinct from the maneuvering rules already taught at Deck."},
    {q:"What is the main goal of lesson L3 in the Safety Department?",opts:["Re-explain GMDSS in detail","Structure immediate action in the final seconds before an impact that has become nearly certain","Study legal liability after a collision","Learn steering rules"],correct:1,expl:"L3 focuses exclusively on practical action in the critical final-seconds window, without re-teaching GMDSS, COLREG, or maritime law."},
  ],
  es:[
    {q:"¿En qué momento la prioridad se desplaza hacia reducir la energía del impacto?",opts:["En cuanto se detecta un contacto","Cuando la colisión parece inevitable salvo una acción inmediata que cambie el resultado","Solo después del impacto","Nunca, siempre hay que intentar evitar"],correct:1,expl:"La prioridad no cambia ante el primer signo de riesgo, sino cuando evitar por completo se vuelve muy incierto salvo una acción inmediata y decisiva."},
    {q:"TCPA de 90 segundos, acción requerida. ¿Cuál es el primer paso de la lista de verificación?",opts:["Contactar al armador","Reducir/parar la máquina y actuar sobre el timón","Despertar al resto de la tripulación uno por uno","Comprobar el tiempo"],correct:1,expl:"Máquina y timón son las dos palancas inmediatas que influyen directamente en la energía y trayectoria del impacto."},
    {q:"¿Cuál es el papel de la señal de peligro (5+ pitidos cortos) en los últimos segundos?",opts:["Reexplicar una regla COLREG al otro buque","Alertar inmediatamente al otro buque de que la situación es crítica","Sustituir la alarma general a bordo","Señalar un fallo de motor"],correct:1,expl:"La señal de peligro es un reflejo de alerta inmediata hacia el otro buque, no una maniobra ni una explicación de las reglas."},
    {q:"¿Por qué la alarma general debe activarse por separado de la alerta de puente?",opts:["No es necesario, el puente basta","Para dar a toda la tripulación tiempo de prepararse físicamente para el impacto","Para cumplir una formalidad administrativa","Solo en caso de incendio"],correct:1,expl:"La alerta de puente (vista en L2) concierne al equipo de guardia; la alarma general concierne a todo el buque, que debe prepararse físicamente."},
    {q:"¿Cuánto debe durar un mensaje VHF de emergencia en los últimos segundos antes del impacto?",opts:["Un procedimiento completo de varios minutos","Unos segundos, mensaje ultracorto sobre el peligro inmediato","Nunca debe usarse la VHF en esta fase","5 minutos como mínimo según el protocolo GMDSS"],correct:1,expl:"En los últimos segundos, la comunicación debe ser mínima y directa — la teoría completa del GMDSS no es el tema aquí."},
    {q:"¿Qué acción reduce MÁS la energía transmitida en el impacto?",opts:["Apagar las luces de navegación","Reducir la velocidad y cambiar el ángulo de choque tanto como sea posible","Tocar la bocina varias veces sin otra acción","Enviar un mensaje de radio largo"],correct:1,expl:"Menos velocidad y un ángulo de choque reducido (deslizamiento en vez de perpendicular) disminuyen significativamente la energía transmitida al casco."},
    {q:"¿Por qué un impacto perpendicular a plena velocidad es el peor de los casos?",opts:["Es más ruidoso","Toda la energía cinética se transmite directamente al casco, sin dispersión","Es más rápido de reparar","Solo afecta a buques pequeños"],correct:1,expl:"Sin dispersión de energía por deslizamiento o reducción de velocidad, el impacto perpendicular transmite el máximo de energía directamente a la estructura."},
    {q:"Dudas varios segundos preguntándote si la colisión es realmente inevitable. ¿Cuál es el error?",opts:["No hay error, la prudencia siempre es buena","La duda retrasa la acción que aún podría reducir la energía del impacto o evitar el contacto","Siempre hay que esperar confirmación del Capitán","La duda no tiene impacto real"],correct:1,expl:"Cada segundo perdido dudando es un segundo menos para reducir velocidad, cambiar ángulo o alertar — la acción siempre supera a la espera."},
    {q:"Cambias la orden de timón tres veces en pocos segundos ante el riesgo. ¿Por qué es peligroso?",opts:["No es peligroso, cuantos más intentos mejor","Una maniobra incompleta suele ser peor que una insuficiente pero llevada hasta el final","El timonel se aburre","No afecta a la trayectoria del buque"],correct:1,expl:"Cambiar la orden en plena ejecución impide que el buque alcance una trayectoria estable, lo que puede empeorar la situación."},
    {q:"¿Por qué la verificación visual/AIS del tamaño real de un buque sigue siendo crucial hasta el final?",opts:["No lo es, el ARPA siempre basta","Un error sobre el tamaño o la trayectoria real puede distorsionar toda la decisión de emergencia","Solo concierne a los buques grandes","Es inútil de noche"],correct:1,expl:"El caso Sanchi/CF Crystal muestra que un error sobre el tamaño real del otro buque contribuyó directamente a retrasar la acción decisiva."},
    {q:"En el caso Sanchi/CF Crystal, ¿cuándo se ordenó la maniobra decisiva?",opts:["10 minutos antes del impacto","Aproximadamente 1 minuto antes del impacto — demasiado tarde para cambiar el resultado","Inmediatamente al detectar el riesgo","Después de la colisión"],correct:1,expl:"La maniobra a plena potencia se ordenó solo un minuto antes del impacto, mucho después del punto en que podría haber sido plenamente eficaz."},
    {q:"¿Por qué la carga del Sanchi agravó las consecuencias de la colisión?",opts:["No tuvo ningún efecto","El condensado transportado era altamente inflamable, lo que provocó un incendio y luego explosiones","Solo hizo más pesado al buque","Ralentizó el hundimiento"],correct:1,expl:"La carga de condensado, altamente inflamable, transformó una colisión en un gran incendio seguido de explosiones."},
    {q:"¿Cuál es el objetivo principal de la lista de verificación de los últimos segundos?",opts:["Cumplir una formalidad administrativa","Estructurar la acción para no perder ningún segundo útil ante un riesgo crítico","Sustituir la formación BRM","Solo informar al armador"],correct:1,expl:"La lista sirve para actuar rápido y en el orden correcto, sin perder tiempo pensando cada paso en plena emergencia."},
    {q:"¿Cuál es la diferencia entre L3 y las reglas de gobierno COLREG (Deck)?",opts:["No hay ninguna diferencia","L3 trata de lo que ocurre después/mientras una maniobra COLREG clásica no ha bastado o llega tarde","L3 reexplica íntegramente la Regla 8 y la Regla 17","El COLREG no concierne a las colisiones"],correct:1,expl:"L3 se centra en la acción en los últimos segundos, complementaria pero distinta de las reglas de gobierno ya enseñadas en Deck."},
    {q:"¿Cuál es el objetivo principal de la lección L3 en el Safety Department?",opts:["Reexplicar el GMDSS en detalle","Estructurar la acción inmediata en los últimos segundos antes de un impacto casi seguro","Estudiar la responsabilidad jurídica tras una colisión","Aprender las reglas de gobierno"],correct:1,expl:"L3 se centra exclusivamente en la acción práctica en la ventana crítica de los últimos segundos."},
  ],
  pt:[
    {q:"A partir de que momento a prioridade muda para reduzir a energia do impacto?",opts:["Assim que um contacto é detetado","Quando a colisão parece inevitável exceto se uma ação imediata mudar o resultado","Só depois do impacto","Nunca, deve sempre tentar-se evitar"],correct:1,expl:"A prioridade não muda ao primeiro sinal de risco, mas quando evitar totalmente se torna muito incerto exceto com uma ação imediata e decisiva."},
    {q:"TCPA de 90 segundos, ação necessária. Qual é o primeiro passo da checklist?",opts:["Contactar o armador","Reduzir/parar a máquina e agir no leme","Acordar o resto da tripulação um a um","Verificar o tempo"],correct:1,expl:"Máquina e leme são as duas alavancas imediatas que influenciam diretamente a energia e a trajetória do impacto."},
    {q:"Qual é o papel do sinal de perigo (5+ toques curtos) nos últimos segundos?",opts:["Reexplicar uma regra COLREG ao outro navio","Alertar imediatamente o outro navio de que a situação é crítica","Substituir o alarme geral a bordo","Sinalizar uma falha de motor"],correct:1,expl:"O sinal de perigo é um reflexo de alerta imediato para o outro navio, não uma manobra nem uma explicação das regras."},
    {q:"Por que o alarme geral deve ser acionado separadamente do alerta de ponte?",opts:["Não é necessário, a ponte basta","Para dar a toda a tripulação tempo de se preparar fisicamente para o impacto","Para cumprir uma formalidade administrativa","Só em caso de incêndio"],correct:1,expl:"O alerta de ponte (visto em L2) diz respeito à equipa de quarto; o alarme geral diz respeito a todo o navio, que deve preparar-se fisicamente."},
    {q:"Quanto tempo deve durar uma mensagem VHF de emergência nos últimos segundos antes do impacto?",opts:["Um procedimento completo de vários minutos","Alguns segundos, mensagem ultracurta sobre o perigo imediato","Nunca se deve usar o VHF nesta fase","5 minutos no mínimo segundo o protocolo GMDSS"],correct:1,expl:"Nos últimos segundos, a comunicação deve ser mínima e direta — a teoria completa do GMDSS não é o tema aqui."},
    {q:"Que ação reduz MAIS a energia transmitida no impacto?",opts:["Apagar as luzes de navegação","Reduzir a velocidade e mudar o ângulo de impacto tanto quanto possível","Buzinar várias vezes sem outra ação","Enviar uma mensagem de rádio longa"],correct:1,expl:"Menos velocidade e um ângulo de impacto reduzido (deslizamento em vez de perpendicular) diminuem significativamente a energia transmitida ao casco."},
    {q:"Por que um impacto perpendicular a toda a velocidade é o pior cenário?",opts:["É mais ruidoso","Toda a energia cinética transfere-se diretamente para o casco, sem dispersão","É mais rápido de reparar","Só diz respeito a navios pequenos"],correct:1,expl:"Sem dispersão de energia por deslizamento ou redução de velocidade, o impacto perpendicular transmite o máximo de energia diretamente à estrutura."},
    {q:"Hesitas vários segundos a perguntar-te se a colisão é mesmo inevitável. Qual é o erro?",opts:["Não há erro, a prudência é sempre boa","A hesitação atrasa a ação que ainda poderia reduzir a energia do impacto ou evitar o contacto","Deve-se sempre esperar confirmação do Comandante","A hesitação não tem impacto real"],correct:1,expl:"Cada segundo perdido a hesitar é um segundo a menos para reduzir a velocidade, mudar o ângulo ou alertar — a ação supera sempre a espera."},
    {q:"Mudas a ordem de leme três vezes em poucos segundos perante o risco. Por que é perigoso?",opts:["Não é perigoso, quanto mais tentativas melhor","Uma manobra incompleta é muitas vezes pior do que uma insuficiente mas levada até ao fim","O timoneiro fica aborrecido","Não afeta a trajetória do navio"],correct:1,expl:"Mudar a ordem a meio da execução impede o navio de atingir uma trajetória estável, o que pode agravar a situação."},
    {q:"Por que a verificação visual/AIS do tamanho real de um navio continua crucial até ao fim?",opts:["Não continua, o ARPA basta sempre","Um erro sobre o tamanho ou a trajetória real pode distorcer toda a decisão de emergência","Só diz respeito a navios grandes","É inútil à noite"],correct:1,expl:"O caso Sanchi/CF Crystal mostra que um erro sobre o tamanho real do outro navio contribuiu diretamente para atrasar a ação decisiva."},
    {q:"No caso Sanchi/CF Crystal, quando foi ordenada a manobra decisiva?",opts:["10 minutos antes do impacto","Cerca de 1 minuto antes do impacto — tarde demais para mudar o resultado","Imediatamente ao detetar o risco","Depois da colisão"],correct:1,expl:"A manobra a plena potência só foi ordenada cerca de um minuto antes do impacto, muito depois do ponto em que poderia ter sido totalmente eficaz."},
    {q:"Por que a carga do Sanchi agravou as consequências da colisão?",opts:["Não teve efeito nenhum","O condensado transportado era altamente inflamável, provocando um incêndio e depois explosões","Só tornou o navio mais pesado","Atrasou o afundamento"],correct:1,expl:"A carga de condensado, altamente inflamável, transformou uma colisão num grande incêndio seguido de explosões."},
    {q:"Qual é o objetivo principal da checklist dos últimos segundos?",opts:["Cumprir uma formalidade administrativa","Estruturar a ação para não perder nenhum segundo útil perante um risco crítico","Substituir a formação BRM","Só informar o armador"],correct:1,expl:"A checklist serve para agir rápido e pela ordem certa, sem perder tempo a pensar em cada passo no meio da emergência."},
    {q:"Qual é a diferença entre L3 e as regras de manobra COLREG (Deck)?",opts:["Não há diferença nenhuma","L3 trata do que acontece depois/enquanto uma manobra COLREG clássica não bastou ou chegou tarde","L3 reexplica integralmente a Regra 8 e a Regra 17","O COLREG não diz respeito a colisões"],correct:1,expl:"L3 foca-se na ação nos últimos segundos, complementar mas distinta das regras de manobra já ensinadas no Deck."},
    {q:"Qual é o objetivo principal da lição L3 no Safety Department?",opts:["Reexplicar o GMDSS em detalhe","Estruturar a ação imediata nos últimos segundos antes de um impacto quase certo","Estudar a responsabilidade jurídica após colisão","Aprender as regras de leme"],correct:1,expl:"L3 foca-se exclusivamente na ação prática na janela crítica dos últimos segundos."},
  ],
};

// ══════════════════════════════════════
// QUIZ — FINAL (5 QUESTIONS)
// ══════════════════════════════════════
export const QUIZ = {
  fr:[
    {q:"Quand la priorité bascule-t-elle vers la réduction de l'énergie de l'impact ?",opts:["Dès la première détection du risque","Quand la collision semble inévitable sauf action immédiate qui change l'issue","Uniquement après l'impact","Jamais"],correct:1,expl:"Ce basculement se produit quand l'évitement complet devient très incertain, pas au premier signe de danger."},
    {q:"TCPA 90 secondes. Quelle est la première étape ?",opts:["Réduire/stopper la machine et agir sur la barre simultanément","Attendre confirmation","Appeler l'armateur","Vérifier la météo"],correct:0,expl:"Machine et barre sont les leviers immédiats qui influencent l'énergie et la trajectoire de l'impact."},
    {q:"Quelle est la bonne pratique en cas de risque de changer d'avis sur l'ordre de barre ?",opts:["Changer plusieurs fois pour être sûr","Choisir une action et s'y engager pleinement","Attendre un deuxième avis","Ne rien faire"],correct:1,expl:"Une manœuvre incomplète est souvent pire qu'une manœuvre insuffisante mais menée à son terme."},
    {q:"Dans le cas Sanchi/CF Crystal, quelle a été l'erreur décisive ?",opts:["La manœuvre a été ordonnée trop tôt","La manœuvre décisive n'a été ordonnée qu'environ 1 minute avant l'impact","Il n'y avait pas de radar à bord","Les deux navires ont coulé"],correct:1,expl:"L'action a été prise bien après le point où elle aurait pu être pleinement efficace."},
    {q:"Quel est le rôle du signal de danger (5+ sons courts) dans les dernières secondes ?",opts:["Réexpliquer une règle COLREG","Alerter immédiatement l'autre navire que la situation est critique","Remplacer l'alarme générale","Signaler une panne moteur"],correct:1,expl:"C'est un réflexe d'alerte immédiat, pas une manœuvre ni une leçon de règles."},
  ],
  en:[
    {q:"When does priority shift toward reducing impact energy?",opts:["As soon as risk is first detected","When collision appears unavoidable unless immediate action changes the outcome","Only after impact","Never"],correct:1,expl:"This shift happens when full avoidance becomes very uncertain, not at the first sign of danger."},
    {q:"TCPA 90 seconds. What is the first step?",opts:["Reduce/stop the engine and act on the helm simultaneously","Wait for confirmation","Call the owner","Check the weather"],correct:0,expl:"Engine and helm are the immediate levers influencing impact energy and trajectory."},
    {q:"What is good practice when tempted to change the helm order repeatedly?",opts:["Change several times to be sure","Choose one action and commit fully","Wait for a second opinion","Do nothing"],correct:1,expl:"An incomplete maneuver is often worse than an insufficient one carried through."},
    {q:"In the Sanchi/CF Crystal case, what was the decisive error?",opts:["The maneuver was ordered too early","The decisive maneuver was ordered only about 1 minute before impact","There was no radar on board","Both vessels sank"],correct:1,expl:"Action was taken well past the point where it could have been fully effective."},
    {q:"What is the role of the danger signal (5+ short blasts) in the final seconds?",opts:["Re-explain a COLREG rule","Immediately alert the other vessel that the situation is critical","Replace the general alarm","Signal an engine failure"],correct:1,expl:"It is an immediate alert reflex, not a maneuver or a rules lesson."},
  ],
  es:[
    {q:"¿Cuándo se desplaza la prioridad hacia reducir la energía del impacto?",opts:["En cuanto se detecta el riesgo","Cuando la colisión parece inevitable salvo una acción inmediata que cambie el resultado","Solo después del impacto","Nunca"],correct:1,expl:"Este cambio ocurre cuando evitar por completo se vuelve muy incierto, no ante el primer signo de peligro."},
    {q:"TCPA de 90 segundos. ¿Cuál es el primer paso?",opts:["Reducir/parar la máquina y actuar sobre el timón simultáneamente","Esperar confirmación","Llamar al armador","Comprobar el tiempo"],correct:0,expl:"Máquina y timón son las palancas inmediatas que influyen en la energía y trayectoria del impacto."},
    {q:"¿Cuál es la buena práctica si se tiende a cambiar la orden de timón repetidamente?",opts:["Cambiar varias veces para estar seguro","Elegir una acción y comprometerse plenamente","Esperar una segunda opinión","No hacer nada"],correct:1,expl:"Una maniobra incompleta suele ser peor que una insuficiente pero llevada hasta el final."},
    {q:"En el caso Sanchi/CF Crystal, ¿cuál fue el error decisivo?",opts:["La maniobra se ordenó demasiado pronto","La maniobra decisiva se ordenó solo un minuto antes del impacto","No había radar a bordo","Ambos buques se hundieron"],correct:1,expl:"La acción se tomó mucho después del punto en que podría haber sido plenamente eficaz."},
    {q:"¿Cuál es el papel de la señal de peligro (5+ pitidos cortos) en los últimos segundos?",opts:["Reexplicar una regla COLREG","Alertar inmediatamente al otro buque de que la situación es crítica","Sustituir la alarma general","Señalar un fallo de motor"],correct:1,expl:"Es un reflejo de alerta inmediata, no una maniobra ni una lección de reglas."},
  ],
  pt:[
    {q:"Quando é que a prioridade muda para reduzir a energia do impacto?",opts:["Assim que o risco é detetado","Quando a colisão parece inevitável exceto se uma ação imediata mudar o resultado","Só depois do impacto","Nunca"],correct:1,expl:"Esta mudança ocorre quando evitar totalmente se torna muito incerto, não ao primeiro sinal de perigo."},
    {q:"TCPA de 90 segundos. Qual é o primeiro passo?",opts:["Reduzir/parar a máquina e agir no leme simultaneamente","Esperar confirmação","Chamar o armador","Verificar o tempo"],correct:0,expl:"Máquina e leme são as alavancas imediatas que influenciam a energia e a trajetória do impacto."},
    {q:"Qual é a boa prática quando se tende a mudar a ordem de leme repetidamente?",opts:["Mudar várias vezes para ter certeza","Escolher uma ação e comprometer-se totalmente","Esperar uma segunda opinião","Não fazer nada"],correct:1,expl:"Uma manobra incompleta é muitas vezes pior do que uma insuficiente mas levada até ao fim."},
    {q:"No caso Sanchi/CF Crystal, qual foi o erro decisivo?",opts:["A manobra foi ordenada cedo demais","A manobra decisiva só foi ordenada cerca de 1 minuto antes do impacto","Não havia radar a bordo","Ambos os navios afundaram"],correct:1,expl:"A ação foi tomada muito depois do ponto em que poderia ter sido totalmente eficaz."},
    {q:"Qual é o papel do sinal de perigo (5+ toques curtos) nos últimos segundos?",opts:["Reexplicar uma regra COLREG","Alertar imediatamente o outro navio de que a situação é crítica","Substituir o alarme geral","Sinalizar uma falha de motor"],correct:1,expl:"É um reflexo de alerta imediato, não uma manobra nem uma lição de regras."},
  ],
};

// ══════════════════════════════════════
// SAFETY REFLECTION
// ══════════════════════════════════════
function SafetyReflection({ lang }) {
  const q = {
    fr:"Si tu avais 90 secondes avant un impact devenu quasi certain, quelle serait ta toute première action — et pourquoi celle-là avant les autres ?",
    en:"If you had 90 seconds before an impact that had become nearly certain, what would be your very first action — and why that one before the others?",
    es:"Si tuvieras 90 segundos antes de un impacto casi seguro, ¿cuál sería tu primerísima acción — y por qué esa antes que las demás?",
    pt:"Se tivesses 90 segundos antes de um impacto quase certo, qual seria a tua primeiríssima ação — e por que essa antes das outras?",
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
        {lang==="fr"?"Il n'y a pas de bonne réponse — prends un instant pour y réfléchir.":lang==="en"?"There is no right answer — take a moment to reflect.":lang==="es"?"No hay una respuesta correcta — tómate un momento para reflexionar.":"Não há uma resposta certa — reserva um momento para refletir."}
      </div>
    </div>
  );
}


// ══════════════════════════════════════
// TEXT CONTENT
// ══════════════════════════════════════
const getContent = lang => {
  const d = {
    fr:{
      badge:"🛟 Safety · COLREG Safety — Collision Prevention & Response · Leçon 3/6 · ⭐ Premium",
      title:"Emergency Actions Before Impact",
      intro:"L1 et L2 ont montré comment le facteur humain individuel et la coordination d'équipe peuvent faire échouer une manœuvre pourtant connue.\n\nCette leçon commence là où les deux précédentes s'arrêtent : les toutes dernières secondes, quand la collision semble inévitable sauf action immédiate qui change l'issue.\n\nElle ne réexplique pas les règles de manœuvre COLREG (Deck) ni la théorie complète du GMDSS — elle se concentre sur l'action concrète, dans l'ordre, quand il ne reste presque plus de temps.",
      p0:"QUAND \"ÉVITER\" DEVIENT \"RÉDUIRE LES DÉGÂTS\"",s0t:"Le moment où la priorité bascule",
      s0:"Tant qu'une manœuvre franche selon COLREG reste possible, l'évitement complet est la priorité. Mais à mesure que le TCPA diminue, un moment arrive où la collision semble inévitable, sauf action immédiate qui change l'issue.\n\nCOMMENT PRÉVENIR L'ACCIDENT ? En agissant tôt, avant d'atteindre cette fenêtre critique.\nQUE FAIRE QUAND LE RISQUE APPARAÎT ? Basculer immédiatement vers une double priorité : tenter encore d'éviter ET réduire l'énergie de l'impact.\nQUELLE LEÇON RETENIR ? Chaque seconde restante doit servir une action, jamais une hésitation.",
      p1:"LA CHECK-LIST MENTALE DES DERNIÈRES SECONDES",s1t:"Machine, barre, signal, alarme, VHF — dans cet ordre",
      s1:"Dans les toutes dernières secondes, une séquence claire évite la paralysie de la décision : réduire/stopper la machine, agir sur la barre, émettre le signal de danger (5+ sons courts, sans réexpliquer COLREG), déclencher l'alarme générale, puis un message VHF ultra-court si le temps le permet.",
      p2:"ALARME GÉNÉRALE — ALERTER TOUT LE NAVIRE",s2t:"Au-delà de la passerelle",
      s2:"L2 a montré comment alerter l'équipe passerelle. L3 va plus loin : l'alarme générale doit alerter TOUT l'équipage, qui a besoin de quelques secondes pour se préparer physiquement à un choc — se tenir, s'accrocher, s'éloigner d'une zone dangereuse.",
      p3:"COMMUNICATION D'URGENCE MINIMALE",s3t:"Quelques secondes, pas une procédure complète",
      s3:"Dans cette fenêtre critique, un message VHF doit être bref et direct — signaler le danger immédiat à l'autre navire, ou lancer un Mayday si la situation l'exige. Ce n'est pas le moment d'une procédure GMDSS complète, qui reste un sujet à part entière.",
      p4:"RÉDUIRE L'ÉNERGIE DE L'IMPACT",s4t:"Vitesse et angle : les deux leviers qui restent",
      s4:"Même quand éviter complètement n'est plus certain, la vitesse et l'angle de choc restent des leviers actifs. Un impact à vitesse réduite et à angle atténué transmet beaucoup moins d'énergie qu'un choc perpendiculaire à pleine vitesse.",
      p5:"ERREURS FRÉQUENTES DANS LES DERNIÈRES SECONDES",s5t:"Hésiter et changer d'avis coûtent plus cher qu'agir",
      s5:"Les deux erreurs les plus fréquentes : hésiter en se demandant si la collision est vraiment inévitable, et changer d'ordre de manœuvre plusieurs fois. Une action engagée et menée à son terme reste toujours préférable à l'indécision.",
      p6:"🎯 EXERCICE OPÉRATIONNEL",p7:"⚠️ CAS RÉEL",p8:"📝 BANQUE DE 15 QUESTIONS",p9:"🪞 RÉFLEXION SÉCURITÉ",
      sumT:"RÉSUMÉ — LEÇON 3",
      sumP:["La priorité bascule quand éviter n'est plus certain, sauf action immédiate","Check-list : machine, barre, signal de danger, alarme générale, VHF court","L'alarme générale prépare tout l'équipage, pas seulement la passerelle","Réduire vitesse et angle de choc limite l'énergie transmise à l'impact","Agir vite et s'engager vaut mieux qu'hésiter ou changer d'avis"],
      learnedP:["La bascule entre éviter et réduire les dégâts","Check-list séquencée des dernières secondes","Alarme générale et communication d'urgence minimale","Réduction de l'énergie de l'impact","Erreurs fréquentes à éviter dans les dernières secondes"],
      safetyMsg:"When avoidance is no longer possible, every second still matters. The right action, taken without hesitation, is what separates a survivable collision from a tragedy.",
    },
    en:{
      badge:"🛟 Safety · COLREG Safety — Collision Prevention & Response · Lesson 3/6 · ⭐ Premium",
      title:"Emergency Actions Before Impact",
      intro:"L1 and L2 showed how individual human factors and team coordination can cause a known maneuver to fail.\n\nThis lesson starts where the previous two leave off: the very final seconds, when collision appears unavoidable unless immediate action changes the outcome.\n\nIt does not re-explain COLREG maneuvering rules (Deck) or the full GMDSS theory — it focuses on concrete, sequenced action when almost no time remains.",
      p0:"WHEN \"AVOID\" BECOMES \"REDUCE DAMAGE\"",s0t:"The moment priority shifts",
      s0:"As long as a clear COLREG maneuver remains possible, full avoidance is the priority. But as TCPA decreases, a moment arrives when collision appears unavoidable unless immediate action changes the outcome.\n\nHOW TO PREVENT THE ACCIDENT? By acting early, before reaching this critical window.\nWHAT TO DO WHEN THE RISK APPEARS? Immediately shift to a dual priority: still try to avoid AND reduce impact energy.\nWHAT LESSON TO RETAIN? Every remaining second must serve an action, never hesitation.",
      p1:"THE FINAL-SECONDS MENTAL CHECKLIST",s1t:"Engine, helm, signal, alarm, VHF — in this order",
      s1:"In the very final seconds, a clear sequence prevents decision paralysis: reduce/stop the engine, act on the helm, sound the danger signal (5+ short blasts, without re-explaining COLREG), trigger the general alarm, then an ultra-short VHF message if time allows.",
      p2:"GENERAL ALARM — ALERTING THE WHOLE VESSEL",s2t:"Beyond the bridge",
      s2:"L2 showed how to alert the bridge team. L3 goes further: the general alarm must alert the ENTIRE crew, who need a few seconds to physically brace for impact — hold on, brace, move away from a dangerous area.",
      p3:"MINIMAL EMERGENCY COMMUNICATION",s3t:"A few seconds, not a full procedure",
      s3:"In this critical window, a VHF message must be brief and direct — signal the immediate danger to the other vessel, or launch a Mayday if the situation requires it. This is not the moment for a full GMDSS procedure, which remains a topic of its own.",
      p4:"REDUCING IMPACT ENERGY",s4t:"Speed and angle: the two remaining levers",
      s4:"Even when full avoidance is no longer certain, speed and impact angle remain active levers. An impact at reduced speed and attenuated angle transfers far less energy than a perpendicular strike at full speed.",
      p5:"FREQUENT ERRORS IN THE FINAL SECONDS",s5t:"Hesitating and changing your mind cost more than acting",
      s5:"The two most frequent errors: hesitating while wondering if the collision is really unavoidable, and changing the maneuvering order multiple times. A committed action carried through is always preferable to indecision.",
      p6:"🎯 OPERATIONAL EXERCISE",p7:"⚠️ REAL ACCIDENT CASE",p8:"📝 15-QUESTION BANK",p9:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY — LESSON 3",
      sumP:["Priority shifts when avoidance is no longer certain, unless immediate action","Checklist: engine, helm, danger signal, general alarm, short VHF","The general alarm prepares the whole crew, not just the bridge","Reducing speed and impact angle limits the energy transferred at impact","Acting quickly and committing beats hesitating or changing your mind"],
      learnedP:["The shift between avoiding and reducing damage","Sequenced final-seconds checklist","General alarm and minimal emergency communication","Reducing impact energy","Frequent errors to avoid in the final seconds"],
      safetyMsg:"When avoidance is no longer possible, every second still matters. The right action, taken without hesitation, is what separates a survivable collision from a tragedy.",
    },
    es:{
      badge:"🛟 Seguridad · COLREG Safety — Prevención y Respuesta ante Abordajes · Lección 3/6 · ⭐ Premium",
      title:"Emergency Actions Before Impact",
      intro:"L1 y L2 mostraron cómo los factores humanos individuales y la coordinación de equipo pueden hacer fracasar una maniobra conocida.\n\nEsta lección comienza donde terminan las dos anteriores: los últimos segundos, cuando la colisión parece inevitable salvo una acción inmediata que cambie el resultado.\n\nNo reexplica las reglas de gobierno COLREG (Deck) ni la teoría completa del GMDSS — se centra en la acción concreta y secuenciada cuando casi no queda tiempo.",
      p0:"CUANDO \"EVITAR\" SE CONVIERTE EN \"REDUCIR EL DAÑO\"",s0t:"El momento en que cambia la prioridad",
      s0:"Mientras sea posible una maniobra franca según COLREG, evitar por completo es la prioridad. Pero a medida que el TCPA disminuye, llega un momento en que la colisión parece inevitable salvo una acción inmediata que cambie el resultado.\n\n¿CÓMO PREVENIR EL ACCIDENTE? Actuando pronto, antes de llegar a esta ventana crítica.\n¿QUÉ HACER CUANDO APARECE EL RIESGO? Cambiar inmediatamente a una doble prioridad: seguir intentando evitar Y reducir la energía del impacto.\n¿QUÉ LECCIÓN RETENER? Cada segundo restante debe servir a una acción, nunca a la duda.",
      p1:"LA LISTA MENTAL DE LOS ÚLTIMOS SEGUNDOS",s1t:"Máquina, timón, señal, alarma, VHF — en este orden",
      s1:"En los últimos segundos, una secuencia clara evita la parálisis de la decisión: reducir/parar la máquina, actuar sobre el timón, emitir la señal de peligro (5+ pitidos cortos, sin reexplicar COLREG), activar la alarma general, y luego un mensaje VHF ultracorto si el tiempo lo permite.",
      p2:"ALARMA GENERAL — ALERTAR A TODO EL BUQUE",s2t:"Más allá del puente",
      s2:"L2 mostró cómo alertar al equipo de puente. L3 va más allá: la alarma general debe alertar a TODA la tripulación, que necesita unos segundos para prepararse físicamente para el impacto — sujetarse, prepararse, alejarse de una zona peligrosa.",
      p3:"COMUNICACIÓN DE EMERGENCIA MÍNIMA",s3t:"Unos segundos, no un procedimiento completo",
      s3:"En esta ventana crítica, un mensaje VHF debe ser breve y directo — señalar el peligro inmediato al otro buque, o lanzar un Mayday si la situación lo exige. No es el momento de un procedimiento GMDSS completo, que sigue siendo un tema aparte.",
      p4:"REDUCIR LA ENERGÍA DEL IMPACTO",s4t:"Velocidad y ángulo: las dos palancas que quedan",
      s4:"Incluso cuando evitar por completo ya no es seguro, la velocidad y el ángulo de choque siguen siendo palancas activas. Un impacto a velocidad reducida y ángulo atenuado transmite mucha menos energía que un choque perpendicular a plena velocidad.",
      p5:"ERRORES FRECUENTES EN LOS ÚLTIMOS SEGUNDOS",s5t:"Dudar y cambiar de opinión cuestan más que actuar",
      s5:"Los dos errores más frecuentes: dudar preguntándose si la colisión es realmente inevitable, y cambiar la orden de maniobra varias veces. Una acción comprometida y llevada hasta el final siempre es preferible a la indecisión.",
      p6:"🎯 EJERCICIO OPERATIVO",p7:"⚠️ CASO REAL",p8:"📝 BANCO DE 15 PREGUNTAS",p9:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN — LECCIÓN 3",
      sumP:["La prioridad cambia cuando evitar ya no es seguro, salvo acción inmediata","Lista: máquina, timón, señal de peligro, alarma general, VHF corto","La alarma general prepara a toda la tripulación, no solo al puente","Reducir velocidad y ángulo de choque limita la energía transmitida","Actuar rápido y comprometerse es mejor que dudar o cambiar de opinión"],
      learnedP:["El cambio entre evitar y reducir el daño","Lista secuenciada de los últimos segundos","Alarma general y comunicación de emergencia mínima","Reducción de la energía del impacto","Errores frecuentes a evitar en los últimos segundos"],
      safetyMsg:"When avoidance is no longer possible, every second still matters. The right action, taken without hesitation, is what separates a survivable collision from a tragedy.",
    },
    pt:{
      badge:"🛟 Segurança · COLREG Safety — Prevenção e Resposta a Abalroamentos · Lição 3/6 · ⭐ Premium",
      title:"Emergency Actions Before Impact",
      intro:"L1 e L2 mostraram como os fatores humanos individuais e a coordenação de equipa podem fazer falhar uma manobra conhecida.\n\nEsta lição começa onde as duas anteriores terminam: os últimos segundos, quando a colisão parece inevitável exceto se uma ação imediata mudar o resultado.\n\nNão reexplica as regras de manobra COLREG (Deck) nem a teoria completa do GMDSS — foca-se na ação concreta e sequenciada quando quase não resta tempo.",
      p0:"QUANDO \"EVITAR\" SE TORNA \"REDUZIR O DANO\"",s0t:"O momento em que a prioridade muda",
      s0:"Enquanto uma manobra franca segundo o COLREG for possível, evitar totalmente é a prioridade. Mas à medida que o TCPA diminui, chega um momento em que a colisão parece inevitável exceto se uma ação imediata mudar o resultado.\n\nCOMO PREVENIR O ACIDENTE? Agindo cedo, antes de chegar a esta janela crítica.\nO QUE FAZER QUANDO O RISCO APARECE? Mudar imediatamente para uma dupla prioridade: continuar a tentar evitar E reduzir a energia do impacto.\nQUE LIÇÃO RETER? Cada segundo restante deve servir uma ação, nunca uma hesitação.",
      p1:"A CHECKLIST MENTAL DOS ÚLTIMOS SEGUNDOS",s1t:"Máquina, leme, sinal, alarme, VHF — por esta ordem",
      s1:"Nos últimos segundos, uma sequência clara evita a paralisia da decisão: reduzir/parar a máquina, agir no leme, emitir o sinal de perigo (5+ toques curtos, sem reexplicar o COLREG), acionar o alarme geral, depois uma mensagem VHF ultracurta se o tempo permitir.",
      p2:"ALARME GERAL — ALERTAR TODO O NAVIO",s2t:"Para além da ponte",
      s2:"L2 mostrou como alertar a equipa de ponte. L3 vai mais longe: o alarme geral deve alertar TODA a tripulação, que precisa de alguns segundos para se preparar fisicamente para o impacto — segurar-se, preparar-se, afastar-se de uma zona perigosa.",
      p3:"COMUNICAÇÃO DE EMERGÊNCIA MÍNIMA",s3t:"Alguns segundos, não um procedimento completo",
      s3:"Nesta janela crítica, uma mensagem VHF deve ser breve e direta — sinalizar o perigo imediato ao outro navio, ou lançar um Mayday se a situação o exigir. Não é o momento para um procedimento GMDSS completo, que continua a ser um tema à parte.",
      p4:"REDUZIR A ENERGIA DO IMPACTO",s4t:"Velocidade e ângulo: as duas alavancas que restam",
      s4:"Mesmo quando evitar totalmente já não é certo, a velocidade e o ângulo de impacto continuam a ser alavancas ativas. Um impacto a velocidade reduzida e ângulo atenuado transmite muito menos energia do que um choque perpendicular a toda a velocidade.",
      p5:"ERROS FREQUENTES NOS ÚLTIMOS SEGUNDOS",s5t:"Hesitar e mudar de ideias custam mais do que agir",
      s5:"Os dois erros mais frequentes: hesitar a perguntar-se se a colisão é mesmo inevitável, e mudar a ordem de manobra várias vezes. Uma ação comprometida e levada até ao fim é sempre preferível à indecisão.",
      p6:"🎯 EXERCÍCIO OPERACIONAL",p7:"⚠️ CASO REAL",p8:"📝 BANCO DE 15 PERGUNTAS",p9:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO — LIÇÃO 3",
      sumP:["A prioridade muda quando evitar já não é certo, exceto com ação imediata","Checklist: máquina, leme, sinal de perigo, alarme geral, VHF curto","O alarme geral prepara toda a tripulação, não só a ponte","Reduzir velocidade e ângulo de impacto limita a energia transmitida","Agir rápido e comprometer-se vale mais que hesitar ou mudar de ideias"],
      learnedP:["A mudança entre evitar e reduzir o dano","Checklist sequenciada dos últimos segundos","Alarme geral e comunicação de emergência mínima","Redução da energia do impacto","Erros frequentes a evitar nos últimos segundos"],
      safetyMsg:"When avoidance is no longer possible, every second still matters. The right action, taken without hesitation, is what separates a survivable collision from a tragedy.",
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN
// ══════════════════════════════════════
export default function LessonSafetyS1_L3({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, onQuizScored=(score:number,maxScore:number)=>{} }) {
  const t = T[lang]||T.fr;
  const quiz = QUIZ[lang]||QUIZ.fr;
  const bank = BANK[lang]||BANK.fr;
  const lc = getContent(lang);
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
            <div style={{fontSize:10,color:C.gold,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>{t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 3/6":lang==="en"?"Lesson 3/6":lang==="es"?"Lección 3/6":"Lição 3/6"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.blue2,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.red},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(192,57,43,0.15)",border:`1px solid ${C.red}44`,fontSize:11,color:C.red,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.red}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>

            <SL icon="⏳" text={lc.p0}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⏳</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>⏳ {lang==="fr"?"LIGNE DE TEMPS — INTERACTIF":lang==="en"?"TIMELINE — INTERACTIVE":lang==="es"?"LÍNEA DE TIEMPO — INTERACTIVO":"LINHA DO TEMPO — INTERATIVO"}</div><TimelineSVG lang={lang}/></Card>

            <SL icon="✅" text={lc.p1} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>✅</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>✅ {lang==="fr"?"CHECK-LIST — INTERACTIF":lang==="en"?"CHECKLIST — INTERACTIVE":lang==="es"?"LISTA — INTERACTIVO":"CHECKLIST — INTERATIVO"}</div><ChecklistSVG lang={lang}/></Card>

            <SL icon="🚨" text={lc.p2} color={C.red}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🚨</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>

            <SL icon="📻" text={lc.p3} color={C.teal}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📻</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>

            <SL icon="💥" text={lc.p4} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>💥</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>💥 {lang==="fr"?"ANGLE D'IMPACT — INTERACTIF":lang==="en"?"IMPACT ANGLE — INTERACTIVE":lang==="es"?"ÁNGULO DE IMPACTO — INTERACTIVO":"ÂNGULO DE IMPACTO — INTERATIVO"}</div><ImpactAngleSVG lang={lang}/></Card>

            <SL icon="⚠️" text={lc.p5} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚠️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s5t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s5}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>⚠️ {lang==="fr"?"ERREURS FRÉQUENTES — INTERACTIF":lang==="en"?"FREQUENT ERRORS — INTERACTIVE":lang==="es"?"ERRORES FRECUENTES — INTERACTIVO":"ERROS FREQUENTES — INTERATIVO"}</div><ErrorsSVG lang={lang}/></Card>

            <SL icon="🎯" text={lc.p6} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p7} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p8} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank} onComplete={()=>setBankDone(true)}/></Card>

            <SL icon="🪞" text={lc.p9} color={C.purple}/>
            <div style={{marginBottom:14}}><SafetyReflection lang={lang}/></div>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(192,57,43,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.red}33`}}>
              <div style={{fontSize:11,color:C.red,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,boxShadow:"0 10px 36px rgba(192,57,43,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz Final — Actions d'Urgence":lang==="en"?"Final Quiz — Emergency Actions":lang==="es"?"Quiz Final — Acciones de Emergencia":"Quiz Final — Ações de Emergência"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 3/6":"questions · Lesson 3/6"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);onQuizScored(s,quiz.length);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(192,57,43,0.15)",border:`1px solid ${C.red}55`,fontSize:14,color:C.gold2,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
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

            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(192,57,43,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 4 — LES PREMIÈRES MINUTES →":lang==="en"?"LESSON 4 — THE FIRST MINUTES →":lang==="es"?"LECCIÓN 4 — LOS PRIMEROS MINUTOS →":"LIÇÃO 4 — OS PRIMEIROS MINUTOS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
