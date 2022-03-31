const query = require("../db");
const getStudent = (sql1, sql2, params) => {
  return new Promise((resolve, reject) => {
    query(sql1, params)
      .then((res1) => {
        query(sql2, params).then((res2) => {
          if (res1 && res2) {
            resolve({
              code: 200,
              data: res1,
              total: res2[0].total,
              msg: "获取成功",
            });
            return;
          }
          resolve({
            code: 402,
            message: "获取失败,检验传参",
          });
        });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
const updateStudent = (sql, params) => {
  return new Promise((resolve, reject) => {
    query(sql, params)
      .then((res) => {
        if (res) {
          resolve({
            code: 200,
            data: res,
            msg: "修改成功",
          });
          return;
        }
        resolve({
          code: 402,
          message: "获取失败,检验传参",
        });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
const addGrade = (sql1, sql2, params) => {
  return new Promise((resolve, reject) => {
    query(sql2)
      .then((res) => {
        query(sql1, params)
          .then((res) => {
            if (res) {
              resolve({
                code: 200,
                data: res,
                msg: "添加成功",
              });
              return;
            }
            resolve({
              code: 402,
              message: "获取失败,检验传参",
            });
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
const addStudent = (sql, params) => {
  return new Promise((resolve, reject) => {
    query(sql, params)
      .then((res) => {
        if (res) {
          resolve({
            code: 200,
            data: res,
            msg: "添加成功",
          });
          return;
        }
        resolve({
          code: 402,
          message: "获取失败,检验传参",
        });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
module.exports = { getStudent, updateStudent, addStudent, addGrade };
