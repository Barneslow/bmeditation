import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../colors/colors";

const TabButton = (props) => {
  const { name, onPress, accessibilityState, animate, data } = props;
  const focused = accessibilityState.selected;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (focused) {
      Animated.timing(translateY, {
        toValue: -15,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [focused]);

  function pressHandler() {
    if (name === "refresh-circle") {
      animate();
      return;
    }

    onPress();
  }

  return (
    <Pressable
      onPress={pressHandler}
      style={({ pressed }) =>
        pressed && name === "refresh-circle"
          ? [styles.container, { transform: [{ scale: 0.9 }] }]
          : styles.container
      }
    >
      <Animated.View
        duration={1000}
        style={{
          backgroundColor: focused ? Colors.blue : "orange",
          borderRadius: 15,
          padding: 5,
          elevation: 4,
          opacity: focused ? 1 : 0.7,
          transform: [{ translateY }],
        }}
      >
        <Ionicons name={name} size={42} color="white" />
      </Animated.View>
    </Pressable>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
