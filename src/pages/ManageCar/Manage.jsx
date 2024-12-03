import React, { useState, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { fetchCars } from "../../Data/car";
import "./manage.css";

function Manage() {
  const [vehicles, setVehicles] = useState([]); // เก็บข้อมูลรถ
  const [newVehicle, setNewVehicle] = useState({
    name: "",
    image: null,
    description: "",
    status: false,
  });

  const [imagePreview, setImagePreview] = useState(null); // ตัวอย่างรูปภาพ
  const [showEditModal, setShowEditModal] = useState(false); // ควบคุมการแสดง Modal
  const [vehicleToEdit, setVehicleToEdit] = useState(null); // เก็บข้อมูลรถที่ต้องการแก้ไข
  const [searchInput, setSearchInput] = useState("");

  // โหลดข้อมูลรถจาก fetchCars
  useEffect(() => {
    fetchCars().then((data) => {
      setVehicles(data);
    });
  }, []);

  // ฟังก์ชันจัดการการลบข้อมูล
  const handleDelete = (id) => {
    const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== id);
    setVehicles(updatedVehicles);
  };

  // ฟังก์ชันจัดการการเปลี่ยนค่าในฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  // ฟังก์ชันจัดการอัพโหลดรูปภาพ
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file); // สร้าง URL ชั่วคราว
      setNewVehicle({ ...newVehicle, image: imageURL }); // เก็บ URL ใน newVehicle
      setImagePreview(imageURL); // อัปเดตตัวอย่างรูปภาพ
    }
  };

  // ฟังก์ชันเพิ่มรถใหม่
  const handleAddVehicle = () => {
    if (!newVehicle.name || !newVehicle.image) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const newId = vehicles.length ? vehicles[vehicles.length - 1].id + 1 : 1;
    const vehicleToAdd = {
      id: newId,
      ...newVehicle,
    };

    setVehicles([...vehicles, vehicleToAdd]);

    // รีเซ็ตฟอร์ม
    setNewVehicle({ name: "", image: null, status: false });
    setImagePreview(null);
  };

  // ฟังก์ชันจัดการ Modal การแก้ไข
  const handleEditClick = (vehicle) => {
    setVehicleToEdit(vehicle);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setVehicleToEdit({ ...vehicleToEdit, [name]: value });
  };

  const handleEditSave = () => {
    if (!vehicleToEdit.name || !vehicleToEdit.image) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setVehicles((prevVehicles) =>
      prevVehicles.map((v) => (v.id === vehicleToEdit.id ? vehicleToEdit : v))
    );

    setShowEditModal(false);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="pages-container">
       <div className="hader-container">           
               <span className='hader-text'><h1><strong>MANAGE CAR</strong></h1>
               </span> 
               <div className="user-icon">👤</div> 
                
             </div>
      {/* ฟอร์มเพิ่มประเภท */}
      <div className="add-slide-form">
        <h3 className="form-title">เพิ่ม ประเภทสไลด์</h3>
        <label className="form-label">ชื่อประเภท</label>
        <div className="form-input">
         
          <input
            type="text"
            name="name"
            value={newVehicle.name}
            placeholder="กรอกชื่อประเภทรถ"
            onChange={handleChange}
            style={{
                height: "60px",
                width: "485px",
                marginLeft: "22rem",
                marginRight: "10px",
                borderRadius: "20px",
                
              }}
          />
        </div>

        <div className="form-group">
          {/* ช่องเพิ่มรูปภาพ */}
          <div className="form-group image-upload-container">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{
                opacity: 0,
                width: "100%",
                height: "100%",
                position: "absolute",
                cursor: "pointer",
              }}
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Uploaded"
                style={{
                  width: "300px",
                  height: "170px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            ) : (
              <div style={{ textAlign: "center", color: "#888" }}>
                <FaPlus size={40} />
                <p>Add Image</p>
              </div>
            )}
          </div>

          {/* ช่องกรอกรายละเอียด */}
          <textarea
            placeholder="รายละเอียด"
            style={{
              height: "100px",
              width: "500px",
              marginLeft: "50px",
              marginRight: "10px",
              marginBottom: "50px",
            }}
          ></textarea>
        </div>

            

        <div className="form-footer">
          <div className="form-group">
            <label>สถานะ</label>
            <Form.Check
              type="switch"
              name="status"
              checked={newVehicle.status}
              onChange={() =>
                setNewVehicle({ ...newVehicle, status: !newVehicle.status })
              }
            />
          </div>
          <button className="save-button" onClick={handleAddVehicle}>
            บันทึก
          </button>
        </div>
      </div>

      <div className="total-car-box">
    <h1>{filteredVehicles.length}</h1>
    <p>Total Car</p>
    {/* <img
      src="/Bg2.png"
      alt="Car Icon"
      className="icon-image"
    /> */}
  </div>

      {/* ตารางข้อมูล */}
      <div className="vehicle-table">
        <div className="search-bar1">
          <input type="text" placeholder="ค้นหา" className="search-input1" value={searchInput} onChange={handleSearchChange} />
        </div>

        <div className="table-header">
          <div>ลำดับ&nbsp;<i className="bi bi-arrow-down-up"></i></div>
          <div>ชื่อ&nbsp; <i className="bi bi-arrow-down-up"></i></div>
          <div>รูปภาพ&nbsp;<i className="bi bi-arrow-down-up"></i></div>
          <div>สถานะ&nbsp; <i className="bi bi-arrow-down-up"></i></div>
          <div>แก้ไข&nbsp; <i className="bi bi-arrow-down-up"></i></div>
          <div>ลบ&nbsp;<i className="bi bi-arrow-down-up"></i></div>
        </div>

        <div className="table-body">
          {filteredVehicles.map((vehicle, index) => (
            <div className="table-row" key={vehicle.id}>
              <div>{index + 1}</div>
              <div>{vehicle.name}</div>
              
              <div>
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="vehicle-image"
                />
              </div>
              <div>
                <Form.Check
                  type="switch"
                  checked={vehicle.status}
                  onChange={() => {
                    const updatedVehicles = vehicles.map((v) =>
                      v.id === vehicle.id
                        ? { ...v, status: !v.status }
                        : v
                    );
                    setVehicles(updatedVehicles);
                  }}
                />
              </div>
              <div>
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(vehicle)}
                >
                <i className="bi bi-pencil-square"></i>
                </button>
              </div>
              <div>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(vehicle.id)}
                >
                <i className="bi bi-trash3"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal แก้ไข */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขข้อมูล</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>ชื่อประเภท</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={vehicleToEdit?.name || ""}
                onChange={handleEditChange}
              />
            </Form.Group>

      

            <Form.Group className="mt-3">
              <Form.Label>รูปภาพ</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const imageURL = URL.createObjectURL(file);
                    setVehicleToEdit({
                      ...vehicleToEdit,
                      image: imageURL,
                    });
                  }
                }}
              />
              {vehicleToEdit?.image && (
                <img
                  src={vehicleToEdit.image}
                  alt="Preview"
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              )}
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>สถานะ</Form.Label>
              <Form.Check
                type="switch"
                name="status"
                checked={vehicleToEdit?.status || false}
                onChange={() =>
                  setVehicleToEdit({
                    ...vehicleToEdit,
                    status: !vehicleToEdit.status,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Manage;
