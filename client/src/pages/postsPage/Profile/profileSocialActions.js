import { useUsers } from "../../../context/users/usersProvider";
import { useProfileFetch } from "./profileFetch";

export const useProfileSocialActions = () => {
  const {
    getUnicUserByUsername,
    userNameLogged,
    profile,
    followUserAction,
    setDataOfUserLogged,
    dataOfUserLogged,
    unFollowUserAction,
    setUsersFollowing,
    usersFollowing,
  } = useUsers();

  const { username } = useProfileFetch();

  const follow = {
    userFollowed: {
      followId: profile._id,
      followUsername: profile.username,
      followImage: profile.profileImage.url,
    },

    whoFollow: {
      followId: dataOfUserLogged._id,
      followUsername: dataOfUserLogged.username,
      followImage: dataOfUserLogged.profileImage.url,
    },
  };

  const updateUser = async () => {
    const updatedUserLogged = await getUnicUserByUsername(userNameLogged);
    await setDataOfUserLogged(updatedUserLogged);
    await setUsersFollowing(updatedUserLogged.following);
  };

  const FollowAction = async (follow) => {
    await followUserAction(userNameLogged, follow);
    updateUser();
  };

  const unFollowAction = async (follow) => {
    await unFollowUserAction(userNameLogged, follow);
    updateUser();
  };

  const userFollowing = usersFollowing.map((users) =>
    users.followUsername.toLowerCase()
  );

  const followAlreadyOrNot = () => {
    if (userFollowing.includes(username.toLowerCase()) === true) {
      return (
        <button
          onClick={() => {
            unFollowAction(follow);
          }}
        >
          Dejar de Seguir
        </button>
      );
    } else {
      return (
        <button
          onClick={() => {
            FollowAction(follow);
          }}
        >
          Seguir
        </button>
      );
    }
  };
  return { followAlreadyOrNot };
};
