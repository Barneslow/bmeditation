import { useContext, useLayoutEffect } from "react";
import Animated, { FadeInDown, SlideInDown } from "react-native-reanimated";
import { Text, StyleSheet, Dimensions, ImageBackground } from "react-native";
import JournalEntryEdit from "../components/JournalEntryEdit";
import { JournalContext } from "../store/journal-context";
import JournalTitleEdit from "../components/JournalTitleEdit";

const { height } = Dimensions.get("screen");

const JournalEntryScreen = ({ navigation, route }) => {
  const journalCtx = useContext(JournalContext);

  const entry = journalCtx.entries.find(
    (entry) => entry.id === route.params.id
  );
  const { entries } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={styles.date}>
          {entry.date.toDateString().split(" ").slice(1).join(" ")}
        </Text>
      ),
    });
  }, []);

  return (
    <Animated.View
      entering={FadeInDown.delay(100).duration(500)}
      style={{
        borderRadius: 10,
        flex: 1,
      }}
    >
      <ImageBackground
        style={styles.image}
        source={{
          uri: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFwZXIlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        }}
        imageStyle={{ borderRadius: 5 }}
      >
        <JournalTitleEdit data={entry} />
        <JournalEntryEdit data={entry} routerEntries={entries} />
      </ImageBackground>
    </Animated.View>
  );
};

export default JournalEntryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },

  error: {
    color: "red",
  },

  image: {
    flex: 1,
    padding: 20,
  },

  button: {
    justifyContent: "center",
    borderRadius: 5,
    padding: 5,
    elevation: 4,
    marginVertical: 5,
    borderWidth: 0.5,
    borderColor: "white",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  title: {
    fontFamily: "OpenSansBoldItalic",
    fontSize: 22,
    lineHeight: 28,
    textDecorationLine: "underline",
    flex: 1,
  },

  date: {
    color: "rgb(77,66,54)",
    fontSize: 30,
    fontFamily: "SourceSansProBlack",
  },

  input: {
    fontFamily: "OpenSansRegular",
    fontSize: 18,
    lineHeight: 28,
  },
});
