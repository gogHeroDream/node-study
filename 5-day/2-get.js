var http= require('http');
var items = []
http.createServer(function(req,res){
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  // 跨域允许的请求方式
  res.setHeader('Content-Type', 'application/json');
  switch(req.method) {
    case "OPTIONS":
      res.statusCode = 200;
      res.end();
      break;
    case 'GET':
      let data=JSON.stringify(items)
      res.write(data);
      res.end();
      break;
    case 'POST':
      let item = '';
      req.on('data',function(chunk){
        item+=chunk;
      });
      req.on('end',function(){
        item=JSON.parse(item);
        items.push(item.item);
        let data=JSON.stringify(items);
        res.write(data);
        res.end();
      })
      break;

  }
}).listen(18002)
console.log('http server is start');
