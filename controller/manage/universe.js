const express = require("express");
const router = express.Router();
const { getUniverse,addUniverse } = require("../../modal/manage/universe");
// 获取学校的学科学院专业列表
router.post("/getUniverse", (req, res) => {
  const sql = `select * from t_universe`;
  getUniverse(sql)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
// 添加学校的学科学院专业列表
router.post("/addUniverse", (req, res) => {
  const { name, description,parentId } = req.body;
  if (!name) {
    res.json({
      code: 401,
      message: "入参不符",
    });
    return;
  }
  const sql = `insert into t_universe (name, description, parentId) values(?,?,?)`;
  addUniverse(sql,[name, description,parentId])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
