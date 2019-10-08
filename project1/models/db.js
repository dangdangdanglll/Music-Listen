var mysql = require('mysql');
const { dbConfig } = require('../config.js')
var pool  = mysql.createPool(dbConfig);
 
var db = {};

 // express中
 // db.q('select..',[],function(err,data) {
 //    if(err) {

 //    }
 //    console.log(data);
 // })

// koa中
// try{
// let data await db.q('select..',[]);
// }catch(err){}



//start
db.q = function (sql,params) {
  return new Promise((resolve,reject)=>{
    // 取出链接
    pool.getConnection(function(err, connection) {
      if (err) {
        reject(err);
        return;
      }

      connection.query(sql,params,function (error, results, fields) {
            console.log(`${sql}=>${params}`);
            // console.log(`${sql}=>`);
             // 释放连接
            connection.release();
            if(error) {
              reject(err);
              return;
            }
            console.log(results);
            resolve(results);  
      });
    });
  });
}
//end






    // pool.getConnection(function(err, connection) {



    //   var sql = "select 1 from users where username = ?";
    //   var params = 'abcf';
    //   connection.query(sql,params, function (error, results, fields) {
    //         console.log(`${sql}=>${params}`);
    //          // 释放连接
    //         connection.release();
    //         if(error) {
    //           reject(err);
    //           return;
    //         }
    //         console.log(results);
    //         // resolve(results);  
    //   });
    // })


//test end
// 导出对象
module.exports = db;
