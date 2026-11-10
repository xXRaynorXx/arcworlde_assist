// ============================================================================
// BASE DE DATOS MAESTRA COMPLETA DE ARCWORLDE (VERSIÓN CONSOLIDADA 8.0)
// Contiene: Todas las Facciones, Miniaturas/Atributos, Ataques, Hechizos,
// Armería Exclusiva (con los 13 objetos restaurados) y Común, Diccionario de Rasgos y Sistema de Campaña Completo.
// ============================================================================

const compendioArcWorlde = {
  "version": "8.0",
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
          "id": "halfling_sheriff",
          "nombre": "Sheriff Halfling",
          "nombre_en": "Halfling Sheriff",
          "clase": "commander",
          "coste": 80,
          "peana_mm": 30,
          "stats": {
            "hp": 10,
            "mov": 4,
            "armadura": 1,
            "ap": 4
          },
          "ataques": [
            "(2 AP) Furious Wallop: Power 8. Special Rules: If a Critical Hit is rolled, reduce the target Character's AP by 1 for their next Activation. This does not stack.",
            "(1 AP) Hearty Stab: Power 5. Special Rules: Critical Hits ignore Armour"
          ],
          "rasgos": [
            "Light Armour",
            "Make Orders",
            "Rousing Cheer"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [
            "packed_lunch",
            "halfling_ranged_weapon",
            "town_banner",
            "halfling_mount",
            "ranger_cloak"
          ],
          "equipo_de_serie": [
            "Armadura Ligera / Light Armour"
          ],
          "hechizos": []
        },
        {
          "id": "halfling_battle_cook",
          "nombre": "Cocinero de Batalla Halfling",
          "nombre_en": "Halfling Battle Cook",
          "clase": "mage",
          "coste": 80,
          "peana_mm": 30,
          "stats": {
            "hp": 9,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(2 AP) Spoon Whack: Power 5. Special Rules: If a Critical Hit is rolled, reduce the target Character's AP by 1 for their next Activation. This does not stack."
          ],
          "rasgos": [
            "Make Orders"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "potbelly_cauldron",
            "packed_lunch",
            "halfling_ranged_weapon",
            "town_banner",
            "ranger_cloak"
          ],
          "equipo_de_serie": [],
          "hechizos": [
            "Hearty Veggie Soup (Exige 14): One friendly Character within 6\" regains 3 HP.",
            "Marvellous Mutton Stew (Exige 16): One friendly Character within 6\" may re-roll a single failed Leg It roll this Round.",
            "Bullox Burgers (Exige 17): One friendly Character within 6\" may re-roll all failed Defence rolls until its next Activation.",
            "Cocklegriff Madras (with rice and naan) (Exige 20): One friendly Character within 6” gains the Fired Up Attack until the end of the Round: (1 AP) Fired Up: Power 8. Special Rules: +1 Power against Flammable targets.",
            "Mystery Meat Surprise (Exige 21): Choose two different Spells from this list and apply them to the same Character."
          ]
        },
        {
          "id": "halfling_militia",
          "nombre": "Milicia Halfling",
          "nombre_en": "Halfling Militia",
          "clase": "unit",
          "coste": 40,
          "peana_mm": 30,
          "stats": {
            "hp": 6,
            "mov": 4,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(2 AP) Twhack: Power 6. Special Rules: A Critical Hit allows the player to re-roll 1 failed Hit.",
            "(1 AP) Thrust: Power 4"
          ],
          "rasgos": [
            "Take Orders"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "packed_lunch",
            "halfling_ranged_weapon",
            "town_banner",
            "halfling_mount",
            "ranger_cloak"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "halfling_town_guard",
          "nombre": "Guardia del Pueblo Halfling",
          "nombre_en": "Halfling Town Guard",
          "clase": "elite",
          "coste": 70,
          "peana_mm": 30,
          "stats": {
            "hp": 7,
            "mov": 4,
            "armadura": 2,
            "ap": 3
          },
          "ataques": [
            "(2 AP) Determined Hack: Power 7. Special Rules: A Critical Hit breaks 1 Armour.",
            "(1 AP) Chop: Power 4"
          ],
          "rasgos": [
            "Take Orders",
            "Heavy Armour",
            "Bodyguard"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "packed_lunch",
            "halfling_ranged_weapon",
            "town_banner",
            "halfling_mount",
            "ranger_cloak"
          ],
          "equipo_de_serie": [
            "Armadura Pesada / Heavy Armour"
          ],
          "hechizos": []
        },
        {
          "id": "halfling_thing_flinger",
          "nombre": "Lanza-Cosas Halfling",
          "nombre_en": "Halfling Thing-Flinger",
          "clase": "heavy",
          "coste": 200,
          "peana_mm": 60,
          "stats": {
            "hp": 20,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(2 AP) Trample: Power 4. Special Rules: If a Critical Hit is rolled, the target Character is Prone and the Thing-Flinger may move out of combat without any penalties.",
            "(Ranged) And…FIRE!: Power 10. Special Rules: 20” range. Requires a Hard Feat to Shoot."
          ],
          "rasgos": [
            "Flammable",
            "Crew",
            "Random Payload"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "packed_lunch",
            "town_banner",
            "ranger_cloak"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "halfling_monster_hunter",
          "nombre": "Cazador de Monstruos Halfling",
          "nombre_en": "Halfling Monster Hunter",
          "clase": "irregular",
          "coste": 60,
          "peana_mm": 30,
          "stats": {
            "hp": 6,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(2 AP) Cunning Thrust: Power 6. Special Rules: Re-roll all failed Hits against Monsters or Titans. These cannot be re-rolled again"
          ],
          "rasgos": [],
          "max_por_banda": null,
          "equipo_permitido": [
            "packed_lunch",
            "ranger_cloak",
            "halfling_ranged_weapon",
            "town_banner"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "trollhound",
          "nombre": "Sabueso de Trolls",
          "nombre_en": "Trollhound",
          "clase": "beast",
          "coste": 35,
          "peana_mm": 30,
          "stats": {
            "hp": 6,
            "mov": 6,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(1 AP) Bite: Power 5"
          ],
          "rasgos": [
            "Agile",
            "Pack Hunter",
            "Cling On"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
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
      ],
      "saberes_magicos": [
        {
          "saber": "El Gran Libro de Cocina / Grand Cookbook of Bulbo Chubb",
          "hechizos": [
            {
              "nombre": "Sopa de Verduras / Hearty Veggie Soup",
              "exige": 14,
              "ap": 1,
              "alcance": "6\"",
              "efecto": "Sana 3 HP a un personaje aliado a 6\" o menos."
            },
            {
              "nombre": "Estofado de Oveja / Marvellous Mutton Stew",
              "exige": 16,
              "ap": 1,
              "alcance": "6\"",
              "efecto": "Un aliado a 6\" puede repetir todas las tiradas de Leg It durante la Ronda."
            },
            {
              "nombre": "Curry Cocklegriff Madras / Cocklegriff Madras",
              "exige": 20,
              "ap": 1,
              "alcance": "6\"",
              "efecto": "Otorga el ataque Fired Up (1AP, Power 8, +1 vs Flammable) a un aliado a 6\" hasta el final de la ronda."
            },
            {
              "nombre": "Sorpresa de Carne Misteriosa / Mystery Meat Surprise",
              "exige": 21,
              "ap": 2,
              "alcance": "6\"",
              "efecto": "Otorga +2 AP y cura D6 HP a un personaje aliado a 6\" o menos."
            }
          ]
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
          "clase": "commander",
          "coste": 80,
          "peana_mm": 30,
          "stats": {
            "hp": 10,
            "mov": 4,
            "armadura": 1,
            "ap": 4
          },
          "ataques": [
            "(2 AP) Riposte: Power 8. Special Rules: If this Attack removes HP, the next Character who attempts to Attack the Captain must pass an Easy Feat or lose 1HP.",
            "(1 AP) Slash: Power 5. Special Rules: Critical Hits ignore Armour"
          ],
          "rasgos": [
            "Light Armour",
            "Make Orders",
            "Leaders of Men"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [
            "imperial_mount",
            "medical_kit",
            "imperial_crossbow",
            "imperial_gryphon",
            "arcloque_rifle",
            "arcloque_pistol"
          ],
          "equipo_de_serie": [
            "Armadura Ligera / Light Armour"
          ],
          "hechizos": []
        },
        {
          "id": "imperial_trooper",
          "nombre": "Soldado Raso Imperial",
          "nombre_en": "Imperial Trooper",
          "clase": "unit",
          "coste": 40,
          "peana_mm": 30,
          "stats": {
            "hp": 6,
            "mov": 4,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(2 AP) Heavy Strike: Power 6. Special Rules: A Critical Hit allows the player to re-roll 1 failed Hit.",
            "(1 AP) Thrust: Power 4"
          ],
          "rasgos": [
            "Take Orders"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "imperial_mount",
            "medical_kit",
            "imperial_crossbow",
            "arcloque_rifle",
            "sergeants_chevrons"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "imperial_dragoon",
          "nombre": "Dragón Imperial",
          "nombre_en": "Imperial Dragoon",
          "clase": "elite",
          "coste": 65,
          "peana_mm": 30,
          "stats": {
            "hp": 7,
            "mov": 4,
            "armadura": 1,
            "ap": 3
          },
          "ataques": [
            "(2 AP) Keen Slice: Power 7. Special Rules: A Critical Hit allows the player to re-roll 1 failed Hit.",
            "(1 AP) Downswing: Power 4. Special Rules: If this Character is mounted, re-roll all failed Hits against Targets on 30mm bases."
          ],
          "rasgos": [
            "Take Orders",
            "Light Armour",
            "Mounted Specialist"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "imperial_mount",
            "medical_kit",
            "imperial_crossbow",
            "arcloque_pistol",
            "arcloque_rifle"
          ],
          "equipo_de_serie": [
            "Armadura Ligera / Light Armour"
          ],
          "hechizos": []
        },
        {
          "id": "imperial_tinkerer",
          "nombre": "Hojalatero Imperial",
          "nombre_en": "Imperial Tinkerer",
          "clase": "mage",
          "coste": 80,
          "peana_mm": 30,
          "stats": {
            "hp": 9,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(2 AP) Spanner Whack: Power 5"
          ],
          "rasgos": [
            "Contraption Trunk"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "medical_kit",
            "arcloque_pistol"
          ],
          "equipo_de_serie": [],
          "hechizos": [
            "Mechanical Griffling (Exige 14): Place a Griffling (see Bestiary) in base contact with the Tinkerer that is Activated immediately after the Tinkerer’s Activation has ended. This Spell may only be used again if the Mechanical Griffling has been Knocked Out.",
            "Revolving Pistol (Exige 16): The Tinkerer may make this Attack: (Ranged) Revolving Pistol - Power: 5. Special Rules: 8” range. Roll another D6 for each Successful Hit.",
            "Arcane Shielding (Exige 17): For the rest of the Round, any Character within 2” of the Tinkerer gains +1 Armour for Attacks made by Characters outside of this area.",
            "Homing Bullet (Exige 20): Once this Spell has been cast, in their Activation a single Character in base contact with the Tinkerer may make a single Ranged Attack that ignores cover and automatically passes its Feat roll for free.",
            "Magic Gobbler (Exige 21): Until the Tinkerer’s next Activation, every time an enemy Character successfully casts a Spell, roll a D6. On a Success the Spell is not cast and the Tinkerer gains an Arcanite Token."
          ]
        },
        {
          "id": "imperial_arclancer",
          "nombre": "Arcalancero Imperial",
          "nombre_en": "Imperial Arclancer",
          "clase": "irregular",
          "coste": 60,
          "peana_mm": 30,
          "stats": {
            "hp": 6,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(1 AP) Arclance: Power 6. Special Rules: Any failed Hits against the target are dealt as Hits to an enemy Character within 3” of the target."
          ],
          "rasgos": [
            "Take Orders",
            "Arclance"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "medical_kit"
          ],
          "equipo_de_serie": [
            "Arclance"
          ],
          "hechizos": []
        },
        {
          "id": "imperial_ogre",
          "nombre": "Ogro Imperial",
          "nombre_en": "Imperial Ogre",
          "clase": "heavy",
          "coste": 160,
          "peana_mm": 60,
          "stats": {
            "hp": 16,
            "mov": 4,
            "armadura": 0,
            "ap": 5
          },
          "ataques": [
            "(2 AP) Clobber: Power 8. Special Rules: If a Critical Hit is made, and the target is on a 30 or 40mm base, the target Character becomes Prone.",
            "(1 AP) Big Boot: Power 5. Special Rules: +2 Power if the target is Prone."
          ],
          "rasgos": [
            "Take Orders",
            "Volley Gun"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "medical_kit",
            "volley_gun"
          ],
          "equipo_de_serie": [],
          "hechizos": []
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
          "id": "medical_kit",
          "faccion_id": "imperial",
          "faccion_nombre": "Imperiales",
          "nombre": "Botiquín Médico / Medical Kit",
          "tipo": "Objeto / Consumible",
          "coste": 10,
          "etiqueta": "Armería Imperial",
          "resumen": "Ungüentos, aceites y vendas para curar heridas de guerra.",
          "detalles": "Efectos: Un solo uso. Al consumirse, el personaje o un aliado en contacto de peana recupera D6 HP.",
          "restriccion": "Un solo uso (One use only)."
        },
        {
          "id": "imperial_crossbow",
          "faccion_id": "imperial",
          "faccion_nombre": "Imperiales",
          "nombre": "Ballesta Imperial / Imperial Crossbow",
          "tipo": "Equipo / Arma a Distancia",
          "coste": 15,
          "etiqueta": "Armería Imperial",
          "resumen": "Ballesta tradicional de acero empleada por veteranos imperiales.",
          "detalles": "Efectos: Otorga el ataque a distancia (Ranged) Shot: Power 5, Alcance 16\".",
          "restriccion": "Uso continuo mientras esté equipada."
        },
        {
          "id": "arcloque_rifle",
          "faccion_id": "imperial",
          "faccion_nombre": "Imperiales",
          "nombre": "Rifle Arcloque / Arcloque Rifle",
          "tipo": "Equipo / Arma de Pólvora Arcana",
          "coste": 20,
          "etiqueta": "Armería Imperial",
          "resumen": "Arma pesada de fuego de la invención del Gremio de Hojalateros.",
          "detalles": "Efectos: Otorga el ataque (Ranged) Shot: Power 8, Alcance 20\". Máximo 1 uso por activación. Si hay más fallos que éxitos al disparar, el tirador sufre 1 Hit que ignora armadura.",
          "restriccion": "Solo 1 disparo por activación."
        },
        {
          "id": "arcloque_pistol",
          "faccion_id": "imperial",
          "faccion_nombre": "Imperiales",
          "nombre": "Pistola Arcloque / Arcloque Pistol",
          "tipo": "Equipo / Arma de Pólvora Arcana",
          "coste": 15,
          "etiqueta": "Armería Imperial",
          "resumen": "Versión compacta del rifle para oficiales y dragones.",
          "detalles": "Efectos: Solo para Capitanes, Tinkerer y Dragoons. Otorga el ataque (Ranged) Shot: Power 7, Alcance 8\". 1 disparo por pistola por activación. Si fallos > éxitos, sufre 1 Hit sin armadura.",
          "restriccion": "Solo Captains, Tinkerers y Dragoons."
        },
        {
          "id": "imperial_gryphon",
          "faccion_id": "imperial",
          "faccion_nombre": "Imperiales",
          "nombre": "Estandarte del Grifo Imperial / Imperial Gryphon Standard",
          "tipo": "Objeto / Apoyo de Moral",
          "coste": 15,
          "etiqueta": "Armería Imperial",
          "resumen": "Figura de grifo niquelada sobre asta sagrada.",
          "detalles": "Efectos: Mientras la porte un personaje aliado, todos los aliados a 12\" o menos repiten Chequeos de Valentía fallidos.",
          "restriccion": "Portado por un personaje aliado."
        },
        {
          "id": "sergeants_chevrons",
          "faccion_id": "imperial",
          "faccion_nombre": "Imperiales",
          "nombre": "Galones de Sargento / Sergeant's Chevrons",
          "tipo": "Equipo / Mando",
          "coste": 10,
          "etiqueta": "Armería Imperial",
          "resumen": "Insignia de rango militar para liderar a las tropas de tropa.",
          "detalles": "Efectos: Solo para Troopers. Otorga +1 a Valentía y el rasgo Make Orders. Si toma una orden de un Capitán, puede emitir esa misma orden a otros Troopers en la misma activación.",
          "restriccion": "Solo equipable en Troopers."
        },
        {
          "id": "imperial_mount",
          "faccion_id": "imperial",
          "faccion_nombre": "Imperiales",
          "nombre": "Caballo de Guerra Imperial / Imperial Mount",
          "tipo": "Equipo / Montura",
          "coste": 30,
          "etiqueta": "Armería Imperial",
          "resumen": "Corcel de caballería o bestia local capturada.",
          "detalles": "Efectos: Solo para Captains, Troopers y Dragoons. Otorga +5 HP, +4 al Movimiento y el rasgo Ágil (Agile). Pasa a peana de 50mm.",
          "restriccion": "Captains, Troopers y Dragoons."
        }
      ],
      "saberes_magicos": [
        {
          "saber": "Inventos y Artilugios Arcanos / Tinkerer's Arcane Contraptions",
          "hechizos": [
            {
              "nombre": "Griffling Mecánico / Mechanical Griffling",
              "exige": 14,
              "ap": 2,
              "alcance": "Contacto",
              "efecto": "Despliega un Griffling de metal autómata en contacto de peana que se activa inmediatamente."
            },
            {
              "nombre": "Sobrecarga de Arcanita / Arcane Overcharge",
              "exige": 16,
              "ap": 1,
              "alcance": "6\"",
              "efecto": "Sobrecarga armas de pólvora o arcloque de aliados a 6\", otorgando +2 al Power en el siguiente disparo."
            },
            {
              "nombre": "Barrera de Autómatas / Automaton Shield",
              "exige": 18,
              "ap": 2,
              "alcance": "4\"",
              "efecto": "Despliega una barrera protectora de engranajes que otorga +1 de Armadura a todos los aliados a 4\"."
            }
          ]
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
            "(2 AP) Malicious Strike: Power 7. Regla Especial: Si se obtienen más Éxitos que Fallos, el objetivo (peana <= 50mm) queda Tumbado (Prone).",
            "(Ranged) Malevolent Gaze: Power 4, Alcance 6\".",
            "(1 AP) Choke: Power 5. Regla Especial: No se incrementa con armas equipadas. Si causa daño, los enemigos deben pasar un Chequeo de Valentía como si fuera KO."
          ],
          "rasgos": [
            "The Dark One's Will",
            "Split Activation",
            "Heavy Armour"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [
            "black_potion",
            "dark_lord_ranged_weapon",
            "slaver_whip"
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
            "(2 AP) Whipcrack: Power 6. Regla Especial: Puede objetivar enemigos hasta a 4\" de distancia.",
            "(1 AP) Brutish Slash: Power 4."
          ],
          "rasgos": [
            "Slavedriver"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "black_potion",
            "dark_lord_ranged_weapon",
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
            "(2 AP) Hack'n'Slash: Power 4. Regla Especial: Cada impacto Crítico permite tirar 1D6 adicional.",
            "(1 AP) Gut Stab: Power 3."
          ],
          "rasgos": [
            "Diminutive"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "black_potion",
            "dark_lord_ranged_weapon"
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
            "(Ranged) Flame Toss: Power 6, Alcance 8\". Regla Especial: Cada impacto Crítico inflige 1 impacto a un enemigo a 2\" o menos del objetivo.",
            "(1 AP) Firebrand: Power 4."
          ],
          "rasgos": [
            "Arson Around",
            "Diminutive"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "black_potion",
            "dark_lord_ranged_weapon"
          ],
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
            "(2 AP) Blazing Demise: Power 6. Regla Especial: Afecta a todos los personajes a 2\". El esbirro queda Noqueado tras la explosión.",
            "(1 AP) Nip: Power 3."
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
            "(2 AP) Swoop: Power 8. Regla Especial: Un impacto Crítico deja al objetivo Tumbado (Prone).",
            "(2 AP) Lift and Drop: Power 5. Regla Especial: Solo contra peanas de 30mm. En impacto Crítico desplaza a la víctima D6\".",
            "(1 AP) Fangs: Power 5."
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
      ],
      "saberes_magicos": [
        {
          "saber": "Saber de la Villanía / Lore of Villainy",
          "hechizos": [
            {
              "nombre": "Chillido Maligno / Sickly Screech",
              "exige": 14,
              "ap": 1,
              "alcance": "4\" Área",
              "efecto": "Cada personaje a 4\" tira D6; si falla, sufre -1 AP en su siguiente Activación."
            },
            {
              "nombre": "Aura Ominosa / Ominous Aura",
              "exige": 17,
              "ap": 1,
              "alcance": "Personal",
              "efecto": "El lanzador obtiene el rasgo Temible (Fearsome) hasta el final de la Ronda."
            },
            {
              "nombre": "Esbirros Inquietos / Restless Minions",
              "exige": 18,
              "ap": 2,
              "alcance": "6\"",
              "efecto": "Reanima a un esbirro Hobgoblin o Underling Noqueado a 6\", devolviéndolo al combate con 1 HP."
            },
            {
              "nombre": "Proyectil Oscuro / Dark Bolt",
              "exige": 20,
              "ap": 2,
              "alcance": "12\"",
              "efecto": "Ataque mágico a distancia Power 7 que ignora Armadura y Escudos."
            }
          ]
        }
      ]
    },
    {
      "id": "beastfolk",
      "nombre": "Hombres Bestia",
      "unidades": [
        {
          "id": "beastfolk_packmaster",
          "nombre": "Líder de la Camada Beastfolk",
          "nombre_en": "Beastfolk Packmaster",
          "clase": "commander",
          "coste": 120,
          "peana_mm": 40,
          "stats": {
            "hp": 14,
            "mov": 4,
            "armadura": 0,
            "ap": 5
          },
          "ataques": [
            "(2 AP) Bestial Rage: Power 8. Special Rules: Each Critical Hit allows one more D6 to be rolled.",
            "(1 AP) Mighty Kick: Power 5. Special Rules: If the Target is Prone, if there are more Successes than Failures, the Character is moved 3” in a direction chosen by the Beastfolk player.",
            "(1 AP) Gore: Power 5. Special Rules: Critical Hits break 1 Armour."
          ],
          "rasgos": [
            "Intimidating",
            "Animal Form"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [
            "cured_meat",
            "beastfolk_ranged_weapon",
            "protective_hide",
            "camouflaged_pelt",
            "ugly",
            "bestial_moxie",
            "horns_and_tusks",
            "long_legs",
            "monster_rider"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "beastfolk_hedgewitch",
          "nombre": "Bruja del Bosque Beastfolk",
          "nombre_en": "Beastfolk Hedgewitch",
          "clase": "mage",
          "coste": 90,
          "peana_mm": 30,
          "stats": {
            "hp": 8,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(1 AP) Staff Thump: Power 3"
          ],
          "rasgos": [
            "Animal Form",
            "Mysterious Herbs"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "cured_meat",
            "beastfolk_ranged_weapon",
            "protective_hide",
            "camouflaged_pelt",
            "ugly",
            "bestial_moxie",
            "horns_and_tusks",
            "long_legs",
            "monster_rider"
          ],
          "equipo_de_serie": [],
          "hechizos": [
            "Forest Creatures (Exige 14): The target Character and all Characters within 3” of them take 3 Hits.",
            "Warging (Exige 17): Once the caster has finished their Activation, nominate a friendly Beast on the board. They may immediately Activate, even if they have already done so this Round. Any Items or Equipment collected by the Beast are transferred to the caster at the end of its activation.",
            "Bestial Strength (Exige 19): This Spell may be cast on any Character that isn’t a Beast, Monster or Titan. The target gains +3 Power on any Melee Attacks until the caster chooses to cast another Spell.",
            "Shapeshift (Exige 21): Replace the caster with a Monster chosen from the Bestiary. The Monster has the same AP as the caster had remaining before the Shapeshift but is otherwise identical. At the end of the Round, the caster returns to their true form with the same amount of HP as they had when the Spell was cast."
          ]
        },
        {
          "id": "beastfolk_clanbeast",
          "nombre": "Guerrero del Clan Beastfolk",
          "nombre_en": "Beastfolk Clanbeast",
          "clase": "elite",
          "coste": 85,
          "peana_mm": 40,
          "stats": {
            "hp": 10,
            "mov": 4,
            "armadura": 0,
            "ap": 4
          },
          "ataques": [
            "(2 AP) Savage: Power 7. Special Rules: Each Critical Hit allows one more Hit to be rolled.",
            "(1 AP) Smash: Power 5. Special Rules: Critical Hits break 1 Armour."
          ],
          "rasgos": [
            "Intimidating",
            "Animal Form"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "cured_meat",
            "beastfolk_ranged_weapon",
            "protective_hide",
            "camouflaged_pelt",
            "ugly",
            "bestial_moxie",
            "horns_and_tusks",
            "long_legs",
            "monster_rider"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "beastfolk_verman",
          "nombre": "Verman Beastfolk",
          "nombre_en": "Beastfolk Verman",
          "clase": "unit",
          "coste": 30,
          "peana_mm": 30,
          "stats": {
            "hp": 5,
            "mov": 5,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(2 AP) Eager Attack: Power 7. Special Rules: If there are more Failures than Successes when rolling to Hit, the Verman loses D3HP afterwards.",
            "(1 AP) Stab: Power 3"
          ],
          "rasgos": [
            "Diminutive",
            "Animal Form",
            "Go Get’Em!"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "cured_meat",
            "beastfolk_ranged_weapon",
            "protective_hide",
            "camouflaged_pelt",
            "ugly",
            "bestial_moxie",
            "horns_and_tusks",
            "long_legs",
            "monster_rider"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "war_bard",
          "nombre": "Bardo de Guerra",
          "nombre_en": "War Bard",
          "clase": "irregular",
          "coste": 70,
          "peana_mm": 30,
          "stats": {
            "hp": 8,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(2 AP) Almighty Racket: Power 3. Special Rules: Every non-Beastfolk Character within 6” is affected by this Attack.",
            "(1 AP) Good Kickin’: Power 4"
          ],
          "rasgos": [
            "Animal Form",
            "Ballads of the Beastfolk"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "cured_meat",
            "beastfolk_ranged_weapon",
            "protective_hide",
            "camouflaged_pelt",
            "ugly",
            "bestial_moxie",
            "horns_and_tusks",
            "long_legs",
            "monster_rider"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "kelpie",
          "nombre": "Kelpie",
          "nombre_en": "Kelpie",
          "clase": "monster",
          "coste": 200,
          "peana_mm": 60,
          "stats": {
            "hp": 20,
            "mov": 6,
            "armadura": 0,
            "ap": 7
          },
          "ataques": [
            "(2 AP) Crunch: Power 8. Special Rules: If a Critical Hit is made, the target Character may not move out of base contact with the Kelpie until the next Round.",
            "(2 AP) Tail Swipe: Power 5. Special Rules: Every Character within 2” is affected by this Attack.",
            "(1 AP) Wicked Slash: Power 5. Special Rules: Critical Hits break 1 Armour."
          ],
          "rasgos": [
            "Agile",
            "Split Activation",
            "Fearsome",
            "Dwindling Strength",
            "Death Throes",
            "Aquatic"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "cured_meat"
          ],
          "equipo_de_serie": [],
          "hechizos": []
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
          "faccion_nombre": "Hombres Bestia",
          "nombre": "Carne Curada / Cured Meat",
          "tipo": "Objeto / Consumible",
          "coste": 10,
          "etiqueta": "Armería Beastfolk",
          "resumen": "Raciones de carne o haggis de troll de larga conservación.",
          "detalles": "Efectos: Un solo uso. Al consumirse, el personaje o un aliado en contacto de peana recupera D6 HP.",
          "restriccion": "Un solo uso (One use only)."
        },
        {
          "id": "beastfolk_ranged_weapon",
          "faccion_id": "beastfolk",
          "faccion_nombre": "Hombres Bestia",
          "nombre": "Arma a Distancia Beastfolk / Beastfolk Ranged Weapon",
          "tipo": "Equipo / Arma a Distancia",
          "coste": 15,
          "etiqueta": "Armería Beastfolk",
          "resumen": "Hondas de cuero, arcos cortos o ballestas rústicas.",
          "detalles": "Efectos: Otorga el ataque a distancia (Ranged) Shot: Power 5, Alcance 12\".",
          "restriccion": "Uso continuo mientras esté equipada."
        },
        {
          "id": "protective_hide",
          "faccion_id": "beastfolk",
          "faccion_nombre": "Hombres Bestia",
          "nombre": "Piel Protectora / Protective Hide",
          "tipo": "Forma Animal (Animal Form)",
          "coste": 20,
          "etiqueta": "Armería Beastfolk",
          "resumen": "Caparazón de quitina, escamas gruesas o piel de dureza extraordinaria.",
          "detalles": "Efectos: Otorga +1 a la Armadura. Esta armadura no se destruye ni se rompe por ataques. Se acumula con otros tipos de armadura.",
          "restriccion": "Atributo físico permanente (no se puede desequipar)."
        },
        {
          "id": "horns_and_tusks",
          "faccion_id": "beastfolk",
          "faccion_nombre": "Hombres Bestia",
          "nombre": "Cuernos y Colmillos / Horns & Tusks",
          "tipo": "Forma Animal (Animal Form)",
          "coste": 20,
          "etiqueta": "Armería Beastfolk",
          "resumen": "Mandíbulas prominentes, cornamenta afilada o colmillos devastadores.",
          "detalles": "Efectos: Otorga +1 al Power en todos los ataques melé del personaje.",
          "restriccion": "Atributo físico permanente (no se puede desequipar)."
        },
        {
          "id": "long_legs",
          "faccion_id": "beastfolk",
          "faccion_nombre": "Hombres Bestia",
          "nombre": "Patas Largas / Long Legs (Pies Ligeros / Ágil)",
          "tipo": "Forma Animal (Animal Form)",
          "coste": 20,
          "etiqueta": "Armería Beastfolk",
          "resumen": "Extremidades inferiores largas y musculadas adaptadas para dar grandes zancadas o saltar al combate.",
          "detalles": "Efectos: Otorga +2 al Movimiento y el rasgo Ágil (Agile), permitiendo repetir un Chequeo de Leg It fallido por ronda.",
          "restriccion": "Atributo físico permanente (no se puede desequipar)."
        },
        {
          "id": "camouflaged_pelt",
          "faccion_id": "beastfolk",
          "faccion_nombre": "Hombres Bestia",
          "nombre": "Pelaje Camuflado / Camouflaged Pelt",
          "tipo": "Forma Animal (Animal Form)",
          "coste": 15,
          "etiqueta": "Armería Beastfolk",
          "resumen": "Patrón de piel o follaje corporal que mimetiza al personaje con el bosque.",
          "detalles": "Efectos: Los personajes enemigos que realicen ataques a distancia contra este personaje aumentan la dificultad de su tirada de Hazaña en 1 (+1 Feat difficulty).",
          "restriccion": "Atributo físico permanente (no se puede desequipar)."
        },
        {
          "id": "ugly",
          "faccion_id": "beastfolk",
          "faccion_nombre": "Hombres Bestia",
          "nombre": "Feo / Ugly",
          "tipo": "Forma Animal (Animal Form)",
          "coste": 15,
          "etiqueta": "Armería Beastfolk",
          "resumen": "Rostro grotesco o deforme de pesadilla abisal.",
          "detalles": "Efectos: Otorga el rasgo Temible (Fearsome). Los enemigos deben superar un Chequeo de Valentía para poder atacarlo o trabarse en combate.",
          "restriccion": "Atributo físico permanente (no se puede desequipar)."
        },
        {
          "id": "monster_rider",
          "faccion_id": "beastfolk",
          "faccion_nombre": "Hombres Bestia",
          "nombre": "Jinete de Monstruos / Monster Rider",
          "tipo": "Forma Animal (Animal Form)",
          "coste": 5,
          "etiqueta": "Armería Beastfolk",
          "resumen": "Afinidad innata para cabalgar a lomos de bestias y monstruos del bosque.",
          "detalles": "Efectos: Permite utilizar el rasgo Montura Monstruosa (Monstrous Mount) sobre cualquier Bestia, Monstruo o Titán del Bestiario.",
          "restriccion": "Atributo físico permanente."
        }
      ],
      "saberes_magicos": [
        {
          "saber": "Saber de Diente y Pelaje / Lore of Tooth and Fur",
          "hechizos": [
            {
              "nombre": "Criaturas del Bosque / Forest Creatures",
              "exige": 14,
              "ap": 2,
              "alcance": "12\"",
              "efecto": "Bestias e insectos atacan al objetivo y a todos a 3\" de él, causando 3 Impactos (3 Hits) automáticos."
            },
            {
              "nombre": "Dominio Bestial / Warging",
              "exige": 17,
              "ap": 2,
              "alcance": "12\"",
              "efecto": "Entra en la mente de una bestia aliada en el tablero para activarla inmediatamente en la ronda."
            },
            {
              "nombre": "Hierbas Curativas / Healing Herbs",
              "exige": 18,
              "ap": 1,
              "alcance": "6\"",
              "efecto": "Restaura D6 HP a un personaje aliado a 6\" o menos."
            },
            {
              "nombre": "Llamada de lo Salvaje / Call of the Wild",
              "exige": 20,
              "ap": 2,
              "alcance": "6\"",
              "efecto": "Otorga +2 al Power y +2 al Movimiento a un Hombre Bestia o Bestia aliada hasta el final de la ronda."
            }
          ]
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
            "animal_totem",
            "ancient_dead_ranged_weapon",
            "sacred_blade",
            "familiar_jar",
            "circlet_of_bronze",
            "skeleton_trumpet",
            "vengeance_coin"
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
            "animal_totem",
            "ancient_dead_ranged_weapon",
            "familiar_jar",
            "circlet_of_bronze",
            "skeleton_trumpet",
            "vengeance_coin"
          ],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ],
          "hechizos": [
            "Pozo de Alquitrán / Tar Pit (Exige 14): Alcance 8\". Coloca un marcador de alquitrán. Todos los personajes a 3\" reducen su Movimiento a 1\".",
            "Glaive Espiritual / Spirit Glaive (Exige 17): Alcance 3\". Encanta un arma aliada. El objetivo atacado pierde 1 AP por cada 3 de daño sufrido en lugar de perder HP.",
            "Ritual Olvidado / Forgotten Ritual (Exige 20): Alcance 3\". Todos los aliados con el rasgo Huesos (Bones) a 3\" del Mago recuperan D3 HP.",
            "Justicia de los Muertos / Justice of the Dead (Exige 21): Alcance Global. Cada enemigo que haya noqueado a un aliado sufre D6 Impactos que ignoran Armadura."
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
            "animal_totem",
            "ancient_dead_ranged_weapon",
            "sacred_blade",
            "skeleton_trumpet",
            "vengeance_coin"
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
            "animal_totem",
            "ancient_dead_ranged_weapon",
            "sacred_blade",
            "circlet_of_bronze",
            "skeleton_trumpet",
            "vengeance_coin"
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
        },
        {
          "id": "vengeance_coin",
          "faccion_id": "ancient_dead",
          "faccion_nombre": "Antiguos Muertos",
          "nombre": "Moneda de Venganza / Vengeance Coin",
          "tipo": "Objeto / Gear",
          "coste": 10,
          "etiqueta": "Armería Antiguos Muertos",
          "resumen": "Una de las dos monedas con las que el guerrero fue enterrado sobre sus ojos. Lleno de rabia contra quien cree que se la robó.",
          "detalles": "Efectos: Elige un personaje enemigo al comienzo de la partida. El personaje equipado con este objeto obtiene +2 al Power en todos sus Ataques contra él.",
          "restriccion": "Afecta a un único objetivo enemigo elegido al inicio de la partida."
        }
      ],
      "saberes_magicos": [
        {
          "saber": "Saber del Más Allá / Lore of the Thereafter",
          "hechizos": [
            {
              "nombre": "Pozo de Alquitrán / Tar Pit",
              "exige": 14,
              "ap": 2,
              "alcance": "8\"",
              "efecto": "Coloca un marcador de alquitrán. Todos los personajes a 3\" reducen su Movimiento a 1\"."
            },
            {
              "nombre": "Glaive Espiritual / Spirit Glaive",
              "exige": 17,
              "ap": 1,
              "alcance": "3\"",
              "efecto": "Encanta un arma aliada. El objetivo atacado pierde 1 AP por cada 3 de daño sufrido en lugar de perder HP."
            },
            {
              "nombre": "Ritual Olvidado / Forgotten Ritual",
              "exige": 20,
              "ap": 2,
              "alcance": "3\"",
              "efecto": "Todos los aliados con el rasgo Huesos (Bones) a 3\" del Mago recuperan D3 HP."
            },
            {
              "nombre": "Justicia de los Muertos / Justice of the Dead",
              "exige": 21,
              "ap": 3,
              "alcance": "Global",
              "efecto": "Cada enemigo que haya noqueado a un aliado sufre D6 Impactos que ignoran Armadura."
            }
          ]
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
          "equipo_permitido": [
            "blood_vial",
            "vampyr_supreme",
            "beguiling_temperament",
            "shapeshifter",
            "everlasting_bloodline",
            "fell_scholar",
            "crimson_knight"
          ],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ],
          "hechizos": [
            "Oscuridad / Darkness (Exige 14): Alcance 8\". Crea miasma oscuro. El objetivo y miniaturas a 4\" sufren Desventaja al realizar disparos.",
            "Trueno Dramático / Dramatic Thunderclap (Exige 17): Alcance Global. Un personaje aliado puede repetir un Chequeo Narrativo o Hazaña durante la Ronda.",
            "Cautivar / Beguile (Exige 19): Alcance 6\". Objetivo enemigo debe pasar Valentía o perder 2 AP e incapacitarse de realizar ataques.",
            "Forma de Niebla / Mist Form (Exige 21): Alcance Personal. Permite moverse 8\" ignorando terreno y miniaturas enemigas e impidiendo ser atacado."
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
          "equipo_permitido": [
            "blood_vial"
          ],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ],
          "hechizos": [
            "Oscuridad / Darkness (Exige 14): Alcance 8\". Crea miasma oscuro. El objetivo y miniaturas a 4\" sufren Desventaja al realizar disparos.",
            "Trueno Dramático / Dramatic Thunderclap (Exige 17): Alcance Global. Un personaje aliado puede repetir un Chequeo Narrativo o Hazaña durante la Ronda.",
            "Cautivar / Beguile (Exige 19): Alcance 6\". Objetivo enemigo debe pasar Valentía o perder 2 AP e incapacitarse de realizar ataques.",
            "Forma de Niebla / Mist Form (Exige 21): Alcance Personal. Permite moverse 8\" ignorando terreno y miniaturas enemigas e impidiendo ser atacado."
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
          "equipo_permitido": [
            "blood_vial"
          ],
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
        },
        {
          "id": "everlasting_bloodline",
          "faccion_id": "vampires",
          "faccion_nombre": "Vampiros",
          "nombre": "Linaje Inmortal / Everlasting Bloodline",
          "tipo": "Linaje / Bloodline",
          "coste": 20,
          "etiqueta": "Armería Vampiros",
          "resumen": "Este Vampiro es especialmente tenaz y se aferra a la no-vida con uñas largas y afiladas.",
          "detalles": "Efectos: Si es Noqueado (KO), coloca un marcador en el tablero. Puede ser curado mediante viales de sangre (Blood Vials) por aliados y regresar al combate.",
          "restriccion": "Es un Linaje permanente y no se puede remover ni perder."
        },
        {
          "id": "fell_scholar",
          "faccion_id": "vampires",
          "faccion_nombre": "Vampiros",
          "nombre": "Sabio Caído / Fell Scholar",
          "tipo": "Linaje / Bloodline",
          "coste": 30,
          "etiqueta": "Armería Vampiros",
          "resumen": "Dedica siglos de estudio en su biblioteca amasando un vasto conocimiento de las artes oscuras.",
          "detalles": "Efectos: El Vampiro adquiere la Clase Mago (Mage) y puede lanzar hechizos pertenecientes al Saber de la Noche (Lore of the Night).",
          "restriccion": "Confiere la Clase Mago permanente al personaje."
        },
        {
          "id": "crimson_knight",
          "faccion_id": "vampires",
          "faccion_nombre": "Vampiros",
          "nombre": "Caballero Carmesí / Crimson Knight",
          "tipo": "Linaje / Bloodline",
          "coste": 20,
          "etiqueta": "Armería Vampiros",
          "resumen": "Maestro de las artes marciales cuyos sirvientes tiemblan cuando desenvaina su hoja.",
          "detalles": "Efectos: Añade +1 al Daño infligido en cada ataque cuerpo a cuerpo (Melee) que realice este Vampiro.",
          "restriccion": "Aplica solo en combate cuerpo a cuerpo."
        }
      ],
      "saberes_magicos": [
        {
          "saber": "Saber de la Noche / Lore of the Night",
          "hechizos": [
            {
              "nombre": "Oscuridad / Darkness",
              "exige": 14,
              "ap": 1,
              "alcance": "8\"",
              "efecto": "Crea miasma oscuro. El objetivo y miniaturas a 4\" sufren Desventaja al realizar disparos."
            },
            {
              "nombre": "Trueno Dramático / Dramatic Thunderclap",
              "exige": 17,
              "ap": 1,
              "alcance": "Global",
              "efecto": "Un personaje aliado puede repetir un Chequeo Narrativo o Hazaña durante la Ronda."
            },
            {
              "nombre": "Cautivar / Beguile",
              "exige": 19,
              "ap": 2,
              "alcance": "6\"",
              "efecto": "Objetivo enemigo debe pasar Valentía o perder 2 AP e incapacitarse de realizar ataques."
            },
            {
              "nombre": "Forma de Niebla / Mist Form",
              "exige": 21,
              "ap": 2,
              "alcance": "Personal",
              "efecto": "Permite moverse 8\" ignorando terreno y miniaturas enemigas e impidiendo ser atacado."
            }
          ]
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
          "equipo_permitido": [
            "soul_jar",
            "undead_raiders_ranged_weapon",
            "stolen_arcloque_pistol",
            "undead_mount",
            "cursed_pipes",
            "hangmans_noose"
          ],
          "equipo_de_serie": [
            "Armamento Estándar / Sin Armadura de serie"
          ],
          "hechizos": [
            "Frío Cadavérico / Deathly Chill (Exige 14): Alcance 12\". Reduce en D3 los AP del personaje enemigo objetivo en su siguiente Activación.",
            "Roecueros / Bonegnawer (Exige 17): Alcance 6\". Invoca una Carrion Rat gratuita a 6\" que se activa de inmediato.",
            "Drenaje de Alma / Soul Drain (Exige 19): Alcance 6\". El objetivo sufre 3 Impactos que ignoran Armadura; el lanzador recupera 1 HP por cada herida causada.",
            "Resurrección Masiva / Mass Resurrection (Exige 21): Alcance 6\". Devuelve a la vida a hasta 2 unidades no-muertas caídas a 6\" con 1 HP cada una."
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
          "equipo_permitido": [
            "soul_jar",
            "undead_raiders_ranged_weapon",
            "stolen_arcloque_pistol",
            "undead_mount",
            "hangmans_noose"
          ],
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
          "equipo_permitido": [
            "soul_jar",
            "undead_mount",
            "hangmans_noose"
          ],
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
        },
        {
          "id": "undead_raiders_ranged_weapon",
          "faccion_id": "undead_raiders",
          "faccion_nombre": "Saqueadores No-Muertos",
          "nombre": "Arma a Distancia No-Muerta / Undead Raiders Ranged Weapon",
          "tipo": "Equipo / Arma a Distancia",
          "coste": 15,
          "etiqueta": "Armería Saqueadores No-Muertos",
          "resumen": "Rifles podridos, arcos, ballestas o rocas arrojadizas utilizadas por los bandidos.",
          "detalles": "Efectos: Otorga el ataque a distancia (Ranged) Shot: Power 5, Alcance 12\".",
          "restriccion": "Uso continuo mientras esté equipada."
        },
        {
          "id": "stolen_arcloque_pistol",
          "faccion_id": "undead_raiders",
          "faccion_nombre": "Saqueadores No-Muertos",
          "nombre": "Pistola Arcloque Robada / Stolen Arcloque Pistol",
          "tipo": "Equipo / Arma a Distancia",
          "coste": 20,
          "etiqueta": "Armería Saqueadores No-Muertos",
          "resumen": "Pistola saqueada a un soldado imperial caído, atascada de barro pero aún devastadora.",
          "detalles": "Efectos: Otorga el ataque a distancia (Ranged) Shot: Power 7, Alcance 8\". Solo se puede realizar una vez por Activación. Si hay más Fallos que Éxitos al tirar para impactar, el portador recibe el mismo número de impactos que el objetivo.",
          "restriccion": "1 uso por Activación. Riesgo de retroceso/explosión."
        },
        {
          "id": "hangmans_noose",
          "faccion_id": "undead_raiders",
          "faccion_nombre": "Saqueadores No-Muertos",
          "nombre": "Soga de Ahorcado / Hangman's Noose",
          "tipo": "Objeto / Item",
          "coste": 15,
          "etiqueta": "Armería Saqueadores No-Muertos",
          "resumen": "La soga del patíbulo que los envió a la tumba, portada con despecho hacia los vivos.",
          "detalles": "Efectos: Un solo uso. Si el personaje cae Noqueado (KO), se coloca inmediatamente de nuevo en el tablero con 1 HP.",
          "restriccion": "De un solo uso."
        }
      ],
      "saberes_magicos": [
        {
          "saber": "Saber de los Malditos / Lore of the Damned",
          "hechizos": [
            {
              "nombre": "Frío Cadavérico / Deathly Chill",
              "exige": 14,
              "ap": 1,
              "alcance": "12\"",
              "efecto": "Reduce en D3 los AP del personaje enemigo objetivo en su siguiente Activación."
            },
            {
              "nombre": "Roecueros / Bonegnawer",
              "exige": 17,
              "ap": 2,
              "alcance": "6\"",
              "efecto": "Invoca una Carrion Rat gratuita a 6\" que se activa de inmediato."
            },
            {
              "nombre": "Drenaje de Alma / Soul Drain",
              "exige": 19,
              "ap": 2,
              "alcance": "6\"",
              "efecto": "El objetivo sufre 3 Impactos que ignoran Armadura; el lanzador recupera 1 HP por cada herida causada."
            },
            {
              "nombre": "Resurrección Masiva / Mass Resurrection",
              "exige": 21,
              "ap": 3,
              "alcance": "6\"",
              "efecto": "Devuelve a la vida a hasta 2 unidades no-muertas caídas a 6\" con 1 HP cada una."
            }
          ]
        }
      ]
    },
    {
      "id": "wild_elves",
      "nombre": "Elfos Silvanos",
      "unidades": [
        {
          "id": "wild_elf_warchief",
          "nombre": "Jefe de Guerra Elfo Silvano",
          "nombre_en": "Wild Elven Warchief",
          "clase": "commander",
          "coste": 130,
          "peana_mm": null,
          "stats": {
            "hp": 14,
            "mov": 5,
            "armadura": 0,
            "ap": 5
          },
          "ataques": [
            "(2 AP) Whirlwind: Power 8. Special Rules: Each Critical Hit allows 1 more D6 to be rolled.",
            "(1 AP) Deadly Strike: Power 5. Special Rules: Critical Hits ignore Armour",
            "(2 AP) Bloodlust: Power 10. Special Rules: This Attack may only be made if the Warchief Knocked Out an enemy Character in the same Activation."
          ],
          "rasgos": [
            "Agile",
            "Summoner",
            "Sacrifice"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [
            "blood_stone",
            "wild_elven_ranged_weapon",
            "sacrificial_blade",
            "wild_elven_mount",
            "strongbow",
            "faeblade"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "wild_elf_druid",
          "nombre": "Drúida Elfo Silvano",
          "nombre_en": "Wild Elven Druid",
          "clase": "mage",
          "coste": 145,
          "peana_mm": 30,
          "stats": {
            "hp": 12,
            "mov": 5,
            "armadura": 0,
            "ap": 5
          },
          "ataques": [
            "(Ranged) Enchanted Vines: Power 4. Special Rules: 8” range",
            "(1 AP) Ritual Blade: Power 5"
          ],
          "rasgos": [
            "Agile",
            "Summoner",
            "Sacrifice"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "blood_stone",
            "wild_elven_ranged_weapon",
            "sacrificial_blade",
            "wild_elven_mount",
            "strongbow",
            "faeblade"
          ],
          "equipo_de_serie": [],
          "hechizos": [
            "Tangleweed (Exige 14): All Characters within 6\" of the caster have their Movement and Leg It rolls reduced by 2\" until the caster’s next Spell.",
            "Spirit of the Forest (Exige 16): One friendly Character within 12\" gains +2 AP for their next Activation. Whilst under the effects of this Spell, the target may not receive any other bonuses from Spells.",
            "Ominous Whispers (Exige 19): One enemy Character within 12” must pass a Bravery Test. If they fail, they lose 3 HP in addition to the regular effects of failure. All enemy models within 3” of the original target, whether they passed their Bravery Test or not, must also take Bravery Tests.",
            "The Merciless Wood (Exige 21): Power 4. Special Rules: If any Characters are Knocked Out by the effects of this spell, they are replaced by a Woodfiend. This Character is controlled by the Elven player as normal and can be activated in the next Round."
          ]
        },
        {
          "id": "wild_elf_warrior",
          "nombre": "Guerrero Elfo Silvano",
          "nombre_en": "Wild Elven Warrior",
          "clase": "elite",
          "coste": 95,
          "peana_mm": 30,
          "stats": {
            "hp": 10,
            "mov": 5,
            "armadura": 0,
            "ap": 4
          },
          "ataques": [
            "(2 AP) Flurry of Blades: Power 7. Special Rules: Each Critical Hit allows 1 more D6 to be rolled.",
            "(1 AP) Wicked Slash: Power 5. Special Rules: Each Critical Hit ignores 1 Armour."
          ],
          "rasgos": [
            "Agile",
            "Summoner"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "blood_stone",
            "wild_elven_ranged_weapon",
            "sacrificial_blade",
            "strongbow",
            "faeblade"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "wild_elf_blademaster",
          "nombre": "Maestro de la Hoja Elfo Silvano",
          "nombre_en": "Wild Elven Blademaster",
          "clase": "irregular",
          "coste": 110,
          "peana_mm": null,
          "stats": {
            "hp": 10,
            "mov": 5,
            "armadura": 0,
            "ap": 4
          },
          "ataques": [
            "(2 AP) Bladestorm: Power 8. Special Rules: Each Critical Hit allows 2 more D6 to be rolled.",
            "(1 AP) Scissor Strike: Power 5. Special Rules: Each Critical Hit breaks 1 Armour."
          ],
          "rasgos": [
            "Agile",
            "Summoner"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "blood_stone",
            "wild_elven_ranged_weapon",
            "sacrificial_blade",
            "strongbow",
            "faeblade"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "briarbeast",
          "nombre": "Briarbeast",
          "nombre_en": "Briarbeast",
          "clase": "heavy",
          "coste": 200,
          "peana_mm": 50,
          "stats": {
            "hp": 20,
            "mov": 8,
            "armadura": 0,
            "ap": 7
          },
          "ataques": [
            "(2 AP) Impale: Power 9. Special Rules: May only be used if a Charge was made in this Activation.",
            "(2 AP) Trample: Power 4. Special Rules: If a Critical Hit is made, the target Character is Prone, and this Character may move out of combat without any penalties.",
            "(2 AP) Gore: Power 6"
          ],
          "rasgos": [
            "Flammable",
            "Agile",
            "Split Activation",
            "Fearsome",
            "Dwindling Strength",
            "Death Throes",
            "Monstrous Mount",
            "Thorned",
            "Thirst of the Forest"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "lichenhawk",
          "nombre": "Lichenhawk",
          "nombre_en": "Lichenhawk",
          "clase": "beast",
          "coste": 35,
          "peana_mm": 30,
          "stats": {
            "hp": 4,
            "mov": 8,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(1 AP) Peck: Power 4",
            "(2 AP) Skydive: Power 8. Special Rules: May target Characters within 2”. After this Attack, move this Character in base contact with the target. If more Failures are rolled than Successes to Hit, this Character is Knocked Out."
          ],
          "rasgos": [
            "Summoned",
            "Flammable",
            "Fly"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "woodfiend",
          "nombre": "Woodfiend",
          "nombre_en": "Woodfiend",
          "clase": "unit",
          "coste": 45,
          "peana_mm": null,
          "stats": {
            "hp": 6,
            "mov": 3,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(Ranged) Splinter: Power 4. Special Rules: Range 8”.",
            "(1 AP) Razorbark: Power 3"
          ],
          "rasgos": [
            "Summoned",
            "Flammable",
            "Shifting Forms"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
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
        },
        {
          "id": "blood_stone",
          "faccion_id": "wild_elves",
          "faccion_nombre": "Elfos Silvanos",
          "nombre": "Piedra de Sangre / Blood Stone",
          "tipo": "Objeto / Consumible",
          "coste": 10,
          "etiqueta": "Armería Elfos Silvanos",
          "resumen": "Un fragmento carmesí de las profundidades de Mildaark repleto de magia sustentadora.",
          "detalles": "Efectos: Un solo uso. Al consumirse, el personaje recupera D6 HP. Puede usarse para curar a un aliado en contacto de peana.",
          "restriccion": "De un solo uso."
        },
        {
          "id": "wild_elven_ranged_weapon",
          "faccion_id": "wild_elves",
          "faccion_nombre": "Elfos Silvanos",
          "nombre": "Arma a Distancia Silvana / Wild Elven Ranged Weapon",
          "tipo": "Equipo / Arma a Distancia",
          "coste": 15,
          "etiqueta": "Armería Elfos Silvanos",
          "resumen": "Lanzas arrojadizas o arcos silvanos del tamaño de un adulto.",
          "detalles": "Efectos: Otorga el ataque a distancia (Ranged) Shot: Power 6, Alcance 16\".",
          "restriccion": "Uso continuo mientras esté equipada."
        },
        {
          "id": "sacrificial_blade",
          "faccion_id": "wild_elves",
          "faccion_nombre": "Elfos Silvanos",
          "nombre": "Hoja Sacrificial / Sacrificial Blade",
          "tipo": "Equipo / Arma",
          "coste": 20,
          "etiqueta": "Armería Elfos Silvanos",
          "resumen": "Un arma manchada de sangre utilizada en las ceremonias secretas de los Elfos.",
          "detalles": "Efectos: El personaje obtiene el rasgo Sacrificio (Sacrifice). Si ya poseía dicho rasgo, puede repetir 1 intento fallido de Sacrificio por Ronda.",
          "restriccion": "Otorga o potencia la capacidad de Sacrificio."
        },
        {
          "id": "faeblade",
          "faccion_id": "wild_elves",
          "faccion_nombre": "Elfos Silvanos",
          "nombre": "Faeblade / Hoja Feérica",
          "tipo": "Equipo / Arma Mágica",
          "coste": 30,
          "etiqueta": "Armería Elfos Silvanos",
          "resumen": "Hoja etérea y centelleante que al ser arrojada busca a la presa y regresa a la mano.",
          "detalles": "Efectos: Cuenta como Arma a Dos Manos (Two-Handed Weapon). Permite el ataque a distancia (Ranged) Faeblade: Power 8, Alcance 12\". Si el objetivo queda KO, el daño sobrante afecta a otro enemigo a 6\".",
          "restriccion": "Arma de dos manos. Permite ataque relámpago con daño sobrante."
        }
      ],
      "saberes_magicos": [
        {
          "saber": "Saber del Bosque Profundo / Lore of the Darkwood",
          "hechizos": [
            {
              "nombre": "Maleza Espinosa / Tangleweed",
              "exige": 14,
              "ap": 1,
              "alcance": "6\" Área",
              "efecto": "Enredaderas espinosas reducen en 2\" el Movimiento y Leg It de todos los personajes a 6\"."
            },
            {
              "nombre": "Bosque Despiadado / Merciless Wood",
              "exige": 17,
              "ap": 2,
              "alcance": "8\"",
              "efecto": "Los árboles atacan a enemigos en terreno de bosque, infligiendo 2 Impactos de Power 6."
            },
            {
              "nombre": "Invocación de Briarbeast / Summon Briarbeast",
              "exige": 19,
              "ap": 2,
              "alcance": "6\"",
              "efecto": "Invoca o fortalece a un constructo vegetal/madera otorgándole +2 Power y +5 HP."
            },
            {
              "nombre": "Sacrificio de Sangre / Blood Sacrifice",
              "exige": 21,
              "ap": 2,
              "alcance": "Contacto",
              "efecto": "Sacrifica 2 HP de un aliado o prisionero para recargar completamente los AP del Druida."
            }
          ]
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
          "clase": "commander",
          "coste": 120,
          "peana_mm": 40,
          "stats": {
            "hp": 14,
            "mov": 4,
            "armadura": 0,
            "ap": 5
          },
          "ataques": [
            "(2 AP) Brawl: Power 8. Special Rules: Each Critical Hit allows one more D6 to be rolled.",
            "(1 AP) Roundhouse Punch: Power 5. Special Rules: If the Target is Prone, if there are more Successes than Failures, the Character is moved 3” in a direction chosen by the Ourk player.",
            "(1 AP) Bludgeon: Power 5. Special Rules: Critical Hits cause the next Attack to have +1 Power. This does not stack."
          ],
          "rasgos": [
            "Intimidating",
            "Hurl",
            "Power Struggle"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [
            "healing_broth",
            "ourk_boglin_ranged_weapon",
            "swamp_scrumpy",
            "pet_droggo",
            "magical_mushroom",
            "ourk_boglin_mount"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "ourk_dreameater",
          "nombre": "Devorador de Sueños Ourk",
          "nombre_en": "Ourk Dreameater",
          "clase": "mage",
          "coste": 90,
          "peana_mm": 40,
          "stats": {
            "hp": 13,
            "mov": 4,
            "armadura": 0,
            "ap": 5
          },
          "ataques": [
            "(2 AP) Devious Slash: Power 6. Special Rules: Ignores Armour and Shields.",
            "(Ranged) Choking Mists: Power 3. Special Rules: 8” range. Ignores Armour and Shields."
          ],
          "rasgos": [
            "Intimidating",
            "Power Struggle",
            "Familiars"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "healing_broth",
            "swamp_scrumpy",
            "pet_droggo",
            "magical_mushroom",
            "ourk_boglin_mount"
          ],
          "equipo_de_serie": [],
          "hechizos": [
            "False Foe (Exige 14): Range 8”. For the rest of the Round the target must pass an Easy Feat before they are able to make any Attacks",
            "Stupor (Exige 17): All Characters within 3” of the caster fall into a deep sleep. They count as being Prone until they are either the target of an Attack or Spell or have passed a Medium Feat in their next Activation. Once they have woken up, they may Activate as normal.",
            "Dream Eater (Exige 19): Range 2”. This Spell may only be targeted against those under the effects of the Stupor Spell. The target loses D3 AP for their next Activation, and they are given to the caster to spend in their current Activation. In addition, the target is not woken up by this Spell.",
            "Inside your Mind (Exige 21): Choose a target on a 30mm or 40mm base within 4” of the caster. The caster’s Activation immediately ends, and the target is Activated, even if they have already Activated this Round. The Ourk player can spend 3AP controlling the target however they wish. Once the 3AP is spent, the game continues as normal."
          ]
        },
        {
          "id": "ourk_brute",
          "nombre": "Bruto Ourk",
          "nombre_en": "Ourk Brute",
          "clase": "elite",
          "coste": 85,
          "peana_mm": 40,
          "stats": {
            "hp": 11,
            "mov": 4,
            "armadura": 0,
            "ap": 4
          },
          "ataques": [
            "(2 AP) Brawl: Power 7. Special Rules: Each Critical Hit allows one more Hit to be rolled.",
            "(1 AP) Smack: Power 5. Special Rules: Critical Hits cause the next Attack to have +1 Power. This does not stack."
          ],
          "rasgos": [
            "Intimidating",
            "Hurl"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "healing_broth",
            "ourk_boglin_ranged_weapon",
            "swamp_scrumpy",
            "goading_fork",
            "ourk_boglin_mount"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "boglin",
          "nombre": "Boglin",
          "nombre_en": "Boglin",
          "clase": "unit",
          "coste": 20,
          "peana_mm": 30,
          "stats": {
            "hp": 4,
            "mov": 5,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(2 AP) Scrap: Power 4. Special Rules: Each Critical Hit allows one more D6 to be rolled.",
            "(1 AP) Shank: Power 3"
          ],
          "rasgos": [
            "Diminutive",
            "Sticky Fingers"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "healing_broth",
            "ourk_boglin_ranged_weapon",
            "musical_instrument",
            "ourk_boglin_mount"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "marsh_hydra",
          "nombre": "Hidra del Pantano",
          "nombre_en": "Marsh Hydra",
          "clase": "monster",
          "coste": 200,
          "peana_mm": 60,
          "stats": {
            "hp": 25,
            "mov": 6,
            "armadura": 0,
            "ap": 7
          },
          "ataques": [
            "(Ranged) Venom Spit: Power 5. Special Rules: 8” range.",
            "(2 AP) Constrict: Power 5. Special Rules: On a Critical Hit, the target may not move or Attack until they have made a successful Medium Feat. If unsuccessful, they take D3 Hits.",
            "(1 AP) Bite: Power 4"
          ],
          "rasgos": [
            "Split Activation",
            "Fearsome",
            "Dwindling Strength",
            "Death Throes",
            "Head Regeneration"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "brewzerker",
          "nombre": "Brewzerker",
          "nombre_en": "Brewzerker",
          "clase": "irregular",
          "coste": 95,
          "peana_mm": 30,
          "stats": {
            "hp": 11,
            "mov": 4,
            "armadura": 0,
            "ap": 4
          },
          "ataques": [
            "(2 AP) Booze Frenzy: Power 9. Special Rules: After this Attack, this Character becomes Prone.",
            "(1 AP) Drunken Wallop: Power 4"
          ],
          "rasgos": [
            "Intimidating",
            "Brewboy"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "healing_broth",
            "swamp_scrumpy",
            "magical_mushroom",
            "ourk_boglin_mount"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "swamp_critter",
          "nombre": "Criatura del Pantano",
          "nombre_en": "Swamp Critter",
          "clase": "beast",
          "coste": 30,
          "peana_mm": 30,
          "stats": {
            "hp": 5,
            "mov": 7,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(1 AP) Chomp: Power 4"
          ],
          "rasgos": [
            "Agile",
            "Pack Hunter",
            "Stinky Beast"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        }
      ],
      "reglas_faccion": [
        {
          "id": "nomads_ourks",
          "nombre": "Nómadas / Nomads",
          "etiqueta": "Regla de Facción (Ourks)",
          "resumen": "Vida itinerante en los pantanos y bosques de Mildaark.",
          "detalles": "Efectos: Al construir tu banda de Ourks, puedes incluir personajes de las facciones Beastfolk (Hombres Bestia) y Gremlins sin penalizaciones.",
          "restriccion": "Fase de creación de banda."
        },
        {
          "id": "power_struggle",
          "nombre": "Lucha de Poder / Power Struggle",
          "etiqueta": "Regla de Facción (Ourks)",
          "resumen": "Constante rivalidad por el liderazgo entre el Chieftain y el Dreameater.",
          "detalles": "Efectos: Si incluyes un Chieftain y un Dreameater en tu banda, ambos deben realizar un Chequeo de Valentía al inicio de cada Ronda. El ganador recibe bonificadores tácticos descritos en su perfil (Chieftain: Brutos a 6\" ganan +1 Power; Dreameater: Brutos a 3\" ganan efectos de Swamp Scrumpy). El perdedor pierde 1 AP para esa activación. En caso de empate, se repite la tirada.",
          "restriccion": "Se resuelve al inicio de cada Ronda si ambos están en mesa."
        }
      ],
      "armeria_exclusiva": [
        {
          "id": "healing_broth",
          "faccion_id": "ourks",
          "faccion_nombre": "Ourks",
          "nombre": "Caldo Curativo / Healing Broth",
          "tipo": "Objeto / Consumible",
          "coste": 10,
          "etiqueta": "Armería Ourk",
          "resumen": "Nutritivo brebaje cocinado por los Ourks para sanar heridas.",
          "detalles": "Efectos: Un solo uso. Al consumirse, el personaje o un aliado en contacto de peana recupera D6 HP.",
          "restriccion": "Un solo uso (One use only)."
        },
        {
          "id": "ourk_ranged_weapon",
          "faccion_id": "ourks",
          "faccion_nombre": "Ourks",
          "nombre": "Arma a Distancia Ourk/Boglin / Ourk/Boglin Ranged Weapon",
          "tipo": "Equipo / Arma a Distancia",
          "coste": 15,
          "etiqueta": "Armería Ourk",
          "resumen": "Hondas de cuero, ballestas toscas o trabucos de pantano.",
          "detalles": "Efectos: Otorga el ataque a distancia (Ranged) Shot: Power 5, Alcance 15\".",
          "restriccion": "Uso continuo mientras esté equipada."
        },
        {
          "id": "swamp_scrumpy",
          "faccion_id": "ourks",
          "faccion_nombre": "Ourks",
          "nombre": "Aguardiente del Pantano / Swamp Scrumpy",
          "tipo": "Objeto / Consumible",
          "coste": 10,
          "etiqueta": "Armería Ourk",
          "resumen": "Potente licor casero fermentado con ingredientes del pantano.",
          "detalles": "Efectos: Un solo uso. Al beberlo se tira 1D6: 1 (Rotura de tripas: pierde 2 AP esa activación); 2-5 (Cosa buena: repite todas las tiradas de impacto fallidas esa activación); 6 (Furia alcohólica: repite tiradas de impacto y, si no está en melé, debe mover y hacer Leg It hasta trabarse o quedar Prone).",
          "restriccion": "Un solo uso."
        },
        {
          "id": "pet_droggo",
          "faccion_id": "ourks",
          "faccion_nombre": "Ourks",
          "nombre": "Droggo Doméstico / Pet Droggo",
          "tipo": "Equipo / Dragón Pequeño",
          "coste": 20,
          "etiqueta": "Armería Ourk",
          "resumen": "Pequeño dragón de ciénaga que escupe llamaradas.",
          "detalles": "Efectos: Otorga el ataque especial (2 AP) Lanzallamas Viviente (Living Flamethrower): Power 5. Traza una línea de 4\" desde la peana; todas las miniaturas a 2\" o menos de la línea son objetivo del ataque.",
          "restriccion": "Equipable en Ourks y Boglins."
        },
        {
          "id": "boglin_musical_instrument",
          "faccion_id": "ourks",
          "faccion_nombre": "Ourks",
          "nombre": "Instrumento Musical Boglin / Musical Instrument",
          "tipo": "Objeto / Apoyo",
          "coste": 10,
          "etiqueta": "Armería Ourk",
          "resumen": "Tambores o flautas toscas tocadas por Boglins para animar la marcha.",
          "detalles": "Efectos: Solo para Boglins. Todos los aliados a 3\" o menos aumentan en +1 su atributo de Movimiento.",
          "restriccion": "Solo equipable en Boglins."
        },
        {
          "id": "magical_mushroom",
          "faccion_id": "ourks",
          "faccion_nombre": "Ourks",
          "nombre": "Hongo Mágico / Magical Mushroom",
          "tipo": "Objeto / Consumible",
          "coste": 10,
          "etiqueta": "Armería Ourk",
          "resumen": "Seta fluorescente recolectada de la espalda de un Swamp Wyvern.",
          "detalles": "Efectos: Un solo uso. Al consumirse, repite todas las tiradas de Hazaña (Feat) fallidas durante el resto de la activación.",
          "restriccion": "Un solo uso."
        },
        {
          "id": "goading_fork",
          "faccion_id": "ourks",
          "faccion_nombre": "Ourks",
          "nombre": "Horca de Arreo / Goading Fork",
          "tipo": "Equipo / Arma",
          "coste": 15,
          "etiqueta": "Armería Ourk",
          "resumen": "Lanza con punta provista de golosinas para azuzar bestias.",
          "detalles": "Efectos: Cuenta como Lanza (Spear). Además, cualquier Bestia, Monstruo o Titán aliado a 1\" o menos gana +1 AP.",
          "restriccion": "Uso continuo."
        },
        {
          "id": "ourk_mount",
          "faccion_id": "ourks",
          "faccion_nombre": "Ourks",
          "nombre": "Montura Ourk/Boglin / Ourk/Boglin Mount",
          "tipo": "Equipo / Montura",
          "coste": 30,
          "etiqueta": "Armería Ourk",
          "resumen": "Caimanes, sapos gigantes o bestias de pantano usadas como montura.",
          "detalles": "Efectos: Otorga +5 HP y +4 Movimiento. Permite repetir 1 tirada de Leg It fallida por Ronda. Tamaño de peana: Ourk pasa a 50mm, Boglin pasa a 40mm.",
          "restriccion": "Solo para Ourks y Boglins."
        }
      ],
      "saberes_magicos": [
        {
          "saber": "Saber de la Ilusión / Lore of Delusion",
          "hechizos": [
            {
              "nombre": "Enemigo Falso / False Foe",
              "exige": 14,
              "ap": 1,
              "alcance": "8\"",
              "efecto": "Obliga al objetivo a superar Hazaña Fácil antes de poder realizar cualquier ataque."
            },
            {
              "nombre": "Estupefacción / Stupor",
              "exige": 17,
              "ap": 2,
              "alcance": "3\" Área",
              "efecto": "Todas las miniaturas a 3\" quedan dormidas (Prone) hasta ser atacadas o superar Hazaña Media."
            },
            {
              "nombre": "Devorador de Sueños / Dream Eater",
              "exige": 19,
              "ap": 1,
              "alcance": "2\"",
              "efecto": "Roba D3 AP a un enemigo dormido por Stupor y se los entrega al Dreameater."
            },
            {
              "nombre": "Dentro de tu Mente / Inside your Mind",
              "exige": 21,
              "ap": 3,
              "alcance": "4\"",
              "efecto": "Finaliza activación del Mago y controla libremente a una miniatura enemiga gastando 3 AP."
            }
          ]
        }
      ]
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
            "(2 AP) Stone Hammer: Power 7. Regla Especial: Suma +3 al Power si el objetivo está Tumbado (Prone).",
            "(1 AP) Enthusiastic Smack: Power 5. Regla Especial: Un impacto Crítico ignora Armadura.",
            "(1 AP) Kneecap: Power 5. Regla Especial: Suma +1 al Power si el objetivo está en peana de 40mm o mayor."
          ],
          "rasgos": [
            "Clout Points",
            "Gremlin Burrows"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [
            "pilfered_scran",
            "gremlin_ranged_weapon",
            "burrowing_tools_item",
            "pterra_wings",
            "shield_carriers",
            "poison_goop"
          ],
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
          "equipo_permitido": [
            "pilfered_scran",
            "gremlin_ranged_weapon",
            "burrowing_tools_item",
            "pterra_wings",
            "poison_goop"
          ],
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
            "(2 AP) Furious Flailing: Power 7. Regla Especial: Afecta a todos los personajes (aliados y enemigos) a 2\" o menos.",
            "(2 AP) Pummel: Power 9. Regla Especial: Si el objetivo está en una peana de menor tamaño, desplázalo 2\" hacia atrás."
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
        },
        {
          "id": "shield_carriers",
          "faccion_id": "gremlins",
          "faccion_nombre": "Gremlins",
          "nombre": "Portadores de Escudo / Shield Carriers",
          "tipo": "Equipo / Montura",
          "coste": 50,
          "etiqueta": "Armería Gremlins",
          "resumen": "Esbirros sometidos que transportan sobre un gran escudo a los Gremlins más importantes.",
          "detalles": "Efectos: Solo para Great Gremlins (Jefe Gremlin). Otorga +8 HP y +1 a la Armadura. El personaje pasa a tener peana de 50mm.",
          "restriccion": "Solo equipable en Great Gremlin."
        },
        {
          "id": "poison_goop",
          "faccion_id": "gremlins",
          "faccion_nombre": "Gremlins",
          "nombre": "Veneno Pegajoso / Poison Goop",
          "tipo": "Objeto / Consumible",
          "coste": 5,
          "etiqueta": "Armería Gremlins",
          "resumen": "Toxina nociva extraída del veneno del Lagarto Escupidor para imbuir armas.",
          "detalles": "Efectos: Un solo uso. Durante esta Ronda, si un objetivo pierde HP por un ataque de este personaje, el objetivo pierde 1 HP adicional al inicio de su siguiente Activación.",
          "restriccion": "De un solo uso."
        }
      ],
      "saberes_magicos": [
        {
          "saber": "Saber de la Travesura / Lore of Mischief",
          "hechizos": [
            {
              "nombre": "Insectos Chillones / Chittering Bugs",
              "exige": 14,
              "ap": 1,
              "alcance": "8\"",
              "efecto": "Impide acciones de movimiento al objetivo enemigo durante su siguiente activación."
            },
            {
              "nombre": "Lodo Pegajoso / Sticky Mud",
              "exige": 16,
              "ap": 1,
              "alcance": "6\"",
              "efecto": "Reduce el movimiento del objetivo a 1\" y le quita la capacidad de hacer Leg It."
            },
            {
              "nombre": "Confusión Cautivadora / Confusion",
              "exige": 18,
              "ap": 2,
              "alcance": "4\" Área",
              "efecto": "Explosión de humo y confeti que obliga a los enemigos a 4\" a mover en dirección aleatoria (1D6)."
            },
            {
              "nombre": "Túnel Mágico / Tunnel Swarm",
              "exige": 20,
              "ap": 2,
              "alcance": "8\"",
              "efecto": "Abre una madriguera mágica instantánea que conecta dos puntos del mapa."
            }
          ]
        }
      ]
    },
    {
      "id": "wizards",
      "nombre": "Magos",
      "unidades": [
        {
          "id": "wizard",
          "nombre": "Mago",
          "nombre_en": "Wizard",
          "clase": "commander",
          "coste": 100,
          "peana_mm": 30,
          "stats": {
            "hp": 9,
            "mov": 4,
            "armadura": 0,
            "ap": 4
          },
          "ataques": [
            "(1 AP) Staff Thwack: Power 5. Special Rules: Crits ignore Armour."
          ],
          "rasgos": [],
          "max_por_banda": 1,
          "equipo_permitido": [
            "vitality_gem",
            "wizard_ranged_weapon",
            "wizard_mount",
            "pilfered_tome"
          ],
          "equipo_de_serie": [],
          "hechizos": [
            "Conjure Sprites (Exige 14): Summons D3 Sprites of the caster's chosen College Lore.",
            "College Lore Spells: Access to spells from their chosen College of Mt Orion (Crimson, Sapphire, Emerald, Ochre, Bronze, or Opal College)."
          ]
        },
        {
          "id": "apprentice",
          "nombre": "Aprendiz",
          "nombre_en": "Apprentice",
          "clase": "mage",
          "coste": 60,
          "peana_mm": 30,
          "stats": {
            "hp": 5,
            "mov": 4,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(1 AP) Whack: Power 3"
          ],
          "rasgos": [
            "Conduit",
            "Student of Magic"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "vitality_gem",
            "wizard_ranged_weapon",
            "wizard_mount",
            "pilfered_tome"
          ],
          "equipo_de_serie": [],
          "hechizos": [
            "Student of Magic: May cast Spells from the Lore of their College, drawing a maximum of 2 cards."
          ]
        },
        {
          "id": "sprite",
          "nombre": "Sprite",
          "nombre_en": "Sprite",
          "clase": "beast",
          "coste": 25,
          "peana_mm": 30,
          "stats": {
            "hp": 4,
            "mov": 5,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(2 AP) Sparkle: Power 5. Special Rules: Every time this Attack is used, the Sprite loses 1AP.",
            "(1 AP) Nibble: Power 3"
          ],
          "rasgos": [
            "Thing of Magic"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "ensorcelled_beast",
          "nombre": "Bestia Encantada",
          "nombre_en": "Ensorcelled Beast",
          "clase": "monster",
          "coste": 200,
          "peana_mm": 60,
          "stats": {
            "hp": 24,
            "mov": 7,
            "armadura": 0,
            "ap": 7
          },
          "ataques": [
            "(2 AP) Pounce: Power 7. Special Rules: If a Crit is rolled, the target must re-roll any successful Feats to leave base contact.",
            "(2 AP) Crackle: Power 5. Special Rules: Affects all Characters without the Thing of Magic Trait within 2”. Ignores Armour.",
            "(1 AP) Chomp: Power 4"
          ],
          "rasgos": [
            "Gobble",
            "Split Activation",
            "Fearsome",
            "Dwindling Strength",
            "Death Throes",
            "Feast of Magic"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "sentinel",
          "nombre": "Centinela Encantado",
          "nombre_en": "Sentinel",
          "clase": "elite",
          "coste": 80,
          "peana_mm": 40,
          "stats": {
            "hp": 8,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(2 AP) Heavy Strike: Power 7. Special Rules: A Critical Hit knocks the target Prone if they are on a 30mm base.",
            "(1 AP) Thrust: Power 4. Special Rules: A Critical Hit knocks the target Prone if they are on a 30mm base"
          ],
          "rasgos": [
            "Enchanted Armour"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "charmed_bookcase",
          "nombre": "Estantería Encantada",
          "nombre_en": "Charmed Bookcase",
          "clase": "irregular",
          "coste": 80,
          "peana_mm": 40,
          "stats": {
            "hp": 10,
            "mov": 4,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(1 AP) Jostle: Power 3"
          ],
          "rasgos": [
            "Flammable",
            "Collection of Tomes"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
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
      ],
      "saberes_magicos": [
        {
          "saber": "Colegio Carmesí (Fuego) / Crimson College",
          "hechizos": [
            {
              "nombre": "Conjurar Sprites Carmesí / Conjure Crimson Sprites",
              "exige": 14,
              "ap": 2,
              "alcance": "3\"",
              "efecto": "Invoca D3 Sprites de fuego (+1 Power, +2 vs Flammable)."
            },
            {
              "nombre": "Bola de Fuego / Fireball",
              "exige": 18,
              "ap": 2,
              "alcance": "12\"",
              "efecto": "Ataque a distancia Power 6 que ignora Armadura y afecta en área a miniaturas en contacto."
            },
            {
              "nombre": "Ráfaga de Llamas / Flame Blast",
              "exige": 20,
              "ap": 3,
              "alcance": "Cono 6\"",
              "efecto": "Lanza un cono de llamas de Power 8 que prende fuego a la escenografía y objetivos."
            }
          ]
        },
        {
          "saber": "Colegio Zafiro (Agua y Hielo) / Sapphire College",
          "hechizos": [
            {
              "nombre": "Conjurar Sprites Zafiro / Conjure Sapphire Sprites",
              "exige": 14,
              "ap": 2,
              "alcance": "3\"",
              "efecto": "Invoca D3 Sprites de agua que repiten tiradas para destrabarse del combate."
            },
            {
              "nombre": "Marea de Asalto / Tidal Wave",
              "exige": 17,
              "ap": 2,
              "alcance": "Línea 8\"",
              "efecto": "Ola de agua que empuja 3\" e inflige ataques de Power 6 a todos los enemigos en línea recta."
            },
            {
              "nombre": "Puente de Hielo / Bridge of Ice",
              "exige": 19,
              "ap": 2,
              "alcance": "12\"",
              "efecto": "Crea una pasarela helada sobre agua o abismos permitiendo el paso de tropas."
            }
          ]
        },
        {
          "saber": "Colegio Esmeralda (Naturaleza) / Emerald College",
          "hechizos": [
            {
              "nombre": "Conjurar Sprites Esmeralda / Conjure Emerald Sprites",
              "exige": 14,
              "ap": 2,
              "alcance": "3\"",
              "efecto": "Invoca D3 Sprites de fauna con -1 a los disparos enemigos recibidos."
            },
            {
              "nombre": "Enredaderas Curativas / Healing Vines",
              "exige": 17,
              "ap": 1,
              "alcance": "6\"",
              "efecto": "Restaura D6 HP a una miniatura aliada en contacto con vegetación."
            },
            {
              "nombre": "Alma de la Bestia / Soul of the Beast",
              "exige": 21,
              "ap": 3,
              "alcance": "8\"",
              "efecto": "Toma el control de una Bestia, Monstruo o Titán enemigo usando sus 3 AP libremente."
            }
          ]
        },
        {
          "saber": "Colegio Ocre (Tierra y Piedra) / Ochre College",
          "hechizos": [
            {
              "nombre": "Conjurar Sprites Ocres / Conjure Ochre Sprites",
              "exige": 14,
              "ap": 2,
              "alcance": "3\"",
              "efecto": "Invoca D3 Sprites de piedra con 1 de Armadura natural."
            },
            {
              "nombre": "Muro de Piedra / Rock Wall",
              "exige": 16,
              "ap": 2,
              "alcance": "2\"",
              "efecto": "Levanta una barrera infranqueable de piedra de 6\" de largo hasta el final de la ronda."
            },
            {
              "nombre": "Armadura de Piedra / Stone Armour",
              "exige": 18,
              "ap": 1,
              "alcance": "Personal",
              "efecto": "Otorga Armadura Pesada al lanzador durante toda la ronda."
            },
            {
              "nombre": "Tesoros de la Ciénaga / ArcWorlde's Bounty",
              "exige": 21,
              "ap": 2,
              "alcance": "8\"",
              "efecto": "Genera D3 Fichas de Arcanita en un punto a 8\" del lanzador."
            }
          ]
        },
        {
          "saber": "Colegio Bronce (Metal y Alquimia) / Bronze College",
          "hechizos": [
            {
              "nombre": "Conjurar Sprites de Bronce / Conjure Bronze Sprites",
              "exige": 14,
              "ap": 2,
              "alcance": "3\"",
              "efecto": "Invoca D3 Sprites metálicos que recuperan D3 HP al final de cada ronda."
            },
            {
              "nombre": "Transfiguración / Transfiguration",
              "exige": 16,
              "ap": 1,
              "alcance": "12\"",
              "efecto": "Transforma un objeto de la armería de un aliado en otro del mismo coste o inferior."
            },
            {
              "nombre": "Ráfaga Alquímica / Alchemical Blast",
              "exige": 18,
              "ap": 2,
              "alcance": "8\"",
              "efecto": "Disparo Power 5; en impacto Crítico invalida un objeto del objetivo hasta la siguiente ronda."
            },
            {
              "nombre": "Avatar de Oro / Avatar of Gold",
              "exige": 21,
              "ap": 2,
              "alcance": "Personal",
              "efecto": "Transforma al Mago en estatua de oro (+2 Armadura, +2 Power melé) por 1 ronda."
            }
          ]
        },
        {
          "saber": "Colegio Ópalo (Aire y Espíritus) / Opal College",
          "hechizos": [
            {
              "nombre": "Conjurar Sprites Ópalo / Conjure Opal Sprites",
              "exige": 14,
              "ap": 2,
              "alcance": "3\"",
              "efecto": "Invoca D3 Sprites de niebla con la capacidad de Volar (Fly)."
            },
            {
              "nombre": "Aura Antinatural / Unnatural Aura",
              "exige": 16,
              "ap": 1,
              "alcance": "6\" Área",
              "efecto": "Obliga a los enemigos a 6\" a repetir Chequeos de Valentía exitosos."
            },
            {
              "nombre": "Sanguijuela Espiritual / Spirit Leech",
              "exige": 18,
              "ap": 2,
              "alcance": "6\"",
              "efecto": "El objetivo tira Valentía o pierde D3 HP, que son transferidos al lanzador."
            },
            {
              "nombre": "Hueste Espectral / Spectral Host",
              "exige": 21,
              "ap": 3,
              "alcance": "6\"",
              "efecto": "Invoca espíritus temibles que causan chequeos de terror automático a enemigos a 6\"."
            }
          ]
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
          "clase": "beast",
          "coste": 22,
          "peana_mm": 30,
          "stats": {
            "hp": 4,
            "mov": 6,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(2 AP) Dive Bomb: Power 7. Special Rules: May target Characters within 2”. After this Attack, move this Character in base contact with the target. If more Failures are rolled than Successes to Hit, this Character is Knocked Out.",
            "(1 AP) Peck: Power 3"
          ],
          "rasgos": [
            "Fly",
            "Pack Hunter",
            "Chocks Away!"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "troggle",
          "nombre": "Troggle",
          "nombre_en": "Troggle",
          "clase": "beast",
          "coste": 30,
          "peana_mm": 30,
          "stats": {
            "hp": 5,
            "mov": 5,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(2 AP) Dig Attack: Power 6. Special Rules: Must be performed whilst Burrowed. The Troggle comes out of its burrow after this Attack has taken place.",
            "(1 AP) Scrabble: Power 3"
          ],
          "rasgos": [
            "Pack Hunter",
            "Burrower"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "arcanid",
          "nombre": "Arcanid",
          "nombre_en": "Arcanid",
          "clase": "beast",
          "coste": 60,
          "peana_mm": 60,
          "stats": {
            "hp": 7,
            "mov": 7,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(2 AP) Sting: Power 7. Special Rules: A Critical Hit ignores Armour.",
            "(1 AP) Bite: Power 4"
          ],
          "rasgos": [
            "Pack Hunter",
            "Agile",
            "Flammable",
            "Web Spray",
            "Web Spinner"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "peagryph",
          "nombre": "Peagryph",
          "nombre_en": "Peagryph",
          "clase": "beast",
          "coste": 80,
          "peana_mm": 40,
          "stats": {
            "hp": 8,
            "mov": 8,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(2 AP) Featherblade: Power 6. Special Rules: This Attack may be made against targets up to 2” away, even if they aren’t in base contact. Attacks may still be made if there is a friendly Character between this Character and the target.",
            "(1 AP) Piercing Screech: Power 1. Special Rules: Affects all Characters within 6” and ignores Armour and Shields. On a Critical Hit, the target’s Move stat is halved for this Round. This does stack."
          ],
          "rasgos": [
            "Fly",
            "Agile"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "wild_unicorn",
          "nombre": "Unicornio Salvaje",
          "nombre_en": "Wild Unicorn",
          "clase": "monster",
          "coste": 80,
          "peana_mm": 50,
          "stats": {
            "hp": 8,
            "mov": 10,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(2 AP) Piercing Horn: Power 7. Special Rules: +2 Power if this Attack is made after a Charge.",
            "(1 AP) Hoof: Power 4"
          ],
          "rasgos": [
            "Agile"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "faery_dragon",
          "nombre": "Dragón Feérico",
          "nombre_en": "Faery Dragon",
          "clase": "beast",
          "coste": 100,
          "peana_mm": 40,
          "stats": {
            "hp": 14,
            "mov": 8,
            "armadura": 0,
            "ap": 4
          },
          "ataques": [
            "(2 AP) Blinding Light: Power 1. Special Rules: Affects all Characters within 6” and ignores Armour and Shields. On a Critical Hit, the target’s AP is reduced by 1 for their next Activation. This does stack.",
            "(1 AP) Bite: Power 5"
          ],
          "rasgos": [
            "Fly",
            "Agile",
            "Glittering Scales",
            "Healing Song"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "juvenile_forest_dragon",
          "nombre": "Dragón del Bosque Juvenil",
          "nombre_en": "Juvenile Forest Dragon",
          "clase": "monster",
          "coste": 150,
          "peana_mm": 60,
          "stats": {
            "hp": 15,
            "mov": 6,
            "armadura": 0,
            "ap": 5
          },
          "ataques": [
            "(2 AP) Poison Bite: Power *. Special Rules: The target receives a number of Hits equal to the amount of HP they are below their starting HP.",
            "(2 AP) Tail Swipe: Power 4. Special Rules: All Characters within 2” are targeted by this Attack. If a Critical Hit is rolled, and they on a smaller base size, the target Character is Prone.",
            "(1 AP) Sharp Claws: Power 5. Special Rules: Critical Hits ignore Armour."
          ],
          "rasgos": [
            "Split Activation",
            "Fearsome",
            "Dwindling Strength",
            "Death Throes",
            "Fungal Regeneration"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "forest_troll",
          "nombre": "Troll del Bosque",
          "nombre_en": "Forest Troll",
          "clase": "monster",
          "coste": 220,
          "peana_mm": 60,
          "stats": {
            "hp": 20,
            "mov": 5,
            "armadura": 0,
            "ap": 8
          },
          "ataques": [
            "(2 AP) Hurl: Power 4. Special Rules: If a Critical Hit is made, the target Character may be thrown D6 inches in a direction of the Troll player’s choosing. This Character is Prone.",
            "(Ranged) Boulder Lob: Power 9. Special Rules: 12” range. Requires a Medium Feat.",
            "(1 AP) Smash: Power 6. Special Rules: If a Critical Hit is rolled, if the target Character is on a smaller base size they become Prone after the Attack has been made."
          ],
          "rasgos": [
            "Split Activation",
            "Fearsome",
            "Dwindling Strength",
            "Death Throes",
            "Gobble",
            "Fungal Regeneration",
            "Ambush"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "old_grogg",
          "nombre": "Old Grogg el Troll del Río",
          "nombre_en": "Old Grogg the River Troll",
          "clase": "monster",
          "coste": 400,
          "peana_mm": 60,
          "stats": {
            "hp": 30,
            "mov": 5,
            "armadura": 0,
            "ap": 10
          },
          "ataques": [
            "(1 AP) Weighty Smash: Power 5. Special Rules: If a Crit is rolled and the target Character is on a smaller base size they become Prone after the Attack has been made.",
            "(2 AP) Launch: Power 5. Special Rules: If a Critical Hit is made, the target Character may be thrown D6 inches in a direction of the Troll player’s choosing. This Character is Prone.",
            "(2 AP) Ravenous Chomp: Power 6. Special Rules: If a Crit is rolled, Old Grogg may make a single attempt to Gobble the target for only an Easy Feat."
          ],
          "rasgos": [
            "Split Activation",
            "Fearsome",
            "Dwindling Strength",
            "Death Throes",
            "Gobble",
            "Leader of the Pack",
            "Aquatic",
            "Grizzled Hide"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "forest_dragon",
          "nombre": "Dragón del Bosque",
          "nombre_en": "Forest Dragon",
          "clase": "monster",
          "coste": 900,
          "peana_mm": 120,
          "stats": {
            "hp": 100,
            "mov": 4,
            "armadura": 0,
            "ap": 30
          },
          "ataques": [
            "(Ranged) Noxious Breath: Power 2. Special Rules: 6” range. Requires a Hard Feat. Draw a line from this Character to the target. Any Character touched by this line is also affected by this Attack. In addition, the targets suffer a number of Hits equal to the amount of HP that they are below their starting HP.",
            "(2 AP) Tail Swipe: Power 4. Special Rules: All Characters within 4” are targets of this attack. If Critical Hit is made, the target Character is thrown D6 inches in a direction of the Dragon player’s choosing. This Character is Prone.",
            "(1 AP) Talons: Power 6. Special Rules: If a Critical Hit is rolled, if the target Character is on a smaller base size they become Prone after the Attack has been made.",
            "(5 AP) Arboreal Gore: Power 15. Special Rules: Hits may be split between up to five target Characters. If a Critical Hit is rolled, the target Character suffers an extra Hit if they are the target of this Attack again this Activation."
          ],
          "rasgos": [
            "Split Activation",
            "Fearsome",
            "Dwindling Strength",
            "Death Throes",
            "Gobble",
            "Advanced Fungal Regeneration",
            "Ambush"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "arcanid_queen",
          "nombre": "Reina Arcanid",
          "nombre_en": "Arcanid Queen",
          "clase": "monster",
          "coste": 900,
          "peana_mm": 120,
          "stats": {
            "hp": 80,
            "mov": 5,
            "armadura": 0,
            "ap": 28
          },
          "ataques": [
            "(2 AP) Horrible Sting: Power 4. Special Rules: If a Critical Hit is rolled, an extra Hit is taken by the target the next time they Activate. If the target fails to Defend it, another Hit is taken in their next Activation, and so on. These additional Hits ignore Armour and Shields.",
            "(2 AP) Grasp: Power 5. Special Rules: If a Critical Hit is rolled, the Arcanid Queen may Gobble the target on an Easy Feat during this Activation.",
            "(1 AP) Mandibles: Power 5. Special Rules: Critical Hits break 1 Armour.",
            "(5 AP) Arcane Burst: Power 6. Special Rules: Affects all Characters within 2”. All Mages must pass a Bravery Test or automatically Overpower their Spells for the rest of the Round."
          ],
          "rasgos": [
            "Split Activation",
            "Fearsome",
            "Dwindling Strength",
            "Death Throes",
            "Gobble",
            "Arcanite Carapace"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": [
            "Chittering Swarm (Exige 14): All enemy Characters in base contact take 1 Hit.",
            "Summon Arcanid (Exige 18): Replace one Knocked Out Arcanid at full HP on a table edge of your choice.",
            "Silken Salve (Exige 20): The caster regains D6 HP."
          ]
        },
        {
          "id": "swamp_wyvern",
          "nombre": "Guiverno del Pantano",
          "nombre_en": "Swamp Wyvern",
          "clase": "monster",
          "coste": 900,
          "peana_mm": 120,
          "stats": {
            "hp": 100,
            "mov": 4,
            "armadura": 0,
            "ap": 30
          },
          "ataques": [
            "(5 AP) Thunderous Dive: Power 10. Special Rules: May only be used if the Swamp Wyvern is Airborne. Pick an area on the board. All Characters within 3” of this Attack are hit by this Attack. After the Attack has been made, place the Swamp Wyvern on the board in the area the Attack was made. It also takes a Power 10 Attack, and its Activation immediately ends. Rearrange any Characters that have not been Knocked Out by this Attack in base contact with the Swamp Wyvern.",
            "(2 AP) Crushing Jaws: Power 6. Special Rules: If this Attack causes the target to lose 5 or more HP, they may be Gobbled in this Activation on an Easy Feat.",
            "(2 AP) Thunderous Belch: Power 5. Special Rules: If a Critical Hit is rolled, the target Character is thrown backwards D6”.",
            "(1 AP) Stomp: Power 4"
          ],
          "rasgos": [
            "Split Activation",
            "Fearsome",
            "Dwindling Strength",
            "Death Throes",
            "Gobble",
            "Magical Spores"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "tarrasque",
          "nombre": "Tarrasque",
          "nombre_en": "Tarrasque",
          "clase": "monster",
          "coste": 1200,
          "peana_mm": 120,
          "stats": {
            "hp": 200,
            "mov": 3,
            "armadura": 0,
            "ap": 30
          },
          "ataques": [
            "(2 AP) Tail Lash: Power 4. Special Rules: All Characters within 4” are targets of this attack. If Critical Hit is made, the target Character is thrown D6 inches in a direction of the Tarrasque player’s choosing. This Character is Prone.",
            "(1 AP) Languid Chomp: Power 4",
            "(2 AP) Earthquake Stomp: Power 5. Special Rules: Hits are doubled if the Target is Prone.",
            "(5 AP) Carapace Crush: Power 20. Special Rules: Hits may be split between up to five target Characters. +1 Power if the target is Prone. The Tarrasque may only Move again on a successful Easy Feat to get up."
          ],
          "rasgos": [
            "Split Activation",
            "Fearsome",
            "Dwindling Strength",
            "Death Throes",
            "Gobble",
            "Living Lair"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "death_kiwi",
          "nombre": "Kiwi de la Muerte",
          "nombre_en": "Death Kiwi",
          "clase": "beast",
          "coste": 60,
          "peana_mm": 40,
          "stats": {
            "hp": 6,
            "mov": 7,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(2 AP) Razor Beak: Power 6. Special Rules: Critical Hits ignore Armour.",
            "(1 AP) Peck: Power 4"
          ],
          "rasgos": [
            "Agile",
            "Pack Hunter",
            "Flightless"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "death_kiwi_alpha",
          "nombre": "Kiwi de la Muerte Alfa",
          "nombre_en": "Death Kiwi Alpha",
          "clase": "beast",
          "coste": 100,
          "peana_mm": 50,
          "stats": {
            "hp": 10,
            "mov": 7,
            "armadura": 0,
            "ap": 4
          },
          "ataques": [
            "(2 AP) Vicious Peck: Power 8. Special Rules: Critical Hits ignore Armour.",
            "(1 AP) Talon Slash: Power 5"
          ],
          "rasgos": [
            "Agile",
            "Leader of the Pack",
            "Fearsome"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "fire_dragon",
          "nombre": "Dragón de Fuego",
          "nombre_en": "Fire Dragon",
          "clase": "monster",
          "coste": 1000,
          "peana_mm": 120,
          "stats": {
            "hp": 100,
            "mov": 4,
            "armadura": 0,
            "ap": 30
          },
          "ataques": [
            "(Ranged) Flaming Breath: Power 6. Special Rules: 8” range. Requires a Hard Feat. Draw a line from this Character to the target. Any Character touched by this line is also affected by this Attack. +2 Power against Flammable targets.",
            "(2 AP) Crunch: Power 6. Special Rules: If a Crit is rolled, a Gobble attempt may be made as an Easy Feat.",
            "(1 AP) Spiked Tail: Power 5. Special Rules: If a Critical Hit is rolled, break 1 Armour.",
            "(5 AP) Eruption: Power 20. Special Rules: Place a token up to 8” away. Divide the Hits from this Attack between all Characters within 3” of the token. Add an additional +2 Hits against Flammable targets."
          ],
          "rasgos": [
            "Split Activation",
            "Fearsome",
            "Dwindling Strength",
            "Death Throes",
            "Gobble"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        }
      ],
      "reglas_faccion": [],
      "armeria_exclusiva": [],
      "saberes_magicos": [
        {
          "saber": "Saber de las Arañas / Lore of Spiders & Wild Magic",
          "hechizos": [
            {
              "nombre": "Enjambre Chillón / Chittering Swarm",
              "exige": 14,
              "ap": 1,
              "alcance": "Contacto",
              "efecto": "Invocación de pequeñas arañas que infligen 1 Hit automático a enemigos en contacto."
            },
            {
              "nombre": "Invocar Arcanid / Summon Arcanid",
              "exige": 18,
              "ap": 2,
              "alcance": "6\"",
              "efecto": "Llama a una Arcanid menor para reemplazar a unidades caídas en batalla."
            }
          ]
        }
      ]
    },
    {
      "id": "swords_for_hire",
      "nombre": "Espadas de Alquiler / Swords for Hire",
      "unidades": [
        {
          "id": "mercenary_goon",
          "nombre": "Goon Mercenario",
          "nombre_en": "Mercenary Goon",
          "clase": "unit",
          "coste": 30,
          "peana_mm": 30,
          "stats": {
            "hp": 6,
            "mov": 4,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(2 AP) Wallop: Power 6. Special Rules: A Critical Hit allows the player to re-roll 1 failed Hit.",
            "(1 AP) Whack: Power 4"
          ],
          "rasgos": [
            "Expendable"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "rabbin_tood",
          "nombre": "Rabbin Tood",
          "nombre_en": "Rabbin Tood",
          "clase": "irregular",
          "coste": 65,
          "peana_mm": 30,
          "stats": {
            "hp": 10,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(2 AP) Gut Punch: Power 7. Special Rules: If a Critical Hit is rolled, reduces the Target's AP by 1 for its next Activation. This does not stack.",
            "(1 AP) Shin Kick: Power 4"
          ],
          "rasgos": [
            "Halfling Ranged Weapon",
            "Expert Poacher"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "halfling_ranged_weapon",
            "packed_lunch"
          ],
          "equipo_de_serie": [
            "Halfling Ranged Weapon"
          ],
          "hechizos": []
        },
        {
          "id": "bruno_focaccia",
          "nombre": "Bruno Focaccia",
          "nombre_en": "Bruno Focaccia",
          "clase": "elite",
          "coste": 70,
          "peana_mm": 30,
          "stats": {
            "hp": 10,
            "mov": 4,
            "armadura": 1,
            "ap": 3
          },
          "ataques": [
            "(2 AP) Flourish: Power 6. Special Rules: On a Crit, one more D6 may be rolled for this Attack.",
            "(1 AP) Feint: Power 4. Special Rules: If this Attack removes HP, the next Character who attempts to Attack Bruno must first pass an Easy Feat or lose 1HP instead."
          ],
          "rasgos": [
            "Dual Weapons",
            "Light Armour",
            "The Scarlet Blur"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Dual Weapons",
            "Light Armour"
          ],
          "hechizos": []
        },
        {
          "id": "the_explorer",
          "nombre": "El Explorador y el Diario Encantado",
          "nombre_en": "The Explorer and The Enchanted Journal",
          "clase": "mage",
          "coste": 90,
          "peana_mm": 30,
          "stats": {
            "hp": 8,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(1 AP) Clumsy Slashing: Power 4"
          ],
          "rasgos": [
            "Plot Armour",
            "The Enchanted Journal"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Plot Armour"
          ],
          "hechizos": [
            "Arcleap (Exige 14): Remove both The Explorer and the Journal from the board, even if either of them is in base contact with an enemy Character. Replace them in base contact within 6” of any table edge as they appear again",
            "Touch of Destiny (Exige 16): Choose a friendly Character on the board. For the rest of the Round, re-roll any failed dice when they are attempting Feats.",
            "Charmed Blade (Exige 18): Choose one friendly Character within 6” of the Journal. On rolls to Attack, both 5s and 6s count as Critical Hits.",
            "Arcane Knowledge (Exige 21): The Journal seems to tap into an unknown wealth of knowledge, as if it was connected to all the books of magic ever written. The caster may choose one Spell from any lore in the ArcWorlde game. This may now be successfully cast."
          ]
        },
        {
          "id": "giant_giantess",
          "nombre": "Gigante / Giganta",
          "nombre_en": "Giant/Giantess",
          "clase": "monster",
          "coste": 600,
          "peana_mm": 120,
          "stats": {
            "hp": 60,
            "mov": 5,
            "armadura": 0,
            "ap": 20
          },
          "ataques": [
            "(4 AP) Club Swing: Power 7. Special Rules: Targets every Character in Melee range. A Crit knocks a Character Prone if on a 50mm base or less.",
            "(2 AP) Big Foot: Power 6. Special Rules: Re-roll all failed Hits against Prone targets.",
            "(1 AP) Pick Up: Power 2. Special Rules: May only be used against a Character on a 40mm base or less. On a Crit, the target Character is Picked Up. They may not move, and if the Giant moves, they are taken with them and remain in base contact. To escape the target must pass a Medium Feat in their Activation."
          ],
          "rasgos": [
            "Split Activation",
            "Dwindling Strength",
            "Death Throes",
            "Fearsome",
            "Long Limbs",
            "Bellow",
            "Pick Up And…"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "jean_le_porc",
          "nombre": "Jean le Porc",
          "nombre_en": "Jean le Porc",
          "clase": "elite",
          "coste": 70,
          "peana_mm": 30,
          "stats": {
            "hp": 10,
            "mov": 4,
            "armadura": 2,
            "ap": 3
          },
          "ataques": [
            "(2 AP) Glinting Thrust: Power 6. Special Rules: +3 Power if in base contact with more than one enemy Character.",
            "(1 AP) Shield Bonk: Power 4. Special Rules: If a Crit is rolled, the player may choose to move the target 1” in a direction of their choosing. This effect only applies to targets on a 50mm base or less."
          ],
          "rasgos": [
            "Shield",
            "Heavy Armour",
            "For Honour and Glory!"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Escudo / Shield",
            "Armadura Pesada / Heavy Armour"
          ],
          "hechizos": []
        },
        {
          "id": "van_halfsing",
          "nombre": "Van Halfsing",
          "nombre_en": "Van Halfsing",
          "clase": "irregular",
          "coste": 70,
          "peana_mm": 30,
          "stats": {
            "hp": 10,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(2 AP) Stake Through the Heart: Power 6. Special Rules: If the target is Prone, and from an undead Faction (Undead Raiders, Ancient Dead or Vampires), any Damage caused is doubled.",
            "(1 AP) Crossbow Butt: Power 4",
            "(Ranged) Rapid Shot: Power 4. Special Rules: 12” range. Two Shots can be made for every successful Feat."
          ],
          "rasgos": [
            "Van Halfsing’s Crossbow",
            "Hater of the Dead"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Van Halfsing’s Crossbow"
          ],
          "hechizos": []
        },
        {
          "id": "father_griffmas",
          "nombre": "Father Griffmas",
          "nombre_en": "Father Griffmas",
          "clase": "commander",
          "coste": 120,
          "peana_mm": 30,
          "stats": {
            "hp": 12,
            "mov": 4,
            "armadura": 0,
            "ap": 4
          },
          "ataques": [
            "(2 AP) Festive Slash: Power 7. Special Rules: Each Crit allows one more D6 to be rolled.",
            "(1 AP) Sack Whack: Power 5"
          ],
          "rasgos": [
            "Two-Handed Weapon",
            "Coodolf the Griffling",
            "Griffmas Sack"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [
            "Arma a Dos Manos / Two-Handed Weapon"
          ],
          "hechizos": []
        }
      ],
      "reglas_faccion": [],
      "armeria_exclusiva": [],
      "saberes_magicos": []
    }
  ],
  "armeria_comun": [
    {
      "id": "arcanite_token",
      "nombre": "Ficha de Arcanita / Arcanite Token",
      "tipo": "Objeto / Item",
      "coste": 10,
      "efecto": "Un solo uso (One use only). Al consumirse, elige un efecto: +1 AP para la activación, +1D6 extra a cualquier tirada, lanzar un hechizo adicional, o repetir 1D6.",
      "restriccion": "Un solo uso (One use only)."
    },
    {
      "id": "shield",
      "nombre": "Escudo / Shield",
      "tipo": "Equipo / Equipment",
      "coste": 15,
      "efecto": "Si está equipado, el personaje puede repetir 1 Tirada de Defensa fallida por Ronda.",
      "restriccion": "Requiere el uso de una mano."
    },
    {
      "id": "spear",
      "nombre": "Lanza / Spear",
      "tipo": "Equipo / Equipment",
      "coste": 10,
      "efecto": "Permite realizar ataques melé a objetivos hasta a 2\" de distancia, incluso si no está en contacto de peana o si hay una miniatura aliada de por medio.",
      "restriccion": "Alcance melé ampliado a 2\"."
    },
    {
      "id": "torch",
      "nombre": "Antorcha / Torch",
      "tipo": "Objeto / Item",
      "coste": 5,
      "efecto": "El portador cuenta como Temible (Fearsome) frente a Bestias y Monstruos. Obtiene +1 al Power melé y Temible contra objetivos Inflamables. Sin embargo, los disparos enemigos contra él pueden repetir fallos en Hazañas.",
      "restriccion": "Revela la posición del portador a distancia."
    },
    {
      "id": "two_handed_weapon",
      "nombre": "Arma a Dos Manos / Two Handed Weapon",
      "tipo": "Equipo / Equipment",
      "coste": 10,
      "efecto": "Otorga +2 al Power en todos los ataques melé. Sin embargo, los Éxitos Críticos en tiradas de Defensa del portador se descartan como si fuesen fallos.",
      "restriccion": "Ocupa ambas manos."
    },
    {
      "id": "dual_weapons",
      "nombre": "Armas Dobles / Dual Weapons",
      "tipo": "Equipo / Equipment",
      "coste": 10,
      "efecto": "Permite repetir todos los resultados de \"1\" obtenidos en tiradas de ataque cuerpo a cuerpo.",
      "restriccion": "Ocupa ambas manos."
    },
    {
      "id": "light_armour",
      "nombre": "Armadura Ligera / Light Armour",
      "tipo": "Equipo / Equipment",
      "coste": 20,
      "efecto": "Otorga +1 al Valor de Armadura del personaje.",
      "restriccion": "No acumulable con otras armaduras."
    },
    {
      "id": "heavy_armour",
      "nombre": "Armadura Pesada / Heavy Armour",
      "tipo": "Equipo / Equipment",
      "coste": 35,
      "efecto": "Otorga +2 al Valor de Armadura del personaje. Sin embargo, todas las tiradas de Leg It sufren +1 a la dificultad.",
      "restriccion": "No acumulable con otras armaduras."
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
    },
    "Patas Largas / Long Legs (Pies Ligeros / Ágil)": {
      "resumen": "Extremidades inferiores alargadas adaptadas para zancadas rápidas y saltos.",
      "detalles": "Efectos: Otorga +2 al Movimiento y el rasgo Ágil (Agile), permitiendo repetir un Chequeo de Leg It fallido por ronda."
    },
    "Pelaje Camuflado / Camouflaged Pelt": {
      "resumen": "Patrón de pelaje o plumaje que mimetiza al personaje con el bosque.",
      "detalles": "Efectos: Aumenta en +1 la dificultad de tirada de Hazaña para todos los ataques a distancia dirigidos contra esta miniatura."
    },
    "Feo / Ugly": {
      "resumen": "Apariencia espantosa o temible.",
      "detalles": "Efectos: Otorga el rasgo Temible (Fearsome). Los enemigos deben superar un Chequeo de Valentía para atacarlo o trabarse en combate."
    },
    "Jinete de Monstruos / Monster Rider": {
      "resumen": "Afinidad especial para montar criaturas salvajes.",
      "detalles": "Efectos: Permite utilizar el rasgo Montura Monstruosa (Monstrous Mount) sobre cualquier Bestia, Monstruo o Titán del Bestiario."
    },
    "Cuernos y Colmillos / Horns & Tusks": {
      "resumen": "Mandíbulas prominentes o cuernos afilados de combate.",
      "detalles": "Efectos: Otorga +1 al Power en todos los ataques melé del personaje."
    },
    "Botiquín Médico / Medical Kit": {
      "resumen": "Ungüentos y vendas para curar heridas en batalla.",
      "detalles": "Efectos: Un solo uso. Al consumirse, el personaje o un aliado en contacto de peana recupera D6 HP."
    },
    "Rifle Arcloque / Arcloque Rifle": {
      "resumen": "Arma de fuego pesada alimentada por pólvora arcana.",
      "detalles": "Efectos: Disparo de Power 8, Alcance 20\". Si hay más fallos que éxitos, sufre 1 herida que ignora armadura."
    },
    "Pistola Arcloque / Arcloque Pistol": {
      "resumen": "Arma compacta de pólvora arcana para oficiales imperiales.",
      "detalles": "Efectos: Disparo de Power 7, Alcance 8\". Si fallos > éxitos, sufre 1 herida sin armadura."
    },
    "Estandarte del Grifo Imperial / Imperial Gryphon Standard": {
      "resumen": "Estandarte sagrado con el emblema del grifo imperial.",
      "detalles": "Efectos: Todos los aliados a 12\" o menos repiten Chequeos de Valentía fallidos."
    },
    "Galones de Sargento / Sergeant's Chevrons": {
      "resumen": "Insignia de mando para oficiales de tropa imperial.",
      "detalles": "Efectos: Otorga +1 a Valentía y Make Orders. Permite encadenar órdenes de oficiales superiores."
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
}

// Referencias de conveniencia para scripts y vistas web
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
