const mysql = require('mysql');
const connection = mysql.createConnection({
  host:'localhost',
  port:'3306',
  user:'root',
  password: '123456',
  database:'sqltest'
})
connection.connect();
let selectSql= 'SELECT * FROM teacher';
connection.query(selectSql,(err,res)=>{
  if(err) throw err;
  console.log(res)
})
connection.end();
