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
  fr:{ back:"◀ Retour", module:"Module Machine", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪", scoreGood:"Continue ! 📚", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Engine Module", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪", scoreGood:"Keep going! 📚", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Módulo Máquinas", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪", scoreGood:"¡Sigue! 📚", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Módulo Máquinas", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪", scoreGood:"Continue! 📚", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 — MARPOL 6 ANNEXES
// ══════════════════════════════════════
function MarpolAnnexesSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const annexes = [
    { id:"I", num:"I", color:C.red, icon:"🛢️",
      label:{fr:"Hydrocarbures",en:"Oil",es:"Hidrocarburos",pt:"Hidrocarbonetos"},
      desc:{fr:"Huile · HFO · MDO · eau de cale\nLimite rejet : 15 ppm\nSéparateur obligatoire\nInterdit dans zones spéciales\nOil Record Book obligatoire\nSanctions : amendes + arrestation navire",en:"Oil · HFO · MDO · bilge water\nDischarge limit: 15 ppm\nSeparator mandatory\nProhibited in special areas\nOil Record Book mandatory\nPenalties: fines + vessel arrest",es:"Aceite · HFO · MDO · agua de sentina\nLímite de descarga: 15 ppm\nSeparador obligatorio\nProhibido en zonas especiales\nLibro de registro de hidrocarburos obligatorio",pt:"Óleo · HFO · MDO · água de porão\nLimite descarga: 15 ppm\nSeparador obrigatório\nProibido em zonas especiais\nLivro de Registo de Hidrocarbonetos obrigatório"} },
    { id:"II", num:"II", color:C.purple, icon:"⚗️",
      label:{fr:"Substances liquides nocives",en:"Noxious liquid substances",es:"Sustancias nocivas líquidas",pt:"Substâncias nocivas líquidas"},
      desc:{fr:"Produits chimiques en vrac\nCatégories X, Y, Z selon toxicité\nNavires-citernes chimiquiers\nNettoiement citernes réglementé\nCargo Record Book II obligatoire",en:"Bulk liquid chemicals\nCategories X, Y, Z by toxicity\nChemical tankers\nTank washing regulated\nCargo Record Book II mandatory",es:"Productos químicos a granel\nCategorías X, Y, Z según toxicidad\nButaneros químicos\nLimpieza de tanques regulada",pt:"Químicos a granel\nCategorias X, Y, Z por toxicidade\nNavios-tanque químicos\nLimpeza de tanques regulada"} },
    { id:"III", num:"III", color:C.orange, icon:"📦",
      label:{fr:"Marchandises dangereuses",en:"Harmful substances in packages",es:"Mercancías peligrosas",pt:"Substâncias prejudiciais em embalagens"},
      desc:{fr:"Marchandises dangereuses en colis\nCode IMDG (code maritime des marchandises dangereuses)\nÉtiquetage · Ségrégation · Arrimage\nDocumentation obligatoire\nInterdit de jeter par-dessus bord",en:"Dangerous goods in packages\nIMDG Code (International Maritime Dangerous Goods)\nLabeling · Segregation · Stowage\nDocumentation mandatory\nProhibited to throw overboard",es:"Mercancías peligrosas en embalajes\nCódigo IMDG\nEtiquetado · Segregación · Estiba\nDocumentación obligatoria",pt:"Mercadorias perigosas em embalagens\nCódigo IMDG\nRotulagem · Segregação · Estiva\nDocumentação obrigatória"} },
    { id:"IV", num:"IV", color:C.teal, icon:"🚽",
      label:{fr:"Eaux usées",en:"Sewage",es:"Aguas residuales",pt:"Águas residuais"},
      desc:{fr:"Eaux noires (toilettes) + eaux grises\nInterdit < 3 milles côtes sans traitement\nInterdit < 12 milles sans broyeur/désinfection\nStation épuration obligatoire (>400 pers.)\nZones spéciales : Antarctique, Baltique",en:"Black water (toilets) + grey water\nProhibited < 3 miles coast untreated\nProhibited < 12 miles without macerator/disinfection\nSewage treatment mandatory (>400 persons)\nSpecial areas: Antarctic, Baltic",es:"Aguas negras (aseos) + aguas grises\nProhibido < 3 millas costa sin tratar\nProhibido < 12 millas sin triturador/desinfección\nDepuradora obligatoria (>400 personas)",pt:"Águas negras (casas de banho) + águas cinzentas\nProibido < 3 milhas costa sem tratamento\nProibido < 12 milhas sem triturador/desinfeção\nEstação de tratamento obrigatória (>400 pessoas)"} },
    { id:"V", num:"V", color:C.green, icon:"🗑️",
      label:{fr:"Ordures",en:"Garbage",es:"Basuras",pt:"Lixo"},
      desc:{fr:"Plastiques : INTERDIT PARTOUT en mer\nRestes alimentaires : > 3 ou 12 milles\nAutres déchets : réglementés\nGarbage Management Plan obligatoire\nGarbage Record Book obligatoire\nZones spéciales : interdiction totale",en:"Plastics: PROHIBITED EVERYWHERE at sea\nFood waste: > 3 or 12 miles\nOther waste: regulated\nGarbage Management Plan mandatory\nGarbage Record Book mandatory\nSpecial areas: total prohibition",es:"Plásticos: PROHIBIDO EN TODAS PARTES en el mar\nRestos alimentarios: > 3 o 12 millas\nGarbage Management Plan obligatorio\nGarbage Record Book obligatorio",pt:"Plásticos: PROIBIDO EM TODO LADO no mar\nRestos alimentares: > 3 ou 12 milhas\nGarbage Management Plan obrigatório\nGarbage Record Book obrigatório"} },
    { id:"VI", num:"VI", color:C.gold2, icon:"💨",
      label:{fr:"Pollution atmosphérique",en:"Air pollution",es:"Contaminación atmosférica",pt:"Poluição atmosférica"},
      desc:{fr:"SOx : 0,5% mondial · 0,1% ECA (depuis 2020)\nNOx : Tier I/II/III selon zone\nPM : particules fines\nCFC/Halons : interdits\nVOC : contrôlés dans certains ports\nIAPP Certificate obligatoire\nScrubbers ou LSFO en ECA",en:"SOx: 0.5% global · 0.1% ECA (since 2020)\nNOx: Tier I/II/III by zone\nPM: fine particles\nCFCs/Halons: prohibited\nVOC: controlled in some ports\nIAPP Certificate mandatory\nScubbers or LSFO in ECA",es:"SOx: 0,5% mundial · 0,1% ECA (desde 2020)\nNOx: Nivel I/II/III según zona\nPM: partículas finas\nCFCs/Halones: prohibidos\nCertificado IAPP obligatorio",pt:"SOx: 0,5% mundial · 0,1% ECA (desde 2020)\nNOx: Tier I/II/III por zona\nPM: partículas finas\nCFCs/Halons: proibidos\nCertificado IAPP obrigatório"} },
  ];
  const sel_ = sel ? annexes.find(a=>a.id===sel) : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7,marginBottom:10}}>
        {annexes.map(a=>(
          <div key={a.id} onClick={()=>setSel(sel===a.id?null:a.id)}
            style={{padding:"10px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===a.id?`${a.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===a.id?a.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:4}}>{a.icon}</div>
            <div style={{fontSize:9,color:a.color,fontWeight:700}}>
              {lang==="fr"?"Ann.":lang==="en"?"Ann.":lang==="es"?"An.":"An."} {a.num}
            </div>
            <div style={{fontSize:8,color:sel===a.id?a.color:C.muted,lineHeight:1.3,marginTop:2}}>
              {(a.label[lang]||a.label.fr).split(' ').slice(0,2).join(' ')}
            </div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {lang==="fr"?"Annexe":lang==="en"?"Annex":lang==="es"?"Anexo":"Anexo"} {sel_.id} — {sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>:<div style={{textAlign:"center",padding:"12px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche une annexe pour les détails":lang==="en"?"Tap an annex for details":lang==="es"?"Toca un anexo para detalles":"Toque um anexo para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — ECA WORLD MAP (interactive)
// ══════════════════════════════════════
function ECAMapSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const ecaZones = [
    { id:"baltic", label:{fr:"Mer Baltique",en:"Baltic Sea",es:"Mar Báltico",pt:"Mar Báltico"},
      color:"#e74c3c", points:"168,48 178,44 192,46 196,52 194,60 180,64 168,60",
      sox:"0.1%", nox:"Tier III", since:"2006/2021",
      desc:{fr:"Première ECA SOx au monde (2006)\nSOx : 0,1% · NOx : Tier III depuis 2021\nSensibilité écologique extrême\nTrafic intense : ports Hambourg, Rotterdam, Stockholm",en:"First SOx ECA in the world (2006)\nSOx: 0.1% · NOx: Tier III since 2021\nExtreme ecological sensitivity\nHeavy traffic: Hamburg, Rotterdam, Stockholm ports",es:"Primera ECA SOx del mundo (2006)\nSOx: 0,1% · NOx: Nivel III desde 2021\nSensibilidad ecológica extrema",pt:"Primeira ECA SOx do mundo (2006)\nSOx: 0,1% · NOx: Tier III desde 2021\nSensibilidade ecológica extrema"} },
    { id:"northsea", label:{fr:"Mer du Nord",en:"North Sea",es:"Mar del Norte",pt:"Mar do Norte"},
      color:"#e67e22", points:"150,52 165,48 168,60 165,72 150,72 140,64",
      sox:"0.1%", nox:"Tier III", since:"2007/2021",
      desc:{fr:"ECA SOx depuis 2007, NOx Tier III depuis 2021\nUne des routes maritimes les plus fréquentées\nPorts : Rotterdam, Anvers, Hambourg, Felixstowe\nContrôles stricts par les autorités portuaires",en:"SOx ECA since 2007, NOx Tier III since 2021\nOne of the busiest shipping routes\nPorts: Rotterdam, Antwerp, Hamburg, Felixstowe\nStrict controls by port authorities",es:"ECA SOx desde 2007, NOx Nivel III desde 2021\nUna de las rutas marítimas más transitadas",pt:"ECA SOx desde 2007, NOx Tier III desde 2021\nUma das rotas marítimas mais movimentadas"} },
    { id:"namerica", label:{fr:"Amérique du Nord",en:"North America",es:"América del Norte",pt:"América do Norte"},
      color:"#3498db", points:"60,58 100,52 105,75 90,88 60,85 45,72",
      sox:"0.1%", nox:"Tier III", since:"2012/2016",
      desc:{fr:"200 milles nautiques des côtes USA + Canada\nSOx 0,1% depuis 2012 · NOx Tier III depuis 2016\nContrôles stricts USCG (US Coast Guard)\nAmende jusqu'à $1 million par infraction\nInclut Golfe du Mexique (côte US)",en:"200 nautical miles from US + Canada coasts\nSOx 0.1% since 2012 · NOx Tier III since 2016\nStrict USCG (US Coast Guard) controls\nFines up to $1 million per violation\nIncludes Gulf of Mexico (US coast)",es:"200 millas náuticas de costas EE.UU. + Canadá\nSOx 0,1% desde 2012 · NOx Nivel III desde 2016\nControles estrictos USCG\nMultas hasta $1 millón por infracción",pt:"200 milhas náuticas das costas EUA + Canadá\nSOx 0,1% desde 2012 · NOx Tier III desde 2016\nControlos rigorosos USCG\nMultas até $1 milhão por infração"} },
    { id:"uscaribb", label:{fr:"Caraïbes US",en:"US Caribbean",es:"Caribe EE.UU.",pt:"Caraíbas EUA"},
      color:"#9b59b6", points:"85,82 105,80 108,92 90,98 75,94",
      sox:"0.1%", nox:"Tier III", since:"2012/2016",
      desc:{fr:"Zone Caraïbes associée à l'ECA Nord-Amérique\nPortoRico + Iles Vierges américaines\nMêmes règles que l'ECA Amérique du Nord\nTourisme maritime important → contrôles renforcés",en:"Caribbean zone associated with North America ECA\nPuerto Rico + US Virgin Islands\nSame rules as North America ECA\nSignificant cruise traffic → enhanced controls",es:"Zona Caribe asociada a la ECA de América del Norte\nPuerto Rico + Islas Vírgenes americanas\nMismas reglas que la ECA de América del Norte",pt:"Zona Caraíbas associada à ECA América do Norte\nPorto Rico + Ilhas Virgens americanas\nMesmas regras que a ECA América do Norte"} },
    { id:"norway", label:{fr:"Norvège",en:"Norway",es:"Noruega",pt:"Noruega"},
      color:"#1abc9c", points:"162,38 172,34 178,44 168,48 160,46",
      sox:"0.1%", nox:"Tier II", since:"2019",
      desc:{fr:"Fjords norvégiens — sensibilité écologique extrême\nSOx 0,1% · NOx Tier II\nTourisme fjords = contraintes strictes\nCroisières : émissions très contrôlées\nCertains fjords : énergie électrique à quai obligatoire",en:"Norwegian fjords — extreme ecological sensitivity\nSOx 0.1% · NOx Tier II\nFjord tourism = strict constraints\nCruises: highly controlled emissions\nSome fjords: mandatory shore power",es:"Fiordos noruegos — sensibilidad ecológica extrema\nSOx 0,1% · NOx Nivel II\nTurismo fjords = restricciones estrictas",pt:"Fiordes noruegueses — sensibilidade ecológica extrema\nSOx 0,1% · NOx Tier II\nTurismo fiordes = restrições estritas"} },
  ];

  const sel_ = sel ? ecaZones.find(z=>z.id===sel) : null;

  return (
    <div>
      {/* Legend */}
      <div style={{display:"flex",gap:8,marginBottom:8,flexWrap:"wrap"}}>
        <div style={{display:"flex",alignItems:"center",gap:4}}>
          <div style={{width:10,height:10,borderRadius:2,background:"rgba(26,111,212,0.4)",border:`1px solid ${C.blue2}`}}/>
          <span style={{fontSize:9,color:C.blue2}}>{lang==="fr"?"Océan mondial (0,5% SOx)":lang==="en"?"Global ocean (0.5% SOx)":lang==="es"?"Océano (0,5% SOx)":"Oceano global (0,5% SOx)"}</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:4}}>
          <div style={{width:10,height:10,borderRadius:2,background:"rgba(231,76,60,0.4)",border:`1px solid ${C.red}`}}/>
          <span style={{fontSize:9,color:C.red}}>{lang==="fr"?"Zone ECA (0,1% SOx)":lang==="en"?"ECA Zone (0.1% SOx)":lang==="es"?"Zona ECA (0,1% SOx)":"Zona ECA (0,1% SOx)"}</span>
        </div>
      </div>

      <svg width="290" height="175" viewBox="0 0 290 175">
        <rect width="290" height="175" fill="#051525" rx="8"/>

        {/* Ocean background */}
        <rect x="5" y="5" width="280" height="165" fill="rgba(26,111,212,0.15)" rx="6"/>

        {/* Simplified world continents */}
        {/* North America */}
        <path d="M45,30 L95,25 L110,45 L115,80 L95,95 L65,90 L40,70 Z"
          fill="rgba(30,80,30,0.6)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
        {/* South America */}
        <path d="M70,100 L95,98 L100,130 L85,155 L65,150 L60,125 Z"
          fill="rgba(30,80,30,0.6)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
        {/* Europe */}
        <path d="M140,32 L175,28 L185,40 L180,65 L160,70 L140,60 Z"
          fill="rgba(30,80,30,0.6)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
        {/* Africa */}
        <path d="M155,72 L185,68 L190,100 L175,140 L155,140 L145,110 L148,80 Z"
          fill="rgba(30,80,30,0.6)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
        {/* Asia */}
        <path d="M190,22 L270,18 L278,55 L260,75 L225,80 L195,65 L188,45 Z"
          fill="rgba(30,80,30,0.6)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
        {/* Australia */}
        <path d="M230,110 L265,108 L270,135 L250,148 L228,140 Z"
          fill="rgba(30,80,30,0.6)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>

        {/* Global ocean SOx 0.5% label */}
        <text x="120" y="140" textAnchor="middle" fontSize="7" fill={C.blue2} opacity="0.6">
          {lang==="fr"?"0,5% SOx mondial":lang==="en"?"0.5% SOx global":lang==="es"?"0,5% SOx mundial":"0,5% SOx global"}
        </text>

        {/* ECA Zones */}
        {ecaZones.map(zone => (
          <g key={zone.id} onClick={()=>setSel(sel===zone.id?null:zone.id)} style={{cursor:"pointer"}}>
            <polygon points={zone.points}
              fill={sel===zone.id?`${zone.color}55`:`${zone.color}30`}
              stroke={zone.color}
              strokeWidth={sel===zone.id?2:1.2}
              opacity={sel&&sel!==zone.id?0.5:1}/>
            <text
              x={zone.points.split(' ').reduce((s,p,i,a)=>{
                const [x]=p.split(',').map(Number);
                return s+x/a.length;
              },0)}
              y={zone.points.split(' ').reduce((s,p,i,a)=>{
                const [,y]=p.split(',').map(Number);
                return s+y/a.length;
              },0)+4}
              textAnchor="middle" fontSize="6" fill={zone.color} fontWeight="700">
              ECA
            </text>
          </g>
        ))}

        {/* SOx labels on zones */}
        <text x="168" y="56" textAnchor="middle" fontSize="5.5" fill="white" opacity="0.8">0.1%</text>
        <text x="155" y="63" textAnchor="middle" fontSize="5.5" fill="white" opacity="0.8">0.1%</text>
        <text x="78" y="72" textAnchor="middle" fontSize="5.5" fill="white" opacity="0.8">0.1%</text>

        {/* Ship icon */}
        <text x="125" y="100" fontSize="12" opacity="0.4">🚢</text>

        {/* Equator */}
        <line x1="5" y1="105" x2="285" y2="105"
          stroke="rgba(255,200,0,0.2)" strokeWidth="0.8" strokeDasharray="4,4"/>
        <text x="8" y="102" fontSize="6" fill="rgba(255,200,0,0.4)">
          {lang==="fr"?"Équateur":lang==="en"?"Equator":lang==="es"?"Ecuador":"Equador"}
        </text>

        <text x="145" y="170" textAnchor="middle" fontSize="6.5" fill={C.muted}>
          {lang==="fr"?"Touche une zone ECA pour les détails":lang==="en"?"Tap an ECA zone for details":lang==="es"?"Toca una zona ECA para detalles":"Toque numa zona ECA para detalhes"}
        </text>
      </svg>

      {sel_&&<div style={{marginTop:8,padding:"10px 12px",borderRadius:12,
        background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,
        animation:"fadeUp 0.3s ease"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
          <div style={{fontSize:12,fontWeight:700,color:sel_.color}}>{sel_.label[lang]||sel_.label.fr}</div>
          <div style={{display:"flex",gap:6}}>
            <span style={{padding:"2px 7px",borderRadius:8,background:`${sel_.color}22`,border:`1px solid ${sel_.color}44`,fontSize:9,color:sel_.color,fontWeight:700}}>SOx {sel_.sox}</span>
            <span style={{padding:"2px 7px",borderRadius:8,background:"rgba(255,255,255,0.08)",fontSize:9,color:C.muted}}>NOx {sel_.nox}</span>
          </div>
        </div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.fr}</div>
        <div style={{fontSize:10,color:C.muted,marginTop:4}}>📅 {lang==="fr"?"Depuis":lang==="en"?"Since":lang==="es"?"Desde":"Desde"} {sel_.since}</div>
      </div>}

      {/* Quick reference table */}
      {!sel&&<div style={{marginTop:8,background:"rgba(0,0,0,0.4)",borderRadius:10,padding:"8px 10px",border:`1px solid rgba(255,255,255,0.08)`}}>
        <div style={{fontSize:9,color:C.muted,marginBottom:6,fontWeight:700,letterSpacing:1}}>
          {lang==="fr"?"LIMITES SOx RAPIDES":lang==="en"?"QUICK SOx LIMITS":lang==="es"?"LÍMITES SOx RÁPIDOS":"LIMITES SOx RÁPIDOS"}
        </div>
        {[
          {zone:{fr:"Océan mondial (hors ECA)",en:"Global ocean (outside ECA)",es:"Océano mundial (fuera ECA)",pt:"Oceano mundial (fora ECA)"},sox:"0,5%",c:C.blue2},
          {zone:{fr:"Zones ECA",en:"ECA zones",es:"Zonas ECA",pt:"Zonas ECA"},sox:"0,1%",c:C.red},
          {zone:{fr:"Ports (certains pays)",en:"Ports (some countries)",es:"Puertos (algunos países)",pt:"Portos (alguns países)"},sox:"0,1% ou 0%",c:C.orange},
        ].map((r,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:i<2?"1px solid rgba(255,255,255,0.05)":"none",fontSize:10}}>
            <span style={{color:C.muted}}>{r.zone[lang]||r.zone.fr}</span>
            <span style={{color:r.c,fontWeight:700}}>{r.sox}</span>
          </div>
        ))}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — OIL RECORD BOOK SIMULATOR
// ══════════════════════════════════════
function OilRecordBookSVG({ lang }) {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({op:"", location:"", quantity:"", separator:"yes"});
  const [showForm, setShowForm] = useState(false);

  const operations = {
    fr:["Transfert eau de cale → séparateur","Rejet en mer (< 15 ppm)","Transfert eau de cale → citerne rétention","Déchargement eau de cale à terre"],
    en:["Bilge water transfer → separator","Sea discharge (< 15 ppm)","Bilge water transfer → retention tank","Shore discharge of bilge water"],
    es:["Transferencia agua sentina → separador","Descarga al mar (< 15 ppm)","Transferencia agua sentina → tanque retención","Descarga en tierra de agua de sentina"],
    pt:["Transferência água porão → separador","Descarga ao mar (< 15 ppm)","Transferência água porão → tanque retenção","Descarga em terra de água de porão"],
  };

  const addEntry = () => {
    if(!form.op||!form.location||!form.quantity) return;
    const now = new Date();
    setEntries(e=>[...e, {
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString().slice(0,5),
      op: form.op,
      location: form.location,
      quantity: form.quantity,
      separator: form.separator,
      valid: form.separator==="yes" || form.op.includes("terre") || form.op.includes("shore") || form.op.includes("tierra") || form.op.includes("terra"),
    }]);
    setForm({op:"",location:"",quantity:"",separator:"yes"});
    setShowForm(false);
  };

  return (
    <div>
      {/* ORB Header */}
      <div style={{background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}44`,borderRadius:12,padding:"10px 12px",marginBottom:10}}>
        <div style={{fontSize:11,fontWeight:700,color:C.gold2,marginBottom:2}}>
          📋 {lang==="fr"?"REGISTRE DES HYDROCARBURES (ORB)":lang==="en"?"OIL RECORD BOOK (ORB)":lang==="es"?"LIBRO DE REGISTRO DE HIDROCARBUROS":"LIVRO DE REGISTO DE HIDROCARBONETOS"}
        </div>
        <div style={{fontSize:10,color:C.muted,lineHeight:1.5}}>
          {lang==="fr"?"Toute opération avec de l'huile ou des eaux huileuses doit être consignée. Faux enregistrement = crime maritime.":lang==="en"?"All operations with oil or oily water must be recorded. False entry = maritime crime.":lang==="es"?"Todas las operaciones con aceite o aguas oleosas deben registrarse. Entrada falsa = delito marítimo.":"Toda operação com óleo ou águas oleosas deve ser registada. Registo falso = crime marítimo."}
        </div>
      </div>

      {/* Entries */}
      {entries.length > 0 && (
        <div style={{marginBottom:10}}>
          {entries.map((e,i)=>(
            <div key={i} style={{padding:"8px 10px",borderRadius:10,marginBottom:6,
              background:e.valid?"rgba(30,138,74,0.1)":"rgba(192,57,43,0.1)",
              border:`1px solid ${e.valid?C.green:C.red}33`,fontSize:10}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
                <span style={{color:C.muted}}>{e.date} {e.time}</span>
                <span style={{color:e.valid?C.green:C.red,fontWeight:700}}>{e.valid?"✅ CONFORME":"⚠️ NON CONFORME"}</span>
              </div>
              <div style={{color:C.white}}>{e.op}</div>
              <div style={{color:C.muted}}>{e.location} · {e.quantity}m³</div>
            </div>
          ))}
        </div>
      )}

      {entries.length === 0 && !showForm && (
        <div style={{textAlign:"center",padding:"16px",fontSize:11,color:C.muted,background:"rgba(255,255,255,0.03)",borderRadius:10,marginBottom:10}}>
          {lang==="fr"?"Aucune entrée — cliquez pour simuler une opération":lang==="en"?"No entries — click to simulate an operation":lang==="es"?"Sin entradas — haga clic para simular una operación":"Sem entradas — clique para simular uma operação"}
        </div>
      )}

      {showForm && (
        <div style={{background:"rgba(13,31,60,0.9)",border:`1px solid ${C.border}`,borderRadius:12,padding:"12px",marginBottom:10,animation:"fadeUp 0.3s ease"}}>
          <div style={{fontSize:11,fontWeight:700,color:C.gold2,marginBottom:8}}>
            {lang==="fr"?"Nouvelle entrée ORB":lang==="en"?"New ORB entry":lang==="es"?"Nueva entrada ORB":"Nova entrada ORB"}
          </div>
          {/* Operation type */}
          <div style={{marginBottom:8}}>
            <div style={{fontSize:10,color:C.muted,marginBottom:4}}>{lang==="fr"?"Opération:":lang==="en"?"Operation:":lang==="es"?"Operación:":"Operação:"}</div>
            <div style={{display:"flex",flexDirection:"column",gap:4}}>
              {(operations[lang]||operations.fr).map((op,i)=>(
                <button key={i} onClick={()=>setForm(f=>({...f,op}))} style={{
                  padding:"7px 10px",borderRadius:8,fontSize:10,cursor:"pointer",textAlign:"left",
                  background:form.op===op?"rgba(201,146,42,0.2)":"rgba(255,255,255,0.05)",
                  border:`1px solid ${form.op===op?C.gold:"rgba(255,255,255,0.1)"}`,
                  color:form.op===op?C.gold2:C.muted,
                }}>{op}</button>
              ))}
            </div>
          </div>
          {/* Location + Quantity */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
            <div>
              <div style={{fontSize:10,color:C.muted,marginBottom:3}}>{lang==="fr"?"Position:":lang==="en"?"Position:":lang==="es"?"Posición:":"Posição:"}</div>
              <input value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))}
                placeholder="ex: 05°N 002°E"
                style={{width:"100%",padding:"7px",borderRadius:8,background:"rgba(255,255,255,0.08)",border:`1px solid ${C.border}`,color:C.white,fontSize:10,boxSizing:"border-box"}}/>
            </div>
            <div>
              <div style={{fontSize:10,color:C.muted,marginBottom:3}}>{lang==="fr"?"Quantité (m³):":lang==="en"?"Quantity (m³):":lang==="es"?"Cantidad (m³):":"Quantidade (m³):"}</div>
              <input value={form.quantity} onChange={e=>setForm(f=>({...f,quantity:e.target.value}))}
                placeholder="ex: 2.5"
                style={{width:"100%",padding:"7px",borderRadius:8,background:"rgba(255,255,255,0.08)",border:`1px solid ${C.border}`,color:C.white,fontSize:10,boxSizing:"border-box"}}/>
            </div>
          </div>
          {/* Separator used */}
          <div style={{marginBottom:10}}>
            <div style={{fontSize:10,color:C.muted,marginBottom:4}}>
              {lang==="fr"?"Séparateur utilisé (15 ppm) ?":lang==="en"?"Separator used (15 ppm)?":lang==="es"?"¿Separador usado (15 ppm)?":"Separador usado (15 ppm)?"}
            </div>
            <div style={{display:"flex",gap:6}}>
              {["yes","no"].map(v=>(
                <button key={v} onClick={()=>setForm(f=>({...f,separator:v}))} style={{
                  flex:1,padding:"7px",borderRadius:8,fontSize:10,cursor:"pointer",fontWeight:700,
                  background:form.separator===v?(v==="yes"?"rgba(30,138,74,0.2)":"rgba(192,57,43,0.2)"):"rgba(255,255,255,0.05)",
                  border:`1px solid ${form.separator===v?(v==="yes"?C.green:C.red):"rgba(255,255,255,0.1)"}`,
                  color:form.separator===v?(v==="yes"?C.green:C.red):C.muted,
                }}>
                  {v==="yes"?(lang==="fr"?"✓ Oui":"✓ Yes"):(lang==="fr"?"✗ Non":"✗ No")}
                </button>
              ))}
            </div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>setShowForm(false)} style={{flex:1,padding:"9px",borderRadius:10,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:C.muted,fontSize:11,cursor:"pointer"}}>
              {lang==="fr"?"Annuler":"Cancel"}
            </button>
            <button onClick={addEntry} disabled={!form.op||!form.location||!form.quantity} style={{flex:2,padding:"9px",borderRadius:10,background:(!form.op||!form.location||!form.quantity)?"rgba(255,255,255,0.06)":`linear-gradient(135deg,${C.gold},${C.orange})`,border:"none",color:C.white,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
              {lang==="fr"?"ENREGISTRER":"RECORD"}
            </button>
          </div>
        </div>
      )}

      {!showForm && (
        <button onClick={()=>setShowForm(true)} style={{width:"100%",padding:"10px",borderRadius:12,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,color:C.gold2,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
          + {lang==="fr"?"Ajouter une entrée ORB":lang==="en"?"Add ORB entry":lang==="es"?"Añadir entrada ORB":"Adicionar entrada ORB"}
        </button>
      )}

      {entries.some(e=>!e.valid) && (
        <div style={{marginTop:8,padding:"8px 12px",borderRadius:10,background:"rgba(192,57,43,0.1)",border:`1px solid ${C.red}33`,fontSize:10,color:C.red}}>
          ⚠️ {lang==="fr"?"Entrée non conforme détectée — rejet sans séparateur = infraction MARPOL":lang==="en"?"Non-compliant entry detected — discharge without separator = MARPOL violation":lang==="es"?"Entrada no conforme — descarga sin separador = infracción MARPOL":"Entrada não conforme — descarga sem separador = infração MARPOL"}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — GARBAGE CATEGORIES
// ══════════════════════════════════════
function GarbageSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const categories = [
    { id:"plastic", icon:"🧴", color:C.red,
      label:{fr:"Plastiques",en:"Plastics",es:"Plásticos",pt:"Plásticos"},
      rule:{fr:"INTERDIT PARTOUT EN MER\nAnnexe V MARPOL — règle absolue\nAmende : 25 000$ minimum USA",en:"PROHIBITED EVERYWHERE AT SEA\nMARPOL Annex V — absolute rule\nFine: $25,000 minimum USA",es:"PROHIBIDO EN TODAS PARTES EN EL MAR\nAnexo V MARPOL — regla absoluta",pt:"PROIBIDO EM TODO O MAR\nAnexo V MARPOL — regra absoluta"},
      where:"❌"},
    { id:"food", icon:"🍌", color:C.green,
      label:{fr:"Déchets alimentaires",en:"Food waste",es:"Residuos alimentarios",pt:"Resíduos alimentares"},
      rule:{fr:"> 12 milles côtes : autorisé broyé\n> 3 milles : autorisé (zones normales)\nZones spéciales : > 12 milles broyé",en:"> 12 miles coast: allowed ground\n> 3 miles: allowed (normal zones)\nSpecial areas: > 12 miles ground",es:"> 12 millas costa: permitido triturado\n> 3 millas: permitido (zonas normales)\nZonas especiales: > 12 millas triturado",pt:"> 12 milhas costa: permitido triturado\n> 3 milhas: permitido (zonas normais)\nZonas especiais: > 12 milhas triturado"},
      where:"✅ > 3mn"},
    { id:"paper", icon:"📄", color:C.orange,
      label:{fr:"Papier / Carton",en:"Paper / Cardboard",es:"Papel / Cartón",pt:"Papel / Cartão"},
      rule:{fr:"> 12 milles côtes : autorisé\nZones spéciales : déchargement à terre\nNe pas jeter avec emballages plastiques",en:"> 12 miles coast: allowed\nSpecial areas: shore discharge\nDo not dispose with plastic packaging",es:"> 12 millas costa: permitido\nZonas especiales: descarga en tierra",pt:"> 12 milhas costa: permitido\nZonas especiais: descarga em terra"},
      where:"✅ > 12mn"},
    { id:"glass", icon:"🍾", color:C.steel,
      label:{fr:"Verre / Métal",en:"Glass / Metal",es:"Vidrio / Metal",pt:"Vidro / Metal"},
      rule:{fr:"> 12 milles côtes : autorisé\nZones spéciales : interdit\nDe préférence : collecte à terre",en:"> 12 miles coast: allowed\nSpecial areas: prohibited\nPreferably: shore collection",es:"> 12 millas costa: permitido\nZonas especiales: prohibido",pt:"> 12 milhas costa: permitido\nZonas especiais: proibido"},
      where:"✅ > 12mn"},
    { id:"oil", icon:"🛢️", color:C.red,
      label:{fr:"Résidus huileux",en:"Oily residues",es:"Residuos oleosos",pt:"Resíduos oleosos"},
      rule:{fr:"INTERDIT en mer\nAnnexe I + V MARPOL\nDépôt à terre obligatoire\nSlops → collecte port",en:"PROHIBITED at sea\nMARPOL Annex I + V\nMandatory shore deposit\nSlops → port collection",es:"PROHIBIDO en el mar\nAnexo I + V MARPOL\nDepósito en tierra obligatorio",pt:"PROIBIDO no mar\nAnexo I + V MARPOL\nDepósito em terra obrigatório"},
      where:"❌"},
    { id:"medical", icon:"💊", color:C.purple,
      label:{fr:"Déchets médicaux",en:"Medical waste",es:"Residuos médicos",pt:"Resíduos médicos"},
      rule:{fr:"INTERDIT en mer\nDépôt à terre UNIQUEMENT\nRéglementation nationale stricte\nConteneur spécial à bord",en:"PROHIBITED at sea\nShore deposit ONLY\nStrict national regulation\nSpecial container on board",es:"PROHIBIDO en el mar\nDepósito en tierra ÚNICAMENTE\nRegulación nacional estricta",pt:"PROIBIDO no mar\nDepósito em terra APENAS\nRegulamentação nacional rigorosa"},
      where:"❌"},
  ];
  const sel_ = sel ? categories.find(c=>c.id===sel) : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7,marginBottom:8}}>
        {categories.map(cat=>(
          <div key={cat.id} onClick={()=>setSel(sel===cat.id?null:cat.id)}
            style={{padding:"10px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===cat.id?`${cat.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===cat.id?cat.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:4}}>{cat.icon}</div>
            <div style={{fontSize:8,color:cat.color,fontWeight:700,lineHeight:1.3}}>{cat.label[lang]||cat.label.fr}</div>
            <div style={{fontSize:10,marginTop:3}}>{cat.where}</div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>{sel_.rule[lang]||sel_.rule.fr}</div>
      </div>:<div style={{textAlign:"center",padding:"10px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche une catégorie pour les règles":lang==="en"?"Tap a category for rules":lang==="es"?"Toca una categoría para las reglas":"Toque numa categoria para as regras"}
      </div>}
      <div style={{marginTop:8,padding:"8px 10px",borderRadius:10,background:"rgba(192,57,43,0.08)",border:`1px solid ${C.red}22`,fontSize:10,color:C.red,fontWeight:700,textAlign:"center"}}>
        ⚠️ {lang==="fr"?"Plastiques = INTERDIT PARTOUT — amende sévère":lang==="en"?"Plastics = PROHIBITED EVERYWHERE — severe fine":lang==="es"?"Plásticos = PROHIBIDO EN TODAS PARTES — multa grave":"Plásticos = PROIBIDO EM TODO O LADO — multa grave"}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"Amende MARPOL — MV Kota Panjang (2019)",teaser:"Porte-conteneurs · Faux enregistrements ORB · $1,5 million d'amende · Chef mécanicien condamné",what:"Le porte-conteneurs Kota Panjang est contrôlé par les autorités américaines (USCG) à Houston. L'enquête révèle que le chef mécanicien falsifiait le registre des hydrocarbures (ORB) depuis des mois. Les eaux de cale non traitées étaient rejetées directement en mer via un 'magic pipe' (tuyau de dérivation). Amende : 1,5 million de dollars. Chef mécanicien : condamné à de la prison.",cause:"• 'Magic pipe' = tuyau de dérivation contournant le séparateur 15 ppm\n• Enregistrements ORB falsifiés pour masquer les rejets illégaux\n• Plusieurs membres d'équipage au courant mais silencieux\n• Le 'whistleblower' (délateur) a contacté l'USCG\n• Pressions de la compagnie pour réduire les coûts",lessons:"✓ ORB doit être exact, signé, et conservé 3 ans minimum\n✓ 'Magic pipe' = crime maritime · prison + amende\n✓ Whistleblower protection : tout marin peut dénoncer sans représailles\n✓ Programme USCG : $150 000 récompense pour dénonciateurs\n✓ Port State Control vérifie systématiquement l'ORB",link:"🔗 Lien L6 MARPOL : Le coût d'un separateur 15 ppm = quelques milliers de dollars. L'amende MARPOL = des millions. La prison du chef mécanicien = inestimable. L'environnement ne se négocie pas."},
    en:{title:"MARPOL Fine — MV Kota Panjang (2019)",teaser:"Container vessel · False ORB entries · $1.5 million fine · Chief engineer convicted",what:"Container vessel Kota Panjang is inspected by USCG in Houston. Investigation reveals the chief engineer had been falsifying the Oil Record Book for months. Untreated bilge water was discharged directly at sea via a 'magic pipe' (bypass pipe). Fine: $1.5 million. Chief engineer: imprisoned.",cause:"• 'Magic pipe' = bypass pipe circumventing 15 ppm separator\n• ORB falsified to hide illegal discharges\n• Several crew members aware but silent\n• Whistleblower contacted USCG\n• Company pressure to reduce costs",lessons:"✓ ORB must be accurate, signed, and kept for 3+ years\n✓ 'Magic pipe' = maritime crime · prison + fine\n✓ Whistleblower protection: any crew member can report without retaliation\n✓ USCG program: $150,000 reward for whistleblowers\n✓ Port State Control systematically checks ORB",link:"🔗 L6 MARPOL Link: Cost of 15 ppm separator = few thousand dollars. MARPOL fine = millions. Chief engineer's prison sentence = priceless. The environment is non-negotiable."},
    es:{title:"Multa MARPOL — MV Kota Panjang (2019)",teaser:"Portacontenedores · Registros ORB falsos · $1,5 millones de multa · Jefe de máquinas condenado",what:"El portacontenedores Kota Panjang es inspeccionado por la USCG en Houston. La investigación revela que el jefe de máquinas falsificaba el registro de hidrocarburos (ORB) desde hacía meses. Las aguas de sentina sin tratar se descargaban directamente al mar mediante un 'magic pipe'. Multa: 1,5 millones de dólares.",cause:"• 'Magic pipe' = tubería que elude el separador de 15 ppm\n• ORB falsificado para ocultar las descargas ilegales\n• Varios miembros de la tripulación sabían pero guardaban silencio\n• El delator contactó con la USCG",lessons:"✓ ORB debe ser exacto, firmado y conservado 3 años mínimo\n✓ 'Magic pipe' = delito marítimo · prisión + multa\n✓ Protección del denunciante: cualquier marinero puede denunciar sin represalias\n✓ El control por el Estado rector del puerto verifica sistemáticamente el ORB",link:"🔗 Vínculo L6 MARPOL: El coste de un separador de 15 ppm = unos miles de dólares. La multa MARPOL = millones. La cárcel del jefe de máquinas = incalculable."},
    pt:{title:"Multa MARPOL — MV Kota Panjang (2019)",teaser:"Porta-contentores · Registos ORB falsos · $1,5 milhões de multa · Chefe de máquinas condenado",what:"O porta-contentores Kota Panjang é inspecionado pela USCG em Houston. A investigação revela que o chefe de máquinas falsificava o Livro de Registo de Hidrocarbonetos (ORB) há meses. A água de porão não tratada era descarregada diretamente no mar por um 'magic pipe'. Multa: 1,5 milhões de dólares.",cause:"• 'Magic pipe' = tubo de derivação que contorna o separador de 15 ppm\n• ORB falsificado para ocultar as descargas ilegais\n• Vários membros da tripulação sabiam mas ficaram em silêncio\n• O denunciante contactou a USCG",lessons:"✓ ORB deve ser exato, assinado e conservado 3 anos no mínimo\n✓ 'Magic pipe' = crime marítimo · prisão + multa\n✓ Proteção do denunciante: qualquer marinheiro pode denunciar sem represálias\n✓ Controlo pelo Estado do porto verifica sistematicamente o ORB",link:"🔗 Vínculo L6 MARPOL: O custo de um separador de 15 ppm = alguns milhares. A multa MARPOL = milhões. A prisão do chefe de máquinas = incalculável."},
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
  const correct={q1:"0.1",q2:"VI",q3:"15"};
  const qs={
    fr:[
      {id:"q1",q:"Limite SOx en zone ECA (en %) ?\n(Répondre : ex. 0.5 ou 0.1)"},
      {id:"q2",q:"Quelle annexe MARPOL concerne la pollution atmosphérique ?\n(Répondre : I, II, III, IV, V ou VI)"},
      {id:"q3",q:"Limite MARPOL pour rejet eau de cale en mer (en ppm) ?"},
    ],
    en:[
      {id:"q1",q:"SOx limit in ECA zone (in %)?\n(Answer: e.g. 0.5 or 0.1)"},
      {id:"q2",q:"Which MARPOL annex covers air pollution?\n(Answer: I, II, III, IV, V or VI)"},
      {id:"q3",q:"MARPOL limit for bilge water discharge at sea (in ppm)?"},
    ],
    es:[
      {id:"q1",q:"¿Límite SOx en zona ECA (en %)?\n(Responder: ej. 0.5 o 0.1)"},
      {id:"q2",q:"¿Qué anexo MARPOL trata la contaminación atmosférica?\n(Responder: I, II, III, IV, V o VI)"},
      {id:"q3",q:"¿Límite MARPOL para descarga de agua de sentina al mar (en ppm)?"},
    ],
    pt:[
      {id:"q1",q:"Limite SOx em zona ECA (em %)?\n(Responder: ex. 0.5 ou 0.1)"},
      {id:"q2",q:"Qual anexo MARPOL trata a poluição atmosférica?\n(Responder: I, II, III, IV, V ou VI)"},
      {id:"q3",q:"Limite MARPOL para descarga de água de porão no mar (em ppm)?"},
    ],
  };
  const list=qs[lang]||qs.fr;
  const chk=(id,val)=>{
    const v=val.trim().toLowerCase().replace(",",".");
    if(id==="q1") return v==="0.1"||v==="0,1"||v==="0.1%";
    if(id==="q2") return v==="vi"||v==="6";
    if(id==="q3") return v==="15"||v==="15ppm"||v==="15 ppm";
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.green}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : ECA SOx 0,1% · Annexe VI = atmosphérique · 15 ppm eau de cale"
        :lang==="en"?"💡 Reminders: ECA SOx 0.1% · Annex VI = atmospheric · 15 ppm bilge water"
        :lang==="es"?"💡 Recordatorios: ECA SOx 0,1% · Anexo VI = atmosférico · 15 ppm agua sentina"
        :"💡 Lembretes: ECA SOx 0,1% · Anexo VI = atmosférico · 15 ppm água porão"}
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
        {lang==="fr"?"✅ Q1: 0,1% (vs 0,5% mondial hors ECA)\n✅ Q2: VI (Annexe VI = pollution atmosphérique SOx/NOx/PM)\n✅ Q3: 15 ppm (Annexe I MARPOL — séparateur obligatoire)"
        :lang==="en"?"✅ Q1: 0.1% (vs 0.5% global outside ECA)\n✅ Q2: VI (Annex VI = air pollution SOx/NOx/PM)\n✅ Q3: 15 ppm (MARPOL Annex I — separator mandatory)"
        :"✅ Q1: 0,1% · Q2: VI · Q3: 15 ppm"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}


const QUIZ = {
  fr:[
    {q:"Quelle est la limite SOx en zone ECA (Emission Control Area) depuis 2020 ?",opts:["1,5%","0,5%","0,1%","0,05%"],correct:2,expl:"Depuis le 1er janvier 2020 (MARPOL Annex VI) : 0,1% SOx maximum en zone ECA (Baltique, Mer du Nord, Amérique du Nord, Caraïbes US). 0,5% SOx maximum dans le reste des océans (règle mondiale entrée en vigueur en 2020, avant c'était 3,5%). Solution : LSFO (Low Sulfur Fuel Oil) ou scrubbers (épurateurs de gaz)."},
    {q:"Le 'magic pipe' est un terme désignant :",opts:["Un tuyau de ventilation","Un tuyau de dérivation illégal contournant le séparateur 15 ppm pour rejeter les eaux de cale directement en mer","Un type de tuyau de refoulement","Un tuyau d'aspiration spécial"],correct:1,expl:"Magic pipe = tuyau de dérivation secret qui contourne le séparateur 15 ppm. Permet de rejeter les eaux de cale non traitées directement en mer. Crime maritime grave : prison pour les officiers impliqués, amendes pouvant dépasser $1 million, et arrêt du navire. Le programme USCG récompense les dénonciateurs jusqu'à $150 000."},
    {q:"L'Oil Record Book (registre des hydrocarbures) doit être conservé combien de temps ?",opts:["1 an","3 ans minimum à bord","5 ans","10 ans"],correct:1,expl:"MARPOL : L'Oil Record Book doit être conservé 3 ans minimum à bord du navire. Doit être disponible pour inspection par Port State Control à tout moment. Chaque entrée doit être signée par l'officier responsable et le capitaine. Faux enregistrement = crime maritime + prison."},
    {q:"Quelle annexe MARPOL interdit totalement les rejets de plastiques en mer ?",opts:["Annexe I","Annexe III","Annexe V","Annexe VI"],correct:2,expl:"MARPOL Annexe V = gestion des ordures. Les plastiques sont INTERDITS de rejet partout en mer, sans exception de distance. Les autres déchets ont des règles de distances (12 miles, 3 miles). Depuis 2013, l'Annexe V s'applique à tous les navires. Garbage Record Book obligatoire."},
    {q:"La limite mondiale de teneur en soufre du carburant marin depuis 2020 est :",opts:["3,5%","1,0%","0,5%","0,1%"],correct:2,expl:"MARPOL Annex VI : depuis le 1er janvier 2020, limite SOx mondiale (hors ECA) = 0,5% soufre. Avant 2020 : 3,5%. Cette règle, dite 'IMO 2020', a forcé toute l'industrie maritime à passer au LSFO (<0,5% S) ou à installer des scrubbers. Économies de santé publique estimées : $50 milliards/an."},
  ],
  en:[
    {q:"What is the SOx limit in an ECA (Emission Control Area) since 2020?",opts:["1.5%","0.5%","0.1%","0.05%"],correct:2,expl:"Since January 1, 2020 (MARPOL Annex VI): 0.1% SOx maximum in ECA zones (Baltic, North Sea, North America, US Caribbean). 0.5% SOx maximum in the rest of the oceans (global rule effective 2020, previously 3.5%). Solution: LSFO (Low Sulfur Fuel Oil) or scrubbers (exhaust gas cleaners)."},
    {q:"A 'magic pipe' refers to:",opts:["A ventilation pipe","An illegal bypass pipe circumventing the 15 ppm separator to discharge bilge water directly at sea","A type of discharge pipe","A special suction pipe"],correct:1,expl:"Magic pipe = secret bypass pipe circumventing the 15 ppm separator. Allows untreated bilge water to be discharged directly at sea. Serious maritime crime: prison for involved officers, fines exceeding $1 million, and vessel arrest. USCG program rewards whistleblowers up to $150,000."},
    {q:"The Oil Record Book must be kept for how long?",opts:["1 year","Minimum 3 years on board","5 years","10 years"],correct:1,expl:"MARPOL: Oil Record Book must be kept minimum 3 years on board. Must be available for Port State Control inspection at any time. Each entry must be signed by the responsible officer and captain. False entry = maritime crime + prison."},
    {q:"Which MARPOL annex completely prohibits plastic discharge at sea?",opts:["Annex I","Annex III","Annex V","Annex VI"],correct:2,expl:"MARPOL Annex V = garbage management. Plastics are PROHIBITED from discharge anywhere at sea, with no distance exception. Other wastes have distance rules (12 miles, 3 miles). Since 2013, Annex V applies to all vessels. Garbage Record Book mandatory."},
    {q:"The global marine fuel sulfur limit since 2020 is:",opts:["3.5%","1.0%","0.5%","0.1%"],correct:2,expl:"MARPOL Annex VI: since January 1, 2020, global SOx limit (outside ECA) = 0.5% sulfur. Before 2020: 3.5%. This 'IMO 2020' rule forced the entire maritime industry to switch to LSFO (<0.5% S) or install scrubbers. Estimated public health savings: $50 billion/year."},
  ],
  es:[
    {q:"¿Cuál es el límite de SOx en una zona ECA desde 2020?",opts:["1,5%","0,5%","0,1%","0,05%"],correct:2,expl:"Desde el 1 de enero de 2020 (MARPOL Anexo VI): 0,1% SOx máximo en zonas ECA (Báltico, Mar del Norte, América del Norte, Caribe EE.UU.). 0,5% SOx máximo en el resto de los océanos. Solución: LSFO (<0,5% S) o scrubbers."},
    {q:"Un 'magic pipe' es:",opts:["Un tubo de ventilación","Un tubo de derivación ilegal que elude el separador de 15 ppm para descargar aguas de sentina directamente al mar","Un tipo de tubo de descarga","Un tubo de aspiración especial"],correct:1,expl:"Magic pipe = tubo de derivación secreto que elude el separador de 15 ppm. Permite descargar aguas de sentina sin tratar directamente al mar. Delito marítimo grave: prisión para los oficiales implicados, multas superiores a $1 millón, y retención del buque."},
    {q:"¿Durante cuánto tiempo debe conservarse el libro de registro de hidrocarburos?",opts:["1 año","Mínimo 3 años a bordo","5 años","10 años"],correct:1,expl:"MARPOL: El libro de registro de hidrocarburos debe conservarse mínimo 3 años a bordo. Debe estar disponible para inspección por el Estado rector del puerto. Cada entrada debe estar firmada por el oficial responsable y el capitán. Entrada falsa = delito marítimo + prisión."},
    {q:"¿Qué anexo MARPOL prohíbe totalmente los vertidos de plásticos al mar?",opts:["Anexo I","Anexo III","Anexo V","Anexo VI"],correct:2,expl:"MARPOL Anexo V = gestión de basuras. Los plásticos están PROHIBIDOS de verter en cualquier lugar del mar, sin excepción de distancia. Otros residuos tienen reglas de distancias (12 millas, 3 millas). Libro de registro de basuras obligatorio."},
    {q:"El límite mundial de contenido en azufre del combustible marino desde 2020 es:",opts:["3,5%","1,0%","0,5%","0,1%"],correct:2,expl:"MARPOL Anexo VI: desde el 1 de enero de 2020, límite SOx mundial (fuera ECA) = 0,5% azufre. Antes de 2020: 3,5%. Esta regla 'IMO 2020' obligó a toda la industria marítima a pasar al LSFO (<0,5% S) o instalar scrubbers."},
  ],
  pt:[
    {q:"Qual é o limite de SOx numa zona ECA desde 2020?",opts:["1,5%","0,5%","0,1%","0,05%"],correct:2,expl:"Desde 1 de janeiro de 2020 (MARPOL Anexo VI): 0,1% SOx máximo em zonas ECA (Báltico, Mar do Norte, América do Norte, Caraíbas EUA). 0,5% SOx máximo no resto dos oceanos. Solução: LSFO (<0,5% S) ou scrubbers."},
    {q:"Um 'magic pipe' refere-se a:",opts:["Um tubo de ventilação","Um tubo de derivação ilegal que contorna o separador de 15 ppm para descarregar água de porão diretamente no mar","Um tipo de tubo de descarga","Um tubo de aspiração especial"],correct:1,expl:"Magic pipe = tubo de derivação secreto que contorna o separador de 15 ppm. Permite descarregar água de porão não tratada diretamente no mar. Crime marítimo grave: prisão para os oficiais envolvidos, multas superiores a $1 milhão, e retenção do navio."},
    {q:"O Livro de Registo de Hidrocarbonetos deve ser conservado durante quanto tempo?",opts:["1 ano","Mínimo 3 anos a bordo","5 anos","10 anos"],correct:1,expl:"MARPOL: O Livro de Registo de Hidrocarbonetos deve ser conservado mínimo 3 anos a bordo. Deve estar disponível para inspeção pelo Estado do porto. Cada entrada deve ser assinada pelo oficial responsável e pelo capitão. Entrada falsa = crime marítimo + prisão."},
    {q:"Qual anexo MARPOL proíbe totalmente a descarga de plásticos no mar?",opts:["Anexo I","Anexo III","Anexo V","Anexo VI"],correct:2,expl:"MARPOL Anexo V = gestão de lixo. Os plásticos estão PROIBIDOS de descarga em qualquer lugar do mar, sem exceção de distância. Outros resíduos têm regras de distâncias (12 milhas, 3 milhas). Livro de Registo de Lixo obrigatório."},
    {q:"O limite mundial de teor em enxofre do combustível marítimo desde 2020 é:",opts:["3,5%","1,0%","0,5%","0,1%"],correct:2,expl:"MARPOL Anexo VI: desde 1 de janeiro de 2020, limite SOx mundial (fora ECA) = 0,5% enxofre. Antes de 2020: 3,5%. Esta regra 'IMO 2020' forçou toda a indústria marítima a mudar para LSFO (<0,5% S) ou instalar scrubbers."},
  ],
};

const BANK = {
  fr:[
    {q:"Qu'est-ce que le PSC (Port State Control) ?",opts:["Un type de contrat d'assurance","Inspection des navires étrangers dans les ports pour vérifier le respect des conventions internationales (SOLAS, MARPOL, STCW)","Un certificat de navigabilité","Un type de douane maritime"],correct:1,expl:"PSC = Port State Control. Inspection du navire par les autorités du pays d'escale. Vérifie : SOLAS (sécurité), MARPOL (environnement), STCW (compétences équipage), MLC (conditions travail). Peut bloquer (détenir) le navire si déficiences graves. Paris MOU, Tokyo MOU = organisations PSC régionales."},
    {q:"Qu'est-ce que le NOx Tier III ?",opts:["Un type de carburant","La norme la plus stricte de l'OMI pour les émissions d'oxydes d'azote — réduction de 80% vs Tier I","Un type de moteur","Une zone d'émissions"],correct:1,expl:"NOx Tier III = norme OMI la plus stricte (MARPOL Annex VI). Réduction de 80% des émissions NOx par rapport au Tier I. Exigé dans les zones ECA depuis 2016 (Amérique du Nord) et 2021 (Baltique, Mer du Nord). Technologies : SCR (Selective Catalytic Reduction) ou EGR (Exhaust Gas Recirculation)."},
    {q:"Qu'est-ce qu'un scrubber (épurateur de gaz) sur un navire ?",opts:["Un nettoyeur de coque","Système qui lave les gaz d'échappement pour réduire le SOx — permet l'utilisation de HFO riche en soufre en zone ECA","Un filtre à air","Un purificateur de carburant"],correct:1,expl:"Scrubber = Exhaust Gas Cleaning System (EGCS). Injecte de l'eau (mer ou douce) dans les gaz d'échappement pour absorber le SO2. Permet d'utiliser du HFO (teneur en soufre élevée) même en zone ECA. Types : open loop (eau de mer), closed loop (eau douce recyclée), hybride. Coût installation : $2-10 millions."},
    {q:"Qu'est-ce que le plan de gestion des ordures (Garbage Management Plan) ?",opts:["Le plan de nettoyage du navire","Document obligatoire (MARPOL V) décrivant comment les déchets sont collectés, stockés, traités et éliminés à bord","Le budget d'entretien du navire","Le plan de recyclage"],correct:1,expl:"Garbage Management Plan (GMP) = obligatoire MARPOL Annex V. Décrit : catégorisation des déchets, procédures de collecte et stockage, équipements d'élimination, responsabilités de l'équipage. Doit être affiché dans les espaces de préparation des repas et communs. Garbage Record Book = registre des opérations."},
    {q:"Qu'est-ce que le certificat IAPP ?",opts:["Certificat de formation","International Air Pollution Prevention Certificate — obligatoire MARPOL VI pour tous navires > 400 TB","Certificat d'assurance pollution","Certificat de navigabilité"],correct:1,expl:"IAPP = International Air Pollution Prevention Certificate. Délivré par l'État du pavillon après inspection. Certifie que le navire respecte les exigences MARPOL Annex VI (SOx, NOx, équipements). Validité : 5 ans avec inspections intermédiaires. Sans IAPP valide = rétention PSC possible."},
    {q:"Qu'est-ce qu'une zone spéciale MARPOL ?",opts:["Une zone maritime internationale","Zone océanique où les rejets sont beaucoup plus strictement réglementés en raison de leur sensibilité écologique","Une zone de pêche protégée","Une zone économique exclusive"],correct:1,expl:"Zone spéciale MARPOL = zones à sensibilité écologique élevée avec réglementations plus strictes que le reste des océans. Exemples Annexe I (hydrocarbures) : Méditerranée, Mer Rouge, Golfe Persique, Mer Noire, Antarctique. Exemples Annexe V (ordures) : Méditerranée, Baltique, Mer du Nord, Antarctique."},
    {q:"Qu'est-ce que le BDN (Bunker Delivery Note) ?",opts:["Un bon de livraison général","Document qui accompagne chaque livraison de carburant — indique la teneur en soufre du carburant livré","Un certificat de qualité du carburant","Un registre de consommation"],correct:1,expl:"BDN = Bunker Delivery Note. Obligatoire MARPOL Annex VI. Accompagne chaque livraison de carburant. Contient : type de carburant, volume, teneur en soufre mesurée, nom du fournisseur, date. Doit être conservé 3 ans. Prouve que le navire a reçu du carburant conforme aux règles SOx. Contrôlé par PSC."},
    {q:"Qu'est-ce que le SEEMP (Ship Energy Efficiency Management Plan) ?",opts:["Un plan de maintenance","Plan obligatoire (MARPOL VI) de gestion de l'efficacité énergétique — réduire les émissions CO2","Un plan de navigation","Un certificat énergétique"],correct:1,expl:"SEEMP = Ship Energy Efficiency Management Plan. Obligatoire depuis 2013 (MARPOL Annex VI). Décrit les mesures pour améliorer l'efficacité énergétique : slow steaming, optimisation de la route, entretien de la coque (anti-fouling), récupération de chaleur. Lié à l'indicateur EEXI et CII (depuis 2023)."},
    {q:"Qu'est-ce que l'EEDI (Energy Efficiency Design Index) ?",opts:["Un index de performance du moteur","Mesure de l'efficacité énergétique pour les nouveaux navires — grammes CO2 par tonne-mille transportée","Un index de consommation de carburant","Un certificat de conception"],correct:1,expl:"EEDI = Energy Efficiency Design Index. Obligatoire pour les nouveaux navires (MARPOL Annex VI). Mesure : grammes CO2 / (tonne × mille). Plus l'EEDI est bas, plus le navire est efficace. Objectif : réduction progressive de 20% (phase 2) à 50% (2030) par rapport à la baseline 2008."},
    {q:"Que signifie 'slops' à bord d'un navire ?",opts:["Les déchets solides","Mélanges eau-huile des fonds de cale · résidus de nettoyage de citernes","Les eaux grises","Les boues d'épuration"],correct:1,expl:"Slops = mélanges eau-huile récupérés dans les fonds de cale, résidus de nettoyage de citernes, débordements HFO. Stockés dans les slop tanks. Ne peuvent être rejetés en mer. Traités par séparateur (eau douce < 15 ppm → mer) ou déchargés à terre (port reception facilities). Déclarés dans l'ORB."},
    {q:"Qu'est-ce qu'une 'port reception facility' (installation portuaire de réception) ?",opts:["Un hôtel pour marins","Installation obligatoire dans chaque port (MARPOL) pour recevoir les déchets des navires","Un service de ravitaillement","Un hangar de stockage"],correct:1,expl:"Port reception facilities = installations obligatoires (MARPOL) dans tous les ports pour recevoir : huiles usagées, eaux de cale, slops, ordures, eaux usées, résidus chimiques. Le navire ne peut arguer de leur absence pour rejeter en mer. Déficit de ces installations dans certains pays en développement."},
    {q:"Qu'est-ce que le CII (Carbon Intensity Indicator) en vigueur depuis 2023 ?",opts:["Un indice de prix du carburant","Indicateur de l'intensité carbone opérationnelle d'un navire — noté A à E — obligation de réduction progressive","Un type de moteur écologique","Un indice d'assurance"],correct:1,expl:"CII = Carbon Intensity Indicator. En vigueur depuis janvier 2023 (MARPOL Annex VI). Note A à E selon les émissions CO2 réelles par tonne-mille parcouru. Note D/E pendant 3 ans consécutifs → plan d'amélioration obligatoire. Objectif : -11% d'ici 2026, -40% d'ici 2030 vs baseline 2008."},
    {q:"Que signifie 'Annex VI IMO 2020' pour les armateurs ?",opts:["Une nouvelle convention de sécurité","Obligation de réduire la teneur en soufre du carburant de 3,5% à 0,5% mondial à partir du 1er janvier 2020","Une nouvelle règle de chargement","Un nouveau certificat obligatoire"],correct:1,expl:"IMO 2020 = règle MARPOL Annex VI entrant en vigueur le 01/01/2020. Réduction drastique du soufre : 3,5% → 0,5% mondial. Impact : ~70% des navires ont switché au LSFO (carburant bas-soufre). ~30% ont installé des scrubbers. Coût industrie : ~$10 milliards. Bénéfice santé : réduction des maladies respiratoires en zones côtières."},
    {q:"Qu'est-ce que le programme 'whistleblower' de l'USCG ?",opts:["Un programme de formation","Programme de récompense pour les membres d'équipage qui signalent les violations MARPOL — jusqu'à $150 000 de récompense","Un programme de contrôle des navires","Un programme de surveillance satellitaire"],correct:1,expl:"Programme whistleblower USCG = protection et récompense pour les marins qui dénoncent les violations MARPOL (magic pipes, faux ORB). Récompense : jusqu'à 50% des amendes collectées, max $150 000. Protection garantie contre les représailles. Responsable de la découverte de nombreux magic pipes dans les ports américains."},
    {q:"Qu'est-ce que l'OPRC (Oil Pollution Response and Cooperation) ?",opts:["Un registre des hydrocarbures","Convention internationale (1990) sur la préparation, la lutte et la coopération pour la prévention de la pollution pétrolière","Un type d'assurance","Un certificat environnemental"],correct:1,expl:"OPRC 1990 = Convention sur la Préparation, la Lutte et la Coopération en matière de Pollution par les Hydrocarbures. Oblige les États à : avoir des plans nationaux d'urgence, coopérer lors de déversements majeurs, maintenir des capacités de lutte. Complémentaire à MARPOL. Base légale pour les opérations de dépollution type Erika, Prestige."},
  ],
  en:[
    {q:"What is PSC (Port State Control)?",opts:["A type of insurance contract","Inspection of foreign vessels in ports to verify compliance with international conventions (SOLAS, MARPOL, STCW)","A seaworthiness certificate","A type of maritime customs"],correct:1,expl:"PSC = Port State Control. Inspection of vessel by port country authorities. Checks: SOLAS (safety), MARPOL (environment), STCW (crew competence), MLC (working conditions). Can detain vessel for serious deficiencies. Paris MOU, Tokyo MOU = regional PSC organizations."},
    {q:"What is NOx Tier III?",opts:["A type of fuel","The strictest IMO standard for nitrogen oxide emissions — 80% reduction vs Tier I","A type of engine","An emission zone"],correct:1,expl:"NOx Tier III = strictest IMO standard (MARPOL Annex VI). 80% reduction of NOx emissions vs Tier I. Required in ECA zones since 2016 (North America) and 2021 (Baltic, North Sea). Technologies: SCR (Selective Catalytic Reduction) or EGR (Exhaust Gas Recirculation)."},
    {q:"What is a scrubber (exhaust gas cleaner) on a vessel?",opts:["A hull cleaner","System that washes exhaust gases to reduce SOx — allows use of high-sulfur HFO in ECA zones","An air filter","A fuel purifier"],correct:1,expl:"Scrubber = Exhaust Gas Cleaning System (EGCS). Injects water (sea or fresh) into exhaust gases to absorb SO2. Allows use of HFO (high sulfur) even in ECA zones. Types: open loop (sea water), closed loop (recycled fresh water), hybrid. Installation cost: $2-10 million."},
    {q:"What is the Garbage Management Plan?",opts:["The vessel cleaning plan","Mandatory document (MARPOL V) describing how waste is collected, stored, treated and disposed of on board","The vessel maintenance budget","The recycling plan"],correct:1,expl:"Garbage Management Plan (GMP) = MARPOL Annex V mandatory. Describes: waste categorization, collection and storage procedures, disposal equipment, crew responsibilities. Must be posted in food preparation and common spaces. Garbage Record Book = operations log."},
    {q:"What is the IAPP certificate?",opts:["A training certificate","International Air Pollution Prevention Certificate — MARPOL VI mandatory for all vessels > 400 GT","A pollution insurance certificate","A seaworthiness certificate"],correct:1,expl:"IAPP = International Air Pollution Prevention Certificate. Issued by flag state after inspection. Certifies vessel meets MARPOL Annex VI requirements (SOx, NOx, equipment). Validity: 5 years with intermediate surveys. Without valid IAPP = possible PSC detention."},
    {q:"What is a MARPOL special area?",opts:["An international maritime zone","Ocean zone where discharges are much more strictly regulated due to ecological sensitivity","A protected fishing zone","An exclusive economic zone"],correct:1,expl:"MARPOL special area = ecologically sensitive zones with stricter regulations than the rest of the oceans. Annex I examples (hydrocarbons): Mediterranean, Red Sea, Persian Gulf, Black Sea, Antarctic. Annex V examples (garbage): Mediterranean, Baltic, North Sea, Antarctic."},
    {q:"What is a BDN (Bunker Delivery Note)?",opts:["A general delivery note","Document accompanying each fuel delivery — indicates sulfur content of delivered fuel","A fuel quality certificate","A consumption log"],correct:1,expl:"BDN = Bunker Delivery Note. MARPOL Annex VI mandatory. Accompanies each fuel delivery. Contains: fuel type, volume, measured sulfur content, supplier name, date. Must be kept 3 years. Proves vessel received fuel compliant with SOx rules. Checked by PSC."},
    {q:"What is SEEMP (Ship Energy Efficiency Management Plan)?",opts:["A maintenance plan","Mandatory plan (MARPOL VI) for energy efficiency management — reduce CO2 emissions","A navigation plan","An energy certificate"],correct:1,expl:"SEEMP = Ship Energy Efficiency Management Plan. Mandatory since 2013 (MARPOL Annex VI). Describes measures to improve energy efficiency: slow steaming, route optimization, hull maintenance (anti-fouling), heat recovery. Linked to EEXI and CII indicators (since 2023)."},
    {q:"What is the EEDI (Energy Efficiency Design Index)?",opts:["An engine performance index","Measure of energy efficiency for new vessels — grams CO2 per tonne-mile transported","A fuel consumption index","A design certificate"],correct:1,expl:"EEDI = Energy Efficiency Design Index. Mandatory for new vessels (MARPOL Annex VI). Measures: grams CO2 / (tonne × mile). Lower EEDI = more efficient vessel. Target: progressive reduction of 20% (phase 2) to 50% (2030) vs 2008 baseline."},
    {q:"What does 'slops' mean on a vessel?",opts:["Solid waste","Oil-water mixtures from bilges · tank cleaning residues","Grey water","Sewage sludge"],correct:1,expl:"Slops = oil-water mixtures recovered from bilges, tank cleaning residues, HFO overflows. Stored in slop tanks. Cannot be discharged at sea. Treated by separator (fresh water < 15 ppm → sea) or discharged ashore (port reception facilities). Declared in ORB."},
    {q:"What is a 'port reception facility'?",opts:["A sailors' hotel","Mandatory facility in every port (MARPOL) to receive vessel waste","A bunkering service","A storage warehouse"],correct:1,expl:"Port reception facilities = MARPOL mandatory installations in all ports to receive: used oils, bilge water, slops, garbage, sewage, chemical residues. Vessel cannot cite their absence to discharge at sea. Deficit of these facilities in some developing countries."},
    {q:"What is the CII (Carbon Intensity Indicator) in force since 2023?",opts:["A fuel price index","Indicator of vessel's operational carbon intensity — rated A to E — mandatory progressive reduction","A type of eco-engine","An insurance index"],correct:1,expl:"CII = Carbon Intensity Indicator. In force since January 2023 (MARPOL Annex VI). Rating A to E based on actual CO2 emissions per tonne-mile. Rating D/E for 3 consecutive years → mandatory improvement plan. Target: -11% by 2026, -40% by 2030 vs 2008 baseline."},
    {q:"What does 'IMO 2020 Annex VI' mean for shipowners?",opts:["A new safety convention","Obligation to reduce fuel sulfur content from 3.5% to 0.5% globally from January 1, 2020","A new loading rule","A new mandatory certificate"],correct:1,expl:"IMO 2020 = MARPOL Annex VI rule effective 01/01/2020. Drastic sulfur reduction: 3.5% → 0.5% global. Impact: ~70% of vessels switched to LSFO (low-sulfur fuel). ~30% installed scrubbers. Industry cost: ~$10 billion. Health benefit: reduction of respiratory diseases in coastal areas."},
    {q:"What is the USCG 'whistleblower' program?",opts:["A training program","Reward program for crew members reporting MARPOL violations — up to $150,000 reward","A vessel inspection program","A satellite surveillance program"],correct:1,expl:"USCG whistleblower program = protection and reward for mariners reporting MARPOL violations (magic pipes, false ORBs). Reward: up to 50% of collected fines, max $150,000. Protection guaranteed against retaliation. Responsible for uncovering many magic pipes in US ports."},
    {q:"What is OPRC (Oil Pollution Response and Cooperation)?",opts:["An oil register","International convention (1990) on preparedness, response and cooperation for oil pollution","A type of insurance","An environmental certificate"],correct:1,expl:"OPRC 1990 = Convention on Oil Pollution Preparedness, Response and Cooperation. Obliges states to: have national emergency plans, cooperate during major spills, maintain response capabilities. Complementary to MARPOL. Legal basis for clean-up operations like Erika, Prestige."},
  ],
  es:[
    {q:"¿Qué es el PSC (Control del Estado Rector del Puerto)?",opts:["Un tipo de contrato de seguros","Inspección de buques extranjeros en los puertos para verificar el cumplimiento de los convenios internacionales (SOLAS, MARPOL, STCW)","Un certificado de navegabilidad","Un tipo de aduana marítima"],correct:1,expl:"PSC = Control del Estado Rector del Puerto. Inspección del buque por las autoridades del país de escala. Verifica: SOLAS (seguridad), MARPOL (medio ambiente), STCW (competencias tripulación), MLC (condiciones laborales). Puede retener el buque en caso de deficiencias graves."},
    {q:"¿Qué es el NOx Nivel III?",opts:["Un tipo de combustible","La norma más estricta de la OMI para las emisiones de óxidos de nitrógeno — reducción del 80% frente al Nivel I","Un tipo de motor","Una zona de emisiones"],correct:1,expl:"NOx Nivel III = norma OMI más estricta (MARPOL Anexo VI). Reducción del 80% de las emisiones NOx frente al Nivel I. Exigido en zonas ECA desde 2016 (América del Norte) y 2021 (Báltico, Mar del Norte). Tecnologías: SCR (Reducción Catalítica Selectiva) o EGR (Recirculación de Gases de Escape)."},
    {q:"¿Qué es un scrubber (depurador de gases) en un buque?",opts:["Un limpiador de casco","Sistema que lava los gases de escape para reducir el SOx — permite el uso de HFO rico en azufre en zonas ECA","Un filtro de aire","Un purificador de combustible"],correct:1,expl:"Scrubber = Sistema de Limpieza de Gases de Escape (EGCS). Inyecta agua (de mar o dulce) en los gases de escape para absorber el SO2. Permite usar HFO (alto contenido en azufre) incluso en zonas ECA. Coste de instalación: $2-10 millones."},
    {q:"¿Qué es el Plan de Gestión de Basuras?",opts:["El plan de limpieza del buque","Documento obligatorio (MARPOL V) que describe cómo se recopilan, almacenan, tratan y eliminan los residuos a bordo","El presupuesto de mantenimiento del buque","El plan de reciclaje"],correct:1,expl:"Plan de Gestión de Basuras (GMP) = MARPOL Anexo V obligatorio. Describe: categorización de residuos, procedimientos de recogida y almacenamiento, equipos de eliminación, responsabilidades de la tripulación. Debe estar expuesto en los espacios comunes. Libro de registro de basuras = registro de operaciones."},
    {q:"¿Qué es el certificado IAPP?",opts:["Un certificado de formación","Certificado Internacional de Prevención de la Contaminación Atmosférica — MARPOL VI obligatorio para buques > 400 TB","Un certificado de seguro de contaminación","Un certificado de navegabilidad"],correct:1,expl:"IAPP = Certificado Internacional de Prevención de la Contaminación Atmosférica. Emitido por el Estado de pabellón. Certifica que el buque cumple los requisitos del MARPOL Anexo VI (SOx, NOx, equipos). Validez: 5 años con inspecciones intermedias."},
    {q:"¿Qué es una zona especial MARPOL?",opts:["Una zona marítima internacional","Zona oceánica donde los vertidos están mucho más estrictamente regulados por su sensibilidad ecológica","Una zona de pesca protegida","Una zona económica exclusiva"],correct:1,expl:"Zona especial MARPOL = zonas de alta sensibilidad ecológica con regulaciones más estrictas. Ejemplos Anexo I: Mediterráneo, Mar Rojo, Golfo Pérsico, Mar Negro, Antártida. Ejemplos Anexo V: Mediterráneo, Báltico, Mar del Norte, Antártida."},
    {q:"¿Qué es la BDN (Nota de Entrega de Bunker)?",opts:["Una nota de entrega general","Documento que acompaña cada entrega de combustible — indica el contenido en azufre del combustible entregado","Un certificado de calidad del combustible","Un registro de consumo"],correct:1,expl:"BDN = Nota de Entrega de Bunker. MARPOL Anexo VI obligatorio. Acompaña cada entrega de combustible. Contiene: tipo de combustible, volumen, contenido en azufre medido, nombre del proveedor, fecha. Debe conservarse 3 años. PSC la controla."},
    {q:"¿Qué es el SEEMP?",opts:["Un plan de mantenimiento","Plan obligatorio (MARPOL VI) de gestión de la eficiencia energética — reducir las emisiones de CO2","Un plan de navegación","Un certificado energético"],correct:1,expl:"SEEMP = Plan de Gestión de la Eficiencia Energética del Buque. Obligatorio desde 2013. Describe medidas para mejorar la eficiencia energética: slow steaming, optimización de la ruta, mantenimiento del casco, recuperación de calor. Vinculado al EEXI y CII (desde 2023)."},
    {q:"¿Qué es el EEDI?",opts:["Un índice de rendimiento del motor","Medida de la eficiencia energética para los nuevos buques — gramos CO2 por tonelada-milla transportada","Un índice de consumo de combustible","Un certificado de diseño"],correct:1,expl:"EEDI = Índice de Eficiencia Energética de Diseño. Obligatorio para nuevos buques. Mide: gramos CO2 / (tonelada × milla). Cuanto más bajo el EEDI, más eficiente es el buque. Objetivo: reducción progresiva del 20% (fase 2) al 50% (2030) respecto a la línea base de 2008."},
    {q:"¿Qué significa 'slops' a bordo de un buque?",opts:["Los residuos sólidos","Mezclas agua-aceite de los fondos de sentina · residuos de limpieza de tanques","Las aguas grises","Los lodos de depuración"],correct:1,expl:"Slops = mezclas agua-aceite recuperadas de los fondos de sentina, residuos de limpieza de tanques, derrames de HFO. Almacenados en los slop tanks. No pueden descargarse al mar. Tratados por separador o descargados en tierra. Declarados en el ORB."},
    {q:"¿Qué es una 'instalación portuaria de recepción'?",opts:["Un hotel para marineros","Instalación obligatoria en cada puerto (MARPOL) para recibir los residuos de los buques","Un servicio de abastecimiento","Un almacén de almacenamiento"],correct:1,expl:"Instalaciones portuarias de recepción = obligatorias (MARPOL) en todos los puertos para recibir: aceites usados, aguas de sentina, slops, basuras, aguas residuales, residuos químicos. El buque no puede alegar su ausencia para verter al mar."},
    {q:"¿Qué es el CII en vigor desde 2023?",opts:["Un índice de precio del combustible","Indicador de la intensidad de carbono operacional de un buque — calificado de A a E — reducción progresiva obligatoria","Un tipo de motor ecológico","Un índice de seguros"],correct:1,expl:"CII = Indicador de Intensidad de Carbono. En vigor desde enero de 2023. Calificación A a E según las emisiones reales de CO2 por tonelada-milla. Calificación D/E durante 3 años consecutivos → plan de mejora obligatorio. Objetivo: -11% para 2026, -40% para 2030."},
    {q:"¿Qué significa 'IMO 2020 Anexo VI' para los armadores?",opts:["Una nueva convención de seguridad","Obligación de reducir el contenido en azufre del combustible del 3,5% al 0,5% mundial a partir del 1 de enero de 2020","Una nueva regla de carga","Un nuevo certificado obligatorio"],correct:1,expl:"IMO 2020 = norma MARPOL Anexo VI en vigor el 01/01/2020. Reducción drástica del azufre: 3,5% → 0,5% mundial. Impacto: ~70% de los buques cambiaron a LSFO. ~30% instalaron scrubbers. Coste industria: ~$10 mil millones."},
    {q:"¿Qué es el programa 'whistleblower' de la USCG?",opts:["Un programa de formación","Programa de recompensa para los miembros de la tripulación que denuncian las infracciones MARPOL — hasta $150.000 de recompensa","Un programa de control de buques","Un programa de vigilancia por satélite"],correct:1,expl:"Programa whistleblower USCG = protección y recompensa para los marineros que denuncian infracciones MARPOL (magic pipes, ORB falsos). Recompensa: hasta el 50% de las multas cobradas, máx $150.000. Protección garantizada contra represalias."},
    {q:"¿Qué es el OPRC?",opts:["Un registro de hidrocarburos","Convenio internacional (1990) sobre preparación, lucha y cooperación para la contaminación por hidrocarburos","Un tipo de seguro","Un certificado medioambiental"],correct:1,expl:"OPRC 1990 = Convenio sobre Preparación, Lucha y Cooperación en materia de Contaminación por Hidrocarburos. Obliga a los Estados a: tener planes de emergencia nacionales, cooperar en derrames importantes, mantener capacidades de lucha. Complementario a MARPOL."},
  ],
  pt:[
    {q:"O que é o PSC (Controlo pelo Estado do Porto)?",opts:["Um tipo de contrato de seguros","Inspeção de navios estrangeiros nos portos para verificar o cumprimento das convenções internacionais (SOLAS, MARPOL, STCW)","Um certificado de navegabilidade","Um tipo de alfândega marítima"],correct:1,expl:"PSC = Controlo pelo Estado do Porto. Inspeção do navio pelas autoridades do país de escala. Verifica: SOLAS (segurança), MARPOL (ambiente), STCW (competências tripulação), MLC (condições de trabalho). Pode reter o navio por deficiências graves."},
    {q:"O que é o NOx Tier III?",opts:["Um tipo de combustível","A norma IMO mais rigorosa para as emissões de óxidos de azoto — redução de 80% vs Tier I","Um tipo de motor","Uma zona de emissões"],correct:1,expl:"NOx Tier III = norma IMO mais rigorosa (MARPOL Anexo VI). Redução de 80% das emissões NOx vs Tier I. Exigido nas zonas ECA desde 2016 (América do Norte) e 2021 (Báltico, Mar do Norte). Tecnologias: SCR ou EGR."},
    {q:"O que é um scrubber num navio?",opts:["Um limpador de casco","Sistema que lava os gases de escape para reduzir o SOx — permite o uso de HFO rico em enxofre em zonas ECA","Um filtro de ar","Um purificador de combustível"],correct:1,expl:"Scrubber = Sistema de Limpeza de Gases de Escape (EGCS). Injeta água (do mar ou doce) nos gases de escape para absorver o SO2. Permite usar HFO (alto teor de enxofre) mesmo em zonas ECA. Custo de instalação: $2-10 milhões."},
    {q:"O que é o Plano de Gestão de Lixo?",opts:["O plano de limpeza do navio","Documento obrigatório (MARPOL V) que descreve como os resíduos são recolhidos, armazenados, tratados e eliminados a bordo","O orçamento de manutenção do navio","O plano de reciclagem"],correct:1,expl:"Plano de Gestão de Lixo (GMP) = MARPOL Anexo V obrigatório. Descreve: categorização de resíduos, procedimentos de recolha e armazenamento, equipamentos de eliminação, responsabilidades da tripulação. Livro de Registo de Lixo = registo de operações."},
    {q:"O que é o certificado IAPP?",opts:["Um certificado de formação","Certificado Internacional de Prevenção da Poluição Atmosférica — MARPOL VI obrigatório para navios > 400 AB","Um certificado de seguro de poluição","Um certificado de navegabilidade"],correct:1,expl:"IAPP = Certificado Internacional de Prevenção da Poluição Atmosférica. Emitido pelo Estado de bandeira. Certifica que o navio cumpre os requisitos do MARPOL Anexo VI (SOx, NOx, equipamentos). Validade: 5 anos com inspeções intermédias."},
    {q:"O que é uma zona especial MARPOL?",opts:["Uma zona marítima internacional","Zona oceânica onde as descargas são muito mais estritamente reguladas devido à sensibilidade ecológica","Uma zona de pesca protegida","Uma zona económica exclusiva"],correct:1,expl:"Zona especial MARPOL = zonas de alta sensibilidade ecológica com regulamentações mais rigorosas. Exemplos Anexo I: Mediterrâneo, Mar Vermelho, Golfo Pérsico, Mar Negro, Antártida. Exemplos Anexo V: Mediterrâneo, Báltico, Mar do Norte, Antártida."},
    {q:"O que é uma BDN (Nota de Entrega de Combustível)?",opts:["Uma nota de entrega geral","Documento que acompanha cada entrega de combustível — indica o teor de enxofre do combustível entregue","Um certificado de qualidade do combustível","Um registo de consumo"],correct:1,expl:"BDN = Nota de Entrega de Combustível. MARPOL Anexo VI obrigatório. Acompanha cada entrega de combustível. Contém: tipo de combustível, volume, teor de enxofre medido, nome do fornecedor, data. Deve ser conservado 3 anos. Verificado pelo PSC."},
    {q:"O que é o SEEMP?",opts:["Um plano de manutenção","Plano obrigatório (MARPOL VI) de gestão da eficiência energética — reduzir as emissões de CO2","Um plano de navegação","Um certificado energético"],correct:1,expl:"SEEMP = Plano de Gestão da Eficiência Energética do Navio. Obrigatório desde 2013. Descreve medidas para melhorar a eficiência energética: slow steaming, otimização da rota, manutenção do casco, recuperação de calor. Ligado ao EEXI e CII (desde 2023)."},
    {q:"O que é o EEDI?",opts:["Um índice de desempenho do motor","Medida da eficiência energética para novos navios — gramas CO2 por tonelada-milha transportada","Um índice de consumo de combustível","Um certificado de projeto"],correct:1,expl:"EEDI = Índice de Eficiência Energética de Projeto. Obrigatório para novos navios. Mede: gramas CO2 / (tonelada × milha). EEDI mais baixo = navio mais eficiente. Objetivo: redução progressiva de 20% (fase 2) a 50% (2030) vs linha de base 2008."},
    {q:"O que significa 'slops' a bordo de um navio?",opts:["Os resíduos sólidos","Misturas água-óleo dos fundos de porão · resíduos de limpeza de tanques","As águas cinzentas","As lamas de depuração"],correct:1,expl:"Slops = misturas água-óleo recuperadas dos fundos de porão, resíduos de limpeza de tanques, derrames de HFO. Armazenados nos slop tanks. Não podem ser descarregados no mar. Tratados por separador ou descarregados em terra. Declarados no ORB."},
    {q:"O que é uma 'instalação portuária de receção'?",opts:["Um hotel para marinheiros","Instalação obrigatória em cada porto (MARPOL) para receber os resíduos dos navios","Um serviço de abastecimento","Um armazém de armazenamento"],correct:1,expl:"Instalações portuárias de receção = obrigatórias (MARPOL) em todos os portos para receber: óleos usados, água de porão, slops, lixo, águas residuais, resíduos químicos. O navio não pode alegar a sua ausência para descarregar no mar."},
    {q:"O que é o CII em vigor desde 2023?",opts:["Um índice de preço do combustível","Indicador da intensidade de carbono operacional de um navio — classificado de A a E — redução progressiva obrigatória","Um tipo de motor ecológico","Um índice de seguros"],correct:1,expl:"CII = Indicador de Intensidade de Carbono. Em vigor desde janeiro de 2023. Classificação A a E com base nas emissões reais de CO2 por tonelada-milha. Classificação D/E durante 3 anos consecutivos → plano de melhoria obrigatório."},
    {q:"O que significa 'IMO 2020 Anexo VI' para os armadores?",opts:["Uma nova convenção de segurança","Obrigação de reduzir o teor de enxofre do combustível de 3,5% para 0,5% mundial a partir de 1 de janeiro de 2020","Uma nova regra de carregamento","Um novo certificado obrigatório"],correct:1,expl:"IMO 2020 = regra MARPOL Anexo VI em vigor em 01/01/2020. Redução drástica do enxofre: 3,5% → 0,5% mundial. Impacto: ~70% dos navios mudaram para LSFO. ~30% instalaram scrubbers. Custo industria: ~$10 mil milhões."},
    {q:"O que é o programa 'whistleblower' da USCG?",opts:["Um programa de formação","Programa de recompensa para membros da tripulação que denunciam violações MARPOL — até $150.000 de recompensa","Um programa de controlo de navios","Um programa de vigilância por satélite"],correct:1,expl:"Programa whistleblower USCG = proteção e recompensa para marinheiros que denunciam violações MARPOL (magic pipes, ORB falsos). Recompensa: até 50% das multas cobradas, máx $150.000. Proteção garantida contra represálias."},
    {q:"O que é o OPRC?",opts:["Um registo de hidrocarbonetos","Convenção internacional (1990) sobre preparação, resposta e cooperação para a poluição por hidrocarbonetos","Um tipo de seguro","Um certificado ambiental"],correct:1,expl:"OPRC 1990 = Convenção sobre Preparação, Resposta e Cooperação em matéria de Poluição por Hidrocarbonetos. Obriga os Estados a: ter planos de emergência nacionais, cooperar em derrames importantes, manter capacidades de resposta."},
  ],
};

function QuestionBank({ lang }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else setDone(true);};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,margin:"8px 0 4px"}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
      <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.green},${C.gold2})`}}/></div>
      <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
      </div>
      {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
      <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.green},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
    </div>
  );
}

function Stars(){const s=Array.from({length:16},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.green}33,transparent)`}}/>;}
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
  const d = {
    fr:{
      badge:"🌊 Module Machine · Leçon 1/6 · ⭐ Premium · 200 XP",
      title:"MARPOL, Zones ECA & Protection de l'Environnement",
      intro:"Les océans couvrent 71% de la Terre. Chaque année, des millions de tonnes de polluants y sont déversés. MARPOL est la réponse internationale : la convention qui protège les mers du monde entier.\n\nCette leçon couvre les 6 annexes MARPOL, les zones ECA, l'Oil Record Book et la gestion des déchets.",
      p1:"PARTIE 1 — MARPOL : LES 6 ANNEXES",s1t:"I·II·III·IV·V·VI — types de pollution et règles",
      s1:"MARPOL = MARine POLlution\nConvention de l'OMI (1973/1978)\nProtège les océans contre 6 types de pollution\n\n6 ANNEXES :\nI   = Hydrocarbures (huile, HFO) → 15 ppm\nII  = Substances liquides nocives (chimiques)\nIII = Marchandises dangereuses (colis IMDG)\nIV  = Eaux usées (toilettes, douches)\nV   = Ordures (plastiques INTERDITS partout)\nVI  = Pollution atmosphérique (SOx, NOx, CO2)\n\nANNEXE VI — IMO 2020 :\nSOx mondial : 3,5% → 0,5% depuis 2020\nECA : 0,1% SOx\nNOx : Tier I/II/III selon zone et âge moteur",
      p2:"PARTIE 2 — CARTE ECA MONDIALE",s2t:"Zones de contrôle des émissions — interactive",
      s2:"ECA = Emission Control Area\nZones où les limites SOx et NOx sont plus strictes\n\n5 ZONES ECA ACTIVES :\nMer Baltique : SOx 0,1% · NOx Tier III · depuis 2006\nMer du Nord : SOx 0,1% · NOx Tier III · depuis 2007\nAmérique du Nord : SOx 0,1% · NOx Tier III · depuis 2012\nCaraïbes US : SOx 0,1% · NOx Tier III · depuis 2012\nNORVÈGE : SOx 0,1% · NOx Tier II · depuis 2019\n\nSOLUTIONS POUR RESPECTER LES ECA :\n→ LSFO (Low Sulfur Fuel Oil) < 0,1% S\n→ Scrubber (épurateur de gaz d'échappement)\n→ LNG (Gaz naturel liquéfié)\n\nDEMAIN : nouvelles ECA probables\n→ Méditerranée · Mer Noire · Asie du Sud-Est",
      p3:"PARTIE 3 — OIL RECORD BOOK (ORB)",s3t:"Simulateur de registre des hydrocarbures",
      s3:"ORB = Registre des Hydrocarbures\nObligatoire sur tous navires > 150 TB\nConservation : 3 ans minimum à bord\n\nCONTENU OBLIGATOIRE :\n→ Toute opération impliquant huile ou eaux huileuses\n→ Transferts eau de cale → séparateur\n→ Rejets en mer (avec confirmation < 15 ppm)\n→ Déchargements à terre\n\n⚠️ MAGIC PIPE = CRIME MARITIME\nTuyau de dérivation contournant le séparateur\nPrison · Amende jusqu'à $1 million\nProgramme whistleblower USCG : $150 000 récompense\n\nFAUX ENREGISTREMENT :\nSigné par officier = crime · prison + amende",
      p4:"PARTIE 4 — GESTION DES ORDURES",s4t:"Catégories MARPOL V et règles de rejet",
      s4:"RÈGLE ABSOLUE :\nPlastiques = INTERDITS PARTOUT en mer\n\nRÈGLES PAR CATÉGORIE :\nDéchets alimentaires : > 3 milles (zones normales)\nPapier/carton : > 12 milles\nVerre/métal : > 12 milles\nRésidus huileux : INTERDIT en mer → terre\nDéchets médicaux : INTERDIT en mer → terre\n\nDOCUMENTS OBLIGATOIRES :\nGarbage Management Plan (GMP)\nGarbage Record Book (GRB)\n\nINFRACTION PLASTIQUES :\nAmende USA : $25 000 minimum par infraction",
      p5:"🎯 EXERCICES AVANCÉS PREMIUM",p6:"⚠️ CAS RÉEL",p7:"📝 BANQUE 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — LEÇON 6 MACHINE",
      sumP:["MARPOL 6 annexes : I(huile)·II(chimiques)·III(IMDG)·IV(eaux usées)·V(ordures)·VI(air)","Annexe I : 15 ppm eau de cale · ORB 3 ans","Annexe V : plastiques INTERDITS partout en mer","Annexe VI : SOx 0,5% mondial · 0,1% ECA · IMO 2020","ECA : Baltique · Mer du Nord · Amérique du Nord · Caraïbes · Norvège","Magic pipe = prison + amende $1M · whistleblower $150K","PSC vérifie ORB · BDN · IAPP · GRB","CII + EEDI : décarbonation maritime progressive"],
      learnedP:["MARPOL 6 annexes I à VI","ECA SOx 0,1% · 5 zones mondiales","ORB 3 ans · 15 ppm · magic pipe = prison","Plastiques INTERDITS en mer · GMP + GRB","IMO 2020 : 0,5% SOx mondial depuis 2020"],
    },
    en:{
      badge:"🌊 Engine Module · Lesson 1/6 · ⭐ Premium · 200 XP",
      title:"MARPOL, ECA Zones & Environmental Protection",
      intro:"The oceans cover 71% of the Earth. Each year, millions of tonnes of pollutants are dumped. MARPOL is the international response: the convention that protects the world's seas.\n\nThis lesson covers the 6 MARPOL annexes, ECA zones, Oil Record Book and waste management.",
      p1:"PART 1 — MARPOL: 6 ANNEXES",s1t:"I·II·III·IV·V·VI — pollution types and rules",
      s1:"MARPOL = MARine POLlution\nIMO Convention (1973/1978)\nProtects oceans against 6 types of pollution\n\n6 ANNEXES:\nI   = Oil (HFO, MDO) → 15 ppm\nII  = Noxious liquid substances (chemicals)\nIII = Dangerous goods (IMDG packages)\nIV  = Sewage (toilets, showers)\nV   = Garbage (plastics PROHIBITED everywhere)\nVI  = Air pollution (SOx, NOx, CO2)\n\nANNEX VI — IMO 2020:\nGlobal SOx: 3.5% → 0.5% since 2020\nECA: 0.1% SOx\nNOx: Tier I/II/III by zone and engine age",
      p2:"PART 2 — WORLD ECA MAP",s2t:"Emission Control Areas — interactive",
      s2:"ECA = Emission Control Area\nZones with stricter SOx and NOx limits\n\n5 ACTIVE ECA ZONES:\nBaltic Sea: SOx 0.1% · NOx Tier III · since 2006\nNorth Sea: SOx 0.1% · NOx Tier III · since 2007\nNorth America: SOx 0.1% · NOx Tier III · since 2012\nUS Caribbean: SOx 0.1% · NOx Tier III · since 2012\nNorway: SOx 0.1% · NOx Tier II · since 2019\n\nSOLUTIONS FOR ECA COMPLIANCE:\n→ LSFO (Low Sulfur Fuel Oil) < 0.1% S\n→ Scrubber (exhaust gas cleaning system)\n→ LNG (Liquefied Natural Gas)",
      p3:"PART 3 — OIL RECORD BOOK (ORB)",s3t:"Hydrocarbon record simulator",
      s3:"ORB = Oil Record Book\nMandatory on all vessels > 150 GT\nRetention: minimum 3 years on board\n\nMANDATORY CONTENT:\n→ All operations involving oil or oily water\n→ Bilge water transfers → separator\n→ Sea discharges (with < 15 ppm confirmation)\n→ Shore discharges\n\n⚠️ MAGIC PIPE = MARITIME CRIME\nBypass pipe circumventing separator\nPrison · Fine up to $1 million\nUSCG whistleblower program: $150,000 reward",
      p4:"PART 4 — GARBAGE MANAGEMENT",s4t:"MARPOL V categories and discharge rules",
      s4:"ABSOLUTE RULE:\nPlastics = PROHIBITED EVERYWHERE at sea\n\nRULES BY CATEGORY:\nFood waste: > 3 miles (normal zones)\nPaper/cardboard: > 12 miles\nGlass/metal: > 12 miles\nOily residues: PROHIBITED at sea → shore\nMedical waste: PROHIBITED at sea → shore\n\nMANDATORY DOCUMENTS:\nGarbage Management Plan (GMP)\nGarbage Record Book (GRB)",
      p5:"🎯 ADVANCED PREMIUM EXERCISES",p6:"⚠️ REAL ACCIDENT CASE",p7:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY — ENGINE LESSON 6",
      sumP:["MARPOL 6 annexes: I(oil)·II(chemicals)·III(IMDG)·IV(sewage)·V(garbage)·VI(air)","Annex I: 15 ppm bilge water · ORB 3 years","Annex V: plastics PROHIBITED everywhere at sea","Annex VI: SOx 0.5% global · 0.1% ECA · IMO 2020","ECA: Baltic · North Sea · North America · Caribbean · Norway","Magic pipe = prison + $1M fine · whistleblower $150K","PSC checks ORB · BDN · IAPP · GRB","CII + EEDI: progressive maritime decarbonization"],
      learnedP:["MARPOL 6 annexes I to VI","ECA SOx 0.1% · 5 global zones","ORB 3 years · 15 ppm · magic pipe = prison","Plastics PROHIBITED at sea · GMP + GRB","IMO 2020: 0.5% SOx global since 2020"],
    },
    es:{
      badge:"🌊 Módulo Máquinas · Lección 1/6 · ⭐ Premium · 200 XP",
      title:"MARPOL, Zonas ECA & Protección del Medio Ambiente",
      intro:"Los océanos cubren el 71% de la Tierra. Cada año se vierten millones de toneladas de contaminantes. MARPOL es la respuesta internacional: el convenio que protege los mares del mundo.",
      p1:"PARTE 1 — MARPOL: LOS 6 ANEXOS",s1t:"I·II·III·IV·V·VI — tipos de contaminación y reglas",
      s1:"MARPOL = MARine POLlution\nConvenio OMI (1973/1978)\n\n6 ANEXOS:\nI   = Hidrocarburos (HFO, MDO) → 15 ppm\nII  = Sustancias nocivas líquidas (químicos)\nIII = Mercancías peligrosas (IMDG)\nIV  = Aguas residuales\nV   = Basuras (plásticos PROHIBIDOS en todas partes)\nVI  = Contaminación atmosférica (SOx, NOx, CO2)\n\nANEXO VI — IMO 2020:\nSOx mundial: 3,5% → 0,5% desde 2020\nECA: 0,1% SOx",
      p2:"PARTE 2 — MAPA ECA MUNDIAL",s2t:"Zonas de control de emisiones — interactivo",
      s2:"ECA = Emission Control Area\n5 ZONAS ECA ACTIVAS:\nMar Báltico · Mar del Norte · América del Norte · Caribe EE.UU. · Noruega\n\nSOLUCIONES PARA CUMPLIR LAS ECA:\n→ LSFO < 0,1% S · Scrubber · GNL",
      p3:"PARTE 3 — LIBRO DE REGISTRO DE HIDROCARBUROS (ORB)",s3t:"Simulador de registro de hidrocarburos",
      s3:"ORB = Libro de Registro de Hidrocarburos\nObligatorio en todos los buques > 150 TB\nConservación: mínimo 3 años a bordo\n\n⚠️ MAGIC PIPE = DELITO MARÍTIMO\nTubería que elude el separador\nPrisión · Multa hasta $1 millón\nPrograma whistleblower USCG: $150.000 recompensa",
      p4:"PARTE 4 — GESTIÓN DE BASURAS",s4t:"Categorías MARPOL V y reglas de vertido",
      s4:"REGLA ABSOLUTA:\nPlásticos = PROHIBIDOS EN TODAS PARTES en el mar\n\nCATEGORÍAS:\nRestos alimentarios: > 3 millas\nPapel/cartón: > 12 millas\nResiduos oleosos: PROHIBIDO en el mar\n\nDOCUMENTOS:\nGarbage Management Plan (GMP)\nGarbage Record Book (GRB)",
      p5:"🎯 EJERCICIOS AVANZADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — LECCIÓN 6 MÁQUINAS",
      sumP:["MARPOL 6 anexos: I·II·III·IV·V·VI","Anexo I: 15 ppm agua sentina · ORB 3 años","Anexo V: plásticos PROHIBIDOS en todas partes","Anexo VI: SOx 0,5% mundial · 0,1% ECA · IMO 2020","ECA: Báltico · Mar del Norte · América del Norte · Caribe · Noruega","Magic pipe = prisión + multa $1M · whistleblower $150K"],
      learnedP:["MARPOL 6 anexos I a VI","ECA SOx 0,1% · 5 zonas mundiales","ORB 3 años · 15 ppm · magic pipe = prisión","Plásticos PROHIBIDOS · GMP + GRB","IMO 2020: 0,5% SOx mundial desde 2020"],
    },
    pt:{
      badge:"🌊 Módulo Máquinas · Lição 1/6 · ⭐ Premium · 200 XP",
      title:"MARPOL, Zonas ECA & Proteção do Ambiente",
      intro:"Os oceanos cobrem 71% da Terra. Cada ano são despejados milhões de toneladas de poluentes. O MARPOL é a resposta internacional: a convenção que protege os mares do mundo.",
      p1:"PARTE 1 — MARPOL: OS 6 ANEXOS",s1t:"I·II·III·IV·V·VI — tipos de poluição e regras",
      s1:"MARPOL = MARine POLlution\nConvenção IMO (1973/1978)\n\n6 ANEXOS:\nI   = Hidrocarbonetos (HFO, MDO) → 15 ppm\nII  = Substâncias nocivas líquidas (químicos)\nIII = Mercadorias perigosas (IMDG)\nIV  = Águas residuais\nV   = Lixo (plásticos PROIBIDOS em todo lado)\nVI  = Poluição atmosférica (SOx, NOx, CO2)\n\nANEXO VI — IMO 2020:\nSOx mundial: 3,5% → 0,5% desde 2020\nECA: 0,1% SOx",
      p2:"PARTE 2 — MAPA ECA MUNDIAL",s2t:"Zonas de controlo de emissões — interativo",
      s2:"ECA = Emission Control Area\n5 ZONAS ECA ATIVAS:\nMar Báltico · Mar do Norte · América do Norte · Caraíbas EUA · Noruega\n\nSOLUÇÕES PARA CUMPRIR AS ECA:\n→ LSFO < 0,1% S · Scrubber · GNL",
      p3:"PARTE 3 — LIVRO DE REGISTO DE HIDROCARBONETOS (ORB)",s3t:"Simulador de registo de hidrocarbonetos",
      s3:"ORB = Livro de Registo de Hidrocarbonetos\nObrigatório em todos os navios > 150 AB\nConservação: mínimo 3 anos a bordo\n\n⚠️ MAGIC PIPE = CRIME MARÍTIMO\nTubo de derivação que contorna o separador\nPrisão · Multa até $1 milhão\nPrograma whistleblower USCG: $150.000 recompensa",
      p4:"PARTE 4 — GESTÃO DE LIXO",s4t:"Categorias MARPOL V e regras de descarga",
      s4:"REGRA ABSOLUTA:\nPlásticos = PROIBIDOS EM TODO LADO no mar\n\nCATEGORIAS:\nResíduos alimentares: > 3 milhas\nPapel/cartão: > 12 milhas\nResíduos oleosos: PROIBIDO no mar\n\nDOCUMENTOS:\nGarbage Management Plan (GMP)\nGarbage Record Book (GRB)",
      p5:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — LIÇÃO 6 MÁQUINAS",
      sumP:["MARPOL 6 anexos: I·II·III·IV·V·VI","Anexo I: 15 ppm água porão · ORB 3 anos","Anexo V: plásticos PROIBIDOS em todo lado","Anexo VI: SOx 0,5% mundial · 0,1% ECA · IMO 2020","ECA: Báltico · Mar do Norte · América do Norte · Caraíbas · Noruega","Magic pipe = prisão + multa $1M · whistleblower $150K"],
      learnedP:["MARPOL 6 anexos I a VI","ECA SOx 0,1% · 5 zonas mundiais","ORB 3 anos · 15 ppm · magic pipe = prisão","Plásticos PROIBIDOS · GMP + GRB","IMO 2020: 0,5% SOx mundial desde 2020"],
    },
  };
  return d[lang]||d.fr;
};

export default function LessonMARPOL({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t=T[lang]||T.fr;const quiz=QUIZ[lang]||QUIZ.fr;const lc=getContent(lang);
  const [phase,setPhase]=useState("content");const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#031a0a 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.green}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.green,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🌊 {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 1/6":lang==="en"?"Lesson 1/6":lang==="es"?"Lección 1/6":"Lição 1/6"}</div>
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
            <SL icon="📋" text={lc.p1} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.teal}33`}}>
              <div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📋 {lang==="fr"?"ANNEXES MARPOL — INTERACTIF":lang==="en"?"MARPOL ANNEXES — INTERACTIVE":lang==="es"?"ANEXOS MARPOL — INTERACTIVO":"ANEXOS MARPOL — INTERATIVO"}</div>
              <MarpolAnnexesSVG lang={lang}/>
            </Card>
            <SL icon="🗺️" text={lc.p2} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold2}33`,background:"linear-gradient(135deg,rgba(232,185,79,0.05),rgba(13,31,60,0.8))"}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🗺️ {lang==="fr"?"CARTE ECA MONDIALE — INTERACTIVE":lang==="en"?"WORLD ECA MAP — INTERACTIVE":lang==="es"?"MAPA ECA MUNDIAL — INTERACTIVO":"MAPA ECA MUNDIAL — INTERATIVO"}</div>
              <ECAMapSVG lang={lang}/>
            </Card>
            <SL icon="📝" text={lc.p3} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📝 {lang==="fr"?"OIL RECORD BOOK — SIMULATEUR":lang==="en"?"OIL RECORD BOOK — SIMULATOR":lang==="es"?"OIL RECORD BOOK — SIMULADOR":"OIL RECORD BOOK — SIMULADOR"}</div>
              <OilRecordBookSVG lang={lang}/>
            </Card>
            <SL icon="🗑️" text={lc.p4} color={C.green}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.green}33`}}>
              <div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🗑️ {lang==="fr"?"GESTION ORDURES — INTERACTIF":lang==="en"?"GARBAGE MANAGEMENT — INTERACTIVE":lang==="es"?"GESTIÓN BASURAS — INTERACTIVO":"GESTÃO DE LIXO — INTERATIVO"}</div>
              <GarbageSVG lang={lang}/>
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
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz — MARPOL & ECA":lang==="en"?"Quiz — MARPOL & ECA":lang==="es"?"Quiz — MARPOL & ECA":"Quiz — MARPOL & ECA"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 1":lang==="en"?"Lesson 1":lang==="es"?"Lección 1":"Lição 1"}</div>
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
              {lang==="fr"?"LEÇON 7 — DROIT MARITIME & CONVENTIONS →":lang==="en"?"LESSON 7 — MARITIME LAW & CONVENTIONS →":lang==="es"?"LECCIÓN 7 — DERECHO MARÍTIMO & CONVENIOS →":"LIÇÃO 7 — DIREITO MARÍTIMO & CONVENÇÕES →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
