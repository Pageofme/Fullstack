import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../assets/css/Style.css";
import LineChartDashboard from '../../components/admin/LineChartDashboard';
import DonutChartDashboard from '../../components/admin/DonutChartDashboard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/bookings')
      .then(res => setBookings(res.data))
      .catch(err => console.error("Lỗi khi lấy danh sách booking:", err));
  }, []);

  const displayedBookings = showAll ? bookings : bookings.slice(0, 5);

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12 mt-5">
                <h3 className="page-title mt-3">Hello Huy Hoang!</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item active">Dashboard</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            {[{ title: 'Total Booking', value: bookings.length, icon: 'user-plus' },
            { title: 'Available Rooms', value: 180, icon: 'dollar-sign' },
            { title: 'Enquiry', value: 1538, icon: 'file-plus' },
            { title: 'Collections', value: 364, icon: 'globe' }].map((card, index) => (
              <div className="col-xl-3 col-sm-6 col-12" key={index}>
                <div className="card board1 fill">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <div>
                        <h3 className="card_widget_header">{card.value}</h3>
                        <h6 className="text-muted">{card.title}</h6>
                      </div>
                      <div className="ml-auto mt-md-3 mt-lg-0">
                        <span className="opacity-7 text-muted">
                          <i className={`fe fe-${card.icon}`}></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-md-12 col-lg-6">
              <div className="card card-chart">
                <div className="card-header">
                  <h4 className="card-title">Revenue</h4>
                </div>
                <div className="card-body">
                  <LineChartDashboard />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="card card-chart">
                <div className="card-header">
                  <h4 className="card-title">ROOMS BOOKED</h4>
                </div>
                <div className="card-body">
                  <DonutChartDashboard />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 d-flex">
              <div className="card card-table flex-fill">
                <div className="card-header">
                  <h4 className="card-title float-left mt-2">Booking</h4>
                  <button
                    type="button"
                    className="btn btn-primary float-right veiwbutton"
                    onClick={() => navigate('/all-booking')}
                  >
                    View All
                  </button>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover table-center">
                      <thead>
                        <tr>
                          <th>Booking ID</th>
                          <th>Customer</th>
                          <th>Room</th>
                          <th>Check-in</th>
                          <th>Check-out</th>
                          <th>Total</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayedBookings.map((b) => (
                          <tr key={b.bookingId}>
                            <td>{b.bookingId}</td>
                            <td>{b.user?.fullName || 'N/A'}</td>
                            <td>{b.room?.roomNumber || 'N/A'}</td>
                            <td>{b.checkInDate}</td>
                            <td>{b.checkOutDate}</td>
                            <td>{b.totalAmount?.toLocaleString()} VND</td>
                            <td>
                              <span className={`badge ${b.status === 'booked' ? 'badge-success' : 'badge-secondary'}`}>{b.status}</span>
                            </td>
                          </tr>
                        ))}
                        {bookings.length === 0 && (
                          <tr>
                            <td colSpan="7" className="text-center">No bookings found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
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

export default Dashboard;