import { useNavigate } from "react-router-dom";
import { useUsers } from "../../../context/users/usersProvider";

export const useOnClickProfileFetch = () => {
  const navigate = useNavigate();
  const {
    setProfile,
    setProfilePosts,
    getUnicUserByUsername,
    setFollowersScreen,
    setFollowingScreen,
  } = useUsers();

  const onClickProfile = async (username) => {
    const res = await getUnicUserByUsername(username);
    setProfile(res);
    setProfilePosts(res?.posts);
    setFollowersScreen(false);
    setFollowingScreen(false);
    navigate(`/home/${username}`);
  };
  return { onClickProfile };
};
