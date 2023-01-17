import { Dimensions, StyleSheet, View, Text } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const WORDS = ["WHATS", "UP", "MOBILE", "DEV"];

const { height, width } = Dimensions.get("screen");

const SIZE = width * 0.7;

const Page = ({ item, index, translateX }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const animatedStyle = useAnimatedStyle(() => {
    const outputRange = [0, 1, 0];
    const scale = interpolate(
      translateX.value,
      inputRange,
      outputRange,
      Extrapolate.CLAMP
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP
    );

    return {
      borderRadius,
      transform: [{ scale }],
    };
  });

  const animatedText = useAnimatedStyle(() => {
    const translateY = interpolate(translateX.value, inputRange, [
      height / 2,
      0,
      -height / 2,
      Extrapolate.CLAMP,
    ]);

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });
  return (
    <View
      style={[
        styles.pageContainer,
        { backgroundColor: `rgba(0 ,0 ,256, .${index + 2})` },
      ]}
    >
      <Animated.View style={[styles.square, animatedStyle]} />
      <Animated.View style={[{ position: "absolute" }, animatedText]}>
        <Text style={styles.text}>{item}</Text>
      </Animated.View>
    </View>
  );
};

const PageScrollAnimation = () => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      style={styles.container}
      horizontal
      pagingEnabled
    >
      {WORDS.map((item, index) => (
        <Page
          item={item}
          index={index}
          key={index.toString()}
          translateX={translateX}
        />
      ))}
    </Animated.ScrollView>
  );
};

export default PageScrollAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  pageContainer: {
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },

  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: "rgba(0 ,0 ,256, .4)",
  },

  text: {
    fontSize: 60,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "700",
  },
});
