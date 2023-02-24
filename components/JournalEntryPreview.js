import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  Pressable,
} from "react-native";
import { Colors } from "../colors/colors";
import { JournalContext } from "../contexts/journal-context";
import { truncateText } from "../helpers/text";
import IconButton from "./buttons/IconButton";
import YesNoButtons from "./buttons/YesNoButtons";

const { width } = Dimensions.get("screen");

const JournalEntryPreview = ({ item }) => {
  const journalCtx = useContext(JournalContext);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const { title, date, text, id } = item;

  return (
    <Pressable style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure?</Text>

            <YesNoButtons
              icon1="close"
              icon2="trash"
              funcYes={() => setModalVisible(!modalVisible)}
              funcNo={() => {
                setModalVisible(!modalVisible);
                journalCtx.removeEntry(item);
              }}
            />
          </View>
        </View>
      </Modal>
      <ImageBackground
        source={require("../assets/images/journalbackground.jpg")}
        style={styles.image}
        imageStyle={{ opacity: 0.7 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 10,

            borderBottomWidth: 0.5,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              flex: 1,
            }}
          >
            {title.toUpperCase()}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontStyle: "italic",
              fontWeight: "bold",
              flex: 0.4,
              textAlign: "right",
            }}
          >
            {date.toLocaleDateString()}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              lineHeight: 20,
              flex: 1,
              alignSelf: "flex-start",
            }}
          >
            {truncateText(text, 150)}
          </Text>

          <View
            style={{
              marginLeft: 2,
              minHeight: 80,
              justifyContent: "space-between",
            }}
          >
            <IconButton
              name="book"
              color={Colors.blue}
              onPress={() =>
                navigation.navigate("JournalEntry", {
                  id,
                })
              }
            />
            <IconButton
              name="trash"
              color={Colors.red}
              onPress={() => setModalVisible(true)}
            />
          </View>
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
    marginBottom: 10,
    borderColor: "darkslategrey",
    borderWidth: 0.5,
    backgroundColor: "white",
  },
  image: {
    padding: 15,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 1,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 24,
    textAlign: "center",
  },
});
