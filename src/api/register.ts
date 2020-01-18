import * as express from 'express'
const Route = express.Router()

Route.get('/',(req:any,res:any) => {
    res.send('this is register')
})

export default Route