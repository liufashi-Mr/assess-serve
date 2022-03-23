const express = require("express");
const router = express.Router();
const {
  addReward,
  updateReward,
  getRewards,
  removeReward,
} = require("../../modal/activity/publish");
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
  if (!rewardName || !level) {
    res.json({
      code: 401,
      message: "入参不符",
    });
    return;
  }
  let sql = `insert into t_rewards (rewardName,startTime,endTime,level,status,collegeName,collegeType,majorName,rewardProcess) values (?,?,?,?,?,?,?,?,?)`;
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
  let sql = `update t_rewards set rewardName=? , startTime=? , endTime=? , level=? , status=? , collegeName=? , collegeType=? , majorName=? , rewardProcess=?  where id=${rewardId}`;
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
  const { keyword, currentPage = 1, pageSize = 10 } = req.body;
  let sql = `select * from t_rewards limit ${(currentPage - 1) * pageSize} , ${ pageSize}`;
  let sql2 = `select count(*) as total from t_rewards`;

  if (keyword) {
    sql = `select * from t_rewards where rewardName like "%${keyword}%"`;
    sql2 = `select count(*) as total from t_rewards where rewardName like "%${keyword}%"`;
  }
  console.log(sql);
  getRewards(sql, sql2, [])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
//申请
module.exports = router;
