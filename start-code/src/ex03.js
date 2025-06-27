import express from "express";
import sequelize from "./db/database.js";

import Student from "./models/student.js";
import Class from "./models/class.js";
import AttendanceRecord from "./models/attendanceRecord.js";

const app = express();
app.use(express.json());

// Mark attendance for a student in a class on a given date
app.post("/attendance", async (req, res) => {
  // Accept both lowercase and capitalized keys from query
  const StudentId = req.query.studentId || req.query.StudentId;
  const ClassId = req.query.classId || req.query.ClassId;
  const date = req.query.date;
  const status = req.query.status;

  if (!StudentId || !ClassId || !date || !status) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const attendance = await AttendanceRecord.create({ StudentId, ClassId, date, status });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get attendance for a student on a specific date
app.get("/attendance", async (req, res) => {
  const studentId = req.query.studentId || req.query.StudentId;
  const date = req.query.date;

  if (!studentId || !date) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const attendance = await AttendanceRecord.findOne({
      where: { StudentId: studentId, date },
      include: [Class, Student],
    });

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List attendance for all students in a class (optional date filter)
app.get("/classes/:id/attendance", async (req, res) => {
  const classId = req.params.id;
  const date = req.query.date;

  const whereClause = { ClassId: classId };
  if (date) {
    whereClause.date = date;
  }

  try {
    const records = await AttendanceRecord.findAll({
      where: whereClause,
      include: Student,
      order: [["date", "ASC"]],
    });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get attendance summary for a student
app.get("/students/:id/attendance", async (req, res) => {
  const studentId = req.params.id;

  try {
    const records = await AttendanceRecord.findAll({
      where: { StudentId: studentId },
      include: Class,
      order: [["date", "ASC"]],
    });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 4000;

(async () => {
  try {
    await sequelize.sync({ force: true });

    const alice = await Student.create({ name: "Alice" });
    const bob = await Student.create({ name: "Bob" });

    const math = await Class.create({ name: "Math" });
    const science = await Class.create({ name: "Science" });

    await AttendanceRecord.create({ StudentId: alice.id, ClassId: math.id, date: "2025-06-17", status: "present" });
    await AttendanceRecord.create({ StudentId: bob.id, ClassId: math.id, date: "2025-06-17", status: "absent" });
    await AttendanceRecord.create({ StudentId: alice.id, ClassId: science.id, date: "2025-06-18", status: "present" });

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
})();
