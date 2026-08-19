import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  ember:"#ff6b4a", steel2:"#9fb3c8", amber:"#f4b942", aqua:"#4dd9c0",
};

const T = {
  fr:{ back:"◀ Retour", module:"Module E2 — Auxiliaires & Électricité", xp:"XP gagnes", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne reponse!", wrong:"✗ Mauvaise reponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LECON TERMINEE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Module E2 — Auxiliary Systems & Electricity", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Módulo E2 — Auxiliares y Electricidad", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicacion:", next:"SIGUIENTE →", finish:"VER PUNTUACION →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", showCorr:"Ver correccion", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Módulo E2 — Auxiliares e Eletricidade", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicacao:", next:"PROXIMO →", finish:"VER PONTUACAO →", startQuiz:"✅ COMECAR QUIZ", complete:"🏅 CONCLUIDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Voce aprendeu:", readFirst:"Leia o conteudo e depois comece", showCorr:"Ver correcao", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 - GENERATION DE SECOURS
// ══════════════════════════════════════
function EmergencyPowerSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const parts = [
    { id:"generateur", icon:"🔌", color:C.ember,
      label:{fr:"Generateur de secours",en:"Emergency generator",es:"Generador de emergencia",pt:"Gerador de emergencia"},
      desc:{fr:"GENERATEUR DIESEL DE SECOURS\n\nSOURCE D'ENERGIE independante du groupe electrogene principal.\n\nEMPLACEMENT :\n→ Local dedie, hors salle des machines principale\n→ Au-dessus de la ligne de surimmersion\n→ Acces direct depuis le pont decouvert\n\nDEMARRAGE :\n→ Automatique en moins de 45 secondes (SOLAS)\n→ Demarrage a air comprime ou batteries dediees\n→ Deux moyens de demarrage independants exiges\n\nAUTONOMIE :\n→ 36h (navires a passagers) ou 18h (navires de charge)\n→ Reservoir de carburant dedie et isole du circuit principal",
           en:"EMERGENCY DIESEL GENERATOR\n\nPOWER SOURCE independent of the main generating plant.\n\nLOCATION:\n→ Dedicated space, outside the main machinery space\n→ Above the deepest subdivision load line\n→ Direct access from the open deck\n\nSTART-UP:\n→ Automatic in under 45 seconds (SOLAS)\n→ Compressed air or dedicated battery start\n→ Two independent starting means required\n\nAUTONOMY:\n→ 36h (passenger ships) or 18h (cargo ships)\n→ Dedicated fuel tank isolated from the main circuit",
           es:"GENERADOR DIESEL DE EMERGENCIA\n\nFUENTE DE ENERGIA independiente del grupo electrogeno principal.\n\nUBICACION:\n→ Local dedicado, fuera de la sala de maquinas principal\n→ Por encima de la linea de maxima inmersion\n→ Acceso directo desde la cubierta expuesta\n\nARRANQUE:\n→ Automatico en menos de 45 segundos (SOLAS)\n→ Arranque por aire comprimido o baterias dedicadas\n→ Se exigen dos medios de arranque independientes",
           pt:"GERADOR DIESEL DE EMERGENCIA\n\nFONTE DE ENERGIA independente do grupo gerador principal.\n\nLOCALIZACAO:\n→ Local dedicado, fora da casa de maquinas principal\n→ Acima da linha de submersao maxima\n→ Acesso direto a partir do convés exposto\n\nARRANQUE:\n→ Automatico em menos de 45 segundos (SOLAS)\n→ Arranque por ar comprimido ou baterias dedicadas\n→ Exigidos dois meios de arranque independentes"} },
    { id:"tableau", icon:"⚡", color:C.steel2,
      label:{fr:"Tableau de secours",en:"Emergency switchboard",es:"Cuadro de emergencia",pt:"Quadro de emergencia"},
      desc:{fr:"TABLEAU ELECTRIQUE DE SECOURS\n\nDISTRIBUE l'energie du generateur de secours aux services vitaux.\n\nCIRCUITS PRIORITAIRES :\n→ Eclairage de secours\n→ Pompe d'incendie de secours\n→ Radiocommunications et appareils de navigation\n→ Portes etanches et alarmes\n\nBASCULEMENT :\n→ Automatique en cas de coupure du tableau principal\n→ Retour automatique au reseau principal une fois retabli\n\nEMPLACEMENT :\n→ Meme local que le generateur de secours\n→ Cablage independant du reseau principal",
           en:"EMERGENCY SWITCHBOARD\n\nDISTRIBUTES power from the emergency generator to vital services.\n\nPRIORITY CIRCUITS:\n→ Emergency lighting\n→ Emergency fire pump\n→ Radio communications and navigation equipment\n→ Watertight doors and alarms\n\nCHANGEOVER:\n→ Automatic on loss of the main switchboard\n→ Automatic return to the main supply once restored\n\nLOCATION:\n→ Same space as the emergency generator\n→ Cabling independent of the main network",
           es:"CUADRO ELECTRICO DE EMERGENCIA\n\nDISTRIBUYE la energia del generador de emergencia a los servicios vitales.\n\nCIRCUITOS PRIORITARIOS:\n→ Alumbrado de emergencia\n→ Bomba contraincendios de emergencia\n→ Radiocomunicaciones y equipos de navegacion\n→ Puertas estancas y alarmas\n\nCONMUTACION:\n→ Automatica al perder el cuadro principal",
           pt:"QUADRO ELETRICO DE EMERGENCIA\n\nDISTRIBUI a energia do gerador de emergencia aos servicos vitais.\n\nCIRCUITOS PRIORITARIOS:\n→ Iluminacao de emergencia\n→ Bomba de incendio de emergencia\n→ Radiocomunicacoes e equipamentos de navegacao\n→ Portas estanques e alarmes\n\nCOMUTACAO:\n→ Automatica ao perder o quadro principal"} },
    { id:"batteries", icon:"🔋", color:C.amber,
      label:{fr:"Batteries de secours",en:"Emergency batteries",es:"Baterias de emergencia",pt:"Baterias de emergencia"},
      desc:{fr:"BATTERIES D'ECLAIRAGE TRANSITOIRE\n\nCOMBLENT le delai entre la coupure et le demarrage du generateur.\n\nROLE :\n→ Alimentent l'eclairage transitoire en moins de 0,5 seconde\n→ Couvrent les 45 premieres secondes avant le generateur\n→ Alimentent aussi certains circuits critiques en secours ultime\n\nENTRETIEN :\n→ Test de capacite periodique obligatoire\n→ Remplacement selon duree de vie du fabricant\n→ Local ventile (risque degagement d'hydrogene)\n\nSans ces batteries, un navire serait plonge dans le noir total pendant le demarrage du generateur.",
           en:"TRANSITIONAL EMERGENCY LIGHTING BATTERIES\n\nBRIDGE the gap between power loss and generator start-up.\n\nROLE:\n→ Supply transitional lighting in under 0.5 second\n→ Cover the first 45 seconds before the generator starts\n→ Also supply certain critical circuits as ultimate backup\n\nMAINTENANCE:\n→ Periodic capacity test mandatory\n→ Replacement per manufacturer's service life\n→ Ventilated space (hydrogen release risk)\n\nWithout these batteries a ship would be in total darkness while the generator starts.",
           es:"BATERIAS DE ALUMBRADO TRANSITORIO\n\nCUBREN el intervalo entre el corte y el arranque del generador.\n\nFUNCION:\n→ Suministran alumbrado transitorio en menos de 0,5 segundos\n→ Cubren los primeros 45 segundos antes del generador\n→ Tambien alimentan ciertos circuitos criticos como respaldo final\n\nMANTENIMIENTO:\n→ Prueba periodica de capacidad obligatoria",
           pt:"BATERIAS DE ILUMINACAO TRANSITORIA\n\nCOBREM o intervalo entre o corte e o arranque do gerador.\n\nFUNCAO:\n→ Fornecem iluminacao transitoria em menos de 0,5 segundos\n→ Cobrem os primeiros 45 segundos antes do gerador\n→ Tambem alimentam certos circuitos criticos como backup final\n\nMANUTENCAO:\n→ Teste periodico de capacidade obrigatorio"} },
    { id:"demarrage", icon:"🔄", color:C.aqua,
      label:{fr:"Demarrage automatique",en:"Automatic start",es:"Arranque automatico",pt:"Arranque automatico"},
      desc:{fr:"SEQUENCE DE DEMARRAGE AUTOMATIQUE\n\nDECLENCHEE des la perte de tension sur le tableau principal.\n\nETAPES :\n1. Detection de la perte d'alimentation principale\n2. Batteries assurent l'eclairage transitoire immediat\n3. Demarrage automatique du generateur de secours (moins de 45s)\n4. Basculement automatique du tableau de secours\n5. Alimentation prioritaire des circuits vitaux\n\nTEST OBLIGATOIRE :\n→ Essai hebdomadaire en charge\n→ Essai mensuel de basculement complet (blackout simule)\n→ Consignation au journal machine a chaque essai",
           en:"AUTOMATIC START SEQUENCE\n\nTRIGGERED as soon as the main switchboard loses power.\n\nSTEPS:\n1. Detection of main supply loss\n2. Batteries provide immediate transitional lighting\n3. Automatic start of the emergency generator (under 45s)\n4. Automatic changeover of the emergency switchboard\n5. Priority supply to vital circuits\n\nMANDATORY TEST:\n→ Weekly on-load test\n→ Monthly full changeover test (simulated blackout)\n→ Logged in the engine log book at every test",
           es:"SECUENCIA DE ARRANQUE AUTOMATICO\n\nSE ACTIVA en cuanto el cuadro principal pierde tension.\n\nETAPAS:\n1. Deteccion de la perdida de alimentacion principal\n2. Las baterias dan alumbrado transitorio inmediato\n3. Arranque automatico del generador de emergencia (menos de 45s)\n4. Conmutacion automatica del cuadro de emergencia\n5. Alimentacion prioritaria de los circuitos vitales",
           pt:"SEQUENCIA DE ARRANQUE AUTOMATICO\n\nACIONADA assim que o quadro principal perde tensao.\n\nETAPAS:\n1. Deteccao da perda de alimentacao principal\n2. As baterias fornecem iluminacao transitoria imediata\n3. Arranque automatico do gerador de emergencia (menos de 45s)\n4. Comutacao automatica do quadro de emergencia\n5. Alimentacao prioritaria dos circuitos vitais"} },
  ];

  const PowerSchema = () => (
    <svg viewBox="0 0 320 100" style={{width:"100%",height:90,marginBottom:8}}>
      <rect width="320" height="100" fill="rgba(0,0,0,0.3)" rx="10"/>
      <text x="14" y="20" fill={C.ember} fontSize="8" fontFamily="monospace">GENERATEUR</text>
      <text x="120" y="20" fill={C.steel2} fontSize="8" fontFamily="monospace">TABLEAU SECOURS</text>
      <text x="250" y="20" fill={C.aqua} fontSize="8" fontFamily="monospace">CIRCUITS VITAUX</text>
      <rect x="15" y="30" width="55" height="30" rx="4" fill="none" stroke={C.ember} strokeWidth="1.5"/>
      <rect x="115" y="30" width="70" height="30" rx="4" fill="none" stroke={C.steel2} strokeWidth="1.5"/>
      <rect x="230" y="24" width="30" height="18" rx="3" fill="none" stroke={C.aqua} strokeWidth="1.2"/>
      <rect x="230" y="46" width="30" height="18" rx="3" fill="none" stroke={C.aqua} strokeWidth="1.2"/>
      <text x="72" y="49" fill={C.muted} fontSize="14">→</text>
      <text x="190" y="35" fill={C.muted} fontSize="12">→</text>
      <text x="190" y="57" fill={C.muted} fontSize="12">→</text>
      <text x="20" y="80" fill={C.amber} fontSize="7" fontFamily="monospace">batteries: 0.5s</text>
      <text x="115" y="80" fill={C.muted} fontSize="7" fontFamily="monospace">demarrage: moins de 45s</text>
    </svg>
  );

  const sel_ = sel!==null ? parts[sel] : null;
  return (
    <div>
      <PowerSchema/>
      <div style={{fontSize:9,color:C.muted,textAlign:"center",marginBottom:10,letterSpacing:1}}>
        {lang==="fr"?"GENERATION DE SECOURS - APPUYEZ POUR DETAILS":lang==="en"?"EMERGENCY POWER - TAP FOR DETAILS":lang==="es"?"ENERGIA DE EMERGENCIA - PULSA PARA DETALLES":"ENERGIA DE EMERGENCIA - TOQUE PARA DETALHES"}
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
// SVG 2 - COMPARAISON DES SYSTEMES DE SECOURS
// ══════════════════════════════════════
function EmergencySystemsSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const materials = [
    { id:"pompe", icon:"💦", color:C.aqua,
      label:{fr:"Pompe incendie secours",en:"Emergency fire pump",es:"Bomba incendio emergencia",pt:"Bomba incendio emergencia"},
      props:{ val:5, val2:4, val3:3, val4:5 },
      usage:{fr:"ROLE :\n→ Assure la pression incendie si la pompe principale est perdue\n→ Independante du local des machines principales\n\nEMPLACEMENT :\n→ OBLIGATOIREMENT en dehors du local des machines principales\n→ Acces direct depuis le pont decouvert\n→ Source d'energie propre (moteur diesel dedie ou tableau de secours)\n\nTEST :\n→ Essai hebdomadaire de mise en pression\n→ Verification annuelle du debit et de la pression nominale",
             en:"ROLE:\n→ Maintains fire main pressure if the main pump is lost\n→ Independent of the main machinery space\n\nLOCATION:\n→ MUST be outside the main machinery space\n→ Direct access from the open deck\n→ Own power source (dedicated diesel engine or emergency switchboard)\n\nTEST:\n→ Weekly pressurisation test\n→ Annual flow and rated pressure check",
             es:"FUNCION:\n→ Mantiene la presion contraincendios si se pierde la bomba principal\n→ Independiente de la sala de maquinas principal\n\nUBICACION:\n→ DEBE estar fuera de la sala de maquinas principal\n→ Acceso directo desde la cubierta expuesta",
             pt:"FUNCAO:\n→ Mantem a pressao de incendio se a bomba principal for perdida\n→ Independente da casa de maquinas principal\n\nLOCALIZACAO:\n→ DEVE estar fora da casa de maquinas principal\n→ Acesso direto a partir do convés exposto"} },
    { id:"barre", icon:"🎯", color:C.steel2,
      label:{fr:"Barre de secours",en:"Emergency steering",es:"Gobierno de emergencia",pt:"Governo de emergencia"},
      props:{ val:4, val2:3, val3:2, val4:4 },
      usage:{fr:"ROLE :\n→ Permet de gouverner le navire en cas de panne de l'appareil a gouverner principal\n→ Commande locale directe au niveau du compartiment de barre\n\nCOMMUNICATION :\n→ Liaison telephonique ou sonore avec la passerelle obligatoire\n→ Indicateur d'angle de barre visible localement\n\nTEST :\n→ Essai obligatoire avant chaque appareillage\n→ Changement de mode passerelle/local documente",
             en:"ROLE:\n→ Allows steering the ship if the main steering gear fails\n→ Local direct control at the steering compartment\n\nCOMMUNICATION:\n→ Mandatory telephone or sound-powered link to the bridge\n→ Rudder angle indicator visible locally\n\nTEST:\n→ Mandatory test before every departure\n→ Bridge/local mode changeover documented",
             es:"FUNCION:\n→ Permite gobernar el buque si falla el aparato de gobierno principal\n→ Control local directo en el compartimento del timon\n\nCOMUNICACION:\n→ Enlace telefonico o sonoro obligatorio con el puente",
             pt:"FUNCAO:\n→ Permite governar o navio se o aparelho de governo principal falhar\n→ Controlo local direto no compartimento do leme\n\nCOMUNICACAO:\n→ Ligacao telefonica ou sonora obrigatoria com o passadico"} },
    { id:"eclairage", icon:"💡", color:C.amber,
      label:{fr:"Eclairage de secours",en:"Emergency lighting",es:"Alumbrado de emergencia",pt:"Iluminacao de emergencia"},
      props:{ val:3, val2:5, val3:4, val4:3 },
      usage:{fr:"ROLE :\n→ Assure la visibilite dans les coursives, escaliers, postes de rassemblement\n→ Deux niveaux : transitoire (batteries) puis secours (generateur)\n\nZONES COUVERTES :\n→ Passerelle, local machine, postes de securite\n→ Coursives d'evacuation et embarcations de sauvetage\n\nTEST :\n→ Verification visuelle a chaque exercice d'abandon",
             en:"ROLE:\n→ Ensures visibility in corridors, stairways, muster stations\n→ Two stages: transitional (batteries) then emergency (generator)\n\nCOVERED ZONES:\n→ Bridge, engine room, safety stations\n→ Escape routes and lifeboat stations\n\nTEST:\n→ Visual check at every abandon ship drill",
             es:"FUNCION:\n→ Garantiza visibilidad en pasillos, escaleras, puestos de reunion\n→ Dos niveles: transitorio (baterias) y de emergencia (generador)\n\nZONAS CUBIERTAS:\n→ Puente, sala de maquinas, puestos de seguridad",
             pt:"FUNCAO:\n→ Garante visibilidade em corredores, escadas, postos de reuniao\n→ Dois niveis: transitoria (baterias) e de emergencia (gerador)\n\nZONAS COBERTAS:\n→ Passadico, casa de maquinas, postos de seguranca"} },
    { id:"co2", icon:"🧯", color:C.ember,
      label:{fr:"Systeme fixe CO2",en:"Fixed CO2 system",es:"Sistema fijo CO2",pt:"Sistema fixo CO2"},
      props:{ val:5, val2:2, val3:5, val4:2 },
      usage:{fr:"ROLE :\n→ Noie l'espace protege en gaz inerte pour etouffer un incendie\n→ Utilise en salle des machines, cales, locaux de pompes\n\nPROCEDURE :\n→ Evacuation totale et comptage de l'equipage AVANT declenchement\n→ Delai d'alarme sonore avant liberation du gaz\n→ Arret ventilation et fermeture des ouvertures prealable\n\nENTRETIEN :\n→ Inspection annuelle des bouteilles et flexibles\n→ Test d'etancheite du systeme pilote",
             en:"ROLE:\n→ Floods the protected space with inert gas to smother a fire\n→ Used in engine room, holds, pump rooms\n\nPROCEDURE:\n→ Full evacuation and headcount BEFORE release\n→ Audible pre-discharge alarm delay\n→ Ventilation stopped and openings closed beforehand\n\nMAINTENANCE:\n→ Annual inspection of bottles and hoses\n→ Pilot system leak test",
             es:"FUNCION:\n→ Inunda el espacio protegido con gas inerte para sofocar un incendio\n→ Se usa en sala de maquinas, bodegas, salas de bombas\n\nPROCEDIMIENTO:\n→ Evacuacion total y recuento de tripulacion ANTES de la descarga",
             pt:"FUNCAO:\n→ Inunda o espaco protegido com gas inerte para sufocar um incendio\n→ Usado na casa de maquinas, poroes, salas de bombas\n\nPROCEDIMENTO:\n→ Evacuacao total e contagem da tripulacao ANTES da descarga"} },
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
              <div style={{fontSize:8,color:C.muted,marginBottom:2}}>{lang==="fr"?"Criticite":lang==="en"?"Criticality":lang==="es"?"Criticidad":"Criticidade"}</div>
              <Bar v={sel_.props.val} color={sel_.color}/>
            </div>
            <div>
              <div style={{fontSize:8,color:C.muted,marginBottom:2}}>{lang==="fr"?"Rapidite":lang==="en"?"Speed":lang==="es"?"Rapidez":"Rapidez"}</div>
              <Bar v={sel_.props.val2} color={sel_.color}/>
            </div>
            <div>
              <div style={{fontSize:8,color:C.muted,marginBottom:2}}>{lang==="fr"?"Autonomie":lang==="en"?"Autonomy":lang==="es"?"Autonomia":"Autonomia"}</div>
              <Bar v={sel_.props.val3} color={sel_.color}/>
            </div>
            <div>
              <div style={{fontSize:8,color:C.muted,marginBottom:2}}>{lang==="fr"?"Frequence test":lang==="en"?"Test frequency":lang==="es"?"Frecuencia prueba":"Frequencia teste"}</div>
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
// SVG 3 - APPLICATIONS D'URGENCE
// ══════════════════════════════════════
function EmergencyApplicationsSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const usages = [
    { id:"incendie", icon:"🔥", color:C.ember,
      label:{fr:"Lutte incendie",en:"Fire fighting",es:"Lucha contraincendios",pt:"Combate a incendio"},
      detail:{fr:"MOYENS DE SECOURS INCENDIE :\n→ Pompe d'incendie de secours hors local machine\n→ Systeme fixe CO2 pour espaces clos (machine, cales)\n→ Detecteurs de fumee et de chaleur relies a la passerelle\n→ Vannes coupe-feu et fermeture ventilation a distance (ESD)\n\nORGANISATION :\n→ Role d'equipage defini dans le muster list\n→ Exercice incendie mensuel obligatoire (SOLAS)\n\nLe cas Finnmaster (2021) montre qu'une defaillance\nen cascade de plusieurs systemes de secours peut\ntransformer un incident maitrisable en urgence majeure.",
             en:"FIRE FIGHTING RESOURCES:\n→ Emergency fire pump outside the machinery space\n→ Fixed CO2 system for enclosed spaces (engine room, holds)\n→ Smoke and heat detectors linked to the bridge\n→ Fire dampers and remote ventilation shutdown (ESD)\n\nORGANISATION:\n→ Crew role defined in the muster list\n→ Mandatory monthly fire drill (SOLAS)\n\nThe Finnmaster case (2021) shows that a cascading\nfailure of several emergency systems can turn a\nmanageable incident into a major emergency.",
             es:"MEDIOS DE LUCHA CONTRAINCENDIOS:\n→ Bomba de incendio de emergencia fuera de la sala de maquinas\n→ Sistema fijo CO2 para espacios cerrados\n→ Detectores de humo y calor conectados al puente\n→ Valvulas cortafuego y cierre remoto de ventilacion (ESD)\n\nORGANIZACION:\n→ Rol de la tripulacion definido en la lista de roles",
             pt:"MEIOS DE COMBATE A INCENDIO:\n→ Bomba de incendio de emergencia fora da casa de maquinas\n→ Sistema fixo CO2 para espacos fechados\n→ Detectores de fumo e calor ligados ao passadico\n→ Valvulas corta-fogo e fecho remoto da ventilacao (ESD)\n\nORGANIZACAO:\n→ Funcao da tripulacao definida na lista de chamada"} },
    { id:"navigation", icon:"🧭", color:C.steel2,
      label:{fr:"Navigation d'urgence",en:"Emergency navigation",es:"Navegacion de emergencia",pt:"Navegacao de emergencia"},
      detail:{fr:"MOYENS DE SECOURS NAVIGATION :\n→ Barre de secours en compartiment dedie\n→ Radio et GPS de secours alimentes par le tableau de secours\n→ Feux de navigation de secours\n→ EPIRB et balises de detresse independantes du reseau bord\n\nPROCEDURE :\n→ Test de la barre de secours avant chaque appareillage\n→ Communication passerelle-compartiment barre obligatoire\n\nSans generateur de secours fonctionnel, la\nnavigation et les communications de detresse\nseraient gravement compromises en cas de blackout.",
             en:"EMERGENCY NAVIGATION RESOURCES:\n→ Emergency steering gear in a dedicated compartment\n→ Emergency radio and GPS powered by the emergency switchboard\n→ Emergency navigation lights\n→ EPIRB and distress beacons independent of the ship's network\n\nPROCEDURE:\n→ Emergency steering test before every departure\n→ Mandatory bridge-to-steering compartment communication\n\nWithout a working emergency generator, navigation\nand distress communications would be seriously\ncompromised during a blackout.",
             es:"MEDIOS DE NAVEGACION DE EMERGENCIA:\n→ Gobierno de emergencia en compartimento dedicado\n→ Radio y GPS de emergencia alimentados por el cuadro de emergencia\n→ Luces de navegacion de emergencia\n→ EPIRB y balizas de socorro independientes de la red del buque",
             pt:"MEIOS DE NAVEGACAO DE EMERGENCIA:\n→ Governo de emergencia em compartimento dedicado\n→ Radio e GPS de emergencia alimentados pelo quadro de emergencia\n→ Luzes de navegacao de emergencia\n→ EPIRB e balizas de socorro independentes da rede do navio"} },
    { id:"alarme", icon:"🚨", color:C.amber,
      label:{fr:"Alarme generale & evacuation",en:"General alarm & evacuation",es:"Alarma general y evacuacion",pt:"Alarme geral e evacuacao"},
      detail:{fr:"SIGNAL D'ALARME GENERALE :\n→ 7 coups brefs suivis d'un coup prolonge (sonore + sifflet)\n→ Diffusion sur systeme d'annonce publique (PA) redondant\n\nMUSTER LIST :\n→ Affichee aux postes de travail, cabines et postes de rassemblement\n→ Attribution des roles : securite, lutte incendie, embarcations\n\nEXERCICES :\n→ Exercice d'abandon navire mensuel (SOLAS)\n→ Verification eclairage de secours a chaque exercice\n\nLa defaillance d'un systeme d'alarme retarde\nla mobilisation de l'equipage et peut couter\nde precieuses minutes en situation reelle.",
             en:"GENERAL ALARM SIGNAL:\n→ 7 short blasts followed by 1 prolonged blast (sound + whistle)\n→ Broadcast on a redundant public address (PA) system\n\nMUSTER LIST:\n→ Displayed at work stations, cabins and muster stations\n→ Assigns roles: safety, fire fighting, lifeboats\n\nDRILLS:\n→ Monthly abandon ship drill (SOLAS)\n→ Emergency lighting checked at every drill\n\nA failed alarm system delays crew mobilisation\nand can cost precious minutes in a real situation.",
             es:"SENAL DE ALARMA GENERAL:\n→ 7 pitidos cortos seguidos de 1 prolongado (sonoro + silbato)\n→ Difusion por sistema de megafonia (PA) redundante\n\nLISTA DE ROLES:\n→ Expuesta en puestos de trabajo, camarotes y puestos de reunion",
             pt:"SINAL DE ALARME GERAL:\n→ 7 toques curtos seguidos de 1 prolongado (sonoro + apito)\n→ Difusao por sistema de megafonia (PA) redundante\n\nLISTA DE CHAMADA:\n→ Exposta nos postos de trabalho, cabines e postos de reuniao"} },
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
function EmergencyInspectionSVG({ lang }) {
  const [idx, setIdx] = useState(0);

  const checks = [
    { icon:"👁️", color:C.ember,
      title:{fr:"Tests reglementaires",en:"Regulatory tests",es:"Pruebas reglamentarias",pt:"Testes regulamentares"},
      signs:{fr:"CALENDRIER SOLAS :\n\nHEBDOMADAIRE :\n→ Demarrage et essai en charge du generateur de secours\n→ Mise en pression de la pompe d'incendie de secours\n\nMENSUEL :\n→ Essai complet de basculement (blackout simule)\n→ Exercice d'abandon navire avec verification eclairage\n\nAVANT CHAQUE APPAREILLAGE :\n→ Test de la barre de secours\n→ Verification communication passerelle-compartiment barre\n\nANNUEL :\n→ Inspection des bouteilles CO2 et flexibles\n→ Controle du debit nominal de la pompe d'incendie",
             en:"SOLAS SCHEDULE:\n\nWEEKLY:\n→ Start and on-load test of the emergency generator\n→ Pressurisation of the emergency fire pump\n\nMONTHLY:\n→ Full changeover test (simulated blackout)\n→ Abandon ship drill with lighting check\n\nBEFORE EVERY DEPARTURE:\n→ Emergency steering gear test\n→ Bridge-to-steering compartment communication check\n\nANNUAL:\n→ Inspection of CO2 bottles and hoses\n→ Fire pump rated flow check",
             es:"CALENDARIO SOLAS:\n\nSEMANAL:\n→ Arranque y prueba en carga del generador de emergencia\n→ Puesta en presion de la bomba de incendio de emergencia\n\nMENSUAL:\n→ Prueba completa de conmutacion (apagon simulado)",
             pt:"CALENDARIO SOLAS:\n\nSEMANAL:\n→ Arranque e teste em carga do gerador de emergencia\n→ Colocacao em pressao da bomba de incendio de emergencia\n\nMENSAL:\n→ Teste completo de comutacao (blackout simulado)"} },
    { icon:"🔧", color:C.steel2,
      title:{fr:"Entretien courant",en:"Routine maintenance",es:"Mantenimiento rutinario",pt:"Manutencao de rotina"},
      signs:{fr:"ENTRETIEN GENERATEUR DE SECOURS :\n\n→ Controle niveau et qualite du carburant dedie\n→ Verification des deux moyens de demarrage independants\n→ Test de capacite des batteries d'eclairage transitoire\n→ Graissage et controle mecanique selon plan constructeur\n\nENTRETIEN SYSTEMES ANNEXES :\n→ Verification des vannes coupe-feu et registres ESD\n→ Test des detecteurs de fumee et de chaleur\n→ Controle de l'etancheite du systeme pilote CO2\n\nTracer chaque test au journal machine (PMS)\npermet de detecter une derive avant l'urgence reelle.",
             en:"EMERGENCY GENERATOR MAINTENANCE:\n\n→ Checking dedicated fuel level and quality\n→ Verifying both independent starting means\n→ Capacity test of transitional lighting batteries\n→ Greasing and mechanical checks per maker's plan\n\nRELATED SYSTEMS MAINTENANCE:\n→ Checking fire dampers and ESD registers\n→ Testing smoke and heat detectors\n→ Checking CO2 pilot system tightness\n\nLogging every test in the engine log (PMS) helps\ndetect drift before a real emergency.",
             es:"MANTENIMIENTO GENERADOR DE EMERGENCIA:\n\n→ Control del nivel y calidad del combustible dedicado\n→ Verificacion de los dos medios de arranque independientes\n→ Prueba de capacidad de las baterias de alumbrado transitorio",
             pt:"MANUTENCAO GERADOR DE EMERGENCIA:\n\n→ Controlo do nivel e qualidade do combustivel dedicado\n→ Verificacao dos dois meios de arranque independentes\n→ Teste de capacidade das baterias de iluminacao transitoria"} },
    { icon:"⚠️", color:C.red,
      title:{fr:"Securite & Dangers",en:"Safety & Hazards",es:"Seguridad y Peligros",pt:"Seguranca e Perigos"},
      signs:{fr:"DANGERS PRINCIPAUX :\n\nDEFAILLANCE EN CASCADE :\n→ Une panne de secours peut en entrainer d'autres\n→ Cas reel : RoRo Finnmaster (2021, Hull) - un incendie\n   en salle des machines a revele un disjoncteur defectueux\n   empechant le generateur de secours d'alimenter le reseau,\n   un systeme CO2 fixe partiellement inoperant (flexible\n   defectueux) et des radios UHF hors service\n\nSYSTEME CO2 :\n→ Danger d'asphyxie : ne jamais penetrer dans un espace\n   noye au CO2 sans controle d'atmosphere prealable\n\nREGLE ABSOLUE :\nTous les systemes de secours doivent etre testes\nregulierement et INDEPENDAMMENT les uns des autres :\nun seul defaut non detecte peut neutraliser toute\nla chaine de secours en situation reelle.",
             en:"MAIN HAZARDS:\n\nCASCADING FAILURE:\n→ One emergency system failure can trigger others\n→ Real case: RoRo Finnmaster (2021, Hull) - an engine\n   room fire revealed a faulty circuit breaker preventing\n   the emergency generator from supplying the network,\n   a partially inoperative fixed CO2 system (defective\n   hose) and UHF radios out of service\n\nCO2 SYSTEM:\n→ Asphyxiation risk: never enter a CO2-flooded space\n   without a prior atmosphere check\n\nABSOLUTE RULE:\nAll emergency systems must be tested regularly\nand INDEPENDENTLY of each other: a single\nundetected fault can neutralise the whole\nemergency chain in a real situation.",
             es:"PELIGROS PRINCIPALES:\n\nFALLO EN CASCADA:\n→ Un fallo de emergencia puede provocar otros\n→ Caso real: RoRo Finnmaster (2021, Hull) - un incendio\n   en sala de maquinas revelo un disyuntor defectuoso que\n   impedia al generador de emergencia alimentar la red",
             pt:"PERIGOS PRINCIPAIS:\n\nFALHA EM CASCATA:\n→ Uma falha de emergencia pode provocar outras\n→ Caso real: RoRo Finnmaster (2021, Hull) - um incendio\n   na casa de maquinas revelou um disjuntor defeituoso"} },
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
  title:{fr:"RoRo Finnmaster - Hull, 2021 (rapport MAIB)",en:"RoRo Finnmaster - Hull, 2021 (MAIB report)",es:"RoRo Finnmaster - Hull, 2021 (informe MAIB)",pt:"RoRo Finnmaster - Hull, 2021 (relatorio MAIB)"},
  summary:{
    fr:"Le 19 septembre 2021, huit minutes apres avoir quitte le port de Hull, un incendie s'est declare dans la salle des machines auxiliaires du navire RoRo Finnmaster. Un moteur auxiliaire modifie de facon non conforme laissait des gaz d'echappement chauds frapper un flexible de carburant, qui a rompu et projete du fuel sous pression sur une surface chaude. Le navire a perdu toute sa puissance. Lors de la reponse a l'urgence, plusieurs defaillances en cascade sont apparues : le disjoncteur du generateur de secours etait defectueux et n'a pas pu alimenter le reseau de secours ; le systeme fixe CO2 ne s'est que partiellement declenche a cause d'un flexible defectueux et de fuites sur le circuit pilote ; les radios portatives UHF des mecaniciens sont tombees en panne, coupant la communication avec la passerelle. L'equipage a finalement maitrise l'incendie a l'extincteur a poudre apres avoir constate que toutes les bouteilles CO2 ne s'etaient pas declenchees. Aucune victime, mais des dommages importants.",
    en:"On 19 September 2021, eight minutes after leaving the port of Hull, a fire broke out in the auxiliary engine room of the RoRo Finnmaster. A non-compliant modified auxiliary engine allowed hot exhaust gas to impinge on a fuel hose, which failed and sprayed fuel under pressure onto a hot surface. The vessel lost all power. During the emergency response, several cascading failures emerged: the emergency generator's circuit breaker was faulty and could not supply the emergency network; the fixed CO2 system only partially discharged due to a defective hose and leaks in the pilot circuit; the engineers' handheld UHF radios failed, cutting communication with the bridge. The crew eventually extinguished the fire with dry powder extinguishers after discovering not all CO2 bottles had activated. No injuries, but significant damage.",
    es:"El 19 de septiembre de 2021, ocho minutos despues de salir del puerto de Hull, se declaro un incendio en la sala de maquinas auxiliares del buque RoRo Finnmaster. Un motor auxiliar modificado de forma no conforme dejaba que los gases de escape calientes impactaran una manguera de combustible, que se rompio y proyecto combustible a presion sobre una superficie caliente. El buque perdio toda la energia. Durante la respuesta a la emergencia surgieron varios fallos en cascada: el disyuntor del generador de emergencia estaba defectuoso y no pudo alimentar la red de emergencia; el sistema fijo de CO2 solo se activo parcialmente por una manguera defectuosa y fugas en el circuito piloto; las radios portatiles UHF de los mecanicos fallaron, cortando la comunicacion con el puente. La tripulacion finalmente controlo el incendio con extintores de polvo tras descubrir que no todas las botellas de CO2 se habian activado. Sin heridos, pero con danos importantes.",
    pt:"Em 19 de setembro de 2021, oito minutos apos deixar o porto de Hull, um incendio deflagrou na casa de maquinas auxiliares do navio RoRo Finnmaster. Um motor auxiliar modificado de forma nao conforme deixava os gases de escape quentes atingirem uma mangueira de combustivel, que rompeu e projetou combustivel sob pressao sobre uma superficie quente. O navio perdeu toda a energia. Durante a resposta a emergencia surgiram varias falhas em cascata: o disjuntor do gerador de emergencia estava defeituoso e nao conseguiu alimentar a rede de emergencia; o sistema fixo de CO2 apenas descarregou parcialmente devido a uma mangueira defeituosa e vazamentos no circuito piloto; os radios portateis UHF dos maquinistas falharam, cortando a comunicacao com o passadico. A tripulacao finalmente controlou o incendio com extintores de po apos descobrir que nem todos os cilindros de CO2 tinham disparado. Sem feridos, mas com danos significativos."
  },
  lessons:{
    fr:["Un defaut sur un seul composant (disjoncteur) peut priver tout le reseau de secours d'alimentation au pire moment.","Les systemes de secours doivent etre testes independamment : un systeme jamais utilise en conditions reelles peut cacher un defaut latent.","Une modification non approuvee par la societe de classification a ete la cause initiale de l'incendie.","Un systeme fixe CO2 partiellement declenche est aussi dangereux qu'inefficace : verifier le declenchement complet est vital.","Prevoir un moyen de communication de secours redondant : une seule panne radio ne doit jamais isoler l'equipage de la passerelle."],
    en:["A fault in a single component (a circuit breaker) can cut off the entire emergency network at the worst moment.","Emergency systems must be tested independently: a system never used in real conditions can hide a latent fault.","An unapproved modification by the classification society was the initial cause of the fire.","A partially discharged fixed CO2 system is as dangerous as it is ineffective: verifying full discharge is vital.","Provide a redundant emergency communication means: a single radio failure should never isolate the crew from the bridge."],
    es:["Un fallo en un solo componente (un disyuntor) puede dejar sin alimentacion a toda la red de emergencia en el peor momento.","Los sistemas de emergencia deben probarse de forma independiente: un sistema nunca usado en condiciones reales puede ocultar un fallo latente.","Una modificacion no aprobada por la sociedad de clasificacion fue la causa inicial del incendio.","Un sistema fijo de CO2 parcialmente descargado es tan peligroso como ineficaz: verificar la descarga completa es vital.","Prever un medio de comunicacion de emergencia redundante: un solo fallo de radio nunca debe aislar a la tripulacion del puente."],
    pt:["Uma falha num unico componente (um disjuntor) pode cortar toda a rede de emergencia no pior momento.","Os sistemas de emergencia devem ser testados de forma independente: um sistema nunca usado em condicoes reais pode esconder uma falha latente.","Uma modificacao nao aprovada pela sociedade classificadora foi a causa inicial do incendio.","Um sistema fixo de CO2 parcialmente descarregado e tao perigoso quanto ineficaz: verificar a descarga completa e vital.","Prever um meio de comunicacao de emergencia redundante: uma unica falha de radio nunca deve isolar a tripulacao do passadico."]
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
      {id:"q1",q:"SOLAS requires the emergency generator to start automatically in under ___ seconds.\n(Answer: number)",correct:"45"},
      {id:"q2",q:"The general alarm signal is 7 short blasts followed by ___ prolonged blast.\n(Answer: number)",correct:"1"},
      {id:"q3",q:"The emergency fire pump must be located ___ the main machinery space.\n(Answer: short phrase)",correct:"outside"},
    ],
    fr:[
      {id:"q1",q:"Le SOLAS exige que le generateur de secours demarre automatiquement en moins de ___ secondes.\n(Repondre : nombre)",correct:"45"},
      {id:"q2",q:"Le signal d'alarme generale est compose de 7 coups brefs suivis de ___ coup(s) prolonge(s).\n(Repondre : nombre)",correct:"1"},
      {id:"q3",q:"La pompe d'incendie de secours doit etre situee ___ du local des machines principales.\n(Repondre : courte expression)",correct:"en dehors"},
    ],
    es:[
      {id:"q1",q:"El SOLAS exige que el generador de emergencia arranque automaticamente en menos de ___ segundos.\n(Responder: numero)",correct:"45"},
      {id:"q2",q:"La senal de alarma general son 7 pitidos cortos seguidos de ___ pitido(s) prolongado(s).\n(Responder: numero)",correct:"1"},
      {id:"q3",q:"La bomba de incendio de emergencia debe estar situada ___ de la sala de maquinas principal.\n(Responder: expresion corta)",correct:"fuera"},
    ],
    pt:[
      {id:"q1",q:"O SOLAS exige que o gerador de emergencia arranque automaticamente em menos de ___ segundos.\n(Responder: numero)",correct:"45"},
      {id:"q2",q:"O sinal de alarme geral e 7 toques curtos seguidos de ___ toque(s) prolongado(s).\n(Responder: numero)",correct:"1"},
      {id:"q3",q:"A bomba de incendio de emergencia deve estar situada ___ da casa de maquinas principal.\n(Responder: expressao curta)",correct:"fora"},
    ],
  };
  const list=qs[lang]||qs.en;
  const chk=(q,val)=>{
    const v=val.trim().toLowerCase();
    if(q.id==="q1") return v.includes("45");
    if(q.id==="q2") return v.includes("1");
    if(q.id==="q3") return v.includes("dehors")||v.includes("outside")||v.includes("fuera")||v.includes("fora");
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.ember}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : generateur de secours = moins de 45s · alarme generale = 7 coups brefs + 1 prolonge · pompe incendie secours = hors local machine principal":
         lang==="en"?"💡 Reminders: emergency generator = under 45s · general alarm = 7 short + 1 prolonged · emergency fire pump = outside main machinery space":
         lang==="es"?"💡 Recordatorios: generador de emergencia = menos de 45s · alarma general = 7 cortos + 1 prolongado · bomba de incendio de emergencia = fuera de la sala de maquinas principal":
         "💡 Lembretes: gerador de emergencia = menos de 45s · alarme geral = 7 curtos + 1 prolongado · bomba de incendio de emergencia = fora da casa de maquinas principal"}
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
        Q1: 45 SECONDES maximum pour le demarrage automatique du generateur de secours (SOLAS){"\n"}Q2: 7 coups brefs + 1 coup PROLONGE = signal d'alarme generale{"\n"}Q3: la pompe d'incendie de secours doit etre EN DEHORS du local des machines principales
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":`${C.ember}22`,border:`1px solid ${showC?C.green:C.ember}44`,color:showC?C.green:C.ember,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
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
    { q:"En combien de temps maximum le generateur de secours doit-il demarrer automatiquement ?", opts:["10 secondes","45 secondes","5 minutes","1 heure"], correct:1, expl:"Le SOLAS impose un demarrage automatique du generateur de secours en moins de 45 secondes apres la perte du tableau principal, delai couvert par les batteries d'eclairage transitoire." },
    { q:"Ou doit obligatoirement se trouver la pompe d'incendie de secours ?", opts:["Dans le local des machines principales","En dehors du local des machines principales","Sur la passerelle","Dans la salle des generateurs"], correct:1, expl:"La pompe d'incendie de secours doit etre situee en dehors du local des machines principales pour rester operationnelle meme si ce local est sinistre." },
    { q:"Quel est le signal sonore de l'alarme generale ?", opts:["Un coup prolonge seulement","7 coups brefs suivis d'un coup prolonge","3 coups brefs","Une sirene continue"], correct:1, expl:"Le signal reglementaire de l'alarme generale est compose de 7 coups brefs suivis d'un coup prolonge, diffuse par sifflet et systeme d'annonce publique." },
    { q:"Avant de declencher un systeme fixe CO2, que faut-il imperativement faire ?", opts:["Rien, il se declenche automatiquement","Evacuer et compter tout l'equipage de l'espace concerne","Ouvrir toutes les portes","Demarrer la ventilation"], correct:1, expl:"Le CO2 deplace l'oxygene et est mortel : une evacuation complete avec comptage de l'equipage est obligatoire avant tout declenchement, avec un delai d'alarme sonore prealable." },
    { q:"Dans le cas du RoRo Finnmaster (2021), quelle defaillance a empeche le generateur de secours d'alimenter le reseau ?", opts:["Manque de carburant","Un disjoncteur defectueux","Batteries dechargees","Erreur de l'equipage"], correct:1, expl:"Un disjoncteur defectueux a empeche le generateur de secours de se connecter au reseau, illustrant comment un seul composant peut neutraliser toute la chaine de secours." },
  ],
  en:[
    { q:"Within what maximum time must the emergency generator start automatically?", opts:["10 seconds","45 seconds","5 minutes","1 hour"], correct:1, expl:"SOLAS requires the emergency generator to start automatically within 45 seconds of losing the main switchboard, a gap covered by the transitional lighting batteries." },
    { q:"Where must the emergency fire pump be located?", opts:["Inside the main machinery space","Outside the main machinery space","On the bridge","In the generator room"], correct:1, expl:"The emergency fire pump must be located outside the main machinery space so it stays operational even if that space is affected by a casualty." },
    { q:"What is the general alarm sound signal?", opts:["One prolonged blast only","7 short blasts followed by 1 prolonged blast","3 short blasts","A continuous siren"], correct:1, expl:"The regulatory general alarm signal is 7 short blasts followed by 1 prolonged blast, broadcast via whistle and the public address system." },
    { q:"Before releasing a fixed CO2 system, what must be done first?", opts:["Nothing, it triggers automatically","Evacuate and headcount the whole crew from the affected space","Open all doors","Start the ventilation"], correct:1, expl:"CO2 displaces oxygen and is lethal: full evacuation with a crew headcount is mandatory before release, preceded by an audible alarm delay." },
    { q:"In the RoRo Finnmaster case (2021), which fault prevented the emergency generator from supplying the network?", opts:["Lack of fuel","A faulty circuit breaker","Discharged batteries","Crew error"], correct:1, expl:"A faulty circuit breaker prevented the emergency generator from connecting to the network, showing how a single component can neutralise the whole emergency chain." },
  ],
  es:[
    { q:"En cuanto tiempo maximo debe arrancar automaticamente el generador de emergencia?", opts:["10 segundos","45 segundos","5 minutos","1 hora"], correct:1, expl:"El SOLAS exige que el generador de emergencia arranque automaticamente en menos de 45 segundos tras perder el cuadro principal, intervalo cubierto por las baterias de alumbrado transitorio." },
    { q:"Donde debe estar situada obligatoriamente la bomba de incendio de emergencia?", opts:["Dentro de la sala de maquinas principal","Fuera de la sala de maquinas principal","En el puente","En la sala de generadores"], correct:1, expl:"La bomba de incendio de emergencia debe estar fuera de la sala de maquinas principal para seguir operativa aunque esa sala se vea afectada." },
    { q:"Cual es la senal sonora de la alarma general?", opts:["Un pitido prolongado solamente","7 pitidos cortos seguidos de 1 prolongado","3 pitidos cortos","Una sirena continua"], correct:1, expl:"La senal reglamentaria de la alarma general son 7 pitidos cortos seguidos de 1 prolongado, difundida por silbato y megafonia." },
    { q:"Antes de activar un sistema fijo de CO2, que hay que hacer imprescindiblemente?", opts:["Nada, se activa automaticamente","Evacuar y contar a toda la tripulacion del espacio afectado","Abrir todas las puertas","Poner en marcha la ventilacion"], correct:1, expl:"El CO2 desplaza el oxigeno y es letal: es obligatorio evacuar y contar a la tripulacion antes de la descarga, precedido de un retardo de alarma sonora." },
    { q:"En el caso del RoRo Finnmaster (2021), que fallo impidio al generador de emergencia alimentar la red?", opts:["Falta de combustible","Un disyuntor defectuoso","Baterias descargadas","Error de la tripulacion"], correct:1, expl:"Un disyuntor defectuoso impidio que el generador de emergencia se conectara a la red, mostrando como un solo componente puede neutralizar toda la cadena de emergencia." },
  ],
  pt:[
    { q:"Em quanto tempo maximo o gerador de emergencia deve arrancar automaticamente?", opts:["10 segundos","45 segundos","5 minutos","1 hora"], correct:1, expl:"O SOLAS exige que o gerador de emergencia arranque automaticamente em menos de 45 segundos apos a perda do quadro principal, intervalo coberto pelas baterias de iluminacao transitoria." },
    { q:"Onde deve estar obrigatoriamente localizada a bomba de incendio de emergencia?", opts:["Dentro da casa de maquinas principal","Fora da casa de maquinas principal","No passadico","Na sala dos geradores"], correct:1, expl:"A bomba de incendio de emergencia deve estar fora da casa de maquinas principal para permanecer operacional mesmo se essa area for afetada." },
    { q:"Qual e o sinal sonoro do alarme geral?", opts:["Apenas um toque prolongado","7 toques curtos seguidos de 1 prolongado","3 toques curtos","Uma sirene continua"], correct:1, expl:"O sinal regulamentar do alarme geral e 7 toques curtos seguidos de 1 prolongado, difundido por apito e sistema de megafonia." },
    { q:"Antes de acionar um sistema fixo de CO2, o que e imprescindivel fazer?", opts:["Nada, aciona automaticamente","Evacuar e contar toda a tripulacao do espaco afetado","Abrir todas as portas","Ligar a ventilacao"], correct:1, expl:"O CO2 desloca o oxigenio e e letal: e obrigatorio evacuar e contar a tripulacao antes da descarga, precedido de um atraso de alarme sonoro." },
    { q:"No caso do RoRo Finnmaster (2021), que falha impediu o gerador de emergencia de alimentar a rede?", opts:["Falta de combustivel","Um disjuntor defeituoso","Baterias descarregadas","Erro da tripulacao"], correct:1, expl:"Um disjuntor defeituoso impediu o gerador de emergencia de se ligar a rede, mostrando como um unico componente pode neutralizar toda a cadeia de emergencia." },
  ],
};

// ══════════════════════════════════════
// BANQUE DE 15 QUESTIONS
// ══════════════════════════════════════
const BANK = {
  fr:[
    {q:"Le generateur de secours doit etre situe :",opts:["Dans le local des machines principales","Dans un local dedie, hors salle des machines principale","Sur la coque exterieure","Dans la cale a marchandises"],correct:1,expl:"Le generateur de secours occupe un local dedie, distinct de la salle des machines principale, avec acces direct depuis le pont decouvert, pour rester operationnel meme si la salle des machines est sinistree."},
    {q:"Combien de moyens de demarrage independants sont exiges pour le generateur de secours ?",opts:["Un seul suffit","Deux moyens independants","Trois moyens minimum","Aucune exigence particuliere"],correct:1,expl:"Deux moyens de demarrage independants (air comprime et/ou batteries dediees) sont exiges afin de garantir le demarrage meme si l'un des deux systemes est defaillant."},
    {q:"Quelle est l'autonomie minimale exigee pour un generateur de secours sur un navire de charge ?",opts:["6 heures","18 heures","36 heures","72 heures"],correct:1,expl:"Un navire de charge doit disposer d'une autonomie minimale de 18 heures sur le generateur de secours, contre 36 heures pour un navire a passagers."},
    {q:"Le tableau de secours alimente en priorite :",opts:["Le divertissement des passagers","L'eclairage de secours, la pompe incendie et les communications","La cuisine du bord","Le systeme de climatisation general"],correct:1,expl:"Le tableau de secours distribue l'energie aux circuits vitaux : eclairage de secours, pompe d'incendie de secours, radiocommunications, portes etanches et alarmes."},
    {q:"Les batteries d'eclairage transitoire doivent alimenter l'eclairage en moins de :",opts:["5 secondes","0,5 seconde","1 minute","45 secondes"],correct:1,expl:"Les batteries assurent l'eclairage transitoire en moins de 0,5 seconde, comblant le delai avant le demarrage complet du generateur de secours (45 secondes maximum)."},
    {q:"A quelle frequence le generateur de secours doit-il subir un essai en charge ?",opts:["Annuelle","Mensuelle","Hebdomadaire","Il n'y a pas d'essai obligatoire"],correct:2,expl:"Un essai hebdomadaire de demarrage et de fonctionnement en charge est obligatoire pour le generateur de secours, en plus de l'essai mensuel de basculement complet."},
    {q:"La barre de secours doit etre testee :",opts:["Une fois par an seulement","Avant chaque appareillage","Uniquement apres une avarie","Jamais si le systeme principal fonctionne"],correct:1,expl:"Un test de la barre de secours est obligatoire avant chaque appareillage, avec verification de la communication entre la passerelle et le compartiment de barre."},
    {q:"Quel est le signal sonore reglementaire de l'alarme generale ?",opts:["3 coups longs","7 coups brefs suivis d'un coup prolonge","1 coup bref","Une sirene continue de 30 secondes"],correct:1,expl:"Le signal d'alarme generale reglementaire est compose de 7 coups brefs suivis d'un coup prolonge, diffuse par sifflet et systeme d'annonce publique."},
    {q:"Avant de declencher un systeme fixe CO2 dans un espace clos, il faut :",opts:["Rien de particulier","Evacuer et compter tout l'equipage present","Fermer uniquement les fenetres","Attendre l'arrivee des secours exterieurs"],correct:1,expl:"Le CO2 deplace l'oxygene et est mortel : une evacuation complete avec comptage de l'equipage est obligatoire avant declenchement, precedee d'un delai d'alarme sonore."},
    {q:"L'exercice d'abandon navire doit avoir lieu :",opts:["Une fois par an","Tous les mois (SOLAS)","Uniquement au premier embarquement","Jamais en navigation"],correct:1,expl:"SOLAS impose un exercice d'abandon navire mensuel, incluant la verification de l'eclairage de secours et le controle des postes de rassemblement."},
    {q:"La muster list (role d'appel) doit etre affichee :",opts:["Uniquement a la passerelle","Aux postes de travail, cabines et postes de rassemblement","Uniquement en salle des machines","Elle n'est pas obligatoire"],correct:1,expl:"La muster list doit etre affichee aux postes de travail, dans les cabines et aux postes de rassemblement, avec les roles attribues a chaque membre d'equipage."},
    {q:"Dans le cas du RoRo Finnmaster (2021), quel systeme de secours a partiellement echoue a cause d'un flexible defectueux ?",opts:["La barre de secours","Le systeme fixe CO2","L'eclairage de secours","La pompe d'incendie"],correct:1,expl:"Le systeme fixe CO2 ne s'est que partiellement declenche a cause d'un flexible defectueux et de fuites sur le circuit pilote, aggravant la gestion de l'incendie."},
    {q:"Que faut-il verifier avant d'entrer dans un espace ayant recu une decharge de CO2 ?",opts:["Rien, le CO2 se dissipe seul","L'atmosphere avec un detecteur de gaz / oxymetre","La temperature ambiante seulement","La couleur de la fumee"],correct:1,expl:"Un espace noye au CO2 presente un risque d'asphyxie meme apres extinction du feu : un controle d'atmosphere est obligatoire avant toute entree."},
    {q:"Pourquoi tester chaque systeme de secours INDEPENDAMMENT des autres ?",opts:["Pour gagner du temps","Un systeme jamais utilise reellement peut cacher un defaut latent non detecte","Ce n'est pas necessaire si un seul fonctionne","Pour respecter une simple habitude"],correct:1,expl:"Un systeme de secours rarement sollicite en conditions reelles peut presenter un defaut latent (comme le disjoncteur du Finnmaster) qui ne sera revele que lors d'une urgence reelle si les tests independants ne sont pas rigoureux."},
    {q:"Que signifie ESD dans le contexte des systemes d'urgence ?",opts:["Emergency Steering Device","Emergency Shutdown (arret d'urgence a distance)","Engine Speed Detector","External Safety Door"],correct:1,expl:"ESD (Emergency Shutdown) designe les dispositifs d'arret d'urgence a distance permettant de couper carburant, ventilation ou pompes depuis un poste securise en cas d'incendie."},
  ],
  en:[
    {q:"The emergency generator must be located:",opts:["In the main machinery space","In a dedicated space, outside the main machinery space","On the outer hull","In the cargo hold"],correct:1,expl:"The emergency generator occupies a dedicated space, separate from the main machinery space, with direct access from the open deck, so it stays operational even if the machinery space is affected."},
    {q:"How many independent starting means are required for the emergency generator?",opts:["Only one is enough","Two independent means","At least three","No specific requirement"],correct:1,expl:"Two independent starting means (compressed air and/or dedicated batteries) are required to ensure start-up even if one of the two systems fails."},
    {q:"What is the minimum autonomy required for an emergency generator on a cargo ship?",opts:["6 hours","18 hours","36 hours","72 hours"],correct:1,expl:"A cargo ship must have a minimum autonomy of 18 hours on the emergency generator, versus 36 hours for a passenger ship."},
    {q:"The emergency switchboard primarily supplies:",opts:["Passenger entertainment","Emergency lighting, fire pump and communications","The galley","The general air conditioning system"],correct:1,expl:"The emergency switchboard distributes power to vital circuits: emergency lighting, emergency fire pump, radio communications, watertight doors and alarms."},
    {q:"The transitional lighting batteries must supply lighting in under:",opts:["5 seconds","0.5 second","1 minute","45 seconds"],correct:1,expl:"The batteries provide transitional lighting in under 0.5 second, bridging the gap before the emergency generator fully starts (within 45 seconds maximum)."},
    {q:"How often must the emergency generator undergo an on-load test?",opts:["Annually","Monthly","Weekly","There is no mandatory test"],correct:2,expl:"A weekly start and on-load running test is mandatory for the emergency generator, in addition to the monthly full changeover test."},
    {q:"The emergency steering gear must be tested:",opts:["Once a year only","Before every departure","Only after a breakdown","Never if the main system works"],correct:1,expl:"A test of the emergency steering gear is mandatory before every departure, along with verification of communication between the bridge and the steering compartment."},
    {q:"What is the regulatory sound signal for the general alarm?",opts:["3 long blasts","7 short blasts followed by 1 prolonged blast","1 short blast","A continuous 30-second siren"],correct:1,expl:"The regulatory general alarm signal is 7 short blasts followed by 1 prolonged blast, broadcast via whistle and public address system."},
    {q:"Before releasing a fixed CO2 system in an enclosed space, you must:",opts:["Nothing special","Evacuate and headcount all crew present","Only close the windows","Wait for external rescue to arrive"],correct:1,expl:"CO2 displaces oxygen and is lethal: full evacuation with a crew headcount is mandatory before release, preceded by an audible alarm delay."},
    {q:"The abandon ship drill must take place:",opts:["Once a year","Every month (SOLAS)","Only at first embarkation","Never while underway"],correct:1,expl:"SOLAS requires a monthly abandon ship drill, including a check of emergency lighting and muster stations."},
    {q:"The muster list must be displayed:",opts:["Only on the bridge","At work stations, cabins and muster stations","Only in the engine room","It is not mandatory"],correct:1,expl:"The muster list must be displayed at work stations, in cabins and at muster stations, with roles assigned to each crew member."},
    {q:"In the RoRo Finnmaster case (2021), which emergency system partially failed due to a defective hose?",opts:["The emergency steering gear","The fixed CO2 system","The emergency lighting","The fire pump"],correct:1,expl:"The fixed CO2 system only partially discharged due to a defective hose and leaks in the pilot circuit, worsening fire management."},
    {q:"What must be checked before entering a space that has received a CO2 discharge?",opts:["Nothing, CO2 dissipates on its own","The atmosphere with a gas detector / oxygen meter","Only the ambient temperature","The colour of the smoke"],correct:1,expl:"A CO2-flooded space presents an asphyxiation risk even after the fire is out: an atmosphere check is mandatory before any entry."},
    {q:"Why test each emergency system INDEPENDENTLY of the others?",opts:["To save time","A system never used in real conditions can hide an undetected latent fault","It is not necessary if one works","Just to follow habit"],correct:1,expl:"An emergency system rarely used in real conditions can have a latent fault (like the Finnmaster's breaker) that only surfaces during a real emergency if independent tests are not rigorous."},
    {q:"What does ESD mean in the context of emergency systems?",opts:["Emergency Steering Device","Emergency Shutdown (remote emergency stop)","Engine Speed Detector","External Safety Door"],correct:1,expl:"ESD (Emergency Shutdown) refers to remote emergency stop devices that cut fuel, ventilation or pumps from a safe station in case of fire."},
  ],
  es:[
    {q:"El generador de emergencia debe estar situado:",opts:["En la sala de maquinas principal","En un local dedicado, fuera de la sala de maquinas principal","En el casco exterior","En la bodega de carga"],correct:1,expl:"El generador de emergencia ocupa un local dedicado, distinto de la sala de maquinas principal, con acceso directo desde la cubierta expuesta, para seguir operativo aunque esa sala se vea afectada."},
    {q:"Cuantos medios de arranque independientes se exigen para el generador de emergencia?",opts:["Basta con uno","Dos medios independientes","Al menos tres","Sin exigencia particular"],correct:1,expl:"Se exigen dos medios de arranque independientes (aire comprimido y/o baterias dedicadas) para garantizar el arranque aunque uno de los dos sistemas falle."},
    {q:"Cual es la autonomia minima exigida para un generador de emergencia en un buque de carga?",opts:["6 horas","18 horas","36 horas","72 horas"],correct:1,expl:"Un buque de carga debe tener una autonomia minima de 18 horas en el generador de emergencia, frente a 36 horas para un buque de pasajeros."},
    {q:"El cuadro de emergencia alimenta prioritariamente:",opts:["El entretenimiento de pasajeros","El alumbrado de emergencia, la bomba de incendio y las comunicaciones","La cocina","El sistema general de aire acondicionado"],correct:1,expl:"El cuadro de emergencia distribuye energia a los circuitos vitales: alumbrado de emergencia, bomba de incendio de emergencia, radiocomunicaciones, puertas estancas y alarmas."},
    {q:"Las baterias de alumbrado transitorio deben alimentar el alumbrado en menos de:",opts:["5 segundos","0,5 segundos","1 minuto","45 segundos"],correct:1,expl:"Las baterias proporcionan alumbrado transitorio en menos de 0,5 segundos, cubriendo el intervalo antes del arranque completo del generador de emergencia (45 segundos maximo)."},
    {q:"Con que frecuencia debe someterse el generador de emergencia a una prueba en carga?",opts:["Anual","Mensual","Semanal","No hay prueba obligatoria"],correct:2,expl:"Una prueba semanal de arranque y funcionamiento en carga es obligatoria para el generador de emergencia, ademas de la prueba mensual de conmutacion completa."},
    {q:"El gobierno de emergencia debe probarse:",opts:["Solo una vez al ano","Antes de cada zarpe","Solo tras una averia","Nunca si el sistema principal funciona"],correct:1,expl:"Una prueba del gobierno de emergencia es obligatoria antes de cada zarpe, junto con la verificacion de la comunicacion entre el puente y el compartimento del timon."},
    {q:"Cual es la senal sonora reglamentaria de la alarma general?",opts:["3 pitidos largos","7 pitidos cortos seguidos de 1 prolongado","1 pitido corto","Una sirena continua de 30 segundos"],correct:1,expl:"La senal reglamentaria de alarma general son 7 pitidos cortos seguidos de 1 prolongado, difundida por silbato y megafonia."},
    {q:"Antes de activar un sistema fijo de CO2 en un espacio cerrado, hay que:",opts:["Nada especial","Evacuar y contar a toda la tripulacion presente","Solo cerrar las ventanas","Esperar la llegada de rescate externo"],correct:1,expl:"El CO2 desplaza el oxigeno y es letal: es obligatorio evacuar y contar a la tripulacion antes de la descarga, precedido de un retardo de alarma sonora."},
    {q:"El simulacro de abandono del buque debe realizarse:",opts:["Una vez al ano","Cada mes (SOLAS)","Solo en el primer embarque","Nunca durante la navegacion"],correct:1,expl:"El SOLAS exige un simulacro de abandono del buque mensual, que incluye la verificacion del alumbrado de emergencia y los puestos de reunion."},
    {q:"La lista de roles (muster list) debe exponerse:",opts:["Solo en el puente","En puestos de trabajo, camarotes y puestos de reunion","Solo en la sala de maquinas","No es obligatoria"],correct:1,expl:"La lista de roles debe exponerse en los puestos de trabajo, en los camarotes y en los puestos de reunion, con los roles asignados a cada tripulante."},
    {q:"En el caso del RoRo Finnmaster (2021), que sistema de emergencia fallo parcialmente por una manguera defectuosa?",opts:["El gobierno de emergencia","El sistema fijo de CO2","El alumbrado de emergencia","La bomba de incendio"],correct:1,expl:"El sistema fijo de CO2 solo se activo parcialmente por una manguera defectuosa y fugas en el circuito piloto, agravando la gestion del incendio."},
    {q:"Que hay que comprobar antes de entrar en un espacio que ha recibido una descarga de CO2?",opts:["Nada, el CO2 se disipa solo","La atmosfera con un detector de gas / oximetro","Solo la temperatura ambiente","El color del humo"],correct:1,expl:"Un espacio inundado de CO2 presenta riesgo de asfixia incluso despues de apagado el fuego: el control de atmosfera es obligatorio antes de entrar."},
    {q:"Por que probar cada sistema de emergencia de forma INDEPENDIENTE de los demas?",opts:["Para ahorrar tiempo","Un sistema nunca usado en condiciones reales puede ocultar un fallo latente no detectado","No es necesario si uno funciona","Solo por costumbre"],correct:1,expl:"Un sistema de emergencia raramente usado en condiciones reales puede tener un fallo latente (como el disyuntor del Finnmaster) que solo se revela en una emergencia real si las pruebas independientes no son rigurosas."},
    {q:"Que significa ESD en el contexto de los sistemas de emergencia?",opts:["Emergency Steering Device","Emergency Shutdown (parada de emergencia remota)","Engine Speed Detector","External Safety Door"],correct:1,expl:"ESD (Emergency Shutdown) designa los dispositivos de parada de emergencia remota que cortan combustible, ventilacion o bombas desde un puesto seguro en caso de incendio."},
  ],
  pt:[
    {q:"O gerador de emergencia deve estar localizado:",opts:["Na casa de maquinas principal","Num local dedicado, fora da casa de maquinas principal","No casco exterior","No porao de carga"],correct:1,expl:"O gerador de emergencia ocupa um local dedicado, distinto da casa de maquinas principal, com acesso direto a partir do convés exposto, para permanecer operacional mesmo se essa area for afetada."},
    {q:"Quantos meios de arranque independentes sao exigidos para o gerador de emergencia?",opts:["Apenas um basta","Dois meios independentes","No minimo tres","Sem exigencia particular"],correct:1,expl:"Sao exigidos dois meios de arranque independentes (ar comprimido e/ou baterias dedicadas) para garantir o arranque mesmo se um dos dois sistemas falhar."},
    {q:"Qual e a autonomia minima exigida para um gerador de emergencia num navio de carga?",opts:["6 horas","18 horas","36 horas","72 horas"],correct:1,expl:"Um navio de carga deve ter uma autonomia minima de 18 horas no gerador de emergencia, contra 36 horas para um navio de passageiros."},
    {q:"O quadro de emergencia alimenta prioritariamente:",opts:["O entretenimento dos passageiros","A iluminacao de emergencia, a bomba de incendio e as comunicacoes","A cozinha","O sistema geral de ar condicionado"],correct:1,expl:"O quadro de emergencia distribui energia aos circuitos vitais: iluminacao de emergencia, bomba de incendio de emergencia, radiocomunicacoes, portas estanques e alarmes."},
    {q:"As baterias de iluminacao transitoria devem alimentar a iluminacao em menos de:",opts:["5 segundos","0,5 segundos","1 minuto","45 segundos"],correct:1,expl:"As baterias fornecem iluminacao transitoria em menos de 0,5 segundos, cobrindo o intervalo antes do arranque completo do gerador de emergencia (45 segundos maximo)."},
    {q:"Com que frequencia o gerador de emergencia deve passar por um teste em carga?",opts:["Anual","Mensal","Semanal","Nao ha teste obrigatorio"],correct:2,expl:"Um teste semanal de arranque e funcionamento em carga e obrigatorio para o gerador de emergencia, alem do teste mensal de comutacao completa."},
    {q:"O governo de emergencia deve ser testado:",opts:["Apenas uma vez por ano","Antes de cada partida","Apenas apos uma avaria","Nunca se o sistema principal funcionar"],correct:1,expl:"Um teste do governo de emergencia e obrigatorio antes de cada partida, juntamente com a verificacao da comunicacao entre o passadico e o compartimento do leme."},
    {q:"Qual e o sinal sonoro regulamentar do alarme geral?",opts:["3 toques longos","7 toques curtos seguidos de 1 prolongado","1 toque curto","Uma sirene continua de 30 segundos"],correct:1,expl:"O sinal regulamentar de alarme geral e 7 toques curtos seguidos de 1 prolongado, difundido por apito e sistema de megafonia."},
    {q:"Antes de acionar um sistema fixo de CO2 num espaco fechado, e preciso:",opts:["Nada de especial","Evacuar e contar toda a tripulacao presente","Apenas fechar as janelas","Esperar a chegada de socorro externo"],correct:1,expl:"O CO2 desloca o oxigenio e e letal: e obrigatorio evacuar e contar a tripulacao antes da descarga, precedido de um atraso de alarme sonoro."},
    {q:"O exercicio de abandono do navio deve ocorrer:",opts:["Uma vez por ano","Todos os meses (SOLAS)","Apenas no primeiro embarque","Nunca durante a navegacao"],correct:1,expl:"O SOLAS exige um exercicio de abandono do navio mensal, incluindo a verificacao da iluminacao de emergencia e dos postos de reuniao."},
    {q:"A lista de chamada (muster list) deve ser exposta:",opts:["Apenas no passadico","Nos postos de trabalho, cabines e postos de reuniao","Apenas na casa de maquinas","Nao e obrigatoria"],correct:1,expl:"A lista de chamada deve ser exposta nos postos de trabalho, nas cabines e nos postos de reuniao, com as funcoes atribuidas a cada membro da tripulacao."},
    {q:"No caso do RoRo Finnmaster (2021), qual sistema de emergencia falhou parcialmente devido a uma mangueira defeituosa?",opts:["O governo de emergencia","O sistema fixo de CO2","A iluminacao de emergencia","A bomba de incendio"],correct:1,expl:"O sistema fixo de CO2 apenas descarregou parcialmente devido a uma mangueira defeituosa e vazamentos no circuito piloto, agravando a gestao do incendio."},
    {q:"O que e preciso verificar antes de entrar num espaco que recebeu uma descarga de CO2?",opts:["Nada, o CO2 se dissipa sozinho","A atmosfera com detector de gas / oximetro","Apenas a temperatura ambiente","A cor da fumaca"],correct:1,expl:"Um espaco inundado de CO2 apresenta risco de asfixia mesmo apos o fogo apagado: a verificacao da atmosfera e obrigatoria antes de entrar."},
    {q:"Por que testar cada sistema de emergencia de forma INDEPENDENTE dos outros?",opts:["Para ganhar tempo","Um sistema nunca usado em condicoes reais pode esconder uma falha latente nao detectada","Nao e necessario se um funcionar","Apenas por habito"],correct:1,expl:"Um sistema de emergencia raramente usado em condicoes reais pode ter uma falha latente (como o disjuntor do Finnmaster) que so se revela numa emergencia real se os testes independentes nao forem rigorosos."},
    {q:"O que significa ESD no contexto dos sistemas de emergencia?",opts:["Emergency Steering Device","Emergency Shutdown (parada de emergencia remota)","Engine Speed Detector","External Safety Door"],correct:1,expl:"ESD (Emergency Shutdown) designa os dispositivos de parada de emergencia remota que cortam combustivel, ventilacao ou bombas a partir de um posto seguro em caso de incendio."},
  ],
};

function QuestionBank({ lang }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.en;const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else setDone(true);};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,margin:"8px 0 4px"}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
    <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.ember},${C.amber})`}}/></div>
    <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
      {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:11,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4,fontFamily:"'Courier New',monospace"}}>{opt}</button>;})}
    </div>
    {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
    <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.ember},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PROXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
  </div>);
}

function Stars(){const s=Array.from({length:10},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.3}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.ember}33,${C.steel2}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"6px 16px",borderRadius:20,background:`${C.ember}15`,border:`1px solid ${C.ember}44`,fontSize:14,color:C.ember,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.ember}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.ember,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.ember:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4,fontFamily:"'Courier New',monospace"}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white,fontFamily:"'Nunito',sans-serif"}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.ember},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d={
    en:{
      badge:"🚨 Module E2 — Auxiliary Systems & Electricity · Lesson 7/7 · ⭐ Premium · 200 XP",
      title:"Emergency Systems",
      intro:"Emergency systems are the last line of defence when the main power, propulsion or fire fighting systems fail. Every engineer must know the emergency generator and switchboard, the key emergency systems, their applications on board, and the critical safety rules for testing and maintenance.",
      p1:"PART 1 - EMERGENCY POWER GENERATION",s1t:"Generator -> Switchboard -> Batteries -> Automatic start",
      s1:"POWER CHAIN:\n\nBATTERIES: transitional lighting in under 0.5s\n↓\nGENERATOR: automatic start in under 45s\n↓\nSWITCHBOARD: automatic changeover\n↓\nVITAL CIRCUITS: lighting, fire pump, radio, alarms\n\nAUTONOMY:\n36h (passenger) or 18h (cargo)\ndedicated, isolated fuel tank",
      p2:"PART 2 - EMERGENCY SYSTEMS COMPARISON",s1t:"Fire pump · Steering · Lighting · Fixed CO2",
      s2:"KEY PROPERTIES:\n\nFIRE PUMP: outside machinery space · weekly test\nSTEERING GEAR: local control · tested before departure\nLIGHTING: two stages, batteries then generator\nFIXED CO2: full evacuation required before release\n\nMOST CRITICAL: fire pump and CO2 system\nMOST TESTED: fire pump (weekly)",
      p3:"PART 3 - EMERGENCY APPLICATIONS",s1t:"Fire fighting · Emergency navigation · General alarm",
      s3:"FIRE FIGHTING:\n→ Emergency fire pump, fixed CO2, fire dampers, ESD\n\nEMERGENCY NAVIGATION:\n→ Emergency steering, emergency radio/GPS, EPIRB\n\nGENERAL ALARM:\n→ 7 short + 1 prolonged blast, muster list, monthly drills",
      p4:"PART 4 - INSPECTION & SAFETY",s1t:"Regulatory tests · Maintenance · Cascading failure",
      s4:"REGULATORY TESTS:\n→ Weekly: generator on-load, fire pump pressure\n→ Monthly: full changeover, abandon ship drill\n→ Before departure: steering gear\n\nMAINTENANCE:\n→ Fuel, starting means, batteries, dampers, detectors\n\nCASCADING FAILURE:\n→ RoRo Finnmaster (2021): faulty breaker + partial CO2\n   discharge + failed UHF radios during a real fire\n→ Test every emergency system INDEPENDENTLY",
      p5:"🎯 EXERCISES",p6:"📝 QUESTION BANK - 15 QUESTIONS",
      sumT:"SUMMARY - EMERGENCY SYSTEMS L7",
      sumP:["Emergency generator: dedicated space, automatic start under 45s, two starting means","Autonomy: 36h (passenger) or 18h (cargo), dedicated fuel tank","Emergency switchboard supplies lighting, fire pump, radio, alarms, doors","Transitional batteries cover lighting in under 0.5s before the generator starts","Emergency fire pump must be outside the main machinery space","General alarm: 7 short blasts + 1 prolonged blast","Fixed CO2: full evacuation and headcount mandatory before release","Test every emergency system independently: a single fault can neutralise the whole chain (Finnmaster case)"],
      learnedP:["Emergency power chain: batteries · generator · switchboard · vital circuits","4 key emergency systems: fire pump · steering · lighting · fixed CO2","Applications: fire fighting · emergency navigation · general alarm","Regulatory test schedule and maintenance routine","Cascading failure risk and the RoRo Finnmaster case"],
    },
    fr:{
      badge:"🚨 Module E2 — Auxiliaires & Électricité · Leçon 7/7 · ⭐ Premium · 200 XP",
      title:"Systemes d'urgence",
      intro:"Les systemes d'urgence sont la derniere ligne de defense lorsque l'alimentation principale, la propulsion ou la lutte incendie sont perdues. Tout mecanicien doit connaitre le generateur et le tableau de secours, les systemes d'urgence cles, leurs applications a bord et les regles de securite critiques pour les tests et l'entretien.",
      p1:"PARTIE 1 - GENERATION DE SECOURS",s1t:"Generateur -> Tableau -> Batteries -> Demarrage automatique",
      s1:"CHAINE D'ALIMENTATION :\n\nBATTERIES : eclairage transitoire en moins de 0,5s\n↓\nGENERATEUR : demarrage automatique en moins de 45s\n↓\nTABLEAU : basculement automatique\n↓\nCIRCUITS VITAUX : eclairage, pompe incendie, radio, alarmes\n\nAUTONOMIE :\n36h (passagers) ou 18h (cargo)\nreservoir dedie et isole",
      p2:"PARTIE 2 - COMPARAISON DES SYSTEMES DE SECOURS",s1t:"Pompe incendie · Barre · Eclairage · CO2 fixe",
      s2:"PROPRIETES CLES :\n\nPOMPE INCENDIE : hors local machine · test hebdomadaire\nBARRE DE SECOURS : commande locale · testee avant appareillage\nECLAIRAGE : deux etapes, batteries puis generateur\nCO2 FIXE : evacuation totale exigee avant declenchement\n\nPLUS CRITIQUES : pompe incendie et systeme CO2\nPLUS TESTE : pompe incendie (hebdomadaire)",
      p3:"PARTIE 3 - APPLICATIONS D'URGENCE",s1t:"Lutte incendie · Navigation d'urgence · Alarme generale",
      s3:"LUTTE INCENDIE :\n→ Pompe incendie de secours, CO2 fixe, vannes coupe-feu, ESD\n\nNAVIGATION D'URGENCE :\n→ Barre de secours, radio/GPS de secours, EPIRB\n\nALARME GENERALE :\n→ 7 coups brefs + 1 prolonge, muster list, exercices mensuels",
      p4:"PARTIE 4 - INSPECTION & SECURITE",s1t:"Tests reglementaires · Entretien · Defaillance en cascade",
      s4:"TESTS REGLEMENTAIRES :\n→ Hebdomadaire : generateur en charge, pression pompe incendie\n→ Mensuel : basculement complet, exercice d'abandon navire\n→ Avant appareillage : barre de secours\n\nENTRETIEN :\n→ Carburant, moyens de demarrage, batteries, vannes, detecteurs\n\nDEFAILLANCE EN CASCADE :\n→ RoRo Finnmaster (2021) : disjoncteur defectueux + CO2\n   partiellement declenche + radios UHF en panne pendant\n   un incendie reel\n→ Tester chaque systeme de secours INDEPENDAMMENT",
      p5:"🎯 EXERCICES",p6:"📝 BANQUE 15 QUESTIONS",
      sumT:"RESUME - SYSTEMES D'URGENCE L7",
      sumP:["Generateur de secours : local dedie, demarrage automatique en moins de 45s, deux moyens de demarrage","Autonomie : 36h (passagers) ou 18h (cargo), reservoir dedie","Tableau de secours alimente eclairage, pompe incendie, radio, alarmes, portes","Batteries transitoires couvrent l'eclairage en moins de 0,5s avant le generateur","Pompe d'incendie de secours obligatoirement hors local machine principal","Alarme generale : 7 coups brefs + 1 coup prolonge","CO2 fixe : evacuation totale et comptage obligatoires avant declenchement","Tester chaque systeme de secours independamment : un seul defaut peut neutraliser toute la chaine (cas Finnmaster)"],
      learnedP:["Chaine de secours electrique : batteries · generateur · tableau · circuits vitaux","4 systemes d'urgence cles : pompe incendie · barre · eclairage · CO2 fixe","Applications : lutte incendie · navigation d'urgence · alarme generale","Calendrier de tests reglementaires et routine d'entretien","Risque de defaillance en cascade et le cas du RoRo Finnmaster"],
    },
    es:{
      badge:"🚨 Módulo E2 — Auxiliares y Electricidad · Lección 7/7 · ⭐ Premium · 200 XP",
      title:"Sistemas de emergencia",
      intro:"Los sistemas de emergencia son la ultima linea de defensa cuando falla la alimentacion principal, la propulsion o la lucha contraincendios. Todo mecanico debe conocer el generador y el cuadro de emergencia, los sistemas de emergencia clave, sus aplicaciones a bordo y las reglas de seguridad criticas para las pruebas y el mantenimiento.",
      p1:"PARTE 1 - GENERACION DE EMERGENCIA",s1t:"Generador -> Cuadro -> Baterias -> Arranque automatico",
      s1:"CADENA DE ALIMENTACION:\n\nBATERIAS: alumbrado transitorio en menos de 0,5s\n↓\nGENERADOR: arranque automatico en menos de 45s\n↓\nCUADRO: conmutacion automatica\n↓\nCIRCUITOS VITALES: alumbrado, bomba incendio, radio, alarmas\n\nAUTONOMIA:\n36h (pasajeros) o 18h (carga)\ntanque dedicado y aislado",
      p2:"PARTE 2 - COMPARACION DE SISTEMAS DE EMERGENCIA",s1t:"Bomba incendio · Gobierno · Alumbrado · CO2 fijo",
      s2:"PROPIEDADES CLAVE:\n\nBOMBA INCENDIO: fuera de sala de maquinas · prueba semanal\nGOBIERNO DE EMERGENCIA: control local · probado antes de zarpar\nALUMBRADO: dos etapas, baterias y luego generador\nCO2 FIJO: evacuacion total exigida antes de la descarga\n\nMAS CRITICOS: bomba de incendio y sistema CO2\nMAS PROBADO: bomba de incendio (semanal)",
      p3:"PARTE 3 - APLICACIONES DE EMERGENCIA",s1t:"Lucha contraincendios · Navegacion de emergencia · Alarma general",
      s3:"LUCHA CONTRAINCENDIOS:\n→ Bomba de incendio de emergencia, CO2 fijo, valvulas cortafuego, ESD\n\nNAVEGACION DE EMERGENCIA:\n→ Gobierno de emergencia, radio/GPS de emergencia, EPIRB\n\nALARMA GENERAL:\n→ 7 pitidos cortos + 1 prolongado, lista de roles, simulacros mensuales",
      p4:"PARTE 4 - INSPECCION Y SEGURIDAD",s1t:"Pruebas reglamentarias · Mantenimiento · Fallo en cascada",
      s4:"PRUEBAS REGLAMENTARIAS:\n→ Semanal: generador en carga, presion bomba incendio\n→ Mensual: conmutacion completa, simulacro de abandono\n→ Antes de zarpar: gobierno de emergencia\n\nMANTENIMIENTO:\n→ Combustible, medios de arranque, baterias, valvulas, detectores\n\nFALLO EN CASCADA:\n→ RoRo Finnmaster (2021): disyuntor defectuoso + CO2\n   parcialmente activado + radios UHF averiadas durante\n   un incendio real\n→ Probar cada sistema de emergencia INDEPENDIENTEMENTE",
      p5:"🎯 EJERCICIOS",p6:"📝 BANCO 15 PREGUNTAS",
      sumT:"RESUMEN - SISTEMAS DE EMERGENCIA L7",
      sumP:["Generador de emergencia: local dedicado, arranque automatico en menos de 45s, dos medios de arranque","Autonomia: 36h (pasajeros) o 18h (carga), tanque dedicado","El cuadro de emergencia alimenta alumbrado, bomba incendio, radio, alarmas, puertas","Baterias transitorias cubren el alumbrado en menos de 0,5s antes del generador","Bomba de incendio de emergencia obligatoriamente fuera de la sala de maquinas principal","Alarma general: 7 pitidos cortos + 1 pitido prolongado","CO2 fijo: evacuacion total y recuento obligatorios antes de la descarga","Probar cada sistema de emergencia de forma independiente: un solo fallo puede neutralizar toda la cadena (caso Finnmaster)"],
      learnedP:["Cadena de emergencia electrica: baterias · generador · cuadro · circuitos vitales","4 sistemas de emergencia clave: bomba incendio · gobierno · alumbrado · CO2 fijo","Aplicaciones: lucha contraincendios · navegacion de emergencia · alarma general","Calendario de pruebas reglamentarias y rutina de mantenimiento","Riesgo de fallo en cascada y el caso del RoRo Finnmaster"],
    },
    pt:{
      badge:"🚨 Módulo E2 — Auxiliares e Eletricidade · Lição 7/7 · ⭐ Premium · 200 XP",
      title:"Sistemas de emergencia",
      intro:"Os sistemas de emergencia sao a ultima linha de defesa quando a alimentacao principal, a propulsao ou o combate a incendio falham. Todo mecanico deve conhecer o gerador e o quadro de emergencia, os sistemas de emergencia chave, as suas aplicacoes a bordo e as regras de seguranca criticas para os testes e a manutencao.",
      p1:"PARTE 1 - GERACAO DE EMERGENCIA",s1t:"Gerador -> Quadro -> Baterias -> Arranque automatico",
      s1:"CADEIA DE ALIMENTACAO:\n\nBATERIAS: iluminacao transitoria em menos de 0,5s\n↓\nGERADOR: arranque automatico em menos de 45s\n↓\nQUADRO: comutacao automatica\n↓\nCIRCUITOS VITAIS: iluminacao, bomba incendio, radio, alarmes\n\nAUTONOMIA:\n36h (passageiros) ou 18h (carga)\ntanque dedicado e isolado",
      p2:"PARTE 2 - COMPARACAO DE SISTEMAS DE EMERGENCIA",s1t:"Bomba incendio · Governo · Iluminacao · CO2 fixo",
      s2:"PROPRIEDADES CHAVE:\n\nBOMBA INCENDIO: fora da casa de maquinas · teste semanal\nGOVERNO DE EMERGENCIA: controlo local · testado antes de partir\nILUMINACAO: duas etapas, baterias e depois gerador\nCO2 FIXO: evacuacao total exigida antes da descarga\n\nMAIS CRITICOS: bomba de incendio e sistema CO2\nMAIS TESTADO: bomba de incendio (semanal)",
      p3:"PARTE 3 - APLICACOES DE EMERGENCIA",s1t:"Combate a incendio · Navegacao de emergencia · Alarme geral",
      s3:"COMBATE A INCENDIO:\n→ Bomba de incendio de emergencia, CO2 fixo, valvulas corta-fogo, ESD\n\nNAVEGACAO DE EMERGENCIA:\n→ Governo de emergencia, radio/GPS de emergencia, EPIRB\n\nALARME GERAL:\n→ 7 toques curtos + 1 prolongado, lista de chamada, exercicios mensais",
      p4:"PARTE 4 - INSPECAO E SEGURANCA",s1t:"Testes regulamentares · Manutencao · Falha em cascata",
      s4:"TESTES REGULAMENTARES:\n→ Semanal: gerador em carga, pressao bomba incendio\n→ Mensal: comutacao completa, exercicio de abandono\n→ Antes de partir: governo de emergencia\n\nMANUTENCAO:\n→ Combustivel, meios de arranque, baterias, valvulas, detectores\n\nFALHA EM CASCATA:\n→ RoRo Finnmaster (2021): disjuntor defeituoso + CO2\n   parcialmente descarregado + radios UHF avariados durante\n   um incendio real\n→ Testar cada sistema de emergencia INDEPENDENTEMENTE",
      p5:"🎯 EXERCICIOS",p6:"📝 BANCO 15 PERGUNTAS",
      sumT:"RESUMO - SISTEMAS DE EMERGENCIA L7",
      sumP:["Gerador de emergencia: local dedicado, arranque automatico em menos de 45s, dois meios de arranque","Autonomia: 36h (passageiros) ou 18h (carga), tanque dedicado","O quadro de emergencia alimenta iluminacao, bomba incendio, radio, alarmes, portas","Baterias transitorias cobrem a iluminacao em menos de 0,5s antes do gerador","Bomba de incendio de emergencia obrigatoriamente fora da casa de maquinas principal","Alarme geral: 7 toques curtos + 1 toque prolongado","CO2 fixo: evacuacao total e contagem obrigatorias antes da descarga","Testar cada sistema de emergencia de forma independente: uma unica falha pode neutralizar toda a cadeia (caso Finnmaster)"],
      learnedP:["Cadeia de emergencia eletrica: baterias · gerador · quadro · circuitos vitais","4 sistemas de emergencia chave: bomba incendio · governo · iluminacao · CO2 fixo","Aplicacoes: combate a incendio · navegacao de emergencia · alarme geral","Calendario de testes regulamentares e rotina de manutencao","Risco de falha em cascata e o caso do RoRo Finnmaster"],
    },
  };
  return d[lang]||d.en;
};

export default function LessonE2_L7({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
  const t=T[lang]||T.en;const quiz=QUIZ[lang]||QUIZ.en;const lc=getContent(lang);
  const [phase,setPhase]=useState("content");const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#0a0605 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.ember}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.ember,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🚨 {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Lecon 7/7":lang==="en"?"Lesson 7/7":lang==="es"?"Leccion 7/7":"Licao 7/7"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.ember,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.ember},${C.amber},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:`${C.ember}15`,border:`1px solid ${C.ember}44`,fontSize:11,color:C.ember,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.ember}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>
            <SL icon="🔌" text={lc.p1} color={C.ember}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,background:"rgba(10,6,5,0.7)",border:`1px solid ${C.ember}22`}}>
              <div style={{fontSize:11,color:C.ember,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔌 {lang==="fr"?"GENERATION DE SECOURS":lang==="en"?"EMERGENCY POWER":lang==="es"?"ENERGIA DE EMERGENCIA":"ENERGIA DE EMERGENCIA"}</div>
              <EmergencyPowerSVG lang={lang}/>
            </Card>
            <SL icon="🧯" text={lc.p2} color={C.steel2}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.steel2}22`}}>
              <div style={{fontSize:11,color:C.steel2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🧯 {lang==="fr"?"COMPARAISON DES SYSTEMES DE SECOURS":lang==="en"?"EMERGENCY SYSTEMS COMPARISON":lang==="es"?"COMPARACION DE SISTEMAS DE EMERGENCIA":"COMPARACAO DE SISTEMAS DE EMERGENCIA"}</div>
              <EmergencySystemsSVG lang={lang}/>
            </Card>
            <SL icon="🔗" text={lc.p3} color={C.amber}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.amber}22`}}>
              <div style={{fontSize:11,color:C.amber,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔗 {lang==="fr"?"APPLICATIONS D'URGENCE":lang==="en"?"EMERGENCY APPLICATIONS":lang==="es"?"APLICACIONES DE EMERGENCIA":"APLICACOES DE EMERGENCIA"}</div>
              <EmergencyApplicationsSVG lang={lang}/>
            </Card>
            <SL icon="🔧" text={lc.p4} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}22`}}>
              <div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔧 {lang==="fr"?"INSPECTION & SECURITE":lang==="en"?"INSPECTION & SAFETY":lang==="es"?"INSPECCION Y SEGURIDAD":"INSPECAO E SEGURANCA"}</div>
              <EmergencyInspectionSVG lang={lang}/>
            </Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}44`,background:"linear-gradient(135deg,rgba(192,57,43,0.08),rgba(13,31,60,0.8))"}}><AccidentCase lang={lang}/></Card>
            <SL icon="📝" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>
            <SL icon="📚" text={lc.p6} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang}/></Card>
            <Card style={{marginBottom:14,background:`${C.ember}08`,border:`1px solid ${C.ember}22`}}>
              <div style={{fontSize:11,color:C.ember,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:11,color:C.white}}><span style={{color:C.ember,fontWeight:700,fontFamily:"'Courier New',monospace"}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.ember},${C.amber},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer",boxShadow:`0 10px 36px ${C.ember}33`,marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>Quiz - Emergency Systems</div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Lecon 7":lang==="en"?"Lesson 7":lang==="es"?"Leccion 7":"Licao 7"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}
          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:`${C.ember}15`,border:`1px solid ${C.ember}55`,fontSize:14,color:C.ember,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.ember,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <div style={{textAlign:"center",fontSize:12,color:C.gold2,marginBottom:12,fontFamily:"'Cinzel',serif"}}>
              {lang==="fr"?"🎉 MODULE ENGINE E2 TERMINE !":lang==="en"?"🎉 ENGINE MODULE E2 COMPLETE!":lang==="es"?"🎉 ¡MODULO ENGINE E2 COMPLETADO!":"🎉 MODULO ENGINE E2 CONCLUIDO!"}
            </div>
            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.ember},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer",boxShadow:`0 8px 28px ${C.ember}33`,marginBottom:10}}>
              {lang==="fr"?"MODULE E3 - CHAUDIERES & VAPEUR →":lang==="en"?"MODULE E3 - BOILERS & STEAM →":lang==="es"?"MODULO E3 - CALDERAS Y VAPOR →":"MODULO E3 - CALDEIRAS E VAPOR →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:"1px solid rgba(255,255,255,0.15)",borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
