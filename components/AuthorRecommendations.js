import { useCallback, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { randomThreeFromArray } from "../helpers/math";
import AuthorPreview from "./AuthorPreview";
import ButtonSlider from "./ui/ButtonSlider";

import authorData from "../data/authors.json";
import { filterAuthorTypes } from "../helpers/filtering";
import { Colors } from "../colors/colors";
import NavigationIcons from "./buttons/navigationIcons";
import TabButton from "./buttons/TabButton";
import { useNavigation } from "@react-navigation/native";

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
          contentContainerStyle={{
            paddingHorizontal: 10,
            alignItems: "center",
            width: "100%",
            height: "100%",
            flex: 1,
          }}
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
    justifyContent: "center",
    alignItems: "center",
  },

  recommendations: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
});
