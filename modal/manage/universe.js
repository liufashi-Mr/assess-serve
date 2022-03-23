const query = require("../db");
const getUniverse = (sql, params) => {
  return new Promise((resolve, reject) => {
    query(sql, params)
      .then((res) => {
        if (res) {
          const getUniverseTree = (items) => {
            let result = [];
            for (let i = 0; i < items.length; i++) {
              let item = items[i];
              const children =items.filter((t) => {
                if (t.parentId === item.id) {
                  t.isChild = true;
                  return t;
                }
              });
              item.children = children.length?children:null
            }
            result = items.filter((t) => !t.isChild);
            return result;
          };
          resolve({
            code: 200,
            data: getUniverseTree(res),
            flatData:res,
            msg: "获取成功",
            success: true,
          });
          return;
        }
        reject({ msg: "获取失败" });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
const addUniverse = (sql, params) => {
  return new Promise((resolve, reject) => {
    query(sql, params)
      .then((res) => {
        if (res) {
          resolve({
            code: 200,
            data: res,
            msg: "添加成功",
            success: true,
          });
          return;
        }
        reject({ msg: "获取失败" });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
module.exports = { getUniverse,addUniverse};
