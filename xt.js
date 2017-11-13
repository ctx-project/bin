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

new Conn(data[0], data[1]).hints(item).then(l);