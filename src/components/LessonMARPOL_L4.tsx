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
// SVG 1 - FUEL CHANGEOVER
// ══════════════════════════════════════
function FuelChangeoverSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"timing", icon:"⏱️", color:C.blue2,
      label:{fr:"Moment du changement",en:"Timing",es:"Momento del cambio",pt:"Momento da troca"},
      desc:{fr:"Le changement HFO -> LSFO doit commencer suffisamment tot avant l'entree en zone ECA pour que tout le circuit combustible soit charge en carburant conforme au moment du franchissement de la limite - jamais au dernier moment.",en:"The HFO -> LSFO changeover must start early enough before entering the ECA so the entire fuel system is fully charged with compliant fuel by the time the boundary is crossed - never at the last minute.",es:"El cambio HFO -> LSFO debe comenzar con suficiente antelacion antes de entrar en la zona ECA para que todo el circuito de combustible este cargado con combustible conforme al cruzar el limite - nunca en el ultimo momento.",pt:"A troca HFO -> LSFO deve comecar com antecedencia suficiente antes de entrar na zona ECA para que todo o circuito de combustivel esteja carregado com combustivel conforme ao cruzar o limite - nunca no ultimo momento."} },
    { id:"purge", icon:"🔄", color:C.teal,
      label:{fr:"Purge des lignes",en:"Line purging",es:"Purga de líneas",pt:"Purga das linhas"},
      desc:{fr:"Les lignes de combustible doivent etre progressivement purgees du HFO residuel pour eviter tout melange non conforme au moment de l'entree en zone ECA. Une purge incomplete peut laisser des traces de HFO detectables par un inspecteur.",en:"Fuel lines must be progressively purged of residual HFO to avoid any non-compliant mixture when entering the ECA. An incomplete purge can leave traces of HFO detectable by an inspector.",es:"Las lineas de combustible deben purgarse progresivamente del HFO residual para evitar cualquier mezcla no conforme al entrar en la zona ECA. Una purga incompleta puede dejar trazas de HFO detectables por un inspector.",pt:"As linhas de combustivel devem ser progressivamente purgadas do HFO residual para evitar qualquer mistura nao conforme ao entrar na zona ECA. Uma purga incompleta pode deixar tracos de HFO detetaveis por um inspetor."} },
    { id:"risk", icon:"⚠️", color:C.red,
      label:{fr:"Risque d'un changement trop rapide",en:"Risk of a too-fast changeover",es:"Riesgo de un cambio demasiado rápido",pt:"Risco de uma troca muito rápida"},
      desc:{fr:"Un changement de carburant precipite peut provoquer une perte brutale de viscosite, une perte de lubrification des pompes d'injection, et dans les cas graves un arret machine. Le changeover doit toujours etre progressif, jamais brusque - c'est une question operationnelle, pas seulement reglementaire.",en:"A rushed fuel changeover can cause a sudden loss of viscosity, loss of lubrication in the injection pumps, and in severe cases an engine stoppage. The changeover must always be gradual, never abrupt - this is an operational concern, not just a regulatory one.",es:"Un cambio de combustible precipitado puede provocar una perdida brusca de viscosidad, perdida de lubricacion de las bombas de inyeccion, y en casos graves una parada de maquina. El changeover siempre debe ser progresivo, nunca brusco.",pt:"Uma troca de combustivel apressada pode causar uma perda brusca de viscosidade, perda de lubrificacao das bombas de injecao, e em casos graves uma parada de maquina. O changeover deve ser sempre progressivo, nunca brusco."} },
    { id:"log", icon:"📖", color:C.gold2,
      label:{fr:"Inscription au journal machine",en:"Engine log entry",es:"Registro en el diario de máquinas",pt:"Registo no diário de máquinas"},
      desc:{fr:"Date, heure, position du navire, et niveaux de carburant dans chaque citerne doivent etre inscrits au debut et a la fin du changeover, conformement a la Regulation 14.6 de l'Annexe VI.",en:"Date, time, ship's position, and fuel levels in each tank must be logged at the start and end of the changeover, in accordance with Annex VI Regulation 14.6.",es:"Fecha, hora, posicion del buque y niveles de combustible en cada tanque deben registrarse al inicio y al final del changeover, conforme a la Regulacion 14.6 del Anexo VI.",pt:"Data, hora, posicao do navio e niveis de combustivel em cada tanque devem ser registados no inicio e no fim do changeover, conforme a Regulamento 14.6 do Anexo VI."} },
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
// SVG 2 - BUNKER DELIVERY NOTE (BDN)
// ══════════════════════════════════════
function BDNSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"content", icon:"📄", color:C.blue2,
      label:{fr:"Contenu obligatoire",en:"Mandatory content",es:"Contenido obligatorio",pt:"Conteúdo obrigatório"},
      desc:{fr:"Nom du navire, port et date de livraison, nom du fournisseur, quantite, type de carburant et teneur en soufre declaree. Toute information manquante rend le document incomplet aux yeux d'un inspecteur.",en:"Ship's name, port and date of delivery, supplier's name, quantity, fuel type and declared sulfur content. Any missing information makes the document incomplete in an inspector's eyes.",es:"Nombre del buque, puerto y fecha de entrega, nombre del proveedor, cantidad, tipo de combustible y contenido de azufre declarado. Cualquier informacion faltante hace el documento incompleto.",pt:"Nome do navio, porto e data de entrega, nome do fornecedor, quantidade, tipo de combustivel e teor de enxofre declarado. Qualquer informacao faltante torna o documento incompleto."} },
    { id:"verify", icon:"🔍", color:C.teal,
      label:{fr:"Vérification à la réception",en:"Verification on receipt",es:"Verificación al recibir",pt:"Verificação ao receber"},
      desc:{fr:"A chaque soutage, l'officier responsable doit verifier que les informations du BDN correspondent a la commande passee, avant de signer. Une divergence non signalee engage la responsabilite de l'officier signataire.",en:"At every bunkering, the responsible officer must verify that the BDN information matches the order placed, before signing. An unreported discrepancy engages the responsibility of the signing officer.",es:"En cada abastecimiento, el oficial responsable debe verificar que la informacion del BDN coincide con el pedido realizado, antes de firmar. Una discrepancia no notificada compromete la responsabilidad del oficial firmante.",pt:"Em cada abastecimento, o oficial responsavel deve verificar que as informacoes do BDN correspondem ao pedido feito, antes de assinar. Uma discrepancia nao reportada compromete a responsabilidade do oficial signatario."} },
    { id:"retention", icon:"🗄️", color:C.gold2,
      label:{fr:"Durée de conservation",en:"Retention period",es:"Período de conservación",pt:"Período de conservação"},
      desc:{fr:"Le BDN doit etre conserve a bord 3 ans apres la livraison du carburant, disponible a tout moment pour une inspection PSC - meme regle que l'Oil Record Book et le Garbage Record Book.",en:"The BDN must be kept on board for 3 years after fuel delivery, available at any time for a PSC inspection - same rule as the Oil Record Book and the Garbage Record Book.",es:"El BDN debe conservarse a bordo 3 anos despues de la entrega del combustible, disponible en cualquier momento para una inspeccion PSC - misma regla que el Oil Record Book y el Garbage Record Book.",pt:"O BDN deve ser conservado a bordo por 3 anos apos a entrega do combustivel, disponivel a qualquer momento para uma inspecao PSC - mesma regra que o Oil Record Book e o Garbage Record Book."} },
    { id:"legal", icon:"⚖️", color:C.red,
      label:{fr:"Valeur légale",en:"Legal value",es:"Valor legal",pt:"Valor legal"},
      desc:{fr:"Le Bunker Delivery Note est a la fois un document operationnel et un document legal. C'est un document légal et il doit être rempli avec exactitude et sincérité - une fausse declaration de teneur en soufre expose le navire et le signataire a des poursuites.",en:"The Bunker Delivery Note is both an operational and a legal document. This is a legal document and must be completed accurately and truthfully - a false sulfur content declaration exposes the vessel and the signatory to prosecution.",es:"El Bunker Delivery Note es a la vez un documento operativo y un documento legal. Este es un documento legal y debe completarse con exactitud y sinceridad - una declaracion falsa de contenido de azufre expone al buque y al firmante a acciones legales.",pt:"O Bunker Delivery Note e simultaneamente um documento operacional e um documento legal. Este e um documento legal e deve ser preenchido com exatidao e veracidade - uma declaracao falsa de teor de enxofre expoe o navio e o signatario a processos."} },
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
// SVG 3 - FUEL SAMPLING
// ══════════════════════════════════════
function FuelSamplingSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"procedure", icon:"🧪", color:C.blue2,
      label:{fr:"Prélèvement obligatoire",en:"Mandatory sampling",es:"Muestreo obligatorio",pt:"Amostragem obrigatória"},
      desc:{fr:"Un echantillon representatif doit etre preleve a chaque soutage, au point de transfert, en presence du fournisseur et d'un representant du navire.",en:"A representative sample must be taken at every bunkering, at the transfer point, in the presence of the supplier and a vessel representative.",es:"Se debe tomar una muestra representativa en cada abastecimiento, en el punto de transferencia, en presencia del proveedor y de un representante del buque.",pt:"Uma amostra representativa deve ser recolhida em cada abastecimento, no ponto de transferencia, na presenca do fornecedor e de um representante do navio."} },
    { id:"seal", icon:"🔒", color:C.teal,
      label:{fr:"Scellage et étiquetage",en:"Sealing and labeling",es:"Sellado y etiquetado",pt:"Selagem e rotulagem"},
      desc:{fr:"L'echantillon est scelle immediatement avec un numero de scelle unique, etiquete avec la date, le port et le navire, puis conserve a bord 12 mois minimum a compter de la livraison.",en:"The sample is sealed immediately with a unique seal number, labeled with the date, port and vessel, then kept on board for a minimum of 12 months from delivery.",es:"La muestra se sella inmediatamente con un numero de sello unico, etiquetada con la fecha, el puerto y el buque, y se conserva a bordo un minimo de 12 meses desde la entrega.",pt:"A amostra e selada imediatamente com um numero de selo unico, rotulada com a data, o porto e o navio, e conservada a bordo por no minimo 12 meses a partir da entrega."} },
    { id:"custody", icon:"🔗", color:C.gold2,
      label:{fr:"Chaîne de conservation",en:"Chain of custody",es:"Cadena de custodia",pt:"Cadeia de custódia"},
      desc:{fr:"La chain of custody documente chaque manipulation de l'echantillon depuis le prelevement jusqu'a l'analyse - qui l'a scelle, qui l'a stocke, qui l'a transporte. Toute rupture dans cette chaine affaiblit la valeur de l'echantillon en cas de litige.",en:"The chain of custody documents every handling of the sample from collection to analysis - who sealed it, who stored it, who transported it. Any break in this chain weakens the sample's value in a dispute.",es:"La cadena de custodia documenta cada manipulacion de la muestra desde la recogida hasta el analisis - quien la sello, quien la almaceno, quien la transporto. Cualquier ruptura en esta cadena debilita el valor de la muestra en caso de litigio.",pt:"A cadeia de custodia documenta cada manipulacao da amostra desde a recolha até a analise - quem a selou, quem a armazenou, quem a transportou. Qualquer quebra nessa cadeia debilita o valor da amostra em caso de litigio."} },
    { id:"open", icon:"🔓", color:C.red,
      label:{fr:"Qui peut demander l'ouverture",en:"Who can request opening",es:"Quién puede solicitar la apertura",pt:"Quem pode solicitar a abertura"},
      desc:{fr:"Seuls un inspecteur PSC, l'administration du pavillon, ou une autorite competente en cas de litige commercial peuvent demander l'ouverture officielle d'un echantillon scelle. Un membre d'equipage ne l'ouvre jamais de sa propre initiative.",en:"Only a PSC inspector, the flag administration, or a competent authority in a commercial dispute can request the official opening of a sealed sample. A crew member never opens it on their own initiative.",es:"Solo un inspector PSC, la administracion del pabellon, o una autoridad competente en caso de litigio comercial pueden solicitar la apertura oficial de una muestra sellada. Un tripulante nunca la abre por iniciativa propia.",pt:"Apenas um inspetor PSC, a administracao da bandeira, ou uma autoridade competente em caso de litigio comercial podem solicitar a abertura oficial de uma amostra selada. Um tripulante nunca a abre por iniciativa propria."} },
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
// SVG 4 - SCRUBBER (REGULATORY ONLY) + EEXI/CII BRIEF
// ══════════════════════════════════════
function ScrubberSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"why", icon:"✅", color:C.blue2,
      label:{fr:"Pourquoi il est autorisé",en:"Why it is authorized",es:"Por qué está autorizado",pt:"Por que é autorizado"},
      desc:{fr:"Un scrubber (Exhaust Gas Cleaning System) reduit chimiquement le SOx des gaz d'echappement, ce qui permet a un navire de continuer a bruler du HFO riche en soufre tout en respectant les limites reglementaires - une methode de conformite equivalente reconnue par MARPOL Annexe VI, Regulation 4.",en:"A scrubber (Exhaust Gas Cleaning System) chemically reduces SOx in exhaust gases, allowing a vessel to keep burning high-sulfur HFO while still meeting regulatory limits - an equivalent compliance method recognized under MARPOL Annex VI, Regulation 4.",es:"Un scrubber (Exhaust Gas Cleaning System) reduce quimicamente el SOx de los gases de escape, lo que permite a un buque seguir quemando HFO rico en azufre cumpliendo los limites reglamentarios - un metodo de cumplimiento equivalente reconocido por el Anexo VI, Regulacion 4.",pt:"Um scrubber (Exhaust Gas Cleaning System) reduz quimicamente o SOx dos gases de escape, permitindo que um navio continue a queimar HFO rico em enxofre respeitando os limites regulamentares - um metodo de conformidade equivalente reconhecido pelo Anexo VI, Regulamento 4."} },
    { id:"when", icon:"🕐", color:C.teal,
      label:{fr:"Quand il peut être utilisé",en:"When it can be used",es:"Cuándo puede usarse",pt:"Quando pode ser usado"},
      desc:{fr:"Un scrubber ne peut etre utilise que s'il est pleinement operationnel et maintient les emissions sous les limites applicables a la zone traversee. Un scrubber en panne n'excuse pas l'usage de carburant non conforme.",en:"A scrubber can only be used if it is fully operational and keeps emissions below the limits applicable to the area transited. A malfunctioning scrubber does not excuse the use of non-compliant fuel.",es:"Un scrubber solo puede usarse si esta plenamente operativo y mantiene las emisiones por debajo de los limites aplicables a la zona transitada. Un scrubber averiado no excusa el uso de combustible no conforme.",pt:"Um scrubber so pode ser usado se estiver plenamente operacional e mantiver as emissoes abaixo dos limites aplicaveis a zona percorrida. Um scrubber avariado nao justifica o uso de combustivel nao conforme."} },
    { id:"restrict", icon:"⛔", color:C.red,
      label:{fr:"Restrictions portuaires",en:"Port restrictions",es:"Restricciones portuarias",pt:"Restrições portuárias"},
      desc:{fr:"Plusieurs ports et Etats interdisent le rejet des eaux de lavage des scrubbers en boucle ouverte (open loop) dans leurs eaux territoriales, meme si le navire est en conformite SOx. Le navire doit verifier ces restrictions locales avant d'entrer dans chaque port.",en:"Several ports and states prohibit open-loop scrubber washwater discharge in their territorial waters, even if the vessel is SOx-compliant. The vessel must check these local restrictions before entering each port.",es:"Varios puertos y estados prohiben la descarga de agua de lavado de scrubbers en circuito abierto en sus aguas territoriales, incluso si el buque cumple con el SOx. El buque debe verificar estas restricciones locales antes de entrar en cada puerto.",pt:"Varios portos e estados proibem a descarga de agua de lavagem de scrubbers em circuito aberto em suas aguas territoriais, mesmo que o navio esteja em conformidade com o SOx. O navio deve verificar essas restricoes locais antes de entrar em cada porto."} },
  ];
  const sel_ = sel ? items.find(i=>i.id===sel) : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
        {items.map(it=>(
          <div key={it.id} onClick={()=>setSel(sel===it.id?null:it.id)}
            style={{padding:"10px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",gridColumn: it.id==="restrict"?"1 / span 2":"auto",
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
        {lang==="fr"?"ℹ️ Cette lecon couvre le role reglementaire du scrubber, pas sa mecanique interne (pompes, buses, echangeurs)":lang==="en"?"ℹ️ This lesson covers the scrubber's regulatory role, not its internal mechanics (pumps, nozzles, exchangers)":lang==="es"?"ℹ️ Esta leccion cubre el rol reglamentario del scrubber, no su mecanica interna (bombas, boquillas, intercambiadores)":"ℹ️ Esta licao cobre o papel regulamentar do scrubber, nao a sua mecanica interna (bombas, bicos, permutadores)"}
      </div>
      <div style={{marginTop:10,padding:"10px 12px",borderRadius:10,background:"rgba(26,111,212,0.08)",border:`1px solid ${C.blue}33`,fontSize:11,color:C.blue2,lineHeight:1.6}}>
        {lang==="fr"?"Les reglementations environnementales modernes incluent aussi des mesures d'efficacite energetique comme l'EEXI et le CII. Ces sujets sont couverts en detail dans le futur module SEEMP & Energy Efficiency.":lang==="en"?"Modern environmental regulations also include energy-efficiency measures such as EEXI and CII. These topics are covered in detail in the dedicated SEEMP & Energy Efficiency module.":lang==="es"?"Las regulaciones ambientales modernas tambien incluyen medidas de eficiencia energetica como el EEXI y el CII. Estos temas se cubren en detalle en el futuro modulo SEEMP & Energy Efficiency.":"As regulamentacoes ambientais modernas tambem incluem medidas de eficiencia energetica como o EEXI e o CII. Esses temas sao cobertos em detalhe no futuro modulo SEEMP & Energy Efficiency."}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// FUEL & EMISSIONS COMPLIANCE CHECKLIST
// ══════════════════════════════════════
function FuelChecklist({ lang }) {
  const items = {
    fr:["Fuel changeover effectué et enregistré","BDN disponible à bord","Échantillon MARPOL correctement scellé","Certificat IAPP valide","Teneur en soufre conforme à la zone de navigation","Scrubber fonctionnant dans les limites réglementaires (si équipé)"],
    en:["Fuel changeover completed and recorded","BDN available onboard","MARPOL fuel sample correctly sealed","IAPP Certificate valid","Sulphur content compliant with sailing area","Scrubber operating within regulatory limits (if fitted)"],
    es:["Fuel changeover completado y registrado","BDN disponible a bordo","Muestra MARPOL correctamente sellada","Certificado IAPP válido","Contenido de azufre conforme a la zona de navegación","Scrubber funcionando dentro de los límites reglamentarios (si está instalado)"],
    pt:["Fuel changeover concluído e registado","BDN disponível a bordo","Amostra MARPOL corretamente selada","Certificado IAPP válido","Teor de enxofre conforme a zona de navegação","Scrubber operando dentro dos limites regulamentares (se instalado)"],
  };
  const title = {fr:"Checklist - Conformité carburant & émissions",en:"Fuel & Emissions Compliance Checklist",es:"Checklist - Cumplimiento de combustible y emisiones",pt:"Checklist - Conformidade de combustível e emissões"};
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
function Exercise4({ lang, t }) {
  const [ans,setAns]=useState({q1:"",q2:"",q3:""});
  const [showC,setShowC]=useState(false);
  const correct={q1:"0.1",q2:"3",q3:"non"};
  const qs={
    fr:[
      {id:"q1",q:"Limite SOx en zone ECA depuis 2020 (en %) ?"},
      {id:"q2",q:"Durée de conservation obligatoire du Bunker Delivery Note (en années) ?"},
      {id:"q3",q:"Peut-on commencer le fuel changeover au moment exact de l'entrée en zone ECA ?\n(Réponds par oui/non puis explique)"},
    ],
    en:[
      {id:"q1",q:"SOx limit in an ECA since 2020 (in %)?"},
      {id:"q2",q:"Mandatory retention period for the Bunker Delivery Note (in years)?"},
      {id:"q3",q:"Can the fuel changeover start exactly at the moment of entering the ECA?\n(Answer yes/no then explain)"},
    ],
    es:[
      {id:"q1",q:"¿Límite de SOx en zona ECA desde 2020 (en %)?"},
      {id:"q2",q:"¿Período obligatorio de conservación del Bunker Delivery Note (en años)?"},
      {id:"q3",q:"¿Se puede comenzar el fuel changeover justo al entrar en la zona ECA?\n(Responde sí/no y explica)"},
    ],
    pt:[
      {id:"q1",q:"Limite de SOx em zona ECA desde 2020 (em %)?"},
      {id:"q2",q:"Período obrigatório de conservação do Bunker Delivery Note (em anos)?"},
      {id:"q3",q:"O fuel changeover pode começar exatamente no momento de entrada na zona ECA?\n(Responda sim/não e explique)"},
    ],
  };
  const list=qs[lang]||qs.fr;
  const chk=(id,val)=>{
    const v=val.trim().toLowerCase().replace(",",".");
    if(id==="q1") return v==="0.1"||v==="0,1"||v==="0.1%";
    if(id==="q2") return v==="3"||v==="3 ans"||v==="3 years";
    if(id==="q3") return v.includes("non")||v.includes("no");
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.green}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : ECA SOx 0,1% · BDN conservé 3 ans · fuel changeover toujours progressif, jamais instantané"
        :lang==="en"?"💡 Reminders: ECA SOx 0.1% · BDN kept 3 years · fuel changeover always gradual, never instant"
        :lang==="es"?"💡 Recordatorios: ECA SOx 0,1% · BDN conservado 3 años · fuel changeover siempre progresivo, nunca instantáneo"
        :"💡 Lembretes: ECA SOx 0,1% · BDN conservado 3 anos · fuel changeover sempre progressivo, nunca instantâneo"}
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
        {lang==="fr"?"✅ Q1: 0,1% en zone ECA\n✅ Q2: 3 ans à bord\n✅ Q3: Non - un changement instantané provoque une perte brutale de viscosité et un risque de perte de lubrification des pompes d'injection. Le changeover doit être amorcé suffisamment tôt pour être progressif."
        :lang==="en"?"✅ Q1: 0.1% in an ECA\n✅ Q2: 3 years onboard\n✅ Q3: No - an instant changeover causes a sudden loss of viscosity and a risk of losing injection pump lubrication. The changeover must be started early enough to be gradual."
        :"✅ Q1: 0.1% · Q2: 3 · Q3: No/Non"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE - Ocean Princess (2018-2019)
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"Fraude Annexe VI - M/T Ocean Princess (2018-2019)",teaser:"Tanker · BDN falsifiés · Carburant non conforme en ECA · Amende de 2 millions $ · Capitaine détenu 408 jours",
      what:"En juillet 2018, la Coast Guard americaine inspecte le tanker Ocean Princess et constate des incoherences dans les Bunker Delivery Notes. L'enquete revele que le navire naviguait en zone ECA Caraibes avec un carburant depassant la limite de 0,1% de soufre. Le carburant provenait en realite des citernes de cargaison, preleve sans aucune inscription a l'Oil Record Book Part II. Le Chef mecanicien avait falsifie l'ORB Part I et cree de faux BDN. Le Second capitaine avait ordonne a l'equipage de mentir a la Coast Guard. Le 23 aout 2019, le tribunal federal des Iles Vierges americaines rend son jugement - la premiere poursuite du Departement de la Justice specifiquement fondee sur l'Annexe VI.",
      cause:"• Carburant non conforme utilise en zone ECA (au-dessus de 0,1% de soufre)\n• Carburant preleve des citernes de cargaison sans inscription a l'ORB Part II\n• Oil Record Book Part I falsifie par le Chef mecanicien, faux BDN crees\n• Second capitaine ayant ordonne a l'equipage de mentir aux inspecteurs\n• Poursuites etendues au proprietaire, au gestionnaire commercial, au Capitaine et au Second capitaine",
      lessons:"✓ Les incoherences dans les BDN sont l'un des premiers signaux detectes par un inspecteur\n✓ Un carburant preleve hors circuit normal doit toujours etre documente, sans exception\n✓ Un gestionnaire commercial peut etre personnellement poursuivi pour avoir ordonne l'usage de carburant non conforme\n✓ Suivre une pratique existante a bord sans la remettre en question n'exonere pas de responsabilite\n\nLesson learned : Un carburant non conforme n'est jamais seulement une question de cout - c'est une infraction penale qui peut mettre fin a une carriere de plusieurs decennies, comme celle du Capitaine de 80 ans condamne apres 408 jours de detention."},
    en:{title:"Annex VI Fraud - M/T Ocean Princess (2018-2019)",teaser:"Tanker · Falsified BDNs · Non-compliant fuel in ECA · $2 million fine · Master detained 408 days",
      what:"In July 2018, the US Coast Guard inspected the tanker Ocean Princess and found discrepancies in the Bunker Delivery Notes. The investigation revealed the vessel had been sailing in the Caribbean ECA with fuel exceeding the 0.1% sulfur limit. The fuel actually came from cargo tanks, taken with no entry in the Oil Record Book Part II. The Chief Engineer had falsified the ORB Part I and created false BDNs. The Chief Officer had directed the crew to lie to the Coast Guard. On August 23, 2019, the federal court of the US Virgin Islands issued its ruling - the first Department of Justice prosecution specifically based on Annex VI.",
      cause:"• Non-compliant fuel used in the ECA (above 0.1% sulfur)\n• Fuel drawn from cargo tanks with no entry in ORB Part II\n• Oil Record Book Part I falsified by the Chief Engineer, false BDNs created\n• Chief Officer directed the crew to lie to inspectors\n• Prosecution extended to the owner, the commercial manager, the Master and the Chief Officer",
      lessons:"✓ Discrepancies in BDNs are among the first signals detected by an inspector\n✓ Fuel drawn outside the normal circuit must always be documented, no exceptions\n✓ A commercial manager can be personally prosecuted for directing the use of non-compliant fuel\n✓ Following an existing onboard practice without questioning it does not exempt from liability\n\nLesson learned: Non-compliant fuel is never just a cost issue - it is a criminal offense that can end a decades-long career, as it did for the 80-year-old Master convicted after 408 days of detention."},
    es:{title:"Fraude Anexo VI - M/T Ocean Princess (2018-2019)",teaser:"Tanquero · BDN falsificados · Combustible no conforme en ECA · Multa de 2 millones $ · Capitán detenido 408 días",
      what:"En julio de 2018, la Guardia Costera de EE.UU. inspecciono el tanquero Ocean Princess y encontro incoherencias en los Bunker Delivery Notes. La investigacion revelo que el buque navegaba en la ECA del Caribe con combustible que superaba el limite de 0,1% de azufre. El combustible provenia en realidad de los tanques de carga, extraido sin ninguna entrada en el Oil Record Book Part II. El Jefe de Maquinas habia falsificado el ORB Part I y creado falsos BDN. El Primer Oficial habia ordenado a la tripulacion mentir a la Guardia Costera. El 23 de agosto de 2019, el tribunal federal de las Islas Virgenes de EE.UU. emitio su fallo - la primera acusacion del Departamento de Justicia basada especificamente en el Anexo VI.",
      cause:"• Combustible no conforme usado en la ECA (por encima de 0,1% de azufre)\n• Combustible extraido de los tanques de carga sin entrada en el ORB Part II\n• Oil Record Book Part I falsificado por el Jefe de Maquinas, BDN falsos creados\n• Primer Oficial ordeno a la tripulacion mentir a los inspectores\n• Acusaciones extendidas al propietario, al gestor comercial, al Capitan y al Primer Oficial",
      lessons:"✓ Las incoherencias en los BDN son una de las primeras senales detectadas por un inspector\n✓ El combustible extraido fuera del circuito normal siempre debe documentarse, sin excepcion\n✓ Un gestor comercial puede ser procesado personalmente por ordenar el uso de combustible no conforme\n✓ Seguir una practica existente a bordo sin cuestionarla no exime de responsabilidad\n\nLesson learned: Un combustible no conforme nunca es solo una cuestion de costo - es un delito penal que puede terminar una carrera de decadas, como le ocurrio al Capitan de 80 anos condenado tras 408 dias de detencion."},
    pt:{title:"Fraude Anexo VI - M/T Ocean Princess (2018-2019)",teaser:"Petroleiro · BDN falsificados · Combustível não conforme em ECA · Multa de 2 milhões $ · Comandante detido 408 dias",
      what:"Em julho de 2018, a Guarda Costeira dos EUA inspecionou o petroleiro Ocean Princess e encontrou incoerencias nos Bunker Delivery Notes. A investigacao revelou que o navio navegava na ECA do Caribe com combustivel que excedia o limite de 0,1% de enxofre. O combustivel provinha na verdade dos tanques de carga, retirado sem nenhuma entrada no Oil Record Book Part II. O Chefe de Maquinas havia falsificado o ORB Part I e criado falsos BDN. O Imediato havia ordenado a tripulacao mentir a Guarda Costeira. Em 23 de agosto de 2019, o tribunal federal das Ilhas Virgens dos EUA emitiu sua decisao - a primeira acusacao do Departamento de Justica baseada especificamente no Anexo VI.",
      cause:"• Combustivel nao conforme usado na ECA (acima de 0,1% de enxofre)\n• Combustivel retirado dos tanques de carga sem entrada no ORB Part II\n• Oil Record Book Part I falsificado pelo Chefe de Maquinas, BDN falsos criados\n• Imediato ordenou a tripulacao mentir aos inspetores\n• Acusacoes estendidas ao proprietario, ao gestor comercial, ao Comandante e ao Imediato",
      lessons:"✓ As incoerencias nos BDN estao entre os primeiros sinais detetados por um inspetor\n✓ Combustivel retirado fora do circuito normal deve sempre ser documentado, sem excecoes\n✓ Um gestor comercial pode ser processado pessoalmente por ordenar o uso de combustivel nao conforme\n✓ Seguir uma pratica existente a bordo sem questiona-la nao isenta de responsabilidade\n\nLesson learned: Combustivel nao conforme nunca e apenas uma questao de custo - e um crime que pode terminar uma carreira de decadas, como aconteceu com o Comandante de 80 anos condenado apos 408 dias de detencao."},
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
    {q:"Quelle est la limite SOx en zone ECA depuis 2020 ?",opts:["0,5%","0,1%","1,5%","3,5%"],correct:1,expl:"Depuis 2020, la limite SOx en zone ECA est de 0,1%, contre 0,5% dans le reste des océans."},
    {q:"Pourquoi le fuel changeover doit-il être progressif plutôt qu'instantané ?",opts:["Cela n'a aucune importance","Un changement trop rapide risque une perte de viscosité et de lubrification des pompes d'injection","Cela accélère la combustion","Il n'existe aucune règle à ce sujet"],correct:1,expl:"Un changement précipité peut provoquer une perte brutale de viscosité et un risque de perte de lubrification des pompes d'injection, voire un arrêt machine."},
    {q:"Quel document doit accompagner chaque livraison de carburant et être conservé 3 ans ?",opts:["Le certificat IAPP","Le Bunker Delivery Note (BDN)","Le Garbage Record Book","Le journal de passerelle"],correct:1,expl:"Le BDN doit accompagner chaque livraison de carburant et être conservé à bord 3 ans après la livraison."},
    {q:"Comment l'affaire Ocean Princess a-t-elle été détectée en premier lieu ?",opts:["Un dénonciateur interne","Des incohérences dans les Bunker Delivery Notes relevées par la Coast Guard","Une plainte de passagers","Un audit volontaire de la compagnie"],correct:1,expl:"L'inspection de la Coast Guard a d'abord relevé des incohérences dans les BDN, ce qui a déclenché l'enquête complète."},
    {q:"Une panne de scrubber excuse-t-elle l'usage d'un carburant non conforme ?",opts:["Oui, toujours","Non, un scrubber en panne n'excuse jamais l'usage de carburant non conforme","Oui, pendant 24 heures maximum","Cela dépend du pavillon uniquement"],correct:1,expl:"Un scrubber ne peut être utilisé comme méthode de conformité que s'il est pleinement opérationnel - sa panne n'excuse jamais l'usage de carburant non conforme."},
  ],
  en:[
    {q:"What is the SOx limit in an ECA since 2020?",opts:["0.5%","0.1%","1.5%","3.5%"],correct:1,expl:"Since 2020, the SOx limit in an ECA is 0.1%, compared to 0.5% in the rest of the oceans."},
    {q:"Why must the fuel changeover be gradual rather than instant?",opts:["It does not matter at all","A too-fast changeover risks losing viscosity and injection pump lubrication","It speeds up combustion","No rule exists on this"],correct:1,expl:"A rushed changeover can cause a sudden loss of viscosity and a risk of losing injection pump lubrication, or even an engine stoppage."},
    {q:"Which document must accompany every fuel delivery and be kept for 3 years?",opts:["The IAPP certificate","The Bunker Delivery Note (BDN)","The Garbage Record Book","The bridge logbook"],correct:1,expl:"The BDN must accompany every fuel delivery and be kept on board for 3 years after delivery."},
    {q:"How was the Ocean Princess case first detected?",opts:["An internal whistleblower","Discrepancies in the Bunker Delivery Notes noted by the Coast Guard","A passenger complaint","A voluntary company audit"],correct:1,expl:"The Coast Guard inspection first noted discrepancies in the BDNs, which triggered the full investigation."},
    {q:"Does a scrubber malfunction excuse the use of non-compliant fuel?",opts:["Yes, always","No, a malfunctioning scrubber never excuses the use of non-compliant fuel","Yes, for a maximum of 24 hours","It depends only on the flag"],correct:1,expl:"A scrubber can only be used as a compliance method if fully operational - its malfunction never excuses the use of non-compliant fuel."},
  ],
  es:[
    {q:"¿Cuál es el límite de SOx en zona ECA desde 2020?",opts:["0,5%","0,1%","1,5%","3,5%"],correct:1,expl:"Desde 2020, el límite de SOx en zona ECA es del 0,1%, frente al 0,5% en el resto de los océanos."},
    {q:"¿Por qué el fuel changeover debe ser progresivo y no instantáneo?",opts:["No tiene ninguna importancia","Un cambio demasiado rápido arriesga una pérdida de viscosidad y de lubricación de las bombas de inyección","Acelera la combustión","No existe ninguna regla al respecto"],correct:1,expl:"Un cambio precipitado puede provocar una pérdida brusca de viscosidad y un riesgo de pérdida de lubricación de las bombas de inyección."},
    {q:"¿Qué documento debe acompañar cada entrega de combustible y conservarse 3 años?",opts:["El certificado IAPP","El Bunker Delivery Note (BDN)","El Garbage Record Book","El diario de puente"],correct:1,expl:"El BDN debe acompañar cada entrega de combustible y conservarse a bordo 3 años tras la entrega."},
    {q:"¿Cómo se detectó por primera vez el caso Ocean Princess?",opts:["Un denunciante interno","Incoherencias en los Bunker Delivery Notes detectadas por la Guardia Costera","Una queja de pasajeros","Una auditoría voluntaria de la compañía"],correct:1,expl:"La inspección de la Guardia Costera detectó primero incoherencias en los BDN, lo que desencadenó la investigación completa."},
    {q:"¿Una avería del scrubber excusa el uso de combustible no conforme?",opts:["Sí, siempre","No, un scrubber averiado nunca excusa el uso de combustible no conforme","Sí, durante 24 horas máximo","Depende únicamente del pabellón"],correct:1,expl:"Un scrubber solo puede usarse como método de cumplimiento si está plenamente operativo - su avería nunca excusa el uso de combustible no conforme."},
  ],
  pt:[
    {q:"Qual é o limite de SOx em zona ECA desde 2020?",opts:["0,5%","0,1%","1,5%","3,5%"],correct:1,expl:"Desde 2020, o limite de SOx em zona ECA é de 0,1%, contra 0,5% no resto dos oceanos."},
    {q:"Por que o fuel changeover deve ser progressivo e não instantâneo?",opts:["Não tem nenhuma importância","Uma troca muito rápida arrisca perda de viscosidade e de lubrificação das bombas de injeção","Acelera a combustão","Não existe nenhuma regra sobre isso"],correct:1,expl:"Uma troca precipitada pode causar uma perda brusca de viscosidade e um risco de perda de lubrificação das bombas de injeção."},
    {q:"Qual documento deve acompanhar cada entrega de combustível e ser conservado por 3 anos?",opts:["O certificado IAPP","O Bunker Delivery Note (BDN)","O Garbage Record Book","O diário de passadiço"],correct:1,expl:"O BDN deve acompanhar cada entrega de combustível e ser conservado a bordo por 3 anos após a entrega."},
    {q:"Como o caso Ocean Princess foi detetado pela primeira vez?",opts:["Um denunciante interno","Incoerências nos Bunker Delivery Notes detetadas pela Guarda Costeira","Uma reclamação de passageiros","Uma auditoria voluntária da empresa"],correct:1,expl:"A inspeção da Guarda Costeira detetou primeiro incoerências nos BDN, o que desencadeou a investigação completa."},
    {q:"Uma avaria do scrubber justifica o uso de combustível não conforme?",opts:["Sim, sempre","Não, um scrubber avariado nunca justifica o uso de combustível não conforme","Sim, por 24 horas no máximo","Depende apenas da bandeira"],correct:1,expl:"Um scrubber só pode ser usado como método de conformidade se estiver plenamente operacional - sua avaria nunca justifica o uso de combustível não conforme."},
  ],
};

const BANK = {
  fr:[
    {q:"Quelle est la limite SOx mondiale (hors ECA) depuis le 1er janvier 2020 ?",opts:["3,5%","1,0%","0,5%","0,1%"],correct:2,expl:"Depuis IMO 2020, la limite SOx mondiale hors ECA est de 0,5%, contre 3,5% auparavant."},
    {q:"À quel moment doit débuter le fuel changeover avant l'entrée en zone ECA ?",opts:["Exactement au franchissement de la limite","Suffisamment tôt pour que le circuit soit entièrement chargé en carburant conforme avant le franchissement","Une fois entré dans la zone","Peu importe le moment"],correct:1,expl:"Le changeover doit commencer suffisamment en amont pour que tout le circuit combustible soit conforme avant le franchissement de la limite ECA."},
    {q:"Que risque-t-on avec un changement de carburant trop rapide ?",opts:["Rien de particulier","Une perte de viscosité et de lubrification des pompes d'injection","Une augmentation de la puissance moteur","Une économie de carburant"],correct:1,expl:"Un changement précipité peut provoquer une perte brutale de viscosité et un risque de perte de lubrification des pompes d'injection."},
    {q:"Quelles informations doivent obligatoirement figurer sur le BDN ?",opts:["Uniquement le prix du carburant","Nom du navire, port et date, fournisseur, quantité, type et teneur en soufre","Uniquement la signature du capitaine","Aucune information n'est obligatoire"],correct:1,expl:"Le BDN doit contenir le nom du navire, le port et la date de livraison, le fournisseur, la quantité, le type de carburant et la teneur en soufre déclarée."},
    {q:"Le Bunker Delivery Note est-il uniquement un document opérationnel ?",opts:["Oui, uniquement opérationnel","Non, c'est à la fois un document opérationnel et un document légal","Non, uniquement un document commercial","Non, c'est un simple reçu"],correct:1,expl:"Le BDN est à la fois un document opérationnel et un document légal, qui doit être rempli avec exactitude et sincérité."},
    {q:"Combien de temps le BDN doit-il être conservé à bord ?",opts:["1 an","3 ans","5 ans","10 ans"],correct:1,expl:"Le BDN doit être conservé à bord 3 ans après la livraison du carburant."},
    {q:"Combien de temps l'échantillon MARPOL doit-il être conservé ?",opts:["1 mois","6 mois","12 mois minimum","Aucune durée n'est fixée"],correct:2,expl:"L'échantillon MARPOL doit être conservé au minimum 12 mois à compter de la livraison."},
    {q:"Qu'est-ce que la chaîne de conservation (chain of custody) d'un échantillon de carburant ?",opts:["Le prix payé pour l'échantillon","La documentation de chaque manipulation de l'échantillon depuis le prélèvement jusqu'à l'analyse","Le nom du fournisseur uniquement","Un simple numéro de série"],correct:1,expl:"La chaîne de conservation documente qui a scellé, stocké et transporté l'échantillon - toute rupture affaiblit sa valeur en cas de litige."},
    {q:"Qui peut demander l'ouverture officielle d'un échantillon scellé ?",opts:["N'importe quel membre d'équipage","Un inspecteur PSC, l'administration du pavillon, ou une autorité compétente en cas de litige","Uniquement le fournisseur de carburant","Personne, l'échantillon ne s'ouvre jamais"],correct:1,expl:"Seuls un inspecteur PSC, l'administration du pavillon, ou une autorité compétente en litige commercial peuvent demander l'ouverture officielle."},
    {q:"Pourquoi un scrubber est-il autorisé par MARPOL Annexe VI ?",opts:["Parce qu'il améliore la vitesse du navire","Parce qu'il réduit chimiquement le SOx, permettant de continuer à bruler du HFO en conformité","Parce qu'il est moins cher que le LSFO","Parce qu'il est obligatoire sur tous les navires"],correct:1,expl:"Le scrubber réduit chimiquement le SOx des gaz d'échappement, ce qui constitue une méthode de conformité équivalente reconnue par la Regulation 4."},
    {q:"Certains ports interdisent-ils le rejet des eaux de lavage de scrubbers en boucle ouverte ?",opts:["Non, jamais","Oui, plusieurs ports et États l'interdisent dans leurs eaux territoriales","Oui, mais uniquement pour les navires militaires","Non, cela n'a jamais été envisagé"],correct:1,expl:"Plusieurs ports et États interdisent le rejet des eaux de lavage de scrubbers en boucle ouverte dans leurs eaux territoriales."},
    {q:"L'EEXI et le CII sont-ils expliqués en détail dans cette leçon MARPOL ?",opts:["Oui, avec calculs complets","Non, ils sont seulement introduits brièvement, le détail étant réservé au module SEEMP","Non, ils ne sont jamais mentionnés","Oui, mais uniquement le CII"],correct:1,expl:"Cette leçon MARPOL introduit brièvement l'EEXI et le CII, leur approfondissement étant réservé au futur module SEEMP & Energy Efficiency."},
    {q:"Dans l'affaire Ocean Princess, d'où provenait réellement le carburant non conforme utilisé ?",opts:["D'un fournisseur portuaire non autorisé","Des citernes de cargaison, prélevé sans inscription à l'ORB Part II","D'un stock de secours déclaré","D'un autre navire de la même flotte"],correct:1,expl:"Le carburant provenait des citernes de cargaison, prélevé sans aucune inscription à l'Oil Record Book Part II."},
    {q:"Qui, en plus du Chef mécanicien et du Capitaine, a été poursuivi dans l'affaire Ocean Princess ?",opts:["Aucune autre personne","Le gestionnaire commercial de la compagnie et le Second capitaine","Uniquement l'armateur","Un inspecteur PSC"],correct:1,expl:"Les poursuites se sont étendues au propriétaire, au gestionnaire commercial, au Capitaine et au Second capitaine - une première pour un gestionnaire commercial dans une affaire Annexe VI."},
    {q:"Quelle a été la conséquence personnelle pour le Capitaine de l'Ocean Princess ?",opts:["Aucune consequence personnelle","408 jours de détention et une condamnation pénale mettant fin à 45 ans de carrière","Une simple amende administrative","Une suspension de 30 jours"],correct:1,expl:"Le Capitaine, âgé de 80 ans avec 45 ans de carrière, a été détenu 408 jours et condamné pénalement dans cette affaire."},
  ],
  en:[
    {q:"What is the global SOx limit (outside ECA) since January 1, 2020?",opts:["3.5%","1.0%","0.5%","0.1%"],correct:2,expl:"Since IMO 2020, the global SOx limit outside ECAs is 0.5%, compared to 3.5% before."},
    {q:"When should the fuel changeover start before entering an ECA?",opts:["Exactly at the boundary crossing","Early enough for the system to be fully compliant before crossing","Once already inside the area","Timing does not matter"],correct:1,expl:"The changeover must start early enough for the entire fuel system to be compliant before crossing the ECA boundary."},
    {q:"What is the risk of a too-fast fuel changeover?",opts:["Nothing in particular","Loss of viscosity and injection pump lubrication","Increased engine power","Fuel savings"],correct:1,expl:"A rushed changeover can cause a sudden loss of viscosity and a risk of losing injection pump lubrication."},
    {q:"What information must appear on the BDN?",opts:["Only the fuel price","Ship's name, port and date, supplier, quantity, type and sulfur content","Only the Master's signature","No information is mandatory"],correct:1,expl:"The BDN must contain the ship's name, port and date of delivery, supplier, quantity, fuel type and declared sulfur content."},
    {q:"Is the Bunker Delivery Note only an operational document?",opts:["Yes, only operational","No, it is both an operational and a legal document","No, only a commercial document","No, it is a simple receipt"],correct:1,expl:"The BDN is both an operational and a legal document, which must be completed accurately and truthfully."},
    {q:"How long must the BDN be kept on board?",opts:["1 year","3 years","5 years","10 years"],correct:1,expl:"The BDN must be kept on board for 3 years after fuel delivery."},
    {q:"How long must the MARPOL fuel sample be kept?",opts:["1 month","6 months","Minimum 12 months","No set period"],correct:2,expl:"The MARPOL sample must be kept for a minimum of 12 months from delivery."},
    {q:"What is the chain of custody for a fuel sample?",opts:["The price paid for the sample","The documentation of every handling of the sample from collection to analysis","Only the supplier's name","A simple serial number"],correct:1,expl:"The chain of custody documents who sealed, stored and transported the sample - any break weakens its value in a dispute."},
    {q:"Who can request the official opening of a sealed sample?",opts:["Any crew member","A PSC inspector, the flag administration, or a competent authority in a dispute","Only the fuel supplier","No one, the sample is never opened"],correct:1,expl:"Only a PSC inspector, the flag administration, or a competent authority in a commercial dispute can request the official opening."},
    {q:"Why is a scrubber authorized under MARPOL Annex VI?",opts:["Because it improves the vessel's speed","Because it chemically reduces SOx, allowing compliant HFO combustion","Because it is cheaper than LSFO","Because it is mandatory on all vessels"],correct:1,expl:"The scrubber chemically reduces SOx in exhaust gases, an equivalent compliance method recognized under Regulation 4."},
    {q:"Do some ports prohibit open-loop scrubber washwater discharge?",opts:["No, never","Yes, several ports and states prohibit it in their territorial waters","Yes, but only for military vessels","No, this has never been considered"],correct:1,expl:"Several ports and states prohibit open-loop scrubber washwater discharge in their territorial waters."},
    {q:"Are EEXI and CII explained in detail in this MARPOL lesson?",opts:["Yes, with full calculations","No, they are only briefly introduced, with depth reserved for the SEEMP module","No, they are never mentioned","Yes, but only CII"],correct:1,expl:"This MARPOL lesson briefly introduces EEXI and CII, with in-depth coverage reserved for the future SEEMP & Energy Efficiency module."},
    {q:"In the Ocean Princess case, where did the non-compliant fuel actually come from?",opts:["An unauthorized port supplier","Cargo tanks, drawn with no entry in ORB Part II","A declared emergency stock","Another vessel in the same fleet"],correct:1,expl:"The fuel came from cargo tanks, drawn with no entry whatsoever in the Oil Record Book Part II."},
    {q:"Who, besides the Chief Engineer and the Master, was prosecuted in the Ocean Princess case?",opts:["No one else","The company's commercial manager and the Chief Officer","Only the owner","A PSC inspector"],correct:1,expl:"Prosecution extended to the owner, the commercial manager, the Master and the Chief Officer - a first for a commercial manager in an Annex VI case."},
    {q:"What was the personal consequence for the Ocean Princess Master?",opts:["No personal consequence","408 days of detention and a criminal conviction ending a 45-year career","A simple administrative fine","A 30-day suspension"],correct:1,expl:"The Master, 80 years old with 45 years of career, was detained for 408 days and criminally convicted in this case."},
  ],
  es:[
    {q:"¿Cuál es el límite mundial de SOx (fuera de ECA) desde el 1 de enero de 2020?",opts:["3,5%","1,0%","0,5%","0,1%"],correct:2,expl:"Desde IMO 2020, el límite mundial de SOx fuera de las ECA es del 0,5%, frente al 3,5% anterior."},
    {q:"¿Cuándo debe comenzar el fuel changeover antes de entrar en una ECA?",opts:["Exactamente al cruzar el límite","Con suficiente antelación para que el sistema esté conforme antes del cruce","Una vez ya dentro de la zona","El momento no importa"],correct:1,expl:"El changeover debe comenzar con suficiente antelación para que todo el circuito de combustible esté conforme antes de cruzar el límite ECA."},
    {q:"¿Qué riesgo existe con un cambio de combustible demasiado rápido?",opts:["Nada en particular","Pérdida de viscosidad y de lubricación de las bombas de inyección","Aumento de la potencia del motor","Ahorro de combustible"],correct:1,expl:"Un cambio precipitado puede provocar una pérdida brusca de viscosidad y un riesgo de pérdida de lubricación de las bombas de inyección."},
    {q:"¿Qué información debe figurar en el BDN?",opts:["Solo el precio del combustible","Nombre del buque, puerto y fecha, proveedor, cantidad, tipo y contenido de azufre","Solo la firma del Capitán","Ninguna información es obligatoria"],correct:1,expl:"El BDN debe contener el nombre del buque, puerto y fecha de entrega, proveedor, cantidad, tipo de combustible y contenido de azufre declarado."},
    {q:"¿El Bunker Delivery Note es solo un documento operativo?",opts:["Sí, solo operativo","No, es a la vez un documento operativo y un documento legal","No, solo un documento comercial","No, es un simple recibo"],correct:1,expl:"El BDN es a la vez un documento operativo y un documento legal, que debe completarse con exactitud y sinceridad."},
    {q:"¿Cuánto tiempo debe conservarse el BDN a bordo?",opts:["1 año","3 años","5 años","10 años"],correct:1,expl:"El BDN debe conservarse a bordo 3 años después de la entrega del combustible."},
    {q:"¿Cuánto tiempo debe conservarse la muestra MARPOL?",opts:["1 mes","6 meses","Mínimo 12 meses","Sin plazo fijado"],correct:2,expl:"La muestra MARPOL debe conservarse un mínimo de 12 meses desde la entrega."},
    {q:"¿Qué es la cadena de custodia de una muestra de combustible?",opts:["El precio pagado por la muestra","La documentación de cada manipulación de la muestra desde la recogida hasta el análisis","Solo el nombre del proveedor","Un simple número de serie"],correct:1,expl:"La cadena de custodia documenta quién selló, almacenó y transportó la muestra - cualquier ruptura debilita su valor en un litigio."},
    {q:"¿Quién puede solicitar la apertura oficial de una muestra sellada?",opts:["Cualquier tripulante","Un inspector PSC, la administración del pabellón, o una autoridad competente en litigio","Solo el proveedor de combustible","Nadie, la muestra nunca se abre"],correct:1,expl:"Solo un inspector PSC, la administración del pabellón, o una autoridad competente en litigio comercial pueden solicitar la apertura oficial."},
    {q:"¿Por qué un scrubber está autorizado por MARPOL Anexo VI?",opts:["Porque mejora la velocidad del buque","Porque reduce químicamente el SOx, permitiendo quemar HFO en conformidad","Porque es más barato que el LSFO","Porque es obligatorio en todos los buques"],correct:1,expl:"El scrubber reduce químicamente el SOx de los gases de escape, un método de cumplimiento equivalente reconocido por la Regulación 4."},
    {q:"¿Algunos puertos prohíben la descarga de agua de lavado de scrubbers en circuito abierto?",opts:["No, nunca","Sí, varios puertos y estados lo prohíben en sus aguas territoriales","Sí, pero solo para buques militares","No, esto nunca se ha considerado"],correct:1,expl:"Varios puertos y estados prohíben la descarga de agua de lavado de scrubbers en circuito abierto en sus aguas territoriales."},
    {q:"¿El EEXI y el CII se explican en detalle en esta lección MARPOL?",opts:["Sí, con cálculos completos","No, solo se introducen brevemente, con la profundidad reservada al módulo SEEMP","No, nunca se mencionan","Sí, pero solo el CII"],correct:1,expl:"Esta lección MARPOL introduce brevemente el EEXI y el CII, reservando su profundización al futuro módulo SEEMP & Energy Efficiency."},
    {q:"En el caso Ocean Princess, ¿de dónde provenía realmente el combustible no conforme?",opts:["De un proveedor portuario no autorizado","De los tanques de carga, extraído sin entrada en el ORB Part II","De una reserva de emergencia declarada","De otro buque de la misma flota"],correct:1,expl:"El combustible provenía de los tanques de carga, extraído sin ninguna entrada en el Oil Record Book Part II."},
    {q:"¿Quién, además del Jefe de Máquinas y el Capitán, fue procesado en el caso Ocean Princess?",opts:["Nadie más","El gestor comercial de la compañía y el Primer Oficial","Solo el propietario","Un inspector PSC"],correct:1,expl:"Las acusaciones se extendieron al propietario, al gestor comercial, al Capitán y al Primer Oficial - una primera vez para un gestor comercial en un caso Anexo VI."},
    {q:"¿Cuál fue la consecuencia personal para el Capitán del Ocean Princess?",opts:["Ninguna consecuencia personal","408 días de detención y una condena penal que terminó una carrera de 45 años","Una simple multa administrativa","Una suspensión de 30 días"],correct:1,expl:"El Capitán, de 80 años con 45 años de carrera, fue detenido 408 días y condenado penalmente en este caso."},
  ],
  pt:[
    {q:"Qual é o limite mundial de SOx (fora de ECA) desde 1 de janeiro de 2020?",opts:["3,5%","1,0%","0,5%","0,1%"],correct:2,expl:"Desde IMO 2020, o limite mundial de SOx fora das ECA é de 0,5%, contra 3,5% anteriormente."},
    {q:"Quando deve começar o fuel changeover antes de entrar numa ECA?",opts:["Exatamente ao cruzar o limite","Com antecedência suficiente para que o sistema esteja conforme antes do cruzamento","Já dentro da zona","O momento não importa"],correct:1,expl:"O changeover deve começar com antecedência suficiente para que todo o circuito de combustível esteja conforme antes de cruzar o limite da ECA."},
    {q:"Que risco existe com uma troca de combustível muito rápida?",opts:["Nada em particular","Perda de viscosidade e de lubrificação das bombas de injeção","Aumento da potência do motor","Economia de combustível"],correct:1,expl:"Uma troca precipitada pode causar uma perda brusca de viscosidade e um risco de perda de lubrificação das bombas de injeção."},
    {q:"Que informações devem constar no BDN?",opts:["Apenas o preço do combustível","Nome do navio, porto e data, fornecedor, quantidade, tipo e teor de enxofre","Apenas a assinatura do Comandante","Nenhuma informação é obrigatória"],correct:1,expl:"O BDN deve conter o nome do navio, porto e data de entrega, fornecedor, quantidade, tipo de combustível e teor de enxofre declarado."},
    {q:"O Bunker Delivery Note é apenas um documento operacional?",opts:["Sim, apenas operacional","Não, é simultaneamente um documento operacional e um documento legal","Não, apenas um documento comercial","Não, é um simples recibo"],correct:1,expl:"O BDN é simultaneamente um documento operacional e um documento legal, que deve ser preenchido com exatidão e veracidade."},
    {q:"Por quanto tempo o BDN deve ser conservado a bordo?",opts:["1 ano","3 anos","5 anos","10 anos"],correct:1,expl:"O BDN deve ser conservado a bordo por 3 anos após a entrega do combustível."},
    {q:"Por quanto tempo a amostra MARPOL deve ser conservada?",opts:["1 mês","6 meses","Mínimo 12 meses","Sem prazo definido"],correct:2,expl:"A amostra MARPOL deve ser conservada por no mínimo 12 meses a partir da entrega."},
    {q:"O que é a cadeia de custódia de uma amostra de combustível?",opts:["O preço pago pela amostra","A documentação de cada manipulação da amostra desde a recolha até a análise","Apenas o nome do fornecedor","Um simples número de série"],correct:1,expl:"A cadeia de custódia documenta quem selou, armazenou e transportou a amostra - qualquer quebra debilita seu valor em um litígio."},
    {q:"Quem pode solicitar a abertura oficial de uma amostra selada?",opts:["Qualquer tripulante","Um inspetor PSC, a administração da bandeira, ou uma autoridade competente em litígio","Apenas o fornecedor de combustível","Ninguém, a amostra nunca é aberta"],correct:1,expl:"Apenas um inspetor PSC, a administração da bandeira, ou uma autoridade competente em litígio comercial podem solicitar a abertura oficial."},
    {q:"Por que um scrubber é autorizado pelo MARPOL Anexo VI?",opts:["Porque melhora a velocidade do navio","Porque reduz quimicamente o SOx, permitindo queimar HFO em conformidade","Porque é mais barato que o LSFO","Porque é obrigatório em todos os navios"],correct:1,expl:"O scrubber reduz quimicamente o SOx dos gases de escape, um método de conformidade equivalente reconhecido pelo Regulamento 4."},
    {q:"Alguns portos proíbem a descarga de água de lavagem de scrubbers em circuito aberto?",opts:["Não, nunca","Sim, vários portos e estados proíbem em suas águas territoriais","Sim, mas apenas para navios militares","Não, isso nunca foi considerado"],correct:1,expl:"Vários portos e estados proíbem a descarga de água de lavagem de scrubbers em circuito aberto em suas águas territoriais."},
    {q:"O EEXI e o CII são explicados em detalhe nesta lição MARPOL?",opts:["Sim, com cálculos completos","Não, são apenas introduzidos brevemente, com a profundidade reservada ao módulo SEEMP","Não, nunca são mencionados","Sim, mas apenas o CII"],correct:1,expl:"Esta lição MARPOL introduz brevemente o EEXI e o CII, reservando sua profundidade ao futuro módulo SEEMP & Energy Efficiency."},
    {q:"No caso Ocean Princess, de onde realmente vinha o combustível não conforme?",opts:["De um fornecedor portuário não autorizado","Dos tanques de carga, retirado sem entrada no ORB Part II","De uma reserva de emergência declarada","De outro navio da mesma frota"],correct:1,expl:"O combustível vinha dos tanques de carga, retirado sem nenhuma entrada no Oil Record Book Part II."},
    {q:"Quem, além do Chefe de Máquinas e do Comandante, foi processado no caso Ocean Princess?",opts:["Mais ninguém","O gestor comercial da empresa e o Imediato","Apenas o proprietário","Um inspetor PSC"],correct:1,expl:"As acusações se estenderam ao proprietário, ao gestor comercial, ao Comandante e ao Imediato - uma primeira vez para um gestor comercial em um caso Anexo VI."},
    {q:"Qual foi a consequência pessoal para o Comandante do Ocean Princess?",opts:["Nenhuma consequência pessoal","408 dias de detenção e uma condenação penal que encerrou uma carreira de 45 anos","Uma simples multa administrativa","Uma suspensão de 30 dias"],correct:1,expl:"O Comandante, com 80 anos e 45 anos de carreira, foi detido por 408 dias e condenado penalmente neste caso."},
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
      badge:"💨 Module Machine · Leçon 4/6 · ⭐ Premium · 200 XP",
      title:"MARPOL Annexe VI : Pollution atmosphérique & ECA",
      intro:"La Leçon 1 a posé les chiffres (0,5% mondial, 0,1% ECA, Tiers I/II/III). Cette leçon transforme ces limites en procédures concrètes : changement de carburant, documentation, échantillonnage - ce qu'un officier machine applique réellement à bord.",
      p1:"PARTIE 1 - FUEL CHANGEOVER",
      s1:"Le passage du HFO au LSFO avant l'entrée en zone ECA n'est pas qu'une formalité réglementaire - c'est une opération qui doit être menée avec méthode pour éviter tout incident machine.",
      p2:"PARTIE 2 - BUNKER DELIVERY NOTE (BDN)",
      s2:"Le BDN accompagne chaque livraison de carburant et fonctionne exactement comme l'Oil Record Book ou le Garbage Record Book déjà vus : un document à la fois opérationnel et légal.",
      p3:"PARTIE 3 - ÉCHANTILLONNAGE CARBURANT",
      s3:"L'échantillon MARPOL prélevé à chaque soutage peut devenir une pièce déterminante en cas de litige ou de contrôle PSC - sa traçabilité compte autant que le prélèvement lui-même.",
      p4:"PARTIE 4 - SCRUBBER & EFFICACITÉ ÉNERGÉTIQUE",
      s4:"Cette section couvre uniquement le rôle réglementaire du scrubber - jamais sa mécanique interne (pompes, buses, échangeurs).",
      p5:"PARTIE 5 - EXERCICE",
      p6:"PARTIE 6 - CAS RÉEL",
      p7:"PARTIE 7 - BANQUE DE QUESTIONS",
      transitionPhrase:"Un carburant non conforme n'est jamais qu'une question de coût - c'est une infraction pénale qui commence souvent par un simple document mal rempli.",
      closingPhrase:"Protéger l'atmosphère commence par une gestion disciplinée du carburant. Chaque opération conforme aujourd'hui contribue à une industrie maritime plus propre demain.",
      sumT:"POINTS CLÉS",
      sumP:[
        "La limite SOx est de 0,5% dans le monde et de 0,1% en zone ECA",
        "Le fuel changeover doit toujours être progressif pour éviter perte de viscosité et de lubrification",
        "Le BDN est à la fois un document opérationnel et légal, conservé 3 ans à bord",
        "L'échantillon MARPOL est conservé 12 mois minimum, avec une chaîne de conservation documentée",
        "Un scrubber n'est une méthode de conformité valable que s'il est pleinement opérationnel",
        "L'EEXI et le CII sont abordés brièvement ici - leur approfondissement appartient au module SEEMP",
      ],
      learnedP:[
        "Réaliser un fuel changeover en toute sécurité avant l'entrée en zone ECA",
        "Comprendre la valeur légale du Bunker Delivery Note",
        "Appliquer la procédure d'échantillonnage carburant et sa chaîne de conservation",
        "Comprendre le rôle réglementaire (non technique) du scrubber",
        "Tirer les leçons du cas Ocean Princess sur la falsification documentaire",
      ],
    },
    en:{
      badge:"💨 Engine Module · Lesson 4/6 · ⭐ Premium · 200 XP",
      title:"MARPOL Annex VI: Air Pollution & ECA",
      intro:"Lesson 1 laid out the numbers (0.5% global, 0.1% ECA, Tier I/II/III). This lesson turns those limits into concrete procedures: fuel changeover, documentation, sampling - what an engine officer actually applies on board.",
      p1:"PART 1 - FUEL CHANGEOVER",
      s1:"Switching from HFO to LSFO before entering an ECA is not just a regulatory formality - it is an operation that must be carried out methodically to avoid any engine incident.",
      p2:"PART 2 - BUNKER DELIVERY NOTE (BDN)",
      s2:"The BDN accompanies every fuel delivery and works exactly like the Oil Record Book or Garbage Record Book already covered: both an operational and legal document.",
      p3:"PART 3 - FUEL SAMPLING",
      s3:"The MARPOL sample taken at every bunkering can become a decisive piece of evidence in a dispute or PSC inspection - its traceability matters as much as the sampling itself.",
      p4:"PART 4 - SCRUBBER & ENERGY EFFICIENCY",
      s4:"This section covers only the scrubber's regulatory role - never its internal mechanics (pumps, nozzles, exchangers).",
      p5:"PART 5 - EXERCISE",
      p6:"PART 6 - REAL CASE",
      p7:"PART 7 - QUESTION BANK",
      transitionPhrase:"Non-compliant fuel is never just a cost issue - it is a criminal offense that often starts with a simple poorly completed document.",
      closingPhrase:"Protecting the atmosphere begins with disciplined fuel management. Every compliant operation today contributes to a cleaner maritime industry tomorrow.",
      sumT:"KEY POINTS",
      sumP:[
        "The SOx limit is 0.5% globally and 0.1% in an ECA",
        "The fuel changeover must always be gradual to avoid loss of viscosity and lubrication",
        "The BDN is both an operational and legal document, kept on board for 3 years",
        "The MARPOL sample is kept for a minimum of 12 months, with a documented chain of custody",
        "A scrubber is only a valid compliance method if fully operational",
        "EEXI and CII are briefly introduced here - in-depth coverage belongs to the SEEMP module",
      ],
      learnedP:[
        "Carry out a fuel changeover safely before entering an ECA",
        "Understand the legal value of the Bunker Delivery Note",
        "Apply the fuel sampling procedure and its chain of custody",
        "Understand the scrubber's regulatory (not technical) role",
        "Draw lessons from the Ocean Princess case on document falsification",
      ],
    },
    es:{
      badge:"💨 Módulo Máquinas · Lección 4/6 · ⭐ Premium · 200 XP",
      title:"MARPOL Anexo VI: Contaminación atmosférica y ECA",
      intro:"La Lección 1 estableció las cifras (0,5% mundial, 0,1% ECA, Nivel I/II/III). Esta lección convierte esos límites en procedimientos concretos: cambio de combustible, documentación, muestreo - lo que un oficial de máquinas aplica realmente a bordo.",
      p1:"PARTE 1 - FUEL CHANGEOVER",
      s1:"El cambio de HFO a LSFO antes de entrar en una zona ECA no es solo una formalidad reglamentaria - es una operación que debe realizarse con método para evitar cualquier incidente de máquina.",
      p2:"PARTE 2 - BUNKER DELIVERY NOTE (BDN)",
      s2:"El BDN acompaña cada entrega de combustible y funciona exactamente como el Oil Record Book o el Garbage Record Book ya vistos: un documento a la vez operativo y legal.",
      p3:"PARTE 3 - MUESTREO DE COMBUSTIBLE",
      s3:"La muestra MARPOL tomada en cada abastecimiento puede convertirse en una pieza determinante en caso de litigio o inspección PSC - su trazabilidad importa tanto como el muestreo mismo.",
      p4:"PARTE 4 - SCRUBBER Y EFICIENCIA ENERGÉTICA",
      s4:"Esta sección cubre únicamente el rol reglamentario del scrubber - nunca su mecánica interna (bombas, boquillas, intercambiadores).",
      p5:"PARTE 5 - EJERCICIO",
      p6:"PARTE 6 - CASO REAL",
      p7:"PARTE 7 - BANCO DE PREGUNTAS",
      transitionPhrase:"Un combustible no conforme nunca es solo una cuestión de costo - es un delito penal que a menudo comienza con un simple documento mal cumplimentado.",
      closingPhrase:"Proteger la atmósfera comienza con una gestión disciplinada del combustible. Cada operación conforme hoy contribuye a una industria marítima más limpia mañana.",
      sumT:"PUNTOS CLAVE",
      sumP:[
        "El límite de SOx es del 0,5% a nivel mundial y del 0,1% en zona ECA",
        "El fuel changeover siempre debe ser progresivo para evitar pérdida de viscosidad y lubricación",
        "El BDN es a la vez un documento operativo y legal, conservado a bordo 3 años",
        "La muestra MARPOL se conserva un mínimo de 12 meses, con una cadena de custodia documentada",
        "Un scrubber solo es un método de cumplimiento válido si está plenamente operativo",
        "El EEXI y el CII se introducen brevemente aquí - su profundización pertenece al módulo SEEMP",
      ],
      learnedP:[
        "Realizar un fuel changeover con seguridad antes de entrar en una ECA",
        "Comprender el valor legal del Bunker Delivery Note",
        "Aplicar el procedimiento de muestreo de combustible y su cadena de custodia",
        "Comprender el rol reglamentario (no técnico) del scrubber",
        "Extraer lecciones del caso Ocean Princess sobre la falsificación documental",
      ],
    },
    pt:{
      badge:"💨 Módulo Máquinas · Lição 4/6 · ⭐ Premium · 200 XP",
      title:"MARPOL Anexo VI: Poluição atmosférica e ECA",
      intro:"A Lição 1 estabeleceu os números (0,5% mundial, 0,1% ECA, Tier I/II/III). Esta lição transforma esses limites em procedimentos concretos: troca de combustível, documentação, amostragem - o que um oficial de máquinas realmente aplica a bordo.",
      p1:"PARTE 1 - FUEL CHANGEOVER",
      s1:"A troca de HFO para LSFO antes de entrar numa zona ECA não é apenas uma formalidade regulamentar - é uma operação que deve ser realizada com método para evitar qualquer incidente de máquina.",
      p2:"PARTE 2 - BUNKER DELIVERY NOTE (BDN)",
      s2:"O BDN acompanha cada entrega de combustível e funciona exatamente como o Oil Record Book ou o Garbage Record Book já vistos: um documento simultaneamente operacional e legal.",
      p3:"PARTE 3 - AMOSTRAGEM DE COMBUSTÍVEL",
      s3:"A amostra MARPOL recolhida em cada abastecimento pode se tornar uma peça decisiva em caso de litígio ou inspeção PSC - sua rastreabilidade importa tanto quanto a amostragem em si.",
      p4:"PARTE 4 - SCRUBBER E EFICIÊNCIA ENERGÉTICA",
      s4:"Esta secção cobre apenas o papel regulamentar do scrubber - nunca a sua mecânica interna (bombas, bicos, permutadores).",
      p5:"PARTE 5 - EXERCÍCIO",
      p6:"PARTE 6 - CASO REAL",
      p7:"PARTE 7 - BANCO DE QUESTÕES",
      transitionPhrase:"Combustível não conforme nunca é apenas uma questão de custo - é um crime que muitas vezes começa com um simples documento mal preenchido.",
      closingPhrase:"Proteger a atmosfera começa com uma gestão disciplinada do combustível. Cada operação conforme hoje contribui para uma indústria marítima mais limpa amanhã.",
      sumT:"PONTOS-CHAVE",
      sumP:[
        "O limite de SOx é de 0,5% mundialmente e de 0,1% em zona ECA",
        "O fuel changeover deve sempre ser progressivo para evitar perda de viscosidade e lubrificação",
        "O BDN é simultaneamente um documento operacional e legal, conservado a bordo por 3 anos",
        "A amostra MARPOL é conservada por no mínimo 12 meses, com uma cadeia de custódia documentada",
        "Um scrubber só é um método de conformidade válido se estiver plenamente operacional",
        "O EEXI e o CII são introduzidos brevemente aqui - sua profundidade pertence ao módulo SEEMP",
      ],
      learnedP:[
        "Realizar um fuel changeover com segurança antes de entrar numa ECA",
        "Compreender o valor legal do Bunker Delivery Note",
        "Aplicar o procedimento de amostragem de combustível e sua cadeia de custódia",
        "Compreender o papel regulamentar (não técnico) do scrubber",
        "Tirar lições do caso Ocean Princess sobre a falsificação documental",
      ],
    },
  };
  return d[lang] || d.fr;
};

export default function LessonMARPOL_L4({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
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
            <div style={{fontSize:10,color:C.green,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>💨 {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 4/6":lang==="en"?"Lesson 4/6":lang==="es"?"Lección 4/6":"Lição 4/6"}</div>
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

            <SL icon="⏱️" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>⏱️ {lang==="fr"?"FUEL CHANGEOVER - INTERACTIF":lang==="en"?"FUEL CHANGEOVER - INTERACTIVE":lang==="es"?"FUEL CHANGEOVER - INTERACTIVO":"FUEL CHANGEOVER - INTERATIVO"}</div>
              <FuelChangeoverSVG lang={lang}/>
            </Card>

            <SL icon="📄" text={lc.p2} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.teal}33`}}>
              <div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📄 {lang==="fr"?"BDN - INTERACTIF":lang==="en"?"BDN - INTERACTIVE":lang==="es"?"BDN - INTERACTIVO":"BDN - INTERATIVO"}</div>
              <BDNSVG lang={lang}/>
            </Card>

            <SL icon="🧪" text={lc.p3} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold2}33`,background:"linear-gradient(135deg,rgba(232,185,79,0.05),rgba(13,31,60,0.8))"}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🧪 {lang==="fr"?"ÉCHANTILLONNAGE - INTERACTIF":lang==="en"?"FUEL SAMPLING - INTERACTIVE":lang==="es"?"MUESTREO - INTERACTIVO":"AMOSTRAGEM - INTERATIVO"}</div>
              <FuelSamplingSVG lang={lang}/>
            </Card>

            <SL icon="🌫️" text={lc.p4} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}33`}}>
              <div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🌫️ {lang==="fr"?"SCRUBBER - RÉGLEMENTAIRE":lang==="en"?"SCRUBBER - REGULATORY":lang==="es"?"SCRUBBER - REGLAMENTARIO":"SCRUBBER - REGULAMENTAR"}</div>
              <ScrubberSVG lang={lang}/>
            </Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><FuelChecklist lang={lang}/></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise4 lang={lang} t={t}/></Card>

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
                {lang==="fr"?"Quiz - MARPOL Annexe VI":lang==="en"?"Quiz - MARPOL Annex VI":lang==="es"?"Quiz - MARPOL Anexo VI":"Quiz - MARPOL Anexo VI"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 4":lang==="en"?"Lesson 4":lang==="es"?"Lección 4":"Lição 4"}</div>
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
              {lang==="fr"?"LEÇON 5 - CONFORMITÉ ENVIRONNEMENTALE À BORD →":lang==="en"?"LESSON 5 - ENVIRONMENTAL COMPLIANCE ONBOARD →":lang==="es"?"LECCIÓN 5 - CUMPLIMIENTO AMBIENTAL A BORDO →":"LIÇÃO 5 - CONFORMIDADE AMBIENTAL A BORDO →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
