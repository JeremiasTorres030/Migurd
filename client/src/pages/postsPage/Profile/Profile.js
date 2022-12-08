import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useUsers } from "../../../context/users/usersProvider";
import PostsCard from "../../../components/PostCard/PostsCard";
import CreatePost from "../../../components/CreatePost/CreatePost";
import EditProfile from "../EditProfile/EditProfile";
import { useProfileFetch } from "./profileFetch";
import { useProfileSocialActions } from "./profileSocialActions";

const Profile = () => {
  const {
    editProfile,
    setEditProfile,
    profilePosts,
    userNameLogged,
    FullScreenPost,
    profile,
    dataOfUserLogged,
    followingScreen,
    setFollowingScreen,
    followersScreen,
    setFollowersScreen,
  } = useUsers();

  const { username } = useProfileFetch();

  const { followAlreadyOrNot } = useProfileSocialActions();

  const mapPosts = profilePosts.map((post) => {
    let alreadyLikedOrNot = false;

    post.likes.filter((like) => {
      if (like.idUser.includes(dataOfUserLogged._id) === true) {
        alreadyLikedOrNot = true;
      }
      return alreadyLikedOrNot;
    });

    return (
      <PostsCard
        authorImage={profile?.profileImage?.url}
        key={post._id}
        id={post._id}
        author={post.author}
        post={post.content}
        imageUrl={post.image?.url}
        username={username}
        date={post.date}
        numbersOfLikes={post.likes.length}
        alreadyLikedOrNot={alreadyLikedOrNot}
        numbersOfComments={post.comments.length}
      />
    );
  });

  if (FullScreenPost || followingScreen || followersScreen)
    return (
      <div className="Profile">
        <Outlet />
      </div>
    );

  return (
    <div className="Profile">
      {editProfile ? (
        <EditProfile />
      ) : (
        <div className="ProfileUser">
          <img
            className="BigProfilePicture"
            alt="BigProfilePicture"
            src={profile?.bigProfileImage?.url}
          />
          <img
            className="ProfilePicture"
            alt="ProfilePicture"
            src={profile?.profileImage?.url}
          />
          <div className="EditAndUsername">
            <h1>{profile.username}</h1>

            {userNameLogged === profile.username && (
              <Link
                to="edit"
                onClick={() => {
                  setEditProfile(true);
                }}
              >
                Editar Perfil
              </Link>
            )}

            {username !== userNameLogged && followAlreadyOrNot()}
          </div>
          <div className="social">
            <Link
              to={"following"}
              onClick={() => {
                setFollowingScreen(true);
              }}
            >
              Siguiendo {profile.following.length}
            </Link>

            <Link
              to={"followers"}
              onClick={() => {
                setFollowersScreen(true);
              }}
            >
              Seguidores {profile.followers.length}
            </Link>
          </div>
        </div>
      )}

      <div className="ProfilePosts">
        {userNameLogged === profile.username && <CreatePost />}
        {mapPosts}
      </div>
    </div>
  );
};

export default Profile;
