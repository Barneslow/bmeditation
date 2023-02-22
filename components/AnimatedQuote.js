import { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../colors/colors";
import { FavouritesContext } from "../contexts/favourites-context";
import LikeButton from "./buttons/LikeButton";
import ShareButton from "./buttons/ShareButton";

const ActionableQuote = ({ quoteData }) => {
  const favouritesCtx = useContext(FavouritesContext);
  const { addFavourite, removeFavourite } = favouritesCtx;
  const [isFavourited, setIsFavourited] = useState(quoteData.liked);

  function favouritesHandler() {
    isFavourited ? setIsFavourited(false) : setIsFavourited(true);
    isFavourited ? removeFavourite(quoteData) : addFavourite(quoteData);
  }

  const { quote } = quoteData;

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "OpenSansRegular", fontSize: 16 }}>
        {quote}
      </Text>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <View style={{ marginRight: 10 }}>
          <ShareButton size={22} quoteData={quoteData} />
        </View>
        <LikeButton
          liked={isFavourited}
          size={22}
          color={Colors.blue}
          onPress={favouritesHandler}
        />
      </View>
    </View>
  );
};

export default ActionableQuote;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f9f1f1",
    // borderColor: Colors.blue,
    // borderWidth: 0.5,
    elevation: 1,
  },
});
