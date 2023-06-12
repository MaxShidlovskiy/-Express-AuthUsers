const { Pool } = require(`pg`);
const pool = new Pool({
    password: `3131718z`,
    user: `postgres`,
    database: `contacts`,
    port: `5432`,
    host: `localhost`
})

module.exports = pool;