const query = require("../db");
const login = (sql, param) => {
  return new Promise((resolve, reject) => {
    query(sql, param)
      .then((res) => {
        if (res.length > 0) {
          resolve({
            code: 200,
            data: res,
          });
          return;
        }
        resolve({
          code: 402,
          message: "获取用户信息失败",
        });
      })
      .catch((err) => {
          console.log(err)
        reject(err);
      });
  });
};
module.exports = {
  login,
};
