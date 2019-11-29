let fs=require('fs')
fs.readFile('index.js',(err,data)=>{
  if(err){
    console.log(err)
    return false
  } else {
    console.log('堵住其文件成功')
    console.log(data)
  }
})
