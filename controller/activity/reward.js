const express = require("express");
const router = express.Router();
const {
  addReward,
  updateReward,
  getRewards,
  removeReward,
} = require("../../modal/activity/reward");
//评奖信息-add
router.post("/addReward", (req, res) => {
  const {
    rewardName,
    startTime,
    endTime,
    level,
    status,
    collegeName,
    collegeType,
    majorName,
    rewardProcess,
  } = req.body;
  console.log(req.body);
  if (!rewardName || !level) {
    res.json({
      code: 401,
      message: "入参不符",
    });
    return;
  }
  let sql = `insert into t_rewards (reward_name,start_time,end_time,level,status,college_name,college_type,major_name,reward_process) values (?,?,?,?,?,?,?,?,?)`;
  addReward(sql, [
    rewardName,
    startTime,
    endTime,
    level,
    status,
    collegeName,
    collegeType,
    majorName,
    rewardProcess,
  ])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
//评奖信息-remove
router.post("/removeReward", (req, res) => {
  const { rewardId } = req.body;
  if (!rewardId) {
    res.json({
      code: 401,
      message: "入参不符",
    });
    return;
  }
  let sql = `delete from t_rewards where id=?`;
  removeReward(sql, [rewardId])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
//评奖信息-update
router.post("/updateReward", (req, res) => {
  const {
    rewardId,
    rewardName,
    startTime,
    endTime,
    level,
    status,
    collegeName,
    collegeType,
    majorName,
    rewardProcess,
  } = req.body;
  if (!rewardId || !rewardName || !level) {
    res.json({
      code: 401,
      message: "入参不符",
    });
    return;
  }
  let sql = `update t_rewards set reward_name=? , start_time=? , end_time=? , level=? , status=? , college_name=? , college_type=? , major_name=? , reward_process=?  where id=${rewardId}`;
  updateReward(sql, [
    rewardName,
    startTime,
    endTime,
    level,
    status,
    collegeName,
    collegeType,
    majorName,
    rewardProcess,
  ])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.post("/getRewards", (req, res) => {
  console.log(21312);

  let sql = `select * from t_rewards`;
  getRewards(sql, [])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
