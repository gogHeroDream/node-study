// 引入FS
let fs= require('fs')
// 引入events
let events =require('events');
// 实例化对象
let EventEmitter = new events.EventEmitter();
getExt=()=>{
  fs.readFile('ext.json',(err,data)=>{
    EventEmitter.emit('data',data.toString());
  })
}
getExt()
EventEmitter.on('data',(ext)=>{
  console.log(ext)
})
