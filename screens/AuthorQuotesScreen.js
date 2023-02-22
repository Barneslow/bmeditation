import { useContext, useEffect, useState } from "react";
import { Dimensions, StatusBar, View } from "react-native";
import { QuoteContext } from "../contexts/quote-context";
import AuthorBio from "../components/AuthorBio";
import StaggeredFlatList from "../components/ui/StaggeredFlatlist";
import IconButton from "../components/buttons/IconButton";
import { Colors } from "../colors/colors";

const { width } = Dimensions.get("screen");

const AuthorQuotesScreen = ({ navigation, route }) => {
  const [authorQuotes, setAuthorQuotes] = useState([]);
  const { quotes } = useContext(QuoteContext);
  const { item, author } = route.params;

  useEffect(() => {
    const filteredQuotes = quotes.filter((quote) => quote.author === item.name);
    setAuthorQuotes(filteredQuotes);
  }, [quotes]);

  console.log(navigation);

  return (
    <View style={{ padding: 10, backgroundColor: "#F1DFD1" }}>
      <StaggeredFlatList data={authorQuotes}>
        <View style={{ height: StatusBar.currentHeight + 5 }}></View>
        <AuthorBio author={author} />
      </StaggeredFlatList>
      <View
        style={{
          position: "absolute",
          top: StatusBar.currentHeight + 5,
          left: 5,
        }}
      >
        <IconButton
          onPress={() => navigation.goBack()}
          name="arrow-back-circle"
          color={Colors.blue}
          size={40}
        />
      </View>
    </View>
  );
};

export default AuthorQuotesScreen;
