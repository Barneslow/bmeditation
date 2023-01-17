import { useContext, useEffect, useState } from "react";
import { StatusBar, View, Text, Dimensions } from "react-native";
import { QuoteContext } from "../store/quote-context";
import AuthorBio from "../components/AuthorBio";
import AnimatedConfigScrollView from "../components/ui/AnimatedConfigScrollView";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { ZoomInEasyDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("screen");

const AuthorQuotesScreen = ({ navigation, route }) => {
  const [authorQuotes, setAuthorQuotes] = useState([]);
  const { quotes } = useContext(QuoteContext);
  const { item, author } = route.params;

  useEffect(() => {
    const filteredQuotes = quotes.filter((quote) => quote.author === item.name);
    setAuthorQuotes(filteredQuotes);
  }, [quotes]);

  return (
    <LinearGradient
      colors={["#fbecd4", "#fae1c3", "#f8d8af", "#e4bc8e", "#f0ab5b"]}
      style={{
        flex: 1,
        paddingHorizontal: 10,
      }}
    >
      <AnimatedConfigScrollView data={authorQuotes}>
        <View style={{ height: 450 }}>
          <View
            style={{
              paddingTop: StatusBar.currentHeight + 5 || 47,
            }}
          >
            <AuthorBio author={author} />
          </View>
        </View>
      </AnimatedConfigScrollView>
    </LinearGradient>
  );
};

export default AuthorQuotesScreen;
