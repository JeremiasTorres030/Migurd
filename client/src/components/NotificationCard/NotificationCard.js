import React from 'react';
import { usePostCard } from '../PostCard/PostCardActions';
import { useUsers } from '../../context/users/usersProvider';
import { Link } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';

const NotificationCard = ({
  message,
  user,
  userImage,
  idPost,
  imgPost,
  typeNoti,
}) => {
  const { onClickCard } = usePostCard();
  const { userNameLogged, setFullScreenPost } = useUsers();


  return (
    <div
      className={idPost ? 'notificationCardClicked' : 'notificationCard'}
      onClick={async () => {
        if (idPost) {
          await onClickCard(userNameLogged, idPost);
        }
      }}
    >
      <div className='profileImageAndTypeOfNotification'>
        <img src={userImage} alt='userImage' className='ProfileImage' />
        {typeNoti === 'follow' && <FaUserPlus className='follow' />}
        {typeNoti === 'like' && <AiFillHeart className='like' />}
        {typeNoti === 'comment' && <BiComment className='comment' />}
      </div>

      <div className='userAndMessageNotification'>
        <Link
          to={`/home/${user}`}
          onClick={(e) => {
            e.stopPropagation();
            setFullScreenPost(false);
          }}
        >
          <strong>{user}</strong>
        </Link>
        <p>{message}</p>
      </div>

      {imgPost && (
        <img src={imgPost} alt='PostNotificationImage' className='PostImage' />
      )}
    </div>
  );
};

export default NotificationCard;
