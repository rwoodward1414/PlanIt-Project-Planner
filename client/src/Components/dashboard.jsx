import React from "react";
import { useNavigate } from 'react-router-dom';
function Dashboard () {

    const navigate = useNavigate();
    const [projects, setProjects] = React.useState([]);
    const [tasks, setTasks] = React.useState([]);
    const [weekStart, setWeekStart] = React.useState(Date());
    const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    function formatDateToYYYYMMDD(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    React.useEffect(() => {
        const project = async () => {
            const res = await fetch('http://localhost:3001/project', {
                credentials: 'include',    
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await res.json();
            if (data === 'Invalid token'){
                navigate('/login');
                return null;
            } else {
                setProjects(data);
            }
        };

        const task = async () => {
            const res = await fetch('http://localhost:3001/tasks', {
                credentials: 'include',    
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await res.json();
            if (data === 'Invalid token'){
                navigate('/login');
                return null;
            } else {
                console.log(data);
                setTasks(data);
            }
        };

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - (startDate.getDay() - 1));
        setWeekStart(startDate);
        project();
        task();
    }, []);

    const Day = (d) => {
        const tasksForDay = tasks.filter(task => task._id === formatDateToYYYYMMDD(d.date));
        if (tasksForDay.length === 0) {
            return (
            <div class="w-2/12 m-1 bg-white rounded-lg">
                <p>{d.d} - {d.date.getDate()}</p>
            </div>
            );
        }
        return (
            <div class="w-2/12 m-1 bg-white rounded-lg">
                <p>{d.d} - {d.date.getDate()}</p>
                {tasksForDay[0].tasks.map(task => (
                    <TaskCard task={task}></TaskCard>
                ))}
            </div>
        );
    }

    const TaskCard = (task) => {
        return (
            <div class="bg-slate-300  h-1/5 m1 rounded-lg" key={task._id}>
                <p>{task.task.name}</p>
                <input type="checkbox" checked={task.task.status} onChange={completeTask}></input>
            </div>
        );
    }

    const completeTask = async (task) => {
        const res = await fetch('http://localhost:3001/project/add', {
            credentials: 'include',    
            method: 'PUT',
            body: JSON.stringify({
                id: task.projectID,
                name: task.name
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    const back = () => {
        const newWeekStart = new Date(weekStart);
        newWeekStart.setDate(newWeekStart.getDate() - 7);
        setWeekStart(newWeekStart);
    }

    const forward = () => {
        const newWeekStart = new Date(weekStart);
        newWeekStart.setDate(newWeekStart.getDate() + 7);
        setWeekStart(newWeekStart);
    }

    const Week = () => {
        let weekDate = new Date(weekStart);
        const weekList = [];
        for (let i = 0; i < 7; i++){
            weekList.push(new Date (weekDate));
            weekDate.setDate(weekDate.getDate() + 1);
        }
        weekDate = new Date(weekStart);
        return (
            <div class="w-4/5">
                <div class="flex flex-row flex-wrap justify-between w-full">
                    <button type="button" onClick={back}>Last Week</button>
                    <h3>{months[weekDate.getMonth()]} {weekDate.getFullYear()}</h3>
                    <button type="button" onClick={forward}>Next Week</button>
                </div>
                    <div class="flex flex-row h-full">
                        {weekList.map(day => (
                            <Day d={daysOfWeek[day.getDay()]} date={day}/>
                        ))}
                    </div>
            </div>
        )
    }

    const ProjectList = () => {
        const list = projects;
        return (
            <>
            {list.map(project => (
                <div key={project.id}>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                    <p>{daysOfWeek[new Date(project.due).getDay()]} {new Date(project.due).getDate()}/{new Date(project.due).getMonth() + 1}</p>
                </div>
            ))}
            </>
        )
    }

    if (projects.length < 1){
        return (
            <>
                <h2>No Projects Found</h2>
            </>
        )
    }

    return (
        <>
            <h2>Projects</h2>
            <div class="flex w-full p-10">
                <Week />
                <aside>
                    <section class="flex flex-row">
                        <button type="button" class="my-5 h-10 bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600 rounded-md text-white w-1/2 m-auto">New Project</button>
                        <button type="button" class="my-5 h-10 bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600 rounded-md text-white w-1/2 m-auto">Settings (?)</button>
                    </section>
                    <section>
                        <h2>Projects Overview</h2>
                        <ProjectList></ProjectList>
                    </section>
                </aside>
            </div>
        </>
    )
}

export default Dashboard;