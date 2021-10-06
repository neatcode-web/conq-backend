const config = require("../dbConfig")
const sql = require("mssql")
const { body, validationResult } = require('express-validator');

async function signIn(req, res){
    /**
     * @param
     * @email,
     * @password
     * Find User
     */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
    }
    const pool = await sql.connect(config);
    res.status(200).json({
        message: "Success on Sign In",
        result: 1,
        data:[]
    });
}

module.exports = {
    signIn: signIn
} 