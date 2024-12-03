import React, { useState } from 'react';
import './Review.css';

const Review = () => {
  const [searchTerm, setSearchTerm] = useState(''); // จัดการสถานะคำค้นหา
  const [currentPage, setCurrentPage] = useState(1); // แบ่งหน้า
  const [sortOption, setSortOption] = useState('default'); // การจัดเรียงลำดับ
  const itemsPerPage = 5; // จำนวนรายการต่อหน้า

  const reviews = [
    { id: 1, user: 'User1', comment: 'บริการดี พูดเพราะ หล่อค่ะ', reviewer: 'นายนพรัตน์ สวัสดิ์เอื้อ', rating: 5 },
    { id: 2, user: 'User2', comment: 'บริการแย่มาก ขับรถหวาดเสียว', reviewer: 'นายอชิรยุ นวลสกุลวัฒน', rating: 1 },
    { id: 3, user: 'User3', comment: 'บริการดีมากค่ะ', reviewer: 'นายกอง จงกิจ', rating: 5 },
    { id: 4, user: 'User4', comment: 'บริการดีมากค่ะ', reviewer: 'นายถนัด เจดี', rating: 5 },
    { id: 5, user: 'User5', comment: 'บริการดีมากค่ะ', reviewer: 'นายปลา ตากลม', rating: 5 },
    { id: 6, user: 'User6', comment: 'บริการค่อนข้างดี แต่มีเวลารอ', reviewer: 'นายจงดี ศรี', rating: 4 },
    { id: 7, user: 'User7', comment: 'บริการช้าไปมาก', reviewer: 'นายเก่ง มาก', rating: 1 },
    { id: 8, user: 'User8', comment: 'บริการดีมากค่ะ', reviewer: 'นายเก่ง นิดหน่อย', rating: 5 },
    { id: 9, user: 'User9', comment: 'บริการดีมากค่ะ', reviewer: 'นายเก่ง น้อย', rating: 5 },
    { id: 10, user: 'User10', comment: 'บริการดีมากค่ะ', reviewer: 'นายทรง เอ', rating: 5 },
  ];

  // ฟิลเตอร์ข้อมูลตามคำค้นหา
  const filteredReviews = reviews.filter(
    (review) =>
      review.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.reviewer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // จัดเรียงข้อมูล
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortOption === 'rating-high-to-low') return b.rating - a.rating;
    if (sortOption === 'rating-low-to-high') return a.rating - b.rating;
    return 0; // ไม่เรียง
  });

  // แบ่งข้อมูลตามหน้า
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedReviews.slice(indexOfFirstItem, indexOfLastItem);

  // จำนวนหน้าทั้งหมด
  const totalPages = Math.ceil(sortedReviews.length / itemsPerPage);

  return (
    <div className="pages-container">
             
    <div className="hader-container">           
      <span className='hader-text'><h1><strong>CHACK REVIEW</strong></h1>
      </span> 
      <div className="user-icon">👤</div> 
       
    </div>

      <div className="manage-review">
      <h1><strong>CHACK REVIEW</strong></h1>

        {/* ค้นหา */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="ค้นหาคนขับหรือความคิดเห็น..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* ตัวเลือกการเรียงลำดับ */}
        <div className="sort-options">
          <select className='select' onChange={(e) => setSortOption(e.target.value)}>
            <option value="default">เรียงลำดับ</option>
            <option value="rating-high-to-low">คะแนนสูงไปต่ำ</option>
            <option value="rating-low-to-high">คะแนนต่ำไปสูง</option>
          </select>
        </div>

        {/* ตารางข้อมูล */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ลำดับ</th>
                <th>ชื่อลูกค้า</th>
                <th>ความคิดเห็น</th>
                <th>ชื่อผู้ขับ</th>
                <th>คะแนนรีวิว</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((review, index) => (
                <tr key={review.id}>
                  <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td>{review.user}</td>
                  <td>{review.comment}</td>
                  <td>{review.reviewer}</td>
                  <td >{'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}</td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="5" >
                    ไม่พบข้อมูลที่ค้นหา
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className='bi bi-chevron-left'>
            ก่อนหน้า
          </button>
          <span>
            หน้า {currentPage} / {totalPages}
          </span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
            <span>ถัดไป<i className="bi bi-chevron-right"></i></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
