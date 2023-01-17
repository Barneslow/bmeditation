import { useNavigation } from "@react-navigation/native";
import { ImageBackground, View, Text } from "react-native";
import IconButton from "./buttons/IconButton";
import Animated, { FadeInRight, FadeInUp } from "react-native-reanimated";
import AuthorInfo from "./AuthorInfo";

const AuthorBio = ({ author }) => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={{ uri: author.imageUrl }}
      style={{
        height: 300,
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 10,
        backgroundColor: "black",
        borderRadius: 10,
      }}
      imageStyle={{
        opacity: 0.9,
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1,
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 5,
          left: 5,
        }}
      >
        <IconButton
          color={"white"}
          name="arrow-back-circle"
          onPress={() => navigation.goBack()}
          size={40}
        />
      </View>
      <AuthorInfo author={author} />
    </ImageBackground>
  );
};

export default AuthorBio;
