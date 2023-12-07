import React from "react";
import { useNavigate, Link } from 'react-router-dom';

function Register () {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setName] = React.useState('');
    const navigate = useNavigate();

    const register = async () => {
        const res = await fetch('http://localhost:3001/user/createAccount', {
            credentials: 'include',    
            method: 'POST',
            body: JSON.stringify({
                username, email, password
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
            <h2 class="text-center text-lg font-bold">Sign Up</h2>
            <p class="m-1">Username:</p>
                <input type="text" class="mt-1 h-10 border shadow-sm rounded-md" value={username} onChange={e => setName(e.target.value)} />
            <p class="m-1">Email:</p>
                <input type="email" class="mt-1 h-10 border shadow-sm rounded-md" value={email} onChange={e => setEmail(e.target.value)} />
            <p class="m-1">Password:</p>
                <input type="password" class="mt-1 h-10 border shadow-sm rounded-md" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="button" class="my-5 h-10 bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600 rounded-md text-white w-1/2 m-auto" onClick={register}>Register</button>
            <p class="inline-block">Already have an account?</p>
            <Link to='/login' class="text-emerald-600 inline-block">Log in here</Link>
        </div>
        </>
    )
}

export default Register;