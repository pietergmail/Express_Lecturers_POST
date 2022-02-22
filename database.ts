import mysql from 'mysql2';
import util from 'util';
import * as dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEME,
});

const query = util.promisify(connection.query).bind(connection);

export { query };
