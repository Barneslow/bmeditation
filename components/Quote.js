import { Text, StyleSheet, ImageBackground, View } from "react-native";

const Quote = ({ quoteData }) => {
  const { quote, author } = quoteData;

  return (
    <View
      // source={{
      //   uri: "https://images.unsplash.com/photo-1528458965990-428de4b1cb0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=729&q=80",
      // }}
      style={[styles.container]}
    >
      <Text style={{ fontFamily: "OpenSansRegular", fontSize: 16 }}>
        {quote}
      </Text>

      <Text
        style={{
          fontWeight: "500",
          marginTop: 10,
          fontSize: 16,
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
  },
});
