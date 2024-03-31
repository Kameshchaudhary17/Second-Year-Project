const db = require("../config/dbConfig.js");

const addStudent = (req, res) => {
    const { resourceName, studentName, user_id } = req.body;


    const status = "pending"
    console.log(resourceName, studentName)

    const currentTime = new Date();


    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();


    const formattedTime = `${hours}:${minutes}:${seconds}`;

    console.log(formattedTime)


    if (!resourceName || !studentName) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }

    const student = {
        resourceName: resourceName,
        studentName: studentName,
        time: formattedTime,
        user_id: user_id,
        status: status
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
