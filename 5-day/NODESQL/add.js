var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '123456',
  database: 'sqltest'
});
connection.connect();
let addSql = "INSERT INTO teacher(id,name,course) VALUES(0,?,?)";
let addSqlParams = ['liqiang', '23'];
connection.query(addSql, addSqlParams,(err,res)=>{
  if(err){
    console.log('新郑错误')
    console.log(err)
  } else {
    console.log('成功:')
    console.log(res)
  }
})
connection.end()
