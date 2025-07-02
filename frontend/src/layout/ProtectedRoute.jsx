import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null sebagai nilai awal
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token.length === 0) {
      setIsAuthenticated(false);
      return;
    }
    if (!token || token.length === 0) {
      setIsAuthenticated(false);
      return;
    }

    const validateToken = async () => {
      try {
        const tokenDecode = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000); // waktu sekarang dalam detik
        if (
          !tokenDecode || tokenDecode.exp < currentTime
        ) {
          localStorage.clear();
          setIsAuthenticated(false);
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Token decoding failed", error);
        setIsAuthenticated(false);
      }
    };
    validateToken()
  }, [])

  if (isAuthenticated === null) {
    return (
      <div>
        loading...
        {/* <Loading /> */}
      </div>
    ); // Indikator loading
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
export default ProtectedRoute