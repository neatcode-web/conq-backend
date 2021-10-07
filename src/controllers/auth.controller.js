
import { getConnection, querys, sql } from "../database";
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt'
import { success, error, validation } from "../responseApi";
import { signAccessToken } from '../middleware/authMiddleware'
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
        const { username, password } = req.body 
        const { recordset } = await pool
          .request()
          .input("username", username)
          .query(querys.getUserByUserName);
        //New User
        if( recordset.length === 0 ){
            await pool
                .request()
                .input("username", sql.VarChar, username)
                .input("branch", sql.VarChar, null)
                .input("password", sql.VarChar, password)
                .query(querys.addNewUser);
            //generate jwt and response with success
            const response = {
                user: {
                    username: username,
                    branch: null
                }
            }
            res
            .status(200)
            .json(success("OK", { data: response }, res.statusCode));
        }
        else{
            //existing User
            const result = await pool
                        .request()
                        .input("username", username)
                        .input("password", password)
                        .query(querys.getUserByIdAndPassword);
            console.log(result)
            if( recordset.length === 0 ){
                res
                .status(422)
                .json(validation({ password: "Incorrect Password" }));
            }
            else{
                //generate jwt and response with success
                const accessToken = await signAccessToken(recordset[0].ID)
                res
                .status(200)
                .json(success("OK", { data: {accessToken} }, res.statusCode));
            }
        }

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

module.exports = {
    signIn: signIn,
}   