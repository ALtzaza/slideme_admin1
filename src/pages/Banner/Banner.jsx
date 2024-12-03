import React, { useState } from 'react';
import { Form, Button, ButtonGroup, Container, Table, Image, InputGroup } from 'react-bootstrap';
import './Banner.css';

const Banner = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const [isActive, setIsActive] = useState(false);
  const [banners, setBanners] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleSave = () => {
    if (isEditing) {
      setBanners(
        banners.map((banner) =>
          banner.id === editingId
            ? { ...banner, title, description, file, isActive }
            : banner
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newBanner = {
        id: banners.length + 1,
        title,
        description,
        file,
        isActive,
      };
      setBanners([...banners, newBanner]);
    }
    setTitle('');
    setDescription('');
    setFile(null);
    setIsActive(false);
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setFile(null);
    setIsActive(false);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (id) => {
    const banner = banners.find((b) => b.id === id);
    setTitle(banner.title);
    setDescription(banner.description);
    setFile(banner.file);
    setIsActive(banner.isActive);
    setIsEditing(true);
    setEditingId(id);
  };

  const handleToggleStatus = (id) => {
    setBanners(
      banners.map((banner) =>
        banner.id === id ? { ...banner, isActive: !banner.isActive } : banner
      )
    );
  };

  // Filter banners based on search query
  const filteredBanners = banners.filter(banner => 
    banner.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    banner.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pages-container">
            <div className="hader-container">
                <span className='hader-text'><h1><strong>BANNER</strong></h1></span>
                <div className="user-icon">👤</div>
            </div>
      <div className="banner-container">
        <Container className="p-4 border rounded banner-form">
          <h2 className="text-center">Banner</h2>
          <Form>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>หัวข้อ</Form.Label>
              <Form.Control
                type="text"
                placeholder="กรอกหัวข้อ"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>รายละเอียด</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="กรอกรายละเอียด"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>เลือกไฟล์</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <ButtonGroup>
                <Button variant="success" size="sm" onClick={handleSave}>
                  {isEditing ? "อัปเดต" : "บันทึก"}
                </Button>
                <Button variant="secondary" size="sm" onClick={handleCancel}>
                  ยกเลิก
                </Button>
              </ButtonGroup>
            </div>
          </Form>
        </Container>

        <Container className="p-4 mt-4 border rounded banner-table">
          <h3 className="text-center">ข้อมูล Banner</h3>
          {/* Search input field with icon */}
          <Form.Group controlId="formSearch" className="mb-3 banner-search-container">
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-search"></i> {/* Add the search icon here */}
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search Banner"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Table bordered hover>
            <thead>
              <tr>
                <th>ลำดับ&nbsp;<i className="bi bi-arrow-down-up"></i></th>
                <th>หัวข้อ&nbsp;<i className="bi bi-arrow-down-up"></i></th>
                <th>รายละเอียด&nbsp;<i className="bi bi-arrow-down-up"></i></th>
                <th>รูปภาพ&nbsp;<i className="bi bi-arrow-down-up"></i></th>
                <th>สถานะ&nbsp;<i className="bi bi-arrow-down-up"></i></th>
                <th>แก้ไข&nbsp;<i className="bi bi-arrow-down-up"></i></th>
                <th>ลบ&nbsp;<i className="bi bi-arrow-down-up"></i></th>
              </tr>
            </thead>
            <tbody>
              {filteredBanners.map((banner, index) => (
                <tr key={banner.id}>
                  <td>{index + 1}</td>
                  <td>{banner.title}</td>
                  <td>{banner.description}</td>
                  <td>
                    {banner.file ? (
                      <Image src={banner.file} alt="banner" thumbnail width="50" height="50" />
                    ) : (
                      'ไม่มีรูปภาพ'
                    )}
                  </td>
                  <td>
                    <Form.Check 
                      type="switch"
                      checked={banner.isActive}
                      onChange={() => handleToggleStatus(banner.id)}
                    />
                  </td>
                  <td>
                    <Button variant="warning" size="sm" onClick={() => handleEdit(banner.id)}>
                      <i className="bi bi-clipboard-check"></i> แก้ไข
                    </Button>
                  </td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => setBanners(banners.filter(b => b.id !== banner.id))}>
                      <i className="bi bi-trash3"></i> ลบ
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <div className='copy-banner'>
  <h1>จำลองแสดงรูปBanner</h1>
  {banners.filter(banner => banner.isActive).length > 0 ? (
    banners.filter(banner => banner.isActive).map((banner) => (
      <div key={banner.id} className="active-banner">
        {banner.file ? (
          <Image src={banner.file} alt="active banner" thumbnail width="150" height="150" />
        ) : (
          <p>ไม่มีรูปภาพ</p>
        )}
      </div>
    ))
  ) : (
    <span className='no-banner'><p>ไม่มีแบนเนอร์ที่เปิดใช้งาน</p></span>
  )}
  <div className='line'></div>
</div>

      </div>
    </div>
  );
};

export default Banner;
