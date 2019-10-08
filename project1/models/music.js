const db = require('./db.js');
module.exports = {
	addMusicByObj:async sing => await db.q('insert into music (title,singer,time,filelrc,file,uid) values (?,?,?,?,?,?)',Object.values(sing)),
	updateMusic: async music => await db.q('update music set title=?,singer=?,time=?,filelrc=?,file=?,uid=? where id = ?',Object.values(music)),
	deleteMusicById:async id => await db.q('delete from music where id = ?',[id]),
	findMusicById:async id => await db.q('select * from music where id = ?',[id]),
	findMusicByUid:async id => await db.q('select * from music where uid = ?',[id])
}