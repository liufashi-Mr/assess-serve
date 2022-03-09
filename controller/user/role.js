const express = require("express");
const router = express.Router();
const { login } = require("../../modal/user/role");
router.post("/login", (req, res) => {
  const { username, password, role } = req.body;
  if (!(username && password && role)) {
    res.json({
      code: 401,
      message: "入参不符",
    });
    return;
  }
  const roleTable =
    role === ("teacher" || "admin" || "student") ? role : "role";
  console.log(roleTable);
  let sql = `select * from t_${roleTable} where username =? and password = ?`;
  if (roleTable === "role") {
    sql += ` and role =${roleTable}`;
  }
  login(sql, [username, password])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
