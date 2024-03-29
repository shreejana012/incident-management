import React from 'react'
import {Route, Routes} from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './core/Home' 
import Menu from './core/Menu' 
import Users from './user/Users.jsx'
import Signup from './user/Signup.jsx'
import Signin from './lib/Signin.jsx'
import Profile from './user/Profile.jsx'
import PrivateRoute from './lib/PrivateRoute.jsx'
import EditProfile from './user/EditProfile.jsx'
import IncidentManagement from './user/IncidentManagement.jsx'
//import IncidentManagement from './src/pages/IncidentManagement.jsx'

function MainRouter() {
return (
<div>
    <Menu/>
    <ToastContainer />
    <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
            path="/user/edit/:userId"
            element={
                <PrivateRoute>
                    <EditProfile />
                </PrivateRoute>
                }
            />
        <Route path="/user/:userId" element={<Profile />} />
        <Route path="/incidentmanagement" element={<IncidentManagement />} />
    </Routes>
</div>
 );
}

export default MainRouter
