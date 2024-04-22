import React from "react";
import { useNavigate, useParams } from 'react-router-dom';

function NewTask () {
    const [name, setName] = React.useState('');
    const [date, setDate] = React.useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const createTask = async () => {
        const res = await fetch('http://localhost:3001/project/add', {
            credentials: 'include',    
            method: 'POST',
            body: JSON.stringify({
                id, name, date
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json();
        console.log(data);
        if (data.error){
            alert(data.error);
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <>
        <div class="flex flex-col w-2/3 md:w-1/2 lg:w-2/5 xl:w-2/5 2xl:w-2/5 m-auto rounded-lg shadow-lg py-8 px-12 bg-white">
            <button type="button" onClick={() => navigate('/dashboard')}>Back</button>
            <h2 class="text-center text-lg font-bold">New Task</h2>
            <p class="m-1">Task Name:</p>
                <input type="text" class="mt-1 h-10 border shadow-sm rounded-md" value={name} onChange={e => setName(e.target.value)} />
            <p class="m-1">Due Date:</p>
                <input type="date" class="mt-1 h-10 border shadow-sm rounded-md" value={date} onChange={e => setDate(e.target.value)} />
            <button type="button" class="my-5 h-10 bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600 rounded-md text-white w-1/2 m-auto" onClick={createTask}>Create</button>
        </div>
        </>
    )
}

export default NewTask;