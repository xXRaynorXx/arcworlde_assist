// Base de datos de Rasgos Consolidada ArcWorlde (Versión Completa v2)
// Incluye rasgos de Facción, Unidades, Bestiario, Mercenarios y Reglas Especiales

const datosRasgos = {
  "Nación Colonizadora / Settler Nation": {
    "resumen": "Expansión militar del Imperio aliada con colonos locales.",
    "detalles": "Efectos: Puedes reclutar personajes de las facciones Halfling y Njorsvald sin penalización de infidelidad."
  },
  "Dar y Recibir Órdenes / Make/Take Orders": {
    "resumen": "Cadena de mando para coordinar acciones grupales de la milicia.",
    "detalles": "Efectos: Un personaje con Make Orders emite una orden a aliados con Take Orders a 12\" tras superar una Hazaña Fácil."
  },
  "El Gran Libro de Cocina / Grand Cookbook of Bulbo Chubb": {
    "resumen": "Magia gastronómica infundida con Arcanita para potenciar o curar aliados.",
    "detalles": "Efectos: Acceso al saber mágico con hechizos de curación, bonificación al movimiento y potenciadores de combate."
  },
  "Comandos Militares / Make/Take Orders": {
    "resumen": "Ordenanza táctica prusiano-imperial para mover y disparar en bloque.",
    "detalles": "Efectos: Permite mandar '¡Fuego a Discreción!', '¡Formad Línea!' o '¡Avance Rápido!' a soldados a 12\"."
  },
  "El Más Allá / Afterlife": {
    "resumen": "Convicción absoluta de encontrarse en el paraíso prometido.",
    "detalles": "Efectos: Los personajes con este rasgo superan automáticamente todos los Chequeos de Valentía."
  },
  "Huesos Antiguos / Bones": {
    "resumen": "Anatomía esquelética sin carne ni órganos que dañar.",
    "detalles": "Efectos: Permite hacer una Hazaña Fácil para recolocar sus huesos y recuperar D3 HP. Además, cuentan como si estuvieran en Cobertura contra ataques a distancia."
  },
  "Legiones No-Muertas / Undead Legions": {
    "resumen": "Bribones y piratas resucitados unidos a otros no-muertos.",
    "detalles": "Efectos: Puedes reclutar unidades de las facciones Vampires y Ancient Dead."
  },
  "Clanes Nómadas / Nomadic Clans": {
    "resumen": "Vida errante por los valles salvajes compartida con otros clanes.",
    "detalles": "Efectos: Puedes incluir unidades de las facciones Ourks y Gremlins en tu banda."
  },
  "Parentesco Bestial / Beastkin": {
    "resumen": "Afinidad natural con los monstruos y bestias del bosque.",
    "detalles": "Efectos: Todas las Bestias, Monstruos o Titanes contratados del Bestiario tienen un 20% de descuento en su coste de GP."
  },
  "Jerarquía del Clan / Diminutive & Intimidating": {
    "resumen": "Los brutos dominan a las sabandijas más pequeñas del clan.",
    "detalles": "Efectos: La caída de unidades Diminutive no fuerza chequeos de Valentía en líderes Intimidating. Además, minis Diminutive a 6\" de un Intimidating re-repiten 1 fallo al atacar."
  },
  "La Voluntad del Oscuro / The Dark One's Will": {
    "resumen": "Personalización táctica de la obsesión del Comandante antes de la partida.",
    "detalles": "Efectos: Elige 1 rasgo: Fell Warrior (+1 AP extra por cada KO causado), Dark Warlock (Mago + Lore of Villainy), Master of the Horde (-20% GP Hobgoblins), Beast Master (-20% GP Bestiario)."
  },
  "Pactos Malevolentes / Fae Beings": {
    "resumen": "Alianzas oscuras con magos renegados y elfos oscuros.",
    "detalles": "Efectos: Puedes reclutar unidades de las facciones Wizards y Wild Elves."
  },
  "Escurridizo / Born Slippy": {
    "resumen": "Agilidad diminuta para zafarse del combate cuerpo a cuerpo.",
    "detalles": "Efectos: Permite repetir cualquier tirada de Hazaña fallida al intentar Desengancharse (Disengage) del combate."
  },
  "Habitante de Madrigueras / Burrow Dweller": {
    "resumen": "Uso de la red subterránea para curarse y teletransportarse.",
    "detalles": "Efectos: En contacto con un Gremlin Burrow, una Hazaña Fácil sumerge al personaje, retirándolo del tablero y curándole D3 HP. Reaparece en cualquier madriguera la ronda siguiente."
  },
  "Nómadas de los Pantanos / Nomads": {
    "resumen": "Bandas errantes de los pantanos del sur.",
    "detalles": "Efectos: Puedes reclutar unidades de las facciones Beastfolk y Gremlins."
  },
  "Lucha de Poder / Power Struggle": {
    "resumen": "Rivalidad constante entre el Chieftain y el Dreameater por el mando.",
    "detalles": "Efectos: Si tienes ambos en la lista, realizan un enfrentamiento de Valentía al inicio de cada ronda. El ganador obtiene bonificaciones en su perfil y el perdedor sufre -1 AP."
  },
  "Resurrección del Pescador / Raiser of the Dead": {
    "resumen": "Los Harbingers traen de vuelta a los rufianes caídos en combate.",
    "detalles": "Efectos: Mediante una Hazaña, resucita unidades No-Muertas caídas en el mismo lugar donde cayeron con el 50% de sus HP iniciales."
  },
  "Cautivar / Enthral": {
    "resumen": "Poder hipnótico para convertir enemigos heridos en sirvientes sumisos.",
    "detalles": "Efectos: En contacto de peana, realiza una Hazaña (Easy/Medium/Hard/Legendary según HP y peana del rival) para transformar al enemigo en un Thrall bajo tu control."
  },
  "Insignificantes / Insignificant": {
    "resumen": "Desprecio absoluto por la vida de sus sirvientes y plebeyos.",
    "detalles": "Efectos: La caída o noqueo de sirvientes y Thralls no obliga a los Vampiros a realizar Chequeos de Valentía."
  },
  "Magia de Sangre y Sacrificio / Summoner & Sacrifice": {
    "resumen": "Invocación de criaturas de madera mediante ofrendas de vida.",
    "detalles": "Efectos: Los Druidas invocan Woodfiends y Briarbeasts sacrificando HP propio o noqueando unidades aliadas de apoyo."
  },
  "Pactos Arcanos / Fae Beings": {
    "resumen": "Lazos milenarios con los magos y las fuerzas de la naturaleza.",
    "detalles": "Efectos: Puedes reclutar personajes de las facciones Wizards y Dark Lords."
  },
  "Los Colegios de Mt Orion / Colleges of Mt Orion": {
    "resumen": "Especialización elemental entre los seis Colegios Mágicos.",
    "detalles": "Efectos: Elige la escuela mágica antes de la partida (Crimson, Sapphire, Emerald, Ochre, Bronze, Opal) para acceder a su saber exclusivo."
  },
  "Entidades de Magia / Thing of Magic": {
    "resumen": "Constructos y duendes arcanos traídos a la vida por los magos.",
    "detalles": "Efectos: No se despliegan al inicio. Se invocan en mesa mediante el hechizo Conjure Sprites. Si caen KO, pueden reconjurarse la ronda siguiente."
  },
  "Dar Órdenes / Make Orders": {
    "resumen": "Permite al líder emitir comandos tácticos a las tropas de la milicia.",
    "detalles": "Efectos: Con una Hazaña Fácil, emite órdenes como '¡Como Uno!' (activa hasta 3 minis juntas) o '¡Manteneos Firmes!' (supera Valentía automáticamente)."
  },
  "Recibir Órdenes / Take Orders": {
    "resumen": "Disciplina de la tropa para responder a las órdenes del mando.",
    "detalles": "Efectos: Permite a las unidades activarse en grupo o recibir beneficios de las órdenes emitidas por un líder."
  },
  "Ánimo Entusiasta / Rousing Cheer": {
    "resumen": "Aura de valentía del Sheriff para inspirar a la milicia.",
    "detalles": "Efectos: Todos los aliados con Take Orders a 8\" o menos utilizan la Valentía del Sheriff (Valor 9)."
  },
  "Guardaespaldas / Bodyguard": {
    "resumen": "Protección para interceptar ataques dirigidos al Comandante.",
    "detalles": "Efectos: Si está en contacto de peana con un Comandante aliado, puede redirigir a sí mismo cualquier impacto exitoso sufrido por el Comandante."
  },
  "Tripulación y Carga Aleatoria / Crew & Random Payload": {
    "resumen": "Catapulta que dispara proyectiles impredecibles con apoyo de la milicia.",
    "detalles": "Efectos: La milicia en contacto puede donar AP. Tira 1D6 para el efecto del proyectil (1: Tripulación enviada, 2: Verduras/Terreno difícil, 3: Cuchillos/Ignora armadura, 4: Amigos de granja/Área, 5: Piedra/Power 9, 6: Brebaje explosivo/Prone en área)."
  },
  "Liderar desde la Vanguardia / Lead from the Front": {
    "resumen": "Inspiración marcial del Capitán Imperial.",
    "detalles": "Efectos: Si el Capitán está en combate melé, los aliados a 6\" ganan +1 al Poder (Power) de sus ataques."
  },
  "Armadura Pesada / Heavy Armour": {
    "resumen": "Coraza metálica de placas imperiales.",
    "detalles": "Efectos: Otorga Valor de Armadura 1 automático contra todos los impactos normales."
  },
  "Maestro de la Pólvora / Gunpowder Master": {
    "resumen": "Mantenimiento y recarga experta de armas de fuego.",
    "detalles": "Efectos: Permite a los aliados a 6\" repetir tiradas de ataque pifiadas con armas de pólvora (Arquebus)."
  },
  "Constructo Autómata / Tinkered Construct": {
    "resumen": "Mecanismo autómata sin sentimientos.",
    "detalles": "Efectos: Inmune a chequeos de Valentía y efectos de terror. Si sufre un impacto crítico, pierde 1 AP en su siguiente activación."
  },
  "Huesos / Bones": {
    "resumen": "Estructura ósea mágica resistente a flechas.",
    "detalles": "Efectos: Hazaña Fácil para curar D3 HP (pull self together). Cobertura permanente contra proyectiles."
  },
  "Horda Enterrada / Buried Horde": {
    "resumen": "Armamento ancestral conservado en los sarcófagos.",
    "detalles": "Efectos: Todo el equipo de la Armería Común equipado a un Tomb Guardian tiene un 25% de descuento en GP (redondeado hacia arriba)."
  },
  "Espíritu de la Reliquia / Spirit of the Relic": {
    "resumen": "Alma atada a un objeto sagrado que ataca a los profanadores.",
    "detalles": "Efectos: Ataca automáticamente con aullidos de área (Power 6 a 4\") a cualquier enemigo que intente acercarse o tocar la reliquia."
  },
  "Intimidador / Intimidating": {
    "resumen": "Estatura e imponencia física que infunde respeto.",
    "detalles": "Efectos: Permite a los aliados Diminutive a 6\" repetir 1 fallo de ataque por ronda y previene pánico al caer las tropas pequeñas."
  },
  "¡A por Ellos! / Go Get’Em!": {
    "resumen": "Impulso de las alimañas cuando su líder las empuja a la carga.",
    "detalles": "Efectos: Si el Verman está a 6\" de un personaje Intimidating, puede repetir la tirada de Leg It si el objetivo es cargar a un enemigo."
  },
  "Baladas del Clan / Ballads of the Beastfolk": {
    "resumen": "Música estridente tocada con instrumentos estrafalarios.",
    "detalles": "Efectos: Una vez por activación, tira 1D6: (1-2) Tooting: +1 Movimiento a 6\"; (3-4) Honking: cura 1 HP a aliados a 6\"; (5-6) Blaring: +1 Power a ataques a 6\"."
  },
  "Esencia Ígnea / Fiery Essence": {
    "resumen": "Criaturas creadas a partir de la propia fuerza vital del Señor Oscuro.",
    "detalles": "Efectos: No se despliegan al inicio. El Señor Oscuro los invoca sacrificando 2 HP y reduciendo su HP máximo en 2."
  },
  "Destrucción Abrasadora / Blazing Demise": {
    "resumen": "Autodestrucción mágica para calcinar a los enemigos cercanos.",
    "detalles": "Efectos: Ataque de Power 6 a todos los personajes a 2\". El Underling se noquea y devuelve 1 HP máximo al Señor Oscuro."
  },
  "Capataz / Slavedriver": {
    "resumen": "Castigo físico para mantener la disciplina hobgoblin.",
    "detalles": "Efectos: Resta 1 HP a un Hobgoblin a 6\" para ignorar un Chequeo de Valentía fallido."
  },
  "Portadores de Escudo / Shield Carriers": {
    "resumen": "Escolta de esbirros que cargan a hombros al gran líder.",
    "detalles": "Efectos: Otorga +8 HP extra, +1 a la Armadura y cambia la peana a 50mm."
  },
  "Herramientas de Excavación / Burrowing Tools": {
    "resumen": "Capacidad de cavar nuevas entradas a la red subterránea.",
    "detalles": "Efectos: Con Hazaña Media, coloca un token de Gremlin Burrow en terreno abierto en contacto de peana."
  },
  "Lanzamiento de Boglin / Hurl Boglin": {
    "resumen": "Agarra a un Boglin aliado y lo lanza violentamente contra el enemigo.",
    "detalles": "Efectos: Lanza un Boglin a 8\" infligiendo D6 Hits de Power 6 al objetivo y dejando al Boglin Prone."
  },
  "Frenesí de Brebaje / Booze Frenzy": {
    "resumen": "Ataque devastador bajo los efectos de brebajes del pantano.",
    "detalles": "Efectos: Ataque de Power 9 por 2 AP. Tras ejecutar el ataque, el Brewzerker cae automáticamente en estado Prone."
  },
  "Resucitado / Risen": {
    "resumen": "Cadáver animado por artes nigrománticas.",
    "detalles": "Efectos: Permite ser objetivo de las habilidades y hechizos de resurrección de los Harbingers."
  },
  "Señuelo de la Luz / Lure of the Light": {
    "resumen": "Luz hipnótica que atrae a las víctimas hacia el peligro.",
    "detalles": "Efectos: Enemigos a 8\" que se activen deben pasar un Chequeo de Valentía o gastar su movimiento dirigiéndose hacia ella."
  },
  "Mirada Vampírica / Vampiric Glare": {
    "resumen": "Parálisis hipnótica fija en los ojos de la víctima.",
    "detalles": "Efectos: Un enemigo a 6\" debe superar Valentía o no podrá realizar ningún movimiento durante el resto de la ronda."
  },
  "Garras Desgarradoras / Raking Claws": {
    "resumen": "Zarpazos letales capaces de despedazar armaduras pesadas.",
    "detalles": "Efectos: Ataque de Power 7. Los impactos críticos ignoran y destruyen 1 punto de Armadura del objetivo."
  },
  "Ágil / Agile": {
    "resumen": "Gracia sobrehumana para desplazarse por el follaje denso.",
    "detalles": "Efectos: Ignora todas las penalizaciones por terreno difícil en el movimiento y tiradas de Leg It."
  },
  "Ráfaga de Hojas / Flurry of Blades": {
    "resumen": "Velocidad de estocadas relámpago con espadas de maderaoscura.",
    "detalles": "Efectos: Ataque de Power 7. Cada impacto crítico permite tirar 1 dado de ataque extra."
  },
  "Mago / Mage": {
    "resumen": "Dominio de las corrientes arcanas y robo de cartas del ArcDeck.",
    "detalles": "Efectos: Permite robar cartas del ArcDeck gastando AP para lanzar hechizos de su escuela."
  },
  "Armadura Ligera Innatas / Light Armour (Gratis)": {
    "resumen": "La unidad viene equipada de serie con Armadura Ligera sin coste adicional de GP.",
    "detalles": "Efectos: Otorga +1 al Valor de Armadura de la miniatura desde el inicio de la partida. No requiere gasto de GP en la Armería Común."
  },
  "Armadura Pesada Innata / Heavy Armour (Gratis)": {
    "resumen": "La Guardia del Pueblo está equipada de serie con placas de armadura pesada.",
    "detalles": "Efectos: Otorga +2 al Valor de Armadura de la miniatura desde el inicio. Las tiradas de Leg It sufren +1 a la dificultad."
  },
  "Cofre Mecánico / Contraption Trunk": {
    "resumen": "Baúl autómata con patas de latón impulsadas por Arcanita que transporta los inventos del Tinkerer.",
    "detalles": "Efectos: El Cofre Mecánico es un personaje seguidor gratis en peana de 30mm. Se mueve hasta 6\" cada vez que se activa el Tinkerer y no puede ser noqueado."
  },
  "Lanza Arcana Innata / Arclance": {
    "resumen": "Lanza tecnológica que canaliza descargas de Arcanita.",
    "detalles": "Efectos: Cuenta como una Lanza de serie. El jugador puede gastar 1 Ficha de Arcanita para añadir +2 al Power de todos sus ataques en esa activación, sufriendo D3 Hits de rebote."
  },
  "Armadura Encantada Innata / Enchanted Armour": {
    "resumen": "Armadura mágica autómata que protege a los Magos de Mt Orion.",
    "detalles": "Efectos: Otorga +2 al Valor de Armadura gratis y supera automáticamente los chequeos de Valentía. Al ser noqueado, deja caer un objeto de Heavy Armour."
  },
  "Diminuto / Diminutive": {
    "resumen": "Criaturas de tamaño reducido que no causan impacto moral al caer KO.",
    "detalles": "Efectos: Cuando un personaje con este rasgo queda KO, los aliados cercanos (especialmente los Intimidadores) no realizan chequeos de Valentía."
  },
  "Temible / Fearsome": {
    "resumen": "Monstruos o entidades pavorosas que provocan pánico.",
    "detalles": "Efectos: Los enemigos que deseen trabarse en combate o activarse a corta distancia deben superar un Chequeo de Valentía."
  },
  "Cazador de Manada / Pack Hunter": {
    "resumen": "Tácticas de acoso en grupo para derribar presas más grandes.",
    "detalles": "Efectos: Otorga +1 al Power o ventaja en los ataques si hay otros aliados con el mismo rasgo trabados con la misma víctima."
  },
  "Activación Dividida / Split Activation": {
    "resumen": "Bestias o criaturas gigantes que pueden actuar en múltiples momentos del turno.",
    "detalles": "Efectos: Permite dividir los Puntos de Acción (AP) en dos activaciones separadas a lo largo de la ronda."
  },
  "Fuerza Decreciente / Dwindling Strength": {
    "resumen": "Pérdida de efectividad a medida que sufre heridas.",
    "detalles": "Efectos: El valor de Power o AP se reduce proporcionalmente a los Puntos de Vida (HP) perdidos."
  },
  "Agonía Mortal / Death Throes": {
    "resumen": "Reacción violenta al ser derrotado.",
    "detalles": "Efectos: Al quedar Noqueado (KO), inflige impactos automáticos a todas las miniaturas en contacto de peana."
  },
  "Engullir / Gobble": {
    "resumen": "Capacidad de tragar enemigos enteros o devorar restos.",
    "detalles": "Efectos: Ataque especial que permite eliminar a un objetivo diminuto o malherido recuperando HP al hacerlo."
  },
  "Volar / Fly": {
    "resumen": "Desplazamiento aéreo sobre escenografía y unidades.",
    "detalles": "Efectos: Ignora penalizaciones de terreno vertical o elementos de escenografía durante el movimiento."
  },
  "Inflamable / Flammable": {
    "resumen": "Vulnerabilidad extrema al fuego y la magia abrasadora.",
    "detalles": "Efectos: Los ataques con atributos de fuego infligen daño adicional o ignoran tiradas de defensa."
  },
  "Invocado / Summoned": {
    "resumen": "Entidad mágica creada temporalmente en el tablero.",
    "detalles": "Efectos: No despliega al inicio de la partida y desaparece al ser desintegrada o al terminar la ronda."
  },
  "Masivo / Massive": {
    "resumen": "Criatura de gran volumen físico y peana pesada.",
    "detalles": "Efectos: Ocupa mayor espacio físico en el tablero. No puede ser empujada ni derribada por personajes de peanas de 30mm o 40mm, y otorga Cobertura a aliados detrás de ella."
  },
  "No-Muerto / Undead": {
    "resumen": "Entidad desprovista de biología viva mantenida por magia o fuerza de voluntad.",
    "detalles": "Efectos: Inmune a chequeos de pánico/miedo convencionales. Solo puede ser curada mediante magia nigromántica o ítems específicos (Soul Jar, Blood Vial, Animal Totem)."
  },
  "Regeneración / Regeneration": {
    "resumen": "Capacidad biológica o mágica de sanar heridas de forma progresiva.",
    "detalles": "Efectos: Si el personaje no está en contacto de peana con un enemigo al final de la Ronda (o Activación según variante), recupera D3 o D6 HP."
  },
  "Lanzable / Throwable": {
    "resumen": "Miniatura pequeña que puede ser utilizada como proyectil viviente.",
    "detalles": "Efectos: Personajes aliados con el rasgo Hurl o Intimidating en contacto de peana pueden lanzar a esta miniatura contra un enemigo como un ataque a distancia."
  },
  "Titán / Titan": {
    "resumen": "Monstruo de escala gigantesca con resistencia y poder destructivo descomunales.",
    "detalles": "Efectos: Peana de 50mm a 100mm+, reserva masiva de HP (50-100+), posee el rasgo Activación Dividida (Split Activation) para actuar múltiples veces por ronda e ignora empujones."
  },
  "Extremidades Largas / Long Limbs": {
    "resumen": "Brazos o tentáculos alargados que amplían la zona de amenaza.",
    "detalles": "Efectos: Aumenta el alcance para trabarse en combate cuerpo a cuerpo y permite realizar ataques melé o interactuar con objetivos a mayor distancia."
  },
  "Energía Arcana / Arc Energy": {
    "resumen": "Capacidad para manipular y canalizar cristales de Arcanita.",
    "detalles": "Efectos: Permite acumular, generar o consumir Tokens de Arcanita para potenciar hechizos, recargar armas de fuego pesadas o activar mecanismos de artillería."
  },
  "Pirómano / Arson Around": {
    "resumen": "Afinidad del Dark Lord con la destrucción mediante fuego despiadado.",
    "detalles": "Efectos: Los ataques de fuego y hechizos del Lore of Villainy infligen +2 al Power contra objetivos Inflamables (Flammable) y pueden prender escenografía."
  },
  "Formas Animales / Animal Form": {
    "resumen": "Fisiología adaptativa de las tribus de Hombres Bestia.",
    "detalles": "Efectos: Opciones de armería para personalizar la miniatura: Quitina (+1 Armadura), Mandíbulas/Cornamenta (+1 Power), Patas Largas (+2 Movimiento y Ágil), Camuflaje (+1 Dificultad a disparos enemigos)."
  },
  "Saber de Diente y Pelaje / Lore of Tooth and Fur": {
    "resumen": "Magia ancestral chamánica canalizada por las Hedgewitches.",
    "detalles": "Efectos: Acceso a la lista de hechizos de naturaleza y transformación (Forest Creatures, Warging), usando fetiches y huesos para sanar o dominar bestias."
  },
  "Acuático / Waterborne": {
    "resumen": "Adaptación anfibia a ríos, ciénagas y terreno de agua.",
    "detalles": "Efectos: Se desplaza por terreno acuático como si fuera terreno abierto, ganando +1 pulgada al Movimiento (incluyendo Leg It) y ventaja en Proezas realizadas en el agua."
  },
  "¡Levantaos de la Tumba! / Rise from Your Grave!": {
    "resumen": "Poder de mando del Grave Lord para reanimar a sus antiguos guerreros.",
    "detalles": "Efectos: Si un aliado con el rasgo Bones cae Noqueado (KO) a 6 pulgadas o menos del Grave Lord, se tira 1D6: con un resultado Crítico regresa inmediatamente al combate con 1 HP."
  },
  "Pies de Alquitrán / Tar Footed": {
    "resumen": "El lodo sagrado de la ciénaga atrapa a los enemigos cercanos al Bog Magus.",
    "detalles": "Efectos: Todos los personajes enemigos a 3 pulgadas o menos del Bog Magus ven su Movimiento reducido a 1 pulgada y sufren Desventaja en todas las tiradas de Leg It."
  },
  "Señor No-Muerto / Undead Lord": {
    "resumen": "Dominio supremo del Vampiro noble sobre sus sirvientes e hordas no-muertas.",
    "detalles": "Efectos: Permite al Comandante subordinar unidades de Ancient Dead y Undead Raiders, e inspirar/comandar a sus Manservants y Thralls sin chequeos de moral."
  },
  "Poderes de Linaje / Bloodline Powers": {
    "resumen": "Dones de sangre heredados por los nobles Vampiros.",
    "detalles": "Efectos: Habilidades permanentes compradas en la Armería (Vampyr Supreme: +1 AP, +6 HP y Clase Comandante; Everlasting Bloodline: curable por viales tras KO; Fell Scholar: conocimiento de magia oscura)."
  },
  "Subserviente / Subservient": {
    "resumen": "Devoción ciega de los siervos y thralls hacia sus amos vampiros.",
    "detalles": "Efectos: La miniatura pasa automáticamente los chequeos de Valentía cuando está a 6 pulgadas o menos de un Vampiro noble y no puede rehusar órdenes."
  },
  "Servicio Devoto / Devoted Service": {
    "resumen": "Lealtad del Manservant para proteger a su amo.",
    "detalles": "Efectos: Si está en contacto de peana con un Vampiro aliado, el Manservant puede interceptar y recibir los ataques dirigidos al Vampiro o donarle sus AP no utilizados."
  },
  "Resurrección / Raiser of the Dead": {
    "resumen": "Capacidad nigromántica del Harbinger para levantar bandidos caídos.",
    "detalles": "Efectos: Mediante una Hazaña Fácil, devuelve al combate a personajes No-Muertos (o Carrion Rats con Cursed Pipes) que hayan sido noqueados en la batalla."
  },
  "Señor de los Forajidos / Outlaw Lord": {
    "resumen": "Liderazgo de los Harbingers sobre bandas de proscritos no-muertos.",
    "detalles": "Efectos: Otorga bonificadores de moral y coordinación táctica a los Undead Bandits y piratas reanimados a su alrededor."
  },
  "Magia de Sangre / Blood Magic": {
    "resumen": "Ritos de sacrificio de los Elfos Silvanos para dar vida a la madera.",
    "detalles": "Efectos: Permite al Druida canalizar la energía vital de sacrificios para invocar y controlar construcciones vegetales como Woodfiends y Briarbeasts."
  },
  "Saber del Bosque Profundo / Woodlore (Lore of the Darkwood)": {
    "resumen": "Dominio druídico sobre los elementos y la flora de Mildaark.",
    "detalles": "Efectos: Acceso a hechizos para crear enredaderas abrasadoras (Tangleweed), bosques vengativos (Merciless Wood) y alterar la movilidad enemiga."
  },
  "Nacido del Pantano / Swamp Born": {
    "resumen": "Naturaleza anfibia de los Ourks adaptada al fango de las ciénagas.",
    "detalles": "Efectos: Ignora penalizaciones de movimiento por terreno difícil cenagoso o pantanoso y repite tiradas para salir de lodo."
  },
  "Pieles de Guerra / War Hides": {
    "resumen": "Resistencia natural y cuero curtido de los guerreros Ourk.",
    "detalles": "Efectos: Otorga un bonificador natural a la armadura o permite ignorar la primera herida sufrida en cada ronda de combate."
  },
  "Saber de la Ilusión / Lore of Delusion": {
    "resumen": "Magia alucinógena canalizada por los Dreameaters mediante hongos.",
    "detalles": "Efectos: Hechizos que alteran la percepción del enemigo, forzando fallos en proezas, disparos errados o movimientos involuntarios."
  },
  "Regeneración de Cabezas / Head Regeneration": {
    "resumen": "Crecimiento frenético de nuevas cabezas en la Marsh Hydra.",
    "detalles": "Efectos: En lugar de perder AP por Dwindling Strength, la Hydra gana +1 AP permanente por cada 25% de HP total que pierda (hasta un máximo de +3 AP extra)."
  },
  "Puntos de Prestigio / Clout Points": {
    "resumen": "Reputación del Great Gremlin para mantener el respeto de su banda.",
    "detalles": "Efectos: Gana puntos al causar heridas, lograr proezas difíciles o pasar Valentía (+6 Clout: +1 AP extra; 1-5: aura mejorada); pierde puntos al caer Prone o fallar (-6 Clout: pierde el mando y baja a Clase Unit)."
  },
  "Madrigueras Gremlin / Gremlin Burrows": {
    "resumen": "Red de túneles subterráneos de los Gremlins.",
    "detalles": "Efectos: Miniaturas en contacto de peana pueden sumergirse en el túnel con una Hazaña Fácil, curarse D3 HP y reaparecer en cualquier otro marcador de Madriguera al inicio del siguiente turno."
  },
  "¡En Despegue! / Chocks Away!": {
    "resumen": "Maniobra de despegue para criaturas aladas o artefactos voladores.",
    "detalles": "Efectos: El personaje inicia el vuelo ganando el rasgo Fly, +3 al Movimiento y haciendo que los ataques a distancia enemigos requieran una Hazaña Media."
  },
  "Regeneración Fúngica / Fungal Regeneration": {
    "resumen": "Hongos simbióticos que sanan el cuerpo del Troll o Dragón.",
    "detalles": "Efectos: Si la miniatura no está en contacto de peana con ningún enemigo al final de la Ronda (o de su activación en variante avanzada), recupera D6 HP (o D3 HP)."
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = datosRasgos;
} else {
  window.datosRasgos = datosRasgos;
}
