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

function Stars(){const [s,setS]=useState<{x:number;y:number;sz:number;dur:number;delay:number}[]>([]);useEffect(()=>{setS(Array.from({length:16},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6})));},[]);return(<div><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></div>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.green}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

// ══════════════════════════════════════
// SVG 1 - SOURCES OF OILY POLLUTION
// ══════════════════════════════════════
function OilSourcesSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const sources = [
    { id:"bilge", icon:"🌊", color:C.blue2,
      label:{fr:"Eaux de cale",en:"Bilge water",es:"Agua de sentina",pt:"Água de porão"},
      desc:{fr:"Melange eau + huile qui s'accumule au fond de la salle des machines (fuites, condensation, lavages). Doit passer par le separateur (OWS) avant tout rejet. Source la plus frequente de pollution accidentelle ou volontaire.",en:"Water and oil mixture accumulating at the bottom of the engine room (leaks, condensation, washing). Must pass through the OWS before any discharge. Most frequent source of accidental or deliberate pollution.",es:"Mezcla de agua y aceite que se acumula en el fondo de la sala de maquinas (fugas, condensacion, lavados). Debe pasar por el separador (OWS) antes de cualquier descarga.",pt:"Mistura de agua e oleo que se acumula no fundo da casa de maquinas (fugas, condensacao, lavagens). Deve passar pelo separador (OWS) antes de qualquer descarga."} },
    { id:"rags", icon:"🧽", color:C.orange,
      label:{fr:"Chiffons et dechets souilles",en:"Oily rags and waste",es:"Trapos y residuos con aceite",pt:"Panos e residuos com oleo"},
      desc:{fr:"Chiffons, filtres et absorbants utilises pour le nettoyage et impregnes d'huile. Ne jamais jeter a la mer ni brûler sans autorisation - stockage separe a bord puis remise a terre (port reception facility).",en:"Rags, filters and absorbents used for cleaning and soaked in oil. Never discharge at sea or burn without authorization - store separately on board then hand over ashore (port reception facility).",es:"Trapos, filtros y absorbentes usados para la limpieza e impregnados de aceite. Nunca desechar al mar - almacenamiento separado a bordo y entrega en tierra.",pt:"Panos, filtros e absorventes usados na limpeza e impregnados de oleo. Nunca descartar no mar - armazenamento separado a bordo e entrega em terra."} },
    { id:"leaks", icon:"💧", color:C.red,
      label:{fr:"Fuites fuel/huile de graissage",en:"Fuel/lube oil leaks",es:"Fugas de combustible/lubricante",pt:"Fugas de combustivel/lubrificante"},
      desc:{fr:"Fuites au niveau des pompes, joints, brides et purificateurs. Chaque fuite non traitee augmente le volume d'eaux de cale a traiter et le risque de rejet non conforme. Une maintenance preventive reduit directement le risque MARPOL.",en:"Leaks at pumps, seals, flanges and purifiers. Every untreated leak increases the volume of bilge water to treat and the risk of non-compliant discharge. Preventive maintenance directly reduces MARPOL risk.",es:"Fugas en bombas, juntas, bridas y purificadores. Cada fuga no tratada aumenta el volumen de agua de sentina a tratar y el riesgo de descarga no conforme.",pt:"Fugas em bombas, juntas, flanges e purificadores. Cada fuga nao tratada aumenta o volume de agua de porao a tratar e o risco de descarga nao conforme."} },
    { id:"tankclean", icon:"🛢️", color:C.teal,
      label:{fr:"Residus de nettoyage de citernes",en:"Tank cleaning residues",es:"Residuos de limpieza de tanques",pt:"Residuos de limpeza de tanques"},
      desc:{fr:"Residus generes lors du nettoyage des citernes a combustible ou de soutage. Consideres comme des 'slops' - stockes dans les slop tanks, jamais rejetes directement, traites par le separateur ou remis a terre.",en:"Residues generated when cleaning fuel or bunker tanks. Considered 'slops' - stored in slop tanks, never discharged directly, treated by the separator or handed over ashore.",es:"Residuos generados al limpiar tanques de combustible o de bunker. Considerados 'slops' - almacenados en los slop tanks, nunca descargados directamente.",pt:"Residuos gerados na limpeza de tanques de combustivel ou de bunker. Considerados 'slops' - armazenados nos slop tanks, nunca descarregados diretamente."} },
  ];
  const sel_ = sel ? sources.find(s=>s.id===sel) : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
        {sources.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)}
            style={{padding:"10px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===s.id?`${s.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===s.id?s.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:4}}>{s.icon}</div>
            <div style={{fontSize:10,color:sel===s.id?s.color:C.muted,fontWeight:700,lineHeight:1.3}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>:<div style={{textAlign:"center",padding:"10px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche une source pour les détails":lang==="en"?"Tap a source for details":lang==="es"?"Toca una fuente para detalles":"Toque numa fonte para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 - OWS COMPLIANT OPERATION
// ══════════════════════════════════════
function OWSComplianceSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"alarm", icon:"🚨", color:C.red,
      label:{fr:"Alarme 15 ppm",en:"15 ppm alarm",es:"Alarma 15 ppm",pt:"Alarme 15 ppm"},
      desc:{fr:"L'Oil Content Meter mesure en continu la teneur en huile de l'eau traitee. Au-dela de 15 ppm, une alarme se declenche automatiquement. Ignorer ou desactiver cette alarme est une infraction grave, meme sans rejet reel.",en:"The Oil Content Meter continuously measures the oil content of treated water. Above 15 ppm, an alarm triggers automatically. Ignoring or disabling this alarm is a serious offense, even without an actual discharge.",es:"El Oil Content Meter mide continuamente el contenido de aceite del agua tratada. Por encima de 15 ppm, se activa una alarma automaticamente. Ignorar o desactivar esta alarma es una infraccion grave.",pt:"O Oil Content Meter mede continuamente o teor de oleo da agua tratada. Acima de 15 ppm, um alarme dispara automaticamente. Ignorar ou desativar esse alarme e uma infracao grave."} },
    { id:"stop", icon:"⛔", color:C.orange,
      label:{fr:"Arret automatique",en:"Automatic stopping device",es:"Dispositivo de paro automatico",pt:"Dispositivo de parada automatica"},
      desc:{fr:"Le systeme doit arreter automatiquement le rejet en mer des que la limite de 15 ppm est depassee. Ce dispositif ne doit jamais etre contourne, verrouille en position ouverte, ni desactive - c'est exactement ce mecanisme qu'un 'magic pipe' cherche a court-circuiter.",en:"The system must automatically stop discharge to sea as soon as the 15 ppm limit is exceeded. This device must never be bypassed, locked open, or disabled - this is exactly the mechanism a 'magic pipe' seeks to circumvent.",es:"El sistema debe detener automaticamente la descarga al mar en cuanto se supera el limite de 15 ppm. Este dispositivo nunca debe ser eludido ni desactivado.",pt:"O sistema deve parar automaticamente a descarga no mar assim que o limite de 15 ppm for excedido. Este dispositivo nunca deve ser contornado nem desativado."} },
    { id:"sample", icon:"🧪", color:C.teal,
      label:{fr:"Point d'echantillonnage",en:"Sampling point",es:"Punto de muestreo",pt:"Ponto de amostragem"},
      desc:{fr:"Point d'acces officiel permettant a un inspecteur PSC de prelever un echantillon independant de l'eau rejetee. Doit rester accessible et non modifie - toute alteration constatee est une preuve directe de fraude.",en:"Official access point allowing a PSC inspector to take an independent sample of discharged water. Must remain accessible and unmodified - any observed alteration is direct evidence of fraud.",es:"Punto de acceso oficial que permite a un inspector PSC tomar una muestra independiente del agua descargada. Debe permanecer accesible y sin modificar.",pt:"Ponto de acesso oficial que permite a um inspetor PSC recolher uma amostra independente da agua descarregada. Deve permanecer acessivel e sem alteracoes."} },
    { id:"log", icon:"📋", color:C.green,
      label:{fr:"Enregistrement continu",en:"Continuous logging",es:"Registro continuo",pt:"Registo continuo"},
      desc:{fr:"Les navires recents disposent d'un enregistreur continu de la teneur en huile, difficile a falsifier. Les valeurs enregistrees doivent correspondre a l'Oil Record Book - toute divergence declenche une investigation immediate lors d'un controle PSC.",en:"Recent vessels have a continuous oil content recorder, difficult to falsify. Recorded values must match the Oil Record Book - any discrepancy triggers immediate investigation during a PSC inspection.",es:"Los buques recientes cuentan con un registrador continuo del contenido de aceite, dificil de falsificar. Los valores registrados deben coincidir con el Oil Record Book.",pt:"Os navios recentes possuem um registador continuo do teor de oleo, dificil de falsificar. Os valores registados devem corresponder ao Oil Record Book."} },
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
        {lang==="fr"?"Touche un element pour les détails":lang==="en"?"Tap an item for details":lang==="es"?"Toca un elemento para detalles":"Toque num item para detalhes"}
      </div>}
      <div style={{marginTop:8,padding:"8px 10px",borderRadius:10,background:"rgba(201,146,42,0.08)",border:`1px solid ${C.gold}33`,fontSize:10,color:C.gold2,textAlign:"center"}}>
        {lang==="fr"?"ℹ️ Le fonctionnement mecanique du separateur est traite dans Auxiliary Systems, Leçon 3 (Purifiers & Separators)":lang==="en"?"ℹ️ The separator's mechanical operation is covered in Auxiliary Systems, Lesson 3 (Purifiers & Separators)":lang==="es"?"ℹ️ El funcionamiento mecanico del separador se trata en Auxiliary Systems, Leccion 3 (Purifiers & Separators)":"ℹ️ O funcionamento mecanico do separador e tratado em Auxiliary Systems, Licao 3 (Purifiers & Separators)"}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 - OIL RECORD BOOK PART I
// ══════════════════════════════════════
function ORBPartISVG({ lang }) {
  const [sel, setSel] = useState(null);
  const codes = [
    { id:"C", icon:"🛢️", color:C.orange,
      label:{fr:"Code C - Elimination des residus",en:"Code C - Disposal of residues",es:"Codigo C - Eliminacion de residuos",pt:"Codigo C - Eliminacao de residuos"},
      desc:{fr:"Elimination des boues (sludge) et residus d'hydrocarbures - incineration a bord, transfert vers une autre citerne, ou remise a une installation portuaire. Chaque operation avec quantite et methode doit etre inscrite immediatement.",en:"Disposal of sludge and oil residues - incineration on board, transfer to another tank, or discharge to a port facility. Each operation with quantity and method must be logged immediately.",es:"Eliminacion de lodos y residuos de hidrocarburos - incineracion a bordo, transferencia a otro tanque, o entrega a una instalacion portuaria. Cada operacion debe registrarse de inmediato.",pt:"Eliminacao de borras e residuos de hidrocarbonetos - incineracao a bordo, transferencia para outro tanque, ou entrega a uma instalacao portuaria. Cada operacao deve ser registada de imediato."} },
    { id:"D", icon:"🖐️", color:C.red,
      label:{fr:"Code D - Rejet manuel",en:"Code D - Non-automatic discharge",es:"Codigo D - Descarga manual",pt:"Codigo D - Descarga manual"},
      desc:{fr:"Rejet a la mer des eaux de cale sans utilisation du systeme automatique de surveillance et de controle. Rare et strictement encadre - necessite une justification precise et une position geographique exacte.",en:"Overboard discharge of bilge water without using the automatic monitoring and control system. Rare and strictly regulated - requires precise justification and exact geographic position.",es:"Descarga al mar de agua de sentina sin usar el sistema automatico de vigilancia y control. Poco frecuente y muy regulada - requiere justificacion precisa y posicion geografica exacta.",pt:"Descarga no mar de agua de porao sem usar o sistema automatico de monitorizacao e controlo. Raro e rigorosamente regulado - exige justificacao precisa e posicao geografica exata."} },
    { id:"E", icon:"⚙️", color:C.teal,
      label:{fr:"Code E - Rejet automatique",en:"Code E - Automatic discharge",es:"Codigo E - Descarga automatica",pt:"Codigo E - Descarga automatica"},
      desc:{fr:"Rejet a la mer des eaux de cale via le systeme automatique de surveillance et de controle (l'OWS avec son arret automatique). C'est le mode normal et conforme d'evacuation des eaux de cale traitees sous les 15 ppm.",en:"Overboard discharge of bilge water via the automatic monitoring and control system (the OWS with its automatic stop). This is the normal, compliant mode of discharging treated bilge water under 15 ppm.",es:"Descarga al mar de agua de sentina mediante el sistema automatico de vigilancia y control (el OWS con su paro automatico). Es el modo normal y conforme de evacuar agua de sentina tratada bajo 15 ppm.",pt:"Descarga no mar de agua de porao atraves do sistema automatico de monitorizacao e controlo (o OWS com sua parada automatica). Este e o modo normal e conforme de descarregar agua de porao tratada abaixo de 15 ppm."} },
    { id:"H", icon:"⛽", color:C.gold2,
      label:{fr:"Code H - Soutage",en:"Code H - Bunkering",es:"Codigo H - Abastecimiento",pt:"Codigo H - Abastecimento"},
      desc:{fr:"Chargement de combustible ou d'huile de graissage en soute (bunkering). Doit inscrire quantite, type de produit et teneur en soufre (liee au BDN). Toute difference entre quantite commandee et quantite recue doit etre documentee.",en:"Loading of fuel or lubricating oil (bunkering). Must log quantity, product type and sulfur content (linked to the BDN). Any difference between ordered and received quantity must be documented.",es:"Carga de combustible o aceite lubricante (abastecimiento). Debe registrar cantidad, tipo de producto y contenido de azufre (vinculado al BDN). Cualquier diferencia debe documentarse.",pt:"Carregamento de combustivel ou oleo lubrificante (abastecimento). Deve registar quantidade, tipo de produto e teor de enxofre (ligado ao BDN). Qualquer diferenca deve ser documentada."} },
  ];
  const sel_ = sel ? codes.find(c=>c.id===sel) : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
        {codes.map(cd=>(
          <div key={cd.id} onClick={()=>setSel(sel===cd.id?null:cd.id)}
            style={{padding:"10px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===cd.id?`${cd.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===cd.id?cd.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:4}}>{cd.icon}</div>
            <div style={{fontSize:10,color:sel===cd.id?cd.color:C.muted,fontWeight:700,lineHeight:1.3}}>{cd.label[lang]||cd.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>:<div style={{textAlign:"center",padding:"10px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche un code ORB pour les détails":lang==="en"?"Tap an ORB code for details":lang==="es"?"Toca un codigo ORB para detalles":"Toque num codigo ORB para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 - PROHIBITED DISCHARGES & NON-CONFORMITIES
// ══════════════════════════════════════
function ProhibitedSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"magicpipe", icon:"🚫", color:C.red,
      label:{fr:"Magic pipe",en:"Magic pipe",es:"Magic pipe",pt:"Magic pipe"},
      desc:{fr:"Tuyau de derivation clandestin qui contourne l'OWS pour rejeter directement en mer des eaux de cale non traitees. Crime maritime majeur : prison pour les officiers impliques, amendes millionnaires, detention du navire.",en:"Clandestine bypass pipe that circumvents the OWS to discharge untreated bilge water directly at sea. Major maritime crime: prison for involved officers, million-dollar fines, vessel detention.",es:"Tuberia de derivacion clandestina que elude el OWS para descargar agua de sentina sin tratar directamente al mar. Delito maritimo grave: prision, multas millonarias, retencion del buque.",pt:"Tubo de derivacao clandestino que contorna o OWS para descarregar agua de porao nao tratada diretamente no mar. Crime maritimo grave: prisao, multas milionarias, retencao do navio."} },
    { id:"specialarea", icon:"🗺️", color:C.orange,
      label:{fr:"Rejet en zone speciale",en:"Discharge in a special area",es:"Descarga en zona especial",pt:"Descarga em zona especial"},
      desc:{fr:"Certaines zones (Mediterranee, Mer Rouge, Golfe Persique, Antarctique...) interdisent tout rejet d'hydrocarbures, meme traite sous 15 ppm. Naviguer sans connaitre ces zones expose a une infraction involontaire mais toujours sanctionnee.",en:"Certain areas (Mediterranean, Red Sea, Persian Gulf, Antarctic...) prohibit any oil discharge, even treated under 15 ppm. Sailing without knowing these zones exposes to an unintentional but still sanctioned offense.",es:"Ciertas zonas (Mediterraneo, Mar Rojo, Golfo Persico, Antartida...) prohiben cualquier descarga de hidrocarburos, incluso tratada bajo 15 ppm. Navegar sin conocer estas zonas expone a una infraccion.",pt:"Certas zonas (Mediterraneo, Mar Vermelho, Golfo Persico, Antartida...) proibem qualquer descarga de hidrocarbonetos, mesmo tratada abaixo de 15 ppm. Navegar sem conhecer essas zonas expoe a uma infracao."} },
    { id:"falseorb", icon:"✍️", color:C.purple,
      label:{fr:"Fausse entree ORB",en:"False ORB entry",es:"Entrada falsa en el ORB",pt:"Entrada falsa no ORB"},
      desc:{fr:"Inscrire une operation qui n'a pas eu lieu, ou omettre une operation qui a eu lieu. Considere comme un crime federal dans plusieurs juridictions (dont les USA) - independant de l'infraction de rejet elle-meme.",en:"Recording an operation that did not happen, or omitting one that did. Considered a federal crime in several jurisdictions (including the US) - independent from the discharge offense itself.",es:"Registrar una operacion que no ocurrio, u omitir una que si ocurrio. Considerado delito federal en varias jurisdicciones (incluido EE.UU.) - independiente de la infraccion de descarga misma.",pt:"Registar uma operacao que nao ocorreu, ou omitir uma que ocorreu. Considerado crime federal em varias jurisdicoes (incluindo os EUA) - independente da propria infracao de descarga."} },
    { id:"psc", icon:"🔍", color:C.teal,
      label:{fr:"Detection PSC",en:"PSC detection",es:"Deteccion PSC",pt:"Deteccao PSC"},
      desc:{fr:"Les inspecteurs Port State Control comparent systematiquement l'ORB, les heures de fonctionnement de l'OWS, et les niveaux mesures dans les tuyauteries suspectes. Les incoherences (tuyauterie corrodee mais jamais utilisee selon l'ORB) declenchent l'enquete.",en:"Port State Control inspectors systematically compare the ORB, OWS operating hours, and levels measured in suspicious piping. Inconsistencies (corroded piping never used according to the ORB) trigger investigation.",es:"Los inspectores PSC comparan sistematicamente el ORB, las horas de funcionamiento del OWS, y los niveles medidos en tuberias sospechosas. Las incoherencias desencadenan la investigacion.",pt:"Os inspetores PSC comparam sistematicamente o ORB, as horas de funcionamento do OWS, e os niveis medidos em tubagens suspeitas. As incoerencias desencadeiam a investigacao."} },
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
        {lang==="fr"?"Touche un element pour les détails":lang==="en"?"Tap an item for details":lang==="es"?"Toca un elemento para detalles":"Toque num item para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// ENGINE ROOM ENVIRONMENTAL CHECKLIST
// ══════════════════════════════════════
function EngineRoomChecklist({ lang }) {
  const items = {
    fr:["Niveau de cale vérifié","OWS testé avant mise en service","Alarme 15 ppm opérationnelle","Oil Record Book mis à jour","Niveau du sludge tank vérifié","Aucun rejet non autorisé en mer","Vannes correctement alignées","Salle des machines inspectée (fuites d'huile)"],
    en:["Bilge level checked","OWS tested before operation","15 ppm alarm operational","Oil Record Book updated","Sludge tank level checked","No unauthorized overboard discharge","Valves correctly aligned","Engine room inspected for oil leaks"],
    es:["Nivel de sentina verificado","OWS probado antes de la operación","Alarma de 15 ppm operativa","Oil Record Book actualizado","Nivel del slop tank verificado","Ninguna descarga no autorizada al mar","Válvulas correctamente alineadas","Sala de máquinas inspeccionada (fugas de aceite)"],
    pt:["Nível de porão verificado","OWS testado antes da operação","Alarme de 15 ppm operacional","Oil Record Book atualizado","Nível do slop tank verificado","Nenhuma descarga não autorizada ao mar","Válvulas corretamente alinhadas","Casa de máquinas inspecionada (fugas de óleo)"],
  };
  const title = {fr:"Checklist environnementale - Salle des machines",en:"Engine Room Environmental Checklist",es:"Checklist ambiental - Sala de máquinas",pt:"Checklist ambiental - Casa de máquinas"};
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
function Exercise2({ lang, t }) {
  const [ans,setAns]=useState({q1:"",q2:"",q3:""});
  const [showC,setShowC]=useState(false);
  const correct={q1:"15",q2:"E",q3:"3"};
  const qs={
    fr:[
      {id:"q1",q:"Limite legale de teneur en huile pour le rejet des eaux de cale (en ppm) ?"},
      {id:"q2",q:"Quel code ORB Part I correspond au rejet automatique via l'OWS ?\n(Répondre : lettre)"},
      {id:"q3",q:"Duree minimale de conservation de l'Oil Record Book a bord (en annees) ?"},
    ],
    en:[
      {id:"q1",q:"Legal oil content limit for bilge water discharge (in ppm)?"},
      {id:"q2",q:"Which ORB Part I code corresponds to automatic discharge via the OWS?\n(Answer: letter)"},
      {id:"q3",q:"Minimum retention period for the Oil Record Book on board (in years)?"},
    ],
    es:[
      {id:"q1",q:"¿Límite legal de contenido de aceite para la descarga de agua de sentina (en ppm)?"},
      {id:"q2",q:"¿Qué código ORB Part I corresponde a la descarga automática vía el OWS?\n(Responder: letra)"},
      {id:"q3",q:"¿Duración mínima de conservación del Oil Record Book a bordo (en años)?"},
    ],
    pt:[
      {id:"q1",q:"Limite legal de teor de óleo para a descarga de água de porão (em ppm)?"},
      {id:"q2",q:"Qual código ORB Part I corresponde à descarga automática via o OWS?\n(Responder: letra)"},
      {id:"q3",q:"Duração mínima de conservação do Oil Record Book a bordo (em anos)?"},
    ],
  };
  const list=qs[lang]||qs.fr;
  const chk=(id,val)=>{
    const v=val.trim().toLowerCase();
    if(id==="q1") return v==="15"||v==="15ppm"||v==="15 ppm";
    if(id==="q2") return v==="e";
    if(id==="q3") return v==="3"||v==="3 ans"||v==="3 years";
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.green}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : 15 ppm = limite bilge · Code E = rejet automatique OWS · ORB conservé 3 ans minimum"
        :lang==="en"?"💡 Reminders: 15 ppm = bilge limit · Code E = automatic OWS discharge · ORB kept minimum 3 years"
        :lang==="es"?"💡 Recordatorios: 15 ppm = límite sentina · Código E = descarga automática OWS · ORB conservado 3 años mínimo"
        :"💡 Lembretes: 15 ppm = limite porão · Código E = descarga automática OWS · ORB conservado 3 anos no mínimo"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q.id,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:18,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q.id,ans[q.id])?C.green:C.red}}>{chk(q.id,ans[q.id])?"✓":`✗ → ${correct[q.id]}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7,marginBottom:10}}>
        {lang==="fr"?"✅ Q1: 15 ppm (Annexe I MARPOL)\n✅ Q2: Code E (rejet via systeme automatique de surveillance et controle)\n✅ Q3: 3 ans minimum a bord, disponible pour inspection PSC"
        :lang==="en"?"✅ Q1: 15 ppm (MARPOL Annex I)\n✅ Q2: Code E (discharge via automatic monitoring and control system)\n✅ Q3: Minimum 3 years on board, available for PSC inspection"
        :"✅ Q1: 15 ppm · Q2: Code E · Q3: 3 años/anos"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE - Princess Cruise Lines (2016)
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"Fraude Annexe I - Princess Cruise Lines (2016)",teaser:"Caribbean Princess · Magic pipe · ORB falsifié · Amende de 40 millions $ · Dénonciateur interne",
      what:"En 2016, Princess Cruise Lines plaide coupable devant la justice americaine pour le rejet illegal d'eaux de cale contaminees par hydrocarbures depuis le navire Caribbean Princess. Un ingenieur de bord avait installe un tuyau de derivation ('magic pipe') permettant de contourner le separateur 15 ppm et de rejeter directement en mer. L'affaire est decouverte grace a un ingenieur senior, temoin des pratiques, qui alerte les autorites britanniques (MCA) a l'arrivee du navire a Southampton.",
      cause:"• 'Magic pipe' installe pour contourner le separateur 15 ppm\n• Oil Record Book falsifie pour masquer les rejets non traites\n• Pratique connue de plusieurs membres du departement machine\n• Un ingenieur senior denonce la pratique aux autorites (whistleblower)\n• L'enquete revele des rejets similaires sur d'autres navires de la flotte",
      lessons:"✓ Un seul membre d'equipage courageux peut declencher toute une enquete\n✓ L'ORB doit refleter la realite, sans exception, meme sous pression hierarchique\n✓ Participer sciemment a un magic pipe expose chaque officier impliqué a des poursuites individuelles\n✓ Le denonciateur beneficie d'une protection legale contre les represailles\n✓ Une fraude decouverte sur un navire declenche une enquete sur toute la flotte"},
    en:{title:"Annex I Fraud - Princess Cruise Lines (2016)",teaser:"Caribbean Princess · Magic pipe · Falsified ORB · $40 million fine · Internal whistleblower",
      what:"In 2016, Princess Cruise Lines pleaded guilty in US federal court to the illegal discharge of oil-contaminated bilge water from the vessel Caribbean Princess. A ship's engineer had installed a bypass pipe ('magic pipe') to circumvent the 15 ppm separator and discharge directly at sea. The case came to light thanks to a senior engineer, a witness to the practice, who alerted UK authorities (MCA) when the vessel arrived in Southampton.",
      cause:"• 'Magic pipe' installed to bypass the 15 ppm separator\n• Oil Record Book falsified to hide untreated discharges\n• Practice known to several members of the engine department\n• A senior engineer reported the practice to the authorities (whistleblower)\n• The investigation revealed similar discharges on other vessels in the fleet",
      lessons:"✓ A single courageous crew member can trigger an entire investigation\n✓ The ORB must reflect reality, without exception, even under hierarchical pressure\n✓ Knowingly taking part in a magic pipe exposes every involved officer to individual prosecution\n✓ The whistleblower benefits from legal protection against retaliation\n✓ Fraud discovered on one vessel triggers an investigation across the entire fleet"},
    es:{title:"Fraude Anexo I - Princess Cruise Lines (2016)",teaser:"Caribbean Princess · Magic pipe · ORB falsificado · Multa de 40 millones $ · Denunciante interno",
      what:"En 2016, Princess Cruise Lines se declaro culpable ante la justicia estadounidense por la descarga ilegal de agua de sentina contaminada con hidrocarburos desde el buque Caribbean Princess. Un ingeniero de a bordo habia instalado un tubo de derivacion ('magic pipe') para eludir el separador de 15 ppm y descargar directamente al mar. El caso se descubrio gracias a un ingeniero senior, testigo de la practica, que alerto a las autoridades britanicas (MCA) a la llegada del buque a Southampton.",
      cause:"• 'Magic pipe' instalado para eludir el separador de 15 ppm\n• Oil Record Book falsificado para ocultar las descargas sin tratar\n• Practica conocida por varios miembros del departamento de maquinas\n• Un ingeniero senior denuncio la practica a las autoridades (whistleblower)\n• La investigacion revelo descargas similares en otros buques de la flota",
      lessons:"✓ Un solo miembro valiente de la tripulacion puede desencadenar toda una investigacion\n✓ El ORB debe reflejar la realidad, sin excepcion, incluso bajo presion jerarquica\n✓ Participar a sabiendas en un magic pipe expone a cada oficial implicado a un proceso individual\n✓ El denunciante se beneficia de proteccion legal contra represalias\n✓ Un fraude descubierto en un buque desencadena una investigacion en toda la flota"},
    pt:{title:"Fraude Anexo I - Princess Cruise Lines (2016)",teaser:"Caribbean Princess · Magic pipe · ORB falsificado · Multa de 40 milhões $ · Denunciante interno",
      what:"Em 2016, a Princess Cruise Lines se declarou culpada perante a justica americana pela descarga ilegal de agua de porao contaminada com hidrocarbonetos do navio Caribbean Princess. Um engenheiro de bordo havia instalado um tubo de derivacao ('magic pipe') para contornar o separador de 15 ppm e descarregar diretamente no mar. O caso foi descoberto gracas a um engenheiro senior, testemunha da pratica, que alertou as autoridades britanicas (MCA) na chegada do navio a Southampton.",
      cause:"• 'Magic pipe' instalado para contornar o separador de 15 ppm\n• Oil Record Book falsificado para ocultar as descargas nao tratadas\n• Pratica conhecida por varios membros do departamento de maquinas\n• Um engenheiro senior denunciou a pratica as autoridades (whistleblower)\n• A investigacao revelou descargas semelhantes em outros navios da frota",
      lessons:"✓ Um unico membro corajoso da tripulacao pode desencadear toda uma investigacao\n✓ O ORB deve refletir a realidade, sem excecao, mesmo sob pressao hierarquica\n✓ Participar cientemente de um magic pipe expoe cada oficial envolvido a processos individuais\n✓ O denunciante beneficia de protecao legal contra represalias\n✓ Uma fraude descoberta num navio desencadeia uma investigacao em toda a frota"},
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
    {q:"Quelle est la limite legale de teneur en huile pour le rejet des eaux de cale en mer ?",opts:["1,5 ppm","15 ppm","50 ppm","150 ppm"],correct:1,expl:"MARPOL Annexe I : 15 ppm maximum pour le rejet d'eaux de cale traitees en mer, verifie par l'Oil Content Meter du separateur (OWS)."},
    {q:"Que doit faire automatiquement le systeme si la limite de 15 ppm est depassee ?",opts:["Rien, une alarme sonore suffit","Arreter automatiquement le rejet en mer","Augmenter la vitesse de pompage","Alerter uniquement le capitaine par email"],correct:1,expl:"Le dispositif d'arret automatique doit stopper immediatement le rejet en mer des que la limite est franchie. Contourner ce dispositif est exactement ce que fait un magic pipe."},
    {q:"Quel code de l'Oil Record Book Part I correspond au rejet automatique via l'OWS ?",opts:["Code C","Code D","Code E","Code H"],correct:2,expl:"Code E = rejet a la mer des eaux de cale via le systeme automatique de surveillance et de controle, c'est-a-dire l'OWS avec son arret automatique."},
    {q:"Comment l'affaire Princess Cruise Lines (2016) a-t-elle ete decouverte ?",opts:["Un controle PSC de routine","Un ingenieur senior a denonce la pratique aux autorites","Une fuite mediatique anonyme","Un audit interne de la compagnie"],correct:1,expl:"Un ingenieur senior, temoin du magic pipe et de la falsification de l'ORB, a alerte les autorites britanniques (MCA) a l'arrivee du navire a Southampton."},
    {q:"Pourquoi un 'magic pipe' est-il considere comme une infraction particulierement grave ?",opts:["Parce qu'il coute cher a installer","Parce qu'il contourne deliberement l'equipement de prevention de la pollution pour rejeter des eaux non traitees","Parce qu'il est visible facilement","Parce qu'il n'existe aucune sanction prevue"],correct:1,expl:"Le magic pipe est une action deliberee de contournement d'un dispositif de securite environnementale, ce qui en fait une fraude intentionnelle plutot qu'un simple incident technique."},
  ],
  en:[
    {q:"What is the legal oil content limit for bilge water discharge at sea?",opts:["1.5 ppm","15 ppm","50 ppm","150 ppm"],correct:1,expl:"MARPOL Annex I: 15 ppm maximum for treated bilge water discharge at sea, verified by the OWS Oil Content Meter."},
    {q:"What must the system do automatically if the 15 ppm limit is exceeded?",opts:["Nothing, an audible alarm is enough","Automatically stop the discharge to sea","Increase pumping speed","Only alert the Master by email"],correct:1,expl:"The automatic stopping device must immediately halt discharge to sea once the limit is exceeded. Bypassing this device is exactly what a magic pipe does."},
    {q:"Which Oil Record Book Part I code corresponds to automatic discharge via the OWS?",opts:["Code C","Code D","Code E","Code H"],correct:2,expl:"Code E = overboard discharge of bilge water via the automatic monitoring and control system, i.e. the OWS with its automatic stop."},
    {q:"How was the Princess Cruise Lines case (2016) discovered?",opts:["A routine PSC inspection","A senior engineer reported the practice to the authorities","An anonymous media leak","An internal company audit"],correct:1,expl:"A senior engineer, witness to the magic pipe and ORB falsification, alerted UK authorities (MCA) when the vessel arrived in Southampton."},
    {q:"Why is a 'magic pipe' considered a particularly serious offense?",opts:["Because it is expensive to install","Because it deliberately bypasses pollution prevention equipment to discharge untreated water","Because it is easily visible","Because there is no penalty for it"],correct:1,expl:"A magic pipe is a deliberate act of bypassing an environmental safety device, making it intentional fraud rather than a simple technical incident."},
  ],
  es:[
    {q:"¿Cuál es el límite legal de contenido de aceite para la descarga de agua de sentina al mar?",opts:["1,5 ppm","15 ppm","50 ppm","150 ppm"],correct:1,expl:"MARPOL Anexo I: 15 ppm máximo para la descarga de agua de sentina tratada al mar, verificado por el Oil Content Meter del OWS."},
    {q:"¿Qué debe hacer automáticamente el sistema si se supera el límite de 15 ppm?",opts:["Nada, una alarma sonora basta","Detener automáticamente la descarga al mar","Aumentar la velocidad de bombeo","Solo alertar al Capitán por email"],correct:1,expl:"El dispositivo de paro automático debe detener inmediatamente la descarga al mar en cuanto se supera el límite. Eludir este dispositivo es exactamente lo que hace un magic pipe."},
    {q:"¿Qué código del Oil Record Book Part I corresponde a la descarga automática vía el OWS?",opts:["Código C","Código D","Código E","Código H"],correct:2,expl:"Código E = descarga al mar de agua de sentina vía el sistema automático de vigilancia y control, es decir el OWS con su paro automático."},
    {q:"¿Cómo se descubrió el caso de Princess Cruise Lines (2016)?",opts:["Una inspección PSC de rutina","Un ingeniero senior denunció la práctica a las autoridades","Una filtración mediática anónima","Una auditoría interna de la compañía"],correct:1,expl:"Un ingeniero senior, testigo del magic pipe y la falsificación del ORB, alertó a las autoridades británicas (MCA) a la llegada del buque a Southampton."},
    {q:"¿Por qué un 'magic pipe' se considera una infracción particularmente grave?",opts:["Porque es costoso instalarlo","Porque elude deliberadamente el equipo de prevención de la contaminación para descargar agua sin tratar","Porque es fácilmente visible","Porque no existe sanción alguna"],correct:1,expl:"El magic pipe es una acción deliberada de elusión de un dispositivo de seguridad ambiental, lo que lo convierte en un fraude intencional en lugar de un simple incidente técnico."},
  ],
  pt:[
    {q:"Qual é o limite legal de teor de óleo para a descarga de água de porão no mar?",opts:["1,5 ppm","15 ppm","50 ppm","150 ppm"],correct:1,expl:"MARPOL Anexo I: 15 ppm máximo para a descarga de água de porão tratada no mar, verificado pelo Oil Content Meter do OWS."},
    {q:"O que o sistema deve fazer automaticamente se o limite de 15 ppm for excedido?",opts:["Nada, um alarme sonoro basta","Parar automaticamente a descarga no mar","Aumentar a velocidade de bombeamento","Apenas alertar o Comandante por email"],correct:1,expl:"O dispositivo de parada automática deve interromper imediatamente a descarga no mar assim que o limite for excedido. Contornar esse dispositivo é exatamente o que um magic pipe faz."},
    {q:"Qual código do Oil Record Book Part I corresponde à descarga automática via o OWS?",opts:["Código C","Código D","Código E","Código H"],correct:2,expl:"Código E = descarga no mar de água de porão via o sistema automático de monitorização e controlo, ou seja, o OWS com sua parada automática."},
    {q:"Como o caso da Princess Cruise Lines (2016) foi descoberto?",opts:["Uma inspeção PSC de rotina","Um engenheiro senior denunciou a prática às autoridades","Um vazamento midiático anônimo","Uma auditoria interna da empresa"],correct:1,expl:"Um engenheiro senior, testemunha do magic pipe e da falsificação do ORB, alertou as autoridades britânicas (MCA) na chegada do navio a Southampton."},
    {q:"Por que um 'magic pipe' é considerado uma infração particularmente grave?",opts:["Porque é caro instalar","Porque contorna deliberadamente o equipamento de prevenção da poluição para descarregar água não tratada","Porque é facilmente visível","Porque não existe nenhuma sanção prevista"],correct:1,expl:"O magic pipe é uma ação deliberada de contornar um dispositivo de segurança ambiental, tornando-o uma fraude intencional em vez de um simples incidente técnico."},
  ],
};

const BANK = {
  fr:[
    {q:"Le seuil de 15 ppm concerne precisement quoi ?",opts:["La teneur en soufre du carburant","La teneur en huile des eaux de cale rejetees en mer","La temperature de l'eau de refroidissement","La pression du separateur"],correct:1,expl:"15 ppm = teneur maximale en huile autorisee pour le rejet en mer des eaux de cale traitees par l'OWS."},
    {q:"Qu'est-ce qu'un 'magic pipe' ?",opts:["Un tuyau de ventilation standard","Un tuyau de derivation illegal contournant l'OWS","Un tuyau de refroidissement auxiliaire","Un tuyau d'aspiration de secours"],correct:1,expl:"Magic pipe = tuyau clandestin permettant de rejeter des eaux de cale non traitees directement en mer, en contournant le separateur 15 ppm."},
    {q:"Quel document doit enregistrer chaque operation liee aux hydrocarbures en salle des machines ?",opts:["Le journal de passerelle","L'Oil Record Book Part I","Le Garbage Record Book","Le certificat IAPP"],correct:1,expl:"L'Oil Record Book Part I couvre les operations liees aux hydrocarbures dans la salle des machines : ballastage, transferts, rejets, soutage."},
    {q:"Qu'est-ce que le 'sludge' dans le contexte de l'Annexe I ?",opts:["De l'eau douce de refroidissement","Des residus d'huile issus des purificateurs et separateurs","Des dechets alimentaires","De la peinture de coque"],correct:1,expl:"Le sludge est un residu huileux genere par les purificateurs et separateurs, qui doit etre stocke et elimine conformement a l'Annexe I."},
    {q:"Que se passe-t-il si l'alarme 15 ppm est ignoree ou desactivee, meme sans rejet reel constate ?",opts:["Aucune consequence si aucun rejet n'a eu lieu","C'est deja une infraction MARPOL grave","Seul un avertissement oral est donne","Cela n'est jamais controle par les autorites"],correct:1,expl:"Ignorer ou desactiver l'alarme constitue en soi une infraction grave, independamment de la survenue effective d'un rejet non conforme."},
    {q:"Duree minimale de conservation de l'Oil Record Book a bord ?",opts:["1 an","3 ans minimum","5 ans","Aucune duree fixee"],correct:1,expl:"L'ORB doit etre conserve a bord au minimum 3 ans et rester disponible pour toute inspection PSC."},
    {q:"Qui doit signer chaque entree de l'Oil Record Book ?",opts:["Seul le chef mecanicien","L'officier responsable et le capitaine","Uniquement l'armateur","Aucune signature n'est exigee"],correct:1,expl:"Chaque entree doit etre signee par l'officier responsable de l'operation et contresignee par le capitaine."},
    {q:"Une fausse entree dans l'ORB constitue-t-elle une infraction distincte du rejet illegal lui-meme ?",opts:["Non, c'est la meme infraction","Oui, c'est une infraction distincte et cumulable","Seulement si le rejet depasse 100 ppm","Seulement en zone speciale"],correct:1,expl:"La falsification de l'ORB est une infraction penale independante, qui peut se cumuler avec l'infraction de rejet illegal."},
    {q:"Qu'est-ce qu'un inspecteur PSC compare typiquement pour detecter une fraude Annexe I ?",opts:["Le menu du restaurant a bord","Les heures de fonctionnement de l'OWS et les entrees de l'ORB","La couleur de la coque","Le nombre de canots de sauvetage"],correct:1,expl:"Les inspecteurs PSC comparent les heures de fonctionnement reelles de l'OWS, l'etat physique des tuyauteries suspectes et les entrees de l'ORB pour detecter des incoherences."},
    {q:"Existe-t-il un mecanisme de recompense pour signaler des rejets illegaux ?",opts:["Non, aucun mecanisme n'existe","Oui, certains programmes recompensent financierement les denonciateurs","Seulement pour les capitaines","Seulement apres la retraite du marin"],correct:1,expl:"Certains programmes de type whistleblower recompensent financierement les membres d'equipage qui denoncent des violations MARPOL averees."},
    {q:"Un rejet d'eaux de cale traitees sous les 15 ppm est-il autorise dans une zone speciale MARPOL ?",opts:["Oui, sans restriction","Non, tout rejet d'hydrocarbures y est interdit","Oui, mais seulement de nuit","Oui, si le capitaine autorise"],correct:1,expl:"Dans les zones speciales MARPOL, tout rejet d'hydrocarbures est interdit, meme traite sous la limite de 15 ppm applicable ailleurs."},
    {q:"Que sont les 'slops' stockes dans les slop tanks ?",opts:["Des eaux grises sanitaires","Des melanges eau-huile et residus de nettoyage de citernes","Des dechets plastiques uniquement","De l'eau douce potable"],correct:1,expl:"Les slops sont des melanges eau-huile et residus divers issus du nettoyage de citernes, stockes separement et jamais rejetes directement."},
    {q:"Quel code ORB Part I correspond au soutage (bunkering) ?",opts:["Code C","Code E","Code H","Code D"],correct:2,expl:"Le Code H de l'ORB Part I couvre les operations de soutage : chargement de combustible ou d'huile de graissage."},
    {q:"Quel code ORB Part I correspond a l'elimination des residus/boues (sludge) ?",opts:["Code C","Code D","Code E","Code H"],correct:0,expl:"Le Code C de l'ORB Part I couvre l'elimination des residus d'hydrocarbures et des boues."},
    {q:"Quel a ete l'element declencheur principal de l'enquete dans l'affaire Princess Cruise Lines ?",opts:["Un controle satellite","Le signalement d'un ingenieur senior temoin de la fraude","Une plainte de passagers","Un incendie a bord"],correct:1,expl:"L'affaire a ete revelee grace au signalement d'un ingenieur senior, temoin direct du magic pipe et de la falsification de l'ORB."},
  ],
  en:[
    {q:"What exactly does the 15 ppm threshold refer to?",opts:["The fuel sulfur content","The oil content of bilge water discharged at sea","The cooling water temperature","The separator pressure"],correct:1,expl:"15 ppm = maximum oil content allowed for discharging OWS-treated bilge water at sea."},
    {q:"What is a 'magic pipe'?",opts:["A standard ventilation pipe","An illegal bypass pipe circumventing the OWS","An auxiliary cooling pipe","An emergency suction pipe"],correct:1,expl:"Magic pipe = clandestine pipe allowing untreated bilge water to be discharged directly at sea, bypassing the 15 ppm separator."},
    {q:"Which document must record every oil-related operation in the engine room?",opts:["The bridge log","The Oil Record Book Part I","The Garbage Record Book","The IAPP certificate"],correct:1,expl:"The Oil Record Book Part I covers oil-related operations in the engine room: ballasting, transfers, discharges, bunkering."},
    {q:"What is 'sludge' in the context of Annex I?",opts:["Fresh cooling water","Oil residues from purifiers and separators","Food waste","Hull paint"],correct:1,expl:"Sludge is an oily residue generated by purifiers and separators, which must be stored and disposed of in accordance with Annex I."},
    {q:"What happens if the 15 ppm alarm is ignored or disabled, even without an observed actual discharge?",opts:["No consequence if no discharge occurred","It is already a serious MARPOL violation","Only a verbal warning is given","It is never checked by authorities"],correct:1,expl:"Ignoring or disabling the alarm is itself a serious violation, regardless of whether a non-compliant discharge actually occurred."},
    {q:"Minimum retention period for the Oil Record Book on board?",opts:["1 year","Minimum 3 years","5 years","No set period"],correct:1,expl:"The ORB must be kept on board for a minimum of 3 years and remain available for any PSC inspection."},
    {q:"Who must sign each Oil Record Book entry?",opts:["Only the Chief Engineer","The responsible officer and the Master","Only the shipowner","No signature is required"],correct:1,expl:"Each entry must be signed by the officer responsible for the operation and countersigned by the Master."},
    {q:"Is a false ORB entry a separate offense from the illegal discharge itself?",opts:["No, it is the same offense","Yes, it is a separate, cumulative offense","Only if the discharge exceeds 100 ppm","Only in a special area"],correct:1,expl:"Falsifying the ORB is an independent criminal offense that can be cumulative with the illegal discharge offense."},
    {q:"What does a PSC inspector typically compare to detect Annex I fraud?",opts:["The onboard restaurant menu","OWS operating hours and ORB entries","The hull color","The number of lifeboats"],correct:1,expl:"PSC inspectors compare actual OWS operating hours, the physical condition of suspicious piping, and ORB entries to detect inconsistencies."},
    {q:"Does a reward mechanism exist for reporting illegal discharges?",opts:["No, no such mechanism exists","Yes, some programs financially reward whistleblowers","Only for Masters","Only after the seafarer retires"],correct:1,expl:"Some whistleblower-type programs financially reward crew members who report proven MARPOL violations."},
    {q:"Is discharge of bilge water treated below 15 ppm allowed in a MARPOL special area?",opts:["Yes, without restriction","No, any oil discharge is prohibited there","Yes, but only at night","Yes, if the Master authorizes it"],correct:1,expl:"In MARPOL special areas, any oil discharge is prohibited, even treated below the 15 ppm limit applicable elsewhere."},
    {q:"What are 'slops' stored in slop tanks?",opts:["Sanitary grey water","Oil-water mixtures and tank cleaning residues","Plastic waste only","Fresh drinking water"],correct:1,expl:"Slops are oil-water mixtures and various residues from tank cleaning, stored separately and never discharged directly."},
    {q:"Which ORB Part I code covers bunkering?",opts:["Code C","Code E","Code H","Code D"],correct:2,expl:"ORB Part I Code H covers bunkering operations: loading fuel or lubricating oil."},
    {q:"Which ORB Part I code covers disposal of residues/sludge?",opts:["Code C","Code D","Code E","Code H"],correct:0,expl:"ORB Part I Code C covers disposal of oil residues and sludge."},
    {q:"What was the main trigger for the investigation in the Princess Cruise Lines case?",opts:["A satellite check","A senior engineer's report as a witness to the fraud","A passenger complaint","An onboard fire"],correct:1,expl:"The case came to light thanks to a senior engineer's report, a direct witness to the magic pipe and ORB falsification."},
  ],
  es:[
    {q:"¿Qué se refiere exactamente el umbral de 15 ppm?",opts:["El contenido de azufre del combustible","El contenido de aceite del agua de sentina descargada al mar","La temperatura del agua de refrigeración","La presión del separador"],correct:1,expl:"15 ppm = contenido máximo de aceite permitido para descargar al mar agua de sentina tratada por el OWS."},
    {q:"¿Qué es un 'magic pipe'?",opts:["Un tubo de ventilación estándar","Un tubo de derivación ilegal que elude el OWS","Un tubo de refrigeración auxiliar","Un tubo de succión de emergencia"],correct:1,expl:"Magic pipe = tubo clandestino que permite descargar agua de sentina sin tratar directamente al mar, eludiendo el separador de 15 ppm."},
    {q:"¿Qué documento debe registrar cada operación relacionada con hidrocarburos en la sala de máquinas?",opts:["El diario de puente","El Oil Record Book Part I","El Garbage Record Book","El certificado IAPP"],correct:1,expl:"El Oil Record Book Part I cubre las operaciones relacionadas con hidrocarburos en la sala de máquinas: lastrado, transferencias, descargas, abastecimiento."},
    {q:"¿Qué es el 'sludge' en el contexto del Anexo I?",opts:["Agua dulce de refrigeración","Residuos de aceite de purificadores y separadores","Residuos alimentarios","Pintura del casco"],correct:1,expl:"El sludge es un residuo aceitoso generado por purificadores y separadores, que debe almacenarse y eliminarse conforme al Anexo I."},
    {q:"¿Qué ocurre si se ignora o desactiva la alarma de 15 ppm, incluso sin una descarga real observada?",opts:["Ninguna consecuencia si no hubo descarga","Ya es una infracción MARPOL grave","Solo se da una advertencia verbal","Nunca es verificado por las autoridades"],correct:1,expl:"Ignorar o desactivar la alarma constituye por sí misma una infracción grave, independientemente de si se produjo una descarga no conforme."},
    {q:"¿Duración mínima de conservación del Oil Record Book a bordo?",opts:["1 año","Mínimo 3 años","5 años","Sin plazo fijado"],correct:1,expl:"El ORB debe conservarse a bordo un mínimo de 3 años y estar disponible para cualquier inspección PSC."},
    {q:"¿Quién debe firmar cada entrada del Oil Record Book?",opts:["Solo el Jefe de Máquinas","El oficial responsable y el Capitán","Solo el naviero","No se requiere firma"],correct:1,expl:"Cada entrada debe ser firmada por el oficial responsable de la operación y refrendada por el Capitán."},
    {q:"¿Es una entrada falsa en el ORB una infracción distinta de la descarga ilegal misma?",opts:["No, es la misma infracción","Sí, es una infracción distinta y acumulable","Solo si la descarga supera 100 ppm","Solo en zona especial"],correct:1,expl:"Falsificar el ORB es una infracción penal independiente, acumulable con la infracción de descarga ilegal."},
    {q:"¿Qué compara típicamente un inspector PSC para detectar fraude en el Anexo I?",opts:["El menú del restaurante a bordo","Las horas de funcionamiento del OWS y las entradas del ORB","El color del casco","El número de botes de salvamento"],correct:1,expl:"Los inspectores PSC comparan las horas reales de funcionamiento del OWS, el estado físico de tuberías sospechosas y las entradas del ORB."},
    {q:"¿Existe un mecanismo de recompensa por denunciar descargas ilegales?",opts:["No, no existe ningún mecanismo","Sí, algunos programas recompensan económicamente a los denunciantes","Solo para los Capitanes","Solo tras la jubilación del marino"],correct:1,expl:"Algunos programas tipo whistleblower recompensan económicamente a los tripulantes que denuncian infracciones MARPOL comprobadas."},
    {q:"¿Está permitida la descarga de agua de sentina tratada bajo 15 ppm en una zona especial MARPOL?",opts:["Sí, sin restricción","No, cualquier descarga de hidrocarburos está prohibida allí","Sí, pero solo de noche","Sí, si el Capitán lo autoriza"],correct:1,expl:"En las zonas especiales MARPOL, cualquier descarga de hidrocarburos está prohibida, incluso tratada bajo el límite de 15 ppm aplicable en otros lugares."},
    {q:"¿Qué son los 'slops' almacenados en los slop tanks?",opts:["Aguas grises sanitarias","Mezclas agua-aceite y residuos de limpieza de tanques","Solo residuos plásticos","Agua dulce potable"],correct:1,expl:"Los slops son mezclas agua-aceite y diversos residuos de la limpieza de tanques, almacenados por separado y nunca descargados directamente."},
    {q:"¿Qué código ORB Part I cubre el abastecimiento (bunkering)?",opts:["Código C","Código E","Código H","Código D"],correct:2,expl:"El Código H del ORB Part I cubre las operaciones de abastecimiento: carga de combustible o aceite lubricante."},
    {q:"¿Qué código ORB Part I cubre la eliminación de residuos/lodos?",opts:["Código C","Código D","Código E","Código H"],correct:0,expl:"El Código C del ORB Part I cubre la eliminación de residuos de hidrocarburos y lodos."},
    {q:"¿Cuál fue el principal desencadenante de la investigación en el caso Princess Cruise Lines?",opts:["Un control satelital","La denuncia de un ingeniero senior testigo del fraude","Una queja de pasajeros","Un incendio a bordo"],correct:1,expl:"El caso salió a la luz gracias a la denuncia de un ingeniero senior, testigo directo del magic pipe y la falsificación del ORB."},
  ],
  pt:[
    {q:"O que exatamente o limite de 15 ppm se refere?",opts:["O teor de enxofre do combustível","O teor de óleo da água de porão descarregada no mar","A temperatura da água de refrigeração","A pressão do separador"],correct:1,expl:"15 ppm = teor máximo de óleo permitido para descarregar no mar a água de porão tratada pelo OWS."},
    {q:"O que é um 'magic pipe'?",opts:["Um tubo de ventilação padrão","Um tubo de derivação ilegal que contorna o OWS","Um tubo de refrigeração auxiliar","Um tubo de sucção de emergência"],correct:1,expl:"Magic pipe = tubo clandestino que permite descarregar água de porão não tratada diretamente no mar, contornando o separador de 15 ppm."},
    {q:"Qual documento deve registar cada operação relacionada a hidrocarbonetos na casa de máquinas?",opts:["O diário de passadiço","O Oil Record Book Part I","O Garbage Record Book","O certificado IAPP"],correct:1,expl:"O Oil Record Book Part I cobre as operações relacionadas a hidrocarbonetos na casa de máquinas: lastro, transferências, descargas, abastecimento."},
    {q:"O que é 'sludge' no contexto do Anexo I?",opts:["Água doce de refrigeração","Resíduos de óleo de purificadores e separadores","Resíduos alimentares","Tinta do casco"],correct:1,expl:"O sludge é um resíduo oleoso gerado por purificadores e separadores, que deve ser armazenado e eliminado conforme o Anexo I."},
    {q:"O que acontece se o alarme de 15 ppm for ignorado ou desativado, mesmo sem descarga real observada?",opts:["Nenhuma consequência se não houve descarga","Já é uma violação MARPOL grave","Apenas um aviso verbal é dado","Nunca é verificado pelas autoridades"],correct:1,expl:"Ignorar ou desativar o alarme constitui por si só uma violação grave, independentemente de ter ocorrido efetivamente uma descarga não conforme."},
    {q:"Duração mínima de conservação do Oil Record Book a bordo?",opts:["1 ano","Mínimo 3 anos","5 anos","Sem prazo definido"],correct:1,expl:"O ORB deve ser conservado a bordo por no mínimo 3 anos e permanecer disponível para qualquer inspeção PSC."},
    {q:"Quem deve assinar cada entrada do Oil Record Book?",opts:["Apenas o Chefe de Máquinas","O oficial responsável e o Comandante","Apenas o armador","Nenhuma assinatura é exigida"],correct:1,expl:"Cada entrada deve ser assinada pelo oficial responsável pela operação e contra-assinada pelo Comandante."},
    {q:"Uma entrada falsa no ORB constitui uma infração distinta da descarga ilegal em si?",opts:["Não, é a mesma infração","Sim, é uma infração distinta e cumulável","Somente se a descarga exceder 100 ppm","Somente em zona especial"],correct:1,expl:"Falsificar o ORB é uma infração penal independente, cumulável com a infração de descarga ilegal."},
    {q:"O que um inspetor PSC normalmente compara para detectar fraude no Anexo I?",opts:["O menu do restaurante a bordo","As horas de funcionamento do OWS e as entradas do ORB","A cor do casco","O número de botes salva-vidas"],correct:1,expl:"Os inspetores PSC comparam as horas reais de funcionamento do OWS, o estado físico de tubagens suspeitas e as entradas do ORB."},
    {q:"Existe um mecanismo de recompensa para denunciar descargas ilegais?",opts:["Não, não existe nenhum mecanismo","Sim, alguns programas recompensam financeiramente os denunciantes","Somente para Comandantes","Somente após a aposentadoria do marinheiro"],correct:1,expl:"Alguns programas do tipo whistleblower recompensam financeiramente os membros da tripulação que denunciam violações MARPOL comprovadas."},
    {q:"A descarga de água de porão tratada abaixo de 15 ppm é permitida numa zona especial MARPOL?",opts:["Sim, sem restrição","Não, qualquer descarga de hidrocarbonetos é proibida ali","Sim, mas apenas de noite","Sim, se o Comandante autorizar"],correct:1,expl:"Nas zonas especiais MARPOL, qualquer descarga de hidrocarbonetos é proibida, mesmo tratada abaixo do limite de 15 ppm aplicável em outros lugares."},
    {q:"O que são os 'slops' armazenados nos slop tanks?",opts:["Águas cinzentas sanitárias","Misturas água-óleo e resíduos de limpeza de tanques","Apenas resíduos plásticos","Água doce potável"],correct:1,expl:"Slops são misturas água-óleo e diversos resíduos da limpeza de tanques, armazenados separadamente e nunca descarregados diretamente."},
    {q:"Qual código ORB Part I cobre o abastecimento (bunkering)?",opts:["Código C","Código E","Código H","Código D"],correct:2,expl:"O Código H do ORB Part I cobre as operações de abastecimento: carregamento de combustível ou óleo lubrificante."},
    {q:"Qual código ORB Part I cobre a eliminação de resíduos/borras?",opts:["Código C","Código D","Código E","Código H"],correct:0,expl:"O Código C do ORB Part I cobre a eliminação de resíduos de hidrocarbonetos e borras."},
    {q:"Qual foi o principal fator desencadeante da investigação no caso Princess Cruise Lines?",opts:["Um controlo por satélite","A denúncia de um engenheiro senior testemunha da fraude","Uma reclamação de passageiros","Um incêndio a bordo"],correct:1,expl:"O caso veio à luz graças à denúncia de um engenheiro senior, testemunha direta do magic pipe e da falsificação do ORB."},
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
      badge:"🛢️ Module Machine · Leçon 2/6 · ⭐ Premium · 200 XP",
      title:"MARPOL Annexe I : Prévention de la pollution en salle des machines",
      intro:"La Leçon 1 t'a présenté les 6 annexes MARPOL dans leur ensemble. Cette leçon se concentre sur l'Annexe I au quotidien : comment un officier machine applique concrètement les règles anti-pollution hydrocarbures - sans réexpliquer le fonctionnement mécanique du séparateur, déjà couvert dans Auxiliary Systems & Electricity, Leçon 3.\n\nObjectif : savoir reconnaître les sources de pollution, utiliser l'OWS de façon conforme, tenir l'Oil Record Book correctement, et reconnaître une non-conformité avant qu'elle ne devienne une infraction.",
      p1:"PARTIE 1 - SOURCES DE POLLUTION HUILEUSE",
      s1:"En salle des machines, la pollution par hydrocarbures provient rarement d'un rejet volontaire massif - elle vient le plus souvent de l'accumulation quotidienne : fuites non traitées, chiffons souillés mal stockés, eaux de cale négligées. Chaque source ci-dessous doit être identifiée et gérée avant qu'elle n'atteigne le circuit de rejet.",
      p2:"PARTIE 2 - L'OWS : USAGE CONFORME, PAS LA MÉCANIQUE",
      s2:"Cette leçon ne réexplique pas le fonctionnement interne du séparateur (centrifugation, coalescence) - c'est le rôle d'Auxiliary Systems, Leçon 3. Ici, l'accent porte sur les points de contrôle réglementaires que tout officier doit connaître et ne jamais contourner.",
      p3:"PARTIE 3 - OIL RECORD BOOK PART I",
      s3:"L'ORB Part I est le document légal qui prouve la conformité de tes opérations hydrocarbures. Chaque code correspond à un type d'opération précis. Une entrée manquante, tardive ou fausse est aussi grave qu'un rejet illégal lui-même.\n\nL'Oil Record Book est un document légal, pas un journal de maintenance.",
      p4:"PARTIE 4 - REJETS INTERDITS & CONTRÔLES PSC",
      s4:"Certaines pratiques transforment une simple négligence en crime maritime. Comprendre ce qui est strictement interdit - et comment les inspecteurs PSC le détectent - protège autant le navire que chaque membre d'équipage individuellement.",
      p5:"PARTIE 5 - EXERCICE",
      p6:"PARTIE 6 - CAS RÉEL",
      transitionPhrase:"Meme un navire techniquement bien entretenu peut devenir non conforme si les procedures sont ignorees ou les registres falsifies.",
      closingPhrase:"La protection de l'environnement commence en salle des machines. Chaque officier machine est responsable de la protection des oceans.",
      p7:"PARTIE 7 - BANQUE DE QUESTIONS",
      sumT:"POINTS CLÉS",
      sumP:[
        "15 ppm = limite légale de teneur en huile pour tout rejet d'eaux de cale en mer",
        "L'OWS doit toujours fonctionner avec son arrêt automatique actif - jamais contourné",
        "L'Oil Record Book Part I trace chaque opération : ballastage, rejets, soutage, élimination de sludge",
        "Une fausse entrée ORB est une infraction distincte, cumulable avec le rejet illégal",
        "Les zones spéciales MARPOL interdisent tout rejet, même traité sous 15 ppm",
        "Un seul membre d'équipage peut déclencher une enquête complète en signalant une fraude",
      ],
      learnedP:[
        "Identifier les sources de pollution huileuse en salle des machines",
        "Utiliser l'OWS de façon conforme sans en réexpliquer la mécanique",
        "Tenir l'Oil Record Book Part I correctement (codes C, D, E, H)",
        "Reconnaître un magic pipe et une fausse entrée ORB",
        "Comprendre le rôle du whistleblower dans l'affaire Princess Cruise Lines",
      ],
    },
    en:{
      badge:"🛢️ Engine Module · Lesson 2/6 · ⭐ Premium · 200 XP",
      title:"MARPOL Annex I: Pollution Prevention in the Engine Room",
      intro:"Lesson 1 introduced you to the 6 MARPOL annexes as a whole. This lesson focuses on Annex I in daily practice: how an engine officer concretely applies oil pollution prevention rules - without re-explaining the separator's mechanical operation, already covered in Auxiliary Systems & Electricity, Lesson 3.\n\nGoal: recognize pollution sources, use the OWS in a compliant way, keep the Oil Record Book correctly, and recognize a non-conformity before it becomes a violation.",
      p1:"PART 1 - SOURCES OF OILY POLLUTION",
      s1:"In the engine room, oil pollution rarely comes from a single massive deliberate discharge - it most often comes from daily accumulation: untreated leaks, poorly stored oily rags, neglected bilge water. Each source below must be identified and managed before it reaches the discharge circuit.",
      p2:"PART 2 - THE OWS: COMPLIANT USE, NOT THE MECHANICS",
      s2:"This lesson does not re-explain the separator's internal operation (centrifugation, coalescence) - that is covered in Auxiliary Systems, Lesson 3. Here, the focus is on the regulatory checkpoints every officer must know and never bypass.",
      p3:"PART 3 - OIL RECORD BOOK PART I",
      s3:"ORB Part I is the legal document proving compliance of your oil-related operations. Each code corresponds to a specific type of operation. A missing, late, or false entry is as serious as an illegal discharge itself.\n\nThe Oil Record Book is a legal document, not a maintenance log.",
      p4:"PART 4 - PROHIBITED DISCHARGES & PSC INSPECTIONS",
      s4:"Certain practices turn simple negligence into a maritime crime. Understanding what is strictly prohibited - and how PSC inspectors detect it - protects the vessel as much as each crew member individually.",
      p5:"PART 5 - EXERCISE",
      p6:"PART 6 - REAL CASE",
      transitionPhrase:"Even a technically well-maintained vessel can become non-compliant if procedures are ignored or records are falsified.",
      closingPhrase:"Environmental protection begins in the engine room. Every engineer is responsible for protecting the ocean.",
      p7:"PART 7 - QUESTION BANK",
      sumT:"KEY POINTS",
      sumP:[
        "15 ppm = legal oil content limit for any bilge water discharge at sea",
        "The OWS must always operate with its automatic stop active - never bypassed",
        "Oil Record Book Part I traces every operation: ballasting, discharges, bunkering, sludge disposal",
        "A false ORB entry is a separate offense, cumulative with the illegal discharge",
        "MARPOL special areas prohibit any discharge, even treated below 15 ppm",
        "A single crew member can trigger a full investigation by reporting fraud",
      ],
      learnedP:[
        "Identify sources of oily pollution in the engine room",
        "Use the OWS in a compliant way without re-explaining its mechanics",
        "Keep the Oil Record Book Part I correctly (codes C, D, E, H)",
        "Recognize a magic pipe and a false ORB entry",
        "Understand the whistleblower's role in the Princess Cruise Lines case",
      ],
    },
    es:{
      badge:"🛢️ Módulo Máquinas · Lección 2/6 · ⭐ Premium · 200 XP",
      title:"MARPOL Anexo I: Prevención de la contaminación en la sala de máquinas",
      intro:"La Lección 1 te presentó los 6 anexos MARPOL en su conjunto. Esta lección se centra en el Anexo I en la práctica diaria: cómo un oficial de máquinas aplica concretamente las reglas anti-contaminación por hidrocarburos - sin volver a explicar el funcionamiento mecánico del separador, ya cubierto en Auxiliary Systems & Electricity, Lección 3.\n\nObjetivo: reconocer las fuentes de contaminación, usar el OWS de forma conforme, llevar el Oil Record Book correctamente, y reconocer una no conformidad antes de que se convierta en infracción.",
      p1:"PARTE 1 - FUENTES DE CONTAMINACIÓN POR ACEITE",
      s1:"En la sala de máquinas, la contaminación por hidrocarburos rara vez proviene de una única descarga masiva deliberada - suele venir de la acumulación diaria: fugas sin tratar, trapos con aceite mal almacenados, agua de sentina descuidada. Cada fuente debe identificarse y gestionarse antes de llegar al circuito de descarga.",
      p2:"PARTE 2 - EL OWS: USO CONFORME, NO LA MECÁNICA",
      s2:"Esta lección no vuelve a explicar el funcionamiento interno del separador (centrifugación, coalescencia) - eso se cubre en Auxiliary Systems, Lección 3. Aquí el foco está en los puntos de control regulatorios que todo oficial debe conocer y nunca eludir.",
      p3:"PARTE 3 - OIL RECORD BOOK PART I",
      s3:"El ORB Part I es el documento legal que prueba la conformidad de tus operaciones con hidrocarburos. Cada código corresponde a un tipo de operación específico. Una entrada faltante, tardía o falsa es tan grave como la propia descarga ilegal.\n\nEl Oil Record Book es un documento legal, no un diario de mantenimiento.",
      p4:"PARTE 4 - DESCARGAS PROHIBIDAS E INSPECCIONES PSC",
      s4:"Ciertas prácticas convierten una simple negligencia en un delito marítimo. Entender qué está estrictamente prohibido - y cómo lo detectan los inspectores PSC - protege tanto al buque como a cada tripulante individualmente.",
      p5:"PARTE 5 - EJERCICIO",
      p6:"PARTE 6 - CASO REAL",
      transitionPhrase:"Incluso un buque tecnicamente bien mantenido puede volverse no conforme si se ignoran los procedimientos o se falsifican los registros.",
      closingPhrase:"La proteccion del medio ambiente comienza en la sala de maquinas. Cada oficial de maquinas es responsable de proteger los oceanos.",
      p7:"PARTE 7 - BANCO DE PREGUNTAS",
      sumT:"PUNTOS CLAVE",
      sumP:[
        "15 ppm = límite legal de contenido de aceite para cualquier descarga de agua de sentina al mar",
        "El OWS siempre debe operar con su paro automático activo - nunca eludido",
        "El Oil Record Book Part I registra cada operación: lastrado, descargas, abastecimiento, eliminación de sludge",
        "Una entrada falsa en el ORB es una infracción distinta, acumulable con la descarga ilegal",
        "Las zonas especiales MARPOL prohíben cualquier descarga, incluso tratada bajo 15 ppm",
        "Un solo tripulante puede desencadenar una investigación completa al denunciar un fraude",
      ],
      learnedP:[
        "Identificar las fuentes de contaminación por aceite en la sala de máquinas",
        "Usar el OWS de forma conforme sin repetir su mecánica",
        "Llevar el Oil Record Book Part I correctamente (códigos C, D, E, H)",
        "Reconocer un magic pipe y una entrada falsa en el ORB",
        "Comprender el papel del denunciante en el caso Princess Cruise Lines",
      ],
    },
    pt:{
      badge:"🛢️ Módulo Máquinas · Lição 2/6 · ⭐ Premium · 200 XP",
      title:"MARPOL Anexo I: Prevenção da poluição na casa de máquinas",
      intro:"A Lição 1 apresentou os 6 anexos MARPOL em conjunto. Esta lição foca-se no Anexo I no dia a dia: como um oficial de máquinas aplica concretamente as regras anti-poluição por hidrocarbonetos - sem reexplicar o funcionamento mecânico do separador, já cobertos em Auxiliary Systems & Electricity, Lição 3.\n\nObjetivo: reconhecer as fontes de poluição, usar o OWS de forma conforme, manter o Oil Record Book corretamente, e reconhecer uma não conformidade antes que se torne uma infração.",
      p1:"PARTE 1 - FONTES DE POLUIÇÃO POR ÓLEO",
      s1:"Na casa de máquinas, a poluição por hidrocarbonetos raramente vem de uma única descarga massiva deliberada - geralmente vem do acúmulo diário: fugas não tratadas, panos com óleo mal armazenados, água de porão negligenciada. Cada fonte deve ser identificada e gerida antes de chegar ao circuito de descarga.",
      p2:"PARTE 2 - O OWS: USO CONFORME, NÃO A MECÂNICA",
      s2:"Esta lição não reexplica o funcionamento interno do separador (centrifugação, coalescência) - isso é coberto em Auxiliary Systems, Lição 3. Aqui o foco está nos pontos de controlo regulamentares que todo oficial deve conhecer e nunca contornar.",
      p3:"PARTE 3 - OIL RECORD BOOK PART I",
      s3:"O ORB Part I é o documento legal que comprova a conformidade das suas operações com hidrocarbonetos. Cada código corresponde a um tipo de operação específico. Uma entrada faltante, atrasada ou falsa é tão grave quanto a própria descarga ilegal.\n\nO Oil Record Book é um documento legal, não um diário de manutenção.",
      p4:"PARTE 4 - DESCARGAS PROIBIDAS E INSPEÇÕES PSC",
      s4:"Certas práticas transformam uma simples negligência em crime marítimo. Compreender o que é estritamente proibido - e como os inspetores PSC detetam isso - protege tanto o navio quanto cada membro da tripulação individualmente.",
      p5:"PARTE 5 - EXERCÍCIO",
      p6:"PARTE 6 - CASO REAL",
      transitionPhrase:"Mesmo um navio tecnicamente bem mantido pode se tornar nao conforme se os procedimentos forem ignorados ou os registos falsificados.",
      closingPhrase:"A protecao do ambiente comeca na casa de maquinas. Todo oficial de maquinas e responsavel por proteger os oceanos.",
      p7:"PARTE 7 - BANCO DE QUESTÕES",
      sumT:"PONTOS-CHAVE",
      sumP:[
        "15 ppm = limite legal de teor de óleo para qualquer descarga de água de porão no mar",
        "O OWS deve sempre operar com a sua parada automática ativa - nunca contornada",
        "O Oil Record Book Part I regista cada operação: lastro, descargas, abastecimento, eliminação de sludge",
        "Uma entrada falsa no ORB é uma infração distinta, cumulável com a descarga ilegal",
        "As zonas especiais MARPOL proíbem qualquer descarga, mesmo tratada abaixo de 15 ppm",
        "Um único membro da tripulação pode desencadear uma investigação completa ao denunciar uma fraude",
      ],
      learnedP:[
        "Identificar as fontes de poluição por óleo na casa de máquinas",
        "Usar o OWS de forma conforme sem reexplicar a sua mecânica",
        "Manter o Oil Record Book Part I corretamente (códigos C, D, E, H)",
        "Reconhecer um magic pipe e uma entrada falsa no ORB",
        "Compreender o papel do denunciante no caso Princess Cruise Lines",
      ],
    },
  };
  return d[lang] || d.fr;
};

export default function LessonMARPOL_L2({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
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
            <div style={{fontSize:10,color:C.green,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🛢️ {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 2/6":lang==="en"?"Lesson 2/6":lang==="es"?"Lección 2/6":"Lição 2/6"}</div>
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

            <SL icon="🌊" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🌊 {lang==="fr"?"SOURCES DE POLLUTION - INTERACTIF":lang==="en"?"POLLUTION SOURCES - INTERACTIVE":lang==="es"?"FUENTES DE CONTAMINACIÓN - INTERACTIVO":"FONTES DE POLUIÇÃO - INTERATIVO"}</div>
              <OilSourcesSVG lang={lang}/>
            </Card>

            <SL icon="⚙️" text={lc.p2} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.teal}33`}}>
              <div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>⚙️ {lang==="fr"?"OWS - POINTS DE CONTRÔLE":lang==="en"?"OWS - CHECKPOINTS":lang==="es"?"OWS - PUNTOS DE CONTROL":"OWS - PONTOS DE CONTROLO"}</div>
              <OWSComplianceSVG lang={lang}/>
            </Card>

            <SL icon="📋" text={lc.p3} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold2}33`,background:"linear-gradient(135deg,rgba(232,185,79,0.05),rgba(13,31,60,0.8))"}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📋 {lang==="fr"?"ORB PART I - CODES":lang==="en"?"ORB PART I - CODES":lang==="es"?"ORB PART I - CÓDIGOS":"ORB PART I - CÓDIGOS"}</div>
              <ORBPartISVG lang={lang}/>
            </Card>

            <SL icon="🚫" text={lc.p4} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}33`}}>
              <div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🚫 {lang==="fr"?"REJETS INTERDITS - INTERACTIF":lang==="en"?"PROHIBITED DISCHARGES - INTERACTIVE":lang==="es"?"DESCARGAS PROHIBIDAS - INTERACTIVO":"DESCARGAS PROIBIDAS - INTERATIVO"}</div>
              <ProhibitedSVG lang={lang}/>
            </Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><EngineRoomChecklist lang={lang}/></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise2 lang={lang} t={t}/></Card>

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
                {lang==="fr"?"Quiz - MARPOL Annexe I":lang==="en"?"Quiz - MARPOL Annex I":lang==="es"?"Quiz - MARPOL Anexo I":"Quiz - MARPOL Anexo I"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 2":lang==="en"?"Lesson 2":lang==="es"?"Lección 2":"Lição 2"}</div>
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
              {lang==="fr"?"LEÇON 3 - GESTION DES DÉCHETS (ANNEXE V) →":lang==="en"?"LESSON 3 - GARBAGE MANAGEMENT (ANNEX V) →":lang==="es"?"LECCIÓN 3 - GESTIÓN DE BASURAS (ANEXO V) →":"LIÇÃO 3 - GESTÃO DE LIXO (ANEXO V) →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
