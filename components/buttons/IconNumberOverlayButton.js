import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const IconNumberOverlayButton = ({ name, color, size, number, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed
          ? [
              {
                backgroundColor: "rgba(37,122,253, 1)",
                borderRadius: 10,
                elevation: 4,
                padding: 1,
              },
              { transform: [{ scale: 0.9 }] },
            ]
          : {
              backgroundColor: "rgba(37,122,253, 1)",
              borderRadius: 10,
              elevation: 4,
              padding: 1,
            }
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
