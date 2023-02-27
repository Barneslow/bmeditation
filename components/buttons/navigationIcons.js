import { Image, Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NavigationIcons = ({ setAlternate, setAlternateContent, content }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.imageContainer}>
      <Pressable style={styles.image} onPress={() => setAlternate(false)}>
        <Image
          style={styles.icon}
          source={require("../../assets/images/icons/home.png")}
        />
      </Pressable>

      {content === "quotes" ? (
        <Pressable
          style={styles.image}
          onPress={() => setAlternateContent("author")}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/images/icons/open-book.png")}
          />
        </Pressable>
      ) : (
        <Pressable
          style={styles.image}
          onPress={() => setAlternateContent("quotes")}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/images/icons/lightbulb.png")}
          />
        </Pressable>
      )}

      <Pressable
        onPress={() => navigation.navigate("JournalStack")}
        style={styles.image}
      >
        <Image
          style={styles.icon}
          source={require("../../assets/images/icons/write.png")}
        />
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("Meditate")}
        style={styles.image}
      >
        <Image
          style={styles.icon}
          source={require("../../assets/images/icons/meditation.png")}
        />
      </Pressable>
    </View>
  );
};

export default NavigationIcons;

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    padding: 5,
  },

  image: {
    backgroundColor: "whitesmoke",
    padding: 5,
    borderRadius: 10,
    elevation: 1,
  },

  icon: {
    height: 35,
    width: 35,
  },
});
