const express = require("express");
const router = express.Router();
const {
  createProcess,
  getProcess,
  auditProcess,
  auditProcessSure,
} = require("../../modal/activity/process");
router.post("/getProcess", (req, res) => {
  let sql = `select * from t_flow`;
  getProcess(sql)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.post("/createProcess", (req, res) => {
  const {
    flowName,
    stepOne,
    stepTwo,
    stepThree,
    stepFour,
    stepFive,
    description,
  } = req.body;
  let sql = `insert into t_flow (flowName,stepOne, stepTwo, stepThree, stepFour, stepFive,description) values (?,?,?,?,?,?,?)`;
  createProcess(sql, [
    flowName,
    stepOne,
    stepTwo,
    stepThree,
    stepFour,
    stepFive,
    description,
  ])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.post("/auditProcess", (req, res) => {
  const { nextStep, applyId, isPass } = req.body;
  if (!applyId) {
    res.json({
      code: 400,
      msg: "入参不符",
    });
  }
  let sql = `update t_reward_apply_list set applyStep='${nextStep}',  applyStatus=1 where id=${applyId}`;
  if (nextStep.trim() === "完成") {
    sql = `update t_reward_apply_list set applyStep='${nextStep}', applyStatus=1 where id=${applyId}`;
  }
  if (isPass == 0) {
    sql = `update t_reward_apply_list set applyStatus=0 where id=${applyId}`;
  }
  if (isPass == 3) {
    sql = `update t_reward_apply_list set applyStatus=-2 where id=${applyId}`;
  }

  auditProcess(sql)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.post("/auditProcessSure", (req, res) => {
  const { applyId, isPass } = req.body;
  if (!applyId) {
    res.json({
      code: 400,
      msg: "入参不符",
    });
  }
  let sql = "";
  if (isPass) {
    sql = `update t_reward_apply_list set applyStep='完成',  applyStatus=2 where id=${applyId}`;
  } else {
    sql = `update t_reward_apply_list set applyStatus=-2 where id=${applyId}`;
  }
  auditProcessSure(sql)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
