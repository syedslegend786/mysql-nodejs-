import { db } from "../db.cofig.js";
import CryptoJS from 'crypto-js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const generateToken = (data) => {
    const token = jwt.sign(data, process.env.accessTokenSecrets, { expiresIn: '7d' })
    return token;
}
export const userController = {
    signUp: async (req, res) => {
        try {
            const {
                user_login,
                user_pass,
                user_nicename,
                user_email,
            } = req.body;
            //check if the user already exists...
            const ALREADY_EXIT_QUERY = `
            select * 
            from wp_users
            where user_email=?
            `
            const [rows, fields] = await db.execute(ALREADY_EXIT_QUERY, [user_email])
            if (rows.length > 0) return res.status(400).json({ msg: 'user already registered!' })
            //check if the user already exists...

            const INSERT_QUERY = `
            insert into wp_users(
                user_login,
                user_pass,
                user_nicename,
                user_email,
                role
            )
            values(
                ?,
                ?,
                ?,
                ?,
                ?
            )
            `
            const GET_USER_ID = `
            select id
            from roles
            where role=?
            `
            const [_rows, _fileds] = await db.execute(GET_USER_ID, ["user"])
            //hashing password....
            // const encryptedPassword = CryptoJS.AES.encrypt(user_pass, process.env.PASSWORD_SECRET).toString();

            const encryptedPassword = CryptoJS.MD5(user_pass).toString();
            await db.execute(INSERT_QUERY, [
                user_login,
                encryptedPassword,
                user_nicename,
                user_email,
                _rows[0].id
            ])
            return res.status(200).json({
                msg: 'user created successfully!'
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    signIn: async (req, res) => {
        const {
            user_email,
            user_pass
        } = req.body
        try {
            const ALREADY_EXIT_QUERY = `
            select * 
            from wp_users
            where user_email=?
            `
            const [rows, fields] = await db.execute(ALREADY_EXIT_QUERY, [user_email])
            if (rows.length === 0) return res.status(400).json({ msg: 'incorrect email address' })

            //getting original pasword from DB
            const hashedPass = rows[0].user_pass;
            const mdPass = CryptoJS.MD5(user_pass).toString()
            const bytes = CryptoJS.AES.decrypt(hashedPass, process.env.PASSWORD_SECRET);
            const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
            console.log({ user_pass, mdPass })
            console.log(originalPassword)
            if (mdPass !== hashedPass) return res.status(400).json({ msg: 'incorrect password!' })
            // if (originalPassword !== user_pass) return res.status(400).json({ msg: 'incorrect password!' })
            //
            console.log(fields)
            //jwt...
            const token = generateToken({ id: rows[0].ID })

            return res.status(200).json({ token, rows })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}