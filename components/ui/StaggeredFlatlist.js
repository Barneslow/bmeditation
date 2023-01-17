import { useContext } from "react";
import { FlatList } from "react-native";
import { JournalContext } from "../../store/journal-context";
import Animated, { SlideInRight } from "react-native-reanimated";
import SlideToDeleteItem from "./SlideToDeleteItem";

const StaggeredFlatList = ({ data }) => {
  const { removeEntry } = useContext(JournalContext);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      extraData={data}
      keyExtractor={(_, i) => i}
      renderItem={({ item, index }) => (
        <Animated.View entering={SlideInRight.delay(index * 200)}>
          <SlideToDeleteItem
            index={index}
            item={item}
            handlerFunc={removeEntry}
            journal
          />
        </Animated.View>
      )}
    />
  );
};

export default StaggeredFlatList;
