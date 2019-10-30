var l = console.log,
		blessed = require('blessed'),
		lang = require('@ctx/language'),
		parse = lang.parse,
		compose = lang.compose,
		serializeText = compose.getTextSerializer({tag: ['{yellow-fg}{bold}', '{/}'], id: false}, '\n');
		theme = {
			section: 'white',
			focus: 'yellow'
		};

module.exports = class Panel {
	constructor(screen, grid) {
		this.screen = screen;
		this.grid = grid;
		this.focused = false;
		this.title = 'OTELO BUGS';
		this.buildContainerBox();
		this.buildIndexBox();
		this.buildTitleBox();
		this.buildContentBox();
		
		this.putText();
	}
	
	buildContainerBox() {
		this.containerBox = blessed.box({
			parent: this.grid,
			padding: 1,
		});
	}
	
	buildIndexBox() {
		this.indexBox = blessed.box({
			parent: this.containerBox,
			left: 0,
			top: 0,
			height: 3,
			width: 4,
			padding: {left: 1, top: 1, right: 0, bottom: 1},
			style: {
				fg: 'black',
				bg: theme.section,
			}
		});
	}

	buildTitleBox() {
		this.titleBox = blessed.textbox({
			parent: this.containerBox,
			inputOnFocus: true,
			left: 3,
			top: 0,
			height: 3,
			tags: false,
			padding: {left: 1, top: 1, right: 2, bottom: 1},
			shrink: true,
			style: {
				fg: 'black',
				bg: theme.section,
				bold: true
			}
		});

		this.titleBox.setValue(this.title);

		this.titleBox.on('submit', function() {
			this.title = this.titleBox.value;
			this.contentBox.focus();
			this.putText();
		}.bind(this));
		
		this.titleBox.on('cancel', function() {
			this.titleBox.setValue(this.title);
			this.screen.render();
			this.contentBox.focus();
		}.bind(this));
		
	}
	
	buildContentBox() {
		this.contentBox = blessed.textarea({
			parent: this.containerBox,
			inputOnFocus: true,
			left: 0,
			top: 3,
			padding: {top: 1},
			tags: true,
			scrollable: true,
			style: {
				fg: 'white',
				scrollbar: {
					fg: 'yellow',
					bg: 'blue'
				},
			}
		});
		
		this.contentBox.key(['C-e'], function(ch, key) {
			this.focusTitle();
		}.bind(this));
	}
	
	focus() {
		this.indexBox.style.bg = theme.focus;
		this.titleBox.style.bg = theme.focus;
		// this.contentBox.focus();
		// this.titleBox.focus();
	}
		
	blur() {
		this.indexBox.style.bg = theme.section;
		this.titleBox.style.bg = theme.section;
		this.titleBox.setValue(this.title);
	}
	
	focusTitle() {
		this.titleBox.focus();
	}
	
	setIndex(ix) {
		this.indexBox.setContent(`${ix + 1}.`);
	}
	
	setSize(width, height) {
		if(height == undefined) height = width;
		this.containerBox.position = {width, height}
	}
	
	destroy() {
		this.containerBox.destroy();
	}
	
	async putText() {
		var text = '';
		if(this.title) text = await this.getText();
		text = serializeText(parse.text(text));
		this.contentBox.setValue(text);
		this.screen.render();
	}
	
	async getText() {
		return new Promise(function(resolve, reject) {
			setTimeout(resolve, 500, `se buseste la .relogin 1 ~1246
.conflict bio/client ~1247
in posturi cu multe poze, pe .iphone mi se blocheaza scroll ~1248
.Important touch edit unit ia si add res ~1250
*view important ~1305
gica.popica age:36 born:26 feb 1985 at the sea
se buseste la .relogin 1 ~1246
.conflict bio/client ~1247
in posturi cu multe poze, pe .iphone mi se blocheaza scroll ~1248
.Important touch edit unit ia si add res ~1250
*view important ~1305
gica.popica age:36 born:26 feb 1985 at the sea
se buseste la .relogin 1 ~1246
.conflict bio/client ~1247
in posturi cu multe poze, pe .iphone mi se blocheaza scroll ~1248
.Important touch edit unit ia si add res ~1250
*view important ~1305
gica.popica age:36 born:26 feb 1985 at the sea
se buseste la .relogin 1 ~1246
.conflict bio/client ~1247
in posturi cu multe poze, pe .iphone mi se blocheaza scroll ~1248
.Important touch edit unit ia si add res ~1250
*view important ~1305
gica.popica age:36 born:26 feb 1985 at the sea
se buseste la .relogin 1 ~1246
.conflict bio/client ~1247
in posturi cu multe poze, pe .iphone mi se blocheaza scroll ~1248
.Important touch edit unit ia si add res ~1250
*view important ~1305
gica.popica age:36 born:26 feb 1985 at the sea
se buseste la .relogin 1 ~1246
.conflict bio/client ~1247
in posturi cu multe poze, pe .iphone mi se blocheaza scroll ~1248
.Important touch edit unit ia si add res ~1250
*view important ~1305
gica.popica age:36 born:26 feb 1985 at the sea
se buseste la .relogin 1 ~1246
.conflict bio/client ~1247
in posturi cu multe poze, pe .iphone mi se blocheaza scroll ~1248
.Important touch edit unit ia si add res ~1250
*view important ~1305
gica.popica age:36 born:26 feb 1985 at the sea`);
		});
	}
}
