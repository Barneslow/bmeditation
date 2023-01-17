import { StyleSheet, Text, View } from "react-native";

const DisplayDate = () => {
  const dateArr = new Date().toDateString().split(" ");

  const day = dateArr[0];
  const month = dateArr[1];
  const date = dateArr[2];
  const year = dateArr[3];

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 50,
          fontFamily: "OpenSansSemiBold",
          color: "rgb(77,66,54)",
        }}
      >
        {date}
      </Text>
      <Text
        style={{
          marginLeft: 5,
          fontSize: 16,
          fontFamily: "OpenSansMedium",
          color: "rgb(77,66,54)",
        }}
      >
        {month} {year}
      </Text>
      {/* <Text
        style={{
          marginLeft: 5,
          fontSize: 16,
          fontFamily: "OpenSansBold",
          color: "rgb(128,63,42)",
          marginRight: 20,
        }}
      >
        {day}
      </Text> */}
    </View>
  );
};

export default DisplayDate;

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "baseline",
    // justifyContent: "space-between",
  },
});
