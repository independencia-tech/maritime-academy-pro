import { useState } from "react";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f",
  blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)",
  border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22",
  teal:"#0a8a6c",
  // Map colors
  seaDeep:"#0a2040", seaMid:"#0d3060", seaShallow:"#1a5080",
  seaVeryShallow:"#2a7aaa", land:"#2d4a1e", landLight:"#3a5e28",
  sand:"#c8a96e", danger:"rgba(192,57,43,0.4)",
};

// ══════════════════════════════════════════
// CARTE 1 — GOLFE DE GUINÉE
// ══════════════════════════════════════════
function CarteGolfeGuinee({ lang }) {
  const [popup, setPopup] = useState(null);
  const [showBearing, setShowBearing] = useState(false);

  const labels = {
    fr:{ title:"Golfe de Guinée — Côte Camerounaise", subtitle:"Extrait de carte marine · Zone Douala → Kribi", clickHint:"Touche les éléments pour les identifier", bearingBtn:"Afficher le relèvement", hideBearing:"Masquer le relèvement", ship:"Notre Navire", kribi:"Kribi", douala:"Douala", wouri:"Fl. Wouri", kribiLighthouse:"Phare de Kribi", shallow:"Hauts-fonds", channel:"Chenal Douala", coordLabel:"Position GPS", bearingLabel:"Relèvement vers phare", },
    en:{ title:"Gulf of Guinea — Cameroonian Coast", subtitle:"Nautical chart extract · Douala → Kribi zone", clickHint:"Tap elements to identify them", bearingBtn:"Show bearing", hideBearing:"Hide bearing", ship:"Our Vessel", kribi:"Kribi", douala:"Douala", wouri:"Wouri R.", kribiLighthouse:"Kribi Lighthouse", shallow:"Shoals", channel:"Douala Channel", coordLabel:"GPS Position", bearingLabel:"Bearing to lighthouse", },
    es:{ title:"Golfo de Guinea — Costa Camerunesa", subtitle:"Extracto de carta náutica · Zona Douala → Kribi", clickHint:"Toca los elementos para identificarlos", bearingBtn:"Mostrar marcación", hideBearing:"Ocultar marcación", ship:"Nuestro Buque", kribi:"Kribi", douala:"Duala", wouri:"R. Wouri", kribiLighthouse:"Faro de Kribi", shallow:"Bajos fondos", channel:"Canal de Duala", coordLabel:"Posición GPS", bearingLabel:"Marcación al faro", },
    pt:{ title:"Golfo da Guiné — Costa dos Camarões", subtitle:"Extrato de carta náutica · Zona Douala → Kribi", clickHint:"Toque os elementos para identificá-los", bearingBtn:"Mostrar marcação", hideBearing:"Ocultar marcação", ship:"Nosso Navio", kribi:"Kribi", douala:"Douala", wouri:"R. Wouri", kribiLighthouse:"Farol de Kribi", shallow:"Baixios", channel:"Canal de Douala", coordLabel:"Posição GPS", bearingLabel:"Marcação ao farol", },
  };
  const L = labels[lang]||labels.fr;

  const popups = {
    lighthouse:{
      fr:"⚡ PHARE DE KRIBI\nFl(2) W 10s 45m 18M\n\nDescription :\nFl(2) = 2 éclats groupés\nW = Blanc (secteur unique)\n10s = période 10 secondes\n45m = hauteur 45 mètres\n18M = portée 18 milles nautiques\n\nPosition : 02°56'N · 009°54'E\nStructure : Tour blanche et rouge\nVisible depuis : ~18 milles nautiques (nuit)",
      en:"⚡ KRIBI LIGHTHOUSE\nFl(2) W 10s 45m 18M\n\nDescription:\nFl(2) = 2 grouped flashes\nW = White (single sector)\n10s = period 10 seconds\n45m = height 45 meters\n18M = range 18 nautical miles\n\nPosition: 02°56'N · 009°54'E\nStructure: White and red tower\nVisible from: ~18 nautical miles (night)",
      es:"⚡ FARO DE KRIBI\nFl(2) W 10s 45m 18M\n\nDescripción:\nFl(2) = 2 destellos agrupados\nW = Blanco (sector único)\n10s = período 10 segundos\n45m = altura 45 metros\n18M = alcance 18 millas náuticas\n\nPosición: 02°56'N · 009°54'E\nEstructura: Torre blanca y roja",
      pt:"⚡ FAROL DE KRIBI\nFl(2) W 10s 45m 18M\n\nDescrição:\nFl(2) = 2 lampejos agrupados\nW = Branco (setor único)\n10s = período 10 segundos\n45m = altura 45 metros\n18M = alcance 18 milhas náuticas\n\nPosição: 02°56'N · 009°54'E\nEstrutura: Torre branca e vermelha",
    },
    ship:{
      fr:"🚢 NOTRE NAVIRE\n\nPosition GPS :\nLat : 03°45,2'N\nLon : 009°32,5'E\n\nCap vrai : 195°\nVitesse : 12 nœuds\nCap vers Kribi\n\nUTC : 14:32\nTirant d'eau : 8,5 m\nProchaine escale : Port de Kribi",
      en:"🚢 OUR VESSEL\n\nGPS Position:\nLat: 03°45.2'N\nLon: 009°32.5'E\n\nTrue heading: 195°\nSpeed: 12 knots\nHeading toward Kribi\n\nUTC: 14:32\nDraft: 8.5m\nNext port: Kribi",
      es:"🚢 NUESTRO BUQUE\n\nPosición GPS:\nLat: 03°45,2'N\nLon: 009°32,5'E\n\nRumbo verdadero: 195°\nVelocidad: 12 nudos\nRumbo hacia Kribi\n\nUTC: 14:32\nCalado: 8,5 m\nPróximo puerto: Kribi",
      pt:"🚢 NOSSO NAVIO\n\nPosição GPS:\nLat: 03°45,2'N\nLon: 009°32,5'E\n\nRumo verdadeiro: 195°\nVelocidade: 12 nós\nRumo para Kribi\n\nUTC: 14:32\nCalado: 8,5 m\nPróximo porto: Kribi",
    },
    stbd_buoy:{
      fr:"🟢 BOUÉE TRIBORD\nChenal d'accès Douala\n\nSystème AISM A\nForme : Conique verte\nFeu : Fl G 4s\n→ Laisser à TRIBORD (droite)\n   en entrant au port de Douala\n\nMarque le côté navigable\ndu chenal principal",
      en:"🟢 STARBOARD BUOY\nDouala approach channel\n\nIALA System A\nShape: Green conical\nLight: Fl G 4s\n→ Leave to STARBOARD (right)\n   entering Douala port\n\nMarks the navigable side\nof the main channel",
      es:"🟢 BALIZA DE ESTRIBOR\nCanal de acceso a Duala\n\nSistema IALA A\nForma: Cónica verde\nLuz: Fl V 4s\n→ Dejar a ESTRIBOR (derecha)\n   al entrar al puerto de Duala",
      pt:"🟢 BOIA DE ESTIBORDO\nCanal de acesso a Douala\n\nSistema IALA A\nForma: Cônica verde\nLuz: Fl V 4s\n→ Deixar a ESTIBORDO (direita)\n   ao entrar no porto de Douala",
    },
    port_buoy:{
      fr:"🔴 BOUÉE BÂBORD\nChenal d'accès Douala\n\nSystème AISM A\nForme : Cylindrique rouge\nFeu : Fl R 4s\n→ Laisser à BÂBORD (gauche)\n   en entrant au port de Douala\n\nAttention : hauts-fonds\nau-delà de cette bouée",
      en:"🔴 PORT BUOY\nDouala approach channel\n\nIALA System A\nShape: Red cylindrical\nLight: Fl R 4s\n→ Leave to PORT (left)\n   entering Douala port\n\nCaution: shoals\nbeyond this buoy",
      es:"🔴 BALIZA DE BABOR\nCanal de acceso a Duala\n\nSistema IALA A\nForma: Cilíndrica roja\nLuz: Fl R 4s\n→ Dejar a BABOR (izquierda)\n   al entrar al puerto de Duala",
      pt:"🔴 BOIA DE BOMBORDO\nCanal de acesso a Douala\n\nSistema IALA A\nForma: Cilíndrica vermelha\nLuz: Fl R 4s\n→ Deixar a BOMBORDO (esquerda)\n   ao entrar no porto de Douala",
    },
    cardinal:{
      fr:"⬛🟡 BOUÉE CARDINALE NORD\nBanc de sable — Mouillage Nord\n\nCouleur : NOIR sur JAUNE\nTête : 2 cônes ▲▲ (pointes en haut)\nFeu : VQ (très rapide continu)\n\n→ Passer au NORD de cette bouée\n→ Le danger (banc de sable) est au SUD\n\nProfondeur au banc : 3,2 m\n(Dangereux pour navires >3m tirant d'eau)",
      en:"⬛🟡 NORTH CARDINAL BUOY\nSandbank — North Anchorage\n\nColor: BLACK over YELLOW\nTopmark: 2 cones ▲▲ (points up)\nLight: VQ (very quick continuous)\n\n→ Pass to the NORTH\n→ Danger (sandbank) is to the SOUTH\n\nDepth at bank: 3.2m\n(Dangerous for vessels with draft >3m)",
      es:"⬛🟡 BOYA CARDINAL NORTE\nBanco de arena — Fondeo Norte\n\nColor: NEGRO sobre AMARILLO\nMarcas: 2 conos ▲▲ (puntas arriba)\nLuz: VQ (muy rápido continuo)\n\n→ Pasar al NORTE\n→ Peligro (banco de arena) al SUR\n\nProfundidad en el banco: 3,2 m",
      pt:"⬛🟡 BOIA CARDINAL NORTE\nBanco de areia — Fundeio Norte\n\nCor: PRETO sobre AMARELO\nMarcas: 2 cones ▲▲ (pontas acima)\nLuz: VQ (muito rápido contínuo)\n\n→ Passar ao NORTE\n→ Perigo (banco de areia) ao SUL\n\nProfundidade no banco: 3,2 m",
    },
    shallow:{
      fr:"⚠️ HAUTS-FONDS CÔTIERS\n\nProfondeurs : 0 à 5 mètres\nReprésentés en bleu clair sur la carte\n\nDangers :\n• Échouage possible\n• Navigation déconseillée\n• Seuls les pirogues et petits bateaux\n  peuvent naviguer ici\n\nSurveillance recommandée :\n• Sondeur actif\n• Cartes à grande échelle (1:25 000)\n• Pilote local conseillé",
      en:"⚠️ COASTAL SHOALS\n\nDepths: 0 to 5 meters\nShown in light blue on the chart\n\nDangers:\n• Possible grounding\n• Navigation inadvisable\n• Only canoes and small boats\n  can navigate here\n\nRecommended precautions:\n• Active echosounder\n• Large scale charts (1:25,000)\n• Local pilot advised",
      es:"⚠️ BAJOS FONDOS COSTEROS\n\nProfundidades: 0 a 5 metros\nRepresentados en azul claro en la carta\n\nPeligros:\n• Posible varada\n• Navegación desaconsejada\n• Solo piraguas y botes pequeños\n  pueden navegar aquí",
      pt:"⚠️ BAIXIOS COSTEIROS\n\nProfundidades: 0 a 5 metros\nRepresentados em azul claro na carta\n\nPerigos:\n• Possível encalhe\n• Navegação desaconselhada\n• Apenas canoas e pequenos barcos\n  podem navegar aqui",
    },
  };

  const currentPopup = popup ? popups[popup] : null;
  const popupText = currentPopup ? (currentPopup[lang]||currentPopup.fr) : "";

  // Map dimensions
  const W = 310, H = 240;

  // Land polygon (left/bottom = coast)
  const landPoly = "0,240 0,100 15,95 25,105 20,120 35,118 45,108 55,112 60,105 70,100 75,115 80,108 90,105 95,118 100,112 105,108 108,120 105,130 100,140 95,150 90,160 85,175 80,190 75,210 70,230 65,240";

  // Depth zones (ellipse approximations via path)
  // Very shallow (0-5m) — tight to coast
  const vShallowPoly = "105,108 110,100 115,95 120,100 118,115 115,125 112,140 108,160 105,180 102,200 100,220 98,240 80,240 75,210 80,190 85,175 90,160 95,150 100,140 105,130 108,120";
  // Shallow (5-20m)
  const shallowPoly = "118,115 125,105 135,100 145,105 150,115 148,130 145,145 140,160 135,175 130,195 125,215 120,240 98,240 100,220 102,200 105,180 108,160 112,140 115,125";
  // Mid (20-50m)
  const midPoly = "148,130 155,118 165,112 175,115 180,125 178,142 175,158 170,175 165,192 160,212 155,235 120,240 125,215 130,195 135,175 140,160 145,145";

  return (
    <div>
      <div style={{fontSize:13,fontWeight:700,color:C.gold2,marginBottom:4,fontFamily:"'Cinzel',serif"}}>{L.title}</div>
      <div style={{fontSize:10,color:C.muted,marginBottom:10}}>{L.subtitle}</div>

      {/* THE MAP SVG */}
      <div style={{position:"relative",borderRadius:14,overflow:"hidden",border:`1px solid ${C.border}`}}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display:"block"}}>
          {/* Deep sea background */}
          <rect width={W} height={H} fill={C.seaDeep}/>

          {/* Depth gradient zones */}
          {/* Mid depth (20-50m) */}
          <polygon points={midPoly} fill={C.seaMid} opacity="0.9"/>
          {/* Shallow (5-20m) */}
          <polygon points={shallowPoly} fill={C.seaShallow} opacity="0.9"/>
          {/* Very shallow (0-5m) */}
          <polygon points={vShallowPoly} fill={C.seaVeryShallow} opacity="0.85"
            style={{cursor:"pointer"}} onClick={()=>setPopup(popup==="shallow"?null:"shallow")}/>

          {/* Danger zone hatch (coral/rocks south of Kribi) */}
          <ellipse cx="82" cy="205" rx="18" ry="10"
            fill="rgba(192,57,43,0.3)" stroke={C.red} strokeWidth="0.8" strokeDasharray="3,2"/>
          <text x="82" y="209" textAnchor="middle" fontSize="7" fill={C.red}>⚠️</text>

          {/* Land */}
          <polygon points={landPoly} fill={C.land}/>
          {/* Coast highlight */}
          <polyline points="15,95 25,105 20,120 35,118 45,108 55,112 60,105 70,100 75,115 80,108 90,105 95,118 100,112 105,108"
            fill="none" stroke={C.landLight} strokeWidth="1.5" opacity="0.7"/>

          {/* River (Wouri) */}
          <path d="M 0,80 Q 20,85 30,90 Q 40,92 50,88 Q 58,86 65,80 Q 70,75 72,68"
            fill="none" stroke={C.blue2} strokeWidth="3" opacity="0.6"/>
          <text x="28" y="82" fontSize="7" fill={C.blue2} opacity="0.8">{L.wouri}</text>

          {/* Isobath lines */}
          <polyline points="105,108 118,115 148,130 178,142 200,148 230,145 310,142"
            fill="none" stroke="rgba(77,166,255,0.2)" strokeWidth="0.7" strokeDasharray="4,3"/>
          <text x="232" y="140" fontSize="6" fill="rgba(77,166,255,0.4)">20m</text>
          <polyline points="150,115 175,115 200,118 230,116 310,115"
            fill="none" stroke="rgba(77,166,255,0.15)" strokeWidth="0.7" strokeDasharray="4,3"/>
          <text x="232" y="114" fontSize="6" fill="rgba(77,166,255,0.3)">50m</text>
          <text x="112" y="130" fontSize="6" fill="rgba(77,166,255,0.4)">5m</text>
          <text x="132" y="128" fontSize="6" fill="rgba(77,166,255,0.4)">10m</text>

          {/* Depth values */}
          {[[260,80,"2840"],[230,100,"1650"],[195,130,"820"],[170,155,"245"],[155,170,"62"],[145,155,"38"],[132,145,"18"],[120,155,"9"]].map(([x,y,d])=>(
            <text key={d} x={x} y={y} textAnchor="middle" fontSize="7"
              fill="rgba(77,166,255,0.35)">{d}</text>
          ))}

          {/* Douala city */}
          <circle cx="45" cy="72" r="5" fill={C.orange} opacity="0.85"/>
          <text x="55" y="68" fontSize="9" fontWeight="700" fill={C.orange}>{L.douala}</text>
          <text x="55" y="78" fontSize="6" fill={C.muted}>04°03'N · 009°42'E</text>

          {/* Kribi city */}
          <circle cx="88" cy="188" r="4" fill={C.gold2} opacity="0.85"/>
          <text x="98" y="184" fontSize="9" fontWeight="700" fill={C.gold2}>{L.kribi}</text>
          <text x="98" y="194" fontSize="6" fill={C.muted}>02°56'N · 009°54'E</text>

          {/* KRIBI LIGHTHOUSE — clickable */}
          <g style={{cursor:"pointer"}} onClick={()=>setPopup(popup==="lighthouse"?null:"lighthouse")}>
            {popup==="lighthouse"&&<circle cx="86" cy="168" r="16" fill="none" stroke={C.gold2} strokeWidth="1.5" strokeDasharray="4,2"/>}
            {/* Lighthouse symbol */}
            <polygon points="86,155 90,162 82,162" fill={C.gold2}/>
            <rect x="83" y="162" width="6" height="8" fill={C.gold2} opacity="0.8"/>
            {/* Flashing light rays */}
            {[0,45,90,135,180,225,270,315].map((angle,i)=>{
              const rad=angle*Math.PI/180;
              return <line key={i} x1={86+8*Math.cos(rad)} y1={158+8*Math.sin(rad)}
                x2={86+14*Math.cos(rad)} y2={158+14*Math.sin(rad)}
                stroke={C.gold2} strokeWidth="0.8" opacity="0.5"/>;
            })}
            <text x="94" y="160" fontSize="7" fill={C.gold2} fontWeight="700">{L.kribiLighthouse}</text>
            <text x="94" y="170" fontSize="6" fill={C.gold2} opacity="0.8">Fl(2) W 10s 45m 18M</text>
          </g>

          {/* Bearing line (navire → lighthouse) */}
          {showBearing&&(
            <g>
              <line x1="200" y1="95" x2="86" y2="162"
                stroke={C.gold2} strokeWidth="1.2" strokeDasharray="6,3" opacity="0.8"/>
              <text x="148" y="115" textAnchor="middle" fontSize="8"
                fill={C.gold2} fontWeight="600"
                transform="rotate(-35,148,115)">
                {L.bearingLabel} ≈ 218°V
              </text>
            </g>
          )}

          {/* Chenal Douala — dashed line */}
          <path d="M 60,78 Q 80,95 100,105 Q 112,110 118,115"
            fill="none" stroke="rgba(77,166,255,0.5)" strokeWidth="2.5"
            strokeDasharray="5,3"/>
          <text x="75" y="95" fontSize="6" fill={C.blue2} opacity="0.7"
            transform="rotate(35,75,95)">{L.channel}</text>

          {/* BOUÉE TRIBORD */}
          <g style={{cursor:"pointer"}} onClick={()=>setPopup(popup==="stbd_buoy"?null:"stbd_buoy")}>
            {popup==="stbd_buoy"&&<circle cx="108" cy="116" r="10" fill="none" stroke={C.green} strokeWidth="1.5"/>}
            <polygon points="108,110 112,120 104,120" fill={C.green}/>
            <circle cx="108" cy="109" r="2.5" fill={C.green} opacity="0.9">
              <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite"/>
            </circle>
          </g>

          {/* BOUÉE BÂBORD */}
          <g style={{cursor:"pointer"}} onClick={()=>setPopup(popup==="port_buoy"?null:"port_buoy")}>
            {popup==="port_buoy"&&<circle cx="122" cy="112" r="10" fill="none" stroke={C.red} strokeWidth="1.5"/>}
            <rect x="118" y="108" width="8" height="10" rx="2" fill={C.red}/>
            <circle cx="122" cy="107" r="2.5" fill={C.red} opacity="0.9">
              <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.5s" repeatCount="indefinite"/>
            </circle>
          </g>

          {/* BOUÉE CARDINALE NORD */}
          <g style={{cursor:"pointer"}} onClick={()=>setPopup(popup==="cardinal"?null:"cardinal")}>
            {popup==="cardinal"&&<circle cx="155" cy="135" r="12" fill="none" stroke={C.gold2} strokeWidth="1.5"/>}
            <rect x="151" y="132" width="8" height="14" rx="2" fill="#ffcc00"/>
            <rect x="148" y="122" width="14" height="12" rx="2" fill="#222222"/>
            <polygon points="148,120 155,113 162,120" fill="#222222"/>
            <circle cx="155" cy="111" r="2.5" fill={C.gold2} opacity="0.9">
              <animate attributeName="opacity" values="0.9;0.1;0.9" dur="0.8s" repeatCount="indefinite"/>
            </circle>
          </g>

          {/* OUR SHIP — clickable */}
          <g style={{cursor:"pointer"}} onClick={()=>setPopup(popup==="ship"?null:"ship")}>
            {popup==="ship"&&<circle cx="200" cy="95" r="18" fill="none" stroke={C.blue2} strokeWidth="1.5" strokeDasharray="4,2"/>}
            {/* Ship shape rotated to heading 195° */}
            <g transform="translate(200,95) rotate(195)">
              <polygon points="0,-12 7,6 0,3 -7,6" fill={C.blue2}/>
            </g>
            {/* GPS dot */}
            <circle cx="200" cy="95" r="3" fill={C.blue2}/>
            {/* Coordinates label */}
            <rect x="210" y="80" width="88" height="30" rx="6" fill="rgba(6,14,26,0.85)" stroke={C.blue2} strokeWidth="0.8"/>
            <text x="254" y="91" textAnchor="middle" fontSize="7" fill={C.blue2} fontWeight="700">{L.coordLabel}</text>
            <text x="254" y="101" textAnchor="middle" fontSize="7" fill={C.white}>03°45,2'N · 009°32,5'E</text>
            {/* Arrow from label to ship */}
            <line x1="210" y1="95" x2="203" y2="95" stroke={C.blue2} strokeWidth="0.8" opacity="0.6"/>
          </g>

          {/* North arrow */}
          <g transform="translate(280,20)">
            <circle cx="0" cy="0" r="12" fill="rgba(0,0,0,0.4)" stroke={C.gold} strokeWidth="0.8"/>
            <polygon points="0,-9 3,3 0,0 -3,3" fill={C.white}/>
            <polygon points="0,9 3,-3 0,0 -3,-3" fill="rgba(255,255,255,0.3)"/>
            <text x="0" y="-14" textAnchor="middle" fontSize="8" fill={C.gold2} fontWeight="700">N</text>
          </g>

          {/* Scale bar */}
          <g transform="translate(15,228)">
            <rect x="0" y="0" width="60" height="4" fill="rgba(0,0,0,0.4)"/>
            <rect x="0" y="0" width="30" height="4" fill="rgba(255,255,255,0.6)"/>
            <line x1="0" y1="-2" x2="0" y2="6" stroke={C.white} strokeWidth="0.8"/>
            <line x1="30" y1="-2" x2="30" y2="6" stroke={C.white} strokeWidth="0.8"/>
            <line x1="60" y1="-2" x2="60" y2="6" stroke={C.white} strokeWidth="0.8"/>
            <text x="0" y="13" fontSize="6" fill={C.muted}>0</text>
            <text x="25" y="13" fontSize="6" fill={C.muted}>15mn</text>
            <text x="52" y="13" fontSize="6" fill={C.muted}>30mn</text>
          </g>

          {/* Lat/Lon grid labels */}
          <text x="2" y="10" fontSize="6" fill="rgba(255,255,255,0.25)">4°N</text>
          <text x="2" y="80" fontSize="6" fill="rgba(255,255,255,0.25)">3°30'N</text>
          <text x="2" y="150" fontSize="6" fill="rgba(255,255,255,0.25)">3°N</text>
          <text x="2" y="220" fontSize="6" fill="rgba(255,255,255,0.25)">2°30'N</text>
          <text x="90" y="238" fontSize="6" fill="rgba(255,255,255,0.25)">9°30'E</text>
          <text x="180" y="238" fontSize="6" fill="rgba(255,255,255,0.25)">10°E</text>
          <text x="260" y="238" fontSize="6" fill="rgba(255,255,255,0.25)">10°30'E</text>

          {/* Shallow zone label */}
          <text x="116" y="138" fontSize="7" fill="rgba(42,122,170,0.8)"
            style={{cursor:"pointer"}} onClick={()=>setPopup(popup==="shallow"?null:"shallow")}>
            {L.shallow} ⚠️
          </text>

          {/* Click hint */}
          <rect x="5" y="5" width="130" height="14" rx="4" fill="rgba(0,0,0,0.4)"/>
          <text x="10" y="15" fontSize="7" fill={C.muted}>{L.clickHint}</text>
        </svg>

        {/* Bearing button */}
        <div style={{position:"absolute",bottom:28,right:8}}>
          <button onClick={()=>setShowBearing(v=>!v)} style={{
            padding:"5px 10px",borderRadius:8,fontSize:9,
            background:showBearing?"rgba(201,146,42,0.3)":"rgba(0,0,0,0.5)",
            border:`1px solid ${showBearing?C.gold:C.border}`,
            color:showBearing?C.gold2:C.muted,cursor:"pointer",
            fontFamily:"'Nunito',sans-serif",fontWeight:600,
          }}>
            {showBearing?L.hideBearing:L.bearingBtn}
          </button>
        </div>
      </div>

      {/* POPUP INFO */}
      {popup && (
        <div style={{
          marginTop:10,padding:"12px 14px",borderRadius:14,
          background:"rgba(13,31,60,0.95)",
          border:`1px solid ${popup==="lighthouse"?C.gold:popup==="ship"?C.blue2:popup==="stbd_buoy"?C.green:popup==="port_buoy"?C.red:popup==="cardinal"?C.gold2:C.orange}44`,
          animation:"fadeUp 0.3s ease",
          position:"relative",
        }}>
          <button onClick={()=>setPopup(null)} style={{
            position:"absolute",top:8,right:10,
            background:"none",border:"none",
            color:C.muted,fontSize:16,cursor:"pointer",lineHeight:1,
          }}>✕</button>
          <div style={{fontSize:12,color:C.white,lineHeight:1.75,whiteSpace:"pre-line",paddingRight:20}}>
            {popupText}
          </div>
        </div>
      )}

      {/* LEGEND */}
      <div style={{marginTop:10,display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
        {[
          {color:C.seaVeryShallow,label:lang==="fr"?"0-5m (hauts-fonds)":lang==="es"?"0-5m (bajos fondos)":lang==="pt"?"0-5m (baixios)":"0-5m (shoals)"},
          {color:C.seaShallow,label:lang==="fr"?"5-20m (approche)":lang==="es"?"5-20m (aproximación)":lang==="pt"?"5-20m (aproximação)":"5-20m (approach)"},
          {color:C.seaMid,label:lang==="fr"?"20-50m (côtier)":lang==="es"?"20-50m (costero)":lang==="pt"?"20-50m (costeiro)":"20-50m (coastal)"},
          {color:C.seaDeep,label:lang==="fr"?">50m (hauturier)":lang==="es"?">50m (altura)":lang==="pt"?">50m (alto mar)":">50m (offshore)"},
          {color:C.land,label:lang==="fr"?"Terres":lang==="es"?"Tierras":lang==="pt"?"Terras":"Land"},
          {color:C.red,label:lang==="fr"?"Zone de danger":lang==="es"?"Zona de peligro":lang==="pt"?"Zona de perigo":"Danger zone"},
        ].map((item,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:14,height:10,borderRadius:3,background:item.color,flexShrink:0,border:"1px solid rgba(255,255,255,0.1)"}}/>
            <span style={{fontSize:9,color:C.muted}}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
// CARTE 2 — LA MANCHE / TSS DOVER STRAIT
// ══════════════════════════════════════════
function CarteManche({ lang }) {
  const [popup, setPopup] = useState(null);
  const [showShip, setShowShip] = useState(false);

  const L = {
    fr:{ title:"La Manche — TSS Dover Strait", subtitle:"Dispositif de séparation du trafic le plus fréquenté au monde · 500+ navires/jour", england:"ANGLETERRE", france:"FRANCE", dover:"Douvres", calais:"Calais", capGrisNez:"Cap Gris-Nez", lane_ne:"VOIE NE →", lane_sw:"← VOIE SO", sep:"ZONE SÉPARATION", clickHint:"Touche les zones pour les identifier", addShip:"+ Afficher navire traversant", hideShip:"- Masquer le navire", rule10:"COLREG Rule 10" },
    en:{ title:"English Channel — Dover Strait TSS", subtitle:"World's busiest traffic separation scheme · 500+ vessels/day", england:"ENGLAND", france:"FRANCE", dover:"Dover", calais:"Calais", capGrisNez:"Cap Gris-Nez", lane_ne:"NE LANE →", lane_sw:"← SW LANE", sep:"SEPARATION ZONE", clickHint:"Tap zones to identify them", addShip:"+ Show crossing vessel", hideShip:"- Hide vessel", rule10:"COLREG Rule 10" },
    es:{ title:"Canal de la Mancha — DST Paso de Calais", subtitle:"Dispositivo de separación del tráfico más concurrido del mundo · 500+ buques/día", england:"INGLATERRA", france:"FRANCIA", dover:"Dover", calais:"Calais", capGrisNez:"Cabo Gris-Nez", lane_ne:"VÍA NE →", lane_sw:"← VÍA SO", sep:"ZONA SEPARACIÓN", clickHint:"Toca las zonas para identificarlas", addShip:"+ Mostrar buque cruzando", hideShip:"- Ocultar buque", rule10:"COLREG Regla 10" },
    pt:{ title:"Canal da Mancha — DST Estreito de Dover", subtitle:"Dispositivo de separação do tráfego mais movimentado do mundo · 500+ navios/dia", england:"INGLATERRA", france:"FRANÇA", dover:"Dover", calais:"Calais", capGrisNez:"Cabo Gris-Nez", lane_ne:"VIA NE →", lane_sw:"← VIA SO", sep:"ZONA SEPARAÇÃO", clickHint:"Toque as zonas para identificá-las", addShip:"+ Mostrar navio cruzando", hideShip:"- Ocultar navio", rule10:"COLREG Regra 10" },
  };
  const l = L[lang]||L.fr;

  const popups = {
    ne_lane:{
      fr:"🔵 VOIE NE — Direction NORD-EST\nVers la Mer du Nord\n\nTous les navires naviguent → (vers NE)\n\nOBLIGATIONS Rule 10 :\n✅ Naviguer dans le sens NE\n✅ Entrer aux extrémités si possible\n❌ Pas de demi-tour\n❌ Pas de mouillage\n\nTrafic moyen : 250+ navires/jour\nLargeur voie : ~8 milles nautiques",
      en:"🔵 NE LANE — Northeastbound\nToward the North Sea\n\nAll vessels navigate → (toward NE)\n\nRule 10 OBLIGATIONS:\n✅ Navigate in NE direction\n✅ Enter at ends if possible\n❌ No U-turns\n❌ No anchoring\n\nAverage traffic: 250+ vessels/day\nLane width: ~8 nautical miles",
      es:"🔵 VÍA NE — Dirección NORESTE\nHacia el Mar del Norte\n\nTodos los buques navegan → (hacia NE)\n\nObligaciones Regla 10:\n✅ Navegar en sentido NE\n✅ Entrar por los extremos si es posible\n❌ Sin media vuelta\n❌ Sin fondeo",
      pt:"🔵 VIA NE — Direção NORDESTE\nPara o Mar do Norte\n\nTodos os navios navegam → (para NE)\n\nObrigações Regra 10:\n✅ Navegar no sentido NE\n✅ Entrar pelas extremidades se possível\n❌ Sem meias-voltas\n❌ Sem ancoragem",
    },
    sw_lane:{
      fr:"🟢 VOIE SO — Direction SUD-OUEST\nVers l'Atlantique\n\nTous les navires naviguent ← (vers SO)\n\nOBLIGATIONS Rule 10 :\n✅ Naviguer dans le sens SO\n✅ Sortir aux extrémités\n❌ Pas de demi-tour\n\nTrafic moyen : 250+ navires/jour\nLargeur voie : ~8 milles nautiques",
      en:"🟢 SW LANE — Southwestbound\nToward the Atlantic\n\nAll vessels navigate ← (toward SW)\n\nRule 10 OBLIGATIONS:\n✅ Navigate in SW direction\n✅ Exit at ends\n❌ No U-turns\n\nAverage traffic: 250+ vessels/day",
      es:"🟢 VÍA SO — Dirección SUROESTE\nHacia el Atlántico\n\nTodos los buques navegan ← (hacia SO)\n\nObligaciones Regla 10:\n✅ Navegar en sentido SO\n✅ Salir por los extremos\n❌ Sin media vuelta",
      pt:"🟢 VIA SO — Direção SUDOESTE\nPara o Atlântico\n\nTodos os navios navegam ← (para SO)\n\nObrigações Regra 10:\n✅ Navegar no sentido SO\n✅ Sair pelas extremidades\n❌ Sem meias-voltas",
    },
    sep:{
      fr:"🟠 ZONE DE SÉPARATION\nPas-de-Calais / Dover Strait\n\n⛔ INTERDITE à la navigation normale\n⛔ Pas de mouillage\n⛔ Pas de pêche\n\nExceptions autorisées :\n• Urgence absolue\n• Navires de pêche locaux (avec autorisation)\n\nLargeur : ~2 milles nautiques\nVisible sur carte : zone hachurée\n\nRule 10 : traverser la zone = grave infraction\n→ Risque de collision avec le trafic dense",
      en:"🟠 SEPARATION ZONE\nDover Strait / Pas-de-Calais\n\n⛔ FORBIDDEN for normal navigation\n⛔ No anchoring\n⛔ No fishing\n\nAuthorized exceptions:\n• Absolute emergency\n• Local fishing vessels (with permission)\n\nWidth: ~2 nautical miles\nOn chart: hatched zone\n\nRule 10: crossing the zone = serious violation",
      es:"🟠 ZONA DE SEPARACIÓN\nPaso de Calais\n\n⛔ PROHIBIDA para la navegación normal\n⛔ Sin fondeo ni pesca\n\nExcepciones autorizadas:\n• Urgencia absoluta\n• Pesqueros locales (con permiso)\n\nAncho: ~2 millas náuticas\nRegla 10: cruzar la zona = infracción grave",
      pt:"🟠 ZONA DE SEPARAÇÃO\nEstreito de Dover\n\n⛔ PROIBIDA para navegação normal\n⛔ Sem ancoragem nem pesca\n\nExceções autorizadas:\n• Urgência absoluta\n• Embarcações de pesca locais\n\nLargura: ~2 milhas náuticas\nRegra 10: cruzar a zona = infração grave",
    },
    capgrisnez:{
      fr:"⚡ CAP GRIS-NEZ\nAmer français — Boulogne-sur-Mer\n\nPhare du Cap Gris-Nez :\nFl(2) W 10s 72m 29M\n\nFl(2) = 2 éclats\n72m = hauteur (point le plus élevé)\n29M = portée 29 milles nautiques\n\nC'est le point de la France\nle plus proche de l'Angleterre :\n→ Distance Douvres : 33,3 km\n→ Distance Calais : 28 km\n\nStation radar CROSS Gris-Nez :\nSurveille le trafic de la Manche 24h/24",
      en:"⚡ CAP GRIS-NEZ\nFrench landmark — Boulogne-sur-Mer\n\nCap Gris-Nez Lighthouse:\nFl(2) W 10s 72m 29M\n\nFl(2) = 2 flashes\n72m = height\n29M = range 29 nautical miles\n\nClosest point of France to England:\n→ Distance to Dover: 33.3 km\n→ Distance to Calais: 28 km\n\nCROSS Gris-Nez radar station:\nMonitors Channel traffic 24/7",
      es:"⚡ CABO GRIS-NEZ\nAmer francés — Boulogne-sur-Mer\n\nFaro del Cabo Gris-Nez:\nFl(2) W 10s 72m 29M\n\nPunto más cercano de Francia a Inglaterra:\n→ Distancia a Dover: 33,3 km\n→ Portée: 29 millas náuticas\n\nEstación radar CROSS Gris-Nez:\nVigilancia del Canal 24/7",
      pt:"⚡ CABO GRIS-NEZ\nAmer francês — Boulogne-sur-Mer\n\nFarol do Cabo Gris-Nez:\nFl(2) W 10s 72m 29M\n\nPonto mais próximo da França à Inglaterra:\n→ Distância a Dover: 33,3 km\n→ Alcance: 29 milhas náuticas\n\nEstação radar CROSS Gris-Nez:\nVigilância do Canal 24/7",
    },
    crossing:{
      fr:"🚢 NAVIRE EN TRAVERSÉE\nRoute Calais → Douvres\n\nCe navire (ferry ou cargo) traverse\nle TSS à ANGLE DROIT (90°) selon\nla COLREG Rule 10.\n\nCap vrai : 000° (plein nord)\nL'angle avec le TSS = 90° ✅\n\nObligations :\n✅ Traverser le plus vite possible\n✅ Angle proche de 90°\n✅ Priorité aux navires du TSS\n✅ Surveiller les deux voies\n\nDurée traversée : ~90 minutes\nDistance : ~33 km",
      en:"🚢 CROSSING VESSEL\nCalais → Dover route\n\nThis vessel (ferry or cargo) crosses\nthe TSS at RIGHT ANGLE (90°) per\nCOLREG Rule 10.\n\nTrue heading: 000° (due north)\nAngle with TSS = 90° ✅\n\nObligations:\n✅ Cross as quickly as possible\n✅ Angle close to 90°\n✅ Give way to TSS traffic\n✅ Monitor both lanes\n\nCrossing time: ~90 minutes",
      es:"🚢 BUQUE EN CRUCE\nRuta Calais → Dover\n\nEste buque (ferry o carga) cruza\nel DST en ÁNGULO RECTO (90°)\nsegún COLREG Regla 10.\n\nRumbo verdadero: 000° (norte)\nÁngulo con el DST = 90° ✅\n\nObligaciones:\n✅ Cruzar lo más rápido posible\n✅ Ángulo próximo a 90°\n✅ Ceder paso al tráfico del DST",
      pt:"🚢 NAVIO EM TRAVESSIA\nRota Calais → Dover\n\nEste navio (ferry ou carga) cruza\no DST em ÂNGULO RETO (90°)\nconforme COLREG Regra 10.\n\nRumo verdadeiro: 000° (norte)\nÂngulo com o DST = 90° ✅\n\nObrigações:\n✅ Cruzar o mais rápido possível\n✅ Ângulo próximo de 90°\n✅ Ceder passagem ao tráfego do DST",
    },
  };

  const W2=310, H2=200;

  return (
    <div>
      <div style={{fontSize:13,fontWeight:700,color:C.blue2,marginBottom:4,fontFamily:"'Cinzel',serif"}}>{l.title}</div>
      <div style={{fontSize:10,color:C.muted,marginBottom:10}}>{l.subtitle}</div>

      <div style={{position:"relative",borderRadius:14,overflow:"hidden",border:`1px solid ${C.border}`}}>
        <svg width={W2} height={H2} viewBox={`0 0 ${W2} ${H2}`} style={{display:"block"}}>
          {/* Sea */}
          <rect width={W2} height={H2} fill={C.seaDeep}/>

          {/* England coast (top) */}
          <polygon points="0,0 310,0 310,52 280,55 250,50 220,55 200,50 170,58 140,52 110,58 80,52 50,58 20,55 0,52" fill={C.land}/>
          <text x="155" y="30" textAnchor="middle" fontSize="12" fontWeight="700" fill={C.landLight}>{l.england}</text>

          {/* Dover */}
          <circle cx="255" cy="52" r="4" fill={C.orange}/>
          <text x="255" y="68" textAnchor="middle" fontSize="9" fill={C.orange}>{l.dover}</text>

          {/* France coast (bottom) */}
          <polygon points="0,200 310,200 310,155 280,150 255,155 230,148 210,155 185,148 160,155 130,148 100,155 70,148 40,155 10,148 0,155" fill={C.land}/>
          <text x="155" y="185" textAnchor="middle" fontSize="12" fontWeight="700" fill={C.landLight}>{l.france}</text>

          {/* Calais */}
          <circle cx="230" cy="155" r="4" fill={C.orange}/>
          <text x="230" y="148" textAnchor="middle" fontSize="9" fill={C.orange}>{l.calais}</text>

          {/* Cap Gris-Nez AMER */}
          <g style={{cursor:"pointer"}} onClick={()=>setPopup(popup==="capgrisnez"?null:"capgrisnez")}>
            {popup==="capgrisnez"&&<circle cx="180" cy="148" r="14" fill="none" stroke={C.gold2} strokeWidth="1.5" strokeDasharray="4,2"/>}
            <polygon points="180,140 184,148 176,148" fill={C.gold2}/>
            <rect x="177" y="148" width="6" height="6" fill={C.gold2} opacity="0.8"/>
            {[0,60,120,180,240,300].map((a,i)=>{
              const r=a*Math.PI/180;
              return <line key={i} x1={180+8*Math.cos(r)} y1={144+8*Math.sin(r)}
                x2={180+13*Math.cos(r)} y2={144+13*Math.sin(r)}
                stroke={C.gold2} strokeWidth="0.7" opacity="0.5"/>;
            })}
            <text x="165" y="135" textAnchor="middle" fontSize="7" fill={C.gold2} fontWeight="700">{l.capGrisNez}</text>
            <text x="165" y="145" textAnchor="middle" fontSize="6" fill={C.gold2} opacity="0.8">Fl(2) W 10s 29M</text>
          </g>

          {/* TSS LANES */}
          {/* NE Lane */}
          <rect x="0" y="62" width="310" height="48"
            fill={popup==="ne_lane"?"rgba(26,111,212,0.4)":"rgba(26,111,212,0.2)"}
            stroke={C.blue2} strokeWidth={popup==="ne_lane"?2:0.8}
            style={{cursor:"pointer"}} onClick={()=>setPopup(popup==="ne_lane"?null:"ne_lane")}/>
          <text x="155" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill={C.blue2}>{l.lane_ne}</text>

          {/* NE traffic arrows */}
          {[30,80,130,180,230,280].map(x=>(
            <polygon key={x} points={`${x},78 ${x+14},86 ${x},94`} fill={C.blue2} opacity="0.7"/>
          ))}

          {/* Separation Zone */}
          <g onClick={()=>setPopup(popup==="sep"?null:"sep")} style={{cursor:"pointer"}}>
            <rect x="0" y="112" width="310" height="22"
              fill={popup==="sep"?"rgba(230,126,34,0.4)":"rgba(230,126,34,0.2)"}
              stroke={C.orange} strokeWidth={popup==="sep"?2:0.8}
              strokeDasharray="6,3"/>
            {/* Hatching */}
            {[10,25,40,55,70,85,100,115,130,145,160,175,190,205,220,235,250,265,280,295].map(x=>(
              <line key={x} x1={x} y1="112" x2={x+10} y2="134" stroke={C.orange} strokeWidth="0.5" opacity="0.4"/>
            ))}
            <text x="155" y="126" textAnchor="middle" fontSize="8" fontWeight="700" fill={C.orange}>{l.sep}</text>
          </g>

          {/* SW Lane */}
          <rect x="0" y="136" width="310" height="18"
            fill={popup==="sw_lane"?"rgba(10,138,108,0.4)":"rgba(10,138,108,0.2)"}
            stroke={C.teal} strokeWidth={popup==="sw_lane"?2:0.8}
            style={{cursor:"pointer"}} onClick={()=>setPopup(popup==="sw_lane"?null:"sw_lane")}/>
          <text x="155" y="148" textAnchor="middle" fontSize="9" fontWeight="700" fill={C.teal}>{l.lane_sw}</text>
          {/* SW traffic arrows */}
          {[280,230,180,130,80,30].map(x=>(
            <polygon key={x} points={`${x},138 ${x-12},144 ${x},150`} fill={C.teal} opacity="0.7"/>
          ))}

          {/* Rule 10 label */}
          <rect x="5" y="67" width="85" height="12" rx="4" fill="rgba(0,0,0,0.4)"/>
          <text x="48" y="77" textAnchor="middle" fontSize="7" fill={C.gold2}>{l.rule10}</text>

          {/* Crossing ship */}
          {showShip&&(
            <g style={{cursor:"pointer"}} onClick={()=>setPopup(popup==="crossing"?null:"crossing")}>
              {/* Crossing route line */}
              <line x1="230" y1="155" x2="255" y2="52"
                stroke={C.white} strokeWidth="1.2" strokeDasharray="5,3" opacity="0.7"/>
              {/* 90° angle indicator */}
              <rect x="218" y="108" width="8" height="8"
                fill="none" stroke={C.gold2} strokeWidth="1" opacity="0.8"/>
              <text x="210" y="106" fontSize="6" fill={C.gold2}>90°</text>
              {/* The ship */}
              <g transform="translate(242,103) rotate(0)">
                <polygon points="0,-10 6,5 0,2 -6,5" fill={C.white}/>
              </g>
              <circle cx="242" cy="103" r="2.5" fill={C.white}/>
              {popup==="crossing"&&<circle cx="242" cy="103" r="16" fill="none" stroke={C.white} strokeWidth="1.5" strokeDasharray="4,2"/>}
              <rect x="248" y="96" width="55" height="14" rx="4" fill="rgba(0,0,0,0.6)" stroke={C.white} strokeWidth="0.5"/>
              <text x="275" y="107" textAnchor="middle" fontSize="7" fill={C.white}>Traversée 90°✅</text>
            </g>
          )}

          {/* North arrow */}
          <g transform="translate(285,15)">
            <circle cx="0" cy="0" r="11" fill="rgba(0,0,0,0.4)" stroke={C.gold} strokeWidth="0.8"/>
            <polygon points="0,-8 2.5,2 0,0 -2.5,2" fill={C.white}/>
            <polygon points="0,8 2.5,-2 0,0 -2.5,-2" fill="rgba(255,255,255,0.3)"/>
            <text x="0" y="-13" textAnchor="middle" fontSize="8" fill={C.gold2} fontWeight="700">N</text>
          </g>

          {/* Scale */}
          <g transform="translate(5,190)">
            <rect x="0" y="-4" width="50" height="4" fill="rgba(255,255,255,0.15)"/>
            <rect x="0" y="-4" width="25" height="4" fill="rgba(255,255,255,0.4)"/>
            <text x="0" y="5" fontSize="6" fill={C.muted}>0</text>
            <text x="40" y="5" fontSize="6" fill={C.muted}>20mn</text>
          </g>

          {/* Click hint */}
          <rect x="5" y="5" width="130" height="12" rx="4" fill="rgba(0,0,0,0.4)"/>
          <text x="10" y="14" fontSize="7" fill={C.muted}>{l.clickHint}</text>
        </svg>

        {/* Toggle crossing ship button */}
        <div style={{position:"absolute",bottom:8,right:8}}>
          <button onClick={()=>setShowShip(v=>!v)} style={{
            padding:"5px 10px",borderRadius:8,fontSize:9,
            background:showShip?"rgba(255,255,255,0.15)":"rgba(0,0,0,0.5)",
            border:`1px solid ${showShip?"rgba(255,255,255,0.3)":C.border}`,
            color:showShip?C.white:C.muted,cursor:"pointer",
            fontFamily:"'Nunito',sans-serif",fontWeight:600,
          }}>
            {showShip?l.hideShip:l.addShip}
          </button>
        </div>
      </div>

      {/* POPUP */}
      {popup && (
        <div style={{
          marginTop:10,padding:"12px 14px",borderRadius:14,
          background:"rgba(13,31,60,0.95)",
          border:`1px solid ${popup==="ne_lane"?C.blue2:popup==="sw_lane"?C.teal:popup==="sep"?C.orange:popup==="capgrisnez"?C.gold2:C.white}44`,
          animation:"fadeUp 0.3s ease",position:"relative",
        }}>
          <button onClick={()=>setPopup(null)} style={{position:"absolute",top:8,right:10,background:"none",border:"none",color:C.muted,fontSize:16,cursor:"pointer",lineHeight:1}}>✕</button>
          <div style={{fontSize:12,color:C.white,lineHeight:1.75,whiteSpace:"pre-line",paddingRight:20}}>
            {(popups[popup]?.[lang]||popups[popup]?.fr||"")}
          </div>
        </div>
      )}

      {/* INFO BOX */}
      <div style={{
        marginTop:10,padding:"10px 12px",borderRadius:12,
        background:"rgba(26,111,212,0.1)",
        border:`1px solid ${C.blue2}33`,
        fontSize:11,color:C.muted,lineHeight:1.6,
      }}>
        {lang==="fr"?"🌍 La Manche est le détroit le plus fréquenté du monde. En 2023, plus de 90 000 navires de commerce ont traversé le Pas-de-Calais, soit en moyenne 1 navire toutes les 6 minutes. Sans le TSS et la Rule 10, le risque de collision serait extrême.":
         lang==="es"?"🌍 El Canal de la Mancha es el estrecho más concurrido del mundo. En 2023, más de 90.000 buques mercantes cruzaron el Paso de Calais, uno cada 6 minutos. Sin el DST y la Regla 10, el riesgo de abordaje sería extremo.":
         lang==="pt"?"🌍 O Canal da Mancha é o estreito mais movimentado do mundo. Em 2023, mais de 90.000 navios mercantes cruzaram o Estreito de Dover, um a cada 6 minutos. Sem o DST e a Regra 10, o risco de abalroamento seria extremo.":
         "🌍 The English Channel is the world's busiest strait. In 2023, over 90,000 merchant vessels crossed the Dover Strait — averaging one vessel every 6 minutes. Without the TSS and Rule 10, collision risk would be extreme."}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
// MAIN EXPORT — Both maps combined
// ══════════════════════════════════════════
export default function CartesInteractives({ lang="fr" }) {
  const [activeMap, setActiveMap] = useState("guinea");

  const tabs = {
    fr:[{id:"guinea",label:"🌍 Golfe de Guinée"},{id:"channel",label:"🇫🇷 La Manche TSS"}],
    en:[{id:"guinea",label:"🌍 Gulf of Guinea"},{id:"channel",label:"🇬🇧 Channel TSS"}],
    es:[{id:"guinea",label:"🌍 Golfo de Guinea"},{id:"channel",label:"🇫🇷 La Mancha DST"}],
    pt:[{id:"guinea",label:"🌍 Golfo da Guiné"},{id:"channel",label:"🇫🇷 Canal da Mancha"}],
  };
  const tabList = tabs[lang]||tabs.fr;

  return (
    <div>
      {/* Tab selector */}
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {tabList.map(tab=>(
          <button key={tab.id} onClick={()=>setActiveMap(tab.id)} style={{
            flex:1, padding:"10px 6px", borderRadius:12,
            background:activeMap===tab.id
              ?`linear-gradient(135deg,${tab.id==="guinea"?"rgba(10,138,108,0.3)":"rgba(26,111,212,0.3)"},rgba(13,31,60,0.6))`
              :"rgba(255,255,255,0.05)",
            border:`1.5px solid ${activeMap===tab.id?(tab.id==="guinea"?"#0a8a6c":"#4da6ff"):"rgba(255,255,255,0.1)"}`,
            color:activeMap===tab.id?(tab.id==="guinea"?"#0a8a6c":"#4da6ff"):"rgba(240,244,255,0.45)",
            fontSize:12, fontWeight:activeMap===tab.id?700:400,
            cursor:"pointer", fontFamily:"'Nunito',sans-serif",
          }}>{tab.label}</button>
        ))}
      </div>

      {/* Map content */}
      {activeMap==="guinea"
        ? <CarteGolfeGuinee lang={lang}/>
        : <CarteManche lang={lang}/>
      }
    </div>
  );
}
