import React, { useState } from 'react';
import './Accountadmin.css';

// นำเข้าข้อมูลผู้ใช้จากไฟล์อื่น
import { users as initialUsers } from '../../Data/users'; // สมมติว่าไฟล์นี้ชื่อ 'userData.js'

function Accountadmin() {
  const [users, setUsers] = useState(initialUsers); // โหลดข้อมูลผู้ใช้เริ่มต้น
  const [formData, setFormData] = useState({ id: null, name: '', gender: '', phone: '', email: '' }); // เก็บข้อมูลจากฟอร์ม
  
  // ฟังก์ชันสำหรับจัดการ input ในฟอร์ม
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ฟังก์ชันบันทึกข้อมูล
  const handleSave = () => {
    if (formData.id) {
      // แก้ไขข้อมูลที่มีอยู่
      const updatedUsers = users.map((user) => 
        user.id === formData.id ? { ...formData } : user
      );
      setUsers(updatedUsers);
    } else {
      // เพิ่มข้อมูลใหม่ โดยสร้าง ID ใหม่อัตโนมัติ
      const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      const newUser = { ...formData, id: newId };
      setUsers([...users, newUser]);
    }
    setFormData({ id: null, name: '', gender: '', phone: '', email: '',user: '',pass: '' }); // รีเซ็ตฟอร์ม
  };

  const handleCancel = () => {
    setFormData({ id: null, name: '', gender: '', phone: '', email: '',user: '',pass: '' }); // รีเซ็ตฟอร์มกลับเป็นค่าตั้งต้น
  }

  // ฟังก์ชันแก้ไขข้อมูล
  const handleEdit = (user) => {
    setFormData(user);
  };

  // ฟังก์ชันลบข้อมูล
  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div className="pages-container">
      <div className="hader-container">
        <span className="hader-text">
          <h1><strong>MANAGE ACCOUNT</strong></h1>
        </span>
        <div className="user-icon">👤</div>
      </div>
      <div className="form-section2">
        {/* ฟอร์มสำหรับเพิ่ม/แก้ไขข้อมูล */}
        <div className="input-group1">
          <label style={{ marginRight: '10px',fontSize:'19px' }}>ชื่อ</label>
          <input style={{borderRadius:'5px',border:'1px solid #ccc',width:'300px',marginLeft:'10px'}}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="กรอกชื่อ"
          />
        </div>
        <div className="input-group2">
          <label  style={{ marginRight: '10px',fontSize:'19px' }}>เพศ</label>
          <input style={{borderRadius:'5px',border:'1px solid #ccc',width:'300px',marginLeft:'35px'}}
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            placeholder="กรอกเพศ"
          />
        </div>
        <div className="input-group3">
          <label  style={{ marginRight: '10px',fontSize:'19px' }}>เบอร์</label>
          <input style={{borderRadius:'5px',border:'1px solid #ccc',width:'300px'}}
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="กรอกเบอร์"
          />
        </div>
        <div className="input-group4">
          <label  style={{ marginRight: '10px',fontSize:'19px' }}>E-mail</label>
          <input style={{borderRadius:'5px',border:'1px solid #ccc',width:'300px',marginLeft:'10px'}}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="กรอกอีเมล"
          />
        </div>
        <div className="input-group4">
          <label  style={{ marginRight: '10px',fontSize:'19px' }}>User</label>
          <input style={{borderRadius:'5px',border:'1px solid #ccc',width:'300px',marginLeft:'-2px'}}
            type="user"
            name="user"
            value={formData.user}
            onChange={handleInputChange}
            placeholder="กรอก user"
          />
        </div>
        <div className="input-group4">
          <label  style={{ marginRight: '10px',fontSize:'19px' }}>Pass</label>
          <input style={{borderRadius:'5px',border:'1px solid #ccc',width:'300px',marginLeft:'23px'}}
            type="pass"
            name="pass"
            value={formData.pass}
            onChange={handleInputChange}
            placeholder="กรอก Pass"
          />
        </div>
<div className='btnAccount'>
        {/* ปุ่ม Cancel */}
        <button className="cancel-button1" onClick={handleCancel}>
          ยกเลิก
        </button>
        
        {/* ปุ่ม Save */}
        <button className="save-button1" onClick={handleSave}>บันทึก</button>
        </div>
      </div>

      <div className="manage-account">
        <h1 style={{ color: '#388e3c' }}><strong>ACCOUNT</strong></h1>
        <div className="permission-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Pass</th>
                <th>ชื่อ</th>
                <th>เพศ</th>
                <th>เบอร์</th>
                
                <th  >แก้ไข</th>
                <th style={{ textAlign: 'center' }}>ลบ</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.user}</td>
                  <td>{user.pass}</td>
                  <td>{user.name}</td>
                  <td>{user.gender}</td>
                  <td>{user.phone}</td> 
                  <td><button className="edit-button" onClick={() => handleEdit(user)}> <i className="bi bi-pencil-square"></i></button></td>
                  <td><button className="delete-button" onClick={() => handleDelete(user.id)}> <i className="bi bi-trash3"></i></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Accountadmin;
