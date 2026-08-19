import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  frost:"#6fe0e8", copper:"#c98b52", vapor:"#8aa9c9", ice:"#b8d4e3",
};

const T = {
  fr:{ back:"◀ Retour", module:"Module E2 — Auxiliaires & Électricité", xp:"XP gagnes", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne reponse!", wrong:"✗ Mauvaise reponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LECON TERMINEE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Module E2 — Auxiliary Systems & Electricity", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Módulo E2 — Auxiliares y Electricidad", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicacion:", next:"SIGUIENTE →", finish:"VER PUNTUACION →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", showCorr:"Ver correccion", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Módulo E2 — Auxiliares e Eletricidade", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicacao:", next:"PROXIMO →", finish:"VER PONTUACAO →", startQuiz:"✅ COMECAR QUIZ", complete:"🏅 CONCLUIDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Voce aprendeu:", readFirst:"Leia o conteudo e depois comece", showCorr:"Ver correcao", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 - CYCLE FRIGORIFIQUE
// ══════════════════════════════════════
function CycleFrigoSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const parts = [
    { id:"compresseur", icon:"🌀", color:C.frost,
      label:{fr:"Compresseur",en:"Compressor",es:"Compresor",pt:"Compressor"},
      desc:{fr:"COMPRESSEUR\n\nCOEUR MECANIQUE du cycle.\n\nROLE :\n→ Aspire la vapeur de refrigerant basse pression\n→ La comprime a haute pression\n→ La temperature monte fortement (vapeur HP chaude)\n\nTYPES :\n→ Alternatif (pistons) : petites/moyennes puissances\n→ A vis : gros debits, fonctionnement continu\n→ Centrifuge : tres grosses installations HVAC\n\nSURVEILLANCE :\n→ Pression de refoulement et d'aspiration\n→ Temperature d'huile et de carter\n→ Niveau d'huile de graissage\n\nUne pression de refoulement anormale est le premier signe d'un defaut ailleurs dans le circuit.",
           en:"COMPRESSOR\n\nMECHANICAL HEART of the cycle.\n\nROLE:\n→ Draws in low pressure refrigerant vapour\n→ Compresses it to high pressure\n→ Temperature rises sharply (hot HP vapour)\n\nTYPES:\n→ Reciprocating (pistons): small/medium capacity\n→ Screw: high flow, continuous duty\n→ Centrifugal: very large HVAC plants\n\nMONITORING:\n→ Discharge and suction pressure\n→ Oil and crankcase temperature\n→ Lubricating oil level\n\nAn abnormal discharge pressure is usually the first sign of a fault elsewhere in the circuit.",
           es:"COMPRESOR\n\nCORAZON MECANICO del ciclo.\n\nFUNCION:\n→ Aspira el vapor de refrigerante de baja presion\n→ Lo comprime a alta presion\n→ La temperatura sube fuertemente (vapor HP caliente)\n\nTIPOS:\n→ Alternativo (pistones): pequenas/medianas potencias\n→ De tornillo: grandes caudales, funcionamiento continuo\n→ Centrifugo: instalaciones HVAC muy grandes\n\nCONTROL:\n→ Presion de descarga y aspiracion\n→ Temperatura de aceite y carter\n→ Nivel de aceite de lubricacion",
           pt:"COMPRESSOR\n\nCORACAO MECANICO do ciclo.\n\nFUNCAO:\n→ Aspira o vapor de refrigerante de baixa pressao\n→ Comprime-o a alta pressao\n→ A temperatura sobe fortemente (vapor HP quente)\n\nTIPOS:\n→ Alternativo (pistoes): pequenas/medias potencias\n→ Parafuso: grandes vazoes, funcionamento continuo\n→ Centrifugo: instalacoes HVAC muito grandes\n\nMONITORIZACAO:\n→ Pressao de descarga e aspiracao\n→ Temperatura de oleo e carter\n→ Nivel de oleo de lubrificacao"} },
    { id:"condenseur", icon:"🔥", color:C.copper,
      label:{fr:"Condenseur",en:"Condenser",es:"Condensador",pt:"Condensador"},
      desc:{fr:"CONDENSEUR\n\nECHANGEUR qui rejette la chaleur a l'exterieur.\n\nROLE :\n→ Refroidi par l'eau de mer (circuit marin standard)\n→ La vapeur HP chaude cede sa chaleur\n→ Le refrigerant se liquefie a haute pression\n\nSURVEILLANCE :\n→ Temperature et debit d'eau de mer\n→ Encrassement des tubes (coquillages, sediments)\n→ Pression de condensation\n\nDEFAUT FREQUENT :\nUne pression de refoulement elevee avec\nun condenseur chaud = encrassement ou\ndebit d'eau de mer insuffisant.\nNettoyage regulier des tubes obligatoire.",
           en:"CONDENSER\n\nHEAT EXCHANGER that rejects heat outside.\n\nROLE:\n→ Cooled by seawater (standard marine circuit)\n→ Hot HP vapour releases its heat\n→ Refrigerant liquefies at high pressure\n\nMONITORING:\n→ Seawater temperature and flow\n→ Tube fouling (shells, sediment)\n→ Condensing pressure\n\nCOMMON FAULT:\nHigh discharge pressure with a hot\ncondenser = fouling or insufficient\nseawater flow. Regular tube cleaning\nis mandatory.",
           es:"CONDENSADOR\n\nINTERCAMBIADOR que rechaza el calor al exterior.\n\nFUNCION:\n→ Enfriado por agua de mar (circuito marino estandar)\n→ El vapor HP caliente cede su calor\n→ El refrigerante se licua a alta presion\n\nCONTROL:\n→ Temperatura y caudal de agua de mar\n→ Incrustaciones en los tubos\n→ Presion de condensacion",
           pt:"CONDENSADOR\n\nTROCADOR que rejeita o calor para o exterior.\n\nFUNCAO:\n→ Resfriado por agua do mar (circuito marinho padrao)\n→ O vapor HP quente cede seu calor\n→ O refrigerante liquefaz a alta pressao\n\nMONITORIZACAO:\n→ Temperatura e vazao de agua do mar\n→ Incrustacao nos tubos\n→ Pressao de condensacao"} },
    { id:"detendeur", icon:"💧", color:C.vapor,
      label:{fr:"Detendeur",en:"Expansion valve",es:"Valvula de expansion",pt:"Valvula de expansao"},
      desc:{fr:"DETENDEUR\n\nORGANE DE REGULATION du debit de refrigerant.\n\nROLE :\n→ Provoque une chute brutale de pression\n→ La temperature chute avant l'evaporateur\n→ Regule le debit selon la charge thermique\n\nTYPES :\n→ Thermostatique (TXV) : le plus courant\n→ Electronique : regulation fine, HVAC moderne\n→ Capillaire : petites installations\n\nIMPORTANCE :\nUn detendeur mal regle provoque soit\nun manque de froid (trop ferme) soit\nun retour de liquide au compresseur\n(trop ouvert) qui peut l'endommager gravement.",
           en:"EXPANSION VALVE\n\nFLOW CONTROL device for the refrigerant.\n\nROLE:\n→ Causes a sharp pressure drop\n→ Temperature falls before the evaporator\n→ Regulates flow according to thermal load\n\nTYPES:\n→ Thermostatic (TXV): most common\n→ Electronic: fine control, modern HVAC\n→ Capillary tube: small installations\n\nIMPORTANCE:\nA poorly set expansion valve causes\neither insufficient cooling (too closed)\nor liquid return to the compressor\n(too open), which can seriously damage it.",
           es:"VALVULA DE EXPANSION\n\nORGANO DE REGULACION del caudal de refrigerante.\n\nFUNCION:\n→ Provoca una caida brusca de presion\n→ La temperatura cae antes del evaporador\n→ Regula el caudal segun la carga termica\n\nTIPOS:\n→ Termostatica (TXV): la mas comun\n→ Electronica: regulacion fina, HVAC moderno\n→ Capilar: instalaciones pequenas",
           pt:"VALVULA DE EXPANSAO\n\nORGAO DE REGULACAO do caudal de refrigerante.\n\nFUNCAO:\n→ Provoca uma queda brusca de pressao\n→ A temperatura cai antes do evaporador\n→ Regula o caudal conforme a carga termica\n\nTIPOS:\n→ Termostatica (TXV): a mais comum\n→ Eletronica: regulacao fina, HVAC moderno\n→ Capilar: instalacoes pequenas"} },
    { id:"evaporateur", icon:"❄️", color:C.ice,
      label:{fr:"Evaporateur",en:"Evaporator",es:"Evaporador",pt:"Evaporador"},
      desc:{fr:"EVAPORATEUR\n\nECHANGEUR qui absorbe la chaleur de l'espace refroidi.\n\nROLE :\n→ Le refrigerant liquide se vaporise a basse pression\n→ Il absorbe la chaleur de l'air ou de l'eau ambiante\n→ La vapeur BP froide repart vers le compresseur\n\nSURVEILLANCE :\n→ Epaisseur de givre (isolant thermique)\n→ Fonctionnement des ventilateurs\n→ Cycle de degivrage\n\nDEFAUT FREQUENT :\nUne chambre qui peine a descendre en\ntemperature malgre un compresseur qui\ntourne en continu indique souvent un\nevaporateur givre ou sous-alimente.",
           en:"EVAPORATOR\n\nHEAT EXCHANGER that absorbs heat from the cooled space.\n\nROLE:\n→ Liquid refrigerant vaporises at low pressure\n→ It absorbs heat from surrounding air or water\n→ Cold LP vapour returns to the compressor\n\nMONITORING:\n→ Frost thickness (thermal insulator)\n→ Fan operation\n→ Defrost cycle\n\nCOMMON FAULT:\nA room struggling to reach temperature\ndespite a continuously running compressor\noften indicates a frosted or\nunder-fed evaporator.",
           es:"EVAPORADOR\n\nINTERCAMBIADOR que absorbe el calor del espacio enfriado.\n\nFUNCION:\n→ El refrigerante liquido se vaporiza a baja presion\n→ Absorbe el calor del aire o agua circundante\n→ El vapor BP frio vuelve al compresor\n\nCONTROL:\n→ Espesor de la escarcha (aislante termico)\n→ Funcionamiento de los ventiladores\n→ Ciclo de descongelacion",
           pt:"EVAPORADOR\n\nTROCADOR que absorve o calor do espaco refrigerado.\n\nFUNCAO:\n→ O refrigerante liquido evapora a baixa pressao\n→ Absorve o calor do ar ou agua circundante\n→ O vapor BP frio retorna ao compressor\n\nMONITORIZACAO:\n→ Espessura do gelo (isolante termico)\n→ Funcionamento dos ventiladores\n→ Ciclo de descongelamento"} },
  ];

  const CycleSchema = () => (
    <svg viewBox="0 0 320 100" style={{width:"100%",height:90,marginBottom:8}}>
      <rect width="320" height="100" fill="rgba(0,0,0,0.3)" rx="10"/>
      <text x="18" y="20" fill={C.frost} fontSize="8" fontFamily="monospace">COMPRESSEUR</text>
      <text x="118" y="20" fill={C.copper} fontSize="8" fontFamily="monospace">CONDENSEUR</text>
      <text x="200" y="90" fill={C.vapor} fontSize="8" fontFamily="monospace">DETENDEUR</text>
      <text x="18" y="90" fill={C.ice} fontSize="8" fontFamily="monospace">EVAPORATEUR</text>
      <rect x="15" y="30" width="55" height="30" rx="4" fill="none" stroke={C.frost} strokeWidth="1.5"/>
      <rect x="115" y="30" width="55" height="30" rx="4" fill="none" stroke={C.copper} strokeWidth="1.5"/>
      <polygon points="240,50 260,62 240,74" fill="none" stroke={C.vapor} strokeWidth="1.5"/>
      <rect x="15" y="60" width="55" height="30" rx="4" fill="none" stroke={C.ice} strokeWidth="1.5" transform="translate(0,-15)"/>
      <text x="80" y="48" fill={C.muted} fontSize="14">→</text>
      <text x="200" y="48" fill={C.muted} fontSize="14">↓</text>
      <text x="80" y="72" fill={C.muted} fontSize="14">←</text>
    </svg>
  );

  const sel_ = sel!==null ? parts[sel] : null;
  return (
    <div>
      <CycleSchema/>
      <div style={{fontSize:9,color:C.muted,textAlign:"center",marginBottom:10,letterSpacing:1}}>
        {lang==="fr"?"CYCLE FRIGORIFIQUE - APPUYEZ POUR DETAILS":lang==="en"?"REFRIGERATION CYCLE - TAP FOR DETAILS":lang==="es"?"CICLO FRIGORIFICO - PULSA PARA DETALLES":"CICLO DE REFRIGERACAO - TOQUE PARA DETALHES"}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
        {parts.map((p,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            padding:"8px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",
            background:sel===i?`${p.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${sel===i?p.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:16,marginBottom:2}}>{p.icon}</div>
            <div style={{fontSize:9,fontWeight:700,color:sel===i?p.color:C.muted,lineHeight:1.2}}>{p.label[lang]||p.label.en}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}10`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:11,fontWeight:700,color:sel_.color,marginBottom:8}}>{sel_.icon} {sel_.label[lang]||sel_.label.en}</div>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.en}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 - COMPARAISON DES REFRIGERANTS
// ══════════════════════════════════════
function RefrigerantsSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const materials = [
    { id:"hcfc", icon:"🔴", color:"#c0392b",
      label:{fr:"CFC / HCFC (R-22)",en:"CFC / HCFC (R-22)",es:"CFC / HCFC (R-22)",pt:"CFC / HCFC (R-22)"},
      props:{ val:5, val2:2, val3:4, val4:1 },
      usage:{fr:"STATUT :\n→ Substances appauvrissant la couche d'ozone (ODS)\n→ Elimination progressive imposee par le Protocole de Montreal\n→ Production et import R-22 deja interdits dans de nombreux pays\n\nA BORD :\n→ Anciennes installations encore en service : maintenance seule autorisee\n→ Toute recharge doit etre enregistree au registre ODS\n→ Remplacement programme obligatoire a terme\n\nRISQUE :\nUne fuite non declaree ou non tracee\nexpose l'armateur a des sanctions\nMARPOL Annexe VI.",
             en:"STATUS:\n→ Ozone depleting substances (ODS)\n→ Phase-out imposed by the Montreal Protocol\n→ Production and import of R-22 already banned in many countries\n\nON BOARD:\n→ Older plants still in service: maintenance only allowed\n→ Any recharge must be logged in the ODS record\n→ Scheduled replacement mandatory\n\nRISK:\nAn undeclared or untracked leak exposes\nthe owner to MARPOL Annex VI sanctions.",
             es:"ESTADO:\n→ Sustancias que agotan la capa de ozono (ODS)\n→ Eliminacion progresiva impuesta por el Protocolo de Montreal\n→ Produccion e importacion de R-22 ya prohibidas en muchos paises\n\nA BORDO:\n→ Instalaciones antiguas aun en servicio: solo mantenimiento permitido\n→ Toda recarga debe registrarse en el registro ODS",
             pt:"ESTADO:\n→ Substancias que destroem a camada de ozonio (ODS)\n→ Eliminacao progressiva imposta pelo Protocolo de Montreal\n→ Producao e importacao de R-22 ja proibidas em muitos paises\n\nA BORDO:\n→ Instalacoes antigas ainda em servico: apenas manutencao permitida\n→ Toda recarga deve ser registada no registo ODS"} },
    { id:"hfc", icon:"🟠", color:"#e67e22",
      label:{fr:"HFC (R-404A / R-134a)",en:"HFC (R-404A / R-134a)",es:"HFC (R-404A / R-134a)",pt:"HFC (R-404A / R-134a)"},
      props:{ val:4, val2:1, val3:4, val4:3 },
      usage:{fr:"STATUT :\n→ Aucun impact sur l'ozone (pas de chlore)\n→ Fort potentiel de rechauffement global (GWP eleve)\n→ Reduction progressive imposee par l'amendement de Kigali\n\nA BORD :\n→ Le plus courant sur les installations recentes\n→ HVAC (R-134a) et refrigeration commerciale (R-404A)\n→ Cout d'achat modere, bonne disponibilite\n\nEVOLUTION :\nLes armateurs doivent anticiper la\ntransition vers des refrigerants a\nfaible GWP (HFO, naturels) d'ici quelques annees.",
             en:"STATUS:\n→ No ozone impact (no chlorine)\n→ High global warming potential (GWP)\n→ Progressive reduction imposed by the Kigali Amendment\n\nON BOARD:\n→ Most common on recent installations\n→ HVAC (R-134a) and commercial refrigeration (R-404A)\n→ Moderate cost, good availability\n\nOUTLOOK:\nOwners must plan for the transition\nto low-GWP refrigerants (HFO, naturals)\nover the coming years.",
             es:"ESTADO:\n→ Sin impacto en el ozono (sin cloro)\n→ Alto potencial de calentamiento global (GWP)\n→ Reduccion progresiva impuesta por la Enmienda de Kigali\n\nA BORDO:\n→ El mas comun en instalaciones recientes\n→ HVAC (R-134a) y refrigeracion comercial (R-404A)",
             pt:"ESTADO:\n→ Sem impacto no ozonio (sem cloro)\n→ Alto potencial de aquecimento global (GWP)\n→ Reducao progressiva imposta pela Emenda de Kigali\n\nA BORDO:\n→ O mais comum em instalacoes recentes\n→ HVAC (R-134a) e refrigeracao comercial (R-404A)"} },
    { id:"nh3", icon:"⚠️", color:C.teal,
      label:{fr:"Ammoniac NH3 (R-717)",en:"Ammonia NH3 (R-717)",es:"Amoniaco NH3 (R-717)",pt:"Amonia NH3 (R-717)"},
      props:{ val:1, val2:5, val3:5, val4:2 },
      usage:{fr:"STATUT :\n→ Refrigerant NATUREL, impact environnemental quasi nul\n→ Excellent rendement thermodynamique\n→ TOXIQUE et inflammable a forte concentration\n\nA BORD :\n→ Tres utilise sur les navires de peche et usines flottantes\n→ Circuits toujours isoles avant intervention\n→ Detecteurs de gaz obligatoires dans les locaux concernes\n\nDANGER MAJEUR :\nUne fuite dans un espace clos peut\ndeplacer l'oxygene et tuer sans\naucun signe visible. Voir le cas MFV Sunbeam.",
             en:"STATUS:\n→ NATURAL refrigerant, near zero environmental impact\n→ Excellent thermodynamic efficiency\n→ TOXIC and flammable at high concentration\n\nON BOARD:\n→ Widely used on fishing vessels and floating factories\n→ Circuits always isolated before intervention\n→ Gas detectors mandatory in relevant spaces\n\nMAJOR HAZARD:\nA leak in an enclosed space can\ndisplace oxygen and kill with no\nvisible sign. See the MFV Sunbeam case.",
             es:"ESTADO:\n→ Refrigerante NATURAL, impacto ambiental casi nulo\n→ Excelente eficiencia termodinamica\n→ TOXICO e inflamable a alta concentracion\n\nA BORDO:\n→ Muy utilizado en buques de pesca y factorias flotantes\n→ Circuitos siempre aislados antes de intervenir\n→ Detectores de gas obligatorios",
             pt:"ESTADO:\n→ Refrigerante NATURAL, impacto ambiental quase nulo\n→ Excelente eficiencia termodinamica\n→ TOXICO e inflamavel em alta concentracao\n\nA BORDO:\n→ Muito usado em navios de pesca e fabricas flutuantes\n→ Circuitos sempre isolados antes de intervir\n→ Detectores de gas obrigatorios"} },
    { id:"co2", icon:"🌿", color:"#3fae6b",
      label:{fr:"CO2 (R-744)",en:"CO2 (R-744)",es:"CO2 (R-744)",pt:"CO2 (R-744)"},
      props:{ val:1, val2:2, val3:3, val4:3 },
      usage:{fr:"STATUT :\n→ Refrigerant NATUREL, GWP = 1 (reference)\n→ Non toxique, non inflammable\n→ Fonctionne a tres haute pression (technologie specifique)\n\nA BORD :\n→ En croissance sur les installations neuves HVAC/reefer\n→ Cout d'equipement plus eleve (composants haute pression)\n→ Excellente stabilite chimique, tres peu de fuites\n\nAVENIR :\nConsidere comme une des solutions\nles plus durables pour remplacer les\nHFC a fort GWP sur le long terme.",
             en:"STATUS:\n→ NATURAL refrigerant, GWP = 1 (reference)\n→ Non toxic, non flammable\n→ Operates at very high pressure (specific technology)\n\nON BOARD:\n→ Growing use on new HVAC/reefer installations\n→ Higher equipment cost (high pressure components)\n→ Excellent chemical stability, very few leaks\n\nOUTLOOK:\nConsidered one of the most sustainable\nsolutions to replace high-GWP HFCs\nin the long term.",
             es:"ESTADO:\n→ Refrigerante NATURAL, GWP = 1 (referencia)\n→ No toxico, no inflamable\n→ Funciona a muy alta presion (tecnologia especifica)\n\nA BORDO:\n→ En crecimiento en instalaciones nuevas HVAC/reefer\n→ Coste de equipo mas elevado",
             pt:"ESTADO:\n→ Refrigerante NATURAL, GWP = 1 (referencia)\n→ Nao toxico, nao inflamavel\n→ Funciona a pressao muito alta (tecnologia especifica)\n\nA BORDO:\n→ Em crescimento em instalacoes novas HVAC/reefer\n→ Custo de equipamento mais elevado"} },
  ];

  const sel_ = sel!==null ? materials[sel] : null;

  const Bar = ({v,color})=>(
    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
      <div style={{flex:1,height:5,background:"rgba(255,255,255,0.08)",borderRadius:3,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${v*20}%`,background:color,borderRadius:3,transition:"width 0.5s ease"}}/>
      </div>
      <div style={{fontSize:8,color,minWidth:10,textAlign:"right"}}>{v}/5</div>
    </div>
  );

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
        {materials.map((m,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            padding:"8px 4px",borderRadius:10,cursor:"pointer",textAlign:"center",
            background:sel===i?`${m.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${sel===i?m.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:14,marginBottom:2}}>{m.icon}</div>
            <div style={{fontSize:8,fontWeight:700,color:sel===i?m.color:C.muted,lineHeight:1.2}}>{m.label[lang]||m.label.en}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}10`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:11,fontWeight:700,color:sel_.color,marginBottom:8}}>{sel_.icon} {sel_.label[lang]||sel_.label.en}</div>
        <div style={{marginBottom:10}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
            <div>
              <div style={{fontSize:8,color:C.muted,marginBottom:2}}>{lang==="fr"?"Impact GWP/ODS":lang==="en"?"GWP/ODS impact":lang==="es"?"Impacto GWP/ODS":"Impacto GWP/ODS"}</div>
              <Bar v={sel_.props.val} color={sel_.color}/>
            </div>
            <div>
              <div style={{fontSize:8,color:C.muted,marginBottom:2}}>{lang==="fr"?"Toxicite":lang==="en"?"Toxicity":lang==="es"?"Toxicidad":"Toxicidade"}</div>
              <Bar v={sel_.props.val2} color={sel_.color}/>
            </div>
            <div>
              <div style={{fontSize:8,color:C.muted,marginBottom:2}}>{lang==="fr"?"Efficacite":lang==="en"?"Efficiency":lang==="es"?"Eficiencia":"Eficiencia"}</div>
              <Bar v={sel_.props.val3} color={sel_.color}/>
            </div>
            <div>
              <div style={{fontSize:8,color:C.muted,marginBottom:2}}>{lang==="fr"?"Cout":lang==="en"?"Cost":lang==="es"?"Coste":"Custo"}</div>
              <Bar v={sel_.props.val4} color={sel_.color}/>
            </div>
          </div>
        </div>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.usage[lang]||sel_.usage.en}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 - APPLICATIONS A BORD
// ══════════════════════════════════════
function ApplicationsSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const usages = [
    { id:"hvac", icon:"🌬️", color:C.frost,
      label:{fr:"Confort HVAC",en:"HVAC comfort",es:"Confort HVAC",pt:"Conforto HVAC"},
      detail:{fr:"CLIMATISATION DES LOCAUX :\n→ Centrale de traitement d'air (AHU)\n→ Melange air neuf / air recycle\n→ Distribution par gaines et registres\n→ Ventilo-convecteurs pour reglage individuel\n\nCONFORT ET SANTE :\n→ Filtration de l'air, entretien regulier obligatoire\n→ Risque de legionellose si filtres/circuits negliges\n→ Zones concernees : cabines, passerelle, salle des machines\n\nREGULATION :\nTemperature cible generalement\n22-24 degC selon zones et normes armateur.",
             en:"CABIN AND LOCAL AIR CONDITIONING:\n→ Air handling unit (AHU)\n→ Fresh air / recirculated air mix\n→ Distribution via ducts and dampers\n→ Fan coil units for individual control\n\nCOMFORT AND HEALTH:\n→ Air filtration, regular maintenance mandatory\n→ Legionella risk if filters/circuits neglected\n→ Zones covered: cabins, bridge, engine room\n\nSETPOINT:\nTarget temperature generally\n22-24 degC depending on zone and owner standards.",
             es:"CLIMATIZACION DE LOCALES:\n→ Unidad de tratamiento de aire (AHU)\n→ Mezcla aire nuevo / aire recirculado\n→ Distribucion por conductos y registros\n→ Fan coils para ajuste individual\n\nCONFORT Y SALUD:\n→ Filtracion del aire, mantenimiento regular obligatorio\n→ Riesgo de legionela si se descuidan filtros/circuitos",
             pt:"CLIMATIZACAO DOS LOCAIS:\n→ Unidade de tratamento de ar (AHU)\n→ Mistura ar novo / ar recirculado\n→ Distribuicao por dutos e registros\n→ Fan coils para ajuste individual\n\nCONFORTO E SAUDE:\n→ Filtracao do ar, manutencao regular obrigatoria\n→ Risco de legionela se filtros/circuitos negligenciados"} },
    { id:"vivres", icon:"🍎", color:C.copper,
      label:{fr:"Vivres equipage",en:"Crew provisions",es:"Viveres tripulacion",pt:"Viveres tripulacao"},
      detail:{fr:"CHAMBRES DE VIVRES :\n→ Chill room : 0 a +4 degC (produits frais)\n→ Freezer : -18 a -20 degC (conservation longue)\n→ Degivrage automatique ou manuel programme\n\nBONNES PRATIQUES :\n→ Ne jamais surcharger (circulation d'air)\n→ Verifier les joints de porte regulierement\n→ Alarme de temperature obligatoire\n\nRESPONSABILITE :\nLe second capitaine ou l'officier\ndesigne controle quotidiennement les\ntemperatures des chambres de vivres.",
             en:"CREW PROVISION ROOMS:\n→ Chill room: 0 to +4 degC (fresh produce)\n→ Freezer: -18 to -20 degC (long term storage)\n→ Automatic or scheduled manual defrost\n\nGOOD PRACTICE:\n→ Never overload (air circulation)\n→ Check door seals regularly\n→ Temperature alarm mandatory\n\nRESPONSIBILITY:\nThe chief mate or designated officer\nchecks provision room temperatures daily.",
             es:"CAMARAS DE VIVERES:\n→ Chill room: 0 a +4 degC (productos frescos)\n→ Freezer: -18 a -20 degC (conservacion larga)\n→ Descongelacion automatica o manual programada\n\nBUENAS PRACTICAS:\n→ Nunca sobrecargar (circulacion de aire)\n→ Revisar juntas de puerta regularmente",
             pt:"CAMARAS DE VIVERES:\n→ Chill room: 0 a +4 degC (produtos frescos)\n→ Freezer: -18 a -20 degC (conservacao longa)\n→ Descongelamento automatico ou manual programado\n\nBOAS PRATICAS:\n→ Nunca sobrecarregar (circulacao de ar)\n→ Verificar vedacoes da porta regularmente"} },
    { id:"reefer", icon:"📦", color:C.vapor,
      label:{fr:"Cargaison reefer",en:"Reefer cargo",es:"Carga reefer",pt:"Carga reefer"},
      detail:{fr:"CALES ET CONTENEURS REEFER :\n→ Temperature fixee selon le contrat de transport\n→ Enregistreur continu obligatoire (traçabilite chargeur)\n→ Alarme en cas de derive de temperature\n\nOPERATIONS :\n→ Verification de la mise en froid avant chargement\n→ Isolation du circuit avant toute intervention en cale\n→ Controle d'atmosphere avant entree en espace clos\n\nRESPONSABILITE COMMERCIALE :\nUne rupture de la chaine du froid peut\nentrainer la perte totale de la cargaison\net un litige avec le chargeur.",
             en:"REEFER HOLDS AND CONTAINERS:\n→ Temperature set by the transport contract\n→ Continuous recorder mandatory (shipper traceability)\n→ Alarm on temperature drift\n\nOPERATIONS:\n→ Pre-cooling check before loading\n→ Circuit isolation before any work in the hold\n→ Atmosphere check before enclosed space entry\n\nCOMMERCIAL RESPONSIBILITY:\nA break in the cold chain can lead to\ntotal cargo loss and a dispute with the shipper.",
             es:"BODEGAS Y CONTENEDORES REEFER:\n→ Temperatura fijada por el contrato de transporte\n→ Registrador continuo obligatorio (trazabilidad)\n→ Alarma en caso de deriva de temperatura\n\nOPERACIONES:\n→ Verificacion del preenfriado antes de cargar\n→ Aislamiento del circuito antes de intervenir en bodega",
             pt:"POROES E CONTENEIRES REEFER:\n→ Temperatura definida pelo contrato de transporte\n→ Registrador continuo obrigatorio (rastreabilidade)\n→ Alarme em caso de desvio de temperatura\n\nOPERACOES:\n→ Verificacao do pre-resfriamento antes de carregar\n→ Isolamento do circuito antes de intervir no porao"} },
  ];

  const sel_ = sel!==null ? usages[sel] : null;
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {usages.map((u,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            flex:1,padding:"10px 4px",borderRadius:12,cursor:"pointer",textAlign:"center",
            background:sel===i?`${u.color}22`:"rgba(255,255,255,0.04)",
            border:`2px solid ${sel===i?u.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:18,marginBottom:3}}>{u.icon}</div>
            <div style={{fontSize:9,color:sel===i?u.color:C.muted,fontWeight:700,lineHeight:1.2}}>{u.label[lang]||u.label.en}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}10`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:11,fontWeight:700,color:sel_.color,marginBottom:8}}>{sel_.icon} {sel_.label[lang]||sel_.label.en}</div>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.detail[lang]||sel_.detail.en}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 - INSPECTION & SECURITE
// ══════════════════════════════════════
function InspectionSafetySVG({ lang }) {
  const [idx, setIdx] = useState(0);

  const checks = [
    { icon:"👁️", color:C.frost,
      title:{fr:"Inspection visuelle",en:"Visual inspection",es:"Inspeccion visual",pt:"Inspecao visual"},
      signs:{fr:"SIGNES D'ALERTE :\n\nCIRCUIT FRIGORIFIQUE :\n→ Givre anormal sur une portion de tuyauterie = fuite\n→ Traces d'huile sur raccords = fuite lente\n→ Bruit anormal du compresseur = defaut mecanique\n→ Pression de refoulement elevee + condenseur chaud = encrassement\n\nCIRCUIT ELECTRIQUE :\n→ Cosses oxydees, cables endommages\n→ Ventilateurs bruyants ou bloques\n\nDOCUMENTATION :\n→ Registre ODS a jour a chaque intervention\n→ Certificat de charge de refrigerant",
             en:"WARNING SIGNS:\n\nREFRIGERATION CIRCUIT:\n→ Abnormal frost on a section of piping = leak\n→ Oil traces at fittings = slow leak\n→ Abnormal compressor noise = mechanical fault\n→ High discharge pressure + hot condenser = fouling\n\nELECTRICAL CIRCUIT:\n→ Oxidised terminals, damaged cables\n→ Noisy or blocked fans\n\nDOCUMENTATION:\n→ ODS log updated at every intervention\n→ Refrigerant charge certificate",
             es:"SENALES DE ALERTA:\n\nCIRCUITO FRIGORIFICO:\n→ Escarcha anormal en una seccion de tuberia = fuga\n→ Restos de aceite en racores = fuga lenta\n→ Ruido anormal del compresor = fallo mecanico\n→ Presion de descarga alta + condensador caliente = incrustacion",
             pt:"SINAIS DE ALERTA:\n\nCIRCUITO DE REFRIGERACAO:\n→ Gelo anormal numa seccao de tubagem = fuga\n→ Vestigios de oleo nas conexoes = fuga lenta\n→ Ruido anormal do compressor = falha mecanica\n→ Pressao de descarga alta + condensador quente = incrustacao"} },
    { icon:"🔧", color:C.copper,
      title:{fr:"Entretien courant",en:"Routine maintenance",es:"Mantenimiento rutinario",pt:"Manutencao de rotina"},
      signs:{fr:"ENTRETIEN PROGRAMME :\n\n→ Nettoyage des tubes de condenseur (encrassement eau de mer)\n→ Controle du niveau et de la qualite de l'huile compresseur\n→ Verification des filtres AHU (HVAC)\n→ Degivrage programme des evaporateurs\n→ Test des detecteurs de gaz (circuits NH3)\n\nFREQUENCE :\n→ Filtres HVAC : mensuelle\n→ Charge refrigerant : selon plan de maintenance (PMS)\n→ Registre ODS : a chaque charge/recuperation\n\nTracer chaque intervention permet\nde detecter une derive avant la panne.",
             en:"SCHEDULED MAINTENANCE:\n\n→ Cleaning condenser tubes (seawater fouling)\n→ Checking compressor oil level and quality\n→ Checking AHU filters (HVAC)\n→ Scheduled evaporator defrosting\n→ Testing gas detectors (NH3 circuits)\n\nFREQUENCY:\n→ HVAC filters: monthly\n→ Refrigerant charge: per planned maintenance system (PMS)\n→ ODS log: at every charge/recovery\n\nLogging every intervention helps\ndetect drift before failure.",
             es:"MANTENIMIENTO PROGRAMADO:\n\n→ Limpieza de tubos del condensador (incrustacion agua de mar)\n→ Control del nivel y calidad del aceite del compresor\n→ Revision de filtros AHU (HVAC)\n→ Descongelacion programada de evaporadores\n→ Prueba de detectores de gas (circuitos NH3)",
             pt:"MANUTENCAO PROGRAMADA:\n\n→ Limpeza dos tubos do condensador (incrustacao agua do mar)\n→ Controlo do nivel e qualidade do oleo do compressor\n→ Verificacao dos filtros AHU (HVAC)\n→ Descongelamento programado dos evaporadores\n→ Teste dos detectores de gas (circuitos NH3)"} },
    { icon:"⚠️", color:C.red,
      title:{fr:"Securite & Dangers",en:"Safety & Hazards",es:"Seguridad y Peligros",pt:"Seguranca e Perigos"},
      signs:{fr:"DANGERS PRINCIPAUX :\n\nESPACE CLOS + FUITE DE REFRIGERANT :\n→ Peut deplacer l'oxygene SANS AUCUN SIGNE VISIBLE\n→ Controle d'atmosphere obligatoire avant toute entree\n→ Cas reel : MFV Sunbeam (2018) - fuite de R-22 dans\n   une cuve RSW, un mecanicien decede par asphyxie\n\nAMMONIAC (NH3) :\n→ Toxique et inflammable a forte concentration\n→ Isoler et purger le circuit avant intervention en cale\n→ Detecteur de gaz obligatoire\n\nREGLE ABSOLUE :\nAucune entree en espace clos lie a un\ncircuit frigorifique sans controle\nd'atmosphere prealable, meme pour\nune tache de routine.",
             en:"MAIN HAZARDS:\n\nENCLOSED SPACE + REFRIGERANT LEAK:\n→ Can displace oxygen WITH NO VISIBLE SIGN\n→ Atmosphere check mandatory before any entry\n→ Real case: MFV Sunbeam (2018) - R-22 leak into\n   an RSW tank, an engineer died of asphyxiation\n\nAMMONIA (NH3):\n→ Toxic and flammable at high concentration\n→ Isolate and purge the circuit before working in a hold\n→ Gas detector mandatory\n\nABSOLUTE RULE:\nNo entry into an enclosed space linked\nto a refrigeration circuit without a\nprior atmosphere check, even for a\nroutine task.",
             es:"PELIGROS PRINCIPALES:\n\nESPACIO CERRADO + FUGA DE REFRIGERANTE:\n→ Puede desplazar el oxigeno SIN NINGUNA SENAL VISIBLE\n→ Control de atmosfera obligatorio antes de entrar\n→ Caso real: MFV Sunbeam (2018) - fuga de R-22 en\n   un tanque RSW, un mecanico murio por asfixia\n\nAMONIACO (NH3):\n→ Toxico e inflamable a alta concentracion\n→ Aislar y purgar el circuito antes de intervenir",
             pt:"PERIGOS PRINCIPAIS:\n\nESPACO FECHADO + VAZAMENTO DE REFRIGERANTE:\n→ Pode deslocar o oxigenio SEM NENHUM SINAL VISIVEL\n→ Verificacao de atmosfera obrigatoria antes de entrar\n→ Caso real: MFV Sunbeam (2018) - vazamento de R-22 num\n   tanque RSW, um mecanico morreu por asfixia\n\nAMONIA (NH3):\n→ Toxica e inflamavel em alta concentracao\n→ Isolar e purgar o circuito antes de intervir"} },
  ];

  const c = checks[idx];
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {checks.map((ch,i)=>(
          <div key={i} onClick={()=>setIdx(i)} style={{
            flex:1,padding:"8px 4px",borderRadius:10,cursor:"pointer",textAlign:"center",
            background:idx===i?`${ch.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${idx===i?ch.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:16,marginBottom:2}}>{ch.icon}</div>
            <div style={{fontSize:8,color:idx===i?ch.color:C.muted,fontWeight:700,lineHeight:1.2}}>{ch.title[lang]||ch.title.en}</div>
          </div>
        ))}
      </div>
      <div style={{padding:"12px",borderRadius:14,background:`${c.color}10`,border:`1.5px solid ${c.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:11,fontWeight:700,color:c.color,marginBottom:8}}>{c.icon} {c.title[lang]||c.title.en}</div>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{c.signs[lang]||c.signs.en}</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE (cas reel expandable)
// ══════════════════════════════════════
const ACCIDENT = {
  title:{fr:"MFV Sunbeam - Fraserburgh, 2018 (rapport MAIB)",en:"MFV Sunbeam - Fraserburgh, 2018 (MAIB report)",es:"MFV Sunbeam - Fraserburgh, 2018 (informe MAIB)",pt:"MFV Sunbeam - Fraserburgh, 2018 (relatorio MAIB)"},
  summary:{
    fr:"Le 14 aout 2018, le chalutier pelagique Sunbeam etait a quai a Fraserburgh en preparation d'un refit incluant le remplacement des groupes frigorifiques. L'equipage a vidange les neuf cuves RSW (refrigerated salt water) et entrepris leur nettoyage. Des reparations anterieures sur l'evaporateur du groupe tribord s'etaient averees inefficaces, laissant une fuite lente de refrigerant R-22 (Freon) s'accumuler dans une cuve fermee. Un second mecanicien y est descendu pour nettoyer au jet et a perdu connaissance. Des collegues venus le secourir sans appareil respiratoire ont eux-memes ete pris de malaise avant d'etre extraits par une equipe equipee. Le second mecanicien est decede par asphyxie : les mesures dans la cuve ont revele un taux d'oxygene inferieur a 6% (normal : 20,9%).",
    en:"On 14 August 2018, the pelagic trawler Sunbeam was alongside in Fraserburgh preparing for a refit that included replacing the refrigeration plants. The crew emptied the nine RSW (refrigerated salt water) tanks and began cleaning them. Earlier repairs to the starboard plant's evaporator had proved ineffective, allowing a slow leak of R-22 (Freon) to accumulate in a closed tank. A second engineer entered to power-wash it and lost consciousness. Colleagues who went to rescue him without breathing apparatus were themselves overcome before being extracted by a properly equipped team. The second engineer died of asphyxiation: tests in the tank showed an oxygen level below 6% (normal: 20.9%).",
    es:"El 14 de agosto de 2018, el arrastrero pelagico Sunbeam estaba atracado en Fraserburgh preparandose para un refit que incluia sustituir las plantas de refrigeracion. La tripulacion vacio los nueve tanques RSW (refrigerated salt water) y comenzo a limpiarlos. Reparaciones anteriores en el evaporador de la planta de estribor habian resultado ineficaces, permitiendo que una fuga lenta de R-22 (Freon) se acumulara en un tanque cerrado. Un segundo mecanico entro a limpiarlo a presion y perdio el conocimiento. Companeros que fueron a rescatarlo sin equipo respiratorio tambien sufrieron mareos antes de ser sacados por un equipo equipado. El segundo mecanico murio por asfixia: las mediciones en el tanque mostraron un nivel de oxigeno inferior al 6% (normal: 20,9%).",
    pt:"Em 14 de agosto de 2018, o arrastao pelagico Sunbeam estava atracado em Fraserburgh preparando-se para um refit que incluia a substituicao das plantas de refrigeracao. A tripulacao esvaziou os nove tanques RSW (refrigerated salt water) e comecou a limpa-los. Reparos anteriores no evaporador da planta de boreste tinham sido ineficazes, permitindo que um vazamento lento de R-22 (Freon) se acumulasse num tanque fechado. Um segundo maquinista entrou para lavar com jato e perdeu a consciencia. Colegas que foram resgata-lo sem aparelho respiratorio tambem passaram mal antes de serem retirados por uma equipe equipada. O segundo maquinista morreu por asfixia: as medicoes no tanque mostraram um nivel de oxigenio abaixo de 6% (normal: 20,9%)."
  },
  lessons:{
    fr:["Une fuite de refrigerant dans un espace clos peut rendre l'atmosphere mortelle sans aucun signe visible ni odeur perceptible.","Toute cuve en contact avec un circuit frigorifique doit etre traitee comme un espace clos potentiellement dangereux, meme a quai et meme vide.","Le registre ODS du navire ne contenait aucune trace de charge ou de fuite, ce qui a retarde l'identification de la cause.","Le controle d'atmosphere (oxymetre, detecteur de gaz) est obligatoire avant toute entree, meme pour une tache de routine.","Ne jamais porter secours en espace clos sans appareil respiratoire autonome : cela transforme un accident en plusieurs victimes."],
    en:["A refrigerant leak in an enclosed space can make the atmosphere fatal with no visible sign or detectable smell.","Any tank connected to a refrigeration circuit must be treated as a potentially dangerous enclosed space, even alongside and even when empty.","The ship's ODS log contained no record of any charge or leak, which delayed identifying the cause.","An atmosphere check (oxygen meter, gas detector) is mandatory before any entry, even for a routine task.","Never attempt a rescue in an enclosed space without breathing apparatus: it turns one casualty into several."],
    es:["Una fuga de refrigerante en un espacio cerrado puede volver la atmosfera mortal sin ninguna senal visible ni olor perceptible.","Todo tanque conectado a un circuito frigorifico debe tratarse como un espacio cerrado potencialmente peligroso, incluso atracado y vacio.","El registro ODS del buque no contenia ningun registro de carga o fuga, lo que retraso identificar la causa.","El control de atmosfera (oximetro, detector de gas) es obligatorio antes de entrar, incluso para una tarea rutinaria.","Nunca intentar un rescate en espacio cerrado sin equipo respiratorio: convierte un accidente en varias victimas."],
    pt:["Um vazamento de refrigerante num espaco fechado pode tornar a atmosfera fatal sem nenhum sinal visivel ou cheiro percetivel.","Todo tanque ligado a um circuito de refrigeracao deve ser tratado como um espaco fechado potencialmente perigoso, mesmo atracado e vazio.","O registro ODS do navio nao continha nenhum registo de carga ou vazamento, o que atrasou identificar a causa.","A verificacao da atmosfera (oximetro, detector de gas) e obrigatoria antes de entrar, mesmo para uma tarefa de rotina.","Nunca tentar um resgate em espaco fechado sem aparelho respiratorio: transforma um acidente em varias vitimas."]
  }
};

function AccidentCase({ lang }) {
  const [open,setOpen]=useState(false);
  return (
    <div onClick={()=>setOpen(v=>!v)} style={{cursor:"pointer"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontSize:12,fontWeight:700,color:C.red,lineHeight:1.4}}>⚠️ {ACCIDENT.title[lang]||ACCIDENT.title.en}</div>
        <span style={{color:C.red,fontSize:14,marginLeft:8,flexShrink:0}}>{open?"▲":"▼"}</span>
      </div>
      {open&&<div style={{marginTop:12,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.85)",lineHeight:1.75,marginBottom:12}}>{ACCIDENT.summary[lang]||ACCIDENT.summary.en}</div>
        <div style={{fontSize:10,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:8}}>{lang==="fr"?"ENSEIGNEMENTS":lang==="en"?"LESSONS LEARNED":lang==="es"?"LECCIONES":"LICOES"}</div>
        {(ACCIDENT.lessons[lang]||ACCIDENT.lessons.en).map((l,i)=><div key={i} style={{display:"flex",gap:8,padding:"5px 0",fontSize:11,color:C.white,lineHeight:1.5}}><span style={{color:C.red,fontWeight:700}}>✓</span>{l}</div>)}
      </div>}
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
      {id:"q1",q:"At the compressor outlet, the refrigerant is a hot HP ___ ___.\n(Answer: 2 words)",correct:"HP vapour"},
      {id:"q2",q:"Which natural refrigerant carries a MAJOR toxicity risk?\n(Answer: 1 word)",correct:"Ammonia"},
      {id:"q3",q:"A freezer room must be maintained between -18 and ___ degC.\n(Answer: number)",correct:"-20"},
    ],
    fr:[
      {id:"q1",q:"A la sortie du compresseur, le refrigerant est une vapeur ___ ___ chaude.\n(Repondre : 2 mots)",correct:"haute pression"},
      {id:"q2",q:"Quel refrigerant naturel presente un risque MAJEUR de toxicite ?\n(Repondre : 1 mot)",correct:"Ammoniac"},
      {id:"q3",q:"Une chambre de congelation doit etre maintenue entre -18 et ___ degC.\n(Repondre : nombre)",correct:"-20"},
    ],
    es:[
      {id:"q1",q:"A la salida del compresor, el refrigerante es un vapor de ___ ___ caliente.\n(Responder: 2 palabras)",correct:"alta presion"},
      {id:"q2",q:"¿Que refrigerante natural presenta un riesgo MAYOR de toxicidad?\n(Responder: 1 palabra)",correct:"Amoniaco"},
      {id:"q3",q:"Una camara de congelacion debe mantenerse entre -18 y ___ degC.\n(Responder: numero)",correct:"-20"},
    ],
    pt:[
      {id:"q1",q:"Na saida do compressor, o refrigerante e um vapor de ___ ___ quente.\n(Responder: 2 palavras)",correct:"alta pressao"},
      {id:"q2",q:"Que refrigerante natural apresenta um risco MAIOR de toxicidade?\n(Responder: 1 palavra)",correct:"Amonia"},
      {id:"q3",q:"Uma camara de congelacao deve ser mantida entre -18 e ___ degC.\n(Responder: numero)",correct:"-20"},
    ],
  };
  const list=qs[lang]||qs.en;
  const chk=(q,val)=>{
    const v=val.trim().toLowerCase();
    if(q.id==="q1") return (v.includes("haute")||v.includes("high")||v.includes("alta"))&&(v.includes("pression")||v.includes("pressure")||v.includes("presion")||v.includes("pressao"));
    if(q.id==="q2") return v.includes("ammon")||v.includes("amon");
    if(q.id==="q3") return v.includes("20");
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.frost}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : sortie compresseur = vapeur HP chaude · seul l'ammoniac est toxique parmi les refrigerants courants · freezer = -18/-20 degC":
         lang==="en"?"💡 Reminders: compressor outlet = hot HP vapour · ammonia is the only toxic common refrigerant · freezer = -18/-20 degC":
         lang==="es"?"💡 Recordatorios: salida compresor = vapor HP caliente · el amoniaco es el unico refrigerante toxico comun · freezer = -18/-20 degC":
         "💡 Lembretes: saida compressor = vapor HP quente · a amonia e o unico refrigerante toxico comum · freezer = -18/-20 degC"}
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
        Q1: sortie compresseur = vapeur HAUTE PRESSION chaude, avant le condenseur{"\n"}Q2: AMMONIAC (NH3/R-717) est le seul refrigerant courant toxique et inflammable{"\n"}Q3: freezer room = -18 a -20 degC pour conservation longue duree
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":`${C.frost}22`,border:`1px solid ${showC?C.green:C.frost}44`,color:showC?C.green:C.frost,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// QUIZ (5 questions x 4 langues)
// ══════════════════════════════════════
const QUIZ = {
  fr:[
    { q:"Quel composant du cycle frigorifique absorbe la chaleur de l'espace refroidi ?", opts:["Condenseur","Compresseur","Evaporateur","Detendeur"], correct:2, expl:"L'evaporateur absorbe la chaleur de l'espace refroidi : le refrigerant liquide s'y vaporise a basse pression, captant la chaleur ambiante avant que la vapeur froide reparte vers le compresseur." },
    { q:"Quel refrigerant naturel presente un risque de toxicite majeur ?", opts:["CO2 (R-744)","Ammoniac (R-717)","R-134a","R-407C"], correct:1, expl:"L'ammoniac (R-717) est toxique et inflammable a forte concentration, malgre son excellent rendement thermodynamique et son impact environnemental quasi nul." },
    { q:"A quoi sert le registre ODS a bord ?", opts:["Suivre la consommation de carburant","Tracer les substances appauvrissant la couche d'ozone","Enregistrer les heures de veille","Lister les EPI"], correct:1, expl:"Le registre ODS trace charges, fuites et recuperations de substances appauvrissant l'ozone, exige par MARPOL Annexe VI pour tout navire disposant d'un circuit frigorifique." },
    { q:"Pourquoi degivrer regulierement un evaporateur ?", opts:["Pour le nettoyer visuellement","Le givre reduit l'efficacite thermique","Pour verifier le compresseur","Ce n'est pas necessaire"], correct:1, expl:"Le givre agit comme isolant thermique et diminue fortement l'echange de chaleur a l'evaporateur, forcant le compresseur a tourner plus longtemps pour un resultat moindre." },
    { q:"Avant d'entrer dans une cuve proche d'un circuit frigorifique, quelle verification est obligatoire ?", opts:["Aucune si la cuve semble vide","Controle de l'atmosphere au detecteur de gaz","Verification de la peinture","Controle du niveau d'huile moteur"], correct:1, expl:"Une fuite de refrigerant peut deplacer l'oxygene sans signe visible, comme dans le cas du MFV Sunbeam : le controle d'atmosphere est imperatif avant toute entree en espace clos." },
  ],
  en:[
    { q:"Which component of the refrigeration cycle absorbs heat from the cooled space?", opts:["Condenser","Compressor","Evaporator","Expansion valve"], correct:2, expl:"The evaporator absorbs heat from the cooled space as the liquid refrigerant vaporizes at low pressure, capturing ambient heat before the cold vapour returns to the compressor." },
    { q:"Which natural refrigerant carries a major toxicity risk?", opts:["CO2 (R-744)","Ammonia (R-717)","R-134a","R-407C"], correct:1, expl:"Ammonia (R-717) is toxic and flammable at high concentration, despite its excellent thermodynamic efficiency and near-zero environmental impact." },
    { q:"What is the purpose of the ODS log book on board?", opts:["Track fuel consumption","Record ozone depleting substances","Log watchkeeping hours","List PPE items"], correct:1, expl:"The ODS log records charges, leaks and recovery of ozone depleting substances, required under MARPOL Annex VI for any ship with a refrigeration circuit." },
    { q:"Why must an evaporator be defrosted regularly?", opts:["For visual cleaning","Frost reduces thermal efficiency","To check the compressor","It is not necessary"], correct:1, expl:"Frost acts as a thermal insulator and significantly reduces heat exchange at the evaporator, forcing the compressor to run longer for a lesser result." },
    { q:"Before entering a tank near a refrigeration circuit, what check is mandatory?", opts:["None if the tank looks empty","Atmosphere check with a gas detector","Paint inspection","Engine oil level check"], correct:1, expl:"A refrigerant leak can displace oxygen with no visible sign, as in the MFV Sunbeam case: an atmosphere check is mandatory before any enclosed space entry." },
  ],
  es:[
    { q:"En el ciclo frigorifico, que componente absorbe el calor del espacio enfriado?", opts:["Condensador","Compresor","Evaporador","Valvula de expansion"], correct:2, expl:"El evaporador absorbe el calor del espacio enfriado al vaporizarse el refrigerante liquido a baja presion, captando el calor ambiente antes de que el vapor frio vuelva al compresor." },
    { q:"Que refrigerante natural presenta un riesgo importante de toxicidad?", opts:["CO2 (R-744)","Amoniaco (R-717)","R-134a","R-407C"], correct:1, expl:"El amoniaco (R-717) es toxico e inflamable a alta concentracion, pese a su excelente eficiencia termodinamica y su impacto ambiental casi nulo." },
    { q:"Para que sirve el registro ODS a bordo?", opts:["Controlar el consumo de combustible","Registrar sustancias que agotan la capa de ozono","Registrar horas de guardia","Listar los EPI"], correct:1, expl:"El registro ODS documenta cargas, fugas y recuperaciones de sustancias que agotan la capa de ozono, exigido por MARPOL Anexo VI." },
    { q:"Por que hay que desescarchar regularmente un evaporador?", opts:["Para limpiarlo visualmente","La escarcha reduce la eficiencia termica","Para revisar el compresor","No es necesario"], correct:1, expl:"La escarcha actua como aislante termico y reduce fuertemente el intercambio de calor en el evaporador, obligando al compresor a funcionar mas tiempo para un resultado menor." },
    { q:"Antes de entrar en un tanque cercano a un circuito frigorifico, que control es obligatorio?", opts:["Ninguno si el tanque parece vacio","Control de atmosfera con detector de gas","Inspeccion de la pintura","Control del nivel de aceite del motor"], correct:1, expl:"Una fuga de refrigerante puede desplazar el oxigeno sin senal visible, como en el caso del MFV Sunbeam: el control de atmosfera es obligatorio antes de entrar." },
  ],
  pt:[
    { q:"No ciclo de refrigeracao, qual componente absorve o calor do espaco refrigerado?", opts:["Condensador","Compressor","Evaporador","Valvula de expansao"], correct:2, expl:"O evaporador absorve o calor do espaco refrigerado quando o refrigerante liquido evapora a baixa pressao, captando o calor ambiente antes de o vapor frio retornar ao compressor." },
    { q:"Qual refrigerante natural apresenta maior risco de toxicidade?", opts:["CO2 (R-744)","Amonia (R-717)","R-134a","R-407C"], correct:1, expl:"A amonia (R-717) e toxica e inflamavel em alta concentracao, apesar de sua excelente eficiencia termodinamica e impacto ambiental quase nulo." },
    { q:"Para que serve o registro ODS a bordo?", opts:["Controlar o consumo de combustivel","Registrar substancias que destroem a camada de ozonio","Registrar horas de vigilancia","Listar EPIs"], correct:1, expl:"O registro ODS documenta cargas, vazamentos e recuperacoes de substancias que destroem a camada de ozonio, exigido pela MARPOL Anexo VI." },
    { q:"Por que descongelar regularmente um evaporador?", opts:["Para limpeza visual","O gelo reduz a eficiencia termica","Para verificar o compressor","Nao e necessario"], correct:1, expl:"O gelo age como isolante termico e reduz fortemente a troca de calor no evaporador, forcando o compressor a funcionar mais tempo para um resultado menor." },
    { q:"Antes de entrar em um tanque proximo a um circuito de refrigeracao, qual verificacao e obrigatoria?", opts:["Nenhuma se o tanque parecer vazio","Verificacao da atmosfera com detector de gas","Inspecao da pintura","Verificacao do nivel de oleo do motor"], correct:1, expl:"Um vazamento de refrigerante pode deslocar o oxigenio sem sinal visivel, como no caso do MFV Sunbeam: a verificacao da atmosfera e obrigatoria antes de entrar." },
  ],
};

// ══════════════════════════════════════
// BANQUE DE 15 QUESTIONS
// ══════════════════════════════════════
const BANK = {
  fr:[
    {q:"Dans le cycle frigorifique, ou la pression du refrigerant est-elle la plus elevee ?",opts:["Evaporateur","Compresseur (sortie)","Detendeur","Aspiration compresseur"],correct:1,expl:"A la sortie du compresseur, le refrigerant est une vapeur haute pression : c'est le point de pression maximale du cycle, avant qu'il ne redescende progressivement jusqu'au detendeur."},
    {q:"Quel composant provoque la chute de temperature du refrigerant liquide ?",opts:["Condenseur","Compresseur","Detendeur","Filtre deshydrateur"],correct:2,expl:"Le detendeur provoque une chute brutale de pression, entrainant une chute de temperature du refrigerant liquide juste avant son entree dans l'evaporateur."},
    {q:"Le condenseur d'un groupe frigorifique marin est generalement refroidi par :",opts:["L'air ambiant uniquement","L'eau de mer","La vapeur HP","L'huile de graissage"],correct:1,expl:"Sur la majorite des installations marines, le condenseur est refroidi par l'eau de mer, ce qui impose une surveillance du debit et de la proprete des tubes."},
    {q:"Quel refrigerant naturel est le plus courant sur les navires de peche ?",opts:["R-134a","R-404A","Ammoniac (R-717)","R-22"],correct:2,expl:"L'ammoniac (R-717) est tres utilise sur les navires de peche et usines flottantes pour son excellent rendement, malgre sa toxicite qui impose des precautions strictes."},
    {q:"L'ammoniac comme refrigerant presente quel risque principal ?",opts:["Aucun risque particulier","Toxicite et inflammabilite","Corrosion du cuivre uniquement","Cout tres eleve seulement"],correct:1,expl:"L'ammoniac est toxique et inflammable a forte concentration, ce qui impose l'isolement du circuit et un controle d'atmosphere avant toute intervention."},
    {q:"Que signifie un registre ODS a bord ?",opts:["Registre des heures moteur","Registre des substances appauvrissant l'ozone","Registre de securite incendie","Registre des eaux de ballast"],correct:1,expl:"Le registre ODS trace toutes les charges, fuites et recuperations de substances appauvrissant la couche d'ozone, exige par MARPOL Annexe VI."},
    {q:"Le HVAC marin assure principalement :",opts:["La refrigeration de la cargaison","Le confort thermique et la ventilation des locaux habitables","La production d'eau douce","Le refroidissement du moteur principal"],correct:1,expl:"Le HVAC assure le confort thermique et la ventilation des cabines, de la passerelle et des locaux habitables, distinct du circuit de refrigeration cargaison."},
    {q:"Un ventilo-convecteur (fan coil unit) permet :",opts:["Le reglage individuel de temperature par cabine","La compression du refrigerant","La production d'air comprime","Le degivrage automatique des cales"],correct:0,expl:"Le ventilo-convecteur est une unite terminale du circuit HVAC qui permet a chaque occupant de regler individuellement la temperature de sa cabine."},
    {q:"Une temperature de chambre de vivres refrigeree (chill room) type se situe entre :",opts:["-18 et -20 degC","0 et +4 degC","+10 et +15 degC","-30 et -25 degC"],correct:1,expl:"La chambre positive (chill room) est maintenue entre 0 et +4 degC pour conserver les produits frais non congeles."},
    {q:"Pourquoi le degivrage regulier de l'evaporateur est-il necessaire ?",opts:["Pour economiser l'huile","Le givre agit comme isolant et reduit l'efficacite","Pour nettoyer le compresseur","Ce n'est pas necessaire"],correct:1,expl:"Le givre accumule sur l'evaporateur agit comme un isolant thermique, ce qui reduit fortement l'echange de chaleur et l'efficacite globale du systeme."},
    {q:"Une pression de refoulement anormalement elevee associee a un condenseur chaud indique le plus souvent :",opts:["Manque de refrigerant","Encrassement ou debit insuffisant du condenseur","Detendeur trop ouvert","Evaporateur givre"],correct:1,expl:"Ce symptome classique indique un encrassement des tubes ou un debit d'eau de mer insuffisant, empechant le condenseur de rejeter correctement la chaleur."},
    {q:"Le Protocole de Montreal encadre principalement :",opts:["Les emissions de CO2 des moteurs","L'elimination des substances appauvrissant l'ozone","La gestion des eaux usees","La securite incendie"],correct:1,expl:"Le Protocole de Montreal organise l'elimination progressive des substances appauvrissant la couche d'ozone comme les CFC et HCFC."},
    {q:"Les HFC comme le R-404A ont pour caracteristique :",opts:["Aucun impact sur l'ozone mais un GWP eleve","Un impact ozone tres fort","D'etre inflammables uniquement","D'etre interdits depuis 1990"],correct:0,expl:"Les HFC ne contiennent pas de chlore et n'endommagent donc pas l'ozone, mais presentent un fort potentiel de rechauffement global (GWP), cible par l'amendement de Kigali."},
    {q:"Avant d'entrer dans une cuve liee a un circuit frigorifique, il faut imperativement :",opts:["Verifier uniquement la lumiere","Controler l'atmosphere avec un detecteur de gaz","Verifier la peinture des parois","Rien de particulier si la cuve est vide"],correct:1,expl:"Comme le montre le cas du MFV Sunbeam, une fuite de refrigerant peut rendre l'atmosphere mortelle sans aucun signe visible : le controle au detecteur de gaz est obligatoire."},
    {q:"Dans un systeme reefer conteneurise, l'enregistreur de temperature sert a :",opts:["Mesurer la vitesse du navire","Tracer la temperature en continu pour le chargeur","Controler la pression du moteur principal","Detecter les fuites de carburant"],correct:1,expl:"L'enregistreur continu trace la temperature tout au long du transport, une preuve contractuelle exigee par le chargeur en cas de litige sur la cargaison."},
  ],
  en:[
    {q:"In the refrigeration cycle, where is the refrigerant pressure highest?",opts:["Evaporator","Compressor (outlet)","Expansion valve","Compressor suction"],correct:1,expl:"At the compressor outlet the refrigerant is high pressure vapour: the peak pressure point of the cycle, before it drops progressively down to the expansion valve."},
    {q:"Which component causes the temperature drop of the liquid refrigerant?",opts:["Condenser","Compressor","Expansion valve","Filter drier"],correct:2,expl:"The expansion valve causes a sharp pressure drop, resulting in a temperature drop of the liquid refrigerant just before it enters the evaporator."},
    {q:"The condenser of a marine refrigeration unit is generally cooled by:",opts:["Ambient air only","Seawater","HP vapour","Lubricating oil"],correct:1,expl:"On most marine installations the condenser is cooled by seawater, requiring monitoring of flow rate and tube cleanliness."},
    {q:"Which natural refrigerant is most common on fishing vessels?",opts:["R-134a","R-404A","Ammonia (R-717)","R-22"],correct:2,expl:"Ammonia (R-717) is widely used on fishing vessels and floating factories for its excellent efficiency, despite its toxicity requiring strict precautions."},
    {q:"What is the main risk of ammonia as a refrigerant?",opts:["No particular risk","Toxicity and flammability","Copper corrosion only","High cost only"],correct:1,expl:"Ammonia is toxic and flammable at high concentration, requiring circuit isolation and an atmosphere check before any intervention."},
    {q:"What does an ODS log book mean on board?",opts:["Engine hours log","Ozone depleting substances log","Fire safety log","Ballast water log"],correct:1,expl:"The ODS log records every charge, leak and recovery of ozone depleting substances, required under MARPOL Annex VI."},
    {q:"Marine HVAC mainly provides:",opts:["Cargo refrigeration","Thermal comfort and ventilation of habitable spaces","Fresh water production","Main engine cooling"],correct:1,expl:"HVAC provides thermal comfort and ventilation for cabins, bridge and habitable spaces, distinct from the cargo refrigeration circuit."},
    {q:"A fan coil unit allows:",opts:["Individual temperature control per cabin","Refrigerant compression","Compressed air production","Automatic hold defrosting"],correct:0,expl:"A fan coil unit is a terminal HVAC device that lets each occupant individually adjust their cabin temperature."},
    {q:"A typical chilled provision room (chill room) temperature is between:",opts:["-18 and -20 degC","0 and +4 degC","+10 and +15 degC","-30 and -25 degC"],correct:1,expl:"The chill room is maintained between 0 and +4 degC to preserve fresh, unfrozen produce."},
    {q:"Why is regular evaporator defrosting necessary?",opts:["To save oil","Frost acts as insulation and reduces efficiency","To check the compressor","It is not necessary"],correct:1,expl:"Frost accumulated on the evaporator acts as a thermal insulator, strongly reducing heat exchange and overall system efficiency."},
    {q:"Abnormally high discharge pressure combined with a hot condenser most often indicates:",opts:["Refrigerant shortage","Fouling or insufficient condenser flow","Expansion valve too open","Frosted evaporator"],correct:1,expl:"This classic symptom indicates tube fouling or insufficient seawater flow, preventing the condenser from properly rejecting heat."},
    {q:"The Montreal Protocol mainly governs:",opts:["CO2 emissions from engines","The phase-out of ozone depleting substances","Wastewater management","Fire safety"],correct:1,expl:"The Montreal Protocol organises the progressive phase-out of ozone depleting substances such as CFCs and HCFCs."},
    {q:"HFCs such as R-404A are characterised by:",opts:["No ozone impact but high GWP","Very strong ozone impact","Being flammable only","Being banned since 1990"],correct:0,expl:"HFCs contain no chlorine and therefore do not damage the ozone layer, but have a high global warming potential (GWP), targeted by the Kigali Amendment."},
    {q:"Before entering a tank linked to a refrigeration circuit, it is essential to:",opts:["Only check the lighting","Check the atmosphere with a gas detector","Check the paintwork","Nothing special if the tank is empty"],correct:1,expl:"As shown by the MFV Sunbeam case, a refrigerant leak can make the atmosphere fatal with no visible sign: a gas detector check is mandatory."},
    {q:"In a containerised reefer system, the temperature recorder is used to:",opts:["Measure the vessel's speed","Continuously log temperature for the shipper","Monitor main engine pressure","Detect fuel leaks"],correct:1,expl:"The continuous recorder logs temperature throughout transport, a contractual proof required by the shipper in case of a cargo dispute."},
  ],
  es:[
    {q:"En el ciclo frigorifico, donde es mayor la presion del refrigerante?",opts:["Evaporador","Compresor (salida)","Valvula de expansion","Aspiracion del compresor"],correct:1,expl:"A la salida del compresor el refrigerante es vapor de alta presion: el punto maximo de presion del ciclo, antes de bajar progresivamente hasta la valvula de expansion."},
    {q:"Que componente provoca la caida de temperatura del refrigerante liquido?",opts:["Condensador","Compresor","Valvula de expansion","Filtro deshidratador"],correct:2,expl:"La valvula de expansion provoca una caida brusca de presion, generando una caida de temperatura del refrigerante liquido justo antes de entrar en el evaporador."},
    {q:"El condensador de un grupo frigorifico marino se enfria generalmente con:",opts:["Solo aire ambiente","Agua de mar","Vapor HP","Aceite de lubricacion"],correct:1,expl:"En la mayoria de instalaciones marinas el condensador se enfria con agua de mar, lo que exige controlar el caudal y la limpieza de los tubos."},
    {q:"Que refrigerante natural es el mas comun en buques de pesca?",opts:["R-134a","R-404A","Amoniaco (R-717)","R-22"],correct:2,expl:"El amoniaco (R-717) se usa mucho en buques de pesca y factorias flotantes por su excelente rendimiento, pese a su toxicidad que exige precauciones estrictas."},
    {q:"El amoniaco como refrigerante presenta principalmente que riesgo?",opts:["Ningun riesgo particular","Toxicidad e inflamabilidad","Solo corrosion del cobre","Solo coste muy elevado"],correct:1,expl:"El amoniaco es toxico e inflamable a alta concentracion, lo que exige aislar el circuito y controlar la atmosfera antes de cualquier intervencion."},
    {q:"Que significa un registro ODS a bordo?",opts:["Registro de horas de motor","Registro de sustancias que agotan el ozono","Registro de seguridad contra incendios","Registro de aguas de lastre"],correct:1,expl:"El registro ODS documenta todas las cargas, fugas y recuperaciones de sustancias que agotan la capa de ozono, exigido por MARPOL Anexo VI."},
    {q:"El HVAC marino asegura principalmente:",opts:["La refrigeracion de la carga","El confort termico y la ventilacion de los locales habitables","La produccion de agua dulce","El enfriamiento del motor principal"],correct:1,expl:"El HVAC asegura el confort termico y la ventilacion de camarotes, puente y locales habitables, distinto del circuito de refrigeracion de carga."},
    {q:"Un fan coil permite:",opts:["El ajuste individual de temperatura por camarote","La compresion del refrigerante","La produccion de aire comprimido","La descongelacion automatica de bodegas"],correct:0,expl:"El fan coil es una unidad terminal del circuito HVAC que permite a cada ocupante ajustar individualmente la temperatura de su camarote."},
    {q:"Una temperatura tipica de camara de viveres refrigerada (chill room) se situa entre:",opts:["-18 y -20 degC","0 y +4 degC","+10 y +15 degC","-30 y -25 degC"],correct:1,expl:"La camara positiva (chill room) se mantiene entre 0 y +4 degC para conservar productos frescos no congelados."},
    {q:"Por que es necesaria la descongelacion regular del evaporador?",opts:["Para ahorrar aceite","La escarcha actua como aislante y reduce la eficiencia","Para revisar el compresor","No es necesario"],correct:1,expl:"La escarcha acumulada en el evaporador actua como aislante termico, reduciendo fuertemente el intercambio de calor y la eficiencia general del sistema."},
    {q:"Una presion de descarga anormalmente alta junto con un condensador caliente indica generalmente:",opts:["Falta de refrigerante","Incrustacion o caudal insuficiente del condensador","Valvula de expansion demasiado abierta","Evaporador escarchado"],correct:1,expl:"Este sintoma clasico indica incrustacion en los tubos o caudal de agua de mar insuficiente, impidiendo que el condensador rechace correctamente el calor."},
    {q:"El Protocolo de Montreal regula principalmente:",opts:["Las emisiones de CO2 de los motores","La eliminacion de sustancias que agotan el ozono","La gestion de aguas residuales","La seguridad contra incendios"],correct:1,expl:"El Protocolo de Montreal organiza la eliminacion progresiva de sustancias que agotan la capa de ozono como los CFC y HCFC."},
    {q:"Los HFC como el R-404A se caracterizan por:",opts:["Sin impacto en el ozono pero con GWP alto","Un impacto en el ozono muy fuerte","Ser inflamables unicamente","Estar prohibidos desde 1990"],correct:0,expl:"Los HFC no contienen cloro y por tanto no danan la capa de ozono, pero tienen un alto potencial de calentamiento global (GWP), objetivo de la Enmienda de Kigali."},
    {q:"Antes de entrar en un tanque vinculado a un circuito frigorifico, es imprescindible:",opts:["Solo verificar la iluminacion","Controlar la atmosfera con un detector de gas","Verificar la pintura de las paredes","Nada especial si el tanque esta vacio"],correct:1,expl:"Como muestra el caso del MFV Sunbeam, una fuga de refrigerante puede volver la atmosfera mortal sin ninguna senal visible: el control con detector de gas es obligatorio."},
    {q:"En un sistema reefer contenerizado, el registrador de temperatura sirve para:",opts:["Medir la velocidad del buque","Registrar la temperatura de forma continua para el cargador","Controlar la presion del motor principal","Detectar fugas de combustible"],correct:1,expl:"El registrador continuo documenta la temperatura durante todo el transporte, una prueba contractual exigida por el cargador en caso de litigio sobre la carga."},
  ],
  pt:[
    {q:"No ciclo de refrigeracao, onde e maior a pressao do refrigerante?",opts:["Evaporador","Compressor (saida)","Valvula de expansao","Aspiracao do compressor"],correct:1,expl:"Na saida do compressor o refrigerante e vapor de alta pressao: o ponto maximo de pressao do ciclo, antes de descer progressivamente ate a valvula de expansao."},
    {q:"Que componente provoca a queda de temperatura do refrigerante liquido?",opts:["Condensador","Compressor","Valvula de expansao","Filtro secador"],correct:2,expl:"A valvula de expansao provoca uma queda brusca de pressao, gerando uma queda de temperatura do refrigerante liquido logo antes de entrar no evaporador."},
    {q:"O condensador de um grupo frigorifico marinho e geralmente resfriado por:",opts:["Apenas ar ambiente","Agua do mar","Vapor HP","Oleo de lubrificacao"],correct:1,expl:"Na maioria das instalacoes marinhas o condensador e resfriado por agua do mar, exigindo controlo da vazao e limpeza dos tubos."},
    {q:"Qual refrigerante natural e mais comum em navios de pesca?",opts:["R-134a","R-404A","Amonia (R-717)","R-22"],correct:2,expl:"A amonia (R-717) e muito usada em navios de pesca e fabricas flutuantes pelo seu excelente rendimento, apesar da toxicidade que exige precaucoes rigorosas."},
    {q:"A amonia como refrigerante apresenta principalmente que risco?",opts:["Nenhum risco particular","Toxicidade e inflamabilidade","Apenas corrosao do cobre","Apenas custo muito elevado"],correct:1,expl:"A amonia e toxica e inflamavel em alta concentracao, exigindo isolamento do circuito e verificacao da atmosfera antes de qualquer intervencao."},
    {q:"O que significa um registro ODS a bordo?",opts:["Registro de horas de motor","Registro de substancias que destroem o ozonio","Registro de seguranca contra incendio","Registro de aguas de lastro"],correct:1,expl:"O registro ODS documenta todas as cargas, vazamentos e recuperacoes de substancias que destroem a camada de ozonio, exigido pela MARPOL Anexo VI."},
    {q:"O HVAC marinho assegura principalmente:",opts:["A refrigeracao da carga","O conforto termico e a ventilacao dos locais habitaveis","A producao de agua doce","O resfriamento do motor principal"],correct:1,expl:"O HVAC assegura o conforto termico e a ventilacao de cabines, passadico e locais habitaveis, distinto do circuito de refrigeracao de carga."},
    {q:"Um fan coil permite:",opts:["O ajuste individual de temperatura por cabine","A compressao do refrigerante","A producao de ar comprimido","O descongelamento automatico dos poroes"],correct:0,expl:"O fan coil e uma unidade terminal do circuito HVAC que permite a cada ocupante ajustar individualmente a temperatura da sua cabine."},
    {q:"Uma temperatura tipica de camara de viveres refrigerada (chill room) situa-se entre:",opts:["-18 e -20 degC","0 e +4 degC","+10 e +15 degC","-30 e -25 degC"],correct:1,expl:"A camara positiva (chill room) e mantida entre 0 e +4 degC para conservar produtos frescos nao congelados."},
    {q:"Por que e necessario o descongelamento regular do evaporador?",opts:["Para economizar oleo","O gelo age como isolante e reduz a eficiencia","Para verificar o compressor","Nao e necessario"],correct:1,expl:"O gelo acumulado no evaporador age como isolante termico, reduzindo fortemente a troca de calor e a eficiencia geral do sistema."},
    {q:"Uma pressao de descarga anormalmente alta associada a um condensador quente indica geralmente:",opts:["Falta de refrigerante","Incrustacao ou vazao insuficiente do condensador","Valvula de expansao muito aberta","Evaporador com gelo"],correct:1,expl:"Este sintoma classico indica incrustacao nos tubos ou vazao insuficiente de agua do mar, impedindo o condensador de rejeitar corretamente o calor."},
    {q:"O Protocolo de Montreal regula principalmente:",opts:["As emissoes de CO2 dos motores","A eliminacao de substancias que destroem o ozonio","A gestao de aguas residuais","A seguranca contra incendio"],correct:1,expl:"O Protocolo de Montreal organiza a eliminacao progressiva de substancias que destroem a camada de ozonio como CFCs e HCFCs."},
    {q:"Os HFCs como o R-404A caracterizam-se por:",opts:["Sem impacto no ozonio mas com GWP alto","Um impacto no ozonio muito forte","Serem inflamaveis apenas","Estarem proibidos desde 1990"],correct:0,expl:"Os HFCs nao contem cloro e por isso nao danificam a camada de ozonio, mas tem um alto potencial de aquecimento global (GWP), alvo da Emenda de Kigali."},
    {q:"Antes de entrar num tanque ligado a um circuito de refrigeracao, e imprescindivel:",opts:["Apenas verificar a iluminacao","Verificar a atmosfera com um detector de gas","Verificar a pintura das paredes","Nada de especial se o tanque estiver vazio"],correct:1,expl:"Como mostra o caso do MFV Sunbeam, um vazamento de refrigerante pode tornar a atmosfera fatal sem nenhum sinal visivel: a verificacao com detector de gas e obrigatoria."},
    {q:"Num sistema reefer conteinerizado, o registrador de temperatura serve para:",opts:["Medir a velocidade do navio","Registar a temperatura continuamente para o carregador","Controlar a pressao do motor principal","Detectar vazamentos de combustivel"],correct:1,expl:"O registrador continuo documenta a temperatura durante todo o transporte, uma prova contratual exigida pelo carregador em caso de litigio sobre a carga."},
  ],
};

function QuestionBank({ lang, onComplete }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.en;const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);if(onComplete)onComplete();}};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,margin:"8px 0 4px"}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
    <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.frost},${C.copper})`}}/></div>
    <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
      {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:11,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4,fontFamily:"'Courier New',monospace"}}>{opt}</button>;})}
    </div>
    {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
    <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.frost},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PROXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
  </div>);
}

function Stars(){const s=Array.from({length:10},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.3}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.frost}33,${C.copper}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"6px 16px",borderRadius:20,background:`${C.frost}15`,border:`1px solid ${C.frost}44`,fontSize:14,color:C.frost,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.frost}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.frost,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.frost:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4,fontFamily:"'Courier New',monospace"}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white,fontFamily:"'Nunito',sans-serif"}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.frost},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d={
    en:{
      badge:"❄️ Module E2 — Auxiliary Systems & Electricity · Lesson 6/7 · ⭐ Premium · 200 XP",
      title:"Refrigeration & HVAC",
      intro:"Understanding refrigeration and air conditioning is essential for any engineer. Every officer must know the refrigeration cycle, the properties and regulation of refrigerants, their applications on board, and the critical safety rules for handling and maintenance.",
      p1:"PART 1 - REFRIGERATION CYCLE",s1t:"Compressor -> Condenser -> Expansion valve -> Evaporator",
      s1:"CYCLE HIERARCHY:\n\nCOMPRESSOR: raises pressure and temperature\n↓\nCONDENSER: rejects heat, cooled by seawater\n↓\nEXPANSION VALVE: sharp pressure and temperature drop\n↓\nEVAPORATOR: absorbs heat from the cooled space\n\nCLOSED LOOP:\nthe refrigerant returns to the\ncompressor as cold low pressure vapour\n= continuous cycle without loss",
      p2:"PART 2 - REFRIGERANTS COMPARISON",s1t:"CFC/HCFC · HFC · Ammonia · CO2",
      s2:"KEY PROPERTIES:\n\nCFC/HCFC (R-22): ozone depleting · phased out\nHFC (R-404A/R-134a): no ozone impact · high GWP\nAMMONIA (NH3): natural · toxic · very efficient\nCO2 (R-744): natural · GWP=1 · high pressure tech\n\nMOST TOXIC: ammonia\nLOWEST GWP: CO2 and ammonia\nMOST COMMON TODAY: HFC",
      p3:"PART 3 - APPLICATIONS ON BOARD",s1t:"HVAC comfort · Provisions · Reefer cargo",
      s3:"HVAC:\n→ Air handling unit, ducts, fan coil units\n→ Cabins, bridge, engine room\n\nPROVISIONS:\n→ Chill room 0/+4 degC · Freezer -18/-20 degC\n→ Daily temperature checks mandatory\n\nREEFER CARGO:\n→ Continuous temperature recorder for the shipper\n→ Isolate circuit before hold operations",
      p4:"PART 4 - INSPECTION & SAFETY",s1t:"Warning signs · Maintenance · Enclosed space",
      s4:"WARNING SIGNS:\n→ Abnormal frost = leak\n→ High discharge pressure + hot condenser = fouling\n\nMAINTENANCE:\n→ Condenser tube cleaning · oil checks · filter checks\n→ ODS log updated at every charge/recovery\n\nENCLOSED SPACE:\n→ Refrigerant leak can displace oxygen invisibly\n→ MFV Sunbeam (2018): fatal R-22 leak in an RSW tank\n→ NEVER enter without a gas detector check",
      p5:"🎯 EXERCISES",p6:"📝 QUESTION BANK - 15 QUESTIONS",
      sumT:"SUMMARY - REFRIGERATION & HVAC L6",
      sumP:["Cycle: compressor -> condenser -> expansion valve -> evaporator","Condenser cooled by seawater · fouling raises discharge pressure","Ammonia (R-717) = natural, efficient, but toxic and flammable","CO2 (R-744) = natural, GWP=1, non toxic, high pressure tech","HFC (R-404A/R-134a) = no ozone impact but high GWP","ODS log mandatory for every charge, leak and recovery (MARPOL Annex VI)","Chill room 0/+4 degC · Freezer -18/-20 degC · defrost regularly","Never enter an enclosed space near a refrigeration circuit without a gas check"],
      learnedP:["Refrigeration cycle: compressor · condenser · expansion valve · evaporator","4 refrigerant families: CFC/HCFC · HFC · ammonia · CO2","On-board uses: HVAC comfort · provisions · reefer cargo","Inspection criteria and maintenance routine","Enclosed space danger and the MFV Sunbeam case"],
    },
    fr:{
      badge:"❄️ Module E2 — Auxiliaires & Électricité · Leçon 6/7 · ⭐ Premium · 200 XP",
      title:"Refrigeration & Climatisation (HVAC)",
      intro:"Comprendre la refrigeration et la climatisation est essentiel pour tout mecanicien. Tout officier doit connaitre le cycle frigorifique, les proprietes et la reglementation des refrigerants, leurs applications a bord et les regles de securite critiques pour la manipulation et l'entretien.",
      p1:"PARTIE 1 - CYCLE FRIGORIFIQUE",s1t:"Compresseur -> Condenseur -> Detendeur -> Evaporateur",
      s1:"HIERARCHIE DU CYCLE :\n\nCOMPRESSEUR : eleve la pression et la temperature\n↓\nCONDENSEUR : rejette la chaleur, refroidi par eau de mer\n↓\nDETENDEUR : chute brutale de pression et temperature\n↓\nEVAPORATEUR : absorbe la chaleur de l'espace refroidi\n\nCIRCUIT FERME :\nle refrigerant repart vers le\ncompresseur en vapeur froide BP\n= cycle continu sans perte",
      p2:"PARTIE 2 - COMPARAISON DES REFRIGERANTS",s1t:"CFC/HCFC · HFC · Ammoniac · CO2",
      s2:"PROPRIETES CLES :\n\nCFC/HCFC (R-22) : appauvrit l'ozone · en elimination\nHFC (R-404A/R-134a) : pas d'impact ozone · GWP eleve\nAMMONIAC (NH3) : naturel · toxique · tres efficace\nCO2 (R-744) : naturel · GWP=1 · technologie haute pression\n\nPLUS TOXIQUE : ammoniac\nGWP LE PLUS BAS : CO2 et ammoniac\nPLUS COURANT AUJOURD'HUI : HFC",
      p3:"PARTIE 3 - APPLICATIONS A BORD",s1t:"Confort HVAC · Vivres · Cargaison reefer",
      s3:"HVAC :\n→ Centrale de traitement d'air, gaines, ventilo-convecteurs\n→ Cabines, passerelle, salle des machines\n\nVIVRES :\n→ Chill room 0/+4 degC · Freezer -18/-20 degC\n→ Controle quotidien des temperatures obligatoire\n\nCARGAISON REEFER :\n→ Enregistreur continu de temperature pour le chargeur\n→ Isoler le circuit avant operations en cale",
      p4:"PARTIE 4 - INSPECTION & SECURITE",s1t:"Signes d'alerte · Entretien · Espace clos",
      s4:"SIGNES D'ALERTE :\n→ Givre anormal = fuite\n→ Pression de refoulement elevee + condenseur chaud = encrassement\n\nENTRETIEN :\n→ Nettoyage tubes condenseur · controle huile · controle filtres\n→ Registre ODS a jour a chaque charge/recuperation\n\nESPACE CLOS :\n→ Une fuite de refrigerant peut deplacer l'oxygene invisiblement\n→ MFV Sunbeam (2018) : fuite mortelle de R-22 dans une cuve RSW\n→ NE JAMAIS entrer sans controle au detecteur de gaz",
      p5:"🎯 EXERCICES",p6:"📝 BANQUE 15 QUESTIONS",
      sumT:"RESUME - REFRIGERATION & HVAC L6",
      sumP:["Cycle : compresseur -> condenseur -> detendeur -> evaporateur","Condenseur refroidi par eau de mer · encrassement = pression de refoulement elevee","Ammoniac (R-717) = naturel, efficace, mais toxique et inflammable","CO2 (R-744) = naturel, GWP=1, non toxique, technologie haute pression","HFC (R-404A/R-134a) = pas d'impact ozone mais GWP eleve","Registre ODS obligatoire pour toute charge, fuite et recuperation (MARPOL Annexe VI)","Chill room 0/+4 degC · Freezer -18/-20 degC · degivrer regulierement","Ne jamais entrer en espace clos pres d'un circuit frigorifique sans controle gaz"],
      learnedP:["Cycle frigorifique : compresseur · condenseur · detendeur · evaporateur","4 familles de refrigerants : CFC/HCFC · HFC · ammoniac · CO2","Usages a bord : confort HVAC · vivres · cargaison reefer","Criteres d'inspection et routine d'entretien","Danger espace clos et le cas du MFV Sunbeam"],
    },
    es:{
      badge:"❄️ Módulo E2 — Auxiliares y Electricidad · Lección 6/7 · ⭐ Premium · 200 XP",
      title:"Refrigeracion y Climatizacion (HVAC)",
      intro:"Comprender la refrigeracion y el aire acondicionado es esencial para cualquier mecanico. Todo oficial debe conocer el ciclo frigorifico, las propiedades y la normativa de los refrigerantes, sus aplicaciones a bordo y las reglas de seguridad criticas para el manejo y mantenimiento.",
      p1:"PARTE 1 - CICLO FRIGORIFICO",s1t:"Compresor -> Condensador -> Valvula de expansion -> Evaporador",
      s1:"JERARQUIA DEL CICLO:\n\nCOMPRESOR: eleva la presion y la temperatura\n↓\nCONDENSADOR: rechaza el calor, enfriado por agua de mar\n↓\nVALVULA DE EXPANSION: caida brusca de presion y temperatura\n↓\nEVAPORADOR: absorbe el calor del espacio enfriado\n\nCIRCUITO CERRADO:\nel refrigerante vuelve al compresor\ncomo vapor frio de baja presion\n= ciclo continuo sin perdida",
      p2:"PARTE 2 - COMPARACION DE REFRIGERANTES",s1t:"CFC/HCFC · HFC · Amoniaco · CO2",
      s2:"PROPIEDADES CLAVE:\n\nCFC/HCFC (R-22): agota el ozono · en eliminacion\nHFC (R-404A/R-134a): sin impacto ozono · GWP alto\nAMONIACO (NH3): natural · toxico · muy eficiente\nCO2 (R-744): natural · GWP=1 · tecnologia alta presion\n\nMAS TOXICO: amoniaco\nGWP MAS BAJO: CO2 y amoniaco\nMAS COMUN HOY: HFC",
      p3:"PARTE 3 - APLICACIONES A BORDO",s1t:"Confort HVAC · Viveres · Carga reefer",
      s3:"HVAC:\n→ Unidad de tratamiento de aire, conductos, fan coils\n→ Camarotes, puente, sala de maquinas\n\nVIVERES:\n→ Chill room 0/+4 degC · Freezer -18/-20 degC\n→ Control diario de temperaturas obligatorio\n\nCARGA REEFER:\n→ Registrador continuo de temperatura para el cargador\n→ Aislar el circuito antes de operar en bodega",
      p4:"PARTE 4 - INSPECCION Y SEGURIDAD",s1t:"Senales de alerta · Mantenimiento · Espacio cerrado",
      s4:"SENALES DE ALERTA:\n→ Escarcha anormal = fuga\n→ Presion de descarga alta + condensador caliente = incrustacion\n\nMANTENIMIENTO:\n→ Limpieza tubos condensador · control aceite · control filtros\n→ Registro ODS actualizado en cada carga/recuperacion\n\nESPACIO CERRADO:\n→ Una fuga de refrigerante puede desplazar el oxigeno de forma invisible\n→ MFV Sunbeam (2018): fuga mortal de R-22 en un tanque RSW\n→ NUNCA entrar sin control con detector de gas",
      p5:"🎯 EJERCICIOS",p6:"📝 BANCO 15 PREGUNTAS",
      sumT:"RESUMEN - REFRIGERACION Y HVAC L6",
      sumP:["Ciclo: compresor -> condensador -> valvula de expansion -> evaporador","Condensador enfriado por agua de mar · incrustacion = presion de descarga alta","Amoniaco (R-717) = natural, eficiente, pero toxico e inflamable","CO2 (R-744) = natural, GWP=1, no toxico, tecnologia alta presion","HFC (R-404A/R-134a) = sin impacto ozono pero GWP alto","Registro ODS obligatorio para toda carga, fuga y recuperacion (MARPOL Anexo VI)","Chill room 0/+4 degC · Freezer -18/-20 degC · descongelar regularmente","Nunca entrar en espacio cerrado cerca de un circuito frigorifico sin control de gas"],
      learnedP:["Ciclo frigorifico: compresor · condensador · valvula de expansion · evaporador","4 familias de refrigerantes: CFC/HCFC · HFC · amoniaco · CO2","Usos a bordo: confort HVAC · viveres · carga reefer","Criterios de inspeccion y rutina de mantenimiento","Peligro de espacio cerrado y el caso del MFV Sunbeam"],
    },
    pt:{
      badge:"❄️ Módulo E2 — Auxiliares e Eletricidade · Lição 6/7 · ⭐ Premium · 200 XP",
      title:"Refrigeracao e Climatizacao (HVAC)",
      intro:"Compreender a refrigeracao e o ar condicionado e essencial para qualquer mecanico. Todo oficial deve conhecer o ciclo de refrigeracao, as propriedades e a regulamentacao dos refrigerantes, as suas aplicacoes a bordo e as regras de seguranca criticas para o manuseamento e manutencao.",
      p1:"PARTE 1 - CICLO DE REFRIGERACAO",s1t:"Compressor -> Condensador -> Valvula de expansao -> Evaporador",
      s1:"HIERARQUIA DO CICLO:\n\nCOMPRESSOR: eleva a pressao e a temperatura\n↓\nCONDENSADOR: rejeita o calor, resfriado por agua do mar\n↓\nVALVULA DE EXPANSAO: queda brusca de pressao e temperatura\n↓\nEVAPORADOR: absorve o calor do espaco refrigerado\n\nCIRCUITO FECHADO:\no refrigerante volta ao compressor\ncomo vapor frio de baixa pressao\n= ciclo continuo sem perda",
      p2:"PARTE 2 - COMPARACAO DE REFRIGERANTES",s1t:"CFC/HCFC · HFC · Amonia · CO2",
      s2:"PROPRIEDADES CHAVE:\n\nCFC/HCFC (R-22): destroi o ozonio · em eliminacao\nHFC (R-404A/R-134a): sem impacto no ozonio · GWP alto\nAMONIA (NH3): natural · toxica · muito eficiente\nCO2 (R-744): natural · GWP=1 · tecnologia de alta pressao\n\nMAIS TOXICA: amonia\nGWP MAIS BAIXO: CO2 e amonia\nMAIS COMUM HOJE: HFC",
      p3:"PARTE 3 - APLICACOES A BORDO",s1t:"Conforto HVAC · Viveres · Carga reefer",
      s3:"HVAC:\n→ Unidade de tratamento de ar, dutos, fan coils\n→ Cabines, passadico, casa de maquinas\n\nVIVERES:\n→ Chill room 0/+4 degC · Freezer -18/-20 degC\n→ Controlo diario de temperaturas obrigatorio\n\nCARGA REEFER:\n→ Registrador continuo de temperatura para o carregador\n→ Isolar o circuito antes de operar no porao",
      p4:"PARTE 4 - INSPECAO E SEGURANCA",s1t:"Sinais de alerta · Manutencao · Espaco fechado",
      s4:"SINAIS DE ALERTA:\n→ Gelo anormal = vazamento\n→ Pressao de descarga alta + condensador quente = incrustacao\n\nMANUTENCAO:\n→ Limpeza tubos condensador · controlo oleo · controlo filtros\n→ Registro ODS atualizado a cada carga/recuperacao\n\nESPACO FECHADO:\n→ Um vazamento de refrigerante pode deslocar o oxigenio de forma invisivel\n→ MFV Sunbeam (2018): vazamento fatal de R-22 num tanque RSW\n→ NUNCA entrar sem verificacao com detector de gas",
      p5:"🎯 EXERCICIOS",p6:"📝 BANCO 15 PERGUNTAS",
      sumT:"RESUMO - REFRIGERACAO E HVAC L6",
      sumP:["Ciclo: compressor -> condensador -> valvula de expansao -> evaporador","Condensador resfriado por agua do mar · incrustacao = pressao de descarga alta","Amonia (R-717) = natural, eficiente, mas toxica e inflamavel","CO2 (R-744) = natural, GWP=1, nao toxico, tecnologia alta pressao","HFC (R-404A/R-134a) = sem impacto no ozonio mas GWP alto","Registro ODS obrigatorio para toda carga, vazamento e recuperacao (MARPOL Anexo VI)","Chill room 0/+4 degC · Freezer -18/-20 degC · descongelar regularmente","Nunca entrar em espaco fechado perto de um circuito de refrigeracao sem verificacao de gas"],
      learnedP:["Ciclo de refrigeracao: compressor · condensador · valvula de expansao · evaporador","4 familias de refrigerantes: CFC/HCFC · HFC · amonia · CO2","Usos a bordo: conforto HVAC · viveres · carga reefer","Criterios de inspecao e rotina de manutencao","Perigo de espaco fechado e o caso do MFV Sunbeam"],
    },
  };
  return d[lang]||d.en;
};

export default function LessonE2_L6({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
  const t=T[lang]||T.en;const quiz=QUIZ[lang]||QUIZ.en;const lc=getContent(lang);
  const [phase, setPhase] = useState("content");
  const [bankDone, setBankDone] = useState(false);const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#050a10 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.frost}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.frost,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>❄️ {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Lecon 6/7":lang==="en"?"Lesson 6/7":lang==="es"?"Leccion 6/7":"Licao 6/7"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.frost,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.frost},${C.copper},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:`${C.frost}15`,border:`1px solid ${C.frost}44`,fontSize:11,color:C.frost,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.frost}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>
            <SL icon="🌀" text={lc.p1} color={C.frost}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,background:"rgba(5,10,16,0.7)",border:`1px solid ${C.frost}22`}}>
              <div style={{fontSize:11,color:C.frost,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🌀 {lang==="fr"?"CYCLE FRIGORIFIQUE":lang==="en"?"REFRIGERATION CYCLE":lang==="es"?"CICLO FRIGORIFICO":"CICLO DE REFRIGERACAO"}</div>
              <CycleFrigoSVG lang={lang}/>
            </Card>
            <SL icon="🧪" text={lc.p2} color={C.copper}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.copper}22`}}>
              <div style={{fontSize:11,color:C.copper,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🧪 {lang==="fr"?"COMPARAISON DES REFRIGERANTS":lang==="en"?"REFRIGERANTS COMPARISON":lang==="es"?"COMPARACION DE REFRIGERANTES":"COMPARACAO DE REFRIGERANTES"}</div>
              <RefrigerantsSVG lang={lang}/>
            </Card>
            <SL icon="🔗" text={lc.p3} color={C.vapor}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.vapor}22`}}>
              <div style={{fontSize:11,color:C.vapor,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔗 {lang==="fr"?"APPLICATIONS A BORD":lang==="en"?"APPLICATIONS ON BOARD":lang==="es"?"APLICACIONES A BORDO":"APLICACOES A BORDO"}</div>
              <ApplicationsSVG lang={lang}/>
            </Card>
            <SL icon="🔧" text={lc.p4} color={C.ice}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.ice}22`}}>
              <div style={{fontSize:11,color:C.ice,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔧 {lang==="fr"?"INSPECTION & SECURITE":lang==="en"?"INSPECTION & SAFETY":lang==="es"?"INSPECCION Y SEGURIDAD":"INSPECAO E SEGURANCA"}</div>
              <InspectionSafetySVG lang={lang}/>
            </Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}44`,background:"linear-gradient(135deg,rgba(192,57,43,0.08),rgba(13,31,60,0.8))"}}><AccidentCase lang={lang}/></Card>
            <SL icon="📝" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>
            <SL icon="📚" text={lc.p6} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} onComplete={()=>setBankDone(true)}/></Card>
            <Card style={{marginBottom:14,background:`${C.frost}08`,border:`1px solid ${C.frost}22`}}>
              <div style={{fontSize:11,color:C.frost,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:11,color:C.white}}><span style={{color:C.frost,fontWeight:700,fontFamily:"'Courier New',monospace"}}>✓</span>{pt}</div>)}
            </Card>
            <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.frost},${C.copper},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.navy,boxShadow:`0 10px 36px ${C.frost}33`,marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>Quiz - Refrigeration & HVAC</div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Lecon 6":lang==="en"?"Lesson 6":lang==="es"?"Leccion 6":"Licao 6"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}
          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:`${C.frost}15`,border:`1px solid ${C.frost}55`,fontSize:14,color:C.frost,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.frost,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.frost},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer",boxShadow:`0 8px 28px ${C.frost}33`,marginBottom:10}}>
              {lang==="fr"?"LECON 7 - EMERGENCY SYSTEMS →":lang==="en"?"LESSON 7 - EMERGENCY SYSTEMS →":lang==="es"?"LECCION 7 - EMERGENCY SYSTEMS →":"LICAO 7 - EMERGENCY SYSTEMS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:"1px solid rgba(255,255,255,0.15)",borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
