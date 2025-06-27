import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";
import Author from "./author.js";

const Book = sequelize.define("Book", {
  title: DataTypes.STRING,
  publicationYear: DataTypes.INTEGER,
  pages: DataTypes.INTEGER,
});

Author.hasMany(Book);
Book.belongsTo(Author);

export default Book;
