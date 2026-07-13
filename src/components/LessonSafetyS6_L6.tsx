import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - NEAR MISS REPORTING (A FREE WARNING, NOT A NON-EVENT)
function NearMissSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🎁", label:{fr:"Un avertissement gratuit",en:"A free warning",es:"Una advertencia gratuita",pt:"Um aviso gratuito"}, desc:{fr:"Un Near Miss n'est pas un accident qui n'a pas eu lieu. C'est un avertissement offert sans aucune conséquence réelle, une occasion rare d'apprendre sans avoir payé le prix.",en:"A Near Miss is not an accident that didn't happen. It is a warning given with no real consequence, a rare chance to learn without having paid the price.",es:"Un Near Miss no es un accidente que no ocurrió. Es una advertencia ofrecida sin ninguna consecuencia real, una oportunidad rara de aprender sin haber pagado el precio.",pt:"Um Near Miss não é um acidente que não aconteceu. É um aviso oferecido sem qualquer consequência real, uma oportunidade rara de aprender sem ter pago o preço."} },
    { id:2, icon:"📢", label:{fr:"Pourquoi signaler même sans dommage",en:"Why report even without damage",es:"Por qué informar incluso sin daño",pt:"Por que reportar mesmo sem dano"}, desc:{fr:"Un Near Miss non signalé se répétera, avec une probabilité croissante qu'il devienne un jour un véritable accident.",en:"An unreported Near Miss will happen again, with a growing probability that it will one day become a real accident.",es:"Un Near Miss no informado se repetirá, con una probabilidad creciente de que algún día se convierta en un accidente real.",pt:"Um Near Miss não reportado vai repetir-se, com uma probabilidade crescente de um dia se tornar um acidente real."} },
    { id:3, icon:"🚫", label:{fr:"Ne jamais punir un signalement",en:"Never punish a report",es:"Nunca castigar un informe",pt:"Nunca punir um relato"}, desc:{fr:"Punir celui qui signale un Near Miss garantit que plus personne ne signalera à l'avenir, transformant chaque futur avertissement en silence.",en:"Punishing someone for reporting a Near Miss guarantees no one will report in the future, turning every future warning into silence.",es:"Castigar a quien informa un Near Miss garantiza que nadie informará en el futuro, convirtiendo cada futura advertencia en silencio.",pt:"Punir quem reporta um Near Miss garante que ninguém vai reportar no futuro, transformando cada aviso futuro em silêncio."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>Every Near Miss Is a Free Lesson. The Next One May Not Be.</div>
    </div>
  );
}

// SVG 2 - LESSONS LEARNED (SHARE THE LESSON, NOT THE BLAME)
function LessonsLearnedSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🔍", label:{fr:"Étudier ce qui a failli arriver",en:"Studying what nearly happened",es:"Estudiar lo que estuvo a punto de ocurrir",pt:"Estudar o que quase aconteceu"}, desc:{fr:"Une organisation qui progresse vraiment n'attend pas l'accident : elle étudie aussi ce qui aurait pu se produire, pas seulement ce qui s'est produit.",en:"An organization that truly progresses doesn't wait for the accident: it also studies what could have happened, not just what did happen.",es:"Una organización que realmente progresa no espera al accidente: también estudia lo que podría haber ocurrido, no solo lo que ocurrió.",pt:"Uma organização que realmente progride não espera pelo acidente: estuda também o que poderia ter acontecido, não só o que aconteceu."} },
    { id:2, icon:"🤝", label:{fr:"Partager la leçon, pas le blâme",en:"Share the lesson, not the blame",es:"Compartir la lección, no la culpa",pt:"Partilhar a lição, não a culpa"}, desc:{fr:"Le but d'une enquête n'est jamais de chercher un coupable. C'est d'empêcher que la même situation ne se reproduise, pour tout le monde.",en:"The purpose of an investigation is never to find someone to blame. It is to prevent the same situation from happening again, for everyone.",es:"El objetivo de una investigación nunca es buscar a un culpable. Es impedir que la misma situación se repita, para todos.",pt:"O objetivo de uma investigação nunca é procurar um culpado. É impedir que a mesma situação se repita, para todos."} },
    { id:3, icon:"🔄", label:{fr:"Transformer l'expérience en amélioration",en:"Turning experience into improvement",es:"Transformar la experiencia en mejora",pt:"Transformar a experiência em melhoria"}, desc:{fr:"Chaque leçon apprise doit se traduire en un changement concret : une procédure ajustée, un risque désormais anticipé.",en:"Every lesson learned must translate into a concrete change: an adjusted procedure, a risk now anticipated.",es:"Cada lección aprendida debe traducirse en un cambio concreto: un procedimiento ajustado, un riesgo ahora anticipado.",pt:"Cada lição aprendida deve traduzir-se numa mudança concreta: um procedimento ajustado, um risco agora antecipado."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>Share the lesson, not the blame.</div>
    </div>
  );
}

// SVG 3 - PREPARING FOR THE COLLECTIVE
function CollectivePreparationSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"📝", label:{fr:"Déclarer ses effets personnels importants",en:"Declaring important personal belongings",es:"Declarar los efectos personales importantes",pt:"Declarar os pertences pessoais importantes"}, desc:{fr:"Facilite l'identification en cas d'incident, simplifie une éventuelle indemnisation, et accélère les démarches administratives pour l'équipage et sa famille.",en:"Facilitates identification in case of an incident, simplifies any potential compensation, and speeds up administrative steps for the crew and their family.",es:"Facilita la identificación en caso de incidente, simplifica una posible indemnización, y agiliza los trámites administrativos para la tripulación y su familia.",pt:"Facilita a identificação em caso de incidente, simplifica uma eventual indemnização, e acelera os trâmites administrativos para a tripulação e a sua família."} },
    { id:2, icon:"🎯", label:{fr:"Participer sérieusement aux exercices",en:"Participating seriously in drills",es:"Participar seriamente en los ejercicios",pt:"Participar seriamente nos exercícios"}, desc:{fr:"Un exercice pris à la légère aujourd'hui devient une hésitation dangereuse le jour où la situation est réelle. L'efficacité des secours en dépend directement.",en:"A drill taken lightly today becomes a dangerous hesitation the day the situation is real. Rescue effectiveness directly depends on it.",es:"Un ejercicio tomado a la ligera hoy se convierte en una vacilación peligrosa el día que la situación sea real. La eficacia del socorro depende directamente de ello.",pt:"Um exercício levado de ânimo leve hoje torna-se uma hesitação perigosa no dia em que a situação for real. A eficácia do socorro depende diretamente disso."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Deux formes de préparation souvent négligées, jamais de simples formalités.":lang==="en"?"Two often neglected forms of preparation, never mere formalities.":lang==="es"?"Dos formas de preparación a menudo descuidadas, nunca simples formalidades.":"Duas formas de preparação muitas vezes negligenciadas, nunca meras formalidades."}</div>
    </div>
  );
}

// SVG 4 - PROFESSIONAL RESPONSIBILITY BEYOND THE SHIP
function BeyondTheShipSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🏢", label:{fr:"Politiques de sécurité de la compagnie",en:"Company safety policies",es:"Políticas de seguridad de la compañía",pt:"Políticas de segurança da companhia"}, desc:{fr:"Respecter ces politiques, même lorsqu'elles semblent plus strictes que le minimum réglementaire, fait partie de la responsabilité professionnelle.",en:"Respecting these policies, even when they seem stricter than the regulatory minimum, is part of professional responsibility.",es:"Respetar estas políticas, incluso cuando parecen más estrictas que el mínimo reglamentario, forma parte de la responsabilidad profesional.",pt:"Respeitar estas políticas, mesmo quando parecem mais rigorosas do que o mínimo regulamentar, faz parte da responsabilidade profissional."} },
    { id:2, icon:"⚓", label:{fr:"Règles portuaires et autorités locales",en:"Port rules and local authorities",es:"Reglas portuarias y autoridades locales",pt:"Regras portuárias e autoridades locais"}, desc:{fr:"Chaque port a ses propres règles : les ignorer par habitude ou par méconnaissance reste une responsabilité individuelle, pas une excuse collective.",en:"Every port has its own rules: ignoring them out of habit or ignorance remains an individual responsibility, not a collective excuse.",es:"Cada puerto tiene sus propias reglas: ignorarlas por costumbre o desconocimiento sigue siendo una responsabilidad individual, no una excusa colectiva.",pt:"Cada porto tem as suas próprias regras: ignorá-las por hábito ou desconhecimento continua a ser uma responsabilidade individual, não uma desculpa coletiva."} },
    { id:3, icon:"🔒", label:{fr:"Confidentialité et réseaux sociaux (rappel de L3)",en:"Confidentiality and social media (reminder from L3)",es:"Confidencialidad y redes sociales (recordatorio de L3)",pt:"Confidencialidade e redes sociais (lembrete da L3)"}, desc:{fr:"Déjà vu en détail en Leçon 3 : la discipline personnelle vue là-bas sert aussi une culture collective, pas seulement une protection individuelle.",en:"Already covered in detail in Lesson 3: the personal discipline seen there also serves a collective culture, not just individual protection.",es:"Ya visto en detalle en la Lección 3: la disciplina personal vista allí también sirve a una cultura colectiva, no solo a una protección individual.",pt:"Já visto em detalhe na Lição 3: a disciplina pessoal vista ali também serve uma cultura coletiva, não apenas uma proteção individual."} },
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

// MINI SECTION - YOUR REPUTATION TRAVELS BEFORE YOU
function ReputationBox({ lang }) {
  const d = {
    fr:{text:"Un marin est reconnu par son professionnalisme, son comportement, et son attitude face à la sécurité. Pas seulement par ses certificats. Cette réputation le suit d'un navire à l'autre, bien avant qu'il ne monte à bord."},
    en:{text:"A sailor is recognized by their professionalism, their behavior, and their attitude toward safety. Not just by their certificates. This reputation follows them from one ship to the next, long before they ever step aboard."},
    es:{text:"Un marino es reconocido por su profesionalismo, su comportamiento, y su actitud ante la seguridad. No solo por sus certificados. Esta reputación lo sigue de un buque a otro, mucho antes de subir a bordo."},
    pt:{text:"Um marítimo é reconhecido pelo seu profissionalismo, o seu comportamento, e a sua atitude perante a segurança. Não apenas pelos seus certificados. Esta reputação acompanha-o de navio em navio, muito antes de ele subir a bordo."},
  };
  const c = d[lang]||d.fr;
  return (
    <div style={{padding:"14px 16px",borderRadius:14,background:"linear-gradient(135deg,rgba(142,68,173,0.12),rgba(13,31,60,0.85))",border:`1.5px solid ${C.purple}55`}}>
      <div style={{fontSize:12,color:C.purple,fontWeight:700,marginBottom:8,fontFamily:"'Cinzel',serif",letterSpacing:1}}>🎖️ YOUR REPUTATION TRAVELS BEFORE YOU</div>
      <div style={{fontSize:12,color:C.white,lineHeight:1.7}}>{c.text}</div>
    </div>
  );
}

// EXERCISE - CULTURE DECISIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"a",q3:"c",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Vous avez évité de justesse une chute en glissant sur une surface humide, sans aucune blessure. Que faites-vous ?\na) Ne rien dire, il n'y a eu aucun dommage réel\nb) Signaler ce Near Miss, même sans dommage\nc) En parler seulement si quelqu'un vous le demande"},
      {id:"q2",q:"Une enquête est ouverte après un Near Miss signalé par un collègue. Quel est le véritable objectif de cette enquête ?\na) Comprendre ce qui s'est passé pour empêcher que cela se reproduise, pas chercher un coupable\nb) Identifier qui doit être sanctionné\nc) Fermer le dossier le plus rapidement possible"},
      {id:"q3",q:"Un exercice de sécurité est prévu, mais l'équipe le considère comme une formalité sans importance. Quelle est l'attitude correcte ?\na) Participer sans réel engagement, comme le reste de l'équipe\nb) Proposer d'annuler l'exercice pour gagner du temps\nc) Participer sérieusement, car l'efficacité réelle des secours en dépend directement"},
      {id:"q4",q:"Que signifie le principe 'Safety Is Not What You Know. It Is What You Do When No One Is Watching' ?\na) Seules les connaissances théoriques comptent réellement en matière de sécurité\nb) La sécurité se mesure aux gestes réels accomplis même sans surveillance, pas seulement aux connaissances\nc) Ce principe ne concerne que les officiers de sécurité"},
    ],
    en:[
      {id:"q1",q:"You narrowly avoided a fall by slipping on a wet surface, with no injury at all. What do you do?\na) Say nothing, there was no real damage\nb) Report this Near Miss, even without damage\nc) Only mention it if someone asks you"},
      {id:"q2",q:"An investigation opens after a Near Miss reported by a colleague. What is the real purpose of this investigation?\na) Understand what happened to prevent it from happening again, not find someone to blame\nb) Identify who should be sanctioned\nc) Close the case as quickly as possible"},
      {id:"q3",q:"A safety drill is scheduled, but the team considers it an unimportant formality. What is the correct attitude?\na) Participate without real engagement, like the rest of the team\nb) Suggest canceling the drill to save time\nc) Participate seriously, because the real effectiveness of rescue directly depends on it"},
      {id:"q4",q:"What does the principle 'Safety Is Not What You Know. It Is What You Do When No One Is Watching' mean?\na) Only theoretical knowledge really matters for safety\nb) Safety is measured by the actual actions taken even without supervision, not just by knowledge\nc) This principle only concerns safety officers"},
    ],
    es:[
      {id:"q1",q:"Evitaste por poco una caída al resbalar en una superficie mojada, sin ninguna lesión. ¿Qué haces?\na) No decir nada, no hubo ningún daño real\nb) Informar este Near Miss, incluso sin daño\nc) Mencionarlo solo si alguien te lo pregunta"},
      {id:"q2",q:"Se abre una investigación tras un Near Miss informado por un compañero. ¿Cuál es el verdadero objetivo de esta investigación?\na) Comprender qué pasó para impedir que se repita, no buscar un culpable\nb) Identificar a quién sancionar\nc) Cerrar el caso lo más rápido posible"},
      {id:"q3",q:"Se prevé un ejercicio de seguridad, pero el equipo lo considera una formalidad sin importancia. ¿Cuál es la actitud correcta?\na) Participar sin compromiso real, como el resto del equipo\nb) Proponer cancelar el ejercicio para ganar tiempo\nc) Participar seriamente, porque la eficacia real del socorro depende directamente de ello"},
      {id:"q4",q:"¿Qué significa el principio 'Safety Is Not What You Know. It Is What You Do When No One Is Watching'?\na) Solo el conocimiento teórico importa realmente en seguridad\nb) La seguridad se mide por las acciones reales realizadas incluso sin vigilancia, no solo por el conocimiento\nc) Este principio solo concierne a los oficiales de seguridad"},
    ],
    pt:[
      {id:"q1",q:"Evitaste por pouco uma queda ao escorregar numa superfície molhada, sem qualquer ferimento. O que fazes?\na) Não dizer nada, não houve nenhum dano real\nb) Reportar este Near Miss, mesmo sem dano\nc) Só mencionar se alguém te perguntar"},
      {id:"q2",q:"Abre-se uma investigação depois de um Near Miss reportado por um colega. Qual é o verdadeiro objetivo desta investigação?\na) Compreender o que aconteceu para impedir que se repita, não procurar um culpado\nb) Identificar quem deve ser sancionado\nc) Fechar o caso o mais rápido possível"},
      {id:"q3",q:"Está previsto um exercício de segurança, mas a equipa considera-o uma formalidade sem importância. Qual é a atitude correta?\na) Participar sem envolvimento real, como o resto da equipa\nb) Propor cancelar o exercício para ganhar tempo\nc) Participar seriamente, porque a eficácia real do socorro depende diretamente disso"},
      {id:"q4",q:"O que significa o princípio 'Safety Is Not What You Know. It Is What You Do When No One Is Watching'?\na) Só o conhecimento teórico importa realmente em segurança\nb) A segurança mede-se pelas ações reais realizadas mesmo sem vigilância, não só pelo conhecimento\nc) Este princípio só diz respeito aos oficiais de segurança"},
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

// COMPOSITE CASE - THE NEAR MISS THAT PREVENTED AN ACCIDENT
function CompositeCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Scénario - Le Near Miss qui a évité un accident",teaser:"Scénario composite - signalement, Lessons Learned, amélioration de procédure",
      what:"Un marin remarque qu'un tuyau de vapeur passe très près d'une zone de passage fréquentée, sans protection thermique visible. Un jour, un collègue le frôle en portant du matériel et sent la chaleur au dernier moment, sans être blessé. Il signale immédiatement ce Near Miss, sans attendre qu'un accident ne survienne. Une réunion Lessons Learned est organisée, non pas pour désigner un responsable, mais pour comprendre pourquoi cette configuration existait depuis longtemps sans que personne ne l'ait signalée auparavant. La compagnie décide d'ajouter une protection thermique et un balisage visuel à cet endroit précis, ainsi qu'à d'autres zones similaires identifiées sur d'autres navires de la flotte.",
      cause:"• Une configuration dangereuse existait depuis longtemps sans avoir jamais été signalée\n• Un Near Miss sans aucune blessure a permis de révéler ce danger avant qu'un accident réel ne survienne\n• Le signalement immédiat, sans crainte de sanction, a rendu possible toute la suite\n• La réunion Lessons Learned s'est concentrée sur la compréhension du problème, jamais sur la recherche d'un coupable",
      lessons:"✓ Every Near Miss Is a Free Lesson. The Next One May Not Be : ce Near Miss a permis d'agir avant qu'un accident réel ne survienne\n✓ Share the lesson, not the blame : l'enquête a cherché à comprendre, jamais à sanctionner, ce qui a permis un signalement honnête et complet\n✓ Une amélioration a été appliquée non seulement à cet endroit, mais à toute la flotte, démontrant la valeur d'un signalement partagé\n✓ Ce scénario illustre exactement pourquoi une culture de signalement sans crainte protège l'ensemble de l'organisation, pas seulement un navire",
      link:"🔗 Ce type de scénario se répète quotidiennement dans les compagnies maritimes qui prennent réellement au sérieux leur culture de sécurité."},
    en:{title:"Scenario - The Near Miss That Prevented an Accident",teaser:"Composite scenario - reporting, Lessons Learned, procedure improvement",
      what:"A sailor notices that a steam pipe runs very close to a frequently used passageway, with no visible thermal protection. One day, a colleague brushes past it while carrying equipment and feels the heat at the last moment, without being injured. He immediately reports this Near Miss, without waiting for an actual accident to happen. A Lessons Learned meeting is organized, not to designate someone responsible, but to understand why this configuration had existed for so long without anyone reporting it before. The company decides to add thermal protection and visual marking at this exact spot, as well as at other similar areas identified on other ships in the fleet.",
      cause:"• A dangerous configuration had existed for a long time without ever being reported\n• A Near Miss with no injury at all revealed this danger before a real accident occurred\n• The immediate report, without fear of sanction, made everything that followed possible\n• The Lessons Learned meeting focused on understanding the problem, never on finding someone to blame",
      lessons:"✓ Every Near Miss Is a Free Lesson. The Next One May Not Be: this Near Miss allowed action before a real accident occurred\n✓ Share the lesson, not the blame: the investigation sought to understand, never to sanction, which allowed an honest, complete report\n✓ An improvement was applied not only at this location, but across the whole fleet, demonstrating the value of a shared report\n✓ This scenario directly illustrates why a fearless reporting culture protects the entire organization, not just one ship",
      link:"🔗 This kind of scenario repeats daily in maritime companies that genuinely take their safety culture seriously."},
    es:{title:"Escenario - El Near Miss que evitó un accidente",teaser:"Escenario compuesto - notificación, Lessons Learned, mejora de procedimiento",
      what:"Un marino nota que una tubería de vapor pasa muy cerca de un pasillo muy frecuentado, sin protección térmica visible. Un día, un compañero la roza mientras lleva material y siente el calor en el último momento, sin resultar herido. Informa de inmediato este Near Miss, sin esperar a que ocurra un accidente real. Se organiza una reunión Lessons Learned, no para señalar a un responsable, sino para comprender por qué esta configuración existía desde hacía tiempo sin que nadie la hubiera informado antes. La compañía decide añadir protección térmica y señalización visual en ese lugar exacto, así como en otras zonas similares identificadas en otros buques de la flota.",
      cause:"• Una configuración peligrosa existía desde hacía tiempo sin haber sido nunca informada\n• Un Near Miss sin ninguna lesión permitió revelar este peligro antes de que ocurriera un accidente real\n• La notificación inmediata, sin miedo a la sanción, hizo posible todo lo que siguió\n• La reunión Lessons Learned se centró en comprender el problema, nunca en buscar un culpable",
      lessons:"✓ Every Near Miss Is a Free Lesson. The Next One May Not Be: este Near Miss permitió actuar antes de que ocurriera un accidente real\n✓ Share the lesson, not the blame: la investigación buscó comprender, nunca sancionar, lo que permitió una notificación honesta y completa\n✓ Se aplicó una mejora no solo en este lugar, sino en toda la flota, demostrando el valor de una notificación compartida\n✓ Este escenario ilustra directamente por qué una cultura de notificación sin miedo protege a toda la organización, no solo a un buque",
      link:"🔗 Este tipo de escenario se repite a diario en las compañías marítimas que realmente se toman en serio su cultura de seguridad."},
    pt:{title:"Cenário - O Near Miss que evitou um acidente",teaser:"Cenário composto - relato, Lessons Learned, melhoria de procedimento",
      what:"Um marítimo nota que um tubo de vapor passa muito perto de uma passagem frequentada, sem proteção térmica visível. Um dia, um colega roça-lhe enquanto transporta material e sente o calor no último momento, sem ficar ferido. Ele reporta de imediato este Near Miss, sem esperar que ocorra um acidente real. É organizada uma reunião Lessons Learned, não para designar um responsável, mas para compreender por que esta configuração existia há muito tempo sem que ninguém a tivesse reportado antes. A companhia decide adicionar proteção térmica e sinalização visual nesse local exato, bem como noutras zonas semelhantes identificadas noutros navios da frota.",
      cause:"• Uma configuração perigosa existia há muito tempo sem nunca ter sido reportada\n• Um Near Miss sem qualquer ferimento permitiu revelar este perigo antes de ocorrer um acidente real\n• O relato imediato, sem medo de sanção, tornou possível tudo o que se seguiu\n• A reunião Lessons Learned centrou-se em compreender o problema, nunca em procurar um culpado",
      lessons:"✓ Every Near Miss Is a Free Lesson. The Next One May Not Be: este Near Miss permitiu agir antes de ocorrer um acidente real\n✓ Share the lesson, not the blame: a investigação procurou compreender, nunca sancionar, o que permitiu um relato honesto e completo\n✓ Uma melhoria foi aplicada não só neste local, mas em toda a frota, demonstrando o valor de um relato partilhado\n✓ Este cenário ilustra diretamente por que uma cultura de relato sem medo protege toda a organização, não apenas um navio",
      link:"🔗 Este tipo de cenário repete-se diariamente nas companhias marítimas que levam realmente a sério a sua cultura de segurança."},
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
    {q:"Que signifie le principe 'Safety Is Not What You Know. It Is What You Do When No One Is Watching' ?",opts:["Seules les connaissances théoriques comptent","La sécurité se mesure aux gestes réels accomplis même sans surveillance, pas seulement aux connaissances","Ce principe ne concerne que les officiers","Il ne faut jamais agir sans supervision"],correct:1,expl:"La vraie mesure de la sécurité, c'est le comportement quand personne ne regarde."},
    {q:"Quelle est la mission exacte de cette leçon ?",opts:["Enseigner une nouvelle compétence technique","Faire comprendre que toutes les compétences de S6 reposent sur une culture vécue au quotidien","Répéter en détail tout le contenu de L1 à L5","Présenter l'historique du département Safety"],correct:1,expl:"Cette leçon ne présente aucune nouvelle compétence technique, elle révèle la philosophie qui reliait déjà les leçons précédentes."},
    {q:"Qu'est-ce qu'un Near Miss selon cette leçon ?",opts:["Un accident qui n'a pas eu lieu, sans réelle importance","Un avertissement gratuit, une occasion rare d'apprendre sans avoir payé le prix","Un événement qui ne mérite jamais d'être signalé","Une notion réservée aux grandes compagnies"],correct:1,expl:"Every Near Miss Is a Free Lesson. The Next One May Not Be."},
    {q:"Pourquoi ne faut-il jamais punir quelqu'un qui signale un Near Miss ?",opts:["La punition n'a aucun effet réel","Punir garantit que plus personne ne signalera à l'avenir, transformant chaque futur avertissement en silence","Il faut toujours punir pour maintenir la discipline","Cette question ne concerne que les officiers"],correct:1,expl:"Une culture de signalement sans crainte protège l'ensemble de l'organisation."},
    {q:"Quel est le véritable objectif d'une réunion Lessons Learned ?",opts:["Identifier un coupable à sanctionner","Comprendre ce qui s'est passé pour empêcher que cela se reproduise, jamais chercher un coupable","Fermer le dossier le plus rapidement possible","Uniquement respecter une obligation administrative"],correct:1,expl:"Share the lesson, not the blame."},
    {q:"En quoi consiste concrètement 'transformer l'expérience en amélioration' ?",opts:["Se contenter de discuter de l'incident sans rien changer","Traduire chaque leçon apprise en un changement concret : une procédure ajustée, un risque anticipé","Ignorer les leçons apprises si elles semblent mineures","Ne rien documenter après une réunion Lessons Learned"],correct:1,expl:"Une leçon apprise sans changement concret ne sert à rien."},
    {q:"Pourquoi déclarer ses effets personnels importants à bord ?",opts:["Cela n'a aucune utilité réelle","Cela facilite l'identification, simplifie une indemnisation, et accélère les démarches administratives","Uniquement pour respecter une formalité sans conséquence","Cela ne concerne que les officiers supérieurs"],correct:1,expl:"Cette démarche protège directement le marin et sa famille en cas d'incident."},
    {q:"Pourquoi participer sérieusement aux exercices de sécurité ?",opts:["Ce n'est qu'une formalité sans réelle importance","Un exercice pris à la légère aujourd'hui devient une hésitation dangereuse le jour où la situation est réelle","Les exercices n'ont aucun lien avec l'efficacité réelle des secours","Uniquement pour respecter le règlement"],correct:1,expl:"L'efficacité des secours en dépend directement."},
    {q:"Que rappelle cette leçon concernant la confidentialité et les réseaux sociaux, déjà vus en L3 ?",opts:["Un développement complet et nouveau du sujet","Un bref rappel que cette discipline sert aussi une culture collective, pas seulement une protection individuelle","Ce sujet n'est jamais mentionné dans cette leçon","Une contradiction totale avec ce qui était enseigné en L3"],correct:1,expl:"Cette leçon élève le sujet à un niveau différent, sans le répéter à l'identique."},
    {q:"Que signifie 'Your Reputation Travels Before You' ?",opts:["Seuls les certificats déterminent la réputation d'un marin","Un marin est reconnu par son professionnalisme et son attitude face à la sécurité, une réputation qui le suit d'un navire à l'autre","Cette notion ne concerne que les officiers supérieurs","La réputation n'a aucun impact réel sur une carrière maritime"],correct:1,expl:"Cette réputation précède le marin bien avant qu'il ne monte à bord."},
    {q:"Quel est le MAP Safety Professional Mindset qui clôture le département ?",opts:["Detect → Alarm → Contain → Fight","Observe → Recognize → Report → Protect → Respond → Improve","Prepare → Muster → Launch → Escape → Survive → Lead","Recognize → Alert → Muster → Lead"],correct:1,expl:"Ce Mindset résume la synthèse complète des six leçons de S6."},
    {q:"Dans le scénario du Near Miss qui a évité un accident, pourquoi le signalement immédiat a-t-il été possible ?",opts:["Grâce à une obligation légale stricte uniquement","Parce qu'il n'y avait aucune crainte de sanction, rendant possible un signalement honnête et complet","Parce que l'accident avait déjà eu lieu","Le signalement n'a en réalité pas eu lieu dans ce scénario"],correct:1,expl:"L'absence de crainte de sanction est la condition essentielle d'un signalement honnête."},
    {q:"Dans ce scénario, l'amélioration a-t-elle été appliquée uniquement à l'endroit initial ?",opts:["Oui, uniquement à cet endroit précis","Non, elle a été appliquée à toute la flotte, démontrant la valeur d'un signalement partagé","Non, aucune amélioration concrète n'a été appliquée","Oui, et uniquement de manière temporaire"],correct:1,expl:"Le partage de la leçon a permis une amélioration bien au-delà d'un seul navire."},
    {q:"Quelle est la phrase de clôture de tout le département Safety ?",opts:["Safety is a checklist to complete before every task","Procedures create safety. People create a safety culture. Every professional mariner contributes to both.","Only officers are responsible for safety on board","Safety concerns only emergency situations"],correct:1,expl:"Cette phrase résume la transformation complète de la philosophie du département."},
    {q:"Ce module enseigne-t-il un substitut aux politiques réelles de sécurité de la compagnie ou aux réglementations portuaires ?",opts:["Oui, il remplace entièrement ces politiques","Non, il enseigne des principes de culture et de responsabilité, jamais un substitut aux politiques réelles de la compagnie","Oui, mais uniquement pour les officiers","Non, il ne sert à rien sans matériel"],correct:1,expl:"MAP enseigne la philosophie et les principes, jamais un remplacement des politiques réelles de la compagnie."},
  ],
  en:[
    {q:"What does the principle 'Safety Is Not What You Know. It Is What You Do When No One Is Watching' mean?",opts:["Only theoretical knowledge matters","Safety is measured by actual actions taken even without supervision, not just knowledge","This principle only concerns officers","One should never act without supervision"],correct:1,expl:"The true measure of safety is behavior when no one is looking."},
    {q:"What is the exact mission of this lesson?",opts:["Teach a new technical skill","Make it clear that all the skills of S6 rest on a culture lived every day","Repeat in detail all the content from L1 to L5","Present the history of the Safety department"],correct:1,expl:"This lesson presents no new technical skill, it reveals the philosophy that already connected the previous lessons."},
    {q:"What is a Near Miss according to this lesson?",opts:["An accident that didn't happen, with no real importance","A free warning, a rare chance to learn without having paid the price","An event that never deserves to be reported","A notion reserved for large companies"],correct:1,expl:"Every Near Miss Is a Free Lesson. The Next One May Not Be."},
    {q:"Why should someone who reports a Near Miss never be punished?",opts:["Punishment has no real effect","Punishing guarantees no one will report in the future, turning every future warning into silence","One must always punish to maintain discipline","This question only concerns officers"],correct:1,expl:"A fearless reporting culture protects the entire organization."},
    {q:"What is the real purpose of a Lessons Learned meeting?",opts:["Identify someone to sanction","Understand what happened to prevent it from happening again, never find someone to blame","Close the case as quickly as possible","Only fulfill an administrative obligation"],correct:1,expl:"Share the lesson, not the blame."},
    {q:"What does 'turning experience into improvement' concretely consist of?",opts:["Simply discussing the incident without changing anything","Translating every lesson learned into a concrete change: an adjusted procedure, an anticipated risk","Ignoring lessons learned if they seem minor","Documenting nothing after a Lessons Learned meeting"],correct:1,expl:"A lesson learned with no concrete change serves no purpose."},
    {q:"Why declare your important personal belongings on board?",opts:["It has no real use","It facilitates identification, simplifies compensation, and speeds up administrative steps","Only to fulfill a formality with no consequence","It only concerns senior officers"],correct:1,expl:"This step directly protects the sailor and their family in case of an incident."},
    {q:"Why participate seriously in safety drills?",opts:["It's only a formality with no real importance","A drill taken lightly today becomes a dangerous hesitation the day the situation is real","Drills have no link with the real effectiveness of rescue","Only to comply with regulations"],correct:1,expl:"Rescue effectiveness directly depends on it."},
    {q:"What does this lesson recall about confidentiality and social media, already covered in L3?",opts:["A complete, new development of the topic","A brief reminder that this discipline also serves a collective culture, not just individual protection","This topic is never mentioned in this lesson","A total contradiction with what was taught in L3"],correct:1,expl:"This lesson raises the topic to a different level, without repeating it identically."},
    {q:"What does 'Your Reputation Travels Before You' mean?",opts:["Only certificates determine a sailor's reputation","A sailor is recognized by their professionalism and attitude toward safety, a reputation that follows them from ship to ship","This notion only concerns senior officers","Reputation has no real impact on a maritime career"],correct:1,expl:"This reputation precedes the sailor long before they ever step aboard."},
    {q:"What is the MAP Safety Professional Mindset that closes the department?",opts:["Detect → Alarm → Contain → Fight","Observe → Recognize → Report → Protect → Respond → Improve","Prepare → Muster → Launch → Escape → Survive → Lead","Recognize → Alert → Muster → Lead"],correct:1,expl:"This Mindset summarizes the complete synthesis of the six lessons of S6."},
    {q:"In the scenario of the Near Miss that prevented an accident, why was the immediate report possible?",opts:["Only thanks to a strict legal obligation","Because there was no fear of sanction, allowing an honest, complete report","Because the accident had already happened","No report actually occurred in this scenario"],correct:1,expl:"The absence of fear of sanction is the essential condition for an honest report."},
    {q:"In this scenario, was the improvement applied only at the original location?",opts:["Yes, only at that exact spot","No, it was applied across the whole fleet, demonstrating the value of a shared report","No, no concrete improvement was applied","Yes, and only temporarily"],correct:1,expl:"Sharing the lesson allowed an improvement well beyond a single ship."},
    {q:"What is the closing statement of the entire Safety department?",opts:["Safety is a checklist to complete before every task","Procedures create safety. People create a safety culture. Every professional mariner contributes to both.","Only officers are responsible for safety on board","Safety concerns only emergency situations"],correct:1,expl:"This statement summarizes the complete transformation of the department's philosophy."},
    {q:"Does this module teach a replacement for the company's actual safety policies or port regulations?",opts:["Yes, it entirely replaces these policies","No, it teaches principles of culture and responsibility, never a replacement for the company's actual policies","Yes, but only for officers","No, it is useless without equipment"],correct:1,expl:"MAP teaches philosophy and principles, never a replacement for the company's actual policies."},
  ],
  es:[
    {q:"¿Qué significa el principio 'Safety Is Not What You Know. It Is What You Do When No One Is Watching'?",opts:["Solo importa el conocimiento teórico","La seguridad se mide por las acciones reales tomadas incluso sin supervisión, no solo por el conocimiento","Este principio solo concierne a los oficiales","Nunca hay que actuar sin supervisión"],correct:1,expl:"La verdadera medida de la seguridad es el comportamiento cuando nadie mira."},
    {q:"¿Cuál es la misión exacta de esta lección?",opts:["Enseñar una nueva habilidad técnica","Hacer comprender que todas las habilidades de S6 se basan en una cultura vivida cada día","Repetir en detalle todo el contenido de L1 a L5","Presentar la historia del departamento Safety"],correct:1,expl:"Esta lección no presenta ninguna nueva habilidad técnica, revela la filosofía que ya conectaba las lecciones anteriores."},
    {q:"¿Qué es un Near Miss según esta lección?",opts:["Un accidente que no ocurrió, sin importancia real","Una advertencia gratuita, una oportunidad rara de aprender sin haber pagado el precio","Un evento que nunca merece ser informado","Una noción reservada a las grandes compañías"],correct:1,expl:"Every Near Miss Is a Free Lesson. The Next One May Not Be."},
    {q:"¿Por qué nunca hay que castigar a quien informa un Near Miss?",opts:["El castigo no tiene ningún efecto real","Castigar garantiza que nadie informará en el futuro, convirtiendo cada futura advertencia en silencio","Siempre hay que castigar para mantener la disciplina","Esta cuestión solo concierne a los oficiales"],correct:1,expl:"Una cultura de notificación sin miedo protege a toda la organización."},
    {q:"¿Cuál es el verdadero objetivo de una reunión Lessons Learned?",opts:["Identificar a alguien para sancionar","Comprender qué pasó para impedir que se repita, nunca buscar un culpable","Cerrar el caso lo más rápido posible","Solo cumplir una obligación administrativa"],correct:1,expl:"Share the lesson, not the blame."},
    {q:"¿En qué consiste concretamente 'transformar la experiencia en mejora'?",opts:["Limitarse a hablar del incidente sin cambiar nada","Traducir cada lección aprendida en un cambio concreto: un procedimiento ajustado, un riesgo anticipado","Ignorar las lecciones aprendidas si parecen menores","No documentar nada después de una reunión Lessons Learned"],correct:1,expl:"Una lección aprendida sin cambio concreto no sirve de nada."},
    {q:"¿Por qué declarar los efectos personales importantes a bordo?",opts:["No tiene ninguna utilidad real","Facilita la identificación, simplifica una indemnización, y agiliza los trámites administrativos","Solo para cumplir una formalidad sin consecuencia","Solo concierne a los oficiales superiores"],correct:1,expl:"Esta gestión protege directamente al marino y a su familia en caso de incidente."},
    {q:"¿Por qué participar seriamente en los ejercicios de seguridad?",opts:["Es solo una formalidad sin importancia real","Un ejercicio tomado a la ligera hoy se convierte en una vacilación peligrosa el día que la situación sea real","Los ejercicios no tienen relación con la eficacia real del socorro","Solo para cumplir el reglamento"],correct:1,expl:"La eficacia del socorro depende directamente de ello."},
    {q:"¿Qué recuerda esta lección sobre la confidencialidad y las redes sociales, ya vistas en L3?",opts:["Un desarrollo completo y nuevo del tema","Un breve recordatorio de que esta disciplina también sirve a una cultura colectiva, no solo a una protección individual","Este tema nunca se menciona en esta lección","Una contradicción total con lo enseñado en L3"],correct:1,expl:"Esta lección eleva el tema a un nivel diferente, sin repetirlo idénticamente."},
    {q:"¿Qué significa 'Your Reputation Travels Before You'?",opts:["Solo los certificados determinan la reputación de un marino","Un marino es reconocido por su profesionalismo y su actitud ante la seguridad, una reputación que lo sigue de un buque a otro","Esta noción solo concierne a los oficiales superiores","La reputación no tiene ningún impacto real en una carrera marítima"],correct:1,expl:"Esta reputación precede al marino mucho antes de subir a bordo."},
    {q:"¿Cuál es el MAP Safety Professional Mindset que cierra el departamento?",opts:["Detect → Alarm → Contain → Fight","Observe → Recognize → Report → Protect → Respond → Improve","Prepare → Muster → Launch → Escape → Survive → Lead","Recognize → Alert → Muster → Lead"],correct:1,expl:"Este Mindset resume la síntesis completa de las seis lecciones de S6."},
    {q:"En el escenario del Near Miss que evitó un accidente, ¿por qué fue posible el informe inmediato?",opts:["Solo gracias a una obligación legal estricta","Porque no había miedo a la sanción, permitiendo una notificación honesta y completa","Porque el accidente ya había ocurrido","No hubo realmente informe en este escenario"],correct:1,expl:"La ausencia de miedo a la sanción es la condición esencial de una notificación honesta."},
    {q:"En este escenario, ¿se aplicó la mejora solo en el lugar original?",opts:["Sí, solo en ese lugar exacto","No, se aplicó en toda la flota, demostrando el valor de una notificación compartida","No, no se aplicó ninguna mejora concreta","Sí, y solo de forma temporal"],correct:1,expl:"Compartir la lección permitió una mejora mucho más allá de un solo buque."},
    {q:"¿Cuál es la frase de cierre de todo el departamento Safety?",opts:["Safety is a checklist to complete before every task","Procedures create safety. People create a safety culture. Every professional mariner contributes to both.","Only officers are responsible for safety on board","Safety concerns only emergency situations"],correct:1,expl:"Esta frase resume la transformación completa de la filosofía del departamento."},
    {q:"¿Este módulo enseña un sustituto de las políticas reales de seguridad de la compañía o de las normativas portuarias?",opts:["Sí, sustituye por completo estas políticas","No, enseña principios de cultura y responsabilidad, nunca un sustituto de las políticas reales de la compañía","Sí, pero solo para oficiales","No, no sirve de nada sin material"],correct:1,expl:"MAP enseña filosofía y principios, nunca un sustituto de las políticas reales de la compañía."},
  ],
  pt:[
    {q:"O que significa o princípio 'Safety Is Not What You Know. It Is What You Do When No One Is Watching'?",opts:["Só importa o conhecimento teórico","A segurança mede-se pelas ações reais tomadas mesmo sem supervisão, não só pelo conhecimento","Este princípio só diz respeito aos oficiais","Nunca se deve agir sem supervisão"],correct:1,expl:"A verdadeira medida da segurança é o comportamento quando ninguém está a ver."},
    {q:"Qual é a missão exata desta lição?",opts:["Ensinar uma nova competência técnica","Fazer compreender que todas as competências de S6 assentam numa cultura vivida diariamente","Repetir em detalhe todo o conteúdo de L1 a L5","Apresentar a história do departamento Safety"],correct:1,expl:"Esta lição não apresenta nenhuma nova competência técnica, revela a filosofia que já ligava as lições anteriores."},
    {q:"O que é um Near Miss segundo esta lição?",opts:["Um acidente que não aconteceu, sem importância real","Um aviso gratuito, uma oportunidade rara de aprender sem ter pago o preço","Um evento que nunca merece ser reportado","Uma noção reservada às grandes companhias"],correct:1,expl:"Every Near Miss Is a Free Lesson. The Next One May Not Be."},
    {q:"Por que nunca se deve punir quem reporta um Near Miss?",opts:["A punição não tem qualquer efeito real","Punir garante que ninguém vai reportar no futuro, transformando cada aviso futuro em silêncio","Deve-se sempre punir para manter a disciplina","Esta questão só diz respeito aos oficiais"],correct:1,expl:"Uma cultura de relato sem medo protege toda a organização."},
    {q:"Qual é o verdadeiro objetivo de uma reunião Lessons Learned?",opts:["Identificar alguém para sancionar","Compreender o que aconteceu para impedir que se repita, nunca procurar um culpado","Fechar o caso o mais rápido possível","Só cumprir uma obrigação administrativa"],correct:1,expl:"Share the lesson, not the blame."},
    {q:"Em que consiste concretamente 'transformar a experiência em melhoria'?",opts:["Limitar-se a discutir o incidente sem mudar nada","Traduzir cada lição aprendida numa mudança concreta: um procedimento ajustado, um risco antecipado","Ignorar as lições aprendidas se parecerem menores","Não documentar nada depois de uma reunião Lessons Learned"],correct:1,expl:"Uma lição aprendida sem mudança concreta não serve de nada."},
    {q:"Por que declarar os pertences pessoais importantes a bordo?",opts:["Não tem qualquer utilidade real","Facilita a identificação, simplifica uma indemnização, e acelera os trâmites administrativos","Só para cumprir uma formalidade sem consequência","Só diz respeito aos oficiais superiores"],correct:1,expl:"Esta diligência protege diretamente o marítimo e a sua família em caso de incidente."},
    {q:"Por que participar seriamente nos exercícios de segurança?",opts:["É só uma formalidade sem importância real","Um exercício levado de ânimo leve hoje torna-se uma hesitação perigosa no dia em que a situação for real","Os exercícios não têm relação com a eficácia real do socorro","Só para cumprir o regulamento"],correct:1,expl:"A eficácia do socorro depende diretamente disso."},
    {q:"O que esta lição relembra sobre confidencialidade e redes sociais, já vistas na L3?",opts:["Um desenvolvimento completo e novo do tema","Um breve lembrete de que esta disciplina também serve uma cultura coletiva, não apenas uma proteção individual","Este tema nunca é mencionado nesta lição","Uma contradição total com o que foi ensinado na L3"],correct:1,expl:"Esta lição eleva o tema a um nível diferente, sem o repetir de forma idêntica."},
    {q:"O que significa 'Your Reputation Travels Before You'?",opts:["Só os certificados determinam a reputação de um marítimo","Um marítimo é reconhecido pelo seu profissionalismo e atitude perante a segurança, uma reputação que o acompanha de navio em navio","Esta noção só diz respeito aos oficiais superiores","A reputação não tem qualquer impacto real numa carreira marítima"],correct:1,expl:"Esta reputação precede o marítimo muito antes de ele subir a bordo."},
    {q:"Qual é o MAP Safety Professional Mindset que fecha o departamento?",opts:["Detect → Alarm → Contain → Fight","Observe → Recognize → Report → Protect → Respond → Improve","Prepare → Muster → Launch → Escape → Survive → Lead","Recognize → Alert → Muster → Lead"],correct:1,expl:"Este Mindset resume a síntese completa das seis lições de S6."},
    {q:"No cenário do Near Miss que evitou um acidente, por que foi possível o relato imediato?",opts:["Só graças a uma obrigação legal estrita","Porque não havia medo de sanção, permitindo um relato honesto e completo","Porque o acidente já tinha acontecido","Nenhum relato ocorreu realmente neste cenário"],correct:1,expl:"A ausência de medo de sanção é a condição essencial de um relato honesto."},
    {q:"Neste cenário, a melhoria foi aplicada apenas no local original?",opts:["Sim, só nesse local exato","Não, foi aplicada em toda a frota, demonstrando o valor de um relato partilhado","Não, nenhuma melhoria concreta foi aplicada","Sim, e só de forma temporária"],correct:1,expl:"Partilhar a lição permitiu uma melhoria muito além de um único navio."},
    {q:"Qual é a frase de encerramento de todo o departamento Safety?",opts:["Safety is a checklist to complete before every task","Procedures create safety. People create a safety culture. Every professional mariner contributes to both.","Only officers are responsible for safety on board","Safety concerns only emergency situations"],correct:1,expl:"Esta frase resume a transformação completa da filosofia do departamento."},
    {q:"Este módulo ensina um substituto das políticas reais de segurança da companhia ou dos regulamentos portuários?",opts:["Sim, substitui inteiramente estas políticas","Não, ensina princípios de cultura e responsabilidade, nunca um substituto das políticas reais da companhia","Sim, mas só para oficiais","Não, não serve de nada sem material"],correct:1,expl:"A MAP ensina filosofia e princípios, nunca um substituto das políticas reais da companhia."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Que signifie 'Safety Is Not What You Know. It Is What You Do When No One Is Watching' ?",opts:["Seule la théorie compte","La sécurité se mesure aux gestes réels, même sans surveillance","Cela ne concerne que les officiers","Il ne faut jamais agir sans supervision"],correct:1,expl:"La vraie mesure de la sécurité, c'est le comportement quand personne ne regarde."},
    {q:"Qu'est-ce qu'un Near Miss ?",opts:["Un accident sans importance","Un avertissement gratuit, une occasion d'apprendre sans en payer le prix","Un événement à ne jamais signaler","Une notion réservée aux grandes compagnies"],correct:1,expl:"Every Near Miss Is a Free Lesson. The Next One May Not Be."},
    {q:"Quel est l'objectif réel d'une réunion Lessons Learned ?",opts:["Sanctionner un coupable","Comprendre pour empêcher la répétition, jamais chercher un coupable","Fermer le dossier vite","Une simple obligation administrative"],correct:1,expl:"Share the lesson, not the blame."},
    {q:"Quel est le MAP Safety Professional Mindset final ?",opts:["Detect → Alarm → Fight","Observe → Recognize → Report → Protect → Respond → Improve","Prepare → Muster → Survive","Recognize → Alert → Lead"],correct:1,expl:"Ce Mindset résume toute la synthèse de S6."},
    {q:"Quelle est la phrase de clôture du département Safety ?",opts:["Safety is a checklist","Procedures create safety. People create a safety culture. Every professional mariner contributes to both.","Only officers matter for safety","Safety only concerns emergencies"],correct:1,expl:"Cette phrase résume la transformation complète du département."},
  ],
  en:[
    {q:"What does 'Safety Is Not What You Know. It Is What You Do When No One Is Watching' mean?",opts:["Only theory matters","Safety is measured by real actions, even without supervision","It only concerns officers","One should never act without supervision"],correct:1,expl:"The true measure of safety is behavior when no one is looking."},
    {q:"What is a Near Miss?",opts:["An unimportant accident","A free warning, a chance to learn without paying the price","An event that should never be reported","A notion reserved for large companies"],correct:1,expl:"Every Near Miss Is a Free Lesson. The Next One May Not Be."},
    {q:"What is the real purpose of a Lessons Learned meeting?",opts:["Sanction someone guilty","Understand to prevent repetition, never find someone to blame","Close the case quickly","A simple administrative obligation"],correct:1,expl:"Share the lesson, not the blame."},
    {q:"What is the final MAP Safety Professional Mindset?",opts:["Detect → Alarm → Fight","Observe → Recognize → Report → Protect → Respond → Improve","Prepare → Muster → Survive","Recognize → Alert → Lead"],correct:1,expl:"This Mindset summarizes the entire synthesis of S6."},
    {q:"What is the closing statement of the Safety department?",opts:["Safety is a checklist","Procedures create safety. People create a safety culture. Every professional mariner contributes to both.","Only officers matter for safety","Safety only concerns emergencies"],correct:1,expl:"This statement summarizes the complete transformation of the department."},
  ],
  es:[
    {q:"¿Qué significa 'Safety Is Not What You Know. It Is What You Do When No One Is Watching'?",opts:["Solo importa la teoría","La seguridad se mide por acciones reales, incluso sin vigilancia","Solo concierne a los oficiales","Nunca hay que actuar sin supervisión"],correct:1,expl:"La verdadera medida de la seguridad es el comportamiento cuando nadie mira."},
    {q:"¿Qué es un Near Miss?",opts:["Un accidente sin importancia","Una advertencia gratuita, una oportunidad de aprender sin pagar el precio","Un evento que nunca debe informarse","Una noción reservada a las grandes compañías"],correct:1,expl:"Every Near Miss Is a Free Lesson. The Next One May Not Be."},
    {q:"¿Cuál es el objetivo real de una reunión Lessons Learned?",opts:["Sancionar a un culpable","Comprender para impedir la repetición, nunca buscar un culpable","Cerrar el caso rápido","Una simple obligación administrativa"],correct:1,expl:"Share the lesson, not the blame."},
    {q:"¿Cuál es el MAP Safety Professional Mindset final?",opts:["Detect → Alarm → Fight","Observe → Recognize → Report → Protect → Respond → Improve","Prepare → Muster → Survive","Recognize → Alert → Lead"],correct:1,expl:"Este Mindset resume toda la síntesis de S6."},
    {q:"¿Cuál es la frase de cierre del departamento Safety?",opts:["Safety is a checklist","Procedures create safety. People create a safety culture. Every professional mariner contributes to both.","Only officers matter for safety","Safety only concerns emergencies"],correct:1,expl:"Esta frase resume la transformación completa del departamento."},
  ],
  pt:[
    {q:"O que significa 'Safety Is Not What You Know. It Is What You Do When No One Is Watching'?",opts:["Só a teoria importa","A segurança mede-se por ações reais, mesmo sem vigilância","Só diz respeito aos oficiais","Nunca se deve agir sem supervisão"],correct:1,expl:"A verdadeira medida da segurança é o comportamento quando ninguém está a ver."},
    {q:"O que é um Near Miss?",opts:["Um acidente sem importância","Um aviso gratuito, uma oportunidade de aprender sem pagar o preço","Um evento que nunca deve ser reportado","Uma noção reservada às grandes companhias"],correct:1,expl:"Every Near Miss Is a Free Lesson. The Next One May Not Be."},
    {q:"Qual é o objetivo real de uma reunião Lessons Learned?",opts:["Sancionar um culpado","Compreender para impedir a repetição, nunca procurar um culpado","Fechar o caso rápido","Uma simples obrigação administrativa"],correct:1,expl:"Share the lesson, not the blame."},
    {q:"Qual é o MAP Safety Professional Mindset final?",opts:["Detect → Alarm → Fight","Observe → Recognize → Report → Protect → Respond → Improve","Prepare → Muster → Survive","Recognize → Alert → Lead"],correct:1,expl:"Este Mindset resume toda a síntese de S6."},
    {q:"Qual é a frase de encerramento do departamento Safety?",opts:["Safety is a checklist","Procedures create safety. People create a safety culture. Every professional mariner contributes to both.","Only officers matter for safety","Safety only concerns emergencies"],correct:1,expl:"Esta frase resume a transformação completa do departamento."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"Si personne n'etait jamais en train de te regarder, agirais-tu exactement de la meme maniere en matiere de securite ?",
    en:"If no one was ever watching you, would you act exactly the same way regarding safety?",
    es:"Si nadie te estuviera mirando nunca, ¿actuarias exactamente de la misma manera en materia de seguridad?",
    pt:"Se ninguem estivesse nunca a olhar para ti, agirias exatamente da mesma forma em materia de seguranca?",
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
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Leçon 6/6 · ⭐ Premium",
      title:"Safety Culture & Professional Responsibility",
      intro:"Cette leçon ne traite plus d'une urgence et ne présente aucune nouvelle compétence technique. Elle révèle la philosophie qui reliait déjà, en silence, les cinq leçons précédentes de S6 : observer, réagir, se protéger, annoncer, prévenir reposent tous sur une seule chose, une culture vécue au quotidien.",
      p0:"SAFETY IS NOT WHAT YOU KNOW. IT IS WHAT YOU DO WHEN NO ONE IS WATCHING.",s0t:"Le principe qui clôture tout le département",
      s0:"Un PTW, un JSA, une ronde, une annonce d'urgence : toutes ces compétences ne valent rien si elles ne sont appliquées que sous surveillance. La véritable sécurité se révèle dans les gestes accomplis seul, sans témoin.",
      p1:"NEAR MISS REPORTING",s1t:"Un avertissement gratuit, pas un non-événement",
      s1:"Un Near Miss n'est jamais un accident qui n'a pas eu lieu. C'est une occasion rare d'apprendre sans en payer le prix. Ne jamais punir un signalement, sinon plus personne ne signalera.",
      p2:"LESSONS LEARNED",s2t:"Share the lesson, not the blame",
      s2:"Une organisation progresse en étudiant ce qui a failli arriver, pas seulement ce qui est arrivé. Le but d'une enquête n'est jamais de chercher un coupable, mais d'empêcher la répétition.",
      p3:"SE PRÉPARER POUR LE COLLECTIF",s3t:"Deux formes de préparation souvent négligées",
      s3:"Déclarer ses effets personnels facilite l'identification et simplifie une indemnisation. Participer sérieusement aux exercices détermine directement l'efficacité réelle des secours.",
      p4:"PROFESSIONAL RESPONSIBILITY BEYOND THE SHIP",s4t:"Politiques, ports, autorités",
      s4:"Politiques de sécurité de la compagnie, règles portuaires, autorités locales : la discipline personnelle vue en Leçon 3 sert aussi une culture collective, pas seulement une protection individuelle.",
      p5:"🎖️ VOTRE RÉPUTATION",p6:"🎯 EXERCICE OPÉRATIONNEL",p7:"✅ SCÉNARIO",p8:"📝 BANQUE DE 15 QUESTIONS",p9:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 6",
      sumP:["Safety Is Not What You Know. It Is What You Do When No One Is Watching","Every Near Miss Is a Free Lesson. The Next One May Not Be","Share the lesson, not the blame : jamais chercher un coupable","Déclarer ses effets et participer sérieusement aux exercices protègent le collectif","Your Reputation Travels Before You : le professionnalisme précède le marin"],
      learnedP:["Pourquoi un Near Miss est un avertissement gratuit à ne jamais punir","La véritable philosophie d'une réunion Lessons Learned","Pourquoi la préparation collective compte autant que la protection individuelle","Le lien entre discipline personnelle et culture collective","Le MAP Safety Professional Mindset qui synthétise tout le département"],
      transition:"The Safety department ends here. But everything you have learned - vigilance, protection, communication, prevention, culture - becomes the foundation for every department that follows.",
      safetyMsg:"Procedures create safety. People create a safety culture. Every professional mariner contributes to both.",
    },
    en:{
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Lesson 6/6 · ⭐ Premium",
      title:"Safety Culture & Professional Responsibility",
      intro:"This lesson no longer covers an emergency and presents no new technical skill. It reveals the philosophy that already silently connected the five previous lessons of S6: observing, reacting, protecting oneself, reporting, preventing all rest on one single thing, a culture lived every day.",
      p0:"SAFETY IS NOT WHAT YOU KNOW. IT IS WHAT YOU DO WHEN NO ONE IS WATCHING.",s0t:"The principle that closes the entire department",
      s0:"A PTW, a JSA, a round, an emergency report: none of these skills are worth anything if only applied under supervision. True safety reveals itself in the actions taken alone, with no witness.",
      p1:"NEAR MISS REPORTING",s1t:"A free warning, not a non-event",
      s1:"A Near Miss is never an accident that didn't happen. It is a rare chance to learn without paying the price. Never punish a report, or no one will ever report again.",
      p2:"LESSONS LEARNED",s2t:"Share the lesson, not the blame",
      s2:"An organization progresses by studying what nearly happened, not just what did happen. The purpose of an investigation is never to find someone to blame, but to prevent repetition.",
      p3:"PREPARING FOR THE COLLECTIVE",s3t:"Two often neglected forms of preparation",
      s3:"Declaring personal belongings facilitates identification and simplifies compensation. Participating seriously in drills directly determines the real effectiveness of rescue.",
      p4:"PROFESSIONAL RESPONSIBILITY BEYOND THE SHIP",s4t:"Policies, ports, authorities",
      s4:"Company safety policies, port rules, local authorities: the personal discipline seen in Lesson 3 also serves a collective culture, not just individual protection.",
      p5:"🎖️ YOUR REPUTATION",p6:"🎯 OPERATIONAL EXERCISE",p7:"✅ SCENARIO",p8:"📝 15-QUESTION BANK",p9:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 6",
      sumP:["Safety Is Not What You Know. It Is What You Do When No One Is Watching","Every Near Miss Is a Free Lesson. The Next One May Not Be","Share the lesson, not the blame: never find someone to blame","Declaring belongings and participating seriously in drills protect the collective","Your Reputation Travels Before You: professionalism precedes the sailor"],
      learnedP:["Why a Near Miss is a free warning that should never be punished","The true philosophy of a Lessons Learned meeting","Why collective preparation matters as much as individual protection","The link between personal discipline and collective culture","The MAP Safety Professional Mindset that synthesizes the whole department"],
      transition:"The Safety department ends here. But everything you have learned - vigilance, protection, communication, prevention, culture - becomes the foundation for every department that follows.",
      safetyMsg:"Procedures create safety. People create a safety culture. Every professional mariner contributes to both.",
    },
    es:{
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Lección 6/6 · ⭐ Premium",
      title:"Safety Culture & Professional Responsibility",
      intro:"Esta lección ya no trata de una urgencia y no presenta ninguna nueva habilidad técnica. Revela la filosofía que ya conectaba en silencio las cinco lecciones anteriores de S6: observar, reaccionar, protegerse, informar, prevenir descansan todos en una sola cosa, una cultura vivida cada día.",
      p0:"SAFETY IS NOT WHAT YOU KNOW. IT IS WHAT YOU DO WHEN NO ONE IS WATCHING.",s0t:"El principio que cierra todo el departamento",
      s0:"Un PTW, un JSA, una ronda, un aviso de urgencia: ninguna de estas habilidades vale nada si solo se aplica bajo vigilancia. La verdadera seguridad se revela en los actos realizados solo, sin testigo.",
      p1:"NEAR MISS REPORTING",s1t:"Una advertencia gratuita, no un no-evento",
      s1:"Un Near Miss nunca es un accidente que no ocurrió. Es una oportunidad rara de aprender sin pagar el precio. Nunca castigar una notificación, o nadie volverá a informar.",
      p2:"LESSONS LEARNED",s2t:"Share the lesson, not the blame",
      s2:"Una organización progresa estudiando lo que estuvo a punto de ocurrir, no solo lo que ocurrió. El objetivo de una investigación nunca es buscar a un culpable, sino impedir la repetición.",
      p3:"PREPARARSE PARA LO COLECTIVO",s3t:"Dos formas de preparación a menudo descuidadas",
      s3:"Declarar los efectos personales facilita la identificación y simplifica una indemnización. Participar seriamente en los ejercicios determina directamente la eficacia real del socorro.",
      p4:"PROFESSIONAL RESPONSIBILITY BEYOND THE SHIP",s4t:"Políticas, puertos, autoridades",
      s4:"Políticas de seguridad de la compañía, reglas portuarias, autoridades locales: la disciplina personal vista en la Lección 3 también sirve a una cultura colectiva, no solo a una protección individual.",
      p5:"🎖️ TU REPUTACIÓN",p6:"🎯 EJERCICIO OPERATIVO",p7:"✅ ESCENARIO",p8:"📝 BANCO DE 15 PREGUNTAS",p9:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 6",
      sumP:["Safety Is Not What You Know. It Is What You Do When No One Is Watching","Every Near Miss Is a Free Lesson. The Next One May Not Be","Share the lesson, not the blame: nunca buscar un culpable","Declarar los efectos y participar seriamente en los ejercicios protegen a lo colectivo","Your Reputation Travels Before You: el profesionalismo precede al marino"],
      learnedP:["Por qué un Near Miss es una advertencia gratuita que nunca debe castigarse","La verdadera filosofía de una reunión Lessons Learned","Por qué la preparación colectiva importa tanto como la protección individual","El vínculo entre la disciplina personal y la cultura colectiva","El MAP Safety Professional Mindset que sintetiza todo el departamento"],
      transition:"The Safety department ends here. But everything you have learned - vigilance, protection, communication, prevention, culture - becomes the foundation for every department that follows.",
      safetyMsg:"Procedures create safety. People create a safety culture. Every professional mariner contributes to both.",
    },
    pt:{
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Lição 6/6 · ⭐ Premium",
      title:"Safety Culture & Professional Responsibility",
      intro:"Esta lição já não trata de uma urgência e não apresenta nenhuma nova competência técnica. Revela a filosofia que já ligava em silêncio as cinco lições anteriores de S6: observar, reagir, proteger-se, reportar, prevenir assentam todos numa única coisa, uma cultura vivida diariamente.",
      p0:"SAFETY IS NOT WHAT YOU KNOW. IT IS WHAT YOU DO WHEN NO ONE IS WATCHING.",s0t:"O princípio que encerra todo o departamento",
      s0:"Um PTW, um JSA, uma ronda, um aviso de urgência: nenhuma destas competências vale nada se só for aplicada sob vigilância. A verdadeira segurança revela-se nos gestos realizados sozinho, sem testemunha.",
      p1:"NEAR MISS REPORTING",s1t:"Um aviso gratuito, não um não-evento",
      s1:"Um Near Miss nunca é um acidente que não aconteceu. É uma oportunidade rara de aprender sem pagar o preço. Nunca punir um relato, ou ninguém mais vai reportar.",
      p2:"LESSONS LEARNED",s2t:"Share the lesson, not the blame",
      s2:"Uma organização progride estudando o que quase aconteceu, não só o que aconteceu. O objetivo de uma investigação nunca é procurar um culpado, mas impedir a repetição.",
      p3:"PREPARAR-SE PARA O COLETIVO",s3t:"Duas formas de preparação muitas vezes negligenciadas",
      s3:"Declarar os pertences pessoais facilita a identificação e simplifica uma indemnização. Participar seriamente nos exercícios determina diretamente a eficácia real do socorro.",
      p4:"PROFESSIONAL RESPONSIBILITY BEYOND THE SHIP",s4t:"Políticas, portos, autoridades",
      s4:"Políticas de segurança da companhia, regras portuárias, autoridades locais: a disciplina pessoal vista na Lição 3 também serve uma cultura coletiva, não apenas uma proteção individual.",
      p5:"🎖️ A TUA REPUTAÇÃO",p6:"🎯 EXERCÍCIO OPERACIONAL",p7:"✅ CENÁRIO",p8:"📝 BANCO DE 15 PERGUNTAS",p9:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 6",
      sumP:["Safety Is Not What You Know. It Is What You Do When No One Is Watching","Every Near Miss Is a Free Lesson. The Next One May Not Be","Share the lesson, not the blame: nunca procurar um culpado","Declarar os pertences e participar seriamente nos exercícios protegem o coletivo","Your Reputation Travels Before You: o profissionalismo precede o marítimo"],
      learnedP:["Por que um Near Miss é um aviso gratuito que nunca deve ser punido","A verdadeira filosofia de uma reunião Lessons Learned","Por que a preparação coletiva importa tanto quanto a proteção individual","A ligação entre a disciplina pessoal e a cultura coletiva","O MAP Safety Professional Mindset que sintetiza todo o departamento"],
      transition:"The Safety department ends here. But everything you have learned - vigilance, protection, communication, prevention, culture - becomes the foundation for every department that follows.",
      safetyMsg:"Procedures create safety. People create a safety culture. Every professional mariner contributes to both.",
    },
  };
  return d[lang]||d.fr;
};

const mindsetLabel = {
  fr:{title:"THE MAP SAFETY PROFESSIONAL MINDSET",sub:"La synthèse complète du département Safety.",steps:["Observe","Recognize","Report","Protect","Respond","Improve"]},
  en:{title:"THE MAP SAFETY PROFESSIONAL MINDSET",sub:"The complete synthesis of the Safety department.",steps:["Observe","Recognize","Report","Protect","Respond","Improve"]},
  es:{title:"THE MAP SAFETY PROFESSIONAL MINDSET",sub:"La síntesis completa del departamento Safety.",steps:["Observe","Recognize","Report","Protect","Respond","Improve"]},
  pt:{title:"THE MAP SAFETY PROFESSIONAL MINDSET",sub:"A síntese completa do departamento Safety.",steps:["Observe","Recognize","Report","Protect","Respond","Improve"]},
};

// MAIN
export default function LessonSafetyS6_L6({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t = T[lang]||T.fr;
  const quiz = QUIZ[lang]||QUIZ.fr;
  const bank = BANK[lang]||BANK.fr;
  const lc = getContent(lang);
  const ms = mindsetLabel[lang]||mindsetLabel.fr;
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 6/6":lang==="en"?"Lesson 6/6":lang==="es"?"Lección 6/6":"Lição 6/6"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
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

            <SL icon="🛡️" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🎁" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🎁</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🎁 {lang==="fr"?"NEAR MISS - INTERACTIF":lang==="en"?"NEAR MISS - INTERACTIVE":lang==="es"?"NEAR MISS - INTERACTIVO":"NEAR MISS - INTERATIVO"}</div><NearMissSVG lang={lang}/></Card>

            <SL icon="🤝" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🤝</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🤝 {lang==="fr"?"LESSONS LEARNED - INTERACTIF":lang==="en"?"LESSONS LEARNED - INTERACTIVE":lang==="es"?"LESSONS LEARNED - INTERACTIVO":"LESSONS LEARNED - INTERATIVO"}</div><LessonsLearnedSVG lang={lang}/></Card>

            <SL icon="📝" text={lc.p3} color={C.green}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📝</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📝 {lang==="fr"?"PRÉPARATION COLLECTIVE - INTERACTIF":lang==="en"?"COLLECTIVE PREPARATION - INTERACTIVE":lang==="es"?"PREPARACIÓN COLECTIVA - INTERACTIVO":"PREPARAÇÃO COLETIVA - INTERATIVO"}</div><CollectivePreparationSVG lang={lang}/></Card>

            <SL icon="🌍" text={lc.p4} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🌍</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🌍 {lang==="fr"?"RESPONSABILITÉ - INTERACTIF":lang==="en"?"RESPONSIBILITY - INTERACTIVE":lang==="es"?"RESPONSABILIDAD - INTERACTIVO":"RESPONSABILIDADE - INTERATIVO"}</div><BeyondTheShipSVG lang={lang}/></Card>

            <SL icon="🎖️" text={lc.p5} color={C.purple}/>
            <div style={{marginBottom:14}}><ReputationBox lang={lang}/></div>

            <SL icon="🎯" text={lc.p6} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="✅" text={lc.p7} color={C.green}/>
            <div style={{marginBottom:14}}><CompositeCase lang={lang}/></div>

            <SL icon="📝" text={lc.p8} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank}/></Card>

            <SL icon="🪞" text={lc.p9} color={C.purple}/>
            <div style={{marginBottom:14}}><SafetyReflection lang={lang}/></div>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(230,126,34,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(230,126,34,0.35)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz Final - Culture de Sécurité":lang==="en"?"Final Quiz - Safety Culture":lang==="es"?"Quiz Final - Cultura de Seguridad":"Quiz Final - Cultura de Segurança"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 6/6":"questions · Lesson 6/6"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(230,126,34,0.15)",border:`1px solid ${C.orange}55`,fontSize:14,color:C.gold2,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>

            <Card style={{marginBottom:16,border:`1.5px solid ${C.gold}`,background:"linear-gradient(160deg,rgba(201,146,42,0.15),rgba(13,31,60,0.95))",textAlign:"center"}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:14}}>{ms.title}</div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,marginBottom:12}}>
                {ms.steps.map((s,i)=>(
                  <div key={s} style={{width:"100%"}}>
                    <div style={{padding:"8px 0",borderRadius:10,background:"rgba(255,255,255,0.06)",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:C.white,letterSpacing:1}}>{s}</div>
                    {i<ms.steps.length-1&&<div style={{fontSize:13,color:C.gold2,padding:"2px 0"}}>↓</div>}
                  </div>
                ))}
              </div>
              <div style={{fontSize:11,color:C.muted,fontStyle:"italic"}}>{ms.sub}</div>
            </Card>

            <Card style={{marginBottom:16,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.1),rgba(13,31,60,0.9))"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span style={{fontSize:20}}>🛡️</span>
                <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",fontWeight:700}}>SAFETY MESSAGE</div>
              </div>
              <div style={{fontSize:13,color:C.white,lineHeight:1.8,fontStyle:"italic"}}>{lc.safetyMsg}</div>
            </Card>

            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <div style={{textAlign:"center",fontSize:13,color:C.gold2,fontStyle:"italic",marginBottom:14,padding:"0 8px"}}>{lc.transition}</div>

            <Card style={{marginBottom:16,textAlign:"center",border:`2px solid ${C.gold}`,background:"linear-gradient(160deg,rgba(201,146,42,0.22),rgba(13,31,60,0.97))"}}>
              <div style={{fontSize:42,marginBottom:8}}>🏆</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:900,color:C.gold2,letterSpacing:2,marginBottom:10}}>{lang==="fr"?"SAFETY DEPARTMENT COMPLETED":lang==="en"?"SAFETY DEPARTMENT COMPLETED":lang==="es"?"SAFETY DEPARTMENT COMPLETED":"SAFETY DEPARTMENT COMPLETED"}</div>
              <div style={{fontSize:13,color:C.white,fontWeight:700,marginBottom:4}}>{lang==="fr"?"Les 6 modules du département sont désormais terminés":lang==="en"?"All 6 modules of the department are now completed":lang==="es"?"Los 6 módulos del departamento ya están completados":"Os 6 módulos do departamento estão agora concluídos"}</div>
              <div style={{fontSize:11,color:C.muted,marginBottom:10}}>{lang==="fr"?"Chaque leçon, de S1 à S6, contribue à ce total":lang==="en"?"Every lesson, from S1 to S6, contributes to this total":lang==="es"?"Cada lección, de S1 a S6, contribuye a este total":"Cada lição, de S1 a S6, contribui para este total"}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 18px",borderRadius:20,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}55`,fontSize:12,color:C.gold2,fontWeight:700,marginBottom:14}}>🎖️ {lang==="fr"?"BADGE SAFETY PROFESSIONAL":lang==="en"?"SAFETY PROFESSIONAL BADGE":lang==="es"?"INSIGNIA SAFETY PROFESSIONAL":"SELO SAFETY PROFESSIONAL"}</div>
              <div style={{fontSize:13,color:C.white,lineHeight:1.8,fontStyle:"italic",fontWeight:700,marginTop:8}}>{lang==="fr"?"Safety is not a department. It is the foundation of every operation at sea.":lang==="en"?"Safety is not a department. It is the foundation of every operation at sea.":lang==="es"?"Safety is not a department. It is the foundation of every operation at sea.":"Safety is not a department. It is the foundation of every operation at sea."}</div>
            </Card>

            <div style={{textAlign:"center",fontSize:12,color:C.gold2,fontStyle:"italic",marginBottom:14,padding:"0 8px"}}>
              {lang==="fr"?"From this point forward, every department you study in MAP will assume that you think and act as a safety professional.":lang==="en"?"From this point forward, every department you study in MAP will assume that you think and act as a safety professional.":lang==="es"?"From this point forward, every department you study in MAP will assume that you think and act as a safety professional.":"From this point forward, every department you study in MAP will assume that you think and act as a safety professional."}
            </div>

            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(230,126,34,0.35)",marginBottom:10}}>
              {t.backDash}
            </button>
          </div>}

        </div>
      </div>
    </div>
  );
}
