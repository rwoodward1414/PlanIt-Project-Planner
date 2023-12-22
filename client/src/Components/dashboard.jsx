import React from "react";
import { useNavigate } from 'react-router-dom';
function Dashboard () {

    const navigate = useNavigate();
    const [projects, setProjects] = React.useState([]);
    const [weekStart, setWeekStart] = React.useState(Date());
    const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    React.useEffect(() => {
        const dashboard = async () => {
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
                return data;
            }
        };
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - (startDate.getDay() - 1));
        setWeekStart(startDate);
        setProjects(dashboard());
    }, []);

    const Day = (d) => {
        return (
            <div class="w-2/12 m-1 bg-white rounded-lg">
                <p>{d.d}</p>
                <p>{d.date}</p>
            </div>
        )
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
            console.log(weekDate);
            weekDate.setDate(weekDate.getDate() + 1);
        }
        weekDate = new Date(weekStart);
        return (
            <>
            <button type="button" onClick={back}>Last Week</button>
            <h3>{months[weekDate.getMonth()]} {weekDate.getFullYear()}</h3>
            <button type="button" onClick={forward}>Next Week</button>
                <div class="w-4/5 flex flex-row">
                    {weekList.map(day => (
                        <Day d={daysOfWeek[day.getDay()]} date={day.getDate()} />
                    ))}
                </div>
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
                        <h2>Overview</h2>
                    </section>
                </aside>
            </div>
        </>
    )
}

export default Dashboard;