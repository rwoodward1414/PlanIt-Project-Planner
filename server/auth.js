const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Project } = require("./dataModel.js");
const { sanitizeFilter } = require('mongoose');
require('dotenv').config();

async function createUser(username, email, password) {
    const saltRounds = parseInt(process.env.SALT_NUM);
    let user;

    if (await User.exists({ name: username }).setOptions({ sanitizeFilter: true })){
        throw new Error('Username already taken');
    } else if (await User.exists({ email: email }).setOptions({ sanitizeFilter: true })){
        throw new Error('Email already used');
    }

    const hashed = await bcrypt.hash(password, saltRounds);
    const userInfo = { name: username, email: email, password: hashed };
    sanitizeFilter(userInfo);
    user = await User.create(userInfo);

    const token = jwt.sign(
        { userId: user._id },
        process.env.TOKEN_KEY,
        {
            expiresIn: "6h",
        }
    );
    console.log(token);
    return token;
}

async function logIn(username, password) {
    if (!await User.exists({ name: username }).setOptions({ sanitizeFilter: true })){
        throw new Error('Incorrect username or password');
    }

    const user = await User.find({ name: username }).setOptions({ sanitizeFilter: true });
    const valid = await bcrypt.compare(password, user[0].password);

    if (valid) {
        const token = jwt.sign(
            { userId: user[0]._id },
            process.env.TOKEN_KEY,
            {
                expiresIn: "6h",
            }
        );
        return token;
    } else {
        throw new Error('Incorrect username or password');
    }
}

function verifyToken(token) {
    return jwt.verify(token, process.env.TOKEN_KEY);
}

module.exports = { createUser, logIn, verifyToken };