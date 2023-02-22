import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/HomeScreen";
import MeditateScreen from "../../screens/MeditateScreen";
import { Animated, Keyboard } from "react-native";
import { AuthorNavigator, JournalNavigator } from "./Stacks";
import { useContext, useEffect } from "react";
import TabButton from "../buttons/TabButton";
import { AnimatedContext } from "../../contexts/animated-context";
import { FavouritesNavigator } from "./Drawer";

const Tab = createBottomTabNavigator();

const Tabs = (props) => {
  const animateCtx = useContext(AnimatedContext);
  const { translateY, animateTab } = animateCtx;
  const hiddenArray = ["AuthorQuotes", "JournalEntries", "JournalEntry"];
  const hide = hiddenArray.includes(props.routeName);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      animateTab(true);
    });
  }, []);

  useEffect(() => {
    Keyboard.removeAllListeners("keyboardDidHide");
    if (hide) return;
    Keyboard.addListener("keyboardDidHide", () => {
      animateTab(false);
    });
  }, [hide]);

  useEffect(() => {
    animateTab(hide);
  }, [hide, animateTab]);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      animationEnabled
      screenOptions={{
        tabBarShowLabel: false,

        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          borderRadius: 10,
          zIndex: 3,
        },
      }}
      tabBar={(props) => (
        <Animated.View
          style={{
            transform: [{ translateY }],
          }}
        >
          <BottomTabBar style={{ height: 70 }} {...props} />
        </Animated.View>
      )}
    >
      <Tab.Screen
        name="JournalStack"
        component={JournalNavigator}
        options={{
          headerShown: false,
          // tabBarIcon: ({ focused, color, size }) => (
          //   <TabBarButton focused={focused} name="pencil" />
          // ),
          tabBarButton: (props) => <TabButton {...props} name="pencil" />,
        }}
      />

      <Tab.Screen
        name="AuthorStack"
        component={AuthorNavigator}
        options={{
          headerShown: false,
          // tabBarIcon: ({ focused, color, size }) => (
          //   <TabBarButton focused={focused} name="book" />
          // ),
          tabBarButton: (props) => <TabButton {...props} name="book" />,
        }}
      />

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarButton: (props) => <TabButton {...props} name="home" />,
        }}
      />
      <Tab.Screen
        name="FavouritesDrawer"
        component={FavouritesNavigator}
        options={{
          headerShown: false,

          // tabBarIcon: ({ focused, color, size }) => (
          //   <TabBarButton focused={focused} name="heart" />
          // ),
          tabBarButton: (props) => <TabButton {...props} name="heart" />,
        }}
      />
      <Tab.Screen
        name="Meditate"
        component={MeditateScreen}
        // initialParams={{ animateTab }}
        options={{
          headerShown: false,
          // tabBarIcon: ({ focused, color, size }) => (
          //   <TabBarButton focused={focused} name="headset" />
          // ),
          tabBarButton: (props) => <TabButton {...props} name="headset" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
