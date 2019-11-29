var http = require('http')
http.createServer((req,res) => {
  res.writeHead(200,{
    "Content-Type": "text/html;charset=UTF-8"
  });
  res.write('<h1>hello word!!!</h1>');
  res.end()
}).listen(8033)
