import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useUsers } from '../../context/users/usersProvider';
export const useCreateComments = (resultado) => {
  const [finalComments, setFinalComments] = useState([]);

  const {
    getUnicUserById,
    profilePosts,
    setProfilePosts,
    dataOfUserLogged,
    commentPostAction,
  } = useUsers();

  useEffect(() => {
    fetchCommentsProfiles();
    // eslint-disable-next-line
  }, [profilePosts]);

  const fetchCommentsProfiles = async () => {
    const profilesAuthors = [];
    const ArrayOfComments = [];

    const mapOfIdAuthors = resultado.comments.map((comment) => {
      return comment.commentAuthorId;
    });

    for (const commentAuthorId of mapOfIdAuthors) {
      const { username, profileImage } = await getUnicUserById(commentAuthorId);
      const userObject = { username, profileImage: profileImage.url };

      profilesAuthors.push(userObject);
    }

    for (let i = 0; i < resultado.comments.length; i++) {
      const finalObjetct = {
        ...resultado.comments[i],
        ...profilesAuthors[i],
      };
      ArrayOfComments.push(finalObjetct);
    }

    const finalArrayOfComments = ArrayOfComments.sort((a, b) => {
      return b.commentId - a.commentId;
    });

    setFinalComments(finalArrayOfComments);
  };

  const createCommentOnSubmit = async (values, username, postId) => {
    const comment = {
      commentId: resultado.comments.length,
      commentAuthorId: dataOfUserLogged._id,
      commentContent: values.commentContent,
      commentLikes: [],
    };
    try {
      const { posts } = await commentPostAction(username, postId, comment);
      setProfilePosts(posts);
      return posts;
    } catch (error) {
      toast.error('algo ha salido mal :(');
    }
  };

  return { finalComments, createCommentOnSubmit };
};
