import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import About from "../pages/About";
import Author from "../pages/Author";
import Profile from "../pages/profile/Profile";
import AddBlogForm from "../pages/AddBlogForm";
import ProtectedRoute from "../guards/ProtectedRoute";
import { AppRouteEnums } from "./AppRouteEnums";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={AppRouteEnums.HOME} element={<Home />} />
      <Route
        path={AppRouteEnums.LOGIN}
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path={AppRouteEnums.REGISTER}
        element={
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route path={AppRouteEnums.ABOUT} element={<About />} />
      <Route path={AppRouteEnums.AUTHOR} element={<Author />} />
      <Route path={AppRouteEnums.PROFILE} element={<Profile />} />
      <Route path={AppRouteEnums.ADD_BLOG} element={<AddBlogForm />} />
    </Routes>
  );
};

export default AppRoutes;
