const mongoose = require('mongoose');

const userSchema = new  mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [String],
    categories: [String],
    projects: [
        {
            name: String,
            category: String,
            due: Date,
            steps: [{step: String, completed: Boolean}],
            status: String
        }
    ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;