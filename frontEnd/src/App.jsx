import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./Pages/Home/HomePage";
import PostPage from "./Pages/Posts/PostPage";
import Articles from "./Pages/Articles/Articles";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CreatePost from "./Pages/crate-post/CreatePost";
import Footer from "./components/footer/Footer";
import { useEffect, useState } from "react";
import PostDetails from "./Pages/post-details/PostDetails";
import { ToastContainer } from "react-toastify";
import CategoryPage from "./Pages/category/CategoryPage";
import Profile from "./Pages/profile/Profile";
import UsersTable from "./Pages/Admin/components/userstable/UsersTable";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import NotFoundPage from "./Pages/not-found/NotFoundPage";
import { useSelector } from "react-redux";
import CategoryTable from "./Pages/Admin/components/categorytable/CategoryTable";
import PostTable from "./Pages/Admin/components/postTable/PostTable";
import CommentTable from "./Pages/Admin/components/commentTable/CommentTable";
import VerifyEmailPage from "./Pages/verfiyEmail/VerifyEmailPage";
import ForgetPassword from "./Pages/forgetpassword/ForgetPassword";
import ResetPassword from "./Pages/resetPassword/ResetPassword";
function App() {
  const { user } = useSelector((state) => state.auth);
  const [post, setPost] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (
      location.pathname.includes("create-post") ||
      location.pathname.includes("details")
    ) {
      setPost(true);
    } else {
      setPost(false);
    }
  }, [location.pathname]);

  return (
    <>
      <div className={`bg-[${post ? "#efefef" : ""}]`}>
        <NavBar />
      </div>
      <ToastContainer
        theme="colored"
        autoClose={1000}
        position="top-center"
        className={"z-[100000]"}
      />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/articles" element={<Articles />}></Route>
        <Route path="admin-dashboard">
          <Route
            index
            element={user?.isAdmin ? <AdminDashboard /> : <Navigate to={"/"} />}
          />
          <Route
            path="users-table"
            element={user?.isAdmin ? <UsersTable /> : <Navigate to={"/"} />}
          />
          <Route
            path="categories"
            element={user?.isAdmin ? <CategoryTable /> : <Navigate to={"/"} />}
          />
          <Route
            path="posts"
            element={user?.isAdmin ? <PostTable /> : <Navigate to={"/"} />}
          />
          <Route
            path="comments"
            element={user?.isAdmin ? <CommentTable /> : <Navigate to={"/"} />}
          />
        </Route>

        <Route
          path="/create-post"
          element={user ? <CreatePost /> : <Navigate to={"/"} />}></Route>
        <Route path="posts">
          <Route index element={<PostPage />}></Route>
          <Route path="details/:id" element={<PostDetails />}></Route>
          <Route path="categories/:category" element={<CategoryPage />}></Route>
        </Route>
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to={"/"} />}
        />
        <Route
          path="/auth/login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/forget-password"
          element={!user ? <ForgetPassword /> : <Navigate to={"/"} />}
        />
        <Route
          path="/reset-password/:userId/:token"
          element={!user ? <ResetPassword /> : <Navigate to={"/"} />}
        />
        <Route
          path="/auth/register"
          element={!user ? <Register /> : <Navigate to={"/"} />}
        />
        <Route
          path="/users/:userId/verify/:token"
          element={!user ? <VerifyEmailPage /> : <Navigate to={"/"} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
