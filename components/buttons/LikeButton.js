import { Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const LikeButton = ({ size, color, onPress, liked }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed
          ? [styles.button, { opacity: 0.8, transform: [{ scale: 1.1 }] }]
          : styles.button
      }
    >
      <Ionicons
        name={liked ? "thumbs-up" : "thumbs-up-outline"}
        size={size || 32}
        color={color || "white"}
      />
    </Pressable>
  );
};

export default LikeButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
  },
});
