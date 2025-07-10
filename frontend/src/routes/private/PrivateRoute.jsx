import { Route, Routes } from "react-router-dom"
import Dashboard from "../../pages/dashboard/Dashboard"
import DashboardProduct from "../../pages/dashboard/product/DashboardProduct"
import FormAddProduct from "../../pages/dashboard/product/FormAddProduct"
import ProtectedRoute from "../../layout/ProtectedRoute"
import FormUpdateProduct from "../../pages/dashboard/product/FormUpdateProduct"
import DashboardContact from "../../pages/dashboard/DashboardContact"
import DashboardOrder from "../../pages/dashboard/DashboardOrder"
import DashboardGallery from "../../pages/dashboard/gallery/DashboardGallery"
import FormAddGallery from "../../pages/dashboard/gallery/FormAddGallery"

const PrivateRoute = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/service" element={<DashboardProduct />} />
        <Route path="/dashboard/service/form" element={<FormAddProduct />} />
        <Route path="/dashboard/service/form/:id" element={<FormUpdateProduct />} />
        <Route path="/dashboard/contact" element={<DashboardContact />} />
        <Route path="/dashboard/order" element={<DashboardOrder />} />
        <Route path="/dashboard/gallery" element={<DashboardGallery />} />
        <Route path="/dashboard/gallery/add" element={<FormAddGallery />} />
      </Route>
    </Routes>
  )
}

export default PrivateRoute