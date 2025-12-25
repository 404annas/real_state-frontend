import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import Dashboard from "./pages/Dashboard/Dashboard"
import Properties from "./pages/Properties/Properties"
import PropertyForm from "./pages/Properties/PropertyForm"
import PropertyDetail from "./pages/Properties/PropertyDetail"
import BuyProperties from "./pages/Properties/Buy/BuyProperties"
import RentProperties from "./pages/Properties/Rent/RentProperties"
import Users from "./pages/Users/Users"
import Inquiries from "./pages/Inquiries/Inquiries"
import Settings from "./pages/Settings/Settings"
import Profile from "./pages/Profile/Profile"
import PrivateRoute from "./components/shared/PrivateRoute"
import { Toaster } from "sonner"
import { SessionExpirationHandler } from "./utils/session"

function App() {
  return (
    <SessionExpirationHandler>
      <Toaster position="bottom-right" richColors />
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/buy" element={<BuyProperties />} />
          <Route path="properties/rent" element={<RentProperties />} />
          <Route path="properties/new" element={<PropertyForm />} />
          <Route path="properties/:id" element={<PropertyDetail />} />
          <Route path="properties/:id/edit" element={<PropertyForm />} />
          <Route path="users" element={<Users />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </SessionExpirationHandler>
  )
}

export default App
