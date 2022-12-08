import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUsers } from "../../context/users/usersProvider";
import { useParams } from "react-router-dom";
import CommentCard from "../CommentCard/CommentCard";
import { useCreateComments } from "./CreateCommnetsFetch";

const CreateComment = () => {
  const { dataOfUserLogged, profilePosts } = useUsers();

  const { username, postId } = useParams();

  const [resultado] = profilePosts.filter((posts) => posts._id === postId);

  const { finalComments, createCommentOnSubmit } = useCreateComments(resultado);

  const commentsMap = finalComments.map((comments) => {
    let alreadyLikedOrNot = false;

    comments.commentLikes.filter((like) => {
      if (like.idUser.includes(dataOfUserLogged._id) === true) {
        alreadyLikedOrNot = true;
      }
      return alreadyLikedOrNot;
    });

    return (
      <CommentCard
        key={comments._id}
        author={comments.username}
        comment={comments.commentContent}
        authorImage={comments.profileImage}
        numbersOfLikes={comments.commentLikes.length}
        idPost={resultado._id}
        commentId={comments._id}
        authorOfPost={resultado.author}
        alreadyLikedOrNot={alreadyLikedOrNot}
      />
    );
  });

  return (
    <div className="commentPost">
      <Formik
        initialValues={{ commentContent: "" }}
        validationSchema={Yup.object().shape({
          commentContent: Yup.string().required("Intorduzca texto"),
        })}
        onSubmit={async (values, { resetForm }) => {
          await createCommentOnSubmit(values, username, postId);
          resetForm();
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <ErrorMessage component="p" name="commentContent" />
            <Field
              name="commentContent"
              placeholder="Comentar..."
              autoComplete="off"
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando" : "Enviar"}
            </button>
          </Form>
        )}
      </Formik>
      {commentsMap}
    </div>
  );
};

export default CreateComment;
