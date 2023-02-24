import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import AuthorQuotesScreen from "../../screens/AuthorQuotesScreen";
import AuthorsScreen from "../../screens/AuthorsScreen";
import JournalEntriesScreen from "../../screens/JournalEntriesScreen";
import JournalEntryScreen from "../../screens/JournalEntryScreen";
import JournalScreen from "../../screens/JournalScreen";

const AuthorStack = createStackNavigator();
const JournalStack = createStackNavigator();

export const AuthorNavigator = () => {
  return (
    <AuthorStack.Navigator>
      <AuthorStack.Screen
        name="Authors"
        component={AuthorsScreen}
        options={{ headerShown: false }}
      />
      <AuthorStack.Screen
        name="AuthorQuotes"
        component={AuthorQuotesScreen}
        options={{
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

          headerStyle: {
            backgroundColor: "#F5E3E6",
          },
          headerTitleStyle: {
            fontFamily: "SourceSansProBlack",
            fontSize: 24,
          },

          // headerBackground: () => (
          //   <LinearGradient
          //     colors={["#F5E3E6", "#D9E4F5"]}
          //     style={{ flex: 1 }}
          //     start={{ x: 0, y: 0 }}
          //     end={{ x: 1, y: 0 }}
          //   />
          // ),
        }}
      />
    </AuthorStack.Navigator>
  );
};

export const JournalNavigator = ({ route }) => {
  return (
    <JournalStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "rgb(251,237,223)",
        },
        headerTitleStyle: {
          color: "rgb(77,66,54)",
          fontSize: 24,
          fontFamily: "SourceSansProBlack",
        },
      }}
    >
      <JournalStack.Screen name="Journal" component={JournalScreen} />
      <JournalStack.Screen
        name="JournalEntries"
        component={JournalEntriesScreen}
        options={{
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <JournalStack.Screen
        name="JournalEntry"
        component={JournalEntryScreen}
        options={{
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </JournalStack.Navigator>
  );
};
