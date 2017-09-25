var url = process.env.CTXURL,
		user = process.env.CTXUSER,
		Conn = require('../connection'),
		conn = new Conn(url, user);

conn.hint(process.argv.slice(2).join(' '), res => console.log(res));