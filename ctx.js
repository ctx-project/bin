var l = o => {console.log(o); return o;},
	blessed = require('blessed'),
	screen = blessed.screen({
		smartCSR: true
	}),
	Panel = require('./panel'),
	panels = [],
	focused = null,
	grid = blessed.layout({
		parent: screen,
		layout: 'grid',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
	});
	
screen.title = 'CTX';

screen.key(['C-c'], function(ch, key) {
	return process.exit(0);
});

screen.key(['~'], function(ch, key) {
	focus(panels[(panels.indexOf(focused) + 1) % panels.length]);
	screen.render();
});

var indexKeys = ['!', '@', '#', '$', '%', '^', '&', '*', '('];
screen.key(indexKeys, function(ch, key) {
	focus(panels[Math.min(indexKeys.indexOf(key.ch), panels.length -1)]);
	screen.render();
});

screen.key([')'], function(ch, key) {
	//main view
});

screen.key(['_'], function(ch, key) {
	if(panels.length < 2) return;
	remove(focused);
	focus(panels[0]);
	layout();
	screen.render();
});

screen.key(['+'], function(ch, key) {
	if(panels.length > 8) return;
	add();
	focus();
	// focused.focusTitle();
	layout();
	screen.render();
});

add();
focus();
layout();
screen.render();

function add() {
	panels.push(new Panel(screen, grid));
}

function remove(panel) {
	var ix = panels.indexOf(panel);
	panels.splice(ix, 1);
	panel.destroy();
	return ix;
}

function layout() {
	var s = Math.round(1 / Math.sqrt(panels.length) * 75) + '%';
	panels.forEach((p, ix) => {p.setSize(s); p.setIndex(ix);});
	panels = panels.sort((p1, p2) => p1.index - p2.index);
}

function focus(panel) {
	if(focused) focused.blur();
	focused = panel || panels[panels.length - 1];
	focused.focus();
}
