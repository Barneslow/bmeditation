import { Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../colors/colors";

const AuthorInfo = ({ author }) => {
  const fontSize = author.name.length > 18 ? 25 : 30;

  return (
    <Animated.View
      entering={FadeInUp.delay(200).duration(500)}
      style={{
        backgroundColor: "white",
        padding: 10,
        paddingTop: 5,
        borderRadius: 10,
        width: "100%",
        elevation: 1,
      }}
    >
      <Text
        style={{
          color: "rgba(40, 40, 40, 1)",
          fontSize,
          fontFamily: "SourceSansProBlack",
          textAlign: "center",
          paddingVertical: 2,
        }}
      >
        {author.name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 2,
          borderBottomColor: "black",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <Ionicons name="location" size={22} color="red" />
          <Text
            style={{
              fontSize: 16,
              color: "black",
              fontFamily: "OpenSansSemiBold",
            }}
          >
            {author.location}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "baseline" }}>
          <Ionicons name="calendar" size={22} color={Colors.blue} />
          <Text
            style={{
              fontSize: 16,
              color: "black",
              fontFamily: "OpenSansSemiBold",
            }}
          >
            {author.period}
          </Text>
        </View>
      </View>

      <Text
        style={{
          paddingVertical: 5,
          color: "black",
          fontFamily: "OpenSansMedium",
          textAlign: "center",
        }}
      >
        {author.about}
      </Text>
    </Animated.View>
  );
};

export default AuthorInfo;
