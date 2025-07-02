import { Route, Routes } from "react-router-dom"
import Dashboard from "../../pages/dashboard/Dashboard"
import DashboardProduct from "../../pages/dashboard/product/DashboardProduct"
import FormAddProduct from "../../pages/dashboard/product/FormAddProduct"
import ProtectedRoute from "../../layout/ProtectedRoute"
import FormUpdateProduct from "../../pages/dashboard/product/FormUpdateProduct"

const PrivateRoute = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/service" element={<DashboardProduct />} />
        <Route path="/dashboard/service/form" element={<FormAddProduct />} />
        <Route path="/dashboard/service/form/:id" element={<FormUpdateProduct />} />
      </Route>
    </Routes>
  )
}

export default PrivateRoute