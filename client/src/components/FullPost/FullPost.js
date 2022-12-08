import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useUsers } from "../../context/users/usersProvider";
import PostsCard from "../PostCard/PostsCard";
import CreateComment from "../CreateComment/CreateComment";
import { useFullPost } from "./FullPostFetch";

const FullPost = () => {
  const { postId, username } = useParams();
  const { profilePosts, setFullScreenPost, dataOfUserLogged } = useUsers();
  const { picProfile } = useFullPost(username);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const exitFullScreenPost = () => {
    if (pathname.includes("posts")) {
      setFullScreenPost(false);
      navigate("/home/posts");
    }
    setFullScreenPost(false);
    navigate("../");
  };

  const [resultado] = profilePosts.filter((posts) => {
    return posts._id === postId;
  });

  let alreadyLikedOrNot = false;

  resultado.likes.map((like) => {
    if (like.idUser.includes(dataOfUserLogged._id) === true) {
      alreadyLikedOrNot = true;
    }

    return alreadyLikedOrNot;
  });

  return (
    <div className="fullScreenPost">
      <button
        className="goBack"
        onClick={() => {
          exitFullScreenPost();
        }}
      >
        X
      </button>
      <PostsCard
        authorImage={picProfile}
        id={resultado._id}
        author={resultado.author}
        post={resultado.content}
        imageUrl={resultado.image?.url}
        date={resultado.date}
        numbersOfLikes={resultado.likes.length}
        alreadyLikedOrNot={alreadyLikedOrNot}
        numbersOfComments={resultado.comments.length}
      />
      <CreateComment />
    </div>
  );
};

export default FullPost;
