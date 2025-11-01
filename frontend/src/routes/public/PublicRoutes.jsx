import { Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"
import { Loading } from "../../components/loading/Loading"

const LandingPage = lazy(() => import("../../pages/LandingPage"))
const Gallery = lazy(() => import("../../pages/Gallery"))
const Cart = lazy(() => import("../../pages/Cart"))
const Order = lazy(() => import("../../pages/Oder"))
const Login = lazy(() => import("../../pages/Login"))
const ProductDetail = lazy(() => import("../../pages/ProductDetail"))
const Product = lazy(() => import("../../pages/Product"))
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const VerifyToken = lazy(() => import("../../pages/VerifyToken"));
const ChangePassword = lazy(() => import("../../pages/ChangePassword"));

export const PublicRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/service" element={<Product />} />
        <Route path="/service/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/service/:id/order" element={<Order />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password/verify" element={<VerifyToken />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </Suspense>
  )
}