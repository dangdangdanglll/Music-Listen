const userModel = require('../models/user');
const captchapng = require('captchapng2');
module.exports = {
	showRegister: async (ctx,next)=>{

		console.log("dangsenlin");
		// let users = await userModel.getUsers();
		// console.log(users);
		// ctx.render('register');
	},
	checkUsername: async (ctx,next) => {

		

		// console.log( ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + username);
		// console.log("helloworld");

		let { username } = ctx.request.body;
		let users = await userModel.findUserByUsername(username);
		if(users.length === 0){
			ctx.body = { code: '001',msg: "可以注册"};
			return;
		}
		ctx.body = {code: "002",msg:'用户已经存在'};
	},
	doRegister: async (ctx,next) => {

		console.log("test")

		let { username,password,email } = ctx.request.body;

		let users = await userModel.findUserByUsername(username);
		if(users.length != 0){
			ctx.body = { code:'002',msg:'已经存在'};
			return;
		}



		try{
			let result = await userModel.registerUser(
				username,password,email
			);
			if(result.affectRows === 1){
				ctx.body = {code:'001',msg:"注册成功"};
				return;
			}
			ctx.body = {code:'002',msg:'已经存在'};
		}catch(e){
			ctx.throw("出错了")
		}
	},

	async doLogin(ctx,next){
		let {username,password} = ctx.request.body;
		let  users = await userModel.findUserDataByUsername(username);

		// console.log(users,username,password);

		if(users.length === 0){
			ctx.body = {
				code:'002',msg:'用户名或密码错误'
			}
			return;
		}
		let user = users[0];
		// console.log(users.password,password);
		if(user.password === password){
			ctx.body = {code:'001',msg:'登录成功'};
			ctx.session.user = user;
			return;
		}
		ctx.body = {code:'002',msg:'用户名或密码错误'};
	},
	async getPic(ctx,next){
		let rand = parseInt(Math.random() * 9000 + 1000);
		let png = new captchapng(80,30,rand);

		// res.writeHead(200,{'Content-Type':'image/png'});
		ctx.body = png.getBuffer();
	},
	test: async (ctx,next)=>{
		console.log('dangpig');

	}
	
}