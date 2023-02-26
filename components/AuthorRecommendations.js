import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { randomThreeFromArray } from "../helpers/math";
import AuthorPreview from "./AuthorPreview";
import ButtonSlider from "./ui/ButtonSlider";

import authorData from "../data/authors.json";
import { filterAuthorTypes } from "../helpers/filtering";
import NavigationIcons from "./buttons/navigationIcons";
import TabButton from "./buttons/TabButton";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("screen");

const AuthorRecommendations = ({ setAlternate, setAlternateContent }) => {
  const navigation = useNavigation();
  const [selectedAuthors, setSelectedAuthors] = useState("all");
  const [randomAuthors, setRandomAuthors] = useState(
    randomThreeFromArray(authorData)
  );

  const filteredAuthors = filterAuthorTypes(authorData, selectedAuthors);

  const buttonCategories = ["all"];
  authorData.map((author) => {
    if (buttonCategories.includes(author.type)) return;
    buttonCategories.push(author.type);
  });

  function categorySelectorHandler(category) {
    setSelectedAuthors(category);
  }

  function randomAuthor() {
    setRandomAuthors(randomThreeFromArray(filteredAuthors));
  }

  useEffect(
    useCallback(() => {
      navigation.setOptions({
        tabBarButton: (props) => (
          <TabButton {...props} name="refresh-circle" animate={randomAuthor} />
        ),
      });
    }, [filteredAuthors])
  );

  useEffect(() => {
    randomAuthor();
  }, [selectedAuthors]);

  return (
    <View style={styles.container}>
      <NavigationIcons
        setAlternate={setAlternate}
        setAlternateContent={setAlternateContent}
        content={"author"}
      />

      <ButtonSlider
        categories={buttonCategories}
        onPress={categorySelectorHandler}
      />

      <View style={styles.recommendations}>
        <FlatList
          showsVerticalScrollIndicator={true}
          data={randomAuthors}
          keyExtractor={(_, i) => i}
          renderItem={({ item, index }) => {
            return (
              <AuthorPreview key={index} author={item} delay={index * 100} />
            );
          }}
        />
      </View>
    </View>
  );
};

export default AuthorRecommendations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: StatusBar.currentHeight,
    alignItems: "center",
  },

  recommendations: {
    display: "flex",
    padding: 10,
    height: height - 200,
  },
});
