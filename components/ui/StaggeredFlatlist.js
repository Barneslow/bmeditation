import { FlatList, View } from "react-native";
import Animated, { SlideInRight } from "react-native-reanimated";
import AnimatedQuote from "../AnimatedQuote";
import Quote from "../Quote";

const StaggeredFlatList = ({ data, children }) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      extraData={data}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      keyExtractor={(_, i) => i}
      renderItem={({ item, index }) => {
        if (index === 0) return <View>{children}</View>;
        return (
          <Animated.View entering={SlideInRight.delay(index * 300)}>
            {/* <Quote quoteData={item} /> */}
            <AnimatedQuote quoteData={item} />
          </Animated.View>
        );
      }}
    />
  );
};

export default StaggeredFlatList;
