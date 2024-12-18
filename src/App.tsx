import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import About from "./pages/About";
import Author from "./pages/Author";
import Profile from "./pages/profile/Profile";
import AddBlogForm from "./pages/AddBlogForm";
import ProtectedRoute from "./guards/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/author/:authorName" element={<Author />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-blog" element={<AddBlogForm />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
