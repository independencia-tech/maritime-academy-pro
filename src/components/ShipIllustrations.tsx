// @ts-nocheck
// Ships Library — hero illustrations. Temporary stand-in for real vessel photography
// (licensing not yet sourced). Pure inline SVG, no imported assets. Each illustration is
// static/language-independent (a hull silhouette carries no text to translate) and is meant
// to be dropped into the hero slot of its matching Ships Library card, between the
// "Ships Library" badge and the <h1> title. viewBox is fixed at 0 0 260 120 across the whole
// set so every card's hero renders at the same aspect ratio (~2.17:1).
//
// LOT 1 — Offshore family (ahts, psv, osv, tugboat, surfer). These five share a low-hull /
// clear-deck silhouette in reality, so distinctiveness here comes from deck equipment and
// hull proportions, not from color: AHTS reads by its stepped-down aft deck + winch + stern
// roller + gantry; PSV by its uniform rows of deck cargo; OSV by its crane + rescue boat +
// mixed cargo boxes; Tugboat by its short hull + tall boxy wheelhouse + tire fenders;
// Surfer by its small open hull + multiple outboard engines + bow spray.
import { C } from "./LessonShared";

function ShipBackdrop({ children }) {
  return (
    <svg viewBox="0 0 260 120" style={{ width: "100%", height: "auto", display: "block" }}>
      <rect width="260" height="120" fill="#061828" />
      <rect x="0" y="88" width="260" height="32" fill="rgba(26,111,212,0.25)" />
      <path d="M0,88 Q65,84 130,88 Q195,92 260,88" fill="none" stroke={C.blue2} strokeWidth="1" opacity="0.5" />
      {children}
      <path d="M0,92 Q130,96 260,92" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    </svg>
  );
}

export function AhtsSVG() {
  return (
    <ShipBackdrop>
      {/* Hull - stepped profile: normal forward freeboard, low aft working deck for anchor handling */}
      <path d="M18,88 L25,63 L108,63 L120,76 L228,76 L236,88 Z" fill="#26313f" stroke={C.gold} strokeWidth="1.5" />
      <path d="M18,88 L236,88 L236,84 L18,84 Z" fill="#0d1620" opacity="0.6" />
      {/* Forward accommodation block, 2 decks */}
      <rect x="34" y="34" width="46" height="29" fill="#3a4a5c" stroke={C.gold} strokeWidth="1" />
      <rect x="37" y="38" width="8" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="48" y="38" width="8" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="59" y="38" width="8" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="37" y="48" width="8" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="48" y="48" width="8" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="59" y="48" width="8" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      {/* Bridge top */}
      <rect x="38" y="26" width="38" height="8" fill="#2c3a48" stroke={C.gold} strokeWidth="0.8" />
      {/* Mast + nav light */}
      <line x1="57" y1="10" x2="57" y2="26" stroke={C.muted} strokeWidth="1.5" />
      <circle cx="57" cy="9" r="1.6" fill={C.red} />
      {/* Funnel */}
      <rect x="70" y="18" width="9" height="16" fill="#455a64" rx="1.5" />
      {/* Foredeck bollards */}
      <circle cx="26" cy="63" r="1.6" fill={C.muted} />
      <circle cx="30" cy="63" r="1.6" fill={C.muted} />
      {/* Low aft working deck */}
      <rect x="120" y="76" width="108" height="4" fill="#1b2530" />
      {/* Anchor-handling winch drum (main), safety orange */}
      <circle cx="150" cy="72" r="9" fill="#1b2530" stroke={C.orange} strokeWidth="1.5" />
      <circle cx="150" cy="72" r="4" fill={C.orange} opacity="0.7" />
      {/* Secondary winch */}
      <circle cx="172" cy="73" r="6" fill="#1b2530" stroke={C.orange} strokeWidth="1.2" />
      {/* Stern gantry / A-frame */}
      <line x1="196" y1="76" x2="204" y2="52" stroke="#8fa3b0" strokeWidth="2" />
      <line x1="222" y1="76" x2="214" y2="52" stroke="#8fa3b0" strokeWidth="2" />
      <line x1="204" y1="52" x2="214" y2="52" stroke="#8fa3b0" strokeWidth="2" />
      {/* Stern roller - the AHTS signature feature, sized and contrasted to read clearly */}
      <rect x="214" y="78" width="24" height="9" rx="4.5" fill="#dfe3e6" stroke={C.gold} strokeWidth="1.5" />
      <circle cx="219" cy="82.5" r="1.6" fill="#8fa3b0" />
      <circle cx="233" cy="82.5" r="1.6" fill="#8fa3b0" />
      {/* Deck bollards aft */}
      <circle cx="128" cy="76" r="1.6" fill={C.muted} />
      <circle cx="210" cy="76" r="1.6" fill={C.muted} />
    </ShipBackdrop>
  );
}

export function PsvSVG() {
  return (
    <ShipBackdrop>
      {/* Hull - long, uniform low freeboard from bow to stern: a clear-deck cargo carrier */}
      <path d="M18,88 L25,68 L232,68 L240,88 Z" fill="#2c3e50" stroke={C.gold} strokeWidth="1.5" />
      <path d="M18,88 L240,88 L240,84 L18,84 Z" fill="#0d1620" opacity="0.6" />
      {/* Forward accommodation block, 3 decks */}
      <rect x="34" y="34" width="48" height="34" fill="#38495c" stroke={C.gold} strokeWidth="1" />
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x={38 + i * 13} y={39} width="8" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
          <rect x={38 + i * 13} y={49} width="8" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
          <rect x={38 + i * 13} y={59} width="8" height="6" fill="rgba(77,200,255,0.5)" rx="1" />
        </g>
      ))}
      {/* Bridge top */}
      <rect x="40" y="26" width="36" height="8" fill="#2c3a48" stroke={C.gold} strokeWidth="0.8" />
      {/* Mast + DP antenna dome */}
      <line x1="58" y1="10" x2="58" y2="26" stroke={C.muted} strokeWidth="1.5" />
      <circle cx="58" cy="9" r="3.2" fill="none" stroke={C.teal} strokeWidth="1.2" />
      <circle cx="58" cy="9" r="1" fill={C.teal} />
      {/* Funnel */}
      <rect x="86" y="20" width="9" height="14" fill="#455a64" rx="1.5" />
      {/* Long clear cargo deck: uniform rows of tanks/pipe-spools — the PSV signature */}
      <rect x="96" y="68" width="128" height="3" fill="#1b2530" />
      {[104, 122, 140, 158, 176, 194, 212].map((x, i) => (
        <rect key={i} x={x} y={72} width="12" height="8" rx="2" fill={i % 2 === 0 ? C.teal : "#5a7a8a"} opacity="0.85" stroke={C.gold} strokeWidth="0.5" />
      ))}
      {/* Cargo rail along the deck edge */}
      <line x1="96" y1="68" x2="224" y2="68" stroke={C.muted} strokeWidth="0.8" opacity="0.5" />
      {/* Bollards */}
      <circle cx="26" cy="68" r="1.6" fill={C.muted} />
      <circle cx="224" cy="88" r="1.6" fill={C.muted} />
    </ShipBackdrop>
  );
}

export function OsvSVG() {
  return (
    <ShipBackdrop>
      {/* Hull - general-purpose profile, between AHTS's step-down and PSV's uniform flat deck */}
      <path d="M18,88 L25,66 L226,66 L234,88 Z" fill="#2e3d4d" stroke={C.gold} strokeWidth="1.5" />
      <path d="M18,88 L234,88 L234,84 L18,84 Z" fill="#0d1620" opacity="0.6" />
      {/* Forward accommodation block, 3 decks */}
      <rect x="34" y="32" width="46" height="34" fill="#374a5c" stroke={C.gold} strokeWidth="1" />
      <rect x="38" y="37" width="8" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="49" y="37" width="8" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="60" y="37" width="8" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="38" y="47" width="8" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="49" y="47" width="8" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="60" y="47" width="8" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="38" y="57" width="8" height="6" fill="rgba(77,200,255,0.5)" rx="1" />
      <rect x="49" y="57" width="8" height="6" fill="rgba(77,200,255,0.5)" rx="1" />
      {/* Bridge top */}
      <rect x="40" y="24" width="34" height="8" fill="#2c3a48" stroke={C.gold} strokeWidth="0.8" />
      <line x1="57" y1="8" x2="57" y2="24" stroke={C.muted} strokeWidth="1.5" />
      <circle cx="57" cy="7" r="1.6" fill={C.red} />
      {/* Funnel */}
      <rect x="83" y="18" width="9" height="14" fill="#455a64" rx="1.5" />
      {/* Rescue boat on davit, amidships side — the OSV identifier */}
      <line x1="96" y1="42" x2="112" y2="42" stroke="#8fa3b0" strokeWidth="1.6" />
      <line x1="112" y1="42" x2="112" y2="56" stroke="#8fa3b0" strokeWidth="1.2" />
      <path d="M104,56 Q112,60 120,56 L118,52 L106,52 Z" fill={C.orange} stroke="#8fa3b0" strokeWidth="0.8" />
      {/* Knuckle-boom crane, folded, amidships - thickened and contrasted to read clearly */}
      <rect x="127" y="56" width="12" height="11" rx="1.5" fill="#c7ccd1" stroke={C.gold} strokeWidth="1.2" />
      <line x1="133" y1="56" x2="152" y2="38" stroke="#dfe3e6" strokeWidth="3.2" strokeLinecap="round" />
      <line x1="152" y1="38" x2="167" y2="50" stroke="#dfe3e6" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="152" y1="38" x2="167" y2="50" stroke={C.gold} strokeWidth="0.8" strokeDasharray="1.5,1.5" />
      {/* Aft clear deck with a few mixed cargo boxes — generalist, not uniform like PSV */}
      <rect x="140" y="66" width="80" height="3" fill="#1b2530" />
      <rect x="150" y="70" width="16" height="10" fill="#3498db" opacity="0.85" stroke={C.gold} strokeWidth="0.5" />
      <rect x="172" y="72" width="12" height="8" fill="#e67e22" opacity="0.85" stroke={C.gold} strokeWidth="0.5" />
      <rect x="190" y="70" width="14" height="10" fill="#2ecc71" opacity="0.7" stroke={C.gold} strokeWidth="0.5" />
    </ShipBackdrop>
  );
}

export function TugboatSVG() {
  return (
    <ShipBackdrop>
      {/* Compact hull - short & robust, open water visible fore/aft to read its small size */}
      <path d="M56,88 L64,72 Q70,64 82,64 L182,64 L196,76 L204,88 Z" fill="#1f2d3d" stroke={C.gold} strokeWidth="1.5" />
      <path d="M56,88 L204,88 L204,84 L56,84 Z" fill="#0d1620" opacity="0.6" />
      {/* Tire fenders along the hull side - the Tugboat identifier */}
      {[68, 80, 92, 104].map((x, i) => (
        <circle key={i} cx={x} cy="82" r="4.2" fill="#12181f" stroke="#000" strokeWidth="0.5" opacity="0.85" />
      ))}
      {/* Tall boxy wheelhouse - dominates the profile relative to hull length */}
      <rect x="96" y="24" width="60" height="40" fill="#3a4a5c" stroke={C.gold} strokeWidth="1.2" />
      <rect x="101" y="30" width="10" height="8" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="116" y="30" width="10" height="8" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="131" y="30" width="10" height="8" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="101" y="43" width="10" height="8" fill="rgba(77,200,255,0.5)" rx="1" />
      <rect x="116" y="43" width="10" height="8" fill="rgba(77,200,255,0.5)" rx="1" />
      <rect x="131" y="43" width="10" height="8" fill="rgba(77,200,255,0.5)" rx="1" />
      {/* Wheelhouse roof rail */}
      <rect x="98" y="18" width="56" height="6" fill="#2c3a48" stroke={C.gold} strokeWidth="0.8" />
      {/* Twin funnels close to bridge */}
      <rect x="106" y="8" width="8" height="12" fill="#455a64" rx="1.5" />
      <rect x="138" y="8" width="8" height="12" fill="#455a64" rx="1.5" />
      {/* Mast + nav light */}
      <line x1="126" y1="2" x2="126" y2="18" stroke={C.muted} strokeWidth="1.5" />
      <circle cx="126" cy="1.5" r="1.6" fill={C.red} />
      {/* Low aft working deck with towing hook/winch */}
      <rect x="182" y="76" width="22" height="4" fill="#1b2530" />
      <circle cx="190" cy="76" r="4" fill="#1b2530" stroke={C.orange} strokeWidth="1.2" />
      <path d="M190,80 L190,88" stroke={C.gold} strokeWidth="1.2" strokeDasharray="2,1.5" />
      {/* Forward towing bitt */}
      <circle cx="70" cy="68" r="2.2" fill={C.muted} />
    </ShipBackdrop>
  );
}

export function SurferSVG() {
  return (
    <ShipBackdrop>
      {/* Small planing hull, open deck, flared bow — much smaller than the other offshore vessels */}
      <path d="M72,88 Q76,74 92,68 L176,68 Q186,72 194,88 Z" fill="#26404a" stroke={C.gold} strokeWidth="1.5" />
      <path d="M72,88 L194,88 L194,85 L72,85 Z" fill="#0d1620" opacity="0.6" />
      {/* Flared bow highlight */}
      <path d="M76,80 Q80,72 92,68" fill="none" stroke={C.blue2} strokeWidth="1" opacity="0.6" />
      {/* Open deck bench seats */}
      <rect x="96" y="70" width="30" height="4" fill="#152025" rx="1" />
      <rect x="132" y="70" width="30" height="4" fill="#152025" rx="1" />
      {/* Small center console, not a full superstructure */}
      <rect x="118" y="52" width="24" height="18" fill="#374a5c" stroke={C.gold} strokeWidth="1" />
      <rect x="122" y="56" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="133" y="56" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <line x1="130" y1="42" x2="130" y2="52" stroke={C.muted} strokeWidth="1.2" />
      <circle cx="130" cy="41" r="1.4" fill={C.red} />
      {/* Multiple outboard engines at the transom — the Surfer signature */}
      {[172, 180, 188].map((x, i) => (
        <g key={i}>
          <rect x={x} y="74" width="6" height="16" rx="1.5" fill="#1b2530" stroke={C.orange} strokeWidth="1" />
          <rect x={x - 1} y="72" width="8" height="4" rx="1" fill="#2c3a48" />
        </g>
      ))}
      {/* Bow spray / wake — reinforces the surf-line crossing identity */}
      <path d="M60,84 Q68,76 78,80" fill="none" stroke={C.white} strokeWidth="1.4" opacity="0.55" />
      <path d="M56,90 Q66,82 80,86" fill="none" stroke={C.white} strokeWidth="1" opacity="0.35" />
    </ShipBackdrop>
  );
}

// LOT 2 — Tanker family (oil_tanker, chemical_tanker, lpg_carrier, lng_carrier). All four share
// a family-level cue that also distinguishes them from Lot 1: accommodation and funnel sit AFT
// (accurate to real tanker layout) rather than forward. Within the family: OilTanker reads by its
// flat deck with pipeline manifold + vent risers and nothing bulging above deck (cargo fully
// enclosed below); ChemicalTanker by a denser cluster of many small segregated-parcel domes;
// LpgCarrier by a few large horizontal cylindrical pressure tanks; LngCarrier by large spherical
// Moss-type domes, the most immediately recognizable tanker silhouette.

export function OilTankerSVG() {
  return (
    <ShipBackdrop>
      {/* Hull - long, low, flat deck: cargo is fully enclosed below deck */}
      <path d="M18,88 L25,68 L232,68 L240,88 Z" fill="#1a2530" stroke={C.gold} strokeWidth="1.5" />
      <path d="M18,88 L240,88 L240,84 L18,84 Z" fill="#0d1620" opacity="0.6" />
      {/* Aft accommodation block, 3 decks */}
      <rect x="184" y="32" width="42" height="36" fill="#37485a" stroke={C.gold} strokeWidth="1" />
      <rect x="188" y="37" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="199" y="37" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="210" y="37" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="188" y="47" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="199" y="47" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="210" y="47" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="188" y="57" width="7" height="6" fill="rgba(77,200,255,0.5)" rx="1" />
      <rect x="199" y="57" width="7" height="6" fill="rgba(77,200,255,0.5)" rx="1" />
      {/* Bridge top */}
      <rect x="186" y="24" width="38" height="8" fill="#2c3a48" stroke={C.gold} strokeWidth="0.8" />
      {/* Funnel aft */}
      <rect x="200" y="10" width="10" height="14" fill="#455a64" rx="1.5" />
      <line x1="205" y1="2" x2="205" y2="10" stroke={C.muted} strokeWidth="1.2" />
      <circle cx="205" cy="1.5" r="1.4" fill={C.red} />
      {/* Deck pipeline manifold running forward - the OilTanker identifier */}
      <line x1="30" y1="63.5" x2="178" y2="63.5" stroke="#c7ccd1" strokeWidth="1.6" />
      <line x1="30" y1="66.5" x2="178" y2="66.5" stroke="#c7ccd1" strokeWidth="1.6" />
      <line x1="95" y1="56" x2="95" y2="68" stroke={C.orange} strokeWidth="2.2" />
      <circle cx="95" cy="56" r="2.6" fill={C.orange} stroke={C.gold} strokeWidth="0.8" />
      <line x1="125" y1="56" x2="125" y2="68" stroke={C.orange} strokeWidth="2.2" />
      <circle cx="125" cy="56" r="2.6" fill={C.orange} stroke={C.gold} strokeWidth="0.8" />
      {/* Tank vent risers */}
      {[45, 70, 150, 165].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="68" x2={x} y2="59" stroke="#c7ccd1" strokeWidth="1.8" />
          <ellipse cx={x} cy="58" rx="3.8" ry="2.2" fill="#c7ccd1" stroke={C.gold} strokeWidth="0.6" />
        </g>
      ))}
    </ShipBackdrop>
  );
}

export function ChemicalTankerSVG() {
  return (
    <ShipBackdrop>
      {/* Hull - same aft-accommodation family silhouette as OilTanker */}
      <path d="M18,88 L25,68 L232,68 L240,88 Z" fill="#233246" stroke={C.gold} strokeWidth="1.5" />
      <path d="M18,88 L240,88 L240,84 L18,84 Z" fill="#0d1620" opacity="0.6" />
      {/* Aft accommodation block, 3 decks */}
      <rect x="184" y="32" width="42" height="36" fill="#37485a" stroke={C.gold} strokeWidth="1" />
      <rect x="188" y="37" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="199" y="37" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="210" y="37" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="188" y="47" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="199" y="47" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="210" y="47" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="188" y="57" width="7" height="6" fill="rgba(77,200,255,0.5)" rx="1" />
      <rect x="199" y="57" width="7" height="6" fill="rgba(77,200,255,0.5)" rx="1" />
      {/* Bridge top */}
      <rect x="186" y="24" width="38" height="8" fill="#2c3a48" stroke={C.gold} strokeWidth="0.8" />
      {/* Funnel aft */}
      <rect x="200" y="10" width="10" height="14" fill="#455a64" rx="1.5" />
      <line x1="205" y1="2" x2="205" y2="10" stroke={C.muted} strokeWidth="1.2" />
      <circle cx="205" cy="1.5" r="1.4" fill={C.red} />
      {/* Dense cluster of small segregated-parcel domes - the ChemicalTanker identifier */}
      {[[38, 61], [50, 59], [62, 61], [74, 59], [86, 61], [98, 59], [110, 61], [122, 59], [134, 61], [146, 59], [158, 61], [170, 59]].map(([x, y], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx="4.2" ry="3" fill={i % 3 === 0 ? C.teal : "#8fa3b0"} stroke={C.gold} strokeWidth="0.8" />
          <line x1={x} y1={y - 3} x2={x} y2={y - 6} stroke="#c7ccd1" strokeWidth="1.3" />
        </g>
      ))}
      {/* Valve manifold cross-pieces */}
      <line x1="52" y1="68" x2="52" y2="63" stroke="#c7ccd1" strokeWidth="1.4" />
      <line x1="43" y1="65.5" x2="61" y2="65.5" stroke="#c7ccd1" strokeWidth="1.4" />
      <line x1="142" y1="68" x2="142" y2="63" stroke="#c7ccd1" strokeWidth="1.4" />
      <line x1="133" y1="65.5" x2="151" y2="65.5" stroke="#c7ccd1" strokeWidth="1.4" />
    </ShipBackdrop>
  );
}

export function LpgCarrierSVG() {
  return (
    <ShipBackdrop>
      {/* Hull - same aft-accommodation family silhouette */}
      <path d="M18,88 L25,68 L232,68 L240,88 Z" fill="#26313f" stroke={C.gold} strokeWidth="1.5" />
      <path d="M18,88 L240,88 L240,84 L18,84 Z" fill="#0d1620" opacity="0.6" />
      {/* Aft accommodation block, 3 decks */}
      <rect x="184" y="32" width="42" height="36" fill="#37485a" stroke={C.gold} strokeWidth="1" />
      <rect x="188" y="37" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="199" y="37" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="210" y="37" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="188" y="47" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="199" y="47" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="210" y="47" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="188" y="57" width="7" height="6" fill="rgba(77,200,255,0.5)" rx="1" />
      <rect x="199" y="57" width="7" height="6" fill="rgba(77,200,255,0.5)" rx="1" />
      {/* Bridge top */}
      <rect x="186" y="24" width="38" height="8" fill="#2c3a48" stroke={C.gold} strokeWidth="0.8" />
      {/* Funnel aft */}
      <rect x="200" y="10" width="10" height="14" fill="#455a64" rx="1.5" />
      <line x1="205" y1="2" x2="205" y2="10" stroke={C.muted} strokeWidth="1.2" />
      <circle cx="205" cy="1.5" r="1.4" fill={C.red} />
      {/* Large horizontal cylindrical pressure tanks bulging above deck - the LpgCarrier identifier */}
      {[{ x: 34, w: 40 }, { x: 82, w: 40 }, { x: 130, w: 40 }].map((t, i) => (
        <g key={i}>
          <rect x={t.x} y="48" width={t.w} height="20" rx="10" fill="#c7ccd1" stroke={C.gold} strokeWidth="1.3" />
          <ellipse cx={t.x + t.w / 2} cy="49.5" rx={t.w / 2 - 3} ry="2.2" fill="#e8ecef" opacity="0.6" />
          <line x1={t.x + 5} y1="68" x2={t.x + 5} y2="72" stroke="#5a6b78" strokeWidth="2.2" />
          <line x1={t.x + t.w - 5} y1="68" x2={t.x + t.w - 5} y2="72" stroke="#5a6b78" strokeWidth="2.2" />
        </g>
      ))}
    </ShipBackdrop>
  );
}

export function LngCarrierSVG() {
  return (
    <ShipBackdrop>
      {/* Hull - same aft-accommodation family silhouette */}
      <path d="M18,88 L25,68 L232,68 L240,88 Z" fill="#233246" stroke={C.gold} strokeWidth="1.5" />
      <path d="M18,88 L240,88 L240,84 L18,84 Z" fill="#0d1620" opacity="0.6" />
      {/* Aft accommodation block - deliberately modest relative to the huge tanks, as in reality */}
      <rect x="184" y="34" width="40" height="34" fill="#37485a" stroke={C.gold} strokeWidth="1" />
      <rect x="188" y="39" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="199" y="39" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="210" y="39" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="188" y="49" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="199" y="49" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="210" y="49" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      {/* Bridge top */}
      <rect x="186" y="26" width="36" height="8" fill="#2c3a48" stroke={C.gold} strokeWidth="0.8" />
      {/* Funnel aft */}
      <rect x="199" y="12" width="10" height="14" fill="#455a64" rx="1.5" />
      <line x1="204" y1="4" x2="204" y2="12" stroke={C.muted} strokeWidth="1.2" />
      <circle cx="204" cy="3.5" r="1.4" fill={C.red} />
      {/* Large spherical Moss-type domes - the LngCarrier identifier, the most recognizable of the family */}
      {[45, 80, 115, 150].map((x, i) => (
        <g key={i}>
          <rect x={x - 4} y="66" width="8" height="6" fill="#5a6b78" />
          <circle cx={x} cy="52" r="15" fill="#c7ccd1" stroke={C.gold} strokeWidth="1.4" />
          <ellipse cx={x} cy="52" rx="15" ry="3.6" fill="none" stroke="#8fa3b0" strokeWidth="0.9" opacity="0.7" />
          <line x1={x} y1="37" x2={x} y2="67" stroke="#8fa3b0" strokeWidth="0.7" opacity="0.6" />
        </g>
      ))}
    </ShipBackdrop>
  );
}

// LOT 3 — Construction / special offshore family (dredger, cable_layer, heavy_lift, jackup,
// drillship, fpso, fso). The most visually diverse family: each vessel gets a genuinely custom
// silhouette rather than a shared hull template. Dredger reads by its diagonal suction pipe
// trailing into the water; CableLayer by its large flat cable-storage carousels + bow chute;
// HeavyLift by twin oversized cranes doing a tandem lift; Jackup by its truss legs piercing
// straight through the hull, above and below (the only vessel here that doesn't sit low in the
// water); Drillship by its tall narrow derrick tower + helideck; Fpso by dense industrial topside
// modules + a flare tower; Fso by the deliberate absence of both (storage-only, near-empty deck),
// mirroring the Psv/Osv complexity contrast from Lot 1.

export function DredgerSVG() {
  return (
    <ShipBackdrop>
      {/* Hull - moderate length, low freeboard */}
      <path d="M18,88 L25,68 L200,68 L208,88 Z" fill="#2c3e50" stroke={C.gold} strokeWidth="1.5" />
      <path d="M18,88 L208,88 L208,84 L18,84 Z" fill="#0d1620" opacity="0.6" />
      {/* Forward accommodation, 2 decks */}
      <rect x="34" y="36" width="40" height="32" fill="#37485a" stroke={C.gold} strokeWidth="1" />
      <rect x="38" y="41" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="49" y="41" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="60" y="41" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="38" y="51" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="49" y="51" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="60" y="51" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="36" y="28" width="34" height="8" fill="#2c3a48" stroke={C.gold} strokeWidth="0.8" />
      <rect x="80" y="20" width="9" height="16" fill="#455a64" rx="1.5" />
      <line x1="52" y1="12" x2="52" y2="28" stroke={C.muted} strokeWidth="1.2" />
      <circle cx="52" cy="11" r="1.4" fill={C.red} />
      {/* Hopper deck aft with dredged spoil texture */}
      <rect x="98" y="60" width="88" height="8" fill="#1b2530" stroke="#5D4037" strokeWidth="1" />
      <ellipse cx="120" cy="64" rx="18" ry="3.5" fill="#6b4a2f" opacity="0.85" />
      <ellipse cx="160" cy="64" rx="18" ry="3.5" fill="#7a5638" opacity="0.85" />
      {/* Pipe-handling gantry */}
      <line x1="140" y1="60" x2="140" y2="46" stroke="#8fa3b0" strokeWidth="1.6" />
      <line x1="130" y1="46" x2="150" y2="46" stroke="#8fa3b0" strokeWidth="1.6" />
      {/* Suction pipe/ladder trailing diagonally into the water - the Dredger identifier */}
      <line x1="150" y1="60" x2="205" y2="98" stroke="#c7ccd1" strokeWidth="4" strokeLinecap="round" />
      <line x1="150" y1="60" x2="205" y2="98" stroke={C.orange} strokeWidth="1" strokeDasharray="3,2" />
      <polygon points="200,92 214,96 210,104 198,100" fill="#8fa3b0" stroke={C.gold} strokeWidth="0.8" />
    </ShipBackdrop>
  );
}

export function CableLayerSVG() {
  return (
    <ShipBackdrop>
      {/* Hull */}
      <path d="M18,88 L25,68 L228,68 L236,88 Z" fill="#26313f" stroke={C.gold} strokeWidth="1.5" />
      <path d="M18,88 L236,88 L236,84 L18,84 Z" fill="#0d1620" opacity="0.6" />
      {/* Aft accommodation, 3 decks */}
      <rect x="150" y="32" width="42" height="36" fill="#37485a" stroke={C.gold} strokeWidth="1" />
      <rect x="154" y="37" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="165" y="37" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="176" y="37" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="154" y="47" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="165" y="47" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="176" y="47" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="154" y="57" width="7" height="6" fill="rgba(77,200,255,0.5)" rx="1" />
      <rect x="165" y="57" width="7" height="6" fill="rgba(77,200,255,0.5)" rx="1" />
      <rect x="152" y="24" width="38" height="8" fill="#2c3a48" stroke={C.gold} strokeWidth="0.8" />
      <rect x="200" y="16" width="10" height="16" fill="#455a64" rx="1.5" />
      <line x1="171" y1="8" x2="171" y2="24" stroke={C.muted} strokeWidth="1.2" />
      <circle cx="171" cy="7" r="1.4" fill={C.red} />
      {/* Large cable carousels - the CableLayer identifier */}
      <ellipse cx="65" cy="66" rx="34" ry="9" fill="#37485a" stroke={C.gold} strokeWidth="1.3" />
      <ellipse cx="65" cy="60" rx="30" ry="7" fill="#4a5d70" stroke={C.gold} strokeWidth="1" />
      <ellipse cx="65" cy="60" rx="10" ry="2.4" fill="#1b2530" />
      <ellipse cx="120" cy="66" rx="24" ry="7" fill="#37485a" stroke={C.gold} strokeWidth="1.3" />
      <ellipse cx="120" cy="61" rx="21" ry="5.4" fill="#4a5d70" stroke={C.gold} strokeWidth="1" />
      <ellipse cx="120" cy="61" rx="7" ry="1.8" fill="#1b2530" />
      {/* Bow cable chute feeding into the water */}
      <path d="M26,72 Q17,80 19,91" fill="none" stroke="#c7ccd1" strokeWidth="3" strokeLinecap="round" />
      <circle cx="19" cy="91" r="2.8" fill="none" stroke={C.gold} strokeWidth="1.3" />
    </ShipBackdrop>
  );
}

export function HeavyLiftSVG() {
  return (
    <ShipBackdrop>
      {/* Hull */}
      <path d="M18,88 L25,70 L232,70 L240,88 Z" fill="#2e3d4d" stroke={C.gold} strokeWidth="1.5" />
      <path d="M18,88 L240,88 L240,84 L18,84 Z" fill="#0d1620" opacity="0.6" />
      {/* Compact aft accommodation - small relative to the cranes */}
      <rect x="196" y="40" width="34" height="30" fill="#37485a" stroke={C.gold} strokeWidth="1" />
      <rect x="200" y="45" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="211" y="45" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="200" y="55" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="211" y="55" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <line x1="213" y1="26" x2="213" y2="40" stroke={C.muted} strokeWidth="1.2" />
      <circle cx="213" cy="25" r="1.4" fill={C.red} />
      {/* Lifted cargo module, centered under both cranes */}
      <rect x="106" y="58" width="32" height="12" fill="#5a6b78" stroke={C.gold} strokeWidth="1" />
      {/* Twin heavy-lift cranes converging on the cargo - the HeavyLift identifier */}
      <rect x="44" y="60" width="13" height="10" fill="#3a4a5c" stroke={C.gold} strokeWidth="1" />
      <line x1="50" y1="60" x2="50" y2="16" stroke="#c7ccd1" strokeWidth="3.6" strokeLinecap="round" />
      <line x1="50" y1="16" x2="118" y2="44" stroke="#c7ccd1" strokeWidth="3.2" strokeLinecap="round" />
      <line x1="118" y1="44" x2="118" y2="58" stroke={C.gold} strokeWidth="1" strokeDasharray="2,1.5" />
      <rect x="176" y="60" width="13" height="10" fill="#3a4a5c" stroke={C.gold} strokeWidth="1" />
      <line x1="182" y1="60" x2="182" y2="16" stroke="#c7ccd1" strokeWidth="3.6" strokeLinecap="round" />
      <line x1="182" y1="16" x2="126" y2="44" stroke="#c7ccd1" strokeWidth="3.2" strokeLinecap="round" />
      <line x1="126" y1="44" x2="126" y2="58" stroke={C.gold} strokeWidth="1" strokeDasharray="2,1.5" />
    </ShipBackdrop>
  );
}

export function JackupSVG() {
  return (
    <ShipBackdrop>
      {/* Truss legs - drawn full-height first so the platform below appears to sit clear of the
          water, pierced by legs both above and below - the Jackup identifier, unlike every other
          vessel in this registry which sits low with its hull in the water */}
      {[55, 140, 222].map((x, i) => (
        <g key={i}>
          <line x1={x - 4} y1="14" x2={x - 4} y2="104" stroke="#8fa3b0" strokeWidth="2" />
          <line x1={x + 4} y1="14" x2={x + 4} y2="104" stroke="#8fa3b0" strokeWidth="2" />
          {[24, 44, 64, 84].map((y, j) => (
            <line key={j} x1={x - 4} y1={y} x2={x + 4} y2={y + 14} stroke="#8fa3b0" strokeWidth="1" />
          ))}
        </g>
      ))}
      {/* Elevated platform - solid, hides the mid-section of each leg to read as "pierced through" */}
      <rect x="30" y="54" width="200" height="22" fill="#2e3d4d" stroke={C.gold} strokeWidth="1.5" />
      {/* Small derrick on the platform */}
      <line x1="112" y1="54" x2="120" y2="16" stroke="#c7ccd1" strokeWidth="2" />
      <line x1="128" y1="54" x2="120" y2="16" stroke="#c7ccd1" strokeWidth="2" />
      <rect x="114" y="12" width="12" height="5" fill="#5a6b78" stroke={C.gold} strokeWidth="0.7" />
      {/* Accommodation module on the platform */}
      <rect x="160" y="34" width="34" height="20" fill="#37485a" stroke={C.gold} strokeWidth="1" />
      <rect x="164" y="38" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="175" y="38" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="164" y="46" width="7" height="6" fill="rgba(77,200,255,0.5)" rx="1" />
      <rect x="175" y="46" width="7" height="6" fill="rgba(77,200,255,0.5)" rx="1" />
    </ShipBackdrop>
  );
}

export function DrillshipSVG() {
  return (
    <ShipBackdrop>
      {/* Hull - ship-shaped, unlike the Jackup's elevated platform */}
      <path d="M18,88 L25,68 L232,68 L240,88 Z" fill="#26313f" stroke={C.gold} strokeWidth="1.5" />
      <path d="M18,88 L240,88 L240,84 L18,84 Z" fill="#0d1620" opacity="0.6" />
      {/* Aft accommodation, 3 decks */}
      <rect x="188" y="32" width="42" height="36" fill="#37485a" stroke={C.gold} strokeWidth="1" />
      <rect x="192" y="37" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="203" y="37" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="214" y="37" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="192" y="47" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="203" y="47" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="214" y="47" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="190" y="24" width="38" height="8" fill="#2c3a48" stroke={C.gold} strokeWidth="0.8" />
      {/* Helideck at the bow */}
      <ellipse cx="42" cy="62" rx="16" ry="5.5" fill="#2c3a48" stroke={C.gold} strokeWidth="1.2" />
      <text x="42" y="65.5" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={C.gold}>H</text>
      {/* Tall narrow derrick tower amidships - the Drillship identifier */}
      <line x1="118" y1="68" x2="130" y2="10" stroke="#c7ccd1" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="142" y1="68" x2="130" y2="10" stroke="#c7ccd1" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="122" y1="52" x2="138" y2="52" stroke="#8fa3b0" strokeWidth="1" />
      <line x1="125" y1="36" x2="135" y2="36" stroke="#8fa3b0" strokeWidth="1" />
      <rect x="122" y="6" width="16" height="6" fill="#5a6b78" stroke={C.gold} strokeWidth="0.8" />
    </ShipBackdrop>
  );
}

export function FpsoSVG() {
  return (
    <ShipBackdrop>
      {/* Hull - the largest hull in the registry, converted-tanker proportions */}
      <path d="M14,88 L21,66 L236,66 L244,88 Z" fill="#1a2530" stroke={C.gold} strokeWidth="1.5" />
      <path d="M14,88 L244,88 L244,84 L14,84 Z" fill="#0d1620" opacity="0.6" />
      {/* Aft accommodation */}
      <rect x="196" y="30" width="36" height="36" fill="#37485a" stroke={C.gold} strokeWidth="1" />
      <rect x="200" y="35" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="211" y="35" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="200" y="45" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="211" y="45" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="200" y="55" width="7" height="6" fill="rgba(77,200,255,0.5)" rx="1" />
      {/* Flare tower, angled outward past the stern - the Fpso identifier alongside the modules */}
      <line x1="234" y1="66" x2="250" y2="20" stroke="#8fa3b0" strokeWidth="2.2" />
      <ellipse cx="250" cy="16" rx="4" ry="6" fill={C.orange} opacity="0.85" />
      <ellipse cx="250" cy="12" rx="2.4" ry="3.6" fill={C.gold} opacity="0.9" />
      {/* Dense industrial topside modules covering most of the deck - the other Fpso identifier */}
      <rect x="26" y="58" width="160" height="4" fill="#1b2530" />
      {[[30, 46, 16, 12], [50, 50, 12, 8], [66, 44, 14, 14], [84, 52, 10, 6], [98, 46, 16, 12], [118, 50, 12, 8], [134, 44, 14, 14], [152, 50, 12, 8], [168, 46, 14, 12]].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={i % 2 === 0 ? "#5a6b78" : "#4a5d70"} stroke={C.gold} strokeWidth="0.5" opacity="0.9" />
      ))}
      <line x1="26" y1="60" x2="186" y2="60" stroke="#c7ccd1" strokeWidth="0.8" opacity="0.6" />
    </ShipBackdrop>
  );
}

export function FsoSVG() {
  return (
    <ShipBackdrop>
      {/* Hull - same converted-tanker proportions as Fpso */}
      <path d="M14,88 L21,66 L236,66 L244,88 Z" fill="#1a2530" stroke={C.gold} strokeWidth="1.5" />
      <path d="M14,88 L244,88 L244,84 L14,84 Z" fill="#0d1620" opacity="0.6" />
      {/* Aft accommodation */}
      <rect x="196" y="30" width="36" height="36" fill="#37485a" stroke={C.gold} strokeWidth="1" />
      <rect x="200" y="35" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="211" y="35" width="7" height="6" fill="rgba(77,200,255,0.6)" rx="1" />
      <rect x="200" y="45" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="211" y="45" width="7" height="6" fill="rgba(77,200,255,0.55)" rx="1" />
      <rect x="200" y="55" width="7" height="6" fill="rgba(77,200,255,0.5)" rx="1" />
      {/* Near-empty deck: no modules, no flare - storage only. The Fso identifier is this absence,
          set against the same hull Fpso uses - just a pipeline and a couple of vents, like a tanker */}
      <line x1="30" y1="61.5" x2="186" y2="61.5" stroke="#c7ccd1" strokeWidth="1.6" />
      <line x1="30" y1="64" x2="186" y2="64" stroke="#c7ccd1" strokeWidth="1.6" />
      {[55, 90, 130, 160].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="66" x2={x} y2="57" stroke="#c7ccd1" strokeWidth="1.8" />
          <ellipse cx={x} cy="56" rx="3.8" ry="2.2" fill="#c7ccd1" stroke={C.gold} strokeWidth="0.6" />
        </g>
      ))}
    </ShipBackdrop>
  );
}
