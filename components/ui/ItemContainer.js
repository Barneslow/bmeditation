import { StyleSheet, View } from "react-native";

const ItemContainer = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default ItemContainer;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
    width: "85%",
    borderRadius: 20,
    elevation: 1,
    marginVertical: 5,
    elevation: 4,
  },
});
