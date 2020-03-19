"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendCommon = (res, status) => {
    res.send({
        status: status,
        msg: "无此用户或者账号密码错误"
    });
};
exports._query = (mysql, sql) => {
    return new Promise((resolve, reject) => {
        mysql.query(sql, (err, data) => {
            if (err) {
                reject(err);
                return false;
            }
            resolve(data);
        });
        mysql.end();
    });
};
