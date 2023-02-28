import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import AudioAnimation from "../components/AudioAnimation";
import DropdownMenu from "../components/ui/DropdownMenu";
import { Audio } from "expo-av";
import LocalAudio from "../contexts/audio-context";
import { useAnimationState } from "moti";
import { AnimatedContext } from "../contexts/animated-context";
import { useIsFocused } from "@react-navigation/native";

const MeditateScreen = () => {
  const isFocused = useIsFocused();
  const animateCtx = useContext(AnimatedContext);
  const { animateTab } = animateCtx;
  const [selectedAudio, setSelectedAudio] = useState("waterfall");
  const [playingSound, setPlayingSound] = useState();
  const [playingAnimation, setPlayingAnimation] = useState(false);
  const [loadingNewSound, setLoadingNewSound] = useState(false);

  const setInitialTrack = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(LocalAudio["waterfall"]);
      setPlayingSound(sound);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setInitialTrack();
  }, []);

  async function selectAudioHandler(audio) {
    const autioString = audio.replace(" ", "_");
    setSelectedAudio(autioString);

    try {
      setLoadingNewSound(true);
      const { sound } = await Audio.Sound.createAsync(LocalAudio[autioString]);
      setLoadingNewSound(false);

      const status = await sound.getStatusAsync();
      setPlayingSound(sound);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isFocused === false && playingSound) {
      setPlayingAnimation(false);
      playAudioHandler(false);
    }
  }, [isFocused]);

  async function playAudioHandler(playAudio) {
    if (playAudio) {
      try {
        await playingSound.setIsLoopingAsync(true);
        await playingSound.playAsync();
        return;
      } catch (error) {
        console.log(error);
      }
    }

    return playingSound.stopAsync();
  }

  const animationState = useAnimationState({
    from: {
      opacity: 1,
      scale: 1,
    },
    to: {
      opacity: 0.7,
      scale: 1,
    },
    active: {
      scale: 4,
      opacity: 0,
    },
  });

  useEffect(() => {}, [playingAnimation]);

  function animate() {
    if (playingAnimation) {
      animationState.transitionTo("to");
      setPlayingAnimation(false);
      playAudioHandler(false);
      animateTab(false);
      return;
    }

    animationState.transitionTo("active");
    setPlayingAnimation(true);
    playAudioHandler(true, selectedAudio);
    animateTab(true);
  }

  return (
    <LinearGradient
      colors={["#bbe6d9", "#c4e2c5", "#3cab85"]}
      style={styles.container}
    >
      <DropdownMenu
        playingAnimation={playingAnimation}
        select={selectAudioHandler}
        isFocused={isFocused}
      />

      {playingSound && !loadingNewSound ? (
        <AudioAnimation
          playingAnimation={playingAnimation}
          animationState={animationState}
          animate={animate}
          selectedAudio={selectedAudio}
        />
      ) : (
        <ActivityIndicator size="large" />
      )}
    </LinearGradient>
  );
};

export default MeditateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  playingText: {
    fontSize: 20,
    backgroundColor: "rgba(0,0,0,.5)",
    textAlign: "center",
    color: "white",
    padding: 10,
  },
});
