let fs= require('fs')
fs.readdir('css',(err,data)=>{
  if(err){
    console.log(err)
    return false
  }else {
    console.log(data)
    let fileArr=[]
    function getFile(i){
      if(i===data.length) {
        console.log('dir')
        console.log(fileArr)
        return false
      }
      fs.stat('css/'+data[i],(err,stats)=>{
        if(stats.isDirectory()) {
          fileArr.push(data[i])
        }
        getFile(i+1)
      })
    }
    getFile(0)
  }
})
