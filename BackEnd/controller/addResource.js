const db = require("../config/dbConfig.js");

const addResource = (req, res) => {
    const { resourceTitle, resourceQuantity, user_id } = req.body;

    if (!resourceTitle || !resourceQuantity || !user_id) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }

    const resource = {
        resourceTitle: resourceTitle,
        resourceQuantity: resourceQuantity,
        user_id: user_id
    };

    const addResourceQuery = "INSERT INTO resources SET ?";

    db.query(addResourceQuery, resource, (error, result) => {
        if (error) {
            console.error("Error adding resource:", error);
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.status(201).json({ message: "Resource added successfully" });
    });
};

module.exports = addResource;
