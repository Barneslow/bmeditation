import { Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../colors/colors";

const AuthorInfo = ({ author }) => {
  return (
    <Animated.View
      entering={FadeInUp.delay(200).duration(500)}
      style={{
        marginTop: 5,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        width: "100%",
        elevation: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 5,
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
              fontSize: 18,
              color: "black",
              fontFamily: "OpenSansBold",
            }}
          >
            {author.location}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "baseline" }}>
          <Ionicons name="calendar" size={22} color={Colors.blue} />
          <Text
            style={{
              fontSize: 18,
              color: "black",
              fontFamily: "OpenSansBold",
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
          fontSize: 16,
        }}
      >
        {author.about}
      </Text>
    </Animated.View>
  );
};

export default AuthorInfo;
