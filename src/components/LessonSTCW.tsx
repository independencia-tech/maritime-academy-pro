// @ts-nocheck
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
  fr:{ back:"◀ Retour", module:"Droit Maritime Int.", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Int. Maritime Law", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Derecho Marítimo Int.", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Direito Marítimo Int.", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 — STCW TIMELINE
// ══════════════════════════════════════
function STCWTimelineSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const events = [
    { year:"1978", icon:"📜", color:C.orange,
      label:{fr:"STCW original",en:"Original STCW",es:"STCW original",pt:"STCW original"},
      desc:{fr:"Convention STCW adoptée à Londres · 7 juillet 1978\nEntrée en vigueur : 28 avril 1984\nPremière convention internationale sur la formation des marins\nObjectif : harmoniser les certifications nationales\nLimites : trop vague · pas d'exigences précises\nSurnommée 'Convention des louveteaux' (trop permissive)",en:"STCW Convention adopted in London · July 7, 1978\nEntry into force: April 28, 1984\nFirst international convention on seafarer training\nObjective: harmonize national certifications\nLimitations: too vague · no precise requirements\nNicknamed 'Convention of loopholes' (too permissive)",es:"Convenio STCW adoptado en Londres · 7 julio 1978\nEntrada en vigor: 28 abril 1984\nPrimer convenio internacional sobre formación de gente de mar\nObjetivo: armonizar las certificaciones nacionales\nLimitaciones: demasiado vago · sin requisitos precisos",pt:"Convenção STCW adotada em Londres · 7 julho 1978\nEntrada em vigor: 28 abril 1984\nPrimeira convenção internacional sobre formação de marítimos\nObjetivo: harmonizar as certificações nacionais\nLimitações: demasiado vaga · sem requisitos precisos"}},
    { year:"1995", icon:"🔧", color:C.blue2,
      label:{fr:"Révision majeure",en:"Major revision",es:"Revisión mayor",pt:"Revisão maior"},
      desc:{fr:"Révision majeure de 1995 — entrée en vigueur 1er février 1997\nIntroduction du Code STCW (Partie A obligatoire · Partie B recommandée)\nExigences précises pour chaque certification\nObligation de 'whitelist' des États conformes\nBase de données des gens de mer\nTransition : période de 5 ans pour mise en conformité",en:"Major 1995 revision — entry into force February 1, 1997\nIntroduction of STCW Code (Part A mandatory · Part B recommended)\nPrecise requirements for each certification\nMandatory 'whitelist' of compliant states\nSeafarer database\nTransition: 5-year compliance period",es:"Revisión mayor de 1995 — entrada en vigor 1 febrero 1997\nIntroducción del Código STCW (Parte A obligatoria · Parte B recomendada)\nRequisitos precisos para cada certificación\nObligación de 'lista blanca' de Estados conformes\nBase de datos de gente de mar\nTransición: período de 5 años para el cumplimiento",pt:"Revisão maior de 1995 — entrada em vigor 1 fevereiro 1997\nIntrodução do Código STCW (Parte A obrigatória · Parte B recomendada)\nRequisitos precisos para cada certificação\nObrigação de 'lista branca' dos Estados conformes\nBase de dados de marítimos\nTransição: período de 5 anos para conformidade"}},
    { year:"2010", icon:"🌟", color:C.gold2,
      label:{fr:"Amendements Manille",en:"Manila Amendments",es:"Enmiendas de Manila",pt:"Emendas de Manila"},
      desc:{fr:"Amendements de Manille — 2010 — entrée en vigueur 1er janvier 2012\nMise à jour majeure la plus complète depuis 1995\nNouvelles compétences : leadership, travail d'équipe\nMLC 2006 intégré (heures repos)\nFormation sécurité renforcée (piraterie · sûreté)\nNouveaux certificats : Electro-Technical Officer (ETO)\nExtension : personnel de base formation sécurité\nApplication 'whitelist' OMI renforcée",en:"Manila Amendments — 2010 — entry into force January 1, 2012\nMost comprehensive major update since 1995\nNew competencies: leadership, teamwork\nMLC 2006 integrated (rest hours)\nEnhanced safety training (piracy · security)\nNew certificates: Electro-Technical Officer (ETO)\nExtension: basic personnel security training\nStrengthened IMO 'whitelist' application",es:"Enmiendas de Manila — 2010 — entrada en vigor 1 enero 2012\nActualización más completa desde 1995\nNuevas competencias: liderazgo, trabajo en equipo\nMLC 2006 integrado (horas de descanso)\nFormación de seguridad reforzada (piratería · protección)\nNuevos certificados: Oficial Electrotécnico (ETO)\nAplicación reforzada 'lista blanca' OMI",pt:"Emendas de Manila — 2010 — entrada em vigor 1 janeiro 2012\nAtualização mais abrangente desde 1995\nNovas competências: liderança, trabalho de equipa\nMLC 2006 integrado (horas de descanso)\nFormação de segurança reforçada (pirataria · proteção)\nNovos certificados: Oficial Electrotécnico (ETO)\nAplicação reforçada 'lista branca' IMO"}},
    { year:"2017", icon:"⚓", color:C.teal,
      label:{fr:"Amendements Polaires",en:"Polar Amendments",es:"Enmiendas Polares",pt:"Emendas Polares"},
      desc:{fr:"Code Polaire STCW — en vigueur 2017\nFormation obligatoire pour navigation en eaux polaires\nCertificat Basic Polar / Advanced Polar\nCompétences : survie en conditions arctiques\nNavigation sur glace · procédures urgence polaire\nObligatoire pour navires > 500 TB en eaux polaires\nCode Polaire OMI (SOLAS + MARPOL aussi)",en:"Polar STCW Code — in force 2017\nMandatory training for polar water navigation\nBasic Polar / Advanced Polar certificate\nCompetencies: survival in arctic conditions\nIce navigation · polar emergency procedures\nMandatory for vessels > 500 GT in polar waters\nIMO Polar Code (SOLAS + MARPOL also)",es:"Código STCW Polar — en vigor 2017\nFormación obligatoria para la navegación en aguas polares\nCertificado Polar Básico / Polar Avanzado\nCompetencias: supervivencia en condiciones árticas\nNavegación en hielo · procedimientos de emergencia polar\nObligatorio para buques > 500 TB en aguas polares",pt:"Código STCW Polar — em vigor 2017\nFormação obrigatória para navegação em águas polares\nCertificado Polar Básico / Polar Avançado\nCompetências: sobrevivência em condições árticas\nNavegação no gelo · procedimentos de emergência polar\nObrigatório para navios > 500 AB em águas polares"}},
    { year:"2024", icon:"🚀", color:C.green,
      label:{fr:"STCW Aujourd'hui",en:"STCW Today",es:"STCW Hoy",pt:"STCW Hoje"},
      desc:{fr:"163 États contractants STCW\nWhitelist OMI : 164 États reconnus conformes\n1,6 million de marins certifiés STCW dans le monde\nNouveaux défis : navires autonomes · cyber · décarbonation\nRévision en cours : compétences IA et digital\nMLC 2006 = partie intégrante de STCW\nValidité certificats : 5 ans (renouvellement formation)\nRevalidation obligatoire si inactivité > 5 ans",en:"163 STCW contracting states\nIMO whitelist: 164 states recognized as compliant\n1.6 million STCW-certified seafarers worldwide\nNew challenges: autonomous vessels · cyber · decarbonization\nOngoing revision: AI and digital competencies\nMLC 2006 = integral part of STCW\nCertificate validity: 5 years (training renewal)\nMandatory revalidation if inactive > 5 years",es:"163 estados contratantes STCW\nLista blanca OMI: 164 estados reconocidos conformes\n1,6 millones de marineros certificados STCW en el mundo\nNuevos desafíos: buques autónomos · ciberseguridad · descarbonización\nRevisión en curso: competencias IA y digital\nValidez certificados: 5 años (renovación formación)",pt:"163 estados contratantes STCW\nLista branca IMO: 164 estados reconhecidos conformes\n1,6 milhões de marítimos certificados STCW no mundo\nNovos desafios: navios autónomos · ciber · descarbonização\nRevisão em curso: competências IA e digital\nValidade certificados: 5 anos (renovação formação)"}},
  ];
  return (
    <div>
      <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
        {events.map((e,i)=>(
          <button key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            flex:"1 1 28%",padding:"8px 4px",borderRadius:10,cursor:"pointer",textAlign:"center",
            background:sel===i?`${e.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${sel===i?e.color:"rgba(255,255,255,0.08)"}`,
          }}>
            <div style={{fontSize:16}}>{e.icon}</div>
            <div style={{fontSize:9,color:sel===i?e.color:C.muted,fontWeight:700,marginTop:2}}>{e.year}</div>
            <div style={{fontSize:7,color:sel===i?e.color:C.muted,lineHeight:1.2}}>{(e.label[lang]||e.label.fr).split(' ').slice(0,2).join(' ')}</div>
          </button>
        ))}
      </div>
      {sel!==null&&<div style={{padding:"12px",borderRadius:14,background:`${events[sel].color}15`,border:`1px solid ${events[sel].color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:events[sel].color,marginBottom:6}}>{events[sel].icon} {events[sel].year} — {events[sel].label[lang]||events[sel].label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>{events[sel].desc[lang]||events[sel].desc.fr}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — STCW CERTIFICATES TREE
// ══════════════════════════════════════
function CertTreeSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const certs = [
    { id:"bst", icon:"🔰", color:C.green,
      label:{fr:"BST — Formation de Base",en:"BST — Basic Safety Training",es:"BST — Formación Básica",pt:"BST — Formação Básica"},
      who:{fr:"TOUS les marins sans exception",en:"ALL seafarers without exception",es:"TODOS los marineros sin excepción",pt:"TODOS os marítimos sem exceção"},
      content:{fr:"4 modules obligatoires :\n1. Techniques personnelles de survie\n2. Lutte contre l'incendie et prévention\n3. Premiers secours élémentaires\n4. Sécurité individuelle et responsabilités sociales\n\nValidité : 5 ans · Revalidation obligatoire\nFormation pratique + théorique\nCertificat de base obligatoire AVANT d'embarquer",en:"4 mandatory modules:\n1. Personal survival techniques\n2. Fire fighting and fire prevention\n3. Elementary first aid\n4. Personal safety and social responsibilities\n\nValidity: 5 years · Mandatory revalidation\nPractical + theoretical training\nBasic certificate mandatory BEFORE embarking",es:"4 módulos obligatorios:\n1. Técnicas personales de supervivencia\n2. Lucha contra incendios y prevención\n3. Primeros auxilios elementales\n4. Seguridad individual y responsabilidades sociales\n\nValidez: 5 años · Revalidación obligatoria",pt:"4 módulos obrigatórios:\n1. Técnicas pessoais de sobrevivência\n2. Combate a incêndios e prevenção\n3. Primeiros socorros elementares\n4. Segurança individual e responsabilidades sociais\n\nValidade: 5 anos · Revalidação obrigatória"}},
    { id:"oow_deck", icon:"🧭", color:C.blue2,
      label:{fr:"OOW Pont\n(Officier de quart)",en:"OOW Deck\n(Officer of the Watch)",es:"OOW Puente\n(Oficial de guardia)",pt:"OOW Ponte\n(Oficial de quarto)"},
      who:{fr:"Officiers de quart pont · Navires > 500 TB",en:"Deck watch officers · Vessels > 500 GT",es:"Oficiales de guardia de puente · Buques > 500 TB",pt:"Oficiais de quarto de ponte · Navios > 500 AB"},
      content:{fr:"Chapitre II STCW\nCompétences : navigation · quart · météo · COLREG\nFormation : 12 mois navigation approuvée\nSimulateur : ARPA · ECDIS\nFormation avancée incendie (FPFF)\nFormation survie (PSCRB)\nRevalidation tous les 5 ans",en:"STCW Chapter II\nCompetencies: navigation · watchkeeping · weather · COLREG\nTraining: 12 months approved sea service\nSimulator: ARPA · ECDIS\nAdvanced fire fighting (FPFF)\nSurvival training (PSCRB)\nRevalidation every 5 years",es:"Capítulo II STCW\nCompetencias: navegación · guardia · meteorología · COLREG\nFormación: 12 meses de servicio en la mar aprobado\nSimulador: ARPA · ECDIS\nLucha contra incendios avanzada (FPFF)\nFormación de supervivencia (PSCRB)",pt:"Capítulo II STCW\nCompetências: navegação · quarto · meteorologia · COLREG\nFormação: 12 meses de serviço aprovado no mar\nSimulador: ARPA · ECDIS\nCombate a incêndios avançado (FPFF)\nFormação de sobrevivência (PSCRB)"}},
    { id:"oow_eng", icon:"⚙️", color:C.orange,
      label:{fr:"OOW Machine\n(Officier de quart)",en:"OOW Engine\n(Officer of the Watch)",es:"OOW Máquinas\n(Oficial de guardia)",pt:"OOW Máquinas\n(Oficial de quarto)"},
      who:{fr:"Officiers de quart machine · Navires > 750 kW",en:"Engine watch officers · Vessels > 750 kW",es:"Oficiales de guardia de máquinas · Buques > 750 kW",pt:"Oficiais de quarto de máquinas · Navios > 750 kW"},
      content:{fr:"Chapitre III STCW\nCompétences : machines · électricité · sécurité\nFormation : 12 mois navigation approuvée\nSimulateur machine obligatoire\nFormation avancée incendie (FPFF)\nRevalidation tous les 5 ans\nPasserelle vers Chef mécanicien : 3000 heures mer",en:"STCW Chapter III\nCompetencies: machinery · electricity · safety\nTraining: 12 months approved sea service\nMandatory engine simulator\nAdvanced fire fighting (FPFF)\nRevalidation every 5 years\nPath to Chief Engineer: 3000 hours sea service",es:"Capítulo III STCW\nCompetencias: máquinas · electricidad · seguridad\nFormación: 12 meses de servicio en la mar aprobado\nSimulador de máquinas obligatorio\nLucha contra incendios avanzada (FPFF)\nRevalidación cada 5 años",pt:"Capítulo III STCW\nCompetências: máquinas · eletricidade · segurança\nFormação: 12 meses de serviço aprovado no mar\nSimulador de máquinas obrigatório\nCombate a incêndios avançado (FPFF)\nRevalidação a cada 5 anos"}},
    { id:"master", icon:"⚓", color:C.gold2,
      label:{fr:"Capitaine\n(Master)",en:"Master\n(Captain)",es:"Capitán\n(Master)",pt:"Capitão\n(Master)"},
      who:{fr:"Commandant · Navires > 3000 TB",en:"Commanding officer · Vessels > 3000 GT",es:"Oficial al mando · Buques > 3000 TB",pt:"Oficial comandante · Navios > 3000 AB"},
      content:{fr:"Chapitre II STCW (niveau opérationnel → gestion)\nExpérience : minimum 36 mois service en mer\n12 mois comme Chief Officer\nFormation : leadership + BRM (Bridge Resource Mgt)\nSécurité avancée · ISM · ISPS · MLC\nResponsabilités légales : capitaine = dernier responsable\nCertificat ARPA · ECDIS · GMDSS · Sûreté",en:"STCW Chapter II (operational → management level)\nExperience: minimum 36 months sea service\n12 months as Chief Officer\nTraining: leadership + BRM (Bridge Resource Management)\nAdvanced safety · ISM · ISPS · MLC\nLegal responsibilities: captain = ultimate responsible party\nARPA · ECDIS · GMDSS · Security certificate",es:"Capítulo II STCW (nivel operacional → gestión)\nExperiencia: mínimo 36 meses de servicio en la mar\n12 meses como Primer Oficial\nFormación: liderazgo + BRM (Gestión de Recursos del Puente)\nSeguridad avanzada · ISM · PBIP · MLC\nResponsabilidades legales: el capitán es el último responsable",pt:"Capítulo II STCW (nível operacional → gestão)\nExperiência: mínimo 36 meses de serviço no mar\n12 meses como Primeiro Oficial\nFormação: liderança + BRM (Gestão de Recursos da Ponte)\nSegurança avançada · ISM · ISPS · MLC\nResponsabilidades legais: capitão = último responsável"}},
    { id:"special", icon:"🏅", color:C.purple,
      label:{fr:"Certifications\nspéciales",en:"Special\ncertifications",es:"Certificaciones\nespeciales",pt:"Certificações\nespeciais"},
      who:{fr:"Navires spéciaux · Zones spéciales",en:"Special vessels · Special areas",es:"Buques especiales · Zonas especiales",pt:"Navios especiais · Zonas especiais"},
      content:{fr:"TANKERS :\nTanker Basic (pétroliers/chimiquiers/gaziers)\nTanker Advanced selon le type\n\nGMDSS :\nGOC (General Operator Certificate) → navires internationaux\nROC (Restricted Operator Certificate) → zones côtières\n\nPOLAIRE :\nBasic Polar · Advanced Polar (depuis 2017)\n\nSÛRETÉ :\nSDSD (Security Duties) · PFSO\n\nETO (Electro-Technical Officer) → depuis 2010 Manila",en:"TANKERS:\nTanker Basic (oil/chemical/gas tankers)\nTanker Advanced by type\n\nGMDSS:\nGOC (General Operator Certificate) → international vessels\nROC (Restricted Operator Certificate) → coastal zones\n\nPOLAR:\nBasic Polar · Advanced Polar (since 2017)\n\nSECURITY:\nSDSD (Security Duties) · PFSO\n\nETO (Electro-Technical Officer) → since 2010 Manila",es:"BUQUES CISTERNA:\nCisterna Básico · Cisterna Avanzado\n\nSMSSM:\nCGO (Certificado General de Operador)\nCRO (Certificado Restringido de Operador)\n\nPOLAR:\nPolar Básico · Polar Avanzado (desde 2017)\n\nPROTECCIÓN:\nFunciones de protección · OPIP\n\nOET (Oficial Electrotécnico) → desde Manila 2010",pt:"NAVIOS CISTERNA:\nCisterna Básico · Cisterna Avançado\n\nGMDSS:\nGOC (Certificado Geral de Operador)\nROC (Certificado Restrito de Operador)\n\nPOLAR:\nPolar Básico · Polar Avançado (desde 2017)\n\nPROTEÇÃO:\nFunções de proteção · OPIP\n\nETO (Oficial Eletrotécnico) → desde Manila 2010"}},
  ];
  const sel_ = sel!==null ? certs[sel] : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {certs.map((c,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)}
            style={{padding:"10px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===i?`${c.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===i?c.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:22,marginBottom:4}}>{c.icon}</div>
            <div style={{fontSize:8,color:sel===i?c.color:C.muted,fontWeight:700,lineHeight:1.3,whiteSpace:"pre-line"}}>{c.label[lang]||c.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:4}}>{sel_.icon} {(sel_.label[lang]||sel_.label.fr).replace('\n',' ')}</div>
        <div style={{fontSize:10,color:sel_.color,fontWeight:700,marginBottom:6}}>👤 {sel_.who[lang]||sel_.who.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>{sel_.content[lang]||sel_.content.fr}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — WORK/REST HOURS PLANNER
// ══════════════════════════════════════
function RestHoursSVG({ lang }) {
  const [workHours, setWorkHours] = useState(10);
  const maxWork = 14;
  const minRest = 10;
  const restHours = 24 - workHours;
  const isCompliant = workHours <= maxWork && restHours >= minRest;

  const blocks = Array.from({length:24},(_,i)=>({
    hour:i,
    isWork: i < workHours,
  }));

  return (
    <div>
      {/* 24h grid */}
      <div style={{marginBottom:10}}>
        <div style={{fontSize:9,color:C.muted,marginBottom:4,fontWeight:700}}>
          {lang==="fr"?"GRILLE 24H — RÉPARTITION TRAVAIL/REPOS":lang==="en"?"24H GRID — WORK/REST DISTRIBUTION":lang==="es"?"CUADRÍCULA 24H — DISTRIBUCIÓN TRABAJO/DESCANSO":"GRELHA 24H — DISTRIBUIÇÃO TRABALHO/DESCANSO"}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(24,1fr)",gap:2}}>
          {blocks.map((b,i)=>(
            <div key={i} style={{
              height:28,borderRadius:3,
              background:b.isWork?`${C.orange}88`:`${C.green}55`,
              border:`1px solid ${b.isWork?C.orange:C.green}44`,
              display:"flex",alignItems:"flex-end",justifyContent:"center",
              paddingBottom:2,
            }}>
              {(i===0||i===6||i===12||i===18||i===23)&&(
                <span style={{fontSize:5,color:C.muted}}>{i}h</span>
              )}
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:10,marginTop:6}}>
          <div style={{display:"flex",alignItems:"center",gap:4}}>
            <div style={{width:10,height:10,borderRadius:2,background:C.orange}}/>
            <span style={{fontSize:9,color:C.muted}}>{lang==="fr"?"Travail":lang==="en"?"Work":lang==="es"?"Trabajo":"Trabalho"}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:4}}>
            <div style={{width:10,height:10,borderRadius:2,background:C.green}}/>
            <span style={{fontSize:9,color:C.muted}}>{lang==="fr"?"Repos":lang==="en"?"Rest":lang==="es"?"Descanso":"Descanso"}</span>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div style={{marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.muted,marginBottom:4}}>
          <span>{lang==="fr"?"Heures de travail:":lang==="en"?"Work hours:":lang==="es"?"Horas trabajo:":"Horas trabalho:"} <b style={{color:isCompliant?C.orange:C.red}}>{workHours}h</b></span>
          <span>{lang==="fr"?"Repos:":lang==="en"?"Rest:":lang==="es"?"Descanso:":"Descanso:"} <b style={{color:isCompliant?C.green:C.red}}>{restHours}h</b></span>
        </div>
        <input type="range" min={1} max={24} value={workHours}
          onChange={e=>setWorkHours(Number(e.target.value))}
          style={{width:"100%",accentColor:isCompliant?C.orange:C.red}}/>
      </div>

      {/* Compliance status */}
      <div style={{padding:"10px 12px",borderRadius:12,
        background:isCompliant?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.12)",
        border:`1px solid ${isCompliant?C.green:C.red}44`}}>
        <div style={{fontSize:12,fontWeight:700,color:isCompliant?C.green:C.red,marginBottom:4}}>
          {isCompliant?"✅":"🔴"} {lang==="fr"?`${isCompliant?"CONFORME":"NON CONFORME"} STCW/MLC 2006`:lang==="en"?`${isCompliant?"COMPLIANT":"NON-COMPLIANT"} STCW/MLC 2006`:lang==="es"?`${isCompliant?"CONFORME":"NO CONFORME"} STCW/MLC 2006`:`${isCompliant?"CONFORME":"NÃO CONFORME"} STCW/MLC 2006`}
        </div>
        <div style={{fontSize:10,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>
          {lang==="fr"
            ?`Travail : ${workHours}h/24h (max 14h) ${workHours>14?"❌ DÉPASSÉ":"✓"}\nRepos : ${restHours}h/24h (min 10h) ${restHours<10?"❌ INSUFFISANT":"✓"}\nTravail/semaine : max 72h · Repos/semaine : min 77h`
            :lang==="en"
            ?`Work: ${workHours}h/24h (max 14h) ${workHours>14?"❌ EXCEEDED":"✓"}\nRest: ${restHours}h/24h (min 10h) ${restHours<10?"❌ INSUFFICIENT":"✓"}\nWork/week: max 72h · Rest/week: min 77h`
            :lang==="es"
            ?`Trabajo: ${workHours}h/24h (máx 14h) ${workHours>14?"❌ SUPERADO":"✓"}\nDescanso: ${restHours}h/24h (mín 10h) ${restHours<10?"❌ INSUFICIENTE":"✓"}`
            :`Trabalho: ${workHours}h/24h (máx 14h) ${workHours>14?"❌ ULTRAPASSADO":"✓"}\nDescanso: ${restHours}h/24h (mín 10h) ${restHours<10?"❌ INSUFICIENTE":"✓"}\nTrabalho/semana: máx 72h · Descanso/semana: mín 77h`}
        </div>
        {!isCompliant&&<div style={{marginTop:6,fontSize:10,color:C.red,fontWeight:700}}>
          ⚠️ {lang==="fr"?"Non-conformité = infraction PSC · amende · détention navire":lang==="en"?"Non-compliance = PSC violation · fine · vessel detention":lang==="es"?"Incumplimiento = infracción PSC · multa · retención buque":"Não conformidade = infração PSC · multa · detenção do navio"}
        </div>}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — PSC CERTIFICATES INSPECTOR
// ══════════════════════════════════════
function PSCCertInspectorSVG({ lang }) {
  const [phase, setPhase] = useState("idle");
  const [step, setStep] = useState(0);
  const [issues, setIssues] = useState([]);

  const checks = [
    { id:"bst", icon:"🔰", color:C.green,
      label:{fr:"BST — Formation de base",en:"BST — Basic safety training",es:"BST — Formación básica",pt:"BST — Formação básica"},
      result:{fr:"✅ Valide — tous marins certifiés",en:"✅ Valid — all seafarers certified",es:"✅ Válido — todos los marineros certificados",pt:"✅ Válido — todos os marítimos certificados"},
      ok:true},
    { id:"oow", icon:"🧭", color:C.blue2,
      label:{fr:"OOW Pont — Officier de quart",en:"OOW Deck — Watch officer",es:"OOW Puente — Oficial de guardia",pt:"OOW Ponte — Oficial de quarto"},
      result:{fr:"⚠️ DÉFICIENCE : certificat 2ème officier expiré depuis 3 mois",en:"⚠️ DEFICIENCY: 2nd officer certificate expired 3 months ago",es:"⚠️ DEFICIENCIA: certificado del 2° oficial caducado hace 3 meses",pt:"⚠️ DEFICIÊNCIA: certificado do 2° oficial expirado há 3 meses"},
      ok:false},
    { id:"gmdss", icon:"📡", color:C.purple,
      label:{fr:"GMDSS — Opérateur radio",en:"GMDSS — Radio operator",es:"SMSSM — Operador de radio",pt:"GMDSS — Operador de rádio"},
      result:{fr:"✅ GOC valide",en:"✅ GOC valid",es:"✅ CGO válido",pt:"✅ GOC válido"},
      ok:true},
    { id:"rest", icon:"⏰", color:C.teal,
      label:{fr:"Journal heures travail/repos",en:"Work/rest hours log",es:"Registro horas trabajo/descanso",pt:"Registo horas trabalho/descanso"},
      result:{fr:"⚠️ DÉFICIENCE : journal incomplet — 4 jours non renseignés",en:"⚠️ DEFICIENCY: incomplete log — 4 days missing",es:"⚠️ DEFICIENCIA: registro incompleto — 4 días sin datos",pt:"⚠️ DEFICIÊNCIA: registo incompleto — 4 dias em falta"},
      ok:false},
    { id:"medical", icon:"🏥", color:C.orange,
      label:{fr:"Certificats médicaux ENG1",en:"ENG1 medical certificates",es:"Certificados médicos ENG1",pt:"Certificados médicos ENG1"},
      result:{fr:"✅ Tous certificats valides",en:"✅ All certificates valid",es:"✅ Todos los certificados válidos",pt:"✅ Todos os certificados válidos"},
      ok:true},
    { id:"tanker", icon:"🛢️", color:C.red,
      label:{fr:"Certification pétrolier (tanker)",en:"Tanker certification",es:"Certificación petrolero (tanker)",pt:"Certificação petroleiro (tanker)"},
      result:{fr:"⚠️ DÉFICIENCE GRAVE : 2 officiers sans formation tanker avancée — NAVIRE PÉTROLIER",en:"⚠️ SERIOUS DEFICIENCY: 2 officers without advanced tanker training — OIL TANKER",es:"⚠️ DEFICIENCIA GRAVE: 2 oficiales sin formación avanzada tanque — BUQUE PETROLERO",pt:"⚠️ DEFICIÊNCIA GRAVE: 2 oficiais sem formação avançada tanque — NAVIO PETROLEIRO"},
      ok:false},
  ];

  const serious = issues.filter(i=>!checks.find(c=>c.id===i)?.ok).length;
  const isDetained = issues.filter(id=>id==="tanker").length>0;

  useEffect(()=>{
    if(phase==="inspecting" && step<checks.length){
      const timer=setTimeout(()=>{
        if(!checks[step].ok) setIssues(i=>[...i,checks[step].id]);
        setStep(s=>s+1);
      },700);
      return()=>clearTimeout(timer);
    }
    if(phase==="inspecting" && step>=checks.length) setPhase("done");
  },[phase,step]);

  return (
    <div>
      {phase==="idle"&&(
        <div style={{textAlign:"center",padding:"16px 0"}}>
          <div style={{fontSize:40,marginBottom:8}}>🔍</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:12,lineHeight:1.5}}>
            {lang==="fr"?"Inspection PSC des certificats STCW\nNavire pétrolier · Port de Rotterdam":lang==="en"?"PSC inspection of STCW certificates\nOil tanker · Port of Rotterdam":lang==="es"?"Inspección PSC de certificados STCW\nBuque petrolero · Puerto de Rotterdam":"Inspeção PSC de certificados STCW\nPetroleiro · Porto de Roterdão"}
          </div>
          <button onClick={()=>setPhase("inspecting")} style={{padding:"12px 24px",borderRadius:12,background:`linear-gradient(135deg,${C.blue},${C.blue2})`,border:"none",color:C.white,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
            🔍 {lang==="fr"?"INSPECTER LES CERTIFICATS":lang==="en"?"INSPECT CERTIFICATES":lang==="es"?"INSPECCIONAR CERTIFICADOS":"INSPECIONAR CERTIFICADOS"}
          </button>
        </div>
      )}
      {(phase==="inspecting"||phase==="done")&&(
        <div>
          <div style={{marginBottom:8,padding:"6px 10px",borderRadius:8,
            background:phase==="done"?(isDetained?"rgba(192,57,43,0.15)":issues.length>0?"rgba(230,126,34,0.1)":"rgba(30,138,74,0.1)"):"rgba(26,111,212,0.1)",
            border:`1px solid ${phase==="done"?(isDetained?C.red:issues.length>0?C.orange:C.green):C.blue2}33`,
            fontSize:10,fontWeight:700,color:phase==="done"?(isDetained?C.red:issues.length>0?C.orange:C.green):C.blue2,textAlign:"center"}}>
            {phase==="inspecting"
              ?(lang==="fr"?"🔍 Vérification en cours...":lang==="en"?"🔍 Checking...":lang==="es"?"🔍 Verificando...":"🔍 A verificar...")
              :isDetained
                ?(lang==="fr"?"🔴 NAVIRE IMMOBILISÉ — Certification tanker insuffisante":lang==="en"?"🔴 VESSEL DETAINED — Insufficient tanker certification":lang==="es"?"🔴 BUQUE RETENIDO — Certificación tanque insuficiente":"🔴 NAVIO RETIDO — Certificação de petroleiro insuficiente")
                :(lang==="fr"?"⚠️ DÉFICIENCES — Corrections requises avant départ":lang==="en"?"⚠️ DEFICIENCIES — Corrections required before departure":lang==="es"?"⚠️ DEFICIENCIAS — Correcciones requeridas":"⚠️ DEFICIÊNCIAS — Correções necessárias antes da partida")}
          </div>
          {checks.slice(0,step+1).map((c,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",borderRadius:8,marginBottom:5,
              background:c.ok?"rgba(30,138,74,0.06)":"rgba(192,57,43,0.08)",
              border:`1px solid ${c.ok?C.green:C.red}22`,animation:"fadeUp 0.3s ease"}}>
              <span style={{fontSize:14}}>{c.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:10,fontWeight:700,color:c.ok?C.green:C.red}}>{c.label[lang]||c.label.fr}</div>
                <div style={{fontSize:9,color:C.muted}}>{c.result[lang]||c.result.fr}</div>
              </div>
              <span>{c.ok?"✅":"⚠️"}</span>
            </div>
          ))}
          {phase==="done"&&(
            <button onClick={()=>{setPhase("idle");setStep(0);setIssues([]);}} style={{width:"100%",marginTop:8,padding:"9px",borderRadius:10,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:C.muted,fontSize:11,cursor:"pointer"}}>
              🔄 {lang==="fr"?"Recommencer":"Restart"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"Naufrage MV Joola — Sénégal (2002)",teaser:"Ferry · 1 863 morts · Officiers sans certification STCW · Surcharge massive",what:"Le ferry sénégalais MV Joola chavire au large des côtes gambiennes. 1 863 personnes meurent, dont seulement 64 survivants. C'est la deuxième catastrophe maritime la plus meurtrière de l'histoire (après le Wilhelm Gustloff). Le navire était prévu pour 580 personnes mais transportait plus de 1 900 passagers. Les officiers n'avaient pas les certifications STCW requises.",cause:"• Surcharge massive : 1 928 personnes pour 580 autorisées\n• Officiers sans certifications STCW valides\n• Capitaine absent du navire lors du départ\n• Météo défavorable ignorée (mer formée)\n• Aucune vérification des certifications par l'État sénégalais\n• Pavillon sénégalais non sur la whitelist OMI\n• Procédures d'abandon non pratiquées",lessons:"✓ STCW = obligation légale · naviguer sans = crime maritime\n✓ État du pavillon = responsable de vérifier les certifications\n✓ PSC aurait détecté l'absence de certificats STCW\n✓ Résultat : réformes maritimes majeures en Afrique de l'Ouest\n✓ OMI renforce les exigences 'whitelist' pour les pavillons\n✓ Aucune condamnation pénale (immunité diplomatique invoquée)",link:"🔗 Lien L3 STCW : Le Joola prouve que STCW n'est pas une bureaucratie inutile. Des officiers correctement formés et certifiés auraient peut-être refusé de prendre la mer dans ces conditions. La certification = la compétence = la vie."},
    en:{title:"MV Joola Sinking — Senegal (2002)",teaser:"Ferry · 1,863 deaths · Officers without STCW certification · Massive overloading",what:"The Senegalese ferry MV Joola capsizes off the Gambian coast. 1,863 people die, with only 64 survivors. It is the second deadliest maritime disaster in history (after the Wilhelm Gustloff). The vessel was designed for 580 people but carried over 1,900 passengers. Officers lacked required STCW certifications.",cause:"• Massive overloading: 1,928 people for 580 authorized\n• Officers without valid STCW certifications\n• Captain absent from vessel at departure\n• Adverse weather ignored (rough seas)\n• No certification checks by Senegalese state\n• Senegalese flag not on IMO whitelist\n• Abandon ship procedures not practiced",lessons:"✓ STCW = legal obligation · sailing without = maritime crime\n✓ Flag state = responsible for verifying certifications\n✓ PSC would have detected absence of STCW certificates\n✓ Result: major maritime reforms in West Africa\n✓ IMO strengthens 'whitelist' requirements for flags\n✓ No criminal convictions (diplomatic immunity invoked)",link:"🔗 L3 STCW Link: The Joola proves STCW is not useless bureaucracy. Properly trained and certified officers might have refused to put to sea in those conditions. Certification = competence = life."},
    es:{title:"Hundimiento MV Joola — Senegal (2002)",teaser:"Ferry · 1.863 muertos · Oficiales sin certificación STCW · Sobrecarga masiva",what:"El ferry senegalés MV Joola vuelca frente a las costas gambiana. 1.863 personas mueren, con solo 64 supervivientes. Es la segunda catástrofe marítima más mortífera de la historia. El buque estaba previsto para 580 personas pero transportaba más de 1.900 pasajeros.",cause:"• Sobrecarga masiva: 1.928 personas para 580 autorizadas\n• Oficiales sin certificaciones STCW válidas\n• Capitán ausente del buque en la salida\n• Meteorología adversa ignorada\n• Sin verificación de certificaciones por el Estado senegalés\n• Pabellón senegalés no en la lista blanca OMI",lessons:"✓ STCW = obligación legal · navegar sin = delito marítimo\n✓ Estado de pabellón = responsable de verificar las certificaciones\n✓ PSC habría detectado la falta de certificados STCW\n✓ Resultado: grandes reformas marítimas en África Occidental",link:"🔗 Vínculo L3: El Joola demuestra que STCW no es una burocracia inútil. Oficiales correctamente formados y certificados tal vez habrían rechazado salir a la mar en esas condiciones."},
    pt:{title:"Naufrágio MV Joola — Senegal (2002)",teaser:"Ferry · 1.863 mortos · Oficiais sem certificação STCW · Sobrecarga massiva",what:"O ferry senegalês MV Joola capsize ao largo da costa gambiana. 1.863 pessoas morrem, com apenas 64 sobreviventes. É o segundo desastre marítimo mais mortal da história. O navio estava previsto para 580 pessoas mas transportava mais de 1.900 passageiros.",cause:"• Sobrecarga massiva: 1.928 pessoas para 580 autorizadas\n• Oficiais sem certificações STCW válidas\n• Capitão ausente do navio na partida\n• Meteorologia adversa ignorada\n• Sem verificação de certificações pelo Estado senegalês\n• Bandeira senegalesa não na lista branca IMO",lessons:"✓ STCW = obrigação legal · navegar sem = crime marítimo\n✓ Estado de bandeira = responsável por verificar as certificações\n✓ PSC teria detetado a falta de certificados STCW\n✓ Resultado: grandes reformas marítimas na África Ocidental",link:"🔗 Vínculo L3: O Joola prova que o STCW não é uma burocracia inútil. Oficiais corretamente formados e certificados talvez tivessem recusado sair para o mar nessas condições."},
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
        <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}33`,fontSize:11,color:C.gold2,lineHeight:1.6}}>{c.link}</div>
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
    fr:[
      {id:"q1",q:"En quelle année ont été adoptés les Amendements de Manille de STCW ?\n(Répondre : l'année)",correct:"2010"},
      {id:"q2",q:"BST = formation de base STCW. Combien de modules obligatoires ?\n(Répondre : le chiffre)",correct:"4"},
      {id:"q3",q:"Quelle est la durée de validité d'un certificat STCW ?\n(Répondre : ex. '5 ans')",correct:"5"},
    ],
    en:[
      {id:"q1",q:"In what year were the Manila Amendments to STCW adopted?\n(Answer: the year)",correct:"2010"},
      {id:"q2",q:"BST = STCW basic safety training. How many mandatory modules?\n(Answer: the number)",correct:"4"},
      {id:"q3",q:"What is the validity period of an STCW certificate?\n(Answer: e.g. '5 years')",correct:"5"},
    ],
    es:[
      {id:"q1",q:"¿En qué año se adoptaron las Enmiendas de Manila del STCW?\n(Responder: el año)",correct:"2010"},
      {id:"q2",q:"BST = formación básica STCW. ¿Cuántos módulos obligatorios?\n(Responder: el número)",correct:"4"},
      {id:"q3",q:"¿Cuál es la validez de un certificado STCW?\n(Responder: ej. '5 años')",correct:"5"},
    ],
    pt:[
      {id:"q1",q:"Em que ano foram adotadas as Emendas de Manila do STCW?\n(Responder: o ano)",correct:"2010"},
      {id:"q2",q:"BST = formação básica STCW. Quantos módulos obrigatórios?\n(Responder: o número)",correct:"4"},
      {id:"q3",q:"Qual é a validade de um certificado STCW?\n(Responder: ex. '5 anos')",correct:"5"},
    ],
  };
  const list=qs[lang]||qs.fr;
  const chk=(q,val)=>{
    const v=val.trim().toLowerCase();
    return v.includes(q.correct.toLowerCase());
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.teal}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : Manille 2010 · BST = 4 modules · Certificats STCW = 5 ans"
        :lang==="en"?"💡 Reminders: Manila 2010 · BST = 4 modules · STCW certificates = 5 years"
        :lang==="es"?"💡 Recordatorios: Manila 2010 · BST = 4 módulos · Certificados STCW = 5 años"
        :"💡 Lembretes: Manila 2010 · BST = 4 módulos · Certificados STCW = 5 anos"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:18,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q,ans[q.id])?C.green:C.red}}>{chk(q,ans[q.id])?"✓":`✗ → ${q.correct}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7,marginBottom:10}}>
        {lang==="fr"?"✅ Q1: 2010 (Amendements de Manille · en vigueur 1er janvier 2012)\n✅ Q2: 4 modules (Survie · Incendie · Premiers secours · Sécurité individuelle)\n✅ Q3: 5 ans (revalidation obligatoire · formation continue requise)"
        :lang==="en"?"✅ Q1: 2010 (Manila Amendments · in force January 1, 2012)\n✅ Q2: 4 modules (Survival · Fire fighting · First aid · Personal safety)\n✅ Q3: 5 years (mandatory revalidation · continuing training required)"
        :"✅ Q1: 2010 · Q2: 4 módulos · Q3: 5 años"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}


const QUIZ = {
  fr:[
    {q:"En quelle année sont entrés en vigueur les Amendements de Manille de la Convention STCW ?",opts:["2010","2011","2012","2015"],correct:2,expl:"Les Amendements de Manille ont été adoptés le 25 juin 2010 lors de la conférence diplomatique de Manille (Philippines). Ils sont entrés en vigueur le 1er janvier 2012. Ils représentent la révision la plus complète de STCW depuis 1995. Principales nouveautés : compétences leadership, intégration MLC 2006, nouvelles certifications (ETO), renforcement de la formation sur la piraterie et la sûreté."},
    {q:"La formation BST (Basic Safety Training) est obligatoire pour :",opts:["Les capitaines uniquement","Tous les marins sans exception — avant d'embarquer sur tout navire","Les officiers de pont uniquement","Les officiers machine uniquement"],correct:1,expl:"BST = obligatoire pour TOUS les marins, quel que soit leur rang ou leur fonction (STCW Chapitre VI, Règle VI/1). 4 modules : 1) Techniques personnelles de survie (PST), 2) Lutte contre l'incendie et prévention (FFP), 3) Premiers secours élémentaires (EFA), 4) Sécurité individuelle et responsabilités sociales (PSSR). Validité 5 ans. À revalider avant expiration."},
    {q:"Quelle est la durée maximale de travail par période de 24 heures selon STCW/MLC 2006 ?",opts:["10 heures","12 heures","14 heures","16 heures"],correct:2,expl:"STCW/MLC 2006 : maximum 14 heures de travail par période de 24 heures ET minimum 10 heures de repos. Également : maximum 72 heures de travail par semaine et minimum 77 heures de repos par semaine. Journal des heures de travail et de repos obligatoire, signé par l'officier ET par le capitaine. Non-respect = infraction PSC."},
    {q:"Qu'est-ce que la 'whitelist' de l'OMI dans le contexte STCW ?",opts:["Liste des navires conformes","Liste des États dont le système de formation et de certification STCW est reconnu conforme par l'OMI","Liste des capitaines certifiés","Liste des ports autorisés à inspecter les certificats"],correct:1,expl:"Whitelist OMI STCW = liste des États dont le système national de formation et certification des marins est reconnu conforme à STCW. Actuellement 164 États. Si un État n'est pas sur la whitelist, ses certificats nationaux ne sont pas reconnus internationalement. Le PSC peut rejeter les certificats d'un État non listé. Mise à jour régulière par l'OMI."},
    {q:"La Convention STCW couvre-t-elle les heures de travail et de repos des marins ?",opts:["Non, c'est uniquement MLC 2006","Oui — STCW Chapitre VIII intègre les règles sur les heures de travail/repos, complémentaires à MLC 2006","Non, c'est uniquement SOLAS","Oui, STCW remplace MLC 2006 pour les heures de travail"],correct:1,expl:"STCW Chapitre VIII (Veille) intègre les règles sur les heures de travail et de repos des officiers de quart. Ces règles sont alignées avec MLC 2006 (qui couvre tous les marins, pas seulement les officiers de quart). Ensemble, STCW VIII + MLC 2006 = cadre complet pour les heures de travail/repos. Le PSC vérifie la conformité aux deux conventions simultanément."},
  ],
  en:[
    {q:"In what year did the Manila Amendments to the STCW Convention enter into force?",opts:["2010","2011","2012","2015"],correct:2,expl:"The Manila Amendments were adopted on June 25, 2010 at the diplomatic conference in Manila (Philippines). They entered into force on January 1, 2012. They represent the most comprehensive revision of STCW since 1995. Main innovations: leadership competencies, MLC 2006 integration, new certifications (ETO), strengthened training on piracy and security."},
    {q:"Basic Safety Training (BST) is mandatory for:",opts:["Captains only","All seafarers without exception — before embarking on any vessel","Deck officers only","Engine officers only"],correct:1,expl:"BST = mandatory for ALL seafarers, regardless of rank or function (STCW Chapter VI, Rule VI/1). 4 modules: 1) Personal survival techniques (PST), 2) Fire fighting and fire prevention (FFP), 3) Elementary first aid (EFA), 4) Personal safety and social responsibilities (PSSR). Validity 5 years. Must be revalidated before expiry."},
    {q:"What is the maximum work period per 24 hours under STCW/MLC 2006?",opts:["10 hours","12 hours","14 hours","16 hours"],correct:2,expl:"STCW/MLC 2006: maximum 14 hours work per 24-hour period AND minimum 10 hours rest. Also: maximum 72 hours work per week and minimum 77 hours rest per week. Mandatory work and rest hours log, signed by officer AND captain. Non-compliance = PSC violation."},
    {q:"What is the IMO 'whitelist' in the STCW context?",opts:["List of compliant vessels","List of states whose STCW training and certification system is recognized as compliant by IMO","List of certified captains","List of ports authorized to inspect certificates"],correct:1,expl:"IMO STCW whitelist = list of states whose national seafarer training and certification system is recognized as STCW-compliant. Currently 164 states. If a state is not on the whitelist, its national certificates are not internationally recognized. PSC can reject certificates from unlisted states. Regularly updated by IMO."},
    {q:"Does the STCW Convention cover seafarer work and rest hours?",opts:["No, that is only MLC 2006","Yes — STCW Chapter VIII integrates work/rest hours rules, complementary to MLC 2006","No, that is only SOLAS","Yes, STCW replaces MLC 2006 for work hours"],correct:1,expl:"STCW Chapter VIII (Watchkeeping) integrates work and rest hours rules for watch officers. These rules are aligned with MLC 2006 (which covers all seafarers, not just watch officers). Together, STCW VIII + MLC 2006 = comprehensive framework for work/rest hours. PSC checks compliance with both conventions simultaneously."},
  ],
  es:[
    {q:"¿En qué año entraron en vigor las Enmiendas de Manila al Convenio STCW?",opts:["2010","2011","2012","2015"],correct:2,expl:"Las Enmiendas de Manila fueron adoptadas el 25 de junio de 2010 en la conferencia diplomática de Manila (Filipinas). Entraron en vigor el 1 de enero de 2012. Representan la revisión más completa del STCW desde 1995. Principales novedades: competencias de liderazgo, integración del MLC 2006, nuevas certificaciones (OET), formación reforzada sobre piratería y protección."},
    {q:"La formación BST (Formación Básica de Seguridad) es obligatoria para:",opts:["Solo los capitanes","Todos los marineros sin excepción — antes de embarcar en cualquier buque","Solo los oficiales de puente","Solo los oficiales de máquinas"],correct:1,expl:"BST = obligatoria para TODOS los marineros, independientemente de su rango o función (STCW Capítulo VI, Regla VI/1). 4 módulos: 1) Técnicas personales de supervivencia, 2) Lucha contra incendios y prevención, 3) Primeros auxilios elementales, 4) Seguridad individual y responsabilidades sociales. Validez 5 años."},
    {q:"¿Cuál es el período máximo de trabajo por 24 horas según STCW/MLC 2006?",opts:["10 horas","12 horas","14 horas","16 horas"],correct:2,expl:"STCW/MLC 2006: máximo 14 horas de trabajo por período de 24 horas Y mínimo 10 horas de descanso. También: máximo 72 horas de trabajo por semana y mínimo 77 horas de descanso por semana. Registro de horas de trabajo y descanso obligatorio, firmado por el oficial Y el capitán. Incumplimiento = infracción PSC."},
    {q:"¿Qué es la 'lista blanca' de la OMI en el contexto STCW?",opts:["Lista de buques conformes","Lista de Estados cuyo sistema de formación y certificación STCW es reconocido conforme por la OMI","Lista de capitanes certificados","Lista de puertos autorizados a inspeccionar los certificados"],correct:1,expl:"Lista blanca OMI STCW = lista de Estados cuyo sistema nacional de formación y certificación de gente de mar es reconocido conforme al STCW. Actualmente 164 Estados. Si un Estado no está en la lista blanca, sus certificados nacionales no son reconocidos internacionalmente. El PSC puede rechazar los certificados de un Estado no incluido."},
    {q:"¿El Convenio STCW cubre las horas de trabajo y descanso de los marineros?",opts:["No, eso es solo el MLC 2006","Sí — el Capítulo VIII del STCW integra las reglas sobre horas de trabajo/descanso, complementarias al MLC 2006","No, eso es solo SOLAS","Sí, el STCW sustituye al MLC 2006 para las horas de trabajo"],correct:1,expl:"STCW Capítulo VIII (Guardia) integra las reglas sobre horas de trabajo y descanso de los oficiales de guardia. Estas reglas están alineadas con el MLC 2006 (que cubre a todos los marineros, no solo a los oficiales de guardia). El PSC verifica el cumplimiento de ambos convenios simultáneamente."},
  ],
  pt:[
    {q:"Em que ano entraram em vigor as Emendas de Manila à Convenção STCW?",opts:["2010","2011","2012","2015"],correct:2,expl:"As Emendas de Manila foram adotadas a 25 de junho de 2010 na conferência diplomática de Manila (Filipinas). Entraram em vigor a 1 de janeiro de 2012. Representam a revisão mais abrangente do STCW desde 1995. Principais novidades: competências de liderança, integração do MLC 2006, novas certificações (ETO), formação reforçada sobre pirataria e proteção."},
    {q:"A formação BST (Formação Básica de Segurança) é obrigatória para:",opts:["Apenas os capitães","Todos os marítimos sem exceção — antes de embarcar em qualquer navio","Apenas os oficiais de ponte","Apenas os oficiais de máquinas"],correct:1,expl:"BST = obrigatória para TODOS os marítimos, independentemente do seu posto ou função (STCW Capítulo VI, Regra VI/1). 4 módulos: 1) Técnicas pessoais de sobrevivência, 2) Combate a incêndios e prevenção, 3) Primeiros socorros elementares, 4) Segurança individual e responsabilidades sociais. Validade 5 anos."},
    {q:"Qual é o período máximo de trabalho por 24 horas segundo o STCW/MLC 2006?",opts:["10 horas","12 horas","14 horas","16 horas"],correct:2,expl:"STCW/MLC 2006: máximo 14 horas de trabalho por período de 24 horas E mínimo 10 horas de descanso. Também: máximo 72 horas de trabalho por semana e mínimo 77 horas de descanso por semana. Registo de horas de trabalho e descanso obrigatório, assinado pelo oficial E pelo capitão. Não cumprimento = infração PSC."},
    {q:"O que é a 'lista branca' da IMO no contexto STCW?",opts:["Lista de navios conformes","Lista de estados cujo sistema de formação e certificação STCW é reconhecido como conforme pela IMO","Lista de capitães certificados","Lista de portos autorizados a inspecionar certificados"],correct:1,expl:"Lista branca IMO STCW = lista de estados cujo sistema nacional de formação e certificação de marítimos é reconhecido como conforme ao STCW. Atualmente 164 estados. Se um estado não está na lista branca, os seus certificados nacionais não são reconhecidos internacionalmente. O PSC pode rejeitar certificados de um estado não listado."},
    {q:"A Convenção STCW abrange as horas de trabalho e descanso dos marítimos?",opts:["Não, isso é apenas o MLC 2006","Sim — o Capítulo VIII do STCW integra as regras sobre horas de trabalho/descanso, complementares ao MLC 2006","Não, isso é apenas o SOLAS","Sim, o STCW substitui o MLC 2006 para as horas de trabalho"],correct:1,expl:"STCW Capítulo VIII (Quarto) integra as regras sobre horas de trabalho e descanso dos oficiais de quarto. Estas regras estão alinhadas com o MLC 2006 (que abrange todos os marítimos, não apenas os oficiais de quarto). O PSC verifica a conformidade com ambas as convenções simultaneamente."},
  ],
};

const BANK = {
  fr:[
    {q:"Qu'est-ce que la 'revalidation' d'un certificat STCW ?",opts:["Un nouveau certificat","Procédure obligatoire tous les 5 ans pour maintenir la validité d'un certificat STCW — formation continue + service en mer requis","Un test médical","Un audit ISM"],correct:1,expl:"Revalidation STCW = procédure tous les 5 ans pour maintenir la validité d'un certificat de compétence. Exige : preuve de service en mer récent (minimum 12 mois sur 5 ans) OU formation de mise à niveau approuvée. Si certificat expiré = doit repasser toute la formation. Vérifiée par le PSC lors des inspections."},
    {q:"Qu'est-ce que le certificat GMDSS GOC ?",opts:["Un certificat radio basique","General Operator Certificate — certification STCW pour exploiter les équipements GMDSS sur navires en navigation internationale","Un certificat réservé aux capitaines","Un certificat de sécurité SOLAS"],correct:1,expl:"GOC = General Operator Certificate. Requis par STCW pour tout officier opérant les équipements GMDSS (VHF DSC, MF/HF, Inmarsat, EPIRB, SART, Navtex). Obligatoire sur navires en navigation internationale. ROC (Restricted Operator Certificate) = version limitée pour navigation côtière. Délivré après formation spécialisée GMDSS + examen."},
    {q:"Qu'est-ce que le 'BRM' (Bridge Resource Management) dans STCW ?",opts:["Un type de radar","Compétence STCW sur le travail d'équipe, la communication et la prise de décision en passerelle — introduite par les Amendements de Manille 2010","Un certificat de navigation","Un système de communication"],correct:1,expl:"BRM = Bridge Resource Management. Introduit par les Amendements de Manille 2010. Couvre : leadership, travail d'équipe, communication efficace, prise de décision sous pression, conscience situationnelle. Obligatoire pour les capitaines et Chief Officers. Complémenté par ERM (Engine Room Resource Management) pour les officiers machine."},
    {q:"Qu'est-ce que le certificat 'ETO' (Electro-Technical Officer) ?",opts:["Un certificat électrique basique","Nouvelle certification STCW créée par les Amendements de Manille 2010 — officier spécialisé dans les systèmes électriques, électroniques et de contrôle des navires modernes","Un certificat de maintenance","Un certificat de sûreté"],correct:1,expl:"ETO = Electro-Technical Officer. Nouveau certificat créé par les Amendements de Manille 2010 pour reconnaître la spécialisation électrotechnique. Couvre : systèmes d'alimentation électrique, automatisation, instruments de navigation, systèmes de contrôle. Obligatoire pour les officiers remplissant cette fonction sur navires > 750 kW."},
    {q:"Que se passe-t-il si un marin navigue sans certificat STCW valide ?",opts:["Rien, c'est une recommandation","Crime maritime · amende personnelle · retrait du certificat · emprisonnement possible · navire retenu par PSC","Simple avertissement oral","Perte de prime uniquement"],correct:1,expl:"Naviguer sans certificat STCW valide = infraction grave. Conséquences : 1) Pour le marin : amende personnelle, retrait de certificat, emprisonnement possible. 2) Pour le capitaine : responsabilité pour avoir autorisé l'embarquement. 3) Pour la compagnie : violation ISM (SMS). 4) Pour le navire : rétention PSC jusqu'à régularisation. Cas du Joola (2002) : 1863 morts avec officiers non certifiés."},
    {q:"Qu'est-ce que la Convention STCW dit sur la responsabilité de la compagnie maritime ?",opts:["La compagnie n'a aucune responsabilité STCW","La compagnie est responsable de s'assurer que tous ses marins ont des certifications STCW valides avant l'embarquement et de documenter cette vérification","Seul l'État du pavillon est responsable","Le capitaine est seul responsable"],correct:1,expl:"Responsabilité compagnie (STCW Règle I/14) : chaque compagnie maritime doit : 1) S'assurer que chaque marin a une certification STCW valide et adaptée à sa fonction. 2) Documenter cette vérification dans le SMS (ISM). 3) Vérifier l'authenticité des certificats. 4) Informer les marins de leurs responsabilités STCW. Violation = infraction ISM + responsabilité pénale de la compagnie."},
    {q:"Qu'est-ce que le 'PSCRB' dans STCW ?",opts:["Un certificat de navigation","Proficiency in Survival Craft and Rescue Boats — certification pour opérer les canots et engins de sauvetage","Un certificat de chef mécanicien","Un certificat de sûreté"],correct:1,expl:"PSCRB = Proficiency in Survival Craft and Rescue Boats. Certification STCW Chapitre VI, Règle VI/2. Obligatoire pour les officiers et certains membres d'équipage responsables des canots et radeaux. Couvre : mise à l'eau, opération moteur canot, récupération naufragés, utilisation équipements de survie. Validité 5 ans."},
    {q:"Qu'est-ce que la 'formation sur simulateur' requise par STCW ?",opts:["Une recommandation facultative","Exigence STCW : certaines certifications requièrent impérativement une formation sur simulateur agréé — ARPA, ECDIS, simulateur machine","Un simple exercice théorique","Un test informatique basique"],correct:1,expl:"Formation simulateur STCW = obligatoire pour certaines certifications : ARPA (anti-collision radar), ECDIS (cartes électroniques), simulateur machine (OOW Engine), BRM. Le simulateur doit être approuvé par l'autorité maritime. Permet une formation pratique sans risque. Le PSC peut vérifier que la formation simulateur a bien été effectuée dans un centre agréé."},
    {q:"Qu'est-ce que le 'FPFF' (Fire Prevention and Fire Fighting) dans STCW ?",opts:["Un module du BST basique","Certification avancée STCW de lutte contre l'incendie — obligatoire pour officiers · inclut combats incendie pratiques en équipement complet","Un système d'extinction fixe","Un certificat SOLAS"],correct:1,expl:"FPFF = Fire Prevention and Fire Fighting (Advanced). Certification STCW Chapitre VI, Règle VI/3. Distinct du module FFP du BST (basique). FPFF avancée = obligatoire pour les officiers (OOW, Chief Officer, Chief Engineer). Inclut : incendie en équipement complet (ABA), scénarios réels simulés, commandement opérations incendie. Durée : généralement 3-5 jours en centre agréé."},
    {q:"Quelle est la différence entre STCW 'Regulation' et STCW 'Code' ?",opts:["Aucune différence","Les Regulations (dans la Convention) sont les exigences légales · Le Code Partie A est obligatoire (normes minimales) · Le Code Partie B est recommandé","Seul le Code est obligatoire","Seules les Regulations sont obligatoires"],correct:1,expl:"Structure STCW : 1) Convention STCW = cadre légal (Chapitres I-VIII). 2) Code STCW Partie A = normes de compétence minimales OBLIGATOIRES. 3) Code STCW Partie B = directives recommandées (non obligatoires). La Partie A définit les tableaux de compétences (standards de formation, évaluation, certification). Le PSC vérifie la conformité à la Convention ET à la Partie A du Code."},
    {q:"Qu'est-ce que la 'sea service' (navigation effective) requise par STCW ?",opts:["Un stage à terre","Période de service en mer sur un navire approuvé requise pour obtenir une certification STCW — comptabilisée dans un livret de mer officiel","Un cours théorique maritime","Une formation en simulateur"],correct:1,expl:"Sea service = temps de navigation sur un navire approuvé, comptabilisé dans le livret de mer (discharge book). Requis pour la plupart des certifications STCW. Ex : OOW Deck = 12 mois service en mer. Chief Officer = 18 mois. Captain = 36 mois (dont 12 mois comme Chief Officer). La qualité du service est attestée par le capitaine. Vérifié par l'autorité maritime nationale."},
    {q:"Qu'est-ce que le 'Medical Certificate' (ENG1) et son lien avec STCW ?",opts:["Un certificat optionnel","Certificat d'aptitude médicale obligatoire pour tout marin — condition préalable à l'obtention et au maintien d'un certificat STCW","Un certificat de navigation","Un certificat de sécurité"],correct:1,expl:"ENG1 = certificat médical d'aptitude à la navigation. Obligatoire pour embarquer. Délivré par un médecin agréé marine. Vérifie : vision, audition, santé cardiovasculaire, aptitude physique et mentale. Validité : 2 ans (1 an si > 55 ans). STCW exige qu'un marin soit médicalement apte pour maintenir son certificat de compétence. PSC vérifie la validité lors des inspections."},
    {q:"Qu'est-ce que la 'mutual recognition' (reconnaissance mutuelle) des certifications STCW ?",opts:["Un accord bilatéral entre 2 pays","Mécanisme par lequel les États parties reconnaissent les certifications STCW délivrées par les autres États parties sur la whitelist OMI","Un certificat européen spécifique","Un accord commercial maritime"],correct:1,expl:"Reconnaissance mutuelle STCW = principe fondamental. Un État partie reconnaît les certifications STCW d'un autre État partie (si sur la whitelist). Permet aux marins de naviguer sur des navires battant des pavillons différents de leur nationalité. Conditions : État délivrant sur la whitelist OMI + certificat conforme au Code STCW Partie A. Le PSC peut vérifier la conformité et rejeter les certificats non conformes."},
    {q:"Qu'est-ce que le 'duty of care' de la compagnie envers ses marins selon STCW/MLC ?",opts:["Une obligation morale uniquement","Obligation légale de la compagnie de protéger la santé, la sécurité et le bien-être de ses marins — inclut certification, heures repos, conditions de vie","Une recommandation non obligatoire","Un article de contrat de travail"],correct:1,expl:"Duty of care STCW/MLC = obligation légale étendue de la compagnie. Inclut : fournir des marins correctement certifiés STCW (Règle I/14), respecter les heures de travail/repos (STCW VIII + MLC VI), assurer des conditions de vie décentes (MLC II), médecin disponible, rapatriement garanti. Violation = infraction ISM + MLC + STCW. PSC peut immobiliser le navire pour non-conformité MLC/STCW."},
    {q:"Qu'est-ce que la 'flag state responsibility' pour la certification STCW ?",opts:["L'État du pavillon n'a aucune responsabilité STCW","L'État du pavillon est responsable de s'assurer que les navires sous son pavillon embarquent uniquement des marins dûment certifiés STCW — et d'être sur la whitelist OMI","Seule la compagnie est responsable","Seul le PSC est responsable"],correct:1,expl:"Responsabilité État du pavillon (STCW Règle I/6) : doit établir et maintenir un système national de formation et certification conforme à STCW. Doit être sur la whitelist OMI. Vérifie les certifications des marins sur ses navires. Conséquence du non-respect : retrait de la whitelist → certifications non reconnues internationalement → navires retenus par PSC."},
  ],
  en:[
    {q:"What is STCW certificate 'revalidation'?",opts:["A new certificate","Mandatory procedure every 5 years to maintain STCW certificate validity — ongoing training + sea service required","A medical test","An ISM audit"],correct:1,expl:"STCW revalidation = procedure every 5 years to maintain certificate of competency validity. Requires: proof of recent sea service (minimum 12 months in 5 years) OR approved refresher training. If certificate expired = must retake full training. Checked by PSC during inspections."},
    {q:"What is the GMDSS GOC certificate?",opts:["A basic radio certificate","General Operator Certificate — STCW certification to operate GMDSS equipment on internationally navigating vessels","A certificate reserved for captains","A SOLAS safety certificate"],correct:1,expl:"GOC = General Operator Certificate. Required by STCW for any officer operating GMDSS equipment (VHF DSC, MF/HF, Inmarsat, EPIRB, SART, Navtex). Mandatory on internationally navigating vessels. ROC (Restricted Operator Certificate) = limited version for coastal navigation. Issued after specialized GMDSS training + examination."},
    {q:"What is 'BRM' (Bridge Resource Management) in STCW?",opts:["A type of radar","STCW competency on teamwork, communication and decision-making on the bridge — introduced by Manila Amendments 2010","A navigation certificate","A communication system"],correct:1,expl:"BRM = Bridge Resource Management. Introduced by Manila Amendments 2010. Covers: leadership, teamwork, effective communication, decision-making under pressure, situational awareness. Mandatory for captains and Chief Officers. Complemented by ERM (Engine Room Resource Management) for engine officers."},
    {q:"What is the 'ETO' (Electro-Technical Officer) certificate?",opts:["A basic electrical certificate","New STCW certification created by Manila Amendments 2010 — officer specialized in electrical, electronic and control systems of modern vessels","A maintenance certificate","A security certificate"],correct:1,expl:"ETO = Electro-Technical Officer. New certificate created by Manila Amendments 2010 to recognize electrotechnical specialization. Covers: electrical power systems, automation, navigation instruments, control systems. Mandatory for officers fulfilling this function on vessels > 750 kW."},
    {q:"What happens if a seafarer sails without a valid STCW certificate?",opts:["Nothing, it's a recommendation","Maritime crime · personal fine · certificate revocation · possible imprisonment · vessel detained by PSC","Simple verbal warning","Loss of bonus only"],correct:1,expl:"Sailing without valid STCW certificate = serious violation. Consequences: 1) For seafarer: personal fine, certificate revocation, possible imprisonment. 2) For captain: liability for authorizing embarkation. 3) For company: ISM violation (SMS). 4) For vessel: PSC detention until regularized. Case of Joola (2002): 1,863 deaths with uncertified officers."},
    {q:"What does the STCW Convention say about the shipping company's responsibility?",opts:["Company has no STCW responsibility","Company is responsible for ensuring all its seafarers have valid STCW certifications before embarking and documenting this verification","Only the flag state is responsible","Only the captain is responsible"],correct:1,expl:"Company responsibility (STCW Rule I/14): each maritime company must: 1) Ensure each seafarer has valid STCW certification appropriate to their function. 2) Document this verification in the SMS (ISM). 3) Verify certificate authenticity. 4) Inform seafarers of their STCW responsibilities. Violation = ISM violation + company criminal liability."},
    {q:"What is 'PSCRB' in STCW?",opts:["A navigation certificate","Proficiency in Survival Craft and Rescue Boats — certification to operate lifeboats and rescue craft","A chief engineer certificate","A security certificate"],correct:1,expl:"PSCRB = Proficiency in Survival Craft and Rescue Boats. STCW Chapter VI, Rule VI/2. Mandatory for officers and certain crew members responsible for lifeboats and liferafts. Covers: launching, lifeboat engine operation, survivor recovery, survival equipment use. Validity 5 years."},
    {q:"What is the 'simulator training' required by STCW?",opts:["An optional recommendation","STCW requirement: certain certifications require training on an approved simulator — ARPA, ECDIS, engine simulator","A simple theoretical exercise","A basic computer test"],correct:1,expl:"STCW simulator training = mandatory for certain certifications: ARPA (anti-collision radar), ECDIS (electronic charts), engine simulator (OOW Engine), BRM. Simulator must be approved by maritime authority. Enables practical training without risk. PSC can verify simulator training was completed at an approved center."},
    {q:"What is 'FPFF' (Fire Prevention and Fire Fighting) in STCW?",opts:["A BST basic module","Advanced STCW fire fighting certification — mandatory for officers · includes practical fire fighting in full equipment","A fixed extinguishing system","A SOLAS certificate"],correct:1,expl:"FPFF = Fire Prevention and Fire Fighting (Advanced). STCW Chapter VI, Rule VI/3. Distinct from BST FFP module (basic). Advanced FPFF = mandatory for officers (OOW, Chief Officer, Chief Engineer). Includes: fire fighting in full equipment (SCBA), simulated real scenarios, commanding fire operations. Duration: generally 3-5 days at approved center."},
    {q:"What is the difference between STCW 'Regulation' and STCW 'Code'?",opts:["No difference","Regulations (in Convention) are legal requirements · Code Part A is mandatory (minimum standards) · Code Part B is recommended","Only the Code is mandatory","Only the Regulations are mandatory"],correct:1,expl:"STCW structure: 1) STCW Convention = legal framework (Chapters I-VIII). 2) STCW Code Part A = MANDATORY minimum competency standards. 3) STCW Code Part B = recommended guidelines (not mandatory). Part A defines competency tables (training, assessment, certification standards). PSC checks compliance with Convention AND Code Part A."},
    {q:"What is the 'sea service' required by STCW?",opts:["An onshore internship","Period of service at sea on an approved vessel required to obtain STCW certification — recorded in an official discharge book","A theoretical maritime course","Simulator training"],correct:1,expl:"Sea service = time at sea on an approved vessel, recorded in the seafarer's discharge book. Required for most STCW certifications. E.g.: OOW Deck = 12 months sea service. Chief Officer = 18 months. Captain = 36 months (including 12 months as Chief Officer). Quality of service attested by captain. Checked by national maritime authority."},
    {q:"What is the 'Medical Certificate' (ENG1) and its link to STCW?",opts:["An optional certificate","Mandatory medical fitness certificate for all seafarers — prerequisite for obtaining and maintaining an STCW certificate","A navigation certificate","A safety certificate"],correct:1,expl:"ENG1 = medical certificate of fitness for seafaring. Mandatory to embark. Issued by approved marine physician. Checks: vision, hearing, cardiovascular health, physical and mental fitness. Validity: 2 years (1 year if > 55 years). STCW requires a seafarer to be medically fit to maintain their certificate of competency. PSC checks validity during inspections."},
    {q:"What is 'mutual recognition' of STCW certifications?",opts:["A bilateral agreement between 2 countries","Mechanism by which states parties recognize STCW certifications issued by other states parties on IMO whitelist","A specific European certificate","A maritime commercial agreement"],correct:1,expl:"STCW mutual recognition = fundamental principle. A state party recognizes STCW certifications from another state party (if on whitelist). Allows seafarers to sail on vessels flying different flags than their nationality. Conditions: issuing state on IMO whitelist + certificate compliant with STCW Code Part A. PSC can check compliance and reject non-compliant certificates."},
    {q:"What is the company's 'duty of care' towards its seafarers under STCW/MLC?",opts:["A moral obligation only","Legal obligation of company to protect health, safety and welfare of seafarers — includes certification, rest hours, living conditions","A non-mandatory recommendation","A labor contract clause"],correct:1,expl:"Duty of care STCW/MLC = extended legal obligation of company. Includes: providing properly STCW-certified seafarers (Rule I/14), respecting work/rest hours (STCW VIII + MLC VI), ensuring decent living conditions (MLC II), available doctor, guaranteed repatriation. Violation = ISM + MLC + STCW violation. PSC can detain vessel for MLC/STCW non-compliance."},
    {q:"What is 'flag state responsibility' for STCW certification?",opts:["Flag state has no STCW responsibility","Flag state is responsible for ensuring vessels under its flag only embark duly STCW-certified seafarers — and being on IMO whitelist","Only the company is responsible","Only PSC is responsible"],correct:1,expl:"Flag state responsibility (STCW Rule I/6): must establish and maintain a national training and certification system compliant with STCW. Must be on IMO whitelist. Verifies certifications of seafarers on its vessels. Consequence of non-compliance: removal from whitelist → certifications not internationally recognized → vessels detained by PSC."},
  ],
  es:[
    {q:"¿Qué es la 'revalidación' de un certificado STCW?",opts:["Un nuevo certificado","Procedimiento obligatorio cada 5 años para mantener la validez del certificado STCW — formación continua + servicio en la mar requeridos","Un test médico","Una auditoría ISM"],correct:1,expl:"Revalidación STCW = procedimiento cada 5 años para mantener la validez de un certificado de competencia. Exige: prueba de servicio reciente en la mar (mínimo 12 meses en 5 años) O formación de actualización aprobada. Si el certificado ha caducado = debe repetir toda la formación. Verificada por el PSC en las inspecciones."},
    {q:"¿Qué es el certificado SMSSM CGO?",opts:["Un certificado de radio básico","Certificado General de Operador — certificación STCW para operar los equipos SMSSM en buques de navegación internacional","Un certificado reservado a los capitanes","Un certificado de seguridad SOLAS"],correct:1,expl:"CGO = Certificado General de Operador. Requerido por el STCW para cualquier oficial que opere los equipos SMSSM. Obligatorio en buques de navegación internacional. CRO (Certificado Restringido de Operador) = versión limitada para navegación costera."},
    {q:"¿Qué es el 'BRM' (Gestión de Recursos del Puente) en el STCW?",opts:["Un tipo de radar","Competencia STCW sobre el trabajo en equipo, la comunicación y la toma de decisiones en el puente — introducida por las Enmiendas de Manila 2010","Un certificado de navegación","Un sistema de comunicación"],correct:1,expl:"BRM = Bridge Resource Management. Introducido por las Enmiendas de Manila 2010. Cubre: liderazgo, trabajo en equipo, comunicación eficaz, toma de decisiones bajo presión, conciencia situacional. Obligatorio para capitanes y primeros oficiales."},
    {q:"¿Qué es el certificado 'OET' (Oficial Electrotécnico)?",opts:["Un certificado eléctrico básico","Nueva certificación STCW creada por las Enmiendas de Manila 2010 — oficial especializado en sistemas eléctricos, electrónicos y de control de los buques modernos","Un certificado de mantenimiento","Un certificado de protección"],correct:1,expl:"OET = Oficial Electrotécnico. Nuevo certificado creado por las Enmiendas de Manila 2010. Cubre: sistemas de alimentación eléctrica, automatización, instrumentos de navegación, sistemas de control. Obligatorio para los oficiales que desempeñen esta función en buques > 750 kW."},
    {q:"¿Qué ocurre si un marinero navega sin un certificado STCW válido?",opts:["Nada, es una recomendación","Delito marítimo · multa personal · revocación del certificado · posible prisión · retención del buque por PSC","Simple advertencia verbal","Solo pérdida de la prima"],correct:1,expl:"Navegar sin certificado STCW válido = infracción grave. Consecuencias: 1) Para el marinero: multa personal, revocación del certificado, posible prisión. 2) Para el capitán: responsabilidad por haber autorizado el embarque. 3) Para la compañía: infracción ISM (SGS). 4) Para el buque: retención PSC hasta regularización."},
    {q:"¿Qué dice el Convenio STCW sobre la responsabilidad de la compañía marítima?",opts:["La compañía no tiene ninguna responsabilidad STCW","La compañía es responsable de asegurarse de que todos sus marineros tienen certificaciones STCW válidas antes del embarque y de documentar esta verificación","Solo el Estado de pabellón es responsable","Solo el capitán es responsable"],correct:1,expl:"Responsabilidad de la compañía (STCW Regla I/14): cada compañía marítima debe: 1) Asegurarse de que cada marinero tiene una certificación STCW válida y adecuada a su función. 2) Documentar esta verificación en el SGS (ISM). 3) Verificar la autenticidad de los certificados. Infracción = violación del ISM + responsabilidad penal de la compañía."},
    {q:"¿Qué es el 'PSCRB' en el STCW?",opts:["Un certificado de navegación","Competencia en botes salvavidas y botes de rescate — certificación para operar los botes y dispositivos de salvamento","Un certificado de jefe de máquinas","Un certificado de protección"],correct:1,expl:"PSCRB = Proficiency in Survival Craft and Rescue Boats. STCW Capítulo VI, Regla VI/2. Obligatorio para los oficiales y ciertos miembros de la tripulación responsables de los botes y balsas. Cubre: arriado, manejo del motor del bote, recuperación de náufragos, uso de equipos de supervivencia. Validez 5 años."},
    {q:"¿Qué es la 'formación en simulador' requerida por el STCW?",opts:["Una recomendación opcional","Requisito STCW: ciertas certificaciones requieren obligatoriamente formación en simulador aprobado — ARPA, ECDIS, simulador de máquinas","Un simple ejercicio teórico","Un test informático básico"],correct:1,expl:"Formación en simulador STCW = obligatoria para ciertas certificaciones: ARPA, ECDIS, simulador de máquinas, BRM. El simulador debe estar aprobado por la autoridad marítima. Permite una formación práctica sin riesgo. El PSC puede verificar que la formación en simulador se haya realizado en un centro autorizado."},
    {q:"¿Qué es el 'FPFF' (Prevención y Lucha contra Incendios) en el STCW?",opts:["Un módulo del BST básico","Certificación avanzada STCW de lucha contra incendios — obligatoria para oficiales · incluye combates de incendio prácticos con equipo completo","Un sistema de extinción fija","Un certificado SOLAS"],correct:1,expl:"FPFF = Fire Prevention and Fire Fighting (Avanzado). STCW Capítulo VI, Regla VI/3. Distinto del módulo FFP del BST (básico). FPFF avanzada = obligatoria para los oficiales. Incluye: incendio con equipo completo (ERA), escenarios reales simulados, mando de operaciones de incendio."},
    {q:"¿Cuál es la diferencia entre la 'Reglamentación' y el 'Código' del STCW?",opts:["Ninguna diferencia","Las Reglamentaciones (en el Convenio) son los requisitos legales · El Código Parte A es obligatorio (normas mínimas) · El Código Parte B es recomendado","Solo el Código es obligatorio","Solo las Reglamentaciones son obligatorias"],correct:1,expl:"Estructura STCW: 1) Convenio STCW = marco legal (Capítulos I-VIII). 2) Código STCW Parte A = normas de competencia mínimas OBLIGATORIAS. 3) Código STCW Parte B = directrices recomendadas (no obligatorias). La Parte A define los cuadros de competencias. El PSC verifica el cumplimiento del Convenio Y del Código Parte A."},
    {q:"¿Qué es el 'servicio en la mar' requerido por el STCW?",opts:["Una práctica en tierra","Período de servicio en el mar en un buque aprobado requerido para obtener una certificación STCW — registrado en una libreta de mar oficial","Un curso teórico marítimo","Una formación en simulador"],correct:1,expl:"Servicio en la mar = tiempo de navegación en un buque aprobado, registrado en la libreta de mar. Requerido para la mayoría de las certificaciones STCW. Ej.: OOW Puente = 12 meses servicio en la mar. Primer Oficial = 18 meses. Capitán = 36 meses. Verificado por la autoridad marítima nacional."},
    {q:"¿Qué es el 'Certificado Médico' (ENG1) y su vínculo con el STCW?",opts:["Un certificado opcional","Certificado de aptitud médica obligatorio para todo marinero — requisito previo para obtener y mantener un certificado STCW","Un certificado de navegación","Un certificado de seguridad"],correct:1,expl:"ENG1 = certificado médico de aptitud para la navegación. Obligatorio para embarcar. Emitido por un médico autorizado de marina. Comprueba: visión, audición, salud cardiovascular, aptitud física y mental. Validez: 2 años (1 año si > 55 años). El PSC verifica la validez en las inspecciones."},
    {q:"¿Qué es el 'reconocimiento mutuo' de las certificaciones STCW?",opts:["Un acuerdo bilateral entre 2 países","Mecanismo por el que los Estados parte reconocen las certificaciones STCW emitidas por los demás Estados parte en la lista blanca de la OMI","Un certificado europeo específico","Un acuerdo comercial marítimo"],correct:1,expl:"Reconocimiento mutuo STCW = principio fundamental. Un Estado parte reconoce las certificaciones STCW de otro Estado parte (si está en la lista blanca). Permite a los marineros navegar en buques que enarbolan pabellones distintos al de su nacionalidad. Condiciones: Estado emisor en la lista blanca OMI + certificado conforme al Código STCW Parte A."},
    {q:"¿Cuál es el 'deber de cuidado' de la compañía hacia sus marineros según STCW/MLC?",opts:["Una obligación moral únicamente","Obligación legal de la compañía de proteger la salud, la seguridad y el bienestar de sus marineros — incluye certificación, horas de descanso, condiciones de vida","Una recomendación no obligatoria","Una cláusula de contrato de trabajo"],correct:1,expl:"Deber de cuidado STCW/MLC = obligación legal extendida de la compañía. Incluye: proporcionar marineros correctamente certificados STCW, respetar las horas de trabajo/descanso, garantizar condiciones de vida dignas, médico disponible, repatriación garantizada. Infracción = ISM + MLC + STCW. El PSC puede inmovilizar el buque por incumplimiento."},
    {q:"¿Cuál es la 'responsabilidad del Estado de pabellón' en materia de certificación STCW?",opts:["El Estado de pabellón no tiene ninguna responsabilidad STCW","El Estado de pabellón es responsable de asegurarse de que los buques bajo su pabellón embarquen solo gente de mar debidamente certificada STCW — y de estar en la lista blanca OMI","Solo la compañía es responsable","Solo el PSC es responsable"],correct:1,expl:"Responsabilidad del Estado de pabellón (STCW Regla I/6): debe establecer y mantener un sistema nacional de formación y certificación conforme al STCW. Debe estar en la lista blanca de la OMI. Consecuencia del incumplimiento: retirada de la lista blanca → certificaciones no reconocidas internacionalmente → buques retenidos por PSC."},
  ],
  pt:[
    {q:"O que é a 'revalidação' de um certificado STCW?",opts:["Um novo certificado","Procedimento obrigatório a cada 5 anos para manter a validade do certificado STCW — formação contínua + serviço no mar necessários","Um teste médico","Uma auditoria ISM"],correct:1,expl:"Revalidação STCW = procedimento a cada 5 anos para manter a validade de um certificado de competência. Exige: prova de serviço recente no mar (mínimo 12 meses em 5 anos) OU formação de atualização aprovada. Se certificado expirado = deve refazer toda a formação. Verificada pelo PSC durante as inspeções."},
    {q:"O que é o certificado GMDSS GOC?",opts:["Um certificado de rádio básico","Certificado Geral de Operador — certificação STCW para operar os equipamentos GMDSS em navios de navegação internacional","Um certificado reservado aos capitães","Um certificado de segurança SOLAS"],correct:1,expl:"GOC = General Operator Certificate. Requerido pelo STCW para qualquer oficial que opere os equipamentos GMDSS. Obrigatório em navios de navegação internacional. ROC (Restricted Operator Certificate) = versão limitada para navegação costeira."},
    {q:"O que é o 'BRM' (Gestão de Recursos da Ponte) no STCW?",opts:["Um tipo de radar","Competência STCW sobre trabalho de equipa, comunicação e tomada de decisão na ponte — introduzida pelas Emendas de Manila 2010","Um certificado de navegação","Um sistema de comunicação"],correct:1,expl:"BRM = Bridge Resource Management. Introduzido pelas Emendas de Manila 2010. Cobre: liderança, trabalho de equipa, comunicação eficaz, tomada de decisão sob pressão, consciência situacional. Obrigatório para capitães e primeiros oficiais."},
    {q:"O que é o certificado 'ETO' (Oficial Eletrotécnico)?",opts:["Um certificado elétrico básico","Nova certificação STCW criada pelas Emendas de Manila 2010 — oficial especializado em sistemas elétricos, eletrónicos e de controlo dos navios modernos","Um certificado de manutenção","Um certificado de proteção"],correct:1,expl:"ETO = Electro-Technical Officer. Novo certificado criado pelas Emendas de Manila 2010. Cobre: sistemas de alimentação elétrica, automação, instrumentos de navegação, sistemas de controlo. Obrigatório para os oficiais que desempenhem esta função em navios > 750 kW."},
    {q:"O que acontece se um marítimo navega sem certificado STCW válido?",opts:["Nada, é uma recomendação","Crime marítimo · multa pessoal · revogação do certificado · possível prisão · retenção do navio pelo PSC","Simples aviso verbal","Perda de bónus apenas"],correct:1,expl:"Navegar sem certificado STCW válido = infração grave. Consequências: 1) Para o marítimo: multa pessoal, revogação do certificado, possível prisão. 2) Para o capitão: responsabilidade por ter autorizado o embarque. 3) Para a companhia: violação ISM. 4) Para o navio: retenção PSC até regularização."},
    {q:"O que diz a Convenção STCW sobre a responsabilidade da companhia marítima?",opts:["A companhia não tem qualquer responsabilidade STCW","A companhia é responsável por garantir que todos os seus marítimos têm certificações STCW válidas antes do embarque e documentar esta verificação","Apenas o Estado de bandeira é responsável","Apenas o capitão é responsável"],correct:1,expl:"Responsabilidade da companhia (STCW Regra I/14): cada companhia marítima deve: 1) Garantir que cada marítimo tem certificação STCW válida adequada à sua função. 2) Documentar esta verificação no SMS (ISM). 3) Verificar a autenticidade dos certificados. Violação = infração ISM + responsabilidade penal da companhia."},
    {q:"O que é o 'PSCRB' no STCW?",opts:["Um certificado de navegação","Proficiency in Survival Craft and Rescue Boats — certificação para operar os botes e dispositivos de salvamento","Um certificado de chefe de máquinas","Um certificado de proteção"],correct:1,expl:"PSCRB = Proficiency in Survival Craft and Rescue Boats. STCW Capítulo VI, Regra VI/2. Obrigatório para oficiais e certos membros da tripulação responsáveis pelos botes e balsas. Cobre: arriamento, manobra do motor do bote, recuperação de náufragos, uso de equipamentos de sobrevivência. Validade 5 anos."},
    {q:"O que é a 'formação em simulador' requerida pelo STCW?",opts:["Uma recomendação opcional","Requisito STCW: certas certificações requerem obrigatoriamente formação em simulador aprovado — ARPA, ECDIS, simulador de máquinas","Um simples exercício teórico","Um teste informático básico"],correct:1,expl:"Formação em simulador STCW = obrigatória para certas certificações: ARPA, ECDIS, simulador de máquinas, BRM. O simulador deve ser aprovado pela autoridade marítima. Permite formação prática sem risco. O PSC pode verificar que a formação em simulador foi realizada num centro aprovado."},
    {q:"O que é o 'FPFF' (Prevenção e Combate a Incêndios) no STCW?",opts:["Um módulo do BST básico","Certificação STCW avançada de combate a incêndios — obrigatória para oficiais · inclui combates a incêndio práticos com equipamento completo","Um sistema de extinção fixo","Um certificado SOLAS"],correct:1,expl:"FPFF = Fire Prevention and Fire Fighting (Avançado). STCW Capítulo VI, Regra VI/3. Distinto do módulo FFP do BST (básico). FPFF avançada = obrigatória para os oficiais. Inclui: incêndio com equipamento completo (ARA), cenários reais simulados, comando de operações de incêndio."},
    {q:"Qual é a diferença entre a 'Regulamentação' e o 'Código' do STCW?",opts:["Nenhuma diferença","As Regulamentações (na Convenção) são os requisitos legais · O Código Parte A é obrigatório (normas mínimas) · O Código Parte B é recomendado","Apenas o Código é obrigatório","Apenas as Regulamentações são obrigatórias"],correct:1,expl:"Estrutura STCW: 1) Convenção STCW = quadro legal (Capítulos I-VIII). 2) Código STCW Parte A = normas de competência mínimas OBRIGATÓRIAS. 3) Código STCW Parte B = diretrizes recomendadas (não obrigatórias). A Parte A define os quadros de competências. O PSC verifica a conformidade com a Convenção E o Código Parte A."},
    {q:"O que é o 'serviço no mar' requerido pelo STCW?",opts:["Um estágio em terra","Período de serviço no mar em navio aprovado necessário para obter uma certificação STCW — registado num livrete de marítimo oficial","Um curso teórico marítimo","Formação em simulador"],correct:1,expl:"Serviço no mar = tempo de navegação em navio aprovado, registado no livrete de marítimo. Necessário para a maioria das certificações STCW. Ex.: OOW Ponte = 12 meses de serviço no mar. Primeiro Oficial = 18 meses. Capitão = 36 meses. Verificado pela autoridade marítima nacional."},
    {q:"O que é o 'Certificado Médico' (ENG1) e a sua ligação ao STCW?",opts:["Um certificado opcional","Certificado de aptidão médica obrigatório para todos os marítimos — condição prévia para obter e manter um certificado STCW","Um certificado de navegação","Um certificado de segurança"],correct:1,expl:"ENG1 = certificado médico de aptidão para a navegação. Obrigatório para embarcar. Emitido por médico aprovado de marinha. Verifica: visão, audição, saúde cardiovascular, aptidão física e mental. Validade: 2 anos (1 ano se > 55 anos). O PSC verifica a validade nas inspeções."},
    {q:"O que é o 'reconhecimento mútuo' das certificações STCW?",opts:["Um acordo bilateral entre 2 países","Mecanismo pelo qual os estados partes reconhecem as certificações STCW emitidas por outros estados partes na lista branca da IMO","Um certificado europeu específico","Um acordo comercial marítimo"],correct:1,expl:"Reconhecimento mútuo STCW = princípio fundamental. Um estado parte reconhece as certificações STCW de outro estado parte (se na lista branca). Permite aos marítimos navegar em navios que arvoram bandeiras diferentes da sua nacionalidade. Condições: estado emissor na lista branca IMO + certificado conforme ao Código STCW Parte A."},
    {q:"Qual é o 'dever de cuidado' da companhia para com os seus marítimos segundo STCW/MLC?",opts:["Uma obrigação moral apenas","Obrigação legal da companhia de proteger a saúde, segurança e bem-estar dos seus marítimos — inclui certificação, horas de descanso, condições de vida","Uma recomendação não obrigatória","Uma cláusula de contrato de trabalho"],correct:1,expl:"Dever de cuidado STCW/MLC = obrigação legal alargada da companhia. Inclui: fornecer marítimos devidamente certificados STCW, respeitar as horas de trabalho/descanso, garantir condições de vida dignas, médico disponível, repatriação garantida. Violação = ISM + MLC + STCW. O PSC pode reter o navio por não conformidade."},
    {q:"Qual é a 'responsabilidade do Estado de bandeira' em matéria de certificação STCW?",opts:["O Estado de bandeira não tem qualquer responsabilidade STCW","O Estado de bandeira é responsável por garantir que os navios sob a sua bandeira embarcam apenas marítimos devidamente certificados STCW — e estar na lista branca IMO","Apenas a companhia é responsável","Apenas o PSC é responsável"],correct:1,expl:"Responsabilidade do Estado de bandeira (STCW Regra I/6): deve estabelecer e manter um sistema nacional de formação e certificação conforme ao STCW. Deve estar na lista branca da IMO. Consequência do não cumprimento: remoção da lista branca → certificações não reconhecidas internacionalmente → navios retidos pelo PSC."},
  ],
};

function QuestionBank({ lang }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else setDone(true);};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,margin:"8px 0 4px"}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
    <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.teal},${C.gold2})`}}/></div>
    <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
      {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
    </div>
    {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
    <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.teal},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
  </div>);
}

function Stars(){const s=Array.from({length:14},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.teal}33,${C.gold2}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.teal}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.teal,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.teal:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.teal},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d={
    fr:{
      badge:"⚖️ Droit Maritime Int. · Leçon 3/10 · ⭐ Premium · 200 XP",
      title:"STCW — Formation, Certification & Responsabilités",
      intro:"Naviguer sans être qualifié, c'est comme opérer sans être médecin. STCW définit les compétences minimales obligatoires pour chaque marin. Ce n'est pas une bureaucratie — c'est la garantie que les personnes responsables de ta vie en mer sont réellement capables.\n\nCette leçon couvre l'histoire de STCW, les certifications, les heures de travail et les responsabilités juridiques.",
      p1:"PARTIE 1 — HISTOIRE DE STCW",s1t:"De 1978 aux Amendements de Manille 2010",
      s1:"STCW = Standards of Training, Certification and Watchkeeping\nConvention OMI adoptée en 1978\n\nÉVOLUTION :\n1978 → Convention originale (trop vague)\n1995 → Révision majeure + Code STCW\n2010 → Amendements de Manille (leadership, ETO, MLC)\n2017 → Code Polaire\n\nPRINCIPE : Harmoniser les compétences des marins\ndu monde entier — quel que soit leur pavillon\n\n163 États contractants · 164 sur la whitelist OMI\n1,6 million de marins certifiés STCW dans le monde",
      p2:"PARTIE 2 — CERTIFICATIONS STCW",s2t:"BST · OOW · Capitaine · Certifications spéciales",
      s2:"HIÉRARCHIE DES CERTIFICATIONS :\nBST → TOUS les marins (4 modules)\nOOW Pont → Officiers de quart pont\nOOW Machine → Officiers de quart machine\nChief Officer / Chief Engineer → Niveau opérationnel\nCaptaine / Chef mécanicien → Niveau gestion\n\nCERTIFICATIONS SPÉCIALES :\nGMDSS (GOC/ROC) · Tanker · Polaire\nFPFF avancée · PSCRB · ETO · BRM\n\nVALIDITÉ : 5 ans pour tous les certificats\nREVALIDATION obligatoire avant expiration",
      p3:"PARTIE 3 — HEURES DE TRAVAIL/REPOS",s1t:"STCW Chapitre VIII + MLC 2006",
      s3:"RÈGLES STCW/MLC 2006 :\nTravail max : 14h par 24h\nRepos min : 10h par 24h\nTravail max : 72h par semaine\nRepos min : 77h par semaine\n\nJOURNAL OBLIGATOIRE :\nSigné par l'officier + le capitaine\nVérifié par PSC\nFaux journal = crime maritime\n\nEXCEPTIONS LIMITÉES :\nSécurité urgente du navire · Exercices sécurité\n→ Compensées dans les 2 jours qui suivent",
      p4:"PARTIE 4 — RESPONSABILITÉS JURIDIQUES",s4t:"Marin · Capitaine · Compagnie · État du pavillon",
      s4:"QUI EST RESPONSABLE ?\nMarin : doit maintenir ses certifications valides\nCapitaine : responsable de vérifier les certs avant embarquement\nCompagnie (STCW I/14) : vérification + documentation\nÉtat du pavillon : système conforme + whitelist OMI\n\nSANCTIONS :\nNaviguer sans cert. valide = crime maritime\nCompagnie : infraction ISM + pénale\nCaptaine : responsabilité civile + pénale\n\nPSC VÉRIFIE :\nCertificats STCW · Journal heures · Médicaux",
      p5:"🎯 EXERCICES AVANCÉS PREMIUM",p6:"⚠️ CAS RÉEL",p7:"📝 BANQUE 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — STCW L3 DROIT MARITIME",
      sumP:["STCW 1978 · Révision 1995 · Amendements Manille 2010","BST = 4 modules · TOUS les marins · validité 5 ans","OOW Pont/Machine · Chief Officer/Engineer · Capitaine","Heures : max 14h travail/24h · min 10h repos","Journal heures = document légal · faux = crime","Compagnie STCW I/14 : vérifier + documenter certifications","Naviguer sans cert. STCW = crime maritime · PSC détient navire","MV Joola 2002 : 1863 morts · officiers non certifiés STCW"],
      learnedP:["STCW 1978 → Manille 2010 · 5 étapes historiques","BST 4 modules · OOW · Capitaine · certifications spéciales","Max 14h/24h · min 10h repos · journal obligatoire","Compagnie STCW I/14 · whitelist OMI · 5 ans validité","Joola 2002 · responsabilité juridique STCW"],
    },
    en:{
      badge:"⚖️ Int. Maritime Law · Lesson 3/10 · ⭐ Premium · 200 XP",
      title:"STCW — Training, Certification & Responsibilities",
      intro:"Sailing without being qualified is like performing surgery without being a doctor. STCW defines the mandatory minimum competencies for every seafarer. It's not bureaucracy — it's the guarantee that the people responsible for your life at sea are genuinely capable.",
      p1:"PART 1 — STCW HISTORY",s1t:"From 1978 to Manila Amendments 2010",
      s1:"STCW = Standards of Training, Certification and Watchkeeping\nIMO convention adopted in 1978\n\nEVOLUTION:\n1978 → Original convention (too vague)\n1995 → Major revision + STCW Code\n2010 → Manila Amendments (leadership, ETO, MLC)\n2017 → Polar Code\n\n163 contracting states · 164 on IMO whitelist\n1.6 million STCW-certified seafarers worldwide",
      p2:"PART 2 — STCW CERTIFICATIONS",s1t:"BST · OOW · Captain · Special certifications",
      s2:"CERTIFICATION HIERARCHY:\nBST → ALL seafarers (4 modules)\nOOW Deck → Deck watch officers\nOOW Engine → Engine watch officers\nChief Officer/Engineer → Operational level\nCaptain/Chief Engineer → Management level\n\nSPECIAL CERTIFICATIONS:\nGMDSS (GOC/ROC) · Tanker · Polar\nAdvanced FPFF · PSCRB · ETO · BRM\n\nVALIDITY: 5 years for all certificates",
      p3:"PART 3 — WORK/REST HOURS",s1t:"STCW Chapter VIII + MLC 2006",
      s3:"STCW/MLC 2006 RULES:\nMax work: 14h per 24h\nMin rest: 10h per 24h\nMax work: 72h per week\nMin rest: 77h per week\n\nMANDATORY LOG:\nSigned by officer + captain\nChecked by PSC\nFalse log = maritime crime",
      p4:"PART 4 — LEGAL RESPONSIBILITIES",s1t:"Seafarer · Captain · Company · Flag state",
      s4:"WHO IS RESPONSIBLE?\nSeafarer: must maintain valid certifications\nCaptain: responsible for verifying certs before embarkation\nCompany (STCW I/14): verification + documentation\nFlag state: compliant system + IMO whitelist\n\nSANCTIONS:\nSailing without valid cert = maritime crime\nPSC checks STCW certs · hours log · medical certs",
      p5:"🎯 ADVANCED PREMIUM EXERCISES",p6:"⚠️ REAL ACCIDENT CASE",p7:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY — STCW L3 MARITIME LAW",
      sumP:["STCW 1978 · Revision 1995 · Manila Amendments 2010","BST = 4 modules · ALL seafarers · 5-year validity","OOW Deck/Engine · Chief Officer/Engineer · Captain","Hours: max 14h work/24h · min 10h rest","Hours log = legal document · false = crime","Company STCW I/14: verify + document certifications","Sailing without STCW cert = maritime crime · PSC detains vessel","MV Joola 2002: 1,863 deaths · uncertified STCW officers"],
      learnedP:["STCW 1978 → Manila 2010 · 5 historical steps","BST 4 modules · OOW · Captain · special certifications","Max 14h/24h · min 10h rest · mandatory log","Company STCW I/14 · IMO whitelist · 5 years validity","Joola 2002 · STCW legal responsibility"],
    },
    es:{
      badge:"⚖️ Derecho Marítimo Int. · Lección 3/10 · ⭐ Premium · 200 XP",
      title:"STCW — Formación, Certificación y Responsabilidades",
      intro:"Navegar sin estar cualificado es como operar sin ser médico. STCW define las competencias mínimas obligatorias para cada marinero. No es burocracia — es la garantía de que las personas responsables de tu vida en el mar son realmente capaces.",
      p1:"PARTE 1 — HISTORIA DEL STCW",s1t:"De 1978 a las Enmiendas de Manila 2010",
      s1:"STCW 1978 · Revisión 1995 · Enmiendas Manila 2010 · Código Polar 2017\n163 estados contratantes · 164 en la lista blanca OMI",
      p2:"PARTE 2 — CERTIFICACIONES STCW",s1t:"BST · OOW · Capitán · Certificaciones especiales",
      s2:"JERARQUÍA:\nBST → TODOS los marineros (4 módulos)\nOOW Puente/Máquinas → Oficiales de guardia\nCapitán/Jefe máquinas → Nivel gestión\n\nVALIDEZ: 5 años · Revalidación obligatoria",
      p3:"PARTE 3 — HORAS DE TRABAJO/DESCANSO",s1t:"STCW Capítulo VIII + MLC 2006",
      s3:"Máx trabajo: 14h/24h · Mín descanso: 10h/24h\nMáx trabajo: 72h/semana · Mín descanso: 77h/semana\nRegistro OBLIGATORIO · firmado oficial + capitán",
      p4:"PARTE 4 — RESPONSABILIDADES JURÍDICAS",s1t:"Marinero · Capitán · Compañía · Estado pabellón",
      s4:"Compañía STCW I/14 : verificar + documentar certificaciones\nNavegar sin cert. = delito marítimo · PSC retiene buque",
      p5:"🎯 EJERCICIOS AVANZADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — STCW L3 DERECHO MARÍTIMO",
      sumP:["STCW 1978 · Revisión 1995 · Enmiendas Manila 2010","BST = 4 módulos · TODOS los marineros · validez 5 años","OOW Puente/Máquinas · Capitán · Certif. especiales","Horas: máx 14h trabajo/24h · mín 10h descanso","Registro horas = documento legal · falso = delito","Compañía STCW I/14: verificar + documentar certificaciones","Navegar sin cert. STCW = delito marítimo · PSC retiene buque","MV Joola 2002: 1.863 muertos · oficiales sin STCW"],
      learnedP:["STCW 1978 → Manila 2010","BST 4 módulos · OOW · Capitán · certif. especiales","Máx 14h/24h · mín 10h descanso · registro obligatorio","Compañía STCW I/14 · lista blanca OMI","Joola 2002 · responsabilidad jurídica STCW"],
    },
    pt:{
      badge:"⚖️ Direito Marítimo Int. · Lição 3/10 · ⭐ Premium · 200 XP",
      title:"STCW — Formação, Certificação e Responsabilidades",
      intro:"Navegar sem ser qualificado é como operar sem ser médico. O STCW define as competências mínimas obrigatórias para cada marítimo. Não é burocracia — é a garantia de que as pessoas responsáveis pela sua vida no mar são genuinamente capazes.",
      p1:"PARTE 1 — HISTÓRIA DO STCW",s1t:"De 1978 às Emendas de Manila 2010",
      s1:"STCW 1978 · Revisão 1995 · Emendas Manila 2010 · Código Polar 2017\n163 estados contratantes · 164 na lista branca IMO",
      p2:"PARTE 2 — CERTIFICAÇÕES STCW",s1t:"BST · OOW · Capitão · Certificações especiais",
      s2:"HIERARQUIA:\nBST → TODOS os marítimos (4 módulos)\nOOW Ponte/Máquinas → Oficiais de quarto\nCapitão/Chefe máquinas → Nível gestão\n\nVALIDADE: 5 anos · Revalidação obrigatória",
      p3:"PARTE 3 — HORAS DE TRABALHO/DESCANSO",s1t:"STCW Capítulo VIII + MLC 2006",
      s3:"Máx trabalho: 14h/24h · Mín descanso: 10h/24h\nMáx trabalho: 72h/semana · Mín descanso: 77h/semana\nRegisto OBRIGATÓRIO · assinado oficial + capitão",
      p4:"PARTE 4 — RESPONSABILIDADES JURÍDICAS",s1t:"Marítimo · Capitão · Companhia · Estado bandeira",
      s4:"Companhia STCW I/14 : verificar + documentar certificações\nNavegar sem cert. = crime marítimo · PSC retém navio",
      p5:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — STCW L3 DIREITO MARÍTIMO",
      sumP:["STCW 1978 · Revisão 1995 · Emendas Manila 2010","BST = 4 módulos · TODOS os marítimos · validade 5 anos","OOW Ponte/Máquinas · Capitão · Certif. especiais","Horas: máx 14h trabalho/24h · mín 10h descanso","Registo horas = documento legal · falso = crime","Companhia STCW I/14: verificar + documentar certificações","Navegar sem cert. STCW = crime marítimo · PSC retém navio","MV Joola 2002: 1.863 mortos · oficiais sem STCW"],
      learnedP:["STCW 1978 → Manila 2010","BST 4 módulos · OOW · Capitão · certif. especiais","Máx 14h/24h · mín 10h descanso · registo obrigatório","Companhia STCW I/14 · lista branca IMO","Joola 2002 · responsabilidade jurídica STCW"],
    },
  };
  return d[lang]||d.fr;
};

export default function LessonSTCW({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t=T[lang]||T.fr;const quiz=QUIZ[lang]||QUIZ.fr;const lc=getContent(lang);
  const [phase,setPhase]=useState("content");const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#040d12 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.teal}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.teal,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>⚖️ {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 3/10":lang==="en"?"Lesson 3/10":lang==="es"?"Lección 3/10":"Lição 3/10"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.teal,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.teal},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(10,138,108,0.15)",border:`1px solid ${C.teal}44`,fontSize:11,color:C.teal,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.teal}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>
            <SL icon="📅" text={lc.p1} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📅 {lang==="fr"?"TIMELINE STCW — INTERACTIF":lang==="en"?"STCW TIMELINE — INTERACTIVE":lang==="es"?"CRONOLOGÍA STCW — INTERACTIVO":"CRONOLOGIA STCW — INTERATIVO"}</div>
              <STCWTimelineSVG lang={lang}/>
            </Card>
            <SL icon="🎓" text={lc.p2} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.teal}33`}}>
              <div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🎓 {lang==="fr"?"CERTIFICATIONS STCW — INTERACTIF":lang==="en"?"STCW CERTIFICATIONS — INTERACTIVE":lang==="es"?"CERTIFICACIONES STCW — INTERACTIVO":"CERTIFICAÇÕES STCW — INTERATIVO"}</div>
              <CertTreeSVG lang={lang}/>
            </Card>
            <SL icon="⏰" text={lc.p3||"PARTIE 3 — HEURES TRAVAIL/REPOS"} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>⏰ {lang==="fr"?"SIMULATEUR HEURES STCW/MLC":lang==="en"?"STCW/MLC HOURS SIMULATOR":lang==="es"?"SIMULADOR HORAS STCW/MLC":"SIMULADOR HORAS STCW/MLC"}</div>
              <RestHoursSVG lang={lang}/>
            </Card>
            <SL icon="⚖️" text={lc.p4} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.green}33`}}>
              <div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔍 {lang==="fr"?"SIMULATEUR INSPECTION PSC CERTIFICATS":lang==="en"?"PSC CERTIFICATE INSPECTION SIMULATOR":lang==="es"?"SIMULADOR INSPECCIÓN PSC CERTIFICADOS":"SIMULADOR INSPEÇÃO PSC CERTIFICADOS"}</div>
              <PSCCertInspectorSVG lang={lang}/>
            </Card>
            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>
            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>
            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang}/></Card>
            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(10,138,108,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.teal}33`}}>
              <div style={{fontSize:11,color:C.teal,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.teal},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(10,138,108,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>Quiz — STCW</div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 3":lang==="en"?"Lesson 3":lang==="es"?"Lección 3":"Lição 3"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}
          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(10,138,108,0.15)",border:`1px solid ${C.teal}55`,fontSize:14,color:C.teal,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.teal},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(10,138,108,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 4 — MLC 2006 →":lang==="en"?"LESSON 4 — MLC 2006 →":lang==="es"?"LECCIÓN 4 — MLC 2006 →":"LIÇÃO 4 — MLC 2006 →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
