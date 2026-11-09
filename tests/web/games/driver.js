window.addEventListener('load', async () => {
  const out = []; const wait = ms => new Promise(r => setTimeout(r, ms));
  const main = () => document.getElementById('main-content').textContent.replace(/\s+/g, ' ');
  const ok = (name, cond, extra) => out.push((cond ? 'OK   ' : 'FALLA') + ' ' + name + (extra ? ' -> ' + extra : ''));
  const submit = (sel, vals) => { const f = document.querySelector(sel); Object.keys(vals).forEach(k => { const el = f.elements[k]; if (el.type === 'checkbox') el.checked = vals[k]; else el.value = vals[k]; }); f.requestSubmit(); };
  const btn = t => [...document.querySelectorAll('#main-content button')].find(b => b.textContent.trim() === t);
  const sideInput = () => document.querySelector('input[placeholder="Bando / equipo"]');
  const evName = (envId, card) => { const e = datosArcdeck.entornos.find(x => x.id === envId); const k = card === '🃏' ? 'Joker' : (card.slice(0, -1) === 'A' ? 'As' : card.slice(0, -1)); return e.cartas[k].nombre; };
  try {
    await wait(300);
    AW.go('app_games'); await wait(100);
    AW.g.showNew(); await wait(30);
    ok('formulario: jugadores y entorno', !!document.querySelector('input[name=players]') && document.querySelectorAll('select[name=env] option').length === 2);
    submit('form[data-submit*="AW.g.create"]', { name: 'Duelo', max: '400', players: '2', scenario: '', env: 'vauhaemia', plays: true }); await wait(200);
    const g = db.games[0];
    ok('partida de 2 jugadores creada en Vauhaemia', g.max_players === 2 && g.arcdeck_env === 'vauhaemia');
    ok('cabecera 1/2 y ajustes del creador', main().includes('👥 1/2') && main().includes('Ajustes') && main().includes('Jugadores (1/2)'));
    await AW.g.chooseBand('AnaOk'); await wait(60);
    ok('bando automatico = facción de la banda (Halflings)', sideInput() && sideInput().value === 'Halflings', sideInput() && sideInput().value);
    ok('Ana ve boton OK', !!btn('OK, estoy listo'));
    ok('empezar bloqueado: faltan jugadores', btn('Empezar partida').disabled && main().includes('faltan jugadores (1 de 2)'));
    await AW.g.setReady(true); await wait(60);
    ok('Ana lista', main().includes('✅ Listo') && !!btn('Quitar mi OK'));

    __login('u2'); await wait(250); AW.go('app_games'); await wait(100);
    submit('form[data-submit*="AW.g.join"]', { code: g.join_code }); await wait(250);
    ok('Bob dentro 2/2', main().includes('Jugadores (2/2)'));
    ok('Bob sin boton OK hasta elegir banda', !btn('OK, estoy listo') && main().includes('Elige una banda para poder dar tu OK'));
    __login('u3'); await wait(250); AW.go('app_games'); await wait(100);
    submit('form[data-submit*="AW.g.join"]', { code: g.join_code }); await wait(200);
    ok('Carol: partida completa', document.body.textContent.includes('La partida está completa') && db.game_players.length === 2);

    __login('u2'); await wait(250); AW.go('app_games'); await wait(100); await AW.g.open(g.id); await wait(80);
    await AW.g.chooseBand('BobOk'); await wait(60);
    ok('Bob: bando automatico Ourks', db.game_players.find(p => p.user_id === 'u2').side === 'Ourks');
    await AW.g.setReady(true); await wait(60);
    ok('Bob dio su OK', db.game_players.find(p => p.user_id === 'u2').ready === true);

    __login('u1'); await wait(250); AW.go('app_games'); await wait(100); await AW.g.open(g.id); await wait(100);
    ok('Ana: empezar habilitado, todo listo', !btn('Empezar partida').disabled && main().includes('Todo listo.'));
    ok('antes de empezar no hay cuadro ArcDeck', !main().includes('Evento ArcDeck'));
    await AW.g.start(); await wait(80);
    ok('al empezar sale el cuadro Evento ArcDeck en Ronda 1', main().includes('Evento ArcDeck') && main().includes('Ronda 1') && !!btn('Final de ronda'), main().slice(0, 40));
    ok('muestra entorno Vauhaemia y el evento de la carta', main().includes('Tierras de Vauhaemia') && main().includes(evName('vauhaemia', g.arcdeck_card)), g.arcdeck_card + ' = ' + evName('vauhaemia', g.arcdeck_card));
    ok('sin historial en la ronda 1', !main().includes('Eventos anteriores'));

    await AW.g.nextRound(); await wait(80);
    ok('final de ronda: Ronda 2 con nueva carta', g.round === 2 && main().includes('Ronda 2') && main().includes(evName('vauhaemia', g.arcdeck_card)), g.arcdeck_card);
    ok('historial con la ronda 1', main().includes('Eventos anteriores (1)'));
    await AW.g.nextRound(); await wait(80); await AW.g.nextRound(); await wait(80);
    ok('rondas suben: 4 y joker bien mostrado', g.round === 4 && main().includes('Ronda 4') && main().includes('Eventos anteriores (3)'), g.arcdeck_card);

    __login('u2'); await wait(250); AW.go('app_games'); await wait(100); await AW.g.open(g.id); await wait(100);
    ok('Bob ve el mismo evento (Ronda 4) y puede pulsar', main().includes('Ronda 4') && !!btn('Final de ronda'));
    await AW.g.nextRound(); await wait(80);
    ok('Bob avanza a la ronda 5', g.round === 5 && main().includes('Ronda 5'));


    // ---- Ficha de banda
    __login('u1'); await wait(250); AW.go('app_games'); await wait(100); await AW.g.open(g.id); await wait(100);
    ok('ficha: stats y rasgos del Sheriff visibles', main().includes('Sheriff') && main().includes('Vida') && main().includes('Make Orders') && main().includes('Rousing Cheer'));
    const ana = () => db.game_players.find(p => p.game_id === g.id && p.user_id === 'u1');
    AW.g.rosterAdj(0, 'hp', -1); await wait(80);
    ok('vida del Sheriff 10 -> 9 guardada', ana().roster[0] && ana().roster[0].hp === 9, JSON.stringify(ana().roster));
    AW.g.rosterAdj(0, 'hp', -1); AW.g.rosterAdj(0, 'hp', -1); await wait(120);
    ok('clics rápidos acumulan (7)', ana().roster[0].hp === 7);
    AW.g.rosterAdjLesion(0, 'cojera', true); await wait(80);
    ok('cojera: Mov 4 -> 3 y lesión anotada', ana().roster[0].mov === 3 && ana().roster[0].lesiones.includes('cojera') && main().includes('Cojera'));
    AW.g.rosterAdjLesion(0, 'cojera', false); await wait(80);
    ok('quitar cojera devuelve Mov 4', ana().roster[0].mov === 4);
    AW.g.rosterAdjKo(1); await wait(80);
    ok('noquear a la milicia', ana().roster[1].ko === true && main().includes('Noqueado'));
    AW.g.rosterAdjReset(0); await wait(80);
    ok('restaurar vuelve a base', ana().roster[0].hp === undefined);
    __login('u2'); await wait(250); AW.go('app_games'); await wait(100); await AW.g.open(g.id); await wait(100);
    ok('Bob ve la ficha de Ana en solo lectura (noqueado, sin botones)', main().includes('Noqueado') && !btn('Levantar'));
    AW.g.rosterAdj(0, 'hp', -1); await wait(60);
    ok('Bob no puede tocar la ficha de Ana', ana().roster[0].hp === undefined);
    AW.go('app_bands'); await wait(100);
    ok('Mis Bandas muestra ficha con rasgos', document.body.innerHTML.includes('Ver ficha'));

    __login('u1'); await wait(250); AW.go('app_games'); await wait(100);
    AW.g.showNew(); await wait(30);
    submit('form[data-submit*="AW.g.create"]', { name: 'Solo', max: '400', players: '1', scenario: '', env: 'mildaark', plays: true }); await wait(200);
    ok('solitario: sin boton OK', !btn('OK, estoy listo') && main().includes('👥 1/1'));
    await AW.g.chooseBand('AnaOk'); await wait(60);
    ok('solitario: empezar habilitado sin OK', !btn('Empezar partida').disabled);
    await AW.g.start(); await wait(80);
    ok('solitario: ArcDeck Bosque de Mildaark', main().includes('Bosque de Mildaark') && main().includes('Ronda 1'));
    await AW.g.finishOpen(); await wait(20); await AW.g.finishConfirm(); await wait(80);
    ok('terminada: historial visible, sin boton de ronda', !btn('Final de ronda') && main().includes('Evento ArcDeck'));
    ok('compendio sigue funcionando', (currentSectionId = 'core_rules', renderSidebar(), renderContent(), document.querySelector('#main-content h2').textContent === 'Reglas Básicas'));
    ok('todas las acciones data-* de la pantalla existen', AWUtil.unresolvedActions().length === 0, AWUtil.unresolvedActions().join(','));
  } catch (e) { out.push('EXCEPCION: ' + e.message + ' | ' + ((e.stack || '').split('\n')[1] || '')); }
  out.push('errores globales: ' + (window.__errs.join('; ') || 'ninguno'));
  document.body.insertAdjacentHTML('beforeend', '<pre id="testout">' + out.join('\n').replace(/</g, '&lt;') + '</pre>');
});
