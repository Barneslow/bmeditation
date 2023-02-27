import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { FlatList, StyleSheet } from "react-native";
import Animated, { SlideInRight } from "react-native-reanimated";
import JournalEntryPreview from "../components/JournalEntryPreview";
import { JournalContext } from "../contexts/journal-context";

const JournalEntriesScreen = ({ navigation, route }) => {
  const { entries } = useContext(JournalContext);

  return (
    <LinearGradient
      colors={["rgb(251,237,223)", "rgba(109,95,81, 1)"]}
      style={styles.container}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={entries}
        contentContainerStyle={{ padding: 10 }}
        keyExtractor={(_, i) => i}
        renderItem={({ item, index }) => (
          <Animated.View entering={SlideInRight.delay(index * 200)}>
            <JournalEntryPreview index={index} item={item} entries={entries} />
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
