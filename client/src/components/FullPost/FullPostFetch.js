import { useEffect, useState } from "react";
import { useUsers } from "../../context/users/usersProvider";

export const useFullPost = (username) => {
  const { getUnicUserByUsername } = useUsers();

  const [picProfile, setPicProfile] = useState("");
  useEffect(() => {
    const getPicProfile = async () => {
      const response = await getUnicUserByUsername(username);
      setPicProfile(response.profileImage.url);
    };
    getPicProfile();

    // eslint-disable-next-line
  }, []);
  return { picProfile };
};
