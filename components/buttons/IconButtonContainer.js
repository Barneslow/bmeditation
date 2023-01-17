import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const IconButtonContainer = ({
  name,
  size,
  color,
  onPress,
  style,
  pressedColor,
  disabled,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) =>
        pressed
          ? [
              style,
              {
                opacity: 0.8,
                transform: [{ scale: 0.9 }],
                backgroundColor: pressedColor,
              },
            ]
          : style
      }
    >
      <Ionicons name={name} size={size || 32} color={color || "white"} />
    </Pressable>
  );
};

export default IconButtonContainer;
