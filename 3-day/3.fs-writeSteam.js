let fs= require('fs')
let data = 'console.log("Hello World! 我要存入数据！")';
let writeSteam =fs.createWriteStream('index.js')
writeSteam.write(data,'utf8')
writeSteam.end()
writeSteam.on('finish',()=>{
  console.log('finish')
})
