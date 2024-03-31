const db = require("../config/dbConfig");

const getBookings = async (req, res) => {
    const { user_id } = req.query;

    const getBookingsQuery = "SELECT * FROM add_student WHERE user_id = ?";

    db.query(getBookingsQuery, user_id, (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
       
        return res.json({ result });
    });
};

module.exports = getBookings;
