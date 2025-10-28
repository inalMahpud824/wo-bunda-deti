import { useEffect, useState } from "react";
import { useUser } from "../store/userStore";
import { jwtDecode } from "jwt-decode";

const useTokenValidation = () => {
  const { login, setLogin, setRole, setUserId } = useUser();
  const [validating, setValidating] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      const tokenDecode = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (!tokenDecode || tokenDecode.exp < currentTime) {
        localStorage.clear();
        setLogin(false);
      } else {
        setLogin(true);
        setRole(tokenDecode.role);
        setUserId(tokenDecode.id);
      }
    } catch {
      console.error("Token decoding failed");
      setLogin(false);
    } finally {
      setValidating(false);
    }
  }, [setLogin, setRole, setUserId]);

  return { login, validating };
};

export default useTokenValidation