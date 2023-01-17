import { Pressable, StyleSheet } from "react-native";
import Share from "react-native-share";
import Ionicons from "@expo/vector-icons/Ionicons";

const ShareButton = ({ size, color, quoteData }) => {
  const { quote, author } = quoteData;
  async function shareHandler() {
    const shareOptions = {
      message: `${quote}\nAuthor: ${author}`,
    };

    try {
      const shareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Pressable
      onPress={shareHandler}
      style={({ pressed }) =>
        pressed
          ? [styles.button, { opacity: 0.8, transform: [{ scale: 1.1 }] }]
          : styles.button
      }
    >
      <Ionicons name="share-social" size={size || 32} color="#32CD32" />
    </Pressable>
  );
};

export default ShareButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
  },
});
