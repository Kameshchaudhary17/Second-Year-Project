const db = require("../config/dbConfig");

const getInventory = async (req, res) => {
    const { user_id } = req.query;

    const getInventoryQuery = "SELECT * FROM resources WHERE user_id = ?";

    db.query(getInventoryQuery, [user_id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error" });
        }
       
        return res.json({ result });
    });
};

module.exports = getInventory;
