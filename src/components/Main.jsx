import React from 'react'
import { Routes, Route } from 'react-router-dom'
import "../styles/main.scss"

import Home from './pages/Home';
import Login from './pages/Login';

const Main = () => {
    return(
        <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
        </Routes>
    );
}

export default Main;