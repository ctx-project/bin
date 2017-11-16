var l = console.log,
		args = process.argv.slice(2),
		view = args.join(' '),
		fs = require('fs'),
		fp = process.env.CTXPATH + '/bin/session.ctx',
		data = fs.readFileSync(fp, {encoding: 'utf8', flag: 'a+'}).split('\n'),
		Conn = require('../connection'),
		parse = require('@ctx/language'),
		colors = require('colors');

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
	process.stdout.write('\033c');
	l('');
	l(` ${data[2]} ${data[3]} `.inverse);
	l('');
	parse.text(text).forEach(item => {
		l(item.tokens.map(t => t.type == 'tag' ? t.body.bold : t.body).join(' ') + (item.id ? (' ' + item.id.dim) : ''));
	});
	l('');
}