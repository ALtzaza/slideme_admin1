import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { fetchCars } from '../../Data/car'; 
import { users } from '../../Data/users';
import { orders } from '../../Data/order';
import './Dashboard.css';
import { drivers } from '../../Data/driver';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
function Dashboard() {
    const [carCount, setCarCount] = useState(0);

    useEffect(() => {
        fetchCars().then((cars) => {
            setCarCount(cars.length); 
        });
    }, []);
    const TypeCount=orders.filter(order => order. serviceType === 'เรียกล่วงหน้า').length
    const Type1Count=orders.filter(order => order. serviceType === 'เรียกทันที').length
    const adminCount = users.filter(user => user.role === 'admin').length;
    const orderCount=orders.filter(order => order. status === 'กำลังดำเนินการ').length+orders.filter(order => order. status === 'เสร็จสิ้นแล้ว').length
    const driverCount = drivers.filter( driver=> driver.role === 'driver' ).length;
   
    // ข้อมูลกราฟ Chart.js
    const chartData = {
        labels: ['เรียกล่วงหน้า', 'เรียกทันที'], // ชื่อแกน X
        datasets: [
            {
                label: 'จำนวนการเรียกใช้งาน', // ชื่อกราฟ
                data: [TypeCount, Type1Count], // ค่าของแต่ละแท่งกราฟ
                backgroundColor: ['rgba(75, 75, 75, 0.8)', 'rgba(50, 200, 50, 0.8)'], // สีพื้นหลัง
                borderColor: ['rgba(75, 75, 75, 1)', 'rgba(50, 200, 50, 1)'], // สีขอบ
                borderWidth: 1, // ความหนาขอบ
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // ซ่อน Legend
            },
            title: {
                display: true,
                text: 'อันดับประเภทการเรียกใช้งาน', // ชื่อกราฟ
                align: 'start', // จัดข้อความทางซ้ายมือ
                padding: {
                    top: 10,
                    bottom: 20,
                },
                font: {
                    size: 16,
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    // ข้อมูลส่วนข่าวสาร
    const providers = [
        { name: 'ประสิทธิ์ เกียรติกุล', calls: 6, rating: 5 },
        { name: 'วีระชัย รัตนชาติ', calls: 4, rating: 4 },
        { name: 'วุฒิพงษ์ บุญเพ็ง', calls: 3, rating: 3 },
        { name: 'สมชาย พูนทรัพย์', calls: 2, rating: 3 },
        { name: 'นันทกร บุญศรี', calls: 2, rating: 2 },
        { name: 'กนกพร ไชยเค้า', calls: 2, rating: 1 },
    ];

    const renderStars = (rating) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <span key={index} style={{ color: index < rating ? '#FFD700' : '#e0e0e0' }}>
                ★
            </span>
        ));
    };

    return (
        <div className="pages-container">
            <div className="hader-container">           
               <span className='hader-text'><h1><strong>DASHBOARD</strong></h1>
               </span> 
               <div className="user-icon">👤</div> 
                
             </div>
            <main className="main-content">
               
              

                {/* ส่วนข้อมูลสถิติ */}
                <section className="stats">
                    <div className="info-box1">
                        <br />
                        <h1>
                        <strong>{adminCount}</strong>
                        </h1>
                        <br />
                        <br />
                        <p>จำนวนแอดมิน</p>
                        <img src="service.png" alt="service" className="service" />
                    </div>
                    <div className="info-box2">
                        <br />
                        <h1>
                            <strong>{orderCount}</strong>
                        </h1>
                        <br />
                        <br />
                        <p>จำนวน Order</p>
                        <img src="order.png" alt="order" className="order" />
                    </div>
                    <div className="info-box3">
                        <br />
                        <h1>
                            <strong>{carCount}</strong>
                        </h1>
                        <br />
                        <br />
                        <p>จำนวนรถ</p>
                        <img src="car.png" alt="car" className="car" />
                    </div>
                    <div className="info-box4">
                        <br />
                        <h1>
                            <strong>{driverCount}</strong>
                        </h1>
                        <br />
                        <br />
                        <p>จำนวนคนขับ</p>
                        <img src="user.png" alt="user" className="user" />
                    </div>
                </section>

                {/* ส่วนกราฟ */}
                <section className="chart-section">
                    {/* กราฟ Chart.js */}
                    <div className="chart">
                        <Bar data={chartData} options={chartOptions} />
                    </div>

                    {/* ส่วนข่าวสาร */}
                    <div className="news-feed">
                        <strong> ♥ 20 อันดับ ผู้ให้บริการที่ถูกเรียกใช้บริการมากที่สุด</strong>
                        <p></p>
                        {providers.map((provider, index) => (
                            <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                <p style={{ marginRight: '10px', fontWeight: 'bold' }}>
                                    {provider.name} จำนวนการเรียก {provider.calls} ครั้ง
                                </p>
                                <div style={{ margintop: '50px', marginLeft: '30px', fontSize: '20px', color: '#FFD700' }}>
                                    {renderStars(provider.rating)}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
