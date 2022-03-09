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
// const upload = require("./controller/upload/index");
app.use(express.static("public"));
//角色模块
const role = require("./controller/user/role")
const reward = require("./controller/activity/reward")
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
// app.use("/upload", upload);
app.use("/role",role)
app.use("/activity",reward)
app.listen(3000, () => {
  console.log("3000的端口启动了");
});
