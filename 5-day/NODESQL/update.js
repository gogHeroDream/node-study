var mysql = require('mysql');
var connection =mysql.createConnection({
  host: 'localhost',
  user:'root',
  part:'3306',
  password: '123456',
  database: 'sqltest'
});
connection.connect();
let updateSql = 'UPDATE teacher set name = ?, course = ? WHERE Id = 7'
let updateSqlParams = ['王明开', "大学英语"];
connection.query(updateSql,updateSqlParams,(err,res)=>{
  if(err) {
    console.log('err update!!!', err)
  }else {
    console.log('success update', res)
  }
})
connection.end();
