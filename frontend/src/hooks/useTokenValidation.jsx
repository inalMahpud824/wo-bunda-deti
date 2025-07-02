import { useEffect } from "react";
import { useUser } from "../store/userStore";
import { jwtDecode } from "jwt-decode";

const useTokenValidation = () => {
  const { login, setLogin } = useUser();
  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      const tokenDecode = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // waktu sekarang dalam detik
      if (!tokenDecode || tokenDecode.exp < currentTime) {
        localStorage.clear();
        setLogin(false);
        return;
      }
      setLogin(true);
    } catch (error) {
      console.error("Token decoding failed", error);
      setLogin(false);
    }
  }, [login, setLogin]);

  return { login, setLogin }
}
export default useTokenValidation