import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PAGE_SIZE = 10;

const AllBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [isOpen, setIsOpen] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  // Lấy booking
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/bookings')
      .then((res) => setBookings(res.data))
      .catch((err) => console.error('Lỗi khi lấy danh sách booking:', err));
  }, []);

  // Handler
  const toggleDropdown = (id) => {
    setIsOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa booking này?')) return;
    axios
      .delete(`http://localhost:8080/api/bookings/${id}`)
      .then(() => setBookings((prev) => prev.filter((b) => b.bookingId !== id)))
      .catch((err) => {
        console.error('Lỗi khi xóa booking:', err);
        alert('Xóa thất bại.');
      });
  };

  /* ---------------------- Phân trang ---------------------- */
  const totalPages = Math.ceil(bookings.length / PAGE_SIZE) || 1;
  const visibleBookings = bookings.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  /* --------------------- JSX return ----------------------- */
  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h4 className="card-title mt-2">
                  <i className="fas fa-clipboard-list text-primary mr-2"></i>
                  All Bookings
                </h4>
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
                          <th>
                            <i className="fas fa-receipt text-info mr-1"></i>Booking ID
                          </th>
                          <th>
                            <i className="fas fa-user text-primary mr-1"></i>Customer
                          </th>
                          <th>
                            <i className="fas fa-bed text-warning mr-1"></i>Room
                          </th>
                          <th>
                            <i className="far fa-calendar-check text-success mr-1"></i>
                            Check‑in
                          </th>
                          <th>
                            <i className="far fa-calendar-times text-danger mr-1"></i>
                            Check‑out
                          </th>
                          <th>
                            <i className="fas fa-dollar-sign text-success mr-1"></i>Total
                          </th>
                          <th>
                            <i className="fas fa-info-circle text-secondary mr-1"></i>Status
                          </th>
                          <th className="text-right">
                            <i className="fas fa-cogs text-muted mr-1"></i>Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {visibleBookings.map((b) => (
                          <tr key={b.bookingId}>
                            <td className="font-weight-bold text-info">{b.bookingId}</td>
                            <td>{b.user?.fullName || 'N/A'}</td>
                            <td>{b.room?.roomNumber || 'N/A'}</td>
                            <td className="text-success">
                              <i className="far fa-clock mr-1"></i>
                              {b.checkInDate}
                            </td>
                            <td className="text-danger">
                              <i className="far fa-clock mr-1"></i>
                              {b.checkOutDate}
                            </td>
                            <td>
                              <span className="text-success font-weight-bold">
                                {b.totalAmount?.toLocaleString()} VND
                              </span>
                            </td>
                            <td>
                              <span
                                className={`badge d-inline-flex align-items-center ${b.status === 'Booked'
                                    ? 'badge-success'
                                    : b.status === 'Cancelled'
                                      ? 'badge-danger'
                                      : 'badge-secondary'
                                  }`}
                              >
                                <i
                                  className={`mr-1 ${b.status === 'Booked'
                                      ? 'fas fa-check-circle'
                                      : b.status === 'Cancelled'
                                        ? 'fas fa-times-circle'
                                        : 'fas fa-hourglass-half'
                                    }`}
                                ></i>
                                {b.status}
                              </span>
                            </td>
                            <td className="text-right">
                              <div className="dropdown">
                                <button
                                  className="action-icon btn"
                                  onClick={() => toggleDropdown(b.bookingId)}
                                >
                                  <i className="fas fa-ellipsis-v"></i>
                                </button>
                                <div
                                  className={`dropdown-menu dropdown-menu-right ${isOpen[b.bookingId] ? 'show' : ''
                                    }`}
                                >
                                  <a
                                    className="dropdown-item"
                                    href={`/edit-booking?id=${b.bookingId}`}
                                  >
                                    <i className="fas fa-pencil-alt"></i> Edit
                                  </a>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleDelete(b.bookingId)}
                                  >
                                    <i className="fas fa-trash-alt"></i> Delete
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {visibleBookings.length === 0 && (
                          <tr>
                            <td colSpan="8" className="text-center">
                              No bookings found
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
                        <li
                          className={`page-item ${currentPage === 1 && 'disabled'}`}
                        >
                          <button className="page-link" onClick={() => changePage(currentPage - 1)}>
                            «
                          </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                          <li
                            key={p}
                            className={`page-item ${currentPage === p && 'active'}`}
                          >
                            <button className="page-link" onClick={() => changePage(p)}>
                              {p}
                            </button>
                          </li>
                        ))}
                        <li
                          className={`page-item ${currentPage === totalPages && 'disabled'}`}
                        >
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

export default AllBooking;