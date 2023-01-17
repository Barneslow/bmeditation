import { useIsFocused } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { ScrollView } from "react-native";

import FavouritesItem from "./FavouritesItem";

const LayoutListAnimator = ({ data }) => {
  const [dataArr, setDataArr] = useState(data);

  const isFocused = useIsFocused();
  useLayoutEffect(() => {
    isFocused ? setDataArr(data) : setDataArr(null);
  }, [isFocused]);

  return (
    <ScrollView>
      {dataArr?.map((item, index) => {
        return <FavouritesItem item={item} index={index} key={item.id} />;
      })}
    </ScrollView>
  );
};

export default LayoutListAnimator;
