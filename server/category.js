const User = require("./dataModel.js")

async function createCategory(userId, category){
    const user = await User.findById(userId)
    if (user.categories.includes(category)) {
        throw new Error("Catergory of that name already exists");
    }
    user.categories.push(category);
    await user.save();
    return;
}

async function removeCategory(userId, category){
    const user = await User.findById(userId)
    if (!user.categories.includes(category)) {
        throw new Error("Catergory does not exist");
    }
    user.categories.pull(category);
    await user.save();
    return;
}

async function listCategory(userId){
    const user = await User.findById(userId)
    return user.categories;
}

module.exports = { createCategory, removeCategory, listCategory };