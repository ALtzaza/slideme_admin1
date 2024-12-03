import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { users } from '../../Data/users';

function Navbar({ token, setToken }) {
    const [activeButton, setActiveButton] = useState(null); // ใช้ state ติดตามปุ่มที่ถูกกด
    

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName); // ตั้งค่าปุ่มที่ถูกเลือก
    };
    const [setTab] = useState('home');
    const [hasPermission, setHasPermission] = useState(false); // ตั้งค่าเริ่มต้นให้ไม่มีสิทธิ์
    const[hasPermission2, setHasPermission2] = useState(false);
   
    const[hasPermission4, setHasPermission4] = useState(false);
    const[hasPermission5, setHasPermission5] = useState(false);
    const[hasPermission6, setHasPermission6] = useState(false);
    const[hasPermission7, setHasPermission7] = useState(false);
    const[hasPermission8, setHasPermission8] = useState(false);
    const[hasPermission9, setHasPermission9] = useState(false);
    const[hasPermission10, setHasPermission10] = useState(false);

    const homeRef = useRef();
    const dashboardRef = useRef();
    const permissionRef = useRef();
    
    const checkorderRef = useRef();
    const driverRef = useRef()
    const manageRef = useRef()
    const servicesRef = useRef()
    const reviewRef = useRef()    
    const bannerRef = useRef()
    const accountadminRef = useRef()
  

    useEffect(() => {
        console.log("Token in Navbar:", token);  // ตรวจสอบค่า token ที่ได้รับใน Navbar

        const user = users.find((u) => u.token === token);
        if (user) {
            setHasPermission(user.dashboardPermission);
            setHasPermission2(user.permission);
           
            setHasPermission4(user.checkPermission);
            setHasPermission5(user.driverPermission);
            setHasPermission6(user.managePermission);
            setHasPermission7(user.servicePermission);
            setHasPermission8(user.reviewPermission);
            setHasPermission9(user.bannerPermission);
            setHasPermission10(user.accountadminPermission);
            
            console.log("User found:", user);  // ตรวจสอบข้อมูลของผู้ใช้ที่พบ
            
        } else {
            setHasPermission(false);
            setHasPermission2(false);
            
            setHasPermission4(false); 
            setHasPermission5(false);
            setHasPermission6(false);
            setHasPermission7(false);
            setHasPermission8(false);
            setHasPermission9(false);
            setHasPermission10(false);
           
            console.log("User not found");
        }
    }, [token]); // useEffect นี้จะทำงานเมื่อ token เปลี่ยนแปลง

    return (
        <div className="navbar-container">
            <img src="Logo.png" alt="logo" className="logoN" />
            <Link to="/home">
                <button
                    className={`btnN ${activeButton === 'button1' ? 'active' : ''}`}
                    onClick={() =>{
                        handleButtonClick('button1'); 
                         setTab('home');
                    }}
                    ref={homeRef}
                >
                    <i className="bi bi-house-gear-fill"></i>&nbsp; Profile
                </button>
            </Link>

            {hasPermission && (
                <Link to="/dashboard">
                    <button
                        className={`btnN ${activeButton === 'button2' ? 'active' : ''}`}
                        onClick={() =>{
                            handleButtonClick('button2'); 
                             setTab('dashboard');
                        }}
                        ref={dashboardRef}
                    >
                        <i className="bi bi-graph-up-arrow"></i>&nbsp; Dashboard
                    </button>
                </Link>
            )}
                          {hasPermission10 && (
        <Link to="/accountadmin">
            <button
               className={`btnN ${activeButton === 'button11' ? 'active' : ''}`}    
               onClick={() =>{
                handleButtonClick('button11'); 
                 setTab('accountadmin');
            }}
                ref={accountadminRef}    
               ><i class="bi bi-person-gear"></i>&nbsp;
                Manage Account
                </button> 

        </Link>
        
        )}  
 {hasPermission2 && (
            <Link to="/permission">
                <button
                   className={`btnN ${activeButton === 'button3' ? 'active' : ''}`}
                   onClick={() =>{
                    handleButtonClick('button3'); 
                     setTab('permission');
                }}
                    ref={permissionRef}
                >
                    <i className="bi bi-person-lines-fill"></i>&nbsp; Permission
                </button>
            </Link>
        )}
       
          {hasPermission4 && (
        <Link to="/checkorder">
            <button
               className={`btnN ${activeButton === 'button5' ? 'active' : ''}`}    
               onClick={() =>{
                handleButtonClick('button5'); 
                 setTab('checkorder');
            }}
                ref={checkorderRef}
               ><i class="bi bi-basket2"></i>&nbsp;
                Orders
                </button> 

        </Link>
        
        )}
         {hasPermission5 && (
        <Link to="/driver">
            <button
               className={`btnN ${activeButton === 'button6' ? 'active' : ''}`}    
               onClick={() =>{
                handleButtonClick('button6'); 
                 setTab('driver');
            }}
                ref={driverRef}
               ><i class="bi bi-person-hearts"></i>&nbsp;
                drivers
                </button> 

        </Link>
        
        )}
         {hasPermission6 && (
        <Link to="/manage">
            <button
               className={`btnN ${activeButton === 'button7' ? 'active' : ''}`}    
               onClick={() =>{
                handleButtonClick('button7'); 
                 setTab('manage');
            }}
                ref={manageRef}
               ><i class="bi bi-car-front"></i>&nbsp;
                ManageCar
                </button> 

        </Link>
        
        )}
         {hasPermission7 && (
        <Link to="/services">
            <button
               className={`btnN ${activeButton === 'button8' ? 'active' : ''}`}    
               onClick={() =>{
                handleButtonClick('button8'); 
                 setTab('services');
            }}
                ref={servicesRef}    
               ><i class="bi bi-database-fill-gear"></i>&nbsp;
                Services
                </button> 

        </Link>
        
        )}      
             {hasPermission8 && (
        <Link to="/review">
            <button
               className={`btnN ${activeButton === 'button9' ? 'active' : ''}`}    
               onClick={() =>{
                handleButtonClick('button9'); 
                 setTab('review');
            }}
                ref={reviewRef}    
               ><i className="bi bi-chat-right-dots"></i>&nbsp;
                Check Reviwe
                </button> 

        </Link>
        
        )}  
               {hasPermission9 && (
        <Link to="/banner">
            <button
               className={`btnN ${activeButton === 'button10' ? 'active' : ''}`}    
               onClick={() =>{
                handleButtonClick('button10'); 
                 setTab('banner');
            }}
                ref={reviewRef}    
               > <i className="bi bi-badge-ad"></i>&nbsp;
                Manage Banner
                </button> 

        </Link>
        
        )}  
     
          
        
              
            <button className="btnL"
                onClick={()=>{setToken('')}}>
                Logout</button>
        </div>
    );
}

export default Navbar;
