import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../../context/users/usersProvider';

export const useLogin = () => {
  const { setLogin, getLoginUser, setIsLoadingMainPage } = useUsers();
  const navigate = useNavigate();

  const loginFetch = async (values) => {
    try {
      const data = await getLoginUser(values.email, values.password);
      localStorage.setItem('migurdLoginSesion', JSON.stringify(data));
      setIsLoadingMainPage(false);
      setLogin(true);
      navigate('/home/posts');
    } catch (error) {
      toast.remove('ErrorLogin');
      toast.error('El email o la contraseña son incorrectas.', {
        id: 'ErrorLogin',
      });
    }
  };

  return { loginFetch };
};
