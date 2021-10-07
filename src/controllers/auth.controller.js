
import { getConnection, querys, sql } from "../database";
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt'
import { success, error, validation } from "../responseApi";

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

    try {
        const pool = await getConnection();
    
        const result = await pool
          .request()
          .input("username", req.params.username)
          .query(querys.getUserByUserName);
        return res.json(result.recordset[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
    const salt = await bcrypt.genSalt();
    const password = await (await bcrypt).hash( req.body.password, salt )

    res.status(200).json({
        message: "Success on Sign In",
        result: 1,
        data:[
            {
                "salt": salt,
                "password": password
            }
        ]
    });
}

module.exports = {
    signIn: signIn,
}   