import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../../context/users/usersProvider";
export const useEditProfileFetch = () => {
  const {
    userNameLogged,
    editUser,
    setUserNameLogged,
    setDataOfUserLogged,
    getUnicUserByUsername,
    setProfile,
    profilePosts,
    newUsernameInPosts,
    setProfilePosts,
  } = useUsers();
  const navigate = useNavigate();

  const editProfileFetch = async (values) => {
    try {
      toast.loading("Editando...", { id: "editToast" });
      await editUser(userNameLogged, values);
      if (userNameLogged !== values.username) {
        const newUsername = profilePosts.map((posts) => ({
          ...posts,
          author: values.username,
        }));
        const newPosts = { posts: newUsername };
        const res = await newUsernameInPosts(values.username, newPosts);
        await setProfilePosts(res);
      }
      setUserNameLogged(values.username);
      const newData = await getUnicUserByUsername(values.username);
      setDataOfUserLogged(newData);
      setProfile(newData);
      toast.dismiss("editToast", "edit");
      toast.success("Editado con éxito.", { id: "edit" });
      navigate(`/home/${values.username}`);
    } catch (error) {
      toast.error("Error al editar.");
    }
  };

  return { editProfileFetch };
};
