// Tablas de la campaña (humor del comerciante, lesiones y aventuras intermedias).
// Las tiradas las hace el servidor; aquí están los textos para mostrarlas.
const datosCampanaTablas = {
  "version": "1.0",
  "fuente": "Reglas de campaña de ArcWorlde (compendio)",
  "humor_comerciante": {
    "dificiles": {
      "nombre": "Tiempos Difíciles",
      "dados": "1",
      "compra": 25,
      "venta": -25,
      "texto": "Compras a Caro (+25%), ventas a Chollo (-25%)."
    },
    "fina": {
      "nombre": "Calidad Fina",
      "dados": "2",
      "compra": 25,
      "venta": 25,
      "texto": "Compras a Caro (+25%), ventas a Caro (+25%)."
    },
    "normal": {
      "nombre": "Día Normal",
      "dados": "3-4",
      "compra": 0,
      "venta": 0,
      "texto": "Compras y ventas a su valor oficial exacto en GP."
    },
    "preferido": {
      "nombre": "Cliente Preferido",
      "dados": "5",
      "compra": -25,
      "venta": -25,
      "texto": "Compras a Chollo (-25%), ventas a Chollo (-25%)."
    },
    "gran_humor": {
      "nombre": "Gran Humor / Negociación",
      "dados": "6",
      "compra": -25,
      "venta": 25,
      "texto": "Compras a Chollo (-25%), ventas a Caro (+25%)."
    }
  },
  "lesiones": {
    "herido": {
      "nombre": "Wounded (Herido)",
      "dado": "1",
      "texto": "El personaje descansa y no participa en la siguiente partida."
    },
    "cojera": {
      "nombre": "Limping (Cojera)",
      "dado": "2",
      "texto": "-1 al atributo Movimiento en la siguiente partida."
    },
    "golpe_cabeza": {
      "nombre": "Bumped Head (Golpe en la cabeza)",
      "dado": "3",
      "texto": "No puede usar su rasgo de mayor nivel en la siguiente partida."
    },
    "ojo_morado": {
      "nombre": "Black Eye (Ojo morado)",
      "dado": "4",
      "texto": "Debe repetir todas las tiradas de disparo que hayan tenido éxito."
    },
    "brazo_cabestrillo": {
      "nombre": "Arm in a Sling (Brazo en cabestrillo)",
      "dado": "5",
      "texto": "No puede usar Escudo en la siguiente partida."
    },
    "afortunado": {
      "nombre": "Lucky (Afortunado)",
      "dado": "6",
      "texto": "El personaje sale ileso y no sufre ninguna secuela."
    }
  },
  "aventuras": {
    "1/1": {
      "nombre": "Arc Storm (Tormenta Arcana)",
      "resultados": {
        "1": "La tormenta descarga rayos sobre la banda. Elige un personaje del Campamento para ser eliminado permanentemente. Ganas 1D6 Tokens de Arcanita.",
        "2": "El vendaval absorbe la energia magica. Ningun personaje de la banda puede lanzar hechizos en la siguiente partida.",
        "3": "Impactan rayos de azur dejando cristales en el suelo. Ganas 2D6 Tokens de Arcanita."
      }
    },
    "1/2": {
      "nombre": "Lonely Fire (Fuego Solitario)",
      "resultados": {
        "1": "La figura desenfunda un arma. Tu Comandante pierde 1D6 HP para el siguiente juego.",
        "2": "Es un guerrero famoso. Puedes contratar un Sword for Hire al 25% de su coste en el siguiente Capitulo.",
        "3": "Jura lealtad tras una noche de fiesta. Anades un Sword for Hire gratis y de forma permanente a tu Campamento."
      }
    },
    "1/3": {
      "nombre": "Logger's Cabin (Cabana del Lenador)",
      "resultados": {
        "1": "Entrais por la fuerza y sale un lenador furioso. El Comandante pierde D6 HP en el siguiente juego.",
        "2": "La cabana esta desierta y ya la han saqueado.",
        "3": "Encontrais hachas de gran calidad colgadas. Anades tres Fine Two-Handed Weapons al Cofre de Campana."
      }
    },
    "1/4": {
      "nombre": "Titan's Lair (Guarida del Titan)",
      "resultados": {
        "1": "El Titan despierta hambriento. Cada personaje del Campamento pierde D3 HP para la siguiente partida.",
        "2": "Tras la pelea, el Titan huye. Anades 5D6 GP al Cofre de Campana hallados entre los huesos.",
        "3": "El Titan es pacifico. Puedes contratar un Titan para tu Campamento a precio Chollo (Bargain)."
      }
    },
    "1/5": {
      "nombre": "Farmers Market (Mercado de Granjeros)",
      "resultados": {
        "1": "Pelea con los aldeanos. Anades 10D6 GP al Cofre, pero debes hacer un chequeo de lesiones en la Tabla de Heridas para cada personaje del Campamento.",
        "2": "Granjeros amigables. Puedes comprar el objeto curativo de tu faccion a precio Chollo (Bargain).",
        "3": "Comida de primera calidad. Puedes comprar Gourmet Nosh (cura 6 HP) por 15 GP."
      }
    },
    "1/6": {
      "nombre": "Haunted Graveyard (Cementerio Encantado)",
      "resultados": {
        "1": "Los muertos se levantan. Cada personaje del Campamento pierde D3 HP para el siguiente juego.",
        "2": "Los gemidos de los espiritus resuenan durante dias. Todos los personajes sufren -1 a Valentia (Bravery) en el siguiente juego.",
        "3": "Los no-muertos buscan aventuras. Puedes contratar cualquier Unidad de las facciones No-Muertas (Undead) a precio Chollo (Bargain)."
      }
    },
    "2/1": {
      "nombre": "Forest Tavern (Taberna del Bosque)",
      "resultados": {
        "1": "Cerveza en mal estado. Toda la banda sufre -1 al Movimiento en el siguiente juego.",
        "2": "Cerveza excelente. Toda la banda gana +1 a Valentia (Bravery) en el siguiente juego.",
        "3": "Bebida magica de lujo. Resta 1 Token de Arcanita del Cofre. La banda obtiene +1 a Valentia y cada personaje cuenta con 1 objeto curativo equipado de su faccion."
      }
    },
    "2/2": {
      "nombre": "Babbling Brook (Arroyo Balbuceante)",
      "resultados": {
        "1": "Susurros oscuros salen del agua. Todos los personajes sufren -1 a Valentia (Bravery) en el siguiente juego.",
        "2": "Agua cristalina. Cada personaje puede repetir una tirada de Leg-It fallida en la siguiente partida.",
        "3": "Brillo en el fondo. Ganas 3 Tokens de Arcanita."
      }
    },
    "2/3": {
      "nombre": "Hidden Lagoon (Laguna Oculta)",
      "resultados": {
        "1": "Ataca un Dragon de los Fiordos (Fjord Dragon). Cada personaje pierde D3 HP para el siguiente juego.",
        "2": "Gran pesca. Anades D6 Tasty Fish (objeto de 0 GP que cura 3 HP) al Cofre.",
        "3": "Un brazo sale de la superficie ofreciendo una reliquia. Ganas un Artefacto Legendario (Fabled Artefact)."
      }
    },
    "2/4": {
      "nombre": "Well, Well, Well (El Pozo)",
      "resultados": {
        "1": "Un tentaculo atrapa a un personaje. El personaje con menor coste en GP del Campamento es eliminado permanentemente.",
        "2": "Golpea un cubo en la cabeza. El personaje con menor coste en GP pierde D3 HP.",
        "3": "Salvas a un nino del pozo y encuentras botin. Anades D6 Tokens de Arcanita al Cofre."
      }
    },
    "2/5": {
      "nombre": "Stables (Establos)",
      "resultados": {
        "1": "Cocean las monturas. Un personaje del Campamento de al menos 50 GP queda Noqueado para la siguiente partida.",
        "2": "Monturas dificiles. Si tu armeria incluye Montura (Mount), despliegas D3 gratis en el siguiente juego (haciendo Chequeo de Valentia al activarse). Si no, anade D6 Horsemeat (cura 3 HP) al Cofre.",
        "3": "Monturas dociles. Si tu armeria incluye Montura, anades D3 al Cofre gratis. Si no, anades D6 Horsemeat."
      }
    },
    "2/6": {
      "nombre": "Monster's Nest (Nido de Monstruo)",
      "resultados": {
        "1": "El monstruo despierta hambriento. Cada personaje del Campamento pierde D3 HP.",
        "2": "Lo domas tras pelear. Puedes contratar un Monstruo (Monster) del Bestiario a precio normal.",
        "3": "Apaciguas al monstruo con comida. Puedes contratar un Monstruo a precio Chollo (Bargain)."
      }
    },
    "3/1": {
      "nombre": "Merchant Caravan (Caravana Comercial)",
      "resultados": {
        "1": "Ataque de bandidos. Cada personaje pierde D3 HP y anades 5D6 GP al Cofre.",
        "2": "Viaje tranquilo y buena paga. Anades 10D6 GP al Cofre de Campana.",
        "3": "Saqueas al comerciante tras negarse a pagar. Anades 15D6 GP y D6 Tokens de Arcanita al Cofre."
      }
    },
    "3/2": {
      "nombre": "Gryphon's Aerie (Nido de Grifo)",
      "resultados": {
        "1": "La madre Grifo ataca. Un personaje de al menos 50 GP queda Noqueado durante el siguiente Capitulo.",
        "2": "Robas un huevo de grifo. Cada personaje pierde D3 HP, pero anades un Gryphon Egg (objeto valorado en 100 GP) al Cofre.",
        "3": "La madre adopta a la banda. Puedes contratar un Monstruo o Titan a precio Chollo (Bargain)."
      }
    },
    "3/3": {
      "nombre": "Friendly Village (Aldea Amigable)",
      "resultados": {
        "1": "Recibimiento frio. Reclutar personajes de tu faccion en el siguiente Capitulo sera Caro (Pricey).",
        "2": "Aldeanos neutrales. Reclutas personajes al precio normal.",
        "3": "Calida bienvenida de parientes. Puedes rellenar tu banda con personajes de tu faccion a precio Chollo (Bargain)."
      }
    },
    "3/4": {
      "nombre": "Gremlin Cavern (Caverna Gremlin)",
      "resultados": {
        "1": "Secuestran al Comandante. Pierdes 1 Token de Arcanita o 50 GP del Cofre para liberarlo.",
        "2": "Pasan de largo sin contratiempos.",
        "3": "Se hacen amigos tras compartir comida. Puedes contratar cualquier personaje Gremlin a precio Chollo (Bargain)."
      }
    },
    "3/5": {
      "nombre": "Fortified Town (Pueblo Fortificado)",
      "resultados": {
        "1": "Altercado con los guardias. Pagas un soborno de 20 GP del Cofre para no terminar arrestado.",
        "2": "Los guardias echan a la banda.",
        "3": "Los guardias se asustan y tiran una bolsa con 20 GP sobre la muralla para que os vayais."
      }
    },
    "3/6": {
      "nombre": "Beast Den (Guarida de Bestias)",
      "resultados": {
        "1": "Las bestias atacan. Cada personaje del Campamento pierde 1 HP.",
        "2": "Estofado de bestia. Anades D6 Beast Stew (objeto que cura D3 HP) al Cofre.",
        "3": "Domas a las bestias con comida. Puedes contratar Bestias (Beasts) del Bestiario a precio Chollo (Bargain)."
      }
    },
    "4/1": {
      "nombre": "Abandoned Castle (Castillo Abandonado)",
      "resultados": {
        "1": "Guarida de Vampiro. Todos los personajes empiezan la siguiente partida con -D6 HP.",
        "2": "Hallazgo de armas de calidad. Anades una Fine Two-Handed Weapon, una Fine Spear y una Fine Ranged Weapon al Cofre.",
        "3": "Banquete glamuroso con el Vampiro. En el siguiente juego, cada personaje puede curarse D3 HP una vez."
      }
    },
    "4/2": {
      "nombre": "Blacksmith's Forge (Fragua de la Herrera)",
      "resultados": {
        "1": "Una herrera rompe tus armas al examinarlas. Elimina 3 armas de tu Cofre de Campana.",
        "2": "Mejora de equipo. Cualquier arma del Cofre se transforma en Fine pagando el +50% de su coste.",
        "3": "Regalo de la herrera. Elige un arma de la Armeria Comun: se convierte en Fine y otorga +2 de Poder (Power) en lugar de +1."
      }
    },
    "4/3": {
      "nombre": "Traitors Den (Guarida de Traidores)",
      "resultados": {
        "1": "Desertores aceptan unirse pero por mucho dinero. Contratas personajes de la faccion de otro jugador a precio Caro (Pricey).",
        "2": "Desertores dispuestos a luchar. Contratas personajes de la faccion de otro jugador al coste normal.",
        "3": "Desertores sedientos de venganza. Contratas personajes de la faccion de otro jugador a precio Chollo (Bargain)."
      }
    },
    "4/4": {
      "nombre": "Ourk Brewery (Destileria Ourk)",
      "resultados": {
        "1": "Tropiezo y explosion. Pagas 50 GP del Cofre a los Ourks para compensar los daños.",
        "2": "Cerveza Ourk de calidad. Puedes comprar Swamp Scrumpy a precio Caro (Pricey).",
        "3": "Trato especial. Compras Swamp Scrumpy a precio Chollo (Bargain) y el Comandante empieza el siguiente juego bajo sus efectos."
      }
    },
    "4/5": {
      "nombre": "Military Outpost (Puesto Avanzado Militar)",
      "resultados": {
        "1": "Un sargento exige soborno. Pierdes 10 GP del Cofre.",
        "2": "Armeria desatendida. Anades un Arcloque Rifle al Cofre de Campana.",
        "3": "Rescatas a un prisionero de tu faccion. Anades un personaje de clase Unidad (Unit) gratis al Campamento (repite tiradas de Impacto fallidas contra Imperiales)."
      }
    },
    "4/6": {
      "nombre": "Arcanite Mine (Mina de Arcanita)",
      "resultados": {
        "1": "Caida en un pozo agotado. Realizas una tirada de heridas (Injury Roll) para un personaje de clase Unidad (Unit).",
        "2": "Restos de vetas. Anades 1 Token de Arcanita al Cofre.",
        "3": "Mina intacta. Anades 6 Cursed Arcanite Tokens al Cofre (si se usan, infligen D3 Hits al usuario)."
      }
    },
    "5/1": {
      "nombre": "Trouble at'Mill (Problemas en el Molino)",
      "resultados": {
        "1": "La banda pasa de largo.",
        "2": "Salvas al molinero Halfling y te invita a cenar. En el siguiente juego, eliges un hechizo del libro de cocina de Bulbo Chubb y aplicas sus efectos a toda la banda.",
        "3": "Ganas el respeto de la aldea. Puedes contratar cualquier personaje de la faccion Halfling a precio Chollo (Bargain)."
      }
    },
    "5/2": {
      "nombre": "Wizard's Tower (Torre del Mago)",
      "resultados": {
        "1": "Rayo transformador. Un personaje de clase Unidad (Unit) se convierte en un Griffling durante el resto de la campana.",
        "2": "Os alejais sigilosamente sin hacer ruido.",
        "3": "El Mago os invita a su biblioteca. Puedes contratar cualquier personaje de la faccion de Magos (Wizards) a precio Chollo (Bargain)."
      }
    },
    "5/3": {
      "nombre": "Sacred Tree (Arbol Sagrado)",
      "resultados": {
        "1": "Lluvia de flechas por no hacer caso al aviso. Cada personaje del Campamento pierde 3 HP para el siguiente juego.",
        "2": "Retrocedeis cautelosos.",
        "3": "Espada incrustada en el tronco. Anades una Faeblade a tu Cofre."
      }
    },
    "5/4": {
      "nombre": "Hermit's Cave (Cueva del Ermitano)",
      "resultados": {
        "1": "Molestas al ermitano. En tu siguiente tirada de Aventuras Intermedias, obtendras automaticamente el resultado 1-2.",
        "2": "Saludo educado. En tu siguiente tirada de Aventuras Intermedias, obtendras automaticamente el resultado 3-4.",
        "3": "Le ofreces comida. En tu siguiente tirada de Aventuras Intermedias, podras cambiar el resultado al resultado 5-6."
      }
    },
    "5/5": {
      "nombre": "Troggle Den (Madriguera Troggle)",
      "resultados": {
        "1": "Los Troggles atacan. Cada personaje pierde 1 HP para el siguiente Capitulo.",
        "2": "Ahuyentas a las criaturas y encuentras monedas. Anades 5D6 GP al Cofre.",
        "3": "Alimentas a los Troggles. Anades 3 Troggles gratis a tu Campamento de Campana."
      }
    },
    "5/6": {
      "nombre": "Travelling Troupe (Troupe Itinerante)",
      "resultados": {
        "1": "Pitidos en los oidos por el estrepito. Se deben repetir las Hazanas que requieran audicion (como recibir Ordenes).",
        "2": "Burlas de las bestias. Todos los personajes sufren -1 a Valentia (Bravery) en el siguiente juego.",
        "3": "Fiesta con la troupe. Puedes contratar cualquier personaje de la faccion Beastfolk a precio Chollo (Bargain)."
      }
    },
    "6/1": {
      "nombre": "Doppelganger (El Doble)",
      "resultados": {
        "1": "El Doppelganger es hostil. El Comandante actua como personaje Feral en el siguiente juego y considera a la banda como enemigos.",
        "2": "El Doppelganger actua como Feral pero considera al rival como enemigo.",
        "3": "El Doppelganger es amable. Tras el juego, se rescata al verdadero Comandante atado en un seto (toda la VP obtenida por el doble se descarta)."
      }
    },
    "6/2": {
      "nombre": "Witch's Hut (Cabana de la Bruja)",
      "resultados": {
        "1": "Rechazas tomar te. Todas las tiradas del Comandante sufren -1 durante el siguiente Capitulo.",
        "2": "Toman te educadamente.",
        "3": "Compartes un manjar con la bruja. Todas las tiradas del Comandante reciben +1 durante el siguiente Capitulo."
      }
    },
    "6/3": {
      "nombre": "Treasure Trove (Tesoro Escondido)",
      "resultados": {
        "1": "Trampa en el tesoro. Personajes por valor de 100 GP son eliminados permanentemente del Campamento, pero ganas 6 Tokens de Arcanita.",
        "2": "La mitad del tesoro es falso. Ganas 2D6 Tokens de Arcanita divididos a la mitad.",
        "3": "Hallazgo intacto. Ganas 2D6 Tokens de Arcanita."
      }
    },
    "6/4": {
      "nombre": "Elven Temple (Templo Elfico)",
      "resultados": {
        "1": "Portal inestable. Pierdes D3 Tokens de Arcanita del Cofre.",
        "2": "Portal estable. Despliegas hasta 3 personajes del Campamento en cualquier borde del tablero al inicio de cualquier Ronda en el siguiente juego.",
        "3": "Portal directo al campo de batalla. Toda la banda puede desplegarse en cualquier lugar del mapa (incluso en la zona de despliegue enemiga)."
      }
    },
    "6/5": {
      "nombre": "Forgotten Tomb (Tumba Olvidada)",
      "resultados": {
        "1": "Un Barrow Wight furioso despierta. Cada personaje del Campamento pierde D3 HP para el siguiente Capitulo.",
        "2": "Personajes perdidos en las sombras por valor de 100 GP no pueden participar en el siguiente juego, pero regresan en el posterior con 1D6 Tokens de Arcanita.",
        "3": "Abres el sarcófago de un antiguo rey. Ganas un Artefacto Legendario (Fabled Artefact)."
      }
    },
    "6/6": {
      "nombre": "The Explorer (El Explorador)",
      "resultados": {
        "1": "Echas al caminante. Un oponente anade a The Explorer and the Enchanted Journal (Sword for Hire) a su Campamento.",
        "2": "Acoges al viajero. Puedes contratar a The Explorer and the Enchanted Journal para el siguiente juego al 25% de su coste.",
        "3": "Lazos de por vida al fuego. Anades a The Explorer and the Enchanted Journal gratis y permanentemente a tu Campamento de Campana."
      }
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = datosCampanaTablas;
} else {
  window.datosCampanaTablas = datosCampanaTablas;
}

// Habilidades de campaña (Traits) que se compran con PV. Se leen del compendio (datosCampana en index.html):
// cada una tiene niveles "N1 (3 VP) efecto". AWTraits.list() -> [{id, nombre, resumen, restriccion, niveles:[{n, coste, texto}]}]
(function () {
  if (typeof window === 'undefined') return;
  const strip = (h) => String(h || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  let cache = null;
  function build() {
    const out = [];
    try {
      const sec = (datosCampana.secciones_campana || []).find((s) => s.id_seccion === 'gestion_campana');
      const cat = sec.categorias.find((c) => /Habilidades de Campa/i.test(c.nombre_categoria));
      cat.acciones.forEach((a) => {
        const niveles = [];
        String(a.detalles || '').split(/<br\s*\/?>/i).forEach((line) => {
          const m = strip(line).match(/N(\d)\s*\((\d+)\s*VP\)\s*(.*)/i);
          if (m) niveles.push({ n: Number(m[1]), coste: Number(m[2]), texto: m[3] });
        });
        if (niveles.length)
          out.push({ id: a.id, nombre: String(a.nombre).split(' / ')[0], resumen: a.resumen || '', restriccion: strip(a.restriccion), niveles: niveles.sort((x, y) => x.n - y.n) });
      });
    } catch (e) {
      /* sin datos de campaña */
    }
    return out;
  }
  window.AWTraits = {
    list() { return cache || (cache = build()); },
    find(id) { return this.list().find((t) => t.id === id) || null; }
  };
})();
