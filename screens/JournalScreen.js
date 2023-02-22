import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import AddJournal from "../components/AddJournal";
import IconNumberOverlayButton from "../components/buttons/IconNumberOverlayButton";

import { JournalContext } from "../contexts/journal-context";

// import RNFS from "react-native-fs";

// RNFS.unlink(RNFS.DocumentDirectoryPath + "/favourites")
//   .then(() => console.log("folder deleted"))
//   .catch((err) => console.log(err));

// RNFS.unlink(RNFS.DocumentDirectoryPath + "/journal")
//   .then(() => console.log("folder deleted"))
//   .catch((err) => console.log(err));

// RNFS.readDir(RNFS.DocumentDirectoryPath + "/journal")
//   .then(() => console.log("caught"))
//   .catch((err) => console.log(err));

const JournalScreen = ({ navigation, route }) => {
  const { addEntry, entries } = useContext(JournalContext);
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    // const formattedEntries = entries.map((entry) => {
    //   const date = entry.date.toLocaleDateString();

    //   const data = { ...entry, date };

    //   return data;
    // });

    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 5 }}>
          <IconNumberOverlayButton
            name="bookmark"
            color="white"
            size={35}
            number={entries?.length}
            onPress={() => navigation.navigate("JournalEntries")}
          />
        </View>
      ),
    });
  }, [isFocused, entries?.length]);

  return (
    <LinearGradient
      colors={["rgb(251,237,223)", "rgba(109,95,81, 1)"]}
      style={styles.container}
    >
      <AddJournal />
    </LinearGradient>
  );
};

export default JournalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});
