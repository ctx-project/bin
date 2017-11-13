var l = console.log,
		args = process.argv.slice(2),
		fs = require('fs'),
		fp = process.env.CTXPATH + '/bin/session.ctx',
		data = fs.readFileSync(fp, {encoding: 'utf8', flag: 'a+'}).split('\n');

if(args.length == 2) {
	data = args.slice();
	data.push('');
	fs.writeFileSync(fp, data.join('\n'), {encoding: 'utf8', flag: 'w+'});
}

l('base:' + data[0]);
l('user:' + data[1]);
l('topic:' + data[2] || '');
l('view:' + data[3] || '');

if(args.length && args.length != 2) {
	l("");
	l("Usage: ct URL USER");
	l("Usage: ct");
}
