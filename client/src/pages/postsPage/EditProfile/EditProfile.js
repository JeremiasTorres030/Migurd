import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUsers } from "../../../context/users/usersProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEditProfileFetch } from "./editProfileFetch";
import * as Yup from "yup";

const EditProfile = () => {
  const [profileImagePreview, setProfileImagePreview] = useState();
  const [profileBigImagePreview, setProfileBigImagePreview] = useState();
  const { setEditProfile, userNameLogged, dataOfUserLogged } = useUsers();
  const { editProfileFetch } = useEditProfileFetch();

  return (
    <div className="ProfileUserEdit">
      <Formik
        initialValues={{
          username: userNameLogged,
          profileImage: null,
          bigProfileImage: null,
        }}
        validationSchema={Yup.object({
          username: Yup.string().required("Ingrese un username valido"),
        })}
        onSubmit={(values) => {
          editProfileFetch(values);
        }}
      >
        {({ handleSubmit, setFieldValue, isSubmitting }) => (
          <Form>
            <div className="BigProfilePictureEdit">
              {profileBigImagePreview ? (
                <img
                  className="BigProfilePicture"
                  alt="BigProfilePicture"
                  src={profileBigImagePreview}
                />
              ) : (
                <img
                  className="BigProfilePicture"
                  alt="BigProfilePicture"
                  src={dataOfUserLogged.bigProfileImage.url}
                />
              )}

              <input
                accept=".jpg, .jpeg, .png"
                type="file"
                name="bigProfileImage"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFieldValue("bigProfileImage", file);
                  if (file) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                      setProfileBigImagePreview(reader.result);
                    };
                  }
                }}
              />
            </div>
            <div className="ProfilePictureEdit">
              {profileImagePreview ? (
                <img
                  className="ProfilePicture"
                  alt="ProfilePicture"
                  src={profileImagePreview}
                />
              ) : (
                <img
                  className="ProfilePicture"
                  alt="ProfilePicture"
                  src={dataOfUserLogged.profileImage.url}
                />
              )}

              <input
                accept=".jpg, .jpeg, .png"
                type="file"
                name="profileImage"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFieldValue("profileImage", file);
                  if (file) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                      setProfileImagePreview(reader.result);
                    };
                  }
                }}
              />
            </div>
            <div className="EditAndUsernameEdit">
              <label>
                <ErrorMessage component="p" name="username" />
                <Field
                  component="input"
                  id="username"
                  type="text"
                  name="username"
                />
              </label>

              <Link
                to={`/home/${userNameLogged}`}
                onClick={() => {
                  handleSubmit();
                  setEditProfile(false);
                }}
              >
                {isSubmitting ? "Editando..." : "Finalizado"}
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfile;
