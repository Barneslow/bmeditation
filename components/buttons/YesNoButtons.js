import { StyleSheet, View } from "react-native";
import IconButtonContainer from "./IconButtonContainer";

const primary = "rgb(37,122,253)";
const onPrimary = "rgb(144,198,255)";
const secondary = "rgb(240,51,52)";

const YesNoButtons = ({ funcYes, funcNo, icon1, icon2 }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingVertical: 10,
        width: "100%",
      }}
    >
      <IconButtonContainer
        name={icon1}
        style={[styles.button, { backgroundColor: primary }]}
        onPress={funcYes}
        pressedColor={onPrimary}
        size={40}
      />
      <IconButtonContainer
        onPress={funcNo}
        name={icon2}
        style={[styles.button, { backgroundColor: secondary }]}
        pressedColor={"lightgrey"}
        size={40}
      />
    </View>
  );
};

export default YesNoButtons;

const styles = StyleSheet.create({
  error: {
    color: "red",
  },

  button: {
    borderRadius: 10,
    padding: 2,
    elevation: 4,
    paddingHorizontal: 5,
  },

  text: {
    marginVertical: 10,
    fontFamily: "OpenSansRegular",
    fontSize: 18,
    lineHeight: 28,
  },
});
