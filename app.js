// Lógica del compendio: menú, búsqueda, tarjetas y modales. Extraído de index.html.
function construirSeccionesFacciones() {
    const fid = (x) => x.faccion_id;
    const esSerie = (r) => /^Equipo de Serie/i.test(r.etiqueta || '');
    const orden = [];
    const nombres = {};
    [habilidadesFaccionDB, rasgosUnidadesDB, armeriaExclusivaDB].forEach((lista) => lista.forEach((x) => {
        const id = fid(x);
        if (!(id in nombres)) { nombres[id] = x.faccion_nombre; orden.push(id); }
    }));
    // 'comun' (equipo de serie compartido) va el último
    orden.sort((a, b) => (a === 'comun') - (b === 'comun'));
    return orden.map((id) => {
        const reglas = habilidadesFaccionDB.filter((x) => fid(x) === id);
        const rasgos = rasgosUnidadesDB.filter((x) => fid(x) === id && !esSerie(x));
        const serie = rasgosUnidadesDB.filter((x) => fid(x) === id && esSerie(x));
        const armeria = armeriaExclusivaDB.filter((x) => fid(x) === id).map((a) => Object.assign({}, a, {
            nombre: a.nombre + ' (' + a.coste + ' GP)',
            etiqueta: (a.etiqueta || 'Armería') + ' · ' + a.tipo
        }));
        const comun = id === 'comun';
        return {
            titulo: comun ? 'Comunes a varias facciones' : 'Facción ' + nombres[id],
            descripcion: comun ? 'Equipo de serie compartido por miniaturas de distintas facciones.'
                : 'Reglas, rasgos de unidad, equipo de serie y armería exclusiva de ' + nombres[id] + '.',
            categorias: [
                { nombre_categoria: 'Reglas de facción', acciones: reglas },
                { nombre_categoria: 'Rasgos de unidades', acciones: rasgos },
                { nombre_categoria: 'Equipo de serie', acciones: serie },
                { nombre_categoria: 'Armería exclusiva', acciones: armeria }
            ].filter((c) => c.acciones.length)
        };
    });
}

const dbUnificada = [
    {
        id: 'core_rules',
        titulo: 'Reglas Básicas',
        subtitulo: `${datosReglas.juego} - v${datosReglas.version_reglas}`,
        secciones: datosReglas.secuencia_turno.map(fase => ({
            titulo: fase.nombre,
            descripcion: fase.descripcion,
            categorias: fase.categorias ? fase.categorias : [{ nombre_categoria: 'Acciones de Fase', acciones: fase.acciones }]
        }))
    },
    {
        id: 'factions',
        titulo: 'Reglas de Facciones',
        subtitulo: `${datosFacciones.juego} - ${datosFacciones.version}`,
        secciones: construirSeccionesFacciones()
    },            
    {
        id: 'campaign',
        titulo: 'Reglas de Campaña',
        subtitulo: `${datosCampana.juego} - ${datosCampana.version}`,
        secciones: datosCampana.secciones_campana.map(sec => ({
            titulo: sec.nombre,
            descripcion: sec.descripcion,
            categorias: sec.categorias
        }))
    },
    {
        id: 'scenarios',
        titulo: 'Escenarios',
        subtitulo: `${datosEscenarios.juego} - ${datosEscenarios.version}`,
        secciones: datosEscenarios.secciones_escenarios.map(sec => ({
            titulo: sec.nombre,
            descripcion: sec.descripcion,
            categorias: sec.categorias
        }))
    }
];

let currentSectionId = dbUnificada[0].id;
const navMenu = document.getElementById('nav-menu');
const mainContent = document.getElementById('main-content');

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
const btnOpen = document.getElementById('open-sidebar');
const btnClose = document.getElementById('close-sidebar');

function toggleSidebar() {
    const isClosed = sidebar.classList.contains('-translate-x-full');
    if (isClosed) {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
    } else {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
    }
}
btnOpen.addEventListener('click', toggleSidebar);
btnClose.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', toggleSidebar);

function renderSidebar() {
    navMenu.innerHTML = '';
    dbUnificada.forEach(mainSection => {
        const btn = document.createElement('button');
        btn.className = `w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 font-medium ${
            currentSectionId === mainSection.id 
            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
        }`;

        let iconSvg = '';
        if(mainSection.id === 'core_rules') {
            iconSvg = `<svg class="w-5 h-5 mr-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`;
        } else if(mainSection.id === 'campaign') {
            iconSvg = `<svg class="w-5 h-5 mr-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
        } else {
            iconSvg = `<svg class="w-5 h-5 mr-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`;
        }

        btn.innerHTML = `${iconSvg} ${mainSection.titulo}`;
        btn.onclick = () => {
            currentSectionId = mainSection.id;
            renderSidebar();
            renderContent();
            if(window.innerWidth < 768) toggleSidebar();
        };
        navMenu.appendChild(btn);
    });

    // Opción de Buscador Global al final del menú lateral
    const searchBtn = document.createElement('button');
    searchBtn.className = `w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 font-medium mt-4 border-t border-slate-800 pt-4 ${
        currentSectionId === 'search' 
        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`;
    const searchIcon = `<svg class="w-5 h-5 mr-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>`;
    searchBtn.innerHTML = `${searchIcon} Buscador`;
    searchBtn.onclick = () => {
        currentSectionId = 'search';
        renderSidebar();
        renderSearch();
        if(window.innerWidth < 768) toggleSidebar();
    };
    navMenu.appendChild(searchBtn);
}

function renderTags(acc) {
    let tagsHtml = '<div class="flex flex-wrap gap-2 mb-3">';
    if (acc.etiqueta) {
        tagsHtml += `<span class="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md font-medium">${acc.etiqueta}</span>`;
    }
    if (acc.coste_ap !== undefined) {
        tagsHtml += `<span class="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-md font-medium">AP: ${acc.coste_ap}</span>`;
    }
    if (acc.tipo_tirada) {
        tagsHtml += `<span class="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-md font-medium">${acc.tipo_tirada}</span>`;
    }
    tagsHtml += '</div>';
    return tagsHtml;
}

function renderList(title, listData, isObject = false) {
    if (!listData) return '';
    let html = `<div class="mt-3 pt-3 border-t border-slate-800/60"><h6 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">${title}:</h6><ul class="space-y-1.5 text-sm text-slate-300">`;
    if (isObject) {
        for (const [key, value] of Object.entries(listData)) {
            html += `<li class="flex items-start"><span class="font-semibold text-emerald-400 min-w-[80px]">${key}:</span> <span class="text-slate-400">${value}</span></li>`;
        }
    } else {
        listData.forEach(item => {
            html += `<li class="flex items-start text-slate-400"><span class="text-emerald-500 mr-2">•</span><span>${item}</span></li>`;
        });
    }
    html += `</ul></div>`;
    return html;
}

function renderCard(acc) {
    const isClickable = acc.interactivo || acc.id === 'evento_arcdeck';
    const hoverStyles = isClickable ? 'cursor-pointer hover:border-amber-500/80 hover:bg-slate-900/80 group' : 'hover:border-emerald-500/50';
    const onClickAttr = isClickable ? `onclick="openModal('${acc.modal_id || 'modal-arcdeck'}')"` : '';

    return `
        <article ${onClickAttr} class="bg-slate-950 rounded-xl p-5 border border-slate-800/60 transition-all duration-300 ${hoverStyles}">
            <div class="flex items-center justify-between mb-2">
                <h5 class="text-lg font-bold text-white ${isClickable ? 'group-hover:text-amber-400 transition-colors flex items-center gap-2' : ''}">
                    ${acc.nombre}
                    ${isClickable ? '<span class="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-normal">👁️ Ver Tabla</span>' : ''}
                </h5>
            </div>
            ${renderTags(acc)}
            ${acc.resumen ? `<p class="text-sm text-slate-300 italic mb-3 border-l-2 border-emerald-500 pl-3 py-1 bg-slate-900/50 rounded-r">${acc.resumen}</p>` : ''}
            ${acc.detalles ? `<p class="text-sm text-slate-400 leading-relaxed">${acc.detalles}</p>` : ''}

            ${renderList("Pasos de Resolución", acc.pasos_resolucion)}
            ${renderList("Dificultades", acc.dificultades, true)}
            ${renderList("Dificultad Escalada", acc.dificultad_escalada)}
            ${renderList("Efectos Disponibles", acc.efectos_disponibles)}

            ${acc.restriccion ? `
                <div class="mt-4 p-3 bg-rose-950/30 border border-rose-900/50 rounded-lg flex items-start">
                    <svg class="w-5 h-5 text-rose-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    <p class="text-xs text-rose-200">${acc.restriccion}</p>
                </div>
            ` : ''}
        </article>
    `;
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('hidden');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('hidden');
}

function toggleCategory(catId) {
    const container = document.getElementById(catId);
    const icon = document.getElementById(`icon-${catId}`);
    if (container) {
        container.classList.toggle('hidden');
        if (icon) {
            icon.classList.toggle('rotate-180');
        }
    }
}

function renderContent() {
    if (currentSectionId === 'search') {
        renderSearch();
        return;
    }

    const data = dbUnificada.find(s => s.id === currentSectionId);
    if (!data) return;

    let html = `
        <div class="max-w-4xl mx-auto pb-12">
            <header class="mb-10">
                <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight">${data.titulo}</h2>
                <p class="text-emerald-500 font-medium mt-2">${data.subtitulo}</p>
            </header>
    `;

    data.secciones.forEach((sec, secIndex) => {
        html += `
            <section class="mb-12 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-black/20">
                <div class="bg-slate-800/50 p-6 border-b border-slate-800">
                    <h3 class="text-2xl font-bold text-white">${sec.titulo}</h3>
                    ${sec.descripcion ? `<p class="text-slate-400 mt-2">${sec.descripcion}</p>` : ''}
                </div>

                <div class="p-6 space-y-6">
        `;

        sec.categorias.forEach((cat, catIndex) => {
            const catId = `cat-${secIndex}-${catIndex}`;
            html += `
                <div class="bg-slate-950/40 border border-slate-800/60 rounded-xl overflow-hidden">
                    <button onclick="toggleCategory('${catId}')" class="w-full flex justify-between items-center text-left px-5 py-4 font-semibold text-emerald-400 hover:bg-slate-800/40 transition-colors focus:outline-none">
                        <span class="text-lg">${cat.nombre_categoria}</span>
                        <svg id="icon-${catId}" class="w-5 h-5 transform transition-transform duration-200 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div id="${catId}" class="hidden p-5 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-800/60 bg-slate-950/20">
            `;

            cat.acciones.forEach(acc => {
                html += renderCard(acc);
            });

            html += `
                    </div>
                </div>
            `;
        });

        html += `
                </div>
            </section>
        `;
    });

    html += `</div>`;
    mainContent.innerHTML = html;
    mainContent.scrollTop = 0;
}

function renderSearch() {
    let html = `
        <div class="max-w-4xl mx-auto pb-12">
            <header class="mb-10">
                <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight">Buscador Universal</h2>
                <p class="text-emerald-500 font-medium mt-2">Encuentra reglas, objetos de campaña o escenarios al instante</p>

                <div class="mt-6 relative">
                    <input type="text" id="search-input" placeholder="Ej: Arcanita, Prone, Escudo, MVP..." class="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-4 pl-12 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-lg shadow-inner">
                    <svg class="w-6 h-6 text-slate-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </header>

            <div id="search-results" class="space-y-6">
                <div class="text-center py-10 opacity-50">
                    <svg class="w-16 h-16 mx-auto text-slate-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <p class="text-slate-400">Escribe en la barra superior para empezar a buscar...</p>
                </div>
            </div>
        </div>
    `;

    mainContent.innerHTML = html;
    mainContent.scrollTop = 0;

    const searchInput = document.getElementById('search-input');
    searchInput.focus();
    searchInput.addEventListener('input', executeSearch);
}

function executeSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    const resultsContainer = document.getElementById('search-results');

    if (query.length < 2) {
        resultsContainer.innerHTML = `
            <div class="text-center py-10 opacity-50">
                <svg class="w-16 h-16 mx-auto text-slate-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p class="text-slate-400">Escribe al menos 2 letras para buscar...</p>
            </div>`;
        return;
    }

    let resultados = [];

    dbUnificada.forEach(mainSec => {
        mainSec.secciones.forEach(sec => {
            sec.categorias.forEach(cat => {
                cat.acciones.forEach(acc => {
                    const textoBuscable = [
                        acc.nombre,
                        acc.resumen,
                        acc.detalles,
                        acc.etiqueta,
                        mainSec.titulo,
                        cat.nombre_categoria
                    ].filter(Boolean).join(' ').toLowerCase();

                    if (textoBuscable.includes(query)) {
                        resultados.push({ acc });
                    }
                });
            });
        });
    });

    if (resultados.length === 0) {
        resultsContainer.innerHTML = `
            <div class="text-center py-10">
                <p class="text-slate-400 text-lg">No se encontraron resultados para "<span class="text-white">${query}</span>"</p>
            </div>`;
        return;
    }

    let html = `<p class="text-sm text-emerald-500 mb-4 font-medium">Se han encontrado ${resultados.length} resultados:</p>`;
    html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;

    resultados.forEach(res => {
        html += renderCard(res.acc);
    });

    html += `</div>`;
    resultsContainer.innerHTML = html;
}

window.addEventListener('DOMContentLoaded', () => {
    renderSidebar();
    renderContent();

    document.getElementById('close-modal').addEventListener('click', () => closeModal('modal-arcdeck'));
    document.getElementById('close-modal-btn').addEventListener('click', () => closeModal('modal-arcdeck'));
    document.getElementById('modal-arcdeck').addEventListener('click', (e) => {
        if (e.target.id === 'modal-arcdeck') closeModal('modal-arcdeck');
    });

    document.querySelectorAll('#modal-lesiones [data-close]').forEach(el => {
        el.addEventListener('click', () => closeModal('modal-lesiones'));
    });
    document.getElementById('modal-lesiones').addEventListener('click', (e) => {
        if (e.target.id === 'modal-lesiones') closeModal('modal-lesiones');
    });

    document.querySelectorAll('#modal-comerciante [data-close]').forEach(el => {
        el.addEventListener('click', () => closeModal('modal-comerciante'));
    });
    document.getElementById('modal-comerciante').addEventListener('click', (e) => {
        if (e.target.id === 'modal-comerciante') closeModal('modal-comerciante');
    });

    document.querySelectorAll('#modal-aventuras [data-close]').forEach(el => {
        el.addEventListener('click', () => closeModal('modal-aventuras'));
    });
    document.getElementById('modal-aventuras').addEventListener('click', (e) => {
        if (e.target.id === 'modal-aventuras') closeModal('modal-aventuras');
    });
});
