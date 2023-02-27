import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { MeditationContext } from "../contexts/audio-context";
import { FavouritesContext } from "../contexts/favourites-context";
import { JournalContext } from "../contexts/journal-context";
import { msToTime } from "../helpers/time";
import { getTodaysData } from "../helpers/todaysData";
import Selection from "./buttons/Selection";

const DailySelections = ({ setAlternate, setAlternateContent }) => {
  const journalCtx = useContext(JournalContext);
  const favouritesCtx = useContext(FavouritesContext);
  const meditationCtx = useContext(MeditationContext);
  const navigation = useNavigation();

  const { entries } = journalCtx;
  const { favourites } = favouritesCtx;
  const { dailyTime } = meditationCtx;

  const todaysEntries = getTodaysData(entries);
  const todaysFavourites = getTodaysData(favourites);

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            fontFamily: "Logo",
            color: "orange",
            fontSize: 40,
            textShadowColor: "rgba(0, 0, 0, 0.75)",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 10,
          }}
        >
          B Meditation
        </Text>
      </View>
      <Selection
        title={"Quotes"}
        subtext="Explore Inspiring Quotes"
        onPress={() => {
          setAlternateContent("quotes");
          setAlternate(true);
        }}
      >
        <Image
          style={styles.icon}
          source={require("../assets/images/icons/lightbulb.png")}
        />
      </Selection>
      <Selection
        delay={100}
        title={"Authors"}
        subtext="Todays favourites: "
        onPress={() => {
          setAlternateContent("author");
          setAlternate(true);
        }}
        amount={todaysFavourites.length}
      >
        <Image
          style={styles.icon}
          source={require("../assets/images/icons/open-book.png")}
        />
      </Selection>
      <Selection
        title={"Journal"}
        delay={200}
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
        delay={300}
        onPress={() => navigation.navigate("Meditate")}
        subtext="Mindful Minutes: "
        amount={msToTime(dailyTime * 1000)}
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
