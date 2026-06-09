import { useState } from "react";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c",
};

// ══════════════════════════════════════
// SVG SHIPS — each vessel drawn in code
// ══════════════════════════════════════

function ContainerShipSVG() {
  return (
    <svg width="260" height="120" viewBox="0 0 260 120">
      <rect width="260" height="120" fill="#061828" rx="8"/>
      {/* Water */}
      <rect x="0" y="88" width="260" height="32" fill="rgba(26,111,212,0.25)"/>
      <path d="M0,88 Q65,84 130,88 Q195,92 260,88" fill="none" stroke={C.blue2} strokeWidth="1" opacity="0.5"/>
      {/* Hull */}
      <path d="M15,88 L20,70 L240,70 L250,88 Z" fill="#1a3a5c" stroke={C.gold} strokeWidth="1.5"/>
      {/* Containers stacks */}
      {[
        {x:30,y:36,w:30,h:14,c:"#e74c3c"},{x:62,y:36,w:30,h:14,c:"#3498db"},
        {x:94,y:36,w:30,h:14,c:"#2ecc71"},{x:126,y:36,w:30,h:14,c:"#f39c12"},
        {x:158,y:36,w:30,h:14,c:"#9b59b6"},{x:190,y:36,w:30,h:14,c:"#e74c3c"},
        {x:30,y:50,w:30,h:14,c:"#3498db"},{x:62,y:50,w:30,h:14,c:"#e74c3c"},
        {x:94,y:50,w:30,h:14,c:"#f39c12"},{x:126,y:50,w:30,h:14,c:"#2ecc71"},
        {x:158,y:50,w:30,h:14,c:"#9b59b6"},{x:190,y:50,w:30,h:14,c:"#3498db"},
        {x:30,y:64,w:30,h:8,c:"#2ecc71"},{x:62,y:64,w:30,h:8,c:"#e74c3c"},
        {x:94,y:64,w:30,h:8,c:"#3498db"},{x:126,y:64,w:30,h:8,c:"#f39c12"},
        {x:158,y:64,w:30,h:8,c:"#e74c3c"},{x:190,y:64,w:30,h:8,c:"#2ecc71"},
      ].map((b,i)=>(
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={b.c} rx="1" opacity="0.9"/>
          <line x1={b.x+b.w/2} y1={b.y} x2={b.x+b.w/2} y2={b.y+b.h} stroke="rgba(0,0,0,0.3)" strokeWidth="0.8"/>
          <line x1={b.x} y1={b.y+b.h/2} x2={b.x+b.w} y2={b.y+b.h/2} stroke="rgba(0,0,0,0.3)" strokeWidth="0.8"/>
        </g>
      ))}
      {/* Bridge */}
      <rect x="205" y="46" width="30" height="24" fill="#2c3e50" stroke={C.gold} strokeWidth="1"/>
      <rect x="208" y="48" width="8" height="6" fill="rgba(77,200,255,0.6)" rx="1"/>
      <rect x="218" y="48" width="8" height="6" fill="rgba(77,200,255,0.6)" rx="1"/>
      {/* Mast */}
      <line x1="220" y1="20" x2="220" y2="46" stroke={C.muted} strokeWidth="1.5"/>
      <line x1="215" y1="28" x2="235" y2="28" stroke={C.muted} strokeWidth="1"/>
      {/* Bow */}
      <polygon points="15,88 20,70 8,88" fill="#112240"/>
      {/* Waterline reflection */}
      <path d="M20,92 Q130,95 250,92" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
    </svg>
  );
}

function BulkCarrierSVG() {
  return (
    <svg width="260" height="120" viewBox="0 0 260 120">
      <rect width="260" height="120" fill="#061828" rx="8"/>
      <rect x="0" y="88" width="260" height="32" fill="rgba(26,111,212,0.25)"/>
      <path d="M0,88 Q65,84 130,88 Q195,92 260,88" fill="none" stroke={C.blue2} strokeWidth="1" opacity="0.5"/>
      {/* Hull - wider and lower */}
      <path d="M10,88 L18,68 L242,68 L252,88 Z" fill="#8B4513" stroke={C.gold} strokeWidth="1.5"/>
      {/* Main deck */}
      <rect x="18" y="60" width="224" height="8" fill="#A0522D"/>
      {/* Cargo holds (open) */}
      {[20,80,140,190].map((x,i)=>(
        <g key={i}>
          <rect x={x} y={30} width={48} height={30} fill="#2c1810" stroke="#5D4037" strokeWidth="1.5"/>
          {/* Grain/ore texture */}
          <ellipse cx={x+24} cy={52} rx={20} ry={5} fill="#8B6914" opacity="0.8"/>
          <ellipse cx={x+24} cy={49} rx={18} ry={4} fill="#A0832A" opacity="0.7"/>
        </g>
      ))}
      {/* Hatch covers (some open, some closed) */}
      {[20,140].map((x,i)=>(
        <rect key={i} x={x} y={30} width={48} height={5} fill="#607D8B" opacity="0.5"/>
      ))}
      {/* Bridge aft */}
      <rect x="210" y="38" width="28" height="22" fill="#37474F" stroke={C.gold} strokeWidth="1"/>
      <rect x="213" y="40" width="7" height="5" fill="rgba(77,200,255,0.6)" rx="1"/>
      <rect x="222" y="40" width="7" height="5" fill="rgba(77,200,255,0.6)" rx="1"/>
      {/* Cranes */}
      {[50,110,170].map((x,i)=>(
        <g key={i}>
          <rect x={x} y={22} width={3} height={38} fill="#90A4AE"/>
          <line x1={x+1.5} y1={22} x2={x+20} y2={30} stroke="#90A4AE" strokeWidth="1.5"/>
          <line x1={x+20} y1={30} x2={x+20} y2={45} stroke="#90A4AE" strokeWidth="1" strokeDasharray="2,1"/>
        </g>
      ))}
      {/* Funnel */}
      <rect x="225" y="28" width="10" height="12" fill="#455A64" rx="2"/>
      <rect x="223" y="26" width="14" height="4" fill="#546E7A" rx="1"/>
      {/* Smoke */}
      <ellipse cx="230" cy="22" rx="5" ry="3" fill="rgba(180,180,180,0.3)"/>
    </svg>
  );
}

function TankerSVG() {
  return (
    <svg width="260" height="120" viewBox="0 0 260 120">
      <rect width="260" height="120" fill="#061828" rx="8"/>
      <rect x="0" y="88" width="260" height="32" fill="rgba(26,111,212,0.25)"/>
      <path d="M0,88 Q65,84 130,88 Q195,92 260,88" fill="none" stroke={C.blue2} strokeWidth="1" opacity="0.5"/>
      {/* Hull - very long and low */}
      <path d="M8,88 L16,72 L248,72 L255,88 Z" fill="#1a1a2e" stroke={C.orange} strokeWidth="1.5"/>
      {/* Main deck - flat and long */}
      <rect x="16" y="64" width="232" height="8" fill="#16213e"/>
      {/* Pipelines on deck */}
      {[0,1,2].map(i=>(
        <rect key={i} x="25" y={66+i*1.5} width="210" height="1" fill={C.orange} opacity={0.6-i*0.15}/>
      ))}
      {/* Tank domes */}
      {[35,70,105,140,175,210].map((x,i)=>(
        <g key={i}>
          <ellipse cx={x} cy={64} rx={14} ry={4} fill="#0d3b6e" stroke={C.orange} strokeWidth="0.8"/>
          <circle cx={x} cy={63} r={3} fill={C.orange} opacity="0.7"/>
        </g>
      ))}
      {/* Bridge aft */}
      <rect x="218" y="42" width="28" height="22" fill="#0d2137" stroke={C.orange} strokeWidth="1"/>
      <rect x="221" y="44" width="7" height="5" fill="rgba(77,200,255,0.6)" rx="1"/>
      <rect x="230" y="44" width="7" height="5" fill="rgba(77,200,255,0.6)" rx="1"/>
      {/* Bridge wings */}
      <rect x="212" y="52" width="42" height="4" fill="#0d2137" stroke={C.orange} strokeWidth="0.5"/>
      {/* Funnel */}
      <rect x="228" y="30" width="10" height="14" fill="#1a3a5c" rx="2"/>
      <text x="233" y="26" textAnchor="middle" fontSize="8" fill={C.orange}>🔴</text>
      {/* Gangway */}
      <line x1="218" y1="64" x2="16" y2="64" stroke={C.orange} strokeWidth="0.5" strokeDasharray="4,3" opacity="0.4"/>
      {/* VLCC label */}
      <rect x="60" y="74" width="32" height="10" rx="3" fill="rgba(230,126,34,0.2)" stroke={C.orange} strokeWidth="0.5"/>
      <text x="76" y="82" textAnchor="middle" fontSize="7" fill={C.orange} fontWeight="bold">VLCC</text>
    </svg>
  );
}

function LNGCarrierSVG() {
  return (
    <svg width="260" height="120" viewBox="0 0 260 120">
      <rect width="260" height="120" fill="#061828" rx="8"/>
      <rect x="0" y="88" width="260" height="32" fill="rgba(26,111,212,0.25)"/>
      <path d="M0,88 Q65,84 130,88 Q195,92 260,88" fill="none" stroke={C.blue2} strokeWidth="1" opacity="0.5"/>
      {/* Hull */}
      <path d="M12,88 L20,70 L244,70 L252,88 Z" fill="#0d2b47" stroke={C.teal} strokeWidth="1.5"/>
      {/* Deck */}
      <rect x="20" y="62" width="224" height="8" fill="#0a2235"/>
      {/* LNG Spherical tanks — Moss Rosenberg type */}
      {[55,110,165,220].map((cx,i)=>(
        <g key={i}>
          {/* Tank support */}
          <rect x={cx-18} y={62} width={36} height={12} fill="#0a2235"/>
          {/* Sphere */}
          <circle cx={cx} cy={46} r={22} fill={`rgba(10,138,108,${0.4+i*0.05})`} stroke={C.teal} strokeWidth="1.5"/>
          {/* Sphere shine */}
          <ellipse cx={cx-7} cy={38} rx={7} ry={5} fill="rgba(255,255,255,0.12)" transform={`rotate(-20,${cx-7},38)`}/>
          {/* Temperature indicator */}
          <circle cx={cx} cy={46} r={4} fill="none" stroke="rgba(77,255,220,0.5)" strokeWidth="0.8"/>
          <text x={cx} y={49} textAnchor="middle" fontSize="5" fill="rgba(77,255,220,0.7)">LNG</text>
        </g>
      ))}
      {/* Bridge */}
      <rect x="212" y="44" width="28" height="18" fill="#0d2137" stroke={C.teal} strokeWidth="1"/>
      <rect x="215" y="46" width="7" height="5" fill="rgba(77,200,255,0.6)" rx="1"/>
      <rect x="224" y="46" width="7" height="5" fill="rgba(77,200,255,0.6)" rx="1"/>
      {/* Funnel */}
      <rect x="224" y="30" width="10" height="15" fill="#0d3b6e" rx="2"/>
      <text x="229" y="27" textAnchor="middle" fontSize="7" fill={C.teal}>❄️</text>
      {/* -162°C label */}
      <rect x="90" y="26" width="42" height="12" rx="4" fill="rgba(10,138,108,0.25)" stroke={C.teal} strokeWidth="0.8"/>
      <text x="111" y="35" textAnchor="middle" fontSize="7" fill={C.teal} fontWeight="bold">-162°C</text>
    </svg>
  );
}

function OffshoreVesselSVG() {
  return (
    <svg width="260" height="120" viewBox="0 0 260 120">
      <rect width="260" height="120" fill="#061828" rx="8"/>
      <rect x="0" y="88" width="260" height="32" fill="rgba(26,111,212,0.25)"/>
      <path d="M0,88 Q65,84 130,88 Q195,92 260,88" fill="none" stroke={C.blue2} strokeWidth="1" opacity="0.5"/>
      {/* Hull - wide and flat (PSV) */}
      <path d="M20,88 L28,70 L210,70 L218,88 Z" fill="#1a2a1a" stroke={C.green} strokeWidth="1.5"/>
      {/* Flat cargo deck aft */}
      <rect x="28" y="62" width="130" height="8" fill="#152015"/>
      {/* Deck equipment */}
      {[35,60,85,110,135].map((x,i)=>(
        <g key={i}>
          <rect x={x} y={56} width={18} height={6} fill="#1e3a1e" stroke={C.green} strokeWidth="0.5" rx="1"/>
          <text x={x+9} y={62} textAnchor="middle" fontSize="5" fill={C.green} opacity="0.6">📦</text>
        </g>
      ))}
      {/* Bridge/accommodation forward */}
      <rect x="160" y="40" width="50" height="30" fill="#152515" stroke={C.green} strokeWidth="1"/>
      <rect x="163" y="43" width="10" height="7" fill="rgba(77,200,255,0.5)" rx="1"/>
      <rect x="175" y="43" width="10" height="7" fill="rgba(77,200,255,0.5)" rx="1"/>
      <rect x="187" y="43" width="10" height="7" fill="rgba(77,200,255,0.5)" rx="1"/>
      {/* DP antenna */}
      <line x1="185" y1="22" x2="185" y2="40" stroke={C.green} strokeWidth="1.5"/>
      <circle cx="185" cy="20" r="4" fill="none" stroke={C.green} strokeWidth="1"/>
      <circle cx="185" cy="20" r="1.5" fill={C.green}/>
      {/* Thrusters */}
      <ellipse cx="30" cy="85" rx="6" ry="3" fill={C.green} opacity="0.6"/>
      <ellipse cx="208" cy="85" rx="6" ry="3" fill={C.green} opacity="0.6"/>
      {/* Tow wire aft (AHTS) */}
      <path d="M28,80 Q10,82 5,88" fill="none" stroke={C.gold} strokeWidth="1.5" strokeDasharray="3,2"/>
      {/* Funnel */}
      <rect x="192" y="30" width="8" height="12" fill="#1a3a1a" rx="2"/>
      {/* DP label */}
      <rect x="155" y="72" width="20" height="10" rx="3" fill="rgba(30,138,74,0.25)" stroke={C.green} strokeWidth="0.5"/>
      <text x="165" y="80" textAnchor="middle" fontSize="6" fill={C.green} fontWeight="bold">DP2</text>
    </svg>
  );
}

function RoRoFerrySVG() {
  return (
    <svg width="260" height="120" viewBox="0 0 260 120">
      <rect width="260" height="120" fill="#061828" rx="8"/>
      <rect x="0" y="88" width="260" height="32" fill="rgba(26,111,212,0.25)"/>
      <path d="M0,88 Q65,84 130,88 Q195,92 260,88" fill="none" stroke={C.blue2} strokeWidth="1" opacity="0.5"/>
      {/* Hull */}
      <path d="M15,88 L22,68 L242,68 L250,88 Z" fill="#1a1a3a" stroke={C.blue2} strokeWidth="1.5"/>
      {/* Multiple decks */}
      <rect x="22" y="56" width="220" height="12" fill="#151530"/>
      <rect x="22" y="44" width="220" height="12" fill="#12122a"/>
      <rect x="22" y="32" width="220" height="12" fill="#0f0f24"/>
      {/* Windows row 1 */}
      {Array.from({length:16},(_,i)=>(
        <rect key={i} x={30+i*13} y={58} width={9} height={7} fill="rgba(255,220,100,0.7)" rx="1"/>
      ))}
      {/* Windows row 2 */}
      {Array.from({length:16},(_,i)=>(
        <rect key={i} x={30+i*13} y={46} width={9} height={7} fill="rgba(255,220,100,0.5)" rx="1"/>
      ))}
      {/* Windows row 3 */}
      {Array.from({length:16},(_,i)=>(
        <rect key={i} x={30+i*13} y={34} width={9} height={7} fill="rgba(255,220,100,0.35)" rx="1"/>
      ))}
      {/* Bridge top */}
      <rect x="100" y="20" width="70" height="14" fill="#0d1a3a" stroke={C.blue2} strokeWidth="1"/>
      <rect x="108" y="22" width="10" height="7" fill="rgba(77,200,255,0.7)" rx="1"/>
      <rect x="120" y="22" width="10" height="7" fill="rgba(77,200,255,0.7)" rx="1"/>
      <rect x="152" y="22" width="10" height="7" fill="rgba(77,200,255,0.7)" rx="1"/>
      {/* Funnels */}
      <rect x="165" y="12" width="12" height="22" fill="#c0392b" rx="2"/>
      <rect x="180" y="12" width="12" height="22" fill="#c0392b" rx="2"/>
      {/* Smoke */}
      <ellipse cx="171" cy="10" rx="5" ry="3" fill="rgba(180,180,180,0.25)"/>
      <ellipse cx="186" cy="10" rx="5" ry="3" fill="rgba(180,180,180,0.25)"/>
      {/* Ramp aft */}
      <polygon points="242,68 255,88 242,88" fill="#0d1a3a" stroke={C.blue2} strokeWidth="1" opacity="0.7"/>
      {/* Car silhouettes on car deck */}
      {[35,65,95,125,155,185].map((x,i)=>(
        <g key={i} opacity="0.4">
          <rect x={x} y={60} width={24} height={6} fill="#607D8B" rx="2"/>
          <circle cx={x+5} cy={66} r={2} fill="#37474F"/>
          <circle cx={x+19} cy={66} r={2} fill="#37474F"/>
        </g>
      ))}
      {/* FERRY label */}
      <rect x="50" y="74" width="28" height="10" rx="3" fill="rgba(26,111,212,0.25)" stroke={C.blue2} strokeWidth="0.5"/>
      <text x="64" y="82" textAnchor="middle" fontSize="6" fill={C.blue2} fontWeight="bold">FERRY</text>
    </svg>
  );
}

function CruiseShipSVG() {
  return (
    <svg width="260" height="120" viewBox="0 0 260 120">
      <rect width="260" height="120" fill="#061828" rx="8"/>
      <rect x="0" y="88" width="260" height="32" fill="rgba(26,111,212,0.25)"/>
      <path d="M0,88 Q65,84 130,88 Q195,92 260,88" fill="none" stroke={C.blue2} strokeWidth="1" opacity="0.5"/>
      {/* Hull - wide */}
      <path d="M12,88 L20,72 L244,72 L252,88 Z" fill="#1a1a2e" stroke={C.gold} strokeWidth="1.5"/>
      {/* Multiple passenger decks */}
      {[62,52,42,32,22].map((y,i)=>(
        <rect key={i} x={20+i*4} y={y} width={224-i*8} height={10} fill={`rgba(20,20,${40+i*8},0.9)`} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
      ))}
      {/* Windows — many rows */}
      {[5,4,3,2,1].map((row,ri)=>(
        Array.from({length:18},(_,i)=>(
          <rect key={`${ri}-${i}`}
            x={28+ri*4+i*12} y={64-ri*10}
            width={8} height={6}
            fill={`rgba(255,${200+ri*10},${50+ri*20},${0.6-ri*0.08})`} rx="1"/>
        ))
      ))}
      {/* Pool deck on top */}
      <rect x="80" y="16" width="80" height="8" fill="#1a4a6a" stroke={C.blue2} strokeWidth="0.8"/>
      <ellipse cx="120" cy="20" rx="25" ry="4" fill="rgba(26,111,212,0.4)" stroke={C.blue2} strokeWidth="0.8"/>
      {/* Funnels */}
      <rect x="155" y="8" width="14" height="22" fill="#e74c3c" rx="3"/>
      <rect x="172" y="8" width="14" height="22" fill="#e74c3c" rx="3"/>
      {/* Smoke */}
      <ellipse cx="162" cy="6" rx="6" ry="3" fill="rgba(200,200,200,0.2)"/>
      <ellipse cx="179" cy="6" rx="6" ry="3" fill="rgba(200,200,200,0.2)"/>
      {/* Bow rounded */}
      <path d="M12,88 Q10,80 15,72" fill="none" stroke={C.gold} strokeWidth="1.5"/>
      {/* CRUISE label */}
      <rect x="50" y="76" width="36" height="10" rx="3" fill="rgba(201,146,42,0.2)" stroke={C.gold} strokeWidth="0.5"/>
      <text x="68" y="84" textAnchor="middle" fontSize="6" fill={C.gold} fontWeight="bold">CRUISE</text>
    </svg>
  );
}

function OSVAHTSSvg() {
  return (
    <svg width="260" height="120" viewBox="0 0 260 120">
      <rect width="260" height="120" fill="#061828" rx="8"/>
      <rect x="0" y="88" width="260" height="32" fill="rgba(26,111,212,0.25)"/>
      <path d="M0,88 Q65,84 130,88 Q195,92 260,88" fill="none" stroke={C.blue2} strokeWidth="1" opacity="0.5"/>
      {/* Tugboat hull */}
      <path d="M25,88 Q15,80 18,70 L200,70 L210,88 Z" fill="#2d1a0a" stroke={C.orange} strokeWidth="1.5"/>
      {/* Deck */}
      <rect x="18" y="62" width="182" height="8" fill="#241508"/>
      {/* Towing winch */}
      <rect x="22" y="52" width="35" height="10" fill="#3d2a1a" stroke={C.orange} strokeWidth="1"/>
      <ellipse cx="39" cy="57" rx="12" ry="5" fill="#5d3a1a" stroke={C.orange} strokeWidth="1"/>
      <circle cx="39" cy="57" r="4" fill={C.orange} opacity="0.6"/>
      {/* Tow wire */}
      <path d="M22,57 Q5,65 2,88" fill="none" stroke={C.gold} strokeWidth="2"/>
      {/* Superstructure */}
      <rect x="100" y="38" width="70" height="32" fill="#1a0f05" stroke={C.orange} strokeWidth="1"/>
      {/* Windows */}
      {[108,120,132,144,156].map((x,i)=>(
        <rect key={i} x={x} y={42} width={10} height={7} fill="rgba(77,200,255,0.6)" rx="1"/>
      ))}
      {/* Funnel */}
      <rect x="158" y="26" width="10" height="14" fill="#2d1508" rx="2"/>
      <ellipse cx="163" cy="24" rx="7" ry="4" fill="rgba(180,120,60,0.3)"/>
      {/* Anchor handling equipment */}
      <rect x="185" y="54" width="12" height="16" fill="#3d2a1a" stroke={C.orange} strokeWidth="0.8"/>
      {/* DP system */}
      <circle cx="135" cy="30" r="6" fill="none" stroke={C.orange} strokeWidth="1.5"/>
      <line x1="135" y1="22" x2="135" y2="38" stroke={C.orange} strokeWidth="1"/>
      <line x1="127" y1="30" x2="143" y2="30" stroke={C.orange} strokeWidth="1"/>
      {/* AHTS label */}
      <rect x="60" y="74" width="28" height="10" rx="3" fill="rgba(230,126,34,0.2)" stroke={C.orange} strokeWidth="0.5"/>
      <text x="74" y="82" textAnchor="middle" fontSize="6" fill={C.orange} fontWeight="bold">AHTS</text>
      {/* Bollard pull */}
      <text x="200" y="82" textAnchor="middle" fontSize="7" fill={C.gold}>300t</text>
    </svg>
  );
}

// ══════════════════════════════════════
// SHIP DATA
// ══════════════════════════════════════
const getShips = lang => [
  {
    id:"container",
    icon:"📦",
    name:{fr:"Porte-conteneurs",en:"Container Ship",es:"Portacontenedores",pt:"Porta-contentores"},
    svg:<ContainerShipSVG/>,
    specs:{fr:"Capacité : 100 à 24 000 EVP\nVitesse : 18–24 nœuds\nLongueur : 100–400 m\nExemples : MSC Irina, Ever Given",en:"Capacity: 100 to 24,000 TEU\nSpeed: 18–24 knots\nLength: 100–400 m\nExamples: MSC Irina, Ever Given",es:"Capacidad: 100 a 24.000 TEU\nVelocidad: 18–24 nudos\nLongitud: 100–400 m\nEjemplos: MSC Irina, Ever Given",pt:"Capacidade: 100 a 24.000 TEU\nVelocidade: 18–24 nós\nComprimento: 100–400 m\nExemplos: MSC Irina, Ever Given"},
    desc:{fr:"Transport de marchandises en boîtes standardisées (EVP = Equivalent Vingt Pieds = 20 feet). La coloration des conteneurs n'est pas décorative — chaque armateur a ses couleurs. Ces navires ont révolutionné le commerce mondial depuis les années 1960.",en:"Transport of goods in standardized boxes (TEU = Twenty-foot Equivalent Unit). Container colors identify shipping companies. These vessels revolutionized world trade since the 1960s.",es:"Transporte de mercancías en cajas estandarizadas (TEU = Unidad Equivalente a Veinte Pies). Los colores de los contenedores no son decorativos. Estos buques revolucionaron el comercio mundial desde los años 60.",pt:"Transporte de mercadorias em caixas padronizadas (TEU = Unidade Equivalente a Vinte Pés). Revolucionaram o comércio mundial desde os anos 60."},
    stcw:{fr:"STCW II/1 — Officier de quart (pont)",en:"STCW II/1 — Officer in Charge of a Watch",es:"STCW II/1 — Oficial de guardia de navegación",pt:"STCW II/1 — Oficial de quarto de navegação"},
    color:C.blue2,
  },
  {
    id:"bulk",
    icon:"⛏️",
    name:{fr:"Vraquier",en:"Bulk Carrier",es:"Granelero",pt:"Graneleiro"},
    svg:<BulkCarrierSVG/>,
    specs:{fr:"Cargaison : céréales, minerai, charbon, engrais\nVitesse : 12–15 nœuds\nLongueur : 100–360 m\nHandysize / Panamax / Capesize",en:"Cargo: grain, ore, coal, fertilizers\nSpeed: 12–15 knots\nLength: 100–360 m\nHandysize / Panamax / Capesize",es:"Carga: cereales, mineral, carbón, fertilizantes\nVelocidad: 12–15 nudos\nLongitud: 100–360 m",pt:"Carga: cereais, minério, carvão, fertilizantes\nVelocidade: 12–15 nós\nComprimento: 100–360 m"},
    desc:{fr:"Navire à cales ouvertes pour vrac solide. Les cales ne sont pas divisées — on verse directement les céréales, le minerai ou le charbon. Attention à la stabilité : les vracs denses (minerai) abaissent beaucoup G → navire très raide.",en:"Open-hold vessel for dry bulk cargo. Holds are undivided — grain, ore or coal is poured directly in. Stability note: dense cargo (ore) lowers G significantly → very stiff vessel.",es:"Buque con bodegas abiertas para granel sólido. Ojo a la estabilidad: la carga densa (mineral) baja mucho G → buque muy rígido.",pt:"Navio com porões abertos para granéis sólidos. Atenção à estabilidade: carga densa (minério) baixa muito G → navio muito rígido."},
    stcw:{fr:"STCW II/1 — Officier de quart · STCW II/2 — Capitaine",en:"STCW II/1 — OOW · STCW II/2 — Master",es:"STCW II/1 — OOW · STCW II/2 — Capitán",pt:"STCW II/1 — OOW · STCW II/2 — Capitão"},
    color:C.orange,
  },
  {
    id:"tanker",
    icon:"🛢️",
    name:{fr:"Pétrolier (VLCC)",en:"Oil Tanker (VLCC)",es:"Petrolero (VLCC)",pt:"Petroleiro (VLCC)"},
    svg:<TankerSVG/>,
    specs:{fr:"Capacité : jusqu'à 320 000 tonnes\nVitesse : 14–16 nœuds\nLongueur : jusqu'à 380 m\nVLCC = Very Large Crude Carrier",en:"Capacity: up to 320,000 tonnes\nSpeed: 14–16 knots\nLength: up to 380 m\nVLCC = Very Large Crude Carrier",es:"Capacidad: hasta 320.000 toneladas\nVelocidad: 14–16 nudos\nLongitud: hasta 380 m",pt:"Capacidade: até 320.000 toneladas\nVelocidade: 14–16 nós\nComprimento: até 380 m"},
    desc:{fr:"Transport de pétrole brut. Les VLCC sont parmi les plus grands navires au monde. Réglementation MARPOL stricte : double coque obligatoire. Zones ISM/ISGOTT pour les opérations de chargement/déchargement.",en:"Transport of crude oil. VLCCs are among the world's largest vessels. Strict MARPOL regulations: double hull mandatory. ISGOTT procedures for loading/discharging operations.",es:"Transporte de petróleo crudo. Los VLCC son de los más grandes del mundo. MARPOL estricto: doble casco obligatorio.",pt:"Transporte de petróleo bruto. Os VLCCs são dos maiores do mundo. MARPOL: casco duplo obrigatório."},
    stcw:{fr:"STCW V/1-1 — Formation pétroliers/chimiquiers",en:"STCW V/1-1 — Tanker training (oil/chemical)",es:"STCW V/1-1 — Formación en buques tanque",pt:"STCW V/1-1 — Formação em navios-tanque"},
    color:C.orange,
  },
  {
    id:"lng",
    icon:"❄️",
    name:{fr:"Gazier LNG",en:"LNG Carrier",es:"Buque Gasero LNG",pt:"Gaseiro LNG"},
    svg:<LNGCarrierSVG/>,
    specs:{fr:"Cargaison : gaz naturel liquéfié (-162°C)\nVitesse : 17–19 nœuds\nLongueur : 270–345 m\nCapacité : 125 000 à 266 000 m³",en:"Cargo: liquefied natural gas (-162°C)\nSpeed: 17–19 knots\nLength: 270–345 m\nCapacity: 125,000 to 266,000 m³",es:"Carga: gas natural licuado (-162°C)\nVelocidad: 17–19 nudos\nLongitud: 270–345 m",pt:"Carga: gás natural liquefeito (-162°C)\nVelocidade: 17–19 nós\nComprimento: 270–345 m"},
    desc:{fr:"Le gaz naturel est refroidi à -162°C pour devenir liquide (LNG). Les cuves sphériques (type Moss) ou membranes (GTT) maintiennent cette température. Code IGC obligatoire. La boil-off gas (BOG) peut être utilisée comme carburant.",en:"Natural gas is cooled to -162°C to become liquid (LNG). Spherical (Moss) or membrane (GTT) tanks maintain this temperature. IGC Code mandatory. Boil-off gas (BOG) can be used as fuel.",es:"El gas natural se enfría a -162°C. Los tanques esféricos (Moss) o membranas (GTT) mantienen esa temperatura. Código IGC obligatorio.",pt:"O gás natural é arrefecido a -162°C. Tanques esféricos (Moss) ou membranas (GTT). Código IGC obrigatório."},
    stcw:{fr:"STCW V/1-2 — Formation gaziers",en:"STCW V/1-2 — Gas tanker training",es:"STCW V/1-2 — Formación buques gaseros",pt:"STCW V/1-2 — Formação gaseiros"},
    color:C.teal,
  },
  {
    id:"offshore",
    icon:"⚓",
    name:{fr:"Offshore OSV (AHTS/PSV)",en:"Offshore OSV (AHTS/PSV)",es:"Buque Offshore (AHTS/PSV)",pt:"Offshore OSV (AHTS/PSV)"},
    svg:<OffshoreVesselSVG/>,
    specs:{fr:"AHTS : remorqueur ancrage (Anchor Handling Tug Supply)\nPSV : ravitailleur plateforme (Platform Supply Vessel)\nBollard pull : jusqu'à 300 tonnes\nDynamic Positioning DP2/DP3",en:"AHTS: Anchor Handling Tug Supply\nPSV: Platform Supply Vessel\nBollard pull: up to 300 tonnes\nDynamic Positioning DP2/DP3",es:"AHTS: remolcador manejo anclas\nPSV: buque suministro plataforma\nTracción bollard: hasta 300 t · DP2/DP3",pt:"AHTS: rebocador manuseio âncoras\nPSV: navio abastecimento plataforma\nForça de tração: até 300 t · DP2/DP3"},
    desc:{fr:"Navires spécialisés pour l'industrie pétrolière offshore. Le AHTS pose et récupère les ancres des plateformes semi-submersibles. Le PSV ravitaille en carburant, eau, ciment, drill pipes. DP (Dynamic Positioning) = maintien de position automatique sans ancre.",en:"Specialized vessels for offshore oil industry. AHTS anchors and retrieves semi-submersible platform anchors. PSV supplies fuel, water, cement, drill pipes. DP = automatic position keeping without anchors.",es:"Buques especializados para la industria petrolera offshore. DP = mantenimiento automático de posición sin ancla.",pt:"Navios especializados para a indústria petrolífera offshore. DP = manutenção automática de posição sem âncora."},
    stcw:{fr:"STCW II/1 + DP Basic (NI/Nautical Institute)",en:"STCW II/1 + DP Basic (NI/Nautical Institute)",es:"STCW II/1 + DP Básico (NI/Nautical Institute)",pt:"STCW II/1 + DP Básico (NI/Nautical Institute)"},
    color:C.green,
  },
  {
    id:"ferry",
    icon:"🚗",
    name:{fr:"Ferry / RoRo",en:"Ferry / RoRo",es:"Ferry / RoRo",pt:"Ferry / RoRo"},
    svg:<RoRoFerrySVG/>,
    specs:{fr:"RoRo = Roll-on Roll-off (véhicules)\nCapacité : jusqu'à 7 000 véhicules\nVitesse : 18–28 nœuds (HSC > 30 kn)\nPassagers : jusqu'à 4 000 personnes",en:"RoRo = Roll-on Roll-off (vehicles)\nCapacity: up to 7,000 vehicles\nSpeed: 18–28 knots (HSC > 30 kn)\nPassengers: up to 4,000 people",es:"RoRo = Roll-on Roll-off (vehículos)\nCapacidad: hasta 7.000 vehículos\nVelocidad: 18–28 nudos\nPasajeros: hasta 4.000 personas",pt:"RoRo = Roll-on Roll-off (veículos)\nCapacidade: até 7.000 veículos\nVelocidade: 18–28 nós\nPassageiros: até 4.000 pessoas"},
    desc:{fr:"Les véhicules montent à bord par une rampe (ramp) à l'arrière ou à la proue. Compartimentage SOLAS très strict à cause de la surface libre des ponts de garage. Herald of Free Enterprise (1987) : parti avec rampe ouverte → 193 morts. Leçon : portes étanches OBLIGATOIRES.",en:"Vehicles board via stern or bow ramp. SOLAS compartmentalization very strict due to open car deck free surface. Herald of Free Enterprise (1987): departed with ramp open → 193 deaths. Lesson: watertight doors MANDATORY.",es:"Los vehículos embarcan por una rampa. Compartimentado SOLAS muy estricto. Herald of Free Enterprise (1987): zarpó con rampa abierta → 193 muertos.",pt:"Os veículos embarcam por uma rampa. Compartimentagem SOLAS muito rigorosa. Herald of Free Enterprise (1987): partiu com rampa aberta → 193 mortos."},
    stcw:{fr:"STCW II/1 + Formation passagers (STCW V/2)",en:"STCW II/1 + Passenger ship training (STCW V/2)",es:"STCW II/1 + Formación buques de pasaje (STCW V/2)",pt:"STCW II/1 + Formação navios de passageiros (STCW V/2)"},
    color:C.blue2,
  },
  {
    id:"cruise",
    icon:"🛳️",
    name:{fr:"Paquebot de croisière",en:"Cruise Ship",es:"Buque de Crucero",pt:"Navio de Cruzeiro"},
    svg:<CruiseShipSVG/>,
    specs:{fr:"Passagers : jusqu'à 9 000 personnes\nÉquipage : 2 000–3 000 personnes\nVitesse : 20–22 nœuds\nLongueur : 200–360 m (Wonder of the Seas : 362 m)",en:"Passengers: up to 9,000 people\nCrew: 2,000–3,000 people\nSpeed: 20–22 knots\nLength: 200–360 m (Wonder of the Seas: 362 m)",es:"Pasajeros: hasta 9.000 personas\nTripulación: 2.000–3.000 personas\nVelocidad: 20–22 nudos",pt:"Passageiros: até 9.000 pessoas\nTripulação: 2.000–3.000 pessoas\nVelocidade: 20–22 nós"},
    desc:{fr:"Les paquebots modernes sont de véritables villes flottantes. Standard 3 compartiments SOLAS : doit flotter avec 3 compartiments envahis. Costa Concordia (2012) : échouage récif → 32 morts → erreur de navigation et abandon prématuré.",en:"Modern cruise ships are floating cities. 3-compartment SOLAS standard: must float with 3 flooded. Costa Concordia (2012): reef grounding → 32 deaths → navigation error and premature evacuation.",es:"Los cruceros modernos son ciudades flotantes. SOLAS 3 compartimentos. Costa Concordia (2012): varada en arrecife → 32 muertos.",pt:"Os cruzeiros modernos são cidades flutuantes. SOLAS 3 compartimentos. Costa Concordia (2012): encalhe em recife → 32 mortos."},
    stcw:{fr:"STCW II/1 + Formation avancée passagers (STCW V/2)",en:"STCW II/1 + Advanced passenger ship training (STCW V/2)",es:"STCW II/1 + Formación avanzada pasaje (STCW V/2)",pt:"STCW II/1 + Formação avançada navios passageiros (STCW V/2)"},
    color:C.gold2,
  },
];

// ══════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════
export default function ShipTypesCarousel({ lang="fr" }) {
  const ships = getShips(lang);
  const [current, setCurrent] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const ship = ships[current];

  const prev = () => { setCurrent(c => (c - 1 + ships.length) % ships.length); setShowDetail(false); };
  const next = () => { setCurrent(c => (c + 1) % ships.length); setShowDetail(false); };

  const labels = {
    fr:{prev:"◀",next:"▶",tap:"Appuie pour les détails",specs:"CARACTÉRISTIQUES",desc:"DESCRIPTION",stcw:"CERTIFICATIONS STCW",close:"▲ Masquer"},
    en:{prev:"◀",next:"▶",tap:"Tap for details",specs:"SPECIFICATIONS",desc:"DESCRIPTION",stcw:"STCW CERTIFICATIONS",close:"▲ Hide"},
    es:{prev:"◀",next:"▶",tap:"Toca para ver detalles",specs:"CARACTERÍSTICAS",desc:"DESCRIPCIÓN",stcw:"CERTIFICACIONES STCW",close:"▲ Ocultar"},
    pt:{prev:"◀",next:"▶",tap:"Toque para ver detalhes",specs:"CARACTERÍSTICAS",desc:"DESCRIÇÃO",stcw:"CERTIFICAÇÕES STCW",close:"▲ Ocultar"},
  };
  const L = labels[lang]||labels.fr;

  return (
    <div>
      {/* Navigation dots */}
      <div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:12}}>
        {ships.map((s,i)=>(
          <button key={i} onClick={()=>{setCurrent(i);setShowDetail(false);}} style={{
            width:i===current?28:10, height:10, borderRadius:5,
            background:i===current?ship.color:"rgba(255,255,255,0.15)",
            border:"none", cursor:"pointer",
            transition:"all 0.3s ease",
          }}/>
        ))}
      </div>

      {/* Ship card */}
      <div style={{
        borderRadius:16, overflow:"hidden",
        border:`1.5px solid ${ship.color}55`,
        background:`linear-gradient(135deg,rgba(13,31,60,0.9),rgba(6,14,26,0.95))`,
      }}>
        {/* Header */}
        <div style={{
          padding:"12px 16px",
          background:`linear-gradient(135deg,${ship.color}18,transparent)`,
          borderBottom:`1px solid ${ship.color}33`,
          display:"flex", alignItems:"center", justifyContent:"space-between",
        }}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:24}}>{ship.icon}</span>
            <div>
              <div style={{fontSize:15,fontWeight:700,color:ship.color,fontFamily:"'Cinzel',serif"}}>
                {ship.name[lang]||ship.name.fr}
              </div>
              <div style={{fontSize:9,color:C.muted,marginTop:2}}>
                {current+1} / {ships.length}
              </div>
            </div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={prev} style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,0.08)",border:`1px solid rgba(255,255,255,0.15)`,color:C.white,cursor:"pointer",fontSize:14}}>◀</button>
            <button onClick={next} style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,0.08)",border:`1px solid rgba(255,255,255,0.15)`,color:C.white,cursor:"pointer",fontSize:14}}>▶</button>
          </div>
        </div>

        {/* SVG drawing */}
        <div
          onClick={()=>setShowDetail(v=>!v)}
          style={{cursor:"pointer",padding:"12px 16px",textAlign:"center",position:"relative"}}
        >
          {ship.svg}
          {!showDetail && (
            <div style={{
              position:"absolute", bottom:18, left:"50%",
              transform:"translateX(-50%)",
              padding:"4px 12px", borderRadius:20,
              background:`${ship.color}22`,
              border:`1px solid ${ship.color}44`,
              fontSize:9, color:ship.color, whiteSpace:"nowrap",
            }}>
              👆 {L.tap}
            </div>
          )}
        </div>

        {/* Detail panel */}
        {showDetail && (
          <div style={{
            padding:"0 16px 16px",
            animation:"fadeUp 0.3s ease",
          }}>
            {/* Specs */}
            <div style={{marginBottom:12}}>
              <div style={{
                fontSize:10, color:ship.color, fontWeight:700,
                letterSpacing:2, fontFamily:"'Cinzel',serif",
                marginBottom:6,
              }}>{L.specs}</div>
              <div style={{
                padding:"10px 12px", borderRadius:10,
                background:`${ship.color}0f`,
                border:`1px solid ${ship.color}33`,
                fontSize:11, color:C.white, lineHeight:1.8,
                whiteSpace:"pre-line", fontFamily:"monospace",
              }}>
                {ship.specs[lang]||ship.specs.fr}
              </div>
            </div>

            {/* Description */}
            <div style={{marginBottom:12}}>
              <div style={{
                fontSize:10, color:ship.color, fontWeight:700,
                letterSpacing:2, fontFamily:"'Cinzel',serif",
                marginBottom:6,
              }}>{L.desc}</div>
              <div style={{
                fontSize:12, color:"rgba(240,244,255,0.85)",
                lineHeight:1.75,
              }}>
                {ship.desc[lang]||ship.desc.fr}
              </div>
            </div>

            {/* STCW */}
            <div style={{
              padding:"8px 12px", borderRadius:10,
              background:"rgba(201,146,42,0.08)",
              border:`1px solid ${C.gold}33`,
              display:"flex", alignItems:"center", gap:8,
            }}>
              <span style={{fontSize:16}}>🎓</span>
              <div>
                <div style={{fontSize:9,color:C.gold,fontWeight:700,marginBottom:2}}>{L.stcw}</div>
                <div style={{fontSize:11,color:C.gold2}}>{ship.stcw[lang]||ship.stcw.fr}</div>
              </div>
            </div>

            {/* Close button */}
            <button onClick={()=>setShowDetail(false)} style={{
              width:"100%", padding:"8px 0", marginTop:10,
              borderRadius:10, background:"rgba(255,255,255,0.05)",
              border:`1px solid rgba(255,255,255,0.1)`,
              color:C.muted, cursor:"pointer", fontSize:11,
            }}>
              {L.close}
            </button>
          </div>
        )}
      </div>

      {/* Swipe hint */}
      <div style={{
        display:"flex", justifyContent:"center", gap:16,
        marginTop:10,
      }}>
        <button onClick={prev} style={{
          flex:1, padding:"10px 0", borderRadius:12,
          background:"rgba(255,255,255,0.05)",
          border:`1px solid rgba(255,255,255,0.1)`,
          color:C.muted, cursor:"pointer", fontSize:12,
        }}>◀ {(ships[(current-1+ships.length)%ships.length].icon)}</button>
        <button onClick={next} style={{
          flex:1, padding:"10px 0", borderRadius:12,
          background:"rgba(255,255,255,0.05)",
          border:`1px solid rgba(255,255,255,0.1)`,
          color:C.muted, cursor:"pointer", fontSize:12,
        }}>{(ships[(current+1)%ships.length].icon)} ▶</button>
      </div>

      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}
