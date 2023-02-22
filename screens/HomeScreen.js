import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useContext, useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import TextAnimator from "../components/ui/TextAnimator";
import { randomFromArray } from "../helpers/math";
import { QuoteContext } from "../contexts/quote-context";
import { useFocusEffect } from "@react-navigation/native";
import TabButton from "../components/buttons/TabButton";
import natureUrls from "../data/natureImageUrl.json";
import { useIsFocused } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import Selection from "../components/buttons/Selection";

const HomeScreen = ({ navigation, route }) => {
  const { quotes } = useContext(QuoteContext);
  const [quote, setQuote] = useState(randomFromArray(quotes));
  const [dailyQuoteVisable, setDailyQuoteVisible] = useState(false);
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
    }, [quotes])
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
        style={styles.container}
      >
        <ImageBackground
          source={{
            uri: imageUri,
          }}
          style={styles.image}
          imageStyle={{ opacity: 0.7 }}
        >
          {dailyQuoteVisable ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {quote && (
                <TextAnimator quote={quote} randomQuote={randomQuote} />
              )}
            </View>
          ) : (
            <>
              <Selection
                title={"Quotes"}
                onPress={() => setDailyQuoteVisible(true)}
              >
                <Image
                  style={styles.icon}
                  source={require("../assets/images/icons/open-book.png")}
                />
              </Selection>
              <Selection
                title={"Journal"}
                delay={300}
                onPress={() => navigation.navigate("JournalStack")}
              >
                <Image
                  style={styles.icon}
                  source={require("../assets/images/icons/write.png")}
                />
              </Selection>
              <Selection
                title={"Meditation"}
                delay={600}
                onPress={() => navigation.navigate("Meditate")}
              >
                <Image
                  style={styles.icon}
                  source={require("../assets/images/icons/meditation.png")}
                />
              </Selection>
            </>
          )}
        </ImageBackground>
      </LinearGradient>
    </Animated.View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    height: 35,
    width: 35,
  },
});
