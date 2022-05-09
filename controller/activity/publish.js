const express = require("express");
const router = express.Router();
const {
  addReward,
  updateReward,
  getRewards,
  removeReward,
  getRewardDetail,
} = require("../../modal/activity/publish");
//评奖信息-add
router.post("/addReward", (req, res) => {
  const {
    rewardName,
    startTime,
    endTime,
    collegeId,
    typeId,
    majorId,
    grade,
    rewardProcess,
    description,
  } = req.body;
  if (!rewardName || !description) {
    res.json({
      code: 401,
      message: "入参不符",
    });
    return;
  }
  let sql = `insert into t_rewards (rewardName,
    startTime,
    endTime,
    collegeId,
    typeId,
    majorId,
    grade,
    rewardProcess,
    description) values (?,?,?,?,?,?,?,?,?)`;
  addReward(sql, [
    rewardName,
    startTime,
    endTime,
    collegeId,
    typeId,
    majorId,
    grade,
    rewardProcess,
    description,
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
    id,
    rewardName,
    startTime,
    endTime,
    collegeId,
    typeId,
    majorId,
    grade,
    rewardProcess,
    description,
  } = req.body;
  if (!id || !rewardName) {
    res.json({
      code: 401,
      message: "入参不符",
    });
    return;
  }
  let sql = `update t_rewards set rewardName=? , startTime=? , 
  endTime=? , collegeId=? , typeId=? , majorId=? , grade=? , rewardProcess=? , description=? where id=${id}`;
  updateReward(sql, [
    rewardName,
    startTime,
    endTime,
    collegeId,
    typeId,
    majorId,
    grade,
    rewardProcess,
    description,
  ])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.post("/getRewards", (req, res) => {
  const {
    keyword,
    typeId,
    collegeId,
    majorId,
    currentPage = 1,
    pageSize = 10,
    grade,
    date = [],
  } = req.body;
  const [startTime, endTime] = date;
  console.log(startTime, endTime);
  let sql = `select * from t_rewards where 1=1`;
  let sql2 = `select count(*) as total from t_rewards where 1=1`;
  if (keyword) {
    sql += ` and rewardName like "%${keyword}%"`;
    sql2 += ` and rewardName like "%${keyword}%"`;
  }
  if (typeId) {
    sql += " and typeId=?";
    sql2 += " and typeId=?";
  }
  if (collegeId) {
    sql += " and collegeId=?";
    sql2 += " and collegeId=?";
  }
  if (majorId) {
    sql += " and majorId=?";
    sql2 += " and majorId=?";
  }
  if (grade) {
    sql += " and grade=?";
    sql2 += " and grade=?";
  }
  if (date.length) {
    sql += ` and (endTime < '${endTime}' OR endTime='') and (startTime >  '${startTime}' OR startTime='')`;
    sql2 += ` and (endTime < '${endTime}' OR endTime='') and (startTime >  '${startTime}' OR startTime='')`;
  }
  sql += ` limit ${(currentPage - 1) * pageSize} , ${pageSize}`;
  sql2 += ` limit ${(currentPage - 1) * pageSize} , ${pageSize}`;
  console.log(sql);
  getRewards(
    sql,
    sql2,
    [typeId, collegeId, majorId, grade].filter((x) => x)
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.post("/getRewardDetail", (req, res) => {
  const { rewardId } = req.body;
  const sql = `select *, r.description as rewardDesc, r.id as rewardId from t_rewards r join t_flow f on r.rewardProcess=f.id where r.id=${rewardId}`;
  getRewardDetail(sql)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
//申请
module.exports = router;
