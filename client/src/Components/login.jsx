import React from "react";
import { useNavigate } from 'react-router-dom';
function Login () {
    const [password, setPassword] = React.useState('');
    const [username, setName] = React.useState('');
    const navigate = useNavigate();

    const login = async () => {
        const res = await fetch('http://localhost:3001/user/login', {
            credentials: 'include',    
            method: 'POST',
            body: JSON.stringify({
                username, password
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await res.json();
        if (data.error){
            alert(data.error);
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <>
            <h2>Log In</h2>
            Username:
                <input type="text" value={username} onChange={e => setName(e.target.value)} />
            Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="button" onClick={login}>Log In</button>
        </>
    )
}

export default Login;