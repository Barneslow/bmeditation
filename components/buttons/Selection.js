import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { Colors } from "../../colors/colors";

const Selection = ({ children, title, delay, onPress, subtext, amount }) => {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeInDown.duration(1000).delay(delay)}
    >
      <Pressable onPress={onPress} style={styles.selection}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>{title}</Text>
          <Text style={styles.span}>
            {subtext}
            <Text
              style={{
                color: Colors.red,
                fontFamily: "SourceSansProBold",
                fontSize: 20,
              }}
            >
              {amount}
            </Text>
          </Text>
        </View>
        {children}
      </Pressable>
    </Animated.View>
  );
};

export default Selection;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
    width: "85%",
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
    fontSize: 22,
    color: Colors.offblack,
  },

  span: {
    fontSize: 14,
    fontFamily: "OpenSansMediumItalic",
    color: "darkslategrey",
  },

  amount: {
    color: Colors.red,
    fontFamily: "SourceSansProBold",
  },
});
