// @ts-nocheck
import { useState, useEffect } from "react";

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
// SVG 1 — MLC 5 TITLES INTERACTIVE
// ══════════════════════════════════════
function MLC5TitlesSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const titles = [
    { num:"1", icon:"💼", color:C.blue2,
      label:{fr:"Titre 1 — Conditions minimales",en:"Title 1 — Minimum requirements",es:"Título 1 — Requisitos mínimos",pt:"Título 1 — Requisitos mínimos"},
      content:{fr:"Âge minimum d'embarquement : 16 ans\n(18 ans pour travaux dangereux · travail de nuit)\nCertificat médical obligatoire (ENG1)\nFormation STCW obligatoire avant embarquement\nContrat de travail maritime (CTE) obligatoire\nSigné par le marin ET le capitaine ET l'armateur\nCopie remise au marin AVANT l'embarquement\nDurée maximale du contrat : 12 mois",en:"Minimum embarkation age: 16 years\n(18 years for hazardous work · night work)\nMandatory medical certificate (ENG1)\nMandatory STCW training before embarkation\nMaritime Employment Agreement (MEA) mandatory\nSigned by seafarer AND captain AND shipowner\nCopy given to seafarer BEFORE embarkation\nMaximum contract duration: 12 months",es:"Edad mínima de embarque: 16 años\n(18 años para trabajos peligrosos · trabajo nocturno)\nCertificado médico obligatorio (ENG1)\nFormación STCW obligatoria antes del embarque\nAcuerdo de Empleo Marítimo (AEM) obligatorio\nFirmado por el marinero Y el capitán Y el armador\nCopia entregada al marinero ANTES del embarque\nDuración máxima del contrato: 12 meses",pt:"Idade mínima de embarque: 16 anos\n(18 anos para trabalhos perigosos · trabalho noturno)\nCertificado médico obrigatório (ENG1)\nFormação STCW obrigatória antes do embarque\nAcordo de Trabalho Marítimo (ATM) obrigatório\nAssinado pelo marítimo E capitão E armador\nCópia entregue ao marítimo ANTES do embarque\nDuração máxima do contrato: 12 meses"}},
    { num:"2", icon:"💰", color:C.gold2,
      label:{fr:"Titre 2 — Conditions d'emploi",en:"Title 2 — Conditions of employment",es:"Título 2 — Condiciones de empleo",pt:"Título 2 — Condições de emprego"},
      content:{fr:"Salaire minimum IMO (mis à jour régulièrement)\nSalaire minimum 2024 : $673/mois (AB)\nPaiement mensuel OBLIGATOIRE\nVirement bancaire ou en espèces\nFiche de paie détaillée obligatoire\nHeures supplémentaires : 125% minimum du taux horaire\nCongés payés : 2,5 jours/mois minimum\n(= 30 jours par an)\nPermissions à terre garanties (shore leave)",en:"IMO minimum wage (regularly updated)\n2024 minimum wage: $673/month (AB)\nMonthly payment MANDATORY\nBank transfer or cash\nDetailed pay slip mandatory\nOvertime: 125% minimum of hourly rate\nPaid leave: 2.5 days/month minimum\n(= 30 days per year)\nGuaranteed shore leave",es:"Salario mínimo OMI (actualizado regularmente)\nSalario mínimo 2024: $673/mes (marinero ordinario)\nPago mensual OBLIGATORIO\nTransferencia bancaria o en efectivo\nNómina detallada obligatoria\nHoras extras: 125% mínimo de la tarifa por hora\nVacaciones pagadas: 2,5 días/mes mínimo\n(= 30 días por año)\nPermisos en tierra garantizados",pt:"Salário mínimo IMO (atualizado regularmente)\nSalário mínimo 2024: $673/mês (marinheiro)\nPagamento mensal OBRIGATÓRIO\nTransferência bancária ou em dinheiro\nRecibo de vencimento detalhado obrigatório\nHoras extra: 125% mínimo da taxa horária\nFérias pagas: 2,5 dias/mês mínimo\n(= 30 dias por ano)\nLicenças em terra garantidas"}},
    { num:"3", icon:"🛏️", color:C.teal,
      label:{fr:"Titre 3 — Logement, loisirs, alimentation",en:"Title 3 — Accommodation, recreation, food",es:"Título 3 — Alojamiento, recreo, alimentación",pt:"Título 3 — Alojamento, recreio, alimentação"},
      content:{fr:"LOGEMENT :\nCabine individuelle obligatoire\n(depuis MLC 2006 · sauf navires < 200 TB)\nSurface minimale : 4,5 m² (marin) · 7,5 m² (officier)\nClimatisation dans les zones tropicales\nDouche/WC individuel recommandé\n\nALIMENTATION :\nRepas gratuits OBLIGATOIRES\nQualité et quantité appropriées\nCuisinier qualifié obligatoire (> 10 marins)\n\nLOISIRS :\nAccès internet raisonnable recommandé\nSalle de récréation · équipements sportifs",en:"ACCOMMODATION:\nIndividual cabin mandatory\n(since MLC 2006 · except vessels < 200 GT)\nMinimum surface: 4.5 m² (rating) · 7.5 m² (officer)\nAir conditioning in tropical areas\nIndividual shower/WC recommended\n\nFOOD:\nFree meals MANDATORY\nAppropriate quality and quantity\nQualified cook mandatory (> 10 seafarers)\n\nRECREATION:\nReasonable internet access recommended\nRecreation room · sports equipment",es:"ALOJAMIENTO:\nCabina individual obligatoria\n(desde MLC 2006 · excepto buques < 200 TB)\nSuperficie mínima: 4,5 m² (marinero) · 7,5 m² (oficial)\nAire acondicionado en zonas tropicales\n\nALIMENTACIÓN:\nComidas gratuitas OBLIGATORIAS\nCalidad y cantidad apropiadas\nCocinero cualificado obligatorio (> 10 marineros)\n\nRECREO:\nAcceso razonable a internet recomendado",pt:"ALOJAMENTO:\nCabine individual obrigatória\n(desde MLC 2006 · exceto navios < 200 AB)\nSuperfície mínima: 4,5 m² (marinheiro) · 7,5 m² (oficial)\nAr condicionado em zonas tropicais\n\nALIMENTAÇÃO:\nRefeições gratuitas OBRIGATÓRIAS\nQualidade e quantidade adequadas\nCozinheiro qualificado obrigatório (> 10 marítimos)\n\nRECREIO:\nAcesso razoável à internet recomendado"}},
    { num:"4", icon:"🏥", color:C.green,
      label:{fr:"Titre 4 — Protection santé, soins médicaux",en:"Title 4 — Health protection, medical care",es:"Título 4 — Protección salud, atención médica",pt:"Título 4 — Proteção saúde, cuidados médicos"},
      content:{fr:"SOINS MÉDICAUX À BORD :\nTrousse médicale complète obligatoire\nOfficier médical désigné (capitaine ou 2ème officier)\nConsultation radio avec médecin à terre (CIRM)\nEvacuation médicale si nécessaire\n\nSOINS À TERRE :\nFrais médicaux payés par l'armateur\nDurée : jusqu'à 16 semaines après l'accident\n\nSÉCURITÉ SOCIALE :\nCouverture maladie · accident · invalidité · décès\nAllocation maladie minimum 16 semaines\nIndemnisation accident du travail maritime",en:"MEDICAL CARE ON BOARD:\nComplete medical kit mandatory\nDesignated medical officer (captain or 2nd officer)\nRadio consultation with shore doctor (CIRM)\nMedical evacuation if necessary\n\nSHORE MEDICAL CARE:\nMedical costs paid by shipowner\nDuration: up to 16 weeks after accident\n\nSOCIAL SECURITY:\nSickness · accident · disability · death coverage\nMinimum 16 weeks sick pay\nMaritime occupational accident compensation",es:"ATENCIÓN MÉDICA A BORDO:\nBotiquín médico completo obligatorio\nOficial médico designado (capitán o 2° oficial)\nConsulta radio con médico en tierra (CIRM)\nEvacuación médica si es necesario\n\nATENCIÓN EN TIERRA:\nGastos médicos pagados por el armador\nDuración: hasta 16 semanas tras el accidente\n\nSEGURIDAD SOCIAL:\nCobertura enfermedad · accidente · invalidez · defunción",pt:"CUIDADOS MÉDICOS A BORDO:\nEstojo médico completo obrigatório\nOficial médico designado (capitão ou 2° oficial)\nConsulta rádio com médico em terra (CIRM)\nEvacuação médica se necessário\n\nCUIDADOS EM TERRA:\nDespesas médicas pagas pelo armador\nDuração: até 16 semanas após o acidente\n\nSEGURANÇA SOCIAL:\nCobertura doença · acidente · invalidez · morte"}},
    { num:"5", icon:"✅", color:C.purple,
      label:{fr:"Titre 5 — Conformité & exécution",en:"Title 5 — Compliance & enforcement",es:"Título 5 — Conformidad y aplicación",pt:"Título 5 — Conformidade e execução"},
      content:{fr:"DMLC (Declaration of Maritime Labour Compliance)\nPartie I : État du pavillon (exigences nationales)\nPartie II : Compagnie (mise en œuvre à bord)\n\nMLCC (Maritime Labour Certificate)\nValidité : 5 ans\nInspection intermédiaire obligatoire\n\nPSC :\nInspection MLC lors des escales\nInterrogation des marins (droit de plainte)\nDétention navire si violation grave\n\nMÉCANISME DE PLAINTE :\nMarin peut porter plainte SANS représailles\nDirectement au PSC si nécessaire\nProtection contre le licenciement abusif",en:"DMLC (Declaration of Maritime Labour Compliance)\nPart I: Flag state (national requirements)\nPart II: Company (on-board implementation)\n\nMLCC (Maritime Labour Certificate)\nValidity: 5 years\nMandatory intermediate inspection\n\nPSC:\nMLC inspection during port calls\nSeafarer interviews (right of complaint)\nVessel detention for serious violations\n\nCOMPLAINT MECHANISM:\nSeafarer can complain WITHOUT retaliation\nDirectly to PSC if necessary\nProtection against wrongful dismissal",es:"DMLC (Declaración de Cumplimiento del Trabajo Marítimo)\nParte I: Estado de pabellón (requisitos nacionales)\nParte II: Compañía (aplicación a bordo)\n\nCTM (Certificado de Trabajo Marítimo)\nValidez: 5 años\nInspección intermedia obligatoria\n\nPSC:\nInspección MLC durante las escalas\nEntrevistas a marineros (derecho de queja)\nRetención del buque por infracción grave\n\nMECANISMO DE QUEJA:\nEl marinero puede quejarse SIN represalias\nDirectamente al PSC si es necesario",pt:"DMLC (Declaração de Conformidade do Trabalho Marítimo)\nParte I: Estado de bandeira (requisitos nacionais)\nParte II: Companhia (implementação a bordo)\n\nCTM (Certificado de Trabalho Marítimo)\nValidade: 5 anos\nInspeção intermédia obrigatória\n\nPSC:\nInspeção MLC durante as escalas\nEntrevistas aos marítimos (direito de queixa)\nRetenção do navio por violação grave\n\nMECANISMO DE QUEIXA:\nMarítimo pode queixar-se SEM represálias\nDiretamente ao PSC se necessário"},},
  ];
  const sel_ = sel!==null ? titles[sel] : null;
  return (
    <div>
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {titles.map((ti,i)=>(
          <button key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            flex:1,padding:"10px 4px",borderRadius:12,cursor:"pointer",textAlign:"center",
            background:sel===i?`${ti.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${sel===i?ti.color:"rgba(255,255,255,0.08)"}`,
            display:"flex",flexDirection:"column",alignItems:"center",gap:3,
          }}>
            <span style={{fontSize:18}}>{ti.icon}</span>
            <div style={{fontSize:8,color:sel===i?ti.color:C.muted,fontWeight:700}}>T.{ti.num}</div>
          </button>
        ))}
      </div>
      {sel_?(
        <div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
          <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:8}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
          <div style={{fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>{sel_.content[lang]||sel_.content.fr}</div>
        </div>
      ):(
        <div style={{textAlign:"center",padding:"12px",fontSize:11,color:C.muted}}>
          {lang==="fr"?"Touche un titre pour les détails":lang==="en"?"Tap a title for details":"Toca un título para detalles"}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — SEAFARER RIGHTS CHECKER
// ══════════════════════════════════════
function RightsCheckerSVG({ lang }) {
  const [violations, setViolations] = useState([]);
  const rights = [
    { id:"salary", icon:"💰", color:C.gold2,
      label:{fr:"Salaire payé à temps",en:"Salary paid on time",es:"Salario pagado a tiempo",pt:"Salário pago a tempo"},
      violated:{fr:"❌ VIOLATION MLC Titre 2 · Salaire non payé = abandon équipage · Droit de quitter le navire · PSC peut retenir le navire · Armateur : amende + frais rapatriement",en:"❌ MLC Title 2 VIOLATION · Unpaid salary = crew abandonment · Right to leave vessel · PSC can detain vessel · Shipowner: fine + repatriation costs",es:"❌ INFRACCIÓN MLC Título 2 · Salario no pagado = abandono tripulación · Derecho a abandonar el buque · PSC puede retener el buque · Armador: multa + gastos repatriación",pt:"❌ VIOLAÇÃO MLC Título 2 · Salário não pago = abandono tripulação · Direito de abandonar o navio · PSC pode reter o navio · Armador: multa + custos repatriamento"},
      ok:{fr:"✅ Conforme MLC — salaire versé dans les délais",en:"✅ MLC compliant — salary paid on time",es:"✅ Conforme MLC — salario pagado en el plazo",pt:"✅ Conforme MLC — salário pago no prazo"}},
    { id:"hours", icon:"⏰", color:C.orange,
      label:{fr:"Heures repos respectées",en:"Rest hours respected",es:"Horas descanso respetadas",pt:"Horas descanso respeitadas"},
      violated:{fr:"❌ VIOLATION STCW/MLC · Fatigue excessive = risque sécurité · Journal heures incomplet = obstruction · PSC : amende + détention navire · Capitaine : responsabilité personnelle",en:"❌ STCW/MLC VIOLATION · Excessive fatigue = safety risk · Incomplete hours log = obstruction · PSC: fine + vessel detention · Captain: personal liability",es:"❌ INFRACCIÓN STCW/MLC · Fatiga excesiva = riesgo seguridad · Registro horas incompleto = obstrucción · PSC: multa + retención buque · Capitán: responsabilidad personal",pt:"❌ VIOLAÇÃO STCW/MLC · Fadiga excessiva = risco segurança · Registo horas incompleto = obstrução · PSC: multa + retenção navio · Capitão: responsabilidade pessoal"},
      ok:{fr:"✅ Conforme — 10h repos/24h respectées",en:"✅ Compliant — 10h rest/24h respected",es:"✅ Conforme — 10h descanso/24h respetadas",pt:"✅ Conforme — 10h descanso/24h respeitadas"}},
    { id:"medical", icon:"🏥", color:C.green,
      label:{fr:"Soins médicaux disponibles",en:"Medical care available",es:"Atención médica disponible",pt:"Cuidados médicos disponíveis"},
      violated:{fr:"❌ VIOLATION MLC Titre 4 · Armateur responsable des frais médicaux · Si urgence : évacuation immédiate obligatoire · Refus de soins = crime maritime",en:"❌ MLC Title 4 VIOLATION · Shipowner responsible for medical costs · If emergency: immediate evacuation mandatory · Refusal of care = maritime crime",es:"❌ INFRACCIÓN MLC Título 4 · Armador responsable de gastos médicos · Si urgencia: evacuación inmediata obligatoria · Negativa de atención = delito marítimo",pt:"❌ VIOLAÇÃO MLC Título 4 · Armador responsável pelas despesas médicas · Se urgência: evacuação imediata obrigatória · Recusa de cuidados = crime marítimo"},
      ok:{fr:"✅ Conforme — soins et trousse médicale à jour",en:"✅ Compliant — care and medical kit up to date",es:"✅ Conforme — atención y botiquín al día",pt:"✅ Conforme — cuidados e estojo médico atualizados"}},
    { id:"food", icon:"🍽️", color:C.teal,
      label:{fr:"Nourriture gratuite et suffisante",en:"Free and sufficient food",es:"Alimentación gratuita y suficiente",pt:"Alimentação gratuita e suficiente"},
      violated:{fr:"❌ VIOLATION MLC Titre 3 · Repas payants = interdit · Qualité insuffisante = violation MLC · Marin peut refuser de travailler si conditions sanitaires insuffisantes",en:"❌ MLC Title 3 VIOLATION · Paid meals = prohibited · Insufficient quality = MLC violation · Seafarer can refuse to work if sanitary conditions are insufficient",es:"❌ INFRACCIÓN MLC Título 3 · Comidas de pago = prohibido · Calidad insuficiente = infracción MLC · Marinero puede negarse a trabajar si condiciones sanitarias insuficientes",pt:"❌ VIOLAÇÃO MLC Título 3 · Refeições pagas = proibido · Qualidade insuficiente = violação MLC · Marítimo pode recusar trabalhar se condições sanitárias insuficientes"},
      ok:{fr:"✅ Conforme — repas gratuits fournis",en:"✅ Compliant — free meals provided",es:"✅ Conforme — comidas gratuitas proporcionadas",pt:"✅ Conforme — refeições gratuitas fornecidas"}},
    { id:"repatriation", icon:"✈️", color:C.purple,
      label:{fr:"Rapatriement garanti",en:"Repatriation guaranteed",es:"Repatriación garantizada",pt:"Repatriação garantida"},
      violated:{fr:"❌ VIOLATION GRAVE MLC Titre 2 · Abandon d'équipage = crime international · État du port DOIT assister le marin abandonné · Fonds ITF pour rapatriement d'urgence · Armateur blacklisté mondialement",en:"❌ SERIOUS MLC Title 2 VIOLATION · Crew abandonment = international crime · Port state MUST assist abandoned seafarer · ITF fund for emergency repatriation · Shipowner globally blacklisted",es:"❌ INFRACCIÓN GRAVE MLC Título 2 · Abandono de tripulación = delito internacional · Estado del puerto DEBE asistir al marinero abandonado · Fondo ITF para repatriación de emergencia · Armador en lista negra mundial",pt:"❌ VIOLAÇÃO GRAVE MLC Título 2 · Abandono de tripulação = crime internacional · Estado do porto DEVE assistir o marítimo abandonado · Fundo ITF para repatriamento de emergência · Armador em lista negra mundial"},
      ok:{fr:"✅ Conforme — rapatriement prévu au contrat",en:"✅ Compliant — repatriation included in contract",es:"✅ Conforme — repatriación prevista en el contrato",pt:"✅ Conforme — repatriamento previsto no contrato"}},
  ];

  const toggle = (id) => setViolations(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);
  const vCount = violations.length;

  return (
    <div>
      <div style={{padding:"8px 12px",borderRadius:10,marginBottom:10,
        background:vCount===0?"rgba(30,138,74,0.08)":vCount>=3?"rgba(192,57,43,0.1)":"rgba(230,126,34,0.08)",
        border:`1px solid ${vCount===0?C.green:vCount>=3?C.red:C.orange}33`,
        fontSize:10,color:vCount===0?C.green:vCount>=3?C.red:C.orange,fontWeight:700,textAlign:"center"}}>
        {vCount===0
          ?(lang==="fr"?"✅ Navire conforme MLC 2006":lang==="en"?"✅ MLC 2006 compliant vessel":"✅ Buque conforme MLC 2006")
          :(lang==="fr"?`⚠️ ${vCount} violation(s) MLC détectée(s)`:lang==="en"?`⚠️ ${vCount} MLC violation(s) detected`:`⚠️ ${vCount} infracción(es) MLC detectada(s)`)}
      </div>
      <div style={{fontSize:10,color:C.muted,marginBottom:8,textAlign:"center"}}>
        {lang==="fr"?"Touche pour marquer une violation":lang==="en"?"Tap to mark a violation":"Toca para marcar una infracción"}
      </div>
      {rights.map((r,i)=>{
        const isViolated = violations.includes(r.id);
        return (
          <div key={i} onClick={()=>toggle(r.id)} style={{
            padding:"10px 12px",borderRadius:12,marginBottom:7,cursor:"pointer",
            background:isViolated?`${C.red}10`:`${r.color}08`,
            border:`1.5px solid ${isViolated?C.red:r.color}44`,
          }}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:isViolated?6:0}}>
              <span style={{fontSize:18}}>{r.icon}</span>
              <div style={{flex:1,fontSize:11,fontWeight:700,color:isViolated?C.red:r.color}}>
                {r.label[lang]||r.label.fr}
              </div>
              <div style={{width:22,height:22,borderRadius:"50%",
                background:isViolated?C.red:`${r.color}22`,
                border:`1.5px solid ${isViolated?C.red:r.color}`,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:10,color:C.white,fontWeight:700}}>
                {isViolated?"✗":"✓"}
              </div>
            </div>
            {isViolated&&(
              <div style={{fontSize:10,color:C.red,lineHeight:1.5,whiteSpace:"pre-line",
                padding:"6px 8px",borderRadius:6,background:"rgba(192,57,43,0.08)",animation:"fadeUp 0.2s ease"}}>
                {r.violated[lang]||r.violated.fr}
              </div>
            )}
          </div>
        );
      })}
      {vCount>=3&&(
        <div style={{marginTop:8,padding:"10px 12px",borderRadius:10,
          background:"rgba(192,57,43,0.12)",border:`1px solid ${C.red}44`,
          fontSize:11,color:C.red,fontWeight:700,textAlign:"center"}}>
          🔴 {lang==="fr"?"PSC peut immobiliser le navire immédiatement":lang==="en"?"PSC can immediately detain the vessel":"PSC puede inmovilizar el buque inmediatamente"}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — ACCOMMODATION STANDARDS
// ══════════════════════════════════════
function AccommodationSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const standards = [
    { id:"cabin", icon:"🛏️", color:C.blue2,
      label:{fr:"Cabine individuelle",en:"Individual cabin",es:"Cabina individual",pt:"Cabine individual"},
      standard:{fr:"OBLIGATOIRE depuis MLC 2006\nSurface minimale :\n• Marin : 4,5 m² minimum\n• Officier : 7,5 m² minimum\n• Capitaine : 14,5 m² (salon + chambre)\nFenêtre ou hublot obligatoire\nChauffage ET climatisation (zones tropicales)\nVerrou intérieur obligatoire",en:"MANDATORY since MLC 2006\nMinimum surface:\n• Rating: 4.5 m² minimum\n• Officer: 7.5 m² minimum\n• Captain: 14.5 m² (sitting room + bedroom)\nPorthole or window mandatory\nHeating AND air conditioning (tropical areas)\nInside lock mandatory",es:"OBLIGATORIA desde MLC 2006\nSuperficie mínima:\n• Marinero: 4,5 m² mínimo\n• Oficial: 7,5 m² mínimo\n• Capitán: 14,5 m² (sala de estar + dormitorio)\nVentana u ojo de buey obligatorio\nCalefacción Y aire acondicionado (zonas tropicales)\nCerradura interior obligatoria",pt:"OBRIGATÓRIA desde MLC 2006\nSuperfície mínima:\n• Marinheiro: 4,5 m² mínimo\n• Oficial: 7,5 m² mínimo\n• Capitão: 14,5 m² (sala + quarto)\nVigia ou janela obrigatória\nAquecimento E ar condicionado (zonas tropicais)\nFechadura interior obrigatória"}},
    { id:"sanitary", icon:"🚿", color:C.teal,
      label:{fr:"Sanitaires",en:"Sanitary facilities",es:"Instalaciones sanitarias",pt:"Instalações sanitárias"},
      standard:{fr:"Douche/bain accessible 24h/24\n1 WC pour 6 personnes maximum\nEau chaude et froide obligatoire\nVentilation des espaces sanitaires\nSanitaires recommandés individuels pour officiers\nNettoyage régulier = responsabilité armateur",en:"Shower/bath accessible 24/7\n1 WC per 6 persons maximum\nHot and cold water mandatory\nSanitary space ventilation\nIndividual sanitary facilities recommended for officers\nRegular cleaning = shipowner responsibility",es:"Ducha/baño accesible 24h/24\n1 WC por 6 personas máximo\nAgua caliente y fría obligatoria\nVentilación de espacios sanitarios\nInstalaciones individuales recomendadas para oficiales\nLimpieza regular = responsabilidad del armador",pt:"Duche/banho acessível 24h/24\n1 WC por 6 pessoas máximo\nÁgua quente e fria obrigatória\nVentilação dos espaços sanitários\nInstalações individuais recomendadas para oficiais\nLimpeza regular = responsabilidade do armador"}},
    { id:"galley", icon:"🍳", color:C.orange,
      label:{fr:"Cuisine et réfectoire",en:"Galley and mess room",es:"Cocina y comedor",pt:"Cozinha e refeitório"},
      standard:{fr:"Cuisinier qualifié OBLIGATOIRE (si > 10 marins)\nRepas gratuits et de qualité\n3 repas par jour minimum\nRéfectoire séparé de la cuisine\nÉquipement adapté au nombre de marins\nStock de nourriture pour 7 jours minimum\nEau potable disponible 24h/24",en:"Qualified cook MANDATORY (if > 10 seafarers)\nFree quality meals\n3 meals per day minimum\nMess room separate from galley\nEquipment adapted to crew numbers\nFood stock for minimum 7 days\nDrinking water available 24/7",es:"Cocinero cualificado OBLIGATORIO (si > 10 marineros)\nComidas gratuitas y de calidad\n3 comidas por día mínimo\nComedor separado de la cocina\nEquipos adaptados al número de marineros\nStock de alimentos para 7 días mínimo\nAgua potable disponible 24h/24",pt:"Cozinheiro qualificado OBRIGATÓRIO (se > 10 marítimos)\nRefeições gratuitas e de qualidade\n3 refeições por dia mínimo\nRefeitório separado da cozinha\nEquipamento adaptado ao número de marítimos\nStock de alimentos para 7 dias mínimo\nÁgua potável disponível 24h/24"}},
    { id:"recreation", icon:"🎮", color:C.purple,
      label:{fr:"Espaces loisirs",en:"Recreation areas",es:"Espacios de recreo",pt:"Espaços de lazer"},
      standard:{fr:"Salle de loisirs commune obligatoire\nAccès internet RAISONNABLE recommandé\n(coût raisonnable ou gratuit)\nBibliothèque / TV / équipements sportifs\nShore leave (permissions à terre) garanties\nLiaisons téléphoniques à prix raisonnable\nDroit de contact avec la famille garanti",en:"Common recreation room mandatory\nReasonable internet access RECOMMENDED\n(reasonable cost or free)\nLibrary / TV / sports equipment\nShore leave guaranteed\nTelephone connections at reasonable price\nRight of contact with family guaranteed",es:"Sala de recreo común obligatoria\nAcceso razonable a internet RECOMENDADO\n(coste razonable o gratuito)\nBiblioteca / TV / equipos deportivos\nPermisos en tierra garantizados\nComunicaciones telefónicas a precio razonable\nDerecho de contacto con la familia garantizado",pt:"Sala de recreio comum obrigatória\nAcesso razoável à internet RECOMENDADO\n(custo razoável ou gratuito)\nBiblioteca / TV / equipamentos desportivos\nLicenças em terra garantidas\nComunicações telefónicas a preço razoável\nDireito de contacto com a família garantido"}},
  ];
  const sel_ = sel!==null ? standards[sel] : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {standards.map((s,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)}
            style={{padding:"12px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===i?`${s.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===i?s.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:24,marginBottom:4}}>{s.icon}</div>
            <div style={{fontSize:9,color:sel===i?s.color:C.muted,fontWeight:700,lineHeight:1.3}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>{sel_.standard[lang]||sel_.standard.fr}</div>
      </div>:<div style={{textAlign:"center",padding:"10px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche un élément pour les standards":lang==="en"?"Tap an element for standards":"Toca un elemento para los estándares"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — PSC MLC INSPECTION SIMULATOR
// ══════════════════════════════════════
function PSCMLCInspectionSVG({ lang }) {
  const [phase, setPhase] = useState("idle");
  const [step, setStep] = useState(0);
  const [issues, setIssues] = useState([]);

  const checks = [
    { id:"dmlc", icon:"📜", color:C.blue2,
      label:{fr:"DMLC + MLCC valides",en:"DMLC + MLCC valid",es:"DMLC + CTMC válidos",pt:"DMLC + CTMC válidos"},
      result:{fr:"✅ Documents valides — conformes MLC 2006",en:"✅ Valid documents — MLC 2006 compliant",es:"✅ Documentos válidos — conformes MLC 2006",pt:"✅ Documentos válidos — conformes MLC 2006"},ok:true},
    { id:"salary", icon:"💰", color:C.gold2,
      label:{fr:"Registre de salaires",en:"Salary register",es:"Registro de salarios",pt:"Registo de salários"},
      result:{fr:"⚠️ DÉFICIENCE : 3 marins non payés depuis 2 mois",en:"⚠️ DEFICIENCY: 3 seafarers unpaid for 2 months",es:"⚠️ DEFICIENCIA: 3 marineros sin pagar desde hace 2 meses",pt:"⚠️ DEFICIÊNCIA: 3 marítimos sem receber há 2 meses"},ok:false},
    { id:"hours", icon:"⏰", color:C.orange,
      label:{fr:"Journal heures travail/repos",en:"Work/rest hours log",es:"Registro horas trabajo/descanso",pt:"Registo horas trabalho/descanso"},
      result:{fr:"✅ Journal conforme STCW/MLC",en:"✅ Log compliant STCW/MLC",es:"✅ Registro conforme STCW/MLC",pt:"✅ Registo conforme STCW/MLC"},ok:true},
    { id:"cabin", icon:"🛏️", color:C.teal,
      label:{fr:"Inspection cabines",en:"Cabin inspection",es:"Inspección cabinas",pt:"Inspeção cabines"},
      result:{fr:"⚠️ DÉFICIENCE : 4 marins en cabine double (violation MLC Titre 3)",en:"⚠️ DEFICIENCY: 4 seafarers in shared cabin (MLC Title 3 violation)",es:"⚠️ DEFICIENCIA: 4 marineros en cabina doble (infracción MLC Título 3)",pt:"⚠️ DEFICIÊNCIA: 4 marítimos em cabine dupla (violação MLC Título 3)"},ok:false},
    { id:"food", icon:"🍽️", color:C.green,
      label:{fr:"Qualité alimentation",en:"Food quality",es:"Calidad alimentación",pt:"Qualidade alimentação"},
      result:{fr:"✅ Alimentation conforme MLC",en:"✅ Food MLC compliant",es:"✅ Alimentación conforme MLC",pt:"✅ Alimentação conforme MLC"},ok:true},
    { id:"complaint", icon:"📋", color:C.purple,
      label:{fr:"Procédure de plainte",en:"Complaint procedure",es:"Procedimiento de queja",pt:"Procedimento de queixa"},
      result:{fr:"⚠️ DÉFICIENCE GRAVE : aucune procédure de plainte affichée à bord",en:"⚠️ SERIOUS DEFICIENCY: no complaint procedure posted on board",es:"⚠️ DEFICIENCIA GRAVE: ningún procedimiento de queja expuesto a bordo",pt:"⚠️ DEFICIÊNCIA GRAVE: nenhum procedimento de queixa afixado a bordo"},ok:false},
  ];

  const serious = issues.length;
  const isDetained = serious >= 2;

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
          <div style={{fontSize:40,marginBottom:8}}>👷</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:12,lineHeight:1.5}}>
            {lang==="fr"?"Inspection PSC — Volet MLC 2006\nNavire cargo · Port de Singapour":lang==="en"?"PSC Inspection — MLC 2006 section\nCargo vessel · Port of Singapore":"Inspección PSC — Sección MLC 2006\nBuque de carga · Puerto de Singapur"}
          </div>
          <button onClick={()=>setPhase("inspecting")} style={{padding:"12px 24px",borderRadius:12,background:`linear-gradient(135deg,${C.green},${C.teal})`,border:"none",color:C.white,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
            👷 {lang==="fr"?"LANCER INSPECTION MLC":lang==="en"?"START MLC INSPECTION":"INICIAR INSPECCIÓN MLC"}
          </button>
        </div>
      )}
      {(phase==="inspecting"||phase==="done")&&(
        <div>
          <div style={{marginBottom:8,padding:"6px 10px",borderRadius:8,
            background:phase==="done"?(isDetained?"rgba(192,57,43,0.15)":issues.length>0?"rgba(230,126,34,0.1)":"rgba(30,138,74,0.1)"):"rgba(10,138,108,0.1)",
            border:`1px solid ${phase==="done"?(isDetained?C.red:issues.length>0?C.orange:C.green):C.teal}33`,
            fontSize:10,fontWeight:700,
            color:phase==="done"?(isDetained?C.red:issues.length>0?C.orange:C.green):C.teal,textAlign:"center"}}>
            {phase==="inspecting"
              ?(lang==="fr"?"👷 Inspection MLC en cours...":lang==="en"?"👷 MLC inspection in progress...":"👷 Inspección MLC en curso...")
              :isDetained
                ?(lang==="fr"?"🔴 NAVIRE RETENU — 3 violations MLC graves":lang==="en"?"🔴 VESSEL DETAINED — 3 serious MLC violations":"🔴 BUQUE RETENIDO — 3 infracciones MLC graves")
                :(lang==="fr"?"⚠️ VIOLATIONS MINEURES — Corriger avant prochain port":lang==="en"?"⚠️ MINOR VIOLATIONS — Correct before next port":"⚠️ INFRACCIONES MENORES — Corregir antes del próximo puerto")}
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
// ACCIDENT CASE — CREW ABANDONMENT
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"Abandon d'équipage MV Aman — Maroc (2009)",teaser:"Cargo · 18 marins abandonnés · Armateur disparu · ITF intervient · MLC accélérée",what:"Le cargo MV Aman est abandonné dans le port de Casablanca avec 18 marins à bord. L'armateur a disparu sans payer les salaires depuis 4 mois ni organiser le rapatriement. Les marins, sans argent ni nourriture, sont piégés à bord. L'ITF et les autorités marocaines doivent intervenir.",cause:"• Armateur insolvable ayant disparu\n• Aucune assurance P&I valide\n• Salaires non payés depuis 4 mois\n• Pas de nourriture · pas de carburant\n• Rapatriement non organisé\n• Aucune procédure de plainte à bord\n• État du pavillon défaillant (pas sur whitelist STCW)",lessons:"✓ MLC 2006 crée l'obligation d'assurance financière pour abandonnement\n✓ État du port DOIT aider les marins abandonnés\n✓ Fonds ITF = rapatriement d'urgence sans attendre l'armateur\n✓ Résultat : accélération adoption MLC 2006 (2013)\n✓ Amendements MLC 2014 : garantie financière obligatoire pour abandonement\n✓ Marin abandonné = droit de quitter le navire + salaires arriérés",link:"🔗 Lien L4 MLC : L'abandon d'équipage est la violation MLC la plus grave. Des milliers de marins sont abandonnés chaque année. La MLC 2006 et ses amendements créent des obligations légales fortes — mais l'application reste insuffisante dans certains États."},
    en:{title:"Crew Abandonment MV Aman — Morocco (2009)",teaser:"Cargo · 18 seafarers abandoned · Shipowner vanished · ITF intervenes · MLC accelerated",what:"The cargo vessel MV Aman is abandoned in the port of Casablanca with 18 seafarers on board. The shipowner vanished without paying wages for 4 months or organizing repatriation. The seafarers, without money or food, are trapped on board. ITF and Moroccan authorities must intervene.",cause:"• Insolvent shipowner who disappeared\n• No valid P&I insurance\n• Wages unpaid for 4 months\n• No food · no fuel\n• Repatriation not organized\n• No complaint procedure on board\n• Defective flag state (not on STCW whitelist)",lessons:"✓ MLC 2006 creates mandatory financial guarantee for abandonment\n✓ Port state MUST help abandoned seafarers\n✓ ITF Fund = emergency repatriation without waiting for shipowner\n✓ Result: accelerated adoption of MLC 2006 (2013)\n✓ MLC 2014 amendments: mandatory financial guarantee for abandonment\n✓ Abandoned seafarer = right to leave vessel + back wages",link:"🔗 L4 MLC Link: Crew abandonment is the most serious MLC violation. Thousands of seafarers are abandoned every year. MLC 2006 and its amendments create strong legal obligations — but enforcement remains insufficient in some states."},
    es:{title:"Abandono de tripulación MV Aman — Marruecos (2009)",teaser:"Carguero · 18 marineros abandonados · Armador desaparecido · ITF interviene · MLC acelerada",what:"El carguero MV Aman es abandonado en el puerto de Casablanca con 18 marineros a bordo. El armador ha desaparecido sin pagar los salarios desde hace 4 meses ni organizar la repatriación.",cause:"• Armador insolvente que desapareció\n• Sin seguro P&I válido\n• Salarios impagados desde hace 4 meses\n• Sin comida · sin combustible\n• Repatriación no organizada\n• Sin procedimiento de queja a bordo",lessons:"✓ MLC 2006 crea la obligación de garantía financiera para el abandono\n✓ El Estado del puerto DEBE ayudar a los marineros abandonados\n✓ Fondo ITF = repatriación de emergencia sin esperar al armador\n✓ Resultado: adopción acelerada de la MLC 2006 (2013)\n✓ Marinero abandonado = derecho a abandonar el buque + salarios atrasados",link:"🔗 Vínculo L4: El abandono de tripulación es la infracción MLC más grave. Miles de marineros son abandonados cada año. La MLC 2006 y sus enmiendas crean fuertes obligaciones legales."},
    pt:{title:"Abandono de tripulação MV Aman — Marrocos (2009)",teaser:"Cargueiro · 18 marítimos abandonados · Armador desaparecido · ITF intervém · MLC acelerada",what:"O cargueiro MV Aman é abandonado no porto de Casablanca com 18 marítimos a bordo. O armador desapareceu sem pagar os salários há 4 meses nem organizar a repatriação.",cause:"• Armador insolvente que desapareceu\n• Sem seguro P&I válido\n• Salários não pagos há 4 meses\n• Sem comida · sem combustível\n• Repatriação não organizada\n• Sem procedimento de queixa a bordo",lessons:"✓ MLC 2006 cria a obrigação de garantia financeira para abandono\n✓ Estado do porto DEVE ajudar os marítimos abandonados\n✓ Fundo ITF = repatriamento de emergência sem aguardar o armador\n✓ Resultado: adoção acelerada da MLC 2006 (2013)\n✓ Marítimo abandonado = direito de abandonar o navio + salários em atraso",link:"🔗 Vínculo L4: O abandono de tripulação é a violação MLC mais grave. Milhares de marítimos são abandonados todos os anos. A MLC 2006 e as suas emendas criam fortes obrigações legais."},
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
      {id:"q1",q:"MLC 2006 est surnommée le '4ème pilier' du droit maritime. Citez les 3 autres conventions.\n(Répondre : ex. 'SOLAS, MARPOL, STCW')",correct:"SOLAS MARPOL STCW"},
      {id:"q2",q:"Salaire minimum MLC pour un marin ordinaire (AB) en 2024 ?\n(Répondre : en dollars/mois)",correct:"673"},
      {id:"q3",q:"Combien de jours de congés payés par mois minimum selon MLC ?\n(Répondre : ex. '2.5 jours')",correct:"2.5"},
    ],
    en:[
      {id:"q1",q:"MLC 2006 is called the '4th pillar' of maritime law. Name the other 3 conventions.\n(Answer: e.g. 'SOLAS, MARPOL, STCW')",correct:"SOLAS MARPOL STCW"},
      {id:"q2",q:"MLC minimum wage for an able seaman (AB) in 2024?\n(Answer: in dollars/month)",correct:"673"},
      {id:"q3",q:"How many days of paid leave per month minimum per MLC?\n(Answer: e.g. '2.5 days')",correct:"2.5"},
    ],
    es:[
      {id:"q1",q:"La MLC 2006 se llama el '4° pilar' del derecho marítimo. Nombra los otros 3 convenios.\n(Responder: ej. 'SOLAS, MARPOL, STCW')",correct:"SOLAS MARPOL STCW"},
      {id:"q2",q:"¿Salario mínimo MLC para un marinero ordinario (MO) en 2024?\n(Responder: en dólares/mes)",correct:"673"},
      {id:"q3",q:"¿Cuántos días de vacaciones pagadas al mes como mínimo según MLC?\n(Responder: ej. '2,5 días')",correct:"2.5"},
    ],
    pt:[
      {id:"q1",q:"A MLC 2006 é chamada o '4° pilar' do direito marítimo. Nomeie as outras 3 convenções.\n(Responder: ex. 'SOLAS, MARPOL, STCW')",correct:"SOLAS MARPOL STCW"},
      {id:"q2",q:"Salário mínimo MLC para um marinheiro comum (MO) em 2024?\n(Responder: em dólares/mês)",correct:"673"},
      {id:"q3",q:"Quantos dias de férias pagas por mês no mínimo segundo a MLC?\n(Responder: ex. '2,5 dias')",correct:"2.5"},
    ],
  };
  const list=qs[lang]||qs.fr;
  const chk=(q,val)=>{
    const v=val.trim().toLowerCase();
    if(q.id==="q1") return v.includes("solas")&&(v.includes("marpol")||v.includes("stcw"));
    if(q.id==="q2") return v.includes("673");
    if(q.id==="q3") return v.includes("2.5")||v.includes("2,5");
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.green}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : 4 piliers = SOLAS+MARPOL+STCW+MLC · Salaire min $673/mois · Congés 2,5j/mois"
        :lang==="en"?"💡 Reminders: 4 pillars = SOLAS+MARPOL+STCW+MLC · Min wage $673/month · Leave 2.5d/month"
        :lang==="es"?"💡 Recordatorios: 4 pilares = SOLAS+MARPOL+STCW+MLC · Salario mín $673/mes · Vacaciones 2,5d/mes"
        :"💡 Lembretes: 4 pilares = SOLAS+MARPOL+STCW+MLC · Salário mín $673/mês · Férias 2,5d/mês"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:14,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q,ans[q.id])?C.green:C.red}}>{chk(q,ans[q.id])?"✓":`✗ → ${q.correct}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7,marginBottom:10}}>
        {lang==="fr"?"✅ Q1: SOLAS + MARPOL + STCW (les 4 grandes conventions maritimes OMI/OIT)\n✅ Q2: $673/mois (salaire minimum AB · mis à jour régulièrement par l'OMI)\n✅ Q3: 2,5 jours/mois minimum (= 30 jours de congés payés par an)"
        :lang==="en"?"✅ Q1: SOLAS + MARPOL + STCW (the 4 major maritime conventions IMO/ILO)\n✅ Q2: $673/month (minimum AB wage · regularly updated by IMO)\n✅ Q3: 2.5 days/month minimum (= 30 days paid leave per year)"
        :"✅ Q1: SOLAS + MARPOL + STCW · Q2: $673/mes · Q3: 2,5 días/mes"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}


const QUIZ = {
  fr:[
    {q:"Quelle organisation a adopté la Convention MLC 2006 ?",opts:["OMI (Organisation Maritime Internationale)","OIT (Organisation Internationale du Travail)","ONU (Organisation des Nations Unies)","OMC (Organisation Mondiale du Commerce)"],correct:1,expl:"MLC 2006 = adoptée par l'OIT (Organisation Internationale du Travail / ILO) en février 2006 lors de la 94ème session de la Conférence Internationale du Travail à Genève. Entrée en vigueur le 20 août 2013. L'OIT est une agence de l'ONU distincte de l'OMI (qui gère SOLAS, MARPOL, STCW, COLREG). La MLC = 4ème pilier du droit maritime avec SOLAS + MARPOL + STCW."},
    {q:"Quel est le salaire minimum mensuel MLC pour un marin ordinaire (AB) en 2024 ?",opts:["$500","$614","$673","$750"],correct:2,expl:"Salaire minimum MLC 2024 : $673/mois pour un marin ordinaire qualifié (AB - Able-Bodied Seaman). Ce montant est fixé par la Commission Paritaire Maritime de l'OIT et mis à jour régulièrement. Il constitue le plancher mondial — les conventions collectives nationales ou sectorielles peuvent prévoir des salaires supérieurs. Le non-paiement = violation MLC Titre 2 + retenue PSC possible."},
    {q:"Combien de jours de congés payés minimum par mois un marin a-t-il droit selon MLC 2006 ?",opts:["1 jour","1,5 jour","2,5 jours","3 jours"],correct:2,expl:"MLC 2006 Titre 2 : minimum 2,5 jours de congés payés par mois (= 30 jours par an). Calculés sur base du temps de navigation effectif. Les congés non pris peuvent être reportés. Paiement des congés = 100% du salaire. Les accords collectifs peuvent prévoir plus. Le non-respect = infraction MLC + PSC peut retenir le navire."},
    {q:"Qu'est-ce que l'abandon d'équipage en droit maritime MLC ?",opts:["Un marin qui quitte le navire sans permission","Situation où l'armateur cesse de payer les salaires, n'assure pas la nourriture et ne rapatrie pas les marins — violation grave MLC","Un licenciement normal d'un marin","Un marin qui déserte pendant une escale"],correct:1,expl:"Abandon d'équipage (crew abandonment) = violation grave MLC Titre 2. L'armateur 'abandonne' quand il : cesse de payer les salaires (> 1 mois), ne fournit plus la nourriture/eau, ne paie pas le rapatriement. Conséquences : État du port DOIT assister les marins abandonnés, fonds ITF pour rapatriement d'urgence, armateur blacklisté. Amendements MLC 2014 : assurance financière obligatoire contre l'abandon."},
    {q:"Le certificat MLC principal s'appelle :",opts:["SOLAS Safety Certificate","Maritime Labour Certificate (MLC Certificate) + DMLC","ISM Certificate","PSC Certificate"],correct:1,expl:"Le navire doit avoir : 1) MLCC (Maritime Labour Compliance Certificate / Certificat de Travail Maritime) = validité 5 ans + inspection intermédiaire. 2) DMLC (Declaration of Maritime Labour Compliance) en 2 parties : Partie I (État du pavillon) + Partie II (Compagnie). Ensemble, ces documents certifient la conformité à MLC 2006. Vérifiés par PSC lors des inspections portuaires."},
  ],
  en:[
    {q:"Which organization adopted the MLC 2006 Convention?",opts:["IMO (International Maritime Organization)","ILO (International Labour Organization)","UN (United Nations)","WTO (World Trade Organization)"],correct:1,expl:"MLC 2006 = adopted by the ILO (International Labour Organization) in February 2006 at the 94th session of the International Labour Conference in Geneva. Entry into force August 20, 2013. The ILO is a UN agency separate from IMO (which manages SOLAS, MARPOL, STCW, COLREG). MLC = 4th pillar of maritime law with SOLAS + MARPOL + STCW."},
    {q:"What is the MLC monthly minimum wage for an able seaman (AB) in 2024?",opts:["$500","$614","$673","$750"],correct:2,expl:"MLC 2024 minimum wage: $673/month for a qualified able seaman (AB). Set by the ILO's Joint Maritime Commission and regularly updated. It is the global floor — national or sectoral collective agreements may provide higher wages. Non-payment = MLC Title 2 violation + possible PSC detention."},
    {q:"How many minimum days of paid leave per month does a seafarer have under MLC 2006?",opts:["1 day","1.5 days","2.5 days","3 days"],correct:2,expl:"MLC 2006 Title 2: minimum 2.5 days paid leave per month (= 30 days per year). Calculated on actual navigation time. Unused leave can be carried forward. Holiday pay = 100% of salary. Collective agreements may provide more. Non-compliance = MLC violation + PSC can detain vessel."},
    {q:"What is crew abandonment in MLC maritime law?",opts:["A seafarer who leaves vessel without permission","Situation where shipowner stops paying wages, stops providing food and does not repatriate seafarers — serious MLC violation","Normal dismissal of a seafarer","A seafarer who deserts during a port call"],correct:1,expl:"Crew abandonment = serious MLC Title 2 violation. Shipowner 'abandons' when: stops paying wages (> 1 month), no longer provides food/water, does not pay repatriation. Consequences: port state MUST assist abandoned seafarers, ITF fund for emergency repatriation, shipowner blacklisted. MLC 2014 amendments: mandatory financial guarantee against abandonment."},
    {q:"The main MLC certificate is called:",opts:["SOLAS Safety Certificate","Maritime Labour Certificate (MLC Certificate) + DMLC","ISM Certificate","PSC Certificate"],correct:1,expl:"The vessel must have: 1) MLCC (Maritime Labour Compliance Certificate) = 5-year validity + intermediate inspection. 2) DMLC (Declaration of Maritime Labour Compliance) in 2 parts: Part I (flag state) + Part II (company). Together, these documents certify MLC 2006 compliance. Checked by PSC during port inspections."},
  ],
  es:[
    {q:"¿Qué organización adoptó el Convenio MLC 2006?",opts:["OMI (Organización Marítima Internacional)","OIT (Organización Internacional del Trabajo)","ONU (Organización de las Naciones Unidas)","OMC (Organización Mundial del Comercio)"],correct:1,expl:"MLC 2006 = adoptada por la OIT (Organización Internacional del Trabajo) en febrero de 2006 durante la 94ª sesión de la Conferencia Internacional del Trabajo en Ginebra. Entrada en vigor el 20 de agosto de 2013. La OIT es una agencia de la ONU distinta de la OMI. La MLC = 4° pilar del derecho marítimo junto con SOLAS + MARPOL + STCW."},
    {q:"¿Cuál es el salario mínimo mensual MLC para un marinero ordinario (MO) en 2024?",opts:["$500","$614","$673","$750"],correct:2,expl:"Salario mínimo MLC 2024: $673/mes para un marinero ordinario cualificado (AB). Fijado por la Comisión Paritaria Marítima de la OIT y actualizado regularmente. Constituye el piso mundial. El impago = infracción MLC Título 2 + posible retención PSC."},
    {q:"¿Cuántos días mínimos de vacaciones pagadas al mes tiene derecho un marinero según MLC 2006?",opts:["1 día","1,5 días","2,5 días","3 días"],correct:2,expl:"MLC 2006 Título 2: mínimo 2,5 días de vacaciones pagadas al mes (= 30 días al año). Calculados sobre la base del tiempo de navegación efectivo. El incumplimiento = infracción MLC + el PSC puede retener el buque."},
    {q:"¿Qué es el abandono de tripulación en derecho marítimo MLC?",opts:["Un marinero que abandona el buque sin permiso","Situación en la que el armador deja de pagar salarios, no proporciona comida y no repatría a los marineros — infracción grave MLC","Un despido normal de un marinero","Un marinero que deserta durante una escala"],correct:1,expl:"Abandono de tripulación = infracción grave MLC Título 2. El armador 'abandona' cuando: deja de pagar salarios (> 1 mes), ya no proporciona comida/agua, no paga la repatriación. Consecuencias: Estado del puerto DEBE asistir a los marineros abandonados, fondo ITF para repatriación de emergencia, armador en lista negra."},
    {q:"El certificado MLC principal se llama:",opts:["Certificado de seguridad SOLAS","Certificado de Trabajo Marítimo (CTM) + DCTM","Certificado ISM","Certificado PSC"],correct:1,expl:"El buque debe tener: 1) CTM (Certificado de Trabajo Marítimo) = validez 5 años + inspección intermedia. 2) DCTM (Declaración de Cumplimiento del Trabajo Marítimo) en 2 partes: Parte I (Estado de pabellón) + Parte II (Compañía). Verificados por el PSC durante las inspecciones portuarias."},
  ],
  pt:[
    {q:"Que organização adotou a Convenção MLC 2006?",opts:["IMO (Organização Marítima Internacional)","OIT (Organização Internacional do Trabalho)","ONU (Organização das Nações Unidas)","OMC (Organização Mundial do Comércio)"],correct:1,expl:"MLC 2006 = adotada pela OIT (Organização Internacional do Trabalho) em fevereiro de 2006 na 94ª sessão da Conferência Internacional do Trabalho em Genebra. Entrada em vigor a 20 de agosto de 2013. A OIT é uma agência da ONU distinta da IMO. A MLC = 4° pilar do direito marítimo com SOLAS + MARPOL + STCW."},
    {q:"Qual é o salário mínimo mensal MLC para um marinheiro comum (MO) em 2024?",opts:["$500","$614","$673","$750"],correct:2,expl:"Salário mínimo MLC 2024: $673/mês para um marinheiro comum qualificado (AB). Fixado pela Comissão Paritária Marítima da OIT e atualizado regularmente. Constitui o piso mundial. O não pagamento = violação MLC Título 2 + possível retenção PSC."},
    {q:"Quantos dias mínimos de férias pagas por mês tem direito um marítimo segundo a MLC 2006?",opts:["1 dia","1,5 dias","2,5 dias","3 dias"],correct:2,expl:"MLC 2006 Título 2: mínimo 2,5 dias de férias pagas por mês (= 30 dias por ano). Calculados com base no tempo de navegação efetivo. O não cumprimento = violação MLC + PSC pode reter o navio."},
    {q:"O que é o abandono de tripulação no direito marítimo MLC?",opts:["Um marítimo que abandona o navio sem permissão","Situação em que o armador deixa de pagar salários, não fornece comida e não repatria os marítimos — violação grave MLC","Um despedimento normal de um marítimo","Um marítimo que deserta durante uma escala"],correct:1,expl:"Abandono de tripulação = violação grave MLC Título 2. O armador 'abandona' quando: deixa de pagar salários (> 1 mês), já não fornece comida/água, não paga a repatriação. Consequências: estado do porto DEVE assistir os marítimos abandonados, fundo ITF para repatriamento de emergência, armador em lista negra."},
    {q:"O principal certificado MLC chama-se:",opts:["Certificado de segurança SOLAS","Certificado de Trabalho Marítimo (CTM) + DCTM","Certificado ISM","Certificado PSC"],correct:1,expl:"O navio deve ter: 1) CTM (Certificado de Trabalho Marítimo) = validade 5 anos + inspeção intermédia. 2) DCTM (Declaração de Conformidade do Trabalho Marítimo) em 2 partes: Parte I (Estado de bandeira) + Parte II (Companhia). Verificados pelo PSC durante as inspeções portuárias."},
  ],
};

const BANK = {
  fr:[
    {q:"Qu'est-ce que l'ITF (International Transport Workers' Federation) dans le contexte MLC ?",opts:["Un syndicat de transport terrestre","Fédération syndicale internationale des gens de mer — inspecte les navires, aide les marins abandonnés, négocie les conventions collectives","Un organisme de l'OMI","Un assureur maritime"],correct:1,expl:"ITF = International Transport Workers' Federation. Fédération syndicale internationale basée à Londres. Rôle MLC : inspecte les navires dans les ports pour vérifier les salaires et conditions de travail, aide les marins abandonnés (fonds de rapatriement d'urgence), négocie les CBAs (Collective Bargaining Agreements) avec les armateurs. Inspecteurs ITF dans 100+ ports mondiaux."},
    {q:"Qu'est-ce que la 'CBA' (Collective Bargaining Agreement) dans le contexte MLC ?",opts:["Un contrat individuel de travail","Convention collective négociée entre syndicats (ITF) et armateurs — peut prévoir des conditions supérieures au minimum MLC","Un certificat de compétence","Un contrat d'assurance"],correct:1,expl:"CBA = Collective Bargaining Agreement (Convention Collective). Négociée entre l'ITF ou syndicats nationaux et les armateurs/associations d'armateurs. Peut prévoir des salaires, congés et conditions supérieurs au minimum MLC. Certains armateurs signent des CBAs ITF = leurs navires ont le drapeau ITF bleu. Les inspecteurs ITF vérifient que la CBA est bien appliquée à bord."},
    {q:"Qu'est-ce que la 'shore leave' (permission à terre) garantie par MLC ?",opts:["Un droit facultatif","Droit fondamental MLC — le marin a le droit de descendre à terre lors des escales, sauf raison de sécurité · l'armateur ne peut l'interdire sans raison valable","Un avantage contractuel","Un droit réservé aux officiers"],correct:1,expl:"Shore leave = permission à terre. Droit fondamental MLC Titre 2. Le marin a le droit de descendre à terre dans les ports d'escale. L'armateur ne peut l'interdire sauf : raisons de sécurité du navire, restrictions portuaires (ISPS, douane). Refus injustifié = violation MLC. Aussi inclut l'accès aux communications (téléphone, internet)."},
    {q:"Qu'est-ce que le 'rapatriement' garanti par MLC Titre 2 ?",opts:["Un voyage de tourisme payé par l'armateur","Droit du marin à être renvoyé à ses frais chez lui à la fin du contrat, en cas de maladie ou d'abandon — transport + bagages payés par l'armateur","Un avantage négocié","Un droit uniquement pour les officiers"],correct:1,expl:"Rapatriement MLC = droit fondamental. L'armateur DOIT payer le retour du marin : en fin de contrat, en cas de maladie/blessure, en cas d'abandon, si le navire arrive dans une zone de guerre. Inclut : transport jusqu'au pays d'origine ou lieu d'engagement, hébergement si nécessaire, bagages. Non-paiement = violation grave MLC + détention navire possible."},
    {q:"Qu'est-ce que le mécanisme de plainte MLC à bord ?",opts:["Un formulaire interne uniquement","Procédure obligatoire permettant au marin de déposer plainte sans représailles — d'abord en interne, puis directement au PSC si nécessaire","Un syndicat à bord","Une procédure réservée aux capitaines"],correct:1,expl:"Mécanisme de plainte MLC = procédure obligatoire (MLC Titre 5). Étapes : 1) Plainte au supérieur hiérarchique ou officier désigné à bord. 2) Si non résolue : au capitaine. 3) Si non résolue : directement à l'État du port (PSC) lors d'une escale. Protection TOTALE contre les représailles. Affichage obligatoire de la procédure à bord. L'absence de procédure = déficience MLC."},
    {q:"Qu'est-ce que la 'responsabilité de la compagnie' pour le bien-être des marins selon MLC ?",opts:["Responsabilité morale uniquement","Obligation légale étendue : salaires · logement · nourriture · médecine · rapatriement · sécurité sociale — engagée même si le navire est sous-affrété","Responsabilité du capitaine uniquement","Responsabilité de l'État du pavillon uniquement"],correct:1,expl:"Responsabilité compagnie MLC = obligation légale étendue (MLC Titre 5, Règle 5.1). La compagnie (pas seulement l'armateur) est responsable de : salaires, logement, nourriture, soins médicaux, rapatriement, sécurité sociale. Cette responsabilité s'applique même si le navire est sous contrat d'affrètement ou géré par un tiers."},
    {q:"Qu'est-ce que la 'garantie financière' obligatoire introduite par les amendements MLC 2014 ?",opts:["Une assurance cargo","Assurance obligatoire que chaque armateur doit souscrire pour couvrir : abandon équipage + indemnisation décès et invalidité","Une assurance navire","Un fonds de pension maritime"],correct:1,expl:"Amendements MLC 2014 (en vigueur depuis 2017) : deux nouvelles garanties financières obligatoires. 1) Garantie contre l'abandon : couvre salaires arriérés (max 4 mois) + rapatriement si armateur disparaît. 2) Garantie indemnisation décès/invalidité : couvre les marins blessés ou tués. Certificat d'assurance doit être à bord et accessible aux marins. P&I Clubs ou assureurs spécialisés délivrent ces garanties."},
    {q:"Qu'est-ce que la 'fatigue des marins' et son lien avec MLC/STCW ?",opts:["Un problème médical personnel","Risque de sécurité documenté lié au non-respect des heures de repos — cause d'accidents maritimes + violation STCW/MLC","Un problème de ressources humaines","Une condition non couverte par les conventions"],correct:1,expl:"Fatigue des marins = facteur humain de sécurité majeur. Causée par : heures de repos insuffisantes (violation STCW/MLC), équipages sous-dimensionnés, navigation intensive. Conséquences : erreurs de navigation, accidents du travail, catastrophes maritimes. MLC + STCW VIII fixent des limites pour prévenir la fatigue. Les syndicats (ITF) et l'OMI travaillent à des règles de minimum safe manning plus strictes."},
    {q:"Qu'est-ce que le 'minimum safe manning' (effectif minimal de sécurité) ?",opts:["Le nombre minimum de stewards","Nombre minimum d'officiers et membres d'équipage requis pour naviguer en sécurité selon SOLAS — déterminé par l'État du pavillon · affiché à bord","Le salaire minimum","Le nombre de passagers"],correct:1,expl:"Minimum safe manning = document SOLAS Chapitre V. Fixe le nombre minimum de membres d'équipage pour opérer le navire en toute sécurité. Délivré par l'État du pavillon selon : taille du navire, type, zone de navigation, équipements. Affiché à bord. PSC vérifie que le nombre réel d'équipage ≥ minimum. Sous-effectif = violation SOLAS + retenue PSC."},
    {q:"Qu'est-ce que la 'couverture médicale' obligatoire sous MLC Titre 4 ?",opts:["Une assurance optionnelle","Obligation légale : l'armateur paie les soins médicaux du marin jusqu'à 16 semaines après un accident de travail maritime · y compris les frais d'hospitalisation à terre","Une couverture réservée aux officiers","Une couverture uniquement en mer"],correct:1,expl:"Couverture médicale MLC Titre 4 : l'armateur est responsable des frais médicaux (traitement + médicaments + hospitalisation) pendant la durée du contrat ET jusqu'à 16 semaines après la fin du contrat si la maladie/blessure est liée au travail. Indemnité maladie : salaire maintenu pendant 16 semaines minimum. Si décès en mer : rapatriement du corps + indemnisation famille."},
    {q:"Qu'est-ce que la 'black list' ITF (liste noire) des armateurs ?",opts:["Une liste des navires en panne","Liste des armateurs qui ont violé les droits des marins — publiée par l'ITF · pression internationale pour boycott et contrôles renforcés","Une liste douanière","Une liste de l'OMI"],correct:1,expl:"Liste noire ITF = répertoire des armateurs et compagnies qui ont commis des violations graves des droits des marins : non-paiement des salaires, conditions de vie indignes, abandon d'équipage. Publiée et mise à jour régulièrement par l'ITF. Effet : boycott dans les ports, contrôles PSC renforcés, pression médiatique. Outil efficace de pression sur les armateurs défaillants."},
    {q:"Qu'est-ce que le 'port welfare committee' dans le contexte MLC ?",opts:["Un comité portuaire commercial","Comité local d'aide aux marins en escale — fourni assistance pratique (transports, contacts, aide d'urgence) · souvent géré par des associations caritatives","Un comité PSC","Un comité syndical"],correct:1,expl:"Port Welfare Committee = comité local de bien-être des marins (MLC Titre 4). Composé d'associations caritatives, organismes religieux, syndicats, autorités portuaires. Fournit : transport pour les marins en escale, accès à des équipements (internet, sport), aide d'urgence (abandon, maladie). Ex : Apostleship of the Sea, Mission to Seafarers, Seamen's Church Institute. Présent dans les grands ports mondiaux."},
    {q:"Qu'est-ce que le 'contrat de travail maritime' (CTE/SEA) obligatoire sous MLC ?",opts:["Un contrat d'affrètement","Contrat individuel obligatoire entre le marin et l'armateur — doit inclure salaire, durée, rapatriement, conditions — remis en mains propres AVANT l'embarquement","Un contrat collectif","Un contrat de formation"],correct:1,expl:"SEA (Seafarer's Employment Agreement) / CTE (Contrat de Travail d'Embarquement) = contrat individuel obligatoire MLC Titre 2. Doit contenir : nom et date de naissance du marin, nom du navire, lieu et date d'engagement, salaire, durée ou date de fin, congés payés, conditions de rapatriement. Signé par le marin ET l'armateur (ou son représentant). Copie remise AVANT l'embarquement. Durée maximale : 12 mois."},
    {q:"Qu'est-ce que la 'responsabilité du recruteur' sous MLC Titre 1 ?",opts:["Une responsabilité morale","Les agences de recrutement de marins sont responsables des violations MLC commises par les armateurs pour lesquels elles recrutent — co-responsabilité","Un règlement interne","Une recommandation non obligatoire"],correct:1,expl:"MLC Titre 1, Règle 1.4 : responsabilité des agences de placement. Les agences de recrutement de marins doivent : être agréées par l'État, ne pas facturer les marins pour leur placement, vérifier que l'armateur est conforme MLC. Si l'armateur viole MLC, l'agence peut être tenue co-responsable. Interdit : facturer le marin pour les services de placement."},
    {q:"Qu'est-ce que la 'liste blanche MLC' des États ?",opts:["La liste des ports MLC conformes","Liste des États dont les lois nationales sont reconnues conformes à MLC 2006 par l'OIT — permet la 'reconnaissance mutuelle' des documents MLC","La liste des navires MLC conformes","La liste des armateurs certifiés MLC"],correct:1,expl:"Whitelist MLC = liste des États dont la législation nationale a été reconnue équivalente à MLC 2006 par l'OIT. Permet la reconnaissance mutuelle des documents MLC. Si un État n'est pas sur la whitelist, ses documents MLC peuvent être refusés par le PSC. Mise à jour par l'OIT. Complément de la whitelist STCW de l'OMI."},
  ],
  en:[
    {q:"What is the ITF (International Transport Workers' Federation) in the MLC context?",opts:["A land transport union","International seafarer trade union federation — inspects vessels, helps abandoned seafarers, negotiates collective agreements","An IMO body","A maritime insurer"],correct:1,expl:"ITF = International Transport Workers' Federation. International trade union federation based in London. MLC role: inspects vessels in ports to verify wages and working conditions, helps abandoned seafarers (emergency repatriation fund), negotiates CBAs (Collective Bargaining Agreements) with shipowners. ITF inspectors in 100+ ports worldwide."},
    {q:"What is a 'CBA' (Collective Bargaining Agreement) in the MLC context?",opts:["An individual employment contract","Collective agreement negotiated between unions (ITF) and shipowners — may provide conditions above MLC minimum","A competency certificate","An insurance contract"],correct:1,expl:"CBA = Collective Bargaining Agreement. Negotiated between ITF or national unions and shipowners/shipowner associations. May provide wages, leave and conditions above MLC minimum. Some shipowners sign ITF CBAs = their vessels fly the blue ITF flag. ITF inspectors verify the CBA is properly applied on board."},
    {q:"What is 'shore leave' guaranteed by MLC?",opts:["An optional right","Fundamental MLC right — seafarer has the right to go ashore during port calls, unless security reasons · shipowner cannot prohibit it without valid reason","A contractual benefit","A right reserved for officers"],correct:1,expl:"Shore leave = Fundamental MLC Title 2 right. Seafarer has the right to go ashore at port calls. Shipowner can only prohibit for: vessel security reasons, port restrictions (ISPS, customs). Unjustified refusal = MLC violation. Also includes access to communications (phone, internet)."},
    {q:"What is 'repatriation' guaranteed by MLC Title 2?",opts:["A tourism trip paid by shipowner","Seafarer's right to be sent home at no cost at end of contract, illness or abandonment — transport + baggage paid by shipowner","A negotiated benefit","A right for officers only"],correct:1,expl:"MLC repatriation = fundamental right. Shipowner MUST pay seafarer's return: end of contract, illness/injury, abandonment, if vessel enters war zone. Includes: transport to country of origin or place of engagement, accommodation if needed, baggage. Non-payment = serious MLC violation + possible vessel detention."},
    {q:"What is the MLC on-board complaint mechanism?",opts:["An internal form only","Mandatory procedure allowing seafarer to file complaint without retaliation — first internally, then directly to PSC if necessary","A union on board","A procedure reserved for captains"],correct:1,expl:"MLC complaint mechanism = mandatory procedure (MLC Title 5). Steps: 1) Complaint to line supervisor or designated officer on board. 2) If unresolved: to captain. 3) If unresolved: directly to port state (PSC) during port call. FULL protection against retaliation. Mandatory posting of procedure on board. Absence of procedure = MLC deficiency."},
    {q:"What is the company's responsibility for seafarer welfare under MLC?",opts:["Moral responsibility only","Extended legal obligation: wages · accommodation · food · medicine · repatriation · social security — applies even if vessel is sub-chartered","Captain's responsibility only","Flag state's responsibility only"],correct:1,expl:"Company MLC responsibility = extended legal obligation (MLC Title 5, Rule 5.1). Company (not just shipowner) is responsible for: wages, accommodation, food, medical care, repatriation, social security. This responsibility applies even if vessel is on charter or managed by a third party."},
    {q:"What is the mandatory 'financial guarantee' introduced by MLC 2014 amendments?",opts:["Cargo insurance","Mandatory insurance each shipowner must take out to cover: crew abandonment + death and disability compensation","Vessel insurance","A maritime pension fund"],correct:1,expl:"MLC 2014 amendments (in force since 2017): two new mandatory financial guarantees. 1) Abandonment guarantee: covers back wages (max 4 months) + repatriation if shipowner disappears. 2) Death/disability compensation guarantee: covers injured or killed seafarers. Insurance certificate must be on board and accessible to seafarers. P&I Clubs or specialized insurers issue these guarantees."},
    {q:"What is 'seafarer fatigue' and its link to MLC/STCW?",opts:["A personal medical problem","Documented safety risk linked to non-compliance with rest hours — cause of maritime accidents + STCW/MLC violation","An HR problem","A condition not covered by conventions"],correct:1,expl:"Seafarer fatigue = major human safety factor. Caused by: insufficient rest hours (STCW/MLC violation), undersized crews, intensive navigation. Consequences: navigation errors, occupational accidents, maritime disasters. MLC + STCW VIII set limits to prevent fatigue. ITF unions and IMO work on stricter minimum safe manning rules."},
    {q:"What is 'minimum safe manning'?",opts:["The minimum number of stewards","Minimum number of officers and crew required to navigate safely per SOLAS — determined by flag state · posted on board","The minimum wage","The number of passengers"],correct:1,expl:"Minimum safe manning = SOLAS Chapter V document. Sets the minimum crew to operate the vessel safely. Issued by flag state based on: vessel size, type, navigation area, equipment. Posted on board. PSC checks actual crew ≥ minimum. Understaffing = SOLAS violation + PSC detention."},
    {q:"What is the mandatory 'medical coverage' under MLC Title 4?",opts:["Optional insurance","Legal obligation: shipowner pays seafarer's medical costs for up to 16 weeks after a maritime occupational accident · including shore hospitalization","Coverage for officers only","Coverage only at sea"],correct:1,expl:"MLC Title 4 medical coverage: shipowner responsible for medical costs (treatment + medication + hospitalization) during contract AND up to 16 weeks after contract end if illness/injury is work-related. Sick pay: salary maintained for minimum 16 weeks. If death at sea: body repatriation + family compensation."},
    {q:"What is the ITF 'black list' of shipowners?",opts:["A list of broken-down vessels","List of shipowners who violated seafarers' rights — published by ITF · international pressure for boycott and enhanced inspections","A customs list","An IMO list"],correct:1,expl:"ITF Black List = registry of shipowners and companies that committed serious seafarer rights violations: unpaid wages, unfit living conditions, crew abandonment. Published and regularly updated by ITF. Effect: port boycott, enhanced PSC inspections, media pressure. Effective pressure tool on defaulting shipowners."},
    {q:"What is a 'port welfare committee' in the MLC context?",opts:["A commercial port committee","Local committee for seafarer welfare during port calls — provides practical assistance (transport, contacts, emergency aid) · often run by charitable organizations","A PSC committee","A union committee"],correct:1,expl:"Port Welfare Committee = local seafarer welfare committee (MLC Title 4). Composed of charitable associations, religious bodies, unions, port authorities. Provides: transport for seafarers on shore leave, access to facilities (internet, sports), emergency aid (abandonment, illness). Examples: Apostleship of the Sea, Mission to Seafarers. Present in major world ports."},
    {q:"What is the mandatory 'seafarer employment agreement' (SEA) under MLC?",opts:["A charter agreement","Mandatory individual contract between seafarer and shipowner — must include salary, duration, repatriation, conditions — given in person BEFORE embarkation","A collective agreement","A training contract"],correct:1,expl:"SEA (Seafarer's Employment Agreement) = mandatory individual contract MLC Title 2. Must contain: name and date of birth, vessel name, engagement place and date, salary, duration or end date, paid leave, repatriation conditions. Signed by seafarer AND shipowner (or representative). Copy given BEFORE embarkation. Maximum duration: 12 months."},
    {q:"What is the 'recruiter's responsibility' under MLC Title 1?",opts:["A moral responsibility","Seafarer recruitment agencies are responsible for MLC violations committed by shipowners they recruit for — co-responsibility","An internal regulation","A non-mandatory recommendation"],correct:1,expl:"MLC Title 1, Rule 1.4: placement agency responsibility. Seafarer recruitment agencies must: be licensed by the state, not charge seafarers for placement, verify shipowner MLC compliance. If shipowner violates MLC, agency can be held co-responsible. Prohibited: charging seafarers for placement services."},
    {q:"What is the MLC 'white list' of states?",opts:["The list of MLC-compliant ports","List of states whose national laws are recognized as MLC 2006 compliant by ILO — enables mutual recognition of MLC documents","The list of MLC-compliant vessels","The list of MLC-certified shipowners"],correct:1,expl:"MLC whitelist = list of states whose national legislation has been recognized as equivalent to MLC 2006 by the ILO. Enables mutual recognition of MLC documents. If a state is not on the whitelist, its MLC documents may be rejected by PSC. Updated by ILO. Complement to the IMO STCW whitelist."},
  ],
  es:[
    {q:"¿Qué es la ITF (Federación Internacional de Trabajadores del Transporte) en el contexto MLC?",opts:["Un sindicato de transporte terrestre","Federación sindical internacional de la gente de mar — inspecciona buques, ayuda a marineros abandonados, negocia convenios colectivos","Un organismo de la OMI","Un asegurador marítimo"],correct:1,expl:"ITF = International Transport Workers' Federation. Federación sindical internacional con sede en Londres. Papel MLC: inspecciona buques en los puertos para verificar salarios y condiciones de trabajo, ayuda a marineros abandonados (fondo de repatriación de emergencia), negocia CBAs (Convenios Colectivos) con los armadores. Inspectores ITF en más de 100 puertos mundiales."},
    {q:"¿Qué es un 'CBA' (Convenio Colectivo) en el contexto MLC?",opts:["Un contrato individual de trabajo","Convenio colectivo negociado entre sindicatos (ITF) y armadores — puede prever condiciones superiores al mínimo MLC","Un certificado de competencia","Un contrato de seguros"],correct:1,expl:"CBA = Collective Bargaining Agreement (Convenio Colectivo). Negociado entre la ITF o sindicatos nacionales y los armadores/asociaciones de armadores. Puede prever salarios, vacaciones y condiciones superiores al mínimo MLC. Algunos armadores firman CBAs ITF = sus buques lucen la bandera azul de la ITF."},
    {q:"¿Qué es el 'permiso en tierra' (shore leave) garantizado por MLC?",opts:["Un derecho facultativo","Derecho fundamental MLC — el marinero tiene derecho a bajar a tierra durante las escalas, salvo razones de seguridad · el armador no puede prohibirlo sin razón válida","Un beneficio contractual","Un derecho reservado a los oficiales"],correct:1,expl:"Permiso en tierra = Derecho fundamental MLC Título 2. El marinero tiene derecho a bajar a tierra en los puertos de escala. El armador solo puede prohibirlo por: razones de seguridad del buque, restricciones portuarias (PBIP, aduana). Denegación injustificada = infracción MLC."},
    {q:"¿Qué es la 'repatriación' garantizada por MLC Título 2?",opts:["Un viaje turístico pagado por el armador","Derecho del marinero a ser enviado a su país a expensas del armador al término del contrato, por enfermedad o abandono — transporte + equipaje pagados por el armador","Un beneficio negociado","Un derecho solo para oficiales"],correct:1,expl:"Repatriación MLC = derecho fundamental. El armador DEBE pagar el regreso del marinero: al finalizar el contrato, en caso de enfermedad/lesión, en caso de abandono, si el buque entra en zona de guerra. Incluye: transporte al país de origen o lugar de contratación, alojamiento si es necesario, equipaje. Impago = infracción grave MLC."},
    {q:"¿Qué es el mecanismo de queja MLC a bordo?",opts:["Solo un formulario interno","Procedimiento obligatorio que permite al marinero presentar una queja sin represalias — primero internamente, luego directamente al PSC si es necesario","Un sindicato a bordo","Un procedimiento reservado a los capitanes"],correct:1,expl:"Mecanismo de queja MLC = procedimiento obligatorio (MLC Título 5). Pasos: 1) Queja al superior jerárquico u oficial designado a bordo. 2) Si no se resuelve: al capitán. 3) Si no se resuelve: directamente al Estado del puerto (PSC). Protección TOTAL contra represalias. Publicación obligatoria del procedimiento a bordo."},
    {q:"¿Cuál es la responsabilidad de la compañía para el bienestar de los marineros según MLC?",opts:["Responsabilidad moral únicamente","Obligación legal ampliada: salarios · alojamiento · alimentación · medicina · repatriación · seguridad social — se aplica incluso si el buque está subfletado","Responsabilidad del capitán únicamente","Responsabilidad del Estado de pabellón únicamente"],correct:1,expl:"Responsabilidad compañía MLC = obligación legal ampliada (MLC Título 5, Regla 5.1). La compañía es responsable de: salarios, alojamiento, alimentación, atención médica, repatriación, seguridad social. Esta responsabilidad se aplica incluso si el buque está bajo contrato de fletamento o gestionado por un tercero."},
    {q:"¿Qué es la 'garantía financiera' obligatoria introducida por las enmiendas MLC 2014?",opts:["Un seguro de carga","Seguro obligatorio que cada armador debe suscribir para cubrir: abandono de tripulación + indemnización por muerte e invalidez","Un seguro de buque","Un fondo de pensiones marítimo"],correct:1,expl:"Enmiendas MLC 2014 (en vigor desde 2017): dos nuevas garantías financieras obligatorias. 1) Garantía contra el abandono: cubre salarios atrasados (máx 4 meses) + repatriación si el armador desaparece. 2) Garantía de indemnización por muerte/invalidez. El certificado de seguro debe estar a bordo y accesible a los marineros."},
    {q:"¿Qué es la 'fatiga de los marineros' y su vínculo con MLC/STCW?",opts:["Un problema médico personal","Riesgo documentado de seguridad relacionado con el incumplimiento de las horas de descanso — causa de accidentes marítimos + infracción STCW/MLC","Un problema de recursos humanos","Una condición no cubierta por los convenios"],correct:1,expl:"Fatiga de los marineros = factor humano de seguridad importante. Causada por: horas de descanso insuficientes (infracción STCW/MLC), tripulaciones reducidas, navegación intensiva. Consecuencias: errores de navegación, accidentes laborales, catástrofes marítimas. La MLC + STCW VIII fijan límites para prevenir la fatiga."},
    {q:"¿Qué es el 'efectivo mínimo de seguridad' (minimum safe manning)?",opts:["El número mínimo de camareros","Número mínimo de oficiales y tripulantes necesarios para navegar con seguridad según SOLAS — determinado por el Estado de pabellón · exhibido a bordo","El salario mínimo","El número de pasajeros"],correct:1,expl:"Efectivo mínimo de seguridad = documento SOLAS Capítulo V. Fija el número mínimo de tripulantes para operar el buque con seguridad. Emitido por el Estado de pabellón según: tamaño del buque, tipo, zona de navegación, equipos. Exhibido a bordo. El PSC verifica que el número real de tripulantes ≥ mínimo."},
    {q:"¿Qué es la 'cobertura médica' obligatoria bajo MLC Título 4?",opts:["Un seguro opcional","Obligación legal: el armador paga los gastos médicos del marinero hasta 16 semanas después de un accidente laboral marítimo · incluidos los gastos de hospitalización en tierra","Una cobertura solo para oficiales","Una cobertura solo en el mar"],correct:1,expl:"Cobertura médica MLC Título 4: el armador es responsable de los gastos médicos (tratamiento + medicamentos + hospitalización) durante el contrato Y hasta 16 semanas después del final del contrato si la enfermedad/lesión está relacionada con el trabajo. Subsidio por enfermedad: salario mantenido durante 16 semanas mínimo."},
    {q:"¿Qué es la 'lista negra' ITF de armadores?",opts:["Una lista de buques averiados","Lista de armadores que han violado los derechos de los marineros — publicada por la ITF · presión internacional para boicot e inspecciones reforzadas","Una lista aduanera","Una lista de la OMI"],correct:1,expl:"Lista negra ITF = registro de armadores y compañías que han cometido graves violaciones de los derechos de los marineros: impago de salarios, condiciones de vida indignas, abandono de tripulación. Publicada y actualizada regularmente por la ITF. Efecto: boicot en los puertos, inspecciones PSC reforzadas, presión mediática."},
    {q:"¿Qué es el 'comité de bienestar portuario' en el contexto MLC?",opts:["Un comité portuario comercial","Comité local de ayuda a los marineros en escala — proporciona asistencia práctica (transporte, contactos, ayuda de emergencia) · a menudo gestionado por organizaciones benéficas","Un comité PSC","Un comité sindical"],correct:1,expl:"Comité de Bienestar Portuario = comité local de bienestar de los marineros (MLC Título 4). Compuesto por asociaciones benéficas, organismos religiosos, sindicatos, autoridades portuarias. Proporciona: transporte para los marineros en escala, acceso a instalaciones (internet, deporte), ayuda de emergencia. Presente en los grandes puertos mundiales."},
    {q:"¿Qué es el 'acuerdo de empleo marítimo' (AEM/SEA) obligatorio bajo MLC?",opts:["Un contrato de fletamento","Contrato individual obligatorio entre el marinero y el armador — debe incluir salario, duración, repatriación, condiciones — entregado en mano ANTES del embarque","Un convenio colectivo","Un contrato de formación"],correct:1,expl:"AEM (Acuerdo de Empleo Marítimo / SEA) = contrato individual obligatorio MLC Título 2. Debe contener: nombre y fecha de nacimiento, nombre del buque, lugar y fecha de contratación, salario, duración o fecha de finalización, vacaciones pagadas, condiciones de repatriación. Firmado por el marinero Y el armador. Copia entregada ANTES del embarque. Duración máxima: 12 meses."},
    {q:"¿Cuál es la 'responsabilidad del reclutador' bajo MLC Título 1?",opts:["Una responsabilidad moral","Las agencias de contratación de marineros son responsables de las infracciones MLC cometidas por los armadores para los que contratan — corresponsabilidad","Un reglamento interno","Una recomendación no obligatoria"],correct:1,expl:"MLC Título 1, Regla 1.4: responsabilidad de las agencias de colocación. Las agencias de contratación de marineros deben: estar autorizadas por el Estado, no cobrar a los marineros por su colocación, verificar el cumplimiento MLC del armador. Si el armador viola MLC, la agencia puede ser considerada corresponsable."},
    {q:"¿Qué es la 'lista blanca MLC' de los Estados?",opts:["La lista de puertos conformes MLC","Lista de Estados cuyas leyes nacionales son reconocidas conformes a MLC 2006 por la OIT — permite el 'reconocimiento mutuo' de los documentos MLC","La lista de buques conformes MLC","La lista de armadores certificados MLC"],correct:1,expl:"Lista blanca MLC = lista de Estados cuya legislación nacional ha sido reconocida equivalente a MLC 2006 por la OIT. Permite el reconocimiento mutuo de los documentos MLC. Si un Estado no está en la lista blanca, sus documentos MLC pueden ser rechazados por el PSC."},
  ],
  pt:[
    {q:"O que é a ITF (Federação Internacional dos Trabalhadores dos Transportes) no contexto MLC?",opts:["Um sindicato de transporte terrestre","Federação sindical internacional dos marítimos — inspeciona navios, ajuda marítimos abandonados, negoceia convenções coletivas","Um organismo da IMO","Um segurador marítimo"],correct:1,expl:"ITF = International Transport Workers' Federation. Federação sindical internacional sediada em Londres. Papel MLC: inspeciona navios nos portos para verificar salários e condições de trabalho, ajuda marítimos abandonados (fundo de repatriamento de emergência), negoceia CBAs (Acordos Coletivos) com armadores. Inspetores ITF em mais de 100 portos mundiais."},
    {q:"O que é um 'CBA' (Acordo Coletivo de Trabalho) no contexto MLC?",opts:["Um contrato individual de trabalho","Acordo coletivo negociado entre sindicatos (ITF) e armadores — pode prever condições superiores ao mínimo MLC","Um certificado de competência","Um contrato de seguro"],correct:1,expl:"CBA = Collective Bargaining Agreement (Acordo Coletivo). Negociado entre a ITF ou sindicatos nacionais e armadores/associações de armadores. Pode prever salários, férias e condições superiores ao mínimo MLC. Alguns armadores assinam CBAs ITF = os seus navios arvoram a bandeira azul da ITF."},
    {q:"O que é a 'licença em terra' (shore leave) garantida pela MLC?",opts:["Um direito facultativo","Direito fundamental MLC — o marítimo tem o direito de ir a terra durante as escalas, salvo razões de segurança · o armador não pode proibi-lo sem razão válida","Um benefício contratual","Um direito reservado aos oficiais"],correct:1,expl:"Licença em terra = Direito fundamental MLC Título 2. O marítimo tem o direito de ir a terra nos portos de escala. O armador só pode proibi-lo por: razões de segurança do navio, restrições portuárias (ISPS, alfândega). Recusa injustificada = violação MLC."},
    {q:"O que é o 'repatriamento' garantido pela MLC Título 2?",opts:["Uma viagem turística paga pelo armador","Direito do marítimo a ser enviado para casa sem custo no fim do contrato, por doença ou abandono — transporte + bagagem pagos pelo armador","Um benefício negociado","Um direito apenas para oficiais"],correct:1,expl:"Repatriamento MLC = direito fundamental. O armador DEVE pagar o regresso do marítimo: no fim do contrato, em caso de doença/lesão, em caso de abandono, se o navio entrar em zona de guerra. Inclui: transporte ao país de origem ou local de contratação, alojamento se necessário, bagagem. Não pagamento = violação grave MLC."},
    {q:"O que é o mecanismo de queixa MLC a bordo?",opts:["Apenas um formulário interno","Procedimento obrigatório que permite ao marítimo apresentar queixa sem represálias — primeiro internamente, depois diretamente ao PSC se necessário","Um sindicato a bordo","Um procedimento reservado aos capitães"],correct:1,expl:"Mecanismo de queixa MLC = procedimento obrigatório (MLC Título 5). Etapas: 1) Queixa ao superior hierárquico ou oficial designado a bordo. 2) Se não resolvida: ao capitão. 3) Se não resolvida: diretamente ao Estado do porto (PSC). Proteção TOTAL contra represálias. Afixação obrigatória do procedimento a bordo."},
    {q:"Qual é a responsabilidade da companhia para o bem-estar dos marítimos segundo a MLC?",opts:["Responsabilidade moral apenas","Obrigação legal alargada: salários · alojamento · alimentação · medicina · repatriamento · segurança social — aplica-se mesmo se o navio estiver sub-fretado","Responsabilidade do capitão apenas","Responsabilidade do Estado de bandeira apenas"],correct:1,expl:"Responsabilidade companhia MLC = obrigação legal alargada (MLC Título 5, Regra 5.1). A companhia é responsável por: salários, alojamento, alimentação, cuidados médicos, repatriamento, segurança social. Esta responsabilidade aplica-se mesmo se o navio estiver em contrato de afretamento ou gerido por terceiros."},
    {q:"O que é a 'garantia financeira' obrigatória introduzida pelas emendas MLC 2014?",opts:["Um seguro de carga","Seguro obrigatório que cada armador deve subscrever para cobrir: abandono de tripulação + indemnização por morte e invalidez","Um seguro de navio","Um fundo de pensões marítimo"],correct:1,expl:"Emendas MLC 2014 (em vigor desde 2017): duas novas garantias financeiras obrigatórias. 1) Garantia contra o abandono: cobre salários em atraso (máx 4 meses) + repatriamento se o armador desaparecer. 2) Garantia de indemnização por morte/invalidez. O certificado de seguro deve estar a bordo e acessível aos marítimos."},
    {q:"O que é a 'fadiga dos marítimos' e o seu vínculo com MLC/STCW?",opts:["Um problema médico pessoal","Risco de segurança documentado relacionado com o não cumprimento das horas de descanso — causa de acidentes marítimos + violação STCW/MLC","Um problema de recursos humanos","Uma condição não coberta pelas convenções"],correct:1,expl:"Fadiga dos marítimos = fator humano de segurança importante. Causada por: horas de descanso insuficientes (violação STCW/MLC), tripulações reduzidas, navegação intensiva. Consequências: erros de navegação, acidentes de trabalho, catástrofes marítimas. A MLC + STCW VIII fixam limites para prevenir a fadiga."},
    {q:"O que é o 'efetivo mínimo de segurança' (minimum safe manning)?",opts:["O número mínimo de empregados de mesa","Número mínimo de oficiais e tripulantes necessários para navegar com segurança segundo o SOLAS — determinado pelo Estado de bandeira · afixado a bordo","O salário mínimo","O número de passageiros"],correct:1,expl:"Efetivo mínimo de segurança = documento SOLAS Capítulo V. Fixa o número mínimo de tripulantes para operar o navio com segurança. Emitido pelo Estado de bandeira segundo: tamanho do navio, tipo, zona de navegação, equipamentos. Afixado a bordo. O PSC verifica que o número real de tripulantes ≥ mínimo."},
    {q:"O que é a 'cobertura médica' obrigatória sob MLC Título 4?",opts:["Um seguro opcional","Obrigação legal: o armador paga os custos médicos do marítimo até 16 semanas após um acidente de trabalho marítimo · incluindo hospitalização em terra","Cobertura apenas para oficiais","Cobertura apenas no mar"],correct:1,expl:"Cobertura médica MLC Título 4: o armador é responsável pelos custos médicos (tratamento + medicamentos + hospitalização) durante o contrato E até 16 semanas após o fim do contrato se a doença/lesão estiver relacionada com o trabalho. Subsídio de doença: salário mantido durante 16 semanas mínimo."},
    {q:"O que é a 'lista negra' ITF de armadores?",opts:["Uma lista de navios avariados","Lista de armadores que violaram os direitos dos marítimos — publicada pela ITF · pressão internacional para boicote e inspeções reforçadas","Uma lista aduaneira","Uma lista da IMO"],correct:1,expl:"Lista negra ITF = registo de armadores e companhias que cometeram graves violações dos direitos dos marítimos: salários não pagos, condições de vida indignas, abandono de tripulação. Publicada e atualizada regularmente pela ITF. Efeito: boicote nos portos, inspeções PSC reforçadas, pressão mediática."},
    {q:"O que é um 'comité de bem-estar portuário' no contexto MLC?",opts:["Um comité portuário comercial","Comité local de ajuda aos marítimos em escala — fornece assistência prática (transporte, contactos, ajuda de emergência) · frequentemente gerido por organizações de caridade","Um comité PSC","Um comité sindical"],correct:1,expl:"Comité de Bem-Estar Portuário = comité local de bem-estar dos marítimos (MLC Título 4). Composto por associações de caridade, organismos religiosos, sindicatos, autoridades portuárias. Fornece: transporte para marítimos em escala, acesso a instalações (internet, desporto), ajuda de emergência. Presente nos grandes portos mundiais."},
    {q:"O que é o 'acordo de trabalho marítimo' (ATM/SEA) obrigatório sob MLC?",opts:["Um contrato de afretamento","Contrato individual obrigatório entre o marítimo e o armador — deve incluir salário, duração, repatriamento, condições — entregue pessoalmente ANTES do embarque","Um acordo coletivo","Um contrato de formação"],correct:1,expl:"ATM (Acordo de Trabalho Marítimo / SEA) = contrato individual obrigatório MLC Título 2. Deve conter: nome e data de nascimento, nome do navio, local e data de contratação, salário, duração ou data de fim, férias pagas, condições de repatriamento. Assinado pelo marítimo E pelo armador. Cópia entregue ANTES do embarque. Duração máxima: 12 meses."},
    {q:"Qual é a 'responsabilidade do recrutador' sob MLC Título 1?",opts:["Uma responsabilidade moral","As agências de recrutamento de marítimos são responsáveis pelas violações MLC cometidas pelos armadores para quem recrutam — co-responsabilidade","Um regulamento interno","Uma recomendação não obrigatória"],correct:1,expl:"MLC Título 1, Regra 1.4: responsabilidade das agências de colocação. As agências de recrutamento de marítimos devem: ser licenciadas pelo Estado, não cobrar aos marítimos pelo seu recrutamento, verificar a conformidade MLC do armador. Se o armador violar MLC, a agência pode ser considerada co-responsável."},
    {q:"O que é a 'lista branca MLC' dos estados?",opts:["A lista dos portos conformes MLC","Lista dos estados cuja legislação nacional é reconhecida conforme à MLC 2006 pela OIT — permite o 'reconhecimento mútuo' dos documentos MLC","A lista dos navios conformes MLC","A lista dos armadores certificados MLC"],correct:1,expl:"Lista branca MLC = lista dos estados cuja legislação nacional foi reconhecida equivalente à MLC 2006 pela OIT. Permite o reconhecimento mútuo dos documentos MLC. Se um estado não está na lista branca, os seus documentos MLC podem ser recusados pelo PSC."},
  ],
};

function QuestionBank({ lang }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else setDone(true);};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,margin:"8px 0 4px"}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
    <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.green},${C.gold2})`}}/></div>
    <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
      {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
    </div>
    {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
    <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.green},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
  </div>);
}

function Stars(){const s=Array.from({length:14},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.green}33,${C.gold2}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.green}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.green,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.green:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.green},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d={
    fr:{
      badge:"⚖️ Droit Maritime Int. · Leçon 4/10 · ⭐ Premium · 200 XP",
      title:"MLC 2006 — Droits des Marins & Responsabilités",
      intro:"1,6 million de marins font tourner 90% du commerce mondial. Longtemps oubliés du droit du travail, ils ont obtenu en 2006 leur propre convention internationale — la 'Constitution maritime des travailleurs'.\n\nCette leçon couvre les droits fondamentaux MLC, les standards de vie à bord, les sanctions et l'abandon d'équipage.",
      p1:"PARTIE 1 — LES 5 TITRES MLC 2006",s1t:"Conditions minimales · Emploi · Logement · Santé · Conformité",
      s1:"MLC 2006 = Maritime Labour Convention\nAdoptée : OIT · Genève · 23 février 2006\nEn vigueur : 20 août 2013\n\n4ème PILIER DU DROIT MARITIME :\nSOLAS → sécurité du navire\nMARPOL → protection environnement\nSTCW → compétences équipage\nMLC → droits et conditions des marins\n\n5 TITRES :\nTitre 1 = Conditions minimales (âge · santé · formation)\nTitre 2 = Conditions d'emploi (salaire · heures · congés)\nTitre 3 = Logement · alimentation · loisirs\nTitre 4 = Santé · soins médicaux · sécurité sociale\nTitre 5 = Conformité et exécution (DMLC · PSC)",
      p2:"PARTIE 2 — DROITS FONDAMENTAUX",s2t:"5 droits clés — simulateur de violations",
      s2:"DROITS CLÉS MLC :\nSalaire min. 2024 : $673/mois (AB)\nPaiement mensuel obligatoire\n\nCongés payés : 2,5 jours/mois\n(= 30 jours/an)\n\nRapatriement : à la fin du contrat\n(= à frais de l'armateur)\n\nRepos : min 10h/24h (STCW+MLC)\n\nSoins médicaux : gratuits pendant le contrat\n(+ 16 semaines après accident)\n\n⚠️ Abandon d'équipage = violation la plus grave MLC",
      p3:"PARTIE 3 — CONDITIONS DE VIE À BORD",s3t:"Logement · sanitaires · nourriture · loisirs",
      s3:"STANDARDS LOGEMENT MLC :\nCabine individuelle OBLIGATOIRE\n(depuis 2006 · surface min 4,5 m²)\nClimatisation en zones tropicales\n\nNOURRITURE :\nRepas GRATUITS · 3/jour minimum\nCuisinier qualifié si > 10 marins\n\nSANITAIRES :\nEau chaude 24h/24\n1 WC max pour 6 personnes\n\nLOISIRS :\nSalle de loisirs obligatoire\nInternet recommandé (coût raisonnable)\nShore leave garantie",
      p4:"PARTIE 4 — CONFORMITÉ & SANCTIONS",s4t:"DMLC · PSC · Abandon équipage · ITF",
      s4:"CERTIFICATS MLC :\nMLCC (Maritime Labour Compliance Certificate)\nValidité 5 ans · inspection intermédiaire\n\nDMLC (Declaration of Maritime Labour Compliance)\nPartie I : État du pavillon\nPartie II : Compagnie\n\nPSC VÉRIFIE :\nSalaires · Logement · Heures repos\nNourriture · Soins médicaux · Procédure plainte\n\nABANDON ÉQUIPAGE :\n= Crime international\nÉtat du port DOIT aider\nFonds ITF pour rapatriement d'urgence",
      p5:"🎯 EXERCICES AVANCÉS PREMIUM",p6:"⚠️ CAS RÉEL",p7:"📝 BANQUE 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — MLC 2006 L4 DROIT MARITIME",
      sumP:["MLC 2006 = OIT · en vigueur 2013 · 4ème pilier droit maritime","5 Titres : Conditions · Emploi · Logement · Santé · Conformité","Salaire minimum AB 2024 : $673/mois · paiement mensuel obligatoire","Congés payés : 2,5 jours/mois = 30 jours/an","Cabine individuelle obligatoire · surface min 4,5 m²","MLCC + DMLC = certificats MLC · validité 5 ans","PSC vérifie MLC lors des inspections portuaires","Abandon d'équipage = crime international · fonds ITF rapatriement"],
      learnedP:["MLC 2006 OIT · 5 Titres · 4ème pilier maritime","Salaire $673/mois · congés 2,5j/mois · repos min 10h","Cabine individuelle · repas gratuits · cuisinier qualifié","MLCC + DMLC · PSC MLC · mécanisme de plainte","Abandon équipage · MV Aman 2009 · ITF fonds urgence"],
    },
    en:{
      badge:"⚖️ Int. Maritime Law · Lesson 4/10 · ⭐ Premium · 200 XP",
      title:"MLC 2006 — Seafarer Rights & Responsibilities",
      intro:"1.6 million seafarers run 90% of world trade. Long forgotten by labor law, they obtained their own international convention in 2006 — the 'Maritime Workers' Constitution'.",
      p1:"PART 1 — THE 5 MLC 2006 TITLES",s1t:"Minimum requirements · Employment · Accommodation · Health · Compliance",
      s1:"MLC 2006 = Maritime Labour Convention\nAdopted: ILO · Geneva · February 23, 2006\nIn force: August 20, 2013\n\n4TH PILLAR OF MARITIME LAW:\nSOLAS → vessel safety\nMARPOL → environmental protection\nSTCW → crew competence\nMLC → seafarer rights and conditions",
      p2:"PART 2 — FUNDAMENTAL RIGHTS",s2t:"5 key rights — violations simulator",
      s2:"KEY MLC RIGHTS:\nMin wage 2024: $673/month (AB)\nMandatory monthly payment\nPaid leave: 2.5 days/month (= 30 days/year)\nRepatriation: at contract end (at shipowner's expense)\nRest: min 10h/24h (STCW+MLC)\nMedical care: free during contract (+ 16 weeks after accident)\n⚠️ Crew abandonment = most serious MLC violation",
      p3:"PART 3 — LIVING CONDITIONS ON BOARD",s1t:"Accommodation · sanitary · food · recreation",
      s3:"MLC ACCOMMODATION STANDARDS:\nIndividual cabin MANDATORY (since 2006 · min 4.5 m²)\nAir conditioning in tropical areas\nFree MEALS · 3/day minimum\nQualified cook if > 10 seafarers\nHot water 24/7 · 1 WC max for 6 persons\nRecreation room mandatory · Internet recommended",
      p4:"PART 4 — COMPLIANCE & SANCTIONS",s1t:"DMLC · PSC · Crew abandonment · ITF",
      s4:"MLC CERTIFICATES:\nMLCC (Maritime Labour Compliance Certificate) - 5 years\nDMLC Part I (flag state) + Part II (company)\n\nCREW ABANDONMENT:\n= International crime · Port state MUST help\nITF Fund for emergency repatriation",
      p5:"🎯 ADVANCED PREMIUM EXERCISES",p6:"⚠️ REAL ACCIDENT CASE",p7:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY — MLC 2006 L4 MARITIME LAW",
      sumP:["MLC 2006 = ILO · in force 2013 · 4th pillar maritime law","5 Titles: Conditions · Employment · Accommodation · Health · Compliance","Minimum wage AB 2024: $673/month · mandatory monthly payment","Paid leave: 2.5 days/month = 30 days/year","Individual cabin mandatory · min 4.5 m²","MLCC + DMLC = MLC certificates · 5-year validity","PSC checks MLC during port inspections","Crew abandonment = international crime · ITF repatriation fund"],
      learnedP:["MLC 2006 ILO · 5 Titles · 4th maritime pillar","Wage $673/month · leave 2.5d/month · rest min 10h","Individual cabin · free meals · qualified cook","MLCC + DMLC · PSC MLC · complaint mechanism","Crew abandonment · MV Aman 2009 · ITF emergency fund"],
    },
    es:{
      badge:"⚖️ Derecho Marítimo Int. · Lección 4/10 · ⭐ Premium · 200 XP",
      title:"MLC 2006 — Derechos de los Marineros y Responsabilidades",
      intro:"1,6 millones de marineros mueven el 90% del comercio mundial. Olvidados durante mucho tiempo por el derecho laboral, obtuvieron su propio convenio internacional en 2006.",
      p1:"PARTE 1 — LOS 5 TÍTULOS MLC 2006",s1t:"Requisitos mínimos · Empleo · Alojamiento · Salud · Conformidad",
      s1:"MLC 2006 · OIT · Ginebra · 23 febrero 2006 · En vigor: 20 agosto 2013\n4° PILAR DEL DERECHO MARÍTIMO:\nSOLAS · MARPOL · STCW · MLC",
      p2:"PARTE 2 — DERECHOS FUNDAMENTALES",s1t:"5 derechos clave — simulador de infracciones",
      s2:"Salario mín. 2024: $673/mes (MO)\nVacaciones: 2,5 días/mes (= 30 días/año)\nRepatriación a expensas del armador\nDescanso: mín 10h/24h · Atención médica gratuita\n⚠️ Abandono tripulación = infracción MLC más grave",
      p3:"PARTE 3 — CONDICIONES DE VIDA A BORDO",s1t:"Alojamiento · sanitarios · alimentación · recreo",
      s3:"Cabina individual OBLIGATORIA (mín 4,5 m²)\nComidas GRATUITAS · 3/día mínimo\nCocinero cualificado si > 10 marineros\nAgua caliente 24h · 1 WC máx para 6 personas\nSala de recreo obligatoria",
      p4:"PARTE 4 — CONFORMIDAD Y SANCIONES",s1t:"DCTM · PSC · Abandono tripulación · ITF",
      s4:"CTM + DCTM = certificados MLC · 5 años\nABANDONO TRIPULACIÓN = delito internacional\nEstado del puerto DEBE ayudar · Fondo ITF repatriación",
      p5:"🎯 EJERCICIOS AVANZADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — MLC 2006 L4 DERECHO MARÍTIMO",
      sumP:["MLC 2006 = OIT · en vigor 2013 · 4° pilar derecho marítimo","5 Títulos: Condiciones · Empleo · Alojamiento · Salud · Conformidad","Salario mínimo MO 2024: $673/mes · pago mensual obligatorio","Vacaciones: 2,5 días/mes = 30 días/año","Cabina individual obligatoria · superficie mín 4,5 m²","CTM + DCTM = certificados MLC · validez 5 años","PSC verifica MLC en las inspecciones portuarias","Abandono tripulación = delito internacional · fondo ITF repatriación"],
      learnedP:["MLC 2006 OIT · 5 Títulos · 4° pilar marítimo","Salario $673/mes · vacaciones 2,5d/mes · descanso mín 10h","Cabina individual · comidas gratuitas · cocinero cualificado","CTM + DCTM · PSC MLC · mecanismo de queja","Abandono tripulación · MV Aman 2009 · fondo ITF urgencia"],
    },
    pt:{
      badge:"⚖️ Direito Marítimo Int. · Lição 4/10 · ⭐ Premium · 200 XP",
      title:"MLC 2006 — Direitos dos Marítimos e Responsabilidades",
      intro:"1,6 milhões de marítimos movem 90% do comércio mundial. Esquecidos durante muito tempo pelo direito do trabalho, obtiveram a sua própria convenção internacional em 2006.",
      p1:"PARTE 1 — OS 5 TÍTULOS MLC 2006",s1t:"Requisitos mínimos · Emprego · Alojamento · Saúde · Conformidade",
      s1:"MLC 2006 · OIT · Genebra · 23 fevereiro 2006 · Em vigor: 20 agosto 2013\n4° PILAR DO DIREITO MARÍTIMO:\nSOLAS · MARPOL · STCW · MLC",
      p2:"PARTE 2 — DIREITOS FUNDAMENTAIS",s1t:"5 direitos chave — simulador de violações",
      s2:"Salário mín. 2024: $673/mês (MO)\nFérias: 2,5 dias/mês (= 30 dias/ano)\nRepatriamento a expensas do armador\nDescanso: mín 10h/24h · Cuidados médicos gratuitos\n⚠️ Abandono tripulação = violação MLC mais grave",
      p3:"PARTE 3 — CONDIÇÕES DE VIDA A BORDO",s1t:"Alojamento · sanitários · alimentação · lazer",
      s3:"Cabine individual OBRIGATÓRIA (mín 4,5 m²)\nRefeições GRATUITAS · 3/dia mínimo\nCozinheiro qualificado se > 10 marítimos\nÁgua quente 24h · 1 WC máx para 6 pessoas\nSala de lazer obrigatória",
      p4:"PARTE 4 — CONFORMIDADE E SANÇÕES",s1t:"DCTM · PSC · Abandono tripulação · ITF",
      s4:"CTM + DCTM = certificados MLC · 5 anos\nABANDONO TRIPULAÇÃO = crime internacional\nEstado do porto DEVE ajudar · Fundo ITF repatriamento",
      p5:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — MLC 2006 L4 DIREITO MARÍTIMO",
      sumP:["MLC 2006 = OIT · em vigor 2013 · 4° pilar direito marítimo","5 Títulos: Condições · Emprego · Alojamento · Saúde · Conformidade","Salário mínimo MO 2024: $673/mês · pagamento mensal obrigatório","Férias: 2,5 dias/mês = 30 dias/ano","Cabine individual obrigatória · superfície mín 4,5 m²","CTM + DCTM = certificados MLC · validade 5 anos","PSC verifica MLC nas inspeções portuárias","Abandono tripulação = crime internacional · fundo ITF repatriamento"],
      learnedP:["MLC 2006 OIT · 5 Títulos · 4° pilar marítimo","Salário $673/mês · férias 2,5d/mês · descanso mín 10h","Cabine individual · refeições gratuitas · cozinheiro qualificado","CTM + DCTM · PSC MLC · mecanismo de queixa","Abandono tripulação · MV Aman 2009 · fundo ITF urgência"],
    },
  };
  return d[lang]||d.fr;
};

export default function LessonMLC({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t=T[lang]||T.fr;const quiz=QUIZ[lang]||QUIZ.fr;const lc=getContent(lang);
  const [phase,setPhase]=useState("content");const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#040d08 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.green}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.green,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>⚖️ {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 4/10":lang==="en"?"Lesson 4/10":lang==="es"?"Lección 4/10":"Lição 4/10"}</div>
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
          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(30,138,74,0.15)",border:`1px solid ${C.green}44`,fontSize:11,color:C.green,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.green}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>
            <SL icon="📋" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📋 {lang==="fr"?"5 TITRES MLC 2006 — INTERACTIF":lang==="en"?"MLC 2006 5 TITLES — INTERACTIVE":"5 TÍTULOS MLC 2006 — INTERACTIVO"}</div>
              <MLC5TitlesSVG lang={lang}/>
            </Card>
            <SL icon="⚖️" text={lc.p2} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}33`}}>
              <div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>⚖️ {lang==="fr"?"DROITS FONDAMENTAUX — SIMULATEUR VIOLATIONS":lang==="en"?"FUNDAMENTAL RIGHTS — VIOLATIONS SIMULATOR":"DERECHOS FUNDAMENTALES — SIMULADOR INFRACCIONES"}</div>
              <RightsCheckerSVG lang={lang}/>
            </Card>
            <SL icon="🛏️" text={lc.p3} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.teal}33`}}>
              <div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🛏️ {lang==="fr"?"CONDITIONS DE VIE — STANDARDS MLC":lang==="en"?"LIVING CONDITIONS — MLC STANDARDS":"CONDICIONES DE VIDA — ESTÁNDARES MLC"}</div>
              <AccommodationSVG lang={lang}/>
            </Card>
            <SL icon="👷" text={lc.p4} color={C.green}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.green}33`}}>
              <div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>👷 {lang==="fr"?"INSPECTION PSC MLC — SIMULATEUR":lang==="en"?"PSC MLC INSPECTION — SIMULATOR":"INSPECCIÓN PSC MLC — SIMULADOR"}</div>
              <PSCMLCInspectionSVG lang={lang}/>
            </Card>
            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>
            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>
            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang}/></Card>
            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(30,138,74,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.green}33`}}>
              <div style={{fontSize:11,color:C.green,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.green},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(30,138,74,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>Quiz — MLC 2006</div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 4":lang==="en"?"Lesson 4":"Lección 4"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}
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
            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.green},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(30,138,74,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 5 — COLREG →":lang==="en"?"LESSON 5 — COLREG →":lang==="es"?"LECCIÓN 5 — COLREG →":"LIÇÃO 5 — COLREG →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
