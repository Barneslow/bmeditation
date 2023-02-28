import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useLayoutEffect } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { Colors } from "../colors/colors";
import IconButtonContainer from "../components/buttons/IconButtonContainer";
import InViewFlatListAnimation from "../components/ui/InViewFlatListAnimation";
import { AnimatedContext } from "../contexts/animated-context";
import { FavouritesContext } from "../contexts/favourites-context";

const FavouritesScreen = ({ navigation }) => {
  const { seletectedFavourites, selectedFavouritesHandler } =
    useContext(FavouritesContext);
  const animationCtx = useContext(AnimatedContext);

  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && selectedFavouritesHandler("All");
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButtonContainer
          onPress={() => {
            navigation.toggleDrawer();
            animationCtx.animateTab(true);
          }}
          name="people-circle"
          style={{
            marginRight: 10,
          }}
          size={48}
          pressedColor={"white"}
          color={Colors.red}
        />
      ),
    });
  }, []);

  return (
    <LinearGradient
      colors={["#F5E3E6", "#FFD9DE"]}
      start={{ x: 0.5, y: 0.1 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1513689125086-6c432170e843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        }}
        style={[styles.image]}
        imageStyle={{ opacity: 0.5 }}
      >
        <InViewFlatListAnimation data={seletectedFavourites} />
      </ImageBackground>
    </LinearGradient>
  );
};

export default FavouritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },

  image: {
    flex: 1,
    paddingBottom: 100,
  },
});
