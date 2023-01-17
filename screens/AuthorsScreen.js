import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useContext, useRef, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
  StatusBar,
  Animated,
  Easing,
} from "react-native";
import ButtonSlider from "../components/ui/ButtonSlider";
import FadeUpList from "../components/ui/FadeUpList";
import { QuoteContext } from "../store/quote-context";
import authors from "../data/authors.json";
import { filterAuthorQuoteTypesArray } from "../helpers/filtering";
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

const AuthorsScreen = ({ navigation }) => {
  const quoteCtx = useContext(QuoteContext);
  const [selectedAuthors, setSelectedAuthors] = useState("all");
  const translateY = useRef(new Animated.Value(-width)).current;

  const { quotes } = quoteCtx;

  const authorArray = filterAuthorQuoteTypesArray(
    authors,
    quotes,
    selectedAuthors
  ).sort((a, b) => a.name > b.name);

  const buttonCategories = ["all"];
  authors.map((author) => {
    if (buttonCategories.includes(author.type)) return;
    buttonCategories.push(author.type);
  });

  function categorySelectorHandler(category) {
    setSelectedAuthors(category);
  }

  useFocusEffect(
    useCallback(() => {
      Animated.timing(translateY, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.elastic(1),
      }).start();

      return () => {
        Animated.timing(translateY, {
          useNativeDriver: true,
        }).reset();
      };
    }, [])
  );

  return (
    <LinearGradient
      colors={["#fbecd4", "#fae1c3", "#f8d8af", "#e4bc8e", "#f0ab5b"]}
      style={styles.container}
    >
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        }}
        style={styles.image}
        imageStyle={{ opacity: 0.15 }}
      >
        <Animated.View
          style={{
            backgroundColor: "rgba(255, 255, 255, .9)",
            paddingVertical: 2,
            transform: [{ translateY }],
            overflow: "hidden",
            elevation: 1,
          }}
        >
          <ButtonSlider
            categories={buttonCategories}
            onPress={categorySelectorHandler}
          />
        </Animated.View>

        <View
          style={{
            height: height - 180,
          }}
        >
          <FadeUpList data={authorArray} />
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};

export default AuthorsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: StatusBar.currentHeight || 42,
  },

  image: {
    flex: 1,
  },
});
