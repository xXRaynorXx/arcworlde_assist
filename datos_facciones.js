// Base de datos de Facción, Rasgos y Armería de ArcWorlde (Versión 2.0 - Con Equipo de Serie e Innato)

const habilidadesFaccionDB = [
  {
    "id": "settler_nation",
    "faccion_id": "halfling",
    "faccion_nombre": "Halflings",
    "nombre": "Nación Colonizadora / Settler Nation",
    "etiqueta": "Regla de Facción (Halflings)",
    "resumen": "Alianzas tácticas con otros colonos del bosque de Mildaark.",
    "detalles": "Efectos: Al construir tu banda, puedes incluir personajes de las facciones Imperial y Njorsvald sin penalizaciones.",
    "restriccion": "Aplica en la fase de creación de la banda."
  },
  {
    "id": "make_take_orders",
    "faccion_id": "halfling",
    "faccion_nombre": "Halflings",
    "nombre": "Dar y Recibir Órdenes / Make/Take Orders",
    "etiqueta": "Regla de Facción (Halflings)",
    "resumen": "Cadena de mando para coordinar acciones grupales de la milicia.",
    "detalles": "Efectos: Un personaje con Make Orders emite una orden a aliados con Take Orders a 12\" tras superar una Hazaña Fácil.",
    "restriccion": "Requiere estar a 12\" del líder emitente."
  },
  {
    "id": "grand_cookbook",
    "faccion_id": "halfling",
    "faccion_nombre": "Halflings",
    "nombre": "El Gran Libro de Cocina / Grand Cookbook of Bulbo Chubb",
    "etiqueta": "Saber Mágico (Halflings)",
    "resumen": "Magia gastronómica infundida con Arcanita para potenciar o curar aliados.",
    "detalles": "Efectos: Acceso al saber mágico con hechizos de curación, bonificación al movimiento y potenciadores de combate.",
    "restriccion": "Exclusivo de Magos Halflings (Battle Cook)."
  },
  {
    "id": "settler_nation",
    "faccion_id": "imperial",
    "faccion_nombre": "Imperiales",
    "nombre": "Nación Colonizadora / Settler Nation",
    "etiqueta": "Regla de Facción (Imperiales)",
    "resumen": "Expansión militar del Imperio aliada con colonos locales.",
    "detalles": "Efectos: Puedes reclutar personajes de las facciones Halfling y Njorsvald sin penalización de infidelidad.",
    "restriccion": "Aplica al armar la lista de banda."
  },
  {
    "id": "make_take_orders",
    "faccion_id": "imperial",
    "faccion_nombre": "Imperiales",
    "nombre": "Comandos Militares / Make/Take Orders",
    "etiqueta": "Regla de Facción (Imperiales)",
    "resumen": "Ordenanza táctica prusiano-imperial para mover y disparar en bloque.",
    "detalles": "Efectos: Permite mandar '¡Fuego a Discreción!', '¡Formad Línea!' o '¡Avance Rápido!' a soldados a 12\".",
    "restriccion": "Líder a 12\" de unidades con Take Orders."
  },
  {
    "id": "afterlife",
    "faccion_id": "ancient_dead",
    "faccion_nombre": "Antiguos Muertos (Ancient Dead)",
    "nombre": "El Más Allá / Afterlife",
    "etiqueta": "Regla de Facción (Ancient Dead)",
    "resumen": "Convicción absoluta de encontrarse en el paraíso prometido.",
    "detalles": "Efectos: Los personajes con este rasgo superan automáticamente todos los Chequeos de Valentía.",
    "restriccion": "Pasivo universal de la facción."
  },
  {
    "id": "bones",
    "faccion_id": "ancient_dead",
    "faccion_nombre": "Antiguos Muertos (Ancient Dead)",
    "nombre": "Huesos Antiguos / Bones",
    "etiqueta": "Regla de Facción (Ancient Dead)",
    "resumen": "Anatomía esquelética sin carne ni órganos que dañar.",
    "detalles": "Efectos: Permite hacer una Hazaña Fácil para recolocar sus huesos y recuperar D3 HP. Además, cuentan como si estuvieran en Cobertura contra ataques a distancia.",
    "restriccion": "Aplica a miniaturas esqueléticas."
  },
  {
    "id": "undead_legions",
    "faccion_id": "ancient_dead",
    "faccion_nombre": "Antiguos Muertos (Ancient Dead)",
    "nombre": "Legiones No-Muertas / Undead Legions",
    "etiqueta": "Regla de Facción (Ancient Dead)",
    "resumen": "Alianza eterna entre señores de las tumbas y tiranos imperecederos.",
    "detalles": "Efectos: Puedes incluir unidades de los Undead Raiders y Vampires en tu banda sin penalizaciones de alianzas.",
    "restriccion": "Aplica al construir la banda."
  },
  {
    "id": "nomadic_clans",
    "faccion_id": "beastfolk",
    "faccion_nombre": "Hombres Bestia (Beastfolk)",
    "nombre": "Clanes Nómadas / Nomadic Clans",
    "etiqueta": "Regla de Facción (Beastfolk)",
    "resumen": "Vida errante por los valles salvajes compartida con otros clanes.",
    "detalles": "Efectos: Puedes incluir unidades de las facciones Ourks y Gremlins en tu banda.",
    "restriccion": "Creación de banda."
  },
  {
    "id": "beastkin",
    "faccion_id": "beastfolk",
    "faccion_nombre": "Hombres Bestia (Beastfolk)",
    "nombre": "Parentesco Bestial / Beastkin",
    "etiqueta": "Regla de Facción (Beastfolk)",
    "resumen": "Afinidad natural con los monstruos y bestias del bosque.",
    "detalles": "Efectos: Todas las Bestias, Monstruos o Titanes contratados del Bestiario tienen un 20% de descuento en su coste de GP.",
    "restriccion": "Descuento en Bestiario."
  },
  {
    "id": "diminutive_intimidating",
    "faccion_id": "beastfolk",
    "faccion_nombre": "Hombres Bestia (Beastfolk)",
    "nombre": "Jerarquía del Clan / Diminutive & Intimidating",
    "etiqueta": "Regla de Facción (Beastfolk)",
    "resumen": "Los brutos dominan a las sabandijas más pequeñas del clan.",
    "detalles": "Efectos: La caída de unidades Diminutive no fuerza chequeos de Valentía en líderes Intimidating. Además, minis Diminutive a 6\" de un Intimidating re-repiten 1 fallo al atacar.",
    "restriccion": "Sinergia de tamaño."
  },
  {
    "id": "dark_ones_will",
    "faccion_id": "dark_lords",
    "faccion_nombre": "Señores Oscuros (Dark Lords)",
    "nombre": "La Voluntad del Oscuro / The Dark One's Will",
    "etiqueta": "Regla de Facción (Dark Lords)",
    "resumen": "Personalización táctica de la obsesión del Comandante antes de la partida.",
    "detalles": "Efectos: Elige 1 rasgo: Fell Warrior (+1 AP extra por cada KO causado), Dark Warlock (Mago + Lore of Villainy), Master of the Horde (-20% GP Hobgoblins), Beast Master (-20% GP Bestiario).",
    "restriccion": "Elección previa al juego."
  },
  {
    "id": "fae_beings_dark",
    "faccion_id": "dark_lords",
    "faccion_nombre": "Señores Oscuros (Dark Lords)",
    "nombre": "Pactos Malevolentes / Fae Beings",
    "etiqueta": "Regla de Facción (Dark Lords)",
    "resumen": "Alianzas oscuras con magos renegados y elfos oscuros.",
    "detalles": "Efectos: Puedes reclutar unidades de las facciones Wizards y Wild Elves.",
    "restriccion": "Creación de banda."
  },
  {
    "id": "born_slippy",
    "faccion_id": "gremlins",
    "faccion_nombre": "Gremlins",
    "nombre": "Escurridizo / Born Slippy",
    "etiqueta": "Regla de Facción (Gremlins)",
    "resumen": "Agilidad diminuta para zafarse del combate cuerpo a cuerpo.",
    "detalles": "Efectos: Permite repetir cualquier tirada de Hazaña fallida al intentar Desengancharse (Disengage) del combate.",
    "restriccion": "Acción de Disengage."
  },
  {
    "id": "burrow_dweller",
    "faccion_id": "gremlins",
    "faccion_nombre": "Gremlins",
    "nombre": "Habitante de Madrigueras / Burrow Dweller",
    "etiqueta": "Regla de Facción (Gremlins)",
    "resumen": "Uso de la red subterránea para curarse y teletransportarse.",
    "detalles": "Efectos: En contacto con un Gremlin Burrow, una Hazaña Fácil sumerge al personaje, retirándolo del tablero y curándole D3 HP. Reaparece en cualquier madriguera la ronda siguiente.",
    "restriccion": "No se puede usar si lleva tokens de VP de escenario."
  },
  {
    "id": "nomads_ourk",
    "faccion_id": "ourks",
    "faccion_nombre": "Ourks",
    "nombre": "Nómadas de los Pantanos / Nomads",
    "etiqueta": "Regla de Facción (Ourks)",
    "resumen": "Bandas errantes de los pantanos del sur.",
    "detalles": "Efectos: Puedes reclutar unidades de las facciones Beastfolk y Gremlins.",
    "restriccion": "Creación de banda."
  },
  {
    "id": "power_struggle",
    "faccion_id": "ourks",
    "faccion_nombre": "Ourks",
    "nombre": "Lucha de Poder / Power Struggle",
    "etiqueta": "Regla de Facción (Ourks)",
    "resumen": "Rivalidad constante entre el Chieftain y el Dreameater por el mando.",
    "detalles": "Efectos: Si tienes ambos en la lista, realizan un enfrentamiento de Valentía al inicio de cada ronda. El ganador obtiene bonificaciones en su perfil y el perdedor sufre -1 AP.",
    "restriccion": "Requiere Chieftain y Dreameater."
  },
  {
    "id": "undead_legions_raiders",
    "faccion_id": "undead_raiders",
    "faccion_nombre": "Saqueadores No-Muertos (Undead Raiders)",
    "nombre": "Legiones No-Muertas / Undead Legions",
    "etiqueta": "Regla de Facción (Undead Raiders)",
    "resumen": "Bribones y piratas resucitados unidos a otros no-muertos.",
    "detalles": "Efectos: Puedes reclutar unidades de las facciones Vampires y Ancient Dead.",
    "restriccion": "Creación de lista."
  },
  {
    "id": "resurrection_harbinger",
    "faccion_id": "undead_raiders",
    "faccion_nombre": "Saqueadores No-Muertos (Undead Raiders)",
    "nombre": "Resurrección del Pescador / Raiser of the Dead",
    "etiqueta": "Regla de Facción (Undead Raiders)",
    "resumen": "Los Harbingers traen de vuelta a los rufianes caídos en combate.",
    "detalles": "Efectos: Mediante una Hazaña, resucita unidades No-Muertas caídas en el mismo lugar donde cayeron con el 50% de sus HP iniciales.",
    "restriccion": "Unidades No-Muertas."
  },
  {
    "id": "enthrall_rule",
    "faccion_id": "vampires",
    "faccion_nombre": "Vampiros (Vampires)",
    "nombre": "Cautivar / Enthral",
    "etiqueta": "Regla de Facción (Vampires)",
    "resumen": "Poder hipnótico para convertir enemigos heridos en sirvientes sumisos.",
    "detalles": "Efectos: En contacto de peana, realiza una Hazaña (Easy/Medium/Hard/Legendary según HP y peana del rival) para transformar al enemigo en un Thrall bajo tu control.",
    "restriccion": "Liberados si el Vampiro cae KO."
  },
  {
    "id": "insignificant_vampires",
    "faccion_id": "vampires",
    "faccion_nombre": "Vampiros (Vampires)",
    "nombre": "Insignificantes / Insignificant",
    "etiqueta": "Regla de Facción (Vampires)",
    "resumen": "Desprecio absoluto por la vida de sus sirvientes y plebeyos.",
    "detalles": "Efectos: La caída o noqueo de sirvientes y Thralls no obliga a los Vampiros a realizar Chequeos de Valentía.",
    "restriccion": "Afecta a nobles vampíricos."
  },
  {
    "id": "summoner_sacrifice",
    "faccion_id": "wild_elves",
    "faccion_nombre": "Elfos Silvanos (Wild Elves)",
    "nombre": "Magia de Sangre y Sacrificio / Summoner & Sacrifice",
    "etiqueta": "Regla de Facción (Wild Elves)",
    "resumen": "Invocación de criaturas de madera mediante ofrendas de vida.",
    "detalles": "Efectos: Los Druidas invocan Woodfiends y Briarbeasts sacrificando HP propio o noqueando unidades aliadas de apoyo.",
    "restriccion": "Invocación druídica."
  },
  {
    "id": "fae_beings_elves",
    "faccion_id": "wild_elves",
    "faccion_nombre": "Elfos Silvanos (Wild Elves)",
    "nombre": "Pactos Arcanos / Fae Beings",
    "etiqueta": "Regla de Facción (Wild Elves)",
    "resumen": "Lazos milenarios con los magos y las fuerzas de la naturaleza.",
    "detalles": "Efectos: Puedes reclutar personajes de las facciones Wizards y Dark Lords.",
    "restriccion": "Creación de banda."
  },
  {
    "id": "colleges_mt_orion",
    "faccion_id": "wizards",
    "faccion_nombre": "Magos (Wizards)",
    "nombre": "Los Colegios de Mt Orion / Colleges of Mt Orion",
    "etiqueta": "Regla de Facción (Wizards)",
    "resumen": "Especialización elemental entre los seis Colegios Mágicos.",
    "detalles": "Efectos: Elige la escuela mágica antes de la partida (Crimson, Sapphire, Emerald, Ochre, Bronze, Opal) para acceder a su saber exclusivo.",
    "restriccion": "Elección de colegio antes de jugar."
  },
  {
    "id": "thing_of_magic",
    "faccion_id": "wizards",
    "faccion_nombre": "Magos (Wizards)",
    "nombre": "Entidades de Magia / Thing of Magic",
    "etiqueta": "Regla de Facción (Wizards)",
    "resumen": "Constructos y duendes arcanos traídos a la vida por los magos.",
    "detalles": "Efectos: No se despliegan al inicio. Se invocan en mesa mediante el hechizo Conjure Sprites. Si caen KO, pueden reconjurarse la ronda siguiente.",
    "restriccion": "Invocación por Spells."
  }
];
const rasgosUnidadesDB = [
  {
    "id": "make_orders",
    "faccion_id": "halfling",
    "faccion_nombre": "Halflings",
    "nombre": "Dar Órdenes / Make Orders",
    "etiqueta": "Rasgo de Unidad / Mando (Sheriff & Battle Cook)",
    "resumen": "Permite al líder emitir comandos tácticos a las tropas de la milicia.",
    "detalles": "Efectos: Con una Hazaña Fácil, emite órdenes como '¡Como Uno!' (activa hasta 3 minis juntas) o '¡Manteneos Firmes!' (supera Valentía automáticamente).",
    "restriccion": "Requiere afectar a aliados con Take Orders a 12\"."
  },
  {
    "id": "take_orders",
    "faccion_id": "halfling",
    "faccion_nombre": "Halflings",
    "nombre": "Recibir Órdenes / Take Orders",
    "etiqueta": "Rasgo de Unidad / Tropa (Militia & Town Guard)",
    "resumen": "Disciplina de la tropa para responder a las órdenes del mando.",
    "detalles": "Efectos: Permite a las unidades activarse en grupo o recibir beneficios de las órdenes emitidas por un líder.",
    "restriccion": "Requiere estar a 12\" del líder que emite la orden."
  },
  {
    "id": "rousing_cheer",
    "faccion_id": "halfling",
    "faccion_nombre": "Halflings",
    "nombre": "Ánimo Entusiasta / Rousing Cheer",
    "etiqueta": "Rasgo de Unidad / Liderazgo (Sheriff)",
    "resumen": "Aura de valentía del Sheriff para inspirar a la milicia.",
    "detalles": "Efectos: Todos los aliados con Take Orders a 8\" o menos utilizan la Valentía del Sheriff (Valor 9).",
    "restriccion": "Afecta a aliados a 8\" o menos."
  },
  {
    "id": "bodyguard",
    "faccion_id": "halfling",
    "faccion_nombre": "Halflings",
    "nombre": "Guardaespaldas / Bodyguard",
    "etiqueta": "Rasgo de Unidad / Élite (Town Guard)",
    "resumen": "Protección para interceptar ataques dirigidos al Comandante.",
    "detalles": "Efectos: Si está en contacto de peana con un Comandante aliado, puede redirigir a sí mismo cualquier impacto exitoso sufrido por el Comandante.",
    "restriccion": "Requiere contacto de peana con el Comandante."
  },
  {
    "id": "crew_and_payload",
    "faccion_id": "halfling",
    "faccion_nombre": "Halflings",
    "nombre": "Tripulación y Carga Aleatoria / Crew & Random Payload",
    "etiqueta": "Rasgo de Unidad / Maquinaria (Thing-Flinger)",
    "resumen": "Catapulta que dispara proyectiles impredecibles con apoyo de la milicia.",
    "detalles": "Efectos: La milicia en contacto puede donar AP. Tira 1D6 para el efecto del proyectil (1: Tripulación enviada, 2: Verduras/Terreno difícil, 3: Cuchillos/Ignora armadura, 4: Amigos de granja/Área, 5: Piedra/Power 9, 6: Brebaje explosivo/Prone en área).",
    "restriccion": "Requiere Hazaña Difícil para disparar."
  },
  {
    "id": "lead_from_front",
    "faccion_id": "imperial",
    "faccion_nombre": "Imperiales",
    "nombre": "Liderar desde la Vanguardia / Lead from the Front",
    "etiqueta": "Rasgo de Unidad / Comandante (Imperial Captain)",
    "resumen": "Inspiración marcial del Capitán Imperial.",
    "detalles": "Efectos: Si el Capitán está en combate melé, los aliados a 6\" ganan +1 al Poder (Power) de sus ataques.",
    "restriccion": "Requiere que el Capitán esté trabado en melé."
  },
  {
    "id": "heavy_armour",
    "faccion_id": "imperial",
    "faccion_nombre": "Imperiales",
    "nombre": "Armadura Pesada / Heavy Armour",
    "etiqueta": "Rasgo de Unidad / Tropa (Imperial Trooper)",
    "resumen": "Coraza metálica de placas imperiales.",
    "detalles": "Efectos: Otorga Valor de Armadura 1 automático contra todos los impactos normales.",
    "restriccion": "Pasivo."
  },
  {
    "id": "gunpowder_master",
    "faccion_id": "imperial",
    "faccion_nombre": "Imperiales",
    "nombre": "Maestro de la Pólvora / Gunpowder Master",
    "etiqueta": "Rasgo de Unidad / Especialista (Tinkerer)",
    "resumen": "Mantenimiento y recarga experta de armas de fuego.",
    "detalles": "Efectos: Permite a los aliados a 6\" repetir tiradas de ataque pifiadas con armas de pólvora (Arquebus).",
    "restriccion": "Afecta a armas de pólvora a 6\"."
  },
  {
    "id": "tinkered_construct",
    "faccion_id": "imperial",
    "faccion_nombre": "Imperiales",
    "nombre": "Constructo Autómata / Tinkered Construct",
    "etiqueta": "Rasgo de Unidad / Maquinaria (Clockwork Automaton)",
    "resumen": "Mecanismo autómata sin sentimientos.",
    "detalles": "Efectos: Inmune a chequeos de Valentía y efectos de terror. Si sufre un impacto crítico, pierde 1 AP en su siguiente activación.",
    "restriccion": "Inmunidad a Valentía."
  },
  {
    "id": "bones_trait",
    "faccion_id": "ancient_dead",
    "faccion_nombre": "Antiguos Muertos (Ancient Dead)",
    "nombre": "Huesos / Bones",
    "etiqueta": "Rasgo de Unidad / Anatomía (Skelts & Grave Lords)",
    "resumen": "Estructura ósea mágica resistente a flechas.",
    "detalles": "Efectos: Hazaña Fácil para curar D3 HP (pull self together). Cobertura permanente contra proyectiles.",
    "restriccion": "Unidades de huesos."
  },
  {
    "id": "buried_horde",
    "faccion_id": "ancient_dead",
    "faccion_nombre": "Antiguos Muertos (Ancient Dead)",
    "nombre": "Horda Enterrada / Buried Horde",
    "etiqueta": "Rasgo de Unidad / Élite (Tomb Guardian)",
    "resumen": "Armamento ancestral conservado en los sarcófagos.",
    "detalles": "Efectos: Todo el equipo de la Armería Común equipado a un Tomb Guardian tiene un 25% de descuento en GP (redondeado hacia arriba).",
    "restriccion": "Exclusivo del Tomb Guardian."
  },
  {
    "id": "spirit_relic",
    "faccion_id": "ancient_dead",
    "faccion_nombre": "Antiguos Muertos (Ancient Dead)",
    "nombre": "Espíritu de la Reliquia / Spirit of the Relic",
    "etiqueta": "Rasgo de Unidad / Espectro (Relic Spirit)",
    "resumen": "Alma atada a un objeto sagrado que ataca a los profanadores.",
    "detalles": "Efectos: Ataca automáticamente con aullidos de área (Power 6 a 4\") a cualquier enemigo que intente acercarse o tocar la reliquia.",
    "restriccion": "Exclusivo del Relic Spirit."
  },
  {
    "id": "intimidating_trait",
    "faccion_id": "beastfolk",
    "faccion_nombre": "Hombres Bestia (Beastfolk)",
    "nombre": "Intimidador / Intimidating",
    "etiqueta": "Rasgo de Unidad / Presencia (Packmaster & Clanbeast)",
    "resumen": "Estatura e imponencia física que infunde respeto.",
    "detalles": "Efectos: Permite a los aliados Diminutive a 6\" repetir 1 fallo de ataque por ronda y previene pánico al caer las tropas pequeñas.",
    "restriccion": "Líderes y brutos."
  },
  {
    "id": "go_get_em",
    "faccion_id": "beastfolk",
    "faccion_nombre": "Hombres Bestia (Beastfolk)",
    "nombre": "¡A por Ellos! / Go Get’Em!",
    "etiqueta": "Rasgo de Unidad / Tropa (Verman)",
    "resumen": "Impulso de las alimañas cuando su líder las empuja a la carga.",
    "detalles": "Efectos: Si el Verman está a 6\" de un personaje Intimidating, puede repetir la tirada de Leg It si el objetivo es cargar a un enemigo.",
    "restriccion": "Carga a 6\" del líder."
  },
  {
    "id": "ballads_beastfolk",
    "faccion_id": "beastfolk",
    "faccion_nombre": "Hombres Bestia (Beastfolk)",
    "nombre": "Baladas del Clan / Ballads of the Beastfolk",
    "etiqueta": "Rasgo de Unidad / Apoyo (War Bard)",
    "resumen": "Música estridente tocada con instrumentos estrafalarios.",
    "detalles": "Efectos: Una vez por activación, tira 1D6: (1-2) Tooting: +1 Movimiento a 6\"; (3-4) Honking: cura 1 HP a aliados a 6\"; (5-6) Blaring: +1 Power a ataques a 6\".",
    "restriccion": "Una vez por activación."
  },
  {
    "id": "fiery_essence",
    "faccion_id": "dark_lords",
    "faccion_nombre": "Señores Oscuros (Dark Lords)",
    "nombre": "Esencia Ígnea / Fiery Essence",
    "etiqueta": "Rasgo de Unidad / Invocación (Underling)",
    "resumen": "Criaturas creadas a partir de la propia fuerza vital del Señor Oscuro.",
    "detalles": "Efectos: No se despliegan al inicio. El Señor Oscuro los invoca sacrificando 2 HP y reduciendo su HP máximo en 2.",
    "restriccion": "Summoning por el Comandante."
  },
  {
    "id": "blazing_demise",
    "faccion_id": "dark_lords",
    "faccion_nombre": "Señores Oscuros (Dark Lords)",
    "nombre": "Destrucción Abrasadora / Blazing Demise",
    "etiqueta": "Rasgo de Unidad / Ataque Suicida (Underling)",
    "resumen": "Autodestrucción mágica para calcinar a los enemigos cercanos.",
    "detalles": "Efectos: Ataque de Power 6 a todos los personajes a 2\". El Underling se noquea y devuelve 1 HP máximo al Señor Oscuro.",
    "restriccion": "Ataque de 2 AP."
  },
  {
    "id": "slavedriver",
    "faccion_id": "dark_lords",
    "faccion_nombre": "Señores Oscuros (Dark Lords)",
    "nombre": "Capataz / Slavedriver",
    "etiqueta": "Rasgo de Unidad / Élite (Hobgoblin Honcho)",
    "resumen": "Castigo físico para mantener la disciplina hobgoblin.",
    "detalles": "Efectos: Resta 1 HP a un Hobgoblin a 6\" para ignorar un Chequeo de Valentía fallido.",
    "restriccion": "Afecta a Hobgoblins a 6\"."
  },
  {
    "id": "shield_carriers",
    "faccion_id": "gremlins",
    "faccion_nombre": "Gremlins",
    "nombre": "Portadores de Escudo / Shield Carriers",
    "etiqueta": "Rasgo de Unidad / Comandante (Great Gremlin)",
    "resumen": "Escolta de esbirros que cargan a hombros al gran líder.",
    "detalles": "Efectos: Otorga +8 HP extra, +1 a la Armadura y cambia la peana a 50mm.",
    "restriccion": "Solo Great Gremlin."
  },
  {
    "id": "burrowing_tools_trait",
    "faccion_id": "gremlins",
    "faccion_nombre": "Gremlins",
    "nombre": "Herramientas de Excavación / Burrowing Tools",
    "etiqueta": "Rasgo de Unidad / Movilidad (Gremlin Scamp/Shaman)",
    "resumen": "Capacidad de cavar nuevas entradas a la red subterránea.",
    "detalles": "Efectos: Con Hazaña Media, coloca un token de Gremlin Burrow en terreno abierto en contacto de peana.",
    "restriccion": "Hazaña Media."
  },
  {
    "id": "hurl_boglin",
    "faccion_id": "ourks",
    "faccion_nombre": "Ourks",
    "nombre": "Lanzamiento de Boglin / Hurl Boglin",
    "etiqueta": "Rasgo de Unidad / Combate (Ourk Brute)",
    "resumen": "Agarra a un Boglin aliado y lo lanza violentamente contra el enemigo.",
    "detalles": "Efectos: Lanza un Boglin a 8\" infligiendo D6 Hits de Power 6 al objetivo y dejando al Boglin Prone.",
    "restriccion": "Requiere Boglin en contacto."
  },
  {
    "id": "booze_frenzy",
    "faccion_id": "ourks",
    "faccion_nombre": "Ourks",
    "nombre": "Frenesí de Brebaje / Booze Frenzy",
    "etiqueta": "Rasgo de Unidad / Especialista (Brewzerker)",
    "resumen": "Ataque devastador bajo los efectos de brebajes del pantano.",
    "detalles": "Efectos: Ataque de Power 9 por 2 AP. Tras ejecutar el ataque, el Brewzerker cae automáticamente en estado Prone.",
    "restriccion": "Ataque de 2 AP."
  },
  {
    "id": "risen_trait",
    "faccion_id": "undead_raiders",
    "faccion_nombre": "Saqueadores No-Muertos (Undead Raiders)",
    "nombre": "Resucitado / Risen",
    "etiqueta": "Rasgo de Unidad / Condición (Undead Bandit & Ogre)",
    "resumen": "Cadáver animado por artes nigrománticas.",
    "detalles": "Efectos: Permite ser objetivo de las habilidades y hechizos de resurrección de los Harbingers.",
    "restriccion": "Pasivo no-muerto."
  },
  {
    "id": "lure_of_light",
    "faccion_id": "undead_raiders",
    "faccion_nombre": "Saqueadores No-Muertos (Undead Raiders)",
    "nombre": "Señuelo de la Luz / Lure of the Light",
    "etiqueta": "Rasgo de Unidad / Control (Will o'the Wisp)",
    "resumen": "Luz hipnótica que atrae a las víctimas hacia el peligro.",
    "detalles": "Efectos: Enemigos a 8\" que se activen deben pasar un Chequeo de Valentía o gastar su movimiento dirigiéndose hacia ella.",
    "restriccion": "Afecta a enemigos a 8\"."
  },
  {
    "id": "vampiric_glare",
    "faccion_id": "vampires",
    "faccion_nombre": "Vampiros (Vampires)",
    "nombre": "Mirada Vampírica / Vampiric Glare",
    "etiqueta": "Rasgo de Unidad / Control (Vampire Lord)",
    "resumen": "Parálisis hipnótica fija en los ojos de la víctima.",
    "detalles": "Efectos: Un enemigo a 6\" debe superar Valentía o no podrá realizar ningún movimiento durante el resto de la ronda.",
    "restriccion": "Alcance 6\"."
  },
  {
    "id": "raking_claws",
    "faccion_id": "vampires",
    "faccion_nombre": "Vampiros (Vampires)",
    "nombre": "Garras Desgarradoras / Raking Claws",
    "etiqueta": "Rasgo de Unidad / Combate (Werewolf)",
    "resumen": "Zarpazos letales capaces de despedazar armaduras pesadas.",
    "detalles": "Efectos: Ataque de Power 7. Los impactos críticos ignoran y destruyen 1 punto de Armadura del objetivo.",
    "restriccion": "Ataque de 2 AP."
  },
  {
    "id": "agile_elven",
    "faccion_id": "wild_elves",
    "faccion_nombre": "Elfos Silvanos (Wild Elves)",
    "nombre": "Ágil / Agile",
    "etiqueta": "Rasgo de Unidad / Movilidad (General Elves)",
    "resumen": "Gracia sobrehumana para desplazarse por el follaje denso.",
    "detalles": "Efectos: Ignora todas las penalizaciones por terreno difícil en el movimiento y tiradas de Leg It.",
    "restriccion": "Pasivo."
  },
  {
    "id": "flurry_of_blades",
    "faccion_id": "wild_elves",
    "faccion_nombre": "Elfos Silvanos (Wild Elves)",
    "nombre": "Ráfaga de Hojas / Flurry of Blades",
    "etiqueta": "Rasgo de Unidad / Combate (Wild Elven Warrior)",
    "resumen": "Velocidad de estocadas relámpago con espadas de maderaoscura.",
    "detalles": "Efectos: Ataque de Power 7. Cada impacto crítico permite tirar 1 dado de ataque extra.",
    "restriccion": "Ataque de 2 AP."
  },
  {
    "id": "mage_trait",
    "faccion_id": "wizards",
    "faccion_nombre": "Magos (Wizards)",
    "nombre": "Mago / Mage",
    "etiqueta": "Rasgo de Unidad / Arcano (Wizard & Apprentice)",
    "resumen": "Dominio de las corrientes arcanas y robo de cartas del ArcDeck.",
    "detalles": "Efectos: Permite robar cartas del ArcDeck gastando AP para lanzar hechizos de su escuela.",
    "restriccion": "Lanzamiento de conjuros."
  },
  {
    "id": "light_armour_innate",
    "faccion_id": "comun",
    "faccion_nombre": "Todas / Varios",
    "nombre": "Armadura Ligera Innatas / Light Armour (Gratis)",
    "etiqueta": "Equipo de Serie (Sheriff, Captain, Dragoon, Carven Idol)",
    "resumen": "La unidad viene equipada de serie con Armadura Ligera sin coste adicional de GP.",
    "detalles": "Efectos: Otorga +1 al Valor de Armadura de la miniatura desde el inicio de la partida. No requiere gasto de GP en la Armería Común.",
    "restriccion": "Incluido gratis en las fichas de Sheriff Halfling, Imperial Captain, Imperial Dragoon y Carven Idol Gremlin."
  },
  {
    "id": "heavy_armour_innate",
    "faccion_id": "halfling",
    "faccion_nombre": "Halflings",
    "nombre": "Armadura Pesada Innata / Heavy Armour (Gratis)",
    "etiqueta": "Equipo de Serie (Town Guard)",
    "resumen": "La Guardia del Pueblo está equipada de serie con placas de armadura pesada.",
    "detalles": "Efectos: Otorga +2 al Valor de Armadura de la miniatura desde el inicio. Las tiradas de Leg It sufren +1 a la dificultad.",
    "restriccion": "Incluido gratis de serie en el perfil del Halfling Town Guard."
  },
  {
    "id": "contraption_trunk",
    "faccion_id": "imperial",
    "faccion_nombre": "Imperiales",
    "nombre": "Cofre Mecánico / Contraption Trunk",
    "etiqueta": "Equipo de Serie (Imperial Tinkerer)",
    "resumen": "Baúl autómata con patas de latón impulsadas por Arcanita que transporta los inventos del Tinkerer.",
    "detalles": "Efectos: El Cofre Mecánico es un personaje seguidor gratis en peana de 30mm. Se mueve hasta 6\" cada vez que se activa el Tinkerer y no puede ser noqueado.",
    "restriccion": "Acompaña de serie al Imperial Tinkerer sin coste adicional."
  },
  {
    "id": "arclance_innate",
    "faccion_id": "imperial",
    "faccion_nombre": "Imperiales",
    "nombre": "Lanza Arcana Innata / Arclance",
    "etiqueta": "Equipo de Serie (Imperial Arclancer)",
    "resumen": "Lanza tecnológica que canaliza descargas de Arcanita.",
    "detalles": "Efectos: Cuenta como una Lanza de serie. El jugador puede gastar 1 Ficha de Arcanita para añadir +2 al Power de todos sus ataques en esa activación, sufriendo D3 Hits de rebote.",
    "restriccion": "Equipada de serie en el perfil del Imperial Arclancer."
  },
  {
    "id": "enchanted_armour_innate",
    "faccion_id": "wizards",
    "faccion_nombre": "Magos",
    "nombre": "Armadura Encantada Innata / Enchanted Armour",
    "etiqueta": "Equipo de Serie (Sentinels)",
    "resumen": "Armadura mágica autómata que protege a los Magos de Mt Orion.",
    "detalles": "Efectos: Otorga +2 al Valor de Armadura gratis y supera automáticamente los chequeos de Valentía. Al ser noqueado, deja caer un objeto de Heavy Armour.",
    "restriccion": "Equipada de serie en los Sentinels de la facción Mago."
  }
];
const armeriaExclusivaDB = [
  {
    "id": "packed_lunch",
    "faccion_id": "halfling",
    "faccion_nombre": "Halflings",
    "nombre": "Almuerzo Para Llevar / Packed Lunch",
    "tipo": "Objeto / Consumible",
    "coste": 10,
    "etiqueta": "Armería Halfling",
    "resumen": "Ración de delicias de Hobbleshire.",
    "detalles": "Efectos: Un uso solo. Al consumirse, el personaje o un aliado en contacto de peana recupera D6 HP.",
    "restriccion": "De un solo uso."
  },
  {
    "id": "halfling_ranged_weapon",
    "faccion_id": "halfling",
    "faccion_nombre": "Halflings",
    "nombre": "Arma a Distancia Halfling / Halfling Ranged Weapon",
    "tipo": "Equipo / Arma a Distancia",
    "coste": 15,
    "etiqueta": "Armería Halfling",
    "resumen": "Hondas, arcos cortos o ballestas ligeras.",
    "detalles": "Efectos: Otorga el ataque a distancia Shot (Power 5, Alcance 12\").",
    "restriccion": "Uso continuo mientras esté equipada."
  },
  {
    "id": "town_banner",
    "faccion_id": "halfling",
    "faccion_nombre": "Halflings",
    "nombre": "Estandarte del Pueblo / Town Banner",
    "tipo": "Objeto / Apoyo",
    "coste": 15,
    "etiqueta": "Armería Halfling",
    "resumen": "Bandera tradicional de la comarca.",
    "detalles": "Efectos: Permite a los aliados a 12\" o menos repetir Chequeos de Valentía fallidos.",
    "restriccion": "Debe ser portado por un personaje aliado."
  },
  {
    "id": "halfling_mount",
    "faccion_id": "halfling",
    "faccion_nombre": "Halflings",
    "nombre": "Montura Halfling / Halfling Mount",
    "tipo": "Equipo / Montura",
    "coste": 30,
    "etiqueta": "Armería Halfling",
    "resumen": "Oveja lana de hierro (Ironwool) o bestia de carga.",
    "detalles": "Efectos: Otorga +5 HP, +4 al Movimiento y el rasgo Ágil (Agile). Cambia la peana a 40mm.",
    "restriccion": "Solo para Sheriffs, Militia y Town Guard."
  },
  {
    "id": "potbelly_cauldron",
    "faccion_id": "halfling",
    "faccion_nombre": "Halflings",
    "nombre": "Caldero Panzón / Potbelly Cauldron",
    "tipo": "Equipo / Vehículo Mágico",
    "coste": 30,
    "etiqueta": "Armería Halfling",
    "resumen": "Caldero mágico con patas de bronce.",
    "detalles": "Efectos: Otorga +1 a la Armadura y genera 1 Ficha de Arcanita al inicio de la ronda tras superar 1D6. Peana de 40mm.",
    "restriccion": "Solo se puede equipar al Battle Cook."
  },
  {
    "id": "ranger_cloak",
    "faccion_id": "halfling",
    "faccion_nombre": "Halflings",
    "nombre": "Capa de Explorador / Ranger Cloak",
    "tipo": "Equipo / Camuflaje",
    "coste": 10,
    "etiqueta": "Armería Halfling",
    "resumen": "Manto de hojas para mimetismo.",
    "detalles": "Efectos: A 2\" o menos de cobertura o terreno, los ataques a distancia enemigos sufren +1 a la dificultad de la Hazaña.",
    "restriccion": "Requiere estar a 2\" de un elemento de terreno."
  },
  {
    "id": "imperial_ranged_weapon",
    "faccion_id": "imperial",
    "faccion_nombre": "Imperiales",
    "nombre": "Arma a Distancia Imperial / Imperial Ranged Weapon",
    "tipo": "Equipo / Arma a Distancia",
    "coste": 15,
    "etiqueta": "Armería Imperial",
    "resumen": "Ballesta imperial o mosquete de repetición.",
    "detalles": "Efectos: Otorga el ataque a distancia Shot (Power 5, Alcance 12\").",
    "restriccion": "Uso continuo."
  },
  {
    "id": "arquebus",
    "faccion_id": "imperial",
    "faccion_nombre": "Imperiales",
    "nombre": "Arcabuz de Pólvora / Arquebus",
    "tipo": "Equipo / Arma de Pólvora",
    "coste": 25,
    "etiqueta": "Armería Imperial",
    "resumen": "Potente arma de fuego con proyectiles de plomo.",
    "detalles": "Efectos: Ataque a distancia Arcabuzazo (Power 8, Alcance 16\"). Ignores 1 de Armadura.",
    "restriccion": "Requiere 2 AP para disparar."
  },
  {
    "id": "gunpowder_keg",
    "faccion_id": "imperial",
    "faccion_nombre": "Imperiales",
    "nombre": "Barril de Pólvora / Gunpowder Keg",
    "tipo": "Objeto / Explosivo",
    "coste": 20,
    "etiqueta": "Armería Imperial",
    "resumen": "Carga explosiva con mecha rápida.",
    "detalles": "Efectos: Se coloca en el mapa con Hazaña Media. Explotar causa 8 Hits de Poder 7 a todo personaje a 3\" y los deja Prone.",
    "restriccion": "De un solo uso."
  },
  {
    "id": "imperial_mount",
    "faccion_id": "imperial",
    "faccion_nombre": "Imperiales",
    "nombre": "Caballo de Guerra Imperial / Imperial Mount",
    "tipo": "Equipo / Montura",
    "coste": 30,
    "etiqueta": "Armería Imperial",
    "resumen": "Corcel blindado militar.",
    "detalles": "Efectos: Otorga +5 HP, +4 al Movimiento y peana de 50mm.",
    "restriccion": "Solo para Capitanes y Oficiales."
  },
  {
    "id": "animal_totem",
    "faccion_id": "ancient_dead",
    "faccion_nombre": "Antiguos Muertos (Ancient Dead)",
    "nombre": "Tótem Animal / Animal Totem",
    "tipo": "Objeto / Consumible",
    "coste": 10,
    "etiqueta": "Armería Ancient Dead",
    "resumen": "Tótem de marfil tallado con recuerdos de la vida mortal.",
    "detalles": "Efectos: Solo para personajes con Bones. Un solo uso. Al consumirse, el usuario o un aliado en contacto recupera D6 HP.",
    "restriccion": "Requiere tener el rasgo Bones."
  },
  {
    "id": "ancient_dead_ranged_weapon",
    "faccion_id": "ancient_dead",
    "faccion_nombre": "Antiguos Muertos (Ancient Dead)",
    "nombre": "Arma a Distancia Ancestral / Ancient Dead Ranged Weapon",
    "tipo": "Equipo / Arma a Distancia",
    "coste": 15,
    "etiqueta": "Armería Ancient Dead",
    "resumen": "Arcos de madera antigua, hondas y jabalinas de bronce.",
    "detalles": "Efectos: Otorga el ataque a distancia Shot (Power 5, Alcance 12\").",
    "restriccion": "Uso continuo."
  },
  {
    "id": "sacred_blade",
    "faccion_id": "ancient_dead",
    "faccion_nombre": "Antiguos Muertos (Ancient Dead)",
    "nombre": "Hoja Sagrada / Sacred Blade",
    "tipo": "Equipo / Arma Melé",
    "coste": 20,
    "etiqueta": "Armería Ancient Dead",
    "resumen": "Espada bendecida por los sacerdotes del antiguo imperio.",
    "detalles": "Efectos: Otorga +2 al Poder (Power) en todos los ataques de combate cuerpo a cuerpo.",
    "restriccion": "Arma melé."
  },
  {
    "id": "familiar_jar",
    "faccion_id": "ancient_dead",
    "faccion_nombre": "Antiguos Muertos (Ancient Dead)",
    "nombre": "Jarra de Familiar / Familiar Jar",
    "tipo": "Objeto / Invocación",
    "coste": 35,
    "etiqueta": "Armería Ancient Dead",
    "resumen": "Jarra de barro con los restos de un fiel sabueso de caza.",
    "detalles": "Efectos: Un solo uso. Romper la jarra despliega un Sabueso de las Tumbas (Barrow Hound) en contacto de peana listo para activarse.",
    "restriccion": "De un solo uso."
  },
  {
    "id": "circlet_of_bronze",
    "faccion_id": "ancient_dead",
    "faccion_nombre": "Antiguos Muertos (Ancient Dead)",
    "nombre": "Aro de Bronce / Circlet of Bronze",
    "tipo": "Equipo / Armadura Mágica",
    "coste": 30,
    "etiqueta": "Armería Ancient Dead",
    "resumen": "Diadema sagrada que otorga protección espiritual.",
    "detalles": "Efectos: Otorga +1 a la Armadura. Esta armadura nunca puede ser ignorada ni reducida por ningún ataque o hechizo.",
    "restriccion": "Armadura inexpugnable."
  },
  {
    "id": "skeleton_trumpet",
    "faccion_id": "ancient_dead",
    "faccion_nombre": "Antiguos Muertos (Ancient Dead)",
    "nombre": "Trompeta de Esqueleto / Skeleton Trumpet",
    "tipo": "Equipo / Instrumento",
    "coste": 10,
    "etiqueta": "Armería Ancient Dead",
    "resumen": "Cuerno de hueso que llena de vigor a los guerreros resucitados.",
    "detalles": "Efectos: Hazaña Fácil para tocar la trompeta: todos los aliados con el rasgo Bones a 6\" o menos ganan +1 al Movimiento esa ronda.",
    "restriccion": "Hazaña Fácil."
  },
  {
    "id": "cured_meat",
    "faccion_id": "beastfolk",
    "faccion_nombre": "Hombres Bestia (Beastfolk)",
    "nombre": "Carne Curada / Cured Meat",
    "tipo": "Objeto / Consumible",
    "coste": 10,
    "etiqueta": "Armería Beastfolk",
    "resumen": "Haggis de Troll y cecina conservada para travesías.",
    "detalles": "Efectos: Un solo uso. Recupera D6 HP al personaje o a un aliado en contacto de peana.",
    "restriccion": "De un solo uso."
  },
  {
    "id": "beastfolk_ranged_weapon",
    "faccion_id": "beastfolk",
    "faccion_nombre": "Hombres Bestia (Beastfolk)",
    "nombre": "Arma a Distancia Beastfolk / Beastfolk Ranged Weapon",
    "tipo": "Equipo / Arma a Distancia",
    "coste": 15,
    "etiqueta": "Armería Beastfolk",
    "resumen": "Hondas de cuero crudo, arcos de hueso y ballestas de madera.",
    "detalles": "Efectos: Otorga el ataque a distancia Shot (Power 5, Alcance 12\").",
    "restriccion": "Uso continuo."
  },
  {
    "id": "horns_and_tusks",
    "faccion_id": "beastfolk",
    "faccion_nombre": "Hombres Bestia (Beastfolk)",
    "nombre": "Cuernos y Colmillos / Horns and Tusks",
    "tipo": "Equipo / Mutación Corporal",
    "coste": 20,
    "etiqueta": "Armería Beastfolk",
    "resumen": "Cornamentas y colmillos prominentes en la peana.",
    "detalles": "Efectos: Otorga +1 al Poder (Power) en TODOS los ataques del personaje.",
    "restriccion": "Atributo físico permanente."
  },
  {
    "id": "protective_hide",
    "faccion_id": "beastfolk",
    "faccion_nombre": "Hombres Bestia (Beastfolk)",
    "nombre": "Piel Protectora / Protective Hide",
    "tipo": "Equipo / Armadura Natural",
    "coste": 20,
    "etiqueta": "Armería Beastfolk",
    "resumen": "Piel gruesa endurecida por cicatrices de combate.",
    "detalles": "Efectos: Otorga +1 al Valor de Armadura del personaje.",
    "restriccion": "Armadura natural."
  },
  {
    "id": "black_potion",
    "faccion_id": "dark_lords",
    "faccion_nombre": "Señores Oscuros (Dark Lords)",
    "nombre": "Poción Negra / Black Potion",
    "tipo": "Objeto / Consumible",
    "coste": 10,
    "etiqueta": "Armería Dark Lords",
    "resumen": "Elixir alquímico oscuro fermentado con arcanita.",
    "detalles": "Efectos: Un uso. Cura D6 HP al usuario o a un aliado en contacto de peana.",
    "restriccion": "De un solo uso."
  },
  {
    "id": "dark_lord_ranged_weapon",
    "faccion_id": "dark_lords",
    "faccion_nombre": "Señores Oscuros (Dark Lords)",
    "nombre": "Arma a Distancia Oscura / Dark Lord Ranged Weapon",
    "tipo": "Equipo / Arma a Distancia",
    "coste": 15,
    "etiqueta": "Armería Dark Lords",
    "resumen": "Arcos negros e instrumentos de tiro hobgoblin.",
    "detalles": "Efectos: Otorga el ataque a distancia Shot (Power 5, Alcance 12\").",
    "restriccion": "Uso continuo."
  },
  {
    "id": "slaver_whip",
    "faccion_id": "dark_lords",
    "faccion_nombre": "Señores Oscuros (Dark Lords)",
    "nombre": "Látigo de Esclavista / Slaver Whip",
    "tipo": "Equipo / Arma Melé",
    "coste": 10,
    "etiqueta": "Armería Dark Lords",
    "resumen": "Látigo largo con púas metálicas.",
    "detalles": "Efectos: Permite realizar ataques en combate melé a una distancia de hasta 3\" (incluso a través de aliados).",
    "restriccion": "Alcance de 3\" en melé."
  },
  {
    "id": "pilfered_scran",
    "faccion_id": "gremlins",
    "faccion_nombre": "Gremlins",
    "nombre": "Comida Robada / Pilfered Scran",
    "tipo": "Objeto / Consumible",
    "coste": 10,
    "etiqueta": "Armería Gremlins",
    "resumen": "Botín comestible birlado a otros viajeros.",
    "detalles": "Efectos: Un solo uso. Recupera D6 HP al consumidor o aliado en contacto.",
    "restriccion": "De un solo uso."
  },
  {
    "id": "gremlin_ranged_weapon",
    "faccion_id": "gremlins",
    "faccion_nombre": "Gremlins",
    "nombre": "Arma a Distancia Gremlin / Gremlin Ranged Weapon",
    "tipo": "Equipo / Arma a Distancia",
    "coste": 10,
    "etiqueta": "Armería Gremlins",
    "resumen": "Jabalinas, hondas pequeñas y piedras arrojadizas.",
    "detalles": "Efectos: Otorga el ataque a distancia Shot (Power 5, Alcance 12\").",
    "restriccion": "Uso continuo."
  },
  {
    "id": "burrowing_tools_item",
    "faccion_id": "gremlins",
    "faccion_nombre": "Gremlins",
    "nombre": "Herramientas de Excavación / Burrowing Tools",
    "tipo": "Equipo / Herramienta",
    "coste": 20,
    "etiqueta": "Armería Gremlins",
    "resumen": "Palas y picos para cavar túneles ultrarrápidos.",
    "detalles": "Efectos: Permite colocar marcadores de Gremlin Burrow en el mapa mediante Hazaña Media.",
    "restriccion": "Solo para Burrow Dwellers."
  },
  {
    "id": "pterra_wings",
    "faccion_id": "gremlins",
    "faccion_nombre": "Gremlins",
    "nombre": "Alas de Pterosaurio / Pterra Wings",
    "tipo": "Equipo / Volador",
    "coste": 20,
    "etiqueta": "Armería Gremlins",
    "resumen": "Alas de cuero sujetas con correas caseras.",
    "detalles": "Efectos: Otorga el rasgo Vuelo (Fly) y +4 al Movimiento.",
    "restriccion": "Solo para Burrow Dwellers."
  },
  {
    "id": "swamp_scrumpy",
    "faccion_id": "ourks",
    "faccion_nombre": "Ourks",
    "nombre": "Brebaje del Pantano / Swamp Scrumpy",
    "tipo": "Objeto / Consumible",
    "coste": 10,
    "etiqueta": "Armería Ourk",
    "resumen": "Potente licor casero destilado por los Ourks.",
    "detalles": "Efectos: Un solo uso. Recupera D6 HP o bien otorga +2 al Power en el siguiente ataque de melé pero deja al personaje Prone.",
    "restriccion": "De un solo uso."
  },
  {
    "id": "ourk_ranged_weapon",
    "faccion_id": "ourks",
    "faccion_nombre": "Ourks",
    "nombre": "Arma a Distancia Ourk / Ourk Ranged Weapon",
    "tipo": "Equipo / Arma a Distancia",
    "coste": 15,
    "etiqueta": "Armería Ourk",
    "resumen": "Arcos pesados de madera verde y lanzas arrojadizas.",
    "detalles": "Efectos: Otorga el ataque a distancia Shot (Power 5, Alcance 12\").",
    "restriccion": "Uso continuo."
  },
  {
    "id": "soul_jar",
    "faccion_id": "undead_raiders",
    "faccion_nombre": "Saqueadores No-Muertos (Undead Raiders)",
    "nombre": "Jarra de Almas / Soul Jar",
    "tipo": "Objeto / Consumible",
    "coste": 10,
    "etiqueta": "Armería Undead Raiders",
    "resumen": "Tarro de cristal con la esencia espiritual de una víctima.",
    "detalles": "Efectos: Un solo uso. Recupera D6 HP al usuario o a un personaje no-muerto en contacto.",
    "restriccion": "De un solo uso."
  },
  {
    "id": "undead_mount",
    "faccion_id": "undead_raiders",
    "faccion_nombre": "Saqueadores No-Muertos (Undead Raiders)",
    "nombre": "Montura No-Muerta / Undead Mount",
    "tipo": "Equipo / Montura",
    "coste": 30,
    "etiqueta": "Armería Undead Raiders",
    "resumen": "Corcel o bestia esquelética reanimada.",
    "detalles": "Efectos: Otorga +5 HP, +4 al Movimiento y cambia la peana a 50mm.",
    "restriccion": "Montura para líderes."
  },
  {
    "id": "cursed_pipes",
    "faccion_id": "undead_raiders",
    "faccion_nombre": "Saqueadores No-Muertos (Undead Raiders)",
    "nombre": "Gaitas Malditas / Cursed Pipes",
    "tipo": "Equipo / Instrumento Maldito",
    "coste": 30,
    "etiqueta": "Armería Undead Raiders",
    "resumen": "Gaitas que atraen a las ratas de la tumba.",
    "detalles": "Efectos: Otorga el rasgo Raiser of the Dead para resucitar Carrion Rats con Hazaña Fácil. Otorga Pack Hunter a las ratas a 12\".",
    "restriccion": "Control de plagas."
  },
  {
    "id": "blood_vial",
    "faccion_id": "vampires",
    "faccion_nombre": "Vampiros (Vampires)",
    "nombre": "Vial de Sangre / Blood Vial",
    "tipo": "Objeto / Consumible",
    "coste": 10,
    "etiqueta": "Armería Vampires",
    "resumen": "Frasco con sangre fresca cosechada de víctimas nobles.",
    "detalles": "Efectos: Solo para Vampiros. Un uso. Al consumirse recupera D6 HP al usuario o a un vampiro en contacto.",
    "restriccion": "Exclusivo de Vampiros."
  },
  {
    "id": "vampyr_supreme",
    "faccion_id": "vampires",
    "faccion_nombre": "Vampiros (Vampires)",
    "nombre": "Vampiro Supremo / Vampyr Supreme",
    "tipo": "Linaje Sangriento / Ancestral",
    "coste": 30,
    "etiqueta": "Armería Vampires",
    "resumen": "Señor absoluto de la estirpe nobiliaria.",
    "detalles": "Efectos: Otorga la clase Comandante, +1 AP extra y +6 HP permanentes.",
    "restriccion": "Obligatorio 1 en la banda."
  },
  {
    "id": "beguiling_temperament",
    "faccion_id": "vampires",
    "faccion_nombre": "Vampiros (Vampires)",
    "nombre": "Temperamento Cautivador / Beguiling Temperament",
    "tipo": "Linaje Sangriento / Ancestral",
    "coste": 20,
    "etiqueta": "Armería Vampires",
    "resumen": "Encanto irresistible para subyugar voluntades.",
    "detalles": "Efectos: Añade 1D6 adicional a todos los intentos de la habilidad Enthral.",
    "restriccion": "Mejora de Enthral."
  },
  {
    "id": "shapeshifter",
    "faccion_id": "vampires",
    "faccion_nombre": "Vampiros (Vampires)",
    "nombre": "Cambiaformas / Shapeshifter",
    "tipo": "Linaje Sangriento / Ancestral",
    "coste": 15,
    "etiqueta": "Armería Vampires",
    "resumen": "Metamorfosis en murciélago gigante.",
    "detalles": "Efectos: Hazaña Fácil para transformarse en un Crypt Bat a full HP. Puede volver a su forma original en su activación.",
    "restriccion": "Transformación voluntaria."
  },
  {
    "id": "wild_elven_mount",
    "faccion_id": "wild_elves",
    "faccion_nombre": "Elfos Silvanos (Wild Elves)",
    "nombre": "Montura Silvana / Wild Elven Mount",
    "tipo": "Equipo / Montura Mágica",
    "coste": 30,
    "etiqueta": "Armería Wild Elves",
    "resumen": "Criatura invocada de ramas, madera y hueso.",
    "detalles": "Efectos: Solo para personajes con el rasgo Summoner. Otorga +5 HP, +4 al Movimiento y peana de 50mm.",
    "restriccion": "Solo Summoners."
  },
  {
    "id": "strongbow",
    "faccion_id": "wild_elves",
    "faccion_nombre": "Elfos Silvanos (Wild Elves)",
    "nombre": "Gran Arco Silvano / Strongbow",
    "tipo": "Equipo / Arma a Distancia",
    "coste": 30,
    "etiqueta": "Armería Wild Elves",
    "resumen": "Arco colosal que requiere fuerza elfa sobrehumana.",
    "detalles": "Efectos: Otorga el ataque a distancia Shot (Power 8, Alcance 18\").",
    "restriccion": "Alcance 18\"."
  },
  {
    "id": "vitality_gem",
    "faccion_id": "wizards",
    "faccion_nombre": "Magos (Wizards)",
    "nombre": "Gema de Vitalidad / Vitality Gem",
    "tipo": "Objeto / Consumible",
    "coste": 10,
    "etiqueta": "Armería Wizards",
    "resumen": "Amuleto de arcanita cargado con hechizos de longevidad.",
    "detalles": "Efectos: Un uso solo. Cura D6 HP al usuario o a un aliado en contacto de peana.",
    "restriccion": "De un solo uso."
  },
  {
    "id": "wizard_ranged_weapon",
    "faccion_id": "wizards",
    "faccion_nombre": "Magos (Wizards)",
    "nombre": "Arma a Distancia Arcana / Wizard Ranged Weapon",
    "tipo": "Equipo / Varita o Bastón",
    "coste": 15,
    "etiqueta": "Armería Wizards",
    "resumen": "Varita o báculo cargado con proyectiles mágicos.",
    "detalles": "Efectos: Solo para Wizards o Apprentices. Otorga el ataque Shot (Power 5, Alcance 14\").",
    "restriccion": "Alcance 14\"."
  },
  {
    "id": "wizard_mount",
    "faccion_id": "wizards",
    "faccion_nombre": "Magos (Wizards)",
    "nombre": "Montura Arcana / Wizard Mount",
    "tipo": "Equipo / Montura Mágica",
    "coste": 30,
    "etiqueta": "Armería Wizards",
    "resumen": "Alfombra voladora o bestia elemental invocada.",
    "detalles": "Efectos: Solo para Wizards o Apprentices. Otorga +5 HP, +4 al Movimiento, el rasgo Ágil (Agile) y peana de 40mm.",
    "restriccion": "Montura de Mago."
  },
  {
    "id": "pilfered_tome",
    "faccion_id": "wizards",
    "faccion_nombre": "Magos (Wizards)",
    "nombre": "Tomo Robado / Pilfered Tome",
    "tipo": "Objeto / Grimorio Stolen",
    "coste": 10,
    "etiqueta": "Armería Wizards",
    "resumen": "Grimorio sustraído a un rival de otra escuela elemental.",
    "detalles": "Efectos: Permite lanzar 1 hechizo del saber de otro Colegio. Tras usarse (tenga éxito o falle), el libro se quema y se destruye.",
    "restriccion": "De un solo uso."
  }
];

const faccionesCompendioDB = {
  habilidadesFaccion: habilidadesFaccionDB,
  rasgosUnidades: rasgosUnidadesDB,
  armeriaExclusiva: armeriaExclusivaDB
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    habilidadesFaccionDB,
    rasgosUnidadesDB,
    armeriaExclusivaDB,
    faccionesCompendioDB
  };
} else {
  window.habilidadesFaccionDB = habilidadesFaccionDB;
  window.rasgosUnidadesDB = rasgosUnidadesDB;
  window.armeriaExclusivaDB = armeriaExclusivaDB;
  window.faccionesCompendioDB = faccionesCompendioDB;
}
