import { FlatList, View } from "react-native";
import Animated, { SlideInRight } from "react-native-reanimated";
import AnimatedQuote from "../AnimatedQuote";

const StaggeredFlatList = ({ data, children }) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      extraData={data}
      ItemSeparatorComponent={() => <View style={{ marginBottom: 10 }} />}
      keyExtractor={(_, i) => i}
      renderItem={({ item, index }) => {
        if (index === 0) return <View>{children}</View>;
        return (
          <Animated.View entering={SlideInRight.delay(index * 300)}>
            <AnimatedQuote quoteData={item} />
          </Animated.View>
        );
      }}
    />
  );
};

export default StaggeredFlatList;
