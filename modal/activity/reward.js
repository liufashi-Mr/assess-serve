const query = require("../db");
const addReward = (sql, params) => {
  return new Promise((resolve, reject) => {
    query(sql, params)
      .then((res) => {
        if (res) {
          resolve({
            code: 200,
            data: { msg: "添加成功" },
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

const removeReward = (sql, params) => {
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
          message: "删除失败",
        });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

const updateReward = (sql, params) => {
  return new Promise((resolve, reject) => {
    query(sql, params)
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
          message: "添加失败,检验传参",
        });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
const getRewards = (sql, params) => {
  return new Promise((resolve, reject) => {
    query(sql, params)
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
          message: "获取失败",
        });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
module.exports = {
  addReward,
  updateReward,
  getRewards,
  removeReward,
};
