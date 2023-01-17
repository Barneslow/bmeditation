import { Formik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { JournalContext } from "../store/journal-context";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
} from "react-native";

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "Invalid title")
    .required("Title is required"),
});

const JournalTitleEdit = ({ data }) => {
  const [editingTitle, setEditingTitle] = useState(false);

  const journalCtx = useContext(JournalContext);
  const { title, id } = data;

  const entryInfo = {
    title,
  };

  return (
    <View>
      {editingTitle ? (
        <Formik
          validationSchema={validationSchema}
          initialValues={entryInfo}
          onSubmit={(values, formikActions) => {
            const data = {
              id,
              title: values.title,
            };

            journalCtx.editEntry(data, id);

            formikActions.resetForm();
            setEditingTitle(false);
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
            const { title } = values;

            return (
              <ScrollView showsVerticalScrollIndicator={false}>
                {errors.title && touched.title && (
                  <Text style={styles.error}>{errors.title}</Text>
                )}
                <TextInput
                  autoFocus
                  onBlur={handleSubmit}
                  value={title}
                  style={[
                    styles.title,
                    {
                      borderColor: errors.title && touched.title && "red",
                      backgroundColor:
                        (errors.text &&
                          touched.text &&
                          "rgba(255, 99, 71, 0.3)") ||
                        "transparent",
                    },
                  ]}
                  multiline
                  onChangeText={handleChange("title")}
                  onEndEditing={handleBlur("title")}
                />
              </ScrollView>
            );
          }}
        </Formik>
      ) : (
        <Pressable
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderBottomWidth: 0.5,
          }}
          onLongPress={() => setEditingTitle(true)}
        >
          <Text
            style={{
              fontFamily: "SourceSansProBold",
              fontSize: 28,
              color: "rgb(77,66,54)",
            }}
          >
            {title}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default JournalTitleEdit;

const styles = StyleSheet.create({
  error: {
    color: "red",
  },

  title: {
    fontFamily: "SourceSansProBold",
    fontSize: 28,
    color: "rgb(77,66,54)",
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
  },
});
