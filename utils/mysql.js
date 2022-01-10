import { Sequelize } from "sequelize";

export const prod_db = {
  database: "docker", // 数据库名称
  username: "tomcat",
  password: "my-secret-pw",
  dialect: "mysql",
  host: "web-mysql-container",
  port: 8089,
};

export const db = {
  database: "docker", // 数据库名称
  username: "root",
  password: "LuoHao-123",
  dialect: "mysql",
  host: "localhost",
  port: 3306,
};

export default new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  port: db.port,
  dialect: db.dialect,
  define: {
    freezeTableName: true, // 停止 Sequelize 执行自动复数化。 Sequelize 将推断表名称等于模型名称,而无需进行任何修改。
  },
});
