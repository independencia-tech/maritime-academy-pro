import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  steel:"#455a64", yellow:"#f1c40f",
};

const T = {
  fr:{ back:"◀ Retour", module:"Module Machine", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Engine Module", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Módulo Máquinas", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Módulo Máquinas", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

function Stars(){const s=Array.from({length:16},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<div><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></div>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.green}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

// ══════════════════════════════════════
// SVG 1 - WASTE CATEGORIES
// ══════════════════════════════════════
function WasteCategoriesSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const cats = [
    { id:"plastics", icon:"🚫", color:C.red,
      label:{fr:"Plastiques",en:"Plastics",es:"Plásticos",pt:"Plásticos"},
      desc:{fr:"Rejet INTERDIT partout en mer, sans aucune exception de distance ni de zone. Inclut cordages synthetiques, filets, sacs plastiques, emballages. La categorie la plus stricte de l'Annexe V.",en:"Discharge PROHIBITED everywhere at sea, with no distance or zone exception. Includes synthetic ropes, nets, plastic bags, packaging. The strictest category under Annex V.",es:"Descarga PROHIBIDA en cualquier lugar del mar, sin excepcion de distancia ni zona. Incluye cabos sinteticos, redes, bolsas plasticas, embalajes.",pt:"Descarga PROIBIDA em qualquer lugar do mar, sem excecao de distancia ou zona. Inclui cabos sinteticos, redes, sacos plasticos, embalagens."} },
    { id:"food", icon:"🍽️", color:C.orange,
      label:{fr:"Déchets alimentaires",en:"Food waste",es:"Residuos alimentarios",pt:"Resíduos alimentares"},
      desc:{fr:"Autorises seulement au-dela de 3 milles des cotes si broyes (moins de 25mm), ou 12 milles si non broyes. Zero rejet en zone speciale. Frequemment melanges par erreur avec des plastiques (embalages) - erreur de tri courante.",en:"Allowed only beyond 3 nautical miles from shore if comminuted (under 25mm), or 12 miles if not comminuted. Zero discharge in special areas. Frequently mixed by mistake with plastics (packaging) - a common sorting error.",es:"Permitido solo mas alla de 3 millas de la costa si esta triturado (menos de 25mm), o 12 millas si no lo esta. Cero descarga en zona especial.",pt:"Permitido apenas alem de 3 milhas da costa se triturado (menos de 25mm), ou 12 milhas se nao triturado. Zero descarga em zona especial."} },
    { id:"cargo", icon:"📦", color:C.teal,
      label:{fr:"Résidus de cargaison",en:"Cargo residues",es:"Residuos de carga",pt:"Resíduos de carga"},
      desc:{fr:"Residus non recuperables par les methodes de dechargement habituelles. Si classes HME (Harmful to the Marine Environment - toxiques, plastiques en vrac), rejet totalement interdit. Sinon, regles de distance similaires aux autres dechets.",en:"Residues not recoverable using standard unloading methods. If classified HME (Harmful to the Marine Environment - toxic, bulk plastics), discharge is fully prohibited. Otherwise, distance rules similar to other waste apply.",es:"Residuos no recuperables con los metodos habituales de descarga. Si se clasifican HME (Harmful to the Marine Environment), la descarga esta totalmente prohibida.",pt:"Residuos nao recuperaveis pelos metodos habituais de descarregamento. Se classificados HME (Harmful to the Marine Environment), a descarga e totalmente proibida."} },
    { id:"domestic", icon:"🗑️", color:C.blue2,
      label:{fr:"Déchets domestiques & opérationnels",en:"Domestic & operational waste",es:"Residuos domésticos y operacionales",pt:"Resíduos domésticos e operacionais"},
      desc:{fr:"Papier, verre, metal, chiffons, dechets d'entretien machine : souvent oublies car on pense que seuls les plastiques sont concernes par MARPOL. Ces categories ont chacune leurs propres regles de distance et de traitement - elles ne peuvent pas etre melangees entre elles ni avec les plastiques.",en:"Paper, glass, metal, rags, engine maintenance waste: often overlooked because people assume only plastics are covered by MARPOL. Each of these categories has its own distance and treatment rules - they cannot be mixed with each other or with plastics.",es:"Papel, vidrio, metal, trapos, residuos de mantenimiento de maquinas: a menudo olvidados porque se cree que solo los plasticos estan cubiertos por MARPOL. Cada categoria tiene sus propias reglas.",pt:"Papel, vidro, metal, panos, residuos de manutencao de maquinas: frequentemente esquecidos porque se pensa que so os plasticos sao cobertos pelo MARPOL. Cada categoria tem suas proprias regras."} },
    { id:"ash", icon:"🔥", color:C.gold2,
      label:{fr:"Cendres d'incinérateur",en:"Incinerator ashes",es:"Cenizas de incinerador",pt:"Cinzas de incinerador"},
      desc:{fr:"Si les dechets incineres contenaient du plastique, les cendres resultantes sont considerees comme du plastique et ne peuvent jamais etre rejetees en mer - regle souvent ignoree a bord.",en:"If the incinerated waste contained plastic, the resulting ash is considered plastic and can never be discharged at sea - a rule often overlooked on board.",es:"Si los residuos incinerados contenian plastico, las cenizas resultantes se consideran plastico y nunca pueden descargarse al mar - una regla a menudo ignorada a bordo.",pt:"Se os residuos incinerados continham plastico, as cinzas resultantes sao consideradas plastico e nunca podem ser descarregadas no mar - uma regra frequentemente ignorada a bordo."} },
  ];
  const sel_ = sel ? cats.find(c=>c.id===sel) : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
        {cats.map(c=>(
          <div key={c.id} onClick={()=>setSel(sel===c.id?null:c.id)}
            style={{padding:"10px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===c.id?`${c.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===c.id?c.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:4}}>{c.icon}</div>
            <div style={{fontSize:10,color:sel===c.id?c.color:C.muted,fontWeight:700,lineHeight:1.3}}>{c.label[lang]||c.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>:<div style={{textAlign:"center",padding:"10px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche une catégorie pour les détails":lang==="en"?"Tap a category for details":lang==="es"?"Toca una categoría para detalles":"Toque numa categoria para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 - GARBAGE MANAGEMENT PLAN (GMP)
// ══════════════════════════════════════
function GMPSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"person", icon:"👤", color:C.teal,
      label:{fr:"Responsable désigné",en:"Designated person",es:"Persona designada",pt:"Pessoa designada"},
      desc:{fr:"Le GMP doit nommer une personne responsable de sa mise en oeuvre a bord - generalement un officier senior. Cette personne supervise le tri, le stockage et la remise a terre des dechets.",en:"The GMP must name a person responsible for its implementation on board - usually a senior officer. This person oversees sorting, storage and handover ashore.",es:"El GMP debe nombrar a una persona responsable de su implementacion a bordo - generalmente un oficial senior. Esta persona supervisa la clasificacion, el almacenamiento y la entrega en tierra.",pt:"O GMP deve nomear uma pessoa responsavel pela sua implementacao a bordo - geralmente um oficial senior. Essa pessoa supervisiona a triagem, o armazenamento e a entrega em terra."} },
    { id:"procedures", icon:"📝", color:C.gold2,
      label:{fr:"Procédures écrites",en:"Written procedures",es:"Procedimientos escritos",pt:"Procedimentos escritos"},
      desc:{fr:"Le plan decrit par ecrit comment minimiser, collecter, stocker, traiter et eliminer chaque categorie de dechet genere a bord. Ces procedures doivent etre suivies a la lettre, pas seulement archivees.",en:"The plan describes in writing how to minimize, collect, store, process and dispose of each waste category generated on board. These procedures must be followed to the letter, not just filed away.",es:"El plan describe por escrito como minimizar, recolectar, almacenar, tratar y eliminar cada categoria de residuo generado a bordo. Estos procedimientos deben seguirse al pie de la letra.",pt:"O plano descreve por escrito como minimizar, recolher, armazenar, tratar e eliminar cada categoria de residuo gerada a bordo. Esses procedimentos devem ser seguidos a risca."} },
    { id:"placard", icon:"🪧", color:C.blue2,
      label:{fr:"Affichage obligatoire",en:"Mandatory posting",es:"Exhibición obligatoria",pt:"Exibição obrigatória"},
      desc:{fr:"Des affiches resumant les regles de tri et de rejet doivent etre visibles dans les espaces communs et de preparation des repas, dans les langues comprises par l'equipage.",en:"Posters summarizing sorting and discharge rules must be visible in common areas and food preparation spaces, in languages understood by the crew.",es:"Se deben exhibir carteles que resuman las reglas de clasificacion y descarga en espacios comunes y de preparacion de alimentos, en idiomas comprendidos por la tripulacion.",pt:"Cartazes resumindo as regras de triagem e descarga devem estar visiveis em espacos comuns e de preparacao de refeicoes, em idiomas compreendidos pela tripulacao."} },
    { id:"equipment", icon:"⚙️", color:C.purple,
      label:{fr:"Équipements à bord",en:"Onboard equipment",es:"Equipos a bordo",pt:"Equipamentos a bordo"},
      desc:{fr:"Le GMP liste les equipements disponibles pour reduire le volume des dechets : compacteurs, broyeurs, incinerateur (si present). L'existence de ces equipements ne dispense jamais du tri prealable par categorie.",en:"The GMP lists the equipment available to reduce waste volume: compactors, shredders, incinerator (if fitted). The existence of this equipment never exempts from prior sorting by category.",es:"El GMP enumera los equipos disponibles para reducir el volumen de residuos: compactadores, trituradoras, incinerador (si existe). La existencia de estos equipos nunca exime de la clasificacion previa.",pt:"O GMP lista os equipamentos disponiveis para reduzir o volume de residuos: compactadores, trituradores, incinerador (se houver). A existencia desses equipamentos nunca dispensa a triagem previa."} },
  ];
  const sel_ = sel ? items.find(i=>i.id===sel) : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
        {items.map(it=>(
          <div key={it.id} onClick={()=>setSel(sel===it.id?null:it.id)}
            style={{padding:"10px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===it.id?`${it.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===it.id?it.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:4}}>{it.icon}</div>
            <div style={{fontSize:10,color:sel===it.id?it.color:C.muted,fontWeight:700,lineHeight:1.3}}>{it.label[lang]||it.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>:<div style={{textAlign:"center",padding:"10px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche un élément pour les détails":lang==="en"?"Tap an item for details":lang==="es"?"Toca un elemento para detalles":"Toque num item para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 - GARBAGE RECORD BOOK (GRB)
// ══════════════════════════════════════
function GRBSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"what", icon:"📋", color:C.teal,
      label:{fr:"Quoi inscrire",en:"What to log",es:"Qué registrar",pt:"O que registar"},
      desc:{fr:"Chaque rejet, incineration ou remise a terre par categorie de dechet, avec date, position du navire et quantite estimee. Une operation non inscrite equivaut a une operation non conforme aux yeux d'un inspecteur.",en:"Every discharge, incineration or handover ashore by waste category, with date, ship's position and estimated quantity. An unlogged operation is treated as a non-compliant operation by an inspector.",es:"Cada descarga, incineracion o entrega en tierra por categoria de residuo, con fecha, posicion del buque y cantidad estimada. Una operacion no registrada equivale a una operacion no conforme.",pt:"Cada descarga, incineracao ou entrega em terra por categoria de residuo, com data, posicao do navio e quantidade estimada. Uma operacao nao registada equivale a uma operacao nao conforme."} },
    { id:"who", icon:"✍️", color:C.gold2,
      label:{fr:"Qui signe",en:"Who signs",es:"Quién firma",pt:"Quem assina"},
      desc:{fr:"L'officier responsable de l'operation signe chaque entree, comme pour l'Oil Record Book. Le Garbage Record Book est un document legal, pas un simple registre de tri.",en:"The officer responsible for the operation signs each entry, just like the Oil Record Book. The Garbage Record Book is a legal document, not a simple sorting log.",es:"El oficial responsable de la operacion firma cada entrada, igual que el Oil Record Book. El Garbage Record Book es un documento legal, no un simple registro de clasificacion.",pt:"O oficial responsavel pela operacao assina cada entrada, tal como o Oil Record Book. O Garbage Record Book e um documento legal, nao um simples registo de triagem."} },
    { id:"retention", icon:"🗄️", color:C.blue2,
      label:{fr:"Durée de conservation",en:"Retention period",es:"Período de conservación",pt:"Período de conservação"},
      desc:{fr:"Le GRB doit etre conserve a bord au minimum 2 ans apres la derniere entree. Disponible a tout moment pour une inspection PSC, au meme titre que l'Oil Record Book.",en:"The GRB must be kept on board for a minimum of 2 years after the last entry. Available at any time for a PSC inspection, same as the Oil Record Book.",es:"El GRB debe conservarse a bordo un minimo de 2 anos despues de la ultima entrada. Disponible en cualquier momento para una inspeccion PSC.",pt:"O GRB deve ser conservado a bordo por no minimo 2 anos apos a ultima entrada. Disponivel a qualquer momento para uma inspecao PSC."} },
    { id:"waiver", icon:"📄", color:C.purple,
      label:{fr:"Dérogation documentée",en:"Documented waiver",es:"Exención documentada",pt:"Isenção documentada"},
      desc:{fr:"Certains petits navires peuvent etre dispenses de GRB par leur administration de pavillon - mais uniquement avec une confirmation ecrite officielle. Naviguer sans GRB sur une simple supposition est en soi une deficience.",en:"Some small vessels may be exempt from the GRB by their flag administration - but only with official written confirmation. Sailing without a GRB on an assumed waiver is itself a deficiency.",es:"Algunos buques pequenos pueden estar exentos del GRB por su administracion de pabellon - pero solo con confirmacion escrita oficial. Navegar sin GRB por una simple suposicion ya es una deficiencia.",pt:"Alguns navios pequenos podem estar isentos do GRB pela sua administracao de bandeira - mas apenas com confirmacao escrita oficial. Navegar sem GRB por uma simples suposicao ja e uma deficiencia."} },
  ];
  const sel_ = sel ? items.find(i=>i.id===sel) : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
        {items.map(it=>(
          <div key={it.id} onClick={()=>setSel(sel===it.id?null:it.id)}
            style={{padding:"10px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===it.id?`${it.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===it.id?it.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:4}}>{it.icon}</div>
            <div style={{fontSize:10,color:sel===it.id?it.color:C.muted,fontWeight:700,lineHeight:1.3}}>{it.label[lang]||it.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>:<div style={{textAlign:"center",padding:"10px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche un élément pour les détails":lang==="en"?"Tap an item for details":lang==="es"?"Toca un elemento para detalles":"Toque num item para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 - SPECIAL AREAS & INCINERATOR (REGULATORY ONLY)
// ══════════════════════════════════════
function SpecialAreasSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"zones", icon:"🗺️", color:C.red,
      label:{fr:"Zones spéciales",en:"Special areas",es:"Zonas especiales",pt:"Zonas especiais"},
      desc:{fr:"Mediterranee, Baltique, Mer du Nord, Antarctique, Mer Rouge, Golfe Persique - toute distance de rejet standard est suspendue ou fortement reduite. Seuls les dechets alimentaires broyes restent parfois autorises a une distance accrue.",en:"Mediterranean, Baltic, North Sea, Antarctic, Red Sea, Persian Gulf - any standard discharge distance is suspended or heavily reduced. Only comminuted food waste sometimes remains allowed at an increased distance.",es:"Mediterraneo, Baltico, Mar del Norte, Antartida, Mar Rojo, Golfo Persico - cualquier distancia de descarga estandar queda suspendida o muy reducida.",pt:"Mediterraneo, Baltico, Mar do Norte, Antartida, Mar Vermelho, Golfo Persico - qualquer distancia de descarga padrao fica suspensa ou muito reduzida."} },
    { id:"typeapproval", icon:"📜", color:C.gold2,
      label:{fr:"Certificat de type - incinérateur",en:"Incinerator type approval",es:"Certificado de tipo - incinerador",pt:"Certificado de tipo - incinerador"},
      desc:{fr:"Tout incinerateur installe apres le 1er janvier 2000 doit disposer d'un certificat de type approuve conforme a l'Annexe VI. Utiliser un incinerateur sans certificat valide constitue une infraction, independamment de l'Annexe V.",en:"Any incinerator installed after January 1, 2000 must hold a valid type approval certificate under Annex VI. Using an incinerator without valid approval is an offense, independent from Annex V.",es:"Cualquier incinerador instalado despues del 1 de enero de 2000 debe contar con un certificado de tipo aprobado conforme al Anexo VI. Usar un incinerador sin certificado valido es una infraccion.",pt:"Qualquer incinerador instalado apos 1 de janeiro de 2000 deve possuir um certificado de tipo aprovado conforme o Anexo VI. Usar um incinerador sem certificado valido e uma infracao."} },
    { id:"whenban", icon:"⛔", color:C.blue2,
      label:{fr:"Quand l'incinération est interdite",en:"When incineration is prohibited",es:"Cuándo la incineración está prohibida",pt:"Quando a incineração é proibida"},
      desc:{fr:"Interdiction d'incinerer des plastiques, PCB, dechets contenant des metaux lourds, ou tout dechet emballe contenant du chlore ou des halogenes, en plus des restrictions de zone. La reglementation porte sur quoi et ou, jamais sur le fonctionnement technique.",en:"Prohibited to incinerate plastics, PCBs, waste containing heavy metals, or any packaged waste containing chlorine or halogens, in addition to area restrictions. The regulation covers what and where, never the technical operation.",es:"Prohibido incinerar plasticos, PCB, residuos que contengan metales pesados, o cualquier residuo empaquetado que contenga cloro o halogenos, ademas de las restricciones de zona.",pt:"Proibido incinerar plasticos, PCB, residuos contendo metais pesados, ou qualquer residuo embalado contendo cloro ou halogenios, alem das restricoes de zona."} },
    { id:"portfacility", icon:"⚓", color:C.purple,
      label:{fr:"Installations portuaires",en:"Port reception facilities",es:"Instalaciones portuarias",pt:"Instalações portuárias"},
      desc:{fr:"Chaque port doit disposer d'installations pour recevoir les dechets tries par categorie. Le navire ne peut jamais justifier un rejet en mer par l'absence supposee de ces installations a terre.",en:"Every port must provide facilities to receive waste sorted by category. A vessel can never justify a sea discharge by the assumed absence of these shore facilities.",es:"Cada puerto debe disponer de instalaciones para recibir los residuos clasificados por categoria. El buque nunca puede justificar una descarga al mar por la ausencia supuesta de estas instalaciones.",pt:"Cada porto deve dispor de instalacoes para receber os residuos triados por categoria. O navio nunca pode justificar uma descarga no mar pela ausencia suposta dessas instalacoes."} },
  ];
  const sel_ = sel ? items.find(i=>i.id===sel) : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
        {items.map(it=>(
          <div key={it.id} onClick={()=>setSel(sel===it.id?null:it.id)}
            style={{padding:"10px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===it.id?`${it.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===it.id?it.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:4}}>{it.icon}</div>
            <div style={{fontSize:10,color:sel===it.id?it.color:C.muted,fontWeight:700,lineHeight:1.3}}>{it.label[lang]||it.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>:<div style={{textAlign:"center",padding:"10px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche un élément pour les détails":lang==="en"?"Tap an item for details":lang==="es"?"Toca un elemento para detalles":"Toque num item para detalhes"}
      </div>}
      <div style={{marginTop:8,padding:"8px 10px",borderRadius:10,background:"rgba(201,146,42,0.08)",border:`1px solid ${C.gold}33`,fontSize:10,color:C.gold2,textAlign:"center"}}>
        {lang==="fr"?"ℹ️ Cette lecon couvre la reglementation de l'incinerateur, pas son fonctionnement technique":lang==="en"?"ℹ️ This lesson covers incinerator regulation, not its technical operation":lang==="es"?"ℹ️ Esta leccion cubre la reglamentacion del incinerador, no su funcionamiento tecnico":"ℹ️ Esta licao cobre a regulamentacao do incinerador, nao o seu funcionamento tecnico"}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// GARBAGE HANDLING CHECKLIST
// ══════════════════════════════════════
function GarbageChecklist({ lang }) {
  const items = {
    fr:["Déchets triés par catégorie","Conteneurs de déchets correctement étiquetés","Ségrégation vérifiée avant élimination","Garbage Record Book mis à jour","Aucun plastique mélangé aux déchets alimentaires","Cendres d'incinérateur vérifiées (résidu plastique = toujours plastique)","Restrictions de zone spéciale vérifiées avant rejet","Garbage Management Plan affiché et accessible"],
    en:["Garbage sorted by category","Garbage containers correctly labelled","Garbage segregation verified before disposal","Garbage Record Book updated","No plastic mixed with food waste","Incinerator ash checked (plastic residue = still plastic)","Special area restrictions checked before disposal","Garbage Management Plan displayed and accessible"],
    es:["Residuos clasificados por categoría","Contenedores de residuos correctamente etiquetados","Segregación verificada antes de la eliminación","Garbage Record Book actualizado","Ningún plástico mezclado con residuos alimentarios","Cenizas del incinerador verificadas (residuo plástico = sigue siendo plástico)","Restricciones de zona especial verificadas antes de la descarga","Garbage Management Plan exhibido y accesible"],
    pt:["Resíduos triados por categoria","Contentores de resíduos corretamente rotulados","Segregação verificada antes da eliminação","Garbage Record Book atualizado","Nenhum plástico misturado com resíduos alimentares","Cinzas do incinerador verificadas (resíduo plástico = continua plástico)","Restrições de zona especial verificadas antes da descarga","Garbage Management Plan exibido e acessível"],
  };
  const title = {fr:"Checklist - Gestion des déchets",en:"Garbage Handling Checklist",es:"Checklist - Gestión de residuos",pt:"Checklist - Gestão de resíduos"};
  const list = items[lang]||items.fr;
  const [checked,setChecked]=useState(Array(list.length).fill(false));
  const toggle=i=>setChecked(c=>c.map((v,j)=>j===i?!v:v));
  const done=checked.filter(Boolean).length;
  return(
    <div>
      <div style={{fontSize:12,fontWeight:700,color:C.gold2,fontFamily:"'Cinzel',serif",marginBottom:10}}>✅ {title[lang]||title.fr}</div>
      {list.map((it,i)=>(
        <div key={i} onClick={()=>toggle(i)} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",borderRadius:10,marginBottom:6,cursor:"pointer",background:checked[i]?"rgba(30,138,74,0.15)":"rgba(255,255,255,0.04)",border:`1px solid ${checked[i]?C.green:"rgba(255,255,255,0.1)"}`}}>
          <div style={{width:18,height:18,borderRadius:4,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",border:`1.5px solid ${checked[i]?C.green:"rgba(255,255,255,0.3)"}`,background:checked[i]?C.green:"transparent",fontSize:11,color:"#fff"}}>{checked[i]?"✓":""}</div>
          <div style={{fontSize:12,color:checked[i]?C.white:C.muted,lineHeight:1.4}}>{it}</div>
        </div>
      ))}
      <div style={{marginTop:8,fontSize:11,color:C.gold2,textAlign:"right"}}>{done}/{list.length}</div>
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE
// ══════════════════════════════════════
function Exercise3({ lang, t }) {
  const [ans,setAns]=useState({q1:"",q2:"",q3:""});
  const [showC,setShowC]=useState(false);
  const correct={q1:"3",q2:"2",q3:"non"};
  const qs={
    fr:[
      {id:"q1",q:"Distance minimale des côtes pour rejeter des déchets alimentaires broyés (en milles nautiques) ?"},
      {id:"q2",q:"Durée minimale de conservation du Garbage Record Book (en années) ?"},
      {id:"q3",q:"Peut-on jeter des déchets alimentaires et du plastique ensemble ? Pourquoi ?\n(Réponds par oui/non puis explique)"},
    ],
    en:[
      {id:"q1",q:"Minimum distance from shore to discharge comminuted food waste (in nautical miles)?"},
      {id:"q2",q:"Minimum retention period for the Garbage Record Book (in years)?"},
      {id:"q3",q:"Can food waste and plastic be disposed of together? Why?\n(Answer yes/no then explain)"},
    ],
    es:[
      {id:"q1",q:"¿Distancia mínima de la costa para descargar residuos alimentarios triturados (en millas náuticas)?"},
      {id:"q2",q:"¿Duración mínima de conservación del Garbage Record Book (en años)?"},
      {id:"q3",q:"¿Se pueden desechar juntos residuos alimentarios y plástico? ¿Por qué?\n(Responde sí/no y explica)"},
    ],
    pt:[
      {id:"q1",q:"Distância mínima da costa para descarregar resíduos alimentares triturados (em milhas náuticas)?"},
      {id:"q2",q:"Duração mínima de conservação do Garbage Record Book (em anos)?"},
      {id:"q3",q:"Resíduos alimentares e plástico podem ser descartados juntos? Por quê?\n(Responda sim/não e explique)"},
    ],
  };
  const list=qs[lang]||qs.fr;
  const chk=(id,val)=>{
    const v=val.trim().toLowerCase();
    if(id==="q1") return v==="3"||v==="3 milles"||v==="3 miles";
    if(id==="q2") return v==="2"||v==="2 ans"||v==="2 years";
    if(id==="q3") return v.includes("non")||v.includes("no");
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.green}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : plastiques = interdiction totale · déchets alimentaires broyés = 3 milles minimum · GRB conservé 2 ans minimum"
        :lang==="en"?"💡 Reminders: plastics = total prohibition · comminuted food waste = 3 miles minimum · GRB kept minimum 2 years"
        :lang==="es"?"💡 Recordatorios: plásticos = prohibición total · residuos alimentarios triturados = 3 millas mínimo · GRB conservado 2 años mínimo"
        :"💡 Lembretes: plásticos = proibição total · resíduos alimentares triturados = 3 milhas mínimo · GRB conservado 2 anos no mínimo"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q.id,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:i===2?13:18,fontFamily:i===2?"inherit":"monospace",fontWeight:700,textAlign:i===2?"left":"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q.id,ans[q.id])?C.green:C.red}}>{chk(q.id,ans[q.id])?"✓":`✗ → ${correct[q.id]}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7,marginBottom:10}}>
        {lang==="fr"?"✅ Q1: 3 milles (déchets alimentaires broyés, hors zone spéciale)\n✅ Q2: 2 ans minimum à bord\n✅ Q3: Non - les plastiques sont interdits partout tandis que les déchets alimentaires suivent des règles de distance différentes. Les mélanger empêche tout traitement conforme et transforme l'ensemble en déchet non conforme."
        :lang==="en"?"✅ Q1: 3 miles (comminuted food waste, outside special area)\n✅ Q2: Minimum 2 years on board\n✅ Q3: No - plastics are prohibited everywhere while food waste follows different distance rules. Mixing them prevents any compliant treatment and turns the whole batch into non-compliant waste."
        :"✅ Q1: 3 · Q2: 2 · Q3: No/Non"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE - Fukuichi Gyogyo Kabushiki Kaisha (2019)
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"Fraude Annexe V - Fukuichi Gyogyo Kabushiki Kaisha (2019)",teaser:"Navire de pêche · GRB falsifié · Filets et plastiques rejetés · Amende de 1,5 million $ · Détection par inspection portuaire",
      what:"En 2019, la societe de peche japonaise Fukuichi Gyogyo Kabushiki Kaisha plaide coupable devant la justice americaine apres l'inspection de son navire (F/V Fukuichi Maru No. 112) a Guam. L'enquete revele que le Garbage Record Book etait systematiquement falsifie pour masquer le rejet illegal d'engins de peche et de plastiques directement en mer. Contrairement aux affaires precedentes, aucun membre d'equipage n'a denonce la pratique - c'est une inspection portuaire de routine qui a declenche l'enquete.",
      cause:"• Rejet regulier d'engins de peche et de plastiques sans passage par le tri ni le GRB\n• Garbage Record Book tenu de maniere fictive, sans lien avec les operations reelles\n• Pratique consideree comme normale par l'equipage, sans alerte interne\n• Inspection portuaire de routine ayant revele les incoherences documentaires",
      lessons:"✓ Un controle externe peut reveler une fraude que personne a bord n'a signalee\n✓ Le tri par categorie doit etre reel, pas seulement documente sur le papier\n✓ Les engins de peche perdus ou rejetes sont soumis aux memes regles que les autres plastiques\n✓ L'absence de denonciateur ne protege pas une compagnie - l'inspection suffit\n\nLesson learned : Une mauvaise gestion des dechets n'est pas seulement un probleme environnemental, c'est aussi une responsabilite legale et professionnelle."},
    en:{title:"Annex V Fraud - Fukuichi Gyogyo Kabushiki Kaisha (2019)",teaser:"Fishing vessel · Falsified GRB · Fishing gear and plastics discharged · $1.5 million fine · Detected by port inspection",
      what:"In 2019, the Japanese fishing company Fukuichi Gyogyo Kabushiki Kaisha pleaded guilty in US court following the inspection of its vessel (F/V Fukuichi Maru No. 112) in Guam. The investigation revealed the Garbage Record Book was systematically falsified to hide the illegal discharge of fishing gear and plastics directly at sea. Unlike previous cases, no crew member reported the practice - it was a routine port inspection that triggered the investigation.",
      cause:"• Regular discharge of fishing gear and plastics without sorting or GRB entry\n• Garbage Record Book kept fictitiously, unrelated to actual operations\n• Practice considered normal by the crew, with no internal alert\n• Routine port inspection revealed the documentary inconsistencies",
      lessons:"✓ An external inspection can uncover fraud that no one on board reported\n✓ Sorting by category must be real, not just documented on paper\n✓ Lost or discarded fishing gear is subject to the same rules as other plastics\n✓ The absence of a whistleblower does not protect a company - inspection is enough\n\nLesson learned: Poor waste management is not only an environmental issue; it is also a legal and professional responsibility."},
    es:{title:"Fraude Anexo V - Fukuichi Gyogyo Kabushiki Kaisha (2019)",teaser:"Buque pesquero · GRB falsificado · Artes de pesca y plásticos descargados · Multa de 1,5 millones $ · Detectado por inspección portuaria",
      what:"En 2019, la empresa pesquera japonesa Fukuichi Gyogyo Kabushiki Kaisha se declaro culpable ante la justicia estadounidense tras la inspeccion de su buque (F/V Fukuichi Maru No. 112) en Guam. La investigacion revelo que el Garbage Record Book estaba sistematicamente falsificado para ocultar la descarga ilegal de artes de pesca y plasticos directamente al mar. A diferencia de los casos anteriores, ningun tripulante denuncio la practica - fue una inspeccion portuaria de rutina la que desencadeno la investigacion.",
      cause:"• Descarga regular de artes de pesca y plasticos sin clasificacion ni entrada en el GRB\n• Garbage Record Book llevado de forma ficticia, sin relacion con las operaciones reales\n• Practica considerada normal por la tripulacion, sin alerta interna\n• Inspeccion portuaria de rutina que revelo las incoherencias documentales",
      lessons:"✓ Una inspeccion externa puede revelar un fraude que nadie a bordo denuncio\n✓ La clasificacion por categoria debe ser real, no solo documentada en papel\n✓ Las artes de pesca perdidas o desechadas estan sujetas a las mismas reglas que otros plasticos\n✓ La ausencia de un denunciante no protege a una compania - la inspeccion basta\n\nLesson learned: Una mala gestion de residuos no es solo un problema ambiental, tambien es una responsabilidad legal y profesional."},
    pt:{title:"Fraude Anexo V - Fukuichi Gyogyo Kabushiki Kaisha (2019)",teaser:"Navio de pesca · GRB falsificado · Artes de pesca e plásticos descarregados · Multa de 1,5 milhões $ · Detetado por inspeção portuária",
      what:"Em 2019, a empresa pesqueira japonesa Fukuichi Gyogyo Kabushiki Kaisha se declarou culpada perante a justica americana apos a inspecao do seu navio (F/V Fukuichi Maru No. 112) em Guam. A investigacao revelou que o Garbage Record Book era sistematicamente falsificado para ocultar a descarga ilegal de artes de pesca e plasticos diretamente no mar. Ao contrario dos casos anteriores, nenhum membro da tripulacao denunciou a pratica - foi uma inspecao portuaria de rotina que desencadeou a investigacao.",
      cause:"• Descarga regular de artes de pesca e plasticos sem triagem nem entrada no GRB\n• Garbage Record Book mantido de forma ficticia, sem relacao com as operacoes reais\n• Pratica considerada normal pela tripulacao, sem alerta interno\n• Inspecao portuaria de rotina revelou as incoerencias documentais",
      lessons:"✓ Uma inspecao externa pode revelar uma fraude que ninguem a bordo denunciou\n✓ A triagem por categoria deve ser real, nao apenas documentada no papel\n✓ Artes de pesca perdidas ou descartadas estao sujeitas as mesmas regras que outros plasticos\n✓ A ausencia de um denunciante nao protege uma empresa - a inspecao basta\n\nLesson learned: Uma ma gestao de residuos nao e apenas um problema ambiental, e tambem uma responsabilidade legal e profissional."},
  };
  const c=d[lang]||d.fr;
  return(
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
        <div style={{fontSize:11,color:C.red,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>CAUSES</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.cause}</div>
        <div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"LEÇONS":lang==="en"?"LESSONS":lang==="es"?"LECCIONES":"LIÇÕES"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.lessons}</div>
      </div>}
    </div>
  );
}

const QUIZ = {
  fr:[
    {q:"Quelle catégorie de déchets est interdite de rejet partout en mer, sans aucune exception ?",opts:["Déchets alimentaires","Plastiques","Résidus de cargaison","Papier"],correct:1,expl:"Les plastiques sont la seule catégorie interdite de rejet en mer sans aucune exception de distance ni de zone."},
    {q:"Distance minimale des côtes pour rejeter des déchets alimentaires broyés (hors zone spéciale) ?",opts:["1 mille","3 milles","12 milles","50 milles"],correct:1,expl:"Les déchets alimentaires broyés (moins de 25mm) peuvent être rejetés au-delà de 3 milles nautiques des côtes."},
    {q:"Que doit-on faire des cendres d'incinérateur si les déchets brûlés contenaient du plastique ?",opts:["Les rejeter normalement en mer","Les traiter comme du plastique - jamais de rejet en mer","Les remettre uniquement en zone spéciale","Aucune règle particulière"],correct:1,expl:"Les cendres issues de déchets plastiques incinérés sont considérées comme du plastique et ne peuvent jamais être rejetées en mer."},
    {q:"Comment l'affaire Fukuichi Gyogyo Kabushiki Kaisha (2019) a-t-elle été découverte ?",opts:["Un lanceur d'alerte interne","Une inspection portuaire de routine","Une fuite médiatique","Un audit volontaire de la compagnie"],correct:1,expl:"Contrairement aux cas de magic pipe, cette affaire a été révélée par une inspection portuaire de routine du navire à Guam, sans dénonciateur interne."},
    {q:"Que doit contenir le Garbage Record Book, comme l'Oil Record Book ?",opts:["Aucune signature n'est nécessaire","Des entrées signées par l'officier responsable, avec valeur légale","Uniquement une liste de poids total","Rien, c'est un simple registre interne"],correct:1,expl:"Le Garbage Record Book est un document légal signé par l'officier responsable, au même titre que l'Oil Record Book."},
  ],
  en:[
    {q:"Which waste category is prohibited from discharge everywhere at sea, with no exception?",opts:["Food waste","Plastics","Cargo residues","Paper"],correct:1,expl:"Plastics are the only category prohibited from sea discharge with no distance or area exception."},
    {q:"Minimum distance from shore to discharge comminuted food waste (outside special areas)?",opts:["1 mile","3 miles","12 miles","50 miles"],correct:1,expl:"Comminuted food waste (under 25mm) may be discharged beyond 3 nautical miles from shore."},
    {q:"What must be done with incinerator ash if the burned waste contained plastic?",opts:["Discharge it normally at sea","Treat it as plastic - never discharge at sea","Hand it over only in special areas","No particular rule applies"],correct:1,expl:"Ash resulting from incinerated plastic waste is considered plastic and can never be discharged at sea."},
    {q:"How was the Fukuichi Gyogyo Kabushiki Kaisha case (2019) discovered?",opts:["An internal whistleblower","A routine port inspection","A media leak","A voluntary company audit"],correct:1,expl:"Unlike magic pipe cases, this case was revealed by a routine port inspection of the vessel in Guam, with no internal whistleblower."},
    {q:"What must the Garbage Record Book contain, like the Oil Record Book?",opts:["No signature is needed","Entries signed by the responsible officer, with legal value","Only a total weight list","Nothing, it is a simple internal log"],correct:1,expl:"The Garbage Record Book is a legal document signed by the responsible officer, just like the Oil Record Book."},
  ],
  es:[
    {q:"¿Qué categoría de residuos está prohibida de descarga en cualquier lugar del mar, sin excepción?",opts:["Residuos alimentarios","Plásticos","Residuos de carga","Papel"],correct:1,expl:"Los plásticos son la única categoría prohibida de descarga al mar sin excepción de distancia ni zona."},
    {q:"¿Distancia mínima de la costa para descargar residuos alimentarios triturados (fuera de zona especial)?",opts:["1 milla","3 millas","12 millas","50 millas"],correct:1,expl:"Los residuos alimentarios triturados (menos de 25mm) pueden descargarse más allá de 3 millas náuticas de la costa."},
    {q:"¿Qué debe hacerse con las cenizas del incinerador si los residuos quemados contenían plástico?",opts:["Descargarlas normalmente al mar","Tratarlas como plástico - nunca descargar al mar","Entregarlas solo en zona especial","Ninguna regla particular"],correct:1,expl:"Las cenizas de residuos plásticos incinerados se consideran plástico y nunca pueden descargarse al mar."},
    {q:"¿Cómo se descubrió el caso Fukuichi Gyogyo Kabushiki Kaisha (2019)?",opts:["Un denunciante interno","Una inspección portuaria de rutina","Una filtración mediática","Una auditoría voluntaria de la compañía"],correct:1,expl:"A diferencia de los casos de magic pipe, este caso fue revelado por una inspección portuaria de rutina del buque en Guam, sin denunciante interno."},
    {q:"¿Qué debe contener el Garbage Record Book, igual que el Oil Record Book?",opts:["No se necesita firma","Entradas firmadas por el oficial responsable, con valor legal","Solo una lista de peso total","Nada, es un simple registro interno"],correct:1,expl:"El Garbage Record Book es un documento legal firmado por el oficial responsable, igual que el Oil Record Book."},
  ],
  pt:[
    {q:"Qual categoria de resíduos é proibida de descarga em qualquer lugar do mar, sem exceção?",opts:["Resíduos alimentares","Plásticos","Resíduos de carga","Papel"],correct:1,expl:"Os plásticos são a única categoria proibida de descarga no mar sem exceção de distância ou zona."},
    {q:"Distância mínima da costa para descarregar resíduos alimentares triturados (fora de zona especial)?",opts:["1 milha","3 milhas","12 milhas","50 milhas"],correct:1,expl:"Os resíduos alimentares triturados (menos de 25mm) podem ser descarregados além de 3 milhas náuticas da costa."},
    {q:"O que deve ser feito com as cinzas do incinerador se os resíduos queimados continham plástico?",opts:["Descarregá-las normalmente no mar","Tratá-las como plástico - nunca descarregar no mar","Entregá-las apenas em zona especial","Nenhuma regra particular"],correct:1,expl:"As cinzas de resíduos plásticos incinerados são consideradas plástico e nunca podem ser descarregadas no mar."},
    {q:"Como o caso Fukuichi Gyogyo Kabushiki Kaisha (2019) foi descoberto?",opts:["Um denunciante interno","Uma inspeção portuária de rotina","Um vazamento midiático","Uma auditoria voluntária da empresa"],correct:1,expl:"Diferente dos casos de magic pipe, este caso foi revelado por uma inspeção portuária de rotina do navio em Guam, sem denunciante interno."},
    {q:"O que o Garbage Record Book deve conter, como o Oil Record Book?",opts:["Nenhuma assinatura é necessária","Entradas assinadas pelo oficial responsável, com valor legal","Apenas uma lista de peso total","Nada, é um simples registo interno"],correct:1,expl:"O Garbage Record Book é um documento legal assinado pelo oficial responsável, tal como o Oil Record Book."},
  ],
};

const BANK = {
  fr:[
    {q:"Quelle catégorie de déchets nécessite un broyage à moins de 25mm avant tout rejet autorisé ?",opts:["Plastiques","Déchets alimentaires","Cendres d'incinérateur","Métaux"],correct:1,expl:"Les déchets alimentaires doivent être broyés à moins de 25mm pour pouvoir être rejetés au-delà de 3 milles des côtes."},
    {q:"Qu'est-ce qu'un déchet classé HME (Harmful to the Marine Environment) ?",opts:["Un déchet alimentaire périmé","Un résidu de cargaison toxique ou contenant du plastique en vrac, dont le rejet est totalement interdit","Un déchet domestique classique","Un type de carburant"],correct:1,expl:"HME désigne des résidus de cargaison toxiques ou contenant du plastique en vrac - leur rejet est totalement interdit, sans exception de distance."},
    {q:"Le papier, le verre et le métal font-ils partie des catégories réglementées par l'Annexe V ?",opts:["Non, seuls les plastiques sont concernés","Oui, chacun avec ses propres règles de distance et traitement","Seulement le verre","Seulement le papier"],correct:1,expl:"L'Annexe V couvre bien plus que les plastiques : papier, verre, métal, déchets domestiques et opérationnels ont chacun leurs propres règles."},
    {q:"Qui doit nommer le Garbage Management Plan à bord ?",opts:["Aucune personne n'est designee","Une personne responsable de sa mise en oeuvre, generalement un officier senior","Uniquement le proprietaire du navire","L'administration portuaire"],correct:1,expl:"Le GMP doit designer une personne responsable de sa mise en oeuvre a bord, generalement un officier senior."},
    {q:"Où les affiches résumant les règles de tri et de rejet doivent-elles être visibles ?",opts:["Uniquement a la passerelle","Dans les espaces communs et de preparation des repas","Dans la cabine du capitaine uniquement","Aucun affichage n'est exige"],correct:1,expl:"Des affiches doivent etre visibles dans les espaces communs et de preparation des repas, dans des langues comprises par l'equipage."},
    {q:"Durée minimale de conservation du Garbage Record Book à bord ?",opts:["6 mois","2 ans minimum","10 ans","Aucune duree fixee"],correct:1,expl:"Le GRB doit etre conserve a bord au minimum 2 ans apres la derniere entree."},
    {q:"Un petit navire peut-il naviguer sans Garbage Record Book sur simple supposition de dérogation ?",opts:["Oui, sans probleme","Non, une derogation ecrite officielle de l'administration du pavillon est necessaire","Oui, si le capitaine l'autorise verbalement","Oui, pour tous les navires de moins de 500 GT"],correct:1,expl:"Une derogation doit toujours etre confirmee par ecrit par l'administration du pavillon - naviguer sur simple supposition constitue une deficience."},
    {q:"Dans une zone spéciale MARPOL, les règles de distance standard pour les déchets sont-elles maintenues ?",opts:["Oui, sans changement","Non, elles sont suspendues ou fortement reduites","Oui, mais doublees","Cela depend uniquement du pavillon"],correct:1,expl:"En zone speciale, les distances standard de rejet sont suspendues ou fortement reduites par rapport aux eaux ordinaires."},
    {q:"Depuis quelle date les incinérateurs de bord doivent-ils disposer d'un certificat de type approuvé ?",opts:["1er janvier 1990","1er janvier 2000","1er janvier 2010","Aucune date n'est fixee"],correct:1,expl:"Tout incinerateur installe apres le 1er janvier 2000 doit disposer d'un certificat de type approuve conforme a l'Annexe VI."},
    {q:"Quels déchets ne peuvent jamais être incinérés à bord, même hors zone spéciale ?",opts:["Le papier uniquement","Les PCB, metaux lourds et dechets emballes contenant du chlore/halogenes","Les dechets alimentaires uniquement","Aucun dechet n'est interdit a l'incineration"],correct:1,expl:"Les PCB, dechets contenant des metaux lourds et dechets emballes au chlore/halogenes sont interdits a l'incineration en toutes circonstances."},
    {q:"Le navire peut-il justifier un rejet en mer par l'absence supposee d'installations portuaires de reception ?",opts:["Oui, c'est une justification valable","Non, chaque port doit disposer de telles installations et leur absence ne justifie jamais un rejet","Oui, uniquement en cas d'urgence","Cela depend du type de dechet"],correct:1,expl:"Chaque port doit disposer d'installations de reception par categorie ; leur absence supposee ne justifie jamais un rejet en mer."},
    {q:"Pourquoi ne faut-il jamais mélanger les déchets alimentaires et les plastiques ?",opts:["Cela n'a aucune importance","Ils suivent des regles de distance differentes et le melange rend l'ensemble non conforme","Cela accelere le traitement","Il n'existe pas de regle a ce sujet"],correct:1,expl:"Les plastiques sont interdits partout tandis que les dechets alimentaires suivent des regles de distance specifiques - le melange empeche tout traitement conforme."},
    {q:"Quelle a été la cause principale de l'infraction dans l'affaire Fukuichi Gyogyo Kabushiki Kaisha ?",opts:["Une panne mecanique","Le rejet regulier d'engins de peche et de plastiques sans tri ni enregistrement conforme","Un incendie a bord","Une erreur de navigation"],correct:1,expl:"L'entreprise rejetait regulierement des engins de peche et des plastiques en mer, avec un Garbage Record Book tenu de maniere fictive."},
    {q:"Les engins de pêche perdus ou rejetés suivent-ils des règles différentes des autres plastiques ?",opts:["Oui, ils sont exemptes de toute regle","Non, ils sont soumis aux memes regles que les autres plastiques","Oui, ils peuvent etre rejetes librement en haute mer","Cela depend du type de peche"],correct:1,expl:"Les engins de peche perdus ou rejetes sont soumis aux memes regles strictes que les autres dechets plastiques."},
    {q:"Quel type d'inspection a révélé la fraude dans l'affaire Fukuichi Gyogyo, en l'absence de dénonciateur ?",opts:["Un audit interne volontaire","Une inspection portuaire de routine","Une enquete journalistique","Une plainte de pecheurs concurrents"],correct:1,expl:"C'est une inspection portuaire de routine du navire a Guam qui a revele les incoherences documentaires, sans aucun denonciateur interne."},
  ],
  en:[
    {q:"Which waste category requires comminution to under 25mm before any authorized discharge?",opts:["Plastics","Food waste","Incinerator ash","Metal"],correct:1,expl:"Food waste must be comminuted to under 25mm before it can be discharged beyond 3 miles from shore."},
    {q:"What is a waste classified as HME (Harmful to the Marine Environment)?",opts:["Expired food waste","A toxic cargo residue or one containing bulk plastic, whose discharge is fully prohibited","A regular domestic waste","A type of fuel"],correct:1,expl:"HME refers to toxic cargo residues or those containing bulk plastic - their discharge is fully prohibited, with no distance exception."},
    {q:"Are paper, glass and metal part of the categories regulated by Annex V?",opts:["No, only plastics are covered","Yes, each with its own distance and treatment rules","Only glass","Only paper"],correct:1,expl:"Annex V covers far more than plastics: paper, glass, metal, domestic and operational waste each have their own rules."},
    {q:"Who must the Garbage Management Plan designate on board?",opts:["No one is designated","A person responsible for its implementation, usually a senior officer","Only the vessel's owner","The port authority"],correct:1,expl:"The GMP must designate a person responsible for its implementation on board, usually a senior officer."},
    {q:"Where must posters summarizing sorting and discharge rules be visible?",opts:["Only on the bridge","In common areas and food preparation spaces","Only in the Master's cabin","No posting is required"],correct:1,expl:"Posters must be visible in common areas and food preparation spaces, in languages understood by the crew."},
    {q:"Minimum retention period for the Garbage Record Book on board?",opts:["6 months","Minimum 2 years","10 years","No set period"],correct:1,expl:"The GRB must be kept on board for a minimum of 2 years after the last entry."},
    {q:"Can a small vessel sail without a Garbage Record Book on a mere assumed waiver?",opts:["Yes, no problem","No, an official written waiver from the flag administration is required","Yes, if the Master verbally allows it","Yes, for all vessels under 500 GT"],correct:1,expl:"A waiver must always be confirmed in writing by the flag administration - sailing on a mere assumption is a deficiency."},
    {q:"In a MARPOL special area, are standard waste distance rules maintained?",opts:["Yes, unchanged","No, they are suspended or heavily reduced","Yes, but doubled","It depends solely on the flag"],correct:1,expl:"In special areas, standard discharge distances are suspended or heavily reduced compared to ordinary waters."},
    {q:"Since what date must onboard incinerators hold a type approval certificate?",opts:["January 1, 1990","January 1, 2000","January 1, 2010","No date is set"],correct:1,expl:"Any incinerator installed after January 1, 2000 must hold a valid type approval certificate under Annex VI."},
    {q:"Which waste can never be incinerated on board, even outside special areas?",opts:["Paper only","PCBs, heavy metals and packaged waste containing chlorine/halogens","Food waste only","No waste is prohibited from incineration"],correct:1,expl:"PCBs, heavy metal-containing waste and chlorine/halogen packaged waste are prohibited from incineration under all circumstances."},
    {q:"Can a vessel justify a sea discharge by an assumed absence of port reception facilities?",opts:["Yes, that is a valid justification","No, every port must provide such facilities and their assumed absence never justifies discharge","Yes, only in an emergency","It depends on the waste type"],correct:1,expl:"Every port must provide category-based reception facilities; their assumed absence never justifies a sea discharge."},
    {q:"Why should food waste and plastic never be mixed?",opts:["It does not matter at all","They follow different distance rules and mixing makes the whole batch non-compliant","It speeds up processing","No rule exists on this"],correct:1,expl:"Plastics are prohibited everywhere while food waste follows specific distance rules - mixing them prevents any compliant treatment."},
    {q:"What was the main cause of the violation in the Fukuichi Gyogyo Kabushiki Kaisha case?",opts:["A mechanical failure","Regular discharge of fishing gear and plastics without sorting or compliant logging","An onboard fire","A navigation error"],correct:1,expl:"The company regularly discharged fishing gear and plastics at sea, with a fictitiously kept Garbage Record Book."},
    {q:"Do lost or discarded fishing gear follow different rules from other plastics?",opts:["Yes, they are exempt from any rule","No, they are subject to the same rules as other plastics","Yes, they can be freely discharged offshore","It depends on the fishing type"],correct:1,expl:"Lost or discarded fishing gear is subject to the same strict rules as other plastic waste."},
    {q:"What type of inspection revealed the fraud in the Fukuichi Gyogyo case, in the absence of a whistleblower?",opts:["A voluntary internal audit","A routine port inspection","A journalistic investigation","A complaint from competing fishermen"],correct:1,expl:"A routine port inspection of the vessel in Guam revealed the documentary inconsistencies, with no internal whistleblower involved."},
  ],
  es:[
    {q:"¿Qué categoría de residuos requiere trituración a menos de 25mm antes de cualquier descarga autorizada?",opts:["Plásticos","Residuos alimentarios","Cenizas de incinerador","Metal"],correct:1,expl:"Los residuos alimentarios deben triturarse a menos de 25mm antes de poder descargarse más allá de 3 millas de la costa."},
    {q:"¿Qué es un residuo clasificado como HME (Harmful to the Marine Environment)?",opts:["Un residuo alimentario caducado","Un residuo de carga tóxico o que contiene plástico a granel, cuya descarga está totalmente prohibida","Un residuo doméstico normal","Un tipo de combustible"],correct:1,expl:"HME se refiere a residuos de carga tóxicos o que contienen plástico a granel - su descarga está totalmente prohibida, sin excepción de distancia."},
    {q:"¿El papel, el vidrio y el metal forman parte de las categorías reguladas por el Anexo V?",opts:["No, solo los plásticos están cubiertos","Sí, cada uno con sus propias reglas de distancia y tratamiento","Solo el vidrio","Solo el papel"],correct:1,expl:"El Anexo V cubre mucho más que los plásticos: papel, vidrio, metal, residuos domésticos y operacionales tienen cada uno sus propias reglas."},
    {q:"¿Quién debe designar el Garbage Management Plan a bordo?",opts:["No se designa a nadie","Una persona responsable de su implementación, generalmente un oficial senior","Solo el propietario del buque","La autoridad portuaria"],correct:1,expl:"El GMP debe designar a una persona responsable de su implementación a bordo, generalmente un oficial senior."},
    {q:"¿Dónde deben estar visibles los carteles que resumen las reglas de clasificación y descarga?",opts:["Solo en el puente","En espacios comunes y de preparación de alimentos","Solo en el camarote del Capitán","No se exige ningún cartel"],correct:1,expl:"Los carteles deben estar visibles en espacios comunes y de preparación de alimentos, en idiomas comprendidos por la tripulación."},
    {q:"¿Duración mínima de conservación del Garbage Record Book a bordo?",opts:["6 meses","Mínimo 2 años","10 años","Sin plazo fijado"],correct:1,expl:"El GRB debe conservarse a bordo un mínimo de 2 años después de la última entrada."},
    {q:"¿Puede un buque pequeño navegar sin Garbage Record Book por una simple suposición de exención?",opts:["Sí, sin problema","No, se requiere una exención escrita oficial de la administración del pabellón","Sí, si el Capitán lo autoriza verbalmente","Sí, para todos los buques de menos de 500 GT"],correct:1,expl:"Una exención siempre debe confirmarse por escrito por la administración del pabellón - navegar por simple suposición es una deficiencia."},
    {q:"¿En una zona especial MARPOL, se mantienen las reglas de distancia estándar para residuos?",opts:["Sí, sin cambios","No, se suspenden o reducen drásticamente","Sí, pero se duplican","Depende únicamente del pabellón"],correct:1,expl:"En zonas especiales, las distancias estándar de descarga se suspenden o reducen drásticamente respecto a aguas ordinarias."},
    {q:"¿Desde qué fecha los incineradores de a bordo deben contar con certificado de tipo aprobado?",opts:["1 de enero de 1990","1 de enero de 2000","1 de enero de 2010","No se fija ninguna fecha"],correct:1,expl:"Cualquier incinerador instalado después del 1 de enero de 2000 debe contar con un certificado de tipo aprobado conforme al Anexo VI."},
    {q:"¿Qué residuos nunca pueden incinerarse a bordo, incluso fuera de zona especial?",opts:["Solo el papel","PCB, metales pesados y residuos empaquetados que contengan cloro/halógenos","Solo residuos alimentarios","Ningún residuo está prohibido para incineración"],correct:1,expl:"Los PCB, residuos con metales pesados y residuos empaquetados con cloro/halógenos están prohibidos para incineración en todas las circunstancias."},
    {q:"¿Puede el buque justificar una descarga al mar por la ausencia supuesta de instalaciones portuarias de recepción?",opts:["Sí, es una justificación válida","No, cada puerto debe contar con dichas instalaciones y su ausencia supuesta nunca justifica una descarga","Sí, solo en caso de emergencia","Depende del tipo de residuo"],correct:1,expl:"Cada puerto debe contar con instalaciones de recepción por categoría; su ausencia supuesta nunca justifica una descarga al mar."},
    {q:"¿Por qué nunca se deben mezclar los residuos alimentarios y los plásticos?",opts:["No tiene ninguna importancia","Siguen reglas de distancia diferentes y mezclarlos hace que todo el lote sea no conforme","Acelera el tratamiento","No existe ninguna regla al respecto"],correct:1,expl:"Los plásticos están prohibidos en todas partes mientras que los residuos alimentarios siguen reglas de distancia específicas - mezclarlos impide cualquier tratamiento conforme."},
    {q:"¿Cuál fue la causa principal de la infracción en el caso Fukuichi Gyogyo Kabushiki Kaisha?",opts:["Un fallo mecánico","La descarga regular de artes de pesca y plásticos sin clasificación ni registro conforme","Un incendio a bordo","Un error de navegación"],correct:1,expl:"La empresa descargaba regularmente artes de pesca y plásticos al mar, con un Garbage Record Book llevado de forma ficticia."},
    {q:"¿Las artes de pesca perdidas o desechadas siguen reglas diferentes a otros plásticos?",opts:["Sí, están exentas de cualquier regla","No, están sujetas a las mismas reglas que otros plásticos","Sí, pueden descargarse libremente en alta mar","Depende del tipo de pesca"],correct:1,expl:"Las artes de pesca perdidas o desechadas están sujetas a las mismas reglas estrictas que otros residuos plásticos."},
    {q:"¿Qué tipo de inspección reveló el fraude en el caso Fukuichi Gyogyo, sin denunciante?",opts:["Una auditoría interna voluntaria","Una inspección portuaria de rutina","Una investigación periodística","Una queja de pescadores competidores"],correct:1,expl:"Una inspección portuaria de rutina del buque en Guam reveló las incoherencias documentales, sin ningún denunciante interno involucrado."},
  ],
  pt:[
    {q:"Qual categoria de resíduos exige trituração a menos de 25mm antes de qualquer descarga autorizada?",opts:["Plásticos","Resíduos alimentares","Cinzas de incinerador","Metal"],correct:1,expl:"Os resíduos alimentares devem ser triturados a menos de 25mm antes de poderem ser descarregados além de 3 milhas da costa."},
    {q:"O que é um resíduo classificado como HME (Harmful to the Marine Environment)?",opts:["Um resíduo alimentar vencido","Um resíduo de carga tóxico ou que contém plástico a granel, cuja descarga é totalmente proibida","Um resíduo doméstico normal","Um tipo de combustível"],correct:1,expl:"HME refere-se a resíduos de carga tóxicos ou que contêm plástico a granel - sua descarga é totalmente proibida, sem exceção de distância."},
    {q:"Papel, vidro e metal fazem parte das categorias regulamentadas pelo Anexo V?",opts:["Não, apenas os plásticos são cobertos","Sim, cada um com suas próprias regras de distância e tratamento","Só o vidro","Só o papel"],correct:1,expl:"O Anexo V cobre muito mais do que plásticos: papel, vidro, metal, resíduos domésticos e operacionais têm cada um suas próprias regras."},
    {q:"Quem o Garbage Management Plan deve designar a bordo?",opts:["Nenhuma pessoa é designada","Uma pessoa responsável pela sua implementação, geralmente um oficial senior","Apenas o proprietário do navio","A autoridade portuária"],correct:1,expl:"O GMP deve designar uma pessoa responsável pela sua implementação a bordo, geralmente um oficial senior."},
    {q:"Onde os cartazes resumindo as regras de triagem e descarga devem estar visíveis?",opts:["Apenas no passadiço","Em espaços comuns e de preparação de refeições","Apenas no camarote do Comandante","Nenhum cartaz é exigido"],correct:1,expl:"Os cartazes devem estar visíveis em espaços comuns e de preparação de refeições, em idiomas compreendidos pela tripulação."},
    {q:"Duração mínima de conservação do Garbage Record Book a bordo?",opts:["6 meses","Mínimo 2 anos","10 anos","Sem prazo definido"],correct:1,expl:"O GRB deve ser conservado a bordo por no mínimo 2 anos após a última entrada."},
    {q:"Um navio pequeno pode navegar sem Garbage Record Book por uma simples suposição de isenção?",opts:["Sim, sem problema","Não, é necessária uma isenção escrita oficial da administração da bandeira","Sim, se o Comandante autorizar verbalmente","Sim, para todos os navios com menos de 500 GT"],correct:1,expl:"Uma isenção deve sempre ser confirmada por escrito pela administração da bandeira - navegar por simples suposição é uma deficiência."},
    {q:"Numa zona especial MARPOL, as regras de distância padrão para resíduos são mantidas?",opts:["Sim, sem alteração","Não, são suspensas ou fortemente reduzidas","Sim, mas duplicadas","Depende apenas da bandeira"],correct:1,expl:"Em zonas especiais, as distâncias padrão de descarga são suspensas ou fortemente reduzidas em relação às águas comuns."},
    {q:"Desde que data os incineradores de bordo devem possuir certificado de tipo aprovado?",opts:["1 de janeiro de 1990","1 de janeiro de 2000","1 de janeiro de 2010","Nenhuma data é fixada"],correct:1,expl:"Qualquer incinerador instalado após 1 de janeiro de 2000 deve possuir um certificado de tipo aprovado conforme o Anexo VI."},
    {q:"Quais resíduos nunca podem ser incinerados a bordo, mesmo fora de zona especial?",opts:["Apenas papel","PCB, metais pesados e resíduos embalados contendo cloro/halogênios","Apenas resíduos alimentares","Nenhum resíduo é proibido para incineração"],correct:1,expl:"PCB, resíduos com metais pesados e resíduos embalados com cloro/halogênios são proibidos para incineração em todas as circunstâncias."},
    {q:"O navio pode justificar uma descarga no mar pela ausência suposta de instalações portuárias de receção?",opts:["Sim, é uma justificativa válida","Não, cada porto deve dispor de tais instalações e sua ausência suposta nunca justifica uma descarga","Sim, apenas em emergência","Depende do tipo de resíduo"],correct:1,expl:"Cada porto deve dispor de instalações de receção por categoria; sua ausência suposta nunca justifica uma descarga no mar."},
    {q:"Por que resíduos alimentares e plástico nunca devem ser misturados?",opts:["Não tem nenhuma importância","Seguem regras de distância diferentes e misturá-los torna todo o lote não conforme","Acelera o tratamento","Não existe nenhuma regra sobre isso"],correct:1,expl:"Os plásticos são proibidos em todos os lugares enquanto os resíduos alimentares seguem regras de distância específicas - misturá-los impede qualquer tratamento conforme."},
    {q:"Qual foi a principal causa da infração no caso Fukuichi Gyogyo Kabushiki Kaisha?",opts:["Uma falha mecânica","A descarga regular de artes de pesca e plásticos sem triagem nem registo conforme","Um incêndio a bordo","Um erro de navegação"],correct:1,expl:"A empresa descarregava regularmente artes de pesca e plásticos no mar, com um Garbage Record Book mantido de forma fictícia."},
    {q:"Artes de pesca perdidas ou descartadas seguem regras diferentes de outros plásticos?",opts:["Sim, estão isentas de qualquer regra","Não, estão sujeitas às mesmas regras que outros plásticos","Sim, podem ser descarregadas livremente em alto mar","Depende do tipo de pesca"],correct:1,expl:"Artes de pesca perdidas ou descartadas estão sujeitas às mesmas regras estritas que outros resíduos plásticos."},
    {q:"Que tipo de inspeção revelou a fraude no caso Fukuichi Gyogyo, na ausência de denunciante?",opts:["Uma auditoria interna voluntária","Uma inspeção portuária de rotina","Uma investigação jornalística","Uma reclamação de pescadores concorrentes"],correct:1,expl:"Uma inspeção portuária de rotina do navio em Guam revelou as incoerências documentais, sem nenhum denunciante interno envolvido."},
  ],
};

function QuestionBank({ lang, onComplete }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);if(onComplete)onComplete();}};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,margin:"8px 0 4px"}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
      <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.green},${C.gold2})`}}/></div>
      <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
      </div>
      {answered&&<div><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
      <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.green},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":"FINISH")}</button></div>}
    </div>
  );
}

function QuizComp({questions,t,onComplete}){
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.green}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.green,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.green:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.green},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d = {
    fr:{
      badge:"🗑️ Module Machine · Leçon 3/6 · ⭐ Premium · 200 XP",
      title:"MARPOL Annexe V : Gestion des déchets",
      intro:"La Leçon 1 t'a présenté l'Annexe V au niveau général : interdiction totale des plastiques, règles de distance pour les autres déchets. Cette leçon transforme ce principe en réflexe quotidien de tri, de documentation et de traçabilité en salle des machines.\n\nObjectif : reconnaître chaque catégorie de déchet, tenir le Garbage Record Book correctement, et comprendre pourquoi le tri documenté sur le papier doit toujours refléter la réalité à bord.",
      p1:"PARTIE 1 - CATÉGORIES DE DÉCHETS",
      s1:"Beaucoup de marins pensent que seuls les plastiques sont concernés par MARPOL Annexe V. En réalité, chaque catégorie de déchet a ses propres règles - les confondre ou les mélanger est une des erreurs les plus fréquentes détectées lors des inspections.",
      p2:"PARTIE 2 - GARBAGE MANAGEMENT PLAN (GMP)",
      s2:"Le GMP est le document de référence qui organise la gestion des déchets à bord. Il ne suffit pas qu'il existe - il doit être appliqué au quotidien et connu de tout l'équipage.",
      p3:"PARTIE 3 - GARBAGE RECORD BOOK (GRB)",
      s3:"Le GRB fonctionne exactement comme l'Oil Record Book vu en Leçon 2 : c'est un document légal, pas un simple registre de tri.",
      p4:"PARTIE 4 - ZONES SPÉCIALES & INCINÉRATEUR",
      s4:"Cette section couvre uniquement les exigences réglementaires liées à l'incinérateur (certificat de type, matières interdites, restrictions de zone) - pas son fonctionnement technique interne.",
      p5:"PARTIE 5 - EXERCICE",
      p6:"PARTIE 6 - CAS RÉEL",
      p7:"PARTIE 7 - BANQUE DE QUESTIONS",
      transitionPhrase:"Un simple sac plastique jeté par négligence peut coûter plus cher qu'une avarie mécanique.",
      closingPhrase:"Chaque déchet jeté à la mer reflète le professionnalisme de l'équipage. Protéger l'océan commence par des décisions simples prises chaque jour à bord.",
      sumT:"POINTS CLÉS",
      sumP:[
        "Les plastiques sont interdits de rejet partout en mer, sans aucune exception",
        "L'Annexe V couvre bien plus que les plastiques : alimentaire, cargaison, domestique, cendres",
        "Le Garbage Management Plan désigne un responsable et doit être affiché et connu de l'équipage",
        "Le Garbage Record Book est un document légal signé, conservé 2 ans minimum",
        "En zone spéciale, les règles de distance standard sont suspendues ou fortement réduites",
        "Mélanger les catégories de déchets rend l'ensemble du lot non conforme",
      ],
      learnedP:[
        "Identifier les catégories de déchets réglementées par l'Annexe V",
        "Comprendre le rôle du Garbage Management Plan",
        "Tenir le Garbage Record Book correctement",
        "Reconnaître les restrictions liées aux zones spéciales et à l'incinérateur",
        "Comprendre comment une fraude Annexe V peut être détectée sans dénonciateur interne",
      ],
    },
    en:{
      badge:"🗑️ Engine Module · Lesson 3/6 · ⭐ Premium · 200 XP",
      title:"MARPOL Annex V: Garbage Management",
      intro:"Lesson 1 introduced Annex V at a general level: total ban on plastics, distance rules for other waste. This lesson turns that principle into a daily habit of sorting, documentation and traceability in the engine room.\n\nGoal: recognize every waste category, keep the Garbage Record Book correctly, and understand why paper-documented sorting must always reflect reality on board.",
      p1:"PART 1 - WASTE CATEGORIES",
      s1:"Many seafarers think only plastics are covered by MARPOL Annex V. In reality, each waste category has its own rules - confusing or mixing them is one of the most common mistakes detected during inspections.",
      p2:"PART 2 - GARBAGE MANAGEMENT PLAN (GMP)",
      s2:"The GMP is the reference document organizing waste management on board. Its existence alone is not enough - it must be applied daily and known by the whole crew.",
      p3:"PART 3 - GARBAGE RECORD BOOK (GRB)",
      s3:"The GRB works exactly like the Oil Record Book seen in Lesson 2: it is a legal document, not a simple sorting log.",
      p4:"PART 4 - SPECIAL AREAS & INCINERATOR",
      s4:"This section covers only the regulatory requirements related to the incinerator (type approval, prohibited materials, area restrictions) - not its internal technical operation.",
      p5:"PART 5 - EXERCISE",
      p6:"PART 6 - REAL CASE",
      p7:"PART 7 - QUESTION BANK",
      transitionPhrase:"Even a technically well-maintained vessel can become non-compliant if procedures are ignored or records are falsified.",
      closingPhrase:"Every piece of waste thrown into the sea reflects the professionalism of the crew. Protecting the ocean begins with everyday decisions on board.",
      sumT:"KEY POINTS",
      sumP:[
        "Plastics are prohibited from discharge everywhere at sea, with no exception",
        "Annex V covers far more than plastics: food, cargo, domestic, ash",
        "The Garbage Management Plan designates a responsible person and must be posted and known by the crew",
        "The Garbage Record Book is a signed legal document, kept for a minimum of 2 years",
        "In special areas, standard distance rules are suspended or heavily reduced",
        "Mixing waste categories makes the entire batch non-compliant",
      ],
      learnedP:[
        "Identify the waste categories regulated by Annex V",
        "Understand the role of the Garbage Management Plan",
        "Keep the Garbage Record Book correctly",
        "Recognize restrictions related to special areas and the incinerator",
        "Understand how an Annex V fraud can be detected without an internal whistleblower",
      ],
    },
    es:{
      badge:"🗑️ Módulo Máquinas · Lección 3/6 · ⭐ Premium · 200 XP",
      title:"MARPOL Anexo V: Gestión de residuos",
      intro:"La Lección 1 presentó el Anexo V a nivel general: prohibición total de plásticos, reglas de distancia para otros residuos. Esta lección convierte ese principio en un hábito diario de clasificación, documentación y trazabilidad en la sala de máquinas.\n\nObjetivo: reconocer cada categoría de residuo, llevar el Garbage Record Book correctamente, y comprender por qué la clasificación documentada en papel debe reflejar siempre la realidad a bordo.",
      p1:"PARTE 1 - CATEGORÍAS DE RESIDUOS",
      s1:"Muchos marinos piensan que solo los plásticos están cubiertos por el Anexo V de MARPOL. En realidad, cada categoría de residuo tiene sus propias reglas - confundirlas o mezclarlas es uno de los errores más comunes detectados en las inspecciones.",
      p2:"PARTE 2 - GARBAGE MANAGEMENT PLAN (GMP)",
      s2:"El GMP es el documento de referencia que organiza la gestión de residuos a bordo. No basta con que exista - debe aplicarse diariamente y ser conocido por toda la tripulación.",
      p3:"PARTE 3 - GARBAGE RECORD BOOK (GRB)",
      s3:"El GRB funciona exactamente como el Oil Record Book visto en la Lección 2: es un documento legal, no un simple registro de clasificación.",
      p4:"PARTE 4 - ZONAS ESPECIALES E INCINERADOR",
      s4:"Esta sección cubre únicamente los requisitos reglamentarios relacionados con el incinerador (certificado de tipo, materiales prohibidos, restricciones de zona) - no su funcionamiento técnico interno.",
      p5:"PARTE 5 - EJERCICIO",
      p6:"PARTE 6 - CASO REAL",
      p7:"PARTE 7 - BANCO DE PREGUNTAS",
      transitionPhrase:"Incluso un buque técnicamente bien mantenido puede volverse no conforme si se ignoran los procedimientos o se falsifican los registros.",
      closingPhrase:"Cada residuo arrojado al mar refleja el profesionalismo de la tripulación. Proteger el océano comienza con decisiones simples tomadas cada día a bordo.",
      sumT:"PUNTOS CLAVE",
      sumP:[
        "Los plásticos están prohibidos de descarga en cualquier lugar del mar, sin excepción",
        "El Anexo V cubre mucho más que los plásticos: alimentario, carga, doméstico, cenizas",
        "El Garbage Management Plan designa a un responsable y debe estar expuesto y ser conocido por la tripulación",
        "El Garbage Record Book es un documento legal firmado, conservado un mínimo de 2 años",
        "En zona especial, las reglas de distancia estándar se suspenden o reducen drásticamente",
        "Mezclar categorías de residuos hace que todo el lote sea no conforme",
      ],
      learnedP:[
        "Identificar las categorías de residuos reguladas por el Anexo V",
        "Comprender el rol del Garbage Management Plan",
        "Llevar el Garbage Record Book correctamente",
        "Reconocer las restricciones relacionadas con zonas especiales y el incinerador",
        "Comprender cómo puede detectarse un fraude Anexo V sin denunciante interno",
      ],
    },
    pt:{
      badge:"🗑️ Módulo Máquinas · Lição 3/6 · ⭐ Premium · 200 XP",
      title:"MARPOL Anexo V: Gestão de resíduos",
      intro:"A Lição 1 apresentou o Anexo V em nível geral: proibição total de plásticos, regras de distância para outros resíduos. Esta lição transforma esse princípio num hábito diário de triagem, documentação e rastreabilidade na casa de máquinas.\n\nObjetivo: reconhecer cada categoria de resíduo, manter o Garbage Record Book corretamente, e compreender por que a triagem documentada no papel deve sempre refletir a realidade a bordo.",
      p1:"PARTE 1 - CATEGORIAS DE RESÍDUOS",
      s1:"Muitos marinheiros pensam que apenas os plásticos são cobertos pelo Anexo V do MARPOL. Na realidade, cada categoria de resíduo tem suas próprias regras - confundi-las ou misturá-las é um dos erros mais comuns detectados em inspeções.",
      p2:"PARTE 2 - GARBAGE MANAGEMENT PLAN (GMP)",
      s2:"O GMP é o documento de referência que organiza a gestão de resíduos a bordo. Não basta existir - deve ser aplicado diariamente e conhecido por toda a tripulação.",
      p3:"PARTE 3 - GARBAGE RECORD BOOK (GRB)",
      s3:"O GRB funciona exatamente como o Oil Record Book visto na Lição 2: é um documento legal, não um simples registo de triagem.",
      p4:"PARTE 4 - ZONAS ESPECIAIS E INCINERADOR",
      s4:"Esta secção cobre apenas as exigências regulamentares relacionadas ao incinerador (certificado de tipo, materiais proibidos, restrições de zona) - não o seu funcionamento técnico interno.",
      p5:"PARTE 5 - EXERCÍCIO",
      p6:"PARTE 6 - CASO REAL",
      p7:"PARTE 7 - BANCO DE QUESTÕES",
      transitionPhrase:"Mesmo um navio tecnicamente bem mantido pode se tornar não conforme se os procedimentos forem ignorados ou os registos falsificados.",
      closingPhrase:"Cada resíduo lançado ao mar reflete o profissionalismo da tripulação. Proteger o oceano começa com decisões simples tomadas todos os dias a bordo.",
      sumT:"PONTOS-CHAVE",
      sumP:[
        "Os plásticos são proibidos de descarga em qualquer lugar do mar, sem exceção",
        "O Anexo V cobre muito mais do que plásticos: alimentar, carga, doméstico, cinzas",
        "O Garbage Management Plan designa um responsável e deve ser exibido e conhecido pela tripulação",
        "O Garbage Record Book é um documento legal assinado, conservado por no mínimo 2 anos",
        "Em zona especial, as regras de distância padrão são suspensas ou fortemente reduzidas",
        "Misturar categorias de resíduos torna todo o lote não conforme",
      ],
      learnedP:[
        "Identificar as categorias de resíduos reguladas pelo Anexo V",
        "Compreender o papel do Garbage Management Plan",
        "Manter o Garbage Record Book corretamente",
        "Reconhecer as restrições relacionadas a zonas especiais e ao incinerador",
        "Compreender como uma fraude do Anexo V pode ser detetada sem denunciante interno",
      ],
    },
  };
  return d[lang] || d.fr;
};

export default function LessonMARPOL_L3({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
  const t=T[lang]||T.fr;const quiz=QUIZ[lang]||QUIZ.fr;const lc=getContent(lang);
  const [phase, setPhase] = useState("content");
  const [bankDone, setBankDone] = useState(false);const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#031a0a 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.green}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.green,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🗑️ {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 3/6":lang==="en"?"Lesson 3/6":lang==="es"?"Lección 3/6":"Lição 3/6"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.green,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.green},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          {phase==="content"&&<div>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(30,138,74,0.15)",border:`1px solid ${C.green}44`,fontSize:11,color:C.green,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.green}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>

            <SL icon="🗑️" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🗑️ {lang==="fr"?"CATÉGORIES DE DÉCHETS - INTERACTIF":lang==="en"?"WASTE CATEGORIES - INTERACTIVE":lang==="es"?"CATEGORÍAS DE RESIDUOS - INTERACTIVO":"CATEGORIAS DE RESÍDUOS - INTERATIVO"}</div>
              <WasteCategoriesSVG lang={lang}/>
            </Card>

            <SL icon="📝" text={lc.p2} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.teal}33`}}>
              <div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📝 {lang==="fr"?"GMP - INTERACTIF":lang==="en"?"GMP - INTERACTIVE":lang==="es"?"GMP - INTERACTIVO":"GMP - INTERATIVO"}</div>
              <GMPSVG lang={lang}/>
            </Card>

            <SL icon="📋" text={lc.p3} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold2}33`,background:"linear-gradient(135deg,rgba(232,185,79,0.05),rgba(13,31,60,0.8))"}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📋 {lang==="fr"?"GRB - INTERACTIF":lang==="en"?"GRB - INTERACTIVE":lang==="es"?"GRB - INTERACTIVO":"GRB - INTERATIVO"}</div>
              <GRBSVG lang={lang}/>
            </Card>

            <SL icon="🗺️" text={lc.p4} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}33`}}>
              <div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🗺️ {lang==="fr"?"ZONES SPÉCIALES & INCINÉRATEUR":lang==="en"?"SPECIAL AREAS & INCINERATOR":lang==="es"?"ZONAS ESPECIALES E INCINERADOR":"ZONAS ESPECIAIS E INCINERADOR"}</div>
              <SpecialAreasSVG lang={lang}/>
            </Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><GarbageChecklist lang={lang}/></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise3 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <div style={{padding:"10px 14px",marginBottom:10,borderRadius:10,background:"rgba(255,255,255,0.04)",fontSize:12,color:C.gold2,fontStyle:"italic",lineHeight:1.6,textAlign:"center"}}>{lc.transitionPhrase}</div>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} onComplete={()=>setBankDone(true)}/></Card>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(30,138,74,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.green}33`}}>
              <div style={{fontSize:11,color:C.green,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.green},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,boxShadow:"0 10px 36px rgba(30,138,74,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </div>}

          {phase==="quiz"&&<div>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz - MARPOL Annexe V":lang==="en"?"Quiz - MARPOL Annex V":lang==="es"?"Quiz - MARPOL Anexo V":"Quiz - MARPOL Anexo V"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 3":lang==="en"?"Lesson 3":lang==="es"?"Lección 3":"Lição 3"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </div>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(30,138,74,0.15)",border:`1px solid ${C.green}55`,fontSize:14,color:C.green,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <div style={{textAlign:"center",padding:"14px 10px",marginBottom:16,fontSize:12,color:C.gold2,fontFamily:"Courier New",fontStyle:"italic",lineHeight:1.7,borderTop:"1px solid rgba(255,255,255,0.08)",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>{lc.closingPhrase}</div>
            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.green},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(30,138,74,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 4 - POLLUTION ATMOSPHÉRIQUE (ANNEXE VI) →":lang==="en"?"LESSON 4 - AIR POLLUTION (ANNEX VI) →":lang==="es"?"LECCIÓN 4 - CONTAMINACIÓN ATMOSFÉRICA (ANEXO VI) →":"LIÇÃO 4 - POLUIÇÃO ATMOSFÉRICA (ANEXO VI) →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
