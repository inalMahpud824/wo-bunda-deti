import { Route, Routes } from "react-router-dom"
import { LandingPage } from "../../pages/LandingPage"

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  )
}