import axios from "axios";
import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const UseContextProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState();
  // store user in local storage
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  // const [userEmail, setUserEmail] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const login = async (input) => {
    const res = await axios.post(
      "http://localhost:8000/api/auth/login",
      input,
      {
        withCredentials: true,
      }
    );
    const { accessToken, refreshToken, id, ...user } = res?.data;
    setCurrentUser(user);
    setAccessToken(accessToken);
  };
  // console.log("access token from usstate", accessToken);
  const logout = async () => {
    // await axios.post("http://localhost:8000/api/auth/logout");
    await axios.delete("http://localhost:8000/api/auth/logout");
    setCurrentUser(null);
  };

  const generateNewRefreshToken = async () => {
    try {
      const res = await axios.post(`http://localhost:8000/api/auth/token`, {
        token: refreshToken,
      });
      console.log(res);
      setAccessToken(res?.data?.accessToken);
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  };

  // create axios interceptor to refresh token
  // axios.interceptors.response.use(
  //   (response) => response,
  //   async (error) => {
  //     const originalRequest = error.config;
  //     if (
  //       error.response.status === 401 &&
  //       originalRequest.url === "http://localhost:8000/api/auth/token"
  //     ) {
  //       // logout();
  //       return Promise.reject(error);
  //     }
  //     if (
  //       error.response.status === 401 &&
  //       !originalRequest._retry &&
  //       originalRequest.url !== "http://localhost:8000/api/auth/token"
  //     ) {
  //       originalRequest._retry = true;
  //       await generateNewRefreshToken();
  //       axios.defaults.headers.common[
  //         "Authorization"
  //       ] = `Bearer ${accessToken}`;
  //       return axios(originalRequest);
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  const axiosAuth = axios.create();

  axiosAuth.interceptors.response.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await generateNewRefreshToken();
        config.headers["Authorization"] = `Bearer ${data.accessToken}`;
      }
      return config;
    },
    (error) => {
      // if an error, we want to reject the Promise and return the error
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        // userEmail,
        accessToken,
        refreshToken,
        login,
        logout,
        generateNewRefreshToken,
        axiosAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// !
// import axios from "axios";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const UseContextProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState();
//   // const [currentUser, setCurrentUser] = useState(
//   //   JSON.parse(localStorage.getItem("user")) || null
//   // );
//   const [token, setToken] = useState(null);

//   const login = async (input) => {
//     const res = await axios.post("http://localhost:8000/api/auth/login", input);
//     // setCurrentUser(res.data[0]);
//     setCurrentUser(res.data);
//     // setToken(res.data[1]);
//   };

//   const logout = async () => {
//     await axios.post("http://localhost:8000/api/auth/logout");
//     setCurrentUser(null);
//   };

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(currentUser));
//   }, [currentUser]);

//   return (
//     <AuthContext.Provider value={{ currentUser, login, logout, token }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// !
