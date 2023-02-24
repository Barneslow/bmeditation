import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

const AuthorPreview = ({ author, delay }) => {
  const navigation = useNavigation();
  const [tapCount, setTapCount] = useState(0);

  const item = { name: author.name };

  return (
    <Animated.View
      entering={FadeInRight.duration(500).delay(delay)}
      style={[
        styles.author,
        { backgroundColor: tapCount === 1 ? "lightgrey" : "white" },
      ]}
      exiting={FadeOutLeft}
    >
      <Pressable
        onLongPress={() =>
          navigation.navigate("AuthorStack", {
            screen: "AuthorQuotes",
            params: { item, author },
          })
        }
      >
        <View style={styles.heading}>
          <Image source={{ uri: author?.imageUrl }} style={styles.logo} />
          <Text>{author?.name}</Text>
          <Text>{author?.type}</Text>
        </View>
        <Text>{author?.about}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default AuthorPreview;

const styles = StyleSheet.create({
  author: {
    padding: 10,
    borderRadius: 20,
    elevation: 1,
    marginVertical: 5,
    elevation: 4,
    minWidth: "100%",
  },

  logo: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },

  heading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  description: {},
});
