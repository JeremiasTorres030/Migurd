import React from "react";
import { useUsers } from "../../context/users/usersProvider";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useCommentCardActions } from "./CommnetCardActions";

const CommentCard = ({
  authorOfPost,
  idPost,
  commentId,
  author,
  authorImage,
  comment,
  numbersOfLikes,
  alreadyLikedOrNot,
}) => {
  const { userNameLogged } = useUsers();

  const {
    onClickDeleteCommentAction,
    onClickDisLikeCommentAction,
    onClickLikeCommentAction,
    onClickUsername,
  } = useCommentCardActions();

  return (
    <div className="commentCard">
      <div className="UserAndOptionsComment">
        <div className="imageAndUsername">
          <img src={authorImage} alt="userImage" />
          <p
            className="author"
            onClick={(e) => {
              onClickUsername(author);
            }}
          >
            {author}
          </p>
        </div>
        <div className="commentOptions">
          {author === userNameLogged && (
            <button
              onClick={() => {
                onClickDeleteCommentAction(authorOfPost, idPost, commentId);
              }}
            >
              Eliminar
            </button>
          )}
        </div>
      </div>

      <h3>{comment}</h3>
      <div className="likeComment">
        <p>{numbersOfLikes}</p>
        {alreadyLikedOrNot ? (
          <button
            className="unLikeCommentAction"
            onClick={() => {
              onClickDisLikeCommentAction(authorOfPost, idPost, commentId);
            }}
          >
            <AiFillHeart />
          </button>
        ) : (
          <button
            className="likeCommentAction"
            onClick={() => {
              onClickLikeCommentAction(authorOfPost, idPost, commentId);
            }}
          >
            <AiOutlineHeart />
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
