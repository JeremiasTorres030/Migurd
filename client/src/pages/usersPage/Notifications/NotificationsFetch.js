import { useEffect, useState } from 'react';
import { useUsers } from '../../../context/users/usersProvider';
export const useNotificationFetch = () => {
  const { dataOfUserLogged, getUnicUserById, deleteNotificationsAction } =
    useUsers();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    gettigUsers();
    // eslint-disable-next-line
  }, [dataOfUserLogged.notifications]);

  const gettigUsers = async () => {
    const data = [];

    const { notifications, notificationsOff } = await getUnicUserById(
      dataOfUserLogged._id
    );

    if (notifications.length === 0) {
      for (let i = 0; i < notificationsOff.length; i++) {
        const { idUser, message, idPost, imgPost, typeNoti } =
          notificationsOff[i];
        const { username, profileImage } = await getUnicUserById(idUser);
        data.push({
          typeNoti,
          username,
          profileImage,
          message,
          id: i,
          idPost,
          imgPost,
        });
      }
      const finalData = data.sort((a, b) => b.id - a.id);
      setNotifications(finalData);
      setIsLoading(false);
    }

    for (let i = 0; i < notifications.length; i++) {
      const { idUser, message, idPost, imgPost, typeNoti } = notifications[i];
      const { username, profileImage } = await getUnicUserById(idUser);
      data.push({
        typeNoti,
        username,
        profileImage,
        message,
        id: i,
        idPost,
        imgPost,
      });
    }
    const finalData = data.sort((a, b) => b.id - a.id);
    setNotifications(finalData);
    setIsLoading(false);
  };

  const deleteNotifications = async () => {
    await deleteNotificationsAction(dataOfUserLogged._id);
    setNotifications([]);
  };

  return { notifications, isLoading, deleteNotifications };
};
