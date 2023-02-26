import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { QuoteContext } from "../contexts/quote-context";
import AuthorBio from "../components/AuthorBio";
import StaggeredFlatList from "../components/ui/StaggeredFlatlist";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

const AuthorQuotesScreen = ({ navigation, route }) => {
  const [authorQuotes, setAuthorQuotes] = useState([]);
  const { quotes } = useContext(QuoteContext);

  const { item, author } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={{ fontFamily: "SourceSansProBlack", fontSize: 24 }}>
          {author.name}
        </Text>
      ),
      headerLeft: () => (
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.navigate("Authors")}
          style={{ marginLeft: 16 }}
        />
      ),
    });
  }, [author.name]);

  useEffect(() => {
    const filteredQuotes = quotes.filter((quote) => quote.author === item.name);
    setAuthorQuotes(filteredQuotes);
  }, [quotes, author, item.name]);

  return (
    <LinearGradient colors={["#F5E3E6", "#D9E4F5"]} style={styles.container}>
      <StaggeredFlatList data={authorQuotes}>
        <AuthorBio author={author} />
      </StaggeredFlatList>
    </LinearGradient>
  );
};

export default AuthorQuotesScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F1DFD1",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
