const db = require("../config/dbConfig.js");
const bcrypt = require('bcrypt');

const signup = (req, res) => {
    const { userName, email, password, contactNumber } = req.body;

    // Check if any required field is missing
    if (!userName || !email || !password || !contactNumber) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Prepare user data for insertion
    const newUser = {
        userName: userName,
        email: email,
        password: hashedPassword,
        contactNumber: contactNumber
    };

    // Check if user with the provided email already exists
    const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkEmailQuery, [email], (error, result) => {
        if (error) {
            console.error("Error checking email:", error); // Log the error for debugging
            return res.status(500).json({ error: "Error from server" });
        }

        if (result.length > 0) {
            return res.status(400).json({ error: "User with this email already exists!" });
        }

        // Insert new user into the database
        const createUserQuery = "INSERT INTO users SET ?";
        db.query(createUserQuery, newUser, (err, result) => {
            if (err) {
                console.error("Error creating user:", err); // Log the error for debugging
                return res.status(500).json({ error: "Error creating user" });
            }

            res.status(201).json({ message: "User created successfully!" });
        });
    });
};

module.exports = signup;
