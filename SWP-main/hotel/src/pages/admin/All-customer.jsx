import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PAGE_SIZE = 10;

const AllCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [isOpen, setIsOpen] = useState({});
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  /* ------------------ Lấy dữ liệu ------------------ */
  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const fetchAllCustomers = () => {
    axios
      .get('http://localhost:8080/api/users/customers')
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error('Lỗi khi lấy danh sách users:', err));
  };

  /* ------------------ Tìm kiếm ------------------ */
  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    setCurrentPage(1);

    if (keyword.trim() === '') {
      fetchAllCustomers();
    } else {
      axios
        .get('http://localhost:8080/api/users/search', {
          params: { keyword: keyword.trim() },
        })
        .then((res) => setCustomers(res.data))
        .catch((err) => console.error('Lỗi tìm kiếm:', err));
    }
  };

  /* ------------------ Xoá ------------------ */
  const toggleDropdown = (id) => {
    setIsOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa người dùng này?')) return;
    axios
      .delete(`http://localhost:8080/api/users/${id}`)
      .then(() => setCustomers((prev) => prev.filter((u) => u.userId !== id)))
      .catch((err) => {
        console.error('Lỗi khi xóa user:', err);
        alert('Xóa thất bại.');
      });
  };

  /* ------------------ Phân trang ------------------ */
  const totalPages = Math.ceil(customers.length / PAGE_SIZE) || 1;
  const visibleCustomers = customers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  /* ------------------ JSX ------------------ */
  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-6 d-flex align-items-center">
                <h4 className="card-title mt-2">
                  <i className="fas fa-users text-primary mr-2"></i>All Customers
                </h4>
              </div>
              <div className="col-md-6 text-right">
                <div className="position-relative" style={{ maxWidth: '300px', display: 'inline-block' }}>
                  <i className="fas fa-search position-absolute" style={{ top: '10px', left: '10px', opacity: 0.6 }}></i>
                  <input
                    type="text"
                    className="form-control pl-4"
                    placeholder="Tìm kiếm theo tên..."
                    value={searchKeyword}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table">
                <div className="card-body booking_card">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover table-center mb-0">
                      <thead>
                        <tr>
                          <th><i className="fas fa-id-card text-primary mr-1"></i>Full Name</th>
                          <th><i className="fas fa-user-tag text-info mr-1"></i>Username</th>
                          <th><i className="fas fa-envelope text-danger mr-1"></i>Email</th>
                          <th><i className="fas fa-phone-alt text-success mr-1"></i>Phone</th>
                          <th><i className="fas fa-map-marker-alt text-warning mr-1"></i>Address</th>
                          <th><i className="fas fa-info-circle text-secondary mr-1"></i>Status</th>
                          <th className="text-right"><i className="fas fa-cogs text-muted mr-1"></i>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visibleCustomers.map((c) => (
                          <tr key={c.userId}>
                            <td className="font-weight-bold text-primary">{c.fullName}</td>
                            <td>{c.userName}</td>
                            <td>{c.email}</td>
                            <td>{c.phone}</td>
                            <td>{c.address}</td>
                            <td>
                              {c.status ? (
                                <span className="badge badge-success d-inline-flex align-items-center">
                                  <i className="fas fa-check-circle mr-1"></i>Active
                                </span>
                              ) : (
                                <span className="badge badge-danger d-inline-flex align-items-center">
                                  <i className="fas fa-times-circle mr-1"></i>Inactive
                                </span>
                              )}
                            </td>
                            <td className="text-right">
                              <div className="dropdown">
                                <button
                                  className="action-icon btn"
                                  onClick={() => toggleDropdown(c.userId)}
                                >
                                  <i className="fas fa-ellipsis-v"></i>
                                </button>
                                <div
                                  className={`dropdown-menu dropdown-menu-right ${isOpen[c.userId] ? 'show' : ''}`}
                                >
                                  <a className="dropdown-item" href={`/edit-customer?id=${c.userId}`}>
                                    <i className="fas fa-pencil-alt"></i> Edit
                                  </a>
                                  <button className="dropdown-item" onClick={() => handleDelete(c.userId)}>
                                    <i className="fas fa-trash-alt"></i> Delete
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {visibleCustomers.length === 0 && (
                          <tr>
                            <td colSpan="7" className="text-center">
                              Không tìm thấy khách hàng
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span>
                      Page {currentPage} / {totalPages}
                    </span>
                    <nav>
                      <ul className="pagination mb-0">
                        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                          <button className="page-link" onClick={() => changePage(currentPage - 1)}>
                            «
                          </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                          <li key={p} className={`page-item ${currentPage === p && 'active'}`}>
                            <button className="page-link" onClick={() => changePage(p)}>
                              {p}
                            </button>
                          </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                          <button className="page-link" onClick={() => changePage(currentPage + 1)}>
                            »
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCustomer;