import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Listings from "./pages/Listings";
import PGDetails from "./pages/PGDetails";
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import AdminDashboard from "./pages/AdminDashboard";
import UserStatus from "./pages/UserStatus";
import Register from "./pages/Register";
import ProtectedAdmin from "./components/ProtectedAdmin";
import ProtectedUser from "./components/ProtectedUser";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import Receipt from "./pages/Receipt";
import AdminPayments from "./pages/AdminPayments";
import UserPayments from "./pages/UserPayments";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/pg/:id" element={<PGDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/status" element={<UserStatus />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment/:bookingId" element={<Payment />} />
        <Route path="/receipt/:id" element={<Receipt />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
        <Route path="/payments" element={<UserPayments />} />




        <Route
          path="/booking/:id"
          element={
            <ProtectedUser>
              <Booking />
            </ProtectedUser>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminDashboard />
            </ProtectedAdmin>
          }
        />

        <Route
          path="/status"
          element={
            <ProtectedUser>
              <UserStatus />
            </ProtectedUser>
          }
        />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
