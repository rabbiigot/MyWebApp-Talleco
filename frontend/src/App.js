import './App.css';
import Navbar from './components/navbar';
import Home from './views/home';
import Orders from './views/orders';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React, { useState } from 'react';

function App() {
  const [navbarStatus, setNavbarStatus] = useState(false);
  const toggleNavbar = (newStatus) => {
    setNavbarStatus(newStatus); 
  };
  
  return (
    <Router> 
      <div className="App">
        <Navbar navbarShow={navbarStatus} navbarSet={toggleNavbar}/>
      </div>

      <div className='page-nav'>
        <Routes>
          <Route index element={<Home show={navbarStatus}/>}/>
          <Route path='/orders' element={<Orders show={navbarStatus} />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
