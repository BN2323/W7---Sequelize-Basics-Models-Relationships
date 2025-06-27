import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";
import Student from "./student.js";
import Class from "./class.js";

const AttendanceRecord = sequelize.define("AttendanceRecord", {
  date: DataTypes.DATEONLY,
  status: DataTypes.STRING,
});

Student.belongsToMany(Class, { through: AttendanceRecord });
Class.belongsToMany(Student, { through: AttendanceRecord });

AttendanceRecord.belongsTo(Student);
AttendanceRecord.belongsTo(Class);
Student.hasMany(AttendanceRecord);
Class.hasMany(AttendanceRecord);

export default AttendanceRecord;
