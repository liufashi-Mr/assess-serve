const express = require("express");
const router = express.Router();
const { getRewardResult } = require("../../modal/activity/result");
// 根据奖励id获取审核结果
router.post("/getRewardResult", (req, res) => {
  const { rewardId, getAll } = req.body;
  if (!rewardId) {
    res.json({
      code: 400,
      msg: "入参不符",
    });
  }
  let sql = `select * from t_rewards a join t_reward_apply_list b on a.id=b.rewardId where a.id=?`;
  if (!getAll) {
    sql += " and b.applyStatus=2 and b.applyStep='完成'";
  }
  getRewardResult(sql, [rewardId])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
// 获取所有审核结果
router.post("/getAllRewardResult", (req, res) => {
  const { getAll } = req.body;
  let sql = `select * from t_rewards a join t_reward_apply_list b on a.id=b.rewardId`;
  if (!getAll) {
    sql += " where b.applyStatus=2 and b.applyStep='完成'";
  }
  getRewardResult(sql)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
