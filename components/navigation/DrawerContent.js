import { Text, Image, StyleSheet, Pressable } from "react-native";
import {
  DrawerContentScrollView,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { FavouritesContext } from "../../contexts/favourites-context";
import { useContext } from "react";
import authorPhotos from "../../data/authors.json";
import { AnimatedContext } from "../../contexts/animated-context";
import { useIsFocused } from "@react-navigation/native";
import { Colors } from "../../colors/colors";

const DrawerContent = (props) => {
  const favouritesCtx = useContext(FavouritesContext);
  const animationCtx = useContext(AnimatedContext);
  const isFocused = useIsFocused();

  const allAuthors = ["All"];
  favouritesCtx.favourites.map((quote) => {
    if (allAuthors.includes(quote.author)) {
      return;
    }
    return allAuthors.push(quote.author);
  });

  const isDrawerOpen = useDrawerStatus() === "open";

  !isDrawerOpen && isFocused && animationCtx.animateTab(false);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        backgroundColor: "#DDCAD9",
        flex: 1,
      }}
    >
      <Text
        style={{
          color: Colors.red,
          fontSize: 24,
          fontFamily: "SourceSansProBlack",
          padding: 10,
        }}
      >
        Authors
      </Text>

      {allAuthors.map((author, index) => {
        const photo = authorPhotos.find((data) => data.name === author);

        return (
          <Pressable
            key={index}
            onPress={() => {
              props.navigation.closeDrawer();
              favouritesCtx.selectedFavouritesHandler(author);
            }}
            style={({ pressed }) =>
              pressed
                ? [
                    styles.container,
                    { backgroundColor: "rgba(235, 245, 240, 1)" },
                  ]
                : styles.container
            }
          >
            <Image
              source={{
                uri:
                  photo?.imageUrl ||
                  "https://images.unsplash.com/photo-1472173148041-00294f0814a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
              }}
              style={styles.image}
            />
            <Text style={styles.text}>{author}</Text>
          </Pressable>
        );
      })}
    </DrawerContentScrollView>
  );
};
export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 3,
    borderRadius: 10,
    padding: 1,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
  },

  text: {
    fontSize: 20,
    fontFamily: "OpenSansSemiBold",
    marginLeft: 10,
    color: Colors.blue,
  },
});
