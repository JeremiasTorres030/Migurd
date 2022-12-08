import React from "react";
import { useUsers } from "../context/users/usersProvider";
import { NavLink } from "react-router-dom";
import { IoCreateOutline, IoSearchOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
const NavBarPhone = () => {
  const {
    setEditProfile,
    setFullScreenPost,
    setFollowersScreen,
    setFollowingScreen,
    setProfile,
    dataOfUserLogged,
    setProfilePosts,
    userNameLogged,
  } = useUsers();

  const onClickAllFalse = () => {
    setFullScreenPost(false);
    setEditProfile(false);
    setFollowingScreen(false);
    setFollowersScreen(false);
  };

  return (
    <div className="NavBarPhone">
      <div className="buttonsHome">
        <NavLink
          to="/home/posts"
          onClick={() => {
            onClickAllFalse();
          }}
          activeclassname="active"
        >
          <AiOutlineHome />
        </NavLink>
        <NavLink
          to={`/home/${userNameLogged}`}
          onClick={() => {
            setProfile(dataOfUserLogged);
            setProfilePosts(dataOfUserLogged.posts);
            onClickAllFalse();
          }}
          activeclassname="active"
        >
          <CgProfile />
        </NavLink>
        <NavLink
          to={"/home/create"}
          onClick={() => {
            onClickAllFalse();
          }}
          activeclassname="active"
        >
          <IoCreateOutline />
        </NavLink>
        <NavLink
          to={"/home/searching"}
          onClick={() => {
            onClickAllFalse();
          }}
          activeclassname="active"
        >
          <IoSearchOutline />
        </NavLink>
      </div>
    </div>
  );
};

export default NavBarPhone;
