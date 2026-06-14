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
// SVG 1 — LIABILITY PYRAMID
// ══════════════════════════════════════
function LiabilityPyramidSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const levels = [
    { id:"marin", icon:"👷", color:C.steel,
      label:{fr:"Marin / Officier",en:"Seafarer / Officer",es:"Marinero / Oficial",pt:"Marítimo / Oficial"},
      civil:{fr:"Responsabilité personnelle limitée\nGénéralement couverte par l'employeur\nSauf faute intentionnelle grave",en:"Limited personal liability\nGenerally covered by employer\nExcept serious intentional fault",es:"Responsabilidad personal limitada\nGeneralmente cubierta por el empleador\nSalvo falta intencional grave",pt:"Responsabilidade pessoal limitada\nGeralmente coberta pelo empregador\nSalvo falta intencional grave"},
      penal:{fr:"Prison possible si négligence grave\nSuspension ou retrait de brevet\nAmende personnelle\nDroit au silence lors des enquêtes",en:"Prison possible for gross negligence\nCertificate suspension or revocation\nPersonal fine\nRight to silence during investigations",es:"Prisión posible por negligencia grave\nSuspensión o revocación del título\nMulta personal\nDerecho al silencio en las investigaciones",pt:"Prisão possível por negligência grave\nSuspensão ou revogação do certificado\nMulta pessoal\nDireito ao silêncio nas investigações"}},
    { id:"capitaine", icon:"⚓", color:C.orange,
      label:{fr:"Capitaine",en:"Captain",es:"Capitán",pt:"Capitão"},
      civil:{fr:"Représentant légal de l'armateur à bord\nResponsable des décisions opérationnelles\nPeut engager la responsabilité de la compagnie\nObligation de sauvetage (Art.98 UNCLOS)",en:"Legal representative of shipowner on board\nResponsible for operational decisions\nCan engage company liability\nObligation to rescue (UNCLOS Art.98)",es:"Representante legal del armador a bordo\nResponsable de las decisiones operativas\nPuede comprometer la responsabilidad de la compañía\nObligación de rescate (Art.98 CONVEMAR)",pt:"Representante legal do armador a bordo\nResponsável pelas decisões operacionais\nPode comprometer a responsabilidade da companhia\nObrigação de salvamento (Art.98 UNCLOS)"},
      penal:{fr:"Premier visé lors des accidents\nResponsabilité pénale personnelle\nAbsence du poste = aggravation\nNon-assistance à personne en danger = crime",en:"First targeted in accidents\nPersonal criminal liability\nAbandoning bridge = aggravation\nFailure to render assistance = crime",es:"Primero implicado en los accidentes\nResponsabilidad penal personal\nAusencia del puesto = agravante\nNo prestar asistencia = delito",pt:"Primeiro visado nos acidentes\nResponsabilidade penal pessoal\nAusência do posto = agravante\nNão prestação de auxílio = crime"}},
    { id:"compagnie", icon:"🏢", color:C.blue2,
      label:{fr:"Compagnie (ISM)",en:"Company (ISM)",es:"Compañía (ISM)",pt:"Companhia (ISM)"},
      civil:{fr:"Responsabilité principale selon Code ISM\nDOC + SMC → obligation de conformité\nAssurance P&I couvre la majorité\nSMS = preuve de diligence raisonnable",en:"Main liability under ISM Code\nDOC + SMC → compliance obligation\nP&I insurance covers majority\nSMS = proof of reasonable diligence",es:"Responsabilidad principal según Código ISM\nDOC + SMC → obligación de cumplimiento\nSeguro P&I cubre la mayoría\nSGS = prueba de diligencia razonable",pt:"Responsabilidade principal segundo Código ISM\nDOC + SMC → obrigação de conformidade\nSeguro P&I cobre a maioria\nSMS = prova de diligência razoável"},
      penal:{fr:"Poursuites pénales si faute systémique\nFalsification registres = crime\nDirigeants peuvent être poursuivis\nPiercing the corporate veil possible",en:"Criminal prosecution for systemic fault\nRecord falsification = crime\nManagement can be prosecuted\nPiercing the corporate veil possible",es:"Acciones penales por falta sistémica\nFalsificación de registros = delito\nLos directivos pueden ser procesados\nLevantamiento del velo societario posible",pt:"Ação penal por falta sistémica\nFalsificação de registos = crime\nDirigentes podem ser processados\nLevantamento do véu societário possível"}},
    { id:"armateur", icon:"🚢", color:C.gold2,
      label:{fr:"Armateur / Propriétaire",en:"Shipowner / Owner",es:"Armador / Propietario",pt:"Armador / Proprietário"},
      civil:{fr:"Responsabilité objective pour pollution (CLC)\nLimitation LLMC 1976 applicable\nAssurance H&M + P&I obligatoire\nFonds IOPC pour déversements majeurs",en:"Strict liability for pollution (CLC)\nLLMC 1976 limitation applicable\nMandatory H&M + P&I insurance\nIOPC Fund for major spills",es:"Responsabilidad objetiva por contaminación (CLC)\nLimitación LLMC 1976 aplicable\nSeguro H&M + P&I obligatorio\nFondo IOPC para vertidos importantes",pt:"Responsabilidade objetiva por poluição (CLC)\nLimitação LLMC 1976 aplicável\nSeguro H&M + P&I obrigatório\nFundo IOPC para derrames importantes"},
      penal:{fr:"Rarement poursuivi pénalement\nMais possible si complicité prouvée\nBlacklist ISM possible\nRetrait droit de battre pavillon",en:"Rarely criminally prosecuted\nBut possible if complicity proven\nISM blacklist possible\nWithdrawal of right to fly flag",es:"Raramente procesado penalmente\nPero posible si se prueba complicidad\nLista negra ISM posible\nRetirada del derecho a enarbolar pabellón",pt:"Raramente processado penalmente\nMas possível se cumplicidade provada\nLista negra ISM possível\nRetirada do direito de arvorar bandeira"}},
  ];
  const sel_ = sel!==null ? levels[sel] : null;
  return (
    <div>
      {/* Pyramid visual */}
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,marginBottom:12}}>
        {[...levels].reverse().map((l,i)=>{
          const idx = levels.length-1-i;
          const w = 40 + i*18;
          return (
            <div key={l.id} onClick={()=>setSel(sel===idx?null:idx)}
              style={{width:`${w}%`,padding:"7px 8px",borderRadius:8,cursor:"pointer",textAlign:"center",
                background:sel===idx?`${l.color}22`:"rgba(255,255,255,0.04)",
                border:`1.5px solid ${sel===idx?l.color:"rgba(255,255,255,0.1)"}`,
                transition:"all 0.2s"}}>
              <span style={{fontSize:14}}>{l.icon}</span>
              <span style={{fontSize:10,color:sel===idx?l.color:C.muted,fontWeight:700,marginLeft:6}}>{l.label[lang]||l.label.fr}</span>
            </div>
          );
        })}
        <div style={{fontSize:9,color:C.muted,marginTop:4,textAlign:"center"}}>
          {lang==="fr"?"▲ Responsabilité croissante":lang==="en"?"▲ Increasing liability":"▲ Responsabilidad creciente"}
        </div>
      </div>
      {sel_&&(
        <div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
          <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:8}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
          <div style={{fontSize:10,color:C.blue2,fontWeight:700,marginBottom:4}}>⚖️ {lang==="fr"?"RESPONSABILITÉ CIVILE":lang==="en"?"CIVIL LIABILITY":"RESPONSABILIDAD CIVIL"}</div>
          <div style={{fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line",marginBottom:8}}>{sel_.civil[lang]||sel_.civil.fr}</div>
          <div style={{fontSize:10,color:C.red,fontWeight:700,marginBottom:4}}>🔴 {lang==="fr"?"RESPONSABILITÉ PÉNALE":lang==="en"?"CRIMINAL LIABILITY":"RESPONSABILIDAD PENAL"}</div>
          <div style={{fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>{sel_.penal[lang]||sel_.penal.fr}</div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — INSURANCE TYPES
// ══════════════════════════════════════
function InsuranceTypesSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const [scenario, setScenario] = useState(null);
  const insurances = [
    { id:"pi", icon:"🤝", color:C.blue2,
      label:{fr:"P&I Club\n(Protection & Indemnity)",en:"P&I Club\n(Protection & Indemnity)",es:"Club P&I\n(Protección e Indemnización)",pt:"P&I Club\n(Proteção e Indemnização)"},
      desc:{fr:"MUTUELLE D'ASSURANCE MARITIME\nCréée par les armateurs au XIXe siècle\n13 clubs du International Group = 90% flotte mondiale\n\nCOUVERTURE :\n→ Responsabilité civile envers tiers\n→ Pollution maritime (hydrocarbures)\n→ Accidents corps / équipage\n→ Abandon d'équipage (MLC)\n→ Dommages cargaison (réclamations)\n→ Remorquage · sauvetage\n→ Litiges juridiques maritimes\n→ Certificat CLC (pollution)\n\nSPÉCIFICITÉ :\nPas de plafond · couverture illimitée possible\nPrimes mutualisées entre membres",en:"MARITIME INSURANCE MUTUAL\nCreated by shipowners in 19th century\n13 International Group clubs = 90% of world fleet\n\nCOVERAGE:\n→ Third-party civil liability\n→ Maritime pollution (oil)\n→ Crew bodily injury\n→ Crew abandonment (MLC)\n→ Cargo damage (claims)\n→ Towage · salvage\n→ Maritime legal disputes\n→ CLC certificate (pollution)\n\nSPECIFIC FEATURE:\nNo ceiling · unlimited coverage possible\nMutualized premiums among members",es:"MUTUA DE SEGUROS MARÍTIMOS\nCreada por los armadores en el siglo XIX\n13 clubes del International Group = 90% de la flota mundial\n\nCOBERTURA:\n→ Responsabilidad civil frente a terceros\n→ Contaminación marítima (hidrocarburos)\n→ Accidentes corporales / tripulación\n→ Abandono de tripulación (MLC)\n→ Daños a la carga (reclamaciones)\n→ Remolque · salvamento\n→ Litigios jurídicos marítimos\n→ Certificado CLC (contaminación)",pt:"MÚTUA DE SEGUROS MARÍTIMOS\nCriada pelos armadores no século XIX\n13 clubes do International Group = 90% da frota mundial\n\nCOBERTURA:\n→ Responsabilidade civil perante terceiros\n→ Poluição marítima (hidrocarbonetos)\n→ Acidentes corporais / tripulação\n→ Abandono de tripulação (MLC)\n→ Danos à carga (reclamações)\n→ Reboque · salvamento\n→ Litígios jurídicos marítimos\n→ Certificado CLC (poluição)"}},
    { id:"hm", icon:"🛡️", color:C.orange,
      label:{fr:"H&M\n(Hull & Machinery)",en:"H&M\n(Hull & Machinery)",es:"C&M\n(Casco y Maquinaria)",pt:"C&M\n(Casco e Máquinas)"},
      desc:{fr:"ASSURANCE CORPS DU NAVIRE\nAssurance classique (non mutuelle)\nLloyd's de Londres · marchés d'assurance\n\nCOUVERTURE :\n→ Dommages à la coque du navire\n→ Avaries machines\n→ Abordage (partie dommages au navire)\n→ Échouage · incendie · explosion\n→ Vol · sabotage\n→ Frais de sauvetage\n\nEXCLUSIONS COURANTES :\nVétusté · usure normale\nFaute intentionnelle de l'armateur\nGuerre · terrorisme (guerre séparée)\n\nVALEUR ASSURÉE :\nValeur agréée ou valeur de marché",en:"VESSEL HULL INSURANCE\nClassic insurance (non-mutual)\nLloyd's of London · insurance markets\n\nCOVERAGE:\n→ Vessel hull damage\n→ Machinery breakdown\n→ Collision (vessel damage portion)\n→ Grounding · fire · explosion\n→ Theft · sabotage\n→ Salvage costs\n\nCOMMON EXCLUSIONS:\nDeterioration · normal wear\nShipowner's intentional fault\nWar · terrorism (separate war cover)\n\nINSURED VALUE:\nAgreed value or market value",es:"SEGURO DE CASCO DEL BUQUE\nSeguro clásico (no mutua)\nLloyd's de Londres · mercados de seguros\n\nCOBERTURA:\n→ Daños al casco del buque\n→ Averías de máquinas\n→ Abordaje (parte de daños al buque)\n→ Encalladura · incendio · explosión\n→ Robo · sabotaje\n→ Gastos de salvamento\n\nEXCLUSIONES HABITUALES:\nVetustez · desgaste normal\nFalta intencional del armador\nGuerra · terrorismo (cobertura guerra separada)",pt:"SEGURO DO CASCO DO NAVIO\nSeguro clássico (não mútuo)\nLloyd's de Londres · mercados de seguros\n\nCOBERTURA:\n→ Danos ao casco do navio\n→ Avarias de máquinas\n→ Abalroamento (parte dos danos ao navio)\n→ Encalhe · incêndio · explosão\n→ Roubo · sabotagem\n→ Custos de salvamento\n\nEXCLUSÕES COMUNS:\nVetustez · desgaste normal\nFalta intencional do armador\nGuerra · terrorismo (cobertura guerra separada)"}},
    { id:"cargo", icon:"📦", color:C.green,
      label:{fr:"Cargo Insurance\n(Marchandises)",en:"Cargo Insurance\n(Goods)",es:"Seguro de Carga\n(Mercancías)",pt:"Seguro de Carga\n(Mercadorias)"},
      desc:{fr:"ASSURANCE DE LA CARGAISON\nSouscrite par le chargeur/destinataire\nInstitut de Londres (Cargo Clauses)\n\nCLAUSES PRINCIPALES :\nClause A = tous risques\nClause B = risques énumérés (incendie, échouage...)\nClause C = risques minimaux\n\nCOUVERTURE TYPE :\n→ Avaries communes et particulières\n→ Perte totale ou partielle\n→ Dommages lors chargement/déchargement\n→ Vol · pillage · contamination\n\nCONNAISSEMENT (Bill of Lading) :\nDocument légal de transport\nProuve la prise en charge par le transporteur",en:"CARGO INSURANCE\nSubscribed by shipper/consignee\nInstitute of London (Cargo Clauses)\n\nMAIN CLAUSES:\nClause A = all risks\nClause B = named risks (fire, grounding...)\nClause C = minimum risks\n\nTYPICAL COVERAGE:\n→ General and particular average\n→ Total or partial loss\n→ Loading/unloading damage\n→ Theft · pilferage · contamination\n\nBILL OF LADING:\nLegal transport document\nProves carrier's receipt of goods",es:"SEGURO DE CARGA\nSuscrito por el cargador/destinatario\nInstituto de Londres (Cargo Clauses)\n\nCLÁUSULAS PRINCIPALES:\nCláusula A = todos los riesgos\nCláusula B = riesgos enumerados\nCláusula C = riesgos mínimos\n\nCOBERTURA TIPO:\n→ Averías gruesas y particulares\n→ Pérdida total o parcial\n→ Daños en carga/descarga\n→ Robo · pillaje · contaminación\n\nCONOCIMIENTO DE EMBARQUE:\nDocumento legal de transporte",pt:"SEGURO DE CARGA\nSubscrito pelo carregador/destinatário\nInstituto de Londres (Cargo Clauses)\n\nCLÁUSULAS PRINCIPAIS:\nCláusula A = todos os riscos\nCláusula B = riscos enumerados\nCláusula C = riscos mínimos\n\nCOBERTURA TIPO:\n→ Avarias comuns e particulares\n→ Perda total ou parcial\n→ Danos no carregamento/descarga\n→ Roubo · pilhagem · contaminação\n\nCONHECIMENTO DE EMBARQUE:\nDocumento legal de transporte"}},
    { id:"war", icon:"💣", color:C.red,
      label:{fr:"War Risk\n(Risques de guerre)",en:"War Risk\n(War risks)",es:"Riesgo de Guerra\n(Riesgos de guerra)",pt:"Risco de Guerra\n(Riscos de guerra)"},
      desc:{fr:"ASSURANCE RISQUES DE GUERRE\nNon comprise dans H&M standard\nSouscrite séparément\nMarchés spécialisés (Lloyd's War)\n\nCOUVERTURE :\n→ Dommages causés par la guerre\n→ Mines · torpilles\n→ Actes terroristes (maritime)\n→ Piraterie (certaines polices)\n→ Saisie par gouvernement étranger\n→ Détention arbitraire\n\nZONES À RISQUE :\nJRC (Joint War Committee) publie la liste\nPrimes très élevées en zones de conflit\nEx : Mer Rouge 2024 → primes ×10\n\nKIDNAP & RANSOM (K&R) :\nAssurance spéciale piraterie",en:"WAR RISK INSURANCE\nNot included in standard H&M\nSubscribed separately\nSpecialized markets (Lloyd's War)\n\nCOVERAGE:\n→ War damage\n→ Mines · torpedoes\n→ Terrorist acts (maritime)\n→ Piracy (some policies)\n→ Seizure by foreign government\n→ Arbitrary detention\n\nHIGH-RISK AREAS:\nJRC (Joint War Committee) publishes list\nVery high premiums in conflict zones\nEx: Red Sea 2024 → premiums ×10\n\nKIDNAP & RANSOM (K&R):\nSpecial piracy insurance",es:"SEGURO DE RIESGO DE GUERRA\nNo incluido en el C&M estándar\nSuscrito por separado\nMercados especializados (Lloyd's War)\n\nCOBERTURA:\n→ Daños causados por la guerra\n→ Minas · torpedos\n→ Actos terroristas (marítimos)\n→ Piratería (algunas pólizas)\n→ Incautación por gobierno extranjero\n→ Detención arbitraria\n\nZONAS DE RIESGO:\nJRC (Joint War Committee) publica la lista\nPrimas muy elevadas en zonas de conflicto\nEj: Mar Rojo 2024 → primas ×10",pt:"SEGURO DE RISCO DE GUERRA\nNão incluído no C&M padrão\nSubscrito separadamente\nMercados especializados (Lloyd's War)\n\nCOBERTURA:\n→ Danos causados pela guerra\n→ Minas · torpedos\n→ Atos terroristas (marítimos)\n→ Pirataria (algumas apólices)\n→ Apreensão por governo estrangeiro\n→ Detenção arbitrária\n\nZONAS DE RISCO:\nJRC (Joint War Committee) publica a lista\nPrémios muito elevados em zonas de conflito\nEx: Mar Vermelho 2024 → prémios ×10"},},
  ];
  const sel_ = sel!==null ? insurances[sel] : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {insurances.map((ins,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)}
            style={{padding:"10px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===i?`${ins.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===i?ins.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:22,marginBottom:4}}>{ins.icon}</div>
            <div style={{fontSize:8,color:sel===i?ins.color:C.muted,fontWeight:700,lineHeight:1.3,whiteSpace:"pre-line"}}>{ins.label[lang]||ins.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {(sel_.label[lang]||sel_.label.fr).replace('\n',' ')}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>:<div style={{textAlign:"center",padding:"10px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche un type d'assurance pour les détails":lang==="en"?"Tap an insurance type for details":"Toca un tipo de seguro para detalles"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — LLMC LIMITATION CALCULATOR
// ══════════════════════════════════════
function LLMCCalculatorSVG({ lang }) {
  const [gt, setGt] = useState(5000);
  const [type, setType] = useState("property");

  // LLMC 1996 Protocol rates (in SDR)
  const calcLimit = (tonnage, claimType) => {
    let limit = 0;
    if (claimType === "property") {
      // Property claims
      if (tonnage <= 2000) limit = 1_000_000;
      else if (tonnage <= 30000) limit = 1_000_000 + (tonnage-2000)*400;
      else if (tonnage <= 70000) limit = 12_200_000 + (tonnage-30000)*300;
      else limit = 24_200_000 + (tonnage-70000)*200;
    } else {
      // Personal injury claims
      if (tonnage <= 2000) limit = 2_000_000;
      else if (tonnage <= 30000) limit = 2_000_000 + (tonnage-2000)*800;
      else if (tonnage <= 70000) limit = 24_400_000 + (tonnage-30000)*600;
      else limit = 48_400_000 + (tonnage-70000)*400;
    }
    return limit;
  };

  const limit = calcLimit(gt, type);
  const limitM = (limit/1_000_000).toFixed(2);
  // Approx SDR to USD (1 SDR ≈ 1.33 USD)
  const limitUSD = (limit*1.33/1_000_000).toFixed(2);

  return (
    <div>
      <div style={{marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.muted,marginBottom:4}}>
          <span>{lang==="fr"?"Tonnage brut (GT):":lang==="en"?"Gross Tonnage (GT):":"Arqueo Bruto (GT):"} <b style={{color:C.gold2}}>{gt.toLocaleString()} GT</b></span>
        </div>
        <input type="range" min={500} max={200000} step={500} value={gt}
          onChange={e=>setGt(Number(e.target.value))}
          style={{width:"100%",accentColor:C.gold2}}/>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:8,color:C.muted,marginTop:2}}>
          <span>500 GT</span><span>100k GT</span><span>200k GT</span>
        </div>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        {["property","personal"].map(tp=>(
          <button key={tp} onClick={()=>setType(tp)} style={{
            flex:1,padding:"8px 4px",borderRadius:10,cursor:"pointer",textAlign:"center",
            background:type===tp?`${tp==="property"?C.orange:C.red}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${type===tp?(tp==="property"?C.orange:C.red):"rgba(255,255,255,0.08)"}`,
            fontSize:10,color:type===tp?(tp==="property"?C.orange:C.red):C.muted,fontWeight:700}}>
            {tp==="property"
              ?(lang==="fr"?"🏗️ Dommages\nmatériels":lang==="en"?"🏗️ Property\ndamage":"🏗️ Daños\nmateriales")
              :(lang==="fr"?"👤 Préjudice\ncorporel":lang==="en"?"👤 Personal\ninjury":"👤 Daños\ncorporales")}
          </button>
        ))}
      </div>
      <div style={{padding:"14px",borderRadius:14,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}44`,textAlign:"center"}}>
        <div style={{fontSize:10,color:C.muted,marginBottom:6}}>
          {lang==="fr"?"LIMITE DE RESPONSABILITÉ LLMC 1996":lang==="en"?"LLMC 1996 LIABILITY LIMIT":"LÍMITE DE RESPONSABILIDAD LLMC 1996"}
        </div>
        <div style={{fontSize:24,fontWeight:700,color:C.gold2,fontFamily:"'Cinzel',serif"}}>{limitM}M SDR</div>
        <div style={{fontSize:14,color:C.muted,marginTop:4}}>≈ ${limitUSD}M USD</div>
        <div style={{marginTop:10,fontSize:9,color:C.muted,lineHeight:1.5}}>
          {lang==="fr"
            ?`Navire de ${gt.toLocaleString()} GT · ${type==="property"?"Dommages matériels":"Préjudices corporels"}\nBasé sur Convention LLMC 1996 · 1 SDR ≈ 1,33 USD`
            :lang==="en"
            ?`Vessel of ${gt.toLocaleString()} GT · ${type==="property"?"Property damage":"Personal injury"}\nBased on LLMC 1996 Convention · 1 SDR ≈ 1.33 USD`
            :`Buque de ${gt.toLocaleString()} TB · ${type==="property"?"Daños materiales":"Daños corporales"}\nBasado en Convenio LLMC 1996 · 1 DTS ≈ 1,33 USD`}
        </div>
        {limit > 50_000_000 && (
          <div style={{marginTop:8,padding:"6px",borderRadius:8,background:"rgba(192,57,43,0.1)",border:`1px solid ${C.red}33`,fontSize:9,color:C.red}}>
            ⚠️ {lang==="fr"?"Grands navires : limite peut être dépassée en cas de catastrophe majeure":lang==="en"?"Large vessels: limit may be exceeded in major disaster":"Buques grandes: el límite puede superarse en catástrofe importante"}
          </div>
        )}
      </div>
      <div style={{marginTop:8,padding:"8px 10px",borderRadius:10,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",fontSize:9,color:C.muted,lineHeight:1.5}}>
        <b style={{color:C.white}}>⚠️ {lang==="fr"?"EXCEPTION:":lang==="en"?"EXCEPTION:":"EXCEPCIÓN:"}</b>{" "}
        {lang==="fr"?"La limitation ne s'applique PAS si l'armateur a commis une faute personnelle intentionnelle ou téméraire (LLMC Art.4)"
        :lang==="en"?"Limitation does NOT apply if the shipowner committed a personal intentional or reckless fault (LLMC Art.4)"
        :"La limitación NO se aplica si el armador cometió una falta personal intencional o temeraria (LLMC Art.4)"}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — SHIP ARREST SIMULATOR
// ══════════════════════════════════════
function ShipArrestSVG({ lang }) {
  const [phase, setPhase] = useState("idle");
  const [step, setStep] = useState(0);

  const steps_data = [
    { icon:"⚓", color:C.blue2,
      label:{fr:"Navire au port",en:"Vessel in port",es:"Buque en puerto",pt:"Navio no porto"},
      desc:{fr:"MV Poseidon arrive au port de Rotterdam\nCargaison livrée endommagée\nMontant du sinistre : €2,8 millions\nRéceptionnaire refuse de payer les frais portuaires\n→ Décision : demander l'arrêt du navire",en:"MV Poseidon arrives at Rotterdam port\nCargo delivered damaged\nClaim amount: €2.8 million\nConsignee refuses to pay port fees\n→ Decision: request vessel arrest",es:"MV Poseidon llega al puerto de Rotterdam\nCargamento entregado dañado\nImporte del siniestro: €2,8 millones\nDestinatario se niega a pagar los gastos portuarios\n→ Decisión: solicitar la retención del buque",pt:"MV Poseidon chega ao porto de Roterdão\nCarga entregue danificada\nMontante do sinistro: €2,8 milhões\nDestinatário recusa pagar as taxas portuárias\n→ Decisão: solicitar o arresto do navio"}},
    { icon:"⚖️", color:C.orange,
      label:{fr:"Demande au tribunal",en:"Court application",es:"Solicitud al tribunal",pt:"Pedido ao tribunal"},
      desc:{fr:"Avocat maritime : dépôt de la demande d'arrêt\nTribunal de commerce maritime néerlandais\nPièces fournies : connaissement · expertise dommages\nDélai : 24-48 heures en procédure d'urgence\n→ Ordonnance d'arrêt provisoire accordée",en:"Maritime lawyer: filing of arrest application\nDutch commercial maritime court\nDocuments: bill of lading · damage survey\nTimeline: 24-48 hours in urgent procedure\n→ Provisional arrest order granted",es:"Abogado marítimo: presentación de la solicitud de retención\nTribunal comercial marítimo neerlandés\nDocumentos: conocimiento de embarque · peritaje de daños\nPlazo: 24-48 horas en procedimiento de urgencia\n→ Orden provisional de retención concedida",pt:"Advogado marítimo: apresentação do pedido de arresto\nTribunal comercial marítimo neerlandês\nDocumentos: conhecimento de embarque · peritagem danos\nPrazo: 24-48 horas em procedimento de urgência\n→ Ordem provisória de arresto concedida"}},
    { icon:"🔴", color:C.red,
      label:{fr:"Navire arrêté",en:"Vessel arrested",es:"Buque retenido",pt:"Navio arrestado"},
      desc:{fr:"Huissier se présente à bord\nSignification de l'ordonnance au capitaine\nNavire : IMMOBILISÉ · ne peut plus appareiller\nAutorités portuaires informées\nCoûts : frais de port continuent (~€15 000/jour)\n→ Armateur sous pression maximale",en:"Bailiff boards the vessel\nOrder served to captain\nVessel: IMMOBILIZED · cannot depart\nPort authorities informed\nCosts: port fees continue (~€15,000/day)\n→ Shipowner under maximum pressure",es:"Oficial judicial se presenta a bordo\nNotificación de la orden al capitán\nBuque: INMOVILIZADO · no puede zarpar\nAutoridades portuarias informadas\nCostes: tasas portuarias continúan (~€15.000/día)\n→ Armador bajo presión máxima",pt:"Oficial de justiça apresenta-se a bordo\nNotificação da ordem ao capitão\nNavio: IMOBILIZADO · não pode partir\nAutoridades portuárias informadas\nCustos: taxas portuárias continuam (~€15.000/dia)\n→ Armador sob pressão máxima"}},
    { icon:"🤝", color:C.green,
      label:{fr:"Lettre de garantie P&I",en:"P&I letter of undertaking",es:"Carta de garantía P&I",pt:"Carta de garantia P&I"},
      desc:{fr:"P&I Club de l'armateur intervient\nLetter of Undertaking (LOU) émise\nGarantie P&I = €3,5 millions\n(montant sinistre + frais + intérêts)\nTribunal accepte la garantie\n→ Navire LIBÉRÉ contre la garantie\n→ Litige continue devant arbitrage London",en:"Shipowner's P&I Club intervenes\nLetter of Undertaking (LOU) issued\nP&I guarantee = €3.5 million\n(claim + costs + interest)\nCourt accepts guarantee\n→ Vessel RELEASED against guarantee\n→ Dispute continues in London arbitration",es:"Club P&I del armador interviene\nCarta de Compromiso (LOU) emitida\nGarantía P&I = €3,5 millones\n(siniestro + costes + intereses)\nTribunal acepta la garantía\n→ Buque LIBERADO contra garantía\n→ Litigio continúa en arbitraje Londres",pt:"P&I Club do armador intervém\nCarta de Compromisso (LOU) emitida\nGarantia P&I = €3,5 milhões\n(sinistro + custos + juros)\nTribunal aceita a garantia\n→ Navio LIBERTADO contra garantia\n→ Litígio continua em arbitragem Londres"}},
  ];

  useEffect(()=>{
    if(phase==="running"&&step<steps_data.length){
      const t=setTimeout(()=>setStep(s=>s+1),900);
      return()=>clearTimeout(t);
    }
    if(phase==="running"&&step>=steps_data.length) setPhase("done");
  },[phase,step]);

  const s=steps_data[Math.min(step,steps_data.length-1)];
  return (
    <div>
      {phase==="idle"&&(
        <div style={{textAlign:"center",padding:"16px 0"}}>
          <div style={{fontSize:40,marginBottom:8}}>⚓</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:12,lineHeight:1.5}}>
            {lang==="fr"?"Simulation : Arrêt d'un navire pour réclamation cargo":lang==="en"?"Simulation: Vessel arrest for cargo claim":"Simulación: Arresto de buque por reclamación de carga"}
          </div>
          <button onClick={()=>setPhase("running")} style={{padding:"12px 24px",borderRadius:12,background:`linear-gradient(135deg,${C.orange},${C.gold2})`,border:"none",color:C.white,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
            ⚓ {lang==="fr"?"LANCER LA SIMULATION":lang==="en"?"START SIMULATION":"INICIAR SIMULACIÓN"}
          </button>
        </div>
      )}
      {(phase==="running"||phase==="done")&&(
        <div>
          {steps_data.slice(0,Math.max(1,step)).map((st,i)=>(
            <div key={i} style={{display:"flex",gap:10,padding:"9px 10px",borderRadius:10,marginBottom:6,
              background:`${st.color}10`,border:`1px solid ${st.color}33`,animation:"fadeUp 0.3s ease"}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:`${st.color}22`,border:`1.5px solid ${st.color}`,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{st.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:11,fontWeight:700,color:st.color,marginBottom:2}}>{st.label[lang]||st.label.fr}</div>
                <div style={{fontSize:9,color:C.muted,lineHeight:1.5,whiteSpace:"pre-line"}}>{st.desc[lang]||st.desc.fr}</div>
              </div>
            </div>
          ))}
          {phase==="done"&&(
            <div style={{padding:"10px",borderRadius:10,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:10,color:C.green,textAlign:"center",marginTop:4}}>
              ✅ {lang==="fr"?"Navire libéré · Litige en cours · P&I Club gère le dossier":lang==="en"?"Vessel released · Dispute ongoing · P&I Club manages case":"Buque liberado · Litigio en curso · Club P&I gestiona el expediente"}
            </div>
          )}
          {phase==="done"&&(
            <button onClick={()=>{setPhase("idle");setStep(0);}} style={{width:"100%",marginTop:8,padding:"8px",borderRadius:10,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:C.muted,fontSize:11,cursor:"pointer"}}>
              🔄 {lang==="fr"?"Recommencer":"Restart"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — ERIKA
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"Naufrage MT Erika — Bretagne, France (1999)",teaser:"Pétrolier · 20 000 tonnes HFO · Responsabilité multi-acteurs · €200M · Jurisprudence révolutionnaire",what:"Le pétrolier MT Erika se brise en deux et coule au large de la Bretagne le 12 décembre 1999. 20 000 tonnes d'HFO (heavy fuel oil) polluent 400 km de côtes françaises. L'Erika naviguait sous pavillon maltais pour le compte de Total, avec une coque vétuste non conforme. L'affaire devient le procès maritime le plus important de l'histoire française.",cause:"• Navire vétuste : 24 ans · rouille · coque structurellement faible\n• Société de classification RINA : certificats accordés malgré l'état\n• Total : affréteur ayant accepté un navire à risque\n• État du pavillon (Malte) : contrôles insuffisants\n• Armateur Tevere Shipping : gestion de navires sous-norme\n• PSC : défaillances de contrôle",lessons:"✓ Arrêt de la Cour de cassation (2012) = révolutionnaire\n✓ Total CONDAMNÉ comme affréteur (pas seulement propriétaire)\n✓ RINA condamné (première société de classification condamnée)\n✓ Concept juridique : 'préjudice écologique' reconnu en France\n✓ Résultat : €200M de dommages · loi Erika · Erika III paquet maritime\n✓ Les affréteurs ont désormais une obligation de diligence sur la qualité du navire",link:"🔗 Lien L7 : L'affaire Erika a révolutionné la responsabilité maritime. Elle prouve que TOUS les acteurs (affréteur, classificateur, armateur, État pavillon) peuvent être tenus responsables. La chaîne de responsabilité s'est étendue bien au-delà du seul propriétaire du navire."},
    en:{title:"MT Erika Sinking — Brittany, France (1999)",teaser:"Tanker · 20,000 tonnes HFO · Multi-actor liability · €200M · Revolutionary jurisprudence",what:"The tanker MT Erika breaks in two and sinks off Brittany on December 12, 1999. 20,000 tonnes of HFO (heavy fuel oil) pollute 400 km of French coastline. The Erika sailed under Maltese flag for Total, with an old non-compliant hull. The case becomes the most important maritime trial in French history.",cause:"• Aging vessel: 24 years · rust · structurally weak hull\n• Classification society RINA: certificates granted despite condition\n• Total: charterer having accepted a risky vessel\n• Flag state (Malta): insufficient controls\n• Shipowner Tevere Shipping: substandard vessel management\n• PSC: control failures",lessons:"✓ Court of Cassation ruling (2012) = revolutionary\n✓ Total CONVICTED as charterer (not just owner)\n✓ RINA convicted (first classification society ever convicted)\n✓ Legal concept: 'ecological damage' recognized in France\n✓ Result: €200M damages · Erika law · Erika III maritime package\n✓ Charterers now have a due diligence obligation on vessel quality",link:"🔗 L7 Link: The Erika case revolutionized maritime liability. It proves ALL actors (charterer, classifier, shipowner, flag state) can be held liable. The chain of responsibility extended far beyond just the vessel owner."},
    es:{title:"Hundimiento MT Erika — Bretaña, Francia (1999)",teaser:"Petrolero · 20.000 toneladas HFO · Responsabilidad multiactor · €200M · Jurisprudencia revolucionaria",what:"El petrolero MT Erika se parte en dos y se hunde frente a Bretaña el 12 de diciembre de 1999. 20.000 toneladas de HFO (fuel pesado) contaminan 400 km de costas francesas. El Erika navegaba bajo pabellón maltés para Total, con un casco vetusto no conforme.",cause:"• Buque vetusto: 24 años · óxido · casco estructuralmente débil\n• Sociedad de clasificación RINA: certificados concedidos pese al estado\n• Total: fletador que aceptó un buque de riesgo\n• Estado de pabellón (Malta): controles insuficientes\n• Armador Tevere Shipping: gestión de buques subestándar",lessons:"✓ Sentencia del Tribunal de Casación (2012) = revolucionaria\n✓ Total CONDENADO como fletador (no solo el propietario)\n✓ RINA condenada (primera sociedad de clasificación condenada)\n✓ Concepto jurídico: 'perjuicio ecológico' reconocido en Francia\n✓ Resultado: €200M de daños · ley Erika · paquete marítimo Erika III",link:"🔗 Vínculo L7: El caso Erika revolucionó la responsabilidad marítima. Demuestra que TODOS los actores pueden ser declarados responsables."},
    pt:{title:"Naufrágio MT Erika — Bretanha, França (1999)",teaser:"Petroleiro · 20.000 toneladas HFO · Responsabilidade multi-atores · €200M · Jurisprudência revolucionária",what:"O petroleiro MT Erika parte-se em dois e afunda ao largo da Bretanha a 12 de dezembro de 1999. 20.000 toneladas de HFO (fuelóleo pesado) poluem 400 km de costas francesas. O Erika navegava sob bandeira maltesa para a Total, com um casco velho não conforme.",cause:"• Navio velho: 24 anos · ferrugem · casco estruturalmente fraco\n• Sociedade de classificação RINA: certificados concedidos apesar do estado\n• Total: afretador que aceitou um navio de risco\n• Estado de bandeira (Malta): controlos insuficientes\n• Armador Tevere Shipping: gestão de navios abaixo do padrão",lessons:"✓ Acórdão do Tribunal de Cassação (2012) = revolucionário\n✓ Total CONDENADA como afretadora (não apenas o proprietário)\n✓ RINA condenada (primeira sociedade de classificação condenada)\n✓ Conceito jurídico: 'dano ecológico' reconhecido em França\n✓ Resultado: €200M de danos · lei Erika · pacote marítimo Erika III",link:"🔗 Vínculo L7: O caso Erika revolucionou a responsabilidade marítima. Prova que TODOS os atores podem ser responsabilizados."},
  };
  const c=d[lang]||d.fr;
  return(
    <div style={{background:"rgba(192,57,43,0.08)",border:`1.5px solid ${C.red}44`,borderRadius:18,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>🛢️</span>
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
      {id:"q1",q:"P&I Club = Protection and ... ?\n(Répondre : le 2ème mot)",correct:"Indemnity"},
      {id:"q2",q:"La Convention LLMC 1976 limite la responsabilité de l'armateur selon quel critère ?\n(Répondre : 1 mot)",correct:"tonnage"},
      {id:"q3",q:"Dans l'affaire Erika, quel acteur a été condamné en PREMIER au monde pour ce type d'accusation ?\n(Répondre : type d'organisation)",correct:"société de classification"},
    ],
    en:[
      {id:"q1",q:"P&I Club = Protection and ... ?\n(Answer: the 2nd word)",correct:"Indemnity"},
      {id:"q2",q:"The LLMC 1976 Convention limits shipowner liability based on what criterion?\n(Answer: 1 word)",correct:"tonnage"},
      {id:"q3",q:"In the Erika case, what actor was convicted for the FIRST TIME in the world?\n(Answer: type of organization)",correct:"classification society"},
    ],
    es:[
      {id:"q1",q:"Club P&I = Protección e ... ?\n(Responder: la 2ª palabra)",correct:"Indemnización"},
      {id:"q2",q:"¿El Convenio LLMC 1976 limita la responsabilidad del armador según qué criterio?\n(Responder: 1 palabra)",correct:"tonelaje"},
      {id:"q3",q:"En el caso Erika, ¿qué actor fue condenado por PRIMERA VEZ en el mundo?\n(Responder: tipo de organización)",correct:"sociedad de clasificación"},
    ],
    pt:[
      {id:"q1",q:"P&I Club = Proteção e ... ?\n(Responder: a 2ª palavra)",correct:"Indemnização"},
      {id:"q2",q:"A Convenção LLMC 1976 limita a responsabilidade do armador segundo que critério?\n(Responder: 1 palavra)",correct:"tonelagem"},
      {id:"q3",q:"No caso Erika, que ator foi condenado pela PRIMEIRA VEZ no mundo?\n(Responder: tipo de organização)",correct:"sociedade de classificação"},
    ],
  };
  const list=qs[lang]||qs.fr;
  const chk=(q,val)=>{
    const v=val.trim().toLowerCase();
    if(q.id==="q1") return v.includes("indemnit")||v.includes("indemniz")||v.includes("indemniz");
    if(q.id==="q2") return v.includes("tonnage")||v.includes("tonelaj")||v.includes("tonelagem");
    if(q.id==="q3") return v.includes("classif");
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.orange}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : P&I = Protection & Indemnity · LLMC = limite selon tonnage · Erika = première condamnation classificateur"
        :lang==="en"?"💡 Reminders: P&I = Protection & Indemnity · LLMC = limit by tonnage · Erika = first classification society conviction"
        :lang==="es"?"💡 Recordatorios: P&I = Protección e Indemnización · LLMC = límite según tonelaje · Erika = primera condena sociedad clasificación"
        :"💡 Lembretes: P&I = Proteção & Indemnização · LLMC = limite por tonelagem · Erika = primeira condenação sociedade classificação"}
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
        {lang==="fr"?"✅ Q1: Indemnity (P&I = Protection & Indemnity · mutuelle maritime)\n✅ Q2: Tonnage (LLMC 1976 = calcul en SDR selon le tonnage brut du navire)\n✅ Q3: Société de classification (RINA condamnée dans l'affaire Erika · première mondiale)"
        :lang==="en"?"✅ Q1: Indemnity (P&I = Protection & Indemnity · maritime mutual)\n✅ Q2: Tonnage (LLMC 1976 = calculation in SDR based on vessel gross tonnage)\n✅ Q3: Classification society (RINA convicted in Erika case · world first)"
        :"✅ Q1: Indemnización · Q2: Tonelaje · Q3: Sociedad de clasificación"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

const QUIZ = {
  fr:[
    {q:"Un P&I Club est une mutuelle d'assurance maritime. Quelle est sa principale couverture ?",opts:["Les dommages au corps du navire (H&M)","La responsabilité civile envers les tiers — pollution · équipage · cargaison · litiges","La cargaison transportée","Les risques de guerre"],correct:1,expl:"P&I Club (Protection & Indemnity) = mutuelle maritime couvrant la responsabilité CIVILE envers les tiers. Couvertures principales : pollution maritime (certificat CLC), accidents équipage, dommages cargaison (réclamations tiers), assistance aux marins abandonnés (MLC), litiges juridiques. Les 13 clubs du International Group couvrent 90% de la flotte mondiale. Différent du H&M (corps du navire) et Cargo (marchandises)."},
    {q:"La Convention LLMC 1976/1996 permet à l'armateur de limiter sa responsabilité civile selon quel critère principal ?",opts:["Le montant des dommages réels","Le tonnage brut du navire (GT) — calculé en SDR","La valeur du navire","La nationalité de l'armateur"],correct:1,expl:"LLMC 1976 (amendée par Protocole 1996) = Limitation of Liability for Maritime Claims. Limite de responsabilité calculée en SDR (Droits de Tirage Spéciaux) en fonction du tonnage brut (GT). Ex : 5000 GT = environ 3M SDR pour dommages matériels. EXCEPTION : la limitation ne s'applique PAS si l'armateur a commis une faute personnelle intentionnelle ou téméraire (Art.4 LLMC)."},
    {q:"Dans l'affaire Erika (1999), quelle organisation a été condamnée pour la première fois au monde pour sa responsabilité dans le naufrage ?",opts:["L'État du pavillon maltais","La société de classification RINA","L'armateur Tevere Shipping","L'OMI"],correct:1,expl:"Affaire Erika (arrêt Cour de cassation 2012) = révolution juridique. RINA (société de classification italienne) condamnée pour la PREMIÈRE FOIS au monde. RINA avait accordé des certificats de navigabilité à l'Erika malgré un état vétuste. Total (affréteur) également condamné — première condamnation d'un affréteur. Concept de 'préjudice écologique' reconnu. €200M de dommages."},
    {q:"Un navire peut-il être arrêté (ship arrest) dans un port pour garantir une réclamation maritime ?",opts:["Non — seul le tribunal maritime peut saisir les actifs","Oui — procédure judiciaire permettant d'immobiliser un navire dans un port pour garantir une créance maritime (cargo · abordage · salaires)","Non — seul le P&I Club peut arrêter un navire","Oui — mais uniquement pour dettes de carburant"],correct:1,expl:"Ship arrest (arrêt de navire) = procédure juridique permettant d'immobiliser un navire dans un port pour garantir une créance maritime. Convention de Genève 1952 + Convention de Genève 1999. Créances éligibles : abordages, dommages cargaison, salaires d'équipage, carburant, remorquage. Procédure urgente (24-48h). Libération possible contre lettre de garantie P&I (LOU). Pression maximale sur l'armateur."},
    {q:"Qu'est-ce que la 'Letter of Undertaking' (LOU) émise par un P&I Club ?",opts:["Un contrat d'assurance classique","Garantie financière émise par le P&I Club en lieu et place du navire arrêté — permet la libération du navire pendant que le litige se poursuit","Un certificat de conformité","Une lettre de navigation autorisée"],correct:1,expl:"LOU = Letter of Undertaking (lettre d'engagement). Émise par le P&I Club de l'armateur pour garantir le paiement de la créance si la réclamation est fondée. Montant = créance + frais + intérêts (généralement +20%). En échange de la LOU, le tribunal ordonne la libération du navire. Le navire peut reprendre ses activités pendant que le litige se règle par arbitrage ou tribunal. Outil essentiel en droit maritime commercial."},
  ],
  en:[
    {q:"A P&I Club is a maritime insurance mutual. What is its main coverage?",opts:["Hull damage (H&M)","Third-party civil liability — pollution · crew · cargo · disputes","Transported cargo","War risks"],correct:1,expl:"P&I Club (Protection & Indemnity) = maritime mutual covering CIVIL liability toward third parties. Main coverages: maritime pollution (CLC certificate), crew accidents, cargo damage (third-party claims), abandoned seafarers (MLC), legal disputes. The 13 International Group clubs cover 90% of the world fleet. Different from H&M (vessel hull) and Cargo (goods)."},
    {q:"The LLMC 1976/1996 Convention allows a shipowner to limit civil liability based on what main criterion?",opts:["The actual damages amount","The vessel's gross tonnage (GT) — calculated in SDR","The vessel's value","The shipowner's nationality"],correct:1,expl:"LLMC 1976 (amended by 1996 Protocol) = Limitation of Liability for Maritime Claims. Liability limit calculated in SDR (Special Drawing Rights) based on gross tonnage (GT). E.g.: 5,000 GT ≈ 3M SDR for property claims. EXCEPTION: limitation does NOT apply if shipowner committed a personal intentional or reckless fault (LLMC Art.4)."},
    {q:"In the Erika case (1999), which organization was convicted for the first time in the world for its responsibility in the sinking?",opts:["The Maltese flag state","Classification society RINA","Shipowner Tevere Shipping","IMO"],correct:1,expl:"Erika case (Court of Cassation ruling 2012) = legal revolution. RINA (Italian classification society) convicted for the FIRST TIME in the world. RINA had granted seaworthiness certificates to Erika despite its age. Total (charterer) also convicted — first charterer conviction. 'Ecological damage' concept recognized. €200M in damages."},
    {q:"Can a vessel be arrested (ship arrest) in a port to secure a maritime claim?",opts:["No — only maritime tribunals can seize assets","Yes — judicial procedure allowing a vessel to be immobilized in a port to secure a maritime claim (cargo · collision · wages)","No — only P&I Club can arrest a vessel","Yes — but only for fuel debts"],correct:1,expl:"Ship arrest = legal procedure allowing a vessel to be immobilized in a port to secure a maritime claim. Geneva Convention 1952 + 1999. Eligible claims: collisions, cargo damage, crew wages, bunkers, towage. Urgent procedure (24-48h). Release possible against P&I guarantee (LOU). Maximum pressure on shipowner."},
    {q:"What is a 'Letter of Undertaking' (LOU) issued by a P&I Club?",opts:["A classic insurance contract","Financial guarantee issued by P&I Club in place of the arrested vessel — enables vessel release while dispute continues","A compliance certificate","An authorized navigation letter"],correct:1,expl:"LOU = Letter of Undertaking. Issued by shipowner's P&I Club to guarantee payment of the claim if found justified. Amount = claim + costs + interest (generally +20%). In exchange for LOU, court orders vessel release. Vessel can resume operations while dispute is resolved by arbitration or tribunal. Essential tool in commercial maritime law."},
  ],
  es:[
    {q:"Un Club P&I es una mutua de seguros marítimos. ¿Cuál es su cobertura principal?",opts:["Los daños al casco del buque (C&M)","La responsabilidad civil frente a terceros — contaminación · tripulación · carga · litigios","La carga transportada","Los riesgos de guerra"],correct:1,expl:"Club P&I (Protección e Indemnización) = mutua marítima que cubre la responsabilidad CIVIL frente a terceros. Coberturas principales: contaminación marítima (certificado CLC), accidentes de tripulación, daños a la carga (reclamaciones de terceros), asistencia a marineros abandonados (MLC), litigios jurídicos. Los 13 clubes del International Group cubren el 90% de la flota mundial."},
    {q:"¿El Convenio LLMC 1976/1996 permite al armador limitar su responsabilidad civil según qué criterio principal?",opts:["El importe real de los daños","El arqueo bruto del buque (GT) — calculado en DTS","El valor del buque","La nacionalidad del armador"],correct:1,expl:"LLMC 1976 (enmendado por el Protocolo de 1996) = Limitación de Responsabilidad por Reclamaciones Marítimas. Límite de responsabilidad calculado en DTS (Derechos Especiales de Giro) según el arqueo bruto (GT). EXCEPCIÓN: la limitación NO se aplica si el armador cometió una falta personal intencional o temeraria (Art.4 LLMC)."},
    {q:"En el caso Erika (1999), ¿qué organización fue condenada por primera vez en el mundo por su responsabilidad en el hundimiento?",opts:["El Estado de pabellón maltés","La sociedad de clasificación RINA","El armador Tevere Shipping","La OMI"],correct:1,expl:"Caso Erika (sentencia del Tribunal de Casación 2012) = revolución jurídica. RINA (sociedad de clasificación italiana) condenada por PRIMERA VEZ en el mundo. RINA había concedido certificados de navegabilidad al Erika pese a su estado vetusto. Total (fletador) también condenado. Concepto de 'perjuicio ecológico' reconocido. €200M de daños."},
    {q:"¿Se puede retener (ship arrest) un buque en un puerto para garantizar una reclamación marítima?",opts:["No — solo el tribunal marítimo puede incautar activos","Sí — procedimiento judicial que permite inmovilizar un buque en un puerto para garantizar una deuda marítima (carga · abordaje · salarios)","No — solo el Club P&I puede retener un buque","Sí — pero solo por deudas de combustible"],correct:1,expl:"Retención del buque = procedimiento jurídico que permite inmovilizar un buque en un puerto para garantizar una deuda marítima. Convenio de Ginebra 1952 + 1999. Deudas elegibles: abordajes, daños a la carga, salarios de tripulación, combustible, remolque. Procedimiento urgente (24-48h). Liberación posible contra carta de garantía P&I (LOU)."},
    {q:"¿Qué es una 'Carta de Compromiso' (LOU) emitida por un Club P&I?",opts:["Un contrato de seguro clásico","Garantía financiera emitida por el Club P&I en lugar del buque retenido — permite la liberación del buque mientras el litigio continúa","Un certificado de conformidad","Una carta de navegación autorizada"],correct:1,expl:"LOU = Letter of Undertaking (Carta de Compromiso). Emitida por el Club P&I del armador para garantizar el pago de la reclamación si esta resulta fundada. Importe = reclamación + costes + intereses (generalmente +20%). A cambio de la LOU, el tribunal ordena la liberación del buque. El buque puede reanudar sus actividades mientras el litigio se resuelve."},
  ],
  pt:[
    {q:"Um P&I Club é uma mútua de seguros marítimos. Qual é a sua cobertura principal?",opts:["Os danos ao casco do navio (C&M)","A responsabilidade civil perante terceiros — poluição · tripulação · carga · litígios","A carga transportada","Os riscos de guerra"],correct:1,expl:"P&I Club (Proteção e Indemnização) = mútua marítima que cobre a responsabilidade CIVIL perante terceiros. Coberturas principais: poluição marítima (certificado CLC), acidentes de tripulação, danos à carga (reclamações de terceiros), assistência a marítimos abandonados (MLC), litígios jurídicos. Os 13 clubes do International Group cobrem 90% da frota mundial."},
    {q:"A Convenção LLMC 1976/1996 permite ao armador limitar a responsabilidade civil segundo que critério principal?",opts:["O montante real dos danos","A arqueação bruta do navio (GT) — calculada em DTE","O valor do navio","A nacionalidade do armador"],correct:1,expl:"LLMC 1976 (emendada pelo Protocolo de 1996) = Limitação de Responsabilidade por Reclamações Marítimas. Limite de responsabilidade calculado em DTE (Direitos de Saque Especiais) com base na arqueação bruta (GT). EXCEÇÃO: a limitação NÃO se aplica se o armador cometeu uma falta pessoal intencional ou temerária (LLMC Art.4)."},
    {q:"No caso Erika (1999), que organização foi condenada pela PRIMEIRA VEZ no mundo pela sua responsabilidade no naufrágio?",opts:["O Estado de bandeira maltês","A sociedade de classificação RINA","O armador Tevere Shipping","A IMO"],correct:1,expl:"Caso Erika (acórdão do Tribunal de Cassação 2012) = revolução jurídica. RINA (sociedade de classificação italiana) condenada pela PRIMEIRA VEZ no mundo. RINA tinha concedido certificados de navegabilidade ao Erika apesar do seu estado. Total (afretadora) também condenada. Conceito de 'dano ecológico' reconhecido. €200M de danos."},
    {q:"Um navio pode ser arrestado (ship arrest) num porto para garantir uma reclamação marítima?",opts:["Não — apenas o tribunal marítimo pode apreender ativos","Sim — procedimento judicial que permite imobilizar um navio num porto para garantir uma dívida marítima (carga · abalroamento · salários)","Não — apenas o P&I Club pode arrestar um navio","Sim — mas apenas por dívidas de combustível"],correct:1,expl:"Arresto do navio = procedimento jurídico que permite imobilizar um navio num porto para garantir uma dívida marítima. Convenção de Genebra 1952 + 1999. Dívidas elegíveis: abalroamentos, danos à carga, salários de tripulação, combustível, reboque. Procedimento urgente (24-48h). Libertação possível contra carta de garantia P&I (LOU)."},
    {q:"O que é uma 'Carta de Compromisso' (LOU) emitida por um P&I Club?",opts:["Um contrato de seguro clássico","Garantia financeira emitida pelo P&I Club em substituição do navio arrestado — permite a libertação do navio enquanto o litígio prossegue","Um certificado de conformidade","Uma carta de navegação autorizada"],correct:1,expl:"LOU = Letter of Undertaking (Carta de Compromisso). Emitida pelo P&I Club do armador para garantir o pagamento da reclamação se esta for considerada fundada. Montante = reclamação + custos + juros (geralmente +20%). Em troca da LOU, o tribunal ordena a libertação do navio. O navio pode retomar as suas atividades enquanto o litígio é resolvido."},
  ],
};

const BANK = {
  fr:[
    {q:"Qu'est-ce que l'avarie commune (General Average) en droit maritime ?",opts:["Une avarie normale du navire","Sacrifice volontaire effectué pour sauver le navire et la cargaison — coût partagé proportionnellement entre toutes les parties (navire + cargaison)","Une assurance obligatoire","Un dommage causé par une tempête"],correct:1,expl:"Avarie commune (General Average) = principe : quand une mesure extraordinaire est prise volontairement pour sauver le navire ET la cargaison (ex : jeter une partie de la cargaison), le sacrifice est réparti entre toutes les parties. Règles d'York-Anvers (non obligatoires mais très utilisées). Liquidateur d'avarie commune (Average Adjuster) calcule les parts. Chaque partie doit contribuer proportionnellement à sa valeur sauvée."},
    {q:"Qu'est-ce que le connaissement (Bill of Lading - B/L) en droit maritime ?",opts:["Un simple bon de livraison","Document à triple fonction : reçu de marchandises · contrat de transport · titre de propriété négociable","Un certificat de navigabilité","Un document douanier"],correct:1,expl:"Bill of Lading (B/L) = document fondamental du commerce maritime. 3 fonctions : 1) REÇU = prouve que le transporteur a reçu les marchandises. 2) CONTRAT = preuves des conditions de transport (Règles de La Haye-Visby ou Rotterdam). 3) TITRE = document négociable = la propriété de la cargaison peut être transférée en endossant le B/L. Le détenteur du B/L original = propriétaire légal de la cargaison."},
    {q:"Quelles sont les Règles de La Haye-Visby en droit maritime ?",opts:["Des règles de navigation","Convention internationale limitant la responsabilité du transporteur maritime pour les dommages à la cargaison (1924 + Protocoles 1968/1979)","Des règles météorologiques","Des règles portuaires"],correct:1,expl:"Règles de La Haye-Visby (Hague-Visby Rules) = Convention de Bruxelles 1924 + Protocole de Visby 1968 + Protocole SDR 1979. Régissent la responsabilité du transporteur maritime pour les dommages à la cargaison. Plafond : 666,67 SDR/colis ou 2 SDR/kg (le plus élevé). Exemptions : vice propre de la marchandise, actes du chargeur, faute nautique. Application : si B/L émis dans État partie."},
    {q:"Qu'est-ce que la 'société de classification' maritime et sa responsabilité ?",opts:["Un organisme OMI","Organisation privée vérifiant la conformité technique des navires — délivre des certificats · peut être poursuivie si faute prouvée","Un organe PSC","Un assureur maritime"],correct:1,expl:"Société de classification (Bureau Veritas, Lloyd's Register, DNV, RINA, ABS...) = vérifie la construction et la maintenance des navires. Délivre des certificats de classe. Rôle : délégué de l'État du pavillon pour les inspections. Responsabilité : traditionnellement limitée par immunité. Mais après l'affaire Erika (RINA condamné 2012), les sociétés peuvent être poursuivies si faute prouvée dans l'octroi de certificats."},
    {q:"Qu'est-ce que la clause 'Both to Blame' dans un contrat de transport ?",opts:["Une clause de force majeure","Clause qui permettait aux armateurs de se retourner contre les chargeurs en cas d'abordage entre deux navires du même armateur — aujourd'hui largement abandonnée","Une clause d'assurance","Une clause de COLREG"],correct:1,expl:"'Both to Blame Collision Clause' = clause contractuelle historique. Permettait aux armateurs en cas d'abordage entre deux navires (dont un transportait de la cargaison) de répartir la responsabilité sur la cargaison. Ex : si les deux navires sont 50% responsables, le chargeur devait supporter 50% des dommages à sa propre cargaison. Largement abolie car inéquitable pour les chargeurs. Incompatible avec les Règles de Rotterdam (2009)."},
    {q:"Qu'est-ce que le 'salvage' (sauvetage maritime) en droit ?",opts:["Un type d'assurance","Assistance volontaire portée à un navire en péril — récompense basée sur le succès (no cure no pay) + valeur des biens sauvés + critères LOF","Un droit de passage","Un contrat de remorquage normal"],correct:1,expl:"Salvage (sauvetage maritime) = Convention de Londres 1989. Assistance volontaire portée à un navire ou cargaison en danger. Principe 'No cure, no pay' = si le sauvetage échoue, pas de rémunération (sauf SCOPIC). Récompense = % de la valeur sauvée. Critères : succès · valeur sauvée · risques courus · rapidité. LOF (Lloyd's Open Form) = contrat standard. SCOPIC = supplément si effort environnemental."},
    {q:"Qu'est-ce que la 'notice of protest' (protêt) en droit maritime ?",opts:["Une protestation informelle","Déclaration formelle faite par le capitaine devant un notaire ou consul après un événement maritime — préserve les droits de l'armateur contre les réclamations futures","Un certificat de navigabilité","Un document douanier"],correct:1,expl:"Notice of protest (protêt maritime) = déclaration formelle du capitaine enregistrée devant notaire, consul ou chambre de commerce. Faite après : tempête, avarie, abordage, contestation sur l'état de la cargaison. Objectif : préserver les droits légaux en créant une preuve de l'événement. Peut être 'extendée' (extended protest) avec rapport de mer. Base de nombreuses réclamations d'assurance."},
    {q:"Qu'est-ce que le 'SCOPIC' (Special Compensation P&I Club Clause) ?",opts:["Une police d'assurance","Clause complémentaire au LOF permettant aux sauveteurs de recevoir une compensation même si le sauvetage échoue — couvre les efforts environnementaux","Un certificat de sécurité","Un type de P&I Club"],correct:1,expl:"SCOPIC = Special Compensation P&I Club Clause. Clause optionnelle ajoutée au Lloyd's Open Form (LOF). Si le sauveteur déclenche SCOPIC, il reçoit une compensation basée sur un tarif horaire même si le sauvetage échoue (pas de 'no cure no pay' pour les efforts environnementaux). Motivation : encourager les sauveteurs à lutter contre la pollution même quand la valeur du navire est nulle. P&I Club de l'armateur paie."},
    {q:"Qu'est-ce que la 'guaranty letter' (lettre de garantie) dans un crédit documentaire maritime ?",opts:["Une lettre d'assurance","Lettre émise par la banque de l'acheteur permettant la livraison de la cargaison sans présentation du connaissement original — risque juridique élevé","Un certificat de commerce","Un document de navigation"],correct:1,expl:"Lettre de garantie (Letter of Indemnity / Guarantee) = document par lequel l'acheteur/banque s'engage à indemniser le transporteur si la livraison sans B/L original cause des pertes. Utilisée quand le B/L n'est pas encore arrivé mais la cargaison oui. RISQUE : acte potentiellement frauduleux si utilisé pour contourner les droits du propriétaire légitime. Déconseillé par les P&I Clubs."},
    {q:"Qu'est-ce que la 'warranty' (garantie) de navigabilité du navire ?",opts:["Une garantie commerciale","Obligation implicite dans un contrat d'affrètement que le navire est apte à la navigation — si non respectée : résiliation du contrat + dommages-intérêts","Une obligation SOLAS","Un certificat d'assurance"],correct:1,expl:"Garantie de navigabilité (warranty of seaworthiness) = obligation implicite dans les contrats d'affrètement. L'armateur garantit que le navire est apte à la navigation au début du voyage. Inclut : coque · machines · équipements · équipage qualifié · provisions suffisantes. Si navire non navigable = faute = responsabilité de l'armateur envers l'affréteur et les chargeurs. Base des réclamations H&M et cargo."},
    {q:"Qu'est-ce que le 'freight' (fret) en droit du transport maritime ?",opts:["Le type de cargaison","Rémunération due au transporteur pour le transport de la marchandise — en principe dû même si la cargaison est perdue (sauf convention contraire)","Les frais portuaires","Le poids de la cargaison"],correct:1,expl:"Fret (freight) = prix du transport maritime dû au transporteur. Principe : fret dû à la livraison sauf stipulation contraire. Types : fret ferme (même si perdu), fret sur livraison (si marchandise livrée), fret d'avance (payé avant voyage). Lien fret-connaissement = important. Clause 'freight prepaid' sur B/L = fret payé par le chargeur. Non-paiement du fret = droit de rétention sur la cargaison."},
    {q:"Qu'est-ce que la 'demurrage' en droit de l'affrètement ?",opts:["Une avarie maritime","Pénalité due à l'armateur si le chargement ou déchargement dépasse le temps de planche (laytime) prévu au contrat","Un type d'assurance cargo","Un certificat de chargement"],correct:1,expl:"Demurrage = surestaries. Pénalité contractuelle due à l'armateur par l'affréteur/chargeur pour chaque jour de dépassement du laytime (temps alloué pour le chargement/déchargement). Taux : fixé dans la charte-partie (ex : $15 000/jour). Dispatch : prime si le chargement se termine AVANT le laytime. Demurrage = dette prioritaire en droit maritime. Accumulation possible : navire bloqué plusieurs semaines = facture massive."},
    {q:"Qu'est-ce que la Convention de Rotterdam (2009) sur le transport maritime ?",opts:["Une convention portuaire","Convention internationale modernisant les Règles de La Haye-Visby — étend la responsabilité au transport multimodal · plafonds relevés · non encore en vigueur","Une convention de navigation","Une convention environnementale"],correct:1,expl:"Règles de Rotterdam (Convention des Nations Unies sur le contrat de transport international de marchandises effectué entièrement ou partiellement par mer, 2009). Modernise les Règles de La Haye-Visby. Principales évolutions : extension au transport multimodal (porte-à-porte), plafonds relevés (875 SDR/colis ou 3 SDR/kg), obligations de chargeur renforcées. PAS encore en vigueur (pas assez de ratifications). Coexiste avec Hague-Visby."},
    {q:"Qu'est-ce que la 'prescription extinctive' dans les réclamations maritimes ?",opts:["Un médicament de bord","Délai légal après lequel une action en justice n'est plus possible — varie selon le type de réclamation maritime (1 à 2 ans en général)","Un certificat d'extinction","Une procédure OMI"],correct:1,expl:"Prescription extinctive = délai au-delà duquel une action en justice est irrecevable. Délais principaux : Règles Hague-Visby = 1 an (dommages cargaison), LLMC = 2 ans (responsabilité générale), MARPOL/pollution = 3 ans, abordages (Convention Bruxelles 1910) = 2 ans. Importance P&I : déclaration IMMÉDIATE après sinistre pour ne pas perdre les droits. Délais courts en shipping = enjeux importants."},
    {q:"Qu'est-ce qu'un 'average adjuster' (liquidateur d'avarie) ?",opts:["Un expert en naufrages","Expert maritime spécialisé dans le calcul et la répartition de l'avarie commune — détermine la contribution de chaque partie","Un type de P&I Club","Un inspecteur PSC"],correct:1,expl:"Average adjuster (liquidateur d'avarie commune) = expert maritime spécialisé. Rôle : calculer et répartir l'avarie commune entre toutes les parties intéressées (armateur, propriétaires cargaisons). Établit l'Average Statement = document fixant les contributions. Honoraires : % des montants traités. Associations : AVERAGE, AAA. Processus long (parfois 2-5 ans). Base juridique : Règles d'York-Anvers."},
  ],
  en:[
    {q:"What is General Average in maritime law?",opts:["A normal vessel breakdown","Voluntary sacrifice made to save the ship and cargo — cost shared proportionally among all parties (ship + cargo)","Mandatory insurance","Storm damage"],correct:1,expl:"General Average = principle: when an extraordinary measure is voluntarily taken to save BOTH vessel AND cargo (e.g. jettisoning part of cargo), the sacrifice is distributed among all parties. York-Antwerp Rules (not mandatory but widely used). Average adjuster calculates shares. Each party contributes proportionally to its saved value."},
    {q:"What is a Bill of Lading (B/L) in maritime law?",opts:["A simple delivery note","Document with triple function: goods receipt · transport contract · negotiable title of ownership","A seaworthiness certificate","A customs document"],correct:1,expl:"Bill of Lading (B/L) = fundamental commercial maritime document. 3 functions: 1) RECEIPT = proves carrier received goods. 2) CONTRACT = evidences transport terms (Hague-Visby or Rotterdam Rules). 3) TITLE = negotiable document = cargo ownership can be transferred by endorsing the B/L. Holder of original B/L = legal cargo owner."},
    {q:"What are the Hague-Visby Rules in maritime law?",opts:["Navigation rules","International convention limiting maritime carrier liability for cargo damage (1924 + 1968/1979 Protocols)","Weather rules","Port rules"],correct:1,expl:"Hague-Visby Rules = Brussels Convention 1924 + Visby Protocol 1968 + SDR Protocol 1979. Govern maritime carrier liability for cargo damage. Ceiling: 666.67 SDR/package or 2 SDR/kg (whichever higher). Exemptions: inherent vice, shipper's acts, nautical fault. Application: if B/L issued in a party state."},
    {q:"What is a 'classification society' in maritime law and its liability?",opts:["An IMO body","Private organization verifying technical vessel compliance — issues certificates · can be sued if fault proven","A PSC body","A maritime insurer"],correct:1,expl:"Classification society (Bureau Veritas, Lloyd's Register, DNV, RINA, ABS...) = verifies vessel construction and maintenance. Issues class certificates. Role: flag state delegate for inspections. Liability: traditionally limited by immunity. But after Erika case (RINA convicted 2012), societies can be sued if fault proven in certificate granting."},
    {q:"What is the 'Both to Blame' clause in a transport contract?",opts:["A force majeure clause","Clause that allowed shipowners to claim against cargo interests in case of collision between two vessels — now largely abandoned","An insurance clause","A COLREG clause"],correct:1,expl:"'Both to Blame Collision Clause' = historical contractual clause. Allowed shipowners in case of collision between two vessels (one carrying cargo) to distribute liability onto the cargo. E.g.: if both vessels 50% liable, the shipper had to bear 50% of damage to its own cargo. Largely abolished as inequitable for shippers. Incompatible with Rotterdam Rules (2009)."},
    {q:"What is 'salvage' in maritime law?",opts:["A type of insurance","Voluntary assistance rendered to a vessel in peril — reward based on success (no cure no pay) + value of property saved + LOF criteria","A right of passage","A normal towage contract"],correct:1,expl:"Salvage = London Convention 1989. Voluntary assistance rendered to a vessel or cargo in danger. 'No cure, no pay' principle = if salvage fails, no remuneration (except SCOPIC). Reward = % of value saved. Criteria: success · value saved · risks taken · speed. LOF (Lloyd's Open Form) = standard contract. SCOPIC = supplement for environmental effort."},
    {q:"What is a 'notice of protest' in maritime law?",opts:["An informal protest","Formal declaration made by the captain before a notary or consul after a maritime event — preserves shipowner's rights against future claims","A seaworthiness certificate","A customs document"],correct:1,expl:"Notice of protest = formal captain's declaration recorded before notary, consul or chamber of commerce. Made after: storm, casualty, collision, dispute over cargo condition. Purpose: preserve legal rights by creating evidence of the event. Can be 'extended' (extended protest) with sea protest report. Basis of many insurance claims."},
    {q:"What is 'SCOPIC' (Special Compensation P&I Club Clause)?",opts:["An insurance policy","Supplementary clause to LOF allowing salvors to receive compensation even if salvage fails — covers environmental efforts","A safety certificate","A P&I Club type"],correct:1,expl:"SCOPIC = Special Compensation P&I Club Clause. Optional clause added to Lloyd's Open Form (LOF). If salvor invokes SCOPIC, they receive hourly rate compensation even if salvage fails (no 'no cure no pay' for environmental efforts). Motivation: encourage salvors to fight pollution even when vessel value is zero. Shipowner's P&I Club pays."},
    {q:"What is a 'letter of indemnity' in maritime documentary credit?",opts:["An insurance letter","Letter issued by buyer's bank allowing cargo delivery without original B/L — high legal risk","A commercial certificate","A navigation document"],correct:1,expl:"Letter of Indemnity (LOI) = document by which buyer/bank undertakes to indemnify the carrier if delivery without original B/L causes losses. Used when B/L hasn't arrived but cargo has. RISK: potentially fraudulent if used to circumvent legitimate owner's rights. Discouraged by P&I Clubs."},
    {q:"What is the 'warranty of seaworthiness' of a vessel?",opts:["A commercial warranty","Implied obligation in a charter party that the vessel is fit for navigation — if breached: contract termination + damages","A SOLAS obligation","An insurance certificate"],correct:1,expl:"Warranty of seaworthiness = implied obligation in charter contracts. Shipowner warrants vessel is fit for navigation at voyage start. Includes: hull · machinery · equipment · qualified crew · sufficient provisions. If vessel unseaworthy = fault = shipowner's liability to charterer and cargo interests. Basis of H&M and cargo claims."},
    {q:"What is 'freight' in maritime transport law?",opts:["The type of cargo","Remuneration due to the carrier for transporting goods — in principle due even if cargo lost (unless otherwise agreed)","Port fees","Cargo weight"],correct:1,expl:"Freight = price of maritime transport due to carrier. Principle: freight due at delivery unless otherwise agreed. Types: lump sum (even if lost), freight on delivery (if goods delivered), advance freight (paid before voyage). B/L link = important. 'Freight prepaid' on B/L = freight paid by shipper. Non-payment of freight = lien on cargo."},
    {q:"What is 'demurrage' in charter party law?",opts:["A maritime casualty","Penalty due to shipowner if loading or unloading exceeds the agreed laytime in the contract","A cargo insurance type","A loading certificate"],correct:1,expl:"Demurrage = penalty due to shipowner by charterer/shipper for each day exceeding laytime (time allocated for loading/unloading). Rate: fixed in charter party (e.g. $15,000/day). Dispatch: bonus if loading finishes BEFORE laytime. Demurrage = priority debt in maritime law. Can accumulate: vessel stuck weeks = massive bill."},
    {q:"What is the Rotterdam Convention (2009) on maritime transport?",opts:["A port convention","International convention modernizing Hague-Visby Rules — extends liability to multimodal transport · raised ceilings · not yet in force","A navigation convention","An environmental convention"],correct:1,expl:"Rotterdam Rules (UN Convention on Contracts for the International Carriage of Goods Wholly or Partly by Sea, 2009). Modernizes Hague-Visby Rules. Main changes: extension to multimodal transport (door-to-door), raised ceilings (875 SDR/package or 3 SDR/kg), enhanced shipper obligations. NOT yet in force (insufficient ratifications). Coexists with Hague-Visby."},
    {q:"What is 'extinctive prescription' in maritime claims?",opts:["A ship's medicine","Legal time limit after which legal action is no longer possible — varies by maritime claim type (1 to 2 years generally)","An extinction certificate","An IMO procedure"],correct:1,expl:"Extinctive prescription = time limit beyond which legal action is inadmissible. Main periods: Hague-Visby Rules = 1 year (cargo damage), LLMC = 2 years (general liability), MARPOL/pollution = 3 years, collisions (Brussels Convention 1910) = 2 years. P&I importance: IMMEDIATE declaration after casualty to preserve rights. Short shipping deadlines = major stakes."},
    {q:"What is an 'average adjuster'?",opts:["A shipwreck expert","Maritime expert specializing in calculating and apportioning general average — determines each party's contribution","A P&I Club type","A PSC inspector"],correct:1,expl:"Average adjuster = specialized maritime expert. Role: calculate and apportion general average among all interested parties (shipowner, cargo owners). Prepares Average Statement = document fixing contributions. Fees: % of amounts processed. Associations: AVERAGE, AAA. Long process (sometimes 2-5 years). Legal basis: York-Antwerp Rules."},
  ],
  es:[
    {q:"¿Qué es la avería gruesa en derecho marítimo?",opts:["Una avería normal del buque","Sacrificio voluntario realizado para salvar el buque y la carga — coste compartido proporcionalmente entre todas las partes (buque + carga)","Un seguro obligatorio","Un daño causado por una tormenta"],correct:1,expl:"Avería gruesa (General Average) = principio: cuando se toma una medida extraordinaria voluntariamente para salvar el buque Y la carga, el sacrificio se reparte entre todas las partes. Reglas de York-Amberes. Liquidador de averías calcula las cuotas. Cada parte contribuye proporcionalmente a su valor salvado."},
    {q:"¿Qué es el conocimiento de embarque (Bill of Lading - B/L) en derecho marítimo?",opts:["Un simple albarán de entrega","Documento con triple función: recibo de mercancías · contrato de transporte · título de propiedad negociable","Un certificado de navegabilidad","Un documento aduanero"],correct:1,expl:"Conocimiento de embarque (B/L) = documento fundamental del comercio marítimo. 3 funciones: 1) RECIBO = acredita que el transportista ha recibido las mercancías. 2) CONTRATO = prueba las condiciones de transporte (Reglas de La Haya-Visby o Rotterdam). 3) TÍTULO = documento negociable = la propiedad de la carga puede transferirse endosando el B/L."},
    {q:"¿Qué son las Reglas de La Haya-Visby en derecho marítimo?",opts:["Reglas de navegación","Convenio internacional que limita la responsabilidad del transportista marítimo por daños a la carga (1924 + Protocolos 1968/1979)","Reglas meteorológicas","Reglas portuarias"],correct:1,expl:"Reglas de La Haya-Visby = Convenio de Bruselas 1924 + Protocolo de Visby 1968 + Protocolo DTS 1979. Regulan la responsabilidad del transportista por daños a la carga. Techo: 666,67 DTS/bulto o 2 DTS/kg. Exenciones: vicio propio de la mercancía, actos del cargador, falta náutica."},
    {q:"¿Qué es una 'sociedad de clasificación' marítima y su responsabilidad?",opts:["Un organismo de la OMI","Organización privada que verifica la conformidad técnica de los buques — expide certificados · puede ser demandada si se prueba la falta","Un órgano PSC","Un asegurador marítimo"],correct:1,expl:"Sociedad de clasificación (Bureau Veritas, Lloyd's Register, DNV, RINA, ABS...) = verifica la construcción y el mantenimiento de los buques. Expide certificados de clase. Responsabilidad: tradicionalmente limitada por inmunidad. Pero tras el caso Erika (RINA condenada 2012), las sociedades pueden ser demandadas si se prueba la falta en la concesión de certificados."},
    {q:"¿Qué es la cláusula 'Both to Blame' en un contrato de transporte?",opts:["Una cláusula de fuerza mayor","Cláusula que permitía a los armadores reclamar contra los intereses de la carga en caso de abordaje entre dos buques — hoy ampliamente abandonada","Una cláusula de seguro","Una cláusula COLREG"],correct:1,expl:"'Both to Blame Collision Clause' = cláusula contractual histórica. Permitía a los armadores en caso de abordaje entre dos buques (uno de los cuales transportaba carga) distribuir la responsabilidad sobre la carga. Ampliamente abolida por ser inequitativa para los cargadores. Incompatible con las Reglas de Rotterdam (2009)."},
    {q:"¿Qué es el 'salvamento' (salvage) en derecho marítimo?",opts:["Un tipo de seguro","Asistencia voluntaria prestada a un buque en peligro — recompensa basada en el éxito (no cure no pay) + valor de los bienes salvados + criterios LOF","Un derecho de paso","Un contrato de remolque normal"],correct:1,expl:"Salvamento = Convenio de Londres 1989. Asistencia voluntaria prestada a un buque o carga en peligro. Principio 'No cure, no pay' = si el salvamento fracasa, no hay remuneración (salvo SCOPIC). Recompensa = % del valor salvado. LOF (Lloyd's Open Form) = contrato estándar."},
    {q:"¿Qué es la 'nota de protesta' en derecho marítimo?",opts:["Una protesta informal","Declaración formal realizada por el capitán ante notario o cónsul tras un evento marítimo — preserva los derechos del armador frente a futuras reclamaciones","Un certificado de navegabilidad","Un documento aduanero"],correct:1,expl:"Nota de protesta = declaración formal del capitán registrada ante notario, cónsul o cámara de comercio. Se realiza tras: tormenta, avería, abordaje, discrepancia sobre el estado de la carga. Objetivo: preservar los derechos legales creando prueba del evento. Base de muchas reclamaciones de seguros."},
    {q:"¿Qué es el 'SCOPIC' (Special Compensation P&I Club Clause)?",opts:["Una póliza de seguros","Cláusula complementaria al LOF que permite a los salvadores recibir compensación incluso si el salvamento fracasa — cubre los esfuerzos medioambientales","Un certificado de seguridad","Un tipo de Club P&I"],correct:1,expl:"SCOPIC = Special Compensation P&I Club Clause. Cláusula opcional añadida al Lloyd's Open Form (LOF). Si el salvador activa el SCOPIC, recibe una compensación basada en una tarifa horaria aunque el salvamento fracase. Motivación: alentar a los salvadores a luchar contra la contaminación incluso cuando el valor del buque es nulo."},
    {q:"¿Qué es una 'carta de garantía' en el crédito documentario marítimo?",opts:["Una carta de seguro","Carta emitida por el banco del comprador que permite la entrega de la carga sin presentar el conocimiento original — alto riesgo jurídico","Un certificado comercial","Un documento de navegación"],correct:1,expl:"Carta de garantía (Letter of Indemnity / LOI) = documento por el que el comprador/banco se compromete a indemnizar al transportista si la entrega sin B/L original causa pérdidas. Usada cuando el B/L aún no ha llegado pero la carga sí. RIESGO: acto potencialmente fraudulento. Desaconsejada por los Clubes P&I."},
    {q:"¿Qué es la 'garantía' de navegabilidad del buque?",opts:["Una garantía comercial","Obligación implícita en un contrato de fletamento de que el buque es apto para la navegación — si no se cumple: rescisión del contrato + daños","Una obligación SOLAS","Un certificado de seguro"],correct:1,expl:"Garantía de navegabilidad (warranty of seaworthiness) = obligación implícita en los contratos de fletamento. El armador garantiza que el buque es apto para la navegación al inicio del viaje. Incluye: casco · máquinas · equipos · tripulación cualificada · provisiones suficientes. Si el buque no está en condiciones = falta = responsabilidad del armador."},
    {q:"¿Qué es el 'flete' en el derecho del transporte marítimo?",opts:["El tipo de cargamento","Remuneración debida al transportista por el transporte de la mercancía — en principio debida aunque se pierda la carga (salvo acuerdo contrario)","Los gastos portuarios","El peso de la carga"],correct:1,expl:"Flete = precio del transporte marítimo adeudado al transportista. Principio: flete adeudado en la entrega salvo acuerdo contrario. Tipos: flete firme, flete en destino, flete anticipado. No pago del flete = derecho de retención sobre la carga."},
    {q:"¿Qué es la 'demora' (demurrage) en el derecho del fletamento?",opts:["Una avería marítima","Penalización debida al armador si la carga o descarga supera el tiempo de plancha (laytime) previsto en el contrato","Un tipo de seguro de carga","Un certificado de carga"],correct:1,expl:"Demora (demurrage) = penalización contractual debida al armador por el fletador/cargador por cada día de exceso del laytime. Tasa: fijada en la póliza de fletamento. Dispatch: prima si la carga termina ANTES del laytime. Demora = deuda prioritaria en derecho marítimo."},
    {q:"¿Qué es el Convenio de Rotterdam (2009) sobre el transporte marítimo?",opts:["Un convenio portuario","Convenio internacional que moderniza las Reglas de La Haya-Visby — amplía la responsabilidad al transporte multimodal · techos elevados · aún no en vigor","Un convenio de navegación","Un convenio medioambiental"],correct:1,expl:"Reglas de Rotterdam (Convenio de las Naciones Unidas sobre el contrato de transporte internacional de mercancías efectuado total o parcialmente por mar, 2009). Moderniza las Reglas de La Haya-Visby. Principales novedades: extensión al transporte multimodal, techos elevados (875 DTS/bulto o 3 DTS/kg). AÚN NO está en vigor."},
    {q:"¿Qué es la 'prescripción extintiva' en las reclamaciones marítimas?",opts:["Un medicamento de a bordo","Plazo legal después del cual una acción judicial ya no es posible — varía según el tipo de reclamación marítima (1 a 2 años en general)","Un certificado de extinción","Un procedimiento de la OMI"],correct:1,expl:"Prescripción extintiva = plazo más allá del cual una acción judicial es inadmisible. Plazos principales: Reglas La Haya-Visby = 1 año (daños carga), LLMC = 2 años (responsabilidad general), MARPOL/contaminación = 3 años, abordajes = 2 años. Importancia P&I: declaración INMEDIATA tras el siniestro."},
    {q:"¿Qué es un 'liquidador de averías' (average adjuster)?",opts:["Un experto en naufragios","Experto marítimo especializado en el cálculo y reparto de la avería gruesa — determina la contribución de cada parte","Un tipo de Club P&I","Un inspector PSC"],correct:1,expl:"Liquidador de averías gruesas = experto marítimo especializado. Función: calcular y repartir la avería gruesa entre todas las partes interesadas (armador, propietarios de carga). Elabora la Liquidación de Averías. Honorarios: % de los importes tratados. Proceso largo (a veces 2-5 años). Base jurídica: Reglas de York-Amberes."},
  ],
  pt:[
    {q:"O que é a avaria grossa (General Average) no direito marítimo?",opts:["Uma avaria normal do navio","Sacrifício voluntário feito para salvar o navio e a carga — custo partilhado proporcionalmente entre todas as partes (navio + carga)","Um seguro obrigatório","Um dano causado por uma tempestade"],correct:1,expl:"Avaria grossa = princípio: quando uma medida extraordinária é tomada voluntariamente para salvar TANTO o navio COMO a carga, o sacrifício é distribuído entre todas as partes. Regras de York-Antuérpia. Liquidador de avaria calcula as quotas. Cada parte contribui proporcionalmente ao seu valor salvo."},
    {q:"O que é o conhecimento de embarque (Bill of Lading - B/L) no direito marítimo?",opts:["Um simples guia de entrega","Documento com tripla função: recibo de mercadorias · contrato de transporte · título de propriedade negociável","Um certificado de navegabilidade","Um documento aduaneiro"],correct:1,expl:"Conhecimento de embarque (B/L) = documento fundamental do comércio marítimo. 3 funções: 1) RECIBO = prova que o transportador recebeu as mercadorias. 2) CONTRATO = evidencia as condições de transporte. 3) TÍTULO = documento negociável = a propriedade da carga pode ser transferida endossando o B/L."},
    {q:"O que são as Regras de Haia-Visby no direito marítimo?",opts:["Regras de navegação","Convenção internacional que limita a responsabilidade do transportador marítimo por danos à carga (1924 + Protocolos 1968/1979)","Regras meteorológicas","Regras portuárias"],correct:1,expl:"Regras de Haia-Visby = Convenção de Bruxelas 1924 + Protocolo de Visby 1968 + Protocolo DTE 1979. Regem a responsabilidade do transportador por danos à carga. Teto: 666,67 DTE/volume ou 2 DTE/kg. Isenções: vício próprio da mercadoria, atos do carregador, falta náutica."},
    {q:"O que é uma 'sociedade de classificação' marítima e a sua responsabilidade?",opts:["Um organismo da IMO","Organização privada que verifica a conformidade técnica dos navios — emite certificados · pode ser processada se falta provada","Um órgão PSC","Um segurador marítimo"],correct:1,expl:"Sociedade de classificação (Bureau Veritas, Lloyd's Register, DNV, RINA, ABS...) = verifica a construção e manutenção dos navios. Emite certificados de classe. Responsabilidade: tradicionalmente limitada por imunidade. Mas após o caso Erika (RINA condenada 2012), as sociedades podem ser processadas se a falta na concessão de certificados for provada."},
    {q:"O que é a cláusula 'Both to Blame' num contrato de transporte?",opts:["Uma cláusula de força maior","Cláusula que permitia aos armadores reclamar contra os interesses da carga em caso de abalroamento entre dois navios — hoje largamente abandonada","Uma cláusula de seguro","Uma cláusula COLREG"],correct:1,expl:"'Both to Blame Collision Clause' = cláusula contratual histórica. Permitia aos armadores em caso de abalroamento entre dois navios distribuir a responsabilidade sobre a carga. Largamente abolida por ser inequitativa para os carregadores. Incompatível com as Regras de Roterdão (2009)."},
    {q:"O que é o 'salvamento' (salvage) no direito marítimo?",opts:["Um tipo de seguro","Assistência voluntária prestada a um navio em perigo — recompensa baseada no sucesso (no cure no pay) + valor dos bens salvos + critérios LOF","Um direito de passagem","Um contrato de reboque normal"],correct:1,expl:"Salvamento = Convenção de Londres 1989. Assistência voluntária prestada a um navio ou carga em perigo. Princípio 'No cure, no pay' = se o salvamento falha, sem remuneração (exceto SCOPIC). Recompensa = % do valor salvo. LOF (Lloyd's Open Form) = contrato padrão."},
    {q:"O que é uma 'nota de protesto' no direito marítimo?",opts:["Um protesto informal","Declaração formal feita pelo capitão perante notário ou cônsul após um evento marítimo — preserva os direitos do armador contra reclamações futuras","Um certificado de navegabilidade","Um documento aduaneiro"],correct:1,expl:"Nota de protesto = declaração formal do capitão registada perante notário, cônsul ou câmara de comércio. Feita após: tempestade, avaria, abalroamento, disputa sobre o estado da carga. Objetivo: preservar os direitos legais criando prova do evento. Base de muitas reclamações de seguros."},
    {q:"O que é o 'SCOPIC' (Special Compensation P&I Club Clause)?",opts:["Uma apólice de seguro","Cláusula complementar ao LOF que permite aos salvadores receber compensação mesmo que o salvamento falhe — cobre os esforços ambientais","Um certificado de segurança","Um tipo de P&I Club"],correct:1,expl:"SCOPIC = Special Compensation P&I Club Clause. Cláusula opcional adicionada ao Lloyd's Open Form (LOF). Se o salvador ativar o SCOPIC, recebe compensação horária mesmo que o salvamento falhe. Motivação: encorajar os salvadores a combater a poluição mesmo quando o valor do navio é nulo. P&I Club do armador paga."},
    {q:"O que é uma 'carta de garantia' no crédito documentário marítimo?",opts:["Uma carta de seguro","Carta emitida pelo banco do comprador que permite a entrega da carga sem apresentar o conhecimento original — elevado risco jurídico","Um certificado comercial","Um documento de navegação"],correct:1,expl:"Carta de garantia (Letter of Indemnity / LOI) = documento pelo qual o comprador/banco se compromete a indemnizar o transportador se a entrega sem B/L original causar perdas. Usada quando o B/L ainda não chegou mas a carga sim. RISCO: ato potencialmente fraudulento. Desencorajada pelos P&I Clubs."},
    {q:"O que é a 'garantia' de navegabilidade do navio?",opts:["Uma garantia comercial","Obrigação implícita num contrato de afretamento de que o navio é apto para a navegação — se violada: rescisão do contrato + danos","Uma obrigação SOLAS","Um certificado de seguro"],correct:1,expl:"Garantia de navegabilidade (warranty of seaworthiness) = obrigação implícita nos contratos de afretamento. O armador garante que o navio é apto para a navegação no início da viagem. Inclui: casco · máquinas · equipamentos · tripulação qualificada · provisões suficientes. Se navio não está em condições = falta = responsabilidade do armador."},
    {q:"O que é o 'frete' no direito do transporte marítimo?",opts:["O tipo de carga","Remuneração devida ao transportador pelo transporte de mercadorias — em princípio devida mesmo que a carga se perca (salvo acordo contrário)","As taxas portuárias","O peso da carga"],correct:1,expl:"Frete = preço do transporte marítimo devido ao transportador. Princípio: frete devido na entrega salvo acordo contrário. Tipos: frete fixo, frete na entrega, frete adiantado. Não pagamento do frete = direito de retenção sobre a carga."},
    {q:"O que é a 'sobrestadia' (demurrage) no direito do afretamento?",opts:["Uma avaria marítima","Penalidade devida ao armador se o carregamento ou descarga exceder o laytime acordado no contrato","Um tipo de seguro de carga","Um certificado de carregamento"],correct:1,expl:"Sobrestadia (demurrage) = penalidade contratual devida ao armador pelo afretador/carregador por cada dia de excesso do laytime. Taxa: fixada na carta-partido. Dispatch: prémio se o carregamento terminar ANTES do laytime. Sobrestadia = dívida prioritária no direito marítimo."},
    {q:"O que é a Convenção de Roterdão (2009) sobre o transporte marítimo?",opts:["Uma convenção portuária","Convenção internacional que moderniza as Regras de Haia-Visby — estende a responsabilidade ao transporte multimodal · tetos elevados · ainda não em vigor","Uma convenção de navegação","Uma convenção ambiental"],correct:1,expl:"Regras de Roterdão = Convenção das Nações Unidas sobre o contrato de transporte internacional de mercadorias efetuado total ou parcialmente por mar (2009). Moderniza as Regras de Haia-Visby. Principais novidades: extensão ao transporte multimodal, tetos elevados (875 DTE/volume ou 3 DTE/kg). AINDA não em vigor."},
    {q:"O que é a 'prescrição extintiva' nas reclamações marítimas?",opts:["Um medicamento de bordo","Prazo legal após o qual uma ação judicial já não é possível — varia segundo o tipo de reclamação marítima (1 a 2 anos em geral)","Um certificado de extinção","Um procedimento da IMO"],correct:1,expl:"Prescrição extintiva = prazo além do qual uma ação judicial é inadmissível. Prazos principais: Regras Haia-Visby = 1 ano (danos carga), LLMC = 2 anos (responsabilidade geral), MARPOL/poluição = 3 anos, abalroamentos = 2 anos. Importância P&I: declaração IMEDIATA após sinistro."},
    {q:"O que é um 'liquidador de avaria' (average adjuster)?",opts:["Um perito em naufrágios","Perito marítimo especializado no cálculo e repartição da avaria grossa — determina a contribuição de cada parte","Um tipo de P&I Club","Um inspetor PSC"],correct:1,expl:"Liquidador de avaria grossa = perito marítimo especializado. Função: calcular e repartir a avaria grossa entre todas as partes interessadas. Elabora a Liquidação de Avaria. Honorários: % dos montantes tratados. Processo longo (às vezes 2-5 anos). Base jurídica: Regras de York-Antuérpia."},
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
    <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.orange},${C.gold2})`}}/></div>
    <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
      {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
    </div>
    {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
    <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.orange},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
  </div>);
}

function Stars(){const s=Array.from({length:14},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.orange}33,${C.gold2}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.orange}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.orange,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.orange:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d={
    fr:{
      badge:"⚖️ Droit Maritime Int. · Leçon 7/10 · ⭐ Premium · 200 XP",
      title:"Responsabilité & Assurances Maritimes",
      intro:"Quand un navire sombre ou pollue les côtes, la question clé est : QUI PAIE ? La réponse implique une chaîne de responsabilités allant du marin à l'armateur, de la société de classification à l'affréteur.\n\nCette leçon couvre les responsabilités, les assurances maritimes et les procédures de réclamation.",
      p1:"PARTIE 1 — PYRAMIDE DES RESPONSABILITÉS",s1t:"Marin → Capitaine → Compagnie → Armateur",
      s1:"TYPES DE RESPONSABILITÉ :\n\nCIVILE → Dommages-intérêts · Assurance P&I\nPÉNALE → Prison · Amende · Retrait brevet\nADMINISTRATIVE → Suspension · Retrait certifications\n\nCHAÎNE DE RESPONSABILITÉ :\nMarin (faute individuelle)\n→ Capitaine (décision opérationnelle)\n→ Compagnie (Code ISM · SMS · DOC)\n→ Armateur (responsabilité objective CLC)\n\nPIERCING THE CORPORATE VEIL :\nFraude délibérée = dirigeants personnellement responsables",
      p2:"PARTIE 2 — TYPES D'ASSURANCES MARITIMES",s2t:"P&I · H&M · Cargo · War Risk",
      s2:"4 ASSURANCES PRINCIPALES :\n\nP&I Club → Responsabilité civile tiers\n(13 clubs · 90% de la flotte mondiale)\n\nH&M (Hull & Machinery) → Corps du navire\n(Avaries · Abordage · Incendie)\n\nCargo → La cargaison transportée\n(Clauses A · B · C Institut de Londres)\n\nWar Risk → Guerre · Terrorisme · Piraterie\n(JRC publie les zones à risque)\n(Mer Rouge 2024 → primes ×10)",
      p3:"PARTIE 3 — LIMITATION DE RESPONSABILITÉ (LLMC)",s1t:"Convention LLMC 1976/1996 · Calcul SDR",
      s3:"LLMC 1976 (Protocole 1996) :\nLimite selon le tonnage brut (GT)\nCalculée en SDR (Droits de Tirage Spéciaux)\n\nEXEMPLE :\nNavire 5 000 GT :\n→ Dommages matériels ≈ 3M SDR ≈ $4M\n→ Préjudices corporels ≈ 6M SDR ≈ $8M\n\nEXCEPTION (Art.4 LLMC) :\nLimitation SUPPRIMÉE si :\n→ Faute personnelle INTENTIONNELLE de l'armateur\n→ Faute TÉMÉRAIRE avec conscience du dommage\n\nEx. Princess Cruises = limitation refusée\n(fraude systématique ordonnée par la direction)",
      p4:"PARTIE 4 — SAISIE & PROCÉDURES",s1t:"Ship arrest · LOU · Arbitrage",
      s4:"SHIP ARREST (Arrêt de navire) :\nProcédure d'urgence (24-48h)\nImmobilise le navire dans le port\nPression maximale sur l'armateur\n\nLETTRE DE GARANTIE P&I (LOU) :\nP&I Club garantit le paiement\nNavire libéré · litige continue\n\nRÈGLEMENT DES LITIGES :\n→ Arbitrage maritime London (LMAA)\n→ Arbitrage New York (SMA)\n→ Tribunal maritime\n→ TIDM (UNCLOS)",
      p5:"🎯 EXERCICES AVANCÉS PREMIUM",p6:"🛢️ CAS RÉEL — AFFAIRE MAJEURE",p7:"📝 BANQUE 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — RESPONSABILITÉ & ASSURANCES L7",
      sumP:["Chaîne : marin → capitaine → compagnie (ISM) → armateur (CLC)","P&I Club = mutuelle · 13 clubs · 90% flotte · LOU · arrêt navire","H&M = corps navire · Cargo = cargaison · War Risk = guerre/piraterie","LLMC 1976/1996 = limitation par tonnage (GT) en SDR","Exception LLMC Art.4 = faute intentionnelle → limitation supprimée","Ship arrest = procédure urgence · LOU = libération contre garantie","Bill of Lading (B/L) = reçu + contrat + titre de propriété","Affaire Erika 1999 = RINA condamnée + Total condamné · €200M"],
      learnedP:["Pyramide responsabilités : marin → capitaine → compagnie → armateur","P&I · H&M · Cargo · War Risk · 4 assurances clés","LLMC 1976 limitation tonnage · exception Art.4 faute intentionnelle","Ship arrest · LOU · libération navire · arbitrage Londres","Erika 1999 · RINA · Total affréteur · préjudice écologique"],
    },
    en:{
      badge:"⚖️ Int. Maritime Law · Lesson 7/10 · ⭐ Premium · 200 XP",
      title:"Maritime Liability & Insurance",
      intro:"When a vessel sinks or pollutes the coastline, the key question is: WHO PAYS? The answer involves a chain of responsibilities from seafarer to shipowner, classification society to charterer.",
      p1:"PART 1 — LIABILITY PYRAMID",s1t:"Seafarer → Captain → Company → Shipowner",
      s1:"TYPES OF LIABILITY:\n\nCIVIL → Damages · P&I Insurance\nCRIMINAL → Prison · Fine · Certificate revocation\nADMINISTRATIVE → Suspension · Certification withdrawal\n\nLIABILITY CHAIN:\nSeafarer (individual fault)\n→ Captain (operational decision)\n→ Company (ISM Code · SMS · DOC)\n→ Shipowner (strict liability CLC)\n\nPIERCING THE CORPORATE VEIL:\nDeliberate fraud = management personally liable",
      p2:"PART 2 — MARITIME INSURANCE TYPES",s1t:"P&I · H&M · Cargo · War Risk",
      s2:"4 MAIN INSURANCES:\n\nP&I Club → Third-party civil liability\n(13 clubs · 90% of world fleet)\n\nH&M (Hull & Machinery) → Vessel hull\n(Casualties · Collision · Fire)\n\nCargo → Transported goods\n(Institute London Clauses A · B · C)\n\nWar Risk → War · Terrorism · Piracy\n(JRC publishes risk zones)\n(Red Sea 2024 → premiums ×10)",
      p3:"PART 3 — LIABILITY LIMITATION (LLMC)",s1t:"LLMC Convention 1976/1996 · SDR Calculation",
      s3:"LLMC 1976 (1996 Protocol):\nLimit based on gross tonnage (GT)\nCalculated in SDR (Special Drawing Rights)\n\nEXAMPLE:\n5,000 GT vessel:\n→ Property damage ≈ 3M SDR ≈ $4M\n→ Personal injury ≈ 6M SDR ≈ $8M\n\nEXCEPTION (LLMC Art.4):\nLimitation REMOVED if:\n→ Shipowner's personal INTENTIONAL fault\n→ RECKLESS fault with awareness of damage",
      p4:"PART 4 — ARREST & PROCEDURES",s1t:"Ship arrest · LOU · Arbitration",
      s4:"SHIP ARREST:\nUrgent procedure (24-48h)\nImmobilizes vessel in port\nMaximum pressure on shipowner\n\nP&I GUARANTEE LETTER (LOU):\nP&I Club guarantees payment\nVessel released · dispute continues\n\nDISPUTE RESOLUTION:\n→ London Maritime Arbitration (LMAA)\n→ New York Arbitration (SMA)\n→ Maritime Tribunal\n→ ITLOS (UNCLOS)",
      p5:"🎯 ADVANCED PREMIUM EXERCISES",p6:"🛢️ REAL CASE — MAJOR CASE",p7:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY — LIABILITY & INSURANCE L7",
      sumP:["Chain: seafarer → captain → company (ISM) → shipowner (CLC)","P&I Club = mutual · 13 clubs · 90% fleet · LOU · ship arrest","H&M = vessel hull · Cargo = goods · War Risk = war/piracy","LLMC 1976/1996 = limitation by tonnage (GT) in SDR","LLMC Art.4 exception = intentional fault → limitation removed","Ship arrest = urgent procedure · LOU = release against guarantee","Bill of Lading (B/L) = receipt + contract + title of ownership","Erika 1999 = RINA convicted + Total convicted · €200M"],
      learnedP:["Liability pyramid: seafarer → captain → company → shipowner","P&I · H&M · Cargo · War Risk · 4 key insurances","LLMC 1976 tonnage limitation · Art.4 exception intentional fault","Ship arrest · LOU · vessel release · London arbitration","Erika 1999 · RINA · Total charterer · ecological damage"],
    },
    es:{
      badge:"⚖️ Derecho Marítimo Int. · Lección 7/10 · ⭐ Premium · 200 XP",
      title:"Responsabilidad y Seguros Marítimos",
      intro:"Cuando un buque se hunde o contamina las costas, la pregunta clave es: ¿QUIÉN PAGA? La respuesta implica una cadena de responsabilidades que va desde el marinero hasta el armador.",
      p1:"PARTE 1 — PIRÁMIDE DE RESPONSABILIDADES",s1t:"Marinero → Capitán → Compañía → Armador",
      s1:"TIPOS DE RESPONSABILIDAD:\nCIVIL → Daños · Seguro P&I\nPENAL → Prisión · Multa · Revocación título\nADMINISTRATIVA → Suspensión · Retirada certificaciones\n\nCADENA DE RESPONSABILIDADES:\nMarinero → Capitán → Compañía (ISM) → Armador (CLC objetivo)\nLevantamiento velo societario si fraude deliberado",
      p2:"PARTE 2 — TIPOS DE SEGUROS MARÍTIMOS",s1t:"P&I · C&M · Cargo · Riesgo de Guerra",
      s2:"4 SEGUROS PRINCIPALES:\nClub P&I → Responsabilidad civil terceros\nC&M → Casco del buque\nCargo → Mercancías transportadas\nRiesgo Guerra → Guerra · Terrorismo · Piratería\n(Mar Rojo 2024 → primas ×10)",
      p3:"PARTE 3 — LIMITACIÓN DE RESPONSABILIDAD (LLMC)",s1t:"Convenio LLMC 1976/1996 · Cálculo DTS",
      s3:"LLMC 1976 (Protocolo 1996):\nLímite según arqueo bruto (GT) en DTS\n\nEJEMPLO 5.000 GT:\n→ Daños materiales ≈ 3M DTS ≈ $4M\n→ Daños corporales ≈ 6M DTS ≈ $8M\n\nEXCEPCIÓN Art.4 LLMC:\nFalta personal INTENCIONAL o TEMERARIA del armador → limitación suprimida",
      p4:"PARTE 4 — RETENCIÓN Y PROCEDIMIENTOS",s1t:"Retención buque · LOU · Arbitraje",
      s4:"RETENCIÓN DEL BUQUE:\nProcedimiento urgente (24-48h)\nPRESIÓN MÁXIMA sobre el armador\n\nCARTA DE GARANTÍA P&I (LOU):\nBuque liberado · litigio continúa\n\nRESOLUCIÓN LITIGIOS:\n→ Arbitraje Marítimo Londres (LMAA)\n→ Tribunal marítimo",
      p5:"🎯 EJERCICIOS AVANZADOS PREMIUM",p6:"🛢️ CASO REAL — CASO MAYOR",p7:"📝 BANCO 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — RESPONSABILIDAD Y SEGUROS L7",
      sumP:["Cadena: marinero → capitán → compañía (ISM) → armador (CLC)","Club P&I = mutua · 13 clubes · 90% flota · LOU · retención buque","C&M = casco buque · Cargo = mercancías · Guerra = guerra/piratería","LLMC 1976/1996 = limitación por tonelaje (GT) en DTS","Excepción LLMC Art.4 = falta intencional → limitación suprimida","Retención buque = procedimiento urgente · LOU = liberación contra garantía","Conocimiento de embarque (B/L) = recibo + contrato + título de propiedad","Erika 1999 = RINA condenada + Total condenada · €200M"],
      learnedP:["Pirámide responsabilidades: marinero → capitán → compañía → armador","P&I · C&M · Cargo · Guerra · 4 seguros clave","LLMC 1976 limitación tonelaje · excepción Art.4 falta intencional","Retención buque · LOU · liberación · arbitraje Londres","Erika 1999 · RINA · Total fletador · perjuicio ecológico"],
    },
    pt:{
      badge:"⚖️ Direito Marítimo Int. · Lição 7/10 · ⭐ Premium · 200 XP",
      title:"Responsabilidade e Seguros Marítimos",
      intro:"Quando um navio afunda ou polui as costas, a pergunta chave é: QUEM PAGA? A resposta implica uma cadeia de responsabilidades que vai do marítimo ao armador.",
      p1:"PARTE 1 — PIRÂMIDE DE RESPONSABILIDADES",s1t:"Marítimo → Capitão → Companhia → Armador",
      s1:"TIPOS DE RESPONSABILIDADE:\nCIVIL → Danos · Seguro P&I\nPENAL → Prisão · Multa · Revogação certificado\nADMINISTRATIVA → Suspensão · Retirada certificações\n\nCADEIA DE RESPONSABILIDADES:\nMarítimo → Capitão → Companhia (ISM) → Armador (CLC objetivo)\nLevantamento véu societário se fraude deliberada",
      p2:"PARTE 2 — TIPOS DE SEGUROS MARÍTIMOS",s1t:"P&I · C&M · Cargo · Risco de Guerra",
      s2:"4 SEGUROS PRINCIPAIS:\nP&I Club → Responsabilidade civil terceiros\nC&M → Casco do navio\nCargo → Mercadorias transportadas\nRisco Guerra → Guerra · Terrorismo · Pirataria\n(Mar Vermelho 2024 → prémios ×10)",
      p3:"PARTE 3 — LIMITAÇÃO DE RESPONSABILIDADE (LLMC)",s1t:"Convenção LLMC 1976/1996 · Cálculo DTE",
      s3:"LLMC 1976 (Protocolo 1996):\nLimite segundo arqueação bruta (GT) em DTE\n\nEXEMPLO 5.000 GT:\n→ Danos materiais ≈ 3M DTE ≈ $4M\n→ Danos corporais ≈ 6M DTE ≈ $8M\n\nEXCEÇÃO Art.4 LLMC:\nFalta pessoal INTENCIONAL ou TEMERÁRIA do armador → limitação suprimida",
      p4:"PARTE 4 — ARRESTO E PROCEDIMENTOS",s1t:"Arresto navio · LOU · Arbitragem",
      s4:"ARRESTO DO NAVIO:\nProcedimento urgente (24-48h)\nPRESSÃO MÁXIMA sobre o armador\n\nCARTA DE GARANTIA P&I (LOU):\nNavio libertado · litígio prossegue\n\nRESOLUÇÃO LITÍGIOS:\n→ Arbitragem Marítima Londres (LMAA)\n→ Tribunal marítimo",
      p5:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p6:"🛢️ CASO REAL — CASO MAIOR",p7:"📝 BANCO 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — RESPONSABILIDADE E SEGUROS L7",
      sumP:["Cadeia: marítimo → capitão → companhia (ISM) → armador (CLC)","P&I Club = mútua · 13 clubes · 90% frota · LOU · arresto navio","C&M = casco navio · Cargo = mercadorias · Guerra = guerra/pirataria","LLMC 1976/1996 = limitação por tonelagem (GT) em DTE","Exceção LLMC Art.4 = falta intencional → limitação suprimida","Arresto navio = procedimento urgente · LOU = libertação contra garantia","Conhecimento de embarque (B/L) = recibo + contrato + título de propriedade","Erika 1999 = RINA condenada + Total condenada · €200M"],
      learnedP:["Pirâmide responsabilidades: marítimo → capitão → companhia → armador","P&I · C&M · Cargo · Guerra · 4 seguros chave","LLMC 1976 limitação tonelagem · exceção Art.4 falta intencional","Arresto navio · LOU · libertação · arbitragem Londres","Erika 1999 · RINA · Total afretadora · dano ecológico"],
    },
  };
  return d[lang]||d.fr;
};

export default function LessonLiabilityInsurance({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t=T[lang]||T.fr;const quiz=QUIZ[lang]||QUIZ.fr;const lc=getContent(lang);
  const [phase,setPhase]=useState("content");const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#0d0a02 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.orange}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.orange,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>⚖️ {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 7/10":lang==="en"?"Lesson 7/10":lang==="es"?"Lección 7/10":"Lição 7/10"}</div>
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
            <SL icon="⚖️" text={lc.p1} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}33`}}>
              <div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>⚖️ {lang==="fr"?"PYRAMIDE DES RESPONSABILITÉS":lang==="en"?"LIABILITY PYRAMID":"PIRÁMIDE DE RESPONSABILIDADES"}</div>
              <LiabilityPyramidSVG lang={lang}/>
            </Card>
            <SL icon="🛡️" text={lc.p2} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🛡️ {lang==="fr"?"TYPES D'ASSURANCES MARITIMES":lang==="en"?"MARITIME INSURANCE TYPES":"TIPOS DE SEGUROS MARÍTIMOS"}</div>
              <InsuranceTypesSVG lang={lang}/>
            </Card>
            <SL icon="📊" text={lc.p3} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold2}33`}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📊 {lang==="fr"?"CALCULATEUR LIMITATION LLMC":lang==="en"?"LLMC LIMITATION CALCULATOR":"CALCULADORA LIMITACIÓN LLMC"}</div>
              <LLMCCalculatorSVG lang={lang}/>
            </Card>
            <SL icon="⚓" text={lc.p4} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>⚓ {lang==="fr"?"SIMULATION SAISIE DE NAVIRE":lang==="en"?"VESSEL ARREST SIMULATION":"SIMULACIÓN RETENCIÓN DE BUQUE"}</div>
              <ShipArrestSVG lang={lang}/>
            </Card>
            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>
            <SL icon="🛢️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>
            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang}/></Card>
            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(230,126,34,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(230,126,34,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>Quiz — Responsabilité & Assurances</div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 7":lang==="en"?"Lesson 7":"Lección 7"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}
          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(230,126,34,0.15)",border:`1px solid ${C.orange}55`,fontSize:14,color:C.orange,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(230,126,34,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 8 — PORTS & ÉTATS DU PAVILLON →":lang==="en"?"LESSON 8 — PORTS & FLAG STATES →":lang==="es"?"LECCIÓN 8 — PUERTOS & ESTADOS DE PABELLÓN →":"LIÇÃO 8 — PORTOS & ESTADOS DE BANDEIRA →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
