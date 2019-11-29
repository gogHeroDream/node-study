var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'sqltest'
});
connection.connect();
connection.query('SELECT * FROM test', function(error,results,fields) {
  if(error) throw error;
  console.log(results);
});
connection.end();
