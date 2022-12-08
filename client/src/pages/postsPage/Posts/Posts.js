import CreatePost from '../../../components/CreatePost/CreatePost';
import PostsCard from '../../../components/PostCard/PostsCard';
import { useUsers } from '../../../context/users/usersProvider';
import { Outlet } from 'react-router-dom';
import { usePostFetch } from './postsFetch';
import NewUsersPanel from '../../../components/NewUsersPanel/NewUsersPanel';

const Posts = () => {
  const { dataOfuserFollowed } = usePostFetch();

  const { FullScreenPost, dataOfUserLogged, usersFollowing } = useUsers();

  const mapOfPostsList = dataOfuserFollowed.map((posts) => {
    let alreadyLikedOrNot = false;

    posts.likes.filter((like) => {
      if (like.idUser.includes(dataOfUserLogged._id) === true) {
        alreadyLikedOrNot = true;
      }
      return alreadyLikedOrNot;
    });

    return (
      <PostsCard
        key={posts._id}
        author={posts.author}
        post={posts.content}
        imageUrl={posts.image?.url}
        id={posts._id}
        username={posts.author}
        date={posts.date}
        numbersOfLikes={posts.likes.length}
        alreadyLikedOrNot={alreadyLikedOrNot}
        numbersOfComments={posts.comments.length}
      />
    );
  });

  if (FullScreenPost) return <Outlet />;

  if (usersFollowing?.length < 3) {
    return (
      <div className='Inicio'>
        <CreatePost />
        <NewUsersPanel />
        {mapOfPostsList}
      </div>
    );
  }

  return (
    <div className='Inicio'>
      <CreatePost />
      {mapOfPostsList}
    </div>
  );
};

export default Posts;
