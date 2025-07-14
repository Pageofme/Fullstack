import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import HomeLayout from "./layouts/HomeLayout";
import HostLayout from "./layouts/HostLayout";
import BookedLayout from "./layouts/BookedLayout";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import AllBooking from "./pages/admin/All-booking";
import EditBooking from "./pages/admin/Edit-booking";
import AllHost from "./pages/admin/All-hosts";
import EditHost from "./pages/admin/Edit-hosts";
import AllCustomer from "./pages/admin/All-customer";
import EditCustomer from "./pages/admin/Edit-customer";
import AllService from "./pages/admin/All-service";
import EditService from "./pages/admin/Edit-service";
import AddService from "./pages/admin/Add-service";
import Invoices from "./pages/admin/Invoices";
import Expenses from "./pages/admin/Expenses";
import Activity from "./pages/admin/Activities";
import ExpenseReports from "./pages/admin/Expense-reports";
import InvoiceReports from "./pages/admin/Invoices-report";
import ForgotPassword from "./pages/admin/Forgot-password";
import ChangePassword from "./pages/admin/Change-password";
import LockScreen from "./pages/admin/Lock-screen";
import Profile from "./pages/admin/Profile";
import Error404 from "./pages/admin/Error-404";
import Error500 from "./pages/admin/Error-500";
import Login from "./pages/admin/Login";
import Register from "./pages/admin/Register";
import Gallery from "./pages/admin/Gallery";
import PendingServices from "./pages/admin/PendingServices";

// Frontend Pages
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Service from "./pages/Service";
import RoomDetails from "./pages/RoomDetails";
import Offers from "./pages/Offer";

// Host Pages
import HostDashboard from "./pages/host/Dashboard";
import Messages from "./pages/host/Messages";
import CustomerReport from "./pages/host/CustomerReport";
import BillingSystem from "./pages/host/BillingSystem";
import HostService from "./pages/host/HostService";
import Occupancy from './components/host/Occupancy';
import HostBooking from "./pages/host/Booking";
import AllRoom from "./pages/host/room/AllRoom";
import EditRoom from "./pages/host/room/EditRoom";
import AddRoom from "./pages/host/room/AddRoom";
import Room from "./pages/host/room/Room";
import RoomPricing from "./pages/host/room/RoomPricing";
import FacilitiesList from "./pages/host/FacilitiesList";

// Payment Pages
import PaymentCheckout from "./pages/payment/Payment-checkout";
import PaymentCallback from "./pages/payment/PaymentCallback";
import BookingSuccess from "./pages/payment/BookingSuccess";
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="all-booking" element={<AllBooking />} />
          <Route path="edit-booking/:id" element={<EditBooking />} />
          <Route path="all-customer" element={<AllCustomer />} />
          <Route path="edit-customer/:id" element={<EditCustomer />} />
          <Route path="all-hosts" element={<AllHost />} />
          <Route path="edit-host/:id" element={<EditHost />} />
          <Route path="all-service" element={<AllService />} />
          <Route path="edit-service/:id" element={<EditService />} />
          <Route path="add-service" element={<AddService />} />
          <Route path="pending-services" element={<PendingServices />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="activities" element={<Activity />} />
          <Route path="expense-reports" element={<ExpenseReports />} />
          <Route path="invoice-reports" element={<InvoiceReports />} />
          <Route path="profile" element={<Profile />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="*" element={<Error404 />} />
        </Route>

        {/* Authentication Routes (No Layout) */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/change-password" element={<ChangePassword />} />
        <Route path="/admin/lock-screen" element={<LockScreen />} />

        {/* Frontend Routes */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/services" element={<Service />} />     
        </Route>

        {/* Host Routes */}
        <Route element={<HostLayout />}>
          <Route path="/host" element={<Navigate to="/host/dashboard" replace />} />
          <Route path="/host/dashboard" element={<HostDashboard />} />
          
          <Route path="/host/rooms" element={<Room />}>
            <Route index element={<AllRoom />} />
            <Route path="add" element={<AddRoom />} />
            <Route path="edit/:id" element={<EditRoom />} />
            <Route path="pricing" element={<RoomPricing />} />
          </Route>
          
          <Route path="/host/messages" element={<Messages />} />
          <Route path="/host/reports" element={<CustomerReport />} />
          <Route path="/host/billing" element={<BillingSystem />} />
          <Route path="/host/services" element={<HostService />} />
          <Route path="/host/occupancy" element={<Occupancy />} />
          <Route path="/host/bookings" element={<HostBooking />} />
          <Route path="/host/facilities" element={<FacilitiesList />} />
        </Route>

        {/* Booking/Payment Routes */}
        <Route element={<BookedLayout />}>
          <Route path="/offer" element={<Offers />} />
          <Route path="/room/roomdetails/:homestayId/:roomNumber" element={<RoomDetails />} />
          <Route path="/checkout" element={<PaymentCheckout />} />
          <Route path="/payment-callback" element={<PaymentCallback />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
        </Route>

        {/* Error Routes */}
        {/* <Route path="/404" element={<Error404 />} />
        <Route path="/500" element={<Error500 />} />
        <Route path="*" element={<Navigate to="/404" replace />} /> */}
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;