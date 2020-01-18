const mysql = require('mysql')
const fs = require('fs')
const express = require('express')
const app = express()
const port  = 3000
const route = require('./api/login')

app.use('/tom',route)

// app.get('/',(req,res) => {
//     GetUser('select * from react.login',login => {
//         console.log(login)
//         res.json(login)
//     })
// })
function GetUser(sql,callback){
    const connection = mysql.createConnection({
        host: 'vanlansh.wang',
        user: 'root',
        password: 'root',
        database: 'react'
    })
    connection.connect((err) => {
        if(err) {
            console.error(err.stack)
            return ;
        }
        console.log('connected '+ connection.threadId)
    })
    const addSql = 'INSERT INTO react.login (user,password) VALUES (tom,789)'
    // const sql = 'SELECT * FROM react.login'
    connection.query(sql,(err,result) => {
        if(err) {
            console.log(err.message)
            return 
        }
        // const login = JSON.stringify(result)
        callback(result)
        // fs.writeFileSync('login.json',login)
    
    })
    connection.end()
    
}
app.listen(port ,() => console.log("runing"))

function Mysql(){
   
}

// // INSERT INTO `react`.`login`(`user`, `password`) VALUES ('jack', '456')