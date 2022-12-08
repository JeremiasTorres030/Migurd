import { useEffect, useState } from 'react';
import { useUsers } from '../../context/users/usersProvider';
export const useNewPanelUsers = () => {
  const [usersSuggested, setUsersSuggested] = useState();
  const [loadingPanel, setLoadingPanel] = useState(true);
  useEffect(() => {
    usersTest();
    // eslint-disable-next-line
  }, []);

  const {
    getUnicUserByUsername,
    dataOfUserLogged,
    followUserAction,
    userNameLogged,
    setDataOfUserLogged,
    setUsersFollowing,
    unFollowUserAction,
  } = useUsers();
  const usersSuggestedArray = ['JeremiasTorres', 'Knight', 'User'];

  const followActionOnClick = async (users) => {
    const follow = {
      userFollowed: {
        followId: users._id,
        followUsername: users.username,
        followImage: users.profileImage.url,
      },

      whoFollow: {
        followId: dataOfUserLogged._id,
        followUsername: dataOfUserLogged.username,
        followImage: dataOfUserLogged.profileImage.url,
      },
    };

    await followUserAction(userNameLogged, follow);
    const response = await getUnicUserByUsername(userNameLogged);
    setDataOfUserLogged(response);
    setUsersFollowing(response.following);
  };

  const unFollowActionOnClick = async (users) => {
    const follow = {
      userFollowed: {
        followId: users._id,
        followUsername: users.username,
        followImage: users.profileImage.url,
      },

      whoFollow: {
        followId: dataOfUserLogged._id,
        followUsername: dataOfUserLogged.username,
        followImage: dataOfUserLogged.profileImage.url,
      },
    };

    await unFollowUserAction(userNameLogged, follow);
    const response = await getUnicUserByUsername(userNameLogged);
    setDataOfUserLogged(response);
    setUsersFollowing(response.following);
  };

  const usersTest = async () => {
    const data = [];

    for (let name of usersSuggestedArray) {
      const res = await getUnicUserByUsername(name);
      data.push(res);
    }
    setUsersSuggested(data);
    setLoadingPanel(false);
  };

  return {
    unFollowActionOnClick,
    followActionOnClick,
    usersSuggested,
    loadingPanel,
  };
};
