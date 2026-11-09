window.addEventListener('load', async () => {
  const out = []; const wait = ms => new Promise(r => setTimeout(r, ms));
  const main = () => document.getElementById('main-content');
  const txt = () => main().textContent.replace(/\s+/g, ' ');
  const btnText = t => [...document.querySelectorAll('button')].find(b => b.textContent.includes(t));
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
    // --- editor de banda: todo sale del catálogo
    AW.go('app_bands'); await wait(100);
    AW.newBand(); await wait(60);
    AW.setField('name', 'Prueba'); AW.setField('faction', 'Halflings'); AW.rerender(); await wait(30);
    const gl = () => [...document.querySelectorAll('select[data-change^="AW.addFromCatalog"] optgroup')].map(g => g.label);
    const cat = () => [...document.querySelectorAll('select[data-change^="AW.addFromCatalog"] option')].map(o => o.value);
    ok('catálogo: sin botón «Añadir miniatura» y un solo desplegable', !btnText('Añadir miniatura') && document.querySelectorAll('select[data-change^="AW.addFromCatalog"]').length === 1);
    ok('catálogo: facción propia por tipo', gl().includes('Halflings — Comandante') && gl().includes('Halflings — Héroe') && gl().includes('Halflings — Tropa') && gl().includes('Halflings — Monstruo'), gl().join('|'));
    ok('catálogo: sugiere aliados (Imperiales) sin su comandante', gl().some(l => l.startsWith('Aliados: Imperial')) && cat().includes('imperial:imperial_dragoon') && cat().includes('imperial:imperial_trooper') && !cat().includes('imperial:imperial_captain'), gl().join('|'));
    ok('catálogo: nota de aliados', txt().includes('Sugeridas por alianza'));
    ok('catálogo: Bestiario aparte', gl().some(l => l.startsWith('Bestiario')) && cat().includes('bestiary:griffling'));
    ok('catálogo: las opciones muestran los atributos', [...document.querySelectorAll('select[data-change^="AW.addFromCatalog"] option')].some(o => /Vida 10 · Mov 4 · Arm 1 · AP 4/.test(o.textContent)));
    AW.addFromCatalog('halfling:sheriff'); await wait(30);
    AW.addFromCatalog('halfling:halfling_militia'); await wait(30);
    ok('editor: total base 120', document.getElementById('aw-total').textContent === '120', document.getElementById('aw-total').textContent);
    ok('editor: perfil, tipo y coste base no se editan', !document.querySelector('input[type="number"]') && !document.querySelector('select[data-change="AW.setUnit"]') && txt().includes('Comandante') && txt().includes('80 GP'));
    ok('editor: ficha plegable en cada miniatura', document.querySelectorAll('details summary').length >= 2 && txt().includes('Make Orders'));
    const sel = document.querySelector('select[data-change="AW.addGear"][data-args^="[0,"]');
    const labels = sel ? [...sel.querySelectorAll('optgroup')].map(g => g.label + ':' + g.children.length) : [];
    ok('editor: selector de equipo con común y de facción', labels.some(l => l.startsWith('Común — Armas y equipo')) && labels.some(l => l.startsWith('Común — Armaduras')) && labels.some(l => l.startsWith('Halflings — Monturas')), labels.join('|'));
    const optsS = [...document.querySelectorAll('select[data-change="AW.addGear"][data-args^="[0,"] option')].map(o => o.value);
    ok('equipo del Sheriff: lo que permite su ficha (ids corregidos)', ['faccion:halfling_mount', 'faccion:halfling_ranged_weapon', 'faccion:packed_lunch', 'faccion:town_banner'].every(v => optsS.includes(v)) && !optsS.includes('faccion:potbelly_cauldron') && !optsS.includes('faccion:ranger_cloak'), optsS.join());
    const optsM = [...document.querySelectorAll('select[data-change="AW.addGear"][data-args^="[1,"] option')].map(o => o.value);
    ok('equipo de la milicia: sin estandarte (solo del Sheriff)', !optsM.includes('faccion:town_banner') && optsM.includes('faccion:halfling_mount'));
    ok('editor: Sheriff muestra su armadura ligera de serie', txt().includes('Light Armour (Gratis') && txt().includes('de serie'));
    ok('editor: Sheriff puede cambiar su armadura ligera por una pesada, no por otra ligera', !optsS.includes('comun:light_armour') && optsS.includes('comun:heavy_armour') && optsS.includes('comun:shield'), optsS.filter(v => /armour/.test(v)).join());
    AW.addGear(0, 'comun:light_armour'); await wait(20);
    ok('editor: otra armadura ligera se rechaza', !(AW.api.state.editing.units[0].equipo || []).length);
    AW.addGear(0, 'faccion:potbelly_cauldron'); await wait(20);
    ok('editor: equipo que su ficha no permite se rechaza', !(AW.api.state.editing.units[0].equipo || []).length);
    AW.addGear(0, 'comun:heavy_armour'); await wait(20);
    const sh = AW.api.state.editing.units[0];
    ok('editor: la pesada sustituye a la ligera de serie (+25)', document.getElementById('aw-total').textContent === '145' && (sh.serie_quitado || []).some(x => /Light Armour/.test(x)) && txt().includes('de serie · quitado'), document.getElementById('aw-total').textContent);
    const cSh = AW.sheet.catalogUnit('sheriff');
    ok('ficha: Sheriff con pesada en vez de ligera tiene Armadura 2', AW.sheet.baseStats(cSh, sh, 'Halflings').armadura === 2 && AW.sheet.cur({}, cSh, 'armadura', sh, 'Halflings') === 2 && cSh.stats.armadura === 1, JSON.stringify(AW.sheet.baseStats(cSh, sh, 'Halflings')));
    ok('ficha: sin equipo, la armadura del catálogo', AW.sheet.baseStats(cSh, { id: 'sheriff' }, 'Halflings').armadura === 1);
    AW.restoreSerie(0, 0); await wait(20);
    ok('editor: no se recupera la ligera de serie con la pesada puesta', (sh.serie_quitado || []).length === 1);
    AW.removeGear(0, 0); AW.restoreSerie(0, 0); await wait(20);
    ok('editor: quitar la pesada y recuperar la de serie', !(sh.equipo || []).length && !sh.serie_quitado && document.getElementById('aw-total').textContent === '120');
    AW.removeSerie(0, 1); await wait(20);
    ok('editor: cualquier equipo de serie se puede quitar', (sh.serie_quitado || []).length === 1 && document.getElementById('aw-total').textContent === '120');
    AW.restoreSerie(0, 1); await wait(20);
    AW.addGear(0, 'comun:shield'); AW.addGear(0, 'faccion:halfling_mount'); AW.addGear(0, 'faccion:packed_lunch'); await wait(30);
    ok('editor: total = 120 + 10 + 30 + 10', document.getElementById('aw-total').textContent === '170', document.getElementById('aw-total').textContent);
    ok('editor: filas de equipo bajo la miniatura', document.querySelectorAll('button[data-click="AW.removeGear"][data-args^="[0,"]').length === 3 && txt().includes('Ver reglas'));
    ok('editor: subtotal miniatura 130', document.getElementById('aw-sub-0').textContent === '130');
    AW.addGear(0, 'comun:shield'); await wait(20);
    ok('editor: no se duplica el mismo objeto', document.getElementById('aw-total').textContent === '170');
    AW.addGear(1, 'comun:heavy_armour'); await wait(20);
    ok('editor: armadura pesada a la milicia (+25)', document.getElementById('aw-total').textContent === '195');
    ok('ficha: milicia con armadura pesada tiene Armadura 2', AW.sheet.baseStats(AW.sheet.catalogUnit('halfling_militia'), AW.api.state.editing.units[1], 'Halflings').armadura === 2);
    AW.removeGear(0, 2); await wait(20);
    ok('editor: quitar almuerzo (-10)', document.getElementById('aw-total').textContent === '185');
    ok('editor: campo de nombre propio en cada miniatura', document.querySelectorAll('input[aria-label="Nombre propio de la miniatura"]').length === 2);
    // aliados y Bestiario
    AW.addFromCatalog('imperial:imperial_captain'); await wait(20);
    ok('aliados: un comandante aliado no se puede fichar', AW.api.state.editing.units.length === 2);
    AW.addFromCatalog('imperial:imperial_dragoon'); await wait(30);
    const dr = AW.api.state.editing.units[2];
    ok('aliados: dragón imperial fichado con su facción y marcado como aliado', dr && dr.faccion_id === 'imperial' && txt().includes('aliado · Imperiales') && dr.coste === 65, dr && JSON.stringify(dr));
    const optsD = [...document.querySelectorAll('select[data-change="AW.addGear"][data-args^="[2,"] option')].map(o => o.value);
    ok('aliados: su equipo es el de la armería imperial, no la halfling', optsD.some(v => v.startsWith('faccion:')) && !optsD.includes('faccion:halfling_mount'), optsD.join());
    AW.addFromCatalog('bestiary:griffling'); await wait(30);
    const gr = AW.api.state.editing.units[3];
    ok('Bestiario: se ficha y los monstruos no compran armería común', gr && gr.id === 'griffling' && !document.querySelector('select[data-change="AW.addGear"][data-args^="[3,"] optgroup[label^="Común"]'));
    AW.removeUnit(3); AW.removeUnit(2); await wait(30);
    const fselLock = document.querySelector('select[data-change="AW.setField"][data-args^=\'["faction"\']');
    ok('facción: con miniaturas en la banda no se puede cambiar', fselLock && fselLock.disabled && txt().includes('quita las miniaturas para cambiarla'));
    AW.setUnit(0, 'apodo', 'Bilbo'); await wait(10);
    await AW.saveBand(); await wait(150);
    const saved = db.bands.find(b => b.name === 'Prueba');
    ok('guardado: value = 185 con equipo', saved && saved.value === 185, saved && saved.value);
    ok('guardado: equipo con id, origen, nombre y coste', saved && saved.units[0].equipo.length === 2 && saved.units[0].equipo[1].origen === 'faccion' && saved.units[0].equipo[1].coste === 30, saved && JSON.stringify(saved.units[0].equipo));
    ok('guardado: apodo Bilbo sin perder el perfil Sheriff y el tipo comandante', saved && saved.units[0].apodo === 'Bilbo' && saved.units[0].nombre === 'Sheriff' && saved.units[0].tipo === 'comandante' && saved.units[1].apodo === undefined);
    ok('ficha: se ve Bilbo y, al lado, Sheriff', document.body.innerHTML.includes('Bilbo') && AWUtil.unitName(saved.units[0]) === 'Bilbo (Sheriff)');
    ok('Mis Bandas: muestra 185 GP y equipo en la ficha', txt().includes('185 GP') && document.body.innerHTML.includes('🎒'));
    // Town Guard y Tomb Guardian
    AW.go('app_bands'); await wait(60); AW.newBand(); await wait(40);
    AW.setField('name', 'Serie'); AW.setField('faction', 'Halflings'); AW.rerender(); await wait(20);
    AW.addFromCatalog('halfling:town_guard'); await wait(20);
    ok('Town Guard: armadura pesada de serie con penalizador Leg It', txt().includes('Heavy Armour') && txt().includes('+1 dificultad a Leg It'));
    ok('Town Guard: el total no cambia por el equipo de serie', document.getElementById('aw-total').textContent === '55', document.getElementById('aw-total').textContent);
    AW.api.state.editing.units = []; AW.setField('faction', 'Antiguos Muertos'); AW.rerender(); await wait(20);
    AW.addFromCatalog('ancient_dead:tomb_guardian'); await wait(20);
    AW.addGear(0, 'comun:shield'); AW.addGear(0, 'comun:spear'); await wait(20);
    const eq = AW.api.state.editing.units[0].equipo;
    ok('Tomb Guardian: -25% redondeado arriba (escudo 10->8, lanza 10->8)', eq && eq[0].coste === 8 && eq[1].coste === 8, JSON.stringify(eq && eq.map(g => g.coste)));
    const ex = AWGear.optionsFor('tomb_guardian').exclusive;
    if (ex.length) { AW.addGear(0, 'faccion:' + ex[0].id); await wait(20); ok('Tomb Guardian: armería de facción sin descuento', AW.api.state.editing.units[0].equipo[2].coste === ex[0].coste); }
    // Magos y Ourks: armería propia del compendio v4 (Ourks ya completa)
    AW.api.state.editing.units = []; AW.setField('faction', 'Magos'); AW.rerender(); await wait(20);
    AW.addFromCatalog('wizards:archmage'); await wait(20);
    const sw = document.querySelector('select[data-change="AW.addGear"][data-args^="[0,"]');
    ok('Magos: la unidad se ficha y su selector funciona', !!sw && AW.api.state.editing.units[0].id === 'archmage');
    AW.api.state.editing.units = []; AW.setField('faction', 'Ourks'); AW.rerender(); await wait(20);
    AW.addFromCatalog('ourks:ourk_chieftain'); await wait(20);
    const sel2 = document.querySelector('select[data-change="AW.addGear"][data-args^="[0,"]');
    ok('Ourks tiene armería propia', sel2 && [...sel2.querySelectorAll('optgroup')].some(g => g.label.startsWith('Ourks —')), sel2 && [...sel2.querySelectorAll('optgroup')].map(g => g.label + g.children.length).join('|'));
    ok('Ourks: aliados Beastfolk y Gremlins sugeridos', gl().some(l => l.includes('Gremlins')) && gl().some(l => l.includes('Hombres Bestia')), gl().join('|'));
    // Fichas sin equipo_permitido: se ofrece la armería de su facción (salvo monstruos)
    ok('equipo_permitido vacío: Vampiros ofrecen su armería; monstruos no', AWGear.optionsFor('vampire_thrall').exclusive.length > 0 && AWGear.optionsFor('werewolf').exclusive.length === 0 && AWGear.optionsFor('werewolf').common.length === 0);
    // Rasgos comprables dentro del selector de equipo
    AW.go('app_bands'); await wait(60); AW.newBand(); await wait(40);
    AW.setField('name', 'Bestias'); AW.setField('faction', 'Hombres Bestia'); AW.rerender(); await wait(20);
    AW.addFromCatalog('beastfolk:beastfolk_clanbeast'); await wait(20);
    const selB = document.querySelector('select[data-change="AW.addGear"][data-args^="[0,"]');
    ok('rasgos comprables (Forma Animal) aparecen como grupo del equipo', selB && [...selB.querySelectorAll('optgroup')].some(g => g.label.includes('Rasgos comprables')), selB && [...selB.querySelectorAll('optgroup')].map(g => g.label).join('|'));
    // facción como selector
    AW.go('app_bands'); await wait(60); AW.newBand(); await wait(40);
    const fsel = document.querySelector('select[data-change="AW.setField"][data-args^=\'["faction"\']');
    ok('facción: es un selector con las facciones del catálogo', fsel && [...fsel.options].filter(o => o.value).length === datosMinis.facciones.length, fsel && fsel.options.length);
    ok('sin facción: avisa de que hace falta elegirla', txt().includes('Elige una facción para ver su catálogo'));
    fsel.value = 'Halflings'; fsel.dispatchEvent(new Event('change', { bubbles: true })); await wait(40);
    ok('facción: al elegirla sale el catálogo', AW.api.state.editing.faction === 'Halflings' && !!document.querySelector('select[data-change^="AW.addFromCatalog"]'));
    // compendio v2
    currentSectionId = 'factions'; renderSidebar(); renderContent(); await wait(40);
    const tt = document.body.textContent;
    ok('compendio v2: Equipo de serie y Comunes a varias facciones', tt.includes('Equipo de serie') && tt.includes('Comunes a varias facciones'));
    ok('compendio v2: Magos sin duplicar sección por el id mal escrito', (tt.match(/Facción Magos/g) || []).length === 1, String((tt.match(/Facción Magos/g) || []).length));
    ok('compendio v2: armería de Ourks con coste', tt.includes('Brebaje del Pantano / Swamp Scrumpy (10 GP)'));
    // Rasgos: todas las miniaturas del catálogo deben tener descripción
    const sinDesc = new Set();
    datosMinis.facciones.forEach(fa => (fa.unidades || []).forEach(u => (u.rasgos || []).forEach(r => { const n = typeof r === 'string' ? r : (r.nombre || ''); if (n && !AW.sheet.traitInfo(n)) sinDesc.add(fa.nombre + ': ' + n); })));
    ok('rasgos: todos tienen descripción', sinDesc.size === 0, [...sinDesc].join(' | '));
    // Ids de facción coherentes entre archivos
    const idsMin = new Set(datosMinis.facciones.map(x => x.id));
    const rotos = new Set(); [habilidadesFaccionDB, rasgosUnidadesDB, armeriaExclusivaDB].forEach(l => l.forEach(x => { if (x.faccion_id !== 'comun' && !idsMin.has(x.faccion_id)) rotos.add(x.faccion_id); }));
    ok('ids de facción: iguales en datos_minis y datos_facciones', rotos.size === 0, [...rotos].join(','));
    ok('todas las acciones data-* de la pantalla existen', AWUtil.unresolvedActions().length === 0, AWUtil.unresolvedActions().join(','));
  } catch (e) { out.push('EXCEPCION: ' + e.message + ' | ' + ((e.stack || '').split('\n')[1] || '')); }
  out.push('errores globales: ' + (window.__errs.join('; ') || 'ninguno'));
  document.body.insertAdjacentHTML('beforeend', '<pre id="testout">' + out.join('\n').replace(/</g, '&lt;') + '</pre>');
});
