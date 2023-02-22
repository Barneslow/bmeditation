import { MotiView } from "moti";
import { useEffect, useRef, useState } from "react";
import { FlatList, Pressable, Text, Dimensions } from "react-native";
import { Colors } from "../../colors/colors";
import { toTitleCase } from "../../helpers/text";

const { width } = Dimensions.get("screen");

const _spacing = 10;

const _colors = {
  active: Colors.blue,
  activeText: "white",
  inactive: "darkslategrey",
  inactiveText: "white",
};

const ButtonSlider = ({ categories, onPress, children }) => {
  const ref = useRef();

  const [index, setIndex] = useState(0);
  const [viewPosition, setViewPosition] = useState(0);

  useEffect(() => {
    ref.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  }, [index, viewPosition]);

  return (
    <FlatList
      style={{ flexGrow: 0 }}
      data={categories}
      ref={ref}
      initialScrollIndex={index}
      keyExtractor={(item, index) => index}
      contentContainerStyle={{
        paddingLeft: _spacing,
        minWidth: width,
        justifyContent: "center",
      }}
      showsHorizontalScrollIndicator={false}
      horizontal
      renderItem={({ item, index: fIndex }) => {
        return (
          <Pressable
            onPress={() => {
              onPress(item);
              setIndex(fIndex);
            }}
          >
            <MotiView
              animate={{
                opacity: fIndex === index ? 1 : 0.7,
                borderColor:
                  fIndex === index ? _colors.activeText : _colors.inactiveText,
              }}
              style={{
                marginHorizontal: 5,
                borderWidth: 1,
                borderRadius: 8,
                padding: 5,
                minWidth: 75,
                backgroundColor:
                  fIndex === index ? _colors.active : _colors.inactive,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  fontFamily: "OpenSansRegular",
                  color:
                    fIndex === index
                      ? _colors.activeText
                      : _colors.inactiveText,
                }}
              >
                {toTitleCase(item)}
              </Text>
            </MotiView>
          </Pressable>
        );
      }}
    />
  );
};

export default ButtonSlider;
