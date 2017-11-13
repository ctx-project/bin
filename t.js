var l = console.log,
		args = process.argv.slice(2),
		topic = args.join(' '),
		fs = require('fs'),
		fp = process.env.CTXPATH + '/bin/session.ctx',
		data = fs.readFileSync(fp, {encoding: 'utf8', flag: 'a+'}).split('\n');
		
if(!data[data.length - 1]) data.pop();		

if(data.length < 2) {
	l('use ct first');
	process.exit(1);
}

if(data.length == 2)
	data.push(topic);
else 
	data[2] = topic;

data.push('');

fs.writeFileSync(fp, data.join('\n'), {encoding: 'utf8', flag: 'w+'});

l('topic:' + topic);
