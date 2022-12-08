import { useUsers } from "../../context/users/usersProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const useCommentCardActions = () => {
  const {
    likeCommentAction,
    disLikeCommentAction,
    setFullScreenPost,
    getUnicUserByUsername,
    setProfile,
    setProfilePosts,
    deleteCommentAction,
    dataOfUserLogged,
    getOnlyPosts,
  } = useUsers();

  const navigate = useNavigate();

  const onClickLikeCommentAction = async (authorOfPost, idPost, commentId) => {
    const commentLiked = { authorOfPost, idPost, commentId };
    await likeCommentAction(dataOfUserLogged._id, commentLiked);

    try {
      const response = await getOnlyPosts(authorOfPost);
      setProfilePosts(response);
    } catch (error) {
      toast.error("Algo ha salido mal :(.");
    }
  };

  const onClickDisLikeCommentAction = async (
    authorOfPost,
    idPost,
    commentId
  ) => {
    const commentDisLiked = { authorOfPost, idPost, commentId };
    try {
      await disLikeCommentAction(dataOfUserLogged._id, commentDisLiked);
      const response = await getOnlyPosts(authorOfPost);

      setProfilePosts(response);
    } catch (error) {
      toast.error("Algo ha salido mal :(.");
    }
  };

  const onClickDeleteCommentAction = async (
    authorOfPost,
    idPost,
    commentId
  ) => {
    try {
      const { posts } = await deleteCommentAction(
        authorOfPost,
        idPost,
        commentId
      );
      toast.dismiss("delete");
      toast.success("Comentario eliminado con éxito.", { id: "delete" });
      setProfilePosts(posts);
    } catch (error) {
      toast.error("Algo ha salido mal :(.");
    }
  };

  const onClickUsername = async (author) => {
    setFullScreenPost(false);
    const response = await getUnicUserByUsername(author);
    setProfile(response);
    setProfilePosts(response.posts);
    navigate(`/home/${author}`);
  };
  return {
    onClickDeleteCommentAction,
    onClickDisLikeCommentAction,
    onClickLikeCommentAction,
    onClickUsername,
  };
};
