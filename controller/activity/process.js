const express = require("express");
const router = express.Router();
const {
  createProcess,
  getProcess,
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


module.exports = router;
