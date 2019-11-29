let fs=require('fs')
let fileReadSteam = fs.createReadStream('index.js')
let count = 0
let str = ''
fileReadSteam.on('data',(chunk)=>{
  console.log(`${++count} 接收到： ${chunk.length}`);
  str+=chunk
})
fileReadSteam.on('end',()=>{
  console.log('结束')
  console.log(count)
  console.log(str)
})
fileReadSteam.on('error',(err)=>{
  console.log(err)
})
