"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection = {
    host: 'vanlansh.wang',
    user: 'root',
    password: 'root1234',
    database: 'find'
};
exports.default = connection;
// export default class Mysql {
//     private done:boolean = false
//     private sql:string = ''
//     constructor(sql?:string){
//         connection.connect((err) => {
//             if(err) {
//                 console.error(err.stack)
//                 return ;
//             }
//             console.log('connected '+ connection.threadId)
//             this.done = true
//         })
//     }
//     set(sql:string){
//         this.sql = sql
//     }
//     get(){
//         if(this.sql != ''&&this.done){
//             connection.query(this.sql,(err,result) => {
//                 if(err) {
//                     console.log(err.message)
//                     return false;
//                 }
//                 return result;
//             })
//         }
//         connection.end()
//     }
// }
