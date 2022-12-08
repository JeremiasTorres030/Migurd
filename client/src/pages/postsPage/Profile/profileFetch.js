import { useEffect } from 'react';
import { useUsers } from '../../../context/users/usersProvider';
import { useParams } from 'react-router-dom';

export const useProfileFetch = () => {
  const {
    getUnicUserByUsername,
    setProfilePosts,
    setProfile,
    getUnicUserById,
    dataOfUserLogged,
    setDataOfUserLogged,
  } = useUsers();
  const { username } = useParams();

  useEffect(() => {
    asyncGetProfile(username);
    updateNotifications();
    // eslint-disable-next-line
  }, []);

  const asyncGetProfile = async (username) => {
    const response = await getUnicUserByUsername(username);
    setProfile(response);
    await setProfilePosts(response?.posts);
  };

  const updateNotifications = async () => {
    const response = await getUnicUserById(dataOfUserLogged._id);
    setDataOfUserLogged(response);
  };

  return { username };
};
