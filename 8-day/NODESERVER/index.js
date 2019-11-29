const mysql= require('mysql')
const connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  port: '3306',
  password: '123456',
  database:'nodebase'
})
// import { register } from "./register";
// 开始连接
connection.connect();
// 引入核心模块
const http=require('http');
const url=require('url');
const qs = require('querystring');
http.createServer((req,res)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  if(req.method=='POST') {
    console.log('post 请求')
    const endData={code: '1'}
    let pathName=req.url;
    let tempResult='';
    req.addListener('data',function(chunk){
      tempResult+=chunk;
      // console.log(chunk)
    });
    req.addListener("end",function(){
      var result = JSON.stringify(qs.parse(tempResult));
      // console.log(tempResult,qs.parse(tempResult),result);
      if(pathName=='/sendMessage') {
        console.log('提交留言信息');
        result =JSON.parse(result)
        let id = result.userid; // id
        let username = result.username;
        let messageText = result.message;
        let time= getNowFormatDate();
        endData.code='0';
        if(!username||!id){
          endData.message='获取用户信息失败'
          res.write(ToJsonStr(endData));
          res.end();
        } else if(!messageText) {
          endData.message='留言信息不能为空'
          res.write(ToJsonStr(endData));
          res.end();
        } else {
          let addSql= 'INSERT INTO message(user_message, user_id, user_name, time) VALUES(?,?,?,?)'
          let addParams = [messageText, id, username, time]
          connection.query(addSql, addParams,(error1, response1)=>{
            if(error1){
              throw error1
            } else {
              console.log('新增成功')
              endData.code='1'
              endData.message='保存成功'
              res.write(ToJsonStr(endData));
              res.end();
            }
          })
        }
      } else if(pathName=='/login') {
        console.log('登录')
        result =JSON.parse(result)
        let username = result.username;
        let password=result.password;
        let time = getNowFormatDate()
        endData.code='0'
        if(!username||!password) {
          endData.message = !username? '用户名不能为空': '密码不能为空';
          res.write(ToJsonStr(endData))
          res.end()
        } else if(username.length>10) {
          endData.message= '用户名过长'
          res.write(ToJsonStr(endData))
          res.end()
        } else if(password.length>20) {
          endData.message= '密码过长'
          res.write(ToJsonStr(endData))
          res.end()
        } else {
          new Promise((resolve,reject)=>{
            let readSql='SELECT * from user WHERE user_name="' + username +'"'
            connection.query(readSql,(error1, response1)=>{
              if(error1) {
                throw error1
              } else {
                // 将结果先去掉 RowDataPacket，再转换为 json 对象
                let newRes=  JSON.parse(ToJsonStr(response1));
                if(!newRes||newRes.length===0) {
                  endData.message= '不存在该用户！'
                  res.write(ToJsonStr(endData))
                  res.end()
                } else if(newRes[0].user_password!==password) {
                  endData.message= '密码输入错误！'
                  res.write(ToJsonStr(endData))
                  res.end()
                }else {
                  endData.code= '1'
                  endData.data= {
                    id: newRes[0].id,
                    userName: newRes[0].user_name,
                    message: '登录成功！'
                  }
                  res.write(ToJsonStr(endData))
                  res.end()
                }
              }
            })
          })
        }
      }else if(pathName=='/register') {
        // register()
        console.log('注册',result)
        // console.log(1111)
        result = JSON.parse(result);
        let username = result.username;
        let password = result.password;
        let time= getNowFormatDate();
        if(!username||!password) {
          endData.code='0'
          endData.message = !username? '用户名不允许为空': '密码不允许为空'
          res.write(ToJsonStr(endData))
          res.end()
        } else if(username.length > 10) {
          endData.code='0'
          endData.message = '用户名过长'
          res.write(ToJsonStr(endData))
          res.end()
        } else if(password.length > 20){
          endData.code='0'
          endData.message = '密码过长'
          res.write(ToJsonStr(endData))
          res.end()
        } else {
          new Promise((resolve,reject)=>{
            let readSql = 'SELECT * from user';
            connection.query(readSql,(error1,response1)=>{
              if(error1) {
                throw error1
              } else {
                // 将结果先去掉 RowDataPacket，再转换为 json 对象
                let newRes=  JSON.parse(ToJsonStr(response1));
                // console.log(newRes);
                // 判断姓名是否重复
                let userNameRepeat=false;
                for(let item in newRes) {
                  if(newRes[item].user_name === username) {
                    userNameRepeat = true;
                  }
                }
                if(!userNameRepeat) {
                  resolve(newRes)
                } else {
                  reject()
                }
              }
            })
          })
            .then((newRes)=>{
              console.log(newRes)
              if(newRes.length>50) {
                // connection.end();
                endData.code='0'
                endData.message = '注册人数已达上限!'
                res.write(ToJsonStr(endData))
                res.end()
                return;
              }
              // 不重复就插入信息
              let addSql='INSERT INTO user(user_name,user_password,time) VALUES(?,?,?)'
              let addParams = [username, password,time]
              connection.query(addSql,addParams,(error2, response2)=>{
                if(error2) {
                  console.log('注册错误')
                  return;
                } else {
                  console.log("\n注册成功！");
                  // connection.end();
                  endData.code='1'
                  endData.message = '注册成功!'
                  res.write(ToJsonStr(endData))
                  res.end()
                }
              })
            })
            .catch(()=>{
              // connection.end();
              endData.code='0'
              endData.message = '用户名重复!!'
              res.write(ToJsonStr(endData))
              res.end()
            })
          // res.write(JSON.stringify(endData))
        }
        // res.write(endData)
        // res.write(JSON.stringify(endData))
        // res.end()
      }
      // const endData={code: '1',message: '成功'}
      // res.write(JSON.stringify(endData));
      // res.end();
    })
  }else if(req.method=='GET') {
    const endData={code: '1'}
    console.log('get请求')
    let pathName=url.parse(req.url).pathname;
    console.log("接口为"+pathName);
    if(pathName == "/getMessage") {
      console.log("\n【API - 获取留言信息】");
      let params = url.parse(req.url, true).query;
      console.log('参数为：', params)
      // 获取信息
      let getMessageSql = 'SELECT * FROM message';
      connection.query(getMessageSql,(error1,response1)=>{
        if(error1){
          throw error1
        } else {
          let newRes = JSON.parse(JSON.stringify(response1));
          console.log(newRes);
          endData.data = newRes
          endData.message = '查询成功'
          res.write(ToJsonStr(endData))
          res.end()
        }
      })
    }
  }
}).listen(18009)
function ToJsonStr(endData) {
  return JSON.stringify(endData)
};
// 获取当前时间
function getNowFormatDate() {
  var date = new Date();
  var year = date.getFullYear(); // 年
  var month = date.getMonth() + 1; // 月
  var strDate = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minute = date.getMinutes(); // 分
  var second = date.getMinutes(); // 秒
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  // 返回 yyyy-mm-dd hh:mm:ss 形式
  var currentdate = year + "-" + month + "-" + strDate + " " + hour + ":" + minute + ":" + second;
  return currentdate;
}
