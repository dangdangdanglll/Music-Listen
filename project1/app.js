const Koa = require('koa');


const musicRouter = require('./routers/music')
const userRouter = require('./routers/user')
const bodyParser = require('koa-bodyparser')

const formidable = require('koa-formidable')
const session = require('koa-session')



// 'select password from nodeuser where username="'+username+'"'

let { appPort,viewDir,staticDir,uploadDir } = require('./config');


let app = new Koa();

app.listen(appPort,()=>{
	console.log(`run is ${appPort}...`)
});

const render = require('koa-art-template');
render(app,{
	root: viewDir,
	extname: '.html',
	debug:process.env.NODE_ENV !== 'production'   
});



// var bodyParser2 = require('body-parser');
// app.use(bodyParser2.json({limit: '50mb'}));
// app.use(bodyParser2.urlencoded({limit: '50mb', extended: true}));





//增加：
// app.use(function (req, res, next) {
//   res.headerd("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By", ' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });
 








let rewriteUrl = require('./middleware/rewrite');
let error = require('./middleware/error');

app.use(rewriteUrl(require('./rewriteUrlConfig')));
app.use(error());
app.use(require('koa-static')(staticDir))







//基于test字符串进行签名运算,为了保证数据不被篡改
app.keys = ['test'];
let store = {
  storage: {},
  set:function(key,session){
    this.storage[key] = session;

  },
  get(key){
    return this.storage[key];

  },
  destroy(key){
    delete this.storage[key];
  }
}
//处理session
app.use(session({store:store},app))



//处理请求体数据
app.use(bodyParser());

//处理文件及字符串
app.use(formidable({
  uploadDir:uploadDir,
  keepExtensions: true,
}));

app.use(userRouter.routes());
app.use(musicRouter.routes());

app.use(userRouter.allowedMethods())