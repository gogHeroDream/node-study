let fs=require('fs')
fs.rmdir('css',(err)=>{
  if(err){
    console.log(err)
    return false
  } else {
    console.log('删除成功')
  }
})
