import Vue from "vue";
import { Router } from "express";
import { createRenderer } from "vue-server-renderer";
import UserController from "../controller/user";
import RoleController from "../controller/role";

const router = Router();

const render = createRenderer({
  // 为整个页面的 HTML 提供一个模板。此模板应包含注释 <!--vue-ssr-outlet-->，作为渲染应用程序内容的占位符。
  template: `
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" rel="stylesheet"/>
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
        <title>RBAC</title>
        <style type="text/css">
          body {
            width: 80%;
            margin: 0 auto;
          }
          form {
            width: 100%;
            margin: 200px auto;
            padding: 50px 20px;
            border: thin solid #eee;
            border-radius: 4px;
          }
          .form-group {
            display: flex;
          }
          .form-group label {
            width: 150px;
          }
        </style>
      </head>
      <body>
        <!-- 这里将是应用程序 HTML 标记注入的地方。 -->
        <!--vue-ssr-outlet-->
      </body>
    </html>
    `,
});

// =================== 注册登录 ======================

router.get("/", function (req, res) {
  const app = new Vue({
    template: `
      <div>欢迎来到三体世界</div>
    `,
  });

  render.renderToString(app, function (err, html) {
    if (err) {
      res.status(500).end("Internal Server Error");
      return;
    }
    res.status(200).send(html);
  });
});

// =================== 用户 ======================

router.delete("/user", UserController.deleteUser);

router.post("/user", UserController.updateUser);

router.get("/users", UserController.getAllUsers);

router.get("/user/:userId", UserController.getUserById);

router.get("/getUserWithRole", UserController.getUserWithRole);

router.post("/setUserRole", UserController.setUserRole);

// =================== 角色 ======================

router.put("/role", RoleController.createRole);

router.delete("/role", RoleController.deleteRole);

router.post("/role", RoleController.updateRole);

router.get("/role", RoleController.getAllRoles);

export default router;
