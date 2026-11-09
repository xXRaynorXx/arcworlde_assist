// ============================================================================
// BASE DE DATOS MAESTRA COMPLETA DE ARCWORLDE (VERSIÓN CONSOLIDADA 2.5)
// Contiene: Todas las Facciones, Miniaturas/Atributos, Ataques, Hechizos,
// Armería Exclusiva y Común, Diccionario de Rasgos y Sistema de Campaña Completo.
// ============================================================================

const compendioArcWorlde = {
  "version": "2.5",
  "titulo": "Compendio Oficial Completo ArcWorlde - Base de Datos Maestra",
  "fecha_actualizacion": "2026-11-09",
  "reglas_generales_banda": {
    "comandante_obligatorio": true,
    "max_comandantes": 1
  },
  "facciones": [
    {
      "id": "halfling",
      "nombre": "Halflings",
      "unidades": [
        {
          "id": "sheriff",
          "nombre": "Sheriff",
          "nombre_en": "Halfling Sheriff",
          "tipo": "comandante",
          "coste": 80,
          "peana_mm": 30,
          "stats": {
            "hp": 10,
            "mov": 4,
            "armadura": 1,
            "ap": 4
          },
          "ataques": [
            "Spoon Whack: (2 AP) Melee, Power 5. Regla Especial: Si se obtiene un impacto Crítico, reduce en 1 los AP del personaje objetivo en su siguiente Activación. No acumulable.",
            "Shot: (Ranged) Shot, Power 5, Alcance 12\". (Si se equipa con Arma a Distancia Halfling)."
          ],
          "rasgos": [
            "Make Orders",
            "Rousing Cheer",
            "Light Armour (Gratis / +1 Armadura)"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [
            "montura_halfling",
            "arma_distancia_halfling",
            "almuerzo_llevar",
            "estandarte_pueblo"
          ],
          "equipo_de_serie": [
            "Armadura Ligera / Light Armour (Gratis / +1 Armadura)",
            "Espada y Garrote de Alguacil"
          ]
        },
        {
          "id": "halfling_militia",
          "nombre": "Milicia Halfling",
          "nombre_en": "Halfling Militia",
          "tipo": "tropa",
          "coste": 40,
          "peana_mm": 30,
          "stats": {
            "hp": 6,
            "mov": 4,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "Twhack: (2 AP) Melee, Power 6. Regla Especial: Un impacto Crítico permite al jugador repetir 1 dado de Impacto fallido.",
            "Thrust: (1 AP) Melee, Power 4."
          ],
          "rasgos": [
            "Take Orders"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "montura_halfling",
            "arma_distancia_halfling",
            "almuerzo_llevar"
          ],
          "equipo_de_serie": [
            "Herramientas Agrícolas / Armas Improvisadas"
          ]
        },
        {
          "id": "town_guard",
          "nombre": "Guardia del Pueblo",
          "nombre_en": "Town Guard",
          "tipo": "heroe",
          "coste": 55,
          "peana_mm": 30,
          "stats": {
            "hp": 7,
            "mov": 4,
            "armadura": 2,
            "ap": 3
          },
          "ataques": [
            "Determined Hack: (2 AP) Melee, Power 7. Regla Especial: Un impacto Crítico rompe 1 punto de Armadura.",
            "Chop: (1 AP) Melee, Power 4."
          ],
          "rasgos": [
            "Take Orders",
            "Heavy Armour",
            "Bodyguard",
            "Heavy Armour (Gratis / +2 Armadura)"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "montura_halfling",
            "arma_distancia_halfling",
            "almuerzo_llevar"
          ],
          "equipo_de_serie": [
            "Armadura Pesada / Heavy Armour (Gratis / +2 Armadura, +1 dificultad a Leg It)",
            "Hacha de la Guardia"
          ]
        },
        {
          "id": "battle_cook",
          "nombre": "Cocinero de Batalla",
          "nombre_en": "Halfling Battle Cook",
          "tipo": "heroe",
          "coste": 65,
          "peana_mm": 30,
          "stats": {
            "hp": 7,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "Ladle Bash: (2 AP) Melee, Power 5. Regla Especial: Si se obtiene un impacto Crítico, el objetivo queda Tumbado (Prone).",
            "Tenderise: (1 AP) Melee, Power 3."
          ],
          "rasgos": [
            "Grand Cookbook",
            "Grand Cookbook of Bulbo Chubb"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [
            "potbelly_cauldron",
            "almuerzo_llevar"
          ],
          "equipo_de_serie": [
            "Cucharas y Calderos de Combate",
            "El Gran Libro de Cocina / Grand Cookbook of Bulbo Chubb"
          ]
        },
        {
          "id": "monster_hunter",
          "nombre": "Cazador de Monstruos",
          "nombre_en": "Halfling Monster Hunter",
          "tipo": "heroe",
          "coste": 60,
          "peana_mm": 30,
          "stats": {
            "hp": 6,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "Spear Thrust: (2 AP) Melee, Power 6.",
            "Net Throw: (1 AP) Ranged, Power 3, Alcance 6\". Regla Especial: Si impacta, el objetivo queda Tumbado (Prone)."
          ],
          "rasgos": [
            "Expert Poacher",
            "Traps (Gratis)"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "almuerzo_llevar",
            "ranger_cloak"
          ],
          "equipo_de_serie": [
            "Marcadores de Trampa / Traps (Gratis / 1 uso por activación)"
          ]
        },
        {
          "id": "thing_flinger",
          "nombre": "Lanza-Cosas Halfling",
          "nombre_en": "Halfling Thing-Flinger",
          "tipo": "monstruo",
          "coste": 200,
          "peana_mm": 50,
          "stats": {
            "hp": 20,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "Catapult Shot: (Ranged) Power 8, Alcance 24\". Regla Especial: Utiliza la regla Carga Aleatoria (Payload). Requiere Hazaña Difícil para disparar.",
            "Crew Bash: (1 AP) Melee, Power 4."
          ],
          "rasgos": [
            "Crew and Payload",
            "Crew",
            "Random Payload"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Catapulta de Trastura / Thing-Flinger"
          ]
        }
      ],
      "reglas_faccion": [
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
        }
      ],
      "armeria_exclusiva": [
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
        }
      ]
    },
    {
      "id": "imperial",
      "nombre": "Imperiales",
      "unidades": [
        {
          "id": "imperial_captain",
          "nombre": "Capitán Imperial",
          "nombre_en": "Imperial Captain",
          "tipo": "comandante",
          "coste": 80,
          "peana_mm": 30,
          "stats": {
            "hp": 10,
            "mov": 4,
            "armadura": 1,
            "ap": 4
          },
          "ataques": [
            "Sabre Cut: (2 AP) Melee, Power 7.",
            "Pistol Shot: (Ranged) Power 5, Alcance 12\"."
          ],
          "rasgos": [
            "Make Orders",
            "Take Orders",
            "Light Armour",
            "Light Armour (Gratis / +1 Armadura)"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [
            "imperial_mount",
            "medical_kit",
            "imperial_gryphon",
            "arcloque_rifle"
          ],
          "equipo_de_serie": [
            "Armadura Ligera Imperial / Light Armour (Gratis / +1 Armadura)",
            "Espada de Oficial / Riposte"
          ]
        },
        {
          "id": "imperial_trooper",
          "nombre": "Soldado Raso / Trooper",
          "nombre_en": "Imperial Trooper",
          "tipo": "tropa",
          "coste": 40,
          "peana_mm": 30,
          "stats": {
            "hp": 6,
            "mov": 4,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "Heavy Strike: (2 AP) Melee, Power 6. Regla Especial: Un impacto Crítico permite repetir 1 tirada de Impacto fallida.",
            "Thrust: (1 AP) Melee, Power 4."
          ],
          "rasgos": [
            "Take Orders"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "imperial_mount",
            "arcloque_rifle",
            "imperial_crossbow",
            "medical_kit"
          ],
          "equipo_de_serie": [
            "Lanza o Espada de Recluta"
          ]
        },
        {
          "id": "imperial_dragoon",
          "nombre": "Dragón Imperial",
          "nombre_en": "Imperial Dragoon",
          "tipo": "heroe",
          "coste": 65,
          "peana_mm": 30,
          "stats": {
            "hp": 7,
            "mov": 4,
            "armadura": 1,
            "ap": 3
          },
          "ataques": [
            "Keen Slice: (2 AP) Melee, Power 7. Regla Especial: Un impacto Crítico permite repetir 1 tirada de Impacto fallida.",
            "Downswing: (1 AP) Melee, Power 4. Regla Especial: Si está montado, repite todos los fallos contra peanas de 30mm."
          ],
          "rasgos": [
            "Take Orders",
            "Light Armour",
            "Mounted Specialist",
            "Light Armour (Gratis / +1 Armadura)"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "imperial_mount",
            "medical_kit"
          ],
          "equipo_de_serie": [
            "Armadura Ligera de Dragón / Light Armour (Gratis / +1 Armadura)",
            "Sable Dragón"
          ]
        },
        {
          "id": "imperial_tinkerer",
          "nombre": "Hojalatero / Tinkerer",
          "nombre_en": "Imperial Tinkerer",
          "tipo": "heroe",
          "coste": 80,
          "peana_mm": 30,
          "stats": {
            "hp": 9,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "Spanner Whack: (2 AP) Melee, Power 5."
          ],
          "rasgos": [
            "Contraption Trunk",
            "Mage",
            "Contraption Trunk (Gratis)"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [
            "medical_kit"
          ],
          "equipo_de_serie": [
            "Contraption Trunk / Cofre Mecánico (Seguidor robot de 30mm que se desplaza gratis con el Mago)"
          ]
        },
        {
          "id": "imperial_arclancer",
          "nombre": "Arcalancero Imperial",
          "nombre_en": "Imperial Arclancer",
          "tipo": "heroe",
          "coste": 60,
          "peana_mm": 30,
          "stats": {
            "hp": 6,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "Arclance Discharge: (2 AP) Melee, Power 8. Regla Especial: Un impacto Crítico causa D3 Daño adicional.",
            "Jab: (1 AP) Melee, Power 4."
          ],
          "rasgos": [
            "Arc Energy",
            "Arclance (Gratis)"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "medical_kit"
          ],
          "equipo_de_serie": [
            "Lanza Arcana / Arclance (Cuenta como Lanza de serie; permite gastar Arcanita para +2 Power a cambio de D3 Hits)"
          ]
        },
        {
          "id": "imperial_ogre",
          "nombre": "Ogro Imperial",
          "nombre_en": "Imperial Ogre",
          "tipo": "monstruo",
          "coste": 160,
          "peana_mm": 50,
          "stats": {
            "hp": 16,
            "mov": 4,
            "armadura": 1,
            "ap": 5
          },
          "ataques": [
            "Clobber: (2 AP) Melee, Power 8. Regla Especial: Un impacto Crítico deja Tumbado (Prone) al objetivo en peana de 30mm o 40mm.",
            "Big Boot: (1 AP) Melee, Power 5. Regla Especial: +2 Power si el objetivo está Tumbado (Prone)."
          ],
          "rasgos": [
            "Take Orders",
            "Massive"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        }
      ],
      "reglas_faccion": [
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
        }
      ],
      "armeria_exclusiva": [
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
        }
      ]
    },
    {
      "id": "dark_lords",
      "nombre": "Señores Oscuros",
      "unidades": [
        {
          "id": "dark_lord",
          "nombre": "Señor Oscuro",
          "nombre_en": "Dark Lord",
          "tipo": "comandante",
          "coste": 210,
          "peana_mm": 50,
          "stats": {
            "hp": 20,
            "mov": 4,
            "armadura": 2,
            "ap": 6
          },
          "ataques": [
            "Malicious Strike: (2 AP) Melee, Power 7. Regla Especial: Si se obtienen más Éxitos que Fallos, el objetivo (peana <= 50mm) queda Tumbado (Prone).",
            "Malevolent Gaze: (Ranged) Power 4, Alcance 6\".",
            "Choke: (1 AP) Melee, Power 5. Regla Especial: No se incrementa con armas. Si causa daño, los enemigos deben pasar un Chequeo de Valentía."
          ],
          "rasgos": [
            "The Dark One's Will",
            "Split Activation",
            "Heavy Armour"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [
            "black_potion"
          ],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "hobgoblin_honcho",
          "nombre": "Capataz Hobgoblin",
          "nombre_en": "Hobgoblin Honcho",
          "tipo": "heroe",
          "coste": 50,
          "peana_mm": 30,
          "stats": {
            "hp": 7,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "Whipcrack: (2 AP) Melee, Power 6. Regla Especial: Puede objetivar enemigos hasta a 4\" de distancia.",
            "Brutish Slash: (1 AP) Melee, Power 4."
          ],
          "rasgos": [
            "Slavedriver"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "slaver_whip"
          ],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "hobgoblins",
          "nombre": "Hobgoblins",
          "nombre_en": "Hobgoblins",
          "tipo": "tropa",
          "coste": 35,
          "peana_mm": 30,
          "stats": {
            "hp": 5,
            "mov": 4,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "Hack'n'Slash: (2 AP) Melee, Power 4. Regla Especial: Cada impacto Crítico permite tirar 1D6 adicional.",
            "Gut Stab: (1 AP) Melee, Power 3."
          ],
          "rasgos": [
            "Diminutive"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "hobgoblin_ranged_weapon"
          ],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "hobgoblin_firestarter",
          "nombre": "Pirómano Hobgoblin",
          "nombre_en": "Hobgoblin Firestarter",
          "tipo": "heroe",
          "coste": 50,
          "peana_mm": 30,
          "stats": {
            "hp": 6,
            "mov": 4,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "Flame Toss: (Ranged) Power 6, Alcance 8\".",
            "Torching: (1 AP) Melee, Power 3."
          ],
          "rasgos": [
            "Arson Around",
            "Diminutive"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "underling",
          "nombre": "Esbirro Mágico",
          "nombre_en": "Underling",
          "tipo": "tropa",
          "coste": 20,
          "peana_mm": 30,
          "stats": {
            "hp": 4,
            "mov": 5,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "Blazing Demise: (2 AP) Melee/Area, Power 6. Regla Especial: Afecta a todos los personajes a 2\". El esbirro queda Noqueado tras el ataque.",
            "Nip: (1 AP) Melee, Power 3."
          ],
          "rasgos": [
            "Fiery Essence",
            "Diminutive"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "hellbeast",
          "nombre": "Bestia Infernal",
          "nombre_en": "Hellbeast",
          "tipo": "monstruo",
          "coste": 160,
          "peana_mm": 50,
          "stats": {
            "hp": 15,
            "mov": 10,
            "armadura": 1,
            "ap": 5
          },
          "ataques": [
            "Swoop: (2 AP) Melee, Power 8. Regla Especial: Un impacto Crítico deja al objetivo Tumbado (Prone).",
            "Grasping Talons: (2 AP) Melee. Regla Especial: Atrapa y eleva a una miniatura objetivo en peana de 30mm para soltarla desde la altura."
          ],
          "rasgos": [
            "Fly",
            "Fearsome",
            "Split Activation"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        }
      ],
      "reglas_faccion": [
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
        }
      ],
      "armeria_exclusiva": [
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
        }
      ]
    },
    {
      "id": "beastfolk",
      "nombre": "Hombres Bestia",
      "unidades": [
        {
          "id": "beastfolk_packmaster",
          "nombre": "Líder de la Camada / Packmaster",
          "nombre_en": "Beastfolk Packmaster",
          "tipo": "comandante",
          "coste": 120,
          "peana_mm": 40,
          "stats": {
            "hp": 14,
            "mov": 4,
            "armadura": 0,
            "ap": 5
          },
          "ataques": [
            "Mighty Kick: (1 AP) Melee, Power 5. Regla Especial: Si el objetivo está Tumbado (Prone), desplázalo 3\" en la dirección elegida.",
            "Gore: (1 AP) Melee, Power 5. Regla Especial: Un impacto Crítico rompe 1 punto de Armadura."
          ],
          "rasgos": [
            "Intimidating",
            "Animal Form"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [
            "horns_and_tusks",
            "protective_hide",
            "cured_meat"
          ],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "beastfolk_hedgewitch",
          "nombre": "Bruja del Bosque / Hedgewitch",
          "nombre_en": "Beastfolk Hedgewitch",
          "tipo": "heroe",
          "coste": 90,
          "peana_mm": 30,
          "stats": {
            "hp": 8,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "Staff Strike: (1 AP) Melee, Power 4."
          ],
          "rasgos": [
            "Lore of Tooth and Fur",
            "Animal Form",
            "Mage"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [
            "cured_meat"
          ],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "beastfolk_clanbeast",
          "nombre": "Guerrero del Clan / Clanbeast",
          "nombre_en": "Beastfolk Clanbeast",
          "tipo": "heroe",
          "coste": 85,
          "peana_mm": 40,
          "stats": {
            "hp": 10,
            "mov": 4,
            "armadura": 0,
            "ap": 4
          },
          "ataques": [
            "Savage: (2 AP) Melee, Power 7. Regla Especial: Cada impacto Crítico permite tirar 1D6 adicional.",
            "Smash: (1 AP) Melee, Power 5. Regla Especial: Un impacto Crítico rompe 1 punto de Armadura."
          ],
          "rasgos": [
            "Intimidating",
            "Animal Form"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "horns_and_tusks",
            "protective_hide",
            "cured_meat"
          ],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "beastfolk_verman",
          "nombre": "Verman",
          "nombre_en": "Beastfolk Verman",
          "tipo": "tropa",
          "coste": 30,
          "peana_mm": 30,
          "stats": {
            "hp": 5,
            "mov": 5,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "Eager Attack: (2 AP) Melee, Power 7. Regla Especial: Si hay más Fallos que Éxitos, pierde D3 HP.",
            "Stab: (1 AP) Melee, Power 3."
          ],
          "rasgos": [
            "Diminutive",
            "Animal Form",
            "Go Get'Em!"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "beastfolk_ranged_weapon",
            "cured_meat"
          ],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "war_bard",
          "nombre": "Bardo de Guerra",
          "nombre_en": "War Bard",
          "tipo": "heroe",
          "coste": 60,
          "peana_mm": 30,
          "stats": {
            "hp": 6,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "Almighty Racket: (2 AP) Melee/Area, Power 3. Regla Especial: Afecta a todos los personajes no-Beastfolk a 6\" o menos.",
            "Good Kickin': (1 AP) Melee, Power 4."
          ],
          "rasgos": [
            "Ballads of the Beastfolk",
            "Animal Form"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "cured_meat"
          ],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "kelpie",
          "nombre": "Kelpie",
          "nombre_en": "Kelpie",
          "tipo": "monstruo",
          "coste": 200,
          "peana_mm": 50,
          "stats": {
            "hp": 20,
            "mov": 6,
            "armadura": 1,
            "ap": 7
          },
          "ataques": [
            "Drowning Drag: (2 AP) Melee, Power 8.",
            "Water Lash: (1 AP) Melee, Power 5."
          ],
          "rasgos": [
            "Animal Form",
            "Waterborne"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        }
      ],
      "reglas_faccion": [
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
        }
      ],
      "armeria_exclusiva": [
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
        }
      ]
    },
    {
      "id": "ancient_dead",
      "nombre": "Antiguos Muertos",
      "unidades": [
        {
          "id": "ancient_grave_lord",
          "nombre": "Señor de las Tumbas",
          "nombre_en": "Ancient Grave Lord",
          "tipo": "comandante",
          "coste": 120,
          "peana_mm": 40,
          "stats": {
            "hp": 12,
            "mov": 4,
            "armadura": 1,
            "ap": 4
          },
          "ataques": [
            "Spooky Aura: (2 AP) Area, Power 5. Regla Especial: Afecta a todos los enemigos a 4\" o menos. Daño no modificable.",
            "Regal Slash: (1 AP) Melee, Power 5."
          ],
          "rasgos": [
            "Bones",
            "Afterlife",
            "Rise from Your Grave!"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [
            "sacred_blade",
            "circlet_of_bronze",
            "animal_totem"
          ],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "bog_magus",
          "nombre": "Mago del Pantano / Bog Magus",
          "nombre_en": "Bog Magus",
          "tipo": "heroe",
          "coste": 90,
          "peana_mm": 30,
          "stats": {
            "hp": 6,
            "mov": 4,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "Staff Whack: (1 AP) Melee, Power 4."
          ],
          "rasgos": [
            "Afterlife",
            "Tar Footed",
            "Mage"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [
            "animal_totem"
          ],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "skelt",
          "nombre": "Esqueleto / Skelt",
          "nombre_en": "Skelt",
          "tipo": "tropa",
          "coste": 35,
          "peana_mm": 30,
          "stats": {
            "hp": 5,
            "mov": 4,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "Rattling Strike: (2 AP) Melee, Power 5. Regla Especial: Impacto Crítico permite tirar 1 dado adicional.",
            "Stab: (1 AP) Melee, Power 3."
          ],
          "rasgos": [
            "Bones",
            "Afterlife"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "ancient_dead_ranged_weapon",
            "sacred_blade"
          ],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "tomb_guardian",
          "nombre": "Guardián de la Tumba",
          "nombre_en": "Tomb Guardian",
          "tipo": "heroe",
          "coste": 55,
          "peana_mm": 30,
          "stats": {
            "hp": 6,
            "mov": 4,
            "armadura": 1,
            "ap": 3
          },
          "ataques": [
            "Bronze Slice: (2 AP) Melee, Power 6.",
            "Shield Bash: (1 AP) Melee, Power 4."
          ],
          "rasgos": [
            "Afterlife",
            "Bones",
            "Buried Horde",
            "Buried Horde (-25% GP Armería Común)"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "sacred_blade",
            "circlet_of_bronze"
          ],
          "equipo_de_serie": [
            "Armadura de Bronce Ritual (+1 Armadura)",
            "Acceso a la Armería Común con 25% de descuento por el rasgo Buried Horde"
          ]
        },
        {
          "id": "relic_spirit",
          "nombre": "Espíritu de la Reliquia",
          "nombre_en": "Relic Spirit",
          "tipo": "heroe",
          "coste": 50,
          "peana_mm": 30,
          "stats": {
            "hp": 8,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "Howling Slashes: (2 AP) Area, Power 6. Regla Especial: Afecta a todos los enemigos a 4\" o menos.",
            "Vengeful Screech: (1 AP) Area, Power 3. Regla Especial: Afecta a todos los enemigos a 4\" o menos."
          ],
          "rasgos": [
            "Afterlife",
            "Spirit of the Relic"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "barrow_hound",
          "nombre": "Sabueso de las Tumbas",
          "nombre_en": "Barrow Hound",
          "tipo": "monstruo",
          "coste": 30,
          "peana_mm": 30,
          "stats": {
            "hp": 6,
            "mov": 7,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "Chomp: (1 AP) Melee, Power 5."
          ],
          "rasgos": [
            "Agile",
            "Pack Hunter",
            "Afterlife",
            "Bones"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        }
      ],
      "reglas_faccion": [
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
        }
      ],
      "armeria_exclusiva": [
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
        }
      ]
    },
    {
      "id": "vampires",
      "nombre": "Vampiros",
      "unidades": [
        {
          "id": "vampire_lord",
          "nombre": "Señor Vampiro",
          "nombre_en": "Vampire Lord",
          "tipo": "comandante",
          "coste": 150,
          "peana_mm": 40,
          "stats": {
            "hp": 16,
            "mov": 5,
            "armadura": 1,
            "ap": 5
          },
          "ataques": [
            "Vampiric Bite: (2 AP) Melee, Power 7. Regla Especial: El Señor Vampiro recupera HP iguales a las heridas causadas.",
            "Noble Slash: (1 AP) Melee, Power 5."
          ],
          "rasgos": [
            "Undead Lord",
            "Bloodline Powers"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "vampire_thrall",
          "nombre": "Siervo / Thrall",
          "nombre_en": "Vampire Thrall",
          "tipo": "tropa",
          "coste": 40,
          "peana_mm": 30,
          "stats": {
            "hp": 6,
            "mov": 4,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "Desperate Strike: (2 AP) Melee, Power 5.",
            "Scratch: (1 AP) Melee, Power 3."
          ],
          "rasgos": [
            "Subservient"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "manservant",
          "nombre": "Sirviente Personal",
          "nombre_en": "Manservant",
          "tipo": "heroe",
          "coste": 50,
          "peana_mm": 30,
          "stats": {
            "hp": 7,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "Serving Tray Bash: (2 AP) Melee, Power 6.",
            "Concealed Dagger: (1 AP) Melee, Power 4."
          ],
          "rasgos": [
            "Devoted Service"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "werewolf",
          "nombre": "Hombre Lobo",
          "nombre_en": "Werewolf",
          "tipo": "monstruo",
          "coste": 200,
          "peana_mm": 50,
          "stats": {
            "hp": 20,
            "mov": 6,
            "armadura": 1,
            "ap": 7
          },
          "ataques": [
            "Raking Claws: (2 AP) Melee, Power 7. Regla Especial: Críticos rompen 1 de Armadura.",
            "Savage: (2 AP) Melee, Power 5. Regla Especial: Cada impacto exitoso permite tirar un dado extra.",
            "Howl: (1 AP) Area, Power 2, Alcance 6\". Ignora armadura, fuerza Chequeo de Valentía."
          ],
          "rasgos": [
            "Agile",
            "Fearsome"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "crypt_bat",
          "nombre": "Murciélago de la Cripta",
          "nombre_en": "Crypt Bat",
          "tipo": "monstruo",
          "coste": 45,
          "peana_mm": 40,
          "stats": {
            "hp": 8,
            "mov": 8,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "Wing Buffet: (1 AP) Melee, Power 4.",
            "Fanged Bite: (1 AP) Melee, Power 5."
          ],
          "rasgos": [
            "Fly"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        }
      ],
      "reglas_faccion": [
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
        }
      ],
      "armeria_exclusiva": [
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
        }
      ]
    },
    {
      "id": "undead_raiders",
      "nombre": "Saqueadores No-Muertos",
      "unidades": [
        {
          "id": "harbinger",
          "nombre": "Heraldo / Harbinger",
          "nombre_en": "Harbinger",
          "tipo": "comandante",
          "coste": 110,
          "peana_mm": 40,
          "stats": {
            "hp": 12,
            "mov": 4,
            "armadura": 1,
            "ap": 4
          },
          "ataques": [
            "Scythe Sweep: (2 AP) Melee, Power 7.",
            "Dark Touch: (1 AP) Melee, Power 4."
          ],
          "rasgos": [
            "Resurrection",
            "Outlaw Lord"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "undead_raider",
          "nombre": "Saqueador No-Muerto",
          "nombre_en": "Undead Raider",
          "tipo": "tropa",
          "coste": 35,
          "peana_mm": 30,
          "stats": {
            "hp": 5,
            "mov": 4,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "Rusty Cutlass: (2 AP) Melee, Power 5.",
            "Pistol Shot: (Ranged) Power 4, Alcance 8\"."
          ],
          "rasgos": [
            "Undead"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "carrion_rat",
          "nombre": "Rata Carroñera",
          "nombre_en": "Carrion Rat",
          "tipo": "tropa",
          "coste": 20,
          "peana_mm": 30,
          "stats": {
            "hp": 4,
            "mov": 6,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "Diseased Bite: (1 AP) Melee, Power 3."
          ],
          "rasgos": [
            "Pack Hunter",
            "Undead"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "undead_ogre",
          "nombre": "Ogro No-Muerto",
          "nombre_en": "Undead Ogre",
          "tipo": "monstruo",
          "coste": 160,
          "peana_mm": 50,
          "stats": {
            "hp": 16,
            "mov": 4,
            "armadura": 1,
            "ap": 5
          },
          "ataques": [
            "Corpse Club: (2 AP) Melee, Power 8.",
            "Stomp: (1 AP) Melee, Power 5."
          ],
          "rasgos": [
            "Undead",
            "Massive"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        }
      ],
      "reglas_faccion": [
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
        }
      ],
      "armeria_exclusiva": [
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
        }
      ]
    },
    {
      "id": "wild_elves",
      "nombre": "Elfos Silvanos",
      "unidades": [
        {
          "id": "wild_elf_druid",
          "nombre": "Drúida Elfo Silvano",
          "nombre_en": "Wild Elf Druid",
          "tipo": "comandante",
          "coste": 110,
          "peana_mm": 30,
          "stats": {
            "hp": 10,
            "mov": 5,
            "armadura": 0,
            "ap": 4
          },
          "ataques": [
            "Staff of Bloodwood: (2 AP) Melee, Power 6.",
            "Nature's Wrath: (Ranged) Power 5, Alcance 8\"."
          ],
          "rasgos": [
            "Blood Magic",
            "Woodlore",
            "Mage"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "wild_elf_warrior",
          "nombre": "Guerrero Elfo Silvano",
          "nombre_en": "Wild Elf Warrior",
          "tipo": "tropa",
          "coste": 45,
          "peana_mm": 30,
          "stats": {
            "hp": 6,
            "mov": 5,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "Leafblade Slash: (2 AP) Melee, Power 6.",
            "Longbow Shot: (Ranged) Power 5, Alcance 16\"."
          ],
          "rasgos": [
            "Agile",
            "Woodlore"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "briarbeast",
          "nombre": "Briarbeast",
          "nombre_en": "Briarbeast",
          "tipo": "monstruo",
          "coste": 200,
          "peana_mm": 50,
          "stats": {
            "hp": 20,
            "mov": 8,
            "armadura": 1,
            "ap": 7
          },
          "ataques": [
            "Bladestorm: (2 AP) Melee, Power 8.",
            "Scissor Strike: (1 AP) Melee, Power 5. Breaks 1 Armour."
          ],
          "rasgos": [
            "Agile",
            "Woodlore"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "lichenhawk",
          "nombre": "Lichenhawk",
          "nombre_en": "Lichenhawk",
          "tipo": "monstruo",
          "coste": 35,
          "peana_mm": 30,
          "stats": {
            "hp": 4,
            "mov": 8,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "Skydive: (2 AP) Melee, Power 8, Alcance 2\". Regla Especial: Coloca en contacto de peana.",
            "Peck: (1 AP) Melee, Power 4."
          ],
          "rasgos": [
            "Fly",
            "Summoned",
            "Flammable"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        }
      ],
      "reglas_faccion": [
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
        }
      ],
      "armeria_exclusiva": [
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
        }
      ]
    },
    {
      "id": "ourks",
      "nombre": "Ourks",
      "unidades": [
        {
          "id": "ourk_chieftain",
          "nombre": "Jefe Ourk",
          "nombre_en": "Ourk Chieftain",
          "tipo": "comandante",
          "coste": 120,
          "peana_mm": 40,
          "stats": {
            "hp": 14,
            "mov": 4,
            "armadura": 1,
            "ap": 5
          },
          "ataques": [
            "Cleave: (2 AP) Melee, Power 8.",
            "Headbutt: (1 AP) Melee, Power 5."
          ],
          "rasgos": [
            "Power Struggle",
            "Swamp Born",
            "War Hides (+1 Armadura)"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Pieles de Batalla Ourk (+1 Armadura)"
          ]
        },
        {
          "id": "ourk_dreameater",
          "nombre": "Devorador de Sueños",
          "nombre_en": "Ourk Dreameater",
          "tipo": "heroe",
          "coste": 90,
          "peana_mm": 30,
          "stats": {
            "hp": 8,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "Swamp Staff: (1 AP) Melee, Power 4."
          ],
          "rasgos": [
            "Lore of Delusion",
            "Power Struggle",
            "Mage"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "ourk_brute",
          "nombre": "Bruto Ourk",
          "nombre_en": "Ourk Brute",
          "tipo": "heroe",
          "coste": 85,
          "peana_mm": 40,
          "stats": {
            "hp": 11,
            "mov": 4,
            "armadura": 1,
            "ap": 4
          },
          "ataques": [
            "Heavy Chopper: (2 AP) Melee, Power 7.",
            "Smash: (1 AP) Melee, Power 5."
          ],
          "rasgos": [
            "Swamp Born"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "boglin",
          "nombre": "Boglin",
          "nombre_en": "Boglin",
          "tipo": "tropa",
          "coste": 25,
          "peana_mm": 30,
          "stats": {
            "hp": 4,
            "mov": 4,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "Pokey Stick: (1 AP) Melee, Power 3."
          ],
          "rasgos": [
            "Diminutive",
            "Throwable"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "marsh_hydra",
          "nombre": "Hidra del Pantano",
          "nombre_en": "Marsh Hydra",
          "tipo": "monstruo",
          "coste": 200,
          "peana_mm": 50,
          "stats": {
            "hp": 25,
            "mov": 6,
            "armadura": 1,
            "ap": 7
          },
          "ataques": [
            "Venom Spit: (Ranged) Power 5, Alcance 8\".",
            "Constrict: (2 AP) Melee, Power 5. Regla Especial: En impacto Crítico, el objetivo no puede moverse ni atacar hasta superar Hazaña Media.",
            "Bite: (1 AP) Melee, Power 4."
          ],
          "rasgos": [
            "Head Regeneration",
            "Fearsome"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        }
      ],
      "reglas_faccion": [],
      "armeria_exclusiva": []
    },
    {
      "id": "gremlins",
      "nombre": "Gremlins",
      "unidades": [
        {
          "id": "gremlin_chief",
          "nombre": "Jefe Gremlin",
          "nombre_en": "Gremlin Chief",
          "tipo": "comandante",
          "coste": 80,
          "peana_mm": 30,
          "stats": {
            "hp": 8,
            "mov": 5,
            "armadura": 0,
            "ap": 4
          },
          "ataques": [
            "Chief's Scepter: (2 AP) Melee, Power 5.",
            "Kick: (1 AP) Melee, Power 3."
          ],
          "rasgos": [
            "Clout Points",
            "Gremlin Burrows"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "gremlin_warrior",
          "nombre": "Guerrero Gremlin",
          "nombre_en": "Gremlin Warrior",
          "tipo": "tropa",
          "coste": 25,
          "peana_mm": 30,
          "stats": {
            "hp": 4,
            "mov": 5,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "Rusty Dagger: (1 AP) Melee, Power 3."
          ],
          "rasgos": [
            "Diminutive",
            "Gremlin Burrows"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "spitlizard",
          "nombre": "Lagarto Escupidor",
          "nombre_en": "Spitlizard",
          "tipo": "tropa",
          "coste": 30,
          "peana_mm": 30,
          "stats": {
            "hp": 4,
            "mov": 6,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "Bite: (1 AP) Melee, Power 4."
          ],
          "rasgos": [
            "Agile",
            "Diminutive"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "jungle_troll",
          "nombre": "Troll de la Selva",
          "nombre_en": "Jungle Troll",
          "tipo": "monstruo",
          "coste": 220,
          "peana_mm": 50,
          "stats": {
            "hp": 20,
            "mov": 5,
            "armadura": 1,
            "ap": 8
          },
          "ataques": [
            "Hurl: (2 AP) Melee, Power 5. Regla Especial: En impacto Crítico, lanza al objetivo D6\" lejos y lo deja Tumbado (Prone).",
            "Smash: (1 AP) Melee, Power 6."
          ],
          "rasgos": [
            "Regeneration",
            "Fearsome"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        }
      ],
      "reglas_faccion": [
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
        }
      ],
      "armeria_exclusiva": [
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
        }
      ]
    },
    {
      "id": "wizards",
      "nombre": "Magos",
      "unidades": [
        {
          "id": "archmage",
          "nombre": "Archimago",
          "nombre_en": "Archmage",
          "tipo": "comandante",
          "coste": 120,
          "peana_mm": 30,
          "stats": {
            "hp": 10,
            "mov": 4,
            "armadura": 0,
            "ap": 4
          },
          "ataques": [
            "Wizard Staff: (1 AP) Melee, Power 4.",
            "Arcane Bolt: (Ranged) Power 6, Alcance 12\"."
          ],
          "rasgos": [
            "Elemental Colleges",
            "Things of Magic",
            "Mage"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "battle_wizard",
          "nombre": "Mago de Batalla",
          "nombre_en": "Battle Wizard",
          "tipo": "heroe",
          "coste": 85,
          "peana_mm": 30,
          "stats": {
            "hp": 8,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "Staff Strike: (1 AP) Melee, Power 4."
          ],
          "rasgos": [
            "Elemental Colleges",
            "Mage"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "enchanted_sentinel",
          "nombre": "Centinela Encantado",
          "nombre_en": "Enchanted Sentinel",
          "tipo": "heroe",
          "coste": 100,
          "peana_mm": 40,
          "stats": {
            "hp": 12,
            "mov": 4,
            "armadura": 2,
            "ap": 3
          },
          "ataques": [
            "Heavy Strike: (2 AP) Melee, Power 7. Regla Especial: Impacto Crítico deja al objetivo (peana 30mm) Tumbado (Prone).",
            "Thrust: (1 AP) Melee, Power 4."
          ],
          "rasgos": [
            "Enchanted Armour"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        }
      ],
      "reglas_faccion": [
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
      ],
      "armeria_exclusiva": [
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
      ]
    },
    {
      "id": "bestiary",
      "nombre": "Bestiario y Mercenarios",
      "unidades": [
        {
          "id": "griffling",
          "nombre": "Griffling",
          "nombre_en": "Griffling",
          "tipo": "monstruo",
          "coste": 22,
          "peana_mm": 30,
          "stats": {
            "hp": 4,
            "mov": 6,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "Dive Bomb: (2 AP) Melee, Power 7, Alcance 2\". Regla Especial: Coloca al Griffling en contacto de peana tras atacar. Noqueado si saca más fallos que éxitos.",
            "Peck: (1 AP) Melee, Power 3."
          ],
          "rasgos": [
            "Fly",
            "Pack Hunter",
            "Chocks Away!"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "forest_troll",
          "nombre": "Troll del Bosque",
          "nombre_en": "Forest Troll",
          "tipo": "monstruo",
          "coste": 220,
          "peana_mm": 50,
          "stats": {
            "hp": 20,
            "mov": 5,
            "armadura": 1,
            "ap": 8
          },
          "ataques": [
            "Boulder Lob: (Ranged) Power 9, Alcance 12\". Requiere Hazaña Media.",
            "Hurl: (2 AP) Melee, Power 4. Regla Especial: En impacto Crítico, lanza a la víctima D6\" lejos y la deja Tumbada (Prone).",
            "Smash: (1 AP) Melee, Power 6. Regla Especial: En impacto Crítico, deja Tumbado al objetivo de peana más pequeña."
          ],
          "rasgos": [
            "Fungal Regeneration",
            "Fearsome"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        },
        {
          "id": "giant",
          "nombre": "Gigante / Giganta",
          "nombre_en": "Giant / Giantess",
          "tipo": "mercenario",
          "coste": 600,
          "peana_mm": 120,
          "stats": {
            "hp": 60,
            "mov": 5,
            "armadura": 2,
            "ap": 20
          },
          "ataques": [
            "Massive Club: (2 AP) Melee, Power 10, Alcance 3\".",
            "Pick Up: (2 AP) Melee. Regla Especial: Permite agarrar personajes (peana <= 40mm) y lanzarlos.",
            "Bellow: (1 AP) Area, Alcance 6\". Fuerza Chequeo de Valentía en área."
          ],
          "rasgos": [
            "Long Limbs",
            "Titan"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ]
        }
      ],
      "reglas_faccion": [],
      "armeria_exclusiva": []
    }
  ],
  "armeria_comun": [
    {
      "id": "light_armour",
      "nombre": "Armadura Ligera / Light Armour",
      "tipo": "Armadura",
      "coste": 10,
      "efecto": "+1 al Valor de Armadura del personaje.",
      "restriccion": "No acumulable con otras armaduras."
    },
    {
      "id": "heavy_armour",
      "nombre": "Armadura Pesada / Heavy Armour",
      "tipo": "Armadura",
      "coste": 25,
      "efecto": "+2 al Valor de Armadura del personaje.",
      "restriccion": "No acumulable con otras armaduras. Reduce en -1\" el Movimiento de tropas con peana de 30mm."
    },
    {
      "id": "shield",
      "nombre": "Escudo / Shield",
      "tipo": "Equipo Defensivo",
      "coste": 10,
      "efecto": "Otorga +1 al Valor de Armadura frente a ataques frontales y disparos.",
      "restriccion": "Requiere una mano libre. No compatible con armas a dos manos."
    },
    {
      "id": "spear",
      "nombre": "Lanza / Spear",
      "tipo": "Arma Cuerpo a Cuerpo",
      "coste": 10,
      "efecto": "Otorga el ataque Spear Thrust (Power 5, Alcance 2\"). Permite contragolpear cuando un enemigo se traba.",
      "restriccion": "Arma de dos manos o una mano si se usa con escudo."
    },
    {
      "id": "great_weapon",
      "nombre": "Arma a Dos Manos / Great Weapon",
      "tipo": "Arma Cuerpo a Cuerpo",
      "coste": 15,
      "efecto": "Otorga un ataque melé de Power 8. Los impactos críticos rompen 1 punto de armadura enemiga.",
      "restriccion": "Requiere 2 manos. El usuario ataca en último lugar en la ronda si no cargó."
    },
    {
      "id": "dual_weapons",
      "nombre": "Armas Dobles / Dual Blades",
      "tipo": "Arma Cuerpo a Cuerpo",
      "coste": 10,
      "efecto": "Permite realizar un segundo ataque melé gratuito por 1 AP menos una vez por ronda.",
      "restriccion": "Ocupa ambas manos."
    },
    {
      "id": "ranged_weapon",
      "nombre": "Arma a Distancia / Ranged Weapon",
      "tipo": "Arma a Distancia",
      "coste": 15,
      "efecto": "Otorga el ataque Shot (Power 5, Alcance 12\").",
      "restriccion": "Requiere 2 AP para disparar."
    },
    {
      "id": "arcanite_token",
      "nombre": "Ficha de Arcanita / Arcanite Token",
      "tipo": "Consumible Mágico",
      "coste": 5,
      "efecto": "Se consume para repetir una tirada de ataque, defensa o proeza mágica.",
      "restriccion": "De un solo uso."
    },
    {
      "id": "torch",
      "nombre": "Antorcha / Torch",
      "tipo": "Equipo / Objeto",
      "coste": 5,
      "efecto": "Ilumina en penumbra a 6\" y otorga un ataque melé de fuego Power 4 contra objetivos Inflamables.",
      "restriccion": "Revela la posición del portador a distancia."
    },
    {
      "id": "healing_potion",
      "nombre": "Poción de Curación / Healing Potion",
      "tipo": "Consumible",
      "coste": 10,
      "efecto": "El personaje o un aliado en contacto de peana recupera D6 HP.",
      "restriccion": "De un solo uso."
    }
  ],
  "diccionario_rasgos": {
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
  },
  "sistema_campana": {
    "rasgos_campana": [
      {
        "id": "burglar",
        "nombre": "Ladrón (Burglar)",
        "costo": "Nivel 1 (3 VP) / Nivel 2 (6 VP) / Nivel 3 (12 VP)",
        "niveles": [
          {
            "nivel": 1,
            "costo_vp": 3,
            "efecto": "Permite repetir una tirada de Hazaña fallida para Robar un Objeto."
          },
          {
            "nivel": 2,
            "costo_vp": 6,
            "efecto": "Permite robar Equipo a personajes que estén Tumbados (Prone)."
          },
          {
            "nivel": 3,
            "costo_vp": 12,
            "efecto": "Permite intentar Robar a personajes que no estén Tumbados."
          }
        ],
        "descripcion": "Especialmente hábil para birlar objetos valiosos a sus enemigos."
      },
      {
        "id": "deadeye",
        "nombre": "Tirador Certero (Deadeye)",
        "costo": "Niveles 1-4 (3, 6, 12, 20 VP)",
        "niveles": [
          {
            "nivel": 1,
            "costo_vp": 3,
            "efecto": "Permite repetir una tirada de Hazaña para disparar por partida."
          },
          {
            "nivel": 2,
            "costo_vp": 6,
            "efecto": "Permite disparar a un combate cuerpo a cuerpo sin penalización."
          },
          {
            "nivel": 3,
            "costo_vp": 12,
            "efecto": "Permite repetir una tirada de Hazaña para disparar en cada Ronda."
          },
          {
            "nivel": 4,
            "costo_vp": 20,
            "efecto": "Ignora Cobertura y Terreno para todos sus Ataques a Distancia."
          }
        ],
        "descripcion": "Hábil con armas a distancia, capaz de realizar disparos increíbles e imposibles."
      },
      {
        "id": "fearless",
        "nombre": "Sin Miedo (Fearless)",
        "costo": "Niveles 1-3 (3, 6, 12 VP)",
        "niveles": [
          {
            "nivel": 1,
            "costo_vp": 3,
            "efecto": "Permite repetir Chequeos de Valentía (Bravery Tests) fallidos."
          },
          {
            "nivel": 2,
            "costo_vp": 6,
            "efecto": "Supera automáticamente todos los Chequeos de Valentía."
          },
          {
            "nivel": 3,
            "costo_vp": 12,
            "efecto": "Todos los aliados a 3\" o menos también repiten Chequeos de Valentía fallidos."
          }
        ],
        "descripcion": "Ya sea por verdadero valor o por locura, mira al terror a la cara con una sonrisa."
      },
      {
        "id": "fleet_of_foot",
        "nombre": "Pies Ligeros (Fleet of Foot)",
        "costo": "Nivel 1 (3 VP) / Nivel 2 (6 VP)",
        "niveles": [
          {
            "nivel": 1,
            "costo_vp": 3,
            "efecto": "Otorga +1 al atributo de Movimiento."
          },
          {
            "nivel": 2,
            "costo_vp": 6,
            "efecto": "Otorga un +1 adicional al atributo de Movimiento (+2 total)."
          }
        ],
        "descripcion": "Famoso por su rapidez, recorriendo grandes distancias con facilidad."
      },
      {
        "id": "haggler",
        "nombre": "Regateador (Haggler)",
        "costo": "3 VP",
        "niveles": [
          {
            "nivel": 1,
            "costo_vp": 3,
            "efecto": "Si no quedó Noqueado en la partida anterior, permite repetir la tirada del Capricho del Comerciante Itinerante (Wandering Trader)."
          }
        ],
        "descripcion": "Experto en los mercados, domina el lenguaje del comercio."
      },
      {
        "id": "hard_head",
        "nombre": "Cabeza Dura (Hard Head)",
        "costo": "10 VP",
        "niveles": [
          {
            "nivel": 1,
            "costo_vp": 10,
            "efecto": "Si queda Noqueado, tira 1D6. Si resulta en Éxito, reaparece en la misma posición en la siguiente Ronda con 1 HP."
          }
        ],
        "descripcion": "Incluso tras recibir la paliza de su vida, se niega a quedarse tirado."
      },
      {
        "id": "hardy",
        "nombre": "Resistente (Hardy)",
        "costo": "Niveles 1-4 (3, 6, 12, 20 VP)",
        "niveles": [
          {
            "nivel": 1,
            "costo_vp": 3,
            "efecto": "Otorga +D3 HP máximos."
          },
          {
            "nivel": 2,
            "costo_vp": 6,
            "efecto": "Otorga un bono adicional de +D6 HP máximos."
          },
          {
            "nivel": 3,
            "costo_vp": 12,
            "efecto": "Otorga un bono adicional de +D6 HP máximos."
          },
          {
            "nivel": 4,
            "costo_vp": 20,
            "efecto": "Otorga un bono adicional de +D6 HP máximos."
          }
        ],
        "descripcion": "Endurecido por sus aventuras, puede encajar más golpes que el guerrero promedio."
      },
      {
        "id": "shield_specialist",
        "nombre": "Especialista en Escudo (Shield Specialist)",
        "costo": "3 VP",
        "niveles": [
          {
            "nivel": 1,
            "costo_vp": 3,
            "efecto": "Si usa un Escudo para repetir una Tirada de Defensa y tiene éxito, el atacante (si está en contacto de peana) sufre inmediatamente D6 Hits."
          }
        ],
        "descripcion": "Ha entrenado duro con el escudo y lo utiliza con gran efectividad ofensiva."
      },
      {
        "id": "sorcerous",
        "nombre": "Arcano / Mágico (Sorcerous)",
        "costo": "Niveles 1-3 (3, 6, 12 VP)",
        "niveles": [
          {
            "nivel": 1,
            "costo_vp": 3,
            "efecto": "Permite volver a robar 1 carta del ArcDeck al lanzar un Hechizo."
          },
          {
            "nivel": 2,
            "costo_vp": 6,
            "efecto": "No sufre ningún efecto negativo por Sobrecarga Mágica (Overpowered)."
          },
          {
            "nivel": 3,
            "costo_vp": 12,
            "efecto": "Puede lanzar Hechizos pertenecientes al Saber de Hechicería del oponente."
          }
        ],
        "descripcion": "Sabio en el uso de la magia, capaz de recurrir a lo arcano en momentos de necesidad."
      },
      {
        "id": "spear_specialist",
        "nombre": "Especialista en Lanza (Spear Specialist)",
        "costo": "3 VP",
        "niveles": [
          {
            "nivel": 1,
            "costo_vp": 3,
            "efecto": "Si lleva equipada una Lanza, su alcance de ataque aumenta a 3 pulgadas (3\")."
          }
        ],
        "descripcion": "Ha entrenado duro con la lanza para golpear a mayores distancias."
      },
      {
        "id": "spring_heeled",
        "nombre": "Pies de Muelle / Ágil (Spring-heeled)",
        "costo": "6 VP",
        "niveles": [
          {
            "nivel": 1,
            "costo_vp": 6,
            "efecto": "Si resulta Tumbado (Prone), tira 1D6. Si es un Éxito, evita quedar Tumbado."
          }
        ],
        "descripcion": "Su agilidad le permite evitar caer al suelo en el peor momento."
      },
      {
        "id": "story_blessed",
        "nombre": "Bendecido por la Historia (Story-blessed)",
        "costo": "3 VP",
        "niveles": [
          {
            "nivel": 1,
            "costo_vp": 3,
            "efecto": "Permite repetir tiradas fallidas de Hazañas Narrativas (Narrative Feats)."
          }
        ],
        "descripcion": "Lleva una vida afortunada, metiéndose en líos y saliendo siempre airoso."
      },
      {
        "id": "strongarm",
        "nombre": "Brazo Fuerte (Strongarm)",
        "costo": "Nivel 1 (3 VP) / Nivel 2 (6 VP)",
        "niveles": [
          {
            "nivel": 1,
            "costo_vp": 3,
            "efecto": "Gana 1D6 extra en cualquier intento de Hazaña que requiera fuerza física."
          },
          {
            "nivel": 2,
            "costo_vp": 6,
            "efecto": "Gana además +1 al Poder (Power) en todos sus Ataques."
          }
        ],
        "descripcion": "Especialmente corpulento, capaz de realizar proezas de gran fuerza."
      },
      {
        "id": "trusty_lieutenant",
        "nombre": "Teniente de Confianza (Trusty Lieutenant)",
        "costo": "3 VP",
        "niveles": [
          {
            "nivel": 1,
            "costo_vp": 3,
            "efecto": "Si el Comandante queda Noqueado o no participa en la partida, este personaje cuenta como Comandante."
          }
        ],
        "descripcion": "Compañero leal preparado para tomar el mando si el líder cae."
      },
      {
        "id": "two_handed_weapon_specialist",
        "nombre": "Especialista en Arma a Dos Manos (Two-Handed Weapon Specialist)",
        "costo": "3 VP",
        "niveles": [
          {
            "nivel": 1,
            "costo_vp": 3,
            "efecto": "Si lleva equipada un Arma a Dos Manos, permite repetir 1 Impacto (Hit) fallido por Ronda."
          }
        ],
        "descripcion": "Maneja las armas pesadas a dos manos con destreza letal."
      },
      {
        "id": "unscathed",
        "nombre": "Indemne / Ileso (Unscathed)",
        "costo": "3 VP",
        "niveles": [
          {
            "nivel": 1,
            "costo_vp": 3,
            "efecto": "Permite repetir las tiradas en la Tabla de Heridas (Injury Rolls) tras quedar Noqueado."
          }
        ],
        "descripcion": "Se recupera de todas las heridas casi sin secuelas permanentes."
      }
    ],
    "vendedor_ambulante": [
      {
        "resultado": "1",
        "estado": "De mal humor",
        "precio_compra": "Caro (+25%)",
        "precio_venta": "Ganga (-25%)",
        "descripcion": "El vendedor está molesto y sube precios a tu banda."
      },
      {
        "resultado": "2",
        "estado": "Exigente",
        "precio_compra": "Caro (+25%)",
        "precio_venta": "Caro (+25%)",
        "descripcion": "Solo comercia con género de alta calidad."
      },
      {
        "resultado": "3-4",
        "estado": "Trato Justo",
        "precio_compra": "Normal",
        "precio_venta": "Normal",
        "descripcion": "Precios estándar del catálogo."
      },
      {
        "resultado": "5",
        "estado": "Cliente Favorito",
        "precio_compra": "Ganga (-25%)",
        "precio_venta": "Ganga (-25%)",
        "descripcion": "Te aprecia y te hace rebajas en las compras."
      },
      {
        "resultado": "6",
        "estado": "Excelente Humor",
        "precio_compra": "Ganga (-25%)",
        "precio_venta": "Caro (+25%)",
        "descripcion": "Compra tus objetos a gran precio y te vende barato."
      }
    ],
    "eventos_entre_partidas": [
      {
        "code": "1/1",
        "name": "Arc Storm",
        "nombre_es": "Tormenta Arcana",
        "descripcion": "Una feroz tormenta arcana gira en los cielos y tu banda queda atrapada en ella.",
        "resultados": {
          "1-2": "Los vientos de energía lanzan rayos. Elige un personaje del Campamento para eliminarlo permanentemente. Ganas 1D6 Tokens de Arcanita.",
          "3-4": "La tormenta absorbe la magia. Ningún personaje de la banda puede lanzar hechizos en la siguiente partida.",
          "5-6": "Rayos de azur impactan en el suelo dejando cristales. Ganas 2D6 Tokens de Arcanita."
        }
      },
      {
        "code": "1/2",
        "name": "Lonely Fire",
        "nombre_es": "Fuego Solitario",
        "descripcion": "Una pequeña fogata parpadea a lo lejos y una figura solitaria se sienta junto a ella.",
        "resultados": {
          "1-2": "La figura no reacciona bien y desenfunda un arma. Resta 1D6 HP a tu Comandante para la siguiente partida.",
          "3-4": "La figura es cautelosa pero te invita al fuego. Es un guerrero famoso: puedes contratar 1 Sword for Hire al 25% de su coste en el siguiente Capítulo.",
          "5-6": "Noche de revelría y juramento de sangre. Añades una Sword for Hire permanentemente al Campamento de forma gratuita."
        }
      },
      {
        "code": "1/3",
        "name": "Logger's Cabin",
        "nombre_es": "Cabaña del Leñador",
        "descripcion": "La banda encuentra una cabaña rodeada de troncos cortados que parece desierta.",
        "resultados": {
          "1-2": "Un leñador muy furioso sale al paso. El Comandante pierde D6 HP para la siguiente partida.",
          "3-4": "La cabaña está desierta y alguien ya se ha llevado todo lo de valor.",
          "5-6": "Nadie está en casa y de las paredes cuelgan hachas de gran calidad. Añade tres Fine Two-Handed Weapons al Cofre de Campaña."
        }
      },
      {
        "code": "1/4",
        "name": "Titan's Lair",
        "nombre_es": "Guarida del Titán",
        "descripcion": "La banda se encuentra en la entrada de una caverna gigantesca donde duerme una criatura monstruosa.",
        "resultados": {
          "1-2": "El Titán despierta y carga. Cada personaje del Campamento pierde D3 HP para la siguiente partida.",
          "3-4": "Tras un enfrentamiento el Titán huye. Encuentras botín entre los restos: añade 5D6 GP al Cofre.",
          "5-6": "El Titán es una bestia anciana y pacífica. Puedes contratar un Titán para tu Campamento a precio Chollo (Bargain, -25%)."
        }
      },
      {
        "code": "1/5",
        "name": "Farmer's Market",
        "nombre_es": "Mercado de Granjeros",
        "descripcion": "Descubres un pueblo remoto donde los granjeros venden sus mercancías.",
        "resultados": {
          "1-2": "Los aldeanos no os reciben bien y hay una pelea. Añade 10D6 GP al Cofre, pero realiza una Tirada de Lesión (Injury Roll) para cada personaje del Campamento.",
          "3-4": "Los granjeros son amables. Puedes comprar el objeto de curación de tu facción a precio Chollo (Bargain).",
          "5-6": "Comida deliciosa y a buen precio. Puedes comprar 'Gourmet Nosh' (objeto de un solo uso que cura 6 HP) por 15 GP."
        }
      },
      {
        "code": "1/6",
        "name": "Haunted Graveyard",
        "nombre_es": "Cementerio Encantado",
        "descripcion": "Un cementerio olvidado cubierto por una niebla espectral.",
        "resultados": {
          "1-2": "Los muertos se alzan. Cada personaje del Campamento pierde D3 HP para la siguiente partida.",
          "3-4": "Los lamentos espectrales se oyen durante días. Cada personaje del Campamento sufre -1 a Valentía (Bravery) para la siguiente partida.",
          "5-6": "Los muertos agradecen la compañía. Puedes contratar cualquier Unidad de las facciones No-Muertas a precio Chollo (Bargain) para tu Campamento."
        }
      },
      {
        "code": "2/1",
        "name": "Forest Tavern",
        "nombre_es": "Taberna del Bosque",
        "descripcion": "Una posada fortificada al lado del camino invita a pedir una ronda de bebidas.",
        "resultados": {
          "1-2": "La cerveza estaba rancia. Todo el Campamento sufre -1 al Movimiento en la siguiente partida.",
          "3-4": "La cerveza es excelente. Todo el Campamento gana +1 a Valentía (Bravery) para la siguiente partida.",
          "5-6": "Vinos mágicos finos. Descuenta 1 Token de Arcanita del Cofre: el Campamento gana +1 Bravery y cada personaje empieza la partida equipado con 1 objeto de curación de facción."
        }
      },
      {
        "code": "2/2",
        "name": "Babbling Brook",
        "nombre_es": "Arroyo Murmurante",
        "descripcion": "Un riachuelo cuyas aguas cristalinas parecen llamar a la banda.",
        "resultados": {
          "1-2": "Emergen palabras oscuras del agua. Cada personaje del Campamento sufre -1 a Valentía (Bravery) en la siguiente partida.",
          "3-4": "Agua fresca y revitalizante. Cada personaje puede repetir una tirada fallida de Leg-It en el siguiente Capítulo.",
          "5-6": "Brillan tesoros bajo el agua. Ganas 3 Tokens de Arcanita."
        }
      },
      {
        "code": "2/3",
        "name": "Hidden Lagoon",
        "nombre_es": "Laguna Oculta",
        "descripcion": "Un lago brillante que no aparecía en los mapas.",
        "resultados": {
          "1-2": "Un Dragón del Fjord (Fjord Dragon) ataca. Cada personaje del Campamento pierde D3 HP para la siguiente partida.",
          "3-4": "Gran pesca sin miedo. Añade D6 'Tasty Fish' (objeto de 0 GP que cura 3 HP) al Cofre.",
          "5-6": "Un brazo emerge del agua sosteniendo un objeto mágico. Ganas 1 Artefacto Legendario (Fabled Artefact)."
        }
      },
      {
        "code": "2/4",
        "name": "Well, Well, Well",
        "nombre_es": "El Pozo",
        "descripcion": "Un pozo en el bosque del que sale la voz de un niño pidiendo ayuda.",
        "resultados": {
          "1-2": "Un tentáculo gigantesco atrapa al personaje de menor coste de GP y lo arrastra al fondo: queda eliminado permanentemente.",
          "3-4": "El cubo del pozo le da un golpe en la cabeza. El personaje de menor coste de GP del Campamento pierde D3 HP para la siguiente partida.",
          "5-6": "Rescatas a un niño y encuentras un brillo tentador en el fondo. Añade D6 Tokens de Arcanita al Cofre."
        }
      },
      {
        "code": "2/5",
        "name": "Stables",
        "nombre_es": "Establos",
        "descripcion": "Un pajar abandonado con varias monturas atadas.",
        "resultados": {
          "1-2": "Patada furiosa. Un personaje del Campamento de al menos 50 GP queda Noqueado para la siguiente partida.",
          "3-4": "Monturas difíciles de controlar. Si tu armería de facción incluye monturas, puedes desplegar D3 gratis en la siguiente partida (deben pasar Chequeo de Valentía al activarse o sufrir D3 Hits). Si no, añade D3 'Horsemeat' (cura 3 HP).",
          "5-6": "Monturas agradecidas. Si tu armería incluye monturas, añade D3 al Cofre gratis. Si no, añade D6 'Horsemeat' al Cofre."
        }
      },
      {
        "code": "2/6",
        "name": "Monster's Nest",
        "nombre_es": "Nido del Monstruo",
        "descripcion": "Ruidos dentro de una cueva revelan una gran criatura durmiendo.",
        "resultados": {
          "1-2": "El monstruo despierta con hambre. Cada personaje del Campamento pierde D3 HP para la siguiente partida.",
          "3-4": "Tras una pelea la criatura es amansada. Puedes contratar un Monstruo del Bestiario a su precio normal.",
          "5-6": "Calmas al monstruo con comida. Puedes contratar un Monstruo para tu Campamento a precio Chollo (Bargain, -25%)."
        }
      },
      {
        "code": "3/1",
        "name": "Merchant Caravan",
        "nombre_es": "Caravana Comercial",
        "descripcion": "Un comerciante ofrece pagar por protección contra bandidos en el camino.",
        "resultados": {
          "1-2": "Ataque fiero de bandidos. Cada personaje pierde D3 HP para la siguiente partida y obtienes 5D6 GP en el Cofre.",
          "3-4": "Viaje tranquilo y pago generoso. Añade 10D6 GP al Cofre de Campaña.",
          "5-6": "El comerciante intenta no pagar, así que saqueáis su caravana. Añade 15D6 GP y D6 Tokens de Arcanita al Cofre."
        }
      },
      {
        "code": "3/2",
        "name": "Gryphon's Aerie",
        "nombre_es": "Nido del Grifo",
        "descripcion": "En la cima de un acantilado se encuentra el nido de un Grifo con sus huevos.",
        "resultados": {
          "1-2": "La madre Grifo ataca al intentar robar. Un personaje de al menos 50 GP queda Noqueado para el siguiente Capítulo.",
          "3-4": "Ahuyentáis al Grifo y robáis un huevo. Cada personaje pierde D3 HP, pero añades un 'Gryphon Egg' (objeto de 100 GP) al Cofre.",
          "5-6": "El Grifo os adopta como sus crías. Puedes contratar un Monstruo o Titán a precio Chollo (Bargain, -25%)."
        }
      },
      {
        "code": "3/3",
        "name": "Friendly Village",
        "nombre_es": "Pueblo Amigable",
        "descripcion": "Un asentamiento poblado por miembros de vuestra misma raza.",
        "resultados": {
          "1-2": "Bienvenida fría y desconfiada. Los personajes contratados de tu facción en el siguiente Capítulo serán Caros (Pricey, +25%).",
          "3-4": "Reacción neutral. Los personajes contratados estarán a su precio normal.",
          "5-6": "Cálida bienvenida. Los personajes contratados de tu facción en el siguiente Capítulo estarán a precio Chollo (Bargain, -25%)."
        }
      },
      {
        "code": "3/4",
        "name": "Gremlin Cavern",
        "nombre_es": "Caverna Gremlin",
        "descripcion": "Un agujero en el suelo rodeado de símbolos toscos: la guarida de unos Gremlins.",
        "resultados": {
          "1-2": "Secuestran a tu Comandante. Pierdes 1 Token de Arcanita o 50 GP del Cofre para rescatarlo.",
          "3-4": "El agujero está desocupado y pasáis de largo sin incidentes.",
          "5-6": "Los Gremlins salen pero se hacen amigos tras compartir comida. Puedes contratar cualquier personaje Gremlin a precio Chollo (Bargain)."
        }
      },
      {
        "code": "3/5",
        "name": "Fortified Town",
        "nombre_es": "Pueblo Fortificado",
        "descripcion": "Un asentamiento aislado con altas murallas y dos guardias aburridos.",
        "resultados": {
          "1-2": "Pelea con los guardias y soborno para no ser arrestados. Pierdes 20 GP del Cofre.",
          "3-4": "Los guardias no tienen tiempo y os echan sin más.",
          "5-6": "Intimidados por vuestra banda, lanzan una bolsa de oro desde la muralla pidiendo que los dejéis en paz. Ganas 20 GP."
        }
      },
      {
        "code": "3/6",
        "name": "Beast Den",
        "nombre_es": "Madriguera de Bestias",
        "descripcion": "Un nido de bestias salvajes oculto en el hueco de un gran árbol caído.",
        "resultados": {
          "1-2": "Las bestias atacan defendiendo su hogar. Cada personaje del Campamento pierde 1 HP para la siguiente partida.",
          "3-4": "Guisado de bestia. Añade D6 'Beast Stew' (objeto de 0 GP que cura D3 HP) al Cofre.",
          "5-6": "Bestias hambrientas receptivas al adiestramiento. Puedes contratar Bestias del Bestiario a precio Chollo (Bargain)."
        }
      },
      {
        "code": "4/1",
        "name": "Abandoned Castle",
        "nombre_es": "Castillo Abandonado",
        "descripcion": "El patio de un palacete en ruinas con spires altas y aura de pavor.",
        "resultados": {
          "1-2": "Guarida de un poderoso Vampiro. Cada personaje empieza la siguiente partida con -D6 HP.",
          "3-4": "Castillo desierto con buen armamento antiguo. Añade un 'Fine Two-Handed Weapon', 'Fine Spear' y 'Fine Ranged Weapon' al Cofre.",
          "5-6": "Banquete glamuroso offered por un Vampiro. En la siguiente partida cada personaje puede curarse D3 HP una vez."
        }
      },
      {
        "code": "4/2",
        "name": "Blacksmith's Forge",
        "nombre_es": "Fragua de la Herrante",
        "descripcion": "Una herreria en las afueras con una enorme Beastfolk manchada de hollín.",
        "resultados": {
          "1-2": "Revisa vuestras armas y se le rompen en las manos. Elimina 3 armas de tu Cofre de Campaña.",
          "3-4": "Se ríe de vuestro equipo y ofrece mejorarlo. Cualquier arma del Cofre puede hacerse 'Fine' por +50% de su coste.",
          "5-6": "Crea una hoja nueva de excelente calidad. Elige un arma de la Armería Común: es 'Fine' y otorga +2 Power en lugar de +1."
        }
      },
      {
        "code": "4/3",
        "name": "Traitor's Den",
        "nombre_es": "Guarida de Traidores",
        "descripcion": "Un grupo de desertores de una facción rival dispuestos a unirse por oro.",
        "resultados": {
          "1-2": "Desertores cautelosos. Puedes contratar cualquier personaje de la facción de otro jugador de la campaña, pero será Caro (Pricey).",
          "3-4": "Desertores dispuestos a luchar. Puedes contratar cualquier personaje de otra facción a su precio normal.",
          "5-6": "Desertores buscando venganza. Puedes contratar cualquier personaje de la facción de otro jugador a precio Chollo (Bargain)."
        }
      },
      {
        "code": "4/4",
        "name": "Ourk Brewery",
        "nombre_es": "Destilería Ourk",
        "descripcion": "Una choza de la que salen vapores nocivos y un laberinto de tuberías de cobre.",
        "resultados": {
          "1-2": "Tropiezo con una botella y explosión. Pierdes 50 GP del Cofre para pagar los daños.",
          "3-4": "Cerveza famosa. Puedes comprar 'Swamp Scrumpy' a precio Caro (Pricey).",
          "5-6": "Oferta fantástica. Puedes comprar 'Swamp Scrumpy' a precio Chollo (Bargain) y tu Comandante empieza la partida bajo sus efectos."
        }
      },
      {
        "code": "4/5",
        "name": "Military Outpost",
        "nombre_es": "Puesto Militar Imperial",
        "descripcion": "Un puesto de avanzada imperial que parece abandonado.",
        "resultados": {
          "1-2": "Un sargento os descubre pero acepta un soborno. Pierdes 10 GP del Cofre.",
          "3-4": "Lugar desierto con cofre de armas. Añade un 'Arcloque Rifle' al Cofre de Campaña.",
          "5-6": "Encontráis a un prisionero de vuestra facción y lo liberáis. Añade un personaje de clase 'Unit' gratis a tu Campamento (repite fallos contra Imperiales)."
        }
      },
      {
        "code": "4/6",
        "name": "Arcanite Mine",
        "nombre_es": "Mina de Arcanita",
        "descripcion": "Una mina de pozo profundo con un resplandor azul en su interior.",
        "resultados": {
          "1-2": "Caída en el foso. Haz una Tirada de Lesión (Injury Roll) para un personaje 'Unit' del Campamento.",
          "3-4": "Mina casi vacía. Añade 1 Token de Arcanita al Cofre de Campaña.",
          "5-6": "Mineros muertos y arcanita intacta. Añade 6 'Cursed Arcanite Tokens' al Cofre (causan D3 Hits al personaje si se usan)."
        }
      },
      {
        "code": "5/1",
        "name": "Trouble at 'Mill",
        "nombre_es": "Problemas en el Molino",
        "descripcion": "Un molino de Halflings atacado que pide ayuda a gritos.",
        "resultados": {
          "1-2": "Pasáis de largo sin involucraros.",
          "3-4": "Defendéis el molino y el molinero os invita a cenar. Al inicio de la siguiente partida, elige un hechizo del libro de cocina 'Bulbo Chubb's Cookbook' y aplica sus efectos a toda la banda.",
          "5-6": "Ganáis el respeto de la aldea. Puedes contratar cualquier personaje de la facción Halfling a precio Chollo (Bargain)."
        }
      },
      {
        "code": "5/2",
        "name": "Wizard's Tower",
        "nombre_es": "Torre del Mago",
        "descripcion": "Una torre en ruinas donde un mago cascarrabias protesta por ser molestado.",
        "resultados": {
          "1-2": "Rayo mágico transformador. Un personaje 'Unit' de tu Campamento es convertido permanentemente en Griffling.",
          "3-4": "Os alejáis de puntillas sin hacer ruido.",
          "5-6": "El mago os invita a su biblioteca. Puedes contratar cualquier personaje de la facción Mago (Wizards) a precio Chollo (Bargain)."
        }
      },
      {
        "code": "5/3",
        "name": "Sacred Tree",
        "nombre_es": "Árbol Sagrado",
        "descripcion": "Un árbol gigantesco con runas arcanas pintadas y una voz incorpórea que pide dar la vuelta.",
        "resultados": {
          "1-2": "Lluvia de flechas por ignorar la advertencia. Cada personaje del Campamento pierde 3 HP para la siguiente partida.",
          "3-4": "Os retrocedéis con cautela.",
          "5-6": "Una espada de bronce incrustada en el tronco os llama. Añade una 'Faeblade' al Cofre de Campaña."
        }
      },
      {
        "code": "5/4",
        "name": "Hermit's Cave",
        "nombre_es": "Cueva del Ermitaño",
        "descripcion": "Un anciano en una cueva riendo y hablando incoherencias.",
        "resultados": {
          "1-2": "Os burláis del anciano y desaparece en humo. En tu siguiente tirada de Aventuras Intermedias, obtienes automáticamente el resultado 1-2.",
          "3-4": "Saludáis con cautela. En tu siguiente tirada de Aventuras Intermedias, obtienes automáticamente el resultado 3-4.",
          "5-6": "Compartís comida. El ermitaño os regala una baratija: puedes cambiar el resultado de una aventura intermedia futura por la opción 5-6."
        }
      },
      {
        "code": "5/5",
        "name": "Troggle Den",
        "nombre_es": "Madriguera Troggle",
        "descripcion": "Un montón de basura apestosa y huesos: ¡una guarida de Troggles!",
        "resultados": {
          "1-2": "Los Troggles atacan creyendo que robáis su basura. Cada personaje pierde 1 HP para la siguiente partida.",
          "3-4": "Encontráis monedas en la basura. Añade 5D6 GP al Cofre de Campaña.",
          "5-6": "Alimentáis a las criaturas y os siguen alegres. Añade 3 Troggles a tu Campamento."
        }
      },
      {
        "code": "5/6",
        "name": "Travelling Troupe",
        "nombre_es": "Compañía Cómica Itinerante",
        "descripcion": "Una tropa de Beastfolk bailando al ritmo de gaitas de Warbards.",
        "resultados": {
          "1-2": "Ruido ensordecedor. Debes repetir cualquier Proeza (Feat) que involucre escuchar u oír órdenes en la siguiente partida.",
          "3-4": "Os hacen burlas. Todos los personajes del Campamento sufren -1 a Valentía (Bravery) para la siguiente partida.",
          "5-6": "Unirse a la fiesta. Puedes contratar cualquier personaje Beastfolk a precio Chollo (Bargain) para tu Campamento."
        }
      },
      {
        "code": "6/1",
        "name": "Doppelganger",
        "nombre_es": "El Doppelgänger",
        "descripcion": "Tu Comandante ha sido reemplazado por una criatura horrenda con su forma.",
        "resultados": {
          "1-2": "Doppelgänger hostil. En la siguiente partida, el Comandante actúa como personaje Feral y ve a tu propia banda como enemigos.",
          "3-4": "Doppelgänger impredecible. Actúa como personaje Feral y ve al oponente como enemigo.",
          "5-6": "Doppelgänger simpático. El Comandante actúa con normalidad; al final se rescata al verdadero atado en un seto sin daños."
        }
      },
      {
        "code": "6/2",
        "name": "Witch's Hut",
        "nombre_es": "Cabaña de la Bruja",
        "descripcion": "Una choza con patas de pato invita al Comandante a tomar un té.",
        "resultados": {
          "1-2": "Rechazas la invitación. Durante el siguiente Capítulo, todas las tiradas que realice el Comandante tienen un penalizador de -1.",
          "3-4": "Aceptas educadamente y tomáis un té agradable.",
          "5-6": "Compartís un manjar. La bruja queda encantada: durante el siguiente Capítulo, todas las tiradas del Comandante obtienen un bonificador de +1."
        }
      },
      {
        "code": "6/3",
        "name": "Treasure Trove",
        "nombre_es": "Tesoro Escondido",
        "descripcion": "Caída por un falso suelo hasta un gran tesoro resplandeciente.",
        "resultados": {
          "1-2": "Trampa mortal al tocar el tesoro. Personajes por valor de 100 GP quedan eliminados permanentemente, pero ganas 6 Tokens de Arcanita.",
          "3-4": "Parte del tesoro era falso. Ganas 1D6 Tokens de Arcanita divididos a la mitad.",
          "5-6": "Gran hallazgo. Ganas 2D6 Tokens de Arcanita directos al Cofre."
        }
      },
      {
        "code": "6/4",
        "name": "Elven Temple",
        "nombre_es": "Templo Élfico",
        "descripcion": "Un templo antiguo de piedra con un portal de luz de azur que cobra vida.",
        "resultados": {
          "1-2": "Colapso inestable del portal. Pierdes D3 Tokens de Arcanita del Cofre.",
          "3-4": "Portal estable. Elige hasta 3 personajes del Campamento: en la siguiente partida puedes desplegarlos en cualquier borde del tablero al inicio de una ronda.",
          "5-6": "Portal perfecto. Toda la banda puede desplegarse en cualquier lugar del tablero (incluso en la zona de despliegue enemiga)."
        }
      },
      {
        "code": "6/5",
        "name": "Forgotten Tomb",
        "nombre_es": "Tumba Olvidada",
        "descripcion": "Un túmulo funerario ancestral cubierto de inscripciones y tallas.",
        "resultados": {
          "1-2": "Un Barrow Wight se alza furioso. Cada personaje del Campamento pierde D3 HP para la siguiente partida.",
          "3-4": "Personajes perdidos en la oscuridad. Personajes por valor de 100 GP no se pueden desplegar en el siguiente Capítulo, pero ganan 1D6 Arcanitas en el posterior.",
          "5-6": "Sarcófago de piedra con un rey antiguo. Encuentras un objeto milagroso: ganas 1 Artefacto Legendario (Fabled Artefact)."
        }
      },
      {
        "code": "6/6",
        "name": "The Explorer",
        "nombre_es": "El Explorador",
        "descripcion": "Un aventurero exhausto pide cobijo en vuestra fogata sosteniendo un gran libro.",
        "resultados": {
          "1-2": "Rechazáis al extraño. Uno de tus oponentes añade a 'The Explorer and the Enchanted Journal' a su Campamento.",
          "3-4": "Aceptáis al extraño. Puedes contratar a 'The Explorer and the Enchanted Journal' para la siguiente partida al 25% de su coste.",
          "5-6": "Lazos de amistad. Añades a 'The Explorer and the Enchanted Journal' permanentemente a tu Campamento gratis."
        }
      }
    ],
    "artefactos_legendarios": [
      {
        "id": "bloodoak_armour",
        "nombre": "Armadura de Roble Sangriento / Bloodoak Armour",
        "etiqueta": "Artefacto Legendario (Equipo)",
        "resumen": "Armadura hecha de corteza dura como el hierro que se repara absorbiendo la salud del usuario.",
        "detalles": "Efectos: Cuenta como Armadura Pesada. Si la armadura resulta dañada o rota de alguna forma, se repara instantáneamente.",
        "restriccion": "Por cada punto de armadura recuperado, el portador pierde 2 HP."
      },
      {
        "id": "hex_pistols",
        "nombre": "Pistolas Místicas / Hex Pistols",
        "etiqueta": "Artefacto Legendario (Equipo)",
        "resumen": "Par de pistolas Arcloque malditas cuyos proyectiles buscan certeramente a sus víctimas.",
        "detalles": "Efectos: Otorga un ataque a distancia con Alcance 12\" y Power 16. Los disparos nunca sufren Desventaja.",
        "restriccion": "Si en la tirada hay más Fallos que Éxitos, el usuario sufre tantos Impactos (Hits) como Fallos haya obtenido."
      },
      {
        "id": "vitality_stone",
        "nombre": "Piedra de Vitalidad / Vitality Stone",
        "etiqueta": "Artefacto Legendario (Objeto)",
        "resumen": "Amuleto esculpido que permite almacenar energía de acción para usarla posteriormente.",
        "detalles": "Efectos: Los Puntos de Acción (AP) no gastados en una activación pueden 'guardarse' y consumirse en otra activación posterior. Si el portador cae Noqueado, deja un marcador y cualquier personaje puede usar esos AP para Hazañas.",
        "restriccion": "Si se falla una Hazaña usando los AP almacenados, el personaje pierde tantos HP como AP había acumulados."
      },
      {
        "id": "griffling_boots",
        "nombre": "Botas de Griffling / Griffling Boots",
        "etiqueta": "Artefacto Legendario (Objeto)",
        "resumen": "Botas mágicas que otorgan una velocidad y capacidad de salto sobrehumanas.",
        "detalles": "Efectos: Duplica el atributo de Movimiento del portador y le otorga el rasgo Vuelo (Fly).",
        "restriccion": "Si el portador falla una tirada de Leg It, sufre D6 Hits tras quedar Tumbado (Prone)."
      },
      {
        "id": "the_completely_harmless_and_normal_ring",
        "nombre": "El Anillo Completamente Normal e Inofensivo / The Completely Harmless and Normal Ring",
        "etiqueta": "Artefacto Legendario (Objeto)",
        "resumen": "Anillo de oro en apariencia insignificante que vuelve invisible a quien lo porta.",
        "detalles": "Efectos: Otorga el rasgo Inconspicuo/Invisibilidad (Invisible). El portador no puede ser objetivo de ataques a distancia y puede destrabarse del combate cuerpo a cuerpo sin penalización.",
        "restriccion": "Si el portador resulta Tumbado (Prone), cualquier personaje en contacto de peana puede intentar robarle el anillo con una Hazaña Fácil."
      },
      {
        "id": "the_eldritch_wand",
        "nombre": "Varita Arcana / The Eldritch Wand",
        "etiqueta": "Artefacto Legendario (Objeto)",
        "resumen": "Varita de madera traslúcida que concede un gran control sobre el robo de magia.",
        "detalles": "Efectos: Un Mago puede descartar una carta de su mano al lanzar un hechizo, devolverla al mazo y robar otra.",
        "restriccion": "Cada vez que un Mago usa esta habilidad pierde 1 HP. Si la sostiene un personaje no Mago, pierde inmediatamente D6 HP."
      },
      {
        "id": "resurrection_coin",
        "nombre": "Moneda de Resurrección / Resurrection Coin",
        "etiqueta": "Artefacto Legendario (Objeto)",
        "resumen": "Moneda de oro antiguo que impide que su poseedor muera del todo.",
        "detalles": "Efectos: Cuando el portador se reduce a 0 HP, se lanza una moneda: si sale Cara, recupera 3 HP; si sale Cruz, recupera 1 HP pero queda Tumbado (Prone).",
        "restriccion": "Aplica solo en el momento de ser reducido a 0 HP."
      },
      {
        "id": "euphimias_box",
        "nombre": "La Caja de Eufimia / Euphimia's Box",
        "etiqueta": "Artefacto Legendario (Objeto)",
        "resumen": "Reliquia legendaria que libera una explosión devastadora al ser abierta.",
        "detalles": "Efectos: Al abrirse, todos los personajes a 6\" o menos deben superar una Hazaña Difícil o sufrir 2D6 Hits.",
        "restriccion": "Un solo uso. Una vez abierta, pierde todo su poder."
      },
      {
        "id": "blade_of_the_sacred_viper",
        "nombre": "Hoja de la Víbora Sagrada / Blade of the Sacred Viper",
        "etiqueta": "Artefacto Legendario (Equipo)",
        "resumen": "Arma impregnada con un veneno recurrente y mortal que se multiplica progresivamente.",
        "detalles": "Efectos: Si causa daño, la víctima debe superar una Hazaña Fácil o sufrir 1 Hit extra. Si falla, al final de su siguiente activación debe superar una Hazaña Fácil o sufrir 2 Hits (se duplican los impactos cada activación consecutiva que falle).",
        "restriccion": "Si el portador no envenena a nadie durante una ronda entera, pierde D3 HP por la venganza de la víbora."
      },
      {
        "id": "axe_of_frost",
        "nombre": "Hacha de Escarcha / Axe of Frost",
        "etiqueta": "Artefacto Legendario (Equipo)",
        "resumen": "Arma antigua de Njorsvald que congela e inmoviliza a las víctimas.",
        "detalles": "Efectos: Si inflige daño, el objetivo queda congelado e inmovilizado. Para liberarse debe superar una Hazaña Fácil (o no podrá moverse esa activación).",
        "restriccion": "Si la víctima sufre daño adicional del hacha antes de liberarse, la Hazaña requerida pasa a ser de dificultad Media."
      },
      {
        "id": "the_chalice_of_blood",
        "nombre": "El Cáliz de Sangre / The Chalice of Blood",
        "etiqueta": "Artefacto Legendario (Objeto)",
        "resumen": "Cáliz de oro y rubíes que otorga vitalidad física y vitalidad de acción instantáneas a cambio de adicción.",
        "detalles": "Efectos: El portador puede beber del cáliz con una Hazaña Fácil para recuperar D6 HP y D6 AP en esa ronda.",
        "restriccion": "Durante el resto de la partida, en cada ronda en que no beba del cáliz perderá D6 HP al final de su activación."
      },
      {
        "id": "crown_of_the_vauhaemi",
        "nombre": "Corona de los Vauhaemi / Crown of the Vauhaemi",
        "etiqueta": "Artefacto Legendario (Objeto)",
        "resumen": "Corona antigua que permite invocar guerreros esqueléticos para que sirvan al usuario.",
        "detalles": "Efectos: Al final de su activación, el portador puede invocar 1 Skelt aliado por ronda, el cual puede activarse inmediatamente después.",
        "restriccion": "Limitado a 1 Skelt invocado por ronda."
      },
      {
        "id": "silver_bolts",
        "nombre": "Proyectiles de Plata / Silver Bolts",
        "etiqueta": "Artefacto Legendario (Objeto)",
        "resumen": "Munición bendecida extremadamente mortífera contra no-muertos.",
        "detalles": "Efectos: Los ataques a distancia del portador causan +D6 Hits adicionales contra personajes No-Muertos (Undead).",
        "restriccion": "Tras cada disparo debe tirarse 1D6: si sale un 1, la munición se agota por completo."
      },
      {
        "id": "cloak_of_night",
        "nombre": "Capa de la Noche / Cloak of Night",
        "etiqueta": "Artefacto Legendario (Objeto)",
        "resumen": "Manto de seda negra que difumina la silueta del usuario en la oscuridad.",
        "detalles": "Efectos: Todos los disparos y ataques a distancia realizados contra el portador sufren Desventaja. Si el portador se encuentra en Cobertura (Cover), no puede ser seleccionado como objetivo de disparos.",
        "restriccion": "Aplica a ataques a distancia."
      },
      {
        "id": "amulet_of_daylight",
        "nombre": "Amuleto de Luz Solar / Amulet of Daylight",
        "etiqueta": "Artefacto Legendario (Objeto)",
        "resumen": "Joya deslumbrante capaz de reflejar un destello solar cegador.",
        "detalles": "Efectos: Mediante una Hazaña Fácil, el usuario ciega a todos los personajes en un radio de 4\" durante el resto de la ronda. Los personajes cegados realizan todos sus ataques a Desventaja.",
        "restriccion": "Ciega tanto a enemigos como a aliados en el área."
      },
      {
        "id": "arcronomicon",
        "nombre": "Arcronomicón / Arcronomicon",
        "etiqueta": "Artefacto Legendario (Objeto)",
        "resumen": "Tomo maldito de nigromancia capaz de resucitar a los caídos.",
        "detalles": "Efectos: El portador puede sacrificar todos sus AP para resucitar a un personaje caído en contacto de peana con la mitad de sus HP máximos.",
        "restriccion": "El personaje resucitado pasa a contar como No-Muerto (Undead) durante el resto de la partida/campaña."
      }
    ]
  }
};

// Alias global de acceso rápido
const datosMinis = compendioArcWorlde;
const datosRasgos = compendioArcWorlde.diccionario_rasgos;
const campanaArcWorlde = compendioArcWorlde.sistema_campana;

// Exportación modular para Node.js y Entornos Web
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { compendioArcWorlde, datosMinis, datosRasgos, campanaArcWorlde };
} else {
  window.compendioArcWorlde = compendioArcWorlde;
  window.datosMinis = compendioArcWorlde;
  window.datosRasgos = compendioArcWorlde.diccionario_rasgos;
  window.campanaArcWorlde = compendioArcWorlde.sistema_campana;
}
