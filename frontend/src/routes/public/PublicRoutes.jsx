import { Route, Routes } from "react-router-dom"
import { LandingPage } from "../../pages/LandingPage"
import Product from "../../pages/Product"
import ProductDetail from "../../pages/ProductDetail"
import Login from "../../pages/Login"

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/service" element={<Product />} />
      <Route path="/service/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}