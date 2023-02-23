import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useContext, useEffect, useState } from "react";
import { Dimensions, ImageBackground, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { randomFromArray } from "../helpers/math";
import { QuoteContext } from "../contexts/quote-context";
import { useFocusEffect } from "@react-navigation/native";
import TabButton from "../components/buttons/TabButton";
import natureUrls from "../data/natureImageUrl.json";
import { useIsFocused } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import DailySelections from "../components/DailySelections";
import DailyQuotes from "../components/ui/DailyQuotes";
import { deleteFolder } from "../helpers/fileStorage";

deleteFolder("journal");

const HomeScreen = ({ navigation, route }) => {
  const { quotes } = useContext(QuoteContext);
  const [quote, setQuote] = useState(randomFromArray(quotes));
  const [dailyQuoteVisible, setDailyQuoteVisible] = useState(false);
  const [imageUri, setImageUri] = useState(
    "https://images.unsplash.com/photo-1464852045489-bccb7d17fe39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80"
  );
  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        tabBarButton: (props) => (
          <TabButton {...props} name="refresh-circle" animate={randomQuote} />
        ),
      });

      return () => {
        navigation.setOptions({
          tabBarButton: (props) => <TabButton {...props} name="home" />,
        });
      };
    }, [])
  );

  useEffect(() => {
    const newQuote = randomFromArray(quotes);
    const newImageUri = randomFromArray(natureUrls);
    setQuote(newQuote);
    setImageUri(newImageUri);
  }, [quotes, isFocused]);

  function randomQuote() {
    const newQuote = randomFromArray(quotes);
    setQuote(newQuote);
  }

  // async function scheduleNotificationHandler() {
  //   Notifications.scheduleNotificationAsync({
  //     content: { title: "daily quote", body: "time to work", data: quote },
  //     trigger: {
  //       // hour:,
  //       // minute: ,
  //       seconds: 2,
  //       // repeats: true,
  //     },
  //   });
  // }

  return (
    <Animated.View entering={FadeIn.duration(600)} style={{ flex: 1 }}>
      <LinearGradient
        colors={["rgba(9, 198, 249, .7)", "rgba(4, 93, 233, .7)"]}
        style={styles.wrapper}
      >
        <ImageBackground
          source={{
            uri: imageUri,
          }}
          style={styles.image}
          imageStyle={{ opacity: 0.5 }}
        >
          {dailyQuoteVisible ? (
            <DailyQuotes
              quote={quote}
              randomQuote={randomQuote}
              setDailyQuoteVisible={setDailyQuoteVisible}
            />
          ) : (
            <DailySelections setDailyQuoteVisible={setDailyQuoteVisible} />
          )}
        </ImageBackground>
      </LinearGradient>
    </Animated.View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  image: {
    flex: 1,
  },
});
