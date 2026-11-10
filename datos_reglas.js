// Datos del compendio de reglas (facciones, campaña, reglas, escenarios). Extraído de index.html.
        const datosCampana = {
            "juego": "ArcWorlde - Reglamento de Campañas",
            "version": "1.3 (Edición Oficial Marzo 2024)",
            "secciones_campana": [
                {
                    "id_seccion": "ciclo_capitulo",
                    "nombre": "1. Fases de la Campaña",
                    "descripcion": "Estructura en 6 pasos que sigue cada partida en una campaña de ArcWorlde.",
                    "categorias": [
                        {
                            "nombre_categoria": "Los 6 Pasos del Capítulo",
                            "acciones": [
                                { "id": "paso_1_escenario", "nombre": "Paso 1: Elección de Escenario y Misiones Secretas", "etiqueta": "Paso 1", "resumen": "Definición del escenario, valor de juego (Game Value) y misiones secretas.", "detalles": "Los jugadores o el GM eligen el escenario (oficial, generado por ArcDeck o personalizado) y fijan el Game Value. Se asignan Misiones Secretas que otorgan +1 VP adicional si se completan sin que el rival las descubra." },
                                { "id": "paso_2_comerciante", "nombre": "Paso 2: El Comerciante Ambulante", "etiqueta": "Paso 2", "resumen": "Mercado dinámico, fluctuación de precios (1D6), Armas Finas y Arcanita.", "detalles": "Antes de equipar a la banda, cada jugador tira 1D6 para determinar el humor del comerciante. Se pueden comprar/vender objetos de la Armería Común o de Facción, contratar Mercenarios (Swords for Hire) al 50% de coste y adquirir Armas Finas (+1 Power, doble coste, máx 1 por capítulo). La Arcanita siempre se vende a precio Caro (+25%).", "interactivo": true, "modal_id": "modal-comerciante" },
                                { "id": "paso_3_preparar_banda", "nombre": "Paso 3: Preparación de la Banda", "etiqueta": "Paso 3", "resumen": "Selección de miniaturas del Campamento y equipo del Cofre.", "detalles": "Se eligen los personajes contratados del Campaign Camp y se les equipa con objetos del Campaign Chest sin superar el Game Value de la partida." },
                                { "id": "paso_4_jugar_batalla", "nombre": "Paso 4: Jugar la Batalla y Elección de MVP", "etiqueta": "Paso 4", "resumen": "Disputar el combate, sumar VP de escenario y votar al Jugador Más Valioso.", "detalles": "Se juega la partida. Al finalizar, además de los VP de misión y misiones secretas, todos los jugadores eligen de mutuo acuerdo al MVP (Jugador Más Valioso), quien recibe D3 VP directos para invertir en sus rasgos." },
                                { "id": "paso_5_secuelas_lesiones", "nombre": "Paso 5: Las Secuelas y Tabla de Lesiones", "etiqueta": "Paso 5", "resumen": "Asignación de VP a Rasgos de Campaña y tiradas de lesión para noqueados.", "detalles": "Los VP ganados se gastan en subir niveles de Rasgos de Campaña. Cualquier personaje que haya sido Knocked Out en la batalla debe tirar 1D6 en la Tabla de Lesiones.", "interactivo": true, "modal_id": "modal-lesiones" },
                                { "id": "paso_6_aventura_intermedia", "nombre": "Paso 6: Aventuras Intermedias", "etiqueta": "Paso 6", "resumen": "Tirada de 2D6 + D6 para determinar eventos narrativos entre partidas.", "detalles": "Se tiran 2D6 (el primer dado es la decena y el segundo la unidad: de 1/1 a 6/6) para consultar el evento en el camino, y luego un D6 extra para determinar la resolución (1-2, 3-4 o 5-6).", "interactivo": true, "modal_id": "modal-aventuras" }
                            ]
                        }
                    ]
                },
                {
                    "id_seccion": "gestion_campana",
                    "nombre": "2. Gestión del Campamento y Cofre",
                    "descripcion": "Estructura del Campamento de la Banda (Campaign Camp) y Cofre de Suministros (Campaign Chest).",
                    "categorias": [
                        {
                            "nombre_categoria": "Conceptos de Campaña",
                            "acciones": [
                                { "id": "campaign_camp", "nombre": "El Campamento (Campaign Camp)", "etiqueta": "Banda", "resumen": "Plantilla fija de tropas contratadas.", "detalles": "Se inicia con 500 GP. Los personajes se conservan entre partidas y acumulan VP." },
                                { "id": "campaign_chest", "nombre": "El Cofre (Campaign Chest)", "etiqueta": "Inventario", "resumen": "Almacén compartido de equipamiento y oro.", "detalles": "Alberga todo el equipo. Se pueden reasignar objetos libremente antes de cada batalla." }
                            ]
                        },
                        {
                            "nombre_categoria": "Armería Común de Campaña",
                            "acciones": [
                                { "id": "arcanite_token", "nombre": "Cristal de Arcanita (10 GP)", "etiqueta": "Consumible", "resumen": "Otorga ventajas mágicas o tácticas inmediatas.", "detalles": "Efectos: +1 AP, +1D6 a una tirada, permitir lanzar otro hechizo o repetir 1D6 fallido.", "restriccion": "De un solo uso (One use only)" },
                                { "id": "torch", "nombre": "Antorcha (10 GP)", "etiqueta": "Consumible", "resumen": "El portador cuenta como Fearsome (Temible) frente a Bestias y Monstruos.", "detalles": "Efectos: +1 Power en ataques cuerpo a cuerpo contra objetivos Flammable (Inflamables).", "restriccion":"Desventaja: los ataques a distancia contra el portador pueden repetir los fallos."},                                
                                { "id": "shield", "nombre": "Escudo (15 GP)", "etiqueta": "Equipo", "resumen": "Permite repetir una Tirada de Defensa fallida por ronda.", "detalles": "Efecto: Se puede repetir 1 dado de defensa en cada ronda." },
                                { "id": "two_handed_weapon", "nombre": "Arma a Dos Manos (10 GP)", "etiqueta": "Equipo", "resumen": "Arma Pesada que otorga bonus de Power en los ataques.", "detalles": "Efecto: Otorga +2 Power en todos los ataques cuerpo a cuerpo.",    "restriccion": "Invalida tus Éxitos Críticos defensivos, son considerados Fallos." },
                                { "id": "dual_weapon", "nombre": "Armas Dobles (10 GP)", "etiqueta": "Equipo", "resumen": "Permite repetir dados de ataque cuerpo a cuerpo.", "detalles": "Efectos: Permite repetir todos los resultados de '1' en tiradas de ataque cuerpo a cuerpo.", "restriccion": "Solo se permite repetir una vez por ronda." },
                                { "id": "spear", "nombre": "Lanza (10 GP)", "etiqueta": "Equipo", "resumen": "Ataques cuerpo a cuerpo hasta 2 pulgadas de distancia.", "detalles": "Efecto: Permite atacar a objetivos a 2\" incluso a través de aliados." },
                                { "id": "light_armour", "nombre": "Armadura Ligera (20 GP)", "etiqueta": "Equipo", "resumen": "Armadura que bloquea dados de daño.", "detalles": "Efectos: Otorga +1 al Valor de Armadura." },
                                { "id": "heavy_armour", "nombre": "Armadura Pesada (35 GP)", "etiqueta": "Equipo", "resumen": "Armadura que bloquea dados de daño.", "detalles": "Efectos: Otorga +2 al Valor de Armadura.","restriccion": "Aumenta en +1 la dificultad de todas las tiradas de Leg It."}
                            ]
                        },
                        {
                            "nombre_categoria": "Artefactos Legendarios",
                            "acciones": [
                                { "id": "bloodoak_armour", "nombre": "Armadura de Roble Sangriento / Bloodoak Armour", "etiqueta": "Artefacto Legendario (Equipo)", "resumen": "Armadura hecha de corteza dura como el hierro que se repara absorbiendo la salud del usuario.", "detalles": "Efectos: Cuenta como Armadura Pesada. Si la armadura resulta dañada o rota de alguna forma, se repara instantáneamente.", "restriccion": "Por cada punto de armadura recuperado, el portador pierde 2 HP."},
                                { "id": "hex_pistols", "nombre": "Pistolas Místicas / Hex Pistols", "etiqueta": "Artefacto Legendario (Equipo)", "resumen": "Par de pistolas Arcloque malditas cuyos proyectiles buscan certeramente a sus víctimas.", "detalles": "Efectos: Otorga un ataque a distancia con Alcance 12\" y Power 16. Los disparos nunca sufren Desventaja.", "restriccion": "Si en la tirada hay más Fallos que Éxitos, el usuario sufre tantos Impactos (Hits) como Fallos haya obtenido."},
                                { "id": "vitality_stone", "nombre": "Piedra de Vitalidad / Vitality Stone", "etiqueta": "Artefacto Legendario (Objeto)", "resumen": "Amuleto esculpido que permite almacenar energía de acción para usarla posteriormente.", "detalles": "Efectos: Los Puntos de Acción (AP) no gastados en una activación pueden 'guardarse' y consumirse en otra activación posterior. Si el portador cae Noqueado, deja un marcador y cualquier personaje puede usar esos AP para Hazañas.", "restriccion": "Si se falla una Hazaña usando los AP almacenados, el personaje pierde tantos HP como AP había acumulados."},
                                { "id": "griffling_boots", "nombre": "Botas de Griffling / Griffling Boots", "etiqueta": "Artefacto Legendario (Objeto)", "resumen": "Botas mágicas que otorgan una velocidad y capacidad de salto sobrehumanas.", "detalles": "Efectos: Duplica el atributo de Movimiento del portador y le otorga el rasgo Vuelo (Fly).", "restriccion": "Si el portador falla una tirada de Leg It, sufre D6 Hits tras quedar Tumbado (Prone)."},
                                { "id": "the_completely_harmless_and_normal_ring",  "nombre": "El Anillo Completamente Normal e Inofensivo / The Completely Harmless and Normal Ring", "etiqueta": "Artefacto Legendario (Objeto)", "resumen": "Anillo de oro en apariencia insignificante que vuelve invisible a quien lo porta.", "detalles": "Efectos: Otorga el rasgo Invisibilidad (Invisible). El portador no puede ser objetivo de ataques a distancia y puede destrabarse del combate cuerpo a cuerpo sin penalización.", "restriccion": "Si el portador resulta Tumbado (Prone), cualquier personaje en contacto de peana puede intentar robarle el anillo con una Hazaña Fácil."},
                                { "id": "the_eldritch_wand", "nombre": "Varita Arcana / The Eldritch Wand", "etiqueta": "Artefacto Legendario (Objeto)", "resumen": "Varita de madera traslúcida que concede un gran control sobre el robo de magia.", "detalles": "Efectos: Un Mago puede descartar una carta de su mano al lanzar un hechizo, devolverla al mazo y robar otra.", "restriccion": "Cada vez que un Mago usa esta habilidad pierde 1 HP. Si la sostiene un personaje no Mago, pierde inmediatamente D6 HP."},
                                { "id": "resurrection_coin", "nombre": "Moneda de Resurrección / Resurrection Coin", "etiqueta": "Artefacto Legendario (Objeto)", "resumen": "Moneda de oro antiguo que impide que su poseedor muera del todo.", "detalles": "Efectos: Cuando el portador se reduce a 0 HP, se lanza una moneda: si sale Cara, recupera 3 HP; si sale Cruz, recupera 1 HP pero queda Tumbado (Prone).", "restriccion": "Aplica solo en el momento de ser reducido a 0 HP."},
                                { "id": "euphimias_box", "nombre": "La Caja de Eufimia / Euphimia's Box", "etiqueta": "Artefacto Legendario (Objeto)", "resumen": "Reliquia legendaria que libera una explosión devastadora al ser abierta.", "detalles": "Efectos: Al abrirse, todos los personajes a 6\" o menos deben superar una Hazaña Difícil o sufrir 2D6 Hits.", "restriccion": "Un solo uso. Una vez abierta, pierde todo su poder."},
                                { "id": "blade_of_the_sacred_viper", "nombre": "Hoja de la Víbora Sagrada / Blade of the Sacred Viper", "etiqueta": "Artefacto Legendario (Equipo)", "resumen": "Arma impregnada con un veneno recurrente y mortal que se multiplica progresivamente.", "detalles": "Efectos: Si causa daño, la víctima debe superar una Hazaña Fácil o sufrir 1 Hit extra. Si falla, al final de su siguiente activación debe superar una Hazaña Fácil o sufrir 2 Hits (se duplican los impactos en cada activación consecutiva fallida).", "restriccion": "Si el portador no envenena a nadie durante una ronda entera, pierde D3 HP por la venganza de la víbora."},
                                { "id": "axe_of_frost", "nombre": "Hacha de Escarcha / Axe of Frost", "etiqueta": "Artefacto Legendario (Equipo)", "resumen": "Arma antigua de Njorsvald que congela e inmoviliza a las víctimas.", "detalles": "Efectos: Si inflige daño, el objetivo queda congelado e inmovilizado. Para liberarse debe superar una Hazaña Fácil (o no podrá moverse esa activación).", "restriccion": "Si la víctima sufre daño adicional del hacha antes de liberarse, la Hazaña requerida pasa a ser de dificultad Media."},
                                { "id": "the_chalice_of_blood", "nombre": "El Cáliz de Sangre / The Chalice of Blood", "etiqueta": "Artefacto Legendario (Objeto)", "resumen": "Cáliz de oro y rubíes que otorga salud y energía de acción instantáneas a cambio de adicción.", "detalles": "Efectos: El portador puede beber del cáliz con una Hazaña Fácil para recuperar D6 HP y D6 AP en esa ronda.", "restriccion": "Durante el resto de la partida, en cada ronda en que no beba del cáliz perderá D6 HP al final de su activación."},
                                { "id": "crown_of_the_vauhaemi", "nombre": "Corona de los Vauhaemi / Crown of the Vauhaemi", "etiqueta": "Artefacto Legendario (Objeto)", "resumen": "Corona antigua que permite invocar guerreros esqueléticos para que sirvan al usuario.", "detalles": "Efectos: Al final de su activación, el portador puede invocar 1 Skelt aliado por ronda, el cual puede activarse inmediatamente después.", "restriccion": "Limitado a 1 Skelt invocado por ronda."},
                                { "id": "silver_bolts", "nombre": "Proyectiles de Plata / Silver Bolts", "etiqueta": "Artefacto Legendario (Objeto)", "resumen": "Munición bendecida extremadamente mortífera contra no-muertos.", "detalles": "Efectos: Los ataques a distancia del portador causan +D6 Hits adicionales contra personajes No-Muertos (Undead).", "restriccion": "Tras cada disparo debe tirarse 1D6: si sale un 1, la munición se agota por completo."},
                                { "id": "cloak_of_night", "nombre": "Capa de la Noche / Cloak of Night", "etiqueta": "Artefacto Legendario (Objeto)", "resumen": "Manto de seda negra que difumina la silueta del usuario en la oscuridad.", "detalles": "Efectos: Todos los disparos y ataques a distancia realizados contra el portador sufren Desventaja. Si el portador se encuentra en Cobertura (Cover), no puede ser seleccionado como objetivo de disparos.", "restriccion": "Aplica a ataques a distancia."},
                                { "id": "amulet_of_daylight", "nombre": "Amuleto de Luz Solar / Amulet of Daylight", "etiqueta": "Artefacto Legendario (Objeto)", "resumen": "Joya deslumbrante capaz de reflejar un destello solar cegador.", "detalles": "Efectos: Mediante una Hazaña Fácil, el usuario ciega a todos los personajes en un radio de 4\" durante el resto de la ronda. Los personajes cegados realizan todos sus ataques a Desventaja.", "restriccion": "Ciega tanto a enemigos como a aliados en el área."},
                                { "id": "arcronomicon", "nombre": "Arcronomicón / Arcronomicon", "etiqueta": "Artefacto Legendario (Objeto)", "resumen": "Tomo maldito de nigromancia capaz de resucitar a los caídos.", "detalles": "Efectos: El portador puede sacrificar todos sus AP para resucitar a un personaje caído en contacto de peana con la mitad de sus HP máximos.", "restriccion": "El personaje resucitado pasa a contar como No-Muerto (Undead) durante el resto de la partida/campaña."}
                            ]
                        },                        
                        {
                            "nombre_categoria": "Habilidades de Campaña (Traits)",
                            "acciones": [
                                { "id": "burglar", "nombre": "Ladrón / Burglar","etiqueta": "Habilidad de Campaña", "resumen": "Habilidad para robar objetos y equipo a personajes enemigos.", "detalles": "Efectos:<br>N1 (3 VP) Repite tirada de Hazaña para Robar.<br>N2 (6 VP) Roba a personajes Tumbados (Prone).<br>N3 (12 VP) Roba a personajes no Tumbados.", "restriccion": "Requiere superar Hazaña de Robar."},
                                { "id": "deadeye", "nombre": "Tirador Certero / Deadeye", "etiqueta": "Habilidad de Campaña", "resumen": "Maestría con armas a distancia para realizar disparos precisos e imposibles.", "detalles": "Efectos:<br>N1 (3 VP) Repite 1 Hazaña de disparo por partida.<br>N2 (6 VP) Dispara a combate cuerpo a cuerpo sin penalización.<br>N3 (12 VP) Repite 1 Hazaña de disparo por Ronda.<br>N4 (20 VP) Ignora Cobertura y Terreno.", "restriccion": "Aplica únicamente a ataques a distancia."},
                                { "id": "fearless", "nombre": "Sin Miedo / Fearless", "etiqueta": "Habilidad de Campaña", "resumen": "Inmunidad o alta resistencia a Chequeos de Valentía y efectos de terror.", "detalles": "Efectos:<br>N1 (3 VP) Repite Chequeos de Valentía fallidos.<br>N2 (6 VP) Supera automáticamente Chequeos de Valentía.<br>N3 (12 VP) Aliados a 3\" o menos también repiten Chequeos de Valentía."},
                                { "id": "fleet_of_foot", "nombre": "Pies Ligeros / Fleet of Foot", "etiqueta": "Habilidad de Campaña", "resumen": "Aumento permanente de la velocidad y capacidad de movimiento.", "detalles": "Efectos:<br>N1 (3 VP) Otorga +1 al atributo de Movimiento.<br>N2 (6 VP) Otorga un +1 adicional al Movimiento (+2 total)."},
                                { "id": "haggler", "nombre": "Regateador / Haggler", "etiqueta": "Habilidad de Campaña", "resumen": "Capacidad para negociar y repetir tiradas con el Comerciante Itinerante.",  "detalles": "Efectos:<br>N1 (3 VP) Permite repetir la tirada del Capricho del Comerciante Itinerante (Wandering Trader).", "restriccion": "El personaje no debe haber quedado Noqueado en la partida anterior."},
                                { "id": "hard_head", "nombre": "Cabeza Dura / Hard Head", "etiqueta": "Habilidad de Campaña", "resumen": "Resistencia extrema para levantarse tras quedar Noqueado.", "detalles": "Efectos:<br>N1 (10 VP) Si queda Noqueado, tira 1D6. Si tiene éxito, reaparece en la misma posición en la siguiente Ronda con 1 HP.", "restriccion": "Sujeto a tirada de 1D6 exitosa al quedar Noqueado."},
                                { "id": "hardy", "nombre": "Resistente / Hardy",  "etiqueta": "Habilidad de Campaña", "resumen": "Incremento sustancial en los Puntos de Vida (HP) máximos del personaje.", "detalles": "Efectos:<br> N1 (3 VP) +D3 HP máximos.<br>N2 (6 VP) +D6 HP adicionales.<br>N3 (12 VP) +D6 HP adicionales.<br>N4 (20 VP) +D6 HP adicionales."},
                                { "id": "shield_specialist", "nombre": "Especialista en Escudo / Shield Specialist",  "etiqueta": "Habilidad de Campaña", "resumen": "Contraataque defensivo usando el escudo para infligir daño.", "detalles": "Efectos:<br>N1 (3 VP) Si usa un Escudo para repetir una Defensa y tiene éxito, el atacante en contacto de peana sufre D6 Hits.",  "restriccion": "Requiere tener equipado un Escudo y estar en contacto de peana."},
                                { "id": "sorcerous", "nombre": "Arcano / Sorcerous", "etiqueta": "Habilidad de Campaña", "resumen": "Dominio avanzado de las artes mágicas y saberes de hechicería.", "detalles": "Efectos:<br> N1 (3 VP) Roba 1 carta del ArcDeck al lanzar hechizo.<br>N2 (6 VP) Inmune a Sobrecarga Mágica (Overpowered).<br>N3 (12 VP) Puede lanzar hechizos del saber rival.", "restriccion": "Aplica a lanzadores de hechizos."},
                                { "id": "spear_specialist", "nombre": "Especialista en Lanza / Spear Specialist", "etiqueta": "Habilidad de Campaña", "resumen": "Aumento en el alcance del ataque cuerpo a cuerpo con lanzas.",  "detalles": "Efectos<br> N1 (3 VP) Si lleva equipada una Lanza, su alcance de ataque cuerpo a cuerpo aumenta a 3 pulgadas (3\").", "restriccion": "Requiere llevar equipada una Lanza."},
                                { "id": "spring_heeled", "nombre": "Pies de Muelle / Spring-heeled", "etiqueta": "Habilidad de Campaña", "resumen": "Agilidad sobrehumana para evitar caer al suelo.", "detalles": "Efectos:<br> N1 (6 VP) Si resulta Tumbado (Prone), tira 1D6. Si es un éxito, evita quedar Tumbado."},
                                { "id": "story_blessed", "nombre": "Bendecido por la Historia / Story-blessed", "etiqueta": "Habilidad de Campaña", "resumen": "Fortuna legendaria al realizar Hazañas Narrativas.", "detalles": "Efectos:<br> N1 (3 VP) Permite repetir tiradas fallidas al intentar Hazañas Narrativas (Narrative Feats).", "restriccion": "Solo aplica a Hazañas Narrativas."},
                                { "id": "strongarm", "nombre": "Brazo Fuerte / Strongarm", "etiqueta": "Habilidad de Campaña", "resumen": "Fuerza bruta para hazañas físicas e impacto en combate.", "detalles": "Efectos:<br> N1 (3 VP) +1D6 en Hazañas de fuerza física.<br>N2 (6 VP) +1 al Poder (Power) en todos sus ataques."},
                                { "id": "trusty_lieutenant", "nombre": "Teniente de Confianza / Trusty Lieutenant", "etiqueta": "Habilidad de Campaña", "resumen": "Capacidad para asumir el mando del grupo si el Comandante cae.", "detalles": "Efectos:<br> N1 (3 VP) Si el Comandante queda Noqueado o no participa en la partida, este personaje cuenta como Comandante (aura de Valentía)."},
                                { "id": "two_handed_weapon_specialist", "nombre": "Especialista en Arma a Dos Manos / Two-Handed Weapon Specialist", "etiqueta": "Habilidad de Campaña", "resumen": "Mayor precisión y control al atacar con armas pesadas a dos manos.", "detalles": "Efectos:<br> N1 (3 VP) Si lleva equipada un Arma a Dos Manos, permite repetir 1 Impacto (Hit) fallido por Ronda.", "restriccion": "Requiere llevar equipada un Arma a Dos Manos."},
                                { "id": "unscathed", "nombre": "Indemne / Unscathed", "etiqueta": "Habilidad de Campaña", "resumen": "Capacidad de recuperación para evitar secuelas de heridas de guerra.", "detalles": "Efectos:<br> N1 (3 VP) Permite repetir la tirada en la Tabla de Heridas (Injury Rolls) tras ser Noqueado.", "restriccion": "Aplica al resolver la fase de secuelas tras la batalla."}
                            ]
                        }
                    ]
                }
            ]
        };

        const datosReglas = {
            "juego": "ArcWorlde (Segunda Edición)",
            "version_reglas": "2.2",
            "secuencia_turno": [
                {
                    "id_fase": "fase_1_inicio_ronda",
                    "nombre": "1. Inicio de Ronda",
                    "descripcion": "Fase preparatoria y eventos ambientales globales antes de la activación de personajes.",
                    "acciones": [
                        { "id": "evento_arcdeck", "nombre": "Robar Carta del ArcDeck", "coste_ap": 0, "tipo_tirada": "Roba 1 Carta", "resumen": "Determina el evento mágico que afectará a la mesa. (Haz clic aquí para ver las tablas)", "detalles": "Se roba la carta superior del ArcDeck y se consulta la tabla del entorno activo.", "interactivo": true },
                        { "id": "recuperar_prone_gratis", "nombre": "Levantarse de Prone", "coste_ap": 0, "tipo_tirada": "Automático", "resumen": "Un personaje tumbado se pone de pie gratis.", "detalles": "Si el personaje cayó Prone en la ronda anterior, se levanta al comienzo de su activación sin gastar AP." },
                        { "id": "tirada_iniciativa", "nombre": "Tirada de Iniciativa", "coste_ap": 0, "tipo_tirada": "1D6 Enfrentado", "resumen": "Determina qué jugador activa la primera miniatura.", "detalles": "El número más alto elige quién activa primero." }
                    ]
                },
                {
                    "id_fase": "fase_2_activaciones",
                    "nombre": "2. Fase de Activaciones",
                    "descripcion": "Los jugadores alternan activando 1 miniatura a la vez. Cada miniatura usa sus AP en acciones.",
                    "categorias": [
                        {
                            "nombre_categoria": "Movimiento y Posicionamiento",
                            "acciones": [
                                { "id": "movimiento_gratuito", "nombre": "Movimiento Gratuito Base", "coste_ap": 0, "tipo_tirada": "Ninguna", "resumen": "Desplazamiento de hasta el atributo Movement.", "detalles": "Se puede usar en cualquier momento de la activación. Incompatible si está Prone o Engaged.", "restriccion": "Terreno Difícil: Movimiento se reduce a la mitad (halved). <br> Terreno Impasable: Bloquea el paso. Requiere Hazaña para escalar/saltar."},
                                { "id": "correr_legit", "nombre": "Correr (Legging It)", "coste_ap": 1, "tipo_tirada": "1D6", "resumen": "Ganar movimiento adicional.", "detalles": "Avanza las pulgadas indicadas en el D6. Un 6 implica tropezar y caer Prone.", "restriccion": "Después del movimiento gratuito.<br>Antes de realizar otra Acción." },
                                { "id": "levantarse_prone_ap", "nombre": "Levantarse de Prone (Misma Ronda)", "coste_ap": "1 o más AP", "tipo_tirada": "Hazaña Fácil (1 Éxito)", "resumen": "Intentar ponerse de pie en la misma ronda en la que caíste tumbado.", "detalles": "Requiere superar una Hazaña Fácil (un dado con resultado 4, 5 o 6)."},
                                { "id": "ayudar_aliado_prone", "nombre": "Levantar a un Aliado Tumbado", "coste_ap": "1 o más AP", "tipo_tirada": "Hazaña (Feat)", "resumen": "Un personaje activo ayuda a ponerse de pie a un aliado en contacto de peana.", "detalles": "Hazaña Fácil (1 Éxito) si el aliado tiene una peana igual o menor. Hazaña Media (2 Éxitos) si el aliado tiene una peana mayor."},
                                { "id": "cargar", "nombre": "Cargar (Charge)", "coste_ap": 1, "tipo_tirada": "1D6 (Legging It)", "resumen": "Entrar en contacto de peana con un enemigo usando Legging It.", "detalles": "Si el movimiento de Legging It te pone en contacto de peana con un rival, cuenta como Carga. Otorga +1 AP inmediatamente para esta activación.", "restriccion": "Debe usarse Legging It"},
                                { "id": "destrabarse", "nombre": "Destrabarse de Combate (Disengage)", "coste_ap": "Variable (AP invertidos)", "tipo_tirada": "Hazaña (Feat)", "resumen": "Liberarse de enemigos en combate cuerpo a cuerpo para poder moverte.", "dificultad_escalada": ["1 enemigo trabado = Hazaña Fácil (1 Éxito)", "2 enemigos trabados = Hazaña Media (2 Éxitos)", "3 enemigos trabados = Hazaña Difícil (3 Éxitos)", "4+ enemigos trabados = Hazaña Legendaria (4 Éxitos)"], "detalles": "Si la tirada falla, el personaje NO se mueve y sufre 1 punto de daño automático (pierde 1 HP) por cada enemigo que esté en contacto de peana con él."}
                            ]
                        },
                        {
                            "nombre_categoria": "Combate Cuerpo a Cuerpo",
                            "acciones": [
                                { "id": "ataque_melee", "nombre": "Ataque Cuerpo a Cuerpo", "coste_ap": "Variable", "tipo_tirada": "Power vs Armour/Def", "resumen": "Atacar a un objetivo en contacto.", "pasos_resolucion": ["1. Tirada de Potencia: 1D6 por Power (4+ Impacto, 6 Crítico=2).", "2. Armadura: Resta el Armour del defensor a los impactos.", "3. Defensa: 1D6 por impacto restante (4+ bloquea 1, 6 bloquea 2)."] }
                            ]
                        },
                        {
                            "nombre_categoria": "Combate a Distancia (Ranged)",
                            "acciones": [
                                { "id": "disparo_shot", "nombre": "Disparar (Taking a Shot)", "coste_ap": "Variable (1 o más AP a elección)", "tipo_tirada": "Hazaña Fácil (Apuntar) + Potencia del Arma", "resumen": "Realizar un ataque a distancia contra un enemigo en línea de visión.", "detalles": "Gastas AP para tirar dados en la Hazaña de disparo (cada AP es 1D6, necesitas al menos un 4+). Si se supera, tiras la Potencia del arma. Si fallas disparando a una melee, el impacto va a tu aliado."},
                                { "id": "cobertura", "nombre": "Regla de Cobertura (Cover)", "coste_ap": 0, "tipo_tirada": "Modificador de Defensa", "resumen": "Si el terreno tapa el 50% o más de la miniatura atacada.", "detalles": "El defensor tira sus dados de defensa con Ventaja (Advantage), pudiendo elegir el mejor resultado.", "restriccion": "Esto también se aplica si la miniatura es objetivo directo de un Hechizo en fase de magia"}
                            ]
                        },
                        {   
                            "nombre_categoria": "Magia y Hechizos",
                            "acciones": [
                                { "id": "lanzar_hechizo", "nombre": "Lanzar Hechizo", "coste_ap": 2, "tipo_tirada": "Robo del ArcDeck (Suma de Cartas)", "resumen": "Un Mago (Mage) intenta canalizar energía para lanzar un hechizo.", "pasos_resolucion": [ "1. Declarar el hechizo y su número objetivo.", "2. Robar 2 cartas del ArcDeck y sumar sus valores (Figuras=10, Ases=1 u 11, Jokers=1 a 11).", "3. Si la suma es menor a la dificultad, se puede gastar 1 AP extra o 1 Arcanita para robar otra carta.", "4. Si la suma supera 21, el hechizo se Lanza pero queda Sobrecargado (Overpowered): el Mago pierde D6 HP."]},
                                { "id": "linea_vision", "nombre": "Línea de visión Hechizo", "coste_ap": 0, "tipo_tirada": "Ninguna", "resumen": "Para que un personaje pueda ser elegido como blanco directo de un hechizo o ataque, el atacante debe ser capaz de ver al menos alguna parte de la miniatura.", "restriccion": "Magia de Área: Ignora Cobertura e impacta a objetivos ocultos."}
                            ]
                        },
                        {
                            "nombre_categoria": "Hazañas Narrativas y Consumibles",
                            "acciones": [
                                { "id": "hazana_narrativa", "nombre": "Hazaña Narrativa (Narrative Feat)", "coste_ap": "Variable (Según AP invertidos)", "tipo_tirada": "Hazaña de dificultad acordada", "resumen": "Realizar acciones creativas utilizando el terreno u objetos de la mesa.", "dificultades": { "Easy" : "1 Éxito (Acciones simples como saltar un murete bajo).", "Medium" : "2 Éxitos (Trepar a un tejado, saltar un arroyo).", "Hard" : "3 Éxitos (Forzar una puerta blindada, empujar una estatua).", "Legendary" : "4 Éxitos (Acciones heroicas de alto riesgo)."}},
                                { "id": "usar_arcanita", "nombre": "Usar Ficha de Arcanite", "coste_ap": 0, "tipo_tirada": "Consumible (1 solo uso)", "resumen": "Gastar un cristal de Arcanita para obtener una ventaja inmediata.", "efectos_disponibles": [ "Ganar +1 AP inmediato para la activación actual.", "Añadir 1D6 extra a cualquier tirada.", "Repetir cualquier dado (D6) fallido.", "Robar una carta adicional del ArcDeck al lanzar un hechizo."]},
                                { "id": "robar_objeto", "nombre": "Robar (Stealing Items)", "coste_ap": 1, "tipo_tirada": "Hazaña Fácil", "resumen": "Realizar una Hazaña Fácil para robar un Objeto a un jugador (Prone) con el que se tiene contacto de peana", "restriccion": "No se puede robar equipamiento equipado, excepto que una habilidad, escenario o arma lo permita expresamente."}
                            ]
                        }
                    ]
                },
                {
                    "id_fase": "fase_3_fin_ronda",
                    "nombre": "3. Fin de Ronda",
                    "descripcion": "Resolución de condiciones de victoria, reseteo de estados y mantenimiento.",
                    "acciones": [
                        { "id": "comprobar_escenario", "nombre": "Comprobar Objetivos del Escenario", "coste_ap": 0, "tipo_tirada": "Verificación", "resumen": "Comprobar Puntos de Victoria (VP) o condiciones de final de partida.", "detalles": "Verificar si se ha alcanzado el límite de rondas o los requisitos de victoria." },
                        { "id": "reset_habilidades", "nombre": "Restablecer Habilidades y Tokens", "coste_ap": 0, "tipo_tirada": "Automático", "resumen": "Las habilidades que dicen '1 vez por ronda' (ej. Escudo) se recargan.", "detalles": "Se verifica que todas las miniaturas hayan completado su activación." }
                    ]
                }
            ]
        };    

        const datosEscenarios = {
            "juego": "ArcWorlde - Libro de Escenarios y Generador",
            "version": "1.1 (Diciembre 2023) / Generator v2.1",
            "secciones_escenarios": [
    {
      "id_seccion": "escenarios_predisenados",
      "nombre": "1. Escenarios Pre-Diseñados",
      "descripcion": "Escenarios oficiales con objetivos tácticos y condiciones de victoria específicas.",
      "categorias": [
        {
          "nombre_categoria": "Escenarios Estándar",
          "acciones": [
            {
              "id": "scen_arcanite_hunt",
              "nombre": "Caza de Arcanita",
              "etiqueta": "Misión Base",
              "resumen": "Recolectar cristales de Arcanita esparcidos por la mesa tras una tormenta arcana.",
              "detalles": "<strong style='color: #00CED1;'>Despliegue:</strong> A 6\" de bordes opuestos. Se colocan 5 Fichas de Arcanita fuera de las zonas de despliegue.<br><strong style='color: #00CED1;'>Regla:</strong> Las bandas deben recoger las fichas y depositarlas en su zona de despliegue.<br><strong style='color: #00CED1;'>Victoria:</strong> 1 VP por cada Ficha de Arcanita en tu zona de despliegue al final del juego (las compradas previamente no cuentan)."
            },
            {
              "id": "scen_siege",
              "nombre": "El Asedio",
              "etiqueta": "Defensa / Asedio",
              "resumen": "Un defensor atrincherado soporta las oleadas del atacante.",
              "detalles": "<strong style='color: #00CED1;'>Despliegue:</strong> Defensores dentro de las fortificaciones; atacantes a 6\" de cualquier borde.<br><strong style='color: #00CED1;'>Estructuras:</strong> Light (6HP), Medium (15HP), Heavy (30HP), Impregnable (50HP). Se pueden reparar con Hazañas (Easy: D3 HP, Medium: D6 HP, Hard: 2D6 HP, Legendary: 4D6 HP).<br><strong style='color: #00CED1;'>Victoria:</strong> Atributo de VP asignado según el % de Game Value en la zona fortified al final del juego."
            },
            {
              "id": "scen_exploration",
              "nombre": "Explorando lo desconocido",
              "etiqueta": "Avance",
              "resumen": "Cruzar un territorio desconocido mientras los defensores emboscan desde las sombras.",
              "detalles": "<strong style='color: #00CED1;'>Despliegue:</strong> El tablero se divide en 4 secciones. El atacante despliega en un borde. El defensor aparece desplegando D6 miniaturas cada vez que un atacante entra en una nueva sección.<br><strong style='color: #00CED1;'>Victoria:</strong> 1 VP por cada 20% de Game Value que el atacante logre cruzar al borde opuesto."
            },
            {
              "id": "scen_vip",
              "nombre": "VIP (Persona de Interés)",
              "etiqueta": "Escolta",
              "resumen": "Proteger o capturar a una personalidad clave no combatiente.",
              "detalles": "<strong style='color: #00CED1;'>Reglas:</strong> El VIP no cae Prone y se mueve por Legging It. Al estar en contacto de peana con un personaje, se desplaza junto a él.<br><strong style='color: #00CED1;'>Victoria:</strong> Conseguir o mantener el control del VIP en la zona de evacuación."
            },
            {
              "id": "scen_hunters",
              "nombre": "Cazadores de Pelambres",
              "etiqueta": "Caza de Bestias",
              "resumen": "Cazar criaturas salvajes neutrales por sus valiosas pieles.",
              "detalles": "<strong style='color: #00CED1;'>Presas:</strong> Tienen HP según peana (30mm=6HP, 40mm=9HP, 50mm=12HP, 60mm=20HP). Se mueven aleatoriamente al inicio de cada ronda (1D6). Al ser eliminadas dejan un 'Pelt' (Piel).<br><strong style='color: #00CED1;'>Victoria:</strong> 1 VP por cada Piel en posesión al final de la partida."
            },
            {
              "id": "scen_neverending_horde",
              "nombre": "Horda Infinita",
              "etiqueta": "Supervivencia",
              "resumen": "Supervivencia desesperada contra oleadas inagotables de enemigos.",
              "detalles": "<strong style='color: #00CED1;'>Despliegue:</strong> Defensores en el centro; atacantes a 6\" de los bordes.<br><strong style='color: #00CED1;'>Oleadas:</strong> En cada ronda el atacante tira 1D6 para desplegar tropas nuevas (1-2: 2-3 Unidades, 3-4: 4 Unidades o Mago, 5-6: 5 Unidades o Monstruo).<br><strong style='color: #00CED1;'>Victoria:</strong> 1 VP al defensor por cada 20% de Game Value superviviente; 5 VP al atacante si elimina a todos."
            },
            {
              "id": "scen_night_ambush",
              "nombre": "Emboscada Nocturna",
              "etiqueta": "Visibilidad Reducida",
              "resumen": "Ataque por sorpresa en la oscuridad alrededor de una fogata.",
              "detalles": "<strong style='color: #00CED1;'>Reglas:</strong> La visibilidad y los disparos sufren penalización por la noche a menos que estén cerca de la fogata o porten Antorchas.<br><strong style='color: #00CED1;'>Victoria:</strong> 1 VP por cada 20% de Game Value enemigo noqueado."
            },
            {
              "id": "scen_escape_arcstorm",
              "nombre": "Huir de la Tormenta",
              "etiqueta": "Entorno Mortal",
              "resumen": "Correr hacia un refugio antes de que la tormenta de arcanita consuma la mesa.",
              "detalles": "<strong style='color: #00CED1;'>Reglas:</strong> Al inicio de cada ronda, los personajes fuera de la zona segura sufren daño directo que ignora armadura (R2: 1 Hit, R3: 2 Hits, R4: 4 Hits, R5: 8 Hits).<br><strong style='color: #00CED1;'>Victoria:</strong> 1 VP por cada 20% de Game Value resguardado al final."
            }
          ]
        },
        {
          "nombre_categoria": "Escenarios de Expansión (Duel of the Dead)",
          "acciones": [
            {
              "id": "scen_dead_rise",
              "nombre": "Escenario 1: La Muertos se alzan de nuevo",
              "etiqueta": "Vauhaemia Campaña",
              "resumen": "Los Antiguos Muertos emergen de sus tumbas en las tierras de Vauhaemia.",
              "detalles": "<strong style='color: #00CED1;'>Despliegue:</strong> Se colocan 5 Fichas de Tumba (20 HP cada una) mediante cuadrícula aleatoria. Los Vampiros despliegan a 3\" de los bordes alternando sentidos.<br><strong style='color: #00CED1;'>Reglas Especiales:</strong> Los Antiguos Muertos pueden activar una Ficha de Tumba para desplegar un personaje.<br><strong style='color: #00CED1;'>Victoria (5 rondas):</strong> 1 VP a los Antiguos Muertos por cada Tumba intacta; 1 VP a los Vampiros por cada Tumba destruida."
            },
            {
              "id": "scen_gates_bloodheim",
              "nombre": "Escenario 2: Las puertas del Castillo Bloodheim",
              "etiqueta": "Asedio / Vauhaemia",
              "resumen": "Asalto desesperado para derribar las portonas de roble del castillo Bloodheim.",
              "detalles": "<strong style='color: #00CED1;'>Despliegue:</strong> Los Vampiros despliegan tras los muros (a 6\" del borde) y los Antiguos Muertos a 6\" del borde opuesto.<br><strong style='color: #00CED1;'>Reglas Especiales:</strong> La puerta de roble tiene 80 HP y se puede romper. Los muros son impasables pero pueden escalarse con una Hazaña Legendaria.<br><strong style='color: #00CED1;'>Victoria  (5 rondas):</strong> Atacante gana 1 VP por romper la puerta + 1 VP por cada 25% de Game Value dentro del castillo. Defensor gana 1 VP si la puerta aguanta + 1 VP por cada 25% de Game Value enemigo que NO logre entrar."
            },
            {
              "id": "scen_wolf_bloodheim",
              "nombre": "Escenario 3: El Lobo del Castillo Bloodheim",
              "etiqueta": "Supervivencia",
              "resumen": "Supervivencia en los pasillos oscuros del castillo bajo la cacería de un letal Hombre Lobo.",
              "detalles": "<strong style='color: #00CED1;'>Despliegue:</strong> Ambos jugadores despliegan a 6\" de bordes opuestos. Se coloca un Werewolf (peana de 60mm) en el centro.<br><strong style='color: #00CED1;'>Reglas Especiales:</strong> El Lobo es una criatura renegada con +10 HP y +3 AP extra que realiza siempre acciones de Rampage.<br><strong style='color: #00CED1;'>Victoria (5 Rondas):</strong> +1 VP por cada 25% de Game Value que siga con vida al final. Si el Lobo sigue con vida al terminar la ronda 5, TODOS los jugadores pierden 1 VP."
            },
            {
              "id": "scen_hidden_catacombs",
              "nombre": "Escenario 4: Las Catacumbas Ocultas",
              "etiqueta": "Recuperación / Búsqueda",
              "resumen": "Incursión a las catacumbas para descansar heridas y buscar un Artefacto Legendario.",
              "detalles": "<strong style='color: #00CED1;'>Despliegue:</strong> El defensor despliega en el centro (los personajes noqueados en la partida previa empiezan a 1 HP y Prone). Se colocan 5 fichas de búsqueda.<br><strong style='color: #00CED1;'>Reglas Especiales:</strong> Estar Prone al final de la activación recupera D6 HP gratis. Investigar una ficha (Hazaña Difícil) permite hallar un Artefacto Legendario.<br><strong style='color: #00CED1;'>Victoria (5 Rondas):</strong> +1 VP por cada 25% de Game Value que permanezca en mesa. Quien posea el Artefacto al final se lo queda para la campaña."
            },
            {
              "id": "scen_duel_dead",
              "nombre": "Escenario 5: El Duelo de la Muerte",
              "etiqueta": "Duelo Final",
              "resumen": "Enfrentamiento directo 1 vs 1 entre los Comandantes en la aguja del castillo.",
              "detalles": "<strong style='color: #00CED1;'>Despliegue:</strong> Despliegue libre a 6\" de bordes opuestos.<br><strong style='color: #00CED1;'>Reglas Especiales:</strong> Los Comandantes obtienen +10 HP extra. Si una tropa o esbirro hace daño a un Comandante, ese mismo daño se le devuelve automáticamente al atacante.<br><strong style='color: #00CED1;'>Victoria:</strong> La partida no finaliza por rondas, sino cuando solo un Comandante queda en pie. El vencedor recibe 3 VP directos."
            }
          ]
        }
      ]
    },
    {
      "id_seccion": "generador_escenarios",
      "nombre": "2. Generador de Escenarios (ArcDeck v2.1)",
      "descripcion": "Creación aleatoria de partidas extrayendo cartas del mazo ArcDeck. Se roban las siguientes cartas:<br> - Una para misión principal.<br> - Una por jugador para misión secundaria.",
      "categorias": [
        {
          "nombre_categoria": "Misiones Principales (Palo de la Carta)",
          "acciones": [
            {
              "id": "mission_hearts",
              "nombre": "♥️ Corazones: Dominion (Dominio Territorial)",
              "etiqueta": "Control",
              "resumen": "Controlar la mayor cantidad de cuadrantes en el mapa.",
              "detalles": "El tablero se divide en 4 cuadrantes. Al final de la partida se suma la HP restante en cada sección.<br>• 5 VP: Mayor HP en los 4 cuadrantes.<br>• 3 VP: Mayor HP en 2 cuadrantes.<br>• 1 VP: Mayor HP en 1 cuadrante.",
              "restriccion": "Los jugadores deben acordar el formato de despliegue antes de comenzar el juego:<br>-Despliegue estándar (a 6\" del borde).<br>-Despliegue en esquinas opuestas.<br>-Despliegue en bordes especificos.<br>Se debe decidir antes de revelar las misiones secundarias."
            },
            {
              "id": "mission_spades",
              "nombre": "♠️ Espadas: Take or Hold (Tomar o Mantener)",
              "etiqueta": "Área Objetivo",
              "resumen": "Capturar y asegurar una zona central estratégica de 6\"x6\".",
              "detalles": "• 5 VP: Sin enemigos en la zona y al menos 1 aliado dentro.<br>• 3 VP: Mayor total de HP aliada que enemiga dentro de la zona.<br>• 1 VP: Al menos 1 aliado dentro del área al final.",
              "restriccion": "Los jugadores deben acordar el formato de despliegue antes de comenzar el juego:<br>-Despliegue estándar (a 6\" del borde).<br>-Despliegue en esquinas opuestas.<br>-Despliegue en bordes especificos.<br>Se debe decidir antes de revelar las misiones secundarias."
            },
            {
              "id": "mission_diamonds",
              "nombre": "♦️ Diamantes: Arcanite Scavenge (Cosecha)",
              "etiqueta": "Recolección",
              "resumen": "Acaparar 6 Fichas de Arcanite distribuidas en el campo.",
              "detalles": "Se dispersan 6 fichas neutrales.<br>• 5 VP: Tener 5 o más fichas al final.<br>• 3 VP: Tener 3 o más fichas.<br>• 1 VP: Tener al menos 1 ficha.",
              "restriccion": "Los jugadores deben acordar el formato de despliegue antes de comenzar el juego:<br>-Despliegue estándar (a 6\" del borde).<br>-Despliegue en esquinas opuestas.<br>-Despliegue en bordes especificos.<br>Se debe decidir antes de revelar las misiones secundarias."
            },
            {
              "id": "mission_clubs",
              "nombre": "♣️ Tréboles: Brawl (Trifulca Total)",
              "etiqueta": "Combate",
              "resumen": "Aniquilar a la banda enemiga hasta que no quede nadie en pie.",
              "detalles": "• 5 VP: Todos los enemigos Noqueados o Broken.<br>• 3 VP: Queda menos del 25% del GP total enemigo en mesa.<br>• 1 VP: Queda menos del 50% del GP total enemigo en mesa.",
              "restriccion": "Los jugadores deben acordar el formato de despliegue antes de comenzar el juego:<br>-Despliegue estándar (a 6\" del borde).<br>-Despliegue en esquinas opuestas.<br>-Despliegue en bordes especificos.<br>Se debe decidir antes de revelar las misiones secundarias."
            }
          ]
        },
        {
          "nombre_categoria": "Misiones Secundarias (Número/Valor de Carta)",
          "acciones": [
            {
              "id": "sec_2_warband1",
              "nombre": "Carta 2: Warband Specific 1",
              "etiqueta": "2 VP",
              "resumen": "Activa la primera Misión Secundaria específica de la facción que juegas."
            },
            {
              "id": "sec_3_plunder",
              "nombre": "Carta 3: Plunder (Saqueo)",
              "etiqueta": "2 VP",
              "resumen": "Robar el 25% del valor total en GP del equipo del rival."
            },
            {
              "id": "sec_4_fortify",
              "nombre": "Carta 4: Fortify (Fortificar)",
              "etiqueta": "2 VP",
              "resumen": "Construir una zona cercada con muros (Hazaña Hard) sin enemigos dentro."
            },
            {
              "id": "sec_5_hoarder",
              "nombre": "Carta 5: Arcanite Hoarder (Acaparador)",
              "etiqueta": "2 VP",
              "resumen": "El Comandante debe finalizar la partida sosteniendo 3 o más fichas de Arcanita."
            },
            {
              "id": "sec_6_hunter",
              "nombre": "Carta 6: Hunter (Cazador)",
              "etiqueta": "2 VP",
              "resumen": "Cazar Bestias neutrales colocadas en el centro que sueltan Trofeos (Items) al ser noqueadas y terminar con la mayor cantidad de trofeos."
            },            
            {
              "id": "sec_7_vendetta",
              "nombre": "Carta 7: Vendetta (Venganza)",
              "etiqueta": "2 VP",
              "resumen": "El Comandante debe noquear a 3 o más enemigos que iniciaron con 5+ HP."
            },
            {
              "id": "sec_8_overrun",
              "nombre": "Carta 8: Overrun (Invasión)",
              "etiqueta": "2 VP",
              "resumen": " Tener al menos el 50% de la HP total de tu banda dentro de la zona de despliegue enemiga al final."
            },            
            {
              "id": "sec_9_capture",
              "nombre": "Carta 9: Capture (Captura)",
              "etiqueta": "2 VP",
              "resumen": "Apresar al Comandante rival (a 20% HP o menos) mediante una Hazaña."
            },
            {
              "id": "sec_10_demoler",
              "nombre": "Carta 10: Demolish (Demoler)",
              "etiqueta": "2 VP",
              "resumen": "Destruir un elemento de terreno designado de 50 HP ubicado a más de 12\" de tu zona de despliegue."
            },            
            {
              "id": "sec_J_assassinate",
              "nombre": "Carta J: Assassinate (Asesinato)",
              "etiqueta": "2 VP",
              "resumen": "Noquear al personaje enemigo que comenzó con la mayor HP de su banda."
            },
            {
              "id": "sec_Q_unscathed",
              "nombre": "Carta Q (Queen): Unscathed (Indemne)",
              "etiqueta": "2 VP",
              "resumen": "Proteger a un personaje elegido de tu banda para que no pierda ningún punto de HP durante la batalla."
            },            
            {
              "id": "sec_K_epic_duel",
              "nombre": "Carta K: Epic Duel (Duelo Épico)",
              "etiqueta": "2 VP",
              "resumen": "Tu Comandante debe noquear personalmente al Comandante rival."
            },
            {
              "id": "sec_A_warband2",
              "nombre": "Carta As (A): Warband Specific 2",
              "etiqueta": "2 VP",
              "resumen": "Activa la segunda Misión Secundaria específica de tu facción."
            },
            {
              "id": "sec_JK_legend",
              "nombre": "Joker: Stories of Legend (Historias Legendarias)",
              "etiqueta": "2 VP",
              "resumen": "Completar con éxito 3 Hazañas Legendarias (Legendary Feats) durante la partida."
            }                        
          ]
        }
      ]
    },
    {
      "id_seccion": "secundarias_faccion",
      "nombre": "3. Misiones Secundarias por Facción",
      "descripcion": "Objetivos temáticos propios de cada grupo de ArcWorlde.",
      "categorias": [
        {
          "nombre_categoria": "Misiones de Facción",
          "acciones": [
            {
              "id": "sec_ourks",
              "nombre": "Ourks: Party Boys / Sticky Fingers",
              "etiqueta": "Ourks",
              "resumen": "Party Boys: Consumir brebajes Ourk (2 VP por 6+ personajes, 1 VP por 3+).<br>Sticky Fingers: Robar equipamiento rival (2 VP por 6+ objetos robados, 1 VP por 3+)."
            },
            {
              "id": "sec_halflings",
              "nombre": "Halflings: Finest Ingredients / Pesky Sheep!",
              "etiqueta": "Halflings",
              "resumen": "Ingredients: Recoger hierbas culinarias en el mapa (2 VP por todas, 1 VP por la mitad).<br>Pesky Sheep!: Rescatar ovejas y llevarlas a la zona de despliegue (2 VP por 5 ovejas, 1 VP por 3)."
            },
            {
              "id": "sec_imperials",
              "nombre": "Imperials: Hold Steady! / By My Command!",
              "etiqueta": "Imperiales",
              "resumen": "Hold Steady!: Que ningún soldado quede Broken (2 VP).<br>By My Command!: Noquear enemigos cumpliendo órdenes del oficial (2 VP por 5 KO, 1 VP por 3)."
            },
            {
              "id": "sec_elves",
              "nombre": "Wild Elves: Open the Portal / Sacrifice",
              "etiqueta": "Elfos Silvanos",
              "resumen": "Open the Portal: Activar un portal místico y cruzar 3 personajes (2 VP).<br>Sacrifice: Realizar acciones de sacrificio ritual durante el combate (2 VP por 3 sacrificios)."
            },
            {
              "id": "sec_wizards",
              "nombre": "Wizards: Field Exercise / Overpower",
              "etiqueta": "Magos",
              "resumen": "Field Exercise: Lanzar 6 hechizos con éxito mediante Aprendices (2 VP).<br>Overpower: Sobrecargar hechizos con éxito (>21) para impresionar (2 VP por 3 sobrecargas)."
            },
            {
              "id": "sec_darklords",
              "nombre": "Dark Lords: Subjugate / Master of the Battlefield",
              "etiqueta": "Dark Lords",
              "resumen": "Subjugate: Capturar prisioneros enemigos durante la incursión.<br>Master of the Battlefield: Demostrar la fuerza destructiva del Señor Oscuro en combate (2 VP si el Dark Lord noquea personalmente a 6 enemigos; 1 VP si noquea a 3)"
            },
            {
              "id": "sec_beastfolk",
              "nombre": "Beast Folks: Prove Yeselves, Scallies! / Ruckus",
              "etiqueta": "Beast Folks",
              "resumen": "Prove Yeselves, Scallies!: Noquear enemigos utilizando tropas Vermen (2 VP por 5 KO, 1 VP por 3).<br>Ruckus: Poner a la banda bajo los tres efectos de las baladas del Warbard (2 VP por los 3 efectos, 1 VP por al menos 1)."
            },  
            {
              "id": "sec_undeadraiders",
              "nombre": "Undead Raiders: Deadshot / Treasure Chest",
              "etiqueta": "Undead Raiders",
              "resumen": "Deadshot: Noquear enemigos a distancia con pistolas Arcloque robadas (2 VP por 3 KO, 1 VP por 1).<br>Treasure Chest: Proteger el cofre del tesoro en tu zona de despliegue sin que el rival lo tome (2 VP si nunca lo tomaron, 1 VP si lo conservas al final)."
            }, 
            {
              "id": "sec_vampires",
              "nombre": "Vampires: Blood Drinkers / Feed, my Children!",
              "etiqueta": "Vampires",
              "resumen": "Blood Drinkers: Cautivar (Enthralled) mentes enemigas (2 VP por 4+ cautivos, 1 VP por 1).<br>Feed, my Children!: Noquear enemigos usando murciélagos de la cripta (Crypt Bats) (2 VP por 3 KO, 1 VP por 1)."
            }, 
            {
              "id": "sec_bestiary",
              "nombre": "Bestiary: The Hunt / Ambush",
              "etiqueta": "Bestiary",
              "resumen": "The Hunt: Digerir o engullir (Gobble) aventureros enemigas (2 VP por digerir a 1, 1 VP por engullir a 4+).<br>Ambush: Ocultarse en la escenografía para emboscar al rival (2 VP por 3+ emboscadas, 1 VP por 1)."
            },                                                  
            {
              "id": "sec_nodeads",
              "nombre": "Ancient Dead: The Tomb / Unearthed Brethren",
              "etiqueta": "Antiguos Muertos (Ancient Dead)",
              "resumen": "The Tomb: Defender las arcanitas de la tumba familiar en tu zona de despliegue evitando que las roben (2 VP si no roban ninguna).<br>Unearthed Brethren: Desenterrar sepulturas mediante Hazañas Medias para despertar a guerreros Skelts e incorporarlos a la partida (2 VP por despertar a los 4)"
            }
          ]
        }
      ]
    }
  ]
};
