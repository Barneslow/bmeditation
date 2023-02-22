import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet } from "react-native";
import Selection from "./buttons/Selection";

const DailySelections = ({ setDailyQuoteVisible }) => {
  const navigation = useNavigation();
  return (
    <>
      <Selection title={"Quotes"} onPress={() => setDailyQuoteVisible(true)}>
        <Image
          style={styles.icon}
          source={require("../assets/images/icons/open-book.png")}
        />
      </Selection>
      <Selection
        title={"Journal"}
        delay={300}
        onPress={() => navigation.navigate("JournalStack")}
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
      >
        <Image
          style={styles.icon}
          source={require("../assets/images/icons/meditation.png")}
        />
      </Selection>
    </>
  );
};

export default DailySelections;

const styles = StyleSheet.create({
  icon: {
    height: 35,
    width: 35,
  },
});
