var url = process.env.CTXURL,
		user = process.env.CTXUSER,
		Conn = require('../connection'),
		conn = new Conn(url, user);

conn.hints(process.argv.slice(2).join(' ')).then(console.log);