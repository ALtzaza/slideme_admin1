import React, { useState } from 'react';
import './Services.css';

function Services() {
    const [isEditable, setIsEditable] = useState([false, false]);
    const [prices, setPrices] = useState([1500, 500]);

    const toggleEdit = (index) => {
        setIsEditable((prev) => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const handlePriceChange = (index, event) => {
        const newPrices = [...prices];
        newPrices[index] = event.target.value;
        setPrices(newPrices);
    };

    const handleSave = () => {
        alert("บันทึกสำเร็จ: " + prices.join(", "));
        setIsEditable([false, false]); // ปิดโหมดแก้ไขหลังบันทึก
    };

    return (
        <div className="pages-container">
            <div className="hader-container">
                <span className='hader-text'><h1><strong>SERVICE</strong></h1></span>
                <div className="user-icon">👤</div>
            </div>
            <h1 style={{ paddingBottom: '10px', fontWeight: 'bold', marginBottom: '50px', marginTop: '50px'}}>กำหนดค่าบริการ</h1>
            <table className="services-table">
                <thead>
                    <tr>
                        <th>ลำดับ</th>
                        <th>ราคา</th>
                        <th>แก้ไข/บันทึก</th>
                    </tr>
                </thead>
                <tbody>
                    {prices.map((price, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <div className="price-container">
                                    <label className="service-label">{index === 0 ? 'อัตราเริ่มต้น' : 'ค่าบริการยกเลิก'}</label>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => handlePriceChange(index, e)}
                                        readOnly={!isEditable[index]}
                                        className="price-input"
                                    />
                                </div>
                            </td>
                            <td>
                                <button
                                    className="edit-button"
                                    onClick={() => toggleEdit(index)}
                                >
                                    {isEditable[index] ? <i className='bi bi-check-circle'></i> : <i className='bi bi-pencil-square'></i>}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="action1-buttons1">
                <button  className="save1-button1" onClick={handleSave}>บันทึก</button>
                <button className="cancel1-button1" onClick={() => setIsEditable([false, false])}>ยกเลิก</button>
            </div>
        </div>
    );
}

export default Services;
