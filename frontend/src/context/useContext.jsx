import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const UseContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  // const [currentUser, setCurrentUser] = useState(
  //   JSON.parse(localStorage.getItem("user")) || null
  // );
  const [token, setToken] = useState(null);

  const login = async (input) => {
    const res = await axios.post("http://localhost:8000/api/auth/login", input);
    // setCurrentUser(res.data[0]);
    setCurrentUser(res.data);
    // setToken(res.data[1]);
  };

  const logout = async () => {
    await axios.post("http://localhost:8000/api/auth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
