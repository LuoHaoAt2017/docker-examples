import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../utils/mysql";

const Role = sequelize.define(
  "Role",
  {
    // attributes
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: UUIDV4,
    },
    rolename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    createdAt: "created_time",
    updatedAt: "updated_time",
  }
);

export default Role;
