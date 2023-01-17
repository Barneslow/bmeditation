import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import Animated, { SlideInRight } from "react-native-reanimated";
import JournalEntryPreview from "../components/JournalEntryPreview";
import SlideToDeleteItem from "../components/ui/SlideToDeleteItem";
import { JournalContext } from "../store/journal-context";

const JournalEntriesScreen = ({ navigation, route }) => {
  const { removeEntry } = useContext(JournalContext);
  const entries = route.params;

  return (
    <LinearGradient
      colors={["rgb(251,237,223)", "rgba(109,95,81, 1)"]}
      style={styles.container}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={entries}
        keyExtractor={(_, i) => i}
        renderItem={({ item, index }) => (
          <Animated.View entering={SlideInRight.delay(index * 200)}>
            <SlideToDeleteItem
              index={index}
              item={item}
              handlerFunc={removeEntry}
              journal
            >
              <JournalEntryPreview
                index={index}
                item={item}
                entries={entries}
              />
            </SlideToDeleteItem>
          </Animated.View>
        )}
      />
    </LinearGradient>
  );
};

export default JournalEntriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
