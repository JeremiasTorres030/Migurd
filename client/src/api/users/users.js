import axios from 'axios';

/* GetAll/GetUnic/Delete/Edit User */

export const getAllUsersRequest = async () => {
  const response = await axios.get('/users');

  return response;
};

export const getUnicUserByUsernameRequest = async (username) => {
  const response = await axios.get(`/users/${username}`);

  return response;
};

export const getUnicUserByIdRequest = async (id) => {
  const response = await axios.get(`/user/${id}`);

  return response;
};

export const createUserRequest = async (user) => {
  const response = await axios.post('/users', user);

  return response;
};

export const editUserRequest = async (username, userEdited) => {
  const form = new FormData();

  for (let key in userEdited) {
    form.append(key, userEdited[key]);
  }

  const response = await axios.put(`/users/${username}`, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export const deleteUserRequest = async (username) => {
  const response = await axios.delete(`/users/${username}`);
  return response;
};

/* Auth Login */

export const getLoginUserRequest = async (email, password) => {
  const response = await axios.get(`/users/login/${email}/${password}`);

  return response;
};

/* Create/Delete/Update Username/Get  Post */

export const createNewPostRequest = async (username, newPost) => {
  const form = new FormData();

  for (let key in newPost) {
    form.append(key, newPost[key]);
  }

  const response = await axios.post(`/users/posts/${username}`, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export const deleteUnicPostByIdRequest = async (username, idOfPost) => {
  const response = await axios.delete(`/users/posts/${username}/${idOfPost}`);

  return response;
};

export const newUsernameInPostsRequest = async (username, newPosts) => {
  const response = await axios.put(
    `/users/posts/newusername/${username}`,
    newPosts
  );
  return response;
};

export const getOnlyPostsRequest = async (username) => {
  const response = await axios.get(`/users/posts/${username}`);
  return response;
};

/* Follow/Unfollow action */

export const followUserActionRequest = async (username, userFollowed) => {
  const response = await axios.put(
    `/users/social/follow/${username}`,
    userFollowed
  );

  return response;
};

export const unFollowUserActionRequest = async (username, userUnFollowed) => {
  const response = await axios.put(
    `/users/social/unfollow/${username}`,
    userUnFollowed
  );
  return response;
};

/* Post like/unlike action */

export const likePostActionRequest = async (id, postLiked) => {
  const response = await axios.put(`/users/social/like/${id}`, postLiked);

  return response;
};

export const disLikePostActionRequest = async (id, postDisLiked) => {
  const response = await axios.put(`/users/social/dislike/${id}`, postDisLiked);

  return response;
};

/*Create/Delete Comment  */

export const commentPostActionRequest = async (username, postId, comment) => {
  const response = await axios.post(
    `/users/social/comment/${username}/${postId}`,
    comment
  );
  return response;
};

export const deleteCommentActionRequest = async (author, idPost, commentId) => {
  const response = axios.delete(
    `/users/social/comment/${author}/${idPost}/${commentId}`
  );

  return response;
};

/*like/unlike Comment Action */

export const likeCommentActionRequest = async (
  idOfUserLogged,
  commentLiked
) => {
  const response = await axios.put(
    `/users/social/commentlike/like/${idOfUserLogged}`,
    commentLiked
  );
  return response;
};

export const disLikeCommentActionRequest = async (
  idOfUserLogged,
  commentDisLiked
) => {
  const response = axios.put(
    `/users/social/commentlike/unlike/${idOfUserLogged}`,
    commentDisLiked
  );
  return response;
};

export const deleteNotificationsActionRequest = async (idOfUser) => {
  const response = await axios.delete(
    `/users/social/notifications/${idOfUser}`
  );
  return response;
};

export const onClickNotificationActionRequest = async (username) => {
  const response = await axios.put(`/users/social/notifications/${username}`);
  return response;
};
