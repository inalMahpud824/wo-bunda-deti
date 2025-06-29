import { Route, Routes } from "react-router-dom"
import Dashboard from "../../pages/dashboard/Dashboard"
import DashboardProduct from "../../pages/dashboard/DashboardProduct"

const PrivateRoute = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/service" element={<DashboardProduct />} />
    </Routes>
  )
}

export default PrivateRoute