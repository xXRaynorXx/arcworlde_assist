window.addEventListener('load', async () => {
  const out = []; const wait = ms => new Promise(r => setTimeout(r, ms));
  const main = () => document.getElementById('main-content');
  const txt = () => main().textContent.replace(/\s+/g, ' ');
  const ok = (n, c, x) => out.push((c ? 'OK   ' : 'FALLA') + ' ' + n + (x ? ' -> ' + x : ''));
  try {
    await wait(300);
    // --- compendio
    currentSectionId = 'factions'; renderSidebar(); renderContent(); await wait(50);
    const side = document.getElementById('sidebar') ? document.getElementById('sidebar').textContent : document.body.textContent;
    ok('compendio: 11 secciones de facción', (document.body.textContent.match(/Facción [A-ZÁÉÍÓÚa-záéíóú]/g) || []).length >= 11, (document.body.textContent.match(/Facción [^\s]+/g) || []).slice(0, 14).join(','));
    ok('compendio: armería con coste', txt().includes('(10 GP)') || document.body.textContent.includes('Almuerzo Para Llevar / Packed Lunch (10 GP)'));
    const t = document.body.textContent;
    ['Armería exclusiva', 'Rasgos de unidades', 'Reglas de facción'].forEach(k => ok('compendio: categoría "' + k + '"', t.includes(k)));
    ok('compendio: sin "Otros datos (versión anterior)"', !t.includes('Otros datos') && !t.includes('versión anterior'));
    ok('compendio: facciones nuevas (Vampiros/Ourks...)', t.includes('Vampires') || t.includes('Vampiros') || t.includes('Facción Vampir'));
    // --- editor de banda
    AW.go('app_bands'); await wait(100);
    AW.newBand(); await wait(60);
    AW.setField('name', 'Prueba'); AW.setField('faction', 'Halflings'); AW.rerender(); await wait(30);
    AW.addFromCatalog(String(datosMinis.facciones[0].unidades.findIndex(u => u.id === 'sheriff'))); await wait(30);
    AW.addFromCatalog(String(datosMinis.facciones[0].unidades.findIndex(u => u.id === 'halfling_militia'))); await wait(30);
    ok('editor: total base 120', document.getElementById('aw-total').textContent === '120', document.getElementById('aw-total').textContent);
    const sel = document.querySelector('select[onchange^="AW.addGear(0"]');
    const labels = sel ? [...sel.querySelectorAll('optgroup')].map(g => g.label + ':' + g.children.length) : [];
    ok('editor: selector de equipo con común y de facción', labels.some(l => l.startsWith('Común — Armas y equipo')) && labels.some(l => l.startsWith('Común — Armaduras')) && labels.some(l => l.startsWith('Halflings — Monturas')) && labels.some(l => l.startsWith('Halflings — Objetos y consumibles')) && labels.reduce((n, l) => n + Number(l.split(':').pop()), 0) === 12, labels.join(' | '));
    ok('editor: Sheriff muestra su armadura ligera de serie', txt().includes('Light Armour (Gratis') && txt().includes('de serie'));
    const optsS = [...document.querySelectorAll('select[onchange^="AW.addGear(0"] option')].map(o => o.value);
    ok('editor: Sheriff no puede comprar más armadura (ligera/pesada)', !optsS.includes('comun:light_armour') && !optsS.includes('comun:heavy_armour') && optsS.includes('comun:shield'), optsS.filter(v => /armour/.test(v)).join());
    AW.addGear(0, 'comun:heavy_armour'); await wait(20);
    ok('editor: añadir armadura a la fuerza se rechaza', !(AW.api.state.editing.units[0].equipo || []).length);
    AW.addGear(0, 'comun:shield'); AW.addGear(0, 'faccion:halfling_mount'); AW.addGear(0, 'faccion:packed_lunch'); await wait(30);
    ok('editor: total = 120 + 15 + 30 + 10', document.getElementById('aw-total').textContent === '175', document.getElementById('aw-total').textContent);
    ok('editor: filas de equipo bajo la miniatura', document.querySelectorAll('button[onclick^="AW.removeGear(0"]').length === 3 && txt().includes('Ver reglas'));
    ok('editor: subtotal miniatura 135', document.getElementById('aw-sub-0').textContent === '135');
    AW.addGear(0, 'comun:shield'); await wait(20);
    ok('editor: no se duplica el mismo objeto', document.getElementById('aw-total').textContent === '175');
    AW.addGear(1, 'comun:heavy_armour'); await wait(20);
    ok('editor: armadura pesada a la milicia (+35)', document.getElementById('aw-total').textContent === '210');
    AW.removeGear(0, 2); await wait(20);
    ok('editor: quitar almuerzo (-10)', document.getElementById('aw-total').textContent === '200');
    AW.setUnit(1, 'coste', '50'); await wait(10);
    ok('editor: cambiar coste base actualiza total y subtotal', document.getElementById('aw-total').textContent === '210' && document.getElementById('aw-sub-1').textContent === '85');
    await AW.saveBand(); await wait(150);
    const saved = db.bands.find(b => b.name === 'Prueba');
    ok('guardado: value = 210 con equipo', saved && saved.value === 210, saved && saved.value);
    ok('guardado: equipo con id, origen, nombre y coste', saved && saved.units[0].equipo.length === 2 && saved.units[0].equipo[1].origen === 'faccion' && saved.units[0].equipo[1].coste === 30, saved && JSON.stringify(saved.units[0].equipo));
    ok('Mis Bandas: muestra 210 GP y equipo en la ficha', txt().includes('210 GP') && document.body.innerHTML.includes('🎒'));
    // cambiar de facción quita el equipo exclusivo
    AW.editBand(saved.id); await wait(50);
    AW.setField('faction', 'Imperial'); AW.rerender(); await wait(30);
    const u0 = state_units();
    function state_units() { return AW.api.state.editing.units[0].equipo.map(g => g.id).join(','); }
    ok('cambiar de facción quita monturas halfling pero conserva escudo', u0 === 'shield', u0);
    AW.addGear(0, 'faccion:arquebus'); await wait(20);
    ok('facción Imperial: arcabuz (+25)', document.getElementById('aw-sub-0').textContent === String(80 + 15 + 25), document.getElementById('aw-sub-0').textContent);
    AW.setField('faction', 'Ourks'); AW.rerender(); await wait(30);
    const sel2 = document.querySelector('select[onchange^="AW.addGear(0"]');
    ok('Ourks (id distinto entre archivos) tiene armería propia', sel2 && [...sel2.querySelectorAll('optgroup')].some(g => g.label.startsWith('Ourks —')), sel2 && [...sel2.querySelectorAll('optgroup')].map(g => g.label + g.children.length).join('|'));
    // Town Guard y Tomb Guardian
    AW.go('app_bands'); await wait(60); AW.newBand(); await wait(40);
    AW.setField('name', 'Serie'); AW.setField('faction', 'Halflings'); AW.rerender(); await wait(20);
    const f0 = datosMinis.facciones.find(f => f.id === 'halfling').unidades;
    AW.addFromCatalog(String(f0.findIndex(u => u.id === 'town_guard'))); await wait(20);
    ok('Town Guard: armadura pesada de serie con penalizador Leg It', txt().includes('Heavy Armour') && txt().includes('+1 dificultad a Leg It'));
    ok('Town Guard: el total no cambia por el equipo de serie', document.getElementById('aw-total').textContent === '55', document.getElementById('aw-total').textContent);
    AW.setField('faction', 'Antiguos Muertos'); AW.rerender(); await wait(20);
    AW.api.state.editing.units = [];
    const f1 = datosMinis.facciones.find(f => f.id === 'ancient_dead').unidades;
    AW.addFromCatalog(String(f1.findIndex(u => u.id === 'tomb_guardian'))); await wait(20);
    AW.addGear(0, 'comun:shield'); AW.addGear(0, 'comun:spear'); await wait(20);
    const eq = AW.api.state.editing.units[0].equipo;
    ok('Tomb Guardian: -25% redondeado arriba (escudo 15->12, lanza 10->8)', eq && eq[0].coste === 12 && eq[1].coste === 8, JSON.stringify(eq && eq.map(g => g.coste)));
    AW.addGear(0, 'faccion:sacred_blade'); await wait(20);
    ok('Tomb Guardian: armería de facción sin descuento (20)', AW.api.state.editing.units[0].equipo[2].coste === 20);
    // Magos: id 'wizard' mal escrito en los datos
    AW.setField('faction', 'Magos'); AW.rerender(); await wait(20);
    const sw = document.querySelector('select[onchange^="AW.addGear(0"]');
    ok('Magos: armería propia', sw && [...sw.querySelectorAll('optgroup')].some(g => g.label.startsWith('Magos —')), sw && [...sw.querySelectorAll('optgroup')].map(g => g.label).join('|'));
    // facción como selector y comandante con perfil
    AW.go('app_bands'); await wait(60); AW.newBand(); await wait(40);
    const fsel = document.querySelector('select[onchange^="AW.setField(\'faction\'"]');
    ok('facción: es un selector con las 11 facciones del catálogo', fsel && [...fsel.options].filter(o => o.value).length === datosMinis.facciones.length, fsel && fsel.options.length);
    ok('sin facción: avisa de que hace falta elegirla', txt().includes('Elige una facción para ver su catálogo'));
    fsel.value = 'Halflings'; fsel.dispatchEvent(new Event('change')); await wait(40);
    ok('facción: al elegirla sale el catálogo y el bloque Comandante', AW.api.state.editing.faction === 'Halflings' && !!document.querySelector('select[onchange^="AW.addFromCatalog"]') && txt().includes('Comandante'));
    ok('catálogo: las opciones muestran los atributos', [...document.querySelectorAll('select[onchange^="AW.addFromCatalog"] option')].some(o => /Vida 10 · Mov 4 · Arm 1 · AP 4/.test(o.textContent)));
    const csel = document.querySelector('select[onchange^="AW.setCommander"]');
    ok('comandante: selector con el perfil de la facción', csel && [...csel.options].some(o => /Sheriff/.test(o.textContent)), csel && [...csel.options].map(o => o.textContent).join('|'));
    const sIdx = datosMinis.facciones.find(f => f.id === 'halfling').unidades.findIndex(u => u.id === 'sheriff');
    AW.setCommander(String(sIdx)); await wait(30);
    ok('comandante: se añade el primero con su ficha (atributos y rasgos)', AW.api.state.editing.units[0].id === 'sheriff' && AW.api.state.editing.units[0].tipo === 'comandante' && txt().includes('Make Orders'));
    AW.addGear(0, 'comun:shield'); await wait(20);
    AW.addFromCatalog(String(datosMinis.facciones[0].unidades.findIndex(u => u.id === 'halfling_militia'))); await wait(20);
    AW.setCommander(String(sIdx)); await wait(20);
    ok('comandante: cambiarlo no duplica y conserva el equipo válido', AW.api.state.editing.units.filter(u => u.tipo === 'comandante').length === 1 && AW.api.state.editing.units[0].equipo.length === 1 && AW.api.state.editing.units.length === 2);
    AW.setCommander(''); await wait(20);
    ok('comandante: se puede quitar', !AW.api.state.editing.units.some(u => u.tipo === 'comandante') && AW.api.state.editing.units.length === 1);
    // compendio v2
    currentSectionId = 'factions'; renderSidebar(); renderContent(); await wait(40);
    const tt = document.body.textContent;
    ok('compendio v2: Equipo de serie y Comunes a varias facciones', tt.includes('Equipo de serie') && tt.includes('Comunes a varias facciones'));
    ok('compendio v2: Magos sin duplicar sección por el id mal escrito', (tt.match(/Facción Magos/g) || []).length === 1, String((tt.match(/Facción Magos/g) || []).length));
    ok('compendio v2: armería de Ourks con coste', tt.includes('Brebaje del Pantano / Swamp Scrumpy (10 GP)'));
  } catch (e) { out.push('EXCEPCION: ' + e.message + ' | ' + ((e.stack || '').split('\n')[1] || '')); }
  out.push('errores globales: ' + (window.__errs.join('; ') || 'ninguno'));
  document.body.insertAdjacentHTML('beforeend', '<pre id="testout">' + out.join('\n').replace(/</g, '&lt;') + '</pre>');
});
