import { createContext, useRef } from "react";
import { Animated, Easing } from "react-native";

export const AnimatedContext = createContext({
  translateY: 0,
  animateTab: () => {},
});

const AnimatedContextProvider = ({ children }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  function animateTab(hide) {
    if (hide) {
      Animated.timing(translateY, {
        toValue: 1000,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 0,
        easing: Easing.elastic(1),
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }

  const value = {
    translateY,
    animateTab,
  };

  return (
    <AnimatedContext.Provider value={value}>
      {children}
    </AnimatedContext.Provider>
  );
};

export default AnimatedContextProvider;
