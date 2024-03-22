const db = require("../config/dbConfig.js");

const addResource = (req,res) =>{

    const {resourceTitle, resourceQuantity} = req.body;

    if(!resourceTitle || !resourceQuantity){
        return res.status(400).json({ error: "Please fill all the fields" });
    }

    const resource = {
        "resourceTitle": resourceTitle,
        "resourceQuantity": resourceQuantity
    }

    const addResourceQuery = "INSERT INTO resources  SET ?"

    db.query(addResourceQuery, [resource] , (error,result)=>{
        if(error){
            return res.json({ error: "Internal server error" });
        }

        return res.json({ message: "Resources added successfully" });

    })
}

module.exports = addResource;

