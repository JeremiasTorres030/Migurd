import { useNavigate } from 'react-router-dom'
import { useUsers } from '../../../context/users/usersProvider'
export const useSignUp = () => {
  const {
    createUser,
    setUserNameLogged,
    setLogin,
    getLoginUser,
    setIsLoadingMainPage,
  } = useUsers()
  const navigate = useNavigate()
  const signUpFetch = async (values) => {
    try {
      const data = await createUser(values)
      await setUserNameLogged(values.username)
      await getLoginUser(values.email, values.password)
      await setIsLoadingMainPage(false)
      await setLogin(true)
      navigate('/home/posts')
      return data
    } catch (error) {
      navigate('/')
    }
  }
  return { signUpFetch }
}
