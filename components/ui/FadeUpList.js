import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import {
  Image,
  View,
  Text,
  Animated,
  StatusBar,
  Pressable,
} from "react-native";

import authorPhotos from "../../data/authors.json";

const _spacing = 20;
const _avatarSize = 70;
const ITEM_SIZE = _avatarSize + _spacing * 2;

const FadeUpList = ({ data }) => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <Animated.FlatList
      nestedScrollEnabled
      data={data}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      contentContainerStyle={{
        padding: _spacing,
        paddingTop: StatusBar.currentHeight || 42,
      }}
      keyExtractor={(item, index) => Math.random() * index}
      renderItem={({ item, index }) => {
        const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];

        const author = authorPhotos.find((author) => author.name === item.name);

        const opacityInputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + 1),
        ];

        const opacity = scrollY.interpolate({
          inputRange: opacityInputRange,
          outputRange: [1, 1, 1, 0],
        });

        const scale = scrollY.interpolate({
          inputRange,
          outputRange: [1, 1, 1, 0],
        });

        return (
          <Pressable
            onPress={() =>
              navigation.navigate("AuthorQuotes", {
                item,
                author,
              })
            }
          >
            <Animated.View
              style={{
                flexDirection: "row",
                padding: _spacing / 2,
                paddingHorizontal: 10,
                marginBottom: _spacing,
                backgroundColor: "rgb(242,242,242)",
                borderRadius: 12,
                elevation: 4,
                transform: [{ scale }],
                opacity,
              }}
            >
              <Image
                source={{
                  uri: author?.imageUrl,
                }}
                style={{
                  width: _avatarSize,
                  height: _avatarSize,
                  borderRadius: _avatarSize,
                  marginRight: _spacing,
                }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "OpenSansBold",
                    marginVertical: 5,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "OpenSansMediumItalic",
                    opacity: 0.7,
                  }}
                >
                  {item.quotes} Quotes
                </Text>
              </View>
            </Animated.View>
          </Pressable>
        );
      }}
    />
  );
};

export default FadeUpList;
