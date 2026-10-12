/* =====================================================================
   Test "¿Qué elemento controlarías?" — contenido y reglas.

   MODELO
   Cada elemento se mide con dos rasgos (inspirados en los Cinco Grandes
   y en la teoría de valores de Schwartz):
     Agua   → AD Adaptabilidad · VI Vínculo
     Tierra → CO Constancia    · AR Arraigo
     Fuego  → IM Impulso       · IN Intensidad
     Aire   → AP Apertura      · LI Libertad
   Además, MB (maestro / no maestro): cómo enfrentas el mundo, desde la
   intuición y el cuerpo (maestro) o desde el método y las herramientas
   (no maestro). No es mejor ni peor.

   TIPOS DE PREGUNTA
   - "l": afirmación con escala 1 a 5. "inv": true = puntaje invertido.
   - "p": par de afirmaciones igual de deseables; la elegida suma a su rasgo.
   Las preguntas hablan de tu conducta real y reciente, no de escenarios.

   Si cambias preguntas, mantén 5 afirmaciones por rasgo y 2 apariciones
   de cada rasgo en los pares, para que todos pesen lo mismo.
   ===================================================================== */
window.ELEM_DATA = {

FACETS: {
  AD: { el: "water", es: "Adaptabilidad", en: "Adaptability" },
  VI: { el: "water", es: "Vínculo",       en: "Connection" },
  CO: { el: "earth", es: "Constancia",    en: "Steadiness" },
  AR: { el: "earth", es: "Arraigo",       en: "Rootedness" },
  IM: { el: "fire",  es: "Impulso",       en: "Drive" },
  IN: { el: "fire",  es: "Intensidad",    en: "Intensity" },
  AP: { el: "air",   es: "Apertura",      en: "Openness" },
  LI: { el: "air",   es: "Libertad",      en: "Freedom" }
},

/* Etapas del recorrido: cada una abre con una pantalla breve. */
STAGES: [
  { es: { t: "Cómo te mueves",      d: "Sobre tus hábitos y tu forma de avanzar día a día." },
    en: { t: "How you move",        d: "About your habits and the way you move forward each day." } },
  { es: { t: "Cómo te vinculas",    d: "Sobre las personas que te rodean y lo que te importa de ellas." },
    en: { t: "How you connect",     d: "About the people around you and what matters to you about them." } },
  { es: { t: "Qué te enciende",     d: "Sobre lo que te motiva, te apasiona o te inquieta." },
    en: { t: "What lights you up",  d: "About what drives you, excites you or unsettles you." } },
  { es: { t: "Cómo sueltas",        d: "Sobre el cambio, lo nuevo y lo que dejas ir." },
    en: { t: "How you let go",      d: "About change, the new and what you let go of." } }
],

/* Preguntas en el orden en que se muestran. "s" = etapa (0 a 3). */
ITEMS: [
  // ---------- Etapa 1: Cómo te mueves ----------
  { id:"co1", s:0, t:"l", f:"CO", es:"Termino lo que empiezo, aunque haya perdido la motivación.", en:"I finish what I start, even after I've lost motivation." },
  { id:"ad1", s:0, t:"l", f:"AD", es:"Cuando un plan se cae a última hora, me reacomodo sin mucho drama.", en:"When a plan falls through at the last minute, I readjust without much drama." },
  { id:"mb1", s:0, t:"l", f:"MB", es:"Muchas veces sé qué hacer antes de poder explicar por qué.", en:"I often know what to do before I can explain why." },
  { id:"im1", s:0, t:"l", f:"IM", es:"Me pongo metas exigentes y me molesta no alcanzarlas.", en:"I set demanding goals and it bothers me when I don't reach them." },
  { id:"co2", s:0, t:"l", f:"CO", es:"Tengo rutinas que mantengo incluso en semanas difíciles.", en:"I have routines I keep even during hard weeks." },
  { id:"p1",  s:0, t:"p", a:{ f:"AD", es:"Me adapto a lo que venga.", en:"I adapt to whatever comes." }, b:{ f:"CO", es:"Sigo mi plan aunque cueste.", en:"I stick to my plan even when it's hard." } },
  { id:"ad2", s:0, t:"l", f:"AD", inv:true, es:"Me cuesta funcionar cuando cambian las reglas a mitad de camino.", en:"I struggle to function when the rules change halfway through." },
  { id:"mb2", s:0, t:"l", f:"MB", inv:true, es:"Antes de actuar, necesito entender bien cómo funciona el problema.", en:"Before acting, I need to understand how the problem works." },
  { id:"co3", s:0, t:"l", f:"CO", inv:true, es:"Dejo tareas a medias cuando aparece algo más interesante.", en:"I leave tasks half-done when something more interesting comes up." },
  { id:"ap1", s:0, t:"l", f:"AP", es:"Busco aprender cosas que no tienen nada que ver con lo que estudio o trabajo.", en:"I seek out things to learn that have nothing to do with my studies or work." },
  { id:"p5",  s:0, t:"p", a:{ f:"IN", es:"Avanzo con fuerza, a ráfagas.", en:"I push forward hard, in bursts." }, b:{ f:"CO", es:"Avanzo despacio, pero sin parar.", en:"I move slowly, but I never stop." } },
  { id:"mb3", s:0, t:"l", f:"MB", es:"Pienso mejor cuando estoy en movimiento: caminando, haciendo deporte o con las manos ocupadas.", en:"I think best when I'm moving: walking, exercising or keeping my hands busy." },
  { id:"ad3", s:0, t:"l", f:"AD", es:"Si algo no resulta, pruebo otra forma antes que insistir con la misma.", en:"If something doesn't work, I try another way instead of insisting on the same one." },

  // ---------- Etapa 2: Cómo te vinculas ----------
  { id:"vi1", s:1, t:"l", f:"VI", es:"Suelo notar cómo se siente alguien antes de que me lo diga.", en:"I usually notice how someone feels before they tell me." },
  { id:"ar1", s:1, t:"l", f:"AR", es:"Me siento en paz en lugares y con personas que conozco hace años.", en:"I feel at peace in places and with people I've known for years." },
  { id:"in1", s:1, t:"l", f:"IN", es:"Cuando algo me parece injusto, lo digo, aunque incomode.", en:"When something seems unfair to me, I say so, even if it makes things awkward." },
  { id:"co4", s:1, t:"l", f:"CO", es:"Cuando me comprometo con algo, la gente sabe que puede contar conmigo.", en:"When I commit to something, people know they can count on me." },
  { id:"p2",  s:1, t:"p", a:{ f:"VI", es:"Me importa más cómo están los demás.", en:"I care more about how others are doing." }, b:{ f:"IM", es:"Me importa más avanzar en lo mío.", en:"I care more about moving forward with my own things." } },
  { id:"vi2", s:1, t:"l", f:"VI", es:"Me hago el tiempo para estar presente cuando alguien cercano me necesita.", en:"I make time to be there when someone close to me needs me." },
  { id:"ad4", s:1, t:"l", f:"AD", es:"Ajusto mi forma de hablar según con quién estoy.", en:"I adjust the way I talk depending on who I'm with." },
  { id:"ar2", s:1, t:"l", f:"AR", es:"Las tradiciones de mi familia o de mi comunidad son importantes para mí.", en:"The traditions of my family or community are important to me." },
  { id:"vi3", s:1, t:"l", f:"VI", inv:true, es:"A veces me doy cuenta tarde de que alguien cercano estaba mal.", en:"Sometimes I realize too late that someone close to me was struggling." },
  { id:"in2", s:1, t:"l", f:"IN", inv:true, es:"Me guardo lo que pienso para evitar conflictos.", en:"I keep my thoughts to myself to avoid conflict." },
  { id:"p8",  s:1, t:"p", a:{ f:"VI", es:"Prefiero un grupo pequeño y unido.", en:"I prefer a small, close-knit group." }, b:{ f:"AD", es:"Me muevo bien entre grupos distintos.", en:"I move easily between different groups." } },
  { id:"ar3", s:1, t:"l", f:"AR", es:"Mi lealtad hacia mis personas es difícil de quebrar.", en:"My loyalty to my people is hard to break." },
  { id:"vi4", s:1, t:"l", f:"VI", es:"Los problemas de mis cercanos me afectan casi como si fueran míos.", en:"The problems of the people close to me affect me almost as if they were mine." },
  { id:"li1", s:1, t:"l", f:"LI", es:"Necesito tiempo y espacio propios para estar bien.", en:"I need time and space of my own to feel okay." },

  // ---------- Etapa 3: Qué te enciende ----------
  { id:"im2", s:2, t:"l", f:"IM", es:"Me motiva compararme con otros y superarme.", en:"Comparing myself to others and doing better motivates me." },
  { id:"in3", s:2, t:"l", f:"IN", es:"Mis emociones se notan; me cuesta disimular lo que siento.", en:"My emotions show; I find it hard to hide what I feel." },
  { id:"mb4", s:2, t:"l", f:"MB", inv:true, es:"Para resolver algo, prefiero construir o conseguir la herramienta adecuada.", en:"To solve something, I prefer to build or get the right tool." },
  { id:"im3", s:2, t:"l", f:"IM", es:"Cuando quiero algo, tomo la iniciativa en vez de esperar.", en:"When I want something, I take the initiative instead of waiting." },
  { id:"p6",  s:2, t:"p", a:{ f:"AP", es:"Hago muchas preguntas.", en:"I ask a lot of questions." }, b:{ f:"IM", es:"Busco resultados concretos.", en:"I look for concrete results." } },
  { id:"in4", s:2, t:"l", f:"IN", es:"En una discusión, defiendo mi postura con fuerza.", en:"In an argument, I defend my position forcefully." },
  { id:"vi5", s:2, t:"l", f:"VI", es:"Disfruto cuidar a otras personas, aunque nadie me lo reconozca.", en:"I enjoy taking care of others, even when nobody acknowledges it." },
  { id:"im4", s:2, t:"l", f:"IM", inv:true, es:"Me conformo con facilidad con hacer las cosas «suficientemente bien».", en:"I'm easily satisfied with doing things \"well enough\"." },
  { id:"mb5", s:2, t:"l", f:"MB", es:"Noto en mi cuerpo cómo me siento (tensión, energía, cansancio) antes que en mis pensamientos.", en:"I notice how I feel in my body (tension, energy, tiredness) before I notice it in my thoughts." },
  { id:"in5", s:2, t:"l", f:"IN", es:"Cuando algo me apasiona, le pongo una energía que sorprende a otros.", en:"When I'm passionate about something, I put in an energy that surprises others." },
  { id:"p4",  s:2, t:"p", a:{ f:"LI", es:"Cuando algo me molesta, prefiero tomar distancia.", en:"When something bothers me, I prefer to step away." }, b:{ f:"IN", es:"Cuando algo me molesta, prefiero enfrentarlo.", en:"When something bothers me, I prefer to face it." } },
  { id:"im5", s:2, t:"l", f:"IM", es:"Pienso a menudo en lo que quiero lograr en los próximos años.", en:"I often think about what I want to achieve in the coming years." },
  { id:"co5", s:2, t:"l", f:"CO", inv:true, es:"Me cuesta sostener un hábito por más de unas semanas.", en:"I find it hard to keep a habit for more than a few weeks." },

  // ---------- Etapa 4: Cómo sueltas ----------
  { id:"ap2", s:3, t:"l", f:"AP", es:"Me atraen las ideas raras o distintas, aunque no las entienda del todo.", en:"I'm drawn to strange or different ideas, even if I don't fully understand them." },
  { id:"li2", s:3, t:"l", f:"LI", inv:true, es:"Me cuesta soltar cosas, lugares o personas aunque ya no me hagan bien.", en:"I find it hard to let go of things, places or people even when they're no longer good for me." },
  { id:"ar4", s:3, t:"l", f:"AR", inv:true, es:"Me mudaría a otra ciudad sin pensarlo mucho.", en:"I'd move to another city without thinking much about it." },
  { id:"p3",  s:3, t:"p", a:{ f:"AP", es:"Me entusiasma lo nuevo.", en:"New things excite me." }, b:{ f:"AR", es:"Me reconforta lo conocido.", en:"Familiar things comfort me." } },
  { id:"ap3", s:3, t:"l", f:"AP", es:"Me aburro rápido con lo conocido.", en:"I get bored quickly with the familiar." },
  { id:"li3", s:3, t:"l", f:"LI", es:"Me incomoda que otros decidan por mí, aunque tengan buenas intenciones.", en:"I'm uncomfortable when others decide for me, even with good intentions." },
  { id:"mb6", s:3, t:"l", f:"MB", inv:true, es:"Confío más en un buen plan que en mi intuición.", en:"I trust a good plan more than my intuition." },
  { id:"ad5", s:3, t:"l", f:"AD", inv:true, es:"Cuando me corrigen, me cuesta cambiar lo que ya había decidido.", en:"When I'm corrected, I find it hard to change what I'd already decided." },
  { id:"ap4", s:3, t:"l", f:"AP", inv:true, es:"Prefiero lo probado antes que experimentar.", en:"I prefer what's proven over experimenting." },
  { id:"p7",  s:3, t:"p", a:{ f:"AR", es:"Mi lugar es donde están mis raíces.", en:"My place is where my roots are." }, b:{ f:"LI", es:"Mi lugar es donde me siento libre.", en:"My place is where I feel free." } },
  { id:"li4", s:3, t:"l", f:"LI", es:"Cuando algo termina, lo suelto y sigo adelante con relativa facilidad.", en:"When something ends, I let it go and move on fairly easily." },
  { id:"ar5", s:3, t:"l", f:"AR", es:"Antes de tomar una decisión grande, necesito sentir que piso terreno seguro.", en:"Before making a big decision, I need to feel I'm on solid ground." },
  { id:"ap5", s:3, t:"l", f:"AP", es:"Disfruto preguntarme el porqué de cosas que otros dan por sentadas.", en:"I enjoy wondering why about things others take for granted." },
  { id:"li5", s:3, t:"l", f:"LI", es:"Me siento atrapado/a cuando tengo demasiadas obligaciones fijas.", en:"I feel trapped when I have too many fixed obligations." }
],

/* Cuánto suma elegir una opción en un par (sobre una escala de 0 a 1). */
PAIR_BONUS: 0.08,

ELEMENTS: {
  water: {
    es: { name:"Agua", lede:"Fluyes. Te adaptas a la forma de lo que te rodea y sostienes a los tuyos.",
          strength:"Lees a las personas, te acomodas a lo inesperado y cuidas los vínculos que te importan. Como el agua, cedes sin dejar de avanzar.",
          shadow:"Puedes adaptarte tanto a los demás que pierdes de vista lo que tú quieres, o cargar con problemas que no te corresponden.",
          cultivate:"Practica escuchar sin intentar resolver, pedir ayuda cuando la necesitas y dejar que tus planes cambien sin sentir que pierdes el control." },
    en: { name:"Water", lede:"You flow. You take the shape of what surrounds you and hold your people close.",
          strength:"You read people, adjust to the unexpected and care for the bonds that matter to you. Like water, you yield without stopping.",
          shadow:"You may adapt to others so much that you lose sight of what you want, or carry problems that aren't yours.",
          cultivate:"Practice listening without trying to fix, asking for help when you need it and letting your plans change without feeling you're losing control." }
  },
  earth: {
    es: { name:"Tierra", lede:"Resistes. Eres terreno firme para ti y para quienes te rodean.",
          strength:"Eres constante, cumples lo que prometes y valoras tus raíces. La gente sabe dónde encontrarte y cuenta contigo.",
          shadow:"Puedes aferrarte a lo conocido aunque ya no funcione, o volverte terco cuando algo te obliga a cambiar.",
          cultivate:"Practica sostener un hábito pequeño todos los días, cumplir un compromiso aunque se acabe la motivación y valorar lo que te da raíces." },
    en: { name:"Earth", lede:"You endure. You're solid ground for yourself and for those around you.",
          strength:"You're steady, you keep your promises and you value your roots. People know where to find you and can count on you.",
          shadow:"You may cling to the familiar even when it no longer works, or turn stubborn when something forces you to change.",
          cultivate:"Practice keeping one small habit every day, following through on a commitment after the motivation fades and valuing what grounds you." }
  },
  fire: {
    es: { name:"Fuego", lede:"Ardes. Tienes una energía que empuja, defiende y transforma.",
          strength:"Tienes iniciativa, metas claras y la valentía de decir lo que piensas. Cuando algo te importa, lo das todo.",
          shadow:"Esa misma energía puede quemar: impaciencia, competencia excesiva o reacciones que después lamentas.",
          cultivate:"Practica proponerte una meta concreta, defender tu opinión con calma y canalizar la rabia en acción en vez de guardarla." },
    en: { name:"Fire", lede:"You burn. You have an energy that drives, defends and transforms.",
          strength:"You take initiative, set clear goals and have the courage to speak your mind. When something matters to you, you give it everything.",
          shadow:"That same energy can scorch: impatience, too much competition or reactions you regret later.",
          cultivate:"Practice setting one concrete goal, defending your opinion calmly and channeling anger into action instead of bottling it up." }
  },
  air: {
    es: { name:"Aire", lede:"Te elevas. Buscas lo nuevo y necesitas espacio para ser quien eres.",
          strength:"Tienes curiosidad, piensas distinto y sabes soltar lo que te ata. Ves posibilidades donde otros ven límites.",
          shadow:"Tu desapego puede parecer indiferencia, y tu necesidad de libertad puede hacer que evites compromisos o conflictos.",
          cultivate:"Practica probar algo nuevo sin buscarle utilidad, soltar lo que ya no te hace bien y regalarte espacio propio sin culpa." },
    en: { name:"Air", lede:"You rise. You seek the new and need space to be who you are.",
          strength:"You're curious, you think differently and you know how to let go of what ties you down. You see possibilities where others see limits.",
          shadow:"Your detachment can look like indifference, and your need for freedom can make you dodge commitments or conflict.",
          cultivate:"Practice trying something new without looking for a use, letting go of what no longer serves you and giving yourself space without guilt." }
  }
},

BENDER: {
  yes: { es:{ t:"Maestro o maestra", d:"Enfrentas el mundo desde dentro: intuición, cuerpo y energía. Confías en lo que sientes antes de poder explicarlo, y eso es lo que mueve a un elemento." },
         en:{ t:"Bender", d:"You face the world from within: intuition, body and energy. You trust what you feel before you can explain it, and that's what moves an element." } },
  no:  { es:{ t:"Sin control de elementos", d:"Enfrentas el mundo desde fuera: método, estrategia y herramientas. Como Sokka, Asami o Suki, tu poder está en pensar el problema y prepararte mejor que nadie." },
         en:{ t:"Non-bender", d:"You face the world from outside: method, strategy and tools. Like Sokka, Asami or Suki, your power lies in thinking the problem through and preparing better than anyone." } }
},

/* Especialidad de un maestro: según el elemento principal y el secundario. */
SPECIALTY: {
  water: {
    air:   { id:"sanacion", es:{ t:"Sanación", d:"Como Katara: usas el agua para cuidar y reparar. Tu sensibilidad hacia los demás es tu mayor herramienta." },
                            en:{ t:"Healing", d:"Like Katara: you use water to care and mend. Your sensitivity to others is your greatest tool." } },
    earth: { id:"plantas",  es:{ t:"Plantas control", d:"Como los maestros del Pantano Neblinoso: encuentras el agua en lo vivo y lo arraigado, y te conectas con todo lo que te rodea." },
                            en:{ t:"Plantbending", d:"Like the Foggy Swamp benders: you find the water in what is alive and rooted, and connect with everything around you." } },
    fire:  { id:"sangre",   es:{ t:"Sangre control", d:"Una técnica de enorme poder e igual responsabilidad. Tu intensidad combinada con tu capacidad de leer a otros es un don que exige ética." },
                            en:{ t:"Bloodbending", d:"A technique of enormous power and equal responsibility. Your intensity combined with your ability to read others is a gift that demands ethics." } }
  },
  earth: {
    air:   { id:"metal",    es:{ t:"Metal control", d:"Como Toph: ves lo que otros creen imposible. Tu constancia te da la base y tu apertura te deja romper los límites." },
                            en:{ t:"Metalbending", d:"Like Toph: you see what others think is impossible. Your steadiness gives you the base and your openness lets you break limits." } },
    fire:  { id:"lava",     es:{ t:"Lava control", d:"Como Bolin y Ghazan: tierra con fuego dentro. Eres firme, pero cuando te mueves, transformas el terreno." },
                            en:{ t:"Lavabending", d:"Like Bolin and Ghazan: earth with fire inside. You're steady, but when you move, you reshape the ground." } },
    water: { id:"sismico",  es:{ t:"Sentido sísmico", d:"Escuchas el mundo a través de la tierra. Tu firmeza se combina con una gran sensibilidad para percibir lo que otros no notan." },
                            en:{ t:"Seismic sense", d:"You listen to the world through the earth. Your steadiness blends with a deep sensitivity to what others miss." } }
  },
  fire: {
    air:   { id:"rayos",    es:{ t:"Generación de rayos", d:"El rayo exige separar la energía con la mente en calma. Tu impulso, sumado a tu capacidad de soltar, te da esa precisión." },
                            en:{ t:"Lightning generation", d:"Lightning demands separating energy with a calm mind. Your drive, plus your ability to let go, gives you that precision." } },
    water: { id:"redireccion", es:{ t:"Redirección de rayos", d:"Como Iroh, que la aprendió de los maestros agua: tu fuerza no está en atacar, sino en recibir la energía y devolverla transformada." },
                            en:{ t:"Lightning redirection", d:"Like Iroh, who learned it from waterbenders: your strength isn't in attacking, but in receiving energy and sending it back transformed." } },
    earth: { id:"combustion", es:{ t:"Combustión", d:"Como P'Li y el Hombre Combustión: concentras toda tu energía en un solo punto. Disciplina y fuerza en estado puro." },
                            en:{ t:"Combustion", d:"Like P'Li and Combustion Man: you focus all your energy on a single point. Pure discipline and force." } }
  },
  air: {
    water: { id:"proyeccion", es:{ t:"Proyección espiritual", d:"Como Jinora: tu espíritu viaja más lejos que tu cuerpo. Tu apertura y tu sensibilidad te conectan con lo invisible." },
                            en:{ t:"Spiritual projection", d:"Like Jinora: your spirit travels farther than your body. Your openness and sensitivity connect you with the unseen." } },
    fire:  { id:"vuelo",    es:{ t:"Vuelo", d:"Como Guru Laghima y Zaheer: soltar todo apego terrenal te permite elevarte. Libertad total, impulsada por una voluntad firme." },
                            en:{ t:"Flight", d:"Like Guru Laghima and Zaheer: letting go of every earthly tie lets you rise. Total freedom, driven by a firm will." } },
    earth: { id:"escudos",  es:{ t:"Escudos y esferas de aire", d:"Como Tenzin: dominas las formas tradicionales y proteges a los tuyos. Tu libertad tiene raíces." },
                            en:{ t:"Air shields and spheres", d:"Like Tenzin: you master the traditional forms and protect your people. Your freedom has roots." } }
  }
},

/* Rol de quien no controla elementos: según el elemento principal. */
ROLE: {
  air:   { id:"inventor",   es:{ t:"Inventor/a y estratega", d:"Como Sokka, Asami o Varrick: tu curiosidad se convierte en planes e inventos que cambian el rumbo de todo." },
                             en:{ t:"Inventor and strategist", d:"Like Sokka, Asami or Varrick: your curiosity turns into plans and inventions that change everything." } },
  water: { id:"diplomacia", es:{ t:"Diplomacia y mediación", d:"Como Zhu Li cuando llega a la presidencia: tu poder está en unir a las personas y encontrar acuerdos donde otros ven conflicto." },
                             en:{ t:"Diplomacy and mediation", d:"Like Zhu Li when she becomes president: your power lies in bringing people together and finding agreement where others see conflict." } },
  earth: { id:"guerrero",   es:{ t:"Guerrero/a de formación", d:"Como Suki y las guerreras Kyoshi: disciplina, entrenamiento y lealtad. No necesitas un elemento para sostener la línea." },
                             en:{ t:"Trained warrior", d:"Like Suki and the Kyoshi Warriors: discipline, training and loyalty. You don't need an element to hold the line." } },
  fire:  { id:"precision",  es:{ t:"Combate de precisión", d:"Como Mai o Ty Lee: cuchillos certeros o bloqueo de chi. Tu intensidad se concentra en el golpe exacto." },
                             en:{ t:"Precision combat", d:"Like Mai or Ty Lee: unerring knives or chi blocking. Your intensity focuses on the exact strike." } }
},

/* Naciones por era. Para cada elemento, gana el lugar cuyo rasgo tengas más alto
   ("neg": true = gana quien tiene ese rasgo más bajo). Se usan rasgos de OTROS
   elementos para que el lugar dependa del matiz de tu personalidad y no siempre
   gane el mismo. */
NATIONS: {
  aang: {
    water: [
      { f:"AR", id:"agua_norte", es:{ t:"Tribu Agua del Norte", d:"Una gran ciudad de hielo con tradiciones firmes y un orden claro." }, en:{ t:"Northern Water Tribe", d:"A great ice city with firm traditions and a clear order." } },
      { f:"IN", id:"agua_sur",   es:{ t:"Tribu Agua del Sur", d:"Una comunidad pequeña y resistente, donde todos aportan para salir adelante." }, en:{ t:"Southern Water Tribe", d:"A small, resilient community where everyone pitches in to get by." } },
      { f:"AP", id:"pantano",    es:{ t:"Pantano Neblinoso", d:"Un lugar apartado y espiritual, donde todo está conectado." }, en:{ t:"Foggy Swamp", d:"A remote, spiritual place where everything is connected." } }
    ],
    earth: [
      { f:"IM", id:"ba_sing_se", es:{ t:"Ba Sing Se", d:"La ciudad impenetrable: muros, jerarquía y la ambición de subir de anillo." }, en:{ t:"Ba Sing Se", d:"The impenetrable city: walls, hierarchy and the ambition to move up a ring." } },
      { f:"AP", id:"omashu",     es:{ t:"Omashu", d:"La ciudad del rey Bumi: ingeniosa, excéntrica y llena de sorpresas." }, en:{ t:"Omashu", d:"King Bumi's city: clever, eccentric and full of surprises." } },
      { f:"VI", id:"isla_kyoshi", es:{ t:"Isla Kyoshi", d:"Una comunidad unida que se protege a sí misma." }, en:{ t:"Kyoshi Island", d:"A close-knit community that protects its own." } }
    ],
    fire: [
      { f:"AR", id:"capital_fuego", es:{ t:"Capital de la Nación del Fuego", d:"El centro del poder, donde se premia la ambición y el honor." }, en:{ t:"Fire Nation Capital", d:"The seat of power, where ambition and honor are rewarded." } },
      { f:"AP", id:"guerreros_sol", es:{ t:"Guerreros del Sol", d:"Los guardianes del fuego original, que lo entienden como vida y no como destrucción." }, en:{ t:"Sun Warriors", d:"The keepers of the original fire, who see it as life rather than destruction." } },
      { f:"AD", id:"colonias",      es:{ t:"Colonias del Reino Tierra", d:"Pueblos mestizos como Yu Dao, donde dos culturas aprendieron a convivir." }, en:{ t:"Earth Kingdom colonies", d:"Mixed towns like Yu Dao, where two cultures learned to live together." } }
    ],
    air: [
      { f:"VI", id:"templo_sur",   es:{ t:"Templo Aire del Sur", d:"En la época de Gyatso: una comunidad de monjes que comparte todo." }, en:{ t:"Southern Air Temple", d:"In Gyatso's time: a community of monks who share everything." } },
      { f:"CO", id:"templo_este",  es:{ t:"Templo Aire del Este", d:"El lugar de la meditación y del Gurú Pathik, donde el espíritu se cultiva." }, en:{ t:"Eastern Air Temple", d:"The place of meditation and Guru Pathik, where the spirit is cultivated." } },
      { f:"AD", id:"nomada_aang",  es:{ t:"Nómada con el Equipo Avatar", d:"Sin un lugar fijo: tu hogar es el camino y quienes viajan contigo." }, en:{ t:"Nomad with Team Avatar", d:"No fixed place: your home is the road and those who travel with you." } }
    ]
  },
  korra: {
    water: [
      { f:"AR", id:"agua_norte_k", es:{ t:"Tribu Agua del Norte", d:"Tradición y espiritualidad, en tiempos de tensión con el Sur." }, en:{ t:"Northern Water Tribe", d:"Tradition and spirituality, in tense times with the South." } },
      { f:"IM", id:"agua_sur_k",   es:{ t:"Tribu Agua del Sur", d:"La tierra natal de Korra, en plena modernización." }, en:{ t:"Southern Water Tribe", d:"Korra's homeland, in the middle of modernizing." } },
      { f:"AP", id:"pantano_k",    es:{ t:"Pantano Neblinoso", d:"Donde Toph se retiró: un lugar para encontrarte contigo." }, en:{ t:"Foggy Swamp", d:"Where Toph retired: a place to find yourself." } }
    ],
    earth: [
      { f:"AP", id:"zaofu",        es:{ t:"Zaofu", d:"La ciudad de metal de Suyin: arte, innovación y libertad para cada talento." }, en:{ t:"Zaofu", d:"Suyin's metal city: art, innovation and freedom for every talent." } },
      { f:"IN", id:"ba_sing_se_k", es:{ t:"Ba Sing Se", d:"Una ciudad que se rebeló contra su reina y lucha por reinventarse." }, en:{ t:"Ba Sing Se", d:"A city that rose up against its queen and is fighting to reinvent itself." } },
      { f:"IM", id:"ciudad_rep_t", es:{ t:"Ciudad República", d:"La metrópolis donde todas las naciones compiten y se mezclan." }, en:{ t:"Republic City", d:"The metropolis where all nations compete and mix." } },
      { f:"VI", id:"isla_kyoshi_k", es:{ t:"Isla Kyoshi", d:"La comunidad que sigue honrando a su Avatar generación tras generación." }, en:{ t:"Kyoshi Island", d:"The community that keeps honoring its Avatar generation after generation." } }
    ],
    fire: [
      { f:"AD", id:"ciudad_rep_f", es:{ t:"Ciudad República", d:"Industria, deporte de pro-control y ambición en cada esquina." }, en:{ t:"Republic City", d:"Industry, pro-bending and ambition on every corner." } },
      { f:"AR", id:"capital_fuego_k", es:{ t:"Capital de la Nación del Fuego", d:"Bajo la Señora del Fuego Izumi: tradición en paz." }, en:{ t:"Fire Nation Capital", d:"Under Fire Lord Izumi: tradition at peace." } },
      { f:"VI", id:"fuerzas_unidas", es:{ t:"Fuerzas Unidas", d:"Al servicio de la República Unida, protegiendo a quienes lo necesitan." }, en:{ t:"United Forces", d:"Serving the United Republic, protecting those in need." } }
    ],
    air: [
      { f:"VI", id:"nacion_aire",  es:{ t:"Nación del Aire", d:"Los nuevos maestros aire en el Templo Aire del Norte, ayudando por el mundo." }, en:{ t:"Air Nation", d:"The new airbenders at the Northern Air Temple, helping across the world." } },
      { f:"AR", id:"isla_templo",  es:{ t:"Isla del Templo del Aire", d:"Con Tenzin y los Acólitos del Aire, frente a Ciudad República." }, en:{ t:"Air Temple Island", d:"With Tenzin and the Air Acolytes, facing Republic City." } },
      { f:"AD", id:"nomada_korra", es:{ t:"Nómada", d:"Recorres el mundo sin ataduras, como los antiguos nómadas aire." }, en:{ t:"Nomad", d:"You roam the world unbound, like the Air Nomads of old." } }
    ]
  }
}
};
