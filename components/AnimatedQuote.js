import { useContext, useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { FavouritesContext } from "../store/favourites-context";
import LikeButton from "./buttons/LikeButton";
// import ShareButton from "./buttons/ShareButton";

const active = "rgba(37,122,253, 1)";

const AnimatedQuote = ({ quoteData, more }) => {
  const favouritesCtx = useContext(FavouritesContext);
  const { favourites, addFavourite, removeFavourite } = favouritesCtx;
  const [isFavourited, setIsFavourited] = useState(quoteData.liked);

  function favouritesHandler() {
    isFavourited ? setIsFavourited(false) : setIsFavourited(true);
    isFavourited ? removeFavourite(quoteData) : addFavourite(quoteData);
  }

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1528458965990-428de4b1cb0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=729&q=80",
      }}
      style={styles.image}
      imageStyle={{ opacity: 1 }}
    >
      <Text
        style={{
          fontFamily: "OpenSansSemiBold",
          fontSize: 16,
          color: "black",
          padding: 10,
        }}
      >
        {quoteData.quote}{" "}
        {more && (
          <Text
            style={{
              color: "blue",
              fontSize: 16,
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            &rarr;
          </Text>
        )}
      </Text>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "flex-end",
          position: "absolute",
          bottom: 5,
          right: 5,
        }}
      >
        <View style={{ marginRight: 10 }}>
          {/* <ShareButton quoteData={quoteData} /> */}
        </View>
        <LikeButton
          liked={isFavourited}
          size={30}
          color={active}
          onPress={favouritesHandler}
        />
      </View>
    </ImageBackground>
  );
};

export default AnimatedQuote;

const styles = StyleSheet.create({
  image: {
    height: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    overflow: "hidden",
  },
});
