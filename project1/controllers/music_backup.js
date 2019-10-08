const musicModel = require('../models/music.js');
const path = require('path');


//无id
function optUpload(ctx){
		let { title,singer,time } = ctx.request.body;
		let { file, filelrc } = ctx.request.files;
		let saveSingObj = {
			title,singer,time
		};

		saveSingObj.filelrc = "no upload filelrc";

		if(filelrc){
			saveSingObj.filelrc = '/public/files' + path.parse(filelrc.path).base;
		}
		if(!file){
			ctx.throw('歌曲必须上传');
			return;
		}
		saveSingObj.file = '/public/files' + path.parse(file.path).base;

		saveSingObj.uid = 1;

		return saveSingObj;

}

module.exports = {
	async addMusic(ctx,next){
		// ctx.request.files 
		// console.log(ctx.request.files);
		// console.log('.......................');
		// console.log(ctx.request.body);

		let saveSingObj = optUpload(ctx);

		let result = await musicModel.addMusicByObj(saveSingObj);
		ctx.body = {
			code:'001',
			msg: result.message
		}
	},
	async updateMusic(ctx,next){
		let saveSingObj = optUpload(ctx);
		let { id } = ctx.request.body;
		Object.assign(saveSingObj,{id});
		let result = await musicModel.updateMusic(saveSingObj);

		if(result.affectRows != 1){
			// ctx.throw("更新失败");
			ctx.body = {
				code:'002',msg:result.message
			}
			return;
		}
		ctx.body = {
			code:'001',msg:'更新成功'
		}
	},
  async deleteMusic(ctx,next){
    // 接收请求url中的查询字符串
    let id = ctx.request.body.id;  // ctx.query.id
    let test = ctx.request.body.id;
    console.log("***************************************"+id,test);
    // 删除音乐
    let result = await musicModel.deleteMusicById(id);
    console.log(result);
    // 后续行为
    if(result.affectedRows === 0) {
      ctx.throw('删除失败:' + result.message);
      return;
    }

    // 响应请求
    ctx.body = {
      code:'001',
      msg:'删除成功'
    }


  },
  async showEdit(ctx,next){
  	let id = ctx.query.id;
  	// let id = ctx.request.body.id;
  	// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + id);
  	let musics = await musicModel.findMusicById(id);
  	if(musics.length === 0){
  		ctx.throw('歌曲不存在');
  		return;
  	}
  	let music = musics[0];
  	ctx.render('edit',{
  		music: music
  	})
  },
  async showIndex(ctx,next){
  	let uid = 1;
  	let musics = await musicModel.findMusicByUid(uid);
  	// ctx.render = ('index',{
  	// 	musics
  	// })
  	ctx.render('index',{
  		musics:musics
  	})
  }
}