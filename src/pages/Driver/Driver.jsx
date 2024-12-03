import "./Driver.css";
import { drivers } from "../../Data/driver";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Driver() {
  // กรองข้อมูลเฉพาะคนขับจาก users

  const [searchTerm, setSearchTerm] = useState(''); // สถานะเก็บคำค้นหา
  const [filteredDrivers, setFilteredDrivers] = useState(drivers); // สถานะเก็บข้อมูลที่กรอง

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredDrivers(
      drivers.filter(
        (driver) =>
          driver.name.toLowerCase().includes(value) ||
          driver.address.toLowerCase().includes(value) ||
          driver.company.toLowerCase().includes(value) ||
          driver.id.toString().includes(value) // แปลง id เป็น String เพื่อใช้ includes()
      )
    );
  };

  return (
    <div className="pages-container">
      <div className="hader-container">
        <span className="hader-text">
          <h1>
            <strong>DRIVER</strong>
          </h1>
        </span>
        <div className="user-icon">👤</div>
      </div>

      {/* ช่องค้นหาข้อมูล */}
      <div className="search-container">
        <input
          type="text"
          placeholder="ค้นหา..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="manage-driver">
      <h1 style={{color:"#388e3c"}}><strong>MANAGE DRIVER</strong></h1>
      <div className="driver-container">

      <table >
        <thead >
          <tr>
            <th>ลำดับ</th>
            <th>ชื่อคนขับ</th>
            <th>ชื่อร้าน</th>
            <th>รายละเอียดที่อยู่</th>
            <th>Line</th>
            <th>อีเมล</th>
            <th>ตรวจสอบ</th>
          </tr>
        </thead>
        <tbody>
          {filteredDrivers.map((driver, index) => (
            <tr key={driver.id}>
              <td>{index + 1}</td>
              <td>{driver.name}</td>
              <td>{driver.company}</td>
              <td>{driver.address}</td>
              <td>{driver.line}</td>
              <td>{driver.email}</td>
              <td>
                <Link to="/document" state={{ files: driver.files }}>
                  <button className="check-btn">ตรวจสอบ</button>
                </Link>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>     
       </div>
    </div>
  );
}

export default Driver;
