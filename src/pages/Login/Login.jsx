import { useRef } from 'react';
import { verifyUser } from '../../Data/users';
import Form from 'react-bootstrap/Form';
import './Login.css';

function Login({ setToken, setRole, setUser }) {
    const userRef = useRef();
    const passRef = useRef();

    const handleLogin = (e) => {
        e.preventDefault(); // ป้องกันการรีเฟรชหน้าเมื่อกดปุ่ม

        const user = userRef.current.value.trim();
        const pass = passRef.current.value.trim();

        if (!user || !pass) {
            alert('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
            return; // ถ้าไม่มีข้อมูลให้หยุดการล็อกอิน
        }

        const userInfo = verifyUser(user, pass);
        userRef.current.value = ''; // ล้างค่า input หลังการตรวจสอบ
        passRef.current.value = '';

        if (userInfo === null) {
            alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
            userRef.current.focus();
        } else {
            // เก็บ token และ role ใน localStorage
            localStorage.setItem('token', userInfo.token);
            localStorage.setItem('role', userInfo.role);
            localStorage.setItem('loggedInUser', JSON.stringify(userInfo)); // บันทึกข้อมูลผู้ใช้ที่ล็อกอิน

            // ตั้งค่า token และ role
            setToken(userInfo.token);
            setRole(userInfo.role);
            setUser(userInfo); // ส่งข้อมูลผู้ใช้ไปที่ Home
        }
    };

    return (
        <div className="Bglogin-container">
            <div className='login-container'>
                <Form.Label htmlFor="username"> 
                    <span className='text-login'> 
                        <i className="bi bi-person-fill"></i> LOGIN
                    </span>
                </Form.Label>

                <div className='input-container'>
                    <Form.Control
                        type="text"
                        id="username"
                        placeholder='user'
                        style={{ textAlign: 'left' }}
                        ref={userRef}
                    />
                </div>

                <Form.Label htmlFor="password"></Form.Label>
                <Form.Control
                    type="password"
                    id="password"
                    placeholder='password'
                    style={{ textAlign: 'left' }}
                    ref={passRef}
                />

                <div className='btnLogin'>
                    <button
                        className='btn btn-success mt-3'
                        onClick={handleLogin} // ใช้ฟังก์ชัน handleLogin
                    >
                        Login&nbsp;<i className="bi bi-box-arrow-in-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
