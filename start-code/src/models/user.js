import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";


// TODO - Create the model User  (attributes name and age)
const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,  // string/varchar type
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER, // integer type
    allowNull: false,
  },
});

// TODO - Export the model User

export default User;