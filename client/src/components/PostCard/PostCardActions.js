import { toast } from 'react-hot-toast';
import { useUsers } from '../../context/users/usersProvider';
import { useNavigate, useLocation } from 'react-router-dom';

export const usePostCard = () => {
  const {
    likePostAction,
    getOnlyPosts,
    disLikePostAction,
    setProfilePosts,
    dataOfUserLogged,
    setFullScreenPost,
    deletePost,
    userNameLogged,
  } = useUsers();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onClickLikeAction = async (author, id) => {
    const postLiked = { author, idPost: id };
    try {
      await likePostAction(dataOfUserLogged._id, postLiked);
      const response = await getOnlyPosts(author);
      setProfilePosts(response);
    } catch (error) {
      toast.error('Algo ha salido mal :(.');
    }
  };

  const onClickDisLikeAction = async (author, id) => {
    const postDisLiked = { author, idPost: id };
    try {
      await disLikePostAction(dataOfUserLogged._id, postDisLiked);
      const response = await getOnlyPosts(author);

      setProfilePosts(response);
    } catch (error) {
      toast.error('Algo ha salido mal :(.');
    }
  };

  const onClickCard = async (author, id) => {
    const response = await getOnlyPosts(author);

    setProfilePosts(response);

    setFullScreenPost(true);

    if (pathname.includes('posts') === true) {
      navigate(`/home/posts/${author}/${id}`);
    } else {
      navigate(`/home/${author}/${id}`);
    }
  };

  const deletePostAction = async (author, id) => {
    try {
      await deletePost(author, id);
      toast.remove('deletePost');
      toast.success('Post eliminado con éxito.', { id: 'deletePost' });
      const response = await getOnlyPosts(userNameLogged);
      setProfilePosts(response);
    } catch (error) {
      toast.error('Error al eliminar el post.');
    }
  };
  return {
    deletePostAction,
    onClickCard,
    onClickDisLikeAction,
    onClickLikeAction,
  };
};
