import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Footer, Header } from '../../../layout/Layout';
import { useUsers } from '../../../context/users/usersProvider';
import { VscLoading } from 'react-icons/vsc';
import { useSignUp } from './SignUpFetch';

const Signup = () => {
  const { users } = useUsers();
  const { signUpFetch } = useSignUp();
  const existingUserName = users.map((users) => users.username);
  const existingEmail = users.map((users) => users.email);

  const verificationUsername = (username) => {
    let error;
    const includes = existingUserName.includes(username);

    if (includes === true) {
      error = 'Este nombre de usuario ya esta en uso.';
    }

    return error;
  };

  const verificationEmail = (email) => {
    let error;
    const includes = existingEmail.includes(email);

    if (includes === true) {
      error = 'Este correo ya esta en uso.';
    }

    return error;
  };
  return (
    <div className='signup'>
      <Header title='Registrarse' />

      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={Yup.object({
          username: Yup.string().required('Ingrese un nombre de usuario.'),
          email: Yup.string()
            .email('Correo no valido.')
            .required('Ingrese un correo.'),
          password: Yup.string().required('Ingrese una contraseña.'),
          passwordConfirmation: Yup.string()
            .required('Ingrese una contraseña de confirmación.')
            .oneOf(
              [Yup.ref('password'), null],
              'Las contraseñas deben coincidir.'
            ),
        })}
        onSubmit={async (values) => {
          await signUpFetch(values);
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className='singupForm'>
            <div className='Field'>
              <ErrorMessage component='p' name='username' />
              <Field
                component='input'
                name='username'
                type='text'
                placeholder='Nombre de usuario'
                validate={verificationUsername}
              />
            </div>
            <div className='Field'>
              <ErrorMessage component='p' name='email' />
              <Field
                component='input'
                name='email'
                type='email'
                placeholder='Correo'
                validate={verificationEmail}
              />
            </div>
            <div className='Field'>
              <ErrorMessage component='p' name='password' />
              <Field
                component='input'
                name='password'
                type='password'
                placeholder='Contraseña'
              />
            </div>
            <div className='Field'>
              <ErrorMessage component='p' name='passwordConfirmation' />
              <Field
                name='passwordConfirmation'
                component='input'
                type='password'
                placeholder='Confirmar contraseña'
              />
            </div>
            <button type='submit' disabled={isSubmitting}>
              {isSubmitting ? <VscLoading /> : 'Registrarse'}
            </button>
            <Link to='/login'>Iniciar Sesión</Link>
          </Form>
        )}
      </Formik>

      <Footer />
    </div>
  );
};

export default Signup;
