import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { Colors } from "../colors/colors";
import { toTitleCase } from "../helpers/text";

const AuthorPreview = ({ author, delay }) => {
  const navigation = useNavigation();

  const item = { name: author.name };

  return (
    <Animated.View
      entering={FadeInRight.duration(500).delay(delay)}
      style={styles.author}
    >
      <Pressable
        onPress={() =>
          navigation.navigate("AuthorStack", {
            screen: "AuthorQuotes",
            params: { item, author },
          })
        }
      >
        <View style={styles.heading}>
          <Image source={{ uri: author?.imageUrl }} style={styles.logo} />
          <Text style={{ fontSize: 20, fontFamily: "SourceSansProBold" }}>
            {author?.name}
          </Text>
          <Text style={[styles.text, { color: Colors.blue }]}>
            {toTitleCase(author?.type)}
          </Text>
        </View>
        <Text style={styles.text}>{author?.about}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default AuthorPreview;

const styles = StyleSheet.create({
  author: {
    padding: 10,
    borderRadius: 10,
    elevation: 1,
    marginVertical: 5,
    elevation: 4,
    minWidth: "100%",
    backgroundColor: "white",
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
    marginBottom: 5,
  },

  text: {
    fontFamily: "OpenSansMedium",
  },
});
