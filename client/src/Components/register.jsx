import React from "react";
import { useNavigate } from 'react-router-dom';

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
            <h2>Sign Up</h2>
            Username:
                <input type="text" value={username} onChange={e => setName(e.target.value)} />
            Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="button" onClick={register}>Register</button>
        </>
    )
}

export default Register;