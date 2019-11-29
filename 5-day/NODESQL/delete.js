var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'sqltest'
});
connection.connect();
var delSql='DELETE FROM teacher where id=0';
connection.query(delSql,(err,res)=>{
  if(err){
    console.log('del error:',err)
  } else {
    console.log('del success', res)
  }
});
connection.end()
