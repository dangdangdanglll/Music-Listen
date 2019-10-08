const Router = require("koa-router");
let userRouter = new Router();
let userController = require('../controllers/user');


const db = require('../models/db.js');

userRouter
.get('/user/dologin',userController.test)
.get('/user/register',userController.showRegister)
.post('/user/check-username',userController.checkUsername) // ***
.post('/user/do-register',userController.doRegister)
.post('/user/do-login',userController.doLogin)
.get('/user/get-pic',userController.getPic)

.get('/user/login',async ctx=>{
	ctx.render('login')
})
// .get('/user/register',async ctx=>{
// 	ctx.render('register')
// })
module.exports = userRouter;