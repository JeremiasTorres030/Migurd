import { Router } from 'express';
import {
  getAllUsers,
  deleteUser,
  editUser,
  getUnicUserByUsername,
  createUser,
  getLoginUser,
  getOnlyPosts,
  createPost,
  deleteUnicPostById,
  newUsernameInPosts,
  followUser,
  unFollowUser,
  getUnicUserById,
  likePost,
  disLikePost,
  commentPost,
  deleteComment,
  likeComment,
  unLikeComment,
  deleteNotifications,
  onCLickNotification,
} from '../controllers/users.controllers.js';

const router = Router();

router.get('/users', getAllUsers);

router.post('/users', createUser);

router.put('/users/:username', editUser);

router.delete('/users/:username', deleteUser);

router.get('/users/:username', getUnicUserByUsername);

router.get('/user/:id', getUnicUserById);

router.get('/users/login/:email/:password', getLoginUser);

router.get('/users/posts/:username', getOnlyPosts);

router.post('/users/posts/:username', createPost);

router.delete('/users/posts/:username/:idpost', deleteUnicPostById);

router.put('/users/posts/newusername/:username', newUsernameInPosts);

router.put('/users/social/follow/:username', followUser);

router.put('/users/social/unfollow/:username', unFollowUser);

router.put('/users/social/like/:id', likePost);

router.put('/users/social/dislike/:id', disLikePost);

router.post('/users/social/comment/:author/:idpost', commentPost);

router.delete(
  '/users/social/comment/:author/:idpost/:commentid',
  deleteComment
);
router.put('/users/social/commentlike/like/:idOfUserLogged', likeComment);

router.put('/users/social/commentlike/unlike/:idOfUserLogged', unLikeComment);

router.delete(
  `/users/social/notifications/:idOfUserLogged`,
  deleteNotifications
);

router.put(`/users/social/notifications/:username`, onCLickNotification);

export default router;
