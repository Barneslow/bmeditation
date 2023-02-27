import { MotiView } from "moti";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Easing } from "react-native-reanimated";
import { StyleSheet, View, Text, Animated, Image } from "react-native";
import { MotiPressable } from "moti/interactions";
import { toTitleCase } from "../helpers/text";
import { useEffect, useRef, useState } from "react";
import AudioImages from "../data/audioImages.json";
import { CountUp } from "./TimerCounter";

const AudioAnimation = ({
  playingAnimation,
  animationState,
  animate,
  selectedAudio,
}) => {
  const opacityScale = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState();
  const { imageUri } = AudioImages.find((data) => data.name === selectedAudio);

  useEffect(() => {
    if (playingAnimation) {
      setVisible(true);
      Animated.timing(opacityScale, {
        toValue: playingAnimation ? 1 : 0,
        duration: 2000,
        useNativeDriver: true,
      }).start();
      return;
    }
    Animated.timing(opacityScale, {
      toValue: playingAnimation ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  }, [playingAnimation]);

  return (
    <View style={styles.container}>
      {visible && (
        <Animated.View style={[styles.overlay, { opacity: opacityScale }]}>
          <Image
            source={{
              uri: imageUri,
            }}
            style={{ flex: 1, opacity: 0.7 }}
          />
        </Animated.View>
      )}
      <View style={{ marginVertical: 20 }}>
        <MotiPressable style={[styles.dot, styles.center]} onPress={animate}>
          <Image
            source={require("../assets/images/meditation2.png")}
            style={{
              height: 200,
              width: 200,
              borderRadius: 100,
              position: "absolute",
              zIndex: 1,
            }}
          />

          {[...Array(2).keys()].map((index) => {
            return (
              <MotiView
                state={animationState}
                transition={{
                  type: "timing",
                  duration: 3000,
                  easing: Easing.out(Easing.ease),
                  loop: playingAnimation,
                  delay: index * 400,
                }}
                key={index}
                style={[StyleSheet.absoluteFillObject, styles.dot]}
              />
            );
          })}
          <View style={{ position: "absolute", zIndex: 2 }}>
            {!playingAnimation ? (
              <Ionicons name="play" size={32} color="white" />
            ) : (
              <Ionicons name="headset" size={32} color="white" />
            )}
          </View>
        </MotiPressable>
      </View>
      {selectedAudio && (
        <Text style={styles.playingText}>
          {toTitleCase(selectedAudio.replace("_", " "))}
        </Text>
      )}
      {playingAnimation && <CountUp />}
    </View>
  );
};

export default AudioAnimation;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  overlay: {
    backgroundColor: "black",
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  center: {
    alignItems: "center",
    justifyContent: "center",
  },

  dot: {
    backgroundColor: "#0E4732",
    width: 200,
    height: 200,
    borderRadius: 100,
  },

  playingText: {
    fontSize: 24,
    fontFamily: "SourceSansProBlack",
    textAlign: "center",
    color: "white",
    paddingHorizontal: 20,
    borderRadius: 15,
  },
});
