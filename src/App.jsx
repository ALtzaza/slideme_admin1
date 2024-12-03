import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout/Layout';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Permission from './pages/Permission/Permission';
import Document from './pages/Document/Document';
import Checkorder from "./pages/Checkorder/Checkorder";
import Driver from './pages/Driver/Driver';
import Manage from './pages/ManageCar/Manage';
import Services from './pages/Services pricing/Services';
import Map from './pages/Map/Map';
import Banner from './pages/Banner/Banner';
import Review from './pages/Review/Review';
import Accountadmin from './pages/Accountadmin/Accountadmin';
import Login from './pages/Login/Login';
import { users } from './Data/users';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || ''); // ใช้ localStorage เพื่อให้ token คงอยู่แม้จะรีเฟรชหน้า
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("Token from localStorage in App.js:", localStorage.getItem('token'));
    if (token) {
      const foundUser = users.find((u) => u.token === token);
      setUser(foundUser || null);
    }
  }, [token]);
  console.log("Token in App:", token);


 

  // ถ้าไม่มี token หรือไม่พบ user ที่ตรงกับ token จะเปลี่ยนเส้นทางไปหน้า Login
  if (!token || !user) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="App-container">
    <BrowserRouter basename='/slideme_admin1'>
      <Routes>
        <Route element={<Layout setToken={setToken} token={token} />}> {/* ส่ง token และ setToken ไปที่ Layout */}
          <Route path="/" element={<Home token={token} />} />
          <Route path="/home" element={<Home token={token} />} />
          <Route
            path="/dashboard"
            element={
              user && user.dashboardPermission ? (
                <Dashboard token={token} />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
          <Route
            path="/permission"
            element={
              user && user.permission ? (
                <Permission token={token} />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
          <Route
            path="/document"
            element={
              user && user.documentPermission ? (
                <Document token={token} />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
           <Route
              path="/checkorder"
              element={
                user && user.checkPermission ? (
                  <Checkorder token={token} />
                ) : (
                  <Navigate to="/home" replace />
                )
              }
            />
             <Route
              path="/driver"
              element={
                user && user.driverPermission ? (
                  <Driver token={token} />
                ) : (
                  <Navigate to="/home" replace />
                )
              }
            />
            <Route
            path='/manage'
            element={
              user && user.managePermission ? (
                <Manage token={token} />
              ) : (
                <Navigate to="/home" replace />
              )
            }
        />
        <Route
            path='/services'
            element={
              user && user.servicePermission ? (
                <Services token={token} />
              ) : (
                <Navigate to="/home" replace />
              )
            }
        />
         <Route
            path="/map/:id"
            element={
              user && user.mapPermission ? (
                <Map token={token} />
              ) : (
                <Navigate to="/home" replace />
              )
            }
        />
         <Route
            path="review"
            element={
              user && user.reviewPermission ? (
                <Review token={token} />
              ) : (
                <Navigate to="/home" replace />
              )
            }
        />
         <Route
            path="/banner"
            element={
              user && user.bannerPermission ? (
                <Banner token={token} />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
            <Route
            path="/accountadmin"
            element={
              user && user.accountadminPermission ? (
                <Accountadmin token={token} />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />

        </Route>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
