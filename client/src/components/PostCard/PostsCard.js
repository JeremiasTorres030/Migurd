import React from "react";
import { Link } from "react-router-dom";
import { useUsers } from "../../context/users/usersProvider";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { usePostCard } from "./PostCardActions";

const PostsCard = ({
  author,
  post,
  imageUrl,
  id,
  username,
  date,
  authorImage,
  numbersOfLikes,
  alreadyLikedOrNot,
  numbersOfComments,
}) => {
  const { userNameLogged, setFullScreenPost, usersFollowing } = useUsers();

  const {
    deletePostAction,
    onClickCard,
    onClickDisLikeAction,
    onClickLikeAction,
  } = usePostCard();

  const [image] = usersFollowing.filter((username) => {
    return username.followUsername === author;
  });

  return (
    <div
      className="PostsCard"
      id={id}
      onClick={() => {
        onClickCard(author, id);
      }}
    >
      <div className="UserAndOptions">
        <div className="imageAndUsername">
          <img
            src={image?.followImage || authorImage}
            alt="ProfilePostPicture"
          />
          <Link
            to={`/home/${author}`}
            onClick={(e) => {
              e.stopPropagation();
              setFullScreenPost(false);
            }}
          >
            {author}
          </Link>
        </div>
        <div className="PostsOptions">
          {username === userNameLogged && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                deletePostAction(author, id);
              }}
            >
              Eliminar
            </button>
          )}
        </div>
      </div>

      <h3>{post}</h3>
      {imageUrl && <img src={imageUrl} alt="postImage" className="postImage" />}
      <div className="commentsAndLikes">
        <div className="like">
          <p>{numbersOfLikes}</p>
          {alreadyLikedOrNot ? (
            <button
              className="unLikeAction"
              onClick={async (e) => {
                e.stopPropagation();
                await onClickDisLikeAction(author, id);
              }}
            >
              <AiFillHeart />
            </button>
          ) : (
            <button
              className="likeAction"
              onClick={async (e) => {
                e.stopPropagation();
                await onClickLikeAction(author, id);
              }}
            >
              <AiOutlineHeart />
            </button>
          )}
        </div>
        <div className="comments">
          <p>{numbersOfComments}</p>
          <BiComment />
        </div>
      </div>

      <p>{date}</p>
    </div>
  );
};

export default PostsCard;
