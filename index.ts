import express from 'express'
import login from './src/api/login'
import register from './src/api/register'
import NotFound from './src/404'
const app = express()



app.use('*',NotFound)
app.use('/login',login)
app.use('/reg',register)
app.listen(3000,function(){
    console.log('is runngin 3000')
})