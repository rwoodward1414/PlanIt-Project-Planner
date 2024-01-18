const { sanitizeFilter } = require("mongoose");
const { User, Project, Task } = require("./dataModel.js")


async function createProject(userId, name, category, due){
    const user = await User.findById(userId);
    if (!user.categories.includes(category)) {
        throw new Error("Catergory does not exist");
    }

    let project = await Project.create({
        name: name,
        category: category,
        due: Date(due),
        status: false
    }).setOptions({ sanitizeFilter: true });

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

async function addTask(projectId, name, date){
    const task = await Task.create({
        name: name,
        due: new Date(date),
        status: false,
        projectID: projectId
    }).setOptions({ sanitizeFilter: true });
    await task.save();
    return;
}

async function listProject(userId){
    const user = await User.findById(userId);
    let list = [];
    list = await Project.find({_id: { $in: user.projects}});
    return list;
}

async function listTasks(projectId, userId){
    let taskList = [];
    taskList = await Task.find({projectID: projectId});
    return taskList;
}

async function completeTask(projectId, name){
    await Task.findOneAndUpdate({name: name, projectID: projectId}, {status: true});
}

async function organiseByDate(userId){
    // const projects = listProject(userId);
    // (await projects).forEach(async project => {
    //     const tasks = listTasks(project._id, userId);
    //     (await tasks).forEach(task => {
    //         organised[task.due] = [];
    //         organised[task.due].push({task: task.name, project: project.name, taskId: task._id, projectId: project._id});
    //     })
    // });
    const user = await User.findById(userId);
    const filter = {projectID: {$in: user.projects}};

    const organised = await Task.aggregate([
        {$match: filter},
        {
            $group: {
                _id: {
                    $dateToString: { format: '%Y-%m-%d', date: '$due'}
                },
                tasks: { $push: '$$ROOT' }
            }
        }
    ]);

    console.log(organised);
    return organised;
}

module.exports = { createProject, removeProject, addTask, listProject, completeTask, listTasks, organiseByDate };