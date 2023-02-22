import { Image } from "react-native";
import AuthorInfo from "./AuthorInfo";

const AuthorBio = ({ author }) => {
  return (
    <>
      <Image
        source={{ uri: author.imageUrl }}
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
