import User from "./user";
import Role from "./role";

function associate() {
  User.belongsToMany(Role, {
    through: "UserRole",
    as: "role",
  });

  Role.belongsToMany(User, {
    through: "UserRole",
    as: "user",
  });
}

export default associate;
