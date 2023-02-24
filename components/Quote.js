import { Text, StyleSheet, View } from "react-native";
import { Colors } from "../colors/colors";

const Quote = ({ quoteData }) => {
  const { quote, author } = quoteData;

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "OpenSansRegular", fontSize: 16 }}>
        {quote}
      </Text>
      <Text
        style={{
          fontWeight: "500",
          marginTop: 10,
          fontSize: 16,
          color: Colors.blue,
        }}
      >
        --{author}
      </Text>
    </View>
  );
};

export default Quote;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
    // borderColor: Colors.blue,
    // borderWidth: 0.5,
  },
});
