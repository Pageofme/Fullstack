import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE = 10;

const AllService = () => {
  /* ----------------- State ----------------- */
  const [services, setServices] = useState([]);
  const [isOpen, setIsOpen] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  /* ------------- Fetch danh sách ------------- */
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/services')
      .then((res) => setServices(res.data))
      .catch((err) => console.error('Lỗi lấy danh sách dịch vụ:', err));
  }, []);

  /* ---------------- Handlers ---------------- */
  const toggleDropdown = (id) =>
    setIsOpen((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleDelete = (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa dịch vụ này?')) return;
    axios
      .delete(`http://localhost:8080/api/services/${id}`)
      .then(() => setServices((prev) => prev.filter((s) => s.serviceId !== id)))
      .catch((err) => {
        console.error('Lỗi khi xóa service:', err);
        alert('Xóa thất bại.');
      });
  };

  /* --------------- Pagination --------------- */
  const totalPages = Math.ceil(services.length / PAGE_SIZE) || 1;
  const visibleServices = services.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  /* ------------------ JSX ------------------- */
  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <div className="mt-5 d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">
                    <i className="fas fa-concierge-bell text-primary mr-2"></i>
                    All Services
                  </h4>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate('/pendingServices')}
                  >
                    <i className="fas fa-hourglass-half mr-1"></i>
                    Pending Services
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="card card-table">
            <div className="card-body booking_card">
              <div className="table-responsive">
                <table className="table table-striped table-hover table-center mb-0">
                  <thead>
                    <tr>
                      <th><i className="fas fa-receipt text-info mr-1"></i>Service ID</th>
                      <th><i className="fas fa-home text-primary mr-1"></i>Homestay</th>
                      <th><i className="fas fa-tags text-warning mr-1"></i>Type</th>
                      <th><i className="fas fa-dollar-sign text-success mr-1"></i>Price</th>
                      <th><i className="far fa-sticky-note text-secondary mr-1"></i>Notes</th>
                      <th><i className="fas fa-info-circle text-muted mr-1"></i>Status</th>
                      <th className="text-right"><i className="fas fa-cogs text-muted mr-1"></i>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleServices.map((s) => (
                      <tr key={s.serviceId}>
                        <td className="text-info font-weight-bold">{s.serviceId}</td>
                        <td>{s.homestay?.homestayId || 'N/A'}</td>
                        <td>{s.type?.serviceName || 'Unknown'}</td>
                        <td>
                          <span className="text-success font-weight-bold">
                            {s.price?.toLocaleString()} VND
                          </span>
                        </td>
                        <td>{s.specialNotes || '-'}</td>
                        <td>
                          {s.status ? (
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
                              onClick={() => toggleDropdown(s.serviceId)}
                            >
                              <i className="fas fa-ellipsis-v"></i>
                            </button>
                            <div
                              className={`dropdown-menu dropdown-menu-right ${isOpen[s.serviceId] ? 'show' : ''}`}
                            >
                              <a className="dropdown-item" href={`/edit-service?id=${s.serviceId}`}>
                                <i className="fas fa-pencil-alt"></i> Edit
                              </a>
                              <button className="dropdown-item" onClick={() => handleDelete(s.serviceId)}>
                                <i className="fas fa-trash-alt"></i> Delete
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {visibleServices.length === 0 && (
                      <tr>
                        <td colSpan="7" className="text-center">No services found</td>
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
  );
};

export default AllService;