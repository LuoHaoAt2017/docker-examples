import http from "http";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import favicon from "serve-favicon";
import router from "./routes/index";
import sequelize from "./utils/mysql";
import associate from './model/index';

(async function server() {
  const app = express();
  // 虚拟路径前缀
  app.use('/static', express.static(path.join(__dirname, "assets")));
  app.use(favicon(path.join(__dirname, "assets", "favicon.ico")));
  // 解析 form 参数
  app.use(bodyParser.urlencoded({ extended: false }));
  // 解析 json 参数
  app.use(bodyParser.json());
  app.use(cookieParser());
  // 注册路由
  app.use(router);
  try {
    associate();
    // 测试连接
    await sequelize.authenticate();
    // 一次同步所有模型
    await sequelize.sync({ force: true });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  // 创建服务
  const server1 = http.createServer(app);
  const server2 = http.createServer(app);
  const server3 = http.createServer(app);
  // 监听接口
  server1.listen(9000);
  server2.listen(9001);
  server3.listen(9002);
})();
