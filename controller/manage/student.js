const express = require("express");
const router = express.Router();
const {
  getStudent,
  updateStudent,
  addStudent,
} = require("../../modal/manage/student");
router.post("/getStudent", (req, res) => {
  const {
    studentName,
    studentNumber,
    typeId,
    collegeId,
    majorId,
    currentPage = 1,
    pageSize = 10,
    grade,
  } = req.body;
  let sql1 = `select * from t_student  where studentStatus < 3`;
  let sql2 = `select count(*) as total from t_student where 1 = 1`;

  if (studentName) {
    sql1 += " and studentName=?";
    sql2 += " and studentName=?";
  }
  if (studentNumber) {
    sql1 += " and studentNumber=?";
    sql3 += " and studentNumber=?";
  }
  if (typeId) {
    sql1 += " and typeId=?";
    sql2 += " and typeId=?";
  }
  if (collegeId) {
    sql1 += " and collegeId=?";
    sql2 += " and collegeId=?";
  }
  if (majorId) {
    sql1 += " and majorId=?";
    sql2 += " and majorId=?";
  }
  if (grade) {
    sql1 += " and grade=?";
    sql2 += " and grade=?";
  }
  sql1 += ` limit ${(currentPage - 1) * pageSize} , ${pageSize}`;
  getStudent(
    sql1,
    sql2,
    [
      studentName,
      studentNumber,
      typeId,
      collegeId,
      majorId,
      grade.trim(),
    ].filter((item) => item)
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.post("/updateStudent", (req, res) => {
  const {
    studentId,
    studentName,
    studentNumber,
    typeId,
    collegeId,
    majorId,
    studentStatus,
    sex,
    grade,
  } = req.body;
  if (!studentId) {
    res.json({
      code: 401,
      message: "入参不符",
    });
    return;
  }

  const sql = `update t_student set studentName=? , studentNumber=? , typeId=? ,collegeId=?, majorId=?, studentStatus=?, sex=?, grade=? where id =${studentId}`;
  updateStudent(sql, [
    studentName,
    studentNumber,
    typeId,
    collegeId,
    majorId,
    studentStatus,
    sex,
    grade.trim(),
  ])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.post("/addStudent", (req, res) => {
  const {
    studentName,
    studentNumber,
    typeId,
    collegeId,
    majorId,
    studentStatus = 1,
    sex,
    grade,
  } = req.body;
  if (
    !studentName ||
    !studentNumber ||
    !typeId ||
    !collegeId ||
    !majorId ||
    !studentStatus ||
    !sex ||
    !grade
  ) {
    res.json({
      code: 401,
      message: "入参不符",
    });
    return;
  }
  const sql = `insert into t_student (studentName, studentNumber, typeId, collegeId, majorId, studentStatus,username, password, role, sex,grade) values(?,?,?,?,?,?,${studentNumber},${studentNumber},'student',?,?)`;
  addStudent(sql, [
    studentName,
    studentNumber,
    typeId,
    collegeId,
    majorId,
    studentStatus,
    sex,
    grade.trim(),
  ])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;