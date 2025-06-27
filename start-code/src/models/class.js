import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const Class = sequelize.define("Class", {
  name: DataTypes.STRING,
});

export default Class;
