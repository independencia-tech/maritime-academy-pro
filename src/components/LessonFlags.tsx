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
  fr:{ back:"◀ Retour", module:"Signalisation & Balisage", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Signaling & Buoyage", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Señalización y Balizamiento", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Sinalização e Balizagem", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// FLAG SVG RENDERER
// ══════════════════════════════════════
function FlagSVG({ letter, size=48 }) {
  const w = size, h = size * 0.7;
  const flags = {
    A: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={30} height={42} fill="white"/><rect x={30} width={30} height={42} fill="#003087"/><polygon points="30,21 60,0 60,42" fill="#003087"/><polygon points="30,21 60,0 60,42" fill="white" opacity="0"/></svg>,
    B: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={60} height={42} fill="#c0392b"/></svg>,
    C: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={60} height={42} fill="#003087"/><rect y={8} width={60} height={8} fill="white"/><rect y={25} width={60} height={8} fill="white"/></svg>,
    D: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={20} height={42} fill="#f1c40f"/><rect x={20} width={20} height={42} fill="#003087"/><rect x={40} width={20} height={42} fill="#f1c40f"/></svg>,
    E: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={60} height={21} fill="#003087"/><rect y={21} width={60} height={21} fill="#f1c40f"/></svg>,
    F: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={60} height={42} fill="white"/><rect x={20} y={10} width={20} height={22} fill="#c0392b"/></svg>,
    G: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={10} height={42} fill="#f1c40f"/><rect x={10} width={10} height={42} fill="#003087"/><rect x={20} width={10} height={42} fill="#f1c40f"/><rect x={30} width={10} height={42} fill="#003087"/><rect x={40} width={10} height={42} fill="#f1c40f"/><rect x={50} width={10} height={42} fill="#003087"/></svg>,
    H: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={30} height={42} fill="white"/><rect x={30} width={30} height={42} fill="#c0392b"/></svg>,
    I: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={60} height={42} fill="#f1c40f"/><circle cx={30} cy={21} r={10} fill="#1a1a2e"/></svg>,
    J: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={60} height={14} fill="#003087"/><rect y={14} width={60} height={14} fill="white"/><rect y={28} width={60} height={14} fill="#003087"/></svg>,
    K: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={30} height={42} fill="#f1c40f"/><rect x={30} width={30} height={42} fill="#003087"/></svg>,
    L: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={60} height={42} fill="#f1c40f"/><rect x={15} y={10} width={30} height={22} fill="#1a1a2e"/></svg>,
    M: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={60} height={42} fill="white"/><polygon points="0,0 60,0 30,21" fill="#003087"/><polygon points="0,42 60,42 30,21" fill="#003087"/></svg>,
    N: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={60} height={42} fill="#003087"/><line x1={0} y1={0} x2={60} y2={42} stroke="white" strokeWidth={8}/><line x1={60} y1={0} x2={0} y2={42} stroke="white" strokeWidth={8}/></svg>,
    O: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={60} height={42} fill="#f1c40f"/><circle cx={30} cy={21} r={14} fill="#c0392b"/></svg>,
    P: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={60} height={42} fill="#003087"/><rect x={12} y={8} width={36} height={26} fill="white"/></svg>,
    Q: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={60} height={42} fill="#f1c40f"/></svg>,
    R: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={60} height={42} fill="#c0392b"/><polygon points="20,0 40,0 30,42 10,42" fill="white"/></svg>,
    S: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={60} height={42} fill="white"/><rect x={15} y={10} width={30} height={22} fill="#003087"/></svg>,
    T: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={20} height={42} fill="#c0392b"/><rect x={20} width={20} height={42} fill="white"/><rect x={40} width={20} height={42} fill="#003087"/></svg>,
    U: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={60} height={42} fill="white"/><rect width={30} height={21} fill="#c0392b"/><rect x={30} y={21} width={30} height={21} fill="#c0392b"/></svg>,
    V: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={60} height={42} fill="white"/><line x1={0} y1={42} x2={60} y2={0} stroke="#c0392b" strokeWidth={8}/><line x1={0} y1={0} x2={60} y2={42} stroke="#c0392b" strokeWidth={4}/></svg>,
    W: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={60} height={42} fill="white"/><circle cx={30} cy={21} r={14} fill="#c0392b"/><circle cx={30} cy={21} r={8} fill="white"/><circle cx={30} cy={21} r={4} fill="#c0392b"/></svg>,
    X: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={60} height={42} fill="#003087"/><line x1={0} y1={0} x2={60} y2={42} stroke="white" strokeWidth={8}/><line x1={60} y1={0} x2={0} y2={42} stroke="white" strokeWidth={8}/></svg>,
    Y: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={60} height={42} fill="#c0392b"/><rect x={0} y={0} width={60} height={42} fill="none"/>{[0,1,2,3,4].map(i=><rect key={i} x={i*12} width={6} height={42} fill="#f1c40f"/>)}</svg>,
    Z: <svg width={w} height={h} viewBox="0 0 60 42"><rect width={30} height={21} fill="#c0392b"/><rect x={30} width={30} height={21} fill="#f1c40f"/><rect y={21} width={30} height={21} fill="#f1c40f"/><rect x={30} y={21} width={30} height={21} fill="#003087"/></svg>,
  };
  return flags[letter] || <svg width={w} height={h} viewBox="0 0 60 42"><rect width={60} height={42} fill="#333"/><text x={30} y={26} textAnchor="middle" fill="white" fontSize={18} fontWeight="bold">{letter}</text></svg>;
}

// ══════════════════════════════════════
// SVG 1 — ALPHABET FLAGS INTERACTIVE
// ══════════════════════════════════════
function AlphabetFlagsSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const flagData = {
    A:{ morse:"·—", phonetic:"Alpha", meaning:{fr:"Plongeur en immersion — restez à distance et à faible vitesse",en:"Diver down — keep clear and slow speed",es:"Buceador sumergido — mantenerse alejado y a baja velocidad",pt:"Mergulhador submerso — manter distância e baixa velocidade"} },
    B:{ morse:"—···", phonetic:"Bravo", meaning:{fr:"Chargement/déchargement/transport de matières dangereuses",en:"Carrying dangerous goods",es:"Transportando materias peligrosas",pt:"Transportando materiais perigosos"} },
    C:{ morse:"—·—·", phonetic:"Charlie", meaning:{fr:"OUI (réponse affirmative)",en:"YES (affirmative)",es:"SÍ (afirmativo)",pt:"SIM (afirmativo)"} },
    D:{ morse:"—··", phonetic:"Delta", meaning:{fr:"Restez à l'écart — je manœuvre avec difficulté",en:"Keep clear — maneuvering with difficulty",es:"Manténgase alejado — maniobro con dificultad",pt:"Mantenha-se afastado — manobro com dificuldade"} },
    E:{ morse:"·", phonetic:"Echo", meaning:{fr:"Je vire à TRIBORD",en:"Altering course to STARBOARD",es:"Viro a ESTRIBOR",pt:"Viro para ESTIBORDO"} },
    F:{ morse:"··—·", phonetic:"Foxtrot", meaning:{fr:"Je suis en avarie — communiquez avec moi",en:"I am disabled — communicate with me",es:"Estoy averiado — comuníquese conmigo",pt:"Estou avariado — comunique comigo"} },
    G:{ morse:"——·", phonetic:"Golf", meaning:{fr:"Je désire un pilote",en:"I require a pilot",es:"Necesito un práctico",pt:"Preciso de um prático"} },
    H:{ morse:"····", phonetic:"Hotel", meaning:{fr:"Pilote à bord",en:"Pilot on board",es:"Práctico a bordo",pt:"Prático a bordo"} },
    I:{ morse:"··", phonetic:"India", meaning:{fr:"Je vire à BÂBORD",en:"Altering course to PORT",es:"Viro a BABOR",pt:"Viro para BOMBORDO"} },
    J:{ morse:"·———", phonetic:"Juliet", meaning:{fr:"Je suis en feu et transporte des marchandises dangereuses — restez à distance",en:"On fire with dangerous cargo — keep clear",es:"Incendio con cargamento peligroso — manténgase alejado",pt:"Em fogo com carga perigosa — mantenha distância"} },
    K:{ morse:"—·—", phonetic:"Kilo", meaning:{fr:"Je désire communiquer avec vous",en:"I wish to communicate with you",es:"Deseo comunicar con usted",pt:"Desejo comunicar consigo"} },
    L:{ morse:"·—··", phonetic:"Lima", meaning:{fr:"Stoppez votre navire immédiatement",en:"Stop your vessel immediately",es:"Detenga su buque inmediatamente",pt:"Pare o seu navio imediatamente"} },
    M:{ morse:"——", phonetic:"Mike", meaning:{fr:"Mon navire est stoppé et ne fait pas d'erre",en:"My vessel is stopped and making no way",es:"Mi buque está parado y sin arrancada",pt:"O meu navio está parado e sem arrancada"} },
    N:{ morse:"—·", phonetic:"November", meaning:{fr:"NON (réponse négative)",en:"NO (negative)",es:"NO (negativo)",pt:"NÃO (negativo)"} },
    O:{ morse:"———", phonetic:"Oscar", meaning:{fr:"Homme à la mer !",en:"Man overboard!",es:"¡Hombre al agua!",pt:"Homem ao mar!"} },
    P:{ morse:"·——·", phonetic:"Papa", meaning:{fr:"En port : partance — toutes personnes à bord. En mer : mes filets sont pris dans un obstacle",en:"In harbor: all aboard, departing. At sea: nets caught on obstruction",es:"En puerto: zarpa pronto. En el mar: redes enganchadas",pt:"No porto: todos a bordo, a partir. No mar: redes presas num obstáculo"} },
    Q:{ morse:"——·—", phonetic:"Quebec", meaning:{fr:"Mon navire est sain — demande libre pratique (quarantaine)",en:"My vessel is healthy — requesting free pratique",es:"Mi buque está sano — solicito libre plática",pt:"O meu navio está são — solicito livre prática"} },
    R:{ morse:"·—·", phonetic:"Romeo", meaning:{fr:"(Pavillon utilisé avec d'autres)",en:"(Used in combination)",es:"(Usado en combinación)",pt:"(Usado em combinação)"} },
    S:{ morse:"···", phonetic:"Sierra", meaning:{fr:"Je bats en arrière",en:"My engines are going astern",es:"Mis máquinas van atrás",pt:"Os meus motores trabalham à ré"} },
    T:{ morse:"—", phonetic:"Tango", meaning:{fr:"Restez à l'écart — je suis engagé dans le chalutage en paire",en:"Keep clear — engaged in pair trawling",es:"Manténgase alejado — arrastre en pareja",pt:"Mantenha-se afastado — pesca de arrasto em parelha"} },
    U:{ morse:"··—", phonetic:"Uniform", meaning:{fr:"Vous courez vers le danger",en:"You are standing into danger",es:"Está yendo hacia el peligro",pt:"Está a dirigir-se para o perigo"} },
    V:{ morse:"···—", phonetic:"Victor", meaning:{fr:"J'ai besoin d'assistance",en:"I require assistance",es:"Necesito asistencia",pt:"Preciso de assistência"} },
    W:{ morse:"·——", phonetic:"Whiskey", meaning:{fr:"J'ai besoin d'assistance médicale",en:"I require medical assistance",es:"Necesito asistencia médica",pt:"Preciso de assistência médica"} },
    X:{ morse:"—··—", phonetic:"X-ray", meaning:{fr:"Stoppez votre manœuvre et regardez mes signaux",en:"Stop your maneuver and watch for my signals",es:"Detenga su maniobra y observe mis señales",pt:"Pare a sua manobra e observe os meus sinais"} },
    Y:{ morse:"—·——", phonetic:"Yankee", meaning:{fr:"Je suis en traîne de mon ancre",en:"I am dragging my anchor",es:"Estoy garrando",pt:"Estou a garrear"} },
    Z:{ morse:"——··", phonetic:"Zulu", meaning:{fr:"J'ai besoin d'un remorqueur. En pêche : je déploie mes engins",en:"I require a tug. Fishing: shooting nets",es:"Necesito un remolcador. Pesca: largando redes",pt:"Preciso de um rebocador. Pesca: a largar redes"} },
  };

  const letters = Object.keys(flagData);
  const sel_ = sel ? flagData[sel] : null;

  return (
    <div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10,justifyContent:"center"}}>
        {letters.map(l=>(
          <div key={l} onClick={()=>setSel(sel===l?null:l)} style={{
            cursor:"pointer",textAlign:"center",padding:"4px",borderRadius:8,
            background:sel===l?"rgba(201,146,42,0.2)":"rgba(255,255,255,0.04)",
            border:`1.5px solid ${sel===l?C.gold2:"rgba(255,255,255,0.08)"}`,
            minWidth:44}}>
            <FlagSVG letter={l} size={36}/>
            <div style={{fontSize:9,color:sel===l?C.gold2:C.muted,fontWeight:700,marginTop:2}}>{l}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:"rgba(201,146,42,0.1)",border:`1.5px solid ${C.gold}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
          <FlagSVG letter={sel} size={52}/>
          <div>
            <div style={{fontSize:16,fontWeight:700,color:C.gold2}}>{sel} — {sel_.phonetic}</div>
            <div style={{fontSize:11,color:C.muted,fontFamily:"monospace"}}>{sel_.morse}</div>
          </div>
        </div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.6,fontWeight:600}}>{sel_.meaning[lang]||sel_.meaning.fr}</div>
      </div>}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:C.muted,padding:"8px"}}>
        {lang==="fr"?"Touche une lettre pour voir son pavillon et sa signification":lang==="en"?"Tap a letter to see its flag and meaning":lang==="es"?"Toca una letra para ver su bandera y significado":"Toque numa letra para ver a sua bandeira e significado"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — SINGLE FLAG URGENCY SIGNALS
// ══════════════════════════════════════
function UrgencyFlagsSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const urgency = [
    { letter:"A", color:C.blue2,
      label:{fr:"Plongeur en immersion",en:"Diver down",es:"Buceador sumergido",pt:"Mergulhador submerso"},
      desc:{fr:"🤿 PLONGEUR EN IMMERSION\n\nSignification : Un plongeur est à l'eau sous le navire\nPavillon blanc et bleu (queue d'aronde)\n\nOBLIGATION :\n→ Passer à faible vitesse\n→ Rester à grande distance\n→ Ne pas créer de remous\n\nDURÉE : arboré tant que le plongeur est à l'eau\n\nSIGNAL NUIT : feu all-around blanc\n\nLOI : en France, obligation d'arborer\nle pavillon A dès qu'un plongeur est à l'eau",en:"🤿 DIVER DOWN\n\nMeaning: A diver is underwater below the vessel\nWhite and blue flag (swallowtail)\n\nOBLIGATION:\n→ Pass at slow speed\n→ Keep great distance\n→ Do not create wash\n\nDURATION: hoisted while diver is in water\n\nNIGHT SIGNAL: all-round white light",es:"🤿 BUCEADOR SUMERGIDO\n\nSignificado: Un buceador está en el agua bajo el buque\nBandera blanca y azul (cola de golondrina)\n\nOBLIGACIÓN:\n→ Pasar a baja velocidad\n→ Mantener gran distancia\n→ No crear estela",pt:"🤿 MERGULHADOR SUBMERSO\n\nSignificado: Um mergulhador está na água sob o navio\nBandeira branca e azul (cauda de andorinha)\n\nOBRIGAÇÃO:\n→ Passar a baixa velocidade\n→ Manter grande distância\n→ Não criar agitação"} },
    { letter:"B", color:C.red,
      label:{fr:"Matières dangereuses",en:"Dangerous goods",es:"Materias peligrosas",pt:"Materiais perigosos"},
      desc:{fr:"⚠️ CHARGEMENT / TRANSPORT DE MATIÈRES DANGEREUSES\n\nPavillon rouge uni\n\nUTILISATION :\n→ Navire chargeant des explosifs\n→ Navire transportant des hydrocarbures en vrac\n→ Navire avec cargaison dangereuse (classes IMO)\n\nOBLIGATION DES AUTRES NAVIRES :\n→ Maintenir une distance de sécurité\n→ Pas de feu nu / cigarettes à proximité\n→ Coordonner via VHF avant approche\n\nCOMBINAISE FRÉQUENTE : B + Q (cargo chargement + quarantaine)",en:"⚠️ LOADING/TRANSPORTING DANGEROUS GOODS\n\nSolid red flag\n\nUSE:\n→ Vessel loading explosives\n→ Vessel carrying bulk hydrocarbons\n→ Vessel with dangerous cargo (IMO classes)\n\nOTHER VESSELS OBLIGATION:\n→ Maintain safe distance\n→ No naked flames / cigarettes nearby\n→ Coordinate via VHF before approach",es:"⚠️ CARGA/TRANSPORTE DE MATERIAS PELIGROSAS\n\nBandera roja sólida\n\nUSO:\n→ Buque cargando explosivos\n→ Buque transportando hidrocarburos a granel\n→ Buque con cargamento peligroso\n\nOBLIGACIÓN DE OTROS BUQUES:\n→ Mantener distancia de seguridad\n→ Sin llamas/cigarrillos cerca",pt:"⚠️ CARREGAMENTO/TRANSPORTE DE MATERIAIS PERIGOSOS\n\nBandeira vermelha sólida\n\nUSO:\n→ Navio a carregar explosivos\n→ Navio a transportar hidrocarbonetos a granel\n→ Navio com carga perigosa\n\nOBRIGAÇÃO DOS OUTROS NAVIOS:\n→ Manter distância de segurança\n→ Sem chamas/cigarros nas proximidades"} },
    { letter:"G", color:C.yellow,
      label:{fr:"Je désire un pilote",en:"I require a pilot",es:"Necesito un práctico",pt:"Preciso de um prático"},
      desc:{fr:"🧭 JE DÉSIRE UN PILOTE\n\nPavillon à bandes verticales jaune et bleue\n\nUTILISATION :\n→ Navire demandant un pilote côtier\n→ Arboré à l'approche d'un port avec pilotage obligatoire\n→ Accompagné du signal VHF canal 16\n\nCOMBINAISE :\nH = pilote à bord (après embarquement du pilote)\nG = pilote requis (avant embarquement)\n\nSIGNAL SONORE ASSOCIÉ :\nEn brouillard : signal 'G' en morse",en:"🧭 I REQUIRE A PILOT\n\nYellow and blue vertical striped flag\n\nUSE:\n→ Vessel requesting coastal pilot\n→ Hoisted approaching port with compulsory pilotage\n→ Accompanied by VHF channel 16 signal",es:"🧭 NECESITO UN PRÁCTICO\n\nBandera de franjas verticales amarillas y azules\n\nUSO:\n→ Buque solicitando un práctico costero\n→ Ondeada al aproximarse a un puerto con practicaje obligatorio\n→ Acompañada de señal VHF canal 16",pt:"🧭 PRECISO DE UM PRÁTICO\n\nBandeira com franjas verticais amarelas e azuis\n\nUSO:\n→ Navio a solicitar um prático costeiro\n→ Içada ao aproximar-se de um porto com praticagem obrigatória\n→ Acompanhada de sinal VHF canal 16"} },
    { letter:"H", color:C.red,
      label:{fr:"Pilote à bord",en:"Pilot on board",es:"Práctico a bordo",pt:"Prático a bordo"},
      desc:{fr:"🧭 PILOTE À BORD\n\nPavillon rouge et blanc (moitié/moitié vertical)\n\nSignifie : un pilote professionnel est à bord\n\nIMPORTANCE POUR LES AUTRES NAVIRES :\n→ Le navire est en manœuvre d'approche/port\n→ Peut avoir une vitesse réduite\n→ Peut effectuer des manœuvres inhabituelles\n→ Priorité dans certains chenaux\n\nDURÉE : arboré pendant toute la durée du pilotage\n\nRETIRÉ : dès que le pilote quitte le navire",en:"🧭 PILOT ON BOARD\n\nRed and white flag (vertical halves)\n\nMeans: a professional pilot is on board\n\nIMPORTANCE FOR OTHER VESSELS:\n→ Vessel making approach/port maneuver\n→ May have reduced speed\n→ May make unusual maneuvers\n→ Priority in some channels\n\nDURATION: hoisted during entire pilotage",es:"🧭 PRÁCTICO A BORDO\n\nBandera roja y blanca (mitades verticales)\n\nSignifica: un práctico profesional está a bordo\n\nIMPORTANCIA PARA OTROS BUQUES:\n→ El buque está maniobrado de aproximación/puerto\n→ Puede tener velocidad reducida\n→ Prioridad en ciertos canales",pt:"🧭 PRÁTICO A BORDO\n\nBandeira vermelha e branca (metades verticais)\n\nSignifica: um prático profissional está a bordo\n\nIMPORTÂNCIA PARA OUTROS NAVIOS:\n→ O navio está em manobra de aproximação/porto\n→ Pode ter velocidade reduzida\n→ Prioridade em certos canais"} },
    { letter:"O", color:C.red,
      label:{fr:"Homme à la mer !",en:"Man overboard!",es:"¡Hombre al agua!",pt:"Homem ao mar!"},
      desc:{fr:"🆘 HOMME À LA MER (MOB)\n\nPavillon rouge avec cercle jaune\n\nSIGNAL D'URGENCE CRITIQUE\n\nACTIONS IMMÉDIATES :\n→ Lancer la bouée MOB\n→ Émettre MAYDAY ou PAN-PAN sur VHF 16\n→ Marquer la position GPS\n→ Manœuvre MOB immédiate\n→ Arborner pavillon O\n\nMANŒUVRE MOB :\nVirage Williamson ou cercle rescapé\nVitesse réduite à l'approche de la victime\n\nSIGNAL NUIT : feux stroboscopiques",en:"🆘 MAN OVERBOARD (MOB)\n\nRed flag with yellow circle\n\nCRITICAL URGENCY SIGNAL\n\nIMMEDIATE ACTIONS:\n→ Throw MOB buoy\n→ Send MAYDAY or PAN-PAN on VHF 16\n→ Mark GPS position\n→ Immediate MOB maneuver\n→ Hoist flag O\n\nMOB MANEUVER:\nWilliamson turn or rescue circle",es:"🆘 HOMBRE AL AGUA (MOB)\n\nBandera roja con círculo amarillo\n\nSEÑAL DE URGENCIA CRÍTICA\n\nACCIONES INMEDIATAS:\n→ Lanzar la boya MOB\n→ Emitir MAYDAY o PAN-PAN en VHF 16\n→ Marcar la posición GPS\n→ Maniobra MOB inmediata\n→ Izar bandera O",pt:"🆘 HOMEM AO MAR (MOB)\n\nBandeira vermelha com círculo amarelo\n\nSINAL DE URGÊNCIA CRÍTICO\n\nACÇÕES IMEDIATAS:\n→ Lançar a boia MOB\n→ Enviar MAYDAY ou PAN-PAN no VHF 16\n→ Marcar posição GPS\n→ Manobra MOB imediata\n→ Içar bandeira O"} },
    { letter:"Q", color:C.yellow,
      label:{fr:"Quarantaine / Libre pratique",en:"Quarantine / Free pratique",es:"Cuarentena / Libre plática",pt:"Quarentena / Livre prática"},
      desc:{fr:"🟡 PAVILLON Q — QUARANTAINE\n\nPavillon jaune uni (le plus simple !)\n\nDEUX SIGNIFICATIONS :\n1. Seul : 'Mon navire est sain — je demande libre pratique'\n   → Arboré à l'arrivée dans un port étranger\n   → Retiré quand les douanes accordent l'autorisation\n\n2. Q+L combinés : quarantaine stricte\n\nLIBRE PRATIQUE = autorisation officielle\nde communiquer avec le port, de débarquer\n\nOBLIGATION LÉGALE :\nArborer Q avant d'entrer dans un port étranger\nNe pas débarquer avant autorisation des autorités",en:"🟡 FLAG Q — QUARANTINE\n\nSolid yellow flag (simplest!)\n\nTWO MEANINGS:\n1. Alone: 'My vessel is healthy — requesting free pratique'\n   → Hoisted on arrival in a foreign port\n   → Lowered when customs grant authorization\n\n2. Q+L combined: strict quarantine\n\nFREE PRATIQUE = official authorization\nto communicate with port, to disembark\n\nLEGAL OBLIGATION:\nHoist Q before entering a foreign port",es:"🟡 BANDERA Q — CUARENTENA\n\nBandera amarilla sólida (¡la más sencilla!)\n\nDOS SIGNIFICADOS:\n1. Sola: 'Mi buque está sano — solicito libre plática'\n   → Ondeada al llegar a un puerto extranjero\n   → Retirada cuando las autoridades lo autoricen\n\n2. Q+L combinadas: cuarentena estricta\n\nOBLIGACIÓN LEGAL:\nIzar Q antes de entrar en un puerto extranjero",pt:"🟡 BANDEIRA Q — QUARENTENA\n\nBandeira amarela sólida (a mais simples!)\n\nDOIS SIGNIFICADOS:\n1. Sozinha: 'O meu navio está são — solicito livre prática'\n   → Içada à chegada a um porto estrangeiro\n   → Arriada quando as autoridades concedem autorização\n\n2. Q+L combinadas: quarentena estrita\n\nOBRIGAÇÃO LEGAL:\nIçar Q antes de entrar em porto estrangeiro"} },
    { letter:"V", color:C.blue2,
      label:{fr:"J'ai besoin d'assistance",en:"I require assistance",es:"Necesito asistencia",pt:"Preciso de assistência"},
      desc:{fr:"🆘 J'AI BESOIN D'ASSISTANCE\n\nPavillon blanc avec croix rouge diagonale\n\nSignal de demande de secours\n(moins urgent que MAYDAY)\n\nUTILISATION :\n→ Panne de moteur\n→ Problème de gouvernail\n→ Besoin d'aide non urgente\n\nACCOMPAGNÉ DE :\n→ VHF PAN-PAN si semi-urgent\n→ VHF MAYDAY si danger de vie\n\nDIFFÉRENCE V vs W :\nV = assistance générale\nW = assistance médicale spécifique",en:"🆘 I REQUIRE ASSISTANCE\n\nWhite flag with red diagonal cross\n\nRequest for rescue signal\n(less urgent than MAYDAY)\n\nUSE:\n→ Engine failure\n→ Rudder problem\n→ Non-urgent help needed\n\nACCOMPANIED BY:\n→ VHF PAN-PAN if semi-urgent\n→ VHF MAYDAY if life danger",es:"🆘 NECESITO ASISTENCIA\n\nBandera blanca con cruz roja diagonal\n\nSeñal de solicitud de socorro\n(menos urgente que MAYDAY)\n\nUSO:\n→ Avería de motor\n→ Problema de timón\n→ Ayuda no urgente necesaria",pt:"🆘 PRECISO DE ASSISTÊNCIA\n\nBandeira branca com cruz vermelha diagonal\n\nSinal de pedido de socorro\n(menos urgente que MAYDAY)\n\nUSO:\n→ Avaria de motor\n→ Problema de leme\n→ Ajuda não urgente necessária"} },
    { letter:"W", color:C.red,
      label:{fr:"Besoin d'assistance médicale",en:"Medical assistance needed",es:"Asistencia médica necesaria",pt:"Assistência médica necessária"},
      desc:{fr:"🏥 J'AI BESOIN D'ASSISTANCE MÉDICALE\n\nPavillon blanc avec cercle rouge\n\nSignal d'urgence médicale à bord\n\nACTIONS :\n→ Émettre PAN-PAN MEDICO sur VHF 16\n→ Contacter le CROSS (France)\n→ Contacter l'hôpital maritime\n→ Arborner W + contacter les secours\n\nTÉLÉCONSEIL MÉDICAL :\nFrance : SAMU Maritime 15\nInternational : Radio Médical à bord\n\nEN HAUTE MER :\nDéroutement vers le port le plus proche\nou hélitreuillage si urgence vitale",en:"🏥 I REQUIRE MEDICAL ASSISTANCE\n\nWhite flag with red circle\n\nMedical emergency aboard signal\n\nACTIONS:\n→ Send PAN-PAN MEDICO on VHF 16\n→ Contact MRCC\n→ Contact maritime hospital\n→ Hoist W + contact rescue services\n\nMEDICAL ADVICE:\nFrance: SAMU Maritime 15\nInternational: Radio Medical on board",es:"🏥 NECESITO ASISTENCIA MÉDICA\n\nBandera blanca con círculo rojo\n\nSeñal de emergencia médica a bordo\n\nACCIONES:\n→ Emitir PAN-PAN MEDICO en VHF 16\n→ Contactar MRCC\n→ Contactar hospital marítimo",pt:"🏥 PRECISO DE ASSISTÊNCIA MÉDICA\n\nBandeira branca com círculo vermelho\n\nSinal de emergência médica a bordo\n\nACÇÕES:\n→ Emitir PAN-PAN MEDICO no VHF 16\n→ Contactar MRCC\n→ Contactar hospital marítimo"} },
  ];

  const sel_ = sel!==null ? urgency[sel] : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:10}}>
        {urgency.map((u,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            padding:"8px 4px",borderRadius:12,cursor:"pointer",textAlign:"center",
            background:sel===i?`${u.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${sel===i?u.color:"rgba(255,255,255,0.08)"}`}}>
            <FlagSVG letter={u.letter} size={40}/>
            <div style={{fontSize:8,color:sel===i?u.color:C.muted,fontWeight:700,marginTop:3,lineHeight:1.2}}>{u.letter}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
          <FlagSVG letter={sel_.letter} size={44}/>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:sel_.color}}>{sel_.letter} — {sel_.label[lang]||sel_.label.fr}</div>
          </div>
        </div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — TWO FLAG COMBINATIONS
// ══════════════════════════════════════
function TwoFlagCombinationsSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const combos = [
    { flags:["N","C"], color:C.red,
      label:{fr:"NC — DÉTRESSE",en:"NC — DISTRESS",es:"NC — SOCORRO",pt:"NC — PERIGO"},
      desc:{fr:"NC = SIGNAL DE DÉTRESSE INTERNATIONAL\n\nSignification : 'Je suis en détresse et j'ai besoin d'assistance immédiate'\n\nÉQUIVALENT DE MAYDAY par pavillons\nValeur légale internationale identique au MAYDAY radio\n\nUTILISATION :\n→ Panne totale électrique (impossible d'émettre radio)\n→ Visible de jour à grande distance\n→ Complément aux autres signaux de détresse\n\nPAVILLON N = NON (bleu sur blanc, X croisés)\nPAVILLON C = OUI (bleu blanc rouge)\nEnsemble = Signal de détresse universel",en:"NC = INTERNATIONAL DISTRESS SIGNAL\n\nMeaning: 'I am in distress and require immediate assistance'\n\nFLAG EQUIVALENT OF MAYDAY\nSame international legal value as radio MAYDAY\n\nUSE:\n→ Total electrical failure (radio impossible)\n→ Visible by day at great distance\n→ Complement to other distress signals",es:"NC = SEÑAL INTERNACIONAL DE SOCORRO\n\nSignificado: 'Estoy en peligro y necesito asistencia inmediata'\n\nEQUIVALENTE DE MAYDAY por banderas\nMismo valor legal internacional que el MAYDAY por radio\n\nUSO:\n→ Fallo eléctrico total (radio imposible)\n→ Visible de día a gran distancia",pt:"NC = SINAL INTERNACIONAL DE PERIGO\n\nSignificado: 'Estou em perigo e preciso de assistência imediata'\n\nEQUIVALENTE DE MAYDAY por bandeiras\nMesmo valor legal internacional que o MAYDAY rádio\n\nUSO:\n→ Falha elétrica total (rádio impossível)\n→ Visível de dia a grande distância"} },
    { flags:["C","B"], color:C.orange,
      label:{fr:"CB — Secours demandé",en:"CB — Assistance requested",es:"CB — Asistencia solicitada",pt:"CB — Assistência solicitada"},
      desc:{fr:"CB = JE DEMANDE DU SECOURS\n\nSignification : 'Je suis en danger et j'ai besoin de secours immédiat'\n\nMoins urgent que NC (détresse)\nMais signal de secours reconnu internationalement\n\nC = Oui / Charlie\nB = Matières dangereuses / Bravo\n\nEXEMPLE D'UTILISATION :\nNavire en avarie sérieuse nécessitant aide\nMais pas de danger immédiat de naufrage",en:"CB = I REQUIRE ASSISTANCE\n\nMeaning: 'I am in danger and require immediate assistance'\n\nLess urgent than NC (distress)\nBut internationally recognized rescue signal",es:"CB = SOLICITO ASISTENCIA\n\nSignificado: 'Estoy en peligro y solicito asistencia inmediata'\n\nMenos urgente que NC (socorro)\nPero señal de rescate reconocida internacionalmente",pt:"CB = SOLICITO ASSISTÊNCIA\n\nSignificado: 'Estou em perigo e solicito assistência imediata'\n\nMenos urgente que NC (perigo)\nMas sinal de socorro reconhecido internacionalmente"} },
    { flags:["A","N"], color:C.blue2,
      label:{fr:"AN — Médecin à bord ?",en:"AN — Is there a doctor?",es:"AN — ¿Hay médico a bordo?",pt:"AN — Há médico a bordo?"},
      desc:{fr:"AN = Y A-T-IL UN MÉDECIN À BORD ?\n\nSignification : Avez-vous un médecin à bord ?\nQuestion posée à un autre navire croisé en mer\n\nRÉPONSE :\n'CY' = Je peux fournir un médecin\n'ZM' = Envoyez quelqu'un\n\nUTILISATION :\nUrgence médicale à bord\nEn complément du VHF PAN-PAN MEDICO\n\nSYSTÈME À 2 PAVILLONS :\nPremier pavillon = groupe · Deuxième = message",en:"AN = DO YOU HAVE A DOCTOR ON BOARD?\n\nMeaning: Do you have a doctor on board?\nQuestion asked to another passing vessel\n\nRESPONSE:\n'CY' = I can provide a doctor\n'ZM' = Send someone\n\nUSE:\nMedical emergency on board\nIn addition to VHF PAN-PAN MEDICO",es:"AN = ¿HAY MÉDICO A BORDO?\n\nSignificado: ¿Tiene un médico a bordo?\nPregunta formulada a otro buque que se cruza\n\nRESPUESTA:\n'CY' = Puedo facilitar un médico\n'ZM' = Envíe a alguien",pt:"AN = HÁ MÉDICO A BORDO?\n\nSignificado: Tem um médico a bordo?\nPergunta feita a outro navio que passa\n\nRESPOSTA:\n'CY' = Posso fornecer um médico\n'ZM' = Envie alguém"} },
    { flags:["Q","L"], color:C.yellow,
      label:{fr:"QL — Quarantaine stricte",en:"QL — Strict quarantine",es:"QL — Cuarentena estricta",pt:"QL — Quarentena estrita"},
      desc:{fr:"QL = QUARANTAINE STRICTE\nMon navire est infecté — ne pas approcher\n\nDIFFÉRENCE Q vs QL :\nQ seul = navire sain, demande libre pratique\nQL ensemble = navire malade, quarantaine stricte\n\nCAS D'UTILISATION :\n→ Épidémie à bord détectée\n→ Maladie contagieuse grave (COVID, Ebola, etc.)\n→ Navire en attente d'inspection sanitaire\n\nOBLIGATION :\nAucun autre navire ne doit s'approcher\nAutorisations sanitaires avant tout contact",en:"QL = STRICT QUARANTINE\nMy vessel is infected — do not approach\n\nDIFFERENCE Q vs QL:\nQ alone = healthy vessel, requesting free pratique\nQL together = infected vessel, strict quarantine\n\nUSE CASES:\n→ Epidemic detected on board\n→ Serious contagious disease (COVID, Ebola, etc.)\n→ Vessel awaiting sanitary inspection",es:"QL = CUARENTENA ESTRICTA\nMi buque está infectado — no se aproxime\n\nDIFERENCIA Q vs QL:\nQ solo = buque sano, solicita libre plática\nQL juntas = buque infectado, cuarentena estricta",pt:"QL = QUARENTENA ESTRITA\nO meu navio está infectado — não se aproxime\n\nDIFERENCE Q vs QL:\nQ sozinha = navio são, solicita livre prática\nQL juntas = navio infetado, quarentena estrita"} },
    { flags:["G","W"], color:C.green,
      label:{fr:"GW — Médecin & pilote",en:"GW — Doctor & pilot",es:"GW — Médico y práctico",pt:"GW — Médico e prático"},
      desc:{fr:"GW = J'AI BESOIN D'UN MÉDECIN ET D'UN PILOTE\n\nCOMBINAISON DOUBLE URGENCE :\nG = Je désire un pilote (entrée au port)\nW = J'ai besoin d'assistance médicale\n\nLES 2 ENSEMBLE = urgence médicale + pilotage\nNavire avec blessé grave entrant au port\n\nEXEMPLE :\nNavire avec blessé grave voulant entrer au port\nle plus vite possible avec un pilote",en:"GW = I NEED A DOCTOR AND A PILOT\n\nDOUBLE URGENCY COMBINATION:\nG = I require a pilot (port entry)\nW = I require medical assistance\n\nBOTH TOGETHER = medical emergency + pilotage\nVessel with seriously injured entering port",es:"GW = NECESITO UN MÉDICO Y UN PRÁCTICO\n\nCOMBINACIÓN DE DOBLE URGENCIA:\nG = Necesito un práctico (entrada al puerto)\nW = Necesito asistencia médica\n\nAMBAS JUNTAS = emergencia médica + practicaje",pt:"GW = PRECISO DE UM MÉDICO E DE UM PRÁTICO\n\nCOMBINAÇÃO DE DUPLA URGÊNCIA:\nG = Preciso de um prático (entrada no porto)\nW = Preciso de assistência médica"} },
  ];

  const sel_ = sel!==null ? combos[sel] : null;
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {combos.map((co,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:12,cursor:"pointer",
            background:sel===i?`${co.color}12`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${sel===i?co.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{display:"flex",gap:4}}>
              {co.flags.map(f=><FlagSVG key={f} letter={f} size={36}/>)}
            </div>
            <div>
              <div style={{fontSize:12,fontWeight:700,color:sel===i?co.color:C.white}}>{co.label[lang]||co.label.fr}</div>
              <div style={{fontSize:9,color:co.color,fontFamily:"monospace"}}>{co.flags.join(' + ')}</div>
            </div>
            <div style={{marginLeft:"auto",fontSize:12,color:C.muted}}>{sel===i?"▲":"▼"}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{display:"flex",gap:6,marginBottom:8}}>
          {sel_.flags.map(f=><FlagSVG key={f} letter={f} size={44}/>)}
        </div>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — FLAG QUIZ
// ══════════════════════════════════════
function FlagQuizSVG({ lang }) {
  const [qIdx, setQIdx] = useState(0);
  const [ans, setAns] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const qs = {
    fr:[
      { flag:"Q", q:"Ce pavillon jaune signifie :", opts:["Je désire un pilote","Quarantaine / Je demande libre pratique","J'ai besoin d'assistance","Matières dangereuses"], correct:1 },
      { flag:"O", q:"Ce pavillon indique :", opts:["Homme à la mer !","Je vire à tribord","Mon navire est stoppé","Je bats en arrière"], correct:0 },
      { flag:"H", q:"Pavillon H = ?", opts:["J'ai besoin d'un pilote","Pilote à bord","Je suis en feu","Plongeur"], correct:1 },
      { flag:"A", q:"Pavillon A affiché par un navire =", opts:["Je désire un pilote","Matières dangereuses","Plongeur en immersion — passez lentement","Homme à la mer"], correct:2 },
      { flag:"V", q:"Pavillon V = ?", opts:["Je suis en détresse","J'ai besoin d'assistance","Médecin requis","Quarantaine"], correct:1 },
    ],
    en:[
      { flag:"Q", q:"This yellow flag means:", opts:["I require a pilot","Quarantine / requesting free pratique","I require assistance","Dangerous goods"], correct:1 },
      { flag:"O", q:"This flag indicates:", opts:["Man overboard!","Altering to starboard","My vessel is stopped","Engines going astern"], correct:0 },
      { flag:"H", q:"Flag H = ?", opts:["I require a pilot","Pilot on board","I am on fire","Diver down"], correct:1 },
      { flag:"A", q:"Flag A displayed by a vessel =", opts:["I require a pilot","Dangerous goods","Diver down — pass slowly","Man overboard"], correct:2 },
      { flag:"V", q:"Flag V = ?", opts:["I am in distress","I require assistance","Medical help needed","Quarantine"], correct:1 },
    ],
    es:[
      { flag:"Q", q:"Esta bandera amarilla significa:", opts:["Necesito un práctico","Cuarentena / solicito libre plática","Necesito asistencia","Materias peligrosas"], correct:1 },
      { flag:"O", q:"Esta bandera indica:", opts:["¡Hombre al agua!","Viro a estribor","Mi buque está parado","Máquinas atrás"], correct:0 },
      { flag:"H", q:"¿Bandera H = ?", opts:["Necesito un práctico","Práctico a bordo","Estoy en llamas","Buceador"], correct:1 },
      { flag:"A", q:"Bandera A mostrada por un buque =", opts:["Necesito un práctico","Materias peligrosas","Buceador sumergido — pasar despacio","Hombre al agua"], correct:2 },
      { flag:"V", q:"¿Bandera V = ?", opts:["Estoy en peligro","Necesito asistencia","Médico necesario","Cuarentena"], correct:1 },
    ],
    pt:[
      { flag:"Q", q:"Esta bandeira amarela significa:", opts:["Preciso de um prático","Quarentena / solicito livre prática","Preciso de assistência","Materiais perigosos"], correct:1 },
      { flag:"O", q:"Esta bandeira indica:", opts:["Homem ao mar!","Viro para estibordo","O meu navio está parado","Motores à ré"], correct:0 },
      { flag:"H", q:"Bandeira H = ?", opts:["Preciso de um prático","Prático a bordo","Estou em chamas","Mergulhador"], correct:1 },
      { flag:"A", q:"Bandeira A exibida por um navio =", opts:["Preciso de um prático","Materiais perigosos","Mergulhador submerso — passe devagar","Homem ao mar"], correct:2 },
      { flag:"V", q:"Bandeira V = ?", opts:["Estou em perigo","Preciso de assistência","Médico necessário","Quarentena"], correct:1 },
    ],
  };

  const list = qs[lang]||qs.fr;
  const [shuffled]=useState(()=>list.map(shuffleQuestionOptions));
  const q = shuffled[qIdx];

  const pick=(i)=>{if(ans!==null)return;setAns(i);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(qIdx<list.length-1){setQIdx(q=>q+1);setAns(null);}else setDone(true);};

  if(done) return (
    <div style={{textAlign:"center",padding:"16px 0"}}>
      <div style={{fontSize:48}}>{score>=4?"🏆":score>=3?"🎖️":"📚"}</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,marginTop:8}}>{score}/{list.length}</div>
      <button onClick={()=>{setDone(false);setQIdx(0);setAns(null);setScore(0);}} style={{marginTop:10,padding:"8px 16px",borderRadius:10,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:C.muted,cursor:"pointer",fontSize:11}}>
        🔄 {lang==="fr"?"Recommencer":"Restart"}
      </button>
    </div>
  );

  return (
    <div>
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {list.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<qIdx?C.green:i===qIdx?C.gold2:"rgba(255,255,255,0.1)"}}/>)}
      </div>
      <div style={{textAlign:"center",marginBottom:12}}>
        <FlagSVG letter={q.flag} size={64}/>
        <div style={{fontSize:12,color:C.white,fontWeight:600,marginTop:8}}>{q.q}</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{
          let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";
          if(ans!==null){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===ans){bg="rgba(192,57,43,0.2)";bd=C.red;}}
          return <button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:ans!==null?"default":"pointer"}}>{opt}</button>;
        })}
      </div>
      {ans!==null&&<button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.purple},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:C.white,cursor:"pointer"}}>
        {qIdx<list.length-1?(lang==="fr"?"SUIVANT →":"NEXT →"):(lang==="fr"?"RÉSULTAT":"RESULT")}
      </button>}
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"Incident plongeurs MV Puffin — Méditerranée (2019)",teaser:"Bateau à moteur · plongeurs non signalés · jet ski · blessure grave · pavillon A absent",what:"Le 15 août 2019, un groupe de plongeurs effectue une plongée récréative depuis le voilier MV Puffin ancré en Méditerranée. Le pilote d'un jet ski, ne voyant pas le pavillon Alpha (plongeur en immersion), passe à grande vitesse à moins de 30 mètres du pavillon de surface des plongeurs. Un plongeur remontant est heurté et subit une fracture sérieuse.",cause:"• Le MV Puffin n'arborait PAS le pavillon Alpha\n• Le chef de palanquée n'avait pas vérifié le pavillon avant l'immersion\n• Pas de bouée de signalisation de surface (SMB) déployée\n• Le jet ski naviguait trop vite pour une zone de mouillage\n• Mauvaise communication entre surface et plongeurs",lessons:"✓ Pavillon ALPHA obligatoire dès qu'un plongeur est à l'eau\n✓ SMB (Surface Marker Buoy) obligatoire pour chaque plongeur\n✓ VHF 16 pour signaler la zone de plongée aux navires proches\n✓ Zone de sécurité = 100m autour des plongeurs\n✓ Si pas de pavillon visible = 5 sons courts + contournement obligatoire",link:"🔗 Lien L4 : Le pavillon A (Alpha) n'est pas optionnel — c'est une obligation légale et une question de vie. En mer, les autres navigateurs ne peuvent pas deviner qu'il y a des plongeurs. Le pavillon est leur seule protection visible à distance."},
    en:{title:"Diver Incident MV Puffin — Mediterranean (2019)",teaser:"Motor vessel · unmarked divers · jet ski · serious injury · missing flag Alpha",what:"On August 15, 2019, a group of recreational divers dives from the anchored sailing vessel MV Puffin in the Mediterranean. The jet ski rider, not seeing the Alpha flag (diver down), passes at high speed less than 30 meters from the divers' surface buoy. An ascending diver is struck and suffers a serious fracture.",cause:"• MV Puffin was NOT displaying the Alpha flag\n• Dive leader had not checked the flag before descent\n• No SMB (Surface Marker Buoy) deployed\n• Jet ski navigating too fast for anchoring zone\n• Poor communication between surface and divers",lessons:"✓ ALPHA flag mandatory whenever a diver is in water\n✓ SMB (Surface Marker Buoy) mandatory for each diver\n✓ VHF 16 to alert nearby vessels to diving zone\n✓ Safety zone = 100m around divers\n✓ If no flag visible = 5 short blasts + mandatory detour",link:"🔗 L4 Link: Flag A (Alpha) is not optional — it is a legal obligation and a matter of life. At sea, other navigators cannot guess there are divers. The flag is their only protection visible from a distance."},
    es:{title:"Incidente buzos MV Puffin — Mediterráneo (2019)",teaser:"Barco a motor · buzos sin señalizar · moto acuática · lesión grave · bandera A ausente",what:"El 15 de agosto de 2019, un grupo de buzos recreativos realiza una inmersión desde el velero MV Puffin fondeado en el Mediterráneo. El piloto de una moto acuática, al no ver la bandera Alpha (buceador sumergido), pasa a alta velocidad a menos de 30 metros de la boya de superficie de los buzos. Un buceador que ascendía es golpeado y sufre una fractura grave.",cause:"• El MV Puffin NO exhibía la bandera Alpha\n• El jefe de palanquín no había comprobado la bandera antes de la inmersión\n• No se desplegó ninguna boya SMB\n• La moto acuática navegaba demasiado rápido para una zona de fondeo\n• Mala comunicación entre la superficie y los buzos",lessons:"✓ Bandera ALPHA obligatoria cuando hay buceadores en el agua\n✓ SMB (boya de señalización de superficie) obligatoria para cada buceador\n✓ VHF 16 para avisar a los buques cercanos de la zona de buceo",link:"🔗 Vínculo L4: La bandera A (Alpha) no es opcional — es una obligación legal y una cuestión de vida. En el mar, los otros navegantes no pueden adivinar que hay buzos."},
    pt:{title:"Incidente mergulhadores MV Puffin — Mediterrâneo (2019)",teaser:"Barco a motor · mergulhadores não sinalizados · jet ski · lesão grave · bandeira A ausente",what:"A 15 de agosto de 2019, um grupo de mergulhadores recreativos faz uma mergulho a partir do veleiro MV Puffin fundeado no Mediterrâneo. O piloto de um jet ski, não vendo a bandeira Alpha (mergulhador submerso), passa a alta velocidade a menos de 30 metros da boia de superfície dos mergulhadores. Um mergulhador a subir é atingido e sofre uma fratura grave.",cause:"• O MV Puffin NÃO exibia a bandeira Alpha\n• O chefe da patrulha não tinha verificado a bandeira antes da imersão\n• Nenhuma boia SMB desdobrada\n• O jet ski navegava demasiado rápido para uma zona de fundeamento\n• Má comunicação entre a superfície e os mergulhadores",lessons:"✓ Bandeira ALPHA obrigatória quando há mergulhadores na água\n✓ SMB (boia de sinalização de superfície) obrigatória para cada mergulhador\n✓ VHF 16 para alertar navios próximos da zona de mergulho",link:"🔗 Vínculo L4: A bandeira A (Alpha) não é opcional — é uma obrigação legal e uma questão de vida. No mar, os outros navegadores não podem adivinhar que há mergulhadores."},
  };
  const c=d[lang]||d.fr;
  return(
    <div style={{background:"rgba(26,111,212,0.08)",border:`1.5px solid ${C.blue2}44`,borderRadius:18,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>🤿</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.blue2,marginBottom:2}}>{c.title}</div><div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{c.teaser}</div></div>
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
      {id:"q1",q:"Pavillon JAUNE UNI arboré à l'entrée d'un port étranger = ?\n(Répondre : 1 lettre)",correct:"Q"},
      {id:"q2",q:"NC ensemble = quel signal d'urgence ?\n(Répondre : 1 mot)",correct:"détresse"},
      {id:"q3",q:"Pavillon O (Oscar) = ?\n(Répondre : 3 mots)",correct:"homme à la"},
    ],
    en:[
      {id:"q1",q:"SOLID YELLOW flag hoisted entering a foreign port = ?\n(Answer: 1 letter)",correct:"Q"},
      {id:"q2",q:"NC together = what urgency signal?\n(Answer: 1 word)",correct:"distress"},
      {id:"q3",q:"Flag O (Oscar) = ?\n(Answer: 3 words)",correct:"man over"},
    ],
    es:[
      {id:"q1",q:"Bandera AMARILLA SÓLIDA izada al entrar en puerto extranjero = ?\n(Responder: 1 letra)",correct:"Q"},
      {id:"q2",q:"NC juntas = ¿qué señal de urgencia?\n(Responder: 1 palabra)",correct:"socorro"},
      {id:"q3",q:"¿Bandera O (Oscar) = ?\n(Responder: 3 palabras)",correct:"hombre al agua"},
    ],
    pt:[
      {id:"q1",q:"Bandeira AMARELA SÓLIDA içada ao entrar em porto estrangeiro = ?\n(Responder: 1 letra)",correct:"Q"},
      {id:"q2",q:"NC juntas = que sinal de urgência?\n(Responder: 1 palavra)",correct:"perigo"},
      {id:"q3",q:"Bandeira O (Oscar) = ?\n(Responder: 3 palavras)",correct:"homem ao mar"},
    ],
  };
  const list=qs[lang]||qs.fr;
  const chk=(q,val)=>{
    const v=val.trim().toLowerCase();
    if(q.id==="q1") return v.includes("q");
    if(q.id==="q2") return v.includes("détresse")||v.includes("detress")||v.includes("socorro")||v.includes("perigo")||v.includes("distress");
    if(q.id==="q3") return v.includes("homme")||v.includes("man over")||v.includes("hombre")||v.includes("homem");
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.purple}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : Q = jaune = libre pratique · NC = détresse = MAYDAY pavillon · O = Oscar = homme à la mer"
        :lang==="en"?"💡 Reminders: Q = yellow = free pratique · NC = distress = flag MAYDAY · O = Oscar = man overboard"
        :lang==="es"?"💡 Recordatorios: Q = amarillo = libre plática · NC = socorro = MAYDAY bandera · O = Oscar = hombre al agua"
        :"💡 Lembretes: Q = amarelo = livre prática · NC = perigo = MAYDAY bandeira · O = Oscar = homem ao mar"}
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
        {lang==="fr"?"✅ Q1: Q (pavillon jaune uni = quarantaine · obligation légale avant entrée port étranger)\n✅ Q2: DÉTRESSE (NC = 2 pavillons = signal de détresse = équivalent MAYDAY)\n✅ Q3: HOMME À LA MER (Oscar O = MOB · lancer bouée + VHF + manœuvre MOB)"
        :lang==="en"?"✅ Q1: Q (solid yellow flag = quarantine · legal obligation before entering foreign port)\n✅ Q2: DISTRESS (NC = 2 flags = distress signal = MAYDAY equivalent)\n✅ Q3: MAN OVERBOARD (Oscar O = MOB · throw buoy + VHF + MOB maneuver)"
        :"✅ Q1: Q · Q2: Socorro/Perigo · Q3: Hombre al agua / Homem ao mar"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

export const QUIZ = {
  fr:[
    {q:"Quel pavillon un navire doit-il arborer à l'arrivée dans un port étranger ?",opts:["Pavillon A (Alpha)","Pavillon Q (Quebec) — pavillon jaune signalant que le navire est sain et demandant la libre pratique","Pavillon V (Victor)","Pavillon B (Bravo)"],correct:1,expl:"Pavillon Q (Quebec) = pavillon JAUNE UNI. Obligation légale d'arborer ce pavillon à l'arrivée dans un port étranger avant l'autorisation des autorités douanières. Signifie : 'Mon navire est sain — je demande la libre pratique (autorisation de communiquer avec le port et de débarquer)'. Retiré quand les autorités accordent l'autorisation. Si QL ensemble : quarantaine stricte (navire infecté)."},
    {q:"Que signifient les pavillons NC arborés ensemble sur un navire ?",opts:["Navire commercial","Signal de détresse — équivalent du MAYDAY en pavillons — besoin d'assistance immédiate","Navire en quarantaine","Pilote à bord et demande de communications"],correct:1,expl:"NC ensemble = SIGNAL DE DÉTRESSE INTERNATIONAL (Code International des Signaux). Équivalent du MAYDAY radio mais en signaux visuels de pavillons. Valeur légale identique. Utilisé quand : radio impossible (panne), visibilité suffisante pour être vu. N = November (NON), C = Charlie (OUI) — ensemble le sens change et devient 'détresse'. À reconnaître à distance dans n'importe quelle condition météo favorable."},
    {q:"Un navire arborant le pavillon A (Alpha) — que doivent faire les autres navires ?",opts:["Accélérer","Passer à grande distance et à faible vitesse — un plongeur est en immersion sous le navire","Signaler leur présence par radio","Arborer également le pavillon A"],correct:1,expl:"Pavillon A (Alpha) = blanc et bleu (queue d'aronde). Signification : 'J'ai un plongeur en immersion — restez à l'écart et allez lentement'. OBLIGATIONS des autres navires : passer à distance suffisante (minimum 30-50m), réduire la vitesse au minimum, éviter de créer des remous. Le non-respect peut blesser gravement le plongeur. Obligation légale dans la plupart des pays. SMB (Surface Marker Buoy) des plongeurs complète ce signal."},
    {q:"Que signifie le pavillon O (Oscar) ?",opts:["Je suis stoppé","Homme à la mer ! — signal d'urgence critique demandant une réponse immédiate","Je désire communiquer","Pilote requis"],correct:1,expl:"Pavillon O (Oscar) = rouge avec cercle jaune. Signification : HOMME À LA MER (MOB). Signal d'URGENCE CRITIQUE. Actions immédiates : lancer la bouée MOB, émettre MAYDAY ou PAN-PAN sur VHF 16, marquer la position GPS, exécuter la manœuvre MOB (virage Williamson ou cercle rescapé), arborner le pavillon O. Le temps est critique — chaque minute compte pour la survie du naufragé. De nuit : feux stroboscopiques + fusées éclairantes."},
    {q:"Quel est le signal de pavillon associé à 'Je désire un pilote' ?",opts:["Pavillon H","Pavillon G — à bandes verticales jaune et bleu","Pavillon P","Pavillon K"],correct:1,expl:"Pavillon G (Golf) = rayures verticales alternées JAUNE et BLEU. Signification : 'Je désire un pilote'. Arboré à l'approche d'un port à pilotage obligatoire ou recommandé. Accompagné généralement d'un appel VHF canal 16 vers la station de pilotage. Quand le pilote est embarqué : le pavillon G est remplacé par le pavillon H (Hotel) — rouge et blanc verticaux = 'pilote à bord'."},
  ],
  en:[
    {q:"What flag must a vessel hoist on arrival at a foreign port?",opts:["Flag A (Alpha)","Flag Q (Quebec) — yellow flag signaling the vessel is healthy and requesting free pratique","Flag V (Victor)","Flag B (Bravo)"],correct:1,expl:"Flag Q (Quebec) = SOLID YELLOW flag. Legal obligation to hoist this flag on arrival at a foreign port before customs authorization. Means: 'My vessel is healthy — I request free pratique (authorization to communicate with port and disembark)'. Lowered when authorities grant permission. If QL together: strict quarantine (infected vessel)."},
    {q:"What do flags NC hoisted together on a vessel mean?",opts:["Commercial vessel","Distress signal — MAYDAY flag equivalent — immediate assistance required","Vessel in quarantine","Pilot on board and communication request"],correct:1,expl:"NC together = INTERNATIONAL DISTRESS SIGNAL (International Signal Code). Equivalent of radio MAYDAY but in visual flag signals. Same legal value. Used when: radio impossible (failure), sufficient visibility to be seen. N = November (NO), C = Charlie (YES) — together the meaning changes to 'distress'. Must be recognized at distance in any favorable weather condition."},
    {q:"A vessel displaying flag A (Alpha) — what must other vessels do?",opts:["Accelerate","Pass at great distance and slow speed — a diver is underwater below the vessel","Report their presence by radio","Also hoist flag A"],correct:1,expl:"Flag A (Alpha) = white and blue (swallowtail). Meaning: 'I have a diver down — keep clear and go slowly'. OBLIGATIONS of other vessels: pass at sufficient distance (minimum 30-50m), reduce speed to minimum, avoid creating wash. Failure to comply can seriously injure the diver. Legal obligation in most countries. Divers' SMB (Surface Marker Buoy) complements this signal."},
    {q:"What does flag O (Oscar) mean?",opts:["I am stopped","Man overboard! — critical urgency signal requiring immediate response","I wish to communicate","Pilot required"],correct:1,expl:"Flag O (Oscar) = red with yellow circle. Meaning: MAN OVERBOARD (MOB). CRITICAL URGENCY signal. Immediate actions: throw MOB buoy, send MAYDAY or PAN-PAN on VHF 16, mark GPS position, execute MOB maneuver (Williamson turn or rescue circle), hoist flag O. Time is critical — every minute counts for survivor's survival. Night: strobe lights + flares."},
    {q:"What is the flag signal for 'I require a pilot'?",opts:["Flag H","Flag G — vertical yellow and blue stripes","Flag P","Flag K"],correct:1,expl:"Flag G (Golf) = alternating vertical YELLOW and BLUE stripes. Meaning: 'I require a pilot'. Hoisted approaching a port with mandatory or recommended pilotage. Usually accompanied by a VHF channel 16 call to the pilot station. When pilot is embarked: flag G is replaced by flag H (Hotel) — vertical red and white = 'pilot on board'."},
  ],
  es:[
    {q:"¿Qué bandera debe izar un buque a su llegada a un puerto extranjero?",opts:["Bandera A (Alpha)","Bandera Q (Quebec) — bandera amarilla que indica que el buque está sano y solicita libre plática","Bandera V (Victor)","Bandera B (Bravo)"],correct:1,expl:"Bandera Q (Quebec) = bandera AMARILLA SÓLIDA. Obligación legal de izar esta bandera a la llegada a un puerto extranjero antes de la autorización aduanera. Significa: 'Mi buque está sano — solicito libre plática'. Arriada cuando las autoridades lo autoricen. Si QL juntas: cuarentena estricta (buque infectado)."},
    {q:"¿Qué significan las banderas NC izadas juntas en un buque?",opts:["Buque mercante","Señal de socorro — equivalente de MAYDAY por banderas — asistencia inmediata necesaria","Buque en cuarentena","Práctico a bordo y solicitud de comunicaciones"],correct:1,expl:"NC juntas = SEÑAL INTERNACIONAL DE SOCORRO. Equivalente del MAYDAY por radio pero en señales visuales de banderas. Mismo valor legal. Utilizado cuando: radio imposible, visibilidad suficiente. N = November (NO), C = Charlie (SÍ) — juntas el significado cambia a 'socorro'."},
    {q:"¿Un buque que enarbola la bandera A (Alpha) — qué deben hacer los demás buques?",opts:["Acelerar","Pasar a gran distancia y a baja velocidad — un buceador está sumergido bajo el buque","Informar de su presencia por radio","También izar la bandera A"],correct:1,expl:"Bandera A (Alpha) = blanca y azul (cola de golondrina). Significado: 'Tengo un buceador sumergido — manténgase alejado y vaya despacio'. OBLIGACIONES de otros buques: pasar a distancia suficiente (mínimo 30-50m), reducir la velocidad al mínimo, evitar crear estela. El incumplimiento puede lesionar gravemente al buceador."},
    {q:"¿Qué significa la bandera O (Oscar)?",opts:["Estoy parado","¡Hombre al agua! — señal de urgencia crítica que exige respuesta inmediata","Deseo comunicarme","Práctico requerido"],correct:1,expl:"Bandera O (Oscar) = roja con círculo amarillo. Significado: HOMBRE AL AGUA (MOB). Señal de URGENCIA CRÍTICA. Acciones inmediatas: lanzar la boya MOB, emitir MAYDAY o PAN-PAN en VHF 16, marcar posición GPS, ejecutar maniobra MOB, izar bandera O. El tiempo es crítico — cada minuto cuenta."},
    {q:"¿Cuál es la señal de bandera 'Necesito un práctico'?",opts:["Bandera H","Bandera G — franjas verticales amarillas y azules","Bandera P","Bandera K"],correct:1,expl:"Bandera G (Golf) = franjas verticales alternadas AMARILLAS y AZULES. Significado: 'Necesito un práctico'. Izada al aproximarse a un puerto con practicaje obligatorio o recomendado. Acompañada de una llamada VHF canal 16. Cuando el práctico está embarcado: G se reemplaza por H = 'práctico a bordo'."},
  ],
  pt:[
    {q:"Que bandeira deve içar um navio à chegada a um porto estrangeiro?",opts:["Bandeira A (Alpha)","Bandeira Q (Quebec) — bandeira amarela que sinaliza que o navio está são e solicita livre prática","Bandeira V (Victor)","Bandeira B (Bravo)"],correct:1,expl:"Bandeira Q (Quebec) = bandeira AMARELA SÓLIDA. Obrigação legal de içar esta bandeira à chegada a um porto estrangeiro antes da autorização aduaneira. Significa: 'O meu navio está são — solicito livre prática'. Arriada quando as autoridades concedem autorização. Se QL juntas: quarentena estrita (navio infetado)."},
    {q:"O que significam as bandeiras NC içadas juntas num navio?",opts:["Navio comercial","Sinal de perigo — equivalente de MAYDAY por bandeiras — assistência imediata necessária","Navio em quarentena","Prático a bordo e pedido de comunicações"],correct:1,expl:"NC juntas = SINAL INTERNACIONAL DE PERIGO. Equivalente do MAYDAY rádio mas em sinais visuais de bandeiras. Mesmo valor legal. Utilizado quando: rádio impossível, visibilidade suficiente. N = November (NÃO), C = Charlie (SIM) — juntas o significado muda para 'perigo'."},
    {q:"Um navio a exibir a bandeira A (Alpha) — o que devem fazer os outros navios?",opts:["Acelerar","Passar a grande distância e a baixa velocidade — um mergulhador está submerso sob o navio","Comunicar a sua presença por rádio","Também içar a bandeira A"],correct:1,expl:"Bandeira A (Alpha) = branca e azul (cauda de andorinha). Significado: 'Tenho um mergulhador submerso — mantenha distância e vá devagar'. OBRIGAÇÕES dos outros navios: passar a distância suficiente (mínimo 30-50m), reduzir a velocidade ao mínimo, evitar criar agitação. O incumprimento pode lesionar gravemente o mergulhador."},
    {q:"O que significa a bandeira O (Oscar)?",opts:["Estou parado","Homem ao mar! — sinal de urgência crítico que requer resposta imediata","Desejo comunicar","Prático necessário"],correct:1,expl:"Bandeira O (Oscar) = vermelha com círculo amarelo. Significado: HOMEM AO MAR (MOB). Sinal de URGÊNCIA CRÍTICO. Ações imediatas: lançar boia MOB, enviar MAYDAY ou PAN-PAN no VHF 16, marcar posição GPS, executar manobra MOB, içar bandeira O. O tempo é crítico — cada minuto conta."},
    {q:"Qual é o sinal de bandeira 'Preciso de um prático'?",opts:["Bandeira H","Bandeira G — franjas verticais amarelas e azuis","Bandeira P","Bandeira K"],correct:1,expl:"Bandeira G (Golf) = franjas verticais alternadas AMARELAS e AZUIS. Significado: 'Preciso de um prático'. Içada ao aproximar-se de um porto com praticagem obrigatória ou recomendada. Acompanhada de chamada VHF canal 16. Quando o prático está embarcado: G é substituída por H = 'prático a bordo'."},
  ],
};

export const BANK = {
  fr:[
    {q:"Qu'est-ce que le 'Code International des Signaux' (CIS) ?",opts:["Un code de navigation","Système international standardisé de communication par pavillons, signaux lumineux et sonores — publié par l'OMI — permet à des navires de nationalités différentes de communiquer","Un code douanier","Un code de conduite maritime"],correct:1,expl:"Code International des Signaux (CIS) = publié et maintenu par l'OMI (depuis 1969). Couvre : pavillons alphabétiques A-Z + numériques + substituts, signaux sonores, signaux lumineux morse. Permet la communication internationale entre navires de nationalités différentes sans connaissance linguistique commune. Disponible à bord de tous les navires professionnels. Version numérique disponible."},
    {q:"Combien de pavillons comporte l'alphabet du Code International des Signaux ?",opts:["24","26 lettres + 10 chiffres + 3 pavillons substituts","26 uniquement","40"],correct:1,expl:"CIS = 26 pavillons alphabétiques (A-Z) + 10 pavillons numériques (0-9) + 3 pavillons SUBSTITUTS (ou répéteurs) + pavillon réponse/décimale. Les 3 substituts permettent de répéter une lettre dans un groupe sans avoir à dupliquer le pavillon. Exemple : 'AA' = pavillon A + premier substitut. Total dans un jeu complet : environ 40 pavillons différents."},
    {q:"Qu'est-ce que les 'pavillons substituts' dans le Code International des Signaux ?",opts:["Des pavillons de rechange","Pavillons permettant de répéter une lettre dans un groupe de signaux sans nécessiter deux exemplaires du même pavillon — 1er, 2ème, 3ème substitut","Des pavillons défectueux","Des pavillons temporaires"],correct:1,expl:"Pavillons substituts (repeaters) = 3 pavillons spéciaux permettant de répéter une lettre dans un groupe. 1er substitut = répète la 1ère lettre du groupe précédent. 2ème substitut = répète la 2ème lettre. 3ème substitut = répète la 3ème lettre. Exemple : groupe 'AA' = pavillon A + 1er substitut. Groupe 'BBA' = B + 1er substitut + A. Permet d'économiser le nombre de pavillons à bord."},
    {q:"Quelle est la signification du pavillon L (Lima) ?",opts:["Je désire un pilote","Stoppez votre navire immédiatement !","Je suis stoppé","Homme à la mer"],correct:1,expl:"Pavillon L (Lima) = jaune avec carré noir. Signification : 'Stoppez votre navire immédiatement'. Signal d'ordre direct à un autre navire. Utilisé par : navires de contrôle (gardes-côtes), autorités portuaires, dans des situations où un navire doit stopper d'urgence. Correspond au signal sonore 5 sons courts (danger). Peut être accompagné d'un signal radio ou de signaux lumineux."},
    {q:"Qu'est-ce que le pavillon 'Bravo' (B) et sa signification hors Code des Signaux ?",opts:["Cargaison dangereuse (Code des Signaux), mais aussi utilisé comme fanion de compétition en régate","Signal de détresse uniquement","Pilote à bord","Homme à la mer"],correct:0,expl:"Pavillon B (Bravo) = pavillon rouge uni. Dans le CIS : 'Je charge/décharge/transporte des matières dangereuses'. Mais aussi : dans la marine militaire internationale = fanion signifiant 'Bravo' (bien joué) décerné à équipages méritants. En régate et compétition nautique : peut indiquer qu'un rappel est en vigueur (flag B). Usage multiple selon contexte."},
    {q:"Comment sont ordonnés les pavillons dans un groupe de signaux ?",opts:["Dans l'ordre alphabétique","Le pavillon le plus haut représente la lettre la plus importante — les pavillons se lisent de haut en bas","Par couleur","Par taille"],correct:1,expl:"Ordre de lecture des pavillons : TOUJOURS de HAUT en BAS. Le pavillon le plus élevé sur la drisse = première lettre du groupe. Les groupes de pavillons peuvent avoir 1 à 4 lettres (ou combinaisons). Un seul pavillon = signal simple. Deux pavillons = groupe à 2 lettres (ex: NC = détresse). Trois pavillons = groupe à 3 lettres. Le pavillon réponse/décimale = signal 'j'ai compris' quand le destinataire hisse ce pavillon."},
    {q:"Qu'est-ce que le pavillon 'Yankee' (Y) ?",opts:["Je désire communiquer","Je suis en traîne de mon ancre — je dérive malgré mes ancres","Je suis en panne","J'ai besoin d'assistance"],correct:1,expl:"Pavillon Y (Yankee) = rouge et jaune (à rayures verticales). Signification : 'Je suis en traîne de mon ancre — je dérive'. Signal important pour les navires voisins qui doivent se méfier d'un navire dérivant avec son ancre traînant. Différent de M (Mike) = 'je suis stoppé sans erre'. Y = ancre mais navire dérivant. Utilisation courante dans les zones de mouillage surpeuplées lors de mauvais temps."},
    {q:"Que signifie arborer le pavillon 'Papa' (P) en port avant le départ ?",opts:["Pilote à bord","En port = toutes personnes à bord — partance imminente (le Bluey / Peter)","Matières dangereuses","Demande de pilote"],correct:1,expl:"Pavillon P (Papa) = carré bleu avec rectangle blanc. En PORT avant le départ : 'Toutes personnes à bord — départ imminent'. Ce signal est utilisé par les armateurs pour rappeler tous les membres d'équipage à bord. Surnommé 'the Blue Peter' en anglais. En MER : 'Mes filets sont pris dans un obstacle'. Deux usages complètement différents selon le contexte (port vs mer)."},
    {q:"Qu'est-ce que la 'libre pratique' accordée après le pavillon Q ?",opts:["Un tarif douanier réduit","Autorisation officielle des autorités sanitaires permettant au navire de communiquer avec le port, d'embarquer/débarquer des personnes et des marchandises","Un droit de passage","Une exemption fiscale"],correct:1,expl:"Libre pratique (Free Pratique) = autorisation officielle délivrée par les autorités sanitaires du port d'entrée après inspection sanitaire. Signifie : le navire est autorisé à communiquer librement avec la terre, à débarquer/embarquer personnes et marchandises. AVANT libre pratique : aucun contact autorisé (théoriquement). Pavillon Q = 'je suis sain, je demande la libre pratique'. Retiré dès que l'autorisation est accordée."},
    {q:"Quel pavillon un navire de compétition arbore-t-il pour signaler un rappel général ?",opts:["Pavillon A","Pavillon B","Pavillon N et C combinés","Plusieurs pavillons différents selon la série"],correct:0,expl:"En compétition nautique (règles ISAF/World Sailing) : Pavillon A = rappel individuel (un bateau a fait un départ prématuré). Pavillon B = signal spécial (utilisé différemment selon les séries). Pavillon N = rappel général (toute la flotte doit revenir). Pavillon Y = obligation de porter une brassière de sauvetage. Ces usages sont DIFFÉRENTS des signaux de navigation professionnelle mais les pavillons sont les mêmes."},
    {q:"Qu'est-ce que le signal 'Foxtrot' (F) ?",opts:["Je suis en feu","Je suis en avarie — veuillez communiquer avec moi","J'ai besoin d'un pilote","Je suis stoppé"],correct:1,expl:"Pavillon F (Foxtrot) = blanc avec carré rouge central. Signification : 'Je suis en avarie et/ou je ne peux pas manœuvrer librement — communiquez avec moi'. Signal d'appel à la communication pour un navire en difficulté mais pas en danger de naufrage immédiat. Accompagné généralement d'une tentative de contact VHF 16. Différent de NC (détresse) car le navire n'est pas encore en danger de vie."},
    {q:"Comment identifier un navire portant un pavillon de courtoisie ?",opts:["Il arbore son pavillon national à la poupe et le pavillon du pays visité à la tête du mât de misaine ou sur la drisse de courtoisie","Il arbore uniquement son pavillon national","Il arbore le pavillon Q à la poupe","Il arbore tous les pavillons du Code"],correct:0,expl:"Pavillon de courtoisie = convention internationale : arborer le drapeau national du pays visité en signe de respect. Position : tête du mât de misaine (voilier) ou drisse de courtoisie à tribord (navires à moteur). Le pavillon national du navire reste à la poupe. En France : obligation légale d'arborer le drapeau français à la poupe. Les navires étrangers font de même en arborant leur pavillon national + celui de la France dans leurs eaux."},
    {q:"Qu'est-ce que le signal 'Kilo' (K) ?",opts:["Je suis stoppé","Je désire communiquer avec vous — veuillez répondre","Je vire à bâbord","Remorqueur nécessaire"],correct:1,expl:"Pavillon K (Kilo) = moitié gauche jaune, moitié droite bleue. Signification : 'Je désire communiquer avec vous'. Signal d'invitation à la communication. Utilisé pour : demander une réponse radio VHF, indiquer qu'on souhaite établir contact, demande de renseignements généraux. En Morse : —·— (trois traits pointillés). Réponse attendue : VHF canal 16 ou pavillon 'Réponse/Décimale' (T) hissé pour indiquer 'message reçu et compris'."},
    {q:"Quel est le rôle du pavillon 'Charlie' (C) utilisé seul ?",opts:["Je me dirige vers le danger","Signification : OUI ou AFFIRMATIF — réponse positive à une question posée par un autre navire","Je dois stopper","Je désire communiquer"],correct:1,expl:"Pavillon C (Charlie) = 3 bandes horizontales bleues sur fond blanc alternées. Utilisé seul = OUI (affirmatif). Opposé de pavillon N (November) = NON (négatif). Utilisé en combinaison NC = signal de détresse (sens totalement différent). Exemples d'utilisation : réponse positive à une demande d'assistance, confirmation d'un message reçu, accord à une question posée. La confusion possible avec NC (détresse) est une raison d'être vigilant."},
    {q:"Que signifie le pavillon 'Uniform' (U) ?",opts:["Je m'approche d'un pilote","Vous vous dirigez vers le danger — avertissement immédiat","J'ai besoin d'assistance médicale","Je suis en avarie"],correct:1,expl:"Pavillon U (Uniform) = deux carrés rouges en diagonale sur fond blanc (losange). Signification : 'Vous vous dirigez vers le danger'. Signal d'AVERTISSEMENT à un autre navire. Utilisé pour alerter un navire sur : un danger imminent (rocher, épave, filet), une zone dangereuse, une collision imminente. Urgent et direct. Doit être accompagné de signaux sonores (5 sons courts) et si possible radio VHF 16."},
  ],
  en:[
    {q:"What is the 'International Code of Signals' (ICS)?",opts:["A navigation code","Internationally standardized communication system using flags, light and sound signals — published by IMO — allows vessels of different nationalities to communicate","A customs code","A maritime code of conduct"],correct:1,expl:"International Code of Signals (ICS) = published and maintained by IMO (since 1969). Covers: alphabetical flags A-Z + numeric + substitutes, sound signals, Morse light signals. Allows international communication between vessels of different nationalities without common linguistic knowledge. Available on all professional vessels. Digital version available."},
    {q:"How many flags does the International Code of Signals alphabet contain?",opts:["24","26 letters + 10 digits + 3 substitute flags","26 only","40"],correct:1,expl:"ICS = 26 alphabetical flags (A-Z) + 10 numeric flags (0-9) + 3 SUBSTITUTE flags (or repeaters) + answer/decimal pennant. The 3 substitutes allow repeating a letter in a group without needing duplicate flags. Example: 'AA' = flag A + first substitute. Total in a complete set: approximately 40 different flags."},
    {q:"What are 'substitute flags' in the International Code of Signals?",opts:["Spare flags","Flags allowing repetition of a letter in a signal group without needing two copies of the same flag — 1st, 2nd, 3rd substitute","Defective flags","Temporary flags"],correct:1,expl:"Substitute flags (repeaters) = 3 special flags allowing letter repetition in a group. 1st substitute = repeats 1st letter of preceding group. 2nd substitute = repeats 2nd letter. 3rd substitute = repeats 3rd letter. Example: group 'AA' = flag A + 1st substitute. Group 'BBA' = B + 1st substitute + A. Allows economizing on number of flags carried."},
    {q:"What is the meaning of flag L (Lima)?",opts:["I require a pilot","Stop your vessel immediately!","I am stopped","Man overboard"],correct:1,expl:"Flag L (Lima) = yellow with black square. Meaning: 'Stop your vessel immediately'. Direct order signal to another vessel. Used by: control vessels (coastguards), port authorities, in situations where a vessel must stop urgently. Corresponds to 5 short blasts sound signal (danger). May be accompanied by radio signal or light signals."},
    {q:"What is flag 'Bravo' (B) and its meaning beyond the Signal Code?",opts:["Dangerous cargo (Signal Code), but also used as competition pennant in racing","Distress signal only","Pilot on board","Man overboard"],correct:0,expl:"Flag B (Bravo) = solid red flag. In ICS: 'I am loading/unloading/carrying dangerous goods'. But also: in international military navy = pennant meaning 'Bravo' (well done) awarded to meritorious crews. In yacht racing and nautical competition: may indicate a recall is in effect (flag B). Multiple uses depending on context."},
    {q:"How are flags ordered in a signal group?",opts:["In alphabetical order","The highest flag represents the most important letter — flags are read top to bottom","By color","By size"],correct:1,expl:"Reading order of flags: ALWAYS TOP to BOTTOM. Highest flag on halyard = first letter of group. Flag groups can have 1 to 4 letters (or combinations). Single flag = simple signal. Two flags = 2-letter group (e.g. NC = distress). Three flags = 3-letter group. Answer/decimal pennant = 'I have understood' signal when recipient hoists this pennant."},
    {q:"What is flag 'Yankee' (Y)?",opts:["I wish to communicate","I am dragging my anchor — drifting despite anchors","I am disabled","I require assistance"],correct:1,expl:"Flag Y (Yankee) = red and yellow (vertical stripes). Meaning: 'I am dragging my anchor — drifting'. Important signal for neighboring vessels who must beware of a vessel drifting with dragging anchor. Different from M (Mike) = 'I am stopped with no way on'. Y = anchor but vessel drifting. Common use in crowded anchorages during bad weather."},
    {q:"What does hoisting flag 'Papa' (P) in port before departure mean?",opts:["Pilot on board","In harbor = all hands aboard — imminent departure (the Blue Peter)","Dangerous goods","Request for pilot"],correct:1,expl:"Flag P (Papa) = blue square with white rectangle. In PORT before departure: 'All persons aboard — departure imminent'. Used by shipowners to recall all crew members. Nicknamed 'the Blue Peter' in English. AT SEA: 'My nets have caught on an obstruction'. Two completely different uses depending on context (port vs sea)."},
    {q:"What is 'free pratique' granted after flag Q?",opts:["A reduced customs tariff","Official authorization from sanitary authorities allowing vessel to communicate with port, embark/disembark persons and goods","A right of passage","A tax exemption"],correct:1,expl:"Free Pratique = official authorization issued by port sanitary authorities after sanitary inspection. Means: vessel is authorized to freely communicate with shore, to disembark/embark persons and goods. BEFORE free pratique: no contact authorized (theoretically). Flag Q = 'I am healthy, requesting free pratique'. Lowered when authorization is granted."},
    {q:"What flag does a competition vessel hoist to signal a general recall?",opts:["Flag A","Flag B","Flags N and C combined","Different flags depending on the series"],correct:0,expl:"In yacht racing (ISAF/World Sailing rules): Flag A = individual recall (one boat made a premature start). Flag B = special signal (used differently by series). Flag N = general recall (entire fleet must return). Flag Y = obligation to wear life jacket. These uses are DIFFERENT from professional navigation signals but the flags are the same."},
    {q:"What is the 'Foxtrot' (F) signal?",opts:["I am on fire","I am disabled — please communicate with me","I require a pilot","I am stopped"],correct:1,expl:"Flag F (Foxtrot) = white with central red square. Meaning: 'I am disabled and/or cannot maneuver freely — communicate with me'. Communication call signal for a vessel in difficulty but not in immediate sinking danger. Usually accompanied by VHF 16 contact attempt. Different from NC (distress) as the vessel is not yet in life danger."},
    {q:"How to identify a vessel carrying a courtesy flag?",opts:["It hoists its national flag at stern and the visited country's flag at foremast head or courtesy halyard","It hoists only its national flag","It hoists flag Q at stern","It hoists all Signal Code flags"],correct:0,expl:"Courtesy flag = international convention: hoist the national flag of the country visited as a sign of respect. Position: foremast head (sailing vessel) or courtesy halyard to starboard (motor vessels). Vessel's national flag remains at stern. In France: legal obligation to hoist the French flag at stern. Foreign vessels do the same hoisting their national flag + France's flag in its waters."},
    {q:"What is the 'Kilo' (K) signal?",opts:["I am stopped","I wish to communicate with you — please respond","I am altering to port","Tug required"],correct:1,expl:"Flag K (Kilo) = left half yellow, right half blue. Meaning: 'I wish to communicate with you'. Communication invitation signal. Used for: requesting VHF radio response, indicating desire to establish contact, general information request. In Morse: —·— . Expected response: VHF channel 16 or 'Answer/Decimal' pennant hoisted to indicate 'message received and understood'."},
    {q:"What is the role of flag 'Charlie' (C) used alone?",opts:["I am heading into danger","Meaning: YES or AFFIRMATIVE — positive response to a question from another vessel","I must stop","I wish to communicate"],correct:1,expl:"Flag C (Charlie) = 3 horizontal blue stripes on alternating white background. Used alone = YES (affirmative). Opposite of flag N (November) = NO (negative). Used in combination NC = distress signal (completely different meaning). Usage examples: positive response to assistance request, confirmation of received message, agreement to asked question. Possible confusion with NC (distress) is a reason to be vigilant."},
    {q:"What does flag 'Uniform' (U) mean?",opts:["I am approaching a pilot","You are standing into danger — immediate warning","I require medical assistance","I am disabled"],correct:1,expl:"Flag U (Uniform) = two red diagonal squares on white background (diamond). Meaning: 'You are standing into danger'. WARNING signal to another vessel. Used to alert a vessel about: imminent danger (rock, wreck, net), dangerous zone, imminent collision. Urgent and direct. Must be accompanied by sound signals (5 short blasts) and if possible VHF 16 radio."},
  ],
  es:[
    {q:"¿Qué es el 'Código Internacional de Señales' (CIS)?",opts:["Un código de navegación","Sistema internacional estandarizado de comunicación por banderas, señales luminosas y sonoras — publicado por la OMI — permite a buques de distintas nacionalidades comunicarse","Un código aduanero","Un código de conducta marítima"],correct:1,expl:"Código Internacional de Señales (CIS) = publicado y mantenido por la OMI (desde 1969). Cubre: banderas alfabéticas A-Z + numéricas + sustitutas, señales sonoras, señales luminosas morse. Permite la comunicación internacional entre buques de distintas nacionalidades sin conocimiento lingüístico común."},
    {q:"¿Cuántas banderas contiene el alfabeto del Código Internacional de Señales?",opts:["24","26 letras + 10 dígitos + 3 banderas sustitutos","Solo 26","40"],correct:1,expl:"CIS = 26 banderas alfabéticas (A-Z) + 10 banderas numéricas (0-9) + 3 banderas SUSTITUTOS (o repetidoras) + banderín de respuesta/decimal. Los 3 sustitutos permiten repetir una letra en un grupo sin necesitar duplicar la bandera. Ejemplo: 'AA' = bandera A + primer sustituto. Total en un juego completo: aproximadamente 40 banderas diferentes."},
    {q:"¿Qué son las 'banderas sustitutos' en el Código Internacional de Señales?",opts:["Banderas de repuesto","Banderas que permiten repetir una letra en un grupo de señales sin necesitar dos ejemplares de la misma bandera — 1º, 2º, 3er sustituto","Banderas defectuosas","Banderas temporales"],correct:1,expl:"Banderas sustitutos (repetidoras) = 3 banderas especiales que permiten repetir letras. 1er sustituto = repite la 1ª letra del grupo anterior. 2º sustituto = repite la 2ª letra. 3er sustituto = repite la 3ª letra. Ejemplo: grupo 'AA' = bandera A + 1er sustituto. Permite economizar en el número de banderas a bordo."},
    {q:"¿Cuál es el significado de la bandera L (Lima)?",opts:["Necesito un práctico","¡Detenga su buque inmediatamente!","Estoy parado","Hombre al agua"],correct:1,expl:"Bandera L (Lima) = amarilla con cuadrado negro. Significado: 'Detenga su buque inmediatamente'. Señal de orden directo a otro buque. Utilizada por: buques de control (guardacostas), autoridades portuarias, en situaciones en que un buque debe detenerse urgentemente."},
    {q:"¿Qué es la bandera 'Bravo' (B) y su significado fuera del Código de Señales?",opts:["Cargamento peligroso (Código de Señales), pero también usado como banderín de competición en regatas","Solo señal de socorro","Práctico a bordo","Hombre al agua"],correct:0,expl:"Bandera B (Bravo) = bandera roja sólida. En el CIS: 'Estoy cargando/descargando/transportando materias peligrosas'. También: en la marina militar internacional = banderín que significa 'Bravo' (bien hecho). En regata: puede indicar que hay un recuerdo en vigor."},
    {q:"¿Cómo se ordenan las banderas en un grupo de señales?",opts:["En orden alfabético","La bandera más alta representa la letra más importante — las banderas se leen de arriba a abajo","Por color","Por tamaño"],correct:1,expl:"Orden de lectura de las banderas: SIEMPRE DE ARRIBA ABAJO. La bandera más alta en la driza = primera letra del grupo. Los grupos pueden tener 1 a 4 letras. Una sola bandera = señal simple. Dos banderas = grupo de 2 letras (ej: NC = socorro). El banderín de respuesta/decimal = 'he comprendido'."},
    {q:"¿Qué es la bandera 'Yankee' (Y)?",opts:["Deseo comunicar","Estoy garrando — a la deriva a pesar de las anclas","Estoy averiado","Necesito asistencia"],correct:1,expl:"Bandera Y (Yankee) = roja y amarilla (franjas verticales). Significado: 'Estoy garrando — derivando'. Señal importante para los buques vecinos que deben tener cuidado con un buque que deriva con el ancla arrastrando. Uso habitual en fondeaderos concurridos durante mal tiempo."},
    {q:"¿Qué significa izar la bandera 'Papa' (P) en puerto antes de partir?",opts:["Práctico a bordo","En puerto = toda la tripulación a bordo — partida inminente (el Blue Peter)","Materias peligrosas","Solicitud de práctico"],correct:1,expl:"Bandera P (Papa) = cuadrado azul con rectángulo blanco. En PUERTO antes de partir: 'Toda la tripulación a bordo — partida inminente'. Utilizada por los armadores para llamar a todos los tripulantes. Apodada 'el Blue Peter' en inglés. EN EL MAR: 'Mis redes se han enganchado en un obstáculo'. Dos usos completamente diferentes según el contexto."},
    {q:"¿Qué es la 'libre plática' concedida después de la bandera Q?",opts:["Un arancel aduanero reducido","Autorización oficial de las autoridades sanitarias que permite al buque comunicarse con el puerto, embarcar/desembarcar personas y mercancías","Un derecho de paso","Una exención fiscal"],correct:1,expl:"Libre plática = autorización oficial de las autoridades sanitarias del puerto de entrada. Significa: el buque puede comunicarse libremente con tierra, desembarcar/embarcar personas y mercancías. ANTES de la libre plática: no se autoriza ningún contacto (teóricamente). Bandera Q = 'estoy sano, solicito libre plática'. Arriada cuando se concede la autorización."},
    {q:"¿Qué bandera iza un buque de competición para señalar un recuerdo general?",opts:["Bandera A","Bandera B","Banderas N y C combinadas","Diferentes banderas según la serie"],correct:0,expl:"En competición náutica (reglas ISAF/World Sailing): Bandera A = recuerdo individual. Bandera B = señal especial. Bandera N = recuerdo general (toda la flota debe regresar). Bandera Y = obligación de llevar chaleco salvavidas. Estos usos son DIFERENTES de las señales de navegación profesional pero las banderas son las mismas."},
    {q:"¿Cuál es la señal 'Foxtrot' (F)?",opts:["Estoy en llamas","Estoy averiado — comuníquese conmigo","Necesito un práctico","Estoy parado"],correct:1,expl:"Bandera F (Foxtrot) = blanca con cuadrado rojo central. Significado: 'Estoy averiado y/o no puedo maniobrar libremente — comuníquese conmigo'. Señal de llamada de comunicación para un buque en dificultades pero no en peligro de hundimiento inmediato."},
    {q:"¿Cómo identificar un buque que porta una bandera de cortesía?",opts:["Iza su pabellón nacional a popa y la bandera del país visitado en el tope del palo de mesana o en la driza de cortesía","Solo iza su pabellón nacional","Iza la bandera Q a popa","Iza todas las banderas del Código"],correct:0,expl:"Bandera de cortesía = convención internacional: izar la bandera nacional del país visitado como señal de respeto. Posición: tope del palo de mesana (velero) o driza de cortesía a estribor. El pabellón nacional del buque permanece a popa."},
    {q:"¿Cuál es la señal 'Kilo' (K)?",opts:["Estoy parado","Deseo comunicarme con usted — por favor responda","Viro a babor","Remolcador necesario"],correct:1,expl:"Bandera K (Kilo) = mitad izquierda amarilla, mitad derecha azul. Significado: 'Deseo comunicarme con usted'. Señal de invitación a la comunicación. En morse: —·—. Respuesta esperada: VHF canal 16 o banderín de respuesta/decimal izado para indicar 'mensaje recibido y comprendido'."},
    {q:"¿Cuál es el papel de la bandera 'Charlie' (C) usada sola?",opts:["Me dirijo hacia el peligro","Significado: SÍ o AFIRMATIVO — respuesta positiva a una pregunta de otro buque","Debo parar","Deseo comunicarme"],correct:1,expl:"Bandera C (Charlie) = 3 franjas horizontales azules sobre fondo blanco alternado. Usada sola = SÍ (afirmativo). Opuesto a la bandera N (November) = NO. En combinación NC = señal de socorro (significado completamente diferente). La posible confusión con NC (socorro) es razón para ser vigilante."},
    {q:"¿Qué significa la bandera 'Uniform' (U)?",opts:["Me aproximo a un práctico","Está yendo hacia el peligro — aviso inmediato","Necesito asistencia médica","Estoy averiado"],correct:1,expl:"Bandera U (Uniform) = dos cuadrados rojos en diagonal sobre fondo blanco (rombo). Significado: 'Está yendo hacia el peligro'. Señal de AVISO a otro buque. Utilizada para alertar de: peligro inminente (roca, naufragio, red), zona peligrosa, abordaje inminente. Urgente y directo. Debe ir acompañada de señales sonoras (5 sonidos cortos) y si es posible VHF 16."},
  ],
  pt:[
    {q:"O que é o 'Código Internacional de Sinais' (CIS)?",opts:["Um código de navegação","Sistema internacional normalizado de comunicação por bandeiras, sinais luminosos e sonoros — publicado pela IMO — permite a navios de diferentes nacionalidades comunicar","Um código aduaneiro","Um código de conduta marítima"],correct:1,expl:"Código Internacional de Sinais (CIS) = publicado e mantido pela IMO (desde 1969). Cobre: bandeiras alfabéticas A-Z + numéricas + substitutas, sinais sonoros, sinais luminosos morse. Permite a comunicação internacional entre navios de diferentes nacionalidades sem conhecimento linguístico comum."},
    {q:"Quantas bandeiras contém o alfabeto do Código Internacional de Sinais?",opts:["24","26 letras + 10 dígitos + 3 bandeiras substitutas","Apenas 26","40"],correct:1,expl:"CIS = 26 bandeiras alfabéticas (A-Z) + 10 bandeiras numéricas (0-9) + 3 bandeiras SUBSTITUTAS (ou repetidoras) + flâmula de resposta/decimal. As 3 substitutas permitem repetir uma letra num grupo sem necessitar duplicar a bandeira. Exemplo: 'AA' = bandeira A + 1ª substituta. Total num jogo completo: aproximadamente 40 bandeiras diferentes."},
    {q:"O que são as 'bandeiras substitutas' no Código Internacional de Sinais?",opts:["Bandeiras sobresselentes","Bandeiras que permitem repetir uma letra num grupo de sinais sem necessitar dois exemplares da mesma bandeira — 1ª, 2ª, 3ª substituta","Bandeiras defeituosas","Bandeiras temporárias"],correct:1,expl:"Bandeiras substitutas (repetidoras) = 3 bandeiras especiais que permitem repetir letras. 1ª substituta = repete a 1ª letra do grupo anterior. 2ª substituta = repete a 2ª letra. 3ª substituta = repete a 3ª letra. Exemplo: grupo 'AA' = bandeira A + 1ª substituta. Permite economizar no número de bandeiras a bordo."},
    {q:"Qual é o significado da bandeira L (Lima)?",opts:["Preciso de um prático","Pare o seu navio imediatamente!","Estou parado","Homem ao mar"],correct:1,expl:"Bandeira L (Lima) = amarela com quadrado preto. Significado: 'Pare o seu navio imediatamente'. Sinal de ordem direta a outro navio. Usada por: navios de controlo (guardas costeiros), autoridades portuárias, em situações em que um navio deve parar urgentemente."},
    {q:"O que é a bandeira 'Bravo' (B) e o seu significado fora do Código de Sinais?",opts:["Carga perigosa (Código de Sinais), mas também usada como flâmula de competição em regatas","Sinal de socorro apenas","Prático a bordo","Homem ao mar"],correct:0,expl:"Bandeira B (Bravo) = bandeira vermelha sólida. No CIS: 'Estou a carregar/descarregar/transportar materiais perigosos'. Também: na marinha militar internacional = flâmula significando 'Bravo' (bem feito). Em regata: pode indicar que há um regresso em vigor."},
    {q:"Como são ordenadas as bandeiras num grupo de sinais?",opts:["Em ordem alfabética","A bandeira mais alta representa a letra mais importante — as bandeiras leem-se de cima para baixo","Por cor","Por tamanho"],correct:1,expl:"Ordem de leitura das bandeiras: SEMPRE DE CIMA PARA BAIXO. A bandeira mais alta na adriça = primeira letra do grupo. Os grupos podem ter 1 a 4 letras. Uma única bandeira = sinal simples. Duas bandeiras = grupo de 2 letras (ex: NC = perigo). A flâmula de resposta/decimal = 'compreendi'."},
    {q:"O que é a bandeira 'Yankee' (Y)?",opts:["Desejo comunicar","Estou a garrear — a derivar apesar das âncoras","Estou avariado","Preciso de assistência"],correct:1,expl:"Bandeira Y (Yankee) = vermelha e amarela (franjas verticais). Significado: 'Estou a garrear — a derivar'. Sinal importante para navios vizinhos que devem ter cuidado com um navio a derivar com a âncora a arrastar. Uso comum em fundeadouros movimentados durante mau tempo."},
    {q:"O que significa içar a bandeira 'Papa' (P) no porto antes da partida?",opts:["Prático a bordo","No porto = toda a tripulação a bordo — partida iminente (o Blue Peter)","Materiais perigosos","Pedido de prático"],correct:1,expl:"Bandeira P (Papa) = quadrado azul com retângulo branco. No PORTO antes de partir: 'Toda a tripulação a bordo — partida iminente'. Usada pelos armadores para chamar todos os tripulantes. Apelidada de 'o Blue Peter' em inglês. NO MAR: 'As minhas redes ficaram presas num obstáculo'. Dois usos completamente diferentes consoante o contexto."},
    {q:"O que é a 'livre prática' concedida após a bandeira Q?",opts:["Um direito aduaneiro reduzido","Autorização oficial das autoridades sanitárias permitindo ao navio comunicar com o porto, embarcar/desembarcar pessoas e mercadorias","Um direito de passagem","Uma isenção fiscal"],correct:1,expl:"Livre prática = autorização oficial das autoridades sanitárias do porto de entrada. Significa: o navio pode comunicar livremente com terra, desembarcar/embarcar pessoas e mercadorias. ANTES da livre prática: nenhum contacto autorizado (teoricamente). Bandeira Q = 'estou são, solicito livre prática'. Arriada quando a autorização é concedida."},
    {q:"Que bandeira içar um navio de competição para sinalizar um regresso geral?",opts:["Bandeira A","Bandeira B","Bandeiras N e C combinadas","Bandeiras diferentes consoante a série"],correct:0,expl:"Em competição náutica (regras ISAF/World Sailing): Bandeira A = regresso individual. Bandeira B = sinal especial. Bandeira N = regresso geral (toda a frota deve regressar). Bandeira Y = obrigação de usar colete salva-vidas. Estes usos são DIFERENTES dos sinais de navegação profissional mas as bandeiras são as mesmas."},
    {q:"Qual é o sinal 'Foxtrot' (F)?",opts:["Estou em chamas","Estou avariado — por favor comunique comigo","Preciso de um prático","Estou parado"],correct:1,expl:"Bandeira F (Foxtrot) = branca com quadrado vermelho central. Significado: 'Estou avariado e/ou não posso manobrar livremente — comunique comigo'. Sinal de chamada de comunicação para um navio em dificuldades mas não em perigo de naufrágio imediato."},
    {q:"Como identificar um navio que porta uma bandeira de cortesia?",opts:["Içar a sua bandeira nacional a popa e a bandeira do país visitado no topo do mastro de mezena ou na adriça de cortesia","Içar apenas a sua bandeira nacional","Içar a bandeira Q a popa","Içar todas as bandeiras do Código"],correct:0,expl:"Bandeira de cortesia = convenção internacional: içar a bandeira nacional do país visitado como sinal de respeito. Posição: topo do mastro de mezena (veleiro) ou adriça de cortesia a estibordo. A bandeira nacional do navio permanece a popa."},
    {q:"Qual é o sinal 'Kilo' (K)?",opts:["Estou parado","Desejo comunicar consigo — por favor responda","Estou a virar para bombordo","Rebocador necessário"],correct:1,expl:"Bandeira K (Kilo) = metade esquerda amarela, metade direita azul. Significado: 'Desejo comunicar consigo'. Sinal de convite à comunicação. Em morse: —·—. Resposta esperada: VHF canal 16 ou flâmula de resposta/decimal içada para indicar 'mensagem recebida e compreendida'."},
    {q:"Qual é o papel da bandeira 'Charlie' (C) usada sozinha?",opts:["Dirijo-me para o perigo","Significado: SIM ou AFIRMATIVO — resposta positiva a uma pergunta de outro navio","Devo parar","Desejo comunicar"],correct:1,expl:"Bandeira C (Charlie) = 3 faixas horizontais azuis em fundo branco alternado. Usada sozinha = SIM (afirmativo). Oposto da bandeira N (November) = NÃO. Em combinação NC = sinal de perigo (significado completamente diferente). A possível confusão com NC (perigo) é razão para ser vigilante."},
    {q:"O que significa a bandeira 'Uniform' (U)?",opts:["Estou a aproximar-me de um prático","Está a dirigir-se para o perigo — aviso imediato","Preciso de assistência médica","Estou avariado"],correct:1,expl:"Bandeira U (Uniform) = dois quadrados vermelhos na diagonal em fundo branco (losango). Significado: 'Está a dirigir-se para o perigo'. Sinal de AVISO a outro navio. Usada para alertar sobre: perigo iminente (rocha, naufrágio, rede), zona perigosa, abalroamento iminente. Urgente e direto. Deve ser acompanhada de sinais sonoros (5 sons curtos) e se possível VHF 16."},
  ],
};

function QuestionBank({ lang, onComplete }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else {setDone(true);if(onComplete)onComplete();}};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,margin:"8px 0 4px"}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
    <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.purple},${C.gold2})`}}/></div>
    <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
      {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
    </div>
    {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
    <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.purple},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
  </div>);
}

function Stars(){const [s,setS]=useState<{x:number;y:number;sz:number;dur:number;delay:number}[]>([]);useEffect(()=>{setS(Array.from({length:14},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6})));},[]);return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.purple}33,${C.gold2}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.purple}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.purple,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.purple:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.purple},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d={
    fr:{
      badge:"🚩 Signalisation & Balisage · Leçon 4/7 · ⭐ Premium · 200 XP",
      title:"Pavillons & Communication Maritime",
      intro:"Un pavillon hissé en mer vaut mille mots. Le Code International des Signaux permet à des navires de toutes nationalités de communiquer sans se parler. Chaque lettre, chaque couleur, chaque combinaison a un sens précis.\n\nCette leçon couvre l'alphabet phonétique, les pavillons d'urgence, les combinaisons critiques et les situations pratiques.",
      p1:"PARTIE 1 — ALPHABET PHONÉTIQUE & CODE INTERNATIONAL",s1t:"A Alpha · B Bravo · ... · Z Zulu — 26 pavillons",
      s1:"CODE INTERNATIONAL DES SIGNAUX (CIS) :\nPublié par l'OMI · En vigueur depuis 1969\nUtilisé pour communiquer entre navires\nde nationalités différentes\n\n26 PAVILLONS ALPHABÉTIQUES A-Z\n+ 10 numériques + 3 substituts\n\nCHAQUE PAVILLON PEUT SIGNIFIER :\n→ Une lettre (alphabet phonétique)\n→ Un message complet (pavillon seul)\n→ Partie d'un groupe (combinaison)\n\nEXEMPLES PAVILLONS SEULS :\nA = Plongeur · B = Matières dangereuses\nG = Pilote requis · O = MOB · Q = Quarantaine",
      p2:"PARTIE 2 — PAVILLONS D'URGENCE CRITIQUES",s2t:"A·B·G·H·O·Q·V·W — 8 pavillons à connaître absolument",
      s2:"PAVILLONS D'URGENCE PRIORITAIRES :\n\nA (Alpha) = PLONGEUR en immersion\nPassez lentement et à distance !\n\nB (Bravo) = MATIÈRES DANGEREUSES\nGarder distance et éviter feu nu\n\nG (Golf) = Je désire un PILOTE\n→ H (Hotel) = Pilote À BORD\n\nO (Oscar) = HOMME À LA MER !\nSignal d'urgence critique\n\nQ (Quebec) = QUARANTAINE / libre pratique\nJaune uni = demande d'entrée en port étranger\n\nV (Victor) = J'ai besoin d'ASSISTANCE\nW (Whiskey) = Besoin d'assistance MÉDICALE",
      p3:"PARTIE 3 — COMBINAISONS CRITIQUES",s2t:"NC·CB·AN·QL·GW — Groupes de 2 pavillons",
      s3:"COMBINAISONS IMPORTANTES :\n\nNC = SIGNAL DE DÉTRESSE\n(= MAYDAY en pavillons · international)\n\nCB = Je demande du secours\n\nAN = Y a-t-il un médecin à bord ?\n\nQL = Quarantaine STRICTE\n(navire infecté · ne pas approcher)\n\nGW = Besoin médecin + pilote\n(double urgence médicale et port)\n\nC = OUI · N = NON\n(réponses simples à des questions)",
      p4:"PARTIE 4 — QUIZ IDENTIFICATION PAVILLONS",s2t:"5 questions pratiques",
      s4:"MÉTHODE D'IDENTIFICATION :\n\n1. Couleur dominante ?\n   Jaune = Q (quarantaine) / G (pilote)\n   Rouge = B (danger) / H (pilote bord)\n   Rouge+Jaune = O (MOB) / autre\n\n2. Forme distinctive ?\n   Queue d'aronde = A (plongeur)\n   Rayures = G · Y · T...\n   Carré centré = F · P · S\n\n3. Message = pavillon seul ou groupe ?",
      p5:"🎯 EXERCICES AVANCÉS PREMIUM",p6:"🤿 CAS RÉEL — PLONGEURS",p7:"📝 BANQUE 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — PAVILLONS & COMMUNICATION L4",
      sumP:["CIS = 26 lettres + 10 chiffres + 3 substituts · publié OMI 1969","A = plongeur (passer lentement) · B = matières dangereuses","G = pilote requis · H = pilote à bord · Q = quarantaine (jaune)","O (Oscar) = Homme à la mer ! · V = assistance · W = médical","NC = DÉTRESSE (= MAYDAY pavillons) · AN = médecin à bord ?","CB = secours · QL = quarantaine stricte · GW = médecin+pilote","Pavillon de courtoisie = drapeau pays visité au mât de misaine","Incident Puffin 2019 : pavillon A absent → plongeur blessé"],
      learnedP:["Alphabet A-Z : 26 pavillons avec significations","8 pavillons urgence : A·B·G·H·O·Q·V·W","Combinaisons critiques : NC·CB·AN·QL·GW","Méthode identification : couleur + forme + contexte","Pavillon A (Alpha) = obligation légale dès plongeur à l'eau"],
    },
    en:{
      badge:"🚩 Signaling & Buoyage · Lesson 4/7 · ⭐ Premium · 200 XP",
      title:"Maritime Flags & Communication",
      intro:"A flag hoisted at sea is worth a thousand words. The International Code of Signals allows vessels of all nationalities to communicate without speaking. Every letter, every color, every combination has a precise meaning.",
      p1:"PART 1 — PHONETIC ALPHABET & INTERNATIONAL CODE",s1t:"A Alpha · B Bravo · ... · Z Zulu — 26 flags",
      s1:"INTERNATIONAL CODE OF SIGNALS (ICS):\nPublished by IMO · In force since 1969\nUsed to communicate between vessels\nof different nationalities\n\n26 ALPHABETICAL FLAGS A-Z\n+ 10 numeric + 3 substitutes\n\nEACH FLAG CAN MEAN:\n→ A letter (phonetic alphabet)\n→ A complete message (single flag)\n→ Part of a group (combination)\n\nSINGLE FLAG EXAMPLES:\nA = Diver · B = Dangerous goods\nG = Pilot required · O = MOB · Q = Quarantine",
      p2:"PART 2 — CRITICAL URGENCY FLAGS",s1t:"A·B·G·H·O·Q·V·W — 8 flags to absolutely know",
      s2:"PRIORITY URGENCY FLAGS:\n\nA (Alpha) = DIVER in water\nPass slowly and at distance!\n\nB (Bravo) = DANGEROUS GOODS\nKeep distance and avoid naked flames\n\nG (Golf) = I require a PILOT\n→ H (Hotel) = Pilot ON BOARD\n\nO (Oscar) = MAN OVERBOARD!\nCritical urgency signal\n\nQ (Quebec) = QUARANTINE / free pratique\nSolid yellow = request to enter foreign port\n\nV (Victor) = I require ASSISTANCE\nW (Whiskey) = MEDICAL assistance needed",
      p3:"PART 3 — CRITICAL COMBINATIONS",s1t:"NC·CB·AN·QL·GW — 2-flag groups",
      s3:"IMPORTANT COMBINATIONS:\n\nNC = DISTRESS SIGNAL\n(= flag MAYDAY · international)\n\nCB = I request rescue\n\nAN = Is there a doctor on board?\n\nQL = STRICT Quarantine\n(infected vessel · do not approach)\n\nGW = Need doctor + pilot\n(double medical and port urgency)\n\nC = YES · N = NO\n(simple responses to questions)",
      p4:"PART 4 — FLAG IDENTIFICATION QUIZ",s1t:"5 practical questions",
      s4:"IDENTIFICATION METHOD:\n\n1. Dominant color?\n   Yellow = Q (quarantine) / G (pilot)\n   Red = B (danger) / H (pilot aboard)\n   Red+Yellow = O (MOB) / other\n\n2. Distinctive shape?\n   Swallowtail = A (diver)\n   Stripes = G · Y · T...\n   Centered square = F · P · S\n\n3. Message = single flag or group?",
      p5:"🎯 ADVANCED PREMIUM EXERCISES",p6:"🤿 REAL CASE — DIVERS",p7:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY — FLAGS & COMMUNICATION L4",
      sumP:["ICS = 26 letters + 10 digits + 3 substitutes · IMO published 1969","A = diver (pass slowly) · B = dangerous goods","G = pilot required · H = pilot on board · Q = quarantine (yellow)","O (Oscar) = Man overboard! · V = assistance · W = medical","NC = DISTRESS (= flag MAYDAY) · AN = doctor on board?","CB = rescue · QL = strict quarantine · GW = doctor+pilot","Courtesy flag = visited country flag at foremast","Puffin incident 2019: missing flag A → injured diver"],
      learnedP:["Alphabet A-Z: 26 flags with meanings","8 urgency flags: A·B·G·H·O·Q·V·W","Critical combinations: NC·CB·AN·QL·GW","Identification method: color + shape + context","Flag A (Alpha) = legal obligation when diver in water"],
    },
    es:{
      badge:"🚩 Señalización y Balizamiento · Lección 4/7 · ⭐ Premium · 200 XP",
      title:"Banderas y Comunicación Marítima",
      intro:"Una bandera izada en el mar vale más que mil palabras. El Código Internacional de Señales permite a buques de todas las nacionalidades comunicarse sin hablarse.",
      p1:"PARTE 1 — ALFABETO FONÉTICO Y CÓDIGO INTERNACIONAL",s1t:"A Alfa · B Bravo · ... · Z Zulú — 26 banderas",
      s1:"CIS: 26 banderas A-Z + 10 numéricas + 3 sustitutos\nPublicado por OMI desde 1969\nA = Buceador · B = Mat. peligrosas · G = Práctico\nO = MOB · Q = Cuarentena",
      p2:"PARTE 2 — BANDERAS DE URGENCIA CRÍTICAS",s1t:"A·B·G·H·O·Q·V·W",
      s2:"A = BUCEADOR sumergido · pasar despacio!\nB = MATERIAS PELIGROSAS\nG = Práctico requerido · H = Práctico a bordo\nO = ¡HOMBRE AL AGUA!\nQ = CUARENTENA (amarillo) · libre plática\nV = ASISTENCIA · W = Asistencia MÉDICA",
      p3:"PARTE 3 — COMBINACIONES CRÍTICAS",s1t:"NC·CB·AN·QL·GW",
      s3:"NC = SEÑAL DE SOCORRO (= MAYDAY banderas)\nCB = Solicito socorro\nAN = ¿Hay médico a bordo?\nQL = Cuarentena ESTRICTA\nGW = Médico + práctico (doble urgencia)\nC = SÍ · N = NO",
      p4:"PARTE 4 — QUIZ IDENTIFICACIÓN BANDERAS",s1t:"5 preguntas prácticas",
      s4:"MÉTODO: Amarillo=Q/G · Rojo=B/H · Rojo+Amarillo=O\nCola de golondrina=A · Franjas=G/Y · Cuadrado central=F/P",
      p5:"🎯 EJERCICIOS AVANZADOS PREMIUM",p6:"🤿 CASO REAL — BUZOS",p7:"📝 BANCO 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — BANDERAS Y COMUNICACIÓN L4",
      sumP:["CIS = 26 letras + 10 dígitos + 3 sustitutos · publicado OMI 1969","A = buceador (pasar despacio) · B = materias peligrosas","G = práctico requerido · H = práctico a bordo · Q = cuarentena","O (Oscar) = ¡Hombre al agua! · V = asistencia · W = médico","NC = SOCORRO (= MAYDAY banderas) · AN = ¿médico a bordo?","CB = socorro · QL = cuarentena estricta · GW = médico+práctico","Bandera de cortesía = bandera del país visitado en el palo","Incidente Puffin 2019: bandera A ausente → buceador herido"],
      learnedP:["Alfabeto A-Z: 26 banderas con significados","8 banderas urgencia: A·B·G·H·O·Q·V·W","Combinaciones críticas: NC·CB·AN·QL·GW","Método de identificación: color + forma + contexto","Bandera A (Alpha) = obligación legal cuando hay buceador"],
    },
    pt:{
      badge:"🚩 Sinalização e Balizagem · Lição 4/7 · ⭐ Premium · 200 XP",
      title:"Bandeiras e Comunicação Marítima",
      intro:"Uma bandeira içada no mar vale mil palavras. O Código Internacional de Sinais permite a navios de todas as nacionalidades comunicar sem falar.",
      p1:"PARTE 1 — ALFABETO FONÉTICO E CÓDIGO INTERNACIONAL",s1t:"A Alfa · B Bravo · ... · Z Zulu — 26 bandeiras",
      s1:"CIS: 26 bandeiras A-Z + 10 numéricas + 3 substitutas\nPublicado pela IMO desde 1969\nA = Mergulhador · B = Mat. perigosos · G = Prático\nO = MOB · Q = Quarentena",
      p2:"PARTE 2 — BANDEIRAS DE URGÊNCIA CRÍTICAS",s1t:"A·B·G·H·O·Q·V·W",
      s2:"A = MERGULHADOR submerso · passe devagar!\nB = MATERIAIS PERIGOSOS\nG = Prático necessário · H = Prático a bordo\nO = HOMEM AO MAR!\nQ = QUARENTENA (amarelo) · livre prática\nV = ASSISTÊNCIA · W = Assistência MÉDICA",
      p3:"PARTE 3 — COMBINAÇÕES CRÍTICAS",s1t:"NC·CB·AN·QL·GW",
      s3:"NC = SINAL DE PERIGO (= MAYDAY bandeiras)\nCB = Solicito socorro\nAN = Há médico a bordo?\nQL = Quarentena ESTRITA\nGW = Médico + prático (dupla urgência)\nC = SIM · N = NÃO",
      p4:"PARTE 4 — QUIZ IDENTIFICAÇÃO BANDEIRAS",s1t:"5 perguntas práticas",
      s4:"MÉTODO: Amarelo=Q/G · Vermelho=B/H · Vermelho+Amarelo=O\nCalda de andorinha=A · Franjas=G/Y · Quadrado central=F/P",
      p5:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p6:"🤿 CASO REAL — MERGULHADORES",p7:"📝 BANCO 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — BANDEIRAS E COMUNICAÇÃO L4",
      sumP:["CIS = 26 letras + 10 dígitos + 3 substitutas · publicado IMO 1969","A = mergulhador (passe devagar) · B = materiais perigosos","G = prático necessário · H = prático a bordo · Q = quarentena","O (Oscar) = Homem ao mar! · V = assistência · W = médico","NC = PERIGO (= MAYDAY bandeiras) · AN = médico a bordo?","CB = socorro · QL = quarentena estrita · GW = médico+prático","Bandeira de cortesia = bandeira do país visitado no mastro","Incidente Puffin 2019: bandeira A ausente → mergulhador ferido"],
      learnedP:["Alfabeto A-Z: 26 bandeiras com significados","8 bandeiras urgência: A·B·G·H·O·Q·V·W","Combinações críticas: NC·CB·AN·QL·GW","Método de identificação: cor + forma + contexto","Bandeira A (Alpha) = obrigação legal quando há mergulhador na água"],
    },
  };
  return d[lang]||d.fr;
};

export default function LessonFlags({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, onQuizScored=(score:number,maxScore:number)=>{} }) {
  const t=T[lang]||T.fr;const quiz=QUIZ[lang]||QUIZ.fr;const lc=getContent(lang);
  const [phase, setPhase] = useState("content");
  const [bankDone, setBankDone] = useState(false);const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#0a0408 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.purple}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.purple,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🚩 {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 4/7":lang==="en"?"Lesson 4/7":lang==="es"?"Lección 4/7":"Lição 4/7"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.purple,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.purple},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(142,68,173,0.15)",border:`1px solid ${C.purple}44`,fontSize:11,color:C.purple,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.purple}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>
            <SL icon="🔤" text={lc.p1} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}33`}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔤 {lang==="fr"?"ALPHABET A-Z — PAVILLONS INTERACTIFS":lang==="en"?"ALPHABET A-Z — INTERACTIVE FLAGS":lang==="es"?"ALFABETO A-Z — BANDERAS INTERACTIVAS":"ALFABETO A-Z — BANDEIRAS INTERATIVAS"}</div>
              <AlphabetFlagsSVG lang={lang}/>
            </Card>
            <SL icon="🚨" text={lc.p2} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}33`}}>
              <div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🚨 {lang==="fr"?"PAVILLONS D'URGENCE — INTERACTIF":lang==="en"?"URGENCY FLAGS — INTERACTIVE":lang==="es"?"BANDERAS DE URGENCIA — INTERACTIVO":"BANDEIRAS DE URGÊNCIA — INTERATIVO"}</div>
              <UrgencyFlagsSVG lang={lang}/>
            </Card>
            <SL icon="🔗" text={lc.p3} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔗 {lang==="fr"?"COMBINAISONS CRITIQUES":lang==="en"?"CRITICAL COMBINATIONS":lang==="es"?"COMBINACIONES CRÍTICAS":"COMBINAÇÕES CRÍTICAS"}</div>
              <TwoFlagCombinationsSVG lang={lang}/>
            </Card>
            <SL icon="🎯" text={lc.p4} color={C.purple}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}33`}}>
              <div style={{fontSize:11,color:C.purple,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🎯 {lang==="fr"?"QUIZ IDENTIFICATION PAVILLONS":lang==="en"?"FLAG IDENTIFICATION QUIZ":lang==="es"?"QUIZ IDENTIFICACIÓN BANDERAS":"QUIZ IDENTIFICAÇÃO BANDEIRAS"}</div>
              <FlagQuizSVG lang={lang}/>
            </Card>
            <SL icon="📝" text={lang==="fr"?"EXERCICES AVANCÉS":lang==="en"?"ADVANCED EXERCISES":lang==="es"?"EJERCICIOS AVANZADOS":"EXERCÍCIOS AVANÇADOS"} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>
            <SL icon="🤿" text={lc.p6} color={C.blue2}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>
            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} onComplete={()=>setBankDone(true)}/></Card>
            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.purple}33`}}>
              <div style={{fontSize:11,color:C.purple,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.purple,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.purple},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,boxShadow:"0 10px 36px rgba(142,68,173,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>Quiz — Pavillons & Communication</div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 4":lang==="en"?"Lesson 4":lang==="es"?"Lección 4":"Lição 4"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);onQuizScored(s,quiz.length);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}
          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(142,68,173,0.15)",border:`1px solid ${C.purple}55`,fontSize:14,color:C.purple,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.purple,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.purple},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(142,68,173,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 5 — RADIO VHF →":lang==="en"?"LESSON 5 — VHF RADIO →":lang==="es"?"LECCIÓN 5 — RADIO VHF →":"LIÇÃO 5 — RÁDIO VHF →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
