const query = require("../db");
const applyReward = (sql, params) => {
  return new Promise((resolve, reject) => {
    query(sql, params)
      .then((res) => {
        if (res) {
          resolve({
            code: 200,
            data: { msg: "申请成功" },
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

const cancelApply = (sql, params) => {
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

const updateApply = (sql, params) => {
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
          message: "更新,检验传参",
        });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
const confirmApply = (sql, params) => {
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
          message: "更新,检验传参",
        });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
const getApplyList = (sql, params) => {
  return new Promise((resolve, reject) => {
    query(sql, params)
      .then((res) => {
        console.log(res)
        if (res) {
          resolve({
            code: 200,
            data: res.map((item) => ({
              ...item,
              applyAccessory: JSON.parse(item.applyAccessory),
            })),
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
const getStudentDetail = (sql, params) => {
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
  applyReward,
  cancelApply,
  updateApply,
  getApplyList,
  confirmApply,
  getStudentDetail
};
