import Login from "./pages/usersPage/Login/Login";
import Index from "./pages/usersPage/Index";
import Signup from "./pages/usersPage/SignUp/SignUp";
import Home from "./pages/postsPage/Home";
import Profile from "./pages/postsPage/Profile/Profile";
import Posts from "./pages/postsPage/Posts/Posts";
import { Route, Routes } from "react-router-dom";
import UsersProvider from "./context/users/usersProvider";
import { Toaster } from "react-hot-toast";
import CreatePost from "./components/CreatePost/CreatePost";
import EditProfile from "./pages/postsPage/EditProfile/EditProfile";
import FullPost from "./components/FullPost/FullPost";
import Config from "./pages/usersPage/Config";
import Following from "./pages/usersPage/Followers-Following/Following";
import Followers from "./pages/usersPage/Followers-Following/Followers";
import Searching from "./pages/postsPage/Searching/Searching";
import Notifications from "./pages/usersPage/Notifications/Notifications";

function App() {
  return (
    <div className="App">
      <UsersProvider>
        <Toaster
          toastOptions={{ style: { background: "black", color: "white" } }}
        />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />}>
            <Route path="notifications" element={<Notifications />} />
            <Route path="config" element={<Config />} />
            <Route path="searching" element={<Searching />} />
            <Route path="posts" element={<Posts />}>
              <Route path=":username/:postId" element={<FullPost />} />
            </Route>
            <Route path=":username" element={<Profile />}>
              <Route path="edit" element={<EditProfile />} />
              <Route path=":postId" element={<FullPost />} />
              <Route path="following" element={<Following />} />
              <Route path="followers" element={<Followers />} />
            </Route>
            <Route path="create" element={<CreatePost />} />
          </Route>
        </Routes>
      </UsersProvider>
    </div>
  );
}

export default App;
