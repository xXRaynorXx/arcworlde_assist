document.addEventListener('DOMContentLoaded', () => {
  // Verificar que la base de datos de reglas esté cargada
  if (typeof datosReglas === 'undefined') {
    console.error('Error: No se encontró la variable datosReglas en reglas_arcworlde.js');
    return;
  }

  inicializarApp();

  function inicializarApp() {
    const phaseNav = document.getElementById('phase-buttons');
    phaseNav.innerHTML = '';

    // Crear Botones para cada Fase del Turno
    datosReglas.secuencia_turno.forEach((fase, index) => {
      const btn = document.createElement('button');
      btn.className = `phase-btn ${index === 0 ? 'active' : ''}`;
      btn.textContent = fase.nombre;
      btn.addEventListener('click', () => cambiarFase(fase.id_fase, btn));
      phaseNav.appendChild(btn);
    });

    // Cargar la primera fase por defecto (Inicio de Ronda)
    if (datosReglas.secuencia_turno.length > 0) {
      cargarFase(datosReglas.secuencia_turno[0]);
    }
  }

  function cambiarFase(idFase, btnSeleccionado) {
    document.querySelectorAll('.phase-btn').forEach(b => b.classList.remove('active'));
    btnSeleccionado.classList.add('active');

    const fase = datosReglas.secuencia_turno.find(f => f.id_fase === idFase);
    if (fase) cargarFase(fase);
  }

  function cargarFase(fase) {
    document.getElementById('phase-description').textContent = fase.descripcion;
    const container = document.getElementById('actions-container');
    container.innerHTML = '';

    // Si la fase contiene categorías (Fase 2 - Activaciones)
    if (fase.categorias) {
      fase.categorias.forEach((cat, index) => {
        const catBlock = document.createElement('div');
        // Opcional: Descomenta la siguiente línea si quieres que empiecen colapsadas por defecto
        catBlock.className = 'category-block collapsed';
        // catBlock.className = 'category-block';

        const catHeader = document.createElement('div');
        catHeader.className = 'category-header';
        catHeader.innerHTML = `
          <h3 class="category-title">${cat.nombre_categoria}</h3>
          <span class="category-icon">▼</span>
        `;

        const catContent = document.createElement('div');
        catContent.className = 'category-content';

        cat.acciones.forEach(accion => {
          catContent.appendChild(crearTarjetaAccion(accion));
        });

        // Alternar abrir/cerrar al hacer clic en el título de la categoría
        catHeader.addEventListener('click', () => {
          catBlock.classList.toggle('collapsed');
        });

        catBlock.appendChild(catHeader);
        catBlock.appendChild(catContent);
        container.appendChild(catBlock);
      });
    } else if (fase.acciones) {
      // Si la fase tiene acciones directas (Fases 1 y 3)
      fase.acciones.forEach(accion => {
        container.appendChild(crearTarjetaAccion(accion));
      });
    }
  }

  function crearTarjetaAccion(accion) {
    const card = document.createElement('div');
    card.className = 'action-card';
    
    const costeAP = accion.coste_ap !== undefined ? `${accion.coste_ap} AP` : '';
    const tirada = accion.tipo_tirada || '';

    card.innerHTML = `
      <div class="action-info">
        <h4>${accion.nombre}</h4>
        <p>${accion.resumen}</p>
      </div>
      <div class="badges">
        ${costeAP ? `<span class="badge badge-ap">${costeAP}</span>` : ''}
        ${tirada ? `<span class="badge badge-roll">${tirada}</span>` : ''}
      </div>
    `;

    card.addEventListener('click', () => {
      document.querySelectorAll('.action-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      mostrarDetalleAccion(accion);
    });

    return card;
  }

  function mostrarDetalleAccion(accion) {
    const detailPanel = document.getElementById('action-detail');
    let contenidoExtra = '';

    if (accion.pasos_resolucion) {
      contenidoExtra += `
        <div>
          <div class="detail-section-title">Pasos de Resolución</div>
          <ul class="detail-list">
            ${accion.pasos_resolucion.map(paso => `<li>${paso}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    if (accion.dificultad_escalada) {
      contenidoExtra += `
        <div>
          <div class="detail-section-title">Dificultad por Enemigos Trabados</div>
          <ul class="detail-list">
            ${accion.dificultad_escalada.map(d => `<li>${d}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    if (accion.efectos_disponibles) {
      contenidoExtra += `
        <div>
          <div class="detail-section-title">Opciones de Efecto</div>
          <ul class="detail-list">
            ${accion.efectos_disponibles.map(e => `<li>${e}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    if (accion.dificultades) {
      contenidoExtra += `
        <div>
          <div class="detail-section-title">Niveles de Dificultad</div>
          <ul class="detail-list">
            ${Object.entries(accion.dificultades).map(([key, val]) => `<li><strong>(${key}:</strong> )${val}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    detailPanel.innerHTML = `
      <div class="detail-header">
        <h2>${accion.nombre}</h2>
        <div class="badges">
          ${accion.coste_ap !== undefined ? `<span class="badge badge-ap">Coste: ${accion.coste_ap} AP</span>` : ''}
          ${accion.tipo_tirada ? `<span class="badge badge-roll">Tirada: ${accion.tipo_tirada}</span>` : ''}
        </div>
      </div>
      <div class="detail-body">
        <div>
          <div class="detail-section-title">Resumen de Regla</div>
          <p>${accion.resumen}</p>
        </div>
        ${accion.detalles ? `
          <div>
            <div class="detail-section-title">Detalles Oficiales</div>
            <p>${accion.detalles}</p>
          </div>
        ` : ''}
        ${accion.restriccion ? `
          <div>
            <div class="detail-section-title">Restricción</div>
            <p style="color: var(--accent-dice);">${accion.restriccion}</p>
          </div>
        ` : ''}
        ${contenidoExtra}
      </div>
    `;

    // En móviles, hacer scroll suave automático hacia la tarjeta de detalle
    if (window.innerWidth < 900) {
      detailPanel.scrollIntoView({ behavior: 'smooth' });
    }
  }
});