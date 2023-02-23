import { Image } from "react-native";
import AuthorInfo from "./AuthorInfo";

const AuthorBio = ({ author }) => {
  const profileImage = require("../assets/images/icons/unknown-avatar.png");
  const profileImageUri = { uri: author?.imageUrl };

  const profiler = profileImageUri.uri ? profileImageUri : profileImage;

  return (
    <>
      <Image
        source={profiler}
        style={{
          height: 300,
          justifyContent: "flex-end",
          alignItems: "center",
          padding: 10,
          backgroundColor: "black",
          borderRadius: 10,
        }}
      ></Image>
      <AuthorInfo author={author} />
    </>
  );
};

export default AuthorBio;
