import React from "react";
import { useNavigate } from 'react-router-dom';
function Dashboard () {

    const navigate = useNavigate();
    const [projects, setProjects] = React.useState([]);

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
            } else {
                setProjects(data);
            }
        };

        dashboard();
    }, []);

    const Day = (d) => {
        return (
            <div class="w-2/12 m-1 bg-white rounded-lg">
                <p>{d.d}</p>
                <p>{d.date}</p>
            </div>
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
                <div class="w-4/5 flex flex-row">
                    <Day d="M" date='11/12' />
                    <Day d="T" date='12/12' />
                    <Day d="W" date='13/12' />
                    <Day d="T" date='14/12' />
                    <Day d="F" date='15/12' />
                    <Day d="S" date='16/12' />
                    <Day d="S" date='17/12' />
                </div>
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