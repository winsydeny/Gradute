"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = __importStar(require("mysql"));
const connection = mysql.createConnection({
    host: 'vanlansh.wang',
    user: 'root',
    password: 'root',
    database: 'react'
});
class Mysql {
    constructor(sql) {
        this.done = false;
        this.sql = '';
        connection.connect((err) => {
            if (err) {
                console.error(err.stack);
                return;
            }
            console.log('connected ' + connection.threadId);
            this.done = true;
        });
    }
    set(sql) {
        this.sql = sql;
    }
    get() {
        if (this.sql != '' && this.done) {
            connection.query(this.sql, (err, result) => {
                if (err) {
                    console.log(err.message);
                    return false;
                }
                return result;
            });
        }
        connection.end();
    }
}
exports.default = Mysql;
