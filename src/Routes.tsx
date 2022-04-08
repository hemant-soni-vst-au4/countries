import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Country from './pages/Country/Country';


const AllRoutes = () => {
    return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:name" element={<Country/>} />
        </Routes>
    )
}

export default AllRoutes;