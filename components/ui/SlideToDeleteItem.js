import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  FadeOutRight,
  FadeInLeft,
  Layout,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Quote from "../Quote";
import JournalEntryPreview from "../JournalEntryPreview";

const { width } = Dimensions.get("window");

const TRANSLATEX_THRESHOLD = -width * 0.25;

const SlideToDeleteItem = ({ item, index, handlerFunc, children }) => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const itemHeight = useSharedValue();
  const marginVertical = useSharedValue();
  const backgroundColor = useSharedValue("rgba(250, 249, 246, 1)");
  const borderColor = useSharedValue("black");
  const quoteScale = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .activateAfterLongPress(150)
    .onUpdate((event) => {
      translateX.value = event.translationX;
      backgroundColor.value = "rgb(204,204,204)";
      borderColor.value = "white";
      quoteScale.value = withTiming(1.05);
    })
    .onEnd((event) => {
      backgroundColor.value = "rgba(250, 249, 246, 1)";
      borderColor.value = "black";
      quoteScale.value = withTiming(1);

      const dimissed = translateX.value < TRANSLATEX_THRESHOLD;
      if (dimissed) {
        translateX.value = withTiming(-width, undefined, (isFinished) => {
          if (isFinished) {
            opacity.value = withTiming(0);
            itemHeight.value = withTiming(0);
            marginVertical.value = withTiming(0, undefined, (isFinished) => {
              if (isFinished) {
                runOnJS(handlerFunc)(item);
              }
            });
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  const binAnimatedStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < TRANSLATEX_THRESHOLD ? 1 : 0);
    return {
      opacity,
    };
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  const quoteAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
      borderColor: borderColor.value,
      transform: [{ scale: quoteScale.value }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: "relative",
          justifyContent: "center",
        },
        containerAnimatedStyle,
      ]}
    >
      <Animated.View style={[styles.iconContainer, binAnimatedStyle]}>
        <Ionicons name="trash" size={40} color="red" />
      </Animated.View>
      <GestureDetector gesture={panGesture}>
        <Animated.View
          exiting={FadeOutRight}
          entering={FadeInLeft.delay(100 * index)}
          style={[styles.listItem, animatedStyle]}
          layout={Layout.delay(500)}
        >
          <Animated.View
            style={[
              quoteAnimatedStyle,
              { borderRadius: 10, borderWidth: 0.5, overflow: "hidden" },
            ]}
          >
            {children}
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};
export default SlideToDeleteItem;

const styles = StyleSheet.create({
  listItem: { margin: 5, alignSelf: "center", width: "90%" },

  iconContainer: {
    position: "absolute",
    right: "10%",
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
