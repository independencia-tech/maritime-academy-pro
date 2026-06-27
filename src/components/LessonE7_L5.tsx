import { useState, useEffect, useRef } from "react";

const C = {
  bg0:"#03070f", bg1:"#060e1a", bg2:"#0a1628", bg3:"#0d1f3c",
  amber:"#ffb300", amber2:"#ffd54f", amber3:"#fff8e1",
  cyan:"#00e5ff", cyan2:"#80deea", cyan3:"#e0f7fa",
  steel:"#455a64", steel2:"#78909c", steel3:"#b0bec5",
  green:"#00e676", green2:"#69f0ae",
  red:"#ff1744", red2:"#ff5252",
  orange:"#ff6d00", orange2:"#ff9e40",
  blue:"#2979ff", blue2:"#82b1ff",
  purple:"#d500f9", purple2:"#ea80fc",
  white:"#f0f4ff", muted:"rgba(176,190,197,0.7)", dim:"rgba(176,190,197,0.35)",
  border:"rgba(0,229,255,0.18)", borderAmber:"rgba(255,179,0,0.22)",
  gold:"#c9922a", gold2:"#e8b94f",
};

const T = {
  fr:{ back:"◀ Retour", module:"Module e7 — UMS & Automatisation",
    question:"Question", ofQ:"sur", correct:"✓ Bonne reponse!", wrong:"✗ Mauvaise reponse",
    expl:"Explication:", next:"SUIVANT =>", finish:"VOIR MON SCORE =>",
    startQuiz:"COMMENCER LE QUIZ", backDash:"<= RETOUR AU DASHBOARD",
    youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz",
    showCorr:"Voir la correction", hideCorr:"Masquer", xp:"XP gagnes" },
  en:{ back:"◀ Back", module:"Module e7 — UMS & Automation",
    question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer",
    expl:"Explanation:", next:"NEXT =>", finish:"SEE MY SCORE =>",
    startQuiz:"START QUIZ", backDash:"<= BACK TO DASHBOARD",
    youLearned:"You learned:", readFirst:"Read the content then start the quiz",
    showCorr:"Show correction", hideCorr:"Hide", xp:"XP earned" },
  es:{ back:"◀ Volver", module:"Modulo e7 — UMS & Automatizacion",
    question:"Pregunta", ofQ:"de", correct:"✓ Correcta!", wrong:"✗ Incorrecta",
    expl:"Explicacion:", next:"SIGUIENTE =>", finish:"VER PUNTUACION =>",
    startQuiz:"EMPEZAR QUIZ", backDash:"<= VOLVER AL PANEL",
    youLearned:"Has aprendido:", readFirst:"Lee y luego comienza",
    showCorr:"Ver correccion", hideCorr:"Ocultar", xp:"XP ganados" },
  pt:{ back:"◀ Voltar", module:"Modulo e7 — UMS & Automatizacao",
    question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada",
    expl:"Explicacao:", next:"PROXIMO =>", finish:"VER PONTUACAO =>",
    startQuiz:"COMECAR QUIZ", backDash:"<= VOLTAR AO PAINEL",
    youLearned:"Voce aprendeu:", readFirst:"Leia o conteudo e depois comece",
    showCorr:"Ver correcao", hideCorr:"Ocultar", xp:"XP ganhos" },
};

function Stars() {
  return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}}
      viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">
      {[{cx:40,cy:70,r:0.8},{cx:300,cy:40,r:1.1},{cx:170,cy:110,r:0.7},
        {cx:340,cy:190,r:0.9},{cx:55,cy:310,r:0.7},{cx:270,cy:370,r:1.0},
        {cx:120,cy:490,r:0.8},{cx:310,cy:590,r:0.7},{cx:65,cy:670,r:1.2}].map((s,i)=>(
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={C.cyan2} opacity={0.22+Math.sin(i)*0.12}/>
      ))}
    </svg>
  );
}

function SL({ icon, text, color }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",marginBottom:6}}>
      <div style={{width:38,height:38,borderRadius:13,background:`${color}15`,
        border:`1.5px solid ${color}55`,display:"flex",alignItems:"center",
        justifyContent:"center",fontSize:19,flexShrink:0,
        boxShadow:`0 0 12px ${color}20`}}>{icon}</div>
      <div style={{fontSize:11,fontWeight:800,color,letterSpacing:2,
        fontFamily:"'Cinzel',serif",textTransform:"uppercase"}}>{text}</div>
    </div>
  );
}

function getTrophy(score, total) {
  const pct = score / total;
  if (pct===1)  return {icon:"🏆",color:"#f1c40f",label:{fr:"Parfait !",en:"Perfect!",es:"Perfecto!",pt:"Perfeito!"}};
  if (pct>=0.8) return {icon:"🥇",color:"#ffd54f",label:{fr:"Excellent !",en:"Excellent!",es:"Excelente!",pt:"Excelente!"}};
  if (pct>=0.6) return {icon:"🥈",color:"#b0bec5",label:{fr:"Bien !",en:"Well done!",es:"Bien!",pt:"Bem feito!"}};
  if (pct>=0.4) return {icon:"🥉",color:"#cd7f32",label:{fr:"Continue !",en:"Keep going!",es:"Sigue!",pt:"Continue!"}};
  return              {icon:"📚",color:"rgba(176,190,197,0.6)",label:{fr:"A retravailler",en:"Keep studying",es:"A repasar",pt:"Continue estudando"}};
}

// ══════════════════════════════════════
// SVG 1 — CARTE VECTEURS D'ATTAQUE IT/OT
// ══════════════════════════════════════
function AttackVectorSVG({ lang }) {
  const lbl = (fr,en,es,pt) => ({fr,en,es,pt}[lang]||fr);
  const [selected, setSelected] = useState(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t+1), 700);
    return () => clearInterval(id);
  }, []);

  const blink = tick % 2 === 0;

  const zones = [
    { id:"internet", x:10, y:8, w:82, h:30, label:"INTERNET", icon:"🌐",
      color:C.red, threat:"high",
      desc:lbl("Acces externe : emails phishing, VPN non securise, mise a jour logiciel compromise",
        "External access: phishing emails, unsecured VPN, compromised software update",
        "Acceso externo: emails phishing, VPN no segura, actualizacion software comprometida",
        "Acesso externo: emails phishing, VPN nao segura, atualizacao software comprometida") },
    { id:"usb", x:108, y:8, w:74, h:30, label:"USB/MEDIA", icon:"💾",
      color:C.orange, threat:"high",
      desc:lbl("Cle USB malveillante, laptop technicien infecte, CD/DVD systeme compromise",
        "Malicious USB key, infected technician laptop, compromised system CD/DVD",
        "USB malicioso, laptop tecnico infectado, CD/DVD sistema comprometido",
        "USB malicioso, laptop tecnico infectado, CD/DVD sistema comprometido") },
    { id:"satcom", x:198, y:8, w:82, h:30, label:"SATCOM", icon:"📡",
      color:C.amber, threat:"medium",
      desc:lbl("Liaison satellite : interception donnees, spoofing GPS, man-in-the-middle",
        "Satellite link: data interception, GPS spoofing, man-in-the-middle",
        "Enlace satelite: intercepcion datos, spoofing GPS, man-in-the-middle",
        "Ligacao satelite: intercecao dados, spoofing GPS, man-in-the-middle") },
    { id:"it", x:10, y:60, w:82, h:40, label:"IT NETWORK", icon:"💻",
      color:C.blue2, threat:"medium",
      desc:lbl("Reseau administratif : passerelle, cabines, serveurs cartes — zone IT",
        "Administrative network: bridge, cabins, chart servers — IT zone",
        "Red administrativa: puente, camarotes, servidores cartas — zona IT",
        "Rede administrativa: ponte, cabines, servidores cartas — zona IT") },
    { id:"dmz", x:108, y:60, w:74, h:40, label:"DMZ", icon:"🔀",
      color:C.cyan, threat:"low",
      desc:lbl("Zone demilitarisee : firewall bidirectionnel separant IT et OT — point critique",
        "Demilitarized zone: bidirectional firewall separating IT and OT — critical point",
        "Zona desmilitarizada: firewall bidireccional separando IT y OT — punto critico",
        "Zona desmilitarizada: firewall bidirecional separando IT e OT — ponto critico") },
    { id:"ot", x:198, y:60, w:82, h:40, label:"OT NETWORK", icon:"⚙️",
      color:C.purple2, threat:"critical",
      desc:lbl("Reseau operationnel : AMS, SCADA, governor, telegraph, systemes propulsion",
        "Operational network: AMS, SCADA, governor, telegraph, propulsion systems",
        "Red operacional: AMS, SCADA, governor, telegrafo, sistemas propulsion",
        "Rede operacional: AMS, SCADA, governor, telegrafo, sistemas propulsao") },
    { id:"ams", x:10, y:122, w:55, h:36, label:"AMS", icon:"🔔",
      color:C.amber, threat:"critical",
      desc:lbl("AMS hack : fausses alarmes, suppression alarmes critiques, desactivation DMA",
        "AMS hack: false alarms, suppression of critical alarms, DMA disabling",
        "Hack AMS: alarmas falsas, supresion alarmas criticas, desactivacion DMA",
        "Hack AMS: alarmes falsas, supressao alarmes criticos, desativacao DMA") },
    { id:"gps", x:78, y:122, w:55, h:36, label:"GPS/ECDIS", icon:"🗺️",
      color:C.red, threat:"critical",
      desc:lbl("Spoofing GPS : position falsifiee — collision — echouage — piraterie",
        "GPS spoofing: falsified position — collision — grounding — piracy",
        "Spoofing GPS: posicion falsificada — colision — varada — pirateria",
        "Spoofing GPS: posicao falsificada — colisao — encalhe — pirataria") },
    { id:"prop", x:146, y:122, w:60, h:36, label:"PROPULSION", icon:"⛵",
      color:C.red, threat:"critical",
      desc:lbl("Hack governor/telegraph : prise de controle vitesse, inversion machine non autorisee",
        "Governor/telegraph hack: speed takeover, unauthorized engine reversal",
        "Hack governor/telegrafo: control velocidad, inversion maquina no autorizada",
        "Hack governor/telegrafo: controle velocidade, inversao maquina nao autorizada") },
    { id:"ballast", x:218, y:122, w:62, h:36, label:"BALLAST/CARGO", icon:"🛢️",
      color:C.orange, threat:"high",
      desc:lbl("Hack systeme ballast : gite forcee, dommages stabilite — risque naufrage",
        "Ballast system hack: forced list, stability damage — sinking risk",
        "Hack sistema lastre: escora forzada, danos estabilidad — riesgo hundimiento",
        "Hack sistema lastro: inclinacao forcada, danos estabilidade — risco afundamento") },
  ];

  const W = 290; const H = 180;
  const sel = zones.find(z => z.id === selected);
  const threatColor = { high:C.red, critical:C.red, medium:C.amber, low:C.green };

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill={C.bg0} rx="8"/>
        <defs>
          <pattern id="cgrid" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M14 0L0 0 0 14" fill="none" stroke={C.cyan} strokeWidth="0.08" opacity="0.2"/>
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#cgrid)" rx="8"/>
        {/* separateur IT/OT */}
        <rect x={104} y={56} width={82} height={48} rx="4" fill="rgba(0,229,255,0.04)" stroke={C.cyan} strokeWidth="0.5" strokeDasharray="3,3"/>
        <text x={145} y={54} textAnchor="middle" fontSize="5.5" fill={C.cyan} letterSpacing="1">FIREWALL</text>
        {/* fleches attaque */}
        {blink && selected===null && (
          <g opacity="0.5">
            <line x1={51} y1={38} x2={51} y2={58} stroke={C.red} strokeWidth="1.5" markerEnd="url(#arr)"/>
            <line x1={145} y1={38} x2={145} y2={58} stroke={C.amber} strokeWidth="1.5"/>
            <line x1={239} y1={38} x2={239} y2={58} stroke={C.amber} strokeWidth="1.5"/>
          </g>
        )}
        {zones.map(z => {
          const isSel = selected === z.id;
          const tc = threatColor[z.threat] || C.steel2;
          return (
            <g key={z.id} style={{cursor:"pointer"}} onClick={() => setSelected(selected===z.id?null:z.id)}>
              <rect x={z.x} y={z.y} width={z.w} height={z.h} rx="5"
                fill={isSel?`${z.color}20`:`${z.color}08`}
                stroke={isSel?z.color:blink&&z.threat==="critical"?`${tc}88`:`${z.color}44`}
                strokeWidth={isSel?1.8:0.9}/>
              <text x={z.x+z.w/2} y={z.y+z.h/2-4} textAnchor="middle" fontSize="11">{z.icon}</text>
              <text x={z.x+z.w/2} y={z.y+z.h/2+8} textAnchor="middle" fontSize="5.5"
                fill={isSel?z.color:C.muted} fontWeight={isSel?"800":"400"}>{z.label}</text>
            </g>
          );
        })}
        <text x={W/2} y={H-3} textAnchor="middle" fontSize="6" fill={C.dim}>
          {lbl("Toucher une zone pour les details","Tap zone for details","Tocar zona para detalles","Tocar zona para detalhes")}
        </text>
      </svg>
      {sel ? (
        <div style={{marginTop:8,padding:"10px 12px",borderRadius:14,
          background:`${sel.color}0e`,border:`1px solid ${sel.color}44`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
            <span style={{fontSize:18}}>{sel.icon}</span>
            <div>
              <div style={{fontSize:12,fontWeight:800,color:sel.color}}>{sel.label}</div>
              <div style={{fontSize:9,color:C.muted,letterSpacing:1}}>
                THREAT: {sel.threat.toUpperCase()}
              </div>
            </div>
          </div>
          <div style={{fontSize:10,color:C.steel3,lineHeight:1.6}}>{sel.desc}</div>
        </div>
      ) : (
        <div style={{marginTop:8,display:"flex",gap:6,flexWrap:"wrap"}}>
          {[{c:C.red,l:"CRITICAL/HIGH"},{c:C.amber,l:"MEDIUM"},{c:C.green,l:"LOW"}].map((x,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:4,
              padding:"4px 8px",borderRadius:6,background:`${x.c}0f`,border:`1px solid ${x.c}33`}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:x.c}}/>
              <span style={{fontSize:8,color:x.c,fontWeight:700}}>{x.l}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — SIMULATEUR INCIDENT CYBER
// ══════════════════════════════════════
function CyberIncidentSVG({ lang }) {
  const lbl = (fr,en,es,pt) => ({fr,en,es,pt}[lang]||fr);
  const [step, setStep] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t+1), 600);
    return () => clearInterval(id);
  }, []);

  const blink = tick % 2 === 0;

  const steps = [
    { id:"recon", icon:"🔍", color:C.steel2,
      label:lbl("1. RECONNAISSANCE","1. RECONNAISSANCE","1. RECONOCIMIENTO","1. RECONHECIMENTO"),
      desc:lbl("Scan ports SATCOM, identification systemes bord via SHODAN, enumeration services",
        "SATCOM port scan, onboard system identification via SHODAN, service enumeration",
        "Escaneo puertos SATCOM, identificacion sistemas via SHODAN, enumeracion servicios",
        "Scan portas SATCOM, identificacao sistemas via SHODAN, enumeracao servicos"),
      impact:lbl("Invisible — aucun impact direct","Invisible — no direct impact","Invisible — sin impacto directo","Invisivel — sem impacto direto") },
    { id:"phish", icon:"🎣", color:C.amber,
      label:lbl("2. PHISHING","2. PHISHING","2. PHISHING","2. PHISHING"),
      desc:lbl("Email piege envoye a l'officier : fausse mise a jour ECDIS, PJ malveillante",
        "Trap email sent to officer: fake ECDIS update, malicious attachment",
        "Email trampa enviado a oficial: falsa actualizacion ECDIS, adjunto malicioso",
        "Email armadilha enviado ao oficial: falsa atualizacao ECDIS, anexo malicioso"),
      impact:lbl("Credential vol, acces initial reseau IT","Credential theft, initial IT network access","Robo credenciales, acceso inicial red IT","Roubo credenciais, acesso inicial rede IT") },
    { id:"lateral", icon:"🐍", color:C.orange,
      label:lbl("3. MOUVEMENT LATERAL","3. LATERAL MOVEMENT","3. MOVIMIENTO LATERAL","3. MOVIMENTO LATERAL"),
      desc:lbl("Propagation IT → DMZ → OT via pivot, exploit vulnérabilite VPN interne",
        "IT → DMZ → OT propagation via pivot, internal VPN vulnerability exploit",
        "Propagacion IT → DMZ → OT via pivot, exploit VPN interna",
        "Propagacao IT → DMZ → OT via pivot, exploit VPN interna"),
      impact:lbl("Acces systemes AMS et SCADA machine","Access to AMS and engine SCADA systems","Acceso sistemas AMS y SCADA maquinas","Acesso sistemas AMS e SCADA maquinas") },
    { id:"persist", icon:"🔐", color:C.red2,
      label:lbl("4. PERSISTANCE","4. PERSISTENCE","4. PERSISTENCIA","4. PERSISTENCIA"),
      desc:lbl("Installation backdoor, creation compte admin cache, desactivation logs AMS",
        "Backdoor installation, hidden admin account creation, AMS log disabling",
        "Instalacion backdoor, creacion cuenta admin oculta, desactivacion logs AMS",
        "Instalacao backdoor, criacao conta admin oculta, desativacao logs AMS"),
      impact:lbl("Controle durable — invisible pour l'equipage","Lasting control — invisible to crew","Control duradero — invisible para tripulacion","Controle duradouro — invisivel para tripulacao") },
    { id:"impact", icon:"💥", color:C.red,
      label:lbl("5. IMPACT","5. IMPACT","5. IMPACTO","5. IMPACTO"),
      desc:lbl("Ransomware AMS/SCADA, fausse position GPS, inversion machine non autorisee",
        "AMS/SCADA ransomware, false GPS position, unauthorized engine reversal",
        "Ransomware AMS/SCADA, posicion GPS falsa, inversion maquina no autorizada",
        "Ransomware AMS/SCADA, posicao GPS falsa, inversao maquina nao autorizada"),
      impact:lbl("NAVIRE EN DANGER — perte propulsion / navigation","VESSEL IN DANGER — propulsion/navigation loss","BUQUE EN PELIGRO — perdida propulsion/navegacion","NAVIO EM PERIGO — perda propulsao/navegacao") },
  ];

  const W = 290; const H = 100;
  const cur = steps[step];

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill={C.bg0} rx="8"/>
        {/* ligne de progression */}
        <line x1={20} y1={50} x2={270} y2={50} stroke="rgba(255,255,255,0.08)" strokeWidth="2"/>
        <line x1={20} y1={50} x2={20+step*62.5} y2={50}
          stroke={cur.color} strokeWidth="2" strokeLinecap="round"/>
        {steps.map((s,i) => {
          const x = 20 + i * 62.5;
          const active = i <= step;
          const isCur = i === step;
          return (
            <g key={s.id} style={{cursor:"pointer"}} onClick={() => setStep(i)}>
              <circle cx={x} cy={50} r={isCur?12:8}
                fill={active?`${s.color}22`:"rgba(13,31,60,0.8)"}
                stroke={active?s.color:`${s.color}44`}
                strokeWidth={isCur?2:1}
                opacity={blink&&isCur?0.85:1}/>
              <text x={x} y={54} textAnchor="middle" fontSize={isCur?13:10}>{s.icon}</text>
              <text x={x} y={76} textAnchor="middle" fontSize="5" fill={active?s.color:C.dim}
                fontWeight={isCur?"800":"400"}>
                {i+1}
              </text>
            </g>
          );
        })}
      </svg>
      <div style={{background:C.bg1,borderRadius:12,padding:"10px 12px",marginTop:6,
        border:`1px solid ${cur.color}44`}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
          <span style={{fontSize:18}}>{cur.icon}</span>
          <div style={{flex:1}}>
            <div style={{fontSize:11,fontWeight:800,color:cur.color,letterSpacing:1}}>{cur.label}</div>
          </div>
        </div>
        <div style={{fontSize:10,color:C.steel3,lineHeight:1.6,marginBottom:6}}>{cur.desc}</div>
        <div style={{padding:"5px 8px",borderRadius:6,
          background:`${cur.color}10`,border:`1px solid ${cur.color}33`,
          fontSize:9,color:cur.color,fontWeight:700}}>
          ▸ {cur.impact}
        </div>
      </div>
      <div style={{display:"flex",gap:6,marginTop:8}}>
        <button onClick={() => setStep(s => Math.max(0,s-1))}
          style={{flex:1,padding:"8px 0",background:"rgba(69,90,100,0.18)",
            border:`1px solid ${C.steel}44`,borderRadius:10,
            color:C.muted,fontSize:11,cursor:"pointer"}}>
          ← {lbl("Precedent","Previous","Anterior","Anterior")}
        </button>
        <button onClick={() => setStep(s => Math.min(4,s+1))}
          style={{flex:1,padding:"8px 0",
            background:step<4?"rgba(255,23,68,0.15)":"rgba(69,90,100,0.1)",
            border:`1px solid ${step<4?C.red:C.steel}44`,
            borderRadius:10,color:step<4?C.red:C.muted,fontSize:11,cursor:"pointer"}}>
          {lbl("Suivant","Next","Siguiente","Proximo")} →
        </button>
        <button onClick={() => setStep(0)}
          style={{padding:"8px 12px",background:"rgba(69,90,100,0.18)",
            border:`1px solid ${C.steel}44`,borderRadius:10,
            color:C.muted,fontSize:11,cursor:"pointer"}}>
          ↺
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — DEFENSES RESEAU
// ══════════════════════════════════════
function DefensesSVG({ lang }) {
  const lbl = (fr,en,es,pt) => ({fr,en,es,pt}[lang]||fr);
  const [active, setActive] = useState({});

  const defenses = [
    { id:"fw", icon:"🔥", label:"FIREWALL", color:C.red2, x:10, y:10, w:80, h:50,
      desc:lbl("Filtrage paquets IT/OT — liste blanche ports autorises — inspection etat connexions",
        "IT/OT packet filtering — allowed port whitelist — connection state inspection",
        "Filtrado paquetes IT/OT — lista blanca puertos — inspeccion estado conexiones",
        "Filtragem pacotes IT/OT — lista branca portas — inspecao estado conexoes"),
      effect:lbl("Bloque 80% attaques reseau entrantes","Blocks 80% incoming network attacks","Bloquea 80% ataques red entrantes","Bloqueia 80% ataques rede entrantes") },
    { id:"ids", icon:"👁️", label:"IDS/IPS", color:C.amber, x:105, y:10, w:80, h:50,
      desc:lbl("Detection intrusion : analyse trafic anormal, signatures attaques connues, alertes temps reel",
        "Intrusion detection: abnormal traffic analysis, known attack signatures, real-time alerts",
        "Deteccion intrusion: analisis trafico anormal, firmas ataques conocidas, alertas tiempo real",
        "Detecao intrusao: analise trafego anormal, assinaturas ataques conhecidos, alertas tempo real"),
      effect:lbl("Detecte mouvements lateraux et exfiltration","Detects lateral movements and exfiltration","Detecta movimientos laterales y exfiltracion","Deteta movimentos laterais e exfiltracao") },
    { id:"seg", icon:"🧱", label:"SEGMENTATION", color:C.cyan, x:200, y:10, w:80, h:50,
      desc:lbl("VLAN separes IT/OT/DMZ — zero-trust entre zones — acces minimum necessaire",
        "Separate IT/OT/DMZ VLANs — zero-trust between zones — minimum necessary access",
        "VLANs separados IT/OT/DMZ — zero-trust entre zonas — acceso minimo necesario",
        "VLANs separados IT/OT/DMZ — zero-trust entre zonas — acesso minimo necessario"),
      effect:lbl("Limite propagation laterale attaquant","Limits attacker lateral propagation","Limita propagacion lateral atacante","Limita propagacao lateral do atacante") },
    { id:"patch", icon:"🔧", label:"PATCH MGT", color:C.green, x:10, y:75, w:80, h:50,
      desc:lbl("Mises a jour securite regulieres — gestion vulnerabilites CVE — test avant deploiement",
        "Regular security updates — CVE vulnerability management — testing before deployment",
        "Actualizaciones seguridad regulares — gestion vulnerabilidades CVE — prueba antes despliegue",
        "Atualizacoes seguranca regulares — gestao vulnerabilidades CVE — teste antes implantacao"),
      effect:lbl("Ferme 90% des vulnerabilites exploitees","Closes 90% of exploited vulnerabilities","Cierra 90% vulnerabilidades explotadas","Fecha 90% vulnerabilidades exploradas") },
    { id:"backup", icon:"💾", label:"BACKUP OT", color:C.purple2, x:105, y:75, w:80, h:50,
      desc:lbl("Sauvegarde configuration AMS/SCADA hors ligne, restoration < 4h, test periodique",
        "Offline AMS/SCADA config backup, < 4h restoration, periodic testing",
        "Copia seguridad configuracion AMS/SCADA fuera de linea, restauracion < 4h",
        "Backup configuracao AMS/SCADA fora de linha, restauracao < 4h, teste periodico"),
      effect:lbl("Garantit reprise apres ransomware","Guarantees recovery after ransomware","Garantiza recuperacion tras ransomware","Garante recuperacao apos ransomware") },
    { id:"train", icon:"🎓", label:"FORMATION", color:C.blue2, x:200, y:75, w:80, h:50,
      desc:lbl("Sensibilisation phishing, procedure incident cyber, ISM Code formation equipage",
        "Phishing awareness, cyber incident procedure, ISM Code crew training",
        "Sensibilizacion phishing, procedimiento incidente cyber, formacion ISM Code",
        "Consciencializacao phishing, procedimento incidente cyber, formacao ISM Code"),
      effect:lbl("Reduit 70% risque erreur humaine","Reduces 70% human error risk","Reduce 70% riesgo error humano","Reduz 70% risco erro humano") },
  ];

  const W = 290; const H = 138;

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill={C.bg0} rx="8"/>
        {defenses.map(d => {
          const on = !!active[d.id];
          return (
            <g key={d.id} style={{cursor:"pointer"}} onClick={()=>setActive(a=>({...a,[d.id]:!a[d.id]}))}>
              <rect x={d.x} y={d.y} width={d.w} height={d.h} rx="6"
                fill={on?`${d.color}18`:`${d.color}06`}
                stroke={on?d.color:`${d.color}33`} strokeWidth={on?1.8:0.8}/>
              <text x={d.x+d.w/2} y={d.y+d.h/2-6} textAnchor="middle" fontSize="14">{d.icon}</text>
              <text x={d.x+d.w/2} y={d.y+d.h/2+7} textAnchor="middle" fontSize="6"
                fill={on?d.color:C.muted} fontWeight={on?"800":"400"}>{d.label}</text>
              {on && <circle cx={d.x+d.w-8} cy={d.y+8} r="4" fill={C.green}/>}
              {!on && <circle cx={d.x+d.w-8} cy={d.y+8} r="4" fill="rgba(255,255,255,0.1)" stroke={C.steel} strokeWidth="0.8"/>}
            </g>
          );
        })}
      </svg>
      {Object.values(active).some(Boolean) ? (
        <div style={{marginTop:8}}>
          {defenses.filter(d=>active[d.id]).map(d=>(
            <div key={d.id} style={{marginBottom:6,padding:"8px 10px",borderRadius:10,
              background:`${d.color}0e`,border:`1px solid ${d.color}33`}}>
              <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:4}}>
                <span style={{fontSize:14}}>{d.icon}</span>
                <span style={{fontSize:10,fontWeight:800,color:d.color}}>{d.label}</span>
                <span style={{marginLeft:"auto",fontSize:9,color:C.green}}>✓ ACTIF</span>
              </div>
              <div style={{fontSize:9,color:C.steel3,lineHeight:1.5}}>{d.desc}</div>
              <div style={{marginTop:4,fontSize:9,color:d.color,fontWeight:700}}>▸ {d.effect}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{marginTop:8,padding:"8px 12px",borderRadius:10,
          background:"rgba(0,229,255,0.05)",border:`1px solid ${C.border}`,
          fontSize:10,color:C.steel3,textAlign:"center"}}>
          {lbl("Toucher une defense pour l'activer et voir son role","Tap a defense to activate and see its role","Tocar una defensa para activarla y ver su rol","Tocar uma defesa para ativar e ver o seu papel")}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — CHECKLIST IMO MSC-FAL.1
// ══════════════════════════════════════
function IMOChecklistSVG({ lang }) {
  const lbl = (fr,en,es,pt) => ({fr,en,es,pt}[lang]||fr);
  const [checked, setChecked] = useState({});
  const [done, setDone] = useState(false);

  const items = [
    { id:"c1", icon:"📋", color:C.cyan,
      fr:"Identifier et evaluer les risques cyber (ISM Code Reg.1.2.2)",
      en:"Identify and assess cyber risks (ISM Code Reg.1.2.2)",
      es:"Identificar y evaluar riesgos cyber (ISM Code Reg.1.2.2)",
      pt:"Identificar e avaliar riscos cyber (ISM Code Reg.1.2.2)" },
    { id:"c2", icon:"🗺️", color:C.blue2,
      fr:"Cartographier les systemes IT/OT critiques a bord",
      en:"Map critical IT/OT systems onboard",
      es:"Mapear sistemas IT/OT criticos a bordo",
      pt:"Mapear sistemas IT/OT criticos a bordo" },
    { id:"c3", icon:"🔐", color:C.amber,
      fr:"Segregation reseau IT/OT — DMZ conforme IMO MSC-FAL.1/Circ.3",
      en:"IT/OT network segregation — DMZ per IMO MSC-FAL.1/Circ.3",
      es:"Segregacion red IT/OT — DMZ conforme IMO MSC-FAL.1/Circ.3",
      pt:"Segregacao rede IT/OT — DMZ conforme IMO MSC-FAL.1/Circ.3" },
    { id:"c4", icon:"🔧", color:C.green,
      fr:"Plan de patch management systemes OT (AMS, SCADA, governor)",
      en:"OT systems patch management plan (AMS, SCADA, governor)",
      es:"Plan patch management sistemas OT (AMS, SCADA, governor)",
      pt:"Plano patch management sistemas OT (AMS, SCADA, governor)" },
    { id:"c5", icon:"💾", color:C.purple2,
      fr:"Sauvegardes offline config systemes critiques — test restauration",
      en:"Offline backups critical system configs — restoration test",
      es:"Copias seguridad offline configs sistemas criticos — test restauracion",
      pt:"Backups offline configs sistemas criticos — teste restauracao" },
    { id:"c6", icon:"🎓", color:C.orange2,
      fr:"Formation cyber annuelle equipage — simulation phishing",
      en:"Annual crew cyber training — phishing simulation",
      es:"Formacion cyber anual tripulacion — simulacion phishing",
      pt:"Formacao cyber anual tripulacao — simulacao phishing" },
    { id:"c7", icon:"📞", color:C.red2,
      fr:"Plan reponse incident cyber — contacts armateur + autorites",
      en:"Cyber incident response plan — owner + authority contacts",
      es:"Plan respuesta incidente cyber — contactos armador + autoridades",
      pt:"Plano resposta incidente cyber — contatos armador + autoridades" },
    { id:"c8", icon:"📝", color:C.cyan,
      fr:"Audit cyber annuel — PSC : verification Cyber SMS depuis 2021",
      en:"Annual cyber audit — PSC: Cyber SMS verification since 2021",
      es:"Auditoria cyber anual — PSC: verificacion Cyber SMS desde 2021",
      pt:"Auditoria cyber anual — PSC: verificacao Cyber SMS desde 2021" },
  ];

  const toggle = (id) => {
    const next = {...checked,[id]:!checked[id]};
    setChecked(next);
    if(items.every(it=>next[it.id])) setDone(true);
  };

  const cnt = items.filter(it=>checked[it.id]).length;
  const pct = Math.round(cnt/items.length*100);

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <div style={{fontSize:10,color:C.cyan,fontWeight:800,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>
          IMO MSC-FAL.1/Circ.3 — {lbl("AUDIT CYBER","CYBER AUDIT","AUDITORIA CYBER","AUDITORIA CYBER")}
        </div>
        <div style={{fontSize:10,color:C.muted}}>{cnt}/{items.length} — {pct}%</div>
      </div>
      <div style={{height:4,background:"rgba(255,255,255,0.07)",borderRadius:4,marginBottom:10,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${pct}%`,
          background:`linear-gradient(90deg,${C.cyan},${C.green})`,
          borderRadius:4,transition:"width 0.4s ease"}}/>
      </div>
      {items.map(item => {
        const ok = !!checked[item.id];
        return (
          <div key={item.id} onClick={() => toggle(item.id)}
            style={{display:"flex",alignItems:"center",gap:10,
              padding:"10px 12px",marginBottom:6,borderRadius:13,cursor:"pointer",
              background:ok?`${item.color}12`:"rgba(10,22,40,0.7)",
              border:`1px solid ${ok?item.color:`${item.color}28`}`,
              transition:"all 0.25s"}}>
            <div style={{width:22,height:22,borderRadius:7,flexShrink:0,
              background:ok?item.color:"rgba(255,255,255,0.05)",
              border:`1.5px solid ${ok?item.color:`${item.color}50`}`,
              display:"flex",alignItems:"center",justifyContent:"center"}}>
              {ok && <span style={{color:C.bg0,fontSize:12,fontWeight:900}}>✓</span>}
            </div>
            <span style={{fontSize:14,flexShrink:0}}>{item.icon}</span>
            <div style={{fontSize:10,color:ok?item.color:C.white,fontWeight:ok?700:400,lineHeight:1.4}}>
              {lbl(item.fr,item.en,item.es,item.pt)}
            </div>
          </div>
        );
      })}
      {done && (
        <div style={{marginTop:8,padding:"12px",borderRadius:14,
          background:"rgba(0,230,118,0.09)",border:`1.5px solid ${C.green}55`,textAlign:"center"}}>
          <div style={{fontSize:22,marginBottom:4}}>✅</div>
          <div style={{fontSize:12,fontWeight:800,color:C.green,fontFamily:"'Cinzel',serif"}}>
            {lbl("CONFORMITE CYBER — IMO 2021","CYBER COMPLIANCE — IMO 2021","CONFORMIDAD CYBER — IMO 2021","CONFORMIDADE CYBER — IMO 2021")}
          </div>
        </div>
      )}
    </div>
  );
}

function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:"",q5:""});
  const [showC, setShowC] = useState(false);

  const qs = {
    fr:[
      {id:"q1",q:"Quelle circulaire IMO definit le cadre de gestion des risques cyber maritimes ?\n(Repondre : MSC-FAL.1/Circ.3 ou autre)"},
      {id:"q2",q:"Que signifie OT dans le contexte de la cybersecurite maritime ?\n(Repondre en anglais, 2 mots)"},
      {id:"q3",q:"Quel type d'attaque falsifie la position GPS du navire ?\n(Repondre en 1 mot)"},
      {id:"q4",q:"Depuis quelle annee le PSC verifie-t-il le Cyber SMS a bord ?\n(Repondre : annee)"},
      {id:"q5",q:"Quelle attaque Maersk a subi en 2017 qui a detruit 45 000 PC ?\n(Repondre : nom du malware)"},
    ],
    en:[
      {id:"q1",q:"Which IMO circular defines the maritime cyber risk management framework?\n(Answer: MSC-FAL.1/Circ.3 or other)"},
      {id:"q2",q:"What does OT mean in maritime cybersecurity context?\n(Answer in English, 2 words)"},
      {id:"q3",q:"What type of attack falsifies the vessel's GPS position?\n(Answer in 1 word)"},
      {id:"q4",q:"Since which year does PSC verify the Cyber SMS onboard?\n(Answer: year)"},
      {id:"q5",q:"What attack did Maersk suffer in 2017 that destroyed 45,000 PCs?\n(Answer: malware name)"},
    ],
    es:[
      {id:"q1",q:"?Que circular IMO define el marco de gestion de riesgos cyber maritimos?\n(Responder: MSC-FAL.1/Circ.3 u otro)"},
      {id:"q2",q:"?Que significa OT en el contexto de la ciberseguridad maritima?\n(Responder en ingles, 2 palabras)"},
      {id:"q3",q:"?Que tipo de ataque falsifica la posicion GPS del buque?\n(Responder en 1 palabra)"},
      {id:"q4",q:"?Desde que ano el PSC verifica el Cyber SMS a bordo?\n(Responder: ano)"},
      {id:"q5",q:"?Que ataque sufrio Maersk en 2017 que destruyo 45.000 PC?\n(Responder: nombre del malware)"},
    ],
    pt:[
      {id:"q1",q:"Qual circular IMO define o quadro de gestao de riscos cyber maritimos?\n(Responder: MSC-FAL.1/Circ.3 ou outro)"},
      {id:"q2",q:"O que significa OT no contexto da ciberseguranca maritima?\n(Responder em ingles, 2 palavras)"},
      {id:"q3",q:"Que tipo de ataque falsifica a posicao GPS do navio?\n(Responder em 1 palavra)"},
      {id:"q4",q:"Desde que ano o PSC verifica o Cyber SMS a bordo?\n(Responder: ano)"},
      {id:"q5",q:"Que ataque a Maersk sofreu em 2017 que destruiu 45.000 PC?\n(Responder: nome do malware)"},
    ],
  };

  const chk=(id,val)=>{
    const v=val.trim().toLowerCase().replace(/[\s\-\.]/g,"");
    if(id==="q1") return v.includes("mscfal")||v.includes("circ3")||v.includes("msc")||v.includes("fal");
    if(id==="q2") return v.includes("operational")&&v.includes("technology")||v.includes("ot");
    if(id==="q3") return v.includes("spoof")||v.includes("spoofing");
    if(id==="q4") return v==="2021"||v.includes("2021");
    if(id==="q5") return v.includes("notpetya")||v.includes("petya");
    return false;
  };

  const corrKey={
    fr:{q1:"MSC-FAL.1/Circ.3",q2:"Operational Technology",q3:"Spoofing",q4:"2021",q5:"NotPetya"},
    en:{q1:"MSC-FAL.1/Circ.3",q2:"Operational Technology",q3:"Spoofing",q4:"2021",q5:"NotPetya"},
    es:{q1:"MSC-FAL.1/Circ.3",q2:"Operational Technology",q3:"Spoofing",q4:"2021",q5:"NotPetya"},
    pt:{q1:"MSC-FAL.1/Circ.3",q2:"Operational Technology",q3:"Spoofing",q4:"2021",q5:"NotPetya"},
  };

  const expl={
    fr:"OK Q1: MSC-FAL.1/Circ.3 (2017) — Directives IMO gestion risques cyber — integre ISM Code depuis 2021\nOK Q2: Operational Technology — systemes de controle industriels (AMS, SCADA, governor, telegraph)\nOK Q3: Spoofing GPS — emission faux signaux GPS pour falsifier position navire — risque collision/echouage\nOK Q4: 2021 — Resolution IMO MSC-428(98) : Cyber SMS obligatoire dans ISM Code depuis 1er janv. 2021\nOK Q5: NotPetya — ransomware/wiper 2017, propage via MeDoc, detruit 45 000 PC Maersk en 10 min",
    en:"OK Q1: MSC-FAL.1/Circ.3 (2017) — IMO cyber risk management guidelines — integrated in ISM Code since 2021\nOK Q2: Operational Technology — industrial control systems (AMS, SCADA, governor, telegraph)\nOK Q3: GPS Spoofing — emitting false GPS signals to falsify vessel position — collision/grounding risk\nOK Q4: 2021 — IMO Resolution MSC-428(98): Cyber SMS mandatory in ISM Code since Jan 1 2021\nOK Q5: NotPetya — ransomware/wiper 2017, spread via MeDoc, destroyed 45,000 Maersk PCs in 10 min",
    es:"OK Q1: MSC-FAL.1/Circ.3 (2017) — Directrices IMO gestion riesgos cyber — integrado ISM Code desde 2021\nOK Q2: Operational Technology — sistemas de control industrial (AMS, SCADA, governor, telegrafo)\nOK Q3: Spoofing GPS — emision senales GPS falsas para falsificar posicion — riesgo colision/varada\nOK Q4: 2021 — Resolucion IMO MSC-428(98): Cyber SMS obligatorio en ISM Code desde 1 enero 2021\nOK Q5: NotPetya — ransomware/wiper 2017, propagado via MeDoc, destruyo 45.000 PC Maersk en 10 min",
    pt:"OK Q1: MSC-FAL.1/Circ.3 (2017) — Diretrizes IMO gestao riscos cyber — integrado ISM Code desde 2021\nOK Q2: Operational Technology — sistemas de controlo industrial (AMS, SCADA, governor, telegrafo)\nOK Q3: Spoofing GPS — emissao sinais GPS falsos para falsificar posicao — risco colisao/encalhe\nOK Q4: 2021 — Resolucao IMO MSC-428(98): Cyber SMS obrigatorio no ISM Code desde 1 jan. 2021\nOK Q5: NotPetya — ransomware/wiper 2017, propagado via MeDoc, destruiu 45.000 PC Maersk em 10 min",
  };

  const list=qs[lang]||qs.fr;
  const ck=corrKey[lang]||corrKey.fr;

  return (
    <div>
      <div style={{padding:"10px 14px",borderRadius:13,marginBottom:14,
        background:"rgba(0,229,255,0.06)",border:`1px solid ${C.cyan}33`,
        fontSize:11,color:C.cyan2,lineHeight:1.7}}>
        {lang==="fr"?"Rappels: MSC-FAL.1/Circ.3 | OT = Operational Technology | Spoofing GPS | 2021 | NotPetya"
        :lang==="en"?"Key: MSC-FAL.1/Circ.3 | OT = Operational Technology | GPS Spoofing | 2021 | NotPetya"
        :lang==="es"?"Clave: MSC-FAL.1/Circ.3 | OT = Operational Technology | Spoofing GPS | 2021 | NotPetya"
        :"Chave: MSC-FAL.1/Circ.3 | OT = Operational Technology | Spoofing GPS | 2021 | NotPetya"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:14}}>
          <div style={{fontSize:12,color:C.white,marginBottom:8,lineHeight:1.6,
            whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]}
            onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"12px",borderRadius:12,
              background:"rgba(255,255,255,0.06)",
              border:`1.5px solid ${showC?(chk(q.id,ans[q.id])?C.green:C.red):C.border}`,
              color:C.white,fontSize:18,fontFamily:"monospace",fontWeight:700,
              textAlign:"center",boxSizing:"border-box"}}/>
          {showC && (
            <div style={{fontSize:11,marginTop:5,fontWeight:700,
              color:chk(q.id,ans[q.id])?C.green:C.red}}>
              {chk(q.id,ans[q.id])?"✓":`✗ => ${ck[q.id]}`}
            </div>
          )}
        </div>
      ))}
      <button onClick={()=>setShowC(v=>!v)}
        style={{width:"100%",padding:"12px",borderRadius:14,
          border:`1px solid ${C.amber}55`,background:"rgba(255,179,0,0.1)",
          color:C.amber2,fontSize:12,fontWeight:800,cursor:"pointer",marginBottom:8}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
      {showC && (
        <div style={{padding:"14px",borderRadius:14,
          background:"rgba(0,230,118,0.07)",border:`1px solid ${C.green}33`,
          fontSize:11,color:C.white,lineHeight:1.85,whiteSpace:"pre-line"}}>
          {expl[lang]||expl.fr}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// QUESTION BANK — 15 QCM PREMIUM+
// ══════════════════════════════════════
function QuestionBank({ lang }) {
  const [idx,setIdx]=useState(0);
  const [sel,setSel]=useState(null);
  const [answered,setAnswered]=useState(false);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);
  const [started,setStarted]=useState(false);
  const lbl=(fr,en,es,pt)=>({fr,en,es,pt}[lang]||fr);

  const qs=[
    {q:lbl("Quelle est la difference entre IT et OT en contexte maritime ?","What is the difference between IT and OT in maritime context?","Cual es la diferencia entre IT y OT en contexto maritimo?","Qual e a diferenca entre IT e OT no contexto maritimo?"),
      opts:[lbl("IT = ordinateurs, OT = systemes de controle industriels (AMS, SCADA, governor)","IT = computers, OT = industrial control systems (AMS, SCADA, governor)","IT = ordenadores, OT = sistemas control industrial (AMS, SCADA, governor)","IT = computadores, OT = sistemas controlo industrial (AMS, SCADA, governor)"),lbl("Synonymes","Synonyms","Sinonimos","Sinonimos"),lbl("IT = machine, OT = pont","IT = engine, OT = deck","IT = maquinas, OT = cubierta","IT = maquinas, OT = convés"),lbl("IT = securite, OT = navigation","IT = safety, OT = navigation","IT = seguridad, OT = navegacion","IT = seguranca, OT = navegacao")],
      ans:0,expl:lbl("IT (Information Technology) = systemes informatiques administratifs. OT (Operational Technology) = systemes de controle industriels critiques : AMS, SCADA, governor, telegraph, ballast. La separation IT/OT est fondamentale en cybersecurite maritime.","IT (Information Technology) = administrative computing systems. OT (Operational Technology) = critical industrial control systems: AMS, SCADA, governor, telegraph, ballast. IT/OT separation is fundamental in maritime cybersecurity.","IT = sistemas informaticos administrativos. OT = sistemas control industrial criticos: AMS, SCADA, governor, telegrafo, lastre.","IT = sistemas informaticos administrativos. OT = sistemas controlo industrial criticos: AMS, SCADA, governor, telegrafo, lastro.")},
    {q:lbl("Que signifie DMZ dans un reseau maritime securise ?","What does DMZ mean in a secure maritime network?","Que significa DMZ en una red maritima segura?","O que significa DMZ numa rede maritima segura?"),
      opts:[lbl("Danger Maritime Zone","Danger Maritime Zone","Danger Maritime Zone","Danger Maritime Zone"),lbl("Zone demilitarisee : couche isolant reseau IT et OT avec firewall bidirectionnel","Demilitarized zone: layer isolating IT and OT networks with bidirectional firewall","Zona desmilitarizada: capa que aisla red IT y OT con firewall bidireccional","Zona desmilitarizada: camada isolando rede IT e OT com firewall bidirecional"),lbl("Deep Monitoring Zone","Deep Monitoring Zone","Deep Monitoring Zone","Deep Monitoring Zone"),lbl("Direct Maritime Zone","Direct Maritime Zone","Direct Maritime Zone","Direct Maritime Zone")],
      ans:1,expl:lbl("La DMZ (Demilitarized Zone) est une zone reseau intermediaire entre IT et OT protegee par des firewalls des deux cotes. Elle empeche qu'une compromission du reseau IT atteigne directement les systemes OT critiques.","The DMZ (Demilitarized Zone) is an intermediate network zone between IT and OT protected by firewalls on both sides. It prevents an IT network compromise from directly reaching critical OT systems.","La DMZ es una zona de red intermedia entre IT y OT protegida por firewalls en ambos lados.","A DMZ e uma zona de rede intermediaria entre IT e OT protegida por firewalls dos dois lados.")},
    {q:lbl("Qu'est-ce que le GPS spoofing en contexte maritime ?","What is GPS spoofing in maritime context?","Que es el GPS spoofing en contexto maritimo?","O que e o GPS spoofing no contexto maritimo?"),
      opts:[lbl("Une panne du recepteur GPS","A GPS receiver failure","Una averia del receptor GPS","Uma falha do receptor GPS"),lbl("Emission de faux signaux GPS pour falsifier la position affichee du navire","Emitting false GPS signals to falsify the vessel's displayed position","Emision de senales GPS falsas para falsificar la posicion mostrada del buque","Emissao de sinais GPS falsos para falsificar a posicao mostrada do navio"),lbl("Un virus informatique GPS","A GPS computer virus","Un virus informatico GPS","Um virus informatico GPS"),lbl("Une interference radio naturelle","A natural radio interference","Una interferencia radio natural","Uma interferencia radio natural")],
      ans:1,expl:lbl("Le GPS spoofing consiste a emettre des signaux GPS falsifies plus puissants que le signal reel pour faire croire au navire qu'il est a une position differente. Risques : collision, echouage, derivation de route. Detecte par comparaison multi-sources (AIS, radar, loran).","GPS spoofing involves emitting falsified GPS signals stronger than the real signal to make the vessel believe it is at a different position. Risks: collision, grounding, route deviation. Detected by multi-source comparison (AIS, radar, loran).","El GPS spoofing emite senales GPS falsificadas mas fuertes para hacer creer al buque que esta en otra posicion.","O GPS spoofing emite sinais GPS falsificados mais fortes para fazer o navio acreditar estar noutra posicao.")},
    {q:lbl("Depuis quelle date l'IMO exige-t-il un Cyber SMS dans l'ISM Code ?","Since when does IMO require a Cyber SMS in the ISM Code?","?Desde cuando la IMO exige un Cyber SMS en el Codigo ISM?","Desde quando a IMO exige um Cyber SMS no Codigo ISM?"),
      opts:["1er janvier 2017","1er janvier 2019","1er janvier 2021","1er janvier 2023"],
      ans:2,expl:lbl("Resolution IMO MSC-428(98) : depuis le 1er janvier 2021, les systemes de gestion de la cybersecurite doivent etre integres dans le Document de conformite ISM (SMS) de toutes les compagnies maritimes. Verifie lors des audits PSC.","IMO Resolution MSC-428(98): since January 1, 2021, cyber security management systems must be integrated in the ISM compliance document (SMS) of all shipping companies. Verified during PSC audits.","Resolucion IMO MSC-428(98): desde el 1 enero 2021, los sistemas de gestion cyberseguridad deben integrarse en el SMS ISM.","Resolucao IMO MSC-428(98): desde 1 janeiro 2021, os sistemas gestao cyberseguranca devem integrar o SMS ISM.")},
    {q:lbl("Qu'est-ce qu'un ransomware en contexte OT maritime ?","What is ransomware in maritime OT context?","Que es un ransomware en contexto OT maritimo?","O que e um ransomware no contexto OT maritimo?"),
      opts:[lbl("Un virus qui ralentit le systeme","A virus that slows the system","Un virus que ralentiza el sistema","Um virus que atrasa o sistema"),lbl("Malware qui chiffre les donnees/systemes et exige rancon — peut bloquer AMS/SCADA","Malware that encrypts data/systems and demands ransom — can block AMS/SCADA","Malware que cifra datos/sistemas y exige rescate — puede bloquear AMS/SCADA","Malware que cifra dados/sistemas e exige resgate — pode bloquear AMS/SCADA"),lbl("Un spam email","A spam email","Un email spam","Um email spam"),lbl("Un bug logiciel","A software bug","Un bug software","Um bug software")],
      ans:1,expl:lbl("Un ransomware chiffre les fichiers et systemes rendant AMS/SCADA/ECDIS inutilisables jusqu'au paiement d'une rancon. En 2017, NotPetya a touche Maersk : 45 000 PC detruits, 300M$ de pertes, ports bloques pendant 10 jours.","Ransomware encrypts files and systems making AMS/SCADA/ECDIS unusable until a ransom is paid. In 2017, NotPetya hit Maersk: 45,000 PCs destroyed, $300M losses, ports blocked for 10 days.","Un ransomware cifra archivos y sistemas haciendo AMS/SCADA/ECDIS inutilizables. NotPetya 2017 afecto Maersk: 45.000 PC destruidos, 300M$.","Um ransomware cifra ficheiros e sistemas tornando AMS/SCADA/ECDIS inutilizaveis. NotPetya 2017 afetou Maersk: 45.000 PC destruidos, 300M$.")},
    {q:lbl("Qu'est-ce que le mouvement lateral dans une cyberattaque maritime ?","What is lateral movement in a maritime cyberattack?","Que es el movimiento lateral en un ciberataque maritimo?","O que e o movimento lateral num ciberataque maritimo?"),
      opts:[lbl("Un deplacement physique de l'attaquant","A physical movement of the attacker","Un movimiento fisico del atacante","Um movimento fisico do atacante"),lbl("Propagation de l'attaquant d'un systeme a un autre — IT vers DMZ vers OT","Attacker propagation from one system to another — IT to DMZ to OT","Propagacion del atacante de un sistema a otro — IT a DMZ a OT","Propagacao do atacante de um sistema para outro — IT para DMZ para OT"),lbl("Une attaque sur le systeme de gouvernail","An attack on the rudder system","Un ataque al sistema de timon","Um ataque ao sistema de leme"),lbl("Une attaque par la mer","A seaborne attack","Un ataque por mar","Um ataque por mar")],
      ans:1,expl:lbl("Le mouvement lateral est la technique par laquelle un attaquant, apres avoir compromis un premier systeme (ex: email phishing), se deplace lateralement vers d'autres systemes (IT → DMZ → OT). L'objectif est d'atteindre les systemes OT critiques depuis l'entree initiale.","Lateral movement is the technique by which an attacker, after compromising a first system (e.g.: phishing email), moves laterally to other systems (IT → DMZ → OT). The goal is to reach critical OT systems from the initial entry.","El movimiento lateral es la tecnica por la cual un atacante se propaga de un sistema a otro — IT → DMZ → OT.","O movimento lateral e a tecnica pela qual um atacante se propaga de um sistema para outro — IT → DMZ → OT.")},
    {q:lbl("Quelle est la meilleure defense contre une attaque par cle USB malveillante ?","What is the best defense against a malicious USB key attack?","Cual es la mejor defensa contra un ataque por USB malicioso?","Qual e a melhor defesa contra um ataque por USB malicioso?"),
      opts:[lbl("Antivirus uniquement","Antivirus only","Solo antivirus","Apenas antivirus"),lbl("Politique USB stricte : ports desactives + scan obligatoire + liste blanche appareils","Strict USB policy: disabled ports + mandatory scan + device whitelist","Politica USB estricta: puertos desactivados + escaneo obligatorio + lista blanca","Politica USB estrita: portas desativadas + scan obrigatorio + lista branca"),lbl("Firewall reseau uniquement","Network firewall only","Solo firewall de red","Apenas firewall rede"),lbl("Changer les mots de passe","Change passwords","Cambiar contrasenas","Mudar palavras-passe")],
      ans:1,expl:lbl("Une cle USB malveillante contourne les defenses reseau car elle est inseree directement dans le systeme. Protection : desactiver ports USB non necessaires, scanner obligatoirement chaque media externe, n'autoriser que les appareils approuves (liste blanche).","A malicious USB key bypasses network defenses as it is inserted directly into the system. Protection: disable unnecessary USB ports, mandatory scan of all external media, only allow approved devices (whitelist).","Un USB malicioso evita las defensas de red. Proteccion: puertos desactivados, escaneo obligatorio, lista blanca.","Um USB malicioso contorna as defesas de rede. Protecao: portas desativadas, scan obrigatorio, lista branca.")},
    {q:lbl("Pourquoi les systemes OT sont-ils particulierement vulnerables ?","Why are OT systems particularly vulnerable?","Por que los sistemas OT son especialmente vulnerables?","Por que os sistemas OT sao particularmente vulneraveis?"),
      opts:[lbl("Ils sont tres recents","They are very recent","Son muy recientes","Sao muito recentes"),lbl("Anciens systemes non prevus pour etre connectes, cycles de patch longs, acces physique difficile","Old systems not designed to be connected, long patch cycles, difficult physical access","Sistemas antiguos no disenados para conectarse, ciclos de parche largos, acceso fisico dificil","Sistemas antigos nao projetados para conectar, ciclos de patch longos, acesso fisico dificil"),lbl("Ils utilisent des logiciels libres","They use open source software","Usan software libre","Usam software livre"),lbl("Ils sont toujours hors ligne","They are always offline","Siempre estan fuera de linea","Estao sempre offline")],
      ans:1,expl:lbl("Les systemes OT maritimes (AMS, SCADA, governor) ont souvent 10-20 ans d'age, ont ete concus avant la cybersecurite moderne, ont des cycles de mise a jour de 1-5 ans, et sont difficiles a patcher sans interruption de service. Connexion recente a internet = surface d'attaque immediate.","Maritime OT systems (AMS, SCADA, governor) are often 10-20 years old, were designed before modern cybersecurity, have 1-5 year update cycles, and are hard to patch without service interruption. Recent internet connection = immediate attack surface.","Los sistemas OT maritimos tienen 10-20 anos, fueron disenados antes de la cyberseguridad moderna, ciclos actualizacion 1-5 anos.","Os sistemas OT maritimos tem 10-20 anos, foram projetados antes da cyberseguranca moderna, ciclos atualizacao 1-5 anos.")},
    {q:lbl("Qu'est-ce que le principe Zero Trust en cybersecurite maritime ?","What is the Zero Trust principle in maritime cybersecurity?","Que es el principio Zero Trust en ciberseguridad maritima?","O que e o principio Zero Trust em ciberseguranca maritima?"),
      opts:[lbl("Faire confiance au reseau interne, mefiance externe uniquement","Trust internal network, distrust external only","Confiar red interna, desconfianza solo externa","Confiar rede interna, desconfianca apenas externa"),lbl("Ne faire confiance a personne par defaut — verifier chaque acces, chaque systeme, chaque utilisateur","Trust no one by default — verify every access, every system, every user","No confiar a nadie por defecto — verificar cada acceso, sistema, usuario","Nao confiar em ninguem por defeito — verificar cada acesso, sistema, utilizador"),lbl("Interdire tous les acces distants","Prohibit all remote access","Prohibir todos los accesos remotos","Proibir todos os acessos remotos"),lbl("Desactiver le WiFi a bord","Disable WiFi onboard","Desactivar el WiFi a bordo","Desativar o WiFi a bordo")],
      ans:1,expl:lbl("Zero Trust signifie qu'aucun utilisateur, systeme ou reseau n'est considere comme fiable par defaut, meme s'il est dans le reseau interne. Chaque acces est verifie et authentifie. Particulierement important pour separer IT et OT a bord.","Zero Trust means no user, system or network is considered trustworthy by default, even if inside the internal network. Every access is verified and authenticated. Particularly important for separating IT and OT onboard.","Zero Trust: ningun usuario, sistema o red es confiable por defecto. Cada acceso es verificado.","Zero Trust: nenhum utilizador, sistema ou rede e de confianca por defeito. Cada acesso e verificado.")},
    {q:lbl("Quel vecteur d'attaque le NotPetya 2017 a-t-il utilise pour infecter Maersk ?","Which attack vector did NotPetya 2017 use to infect Maersk?","Que vector de ataque uso NotPetya 2017 para infectar Maersk?","Que vetor de ataque usou NotPetya 2017 para infetar a Maersk?"),
      opts:[lbl("Email phishing direct","Direct phishing email","Email phishing directo","Email phishing direto"),lbl("Mise a jour logiciel compromise (MeDoc — logiciel comptabilite ukrainien)","Compromised software update (MeDoc — Ukrainian accounting software)","Actualizacion software comprometida (MeDoc — software contabilidad ucraniano)","Atualizacao software comprometida (MeDoc — software contabilidade ucraniano)"),lbl("Cle USB malveillante","Malicious USB key","USB malicioso","USB malicioso"),lbl("Attaque WiFi portuaire","Port WiFi attack","Ataque WiFi portuario","Ataque WiFi portuario")],
      ans:1,expl:lbl("NotPetya s'est propage via une mise a jour compromise du logiciel de comptabilite ukrainien MeDoc. Maersk, utilisant ce logiciel dans ses bureaux ukrainiens, a vu le malware se propager a l'ensemble de son reseau mondial en quelques heures : 45 000 PC, 4 000 serveurs, 17 ports mondiaux paralyses.","NotPetya spread via a compromised update of Ukrainian accounting software MeDoc. Maersk, using this software in its Ukrainian offices, saw the malware spread to its entire global network within hours: 45,000 PCs, 4,000 servers, 17 global ports paralyzed.","NotPetya se propago via una actualizacion comprometida del software MeDoc. Maersk: 45.000 PC, 4.000 servidores, 17 puertos paralizados.","NotPetya propagou-se via atualizacao comprometida do software MeDoc. Maersk: 45.000 PC, 4.000 servidores, 17 portos paralisados.")},
    {q:lbl("Qu'est-ce que l'IDS/IPS en cybersecurite OT maritime ?","What is IDS/IPS in maritime OT cybersecurity?","Que es el IDS/IPS en ciberseguridad OT maritima?","O que e o IDS/IPS em ciberseguranca OT maritima?"),
      opts:[lbl("Systeme de navigation","Navigation system","Sistema de navegacion","Sistema de navegacao"),lbl("Intrusion Detection/Prevention System — surveille trafic reseau et bloque anomalies","Intrusion Detection/Prevention System — monitors network traffic and blocks anomalies","Intrusion Detection/Prevention System — vigila trafico red y bloquea anomalias","Intrusion Detection/Prevention System — monitoriza trafego rede e bloqueia anomalias"),lbl("International Distress Signal","International Distress Signal","International Distress Signal","International Distress Signal"),lbl("Systeme de sauvegarde","Backup system","Sistema de copia seguridad","Sistema de backup")],
      ans:1,expl:lbl("IDS (Intrusion Detection System) analyse le trafic reseau pour detecter les comportements anormaux et alerter. IPS (Intrusion Prevention System) bloque automatiquement le trafic suspect. En contexte OT maritime, detecte les mouvements lateraux et les communications anormales vers systemes AMS/SCADA.","IDS (Intrusion Detection System) analyzes network traffic to detect abnormal behaviors and alert. IPS (Intrusion Prevention System) automatically blocks suspicious traffic. In maritime OT context, detects lateral movements and abnormal communications to AMS/SCADA systems.","IDS detecta comportamientos anormales. IPS bloquea trafico sospechoso automaticamente.","IDS deteta comportamentos anormais. IPS bloqueia trafego suspeito automaticamente.")},
    {q:lbl("Pourquoi le patch management est-il critique pour les systemes OT ?","Why is patch management critical for OT systems?","Por que el patch management es critico para los sistemas OT?","Por que o patch management e critico para os sistemas OT?"),
      opts:[lbl("Pour ameliorer les performances","To improve performance","Para mejorar el rendimiento","Para melhorar o desempenho"),lbl("90% des attaques exploitent des vulnerabilites connues avec correctif disponible","90% of attacks exploit known vulnerabilities with available patch","90% de ataques explotan vulnerabilidades conocidas con parche disponible","90% dos ataques exploram vulnerabilidades conhecidas com patch disponivel"),lbl("Pour reduire la consommation energetique","To reduce energy consumption","Para reducir consumo energetico","Para reduzir consumo energetico"),lbl("Pas critique pour les systemes OT","Not critical for OT systems","No critico para sistemas OT","Nao critico para sistemas OT")],
      ans:1,expl:lbl("90% des cyberattaques exploitent des vulnerabilites deja documentees et corrigees. Un patch non applique est une porte ouverte. Pour les systemes OT, le patch doit etre teste en environnement de pre-production avant deploiement pour eviter tout arret non planifie.","90% of cyberattacks exploit already documented and patched vulnerabilities. An unapplied patch is an open door. For OT systems, patches must be tested in pre-production environment before deployment to avoid unplanned shutdown.","90% de ataques explotan vulnerabilidades ya documentadas. Para OT, el parche debe probarse antes del despliegue.","90% dos ataques exploram vulnerabilidades ja documentadas. Para OT, o patch deve ser testado antes da implantacao.")},
    {q:lbl("Que doit inclure un plan de reponse aux incidents cyber maritime ?","What must a maritime cyber incident response plan include?","Que debe incluir un plan de respuesta a incidentes cyber maritimos?","O que deve incluir um plano de resposta a incidentes cyber maritimos?"),
      opts:[lbl("Uniquement les contacts IT","Only IT contacts","Solo contactos IT","Apenas contactos IT"),lbl("Detection, isolation, notification autorites, restauration, analyse post-incident","Detection, isolation, authority notification, restoration, post-incident analysis","Deteccion, aislamiento, notificacion autoridades, restauracion, analisis post-incidente","Detecao, isolamento, notificacao autoridades, restauracao, analise pos-incidente"),lbl("Un mot de passe de secours","An emergency password","Una contrasena de emergencia","Uma palavra-passe de emergencia"),lbl("Le manuel du fabricant AMS","The AMS manufacturer manual","El manual del fabricante AMS","O manual do fabricante AMS")],
      ans:1,expl:lbl("Un plan de reponse cyber maritime inclut : (1) detection et classification de l'incident, (2) isolation des systemes compromis, (3) notification compagnie + autorites maritimes + CERT national, (4) restauration depuis backup offline, (5) analyse post-incident pour prevenir recidive. Documente dans le Cyber SMS.","A maritime cyber response plan includes: (1) incident detection and classification, (2) isolation of compromised systems, (3) notification to company + maritime authorities + national CERT, (4) restoration from offline backup, (5) post-incident analysis. Documented in Cyber SMS.","Plan de respuesta cyber incluye: deteccion, aislamiento, notificacion, restauracion, analisis post-incidente.","Plano resposta cyber inclui: detecao, isolamento, notificacao, restauracao, analise pos-incidente.")},
    {q:lbl("Qu'est-ce que la cyber resilience en contexte maritime ?","What is cyber resilience in maritime context?","Que es la ciber resiliencia en contexto maritimo?","O que e a ciber resiliencia no contexto maritimo?"),
      opts:[lbl("L'absence totale d'incidents cyber","Total absence of cyber incidents","Ausencia total de incidentes cyber","Ausencia total de incidentes cyber"),lbl("Capacite a maintenir/restaurer les operations essentielles malgre une cyberattaque","Ability to maintain/restore essential operations despite a cyberattack","Capacidad de mantener/restaurar operaciones esenciales a pesar de un ciberataque","Capacidade de manter/restaurar operacoes essenciais apesar de um ciberataque"),lbl("Un systeme antivirus puissant","A powerful antivirus system","Un potente sistema antivirus","Um poderoso sistema antivirus"),lbl("La redondance N+1 uniquement","N+1 redundancy only","Redundancia N+1 solo","Redundancia N+1 apenas")],
      ans:1,expl:lbl("La cyber resilience ne vise pas la prevention totale (impossible) mais la capacite a continuer d'operer en mode degrade et a se restaurer rapidement apres un incident. Inclut : backup offline, procedures manuelles de secours, formation equipage, plan de reponse incident.","Cyber resilience does not aim for total prevention (impossible) but the ability to continue operating in degraded mode and restore quickly after an incident. Includes: offline backup, manual emergency procedures, crew training, incident response plan.","La ciber resiliencia no busca prevencion total sino capacidad de operar en modo degradado y restaurarse rapidamente.","A ciber resiliencia nao visa prevencao total mas capacidade de operar em modo degradado e restaurar rapidamente.")},
    {q:lbl("Qu'est-ce qu'un audit cyber PSC depuis 2021 ?","What is a PSC cyber audit since 2021?","Que es una auditoria cyber PSC desde 2021?","O que e uma auditoria cyber PSC desde 2021?"),
      opts:[lbl("Un test de vitesse internet","An internet speed test","Una prueba de velocidad internet","Um teste de velocidade internet"),lbl("Verification par l'inspecteur PSC que le Cyber SMS est integre dans l'ISM Code du navire","PSC inspector verification that Cyber SMS is integrated in vessel's ISM Code","Verificacion por inspector PSC de que el Cyber SMS esta integrado en el Codigo ISM","Verificacao pelo inspetor PSC de que o Cyber SMS esta integrado no Codigo ISM"),lbl("Un test de penetration obligatoire","A mandatory penetration test","Una prueba de penetracion obligatoria","Um teste de penetracao obrigatorio"),lbl("Une simulation d'attaque cyber","A cyber attack simulation","Una simulacion de ataque cyber","Uma simulacao de ataque cyber")],
      ans:1,expl:lbl("Depuis 2021, les inspecteurs PSC (Port State Control) verifient que la gestion des risques cyber est integree dans le Document de conformite ISM. Ils examinent le Cyber SMS : politiques, procedures incident, formation equipage, audit cyber annuel, backups. Non conforme = retenue du navire.","Since 2021, PSC (Port State Control) inspectors verify that cyber risk management is integrated in the ISM compliance document. They review the Cyber SMS: policies, incident procedures, crew training, annual cyber audit, backups. Non-compliant = vessel detention.","Desde 2021, los inspectores PSC verifican que la gestion cyber esta integrada en el Documento de conformidad ISM.","Desde 2021, os inspetores PSC verificam que a gestao cyber esta integrada no Documento de conformidade ISM.")},
  ];

  const total=qs.length;
  const handleAnswer=(i)=>{if(answered)return;setSel(i);setAnswered(true);if(i===qs[idx].ans)setScore(s=>s+1);};
  const handleNext=()=>{if(idx===total-1){setDone(true);return;}setSel(null);setAnswered(false);setIdx(i=>i+1);};
  const handleRestart=()=>{setIdx(0);setSel(null);setAnswered(false);setScore(0);setDone(false);setStarted(false);};

  if(!started) return (
    <div style={{textAlign:"center",padding:"24px 0"}}>
      <div style={{fontSize:40,marginBottom:12}}>📝</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:15,color:C.white,marginBottom:6,letterSpacing:1}}>
        {lbl("Banque Premium+","Premium+ Bank","Banco Premium+","Banco Premium+")}
      </div>
      <div style={{fontSize:12,color:C.muted,marginBottom:20}}>
        15 {lbl("questions niveau ingenieur","engineer-level questions","preguntas nivel ingeniero","questoes nivel engenheiro")}
      </div>
      <button onClick={()=>setStarted(true)}
        style={{padding:"14px 32px",borderRadius:16,background:`linear-gradient(135deg,${C.cyan},${C.blue2})`,
          border:"none",color:C.bg0,fontSize:14,fontWeight:900,cursor:"pointer",letterSpacing:1,
          boxShadow:`0 0 28px ${C.cyan}44`}}>
        {lbl("COMMENCER =>","START =>","EMPEZAR =>","COMECAR =>")}
      </button>
    </div>
  );

  if(done){
    const trophy=getTrophy(score,total);
    const pct=Math.round(score/total*100);
    return (
      <div style={{textAlign:"center",padding:"20px 10px"}}>
        <div style={{fontSize:68,marginBottom:8}}>{trophy.icon}</div>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:21,color:trophy.color,fontWeight:800,marginBottom:4}}>
          {trophy.label[lang]||trophy.label.fr}
        </div>
        <div style={{fontSize:30,fontWeight:800,color:C.white,marginBottom:4}}>{score}/{total}</div>
        <div style={{fontSize:20,color:trophy.color,fontWeight:800,marginBottom:20}}>{pct}%</div>
        <div style={{height:8,background:"rgba(255,255,255,0.07)",borderRadius:6,marginBottom:20,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${C.cyan},${trophy.color})`,borderRadius:6}}/>
        </div>
        <button onClick={handleRestart}
          style={{width:"100%",padding:"13px",borderRadius:14,background:`rgba(0,229,255,0.12)`,
            border:`1px solid ${C.cyan}55`,color:C.cyan,fontSize:13,fontWeight:800,cursor:"pointer"}}>
          {lbl("Recommencer","Restart","Reiniciar","Recomecar")}
        </button>
      </div>
    );
  }

  const q=qs[idx];
  return (
    <div>
      <div style={{marginBottom:14}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
          <span style={{fontSize:10,color:C.cyan,fontWeight:800}}>
            {lbl("Question","Question","Pregunta","Pergunta")} {idx+1}/{total}
          </span>
          <span style={{fontSize:10,color:C.gold2,fontWeight:800}}>✓ {score}/{idx}</span>
        </div>
        <div style={{height:5,background:"rgba(255,255,255,0.07)",borderRadius:4,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${(idx/total)*100}%`,
            background:`linear-gradient(90deg,${C.cyan},${C.blue2})`,borderRadius:4,transition:"width 0.35s"}}/>
        </div>
      </div>
      <div style={{background:"rgba(6,14,26,0.8)",borderRadius:16,padding:"16px",marginBottom:14,border:`1px solid ${C.border}`}}>
        <div style={{fontSize:13,color:C.white,lineHeight:1.65,fontWeight:600}}>{q.q}</div>
      </div>
      {q.opts.map((opt,i)=>{
        let bg="rgba(10,22,40,0.7)",brd=C.border,col=C.white;
        if(answered){
          if(i===q.ans){bg="rgba(0,230,118,0.12)";brd=C.green;col=C.green;}
          else if(i===sel){bg="rgba(255,23,68,0.12)";brd=C.red;col=C.red;}
        }
        return (
          <button key={i} onClick={()=>handleAnswer(i)}
            style={{width:"100%",padding:"12px 15px",marginBottom:8,borderRadius:13,background:bg,
              border:`1.5px solid ${brd}`,color:col,fontSize:12,textAlign:"left",
              cursor:answered?"default":"pointer",transition:"all 0.2s"}}>
            <span style={{fontWeight:800,marginRight:9,color:C.amber2,fontSize:11}}>{["A","B","C","D"][i]}.</span>{opt}
          </button>
        );
      })}
      {answered && (
        <div style={{padding:"13px",borderRadius:13,
          background:`rgba(${sel===q.ans?"0,230,118":"255,23,68"},0.08)`,
          border:`1.5px solid ${sel===q.ans?C.green:C.red}55`,marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:800,color:sel===q.ans?C.green:C.red,marginBottom:5}}>
            {sel===q.ans
              ?(lbl("✓ Excellente reponse !","✓ Excellent!","✓ Excelente!","✓ Excelente!"))
              :(lbl("✗ Reponse incorrecte","✗ Incorrect","✗ Incorrecta","✗ Incorreta"))}
          </div>
          <div style={{fontSize:11,color:C.steel3,lineHeight:1.7}}>{q.expl}</div>
        </div>
      )}
      {answered && (
        <button onClick={handleNext}
          style={{width:"100%",padding:"14px",borderRadius:15,
            background:`linear-gradient(135deg,${C.cyan},${C.blue2})`,
            border:"none",color:C.bg0,fontSize:13,fontWeight:900,cursor:"pointer",letterSpacing:1}}>
          {idx===total-1
            ?(lbl("VOIR MON SCORE =>","SEE MY SCORE =>","VER PUNTUACION =>","VER PONTUACAO =>"))
            :(lbl("SUIVANT =>","NEXT =>","SIGUIENTE =>","PROXIMO =>"))}
        </button>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — MAERSK NOTPETYA 2017
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"A.P. Moller-Maersk — NotPetya (Juin 2017)",
      teaser:"Plus grande compagnie shipping mondiale — 45 000 PC detruits — 300M$ pertes — 10 jours de chaos",
      what:"Le 27 juin 2017, le ransomware/wiper NotPetya infecte le reseau mondial de Maersk via une mise a jour compromise du logiciel de comptabilite ukrainien MeDoc. En moins de 10 minutes, 45 000 PC et 4 000 serveurs sont detruits dans 130 pays. 17 des 76 terminaux portuaires mondiaux de Maersk sont paralyses. Les systemes ECDIS, de planification cargo et de gestion des escales sont hors service. Pour la premiere fois de leur histoire, des navires Maersk arrivent dans des ports sans connatre leur plan de chargement.",
      cause:"- Vecteur initial : mise a jour logiciel tierce partie compromise (chaine d'approvisionnement)\n- Absence de segmentation reseau : virus propage instantanement a l'ensemble du reseau mondial\n- Systemes IT et OT insuffisamment separes\n- Pas de backup offline des configurations critiques\n- Aucun plan de reponse incident cyber teste\n- Mise a jour securite non appliquee (EternalBlue — vulnerability Windows connue)",
      lessons:"- Resolution IMO MSC-428(98) : Cyber SMS obligatoire ISM Code depuis 2021\n- Segmentation reseau IT/OT stricte — DMZ obligatoire\n- Backup offline des systemes critiques — test restauration regulier\n- Plan de reponse incident cyber teste et simule annuellement\n- Gestion securisee des mises a jour logiciels tiers (supply chain)\n- Formation cyber annuelle de tous les officiers",
      link:"Lien L5 Cyber : Le cas Maersk a transforme la perception de la cybersecurite maritime. Un navire n'est pas juste un objet physique — c'est un noeud numerique connecte. La securite OT (AMS, SCADA, governor) est aussi critique que la securite physique du navire."},
    en:{title:"A.P. Moller-Maersk — NotPetya (June 2017)",
      teaser:"World's largest shipping company — 45,000 PCs destroyed — $300M losses — 10 days of chaos",
      what:"On June 27, 2017, the NotPetya ransomware/wiper infected Maersk's global network via a compromised update of Ukrainian accounting software MeDoc. In less than 10 minutes, 45,000 PCs and 4,000 servers were destroyed across 130 countries. 17 of Maersk's 76 global port terminals were paralyzed. ECDIS, cargo planning and port call management systems were down. For the first time in their history, Maersk vessels arrived in ports not knowing their loading plan.",
      cause:"- Initial vector: compromised third-party software update (supply chain attack)\n- No network segmentation: virus propagated instantly across the global network\n- IT and OT systems insufficiently separated\n- No offline backup of critical configurations\n- No tested cyber incident response plan\n- Security update not applied (EternalBlue — known Windows vulnerability)",
      lessons:"- IMO Resolution MSC-428(98): mandatory Cyber SMS in ISM Code since 2021\n- Strict IT/OT network segmentation — mandatory DMZ\n- Offline backup of critical systems — regular restoration test\n- Annually tested and simulated cyber incident response plan\n- Secure third-party software update management (supply chain)\n- Annual cyber training for all officers",
      link:"L5 Cyber Link: The Maersk case transformed the perception of maritime cybersecurity. A vessel is not just a physical object — it is a connected digital node. OT security (AMS, SCADA, governor) is as critical as the physical safety of the vessel."},
    es:{title:"A.P. Moller-Maersk — NotPetya (Junio 2017)",
      teaser:"Mayor compania shipping mundial — 45.000 PC destruidos — 300M$ perdidas — 10 dias de caos",
      what:"El 27 de junio de 2017, el ransomware NotPetya infecto la red mundial de Maersk via una actualizacion comprometida del software MeDoc. En menos de 10 minutos, 45.000 PC y 4.000 servidores fueron destruidos en 130 paises. 17 terminales portuarias paralizadas. Los sistemas ECDIS y planificacion de carga quedaron fuera de servicio.",
      cause:"- Vector inicial: actualizacion software terceros comprometida (supply chain)\n- Ausencia segmentacion red: virus propagado instantaneamente\n- IT y OT insuficientemente separados\n- Sin backup offline de configuraciones criticas\n- Sin plan respuesta incidente cyber probado\n- Actualizacion seguridad no aplicada (EternalBlue)",
      lessons:"- Resolucion IMO MSC-428(98): Cyber SMS obligatorio ISM Code desde 2021\n- Segmentacion red IT/OT estricta — DMZ obligatoria\n- Backup offline sistemas criticos — test restauracion regular\n- Plan respuesta incidente cyber probado anualmente\n- Formacion cyber anual todos los oficiales",
      link:"Vinculo L5 Cyber: El caso Maersk transformo la percepcion de la ciberseguridad maritima. Un buque es un nodo digital conectado. La seguridad OT es tan critica como la seguridad fisica."},
    pt:{title:"A.P. Moller-Maersk — NotPetya (Junho 2017)",
      teaser:"Maior companhia shipping mundial — 45.000 PC destruidos — 300M$ perdas — 10 dias de caos",
      what:"A 27 de junho de 2017, o ransomware NotPetya infetou a rede mundial da Maersk via uma atualizacao comprometida do software MeDoc. Em menos de 10 minutos, 45.000 PC e 4.000 servidores foram destruidos em 130 paises. 17 terminais portuarios paralisados. Os sistemas ECDIS e planeamento de carga ficaram inoperacionais.",
      cause:"- Vetor inicial: atualizacao software terceiros comprometida (supply chain)\n- Ausencia segmentacao rede: virus propagado instantaneamente\n- IT e OT insuficientemente separados\n- Sem backup offline de configuracoes criticas\n- Sem plano resposta incidente cyber testado\n- Atualizacao seguranca nao aplicada (EternalBlue)",
      lessons:"- Resolucao IMO MSC-428(98): Cyber SMS obrigatorio ISM Code desde 2021\n- Segmentacao rede IT/OT estrita — DMZ obrigatoria\n- Backup offline sistemas criticos — teste restauracao regular\n- Plano resposta incidente cyber testado anualmente\n- Formacao cyber anual todos os oficiais",
      link:"Ligacao L5 Cyber: O caso Maersk transformou a percepcao da ciberseguranca maritima. Um navio e um no digital conectado. A seguranca OT e tao critica quanto a seguranca fisica."},
  };
  const c=d[lang]||d.fr;
  return (
    <div style={{background:"rgba(192,57,43,0.08)",border:`1.5px solid ${C.red}50`,borderRadius:20,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:24}}>⚠️</span>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:800,color:C.red2,marginBottom:2,fontFamily:"'Cinzel',serif"}}>{c.title}</div>
            <div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{c.teaser}</div>
          </div>
          <span style={{fontSize:16,color:C.muted,fontWeight:700}}>{exp?"▲":"▼"}</span>
        </div>
      </div>
      {exp && (
        <div style={{padding:"0 16px 16px"}}>
          <div style={{fontSize:12,color:C.white,lineHeight:1.75,marginBottom:12}}>{c.what}</div>
          <div style={{fontSize:11,color:C.red2,fontWeight:800,marginBottom:6,fontFamily:"'Cinzel',serif",letterSpacing:1}}>CAUSES</div>
          <div style={{fontSize:12,color:C.white,lineHeight:1.75,whiteSpace:"pre-line",marginBottom:12}}>{c.cause}</div>
          <div style={{fontSize:11,color:C.green2,fontWeight:800,marginBottom:6,fontFamily:"'Cinzel',serif",letterSpacing:1}}>
            {lang==="fr"?"LECONS APPRISES":lang==="en"?"LESSONS LEARNED":lang==="es"?"LECCIONES APRENDIDAS":"LICOES APRENDIDAS"}
          </div>
          <div style={{fontSize:12,color:C.white,lineHeight:1.75,whiteSpace:"pre-line",marginBottom:12}}>{c.lessons}</div>
          <div style={{padding:"12px 14px",borderRadius:14,background:"rgba(255,179,0,0.08)",
            border:`1px solid ${C.amber}44`,fontSize:11,color:C.amber2,lineHeight:1.7}}>{c.link}</div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// QUIZ DATA
// ══════════════════════════════════════
const QUIZ={
  fr:[
    {q:"Quelle circulaire IMO definit le cadre cyber maritime obligatoire depuis 2021 ?",
      opts:["IMO MSC-FAL.1/Circ.3 + Resolution MSC-428(98)","SOLAS II-1 Reg.51","MARPOL Annexe VI","STCW Reg. III/1"],
      ans:0,expl:"IMO MSC-FAL.1/Circ.3 (2017) : directives gestion risques cyber. Resolution IMO MSC-428(98) : depuis le 1er janvier 2021, le Cyber SMS doit etre integre dans le Document de conformite ISM de toute compagnie maritime. Verifie par PSC."},
    {q:"Quelle est la difference critique entre IT et OT en securite maritime ?",
      opts:["IT = pont, OT = machine","IT = systemes informatiques admin, OT = systemes controle industriels (AMS/SCADA/governor)","IT = securite, OT = navigation","Synonymes"],
      ans:1,expl:"IT (Information Technology) = systemes administratifs (emails, cartes, serveurs). OT (Operational Technology) = systemes de controle industriels critiques : AMS, SCADA, governor, telegraph, ballast. Une attaque OT peut mettre le navire en danger physique immediat."},
    {q:"NotPetya 2017 a infecte Maersk via :",
      opts:["Email phishing","Mise a jour logiciel tierce partie compromise (MeDoc)","Cle USB","WiFi portuaire"],
      ans:1,expl:"NotPetya s'est propage via une mise a jour compromise du logiciel MeDoc (comptabilite ukrainien). Maersk : 45 000 PC detruits, 300M$ pertes, 17 ports paralyses. Supply chain attack = vecteur majeur a surveiller."},
    {q:"Qu'est-ce que le GPS spoofing et quel est son risque principal ?",
      opts:["Panne GPS — perte de position","Emission faux signaux GPS — position falsifiee — risque collision/echouage","Interference radio naturelle","Bug logiciel ECDIS"],
      ans:1,expl:"Le GPS spoofing emet des signaux GPS falsifies plus puissants que le signal reel. Le navire croit etre a une fausse position. Risques : collision, echouage, derivation dans zone dangereuse. Cas documentes en Mer Noire (2017) et Golfe Persique."},
    {q:"Un audit PSC cyber depuis 2021 verifie principalement :",
      opts:["La vitesse internet du navire","Que le Cyber SMS est integre dans le Document de conformite ISM","Les logiciels installes sur les PC","La puissance du firewall"],
      ans:1,expl:"Depuis 2021, les inspecteurs PSC verifient que la gestion des risques cyber est integree dans le Cyber SMS (partie du Document de conformite ISM). Ils examinent : politiques cyber, procedures incident, formation equipage, backups, audit annuel. Non conforme = retenue."},
  ],
  en:[
    {q:"Which IMO circular defines the mandatory maritime cyber framework since 2021?",
      opts:["IMO MSC-FAL.1/Circ.3 + Resolution MSC-428(98)","SOLAS II-1 Reg.51","MARPOL Annex VI","STCW Reg. III/1"],
      ans:0,expl:"IMO MSC-FAL.1/Circ.3 (2017): cyber risk management guidelines. IMO Resolution MSC-428(98): since January 1, 2021, Cyber SMS must be integrated in the ISM compliance document of any shipping company. Verified by PSC."},
    {q:"What is the critical difference between IT and OT in maritime security?",
      opts:["IT = deck, OT = engine","IT = admin IT systems, OT = industrial control systems (AMS/SCADA/governor)","IT = safety, OT = navigation","Synonyms"],
      ans:1,expl:"IT (Information Technology) = administrative systems (emails, charts, servers). OT (Operational Technology) = critical industrial control systems: AMS, SCADA, governor, telegraph, ballast. An OT attack can put the vessel in immediate physical danger."},
    {q:"NotPetya 2017 infected Maersk via:",
      opts:["Phishing email","Compromised third-party software update (MeDoc)","USB key","Port WiFi"],
      ans:1,expl:"NotPetya spread via a compromised MeDoc software update (Ukrainian accounting). Maersk: 45,000 PCs destroyed, $300M losses, 17 ports paralyzed. Supply chain attack = major vector to monitor."},
    {q:"What is GPS spoofing and its main risk?",
      opts:["GPS failure — position loss","Emitting false GPS signals — falsified position — collision/grounding risk","Natural radio interference","ECDIS software bug"],
      ans:1,expl:"GPS spoofing emits falsified GPS signals stronger than the real signal. The vessel believes it is at a false position. Risks: collision, grounding, deviation into dangerous area. Documented cases in Black Sea (2017) and Persian Gulf."},
    {q:"A PSC cyber audit since 2021 mainly verifies:",
      opts:["Vessel internet speed","That Cyber SMS is integrated in the ISM compliance document","Software installed on PCs","Firewall power"],
      ans:1,expl:"Since 2021, PSC inspectors verify that cyber risk management is integrated in the Cyber SMS (part of ISM compliance document). They review: cyber policies, incident procedures, crew training, backups, annual audit. Non-compliant = detention."},
  ],
  es:[
    {q:"?Que circular IMO define el marco cyber maritimo obligatorio desde 2021?",
      opts:["IMO MSC-FAL.1/Circ.3 + Resolucion MSC-428(98)","SOLAS II-1 Reg.51","MARPOL Anexo VI","STCW Reg. III/1"],
      ans:0,expl:"IMO MSC-FAL.1/Circ.3 (2017): directrices gestion riesgos cyber. Resolucion IMO MSC-428(98): desde el 1 enero 2021, el Cyber SMS debe integrarse en el Documento de conformidad ISM. Verificado por PSC."},
    {q:"?Cual es la diferencia critica entre IT y OT en seguridad maritima?",
      opts:["IT = puente, OT = maquinas","IT = sistemas informaticos admin, OT = sistemas control industrial (AMS/SCADA/governor)","IT = seguridad, OT = navegacion","Sinonimos"],
      ans:1,expl:"IT = sistemas administrativos. OT = sistemas de control industrial criticos: AMS, SCADA, governor, telegrafo, lastre. Un ataque OT puede poner el buque en peligro fisico inmediato."},
    {q:"NotPetya 2017 infecto Maersk via:",
      opts:["Email phishing","Actualizacion software terceros comprometida (MeDoc)","USB","WiFi portuario"],
      ans:1,expl:"NotPetya se propago via una actualizacion comprometida de MeDoc. Maersk: 45.000 PC destruidos, 300M$ perdidas, 17 puertos paralizados."},
    {q:"?Que es el GPS spoofing y cual es su riesgo principal?",
      opts:["Averia GPS","Emision senales GPS falsas — posicion falsificada — riesgo colision/varada","Interferencia radio natural","Bug ECDIS"],
      ans:1,expl:"El GPS spoofing emite senales GPS falsificadas mas fuertes. El buque cree estar en una posicion falsa. Riesgos: colision, varada. Casos documentados en Mar Negro (2017) y Golfo Persico."},
    {q:"Una auditoria PSC cyber desde 2021 verifica principalmente:",
      opts:["Velocidad internet del buque","Que el Cyber SMS esta integrado en el Documento de conformidad ISM","Software instalado en PC","Potencia del firewall"],
      ans:1,expl:"Desde 2021, los inspectores PSC verifican que la gestion cyber esta integrada en el Cyber SMS (parte del Documento de conformidad ISM). No conforme = retencion del buque."},
  ],
  pt:[
    {q:"Qual circular IMO define o quadro cyber maritimo obrigatorio desde 2021?",
      opts:["IMO MSC-FAL.1/Circ.3 + Resolucao MSC-428(98)","SOLAS II-1 Reg.51","MARPOL Anexo VI","STCW Reg. III/1"],
      ans:0,expl:"IMO MSC-FAL.1/Circ.3 (2017): diretrizes gestao riscos cyber. Resolucao IMO MSC-428(98): desde 1 janeiro 2021, o Cyber SMS deve integrar o Documento de conformidade ISM. Verificado pelo PSC."},
    {q:"Qual e a diferenca critica entre IT e OT em seguranca maritima?",
      opts:["IT = ponte, OT = maquinas","IT = sistemas informaticos admin, OT = sistemas controlo industrial (AMS/SCADA/governor)","IT = seguranca, OT = navegacao","Sinonimos"],
      ans:1,expl:"IT = sistemas administrativos. OT = sistemas de controlo industrial criticos: AMS, SCADA, governor, telegrafo, lastro. Um ataque OT pode colocar o navio em perigo fisico imediato."},
    {q:"NotPetya 2017 infetou a Maersk via:",
      opts:["Email phishing","Atualizacao software terceiros comprometida (MeDoc)","USB","WiFi portuario"],
      ans:1,expl:"NotPetya propagou-se via atualizacao comprometida do MeDoc. Maersk: 45.000 PC destruidos, 300M$ perdas, 17 portos paralisados."},
    {q:"O que e o GPS spoofing e qual o seu risco principal?",
      opts:["Falha GPS","Emissao sinais GPS falsos — posicao falsificada — risco colisao/encalhe","Interferencia radio natural","Bug ECDIS"],
      ans:1,expl:"O GPS spoofing emite sinais GPS falsificados mais fortes. O navio acredita estar numa posicao falsa. Riscos: colisao, encalhe. Casos documentados no Mar Negro (2017) e Golfo Persico."},
    {q:"Uma auditoria PSC cyber desde 2021 verifica principalmente:",
      opts:["Velocidade internet do navio","Que o Cyber SMS esta integrado no Documento de conformidade ISM","Software instalado nos PC","Potencia do firewall"],
      ans:1,expl:"Desde 2021, os inspetores PSC verificam que a gestao cyber esta integrada no Cyber SMS (parte do Documento de conformidade ISM). Nao conforme = detencao do navio."},
  ],
};

function QuizComp({ questions, t, lang, onComplete }) {
  const [idx,setIdx]=useState(0);
  const [sel,setSel]=useState(null);
  const [answered,setAnswered]=useState(false);
  const [score,setScore]=useState(0);
  const total=questions.length; const isLast=idx===total-1;
  const q=questions[idx];
  const handleAnswer=(i)=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.ans)setScore(s=>s+1);};
  const handleNext=()=>{const fs=score+(sel===q.ans?1:0);if(isLast){onComplete(fs);return;}setSel(null);setAnswered(false);setIdx(i=>i+1);};
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontSize:10,color:C.muted}}>{t.question} {idx+1} {t.ofQ} {total}</span>
        <span style={{fontSize:10,color:C.gold2,fontWeight:800}}>✓ {score}</span>
      </div>
      <div style={{height:4,background:"rgba(255,255,255,0.07)",borderRadius:4,marginBottom:14,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${(idx/total)*100}%`,background:`linear-gradient(90deg,${C.amber},${C.gold2})`,borderRadius:4,transition:"width 0.3s"}}/>
      </div>
      <div style={{background:"rgba(6,14,26,0.85)",borderRadius:16,padding:"16px",marginBottom:14,border:`1px solid ${C.border}`}}>
        <div style={{fontSize:14,color:C.white,lineHeight:1.65,fontWeight:700}}>{q.q}</div>
      </div>
      {q.opts.map((opt,i)=>{
        let bg="rgba(10,22,40,0.7)",brd=C.border,col=C.white;
        if(answered){
          if(i===q.ans){bg="rgba(0,230,118,0.12)";brd=C.green;col=C.green;}
          else if(i===sel){bg="rgba(255,23,68,0.12)";brd=C.red;col=C.red;}
        }
        return (
          <button key={i} onClick={()=>handleAnswer(i)}
            style={{width:"100%",padding:"13px 15px",marginBottom:8,borderRadius:13,background:bg,
              border:`1.5px solid ${brd}`,color:col,fontSize:13,textAlign:"left",
              cursor:answered?"default":"pointer",transition:"all 0.2s"}}>
            <span style={{fontWeight:800,marginRight:9,color:C.amber2}}>{["A","B","C","D"][i]}.</span>{opt}
          </button>
        );
      })}
      {answered && (
        <div style={{padding:"13px",borderRadius:13,
          background:`rgba(${sel===q.ans?"0,230,118":"255,23,68"},0.08)`,
          border:`1.5px solid ${sel===q.ans?C.green:C.red}55`,marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:800,color:sel===q.ans?C.green:C.red,marginBottom:5}}>
            {sel===q.ans?t.correct:t.wrong}
          </div>
          <div style={{fontSize:11,color:C.steel3,lineHeight:1.7}}>{t.expl} {q.expl}</div>
        </div>
      )}
      {answered && (
        <button onClick={handleNext}
          style={{width:"100%",padding:"15px",borderRadius:15,
            background:`linear-gradient(135deg,${C.amber},${C.gold2})`,
            border:"none",color:C.bg0,fontSize:14,fontWeight:900,cursor:"pointer",letterSpacing:1,
            boxShadow:`0 4px 22px ${C.amber}40`}}>
          {isLast?t.finish:t.next}
        </button>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// CONTENT DATA
// ══════════════════════════════════════
const getContent=(lang)=>{
  const d={
    fr:{
      badge:"Module e7 — UMS & Automatisation · Lecon 5/5 · Premium+ · 280 XP",
      title:"Cybersecurite des Systemes Maritimes",
      intro:"En 2017, Maersk perd 300 millions de dollars en 10 minutes. Pas a cause d'une tempete. A cause d'un malware.\n\nCette lecon couvre les vecteurs d'attaque IT/OT, la simulation d'incident cyber, les defenses reseaux et le cadre reglementaire IMO MSC-FAL.1/Circ.3.",
      p1:"PARTIE 1 — VECTEURS D'ATTAQUE IT/OT",s1t:"Carte des menaces — IT vs OT — surfaces d'attaque",
      s1:"ARCHITECTURE RESEAU MARITIME:\nIT (Information Technology) : reseau administratif\n→ Passerelle, cabines, serveurs ECDIS, emails\nOT (Operational Technology) : reseau industriel\n→ AMS, SCADA, governor, telegraph, ballast, GPS\nDMZ : zone demilitarisee — separation IT/OT\n\nVECTEURS D'ATTAQUE PRINCIPAUX:\nPhishing email → acces initial reseau IT\nCle USB malveillante → infection directe systeme\nSatcom/VPN → interception, man-in-the-middle\nSupply chain → mise a jour logiciel compromise\nAcces distant technicien → backdoor non supprime\n\nCIBLES OT CRITIQUES:\nAMS → fausses alarmes, suppression DMA\nGPS/ECDIS → spoofing position — echouage\nGovernor/Telegraph → prise de controle vitesse\nBallast → gite forcee — risque naufrage",
      p2:"PARTIE 2 — SIMULATION INCIDENT CYBER",s2t:"5 phases : reconnaissance → impact",
      s2:"KILLCHAIN MARITIME (5 phases):\n1. Reconnaissance : scan SATCOM, SHODAN\n2. Phishing : email piege officier — credential vol\n3. Mouvement lateral : IT → DMZ → OT\n4. Persistance : backdoor, logs AMS desactives\n5. Impact : ransomware, GPS spoof, prise controle ME\n\nSOLAS/ISM IMPLICATIONS:\nChaque phase doit avoir un detecteur associe\nIDS/IPS : detection comportements anormaux\nLogs AMS : horodatage de tous les acces\nVDR : enregistrement incidents reseau (48h min)\n\nTEMPS DE DETECTION MOYEN (MARITIME):\n6 a 9 mois avant detection selon rapport Verizon\nL'attaquant est present en silence pendant des mois",
      p3:"PARTIE 3 — DEFENSES RESEAU",s3t:"Firewall — IDS/IPS — segmentation — formation",
      s3:"DEFENSES ESSENTIELLES (IMO MSC-FAL.1/Circ.3):\nFirewall : filtrage paquets IT/OT — liste blanche\nIDS/IPS : detection/prevention intrusion temps reel\nSegmentation : VLANs separes IT/OT/DMZ\nPatch management : maj securite systematiques\nBackup OT : config AMS/SCADA hors ligne\nFormation : sensibilisation phishing — ISM Code\n\nPRINCIPE ZERO TRUST:\nAucun systeme fiable par defaut\nChaque acces verifie et authentifie\n\nGESTION CLES USB:\nPorts USB bloques sur systemes OT\nScan obligatoire tout media externe\nListe blanche appareils autorises uniquement\n\nMDP POLITIQUE:\nAuthentification a 2 facteurs sur systemes critiques\nRotation mots de passe reguliere\nPas de mots de passe constructeur par defaut",
      p4:"PARTIE 4 — CADRE REGLEMENTAIRE IMO",s4t:"MSC-FAL.1/Circ.3 — SMS cyber — PSC 2021",
      s4:"IMO MSC-FAL.1/Circ.3 (2017):\nDirectives gestion risques cyber en mer\n5 fonctions : Identifier / Proteger / Detecter / Repondre / Restaurer\n\nRESOLUTION IMO MSC-428(98):\nDepuis le 1er janvier 2021 :\nCyber SMS obligatoire dans Document conformite ISM\nVerifie lors de chaque audit PSC\n\nCYBER SMS INCLUT:\n→ Inventaire systemes IT/OT critiques\n→ Evaluation risques cyber\n→ Procedures de prevention\n→ Plan de reponse incident\n→ Formation annuelle equipage\n→ Audit cyber annuel\n\nAUDIT PSC CYBER:\nInspecteur verifie integration Cyber SMS\nNon conforme = retenue du navire\nClub P&I : cyber assurance recommandee",
      p5:"EXERCICES PRATIQUES PREMIUM+",p6:"CAS D'ACCIDENT REEL",p7:"BANQUE — 15 QUESTIONS PREMIUM+",
      sumT:"RESUME — LECON e7 L5",
      sumP:["IT = systemes admin | OT = systemes controle industriels (AMS/SCADA/governor)","GPS Spoofing : emission faux signaux — position falsifiee — risque collision","NotPetya 2017 : 45 000 PC Maersk detruits — supply chain attack — 300M$","IMO MSC-FAL.1/Circ.3 : cadre 5 fonctions (Identifier/Proteger/Detecter/Repondre/Restaurer)","Resolution MSC-428(98) : Cyber SMS obligatoire ISM Code depuis 1er janvier 2021","DMZ : zone demilitarisee separant IT et OT — firewall bidirectionnel","Zero Trust : aucun systeme fiable par defaut — chaque acces verifie","Killchain 5 phases : reconnaissance → phishing → lateral → persistance → impact","Backup OT offline obligatoire — test restauration regulier","PSC cyber audit depuis 2021 — non conforme = retenue navire"],
      learnedP:["IT vs OT : distinction critique en cybersecurite maritime","GPS Spoofing, NotPetya, supply chain attacks","IMO MSC-FAL.1/Circ.3 + MSC-428(98) depuis 2021","Defenses : firewall, IDS, segmentation, Zero Trust","Killchain 5 phases et contre-mesures associees"],
    },
    en:{
      badge:"Module e7 — UMS & Automation · Lesson 5/5 · Premium+ · 280 XP",
      title:"Maritime Systems Cybersecurity",
      intro:"In 2017, Maersk lost $300 million in 10 minutes. Not because of a storm. Because of malware.\n\nThis lesson covers IT/OT attack vectors, cyber incident simulation, network defenses and the IMO MSC-FAL.1/Circ.3 regulatory framework.",
      p1:"PART 1 — IT/OT ATTACK VECTORS",s1t:"Threat map — IT vs OT — attack surfaces",
      s1:"MARITIME NETWORK ARCHITECTURE:\nIT (Information Technology): administrative network\n→ Bridge, cabins, ECDIS servers, emails\nOT (Operational Technology): industrial network\n→ AMS, SCADA, governor, telegraph, ballast, GPS\nDMZ: demilitarized zone — IT/OT separation\n\nMAIN ATTACK VECTORS:\nPhishing email → initial IT network access\nMalicious USB → direct system infection\nSatcom/VPN → interception, man-in-the-middle\nSupply chain → compromised software update\nTechnician remote access → unsupported backdoor\n\nCRITICAL OT TARGETS:\nAMS → false alarms, DMA suppression\nGPS/ECDIS → position spoofing — grounding\nGovernor/Telegraph → speed takeover\nBallast → forced list — sinking risk",
      p2:"PART 2 — CYBER INCIDENT SIMULATION",s2t:"5 phases: reconnaissance → impact",
      s2:"MARITIME KILLCHAIN (5 phases):\n1. Reconnaissance: SATCOM scan, SHODAN\n2. Phishing: officer trap email — credential theft\n3. Lateral movement: IT → DMZ → OT\n4. Persistence: backdoor, AMS logs disabled\n5. Impact: ransomware, GPS spoof, ME takeover\n\nSOLAS/ISM IMPLICATIONS:\nEach phase must have an associated detector\nIDS/IPS: abnormal behavior detection\nAMS logs: timestamped all accesses\nVDR: network incident recording (48h min)\n\nAVERAGE DETECTION TIME (MARITIME):\n6 to 9 months before detection per Verizon report\nAttacker is silently present for months",
      p3:"PART 3 — NETWORK DEFENSES",s3t:"Firewall — IDS/IPS — segmentation — training",
      s3:"ESSENTIAL DEFENSES (IMO MSC-FAL.1/Circ.3):\nFirewall: IT/OT packet filtering — whitelist\nIDS/IPS: real-time intrusion detection/prevention\nSegmentation: separate IT/OT/DMZ VLANs\nPatch management: systematic security updates\nOT backup: AMS/SCADA config offline\nTraining: phishing awareness — ISM Code\n\nZERO TRUST PRINCIPLE:\nNo system trusted by default\nEvery access verified and authenticated\n\nUSB KEY MANAGEMENT:\nUSB ports blocked on OT systems\nMandatory scan all external media\nApproved devices whitelist only\n\nPASSWORD POLICY:\n2-factor authentication on critical systems\nRegular password rotation\nNo default manufacturer passwords",
      p4:"PART 4 — IMO REGULATORY FRAMEWORK",s4t:"MSC-FAL.1/Circ.3 — Cyber SMS — PSC 2021",
      s4:"IMO MSC-FAL.1/Circ.3 (2017):\nMaritime cyber risk management guidelines\n5 functions: Identify / Protect / Detect / Respond / Recover\n\nIMO RESOLUTION MSC-428(98):\nSince January 1, 2021:\nMandatory Cyber SMS in ISM compliance document\nVerified at each PSC audit\n\nCYBER SMS INCLUDES:\n→ Critical IT/OT system inventory\n→ Cyber risk assessment\n→ Prevention procedures\n→ Incident response plan\n→ Annual crew training\n→ Annual cyber audit\n\nPSC CYBER AUDIT:\nInspector verifies Cyber SMS integration\nNon-compliant = vessel detention\nP&I Club: cyber insurance recommended",
      p5:"ADVANCED PREMIUM+ EXERCISES",p6:"REAL ACCIDENT CASE",p7:"BANK — 15 PREMIUM+ QUESTIONS",
      sumT:"SUMMARY — LESSON e7 L5",
      sumP:["IT = admin systems | OT = industrial control systems (AMS/SCADA/governor)","GPS Spoofing: false signal emission — falsified position — collision risk","NotPetya 2017: 45,000 Maersk PCs destroyed — supply chain attack — $300M","IMO MSC-FAL.1/Circ.3: 5-function framework (Identify/Protect/Detect/Respond/Recover)","Resolution MSC-428(98): mandatory Cyber SMS in ISM Code since January 1, 2021","DMZ: demilitarized zone separating IT and OT — bidirectional firewall","Zero Trust: no system trusted by default — every access verified","Killchain 5 phases: recon → phishing → lateral → persistence → impact","Mandatory offline OT backup — regular restoration test","PSC cyber audit since 2021 — non-compliant = vessel detention"],
      learnedP:["IT vs OT: critical distinction in maritime cybersecurity","GPS Spoofing, NotPetya, supply chain attacks","IMO MSC-FAL.1/Circ.3 + MSC-428(98) since 2021","Defenses: firewall, IDS, segmentation, Zero Trust","5-phase killchain and associated countermeasures"],
    },
    es:{
      badge:"Modulo e7 — UMS & Automatizacion · Leccion 5/5 · Premium+ · 280 XP",
      title:"Ciberseguridad de los Sistemas Maritimos",
      intro:"En 2017, Maersk perdio 300 millones de dolares en 10 minutos. No por una tormenta. Por un malware.\n\nEsta leccion cubre los vectores de ataque IT/OT, la simulacion de incidentes cyber, las defensas de red y el marco regulatorio IMO MSC-FAL.1/Circ.3.",
      p1:"PARTE 1 — VECTORES DE ATAQUE IT/OT",s1t:"Mapa amenazas — IT vs OT — superficies de ataque",
      s1:"IT = red administrativa (puente, camarotes, ECDIS)\nOT = red industrial (AMS, SCADA, governor, telegrafo, lastro)\nDMZ = zona desmilitarizada separacion IT/OT\n\nVECTORES PRINCIPALES:\nPhishing → acceso inicial red IT\nUSB malicioso → infeccion directa\nSatcom/VPN → intercepcion\nSupply chain → actualizacion comprometida",
      p2:"PARTE 2 — SIMULACION INCIDENTE CYBER",s2t:"5 fases: reconocimiento → impacto",
      s2:"KILLCHAIN MARITIMA (5 fases):\n1. Reconocimiento 2. Phishing 3. Movimiento lateral\n4. Persistencia 5. Impacto (ransomware/spoofing)\n\nTIEMPO DETECCION PROMEDIO: 6-9 meses (Verizon)",
      p3:"PARTE 3 — DEFENSAS DE RED",s3t:"Firewall — IDS/IPS — segmentacion — formacion",
      s3:"DEFENSAS ESENCIALES (IMO MSC-FAL.1/Circ.3):\nFirewall | IDS/IPS | Segmentacion IT/OT/DMZ\nPatch management | Backup OT offline | Formacion\n\nZERO TRUST: ningun sistema confiable por defecto",
      p4:"PARTE 4 — MARCO REGULATORIO IMO",s4t:"MSC-FAL.1/Circ.3 — SMS cyber — PSC 2021",
      s4:"IMO MSC-FAL.1/Circ.3 (2017) : 5 funciones\nIdentificar / Proteger / Detectar / Responder / Restaurar\n\nRESOLUCION MSC-428(98):\nCyber SMS obligatorio en ISM Code desde 1 enero 2021\nAuditoria PSC cyber — no conforme = retencion",
      p5:"EJERCICIOS AVANZADOS PREMIUM+",p6:"CASO REAL",p7:"BANCO — 15 PREGUNTAS PREMIUM+",
      sumT:"RESUMEN — LECCION e7 L5",
      sumP:["IT = admin | OT = control industrial (AMS/SCADA/governor)","GPS Spoofing: senales falsas — posicion falsificada — riesgo colision","NotPetya 2017: 45.000 PC Maersk destruidos — supply chain — 300M$","IMO MSC-FAL.1/Circ.3: 5 funciones","MSC-428(98): Cyber SMS obligatorio ISM Code desde enero 2021","DMZ: separacion IT/OT — firewall bidireccional","Zero Trust: ningun sistema confiable por defecto","Killchain 5 fases","Backup OT offline obligatorio","PSC cyber desde 2021 — no conforme = retencion"],
      learnedP:["IT vs OT: distincion critica","GPS Spoofing, NotPetya, supply chain","IMO MSC-FAL.1/Circ.3 + MSC-428(98) desde 2021","Defensas: firewall, IDS, segmentacion, Zero Trust","Killchain 5 fases y contramedidas"],
    },
    pt:{
      badge:"Modulo e7 — UMS & Automatizacao · Licao 5/5 · Premium+ · 280 XP",
      title:"Ciberseguranca dos Sistemas Maritimos",
      intro:"Em 2017, a Maersk perdeu 300 milhoes de dolares em 10 minutos. Nao por causa de uma tempestade. Por causa de um malware.\n\nEsta licao cobre os vetores de ataque IT/OT, a simulacao de incidentes cyber, as defesas de rede e o quadro regulatorio IMO MSC-FAL.1/Circ.3.",
      p1:"PARTE 1 — VETORES DE ATAQUE IT/OT",s1t:"Mapa ameacas — IT vs OT — superficies de ataque",
      s1:"IT = rede administrativa (ponte, cabines, ECDIS)\nOT = rede industrial (AMS, SCADA, governor, telegrafo, lastro)\nDMZ = zona desmilitarizada separacao IT/OT\n\nVETORES PRINCIPAIS:\nPhishing → acesso inicial rede IT\nUSB malicioso → infecao direta\nSatcom/VPN → intercecao\nSupply chain → atualizacao comprometida",
      p2:"PARTE 2 — SIMULACAO INCIDENTE CYBER",s2t:"5 fases: reconhecimento → impacto",
      s2:"KILLCHAIN MARITIMA (5 fases):\n1. Reconhecimento 2. Phishing 3. Movimento lateral\n4. Persistencia 5. Impacto (ransomware/spoofing)\n\nTEMPO DETECAO MEDIO: 6-9 meses (Verizon)",
      p3:"PARTE 3 — DEFESAS DE REDE",s3t:"Firewall — IDS/IPS — segmentacao — formacao",
      s3:"DEFESAS ESSENCIAIS (IMO MSC-FAL.1/Circ.3):\nFirewall | IDS/IPS | Segmentacao IT/OT/DMZ\nPatch management | Backup OT offline | Formacao\n\nZERO TRUST: nenhum sistema de confianca por defeito",
      p4:"PARTE 4 — QUADRO REGULATORIO IMO",s4t:"MSC-FAL.1/Circ.3 — SMS cyber — PSC 2021",
      s4:"IMO MSC-FAL.1/Circ.3 (2017) : 5 funcoes\nIdentificar / Proteger / Detetar / Responder / Restaurar\n\nRESOLUCAO MSC-428(98):\nCyber SMS obrigatorio no ISM Code desde 1 janeiro 2021\nAuditoria PSC cyber — nao conforme = detencao",
      p5:"EXERCICIOS AVANCADOS PREMIUM+",p6:"CASO REAL",p7:"BANCO — 15 QUESTOES PREMIUM+",
      sumT:"RESUMO — LICAO e7 L5",
      sumP:["IT = admin | OT = controlo industrial (AMS/SCADA/governor)","GPS Spoofing: sinais falsos — posicao falsificada — risco colisao","NotPetya 2017: 45.000 PC Maersk destruidos — supply chain — 300M$","IMO MSC-FAL.1/Circ.3: 5 funcoes","MSC-428(98): Cyber SMS obrigatorio ISM Code desde janeiro 2021","DMZ: separacao IT/OT — firewall bidirecional","Zero Trust: nenhum sistema de confianca por defeito","Killchain 5 fases","Backup OT offline obrigatorio","PSC cyber desde 2021 — nao conforme = detencao"],
      learnedP:["IT vs OT: distincao critica","GPS Spoofing, NotPetya, supply chain","IMO MSC-FAL.1/Circ.3 + MSC-428(98) desde 2021","Defesas: firewall, IDS, segmentacao, Zero Trust","Killchain 5 fases e contramedidas"],
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN EXPORT — ARCHITECTURE L1 EXACTE
// ══════════════════════════════════════
export default function LessonE7_L5({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  useEffect(()=>{if(typeof window!=="undefined")window.__MAP_LANG__=lang;},[lang]);
  const t=T[lang]||T.fr;
  const quiz=QUIZ[lang]||QUIZ.fr;
  const lc=getContent(lang);
  const [phase,setPhase]=useState("content");
  const [quizScore,setQuizScore]=useState(0);
  const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  const trophy=getTrophy(quizScore,5);

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",
      background:`linear-gradient(160deg,${C.bg0} 0%,${C.bg1} 40%,${C.bg2} 100%)`,
      color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      {/* HEADER — architecture exacte L1 */}
      <div style={{position:"relative",zIndex:100,background:"rgba(3,7,15,0.97)",
        backdropFilter:"blur(16px)",borderBottom:`1px solid ${C.border}`}}>
        <div style={{height:56,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack}
            style={{background:"rgba(0,229,255,0.08)",border:`1px solid ${C.border}`,
              borderRadius:11,padding:"8px 14px",color:C.cyan,fontSize:13,fontWeight:800,cursor:"pointer"}}>
            {t.back}
          </button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.cyan,letterSpacing:1.5,fontFamily:"'Cinzel',serif",fontWeight:800}}>
              ⚓ {t.module}
            </div>
            <div style={{fontSize:10,color:C.muted}}>
              {lang==="fr"?"Lecon 5/5":lang==="en"?"Lesson 5/5":lang==="es"?"Leccion 5/5":"Licao 5/5"}
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{padding:"3px 9px",borderRadius:20,background:"rgba(255,179,0,0.15)",
              border:`1px solid ${C.amber}44`,fontSize:9,color:C.amber,fontWeight:800,letterSpacing:1}}>
              PREMIUM+
            </span>
            <span style={{fontSize:11,color:C.cyan,fontFamily:"'Cinzel',serif",fontWeight:700}}>
              {progress}%
            </span>
          </div>
        </div>
        <div style={{height:3,background:"rgba(0,229,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,
            background:`linear-gradient(90deg,${C.cyan},${C.amber})`,
            transition:"width 0.5s ease",boxShadow:`0 0 8px ${C.cyan}`}}/>
        </div>
      </div>

      {/* SCROLL */}
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 50px",position:"relative",zIndex:1,
        opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(16px)",transition:"all 0.55s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,
              marginBottom:12,background:"rgba(0,229,255,0.1)",border:`1px solid ${C.cyan}44`,
              fontSize:10,color:C.cyan,fontWeight:700}}>
              {lc.badge}
            </div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:21,fontWeight:800,color:C.white,
              lineHeight:1.3,margin:"0 0 18px",textShadow:`0 0 40px ${C.cyan}30`}}>
              {lc.title}
            </h1>
            <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${C.cyan}44`,
              borderLeft:`3px solid ${C.cyan}`,borderRadius:20,padding:"16px",marginBottom:16}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.88)",lineHeight:1.9,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </div>

            {[
              {icon:"🌐",p:lc.p1,s:lc.s1t,content:lc.s1,color:C.red2,
                svg:<AttackVectorSVG lang={lang}/>,
                svgLabel:lang==="fr"?"CARTE VECTEURS — INTERACTIF":lang==="en"?"ATTACK MAP — INTERACTIVE":lang==="es"?"MAPA ATAQUES — INTERACTIVO":"MAPA ATAQUES — INTERATIVO"},
              {icon:"💥",p:lc.p2,s:lc.s2t,content:lc.s2,color:C.orange,
                svg:<CyberIncidentSVG lang={lang}/>,
                svgLabel:lang==="fr"?"KILLCHAIN MARITIME — SIMULATEUR":lang==="en"?"MARITIME KILLCHAIN — SIMULATOR":lang==="es"?"KILLCHAIN MARITIMA — SIMULADOR":"KILLCHAIN MARITIMA — SIMULADOR"},
              {icon:"🛡️",p:lc.p3,s:lc.s3t,content:lc.s3,color:C.green,
                svg:<DefensesSVG lang={lang}/>,
                svgLabel:lang==="fr"?"DEFENSES — INTERACTIF":lang==="en"?"DEFENSES — INTERACTIVE":lang==="es"?"DEFENSAS — INTERACTIVO":"DEFESAS — INTERATIVO"},
              {icon:"📋",p:lc.p4,s:lc.s4t,content:lc.s4,color:C.cyan,
                svg:<IMOChecklistSVG lang={lang}/>,
                svgLabel:"IMO MSC-FAL.1/Circ.3 — AUDIT CYBER"},
            ].map((sec,i)=>(
              <div key={i}>
                <SL icon={sec.icon} text={sec.p} color={sec.color}/>
                <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${sec.color}22`,
                  borderRadius:20,padding:"16px",marginBottom:12}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                    <span style={{fontSize:22}}>{sec.icon}</span>
                    <span style={{fontSize:14,fontWeight:800,color:C.white}}>{sec.s}</span>
                  </div>
                  <div style={{fontSize:13,color:"rgba(176,190,197,0.9)",lineHeight:1.9,whiteSpace:"pre-line"}}>{sec.content}</div>
                </div>
                <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${sec.color}33`,
                  borderRadius:20,padding:"16px",marginBottom:18}}>
                  <div style={{fontSize:10,color:sec.color,letterSpacing:2,fontFamily:"'Cinzel',serif",
                    marginBottom:12,fontWeight:800}}>
                    {sec.icon} {sec.svgLabel}
                  </div>
                  {sec.svg}
                </div>
              </div>
            ))}

            <SL icon="🎯" text={lc.p5} color={C.gold2}/>
            <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${C.amber}55`,
              borderRadius:20,padding:"16px",marginBottom:18}}>
              <Exercise1 lang={lang} t={t}/>
            </div>

            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:18}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p7} color={C.purple2}/>
            <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${C.purple2}44`,
              borderRadius:20,padding:"16px",marginBottom:18}}>
              <QuestionBank lang={lang}/>
            </div>

            {/* RESUME — toujours visible */}
            <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${C.cyan}33`,
              borderRadius:20,padding:"16px",marginBottom:18}}>
              <div style={{fontSize:11,color:C.cyan,letterSpacing:2.5,fontFamily:"'Cinzel',serif",
                marginBottom:14,fontWeight:800}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"6px 0",
                  borderBottom:i<lc.sumP.length-1?"1px solid rgba(0,229,255,0.08)":"none",
                  fontSize:12,color:C.white}}>
                  <span style={{color:C.cyan,fontWeight:900,flexShrink:0,marginTop:1}}>✓</span>{pt}
                </div>
              ))}
            </div>

            <button onClick={()=>setPhase("quiz")}
              style={{width:"100%",padding:"18px 0",border:"none",borderRadius:18,
                background:`linear-gradient(135deg,${C.cyan},${C.amber})`,
                fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:900,letterSpacing:2,
                color:C.bg0,cursor:"pointer",boxShadow:`0 10px 40px rgba(0,229,255,0.35)`,marginTop:4}}>
              {t.startQuiz}
            </button>
            <div style={{textAlign:"center",fontSize:11,color:C.dim,marginTop:10}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:22}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:19,fontWeight:800,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz — Cybersecurite Maritime":lang==="en"?"Quiz — Maritime Cybersecurity":lang==="es"?"Quiz — Ciberseguridad Maritima":"Quiz — Ciberseguranca Maritima"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · e7 L5</div>
            </div>
            <QuizComp questions={quiz} t={t} lang={lang}
              onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),400);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:22}}>
              <div style={{fontSize:76,marginBottom:10}}>{trophy.icon}</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:800,color:trophy.color,marginBottom:6}}>
                {trophy.label[lang]||trophy.label.fr}
              </div>
              <div style={{fontSize:32,fontWeight:900,color:C.white,marginBottom:4}}>{quizScore}/5</div>
              <div style={{fontSize:20,color:trophy.color,fontWeight:800,marginBottom:18}}>
                {Math.round(quizScore/5*100)}%
              </div>
              <div style={{height:8,background:"rgba(255,255,255,0.07)",borderRadius:6,
                margin:"0 24px 20px",overflow:"hidden"}}>
                <div style={{height:"100%",width:`${quizScore/5*100}%`,
                  background:`linear-gradient(90deg,${C.cyan},${trophy.color})`,
                  borderRadius:6,transition:"width 0.9s ease"}}/>
              </div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"9px 22px",
                borderRadius:20,background:`rgba(0,229,255,0.1)`,border:`1px solid ${C.cyan}44`,
                fontSize:14,color:C.cyan,fontWeight:800}}>
                +{quizScore>=4?280:quizScore===3?170:100} {t.xp} ⭐
              </div>
            </div>
            {/* MODULE COMPLETE BADGE */}
            <div style={{textAlign:"center",marginBottom:18,padding:"16px",
              background:"rgba(0,229,255,0.06)",border:`1.5px solid ${C.cyan}55`,borderRadius:20}}>
              <div style={{fontSize:40,marginBottom:8}}>🏴‍☠️⚙️🎓</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:800,color:C.cyan,marginBottom:4,letterSpacing:1}}>
                {lang==="fr"?"MODULE e7 COMPLETE !":lang==="en"?"MODULE e7 COMPLETE!":lang==="es"?"MODULO e7 COMPLETADO!":"MODULO e7 CONCLUIDO!"}
              </div>
              <div style={{fontSize:11,color:C.muted}}>
                {lang==="fr"?"UMS · PLC/DCS/SCADA · Automatisation ME · Alarmes AMS · Cybersecurite"
                :lang==="en"?"UMS · PLC/DCS/SCADA · ME Automation · AMS Alarms · Cybersecurity"
                :lang==="es"?"UMS · PLC/DCS/SCADA · Automatizacion ME · Alarmas AMS · Ciberseguridad"
                :"UMS · PLC/DCS/SCADA · Automatizacao ME · Alarmes AMS · Ciberseguranca"}
              </div>
            </div>
            <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${C.cyan}33`,
              borderRadius:20,padding:"16px",marginBottom:18}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:12,fontFamily:"'Cinzel',serif",
                letterSpacing:1,fontWeight:700}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",
                  borderBottom:i<lc.learnedP.length-1?"1px solid rgba(0,229,255,0.08)":"none",
                  fontSize:12,color:C.white}}>
                  <span style={{color:C.cyan,fontWeight:900}}>✓</span>{pt}
                </div>
              ))}
            </div>
            <button onClick={onComplete}
              style={{width:"100%",padding:"16px 0",border:"none",borderRadius:18,
                background:`linear-gradient(135deg,${C.cyan},${C.amber})`,
                fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:900,letterSpacing:2,
                color:C.bg0,cursor:"pointer",boxShadow:`0 8px 30px rgba(0,229,255,0.3)`,marginBottom:12}}>
              {lang==="fr"?"RETOUR AU MODULE =>":lang==="en"?"BACK TO MODULE =>":lang==="es"?"VOLVER AL MODULO =>":"VOLTAR AO MODULO =>"}
            </button>
            <button onClick={onBack}
              style={{width:"100%",padding:"12px 0",border:`1px solid rgba(0,229,255,0.15)`,
                borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,
                color:C.muted,cursor:"pointer"}}>
              {t.backDash}
            </button>
          </div>}

        </div>
      </div>
    </div>
  );
}
