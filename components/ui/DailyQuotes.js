import { useNavigation } from "@react-navigation/native";
import { Dimensions, Image, StyleSheet, View, Pressable } from "react-native";
import TextAnimator from "./TextAnimator";

const DailyQuotes = ({ quote, randomQuote, setDailyQuoteVisible }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.imageContainer}>
        <Pressable
          style={styles.image}
          onPress={() => setDailyQuoteVisible(false)}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/images/icons/home.png")}
          />
        </Pressable>
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
      {quote && <TextAnimator quote={quote} randomQuote={randomQuote} />}
    </View>
  );
};

export default DailyQuotes;

const styles = StyleSheet.create({
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 5,
    borderRadius: 10,
    width: "80%",
    backgroundColor: "rgba(0, 0, 0, .2)",
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
