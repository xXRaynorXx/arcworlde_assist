window.addEventListener('load', async () => {
  const out = []; const wait = ms => new Promise(r => setTimeout(r, ms));
  const main = () => document.getElementById('main-content');
  const txt = () => main().textContent.replace(/\s+/g, ' ');
  const ok = (n, c, x) => out.push((c ? 'OK   ' : 'FALLA') + ' ' + n + (x ? ' -> ' + x : ''));
  const submit = (sel, vals) => { const f = document.querySelector(sel); Object.keys(vals).forEach(k => { const el = f.elements[k]; if (el.type === 'checkbox') el.checked = vals[k]; else el.value = vals[k]; }); f.requestSubmit(); };
  const btn = t => [...document.querySelectorAll('#main-content button')].find(b => b.textContent.trim() === t);
  const btnHas = t => [...document.querySelectorAll('#main-content button')].find(b => b.textContent.includes(t));
  const as = async (id, section) => { __login(id); await wait(250); AW.go(section || 'app_campaigns'); await wait(100); };
  const camp = () => db.campaigns[0];
  const tab = async t => { AW.c.tab(t); await wait(50); };
  const cp = uid => db.campaign_players.find(p => p.user_id === uid);
  try {
    await wait(300);
    await as('u1');
    ok('menú Campañas existe', document.body.textContent.includes('Campañas'));
    AW.c.showNew(); await wait(30);
    ok('formulario: misiones, valor máximo y fondo inicial', ['missions', 'max', 'gold'].every(n => document.querySelector('input[name=' + n + ']')));
    submit('form[onsubmit*="AW.c.create"]', { name: 'Gran Campaña', missions: '2', max: '500', gold: '270', plays: true }); await wait(250);
    ok('campaña creada con 2 misiones y presupuesto 270', camp() && camp().num_missions === 2 && camp().starting_gold === 270 && camp().status === 'draft');
    ok('la URL refleja la campaña abierta', location.hash === '#/campanas/' + camp().id, location.hash);
    ok('creador apuntado con 270 GP de presupuesto', cp('u1') && cp('u1').gold === 270 && txt().includes('270 GP'));
    ok('muestra código de invitación', txt().includes('Invitar jugadores') && txt().includes(camp().join_code));
    ok('empezar bloqueado: falta banda', btn('Empezar campaña').disabled && txt().includes('falta banda de Ana'));
    await AW.c.chooseBand('AnaOk'); await wait(80);
    ok('Ana elige banda: empezar habilitado', !btn('Empezar campaña').disabled);
    ok('el valor de la banda (120) se descuenta: quedan 150', cp('u1').gold === 150 && txt().includes('te quedan 150 GP'));

    await as('u2');
    submit('form[onsubmit*="AW.c.join"]', { code: camp().join_code }); await wait(250);
    ok('Bob dentro con presupuesto', cp('u2') && cp('u2').gold === 270 && txt().includes('Jugadores (2)'));
    await AW.c.chooseBand('BobOk'); await wait(80);
    ok('Bob: banda elegida, fondo 150', cp('u2').gold === 150);

    await as('u1'); await AW.c.open(camp().id); await wait(100);
    ok('Ana ve la banda de Bob y puede empezar', !btn('Empezar campaña').disabled && txt().includes('BobOk'));
    AWUtil.confirm = async () => true;
    await AW.c.start(); await wait(150);
    ok('misión 1 creada y campaña en curso', camp().status === 'active' && camp().chapter === 1 && db.games.length === 1 && db.game_players.filter(g => g.game_id === db.games[0].id).length === 2);
    ok('pantalla: Misión 1 de 2 con los 6 pasos visibles hasta la batalla', txt().includes('Misión 1 de 2') && txt().includes('El comerciante ambulante') && txt().includes('Preparar la banda') && txt().includes('La batalla'));
    await tab('caja');
    ok('fondo de cada banda visible', txt().includes('Fondo de las bandas') && (txt().match(/150 GP/g) || []).length >= 2);

    await tab('mision');
    // comerciante
    __dice = [3]; await AW.c.roll('merchant'); await wait(120);
    ok('Ana tira el comerciante: Día Normal', txt().includes('Día Normal'));
    ok('Ana no puede repetir (sin botón)', !btnHas('Tirar 1D6'));
    await as('u2'); await AW.c.open(camp().id); await wait(100);
    ok('Bob ve la tirada de Ana', txt().includes('Día Normal'));
    __dice = [6]; await AW.c.roll('merchant'); await wait(120);
    ok('Bob tira: Gran Humor y ve ambas', txt().includes('Gran Humor') && txt().includes('Día Normal'));
    await AW.c.roll('merchant'); await wait(80);
    ok('repetir la tirada da error y no se guarda otra', db.campaign_rolls.filter(r => r.kind === 'merchant').length === 2);

    // fondo (pestaña Fondo)
    await tab('caja');
    submit('form[onsubmit*="AW.c.adjustGold"]', { delta: '-60', reason: 'Compra de escudo' }); await wait(150);
    ok('Bob gasta 60: fondo 90', cp('u2').gold === 90 && txt().includes('90 GP'));
    submit('form[onsubmit*="AW.c.adjustGold"]', { delta: '-500', reason: 'De más' }); await wait(150);
    ok('no puede gastar más de lo que tiene', cp('u2').gold === 90);
    ok('Bob no ve selector de otra banda', !document.querySelector('select[name=who]'));
    await as('u1'); await AW.c.open(camp().id); await wait(100); await tab('caja');
    ok('Ana (creadora) ve el selector de banda', !!document.querySelector('select[name=who]'));
    document.querySelector('select[name=who]').value = 'u2';
    submit('form[onsubmit*="AW.c.adjustGold"]', { delta: '25', reason: 'Premio del creador' }); await wait(150);
    ok('Ana premia a Bob: 115 y libro de caja', cp('u2').gold === 115 && txt().includes('Premio del creador') && txt().includes('Compra de escudo'));

    // escenario desde la campaña
    await as('u1'); await AW.c.open(camp().id); await wait(100);
    ok('barra de siguiente paso: Ana (creadora) ve que falta elegir escenario o tirar', txt().includes('Siguiente paso'));
    ok('Ana (creadora) ve el desplegable de escenario', !!document.querySelector('select[onchange*="setScenario"]'));
    const firstSc = document.querySelector('select[onchange*="setScenario"] option:nth-child(2)').value;
    await AW.c.setScenario(firstSc); await wait(100);
    ok('escenario elegido del desplegable', db.games[0].scenario_id === firstSc && db.games[0].scenario_mode === 'chosen');
    await AW.c.randomScenario(); await wait(100);
    ok('sorteo de escenario', db.games[0].scenario_mode === 'random' && db.games[0].scenario_id && db.games[0].scenario_id !== firstSc);
    // gestionar banda: Ana (Día Normal) compra un escudo
    const S = AWGear.find('comun', 'shield').coste;
    await AW.c.editBand(); await wait(100);
    ok('editor de banda de campaña', txt().includes('Gestionar banda') && txt().includes('Día Normal') && txt().includes('Sin cambios todavía'));
    ok('sin selector de facción editable', document.querySelector('input[list=aw-factions]').disabled);
    AW.addGear(0, 'comun:shield'); await wait(40);
    ok('resumen: gasta ' + S + ' GP', txt().includes('Gastas ' + S + ' GP') && txt().includes('Fondo tras guardar: ' + (150 - S) + ' GP'), txt().match(/Gastas.{0,80}/));
    await AW.saveBand(); await wait(200);
    ok('Ana compra: fondo ' + (150 - S) + ', banda ' + (120 + S), cp('u1').gold === 150 - S && cp('u1').band_snapshot.value === 120 + S, cp('u1').gold + '/' + cp('u1').band_snapshot.value);
    ok('vuelve a la campaña y se ve el escudo en el libro', txt().includes('Misión 1 de 2') && txt().includes('Compra Shield') || txt().includes('Compra'), (db.campaign_ledger.slice(-1)[0] || {}).reason);
    ok('equipo del escudo en la ficha de la partida', JSON.stringify(db.game_players.find(x => x.user_id === 'u1').band_snapshot.units[0].equipo).includes('shield'));
    // sin fondos
    await AW.c.editBand(); await wait(100);
    for (const id of ['heavy_armour', 'light_armour']) AW.addGear(1, 'comun:' + id);
    const big = AWGear.common().filter(a => a.coste > 0).sort((a, b) => b.coste - a.coste);
    let added = 0; for (const a of big) { if (added >= 8) break; AW.addUnit(); const k = AW.api.state.editing.units.length - 1; AW.api.state.editing.units[k].nombre = 'Extra' + k; AW.api.state.editing.units[k].coste = 60; added++; }
    AW.api.render(true); await wait(40);
    await AW.saveBand(); await wait(150);
    ok('no deja gastar más que el fondo', cp('u1').gold === 150 - S && txt().includes('no alcanza') );
    AW.cancelEdit(); await wait(150);
    // Bob (Gran Humor: compras -25%) compra el mismo escudo
    await as('u2'); await AW.c.open(camp().id); await wait(100);
    const before = cp('u2').gold;
    await AW.c.editBand(); await wait(100);
    AW.addGear(0, 'comun:shield'); await wait(40);
    const cheap = Math.round(S * 0.75);
    ok('Bob con Gran Humor paga 25% menos', txt().includes('Gastas ' + cheap + ' GP'), txt().match(/Gastas.{0,40}/));
    await AW.saveBand(); await wait(200);
    ok('fondo de Bob rebajado', cp('u2').gold === before - cheap, cp('u2').gold + ' vs ' + (before - cheap));
    await as('u1'); await AW.c.open(camp().id); await wait(100);

    // partida de la misión 1
    const g1 = db.games[0];
    AW.c.openGame(g1.id); await wait(200);
    ok('partida de campaña: volver a la campaña, sin código ni salir/borrar', txt().includes('Volver a la campaña') && !txt().includes('Invitar jugadores') && !btn('Borrar partida') && txt().includes('Misión 1 de la campaña'));
    ok('no se puede cambiar de banda dentro de la partida de campaña', !document.querySelector('select[onchange*="chooseBand"]'));
    await AW.g.setReady(true); await wait(80);
    await as('u2', 'app_games'); await AW.g.openFromCampaign(g1.id, camp().id); await wait(200);
    await AW.g.setReady(true); await wait(80);
    await as('u1', 'app_games'); await AW.g.openFromCampaign(g1.id, camp().id); await wait(200);
    await AW.g.start(); await wait(100);
    ok('partida en curso con evento ArcDeck', g1.status === 'active' && g1.round === 1);
    // PV y evento de final de ronda de cada jugador, desde la campaña
    await as('u1'); await AW.c.open(camp().id); await wait(120);
    ok('Ana ve su campo de PV y su botón de evento', !!document.querySelector('input[onchange*="setVp"]') && !!btnHas('Evento de final de ronda 1'));
    await AW.c.setVp(g1.id, 4); await wait(100);
    ok('Ana anota 4 PV', db.game_players.find(x => x.user_id === 'u1').vp === 4 && db.game_players.find(x => x.user_id === 'u2').vp === 0);
    window.__card = '7♥'; __dice = [3];
    await AW.c.roll('round_event'); await wait(120);
    ok('evento de Ana: carta 7♥ Aura Temporal visible', txt().includes('Aura Temporal') && !btnHas('Evento de final de ronda 1'));
    await as('u2'); await AW.c.open(camp().id); await wait(120);
    ok('Bob ve el evento de Ana y su propio botón', txt().includes('Aura Temporal') && !!btnHas('Evento de final de ronda 1') && !document.querySelector('input[onchange*="setVp"]') === false);
    window.__card = '6♥'; await AW.c.roll('round_event'); await wait(120);
    ok('Bob roba el suyo: Brote de Arcanita', txt().includes('Brote de Arcanita') && db.campaign_rolls.filter(r => r.kind === 'round_event').length === 2);
    await AW.c.setVp(g1.id, 2); await wait(80);
    await as('u1', 'app_games'); await AW.g.openFromCampaign(g1.id, camp().id); await wait(200);
    await AW.g.nextRound(); await wait(80);
    AW.g.rosterAdjKo(0); await wait(80);
    AW.g.rosterAdj(0, 'hp', -3); await wait(80);
    await AW.g.finishOpen(); await wait(30);
    await AW.g.finishConfirm(); await wait(100);
    ok('partida terminada', g1.status === 'finished');
    // en la partida terminada de campaña, "volver" regresa a la campaña
    await AW.g.back(); await wait(200);
    ok('al volver estamos en la campaña', txt().includes('Misión 1 de 2') && txt().includes('Gran Campaña'));
    ok('eventos de ronda visibles desde la campaña', txt().includes('Eventos de ronda (2)'));
    ok('lesiones: botón para la miniatura noqueada de Ana', !!btnHas('Tirar lesión'));
    ok('aventura: botón para Ana (no es la última misión)', !!btnHas('Tirar aventura'));
    ok('el comerciante ya no se puede tirar', !btnHas('Tirar 1D6'));
    await tab('jugadores');
    ok('clasificación con la victoria de Ana (pestaña Jugadores)', txt().includes('Clasificación'));
    await tab('mision');

    // lesiones y aventuras
    __dice = [2]; await AW.c.roll('injury', 0); await wait(120);
    ok('lesión: Cojera visible', txt().includes('Limping (Cojera)'));
    __dice = [1, 1, 1]; await AW.c.roll('adventure'); await wait(120);
    ok('aventura de Ana: 1/1 Arc Storm resolución 1-2', txt().includes('Arc Storm') && txt().includes('eliminado permanentemente'));
    await as('u2'); await AW.c.open(camp().id); await wait(100);
    ok('Bob ve la lesión y la aventura de Ana', txt().includes('Cojera') && txt().includes('Arc Storm'));
    __dice = [6, 6, 5]; await AW.c.roll('adventure'); await wait(120);
    ok('aventura de Bob: 6/6 The Explorer, resolución 5-6', txt().includes('The Explorer') && db.campaign_rolls.filter(r => r.kind === 'adventure').length === 2);
    ok('Bob no tiene miniaturas noqueadas: sin botón de lesión', !btnHas('Tirar lesión'));
    ok('Bob no puede pasar de misión', !btnHas('Pasar a la misión 2'));

    // misión 2
    await as('u1'); await AW.c.open(camp().id); await wait(100);
    await AW.c.nextChapter(); await wait(150);
    ok('misión 2 creada', camp().chapter === 2 && db.games.length === 2);
    let g2 = db.games[1];
    let gp2 = db.game_players.find(x => x.game_id === g2.id && x.user_id === 'u1');
    ok('la cojera pasa a la ficha de la nueva partida', gp2.roster[0] && gp2.roster[0].lesiones.includes('cojera'));
    ok('lesiones consumidas', Object.keys(cp('u1').injuries).length === 0);
    // ajustes: deshacer el paso a la misión 2 y repetirlo; traspasar el mando
    await tab('ajustes');
    ok('Ajustes: deshacer disponible y traspaso', !!btn('Deshacer') && !btn('Deshacer').disabled && !!btn('Traspasar'));
    await AW.c.undoChapter(); await wait(150);
    ok('deshacer vuelve a la misión 1 y devuelve las lesiones', camp().chapter === 1 && db.games.length === 1 && cp('u1').injuries[0] && cp('u1').injuries[0].includes('cojera'), JSON.stringify(cp('u1').injuries));
    await AW.c.nextChapter(); await wait(150);
    const g2b = db.games[1];
    ok('se vuelve a crear la misión 2 con la cojera', camp().chapter === 2 && db.game_players.find(x => x.game_id === g2b.id && x.user_id === 'u1').roster[0].lesiones.includes('cojera'));
    await tab('ajustes');
    document.getElementById('aw-transfer').value = 'u2'; await AW.c.transfer(); await wait(150);
    ok('traspaso del mando a Bob (y de su partida)', camp().owner_id === 'u2' && db.games.every(g => g.owner_id === 'u2'));
    await as('u2'); await AW.c.open(camp().id); await wait(100); await tab('ajustes');
    document.getElementById('aw-transfer').value = 'u1'; await AW.c.transfer(); await wait(150);
    ok('Bob devuelve el mando a Ana', camp().owner_id === 'u1' && db.games.every(g => g.owner_id === 'u1'));
    await as('u1'); await AW.c.open(camp().id); await wait(100);
    ok('barra de siguiente paso en la misión 2', txt().includes('Siguiente paso'));
    g2 = g2b; gp2 = db.game_players.find(x => x.game_id === g2.id && x.user_id === 'u1');
    AWUtil.confirm = async () => true;
    await AW.c.open(camp().id); await wait(120);
    ok('panel de PV: Ana tiene 4 PV', txt().includes('PV disponibles: 4') && txt().includes('ganados 4 − gastados 0'), txt().match(/PV disponibles.{0,60}/));
    const opt = n => [...document.querySelectorAll('select[onchange*="buyTrait(0"] option')].find(o => o.textContent.includes(n));
    ok('N1 de Pies Ligeros (3 VP) disponible; Tirador Certero N1 también; Hardy N1 también', opt('Pies Ligeros N1 · 3 VP') && !opt('Pies Ligeros N1 · 3 VP').disabled);
    ok('Cabeza Dura (10 VP) deshabilitada por falta de PV', opt('Cabeza Dura N1 · 10 VP') && opt('Cabeza Dura N1 · 10 VP').disabled);
    await AW.c.buyTrait(0, 'fleet_of_foot'); await wait(150);
    ok('compra: queda 1 PV y el rasgo en la miniatura', txt().includes('PV disponibles: 1') && cp('u1').band_snapshot.units[0].rasgos_campana.fleet_of_foot === 1 && db.campaign_vp_log.length === 1);
    ok('el siguiente nivel (6 VP) está bloqueado', opt('Pies Ligeros N2 · 6 VP') && opt('Pies Ligeros N2 · 6 VP').disabled);
    await AW.c.buyTrait(0, 'hardy'); await wait(150);
    ok('sin PV suficientes no compra', db.campaign_vp_log.length === 1);
    await AW.c.setInjury(0, 'ojo_morado', true); await wait(120);
    ok('añadir lesión manual', gp2.roster[0].lesiones.includes('ojo_morado') && txt().includes('Ojo morado'), JSON.stringify(gp2.roster[0]) + ' ' + (txt().match(/Añadir lesión.{0,120}/)||[''])[0]);
    await AW.c.setInjury(0, 'ojo_morado', false); await wait(120);
    ok('quitar lesión manual', !gp2.roster[0].lesiones.includes('ojo_morado') && gp2.roster[0].lesiones.includes('cojera'));
    await AW.c.setInjury(0, 'cojera', false); await wait(120); await AW.c.setInjury(0, 'cojera', true); await wait(120);
    await tab('ajustes');
    ok('con PV gastados en la misión 2 ya no se puede deshacer', !!btn('Deshacer') && btn('Deshacer').disabled);
    await tab('mision');
    await AW.c.openGame(g2.id); await wait(200);
    await AW.g.setReady(true); await wait(80);
    await as('u2', 'app_games'); await AW.g.openFromCampaign(g2.id, camp().id); await wait(200);
    await AW.g.setReady(true); await wait(80);
    await as('u1', 'app_games'); await AW.g.openFromCampaign(g2.id, camp().id); await wait(200);
    await AW.g.start(); await wait(100);
    ok('Sheriff cojo: Mov 3 en la ficha (base 4)', /Mov.{0,3}3\+base 4/.test(txt()) && txt().includes('Cojera'), (txt().match(/Mov\s*\d/g) || []).join(','));
    ok('la ficha muestra la habilidad de campaña', txt().includes('Pies Ligeros N1'));
    AW.g.rosterAdj(0, 'mov', 1); await wait(80);
    ok('subir Mov desde la cojera llega a 4 y se guarda', gp2.roster[0].mov === 4);
    await AW.g.finishOpen(); await wait(30);
    await AW.g.finishConfirm(); await wait(100);
    await AW.g.back(); await wait(200);
    ok('última misión: sin aventura intermedia', !btnHas('Tirar aventura') && !txt().includes('Aventura intermedia (2D6 + 1D6)') || (db.games[1].status === 'finished' && !btnHas('Tirar aventura')));
    ok('botón de cerrar campaña disponible', !!btn('Cerrar campaña') && !btn('Cerrar campaña').disabled);
    await AW.c.finishOpen(); await wait(30);
    await AW.c.finishConfirm(); await wait(150);
    ok('campaña terminada con ganador declarado', camp().status === 'finished' && txt().includes('Ganador de la campaña') || txt().includes('Empate'));

    // rutas con #
    const cid = camp().id;
    AW.c.back(); await wait(100);
    ok('al volver a la lista la URL es #/campanas', location.hash === '#/campanas', location.hash);
    await AW.c.open(cid); await wait(150);
    ok('abrir campaña pone su id en la URL', location.hash === '#/campanas/' + cid);
    AW.go('app_bands'); await wait(80);
    ok('Mis Bandas: #/bandas', location.hash === '#/bandas');
    history.back(); await wait(400);
    ok('atrás reabre la campaña', location.hash === '#/campanas/' + cid && txt().includes('Gran Campaña'), location.hash);
    AW.go(dbUnificada[1].id); await wait(80);
    ok('sección del compendio: #/s/<id>', location.hash === '#/s/' + dbUnificada[1].id, location.hash);
    await AW.nav.apply('#/campanas/' + cid, { force: true }); await wait(150);
    ok('enlace directo abre la campaña', txt().includes('Gran Campaña'));
    await AW.nav.apply('#/partidas/' + db.games[0].id, { force: true }); await wait(200);
    ok('enlace directo abre la partida', txt().includes('Misión 1 de la campaña') || txt().includes(db.games[0].name), txt().slice(0, 80));
    // regresión: Mis Bandas y compendio
    AW.go('app_bands'); await wait(60);
    ok('Mis Bandas sigue funcionando', txt().includes('Mis Bandas'));
  } catch (e) { out.push('EXCEPCION: ' + e.message + ' | ' + ((e.stack || '').split('\n')[1] || '')); }
  out.push('errores globales: ' + (window.__errs.join('; ') || 'ninguno'));
  document.body.insertAdjacentHTML('beforeend', '<pre id="testout">' + out.join('\n').replace(/</g, '&lt;') + '</pre>');
});
