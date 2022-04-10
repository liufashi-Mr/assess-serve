const express = require("express");
const router = express.Router();
const {
  applyReward,
  cancelApply,
  updateApply,
  getApplyList,
  confirmApply,
  getStudentDetail,
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
  } = req.body;
  if (!(rewardId && studentId && applyDesc && studentName && studentNumber)) {
    res.json({
      code: 401,
      message: "入参不符",
    });
    return;
  }
  let sql = `insert into t_reward_apply_list (rewardId,studentId,applyDesc,applyAccessory,studentName,studentNumber,applyStatus) values (?,?,?,?,?,?,?)`;
  applyReward(sql, [
    rewardId,
    studentId,
    applyDesc,
    JSON.stringify(applyAccessory),
    studentName,
    studentNumber,
    "-1",
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
  updateApply(sql, [applyDesc, JSON.stringify(applyAccessory)])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.post("/getApplyList", (req, res) => {
  const { status, studentId, role } = req.body;
  let sql = `select *,a.id as applyId, b.id as rewardId,c.id as studentId from t_reward_apply_list a join t_rewards b on a.rewardId=b.id join t_student c on a.studentId=c.id where 1 =1`;
  if (studentId) {
    sql += ` and studentId =${studentId}`;
  } else {
    sql += ` and applyStatus !=-1`;
  }
  if (role && role !== "admin"&&role !== "student") {
    sql += ` and applyStep = '${getRoleName(role)}'`;
  }
  getApplyList(sql)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.post("/confirmApply", (req, res) => {
  const { applyId, nextStep } = req.body;
  if (!applyId) {
    res.json({
      code: 401,
      message: "入参不符",
    });
    return;
  }
  let sql = `update t_reward_apply_list set applyStatus=1, applyStep=? where id=${applyId}`;
  confirmApply(sql, [nextStep])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.post("/getStudentDetail", (req, res) => {
  const { studentId } = req.body;
  let sql = `select *, b.id as subjectId from t_student a join t_subject b on a.id=b.studentId  where a.id =?`;
  if (!studentId) {
    res.json({
      code: 401,
      message: "入参不符",
    });
    return;
  }
  getStudentDetail(sql, [studentId])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/getApplyDetail", (req, res) => {
  const { applyId } = req.body;
  let sql = `select * from t_reward_apply_list where id=${applyId}`;
  if (!applyId) {
    res.json({
      code: 401,
      message: "入参不符",
    });
    return;
  }
  getStudentDetail(sql)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.post("/getProcessDetail", (req, res) => {
  const { flowId } = req.body;
  let sql = `select * from t_flow where id=${flowId}`;
  if (!flowId) {
    res.json({
      code: 401,
      message: "入参不符",
    });
    return;
  }
  getStudentDetail(sql)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

function getRoleName(role) {
  switch (role) {
    case "teacher":
      return "老师";
    case "office":
      return "教务处";
    case "xuegongchu":
      return "学工处";
    case "xiaofenguan":
      return "校分管";
    case "college":
      return "学院";
  }
}

module.exports = router;
