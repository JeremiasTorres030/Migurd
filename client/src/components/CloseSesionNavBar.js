import React from 'react';
import { IoMdExit, IoMdNotificationsOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../context/users/usersProvider';

const CloseSesionNavBar = () => {
  const {
    dataOfUserLogged,
    setLogin,
    setFullScreenPost,
    setEditProfile,
    setFollowingScreen,
    setFollowersScreen,
    onClickNotificationAction,
    userNameLogged,
  } = useUsers();
  const navigate = useNavigate();

  const onClickAllFalse = () => {
    setFullScreenPost(false);
    setEditProfile(false);
    setFollowingScreen(false);
    setFollowersScreen(false);
  };

  return (
    <div className='CloseSesionNavBar'>
      <div className='CloseSesionButtons'>
        <img
          src={dataOfUserLogged?.profileImage?.url}
          onClick={() => {
            onClickAllFalse();
            navigate('config');
          }}
          alt='UserLoggedImage'
        />
        <div className='CloseSesionNavBarNotifications'>
          <IoMdNotificationsOutline
            onClick={async () => {
              onClickAllFalse();
              await onClickNotificationAction(userNameLogged);
              navigate('notifications');
            }}
          />
          <p>{dataOfUserLogged.notifications.length}</p>
        </div>
        <IoMdExit
          onClick={() => {
            onClickAllFalse();
            navigate('/login');
            setLogin(false);
            localStorage.removeItem('migurdLoginSesion');
          }}
        />
      </div>
    </div>
  );
};

export default CloseSesionNavBar;
