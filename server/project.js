const { sanitizeFilter } = require("mongoose");
const { User, Project } = require("./dataModel.js")


async function createProject(userId, name, category, due){
    const user = await User.findById(userId);
    if (!user.categories.includes(category)) {
        throw new Error("Catergory does not exist");
    }

    let project = await Project.create({
        name: name,
        category: category,
        due: Date(due),
        steps: [],
        status: "notDone"
    }).setOptions({ sanitizeFilter: true });

    console.log(project);

    await project.save();
    user.projects.push(project._id);
    
    await user.save();
    return;
}

async function removeProject(userId, projectId){
    const user = await User.findById(userId);
    if (!user.projects.includes(projectId)) {
        throw new Error("Project does not exist");
    }

    await Project.deleteOne({ _id: projectId });
    user.projects.pull(projectId);
    await user.save();
    return;
}

async function addStep(projectId, name, date){
    const project = await Project.findById(projectId);
    const step = { step: name, due: Date(date), completed: false };
    sanitizeFilter(step);
    project.steps.push(step);
    await project.save();
    return;
}

async function listProject(userId){
    const user = await User.findById(userId);
    let list = [];
    list = await Project.find({_id: { $in: user.projects}});
    return list;
}

async function completeStep(projectId, name){
    const project = await Project.findById(projectId);
    let step = project.steps.find(step => step.step == name);
    step.completed = true;
    await project.save();
}

module.exports = { createProject, removeProject, addStep, listProject, completeStep };