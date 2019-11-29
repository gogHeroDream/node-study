let fs=require('fs')
fs.appendFile('index.js','这是添加的一段话',(err)=>{
  if(err) {
    console.log(err)
    return false
  } else {
    console.log('最佳成功')
  }
})
