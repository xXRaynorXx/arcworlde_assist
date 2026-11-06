// Eventos del ArcDeck por entorno. Extraído de la tabla del compendio (index.html).
// Clave de carta: 2-10, J, Q, K, As y Joker. Mazo: 52 cartas + 2 Jokers.
const datosArcdeck = {
  "version": "1.0",
  "fuente": "Tabla ArcDeck de index.html",
  "entornos": [
    {
      "id": "mildaark",
      "icono": "🌲",
      "nombre": "Bosque de Mildaark",
      "etiqueta": "Entorno Boscoso",
      "cartas": {
        "2": {
          "nombre": "Alijo Oculto",
          "texto": "Hazaña Fácil para coger un objeto gratis de la Armería Común."
        },
        "3": {
          "nombre": "Bosque Viviente",
          "texto": "Aparecen 3 árboles nuevos en zonas abiertas sin personajes."
        },
        "4": {
          "nombre": "Portal Élfico",
          "texto": "2 tokens de portal; entrar en uno te teletransporta al otro."
        },
        "5": {
          "nombre": "Bestia Salvaje",
          "texto": "Entra una Bestia neutral con reglas Rogue Warband."
        },
        "6": {
          "nombre": "Brote de Arcanita",
          "texto": "Aparecen 3 Fichas de Arcanita aleatorias en el tablero."
        },
        "7": {
          "nombre": "Aura Temporal",
          "texto": "Todos los personajes ganan +2 AP durante esta ronda."
        },
        "8": {
          "nombre": "Arbusto Curativo",
          "texto": "Token de 40mm en el centro; el contacto de peana cura D6 HP."
        },
        "9": {
          "nombre": "Viento Mágico",
          "texto": "Las cartas extra al lanzar hechizos no cuestan AP adicional."
        },
        "10": {
          "nombre": "Niebla Densa",
          "texto": "Todas las Hazañas para Disparar (Shots) sufren Desventaja."
        },
        "J": {
          "nombre": "Polvo Arcano",
          "texto": "Todas las Hazañas (Feats) se realizan con Ventaja."
        },
        "Q": {
          "nombre": "Vegetación Furiosa",
          "texto": "Moverse o activarse a 6\" o menos del borde inflige D6 Hits."
        },
        "K": {
          "nombre": "Criatura Salvaje",
          "texto": "Entra un Monstruo neutral en el borde más cercano (Rogue)."
        },
        "As": {
          "nombre": "Reliquia Mágica",
          "texto": "Aparece un Artefacto Legendario aleatorio (Hazaña Media)."
        },
        "Joker": {
          "nombre": "Niebla de Confusión",
          "texto": "Controlas al Comandante del bando rival esta ronda."
        }
      }
    },
    {
      "id": "vauhaemia",
      "icono": "🦇",
      "nombre": "Tierras de Vauhaemia",
      "etiqueta": "Entorno Gótico",
      "cartas": {
        "2": {
          "nombre": "Trueno Estremecedor",
          "texto": "Chequeo de Valentía inmediato para personajes Vivos."
        },
        "3": {
          "nombre": "Nieblas Serpenteantes",
          "texto": "Las Hazañas para Disparar sufren Desventaja."
        },
        "4": {
          "nombre": "Horda Espectral",
          "texto": "Token errante a 4\" que causa D6 Hits (ignora Armadura)."
        },
        "5": {
          "nombre": "Tumba Abierta",
          "texto": "Emergen unidades No-Muertas neutrales con reglas Rogue."
        },
        "6": {
          "nombre": "Luna Llena",
          "texto": "Repetir tiradas de Ataque fallidas; se revelan Hombres Lobo."
        },
        "7": {
          "nombre": "Catacumba Abierta",
          "texto": "Fosa de terreno impasable (Hazaña Media para salir)."
        },
        "8": {
          "nombre": "Ojos de Estatua",
          "texto": "Aparecen D3 Fichas de Arcanita repartidas en el mapa."
        },
        "9": {
          "nombre": "Espíritus Aliados",
          "texto": "Puedes reemplazar temporalmente a un personaje Noqueado."
        },
        "10": {
          "nombre": "Enjambre de Murciélagos",
          "texto": "Aparecen D6 Crypt Bats neutrales con reglas Rogue."
        },
        "J": {
          "nombre": "Música de Órgano",
          "texto": "Todas las Hazañas Narrativas se tiran con Ventaja."
        },
        "Q": {
          "nombre": "Sombra Acechante",
          "texto": "Entra un personaje Heavy No-Muerto neutral (Rogue)."
        },
        "K": {
          "nombre": "Altar del Cáliz",
          "texto": "Aparece temporalmente el 'Chalice of Blood'."
        },
        "As": {
          "nombre": "Van Halfsing",
          "texto": "Entra el cazador Van Halfsing hostil contra todos los jugadores."
        },
        "Joker": {
          "nombre": "Amanecer / Noche",
          "texto": "Chequeo de Valentía para No-Muertos (1er Joker) o Vivos (2º)."
        }
      }
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = datosArcdeck;
} else {
  window.datosArcdeck = datosArcdeck;
}
