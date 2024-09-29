import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddBlogs from "./pages/AddBlogs.jsx";
import SingleBlog from "./pages/SingleBlog.jsx";
import UserBlogs from "./pages/UserBlogs.jsx"; // Import UserBlogs

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "addblogs",
        element: <AddBlogs />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "singleblog/:id",
        element: <SingleBlog />,
      },
      {
        path: "userblogs/:uid", // New route for UserBlogs
        element: <UserBlogs />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
