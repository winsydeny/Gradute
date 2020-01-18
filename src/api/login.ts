import * as express from 'express'
import DB from '../db/mysql'
const Route:any = express.Router()
const sql:string = 'select * from react.login'

Route.get('/',(req:any,res:any) => {
    
    res.send('1232')
})

export default Route