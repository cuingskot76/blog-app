import axios from "axios";
import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const UseContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState("");

  const login = async (input) => {
    const res = await axios.post(
      "http://localhost:8000/api/auth/login",
      input,
      {
        withCredentials: true,
      }
    );
  };

  const logout = async () => {
    await axios.delete("http://localhost:8000/api/auth/logout", {
      withCredentials: true,
    });
    const navigate = useNavigate();
    navigate("/login");
  };

  const refreshToken = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/auth/token", {
        withCredentials: true,
      });
      setToken(res?.data?.accessToken);
      const decoded = jwt_decode(res?.data?.accessToken);
      setCurrentUser(decoded);
      setExpired(decoded.exp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        refreshToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
