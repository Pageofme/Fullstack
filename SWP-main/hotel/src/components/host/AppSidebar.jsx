import { useState } from "react";
import { Nav } from 'react-bootstrap';
import {
  BarChart3,
  Calendar,
  Home,
  MessageCircle,
  Star,
  CreditCard,
  Utensils,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const items = [
  { title: 'Dashboard', url: '/hostdashboard', icon: BarChart3 },
  
  {
    title: 'Rooms',
    icon: Home,
    submenu: [
      { title: 'All Rooms', url: '/rooms/allroom' },
      { title: 'Add Room', url: '/rooms/addroom' },
      { title: 'Edit Room', url: '/rooms/editroom' },
      { title: 'Room Pricing', url: '/rooms/roompricing' },
    ],
  },
  { title: 'Room Facilites', url: '/roomfacilites', icon: Utensils },
  { title: 'Occupancy', url: '/occupancy', icon: Home},
  { title: 'Booking', url: '/booking', icon: MessageCircle },
  { title: 'Messages', url: '/messages', icon: MessageCircle },
  { title: 'Customer Report', url: '/customerreport', icon: Star },
  { title: 'Billing System', url: '/billingsystem', icon: CreditCard },
  { title: 'Service', url: '/hostservice', icon: Utensils },
];

export function AppSidebar() {
  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState(null);

  // Xử lý mở/đóng submenu
  const handleToggle = (title) => {
    setExpandedItem(expandedItem === title ? null : title);
  };

  return (
    <Nav
      className="d-flex flex-column bg-light p-3"
      style={{ width: '250px', height: '100vh', borderRight: '1px solid #dee2e6' }}
    >
      <h1 className="text-primary mb-4">Traexco</h1>
      {items.map((item) => (
        <div key={item.title}>
          {item.submenu ? (
            <>
              <Nav.Link
                as="div"
                onClick={() => handleToggle(item.title)}
                className="d-flex align-items-center px-3 py-2 cursor-pointer"
                style={{
                  backgroundColor: expandedItem === item.title ? '#f8f9fa' : 'transparent',
                }}
              >
                <item.icon className="me-2" size={20} />
                <span>{item.title}</span>
                <span className="ms-auto">
                  {expandedItem === item.title ? '▲' : '▼'}
                </span>
              </Nav.Link>
              {expandedItem === item.title && (
                <div className="ms-4">
                  {item.submenu.map((subItem) => (
                    <Nav.Link
                      key={subItem.title}
                      as={Link}
                      to={subItem.url}
                      active={location.pathname === subItem.url}
                      className="d-flex align-items-center px-3 py-1"
                      style={{ paddingLeft: '30px' }}
                    >
                      <span>{subItem.title}</span>
                    </Nav.Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <Nav.Link
              key={item.title}
              as={Link}
              to={item.url}
              active={location.pathname === item.url}
              className="d-flex align-items-center px-3 py-2"
            >
              <item.icon className="me-2" size={20} />
              <span>{item.title}</span>
            </Nav.Link>
          )}
        </div>
      ))}
    </Nav>
  );
}