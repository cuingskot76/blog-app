import {
  createBrowserRouter,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import NavbarMain from "./components/NavbarMain";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Page from "./pages/Page";
import SignUp from "./pages/SignUp";
import Trending from "./pages/Trending";
import Write from "./pages/Write";

const Layout = () => {
  return (
    <>
      {/* <Navbar /> */}
      <NavbarMain />
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
        element: [<Trending />, <Home />],
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
    // <div className="container flex flex-wrap items-center justify-between mx-auto px-2 sm:px-4 py-2.5">
    //   <RouterProvider router={router} />
    // </div>
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
