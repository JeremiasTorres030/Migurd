import React from "react";
import { useUsers } from "../../../context/users/usersProvider";
import { Link } from "react-router-dom";
import { useOnClickProfileFetch } from "./OnClickProfileFetch";

const Following = () => {
  const { profile, setFollowingScreen } = useUsers();

  const { onClickProfile } = useOnClickProfileFetch();

  const mapOfUsers = profile.following.map((users) => {
    return (
      <div key={users.followUsername} className="followingList">
        <img src={users.followImage} alt="UserImage" />
        <p
          onClick={async () => {
            await onClickProfile(users.followUsername);
          }}
        >
          {users.followUsername}
        </p>
      </div>
    );
  });

  return (
    <div className="followingPage">
      <Link
        to="../"
        onClick={() => {
          setFollowingScreen(false);
        }}
      >
        X
      </Link>
      <h1>Siguiendo</h1>

      {profile.following.length === 0 ? (
        <p>Parace que no hay nada para ver...</p>
      ) : (
        mapOfUsers
      )}
    </div>
  );
};

export default Following;
