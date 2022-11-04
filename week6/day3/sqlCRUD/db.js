const spicedPg = require("spiced-pg");

const { DATABASE_USERNAME, DATABASE_PASSWORD } = require("./secrets.json");
const DATABASE_NAME = "crud";
const DATABASE_URL = `postgres:${DATABASE_USERNAME}:${DATABASE_PASSWORD}@localhost:5432/${DATABASE_NAME}`;

const db = spicedPg(DATABASE_URL);

function getUsers() {
    return db.query("SELECT * FROM users").then((result) => result.rows);
}

function getUserById(id) {
    return db
        .query(`SELECT * FROM users WHERE id = $1`, [id])
        .then((result) => result.rows[0]);
}

function createUser({ first_name, last_name, email, profile_picture_url }) {
    return db.query(
        `
    INSERT INTO users (first_name, last_name, email, profile_picture_url)
    VALUES ($1, $2, $3, $4)
    `,
        [first_name, last_name, email, profile_picture_url]
    );
}

function updateUser({
    first_name,
    last_name,
    email,
    profile_picture_url,
    user_id,
}) {
    console.log(first_name, last_name, email, profile_picture_url, user_id);
    return db.query(
        `
    UPDATE users SET first_name = $1, last_name = $2, email = $3, profile_picture_url = $4
    WHERE id = $5;
    `,
        [first_name, last_name, email, profile_picture_url, user_id]
    );
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
};
