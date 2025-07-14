import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './assets/css/style.css'; // Copy tất cả css vào thư mục assets tương ứng
// import './assets/plugins/fontawesome/css/all.min.css';
// import './assets/css/feathericon.min.css';
// import './assets/plugins/datatables/datatables.min.css';
// import './assets/plugins/morris/morris.css';
// import './assets/css/bootstrap-datetimepicker.min.css';



const activities = [
  {
    name: 'Lesley Grauer',
    img: 'avatar-01.jpg',
    action: 'added new work',
    target: 'For Service',
    time: '4 mins ago',
  },
  {
    name: 'Lesley Grauer',
    img: 'avatar-02.jpg',
    action: 'added new work',
    target: 'For Service',
    time: '4 mins ago',
  },
  {
    name: 'Catherine Manseau',
    img: 'avatar-03.jpg',
    action: 'completed',
    target: 'Room booking with payment gateway',
    time: '12 mins ago',
  },
  {
    name: 'Bernardo Galaviz',
    img: 'avatar-04.jpg',
    action: 'changed the Room',
    target: 'For available',
    time: '1 day ago',
  },
  {
    name: 'Mike Litorus',
    img: 'avatar-05.jpg',
    action: 'booking new room for',
    target: 'video conferencing',
    time: '2 days ago',
  },
  {
    name: 'Jeffery Lalor',
    img: 'avatar-06.jpg',
    action: 'added Jeffrey Warden and Bernardo Galaviz to the villa',
    target: 'Private',
    time: '7 days ago',
  },
];

const Activity = () => {
  useEffect(() => {
    // Replace jQuery datetimepicker logic if needed using a datetimepicker component
    // This can also be replaced with flatpickr, react-datepicker etc.
  }, []);

  return (
    <div className="main-wrapper">
     

      <div className="page-wrapper">
        <div className="content mt-5">
          <div className="row">
            <div className="col-sm-12">
              <h4 className="page-title">Activities</h4>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <div className="activity">
                <div className="activity-box">
                  <ul className="activity-list">
                    {activities.map((activity, idx) => (
                      <li className="activity-list_li" key={idx}>
                        <div className="activity-user">
                          <a href="/profile" className="avatar" title={activity.name}>
                            <img
                              alt={activity.name}
                              src={`assets/img/profiles/${activity.img}`}
                              className="img-fluid rounded-circle"
                            />
                          </a>
                        </div>
                        <div className="activity-content">
                          <div className="timeline-content">
                            <a href="/profile" className="name">{activity.name}</a> {activity.action}{' '}
                            <a href="/activities">{activity.target}</a>
                            <span className="time">{activity.time}</span>
                          </div>
                        </div>
                        <a className="activity-delete" href="#" title="Delete">&times;</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
};

export default Activity;