import { useState } from 'react';
import { users as initialUsers } from '../../Data/users'; // นำเข้า data เริ่มต้น
import './Permission.css';

function Permission() {
    const [usersState, setUsersState] = useState(initialUsers);

    // ฟังก์ชันสำหรับเปลี่ยนสถานะ checkbox
    const handleCheckboxChange = (id, field) => {
        setUsersState((prevUsers) =>
            prevUsers.map((user) => {
                if (user.id === id) {
                    return { ...user, [field]: !user[field] }; // เปลี่ยนสถานะของ field ที่เกี่ยวข้อง
                }
                return user;
            })
        );
    };




    return (
        <div className="pages-container">

            <div className="hader-container">
                <span className='hader-text'><h1><strong>PERMISSION</strong></h1>
                </span>
                <div className="user-icon">👤</div>

            </div>

            <div className="manage-review">
                <h1><strong>PERMISSION</strong></h1>

                <div className="permission-container">

                    <table>
                        <thead >
                            <tr>
                                <th >ID</th>
                                <th>ชื่อ</th>
                                <th>สถานะบัญชี</th>
                                <th>Dashboard</th>
                                <th>Admin account</th>
                                <th>Permission</th>
                                <th>Order</th>
                                <th>Driver</th>
                                <th>Managecar</th>
                                <th>Services</th>
                                <th>Review</th>
                                <th>Banner</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {usersState.map((user) => (
                                <tr key={user.id}>
                                    <td style={{fontSize: '16px',  }} className='tdp'>{user.id}</td>
                                    <td style={{fontSize: '16px',  }} className='tdp'>{user.name}</td>
                                    <td style={{fontSize: '16px',  }} className='tdp'>{user.roles}</td>

                                    <td className='tdp1'>
                                        <input 
                                            type= "checkbox"
                                            checked={user.dashboardPermission}
                                            onChange={() => handleCheckboxChange(user.id, 'dashboardPermission')}
                                        />
                                    </td>
                                    <td className='tdp1'>
                                        <input
                                            type="checkbox"
                                            checked={user.accountadminPermission}
                                            onChange={() => handleCheckboxChange(user.id, 'accountadminPermission')}
                                        />
                                    </td>
                                    <td className='tdp1'>
                                        <input
                                            type="checkbox"
                                            checked={user.permission}
                                            onChange={() => handleCheckboxChange(user.id, 'permission')}
                                        />
                                    </td>
                                 
                                    <td className='tdp1'>
                                        <input
                                            type="checkbox"
                                            checked={user.checkPermission}
                                            onChange={() => handleCheckboxChange(user.id, 'checkPermission')}
                                        />
                                    </td>

                                    <td className='tdp1'>
                                        <input
                                            type="checkbox"
                                            checked={user.driverPermission}
                                            onChange={() => handleCheckboxChange(user.id, 'driverPermission')}
                                        />
                                    </td>
                                    <td className='tdp1'>
                                        <input
                                            type="checkbox"
                                            checked={user.managePermission}
                                            onChange={() => handleCheckboxChange(user.id, 'managePermission')}
                                        />
                                    </td>
                                    <td className='tdp1'>
                                        <input
                                            type="checkbox"
                                            checked={user.servicePermission}
                                            onChange={() => handleCheckboxChange(user.id, 'servicePermission')}
                                        />
                                    </td>


                                    <td className='tdp1'>
                                        <input
                                            type="checkbox"
                                            checked={user.reviewPermission}
                                            onChange={() => handleCheckboxChange(user.id, 'reviewPermission')}
                                        />
                                    </td>
                                    <td className='tdp1'>
                                        <input
                                            type="checkbox"
                                            checked={user.bannerPermission}
                                            onChange={() => handleCheckboxChange(user.id, 'bannerPermission')}
                                        />
                                    </td>
                                 
                                </tr>

                            ))}
                        </tbody>
                    </table>

                </div>

                <button className="btnP" onClick={() => console.log(usersState)}>บันทึก</button>
            </div>

        </div>
    );
}

export default Permission;
