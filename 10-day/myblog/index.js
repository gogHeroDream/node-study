const express=require('express');
const app = express();
const path=require('path');
const indexRouter=require('./routers/index');
const userRouter = require('./routers/users');

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/',indexRouter);
app.use('/users',userRouter);
//错误处理
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
app.listen(10080)
