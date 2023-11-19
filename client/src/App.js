import './App.css';
import Register from './Components/register';
import Login from './Components/login';
import React, { useEffect } from 'react';

// import {Router, Routers, Route} from "react-router-dom"
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import PageList from './Components/pageList';

function App() {


  return (

    <>
      <Router>
        <PageList />
      </Router>
    </>
  );
}

export default App;
