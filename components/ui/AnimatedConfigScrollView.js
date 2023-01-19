import { useEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  FadeIn,
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { truncateText } from "../../helpers/text";
import AnimatedQuote from "../AnimatedQuote";

const { height, width } = Dimensions.get("screen");

const LIST_ITEM_HEIGHT = 140;

const ListItem = (props) => {
  const { data, index, scrollY, scrolling } = props;
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    scrolling && setShowContent(false);
  }, [scrolling]);

  const startPosition = LIST_ITEM_HEIGHT * index;
  const finishPosition = LIST_ITEM_HEIGHT * (index - 2);
  const containerHeight = height - LIST_ITEM_HEIGHT;

  const animatedStyle = useAnimatedStyle(() => {
    const position1 = startPosition - containerHeight + 450;
    const position2 = finishPosition - containerHeight + 450;

    const inputRange = [position1, position2];

    return {
      opacity: interpolate(scrollY.value, inputRange, [1, 0]),
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            inputRange,
            [1, 0],
            Extrapolate.CLAMP
          ),
        },
        {
          translateX: interpolate(
            scrollY.value,
            inputRange,
            [0, -width],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Pressable
      onPress={() => {
        data.quote.length > 180 && setShowContent((prev) => !prev);
      }}
    >
      {showContent ? (
        <Animated.View style={[styles.container, animatedStyle, { flex: 1 }]}>
          <AnimatedQuote quoteData={data} />
        </Animated.View>
      ) : (
        <Animated.View style={[styles.container, animatedStyle]}>
          <AnimatedQuote
            quoteData={{
              ...data,
              quote:
                data.quote.length > 180
                  ? truncateText(data.quote, 180)
                  : data.quote,
            }}
            more={data.quote.length > 180}
          />
        </Animated.View>
      )}
    </Pressable>
  );
};

const AnimatedConfigScrollView = ({ children, data }) => {
  const scrollY = useSharedValue(0);

  const handler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const y = event.contentOffset.y;
      scrollY.value = y;
    },
  });

  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={handler}
      scrollEventThrottle={16}
    >
      <View>{children}</View>
      {data?.map((item, index) => (
        <Animated.View key={item.id} entering={FadeIn.delay(index * 100 + 600)}>
          <ListItem data={item} index={index} scrollY={scrollY} />
        </Animated.View>
      ))}
    </Animated.ScrollView>
  );
};

export default AnimatedConfigScrollView;

const styles = StyleSheet.create({
  container: {
    height: LIST_ITEM_HEIGHT - 10,
    marginVertical: 5,
  },
  wrapper: {
    flex: 1,
  },
});
