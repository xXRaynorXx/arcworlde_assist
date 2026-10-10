const datosReglas = {
  "juego": "ArcWorlde (Segunda Edición)",
  "version_reglas": "2.2",
  "secuencia_turno": [
    {
      "id_fase": "fase_1_inicio_ronda",
      "nombre": "1. Inicio de Ronda",
      "descripcion": "Fase preparatoria y eventos ambientales globales antes de la activación de personajes.",
      "acciones": [
        {
          "id": "evento_arcdeck",
          "nombre": "Robar Carta del ArcDeck (Entorno)",
          "coste_ap": 0,
          "tipo_tirada": "Robo de Carta (1D54)",
          "resumen": "Determina el evento o clima mágico que afectará a la mesa durante esta ronda.",
          "detalles": "Se roba la carta superior del ArcDeck y se consulta la tabla del entorno activo (ej. Bosque de Mildaark o Vauhaemia). Los Jokers y figuras (J, Q, K) desencadenan efectos mayores."
        },
        {
          "id": "recuperar_prone_gratis",
          "nombre": "Levantarse de Prone (Automático)",
          "coste_ap": 0,
          "tipo_tirada": "Ninguna",
          "resumen": "Un personaje que comenzó la ronda tumbado se pone de pie gratis al activarse.",
          "detalles": "Si el personaje cayó Prone en la ronda anterior y sigue en el suelo al iniciar la nueva ronda, recupera la posición de pie al comienzo de su activación sin gastar AP."
        },
        {
          "id": "tirada_iniciativa",
          "nombre": "Tirada de Iniciativa",
          "coste_ap": 0,
          "tipo_tirada": "1D6 opuesto",
          "resumen": "Determina qué jugador activa la primera miniatura de la ronda.",
          "detalles": "Cada jugador tira 1D6. El número más alto elige quién activa primero. En caso de empate, se repite la tirada entre los empatados."
        }
      ]
    },
    {
      "id_fase": "fase_2_activaciones",
      "nombre": "2. Fase de Activaciones",
      "descripcion": "Los jugadores alternan activando 1 miniatura a la vez. Cada miniatura usa sus AP en acciones.",
      "categorias": [
        {
          "id_categoria": "movimiento",
          "nombre_categoria": "Movimiento y Posicionamiento",
          "acciones": [
            {
              "id": "movimiento_gratuito",
              "nombre": "Movimiento Gratuito Base",
              "coste_ap": 0,
              "tipo_tirada": "Ninguna",
              "resumen": "Desplazamiento gratis de hasta el atributo de Movimiento (Movement) en pulgadas.",
              "detalles": "Se puede usar en cualquier momento de la activación (antes o después de hacer acciones). Incompatible si el personaje está Prone o Engaged en combate."
            },
            {
              "id": "correr_legit",
              "nombre": "Correr (Legging It)",
              "coste_ap": 1,
              "tipo_tirada": "1D6",
              "resumen": "Ganar movimiento adicional tras agotar el movimiento gratuito.",
              "detalles": "El personaje avanza las pulgadas indicadas en el D6. Si saca un 6, el personaje tropieza, no avanza ninguna pulgada y cae inmediatamente al suelo en estado Prone.",
              "restriccion": "Solo se puede declarar si aún no se ha realizado ninguna otra Acción en la activación."
            },
            {
              "id": "cargar",
              "nombre": "Cargar (Charge)",
              "coste_ap": 1,
              "tipo_tirada": "1D6 (Legging It)",
              "resumen": "Entrar en contacto de peana con un enemigo usando Legging It.",
              "detalles": "Si el movimiento de Legging It te pone en contacto de peana con un rival, cuenta como Carga. Otorga +1 AP inmediatamente para esta activación."
            },
            {
              "id": "destrabarse",
              "nombre": "Destrabarse de Combate (Disengage)",
              "coste_ap": "Variable (AP invertidos)",
              "tipo_tirada": "Hazaña (Feat)",
              "resumen": "Liberarse de enemigos en combate cuerpo a cuerpo para poder moverte.",
              "dificultad_escalada": [
                "1 enemigo trabado = Hazaña Fácil (1 Éxito)",
                "2 enemigos trabados = Hazaña Media (2 Éxitos)",
                "3 enemigos trabados = Hazaña Difícil (3 Éxitos)",
                "4+ enemigos trabados = Hazaña Legendaria (4 Éxitos)"
              ],
              "detalles": "Si la tirada falla, el personaje NO se mueve y sufre 1 punto de daño automático (pierde 1 HP) por cada enemigo que esté en contacto de peana con él."
            },
            {
              "id": "levantarse_prone_ap",
              "nombre": "Levantarse de Prone (Misma Ronda)",
              "coste_ap": "1 o más AP",
              "tipo_tirada": "Hazaña Fácil (1 Éxito)",
              "resumen": "Intentar ponerse de pie en la misma ronda en la que caíste tumbado.",
              "detalles": "Requiere superar una Hazaña Fácil (un dado con resultado 4, 5 o 6)."
            }
          ]
        },
        {
          "id_categoria": "combate_cac",
          "nombre_categoria": "Combate Cuerpo a Cuerpo (Melee)",
          "acciones": [
            {
              "id": "ataque_melee",
              "nombre": "Ataque Cuerpo a Cuerpo",
              "coste_ap": "Según la ficha (ej. 1 AP o 2 AP)",
              "tipo_tirada": "Potencia (Power D6) vs Armadura y Defensa",
              "resumen": "Atacar a un objetivo en contacto de peana.",
              "pasos_resolucion": [
                "1. Tirada de Potencia: Tiras tantos D6 como el valor Power del ataque. Cada 4+ es un Impacto. Los 6s son Críticos (2 Impactos).",
                "2. Reducción por Armadura: Se restan los puntos de Armadura del defensor al total de Impactos.",
                "3. Tirada de Defensa: El defensor tira 1D6 por cada Impacto restante (éxito en 4+ defiende 1 impacto, 6 defiende 2)."
              ]
            },
            {
              "id": "ayudar_aliado_prone",
              "nombre": "Levantar a un Aliado Tumbado",
              "coste_ap": "1 o más AP",
              "tipo_tirada": "Hazaña (Feat)",
              "resumen": "Un personaje activo ayuda a ponerse de pie a un aliado en contacto de peana.",
              "detalles": "Hazaña Fácil (1 Éxito) si el aliado tiene una peana igual o menor. Hazaña Media (2 Éxitos) si el aliado tiene una peana mayor."
            }
          ]
        },
        {
          "id_categoria": "combate_distancia",
          "nombre_categoria": "Combate a Distancia (Ranged)",
          "acciones": [
            {
              "id": "disparo_shot",
              "nombre": "Disparar (Taking a Shot)",
              "coste_ap": "Variable (1 o más AP a elección)",
              "tipo_tirada": "Hazaña Fácil (Apuntar) + Potencia del Arma",
              "resumen": "Realizar un ataque a distancia contra un enemigo en línea de visión.",
              "detalles": "Gastas AP para tirar dados en la Hazaña de disparo (cada AP es 1D6, necesitas al menos un 4+). Si se supera, tiras la Potencia del arma. Si fallas disparando a una melee, el impacto va a tu aliado."
            },
            {
              "id": "cobertura",
              "nombre": "Regla de Cobertura (Cover)",
              "coste_ap": 0,
              "tipo_tirada": "Modificador de Defensa",
              "resumen": "Si el terreno tapa el 50% o más de la miniatura atacada.",
              "detalles": "El defensor tira sus dados de defensa con Ventaja (Advantage), pudiendo elegir el mejor resultado."
            }
          ]
        },
        {
          "id_categoria": "magia",
          "nombre_categoria": "Magia y Hechizos",
          "acciones": [
            {
              "id": "lanzar_hechizo",
              "nombre": "Lanzar Hechizo",
              "coste_ap": 2,
              "tipo_tirada": "Robo del ArcDeck (Suma de Cartas)",
              "resumen": "Un Mago (Mage) intenta canalizar energía para lanzar un hechizo.",
              "pasos_resolucion": [
                "1. Declarar el hechizo y su número objetivo.",
                "2. Robar 2 cartas del ArcDeck y sumar sus valores (Figuras=10, Ases=1 u 11, Jokers=1 a 11).",
                "3. Si la suma es menor a la dificultad, se puede gastar 1 AP extra o 1 Arcanita para robar otra carta.",
                "4. Si la suma supera 21, el hechizo se Lanza pero queda Sobrecargado (Overpowered): el Mago pierde D6 HP."
              ]
            }
          ]
        },
        {
          "id_categoria": "hazanas_y_objetos",
          "nombre_categoria": "Hazañas Narrativas y Consumibles",
          "acciones": [
            {
              "id": "hazana_narrativa",
              "nombre": "Hazaña Narrativa (Narrative Feat)",
              "coste_ap": "Variable (Según AP invertidos)",
              "tipo_tirada": "Hazaña de dificultad acordada",
              "resumen": "Realizar acciones creativas utilizando el terreno u objetos de la mesa.",
              "dificultades": {
                "Easy" : "1 Éxito (Acciones simples como saltar un murete bajo).",
                "Medium" : "2 Éxitos (Trepar a un tejado, saltar un arroyo).",
                "Hard" : "3 Éxitos (Forzar una puerta blindada, empujar una estatua).",
                "Legendary" : "4 Éxitos (Acciones heroicas de alto riesgo)."
              }
            },
            {
              "id": "usar_arcanita",
              "nombre": "Usar Ficha de Arcanite",
              "coste_ap": 0,
              "tipo_tirada": "Consumible (1 solo uso)",
              "resumen": "Gastar un cristal de Arcanita para obtener una ventaja inmediata.",
              "efectos_disponibles": [
                "Ganar +1 AP inmediato para la activación actual.",
                "Añadir 1D6 extra a cualquier tirada.",
                "Repetir cualquier dado (D6) fallido.",
                "Robar una carta adicional del ArcDeck al lanzar un hechizo."
              ]
            }
          ]
        }
      ]
    },
    {
      "id_fase": "fase_3_fin_ronda",
      "nombre": "3. Fin de Ronda",
      "descripcion": "Resolución de condiciones de victoria, reseteo de estados y mantenimiento.",
      "acciones": [
        {
          "id": "comprobar_escenario",
          "nombre": "Comprobar Objetivos del Escenario",
          "coste_ap": 0,
          "tipo_tirada": "Verificación",
          "resumen": "Comprobar Puntos de Victoria (VP) o condiciones de final de partida.",
          "detalles": "Verificar si se ha alcanzado el límite de rondas o los requisitos de victoria."
        },
        {
          "id": "reset_habilidades",
          "nombre": "Restablecer Habilidades y Tokens",
          "coste_ap": 0,
          "tipo_tirada": "Automática",
          "resumen": "Las habilidades que dicen '1 vez por ronda' (ej. Escudo) se recargan.",
          "detalles": "Se verifica que todas las miniaturas hayan completado su activación."
        }
      ]
    }
  ]
};
