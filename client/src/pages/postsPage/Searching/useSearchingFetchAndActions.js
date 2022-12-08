import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUsers } from "../../../context/users/usersProvider";
export const useSearchingFetchAndActions = () => {
  const [searching, setSearching] = useState("");
  const [listOfUsers, setListOfUsers] = useState(null);
  const [usersFoundedBar, setUsersFoundedBar] = useState([]);
  const {
    usersUsernamesAndPictures,
    setProfile,
    setProfilePosts,
    getUnicUserByUsername,
    setFollowingScreen,
    setFollowersScreen,
    setEditProfile,
    setFullScreenPost,
  } = useUsers();
  const navigate = useNavigate();

  const onClickSearching = async (username) => {
    const res = await getUnicUserByUsername(username);
    await setProfile(res);
    await setProfilePosts(res.posts);
    setFollowingScreen(false);
    setFollowersScreen(false);
    setEditProfile(false);
    setFullScreenPost(false);
    navigate(`/home/${username}`);
    setSearching("");
    setListOfUsers(false);
  };

  const onChangeSearching = (e) => {
    const value = e.target.value.toLowerCase();
    setSearching(value);
    const usersFounded = usersUsernamesAndPictures.filter((usernames) => {
      return usernames.username.toLowerCase().includes(value);
    });

    setUsersFoundedBar(usersFounded);
  };

  return {
    onClickSearching,
    onChangeSearching,
    searching,
    listOfUsers,
    usersFoundedBar,
    setSearching,
    setListOfUsers,
  };
};
