import React, { useState, useEffect } from 'react';
import { Container, Card,  Image } from 'react-bootstrap';

const Home = () => {
  const [user, setUser] = useState(null);

  // โหลดข้อมูลผู้ใช้จาก localStorage เมื่อหน้าเว็บโหลด
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      setUser(storedUser); // โหลดข้อมูลจาก localStorage
    }
  }, []); // โหลดครั้งเดียวตอน mount

  if (!user) {
    return <p>Loading...</p>;  // แสดงข้อความขณะกำลังโหลดข้อมูล
  }

  return (
    <div className="pages-container">
      <div className="hader-container">           
        <span className='hader-text'><h1><strong>PROFILE</strong></h1></span> 
        <div className="user-icon">👤</div> 
      </div>

      <Container  className="profile-container mt-5">
        <Card className="text-center p-4">
          <Image src={user.profileImage || 'default-profile.jpg'} roundedCircle width="250" height="250" className="mb-3 mx-auto" />
          <Card.Body>
            <Card.Title><h3>{user.name}</h3></Card.Title>
            <Card.Text>       
              <p style={{fontSize: '20px'}}><strong>Email:</strong> {user.email}</p>
              <p style={{fontSize: '20px'}}><strong>Role:</strong> {user.roles}</p>
              <p style={{fontSize: '20px'}}><strong>Phone:</strong> {user.phone}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Home;
