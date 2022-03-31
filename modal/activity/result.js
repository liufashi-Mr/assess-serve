const query = require("../db");
const getRewardResult = (sql, params) => {
  return new Promise((resolve, reject) => {
    query(sql, params)
      .then((res) => {
        if (res) {
          resolve({
            code: 200,
            data: res,
          });
          return;
        }
        resolve({
          code: 402,
          message: "添加失败,检验传参",
        });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
module.exports = {
    getRewardResult,
};
