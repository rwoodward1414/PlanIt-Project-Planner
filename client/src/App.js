import './App.css';
import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
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
