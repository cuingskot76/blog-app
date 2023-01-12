import {
  createBrowserRouter,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Page from "./pages/Page";
import SignUp from "./pages/SignUp";
import Write from "./pages/Write";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Page />,
      },
      {
        path: "/write",
        element: <Write />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

function App() {
  return (
    <div className="h-[2000px] px-[2rem] overflow-x-hidden sm:px-[4rem] ">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
