import { useState, useEffect } from "react";
import { shuffleQuestionOptions, C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// ══════════════════════════════════════
// SVG 1 — STRESS-PERFORMANCE CURVE + TIME COMPRESSION
// ══════════════════════════════════════
function StressCurveSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const pts = [
    { id:0, x:30, label:{fr:"Complaisance",en:"Complacency",es:"Complacencia",pt:"Complacência"},
      desc:{fr:"Trop peu de stress : vigilance réduite, routine qui endort le jugement.",en:"Too little stress: reduced vigilance, routine dulling judgment.",es:"Demasiado poco estrés: vigilancia reducida, rutina que adormece el juicio.",pt:"Stress a menos: vigilância reduzida, rotina que adormece o julgamento."} },
    { id:1, x:150, label:{fr:"Zone optimale",en:"Optimal zone",es:"Zona óptima",pt:"Zona ótima"},
      desc:{fr:"Le stress aiguise l'attention et accélère la décision sans la déformer — c'est la zone à viser.",en:"Stress sharpens attention and speeds up decisions without distorting them — this is the zone to aim for.",es:"El estrés agudiza la atención y acelera la decisión sin deformarla — es la zona a buscar.",pt:"O stress aguça a atenção e acelera a decisão sem a deformar — é a zona a atingir."} },
    { id:2, x:270, label:{fr:"Vision tunnel / paralysie",en:"Tunnel vision / paralysis",es:"Visión túnel / parálisis",pt:"Visão em túnel / paralisia"},
      desc:{fr:"Trop de stress : le champ d'attention se réduit dangereusement, jusqu'à la paralysie décisionnelle.",en:"Too much stress: the attention field narrows dangerously, up to decision paralysis.",es:"Demasiado estrés: el campo de atención se reduce peligrosamente, hasta la parálisis decisional.",pt:"Stress a mais: o campo de atenção reduz-se perigosamente, até à paralisia decisional."} },
  ];
  const sel_ = sel!==null ? pts[sel] : null;
  return (
    <div>
      <svg width="100%" height="110" viewBox="0 0 300 110">
        <path d="M20,90 Q150,10 280,90" fill="none" stroke={C.gold2} strokeWidth="2.5"/>
        {pts.map(p=>(
          <g key={p.id} onClick={()=>setSel(sel===p.id?null:p.id)} style={{cursor:"pointer"}}>
            <circle cx={p.x} cy={p.id===1?25:80} r={sel===p.id?9:6} fill={p.id===1?C.green:p.id===0?C.blue2:C.red}/>
          </g>
        ))}
      </svg>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
        {pts.map(p=>(
          <div key={p.id} onClick={()=>setSel(sel===p.id?null:p.id)} style={{fontSize:9,fontWeight:700,cursor:"pointer",color:sel===p.id?(p.id===1?C.green:p.id===0?C.blue2:C.red):C.muted,textAlign:"center",flex:1}}>{p.label[lang]||p.label.fr}</div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(255,255,255,0.05)",border:`1px solid ${C.border}`,fontSize:11,color:C.white,lineHeight:1.7,marginBottom:8}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
      <div style={{padding:"10px 12px",borderRadius:12,background:"rgba(201,146,42,0.08)",border:`1px solid ${C.gold}33`,fontSize:11,color:C.gold2,lineHeight:1.7}}>
        {lang==="fr"?"⏱️ TIME COMPRESSION : sous stress, le temps semble s'accélérer ou se ralentir. Cette perception faussée influence directement la qualité de la décision — d'où l'intérêt de s'appuyer sur une méthode plutôt que sur une impression.":
         lang==="en"?"⏱️ TIME COMPRESSION: under stress, time seems to speed up or slow down. This distorted perception directly affects decision quality — which is why relying on a method beats relying on a feeling.":
         lang==="es"?"⏱️ TIME COMPRESSION: bajo estrés, el tiempo parece acelerarse o ralentizarse. Esta percepción distorsionada afecta directamente a la calidad de la decisión — de ahí el interés de apoyarse en un método más que en una impresión.":
         "⏱️ TIME COMPRESSION: sob stress, o tempo parece acelerar ou abrandar. Esta perceção distorcida afeta diretamente a qualidade da decisão — daí o interesse de se apoiar num método em vez de numa impressão."}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — PRIORITIZATION MATRIX
// ══════════════════════════════════════
function PriorityMatrixSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const quads = [
    { id:"urgent", color:C.red, label:{fr:"Urgent",en:"Urgent",es:"Urgente",pt:"Urgente"},
      ex:{fr:"Voie d'eau active, feu déclaré, blessé grave — agir maintenant, sans délai.",en:"Active flooding, declared fire, serious injury — act now, without delay.",es:"Vía de agua activa, incendio declarado, herido grave — actuar ahora, sin demora.",pt:"Via de água ativa, incêndio declarado, ferido grave — agir agora, sem demora."} },
    { id:"important", color:C.gold2, label:{fr:"Important, pas urgent",en:"Important, not urgent",es:"Importante, no urgente",pt:"Importante, não urgente"},
      ex:{fr:"Prévenir l'armateur, documenter les faits — important, mais peut suivre l'action immédiate.",en:"Notify the owner, document the facts — important, but can follow the immediate action.",es:"Avisar al armador, documentar los hechos — importante, pero puede seguir a la acción inmediata.",pt:"Avisar o armador, documentar os factos — importante, mas pode seguir a ação imediata."} },
    { id:"wait", color:C.teal, label:{fr:"Peut attendre",en:"Can wait",es:"Puede esperar",pt:"Pode esperar"},
      ex:{fr:"Rangement, rapports administratifs de routine — clairement secondaire en situation de crise.",en:"Tidying up, routine administrative reports — clearly secondary during a crisis.",es:"Ordenar, informes administrativos rutinarios — claramente secundario en una crisis.",pt:"Arrumação, relatórios administrativos de rotina — claramente secundário numa crise."} },
    { id:"distract", color:C.muted, label:{fr:"Distraction",en:"Distraction",es:"Distracción",pt:"Distração"},
      ex:{fr:"Ce qui semble urgent mais ne l'est pas réellement — reconnaître et écarter activement.",en:"What seems urgent but isn't really — recognize and actively set aside.",es:"Lo que parece urgente pero no lo es realmente — reconocer y descartar activamente.",pt:"O que parece urgente mas não é realmente — reconhecer e afastar ativamente."} },
  ];
  const sel_ = sel?quads.find(q=>q.id===sel):null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {quads.map(q=>(
          <div key={q.id} onClick={()=>setSel(sel===q.id?null:q.id)}
            style={{padding:"12px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===q.id?`${q.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===q.id?q.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:11,fontWeight:700,color:sel===q.id?q.color:C.muted}}>{q.label[lang]||q.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.ex[lang]||sel_.ex.fr}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — DECISION FRAMEWORK WHEEL
// ══════════════════════════════════════
function DecisionWheelSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, icon:"👁️", color:C.blue2, label:{fr:"Observer",en:"Observe",es:"Observar",pt:"Observar"},
      desc:{fr:"Rassembler les faits vérifiés — pas les suppositions. Que sait-on vraiment, pas ce qu'on imagine.",en:"Gather verified facts — not assumptions. What is truly known, not what is imagined.",es:"Reunir los hechos verificados — no las suposiciones. Lo que realmente se sabe, no lo que se imagina.",pt:"Reunir os factos verificados — não as suposições. O que realmente se sabe, não o que se imagina."} },
    { id:2, icon:"⚖️", color:C.gold2, label:{fr:"Décider",en:"Decide",es:"Decidir",pt:"Decidir"},
      desc:{fr:"Choisir une action claire à partir des faits, en priorisant l'urgent sur l'important.",en:"Choose a clear action based on the facts, prioritizing the urgent over the important.",es:"Elegir una acción clara a partir de los hechos, priorizando lo urgente sobre lo importante.",pt:"Escolher uma ação clara a partir dos factos, priorizando o urgente sobre o importante."} },
    { id:3, icon:"⚡", color:C.orange, label:{fr:"Agir",en:"Act",es:"Actuar",pt:"Agir"},
      desc:{fr:"Exécuter pleinement, sans hésitation résiduelle — une action engagée vaut mieux qu'une hésitation prolongée.",en:"Execute fully, without residual hesitation — a committed action beats prolonged hesitation.",es:"Ejecutar plenamente, sin dudas residuales — una acción comprometida vale más que una duda prolongada.",pt:"Executar plenamente, sem hesitação residual — uma ação comprometida vale mais que uma hesitação prolongada."} },
    { id:4, icon:"🔄", color:C.green, label:{fr:"Réévaluer",en:"Reassess",es:"Reevaluar",pt:"Reavaliar"},
      desc:{fr:"Aussi important que Décider : vérifier si la situation a changé et ajuster si nécessaire. Une bonne décision reste toujours ouverte à la révision.",en:"As important as Decide: check if the situation has changed and adjust if needed. A good decision always stays open to revision.",es:"Tan importante como Decidir: comprobar si la situación ha cambiado y ajustar si es necesario. Una buena decisión siempre permanece abierta a la revisión.",pt:"Tão importante como Decidir: verificar se a situação mudou e ajustar se necessário. Uma boa decisão permanece sempre aberta à revisão."} },
  ];
  const sel_ = sel!==null ? steps.find(s=>s.id===sel) : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {steps.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)}
            style={{padding:"12px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===s.id?`${s.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===s.id?s.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:4}}>{s.icon}</div>
            <div style={{fontSize:11,fontWeight:700,color:sel===s.id?s.color:C.muted}}>{s.id}. {s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — TUNNEL VISION COMPARATOR
// ══════════════════════════════════════
function TunnelVisionSVG({ lang }) {
  const [side, setSide] = useState("wide");
  const d = {
    wide:{fr:"L'officier surveille plusieurs sources indépendantes (visuel, radar, VHF, comportement de l'autre navire) et reste prêt à changer d'interprétation si un signal contredit son hypothèse initiale.",
          en:"The officer monitors several independent sources (visual, radar, VHF, the other vessel's behavior) and stays ready to change interpretation if a signal contradicts the initial assumption.",
          es:"El oficial vigila varias fuentes independientes (visual, radar, VHF, comportamiento del otro buque) y permanece listo para cambiar de interpretación si una señal contradice la hipótesis inicial.",
          pt:"O oficial vigia várias fontes independentes (visual, radar, VHF, comportamento do outro navio) e permanece pronto para mudar de interpretação se um sinal contradisser a hipótese inicial."},
    fixed:{fr:"L'officier a décidé dès le début que \"l'autre navire va passer par bâbord\" et continue de l'interpréter ainsi, même quand son comportement réel suggère le contraire.",
           en:"The officer decided early on that \"the other vessel will pass to port\" and keeps interpreting it that way, even when its actual behavior suggests otherwise.",
           es:"El oficial decidió desde el principio que \"el otro buque pasará por babor\" y sigue interpretándolo así, incluso cuando su comportamiento real sugiere lo contrario.",
           pt:"O oficial decidiu desde o início que \"o outro navio vai passar por bombordo\" e continua a interpretá-lo assim, mesmo quando o seu comportamento real sugere o contrário."},
  };
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {["wide","fixed"].map(k=>(
          <button key={k} onClick={()=>setSide(k)} style={{flex:1,padding:"10px 0",borderRadius:12,border:`1.5px solid ${side===k?(k==="wide"?C.green:C.red):"rgba(255,255,255,0.12)"}`,background:side===k?`${k==="wide"?C.green:C.red}22`:"rgba(255,255,255,0.04)",color:side===k?(k==="wide"?C.green:C.red):C.muted,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
            {k==="wide"?(lang==="fr"?"✅ VISION LARGE":lang==="en"?"✅ WIDE AWARENESS":lang==="es"?"✅ VISIÓN AMPLIA":"✅ VISÃO AMPLA"):(lang==="fr"?"❌ FIXATION":lang==="en"?"❌ FIXATION":lang==="es"?"❌ FIJACIÓN":"❌ FIXAÇÃO")}
          </button>
        ))}
      </div>
      <div style={{padding:"12px 14px",borderRadius:12,background:side==="wide"?"rgba(30,138,74,0.1)":"rgba(192,57,43,0.1)",border:`1px solid ${side==="wide"?C.green:C.red}44`,fontSize:12,color:C.white,lineHeight:1.7}}>{d[side][lang]||d[side].fr}</div>
      <div style={{marginTop:8,fontSize:11,color:C.gold2,lineHeight:1.6,fontStyle:"italic",textAlign:"center"}}>
        {lang==="fr"?"\"Never fall in love with your first assumption.\" — une hypothèse doit toujours être vérifiée, jamais protégée.":
         lang==="en"?"\"Never fall in love with your first assumption.\" — an assumption must always be checked, never protected.":
         lang==="es"?"\"Never fall in love with your first assumption.\" — una hipótesis siempre debe verificarse, nunca protegerse.":
         "\"Never fall in love with your first assumption.\" — uma hipótese deve ser sempre verificada, nunca protegida."}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE — VERIFIED-ASSUMPTION SCENARIO
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:"",q5:"",q6:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"a",q3:"c",q4:"b",q5:"a",q6:"c"};
  const qs = {
    fr:[
      {id:"q1",q:"Deux navires s'approchent d'une même zone. Ton officier suppose que l'autre navire passera par bâbord, sans l'avoir confirmé. Quelle hypothèse doit être vérifiée EN PREMIER ?\na) La météo du lendemain\nb) Le comportement réel de l'autre navire par rapport à l'hypothèse initiale\nc) Le carburant restant"},
      {id:"q2",q:"L'autre navire ne se comporte pas comme prévu. Que fais-tu ?\na) Contacter directement l'autre navire pour clarifier les intentions\nb) Continuer selon l'hypothèse initiale, elle était raisonnable\nc) Attendre encore quelques minutes pour voir"},
      {id:"q3",q:"Combien de temps peux-tu encore attendre une confirmation avant d'agir seul ?\na) Le temps qu'il faut, la sécurité n'est jamais pressée\nb) Une heure, le temps standard\nc) Le temps restant avant que l'action ne devienne inefficace — pas plus"},
      {id:"q4",q:"Quelle erreur de décision a été commise dans ce scénario ?\na) Une vérification excessive\nb) Une fixation sur une hypothèse non vérifiée malgré des signaux contraires\nc) Une communication trop fréquente"},
      {id:"q5",q:"Quelle information supplémentaire aurait pu améliorer cette décision ?\na) Un contact VHF direct et précoce avec l'autre navire pour confirmer les intentions réciproques\nb) La liste des passagers\nc) L'historique météo de la semaine précédente"},
      {id:"q6",q:"Quel principe de cette leçon a été le plus décisif dans ce scénario ?\na) La courbe stress-performance uniquement\nb) La prioritisation urgent/important\nc) Ne jamais s'attacher à sa première hypothèse sans la vérifier"},
    ],
    en:[
      {id:"q1",q:"Two vessels are approaching the same area. Your officer assumes the other vessel will pass to port, without confirming it. Which assumption must be verified FIRST?\na) Tomorrow's weather\nb) The other vessel's actual behavior compared to the initial assumption\nc) Remaining fuel"},
      {id:"q2",q:"The other vessel is not behaving as expected. What do you do?\na) Directly contact the other vessel to clarify intentions\nb) Continue with the initial assumption, it was reasonable\nc) Wait a few more minutes to see"},
      {id:"q3",q:"How long can you still wait for confirmation before acting alone?\na) As long as it takes, safety is never rushed\nb) One hour, the standard time\nc) The time remaining before action becomes ineffective — no more"},
      {id:"q4",q:"Which decision error was made in this scenario?\na) Excessive verification\nb) Fixation on an unverified assumption despite contrary signals\nc) Too frequent communication"},
      {id:"q5",q:"What additional information could have improved this decision?\na) An early, direct VHF contact with the other vessel to confirm mutual intentions\nb) The passenger list\nc) Last week's weather history"},
      {id:"q6",q:"Which principle of this lesson was most decisive in this scenario?\na) The stress-performance curve alone\nb) Urgent/important prioritization\nc) Never fall in love with your first assumption without checking it"},
    ],
    es:[
      {id:"q1",q:"Dos buques se acercan a la misma zona. Tu oficial supone que el otro buque pasará por babor, sin haberlo confirmado. ¿Qué hipótesis debe verificarse PRIMERO?\na) El tiempo de mañana\nb) El comportamiento real del otro buque frente a la hipótesis inicial\nc) El combustible restante"},
      {id:"q2",q:"El otro buque no se comporta como se esperaba. ¿Qué haces?\na) Contactar directamente con el otro buque para aclarar intenciones\nb) Continuar según la hipótesis inicial, era razonable\nc) Esperar unos minutos más para ver"},
      {id:"q3",q:"¿Cuánto tiempo puedes esperar aún una confirmación antes de actuar solo?\na) El tiempo que haga falta, la seguridad nunca tiene prisa\nb) Una hora, el tiempo estándar\nc) El tiempo restante antes de que la acción deje de ser eficaz — no más"},
      {id:"q4",q:"¿Qué error de decisión se cometió en este escenario?\na) Una verificación excesiva\nb) Una fijación en una hipótesis no verificada pese a señales contrarias\nc) Una comunicación demasiado frecuente"},
      {id:"q5",q:"¿Qué información adicional habría podido mejorar esta decisión?\na) Un contacto VHF directo y temprano con el otro buque para confirmar las intenciones mutuas\nb) La lista de pasajeros\nc) El historial meteorológico de la semana anterior"},
      {id:"q6",q:"¿Qué principio de esta lección fue el más decisivo en este escenario?\na) Solo la curva estrés-rendimiento\nb) La priorización urgente/importante\nc) Nunca enamorarse de la primera hipótesis sin verificarla"},
    ],
    pt:[
      {id:"q1",q:"Dois navios aproximam-se da mesma zona. O teu oficial supõe que o outro navio vai passar por bombordo, sem o confirmar. Que hipótese deve ser verificada PRIMEIRO?\na) O tempo de amanhã\nb) O comportamento real do outro navio face à hipótese inicial\nc) O combustível restante"},
      {id:"q2",q:"O outro navio não se comporta como esperado. O que fazes?\na) Contactar diretamente o outro navio para esclarecer intenções\nb) Continuar segundo a hipótese inicial, era razoável\nc) Esperar mais alguns minutos para ver"},
      {id:"q3",q:"Quanto tempo podes ainda esperar por uma confirmação antes de agir sozinho?\na) O tempo que for preciso, a segurança nunca tem pressa\nb) Uma hora, o tempo padrão\nc) O tempo restante antes de a ação deixar de ser eficaz — não mais"},
      {id:"q4",q:"Que erro de decisão foi cometido neste cenário?\na) Uma verificação excessiva\nb) Uma fixação numa hipótese não verificada apesar de sinais contrários\nc) Uma comunicação demasiado frequente"},
      {id:"q5",q:"Que informação adicional poderia ter melhorado esta decisão?\na) Um contacto VHF direto e precoce com o outro navio para confirmar as intenções mútuas\nb) A lista de passageiros\nc) O histórico meteorológico da semana anterior"},
      {id:"q6",q:"Que princípio desta lição foi o mais decisivo neste cenário?\na) Só a curva stress-desempenho\nb) A priorização urgente/importante\nc) Nunca te apaixonares pela tua primeira hipótese sem a verificar"},
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
        {lang==="fr"?"✅ Q1: b — vérifier le comportement réel, pas l'hypothèse\n✅ Q2: a — contact direct, pas de délai supplémentaire\n✅ Q3: c — le temps disponible se mesure à l'efficacité de l'action, pas à une durée fixe\n✅ Q4: b — fixation classique sur une hypothèse non vérifiée\n✅ Q5: a — un contact direct précoce aurait résolu l'ambiguïté\n✅ Q6: c — c'est le cœur de la leçon L5":
         lang==="en"?"✅ Q1: b — verify actual behavior, not the assumption\n✅ Q2: a — direct contact, no further delay\n✅ Q3: c — available time is measured by action effectiveness, not a fixed duration\n✅ Q4: b — classic fixation on an unverified assumption\n✅ Q5: a — an early direct contact would have resolved the ambiguity\n✅ Q6: c — this is the heart of lesson L5":
         "✅ Q1: b · Q2: a · Q3: c · Q4: b · Q5: a · Q6: c"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — EVER SMART / ALEXANDRA 1
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Ever Smart — Alexandra 1, Jebel Ali (2015)",teaser:"Porte-conteneurs · Pétrolier · Hypothèses non vérifiées · Décision à 3 secondes de l'impact",
      what:"À l'entrée du chenal de Jebel Ali, le porte-conteneurs Ever Smart quitte le port après avoir débarqué son pilote pendant que le pétrolier Alexandra 1 attend d'entrer. Chaque capitaine se forge sa propre hypothèse sur la façon dont les navires vont se croiser, sans jamais la confirmer directement avec l'autre. L'équipe passerelle de l'Ever Smart cesse de surveiller l'Alexandra 1 pendant huit minutes. Quand le capitaine de l'Alexandra 1 réalise que l'Ever Smart ne change pas de cap comme prévu, il appelle le contrôle du port au lieu de contacter directement l'autre navire — perdant des secondes précieuses. L'ordre de barre décisif de l'Ever Smart, \"hard to starboard\", n'arrive que trois secondes avant l'impact. Les deux navires se percutent bord à bord à l'entrée du chenal ; dégâts matériels importants des deux côtés, aucune victime.",
      cause:"• Deux hypothèses différentes et jamais confirmées entre les deux passerelles sur la façon de se croiser\n• Absence de vérification croisée pendant huit minutes critiques\n• Choix de contacter le contrôle du port plutôt que l'autre navire directement, retardant la clarification\n• Décision de manœuvre arrivée seulement trois secondes avant l'impact — bien après le point utile",
      lessons:"✓ Une hypothèse doit toujours être vérifiée directement avec l'autre partie concernée, jamais supposée\n✓ Chercher l'information manquante avant de s'engager sur une interprétation\n✓ Contacter directement la source la plus pertinente fait gagner un temps souvent décisif\n✓ Une fixation prolongée sur une hypothèse initiale peut coûter le temps nécessaire pour agir efficacement",
      link:"🔗 Distinct des cas précédents : ici, l'angle est la fixation sur une hypothèse non vérifiée et la décision trop tardive qui en découle — au cœur même du sujet de L5."},
    en:{title:"Ever Smart — Alexandra 1, Jebel Ali (2015)",teaser:"Container ship · Tanker · Unverified assumptions · Decision 3 seconds before impact",
      what:"At the entrance to the Jebel Ali channel, the container ship Ever Smart leaves port after disembarking its pilot while the tanker Alexandra 1 waits to enter. Each captain forms their own assumption about how the vessels will pass, without ever confirming it directly with the other. Ever Smart's bridge team stops monitoring Alexandra 1 for eight minutes. When Alexandra 1's captain realizes Ever Smart is not altering course as expected, he calls port control instead of contacting the other vessel directly — losing precious seconds. Ever Smart's decisive helm order, \"hard to starboard\", comes only three seconds before impact. The two vessels collide bow to bow at the channel entrance; significant damage on both sides, no injuries.",
      cause:"• Two different, never-confirmed assumptions between the two bridges about how they would pass\n• No cross-verification during eight critical minutes\n• Choice to contact port control rather than the other vessel directly, delaying clarification\n• Maneuvering decision arriving only three seconds before impact — well past the useful point",
      lessons:"✓ An assumption must always be verified directly with the other party concerned, never assumed\n✓ Seek missing information before committing to an interpretation\n✓ Directly contacting the most relevant source often saves decisive time\n✓ Prolonged fixation on an initial assumption can cost the time needed to act effectively",
      link:"🔗 Distinct from previous cases: here the angle is fixation on an unverified assumption and the resulting late decision — right at the heart of L5's subject."},
    es:{title:"Ever Smart — Alexandra 1, Jebel Ali (2015)",teaser:"Portacontenedores · Petrolero · Hipótesis no verificadas · Decisión a 3 segundos del impacto",
      what:"A la entrada del canal de Jebel Ali, el portacontenedores Ever Smart sale del puerto tras desembarcar a su práctico mientras el petrolero Alexandra 1 espera para entrar. Cada capitán se forma su propia hipótesis sobre cómo se cruzarán los buques, sin confirmarla nunca directamente con el otro. El equipo de puente del Ever Smart deja de vigilar al Alexandra 1 durante ocho minutos. Cuando el capitán del Alexandra 1 se da cuenta de que el Ever Smart no cambia de rumbo como esperaba, llama al control del puerto en lugar de contactar directamente con el otro buque — perdiendo segundos preciosos. La orden de timón decisiva del Ever Smart, \"hard to starboard\", llega solo tres segundos antes del impacto. Ambos buques colisionan de proa a proa en la entrada del canal; daños materiales importantes en ambos lados, sin víctimas.",
      cause:"• Dos hipótesis diferentes y nunca confirmadas entre los dos puentes sobre cómo se cruzarían\n• Sin verificación cruzada durante ocho minutos críticos\n• Elección de contactar al control del puerto en lugar de al otro buque directamente, retrasando la aclaración\n• Decisión de maniobra llegada solo tres segundos antes del impacto",
      lessons:"✓ Una hipótesis siempre debe verificarse directamente con la otra parte implicada, nunca suponerse\n✓ Buscar la información que falta antes de comprometerse con una interpretación\n✓ Contactar directamente con la fuente más relevante suele ahorrar tiempo decisivo\n✓ Una fijación prolongada en una hipótesis inicial puede costar el tiempo necesario para actuar eficazmente",
      link:"🔗 Distinto de los casos anteriores: aquí el ángulo es la fijación en una hipótesis no verificada y la decisión tardía resultante — en el corazón mismo del tema de L5."},
    pt:{title:"Ever Smart — Alexandra 1, Jebel Ali (2015)",teaser:"Porta-contentores · Petroleiro · Hipóteses não verificadas · Decisão a 3 segundos do impacto",
      what:"Na entrada do canal de Jebel Ali, o porta-contentores Ever Smart deixa o porto após desembarcar o piloto enquanto o petroleiro Alexandra 1 espera para entrar. Cada comandante forma a sua própria hipótese sobre como os navios se vão cruzar, sem nunca a confirmar diretamente com o outro. A equipa de ponte do Ever Smart deixa de vigiar o Alexandra 1 durante oito minutos. Quando o comandante do Alexandra 1 percebe que o Ever Smart não muda de rumo como esperado, liga para o controlo do porto em vez de contactar diretamente o outro navio — perdendo segundos preciosos. A ordem de leme decisiva do Ever Smart, \"hard to starboard\", só chega três segundos antes do impacto. Os dois navios colidem proa com proa na entrada do canal; danos materiais importantes de ambos os lados, sem vítimas.",
      cause:"• Duas hipóteses diferentes e nunca confirmadas entre as duas pontes sobre como se cruzariam\n• Sem verificação cruzada durante oito minutos críticos\n• Escolha de contactar o controlo do porto em vez do outro navio diretamente, atrasando o esclarecimento\n• Decisão de manobra chegada apenas três segundos antes do impacto",
      lessons:"✓ Uma hipótese deve ser sempre verificada diretamente com a outra parte envolvida, nunca suposta\n✓ Procurar a informação em falta antes de se comprometer com uma interpretação\n✓ Contactar diretamente a fonte mais relevante muitas vezes poupa tempo decisivo\n✓ Uma fixação prolongada numa hipótese inicial pode custar o tempo necessário para agir eficazmente",
      link:"🔗 Distinto dos casos anteriores: aqui o ângulo é a fixação numa hipótese não verificada e a decisão tardia daí resultante — no centro do próprio tema de L5."},
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
// BANK — 15 QUESTIONS (min. 6 varied scenarios)
// ══════════════════════════════════════
export const BANK = {
  fr:[
    {q:"Pourquoi la décision sous pression est-elle décrite comme une compétence plutôt qu'un instinct ?",opts:["Parce qu'elle est innée chez certains marins seulement","Parce qu'elle s'entraîne, en mobilisant méthode et expérience plutôt que le seul réflexe","Parce qu'elle ne concerne que les capitaines","Parce qu'elle est purement théorique"],correct:1,expl:"Comme toute compétence, la décision sous pression se construit par l'entraînement et la répétition de méthodes, pas par un don naturel."},
    {q:"Que se passe-t-il en zone de complaisance sur la courbe stress-performance ?",opts:["La vigilance est maximale","La vigilance est réduite par manque de stress activateur","Le jugement est parfait","Le temps ralentit fortement"],correct:1,expl:"Trop peu de stress mène à une vigilance relâchée, tout comme trop de stress mène à la paralysie — les deux extrêmes dégradent la décision."},
    {q:"Qu'est-ce que la Time Compression ?",opts:["Un outil de navigation","La perception faussée du temps sous stress, qui peut sembler s'accélérer ou se ralentir","Une technique de gestion du carburant","Un type de signal radar"],correct:1,expl:"Sous stress, la perception du temps se déforme, ce qui peut fausser le jugement si l'on ne s'appuie pas sur une méthode plutôt que sur une impression."},
    {q:"Incendie en cuisine, appel administratif en attente, rangement à faire. Que fais-tu en premier ?",opts:["Le rangement, pour garder l'ordre","L'appel administratif, il attend depuis longtemps","L'incendie — c'est la seule urgence réelle parmi les trois"],correct:2,expl:"L'incendie est urgent et met des vies en danger ; l'appel est important mais peut attendre ; le rangement peut clairement attendre."},
    {q:"Quelle est la différence entre 'urgent' et 'important' dans la matrice de priorisation ?",opts:["Il n'y a aucune différence","Urgent nécessite une action immédiate ; important a de la valeur mais peut suivre l'action immédiate","Important est toujours plus urgent qu'urgent","Cela dépend uniquement du grade de la personne"],correct:1,expl:"Confondre urgent et important mène à traiter les mauvaises priorités en premier — une cause fréquente de mauvaise décision sous pression."},
    {q:"Quelle est l'étape du cadre de décision aussi importante que 'Décider' ?",opts:["Observer uniquement","Réévaluer — vérifier si la situation a changé et ajuster si nécessaire","Il n'y a pas d'étape aussi importante","Documenter administrativement"],correct:1,expl:"Réévaluer permet de corriger une décision si la situation évolue — une bonne décision reste toujours ouverte à la révision."},
    {q:"Qu'est-ce que la vision tunnel dans le contexte de la décision sous pression ?",opts:["Une perte de vision physique réelle","Se fixer sur une hypothèse initiale et ne plus percevoir les signaux qui la contredisent","Une technique de concentration recommandée","Un type de jumelles de navigation"],correct:1,expl:"La vision tunnel réduit dangereusement le champ d'attention, empêchant de percevoir des informations contraires à l'hypothèse initiale."},
    {q:"Que signifie 'Never fall in love with your first assumption' ?",opts:["Il ne faut jamais prendre de décision rapide","Une hypothèse doit toujours être vérifiée, jamais protégée par attachement","Il faut changer d'avis à chaque nouvelle information, même mineure","Cela ne concerne que les situations de navigation"],correct:1,expl:"L'attachement émotionnel à une première interprétation empêche de la remettre en question même face à des signaux contraires clairs."},
    {q:"Vous avez pris une décision, mais la situation évolue différemment de ce que vous aviez prévu. Que faites-vous ?",opts:["Continuer coûte que coûte, changer d'avis serait un signe de faiblesse","Réévaluer et ajuster la décision selon les nouveaux éléments","Attendre que quelqu'un d'autre décide à votre place","Ignorer les nouveaux éléments s'ils compliquent la situation"],correct:1,expl:"Réévaluer face à une situation qui évolue n'est pas une faiblesse — c'est une compétence essentielle de décision sous pression."},
    {q:"Pourquoi changer d'avis trop souvent est-il également problématique ?",opts:["Ce n'est jamais problématique","Cela empêche toute action d'aboutir et peut aggraver la situation, comme vu en L3","Cela montre un bon esprit critique dans tous les cas","Cela n'a aucun lien avec la décision sous pression"],correct:1,expl:"Il existe un équilibre entre s'engager dans une action et savoir la réévaluer — changer sans cesse d'avis empêche toute action cohérente."},
    {q:"Deux navires s'approchent d'une même zone sans confirmation mutuelle de leurs intentions. Quelle action réduit le plus le risque ?",opts:["Attendre que la situation se clarifie d'elle-même","Contacter directement l'autre navire pour confirmer les intentions réciproques","Changer de fréquence radio","Réduire l'éclairage de la passerelle"],correct:1,expl:"Le contact direct élimine l'ambiguïté bien plus efficacement qu'une hypothèse non vérifiée ou un appel à un tiers."},
    {q:"Dans le cas Ever Smart/Alexandra 1, quelle erreur a coûté des secondes précieuses ?",opts:["Contacter le contrôle du port au lieu de l'autre navire directement","Contacter l'autre navire trop tôt","Une panne totale de radar","Une erreur de carte marine"],correct:0,expl:"Le choix de passer par un tiers (le contrôle du port) plutôt que par un contact direct a retardé la clarification de la situation."},
    {q:"Quelle information manquait le plus dans le cas Ever Smart/Alexandra 1 ?",opts:["La météo du jour","La confirmation directe et précoce des intentions réciproques entre les deux passerelles","Le nombre de passagers","L'historique de maintenance des navires"],correct:1,expl:"L'absence de confirmation directe entre les deux capitaines a permis à deux hypothèses contradictoires de coexister sans être corrigées à temps."},
    {q:"Quel est l'objectif principal de la banque de scénarios de décision de cette leçon ?",opts:["Mémoriser des règles COLREG supplémentaires","Entraîner le jugement à travers des situations variées, en mobilisant tout ce qui a été appris en L1-L4","Remplacer les leçons précédentes","Se concentrer uniquement sur les collisions frontales"],correct:1,expl:"L5 est conçue comme un entraînement pratique du jugement, synthétisant les acquis des quatre leçons précédentes dans des situations diverses."},
    {q:"Quel est l'objectif principal de la leçon L5 dans le Safety Department ?",opts:["Introduire un nouveau domaine de connaissances techniques","Entraîner la prise de décision sous pression en mobilisant les acquis de L1 à L4","Réexpliquer les règles de barre COLREG","Étudier la responsabilité juridique après collision"],correct:1,expl:"L5 ne réenseigne rien de nouveau sur le fond — elle transforme les connaissances des leçons précédentes en compétence pratique de décision."},
  ],
  en:[
    {q:"Why is decision-making under pressure described as a skill rather than an instinct?",opts:["Because it is innate in only some sailors","Because it is trained, mobilizing method and experience rather than mere reflex","Because it only concerns Captains","Because it is purely theoretical"],correct:1,expl:"Like any skill, decision-making under pressure is built through training and repeated methods, not a natural gift."},
    {q:"What happens in the complacency zone of the stress-performance curve?",opts:["Vigilance is maximal","Vigilance is reduced due to lack of activating stress","Judgment is perfect","Time slows down dramatically"],correct:1,expl:"Too little stress leads to relaxed vigilance, just as too much stress leads to paralysis — both extremes degrade decision-making."},
    {q:"What is Time Compression?",opts:["A navigation tool","The distorted perception of time under stress, which can seem to speed up or slow down","A fuel management technique","A type of radar signal"],correct:1,expl:"Under stress, time perception becomes distorted, which can skew judgment unless one relies on a method rather than a feeling."},
    {q:"Galley fire, pending administrative call, tidying to do. What do you do first?",opts:["Tidying, to keep order","The administrative call, it's been waiting a while","The fire — it's the only real emergency among the three"],correct:2,expl:"The fire is urgent and endangers lives; the call is important but can wait; tidying can clearly wait."},
    {q:"What is the difference between 'urgent' and 'important' in the prioritization matrix?",opts:["There is no difference","Urgent requires immediate action; important has value but can follow the immediate action","Important is always more urgent than urgent","It depends solely on the person's rank"],correct:1,expl:"Confusing urgent and important leads to tackling the wrong priorities first — a frequent cause of poor decisions under pressure."},
    {q:"Which step of the decision framework is as important as 'Decide'?",opts:["Observe only","Reassess — checking if the situation has changed and adjusting if needed","There is no equally important step","Administrative documentation"],correct:1,expl:"Reassessing allows correcting a decision as the situation evolves — a good decision always stays open to revision."},
    {q:"What is tunnel vision in the context of decision-making under pressure?",opts:["An actual loss of physical vision","Fixating on an initial assumption and no longer perceiving signals that contradict it","A recommended concentration technique","A type of navigation binoculars"],correct:1,expl:"Tunnel vision dangerously narrows the attention field, preventing perception of information contrary to the initial assumption."},
    {q:"What does 'Never fall in love with your first assumption' mean?",opts:["You must never make a fast decision","An assumption must always be checked, never protected out of attachment","You must change your mind at every new piece of information, even minor ones","It only concerns navigation situations"],correct:1,expl:"Emotional attachment to a first interpretation prevents questioning it even in the face of clear contrary signals."},
    {q:"You made a decision, but the situation is evolving differently than expected. What do you do?",opts:["Keep going no matter what, changing your mind would be a sign of weakness","Reassess and adjust the decision based on new elements","Wait for someone else to decide instead","Ignore new elements if they complicate the situation"],correct:1,expl:"Reassessing in the face of an evolving situation is not weakness — it is an essential decision-making skill under pressure."},
    {q:"Why is changing your mind too often also problematic?",opts:["It is never problematic","It prevents any action from being completed and can worsen the situation, as seen in L3","It always shows good critical thinking","It has no link to decision-making under pressure"],correct:1,expl:"There is a balance between committing to an action and knowing when to reassess it — constantly changing your mind prevents any coherent action."},
    {q:"Two vessels approach the same area without mutual confirmation of intentions. Which action most reduces the risk?",opts:["Waiting for the situation to clarify itself","Directly contacting the other vessel to confirm mutual intentions","Changing radio frequency","Reducing bridge lighting"],correct:1,expl:"Direct contact eliminates ambiguity far more effectively than an unverified assumption or a call to a third party."},
    {q:"In the Ever Smart/Alexandra 1 case, which error cost precious seconds?",opts:["Contacting port control instead of the other vessel directly","Contacting the other vessel too early","A total radar failure","A navigational chart error"],correct:0,expl:"Choosing to go through a third party (port control) rather than direct contact delayed clarification of the situation."},
    {q:"What information was most missing in the Ever Smart/Alexandra 1 case?",opts:["The day's weather","Direct, early confirmation of mutual intentions between the two bridges","The number of passengers","The vessels' maintenance history"],correct:1,expl:"The absence of direct confirmation between the two captains allowed two contradictory assumptions to coexist without being corrected in time."},
    {q:"What is the main purpose of this lesson's decision scenario bank?",opts:["Memorize additional COLREG rules","Train judgment through varied situations, mobilizing everything learned in L1-L4","Replace previous lessons","Focus only on head-on collisions"],correct:1,expl:"L5 is designed as practical judgment training, synthesizing the knowledge from the four previous lessons across diverse situations."},
    {q:"What is the main goal of lesson L5 in the Safety Department?",opts:["Introduce a new field of technical knowledge","Train decision-making under pressure by mobilizing L1-L4 knowledge","Re-explain COLREG steering rules","Study legal liability after a collision"],correct:1,expl:"L5 doesn't re-teach anything new in substance — it turns the knowledge from previous lessons into practical decision-making skill."},
  ],
  es:[
    {q:"¿Por qué la decisión bajo presión se describe como una habilidad y no un instinto?",opts:["Porque es innata solo en algunos marinos","Porque se entrena, movilizando método y experiencia más que el mero reflejo","Porque solo concierne a los Capitanes","Porque es puramente teórica"],correct:1,expl:"Como cualquier habilidad, la decisión bajo presión se construye mediante entrenamiento y métodos repetidos, no un don natural."},
    {q:"¿Qué ocurre en la zona de complacencia de la curva estrés-rendimiento?",opts:["La vigilancia es máxima","La vigilancia se reduce por falta de estrés activador","El juicio es perfecto","El tiempo se ralentiza drásticamente"],correct:1,expl:"Demasiado poco estrés lleva a una vigilancia relajada, igual que demasiado estrés lleva a la parálisis — ambos extremos degradan la decisión."},
    {q:"¿Qué es el Time Compression?",opts:["Una herramienta de navegación","La percepción distorsionada del tiempo bajo estrés, que puede parecer acelerarse o ralentizarse","Una técnica de gestión de combustible","Un tipo de señal de radar"],correct:1,expl:"Bajo estrés, la percepción del tiempo se distorsiona, lo que puede sesgar el juicio si no se confía en un método en vez de una impresión."},
    {q:"Incendio en la cocina, llamada administrativa pendiente, orden por hacer. ¿Qué haces primero?",opts:["Ordenar, para mantener el orden","La llamada administrativa, lleva tiempo esperando","El incendio — es la única emergencia real de las tres"],correct:2,expl:"El incendio es urgente y pone en peligro vidas; la llamada es importante pero puede esperar; ordenar claramente puede esperar."},
    {q:"¿Cuál es la diferencia entre 'urgente' e 'importante' en la matriz de priorización?",opts:["No hay ninguna diferencia","Urgente requiere acción inmediata; importante tiene valor pero puede seguir a la acción inmediata","Importante siempre es más urgente que urgente","Depende únicamente del rango de la persona"],correct:1,expl:"Confundir urgente e importante lleva a atender las prioridades equivocadas primero — una causa frecuente de mala decisión bajo presión."},
    {q:"¿Qué etapa del marco de decisión es tan importante como 'Decidir'?",opts:["Solo Observar","Reevaluar — comprobar si la situación ha cambiado y ajustar si es necesario","No hay ninguna etapa igual de importante","Documentar administrativamente"],correct:1,expl:"Reevaluar permite corregir una decisión si la situación evoluciona — una buena decisión siempre permanece abierta a la revisión."},
    {q:"¿Qué es la visión túnel en el contexto de la decisión bajo presión?",opts:["Una pérdida real de visión física","Fijarse en una hipótesis inicial y dejar de percibir las señales que la contradicen","Una técnica de concentración recomendada","Un tipo de prismáticos de navegación"],correct:1,expl:"La visión túnel reduce peligrosamente el campo de atención, impidiendo percibir información contraria a la hipótesis inicial."},
    {q:"¿Qué significa 'Never fall in love with your first assumption'?",opts:["Nunca hay que tomar una decisión rápida","Una hipótesis siempre debe verificarse, nunca protegerse por apego","Hay que cambiar de opinión ante cada nueva información, por menor que sea","Solo concierne a situaciones de navegación"],correct:1,expl:"El apego emocional a una primera interpretación impide cuestionarla incluso ante señales contrarias claras."},
    {q:"Has tomado una decisión, pero la situación evoluciona de forma diferente a la esperada. ¿Qué haces?",opts:["Seguir a toda costa, cambiar de opinión sería una señal de debilidad","Reevaluar y ajustar la decisión según los nuevos elementos","Esperar a que otra persona decida en tu lugar","Ignorar los nuevos elementos si complican la situación"],correct:1,expl:"Reevaluar ante una situación que evoluciona no es debilidad — es una habilidad esencial de decisión bajo presión."},
    {q:"¿Por qué cambiar de opinión demasiado a menudo también es problemático?",opts:["Nunca es problemático","Impide que cualquier acción se complete y puede agravar la situación, como se vio en L3","Siempre muestra buen sentido crítico","No tiene relación con la decisión bajo presión"],correct:1,expl:"Existe un equilibrio entre comprometerse con una acción y saber reevaluarla — cambiar constantemente de opinión impide cualquier acción coherente."},
    {q:"Dos buques se acercan a la misma zona sin confirmación mutua de sus intenciones. ¿Qué acción reduce más el riesgo?",opts:["Esperar a que la situación se aclare sola","Contactar directamente con el otro buque para confirmar las intenciones mutuas","Cambiar de frecuencia de radio","Reducir la iluminación del puente"],correct:1,expl:"El contacto directo elimina la ambigüedad mucho más eficazmente que una hipótesis no verificada o una llamada a un tercero."},
    {q:"En el caso Ever Smart/Alexandra 1, ¿qué error costó segundos preciosos?",opts:["Contactar al control del puerto en lugar de al otro buque directamente","Contactar al otro buque demasiado pronto","Un fallo total del radar","Un error de carta náutica"],correct:0,expl:"La elección de pasar por un tercero (el control del puerto) en lugar de un contacto directo retrasó la aclaración de la situación."},
    {q:"¿Qué información faltaba más en el caso Ever Smart/Alexandra 1?",opts:["El tiempo del día","La confirmación directa y temprana de las intenciones mutuas entre los dos puentes","El número de pasajeros","El historial de mantenimiento de los buques"],correct:1,expl:"La ausencia de confirmación directa entre los dos capitanes permitió que dos hipótesis contradictorias coexistieran sin corregirse a tiempo."},
    {q:"¿Cuál es el objetivo principal del banco de escenarios de decisión de esta lección?",opts:["Memorizar reglas COLREG adicionales","Entrenar el juicio a través de situaciones variadas, movilizando todo lo aprendido en L1-L4","Reemplazar las lecciones anteriores","Centrarse solo en colisiones frontales"],correct:1,expl:"L5 está diseñada como un entrenamiento práctico del juicio, sintetizando los conocimientos de las cuatro lecciones anteriores en situaciones diversas."},
    {q:"¿Cuál es el objetivo principal de la lección L5 en el Safety Department?",opts:["Introducir un nuevo campo de conocimiento técnico","Entrenar la toma de decisiones bajo presión movilizando los conocimientos de L1 a L4","Reexplicar las reglas de gobierno COLREG","Estudiar la responsabilidad jurídica tras una colisión"],correct:1,expl:"L5 no reenseña nada nuevo en el fondo — convierte el conocimiento de las lecciones anteriores en una habilidad práctica de decisión."},
  ],
  pt:[
    {q:"Por que a decisão sob pressão é descrita como uma competência e não um instinto?",opts:["Porque é inata apenas em alguns marítimos","Porque se treina, mobilizando método e experiência em vez do mero reflexo","Porque só diz respeito aos Comandantes","Porque é puramente teórica"],correct:1,expl:"Como qualquer competência, a decisão sob pressão constrói-se através de treino e métodos repetidos, não um dom natural."},
    {q:"O que acontece na zona de complacência da curva stress-desempenho?",opts:["A vigilância é máxima","A vigilância é reduzida por falta de stress ativador","O julgamento é perfeito","O tempo abranda drasticamente"],correct:1,expl:"Stress a menos leva a uma vigilância relaxada, tal como stress a mais leva à paralisia — ambos os extremos degradam a decisão."},
    {q:"O que é a Time Compression?",opts:["Uma ferramenta de navegação","A perceção distorcida do tempo sob stress, que pode parecer acelerar ou abrandar","Uma técnica de gestão de combustível","Um tipo de sinal de radar"],correct:1,expl:"Sob stress, a perceção do tempo distorce-se, o que pode enviesar o julgamento a menos que se confie num método em vez de numa impressão."},
    {q:"Incêndio na cozinha, chamada administrativa pendente, arrumação a fazer. O que fazes primeiro?",opts:["A arrumação, para manter a ordem","A chamada administrativa, já está à espera há tempo","O incêndio — é a única emergência real das três"],correct:2,expl:"O incêndio é urgente e coloca vidas em perigo; a chamada é importante mas pode esperar; a arrumação claramente pode esperar."},
    {q:"Qual é a diferença entre 'urgente' e 'importante' na matriz de priorização?",opts:["Não há diferença nenhuma","Urgente requer ação imediata; importante tem valor mas pode seguir a ação imediata","Importante é sempre mais urgente que urgente","Depende apenas do grau da pessoa"],correct:1,expl:"Confundir urgente e importante leva a tratar as prioridades erradas primeiro — uma causa frequente de má decisão sob pressão."},
    {q:"Que etapa do quadro de decisão é tão importante quanto 'Decidir'?",opts:["Só Observar","Reavaliar — verificar se a situação mudou e ajustar se necessário","Não há etapa igualmente importante","Documentar administrativamente"],correct:1,expl:"Reavaliar permite corrigir uma decisão à medida que a situação evolui — uma boa decisão permanece sempre aberta à revisão."},
    {q:"O que é a visão em túnel no contexto da decisão sob pressão?",opts:["Uma perda real de visão física","Fixar-se numa hipótese inicial e deixar de perceber sinais que a contradizem","Uma técnica de concentração recomendada","Um tipo de binóculos de navegação"],correct:1,expl:"A visão em túnel reduz perigosamente o campo de atenção, impedindo a perceção de informação contrária à hipótese inicial."},
    {q:"O que significa 'Never fall in love with your first assumption'?",opts:["Nunca se deve tomar uma decisão rápida","Uma hipótese deve ser sempre verificada, nunca protegida por apego","É preciso mudar de ideias a cada nova informação, mesmo menor","Só diz respeito a situações de navegação"],correct:1,expl:"O apego emocional a uma primeira interpretação impede questioná-la mesmo perante sinais contrários claros."},
    {q:"Tomaste uma decisão, mas a situação evolui de forma diferente do esperado. O que fazes?",opts:["Continuar custe o que custar, mudar de ideias seria sinal de fraqueza","Reavaliar e ajustar a decisão segundo os novos elementos","Esperar que outra pessoa decida em teu lugar","Ignorar os novos elementos se complicarem a situação"],correct:1,expl:"Reavaliar perante uma situação em evolução não é fraqueza — é uma competência essencial de decisão sob pressão."},
    {q:"Por que mudar de ideias demasiadas vezes também é problemático?",opts:["Nunca é problemático","Impede que qualquer ação se complete e pode agravar a situação, como visto em L3","Mostra sempre bom espírito crítico","Não tem ligação com a decisão sob pressão"],correct:1,expl:"Existe um equilíbrio entre comprometer-se com uma ação e saber reavaliá-la — mudar constantemente de ideias impede qualquer ação coerente."},
    {q:"Dois navios aproximam-se da mesma zona sem confirmação mútua das intenções. Que ação reduz mais o risco?",opts:["Esperar que a situação se esclareça sozinha","Contactar diretamente o outro navio para confirmar as intenções mútuas","Mudar de frequência de rádio","Reduzir a iluminação da ponte"],correct:1,expl:"O contacto direto elimina a ambiguidade muito mais eficazmente do que uma hipótese não verificada ou uma chamada a terceiros."},
    {q:"No caso Ever Smart/Alexandra 1, que erro custou segundos preciosos?",opts:["Contactar o controlo do porto em vez do outro navio diretamente","Contactar o outro navio cedo demais","Uma falha total do radar","Um erro de carta náutica"],correct:0,expl:"A escolha de passar por um terceiro (o controlo do porto) em vez de um contacto direto atrasou o esclarecimento da situação."},
    {q:"Que informação faltava mais no caso Ever Smart/Alexandra 1?",opts:["O tempo do dia","A confirmação direta e precoce das intenções mútuas entre as duas pontes","O número de passageiros","O histórico de manutenção dos navios"],correct:1,expl:"A ausência de confirmação direta entre os dois comandantes permitiu que duas hipóteses contraditórias coexistissem sem serem corrigidas a tempo."},
    {q:"Qual é o objetivo principal do banco de cenários de decisão desta lição?",opts:["Memorizar regras COLREG adicionais","Treinar o julgamento através de situações variadas, mobilizando tudo o que foi aprendido em L1-L4","Substituir as lições anteriores","Focar-se apenas em colisões frontais"],correct:1,expl:"L5 foi concebida como um treino prático do julgamento, sintetizando o conhecimento das quatro lições anteriores em situações diversas."},
    {q:"Qual é o objetivo principal da lição L5 no Safety Department?",opts:["Introduzir um novo campo de conhecimento técnico","Treinar a tomada de decisão sob pressão mobilizando o conhecimento de L1 a L4","Reexplicar as regras de leme COLREG","Estudar a responsabilidade jurídica após colisão"],correct:1,expl:"L5 não reensina nada de novo em substância — transforma o conhecimento das lições anteriores em competência prática de decisão."},
  ],
};

// ══════════════════════════════════════
// QUIZ — FINAL (5 QUESTIONS)
// ══════════════════════════════════════
export const QUIZ = {
  fr:[
    {q:"Que se passe-t-il en zone de vision tunnel sur la courbe stress-performance ?",opts:["La vigilance est maximale","Le champ d'attention se réduit dangereusement, jusqu'à la paralysie","Le jugement s'améliore","Rien de particulier"],correct:1,expl:"Trop de stress mène à une réduction dangereuse du champ d'attention, tout comme trop peu de stress mène à la complaisance."},
    {q:"Incendie déclaré, appel administratif en attente. Que fais-tu en premier ?",opts:["L'appel administratif","L'incendie — c'est la seule urgence réelle","Attendre les deux ensemble"],correct:1,expl:"L'incendie est urgent et met des vies en danger ; l'appel est important mais peut clairement attendre."},
    {q:"Quelle étape du cadre de décision est aussi importante que 'Décider' ?",opts:["Réévaluer","Documenter","Attendre"],correct:0,expl:"Réévaluer permet d'ajuster la décision si la situation change — aussi essentiel que la décision initiale."},
    {q:"Que signifie 'Never fall in love with your first assumption' ?",opts:["Ne jamais décider rapidement","Une hypothèse doit toujours être vérifiée, jamais protégée par attachement","Changer d'avis à chaque instant"],correct:1,expl:"L'attachement à une première interprétation empêche de la remettre en question face à des signaux contraires."},
    {q:"Dans le cas Ever Smart/Alexandra 1, quelle information manquait le plus ?",opts:["La météo du jour","La confirmation directe et précoce des intentions réciproques","Le nombre de passagers"],correct:1,expl:"L'absence de contact direct entre les deux capitaines a permis à deux hypothèses contradictoires de coexister trop longtemps."},
  ],
  en:[
    {q:"What happens in the tunnel-vision zone of the stress-performance curve?",opts:["Vigilance is maximal","The attention field narrows dangerously, up to paralysis","Judgment improves","Nothing in particular"],correct:1,expl:"Too much stress leads to a dangerous narrowing of the attention field, just as too little stress leads to complacency."},
    {q:"Fire declared, administrative call pending. What do you do first?",opts:["The administrative call","The fire — it's the only real emergency","Wait for both together"],correct:1,expl:"The fire is urgent and endangers lives; the call is important but can clearly wait."},
    {q:"Which decision-framework step is as important as 'Decide'?",opts:["Reassess","Document","Wait"],correct:0,expl:"Reassessing allows adjusting the decision as the situation changes — as essential as the initial decision."},
    {q:"What does 'Never fall in love with your first assumption' mean?",opts:["Never decide quickly","An assumption must always be checked, never protected out of attachment","Change your mind constantly"],correct:1,expl:"Attachment to a first interpretation prevents questioning it in the face of contrary signals."},
    {q:"In the Ever Smart/Alexandra 1 case, what information was most missing?",opts:["The day's weather","Direct, early confirmation of mutual intentions","The number of passengers"],correct:1,expl:"The absence of direct contact between the two captains allowed two contradictory assumptions to coexist for too long."},
  ],
  es:[
    {q:"¿Qué ocurre en la zona de visión túnel de la curva estrés-rendimiento?",opts:["La vigilancia es máxima","El campo de atención se reduce peligrosamente, hasta la parálisis","El juicio mejora","Nada en particular"],correct:1,expl:"Demasiado estrés lleva a una reducción peligrosa del campo de atención, igual que demasiado poco estrés lleva a la complacencia."},
    {q:"Incendio declarado, llamada administrativa pendiente. ¿Qué haces primero?",opts:["La llamada administrativa","El incendio — es la única emergencia real","Esperar a ambas juntas"],correct:1,expl:"El incendio es urgente y pone en peligro vidas; la llamada es importante pero claramente puede esperar."},
    {q:"¿Qué etapa del marco de decisión es tan importante como 'Decidir'?",opts:["Reevaluar","Documentar","Esperar"],correct:0,expl:"Reevaluar permite ajustar la decisión si la situación cambia — tan esencial como la decisión inicial."},
    {q:"¿Qué significa 'Never fall in love with your first assumption'?",opts:["Nunca decidir rápido","Una hipótesis siempre debe verificarse, nunca protegerse por apego","Cambiar de opinión constantemente"],correct:1,expl:"El apego a una primera interpretación impide cuestionarla ante señales contrarias."},
    {q:"En el caso Ever Smart/Alexandra 1, ¿qué información faltaba más?",opts:["El tiempo del día","La confirmación directa y temprana de las intenciones mutuas","El número de pasajeros"],correct:1,expl:"La ausencia de contacto directo entre los dos capitanes permitió que dos hipótesis contradictorias coexistieran demasiado tiempo."},
  ],
  pt:[
    {q:"O que acontece na zona de visão em túnel da curva stress-desempenho?",opts:["A vigilância é máxima","O campo de atenção reduz-se perigosamente, até à paralisia","O julgamento melhora","Nada em particular"],correct:1,expl:"Stress a mais leva a uma redução perigosa do campo de atenção, tal como stress a menos leva à complacência."},
    {q:"Incêndio declarado, chamada administrativa pendente. O que fazes primeiro?",opts:["A chamada administrativa","O incêndio — é a única emergência real","Esperar por ambas juntas"],correct:1,expl:"O incêndio é urgente e coloca vidas em perigo; a chamada é importante mas claramente pode esperar."},
    {q:"Que etapa do quadro de decisão é tão importante quanto 'Decidir'?",opts:["Reavaliar","Documentar","Esperar"],correct:0,expl:"Reavaliar permite ajustar a decisão à medida que a situação muda — tão essencial quanto a decisão inicial."},
    {q:"O que significa 'Never fall in love with your first assumption'?",opts:["Nunca decidir rapidamente","Uma hipótese deve ser sempre verificada, nunca protegida por apego","Mudar de ideias constantemente"],correct:1,expl:"O apego a uma primeira interpretação impede questioná-la perante sinais contrários."},
    {q:"No caso Ever Smart/Alexandra 1, que informação faltava mais?",opts:["O tempo do dia","A confirmação direta e precoce das intenções mútuas","O número de passageiros"],correct:1,expl:"A ausência de contacto direto entre os dois comandantes permitiu que duas hipóteses contraditórias coexistissem por tempo demais."},
  ],
};

// ══════════════════════════════════════
// SAFETY REFLECTION
// ══════════════════════════════════════
function SafetyReflection({ lang }) {
  const q = {
    fr:"Repense à une décision que tu as prise rapidement en mer. Était-elle basée sur une vérification réelle, ou sur une hypothèse que tu n'as jamais confirmée ?",
    en:"Think about a decision you made quickly at sea. Was it based on real verification, or on an assumption you never confirmed?",
    es:"Piensa en una decisión que tomaste rápidamente en el mar. ¿Se basó en una verificación real, o en una hipótesis que nunca confirmaste?",
    pt:"Pensa numa decisão que tomaste rapidamente no mar. Foi baseada numa verificação real, ou numa hipótese que nunca confirmaste?",
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
      badge:"🛟 Safety · COLREG Safety — Collision Prevention & Response · Leçon 5/6 · ⭐ Premium",
      title:"Decision-Making Under Pressure",
      intro:"L1 à L4 ont couvert le facteur humain, la coordination d'équipe, les dernières secondes et les premières minutes d'une collision.\n\nCette leçon n'introduit pas un nouveau domaine — elle entraîne le jugement en mobilisant tout ce qui a été appris, à travers des situations variées où il n'existe pas de réponse parfaite, seulement des décisions plus ou moins sûres.",
      p0:"LA DÉCISION SOUS PRESSION EST UNE COMPÉTENCE, PAS UN INSTINCT",s0t:"Ça s'entraîne, ça ne s'improvise pas",
      s0:"Un bon marin n'est pas celui qui a un instinct naturel pour les urgences — c'est celui qui a intégré une méthode par l'entraînement.\n\nCOMMENT PRÉVENIR LA MAUVAISE DÉCISION ? En s'entraînant à un cadre de décision avant d'en avoir besoin.\nQUE FAIRE SOUS PRESSION ? Appliquer la méthode plutôt que de se fier à l'impression du moment.\nQUELLE LEÇON RETENIR ? Le jugement se construit, il ne surgit pas spontanément dans l'urgence.",
      p1:"LA COURBE STRESS-PERFORMANCE ET LA TIME COMPRESSION",s1t:"Trouver la zone optimale entre complaisance et paralysie",
      s1:"Trop peu de stress endort la vigilance ; trop de stress réduit dangereusement le champ d'attention jusqu'à la paralysie. Entre les deux se trouve une zone où le stress aiguise la décision sans la déformer.\n\nSous stress, le temps semble s'accélérer ou se ralentir — la Time Compression. Cette perception faussée renforce l'intérêt de s'appuyer sur une méthode plutôt que sur une impression.",
      p2:"PRIORITISATION",s2t:"Urgent, important, ou peut attendre",
      s2:"Sous pression, il est impossible de tout faire en même temps. Une bonne décision commence souvent par la bonne priorité : distinguer ce qui est urgent (danger immédiat), ce qui est important (a de la valeur mais peut suivre), et ce qui peut clairement attendre.",
      p3:"UN CADRE DE DÉCISION RAPIDE ET RÉPÉTABLE",s3t:"Observer → Décider → Agir → Réévaluer",
      s3:"Cette méthode réutilise les outils déjà appris : observer des faits vérifiés (pas des suppositions), décider une action claire, l'exécuter pleinement, puis réévaluer — cette dernière étape est aussi importante que Décider. Une bonne décision reste toujours ouverte à la révision si la situation évolue.",
      p4:"VISION TUNNEL ET FIXATION",s4t:"Never fall in love with your first assumption",
      s4:"Se fixer sur une hypothèse initiale et ne plus percevoir les signaux qui la contredisent est un facteur distinct de l'automation bias vu en L1 — ici, c'est l'esprit lui-même qui se ferme, pas seulement la confiance dans un écran. Une hypothèse doit toujours être vérifiée, jamais protégée par attachement.",
      p5:"LE COÛT DU CHANGEMENT VS LE COÛT DE L'ENGAGEMENT",s5t:"Entre persister à tort et changer d'avis sans cesse",
      s5:"Persister dans une décision devenue inadaptée est une erreur, tout comme changer d'avis en permanence empêche toute action cohérente (vu en L3). Le bon équilibre : s'engager pleinement dans une action, tout en restant prêt à la réévaluer si des faits nouveaux et vérifiés l'exigent.",
      p6:"ERREURS FRÉQUENTES EN DÉCISION SOUS PRESSION",s6t:"Attendre une confirmation qui ne vient jamais",
      s6:"Décider sur une hypothèse non vérifiée, sous-estimer le temps réellement disponible, ou attendre passivement une clarification au lieu de la chercher activement — ces erreurs reviennent dans la plupart des cas étudiés en L1-L4.",
      p7:"🎯 EXERCICE OPÉRATIONNEL",p8:"⚠️ CAS RÉEL",p9:"📝 BANQUE DE 15 QUESTIONS",p10:"🪞 RÉFLEXION SÉCURITÉ",
      sumT:"RÉSUMÉ — LEÇON 5",
      sumP:["La décision sous pression est une compétence qui s'entraîne, pas un instinct","La zone optimale de stress aiguise la décision sans la déformer","Prioriser l'urgent avant l'important avant ce qui peut attendre","Observer → Décider → Agir → Réévaluer — Réévaluer compte autant que Décider","Ne jamais s'attacher à sa première hypothèse sans la vérifier"],
      learnedP:["Courbe stress-performance et Time Compression","Prioritisation urgent/important/peut attendre","Cadre de décision en 4 étapes","Vision tunnel et vérification des hypothèses","Équilibre entre engagement et réévaluation"],
      safetyMsg:"The best decision under pressure is rarely the fastest one. It is the one based on verified information, clear priorities, and the discipline to reassess when circumstances change.",
    },
    en:{
      badge:"🛟 Safety · COLREG Safety — Collision Prevention & Response · Lesson 5/6 · ⭐ Premium",
      title:"Decision-Making Under Pressure",
      intro:"L1 through L4 covered the human factor, team coordination, the final seconds, and the first minutes of a collision.\n\nThis lesson does not introduce a new field — it trains judgment by mobilizing everything learned, through varied situations where there is no perfect answer, only more or less safe decisions.",
      p0:"DECISION-MAKING UNDER PRESSURE IS A SKILL, NOT AN INSTINCT",s0t:"It is trained, not improvised",
      s0:"A good sailor is not one with a natural instinct for emergencies — it is one who has internalized a method through training.\n\nHOW TO PREVENT A BAD DECISION? By training a decision framework before needing it.\nWHAT TO DO UNDER PRESSURE? Apply the method rather than trusting the impression of the moment.\nWHAT LESSON TO RETAIN? Judgment is built, it does not spontaneously arise in an emergency.",
      p1:"THE STRESS-PERFORMANCE CURVE AND TIME COMPRESSION",s1t:"Finding the optimal zone between complacency and paralysis",
      s1:"Too little stress dulls vigilance; too much stress dangerously narrows the attention field up to paralysis. Between the two lies a zone where stress sharpens decisions without distorting them.\n\nUnder stress, time seems to speed up or slow down — Time Compression. This distorted perception reinforces the value of relying on a method rather than a feeling.",
      p2:"PRIORITIZATION",s2t:"Urgent, important, or can wait",
      s2:"Under pressure, it is impossible to do everything at once. A good decision often begins with the right priority: distinguishing what is urgent (immediate danger), what is important (has value but can follow), and what can clearly wait.",
      p3:"A FAST, REPEATABLE DECISION FRAMEWORK",s3t:"Observe → Decide → Act → Reassess",
      s3:"This method reuses tools already learned: observe verified facts (not assumptions), decide on a clear action, execute it fully, then reassess — this last step is as important as Decide. A good decision always stays open to revision if the situation evolves.",
      p4:"TUNNEL VISION AND FIXATION",s4t:"Never fall in love with your first assumption",
      s4:"Fixating on an initial assumption and no longer perceiving contradicting signals is a factor distinct from the automation bias covered in L1 — here, it is the mind itself that closes, not just trust in a screen. An assumption must always be checked, never protected out of attachment.",
      p5:"THE COST OF CHANGE VS THE COST OF COMMITMENT",s5t:"Between wrongly persisting and endlessly changing your mind",
      s5:"Persisting in a decision that has become unsuitable is an error, just as constantly changing your mind prevents any coherent action (seen in L3). The right balance: fully commit to an action, while staying ready to reassess it if new, verified facts require it.",
      p6:"FREQUENT ERRORS IN DECISION-MAKING UNDER PRESSURE",s6t:"Waiting for a confirmation that never comes",
      s6:"Deciding on an unverified assumption, underestimating the time actually available, or passively waiting for clarification instead of actively seeking it — these errors recur in most cases studied in L1-L4.",
      p7:"🎯 OPERATIONAL EXERCISE",p8:"⚠️ REAL ACCIDENT CASE",p9:"📝 15-QUESTION BANK",p10:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY — LESSON 5",
      sumP:["Decision-making under pressure is a trained skill, not an instinct","The optimal stress zone sharpens decisions without distorting them","Prioritize urgent before important before what can wait","Observe → Decide → Act → Reassess — Reassess matters as much as Decide","Never attach to your first assumption without checking it"],
      learnedP:["Stress-performance curve and Time Compression","Urgent/important/can-wait prioritization","4-step decision framework","Tunnel vision and assumption verification","Balance between commitment and reassessment"],
      safetyMsg:"The best decision under pressure is rarely the fastest one. It is the one based on verified information, clear priorities, and the discipline to reassess when circumstances change.",
    },
    es:{
      badge:"🛟 Seguridad · COLREG Safety — Prevención y Respuesta ante Abordajes · Lección 5/6 · ⭐ Premium",
      title:"Decision-Making Under Pressure",
      intro:"L1 a L4 cubrieron el factor humano, la coordinación de equipo, los últimos segundos y los primeros minutos de una colisión.\n\nEsta lección no introduce un nuevo campo — entrena el juicio movilizando todo lo aprendido, a través de situaciones variadas donde no hay una respuesta perfecta, solo decisiones más o menos seguras.",
      p0:"LA DECISIÓN BAJO PRESIÓN ES UNA HABILIDAD, NO UN INSTINTO",s0t:"Se entrena, no se improvisa",
      s0:"Un buen marino no es el que tiene un instinto natural para las emergencias — es el que ha interiorizado un método mediante el entrenamiento.\n\n¿CÓMO PREVENIR UNA MALA DECISIÓN? Entrenando un marco de decisión antes de necesitarlo.\n¿QUÉ HACER BAJO PRESIÓN? Aplicar el método en lugar de confiar en la impresión del momento.\n¿QUÉ LECCIÓN RETENER? El juicio se construye, no surge espontáneamente en una emergencia.",
      p1:"LA CURVA ESTRÉS-RENDIMIENTO Y EL TIME COMPRESSION",s1t:"Encontrar la zona óptima entre complacencia y parálisis",
      s1:"Demasiado poco estrés adormece la vigilancia; demasiado estrés reduce peligrosamente el campo de atención hasta la parálisis. Entre ambos hay una zona donde el estrés agudiza la decisión sin deformarla.\n\nBajo estrés, el tiempo parece acelerarse o ralentizarse — Time Compression. Esta percepción distorsionada refuerza el valor de apoyarse en un método más que en una impresión.",
      p2:"PRIORIZACIÓN",s2t:"Urgente, importante, o puede esperar",
      s2:"Bajo presión, es imposible hacerlo todo a la vez. Una buena decisión suele comenzar con la prioridad correcta: distinguir lo urgente (peligro inmediato), lo importante (tiene valor pero puede seguir) y lo que claramente puede esperar.",
      p3:"UN MARCO DE DECISIÓN RÁPIDO Y REPETIBLE",s3t:"Observar → Decidir → Actuar → Reevaluar",
      s3:"Este método reutiliza herramientas ya aprendidas: observar hechos verificados (no suposiciones), decidir una acción clara, ejecutarla plenamente, y luego reevaluar — este último paso es tan importante como Decidir. Una buena decisión siempre permanece abierta a la revisión si la situación evoluciona.",
      p4:"VISIÓN TÚNEL Y FIJACIÓN",s4t:"Never fall in love with your first assumption",
      s4:"Fijarse en una hipótesis inicial y dejar de percibir señales contradictorias es un factor distinto del sesgo de automatización visto en L1 — aquí es la propia mente la que se cierra, no solo la confianza en una pantalla. Una hipótesis siempre debe verificarse, nunca protegerse por apego.",
      p5:"EL COSTE DEL CAMBIO VS EL COSTE DEL COMPROMISO",s5t:"Entre persistir erróneamente y cambiar de opinión sin cesar",
      s5:"Persistir en una decisión que se ha vuelto inadecuada es un error, tanto como cambiar de opinión constantemente impide cualquier acción coherente (visto en L3). El equilibrio correcto: comprometerse plenamente con una acción, mientras se permanece listo para reevaluarla si nuevos hechos verificados lo requieren.",
      p6:"ERRORES FRECUENTES EN LA DECISIÓN BAJO PRESIÓN",s6t:"Esperar una confirmación que nunca llega",
      s6:"Decidir sobre una hipótesis no verificada, subestimar el tiempo realmente disponible, o esperar pasivamente una aclaración en lugar de buscarla activamente — estos errores se repiten en la mayoría de los casos estudiados en L1-L4.",
      p7:"🎯 EJERCICIO OPERATIVO",p8:"⚠️ CASO REAL",p9:"📝 BANCO DE 15 PREGUNTAS",p10:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN — LECCIÓN 5",
      sumP:["La decisión bajo presión es una habilidad entrenada, no un instinto","La zona óptima de estrés agudiza la decisión sin deformarla","Priorizar lo urgente antes que lo importante antes que lo que puede esperar","Observar → Decidir → Actuar → Reevaluar — Reevaluar importa tanto como Decidir","Nunca aferrarse a la primera hipótesis sin verificarla"],
      learnedP:["Curva estrés-rendimiento y Time Compression","Priorización urgente/importante/puede esperar","Marco de decisión en 4 pasos","Visión túnel y verificación de hipótesis","Equilibrio entre compromiso y reevaluación"],
      safetyMsg:"The best decision under pressure is rarely the fastest one. It is the one based on verified information, clear priorities, and the discipline to reassess when circumstances change.",
    },
    pt:{
      badge:"🛟 Segurança · COLREG Safety — Prevenção e Resposta a Abalroamentos · Lição 5/6 · ⭐ Premium",
      title:"Decision-Making Under Pressure",
      intro:"L1 a L4 cobriram o fator humano, a coordenação de equipa, os últimos segundos e os primeiros minutos de uma colisão.\n\nEsta lição não introduz um novo campo — treina o julgamento mobilizando tudo o que foi aprendido, através de situações variadas onde não há uma resposta perfeita, apenas decisões mais ou menos seguras.",
      p0:"A DECISÃO SOB PRESSÃO É UMA COMPETÊNCIA, NÃO UM INSTINTO",s0t:"Treina-se, não se improvisa",
      s0:"Um bom marítimo não é aquele que tem um instinto natural para emergências — é aquele que interiorizou um método através do treino.\n\nCOMO PREVENIR UMA MÁ DECISÃO? Treinando um quadro de decisão antes de precisar dele.\nO QUE FAZER SOB PRESSÃO? Aplicar o método em vez de confiar na impressão do momento.\nQUE LIÇÃO RETER? O julgamento constrói-se, não surge espontaneamente numa emergência.",
      p1:"A CURVA STRESS-DESEMPENHO E A TIME COMPRESSION",s1t:"Encontrar a zona ótima entre complacência e paralisia",
      s1:"Stress a menos adormece a vigilância; stress a mais reduz perigosamente o campo de atenção até à paralisia. Entre ambos existe uma zona onde o stress aguça a decisão sem a deformar.\n\nSob stress, o tempo parece acelerar ou abrandar — Time Compression. Esta perceção distorcida reforça o interesse de se apoiar num método em vez de numa impressão.",
      p2:"PRIORITIZAÇÃO",s2t:"Urgente, importante, ou pode esperar",
      s2:"Sob pressão, é impossível fazer tudo ao mesmo tempo. Uma boa decisão começa muitas vezes com a prioridade certa: distinguir o que é urgente (perigo imediato), o que é importante (tem valor mas pode seguir), e o que claramente pode esperar.",
      p3:"UM QUADRO DE DECISÃO RÁPIDO E REPETÍVEL",s3t:"Observar → Decidir → Agir → Reavaliar",
      s3:"Este método reutiliza ferramentas já aprendidas: observar factos verificados (não suposições), decidir uma ação clara, executá-la plenamente, depois reavaliar — esta última etapa é tão importante quanto Decidir. Uma boa decisão permanece sempre aberta à revisão se a situação evoluir.",
      p4:"VISÃO EM TÚNEL E FIXAÇÃO",s4t:"Never fall in love with your first assumption",
      s4:"Fixar-se numa hipótese inicial e deixar de perceber sinais contraditórios é um fator distinto do viés de automação visto em L1 — aqui é a própria mente que se fecha, não apenas a confiança num ecrã. Uma hipótese deve ser sempre verificada, nunca protegida por apego.",
      p5:"O CUSTO DA MUDANÇA VS O CUSTO DO COMPROMISSO",s5t:"Entre persistir erradamente e mudar de ideias sem parar",
      s5:"Persistir numa decisão que se tornou inadequada é um erro, tal como mudar de ideias constantemente impede qualquer ação coerente (visto em L3). O equilíbrio certo: comprometer-se plenamente com uma ação, permanecendo pronto para a reavaliar se novos factos verificados o exigirem.",
      p6:"ERROS FREQUENTES NA DECISÃO SOB PRESSÃO",s6t:"Esperar por uma confirmação que nunca chega",
      s6:"Decidir sobre uma hipótese não verificada, subestimar o tempo realmente disponível, ou esperar passivamente por um esclarecimento em vez de o procurar ativamente — estes erros repetem-se na maioria dos casos estudados em L1-L4.",
      p7:"🎯 EXERCÍCIO OPERACIONAL",p8:"⚠️ CASO REAL",p9:"📝 BANCO DE 15 PERGUNTAS",p10:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO — LIÇÃO 5",
      sumP:["A decisão sob pressão é uma competência treinada, não um instinto","A zona ótima de stress aguça a decisão sem a deformar","Priorizar o urgente antes do importante antes do que pode esperar","Observar → Decidir → Agir → Reavaliar — Reavaliar conta tanto quanto Decidir","Nunca te apegares à primeira hipótese sem a verificar"],
      learnedP:["Curva stress-desempenho e Time Compression","Priorização urgente/importante/pode esperar","Quadro de decisão em 4 etapas","Visão em túnel e verificação de hipóteses","Equilíbrio entre compromisso e reavaliação"],
      safetyMsg:"The best decision under pressure is rarely the fastest one. It is the one based on verified information, clear priorities, and the discipline to reassess when circumstances change.",
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN
// ══════════════════════════════════════
export default function LessonSafetyS1_L5({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, onQuizScored=(score:number,maxScore:number)=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 5/6":lang==="en"?"Lesson 5/6":lang==="es"?"Lección 5/6":"Lição 5/6"}</div>
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

            <SL icon="🧠" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧠</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="📈" text={lc.p1} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📈</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📈 {lang==="fr"?"COURBE STRESS-PERFORMANCE — INTERACTIF":lang==="en"?"STRESS-PERFORMANCE CURVE — INTERACTIVE":lang==="es"?"CURVA ESTRÉS-RENDIMIENTO — INTERACTIVO":"CURVA STRESS-DESEMPENHO — INTERATIVO"}</div><StressCurveSVG lang={lang}/></Card>

            <SL icon="🎯" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🎯</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🎯 {lang==="fr"?"MATRICE DE PRIORISATION — INTERACTIF":lang==="en"?"PRIORITIZATION MATRIX — INTERACTIVE":lang==="es"?"MATRIZ DE PRIORIZACIÓN — INTERACTIVO":"MATRIZ DE PRIORIZAÇÃO — INTERATIVO"}</div><PriorityMatrixSVG lang={lang}/></Card>

            <SL icon="🔄" text={lc.p3} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔄</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🔄 {lang==="fr"?"CADRE DE DÉCISION — INTERACTIF":lang==="en"?"DECISION FRAMEWORK — INTERACTIVE":lang==="es"?"MARCO DE DECISIÓN — INTERACTIVO":"QUADRO DE DECISÃO — INTERATIVO"}</div><DecisionWheelSVG lang={lang}/></Card>

            <SL icon="🔭" text={lc.p4} color={C.purple}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔭</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.purple,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🔭 {lang==="fr"?"VISION TUNNEL — INTERACTIF":lang==="en"?"TUNNEL VISION — INTERACTIVE":lang==="es"?"VISIÓN TÚNEL — INTERACTIVO":"VISÃO EM TÚNEL — INTERATIVO"}</div><TunnelVisionSVG lang={lang}/></Card>

            <SL icon="⚖️" text={lc.p5} color={C.teal}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚖️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s5t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s5}</div></Card>

            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚠️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s6t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s6}</div></Card>

            <SL icon="🎯" text={lc.p7} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p8} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p9} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank} onComplete={()=>setBankDone(true)}/></Card>

            <SL icon="🪞" text={lc.p10} color={C.purple}/>
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
                {lang==="fr"?"Quiz Final — Décision Sous Pression":lang==="en"?"Final Quiz — Decision-Making":lang==="es"?"Quiz Final — Decisión Bajo Presión":"Quiz Final — Decisão Sob Pressão"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 5/6":"questions · Lesson 5/6"}</div>
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
              {lang==="fr"?"LEÇON 6 — RETOURS D'EXPÉRIENCE →":lang==="en"?"LESSON 6 — LESSONS LEARNED →":lang==="es"?"LECCIÓN 6 — LECCIONES APRENDIDAS →":"LIÇÃO 6 — LIÇÕES APRENDIDAS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
