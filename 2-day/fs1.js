let fs= require('fs')
fs.stat('index.js',(err,stats)=>{
  if(err){
    console.log(err)
    return false
  } else {
    console.log(stats)
  }
  console.log(`文件：${stats.isFile()}`)
  console.log(`目录：${stats.isDirectory()}`)
  return false
})
