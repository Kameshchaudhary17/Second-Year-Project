const db = require("../config/dbConfig");

const getBookings = async (req, res) => {
    const { user_id } = req.query;

    const getBookingsQuery = "SELECT * FROM add_student WHERE user_id = ? AND status = 'pending'";

    db.query(getBookingsQuery, user_id, (error, result) => {
        if (error) {
            console.log(error)
            return res.status(500).json({ error: "Internal server error" });
        }
       
        return res.json({ result });
    });
};

module.exports = getBookings;
