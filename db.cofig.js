import mysql from 'mysql2/promise'

export const db = await mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "asdzxcasdzxc123123",
    database: "doctorapp"
})