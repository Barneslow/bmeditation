import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Image, StatusBar, StyleSheet, View } from "react-native";
import { FavouritesContext } from "../contexts/favourites-context";
import { JournalContext } from "../contexts/journal-context";
import { getTodaysData } from "../helpers/todaysData";
import Selection from "./buttons/Selection";

const DailySelections = ({ setDailyQuoteVisible }) => {
  const journalCtx = useContext(JournalContext);
  const favouritesCtx = useContext(FavouritesContext);
  const navigation = useNavigation();

  const { entries } = journalCtx;
  const { favourites } = favouritesCtx;

  const todaysEntries = getTodaysData(entries);
  const todaysFavourites = getTodaysData(favourites);

  return (
    <View style={styles.container}>
      <Selection
        title={"Quotes"}
        subtext="Explore Inspiring Quotes"
        onPress={() => setDailyQuoteVisible(true)}
      >
        <Image
          style={styles.icon}
          source={require("../assets/images/icons/lightbulb.png")}
        />
      </Selection>
      <Selection
        title={"Authors"}
        subtext="Todays favourites: "
        onPress={() => navigation.navigate("AuthorStack")}
        amount={todaysFavourites.length}
      >
        <Image
          style={styles.icon}
          source={require("../assets/images/icons/open-book.png")}
        />
      </Selection>
      <Selection
        title={"Journal"}
        delay={300}
        onPress={() => navigation.navigate("JournalStack")}
        subtext={`Todays Entries:  `}
        amount={todaysEntries.length}
      >
        <Image
          style={styles.icon}
          source={require("../assets/images/icons/write.png")}
        />
      </Selection>
      <Selection
        title={"Meditation"}
        delay={600}
        onPress={() => navigation.navigate("Meditate")}
        subtext="Take a breath"
      >
        <Image
          style={styles.icon}
          source={require("../assets/images/icons/meditation.png")}
        />
      </Selection>
    </View>
  );
};

export default DailySelections;

const styles = StyleSheet.create({
  icon: {
    height: 40,
    width: 40,
  },

  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    top: StatusBar.currentHeight + 50,
  },
});
