import {
  StyleSheet,
  TextInput,
  Text,
  Animated,
  Dimensions,
  Easing,
  ScrollView,
  View,
  ImageBackground,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useContext, useRef } from "react";
import { JournalContext } from "../contexts/journal-context";
import IconButtonContainer from "./buttons/IconButtonContainer";
import DisplayDate from "./DisplayDate";

const { height } = Dimensions.get("screen");

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "Invalid title")
    .required("Title is required"),
  text: Yup.string()
    .trim()
    .min(10, "Invalid text")
    .required("Text is required"),
});

const AddJournal = () => {
  const translateY = useRef(new Animated.Value(0)).current;
  const journalCtx = useContext(JournalContext);

  const journalInfo = {
    title: "",
    text: "",
  };

  function animate() {
    Animated.timing(translateY, {
      toValue: -height,
      duration: 500,
      useNativeDriver: true,
    }).start(() =>
      Animated.timing(translateY, {
        toValue: height * 2,
        duration: 0,
        useNativeDriver: true,
      }).start(() =>
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          easing: Easing.elastic(0.8),
          useNativeDriver: true,
        }).start()
      )
    );
  }

  return (
    <ScrollView>
      <DisplayDate />
      <Formik
        initialValues={journalInfo}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          animate();
          const data = {
            id: new Date(Date.now()) * Math.random(),
            date: new Date(Date.now()),
            title: values.title,
            text: values.text,
          };
          journalCtx.addEntry(data);
          setTimeout(() => {
            formikActions.resetForm();
          }, 300);
        }}
      >
        {({
          values,
          handleChange,
          errors,
          handleBlur,
          touched,
          handleSubmit,
        }) => {
          const { title, text } = values;

          return (
            <Animated.View
              style={[styles.form, { transform: [{ translateY }] }]}
            >
              <Text style={styles.text}>
                Title{" "}
                {errors.title && touched.title && (
                  <Text style={styles.error}>{errors.title}</Text>
                )}
              </Text>
              <ImageBackground
                source={{
                  uri: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFwZXIlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
                }}
                imageStyle={{ borderRadius: 5 }}
              >
                <TextInput
                  value={title}
                  style={[
                    styles.input,
                    { borderColor: errors.title && touched.title && "red" },
                    {
                      backgroundColor:
                        (errors.title &&
                          touched.title &&
                          "rgba(255, 99, 71, 0.3)") ||
                        "transparent",
                    },
                  ]}
                  maxLength={40}
                  onChangeText={handleChange("title")}
                  onEndEditing={handleBlur("title")}
                />
              </ImageBackground>
              <Text style={styles.text}>
                Entry{" "}
                {errors.text && touched.text && (
                  <Text style={styles.error}>{errors.text}</Text>
                )}
              </Text>
              <ImageBackground
                source={{
                  uri: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFwZXIlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
                }}
                style={styles.background}
                imageStyle={{ borderRadius: 5 }}
              >
                <TextInput
                  value={text}
                  style={[
                    styles.input,
                    styles.textInput,
                    {
                      borderColor: errors.text && touched.text && "red",
                      backgroundColor:
                        (errors.text &&
                          touched.text &&
                          "rgba(255, 99, 71, 0.3)") ||
                        "transparent",
                    },
                  ]}
                  multiline
                  textAlignVertical="top"
                  onChangeText={handleChange("text")}
                  onEndEditing={handleBlur("text")}
                  placeholder="Whats on your mind?"
                />
              </ImageBackground>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 10,
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                >
                  <IconButtonContainer
                    style={styles.button}
                    pressedColor={"white"}
                    name="add"
                    size={40}
                    onPress={handleSubmit}
                  />
                  <IconButtonContainer
                    style={[styles.button, { backgroundColor: "red" }]}
                    pressedColor={"white"}
                    name="trash"
                    size={40}
                    // onPress={handleSubmit}
                  />
                </View>
              </View>
            </Animated.View>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

export default AddJournal;

const styles = StyleSheet.create({
  input: {
    borderRadius: 5,
    padding: 8,
    fontSize: 18,
    fontFamily: "OpenSansRegular",
    minHeight: 48,
  },

  textInput: {
    height: "100%",
  },

  background: {
    height: height / 2.4,
  },

  error: {
    color: "red",
  },

  text: {
    fontSize: 20,
    fontFamily: "OpenSansSemiBold",
    color: "rgb(77,66,54)",
    marginLeft: 10,
    marginVertical: 2,
  },

  form: {
    padding: 10,
  },

  button: {
    padding: 2,
    borderRadius: 5,
    elevation: 4,
    textAlign: "center",
    backgroundColor: "rgb(57,181,73)",
  },
});
