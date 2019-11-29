let fs=require('fs')
fs.stat('upload',(err,stats)=>{
  if(err){
    fs.mkdir('upload',(error)=>{
      if(error) {
        console.log(error)
        return false
      } else {
        console.log('mkdir upload success')
      }
    })
  }else{
    console.log(stats.isDirectory())
    console.log('already have upload')
  }
})
