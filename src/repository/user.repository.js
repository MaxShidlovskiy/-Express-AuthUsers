const pool = require(`../db`);

async function createUserDB(name, surname, email, pwd) {
    const client = await pool.connect();
    const sql = `INSERT INTO users (name, surname, email, pwd) values ($1,$2,$3,$4) returning *`;
    const result = (await client.query(sql,[name, surname, email, pwd])).rows;
    return result;
}
async function getUserByEmailDB(email) {
    const client = await pool.connect();
    const sql = `SELECT * FROM users WHERE email = $1`;
    const result = (await client.query(sql,[email])).rows;
    return result;
}

module.exports = { createUserDB, getUserByEmailDB }