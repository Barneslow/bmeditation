import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { ImageBackground } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const OnBoardingAnimation = ({ setAnimationOver }) => {
  const progress = useSharedValue(0);
  const scale = useSharedValue(1);

  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * 100) / 2,
      transform: [
        { scale: scale.value },
        { rotate: `${progress.value * 2 * Math.PI}rad` },
      ],
    };
  }, []);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: 2000,
      easing: Easing.elastic(1),
    });
    scale.value = withTiming(
      3,
      { duration: 2000, easing: Easing.elastic(1) },
      (isFinished) => {
        if (isFinished) {
          scale.value = withTiming(10, { duration: 500 });
          progress.value = withTiming(0, { duration: 500 });
        }
      }
    );
    setTimeout(() => {
      setAnimationOver(true);
    }, 2400);
  }, []);

  return (
    <LinearGradient
      colors={["#F6F0EA", "#F1DFD1"]}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={[
          rStyle,
          {
            height: 100,
            width: 100,
            overflow: "hidden",
            borderWidth: 0.2,
            borderColor: "#eadb0e",
            elevation: 3,
            zIndex: 2,
          },
        ]}
      >
        <ImageBackground
          source={require("../assets/images/app-logo.png")}
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </Animated.View>
    </LinearGradient>
  );
};

export default OnBoardingAnimation;
