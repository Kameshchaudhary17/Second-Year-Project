const db = require("../config/dbConfig");

const deleteResources = (req, res) => {
  const { resourceId } = req.body;

  const deleteResourcesQuery = 'DELETE FROM resources WHERE resourceId = ?';

  db.query(deleteResourcesQuery, resourceId, (error, result) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    } else {
      return res.status(200).json({ message: "Resource deleted successfully!" });
    }
  });
};

module.exports = deleteResources;