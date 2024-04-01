const db = require("../config/dbConfig");

const changeStatus = async (req, res) => {
    const studentId = req.query.studentId;

    const updateStatusQuery = "UPDATE add_student SET status = 'returned' WHERE studentId = ?";

    db.query(updateStatusQuery, studentId, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error" });
        }
        console.log("Status updated successfully");
        return res.json({ message: "Status updated successfully" });
    });
};

module.exports = changeStatus;
