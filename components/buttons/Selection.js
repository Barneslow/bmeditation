import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { Colors } from "../../colors/colors";

const Selection = ({ children, title, delay, onPress }) => {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeInDown.duration(1000).delay(delay)}
    >
      <Pressable onPress={onPress} style={styles.selection}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Daily {title}</Text>
          <Text style={styles.span}>Did you learn?</Text>
        </View>
        {children}
      </Pressable>
    </Animated.View>
  );
};

export default Selection;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    width: "80%",
    borderRadius: 20,
    elevation: 1,
    marginVertical: 10,
    elevation: 4,
  },

  selection: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  heading: {
    fontFamily: "SourceSansProBold",
    fontSize: 20,
    color: Colors.offblack,
  },

  span: {
    fontSize: 14,
    fontFamily: "OpenSansMediumItalic",
    color: "darkslategrey",
  },
});
