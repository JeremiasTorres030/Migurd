import { useState, useEffect } from 'react';
import { useUsers } from '../../../context/users/usersProvider';

export const usePostFetch = () => {
  const [dataOfuserFollowed, setDataOfUserFollowed] = useState([]);
  const {
    usersFollowing,
    getOnlyPosts,
    profilePosts,
    getUnicUserById,
    dataOfUserLogged,
    setDataOfUserLogged,
  } = useUsers();

  useEffect(() => {
    updateNotifications();
    //eslint-disable-next-line
  }, []);

  const updateNotifications = async () => {
    const response = await getUnicUserById(dataOfUserLogged._id);
    setDataOfUserLogged(response);
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, [usersFollowing, profilePosts]);

  const fetchPosts = async () => {
    const mapOfOnlyUsername = usersFollowing?.map((users) => {
      return users.followUsername;
    });

    const posts = [];

    if (mapOfOnlyUsername) {
      for (const usernames of mapOfOnlyUsername) {
        const response = await getOnlyPosts(usernames);
        posts.push(response);
      }

      getListOfAllPosts(posts);
    }
  };

  const getListOfAllPosts = (posts) => {
    const listOfAllPosts = [];
    for (let i = 0; i <= 5; i++) {
      posts.filter((posts) => {
        return listOfAllPosts.push(posts[i]);
      });
    }
    const cleanUndefined = listOfAllPosts.filter((posts) => {
      return posts !== undefined;
    });

    const finalListofPosts = cleanUndefined.sort((a, b) => {
      return b.id - a.id;
    });

    setDataOfUserFollowed(finalListofPosts);
  };

  return { dataOfuserFollowed };
};
