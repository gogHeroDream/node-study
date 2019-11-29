let fs =require('fs')
fs.writeFile('index.js','hello word',(err)=>{
  if(err){
    console.log(err)
    return false
  } else {
    console.log('写入成功！')
  }
})

