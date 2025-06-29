import { BrowserRouter } from "react-router-dom";
import { PublicRoutes } from "./public/PublicRoutes";
import PrivateRoute from "./private/PrivateRoute";

function AppRoutes() {

  return (
    <BrowserRouter>
      <PublicRoutes />
      <PrivateRoute />
    </BrowserRouter>
  )
}

export default AppRoutes;