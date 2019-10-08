module.exports = ()=> {
	return async (ctx,next) => {
			  try{
			    await next();
			  }catch(e){
			    //dosomething
			    console.log(e);
			    ctx.render('error',{msg:'002状态错误'})
			  }
			}
}