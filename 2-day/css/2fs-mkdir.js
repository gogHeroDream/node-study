let fs=require('fs')
fs.mkdir('css',(err)=>{
  if(err){
    console.log(err)
    return false
  } else {
    console.log('chenggonhg')
  }
})
