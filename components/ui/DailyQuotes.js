import { StatusBar, View } from "react-native";
import NavigationIcons from "../buttons/navigationIcons";
import TextAnimator from "./TextAnimator";

const DailyQuotes = ({
  quote,
  randomQuote,
  setAlternate,
  setAlternateContent,
}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: StatusBar.currentHeight,
      }}
    >
      <NavigationIcons
        setAlternate={setAlternate}
        setAlternateContent={setAlternateContent}
        content={"quotes"}
      />
      <View style={{ flex: 1, justifyContent: "center" }}>
        {quote && <TextAnimator quote={quote} randomQuote={randomQuote} />}
      </View>
    </View>
  );
};

export default DailyQuotes;
