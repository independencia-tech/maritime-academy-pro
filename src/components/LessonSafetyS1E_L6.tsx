import { useState, useEffect } from "react";
import { shuffleQuestionOptions, C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// ══════════════════════════════════════
// SVG 1 — THE 5 CASES, ONE PER LESSON
// ══════════════════════════════════════
function CaseSynthesisSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const cases = [
    { id:1, icon:"😴", color:C.orange, ship:"Viking Sky", lesson:{fr:"L1 — Facteurs Humains",en:"L1 — Human Factors",es:"L1 — Factores Humanos",pt:"L1 — Fatores Humanos"},
      lessonLearned:{fr:"18 alarmes ignorées en quelques heures : une dérive tolérée devient un blackout total.",en:"18 alarms ignored within hours: a tolerated drift becomes a total blackout.",es:"18 alarmas ignoradas en pocas horas: una deriva tolerada se convierte en apagón total.",pt:"18 alarmes ignorados em poucas horas: um desvio tolerado torna-se um blackout total."} },
    { id:2, icon:"🧩", color:C.blue2, ship:"Ferry Kaitaki", lesson:{fr:"L2 — Coordination d'Équipe",en:"L2 — Team Coordination",es:"L2 — Coordinación de Equipo",pt:"L2 — Coordenação de Equipa"},
      lessonLearned:{fr:"'Chaos organisé' : sans rôles clairs, une avarie gérable devient une crise d'une heure.",en:"'Organised chaos': without clear roles, a manageable fault becomes an hour-long crisis.",es:"'Caos organizado': sin roles claros, una avería manejable se convierte en una crisis de una hora.",pt:"'Caos organizado': sem funções claras, uma avaria gerível torna-se numa crise de uma hora."} },
    { id:3, icon:"✅", color:C.red, ship:"Finlandia Seaways", lesson:{fr:"L3 — Actions d'Urgence",en:"L3 — Emergency Actions",es:"L3 — Acciones de Emergencia",pt:"L3 — Ações de Emergência"},
      lessonLearned:{fr:"Une checklist claire structure la réponse même dans la fumée et le bruit d'un incendie moteur.",en:"A clear checklist structures the response even in the smoke and noise of an engine fire.",es:"Una checklist clara estructura la respuesta incluso entre el humo y el ruido de un incendio de motor.",pt:"Uma checklist clara estrutura a resposta mesmo no fumo e ruído de um incêndio de motor."} },
    { id:4, icon:"🔢", color:C.gold2, ship:"Carnival Triumph", lesson:{fr:"L4 — Les Minutes Critiques",en:"L4 — The Critical Minutes",es:"L4 — Los Minutos Críticos",pt:"L4 — Os Minutos Críticos"},
      lessonLearned:{fr:"Toutes les avaries ne se résolvent pas en minutes — certaines exigent une gestion sur plusieurs jours.",en:"Not all casualties resolve in minutes — some require management over several days.",es:"No todas las averías se resuelven en minutos — algunas exigen gestión durante varios días.",pt:"Nem todas as avarias se resolvem em minutos — algumas exigem gestão ao longo de vários dias."} },
    { id:5, icon:"🔍", color:C.teal, ship:"Damgracht / AP Revelin", lesson:{fr:"L5 — Décision Sous Pression",en:"L5 — Decision Under Pressure",es:"L5 — Decisión Bajo Presión",pt:"L5 — Decisão Sob Pressão"},
      lessonLearned:{fr:"Un système automatique a retiré le contrôle humain au pire moment, sur la base d'une fausse alarme.",en:"An automatic system removed human control at the worst moment, based on a false alarm.",es:"Un sistema automático retiró el control humano en el peor momento, basándose en una falsa alarma.",pt:"Um sistema automático retirou o controlo humano no pior momento, com base num falso alarme."} },
  ];
  const sel_ = sel!==null?cases.find(c=>c.id===sel):null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
        {cases.map(c=>(
          <div key={c.id} onClick={()=>setSel(sel===c.id?null:c.id)}
            style={{padding:"10px 4px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===c.id?`${c.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===c.id?c.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:18,marginBottom:3}}>{c.icon}</div>
            <div style={{fontSize:8,color:sel===c.id?c.color:C.muted,fontWeight:700,lineHeight:1.3}}>{c.ship}</div>
          </div>
        ))}
      </div>
      {sel_?(
        <div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`}}>
          <div style={{fontSize:10,color:sel_.color,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{sel_.lesson[lang]||sel_.lesson.fr}</div>
          <div style={{fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.lessonLearned[lang]||sel_.lessonLearned.fr}</div>
        </div>
      ):(
        <div style={{textAlign:"center",padding:"8px",fontSize:11,color:C.muted}}>{lang==="fr"?"Touche un cas pour revoir son enseignement clé":lang==="en"?"Tap a case to revisit its key lesson":lang==="es"?"Toca un caso para repasar su enseñanza clave":"Toque num caso para rever o seu ensinamento chave"}</div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE — PATTERN RECOGNITION
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"a",q2:"b",q3:"c",q4:"d"};
  const qs = {
    fr:[
      {id:"q1",q:"Une alarme mineure revient chaque semaine depuis un mois et personne ne s'en inquiète plus. Quel principe ERM s'applique ?\na) L1 — Facteurs humains (alarm bias / normalisation d'une dérive)\nb) L2 — Coordination d'équipe\nc) L4 — Gestion prolongée\nd) L5 — Décision sous pression"},
      {id:"q2",q:"Trois personnes tentent de réparer la même vanne en même temps sans se concerter pendant une urgence. Quel principe ERM s'applique ?\na) L1 — Facteurs humains\nb) L2 — Coordination d'équipe (rôles clairs, conscience partagée)\nc) L3 — Actions d'urgence\nd) L5 — Décision sous pression"},
      {id:"q3",q:"Un incendie moteur vient d'être détecté et l'équipe doit isoler le combustible et basculer sur secours immédiatement. Quel principe ERM s'applique ?\na) L1 — Facteurs humains\nb) L2 — Coordination d'équipe\nc) L3 — Actions d'urgence structurées\nd) L4 — Gestion prolongée"},
      {id:"q4",q:"Une alarme ambiguë se déclenche juste après une maintenance récente, et il faut décider vite sans certitude complète sur la cause. Quel principe ERM s'applique ?\na) L1 — Facteurs humains\nb) L2 — Coordination d'équipe\nc) L3 — Actions d'urgence\nd) L5 — Décision sous pression, éviter le tunnel vision"},
    ],
    en:[
      {id:"q1",q:"A minor alarm has recurred every week for a month and no one worries about it anymore. Which ERM principle applies?\na) L1 — Human factors (alarm bias / normalized drift)\nb) L2 — Team coordination\nc) L4 — Prolonged management\nd) L5 — Decision under pressure"},
      {id:"q2",q:"Three people try to fix the same valve at the same time without coordinating during an emergency. Which ERM principle applies?\na) L1 — Human factors\nb) L2 — Team coordination (clear roles, shared awareness)\nc) L3 — Emergency actions\nd) L5 — Decision under pressure"},
      {id:"q3",q:"An engine fire has just been detected and the team must isolate the fuel and switch to backup immediately. Which ERM principle applies?\na) L1 — Human factors\nb) L2 — Team coordination\nc) L3 — Structured emergency actions\nd) L4 — Prolonged management"},
      {id:"q4",q:"An ambiguous alarm triggers right after recent maintenance, and a fast decision is needed without full certainty on the cause. Which ERM principle applies?\na) L1 — Human factors\nb) L2 — Team coordination\nc) L3 — Emergency actions\nd) L5 — Decision under pressure, avoiding tunnel vision"},
    ],
    es:[
      {id:"q1",q:"Una alarma menor se repite cada semana desde hace un mes y ya nadie se preocupa. ¿Qué principio ERM se aplica?\na) L1 — Factores humanos (sesgo de alarma / deriva normalizada)\nb) L2 — Coordinación de equipo\nc) L4 — Gestión prolongada\nd) L5 — Decisión bajo presión"},
      {id:"q2",q:"Tres personas intentan reparar la misma válvula al mismo tiempo sin coordinarse durante una emergencia. ¿Qué principio ERM se aplica?\na) L1 — Factores humanos\nb) L2 — Coordinación de equipo (roles claros, conciencia compartida)\nc) L3 — Acciones de emergencia\nd) L5 — Decisión bajo presión"},
      {id:"q3",q:"Se acaba de detectar un incendio de motor y el equipo debe aislar el combustible y cambiar al respaldo de inmediato. ¿Qué principio ERM se aplica?\na) L1 — Factores humanos\nb) L2 — Coordinación de equipo\nc) L3 — Acciones de emergencia estructuradas\nd) L4 — Gestión prolongada"},
      {id:"q4",q:"Una alarma ambigua se dispara justo después de un mantenimiento reciente, y hay que decidir rápido sin certeza total sobre la causa. ¿Qué principio ERM se aplica?\na) L1 — Factores humanos\nb) L2 — Coordinación de equipo\nc) L3 — Acciones de emergencia\nd) L5 — Decisión bajo presión, evitar la visión de túnel"},
    ],
    pt:[
      {id:"q1",q:"Um alarme menor repete-se todas as semanas há um mês e já ninguém se preocupa. Que princípio ERM se aplica?\na) L1 — Fatores humanos (viés de alarme / desvio normalizado)\nb) L2 — Coordenação de equipa\nc) L4 — Gestão prolongada\nd) L5 — Decisão sob pressão"},
      {id:"q2",q:"Três pessoas tentam reparar a mesma válvula ao mesmo tempo sem se coordenarem durante uma emergência. Que princípio ERM se aplica?\na) L1 — Fatores humanos\nb) L2 — Coordenação de equipa (funções claras, consciência partilhada)\nc) L3 — Ações de emergência\nd) L5 — Decisão sob pressão"},
      {id:"q3",q:"Acaba de ser detetado um incêndio de motor e a equipa deve isolar o combustível e mudar para a reserva de imediato. Que princípio ERM se aplica?\na) L1 — Fatores humanos\nb) L2 — Coordenação de equipa\nc) L3 — Ações de emergência estruturadas\nd) L4 — Gestão prolongada"},
      {id:"q4",q:"Um alarme ambíguo dispara logo após uma manutenção recente, e é preciso decidir depressa sem certeza total sobre a causa. Que princípio ERM se aplica?\na) L1 — Fatores humanos\nb) L2 — Coordenação de equipa\nc) L3 — Ações de emergência\nd) L5 — Decisão sob pressão, evitar a visão em túnel"},
    ],
  };
  const list = qs[lang]||qs.fr;
  const chk = (id,val) => val.trim().toLowerCase()===correct[id];
  return (
    <div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:14}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.6,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="a, b, c ou d"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q.id,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:18,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q.id,ans[q.id])?C.green:C.red}}>{chk(q.id,ans[q.id])?"✓":`✗ → ${correct[q.id]}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.6,marginBottom:10}}>
        {lang==="fr"?"✅ Q1: a — dérive tolérée = L1 · Q2: b — absence de rôles = L2 · Q3: c = action structurée immédiate · Q4: d — décision rapide sans certitude = L5":
         lang==="en"?"✅ Q1: a — tolerated drift = L1 · Q2: b — absent roles = L2 · Q3: c = immediate structured action · Q4: d — fast decision without certainty = L5":
         "✅ Q1: a · Q2: b · Q3: c · Q4: d"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// BANK — 15 QUESTIONS
// ══════════════════════════════════════
export const BANK = {
  fr:[
    {q:"Quel est le fil conducteur entre les 5 cas étudiés dans ce module ?",opts:["Ils concernent tous le même type de navire","Des navires, équipages et contextes très différents, mais des schémas humains qui se répètent","Ils n'ont aucun point commun","Ils datent tous de la même décennie"],correct:1,expl:"Cargo, ferry, roulier, paquebot, cargo à nouveau : des contextes très différents, mais des schémas humains identiques d'un cas à l'autre."},
    {q:"Quel principe relie le cas Viking Sky à la leçon L1 ?",opts:["La coordination d'équipe","Le facteur humain individuel : alarmes ignorées, dérive normalisée","La décision sous pression","La gestion prolongée sur plusieurs jours"],correct:1,expl:"18 alarmes ignorées en quelques heures illustrent directement l'alarm bias et la normalisation d'une dérive connue, cœur de L1."},
    {q:"Quel principe relie le cas du ferry Kaitaki à la leçon L2 ?",opts:["Le facteur humain individuel","L'absence de coordination d'équipe et de rôles clairs pendant l'urgence","La décision sous pression","Un incendie moteur"],correct:1,expl:"Le 'chaos organisé' décrit par l'ingénieur illustre directement l'absence de structure de rôles, cœur de L2."},
    {q:"Quel principe relie le cas Finlandia Seaways à la leçon L3 ?",opts:["La coordination d'équipe uniquement","L'exécution d'actions d'urgence structurées face à un incendie moteur soudain","La gestion prolongée sur plusieurs jours","La décision sous pression"],correct:1,expl:"La rupture de bielle suivie d'un incendie a exigé une réponse d'urgence immédiate et bien séquencée, cœur de L3."},
    {q:"Quel principe relie le cas Carnival Triumph à la leçon L4 ?",opts:["Le facteur humain individuel uniquement","La gestion prolongée d'une avarie majeure sur plusieurs jours, avec des priorités qui évoluent","La coordination d'équipe uniquement","Une fausse alarme de détecteur"],correct:1,expl:"5 jours sans propulsion illustrent directement que certaines avaries exigent une gestion prolongée, cœur de L4."},
    {q:"Quel principe relie le cas Damgracht/AP Revelin à la leçon L5 ?",opts:["La coordination d'équipe uniquement","La décision sous pression face à un système automatique ayant retiré le contrôle humain sur la base d'une fausse alarme","Le facteur humain individuel uniquement","La gestion prolongée sur plusieurs jours"],correct:1,expl:"L'arrêt automatique en plein chenal illustre la nécessité de décider vite, sans certitude complète, cœur de L5."},
    {q:"Pourquoi les circonstances varient-elles autant entre les 5 cas mais les schémas humains se répètent-ils ?",opts:["C'est une coïncidence sans signification","Parce que les facteurs humains (fatigue, biais, communication, décision) sont universels, indépendamment du type de navire ou de contexte","Parce que tous les navires ont le même équipage","Parce que les enquêtes utilisent toujours le même modèle de rapport"],correct:1,expl:"Les facteurs humains sont universels — c'est précisément pourquoi reconnaître un schéma dans un nouveau contexte reste utile, quel que soit le navire."},
    {q:"Quelle est la compétence finale visée par ce module, au-delà de connaître les 5 cas par cœur ?",opts:["Mémoriser les dates exactes de chaque incident","Reconnaître les schémas communs à ces cas dans une situation nouvelle, avant qu'elle ne devienne un accident","Savoir réparer chaque type d'équipement mentionné","Connaître le nom de tous les organismes d'enquête"],correct:1,expl:"L'objectif n'est pas la mémorisation des cas mais la reconnaissance de schémas transférables à des situations nouvelles."},
    {q:"Qu'est-ce que 'The Professional Safety Mindset' évoqué en conclusion de ce module ?",opts:["Une nouvelle certification obligatoire","Une synthèse d'attitudes : rester vigilant, vérifier avant de supposer, communiquer clairement, écouter l'équipe, apprendre continuellement","Un logiciel de surveillance des alarmes","Un poste hiérarchique spécifique"],correct:1,expl:"C'est une synthèse d'attitudes professionnelles, pas un nouveau concept isolé — la somme de ce que le module a enseigné."},
    {q:"En quoi ce module (ERM) est-il l'équivalent, côté machine, du Bridge Resource Management (BRM) côté pont ?",opts:["Il n'a aucun lien avec le BRM","Les deux concepts appliquent les mêmes principes de facteurs humains et de gestion des ressources d'équipe, chacun dans son propre environnement de travail","Le BRM concerne uniquement la navigation, l'ERM uniquement la mécanique, sans aucun lien conceptuel","Ce sont deux termes différents pour désigner exactement la même chose"],correct:1,expl:"ERM et BRM partagent la même architecture conceptuelle (facteurs humains, coordination, communication, décision) appliquée à deux environnements de travail différents."},
    {q:"Pourquoi est-il utile d'étudier des cas réels plutôt que des scénarios uniquement théoriques ?",opts:["Les cas réels ne sont jamais pertinents","Les cas réels documentés par des enquêtes officielles ancrent les principes ERM dans des conséquences concrètes et vérifiables","La théorie seule est toujours suffisante","Les cas réels sont plus faciles à mémoriser sans raison particulière"],correct:1,expl:"Des cas réels, documentés par des enquêtes officielles, montrent que ces principes ne sont pas abstraits mais ont des conséquences concrètes et vérifiées."},
    {q:"Quel est le lien entre L1 (facteurs humains) et L5 (décision sous pression) ?",opts:["Aucun lien, ce sont des sujets indépendants","L1 explique pourquoi les biais individuels se forment ; L5 montre comment décider malgré ces biais quand la pression est maximale","L5 remplace entièrement L1","L1 concerne uniquement les officiers seniors"],correct:1,expl:"L1 pose les bases des biais humains (fatigue, alarm bias) ; L5 montre comment les contourner activement (tunnel vision, escalade) sous pression."},
    {q:"Que retenir du fait que les 5 cas concernent des types de navires très différents (paquebot, ferry, roulier, cargo) ?",opts:["Que l'ERM ne s'applique qu'à un seul type de navire","Que les principes de l'Engine Room Resource Management sont transférables à tout type de navire et de salle des machines","Que chaque type de navire nécessite une formation complètement différente","Que les principes ERM ne sont valables que pour les paquebots"],correct:1,expl:"La diversité des navires concernés (paquebot, ferry, roulier, cargo) montre que les principes ERM sont universels, pas spécifiques à un type de navire."},
    {q:"Pourquoi ce module ne réexplique-t-il aucun nouveau concept technique dans sa leçon de conclusion (L6) ?",opts:["Parce que le module est incomplet","Parce que la compétence finale est de synthétiser et relier ce qui a déjà été enseigné, pas d'ajouter de nouvelles notions",  "Parce qu'il n'y a plus rien à apprendre sur le sujet","Parce que la leçon 6 est optionnelle"],correct:1,expl:"L6 est une synthèse volontaire : relier les 5 leçons précédentes entre elles est la compétence recherchée, pas l'ajout de contenu nouveau."},
    {q:"Quel est l'objectif final de ce module (s1e) dans le parcours Safety d'un officier machine ?",opts:["Remplacer entièrement la formation technique sur les moteurs","Donner à l'officier machine un cadre de gestion des ressources d'équipe et de facteurs humains, transposable à toute avarie critique qu'il rencontrera","Préparer uniquement à un examen théorique sans application pratique","Concerner uniquement les officiers en début de carrière"],correct:1,expl:"L'objectif est de donner un cadre transférable — facteurs humains, coordination, action, stabilisation, décision — applicable à toute situation critique future, quel que soit le grade."},
  ],
  en:[
    {q:"What is the common thread between the 5 cases studied in this module?",opts:["They all involve the same type of ship","Very different ships, crews, and contexts, but human patterns that repeat","They have nothing in common","They all date from the same decade"],correct:1,expl:"Cargo ship, ferry, ro-ro, liner, cargo ship again: very different contexts, but identical human patterns from one case to the next."},
    {q:"Which principle links the Viking Sky case to lesson L1?",opts:["Team coordination","The individual human factor: ignored alarms, normalized drift","Decision under pressure","Prolonged management over several days"],correct:1,expl:"18 alarms ignored within hours directly illustrate alarm bias and normalization of a known drift, the core of L1."},
    {q:"Which principle links the Kaitaki ferry case to lesson L2?",opts:["The individual human factor","The absence of team coordination and clear roles during the emergency","Decision under pressure","An engine fire"],correct:1,expl:"The 'organised chaos' described by the engineer directly illustrates the absence of a role structure, the core of L2."},
    {q:"Which principle links the Finlandia Seaways case to lesson L3?",opts:["Team coordination only","Executing structured emergency actions facing a sudden engine fire","Prolonged management over several days","Decision under pressure"],correct:1,expl:"The connecting rod failure followed by a fire required an immediate, well-sequenced emergency response, the core of L3."},
    {q:"Which principle links the Carnival Triumph case to lesson L4?",opts:["The individual human factor only","Prolonged management of a major casualty over several days, with shifting priorities","Team coordination only","A false detector alarm"],correct:1,expl:"5 days without propulsion directly illustrate that some casualties require prolonged management, the core of L4."},
    {q:"Which principle links the Damgracht/AP Revelin case to lesson L5?",opts:["Team coordination only","Decision under pressure facing an automatic system that removed human control based on a false alarm","The individual human factor only","Prolonged management over several days"],correct:1,expl:"The automatic shutdown in the middle of the channel illustrates the need to decide fast, without full certainty, the core of L5."},
    {q:"Why do circumstances vary so much between the 5 cases, yet the human patterns repeat?",opts:["It's a meaningless coincidence","Because human factors (fatigue, bias, communication, decision) are universal, regardless of ship type or context","Because all ships have the same crew","Because investigations always use the same report template"],correct:1,expl:"Human factors are universal — this is precisely why recognizing a pattern in a new context remains useful, regardless of the ship."},
    {q:"What is the final competency targeted by this module, beyond knowing the 5 cases by heart?",opts:["Memorizing the exact dates of each incident","Recognizing the patterns common to these cases in a new situation, before it becomes an accident","Knowing how to repair each type of equipment mentioned","Knowing the name of every investigation body"],correct:1,expl:"The goal is not memorizing cases but recognizing transferable patterns in new situations."},
    {q:"What is 'The Professional Safety Mindset' mentioned in this module's conclusion?",opts:["A new mandatory certification","A synthesis of attitudes: staying alert, verifying before assuming, communicating clearly, listening to the team, continuously learning","Alarm monitoring software","A specific hierarchical position"],correct:1,expl:"It is a synthesis of professional attitudes, not a new isolated concept — the sum of what the module has taught."},
    {q:"How is this module (ERM) the engine-side equivalent of Bridge Resource Management (BRM)?",opts:["It has no link to BRM","Both concepts apply the same human factors and team-resource-management principles, each in its own work environment","BRM only concerns navigation, ERM only mechanics, with no conceptual link","They are two different terms for exactly the same thing"],correct:1,expl:"ERM and BRM share the same conceptual architecture (human factors, coordination, communication, decision) applied to two different work environments."},
    {q:"Why is it useful to study real cases rather than purely theoretical scenarios?",opts:["Real cases are never relevant","Real cases documented by official investigations anchor ERM principles in concrete, verifiable consequences","Theory alone is always sufficient","Real cases are easier to memorize for no particular reason"],correct:1,expl:"Real cases, documented by official investigations, show that these principles are not abstract but have concrete, verified consequences."},
    {q:"What is the link between L1 (human factors) and L5 (decision under pressure)?",opts:["No link, they are independent topics","L1 explains why individual biases form; L5 shows how to decide despite these biases when pressure is highest","L5 fully replaces L1","L1 only concerns senior officers"],correct:1,expl:"L1 lays the groundwork for human biases (fatigue, alarm bias); L5 shows how to actively counter them (tunnel vision, escalation) under pressure."},
    {q:"What should be retained from the fact that the 5 cases involve very different ship types (liner, ferry, ro-ro, cargo)?",opts:["That ERM only applies to one ship type","That Engine Room Resource Management principles are transferable to any ship type and engine room","That each ship type needs completely different training","That ERM principles are only valid for liners"],correct:1,expl:"The diversity of ships involved (liner, ferry, ro-ro, cargo) shows that ERM principles are universal, not specific to one ship type."},
    {q:"Why does this module not re-explain any new technical concept in its conclusion lesson (L6)?",opts:["Because the module is incomplete","Because the final competency is synthesizing and connecting what has already been taught, not adding new notions","Because there is nothing left to learn on the topic","Because lesson 6 is optional"],correct:1,expl:"L6 is a deliberate synthesis: connecting the 5 previous lessons is the targeted competency, not adding new content."},
    {q:"What is the final goal of this module (s1e) in an engine officer's Safety curriculum?",opts:["Fully replacing technical training on engines","Giving the engine officer a team-resource-management and human-factors framework, transferable to any critical casualty they encounter","Preparing only for a theoretical exam with no practical application","Only concerning officers early in their career"],correct:1,expl:"The goal is to give a transferable framework — human factors, coordination, action, stabilization, decision — applicable to any future critical situation, regardless of rank."},
  ],
  es:[
    {q:"¿Cuál es el hilo conductor entre los 5 casos estudiados en este módulo?",opts:["Todos implican el mismo tipo de buque","Buques, tripulaciones y contextos muy distintos, pero patrones humanos que se repiten","No tienen nada en común","Todos datan de la misma década"],correct:1,expl:"Carguero, ferry, ro-ro, transatlántico, carguero de nuevo: contextos muy distintos, pero patrones humanos idénticos de un caso a otro."},
    {q:"¿Qué principio conecta el caso Viking Sky con la lección L1?",opts:["La coordinación de equipo","El factor humano individual: alarmas ignoradas, deriva normalizada","La decisión bajo presión","La gestión prolongada durante varios días"],correct:1,expl:"18 alarmas ignoradas en pocas horas ilustran directamente el sesgo de alarma y la normalización de una deriva conocida, núcleo de L1."},
    {q:"¿Qué principio conecta el caso del ferry Kaitaki con la lección L2?",opts:["El factor humano individual","La ausencia de coordinación de equipo y roles claros durante la emergencia","La decisión bajo presión","Un incendio de motor"],correct:1,expl:"El 'caos organizado' descrito por el ingeniero ilustra directamente la ausencia de una estructura de roles, núcleo de L2."},
    {q:"¿Qué principio conecta el caso Finlandia Seaways con la lección L3?",opts:["Solo la coordinación de equipo","La ejecución de acciones de emergencia estructuradas ante un incendio de motor repentino","La gestión prolongada durante varios días","La decisión bajo presión"],correct:1,expl:"La rotura de biela seguida de un incendio exigió una respuesta de emergencia inmediata y bien secuenciada, núcleo de L3."},
    {q:"¿Qué principio conecta el caso Carnival Triumph con la lección L4?",opts:["Solo el factor humano individual","La gestión prolongada de una avería mayor durante varios días, con prioridades cambiantes","Solo la coordinación de equipo","Una falsa alarma del detector"],correct:1,expl:"5 días sin propulsión ilustran directamente que algunas averías exigen una gestión prolongada, núcleo de L4."},
    {q:"¿Qué principio conecta el caso Damgracht/AP Revelin con la lección L5?",opts:["Solo la coordinación de equipo","La decisión bajo presión ante un sistema automático que retiró el control humano basándose en una falsa alarma","Solo el factor humano individual","La gestión prolongada durante varios días"],correct:1,expl:"La parada automática en pleno canal ilustra la necesidad de decidir rápido, sin certeza total, núcleo de L5."},
    {q:"¿Por qué las circunstancias varían tanto entre los 5 casos, pero los patrones humanos se repiten?",opts:["Es una coincidencia sin significado","Porque los factores humanos (fatiga, sesgo, comunicación, decisión) son universales, independientemente del tipo de buque o contexto","Porque todos los buques tienen la misma tripulación","Porque las investigaciones siempre usan el mismo modelo de informe"],correct:1,expl:"Los factores humanos son universales — precisamente por eso reconocer un patrón en un contexto nuevo sigue siendo útil, sea cual sea el buque."},
    {q:"¿Cuál es la competencia final buscada por este módulo, más allá de conocer los 5 casos de memoria?",opts:["Memorizar las fechas exactas de cada incidente","Reconocer los patrones comunes a estos casos en una situación nueva, antes de que se convierta en un accidente","Saber reparar cada tipo de equipo mencionado","Conocer el nombre de todos los organismos de investigación"],correct:1,expl:"El objetivo no es memorizar casos sino reconocer patrones transferibles a situaciones nuevas."},
    {q:"¿Qué es 'The Professional Safety Mindset' mencionado en la conclusión de este módulo?",opts:["Una nueva certificación obligatoria","Una síntesis de actitudes: mantenerse alerta, verificar antes de suponer, comunicar con claridad, escuchar al equipo, aprender continuamente","Un software de monitoreo de alarmas","Un puesto jerárquico específico"],correct:1,expl:"Es una síntesis de actitudes profesionales, no un nuevo concepto aislado — la suma de lo que el módulo ha enseñado."},
    {q:"¿En qué sentido este módulo (ERM) es el equivalente, del lado de máquinas, del Bridge Resource Management (BRM) del lado de puente?",opts:["No tiene ninguna relación con el BRM","Ambos conceptos aplican los mismos principios de factores humanos y gestión de recursos de equipo, cada uno en su propio entorno de trabajo","El BRM solo concierne a la navegación, el ERM solo a la mecánica, sin ningún vínculo conceptual","Son dos términos diferentes para designar exactamente lo mismo"],correct:1,expl:"ERM y BRM comparten la misma arquitectura conceptual (factores humanos, coordinación, comunicación, decisión) aplicada a dos entornos de trabajo distintos."},
    {q:"¿Por qué es útil estudiar casos reales en lugar de escenarios puramente teóricos?",opts:["Los casos reales nunca son relevantes","Los casos reales documentados por investigaciones oficiales anclan los principios ERM en consecuencias concretas y verificables","La teoría sola siempre es suficiente","Los casos reales son más fáciles de memorizar sin razón particular"],correct:1,expl:"Los casos reales, documentados por investigaciones oficiales, muestran que estos principios no son abstractos sino que tienen consecuencias concretas y verificadas."},
    {q:"¿Cuál es el vínculo entre L1 (factores humanos) y L5 (decisión bajo presión)?",opts:["Ningún vínculo, son temas independientes","L1 explica por qué se forman los sesgos individuales; L5 muestra cómo decidir pese a esos sesgos cuando la presión es máxima","L5 sustituye completamente a L1","L1 solo concierne a los oficiales sénior"],correct:1,expl:"L1 sienta las bases de los sesgos humanos (fatiga, sesgo de alarma); L5 muestra cómo contrarrestarlos activamente (visión de túnel, escalado) bajo presión."},
    {q:"¿Qué hay que retener del hecho de que los 5 casos involucren tipos de buques muy distintos (transatlántico, ferry, ro-ro, carguero)?",opts:["Que el ERM solo se aplica a un tipo de buque","Que los principios de Engine Room Resource Management son transferibles a cualquier tipo de buque y sala de máquinas","Que cada tipo de buque necesita una formación completamente distinta","Que los principios ERM solo son válidos para transatlánticos"],correct:1,expl:"La diversidad de buques involucrados (transatlántico, ferry, ro-ro, carguero) muestra que los principios ERM son universales, no específicos de un tipo de buque."},
    {q:"¿Por qué este módulo no reexplica ningún concepto técnico nuevo en su lección de conclusión (L6)?",opts:["Porque el módulo está incompleto","Porque la competencia final es sintetizar y conectar lo ya enseñado, no añadir nociones nuevas","Porque ya no hay nada más que aprender sobre el tema","Porque la lección 6 es opcional"],correct:1,expl:"L6 es una síntesis deliberada: conectar las 5 lecciones anteriores es la competencia buscada, no añadir contenido nuevo."},
    {q:"¿Cuál es el objetivo final de este módulo (s1e) en el currículo de Seguridad de un oficial de máquinas?",opts:["Sustituir completamente la formación técnica sobre motores","Dar al oficial de máquinas un marco de gestión de recursos de equipo y factores humanos, transferible a cualquier avería crítica que encuentre","Preparar solo para un examen teórico sin aplicación práctica","Concernir solo a oficiales al inicio de su carrera"],correct:1,expl:"El objetivo es dar un marco transferible — factores humanos, coordinación, acción, estabilización, decisión — aplicable a cualquier situación crítica futura, sea cual sea el rango."},
  ],
  pt:[
    {q:"Qual é o fio condutor entre os 5 casos estudados neste módulo?",opts:["Envolvem todos o mesmo tipo de navio","Navios, tripulações e contextos muito diferentes, mas padrões humanos que se repetem","Não têm nada em comum","Datam todos da mesma década"],correct:1,expl:"Cargueiro, ferry, ro-ro, transatlântico, cargueiro de novo: contextos muito diferentes, mas padrões humanos idênticos de um caso para outro."},
    {q:"Que princípio liga o caso Viking Sky à lição L1?",opts:["A coordenação de equipa","O fator humano individual: alarmes ignorados, desvio normalizado","A decisão sob pressão","A gestão prolongada ao longo de vários dias"],correct:1,expl:"18 alarmes ignorados em poucas horas ilustram diretamente o viés de alarme e a normalização de um desvio conhecido, núcleo de L1."},
    {q:"Que princípio liga o caso do ferry Kaitaki à lição L2?",opts:["O fator humano individual","A ausência de coordenação de equipa e de funções claras durante a emergência","A decisão sob pressão","Um incêndio de motor"],correct:1,expl:"O 'caos organizado' descrito pelo maquinista ilustra diretamente a ausência de uma estrutura de funções, núcleo de L2."},
    {q:"Que princípio liga o caso Finlandia Seaways à lição L3?",opts:["Só a coordenação de equipa","A execução de ações de emergência estruturadas perante um incêndio de motor súbito","A gestão prolongada ao longo de vários dias","A decisão sob pressão"],correct:1,expl:"A rutura de biela seguida de um incêndio exigiu uma resposta de emergência imediata e bem sequenciada, núcleo de L3."},
    {q:"Que princípio liga o caso Carnival Triumph à lição L4?",opts:["Só o fator humano individual","A gestão prolongada de uma avaria maior ao longo de vários dias, com prioridades que evoluem","Só a coordenação de equipa","Um falso alarme do detetor"],correct:1,expl:"5 dias sem propulsão ilustram diretamente que algumas avarias exigem uma gestão prolongada, núcleo de L4."},
    {q:"Que princípio liga o caso Damgracht/AP Revelin à lição L5?",opts:["Só a coordenação de equipa","A decisão sob pressão perante um sistema automático que retirou o controlo humano com base num falso alarme","Só o fator humano individual","A gestão prolongada ao longo de vários dias"],correct:1,expl:"A paragem automática a meio do canal ilustra a necessidade de decidir depressa, sem certeza total, núcleo de L5."},
    {q:"Por que variam tanto as circunstâncias entre os 5 casos, mas os padrões humanos se repetem?",opts:["É uma coincidência sem significado","Porque os fatores humanos (fadiga, viés, comunicação, decisão) são universais, independentemente do tipo de navio ou contexto","Porque todos os navios têm a mesma tripulação","Porque as investigações usam sempre o mesmo modelo de relatório"],correct:1,expl:"Os fatores humanos são universais — é precisamente por isso que reconhecer um padrão num contexto novo continua a ser útil, seja qual for o navio."},
    {q:"Qual é a competência final visada por este módulo, para além de conhecer os 5 casos de cor?",opts:["Memorizar as datas exatas de cada incidente","Reconhecer os padrões comuns a estes casos numa situação nova, antes de se tornar num acidente","Saber reparar cada tipo de equipamento mencionado","Conhecer o nome de todos os organismos de investigação"],correct:1,expl:"O objetivo não é memorizar casos mas reconhecer padrões transferíveis para situações novas."},
    {q:"O que é 'The Professional Safety Mindset' mencionado na conclusão deste módulo?",opts:["Uma nova certificação obrigatória","Uma síntese de atitudes: manter-se vigilante, verificar antes de supor, comunicar claramente, ouvir a equipa, aprender continuamente","Um software de monitorização de alarmes","Um cargo hierárquico específico"],correct:1,expl:"É uma síntese de atitudes profissionais, não um novo conceito isolado — a soma do que o módulo ensinou."},
    {q:"Em que sentido este módulo (ERM) é o equivalente, do lado das máquinas, do Bridge Resource Management (BRM) do lado da ponte?",opts:["Não tem qualquer relação com o BRM","Ambos os conceitos aplicam os mesmos princípios de fatores humanos e gestão de recursos de equipa, cada um no seu próprio ambiente de trabalho","O BRM só diz respeito à navegação, o ERM só à mecânica, sem qualquer ligação concetual","São dois termos diferentes para designar exatamente a mesma coisa"],correct:1,expl:"ERM e BRM partilham a mesma arquitetura concetual (fatores humanos, coordenação, comunicação, decisão) aplicada a dois ambientes de trabalho diferentes."},
    {q:"Por que é útil estudar casos reais em vez de cenários puramente teóricos?",opts:["Os casos reais nunca são relevantes","Os casos reais documentados por investigações oficiais ancoram os princípios ERM em consequências concretas e verificáveis","A teoria sozinha é sempre suficiente","Os casos reais são mais fáceis de memorizar sem razão particular"],correct:1,expl:"Os casos reais, documentados por investigações oficiais, mostram que estes princípios não são abstratos mas têm consequências concretas e verificadas."},
    {q:"Qual é a ligação entre L1 (fatores humanos) e L5 (decisão sob pressão)?",opts:["Nenhuma ligação, são temas independentes","L1 explica por que se formam os vieses individuais; L5 mostra como decidir apesar desses vieses quando a pressão é máxima","L5 substitui completamente L1","L1 só diz respeito a oficiais seniores"],correct:1,expl:"L1 estabelece as bases dos vieses humanos (fadiga, viés de alarme); L5 mostra como contorná-los ativamente (visão em túnel, escalonamento) sob pressão."},
    {q:"O que reter do facto de os 5 casos envolverem tipos de navios muito diferentes (transatlântico, ferry, ro-ro, cargueiro)?",opts:["Que o ERM só se aplica a um tipo de navio","Que os princípios de Engine Room Resource Management são transferíveis para qualquer tipo de navio e casa das máquinas","Que cada tipo de navio precisa de uma formação completamente diferente","Que os princípios ERM só são válidos para transatlânticos"],correct:1,expl:"A diversidade de navios envolvidos (transatlântico, ferry, ro-ro, cargueiro) mostra que os princípios ERM são universais, não específicos de um tipo de navio."},
    {q:"Por que este módulo não reexplica nenhum conceito técnico novo na sua lição de conclusão (L6)?",opts:["Porque o módulo está incompleto","Porque a competência final é sintetizar e ligar o que já foi ensinado, não acrescentar novas noções","Porque já não há mais nada para aprender sobre o tema","Porque a lição 6 é opcional"],correct:1,expl:"A L6 é uma síntese deliberada: ligar as 5 lições anteriores é a competência visada, não acrescentar conteúdo novo."},
    {q:"Qual é o objetivo final deste módulo (s1e) no currículo de Segurança de um oficial de máquinas?",opts:["Substituir completamente a formação técnica sobre motores","Dar ao oficial de máquinas um enquadramento de gestão de recursos de equipa e fatores humanos, transferível para qualquer avaria crítica que encontre","Preparar apenas para um exame teórico sem aplicação prática","Dizer respeito apenas a oficiais no início de carreira"],correct:1,expl:"O objetivo é dar um enquadramento transferível — fatores humanos, coordenação, ação, estabilização, decisão — aplicável a qualquer situação crítica futura, seja qual for o posto."},
  ],
};

// ══════════════════════════════════════
// QUIZ — FINAL (5 QUESTIONS)
// ══════════════════════════════════════
export const QUIZ = {
  fr:[
    {q:"Quel est le fil conducteur entre les 5 cas étudiés dans ce module ?",opts:["Ils concernent tous le même type de navire","Des navires très différents, mais des schémas humains qui se répètent","Ils n'ont aucun point commun","Ils datent tous de la même décennie"],correct:1,expl:"Des contextes très différents, mais des schémas humains identiques d'un cas à l'autre."},
    {q:"Quel principe relie le cas Viking Sky à la leçon L1 ?",opts:["La coordination d'équipe","Le facteur humain individuel : alarmes ignorées, dérive normalisée","La décision sous pression","La gestion prolongée"],correct:1,expl:"18 alarmes ignorées illustrent directement l'alarm bias, cœur de L1."},
    {q:"Quel principe relie le cas du ferry Kaitaki à la leçon L2 ?",opts:["Le facteur humain individuel","L'absence de coordination d'équipe pendant l'urgence","La décision sous pression","Un incendie moteur"],correct:1,expl:"Le 'chaos organisé' illustre l'absence de structure de rôles, cœur de L2."},
    {q:"Que représente 'The Professional Safety Mindset' évoqué en conclusion ?",opts:["Une nouvelle certification","Une synthèse d'attitudes : vigilance, vérification, communication, écoute, apprentissage continu","Un logiciel de surveillance","Un poste hiérarchique"],correct:1,expl:"C'est une synthèse d'attitudes professionnelles, la somme de ce que le module a enseigné."},
    {q:"Quelle est la compétence finale visée par ce module ?",opts:["Mémoriser les 5 cas par cœur","Reconnaître les schémas communs à ces cas dans une situation nouvelle","Savoir réparer chaque équipement mentionné","Connaître les organismes d'enquête"],correct:1,expl:"L'objectif est la reconnaissance de schémas transférables, pas la mémorisation."},
  ],
  en:[
    {q:"What is the common thread between the 5 cases studied in this module?",opts:["They all involve the same ship type","Very different ships, but human patterns that repeat","They have nothing in common","They all date from the same decade"],correct:1,expl:"Very different contexts, but identical human patterns from one case to the next."},
    {q:"Which principle links the Viking Sky case to lesson L1?",opts:["Team coordination","The individual human factor: ignored alarms, normalized drift","Decision under pressure","Prolonged management"],correct:1,expl:"18 ignored alarms directly illustrate alarm bias, the core of L1."},
    {q:"Which principle links the Kaitaki ferry case to lesson L2?",opts:["The individual human factor","The absence of team coordination during the emergency","Decision under pressure","An engine fire"],correct:1,expl:"'Organised chaos' illustrates the absence of a role structure, the core of L2."},
    {q:"What does 'The Professional Safety Mindset' mentioned in the conclusion represent?",opts:["A new certification","A synthesis of attitudes: vigilance, verification, communication, listening, continuous learning","Monitoring software","A hierarchical position"],correct:1,expl:"It is a synthesis of professional attitudes, the sum of what the module has taught."},
    {q:"What is the final competency targeted by this module?",opts:["Memorizing the 5 cases by heart","Recognizing the patterns common to these cases in a new situation","Knowing how to repair each mentioned equipment","Knowing the investigation bodies"],correct:1,expl:"The goal is recognizing transferable patterns, not memorization."},
  ],
  es:[
    {q:"¿Cuál es el hilo conductor entre los 5 casos estudiados en este módulo?",opts:["Todos implican el mismo tipo de buque","Buques muy distintos, pero patrones humanos que se repiten","No tienen nada en común","Todos datan de la misma década"],correct:1,expl:"Contextos muy distintos, pero patrones humanos idénticos de un caso a otro."},
    {q:"¿Qué principio conecta el caso Viking Sky con la lección L1?",opts:["La coordinación de equipo","El factor humano individual: alarmas ignoradas, deriva normalizada","La decisión bajo presión","La gestión prolongada"],correct:1,expl:"18 alarmas ignoradas ilustran directamente el sesgo de alarma, núcleo de L1."},
    {q:"¿Qué principio conecta el caso del ferry Kaitaki con la lección L2?",opts:["El factor humano individual","La ausencia de coordinación de equipo durante la emergencia","La decisión bajo presión","Un incendio de motor"],correct:1,expl:"El 'caos organizado' ilustra la ausencia de una estructura de roles, núcleo de L2."},
    {q:"¿Qué representa 'The Professional Safety Mindset' mencionado en la conclusión?",opts:["Una nueva certificación","Una síntesis de actitudes: vigilancia, verificación, comunicación, escucha, aprendizaje continuo","Un software de monitoreo","Un puesto jerárquico"],correct:1,expl:"Es una síntesis de actitudes profesionales, la suma de lo que el módulo ha enseñado."},
    {q:"¿Cuál es la competencia final buscada por este módulo?",opts:["Memorizar los 5 casos de memoria","Reconocer los patrones comunes a estos casos en una situación nueva","Saber reparar cada equipo mencionado","Conocer los organismos de investigación"],correct:1,expl:"El objetivo es reconocer patrones transferibles, no memorizar."},
  ],
  pt:[
    {q:"Qual é o fio condutor entre os 5 casos estudados neste módulo?",opts:["Envolvem todos o mesmo tipo de navio","Navios muito diferentes, mas padrões humanos que se repetem","Não têm nada em comum","Datam todos da mesma década"],correct:1,expl:"Contextos muito diferentes, mas padrões humanos idênticos de um caso para outro."},
    {q:"Que princípio liga o caso Viking Sky à lição L1?",opts:["A coordenação de equipa","O fator humano individual: alarmes ignorados, desvio normalizado","A decisão sob pressão","A gestão prolongada"],correct:1,expl:"18 alarmes ignorados ilustram diretamente o viés de alarme, núcleo de L1."},
    {q:"Que princípio liga o caso do ferry Kaitaki à lição L2?",opts:["O fator humano individual","A ausência de coordenação de equipa durante a emergência","A decisão sob pressão","Um incêndio de motor"],correct:1,expl:"O 'caos organizado' ilustra a ausência de uma estrutura de funções, núcleo de L2."},
    {q:"O que representa 'The Professional Safety Mindset' mencionado na conclusão?",opts:["Uma nova certificação","Uma síntese de atitudes: vigilância, verificação, comunicação, escuta, aprendizagem contínua","Um software de monitorização","Um cargo hierárquico"],correct:1,expl:"É uma síntese de atitudes profissionais, a soma do que o módulo ensinou."},
    {q:"Qual é a competência final visada por este módulo?",opts:["Memorizar os 5 casos de cor","Reconhecer os padrões comuns a estes casos numa situação nova","Saber reparar cada equipamento mencionado","Conhecer os organismos de investigação"],correct:1,expl:"O objetivo é reconhecer padrões transferíveis, não memorizar."},
  ],
};

// ══════════════════════════════════════
// SAFETY REFLECTION (permanent Safety Dept feature)
// ══════════════════════════════════════
function SafetyReflection({ lang }) {
  const q = {
    fr:"Parmi les 5 principes ERM de ce module (facteurs humains, coordination, action d'urgence, stabilisation, décision sous pression), lequel te semble le plus fragile dans ta propre pratique actuelle, et pourquoi ?",
    en:"Among the 5 ERM principles of this module (human factors, coordination, emergency action, stabilization, decision under pressure), which one feels weakest in your own current practice, and why?",
    es:"De los 5 principios ERM de este módulo (factores humanos, coordinación, acción de emergencia, estabilización, decisión bajo presión), ¿cuál te parece más frágil en tu propia práctica actual, y por qué?",
    pt:"Entre os 5 princípios ERM deste módulo (fatores humanos, coordenação, ação de emergência, estabilização, decisão sob pressão), qual te parece mais frágil na tua própria prática atual, e porquê?",
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
      badge:"⚙️ Safety · Engine Room Resource Management · Leçon 6/6 · ⭐ Premium · 🏁 FIN DU MODULE",
      title:"Retours d'Expérience des Avaries Machine Majeures",
      intro:"Cette leçon n'introduit aucun nouveau concept de sécurité. Elle ne raconte aucune nouvelle tragédie.\n\nElle rassemble les cinq cas déjà étudiés — Viking Sky, ferry Kaitaki, Finlandia Seaways, Carnival Triumph, Damgracht/AP Revelin — pour révéler ce qu'ils partagent malgré des navires, des époques et des océans différents.\n\nLes noms changent. Les causes profondes se répètent.",
      p0:"POURQUOI ÉTUDIER LES LEÇONS DU PASSÉ",s0t:"Reconnaître un schéma avant qu'il ne se répète",
      s0:"La compétence finale de ce module n'est pas de connaître cinq histoires par cœur — c'est de reconnaître leurs schémas communs dans une situation nouvelle, avant qu'elle ne devienne une avarie.\n\nCOMMENT PRÉVENIR L'AVARIE ? En reconnaissant tôt un schéma déjà rencontré.\nQUE FAIRE FACE À UNE SITUATION INCONNUE ? Se demander à quel cas connu elle ressemble et quel principe s'applique.\nQUELLE LEÇON RETENIR ? Les circonstances varient à l'infini ; les comportements humains qui mènent à une avarie, beaucoup moins.",
      p1:"LE FIL CONDUCTEUR DES 5 CAS DU MODULE",s1t:"Des navires très différents, des schémas qui se répètent",
      s1:"Paquebot, ferry, roulier, paquebot de croisière, cargo : cinq types de navires, cinq contextes différents. Et pourtant, en les superposant, les mêmes schémas humains reviennent : facteur individuel, coordination d'équipe, action tardive, hypothèse non vérifiée, pression du temps.",
      p2:"RETOUR SUR LE FACTEUR HUMAIN INDIVIDUEL",s2t:"Le lien avec L1",
      s2:"L'alarm bias du Viking Sky et le tunnel vision du cas Damgracht partagent la même racine : la confiance excessive dans une seule source d'information, sans vérification croisée ni remise en question.",
      p3:"RETOUR SUR LA COORDINATION D'ÉQUIPE",s3t:"Le lien avec L2",
      s3:"Le ferry Kaitaki a montré qu'une équipe entière peut perdre la conscience partagée de la situation. La leçon reste la même quel que soit le type d'avarie : sans rôles clairs, la coordination s'effondre au pire moment.",
      p4:"RETOUR SUR L'ACTION ET LA STABILISATION",s4t:"Le lien avec L3 et L4",
      s4:"De Finlandia Seaways (réponse d'urgence immédiate face à un incendie moteur) à Carnival Triumph (gestion prolongée sur 5 jours), la nature de l'action évolue avec le temps — mais la nécessité d'une structure claire, elle, ne change jamais.",
      p5:"CE QUI A CHANGÉ APRÈS CES AVARIES",s5t:"L'évolution de la culture sécurité",
      s5:"Sans entrer dans l'angle juridique, ces avaries ont, du point de vue sécurité, renforcé les pratiques de vérification physique, de communication structurée et de gestion de crise prolongée — la substance même de ce module.",
      p6:"CONSTRUIRE SON PROPRE RÉFLEXE SÉCURITÉ",s6t:"S'auto-évaluer honnêtement",
      s6:"Reconnaître ces schémas chez les autres est utile. Les reconnaître dans sa propre pratique est ce qui fait un mécanicien réellement prêt à prévenir l'avarie plutôt qu'à la regretter après coup.",
      p7:"THE PROFESSIONAL SAFETY MINDSET",s7t:"Ce que doit être l'état d'esprit d'un mécanicien professionnel",
      s7:"Rester vigilant même lorsque tout semble normal. Toujours vérifier avant de supposer. Communiquer clairement. Écouter les autres membres de l'équipe. Apprendre continuellement des avaries passées — les siennes et celles des autres.\n\nCe n'est pas une nouvelle notion. C'est la synthèse de tout ce que ce module a enseigné.",
      p8:"🎯 EXERCICE DE RECONNAISSANCE DE SCHÉMAS",p9:"📝 BANQUE DE 15 QUESTIONS",p10:"🪞 RÉFLEXION SÉCURITÉ",
      sumT:"RÉSUMÉ — LEÇON 6 · FIN DU MODULE",
      sumP:["Les noms des navires changent, les causes profondes se répètent","Facteur humain, coordination, action tardive, hypothèse non vérifiée, pression temporelle","La fenêtre de décision utile est presque toujours plus courte qu'on ne le pense","Reconnaître un schéma tôt permet de prévenir l'avarie avant qu'elle ne se produise","The Professional Safety Mindset : vigilance, vérification, communication, écoute, apprentissage continu"],
      learnedP:["Le fil conducteur entre les 5 cas du module","Facteur humain individuel et coordination d'équipe, revisités","L'action d'urgence et la stabilisation, du plus court au plus long terme","L'évolution de la culture sécurité après ces avaries","The Professional Safety Mindset"],
      safetyMsg:"Chaque avarie enseigne la même leçon d'une manière différente : reste vigilant, communique clairement, vérifie tes suppositions, et n'arrête jamais d'apprendre. Les mécaniciens les plus sûrs sont ceux qui apprennent des erreurs des autres avant de commettre les leurs.",
      moduleComplete:{
        title:"ENGINE ROOM RESOURCE MANAGEMENT — MODULE TERMINÉ !",
        subtitle:"Facteurs humains, coordination, action, stabilisation, décision — 6 leçons maîtrisées ⚙️",
        message:"Félicitations ! Tu as terminé le module Engine Room Resource Management. Tu as appris non seulement pourquoi les avaries machine arrivent, mais comment les prévenir, y réagir, les stabiliser, et décider juste sous pression. Continue ton parcours Safety. Chaque leçon apprise aujourd'hui pourrait protéger l'équipage demain.",
      },
    },
    en:{
      badge:"⚙️ Safety · Engine Room Resource Management · Lesson 6/6 · ⭐ Premium · 🏁 MODULE COMPLETE",
      title:"Lessons Learned from Major Machinery Casualties",
      intro:"This lesson introduces no new safety concept. It tells no new tragedy.\n\nIt brings together the five cases already studied — Viking Sky, ferry Kaitaki, Finlandia Seaways, Carnival Triumph, Damgracht/AP Revelin — to reveal what they share despite different ships, eras, and oceans.\n\nThe names change. The underlying causes repeat.",
      p0:"WHY STUDY THE LESSONS OF THE PAST",s0t:"Recognizing a pattern before it repeats",
      s0:"The final skill of this module is not to know five stories by heart — it is to recognize their common patterns in a new situation, before it becomes a casualty.\n\nHOW TO PREVENT THE CASUALTY? By recognizing an already-encountered pattern early.\nWHAT TO DO FACING AN UNFAMILIAR SITUATION? Ask which known case it resembles and which principle applies.\nWHAT LESSON TO RETAIN? Circumstances vary infinitely; the human behaviors that lead to a casualty, much less so.",
      p1:"THE COMMON THREAD OF THE MODULE'S 5 CASES",s1t:"Very different ships, repeating patterns",
      s1:"Cruise ship, ferry, ro-ro vessel, cruise liner, cargo ship: five ship types, five different contexts. Yet overlaying them, the same human patterns recur: individual factor, team coordination, late action, unverified assumption, time pressure.",
      p2:"REVISITING THE INDIVIDUAL HUMAN FACTOR",s2t:"The link to L1",
      s2:"Viking Sky's alarm bias and the Damgracht case's tunnel vision share the same root: excessive trust in a single source of information, without cross-checking or questioning it.",
      p3:"REVISITING TEAM COORDINATION",s3t:"The link to L2",
      s3:"The Kaitaki ferry showed that an entire team can lose shared situational awareness. The lesson stays the same regardless of the type of casualty: without clear roles, coordination collapses at the worst moment.",
      p4:"REVISITING ACTION AND STABILIZATION",s4t:"The link to L3 and L4",
      s4:"From Finlandia Seaways (immediate emergency response to an engine fire) to Carnival Triumph (prolonged management over 5 days), the nature of the action evolves over time — but the need for a clear structure never changes.",
      p5:"WHAT CHANGED AFTER THESE CASUALTIES",s5t:"The evolution of safety culture",
      s5:"Without entering the legal angle, these casualties, from a safety perspective, strengthened physical verification practices, structured communication, and prolonged crisis management — the very substance of this module.",
      p6:"BUILDING YOUR OWN SAFETY REFLEX",s6t:"Honest self-assessment",
      s6:"Recognizing these patterns in others is useful. Recognizing them in your own practice is what makes an engineer genuinely ready to prevent a casualty rather than regret it afterward.",
      p7:"THE PROFESSIONAL SAFETY MINDSET",s7t:"What a professional engineer's mindset should be",
      s7:"Stay alert even when everything seems normal. Always verify before assuming. Communicate clearly. Listen to other team members. Continuously learn from past casualties — your own and others'.\n\nThis is not a new concept. It is the synthesis of everything this module has taught.",
      p8:"🎯 PATTERN-RECOGNITION EXERCISE",p9:"📝 15-QUESTION BANK",p10:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY — LESSON 6 · MODULE COMPLETE",
      sumP:["The names of the ships change, the underlying causes repeat","Human factor, coordination, late action, unverified assumption, time pressure","The useful decision window is almost always shorter than we think","Recognizing a pattern early prevents the casualty before it happens","The Professional Safety Mindset: vigilance, verification, communication, listening, continuous learning"],
      learnedP:["The common thread between the module's 5 cases","The individual human factor and team coordination, revisited","Emergency action and stabilization, from the shortest to the longest term","The evolution of safety culture after these casualties","The Professional Safety Mindset"],
      safetyMsg:"Every casualty teaches the same lesson in a different way: stay alert, communicate clearly, verify your assumptions, and never stop learning. The safest engineers are those who learn from others' mistakes before making their own.",
      moduleComplete:{
        title:"ENGINE ROOM RESOURCE MANAGEMENT — MODULE COMPLETE!",
        subtitle:"Human factors, coordination, action, stabilization, decision — 6 lessons mastered ⚙️",
        message:"Congratulations! You have completed the Engine Room Resource Management module. You have learned not only why machinery casualties happen, but how to prevent them, respond to them, stabilize them, and decide well under pressure. Continue your Safety journey. Every lesson learned today could protect the crew tomorrow.",
      },
    },
    es:{
      badge:"⚙️ Seguridad · Engine Room Resource Management · Lección 6/6 · ⭐ Premium · 🏁 MÓDULO COMPLETADO",
      title:"Lecciones Aprendidas de Averías Mayores de Maquinaria",
      intro:"Esta lección no introduce ningún concepto de seguridad nuevo. No cuenta ninguna tragedia nueva.\n\nReúne los cinco casos ya estudiados — Viking Sky, ferry Kaitaki, Finlandia Seaways, Carnival Triumph, Damgracht/AP Revelin — para revelar lo que comparten pese a buques, épocas y océanos distintos.\n\nLos nombres cambian. Las causas de fondo se repiten.",
      p0:"POR QUÉ ESTUDIAR LAS LECCIONES DEL PASADO",s0t:"Reconocer un patrón antes de que se repita",
      s0:"La habilidad final de este módulo no es conocer cinco historias de memoria — es reconocer sus patrones comunes en una situación nueva, antes de que se convierta en una avería.\n\n¿CÓMO PREVENIR LA AVERÍA? Reconociendo pronto un patrón ya encontrado.\n¿QUÉ HACER ANTE UNA SITUACIÓN DESCONOCIDA? Preguntarse a qué caso conocido se parece y qué principio se aplica.\n¿QUÉ LECCIÓN RETENER? Las circunstancias varían infinitamente; los comportamientos humanos que llevan a una avería, mucho menos.",
      p1:"EL HILO CONDUCTOR DE LOS 5 CASOS DEL MÓDULO",s1t:"Buques muy distintos, patrones que se repiten",
      s1:"Crucero, ferry, ro-ro, transatlántico, carguero: cinco tipos de buque, cinco contextos distintos. Y sin embargo, al superponerlos, aparecen los mismos patrones humanos: factor individual, coordinación de equipo, acción tardía, hipótesis no verificada, presión de tiempo.",
      p2:"REVISIÓN DEL FACTOR HUMANO INDIVIDUAL",s2t:"El vínculo con L1",
      s2:"El sesgo de alarma del Viking Sky y la visión de túnel del caso Damgracht comparten la misma raíz: confianza excesiva en una única fuente de información, sin verificación cruzada ni cuestionamiento.",
      p3:"REVISIÓN DE LA COORDINACIÓN DE EQUIPO",s3t:"El vínculo con L2",
      s3:"El ferry Kaitaki mostró que todo un equipo puede perder la conciencia de situación compartida. La lección sigue siendo la misma sea cual sea el tipo de avería: sin roles claros, la coordinación se derrumba en el peor momento.",
      p4:"REVISIÓN DE LA ACCIÓN Y LA ESTABILIZACIÓN",s4t:"El vínculo con L3 y L4",
      s4:"De Finlandia Seaways (respuesta de emergencia inmediata ante un incendio de motor) a Carnival Triumph (gestión prolongada durante 5 días), la naturaleza de la acción evoluciona con el tiempo — pero la necesidad de una estructura clara nunca cambia.",
      p5:"LO QUE CAMBIÓ TRAS ESTAS AVERÍAS",s5t:"La evolución de la cultura de seguridad",
      s5:"Sin entrar en el ángulo jurídico, estas averías reforzaron, desde la perspectiva de la seguridad, las prácticas de verificación física, la comunicación estructurada y la gestión prolongada de crisis — la propia sustancia de este módulo.",
      p6:"CONSTRUIR TU PROPIO REFLEJO DE SEGURIDAD",s6t:"Autoevaluarse con honestidad",
      s6:"Reconocer estos patrones en otros es útil. Reconocerlos en la propia práctica es lo que hace a un maquinista realmente preparado para prevenir la avería en lugar de lamentarla después.",
      p7:"THE PROFESSIONAL SAFETY MINDSET",s7t:"Cuál debe ser la mentalidad de un maquinista profesional",
      s7:"Mantenerse alerta incluso cuando todo parece normal. Verificar siempre antes de suponer. Comunicar con claridad. Escuchar a los demás miembros del equipo. Aprender continuamente de averías pasadas — propias y ajenas.\n\nNo es un concepto nuevo. Es la síntesis de todo lo que este módulo ha enseñado.",
      p8:"🎯 EJERCICIO DE RECONOCIMIENTO DE PATRONES",p9:"📝 BANCO DE 15 PREGUNTAS",p10:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN — LECCIÓN 6 · MÓDULO COMPLETADO",
      sumP:["Los nombres de los buques cambian, las causas de fondo se repiten","Factor humano, coordinación, acción tardía, hipótesis no verificada, presión de tiempo","La ventana de decisión útil es casi siempre más corta de lo que pensamos","Reconocer un patrón temprano previene la avería antes de que ocurra","The Professional Safety Mindset: vigilancia, verificación, comunicación, escucha, aprendizaje continuo"],
      learnedP:["El hilo conductor entre los 5 casos del módulo","El factor humano individual y la coordinación de equipo, revisitados","La acción de emergencia y la estabilización, del plazo más corto al más largo","La evolución de la cultura de seguridad tras estas averías","The Professional Safety Mindset"],
      safetyMsg:"Cada avería enseña la misma lección de una manera distinta: mantente alerta, comunica con claridad, verifica tus suposiciones, y nunca dejes de aprender. Los maquinistas más seguros son los que aprenden de los errores ajenos antes de cometer los propios.",
      moduleComplete:{
        title:"ENGINE ROOM RESOURCE MANAGEMENT — ¡MÓDULO COMPLETADO!",
        subtitle:"Factores humanos, coordinación, acción, estabilización, decisión — 6 lecciones dominadas ⚙️",
        message:"¡Felicidades! Has completado el módulo Engine Room Resource Management. Has aprendido no solo por qué ocurren las averías de maquinaria, sino cómo prevenirlas, reaccionar ante ellas, estabilizarlas, y decidir bien bajo presión. Continúa tu recorrido de Seguridad. Cada lección aprendida hoy podría proteger a la tripulación mañana.",
      },
    },
    pt:{
      badge:"⚙️ Segurança · Engine Room Resource Management · Lição 6/6 · ⭐ Premium · 🏁 MÓDULO CONCLUÍDO",
      title:"Lições Aprendidas de Avarias Maiores de Maquinaria",
      intro:"Esta lição não introduz nenhum conceito de segurança novo. Não conta nenhuma tragédia nova.\n\nReúne os cinco casos já estudados — Viking Sky, ferry Kaitaki, Finlandia Seaways, Carnival Triumph, Damgracht/AP Revelin — para revelar o que partilham apesar de navios, épocas e oceanos diferentes.\n\nOs nomes mudam. As causas de fundo repetem-se.",
      p0:"POR QUE ESTUDAR AS LIÇÕES DO PASSADO",s0t:"Reconhecer um padrão antes de se repetir",
      s0:"A competência final deste módulo não é conhecer cinco histórias de cor — é reconhecer os seus padrões comuns numa situação nova, antes de se tornar numa avaria.\n\nCOMO PREVENIR A AVARIA? Reconhecendo cedo um padrão já encontrado.\nO QUE FAZER PERANTE UMA SITUAÇÃO DESCONHECIDA? Perguntar a que caso conhecido se assemelha e que princípio se aplica.\nQUE LIÇÃO RETER? As circunstâncias variam infinitamente; os comportamentos humanos que levam a uma avaria, muito menos.",
      p1:"O FIO CONDUTOR DOS 5 CASOS DO MÓDULO",s1t:"Navios muito diferentes, padrões que se repetem",
      s1:"Cruzeiro, ferry, ro-ro, transatlântico, cargueiro: cinco tipos de navio, cinco contextos diferentes. E, no entanto, ao sobrepô-los, surgem os mesmos padrões humanos: fator individual, coordenação de equipa, ação tardia, hipótese não verificada, pressão de tempo.",
      p2:"REVISÃO DO FATOR HUMANO INDIVIDUAL",s2t:"A ligação com L1",
      s2:"O viés de alarme do Viking Sky e a visão em túnel do caso Damgracht partilham a mesma raiz: confiança excessiva numa única fonte de informação, sem verificação cruzada nem questionamento.",
      p3:"REVISÃO DA COORDENAÇÃO DE EQUIPA",s3t:"A ligação com L2",
      s3:"O ferry Kaitaki mostrou que uma equipa inteira pode perder a consciência de situação partilhada. A lição mantém-se igual seja qual for o tipo de avaria: sem funções claras, a coordenação desmorona-se no pior momento.",
      p4:"REVISÃO DA AÇÃO E DA ESTABILIZAÇÃO",s4t:"A ligação com L3 e L4",
      s4:"De Finlandia Seaways (resposta de emergência imediata a um incêndio de motor) a Carnival Triumph (gestão prolongada durante 5 dias), a natureza da ação evolui com o tempo — mas a necessidade de uma estrutura clara nunca muda.",
      p5:"O QUE MUDOU APÓS ESTAS AVARIAS",s5t:"A evolução da cultura de segurança",
      s5:"Sem entrar no ângulo jurídico, estas avarias reforçaram, do ponto de vista da segurança, as práticas de verificação física, a comunicação estruturada e a gestão prolongada de crise — a própria substância deste módulo.",
      p6:"CONSTRUIR O TEU PRÓPRIO REFLEXO DE SEGURANÇA",s6t:"Autoavaliar-se com honestidade",
      s6:"Reconhecer estes padrões nos outros é útil. Reconhecê-los na própria prática é o que torna um maquinista verdadeiramente pronto para prevenir a avaria em vez de a lamentar depois.",
      p7:"THE PROFESSIONAL SAFETY MINDSET",s7t:"Qual deve ser a mentalidade de um maquinista profissional",
      s7:"Manter-se vigilante mesmo quando tudo parece normal. Verificar sempre antes de supor. Comunicar claramente. Ouvir os outros membros da equipa. Aprender continuamente com avarias passadas — próprias e alheias.\n\nNão é um conceito novo. É a síntese de tudo o que este módulo ensinou.",
      p8:"🎯 EXERCÍCIO DE RECONHECIMENTO DE PADRÕES",p9:"📝 BANCO DE 15 PERGUNTAS",p10:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO — LIÇÃO 6 · MÓDULO CONCLUÍDO",
      sumP:["Os nomes dos navios mudam, as causas de fundo repetem-se","Fator humano, coordenação, ação tardia, hipótese não verificada, pressão de tempo","A janela de decisão útil é quase sempre mais curta do que pensamos","Reconhecer um padrão cedo previne a avaria antes de acontecer","The Professional Safety Mindset: vigilância, verificação, comunicação, escuta, aprendizagem contínua"],
      learnedP:["O fio condutor entre os 5 casos do módulo","O fator humano individual e a coordenação de equipa, revisitados","A ação de emergência e a estabilização, do prazo mais curto ao mais longo","A evolução da cultura de segurança após estas avarias","The Professional Safety Mindset"],
      safetyMsg:"Cada avaria ensina a mesma lição de uma forma diferente: mantém-te vigilante, comunica claramente, verifica as tuas suposições, e nunca deixes de aprender. Os maquinistas mais seguros são os que aprendem com os erros dos outros antes de cometer os seus.",
      moduleComplete:{
        title:"ENGINE ROOM RESOURCE MANAGEMENT — MÓDULO CONCLUÍDO!",
        subtitle:"Fatores humanos, coordenação, ação, estabilização, decisão — 6 lições dominadas ⚙️",
        message:"Parabéns! Concluíste o módulo Engine Room Resource Management. Aprendeste não só por que acontecem as avarias de maquinaria, mas como preveni-las, reagir a elas, estabilizá-las, e decidir bem sob pressão. Continua o teu percurso de Segurança. Cada lição aprendida hoje pode proteger a tripulação amanhã.",
      },
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN
// ══════════════════════════════════════
export default function LessonSafetyS1E_L6({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, onQuizScored=(score:number,maxScore:number)=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 6/6":lang==="en"?"Lesson 6/6":lang==="es"?"Lección 6/6":"Lição 6/6"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold2,fontWeight:700}}>⭐</div>
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

            <SL icon="🧭" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧭</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🔗" text={lc.p1} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔗</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🔗 {lang==="fr"?"LES 5 CAS — INTERACTIF":lang==="en"?"THE 5 CASES — INTERACTIVE":lang==="es"?"LOS 5 CASOS — INTERACTIVO":"OS 5 CASOS — INTERATIVO"}</div><CaseSynthesisSVG lang={lang}/></Card>

            <SL icon="😴" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>😴</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>

            <SL icon="🧩" text={lc.p3} color={C.blue2}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧩</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>

            <SL icon="🔢" text={lc.p4} color={C.red}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔢</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>

            <SL icon="🛡️" text={lc.p5} color={C.teal}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🛡️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s5t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s5}</div></Card>

            <SL icon="🪞" text={lc.p6} color={C.purple}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🪞</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s6t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s6}</div></Card>

            <SL icon="🎖️" text={lc.p7} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🎖️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s7t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s7}</div></Card>

            <SL icon="🎯" text={lc.p8} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

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
                {lang==="fr"?"Quiz Final — Retours d'Expérience":lang==="en"?"Final Quiz — Lessons Learned":lang==="es"?"Quiz Final — Lecciones Aprendidas":"Quiz Final — Lições Aprendidas"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 6/6":lang==="en"?"questions · Lesson 6/6":lang==="es"?"preguntas · Lección 6/6":"perguntas · Lição 6/6"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);onQuizScored(s,quiz.length);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            {/* Module completion celebration */}
            <div style={{textAlign:"center",marginBottom:20,padding:"20px 16px",borderRadius:20,background:"linear-gradient(135deg,rgba(192,57,43,0.15),rgba(201,146,42,0.1))",border:`1px solid ${C.red}44`}}>
              <div style={{fontSize:72,marginBottom:8}}>🏆</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.gold2,marginBottom:4}}>{lc.moduleComplete.title}</div>
              <div style={{fontSize:14,color:C.white,marginBottom:12}}>{lc.moduleComplete.subtitle}</div>
              <div style={{display:"flex",justifyContent:"center",gap:8,flexWrap:"wrap"}}>
                {["L1","L2","L3","L4","L5","L6"].map((l,i)=>(
                  <div key={i} style={{width:36,height:36,borderRadius:10,background:C.green,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:C.white}}>{l}</div>
                ))}
              </div>
            </div>

            <div style={{display:"inline-flex",width:"100%",justifyContent:"center",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}55`,fontSize:14,color:C.gold2,fontWeight:700,marginBottom:16,boxSizing:"border-box"}}>
              +300 {t.xp} ⭐ · {lang==="fr"?"Module":"Module"}: 6/6 · {lang==="fr"?"Quiz":"Quiz"} {quizScore}/5
            </div>

            <Card style={{marginBottom:16,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.1),rgba(13,31,60,0.9))"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span style={{fontSize:20}}>⚙️</span>
                <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",fontWeight:700}}>SAFETY MESSAGE</div>
              </div>
              <div style={{fontSize:13,color:C.white,lineHeight:1.8,fontStyle:"italic"}}>{lc.moduleComplete.message}</div>
            </Card>

            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.gold},${C.red})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(201,146,42,0.4)",marginBottom:10}}>
              {lang==="fr"?"🎯 EXPLORER LES AUTRES MODULES →":lang==="en"?"🎯 EXPLORE OTHER MODULES →":lang==="es"?"🎯 EXPLORAR OTROS MÓDULOS →":"🎯 EXPLORAR OUTROS MÓDULOS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
