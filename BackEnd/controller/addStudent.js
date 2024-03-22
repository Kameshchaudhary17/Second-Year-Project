const db = require("../config/dbConfig.js");

const addStudent = (req, res) => {
    const { resourceName, studentName, time } = req.body;

    if (!resourceName || !studentName || !time) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }

    const student = {
        resourceName: resourceName,
        studentName: studentName,
        time: time
    };

    const addStudentQuery = "INSERT INTO add_student SET ?";

    db.query(addStudentQuery, student, (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.json({ message: "Student added successfully" });
    });
};

module.exports = addStudent;
