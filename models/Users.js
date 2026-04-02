const connectDB = require("../config/db");

async function createUser(name, email, password) {
    const db = await connectDB;
    return db.collection('users').insertOne({
        name,
        email,
        password,
        createdAt: newDate()
    });
}

async function findByEmail(email) {
    const db = await connectDB;
    return db.collection('users').findOne({email});
}

module.exports = {
    createUser,
    findByEmail
}

