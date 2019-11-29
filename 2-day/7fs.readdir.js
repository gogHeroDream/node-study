let fs = require('fs')
fs.readdir('css',(err,data)=>{
  if(err){
    console.log(err)
    return false
  }else {
    console.log('read dir success!')
    console.log(data)
  }
})
