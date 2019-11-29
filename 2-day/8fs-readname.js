let fs=require("fs")
fs.rename('index.js','index2.js',(err)=>{
  if(err) {
    console.log(err)
    return false
  } else {
    console.log('rename success')
  }
})
