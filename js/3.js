const express = require('express')
const app = express()
const fs = require("fs")
const path = require("path")
//body
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
//session 
const session = require("express-session")
//注册session中间件
app.use(
        session({
                secret: 'keyboard cat',
                resave: false,
                saveUninitialized: false
        })
)

// 托管文件夹
app.use('/node_modules', express.static('./node_modules'))
// Art-template模板
app.engine("html", require("express-art-template"))
app.set("view engine", "html")
app.set("views", "./views")

//循环，路由自动注册
fs.readdir(path.join(__dirname, "/router"), (err, filenames) => {
        if (err) return console.log('读取 router 中的路由失败')
        console.log(filenames)
        //循环router下每一个文件名
        filenames.forEach(fname => {
                //循环一次,拼接好一个完整路由模块地址  =>fname为文件名
                const router = require(path.join(__dirname, './router', fname))
                //require导入模块
                app.use(router)
        })
})

//启动
app.listen(3001, () => {
        console.log("server running at http://127.0.0.1:3001")
})