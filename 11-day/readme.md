## 步骤
> 1 npm init -y 初始化目录

> 2 npm i eslint -g 
>   eslint --init
>`-> Use a popular style guide
   -> Standard
   -> JSON`

> 3 安装依赖
>  npm i config-lite connect-flash connect-mongo ejs express express-session marked moment mongolass objectid-to-timestamp sha1 winston express-winston --save
>  npm i https://github.com:utatti/express-formidable.git --save 
>  `对应模块的用处：
    
    express: web 框架
    express-session: session 中间件
    connect-mongo: 将 session 存储于 mongodb，结合 express-session 使用
    connect-flash: 页面通知的中间件，基于 session 实现
    ejs: 模板
    express-formidable: 接收表单及文件上传的中间件
    config-lite: 读取配置文件
    marked: markdown 解析
    moment: 时间格式化
    mongolass: mongodb 驱动
    objectid-to-timestamp: 根据 ObjectId 生成时间戳
    sha1: sha1 加密，用于密码加密
    winston: 日志`
> 4 创建 .editorconfig 文件
 `# editorconfig.org
  root = true
  
  [*]
  indent_style = space
  indent_size = 2
  end_of_line = lf
  charset = utf-8
  trim_trailing_whitespace = true
  insert_final_newline = true
  tab_width = 2
  
  [*.md]
  trim_trailing_whitespace = false
  
  [Makefile]
  indent_style = tab`
  
4 
