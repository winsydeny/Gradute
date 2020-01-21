import * as express from 'express'
import DB from '../db/mysql'
const Route:any = express.Router()
const sql:string = 'select * from react.login'



Route.get('/',(req:any,res:any) => {
//     const database = new DB();
//    const rs = database.get()
    res.send({
        data:'sdf'
    })
})

export default Route