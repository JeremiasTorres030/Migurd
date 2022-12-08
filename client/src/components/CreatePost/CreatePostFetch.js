import { useUsers } from '../../context/users/usersProvider';
import { toast } from 'react-hot-toast';
export const useCreatePost = () => {
  const {
    profilePosts,
    setProfilePosts,
    createNewPost,
    getOnlyPosts,
    userNameLogged,
  } = useUsers();

  const createPostFetch = async (values) => {
    if (profilePosts.length >= 5) {
      toast.remove('limitPosts');
      toast.error('Límite de posts alcanzado.', { id: 'limitPosts' });
    } else {
      try {
        await createNewPost(userNameLogged, values);
        const res = await getOnlyPosts(userNameLogged);
        const ordenado = res.sort((a, b) => {
          return b.id - a.id;
        });
        await setProfilePosts(ordenado);
        toast.remove('createToast');
        toast.success('Post Creado con éxito.', { id: 'createToast' });
      } catch (error) {
        toast.error('Error al crear el post.');
      }
    }
  };
  return { createPostFetch };
};
