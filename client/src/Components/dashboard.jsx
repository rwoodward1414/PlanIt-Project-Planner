import React from "react";
import { useNavigate } from 'react-router-dom';
function Dashboard () {

    const navigate = useNavigate();

    const dashboard = async () => {
        const res = await fetch('http://localhost:3001/projects', {
            credentials: 'include',    
            method: 'GET',
            body: JSON.stringify({

            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await res.json();
        if (data.error){
            alert(data.error);
        }
    };

    return (
        <>
            <h2>Projects</h2>
        </>
    )
}

export default Dashboard;