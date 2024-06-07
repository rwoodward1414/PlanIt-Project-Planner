import React from "react";
import { useNavigate, Link } from 'react-router-dom';

function NewProject ({ open, close }) {
    const [name, setName] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [date, setDate] = React.useState('');
    const [categories, setCategories] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        const loadCategories = async () => {
            const res = await fetch('http://localhost:3001/category', {
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
                setCategories(data);
            }
        };
        loadCategories();
    },[]);

    const createProject = async () => {
        const res = await fetch('http://localhost:3001/project/create', {
            credentials: 'include',    
            method: 'POST',
            body: JSON.stringify({
                name, category, date
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
            close();
        }
    };

    if(!open) {
        return null;
    }

    return (
        <>
        <div class="flex flex-col w-2/3 md:w-1/2 lg:w-2/5 xl:w-2/5 2xl:w-2/5 m-auto rounded-lg shadow-lg py-8 px-12 bg-white">
            <button type="button" onClick={close}>X</button>
            <h2 class="text-center text-lg font-bold">New Project</h2>
            <p class="m-1">Project Name:</p>
                <input type="text" class="mt-1 h-10 border shadow-sm rounded-md" value={name} onChange={e => setName(e.target.value)} />
            <p class="m-1">Category:</p>
            <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
                {categories.map(cat => (
                    <option value={cat}>{cat}</option>
                ))}
            </select>
            <p class="m-1">Due Date:</p>
                <input type="date" class="mt-1 h-10 border shadow-sm rounded-md" value={date} onChange={e => setDate(e.target.value)} />
            <button type="button" class="my-5 h-10 bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600 rounded-md text-white w-1/2 m-auto" onClick={() => {createProject();close();}}>Create</button>
        </div>
        </>
    )
}

export default NewProject;