import { useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
  ImageBackground,
} from "react-native";
import { FavouritesContext } from "../../store/favourites-context";
import LikeButton from "../buttons/LikeButton";
import ShareButton from "../buttons/ShareButton";

const { width } = Dimensions.get("screen");

const TextAnimator = ({ quote, finishedAnimation, randomQuote }) => {
  const { addFavourite } = useContext(FavouritesContext);

  const animatedValues = [];
  const textArr = quote.quote.trim().split(" ");

  textArr.forEach((_, i) => {
    animatedValues[i] = new Animated.Value(0);
  });

  const authorSwipe = new Animated.Value(-width);
  const authorOpacity = new Animated.Value(0);
  const scale = new Animated.Value(0);

  const animations = textArr.map((_, i) => {
    return Animated.timing(animatedValues[i], {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    });
  });

  function animate(toValue = 1) {
    Animated.stagger(100, animations).start(() => {
      Animated.timing(authorSwipe, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      Animated.timing(authorOpacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();

      Animated.timing(scale, {
        toValue: 1,
        duration: 1000,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }).start();
    });
  }

  useEffect(() => {
    Animated.timing(authorSwipe, {
      toValue: -width,
      duration: 0,
      useNativeDriver: true,
    }).start();
    Animated.timing(scale, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
    animate();
  }, [quote]);

  return (
    <ImageBackground
      style={styles.container}
      source={{
        uri: "https://images.unsplash.com/photo-1528458965990-428de4b1cb0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=729&q=80",
      }}
    >
      <View style={styles.textWrapper}>
        {textArr.map((word, index) => (
          <Animated.Text
            key={`${word}-${index}`}
            style={[
              styles.text,
              {
                opacity: animatedValues[index],
                transform: [
                  {
                    translateY: Animated.multiply(
                      animatedValues[index],
                      new Animated.Value(-5)
                    ),
                  },
                ],
              },
            ]}
          >
            {word}
            {`${index < textArr.length ? " " : ""}`}
          </Animated.Text>
        ))}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Animated.Text
          style={[
            styles.author,
            {
              opacity: authorOpacity,
              transform: [{ translateX: authorSwipe }],
            },
          ]}
        >
          {quote.author}
        </Animated.Text>
        <Animated.View style={{ flexDirection: "row", transform: [{ scale }] }}>
          <View style={{ marginRight: 10 }}>
            <ShareButton quoteData={quote} />
          </View>
          <LikeButton
            color={"rgba(37,122,253, 1)"}
            onPress={() => {
              addFavourite(quote);
              randomQuote();
            }}
            liked={quote.liked}
          />
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

export default TextAnimator;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 12,
    margin: 20,
    overflow: "hidden",
    maxWidth: "90%",
  },

  textWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10,
  },

  text: {
    fontSize: 20,
    fontFamily: "OpenSansRegular",
  },

  author: {
    fontSize: 26,
    padding: 10,
    fontFamily: "OpenSansSemiBoldItalic",
    textDecorationLine: "underline",
  },
});
