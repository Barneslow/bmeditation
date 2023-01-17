import { useContext, useRef } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { FavouritesContext } from "../../store/favourites-context";
import Quote from "../Quote";
import SlideToDeleteItem from "./SlideToDeleteItem";

const ListItem = ({ viewableItems, item, index }) => {
  const { removeFavourite } = useContext(FavouritesContext);
  const animatedStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((item) => item.isViewable)
        .find((viewableItem) => viewableItem.item.id === item.id)
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0),

      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.8, {
            duration: 500,
          }),
        },
      ],
    };
  });
  return (
    <Animated.View
      viewableItems={viewableItems}
      key={item.id}
      style={animatedStyle}
    >
      <SlideToDeleteItem
        item={item}
        index={index}
        handlerFunc={removeFavourite}
      >
        <Quote quoteData={item} />
      </SlideToDeleteItem>
    </Animated.View>
  );
};

const InViewFlatListAnimation = ({ data }) => {
  const viewableItems = useSharedValue([]);
  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        waitForInteraction: false,
        viewAreaCoveragePercentThreshold: 0,
      },
      onViewableItemsChanged: ({ viewableItems: vItems }) =>
        (viewableItems.value = vItems),
    },
  ]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        style={{ flex: 1 }}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        renderItem={({ item, index }) => (
          <ListItem viewableItems={viewableItems} item={item} index={index} />
        )}
      />
    </View>
  );
};

export default InViewFlatListAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listItem: {
    height: 100,
    backgroundColor: "blue",
    width: "90%",
    borderRadius: 15,
    alignSelf: "center",
    marginVertical: 10,
    elevation: 4,
  },
});
