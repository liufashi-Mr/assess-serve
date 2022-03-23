const express = require("express");
const router = express.Router();
const {
  applyReward,
  cancelApply,
  updateApply,
  getApplyList,
} = require("../../modal/activity/apply");
//申请
router.post("/applyReward", (req, res) => {
  const {
    rewardId,
    studentId,
    applyDesc,
    applyAccessory,
    studentName,
    studentNumber,
    applyStep,
  } = req.body;
  if (
    !(
      rewardId &&
      studentId &&
      applyDesc &&
      studentName &&
      applyStep &&
      studentNumber
    )
  ) {
    res.json({
      code: 401,
      message: "入参不符",
    });
    return;
  }
  let sql = `insert into t_reward_apply_list (rewardId,studentId,applyDesc,applyAccessory,studentName,studentNumber,applyStep,applyStatus) values (?,?,?,?,?,?,?,?)`;
  applyReward(sql, [
    rewardId,
    studentId,
    applyDesc,
    applyAccessory,
    studentName,
    studentNumber,
    applyStep,
    "0",
  ])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
//删除
router.post("/cancelApply", (req, res) => {
  const { applyId } = req.body;
  if (!applyId) {
    res.json({
      code: 401,
      message: "入参不符",
    });
    return;
  }
  let sql = `delete from t_reward_apply_list where id=?`;
  cancelApply(sql, [applyId])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
//评奖信息-update
router.post("/updateApply", (req, res) => {
  const { applyId, applyDesc, applyAccessory } = req.body;
  if (!applyId) {
    res.json({
      code: 401,
      message: "入参不符",
    });
    return;
  }
  let sql = `update t_reward_apply_list set applyDesc=? , applyAccessory=?  where id=${applyId}`;
  updateApply(sql, [applyDesc, applyAccessory])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.post("/getApplyList", (req, res) => {
  const { status, studentId } = req.body;
  let sql = `select * from t_reward_apply_list`;
  if (status || studentId) {
    sql += ` where`;
    if (status && !studentId) {
      sql += ` applyStatus=${status}`;
    }
    if (studentId && !status) {
      sql += ` studentId =${studentId}`;
    }
    if (studentId && status) {
      sql += ` studentId =${studentId} and applyStatus=${status}`;
    }
  }
  getApplyList(sql, [])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
//申请
module.exports = router;
