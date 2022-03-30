const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const history = require("connect-history-api-fallback");
app.use(cors());
app.use(history());
const { verify } = require("./utils/token");
app.use(express.static(path.join(__dirname, "dist")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// 引入获取分类表模块
// const user = require("./controller/user/user");
app.use(express.static("public"));
//角色模块
const role = require("./controller/user/role");
const publish = require("./controller/activity/publish");
const apply = require("./controller/activity/apply");
const universe = require("./controller/manage/universe");
const student = require("./controller/manage/student");
const upload = require("./controller/upload/index");
const process = require("./controller/activity/process")
// app.use((req, res, next) => {
//   let token = req.headers["authorization"];
//   if (token) {
//     verify(token)
//       .then((res) => {
//         next();
//       })
//       .catch((err) => {
//         console.log(err.message);
//         if (err.message == "invalid token") {
//           res.json({
//             code: 503,
//             message: "无效的token",
//           });
//           return;
//         }
//         if (err.message == "jwt expired") {
//           res.json({
//             code: 504,
//             message: "token过期",
//           });
//         }
//       });
//     return;
//   }
//   next();
// });

// app.use("/user", user);
app.use("/file", upload);
app.use("/role", role);
app.use("/activity", publish);
app.use("/activity", apply);
app.use("/universe", universe);
app.use("/student", student);
app.use("/process", process);

app.listen(3001, () => {
  console.log("3001的端口启动了");
});
