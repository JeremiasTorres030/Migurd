import React from "react";
import { useUsers } from "../../../context/users/usersProvider";
import { Link } from "react-router-dom";
import { useOnClickProfileFetch } from "./OnClickProfileFetch";

const Followers = () => {
  const { profile, setFollowersScreen } = useUsers();

  const { onClickProfile } = useOnClickProfileFetch();

  const mapOfUsers = profile.followers.map((users) => {
    return (
      <div key={users.followUsername} className="followingList">
        <img src={users.followImage} alt="UserImage" />
        <p
          onClick={() => {
            onClickProfile(users.followUsername);
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
          setFollowersScreen(false);
        }}
      >
        X
      </Link>
      <h1>Seguidores</h1>

      {profile.followers.length === 0 ? (
        <p>Parace que no hay nada para ver...</p>
      ) : (
        mapOfUsers
      )}
    </div>
  );
};

export default Followers;
