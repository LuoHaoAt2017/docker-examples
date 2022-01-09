import { Sequelize } from 'sequelize';
import UserFactory from './user';
import RoleFactory from './role';

export const db = {
  database: 'docker', // 数据库名称
  username: 'root',
  password: 'my-secret-pw',
  dialect: 'mysql',
  host: 'web-mysql-container',
  port: 9099,
  // host: 'localhost',
  // port: 3306,
}

const models = {};

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: db.dialect,
  port: db.port,
  define: {
    freezeTableName: true, // 停止 Sequelize 执行自动复数化。 Sequelize 将推断表名称等于模型名称,而无需进行任何修改。
  }
});

const User = UserFactory(sequelize);
const Role = RoleFactory(sequelize);

User.belongsToMany(Role, {
  through: 'UserRole',
  as: 'role'
});

Role.belongsToMany(User, {
  through: 'UserRole',
  as: 'user'
});

models[User.name] = User;
models[Role.name] = Role;

async function connect() {
  try {
    // 测试连接
    await sequelize.authenticate();
    // 一次同步所有模型
    await sequelize.sync({ alter: true });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default connect;