import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Document.css";

function Document() {
  const location = useLocation();
  const files = location.state?.files || [];

  return (
    <div className="pages-container">
      <div className="hader-container">
        <span className="hader-text">
          <h1><strong>DRIVER</strong></h1>
        </span>
        <div className="user-icon">👤</div>
      </div>

      <div className="files-container">
        {files.length > 0 ? (
          files.map((file) => (
            <div key={file.id} className="file-card">
              <a href={file.File} target="_blank" rel="noopener noreferrer">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/281/281760.png"
                  alt="File Icon"
                  className="file-icon"
                />
              </a>
              <p>{file.name}</p>
            </div>
          ))
        ) : (
          <p>ไม่มีไฟล์ที่จะแสดง</p>
        )}
      </div>

      <div className="action1-buttons">
        <button className="approve-btn">อนุมัติ</button>
        <button className="decline-btn">ไม่อนุมัติ</button>
        <Link to="/driver">
          <button className="ex-btn">ออก</button>
        </Link>
      </div>
    </div>
  );
}

export default Document;
