var url = process.env.CTXURL,
		user = process.env.CTXUSER,
		sub = process.env.CTXSUB,
		Conn = require('../connection'),
		conn = new Conn(url, user),
		ctx = conn.sub(sub);

ctx.put(process.argv.slice(2).join(' '), res => console.log(res));