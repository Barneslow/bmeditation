import { useNavigation } from "@react-navigation/native";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { truncateText } from "../helpers/text";

const JournalEntryPreview = ({ item, index, entries }) => {
  const navigation = useNavigation();
  const { title, date, text, id } = item;

  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [
              styles.container,
              {
                backgroundColor: index % 2 == 0 ? "black" : "white",
                opacity: 0.5,
              },
            ]
          : [
              styles.container,
              {
                backgroundColor: index % 2 == 0 ? "black" : "white",
              },
            ]
      }
      onPress={() =>
        navigation.navigate("JournalEntry", {
          id,
          entries,
        })
      }
    >
      <ImageBackground
        source={{
          uri:
            index % 2 == 0
              ? "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              : "https://images.unsplash.com/photo-1495195129352-aeb325a55b65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
        }}
        style={styles.image}
        imageStyle={{ opacity: 0.7 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline",
            paddingBottom: 10,

            borderBottomWidth: 0.5,
            borderColor: index % 2 == 0 ? "white" : "black",
          }}
        >
          <Text
            style={{
              color: index % 2 == 0 ? "white" : "black",
              fontSize: 20,
              fontWeight: "bold",
              flex: 1,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: index % 2 == 0 ? "white" : "black",
              fontSize: 16,
              fontStyle: "italic",
              fontWeight: "bold",
              flex: 0.4,
              textAlign: "right",
            }}
          >
            {date}
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: index % 2 == 0 ? "white" : "black",
              fontSize: 14,
              fontWeight: "500",
              lineHeight: 20,
            }}
          >
            {truncateText(text, 150)}
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default JournalEntryPreview;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    borderRadius: 10,
    padding: 20,
  },
});
