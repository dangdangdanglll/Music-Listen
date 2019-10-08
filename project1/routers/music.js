const Router = require("koa-router");
const musicController = require('../controllers/music_backup');
let musicRouter = new Router();



musicRouter
.post('/music/add-music',musicController.addMusic)
.get('/music/index',musicController.showIndex)
.delete('/music/del-music',musicController.deleteMusic)
.put('/music/update-music',musicController.updateMusic)
.get('/music/add-music',async ctx=>{
	ctx.render('add')
})
.get('/music/edit',musicController.showEdit)
module.exports = musicRouter;