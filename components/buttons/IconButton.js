import { Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const IconButton = ({ name, size, onPress, color }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && { opacity: 0.6 }}
    >
      <Ionicons name={name} size={size || 32} color={color} />
    </Pressable>
  );
};

export default IconButton;
