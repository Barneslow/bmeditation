import { LinearGradient } from "expo-linear-gradient";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import QuoteContextProvider from "./store/quote-context";
import JournalContextProvider from "./store/journal-context";
import FavouritesContextProvider from "./store/favourites-context";
import { useFonts } from "expo-font";
import Tabs from "./components/navigation/Tabs";
import { useEffect, useState } from "react";
import AnimatedContextProvider from "./store/animated-context";
import OnBoardingAnimation from "./screens/OnBoardingAnimation";
import * as Notifications from "expo-notifications";
import useNotifications from "./useNotifications";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

const ref = createNavigationContainerRef();

export default function App() {
  const [routeName, setRouteName] = useState();
  const [animationOver, setAnimationOver] = useState(false);

  const { registerForPushNotificationsAsync, handleNotificationResponse } =
    useNotifications();

  useEffect(() => {
    registerForPushNotificationsAsync();

    const responseListnener = Notifications.addNotificationReceivedListener(
      handleNotificationResponse
    );

    return () => {
      if (responseListnener)
        Notifications.removeNotificationSubscription(responseListnener);
    };
  }, []);

  const [fontsLoaded] = useFonts({
    OpenSansRegular: require("./assets/fonts/OpenSans/OpenSans-Regular.ttf"),
    OpenSansBold: require("./assets/fonts/OpenSans/OpenSans-Bold.ttf"),
    OpenSansSemiBold: require("./assets/fonts/OpenSans/OpenSans-SemiBold.ttf"),
    OpenSansMedium: require("./assets/fonts/OpenSans/OpenSans-Medium.ttf"),
    OpenSansMediumItalic: require("./assets/fonts/OpenSans/OpenSans-MediumItalic.ttf"),
    OpenSansBoldItalic: require("./assets/fonts/OpenSans/OpenSans-BoldItalic.ttf"),
    OpenSansSemiBoldItalic: require("./assets/fonts/OpenSans/OpenSans-SemiBoldItalic.ttf"),
    SourceSansProBold: require("./assets/fonts/OpenSans/SourceSansPro-Bold.ttf"),
    SourceSansProBlack: require("./assets/fonts/OpenSans/SourceSansPro-Black.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AnimatedContextProvider>
        <JournalContextProvider>
          <QuoteContextProvider>
            <FavouritesContextProvider>
              {animationOver ? (
                <NavigationContainer
                  ref={ref}
                  onReady={() => {
                    setRouteName(ref.getCurrentRoute().name);
                  }}
                  onStateChange={async () => {
                    const previousRouteName = routeName;
                    const currentRouteName = ref.getCurrentRoute().name;
                    setRouteName(currentRouteName);
                  }}
                >
                  <LinearGradient
                    colors={["rgba(0,0,0,0.8)", "transparent"]}
                    style={styles.background}
                  >
                    <ImageBackground
                      source={{
                        uri: "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                      }}
                      style={styles.image}
                      imageStyle={{ opacity: 0.3 }}
                    >
                      <Tabs routeName={routeName} />
                    </ImageBackground>
                  </LinearGradient>
                  <StatusBar style="light" backgroundColor="black" />
                </NavigationContainer>
              ) : (
                <OnBoardingAnimation setAnimationOver={setAnimationOver} />
              )}
            </FavouritesContextProvider>
          </QuoteContextProvider>
        </JournalContextProvider>
      </AnimatedContextProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});
