import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Checkorder.css';
import { orders as initialOrders } from '../../Data/order';

function Checkorder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState(initialOrders);  // ใช้ state สำหรับ orders
  const [filteredOrders, setFilteredOrders] = useState(orders);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredOrders(
      orders.filter(
        (order) =>
          order.customerName.toLowerCase().includes(value) ||
          order.phone.includes(value) ||
          order.serviceType.toLowerCase().includes(value) ||
          order.status.toLowerCase().includes(value)
      )
    );
  };

  // ฟังก์ชันลบออเดอร์
  const cancelOrder = (id) => {
    const updatedOrders = orders.filter(order => order.id !== id);
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);  // อัปเดต filteredOrders ด้วย
  };

  return (
    <div className="pages-container">
      <div className="hader-container">
        <span className="hader-text">
          <h1>
            <strong>ORDERS</strong>
          </h1>
        </span>
        <div className="user-icon">👤</div>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="ค้นหา..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="manage-order">
                <h1 style={{color: '#388e3c'}}><strong>ORDERS</strong></h1>

                <div className="order-container">
      <table >
        <thead >
          <tr>
            <th>ลำดับ</th>
            <th>วันที่ใช้บริการ</th>
            <th>เบอร์โทร</th>
            <th>ชื่อลูกค้า</th>
            <th>ประเภทการเรียก</th>
            <th>จุดเริ่มต้น - จุดปลายทาง</th>
            <th>ค่าบริการ</th>
            <th>การชำระเงิน</th>
            <th>สถานะ</th>
            <th>รายละเอียด</th>
          </tr>
        </thead>

        <tbody className="order-table">
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.phone}</td>
              <td>{order.customerName}</td>
              <td>{order.serviceType}</td>
              <td>{order.startEnd}</td>
              <td>{order.price}</td>
              <td>{order.paymentMethod}</td>
              <td>
                <span
                  className={order.status === 'เสร็จสิ้นแล้ว' ? 'status-completed' : 'status-progress'}
                >
                  {order.status}
                </span>
              </td>
              <td>
                <Link to={`/map/${order.id}`} >
                  <button className="details-button">ตรวจสอบ</button>
                </Link>
                {/* ปุ่มสำหรับยกเลิกคำสั่งซื้อ */}
                <button onClick={() => cancelOrder(order.id)} className="cancel-btn">ยกเลิก</button>
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

export default Checkorder;
