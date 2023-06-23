import { users } from '../models/usersModel.js'
import { CONTRASENA_HASH } from '../env.config.js'
import CryptoJS from 'crypto-js'
import {
  uploadPostImage,
  uploadProfilePicture,
  uploadProfileBigPicture,
  deletePostPost,
} from '../libs/cloudinary.js'
import fs from 'fs-extra'

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find()
    res.json(allUsers)
  } catch (error) {
    console.log(error.message)
  }
}

export const createUser = async (req, res) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.HmacMD5(req.body.password, CONTRASENA_HASH).toString(),
    profileImage: {
      url: 'https://res.cloudinary.com/drifqbdtu/image/upload/v1657229956/Migurd/ProfilePictures/DefaultProfilePicture_xg8sgf.jpg',
      public_id: 'Migurd/ProfilePictures/DefaultProfilePicture_xg8sgf',
    },
    bigProfileImage: {
      url: 'https://res.cloudinary.com/drifqbdtu/image/upload/v1657043337/Migurd/ProfileBigPicture/Portada_oz0duu.jpg',
      public_id: 'Migurd/ProfileBigPicture/Portada_oz0duu',
    },
  }

  try {
    const createUser = await users.create(user)
    res.json(createUser)
  } catch (error) {
    console.log(error)
    res.json(error.message)
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { username } = req.params
    const deletedUser = await users.findOneAndDelete({ username })
    res.json(deletedUser)
  } catch (error) {
    console.log(error.message)
  }
}

export const editUser = async (req, res) => {
  const { username } = req.params
  let bigProfileImage
  let profileImage

  // Only Profile Image

  if (req.body.bigProfileImage && !req.body.profileImage) {
    try {
      const response = await uploadProfilePicture(
        req.files.profileImage.tempFilePath
      )
      fs.remove(req.files.profileImage.tempFilePath)

      profileImage = {
        url: response.secure_url,
        public_id: response.public_id,
      }

      const userEdited = await users.findOneAndUpdate(
        { username },
        { username: req.body.username, profileImage },
        { new: true }
      )

      userEdited.followers?.forEach(async (followers) => {
        const { following } = await users.findById(followers.followId)

        const unicFollowing = following?.filter((following) => {
          return following.followUsername === username
        })

        const editedUnicFollowing = (unicFollowing[0] = {
          followId: unicFollowing[0]?.followId,
          followImage: response.secure_url,
          followUsername: req.body.username,
        })

        const allFollowing = following.filter((following) => {
          return following.followUsername !== username
        })

        allFollowing.push(editedUnicFollowing)

        await users.findByIdAndUpdate(
          followers.followId,
          { following: allFollowing },
          { new: true }
        )
      })

      userEdited.following?.forEach(async (following) => {
        const { followers } = await users.findById(following.followId)

        const unicFollowers = followers?.filter((follower) => {
          return follower.followUsername === username
        })

        const editedUnicFollowers = (unicFollowers[0] = {
          followId: unicFollowers[0]?.followId,
          followImage: response.secure_url,
          followUsername: req.body.username,
        })

        const allFollowers = followers.filter((follower) => {
          return follower.followUsername !== username
        })

        allFollowers.push(editedUnicFollowers)

        await users.findByIdAndUpdate(
          following.followId,
          { followers: allFollowers },
          { new: true }
        )
      })

      res.json(userEdited)
    } catch (error) {
      console.log(error)
      res.json({ message: error.message })
    }
  }

  // Only Big Profile Image

  if (req.body.profileImage && !req.body.bigProfileImage) {
    try {
      const response = await uploadProfileBigPicture(
        req.files.bigProfileImage.tempFilePath
      )

      fs.remove(req.files.bigProfileImage.tempFilePath)

      bigProfileImage = {
        url: response.secure_url,
        public_id: response.public_id,
      }

      const userEdited = await users.findOneAndUpdate(
        { username },
        { username: req.body.username, bigProfileImage },
        { new: true }
      )

      res.json(userEdited)
    } catch (error) {
      res.json({ message: error.message })
    }
  }

  //Both images

  if (!req.body.bigProfileImage && !req.body.profileImage) {
    try {
      const responseBigProfile = await uploadProfileBigPicture(
        req.files.bigProfileImage.tempFilePath
      )
      fs.remove(req.files.bigProfileImage.tempFilePath)
      const responseProfile = await uploadProfilePicture(
        req.files.profileImage.tempFilePath
      )
      fs.remove(req.files.profileImage.tempFilePath)

      bigProfileImage = {
        url: responseBigProfile.secure_url,
        public_id: responseBigProfile.public_id,
      }

      profileImage = {
        url: responseProfile.secure_url,
        public_id: responseProfile.public_id,
      }

      const userEdited = await users.findOneAndUpdate(
        { username },
        { username: req.body.username, profileImage, bigProfileImage },
        { new: true }
      )

      userEdited.followers?.forEach(async (followers) => {
        const { following } = await users.findById(followers.followId)

        const unicFollowing = following?.filter((following) => {
          return following.followUsername === username
        })

        const editedUnicFollowing = (unicFollowing[0] = {
          followId: unicFollowing[0]?.followId,
          followImage: responseProfile.secure_url,
          followUsername: req.body.username,
        })

        const allFollowing = following.filter((following) => {
          return following.followUsername !== username
        })

        allFollowing.push(editedUnicFollowing)

        await users.findByIdAndUpdate(
          followers.followId,
          { following: allFollowing },
          { new: true }
        )
      })

      userEdited.following?.forEach(async (following) => {
        const { followers } = await users.findById(following.followId)

        const unicFollowers = followers?.filter((follower) => {
          return follower.followUsername === username
        })

        const editedUnicFollowers = (unicFollowers[0] = {
          followId: unicFollowers[0]?.followId,
          followImage: responseProfile.secure_url,
          followUsername: req.body.username,
        })

        const allFollowers = followers.filter((follower) => {
          return follower.followUsername !== username
        })

        allFollowers.push(editedUnicFollowers)

        await users.findByIdAndUpdate(
          following.followId,
          { followers: allFollowers },
          { new: true }
        )
      })

      res.json(userEdited)
    } catch (error) {
      res.json({ message: error.message })
    }
  }

  //Only username

  if (req.body.bigProfileImage && req.body.profileImage) {
    try {
      const userEdited = await users.findOneAndUpdate(
        { username },
        { username: req.body.username },
        { new: true }
      )

      userEdited.followers?.forEach(async (followers) => {
        const { following } = await users.findById(followers.followId)

        const unicFollowing = following?.filter((following) => {
          return following.followUsername === username
        })

        const editedUnicFollowing = (unicFollowing[0] = {
          followId: unicFollowing[0]?.followId,
          followImage: unicFollowing[0]?.followImage,
          followUsername: req.body.username,
        })

        const allFollowing = following.filter((following) => {
          return following.followUsername !== username
        })

        allFollowing.push(editedUnicFollowing)

        await users.findByIdAndUpdate(
          followers.followId,
          { following: allFollowing },
          { new: true }
        )
      })

      userEdited.following?.forEach(async (following) => {
        const { followers } = await users.findById(following.followId)

        const unicFollowers = followers?.filter((follower) => {
          return follower.followUsername === username
        })

        const editedUnicFollowers = (unicFollowers[0] = {
          followId: unicFollowers[0]?.followId,
          followImage: unicFollowers[0]?.followImage,
          followUsername: req.body.username,
        })

        const allFollowers = followers.filter((follower) => {
          return follower.followUsername !== username
        })

        allFollowers.push(editedUnicFollowers)

        await users.findByIdAndUpdate(
          following.followId,
          { followers: allFollowers },
          { new: true }
        )
      })

      res.json(userEdited)
    } catch (error) {
      console.log(error)
      res.json({ message: error.message })
    }
  }
}

export const getUnicUserByUsername = async (req, res) => {
  const { username } = req.params

  try {
    const unicUser = await users.findOne({ username })
    res.json(unicUser)
  } catch (error) {
    console.log(error.message)
  }
}

export const getUnicUserById = async (req, res) => {
  const { id } = req.params

  try {
    const response = await users.findById(id)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
}

export const getLoginUser = async (req, res) => {
  const { email, password } = req.params

  const hashPassword = CryptoJS.HmacMD5(password, CONTRASENA_HASH).toString()

  try {
    const loggedUser = await users.findOne({
      email,
      password: hashPassword,
    })
    if (loggedUser === null) {
      res.status(404)
    }
    res.json(loggedUser)
  } catch (error) {
    res.json({ message: 'no se pudo iniciar sesion' })
    console.log(error.message)
  }
}

export const getOnlyPosts = async (req, res) => {
  const { username } = req.params

  try {
    const post = await users.findOne({ username })
    res.json(post.posts)
  } catch (error) {}
}

export const createPost = async (req, res) => {
  const { author, content } = req.body
  const { username } = req.params
  let image

  const newDate = new Date()

  const day = newDate.getDate()
  const month = newDate.getMonth()
  const year = newDate.getFullYear()
  const hour = newDate.getHours()
  const minutes = newDate.getMinutes()

  const date = hour + ':' + minutes + ' ' + day + '/' + month + '/' + year

  const { posts } = await users.findOne({ username })

  if (req.files?.image) {
    const result = await uploadPostImage(req.files.image.tempFilePath)

    await fs.remove(req.files.image.tempFilePath)
    image = {
      url: result.secure_url,
      public_id: result.public_id,
    }
  }

  const newPost = {
    id: posts.length,
    author,
    content,
    image,
    date,
  }

  posts.push(newPost)

  const ordenado = posts.sort((a, b) => {
    return b.id - a.id
  })

  try {
    await users.findOneAndUpdate(
      { username },
      { posts: ordenado },
      {
        new: true,
      }
    )
    res.json({ message: 'Post Creado' })
  } catch (error) {
    console.log(error)
  }
}

export const deleteUnicPostById = async (req, res) => {
  const { username, idpost } = req.params
  const response = await users.findOne({ username })

  const eliminarimagen = response.posts.filter((posts) => {
    return posts._id.toString() === idpost
  })

  if (eliminarimagen[0]?.image?.public_id) {
    await deletePostPost(eliminarimagen[0].image.public_id)
  }

  const eliminado = response.posts.filter((post) => {
    return post._id.toString() !== idpost
  })

  response.posts = eliminado

  try {
    const postDeleted = await users.findOneAndUpdate({ username }, response, {
      new: true,
    })
    res.json(postDeleted)
  } catch (error) {
    res.json(error)
  }
}

export const newUsernameInPosts = async (req, res) => {
  const { username } = req.params

  try {
    const response = await users.findOneAndUpdate({ username }, req.body, {
      new: true,
    })

    res.json(response.posts)
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const followUser = async (req, res) => {
  const { userFollowed, whoFollow } = req.body

  const { followers, notifications } = await users.findOne({
    username: userFollowed.followUsername,
  })
  const { following } = await users.findOne({
    username: whoFollow.followUsername,
  })

  following.push(userFollowed)
  followers.push(whoFollow)

  const noty = {
    idUser: whoFollow.followId,
    message: `te siguió`,
    typeNoti: 'follow',
  }

  notifications.push(noty)

  try {
    const response = await users.findOneAndUpdate(
      { username: whoFollow.followUsername },
      { following },
      { new: true }
    )
    await users.findOneAndUpdate(
      { username: userFollowed.followUsername },
      { followers, notifications },
      { new: true }
    )

    res.json(response)
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const unFollowUser = async (req, res) => {
  const { username } = req.params
  const { userFollowed, whoFollow } = req.body

  const { following } = await users.findOne({ username })
  const { followers } = await users.findOne({
    username: userFollowed.followUsername,
  })

  const unFollowFollowing = following.filter((users) => {
    return users.followUsername !== userFollowed.followUsername
  })

  const unFollowFollowers = followers.filter((users) => {
    return users.followUsername !== whoFollow.followUsername
  })

  try {
    const response = await users.findOneAndUpdate(
      { username },
      { following: unFollowFollowing },
      { new: true }
    )

    await users.findOneAndUpdate(
      { username: userFollowed.followUsername },
      { followers: unFollowFollowers },
      { new: true }
    )
    res.json(response)
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const likePost = async (req, res) => {
  const { id } = req.params
  const { author, idPost } = req.body

  const { username } = await users.findById(id)

  const { posts, notifications } = await users.findOne({ username: author })

  const [likedPost] = posts.filter((post) => {
    return post._id.toString() === idPost
  })

  likedPost.likes.push({ idUser: id })

  if (author !== username) {
    const noty = {
      idUser: id,
      message: `le ha dado like a tu post :${likedPost.content}`,
      imgPost: likedPost.image?.url,
      idPost,
      typeNoti: 'like',
    }
    notifications.push(noty)
  }
  try {
    const response = await users.findOneAndUpdate(
      { username: author },
      { posts, notifications },
      { new: true }
    )
    res.json(response)
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const disLikePost = async (req, res) => {
  const { id } = req.params //id del usuario logeado
  const { author, idPost } = req.body // author y id del post

  const { posts } = await users.findOne({ username: author })

  const allPosts = posts.filter((post) => {
    return post._id.toString() !== idPost
  })

  const disLikedPost = posts.filter((post) => {
    return post._id.toString() === idPost
  })

  const disLikeAction = disLikedPost[0].likes.filter((like) => {
    return like.idUser !== id
  })

  disLikedPost[0].likes = disLikeAction

  const finalPost = [...allPosts, ...disLikedPost]

  const finalPostOrdenado = finalPost.sort((a, b) => {
    return b.id - a.id
  })

  try {
    const response = await users.findOneAndUpdate(
      { username: author },
      { posts: finalPostOrdenado },
      { new: true }
    )

    res.json(response)
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const commentPost = async (req, res) => {
  const { author, idpost } = req.params

  const { commentAuthorId, commentContent } = req.body

  let { posts, notifications } = await users.findOne({ username: author })

  const { username } = await users.findById(commentAuthorId)

  const [unicPost] = posts.filter((posts) => posts._id.toString() === idpost)

  const allPosts = posts.filter((posts) => posts._id.toString() !== idpost)

  unicPost.comments.push(req.body)

  allPosts.push(unicPost)

  posts = allPosts

  if (author !== username) {
    const noty = {
      idUser: commentAuthorId,
      message: ` ha comentado "${commentContent}" en :${unicPost.content}`,
      imgPost: unicPost.image?.url,
      idPost: idpost,
      typeNoti: 'comment',
    }
    notifications.push(noty)
  }

  try {
    const response = await users.findOneAndUpdate(
      { username: author },
      { posts, notifications },
      { new: true }
    )

    res.json(response)
  } catch (error) {
    console.log(error)
  }
}

export const deleteComment = async (req, res) => {
  const { author, idpost, commentid } = req.params

  let { posts } = await users.findOne({ username: author })

  let [unicPost] = posts.filter((posts) => posts._id.toString() === idpost)

  const deleteComment = unicPost.comments.filter(
    (comment) => comment._id.toString() !== commentid
  )

  unicPost.comments = deleteComment

  const allComments = posts.filter((posts) => posts._id.toString() !== idpost)

  allComments.push(unicPost)

  posts = allComments

  try {
    const response = await users.findOneAndUpdate(
      { username: author },
      { posts },
      { new: true }
    )
    res.json(response)
  } catch (error) {
    console.log(error)
  }
}

export const likeComment = async (req, res) => {
  const { idOfUserLogged } = req.params
  const { authorOfPost, idPost, commentId } = req.body

  let { posts } = await users.findOne({ username: authorOfPost })

  const [unicPost] = posts.filter((post) => post._id.toString() === idPost)

  const [unicComment] = unicPost.comments.filter(
    (comment) => comment._id.toString() === commentId
  )

  const objectLikeUser = {
    idUser: idOfUserLogged,
  }

  unicComment.commentLikes.push(objectLikeUser)

  const allComments = unicPost.comments.filter(
    (comment) => comment._id.toString() !== commentId
  )

  allComments.push(unicComment)

  unicPost.comments = allComments

  const allPosts = posts.filter((posts) => posts._id.toString() !== idPost)

  allPosts.push(unicPost)

  const allPostsFinal = allPosts.sort((a, b) => {
    return b.id - a.id
  })

  posts = allPostsFinal

  try {
    const response = await users.findOneAndUpdate(
      { username: authorOfPost },
      { posts },
      { new: true }
    )
    res.json(response)
  } catch (error) {
    console.log(error)
  }
}

export const unLikeComment = async (req, res) => {
  const { idOfUserLogged } = req.params
  const { authorOfPost, idPost, commentId } = req.body

  let { posts } = await users.findOne({ username: authorOfPost })

  const [unicPost] = posts.filter((post) => post._id.toString() === idPost)

  const [unicComment] = unicPost.comments.filter(
    (comment) => comment._id.toString() === commentId
  )

  const unLikedComment = unicComment.commentLikes.filter(
    (user) => user.idUser !== idOfUserLogged
  )

  unicComment.commentLikes = unLikedComment

  const allComments = unicPost.comments.filter(
    (comment) => comment._id.toString() !== commentId
  )

  allComments.push(unicComment)

  unicPost.comments = allComments

  const allPosts = posts.filter((posts) => posts._id.toString() !== idPost)

  allPosts.push(unicPost)

  const allPostsFinal = allPosts.sort((a, b) => {
    return b.id - a.id
  })

  posts = allPostsFinal

  try {
    const response = await users.findOneAndUpdate(
      { username: authorOfPost },
      { posts },
      { new: true }
    )
    res.json(response)
  } catch (error) {
    console.log(error)
  }
}

export const deleteNotifications = async (req, res) => {
  const { idOfUserLogged } = req.params

  try {
    const response = await users.findByIdAndUpdate(
      idOfUserLogged,
      { notificationsOff: [] },
      { new: true }
    )
    res.json(response)
  } catch (error) {
    console.log(error)
  }
}

export const onCLickNotification = async (req, res) => {
  const { username } = req.params
  const { notifications, notificationsOff } = await users.findOne({ username })
  if (notifications.length !== 0) {
    try {
      const response = await users.findOneAndUpdate(
        { username },
        {
          notificationsOff: [...notificationsOff, ...notifications],
          notifications: [],
        },
        { new: true }
      )
      res.json(response)
    } catch (error) {
      console.log(error)
    }
  } else {
    res.sendStatus(200)
  }
}
