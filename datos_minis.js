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
            "Mystery Meat Surprise (Exige 21): The ‘piece de résistance’ (as they would say in Galanaux), this outstanding feat of culinary craft is a closely guarded secret recipe. Only the finest of gourmets can master it, and its subtle flavours and expensive ingredients are often wasted on the rabble that gobble it up greedily on the battlefield. One friendly Character within 6\" gains +2 AP and regains D6 HP."
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
          "saber": "The Grand Cookbook of Bulbo Chubb",
          "reglas_saber": "These delicious meals, created by the legendary Master Cook Bulbo Chubb himself, are often either brought to or prepared on the battlefield by the Halflings to give them strength in combat. All it takes is a little Arcanite seasoning and the dishes take up a whole new dimension of 'flavour'. The effects of these Spells do not stack and are replaced if another Spell is cast upon the same Character.",
          "hechizos": [
            {
              "nombre": "Hearty Veggie Soup",
              "exige": 14,
              "ap": null,
              "alcance": "6\"",
              "efecto": "The honest soil of Hobbleshire bestows the vegetables grown in it a distinctive, powerful flavour. Those who drink this nourishing broth say that its warmth can soothe even the most grievous of injuries. One friendly Character within 6\" regains 3 HP."
            },
            {
              "nombre": "Marvellous Mutton Stew",
              "exige": 16,
              "ap": null,
              "alcance": "6\"",
              "efecto": "Halflings are well known for keeping herds of well-bred sheep, and this stew is so scrumptious that they must have been honoured to have become mutton for it. One friendly Character within 6\" may re-roll a single failed Leg It roll this Round."
            },
            {
              "nombre": "Bullox Burgers",
              "exige": 17,
              "ap": null,
              "alcance": "6\"",
              "efecto": "Bullox are loyal beasts of burden for the Halflings, but even they can’t work forever. Thankfully they also make a cracking meal once they have… ‘retired’. One friendly Character within 6\" may re-roll all failed Defence rolls until its next Activation."
            },
            {
              "nombre": "Cocklegriff Madras",
              "exige": 20,
              "ap": null,
              "alcance": "6\"",
              "efecto": "This dish, inspired by the fragrant delicacies of Raajalan, has become a firm favourite for feisty folk to get them in the mood for a scrap. Although the violence the morning after often eclipses any that preceded it. One friendly Character within 6” gains the Fired Up Attack until the end of the Round: (1AP) Fired Up: Power - 8. Special Rules: +1 Power against Flammable targets."
            },
            {
              "nombre": "Mystery Meat Surprise",
              "exige": 21,
              "ap": null,
              "alcance": "6\"",
              "efecto": "The ‘piece de résistance’ (as they would say in Galanaux), this outstanding feat of culinary craft is a closely guarded secret recipe. Only the finest of gourmets can master it, and its subtle flavours and expensive ingredients are often wasted on the rabble that gobble it up greedily on the battlefield. One friendly Character within 6\" gains +2 AP and regains D6 HP."
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
        },
        {
          "id": "order_together",
          "faccion_id": "imperial",
          "faccion_nombre": "Imperiales",
          "nombre": "Órden: ¡Juntos! / Order: Together!",
          "etiqueta": "Comando Táctico (Imperiales)",
          "resumen": "Ataque coordinado de infantería para golpear con mayor contundencia.",
          "detalles": "Efectos: Activa hasta cuatro personajes de la misma clase juntos. Si atacan al mismo objetivo, ganan +1 al Poder (Power).",
          "restriccion": "Emitido vía Make Orders. Requiere atacar al mismo objetivo."
        },
        {
          "id": "order_hold",
          "faccion_id": "imperial",
          "faccion_nombre": "Imperiales",
          "nombre": "Órden: ¡Resistid! / Order: Hold!",
          "etiqueta": "Comando Táctico (Imperiales)",
          "resumen": "Orden de mantener la línea y resistir el pánico frente al enemigo.",
          "detalles": "Efectos: Hasta cuatro personajes de la misma clase superan automáticamente todos los Chequeos de Valentía hasta el final de la ronda.",
          "restriccion": "Emitido vía Make Orders."
        },
        {
          "id": "order_volley",
          "faccion_id": "imperial",
          "faccion_nombre": "Imperiales",
          "nombre": "Órden: ¡Salva! / Order: Volley!",
          "etiqueta": "Comando Táctico (Imperiales)",
          "resumen": "Fuego de cobertura y descargas coordinadas a distancia.",
          "detalles": "Efectos: Activa hasta cuatro personajes de la misma clase. Permite repetir cualquier tirada de Hazaña fallida en ataques a distancia.",
          "restriccion": "Emitido vía Make Orders. Aplica a ataques a distancia."
        },
        {
          "id": "order_form_up",
          "faccion_id": "imperial",
          "faccion_nombre": "Imperiales",
          "nombre": "Órden: ¡Formación! / Order: Form Up!",
          "etiqueta": "Comando Táctico (Imperiales)",
          "resumen": "Reposicionamiento táctico rápido de las tropas.",
          "detalles": "Efectos: Incluso si ya se han activado, hasta cuatro personajes de la misma clase pueden realizar un movimiento de hasta 2\" si no están en combate.",
          "restriccion": "Emitido vía Make Orders. Solo si no están en contacto de peana."
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
        },
        {
          "id": "volley_gun",
          "faccion_id": "imperial",
          "faccion_nombre": "Imperiales",
          "nombre": "Volley Gun",
          "tipo": "Equipo / Arma a Distancia",
          "coste": 40,
          "etiqueta": "Armería Imperial",
          "resumen": "Volley guns are large multi-barrelled Arcloque weapons that fire a deadly salvo of shot. However, their immense size, powerful recoil and the effort required to reload them make them difficult to wield effectively.",
          "detalles": "Efectos: The Volley Gun allows the Ogre to make this Attack: (Ranged) Volley Gun Shot: Power - 6. Special Rules: 16” range. This Attack requires a Hard Feat. Draw a line from the base of the Attacker to the Target. All Characters within 2” of this line are also targeted by this Attack. If there are more Failures than Successes when rolling to Hit, the wielder takes D3 Hits that ignores Armour.",
          "restriccion": "May only be equipped to an Imperial Ogre."
        }
      ],
      "saberes_magicos": [
        {
          "saber": "Tinkerer's Arcane Contraptions",
          "reglas_saber": "The job of the Tinkerer is to maintain the equipment of the Imperial warband. However, their manic imaginations cannot be kept idle for long, and Tinkerers often bring trunks of their curious contraptions to the battlefield. Maybe one of their arcane creations just might help?",
          "hechizos": [
            {
              "nombre": "Mechanical Griffling",
              "exige": 14,
              "ap": null,
              "alcance": "Contacto",
              "efecto": "With a whirr and a chirp, a Griffling made of polished metal springs into life. Place a Griffling (see Bestiary) in base contact with the Tinkerer that is Activated immediately after the Tinkerer’s Activation has ended. This Spell may only be used again if the Mechanical Griffling has been Knocked Out."
            },
            {
              "nombre": "Revolving Pistol",
              "exige": 16,
              "ap": null,
              "alcance": "8\"",
              "efecto": "The Tinkerer pulls out a bizarre multi-barrelled Arcloque pistol that fires many bullets one after another. The Tinkerer may make this Attack: (Ranged) Revolving Pistol - Power: 5. Special Rules: 8” range. Roll another D6 for each Successful Hit."
            },
            {
              "nombre": "Arcane Shielding",
              "exige": 17,
              "ap": null,
              "alcance": "2\"",
              "efecto": "A contraption emits an aura of blue-green light that extends around the Tinkerer and appears to deflect blows from afar. For the rest of the Round, any Character within 2” of the Tinkerer gains +1 Armour for Attacks made by Characters outside of this area."
            },
            {
              "nombre": "Homing Bullet",
              "exige": 20,
              "ap": null,
              "alcance": "Contacto",
              "efecto": "A triumph of engineering, this projectile seemingly never misses its mark. Once this Spell has been cast, in their Activation a single Character in base contact with the Tinkerer may make a single Ranged Attack that ignores cover and automatically passes its Feat roll for free."
            },
            {
              "nombre": "Magic Gobbler",
              "exige": 21,
              "ap": null,
              "alcance": "Self",
              "efecto": "A marvellous device that swallows magical energy and stores it for the Tinkerer to use. Until the Tinkerer’s next Activation, every time an enemy Character successfully casts a Spell, roll a D6. On a Success the Spell is not cast and the Tinkerer gains an Arcanite Token."
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
          "clase": "commander",
          "coste": 210,
          "peana_mm": 50,
          "stats": {
            "hp": 20,
            "mov": 4,
            "armadura": 2,
            "ap": 6
          },
          "ataques": [
            "(2 AP) Malicious Strike: Power 7. Special Rules: If more Successes are rolled than Failures, the target is knocked Prone if on a 50mm base or less.",
            "(Ranged) Malevolent Gaze: Power 4. Special Rules: 6” Range.",
            "(1 AP) Choke: Power 5. Special Rules: This Attack’s Power is not boosted by any equipped weapons. If HP is removed by this Attack, enemy models must take a Bravery Test as if the target had been Knocked Out."
          ],
          "rasgos": [
            "Heavy Armour",
            "Split Activation",
            "Monologue"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [
            "black_potion"
          ],
          "equipo_de_serie": [
            "Armadura Pesada / Heavy Armour"
          ],
          "hechizos": [
            "Lore of Villainy Spells (if Dark Warlock Trait chosen): Sickly Screech (Required Draw 14), Ominous Aura (Required Draw 17), Restless Minions (Required Draw 18), Molten Terrain (Required Draw 20), Hellfire (Required Draw 21)"
          ]
        },
        {
          "id": "hobgoblins",
          "nombre": "Hobgoblins",
          "nombre_en": "Hobgoblins",
          "clase": "unit",
          "coste": 35,
          "peana_mm": 30,
          "stats": {
            "hp": 5,
            "mov": 4,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(2 AP) Hack’n’Slash: Power 4. Special Rules: Each Critical Hit allows one more D6 to be rolled.",
            "(1 AP) Gut Stab: Power 3"
          ],
          "rasgos": [
            "Diminutive"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "black_potion",
            "dark_lord_ranged_weapon",
            "hobgoblin_mount",
            "slaver_whip"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "underling",
          "nombre": "Esbirro",
          "nombre_en": "Underling",
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
            "(2 AP) Blazing Demise: Power 6. Special Rules: Targets every Character within 2”. This Character is Knocked Out after the Attack has been executed. Only 1HP is returned to the Dark Lord who summoned them (see Firey Essence Trait) and the Dark Lord’s max HP is permanently reduced by 1 for the rest of the game (see Firey Essence Trait). +1 Damage against Flammable targets.",
            "(1 AP) Nip: Power 3"
          ],
          "rasgos": [
            "Diminutive",
            "Firey Essence"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "hellbeast",
          "nombre": "Bestia del Infierno",
          "nombre_en": "Hellbeast",
          "clase": "heavy",
          "coste": 160,
          "peana_mm": 60,
          "stats": {
            "hp": 15,
            "mov": 10,
            "armadura": 0,
            "ap": 5
          },
          "ataques": [
            "(2 AP) Swoop: Power 8. Special Rules: If a Crit is rolled, the target is Prone.",
            "(2 AP) Lift and Drop: Power 5. Special Rules: This Attack may only be made on a Character on a 30mm base size, and if the Hellbeast is not currently using Grasping Talons. On a Crit, the target is moved D6 inches in the direction of the Dark Lord player’s choosing.",
            "(1 AP) Fangs: Power 5"
          ],
          "rasgos": [
            "Fearsome",
            "Fly",
            "Split Activation",
            "Grasping Talons"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "black_potion"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "hobgoblin_honcho",
          "nombre": "Jefe Hobgoblin",
          "nombre_en": "Hobgoblin Honcho",
          "clase": "elite",
          "coste": 50,
          "peana_mm": 30,
          "stats": {
            "hp": 7,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(2 AP) Whipcrack: Power 6. Special Rules: May target any Character within 4”.",
            "(1 AP) Brutish Slash: Power 4"
          ],
          "rasgos": [
            "Slavedriver"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "black_potion",
            "dark_lord_ranged_weapon",
            "hobgoblin_mount",
            "slaver_whip"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "hobgoblin_firestarter",
          "nombre": "Pirómano Hobgoblin",
          "nombre_en": "Hobgoblin Firestarter",
          "clase": "irregular",
          "coste": 50,
          "peana_mm": 30,
          "stats": {
            "hp": 6,
            "mov": 4,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(Ranged) Flame Toss: Power 6. Special Rules: 6” Range. Each Critical Hit causes one Hit against an enemy Character within 2” of the Target.",
            "(1 AP) Firebrand: Power 4"
          ],
          "rasgos": [
            "Diminutive",
            "Arson Around",
            "Can’t Burn a Burn"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "black_potion",
            "dark_lord_ranged_weapon",
            "hobgoblin_mount",
            "slaver_whip"
          ],
          "equipo_de_serie": [
            "Antorcha / Torch"
          ],
          "hechizos": []
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
        },
        {
          "id": "hobgoblin_mount",
          "faccion_id": "dark_lords",
          "faccion_nombre": "Señores Oscuros",
          "nombre": "Hobgoblin Mount",
          "tipo": "Equipo / Montura",
          "coste": 30,
          "etiqueta": "Armería Dark Lords",
          "resumen": "Hobgoblins are a roving folk who utilise all sorts of beasts to carry themselves and their equipment. Rapid Hobgoblin riders are deadly if utilised effectively.",
          "detalles": "Efectos: If mounted, a Character gains +5HP and +4 Movement. They are Agile (see Bestiary rules) and now have a 40mm base size.",
          "restriccion": "May only be used by Hobgoblins."
        }
      ],
      "saberes_magicos": [
        {
          "saber": "Lore of Villainy",
          "reglas_saber": "Trapped for millennia within the Blasted Wastes, many Dark Lords turn their fevered minds to mastering the arts of magic. These wicked villains use their powers to great effect and are, in their opinion, unmatched by the lowly mages of other peoples.",
          "hechizos": [
            {
              "nombre": "Sickly Screech",
              "exige": 14,
              "ap": null,
              "alcance": "4\"",
              "efecto": "A foul scream erupts from the helmet of the Dark Lord, causing those around them to clutch their ears in pain. Each Character within 4” of the caster must roll a D6. On a Failure, they are at -1 AP in their next Activation. This Spell affects the caster, and its effects do not stack."
            },
            {
              "nombre": "Ominous Aura",
              "exige": 17,
              "ap": null,
              "alcance": "Self",
              "efecto": "A miasma of evil surrounds the Dark Lord, seeping into the hearts of those before them. The caster gains the Fearsome Trait until the end of the Round (see Bestiary)."
            },
            {
              "nombre": "Restless Minions",
              "exige": 18,
              "ap": null,
              "alcance": "3\"",
              "efecto": "The wickedness of the Dark Lord seeps into the minds of their unconscious subjects, bringing them back from the brink of the abyss. Place one Knocked Out Unit within 3” of the caster at 1HP."
            },
            {
              "nombre": "Molten Terrain",
              "exige": 20,
              "ap": null,
              "alcance": "8\"",
              "efecto": "The Dark Lord summons the volcanic heat of their ashen realm, forcing the very earth to melt and bubble. Pick an area with a 4” radius within 8” of the caster. Until the end of the Round, any Character who is in base contact with this area takes D6 Hits."
            },
            {
              "nombre": "Hellfire",
              "exige": 21,
              "ap": null,
              "alcance": "Cone 6\"",
              "efecto": "(21+) The Dark Lord issues forth a terrifying gout of flame, scorching all in its path. Draw a 6” line from the front base edge of the caster. All Characters within 2” of the line are targeted by an Attack with Power 8 (+2 Power vs Flammable)."
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
        },
        {
          "id": "bestial_moxie",
          "faccion_id": "beastfolk",
          "faccion_nombre": "Hombres Bestia",
          "nombre": "Bestial Moxie",
          "tipo": "Forma Animal (Animal Form)",
          "coste": 20,
          "etiqueta": "Armería Beastfolk",
          "resumen": "Some Beastfolk have never known the creep of fear in their hearts. You can decide if this is a good or bad thing.",
          "detalles": "Efectos: This Character automatically passes all Bravery Tests.",
          "restriccion": ""
        }
      ],
      "saberes_magicos": [
        {
          "saber": "Lore of Tooth and Fur",
          "reglas_saber": "Beastfolk are instinctively attuned to the energies of nature and use them to power their magic. Brandishing mystical charms and potions made from the bones of their kin, their Hedge Witches use knowledge and skill passed down for generations to weave arcane energy into a tapestry of power.",
          "hechizos": [
            {
              "nombre": "Forest Creatures",
              "exige": 14,
              "ap": null,
              "alcance": "3\"",
              "efecto": "The beasties of the woods are called up from their lairs to attack unseelie trespassers. The target Character and all Characters within 3” of them take 3 Hits."
            },
            {
              "nombre": "Warging",
              "exige": 17,
              "ap": null,
              "alcance": "Global",
              "efecto": "The Hedgewitch enters the mind of another creature and controls their every move. Once the caster has finished their Activation, nominate a friendly Beast on the board. They may immediately Activate, even if they have already done so this Round. Any Items or Equipment collected by the Beast are transferred to the caster at the end of its activation."
            },
            {
              "nombre": "Bestial Strength",
              "exige": 19,
              "ap": null,
              "alcance": "Global",
              "efecto": "With a mighty roar, the Hedgewitch harnesses the strength of a powerful creature and gifts it to one of her kin. This Spell may be cast on any Character that isn’t a Beast, Monster or Titan. The target gains +3 Power on any Melee Attacks until the caster chooses to cast another Spell."
            },
            {
              "nombre": "Shapeshift",
              "exige": 21,
              "ap": null,
              "alcance": "Self",
              "efecto": "As the air around them blurs, the Hedgewitch assumes a new form – a terrifying Monster! Replace the caster with a Monster chosen from the Bestiary. The Monster has the same AP as the caster had remaining before the Shapeshift but is otherwise identical. At the end of the Round, the caster returns to their true form with the same amount of HP as they had when the Spell was cast."
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
          "id": "grave_lord",
          "nombre": "Señor de la Tumba",
          "nombre_en": "Grave Lord",
          "clase": "commander",
          "coste": 100,
          "peana_mm": 30,
          "stats": {
            "hp": 10,
            "mov": 4,
            "armadura": 0,
            "ap": 4
          },
          "ataques": [
            "(2 AP) Spooky Aura: Power 5. Special Rules: Targets every enemy Character within 4”. May not be modified by Spells or Equipment.",
            "(1 AP) Regal Slash: Power 5"
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
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "bog_magus",
          "nombre": "Mago del Pantano",
          "nombre_en": "Bog Magus",
          "clase": "mage",
          "coste": 90,
          "peana_mm": 30,
          "stats": {
            "hp": 6,
            "mov": 4,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(1 AP) Staff Whack: Power 4"
          ],
          "rasgos": [
            "Afterlife",
            "Tar Footed"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "animal_totem",
            "ancient_dead_ranged_weapon",
            "sacred_blade",
            "familiar_jar",
            "circlet_of_bronze",
            "skeleton_trumpet",
            "vengeance_coin"
          ],
          "equipo_de_serie": [],
          "hechizos": [
            "Tar Pit (Exige 14): Place a marker on the game board. All Characters within 3” of it have their Move reduced to 1. This effect lasts until the Bog Magus is Prone or Knocked Out.",
            "Spirit Glaive (Exige 17): Can be cast upon themselves or a friendly Character within 3” and lasts until the end of the Round. Instead of losing HP a target loses 1AP from their next Activation for each 3 Damage it takes from Melee Attacks from those wielding the Spirit Glaive.",
            "Forgotten Ritual (Exige 20): All friendly Characters with the Bones Trait within 3” regain D3 HP.",
            "Justice of the Dead (Exige 21): Every enemy Character that has Knocked Out a friendly Character by the time this Spell is cast suffers D6 Hits that ignore Armour and Shields."
          ]
        },
        {
          "id": "skelt",
          "nombre": "Esqueleto",
          "nombre_en": "Skelt",
          "clase": "unit",
          "coste": 35,
          "peana_mm": 30,
          "stats": {
            "hp": 5,
            "mov": 4,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(2 AP) Rattling Strike: Power 5. Special Rules: Crit allows 1 more Hit to be rolled.",
            "(1 AP) Stab: Power 3"
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
            "familiar_jar",
            "circlet_of_bronze",
            "skeleton_trumpet",
            "vengeance_coin"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "tomb_guardian",
          "nombre": "Guardián de la Tumba",
          "nombre_en": "Tomb Guardian",
          "clase": "elite",
          "coste": 55,
          "peana_mm": 30,
          "stats": {
            "hp": 6,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(2 AP) Accomplished Swing: Power 7. Special Rules: May spend 1 more AP to add 3 Power to this Attack.",
            "(1 AP) Bash: Power 3. Special Rules: +2 Power if this Character is armed with a Shield."
          ],
          "rasgos": [
            "Afterlife",
            "Bones",
            "Buried Horde"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "animal_totem",
            "ancient_dead_ranged_weapon",
            "sacred_blade",
            "familiar_jar",
            "circlet_of_bronze",
            "skeleton_trumpet",
            "vengeance_coin"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "bone_goliath",
          "nombre": "Goliat de Hueso",
          "nombre_en": "Bone Goliath",
          "clase": "heavy",
          "coste": 180,
          "peana_mm": 60,
          "stats": {
            "hp": 18,
            "mov": 4,
            "armadura": 0,
            "ap": 5
          },
          "ataques": [
            "(2 AP) Weighty Smash: Power 8. Special Rules: If the target is on a 30 or 40mm base, on a Crit they are knocked Prone.",
            "(2 AP) Champion’s Strike: Power 7. Special Rules: If this Attack Knocks Out a Character, the Bone Goliath regains +1AP.",
            "(1 AP) Backswing: Power 5"
          ],
          "rasgos": [
            "Bones",
            "Afterlife",
            "Fearsome"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "animal_totem",
            "ancient_dead_ranged_weapon",
            "sacred_blade",
            "familiar_jar",
            "circlet_of_bronze",
            "skeleton_trumpet",
            "vengeance_coin"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "relic_spirit",
          "nombre": "Espíritu de la Reliquia",
          "nombre_en": "Relic Spirit",
          "clase": "irregular",
          "coste": 50,
          "peana_mm": 30,
          "stats": {
            "hp": 8,
            "mov": null,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(2 AP) Howling Slashes: Power 6. Special Rules: Affects all enemy Characters within 4”.",
            "(1 AP) Vengeful Screech: Power 3. Special Rules: Affects all enemy Characters within 4”."
          ],
          "rasgos": [
            "Afterlife",
            "Spirit of the Relic"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "ancient_dead_ranged_weapon",
            "sacred_blade",
            "familiar_jar",
            "circlet_of_bronze",
            "skeleton_trumpet",
            "vengeance_coin"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "barrow_hound",
          "nombre": "Sabueso del Túmulo",
          "nombre_en": "Barrow Hound",
          "clase": "beast",
          "coste": 30,
          "peana_mm": 30,
          "stats": {
            "hp": 4,
            "mov": 7,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(1 AP) Chomp: Power 5"
          ],
          "rasgos": [
            "Agile",
            "Pack Hunter",
            "Afterlife",
            "Bones"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
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
          "saber": "Lore of the Thereafter",
          "reglas_saber": "The ancient peoples of ArcWorlde were in tune with the magical energy of the land, and their powers have only grown in the afterlife. The Bog Magi tap into the unknown magics that reanimate them and their kin to help, harm and heal on the battlefield.",
          "hechizos": [
            {
              "nombre": "Tar Pit",
              "exige": 14,
              "ap": null,
              "alcance": "8\"",
              "efecto": "The Magus calls forth a pool of sticky black pitch from deep within the ground to entomb their foes as they themselves were entombed long ago. Place a marker on the game board. All Characters within 3” of it have their Move reduced to 1. This effect lasts until the Bog Magus is Prone or Knocked Out."
            },
            {
              "nombre": "Spirit Glaive",
              "exige": 17,
              "ap": null,
              "alcance": "3\"",
              "efecto": "The Mage summons an ethereal blade from the same spirit-stuff that animates them. It seems to cut through to the very soul of those it is used upon. Can be cast upon themselves or a friendly Character within 3” and lasts until the end of the Round. Instead of losing HP a target loses 1AP from their next Activation for each 3 Damage it takes from Melee Attacks from those wielding the Spirit Glaive."
            },
            {
              "nombre": "Forgotten Ritual",
              "exige": 20,
              "ap": null,
              "alcance": "3\"",
              "efecto": "The Mage reenacts a long forgotten ritual of their people, the memories and power of which reinvigorate their kin. All friendly Characters with the Bones Trait within 3” regain D3 HP."
            },
            {
              "nombre": "Justice of the Dead",
              "exige": 21,
              "ap": null,
              "alcance": "Global",
              "efecto": "The dead remember the injustices done unto them. Every enemy Character that has Knocked Out a friendly Character by the time this Spell is cast suffers D6 Hits that ignore Armour and Shields."
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
          "id": "vampire_supreme",
          "nombre": "Vampiro Supremo",
          "nombre_en": "Vampyr Supreme",
          "clase": "commander",
          "coste": 150,
          "peana_mm": 30,
          "stats": {
            "hp": 24,
            "mov": 4,
            "armadura": 0,
            "ap": 5
          },
          "ataques": [
            "(2 AP) Effortless Slash: Power 7. Special Rules: Each Crit allows one more D6 to be rolled.",
            "(1 AP) Bloody Strike: Power 5. Special Rules: Crit ignores Armour.",
            "(1 AP) Go for the Throat: Power 2. Special Rules: This Attack’s Power is not boosted by any Equipment. If HP is removed by this Attack, may re-roll any failed Enthral attempts against the target this Round."
          ],
          "rasgos": [
            "Enthral",
            "Feed"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [
            "blood_vial",
            "beguiling_temperament",
            "shapeshifter",
            "everlasting_bloodline",
            "fell_scholar",
            "crimson_knight"
          ],
          "equipo_de_serie": [
            "Vampiro Supremo / Vampyr Supreme"
          ],
          "hechizos": [
            "Lore of the Night Spells (if equipped with Fell Scholar Bloodline): Darkness (Required Draw 14), Dramatic Thunderclap (Required Draw 17), Vampiric Glare (Required Draw 20), Cloud of Bats (Required Draw 21)"
          ]
        },
        {
          "id": "vampire",
          "nombre": "Vampiro",
          "nombre_en": "Vampire",
          "clase": "elite",
          "coste": 120,
          "peana_mm": 30,
          "stats": {
            "hp": 12,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(2 AP) Effortless Slash: Power 7. Special Rules: Each Crit allows one more D6 to be rolled.",
            "(1 AP) Bloody Strike: Power 5. Special Rules: Crit ignores Armour.",
            "(1 AP) Go for the Throat: Power 2. Special Rules: This Attack’s Power is not boosted by any Equipment. If HP is removed by this Attack, may re-roll any failed Enthral attempts against the target this Round."
          ],
          "rasgos": [
            "Enthral",
            "Feed"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "blood_vial",
            "beguiling_temperament",
            "shapeshifter",
            "everlasting_bloodline",
            "fell_scholar",
            "crimson_knight"
          ],
          "equipo_de_serie": [],
          "hechizos": [
            "Lore of the Night Spells (if equipped with Fell Scholar Bloodline): Darkness (Required Draw 14), Dramatic Thunderclap (Required Draw 17), Vampiric Glare (Required Draw 20), Cloud of Bats (Required Draw 21)"
          ]
        },
        {
          "id": "manservant",
          "nombre": "Sirviente",
          "nombre_en": "Manservant",
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
            "(2 AP) Manhandle: Power 5. Special Rules: If the target is on a 30mm base, a Crit knocks them Prone.",
            "(1 AP) Club Foot: Power 4. Special Rules: +1 Power if the target is Prone."
          ],
          "rasgos": [
            "Insignificant",
            "Drag"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "thrall",
          "nombre": "Esclavo",
          "nombre_en": "Thrall",
          "clase": "irregular",
          "coste": 30,
          "peana_mm": 30,
          "stats": {
            "hp": 5,
            "mov": 4,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(1 AP) Vacant Strike: Power 4"
          ],
          "rasgos": [
            "Insignificant",
            "Mindless"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "werewolf",
          "nombre": "Hombre Lobo",
          "nombre_en": "Werewolf",
          "clase": "heavy",
          "coste": 200,
          "peana_mm": 60,
          "stats": {
            "hp": 20,
            "mov": 6,
            "armadura": 0,
            "ap": 7
          },
          "ataques": [
            "(2 AP) Raking Claws: Power 7. Special Rules: A Crit ignores and breaks 1 Armour.",
            "(2 AP) Savage: Power 5. Special Rules: Each successful Hit allows one more D6 to be rolled.",
            "(1 AP) Howl: Power 2. Special Rules: Every enemy Character within 6” is affected by this Attack. Ignores Armour. If a Character loses HP to this Attack they must make a Bravery Test."
          ],
          "rasgos": [
            "Agile",
            "Split Activation",
            "Fearsome",
            "Dwindling Strength",
            "Death Throes",
            "Curse of the Wolf"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "crypt_bat",
          "nombre": "Murciélago de la Cripta",
          "nombre_en": "Crypt Bat",
          "clase": "beast",
          "coste": 20,
          "peana_mm": 30,
          "stats": {
            "hp": 3,
            "mov": 8,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(1 AP) Nip: Power 4"
          ],
          "rasgos": [
            "Agile",
            "Fly",
            "Insignificant",
            "Flittering"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
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
          "saber": "Lore of the Night",
          "reglas_saber": "Obsessed with ancient books of lore, some Vampires dabble in dark and unseelie magic. Their centuries of study make them potent in the sorcerous arts and they delight in testing it out upon the mortals they find.",
          "hechizos": [
            {
              "nombre": "Darkness",
              "exige": 14,
              "ap": null,
              "alcance": "8\"",
              "efecto": "A pool of pitch blackness surrounds the target, and they are unable to see what danger awaits them. Choose a target Character within 8”. Until the end of this Round, they and any Character within 4” of them are at a Disadvantage when rolling to Shoot."
            },
            {
              "nombre": "Dramatic Thunderclap",
              "exige": 17,
              "ap": null,
              "alcance": "Global",
              "efecto": "With a mighty boom, peel of terrible thunder erupts from the heavens. Incredible for dramatic effect. A single friendly Character this Round may re-roll a Narrative Feat."
            },
            {
              "nombre": "Vampiric Glare",
              "exige": 20,
              "ap": null,
              "alcance": "6\"",
              "efecto": "The Vampire transfixes their prey with glowing red eyes. The target within 6” must pass a Bravery Test or be unable to Move or Attack during their next Activation."
            },
            {
              "nombre": "Cloud of Bats",
              "exige": 21,
              "ap": null,
              "alcance": "6\"",
              "efecto": "A swarm of fluttering crypt bats obscures vision and tears at enemy flesh. Summons a Crypt Bat within 6” of the caster that can Activate immediately."
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
          "id": "undead_harbinger",
          "nombre": "Harbinger No Muerto",
          "nombre_en": "Undead Harbinger",
          "clase": "commander",
          "coste": 90,
          "peana_mm": 30,
          "stats": {
            "hp": 11,
            "mov": 4,
            "armadura": 0,
            "ap": 4
          },
          "ataques": [
            "(2 AP) Swashbuckle: Power 8. Special Rules: If a Critical Hit is rolled, the target loses 1AP in its next Activation.",
            "(1 AP) Vicious Slash: Power 6. Special Rules: Critical Hits ignore Armour"
          ],
          "rasgos": [
            "Raiser of the Dead",
            "Soul Eater"
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
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "old_man_o_bones",
          "nombre": "Viejo Man'o'Bones",
          "nombre_en": "Old Man’o’Bones",
          "clase": "mage",
          "coste": 90,
          "peana_mm": 40,
          "stats": {
            "hp": 12,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(1 AP) Touch of Death: Power 3. Special Rules: Ignores Armour."
          ],
          "rasgos": [
            "Fly",
            "Crumbling Remains"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "soul_jar",
            "undead_raiders_ranged_weapon",
            "stolen_arcloque_pistol",
            "undead_mount",
            "cursed_pipes",
            "hangmans_noose"
          ],
          "equipo_de_serie": [],
          "hechizos": [
            "Deathly Chill (Required Draw 14): Choose one enemy Character within 12” of the caster. Their AP is reduced by D3 in their next Activation.",
            "Bonegnawer (Required Draw 17): Place a free Carrion Rat within 6” of the caster. It can be Activated this Round, however, if it is Knocked Out it may not be Raised.",
            "Soul Drain (Required Draw 19): The target Character takes 3 Hits that ignore Armour. For every HP lost by the target, the caster regains 1HP. This Spell may be cast on a friendly Character.",
            "Mass Resurrection (Required Draw 21): Raise up to three Units or Beasts anywhere on the game board."
          ]
        },
        {
          "id": "undead_bandit",
          "nombre": "Bandido No Muerto",
          "nombre_en": "Undead Bandit",
          "clase": "unit",
          "coste": 45,
          "peana_mm": 30,
          "stats": {
            "hp": 7,
            "mov": 4,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(2 AP) Gut’em: Power 6. Special Rules: Critical Hit ignores 1 Armour.",
            "(1 AP) Slash: Power 4"
          ],
          "rasgos": [
            "Risen"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "soul_jar",
            "undead_raiders_ranged_weapon",
            "stolen_arcloque_pistol",
            "undead_mount",
            "cursed_pipes",
            "hangmans_noose"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "undead_executioner",
          "nombre": "Verdugo No Muerto",
          "nombre_en": "Undead Executioner",
          "clase": "elite",
          "coste": 70,
          "peana_mm": 30,
          "stats": {
            "hp": 10,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(2 AP) Decapitation: Power 6. Special Rules: If the target is on a 30mm base, it is Knocked Out if it fails its first Defence Roll.",
            "(1 AP) Weighty Hack: Power 5"
          ],
          "rasgos": [
            "Risen",
            "Present Thy Neck"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "soul_jar",
            "undead_raiders_ranged_weapon",
            "stolen_arcloque_pistol",
            "undead_mount",
            "cursed_pipes",
            "hangmans_noose"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "undead_ogre",
          "nombre": "Ogro No Muerto",
          "nombre_en": "Undead Ogre",
          "clase": "heavy",
          "coste": 180,
          "peana_mm": 60,
          "stats": {
            "hp": 16,
            "mov": 4,
            "armadura": 0,
            "ap": 5
          },
          "ataques": [
            "(2 AP) Bludgeon: Power 8. Special Rules: If a Critical Hit is made against a target on a 30 or 40mm base, the target Character becomes Prone.",
            "(Ranged) Vomit: Power 4. Special Rules: 6” range. If a Critical Hit is rolled, the target must take an immediate Bravery Test.",
            "(1 AP) Stomp: Power 5. Special Rules: +2 Power if the target is Prone."
          ],
          "rasgos": [
            "Risen",
            "Fearsome",
            "Very Flammable"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "soul_jar",
            "undead_raiders_ranged_weapon",
            "stolen_arcloque_pistol",
            "undead_mount",
            "cursed_pipes",
            "hangmans_noose"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "will_o_the_wisp",
          "nombre": "Will o'the Wisp",
          "nombre_en": "Will o’the Wisp",
          "clase": "irregular",
          "coste": 70,
          "peana_mm": 30,
          "stats": {
            "hp": 6,
            "mov": 4,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(2 AP) Wychfire: Power 4. Special Rules: Effects all Characters within 3”. Ignores Armour, +1 Power if the target is Flammable.",
            "(Ranged) Ethereal Caress: Power 5. Special Rules: 6” range. Ignores Armour."
          ],
          "rasgos": [
            "Risen",
            "Fly",
            "Lure of the Light",
            "Incorporeal"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "soul_jar",
            "undead_raiders_ranged_weapon",
            "stolen_arcloque_pistol",
            "undead_mount",
            "cursed_pipes",
            "hangmans_noose"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "carrion_rat",
          "nombre": "Rata de Carroña",
          "nombre_en": "Carrion Rat",
          "clase": "beast",
          "coste": 15,
          "peana_mm": 30,
          "stats": {
            "hp": 3,
            "mov": 6,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(1 AP) Bite: Power 3",
            "(2 AP) Death Leap: Power 5. Special Rules: May target Characters within 2”. After this Attack, move this Character in base contact with the target. If more Failures are rolled than Successes to Hit, this Character is Knocked Out."
          ],
          "rasgos": [
            "Risen",
            "Flammable"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
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
          "saber": "Lore of the Damned",
          "reglas_saber": "Many Undead are kept alive by the power of their own will, their villainous hearts clinging to existence beyond the grave. Some can channel that power into vile magics, using the arcane energy to further their own wicked ends.",
          "hechizos": [
            {
              "nombre": "Deathly Chill",
              "exige": 14,
              "ap": null,
              "alcance": "12\"",
              "efecto": "The living begin to feel the chill of the grave clinging to their very bones, and their limbs become heavy and cumbersome. Choose one enemy Character within 12” of the caster. Their AP is reduced by D3 in their next Activation."
            },
            {
              "nombre": "Bonegnawer",
              "exige": 17,
              "ap": null,
              "alcance": "6\"",
              "efecto": "A scrabbling Carrion Rat is brought to unlife and flings itself at the enemy. Place a free Carrion Rat within 6” of the caster. It can be Activated this Round, however, if it is Knocked Out it may not be Raised."
            },
            {
              "nombre": "Soul Drain",
              "exige": 19,
              "ap": null,
              "alcance": "Global",
              "efecto": "The victim feels their very life essence being pulled away from them, their souls feeding the hungry Dead. The target Character takes 3 Hits that ignore Armour. For every HP lost by the target, the caster regains 1HP. This Spell may be cast on a friendly Character."
            },
            {
              "nombre": "Mass Resurrection",
              "exige": 21,
              "ap": null,
              "alcance": "Global",
              "efecto": "Raise up to three Units or Beasts anywhere on the game board."
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
          "peana_mm": 40,
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
          "peana_mm": 40,
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
          "peana_mm": 40,
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
          "peana_mm": 40,
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
          "peana_mm": 60,
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
          "peana_mm": 30,
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
          "saber": "Lore of the Darkwood",
          "reglas_saber": "The magic of the Elves in inextricably linked to the dark forests in which they dwell. The mysterious Druids siphon the life energy of their sacrificial victims and use its power to warp the wood to their will.",
          "hechizos": [
            {
              "nombre": "Tangleweed",
              "exige": 14,
              "ap": null,
              "alcance": "6\"",
              "efecto": "Barbed vines erupt from the earth and ensnare all who are unlucky enough to be in their grasp. All Characters within 6\" of the caster have their Movement and Leg It rolls reduced by 2\" until the caster’s next Spell."
            },
            {
              "nombre": "Spirit of the Forest",
              "exige": 16,
              "ap": null,
              "alcance": "12\"",
              "efecto": "The vitality of their victims fills the Druid with an unnatural vigour, and their eyes glow with the power of the dark woods. One friendly Character within 12\" gains +2 AP for their next Activation. Whilst under the effects of this Spell, the target may not receive any other bonuses from Spells."
            },
            {
              "nombre": "Ominous Whispers",
              "exige": 19,
              "ap": null,
              "alcance": "12\"",
              "efecto": "With a hissed word in an unnatural tongue, the enemies of the Elves find their minds tortured by Fae laughter and malice. One enemy Character within 12” must pass a Bravery Test. If they fail, they lose 3 HP in addition to the regular effects of failure. All enemy models within 3” of the original target, whether they passed their Bravery Test or not, must also take Bravery Tests."
            },
            {
              "nombre": "The Merciless Wood",
              "exige": 21,
              "ap": null,
              "alcance": "Global",
              "efecto": "Power 4. Special Rules: If any Characters are Knocked Out by the effects of this spell, they are replaced by a Woodfiend. This Character is controlled by the Elven player as normal and can be activated in the next Round."
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
            "ourk_ranged_weapon",
            "swamp_scrumpy",
            "pet_droggo",
            "magical_mushroom",
            "ourk_mount"
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
            "ourk_mount"
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
            "ourk_ranged_weapon",
            "swamp_scrumpy",
            "goading_fork",
            "ourk_mount"
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
            "ourk_ranged_weapon",
            "boglin_musical_instrument",
            "ourk_mount"
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
            "ourk_mount"
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
          "saber": "Lore of Delusion",
          "reglas_saber": "Ourk Dreameaters are potent Mages who are said to be able to warp the mind and channel the power of nightmares. Enveloped in cloying tendrils of smoke and with eyes glowing with an unknown vigour, they cackle wickedly as they weave their devious magics.",
          "hechizos": [
            {
              "nombre": "False Foe",
              "exige": 14,
              "ap": null,
              "alcance": "8\"",
              "efecto": "A sickly mist envelops the target, and they see enemies that may not truly be there. Range 8”. For the rest of the Round the target must pass an Easy Feat before they are able to make any Attacks."
            },
            {
              "nombre": "Stupor",
              "exige": 17,
              "ap": null,
              "alcance": "3\"",
              "efecto": "The Dreameater summons a heavy miasma around them, and those who breathe it quickly succumb to its soporific influence. All Characters within 3” of the caster fall into a deep sleep. They count as being Prone until they are either the target of an Attack or Spell or have passed a Medium Feat in their next Activation. Once they have woken up, they may Activate as normal."
            },
            {
              "nombre": "Dream Eater",
              "exige": 19,
              "ap": null,
              "alcance": "2\"",
              "efecto": "This Dreameater feasts upon the dreams of others, consuming their power with gluttonous abandon. Range 2”. This Spell may only be targeted against those under the effects of the Stupor Spell. The target loses D3 AP for their next Activation, and they are given to the caster to spend in their current Activation. In addition, the target is not woken up by this Spell."
            },
            {
              "nombre": "Inside your Mind",
              "exige": 21,
              "ap": null,
              "alcance": "4\"",
              "efecto": "The tendrils of green mist seep into the minds of the target, and the caster can control them like a living puppet. Choose a target on a 30mm or 40mm base within 4” of the caster. The caster’s Activation immediately ends, and the target is Activated, even if they have already Activated this Round. The Ourk player can spend 3AP controlling the target however they wish. Once the 3AP is spent, the game continues as normal."
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
          "id": "the_great_gremlin",
          "nombre": "El Gran Gremlin",
          "nombre_en": "The Great Gremlin",
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
            "(2 AP) Stone Hammer: Power 7. Special Rules: +3 Power if target is Prone.",
            "(1 AP) Enthusiastic Smack: Power 5. Special Rules: Crit ignores Armour.",
            "(1 AP) Kneecap: Power 5. Special Rules: +1 Power if the target is on a 40mm base or larger."
          ],
          "rasgos": [
            "Burrow Dweller",
            "Intimidating",
            "Clout Chaser"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [
            "pilfered_scran",
            "gremlin_ranged_weapon",
            "burrowing_tools_item",
            "shield_carriers",
            "pterra_wings",
            "poison_goop"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "shaman",
          "nombre": "Chamán Gremlin",
          "nombre_en": "Shaman",
          "clase": "mage",
          "coste": 60,
          "peana_mm": 30,
          "stats": {
            "hp": 6,
            "mov": 5,
            "armadura": 0,
            "ap": 3
          },
          "ataques": [
            "(2 AP) Poke in the Parts: Power 5. Special Rules: A Crit reduces the target’s Movement by 1 for the rest of the Round."
          ],
          "rasgos": [
            "Born Slippy",
            "Burrow Dweller"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "pilfered_scran",
            "gremlin_ranged_weapon",
            "burrowing_tools_item",
            "pterra_wings",
            "poison_goop"
          ],
          "equipo_de_serie": [],
          "hechizos": [
            "Chittering Bugs (Exige 14): Choose one enemy Character within 8” of the caster. For their next Activation they may not make any movement Actions as they frantically swat away the bugs.",
            "Slip and Slide (Exige 17): This Spell effects any enemy Characters that attempt a Leg It roll within 8” of the caster. If they fail, instead of becoming Prone they slide the rolled number in the opposite direction of their intended movement. This effect lasts until the end of the Round.",
            "Peek-a-Boo (Exige 20): Cackling maniacally, the Shaman’s magic makes an ally seem to pop in and out of existence, much to the frustration of the enemy. Choose one allied Character to be the target of this Spell. This Character is temporarily given the Split Activation rule (if they haven’t got it already). Until they have spent their last AP for the Round, whenever they end their Activation remove them from the game board. Place them back again in the same place when they are re-activated.",
            "Great Green Explosion (Exige 21+): Every Character within 6” of the caster takes 8 Hits, plus additional Hits for every 1 the draw is over 21. If Overpowered, in addition to losing D6 HP, the Shaman loses 1HP for every 1 the draw is over 21."
          ]
        },
        {
          "id": "gremlin_scamp",
          "nombre": "Granuja Gremlin",
          "nombre_en": "Gremlin Scamp",
          "clase": "unit",
          "coste": 20,
          "peana_mm": 30,
          "stats": {
            "hp": 5,
            "mov": 5,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(2 AP) Stabby Stab!: Power 5. Special Rules: Each Critical Hit allows one more D6 to be rolled.",
            "(1 AP) Fast Attack: Power 3"
          ],
          "rasgos": [
            "Born Slippy",
            "Burrow Dweller",
            "Diminutive"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "pilfered_scran",
            "gremlin_ranged_weapon",
            "burrowing_tools_item",
            "pterra_wings",
            "poison_goop"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "trophy_hunter",
          "nombre": "Cazador de Trofeos Gremlin",
          "nombre_en": "Trophy Hunter",
          "clase": "elite",
          "coste": 35,
          "peana_mm": 30,
          "stats": {
            "hp": 6,
            "mov": 5,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(2 AP) Wild Swing: Power 9. Special Rules: If more Failures than Successes are rolled, the Trophy Hunter is Prone after the Attack has been made.",
            "(1 AP) Frenzied Chop: Power 4"
          ],
          "rasgos": [
            "Born Slippy",
            "Burrow Dweller",
            "Trophy Frenzy"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "pilfered_scran",
            "gremlin_ranged_weapon",
            "burrowing_tools_item",
            "pterra_wings",
            "poison_goop"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "carvenhead",
          "nombre": "Carvenhead",
          "nombre_en": "Carvenhead",
          "clase": "irregular",
          "coste": 40,
          "peana_mm": 30,
          "stats": {
            "hp": 7,
            "mov": 4,
            "armadura": 1,
            "ap": 2
          },
          "ataques": [
            "(1 AP) Wooden Headbutt: Power 5"
          ],
          "rasgos": [
            "Burrow Dweller",
            "Diminutive",
            "Light Armour",
            "The Carven Idol"
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
            "Armadura Ligera / Light Armour"
          ],
          "hechizos": []
        },
        {
          "id": "jungle_troll",
          "nombre": "Troll de la Jungla",
          "nombre_en": "Jungle Troll",
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
            "(2 AP) Furious Flailing: Power 7. Special Rules: Targets every Character (friend or foe) within 2”.",
            "(2 AP) Pummel: Power 9. Special Rules: If the target is on a smaller base size, move them back 2” after this Attack has been made.",
            "(1 AP) Claw Slash: Power 6. Special Rules: If a Critical Hit is rolled, remove 1 Armour or Shield from the target."
          ],
          "rasgos": [
            "Split Activation",
            "Fearsome",
            "Dwindling Strength",
            "Death Throes",
            "Long Arms",
            "Hurl",
            "Swinger"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "pilfered_scran"
          ],
          "equipo_de_serie": [],
          "hechizos": []
        },
        {
          "id": "spitlizard",
          "nombre": "Lagarto Escupidor",
          "nombre_en": "Spitlizard",
          "clase": "beast",
          "coste": 30,
          "peana_mm": 30,
          "stats": {
            "hp": 4,
            "mov": 6,
            "armadura": 0,
            "ap": 2
          },
          "ataques": [
            "(Ranged) Poison Spit: Power 6. Special Rules: 10” range. Ignores Armour. If this Attack causes Damage, the target loses an additional 1HP at the start of their next Activation (even if it isn’t in the same Round).",
            "(1 AP) Bite: Power 4"
          ],
          "rasgos": [
            "Agile",
            "Diminutive"
          ],
          "max_por_banda": null,
          "equipo_permitido": [],
          "equipo_de_serie": [],
          "hechizos": []
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
          "saber": "Lore of Mischief",
          "reglas_saber": "The Gremlins of the Netherregions care little for arcane knowledge. Instead, their mages are blessed with an innate ability to channel their love of devilment into magical might.",
          "hechizos": [
            {
              "nombre": "Chittering Bugs",
              "exige": 14,
              "ap": null,
              "alcance": "8\"",
              "efecto": "The Shaman summons a torrent of creepy crawlies to clamber all over their foe, much to the Gremlins’ delight. Choose one enemy Character within 8” of the caster. For their next Activation they may not make any movement Actions as they frantically swat away the bugs."
            },
            {
              "nombre": "Slip and Slide",
              "exige": 17,
              "ap": null,
              "alcance": "8\"",
              "efecto": "With a whirl of their staff, the Shaman coats their foes boots with a magically slippery substance. The antics that follow are highly amusing. This Spell effects any enemy Characters that attempt a Leg It roll within 8” of the caster. If they fail, instead of becoming Prone they slide the rolled number in the opposite direction of their intended movement. This effect lasts until the end of the Round."
            },
            {
              "nombre": "Peek-a-Boo",
              "exige": 20,
              "ap": null,
              "alcance": "Self",
              "efecto": "Cackling maniacally, the Shaman’s magic makes an ally seem to pop in and out of existence, much to the frustration of the enemy. Choose one allied Character to be the target of this Spell. This Character is temporarily given the Split Activation rule (if they haven’t got it already). Until they have spent their last AP for the Round, whenever they end their Activation remove them from the game board. Place them back again in the same place when they are re-activated."
            },
            {
              "nombre": "Great Green Explosion",
              "exige": 21,
              "ap": null,
              "alcance": "6\"",
              "efecto": "(21+) Every Character within 6” of the caster takes 8 Hits, plus additional Hits for every 1 the draw is over 21. If Overpowered, in addition to losing D6 HP, the Shaman loses 1HP for every 1 the draw is over 21."
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
          "saber": "The Lore of The Crimson College",
          "reglas_saber": "Masters of the art of manipulating fire, Crimson Wizards are passionate and quick to anger over the merest perceived slight. Many a tavern in Mildaark has been set ablaze by a furious Wizard after a ruffian looked at them the wrong way. Sprites conjured by Crimson College spells have +1 Power on all Attacks, +2 if the Target is Flammable.",
          "hechizos": [
            {
              "nombre": "Conjure Crimson Sprites",
              "exige": 14,
              "ap": null,
              "alcance": "3\"",
              "efecto": "With a flick of the wrist, Sprites of flickering flame are brought to life. Place D3 Sprites within 3” of the caster. The Sprites may be Activated as normal. Sprites conjured by this Spell have +1 Power on all Attacks, +2 if the Target is Flammable. If this Spell isn’t successfully cast, the caster loses 1HP."
            },
            {
              "nombre": "Sword of Embers",
              "exige": 16,
              "ap": null,
              "alcance": "Self",
              "efecto": "A blade of pure flame appears in the hand of the caster. All Melee Attacks made by the Character are at +3 Power, and Characters who are Flammable must re-roll all Successful Defends against this weapon. The Sword of Embers may not be given or taken and is active until the Character casts another Spell. If this Spell isn’t successfully cast, the caster loses 1HP."
            },
            {
              "nombre": "Fireball",
              "exige": 18,
              "ap": null,
              "alcance": "Global",
              "efecto": "A classic spell, and one that any self-respecting Crimson Mage is all too eager to use. (Ranged) Fireball: Power - 6. Special Rules: Ignores Armour. Roll an additional Fireball Attack against every Character in base contact with the target. Characters who are Flammable must re-roll all Successful Defends. If this Spell isn’t successfully cast, the caster loses 1HP."
            },
            {
              "nombre": "Flame Blast",
              "exige": 21,
              "ap": null,
              "alcance": "4\"",
              "efecto": "With a shout, the Mage’s body exudes a wall of fire, scorching all around them. All Characters within 4” of the caster suffer D6 Wounds. Characters who are Flammable roll 2D6 and choose the highest value. If this Spell isn’t successfully cast, the caster loses 1HP."
            }
          ]
        },
        {
          "saber": "The Lore of The Sapphire College",
          "reglas_saber": "Proud and adventurous, Sapphire Wizards study the mysteries of the oceans, rivers and poles of ArcWorlde. They are found throughout the globe, sailing to uncharted waters, undiscovered coves and frozen wastes. Sprites conjured by Sapphire College spells are difficult to catch, and may re-roll failed attempts to leave Combat.",
          "hechizos": [
            {
              "nombre": "Conjure Sapphire Sprites",
              "exige": 14,
              "ap": null,
              "alcance": "3\"",
              "efecto": "With a flick of the wrist, Sprites of shimmering liquid are brought to life. Place D3 Sprites within 3” of the caster. The Sprites may be Activated as normal. Sprites conjured by this Spell are difficult to catch, and may re-roll failed attempts to leave Combat."
            },
            {
              "nombre": "Bridge of Ice",
              "exige": 16,
              "ap": null,
              "alcance": "Self",
              "efecto": "A crackling structure of ice extends from the Mage’s boots, allowing them to travel where they wish. The caster may move over any terrain or Character for the rest of their Activation. In addition, the caster may re-roll any failed attempts to leave base contact with an enemy Character."
            },
            {
              "nombre": "Storm Cloud",
              "exige": 18,
              "ap": null,
              "alcance": "Global",
              "efecto": "The Mage curses an enemy to be pursued by a miniature storm cloud, crackling with lightening. Choose an enemy Character anywhere on the board. Every time the enemy Character is Activated, they take D3 Hits that ignore Armour. This Spell lasts until the caster attempts another Spell or is Knocked Out."
            },
            {
              "nombre": "Tidal Wave",
              "exige": 21,
              "ap": null,
              "alcance": "Line D6\"",
              "efecto": "Drawing upon stores of water from deep within the ground, the mage hurls a great wave at their foes. Measure a line D6” from the caster. Any Characters within 2” of this line take 4 Hits. If the caster is within 3” of a piece of water terrain, the line distance is increased to 2D6 inches."
            }
          ]
        },
        {
          "saber": "The Lore of The Emerald College",
          "reglas_saber": "Emerald Wizards are recluses, mainly preferring the company of the beasts of ArcWorlde than others of their kind. These wandering hermits study the natural world, and the wild places are where they feel most at home. Sprites conjured by Emerald College spells blend into the underbrush, so all attempts to Shoot them are at -1.",
          "hechizos": [
            {
              "nombre": "Conjure Emerald Sprites",
              "exige": 14,
              "ap": null,
              "alcance": "3\"",
              "efecto": "With a flick of the wrist, Sprites of sparkling furs and feathers are brought to life. Place D3 Sprites within 3” of the caster. The Sprites may be Activated as normal. Sprites conjured by this Spell blend into the underbrush, so all attempts to Shoot them are at -1."
            },
            {
              "nombre": "Healing Touch",
              "exige": 16,
              "ap": null,
              "alcance": "3\"",
              "efecto": "Soft ferns extend from the caster’s fingertips and soothe the wounds of their allies. A single Character within 3” of the caster (or the caster themselves) regains D6 HP."
            },
            {
              "nombre": "Winged Swarm",
              "exige": 18,
              "ap": null,
              "alcance": "4\"",
              "efecto": "A cacophonous deluge of birds and flying insects swarm around the caster’s foes, making it impossible for them to see. Choose a point on the board. Any Characters within 4” of this point have their Movement and any Leg It rolls reduced by 2” and may not make Ranged Attacks. This Spell lasts until the caster casts another Spell or is Knocked Out."
            },
            {
              "nombre": "Soul of the Beast",
              "exige": 21,
              "ap": null,
              "alcance": "8\"",
              "efecto": "The caster reaches out to the soul of a wild creature, befriending it for a short while. The player may Activate one enemy Beast, Monster or Titan within 8” of the caster and spend 3AP however they wish. If the Beast/Monster/Titan has spent all its AP this Round, they may not be targeted by this Spell."
            }
          ]
        },
        {
          "saber": "The Lore of The Ochre College",
          "reglas_saber": "Ochre Wizards are solid, stubborn folk who delve into the very earth to study its secrets. They explore the deepest caverns and the darkest caves and have the strength and magical prowess to fight off anything they find dwelling down there. Sprites conjured by Ochre College spells are hardy and have 1 Armour.",
          "hechizos": [
            {
              "nombre": "Conjure Ochre Sprites",
              "exige": 14,
              "ap": null,
              "alcance": "3\"",
              "efecto": "With a flick of the wrist, Sprites of glinting precious ores are brought to life. Place D3 Sprites within 3” of the caster. The Sprites may be Activated as normal. Sprites conjured by this Spell are hardy and have 1 Armour."
            },
            {
              "nombre": "Rock Wall",
              "exige": 16,
              "ap": null,
              "alcance": "2\"",
              "efecto": "The ground swells and cracks, jutting forth an impenetrable wall of stone. Place a 6” long barrier up to 2” wide within 2” of the caster. This counts as Impassable Terrain and remains until the end of the Round."
            },
            {
              "nombre": "Stone Armour",
              "exige": 18,
              "ap": null,
              "alcance": "Self",
              "efecto": "The robes of the caster stiffen and crystalise, protecting them from enemy blows. The caster has Heavy Armour that lasts until the end of the Round."
            },
            {
              "nombre": "ArcWorlde’s Bounty",
              "exige": 21,
              "ap": null,
              "alcance": "8\"",
              "efecto": "The very realm gifts her treasures to the caster and their allies. Place D3 Arcanite Tokens at a point at least 8” away from the caster."
            }
          ]
        },
        {
          "saber": "The Lore of The Bronze College",
          "reglas_saber": "Bronze Mages delight in alchemy and the invention of mechanical things. Their workshops are filled with the most arcane of equipment, and their expeditions are oftentimes to seek out new materials and ingredients for their experiments. Sprites conjured by Bronze College spells tend to repair themselves, so regain D3HP at the end of each Round.",
          "hechizos": [
            {
              "nombre": "Conjure Bronze Sprites",
              "exige": 14,
              "ap": null,
              "alcance": "3\"",
              "efecto": "With a flick of the wrist, Sprites of glittering metals are brought to life. Place D3 Sprites within 3” of the caster. The Sprites may be Activated as normal. Sprites conjured by this Spell tend to repair themselves, so regain D3HP at the end of each Round."
            },
            {
              "nombre": "Transfiguration",
              "exige": 16,
              "ap": null,
              "alcance": "12\"",
              "efecto": "Materials blend and change, making something new out of something old. A friendly Character within 12” may opt to change one Item or Equipment into another from their Faction’s armoury of the same or lesser gp value."
            },
            {
              "nombre": "Alchemical Blast",
              "exige": 18,
              "ap": null,
              "alcance": "Global",
              "efecto": "The Mage hurls a bolt of warping energy at their foe, which moulds their equipment into bizarre shapes. (Ranged) Alchemical Blast: Power- 5. Special Rules: On a Crit, one piece of Equipment or Item carried by the target is useless until the following Round after this Attack has been completed."
            },
            {
              "nombre": "Avatar of Gold",
              "exige": 21,
              "ap": null,
              "alcance": "Self",
              "efecto": "The caster’s skin shimmers, turning into pure gold. Whilst in this form the caster counts as having Heavy Armour and has +2 Power to any of their Melee Attacks. However, they may not cast Spells in this state, and it lasts until the end of the Round."
            }
          ]
        },
        {
          "saber": "The Lore of The Opal College",
          "reglas_saber": "The most mysterious of the Colleges of Mt Orion, the Opal Mages delve into the secrets of the spiritual world. They are otherworldly and aloof, communing with the souls of both the living and the dead. Sprites conjured by Opal College spells float along the ground, and therefore can Fly (see Bestiary rules).",
          "hechizos": [
            {
              "nombre": "Conjure Opal Sprites",
              "exige": 14,
              "ap": null,
              "alcance": "3\"",
              "efecto": "With a flick of the wrist, Sprites of ethereal fog are brought to life. Place D3 Sprites within 3” of the caster. The Sprites may be Activated as normal. Sprites conjured by this Spell float along the ground, and therefore can Fly (see Bestiary rules)."
            },
            {
              "nombre": "Unnatural Aura",
              "exige": 16,
              "ap": null,
              "alcance": "6\"",
              "efecto": "The Mage exudes a spooky aura, unnerving all those around them. All enemy Characters within 6” must re-roll successful Bravery Tests. This Spell lasts until the end of the Round."
            },
            {
              "nombre": "Spirit Leech",
              "exige": 18,
              "ap": null,
              "alcance": "6\"",
              "efecto": "The mage draws spiritual power from the target, leaving them drained of life. A target within 6” of the caster must pass a Bravery Test, or lose D3 HP. Any HP taken is given to the caster. The caster may not increase their HP above their original number."
            },
            {
              "nombre": "Spectral Host",
              "exige": 21,
              "ap": null,
              "alcance": "1\"",
              "efecto": "The Mage calls upon the spirits of their enemies’ ancestors and turn them against them. The caster summons D3 beings that have the same stats and base size as the Unit Type of the enemy Faction, and places them within 1”. These beings are activated as normal and are controlled by the caster."
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
          "saber": "Lore of Spiders",
          "reglas_saber": "Arcanid Queens are imbued with a cunning intelligence, and the vast quantities of Arcanite within their bodies gifts them the ability to wield magical power. Spiderwitch: The Arcanid Queen may cast Spells from the Lore of Spiders. However, if a Spell Overpowers the Arcanid Queen loses 2D6HP, the Activation ends, and the Spell is not cast.",
          "hechizos": [
            {
              "nombre": "Chittering Swarm",
              "exige": 14,
              "ap": null,
              "alcance": "Contacto",
              "efecto": "The Arcanid Queen calls forth a horde of spiders, who bite at any exposed flesh. All enemy Characters in base contact take 1 Hit."
            },
            {
              "nombre": "Summon Arcanid",
              "exige": 18,
              "ap": null,
              "alcance": "Borde de Mesa",
              "efecto": "With a gesture, the Arcanid Queen calls forth another of her children to replace those fallen on the battlefield. Replace one Knocked Out Arcanid at full HP on a table edge of your choice."
            },
            {
              "nombre": "Silken Salve",
              "exige": 20,
              "ap": null,
              "alcance": "Self",
              "efecto": "The Arcanid Queen coats her wounds in Arcanite laced web, and broken skin and carapace start to knit back together. The caster regains D6 HP."
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
      "saberes_magicos": [
        {
          "saber": "Lore of the Enchanted Journal",
          "reglas_saber": "Discovered in a dusty library, the Enchanted Journal now accompanies The Explorer wherever he goes. Its pages bristle with a life of their own, and the Journal wields a great magical power that it uses readily to protect those it cares for.",
          "hechizos": [
            {
              "nombre": "Arcleap",
              "exige": 14,
              "ap": null,
              "alcance": "6\"",
              "efecto": "The Journal thwips itself and The Explorer out of this realm of existence. Remove both The Explorer and the Journal from the board, even if either of them is in base contact with an enemy Character. Replace them in base contact within 6” of any table edge as they appear again."
            },
            {
              "nombre": "Touch of Destiny",
              "exige": 16,
              "ap": null,
              "alcance": "Global",
              "efecto": "The Journal bends the very fabric of reality, and those that it favours are blessed by destiny. Choose a friendly Character on the board. For the rest of the Round, re-roll any failed dice when they are attempting Feats."
            },
            {
              "nombre": "Charmed Blade",
              "exige": 18,
              "ap": null,
              "alcance": "6\"",
              "efecto": "With a rustle of its pages, the weapon of an ally thrums with magical energy. Choose one friendly Character within 6” of the Journal. On rolls to Attack, both 5s and 6s count as Critical Hits."
            },
            {
              "nombre": "Arcane Knowledge",
              "exige": 21,
              "ap": null,
              "alcance": "Global",
              "efecto": "The Journal seems to tap into an unknown wealth of knowledge, as if it was connected to all the books of magic ever written. The caster may choose one Spell from any lore in the ArcWorlde game. This may now be successfully cast."
            }
          ]
        }
      ]
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
    },
    "Advanced Fungal Regeneration": {
      "resumen": "Permite a las criaturas regenerar sus heridas al final de cada activación si no están trabadas en combate.",
      "detalles": "Efectos: A Forest Dragon is covered in mushrooms and other fungi which heal the wounds of their host. If this Character is not in base contact with an enemy Character at the end of an Activation, it regains D3 HP. (Bestiary - Forest Dragon)"
    },
    "Ambush": {
      "resumen": "Permite mantener a la miniatura oculta en un elemento de escenografía hasta que decide revelarse.",
      "detalles": "Efectos: At the start of the game, secretly select one piece of scenery on the board that isn’t in your opponent’s deployment zone and write it down. This Character is hidden here and cannot be targeted by any Character on the board. At any point during the game, you may choose to reveal the Character, which is Activated immediately after the Active Character’s Activation has ended. (Bestiary - Forest Troll, Forest Dragon)"
    },
    "Aquatic": {
      "resumen": "Permite moverse libremente por terreno de agua y ganar bonificaciones de movimiento.",
      "detalles": "Efectos: This Character may move through any water-themed terrain as if it were Open Terrain. In addition, this Character gains +2” on any movement made in water, including Leg It rolls.\nVariante (Old Grogg - Bestiary): Old Grogg may move through water-based terrain as if it were Open Terrain. In addition, whilst in water-based terrain he gains +1” on all Movement (including Leg It rolls) and may re-roll a single dice for any Feat attempt. (Beastfolk - Kelpie / Bestiary - Old Grogg)"
    },
    "Arcanite Carapace": {
      "resumen": "Otorga protección mágica y resistencia gracias a la arcanita incrustada en el caparazón.",
      "detalles": "Efectos: The Arcanid Queen is covered in chunks of Arcanite that absorb magical energy, providing natural armour and magical protection against spell attacks. (Bestiary - Arcanid Queen)"
    },
    "Bellow": {
      "resumen": "Emite un rugido atronador que causa pruebas de valentía o altera a los enemigos cercanos.",
      "detalles": "Efectos: The Giant lets out a deafening roar. Every enemy Character within 6” must pass a Bravery Test or lose 1AP for their next Activation. (Swords for Hire - Giant/Giantess)"
    },
    "Brewboy": {
      "resumen": "Proporciona brebajes alquímicos aleatorios con potentes efectos tanto para el usuario como para sus aliados.",
      "detalles": "Efectos: At the start of their Activation, roll a D6 to see which brew the Brewzerker has been supping: 1 – Gutter Dross (loses 2AP), 2 – Tekiller (+2 Move, +3 Power on all Attacks this Activation, loses D6HP), 3 – Liquid Bread (heals D3 HP), 4 – Shroom Liquor (may re-roll one die per Feat attempt this Activation), 5 – Alechemical Blend (gains Ranged Attack Alechemical Belch: Power 4, 6” range, +2 Power vs Flammable), 6 – Loonshine (auto passes all Bravery Tests, must spend full Movement + 2 Leg It rolls towards enemy with highest HP). A friendly Character in base contact may also risk a drink on an Easy Feat. (Ourks - Brewzerker)"
    },
    "Burrower": {
      "resumen": "Permite excavar bajo tierra para evitar ataques e ignorar terreno y miniaturas.",
      "detalles": "Efectos: This creature is a skilled tunneller and can dig burrows quickly. This Character may attempt to Burrow into the ground on an Easy Feat. Whilst Burrowed, the Character cannot be targeted by Melee or Ranged Attacks, does not need to take Bravery tests and may move underneath other Characters. Whilst Burrowed, the Character may not pick up Items or engage in scenario activities. They may also not Attack, unless Special Rules dictate otherwise. A Character may come out of their burrow at any point and act as normal until they Burrow again. A Character may only Burrow into soil, sand, or any other soft material on the battlefield. (Bestiary - Troggle)"
    },
    "Can’t Burn a Burn": {
      "resumen": "Inmunidad parcial a los ataques de fuego debido a la piel hardened por el fuego.",
      "detalles": "Efectos: Years of messing about with fire have hardened the Firestarter’s skin to the point where they don’t even feel the flame anymore. Any attacks that cause extra damage to Flammable targets are at -1 Power against the Firestarter. (Dark Lords - Hobgoblin Firestarter)"
    },
    "Clout Chaser": {
      "resumen": "Sistema de puntos de influencia (Clout) que mejora o empeora los atributos del líder según sus éxitos.",
      "detalles": "Efectos: Throughout a game, the Great Gremlin will gain and lose Clout Points. Starting with 0, Clout is gained by KOing an enemy, passing a Hard Feat, dealing 6+ Damage, using Arcanite, or passing a Bravery Test (+1 each). Clout is lost by becoming Prone, failing a Hard Feat, dealing 0 Damage, or failing a Bravery Test (-1 each). At 6+ Clout: +1AP. 1 to 5 Clout: Intimidating allows 2 re-rolls. 0 Clout: normal. -1 to -5 Clout: loses Intimidating. -6 or fewer Clout: loses 1AP, Class changes from Commander to Unit, and the Gremlin with highest HP becomes Commander. (Gremlins - The Great Gremlin)"
    },
    "Collection of Tomes": {
      "resumen": "Genera tomos mágicos robados al inicio de la activación para que los usen los magos cercanos.",
      "detalles": "Efectos: Travelling Wizards collect their ‘discovered’ objects in enchanted cases and none are so precious as magical books. The Charmed Bookcase generates D3 Pilfered Tomes at the start of its Activation. Roll a D6 for each Pilfered Tome to see which College Lore it belongs to (1: Crimson, 2: Sapphire, 3: Emerald, 4: Ochre, 5: Bronze, 6: Opal). These Pilfered Tomes can be used by any Wizard or Apprentice within 3”. (Wizards - Charmed Bookcase)"
    },
    "Conduit": {
      "resumen": "Sirve como canalizador mágico para facilitar el lanzamiento de hechizos por parte del mago principal.",
      "detalles": "Efectos: The Apprentice can act as a magical conduit for their master. Spells cast by a friendly Wizard within 6” may use the Apprentice’s line of sight and range. (Wizards - Apprentice)"
    },
    "Coodolf the Griffling": {
      "resumen": "Un compañero griffling cuya linterna otorga ventaja a los disparos contra enemigos cercanos.",
      "detalles": "Efectos: Coodolf is Griffmas’ trusty companion on his nights abroad, his lantern shining in the darkness to light the way and reveal any dangers. Any Shots against enemy Characters within 6” of Father Griffmas are rolled at an Advantage. (Swords for Hire - Father Griffmas)"
    },
    "Crumbling Remains": {
      "resumen": "La miniatura pierde punto de vida en cada activación al desmoronarse paulatinamente su cuerpo.",
      "detalles": "Efectos: The tattered remnants of the Old Man’o’Bones are held together by pure will, and sometimes even this isn’t enough. This Character loses 1HP each time it is Activated. (Undead Raiders - Old Man’o’Bones)"
    },
    "Curse of the Wolf": {
      "resumen": "Representa la licantropía y la feroz transformación monstruosa del hombre lobo en combate.",
      "detalles": "Efectos: Those afflicted with the curse oftentimes look completely normal until they transform into a terrifying monster that tears your arms off. Bestows monstrous strength and ferocity in combat. (Vampires - Werewolf)"
    },
    "Drag": {
      "resumen": "Permite arrastrar a personajes inconscientes o capturados fuera del combate.",
      "detalles": "Efectos: When in their master’s castle a Manservant will pull out all the stops to make their master’s next victim feel at home. In the field they aren’t so courteous. A Manservant may move a Prone or Knocked Out Character in base contact along with them when moving for 1 extra AP. (Vampires - Manservant)"
    },
    "Dual Weapons": {
      "resumen": "Equipar dos armas otorga potencia adicional en combate cuerpo a cuerpo y dados de defensa extra.",
      "detalles": "Efectos: If equipped, a Character gets +1 Power on all Melee Attacks and gains +1 D6 to all Defence Rolls. (Common Armoury)"
    },
    "Expendable": {
      "resumen": "La caída en combate de esta miniatura prescindible no obliga a realizar chequeos de valentía a los aliados.",
      "detalles": "Efectos: When this Character is Knocked Out, friendly Characters do not need to take Bravery Tests. They are cheap goons after all! (Swords for Hire - Mercenary Goon)"
    },
    "Familiars": {
      "resumen": "Asigna un boglin como familiar para medir el alcance de los hechizos desde su posición.",
      "detalles": "Efectos: For 10GP, a Boglin can be assigned as a Familiar. They may not carry any Items or Equipment, but any Spells cast by the Dreameater can be measured from the Familiar’s position as if they were the caster. If a Familiar is Knocked Out, place an Arcanite Token on the board where they fell. (Ourks - Ourk Dreameater)"
    },
    "Feast of Magic": {
      "resumen": "Devora sprites aliados para recuperar HP y adquirir temporalmente las reglas especiales de su colegio.",
      "detalles": "Efectos: An Ensorcelled Beast is a creature of magic and sustains its form by feeding upon magical creatures. For an Easy Feat an Ensorcelled Beast may consume a friendly Sprite in base contact and regain D3HP. In addition, for the rest of the Round it gains the additional rules of the Sprites from the College Lore they were summoned from. (Wizards - Ensorcelled Beast)"
    },
    "Feed": {
      "resumen": "Se alimenta de esclavos (Thralls) aliados para curarse, viéndose forzado a hacerlo si está gravemente herido.",
      "detalles": "Efectos: A Vampire may feed on a friendly Thrall in base contact by passing an Easy Feat to regain D3 HP (the Thrall loses D3 HP). If reduced to 25% or less of starting HP (3 HP or less), the Vampire must attempt to Feed if a Thrall is within 6” at the start of their Activation. (Vampires - Vampire)"
    },
    "Firey Essence": {
      "resumen": "Permite al Dark Lord invocar esbirros (Underlings) sacrificando HP y vida máxima.",
      "detalles": "Efectos: Underlings are made from the essence of their masters, who portion off pieces of their power to bring them to life. Characters with this Trait are not deployed at the start of the game. A Dark Lord may summon them in their Activation by sacrificing 2HP and reducing their max HP by 2. Although they can be summoned multiple times, only the number of Underlings that were purchased as part of the Warband may be on the board at the same time. (Dark Lords - Underling)"
    },
    "Flightless": {
      "resumen": "Indica que la criatura es una especie de ave o grifo incapaz de volar.",
      "detalles": "Efectos: Peagryphs and Death Kiwis are flightless species that have evolved razor-sharp tails or beaks instead of wings for flight. They cannot fly over terrain features like flying creatures. (Bestiary - Peagryph, Death Kiwi)"
    },
    "Flittering": {
      "resumen": "Movimiento errático de volador que dificulta ser alcanzado por ataques a distancia.",
      "detalles": "Efectos: Crypt Bats flit and flutter frantically through the air. All Ranged Attacks against a Character with this Trait increase their Feat difficulty by 1. (Vampires - Crypt Bat)"
    },
    "For Honour and Glory!": {
      "resumen": "Permite repetir cualquier intento fallido de Hazaña Legendaria.",
      "detalles": "Efectos: Jean le Porc quests only for glory and to be remembered in epic tales. If a Legendary Feat attempt is failed, re-roll the attempt. (Swords for Hire - Jean le Porc)"
    },
    "Glittering Scales": {
      "resumen": "Las escamas deslumbrantes aumentan la dificultad de las hazañas de disparos enemigos.",
      "detalles": "Efectos: The light that reflects off the scales of the Faery Dragon makes it very difficult to see clearly. All Ranged Attacks against it are at +1 Feat difficulty. (Bestiary - Faery Dragon)"
    },
    "Grasping Talons": {
      "resumen": "Atrapa a un personaje con sus garras para transportarlo y luego soltarlo o dejarlo caer.",
      "detalles": "Efectos: The Hellbeast may choose to scoop up a Character in its long claws on an Easy Feat. The picked-up Character counts as being in Cover and may not make any movement Actions. Instead, they are moved along with the Hellbeast. They may be Activated as normal and count as in base contact with the Hellbeast and any Character that the Hellbeast is in base contact with. In the Hellbeast’s Activation, they may drop the picked-up Character at any point. If they are dropped, or the Hellbeast is Knocked Out, the picked-up Character takes D6 Hits and counts as Prone. For an Easy Feat, the Character may be placed down gently with no ill effects. (Dark Lords - Hellbeast)"
    },
    "Griffmas Sack": {
      "resumen": "Extrae regalos mágicos o comida del saco navideño mediante una Hazaña Fácil y el robo de una carta.",
      "detalles": "Efectos: For an Easy Feat, Father Griffmas may reach into his sack and give a gift to a friendly Character in base contact. Draw a card from your ArcDeck: 2 – Turnip (distracts beast/monster), 3 – Flaming Pudding (gains Agile), 4 – Boughs of Holly (enemies in base contact take 1 Hit upon Activation), 5 – Magic Stockings (gains Fly), 6 – Griffmas Carol (heals 3HP to user and all within 6”), 7 – Festive Sword (Melee Attacks with Advantage), 8 – Eggnog (re-roll 1 failure on next Feat), 9 – Griffmas Cracker (user & enemy in base contact gain D3 Arcanite each), 10 – Singing Trumpet (Broken within 12” restored), J – Nutcracker (summon toy Imperial Trooper for 1 Round), Q – Glittering Armour (+1 Armour, unbreakable), K – Griffmas Miracle (free Legendary Feat with 4D6), A – Fabled Artefact. (Swords for Hire - Father Griffmas)"
    },
    "Grizzled Hide": {
      "resumen": "Piel extremadamente dura que otorga +1 a la armadura y no se puede romper.",
      "detalles": "Efectos: Old Grogg is an ancient Troll whose hide is as thick as tanned leather. He has +1 Armour that cannot be broken. (Bestiary - Old Grogg)"
    },
    "Healing Song": {
      "resumen": "Canta una melodía mágica que restaura vida a todos los personajes cercanos.",
      "detalles": "Efectos: The call of the Faery Dragon is said to have magical healing properties. On an Easy Feat, the Faery Dragon restores 1HP to every Character within 6”. (Bestiary - Faery Dragon)"
    },
    "Hurl": {
      "resumen": "Permite coger y lanzar a personajes diminutos (Diminutive) que estén en contacto de peana.",
      "detalles": "Efectos: A Character with the Hurl Trait may pick up and throw Diminutive Characters in base contact by rolling a Feat. Target takes D6 Hits and becomes Prone if hit.\nVariante (Ourks): Pick up and throw Diminutive Characters in base contact on an Easy Feat up to 8”.\nVariante (Jungle Troll - Gremlins): May pick up Diminutive Gremlins/Boglins and throw them up to 6”.\nVariante (Forest Troll - Bestiary): On a Critical Hit with Hurl Attack, target thrown D6” and Prone. (Ourks - Chieftain, Brute / Gremlins - Jungle Troll / Bestiary - Forest Troll)"
    },
    "Incorporeal": {
      "resumen": "Forma espectral que otorga desventaja a todos los ataques a distancia recibidos.",
      "detalles": "Efectos: The ghostly form seems to fade and flicker as it floats across the land. Any Ranged Attacks against a Character with this Trait are at a Disadvantage. (Undead Raiders - Will o’the Wisp)"
    },
    "Leader of the Pack": {
      "resumen": "Permite a las criaturas aliadas cercanas utilizar el atributo de Valentía del líder.",
      "detalles": "Efectos: Some larger monsters hold a natural sway over their smaller kin. A Character with this Trait may allow Creatures on the same or smaller base size within 8” to use their Bravery stat. (Bestiary - Old Grogg, Death Kiwi Alpha)"
    },
    "Living Lair": {
      "resumen": "La criatura colosal actúa como una guarida viva sobre el campo de batalla arrastrando terreno y refugio.",
      "detalles": "Efectos: The Tarrasque is so huge that it acts as a moving piece of terrain and living lair. Friendly diminutive or beast characters may hide on or under its carapace to count as in Heavy Cover and move along with it. (Bestiary - Tarrasque)"
    },
    "Long Arms": {
      "resumen": "Brazos extremadamente largos que permiten realizar ataques cuerpo a cuerpo a 2” de distancia.",
      "detalles": "Efectos: Jungle Trolls have extremely long arms tipped with razor sharp claws. Jungle Trolls may make Melee Attacks against targets up to 2” away, even if they aren’t in base contact. Attacks may still be made if there is a friendly Character between the Character and the target. (Gremlins - Jungle Troll)"
    },
    "Magical Spores": {
      "resumen": "Esporas de hongos ricos en arcanita con efectos impredecibles al inhalarse.",
      "detalles": "Efectos: The fungi that grow upon the Swamp Wyvern’s back are enriched with Arcanite. Roll D6 when inhaled/affected: 3 – The spores make the Character feel sick and cough up phlegm: loses 1HP (and another 1HP if ending turn within 3” of Swamp Wyvern). 4 – Invigorates with energy: gains +1AP for Activation. 5 – Filled with power: re-roll failed Feats this Activation. 6 – Connected with magic: cast 1 Spell from Faction Ruleset for free (Mages cast an additional Spell for free). (Bestiary - Swamp Wyvern)"
    },
    "Mindless": {
      "resumen": "La miniatura carece de mente propia y es inmune a las pruebas de valentía y al miedo.",
      "detalles": "Efectos: Mindless thralls have no will or fear. They automatically pass all Bravery Tests and are immune to Fearsome and Intimidating rules. (Vampires - Thrall)"
    },
    "Monologue": {
      "resumen": "El jugador realiza un monólogo dramático en voz alta para ganar una tentativa de Hazaña Fácil gratis.",
      "detalles": "Efectos: At the start of their Activation, a Dark Lord may perform a dramatic monologue. If you (the player) perform a monologue out loud, gain a free Easy Feat attempt. If you do not wish to perform a monologue, roll a free Easy Feat attempt instead. Only one Monologue may be attempted per Round, lest the Dark Lord’s audience grow weary of their bombast. (Dark Lords - Dark Lord)"
    },
    "Monstrous Mount": {
      "resumen": "Permite montar sobre cualquier Bestia, Monstruo o Titán en la batalla.",
      "detalles": "Efectos: Some Beastfolk have a particular affinity with the creatures of ArcWorlde and can convince them to ride atop them into battle. May use the Monstrous Mount Trait (see Bestiary) on any Beast, Monster or Titan. (Wild Elves - Briarbeast / Beastfolk - Packmaster)"
    },
    "Mysterious Herbs": {
      "resumen": "La bruja lleva hierbas místicas para curar heridas o potenciar habilidades mágicas.",
      "detalles": "Efectos: The Hedgewitch carries a pouch of rare Mildaark herbs. Once per Round, she may consume a herb on an Easy Feat to heal D3 HP or add +2 Power to her next Spell. (Beastfolk - Hedgewitch)"
    },
    "Pick Up And…": {
      "resumen": "Permite al gigante coger a un personaje de peana pequeña y ejecutar acciones brutales con él.",
      "detalles": "Efectos: On a Critical Hit with Pick Up Attack, the target is Picked Up. In subsequent Activations, roll a D6 for Pick Up And…: 4 – Rummage (steal 1 Item/Gear), 5 – Squirrel Away (target cannot Activate until next Round), 6 – Smush (target takes 2D6 Hits). To escape, target must pass a Medium Feat. (Swords for Hire - Giant/Giantess)"
    },
    "Plot Armour": {
      "resumen": "Protección de guión que impide ser objetivo de ataques o hechizos hasta ser el último superviviente.",
      "detalles": "Efectos: The Explorer is protected by the fabric of fate itself. He cannot be targeted by enemy Attacks or Spells unless he is the last surviving friendly Character on the game board. (Swords for Hire - The Explorer)"
    },
    "Present Thy Neck": {
      "resumen": "El verdugo ejecuta ataques devastadores de decapitación contra objetivos de peana pequeña.",
      "detalles": "Efectos: Executioners specialize in swift decapitation. If the target is on a 30mm base size and fails its first Defence Roll against the Executioner's Decapitation Attack, it is Knocked Out immediately. (Undead Raiders - Undead Executioner)"
    },
    "Sacrifice": {
      "resumen": "Permite sacrificar vida de aliados o la propia para obtener energía mágica y bonificaciones.",
      "detalles": "Efectos: The Wild Elves siphon life energy for power. A Character with Sacrifice may inflict D3 Damage on a friendly Character in base contact to gain +2 AP or add +2 Power to an Attack/Spell.\nVariante (Sacrificial Blade Gear): Grants the Sacrifice Trait. If already possessed, allows re-rolling 1 failed Sacrifice attempt per Round. (Wild Elves - Warchief, Druid)"
    },
    "Shield": {
      "resumen": "El escudo otorga la capacidad de repetir una tirada de defensa fallida por ronda.",
      "detalles": "Efectos: If equipped, a Character may re-roll one failed Defence Roll per Round. (Common Armoury)"
    },
    "Shifting Forms": {
      "resumen": "Permite alterar la forma física para adaptarse a la cobertura o cambiar de movimiento.",
      "detalles": "Efectos: Woodfiends are composed of shifting bark and vines. They may blend into forest terrain to count as Heavy Cover and re-roll failed Leg It rolls while in Woodland terrain. (Wild Elves - Woodfiend)"
    },
    "Soul Eater": {
      "resumen": "Devora las almas de las criaturas caídas cercanas para recuperar puntos de vida.",
      "detalles": "Efectos: Whenever an enemy Character is Knocked Out within 6” of the Harbinger, the Harbinger immediately regains D3 HP. (Undead Raiders - Undead Harbinger)"
    },
    "Sticky Fingers": {
      "resumen": "Permite robar objetos a personajes tumbados sin necesidad de tiradas de prueba.",
      "detalles": "Efectos: Boglins have an aptitude for relieving folk of their possessions. When attempting to take a Prone Character’s Items, they do so without having to roll an Easy Feat. They may also attempt to take Equipment on a Medium Feat. (Ourks - Boglin)"
    },
    "Stinky Beast": {
      "resumen": "Pestilencia insoportable que obliga a bestias y monstruos a pasar pruebas de valentía para acercarse.",
      "detalles": "Efectos: Swamp Critters have a very potent pong that protects them against creatures with sensitive noses. If a Beast, Monster or Titan wishes to move within 3” of a Swamp Critter they must first pass a Bravery Test. If failed, they may not voluntarily move within 3” of the Swamp Critter that Round. (Ourks - Swamp Critter)"
    },
    "Student of Magic": {
      "resumen": "Permite al aprendiz lanzar hechizos del saber de su colegio robando un máximo de 2 cartas.",
      "detalles": "Efectos: May cast Spells from the Lore of their College, drawing a maximum of 2 cards. (Wizards - Apprentice)"
    },
    "Summoner": {
      "resumen": "Permite convocar criaturas del bosque (Lichenhawk, Woodfiend) al campo de batalla.",
      "detalles": "Efectos: Wild Elves with this Trait can perform rituals to summon woodland allies. On a Medium Feat, place a Lichenhawk or Woodfiend within 3” of the Summoner that can Activate in the same Round.\nVariante (Warchief/Druid/Warrior/Blademaster): Allows summoning Lichenhawks and Woodfiends using blood magic rituals. (Wild Elves - Warchief, Druid, Warrior, Blademaster)"
    },
    "Swinger": {
      "resumen": "Permite balancearse por los árboles y elementos de terreno para avanzar rápidamente.",
      "detalles": "Efectos: Jungle Trolls use their long arms to swing through foliage. They may move over or through Scenery and Woodland terrain features without movement penalty and ignore Difficult Terrain. (Gremlins - Jungle Troll)"
    },
    "The Carven Idol": {
      "resumen": "Estatua sagrada que otorga repeticiones de tiradas a los habiliantes de madrigueras cercanos.",
      "detalles": "Efectos: Every Character with the Burrow Dweller Trait that starts their Activation within 3” of the Carvenhead gains one re-roll per Round. This radius is increased by 1” for every piece of Equipment that is willingly given to the Carvenhead by a friendly Character (while held). If the re-roll is used to help pass a Bravery Test, two re-rolls may be made. (Gremlins - Carvenhead)"
    },
    "The Enchanted Journal": {
      "resumen": "El diario flotante que acompaña al explorador y desde el que se miden sus hechizos.",
      "detalles": "Efectos: The Explorer is always accompanied by his Enchanted Journal, which flaps along beside him on his adventures. The Enchanted Journal is a Character on a 30mm base. It has no stats, cannot be Knocked Out and cannot interact with any objectives. It may move up to 6” each time the Explorer is Activated. The Journal may cast Spells from the Lore of the Enchanted Journal. All Spells are cast from the position of the Journal and use its line of sight. Any HP lost due to Overpowering Spells is dealt to the Explorer. (Swords for Hire - The Explorer)"
    },
    "Thirst of the Forest": {
      "resumen": "Absorbe la sangre de las víctimas caídas para fortalecer sus espinas y estructura.",
      "detalles": "Efectos: When an enemy is Knocked Out in base contact with the Briarbeast, the Briarbeast absorbs their vitality and regains D6 HP while gaining +1 Power on its next Attack. (Wild Elves - Briarbeast)"
    },
    "Thorned": {
      "resumen": "Piel cubierta de espinas afiladas que inflige daño a los atacantes en combate cuerpo a cuerpo.",
      "detalles": "Efectos: The Briarbeast is covered in razor-sharp thorns. Any Character that makes a Melee Attack against the Briarbeast takes 1 Hit for each failed Hit roll. (Wild Elves - Briarbeast)"
    },
    "Trophy Frenzy": {
      "resumen": "Aumenta los AP del cazador por cada enemigo dejado fuera de combate, perdiéndolos si cae tumbado.",
      "detalles": "Efectos: Collecting trophies from their defeated foes riles these Gremlins into even more of a frenzy. For each Character the Trophy Taker Knocks Out, their total AP is increased by 1. Their total AP is reduced back to 2 if they ever become Prone. (Gremlins - Trophy Hunter)"
    },
    "Two-Handed Weapon": {
      "resumen": "Arma a dos manos pesada que otorga +2 de potencia pero descarta los éxitos críticos de defensa.",
      "detalles": "Efectos: If equipped, a Character gets +2 Power for all Melee Attacks. However, any of their own Critical Defends are discarded as if they were Failures. (Common Armoury)"
    },
    "Very Flammable": {
      "resumen": "Extremadamente vulnerable al fuego, sufriendo impactos y heridas adicionales por llamas.",
      "detalles": "Efectos: Characters with this Trait take double Damage from any fire-based Attacks, Spells or Weapons, and must re-roll successful Defence Rolls against them. (Undead Raiders - Undead Ogre)"
    },
    "Web Spinner": {
      "resumen": "Permite transformar terreno abierto en terreno difícil o impassable mediante telarañas.",
      "detalles": "Efectos: Whilst in Open Terrain, this Character can attempt a Medium Feat to turn a radius of 3” into Difficult Terrain. If this Character is in Difficult Terrain it may attempt a Hard Feat to turn it into Impassable Terrain. This effect lasts until the end of the Round. (Bestiary - Arcanid)"
    },
    "Web Spray": {
      "resumen": "Dispara telarañas para reducir a la mitad el movimiento del objetivo durante la ronda.",
      "detalles": "Efectos: This Character may attempt a Medium Feat to target a single enemy Character on a 60mm base or less within 8”. If successful, this causes no damage, but the Movement of the target is halved for the rest of the Round. The effects of this Trait stack. (Bestiary - Arcanid)"
    },
    "Tripulación / Crew": {
      "resumen": "Asistencia de la milicia para alimentar de acción a la catapulta.",
      "detalles": "Efectos: Si hay miembros de la Halfling Militia en contacto de peana con el Thing-Flinger, durante su activación pueden donar sus Puntos de Acción (AP) no utilizados al Thing-Flinger."
    },
    "Carga Aleatoria / Random Payload": {
      "resumen": "Disparo de proyectiles caóticos con diversos efectos según la tirada.",
      "detalles": "Efectos: Antes de intentar la Hazaña Difícil para disparar FIRE!, tira 1D6: (1) Unfortunate Crew: lanza un miliciano al objetivo dándole D6 Hits y Prone; (2) Rotten Veggies: terreno difícil a 3\"; (3) Knives & Forks: -2 Power pero ignora armadura; (4) Farmyard Friends: D3 Hits a 3\"; (5) Honest Stone: +4 Power; (6) Bomb Brew: Prone al objetivo y personajes a 3\"."
    },
    "Trampas / Traps": {
      "resumen": "Colocación de cepos y trampas mortales para detener monstruos y enemigos.",
      "detalles": "Efectos: Una vez por activación, puede intentar una Hazaña Media para colocar un marcador de trampa a 2\". Cualquier personaje a 2\" o menos del marcador debe superar una Hazaña Media o activar la trampa y sufrir 6 Hits."
    },
    "Morder y Agarrarse / Cling On": {
      "resumen": "Presa tenaz del sabueso sobre monstruos y titanes.",
      "detalles": "Efectos: Si realiza un ataque exitoso sobre un Monstruo o Titán en contacto de peana, la víctima sufre un ataque de Bite (Power 5) cada vez que se active. Si el Trollhound es atacado y falla 1D6, pierde el agarre."
    },
    "Cazador Furtivo Experto / Expert Poacher": {
      "resumen": "Precisión legendaria con arco contra grandes bestias y recolección de raciones.",
      "detalles": "Efectos: Al realizar ataques a distancia contra Bestias, Monstruos o Titanes, tira 2D6 para apuntar (elige el más alto) e ignora coberturas. Obtiene Packed Lunches al noquear a estas criaturas (1 por Bestia, 2 por Monstruo, 5 por Titán)."
    },
    "El Borrón Escarlata / The Scarlet Blur": {
      "resumen": "Destreza en duelo para esquivar ataques cuando combate mano a mano.",
      "detalles": "Efectos: Si solo hay un personaje enemigo en contacto de peana, Bruno puede repetir todas sus tiradas de Defensa fallidas."
    },
    "Odiador de los Muertos / Hater of the Dead": {
      "resumen": "Furia sagrada que inflige daño aumentado a todas las criaturas no-muertas.",
      "detalles": "Efectos: Otorga +1 al Poder (Power) en todos los ataques contra personajes de las facciones Undead Raiders, Ancient Dead o Vampires. Además, su ataque Stake Through the Heart duplica el daño contra no-muertos Tumbados (Prone)."
    },
    "Ballesta de Van Halfsing / Van Halfsing's Crossbow": {
      "resumen": "Ballesta de repetición artesanal para acribillar a los no-muertos.",
      "detalles": "Efectos: Otorga el ataque a distancia Rapid Shot (Power 4, Alcance 12\"). Por cada tirada de Hazaña exitosa realizada para disparar, realiza dos disparos."
    },
    "Líderes de Hombres / Leaders of Men": {
      "resumen": "Aura de mando del Capitán que inspira disciplina a los soldados.",
      "detalles": "Efectos: Todos los personajes con Take Orders a 10\" o menos del Capitán utilizan su atributo de Valentía (Valor 9)."
    },
    "Especialista Montado / Mounted Specialist": {
      "resumen": "Carga de caballería devastadora impulsada por los Dragoons.",
      "detalles": "Efectos: Si el personaje está montado, gana +1 al Poder (Power) en todos sus ataques si realiza una Carga en esa activación."
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
