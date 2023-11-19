import Register from './register';
import Login from './login';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './dashboard';


function PageList(){
    const [token, setToken] = React.useState(null);
    
    useEffect(() => {
        const checkLogIn = async () => {
            const res = await fetch('http://localhost:3001/user/me', {
                credentials: 'include',    
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await res.json();
            if (!data.error){
                setToken(res.data);
                console.log("hi");
            }
        };
        checkLogIn();

    }, []);

    if(token)

    return (
    <>
        {token ? (
            <Link to="/dashboard">Dashboard</Link>
        ) : (
            <Link to="/register">Register</Link>
        )}
        <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard'  element={<Dashboard />} />
        </Routes>
    </>
    )
}

export default PageList