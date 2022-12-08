import { useEffect, createContext, useContext, useState } from 'react';
import {
  getAllUsersRequest,
  createUserRequest,
  getUnicUserByUsernameRequest,
  getLoginUserRequest,
  editUserRequest,
  getOnlyPostsRequest,
  createNewPostRequest,
  deleteUnicPostByIdRequest,
  deleteUserRequest,
  newUsernameInPostsRequest,
  followUserActionRequest,
  unFollowUserActionRequest,
  getUnicUserByIdRequest,
  likePostActionRequest,
  disLikePostActionRequest,
  commentPostActionRequest,
  deleteCommentActionRequest,
  likeCommentActionRequest,
  disLikeCommentActionRequest,
  deleteNotificationsActionRequest,
  onClickNotificationActionRequest,
} from '../../api/users/users';
import { useNavigate } from 'react-router-dom';

const contextUsers = createContext();

export const useUsers = () => {
  const context = useContext(contextUsers);

  return context;
};

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLogged, setLogin] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [FullScreenPost, setFullScreenPost] = useState(false);
  const [followingScreen, setFollowingScreen] = useState(false);
  const [followersScreen, setFollowersScreen] = useState(false);
  const [isLoadingMainPage, setIsLoadingMainPage] = useState(true);
  const [userNameLogged, setUserNameLogged] = useState('');
  const [profilePosts, setProfilePosts] = useState([]);
  const [usersUsernamesAndPictures, setUsersUsernameAndPictures] = useState([]);
  const [usersFollowing, setUsersFollowing] = useState([]);
  const [dataOfUserLogged, setDataOfUserLogged] = useState({});
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    asyncLocalSesion();
    getAllUsers();
    // eslint-disable-next-line
  }, []);

  const asyncLocalSesion = async () => {
    const checkSesion = localStorage.getItem('migurdLoginSesion');

    if (checkSesion) {
      let json = JSON.parse(checkSesion);
      const response = await getUnicUserById(json._id);
      json = response;
      localStorage.setItem('migurdLoginSesion', JSON.stringify(json));
      if (json) {
        setDataOfUserLogged(json);
        setProfile(json);
        setUserNameLogged(json.username);
        setUsersFollowing(json.following);
        setIsLoadingMainPage(false);
        setLogin(true);
        navigate('/home/posts');
      }
    }
  };

  const getAllUsers = async () => {
    const response = await getAllUsersRequest();
    setUsers(response.data);

    const usernamesAndPictures = response.data.map((users) => {
      const dataOfPicturesAndUsernames = {
        username: users.username,
        picture: users.profileImage.url,
      };
      return dataOfPicturesAndUsernames;
    });

    setUsersUsernameAndPictures(usernamesAndPictures);
  };

  const createUser = async (user) => {
    const response = await createUserRequest(user);
    localStorage.setItem('migurdLoginSesion', JSON.stringify(response.data));
    return response.data;
  };

  const editUser = async (username, userEdited) => {
    await editUserRequest(username, userEdited);
    await getAllUsers();
  };

  const deleteUser = async (username) => {
    await deleteUserRequest(username);
    await getAllUsers();
  };

  const getUnicUserByUsername = async (username) => {
    const response = await getUnicUserByUsernameRequest(username);

    return response.data;
  };

  const getUnicUserById = async (id) => {
    const response = await getUnicUserByIdRequest(id);
    return response.data;
  };

  const getLoginUser = async (email, password) => {
    const { data } = await getLoginUserRequest(email, password);
    setUserNameLogged(data.username);
    setProfilePosts(data.posts);
    setUsersFollowing(data.following);
    setDataOfUserLogged(data);
    setProfile(data);
    return data;
  };

  const getOnlyPosts = async (username) => {
    const response = await getOnlyPostsRequest(username);
    return response.data;
  };

  const createNewPost = async (username, newPost) => {
    const response = await createNewPostRequest(username, newPost);
    return response;
  };

  const deletePost = async (username, idOfPost) => {
    await deleteUnicPostByIdRequest(username, idOfPost);
  };

  const newUsernameInPosts = async (username, newPosts) => {
    const response = await newUsernameInPostsRequest(username, newPosts);
    return response.data;
  };

  const followUserAction = async (username, userFollowed) => {
    await followUserActionRequest(username, userFollowed);
  };

  const unFollowUserAction = async (username, userUnFollowed) => {
    await unFollowUserActionRequest(username, userUnFollowed);
  };

  const likePostAction = async (author, postLiked) => {
    const response = await likePostActionRequest(author, postLiked);
    return response.data;
  };

  const disLikePostAction = async (author, postDisLiked) => {
    const response = await disLikePostActionRequest(author, postDisLiked);
    return response.data;
  };

  const commentPostAction = async (username, postId, comment) => {
    const response = await commentPostActionRequest(username, postId, comment);
    return response.data;
  };

  const deleteCommentAction = async (author, idPost, commentId) => {
    const response = await deleteCommentActionRequest(
      author,
      idPost,
      commentId
    );
    return response.data;
  };

  const likeCommentAction = async (author, commentLiked) => {
    const response = await likeCommentActionRequest(author, commentLiked);
    return response.data;
  };

  const disLikeCommentAction = async (author, commentDisLiked) => {
    const response = await disLikeCommentActionRequest(author, commentDisLiked);
    return response.data;
  };

  const deleteNotificationsAction = async (idOfUser) => {
    const response = await deleteNotificationsActionRequest(idOfUser);
    setDataOfUserLogged(response.data);
  };

  const onClickNotificationAction = async (username) => {
    const response = await onClickNotificationActionRequest(username);
    if (response.data !== 'OK') {
      setDataOfUserLogged(response.data);
    }
    return response.data;
  };

  return (
    <contextUsers.Provider
      value={{
        users,
        createUser,
        getUnicUserByUsername,
        editUser,
        editProfile,
        setEditProfile,
        deleteUser,
        getUnicUserById,
        onClickNotificationAction,

        getLoginUser,
        isLogged,
        setLogin,
        userNameLogged,
        setUserNameLogged,
        dataOfUserLogged,
        setDataOfUserLogged,

        profilePosts,
        setProfilePosts,
        getOnlyPosts,
        createNewPost,
        deletePost,
        FullScreenPost,
        setFullScreenPost,

        usersUsernamesAndPictures,
        profile,
        setProfile,
        newUsernameInPosts,

        followUserAction,
        unFollowUserAction,
        likePostAction,
        disLikePostAction,
        commentPostAction,
        deleteCommentAction,
        likeCommentAction,
        disLikeCommentAction,

        followingScreen,
        setFollowingScreen,
        followersScreen,
        setFollowersScreen,
        usersFollowing,
        setUsersFollowing,

        isLoadingMainPage,
        setIsLoadingMainPage,
        deleteNotificationsAction,
      }}
    >
      {children}
    </contextUsers.Provider>
  );
};

export default UsersProvider;
