var l = console.log,
		args = process.argv.slice(2),
		view = args.join(' '),
		fs = require('fs'),
		fp = process.env.CTXPATH + '/bin/session.ctx',
		data = fs.readFileSync(fp, {encoding: 'utf8', flag: 'a+'}).split('\n'),
		Conn = require('../connection'),
		lang = require('@ctx/language'),
		parse = lang.parse,
		compose = lang.compose,
		colors = require('./colors'),
		serializeText = compose.getTextSerializer({tag: colors.codes.bright, id: colors.codes.dim}, '\n');

if(!data[data.length - 1]) data.pop();

if(data.length < 2) {
	l('use ct first');
	process.exit(1);
}

if(data.length == 2)
	data.push('');

if(data.length == 3)
	data.push(view);
else 
	data[3] = view;

data.push('');

fs.writeFileSync(fp, data.join('\n'), {encoding: 'utf8', flag: 'w+'});

new Conn(data[0], data[1]).sub(data[2]).sub(data[3]).get().then(show);

function show(text) {
	var title = `  ${data.slice(2).filter(d => d).join(' ')}  `,
			padder = colors.format(new Array(title.length + 1).join(' '), 'inverse');
	
	l('\033c');
	
	l(padder);
	l(colors.format(title.toUpperCase(), 'inverse'));
	l(padder);
	
	l('');
	
	l(serializeText(parse.text(text)));
	
	l('');
}

