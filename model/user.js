import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../utils/mysql";

const User = sequelize.define("User", {
  // attributes
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: UUIDV4
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  githubId: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  createdAt: 'created_time',
  updatedAt: 'updated_time',
});

export default User;