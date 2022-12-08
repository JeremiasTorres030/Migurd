import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUsers } from "../context/users/usersProvider";
import { IoMdExit } from "react-icons/io";

const UserLoggedCard = () => {
  const { setLogin, userNameLogged, dataOfUserLogged } = useUsers();
  const navigate = useNavigate();

  return (
    <div className="userCard">
      <img src={dataOfUserLogged.profileImage?.url} alt="ProfileImg" />
      <div className="usernameAndLogOut">
        <p> {userNameLogged}</p>

        <button
          onClick={() => {
            navigate("/login");
            setLogin(false);
            localStorage.removeItem("migurdLoginSesion");
          }}
        >
          <div className="buttonLink">
            <IoMdExit />
            <p>Cerrar Sesión</p>
          </div>
        </button>
      </div>
      <div className="usernameAndConfig">
        <Link to="config">...</Link>
      </div>
    </div>
  );
};

export default UserLoggedCard;
