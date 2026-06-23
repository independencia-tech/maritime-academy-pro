// LessonSEA_L5 — Stability & Buoyancy | PART 1
import { useState } from "react";

const C = {
  water:"#7eb8d4", hull:"#94a3b8", meta:"#e8b94f",
  danger:"#f97316", safe:"#6dbf8a", keel:"#8b7355",
  grav:"#c084fc", buoy:"#38bdf8",
  gold:"#c9922a", gold2:"#e8b94f",
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
};

const T: any = {
  fr: {
    moduleLabel:"SEAMANSHIP", lessonTitle:"Stabilité & Flottabilité",
    intro:"La stabilité est la capacité d'un navire à revenir à sa position d'équilibre après une perturbation (vague, déplacement de cargaison, vent). Comprendre les forces de poussée et de gravité, et savoir interpréter la courbe GZ, est fondamental pour la sécurité maritime.",
    tabs:["📖 Contenu","✏️ Pratique","📚 Banque Q.","🎯 Quiz"],
    s1title:"⚖️ Forces de stabilité — G, B et M",
    s1hint:"👆 Tapez un point pour voir sa définition",
    s2title:"📐 Bras de levier GZ — courbe de stabilité",
    s2hint:"👆 Ajustez la gîte pour voir le bras de levier",
    s3title:"🚢 États de stabilité",
    s3hint:"👆 Tapez un état pour voir les caractéristiques",
    s4title:"⚠️ Facteurs affectant la stabilité",
    s4hint:"👆 Tapez un facteur pour voir son effet",
    keypoints:"Points clés",
    kp:[
      "G (centre de gravité) : point d'application de toutes les masses du navire",
      "B (centre de carène) : centre géométrique du volume immergé",
      "M (métacentre) : point virtuel — si GM > 0, le navire est stable",
      "GZ (bras de levier) : distance horizontale entre G et la verticale de B — mesure la force redressante",
      "Un GM trop faible → navire mou ; un GM trop élevé → navire raide (inconfortable et risqué)",
    ],
    points:{
      G:{ name:"G — Centre de gravité", desc:"Point d'application de la résultante de toutes les forces de gravité agissant sur le navire (poids propre + cargaison + carburant + équipage). Il monte quand on charge en hauteur, descend quand on charge bas. Ne change pas avec la gîte." },
      B:{ name:"B — Centre de carène", desc:"Centre géométrique du volume d'eau déplacé (volume immergé). Il se déplace latéralement quand le navire gîte, car la forme du volume immergé change. C'est ce déplacement qui crée le bras de levier redressant." },
      M:{ name:"M — Métacentre", desc:"Point virtuel situé sur l'axe vertical du navire, à l'intersection de la verticale de la poussée d'Archimède gîtée et de l'axe vertical initial. Si G est en dessous de M (GM positif) → navire stable. Si G dépasse M → navire instable." },
      K:{ name:"K — Quille (keel)", desc:"Point le plus bas du navire, pris comme référence pour les hauteurs. KG = distance de la quille au centre de gravité. KM = distance de la quille au métacentre. GM = KM - KG." },
    },
    states:{
      stable:{ name:"✅ Stabilité positive (GM > 0)", desc:"G est en dessous de M. Quand le navire gîte, le bras de levier GZ crée un couple redressant qui ramène le navire à la verticale. C'est l'état normal et recherché." },
      neutral:{ name:"⚖️ Stabilité neutre (GM = 0)", desc:"G coïncide avec M. Le navire gîté ne tend ni à revenir ni à chavirer — il reste dans sa position inclinée. État dangereux à éviter absolument." },
      unstable:{ name:"❌ Stabilité négative (GM < 0)", desc:"G est au-dessus de M. Le bras de levier crée un couple chavirant — le navire continue à gîter jusqu'au chavirage. Situation d'urgence absolue." },
      stiff:{ name:"⚡ Navire raide (GM très élevé)", desc:"GM très positif. Le navire se redresse très vite avec des mouvements brusques et secs. Inconfortable pour l'équipage et dangereux pour la cargaison et les structures." },
      tender:{ name:"🌊 Navire mou (GM faible positif)", desc:"GM légèrement positif. Le navire gîte lentement et met du temps à se redresser. Peut être dangereux si GM devient négatif suite à un déplacement de cargaison ou à l'embarquement d'eau." },
    },
    factors:{
      loading:{ name:"Chargement en hauteur", desc:"Charger des masses en hauteur (sur pont, containers hauts) élève G et réduit GM. Risque de navire mou ou instable. Solution : lester bas (ballast bas, cargaison lourde en fond de cale)." },
      freesurf:{ name:"Effet de surface libre", desc:"Les liquides dans des citernes partiellement remplies se déplacent lors de la gîte. Ce mouvement élève virtuellement G (G monte de GG' = i×γ/Δ). Remède : remplir ou vider complètement les citernes, cloisonner." },
      icing:{ name:"Givrage (icing)", desc:"La glace qui se forme sur les structures hautes (ponts, mâts, gréement) élève considérablement G. Phénomène critique en eaux arctiques. Remède : éliminer la glace manuellement ou mécaniquement dès que possible." },
      flooding:{ name:"Envahissement d'un compartiment", desc:"L'eau qui envahit un compartiment ajoute du poids en hauteur et crée un effet de surface libre. Double impact négatif sur la stabilité. Réponse : pomper immédiatement, contrebalancer si possible." },
    },
    practiceTitle:"Exercice pratique",
    questions:[
      { q:"Un navire a KG = 7,2 m et KM = 8,5 m. Calculez GM et déterminez si le navire est stable, neutre ou instable. Quelle est la signification pratique de cette valeur ?", a:"GM = KM - KG = 8,5 - 7,2 = 1,3 m. GM positif → le navire est stable (G en dessous de M). Une valeur de 1,3 m est correcte — pas trop raide (GM > 2 m serait inconfortable) ni trop mou (GM < 0,15 m serait dangereux). Le navire reviendra à la verticale après une perturbation." },
      { q:"Expliquez l'effet de surface libre et comment il affecte la valeur de GM. Donnez deux méthodes pour le réduire à bord.", a:"L'effet de surface libre se produit quand un liquide dans une citerne partiellement remplie se déplace latéralement lors de la gîte. Ce mouvement crée un moment déstabilisant équivalent à une élévation virtuelle de G (GG' = i×γ_liquide/Δ, où i est le moment d'inertie de la surface libre). GM corrigé = GM initial - GG'. Pour le réduire : 1) Remplir ou vider complètement les citernes (supprime la surface libre). 2) Utiliser des cloisons longitudinales dans les citernes (réduit i en divisant la surface)." },
      { q:"Décrivez la différence de comportement à la mer entre un navire 'raide' (stiff) et un navire 'mou' (tender), et les risques associés à chacun.", a:"Navire raide (GM élevé) : se redresse très rapidement avec des mouvements secs et violents. Risques : inconfort de l'équipage, fatigue des structures, déplacement de cargaison, efforts dynamiques importants sur les amarrages. Navire mou (GM faible) : gîte lentement et met du temps à se redresser. Risques : si un événement supplémentaire (vague, déplacement de cargaison) survient pendant la gîte, le navire peut ne pas se redresser. Vigilance accrue sur l'état de chargement." },
    ],
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
    gzLabel:"Gîte (degrés)", gzBracket:"Bras de levier GZ",
    stateLabel:"État",
  },
  en: {
    moduleLabel:"SEAMANSHIP", lessonTitle:"Stability & Buoyancy",
    intro:"Stability is a vessel's ability to return to its upright position after a disturbance (wave, cargo shift, wind). Understanding buoyancy and gravity forces, and interpreting the GZ curve, is fundamental to maritime safety.",
    tabs:["📖 Content","✏️ Practice","📚 Question Bank","🎯 Quiz"],
    s1title:"⚖️ Stability Forces — G, B and M",
    s1hint:"👆 Tap a point to see its definition",
    s2title:"📐 Righting Lever GZ — Stability Curve",
    s2hint:"👆 Adjust heel to see the righting lever",
    s3title:"🚢 Stability States",
    s3hint:"👆 Tap a state to see its characteristics",
    s4title:"⚠️ Factors Affecting Stability",
    s4hint:"👆 Tap a factor to see its effect",
    keypoints:"Key Points",
    kp:[
      "G (centre of gravity): point where all vessel masses act downward",
      "B (centre of buoyancy): geometric centre of the submerged volume",
      "M (metacentre): virtual point — if GM > 0, vessel is stable",
      "GZ (righting lever): horizontal distance between G and vertical through B — measures righting force",
      "Too low GM → tender vessel; too high GM → stiff vessel (uncomfortable and risky)",
    ],
    points:{
      G:{ name:"G — Centre of Gravity", desc:"Point where the resultant of all gravity forces acts (hull + cargo + fuel + crew). Rises when loading high, falls when loading low. Does not shift with heel." },
      B:{ name:"B — Centre of Buoyancy", desc:"Geometric centre of the displaced water volume (submerged volume). Moves laterally when the vessel heels, as the submerged shape changes. This movement creates the righting lever." },
      M:{ name:"M — Metacentre", desc:"Virtual point on the vessel's vertical axis, at the intersection of the heeled buoyancy vertical and the upright vertical axis. If G is below M (positive GM) → stable. If G exceeds M → unstable." },
      K:{ name:"K — Keel", desc:"Lowest point of vessel, used as reference for heights. KG = keel to centre of gravity. KM = keel to metacentre. GM = KM - KG." },
    },
    states:{
      stable:{ name:"✅ Positive Stability (GM > 0)", desc:"G is below M. When the vessel heels, the GZ lever creates a righting couple returning the vessel upright. This is the normal, desired state." },
      neutral:{ name:"⚖️ Neutral Stability (GM = 0)", desc:"G coincides with M. A heeled vessel tends neither to return upright nor to capsize — it remains in the heeled position. Dangerous state to be avoided." },
      unstable:{ name:"❌ Negative Stability (GM < 0)", desc:"G is above M. The lever creates a capsizing couple — the vessel continues heeling until capsize. Absolute emergency situation." },
      stiff:{ name:"⚡ Stiff Vessel (very high GM)", desc:"Very positive GM. The vessel rights itself very quickly with sharp, violent movements. Uncomfortable for crew and dangerous for cargo and structures." },
      tender:{ name:"🌊 Tender Vessel (low positive GM)", desc:"Slightly positive GM. The vessel heels slowly and takes time to right itself. Can become dangerous if GM becomes negative due to cargo shift or flooding." },
    },
    factors:{
      loading:{ name:"High Loading", desc:"Loading masses high (deck cargo, high containers) raises G and reduces GM. Risk of tender or unstable vessel. Solution: ballast low (low ballast, heavy cargo in bottom holds)." },
      freesurf:{ name:"Free Surface Effect", desc:"Liquids in partially filled tanks shift laterally when the vessel heels. This movement virtually raises G (G rises by GG' = i×γ/Δ). Remedy: fill or empty tanks completely, use longitudinal divisions." },
      icing:{ name:"Icing", desc:"Ice forming on high structures (decks, masts, rigging) significantly raises G. Critical phenomenon in arctic waters. Remedy: remove ice manually or mechanically as soon as possible." },
      flooding:{ name:"Compartment Flooding", desc:"Water entering a compartment adds weight at height and creates a free surface effect. Double negative impact on stability. Response: pump immediately, counter-flood if possible." },
    },
    practiceTitle:"Practice Exercise",
    questions:[
      { q:"A vessel has KG = 7.2 m and KM = 8.5 m. Calculate GM and determine if the vessel is stable, neutral or unstable. What is the practical significance of this value?", a:"GM = KM - KG = 8.5 - 7.2 = 1.3 m. Positive GM → vessel is stable (G below M). A value of 1.3 m is acceptable — not too stiff (GM > 2 m would be uncomfortable) nor too tender (GM < 0.15 m would be dangerous). The vessel will return upright after a disturbance." },
      { q:"Explain the free surface effect and how it affects GM. Give two methods to reduce it on board.", a:"Free surface effect occurs when liquid in a partially filled tank shifts laterally as the vessel heels. This creates a destabilising moment equivalent to a virtual rise in G (GG' = i×γ_liquid/Δ, where i is the free surface moment of inertia). Corrected GM = initial GM - GG'. To reduce it: 1) Fill or empty tanks completely (eliminates free surface). 2) Use longitudinal divisions in tanks (reduces i by dividing the surface)." },
      { q:"Describe the behaviour at sea of a 'stiff' vessel versus a 'tender' vessel, and the risks associated with each.", a:"Stiff vessel (high GM): rights itself very quickly with sharp, violent movements. Risks: crew discomfort, structural fatigue, cargo shifting, high dynamic forces on moorings. Tender vessel (low GM): heels slowly and takes time to right. Risks: if an additional event (wave, cargo shift) occurs during the heel, the vessel may not right itself. Heightened vigilance on loading condition." },
    ],
    showAnswer:"Show answer", hideAnswer:"Hide",
    gzLabel:"Heel (degrees)", gzBracket:"Righting lever GZ",
    stateLabel:"State",
  },
  es: {
    moduleLabel:"SEAMANSHIP", lessonTitle:"Estabilidad & Flotabilidad",
    intro:"La estabilidad es la capacidad de un buque de volver a su posición de equilibrio tras una perturbación (ola, desplazamiento de carga, viento). Comprender las fuerzas de empuje y gravedad e interpretar la curva GZ es fundamental para la seguridad marítima.",
    tabs:["📖 Contenido","✏️ Práctica","📚 Banco Q.","🎯 Quiz"],
    s1title:"⚖️ Fuerzas de estabilidad — G, B y M",
    s1hint:"👆 Toca un punto para ver su definición",
    s2title:"📐 Brazo adrizante GZ — curva de estabilidad",
    s2hint:"👆 Ajusta la escora para ver el brazo adrizante",
    s3title:"🚢 Estados de estabilidad",
    s3hint:"👆 Toca un estado para ver sus características",
    s4title:"⚠️ Factores que afectan la estabilidad",
    s4hint:"👆 Toca un factor para ver su efecto",
    keypoints:"Puntos clave",
    kp:[
      "G (centro de gravedad): punto donde actúan todas las masas del buque",
      "B (centro de carena): centro geométrico del volumen sumergido",
      "M (metacentro): punto virtual — si GM > 0, el buque es estable",
      "GZ (brazo adrizante): distancia horizontal entre G y la vertical de B — mide la fuerza adrizante",
      "GM demasiado bajo → buque blando; GM demasiado alto → buque rígido (incómodo y arriesgado)",
    ],
    points:{
      G:{ name:"G — Centro de gravedad", desc:"Punto donde actúa la resultante de todas las fuerzas de gravedad (peso propio + carga + combustible + tripulación). Sube al cargar en altura, baja al cargar bajo. No varía con la escora." },
      B:{ name:"B — Centro de carena", desc:"Centro geométrico del volumen de agua desplazada (volumen sumergido). Se desplaza lateralmente cuando el buque escora, ya que cambia la forma del volumen sumergido. Este desplazamiento crea el brazo adrizante." },
      M:{ name:"M — Metacentro", desc:"Punto virtual en el eje vertical del buque, en la intersección de la vertical del empuje escorado y el eje vertical inicial. Si G está por debajo de M (GM positivo) → buque estable. Si G supera M → buque inestable." },
      K:{ name:"K — Quilla (keel)", desc:"Punto más bajo del buque, tomado como referencia para las alturas. KG = distancia quilla a centro de gravedad. KM = distancia quilla a metacentro. GM = KM - KG." },
    },
    states:{
      stable:{ name:"✅ Estabilidad positiva (GM > 0)", desc:"G está por debajo de M. Cuando el buque escora, el brazo GZ crea un par adrizante que devuelve el buque a la vertical. Es el estado normal y buscado." },
      neutral:{ name:"⚖️ Estabilidad neutra (GM = 0)", desc:"G coincide con M. El buque escorado no tiende ni a adrizar ni a zozobrar — permanece en posición inclinada. Estado peligroso que debe evitarse absolutamente." },
      unstable:{ name:"❌ Estabilidad negativa (GM < 0)", desc:"G está por encima de M. El brazo crea un par zozobrante — el buque continúa escorando hasta zozobrar. Situación de emergencia absoluta." },
      stiff:{ name:"⚡ Buque rígido (GM muy elevado)", desc:"GM muy positivo. El buque se adiza muy rápidamente con movimientos bruscos y secos. Incómodo para la tripulación y peligroso para la carga y las estructuras." },
      tender:{ name:"🌊 Buque blando (GM bajo positivo)", desc:"GM ligeramente positivo. El buque escora lentamente y tarda en adrizar. Puede volverse peligroso si GM se vuelve negativo por desplazamiento de carga o entrada de agua." },
    },
    factors:{
      loading:{ name:"Carga en altura", desc:"Cargar masas en altura (cubierta, contenedores altos) eleva G y reduce GM. Riesgo de buque blando o inestable. Solución: lastre bajo (lastre bajo, carga pesada en el fondo de bodega)." },
      freesurf:{ name:"Efecto de superficie libre", desc:"Los líquidos en tanques parcialmente llenos se desplazan lateralmente al escorar. Este movimiento eleva virtualmente G (G sube GG' = i×γ/Δ). Remedio: llenar o vaciar completamente los tanques, usar mamparos longitudinales." },
      icing:{ name:"Formación de hielo (icing)", desc:"El hielo que se forma en estructuras altas (cubiertas, mástiles, jarcia) eleva considerablemente G. Fenómeno crítico en aguas árticas. Remedio: eliminar el hielo manual o mecánicamente lo antes posible." },
      flooding:{ name:"Inundación de un compartimento", desc:"El agua que entra en un compartimento añade peso en altura y crea efecto de superficie libre. Doble impacto negativo sobre la estabilidad. Respuesta: bombear inmediatamente, contrainundar si es posible." },
    },
    practiceTitle:"Ejercicio práctico",
    questions:[
      { q:"Un buque tiene KG = 7,2 m y KM = 8,5 m. Calcule GM y determine si el buque es estable, neutro o inestable. ¿Cuál es el significado práctico de este valor?", a:"GM = KM - KG = 8,5 - 7,2 = 1,3 m. GM positivo → el buque es estable (G por debajo de M). Un valor de 1,3 m es correcto — no demasiado rígido (GM > 2 m sería incómodo) ni demasiado blando (GM < 0,15 m sería peligroso). El buque volverá a la vertical tras una perturbación." },
      { q:"Explique el efecto de superficie libre y cómo afecta a GM. Dé dos métodos para reducirlo a bordo.", a:"El efecto de superficie libre ocurre cuando el líquido en un tanque parcialmente lleno se desplaza lateralmente al escorar. Esto crea un momento desestabilizador equivalente a una elevación virtual de G (GG' = i×γ_líquido/Δ). GM corregido = GM inicial - GG'. Para reducirlo: 1) Llenar o vaciar completamente los tanques (elimina la superficie libre). 2) Usar mamparos longitudinales en los tanques (reduce i dividiendo la superficie)." },
      { q:"Describa el comportamiento en la mar de un buque 'rígido' frente a uno 'blando', y los riesgos asociados a cada uno.", a:"Buque rígido (GM elevado): se adiza muy rápidamente con movimientos bruscos y violentos. Riesgos: incomodidad de la tripulación, fatiga de estructuras, desplazamiento de carga, grandes esfuerzos dinámicos en las amarras. Buque blando (GM bajo): escora lentamente y tarda en adrizar. Riesgos: si ocurre un evento adicional (ola, desplazamiento de carga) durante la escora, el buque puede no adrizar. Mayor vigilancia del estado de carga." },
    ],
    showAnswer:"Ver corrección", hideAnswer:"Ocultar",
    gzLabel:"Escora (grados)", gzBracket:"Brazo adrizante GZ",
    stateLabel:"Estado",
  },
  pt: {
    moduleLabel:"SEAMANSHIP", lessonTitle:"Estabilidade & Flutuabilidade",
    intro:"A estabilidade é a capacidade de um navio de regressar à sua posição de equilíbrio após uma perturbação (onda, deslocamento de carga, vento). Compreender as forças de empuxo e gravidade e interpretar a curva GZ é fundamental para a segurança marítima.",
    tabs:["📖 Conteúdo","✏️ Prática","📚 Banco Q.","🎯 Quiz"],
    s1title:"⚖️ Forças de estabilidade — G, B e M",
    s1hint:"👆 Toque num ponto para ver a definição",
    s2title:"📐 Braço de endireitamento GZ — curva de estabilidade",
    s2hint:"👆 Ajuste a banda para ver o braço de endireitamento",
    s3title:"🚢 Estados de estabilidade",
    s3hint:"👆 Toque num estado para ver as características",
    s4title:"⚠️ Fatores que afetam a estabilidade",
    s4hint:"👆 Toque num fator para ver o seu efeito",
    keypoints:"Pontos-chave",
    kp:[
      "G (centro de gravidade): ponto onde atuam todas as massas do navio",
      "B (centro de carena): centro geométrico do volume submerso",
      "M (metacentro): ponto virtual — se GM > 0, o navio é estável",
      "GZ (braço de endireitamento): distância horizontal entre G e a vertical de B — mede a força de endireitamento",
      "GM demasiado baixo → navio mole; GM demasiado alto → navio rígido (desconfortável e arriscado)",
    ],
    points:{
      G:{ name:"G — Centro de gravidade", desc:"Ponto onde atua a resultante de todas as forças de gravidade (peso próprio + carga + combustível + tripulação). Sobe ao carregar em altura, desce ao carregar baixo. Não varia com a banda." },
      B:{ name:"B — Centro de carena", desc:"Centro geométrico do volume de água deslocada (volume submerso). Desloca-se lateralmente quando o navio aderna, pois a forma do volume submerso muda. Este deslocamento cria o braço de endireitamento." },
      M:{ name:"M — Metacentro", desc:"Ponto virtual no eixo vertical do navio, na intersecção da vertical do empuxo adernado e o eixo vertical inicial. Se G está abaixo de M (GM positivo) → navio estável. Se G ultrapassa M → navio instável." },
      K:{ name:"K — Quilha (keel)", desc:"Ponto mais baixo do navio, tomado como referência para as alturas. KG = quilha ao centro de gravidade. KM = quilha ao metacentro. GM = KM - KG." },
    },
    states:{
      stable:{ name:"✅ Estabilidade positiva (GM > 0)", desc:"G está abaixo de M. Quando o navio aderna, o braço GZ cria um binário de endireitamento que traz o navio à vertical. É o estado normal e desejado." },
      neutral:{ name:"⚖️ Estabilidade neutra (GM = 0)", desc:"G coincide com M. O navio adernado não tende nem a endireitar nem a tombar — permanece na posição inclinada. Estado perigoso a evitar absolutamente." },
      unstable:{ name:"❌ Estabilidade negativa (GM < 0)", desc:"G está acima de M. O braço cria um binário de tombamento — o navio continua a adornar até tombar. Situação de emergência absoluta." },
      stiff:{ name:"⚡ Navio rígido (GM muito elevado)", desc:"GM muito positivo. O navio endireita-se muito rapidamente com movimentos bruscos e secos. Desconfortável para a tripulação e perigoso para a carga e estruturas." },
      tender:{ name:"🌊 Navio mole (GM baixo positivo)", desc:"GM ligeiramente positivo. O navio aderna lentamente e demora a endireitar. Pode tornar-se perigoso se GM se tornar negativo por deslocamento de carga ou entrada de água." },
    },
    factors:{
      loading:{ name:"Carga em altura", desc:"Carregar massas em altura (convés, contentores altos) eleva G e reduz GM. Risco de navio mole ou instável. Solução: lastrar baixo (lastro baixo, carga pesada no fundo do porão)." },
      freesurf:{ name:"Efeito de superfície livre", desc:"Os líquidos em tanques parcialmente cheios deslocam-se lateralmente ao adornar. Este movimento eleva virtualmente G (G sobe GG' = i×γ/Δ). Remédio: encher ou esvaziar completamente os tanques, usar anteparas longitudinais." },
      icing:{ name:"Formação de gelo (icing)", desc:"O gelo que se forma em estruturas altas (conveses, mastros, mastreação) eleva consideravelmente G. Fenómeno crítico em águas árticas. Remédio: remover o gelo manual ou mecanicamente o mais rapidamente possível." },
      flooding:{ name:"Inundação de um compartimento", desc:"A água que entra num compartimento adiciona peso em altura e cria efeito de superfície livre. Duplo impacto negativo na estabilidade. Resposta: bombear imediatamente, contra-inundar se possível." },
    },
    practiceTitle:"Exercício prático",
    questions:[
      { q:"Um navio tem KG = 7,2 m e KM = 8,5 m. Calcule GM e determine se o navio é estável, neutro ou instável. Qual é o significado prático deste valor?", a:"GM = KM - KG = 8,5 - 7,2 = 1,3 m. GM positivo → o navio é estável (G abaixo de M). Um valor de 1,3 m é aceitável — não demasiado rígido (GM > 2 m seria desconfortável) nem demasiado mole (GM < 0,15 m seria perigoso). O navio regressará à vertical após uma perturbação." },
      { q:"Explique o efeito de superfície livre e como afeta GM. Dê dois métodos para o reduzir a bordo.", a:"O efeito de superfície livre ocorre quando o líquido num tanque parcialmente cheio se desloca lateralmente ao adornar. Isto cria um momento desestabilizador equivalente a uma elevação virtual de G (GG' = i×γ_líquido/Δ). GM corrigido = GM inicial - GG'. Para reduzir: 1) Encher ou esvaziar completamente os tanques (elimina a superfície livre). 2) Usar anteparas longitudinais nos tanques (reduz i dividindo a superfície)." },
      { q:"Descreva o comportamento no mar de um navio 'rígido' versus um navio 'mole', e os riscos associados a cada um.", a:"Navio rígido (GM elevado): endireita-se muito rapidamente com movimentos bruscos e violentos. Riscos: desconforto da tripulação, fadiga das estruturas, deslocamento da carga, grandes esforços dinâmicos nas amarrações. Navio mole (GM baixo): aderna lentamente e demora a endireitar. Riscos: se ocorrer um evento adicional (onda, deslocamento de carga) durante a banda, o navio pode não endireitar. Maior vigilância do estado de carregamento." },
    ],
    showAnswer:"Ver correção", hideAnswer:"Ocultar",
    gzLabel:"Banda (graus)", gzBracket:"Braço GZ",
    stateLabel:"Estado",
  },
};

// ── SVG 1 — G B M DIAGRAM ────────────────────────────────────
function GBMDiagramSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string | null>(null);
  const pts = t.points;
  const ptColors: Record<string,string> = { G:C.grav, B:C.buoy, M:C.meta, K:C.keel };

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.meta}33`}}>
      <div style={{fontSize:10,color:C.meta,letterSpacing:2,marginBottom:8,fontFamily:"'Cinzel',serif"}}>{t.s1hint}</div>
      <svg viewBox="0 0 220 240" style={{width:"100%",maxWidth:300,display:"block",margin:"0 auto"}}>
        {/* Water */}
        <rect x="10" y="130" width="200" height="80" rx="4" fill={C.water} opacity={0.15}/>
        <line x1="10" y1="130" x2="210" y2="130" stroke={C.water} strokeWidth="1.5" strokeDasharray="4,3"/>
        <text x="15" y="125" fontSize="8" fill={C.water} fontFamily="Courier New">waterline</text>
        {/* Hull */}
        <path d="M40 130 L40 175 Q110 200 180 175 L180 130 Z" fill={C.hull} opacity={0.3} stroke={C.hull} strokeWidth="1.5"/>
        {/* Keel K */}
        <circle cx="110" cy="195" r="5" fill={C.keel} style={{cursor:"pointer"}} onClick={()=>setSel(sel==="K"?null:"K")}/>
        <text x="116" y="199" fontSize="9" fill={C.keel} fontFamily="Courier New" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="K"?null:"K")}>K</text>
        {/* Centre of buoyancy B */}
        <circle cx="110" cy="162" r="6" fill={C.buoy} style={{cursor:"pointer"}} onClick={()=>setSel(sel==="B"?null:"B")}/>
        <text x="118" y="166" fontSize="9" fill={C.buoy} fontFamily="Courier New" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="B"?null:"B")}>B</text>
        {/* Centre of gravity G */}
        <circle cx="110" cy="120" r="6" fill={C.grav} style={{cursor:"pointer"}} onClick={()=>setSel(sel==="G"?null:"G")}/>
        <text x="118" y="124" fontSize="9" fill={C.grav} fontFamily="Courier New" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="G"?null:"G")}>G</text>
        {/* Metacentre M */}
        <circle cx="110" cy="75" r="6" fill={C.meta} style={{cursor:"pointer"}} onClick={()=>setSel(sel==="M"?null:"M")}/>
        <text x="118" y="79" fontSize="9" fill={C.meta} fontFamily="Courier New" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="M"?null:"M")}>M</text>
        {/* Vertical axis */}
        <line x1="110" y1="30" x2="110" y2="205" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,3"/>
        {/* GM bracket */}
        <line x1="95" y1="75" x2="95" y2="120" stroke={C.meta} strokeWidth="1.5"/>
        <line x1="92" y1="75" x2="98" y2="75" stroke={C.meta} strokeWidth="1.5"/>
        <line x1="92" y1="120" x2="98" y2="120" stroke={C.meta} strokeWidth="1.5"/>
        <text x="72" y="100" fontSize="8" fill={C.meta} fontFamily="Courier New">GM</text>
        {/* Archimedes arrow */}
        <line x1="145" y1="162" x2="145" y2="100" stroke={C.buoy} strokeWidth="1.5" markerEnd="url(#arrowUp)"/>
        <text x="148" y="135" fontSize="7" fill={C.buoy} fontFamily="Courier New">↑ poussée</text>
        {/* Weight arrow */}
        <line x1="75" y1="120" x2="75" y2="182" stroke={C.grav} strokeWidth="1.5" markerEnd="url(#arrowDown)"/>
        <text x="48" y="155" fontSize="7" fill={C.grav} fontFamily="Courier New">↓ poids</text>
        <defs>
          <marker id="arrowUp" markerWidth="6" markerHeight="6" refX="3" refY="6" orient="auto"><path d="M0,6 L3,0 L6,6" fill={C.buoy}/></marker>
          <marker id="arrowDown" markerWidth="6" markerHeight="6" refX="3" refY="0" orient="auto"><path d="M0,0 L3,6 L6,0" fill={C.grav}/></marker>
        </defs>
      </svg>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10,marginTop:4}}>
        {Object.keys(pts).map(key=>(
          <button key={key} onClick={()=>setSel(sel===key?null:key)} style={{
            padding:"5px 12px",borderRadius:8,fontSize:11,cursor:"pointer",fontWeight:700,
            background:sel===key?`${ptColors[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?ptColors[key]:"rgba(255,255,255,0.12)"}`,
            color:sel===key?ptColors[key]:"rgba(240,244,255,0.45)",
            fontFamily:"Courier New",
          }}>{key}</button>
        ))}
      </div>
      {sel && (
        <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${ptColors[sel]}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
          <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{pts[sel].name}</div>
          {pts[sel].desc}
        </div>
      )}
    </div>
  );
}

// ── SVG 2 — GZ CURVE ─────────────────────────────────────────
function GZCurveSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [heel, setHeel] = useState(0);

  // Simple GZ curve: rises to max ~0.8 at 40°, then falls to 0 at ~75°
  const gz = (h: number) => {
    if (h <= 0) return 0;
    if (h <= 40) return (h / 40) * 0.8;
    if (h <= 75) return 0.8 * (1 - (h - 40) / 35);
    return Math.max(0, 0.8 * (1 - (h - 40) / 35));
  };

  const gzVal = gz(heel);
  const isPositive = gzVal > 0;
  const isCritical = heel > 60;

  // Chart dimensions
  const W = 260, H = 120;
  const padL = 30, padB = 20, padT = 10;
  const chartW = W - padL - 10;
  const chartH = H - padB - padT;

  const toX = (deg: number) => padL + (deg / 80) * chartW;
  const toY = (val: number) => padT + chartH - (val / 1.0) * chartH;

  const points = Array.from({length:81},(_,i)=>i).map(i=>({x:toX(i),y:toY(Math.max(0,gz(i)))}));
  const pathD = points.map((p,i)=>`${i===0?"M":"L"}${p.x},${p.y}`).join(" ");

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.meta}33`}}>
      <div style={{marginBottom:10}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"rgba(240,244,255,0.6)",marginBottom:6}}>
          <span>{t.gzLabel}</span>
          <span style={{color:isCritical?C.danger:C.safe,fontWeight:700}}>{heel}° {isCritical?"⚠️":""}</span>
        </div>
        <input type="range" min={0} max={75} value={heel}
          onChange={e=>setHeel(Number(e.target.value))}
          style={{width:"100%",accentColor:isCritical?C.danger:C.meta}}/>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",display:"block"}}>
        {/* Grid */}
        {[0,20,40,60,80].map(d=>(
          <g key={d}>
            <line x1={toX(d)} y1={padT} x2={toX(d)} y2={H-padB} stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
            <text x={toX(d)} y={H-5} fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="Courier New" textAnchor="middle">{d}°</text>
          </g>
        ))}
        {[0,0.4,0.8].map(v=>(
          <g key={v}>
            <line x1={padL} y1={toY(v)} x2={W-10} y2={toY(v)} stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
            <text x={padL-4} y={toY(v)+3} fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="Courier New" textAnchor="end">{v}</text>
          </g>
        ))}
        {/* GZ curve */}
        <path d={pathD} fill="none" stroke={C.safe} strokeWidth="2"/>
        {/* Fill under curve */}
        <path d={`${pathD} L${toX(75)},${toY(0)} L${padL},${toY(0)} Z`} fill={C.safe} opacity={0.08}/>
        {/* Axes */}
        <line x1={padL} y1={padT} x2={padL} y2={H-padB} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
        <line x1={padL} y1={H-padB} x2={W-10} y2={H-padB} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
        {/* Current heel indicator */}
        <line x1={toX(heel)} y1={padT} x2={toX(heel)} y2={H-padB} stroke={isCritical?C.danger:C.meta} strokeWidth="1.5" strokeDasharray="3,2"/>
        <circle cx={toX(heel)} cy={toY(Math.max(0,gzVal))} r="5" fill={isCritical?C.danger:C.meta}/>
        {/* Axis labels */}
        <text x={W/2} y={H-1} fontSize="7" fill="rgba(255,255,255,0.4)" fontFamily="Courier New" textAnchor="middle">{t.gzLabel}</text>
        <text x={8} y={H/2} fontSize="7" fill="rgba(255,255,255,0.4)" fontFamily="Courier New" textAnchor="middle" transform={`rotate(-90,8,${H/2})`}>GZ (m)</text>
      </svg>

      <div style={{display:"flex",gap:8,marginTop:8}}>
        <div style={{flex:1,padding:"8px 10px",borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${(isCritical?C.danger:isPositive?C.safe:C.danger)}44`,textAlign:"center"}}>
          <div style={{fontSize:11,color:"rgba(240,244,255,0.5)",fontFamily:"Courier New",marginBottom:2}}>{t.gzBracket}</div>
          <div style={{fontSize:16,fontWeight:700,color:isCritical?C.danger:isPositive?C.safe:C.danger,fontFamily:"Courier New"}}>{gzVal.toFixed(2)} m</div>
        </div>
        <div style={{flex:1,padding:"8px 10px",borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${C.meta}33`,textAlign:"center"}}>
          <div style={{fontSize:11,color:"rgba(240,244,255,0.5)",fontFamily:"Courier New",marginBottom:2}}>{t.stateLabel}</div>
          <div style={{fontSize:11,fontWeight:700,color:isCritical?C.danger:isPositive?C.safe:C.danger,fontFamily:"Courier New"}}>{isCritical?"⚠️ DANGER":isPositive?"✅ STABLE":"❌ CAPSIZE"}</div>
        </div>
      </div>
    </div>
  );
}

// ── SVG 3 — STABILITY STATES ─────────────────────────────────
function StabilityStatesSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string>("stable");
  const states = Object.entries(t.states) as [string,{name:string;desc:string}][];
  const stateColors: Record<string,string> = {stable:C.safe,neutral:C.meta,unstable:C.danger,stiff:C.water,tender:C.grav};

  const hullPaths: Record<string, {hull:string; G:{cx:number;cy:number}; M:{cx:number;cy:number}; angle:number}> = {
    stable:   { hull:"M30 80 L50 120 Q110 145 170 120 L190 80 Z", G:{cx:110,cy:70}, M:{cx:110,cy:40}, angle:0 },
    neutral:  { hull:"M30 80 L50 120 Q110 145 170 120 L190 80 Z", G:{cx:110,cy:55}, M:{cx:110,cy:55}, angle:0 },
    unstable: { hull:"M30 80 L50 120 Q110 145 170 120 L190 80 Z", G:{cx:110,cy:40}, M:{cx:110,cy:55}, angle:0 },
    stiff:    { hull:"M40 80 L55 125 Q110 148 165 125 L180 80 Z", G:{cx:110,cy:85}, M:{cx:110,cy:30}, angle:0 },
    tender:   { hull:"M30 80 L50 120 Q110 145 170 120 L190 80 Z", G:{cx:110,cy:68}, M:{cx:110,cy:72}, angle:0 },
  };

  const s = hullPaths[sel];
  const col = stateColors[sel]||C.safe;

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.hull}33`}}>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
        {states.map(([key,val])=>(
          <button key={key} onClick={()=>setSel(key)} style={{
            padding:"4px 8px",borderRadius:8,fontSize:10,cursor:"pointer",
            background:sel===key?`${stateColors[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?stateColors[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?stateColors[key]:"rgba(240,244,255,0.45)",
            fontFamily:"Courier New",
          }}>{val.name.split(" ")[0]}</button>
        ))}
      </div>
      <svg viewBox="0 0 220 170" style={{width:"100%",maxWidth:280,display:"block",margin:"0 auto"}}>
        {/* Water */}
        <rect x="10" y="90" width="200" height="60" rx="4" fill={C.water} opacity={0.12}/>
        <line x1="10" y1="90" x2="210" y2="90" stroke={C.water} strokeWidth="1" strokeDasharray="4,3" opacity={0.5}/>
        {/* Hull */}
        <path d={s.hull} fill={C.hull} opacity={0.25} stroke={C.hull} strokeWidth="1.5"/>
        {/* K */}
        <circle cx="110" cy="140" r="4" fill={C.keel}/>
        <text x="116" y="144" fontSize="8" fill={C.keel} fontFamily="Courier New">K</text>
        {/* B */}
        <circle cx="110" cy="115" r="5" fill={C.buoy}/>
        <text x="117" y="119" fontSize="8" fill={C.buoy} fontFamily="Courier New">B</text>
        {/* G */}
        <circle cx={s.G.cx} cy={s.G.cy} r="6" fill={C.grav}/>
        <text x={s.G.cx+8} y={s.G.cy+4} fontSize="9" fill={C.grav} fontFamily="Courier New" fontWeight="700">G</text>
        {/* M */}
        <circle cx={s.M.cx} cy={s.M.cy} r="6" fill={C.meta}/>
        <text x={s.M.cx+8} y={s.M.cy+4} fontSize="9" fill={C.meta} fontFamily="Courier New" fontWeight="700">M</text>
        {/* GM indicator */}
        {sel!=="neutral" && (
          <>
            <line x1="95" y1={s.M.cy} x2="95" y2={s.G.cy} stroke={col} strokeWidth="1.5"/>
            <text x="70" y={(s.M.cy+s.G.cy)/2+3} fontSize="8" fill={col} fontFamily="Courier New">GM</text>
          </>
        )}
        {/* Status */}
        <text x="110" y="20" fontSize="10" fill={col} fontFamily="'Cinzel',serif" fontWeight="700" textAnchor="middle">
          {sel==="stable"?"GM > 0 ✅":sel==="neutral"?"GM = 0 ⚖️":sel==="unstable"?"GM < 0 ❌":sel==="stiff"?"GM >> 0 ⚡":"GM ≈ 0 🌊"}
        </text>
      </svg>
      <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${col}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
        <div style={{color:col,fontWeight:700,marginBottom:4}}>{t.states[sel].name}</div>
        {t.states[sel].desc}
      </div>
    </div>
  );
}

// ── SVG 4 — FACTORS ──────────────────────────────────────────
function FactorsSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string | null>(null);
  const factors = Object.entries(t.factors) as [string,{name:string;desc:string}][];
  const fColors: Record<string,string> = {loading:C.danger,freesurf:C.buoy,icing:C.water,flooding:C.grav};

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.danger}33`}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {factors.map(([key,val])=>{
          const col=fColors[key]||C.danger;
          return(
            <button key={key} onClick={()=>setSel(sel===key?null:key)} style={{
              padding:"10px 8px",borderRadius:10,cursor:"pointer",textAlign:"left",
              background:sel===key?`${col}18`:"rgba(255,255,255,0.04)",
              border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`,
            }}>
              <div style={{fontSize:12,fontWeight:700,color:"#f0f4ff",fontFamily:"Courier New",lineHeight:1.4}}>{val.name}</div>
            </button>
          );
        })}
      </div>
      {sel && (
        <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${fColors[sel]||C.danger}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
          <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{t.factors[sel].name}</div>
          {t.factors[sel].desc}
        </div>
      )}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)"}}>{t.s4hint}</div>}
    </div>
  );
}

// ── CONTENT TAB ───────────────────────────────────────────────
function ContentTab({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const section = (title:string,children:React.ReactNode,color=C.meta) => (
    <div style={{marginBottom:18,borderRadius:14,overflow:"hidden",border:`1px solid ${color}33`}}>
      <div style={{background:`${color}18`,padding:"10px 14px",borderBottom:`1px solid ${color}22`}}>
        <span style={{fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color}}>{title}</span>
      </div>
      <div style={{padding:12}}>{children}</div>
    </div>
  );
  return (
    <div style={{padding:"14px 14px 24px"}}>
      <div style={{fontSize:13,color:"rgba(240,244,255,0.65)",lineHeight:1.7,marginBottom:18,fontFamily:"Courier New"}}>{t.intro}</div>
      {section(t.s1title,<GBMDiagramSVG lang={lang}/>,C.meta)}
      {section(t.s2title,<GZCurveSVG lang={lang}/>,C.safe)}
      {section(t.s3title,<StabilityStatesSVG lang={lang}/>,C.hull)}
      {section(t.s4title,<FactorsSVG lang={lang}/>,C.danger)}
      <div style={{borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.gold}44`,padding:14}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:C.gold,letterSpacing:1,marginBottom:10}}>✦ {t.keypoints}</div>
        {t.kp.map((k:string,i:number)=>(
          <div key={i} style={{display:"flex",gap:8,marginBottom:7,fontSize:12,color:"rgba(240,244,255,0.75)",fontFamily:"Courier New",lineHeight:1.5}}>
            <span style={{color:C.gold,flexShrink:0}}>✦</span><span>{k}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PRACTICE TAB ──────────────────────────────────────────────
function PracticeTab({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [shown,setShown] = useState([false,false,false]);
  const toggle = (i:number) => setShown(p=>p.map((v,j)=>j===i?!v:v));
  return (
    <div style={{padding:"14px 14px 24px"}}>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.gold,marginBottom:14}}>✏️ {t.practiceTitle}</div>
      {t.questions.map((q:any,i:number)=>(
        <div key={i} style={{marginBottom:14,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.meta}33`,overflow:"hidden"}}>
          <div style={{padding:"12px 14px"}}>
            <div style={{fontSize:10,color:C.meta,letterSpacing:1,marginBottom:6,fontFamily:"'Cinzel',serif"}}>Q{i+1}</div>
            <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>{q.q}</div>
          </div>
          <div style={{padding:"0 14px 12px"}}>
            <button onClick={()=>toggle(i)} style={{padding:"7px 14px",borderRadius:8,fontSize:11,cursor:"pointer",background:shown[i]?`${C.meta}22`:"rgba(255,255,255,0.06)",border:`1px solid ${shown[i]?C.meta:"rgba(255,255,255,0.15)"}`,color:shown[i]?C.meta:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{shown[i]?t.hideAnswer:t.showAnswer}</button>
            {shown[i]&&<div style={{marginTop:10,padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.meta}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{q.a}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
// LessonSEA_L5 — PART 2: Bank + Quiz + Main

function getBank(lang: string) {
  const banks: any = {
    fr:[
      {q:"Définissez la flottabilité (buoyancy) et expliquez le principe d'Archimède appliqué à un navire.",a:"La flottabilité est la force ascendante exercée par un fluide sur un corps immergé. Principe d'Archimède : tout corps plongé dans un fluide reçoit une poussée verticale vers le haut égale au poids du volume de fluide déplacé. Pour un navire : Poussée = ρ × g × V (où ρ = densité de l'eau, g = gravité, V = volume immergé). Le navire flotte quand la poussée égale son poids total."},
      {q:"Quelle est la différence entre KG, KM et GM ? Comment calcule-t-on GM ?",a:"K = quille (point de référence le plus bas). KG = distance verticale de la quille au centre de gravité G. KM = distance verticale de la quille au métacentre M. GM = hauteur métacentrique = KM - KG. Si KG < KM : GM positif → stable. Si KG = KM : GM nul → neutre. Si KG > KM : GM négatif → instable."},
      {q:"Qu'est-ce que le bras de levier GZ et quelle est sa signification physique ?",a:"GZ est la distance horizontale entre le centre de gravité G et la verticale passant par le centre de carène B lorsque le navire est incliné. Il représente le bras du couple redressant (ou chavirant). Si GZ > 0 : couple redressant → le navire revient à la verticale. Si GZ = 0 : équilibre indifférent. Si GZ < 0 : couple chavirant → risque de chavirage. La courbe GZ en fonction de la gîte donne une image complète de la stabilité du navire."},
      {q:"Définissez l'angle de chavirement (angle of vanishing stability) et son importance.",a:"L'angle de chavirement (ou angle de disparition de la stabilité) est l'angle de gîte auquel GZ redevient nul après son maximum positif. Au-delà de cet angle, le navire ne peut plus se redresser seul. Pour un navire conventionnel, cet angle doit être supérieur à 60° selon les normes IMO. Un angle de chavirement faible (< 40°) indique une stabilité insuffisante."},
      {q:"Qu'est-ce que l'effet de surface libre et comment se calcule-t-il ?",a:"L'effet de surface libre (free surface effect) est la réduction virtuelle de GM causée par les liquides dans des citernes partiellement remplies. Quand le navire gîte, le liquide se déplace, créant un moment déstabilisant. Correction : GG' = (i × γ_liquide) / Δ, où i = moment d'inertie de la surface libre (m⁴), γ_liquide = densité du liquide, Δ = déplacement du navire. GM corrigé = GM initial - GG'. Plus i est grand (citerne large), plus l'effet est important."},
      {q:"Comment le chargement en hauteur affecte-t-il la stabilité ? Donnez un exemple concret.",a:"Charger des masses en hauteur élève le centre de gravité G, réduisant GM. Exemple : un porte-conteneurs charge des contenedurs pleins en 6ème rangée de pont. Chaque couche de conteneurs élève G d'environ 2,7 m × masse_ajoutée / déplacement_total. Si G dépasse M, le navire devient instable. Solution : lester les citernes de ballast basses pour abaisser G et maintenir GM positif."},
      {q:"Qu'est-ce que la courbe de stabilité statique et quelles informations en tire-t-on ?",a:"La courbe de stabilité statique (courbe GZ) représente le bras de levier redressant GZ en fonction de l'angle de gîte. On en tire : GM initial (pente à l'origine = GM × sin θ ≈ GM × θ en radians), angle de gîte maximal (sommet de la courbe), angle de chavirement (retour à GZ = 0), dynamical stability (aire sous la courbe = énergie de redressement), angle de pont immergé si tracé."},
      {q:"Définissez la stabilité dynamique et comment se mesure-t-elle ?",a:"La stabilité dynamique est l'énergie totale de redressement disponible. Elle se mesure par l'aire sous la courbe GZ entre 0° et l'angle de chavirement. Elle représente le travail que le navire peut fournir pour résister à une perturbation dynamique (vague, rafale). Plus l'aire est grande, plus le navire peut résister à des perturbations importantes avant de chavirer."},
      {q:"Quelles sont les exigences minimales de stabilité IMO pour un navire de charge conventionnel ?",a:"Critères IMO (IS Code 2008) : GM initial ≥ 0,15 m. GZ maximum ≥ 0,20 m à un angle ≥ 30°. Angle de chavirement ≥ 25° après le maximum de GZ. Aire sous la courbe GZ de 0° à 30° ≥ 0,055 m·rad. Aire de 0° à 40° ≥ 0,090 m·rad. Aire de 30° à 40° ≥ 0,030 m·rad. Ces critères doivent être satisfaits dans toutes les conditions de chargement."},
      {q:"Qu'est-ce que le ballast et quel est son rôle dans la gestion de la stabilité ?",a:"Le ballast est de l'eau de mer pompée dans des citernes dédiées (citernes de ballast) pour ajuster l'assiette, le tirant d'eau et la stabilité du navire. Rôle : abaisser G en remplissant les citernes basses → augmente GM. Permet d'ajuster l'enfoncement pour maintenir l'hélice immergée et la gouverne efficace. Donne le bon tirant d'eau pour les éclusages. MARPOL encadre la gestion des eaux de ballast (espèces invasives)."},
      {q:"Expliquez la différence entre stabilité initiale et stabilité à grande inclinaison.",a:"Stabilité initiale : comportement du navire pour de petits angles de gîte (< 10-15°). Elle est caractérisée par GM. Pour ces angles, GZ ≈ GM × sin θ. Stabilité à grande inclinaison : comportement pour des angles importants. Elle ne peut plus être décrite par GM seul — il faut la courbe GZ complète. Le métacentre n'est plus fixe et la forme de la coque joue un rôle majeur."},
      {q:"Qu'est-ce que l'assiette (trim) et comment affecte-t-elle la stabilité ?",a:"L'assiette est la différence entre le tirant d'eau arrière et le tirant d'eau avant. Une assiette positive (poupe plus enfoncée) est normale et favorable pour la propulsion. Une assiette excessive peut réduire la stabilité en modifiant la répartition des masses. L'assiette affecte aussi KM car elle modifie la forme du volume immergé. Un navire doit toujours opérer dans les limites d'assiette prescrites par le plan de chargement."},
      {q:"Qu'est-ce que le franc-bord (freeboard) et pourquoi est-il lié à la stabilité ?",a:"Le franc-bord est la distance entre la ligne de flottaison et le pont principal (ou pont de franc-bord). Il détermine la réserve de flottabilité — plus le franc-bord est grand, plus le navire peut gîter avant que l'eau n'embarque sur le pont. La ligne de charge de Plimsoll fixe le franc-bord minimal légal selon les zones de navigation et saisons. Un franc-bord insuffisant réduit l'angle de disparition de la stabilité."},
      {q:"Définissez le déplacement (displacement) et distinguez déplacement lège et déplacement en charge.",a:"Le déplacement est le poids total du navire égal au poids du volume d'eau déplacée (en tonnes métriques). Déplacement lège (light displacement) : poids du navire à vide (coque + machines + équipements fixes) sans cargaison, carburant ni équipage. Déplacement en charge (loaded displacement) : poids total en condition de pleine charge. La différence = Port en Lourd (DWT) = capacité de transport maximale."},
      {q:"Comment les citernes longitudinales divisées réduisent-elles l'effet de surface libre ?",a:"L'effet de surface libre est proportionnel au moment d'inertie i de la surface libre par rapport à son axe longitudinal. i = (l × b³) / 12 pour un rectangle. En divisant une citerne large (b) en deux citernes de largeur b/2 par un mamparo longitudinal central : i_total = 2 × (l × (b/2)³) / 12 = (l × b³) / 48, soit 4 fois moins que la citerne unique. La correction GG' est donc divisée par 4."},
      {q:"Qu'est-ce que l'expérience de stabilité (inclining experiment) et quand est-elle effectuée ?",a:"L'expérience de stabilité est un essai effectué à bord pour déterminer expérimentalement le KG et le GM réels du navire. Procédure : déplacer une masse connue (p) d'une distance transversale (d) connue et mesurer l'angle de gîte résultant (θ). GM = (p × d) / (Δ × tan θ). Puis KG = KM - GM. Obligatoire à la construction et après modifications importantes affectant les masses à bord."},
    ],
    en:[
      {q:"Define buoyancy and explain Archimedes' principle as applied to a vessel.",a:"Buoyancy is the upward force exerted by a fluid on an immersed body. Archimedes' principle: any body immersed in a fluid receives an upward vertical force equal to the weight of the displaced fluid volume. For a vessel: Buoyancy = ρ × g × V (where ρ = water density, g = gravity, V = submerged volume). The vessel floats when buoyancy equals its total weight."},
      {q:"What is the difference between KG, KM and GM? How is GM calculated?",a:"K = keel (lowest reference point). KG = vertical distance from keel to centre of gravity G. KM = vertical distance from keel to metacentre M. GM = metacentric height = KM - KG. If KG < KM: positive GM → stable. If KG = KM: zero GM → neutral. If KG > KM: negative GM → unstable."},
      {q:"What is the righting lever GZ and what is its physical significance?",a:"GZ is the horizontal distance between the centre of gravity G and the vertical through the centre of buoyancy B when the vessel is heeled. It represents the arm of the righting (or capsizing) couple. If GZ > 0: righting couple → vessel returns upright. If GZ = 0: indifferent equilibrium. If GZ < 0: capsizing couple → capsize risk. The GZ curve as a function of heel gives a complete picture of the vessel's stability."},
      {q:"Define the angle of vanishing stability and its importance.",a:"The angle of vanishing stability is the heel angle at which GZ returns to zero after its positive maximum. Beyond this angle, the vessel can no longer right itself unaided. For a conventional vessel, this angle must exceed 60° per IMO standards. A low angle of vanishing stability (< 40°) indicates insufficient stability."},
      {q:"What is the free surface effect and how is it calculated?",a:"The free surface effect is the virtual reduction of GM caused by liquids in partially filled tanks. When the vessel heels, the liquid shifts, creating a destabilising moment. Correction: GG' = (i × γ_liquid) / Δ, where i = moment of inertia of the free surface (m⁴), γ_liquid = liquid density, Δ = vessel displacement. Corrected GM = initial GM - GG'. The larger i (wide tank), the greater the effect."},
      {q:"How does high loading affect stability? Give a concrete example.",a:"Loading masses high raises the centre of gravity G, reducing GM. Example: a container ship loads full containers in the 6th deck row. Each layer of containers raises G by approximately 2.7 m × added_mass / total_displacement. If G exceeds M, the vessel becomes unstable. Solution: ballast low tanks to lower G and maintain positive GM."},
      {q:"What is the static stability curve and what information does it provide?",a:"The static stability curve (GZ curve) shows the righting lever GZ as a function of heel angle. It provides: initial GM (slope at origin = GM × sin θ ≈ GM × θ in radians), angle of maximum GZ, angle of vanishing stability (return to GZ = 0), dynamical stability (area under curve = righting energy), deck immersion angle if plotted."},
      {q:"Define dynamical stability and how is it measured?",a:"Dynamical stability is the total righting energy available. Measured by the area under the GZ curve from 0° to the angle of vanishing stability. It represents the work the vessel can do to resist dynamic disturbances (waves, gusts). The larger the area, the more the vessel can resist significant disturbances before capsizing."},
      {q:"What are the minimum IMO stability requirements for a conventional cargo vessel?",a:"IMO criteria (IS Code 2008): Initial GM ≥ 0.15 m. Maximum GZ ≥ 0.20 m at angle ≥ 30°. Angle of vanishing stability ≥ 25° past GZ maximum. Area under GZ from 0° to 30° ≥ 0.055 m·rad. Area from 0° to 40° ≥ 0.090 m·rad. Area from 30° to 40° ≥ 0.030 m·rad. All criteria must be met in all loading conditions."},
      {q:"What is ballast and what is its role in stability management?",a:"Ballast is seawater pumped into dedicated tanks (ballast tanks) to adjust trim, draught and stability. Role: lower G by filling low tanks → increases GM. Adjust draught to keep propeller submerged and rudder effective. Achieve correct draught for lock passages. MARPOL regulates ballast water management (invasive species)."},
      {q:"Explain the difference between initial stability and large-angle stability.",a:"Initial stability: vessel behaviour at small heel angles (< 10-15°). Characterised by GM. At these angles GZ ≈ GM × sin θ. Large-angle stability: behaviour at significant angles. Cannot be described by GM alone — the full GZ curve is needed. The metacentre is no longer fixed and hull form plays a major role."},
      {q:"What is trim and how does it affect stability?",a:"Trim is the difference between aft and forward draught. Positive trim (stern deeper) is normal and favourable for propulsion. Excessive trim can reduce stability by altering mass distribution. Trim also affects KM as it changes submerged volume shape. A vessel must always operate within trim limits prescribed by the loading plan."},
      {q:"What is freeboard and why is it related to stability?",a:"Freeboard is the distance between the waterline and the main deck (or freeboard deck). It determines the reserve of buoyancy — the greater the freeboard, the more the vessel can heel before water comes on deck. The Plimsoll load line fixes the minimum legal freeboard by navigation zone and season. Insufficient freeboard reduces the angle of vanishing stability."},
      {q:"Define displacement and distinguish light displacement from loaded displacement.",a:"Displacement is the vessel's total weight equal to the weight of displaced water volume (in metric tonnes). Light displacement: vessel weight when empty (hull + machinery + fixed equipment) without cargo, fuel or crew. Loaded displacement: total weight at full load condition. The difference = Deadweight Tonnage (DWT) = maximum cargo-carrying capacity."},
      {q:"How do longitudinal divisions reduce the free surface effect in tanks?",a:"The free surface effect is proportional to the moment of inertia i of the free surface about its longitudinal axis. i = (l × b³) / 12 for a rectangle. By dividing a wide tank (b) into two tanks of width b/2 with a central longitudinal bulkhead: i_total = 2 × (l × (b/2)³) / 12 = (l × b³) / 48, four times less than the single tank. The GG' correction is therefore divided by 4."},
      {q:"What is an inclining experiment and when is it performed?",a:"The inclining experiment is a test performed on board to experimentally determine the actual KG and GM of the vessel. Procedure: move a known mass (p) a known transverse distance (d) and measure the resulting heel angle (θ). GM = (p × d) / (Δ × tan θ). Then KG = KM - GM. Mandatory at construction and after major modifications affecting masses on board."},
    ],
    es:[
      {q:"Defina la flotabilidad y explique el principio de Arquímedes aplicado a un buque.",a:"La flotabilidad es la fuerza ascendente ejercida por un fluido sobre un cuerpo sumergido. Principio de Arquímedes: todo cuerpo sumergido en un fluido recibe una fuerza vertical hacia arriba igual al peso del volumen de fluido desplazado. Para un buque: Empuje = ρ × g × V (donde ρ = densidad del agua, g = gravedad, V = volumen sumergido). El buque flota cuando el empuje iguala su peso total."},
      {q:"¿Cuál es la diferencia entre KG, KM y GM? ¿Cómo se calcula GM?",a:"K = quilla (punto de referencia más bajo). KG = distancia vertical de la quilla al centro de gravedad G. KM = distancia vertical de la quilla al metacentro M. GM = altura metacéntrica = KM - KG. Si KG < KM: GM positivo → estable. Si KG = KM: GM nulo → neutro. Si KG > KM: GM negativo → inestable."},
      {q:"¿Qué es el brazo adrizante GZ y cuál es su significado físico?",a:"GZ es la distancia horizontal entre el centro de gravedad G y la vertical que pasa por el centro de carena B cuando el buque está escorado. Representa el brazo del par adrizante (o zozobrante). Si GZ > 0: par adrizante → el buque vuelve a la vertical. Si GZ = 0: equilibrio indiferente. Si GZ < 0: par zozobrante → riesgo de zozobra. La curva GZ en función de la escora da una imagen completa de la estabilidad."},
      {q:"Defina el ángulo de estabilidad nula y su importancia.",a:"El ángulo de estabilidad nula es el ángulo de escora en que GZ vuelve a ser cero tras su máximo positivo. A partir de ese ángulo, el buque ya no puede adrizar por sí solo. Para un buque convencional, debe ser superior a 60° según las normas OMI. Un ángulo de estabilidad nula bajo (< 40°) indica estabilidad insuficiente."},
      {q:"¿Qué es el efecto de superficie libre y cómo se calcula?",a:"El efecto de superficie libre es la reducción virtual de GM causada por los líquidos en tanques parcialmente llenos. Al escorar, el líquido se desplaza creando un momento desestabilizador. Corrección: GG' = (i × γ_líquido) / Δ, donde i = momento de inercia de la superficie libre (m⁴), γ_líquido = densidad del líquido, Δ = desplazamiento del buque. GM corregido = GM inicial - GG'. Cuanto mayor es i (tanque ancho), mayor es el efecto."},
      {q:"¿Cómo afecta la carga en altura a la estabilidad? Dé un ejemplo concreto.",a:"Cargar masas en altura eleva el centro de gravedad G, reduciendo GM. Ejemplo: un portacontenedores carga contenedores llenos en la 6ª fila de cubierta. Cada capa eleva G aproximadamente 2,7 m × masa_añadida / desplazamiento_total. Si G supera M, el buque se vuelve inestable. Solución: lastre en los tanques bajos para bajar G y mantener GM positivo."},
      {q:"¿Qué es la curva de estabilidad estática y qué información proporciona?",a:"La curva de estabilidad estática (curva GZ) representa el brazo adrizante GZ en función del ángulo de escora. Proporciona: GM inicial (pendiente en el origen), ángulo de máximo GZ, ángulo de estabilidad nula, estabilidad dinámica (área bajo la curva), ángulo de inmersión de cubierta si se traza."},
      {q:"Defina estabilidad dinámica y cómo se mide.",a:"La estabilidad dinámica es la energía total de adrizamiento disponible. Se mide por el área bajo la curva GZ de 0° al ángulo de estabilidad nula. Representa el trabajo que el buque puede realizar para resistir una perturbación dinámica. Cuanto mayor es el área, más puede resistir el buque antes de zozobrar."},
      {q:"¿Cuáles son los requisitos mínimos de estabilidad OMI para un buque de carga convencional?",a:"Criterios OMI (IS Code 2008): GM inicial ≥ 0,15 m. GZ máximo ≥ 0,20 m a ángulo ≥ 30°. Ángulo de estabilidad nula ≥ 25° tras el máximo. Área bajo GZ de 0° a 30° ≥ 0,055 m·rad. Área de 0° a 40° ≥ 0,090 m·rad. Área de 30° a 40° ≥ 0,030 m·rad."},
      {q:"¿Qué es el lastre y cuál es su papel en la gestión de la estabilidad?",a:"El lastre es agua de mar bombeada a tanques dedicados para ajustar el asiento, el calado y la estabilidad. Función: bajar G llenando los tanques bajos → aumenta GM. Permite ajustar el calado para mantener la hélice sumergida. MARPOL regula la gestión de las aguas de lastre."},
      {q:"Explique la diferencia entre estabilidad inicial y estabilidad a grandes ángulos.",a:"Estabilidad inicial: comportamiento del buque para pequeños ángulos de escora (< 10-15°), caracterizado por GM. Para estos ángulos GZ ≈ GM × sin θ. Estabilidad a grandes ángulos: comportamiento para ángulos importantes. No puede describirse solo por GM — se necesita la curva GZ completa."},
      {q:"¿Qué es el asiento (trim) y cómo afecta a la estabilidad?",a:"El asiento es la diferencia entre el calado de popa y el de proa. Un asiento positivo (popa más hundida) es normal y favorable para la propulsión. Un asiento excesivo puede reducir la estabilidad al modificar la distribución de masas. El buque debe operar siempre dentro de los límites de asiento prescritos."},
      {q:"¿Qué es el francobordo y por qué está relacionado con la estabilidad?",a:"El francobordo es la distancia entre la línea de flotación y la cubierta principal. Determina la reserva de flotabilidad — cuanto mayor es, más puede escorar el buque antes de embarcar agua. La línea de carga de Plimsoll fija el francobordo mínimo legal. Un francobordo insuficiente reduce el ángulo de estabilidad nula."},
      {q:"Defina desplazamiento y distinga entre desplazamiento en rosca y desplazamiento en carga.",a:"El desplazamiento es el peso total del buque igual al peso del volumen de agua desplazado. Desplazamiento en rosca: peso del buque vacío sin carga, combustible ni tripulación. Desplazamiento en carga: peso total en condición de plena carga. La diferencia = Peso muerto (DWT) = capacidad máxima de transporte."},
      {q:"¿Cómo reducen las divisiones longitudinales el efecto de superficie libre en los tanques?",a:"El efecto es proporcional al momento de inercia i de la superficie libre. i = (l × b³) / 12 para un rectángulo. Dividiendo un tanque ancho (b) en dos de anchura b/2 con un mamparo longitudinal central: i_total = (l × b³) / 48, cuatro veces menos que el tanque único. La corrección GG' se divide por 4."},
      {q:"¿Qué es el experimento de estabilidad (inclining experiment) y cuándo se realiza?",a:"Es un ensayo a bordo para determinar experimentalmente KG y GM reales. Procedimiento: desplazar una masa conocida (p) una distancia transversal conocida (d) y medir el ángulo de escora resultante (θ). GM = (p × d) / (Δ × tan θ). Luego KG = KM - GM. Obligatorio en la construcción y tras modificaciones importantes."},
    ],
    pt:[
      {q:"Defina flutuabilidade e explique o princípio de Arquimedes aplicado a um navio.",a:"A flutuabilidade é a força ascendente exercida por um fluido sobre um corpo imerso. Princípio de Arquimedes: todo corpo imerso num fluido recebe uma força vertical para cima igual ao peso do volume de fluido deslocado. Para um navio: Empuxo = ρ × g × V. O navio flutua quando o empuxo iguala o seu peso total."},
      {q:"Qual é a diferença entre KG, KM e GM? Como se calcula GM?",a:"K = quilha (ponto de referência mais baixo). KG = distância vertical da quilha ao centro de gravidade G. KM = distância vertical da quilha ao metacentro M. GM = altura metacêntrica = KM - KG. Se KG < KM: GM positivo → estável. Se KG = KM: GM nulo → neutro. Se KG > KM: GM negativo → instável."},
      {q:"O que é o braço de endireitamento GZ e qual é o seu significado físico?",a:"GZ é a distância horizontal entre o centro de gravidade G e a vertical que passa pelo centro de carena B quando o navio está adernado. Representa o braço do binário de endireitamento (ou tombamento). Se GZ > 0: binário de endireitamento → o navio regressa à vertical. Se GZ = 0: equilíbrio indiferente. Se GZ < 0: binário de tombamento → risco de naufrágio."},
      {q:"Defina o ângulo de estabilidade nula e a sua importância.",a:"O ângulo de estabilidade nula é o ângulo de banda em que GZ volta a ser zero após o seu máximo positivo. A partir desse ângulo, o navio já não consegue endireitar-se por si só. Para um navio convencional, deve ser superior a 60° segundo as normas IMO."},
      {q:"O que é o efeito de superfície livre e como se calcula?",a:"O efeito de superfície livre é a redução virtual de GM causada pelos líquidos em tanques parcialmente cheios. Ao adornar, o líquido desloca-se criando um momento desestabilizador. Correção: GG' = (i × γ_líquido) / Δ. GM corrigido = GM inicial - GG'. Quanto maior i (tanque largo), maior o efeito."},
      {q:"Como afeta a carga em altura a estabilidade? Dê um exemplo concreto.",a:"Carregar massas em altura eleva o centro de gravidade G, reduzindo GM. Exemplo: um porta-contentores carrega contentores cheios na 6ª fila de convés. Cada camada eleva G aproximadamente 2,7 m × massa_adicionada / deslocamento_total. Se G ultrapassa M, o navio torna-se instável. Solução: lastrar os tanques baixos para baixar G."},
      {q:"O que é a curva de estabilidade estática e que informação fornece?",a:"A curva de estabilidade estática (curva GZ) representa o braço de endireitamento GZ em função do ângulo de banda. Fornece: GM inicial (declive na origem), ângulo de GZ máximo, ângulo de estabilidade nula, estabilidade dinâmica (área sob a curva)."},
      {q:"Defina estabilidade dinâmica e como se mede.",a:"A estabilidade dinâmica é a energia total de endireitamento disponível. Mede-se pela área sob a curva GZ do 0° ao ângulo de estabilidade nula. Representa o trabalho que o navio pode realizar para resistir a perturbações dinâmicas."},
      {q:"Quais são os requisitos mínimos de estabilidade IMO para um navio de carga convencional?",a:"Critérios IMO (IS Code 2008): GM inicial ≥ 0,15 m. GZ máximo ≥ 0,20 m a ângulo ≥ 30°. Ângulo de estabilidade nula ≥ 25° após o máximo. Área sob GZ de 0° a 30° ≥ 0,055 m·rad. Área de 0° a 40° ≥ 0,090 m·rad."},
      {q:"O que é o lastro e qual é o seu papel na gestão da estabilidade?",a:"O lastro é água do mar bombeada para tanques dedicados para ajustar o assentamento, o calado e a estabilidade. Papel: baixar G enchendo os tanques baixos → aumenta GM. O MARPOL regula a gestão das águas de lastro."},
      {q:"Explique a diferença entre estabilidade inicial e estabilidade a grandes ângulos.",a:"Estabilidade inicial: comportamento do navio para pequenos ângulos de banda (< 10-15°), caracterizado por GM. Estabilidade a grandes ângulos: não pode ser descrita apenas por GM — é necessária a curva GZ completa."},
      {q:"O que é o assentamento (trim) e como afeta a estabilidade?",a:"O assentamento é a diferença entre o calado de popa e o de proa. Um assentamento positivo (popa mais imersa) é normal. Assentamento excessivo pode reduzir a estabilidade. O navio deve operar sempre dentro dos limites prescritos."},
      {q:"O que é o bordo livre e por que está relacionado com a estabilidade?",a:"O bordo livre é a distância entre a linha de água e o convés principal. Determina a reserva de flutuabilidade. A linha de carga de Plimsoll fixa o bordo livre mínimo legal. Bordo livre insuficiente reduz o ângulo de estabilidade nula."},
      {q:"Defina deslocamento e distinga deslocamento em vazio de deslocamento em carga.",a:"O deslocamento é o peso total do navio igual ao peso do volume de água deslocado. Deslocamento em vazio: peso do navio vazio sem carga, combustível nem tripulação. Deslocamento em carga: peso total em condição de carga completa. A diferença = Arqueação de Porte Bruto (DWT)."},
      {q:"Como as divisões longitudinais reduzem o efeito de superfície livre nos tanques?",a:"O efeito é proporcional ao momento de inércia i da superfície livre. i = (l × b³) / 12. Dividindo um tanque largo (b) em dois de largura b/2 com uma antepara longitudinal central: i_total = (l × b³) / 48, quatro vezes menos. A correção GG' é dividida por 4."},
      {q:"O que é a experiência de estabilidade e quando é realizada?",a:"É um ensaio a bordo para determinar experimentalmente KG e GM reais. Procedimento: deslocar uma massa conhecida (p) uma distância transversal conhecida (d) e medir o ângulo de banda resultante (θ). GM = (p × d) / (Δ × tan θ). Obrigatória na construção e após modificações importantes."},
    ],
  };
  return banks[lang]||banks.fr;
}

function getQuiz(lang: string) {
  const quizzes: any = {
    fr:[
      {q:"Un navire a KG = 6,8 m et KM = 8,1 m. Quelle est la valeur de GM et quel est l'état de stabilité ?",opts:["GM = -1,3 m — instable","GM = 1,3 m — stable","GM = 14,9 m — raide","GM = 0 m — neutre"],correct:1,exp:"GM = KM - KG = 8,1 - 6,8 = 1,3 m. GM positif → G est en dessous de M → le navire est stable. Un GM de 1,3 m est une valeur normale et confortable pour la plupart des navires de commerce."},
      {q:"Qu'est-ce que l'effet de surface libre ?",opts:["La résistance de l'eau à l'avancement du navire","La réduction virtuelle de GM causée par des liquides dans des citernes partiellement remplies","L'augmentation du franc-bord en eau libre","L'effet du vent sur la surface du navire"],correct:1,exp:"L'effet de surface libre est la réduction virtuelle de GM causée par le déplacement latéral des liquides dans les citernes partiellement remplies lors de la gîte. Il aggrave la stabilité et peut rendre un navire mou ou instable."},
      {q:"Lorsque le bras de levier GZ est négatif, que se passe-t-il ?",opts:["Le navire se redresse rapidement","Le navire est en équilibre stable","Le navire continue à gîter et risque de chavirer","Le navire ralentit"],correct:2,exp:"Quand GZ est négatif, le couple créé est chavirant (et non redressant). Le navire continue à gîter dans la même direction au lieu de revenir à la verticale — risque de chavirage immédiat."},
      {q:"Quelle action réduit le plus efficacement l'effet de surface libre dans une citerne ?",opts:["Ajouter plus de liquide jusqu'à 80% de remplissage","Remplir ou vider complètement la citerne","Augmenter la vitesse du navire","Ballaster les citernes hautes"],correct:1,exp:"Remplir ou vider complètement une citerne supprime la surface libre — il n'y a plus de liquide pouvant se déplacer latéralement. Un remplissage à 80% laisse encore une grande surface libre. Les citernes à 100% ou à 0% n'ont pas d'effet de surface libre."},
      {q:"Selon les critères IMO (IS Code 2008), quelle est la valeur minimale de GM initial requise ?",opts:["0,05 m","0,10 m","0,15 m","0,25 m"],correct:2,exp:"Le IS Code 2008 de l'IMO exige un GM initial ≥ 0,15 m dans toutes les conditions de chargement. Cette valeur garantit une stabilité positive minimale même dans des conditions de chargement difficiles."},
    ],
    en:[
      {q:"A vessel has KG = 6.8 m and KM = 8.1 m. What is the value of GM and what is the stability state?",opts:["GM = -1.3 m — unstable","GM = 1.3 m — stable","GM = 14.9 m — stiff","GM = 0 m — neutral"],correct:1,exp:"GM = KM - KG = 8.1 - 6.8 = 1.3 m. Positive GM → G is below M → vessel is stable. A GM of 1.3 m is a normal, comfortable value for most commercial vessels."},
      {q:"What is the free surface effect?",opts:["Water resistance to the vessel's forward motion","Virtual reduction of GM caused by liquids in partially filled tanks","Increase in freeboard in open water","Effect of wind on the vessel's surface"],correct:1,exp:"The free surface effect is the virtual reduction of GM caused by the lateral shift of liquids in partially filled tanks when the vessel heels. It worsens stability and can make a vessel tender or unstable."},
      {q:"When the righting lever GZ is negative, what happens?",opts:["The vessel rights itself quickly","The vessel is in stable equilibrium","The vessel continues heeling and risks capsizing","The vessel slows down"],correct:2,exp:"When GZ is negative, the couple created is a capsizing couple (not a righting one). The vessel continues to heel in the same direction instead of returning upright — immediate capsize risk."},
      {q:"Which action most effectively reduces the free surface effect in a tank?",opts:["Add more liquid to 80% fill","Fill or empty the tank completely","Increase vessel speed","Ballast high tanks"],correct:1,exp:"Filling or emptying a tank completely eliminates the free surface — there is no longer any liquid that can shift laterally. 80% fill still leaves a large free surface. Tanks at 100% or 0% have no free surface effect."},
      {q:"According to IMO criteria (IS Code 2008), what is the minimum required initial GM?",opts:["0.05 m","0.10 m","0.15 m","0.25 m"],correct:2,exp:"The IMO IS Code 2008 requires initial GM ≥ 0.15 m in all loading conditions. This value guarantees minimum positive stability even in difficult loading conditions."},
    ],
    es:[
      {q:"Un buque tiene KG = 6,8 m y KM = 8,1 m. ¿Cuál es el valor de GM y cuál es el estado de estabilidad?",opts:["GM = -1,3 m — inestable","GM = 1,3 m — estable","GM = 14,9 m — rígido","GM = 0 m — neutro"],correct:1,exp:"GM = KM - KG = 8,1 - 6,8 = 1,3 m. GM positivo → G por debajo de M → el buque es estable. Un GM de 1,3 m es un valor normal y cómodo para la mayoría de buques de comercio."},
      {q:"¿Qué es el efecto de superficie libre?",opts:["La resistencia del agua al avance del buque","La reducción virtual de GM causada por líquidos en tanques parcialmente llenos","El aumento del francobordo en aguas libres","El efecto del viento sobre la superficie del buque"],correct:1,exp:"El efecto de superficie libre es la reducción virtual de GM causada por el desplazamiento lateral de los líquidos en los tanques parcialmente llenos al escorar. Empeora la estabilidad y puede hacer el buque blando o inestable."},
      {q:"Cuando el brazo adrizante GZ es negativo, ¿qué ocurre?",opts:["El buque adriza rápidamente","El buque está en equilibrio estable","El buque continúa escorando y arriesga zozobrar","El buque frena"],correct:2,exp:"Cuando GZ es negativo, el par creado es zozobrante (no adrizante). El buque continúa escorando en la misma dirección en lugar de volver a la vertical — riesgo inmediato de zozobra."},
      {q:"¿Qué acción reduce más eficazmente el efecto de superficie libre en un tanque?",opts:["Añadir más líquido hasta el 80% de llenado","Llenar o vaciar completamente el tanque","Aumentar la velocidad del buque","Lastrar los tanques altos"],correct:1,exp:"Llenar o vaciar completamente un tanque suprime la superficie libre. Un llenado al 80% deja aún una gran superficie libre. Los tanques al 100% o al 0% no tienen efecto de superficie libre."},
      {q:"Según los criterios OMI (IS Code 2008), ¿cuál es el valor mínimo requerido de GM inicial?",opts:["0,05 m","0,10 m","0,15 m","0,25 m"],correct:2,exp:"El IS Code 2008 de la OMI exige GM inicial ≥ 0,15 m en todas las condiciones de carga. Este valor garantiza una estabilidad positiva mínima incluso en condiciones de carga difíciles."},
    ],
    pt:[
      {q:"Um navio tem KG = 6,8 m e KM = 8,1 m. Qual é o valor de GM e qual é o estado de estabilidade?",opts:["GM = -1,3 m — instável","GM = 1,3 m — estável","GM = 14,9 m — rígido","GM = 0 m — neutro"],correct:1,exp:"GM = KM - KG = 8,1 - 6,8 = 1,3 m. GM positivo → G abaixo de M → navio estável. Um GM de 1,3 m é um valor normal e confortável para a maioria dos navios de comércio."},
      {q:"O que é o efeito de superfície livre?",opts:["A resistência da água ao avanço do navio","A redução virtual de GM causada por líquidos em tanques parcialmente cheios","O aumento do bordo livre em águas livres","O efeito do vento na superfície do navio"],correct:1,exp:"O efeito de superfície livre é a redução virtual de GM causada pelo deslocamento lateral dos líquidos nos tanques parcialmente cheios ao adornar. Piora a estabilidade e pode tornar o navio mole ou instável."},
      {q:"Quando o braço de endireitamento GZ é negativo, o que acontece?",opts:["O navio endireita-se rapidamente","O navio está em equilíbrio estável","O navio continua a adornar e arrisca tombar","O navio abranda"],correct:2,exp:"Quando GZ é negativo, o binário criado é de tombamento (não de endireitamento). O navio continua a adornar na mesma direção em vez de regressar à vertical — risco imediato de tombamento."},
      {q:"Que ação reduz mais eficazmente o efeito de superfície livre num tanque?",opts:["Adicionar mais líquido até 80% de enchimento","Encher ou esvaziar completamente o tanque","Aumentar a velocidade do navio","Lastrar os tanques altos"],correct:1,exp:"Encher ou esvaziar completamente um tanque suprime a superfície livre. Um enchimento a 80% ainda deixa uma grande superfície livre. Tanques a 100% ou 0% não têm efeito de superfície livre."},
      {q:"Segundo os critérios IMO (IS Code 2008), qual é o valor mínimo de GM inicial exigido?",opts:["0,05 m","0,10 m","0,15 m","0,25 m"],correct:2,exp:"O IS Code 2008 da IMO exige GM inicial ≥ 0,15 m em todas as condições de carregamento. Este valor garante estabilidade positiva mínima mesmo em condições de carregamento difíceis."},
    ],
  };
  return quizzes[lang]||quizzes.fr;
}

function BankTab({ lang }: { lang: string }) {
  const bank=getBank(lang);
  const [open,setOpen]=useState<number|null>(null);
  const [showAns,setShowAns]=useState<Record<number,boolean>>({});
  const L:any={fr:{title:"Banque de questions",show:"Voir la réponse",hide:"Masquer"},en:{title:"Question Bank",show:"Show answer",hide:"Hide"},es:{title:"Banco de preguntas",show:"Ver respuesta",hide:"Ocultar"},pt:{title:"Banco de questões",show:"Ver resposta",hide:"Ocultar"}};
  const l=L[lang]||L.fr;
  return (
    <div style={{padding:"14px 14px 24px"}}>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.gold,marginBottom:14}}>📚 {l.title}</div>
      {bank.map((item:any,i:number)=>(
        <div key={i} style={{marginBottom:8,borderRadius:12,background:`${C.navy2}cc`,border:`1px solid ${C.meta}22`,overflow:"hidden"}}>
          <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",padding:"12px 14px",background:"none",border:"none",display:"flex",justifyContent:"space-between",alignItems:"flex-start",cursor:"pointer",textAlign:"left",gap:10}}>
            <span style={{fontSize:12,color:"rgba(240,244,255,0.8)",fontFamily:"Courier New",lineHeight:1.5}}><span style={{color:C.meta,fontWeight:700,marginRight:6}}>Q{i+1}.</span>{item.q}</span>
            <span style={{color:C.meta,fontSize:14,flexShrink:0}}>{open===i?"▲":"▼"}</span>
          </button>
          {open===i&&(
            <div style={{padding:"0 14px 12px"}}>
              <button onClick={()=>setShowAns(p=>({...p,[i]:!p[i]}))} style={{padding:"6px 12px",borderRadius:8,fontSize:10,cursor:"pointer",background:showAns[i]?`${C.meta}22`:"rgba(255,255,255,0.05)",border:`1px solid ${showAns[i]?C.meta:"rgba(255,255,255,0.12)"}`,color:showAns[i]?C.meta:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{showAns[i]?l.hide:l.show}</button>
              {showAns[i]&&<div style={{marginTop:8,padding:10,borderRadius:8,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.meta}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{item.a}</div>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function QuizTab({ lang, onComplete }:{ lang:string; onComplete:(xp:number)=>void }) {
  const quiz=getQuiz(lang);
  const [cur,setCur]=useState(0);
  const [selected,setSelected]=useState<number|null>(null);
  const [confirmed,setConfirmed]=useState(false);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);
  const t=T[lang]||T.fr;
  const L:any={fr:{submit:"Valider",next:"Suivant →",finish:"Terminer",correct:"✅ Correct !",wrong:"❌ Incorrect",xpLabel:"XP obtenus",summary:"Tu as appris",retry:"Recommencer"},en:{submit:"Submit",next:"Next →",finish:"Finish",correct:"✅ Correct!",wrong:"❌ Incorrect",xpLabel:"XP earned",summary:"You learned",retry:"Retry"},es:{submit:"Validar",next:"Siguiente →",finish:"Terminar",correct:"✅ ¡Correcto!",wrong:"❌ Incorrecto",xpLabel:"XP obtenidos",summary:"Aprendiste",retry:"Reintentar"},pt:{submit:"Validar",next:"Seguinte →",finish:"Terminar",correct:"✅ Correto!",wrong:"❌ Incorreto",xpLabel:"XP obtidos",summary:"Você aprendeu",retry:"Recomeçar"}};
  const l=L[lang]||L.fr;
  const xpMap:Record<number,number>={5:200,4:180,3:120};
  const xp=xpMap[score]||60;
  const optColors=[C.water,C.meta,C.safe,C.grav];

  if(done) return (
    <div style={{padding:"24px 14px"}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:36,fontWeight:900,color:C.gold2,marginBottom:4}}>{xp}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{l.xpLabel}</div>
        <div style={{marginTop:8,fontSize:14,color:"#f0f4ff",fontFamily:"Courier New"}}>Score : {score}/{quiz.length}</div>
      </div>
      <div style={{borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.gold}44`,padding:14,marginBottom:16}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:11,color:C.gold,marginBottom:10}}>✦ {l.summary}</div>
        {t.kp.map((k:string,i:number)=>(
          <div key={i} style={{display:"flex",gap:8,marginBottom:6,fontSize:11,color:"rgba(240,244,255,0.7)",fontFamily:"Courier New",lineHeight:1.5}}>
            <span style={{color:C.gold,flexShrink:0}}>✦</span><span>{k}</span>
          </div>
        ))}
      </div>
      <div style={{padding:10,borderRadius:10,marginBottom:14,background:"rgba(74,222,128,0.06)",border:"1px solid rgba(74,222,128,0.3)",fontSize:12,color:"#e0e8ff",fontFamily:"Courier New",textAlign:"center"}}>
        🏆 Module Seamanship complété !
      </div>
      <button onClick={()=>onComplete(xp)} style={{width:"100%",padding:"15px 0",border:"none",borderRadius:14,background:"linear-gradient(135deg,#c9922a,#e8b94f)",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:"#060e1a",cursor:"pointer"}}>⚓ {l.finish}</button>
      <button onClick={()=>{setCur(0);setSelected(null);setConfirmed(false);setScore(0);setDone(false);}} style={{width:"100%",padding:"12px 0",marginTop:8,border:"1px solid rgba(255,255,255,0.12)",borderRadius:14,background:"none",color:"rgba(240,244,255,0.45)",fontSize:12,cursor:"pointer",fontFamily:"Courier New"}}>{l.retry}</button>
    </div>
  );

  const q=quiz[cur];
  const isCorrect=selected===q.correct;
  const handleConfirm=()=>{if(selected===null)return;setConfirmed(true);if(isCorrect)setScore(s=>s+1);};
  const handleNext=()=>{if(cur+1>=quiz.length){setDone(true);return;}setCur(c=>c+1);setSelected(null);setConfirmed(false);};

  return (
    <div style={{padding:"14px 14px 24px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style={{fontSize:11,color:"rgba(240,244,255,0.4)",fontFamily:"Courier New"}}>Q{cur+1}/{quiz.length}</div>
        <div style={{fontSize:11,color:C.gold2,fontFamily:"Courier New"}}>⭐ {score}/{quiz.length}</div>
      </div>
      <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",marginBottom:14}}>
        <div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C.meta},${C.gold})`,width:`${(cur/quiz.length)*100}%`,transition:"width 0.4s"}}/>
      </div>
      <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New",marginBottom:16,padding:12,borderRadius:10,background:`${C.navy2}cc`,border:`1px solid ${C.meta}22`}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
        {q.opts.map((opt:string,i:number)=>{
          let border=`1px solid ${optColors[i]}44`,bg=`${optColors[i]}11`;
          if(confirmed){if(i===q.correct){border="2px solid #4ade80";bg="rgba(74,222,128,0.12)";}else if(i===selected&&!isCorrect){border="2px solid #ef4444";bg="rgba(239,68,68,0.12)";}}
          else if(selected===i){border=`2px solid ${optColors[i]}`;bg=`${optColors[i]}22`;}
          return(
            <button key={i} disabled={confirmed} onClick={()=>setSelected(i)} style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",borderRadius:12,border,background:bg,cursor:confirmed?"default":"pointer",color:"#f0f4ff",textAlign:"left"}}>
              <span style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:optColors[i],flexShrink:0}}>{String.fromCharCode(65+i)}</span>
              <span style={{fontSize:12,fontFamily:"Courier New",lineHeight:1.4}}>{opt}</span>
            </button>
          );
        })}
      </div>
      {confirmed&&<div style={{padding:10,borderRadius:10,marginBottom:12,background:isCorrect?"rgba(74,222,128,0.08)":"rgba(239,68,68,0.08)",border:`1px solid ${isCorrect?"#4ade80":"#ef4444"}44`,fontSize:12,color:"rgba(240,244,255,0.8)",fontFamily:"Courier New",lineHeight:1.6}}><div style={{fontWeight:700,marginBottom:4,color:isCorrect?"#4ade80":"#ef4444"}}>{isCorrect?l.correct:l.wrong}</div>{q.exp}</div>}
      {!confirmed
        ?<button onClick={handleConfirm} disabled={selected===null} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:selected!==null?`linear-gradient(135deg,${C.meta},${C.gold})`:"rgba(255,255,255,0.06)",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:selected!==null?"#060e1a":"rgba(240,244,255,0.25)",cursor:selected!==null?"pointer":"default",letterSpacing:1}}>{l.submit}</button>
        :<button onClick={handleNext} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.meta},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:"#060e1a",cursor:"pointer",letterSpacing:1}}>{cur+1>=quiz.length?l.finish:l.next}</button>
      }
    </div>
  );
}

export default function LessonSEA_L5({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t=T[lang]||T.fr;
  const [tab,setTab]=useState(0);
  const progress=[25,50,75,90][tab]||25;
  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3},${C.navy})`,color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.meta}33`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"6px 12px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>◀</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:2,color:C.meta,marginBottom:2}}>{t.moduleLabel} · L5</div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:"#f0f4ff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.lessonTitle}</div>
          </div>
          <div style={{fontSize:11,color:C.gold2,fontFamily:"Courier New",flexShrink:0}}>{progress}%</div>
        </div>
        <div style={{height:2,background:"rgba(255,255,255,0.06)"}}>
          <div style={{height:"100%",background:`linear-gradient(90deg,${C.meta},${C.gold})`,width:`${progress}%`,transition:"width 0.4s"}}/>
        </div>
      </div>
      <div style={{padding:"10px 14px 0"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:8,background:`${C.gold}18`,border:`1px solid ${C.gold}44`}}>
          <span style={{fontSize:12}}>⚓</span>
          <span style={{fontFamily:"'Cinzel',serif",fontSize:9,color:C.gold,letterSpacing:1}}>SEAMANSHIP · PREMIUM</span>
        </div>
      </div>
      <div style={{display:"flex",padding:"10px 14px 0",gap:6,overflowX:"auto"}}>
        {t.tabs.map((label:string,i:number)=>(
          <button key={i} onClick={()=>setTab(i)} style={{padding:"8px 12px",borderRadius:10,fontSize:11,cursor:"pointer",whiteSpace:"nowrap",background:tab===i?`${C.meta}22`:"rgba(255,255,255,0.04)",border:`1px solid ${tab===i?C.meta:"rgba(255,255,255,0.1)"}`,color:tab===i?C.meta:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{label}</button>
        ))}
      </div>
      <div>
        {tab===0&&<ContentTab lang={lang}/>}
        {tab===1&&<PracticeTab lang={lang}/>}
        {tab===2&&<BankTab lang={lang}/>}
        {tab===3&&<QuizTab lang={lang} onComplete={(xp)=>{if(onComplete)onComplete(xp);}}/>}
      </div>
    </div>
  );
}
