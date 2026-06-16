import { useState, useEffect } from "react";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  exam:"#f59e0b", l1:"#00e5ff", l2:"#ffd700", l3:"#ff2244", l4:"#88ff44",
  l5:"#f59e0b", l6:"#f97316", l7:"#ec4899", badge:"#a855f7",
};

const T = {
  fr:{ back:"◀ Retour", module:"Maritime English SMCP", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER L'EXAMEN FINAL", complete:"🏆 MODULE TERMINÉ!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Révise le contenu puis commence l'examen", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Maritime English SMCP", xp:"XP earned", quiz:"FINAL EXAM", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START FINAL EXAM", complete:"🏆 MODULE COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Review the content then start the exam", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Inglés Marítimo SMCP", xp:"XP ganados", quiz:"EXAMEN FINAL", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR EXAMEN FINAL", complete:"🏆 ¡MÓDULO COMPLETADO!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Repasa el contenido y luego comienza", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Inglês Marítimo SMCP", xp:"XP ganhos", quiz:"EXAME FINAL", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR EXAME FINAL", complete:"🏆 MÓDULO CONCLUÍDO!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Revise o conteúdo e depois comece", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 — MODULE RECAP CARDS
// ══════════════════════════════════════
function ModuleRecapSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const lessons = [
    { id:"l1", icon:"🗺️", color:C.l1, num:"L1",
      label:{fr:"Quart passerelle",en:"Bridge Watch",es:"Guardia de puente",pt:"Quarto de ponte"},
      key:{fr:"RELÈVE : 'I am taking over the watch. Course [X], speed [X], position [lat/long].'\nWILCO = will comply · ROGER = received · SAY AGAIN = répéter\nCOMPTEUR DU QUART : cap + vitesse + position + trafic + météo + ordres spéciaux",
           en:"HANDOVER: 'I am taking over the watch. Course [X], speed [X], position [lat/long].'\nWILCO = will comply · ROGER = received · SAY AGAIN = repeat\nWATCH CHECKLIST: course + speed + position + traffic + weather + special orders",
           es:"RELEVO: 'I am taking over the watch. Course [X], speed [X], position [lat/long].'\nWILCO = cumpliré · ROGER = recibido · SAY AGAIN = repetir\nLISTA GUARDIA: rumbo + velocidad + posición + tráfico + meteorología + órdenes especiales",
           pt:"ENTREGA: 'I am taking over the watch. Course [X], speed [X], position [lat/long].'\nWILCO = vou cumprir · ROGER = recebi · SAY AGAIN = repetir\nLISTA QUARTO: rumo + velocidade + posição + tráfego + meteorologia + ordens especiais"} },
    { id:"l2", icon:"🚢", color:C.l2, num:"L2",
      label:{fr:"Port & VTS",en:"Port & VTS",es:"Puerto y VTS",pt:"Porto e VTS"},
      key:{fr:"VTS : CH 16 → [station]×2 + [navire]×2 + OVER\nPILOTE : ETA + tirant d'eau avant/arrière + LOA + côté embarquement\nAMARRAGE : 'Make fast' · 'Let go' · 'Vessel is all fast'\nNOR : déclaration de disponibilité pour cargaison",
           en:"VTS: CH 16 → [station]×2 + [vessel]×2 + OVER\nPILOT: ETA + draught fwd/aft + LOA + boarding side\nMOORING: 'Make fast' · 'Let go' · 'Vessel is all fast'\nNOR: notice of readiness for cargo",
           es:"VTS: CH 16 → [estación]×2 + [buque]×2 + Cambio\nPRÁCTICO: ETA + calado proa/popa + eslora + lado embarco\nAMARRE: 'Make fast' · 'Let go' · 'Vessel is all fast'\nNOR: notificación de disponibilidad para carga",
           pt:"VTS: CH 16 → [estação]×2 + [navio]×2 + Mudança\nPRÁTICO: ETA + calado proa/popa + comprimento + lado embarque\nAMARRAÇÃO: 'Make fast' · 'Let go' · 'Vessel is all fast'\nNOR: notificação de disponibilidade para carga"} },
    { id:"l3", icon:"🆘", color:C.l3, num:"L3",
      label:{fr:"Sécurité & Urgences",en:"Safety & Emergency",es:"Seguridad y Urgencias",pt:"Segurança e Urgências"},
      key:{fr:"MAYDAY = danger immédiat de mort (×3 + nom×3 + position + nature + personnes + OVER)\nPAN-PAN = urgent mais pas fatal · SÉCURITÉ = info sécurité\nDSC ch.70 AVANT le MAYDAY vocal\nMAYDAY RELAY = tout navire DOIT relayer un MAYDAY sans réponse\nSEELONCE FEENEE = fin du silence de détresse",
           en:"MAYDAY = immediate danger of death (×3 + name×3 + position + nature + persons + OVER)\nPAN-PAN = urgent but not fatal · SÉCURITÉ = safety info\nDSC ch.70 BEFORE vocal MAYDAY\nMAYDAY RELAY = any vessel MUST relay unanswered MAYDAY\nSEELONCE FEENEE = end of distress silence",
           es:"MAYDAY = peligro inmediato de muerte (×3 + nombre×3 + posición + naturaleza + personas + Cambio)\nPAN-PAN = urgente pero no fatal · SÉCURITÉ = información seguridad\nLSD ch.70 ANTES del MAYDAY vocal\nMAYDAY RELAY = cualquier buque DEBE transmitir en relevo un MAYDAY sin respuesta\nSEELONCE FEENEE = fin del silencio de socorro",
           pt:"MAYDAY = perigo imediato de morte (×3 + nome×3 + posição + natureza + pessoas + Mudança)\nPAN-PAN = urgente mas não fatal · SÉCURITÉ = informação segurança\nASN ch.70 ANTES do MAYDAY vocal\nMAYDAY RELAY = qualquer navio DEVE transmitir como relé um MAYDAY sem resposta\nSEELONCE FEENEE = fim do silêncio de perigo"} },
    { id:"l4", icon:"🧭", color:C.l4, num:"L4",
      label:{fr:"Navigation & Manœuvres",en:"Navigation & Maneuvering",es:"Navegación y Maniobras",pt:"Navegação e Manobras"},
      key:{fr:"POSITION : Lat [X]°[X]'N, Long [X]°[X]'E + méthode + heure UTC\nCAP : 'I am altering course to starboard. New course [X] degrees.'\nMETEO : vent (direction degrees + Beaufort + knots) · mer (rough = 2.5-4m) · visibilité\nBARRE : Starboard/Port [X] degrees · Midships · Steady on [X]\nMACHINE : Full/Half/Slow/Dead slow ahead · Stop · astern",
           en:"POSITION: Lat [X]°[X]'N, Long [X]°[X]'E + method + UTC time\nCOURSE: 'I am altering course to starboard. New course [X] degrees.'\nWEATHER: wind (direction degrees + Beaufort + knots) · sea state (rough = 2.5-4m) · visibility\nHELM: Starboard/Port [X] degrees · Midships · Steady on [X]\nENGINE: Full/Half/Slow/Dead slow ahead · Stop · astern",
           es:"POSICIÓN: Lat [X]°[X]'N, Long [X]°[X]'E + método + hora UTC\nRUMBO: 'I am altering course to starboard. New course [X] degrees.'\nMETEO: viento (grados dirección + Beaufort + nudos) · mar (rough = 2.5-4m) · visibilidad\nTIMÓN: Starboard/Port [X] degrees · Midships · Steady on [X]\nMÁQUINAS: Full/Half/Slow/Dead slow ahead · Stop · atrás",
           pt:"POSIÇÃO: Lat [X]°[X]'N, Long [X]°[X]'E + método + hora UTC\nRUMO: 'I am altering course to starboard. New course [X] degrees.'\nMETEO: vento (graus direção + Beaufort + nós) · mar (rough = 2.5-4m) · visibilidade\nLEME: Starboard/Port [X] degrees · Midships · Steady on [X]\nMÁQUINAS: Full/Half/Slow/Dead slow ahead · Stop · atrás"} },
    { id:"l5", icon:"📦", color:C.l5, num:"L5",
      label:{fr:"Opérations Cargo",en:"Cargo Operations",es:"Operaciones de Carga",pt:"Operações de Carga"},
      key:{fr:"DÉBUT : 'Cargo operations have commenced. Loading [cargo] at hold [X]. Rate [X] t/h.'\nB/L : Clean = bon état · Claused = réserves/dommages\nPOINTAGE : 'The tally shows [X] packages. Shortage of [X].'\nMD : Classe IMDG + numéro ONU + position arrimage\nLETTRE DE PROTESTATION = document juridique formel",
           en:"START: 'Cargo operations have commenced. Loading [cargo] at hold [X]. Rate [X] t/h.'\nB/L: Clean = good condition · Claused = reservations/damage noted\nTALLY: 'The tally shows [X] packages. Shortage of [X].'\nDG: IMDG Class + UN number + stowage position\nLETTER OF PROTEST = formal legal document",
           es:"INICIO: 'Cargo operations have commenced. Loading [cargo] at hold [X]. Rate [X] t/h.'\nB/L: Clean = buen estado · Claused = reservas/daños anotados\nRECUENTO: 'The tally shows [X] packages. Shortage of [X].'\nMM.PP.: Clase IMDG + número ONU + posición estiba\nCARTA DE PROTESTA = documento jurídico formal",
           pt:"INÍCIO: 'Cargo operations have commenced. Loading [cargo] at hold [X]. Rate [X] t/h.'\nB/L: Clean = bom estado · Claused = reservas/danos anotados\nCONTAGEM: 'The tally shows [X] packages. Shortage of [X].'\nMP: Classe IMDG + número ONU + posição estiva\nCARTA DE PROTESTO = documento jurídico formal"} },
    { id:"l6", icon:"⚙️", color:C.l6, num:"L6",
      label:{fr:"Salle des Machines",en:"Engine Room",es:"Sala de Máquinas",pt:"Sala de Máquinas"},
      key:{fr:"S.D.M. répond TOUJOURS : 'Bridge, engine room.'\nChaque ordre confirmé avec RPM : 'Full ahead — RPM [X]. Over.'\nSTAND BY = se tenir prêt à manœuvrer\nBLACKOUT = perte totale d'alimentation électrique\nNAVIRE MORT = pas propulsion + pas gouverne + pas énergie → MAYDAY\nCHANGEMENT CARBURANT : HFO→MGO obligatoire en ECA",
           en:"ER ALWAYS responds: 'Bridge, engine room.'\nEvery order confirmed with RPM: 'Full ahead — RPM [X]. Over.'\nSTAND BY = be ready to manoeuvre\nBLACKOUT = total loss of electrical power\nDEAD SHIP = no propulsion + no steering + no power → MAYDAY\nFUEL CHANGEOVER: HFO→MGO mandatory in ECAs",
           es:"S.M. SIEMPRE responde: 'Bridge, engine room.'\nCada orden confirmada con RPM: 'Full ahead — RPM [X]. Over.'\nSTAND BY = estar listo para maniobrar\nAPAGÓN = pérdida total de energía eléctrica\nBARCO MUERTO = sin propulsión + sin timón + sin energía → MAYDAY\nCAMBIO COMBUSTIBLE: HFO→MGO obligatorio en ECA",
           pt:"S.M. responde SEMPRE: 'Bridge, engine room.'\nCada ordem confirmada com RPM: 'Full ahead — RPM [X]. Over.'\nSTAND BY = estar pronto para manobrar\nAPAGÃO = perda total de energia elétrica\nNAVIO MORTO = sem propulsão + sem leme + sem energia → MAYDAY\nMUDANÇA COMBUSTÍVEL: HFO→MGO obrigatório em ECAs"} },
    { id:"l7", icon:"🏥", color:C.l7, num:"L7",
      label:{fr:"SMCP Médical",en:"Medical SMCP",es:"SMCP Médico",pt:"SMCP Médico"},
      key:{fr:"PAN-PAN MÉDICAL : PAN-PAN×3 + navire + 'medical emergency' + position + ETA\n7 ÉLÉMENTS : nom/âge/sexe · symptômes · signes vitaux · antécédents · médicaments donnés/disponibles · position\nSIGNES VITAUX SMCP : '[X] beats per minute [regular/irregular]' · '[X] over [X]' · '[X] degrees Celsius'\nFAST AVC : Face · Bras · Parole · Temps\nARRÊT CARDIAQUE = MAYDAY",
           en:"MEDICAL PAN-PAN: PAN-PAN×3 + vessel + 'medical emergency' + position + ETA\n7 ELEMENTS: name/age/sex · symptoms · vital signs · history · meds given/available · position\nVITAL SIGNS SMCP: '[X] beats per minute [regular/irregular]' · '[X] over [X]' · '[X] degrees Celsius'\nFAST STROKE: Face · Arms · Speech · Time\nCARDIAC ARREST = MAYDAY",
           es:"PAN-PAN MÉDICO: PAN-PAN×3 + buque + 'medical emergency' + posición + ETA\n7 ELEMENTOS: nombre/edad/sexo · síntomas · signos vitales · historial · medicación dada/disponible · posición\nSIGNOS VITALES SMCP: '[X] beats per minute [regular/irregular]' · '[X] over [X]' · '[X] degrees Celsius'\nFAST ACV: Cara · Brazos · Habla · Tiempo\nPARO CARDÍACO = MAYDAY",
           pt:"PAN-PAN MÉDICO: PAN-PAN×3 + navio + 'medical emergency' + posição + ETA\n7 ELEMENTOS: nome/idade/sexo · sintomas · sinais vitais · historial · medicação dada/disponível · posição\nSINAIS VITAIS SMCP: '[X] beats per minute [regular/irregular]' · '[X] over [X]' · '[X] degrees Celsius'\nFAST AVC: Face · Braços · Fala · Tempo\nPARAGEM CARDÍACA = MAYDAY"} },
  ];

  const sel_ = sel!==null ? lessons[sel] : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
        {lessons.map((l,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            padding:"8px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",
            background:sel===i?`${l.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${sel===i?l.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:14,marginBottom:2}}>{l.icon}</div>
            <div style={{fontSize:9,fontWeight:700,color:sel===i?l.color:C.muted,letterSpacing:1}}>{l.num}</div>
            <div style={{fontSize:8,color:sel===i?l.color:C.muted,lineHeight:1.2}}>{l.label[lang]||l.label.en}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}10`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:11,fontWeight:700,color:sel_.color,marginBottom:8}}>{sel_.icon} {sel_.num} — {sel_.label[lang]||sel_.label.en}</div>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.key[lang]||sel_.key.en}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — SMCP MASTER GLOSSARY
// ══════════════════════════════════════
function GlossarySVG({ lang }) {
  const [cat, setCat] = useState("signals");
  const [search, setSearch] = useState("");

  const glossary = {
    signals:{ label:{fr:"Signaux & Priorité",en:"Signals & Priority",es:"Señales y Prioridad",pt:"Sinais e Prioridade"}, icon:"📡", color:C.l3, terms:[
      { en:"MAYDAY", def:{fr:"Signal de détresse — danger IMMÉDIAT de mort · répété 3 fois",en:"Distress signal — IMMEDIATE danger of death · repeated 3 times",es:"Señal de socorro — peligro INMEDIATO de muerte · repetida 3 veces",pt:"Sinal de perigo — perigo IMEDIATO de morte · repetido 3 vezes"} },
      { en:"PAN-PAN", def:{fr:"Signal d'urgence — grave mais pas immédiatement fatal",en:"Urgency signal — serious but not immediately fatal",es:"Señal de urgencia — grave pero no inmediatamente fatal",pt:"Sinal de urgência — grave mas não imediatamente fatal"} },
      { en:"SÉCURITÉ", def:{fr:"Signal de sécurité — information importante pour la navigation",en:"Safety signal — important information for navigation",es:"Señal de seguridad — información importante para la navegación",pt:"Sinal de segurança — informação importante para a navegação"} },
      { en:"MAYDAY RELAY", def:{fr:"Relais d'un MAYDAY non accusé de réception — obligation légale SOLAS",en:"Relay of an unacknowledged MAYDAY — SOLAS legal obligation",es:"Relevo de un MAYDAY sin acuse de recibo — obligación legal SOLAS",pt:"Relé de um MAYDAY sem acuse de receção — obrigação legal SOLAS"} },
      { en:"SEELONCE MAYDAY", def:{fr:"Silence imposé sur CH 16 pendant détresse — seul le navire en détresse et MRCC peuvent émettre",en:"Silence imposed on CH 16 during distress — only distress vessel and MRCC may transmit",es:"Silencio impuesto en CH 16 durante socorro — solo el buque en peligro y el MRCC pueden emitir",pt:"Silêncio imposto no CH 16 durante perigo — apenas o navio em perigo e o MRCC podem emitir"} },
      { en:"SEELONCE FEENEE", def:{fr:"Fin du silence de détresse — communications normales peuvent reprendre",en:"End of distress silence — normal communications may resume",es:"Fin del silencio de socorro — las comunicaciones normales pueden reanudarse",pt:"Fim do silêncio de perigo — as comunicações normais podem ser retomadas"} },
      { en:"DSC", def:{fr:"Appel Sélectif Numérique — alerte automatique sur CH 70 avec MMSI + position + type de détresse",en:"Digital Selective Calling — automatic alert on CH 70 with MMSI + position + distress type",es:"Llamada Selectiva Digital — alerta automática en CH 70 con MMSI + posición + tipo de socorro",pt:"Chamada Seletiva Digital — alerta automático no CH 70 com MMSI + posição + tipo de perigo"} },
      { en:"MMSI", def:{fr:"Maritime Mobile Service Identity — numéro d'identification unique à 9 chiffres du navire",en:"Maritime Mobile Service Identity — unique 9-digit vessel identification number",es:"Identidad del Servicio Móvil Marítimo — número de identificación único de 9 dígitos del buque",pt:"Identidade do Serviço Móvel Marítimo — número de identificação único de 9 dígitos do navio"} },
    ]},
    nav:{ label:{fr:"Navigation",en:"Navigation",es:"Navegación",pt:"Navegação"}, icon:"🧭", color:C.l4, terms:[
      { en:"CPA", def:{fr:"Closest Point of Approach — distance minimale entre deux navires en route de collision",en:"Closest Point of Approach — minimum distance between two vessels on collision course",es:"Punto de Máxima Aproximación — distancia mínima entre dos buques en ruta de colisión",pt:"Ponto de Máxima Aproximação — distância mínima entre dois navios em rota de abalroamento"} },
      { en:"TCPA", def:{fr:"Time to CPA — temps restant avant le point de rapprochement maximal",en:"Time to CPA — time remaining before closest point of approach",es:"Tiempo hasta el PMA — tiempo restante antes del punto de máxima aproximación",pt:"Tempo até ao PMA — tempo restante antes do ponto de máxima aproximação"} },
      { en:"TSS", def:{fr:"Traffic Separation Scheme / Dispositif de Séparation du Trafic — voies de navigation séparées",en:"Traffic Separation Scheme — separated navigation lanes reducing collision risk",es:"Sistema de Dispositivos de Tráfico — carriles de navegación separados",pt:"Sistema de Separação de Tráfego — faixas de navegação separadas"} },
      { en:"ETA", def:{fr:"Estimated Time of Arrival — heure d'arrivée estimée (toujours en UTC en SMCP)",en:"Estimated Time of Arrival — always in UTC in SMCP",es:"Estimated Time of Arrival — hora estimada de llegada (siempre en UTC en SMCP)",pt:"Estimated Time of Arrival — hora estimada de chegada (sempre em UTC em SMCP)"} },
      { en:"LOA", def:{fr:"Length Overall — longueur hors tout du navire",en:"Length Overall — total vessel length from bow to stern",es:"Eslora Total — longitud total del buque de proa a popa",pt:"Comprimento Total — comprimento total do navio da proa à popa"} },
      { en:"NUC", def:{fr:"Not Under Command — navire incapable de manœuvrer selon les règles → priorité sur tous",en:"Not Under Command — vessel unable to manoeuvre as required → priority over all",es:"Sin Gobierno — buque incapaz de maniobrar según las reglas → prioridad sobre todos",pt:"Sem Governo — navio incapaz de manobrar conforme as regras → prioridade sobre todos"} },
      { en:"RAM", def:{fr:"Restricted in Ability to Manoeuvre — navire limité dans ses manœuvres (dragage, pose câbles…)",en:"Restricted in Ability to Manoeuvre — vessel limited in maneuvering (dredging, cable laying…)",es:"Maniobrabilidad Restringida — buque limitado en su maniobra (dragado, tendido de cables…)",pt:"Manobabilidade Restrita — navio limitado nas manobras (dragagem, tendência de cabos…)"} },
      { en:"VHF", def:{fr:"Very High Frequency — radio marine · CH 16 = urgence/veille · CH 70 = DSC · ch de travail varient",en:"Very High Frequency — marine radio · CH 16 = emergency/watch · CH 70 = DSC · working channels vary",es:"Muy Alta Frecuencia — radio marítima · CH 16 = emergencia/guardia · CH 70 = LSD",pt:"Muito Alta Frequência — rádio marítima · CH 16 = emergência/escuta · CH 70 = ASN"} },
    ]},
    cargo:{ label:{fr:"Cargo & Port",en:"Cargo & Port",es:"Carga y Puerto",pt:"Carga e Porto"}, icon:"📦", color:C.l5, terms:[
      { en:"B/L (Bill of Lading)", def:{fr:"Connaissement — preuve du contrat transport + reçu marchandises + titre propriété · Clean = bon état · Claused = réserves",en:"Bill of Lading — proof of transport contract + goods receipt + title to goods · Clean = good condition · Claused = reservations noted",es:"Conocimiento de embarque — prueba del contrato de transporte + recibo de mercancías + título de propiedad",pt:"Conhecimento de embarque — prova do contrato de transporte + recibo de mercadorias + título de propriedade"} },
      { en:"NOR", def:{fr:"Notice of Readiness — déclaration formelle du capitaine que le navire est prêt pour la cargaison → déclenche la planche",en:"Notice of Readiness — formal declaration that vessel is ready for cargo → triggers laytime",es:"Notificación de Disponibilidad — declaración formal de que el buque está listo para la carga → activa la plancha",pt:"Notificação de Disponibilidade — declaração formal de que o navio está pronto para a carga → aciona a plancha"} },
      { en:"FIO", def:{fr:"Free In Out — frais manutention cargaison à la charge de l'affréteur (pas de l'armateur)",en:"Free In Out — cargo handling costs for charterer's account (not shipowner's)",es:"Free In Out — costes de manejo de carga por cuenta del fletador (no del armador)",pt:"Free In Out — custos de manuseamento de carga por conta do fretador (não do armador)"} },
      { en:"IMDG Code", def:{fr:"Code Maritime International des Marchandises Dangereuses — classes 1-9 · numéro ONU obligatoire",en:"International Maritime Dangerous Goods Code — classes 1-9 · UN number mandatory",es:"Código Marítimo Internacional de Mercancías Peligrosas — clases 1-9 · número ONU obligatorio",pt:"Código Marítimo Internacional de Mercadorias Perigosas — classes 1-9 · número ONU obrigatório"} },
      { en:"Demurrage", def:{fr:"Surestarie — pénalité payée par l'affréteur pour dépassement de la planche",en:"Penalty paid by charterer for exceeding allowed laytime",es:"Sobreestadía — penalización pagada por el fletador por exceder la plancha",pt:"Sobrestadia — penalização paga pelo fretador por exceder a plancha"} },
      { en:"ECA", def:{fr:"Emission Control Area — zone de contrôle des émissions → changement carburant HFO→MGO obligatoire",en:"Emission Control Area — fuel changeover HFO→MGO mandatory on entry",es:"Zona de Control de Emisiones — cambio de combustible HFO→MGO obligatorio al entrar",pt:"Zona de Controlo de Emissões — mudança de combustível HFO→MGO obrigatória à entrada"} },
    ]},
    medical:{ label:{fr:"Médical",en:"Medical",es:"Médico",pt:"Médico"}, icon:"🏥", color:C.l7, terms:[
      { en:"AVPU", def:{fr:"Échelle de conscience : Alert (conscient) / Verbal (répond à voix) / Pain (répond à douleur) / Unresponsive (aucune réponse)",en:"Consciousness scale: Alert / Verbal response / Pain response / Unresponsive",es:"Escala de consciencia: Alert / Verbal response / Pain response / Unresponsive",pt:"Escala de consciência: Alert / Verbal response / Pain response / Unresponsive"} },
      { en:"FAST", def:{fr:"Règle AVC : Face (visage tombant) / Arms (bras faible) / Speech (parole difficile) / Time (urgence !)",en:"Stroke rule: Face (drooping) / Arms (weakness) / Speech (slurred) / Time (call for help!)",es:"Regla ACV: Face (caída) / Arms (debilidad) / Speech (dificultad) / Time (¡llamar!)",pt:"Regra AVC: Face (queda) / Arms (fraqueza) / Speech (dificuldade) / Time (chamar!)"} },
      { en:"PAN-PAN MEDICO", def:{fr:"Appel urgence médicale · 7 éléments obligatoires : nom/âge/sexe · symptômes · signes vitaux · antécédents · médicaments · position",en:"Medical urgency call · 7 mandatory elements: name/age/sex · symptoms · vital signs · history · meds · position",es:"Llamada urgencia médica · 7 elementos obligatorios: nombre/edad/sexo · síntomas · signos vitales · historial · medicación · posición",pt:"Chamada urgência médica · 7 elementos obrigatórios: nome/idade/sexo · sintomas · sinais vitais · historial · medicação · posição"} },
      { en:"Vital signs normal range", def:{fr:"Pouls : 60-100 bpm · TA : 90-140/60-90 mmHg · Temp : 36,5-37,5°C · Respiration : 12-20/min",en:"Pulse: 60-100 bpm · BP: 90-140/60-90 mmHg · Temp: 36.5-37.5°C · Respiration: 12-20/min",es:"Pulso: 60-100 lpm · TA: 90-140/60-90 mmHg · Temp: 36,5-37,5°C · Respiración: 12-20/min",pt:"Pulso: 60-100 bpm · TA: 90-140/60-90 mmHg · Temp: 36,5-37,5°C · Respiração: 12-20/min"} },
      { en:"Tachycardia", def:{fr:"Pouls > 100 bpm — trop rapide · souvent associé à fièvre, choc, détresse",en:"Pulse > 100 bpm — too fast · often associated with fever, shock, distress",es:"Pulso > 100 lpm — demasiado rápido · frecuentemente asociado a fiebre, choque, angustia",pt:"Pulso > 100 bpm — demasiado rápido · frequentemente associado a febre, choque, angústia"} },
      { en:"Bradycardia", def:{fr:"Pouls < 60 bpm — trop lent · peut indiquer problème cardiaque",en:"Pulse < 60 bpm — too slow · may indicate cardiac problem",es:"Pulso < 60 lpm — demasiado lento · puede indicar un problema cardíaco",pt:"Pulso < 60 bpm — demasiado lento · pode indicar problema cardíaco"} },
    ]},
  };

  const c = glossary[cat];
  const filtered = search.length > 1
    ? c.terms.filter(t=>t.en.toLowerCase().includes(search.toLowerCase()))
    : c.terms;

  return (
    <div>
      <input type="text" value={search} onChange={e=>setSearch(e.target.value)}
        placeholder={lang==="fr"?"Chercher un terme...":lang==="en"?"Search term...":lang==="es"?"Buscar término...":"Pesquisar termo..."}
        style={{width:"100%",padding:"9px 12px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${C.border}`,color:C.white,fontSize:12,marginBottom:10,boxSizing:"border-box"}}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
        {Object.entries(glossary).map(([k,v])=>(
          <button key={k} onClick={()=>{setCat(k);setSearch("");}} style={{
            padding:"6px 4px",borderRadius:10,cursor:"pointer",fontSize:9,fontWeight:700,
            background:cat===k?`${v.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${cat===k?v.color:"rgba(255,255,255,0.08)"}`,
            color:cat===k?v.color:C.muted}}>
            {v.icon} {v.label[lang]||v.label.en}
          </button>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:260,overflowY:"auto"}}>
        {filtered.map((term,i)=>(
          <div key={i} style={{padding:"10px 12px",borderRadius:12,background:"rgba(255,255,255,0.04)",border:`1px solid ${c.color}22`}}>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:c.color,fontWeight:700,marginBottom:4}}>{term.en}</div>
            <div style={{fontSize:11,color:C.muted,lineHeight:1.5}}>{term.def[lang]||term.def.en}</div>
          </div>
        ))}
        {filtered.length===0&&<div style={{textAlign:"center",color:C.muted,fontSize:12,padding:"20px 0"}}>
          {lang==="fr"?"Aucun terme trouvé":lang==="en"?"No terms found":"No se encontraron términos"}
        </div>}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — RAPID FIRE REVIEW
// ══════════════════════════════════════
function RapidFireSVG({ lang }) {
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(false);

  const cards = [
    { q:{fr:"Comment dit-on 'j'attends ta réponse' en radio SMCP ?",en:"How do you say 'I am waiting for your reply' in SMCP radio?",es:"¿Cómo se dice 'estoy esperando tu respuesta' en SMCP radio?",pt:"Como se diz 'estou à espera da tua resposta' em SMCP radio?"}, a:"OVER" },
    { q:{fr:"Combien de fois répète-t-on MAYDAY au début d'un appel de détresse ?",en:"How many times is MAYDAY repeated at the start of a distress call?",es:"¿Cuántas veces se repite MAYDAY al inicio de una llamada de socorro?",pt:"Quantas vezes se repete MAYDAY no início de uma chamada de socorro?"}, a:"3 × MAYDAY" },
    { q:{fr:"Quel canal VHF est utilisé pour l'alerte initiale VTS ?",en:"Which VHF channel is used for initial VTS contact?",es:"¿Qué canal VHF se usa para el contacto VTS inicial?",pt:"Que canal VHF é usado para o contacto VTS inicial?"}, a:"CH 16" },
    { q:{fr:"Que signifie 'I have the con' dit par le pilote ?",en:"What does 'I have the con' mean when said by the pilot?",es:"¿Qué significa 'I have the con' dicho por el práctico?",pt:"O que significa 'I have the con' dito pelo prático?"}, a:{fr:"Le pilote contrôle — mais le capitaine reste légalement responsable",en:"Pilot is controlling — but captain remains legally responsible",es:"El práctico controla — pero el capitán sigue siendo legalmente responsable",pt:"O prático está a controlar — mas o capitão continua legalmente responsável"} },
    { q:{fr:"Pouls normal adulte en SMCP ?",en:"Normal adult pulse in SMCP?",es:"¿Pulso normal adulto en SMCP?",pt:"Pulso normal adulto em SMCP?"}, a:"60-100 beats per minute" },
    { q:{fr:"Quelle est la règle FAST pour les AVC ?",en:"What is the FAST rule for strokes?",es:"¿Cuál es la regla FAST para los ACV?",pt:"Qual é a regra FAST para os AVC?"}, a:"Face · Arms · Speech · Time" },
    { q:{fr:"Comment confirme la S.D.M. un ordre 'Full ahead' ?",en:"How does the engine room confirm 'Full ahead'?",es:"¿Cómo confirma la S.M. una orden 'Full ahead'?",pt:"Como confirma a S.M. uma ordem 'Full ahead'?"}, a:"Full ahead — engine on full ahead. RPM [X]. Over." },
    { q:{fr:"Qu'est-ce que 'SEELONCE FEENEE' ?",en:"What is 'SEELONCE FEENEE'?",es:"¿Qué es 'SEELONCE FEENEE'?",pt:"O que é 'SEELONCE FEENEE'?"}, a:{fr:"Fin du silence de détresse — communications normales peuvent reprendre",en:"End of distress silence — normal communications may resume",es:"Fin del silencio de socorro — las comunicaciones normales pueden reanudarse",pt:"Fim do silêncio de perigo — as comunicações normais podem ser retomadas"} },
    { q:{fr:"Que signifie 'Claused B/L' ?",en:"What does 'Claused B/L' mean?",es:"¿Qué significa 'Claused B/L'?",pt:"O que significa 'Claused B/L'?"}, a:{fr:"Connaissement avec réserves/dommages notés",en:"Bill of Lading with reservations or damage noted",es:"Conocimiento de embarque con reservas/daños anotados",pt:"Conhecimento de embarque com reservas/danos anotados"} },
    { q:{fr:"Quelle est la hauteur des vagues pour 'Rough' ?",en:"What is the wave height for sea state 'Rough'?",es:"¿Cuál es la altura de las olas para el estado del mar 'Rough'?",pt:"Qual é a altura das ondas para o estado do mar 'Rough'?"}, a:"2.5 - 4 metres" },
  ];

  const card = cards[idx];
  const ans = typeof card.a === "string" ? card.a : (card.a[lang]||card.a.en);
  const q_ = card.q[lang]||card.q.en;

  const mark=(ok)=>{
    setTotal(t=>t+1);
    if(ok) setCorrect(c=>c+1);
    if(idx<cards.length-1){setIdx(i=>i+1);setRevealed(false);}
    else setDone(true);
  };

  if(done) return (
    <div style={{textAlign:"center",padding:"16px"}}>
      <div style={{fontSize:48}}>{correct>=8?"🏆":correct>=6?"🎖️":"📚"}</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,margin:"8px 0"}}>{correct}/{total}</div>
      <div style={{fontSize:12,color:C.muted,marginBottom:12}}>{Math.round(correct/total*100)}%</div>
      <button onClick={()=>{setIdx(0);setRevealed(false);setCorrect(0);setTotal(0);setDone(false);}} style={{padding:"8px 16px",borderRadius:10,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:C.muted,cursor:"pointer",fontSize:11}}>🔄 {lang==="fr"?"Recommencer":lang==="en"?"Restart":"Reiniciar"}</button>
    </div>
  );

  return (
    <div>
      <div style={{display:"flex",gap:3,marginBottom:10}}>
        {cards.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<idx?C.green:i===idx?C.exam:"rgba(255,255,255,0.1)"}}/>)}
      </div>
      <div style={{fontSize:10,color:C.muted,textAlign:"right",marginBottom:8}}>{idx+1}/{cards.length}</div>
      <div style={{padding:"14px",borderRadius:14,background:"rgba(0,0,0,0.4)",border:`1px solid ${C.exam}33`,marginBottom:10,minHeight:80,display:"flex",alignItems:"center"}}>
        <div style={{fontSize:14,color:C.white,fontWeight:700,lineHeight:1.5}}>{q_}</div>
      </div>
      {!revealed?(
        <button onClick={()=>setRevealed(true)} style={{width:"100%",padding:"12px 0",border:`1px solid ${C.exam}44`,borderRadius:12,background:`${C.exam}12`,color:C.exam,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
          👁 {lang==="fr"?"RÉVÉLER LA RÉPONSE":lang==="en"?"REVEAL ANSWER":lang==="es"?"REVELAR RESPUESTA":"REVELAR RESPOSTA"}
        </button>
      ):(
        <div>
          <div style={{padding:"12px",borderRadius:12,background:`${C.exam}15`,border:`1px solid ${C.exam}55`,marginBottom:10,fontFamily:"'Courier New',monospace",fontSize:13,color:C.white,fontWeight:700,textAlign:"center"}}>{ans}</div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>mark(false)} style={{flex:1,padding:"11px 0",borderRadius:12,background:"rgba(192,57,43,0.2)",border:`1px solid ${C.red}55`,color:C.red,fontSize:13,fontWeight:700,cursor:"pointer"}}>✗ {lang==="fr"?"RATÉ":"WRONG"}</button>
            <button onClick={()=>mark(true)} style={{flex:1,padding:"11px 0",borderRadius:12,background:"rgba(30,138,74,0.2)",border:`1px solid ${C.green}55`,color:C.green,fontSize:13,fontWeight:700,cursor:"pointer"}}>✓ {lang==="fr"?"SU":"CORRECT"}</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE — MIXED MODULE
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans,setAns]=useState({q1:"",q2:"",q3:""});
  const [showC,setShowC]=useState(false);
  const qs={
    en:[
      {id:"q1",q:"Complete: 'MAYDAY MAYDAY MAYDAY. This is MV ATLAS, MV ATLAS, MV ATLAS. MAYDAY MV ATLAS. Position Latitude 43°15'N, Longitude 008°30'W. I have ___'\n(Fill: nature of distress)",correct:"a fire / fire in engine room / collision / sinking"},
      {id:"q2",q:"VTS contact on CH 16. You are MV ORION. Station is CROSS MED. Write the opening call.\n(First 8 words)",correct:"CROSS MED CROSS MED this is MV ORION"},
      {id:"q3",q:"Engine room confirms 'Stop engines'. What is the exact response?\n(Key words)",correct:"Stop engines engine stopped RPM zero"},
    ],
    fr:[
      {id:"q1",q:"Complétez : 'MAYDAY MAYDAY MAYDAY. This is MV ATLAS, MV ATLAS, MV ATLAS. MAYDAY MV ATLAS. Position Latitude 43°15'N, Longitude 008°30'W. I have ___'\n(Remplir : nature de la détresse)",correct:"a fire / feu en salle des machines / collision / en train de couler"},
      {id:"q2",q:"Contact VTS sur CH 16. Vous êtes MV ORION. La station est CROSS MED. Rédigez l'appel d'ouverture.\n(8 premiers mots)",correct:"CROSS MED CROSS MED this is MV ORION"},
      {id:"q3",q:"La salle des machines confirme 'Stop engines'. Quelle est la réponse exacte ?\n(Mots clés)",correct:"Stop engines engine stopped RPM zero"},
    ],
    es:[
      {id:"q1",q:"Complete: 'MAYDAY MAYDAY MAYDAY. This is MV ATLAS, MV ATLAS, MV ATLAS. MAYDAY MV ATLAS. Position Latitude 43°15'N, Longitude 008°30'W. I have ___'\n(Completar: naturaleza de la emergencia)",correct:"a fire / incendio en sala de máquinas / colisión / hundiéndome"},
      {id:"q2",q:"Contacto VTS en CH 16. Usted es MV ORION. La estación es CROSS MED. Escriba la llamada de apertura.\n(Primeras 8 palabras)",correct:"CROSS MED CROSS MED this is MV ORION"},
      {id:"q3",q:"La sala de máquinas confirma 'Stop engines'. ¿Cuál es la respuesta exacta?\n(Palabras clave)",correct:"Stop engines engine stopped RPM zero"},
    ],
    pt:[
      {id:"q1",q:"Complete: 'MAYDAY MAYDAY MAYDAY. This is MV ATLAS, MV ATLAS, MV ATLAS. MAYDAY MV ATLAS. Position Latitude 43°15'N, Longitude 008°30'W. I have ___'\n(Preencher: natureza do perigo)",correct:"a fire / incêndio na casa das máquinas / colisão / a afundar"},
      {id:"q2",q:"Contacto VTS no CH 16. É o MV ORION. A estação é CROSS MED. Escreva a chamada de abertura.\n(Primeiras 8 palavras)",correct:"CROSS MED CROSS MED this is MV ORION"},
      {id:"q3",q:"A sala de máquinas confirma 'Stop engines'. Qual é a resposta exata?\n(Palavras chave)",correct:"Stop engines engine stopped RPM zero"},
    ],
  };
  const list=qs[lang]||qs.en;
  const chk=(q,val)=>{
    const v=val.trim().toLowerCase();
    if(q.id==="q1") return v.includes("fire")||v.includes("feu")||v.includes("incendie")||v.includes("collision")||v.includes("sink")||v.includes("coule")||v.includes("hundi");
    if(q.id==="q2") return v.includes("cross")&&v.includes("med")&&v.includes("orion");
    if(q.id==="q3") return v.includes("stop")&&v.includes("engine")&&(v.includes("zero")||v.includes("stopped"));
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.exam}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Exercice mixte — L3 MAYDAY · L2 VTS · L6 Machine":
         lang==="en"?"💡 Mixed exercise — L3 MAYDAY · L2 VTS · L6 Engine Room":
         lang==="es"?"💡 Ejercicio mixto — L3 MAYDAY · L2 VTS · L6 Máquinas":
         "💡 Exercício misto — L3 MAYDAY · L2 VTS · L6 Máquinas"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:12,fontFamily:"'Courier New',monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q,ans[q.id])?C.green:C.red}}>{chk(q,ans[q.id])?"✓":`✗ → ${q.correct}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7,marginBottom:10,fontFamily:"'Courier New',monospace"}}>
        Q1: Describe nature of distress — 'a fire in the engine room' / 'a collision' / 'I am sinking'\nQ2: 'CROSS MED, CROSS MED, this is MV ORION, MV ORION. Over.' — station×2 + vessel×2\nQ3: 'Stop engines — engine is stopped. RPM zero. Over.' — always confirm + give RPM
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":`${C.exam}12`,border:`1px solid ${showC?C.green:C.exam}44`,color:showC?C.green:C.exam,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// FINAL EXAM — 10 QUESTIONS ALL MODULES
// ══════════════════════════════════════
const FINAL_EXAM = {
  en:[
    {q:"[L1] You are taking over the bridge watch. What is the SMCP opening phrase?",opts:["Hello, I'm here","I am taking over the watch. Present course [X] degrees. Speed [X] knots. Position [lat/long]. Traffic: [describe]. Weather: [describe]. Any special orders: [describe].","Watch taken over","Watch change"],correct:1,module:"L1 Bridge Watch",expl:"Watch handover SMCP: 'I am taking over the watch. Present course [X] degrees true/magnetic. Speed [X] knots. Position: Latitude [X], Longitude [X], last fix at [time] UTC by [GPS/radar]. Traffic in the area: [describe]. Weather: [describe]. Engine status: [ready/standby]. Any special orders from master: [describe].' The officer being relieved confirms: 'I confirm. You have the watch.'"},
    {q:"[L2] VTS says 'Stand by on channel 12'. What does this mean?",opts:["Switch to CH 12 and stop listening","Remain on CH 12 and keep a continuous listening watch — do not change channel","Go to CH 12 and then CH 16","Ignore and use CH 16"],correct:1,module:"L2 Port & VTS",expl:"'Stand by on channel [X]' = remain tuned to channel [X] and maintain a continuous listening watch. Do not transmit unless necessary, and do not change to another channel without VTS instruction. Your response: 'Marseille VTS, MV [name]. Understood. Standing by on channel 12. Over.' This is the standard VTS working channel instruction after initial CH 16 contact."},
    {q:"[L3] A vessel is sinking. What is the correct MAYDAY structure?",opts:["MAYDAY + position + help","MAYDAY×3, vessel name×3, MAYDAY + name, position (Lat/Long), nature of distress, persons on board, assistance required, OVER","SOS + name + position","Emergency + distress + help"],correct:1,module:"L3 Safety & Emergency",expl:"MAYDAY structure (6 mandatory elements): 1. MAYDAY MAYDAY MAYDAY 2. This is [NAME] [NAME] [NAME] 3. MAYDAY [NAME] 4. Position: Latitude [X]°[X]'N, Longitude [X]°[X]'E 5. Nature of distress: [I am sinking / fire / collision] 6. [X] persons on board. I require immediate assistance. Over. Always activate DSC on CH 70 FIRST if available. Then vocal MAYDAY on CH 16 at maximum power (25W)."},
    {q:"[L4] How do you report your vessel altering course to avoid collision?",opts:["Turning right","I am altering course to [starboard/port]. My new course will be [X] degrees [true/magnetic]. I am doing so to avoid collision with [vessel/danger description]. Over.","Changing course","Going to new heading"],correct:1,module:"L4 Navigation",expl:"Collision avoidance course alteration SMCP: 'I am altering course to [starboard/port]. My new course will be [X] degrees true. I am doing so to avoid collision with [vessel bearing X degrees, range X miles / unlit object / traffic separation zone boundary].' Per COLREG Rule 8: action must be large, timely and positive. After alteration: 'My new course is [X] degrees. CPA will now be [X] miles in [X] minutes.'"},
    {q:"[L5] You find 5 packages missing on discharge. What is the correct SMCP report?",opts:["5 missing","I have found a shortage of 5 packages on discharge from hold [X]. Bill of lading quantity: [X]. Tally count: [X]. I am issuing a letter of protest.","Less than expected","Shortage reported"],correct:1,module:"L5 Cargo",expl:"Cargo shortage SMCP: 'I have found a shortage of [X] packages/tonnes on discharge from hold [X]. Bill of lading figure: [X] packages/tonnes. Tally count: [X] packages/tonnes. Difference: [X] short. I am issuing a letter of protest to the [stevedores/terminal/shipper]. A surveyor is required to verify the shortage before completion of discharge.' The letter of protest is a formal legal document protecting the vessel's/owner's rights."},
    {q:"[L6] Engine room hears 'Dead slow ahead'. What is the confirmed response?",opts:["OK","Dead slow ahead — engine on dead slow ahead. RPM [X]. Over.","Slow engine","Going very slow"],correct:1,module:"L6 Engine Room",expl:"Engine order confirmation SMCP — mandatory closed-loop: Bridge: 'Dead slow ahead please.' Engine room: 'Dead slow ahead — engine is on dead slow ahead. RPM [X]. Over.' This confirms: the order was heard correctly, it is being executed, and gives the current RPM. This protocol is mandatory — without confirmation, the bridge cannot know if the order was received and executed correctly. If unable to comply: 'Bridge, engine room. Unable to comply with dead slow ahead. [Reason]. Maximum available is [X] RPM. Over.'"},
    {q:"[L7] Crew member with suspected stroke — what do you report?",opts:["Brain problem","I have a patient with suspected stroke (CVA). Face: [describe drooping]. Arms: [describe weakness]. Speech: [slurred/absent]. Time of onset: [X] minutes ago. Patient is [conscious/confused]. I require immediate medical evacuation. PAN-PAN.","Head injury","Unconscious crew"],correct:1,module:"L7 Medical",expl:"Stroke SMCP (FAST rule): 'PAN-PAN PAN-PAN PAN-PAN. [MRCC]. MV [name]. I have a patient with suspected stroke (CVA). FAST assessment: Face — [facial drooping on left/right side]. Arms — [left/right arm weakness]. Speech — [slurred/unable to speak]. Time of onset: [X] minutes ago. Patient is [conscious / confused / deteriorating]. I require immediate medical evacuation. My position: [lat/long]. ETA nearest port: [X] hours. Over.' TIME IS CRITICAL — note exact onset time."},
    {q:"[L1-L7 MIXED] A vessel is completely without power, steering, and propulsion. What is this called?",opts:["NUC","Dead ship condition — requires MAYDAY broadcast + immediate tug assistance. Report: 'I am in dead ship condition. No propulsion, no steering, no power. Position [lat/long]. Drifting [direction] at [X] knots.'","RAM","Vessel in difficulty"],correct:1,module:"L6 Engine Room + L3",expl:"Dead ship condition SMCP: 'MAYDAY MAYDAY MAYDAY. [All stations]. This is MV [name]. I am in DEAD SHIP condition. Main engine: stopped. Steering: not available. Electrical power: emergency generator only. No propulsion available. My position: Latitude [X], Longitude [X]. I am drifting [direction] at [X] knots towards [danger/open sea]. I require IMMEDIATE tug assistance and salvage support. Over.' Dead ship in a shipping lane = extreme danger to all vessels."},
    {q:"[L2+L3] Your anchor is dragging toward the rocks. You cannot re-anchor. What do you broadcast?",opts:["Anchor not holding","PAN-PAN or MAYDAY (if immediate danger). 'My anchor is dragging. I am unable to re-anchor. I am drifting toward [danger]. I require immediate tug/salvage assistance. Position [lat/long].'","Anchor problem","Help needed"],correct:1,module:"L2+L3 Combined",expl:"Dragging anchor toward danger SMCP: If immediate danger of loss of life → MAYDAY. If serious but not yet fatal → PAN-PAN. 'PAN-PAN/MAYDAY [×3]. [VTS/All stations]. This is MV [name]. My anchor is dragging. I cannot re-anchor. I am drifting toward [rocks/shoal/coast] at [X] knots. Estimated time to grounding: [X] minutes. Position: [lat/long]. I require immediate tug assistance. Assistance from any vessel in the vicinity is requested.' VTS will coordinate immediately."},
    {q:"[ALL MODULES] What does SMCP stand for and why is it important?",opts:["Special Maritime Communication Protocol","Standard Marine Communication Phrases — IMO-standardized English phrases ensuring all seafarers worldwide can communicate critical maritime information regardless of their native language","Sea Maritime Communication Procedure","Ship Master Communication Protocol"],correct:1,module:"All Modules",expl:"SMCP = Standard Marine Communication Phrases. Published by the IMO (International Maritime Organization) to standardize maritime English communications. Key benefits: 1. ANY mariner worldwide uses the same phrases 2. Reduces misunderstandings between vessels of different nationalities 3. Legally required in many STCW jurisdictions 4. Covers all critical maritime situations: navigation, cargo, emergency, medical, port operations 5. Languages: English primary, but structures are mirrored in other SMCP publications. Mastering SMCP = maritime safety + career advancement."},
  ],
  fr:[
    {q:"[L1] Vous prenez le quart de passerelle. Quelle est la phrase SMCP d'ouverture ?",opts:["Bonjour, je suis là","I am taking over the watch. Present course [X] degrees. Speed [X] knots. Position [lat/long]. Traffic: [describe]. Weather: [describe]. Any special orders: [describe].","Quart pris","Changement de quart"],correct:1,module:"L1 Quart passerelle",expl:"Relève de quart SMCP : 'I am taking over the watch. Present course [X] degrees true/magnetic. Speed [X] knots. Position: Latitude [X], Longitude [X], last fix at [heure] UTC by [GPS/radar]. Traffic in the area: [describe]. Weather: [describe]. Engine status: [ready/standby]. Any special orders from master: [describe].' L'officier relevé confirme : 'I confirm. You have the watch.'"},
    {q:"[L2] Le VTS dit 'Stand by on channel 12'. Que signifie cela ?",opts:["Passer sur CH 12 et cesser d'écouter","Rester sur CH 12 et maintenir une veille d'écoute continue — ne pas changer de canal","Aller sur CH 12 puis CH 16","Ignorer et utiliser CH 16"],correct:1,module:"L2 Port & VTS",expl:"'Stand by on channel [X]' = rester accordé sur le canal [X] et maintenir une veille d'écoute continue. Ne pas émettre sauf si nécessaire, et ne pas changer de canal sans instruction VTS. Votre réponse : 'Marseille VTS, MV [nom]. Bien reçu. En écoute sur canal 12. Terminé.' C'est l'instruction standard de canal de travail VTS après le contact initial sur CH 16."},
    {q:"[L3] Un navire coule. Quelle est la structure correcte du MAYDAY ?",opts:["MAYDAY + position + aide","MAYDAY×3, nom navire×3, MAYDAY + nom, position (Lat/Long), nature de la détresse, personnes à bord, assistance requise, Terminé","SOS + nom + position","Urgence + détresse + aide"],correct:1,module:"L3 Sécurité & Urgences",expl:"Structure MAYDAY (6 éléments obligatoires) : 1. MAYDAY MAYDAY MAYDAY 2. Ici [NOM] [NOM] [NOM] 3. MAYDAY [NOM] 4. Position : Latitude [X]°[X]'N, Longitude [X]°[X]'E 5. Nature de la détresse : [je coule / incendie / collision] 6. [X] personnes à bord. Je demande assistance immédiate. Terminé. Toujours activer le DSC sur CH 70 EN PREMIER si disponible. Puis MAYDAY vocal sur CH 16 à puissance maximale (25W)."},
    {q:"[L4] Comment signaler que votre navire change de cap pour éviter une collision ?",opts:["Je vire à droite","I am altering course to [starboard/port]. My new course will be [X] degrees [true/magnetic]. I am doing so to avoid collision with [vessel/danger description]. Over.","Changement de cap","Je prends un nouveau cap"],correct:1,module:"L4 Navigation",expl:"SMCP changement de cap anti-abordage : 'I am altering course to [starboard/port]. My new course will be [X] degrees true. I am doing so to avoid collision with [navire relèvement X degrés, distance X milles / objet non éclairé / limite du DST].' Selon COLREG Règle 8 : l'action doit être ample, rapide et positive. Après l'abattée : 'My new course is [X] degrees. CPA will now be [X] miles in [X] minutes.'"},
    {q:"[L5] Vous trouvez 5 colis manquants lors du déchargement. Quel est le rapport SMCP correct ?",opts:["5 manquants","I have found a shortage of 5 packages on discharge from hold [X]. Bill of lading quantity: [X]. Tally count: [X]. I am issuing a letter of protest.","Moins que prévu","Pénurie signalée"],correct:1,module:"L5 Cargaison",expl:"Pénurie de cargaison SMCP : 'I have found a shortage of [X] packages/tonnes on discharge from hold [X]. Bill of lading figure: [X]. Tally count: [X]. Difference: [X] short. I am issuing a letter of protest to the [stevedores/terminal/shipper]. A surveyor is required to verify the shortage before completion of discharge.' La lettre de protestation est un document juridique formel protégeant les droits du navire/armateur."},
    {q:"[L6] La salle des machines entend 'Dead slow ahead'. Quelle est la réponse confirmée ?",opts:["OK","Dead slow ahead — engine on dead slow ahead. RPM [X]. Over.","Moteur lent","Très petite vitesse"],correct:1,module:"L6 Salle des machines",expl:"Confirmation d'ordre moteur SMCP — boucle fermée obligatoire : Passerelle : 'Dead slow ahead please.' Salle des machines : 'Dead slow ahead — engine is on dead slow ahead. RPM [X]. Over.' Cela confirme : l'ordre a été entendu correctement, il est exécuté, et donne les RPM actuels. Ce protocole est obligatoire — sans confirmation, la passerelle ne peut pas savoir si l'ordre a été reçu et exécuté correctement."},
    {q:"[L7] Un membre d'équipage avec un AVC suspecté — que signalez-vous ?",opts:["Problème au cerveau","I have a patient with suspected stroke (CVA). Face: [describe drooping]. Arms: [describe weakness]. Speech: [slurred/absent]. Time of onset: [X] minutes ago. Patient is [conscious/confused]. I require immediate medical evacuation. PAN-PAN.","Blessure à la tête","Équipier inconscient"],correct:1,module:"L7 Médical",expl:"AVC SMCP (règle FAST) : 'PAN-PAN PAN-PAN PAN-PAN. [MRCC]. MV [nom]. I have a patient with suspected stroke (CVA). FAST assessment: Face — [affaissement facial côté gauche/droit]. Arms — [faiblesse bras gauche/droit]. Speech — [parole difficile/absente]. Time of onset: [X] minutes ago. Patient is [conscient / confus / se dégradant]. I require immediate medical evacuation. Ma position : [lat/long]. ETA port le plus proche : [X] heures. Terminé.' LE TEMPS EST CRITIQUE — noter l'heure exacte d'apparition."},
    {q:"[L1-L7 MIXTE] Un navire est complètement sans énergie, gouverne et propulsion. Comment appelle-t-on cela ?",opts:["NUC","État de navire mort — nécessite MAYDAY + assistance remorqueur immédiate. Rapport : 'I am in dead ship condition. No propulsion, no steering, no power. Position [lat/long]. Drifting [direction] at [X] knots.'","RAM","Navire en difficulté"],correct:1,module:"L6 + L3",expl:"État de navire mort SMCP : 'MAYDAY MAYDAY MAYDAY. [Toutes stations]. Ici MV [nom]. I am in DEAD SHIP condition. Main engine: stopped. Steering: not available. Electrical power: emergency generator only. No propulsion available. Ma position : Latitude [X], Longitude [X]. I am drifting [direction] at [X] knots towards [danger/mer ouverte]. I require IMMEDIATE tug assistance and salvage support. Over.' Navire mort dans un chenal maritime = danger extrême pour tous les navires."},
    {q:"[L2+L3] Votre ancre chasse vers les rochers. Vous ne pouvez pas remouiller. Que diffusez-vous ?",opts:["L'ancre ne tient pas","PAN-PAN ou MAYDAY (si danger immédiat). 'My anchor is dragging. I am unable to re-anchor. I am drifting toward [danger]. I require immediate tug/salvage assistance. Position [lat/long].'","Problème d'ancre","Besoin d'aide"],correct:1,module:"L2+L3 Combiné",expl:"Ancre chassant vers danger SMCP : Si danger de mort immédiat → MAYDAY. Si grave mais pas encore fatal → PAN-PAN. 'PAN-PAN/MAYDAY [×3]. [VTS/Toutes stations]. Ici MV [nom]. My anchor is dragging. I cannot re-anchor. I am drifting toward [rochers/haut-fond/côte] at [X] knots. Estimated time to grounding: [X] minutes. Position : [lat/long]. I require immediate tug assistance. Assistance from any vessel in the vicinity is requested.' Le VTS coordonnera immédiatement."},
    {q:"[TOUS MODULES] Que signifie SMCP et pourquoi est-ce important ?",opts:["Système Maritime de Communication et de Procédures","Standard Marine Communication Phrases — phrases d'anglais maritime standardisées par l'OMI permettant à tous les marins du monde de communiquer les informations maritimes critiques indépendamment de leur langue maternelle","Système Marin de Commandes et de Procédures","Protocoles de Communication du Marin Standardisés"],correct:1,module:"Tous modules",expl:"SMCP = Standard Marine Communication Phrases. Publié par l'OMI (Organisation Maritime Internationale) pour standardiser les communications en anglais maritime. Avantages clés : 1. TOUT marin dans le monde utilise les mêmes phrases 2. Réduit les malentendus entre navires de nationalités différentes 3. Légalement requis dans de nombreuses juridictions STCW 4. Couvre toutes les situations maritimes critiques 5. Maîtriser SMCP = sécurité maritime + avancement de carrière."},
  ],
  es:[
    {q:"[L1] Está tomando el relevo de guardia de puente. ¿Cuál es la frase SMCP de apertura?",opts:["Hola, estoy aquí","I am taking over the watch. Present course [X] degrees. Speed [X] knots. Position [lat/long]. Traffic: [describe]. Weather: [describe]. Any special orders: [describe].","Guardia tomada","Cambio de guardia"],correct:1,module:"L1 Guardia puente",expl:"Relevo de guardia SMCP: 'I am taking over the watch. Present course [X] degrees true/magnetic. Speed [X] knots. Position: Latitude [X], Longitude [X], last fix at [hora] UTC by [GPS/radar]. Traffic in the area: [describe]. Weather: [describe]. Engine status: [ready/standby]. Any special orders from master: [describe].' El oficial relevado confirma: 'I confirm. You have the watch.'"},
    {q:"[L2] El VTS dice 'Stand by on channel 12'. ¿Qué significa esto?",opts:["Cambiar al CH 12 y dejar de escuchar","Permanecer en el CH 12 y mantener una escucha continua — no cambiar de canal","Ir al CH 12 y luego al CH 16","Ignorar y usar el CH 16"],correct:1,module:"L2 Puerto y VTS",expl:"'Stand by on channel [X]' = permanecer sintonizado en el canal [X] y mantener una escucha continua. No transmitir a menos que sea necesario, y no cambiar de canal sin instrucción VTS. Su respuesta: 'Marseille VTS, MV [nombre]. Entendido. En escucha en el canal 12. Cambio.'"},
    {q:"[L3] Un buque se está hundiendo. ¿Cuál es la estructura correcta del MAYDAY?",opts:["MAYDAY + posición + ayuda","MAYDAY×3, nombre buque×3, MAYDAY + nombre, posición (Lat/Long), naturaleza de la emergencia, personas a bordo, asistencia requerida, Cambio","SOS + nombre + posición","Emergencia + socorro + ayuda"],correct:1,module:"L3 Seguridad y Urgencias",expl:"Estructura MAYDAY (6 elementos obligatorios): 1. MAYDAY MAYDAY MAYDAY 2. This is [NOMBRE] [NOMBRE] [NOMBRE] 3. MAYDAY [NOMBRE] 4. Posición: Latitud [X]°[X]'N, Longitud [X]°[X]'E 5. Naturaleza de la emergencia: [me estoy hundiendo / incendio / colisión] 6. [X] personas a bordo. Solicito asistencia inmediata. Cambio. Siempre activar el LSD en CH 70 PRIMERO si disponible. Luego MAYDAY vocal en CH 16 a máxima potencia (25W)."},
    {q:"[L4] ¿Cómo se informa de que el buque cambia de rumbo para evitar una colisión?",opts:["Virando a la derecha","I am altering course to [starboard/port]. My new course will be [X] degrees [true/magnetic]. I am doing so to avoid collision with [vessel/danger description]. Over.","Cambio de rumbo","Tomando nuevo rumbo"],correct:1,module:"L4 Navegación",expl:"SMCP cambio de rumbo para prevención de abordaje: 'I am altering course to [starboard/port]. My new course will be [X] degrees true. I am doing so to avoid collision with [buque rumbo X grados, distancia X millas / objeto no iluminado / límite del SDT].' Según COLREG Regla 8: la acción debe ser amplia, oportuna y positiva."},
    {q:"[L5] Encuentra 5 bultos faltantes en la descarga. ¿Cuál es el informe SMCP correcto?",opts:["Faltan 5","I have found a shortage of 5 packages on discharge from hold [X]. Bill of lading quantity: [X]. Tally count: [X]. I am issuing a letter of protest.","Menos de lo esperado","Falta informada"],correct:1,module:"L5 Carga",expl:"Falta de carga SMCP: 'I have found a shortage of [X] packages/tonnes on discharge from hold [X]. Bill of lading figure: [X]. Tally count: [X]. Difference: [X] short. I am issuing a letter of protest to the [stevedores/terminal/shipper]. A surveyor is required to verify the shortage before completion of discharge.' La carta de protesta es un documento jurídico formal que protege los derechos del buque/armador."},
    {q:"[L6] La sala de máquinas escucha 'Dead slow ahead'. ¿Cuál es la respuesta confirmada?",opts:["OK","Dead slow ahead — engine on dead slow ahead. RPM [X]. Over.","Motor lento","Muy despacio"],correct:1,module:"L6 Sala de Máquinas",expl:"Confirmación de orden de motor SMCP — bucle cerrado obligatorio: Puente: 'Dead slow ahead please.' Sala de máquinas: 'Dead slow ahead — engine is on dead slow ahead. RPM [X]. Over.' Esto confirma: la orden fue escuchada correctamente, se está ejecutando y da las RPM actuales. Este protocolo es obligatorio."},
    {q:"[L7] Tripulante con ACV sospechado — ¿qué informa?",opts:["Problema cerebral","I have a patient with suspected stroke (CVA). Face: [describe drooping]. Arms: [describe weakness]. Speech: [slurred/absent]. Time of onset: [X] minutes ago. Patient is [conscious/confused]. I require immediate medical evacuation. PAN-PAN.","Lesión en la cabeza","Tripulante inconsciente"],correct:1,module:"L7 Médico",expl:"ACV SMCP (regla FAST): 'PAN-PAN PAN-PAN PAN-PAN. [MRCC]. MV [nombre]. I have a patient with suspected stroke (CVA). FAST assessment: Face — [caída facial lado izquierdo/derecho]. Arms — [debilidad brazo izquierdo/derecho]. Speech — [dificultad/ausencia de habla]. Time of onset: [X] minutes ago. Patient is [consciente / confuso / deteriorándose]. I require immediate medical evacuation. Mi posición: [lat/long]. ETA puerto más cercano: [X] horas. Cambio.' EL TIEMPO ES CRÍTICO — anotar la hora exacta de inicio."},
    {q:"[L1-L7 MIXTO] Un buque está completamente sin energía, timón y propulsión. ¿Cómo se llama esto?",opts:["Sin gobierno","Estado de barco muerto — requiere MAYDAY + asistencia de remolcador inmediata. Informe: 'I am in dead ship condition. No propulsion, no steering, no power. Position [lat/long]. Drifting [direction] at [X] knots.'","Maniobrabilidad restringida","Buque con dificultades"],correct:1,module:"L6 + L3",expl:"Estado de barco muerto SMCP: 'MAYDAY MAYDAY MAYDAY. [Todas las estaciones]. Aquí MV [nombre]. I am in DEAD SHIP condition. Main engine: stopped. Steering: not available. Electrical power: emergency generator only. No propulsion available. Mi posición: Latitud [X], Longitud [X]. I am drifting [direction] at [X] knots towards [peligro/mar abierto]. I require IMMEDIATE tug assistance and salvage support. Over.'"},
    {q:"[L2+L3] El ancla está garrando hacia las rocas. No puede volver a fondear. ¿Qué difunde?",opts:["El ancla no aguanta","PAN-PAN o MAYDAY (si peligro inmediato). 'My anchor is dragging. I am unable to re-anchor. I am drifting toward [danger]. I require immediate tug/salvage assistance. Position [lat/long].'","Problema con el ancla","Necesito ayuda"],correct:1,module:"L2+L3 Combinado",expl:"Ancla garrando hacia peligro SMCP: Si peligro de muerte inmediato → MAYDAY. Si grave pero no aún fatal → PAN-PAN. 'PAN-PAN/MAYDAY [×3]. [VTS/Todas las estaciones]. Aquí MV [nombre]. My anchor is dragging. I cannot re-anchor. I am drifting toward [rocas/bajo/costa] at [X] knots. Estimated time to grounding: [X] minutes. Posición: [lat/long]. I require immediate tug assistance.'"},
    {q:"[TODOS LOS MÓDULOS] ¿Qué significa SMCP y por qué es importante?",opts:["Sistema Marítimo de Comunicación y Procedimientos","Standard Marine Communication Phrases — frases estandarizadas de inglés marítimo de la OMI que permiten a todos los marineros del mundo comunicar información marítima crítica independientemente de su lengua materna","Sistema Marino de Comandos y Procedimientos","Protocolos de Comunicación del Marinero Estandarizados"],correct:1,module:"Todos los módulos",expl:"SMCP = Standard Marine Communication Phrases. Publicado por la OMI (Organización Marítima Internacional) para estandarizar las comunicaciones en inglés marítimo. Ventajas clave: 1. CUALQUIER marino en el mundo usa las mismas frases 2. Reduce malentendidos entre buques de diferentes nacionalidades 3. Legalmente requerido en muchas jurisdicciones STCW 4. Cubre todas las situaciones marítimas críticas 5. Dominar SMCP = seguridad marítima + avance profesional."},
  ],
  pt:[
    {q:"[L1] Está a tomar o quarto de ponte. Qual é a frase SMCP de abertura?",opts:["Olá, estou aqui","I am taking over the watch. Present course [X] degrees. Speed [X] knots. Position [lat/long]. Traffic: [describe]. Weather: [describe]. Any special orders: [describe].","Quarto tomado","Mudança de quarto"],correct:1,module:"L1 Quarto de ponte",expl:"Entrega de quarto SMCP: 'I am taking over the watch. Present course [X] degrees true/magnetic. Speed [X] knots. Position: Latitude [X], Longitude [X], last fix at [hora] UTC by [GPS/radar]. Traffic in the area: [describe]. Weather: [describe]. Engine status: [ready/standby]. Any special orders from master: [describe].' O oficial relevado confirma: 'I confirm. You have the watch.'"},
    {q:"[L2] O VTS diz 'Stand by on channel 12'. O que significa isso?",opts:["Mudar para CH 12 e deixar de escutar","Permanecer no CH 12 e manter uma escuta contínua — não mudar de canal","Ir para CH 12 e depois CH 16","Ignorar e usar CH 16"],correct:1,module:"L2 Porto e VTS",expl:"'Stand by on channel [X]' = permanecer sintonizado no canal [X] e manter uma escuta contínua. Não transmitir a menos que necessário, e não mudar de canal sem instrução VTS. A sua resposta: 'Marseille VTS, MV [nome]. Compreendido. Em escuta no canal 12. Mudança.'"},
    {q:"[L3] Um navio está a afundar. Qual é a estrutura correta do MAYDAY?",opts:["MAYDAY + posição + ajuda","MAYDAY×3, nome navio×3, MAYDAY + nome, posição (Lat/Long), natureza do perigo, pessoas a bordo, assistência requerida, Mudança","SOS + nome + posição","Emergência + perigo + ajuda"],correct:1,module:"L3 Segurança e Urgências",expl:"Estrutura MAYDAY (6 elementos obrigatórios): 1. MAYDAY MAYDAY MAYDAY 2. Aqui [NOME] [NOME] [NOME] 3. MAYDAY [NOME] 4. Posição: Latitude [X]°[X]'N, Longitude [X]°[X]'E 5. Natureza do perigo: [estou a afundar / incêndio / abalroamento] 6. [X] pessoas a bordo. Solicito assistência imediata. Mudança. Sempre ativar o ASN no CH 70 PRIMEIRO se disponível. Depois MAYDAY vocal no CH 16 à potência máxima (25W)."},
    {q:"[L4] Como se reporta que o navio altera o rumo para evitar abalroamento?",opts:["A virar à direita","I am altering course to [starboard/port]. My new course will be [X] degrees [true/magnetic]. I am doing so to avoid collision with [vessel/danger description]. Over.","Mudança de rumo","A tomar novo rumo"],correct:1,module:"L4 Navegação",expl:"SMCP alteração de rumo para prevenção de abalroamento: 'I am altering course to [starboard/port]. My new course will be [X] degrees true. I am doing so to avoid collision with [navio marcação X graus, distância X milhas / objeto não iluminado / limite do SST].' Segundo COLREG Regra 8: a ação deve ser ampla, atempada e positiva."},
    {q:"[L5] Encontra 5 volumes em falta na descarga. Qual é o relatório SMCP correto?",opts:["Faltam 5","I have found a shortage of 5 packages on discharge from hold [X]. Bill of lading quantity: [X]. Tally count: [X]. I am issuing a letter of protest.","Menos do esperado","Falta reportada"],correct:1,module:"L5 Carga",expl:"Falta de carga SMCP: 'I have found a shortage of [X] packages/tonnes on discharge from hold [X]. Bill of lading figure: [X]. Tally count: [X]. Difference: [X] short. I am issuing a letter of protest to the [estivadores/terminal/carregador]. A surveyor is required to verify the shortage before completion of discharge.' A carta de protesto é um documento jurídico formal que protege os direitos do navio/armador."},
    {q:"[L6] A sala de máquinas ouve 'Dead slow ahead'. Qual é a resposta confirmada?",opts:["OK","Dead slow ahead — engine on dead slow ahead. RPM [X]. Over.","Motor lento","Muito devagar"],correct:1,module:"L6 Sala de Máquinas",expl:"Confirmação de ordem de motor SMCP — circuito fechado obrigatório: Ponte: 'Dead slow ahead please.' Sala de máquinas: 'Dead slow ahead — engine is on dead slow ahead. RPM [X]. Over.' Isto confirma: a ordem foi ouvida corretamente, está a ser executada e dá as RPM atuais. Este protocolo é obrigatório."},
    {q:"[L7] Tripulante com AVC suspeito — o que reporta?",opts:["Problema no cérebro","I have a patient with suspected stroke (CVA). Face: [describe drooping]. Arms: [describe weakness]. Speech: [slurred/absent]. Time of onset: [X] minutes ago. Patient is [conscious/confused]. I require immediate medical evacuation. PAN-PAN.","Lesão na cabeça","Tripulante inconsciente"],correct:1,module:"L7 Médico",expl:"AVC SMCP (regra FAST): 'PAN-PAN PAN-PAN PAN-PAN. [MRCC]. MV [nome]. I have a patient with suspected stroke (CVA). FAST assessment: Face — [queda facial lado esquerdo/direito]. Arms — [fraqueza braço esquerdo/direito]. Speech — [dificuldade/ausência de fala]. Time of onset: [X] minutes ago. Patient is [consciente / confuso / a deteriorar]. I require immediate medical evacuation. A minha posição: [lat/long]. ETA porto mais próximo: [X] horas. Mudança.' O TEMPO É CRÍTICO — anotar a hora exata de início."},
    {q:"[L1-L7 MISTO] Um navio está completamente sem energia, leme e propulsão. Como se chama isso?",opts:["Sem governo","Estado de navio morto — requer MAYDAY + assistência de rebocador imediata. Relatório: 'I am in dead ship condition. No propulsion, no steering, no power. Position [lat/long]. Drifting [direction] at [X] knots.'","Manobabilidade restrita","Navio em dificuldade"],correct:1,module:"L6 + L3",expl:"Estado de navio morto SMCP: 'MAYDAY MAYDAY MAYDAY. [Todas as estações]. Aqui MV [nome]. I am in DEAD SHIP condition. Main engine: stopped. Steering: not available. Electrical power: emergency generator only. No propulsion available. A minha posição: Latitude [X], Longitude [X]. I am drifting [direction] at [X] knots towards [perigo/mar aberto]. I require IMMEDIATE tug assistance and salvage support. Over.'"},
    {q:"[L2+L3] A âncora está a garrear em direção às rochas. Não consegue re-fundear. O que difunde?",opts:["A âncora não aguenta","PAN-PAN ou MAYDAY (se perigo imediato). 'My anchor is dragging. I am unable to re-anchor. I am drifting toward [danger]. I require immediate tug/salvage assistance. Position [lat/long].'","Problema com a âncora","Preciso de ajuda"],correct:1,module:"L2+L3 Combinado",expl:"Âncora a garrear em direção ao perigo SMCP: Se perigo de morte imediato → MAYDAY. Se grave mas ainda não fatal → PAN-PAN. 'PAN-PAN/MAYDAY [×3]. [VTS/Todas as estações]. Aqui MV [nome]. My anchor is dragging. I cannot re-anchor. I am drifting toward [rochas/baixio/costa] at [X] knots. Estimated time to grounding: [X] minutes. Posição: [lat/long]. I require immediate tug assistance.'"},
    {q:"[TODOS OS MÓDULOS] O que significa SMCP e por que é importante?",opts:["Sistema Marítimo de Comunicação e Procedimentos","Standard Marine Communication Phrases — frases de inglês marítimo padronizadas pela OMI que permitem a todos os marinheiros do mundo comunicar informações marítimas críticas independentemente da sua língua materna","Sistema Marinho de Comandos e Procedimentos","Protocolos de Comunicação do Marinheiro Padronizados"],correct:1,module:"Todos os módulos",expl:"SMCP = Standard Marine Communication Phrases. Publicado pela OMI (Organização Marítima Internacional) para padronizar as comunicações em inglês marítimo. Vantagens chave: 1. QUALQUER marinheiro no mundo usa as mesmas frases 2. Reduz mal-entendidos entre navios de diferentes nacionalidades 3. Legalmente exigido em muitas jurisdições STCW 4. Cobre todas as situações marítimas críticas 5. Dominar SMCP = segurança marítima + progressão na carreira."},
  ],
};

function Stars(){const s=Array.from({length:12},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.4}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}@keyframes goldPulse{0%,100%{box-shadow:0 0 0 0 rgba(201,146,42,0)}50%{box-shadow:0 0 30px 10px rgba(201,146,42,0.3)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.exam}33,${C.gold2}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function FinalExamComp({questions,t,lang,onComplete}){
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct,module:q.module}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){
    const fs=score+(isOk?0:0); // already counted
    const pct=Math.round(answers.filter(a=>a.ok).length/questions.length*100);
    const badge=pct===100?"🏆 MASTER":pct>=80?"🥇 EXPERT":pct>=60?"🥈 ADVANCED":"🥉 LEARNER";
    const xp=pct===100?600:pct>=80?400:pct>=60?250:100;
    return(<Card style={{textAlign:"center",animation:"goldPulse 2s ease-in-out infinite"}}>
      <div style={{fontSize:64,marginBottom:10}}>{pct===100?"🏆":pct>=80?"🥇":pct>=60?"🥈":"🥉"}</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:11,color:C.exam,letterSpacing:3,marginBottom:6}}>{lang==="fr"?"EXAMEN FINAL SMCP":lang==="en"?"SMCP FINAL EXAM":lang==="es"?"EXAMEN FINAL SMCP":"EXAME FINAL SMCP"}</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:32,fontWeight:900,color:C.white,marginBottom:4}}>{answers.filter(a=>a.ok).length}/{questions.length}</div>
      <div style={{fontSize:16,color:C.exam,marginBottom:8}}>{pct}%</div>
      <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:`${C.exam}20`,border:`2px solid ${C.exam}88`,fontSize:15,color:C.exam,fontWeight:900,marginBottom:16}}>{badge}</div>
      <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700,display:"block",marginBottom:16}}>+{xp} XP ⭐</div>
      <GLine/>
      <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:6,marginTop:10}}>
        {answers.map((a,i)=><div key={i} style={{width:34,height:34,borderRadius:8,background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:C.white,fontWeight:700}}>{a.ok?"✓":"✗"}</div>)}
      </div>
    </Card>);
  }
  return(<Card style={{border:`2px solid ${C.exam}44`,background:"rgba(10,22,40,0.95)"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
      <div style={{fontSize:9,letterSpacing:3,color:C.exam,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div>
      <div style={{fontSize:11,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div>
    </div>
    <div style={{padding:"3px 8px",borderRadius:10,background:`${C.exam}15`,border:`1px solid ${C.exam}33`,fontSize:9,color:C.exam,fontWeight:700,marginBottom:10,display:"inline-block"}}>{q.module}</div>
    <div style={{display:"flex",gap:4,marginBottom:14}}>
      {questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.exam:"rgba(255,255,255,0.1)"}}/>)}
    </div>
    <div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div>
    <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>
      {q.opts.map((opt,i)=>{
        let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";
        if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}
        return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4,fontFamily:"'Courier New',monospace"}}>
          <div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white,fontFamily:"'Nunito',sans-serif"}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div>
          <span>{opt}</span>
        </button>;
      })}
    </div>
    {answered&&<><div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}>
      <div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div>
      <div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div>
      <div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div>
    </div>
    <button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.exam},${C.gold},${C.exam})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer",boxShadow:`0 4px 20px ${C.exam}44`}}>{cur<questions.length-1?t.next:t.finish}</button></>}
  </Card>);
}

const getContent = lang => {
  const d={
    en:{
      badge:"🎓 Maritime English SMCP · Lesson 8/8 · ⭐ Premium · 600 XP",
      title:"Exam Prep & Final Review",
      intro:"You have completed all 7 SMCP lessons. This final lesson brings everything together: a complete module recap, a master glossary, a rapid-fire review, and the 10-question Final Exam covering all 7 modules. Score 80%+ to earn the SMCP Expert badge.",
      p1:"PART 1 — MODULE RECAP (L1–L7)",s1t:"Key phrases from all 7 lessons",
      p2:"PART 2 — MASTER GLOSSARY",s1t:"All essential SMCP terms",
      p3:"PART 3 — RAPID FIRE REVIEW",s1t:"10 quick-fire questions",
      p4:"PART 4 — MIXED EXERCISES",s1t:"L3 MAYDAY · L2 VTS · L6 Engine Room",
      sumT:"SMCP MODULE COMPLETE — KEY TAKEAWAYS",
      sumP:["MAYDAY × 3 = immediate danger of death · PAN-PAN = urgent · SÉCURITÉ = safety info","VTS: CH 16 → [station]×2 + [vessel]×2 + OVER → switch to working channel","Vital signs: pulse [X] bpm · BP [X] over [X] · temp [X] degrees Celsius","ER always responds: 'Bridge, engine room. [Order] — RPM [X]. Over.'","Cargo start: 'Cargo operations have commenced. Loading [cargo] at hold [X].'","FAST stroke: Face · Arms · Speech · Time → immediate evacuation","Dead ship = no propulsion + no steering + no power → MAYDAY + tug","SEELONCE FEENEE = distress silence ended by MRCC"],
    },
    fr:{
      badge:"🎓 Anglais Maritime SMCP · Leçon 8/8 · ⭐ Premium · 600 XP",
      title:"Révision & Examen Final",
      intro:"Vous avez terminé les 7 leçons SMCP. Cette leçon finale rassemble tout : récapitulatif complet du module, glossaire principal, révision rapide et l'Examen Final de 10 questions couvrant les 7 modules. Score 80%+ pour décrocher le badge SMCP Expert.",
      p1:"PARTIE 1 — RÉCAPITULATIF MODULE (L1–L7)",s1t:"Phrases clés des 7 leçons",
      p2:"PARTIE 2 — GLOSSAIRE PRINCIPAL",s1t:"Tous les termes SMCP essentiels",
      p3:"PARTIE 3 — RÉVISION RAPIDE",s1t:"10 questions flash",
      p4:"PARTIE 4 — EXERCICES MIXTES",s1t:"L3 MAYDAY · L2 VTS · L6 Machine",
      sumT:"MODULE SMCP TERMINÉ — POINTS CLÉS",
      sumP:["MAYDAY × 3 = danger immédiat de mort · PAN-PAN = urgent · SÉCURITÉ = info sécurité","VTS : CH 16 → [station]×2 + [navire]×2 + Terminé → basculer sur canal de travail","Signes vitaux : pouls [X] bpm · TA [X] sur [X] · temp [X] degrés Celsius","S.D.M. répond toujours : 'Bridge, engine room. [Ordre] — RPM [X]. Over.'","Début cargaison : 'Cargo operations have commenced. Loading [cargo] at hold [X].'","FAST AVC : Face · Bras · Parole · Temps → évacuation immédiate","Navire mort = pas propulsion + pas gouverne + pas énergie → MAYDAY + remorqueur","SEELONCE FEENEE = fin du silence de détresse par le MRCC"],
    },
    es:{
      badge:"🎓 Inglés Marítimo SMCP · Lección 8/8 · ⭐ Premium · 600 XP",
      title:"Revisión y Examen Final",
      intro:"Ha completado las 7 lecciones SMCP. Esta lección final lo reúne todo: un resumen completo del módulo, un glosario maestro, una revisión rápida y el Examen Final de 10 preguntas que cubre los 7 módulos. Puntuación 80%+ para obtener la insignia SMCP Expert.",
      p1:"PARTE 1 — RESUMEN MÓDULO (L1–L7)",s1t:"Frases clave de las 7 lecciones",
      p2:"PARTE 2 — GLOSARIO MAESTRO",s1t:"Todos los términos SMCP esenciales",
      p3:"PARTE 3 — REVISIÓN RÁPIDA",s1t:"10 preguntas rápidas",
      p4:"PARTE 4 — EJERCICIOS MIXTOS",s1t:"L3 MAYDAY · L2 VTS · L6 Máquinas",
      sumT:"MÓDULO SMCP COMPLETADO — PUNTOS CLAVE",
      sumP:["MAYDAY × 3 = peligro inmediato de muerte · PAN-PAN = urgente · SÉCURITÉ = info seguridad","VTS: CH 16 → [estación]×2 + [buque]×2 + Cambio → cambiar al canal de trabajo","Signos vitales: pulso [X] lpm · TA [X] sobre [X] · temp [X] grados Celsius","S.M. responde siempre: 'Bridge, engine room. [Orden] — RPM [X]. Over.'","Inicio carga: 'Cargo operations have commenced. Loading [cargo] at hold [X].'","FAST ACV: Cara · Brazos · Habla · Tiempo → evacuación inmediata","Barco muerto = sin propulsión + sin timón + sin energía → MAYDAY + remolcador","SEELONCE FEENEE = fin del silencio de socorro por el MRCC"],
    },
    pt:{
      badge:"🎓 Inglês Marítimo SMCP · Lição 8/8 · ⭐ Premium · 600 XP",
      title:"Revisão e Exame Final",
      intro:"Completou as 7 lições SMCP. Esta lição final reúne tudo: um resumo completo do módulo, um glossário mestre, uma revisão rápida e o Exame Final de 10 questões cobrindo os 7 módulos. Pontuação 80%+ para obter o distintivo SMCP Expert.",
      p1:"PARTE 1 — RESUMO MÓDULO (L1–L7)",s1t:"Frases chave das 7 lições",
      p2:"PARTE 2 — GLOSSÁRIO MESTRE",s1t:"Todos os termos SMCP essenciais",
      p3:"PARTE 3 — REVISÃO RÁPIDA",s1t:"10 perguntas rápidas",
      p4:"PARTE 4 — EXERCÍCIOS MISTOS",s1t:"L3 MAYDAY · L2 VTS · L6 Máquinas",
      sumT:"MÓDULO SMCP CONCLUÍDO — PONTOS-CHAVE",
      sumP:["MAYDAY × 3 = perigo imediato de morte · PAN-PAN = urgente · SÉCURITÉ = informação segurança","VTS: CH 16 → [estação]×2 + [navio]×2 + Mudança → mudar para canal de trabalho","Sinais vitais: pulso [X] bpm · TA [X] sobre [X] · temp [X] graus Celsius","S.M. responde sempre: 'Bridge, engine room. [Ordem] — RPM [X]. Over.'","Início carga: 'Cargo operations have commenced. Loading [cargo] at hold [X].'","FAST AVC: Face · Braços · Fala · Tempo → evacuação imediata","Navio morto = sem propulsão + sem leme + sem energia → MAYDAY + rebocador","SEELONCE FEENEE = fim do silêncio de perigo pelo MRCC"],
    },
  };
  return d[lang]||d.en;
};

export default function LessonSMCP_L8({ lang="en", onBack=()=>{}, onComplete=()=>{} }) {
  const t=T[lang]||T.en;const exam=FINAL_EXAM[lang]||FINAL_EXAM.en;const lc=getContent(lang);
  const [phase,setPhase]=useState("content");const [examScore,setExamScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="exam"?60:100;
  const pct=examScore>0?Math.round(examScore/exam.length*100):0;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#080600 0%,${C.navy2} 45%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.exam}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.exam,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🎓 {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 8/8 — FINALE":lang==="en"?"Lesson 8/8 — FINAL":lang==="es"?"Lección 8/8 — FINAL":"Lição 8/8 — FINAL"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.25)",border:`1px solid ${C.gold}55`,color:C.gold,fontWeight:700}}>⭐ 600 XP</div>
            <div style={{fontSize:11,color:C.exam,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:4,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.l1},${C.l3},${C.l7},${C.exam},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:`${C.exam}15`,border:`1px solid ${C.exam}44`,fontSize:11,color:C.exam,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.exam}`,background:"linear-gradient(135deg,rgba(245,158,11,0.08),rgba(10,22,40,0.9))"}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>
            <SL icon="📚" text={lc.p1} color={C.exam}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.exam}22`}}>
              <div style={{fontSize:11,color:C.exam,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📚 {lang==="fr"?"RÉCAPITULATIF L1–L7":lang==="en"?"MODULE RECAP L1–L7":"RESUMEN L1–L7"}</div>
              <ModuleRecapSVG lang={lang}/>
            </Card>
            <SL icon="📖" text={lc.p2} color:C.gold2/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}22`}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📖 {lang==="fr"?"GLOSSAIRE SMCP":lang==="en"?"SMCP GLOSSARY":"GLOSARIO SMCP"}</div>
              <GlossarySVG lang={lang}/>
            </Card>
            <SL icon="⚡" text={lc.p3} color={C.l4}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.l4}22`}}>
              <div style={{fontSize:11,color:C.l4,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>⚡ {lang==="fr"?"RÉVISION RAPIDE":lang==="en"?"RAPID FIRE REVIEW":"REVISIÓN RÁPIDA"}</div>
              <RapidFireSVG lang={lang}/>
            </Card>
            <SL icon="📝" text={lc.p4} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>
            <Card style={{marginBottom:14,background:`${C.exam}08`,border:`2px solid ${C.exam}33`}}>
              <div style={{fontSize:11,color:C.exam,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:11,color:C.white}}><span style={{color:C.exam,fontWeight:700,fontFamily:"'Courier New',monospace"}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={()=>setPhase("exam")} style={{width:"100%",padding:"18px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.l1},${C.l3},${C.l7},${C.exam},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:16,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer",boxShadow:`0 12px 40px ${C.exam}44`,marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="exam"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.exam,marginBottom:4}}>🎓 {lang==="fr"?"EXAMEN FINAL SMCP":lang==="en"?"SMCP FINAL EXAM":lang==="es"?"EXAMEN FINAL SMCP":"EXAME FINAL SMCP"}</div>
              <div style={{fontSize:12,color:C.muted}}>10 {lang==="fr"?"questions — modules L1 à L7":lang==="en"?"questions — modules L1 to L7":"preguntas — módulos L1 a L7"}</div>
            </div>
            <FinalExamComp questions={exam} t={t} lang={lang} onComplete={s=>{setExamScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}
          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:72,marginBottom:10}}>{pct===100?"🏆":pct>=80?"🥇":pct>=60?"🥈":"🥉"}</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:24,fontWeight:700,color:C.exam,marginBottom:4}}>{t.complete}</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:36,fontWeight:900,color:C.white,marginBottom:4}}>{examScore}/{exam.length}</div>
              <div style={{fontSize:18,color:C.gold2,marginBottom:12}}>{pct}%</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:`${C.exam}20`,border:`2px solid ${C.exam}`,fontSize:16,color:C.exam,fontWeight:900}}>
                {pct===100?"🏆 MASTER":pct>=80?"🥇 EXPERT":pct>=60?"🥈 ADVANCED":"🥉 LEARNER"}
              </div>
            </div>
            <Card style={{marginBottom:16,background:"linear-gradient(135deg,rgba(245,158,11,0.1),rgba(10,22,40,0.95))",border:`2px solid ${C.exam}44`}}>
              <div style={{fontSize:12,color:C.exam,fontFamily:"'Cinzel',serif",letterSpacing:2,marginBottom:12,textAlign:"center"}}>
                🎓 {lang==="fr"?"MARITIME ENGLISH SMCP — MODULE TERMINÉ":lang==="en"?"MARITIME ENGLISH SMCP — MODULE COMPLETE":lang==="es"?"INGLÉS MARÍTIMO SMCP — MÓDULO COMPLETADO":"INGLÊS MARÍTIMO SMCP — MÓDULO CONCLUÍDO"}
              </div>
              {["L1 Bridge Watch","L2 Port & VTS","L3 Safety & Emergency","L4 Navigation","L5 Cargo","L6 Engine Room","L7 Medical","L8 Exam Prep"].map((l,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"5px 0",borderBottom:i<7?"1px solid rgba(255,255,255,0.05)":"none"}}>
                  <div style={{fontSize:14}}>{"🗺️🚢🆘🧭📦⚙️🏥🎓"[i]}</div>
                  <div style={{fontSize:12,color:C.white,flex:1}}>{l}</div>
                  <div style={{color:C.green,fontWeight:700,fontSize:14}}>✓</div>
                </div>
              ))}
            </Card>
            <button onClick={onComplete} style={{width:"100%",padding:"18px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.exam},${C.gold2},${C.exam})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer",boxShadow:`0 10px 40px ${C.exam}44`,marginBottom:12,animation:"goldPulse 2s ease-in-out infinite"}}>
              🏆 {lang==="fr"?"RETOUR AU DASHBOARD":lang==="en"?"BACK TO DASHBOARD":lang==="es"?"VOLVER AL PANEL":"VOLTAR AO PAINEL"} 🏆
            </button>
          </div>}
        </div>
      </div>
    </div>
  );
}
