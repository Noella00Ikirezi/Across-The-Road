import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './api/authContext';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import Home from './components/pages/Home';
import Resetpassword from './components/pages/Resetpassword';
import CMSItem from './components/pages/CMSItem';
import CMSAdmin from './components/pages/CMSAdmin';
import CMSPage from './components/pages/CMSPage';
import Blog from './components/Homepage/Blog';
import Activity1 from './components/pages/Activity1';
import Activity2 from './components/pages/Activity2';
import Activity3 from './components/pages/Activity3';


function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/resetpassword" element={<Resetpassword />} />
                    <Route path="/CMSItem" element={<CMSItem />} />
                    <Route path="/CMSAdmin" element={<CMSAdmin />} />
                    <Route path="/CMSPage/:id" element={<CMSPage />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/activity1" element={<Activity1 />} />
                    <Route path="/activity2" element={<Activity2 />} />
                    <Route path="/activity3" element={<Activity3 />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/admin" element={<CMSAdmin/>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
