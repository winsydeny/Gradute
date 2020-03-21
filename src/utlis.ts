export const SendCommon = (res: any, status: number) => {
  res.send({
    status: status,
    msg: " "
  });
};
export const _query = (mysql: any, sql: string) => {
  return new Promise((resolve, reject) => {
    mysql.query(sql, (err: any, data: any) => {
      if (err) {
        reject(err);
        return false;
      }
      resolve(data);
    });
    mysql.end();
  });
};
