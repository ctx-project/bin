var l = console.log,
		args = process.argv.slice(2),
		item = args.join(' '),
		fs = require('fs'),
		fp = process.env.CTXPATH + '/bin/session.ctx',
		data = fs.readFileSync(fp, {encoding: 'utf8', flag: 'a+'}).split('\n'),
		Conn = require('../connection');

if(data.length < 2) {
	l('use ct first');
	process.exit(1);
}

if(data.length < 3) {
	l('use t first');
	process.exit(1);
}

if(data.length < 4) {
	l('use x first');
	process.exit(1);
}

new Conn(data[0], data[1]).sub(data[2]).sub(data[3]).put(item).then(l);