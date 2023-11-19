const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Project } = require("./dataModel.js")
require('dotenv').config();

async function createUser(username, email, password) {
    const saltRounds = parseInt(process.env.SALT_NUM);
    let user;

    if (await User.exists({ name: username })){
        throw new Error('Username already taken');
    } else if (await User.exists({ email: email })){
        throw new Error('Email already used');
    }

    const hashed = await bcrypt.hash(password, saltRounds);
    user = await User.create({ name: username, email: email, password: hashed });

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
    if (!await User.exists({ name: username })){
        throw new Error('User does not exist');
    }

    const user = await User.find({ name: username });
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
        throw new Error("Incorrect password");
    }
}

function verifyToken(token) {
    return jwt.verify(token, process.env.TOKEN_KEY);
}

module.exports = { createUser, logIn, verifyToken };