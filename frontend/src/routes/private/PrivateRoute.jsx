import { Route, Routes } from "react-router-dom"

import { lazy, Suspense } from "react"
import { Loading } from "../../components/loading/Loading"

const Dashboard = lazy(() => import("../../pages/dashboard/Dashboard"))
const DashboardProduct = lazy(() => import("../../pages/dashboard/product/DashboardProduct"))
const FormAddProduct = lazy(() => import("../../pages/dashboard/product/FormAddProduct"))
const ProtectedRoute = lazy(() => import("../../layout/ProtectedRoute"))
const FormUpdateProduct = lazy(() => import("../../pages/dashboard/product/FormUpdateProduct"))
const DashboardContact = lazy(() => import("../../pages/dashboard/DashboardContact"))
const DashboardOrder = lazy(() => import("../../pages/dashboard/DashboardOrder"))
const DashboardGallery = lazy(() => import("../../pages/dashboard/gallery/DashboardGallery"))
const FormAddGallery = lazy(() => import("../../pages/dashboard/gallery/FormAddGallery"))

const PrivateRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  )
}

export default PrivateRoute