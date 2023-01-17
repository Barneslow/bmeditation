import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useLayoutEffect } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import IconButtonContainer from "../components/buttons/IconButtonContainer";
import InViewFlatListAnimation from "../components/ui/InViewFlatListAnimation";
import { AnimatedContext } from "../store/animated-context";
import { FavouritesContext } from "../store/favourites-context";

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
          name="person"
          style={{
            marginRight: 10,
            backgroundColor: "rgb(250, 249, 246)",
            borderRadius: 10,
            borderWidth: 0.5,
            elevation: 4,
            padding: 3,
          }}
          size={36}
          pressedColor={"white"}
          color={"#ed2938"}
        />
      ),
    });
  }, []);

  return (
    <LinearGradient
      colors={["#f9b7b7", "#fc8d8d", "#f45050", "#ed2938"]}
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
