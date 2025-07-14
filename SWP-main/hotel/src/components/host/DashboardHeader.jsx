import { Bell, ChevronDown } from "lucide-react";
import { Button, Badge, Dropdown } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export function DashboardHeader() {
const location = useLocation();

  // Xác định tiêu đề dựa trên đường dẫn hiện tại
  const getTitle = () => {
    switch (location.pathname) {
      
      case '/rooms':
        return 'Rooms';
      case '/messages':
        return 'Messages';
      case '/billingsystem':
        return 'Billing System';
      case '/customerreport':
        return 'customer report'; 
      case '/hostservice':
        return 'Service';
      case '/hostdashboard':
        return 'Dashboard';
      case '/occupancy':
        return 'Occupancy';
      case '/booking':
        return 'Booking';
      case'/rooms/allroom':
        return 'All Room';
      case'/rooms/addroom':
        return 'Add Room';
      case'/rooms/editroom':
        return 'Edit Room';
      case'/rooms/roompricing':
        return 'Room Pricing';
      default:
        return 'Dashboard';
    }
  };



  return (
    <header className="d-flex align-items-center justify-content-between border-bottom bg-white px-3 py-3">
      
      <h2 className="ms-2">{getTitle()}</h2>
      <div className="d-flex align-items-center gap-3 me-5">
            
        {/* Notification Bell */}
        <div className="position-relative">
          <Button variant="light" size="sm">
            <Bell size={30} />
          </Button>
          <Badge
            pill
            bg="danger"
            className="position-absolute top-0 start-100 translate-middle"
            style={{ fontSize: "0.65rem" }}
          >
            1
          </Badge>
        </div>

        {/* User Avatar */}
        <div className="ms-3">
          <img
            src="/placeholder.svg?height=32&width=32"
            alt="User"
            width={40}
            height={40}
            className="rounded-circle"
          />
        </div>
      </div>
    </header>
  );
}
