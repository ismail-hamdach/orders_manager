const db = require("./database");

const {_objectToArray} = require('../helpers/Helpers')

const getAllUsers = () => {
    const sql = 'SELECT * FROM users';
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            return err ? reject(err) : resolve(result)
        })
    })
}

const getUserByName = (name) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM user WHERE username LIKE ?`;
        db.query(sql, name, (err, result) => {
            return err ? reject(err) : resolve(result);
        })
    })
}

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM user WHERE id = ?`;
        db.query(sql, id, (err, result) => {
            return err ? reject(err) : resolve(result);
        })
    })
}

const addUser = (user) => {
    const sql = `INSERT INTO user SET ?`;
    return new Promise((resolve, reject) => {
        db.query(sql, user, async (err, result) => {
            return err ? reject(err) : resolve(result)
        })
    })
}

const userLogged = (user) => {
    const sql = 'INSERT INTO login_history(user_id) VALUES (?)'
    return new Promise((resolve, reject) => {
        db.query(sql, user.id, (err, res) => {
            return err ? reject(err) : resolve(res)
        })
    })
}

const getRolesByUser = (id) => {
    const sql = 'SELECT role_title as role FROM user_role WHERE user_id = ?';
    return new Promise ((resolve, reject) => {
        db.query(sql, id, (err, res) => {
            return err ? reject(err) : resolve(res)
        })
    })
}

module.exports = {
    getAllUsers,
    addUser,
    getUserById,
    getUserByName,
    userLogged,
    getRolesByUser
}