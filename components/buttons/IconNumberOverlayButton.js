import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../colors/colors";

const IconNumberOverlayButton = ({ name, color, size, number, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed
          ? [styles.button, { transform: [{ scale: 0.9 }] }]
          : styles.button
      }
    >
      <View
        style={{
          position: "absolute",
          zIndex: 1,
          left: 0,
          right: 0,
          top: -7,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontFamily: "OpenSansBold",
            color: "rgba(37,122,253, 1)",
          }}
        >
          {number}
        </Text>
      </View>
      <Ionicons name={name} size={size || 32} color={color || "white"} />
    </Pressable>
  );
};

export default IconNumberOverlayButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.blue,
    borderRadius: 10,
    elevation: 4,
    minHeight: 48,
    minWidth: 48,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
