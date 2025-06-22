import { BrowserRouter } from "react-router-dom";
import { PublicRoutes } from "./public/PublicRoutes";

function AppRoutes() {

  return (
    <BrowserRouter>
      <PublicRoutes />
    </BrowserRouter>
  )
}

export default AppRoutes;