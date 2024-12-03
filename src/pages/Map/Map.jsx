import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { orders } from '../../Data/order'; // นำเข้าข้อมูล Order
import './Map.css';

function Map() {
  const { id } = useParams();
  const order = orders.find(order => order.id === parseInt(id));

  // ฟังก์ชันคำนวณระยะทางจากพิกัด
  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // รัศมีโลกในกิโลเมตร
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // ระยะทางในกิโลเมตร

    return distance; // คืนค่าระยะทางเป็นกิโลเมตร
  }

  if (!order) {
    return (
      <div className="pages-container">
        <div className="hader-container">
          <span className="hader-text"><h1><strong>MAP</strong></h1></span>
          <div className="user-icon">👤</div>
        </div>
        <div className="error-message">
          <h2>ไม่พบข้อมูลการสั่งซื้อที่คุณเลือก</h2>
          <Link to="/checkorder">
            <button className="ex-btn">กลับไปหน้าการสั่งซื้อ</button>
          </Link>
        </div>
      </div>
    );
  }

  // คำนวณระยะทางระหว่างจุดเริ่มต้นและจุดปลายทาง
  const startLat = order.location.start.latitude;
  const startLon = order.location.start.longitude;
  const endLat = order.location.end.latitude;
  const endLon = order.location.end.longitude;
  const distance = getDistance(startLat, startLon, endLat, endLon);

  return (
    <div className="pages-container">
      <div className="hader-container">
        <span className="hader-text"><h1><strong>MAP</strong></h1></span>
        <div className="user-icon">👤</div>
      </div>

      <div className="dashboard-box">
        <div className="dashboard-map">
          <iframe
            src={`https://www.google.com/maps?q=${startLat},${startLon}&output=embed`}
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Interactive Map"
          ></iframe>
        </div>
        <div className="dashboard-details-header">
          <h5><strong>รายงานการขนส่ง</strong></h5>
        </div>
        <div className="dashboard-details">
          <span className='details-text'>
            <p><strong>วันที่:</strong> {order.date}</p>
            <p><strong>ลูกค้า:</strong> {order.customerName}</p>
            <p><strong>จุดเริ่มต้น - ปลายทาง:</strong> {order.startEnd}</p>
            <p><strong>สถานะ:</strong> {order.status}</p>
           
            <p>
              <strong>ระยะทาง :</strong> {distance.toFixed(2)} กม.  {/* แสดงระยะทางที่คำนวณ */}
            </p>
            <p>
              <strong>เวลาที่ใช้ในการขนส่ง :</strong> ประมาณ {order.estimatedTime} นาที
            </p>
           
          </span>
        </div>
        <div className="action1-buttons">
         
          <Link to="/checkorder">
            <button className="ex-btn">ออก</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Map;
