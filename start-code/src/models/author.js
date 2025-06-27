import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const Author = sequelize.define("Author", {
  name: DataTypes.STRING,
  birthYear: DataTypes.INTEGER,
});

export default Author;
