const datosMinis = {
  "version": "1.0",
  "reglas_banda": {
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
            "armadura": 0,
            "ap": 4
          },
          "ataques": [
            "Spoon Whack: (2 AP) Melee, Power 5. Regla Especial: Si se obtiene un impacto Crítico, reduce en 1 los AP del personaje objetivo en su siguiente Activación. No acumulable.",
            "Shot: (Ranged) Shot, Power 5, Alcance 12\". (Si se equipa con Arma a Distancia Halfling)."
          ],
          "rasgos": [
            "Make Orders",
            "Rousing Cheer"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [
            "montura_halfling",
            "arma_distancia_halfling",
            "almuerzo_llevar",
            "estandarte_pueblo"
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
            "armadura": 1,
            "ap": 3
          },
          "ataques": [
            "Determined Hack: (2 AP) Melee, Power 7. Regla Especial: Un impacto Crítico rompe 1 punto de Armadura.",
            "Chop: (1 AP) Melee, Power 4."
          ],
          "rasgos": [
            "Take Orders",
            "Heavy Armour",
            "Bodyguard"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "montura_halfling",
            "arma_distancia_halfling",
            "almuerzo_llevar"
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
            "Grand Cookbook"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [
            "potbelly_cauldron",
            "almuerzo_llevar"
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
            "Expert Poacher"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "almuerzo_llevar",
            "ranger_cloak"
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
            "armadura": 1,
            "ap": 3
          },
          "ataques": [
            "Catapult Shot: (Ranged) Power 8, Alcance 24\". Regla Especial: Utiliza la regla Carga Aleatoria (Payload). Requiere Hazaña Difícil para disparar.",
            "Crew Bash: (1 AP) Melee, Power 4."
          ],
          "rasgos": [
            "Crew and Payload"
          ],
          "max_por_banda": 1,
          "equipo_permitido": []
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
            "Light Armour"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [
            "imperial_mount",
            "medical_kit",
            "imperial_gryphon",
            "arcloque_rifle"
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
            "Mounted Specialist"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "imperial_mount",
            "medical_kit"
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
            "Mage"
          ],
          "max_por_banda": 1,
          "equipo_permitido": [
            "medical_kit"
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
            "Arc Energy"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "medical_kit"
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
            "Buried Horde"
          ],
          "max_por_banda": null,
          "equipo_permitido": [
            "sacred_blade",
            "circlet_of_bronze"
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
            "Swamp Born"
          ],
          "max_por_banda": 1,
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
            "Chief's Scepter: (2 AP) Melee, Power 5.",
            "Kick: (1 AP) Melee, Power 3."
          ],
          "rasgos": [
            "Clout Points",
            "Gremlin Burrows"
          ],
          "max_por_banda": 1,
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
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
          "equipo_permitido": []
        }
      ]
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = datosMinis;
} else {
  window.datosMinis = datosMinis;
}
