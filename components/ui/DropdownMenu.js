import { useEffect, useState } from "react";
import {
  FlatList,
  View,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Platform,
  UIManager,
  StatusBar,
  Text,
} from "react-native";
import Animated, {
  FadeIn,
  SlideInDown,
  SlideInRight,
  SlideInUp,
} from "react-native-reanimated";
import testData from "../../data/buttontest.json";
import { toTitleCase } from "../../helpers/text";
import Ionicons from "@expo/vector-icons/Ionicons";

const _colors = {
  active: "#389d7a",
  inactive: "#228b22",
};

// if (Platform.OS === "android") {
//   if (UIManager.setLayoutAnimationEnabledExperimental) {
//     UIManager.setLayoutAnimationEnabledExperimental(true);
//   }
// }

// useEffect(() => {
//   LayoutAnimation.configureNext({
//     duration: 500,
//     update: { type: "easeInEaseOut", property: "opacity" },
//     delete: { type: "easeInEaseOut", property: "opacity" },
//   });
// }, [showContent, content]);

const DropdownMenu = ({ select, isFocused }) => {
  const [content, setContent] = useState("waterfall");
  const [showContent, setShowContent] = useState(false);
  const [index, setIndex] = useState();

  const buttons = testData.map((data) => data.name);

  useEffect(() => {
    if (isFocused) return;
    setShowContent(false);
  }, [isFocused]);

  function toggle(button, fIndex) {
    if (button === content.name && showContent) {
      setShowContent(false);
      setIndex();
      return;
    }
    const newContent = testData.find((data) => data.name === button);

    setContent(newContent);
    setShowContent(true);
    setIndex(fIndex);
  }

  return (
    <View
      style={{
        backgroundColor: "transparent",
        overflow: "hidden",
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        paddingHorizontal: 20,
        position: "absolute",
        top: StatusBar.currentHeight,
      }}
    >
      <FlatList
        contentContainerStyle={{
          justifyContent: "space-evenly",
          width: "100%",
          padding: 5,
        }}
        data={buttons}
        horizontal
        keyExtractor={(_, index) => index}
        renderItem={({ item, index: fIndex }) => {
          let buttonIcon;

          if (item === "nature") {
            buttonIcon = "leaf";
          }
          if (item === "music") {
            buttonIcon = "musical-notes";
          }
          if (item === "waves") {
            buttonIcon = "radio";
          }

          return (
            <Pressable
              onPress={() => {
                toggle(item, fIndex);
              }}
            >
              <View
                style={{
                  backgroundColor:
                    fIndex === index ? _colors.active : _colors.inactive,
                  marginHorizontal: 5,
                  elevation: 4,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  minWidth: 60,
                  height: 40,
                  opacity: fIndex === index ? 1 : 0.5,
                }}
              >
                <Ionicons name={buttonIcon} size={30} color={"black"} />
              </View>
            </Pressable>
          );
        }}
      />

      {showContent && (
        <FlatList
          data={content.categories}
          keyExtractor={(_, index) => index}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={SlideInUp.delay(50 * index)}
              exiting={SlideInDown}
            >
              <Pressable
                onPress={() => {
                  select(item);
                }}
                style={({ pressed }) =>
                  pressed
                    ? [styles.dropdownItem, styles.pressed]
                    : styles.dropdownItem
                }
              >
                <Text style={{ fontSize: 16, fontFamily: "OpenSansRegular" }}>
                  {toTitleCase(item)}
                </Text>
              </Pressable>
            </Animated.View>
          )}
        />
      )}
    </View>
  );
};

export default DropdownMenu;

const styles = StyleSheet.create({
  dropdownItem: {
    padding: 5,
    borderBottomWidth: 0.5,
    borderRadius: 5,
    backgroundColor: "rgba(255 ,255, 255, .5)",
  },

  pressed: {
    backgroundColor: "white",
  },
});
