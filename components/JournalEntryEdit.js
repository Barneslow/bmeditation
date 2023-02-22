import { Formik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { JournalContext } from "../contexts/journal-context";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
} from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import YesNoButtons from "./buttons/YesNoButtons";
import { useNavigation } from "@react-navigation/native";

const validationSchema = Yup.object({
  text: Yup.string()
    .trim()
    .min(10, "Invalid text")
    .required("Text is required"),
});

const JournalEntryEdit = ({ data, routerEntries }) => {
  const navigation = useNavigation();
  const [editing, setEditing] = useState(false);

  const journalCtx = useContext(JournalContext);
  const { text, id } = data;

  const entryInfo = {
    text,
  };

  return (
    <View style={{ flex: 1 }}>
      {editing ? (
        <Formik
          validationSchema={validationSchema}
          initialValues={entryInfo}
          onSubmit={(values, formikActions) => {
            const data = {
              id,
              text: values.text,
            };

            journalCtx.editEntry(data, id);

            formikActions.resetForm();
            setEditing(false);
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
            const { text } = values;

            return (
              <ScrollView showsVerticalScrollIndicator={false}>
                {errors.text && touched.text && (
                  <Text style={styles.error}>{errors.text}</Text>
                )}
                <TextInput
                  value={text}
                  autoFocus
                  style={[
                    styles.text,

                    {
                      borderColor: errors.text && touched.text && "red",
                      backgroundColor:
                        (errors.text &&
                          touched.text &&
                          "rgba(255, 99, 71, 0.3)") ||
                        "transparent)",
                    },
                  ]}
                  multiline
                  textAlignVertical="top"
                  onChangeText={handleChange("text")}
                  onEndEditing={handleBlur("text")}
                  placeholder="Whats on your mind?"
                />
                <YesNoButtons
                  icon1="save"
                  icon2="close"
                  funcYes={handleSubmit}
                  funcNo={() => setEditing((prev) => !prev)}
                />
              </ScrollView>
            );
          }}
        </Formik>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable onLongPress={() => setEditing(true)}>
            <Animated.Text entering={ZoomIn.duration(1000)} style={styles.text}>
              {text}
            </Animated.Text>
          </Pressable>
          <YesNoButtons
            icon1="create"
            icon2="trash"
            funcYes={() => setEditing((prev) => !prev)}
            funcNo={() => {
              const entries = routerEntries.filter(
                (entry) => entry.id !== data.id
              );
              navigation.navigate("JournalEntries", entries);

              setTimeout(() => {
                journalCtx.removeEntry(data);
              }, 2500);
            }}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default JournalEntryEdit;

const styles = StyleSheet.create({
  error: {
    color: "red",
  },

  text: {
    marginVertical: 10,
    fontFamily: "OpenSansRegular",
    fontSize: 18,
    lineHeight: 28,
  },
});
